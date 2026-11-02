/**
 * Spotlight Frames — Originkit Architecture
 * Vanilla JavaScript Component for Responsive Slats Accordion
 * Durga Public School, Pilani, Rajasthan
 *
 * Implements smooth spring/cubic-bezier horizontal accordion with center-slice
 * image cropping, active hairline selector box with guide lines, continuous
 * video-like autoplay loop, touch scrubbing, and off-screen pause.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SpotlightFrames = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
  }

  function resolveSrc(item) {
    if (!item) return null;
    if (typeof item === 'string') return item;
    if (typeof item.image === 'string') return item.image;
    if (item.image && typeof item.image.src === 'string') return item.image.src;
    if (typeof item.src === 'string') return item.src;
    return null;
  }

  const DEFAULT_OPTIONS = {
    collapsedWidth: 72,
    expandedWidth: 420,
    gap: 6,
    radius: 18,
    startIndex: 0,
    trigger: 'auto', // 'auto', 'hover', 'click'
    autoplay: true,
    autoplayInterval: 2800, // Runs continuously like a video
    selector: {
      box: true,
      lines: true,
      lineLength: 400,
      thickness: 2.5,
      color: '#D9B88A'
    },
    showControls: true,
    showArrows: true,
    onSelect: null,
    onSlideClick: null
  };

  function SpotlightFrames(container, options) {
    if (!container) return;
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) return;

    this.opts = Object.assign({}, DEFAULT_OPTIONS, options || {});
    if (options && options.selector) {
      this.opts.selector = Object.assign({}, DEFAULT_OPTIONS.selector, options.selector);
    }

    this.items = (this.opts.images || []).map(function (it) {
      return {
        src: resolveSrc(it),
        offsetY: it.offsetY || 0,
        title: it.title || '',
        tag: it.tag || '',
        sub: it.sub || '',
        raw: it
      };
    }).filter(function (it) { return it.src !== null; });

    if (this.items.length === 0) return;

    this.focused = clamp(Math.round(this.opts.startIndex), 0, this.items.length - 1);
    this.isPlaying = !!this.opts.autoplay;
    this.timer = null;
    this.resumeTimer = null;
    this.slatElements = [];
    this.imgElements = [];
    this.dotElements = [];
    this.isDragging = false;
    this.isVisible = true;

    this.init();
  }

  SpotlightFrames.prototype.init = function () {
    this.buildDOM();
    this.bindEvents();
    this.setupIntersectionObserver();
    this.layout();

    // Start video-like continuous loop
    if (this.isPlaying) {
      this.startAutoplay();
    }
  };

  SpotlightFrames.prototype.buildDOM = function () {
    this.container.innerHTML = '';
    this.container.classList.add('spotlight-frames-wrap');

    // Stage
    this.stage = document.createElement('div');
    this.stage.className = 'spotlight-frames-stage';
    this.container.appendChild(this.stage);

    // Slats
    this.slatElements = [];
    this.imgElements = [];

    const self = this;
    this.items.forEach(function (item, index) {
      const slat = document.createElement('div');
      slat.className = 'spotlight-slat' + (index === self.focused ? ' is-active' : '');
      slat.setAttribute('role', 'button');
      slat.setAttribute('tabindex', '0');
      slat.setAttribute('aria-label', (item.title || ('Image ' + (index + 1))) + ' (' + (index + 1) + ' of ' + self.items.length + ')');
      slat.setAttribute('data-index', String(index));
      slat.style.borderRadius = self.opts.radius + 'px';

      // Inner container
      const inner = document.createElement('div');
      inner.className = 'spotlight-slat-inner';

      // Image (centered at expanded width)
      const img = document.createElement('img');
      img.className = 'spotlight-slat-img';
      img.src = item.src;
      img.alt = item.title || 'Durga Public School';
      img.decoding = 'async';
      img.loading = index < 3 ? 'eager' : 'lazy';
      img.draggable = false;
      inner.appendChild(img);

      // Closed index badge
      const idxBadge = document.createElement('span');
      idxBadge.className = 'spotlight-slat-index';
      idxBadge.textContent = String(index + 1).padStart(2, '0');
      inner.appendChild(idxBadge);

      // Scrim & text overlay for active slat
      if (item.title || item.tag) {
        const scrim = document.createElement('div');
        scrim.className = 'spotlight-slat-scrim';
        if (item.tag) {
          const tag = document.createElement('span');
          tag.className = 'spotlight-slat-tag';
          tag.textContent = item.tag;
          scrim.appendChild(tag);
        }
        if (item.title) {
          const title = document.createElement('h4');
          title.className = 'spotlight-slat-title';
          title.textContent = item.title;
          scrim.appendChild(title);
        }
        if (item.sub) {
          const sub = document.createElement('span');
          sub.className = 'spotlight-slat-sub';
          sub.textContent = item.sub;
          scrim.appendChild(sub);
        }
        inner.appendChild(scrim);
      }

      slat.appendChild(inner);
      self.stage.appendChild(slat);

      self.slatElements.push(slat);
      self.imgElements.push(img);
    });

    // Active Selector Box + Lines
    if (this.opts.selector && (this.opts.selector.box || this.opts.selector.lines)) {
      this.selectorEl = document.createElement('div');
      this.selectorEl.className = 'spotlight-selector';
      this.selectorEl.style.borderColor = this.opts.selector.color || '#D9B88A';
      this.selectorEl.style.borderWidth = (this.opts.selector.thickness || 2.5) + 'px';
      this.selectorEl.style.borderRadius = this.opts.radius + 'px';

      if (this.opts.selector.lines) {
        const lineTop = document.createElement('div');
        lineTop.className = 'spotlight-selector-line top';
        lineTop.style.background = this.opts.selector.color || '#D9B88A';
        lineTop.style.width = (this.opts.selector.thickness || 2.5) + 'px';
        lineTop.style.height = (this.opts.selector.lineLength || 400) + 'px';

        const lineBottom = document.createElement('div');
        lineBottom.className = 'spotlight-selector-line bottom';
        lineBottom.style.background = this.opts.selector.color || '#D9B88A';
        lineBottom.style.width = (this.opts.selector.thickness || 2.5) + 'px';
        lineBottom.style.height = (this.opts.selector.lineLength || 400) + 'px';

        this.selectorEl.appendChild(lineTop);
        this.selectorEl.appendChild(lineBottom);
      }

      this.stage.appendChild(this.selectorEl);
    }

    // Video Autoplay / Control Bar
    if (this.opts.showControls) {
      this.controlsBar = document.createElement('div');
      this.controlsBar.className = 'spotlight-controls-bar';

      // Play/Pause button
      this.videoBtn = document.createElement('button');
      this.videoBtn.type = 'button';
      this.videoBtn.className = 'spotlight-video-btn';
      this.videoBtn.setAttribute('aria-label', this.isPlaying ? 'Pause Continuous Video Reel' : 'Play Continuous Video Reel');
      this.updatePlayBtnIcon();
      this.controlsBar.appendChild(this.videoBtn);

      // Dots
      const dotsWrap = document.createElement('div');
      dotsWrap.className = 'spotlight-dots';
      this.dotElements = [];
      this.items.forEach(function (_, i) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'spotlight-dot' + (i === self.focused ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to frame ' + (i + 1));
        dot.addEventListener('click', function (e) {
          e.stopPropagation();
          self.setFocus(i);
        });
        dotsWrap.appendChild(dot);
        self.dotElements.push(dot);
      });
      this.controlsBar.appendChild(dotsWrap);

      this.container.appendChild(this.controlsBar);
    }

    // Prev/Next arrows
    if (this.opts.showArrows) {
      this.prevBtn = document.createElement('button');
      this.prevBtn.type = 'button';
      this.prevBtn.className = 'spotlight-arrow-btn prev';
      this.prevBtn.setAttribute('aria-label', 'Previous Slat Frame');
      this.prevBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>';
      this.container.appendChild(this.prevBtn);

      this.nextBtn = document.createElement('button');
      this.nextBtn.type = 'button';
      this.nextBtn.className = 'spotlight-arrow-btn next';
      this.nextBtn.setAttribute('aria-label', 'Next Slat Frame');
      this.nextBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>';
      this.container.appendChild(this.nextBtn);
    }
  };

  SpotlightFrames.prototype.updatePlayBtnIcon = function () {
    if (!this.videoBtn) return;
    if (this.isPlaying) {
      this.videoBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
    } else {
      this.videoBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
    }
  };

  SpotlightFrames.prototype.layout = function () {
    const availableWidth = this.container.clientWidth;
    if (availableWidth <= 0) return;

    const count = this.items.length;
    const baseColW = this.opts.collapsedWidth;
    const baseExpW = this.opts.expandedWidth;
    const baseGap = this.opts.gap;

    const naturalWidth = (count - 1) * (baseColW + baseGap) + baseExpW;
    const scale = availableWidth < naturalWidth ? availableWidth / naturalWidth : 1;

    const colW = Math.max(18, baseColW * scale);
    const expW = Math.max(colW + 40, baseExpW * scale);
    const gap = Math.max(2, baseGap * scale);
    const totalW = (count - 1) * (colW + gap) + expW;

    let left = Math.max(0, (availableWidth - totalW) / 2);

    this.slots = [];
    for (let i = 0; i < count; i++) {
      const width = i === this.focused ? expW : colW;
      this.slots.push({ left: left, width: width });
      left += width + gap;
    }

    const self = this;
    this.slatElements.forEach(function (slat, i) {
      const slot = self.slots[i];
      slat.style.left = slot.left + 'px';
      slat.style.width = slot.width + 'px';
      if (i === self.focused) {
        slat.classList.add('is-active');
      } else {
        slat.classList.remove('is-active');
      }
    });

    // Each picture is drawn at the open width and centered
    this.imgElements.forEach(function (img, i) {
      img.style.width = expW + 'px';
      const offset = (self.items[i].offsetY || 0) * scale;
      img.style.objectPosition = '50% calc(50% + ' + offset + 'px)';
    });

    // Update active selector
    if (this.selectorEl && this.slots[this.focused]) {
      const marker = this.slots[this.focused];
      this.selectorEl.style.left = marker.left + 'px';
      this.selectorEl.style.width = marker.width + 'px';
    }

    // Update dots
    this.dotElements.forEach(function (dot, i) {
      if (i === self.focused) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  SpotlightFrames.prototype.setFocus = function (index) {
    const next = clamp(index, 0, this.items.length - 1);
    if (next === this.focused) return;
    this.focused = next;
    this.layout();

    if (typeof this.opts.onSelect === 'function') {
      this.opts.onSelect(this.items[next], next);
    }
  };

  SpotlightFrames.prototype.startAutoplay = function () {
    this.stopAutoplay();
    this.isPlaying = true;
    this.updatePlayBtnIcon();

    const self = this;
    this.timer = setInterval(function () {
      if (!self.isVisible) return;
      const next = (self.focused + 1) % self.items.length;
      self.setFocus(next);
    }, this.opts.autoplayInterval);
  };

  SpotlightFrames.prototype.stopAutoplay = function () {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.isPlaying = false;
    this.updatePlayBtnIcon();
  };

  SpotlightFrames.prototype.tempPause = function () {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.resumeTimer) {
      clearTimeout(this.resumeTimer);
    }
    if (this.opts.autoplay) {
      const self = this;
      this.resumeTimer = setTimeout(function () {
        self.startAutoplay();
      }, 3500);
    }
  };

  SpotlightFrames.prototype.bindEvents = function () {
    const self = this;

    // Resize observer
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(function () {
        self.layout();
      });
      this.resizeObserver.observe(this.container);
    } else {
      window.addEventListener('resize', function () {
        self.layout();
      });
    }

    // Hover or fine pointer detection
    const canHover = window.matchMedia ? window.matchMedia('(hover: hover) and (pointer: fine)').matches : true;
    const opensOnHover = this.opts.trigger === 'hover' || (this.opts.trigger === 'auto' && canHover);

    // Slat interactions
    this.slatElements.forEach(function (slat, index) {
      if (opensOnHover) {
        slat.addEventListener('pointerenter', function () {
          self.tempPause();
          self.setFocus(index);
        });
      }

      slat.addEventListener('click', function () {
        self.tempPause();
        if (self.focused === index && typeof self.opts.onSlideClick === 'function') {
          self.opts.onSlideClick(self.items[index], index);
        } else {
          self.setFocus(index);
        }
      });
    });

    // Touch Scrubbing & Drag
    let startX = 0;
    let startY = 0;
    let isTouchActive = false;

    this.container.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isTouchActive = true;
        self.tempPause();
      }
    }, { passive: true });

    this.container.addEventListener('touchmove', function (e) {
      if (!isTouchActive || e.touches.length !== 1) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = currentX - startX;
      const diffY = currentY - startY;

      // If horizontal movement dominates, scrub across slats
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 12) {
        const rect = self.stage.getBoundingClientRect();
        const touchRelX = currentX - rect.left;

        if (self.slots && self.slots.length > 0) {
          for (let i = 0; i < self.slots.length; i++) {
            const slot = self.slots[i];
            if (touchRelX >= slot.left && touchRelX <= slot.left + slot.width) {
              self.setFocus(i);
              break;
            }
          }
        }
      }
    }, { passive: true });

    this.container.addEventListener('touchend', function () {
      isTouchActive = false;
    }, { passive: true });

    // Video play/pause button
    if (this.videoBtn) {
      this.videoBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (self.isPlaying) {
          self.stopAutoplay();
          self.opts.autoplay = false;
        } else {
          self.opts.autoplay = true;
          self.startAutoplay();
        }
      });
    }

    // Prev / Next Arrows
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        self.tempPause();
        const prev = (self.focused - 1 + self.items.length) % self.items.length;
        self.setFocus(prev);
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        self.tempPause();
        const next = (self.focused + 1) % self.items.length;
        self.setFocus(next);
      });
    }
  };

  SpotlightFrames.prototype.setupIntersectionObserver = function () {
    if (typeof IntersectionObserver === 'undefined') return;
    const self = this;
    this.observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        self.isVisible = entry.isIntersecting;
        if (!entry.isIntersecting) {
          if (self.timer) {
            clearInterval(self.timer);
            self.timer = null;
          }
        } else if (self.opts.autoplay && !self.timer) {
          self.startAutoplay();
        }
      });
    }, { threshold: 0.15 });

    this.observer.observe(this.container);
  };

  SpotlightFrames.prototype.destroy = function () {
    this.stopAutoplay();
    if (this.resumeTimer) clearTimeout(this.resumeTimer);
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.observer) this.observer.disconnect();
    this.container.innerHTML = '';
  };

  return SpotlightFrames;
}));

