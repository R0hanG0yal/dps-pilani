/**
 * ============================================================================
 * PROSPECTUS FOLDING PAGE TRANSITION COMPONENT (IPHONE DUO SPREAD ENGINE)
 * ============================================================================
 * Dual-Screen Unfolded iPhone Duo Page Transitions & Blurry Transparent Glass
 * Physics for Digital School Prospectus.
 * 
 * - Spread 0: Single Page Front Cover
 * - Spreads 1-9: Unfolded Dual-Screen Two-Page Spread with Virtual Center Hinge
 * - Spread 10: Single Page Back Cover
 * - Blurry Transparent Frosted Glass effect with zero dark shadows
 * 
 * Source Reference: https://github.com/chuspeeism/iphone-duo
 * 
 * MIT License
 * Copyright (c) 2026 jadon7 (chuspeeism)
 * Copyright (c) 2026 Durga Public School / Dageroz
 * ============================================================================
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ProspectusFoldingTransition = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // --------------------------------------------------------------------------
  // GLSL SHADER SOURCES (Unfolded iPhone Duo Dual-Screen Virtual Hinge)
  // --------------------------------------------------------------------------

  const VS_SOURCE = `
    attribute vec2 a_position;   // [0, 1] grid coords
    attribute vec2 a_texCoord;   // [0, 1] UV coords

    uniform float u_progress;    // 0.0 to 1.0 fold transition
    uniform float u_direction;   // +1.0 = Next (turn left), -1.0 = Prev (turn right)
    uniform float u_isBackground;// 1.0 = flat bottom page, 0.0 = folding top sheet
    uniform float u_perspective; // 3D camera foreshortening strength
    uniform float u_aspect;      // Viewport aspect ratio (width / height)
    uniform float u_isSpread;    // 1.0 = dual-page unfolded spread, 0.0 = single page

    varying vec2 v_texCoord;
    varying float v_edgeDist;
    varying float v_foldZ;

    #define PI 3.14159265359

    void main() {
      v_texCoord = a_texCoord;

      if (u_isBackground > 0.5) {
        // Flat underlying target sheet (positioned at origin Z = 0)
        vec2 flatPos = a_position * 2.0 - 1.0;
        gl_Position = vec4(flatPos.x, flatPos.y, 0.0, 1.0);
        v_edgeDist = 0.0;
        v_foldZ = 0.0;
        return;
      }

      float foldAngle = u_progress * PI;
      float u = 0.0;
      float theta = foldAngle;
      float xRot = 0.0;
      float zRot = 0.0;

      // Unfolded iPhone Duo Mode (Dual-Page Spread)
      if (u_isSpread > 0.5) {
        if (u_direction > 0.0) {
          // NEXT: Left page (x < 0.5) stays flat; Right page (x >= 0.5) folds across center hinge
          if (a_position.x < 0.5) {
            vec2 flatPos = a_position * 2.0 - 1.0;
            gl_Position = vec4(flatPos.x, flatPos.y, 0.0, 1.0);
            v_edgeDist = 0.0;
            v_foldZ = 0.0;
            return;
          }
          // Distance from center hinge (x = 0.5) to right edge (x = 1.0) -> [0.0, 0.5]
          u = a_position.x - 0.5;
        } else {
          // PREV: Right page (x >= 0.5) stays flat; Left page (x < 0.5) folds across center hinge
          if (a_position.x >= 0.5) {
            vec2 flatPos = a_position * 2.0 - 1.0;
            gl_Position = vec4(flatPos.x, flatPos.y, 0.0, 1.0);
            v_edgeDist = 0.0;
            v_foldZ = 0.0;
            return;
          }
          // Distance from center hinge (x = 0.5) to left edge (x = 0.0) -> [0.0, 0.5]
          u = 0.5 - a_position.x;
        }
      } else {
        // Single Page Mode (Cover / Back Cover)
        u = (u_direction > 0.0) ? a_position.x : (1.0 - a_position.x);
      }

      v_edgeDist = clamp(u * 2.0, 0.0, 1.0);

      // Flexible spine strip using Hermite cubic spline (iPhone Duo bendStrip)
      float halfWidth = 0.055;
      if (u <= 0.0) {
        xRot = 0.0;
        zRot = 0.0;
      } else if (u < halfWidth) {
        float t = u / halfWidth;
        float t2 = t * t;
        float t3 = t2 * t;
        float localAngle = (3.0 * t2 - 2.0 * t3) * theta;
        xRot = u * cos(localAngle);
        zRot = u * sin(localAngle);
      } else {
        xRot = u * cos(theta);
        zRot = u * sin(theta);
      }

      // Parabolic subtle paper/glass sheet curvature
      float yDist = abs(a_position.y - 0.5) * 2.0;
      float bow = 0.02 * pow(max(0.0001, yDist), 2.0) * sin(u_progress * PI);
      zRot += bow;
      v_foldZ = zRot;

      float xFinal = 0.0;
      if (u_isSpread > 0.5) {
        // Pivot around center spine at x = 0.5
        xFinal = (u_direction > 0.0) ? (0.5 + xRot) : (0.5 - xRot);
      } else {
        // Pivot around outer spine
        xFinal = (u_direction > 0.0) ? xRot : (1.0 - xRot);
      }

      float ndcX = xFinal * 2.0 - 1.0;
      float ndcY = a_position.y * 2.0 - 1.0;

      // 3D perspective foreshortening
      float cameraDistance = 2.4;
      float w = 1.0 - (zRot * 0.62) / cameraDistance;
      w = max(w, 0.22);

      gl_Position = vec4(ndcX / w, ndcY / w, zRot * 0.4, 1.0);
    }
  `;

  // Fragment Shader: Blurry Transparent Glass Effect (Zero dark shadows)
  const FS_SOURCE = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif

    varying vec2 v_texCoord;
    varying float v_edgeDist;
    varying float v_foldZ;

    uniform sampler2D u_currentTex;
    uniform sampler2D u_nextTex;
    uniform float u_progress;
    uniform float u_direction;
    uniform float u_isBackground;
    uniform vec2 u_texPixel;

    #define PI 3.14159265359

    void main() {
      // CASE 1: UNDERLYING SHEET (Revealed page underneath)
      if (u_isBackground > 0.5) {
        vec4 bgCol = texture2D(u_nextTex, v_texCoord);

        // Soft, luminous warm transmission reflection (NO BLACK SHADOW)
        float motion = sin(u_progress * PI);
        float softLight = smoothstep(0.42, 0.0, v_edgeDist) * motion * 0.16;
        bgCol.rgb += vec3(0.05, 0.04, 0.03) * softLight;

        gl_FragColor = bgCol;
        return;
      }

      // CASE 2: FOLDING PAGE WITH BLURRY TRANSPARENT GLASS EFFECT
      float edge = clamp(v_edgeDist, 0.0, 1.0);
      float motion = sin(u_progress * PI);

      // Progressive blur: strongest at outer moving edge, soft/zero at the hinge
      float blurGradient = clamp(edge, 0.0, 1.0);
      float radius = 54.0 * motion * pow(max(0.0001, blurGradient), 1.25);

      vec2 sourceUV = v_texCoord;
      vec3 color = vec3(0.0);

      // High-performance unrolled texture sampling (100% GLSL ES 1.0 & ANGLE compliant)
      vec4 baseColor = texture2D(u_currentTex, sourceUV);
      vec3 color = baseColor.rgb;

      if (radius > 0.08) {
        float blurAmt = clamp(radius * 0.32, 0.0, 12.0);
        vec2 offX = vec2(u_texPixel.x * blurAmt, 0.0);
        vec2 offY = vec2(0.0, u_texPixel.y * blurAmt);
        vec2 offD = vec2(u_texPixel.x * blurAmt * 0.707, u_texPixel.y * blurAmt * 0.707);

        vec3 blur = baseColor.rgb * 0.28;
        blur += texture2D(u_currentTex, clamp(sourceUV + offX, 0.001, 0.999)).rgb * 0.12;
        blur += texture2D(u_currentTex, clamp(sourceUV - offX, 0.001, 0.999)).rgb * 0.12;
        blur += texture2D(u_currentTex, clamp(sourceUV + offY, 0.001, 0.999)).rgb * 0.12;
        blur += texture2D(u_currentTex, clamp(sourceUV - offY, 0.001, 0.999)).rgb * 0.12;
        blur += texture2D(u_currentTex, clamp(sourceUV + offD, 0.001, 0.999)).rgb * 0.06;
        blur += texture2D(u_currentTex, clamp(sourceUV - offD, 0.001, 0.999)).rgb * 0.06;
        blur += texture2D(u_currentTex, clamp(sourceUV + vec2(offD.x, -offD.y), 0.001, 0.999)).rgb * 0.06;
        blur += texture2D(u_currentTex, clamp(sourceUV + vec2(-offD.x, offD.y), 0.001, 0.999)).rgb * 0.06;

        color = mix(baseColor.rgb, blur, clamp(radius * 0.12, 0.0, 1.0));
      }

      // --- BLURRY TRANSPARENT GLASS SHADING (NO BLACK SHADOW) ---

      // 1. Frosted glass luminance transmission (brightens slightly during motion)
      float glassLuminance = 1.0 + 0.14 * motion * blurGradient;
      color *= glassLuminance;

      // 2. Crystal glass specular sheen along the 3D bend apex
      float specularSheen = pow(clamp(sin(u_progress * PI), 0.0, 1.0), 5.0) * pow(clamp(1.0 - abs(v_foldZ - 0.4), 0.0, 1.0), 3.0) * 0.42;
      color += vec3(1.0, 0.98, 0.94) * specularSheen;

      // 3. Prismatic chromatic edge glow along moving glass rim
      float rimGlow = smoothstep(0.72, 1.0, edge) * motion * 0.28;
      color.r += rimGlow * 1.08;
      color.g += rimGlow * 1.02;
      color.b += rimGlow * 1.18; // Crisp crystal refraction

      // 4. Subtle frosted glass transparency: allows underlying sheet to refract through
      float glassAlpha = mix(1.0, 0.82, motion * pow(max(0.0001, blurGradient), 0.85));

      // 5. Smooth dissolution as the turning sheet passes 90 degrees
      if (u_progress > 0.50) {
        glassAlpha *= smoothstep(1.0, 0.50, u_progress);
      }

      gl_FragColor = vec4(color, glassAlpha);
    }
  `;

  // --------------------------------------------------------------------------
  // PROSPECTUS FOLDING TRANSITION CLASS
  // --------------------------------------------------------------------------

  class ProspectusFoldingTransition {
    constructor(options) {
      if (!options || !options.canvas) {
        throw new Error('[ProspectusFoldingTransition] A valid canvas element is required');
      }

      this.canvas = options.canvas;
      this.gridCols = options.gridCols || 54;
      this.gridRows = options.gridRows || 28;
      this.duration = options.duration || 660;
      this.onComplete = options.onComplete || null;

      this.gl = null;
      this.program = null;
      this.posBuffer = null;
      this.texBuffer = null;
      this.indexBuffer = null;
      this.indexCount = 0;

      this.currentTexture = null;
      this.nextTexture = null;

      this.progress = 0;
      this.direction = 1; // +1 = Next, -1 = Prev
      this.isSpread = false;
      this.isAnimating = false;
      this.animationStartTime = 0;
      this.currentTween = null;

      if (!this.initWebGL()) {
        throw new Error('WebGL initialization failed in ProspectusFoldingTransition');
      }
      this.buildGeometry();
    }

    initWebGL() {
      const gl = this.canvas.getContext('webgl', { antialias: true, alpha: true, depth: false }) ||
                 this.canvas.getContext('experimental-webgl', { antialias: true, alpha: true, depth: false }) ||
                 this.canvas.getContext('webgl2', { antialias: true, alpha: true, depth: false });

      if (!gl) {
        console.error('[ProspectusFoldingTransition] WebGL not supported on this device.');
        return false;
      }

      this.gl = gl;

      // Enable standard blending for frosted glass translucency
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      // Compile Shaders
      const vs = this.compileShader(VS_SOURCE, gl.VERTEX_SHADER);
      const fs = this.compileShader(FS_SOURCE, gl.FRAGMENT_SHADER);
      if (!vs || !fs) return false;

      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program Link Error:', gl.getProgramInfoLog(program));
        return false;
      }

      this.program = program;

      // Create persistent texture handles
      this.currentTexture = gl.createTexture();
      this.nextTexture = gl.createTexture();
      this.setupTextureParameters(this.currentTexture);
      this.setupTextureParameters(this.nextTexture);

      return true;
    }

    compileShader(src, type) {
      const gl = this.gl;
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader Compile Error:', gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    setupTextureParameters(tex) {
      const gl = this.gl;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    }

    buildGeometry() {
      const gl = this.gl;
      const cols = this.gridCols;
      const rows = this.gridRows;

      const positions = [];
      const texCoords = [];
      const indices = [];

      // Generate vertex grid
      for (let r = 0; r <= rows; r++) {
        const v = r / rows;
        for (let c = 0; c <= cols; c++) {
          const u = c / cols;
          positions.push(u, v);
          texCoords.push(u, 1.0 - v); // Invert V for standard image texture space
        }
      }

      // Generate triangle index list
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i0 = r * (cols + 1) + c;
          const i1 = i0 + 1;
          const i2 = (r + 1) * (cols + 1) + c;
          const i3 = i2 + 1;

          // Two triangles per quad
          indices.push(i0, i1, i2);
          indices.push(i1, i3, i2);
        }
      }

      this.indexCount = indices.length;

      // Position buffer
      this.posBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

      // TexCoord buffer
      this.texBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.texBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

      // Index buffer
      this.indexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    }

    uploadImage(tex, imageOrCanvas) {
      if (!this.gl || !tex || !imageOrCanvas) return false;
      const gl = this.gl;
      try {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageOrCanvas);
        this.setupTextureParameters(tex);
        return true;
      } catch (err) {
        console.warn('[ProspectusFoldingTransition] texImage2D error:', err);
        return false;
      }
    }

    resize() {
      if (!this.canvas || this.isAnimating) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(this.canvas.clientWidth * dpr);
      const h = Math.round(this.canvas.clientHeight * dpr);

      if (w > 0 && h > 0 && (this.canvas.width !== w || this.canvas.height !== h)) {
        this.canvas.width = w;
        this.canvas.height = h;
        if (this.gl) {
          this.gl.viewport(0, 0, w, h);
        }
      }
    }

    renderFrame(progress, direction, isSpread) {
      const gl = this.gl;
      if (!gl || !this.program) return;

      if (!this.isAnimating) {
        this.resize();
      }

      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(this.program);

      // Uniform Locations
      const uProgress = gl.getUniformLocation(this.program, 'u_progress');
      const uDirection = gl.getUniformLocation(this.program, 'u_direction');
      const uIsBackground = gl.getUniformLocation(this.program, 'u_isBackground');
      const uPerspective = gl.getUniformLocation(this.program, 'u_perspective');
      const uAspect = gl.getUniformLocation(this.program, 'u_aspect');
      const uIsSpread = gl.getUniformLocation(this.program, 'u_isSpread');
      const uTexPixel = gl.getUniformLocation(this.program, 'u_texPixel');
      const uCurrentTex = gl.getUniformLocation(this.program, 'u_currentTex');
      const uNextTex = gl.getUniformLocation(this.program, 'u_nextTex');

      gl.uniform1f(uProgress, progress);
      gl.uniform1f(uDirection, direction);
      gl.uniform1f(uIsSpread, isSpread ? 1.0 : 0.0);
      gl.uniform1f(uPerspective, 1.85);
      gl.uniform1f(uAspect, (this.canvas.width || 1) / (this.canvas.height || 1));
      gl.uniform2f(uTexPixel, 1.0 / Math.max(1, this.canvas.width), 1.0 / Math.max(1, this.canvas.height));

      // Bind Textures
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.currentTexture);
      gl.uniform1i(uCurrentTex, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, this.nextTexture);
      gl.uniform1i(uNextTex, 1);

      // Bind Attributes
      const aPos = gl.getAttribLocation(this.program, 'a_position');
      gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const aTex = gl.getAttribLocation(this.program, 'a_texCoord');
      gl.bindBuffer(gl.ARRAY_BUFFER, this.texBuffer);
      gl.enableVertexAttribArray(aTex);
      gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

      // PASS 1: Draw underlying revealed spread (if in progress)
      if (progress > 0.001) {
        gl.uniform1f(uIsBackground, 1.0);
        gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
      }

      // PASS 2: Draw folding spread with 3D glass rotation & blur
      if (progress < 0.999) {
        gl.uniform1f(uIsBackground, 0.0);
        gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
      }
    }

    transition(currentCanvas, nextCanvas, direction, isSpread, duration, callback) {
      if (this.isAnimating) return;
      this.isAnimating = true;

      const ok1 = this.uploadImage(this.currentTexture, currentCanvas);
      const ok2 = this.uploadImage(this.nextTexture, nextCanvas);
      if (!ok1 || !ok2) {
        this.isAnimating = false;
        if (typeof callback === 'function') callback();
        return;
      }

      this.direction = direction || 1;
      this.isSpread = !!isSpread;
      const animDuration = (duration || this.duration) / 1000;

      const self = this;
      const state = { progress: 0 };

      if (typeof window !== 'undefined' && window.gsap) {
        this.currentTween = window.gsap.to(state, {
          progress: 1.0,
          duration: animDuration,
          ease: "power2.inOut",
          onUpdate: function () {
            self.progress = state.progress;
            self.renderFrame(state.progress, self.direction, self.isSpread);
          },
          onComplete: function () {
            self.isAnimating = false;
            self.progress = 0;
            self.uploadImage(self.currentTexture, nextCanvas);
            self.renderFrame(0, self.direction, self.isSpread);
            if (typeof callback === 'function') callback();
            if (typeof self.onComplete === 'function') self.onComplete();
          }
        });
      } else {
        const startTime = performance.now();
        const durMs = animDuration * 1000;

        function loop(now) {
          const elapsed = now - startTime;
          const t = Math.min(1.0, Math.max(0.0, elapsed / durMs));
          const ease = t * t * (3.0 - 2.0 * t); // Smooth Hermite

          self.progress = ease;
          self.renderFrame(ease, self.direction, self.isSpread);

          if (t < 1.0) {
            requestAnimationFrame(loop);
          } else {
            self.isAnimating = false;
            self.progress = 0;
            self.uploadImage(self.currentTexture, nextCanvas);
            self.renderFrame(0, self.direction, self.isSpread);
            if (typeof callback === 'function') callback();
            if (typeof self.onComplete === 'function') self.onComplete();
          }
        }

        requestAnimationFrame(loop);
      }
    }
  }

  return ProspectusFoldingTransition;
});
