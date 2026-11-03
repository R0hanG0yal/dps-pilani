/**
 * Cursor Image Gallery Slider (Originkit Architecture)
 * Durga Public School, Pilani, Rajasthan
 *
 * Implements the interactive CursorNav image slider:
 * - Fluid pointer-following directional cursor with animated SVG arrows
 * - Seamless hardware-accelerated translateX slide transitions (easeInOut, 600ms)
 * - Intelligent hover detection (left half slides prev, right half slides next)
 * - Liquid glass caption pill (Title, Subtitle, Counter capsule, Lightbox expand)
 * - Interactive pagination dots with active pill expansion
 * - Full responsive touch swipe gestures for mobile & tablet
 * - Dynamic .setItems() API for real-time sub-category filtering
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CursorGallerySlider = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  const DEFAULTS = {
    durationMs: 600,
    ease: 'cubic-bezier(0.42, 0, 0.58, 1)',
    imageFit: 'cover', // 'cover' or 'contain'
    cursorSize: 58,
    cursorBg: true,
    cursorBackground: 'rgba(255, 255, 255, 0.94)',
    cursorColor: '#2E0815', // Royal Wine
    borderRadius: 16,
    dots: true,
    dotSize: 8,
    dotActive: '#B45309', // Royal Amber
    dotInactive: 'rgba(255, 255, 255, 0.45)',
    loop: true,
    autoplay: 0,
    showCaption: true,
    ariaLabel: 'Image Gallery Slider'
  };

  function clamp(v, a, b) {
    return Math.min(b, Math.max(a, v));
  }

  function wrap(i, n) {
    return n ? ((i % n) + n) % n : 0;
  }

  function CursorGallerySlider(container, options) {
    if (!container) throw new Error('CursorGallerySlider requires a container element.');

    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) throw new Error('Target container not found.');

    this.opts = Object.assign({}, DEFAULTS, options || {});
    this.slides = (this.opts.slides || []).map(function (s, i) {
      if (typeof s === 'string') {
        return { image: s, title: '', caption: '', note: '', id: 'slide-' + i };
      }
      return Object.assign({
        image: s.image || s.src || s.fullImage || '',
        title: s.title || '',
        caption: s.caption || s.sub || s.desc || '',
        note: s.note || s.tag || s.newspaper || '',
        id: s.id || ('slide-' + i),
        raw: s
      }, s);
    });

    this.count = this.slides.length;
    this.index = 0;
    this.isSliding = false;
    this.cursorSide = 'none';
    this.pointerPos = { x: 0, y: 0 };
    this.pointerIn = false;
    this.autoplayTimer = null;

    this.init();
  }

  CursorGallerySlider.prototype.init = function () {
    this.buildDOM();
    this.bindEvents();
    this.renderSlide(this.index);
    if (this.opts.autoplay > 0) this.startAutoplay();
  };

  CursorGallerySlider.prototype.buildDOM = function () {
    this.container.innerHTML = '';
    this.container.classList.add('cgs-host');

    // Root element
    this.root = document.createElement('div');
    this.root.className = 'cgs-root';
    this.root.setAttribute('tabindex', '0');
    this.root.setAttribute('role', 'region');
    this.root.setAttribute('aria-label', this.opts.ariaLabel);
    if (this.opts.borderRadius) {
      this.root.style.borderRadius = this.opts.borderRadius + 'px';
    }

    // Viewport
    this.viewport = document.createElement('div');
    this.viewport.className = 'cgs-viewport';
    if (this.opts.borderRadius) {
      this.viewport.style.borderRadius = this.opts.borderRadius + 'px';
    }
    this.root.appendChild(this.viewport);

    // Active Layer Container
    this.activeLayer = document.createElement('div');
    this.activeLayer.className = 'cgs-layer cgs-layer-active';
    this.viewport.appendChild(this.activeLayer);

    // Floating Custom Cursor
    this.cursorEl = document.createElement('div');
    this.cursorEl.className = 'cgs-cursor';
    this.cursorEl.setAttribute('aria-hidden', 'true');
    this.cursorEl.style.width = this.opts.cursorSize + 'px';
    this.cursorEl.style.height = this.opts.cursorSize + 'px';
    if (this.opts.cursorBg) {
      this.cursorEl.style.background = this.opts.cursorBackground;
    }

    // SVG chevrons
    const arrowSize = Math.round(this.opts.cursorSize * 0.42);
    this.cursorEl.innerHTML =
      '<svg class="cgs-arrow cgs-arrow-left" width="' + arrowSize + '" height="' + arrowSize + '" viewBox="0 0 24 24" fill="none" stroke="' + this.opts.cursorColor + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<polyline points="15 6 9 12 15 18"></polyline>' +
      '</svg>' +
      '<svg class="cgs-arrow cgs-arrow-right" width="' + arrowSize + '" height="' + arrowSize + '" viewBox="0 0 24 24" fill="none" stroke="' + this.opts.cursorColor + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<polyline points="9 6 15 12 9 18"></polyline>' +
      '</svg>';

    this.root.appendChild(this.cursorEl);

    // Floating Liquid Glass Caption Dock
    if (this.opts.showCaption) {
      this.dock = document.createElement('div');
      this.dock.className = 'cgs-dock';

      // Left info pill
      this.infoPill = document.createElement('div');
      this.infoPill.className = 'cgs-info-pill';
      this.infoPill.innerHTML =
        '<div class="cgs-info-header">' +
          '<span class="cgs-note-badge"></span>' +
          '<h4 class="cgs-title"></h4>' +
        '</div>' +
        '<p class="cgs-caption"></p>';

      // Right counter pill & action pod
      this.navPod = document.createElement('div');
      this.navPod.className = 'cgs-nav-pod';
      this.navPod.innerHTML =
        '<span class="cgs-count-capsule"><strong class="cgs-idx">01</strong> / <span class="cgs-total">01</span></span>' +
        '<button type="button" class="cgs-zoom-btn" aria-label="Enlarge image" title="Click to enlarge">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>' +
        '</button>';

      this.dock.appendChild(this.infoPill);
      this.dock.appendChild(this.navPod);
      this.root.appendChild(this.dock);
    }

    // Pagination Dots
    if (this.opts.dots && this.count > 1) {
      this.dotsWrap = document.createElement('div');
      this.dotsWrap.className = 'cgs-dots';
      this.renderDots();
      this.root.appendChild(this.dotsWrap);
    }

    // Mobile / Accessible Touch Controls
    this.touchPrev = document.createElement('button');
    this.touchPrev.type = 'button';
    this.touchPrev.className = 'cgs-touch-btn cgs-touch-prev';
    this.touchPrev.setAttribute('aria-label', 'Previous slide');
    this.touchPrev.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>';

    this.touchNext = document.createElement('button');
    this.touchNext.type = 'button';
    this.touchNext.className = 'cgs-touch-btn cgs-touch-next';
    this.touchNext.setAttribute('aria-label', 'Next slide');
    this.touchNext.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>';

    this.root.appendChild(this.touchPrev);
    this.root.appendChild(this.touchNext);

    this.container.appendChild(this.root);
  };

  CursorGallerySlider.prototype.renderDots = function () {
    if (!this.dotsWrap) return;
    this.dotsWrap.innerHTML = '';
    // If large count (> 30), show clean capsule indicator instead of 90 dots to prevent crowding
    if (this.count > 25) {
      this.dotsWrap.style.display = 'none';
      return;
    }
    this.dotsWrap.style.display = 'flex';
    const self = this;
    for (let i = 0; i < this.count; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'cgs-dot' + (i === this.index ? ' active' : '');
      dot.setAttribute('data-idx', String(i));
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', function (e) {
        e.stopPropagation();
        const target = parseInt(dot.getAttribute('data-idx'), 10);
        self.goTo(target);
      });
      this.dotsWrap.appendChild(dot);
    }
  };

  CursorGallerySlider.prototype.updateDots = function () {
    if (!this.dotsWrap) return;
    const dots = this.dotsWrap.querySelectorAll('.cgs-dot');
    for (let i = 0; i < dots.length; i++) {
      if (i === this.index) {
        dots[i].classList.add('active');
        dots[i].setAttribute('aria-current', 'true');
      } else {
        dots[i].classList.remove('active');
        dots[i].removeAttribute('aria-current');
      }
    }
  };

  CursorGallerySlider.prototype.createSlideElement = function (item) {
    const el = document.createElement('div');
    el.className = 'cgs-slide-content' + (this.opts.imageFit === 'contain' ? ' cgs-fit-contain' : ' cgs-fit-cover');

    if (item && item.image) {
      const img = document.createElement('img');
      img.className = 'cgs-slide-img';
      img.src = item.image;
      img.alt = item.title || 'Gallery image';
      img.loading = 'lazy';
      img.decoding = 'async';
      el.appendChild(img);
    } else {
      el.classList.add('cgs-slide-empty');
      el.innerHTML = '<span class="cgs-empty-msg">No Image Available</span>';
    }

    return el;
  };

  CursorGallerySlider.prototype.renderSlide = function (idx) {
    if (this.count === 0) {
      this.activeLayer.innerHTML = '<div class="cgs-empty">No slides available</div>';
      return;
    }
    const item = this.slides[idx];
    this.activeLayer.innerHTML = '';
    this.activeLayer.appendChild(this.createSlideElement(item));
    this.updateCaption();
    this.updateDots();
  };

  CursorGallerySlider.prototype.updateCaption = function () {
    if (!this.opts.showCaption || !this.dock) return;
    const item = this.slides[this.index];
    if (!item) return;

    const titleEl = this.dock.querySelector('.cgs-title');
    const noteEl = this.dock.querySelector('.cgs-note-badge');
    const captionEl = this.dock.querySelector('.cgs-caption');
    const idxEl = this.dock.querySelector('.cgs-idx');
    const totalEl = this.dock.querySelector('.cgs-total');

    if (titleEl) titleEl.textContent = item.title || 'Heritage Photograph';
    if (noteEl) {
      if (item.note) {
        noteEl.textContent = item.note;
        noteEl.style.display = 'inline-block';
      } else {
        noteEl.style.display = 'none';
      }
    }
    if (captionEl) {
      captionEl.innerHTML = item.caption || (item.date ? item.date : '');
      captionEl.style.display = (item.caption || item.date) ? 'block' : 'none';
    }
    if (idxEl) idxEl.textContent = (this.index + 1 < 10 ? '0' : '') + (this.index + 1);
    if (totalEl) totalEl.textContent = (this.count < 10 ? '0' : '') + this.count;
  };

  CursorGallerySlider.prototype.sideFor = function (relX, width) {
    if (width <= 0) return 'none';
    const wantPrev = relX < width / 2;
    if (wantPrev) {
      return (this.opts.loop || this.index > 0) ? 'left' : 'none';
    }
    return (this.opts.loop || this.index < this.count - 1) ? 'right' : 'none';
  };

  CursorGallerySlider.prototype.startSlide = function (dir, targetIndex) {
    if (this.isSliding || this.count <= 1) return;

    const fromIdx = this.index;
    let toIdx;
    if (typeof targetIndex === 'number') {
      toIdx = clamp(targetIndex, 0, this.count - 1);
      if (toIdx === fromIdx) return;
      dir = toIdx > fromIdx ? 1 : -1;
    } else {
      toIdx = this.opts.loop ? wrap(fromIdx + dir, this.count) : clamp(fromIdx + dir, 0, this.count - 1);
      if (toIdx === fromIdx) return;
    }

    this.isSliding = true;

    // Build incoming layer
    const incomingLayer = document.createElement('div');
    incomingLayer.className = 'cgs-layer cgs-layer-incoming';
    incomingLayer.appendChild(this.createSlideElement(this.slides[toIdx]));

    // Start position
    const startTranslate = dir === 1 ? '100%' : '-100%';
    const endTranslate = dir === 1 ? '-100%' : '100%';

    incomingLayer.style.transform = 'translateX(' + startTranslate + ')';
    incomingLayer.style.transition = 'none';
    this.viewport.appendChild(incomingLayer);

    const self = this;
    const duration = this.opts.durationMs;
    const ease = this.opts.ease;

    // Force layout reflow
    incomingLayer.getBoundingClientRect();

    // Trigger sliding animation
    this.activeLayer.style.transition = 'transform ' + duration + 'ms ' + ease;
    incomingLayer.style.transition = 'transform ' + duration + 'ms ' + ease;

    this.activeLayer.style.transform = 'translateX(' + endTranslate + ')';
    incomingLayer.style.transform = 'translateX(0%)';

    this.index = toIdx;
    this.updateCaption();
    this.updateDots();

    if (typeof this.opts.onChange === 'function') {
      this.opts.onChange(toIdx, this.slides[toIdx]);
    }

    let finished = false;
    function finalize() {
      if (finished) return;
      finished = true;

      // Clean up previous active layer
      if (self.activeLayer && self.activeLayer.parentNode) {
        self.activeLayer.parentNode.removeChild(self.activeLayer);
      }

      // Promote incoming layer to active layer
      incomingLayer.className = 'cgs-layer cgs-layer-active';
      incomingLayer.style.transition = 'none';
      incomingLayer.style.transform = 'translateX(0%)';
      self.activeLayer = incomingLayer;

      self.isSliding = false;

      // Re-evaluate cursor side under pointer
      if (self.pointerIn) {
        const rect = self.root.getBoundingClientRect();
        self.cursorSide = self.sideFor(self.pointerPos.x, rect.width);
        self.updateCursor();
      }
    }

    incomingLayer.addEventListener('transitionend', function te(e) {
      if (e.target !== incomingLayer || e.propertyName !== 'transform') return;
      incomingLayer.removeEventListener('transitionend', te);
      finalize();
    });

    // Fallback safety timer
    setTimeout(finalize, duration + 60);
  };

  CursorGallerySlider.prototype.next = function () {
    this.startSlide(1);
  };

  CursorGallerySlider.prototype.prev = function () {
    this.startSlide(-1);
  };

  CursorGallerySlider.prototype.goTo = function (targetIndex) {
    if (targetIndex === this.index) return;
    const dir = targetIndex > this.index ? 1 : -1;
    this.startSlide(dir, targetIndex);
  };

  CursorGallerySlider.prototype.updateCursor = function () {
    if (!this.cursorEl) return;
    if (this.cursorSide === 'none' || !this.pointerIn) {
      this.cursorEl.classList.remove('visible', 'side-left', 'side-right');
      this.root.style.cursor = 'default';
      return;
    }

    this.cursorEl.style.transform = 'translate(' + this.pointerPos.x.toFixed(1) + 'px,' + this.pointerPos.y.toFixed(1) + 'px) translate(-50%, -50%)';
    this.cursorEl.classList.add('visible');
    this.root.style.cursor = 'none';

    if (this.cursorSide === 'left') {
      this.cursorEl.classList.add('side-left');
      this.cursorEl.classList.remove('side-right');
    } else {
      this.cursorEl.classList.add('side-right');
      this.cursorEl.classList.remove('side-left');
    }
  };

  CursorGallerySlider.prototype.bindEvents = function () {
    const self = this;

    // Pointer move for custom cursor tracking
    this.root.addEventListener('pointermove', function (e) {
      const rect = self.root.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      self.pointerPos = { x: relX, y: relY };
      self.pointerIn = true;
      self.cursorSide = self.sideFor(relX, rect.width);
      self.updateCursor();
    });

    this.root.addEventListener('pointerenter', function (e) {
      const rect = self.root.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      self.pointerPos = { x: relX, y: relY };
      self.pointerIn = true;
      self.cursorSide = self.sideFor(relX, rect.width);
      self.updateCursor();
      self.stopAutoplay();
    });

    this.root.addEventListener('pointerleave', function () {
      self.pointerIn = false;
      self.cursorSide = 'none';
      self.updateCursor();
      if (self.opts.autoplay > 0) self.startAutoplay();
    });

    // Click on slider: navigate according to side
    this.root.addEventListener('click', function (e) {
      // Ignore clicks on controls or caption links
      if (e.target.closest('.cgs-dock, .cgs-dots, .cgs-touch-btn, .cgs-zoom-btn')) {
        return;
      }
      const rect = self.root.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const side = self.sideFor(relX, rect.width);
      if (side === 'left') {
        self.prev();
      } else if (side === 'right') {
        self.next();
      }
    });

    // Zoom Button / Lightbox trigger
    if (this.dock) {
      const zoomBtn = this.dock.querySelector('.cgs-zoom-btn');
      if (zoomBtn) {
        zoomBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          if (typeof self.opts.onSlideClick === 'function') {
            self.opts.onSlideClick(self.slides[self.index], self.index);
          }
        });
      }
    }

    // Touch Prev / Next Buttons
    this.touchPrev.addEventListener('click', function (e) {
      e.stopPropagation();
      self.prev();
    });

    this.touchNext.addEventListener('click', function (e) {
      e.stopPropagation();
      self.next();
    });

    // Touch Swipe Gestures
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    this.root.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
      self.stopAutoplay();
    }, { passive: true });

    this.root.addEventListener('touchend', function (e) {
      if (e.changedTouches.length !== 1) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      const dt = Date.now() - touchStartTime;

      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.4 && dt < 600) {
        if (dx < 0) {
          self.next();
        } else {
          self.prev();
        }
      }
      if (self.opts.autoplay > 0) self.startAutoplay();
    }, { passive: true });

    // Keyboard navigation
    this.root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        self.prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        self.next();
      }
    });
  };

  CursorGallerySlider.prototype.startAutoplay = function () {
    if (this.autoplayTimer || !this.opts.autoplay) return;
    const self = this;
    this.autoplayTimer = setInterval(function () {
      if (!self.pointerIn && !document.hidden) {
        self.next();
      }
    }, this.opts.autoplay);
  };

  CursorGallerySlider.prototype.stopAutoplay = function () {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  };

  CursorGallerySlider.prototype.setItems = function (newSlides) {
    this.stopAutoplay();
    this.slides = (newSlides || []).map(function (s, i) {
      if (typeof s === 'string') {
        return { image: s, title: '', caption: '', note: '', id: 'slide-' + i };
      }
      return Object.assign({
        image: s.image || s.src || s.fullImage || '',
        title: s.title || '',
        caption: s.caption || s.sub || s.desc || '',
        note: s.note || s.tag || s.newspaper || '',
        id: s.id || ('slide-' + i),
        raw: s
      }, s);
    });
    this.count = this.slides.length;
    this.index = 0;
    this.isSliding = false;
    this.renderDots();
    this.renderSlide(0);
    if (this.opts.autoplay > 0) this.startAutoplay();
  };

  CursorGallerySlider.prototype.destroy = function () {
    this.stopAutoplay();
    if (this.container) {
      this.container.innerHTML = '';
      this.container.classList.remove('cgs-host');
    }
  };

  return CursorGallerySlider;
});

