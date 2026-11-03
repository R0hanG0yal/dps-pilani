/**
 * Spotlight Frames — Originkit Architecture
 * Vanilla JavaScript Component for Responsive Dynamic-Slat Accordion & Auto-Panning Strip
 * Durga Public School, Pilani, Rajasthan
 *
 * Implements:
 * - Proportional expansion based on original image aspect ratio (100% uncropped document presentation)
 * - Auto-panning horizontal track to comfortably accommodate any number of slats without squishing
 * - Smooth cubic-bezier spring physics (cubic-bezier(0.075, 0.82, 0.165, 1))
 * - Active hairline selector box with synchronized top/bottom guide lines
 * - Continuous video-like autoplay loop with smart pause on interaction / off-screen
 * - Touch & pointer drag scrubbing, trackpad horizontal scrolling, and arrow navigation
 * - Responsive controls bar with sleek counter + progress scrubber for large item sets
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
    collapsedWidth: 70,
    expandedWidth: 520,
    gap: 8,
    radius: 18,
    startIndex: 0,
    trigger: 'auto', // 'auto', 'hover', 'click'
    autoplay: true,
    autoplayInterval: 3200, // Continuous video-like cycle
    fitMode: 'contain', // 'contain' (keeps 100% of document visible) or 'cover'
    expandByAspectRatio: true, // Scales expanded card to match original image dimensions
    selector: {
      box: true,
      lines: true,
      lineLength: 450,
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
      const src = resolveSrc(it);
      let ar = it.aspectRatio || 0;
      if (!ar && it.width && it.height) {
        ar = Math.round((it.width / it.height) * 1000) / 1000;
      }
      return {
        src: src,
        offsetY: it.offsetY || 0,
        title: it.title || '',
        tag: it.tag || '',
        sub: it.sub || '',
        id: it.id || '',
        width: it.width || 0,
        height: it.height || 0,
        aspectRatio: ar,
        raw: it
      };
    }).filter(function (it) { return it.src !== null; });

    if (this.items.length === 0) return;

    this.focused = clamp(Math.round(this.opts.startIndex || 0), 0, this.items.length - 1);
    this.isPlaying = !!this.opts.autoplay;
    this.timer = null;
    this.resumeTimer = null;
    this.slatElements = [];
    this.imgElements = [];
    this.dotElements = [];
    this.slots = [];
    this.trackOffset = 0;
    this.totalTrackWidth = 0;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartOffset = 0;
    this.dragHasMoved = false;
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
    if (this.opts.fitMode === 'contain') {
      this.container.classList.add('spotlight-fit-contain');
    }

    // Stage (the sliding horizontal track)
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
      slat.setAttribute('aria-label', (item.title || ('Document ' + (index + 1))) + ' (' + (index + 1) + ' of ' + self.items.length + ')');
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
      img.loading = index < 4 ? 'eager' : 'lazy';
      img.draggable = false;

      // When image naturally loads, cache aspect ratio if missing and refresh layout
      img.addEventListener('load', function () {
        if (!item.aspectRatio && img.naturalWidth && img.naturalHeight) {
          item.aspectRatio = Math.round((img.naturalWidth / img.naturalHeight) * 1000) / 1000;
          if (index === self.focused) {
            self.layout();
          }
        }
      });

      inner.appendChild(img);

      // Index badge removed

      // Top tag removed

      // Caption scrim removed

      slat.appendChild(inner);
      self.stage.appendChild(slat);

      self.slatElements.push(slat);
      self.imgElements.push(img);
    });

    // Active Selector Box + Synchronization Lines
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
        lineTop.style.height = (this.opts.selector.lineLength || 450) + 'px';

        const lineBottom = document.createElement('div');
        lineBottom.className = 'spotlight-selector-line bottom';
        lineBottom.style.background = this.opts.selector.color || '#D9B88A';
        lineBottom.style.width = (this.opts.selector.thickness || 2.5) + 'px';
        lineBottom.style.height = (this.opts.selector.lineLength || 450) + 'px';

        this.selectorEl.appendChild(lineTop);
        this.selectorEl.appendChild(lineBottom);
      }

      this.stage.appendChild(this.selectorEl);
    }

    // Video Autoplay & Navigation Bar
    if (this.opts.showControls) {
      this.controlsBar = document.createElement('div');
      this.controlsBar.className = 'spotlight-controls-bar';

      // Play/Pause button
      this.videoBtn = document.createElement('button');
      this.videoBtn.type = 'button';
      this.videoBtn.className = 'spotlight-video-btn';
      this.videoBtn.setAttribute('aria-label', this.isPlaying ? 'Pause Continuous Loop' : 'Play Continuous Loop');
      this.updatePlayBtnIcon();
      this.controlsBar.appendChild(this.videoBtn);

      // Prev step button inside bar
      const barPrevBtn = document.createElement('button');
      barPrevBtn.type = 'button';
      barPrevBtn.className = 'spotlight-step-btn prev';
      barPrevBtn.setAttribute('aria-label', 'Previous frame');
      barPrevBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>';
      barPrevBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        self.tempPause();
        self.prev();
      });
      this.controlsBar.appendChild(barPrevBtn);

      // For larger item collections (> 8 items, like 23 news clippings):
      // Render sleek counter and progress scrubber
      if (this.items.length > 8) {
        this.counterPill = document.createElement('div');
        this.counterPill.className = 'spotlight-counter-pill';
        this.counterPill.innerHTML = '<span class="spotlight-cur-num">' + String(this.focused + 1).padStart(2, '0') + '</span><span class="spotlight-sep">/</span><span class="spotlight-total-num">' + String(this.items.length).padStart(2, '0') + '</span>';
        this.controlsBar.appendChild(this.counterPill);

        // Progress bar / scrubber
        const scrubTrack = document.createElement('div');
        scrubTrack.className = 'spotlight-scrub-track';
        scrubTrack.setAttribute('role', 'progressbar');
        scrubTrack.setAttribute('aria-valuenow', String(this.focused + 1));
        scrubTrack.setAttribute('aria-valuemin', '1');
        scrubTrack.setAttribute('aria-valuemax', String(this.items.length));

        this.scrubFill = document.createElement('div');
        this.scrubFill.className = 'spotlight-scrub-fill';
        const pct = ((this.focused + 1) / this.items.length) * 100;
        this.scrubFill.style.width = pct + '%';
        scrubTrack.appendChild(this.scrubFill);

        // Click on scrub track to seek
        scrubTrack.addEventListener('click', function (e) {
          e.stopPropagation();
          const rect = scrubTrack.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const ratio = clamp(clickX / rect.width, 0, 1);
          const targetIndex = clamp(Math.floor(ratio * self.items.length), 0, self.items.length - 1);
          self.tempPause();
          self.setFocus(targetIndex);
        });

        this.controlsBar.appendChild(scrubTrack);
      } else {
        // Classic dots for small collections (<= 8 items)
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
            self.tempPause();
            self.setFocus(i);
          });
          dotsWrap.appendChild(dot);
          self.dotElements.push(dot);
        });
        this.controlsBar.appendChild(dotsWrap);
      }

      // Next step button inside bar
      const barNextBtn = document.createElement('button');
      barNextBtn.type = 'button';
      barNextBtn.className = 'spotlight-step-btn next';
      barNextBtn.setAttribute('aria-label', 'Next frame');
      barNextBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>';
      barNextBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        self.tempPause();
        self.next();
      });
      this.controlsBar.appendChild(barNextBtn);

      this.container.appendChild(this.controlsBar);
    }

    // Outer Prev/Next arrows on container sides
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
      this.videoBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>';
    } else {
      this.videoBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>';
    }
  };

  SpotlightFrames.prototype.layout = function () {
    const availableWidth = this.container.clientWidth;
    if (availableWidth <= 0) return;

    const count = this.items.length;
    const isMobile = availableWidth < 768;
    const isTablet = availableWidth >= 768 && availableWidth < 1024;
    const stageHeight = this.stage.clientHeight || this.container.clientHeight || (isMobile ? 420 : 480);

    // 1. Collapsed Width: Must maintain a healthy readable width, NEVER squashed into toothpicks
    let colW = this.opts.collapsedWidth || 70;
    if (isMobile) {
      colW = Math.max(48, Math.min(colW, 56));
    } else if (isTablet) {
      colW = Math.max(58, Math.min(colW, 64));
    } else {
      colW = Math.max(68, colW);
    }

    const gap = isMobile ? Math.max(4, Math.round((this.opts.gap || 8) * 0.75)) : (this.opts.gap || 8);

    // 2. Focused Card Aspect Ratio & Dynamic Expansion
    const focusedItem = this.items[this.focused];
    let ar = (focusedItem && focusedItem.aspectRatio) ? focusedItem.aspectRatio : 1.25;

    // Check if image natural dimensions are ready and more precise
    const activeImg = this.imgElements[this.focused];
    if (activeImg && activeImg.naturalWidth && activeImg.naturalHeight && activeImg.naturalHeight > 0) {
      ar = activeImg.naturalWidth / activeImg.naturalHeight;
    }

    // Dynamic expanded width based on original dimensions and stage height
    let naturalExpW = Math.round(stageHeight * ar);

    // Viewport constraints for active card:
    // Fits cleanly on screen while giving maximum readability to text
    let maxExpW = Math.round(availableWidth * (isMobile ? 0.88 : (isTablet ? 0.80 : 0.72)));
    let minExpW = isMobile ? Math.round(availableWidth * 0.76) : Math.max(380, Math.round(stageHeight * 0.72));
    if (minExpW > maxExpW) minExpW = maxExpW;
    const expW = clamp(naturalExpW, minExpW, maxExpW);

    // 3. Compute slot positions along track
    this.slots = [];
    let curX = 0;
    for (let i = 0; i < count; i++) {
      const width = (i === this.focused) ? expW : colW;
      this.slots.push({ left: curX, width: width, isFocused: (i === this.focused) });
      curX += width + gap;
    }

    const totalTrackWidth = curX - gap;
    this.totalTrackWidth = totalTrackWidth;

    // 4. Track Offset / Panning
    // Center the focused card in the viewport
    const focusedSlot = this.slots[this.focused];
    const focusedCenter = focusedSlot.left + (focusedSlot.width / 2);
    let targetOffset = (availableWidth / 2) - focusedCenter;

    if (totalTrackWidth <= availableWidth) {
      // Short collection fits completely: center entire strip
      targetOffset = (availableWidth - totalTrackWidth) / 2;
    } else {
      // Long collection: clamp offset so it doesn't leave awkward blank spaces at edges
      const edgePad = isMobile ? 12 : 24;
      const minOffset = availableWidth - totalTrackWidth - edgePad;
      const maxOffset = edgePad;
      targetOffset = clamp(targetOffset, minOffset, maxOffset);
    }

    this.trackOffset = targetOffset;

    // Apply track transform
    this.stage.style.width = (totalTrackWidth + 40) + 'px';
    this.stage.style.transform = 'translate3d(' + targetOffset + 'px, -50%, 0)';

    // 5. Position and update slats
    const self = this;
    this.slatElements.forEach(function (slat, i) {
      const slot = self.slots[i];
      slat.style.left = slot.left + 'px';
      slat.style.width = slot.width + 'px';

      if (i === self.focused) {
        slat.classList.add('is-active');
        slat.setAttribute('aria-expanded', 'true');
      } else {
        slat.classList.remove('is-active');
        slat.setAttribute('aria-expanded', 'false');
      }
    });

    // 6. Image presentation inside slats
    this.imgElements.forEach(function (img, i) {
      if (i === self.focused) {
        if (self.opts.fitMode === 'contain') {
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.left = '0';
          img.style.transform = 'none';
          img.style.objectFit = 'contain';
        } else {
          img.style.width = expW + 'px';
          img.style.height = '100%';
          img.style.left = '50%';
          img.style.transform = 'translateX(-50%)';
          img.style.objectFit = 'cover';
        }
      } else {
        img.style.width = Math.max(expW, 380) + 'px';
        img.style.height = '100%';
        img.style.left = '50%';
        img.style.transform = 'translateX(-50%)';
        img.style.objectFit = 'cover';
      }
    });

    // 7. Update active selector box + lines
    if (this.selectorEl && this.slots[this.focused]) {
      const marker = this.slots[this.focused];
      this.selectorEl.style.left = marker.left + 'px';
      this.selectorEl.style.width = marker.width + 'px';
    }

    // 8. Update Counter & Progress Bar / Dots
    this.updateControls();
  };

  SpotlightFrames.prototype.updateControls = function () {
    const curIndex = this.focused;
    const total = this.items.length;

    // Counter pill
    if (this.counterPill) {
      const curNumEl = this.counterPill.querySelector('.spotlight-cur-num');
      if (curNumEl) curNumEl.textContent = String(curIndex + 1).padStart(2, '0');
    }

    // Scrubber fill
    if (this.scrubFill) {
      const pct = ((curIndex + 1) / total) * 100;
      this.scrubFill.style.width = pct + '%';
    }

    // Classic dots
    if (this.dotElements && this.dotElements.length > 0) {
      this.dotElements.forEach(function (dot, i) {
        if (i === curIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
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

  SpotlightFrames.prototype.prev = function () {
    const prev = (this.focused - 1 + this.items.length) % this.items.length;
    this.setFocus(prev);
  };

  SpotlightFrames.prototype.next = function () {
    const next = (this.focused + 1) % this.items.length;
    this.setFocus(next);
  };

  SpotlightFrames.prototype.startAutoplay = function () {
    this.stopAutoplay();
    this.isPlaying = true;
    this.updatePlayBtnIcon();

    const self = this;
    this.timer = setInterval(function () {
      if (!self.isVisible) return;
      self.next();
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
      }, 4500);
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

    // Slat Click & Pointer interactions
    this.slatElements.forEach(function (slat, index) {
      if (opensOnHover) {
        slat.addEventListener('pointerenter', function () {
          if (!self.isDragging) {
            self.tempPause();
            self.setFocus(index);
          }
        });
      }

      slat.addEventListener('click', function (e) {
        if (self.dragHasMoved) return; // Prevent triggering click after drag
        self.tempPause();
        if (self.focused === index && typeof self.opts.onSlideClick === 'function') {
          self.opts.onSlideClick(self.items[index], index);
        } else {
          self.setFocus(index);
        }
      });
    });

    // Touch & Mouse Drag / Swipe
    let touchStartX = 0;
    let touchStartY = 0;
    let isTouchActive = false;

    // Touch support
    this.container.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        self.dragStartX = touchStartX;
        self.dragStartOffset = self.trackOffset;
        self.dragHasMoved = false;
        isTouchActive = true;
        self.tempPause();
      }
    }, { passive: true });

    this.container.addEventListener('touchmove', function (e) {
      if (!isTouchActive || e.touches.length !== 1) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = currentX - touchStartX;
      const diffY = currentY - touchStartY;

      if (Math.abs(diffX) > 10 && Math.abs(diffX) > Math.abs(diffY)) {
        self.dragHasMoved = true;
        const newOffset = self.dragStartOffset + diffX;
        self.stage.style.transition = 'none';
        self.stage.style.transform = 'translate3d(' + newOffset + 'px, -50%, 0)';
      }
    }, { passive: true });

    this.container.addEventListener('touchend', function (e) {
      if (!isTouchActive) return;
      isTouchActive = false;
      self.stage.style.transition = '';

      if (self.dragHasMoved) {
        const touchEndX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : touchStartX;
        const deltaX = touchEndX - touchStartX;
        if (deltaX < -35) {
          self.next();
        } else if (deltaX > 35) {
          self.prev();
        } else {
          self.layout();
        }
      }
    }, { passive: true });

    // Trackpad horizontal wheel support
    let wheelTimeout = null;
    this.container.addEventListener('wheel', function (e) {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
      if (Math.abs(delta) > 18) {
        e.preventDefault();
        self.tempPause();
        if (!wheelTimeout) {
          if (delta > 0) self.next();
          else self.prev();
          wheelTimeout = setTimeout(function () {
            wheelTimeout = null;
          }, 350);
        }
      }
    }, { passive: false });

    // Video play/pause toggle button
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

    // Outer Prev / Next Arrows
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        self.tempPause();
        self.prev();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        self.tempPause();
        self.next();
      });
    }

    // Keyboard navigation
    this.container.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        self.tempPause();
        self.prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        self.tempPause();
        self.next();
      }
    });
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

  function escapeText(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, function (m) {
      switch (m) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        default: return m;
      }
    });
  }

  return SpotlightFrames;
}));
