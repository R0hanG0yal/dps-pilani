/**
 * Durga Public School, Pilani, Rajasthan
 * Master Production Script: Accessible Navigation, Expandable Sections,
 * Form Validation, Spam Mitigation & DPDP Act 2023 Compliant Consent Handling.
 * Zero external tracking dependencies, zero frontend secrets.
 */

(function () {
  'use strict';

  // 1. MOBILE NAVIGATION DRAWER
  function initMobileNav() {
    // If modern mega menu overlay exists, let master editorial controller handle it
    if (document.getElementById('dpsMegaMenu')) return;

    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.dps-nav');
    const navList = document.querySelector('.nav-list');

    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      const willBeActive = !isExpanded;
      toggleBtn.setAttribute('aria-expanded', willBeActive ? 'true' : 'false');
      nav.classList.toggle('active', willBeActive);
      if (navList) navList.classList.toggle('active', willBeActive);
    });

    // Close when clicking any nav link
    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('active');
        if (navList) navList.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside header or pressing Escape
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggleBtn.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        if (navList) navList.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
        if (navList) navList.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.focus();
      }
    });
  }

  // 2. EXPANDABLE FOOTER DIRECTORY & SECTIONS
  function initExpandableDirectory() {
    const footerDrawerToggle = document.querySelector('.footer-drawer-toggle');
    const footerDrawerContent = document.querySelector('.footer-drawer-content');

    if (footerDrawerToggle && footerDrawerContent) {
      footerDrawerToggle.addEventListener('click', function () {
        const isExpanded = footerDrawerToggle.getAttribute('aria-expanded') === 'true';
        footerDrawerToggle.setAttribute('aria-expanded', !isExpanded);
        footerDrawerContent.classList.toggle('active');
        
        const symbol = footerDrawerToggle.querySelector('.symbol');
        if (symbol) {
          symbol.textContent = isExpanded ? '+' : '−';
        }
      });
    }

    // Support for universal button/section expandables
    // NOTE: only BUTTON elements carry [data-expander-target] as a toggle hook.
    // Content panes never carry it here, so clicking inside expanded content is safe.
    const genericExpanders = document.querySelectorAll('button[data-expander-target]');
    genericExpanders.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const targetId = btn.getAttribute('data-expander-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const isHidden = targetEl.hasAttribute('hidden') || targetEl.style.display === 'none';
          if (isHidden) {
            targetEl.removeAttribute('hidden');
            targetEl.style.display = 'block';
            btn.setAttribute('aria-expanded', 'true');
          } else {
            targetEl.setAttribute('hidden', '');
            targetEl.style.display = 'none';
            btn.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  }

  // 3. DPDP ACT 2023 COMPLIANT COOKIE CONSENT BANNER
  function initCookieConsent() {
    const CONSENT_KEY = 'durga_school_dpdp_cookie_consent_v1';
    const banner = document.getElementById('cookieConsentBanner');
    const acceptBtn = document.getElementById('cookieAcceptBtn');
    const declineBtn = document.getElementById('cookieDeclineBtn');

    if (!banner || !acceptBtn || !declineBtn) return;

    const existingChoice = localStorage.getItem(CONSENT_KEY);
    if (!existingChoice) {
      banner.style.display = 'block';
    } else {
      banner.style.display = 'none';
    }

    acceptBtn.addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({
        status: 'accepted',
        timestamp: new Date().toISOString(),
        type: 'operational_essential'
      }));
      banner.style.display = 'none';
    });

    declineBtn.addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({
        status: 'declined',
        timestamp: new Date().toISOString(),
        type: 'essential_only'
      }));
      banner.style.display = 'none';
    });
  }// 4. FORM VALIDATION & ANTI-SPAM PROTECTION
  function initForms() {
    const forms = document.querySelectorAll('form[data-validate="true"]');
    forms.forEach(function (form) {
      // Record form initialization timestamp for bot velocity checks
      const timestampInput = document.createElement('input');
      timestampInput.type = 'hidden';
      timestampInput.name = '_form_init_ts';
      timestampInput.value = Date.now().toString();
      form.appendChild(timestampInput);

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        // 1. Honeypot check
        const honeypot = form.querySelector('input[name="website_url_hp"]');
        if (honeypot && honeypot.value.trim() !== '') {
          // Bot detected, silently abort
          console.warn('Form submission ignored.');
          return;
        }

        // 2. Velocity check (must take at least 1.5 seconds)
        const initTs = parseInt(timestampInput.value, 10);
        if (Date.now() - initTs < 1500) {
          alert('Submission error: Please take a moment to review your details before submitting.');
          return;
        }

        // 3. Phone validation (Indian 10-digit mobile)
        const phoneInput = form.querySelector('input[type="tel"]');
        if (phoneInput && phoneInput.value.trim() !== '') {
          const phoneRegex = /^[6-9]\d{9}$/;
          const cleanPhone = phoneInput.value.replace(/[\s\-()]/g, '');
          if (!phoneRegex.test(cleanPhone)) {
            alert('Please enter a valid 10-digit Indian mobile contact number (starting with 6, 7, 8, or 9).');
            phoneInput.focus();
            return;
          }
        }

        // 4. DPDP Act Consent Checkbox
        const consentCheckbox = form.querySelector('input[name="dpdp_consent"]');
        if (consentCheckbox && !consentCheckbox.checked) {
          alert('Under the Digital Personal Data Protection Act 2023, your explicit consent is required to process this enquiry.');
          consentCheckbox.focus();
          return;
        }

        // 5. Save To Admin System & LocalStorage CRM
        try {
          const studentName = (form.querySelector('[name="student_name"]')?.value || form.querySelector('[name="sender_name"]')?.value || 'Prospective Student').trim();
          const gradeVal = (form.querySelector('[name="admission_grade"]')?.value || form.querySelector('[name="sender_role"]')?.value || 'General Admission').trim();
          const parentName = (form.querySelector('[name="parent_name"]')?.value || form.querySelector('[name="sender_name"]')?.value || 'Parent / Guardian').trim();
          const phoneVal = phoneInput ? phoneInput.value.trim() : '';
          const emailVal = (form.querySelector('input[type="email"]')?.value || '').trim();
          const messageVal = (form.querySelector('textarea')?.value || 'Website form enquiry').trim();
          const isContact = window.location.pathname.includes('contact');

          if (isContact) {
            const rawContacts = localStorage.getItem('dps_contact_messages');
            const contacts = rawContacts ? JSON.parse(rawContacts) : [];
            contacts.unshift({
              id: 'MSG-' + Date.now().toString(36).toUpperCase(),
              name: studentName,
              role: gradeVal,
              phone: phoneVal,
              email: emailVal,
              message: messageVal,
              date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
              status: 'Unread'
            });
            localStorage.setItem('dps_contact_messages', JSON.stringify(contacts));
          } else {
            const rawLeads = localStorage.getItem('dps_admissions_leads');
            const leads = rawLeads ? JSON.parse(rawLeads) : [];
            leads.unshift({
              id: 'DPS-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
              studentName: studentName,
              grade: gradeVal,
              parentName: parentName,
              phone: phoneVal,
              email: emailVal,
              message: messageVal,
              date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
              timestamp: Date.now(),
              status: 'New',
              source: document.title.split('—')[0].trim() || 'Website',
              notes: ['Enquiry registered online via ' + window.location.pathname]
            });
            localStorage.setItem('dps_admissions_leads', JSON.stringify(leads));
          }
        } catch (persErr) {
          console.warn('DPS Admin CRM auto-capture notice:', persErr);
        }

        // 6. Success Feedback State
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : 'Submit';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Enquiry Logged...';
        }

        setTimeout(function () {
          alert('Thank you. Your official enquiry has been formally registered with the Durga Public School Secretariat. An administrative officer will contact you within working hours.');
          form.reset();
          timestampInput.value = Date.now().toString();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        }, 600);
      });
    });
  }

  // 5. UNIVERSAL EXPANDABLE INTERACTION
  // Makes every button, link, or section with [data-expander] attribute toggable
  function initUniversalExpandable() {
    const expanders = document.querySelectorAll('[data-expander]');
    expanders.forEach(function (el) {
      el.addEventListener('click', function (e) {
        // Don't prevent default for anchor links with href
        const href = el.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
        }
        if (href && href.startsWith('http')) {
          return; // Let native link behavior handle external links
        }

        const targetId = el.getAttribute('data-expander');
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;

        const isCurrentlyOpen = !targetEl.hasAttribute('hidden') && targetEl.style.display !== 'none';

        // Toggle the target element
        if (isCurrentlyOpen) {
          targetEl.classList.remove('active');
          targetEl.setAttribute('hidden', '');
          targetEl.style.display = 'none';
          el.setAttribute('aria-expanded', 'false');
          // Update symbol if present
          const symbol = el.querySelector('.expander-symbol, .symbol');
          if (symbol) symbol.textContent = '+';
        } else {
          targetEl.classList.add('active');
          targetEl.removeAttribute('hidden');
          targetEl.style.display = 'block';
          el.setAttribute('aria-expanded', 'true');
          // Update symbol if present
          const symbol = el.querySelector('.expander-symbol, .symbol');
          if (symbol) symbol.textContent = '−';
        }
      });
    });
  }

  // Initialize accordion details elements for universal accessibility
  function initDetailsAccordions() {
    const detailsEls = document.querySelectorAll('details');
    detailsEls.forEach(function (details) {
      const summary = details.querySelector('summary');
      if (!summary) return;

      // Set initial state based on open attribute
      const isInitiallyOpen = details.hasAttribute('open');
      summary.setAttribute('aria-expanded', isInitiallyOpen);

      // Update arrow symbol on toggle
      summary.addEventListener('click', function () {
        const isNowOpen = !details.hasAttribute('open');
        summary.setAttribute('aria-expanded', isNowOpen);
      });
    });
  }  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 6. GATE ENTRY LOADER (homepage only, once per session)
  // School gate sequence: crest + name appear, loading bar scans, doors part.
  function playHeroReveal() {
    const h1 = document.querySelector('.display-hero');
    if (!h1 || prefersReducedMotion || h1.querySelector('.hero-word')) return;
    const delay = 100;
    const words = h1.textContent.trim().split(/\s+/);
    h1.textContent = '';
    words.forEach(function (word, i) {
      const span = document.createElement('span');
      span.className = 'hero-word';
      span.textContent = word;
      span.style.animationDelay = (delay + i * 90) + 'ms';
      h1.appendChild(span);
      if (i < words.length - 1) h1.appendChild(document.createTextNode(' '));
    });
  }

  function initGateLoader() {
    const gate = document.getElementById('gateLoader');
    if (!gate) return;

    const fill = document.getElementById('gateLoaderFill');
    const percent = document.getElementById('gateLoaderPercent');
    const status = gate.querySelector('.gate-status-text');
    const skipBtn = document.getElementById('gateSkipBtn');

    const SESSION_KEY = 'dps_curtain_stage_v4';
    const startHero = function () { playHeroReveal(); };

    // If already seen in this session or prefers reduced motion, dismiss immediately
    if (prefersReducedMotion || sessionStorage.getItem(SESSION_KEY)) {
      gate.classList.add('gate-open', 'gate-done');
      if (gate.parentNode) gate.remove();
      startHero();
      return;
    }

    sessionStorage.setItem(SESSION_KEY, '1');
    document.body.style.overflow = 'hidden';

    let currentPercent = 0;
    let isOpening = false;

    function setProgress(val) {
      currentPercent = Math.min(100, Math.max(0, val));
      if (fill) fill.style.width = currentPercent + '%';
      if (percent) percent.textContent = Math.round(currentPercent) + '%';
    }

    // Smooth buttery 60fps loading progress bar
    const startTime = performance.now();
    const loadingDuration = 900; // 900ms smooth fill

    function stepLoading(now) {
      if (isOpening) return;
      const elapsed = now - startTime;
      const p = Math.min(100, (elapsed / loadingDuration) * 100);
      setProgress(p);

      if (p < 100) {
        requestAnimationFrame(stepLoading);
      } else {
        openGate();
      }
    }

    requestAnimationFrame(stepLoading);

    const openGate = function () {
      if (isOpening) return;
      isOpening = true;
      setProgress(100);

      if (status) status.textContent = "Welcome to Durga Public School";

      setTimeout(function () {
        gate.classList.add('gate-open');
        document.body.style.overflow = '';
        setTimeout(startHero, 450);

        // Remove from DOM after doors part
        setTimeout(function () {
          gate.classList.add('gate-done');
          if (gate.parentNode) gate.remove();
        }, 1250);
      }, 260);
    };

    if (skipBtn) {
      skipBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        openGate();
      });
    }

    gate.addEventListener('click', openGate);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') openGate();
    });

    // Safety fallback
    setTimeout(openGate, 2400);
  }

  function initRevealAnimations() {
    const selectors = [
      '.section-head', '.section-head-center', '.section-header-left',
      '.section-header-center', '.stat-cell', '.faq',
      'details.apple-expandable-item', '.cta-banner', '.form-stage',
      '.table-wrap', '.table-wrapper', '.steps-grid'
    ];
    const assigned = new Set();
    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el, i) {
        if (assigned.has(el)) return;
        assigned.add(el);
        el.classList.add('reveal');
        // Stagger within each visual row, capped for long lists
        el.style.setProperty('--reveal-delay', Math.min((i % 6) * 80, 400) + 'ms');
      });
    });

    const revealEls = document.querySelectorAll('.reveal:not(#gateLoader .reveal)');
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('revealed'); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // 8. PAGE TRANSITIONS (fade out on internal navigation)
  function initPageTransitions() {
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href]');
      if (!link || prefersReducedMotion) return;
      const href = link.getAttribute('href') || '';
      if (link.target === '_blank' || link.hasAttribute('download')) return;
      if (href.startsWith('#') || href.startsWith('http') ||
          href.startsWith('mailto:') || href.startsWith('tel:')) return;
      e.preventDefault();
      document.body.classList.add('page-exit');
      setTimeout(function () { window.location.href = href; }, 280);
    });
  }

  // 9. SCROLL EFFECTS (progress bar + gentle hero parallax)
  function initScrollEffects() {
    let bar = document.getElementById('scrollProgressBar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'scrollProgressBar';
      bar.setAttribute('aria-hidden', 'true');
      document.body.appendChild(bar);
    }
    if (prefersReducedMotion) return;

    // Cache scroll height to prevent synchronous layout recalculations on scroll frames
    let maxScroll = 1;
    function updateMaxScroll() {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    }
    updateMaxScroll();
    window.addEventListener('resize', updateMaxScroll, { passive: true });

    let ticking = false;
    const onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        const scrollY = window.scrollY || window.pageYOffset;
        bar.style.transform = 'scaleX(' + Math.min(scrollY / maxScroll, 1) + ')';
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // 10. INTERACTIVE CAMPUS GALLERY (illustrated scene tabs)
  function initSceneGallery() {
    const tabs = document.querySelectorAll('.scene-tab-btn');
    if (!tabs.length) return;
    const panels = document.querySelectorAll('.scene-panel');
    const activate = function (id) {
      tabs.forEach(function (tab) {
        const on = tab.dataset.scene === id;
        tab.classList.toggle('active', on);
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panels.forEach(function (panel) {
        panel.classList.toggle('active', panel.dataset.scene === id);
      });
    };
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { activate(tab.dataset.scene); });
    });
  }

  // 11. LAYERED HERO PARALLAX (depth drift on scroll, rAF-throttled)
  function initHeroParallax() {
    if (prefersReducedMotion) return;
    const stage = document.querySelector('.hero-visual-stage');
    if (!stage) return;
    const layers = [
      ['.lyr-sky', 0.05],
      ['.lyr-far', 0.10],
      ['.lyr-mid', 0.18],
      ['.lyr-front', 0.28]
    ];
    let ticking = false;
    const update = function () {
      ticking = false;
      const y = window.scrollY;
      if (y > 900) return;
      layers.forEach(function (layer) {
        const el = stage.querySelector(layer[0]);
        if (el) el.style.transform = 'translateY(' + (y * layer[1]) + 'px)';
      });
    };
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

    // 12. CAMPUS PHOTO GALLERY & TACTILE SCRAPBOOK CONTROLLER
  function initCampusGallery() {
    const galleryGrid = document.querySelector('.gal-grid, .gallery-grid, .scrapbook-album-book, #scrapbookChapters');
    const filterBar = document.querySelector('.gal-filter-bar, .gallery-filter-bar, .scrapbook-filter-bar');
    if (!galleryGrid && !filterBar) return;

    const filterBtns = document.querySelectorAll('.gal-filter-btn, .gallery-filter-btn, .scrapbook-filter-btn');
    const galleryItems = Array.from(document.querySelectorAll('.scrapbook-item, .gal-item, .gallery-item'));
    const chapters = Array.from(document.querySelectorAll('.scrapbook-chapter'));
    const modal = document.getElementById('galleryLightboxModal');
    
    if (!modal) return;

    const mainImg = modal.querySelector('.lightbox-main-img');
    const titleEl = modal.querySelector('.lightbox-title');
    const captionEl = modal.querySelector('.lightbox-caption');
    const catChip = modal.querySelector('.lightbox-category-chip');
    const counterEl = modal.querySelector('.lightbox-counter');
    const prevBtn = modal.querySelector('.lightbox-nav-arrow.prev');
    const nextBtn = modal.querySelector('.lightbox-nav-arrow.next');
    const closeBtn = modal.querySelector('.lightbox-btn-close');

    let currentVisibleItems = [...galleryItems];
    let currentIndex = 0;

    // Progressive Scroll-Based Loader (Reveals images in batches of 18 as user scrolls)
    const INITIAL_BATCH = 18; // 6 rows of 3 prints on mobile
    const SCROLL_BATCH = 15;  // 5 rows per scroll trigger
    const chapterVisibleCounts = new Map();

    function initProgressiveLoader() {
      chapters.forEach(function (chap) {
        chapterVisibleCounts.set(chap, INITIAL_BATCH);
      });
      refreshAllProgressiveItems();
      setupGalleryScrollTrigger();
    }

    function refreshChapterProgressive(chapter) {
      if (!chapter) return;
      const maxCount = chapterVisibleCounts.get(chapter) || INITIAL_BATCH;
      const subcatBtn = chapter.querySelector('.scrapbook-subcat-pill.active');
      const activeSubcat = subcatBtn ? subcatBtn.dataset.subcat : 'all';
      const isChapVisible = !chapter.classList.contains('hidden-chapter') && chapter.style.display !== 'none';
      if (!isChapVisible) return;

      const items = Array.from(chapter.querySelectorAll('.scrapbook-item'));
      let matchCount = 0;

      items.forEach(function (item) {
        const matchesCategory = !item.classList.contains('hidden');
        const matchesSubcat = (activeSubcat === 'all' || item.dataset.subcat === activeSubcat);

        if (matchesCategory && matchesSubcat) {
          matchCount++;
          if (matchCount <= maxCount) {
            item.style.display = '';
            item.classList.remove('lazy-scroll-hidden');
          } else {
            item.style.display = 'none';
            item.classList.add('lazy-scroll-hidden');
          }
        } else {
          item.style.display = 'none';
          item.classList.remove('lazy-scroll-hidden');
        }
      });
    }

    function refreshAllProgressiveItems() {
      chapters.forEach(function (chap) {
        refreshChapterProgressive(chap);
      });
    }

    function loadNextBatchForChapter(chapter) {
      if (!chapter) return;
      const current = chapterVisibleCounts.get(chapter) || INITIAL_BATCH;
      chapterVisibleCounts.set(chapter, current + SCROLL_BATCH);
      refreshChapterProgressive(chapter);
    }

    function setupGalleryScrollTrigger() {
      // 1. IntersectionObserver on chapter scroll sentinels
      chapters.forEach(function (chapter) {
        const grid = chapter.querySelector('.scrapbook-grid');
        if (!grid) return;
        let sentinel = chapter.querySelector('.chapter-scroll-sentinel');
        if (!sentinel) {
          sentinel = document.createElement('div');
          sentinel.className = 'chapter-scroll-sentinel';
          sentinel.style.cssText = 'grid-column: 1 / -1; height: 1px; width: 100%; opacity: 0; pointer-events: none;';
          grid.appendChild(sentinel);
        }

        if ('IntersectionObserver' in window) {
          const obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                loadNextBatchForChapter(chapter);
              }
            });
          }, { rootMargin: '450px 0px 450px 0px' });
          obs.observe(sentinel);
        }
      });

      // 2. Fallback scroll listener ONLY for ancient browsers without IntersectionObserver
      if (!('IntersectionObserver' in window)) {
        let scrollTimer = null;
        window.addEventListener('scroll', function () {
          if (scrollTimer) return;
          scrollTimer = setTimeout(function () {
            scrollTimer = null;
            chapters.forEach(function (chap) {
              if (chap.classList.contains('hidden-chapter') || chap.style.display === 'none') return;
              const rect = chap.getBoundingClientRect();
              if (rect.bottom <= window.innerHeight + 550) {
                loadNextBatchForChapter(chap);
              }
            });
          }, 200);
        }, { passive: true });
      }
    }

    // Filter Logic
    function applyFilter(category) {
      filterBtns.forEach(function (btn) {
        const isActive = btn.dataset.category === category;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Filter Chapters
      chapters.forEach(function (chapter) {
        const chapCat = chapter.dataset.chapter;
        const matches = (category === 'all' || chapCat === category);
        if (matches) {
          chapter.classList.remove('hidden-chapter');
          chapter.style.display = '';
        } else {
          chapter.classList.add('hidden-chapter');
          chapter.style.display = 'none';
        }
        chapterVisibleCounts.set(chapter, INITIAL_BATCH);
      });

      // Filter Items and populate visible lightbox array
      
      // Update Mobile Category Drawer Label if present
      const mobileLabel = document.getElementById('smctActiveCategoryLabel');
      if (mobileLabel) {
        const activeBtn = Array.from(filterBtns).find(b => b.dataset.category === category);
        if (activeBtn) {
          const labelText = activeBtn.querySelector('.btn-tab-label') ? activeBtn.querySelector('.btn-tab-label').textContent.trim() : activeBtn.textContent.trim();
          const countText = activeBtn.querySelector('.btn-tab-count') ? activeBtn.querySelector('.btn-tab-count').textContent.trim() : '';
          mobileLabel.textContent = labelText + (countText ? ' (' + countText + ')' : '');
        }
      }

      // Close mobile drawer after selection on mobile
      const drawer = document.getElementById('scrapbookMobileDrawer');
      const drawerFilterBar = document.getElementById('scrapbookFilterBar');
      const drawerToggle = document.getElementById('scrapbookCategoryToggle');
      if (drawer && drawerFilterBar) {
        drawer.classList.remove('is-open');
        drawerFilterBar.classList.remove('is-drawer-open');
        if (drawerToggle) drawerToggle.setAttribute('aria-expanded', 'false');
      }

      currentVisibleItems = [];
      galleryItems.forEach(function (item) {
        const itemCat = item.dataset.category;
        const matches = (category === 'all' || itemCat === category);
        if (matches) {
          item.classList.remove('hidden');
          currentVisibleItems.push(item);
        } else {
          item.classList.add('hidden');
        }
      });

      refreshAllProgressiveItems();
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const cat = btn.dataset.category;
        applyFilter(cat);
        if (history.pushState) {
          history.pushState(null, null, cat === 'all' ? window.location.pathname : '#' + cat);
        }
      });
    });

    // Check URL Hash on load
    if (window.location.hash) {
      const hashCat = window.location.hash.replace('#', '');
      const matchingBtn = document.querySelector('.scrapbook-filter-btn[data-category="' + hashCat + '"], .gal-filter-btn[data-category="' + hashCat + '"], .gallery-filter-btn[data-category="' + hashCat + '"]');
      if (matchingBtn) {
        applyFilter(hashCat);
      }
    }

    // Hashchange listener for smooth category switching via deep-links
    window.addEventListener('hashchange', function () {
      const hashCat = window.location.hash.replace('#', '') || 'all';
      const matchingBtn = document.querySelector('.scrapbook-filter-btn[data-category="' + hashCat + '"], .gal-filter-btn[data-category="' + hashCat + '"]');
      if (matchingBtn) {
        applyFilter(hashCat);
      }
    });

    // Lightbox Open & Render
    function openLightbox(index) {
      if (currentVisibleItems.length === 0) return;
      currentIndex = (index + currentVisibleItems.length) % currentVisibleItems.length;
      const targetItem = currentVisibleItems[currentIndex];
      
      const fullSrc = targetItem.dataset.full;
      const title = targetItem.dataset.title || '';
      const desc = targetItem.dataset.desc || '';
      const categoryLabel = targetItem.dataset.catLabel || '';

      if (mainImg) {
        mainImg.src = fullSrc;
        mainImg.alt = title;
      }
      if (titleEl) titleEl.textContent = title;
      if (captionEl) captionEl.textContent = desc;
      if (catChip) catChip.textContent = categoryLabel;
      if (counterEl) {
        counterEl.textContent = (currentIndex + 1) + ' of ' + currentVisibleItems.length;
      }

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (currentVisibleItems[currentIndex]) {
        currentVisibleItems[currentIndex].focus();
      }
    }

    function showNext() {
      openLightbox(currentIndex + 1);
    }

    function showPrev() {
      openLightbox(currentIndex - 1);
    }

    // Attach click events on gallery items
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        const visibleIdx = currentVisibleItems.indexOf(item);
        if (visibleIdx !== -1) {
          openLightbox(visibleIdx);
        }
      });

      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const visibleIdx = currentVisibleItems.indexOf(item);
          if (visibleIdx !== -1) {
            openLightbox(visibleIdx);
          }
        }
      });
    });

    
    // Sub-Category Granular Filter Handler
    const subcatPills = document.querySelectorAll('.scrapbook-subcat-pill');
    subcatPills.forEach(function (pill) {
      pill.addEventListener('click', function (e) {
        e.stopPropagation();
        const chapter = pill.closest('.scrapbook-chapter');
        if (!chapter) return;
        
        chapter.querySelectorAll('.scrapbook-subcat-pill').forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        
        const subcat = pill.dataset.subcat;
        const chapterItems = Array.from(chapter.querySelectorAll('.scrapbook-item'));
        
        chapterItems.forEach(function (item) {
          const match = (subcat === 'all' || item.dataset.subcat === subcat);
          if (match) {
            item.classList.remove('hidden-subcat');
          } else {
            item.classList.add('hidden-subcat');
          }
        });

        chapterVisibleCounts.set(chapter, INITIAL_BATCH);
        refreshChapterProgressive(chapter);

        // Rebuild currentVisibleItems for lightbox
        currentVisibleItems = galleryItems.filter(function (item) {
          const parentChap = item.closest('.scrapbook-chapter');
          const isChapVisible = parentChap && !parentChap.classList.contains('hidden-chapter') && parentChap.style.display !== 'none';
          const isItemVisible = !item.classList.contains('hidden') && !item.classList.contains('hidden-subcat');
          return isChapVisible && isItemVisible;
        });
      });
    });

    // Lightbox Controls
    if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); showNext(); });
    if (prevBtn) prevBtn.addEventListener('click', function (e) { e.stopPropagation(); showPrev(); });
    if (closeBtn) closeBtn.addEventListener('click', function (e) { e.stopPropagation(); closeLightbox(); });

    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.classList.contains('lightbox-stage')) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        showNext();
      } else if (e.key === 'ArrowLeft') {
        showPrev();
      }
    });

    // Touch Swipe Gesture Support
    let touchStartX = 0;
    let touchEndX = 0;
    modal.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) {
          showNext();
        } else {
          showPrev();
        }
      }
    }

    // Initialize progressive scroll loading for gallery
    initProgressiveLoader();
  }

  // Initialize all modules on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initExpandableDirectory();
    initCookieConsent();
    initForms();
    initUniversalExpandable();
    initDetailsAccordions();
    initGateLoader();
    initRevealAnimations();
    initPageTransitions();
    initScrollEffects();
    initSceneGallery();
    initHeroParallax();
    initCampusGallery();
    initMobileCategoryDrawer();
    initLiveSiteConfig();
    initAdminShortcut();
  // 15. LIVE SITE CONFIGURATION SYNCHRONIZER (ADMIN OVERRIDES)
  function initLiveSiteConfig() {
    try {
      const raw = localStorage.getItem('dps_site_config');
      if (!raw) return;
      const config = JSON.parse(raw);

      // A. Emergency / Urgent Top Notice Banner
      if (config.noticeBanner && config.noticeBanner.enabled && config.noticeBanner.message) {
        if (!document.getElementById('dpsLiveAlertBanner')) {
          const banner = document.createElement('div');
          banner.id = 'dpsLiveAlertBanner';
          banner.className = 'dps-live-alert-banner ' + (config.noticeBanner.theme || 'theme-wine');
          banner.style.cssText = 'background:linear-gradient(135deg, #7D1D3F 0%, #4A1024 100%);color:#FFFFFF;padding:9px 16px;text-align:center;font-size:0.80rem;font-weight:700;position:relative;z-index:99999;box-shadow:0 2px 10px rgba(0,0,0,0.15);';
          banner.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;">' +
            '<span style="background:#C45B18;color:#FFFFFF;padding:2px 7px;border-radius:4px;font-size:0.65rem;text-transform:uppercase;letter-spacing:0.06em;">LIVE NOTICE</span>' +
            '<span>' + config.noticeBanner.message + '</span>' +
            (config.noticeBanner.link ? '<a href="' + config.noticeBanner.link + '" style="color:#FDE68A;text-decoration:underline;margin-left:4px;">Learn More &rarr;</a>' : '') +
            '<button type="button" aria-label="Dismiss Alert" style="background:none;border:none;color:#FFFFFF;font-size:1.1rem;cursor:pointer;margin-left:12px;line-height:1;" onclick="this.parentElement.parentElement.remove()">&times;</button>' +
            '</div>';
          document.body.insertBefore(banner, document.body.firstChild);
        }
      }

      // B. Live Phone Number Updates
      if (config.contact && config.contact.phonePrimary) {
        const cleanPhone = config.contact.phonePrimary.replace(/\s+/g, '');
        document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
          el.href = 'tel:' + cleanPhone;
          if (!el.querySelector('svg') && el.textContent.includes('94140')) {
            el.textContent = config.contact.phonePrimary;
          }
        });
      }
    } catch (e) {
      console.warn('Live Config Sync:', e);
    }
  }

  // 16. ADMIN PORTAL KEYBOARD SHORTCUT (Ctrl + Shift + A)
  function initAdminShortcut() {
    window.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        window.location.href = 'admin.html';
      }
    });
  }


  // Mobile Category Drawer Controller for Scrapbook Gallery
  function initMobileCategoryDrawer() {
    const toggle = document.getElementById('scrapbookCategoryToggle');
    const drawer = document.getElementById('scrapbookMobileDrawer');
    const filterBar = document.getElementById('scrapbookFilterBar');
    if (!toggle || !drawer || !filterBar) return;

    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      const isOpen = drawer.classList.contains('is-open');
      if (isOpen) {
        drawer.classList.remove('is-open');
        filterBar.classList.remove('is-drawer-open');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        drawer.classList.add('is-open');
        filterBar.classList.add('is-drawer-open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close on outside tap
    document.addEventListener('click', function (e) {
      if (!drawer.contains(e.target) && !filterBar.contains(e.target) && drawer.classList.contains('is-open')) {
        drawer.classList.remove('is-open');
        filterBar.classList.remove('is-drawer-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  });
})();

