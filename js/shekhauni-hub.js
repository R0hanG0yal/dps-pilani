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

      desc: 'Gandhi, Vivekanand, Patel, and Bose house athletes completed 4x100m relays, sprint heats, and martial arts katas on campus grounds.',

      link: 'life.html#sports',

      isNew: false

    },

    {

      id: 'CIRC-2026-06',

      date: '05 Oct 2026',

      badge: 'HONORS',

      category: 'Examinations',

      title: 'Merit Achievers Felicitated with Traditional Safa & Institutional Mementos',

      desc: 'State board distinction toppers honored by Director Shri Shushil Kumar Verma and Senior Faculty in campus courtyard assembly.',

      link: 'gallery.html',

      isNew: false

    }

  ];



  // 1B. Default Board Merit Toppers

  const DEFAULT_TOPPERS = [

    {

      id: 'TOP-2026-01',

      name: 'Pooja Sharma',

      exam: 'RBSE Class XII (Science Stream)',

      percentage: '98.20%',

      rank: 'District 1st Rank',

      year: '2025–26',

      image: 'assets/photos/board-merit-toppers.jpg',

      accolades: 'State Merit List Holder. Perfect 100/100 score in Physics & Mathematics. State Government Gargi Award recipient.'

    },

    {

      id: 'TOP-2026-02',

      name: 'Rahul Verma',

      exam: 'RBSE Class XII (Commerce Stream)',

      percentage: '97.60%',

      rank: 'Pilani Sub-Division Merit',

      year: '2025–26',

      image: 'assets/photos/annual-graduation-merit.jpg',

      accolades: '100/100 in Accountancy and Business Studies. District Gold Medalist for Academic Excellence.'

    },

    {

      id: 'TOP-2026-03',

      name: 'Anjali Shekhawat',

      exam: 'RBSE Class X (Secondary Board)',

      percentage: '98.60%',

      rank: 'Jhunjhunu District Top 3',

      year: '2025–26',

      image: 'assets/photos/board-achiever-parents-tribute.jpg',

      accolades: 'State Board Merit Certificate. Scored 100 in Mathematics & Science. Awarded School Academic Scholarship.'

    },

    {

      id: 'TOP-2026-04',

      name: 'Vikas Saini',

      exam: 'RBSE Class XII (Humanities / Arts)',

      percentage: '96.80%',

      rank: 'School Stream Topper',

      year: '2025–26',

      image: 'assets/photos/board-merit-toppers.jpg',

      accolades: 'State Distinction Honors in History, Political Science & Hindi Literature.'

    }

  ];



  // 2. Preloaded News Cuttings (Embedded 23 official clippings for offline & file:/// resilience)

  const DEFAULT_NEWS_CUTTINGS = [

  {

    "id": "cutting-01",

    "original": "12 001.jpg",

    "title": "Annual Board Merit & Academic Honor Roll",

    "newspaper": "Dainik Bhaskar",

    "date": "12 Dec",

    "fullImage": "assets/photos/news-cuttings/cutting-01.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-01.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-01.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-01.webp",

    "width": 1800,

    "height": 1119,

    "aspectRatio": 1.609

  },

  {

    "id": "cutting-02",

    "original": "12 dec 002.jpg",

    "title": "District Olympiad & Merit Scholarship Achievers",

    "newspaper": "Rajasthan Patrika",

    "date": "12 Dec",

    "fullImage": "assets/photos/news-cuttings/cutting-02.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-02.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-02.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-02.webp",

    "width": 1006,

    "height": 1379,

    "aspectRatio": 0.73

  },

  {

    "id": "cutting-03",

    "original": "12 dec 3.jpg",

    "title": "Excellence in Science & Mathematics Distinctions",

    "newspaper": "Dainik Bhaskar",

    "date": "12 Dec",

    "fullImage": "assets/photos/news-cuttings/cutting-03.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-03.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-03.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-03.webp",

    "width": 788,

    "height": 1650,

    "aspectRatio": 0.478

  },

  {

    "id": "cutting-04",

    "original": "Haryalo Raj. News 20-07-25 001.bmp",

    "title": "Haryalo Rajasthan Mega Tree Plantation Drive",

    "newspaper": "Rajasthan Patrika",

    "date": "20 Jul",

    "fullImage": "assets/photos/news-cuttings/cutting-04.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-04.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-04.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-04.webp",

    "width": 324,

    "height": 530,

    "aspectRatio": 0.611

  },

  {

    "id": "cutting-05",

    "original": "Image (168).jpg",

    "title": "Inter-School Cultural & Debate Championship Victory",

    "newspaper": "Dainik Navjyoti",

    "date": "State Edition",

    "fullImage": "assets/photos/news-cuttings/cutting-05.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-05.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-05.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-05.webp",

    "width": 691,

    "height": 928,

    "aspectRatio": 0.745

  },

  {

    "id": "cutting-06",

    "original": "Image (169).jpg",

    "title": "Pilani Students Shine in RBSE Secondary Merit List",

    "newspaper": "Rajasthan Patrika",

    "date": "District Special",

    "fullImage": "assets/photos/news-cuttings/cutting-06.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-06.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-06.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-06.webp",

    "width": 1475,

    "height": 1136,

    "aspectRatio": 1.298

  },

  {

    "id": "cutting-07",

    "original": "Image (170).jpg",

    "title": "Grand Annual Cultural Fest & Folk Dance Honors",

    "newspaper": "Dainik Bhaskar",

    "date": "Shekhawati Special",

    "fullImage": "assets/photos/news-cuttings/cutting-07.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-07.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-07.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-07.webp",

    "width": 1374,

    "height": 1546,

    "aspectRatio": 0.889

  },

  {

    "id": "cutting-08",

    "original": "Image (185).jpg",

    "title": "Durga Public School Achieves 100% Board Pass Result",

    "newspaper": "Rajasthan Patrika",

    "date": "Education Focus",

    "fullImage": "assets/photos/news-cuttings/cutting-08.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-08.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-08.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-08.webp",

    "width": 1357,

    "height": 1725,

    "aspectRatio": 0.787

  },

  {

    "id": "cutting-09",

    "original": "Image (186).jpg",

    "title": "District Level Taekwondo & Athletics Gold Medals",

    "newspaper": "Dainik Bhaskar",

    "date": "Sports Desk",

    "fullImage": "assets/photos/news-cuttings/cutting-09.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-09.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-09.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-09.webp",

    "width": 1202,

    "height": 1404,

    "aspectRatio": 0.856

  },

  {

    "id": "cutting-10",

    "original": "Image (647).jpg",

    "title": "National Science Day Exhibition Acclaimed by Scientists",

    "newspaper": "Rajasthan Patrika",

    "date": "Campus Beat",

    "fullImage": "assets/photos/news-cuttings/cutting-10.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-10.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-10.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-10.webp",

    "width": 662,

    "height": 634,

    "aspectRatio": 1.044

  },

  {

    "id": "cutting-11",

    "original": "Image (717).jpg",

    "title": "Moral Values & Sanskrit Invocations Assembly Highlighted",

    "newspaper": "Dainik Jagran",

    "date": "Youth Feature",

    "fullImage": "assets/photos/news-cuttings/cutting-11.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-11.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-11.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-11.webp",

    "width": 678,

    "height": 477,

    "aspectRatio": 1.421

  },

  {

    "id": "cutting-12",

    "original": "Image (718).jpg",

    "title": "State Level Merit Scholars Felicitated by Leadership",

    "newspaper": "Dainik Bhaskar",

    "date": "City News",

    "fullImage": "assets/photos/news-cuttings/cutting-12.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-12.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-12.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-12.webp",

    "width": 626,

    "height": 512,

    "aspectRatio": 1.223

  },

  {

    "id": "cutting-13",

    "original": "Image (94).jpg",

    "title": "Durga Devi Public School Tops District Merit Chart",

    "newspaper": "Rajasthan Patrika",

    "date": "Headline Feature",

    "fullImage": "assets/photos/news-cuttings/cutting-13.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-13.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-13.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-13.webp",

    "width": 958,

    "height": 1345,

    "aspectRatio": 0.712

  },

  {

    "id": "cutting-14",

    "original": "Image (95).jpg",

    "title": "Comprehensive Academic & Cultural Achievements Feature",

    "newspaper": "Dainik Bhaskar",

    "date": "Annual Special",

    "fullImage": "assets/photos/news-cuttings/cutting-14.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-14.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-14.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-14.webp",

    "width": 1509,

    "height": 1800,

    "aspectRatio": 0.838

  },

  {

    "id": "cutting-15",

    "original": "Image (96).jpg",

    "title": "RBSE Senior Secondary Science Stream Outstanding Grades",

    "newspaper": "Rajasthan Patrika",

    "date": "Results Special",

    "fullImage": "assets/photos/news-cuttings/cutting-15.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-15.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-15.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-15.webp",

    "width": 1344,

    "height": 1250,

    "aspectRatio": 1.075

  },

  {

    "id": "cutting-16",

    "original": "Image (97).jpg",

    "title": "Commerce & Arts Scholars Secure State Honors",

    "newspaper": "Dainik Bhaskar",

    "date": "Merit Page",

    "fullImage": "assets/photos/news-cuttings/cutting-16.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-16.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-16.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-16.webp",

    "width": 1053,

    "height": 1594,

    "aspectRatio": 0.661

  },

  {

    "id": "cutting-17",

    "original": "Image (98).jpg",

    "title": "Young Scientists Win Innovation Challenge at State Level",

    "newspaper": "Rajasthan Patrika",

    "date": "Science Corner",

    "fullImage": "assets/photos/news-cuttings/cutting-17.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-17.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-17.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-17.webp",

    "width": 1071,

    "height": 899,

    "aspectRatio": 1.191

  },

  {

    "id": "cutting-18",

    "original": "Poet Competetion.jpg",

    "title": "Inter-School Hindi Poetry Recitation Championship",

    "newspaper": "Dainik Bhaskar",

    "date": "Literature Club",

    "fullImage": "assets/photos/news-cuttings/cutting-18.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-18.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-18.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-18.webp",

    "width": 166,

    "height": 112,

    "aspectRatio": 1.482

  },

  {

    "id": "cutting-19",

    "original": "img20261028_12185732.jpg",

    "title": "Special Supplement: Two Decades of Educational Excellence",

    "newspaper": "Rajasthan Patrika",

    "date": "Grand Feature",

    "fullImage": "assets/photos/news-cuttings/cutting-19.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-19.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-19.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-19.webp",

    "width": 1274,

    "height": 1800,

    "aspectRatio": 0.708

  },

  {

    "id": "cutting-20",

    "original": "img20261028_12210984.jpg",

    "title": "Shekhawati Regional Press Highlights DPS Academic Record",

    "newspaper": "Dainik Bhaskar",

    "date": "Education Times",

    "fullImage": "assets/photos/news-cuttings/cutting-20.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-20.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-20.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-20.webp",

    "width": 1273,

    "height": 1800,

    "aspectRatio": 0.707

  },

  {

    "id": "cutting-21",

    "original": "img20261028_12232902.jpg",

    "title": "Leadership Interview: Building Confident Global Citizens",

    "newspaper": "Rajasthan Patrika",

    "date": "Editorial Feature",

    "fullImage": "assets/photos/news-cuttings/cutting-21.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-21.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-21.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-21.webp",

    "width": 1273,

    "height": 1800,

    "aspectRatio": 0.707

  },

  {

    "id": "cutting-22",

    "original": "news 16 nov bhaskar news.jpg",

    "title": "Children's Day Celebrations & Talent Show at DPS",

    "newspaper": "Dainik Bhaskar",

    "date": "16 Nov",

    "fullImage": "assets/photos/news-cuttings/cutting-22.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-22.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-22.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-22.webp",

    "width": 1084,

    "height": 552,

    "aspectRatio": 1.964

  },

  {

    "id": "cutting-23",

    "original": "news 16 nov patrika.jpg",

    "title": "Inter-House Sports Meet & Athletic Championship",

    "newspaper": "Rajasthan Patrika",

    "date": "16 Nov",

    "fullImage": "assets/photos/news-cuttings/cutting-23.jpg",

    "webpImage": "assets/photos/news-cuttings/cutting-23.webp",

    "thumbImage": "assets/photos/news-cuttings/thumbs/cutting-23.jpg",

    "thumbWebp": "assets/photos/news-cuttings/thumbs/cutting-23.webp",

    "width": 465,

    "height": 752,

    "aspectRatio": 0.618

  }

];



  let newsCuttings = DEFAULT_NEWS_CUTTINGS.slice();



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

          if (targetTab === 'cuttings') {

            if (!cuttingsSpotlightInstance && newsCuttings && newsCuttings.length) {
              initNewsCuttingsSpotlight(newsCuttings);
            }

            setTimeout(function () {

              if (cuttingsSpotlightInstance) {
                if (typeof cuttingsSpotlightInstance.layout === 'function') cuttingsSpotlightInstance.layout();
                else if (typeof cuttingsSpotlightInstance.updateSizes === 'function') cuttingsSpotlightInstance.updateSizes();
              }

              if (cuttingsSliderInstance) {

                cuttingsSliderInstance._onResize();

              } else if (newsCuttings && newsCuttings.length) {

                initNewsCuttingsSlider(newsCuttings);

              }

            }, 30);

            setTimeout(function () {

              if (cuttingsSpotlightInstance) {

                cuttingsSpotlightInstance.layout();

              }

              if (cuttingsSliderInstance) {

                cuttingsSliderInstance._onResize();

              }

            }, 180);

          }

        }

      });

    });



    // B. Render General Notifications & Toppers

    renderToppers();

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



  // Render Board Merit Toppers Feed

  function renderToppers() {

    const container = document.getElementById('sToppersListContainer');

    if (!container) return;



    let toppers = DEFAULT_TOPPERS;

    try {

      const stored = localStorage.getItem('dps_board_toppers') || localStorage.getItem('dps_toppers');

      if (stored) {

        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed) && parsed.length > 0) {

          toppers = parsed;

        }

      }

    } catch (e) {

      console.warn('[NewsHub] Error parsing stored toppers:', e);

    }



    container.innerHTML = toppers.map(function (t) {

      return `

        <article class="s-topper-card">

          <div class="s-topper-avatar-wrap">

            <img src="${escapeHtml(t.image || 'assets/photos/board-merit-toppers.jpg')}" alt="${escapeHtml(t.name)}" class="s-topper-avatar" onerror="this.src='assets/photos/board-merit-toppers.jpg'">

            <span class="s-topper-badge">${escapeHtml(t.percentage)}</span>

          </div>

          <div class="s-topper-info">

            <div class="s-topper-rank">${escapeHtml(t.rank || 'Merit')} • ${escapeHtml(t.year || '2025–26')}</div>

            <h4 class="s-topper-name">${escapeHtml(t.name)}</h4>

            <div class="s-topper-exam">${escapeHtml(t.exam)}</div>

            <p class="s-topper-quote">${escapeHtml(t.accolades || 'State Merit distinction scholar.')}</p>

          </div>

        </article>

      `;

    }).join('');

  }



  // Render Notifications Feed

  function renderNotifications() {

    const container = document.getElementById('sNoticesListContainer');

    if (!container) return;



    let notices = DEFAULT_NOTICES;

    try {

      const stored = localStorage.getItem('dps_live_circulars') || localStorage.getItem('dps_circulars') || localStorage.getItem('dps_official_circulars') || localStorage.getItem('dps_school_news');

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

      const category = (n.category || 'General').trim();

      const badge = (n.badge || '').trim();

      const isUrgent = badge.toUpperCase() === 'URGENT' || category.toUpperCase() === 'URGENT';

      const badgeCls = isUrgent ? 's-badge-urgent' : 's-badge-regular';

      const newTag = (n.isNew || n.status === 'Active') ? '<span class="s-blinking-new">NEW</span>' : '';

      const linkUrl = n.fileUrl || n.link || 'admissions.html';

      const dateParts = (n.date || '01 Nov 2026').split(' ');

      const day = dateParts[0] || '01';

      const mon = (dateParts[1] || 'Nov') + (dateParts[2] ? ' ' + dateParts[2] : '');



      const showBadge = badge && badge.toLowerCase() !== category.toLowerCase();

      const badgeHtml = showBadge ? '<span class="s-notice-badge ' + badgeCls + '">' + escapeHtml(badge) + '</span>' : '';



      const title = (n.title || '').trim();

      const desc = (n.desc || '').trim();

      const showDesc = desc && desc.toLowerCase() !== title.toLowerCase();

      const descHtml = showDesc ? '<p class="s-notice-desc">' + escapeHtml(desc) + '</p>' : '';



      return `

        <article class="s-notice-card">

          <div class="s-notice-card-top">

            <div class="s-notice-date-chip">

              <span class="s-notice-day">${escapeHtml(day)}</span>

              <span class="s-notice-mon">${escapeHtml(mon)}</span>

            </div>

            <div class="s-notice-tags">

              <span class="s-notice-category-badge">${escapeHtml(category)}</span>

              ${badgeHtml}

              ${newTag}

            </div>

          </div>

          <div class="s-notice-card-body">

            <h4 class="s-notice-title">

              <a href="${escapeHtml(linkUrl)}">${escapeHtml(title)}</a>

            </h4>

            ${descHtml}

          </div>

          <div class="s-notice-card-foot">

            <a href="${escapeHtml(linkUrl)}" class="s-notice-action-link" aria-label="View notice: ${escapeHtml(title)}">

              <span>View Notice</span>

              <span aria-hidden="true">&rarr;</span>

            </a>

          </div>

        </article>

      `;

    }).join('');

  }



  // 2B. Smooth Scroll Slider Instance (Originkit Architecture)

  let cuttingsSliderInstance = null;

  let cuttingsSpotlightInstance = null;



  function initNewsCuttingsSpotlight(data) {

    const sliderEl = document.getElementById('sCuttingsCursorSlider') || document.getElementById('sCuttingsSpotlight');

    if (!sliderEl) return;



    if (cuttingsSpotlightInstance) {

      cuttingsSpotlightInstance.destroy();

    }



    if (typeof CursorGallerySlider !== 'undefined') {

      const slides = data.map(function (c) {

        return {

          image: c.fullImage || c.image,

          title: c.title,

          caption: (c.date ? c.date + ' &bull; ' : '') + (c.newspaper || 'Rajasthan Press') + (c.edition ? ' &bull; ' + c.edition : ''),

          note: (c.newspaper || 'Rajasthan Press'),

          id: c.id

        };

      });



      cuttingsSpotlightInstance = new CursorGallerySlider(sliderEl, {

        slides: slides,

        imageFit: 'contain',

        durationMs: 600,

        autoplay: 4500,

        borderRadius: 16,

        showCaption: true,

        ariaLabel: 'Authentic Newspaper Clippings Gallery',

        onSlideClick: function (slide) {

          openCuttingModal(slide.id);

        }

      });

    } else if (typeof PolaroidLineCarousel !== 'undefined') {

      cuttingsSpotlightInstance = new PolaroidLineCarousel(sliderEl, {

        slides: data.map(function (c) {

          return {

            image: c.fullImage || c.image,

            title: c.title,

            caption: (c.date ? c.date + ' &bull; ' : '') + (c.newspaper || 'Rajasthan Press'),

            note: (c.newspaper || 'Rajasthan Press'),

            id: c.id

          };

        }),

        containFit: true,

        onSlideClick: function (slide) {

          openCuttingModal(slide.id);

        }

      });

    }

  }



  function initNewsCuttingsSlider(data) {

    const sliderEl = document.getElementById('sCuttingsSlider');

    if (!sliderEl || typeof SmoothScrollSlider === 'undefined') return;



    cuttingsSliderInstance = new SmoothScrollSlider(sliderEl, {

      items: data,

      slideWidth: 320,

      slideHeight: 420,

      spacing: 2,

      direction: 'right',

      smoothness: 10,

      radius: 16,

      dim: 10,

      background: 'transparent',

      sensitivity: 5,

      loop: true,

      autoplay: true,

      autoplaySpeed: 0.6,

      onSlideClick: function (item) {

        openCuttingModal(item.id);

      }

    });



    const prevBtn = document.getElementById('sSliderPrevBtn');

    const nextBtn = document.getElementById('sSliderNextBtn');

    if (prevBtn) {

      prevBtn.addEventListener('click', function () {

        if (cuttingsSliderInstance) cuttingsSliderInstance.prev();

      });

    }

    if (nextBtn) {

      nextBtn.addEventListener('click', function () {

        if (cuttingsSliderInstance) cuttingsSliderInstance.next();

      });

    }

  }



  function setupViewModeToggle() {

    const spotlightWrap = document.getElementById('sSpotlightContainerWrap');

    const sliderWrap = document.getElementById('sSliderContainerWrap');

    const gridEl = document.getElementById('sCuttingsGrid');

    const btnSpotlight = document.getElementById('sViewBtnSpotlight');

    const btnSlider = document.getElementById('sViewBtnSlider');

    const btnGrid = document.getElementById('sViewBtnGrid');



    if (btnSpotlight) {

      btnSpotlight.addEventListener('click', function () {

        btnSpotlight.classList.add('active');

        btnSpotlight.setAttribute('aria-checked', 'true');

        if (btnSlider) { btnSlider.classList.remove('active'); btnSlider.setAttribute('aria-checked', 'false'); }

        if (btnGrid) { btnGrid.classList.remove('active'); btnGrid.setAttribute('aria-checked', 'false'); }



        if (spotlightWrap) spotlightWrap.style.display = 'block';

        if (sliderWrap) sliderWrap.style.display = 'none';

        if (gridEl) gridEl.style.display = 'none';



        if (cuttingsSpotlightInstance) {

          cuttingsSpotlightInstance.layout();

          cuttingsSpotlightInstance.startAutoplay();

        }

      });

    }



    if (btnSlider) {

      btnSlider.addEventListener('click', function () {

        btnSlider.classList.add('active');

        btnSlider.setAttribute('aria-checked', 'true');

        if (btnSpotlight) { btnSpotlight.classList.remove('active'); btnSpotlight.setAttribute('aria-checked', 'false'); }

        if (btnGrid) { btnGrid.classList.remove('active'); btnGrid.setAttribute('aria-checked', 'false'); }



        if (spotlightWrap) spotlightWrap.style.display = 'none';

        if (sliderWrap) sliderWrap.style.display = 'block';

        if (gridEl) gridEl.style.display = 'none';



        if (cuttingsSliderInstance) cuttingsSliderInstance._onResize();

        if (cuttingsSpotlightInstance) cuttingsSpotlightInstance.stopAutoplay();

      });

    }



    if (btnGrid) {

      btnGrid.addEventListener('click', function () {

        btnGrid.classList.add('active');

        btnGrid.setAttribute('aria-checked', 'true');

        if (btnSpotlight) { btnSpotlight.classList.remove('active'); btnSpotlight.setAttribute('aria-checked', 'false'); }

        if (btnSlider) { btnSlider.classList.remove('active'); btnSlider.setAttribute('aria-checked', 'false'); }



        if (spotlightWrap) spotlightWrap.style.display = 'none';

        if (sliderWrap) sliderWrap.style.display = 'none';

        if (gridEl) gridEl.style.display = 'grid';



        if (cuttingsSpotlightInstance) cuttingsSpotlightInstance.stopAutoplay();

      });

    }

  }



  // Load News Cuttings (Local storage + embedded default + fetch fallback)

  function loadNewsCuttings() {

    const grid = document.getElementById('sCuttingsGrid');

    const sliderEl = document.getElementById('sCuttingsSlider');

    const spotlightEl = document.getElementById('sCuttingsCursorSlider') || document.getElementById('sCuttingsSpotlight');

    if (!grid && !sliderEl && !spotlightEl) return;



    let activeData = DEFAULT_NEWS_CUTTINGS.slice();

    try {

      const stored = localStorage.getItem('dps_news_cuttings');

      if (stored) {

        const parsed = JSON.parse(stored);

        const isLegacyMock = Array.isArray(parsed) && parsed.some(it => String(it.id).startsWith('CUT-'));

        if (Array.isArray(parsed) && parsed.length > 0 && !isLegacyMock) {

          activeData = parsed;

        } else {

          localStorage.removeItem('dps_news_cuttings');

          localStorage.setItem('dps_news_cuttings', JSON.stringify(DEFAULT_NEWS_CUTTINGS));

        }

      } else {

        localStorage.setItem('dps_news_cuttings', JSON.stringify(DEFAULT_NEWS_CUTTINGS));

      }

    } catch (e) {}



    newsCuttings = activeData;

    initNewsCuttingsSpotlight(activeData);

    initNewsCuttingsSlider(activeData);

    renderCuttings(activeData, 'all');

    setupCuttingFilters(activeData);

    setupViewModeToggle();



    // Background fetch to update if online server is available

    if (window.location.protocol.startsWith('http')) {

      fetch('assets/photos/news-cuttings/news-cuttings-metadata.json')

        .then(r => r.json())

        .then(data => {

          if (Array.isArray(data) && data.length > 0) {

            newsCuttings = data;

            if (cuttingsSpotlightInstance && typeof cuttingsSpotlightInstance.setItems === 'function') {

              cuttingsSpotlightInstance.setItems(data.map(function (c) {

                return {

                  image: c.fullImage || c.image,

                  title: c.title,

                  caption: (c.date ? c.date + ' &bull; ' : '') + (c.newspaper || 'Rajasthan Press') + (c.edition ? ' &bull; ' + c.edition : ''),

                  note: (c.newspaper || 'Rajasthan Press') + (c.date ? ' ' + c.date : ''),

                  id: c.id

                };

              }));

            }

            if (cuttingsSliderInstance) {

              cuttingsSliderInstance.setItems(data);

            }

            renderCuttings(data, 'all');

          }

        })

        .catch(() => {});

    }

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

        const filtered = (filter === 'all')

          ? allData

          : allData.filter(function (it) {

              const paper = (it.newspaper || '').toLowerCase();

              if (filter === 'navjyoti' || filter === 'regional') {

                return paper.includes('navjyoti') || paper.includes('jagran') || (!paper.includes('patrika') && !paper.includes('bhaskar'));

              }

              return paper.includes(filter.toLowerCase());

            });



        if (cuttingsSpotlightInstance && typeof cuttingsSpotlightInstance.setItems === 'function') {

          cuttingsSpotlightInstance.setItems(filtered.map(function (c) {

            return {

              image: c.fullImage || c.image,

              title: c.title,

              caption: (c.date ? c.date + ' &bull; ' : '') + (c.newspaper || 'Rajasthan Press') + (c.edition ? ' &bull; ' + c.edition : ''),

              note: (c.newspaper || 'Rajasthan Press'),

              id: c.id

            };

          }));

        }



        if (cuttingsSliderInstance) {

          cuttingsSliderInstance.setItems(filtered);

        }

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



  // Expose global helper for office quick edit & external callers

  window.DEFAULT_NEWS_CUTTINGS = DEFAULT_NEWS_CUTTINGS;

  window.openCuttingModal = openCuttingModal;

  window.initCuttingLightbox = initCuttingLightbox;

  window.DPSShekhauniHub = {

    refreshNotices: renderNotifications,

    openModal: openCuttingModal,

    initLightbox: initCuttingLightbox

  };

})();

