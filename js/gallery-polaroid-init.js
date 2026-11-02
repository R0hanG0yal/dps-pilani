/**
 * Gallery Polaroid Line Carousel Initializer
 * Durga Public School, Pilani, Rajasthan
 *
 * Exclusively powers the gallery experience across all 7 heritage chapters:
 * Campus, Academics, Labs, Cultural, Sports, Student Life, and News Cuttings.
 * Features:
 * - Dynamic sub-category string filtering (re-hangs matching prints on the line)
 * - Ultra-premium liquid glass floating controls dock
 * - Separated button functions: Story Card, Counter Capsule, Standalone Prev/Next buttons, and Stage Flank Chevrons
 * - Full high-resolution lightbox modal with keyboard navigation
 */

(function () {
  'use strict';

  if (typeof window === 'undefined') return;

  window.galleryPolaroidCarousels = {};
  const masterSlidesByChapter = {};
  const activeSlidesByChapter = {};

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
      title: 'Science Laboratories & Innovation Hubs',
      note: 'Science & IT Labs',
      containFit: false
    },
    {
      id: 'cultural',
      title: 'Cultural Festivals & Performing Arts',
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
      title: 'Student Life, Fleet & Heritage Archive',
      note: 'Student Life',
      containFit: false
    },
    {
      id: 'news-cuttings',
      title: 'News Cutting Corner & Media News',
      note: 'Press Clipping',
      containFit: true
    }
  ];

  function initGalleryPolaroidCarousels() {
    if (typeof PolaroidLineCarousel === 'undefined') {
      console.warn('PolaroidLineCarousel is not loaded yet.');
      return;
    }

    const dataCatalog = window.DPS_GALLERY_DATA || {};

    CHAPTER_CONFIGS.forEach(function (conf) {
      const chapterEl = document.getElementById('chapter-' + conf.id);
      if (!chapterEl) return;

      const stageEl = document.getElementById('polaroidStage-' + conf.id);
      if (!stageEl) return;

      // Retrieve full category prints from DPS_GALLERY_DATA
      let slides = (dataCatalog[conf.id] || []).slice();

      // Fallback for news-cuttings if not in dataCatalog
      if (slides.length === 0 && conf.id === 'news-cuttings') {
        const cuttingsData = (typeof DEFAULT_NEWS_CUTTINGS !== 'undefined' ? DEFAULT_NEWS_CUTTINGS : (window.DEFAULT_NEWS_CUTTINGS || []));
        if (Array.isArray(cuttingsData) && cuttingsData.length > 0) {
          slides = cuttingsData.map(function (c, idx) {
            const paper = c.newspaper || 'Rajasthan Press';
            const paperSubcat = paper.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '').trim();
            return {
              image: c.fullImage || c.image,
              title: c.title,
              caption: (c.date ? c.date + ' &bull; ' : '') + paper,
              note: paper + (c.date ? ' ' + c.date : ''),
              subcat: paperSubcat,
              id: c.id,
              index: idx
            };
          });
        }
      }

      if (slides.length === 0) return;

      masterSlidesByChapter[conf.id] = slides;
      activeSlidesByChapter[conf.id] = slides;

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
          onSlideClick: function (slide, idx) {
            if (conf.id === 'news-cuttings' && typeof window.openCuttingModal === 'function') {
              window.openCuttingModal(slide.id);
              return;
            }
            openLightboxModal(activeSlidesByChapter[conf.id] || slides, idx !== undefined ? idx : carousel.active);
          }
        });

        window.galleryPolaroidCarousels[conf.id] = carousel;

        // Wire sub-category filter pills for this chapter
        setupChapterSubcatFilter(chapterEl, conf.id, carousel);
      } catch (err) {
        console.error('Error mounting carousel for chapter ' + conf.id + ':', err);
      }
    });

    setupCategoryFilterTabs();
  }

  // Dynamic Subcategory String Filter: Clicking a sub-filter pill re-hangs matching photos on the line
  function setupChapterSubcatFilter(chapterEl, catId, carousel) {
    const subcatPills = chapterEl.querySelectorAll('.scrapbook-subcat-pill');
    if (subcatPills.length === 0) return;

    subcatPills.forEach(function (pill) {
      pill.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        subcatPills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');

        const targetSubcat = pill.getAttribute('data-subcat');
        const allCategorySlides = masterSlidesByChapter[catId] || [];

        let filteredSlides;
        if (!targetSubcat || targetSubcat === 'all') {
          filteredSlides = allCategorySlides;
        } else {
          filteredSlides = allCategorySlides.filter(function (s) {
            return s.subcat === targetSubcat;
          });
        }

        activeSlidesByChapter[catId] = filteredSlides;

        // Update the chapter count pill in the header
        const countPill = chapterEl.querySelector('.chapter-count-pill');
        if (countPill) {
          const unit = catId === 'news-cuttings' ? 'Authentic Press Clippings' : 'Archival Prints';
          countPill.textContent = filteredSlides.length + ' ' + unit;
        }

        // Re-hang the filtered photos on the string carousel!
        carousel.setItems(filteredSlides);
      });
    });
  }

  // Top Category Tabs Filter: Show/hide chapters & smooth scroll
  function setupCategoryFilterTabs() {
    const filterBtns = document.querySelectorAll('.scrapbook-filter-btn, .gal-filter-btn');
    if (filterBtns.length === 0) return;

    const chapters = Array.from(document.querySelectorAll('.scrapbook-chapter'));

    function applyCategory(cat) {
      filterBtns.forEach(function (btn) {
        const isActive = btn.getAttribute('data-category') === cat;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Update mobile drawer active label
      const mobileLabel = document.getElementById('smctActiveCategoryLabel');
      if (mobileLabel) {
        const activeBtn = Array.from(filterBtns).find(function (b) { return b.getAttribute('data-category') === cat; });
        if (activeBtn) {
          const labelText = activeBtn.querySelector('.btn-tab-label') ? activeBtn.querySelector('.btn-tab-label').textContent.trim() : activeBtn.textContent.trim();
          const countText = activeBtn.querySelector('.btn-tab-count') ? activeBtn.querySelector('.btn-tab-count').textContent.trim() : '';
          mobileLabel.textContent = labelText + (countText ? ' (' + countText + ')' : '');
        }
      }

      // Filter Chapters
      chapters.forEach(function (chapter) {
        const chapCat = chapter.getAttribute('data-chapter');
        const matches = (cat === 'all' || chapCat === cat);
        if (matches) {
          chapter.classList.remove('hidden-chapter');
          chapter.style.display = '';
        } else {
          chapter.classList.add('hidden-chapter');
          chapter.style.display = 'none';
        }
      });

      // Recalibrate carousel dimensions for visible chapters
      setTimeout(function () {
        if (cat === 'all') {
          Object.keys(window.galleryPolaroidCarousels).forEach(function (k) {
            if (window.galleryPolaroidCarousels[k]) {
              window.galleryPolaroidCarousels[k].updateSizes();
            }
          });
        } else if (window.galleryPolaroidCarousels[cat]) {
          window.galleryPolaroidCarousels[cat].updateSizes();
          const targetChap = document.getElementById('chapter-' + cat);
          if (targetChap) {
            const navOffset = 90;
            const targetY = targetChap.getBoundingClientRect().top + window.pageYOffset - navOffset;
            window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
          }
        }
      }, 120);
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const cat = btn.getAttribute('data-category');
        applyCategory(cat);
        if (history.pushState) {
          history.pushState(null, null, cat === 'all' ? window.location.pathname : '#' + cat);
        }
      });
    });

    // Hash deep-link on load and hashchange
    function checkHash() {
      if (window.location.hash) {
        const hashCat = window.location.hash.replace('#', '');
        const matchingBtn = document.querySelector('.scrapbook-filter-btn[data-category="' + hashCat + '"], .gal-filter-btn[data-category="' + hashCat + '"]');
        if (matchingBtn) {
          applyCategory(hashCat);
        }
      }
    }

    checkHash();
    window.addEventListener('hashchange', checkHash);
  }

  // Lightbox Modal Controller for Line Carousels
  function openLightboxModal(slidesList, startIndex) {
    const modal = document.getElementById('galleryLightboxModal');
    if (!modal || !slidesList || slidesList.length === 0) return;

    let currentIndex = (startIndex + slidesList.length) % slidesList.length;

    function renderModal(idx) {
      currentIndex = (idx + slidesList.length) % slidesList.length;
      const cur = slidesList[currentIndex];
      const mainImg = modal.querySelector('.lightbox-main-img');
      const titleEl = modal.querySelector('.lightbox-title');
      const captionEl = modal.querySelector('.lightbox-caption');
      const catChip = modal.querySelector('.lightbox-category-chip');
      const counterEl = modal.querySelector('.lightbox-counter');

      if (mainImg) {
        mainImg.src = cur.image;
        mainImg.alt = cur.title || '';
      }
      if (titleEl) titleEl.textContent = cur.title || '';
      if (captionEl) captionEl.innerHTML = cur.caption || '';
      if (catChip) catChip.textContent = cur.catLabel || cur.note || '';
      if (counterEl) counterEl.textContent = (currentIndex + 1) + ' of ' + slidesList.length;
    }

    renderModal(currentIndex);

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const prevBtn = modal.querySelector('[data-lightbox-prev], .lightbox-nav-arrow.prev');
    const nextBtn = modal.querySelector('[data-lightbox-next], .lightbox-nav-arrow.next');
    const closeBtn = modal.querySelector('[data-lightbox-close], .lightbox-btn-close');

    function onPrev(e) {
      if (e) e.stopPropagation();
      renderModal(currentIndex - 1);
    }

    function onNext(e) {
      if (e) e.stopPropagation();
      renderModal(currentIndex + 1);
    }

    function onClose(e) {
      if (e) e.stopPropagation();
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      cleanup();
    }

    function onKey(e) {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
    }

    function onBackdrop(e) {
      if (e.target === modal) onClose();
    }

    function cleanup() {
      if (prevBtn) prevBtn.removeEventListener('click', onPrev);
      if (nextBtn) nextBtn.removeEventListener('click', onNext);
      if (closeBtn) closeBtn.removeEventListener('click', onClose);
      window.removeEventListener('keydown', onKey);
      modal.removeEventListener('click', onBackdrop);
    }

    if (prevBtn) prevBtn.addEventListener('click', onPrev);
    if (nextBtn) nextBtn.addEventListener('click', onNext);
    if (closeBtn) closeBtn.addEventListener('click', onClose);
    window.addEventListener('keydown', onKey);
    modal.addEventListener('click', onBackdrop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGalleryPolaroidCarousels);
  } else {
    initGalleryPolaroidCarousels();
  }
})();
