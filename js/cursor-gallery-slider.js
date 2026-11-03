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
    imageFit: 'cover',
    cursorSize: 58,
    cursorBg: true,
    cursorBackground: 'rgba(255, 255, 255, 0.94)',
    cursorColor: '#2E0815',
    borderRadius: 16,
    dots: true,
    dotSize: 8,
    dotActive: '#D9B88A',
    dotInactive: 'rgba(255, 255, 255, 0.45)',
    loop: true,
    autoplay: 0,
    showCaption: false,
    ariaLabel: 'Image Gallery Slider'
  };

  function clamp(v, a, b) {
    return Math.min(b, Math.max(a, v));
  }

  function wrap(i, n) {
    return n ? ((i % n) + n) % n : 0;
  }

  function CursorGallerySlider(container, options) {
    if (!container) return;

    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) return;

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

    this.root = document.createElement('div');
    this.root.className = 'cgs-root';
    this.root.setAttribute('tabindex', '0');
    this.root.setAttribute('role', 'region');
    this.root.setAttribute('aria-label', this.opts.ariaLabel);
    if (this.opts.borderRadius) {
      this.root.style.borderRadius = this.opts.borderRadius + 'px';
    }

    this.viewport = document.createElement('div');
    this.viewport.className = 'cgs-viewport';
    if (this.opts.borderRadius) {
      this.viewport.style.borderRadius = this.opts.borderRadius + 'px';
    }
    this.root.appendChild(this.viewport);

    this.activeLayer = document.createElement('div');
    this.activeLayer.className = 'cgs-layer cgs-layer-active';
    this.viewport.appendChild(this.activeLayer);

    this.cursorEl = document.createElement('div');
    this.cursorEl.className = 'cgs-cursor';
    this.cursorEl.setAttribute('aria-hidden', 'true');
    this.cursorEl.style.width = this.opts.cursorSize + 'px';
    this.cursorEl.style.height = this.opts.cursorSize + 'px';
    this.cursorEl.style.background = this.opts.cursorBackground;
    this.cursorEl.innerHTML = '<svg class="cgs-arrow-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="' + this.opts.cursorColor + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>';
    this.root.appendChild(this.cursorEl);

    // Text overlays disabled everywhere
    this.dock = null;

    if (this.opts.dots) {
      this.dotsWrap = document.createElement('div');
      this.dotsWrap.className = 'cgs-dots';
      this.dotsWrap.setAttribute('role', 'tablist');
      this.dotsWrap.setAttribute('aria-label', 'Slide navigation');
      this.root.appendChild(this.dotsWrap);
      this.renderDots();
    }

    this.touchPrev = document.createElement('button');
    this.touchPrev.type = 'button';
    this.touchPrev.className = 'cgs-touch-arrow cgs-touch-prev';
    this.touchPrev.setAttribute('aria-label', 'Previous Slide');
    this.touchPrev.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>';

    this.touchNext = document.createElement('button');
    this.touchNext.type = 'button';
    this.touchNext.className = 'cgs-touch-arrow cgs-touch-next';
    this.touchNext.setAttribute('aria-label', 'Next Slide');
    this.touchNext.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>';

    this.root.appendChild(this.touchPrev);
    this.root.appendChild(this.touchNext);

    this.container.appendChild(this.root);
  };

  CursorGallerySlider.prototype.renderDots = function () {
    if (!this.dotsWrap) return;
    this.dotsWrap.innerHTML = '';
    if (this.count <= 1 || this.count > 12) {
      this.dotsWrap.style.display = 'none';
      return;
    }
    this.dotsWrap.style.display = 'flex';
    const self = this;
    for (let i = 0; i < this.count; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'cgs-dot' + (i === this.index ? ' active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-selected', i === this.index ? 'true' : 'false');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.dataset.index = i;
      dot.addEventListener('click', function (e) {
        e.stopPropagation();
        self.goTo(parseInt(this.dataset.index, 10));
      });
      this.dotsWrap.appendChild(dot);
    }
  };

  CursorGallerySlider.prototype.updateDots = function () {
    if (!this.dotsWrap) return;
    const dots = this.dotsWrap.querySelectorAll('.cgs-dot');
    const curr = this.index;
    dots.forEach(function (d, i) {
      if (i === curr) {
        d.classList.add('active');
        d.setAttribute('aria-selected', 'true');
      } else {
        d.classList.remove('active');
        d.setAttribute('aria-selected', 'false');
      }
    });
  };

  CursorGallerySlider.prototype.createSlideElement = function (slideData) {
    const wrapEl = document.createElement('div');
    wrapEl.className = 'cgs-slide-content' + (this.opts.imageFit === 'contain' ? ' cgs-fit-contain' : '');

    if (!slideData || !slideData.image) {
      const empty = document.createElement('div');
      empty.className = 'cgs-slide-empty';
      empty.textContent = 'No image available';
      wrapEl.appendChild(empty);
      return wrapEl;
    }

    const img = document.createElement('img');
    img.className = 'cgs-slide-img';
    img.src = slideData.image;
    img.alt = slideData.title || 'Durga Public School Archival Photo';
    img.loading = 'lazy';
    img.draggable = false;
    wrapEl.appendChild(img);

    return wrapEl;
  };

  CursorGallerySlider.prototype.renderSlide = function (idx) {
    if (this.count === 0) return;
    this.activeLayer.innerHTML = '';
    const slide = this.slides[idx];
    const el = this.createSlideElement(slide);
    this.activeLayer.appendChild(el);
    this.updateCaption();
    this.updateDots();
  };

  CursorGallerySlider.prototype.updateCaption = function () {
    if (!this.dock || this.count === 0) return;
    const slide = this.slides[this.index] || {};

    const tag = this.dock.querySelector('.cgs-tag-pill');
    const title = this.dock.querySelector('.cgs-title');
    const desc = this.dock.querySelector('.cgs-desc');
    const cur = this.dock.querySelector('.cgs-counter-current');
    const tot = this.dock.querySelector('.cgs-counter-total');

    if (tag) {
      const tagText = slide.note || slide.subcat || '';
      if (tagText) {
        tag.textContent = tagText;
        tag.style.display = 'inline-block';
      } else {
        tag.style.display = 'none';
      }
    }

    if (title) title.textContent = slide.title || ('Photograph #' + (this.index + 1));
    if (desc) desc.textContent = slide.caption || '';
    if (cur) cur.textContent = (this.index + 1 < 10 ? '0' : '') + (this.index + 1);
    if (tot) tot.textContent = (this.count < 10 ? '0' : '') + this.count;
  };

  CursorGallerySlider.prototype.sideFor = function (relX, width) {
    if (width <= 0) return 'none';
    if (relX < width / 2) {
      return (this.opts.loop || this.index > 0) ? 'left' : 'none';
    }
    return (this.opts.loop || this.index < this.count - 1) ? 'right' : 'none';
  };

  CursorGallerySlider.prototype.startSlide = function (dir) {
    if (this.isSliding || this.count <= 1) return;

    let targetIndex = this.index + dir;
    if (this.opts.loop) {
      targetIndex = wrap(targetIndex, this.count);
    } else {
      if (targetIndex < 0 || targetIndex >= this.count) return;
    }

    this.isSliding = true;
    const self = this;
    const fromIndex = this.index;
    const toIndex = targetIndex;
    const duration = this.opts.durationMs;
    const ease = this.opts.ease;

    const incomingLayer = document.createElement('div');
    incomingLayer.className = 'cgs-layer cgs-layer-incoming';
    const incomingEl = this.createSlideElement(this.slides[toIndex]);
    incomingLayer.appendChild(incomingEl);

    const startX = dir === 1 ? '100%' : '-100%';
    const endX = dir === 1 ? '-100%' : '100%';

    incomingLayer.style.transform = 'translateX(' + startX + ')';
    incomingLayer.style.transition = 'none';
    this.viewport.appendChild(incomingLayer);

    this.activeLayer.style.transform = 'translateX(0%)';
    this.activeLayer.style.transition = 'none';

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        self.activeLayer.style.transition = 'transform ' + duration + 'ms ' + ease;
        self.activeLayer.style.transform = 'translateX(' + endX + ')';

        incomingLayer.style.transition = 'transform ' + duration + 'ms ' + ease;
        incomingLayer.style.transform = 'translateX(0%)';
      });
    });

    this.index = toIndex;
    this.updateCaption();
    this.updateDots();

    setTimeout(function () {
      self.activeLayer.innerHTML = '';
      self.activeLayer.style.transform = 'translateX(0%)';
      self.activeLayer.style.transition = 'none';
      self.activeLayer.appendChild(incomingEl);

      if (incomingLayer.parentNode) {
        incomingLayer.parentNode.removeChild(incomingLayer);
      }

      self.isSliding = false;
      if (self.pointerIn) {
        const rect = self.root.getBoundingClientRect();
        self.cursorSide = self.sideFor(self.pointerPos.x, rect.width);
        self.updateCursor();
      }
    }, duration + 30);
  };

  CursorGallerySlider.prototype.next = function () {
    this.startSlide(1);
  };

  CursorGallerySlider.prototype.prev = function () {
    this.startSlide(-1);
  };

  CursorGallerySlider.prototype.goTo = function (targetIdx) {
    if (this.isSliding || targetIdx === this.index || targetIdx < 0 || targetIdx >= this.count) return;
    const dir = targetIdx > this.index ? 1 : -1;
    this.startSlide(dir);
  };

  CursorGallerySlider.prototype.updateCursor = function () {
    if (!this.cursorEl) return;
    if (!this.pointerIn || this.cursorSide === 'none') {
      this.cursorEl.classList.remove('visible');
      this.root.style.cursor = 'default';
      return;
    }

    this.cursorEl.classList.add('visible');
    this.root.style.cursor = 'none';
    this.cursorEl.style.transform = 'translate(' + (this.pointerPos.x - this.opts.cursorSize / 2) + 'px, ' + (this.pointerPos.y - this.opts.cursorSize / 2) + 'px)';

    const arrowSvg = this.cursorEl.querySelector('.cgs-arrow-svg');
    if (arrowSvg) {
      if (this.cursorSide === 'left') {
        arrowSvg.style.transform = 'scaleX(-1)';
      } else {
        arrowSvg.style.transform = 'scaleX(1)';
      }
    }
  };

  CursorGallerySlider.prototype.bindEvents = function () {
    const self = this;

    this.root.addEventListener('pointerenter', function (e) {
      self.pointerIn = true;
      const rect = self.root.getBoundingClientRect();
      self.pointerPos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      self.cursorSide = self.sideFor(self.pointerPos.x, rect.width);
      self.updateCursor();
      self.stopAutoplay();
    });

    this.root.addEventListener('pointermove', function (e) {
      self.pointerIn = true;
      const rect = self.root.getBoundingClientRect();
      self.pointerPos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      self.cursorSide = self.sideFor(self.pointerPos.x, rect.width);
      self.updateCursor();
    });

    this.root.addEventListener('pointerleave', function () {
      self.pointerIn = false;
      self.cursorSide = 'none';
      self.updateCursor();
      if (self.opts.autoplay > 0) self.startAutoplay();
    });

    this.root.addEventListener('click', function (e) {
      if (self.isSliding) return;
      if (e.target.closest('.cgs-dock') || e.target.closest('.cgs-dots') || e.target.closest('.cgs-touch-arrow')) {
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

    if (this.dock) {
      const zoomBtn = this.dock.querySelector('.cgs-zoom-btn');
      if (zoomBtn) {
        zoomBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          if (typeof self.opts.onSlideClick === 'function' && self.count > 0) {
            self.opts.onSlideClick(self.slides[self.index], self.index);
          }
        });
      }
    }

    this.touchPrev.addEventListener('click', function (e) {
      e.stopPropagation();
      self.prev();
    });

    this.touchNext.addEventListener('click', function (e) {
      e.stopPropagation();
      self.next();
    });

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

      if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy) * 1.3 && dt < 600) {
        if (dx < 0) {
          self.next();
        } else {
          self.prev();
        }
      }
      if (self.opts.autoplay > 0) self.startAutoplay();
    }, { passive: true });

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

  CursorGallerySlider.prototype.layout = function () {
    this.updateCaption();
    this.updateDots();
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

function initDpsCursorGallery() {
  if (typeof window === 'undefined') return;
  window.dpsCursorSliders = window.dpsCursorSliders || {};

  const hosts = document.querySelectorAll('[data-cursor-chapter]');
  if (!hosts.length) return;

  function openLightbox(photo) {
    if (!photo || !photo.image) return;
    let modal = document.getElementById('dpsGalleryLightbox');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'dpsGalleryLightbox';
      modal.style.cssText = 'position:fixed;inset:0;z-index:999999;background:rgba(26,5,14,0.92);backdrop-filter:blur(16px);display:flex;align-items:center;justify-content:center;padding:24px;box-sizing:border-box;opacity:0;transition:opacity 0.25s ease;';
      modal.innerHTML = '<div style="position:relative;max-width:1100px;width:100%;max-height:92vh;display:flex;flex-direction:column;align-items:center;"><button type="button" id="dpsLightboxClose" style="position:absolute;top:-18px;right:-18px;width:40px;height:40px;border-radius:50%;background:#FFFFFF;border:none;color:#2E0815;font-size:22px;font-weight:700;cursor:pointer;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,0.4);z-index:10;">&times;</button><img id="dpsLightboxImg" style="max-width:100%;max-height:76vh;object-fit:contain;border-radius:12px;box-shadow:0 24px 60px rgba(0,0,0,0.5);" src="" alt=""></div></div>';
      document.body.appendChild(modal);

      const closeBtn = document.getElementById('dpsLightboxClose');
      closeBtn.addEventListener('click', function () {
        modal.style.opacity = '0';
        setTimeout(function () { modal.style.display = 'none'; }, 250);
      });

      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          modal.style.opacity = '0';
          setTimeout(function () { modal.style.display = 'none'; }, 250);
        }
      });

      window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display !== 'none') {
          modal.style.opacity = '0';
          setTimeout(function () { modal.style.display = 'none'; }, 250);
        }
      });
    }

    const img = document.getElementById('dpsLightboxImg');
    const title = document.getElementById('dpsLightboxTitle');
    const desc = document.getElementById('dpsLightboxDesc');

    if (img) img.src = photo.image;
    // No lightbox captions

    modal.style.display = 'flex';
    requestAnimationFrame(function () {
      modal.style.opacity = '1';
    });
  }

  // Get live updated gallery data from localStorage (saved by Admin Suite) or fallback to static catalog
  function getLiveChapterData(catKey) {
    try {
      const stored = localStorage.getItem('dps_gallery_catalog') || localStorage.getItem('dps_gallery_prints');
      if (stored) {
        const catalog = JSON.parse(stored);
        if (Array.isArray(catalog) && catalog.length > 0) {
          const matched = catalog.filter(function (p) {
            return p.cat === catKey;
          });
          if (matched.length > 0) {
            return matched.map(function (it) {
              return {
                id: it.id,
                title: it.title,
                subcat: it.subcat || it.note || it.catLabel || '',
                subcatSlug: it.subcatSlug || (it.subcat ? it.subcat.toLowerCase().replace(/[^a-z0-9]+/g, '-') : ''),
                desc: it.desc || '',
                caption: it.desc || '',
                src: it.src,
                image: it.src,
                featured: !!it.featured,
                note: it.note || it.subcat || ''
              };
            });
          }
        }
      }
    } catch (e) {
      console.warn('Live gallery sync error:', e);
    }
    return (window.DPS_GALLERY_DATA && window.DPS_GALLERY_DATA[catKey]) ? window.DPS_GALLERY_DATA[catKey] : [];
  }

  hosts.forEach(function (host) {
    const chapterKey = host.getAttribute('data-cursor-chapter');
    if (!chapterKey) return;

    let dataPool = getLiveChapterData(chapterKey);
    if (!dataPool.length) return;

    const slider = new CursorGallerySlider(host, {
      slides: dataPool,
      imageFit: chapterKey === 'news-cuttings' ? 'contain' : 'cover',
      durationMs: 600,
      cursorBg: true,
      cursorBackground: 'rgba(255, 255, 255, 0.94)',
      cursorColor: '#2E0815',
      borderRadius: 16,
      onSlideClick: function (slide) {
        openLightbox(slide);
      }
    });

    window.dpsCursorSliders[chapterKey] = slider;

    const section = host.closest('.scrapbook-chapter');
    if (section) {
      const pills = section.querySelectorAll('.scrapbook-subcat-pill');
      pills.forEach(function (pill) {
        pill.addEventListener('click', function () {
          pills.forEach(function (p) { p.classList.remove('active'); });
          this.classList.add('active');

          const currentPool = getLiveChapterData(chapterKey);
          const subcat = this.getAttribute('data-subcat');
          if (!subcat || subcat === 'all') {
            slider.setItems(currentPool);
          } else {
            const filtered = currentPool.filter(function (it) {
              const itemSub = (it.subcat || '').toLowerCase();
              return itemSub === subcat.toLowerCase() || (it.subcatSlug && it.subcatSlug === subcat.toLowerCase());
            });
            slider.setItems(filtered.length ? filtered : currentPool);
          }
        });
      });
    }
  });

  // Cross-tab real-time synchronization with Admin Suite
  window.addEventListener('storage', function (e) {
    if (e.key === 'dps_gallery_catalog' || e.key === 'dps_gallery_prints') {
      hosts.forEach(function (host) {
        const chapterKey = host.getAttribute('data-cursor-chapter');
        if (!chapterKey || !window.dpsCursorSliders[chapterKey]) return;
        const freshData = getLiveChapterData(chapterKey);
        if (freshData.length) {
          window.dpsCursorSliders[chapterKey].setItems(freshData);
        }
      });
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDpsCursorGallery);
} else {
  initDpsCursorGallery();
}
