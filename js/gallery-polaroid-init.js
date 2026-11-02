/**
 * Gallery Polaroid Line Carousel Initializer
 * Durga Public School, Pilani, Rajasthan
 *
 * Mounts interactive pegged line carousels for EVERY category on gallery.html:
 * Campus, Academics, Labs, Cultural, Sports, Student Life, and News Cuttings.
 * Features realistic string sagging, spring damping, angular momentum swing,
 * idle breeze swaying, view switcher (both / line only / grid only), and
 * high-resolution lightbox integration.
 */

(function () {
  'use strict';

  if (typeof window === 'undefined') return;

  window.galleryPolaroidCarousels = {};

  const CHAPTER_CONFIGS = [
    {
      id: 'campus',
      title: 'Campus Architecture & Sandstone Heritage',
      note: 'Campus Architecture',
      containFit: false
    },
    {
      id: 'academics',
      title: 'Academic Wings & Smart Classrooms',
      note: 'Academic Wings',
      containFit: false
    },
    {
      id: 'labs',
      title: 'Experiential Science, ICT & Language Labs',
      note: 'Science & IT Labs',
      containFit: false
    },
    {
      id: 'cultural',
      title: 'Cultural Heritage & Stage Arts',
      note: 'Cultural Heritage',
      containFit: false
    },
    {
      id: 'sports',
      title: 'Sports Arena & Athletic Meets',
      note: 'Sports Arena',
      containFit: false
    },
    {
      id: 'student-life',
      title: 'Student Life & Morning Assemblies',
      note: 'Student Life',
      containFit: false
    },
    {
      id: 'news-cuttings',
      title: 'News Cutting Corner & Press Clippings',
      note: 'Press Clipping',
      containFit: true
    }
  ];

  function initGalleryPolaroidCarousels() {
    if (typeof PolaroidLineCarousel === 'undefined') {
      console.warn('PolaroidLineCarousel is not loaded yet.');
      return;
    }

    CHAPTER_CONFIGS.forEach(function (conf) {
      const chapterEl = document.getElementById('chapter-' + conf.id);
      if (!chapterEl) return;

      const stageEl = document.getElementById('polaroidStage-' + conf.id);
      if (!stageEl) return;

      let slides = [];

      if (conf.id === 'news-cuttings') {
        const cuttingsData = (typeof DEFAULT_NEWS_CUTTINGS !== 'undefined' ? DEFAULT_NEWS_CUTTINGS : (window.DEFAULT_NEWS_CUTTINGS || []));
        if (Array.isArray(cuttingsData) && cuttingsData.length > 0) {
          slides = cuttingsData.map(function (c, idx) {
            return {
              image: c.fullImage || c.image,
              title: c.title,
              caption: (c.date ? c.date + ' &bull; ' : '') + (c.newspaper || 'Rajasthan Press'),
              note: (c.newspaper || 'Rajasthan Press') + (c.date ? ' ' + c.date : ''),
              id: c.id,
              index: idx
            };
          });
        }
      }

      // If no cuttings or standard chapters, extract from existing DOM items
      if (slides.length === 0) {
        const items = Array.from(chapterEl.querySelectorAll('.scrapbook-item, .scrapbook-frame-item'));
        slides = items.map(function (item, idx) {
          const fullImg = item.getAttribute('data-full') ||
            (item.querySelector('.scrapbook-photo-card') && item.querySelector('.scrapbook-photo-card').getAttribute('data-lightbox-src')) ||
            (item.querySelector('img') && item.querySelector('img').src) || '';

          const title = item.getAttribute('data-title') ||
            (item.querySelector('.scrapbook-title') && item.querySelector('.scrapbook-title').textContent.trim()) || '';

          const desc = item.getAttribute('data-desc') ||
            (item.querySelector('.scrapbook-desc') && item.querySelector('.scrapbook-desc').textContent.trim()) || '';

          const chip = item.querySelector('.scrapbook-cat-chip, .scrapbook-print-num');
          const noteText = chip ? chip.textContent.trim() : (item.getAttribute('data-subcat') ? item.getAttribute('data-subcat').replace(/-/g, ' ') : conf.note);

          return {
            image: fullImg,
            title: title,
            caption: desc,
            note: noteText,
            subcat: item.getAttribute('data-subcat') || '',
            id: item.getAttribute('data-print') || (conf.id + '-' + idx),
            itemEl: item,
            index: idx
          };
        });
      }

      if (slides.length === 0) return;

      // Instantiate PolaroidLineCarousel
      try {
        const carousel = new PolaroidLineCarousel(stageEl, {
          slides: slides,
          cardWidth: 285,
          sag: 44,
          swing: 1,
          autoplay: 4200,
          containFit: conf.containFit,
          string: '#8a7f72',
          background: 'linear-gradient(180deg, rgba(254, 252, 248, 0.96) 0%, rgba(247, 241, 230, 0.98) 100%)',
          ink: '#2E0815',
          ariaLabel: conf.title + ' Pegged Line Carousel',
          onSlideClick: function (slide) {
            if (conf.id === 'news-cuttings') {
              if (typeof window.openCuttingModal === 'function') {
                window.openCuttingModal(slide.id);
                return;
              }
              const targetCutting = document.querySelector('[data-print="' + (slide.id ? slide.id.replace('cutting-', 'NC-') : '') + '"] .scrapbook-photo-card');
              if (targetCutting) {
                targetCutting.click();
                return;
              }
            }
            if (typeof window.openGalleryLightbox === 'function' && typeof window.getGalleryCurrentVisibleItems === 'function' && slide.itemEl) {
              const visibleList = window.getGalleryCurrentVisibleItems();
              const idx = visibleList.indexOf(slide.itemEl);
              if (idx !== -1) {
                window.openGalleryLightbox(idx);
                return;
              }
            }
            if (slide.itemEl) {
              slide.itemEl.click();
            } else {
              const target = document.querySelector('[data-print="' + slide.id + '"], [data-category="' + conf.id + '"][data-index="' + slide.index + '"]');
              if (target) target.click();
            }
          }
        });

        window.galleryPolaroidCarousels[conf.id] = carousel;
      } catch (err) {
        console.error('Error mounting carousel for chapter ' + conf.id + ':', err);
      }
    });

    setupViewToggles();
    setupSubcategorySync();
    setupFilterTabSync();
  }

  // Local Chapter View Toggles & Global View Presentation Switcher
  function setupViewToggles() {
    // 1. Local View Toggles in Each Chapter
    document.querySelectorAll('.gallery-polaroid-line-wrap').forEach(function (wrap) {
      const chapter = wrap.closest('.scrapbook-chapter');
      if (!chapter) return;
      const catId = wrap.getAttribute('data-carousel-chapter');
      const stage = wrap.querySelector('.gallery-polaroid-stage');
      const grid = chapter.querySelector('.scrapbook-grid');

      const btns = wrap.querySelectorAll('.gpl-view-btn');
      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          const view = btn.getAttribute('data-view');
          btns.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');

          if (view === 'both') {
            if (stage) stage.classList.remove('gpl-stage-hidden');
            if (grid) grid.classList.remove('gpl-grid-hidden');
          } else if (view === 'carousel') {
            if (stage) stage.classList.remove('gpl-stage-hidden');
            if (grid) grid.classList.add('gpl-grid-hidden');
          } else if (view === 'grid') {
            if (stage) stage.classList.add('gpl-stage-hidden');
            if (grid) grid.classList.remove('gpl-grid-hidden');
          }

          if (catId && window.galleryPolaroidCarousels[catId]) {
            setTimeout(function () {
              window.galleryPolaroidCarousels[catId].updateSizes();
            }, 60);
          }
        });
      });
    });

    // 2. Global Presentation Switcher in Control Dock
    const globalBtns = document.querySelectorAll('.svmb-btn');
    if (globalBtns.length > 0) {
      globalBtns.forEach(function (gBtn) {
        gBtn.addEventListener('click', function () {
          const globalView = gBtn.getAttribute('data-global-view');
          globalBtns.forEach(function (b) { b.classList.remove('active'); });
          gBtn.classList.add('active');

          document.querySelectorAll('.gallery-polaroid-line-wrap').forEach(function (wrap) {
            const chapter = wrap.closest('.scrapbook-chapter');
            if (!chapter) return;
            const stage = wrap.querySelector('.gallery-polaroid-stage');
            const grid = chapter.querySelector('.scrapbook-grid');
            const localBtns = wrap.querySelectorAll('.gpl-view-btn');

            localBtns.forEach(function (b) {
              b.classList.toggle('active', b.getAttribute('data-view') === globalView);
            });

            if (globalView === 'both') {
              if (stage) stage.classList.remove('gpl-stage-hidden');
              if (grid) grid.classList.remove('gpl-grid-hidden');
            } else if (globalView === 'carousel') {
              if (stage) stage.classList.remove('gpl-stage-hidden');
              if (grid) grid.classList.add('gpl-grid-hidden');
            } else if (globalView === 'grid') {
              if (stage) stage.classList.add('gpl-stage-hidden');
              if (grid) grid.classList.remove('gpl-grid-hidden');
            }
          });

          // Recalibrate all carousels
          Object.keys(window.galleryPolaroidCarousels).forEach(function (k) {
            if (window.galleryPolaroidCarousels[k]) {
              setTimeout(function () {
                window.galleryPolaroidCarousels[k].updateSizes();
              }, 80);
            }
          });
        });
      });
    }
  }

  // Smooth Navigation: Clicking a subcategory pill slides carousel to that topic
  function setupSubcategorySync() {
    document.querySelectorAll('.scrapbook-chapter').forEach(function (chap) {
      const catId = chap.getAttribute('data-chapter');
      const carousel = window.galleryPolaroidCarousels[catId];
      if (!carousel) return;

      const subcatPills = chap.querySelectorAll('.scrapbook-subcat-pill');
      subcatPills.forEach(function (pill) {
        pill.addEventListener('click', function () {
          const subcat = pill.getAttribute('data-subcat');
          if (!subcat || subcat === 'all') return;

          // Find first slide matching this subcategory
          const targetIdx = carousel.slides.findIndex(function (s) {
            return s.subcat === subcat;
          });
          if (targetIdx !== -1) {
            carousel.goTo(targetIdx);
          }
        });
      });
    });
  }

  // Filter Tabs & Hash Synchronizer: When a category tab is activated, recalibrate carousel sizes
  function setupFilterTabSync() {
    const filterBtns = document.querySelectorAll('.scrapbook-filter-btn, .gal-filter-btn');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const cat = btn.getAttribute('data-category');
        triggerCategoryCarouselResize(cat);
      });
    });

    window.addEventListener('hashchange', function () {
      const hashCat = window.location.hash.replace('#', '') || 'all';
      triggerCategoryCarouselResize(hashCat);
    });
  }

  function triggerCategoryCarouselResize(cat) {
    setTimeout(function () {
      if (cat === 'all') {
        Object.keys(window.galleryPolaroidCarousels).forEach(function (k) {
          if (window.galleryPolaroidCarousels[k]) {
            window.galleryPolaroidCarousels[k].updateSizes();
          }
        });
      } else if (window.galleryPolaroidCarousels[cat]) {
        window.galleryPolaroidCarousels[cat].updateSizes();
      }
    }, 120);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGalleryPolaroidCarousels);
  } else {
    initGalleryPolaroidCarousels();
  }
})();
