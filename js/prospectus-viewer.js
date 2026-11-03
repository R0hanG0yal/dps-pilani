/**
 * ============================================================================
 * DURGA PUBLIC SCHOOL - PROSPECTUS VIEWER (3D PAGE CURL & UNFOLDED DUO ENGINE)
 * ============================================================================
 * - Page 1: Single Front Cover
 * - Pages 2-19: Unfolded Two-Page Spreads with Central Spine
 * - Page 20: Single Back Cover
 * - Hardware-Accelerated 3D Page Curl & Specular Highlight Turn Engine
 * - WebGL Frosted Glass Bend Shaders with ANGLE Direct3D Compliance
 * - Responsive Mobile Single-Page Flip & Touch Drag Gestures
 * - Fullscreen Reading Mode with Adaptive Viewport Re-Centering
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
  let foldingEngine = null;

  // DOM Elements
  let container, viewport, canvas;
  let baseSpread, baseImgLeft, baseImgRight;
  let flipSheet, flipFrontImg, flipBackImg, flipHighlight, flipShadow, flipFrontGloss, flipBackGloss;
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

  // Preload a single page image
  function loadPageImage(pageNum) {
    return new Promise(function (resolve) {
      if (pageImageCache.has(pageNum)) {
        resolve(pageImageCache.get(pageNum));
        return;
      }

      const img = new Image();
      const jpgSrc = BASE_ASSET_PATH + 'page-' + padNum(pageNum) + '.jpg';
      const webpSrc = BASE_ASSET_PATH + 'page-' + padNum(pageNum) + '.webp';

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
          console.warn('[Prospectus] Failed to load page ' + pageNum);
          resolve(null);
        };
        fallbackImg.src = webpSrc;
      };

      img.src = jpgSrc;
    });
  }

  // Preload/Compose an unfolded spread canvas for optional WebGL transition
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

          if (imgs[0]) ctx.drawImage(imgs[0], 0, 0, 1200, 1572);
          if (imgs[1]) ctx.drawImage(imgs[1], 1200, 0, 1200, 1572);

          // Virtual center hinge crease
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

    function setupImg(el, pageNum) {
      if (!el || !pageNum) return;
      el.onerror = function () {
        if (this.src.indexOf('.jpg') !== -1) {
          this.src = this.src.replace('.jpg', '.webp');
        }
      };
      el.src = BASE_ASSET_PATH + 'page-' + padNum(pageNum) + '.jpg';
    }

    if (info.isSingle) {
      viewport.classList.remove('is-spread');
      viewport.classList.add('is-single');

      if (baseImgLeft) baseImgLeft.style.display = 'none';
      if (baseImgRight) {
        baseImgRight.style.display = 'block';
        baseImgRight.style.width = '100%';
        setupImg(baseImgRight, info.right);
      }
    } else {
      viewport.classList.remove('is-single');
      viewport.classList.add('is-spread');

      if (baseImgLeft) {
        baseImgLeft.style.display = 'block';
        baseImgLeft.style.width = '50%';
        setupImg(baseImgLeft, info.left);
      }
      if (baseImgRight) {
        baseImgRight.style.display = 'block';
        baseImgRight.style.width = '50%';
        setupImg(baseImgRight, info.right);
      }
    }
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

  // 3D Realistic Page Curl / Flip Animation
  function animate3DPageTurn(fromIdx, toIdx, direction, onComplete) {
    if (!flipSheet || !flipFrontImg || !flipBackImg) {
      if (typeof onComplete === 'function') onComplete();
      return;
    }

    const fromInfo = getSpreadInfo(fromIdx);
    const toInfo = getSpreadInfo(toIdx);
    const isMobile = window.innerWidth <= 768;

    let frontPageNum = 1;
    let backPageNum = 2;
    let startAngle = 0;
    let endAngle = -180;
    let sheetLeft = '50%';
    let sheetWidth = '50%';
    let transformOrigin = 'left center';

    if (direction > 0) {
      // TURNING FORWARD (Next)
      if (fromIdx === 0) {
        // Opening Front Cover (Page 1 -> Pages 2-3)
        frontPageNum = 1;
        backPageNum = 2;
        startAngle = 0;
        endAngle = -180;
        sheetLeft = isMobile ? '0%' : '50%';
        sheetWidth = isMobile ? '100%' : '50%';
        transformOrigin = 'left center';
      } else if (toIdx === 10) {
        // Closing to Back Cover (Pages 18-19 -> Page 20)
        frontPageNum = fromInfo.right || 19;
        backPageNum = 20;
        startAngle = 0;
        endAngle = -180;
        sheetLeft = isMobile ? '0%' : '50%';
        sheetWidth = isMobile ? '100%' : '50%';
        transformOrigin = 'left center';
      } else {
        // Standard Spread Forward Turn (e.g. 2-3 -> 4-5)
        frontPageNum = fromInfo.right; // Turning right page (e.g. 3)
        backPageNum = toInfo.left;    // Back of turning page becomes new left page (e.g. 4)
        startAngle = 0;
        endAngle = -180;
        sheetLeft = isMobile ? '0%' : '50%';
        sheetWidth = isMobile ? '100%' : '50%';
        transformOrigin = 'left center';
      }
    } else {
      // TURNING BACKWARD (Prev)
      if (toIdx === 0) {
        // Closing Cover backwards (Pages 2-3 -> Page 1)
        frontPageNum = fromInfo.left || 2;
        backPageNum = 1;
        startAngle = 0;
        endAngle = 180;
        sheetLeft = '0%';
        sheetWidth = isMobile ? '100%' : '50%';
        transformOrigin = 'right center';
      } else {
        // Standard Spread Backward Turn (e.g. 4-5 -> 2-3)
        frontPageNum = fromInfo.left; // Turning left page (e.g. 4)
        backPageNum = toInfo.right;  // Back of turning page becomes new right page (e.g. 3)
        startAngle = 0;
        endAngle = 180;
        sheetLeft = '0%';
        sheetWidth = isMobile ? '100%' : '50%';
        transformOrigin = 'right center';
      }
    }

    // Set turning sheet images
    flipFrontImg.src = BASE_ASSET_PATH + 'page-' + padNum(frontPageNum) + '.jpg';
    flipBackImg.src = BASE_ASSET_PATH + 'page-' + padNum(backPageNum) + '.jpg';

    // Position & activate 3D flipping sheet
    flipSheet.style.left = sheetLeft;
    flipSheet.style.width = sheetWidth;
    flipSheet.style.transformOrigin = transformOrigin;
    flipSheet.style.transform = 'rotateY(' + startAngle + 'deg)';
    flipSheet.classList.add('is-active');

    // Pre-reveal underlying destination pages so user sees the new spread beneath the peel
    if (direction > 0) {
      if (baseImgRight && toInfo.right) {
        baseImgRight.src = BASE_ASSET_PATH + 'page-' + padNum(toInfo.right) + '.jpg';
      }
    } else {
      if (baseImgLeft && toInfo.left) {
        baseImgLeft.src = BASE_ASSET_PATH + 'page-' + padNum(toInfo.left) + '.jpg';
      }
    }

    const duration = 580;
    const startTime = performance.now();

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = easeInOutCubic(progress);
      const currentAngle = startAngle + (endAngle - startAngle) * ease;

      flipSheet.style.transform = 'rotateY(' + currentAngle.toFixed(2) + 'deg)';

      // iPhone Duo liquid glass arc curve
      const arc = Math.sin(progress * Math.PI);

      // 1. Dynamic progressive frosted glass blur & saturation boost
      const blurPx = (arc * 6.5).toFixed(1);
      const satVal = (1.0 + arc * 0.35).toFixed(2);
      const imgFilter = 'blur(' + blurPx + 'px) saturate(' + satVal + ')';
      if (flipFrontImg) flipFrontImg.style.filter = imgFilter;
      if (flipBackImg) flipBackImg.style.filter = imgFilter;

      // 2. Liquid glass semi-transparency (drops to ~0.84 at fold apex)
      const sheetOpacity = (1.0 - arc * 0.16).toFixed(3);
      flipSheet.style.opacity = sheetOpacity;

      // 3. Dynamic 3D liquid shadow depth
      const shadowDist = (16 + arc * 28).toFixed(0);
      const shadowBlur = (30 + arc * 45).toFixed(0);
      const shadowAlpha = (0.28 + arc * 0.28).toFixed(2);
      flipSheet.style.boxShadow = '0 ' + shadowDist + 'px ' + shadowBlur + 'px -8px rgba(46, 8, 21, ' + shadowAlpha + '), 0 8px 24px rgba(0, 0, 0, 0.3)';

      // 4. Specular caustic highlight along sheet bend
      if (flipHighlight) flipHighlight.style.opacity = (arc * 0.78).toFixed(3);
      if (flipShadow) flipShadow.style.opacity = (arc * 0.60).toFixed(3);

      // 5. Liquid gloss refraction wave gliding across the glass face
      const glossX = ((progress - 0.5) * 120).toFixed(1);
      if (flipFrontGloss) {
        flipFrontGloss.style.opacity = (arc * 0.85).toFixed(3);
        flipFrontGloss.style.transform = 'translateX(' + glossX + '%)';
      }
      if (flipBackGloss) {
        flipBackGloss.style.opacity = (arc * 0.85).toFixed(3);
        flipBackGloss.style.transform = 'translateX(' + glossX + '%)';
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        flipSheet.classList.remove('is-active');
        flipSheet.style.transform = 'none';
        flipSheet.style.opacity = '1';
        flipSheet.style.boxShadow = '';
        if (flipFrontImg) flipFrontImg.style.filter = 'none';
        if (flipBackImg) flipBackImg.style.filter = 'none';
        if (flipHighlight) flipHighlight.style.opacity = '0';
        if (flipShadow) flipShadow.style.opacity = '0';
        if (flipFrontGloss) flipFrontGloss.style.opacity = '0';
        if (flipBackGloss) flipBackGloss.style.opacity = '0';
        if (typeof onComplete === 'function') onComplete();
      }
    }

    requestAnimationFrame(tick);
  }

  // Navigate between Spreads with 3D Page Turn
  function goToSpread(targetIdx) {
    if (targetIdx === currentSpreadIdx || targetIdx < 0 || targetIdx >= TOTAL_SPREADS || isAnimating) return;

    isAnimating = true;
    const fromIdx = currentSpreadIdx;
    const toIdx = targetIdx;
    const direction = toIdx > fromIdx ? 1 : -1;
    const nextInfo = getSpreadInfo(toIdx);

    // Update viewport single vs spread layout
    if (nextInfo.isSingle) {
      viewport.classList.remove('is-spread');
      viewport.classList.add('is-single');
    } else {
      viewport.classList.remove('is-single');
      viewport.classList.add('is-spread');
    }
    resizeCanvas();

    function finishNavigation() {
      currentSpreadIdx = toIdx;
      syncBaseSpread(toIdx);
      updateUI();
      if (canvas) {
        canvas.style.opacity = '0';
        canvas.style.pointerEvents = 'none';
        canvas.classList.remove('is-active');
      }
      isAnimating = false;
    }

    // Run 3D page turn animation
    animate3DPageTurn(fromIdx, toIdx, direction, finishNavigation);

    // Optional WebGL visual layer (runs concurrently if available)
    if (foldingEngine && foldingEngine.gl && foldingEngine.program) {
      Promise.all([loadSpreadCanvas(fromIdx), loadSpreadCanvas(toIdx)]).then(function (canvases) {
        if (canvases[0] && canvases[1] && canvas) {
          try {
            canvas.style.opacity = '1';
            canvas.style.pointerEvents = 'auto';
            canvas.classList.add('is-active');
            const isSpreadMode = (!getSpreadInfo(fromIdx).isSingle) || (!nextInfo.isSingle);
            foldingEngine.transition(canvases[0], canvases[1], direction, isSpreadMode, 580, function () {
              if (canvas) {
                canvas.style.opacity = '0';
                canvas.style.pointerEvents = 'none';
                canvas.classList.remove('is-active');
              }
            });
          } catch (e) {
            // WebGL failed, 3D CSS animation seamlessly carries the presentation
          }
        }
      }).catch(function () {});
    }
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
        pageNumEl.textContent = info.left + '–' + info.right;
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
      item.setAttribute('aria-label', 'Jump to page ' + i);

      const img = document.createElement('img');
      img.src = BASE_ASSET_PATH + 'page-' + padNum(i) + '.webp';
      img.alt = 'Page ' + i;
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

    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let isTracking = false;

    function handleStart(clientX, clientY) {
      if (isAnimating) return;
      isTracking = true;
      startX = clientX;
      startY = clientY;
      currentX = clientX;
    }

    function handleMove(clientX, clientY) {
      if (!isTracking || isAnimating) return;
      currentX = clientX;
    }

    function handleEnd() {
      if (!isTracking) return;
      isTracking = false;
      const deltaX = currentX - startX;
      if (deltaX < -32) {
        nextSpread();
      } else if (deltaX > 32) {
        prevSpread();
      }
    }

    viewport.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    viewport.addEventListener('touchmove', function (e) {
      if (e.touches.length === 1 && isTracking) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    viewport.addEventListener('touchend', handleEnd, { passive: true });
    viewport.addEventListener('touchcancel', handleEnd, { passive: true });

    viewport.addEventListener('mousedown', function (e) {
      if (e.button === 0) handleStart(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', function (e) {
      if (isTracking) handleMove(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', function () {
      if (isTracking) handleEnd();
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
      syncBaseSpread(currentSpreadIdx);
      setTimeout(function () {
        syncBaseSpread(currentSpreadIdx);
        resizeCanvas();
      }, 50);
      setTimeout(function () {
        syncBaseSpread(currentSpreadIdx);
        resizeCanvas();
      }, 200);
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

    // 3D Flip Sheet Stage Elements (iPhone Duo Liquid Glass Engine)
    flipSheet = document.getElementById('prospectusFlipSheet');
    flipFrontImg = document.getElementById('prospectusFlipFrontImg');
    flipBackImg = document.getElementById('prospectusFlipBackImg');
    flipHighlight = document.getElementById('prospectusFlipHighlight');
    flipShadow = document.getElementById('prospectusFlipShadow');
    flipFrontGloss = document.getElementById('prospectusFlipFrontGloss');
    flipBackGloss = document.getElementById('prospectusFlipBackGloss');

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
          duration: 580
        });
        if (!foldingEngine.gl || !foldingEngine.program) {
          foldingEngine = null;
        }
      } catch (err) {
        foldingEngine = null;
      }
    }

    // Set initial Cover spread (Spread 0)
    currentSpreadIdx = 0;
    syncBaseSpread(0);
    resizeCanvas();

    // Preload first two spreads (Cover & Pages 2-3)
    Promise.all([loadSpreadCanvas(0), loadSpreadCanvas(1)]).then(function (canvases) {
      if (canvases[0] && foldingEngine) {
        foldingEngine.uploadImage(foldingEngine.currentTexture, canvases[0]);
        if (canvases[1]) foldingEngine.uploadImage(foldingEngine.nextTexture, canvases[1]);
      }
      if (loaderEl) loaderEl.classList.add('is-hidden');
    }).catch(function () {
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
      syncBaseSpread(currentSpreadIdx);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProspectusViewer);
  } else {
    initProspectusViewer();
  }
})();
