/**
 * ============================================================================
 * SHEKHAWATI UNIVERSITY STYLE INFORMATION & MEDIA HUB (shekhauni.ac.in model)
 * ============================================================================
 * - General Notifications (Live Editable via Office Hand / localStorage)
 * - School Media News & Press Releases
 * - News Cutting Corner (23 Interactive Newspaper Clippings with Lightbox)
 * - Social Feeds & Upcoming Campus Events
 * ============================================================================
 */

(function () {
  'use strict';

  // 1. Preloaded Official Notices (Fallback when localStorage is empty)
  const DEFAULT_NOTICES = [
    {
      id: 'CIRC-2026-01',
      date: '02 Nov 2026',
      badge: 'URGENT',
      category: 'Admissions',
      title: 'Admissions Open for Session 2026–27: Nursery to Class XII (Science, Commerce & Arts)',
      desc: 'Online registration dossiers and direct interaction scheduling active at Secretariat. Early enrollment priority along all 11 GPS bus corridors.',
      link: 'admissions.html',
      isNew: true
    },
    {
      id: 'CIRC-2026-02',
      date: '28 Oct 2026',
      badge: 'RBSE',
      category: 'Academics',
      title: 'School Affiliation & Registration Credentials Updated: Board of Secondary Education, Ajmer (BSER)',
      desc: 'Aff. No. RJJJN21136 Dt. 25-08-2017 & Reg. No. 33 / JJN / 2006 - 07 under Smt. Durga Devi Shikshan Sansthan, Pilani.',
      link: 'about.html#rbse',
      isNew: true
    },
    {
      id: 'CIRC-2026-03',
      date: '24 Oct 2026',
      badge: 'TRANSPORT',
      category: 'Fleet Logistics',
      title: 'Comprehensive 11-Route GPS Bus Network Timetable & Stoppages Announced',
      desc: 'Serving Pilani town, Narhar, Dulania, Chandgothi, Surajgarh border, and rural corridors. Speed capped at 40 km/h with female attendants.',
      link: 'facilities.html#transport',
      isNew: false
    },
    {
      id: 'CIRC-2026-04',
      date: '18 Oct 2026',
      badge: 'STATUTORY',
      category: 'Secretariat',
      title: 'Notice regarding Inspection of Certified Institutional Documentation',
      desc: 'Available at Administrative Secretariat, Durga Public School on working days (Summer: 08:00 AM to 02:00 PM | Winter: 09:00 AM to 03:00 PM).',
      link: 'contact.html#location',
      isNew: false
    },
    {
      id: 'CIRC-2026-05',
      date: '12 Oct 2026',
      badge: 'SPORTS',
      category: 'Athletics',
      title: 'Inter-House Sports Meet & Taekwondo Belt Demonstration Honors',
      desc: 'Gandhi, Vivekanand, Raman, and Bose house athletes completed 4x100m relays, sprint heats, and martial arts katas on campus grounds.',
      link: 'life.html#sports',
      isNew: false
    },
    {
      id: 'CIRC-2026-06',
      date: '05 Oct 2026',
      badge: 'HONORS',
      category: 'Examinations',
      title: 'Merit Achievers Felicitated with Traditional Safa & Institutional Mementos',
      desc: 'State board distinction toppers honored by Director Shri Surender Singh and Senior Faculty in campus courtyard assembly.',
      link: 'gallery.html',
      isNew: false
    }
  ];

  // 2. Preloaded News Cuttings
  let newsCuttings = [];

  function initShekhauniHub() {
    const hub = document.getElementById('shekhauni-hub');
    if (!hub) return;

    // A. Tab Switching
    const tabBtns = hub.querySelectorAll('.s-tab-btn');
    const tabPanes = hub.querySelectorAll('.s-tab-pane');

    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const targetTab = btn.getAttribute('data-tab');

        tabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        tabPanes.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('hidden', 'true');
        });

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const activePane = hub.querySelector('#sTabPane' + capitalize(targetTab));
        if (activePane) {
          activePane.classList.add('active');
          activePane.removeAttribute('hidden');
        }
      });
    });

    // B. Render General Notifications (from localStorage or default)
    renderNotifications();

    // C. Load and Render News Cuttings
    loadNewsCuttings();

    // D. Wire News Cutting Lightbox
    initCuttingLightbox();
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Render Notifications Feed
  function renderNotifications() {
    const container = document.getElementById('sNoticesListContainer');
    if (!container) return;

    let notices = DEFAULT_NOTICES;
    try {
      const stored = localStorage.getItem('dps_circulars') || localStorage.getItem('dps_official_circulars') || localStorage.getItem('dps_school_news');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          notices = parsed;
        }
      }
    } catch (e) {
      console.warn('[NewsHub] Error parsing stored notices:', e);
    }

        container.innerHTML = notices.map(function (n) {
      const isUrgent = n.badge === 'URGENT' || n.category === 'Urgent';
      const badgeCls = isUrgent ? 's-badge-urgent' : 's-badge-regular';
      const newTag = (n.isNew || n.status === 'Active') ? '<span class="s-blinking-new">NEW</span>' : '';
      const linkUrl = n.fileUrl || n.link || 'admissions.html';
      const dateParts = (n.date || '01 Nov 2026').split(' ');
      const day = dateParts[0] || '01';
      const mon = (dateParts[1] || 'Nov') + ' ' + (dateParts[2] || '');

      return `
        <article class="s-notice-row">
          <div class="s-notice-date-box">
            <span class="s-notice-day">${day}</span>
            <span class="s-notice-mon">${mon}</span>
          </div>
          <div class="s-notice-main">
            <div class="s-notice-meta-bar">
              <span class="s-notice-category">${escapeHtml(n.category || 'General')}</span>
              <span class="s-notice-badge ${badgeCls}">${escapeHtml(n.badge || n.category || 'NOTICE')}</span>
              ${newTag}
            </div>
            <h4 class="s-notice-title">
              <a href="${escapeHtml(linkUrl)}">${escapeHtml(n.title)}</a>
            </h4>
            <p class="s-notice-desc">${escapeHtml(n.desc || n.title)}</p>
          </div>
          <div class="s-notice-action">
            <a href="${escapeHtml(linkUrl)}" class="s-notice-link-btn" aria-label="View notice: ${escapeHtml(n.title)}">
              <span>View Notice</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </article>
      `;
    }).join('');
  }

  // Load News Cuttings from JSON metadata
  function loadNewsCuttings() {
    const grid = document.getElementById('sCuttingsGrid');
    if (!grid) return;

    fetch('assets/photos/news-cuttings/news-cuttings-metadata.json')
      .then(r => r.json())
      .then(data => {
        newsCuttings = data;
        renderCuttings(data, 'all');
        setupCuttingFilters(data);
      })
      .catch(err => {
        console.warn('[NewsHub] Could not fetch news cuttings manifest:', err);
      });
  }

  function renderCuttings(items, filter) {
    const grid = document.getElementById('sCuttingsGrid');
    if (!grid) return;

    const filtered = filter === 'all' 
      ? items 
      : items.filter(it => it.newspaper.toLowerCase().includes(filter.toLowerCase()));

    grid.innerHTML = filtered.map(function (it, idx) {
      const pubBadge = it.newspaper.toLowerCase().includes('patrika') 
        ? '<span class="s-paper-badge patrika">Rajasthan Patrika</span>'
        : (it.newspaper.toLowerCase().includes('bhaskar') 
          ? '<span class="s-paper-badge bhaskar">Dainik Bhaskar</span>' 
          : '<span class="s-paper-badge other">Regional Media</span>');

      return `
        <div class="s-cutting-card" role="button" tabindex="0" data-cutting-id="${it.id}" aria-label="Open newspaper clipping: ${escapeHtml(it.title)}">
          <div class="s-cutting-media">
            <picture>
              <source srcset="${it.thumbWebp}" type="image/webp">
              <img decoding="async" src="${it.thumbImage}" alt="${escapeHtml(it.title)} - ${escapeHtml(it.newspaper)}" loading="lazy">
            </picture>
            <div class="s-cutting-overlay">
              <span class="s-zoom-icon">&#128269; View Clipping</span>
            </div>
          </div>
          <div class="s-cutting-info">
            <div class="s-cutting-meta">
              ${pubBadge}
              <span class="s-cutting-date">${escapeHtml(it.date)}</span>
            </div>
            <h4 class="s-cutting-title">${escapeHtml(it.title)}</h4>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to cards
    grid.querySelectorAll('.s-cutting-card').forEach(function (card) {
      const id = card.getAttribute('data-cutting-id');
      card.addEventListener('click', function () {
        openCuttingModal(id);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCuttingModal(id);
        }
      });
    });
  }

  function setupCuttingFilters(allData) {
    const filterBtns = document.querySelectorAll('.s-cutting-filter-btn');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter') || 'all';
        renderCuttings(allData, filter);
      });
    });
  }

  // Lightbox Modal for Full News Clippings
  let activeModalIdx = 0;

  function initCuttingLightbox() {
    let modal = document.getElementById('sCuttingModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'sCuttingModal';
      modal.className = 's-cutting-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', 'Newspaper Clipping Full View');
      modal.innerHTML = `
        <div class="s-modal-backdrop"></div>
        <div class="s-modal-box">
          <div class="s-modal-header">
            <div class="s-modal-titles">
              <span id="sModalPaper" class="s-paper-badge patrika">Publication</span>
              <h3 id="sModalTitle" class="s-modal-heading">Headline</h3>
            </div>
            <button type="button" class="s-modal-close-btn" id="sModalClose" aria-label="Close clipping modal">&times;</button>
          </div>
          <div class="s-modal-body">
            <img id="sModalImg" src="" alt="Clipping" class="s-modal-clipping-img">
          </div>
          <div class="s-modal-footer">
            <button type="button" class="s-modal-nav-btn prev" id="sModalPrev">&lsaquo; Previous Clipping</button>
            <span id="sModalCounter" class="s-modal-counter">1 of 23</span>
            <button type="button" class="s-modal-nav-btn next" id="sModalNext">Next Clipping &rsaquo;</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('.s-modal-backdrop').addEventListener('click', closeCuttingModal);
      modal.querySelector('#sModalClose').addEventListener('click', closeCuttingModal);

      modal.querySelector('#sModalPrev').addEventListener('click', function () {
        if (newsCuttings.length === 0) return;
        activeModalIdx = (activeModalIdx - 1 + newsCuttings.length) % newsCuttings.length;
        displayModalItem(activeModalIdx);
      });

      modal.querySelector('#sModalNext').addEventListener('click', function () {
        if (newsCuttings.length === 0) return;
        activeModalIdx = (activeModalIdx + 1) % newsCuttings.length;
        displayModalItem(activeModalIdx);
      });

      window.addEventListener('keydown', function (e) {
        if (!modal.classList.contains('is-open')) return;
        if (e.key === 'Escape') closeCuttingModal();
        if (e.key === 'ArrowLeft') modal.querySelector('#sModalPrev').click();
        if (e.key === 'ArrowRight') modal.querySelector('#sModalNext').click();
      });
    }
  }

  function openCuttingModal(id) {
    const modal = document.getElementById('sCuttingModal');
    if (!modal || newsCuttings.length === 0) return;

    const idx = newsCuttings.findIndex(it => it.id === id);
    activeModalIdx = idx >= 0 ? idx : 0;
    displayModalItem(activeModalIdx);

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function displayModalItem(idx) {
    const modal = document.getElementById('sCuttingModal');
    if (!modal || !newsCuttings[idx]) return;

    const item = newsCuttings[idx];
    const imgEl = modal.querySelector('#sModalImg');
    const titleEl = modal.querySelector('#sModalTitle');
    const paperEl = modal.querySelector('#sModalPaper');
    const counterEl = modal.querySelector('#sModalCounter');

    imgEl.src = item.fullImage;
    imgEl.alt = `${item.title} (${item.newspaper})`;
    titleEl.textContent = item.title;
    paperEl.textContent = `${item.newspaper} • ${item.date}`;
    counterEl.textContent = `${idx + 1} of ${newsCuttings.length}`;
  }

  function closeCuttingModal() {
    const modal = document.getElementById('sCuttingModal');
    if (modal) {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShekhauniHub);
  } else {
    initShekhauniHub();
  }

  // Expose global helper for office quick edit
  window.DPSShekhauniHub = {
    refreshNotices: renderNotifications,
    openModal: openCuttingModal
  };
})();
