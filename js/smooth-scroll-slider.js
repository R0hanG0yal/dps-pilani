/**
 * ============================================================================
 * SMOOTH SCROLL SLIDER — ORIGINKIT (Vanilla ES6 Implementation)
 * ============================================================================
 * A luxury horizontal image rail on black. Wheel, trackpad or drag pushes a
 * target offset; the rendered offset chases it with a lerp, so the rail keeps
 * gliding after the input stops. Every slide is scaled by where its centre sits
 * relative to the viewport centre: cards approaching from the right are
 * oversized and get pushed further right so they clear their neighbour, cards
 * that have passed the centre shrink and dim away.
 *
 * Ported from Originkit (https://github.com/Animmaster/Smooth-scroll-Slider).
 * ============================================================================
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SmoothScrollSlider = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const MAX_SCALE = 2.5;
  const MIN_SCALE = 0.1;

  function wrap(value, span) {
    return ((value % span) + span) % span;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  class SmoothScrollSlider {
    constructor(container, options) {
      this.container = typeof container === 'string' ? document.querySelector(container) : container;
      if (!this.container) {
        throw new Error('[SmoothScrollSlider] Invalid container element');
      }

      this.options = Object.assign({
        items: [],             // Array of { id, image, webp, title, newspaper, date, offsetY }
        slideWidth: 320,
        slideHeight: 420,
        spacing: 2,
        direction: 'right',
        smoothness: 10,
        radius: 16,
        dim: 10,
        background: '#0B0206',
        sensitivity: 5,
        loop: true,
        autoplay: false,
        autoplaySpeed: 0.8,    // Subtle continuous ambient gliding speed
        onSlideClick: null
      }, options || {});

      this.rawItems = this.options.items || [];
      this.slides = [];
      this.nodes = [];
      this.target = 0;
      this.current = 0;
      this.width = 0;
      this.rafId = 0;
      this.lastTime = 0;
      this.isDragging = false;
      this.pointerId = null;
      this.lastPointerX = 0;
      this.startPointerX = 0;
      this.hasDragged = false;
      this.isHovered = false;

      // Bound handlers
      this._tick = this._tick.bind(this);
      this._onWheel = this._onWheel.bind(this);
      this._onPointerDown = this._onPointerDown.bind(this);
      this._onPointerMove = this._onPointerMove.bind(this);
      this._onPointerUp = this._onPointerUp.bind(this);
      this._onResize = this._onResize.bind(this);

      this.init();
    }

    init() {
      const c = this.container;
      c.innerHTML = '';
      c.style.position = 'relative';
      c.style.width = '100%';
      c.style.height = '100%';
      c.style.overflow = 'hidden';
      c.style.background = this.options.background;
      c.style.cursor = 'grab';
      c.style.touchAction = 'pan-y';
      c.style.userSelect = 'none';
      c.style.webkitUserSelect = 'none';
      c.style.opacity = '0';
      c.style.transition = 'opacity 0.35s ease';

      // Inner rail wrapper
      this.rail = document.createElement('div');
      this.rail.className = 'smooth-slider-rail';
      this.rail.style.position = 'absolute';
      this.rail.style.top = '0';
      this.rail.style.left = '0';
      this.rail.style.width = '100%';
      this.rail.style.height = '100%';
      this.rail.style.pointerEvents = 'auto';
      c.appendChild(this.rail);

      // Measure dimensions
      this.resizeObserver = new ResizeObserver(entries => {
        if (entries[0]) {
          this._handleResizeWidth(entries[0].contentRect.width);
        }
      });
      this.resizeObserver.observe(c);
      this._handleResizeWidth(c.getBoundingClientRect().width);

      // Bind input events
      c.addEventListener('wheel', this._onWheel, { passive: false });
      c.addEventListener('pointerdown', this._onPointerDown);
      c.addEventListener('pointermove', this._onPointerMove);
      c.addEventListener('pointerup', this._onPointerUp);
      c.addEventListener('pointercancel', this._onPointerUp);

      c.addEventListener('mouseenter', () => { this.isHovered = true; });
      c.addEventListener('mouseleave', () => { this.isHovered = false; });

      // Start tick loop
      this.rafId = requestAnimationFrame(this._tick);
    }

    _handleResizeWidth(w) {
      if (w <= 0) return;
      this.width = w;

      // Responsive adjustments for mobile screens
      if (w < 480) {
        this.currentSlideWidth = 240;
        this.currentSlideHeight = 320;
      } else if (w < 768) {
        this.currentSlideWidth = 270;
        this.currentSlideHeight = 360;
      } else {
        this.currentSlideWidth = this.options.slideWidth;
        this.currentSlideHeight = this.options.slideHeight;
      }

      this.step = this.currentSlideWidth + clamp(this.options.spacing, 0, 10) * 20;
      this.ease = 0.15 - (clamp(this.options.smoothness, 0, 10) / 10) * 0.13;
      this.dimAmount = (clamp(this.options.dim, 0, 10) / 10) * 0.85;
      this.wheelMultiplier = 0.4 + (clamp(this.options.sensitivity, 0, 10) / 10) * 1.2;
      this.dragMultiplier = 0.6 + (clamp(this.options.sensitivity, 0, 10) / 10) * 1.8;
      this.flip = this.options.direction === 'left';

      this._rebuildSlides();
      this.container.style.opacity = '1';
    }

    _rebuildSlides() {
      if (!this.rawItems || !this.rawItems.length || this.width <= 0) return;

      const source = this.rawItems;
      const step = this.step;
      const count = source.length;

      // Repeat list so it wraps seamlessly around the viewport
      let repeats = 1;
      if (this.options.loop && step > 0) {
        repeats = Math.max(1, Math.ceil((this.width + step * 2) / (count * step)));
        if (repeats * count < 10) {
          repeats = Math.max(repeats, Math.ceil(10 / count));
        }
      }

      const slides = [];
      for (let r = 0; r < repeats; r++) {
        for (let i = 0; i < count; i++) {
          slides.push(source[i]);
        }
      }

      this.slides = slides;
      this.rail.innerHTML = '';
      this.nodes = [];

      const self = this;
      slides.forEach((item, idx) => {
        const slide = document.createElement('div');
        slide.className = 'smooth-slider-slide';
        slide.setAttribute('role', 'button');
        slide.setAttribute('tabindex', '0');
        slide.setAttribute('aria-label', `Newspaper clipping: ${item.title}`);
        slide.style.position = 'absolute';
        slide.style.top = '50%';
        slide.style.left = '0';
        slide.style.width = `${self.currentSlideWidth}px`;
        slide.style.height = `${self.currentSlideHeight}px`;
        slide.style.borderRadius = `${self.options.radius}px`;
        slide.style.overflow = 'hidden';
        slide.style.background = '#120208';
        slide.style.willChange = 'transform, filter';
        slide.style.transform = 'translate3d(0, -50%, 0)';
        slide.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.45)';
        slide.style.border = '1px solid rgba(217, 184, 138, 0.28)';
        slide.style.cursor = 'pointer';

        // Newspaper publication tag badge
        let badgeClass = 'other';
        const np = (item.newspaper || '').toLowerCase();
        if (np.includes('patrika')) badgeClass = 'patrika';
        else if (np.includes('bhaskar')) badgeClass = 'bhaskar';

        slide.innerHTML = `
          <div class="s-slider-slide-card" style="position:relative;width:100%;height:100%;display:flex;flex-direction:column;">
            <div class="s-slider-badge ${badgeClass}" style="position:absolute;top:12px;left:12px;z-index:3;">
              ${escapeHtml(item.newspaper || 'Press Clipping')}
            </div>
            <picture style="width:100%;height:100%;display:block;">
              ${item.thumbWebp ? `<source srcset="${item.thumbWebp}" type="image/webp">` : ''}
              <img src="${item.thumbImage || item.image || item.fullImage}" alt="${escapeHtml(item.title)}" draggable="false" style="width:100%;height:100%;object-fit:cover;object-position:50% 50%;display:block;user-select:none;-webkit-user-drag:none;pointer-events:none;">
            </picture>
            <div class="s-slider-caption-bar" style="position:absolute;bottom:0;left:0;right:0;padding:14px 14px 12px 14px;background:linear-gradient(180deg, rgba(13,2,8,0) 0%, rgba(13,2,8,0.85) 30%, rgba(13,2,8,0.98) 100%);color:#FFF;z-index:3;pointer-events:none;">
              <span class="s-slider-date" style="font-size:0.72rem;font-weight:700;color:#FDE68A;margin-bottom:2px;display:block;">${escapeHtml(item.date || '')}</span>
              <h4 class="s-slider-title" style="font-family:var(--font-display,Georgia,serif);font-size:0.92rem;font-weight:700;line-height:1.25;color:#FFF;margin:0;">${escapeHtml(item.title)}</h4>
            </div>
          </div>
        `;

        // Click / Enter interaction
        slide.addEventListener('click', (e) => {
          if (self.hasDragged) return;
          if (typeof self.options.onSlideClick === 'function') {
            self.options.onSlideClick(item, idx);
          }
        });

        slide.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (typeof self.options.onSlideClick === 'function') {
              self.options.onSlideClick(item, idx);
            }
          }
        });

        self.rail.appendChild(slide);
        self.nodes.push(slide);
      });
    }

    _tick(now) {
      this.rafId = requestAnimationFrame(this._tick);

      const delta = this.lastTime ? Math.min((now - this.lastTime) / 1000, 0.1) : 1 / 60;
      this.lastTime = now;

      const count = this.nodes.length;
      const step = this.step;
      const width = this.width;
      if (!count || step <= 0 || width <= 0) return;

      // Ambient slow drift when idle (autoplay)
      if (this.options.autoplay && !this.isHovered && !this.isDragging) {
        this.target += this.options.autoplaySpeed;
      }

      const span = count * step;

      if (this.options.loop) {
        if (this.current > span || this.current < -span) {
          const shift = Math.trunc(this.current / span) * span;
          this.current -= shift;
          this.target -= shift;
        }
      } else {
        this.target = clamp(this.target, 0, (count - 1) * step);
      }

      // Frame-rate independent lerp
      const k = 1 - Math.pow(1 - this.ease, delta * 60);
      this.current += (this.target - this.current) * k;

      const pad = (width - this.currentSlideWidth) / 2;
      const half = width / 2;

      for (let i = 0; i < count; i++) {
        const node = this.nodes[i];
        if (!node) continue;

        const raw = i * step - this.current + pad;
        const x = this.options.loop ? wrap(raw + step, span) - step : raw;

        const distance = x + this.currentSlideWidth / 2 - half;
        let scale, push;
        if (distance > 0) {
          scale = Math.min(MAX_SCALE, 1 + distance / width);
          push = (scale - 1) * this.currentSlideWidth * 0.75;
        } else {
          scale = Math.max(MIN_SCALE, 1 + distance / width);
          push = 0;
        }

        const left = this.flip ? width - this.currentSlideWidth - (x + push) : x + push;
        node.style.transform = `translate3d(${left}px, -50%, 0) scale(${scale})`;

        if (this.dimAmount > 0 && scale < 1) {
          const t = (1 - scale) / Math.max(0.001, 1 - MIN_SCALE);
          node.style.filter = `brightness(${1 - t * this.dimAmount})`;
        } else {
          node.style.filter = 'none';
        }
      }
    }

    _onWheel(event) {
      event.preventDefault();
      const dominant = Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;
      this.target += dominant * this.wheelMultiplier;
    }

    _onPointerDown(event) {
      if (this.pointerId !== null) return;
      this.pointerId = event.pointerId;
      this.lastPointerX = event.clientX;
      this.startPointerX = event.clientX;
      this.hasDragged = false;
      this.isDragging = true;
      try {
        this.container.setPointerCapture(event.pointerId);
      } catch (e) {}
      this.container.style.cursor = 'grabbing';
    }

    _onPointerMove(event) {
      if (this.pointerId !== event.pointerId) return;
      const dx = event.clientX - this.lastPointerX;
      if (Math.abs(event.clientX - this.startPointerX) > 6) {
        this.hasDragged = true;
      }
      this.lastPointerX = event.clientX;
      this.target += (this.flip ? dx : -dx) * this.dragMultiplier;
    }

    _onPointerUp(event) {
      if (this.pointerId !== event.pointerId) return;
      this.pointerId = null;
      this.isDragging = false;
      this.container.style.cursor = 'grab';
      try {
        if (this.container.hasPointerCapture(event.pointerId)) {
          this.container.releasePointerCapture(event.pointerId);
        }
      } catch (e) {}
      setTimeout(() => {
        this.hasDragged = false;
      }, 40);
    }

    _onResize() {
      if (this.container) {
        this._handleResizeWidth(this.container.getBoundingClientRect().width);
      }
    }

    next() {
      this.target += this.step;
    }

    prev() {
      this.target -= this.step;
    }

    setItems(newItems) {
      this.rawItems = newItems || [];
      this._rebuildSlides();
    }

    destroy() {
      cancelAnimationFrame(this.rafId);
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
      const c = this.container;
      if (c) {
        c.removeEventListener('wheel', this._onWheel);
        c.removeEventListener('pointerdown', this._onPointerDown);
        c.removeEventListener('pointermove', this._onPointerMove);
        c.removeEventListener('pointerup', this._onPointerUp);
        c.removeEventListener('pointercancel', this._onPointerUp);
      }
    }
  }

  return SmoothScrollSlider;
});

