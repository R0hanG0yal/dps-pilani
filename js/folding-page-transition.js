/**
 * ============================================================================
 * PROSPECTUS FOLDING PAGE TRANSITION COMPONENT
 * ============================================================================
 * Reusable WebGL / Shader page transition component based on the iPhone Duo
 * folding screen physics and progressive blur shader mathematics.
 * 
 * Source Reference: https://github.com/chuspeeism/iphone-duo
 * 
 * MIT License
 * Copyright (c) 2026 jadon7 (chuspeeism)
 * Copyright (c) 2026 Durga Public School / Dageroz
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
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
  // GLSL SHADER SOURCES (Derived & adapted from chuspeeism/iphone-duo)
  // --------------------------------------------------------------------------

  // Vertex Shader: Virtual Hinge Rotation, Hermite Spine Bending & 3D Perspective
  const VS_SOURCE = `
    attribute vec2 a_position;   // [0, 1] grid coords
    attribute vec2 a_texCoord;   // [0, 1] UV coords

    uniform float u_progress;    // 0.0 to 1.0 fold transition
    uniform float u_direction;   // +1.0 = Next (turn left), -1.0 = Prev (turn right)
    uniform float u_isBackground;// 1.0 = flat bottom page, 0.0 = folding top sheet
    uniform float u_perspective; // 3D camera foreshortening strength
    uniform float u_aspect;      // Viewport aspect ratio (width / height)

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

      // Normalized coordinates: u is distance from the hinge
      // Next (+1): Hinge is at left spine (x = 0), edge lifts from right (x = 1)
      // Prev (-1): Hinge is at right spine (x = 1), edge lifts from left (x = 0)
      float u = (u_direction > 0.0) ? a_position.x : (1.0 - a_position.x);
      v_edgeDist = u;

      // Fold angle: rotates from 0 to PI (0 to 180 deg)
      float foldAngle = u_progress * PI;

      // Flexible spine strip using Hermite cubic spline (adapted from iPhone Duo bendStrip)
      float halfWidth = 0.075;
      float theta = foldAngle;
      float xRot = 0.0;
      float zRot = 0.0;

      if (u <= 0.0) {
        xRot = 0.0;
        zRot = 0.0;
      } else if (u < halfWidth) {
        // Cubic Hermite transition across flexible spine
        float t = u / halfWidth;
        float t2 = t * t;
        float t3 = t2 * t;
        float localAngle = (3.0 * t2 - 2.0 * t3) * theta;
        xRot = u * cos(localAngle);
        zRot = u * sin(localAngle);
      } else {
        // Outer rigid sheet rotating around virtual hinge
        xRot = u * cos(theta);
        zRot = u * sin(theta);
      }

      // Subtly bow top and bottom edges (physical paper deformation)
      float yDist = abs(a_position.y - 0.5) * 2.0;
      float bow = 0.024 * pow(yDist, 2.0) * sin(u_progress * PI);
      zRot += bow;
      v_foldZ = zRot;

      // Reconstruct horizontal coordinate based on hinge side
      float xFinal = (u_direction > 0.0) ? xRot : (1.0 - xRot);

      // Map to Normalized Device Coordinates [-1, 1]
      float ndcX = xFinal * 2.0 - 1.0;
      float ndcY = a_position.y * 2.0 - 1.0;

      // Realistic 3D perspective foreshortening
      // Points swinging towards camera (zRot > 0) expand; points further recede
      float cameraDistance = 2.4;
      float w = 1.0 - (zRot * 0.72) / cameraDistance;
      w = max(w, 0.2);

      gl_Position = vec4(ndcX / w, ndcY / w, zRot * 0.5, 1.0);
    }
  `;

  // Fragment Shader: Progressive Blur, Brightness Shading & Ray Projection
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

        // Soft drop shadow cast by folding top page onto this revealed page
        float motion = sin(u_progress * PI);
        float hingeX = (u_direction > 0.0) ? 0.0 : 1.0;
        float distFromHinge = abs(v_texCoord.x - hingeX);
        float dropShadow = smoothstep(0.45, 0.0, distFromHinge) * motion * 0.38;
        bgCol.rgb = mix(bgCol.rgb, vec3(0.04, 0.01, 0.02), dropShadow);

        gl_FragColor = bgCol;
        return;
      }

      // CASE 2: FOLDING PAGE (With iPhone Duo progressive blur & shading)
      float edge = clamp(v_edgeDist, 0.0, 1.0);

      // Motion curve (peak at midpoint of fold)
      float motion = sin(u_progress * PI);

      // Progressive blur gradient: strongest at moving outer edge, 0 at hinge
      // Direct mathematical reuse from iPhone Duo screenShader:
      // float blurGradient = clamp(edge, 0.0, 1.0);
      // float radius = 72.0 * motion * pow(blurGradient, 1.35);
      float blurGradient = clamp(edge, 0.0, 1.0);
      float darkenGradient = clamp((edge - 0.15) / 0.85, 0.0, 1.0);

      float effect = motion * pow(max(0.0001, darkenGradient), 1.35);
      float radius = 56.0 * motion * pow(max(0.0001, blurGradient), 1.35);

      vec2 sourceUV = v_texCoord;
      vec3 color = vec3(0.0);

      // 5x5 Binomial weighted progressive blur (iPhone Duo exact weights: 1, 4, 6, 4, 1)
      if (radius > 0.08) {
        float totalWeight = 0.0;
        for (int y = 0; y < 5; y++) {
          for (int x = 0; x < 5; x++) {
            float fx = float(x) - 2.0;
            float fy = float(y) - 2.0;
            float wx = (x == 2) ? 6.0 : ((x == 1 || x == 3) ? 4.0 : 1.0);
            float wy = (y == 2) ? 6.0 : ((y == 1 || y == 3) ? 4.0 : 1.0);
            float w = wx * wy;
            vec2 offset = vec2(fx, fy) * u_texPixel * radius * 0.42;
            vec2 sampleUV = clamp(sourceUV + offset, vec2(0.001), vec2(0.999));
            color += texture2D(u_currentTex, sampleUV).rgb * w;
            totalWeight += w;
          }
        }
        color /= totalWeight;
      } else {
        color = texture2D(u_currentTex, sourceUV).rgb;
      }

      // Gradually reduce brightness during folding (iPhone Duo exact shading formula):
      // return color * (1.0 - min(1.0, effect * 2.0));
      color *= (1.0 - min(0.68, effect * 1.85));

      // Specular crest highlight along the bend apex
      float specular = pow(clamp(sin(u_progress * PI), 0.0, 1.0), 12.0) * (1.0 - edge) * 0.28;
      color += vec3(specular * 0.95, specular * 0.90, specular * 0.80);

      // Opacity falloff as the page turns past 90 degrees (facing away from viewer)
      float alpha = 1.0;
      if (u_progress > 0.48) {
        alpha = smoothstep(1.0, 0.48, u_progress);
      }

      gl_FragColor = vec4(color, alpha);
    }
  `;

  // --------------------------------------------------------------------------
  // PROSPECTUS FOLDING TRANSITION CLASS
  // --------------------------------------------------------------------------

  class ProspectusFoldingTransition {
    /**
     * @param {Object} options
     * @param {HTMLCanvasElement} options.canvas
     * @param {number} [options.gridCols=48] - Geometry horizontal subdivisions
     * @param {number} [options.gridRows=24] - Geometry vertical subdivisions
     * @param {number} [options.duration=700] - Default transition duration in ms
     * @param {Function} [options.onComplete] - Callback on transition completion
     */
    constructor(options) {
      if (!options || !options.canvas) {
        throw new Error('[ProspectusFoldingTransition] A valid canvas element is required');
      }

      this.canvas = options.canvas;
      this.gridCols = options.gridCols || 48;
      this.gridRows = options.gridRows || 24;
      this.duration = options.duration || 680;
      this.onComplete = options.onComplete || null;

      this.gl = null;
      this.program = null;
      this.posBuffer = null;
      this.texBuffer = null;
      this.indexBuffer = null;
      this.indexCount = 0;

      this.currentTexture = null;
      this.nextTexture = null;
      this.textureCache = new Map();

      this.progress = 0;
      this.direction = 1; // +1 = Next, -1 = Prev
      this.isAnimating = false;
      this.animationStartTime = 0;
      this.currentTween = null;

      this.initWebGL();
      this.buildGeometry();
    }

    /**
     * Initialize WebGL Context and compile Shaders
     */
    initWebGL() {
      const gl = this.canvas.getContext('webgl', { antialias: true, alpha: true, depth: false }) ||
                 this.canvas.getContext('experimental-webgl', { antialias: true, alpha: true, depth: false }) ||
                 this.canvas.getContext('webgl2', { antialias: true, alpha: true, depth: false });

      if (!gl) {
        console.error('[ProspectusFoldingTransition] WebGL not supported on this device.');
        return false;
      }

      this.gl = gl;

      // Enable standard blending for smooth page dissolve
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

    /**
     * Build subdivided plane geometry for smooth 3D curved bending
     */
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

    /**
     * Upload an image to a WebGL texture handle
     */
    uploadImage(tex, image) {
      if (!this.gl || !tex || !image) return;
      const gl = this.gl;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      this.setupTextureParameters(tex);
    }

    /**
     * Synchronize canvas internal resolution with CSS pixel dimensions
     */
    resize() {
      if (!this.canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(this.canvas.clientWidth * dpr);
      const h = Math.round(this.canvas.clientHeight * dpr);

      if (this.canvas.width !== w || this.canvas.height !== h) {
        this.canvas.width = w;
        this.canvas.height = h;
        if (this.gl) {
          this.gl.viewport(0, 0, w, h);
        }
      }
    }

    /**
     * Render the dual-layer folding frame at the given progress
     * @param {number} progress - Transition progress (0.0 to 1.0)
     * @param {number} direction - Direction (+1 = Next, -1 = Prev)
     */
    renderFrame(progress, direction) {
      const gl = this.gl;
      if (!gl || !this.program) return;

      this.resize();

      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(this.program);

      // Uniform Locations
      const uProgress = gl.getUniformLocation(this.program, 'u_progress');
      const uDirection = gl.getUniformLocation(this.program, 'u_direction');
      const uIsBackground = gl.getUniformLocation(this.program, 'u_isBackground');
      const uPerspective = gl.getUniformLocation(this.program, 'u_perspective');
      const uAspect = gl.getUniformLocation(this.program, 'u_aspect');
      const uTexPixel = gl.getUniformLocation(this.program, 'u_texPixel');
      const uCurrentTex = gl.getUniformLocation(this.program, 'u_currentTex');
      const uNextTex = gl.getUniformLocation(this.program, 'u_nextTex');

      gl.uniform1f(uProgress, progress);
      gl.uniform1f(uDirection, direction);
      gl.uniform1f(uPerspective, 1.85);
      gl.uniform1f(uAspect, this.canvas.width / this.canvas.height);
      gl.uniform2f(uTexPixel, 1.0 / this.canvas.width, 1.0 / this.canvas.height);

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

      // PASS 1: Draw underlying revealed sheet (if in progress)
      if (progress > 0.001) {
        gl.uniform1f(uIsBackground, 1.0);
        gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
      }

      // PASS 2: Draw folding sheet with 3D rotation, progressive blur & shading
      if (progress < 0.999) {
        gl.uniform1f(uIsBackground, 0.0);
        gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
      }
    }

    /**
     * Trigger folding transition between two page images
     * @param {HTMLImageElement} currentImage
     * @param {HTMLImageElement} nextImage
     * @param {number} direction - (+1 for Next, -1 for Previous)
     * @param {number} [duration] - Animation duration in ms
     * @param {Function} [callback] - Invoked on completion
     */
    transition(currentImage, nextImage, direction, duration, callback) {
      if (this.isAnimating) return;
      this.isAnimating = true;

      this.uploadImage(this.currentTexture, currentImage);
      this.uploadImage(this.nextTexture, nextImage);

      this.direction = direction || 1;
      const animDuration = (duration || this.duration) / 1000; // in seconds for GSAP

      const self = this;
      const state = { progress: 0 };

      // Use GSAP if available in page environment
      if (typeof window !== 'undefined' && window.gsap) {
        this.currentTween = window.gsap.to(state, {
          progress: 1.0,
          duration: animDuration,
          ease: "power2.inOut",
          onUpdate: function () {
            self.progress = state.progress;
            self.renderFrame(state.progress, self.direction);
          },
          onComplete: function () {
            self.isAnimating = false;
            self.progress = 0;
            self.uploadImage(self.currentTexture, nextImage);
            self.renderFrame(0, self.direction);
            const baseImg = document.getElementById('prospectusBaseImage');
            if (baseImg && nextImage.src) {
              baseImg.src = nextImage.src;
            }
            if (typeof callback === 'function') callback();
            if (typeof self.onComplete === 'function') self.onComplete();
          }
        });
      } else {
        // Built-in 60FPS Cubic Hermite animation engine
        const startTime = performance.now();
        const durMs = animDuration * 1000;

        function loop(now) {
          const elapsed = now - startTime;
          const t = Math.min(1.0, Math.max(0.0, elapsed / durMs));
          // Cubic Hermite smoothstep ease-in-out: t^2 * (3 - 2t)
          const ease = t * t * (3.0 - 2.0 * t);

          self.progress = ease;
          self.renderFrame(ease, self.direction);

          if (t < 1.0) {
            requestAnimationFrame(loop);
          } else {
            self.isAnimating = false;
            self.progress = 0;
            self.uploadImage(self.currentTexture, nextImage);
            self.renderFrame(0, self.direction);
            const baseImg = document.getElementById('prospectusBaseImage');
            if (baseImg && nextImage.src) {
              baseImg.src = nextImage.src;
            }
            if (typeof callback === 'function') callback();
            if (typeof self.onComplete === 'function') self.onComplete();
          }
        }

        requestAnimationFrame(loop);
      }
    }

    /**
     * Interactively set fold progress during user drag / swipe gestures
     * @param {number} progress - (0.0 to 1.0)
     * @param {number} direction - (+1 or -1)
     */
    setProgress(progress, direction) {
      this.progress = Math.min(1.0, Math.max(0.0, progress));
      this.direction = direction || 1;
      this.renderFrame(this.progress, this.direction);
    }
  }

  return ProspectusFoldingTransition;
});

