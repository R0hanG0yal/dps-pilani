/**
 * Durga Public School - Interactive 3D Cylinder Curl Prospectus Viewer
 * Replicates the exact Dmitry Lepisov 3D cylinder roll / page curl animation
 * with specular highlight line, crease drop shadow, parabolic edge curvature,
 * and touch / mouse swipe dragging.
 */

(function () {
  'use strict';

  const TOTAL_PAGES = 20;
  const BASE_ASSET_PATH = 'assets/prospectus/';
  const DEFAULT_PDF_PATH = 'assets/docs/Durga-Public-School-Prospectus.pdf';

  // State
  let currentPage = 1;
  let targetPage = 2;
  let isAnimating = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragProgress = 0;
  let curlDirection = 1; // 1 = forward (to next), -1 = backward (to prev)
  let animationProgress = 0;
  let foldingEngine = null;
  let animationStartTime = 0;
  let animationDuration = 620; // ms
  let animationEasing = null;
  let animationStartProgress = 0;
  let animationTargetProgress = 1;
  let onAnimationComplete = null;

  // DOM Elements
  let container, viewport, canvas, gl;
  let prevBtn, nextBtn, pageNumEl, totalPagesEl, scrubber, thumbsDrawer, thumbsToggleBtn;
  let loaderEl, fullscreenBtn;

  // WebGL Resources
  let program = null;
  let positionBuffer = null;
  let texCoordBuffer = null;
  let currentTexture = null;
  let targetTexture = null;
  const textureCache = new Map();

  // WebGL Shaders
  const VS_SOURCE = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_texCoord = a_texCoord;
    }
  `;

  // Fragment Shader replicating Dmitry Lepisov's 3D Cylinder Roll
  const FS_SOURCE = `
    precision highp float;
    varying vec2 v_texCoord;
    uniform sampler2D u_currentTex;
    uniform sampler2D u_targetTex;
    uniform float u_progress;      // 0.0 (current) to 1.0 (target)
    uniform float u_direction;     // 1.0 = forward (peel left), -1.0 = backward
    uniform vec2 u_resolution;
    uniform float u_time;

    #define PI 3.14159265359

    void main() {
      vec2 uv = v_texCoord;
      
      // If no curl progress, render pure current page
      if (u_progress <= 0.0001) {
        gl_FragColor = texture2D(u_currentTex, uv);
        return;
      }
      if (u_progress >= 0.9999) {
        gl_FragColor = texture2D(u_targetTex, uv);
        return;
      }

      // Cylinder curl parameters matching reference video
      float radius = 0.125;
      float rollTravel = 1.0 + (PI * radius);
      
      // Horizontal curl coordinate based on direction
      float x = (u_direction > 0.0) ? uv.x : (1.0 - uv.x);
      float rollApex = (1.0 + radius) - (u_progress * rollTravel);

      // Parabolic subtle edge bowing (paper deformation at top & bottom)
      float yDist = abs(uv.y - 0.5) * 2.0;
      float bow = 0.018 * pow(yDist, 2.0) * sin(u_progress * PI);
      float effectiveApex = rollApex - bow;

      float distFromRoll = x - effectiveApex;

      // 1. Region to the left/behind the cylinder: already unrolled, reveals target page
      if (distFromRoll > (PI * radius)) {
        // Revealed target sheet underneath
        vec4 targetColor = texture2D(u_targetTex, uv);
        
        // Crease shadow cast by the cylinder roll onto revealed sheet
        float shadowDist = distFromRoll - (PI * radius);
        float dropShadow = smoothstep(0.24, 0.0, shadowDist) * 0.42;
        targetColor.rgb = mix(targetColor.rgb, vec3(0.04, 0.01, 0.02), dropShadow);

        gl_FragColor = targetColor;
        return;
      }

      // 2. Region on the cylinder roll itself: peeling & wrapping
      if (distFromRoll > 0.0) {
        float angle = distFromRoll / radius;
        
        // Projected horizontal coordinate mapped on cylinder
        float projectedX = effectiveApex + sin(angle) * radius;
        float actualX = (u_direction > 0.0) ? projectedX : (1.0 - projectedX);
        vec2 curlUV = vec2(actualX, uv.y);

        // Chromatic aberration along high-curvature edge
        float caOffset = 0.0035 * sin(angle);
        float r = texture2D(u_currentTex, curlUV + vec2(caOffset, 0.0)).r;
        float g = texture2D(u_currentTex, curlUV).g;
        float b = texture2D(u_currentTex, curlUV - vec2(caOffset, 0.0)).b;
        vec4 curlColor = vec4(r, g, b, 1.0);

        // Specular highlight sheen line along apex (peak sheen at angle ~ PI/2)
        float specularSheen = pow(clamp(sin(angle), 0.0, 1.0), 14.0) * 0.58;
        
        // Inner crease shadow on underside of the curl
        float innerShadow = (1.0 - cos(angle)) * 0.28;
        
        curlColor.rgb += vec3(specularSheen * 0.95, specularSheen * 0.90, specularSheen * 0.85);
        curlColor.rgb = mix(curlColor.rgb, vec3(0.06, 0.02, 0.03), innerShadow);

        gl_FragColor = curlColor;
        return;
      }

      // 3. Region ahead of the cylinder: flat current page before curl reaches it
      vec4 flatColor = texture2D(u_currentTex, uv);
      
      // Very soft ambient shadow preceding the roll contact line
      float prepShadow = smoothstep(-0.08, 0.0, distFromRoll) * 0.16;
      flatColor.rgb = mix(flatColor.rgb, vec3(0.08, 0.02, 0.04), prepShadow);

      gl_FragColor = flatColor;
    }
  `;

  // Standard Cubic-Bezier Easing (Apple/Vestra style)
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // Format page number
  function padNum(num) {
    return num < 10 ? '0' + num : '' + num;
  }

  // Preload an image texture
  function loadPageImage(pageNum) {
    return new Promise(function (resolve) {
      if (textureCache.has(pageNum)) {
        resolve(textureCache.get(pageNum));
        return;
      }

      const img = new Image();
      // Same-origin relative image

      // Prefer WebP with fallback to JPG
      const webpSrc = `${BASE_ASSET_PATH}page-${padNum(pageNum)}.webp`;
      const jpgSrc = `${BASE_ASSET_PATH}page-${padNum(pageNum)}.jpg`;

      img.onload = function () {
        textureCache.set(pageNum, img);
        resolve(img);
      };

      img.onerror = function () {
        // Fallback to JPG
        const fallbackImg = new Image();
        // Same-origin relative image
        fallbackImg.onload = function () {
          textureCache.set(pageNum, fallbackImg);
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

  // WebGL Initialization
  function initWebGL() {
    if (!canvas) return false;

    gl = canvas.getContext('webgl', { antialias: true, alpha: false, preserveDrawingBuffer: false }) ||
         canvas.getContext('experimental-webgl');

    if (!gl) {
      console.warn('[Prospectus] WebGL not supported, falling back to 2D canvas');
      return false;
    }

    // Compile shaders
    function compileShader(src, type) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(VS_SOURCE, gl.VERTEX_SHADER);
    const fs = compileShader(FS_SOURCE, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return false;

    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return false;
    }

    gl.useProgram(program);

    // Fullscreen quad
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1
    ]);

    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Texture coords (inverted Y for WebGL)
    const texCoords = new Float32Array([
      0, 1,
      1, 1,
      0, 0,
      0, 0,
      1, 1,
      1, 0
    ]);

    texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    const aTexCoord = gl.getAttribLocation(program, 'a_texCoord');
    gl.enableVertexAttribArray(aTexCoord);
    gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 0, 0);

    // Create persistent WebGL textures
    currentTexture = gl.createTexture();
    targetTexture = gl.createTexture();

    configureTexture(currentTexture);
    configureTexture(targetTexture);

    return true;
  }

  function configureTexture(tex) {
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  }

  function uploadTexture(tex, image) {
    if (!gl || !tex || !image) return;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  }

  function resizeCanvas() {
    if (!canvas || !viewport) return;
    const rect = viewport.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      if (gl) {
        gl.viewport(0, 0, w, h);
      }
    }
  }

  // Render a single WebGL frame
  function renderFrame(progress, direction) {
    if (!gl || !program) return;

    resizeCanvas();

    gl.useProgram(program);

    // Uniforms
    const uProgress = gl.getUniformLocation(program, 'u_progress');
    const uDirection = gl.getUniformLocation(program, 'u_direction');
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uCurrentTex = gl.getUniformLocation(program, 'u_currentTex');
    const uTargetTex = gl.getUniformLocation(program, 'u_targetTex');

    gl.uniform1f(uProgress, progress);
    gl.uniform1f(uDirection, direction);
    gl.uniform2f(uResolution, canvas.width, canvas.height);

    // Bind textures
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, currentTexture);
    gl.uniform1i(uCurrentTex, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, targetTexture);
    gl.uniform1i(uTargetTex, 1);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  // Smooth Animation Loop with iPhone Duo folding shader engine
  function startTransition(fromPage, toPage, direction, duration, startProg) {
    if (isAnimating) return;
    isAnimating = true;

    currentPage = fromPage;
    targetPage = toPage;
    curlDirection = direction;
    animationDuration = duration || 640;
    animationStartProgress = typeof startProg === 'number' ? startProg : 0;
    animationTargetProgress = 1;
    animationStartTime = performance.now();

    Promise.all([loadPageImage(fromPage), loadPageImage(toPage)]).then(function (imgs) {
      if (!imgs[0] || !imgs[1]) {
        isAnimating = false;
        return;
      }

      // Delegate to ProspectusFoldingTransition if loaded
      if (foldingEngine) {
        foldingEngine.transition(imgs[0], imgs[1], direction, animationDuration, function () {
          currentPage = toPage;
          isAnimating = false;
          updateUI();
          if (typeof onAnimationComplete === 'function') {
            onAnimationComplete();
            onAnimationComplete = null;
          }
        });
        return;
      }

      uploadTexture(currentTexture, imgs[0]);
      uploadTexture(targetTexture, imgs[1]);

      function loop(now) {
        const elapsed = now - animationStartTime;
        const rawT = Math.min(1, Math.max(0, elapsed / animationDuration));
        const easedT = easeOutCubic(rawT);
        
        const currentP = animationStartProgress + (animationTargetProgress - animationStartProgress) * easedT;
        renderFrame(currentP, curlDirection);

        if (rawT < 1) {
          requestAnimationFrame(loop);
        } else {
          // Finished
          currentPage = toPage;
          isAnimating = false;
          renderFrame(0, 1);
          uploadTexture(currentTexture, imgs[1]);
          updateUI();
          if (typeof onAnimationComplete === 'function') {
            onAnimationComplete();
            onAnimationComplete = null;
          }
        }
      }

      requestAnimationFrame(loop);
    });
  }

  // Jump or Step
  function goToPage(pageNum) {
    if (pageNum === currentPage || pageNum < 1 || pageNum > TOTAL_PAGES || isAnimating) return;
    const dir = pageNum > currentPage ? 1 : -1;
    startTransition(currentPage, pageNum, dir, 600, 0);
  }

  function nextPage() {
    if (currentPage < TOTAL_PAGES && !isAnimating) {
      goToPage(currentPage + 1);
    }
  }

  function prevPage() {
    if (currentPage > 1 && !isAnimating) {
      goToPage(currentPage - 1);
    }
  }

  // Update UI Controls
  function updateUI() {
    if (pageNumEl) pageNumEl.textContent = currentPage;
    if (totalPagesEl) totalPagesEl.textContent = TOTAL_PAGES;
    if (scrubber) scrubber.value = currentPage;

    if (prevBtn) prevBtn.disabled = currentPage <= 1;
    if (nextBtn) nextBtn.disabled = currentPage >= TOTAL_PAGES;

    const baseImg = document.getElementById('prospectusBaseImage');
    if (baseImg) {
      baseImg.src = BASE_ASSET_PATH + 'page-' + padNum(currentPage) + '.webp';
    }

    // Update active thumb
    if (thumbsDrawer) {
      const thumbs = thumbsDrawer.querySelectorAll('.prospectus-thumb-item');
      thumbs.forEach(function (thumb, idx) {
        if (idx + 1 === currentPage) {
          thumb.classList.add('is-active');
        } else {
          thumb.classList.remove('is-active');
        }
      });
    }
  }

  // Build Thumbnail Strip
  function buildThumbnails() {
    if (!thumbsDrawer) return;
    const strip = thumbsDrawer.querySelector('.prospectus-thumbs-strip');
    if (!strip) return;

    strip.innerHTML = '';
    for (let i = 1; i <= TOTAL_PAGES; i++) {
      const item = document.createElement('div');
      item.className = 'prospectus-thumb-item' + (i === currentPage ? ' is-active' : '');
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

  // Touch and Mouse Interactive Drag gestures
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

      // Check dominant axis
      if (Math.abs(deltaY) > Math.abs(deltaX) && dragProgress === 0) {
        // Vertical scroll intent: allow page scrolling
        return;
      }

      const rect = viewport.getBoundingClientRect();
      const normDelta = deltaX / rect.width;

      if (normDelta < 0 && currentPage < TOTAL_PAGES) {
        // Swiping Left -> Next Page
        curlDirection = 1;
        dragProgress = Math.min(1, Math.abs(normDelta));
        targetPage = currentPage + 1;
      } else if (normDelta > 0 && currentPage > 1) {
        // Swiping Right -> Prev Page
        curlDirection = -1;
        dragProgress = Math.min(1, Math.abs(normDelta));
        targetPage = currentPage - 1;
      } else {
        dragProgress = 0;
        return;
      }

      // Render interactive drag position in real-time
      if (foldingEngine) {
        Promise.all([loadPageImage(currentPage), loadPageImage(targetPage)]).then(function (imgs) {
          if (!imgs[0] || !imgs[1]) return;
          foldingEngine.uploadImage(foldingEngine.currentTexture, imgs[0]);
          foldingEngine.uploadImage(foldingEngine.nextTexture, imgs[1]);
          foldingEngine.setProgress(dragProgress, curlDirection);
        });
        return;
      }

      Promise.all([loadPageImage(currentPage), loadPageImage(targetPage)]).then(function (imgs) {
        if (!imgs[0] || !imgs[1]) return;
        uploadTexture(currentTexture, imgs[0]);
        uploadTexture(targetTexture, imgs[1]);
        renderFrame(dragProgress, curlDirection);
      });
    }

    function handleEnd() {
      if (!isDragging) return;
      isDragging = false;

      if (dragProgress >= 0.22 && targetPage !== currentPage) {
        // Drag threshold reached: complete flip smoothly
        startTransition(currentPage, targetPage, curlDirection, 420, dragProgress);
      } else if (dragProgress > 0) {
        // Spring snap-back to current page
        startTransition(targetPage, currentPage, -curlDirection, 320, 1 - dragProgress);
      }
      dragProgress = 0;
    }

    // Touch events
    viewport.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) {
        handleStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    viewport.addEventListener('touchmove', function (e) {
      if (e.touches.length === 1 && isDragging) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    viewport.addEventListener('touchend', handleEnd, { passive: true });
    viewport.addEventListener('touchcancel', handleEnd, { passive: true });

    // Mouse events
    viewport.addEventListener('mousedown', function (e) {
      if (e.button === 0) {
        handleStart(e.clientX, e.clientY);
      }
    });

    window.addEventListener('mousemove', function (e) {
      if (isDragging) {
        handleMove(e.clientX, e.clientY);
      }
    });

    window.addEventListener('mouseup', function () {
      if (isDragging) {
        handleEnd();
      }
    });
  }

  // Keyboard navigation
  function initKeyboard() {
    window.addEventListener('keydown', function (e) {
      // Only when prospectus is in view
      if (!viewport) return;
      const rect = viewport.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevPage();
      }
    });
  }

  // Fullscreen support
  function initFullscreen() {
    if (!fullscreenBtn) return;
    const stage = document.querySelector('.prospectus-stage-wrap');
    if (!stage) return;

    fullscreenBtn.addEventListener('click', function () {
      if (!document.fullscreenElement) {
        if (stage.requestFullscreen) {
          stage.requestFullscreen();
        } else if (stage.webkitRequestFullscreen) {
          stage.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });

    document.addEventListener('fullscreenchange', function () {
      setTimeout(resizeCanvas, 150);
    });
  }

  // Main Mount Routine
  function initProspectusViewer() {
    container = document.querySelector('.prospectus-viewer-container');
    if (!container) return;

    viewport = container.querySelector('.prospectus-canvas-viewport');
    canvas = document.getElementById('prospectusWebGLCanvas');
    prevBtn = document.getElementById('prospectusPrevBtn');
    nextBtn = document.getElementById('prospectusNextBtn');
    pageNumEl = document.getElementById('prospectusCurrentPage');
    totalPagesEl = document.getElementById('prospectusTotalPages');
    scrubber = document.getElementById('prospectusScrubber');
    thumbsDrawer = document.getElementById('prospectusThumbsDrawer');
    thumbsToggleBtn = document.getElementById('prospectusThumbsToggle');
    loaderEl = document.getElementById('prospectusLoader');
    fullscreenBtn = document.getElementById('prospectusFullscreenBtn');

    // Initialize iPhone Duo folding transition component
    if (typeof ProspectusFoldingTransition !== 'undefined') {
      try {
        foldingEngine = new ProspectusFoldingTransition({
          canvas: canvas,
          gridCols: 54,
          gridRows: 28,
          duration: 660
        });
      } catch (err) {
        console.warn('[Prospectus] ProspectusFoldingTransition init fallback:', err);
      }
    }

    if (!foldingEngine) {
      const ok = initWebGL();
      if (!ok) {
        console.warn('[Prospectus] WebGL initialization unsuccessful.');
        return;
      }
    }

    // Preload first 3 pages
    Promise.all([loadPageImage(1), loadPageImage(2), loadPageImage(3)]).then(function (imgs) {
      if (imgs[0]) {
        if (foldingEngine) {
          foldingEngine.uploadImage(foldingEngine.currentTexture, imgs[0]);
          if (imgs[1]) foldingEngine.uploadImage(foldingEngine.nextTexture, imgs[1]);
          foldingEngine.renderFrame(0, 1);
        } else {
          uploadTexture(currentTexture, imgs[0]);
          if (imgs[1]) uploadTexture(targetTexture, imgs[1]);
          renderFrame(0, 1);
        }
      }
      if (loaderEl) loaderEl.classList.add('is-hidden');
    });

    // Wire buttons
    if (prevBtn) prevBtn.addEventListener('click', prevPage);
    if (nextBtn) nextBtn.addEventListener('click', nextPage);

    if (scrubber) {
      scrubber.min = 1;
      scrubber.max = TOTAL_PAGES;
      scrubber.value = 1;
      scrubber.addEventListener('input', function (e) {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val)) goToPage(val);
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

    window.addEventListener('resize', resizeCanvas);
  }

  // Auto-init on DOMContentLoaded or immediate
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProspectusViewer);
  } else {
    initProspectusViewer();
  }
})();

