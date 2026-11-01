/**
 * ============================================================================
 * DURGA PUBLIC SCHOOL - PROSPECTUS VIEWER (UNFOLDED IPHONE DUO ENGINE)
 * ============================================================================
 * - Page 1: Single Front Cover
 * - Pages 2-19: Unfolded iPhone Duo Two-Page Spread with Central Spine
 * - Page 20: Single Back Cover
 * - Blurry Transparent Frosted Glass Shader Transition
 * - Fullscreen Reading Mode with Adaptive Canvas Re-Rendering
 * ============================================================================
 */

(function () {
  'use strict';

  const TOTAL_PAGES = 20;
  const TOTAL_SPREADS = 11; // Spread 0 (Cover: 1), Spreads 1-9 (2-3, 4-5... 18-19), Spread 10 (Back: 20)
  const BASE_ASSET_PATH = 'assets/prospectus/';
  const DEFAULT_PDF_PATH = 'assets/docs/Durga-Public-School-Prospectus.pdf';

  // State
  let currentSpreadIdx = 0;
  let isAnimating = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragProgress = 0;
  let foldingEngine = null;

  // DOM Elements
  let container, viewport, canvas, gl;
  let baseSpread, baseImgLeft, baseImgRight;
  let prevBtn, nextBtn, pageNumEl, totalPagesEl, scrubber, thumbsDrawer, thumbsToggleBtn;
  let loaderEl, fullscreenBtn;

  // Texture & Canvas Caches
  const pageImageCache = new Map();
  const spreadCanvasCache = new Map();

  function padNum(num) {
    return num < 10 ? '0' + num : '' + num;
  }

  // Spread Info Definition: Single Cover, Dual Spreads, Single Back Cover
  function getSpreadInfo(spreadIdx) {
    if (spreadIdx <= 0) {
      return { idx: 0, isSingle: true, left: null, right: 1, label: 'Cover (Page 1) of 20' };
    }
    if (spreadIdx >= 10) {
      return { idx: 10, isSingle: true, left: null, right: 20, label: 'Back Cover (Page 20) of 20' };
    }
    const leftPage = spreadIdx * 2;
    const rightPage = leftPage + 1;
    return {
      idx: spreadIdx,
      isSingle: false,
      left: leftPage,
      right: rightPage,
      label: 'Pages ' + leftPage + '–' + rightPage + ' of 20'
    };
  }

  // Preload a single page image (same-origin safe)
  function loadPageImage(pageNum) {
    return new Promise(function (resolve) {
      if (pageImageCache.has(pageNum)) {
        resolve(pageImageCache.get(pageNum));
        return;
      }

      const img = new Image();
      const webpSrc = `${BASE_ASSET_PATH}page-${padNum(pageNum)}.webp`;
      const jpgSrc = `${BASE_ASSET_PATH}page-${padNum(pageNum)}.jpg`;

      img.onload = function () {
        pageImageCache.set(pageNum, img);
        resolve(img);
      };

      img.onerror = function () {
        const fallbackImg = new Image();
        fallbackImg.onload = function () {
          pageImageCache.set(pageNum, fallbackImg);
          resolve(fallbackImg);
        };
        fallbackImg.onerror = function () {
          console.warn(`[Prospectus] Failed to load page ${pageNum}`);
          resolve(null);
        };
        fallbackImg.src = jpgSrc;
      };

      img.src = webpSrc;
    });
  }

  // Preload/Compose an unfolded spread canvas (Single page: 1200x1572, Spread: 2400x1572)
  function loadSpreadCanvas(spreadIdx) {
    return new Promise(function (resolve) {
      if (spreadCanvasCache.has(spreadIdx)) {
        resolve(spreadCanvasCache.get(spreadIdx));
        return;
      }

      const info = getSpreadInfo(spreadIdx);

      if (info.isSingle) {
        loadPageImage(info.right).then(function (img) {
          if (!img) { resolve(null); return; }
          const c = document.createElement('canvas');
          c.width = 1200;
          c.height = 1572;
          const ctx = c.getContext('2d');
          ctx.drawImage(img, 0, 0, 1200, 1572);
          spreadCanvasCache.set(spreadIdx, c);
          resolve(c);
        });
      } else {
        Promise.all([loadPageImage(info.left), loadPageImage(info.right)]).then(function (imgs) {
          if (!imgs[0] && !imgs[1]) { resolve(null); return; }
          const c = document.createElement('canvas');
          c.width = 2400;
          c.height = 1572;
          const ctx = c.getContext('2d');

          // Left page
          if (imgs[0]) ctx.drawImage(imgs[0], 0, 0, 1200, 1572);
          // Right page
          if (imgs[1]) ctx.drawImage(imgs[1], 1200, 0, 1200, 1572);

          // Virtual center hinge crease (iPhone Duo central spine)
          ctx.fillStyle = 'rgba(0, 0, 0, 0.16)';
          ctx.fillRect(1198, 0, 4, 1572);

          const spineGrad = ctx.createLinearGradient(1160, 0, 1240, 0);
          spineGrad.addColorStop(0.0, 'rgba(0, 0, 0, 0.0)');
          spineGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.09)');
          spineGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
          ctx.fillStyle = spineGrad;
          ctx.fillRect(1160, 0, 80, 1572);

          spreadCanvasCache.set(spreadIdx, c);
          resolve(c);
        });
      }
    });
  }

  // Synchronize Underlying Base Images for Instant 0ms Visual Rendering
  function syncBaseSpread(spreadIdx) {
    if (!viewport) return;
    const info = getSpreadInfo(spreadIdx);

    if (info.isSingle) {
      viewport.classList.remove('is-spread');
      viewport.classList.add('is-single');

      if (baseImgLeft) baseImgLeft.style.display = 'none';
      if (baseImgRight) {
        baseImgRight.style.display = 'block';
        baseImgRight.style.width = '100%';
        baseImgRight.src = `${BASE_ASSET_PATH}page-${padNum(info.right)}.webp`;
      }
    } else {
      viewport.classList.remove('is-single');
      viewport.classList.add('is-spread');

      if (baseImgLeft) {
        baseImgLeft.style.display = 'block';
        baseImgLeft.style.width = '50%';
        baseImgLeft.src = `${BASE_ASSET_PATH}page-${padNum(info.left)}.webp`;
      }
      if (baseImgRight) {
        baseImgRight.style.display = 'block';
        baseImgRight.style.width = '50%';
        baseImgRight.src = `${BASE_ASSET_PATH}page-${padNum(info.right)}.webp`;
      }
    }
  }

  // Render Current Spread on Canvas
  function renderCurrentSpread() {
    if (!foldingEngine) return;
    const info = getSpreadInfo(currentSpreadIdx);
    loadSpreadCanvas(currentSpreadIdx).then(function (canvasEl) {
      if (!canvasEl) return;
      foldingEngine.uploadImage(foldingEngine.currentTexture, canvasEl);
      foldingEngine.renderFrame(0, 1, !info.isSingle);
    });
  }

  // Canvas Resize Handler
  function resizeCanvas() {
    if (!canvas || !viewport) return;
    const rect = viewport.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);

    if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
      canvas.width = w;
      canvas.height = h;
      if (foldingEngine && foldingEngine.gl) {
        foldingEngine.gl.viewport(0, 0, w, h);
      }
    }
  }

  // Navigate between Spreads with 3D Frosted Glass Folding Transition
  function goToSpread(targetIdx) {
    if (targetIdx === currentSpreadIdx || targetIdx < 0 || targetIdx >= TOTAL_SPREADS || isAnimating) return;

    isAnimating = true;
    const fromIdx = currentSpreadIdx;
    const toIdx = targetIdx;
    const direction = toIdx > fromIdx ? 1 : -1;
    const nextInfo = getSpreadInfo(toIdx);

    // Preload both spreads
    Promise.all([loadSpreadCanvas(fromIdx), loadSpreadCanvas(toIdx)]).then(function (canvases) {
      if (!canvases[0] || !canvases[1]) {
        // Direct jump if load failed
        currentSpreadIdx = toIdx;
        isAnimating = false;
        syncBaseSpread(toIdx);
        updateUI();
        return;
      }

      // Update viewport container sizing to accommodate single vs spread
      if (nextInfo.isSingle) {
        viewport.classList.remove('is-spread');
        viewport.classList.add('is-single');
      } else {
        viewport.classList.remove('is-single');
        viewport.classList.add('is-spread');
      }
      resizeCanvas();

      if (foldingEngine && foldingEngine.gl && foldingEngine.program) {
        const isSpreadMode = (!getSpreadInfo(fromIdx).isSingle) || (!nextInfo.isSingle);
        foldingEngine.transition(canvases[0], canvases[1], direction, isSpreadMode, 660, function () {
          currentSpreadIdx = toIdx;
          isAnimating = false;
          syncBaseSpread(toIdx);
          updateUI();
        });
      } else {
        // Fallback
        currentSpreadIdx = toIdx;
        isAnimating = false;
        syncBaseSpread(toIdx);
        updateUI();
      }
    });
  }

  function nextSpread() {
    if (currentSpreadIdx < TOTAL_SPREADS - 1 && !isAnimating) {
      goToSpread(currentSpreadIdx + 1);
    }
  }

  function prevSpread() {
    if (currentSpreadIdx > 0 && !isAnimating) {
      goToSpread(currentSpreadIdx - 1);
    }
  }

  // Jump by page number (1-20)
  function goToPage(pageNum) {
    let targetSpread = 0;
    if (pageNum <= 1) {
      targetSpread = 0;
    } else if (pageNum >= 20) {
      targetSpread = 10;
    } else {
      targetSpread = Math.floor(pageNum / 2);
    }
    goToSpread(targetSpread);
  }

  // Update Controls Bar & Thumbnail Strip
  function updateUI() {
    const info = getSpreadInfo(currentSpreadIdx);

    if (pageNumEl) {
      if (info.isSingle) {
        pageNumEl.textContent = info.right === 1 ? '1 (Cover)' : '20 (Back)';
      } else {
        pageNumEl.textContent = `${info.left}–${info.right}`;
      }
    }
    if (totalPagesEl) totalPagesEl.textContent = TOTAL_PAGES;

    if (scrubber) {
      scrubber.value = currentSpreadIdx;
    }

    if (prevBtn) prevBtn.disabled = currentSpreadIdx <= 0;
    if (nextBtn) nextBtn.disabled = currentSpreadIdx >= TOTAL_SPREADS - 1;

    // Highlight active thumbnails
    if (thumbsDrawer) {
      const thumbs = thumbsDrawer.querySelectorAll('.prospectus-thumb-item');
      thumbs.forEach(function (thumb, idx) {
        const pNum = idx + 1;
        const isActive = info.isSingle ? (pNum === info.right) : (pNum === info.left || pNum === info.right);
        if (isActive) {
          thumb.classList.add('is-active');
        } else {
          thumb.classList.remove('is-active');
        }
      });
    }
  }

  // Build Thumbnail Strip (All 20 individual pages)
  function buildThumbnails() {
    if (!thumbsDrawer) return;
    const strip = thumbsDrawer.querySelector('.prospectus-thumbs-strip');
    if (!strip) return;

    strip.innerHTML = '';
    for (let i = 1; i <= TOTAL_PAGES; i++) {
      const item = document.createElement('div');
      item.className = 'prospectus-thumb-item' + (i === 1 ? ' is-active' : '');
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-label', `Jump to page ${i}`);

      const img = document.createElement('img');
      img.src = `${BASE_ASSET_PATH}page-${padNum(i)}.webp`;
      img.alt = `Page ${i}`;
      img.loading = 'lazy';

      const num = document.createElement('span');
      num.className = 'prospectus-thumb-num';
      num.textContent = i;

      item.appendChild(img);
      item.appendChild(num);

      item.addEventListener('click', function () {
        goToPage(i);
      });

      strip.appendChild(item);
    }
  }

  // Touch and Mouse Interactive Swipes
  function initGestures() {
    if (!viewport) return;

    function handleStart(clientX, clientY) {
      if (isAnimating) return;
      isDragging = true;
      dragStartX = clientX;
      dragStartY = clientY;
      dragProgress = 0;
    }

    function handleMove(clientX, clientY) {
      if (!isDragging || isAnimating) return;
      const deltaX = clientX - dragStartX;
      const deltaY = clientY - dragStartY;

      if (Math.abs(deltaY) > Math.abs(deltaX) && dragProgress === 0) {
        return; // Allow vertical page scrolling
      }

      const rect = viewport.getBoundingClientRect();
      const normDelta = deltaX / (rect.width * 0.7);

      if (normDelta < 0 && currentSpreadIdx < TOTAL_SPREADS - 1) {
        dragProgress = Math.min(1, Math.abs(normDelta));
      } else if (normDelta > 0 && currentSpreadIdx > 0) {
        dragProgress = Math.min(1, Math.abs(normDelta));
      } else {
        dragProgress = 0;
      }
    }

    function handleEnd() {
      if (!isDragging) return;
      isDragging = false;

      if (dragProgress >= 0.18) {
        if (dragStartX > window.innerWidth / 2 || dragProgress > 0.25) {
          nextSpread();
        } else {
          prevSpread();
        }
      }
      dragProgress = 0;
    }

    viewport.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    viewport.addEventListener('touchmove', function (e) {
      if (e.touches.length === 1 && isDragging) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    viewport.addEventListener('touchend', handleEnd, { passive: true });
    viewport.addEventListener('touchcancel', handleEnd, { passive: true });

    viewport.addEventListener('mousedown', function (e) {
      if (e.button === 0) handleStart(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', function (e) {
      if (isDragging) handleMove(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', function () {
      if (isDragging) handleEnd();
    });
  }

  // Keyboard navigation
  function initKeyboard() {
    window.addEventListener('keydown', function (e) {
      if (!viewport) return;
      const rect = viewport.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextSpread();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSpread();
      }
    });
  }

  // Fullscreen support with guaranteed re-render
  function initFullscreen() {
    if (!fullscreenBtn) return;
    const stage = document.querySelector('.prospectus-stage-wrap');
    if (!stage) return;

    fullscreenBtn.addEventListener('click', function () {
      const isFs = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
      if (!isFs) {
        if (stage.requestFullscreen) {
          stage.requestFullscreen();
        } else if (stage.webkitRequestFullscreen) {
          stage.webkitRequestFullscreen();
        } else if (stage.mozRequestFullScreen) {
          stage.mozRequestFullScreen();
        } else if (stage.msRequestFullscreen) {
          stage.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    });

    function onFsChange() {
      setTimeout(function () {
        resizeCanvas();
        renderCurrentSpread();
      }, 100);
      setTimeout(function () {
        resizeCanvas();
        renderCurrentSpread();
      }, 250);
    }

    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);
    document.addEventListener('mozfullscreenchange', onFsChange);
    document.addEventListener('MSFullscreenChange', onFsChange);
  }

  // Mount Routine
  function initProspectusViewer() {
    container = document.querySelector('.prospectus-viewer-container');
    if (!container) return;

    viewport = container.querySelector('.prospectus-canvas-viewport');
    canvas = document.getElementById('prospectusWebGLCanvas');
    baseSpread = document.getElementById('prospectusBaseSpread');
    baseImgLeft = document.getElementById('prospectusBaseImgLeft');
    baseImgRight = document.getElementById('prospectusBaseImgRight');
    prevBtn = document.getElementById('prospectusPrevBtn');
    nextBtn = document.getElementById('prospectusNextBtn');
    pageNumEl = document.getElementById('prospectusCurrentPage');
    totalPagesEl = document.getElementById('prospectusTotalPages');
    scrubber = document.getElementById('prospectusScrubber');
    thumbsDrawer = document.getElementById('prospectusThumbsDrawer');
    thumbsToggleBtn = document.getElementById('prospectusThumbsToggle');
    loaderEl = document.getElementById('prospectusLoader');
    fullscreenBtn = document.getElementById('prospectusFullscreenBtn');

    // Initialize Unfolded iPhone Duo 3D Glass Folding Transition
    if (typeof ProspectusFoldingTransition !== 'undefined') {
      try {
        foldingEngine = new ProspectusFoldingTransition({
          canvas: canvas,
          gridCols: 54,
          gridRows: 28,
          duration: 660
        });
        if (!foldingEngine.gl || !foldingEngine.program) {
          console.warn('[Prospectus] WebGL engine missing valid program');
          foldingEngine = null;
        }
      } catch (err) {
        console.warn('[Prospectus] ProspectusFoldingTransition init fallback:', err);
        foldingEngine = null;
      }
    }

    // Set initial Cover spread (Spread 0)
    currentSpreadIdx = 0;
    syncBaseSpread(0);

    // Preload first two spreads (Cover & Pages 2-3)
    Promise.all([loadSpreadCanvas(0), loadSpreadCanvas(1)]).then(function (canvases) {
      if (canvases[0] && foldingEngine) {
        foldingEngine.uploadImage(foldingEngine.currentTexture, canvases[0]);
        if (canvases[1]) foldingEngine.uploadImage(foldingEngine.nextTexture, canvases[1]);
        foldingEngine.renderFrame(0, 1, false);
      }
      if (loaderEl) loaderEl.classList.add('is-hidden');
    });

    // Wire buttons
    if (prevBtn) prevBtn.addEventListener('click', prevSpread);
    if (nextBtn) nextBtn.addEventListener('click', nextSpread);

    if (scrubber) {
      scrubber.min = 0;
      scrubber.max = TOTAL_SPREADS - 1;
      scrubber.value = 0;
      scrubber.addEventListener('input', function (e) {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val)) goToSpread(val);
      });
    }

    if (thumbsToggleBtn && thumbsDrawer) {
      thumbsToggleBtn.addEventListener('click', function () {
        const isCollapsed = thumbsDrawer.classList.contains('is-collapsed');
        if (isCollapsed) {
          thumbsDrawer.classList.remove('is-collapsed');
          thumbsToggleBtn.setAttribute('aria-expanded', 'true');
        } else {
          thumbsDrawer.classList.add('is-collapsed');
          thumbsToggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    buildThumbnails();
    initGestures();
    initKeyboard();
    initFullscreen();
    updateUI();

    window.addEventListener('resize', function () {
      resizeCanvas();
      renderCurrentSpread();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProspectusViewer);
  } else {
    initProspectusViewer();
  }
})();
