/**
 * Durga Public School, Pilani, Rajasthan
 * Master Editorial Frames Controller (Veluno Hero + Golden Hour Arches)
 */

(function () {
  'use strict';

  // 1. VELUNO HERO SHOWCASE SLIDER
  const heroSlides = [
    {
      step: '01',
      progress: '33.33%',
      mainImg: 'assets/photos/board-merit-toppers.jpg',
      mainImgRef: 'assets/reference/veluno_hero_photo.png',
      alt: 'State Board Merit Toppers with Leadership at Durga Public School Pilani',
      meritTitle: '100% Board Pass',
      meritSub: '20+ Yrs Academic Legacy',
      ctaText: 'Explore Admissions 2026-27',
      ctaHref: 'admissions.html',
      side1Img: 'assets/photos/science-practical-demonstration.jpg',
      side1ImgRef: 'assets/reference/veluno_side_photo_1.png',
      side1Badge: 'STEM & Labs',
      side1Title: 'Composite Science Labs',
      side1Desc: 'Physics, Chem, Bio & IT',
      side1Link: 'facilities.html#labs',
      side2Img: 'assets/photos/annual-sports-day-podium-champions.jpg',
      side2ImgRef: 'assets/reference/veluno_side_photo_2.png',
      side2Badge: 'Athletics',
      side2Title: 'Sports & Athletics Arena',
      side2Desc: 'State Champions & Fitness',
      side2Link: 'facilities.html#sports'
    },
    {
      step: '02',
      progress: '66.66%',
      mainImg: 'assets/photos/senior-students-celebration-portico.jpg',
      mainImgRef: 'assets/reference/veluno_hero_photo.png',
      alt: 'Scholars in formal assembly at Durga Public School Pilani',
      meritTitle: '500+ Scholars',
      meritSub: 'Character & Moral Clarity',
      ctaText: 'Schedule Campus Visit',
      ctaHref: 'contact.html',
      side1Img: 'assets/photos/art-craft-exhibition-raman-house.jpg',
      side1ImgRef: 'assets/reference/veluno_side_photo_1.png',
      side1Badge: 'Creativity',
      side1Title: 'Inter-House Arts Expo',
      side1Desc: 'Design, Drama & Crafts',
      side1Link: 'gallery.html',
      side2Img: 'assets/photos/deep-prajwalan-saraswati-vandana.jpg',
      side2ImgRef: 'assets/reference/veluno_side_photo_2.png',
      side2Badge: 'Tradition',
      side2Title: 'Deep Prajwalan Heritage',
      side2Desc: 'Moral Integrity & Values',
      side2Link: 'about.html'
    },
    {
      step: '03',
      progress: '100%',
      mainImg: 'assets/photos/campus-facade-main.jpg',
      mainImgRef: 'assets/reference/veluno_hero_photo.png',
      alt: 'Grand Sandstone Campus of Durga Public School in Pilani, Rajasthan',
      meritTitle: 'Sandstone Campus',
      meritSub: 'Loharu Road, Pilani',
      ctaText: 'Review Wing Facilities',
      ctaHref: 'facilities.html',
      side1Img: 'assets/photos/campus-admin-wing.jpg',
      side1ImgRef: 'assets/reference/veluno_side_photo_1.png',
      side1Badge: 'Governance',
      side1Title: 'Secretariat & Counseling',
      side1Desc: 'Parent Support & Admin',
      side1Link: 'about.html#governance',
      side2Img: 'assets/photos/class-x-graduating-batch-turban.jpg',
      side2ImgRef: 'assets/reference/veluno_side_photo_2.png',
      side2Badge: 'Alumni',
      side2Title: 'Senior Board Cohort',
      side2Desc: 'NEET, JEE & CUET Focus',
      side2Link: 'academics.html#senior'
    }
  ];

  let currentSlideIndex = 0;
  let currentImageMode = 'authentic'; // 'authentic' or 'reference'

  function updateHeroSlide(index) {
    currentSlideIndex = (index + heroSlides.length) % heroSlides.length;
    const slide = heroSlides[currentSlideIndex];

    const stepEl = document.getElementById('velunoStepText');
    const fillEl = document.getElementById('velunoProgressFill');
    const mainImgEl = document.getElementById('velunoMainImg');
    const meritTitleEl = document.getElementById('velunoMeritTitle');
    const meritSubEl = document.getElementById('velunoMeritSub');
    const ctaTextEl = document.getElementById('velunoCtaText');
    const ctaBtnEl = document.getElementById('velunoCtaBtn');

    const side1ImgEl = document.getElementById('velunoSide1Img');
    const side1BadgeEl = document.getElementById('velunoSide1Badge');
    const side1TitleEl = document.getElementById('velunoSide1Title');
    const side1DescEl = document.getElementById('velunoSide1Desc');
    const side1LinkEl = document.getElementById('velunoSide1Link');

    const side2ImgEl = document.getElementById('velunoSide2Img');
    const side2BadgeEl = document.getElementById('velunoSide2Badge');
    const side2TitleEl = document.getElementById('velunoSide2Title');
    const side2DescEl = document.getElementById('velunoSide2Desc');
    const side2LinkEl = document.getElementById('velunoSide2Link');

    if (stepEl) stepEl.textContent = slide.step;
    if (fillEl) {
      fillEl.style.width = slide.progress;
    }

    const mainSource = currentImageMode === 'reference' ? slide.mainImgRef : slide.mainImg;
    const side1Source = currentImageMode === 'reference' ? slide.side1ImgRef : slide.side1Img;
    const side2Source = currentImageMode === 'reference' ? slide.side2ImgRef : slide.side2Img;

    if (mainImgEl) {
      mainImgEl.style.opacity = '0.3';
      setTimeout(function () {
        mainImgEl.src = mainSource;
        mainImgEl.alt = slide.alt;
        mainImgEl.style.opacity = '1';
      }, 150);
    }

    if (meritTitleEl) meritTitleEl.textContent = slide.meritTitle;
    if (meritSubEl) meritSubEl.textContent = slide.meritSub;
    if (ctaTextEl) ctaTextEl.textContent = slide.ctaText;
    if (ctaBtnEl) ctaBtnEl.setAttribute('href', slide.ctaHref);

    if (side1ImgEl) side1ImgEl.src = side1Source;
    if (side1BadgeEl) side1BadgeEl.textContent = slide.side1Badge;
    if (side1TitleEl) side1TitleEl.textContent = slide.side1Title;
    if (side1DescEl) side1DescEl.textContent = slide.side1Desc;
    if (side1LinkEl) side1LinkEl.setAttribute('href', slide.side1Link);

    if (side2ImgEl) side2ImgEl.src = side2Source;
    if (side2BadgeEl) side2BadgeEl.textContent = slide.side2Badge;
    if (side2TitleEl) side2TitleEl.textContent = slide.side2Title;
    if (side2DescEl) side2DescEl.textContent = slide.side2Desc;
    if (side2LinkEl) side2LinkEl.setAttribute('href', slide.side2Link);
  }

  function initHeroControls() {
    const prevBtn = document.getElementById('velunoPrevBtn');
    const nextBtn = document.getElementById('velunoNextBtn');

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        updateHeroSlide(currentSlideIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        updateHeroSlide(currentSlideIndex + 1);
      });
    }
  }

  // 2. IMAGE MODE SWITCHER (Authentic DPS Photos <-> Attached Reference Clips)
  function initImageModeSwitcher() {
    const authenticBtn = document.getElementById('modeAuthenticBtn');
    const referenceBtn = document.getElementById('modeReferenceBtn');

    if (!authenticBtn || !referenceBtn) return;

    function applyMode(mode) {
      currentImageMode = mode;
      if (mode === 'authentic') {
        authenticBtn.classList.add('active');
        referenceBtn.classList.remove('active');
      } else {
        referenceBtn.classList.add('active');
        authenticBtn.classList.remove('active');
      }

      // Update hero main and side cards
      updateHeroSlide(currentSlideIndex);

      // Update Golden Hour arches if they have data-ref-img
      const refImages = document.querySelectorAll('[data-auth-img][data-ref-img]');
      refImages.forEach(function (img) {
        if (mode === 'reference') {
          img.src = img.getAttribute('data-ref-img');
        } else {
          img.src = img.getAttribute('data-auth-img');
        }
      });
    }

    authenticBtn.addEventListener('click', function () {
      applyMode('authentic');
    });

    referenceBtn.addEventListener('click', function () {
      applyMode('reference');
    });
  }

  // 3. PILL-SHAPED FAQ ACCORDION (Reference Image 2)
  function initPillFaq() {
    const faqItems = document.querySelectorAll('.gh-pill-faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      const header = item.querySelector('.gh-pill-faq-header');
      if (!header) return;

      header.addEventListener('click', function () {
        const isActive = item.classList.contains('active');

        // Close other FAQ items for clean pill accordion rhythm
        faqItems.forEach(function (otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const toggle = otherItem.querySelector('.gh-pill-faq-toggle');
            if (toggle) toggle.textContent = '+';
          }
        });

        // Toggle current
        if (isActive) {
          item.classList.remove('active');
          const toggle = item.querySelector('.gh-pill-faq-toggle');
          if (toggle) toggle.textContent = '+';
        } else {
          item.classList.add('active');
          const toggle = item.querySelector('.gh-pill-faq-toggle');
          if (toggle) toggle.textContent = '+';
        }
      });
    });
  }

  // 4. NEWSLETTER / ADMISSION ALERT FORM
  function initSubscribeForm() {
    const form = document.getElementById('ghSubscribeForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = form.querySelector('.gh-subscribe-input');
      if (input && input.value.trim() !== '') {
        const email = input.value.trim();
        alert('Thank you! ' + email + ' has been registered for official Durga Public School admission updates & academic circulars.');
        input.value = '';
      }
    });
  }

  // ==========================================================================
  // PART 3: INSPIRATION HERO & DAGEROZ TSUNAMI / DRAGGABLE BUTTON ENGINE
  // ==========================================================================

  // 5. INSPIRATION HERO SLIDER (Curved Photo Frame Cross-Fade & Selector Pills)
  function initInspireHeroSlider() {
    const photoPills = document.querySelectorAll('.photo-pill-btn');
    const curvedImg = document.getElementById('curvedHeroPhoto');
    const stepBtns = document.querySelectorAll('.inspire-step-btn');
    const heroBgs = document.querySelectorAll('.inspire-hero-bg');

    if (!curvedImg && !photoPills.length) return;

    // Dynamically derive slides directly from the DOM pills so HTML data-img / data-alt are always strictly respected!
    const slides = photoPills.length
      ? Array.from(photoPills).map(function (pill) {
          return {
            img: pill.getAttribute('data-img') || '',
            alt: pill.getAttribute('data-alt') || pill.textContent.trim()
          };
        })
      : [
          { img: 'assets/photos/client/campus/campus-building-exterior-1.jpg', alt: 'Sandstone Main Campus Building of Durga Public School' },
          { img: 'assets/photos/client/events/event-sports-day-sprint-race-1.jpg', alt: 'Student athletes competing in sprint race at Durga Public School Sports Day' },
          { img: 'assets/photos/client/labs/computer-lab-workstations-1.jpg', alt: 'High-Speed Computer Science & IT Hub' },
          { img: 'assets/photos/client/transport/transport-bus-fleet-1.jpg', alt: 'Safe GPS Transport Fleet at Durga Public School' }
        ];

    let activeIndex = 0;
    let autoTimer = null;

    function goToSlide(index) {
      activeIndex = (index + slides.length) % slides.length;
      const target = slides[activeIndex];
      if (!target || !target.img) return;

      // Update curved photo with smooth cross-fade
      if (curvedImg) {
        curvedImg.style.opacity = '0.35';
        setTimeout(function () {
          curvedImg.src = target.img;
          curvedImg.alt = target.alt;
          curvedImg.style.opacity = '1';
        }, 140);
      }

      // Update photo selector pills
      photoPills.forEach(function (pill, i) {
        if (i === activeIndex) {
          pill.classList.add('active');
          pill.setAttribute('aria-selected', 'true');
        } else {
          pill.classList.remove('active');
          pill.setAttribute('aria-selected', 'false');
        }
      });

      // Update background slides if present
      heroBgs.forEach(function (bg, i) {
        if (i === activeIndex) {
          bg.classList.add('active');
        } else {
          bg.classList.remove('active');
        }
      });

      // Update step buttons if present
      stepBtns.forEach(function (btn, i) {
        if (i === activeIndex) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    photoPills.forEach(function (pill, idx) {
      pill.addEventListener('click', function () {
        goToSlide(idx);
        resetAutoTimer();
      });
    });

    stepBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const step = parseInt(btn.getAttribute('data-step') || '0', 10);
        goToSlide(step);
        resetAutoTimer();
      });
    });

    function startAutoTimer() {
      if (window.innerWidth <= 768) return; // Do not decode offscreen high-res images on mobile
      autoTimer = setInterval(function () {
        goToSlide(activeIndex + 1);
      }, 7000);
    }

    function resetAutoTimer() {
      if (autoTimer) clearInterval(autoTimer);
      startAutoTimer();
    }

    // Preload hero slide images on idle for instantaneous switching
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(function () {
        slides.forEach(function (s) {
          if (s.img) {
            const pre = new Image();
            pre.src = s.img;
          }
        });
      });
    } else {
      setTimeout(function () {
        slides.forEach(function (s) {
          if (s.img) {
            const pre = new Image();
            pre.src = s.img;
          }
        });
      }, 1500);
    }

    const heroStage = document.querySelector('.inspire-hero-stage');
    if (heroStage) {
      heroStage.addEventListener('mouseenter', function () {
        if (autoTimer) clearInterval(autoTimer);
      });
      heroStage.addEventListener('mouseleave', function () {
        startAutoTimer();
      });
    }

    startAutoTimer();
  }

  // 7. DRAGGABLE BLUE TRANSLUCENT BUTTON & TSUNAMI / BUBBLES / DAGEROZ AD ENGINE
  let tsunamiAnimationId = null;

  function initDagerozDraggableButton() {
    const floatBtn = document.getElementById('dagerozFloatBtn');
    if (!floatBtn) return;

    let isPointerDown = false;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;
    const DRAG_THRESHOLD = 6; // pixels to distinguish drag vs tap

    // Button is cleanly docked via CSS to bottom-right by default
    // We do NOT set inline left/top on page load so it never overlaps cards or text

    // Mouse & Touch Unified Handlers
    function onPointerStart(e) {
      isPointerDown = true;
      isDragging = false;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      startX = clientX;
      startY = clientY;

      const rect = floatBtn.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;
      attachDragListeners();
    }

    function onPointerMove(e) {
      if (!isPointerDown) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      if (!isDragging && Math.hypot(deltaX, deltaY) > DRAG_THRESHOLD) {
        isDragging = true;
        floatBtn.classList.add('is-dragging');
        floatBtn.style.right = 'auto';
        floatBtn.style.bottom = 'auto';
      }

      if (isDragging) {
        if (e.cancelable) e.preventDefault();

        const btnWidth = floatBtn.offsetWidth;
        const btnHeight = floatBtn.offsetHeight;
        const pad = 12;

        let newLeft = initialLeft + deltaX;
        let newTop = initialTop + deltaY;

        // Clamp inside visible viewport
        newLeft = Math.max(pad, Math.min(window.innerWidth - btnWidth - pad, newLeft));
        newTop = Math.max(pad, Math.min(window.innerHeight - btnHeight - pad, newTop));

        floatBtn.style.left = newLeft + 'px';
        floatBtn.style.top = newTop + 'px';
      }
    }

    function onPointerEnd(e) {
      if (!isPointerDown) return;
      isPointerDown = false;

      detachDragListeners();
      if (isDragging) {
        isDragging = false;
        floatBtn.classList.remove('is-dragging');
      } else {
        // User clicked or tapped without dragging! Calculate exact origin
        const rect = floatBtn.getBoundingClientRect();
        const originX = startX || (rect.left + rect.width / 2);
        const originY = startY || (rect.top + rect.height / 2);
        triggerWaterRippleAndDagerozAd(originX, originY);
      }
    }

    // Dynamic Window Event Attachment (Only during active drag, NEVER during normal scroll!)
    function attachDragListeners() {
      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', onPointerEnd);
      window.addEventListener('touchmove', onPointerMove, { passive: false });
      window.addEventListener('touchend', onPointerEnd);
      window.addEventListener('touchcancel', onPointerEnd);
    }

    function detachDragListeners() {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerEnd);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerEnd);
      window.removeEventListener('touchcancel', onPointerEnd);
    }

    // Attach lightweight pointerstart listeners only to the button itself
    floatBtn.addEventListener('mousedown', onPointerStart);
    floatBtn.addEventListener('touchstart', onPointerStart, { passive: true });

    // Keyboard trigger
    floatBtn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const rect = floatBtn.getBoundingClientRect();
        triggerWaterRippleAndDagerozAd(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    });

    // Handle window resize to keep within bounds
    window.addEventListener('resize', function () {
      const rect = floatBtn.getBoundingClientRect();
      const pad = 12;
      let left = Math.max(pad, Math.min(window.innerWidth - floatBtn.offsetWidth - pad, rect.left));
      let top = Math.max(pad, Math.min(window.innerHeight - floatBtn.offsetHeight - pad, rect.top));
      floatBtn.style.left = left + 'px';
      floatBtn.style.top = top + 'px';
    });
  }

  // 8. HYPER-REALISTIC WATER RIPPLE WAVES ENGINE
  // Concentric caustic liquid refraction waves radiating from button coordinates
  let waterRippleAnimId = null;

  function triggerWaterRipple(originX, originY) {
    const overlay = document.getElementById('tsunamiOverlay');
    const canvas = document.getElementById('tsunamiCanvas');
    const rippleContainer = document.getElementById('bubbleContainer');

    if (!overlay || !canvas) return;

    overlay.classList.add('active');
    overlay.removeAttribute('hidden');

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // Fallback origin coordinates if not provided
    if (typeof originX !== 'number' || typeof originY !== 'number') {
      const floatBtn = document.getElementById('dagerozFloatBtn');
      if (floatBtn) {
        const rect = floatBtn.getBoundingClientRect();
        originX = rect.left + rect.width / 2;
        originY = rect.top + rect.height / 2;
      } else {
        originX = width / 2;
        originY = height / 2;
      }
    }

    // Maximum distance from origin to furthest viewport corner
    const maxRadius = Math.hypot(
      Math.max(originX, width - originX),
      Math.max(originY, height - originY)
    ) * 1.08;

    // Keep overlay container clean - pure high-definition canvas caustics with zero localized smudges
    if (rippleContainer) {
      rippleContainer.innerHTML = '';
    }

    // Cancel existing loop
    if (waterRippleAnimId) {
      cancelAnimationFrame(waterRippleAnimId);
    }

    const startTime = performance.now();
    const duration = 1800; // ms
    // Exactly 5 distinct, clearly separated concentric wave crests
    const waveDelays = [0, 135, 270, 405, 540];

    function renderWaterRipple(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);

      ctx.save();
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Render 5 Distinct Concentric Caustic Wave Rings
      for (let i = 0; i < waveDelays.length; i++) {
        const delay = waveDelays[i];
        if (elapsed < delay) continue;

        const waveElapsed = elapsed - delay;
        const waveProgress = Math.min(1, waveElapsed / (duration - delay));
        if (waveProgress >= 1) continue;

        // Fluid deceleration expansion
        const ease = 1 - Math.pow(1 - waveProgress, 2.4);
        const radius = 28 + (maxRadius - 28) * ease;

        // Energy dispersion with strong visibility for all 5 waves
        const decayTime = Math.pow(1 - waveProgress, 1.6);
        const harmonicDamp = 1 - i * 0.08;
        const spatialDispersion = 1 / Math.sqrt(1 + radius / 160);
        const amplitude = decayTime * harmonicDamp * spatialDispersion;

        if (amplitude <= 0.005) continue;

        const waveWidth = 18 + waveProgress * 24;

        // 1. Refraction Trough (Dark contrast valley behind crest)
        const troughAlpha = 0.22 * amplitude;
        if (troughAlpha > 0.005) {
          ctx.strokeStyle = 'rgba(0, 0, 0, ' + troughAlpha + ')';
          ctx.lineWidth = waveWidth * 0.55;
          ctx.beginPath();
          ctx.arc(originX, originY, Math.max(0, radius - waveWidth * 0.38), 0, Math.PI * 2);
          ctx.stroke();
        }

        // 2. Caustic Specular Glow Halo
        const haloAlpha = 0.35 * amplitude;
        if (haloAlpha > 0.005) {
          ctx.strokeStyle = 'rgba(255, 255, 255, ' + haloAlpha + ')';
          ctx.lineWidth = waveWidth * 0.45;
          ctx.beginPath();
          ctx.arc(originX, originY, radius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // 3. Specular Razor-Sharp Crest (High-definition bright caustic line)
        const crestAlpha = 0.85 * amplitude;
        if (crestAlpha > 0.01) {
          ctx.strokeStyle = 'rgba(255, 255, 255, ' + crestAlpha + ')';
          ctx.lineWidth = 2.2 + (1 - waveProgress) * 1.8;
          ctx.beginPath();
          ctx.arc(originX, originY, radius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // 4. Outer Whisper Sheen
        const outerSheenAlpha = 0.16 * amplitude;
        if (outerSheenAlpha > 0.005) {
          ctx.strokeStyle = 'rgba(255, 255, 255, ' + outerSheenAlpha + ')';
          ctx.lineWidth = waveWidth * 0.3;
          ctx.beginPath();
          ctx.arc(originX, originY, radius + waveWidth * 0.35, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      ctx.restore();

      if (progress < 1) {
        waterRippleAnimId = requestAnimationFrame(renderWaterRipple);
      } else {
        ctx.clearRect(0, 0, width, height);
        overlay.classList.remove('active');
        if (rippleContainer) rippleContainer.innerHTML = '';
      }
    }

    waterRippleAnimId = requestAnimationFrame(renderWaterRipple);
  }

  function triggerWaterRippleAndDagerozAd(originX, originY) {
    // 1. Launch 5 Concentric Fluid Water Caustic Waves radiating across the screen
    triggerWaterRipple(originX, originY);

    // 2. Harmoniously synchronize modal fade-in with the 3rd expanding wave crest (~260ms)
    setTimeout(function () {
      openDagerozModal();
    }, 240);
  }

    // =========================================================================
  // 10. BLOOMING PIXEL FLOWER WEBGL BACKGROUND (Originkit — Z-Black Preset)
  // =========================================================================
  let flowerGl = null;
  let flowerProg = null;
  let flowerRaf = 0;
  let flowerRunning = false;
  let flowerBuiltKey = '';
  let flowerBuf = null;
  let flowerCount = 0;
  let flowerTime = 0;
  let flowerLast = 0;
  let flowerA_A = -1;
  let flowerA_B = -1;
  let flowerUniforms = {};

  const FLOWER_TAU = Math.PI * 2;
  const FLOWER_PETAL_LEN = 520;
  const FLOWER_CORE_R = 85;
  const FLOWER_FOV = 34;
  const FLOWER_DPR_CAP = 1.5;
  const FLOWER_PETAL_PER_DENSITY = 700; // Optimized fluid particle density for silky 60fps
  const FLOWER_CORE_SHARE = 0.1;
  const FLOWER_STEM_SHARE = 0.26;
  const FLOWER_DOT_AT_100 = 2.4;
  const FLOWER_WIND_AT_50 = 1;
  const FLOWER_SCATTER = 9;
  const FLOWER_ROLL = 0;
  const FLOWER_STAGGER = 0.55;

  const FLOWER_VERT = `
precision highp float;
attribute vec4 aA;
attribute vec4 aB;
uniform vec2  uRes;
uniform float uFocal;
uniform float uDist;
uniform float uPitch;
uniform float uRoll;
uniform float uTime;
uniform float uDot;
uniform float uBloom;
uniform float uStagger;
uniform float uPetalLen;
uniform float uPetals;
uniform float uCoreR;
uniform float uScatter;
uniform vec3  uBase;
uniform vec3  uStem;
uniform vec3  uAccent;
uniform float uAccentMix;
varying vec3  vCol;
varying float vA;

#define PI  3.14159265
#define TAU 6.28318530

const float TH0_BUD  = 0.10;
const float TH0_OPEN = 0.42;
const float TH1_BUD  = 0.28;
const float TH1_OPEN = 1.55;
const float BUD_SCALE = 0.45;
const float BUD_LEN   = 0.72;
const float CUP       = 0.42;
const float FLUTTER   = 0.055;
const float PETAL_FILL = 0.72;
const float ATTACH_Y  = 40.0;
const float STEM_LEN  = 3000.0;
const float STEM_R    = 24.0;
const float SWAY      = 26.0;

float whorlBloom(float ln) {
    float sp = uStagger * 0.7;
    float lo = ln * sp;
    float hi = lo + (1.0 - sp);
    return smoothstep(lo, hi, uBloom);
}

vec2 swayAt(float t) {
    float amp = SWAY * (1.0 - t) * (1.0 - t);
    float ph  = uTime * 0.55 - t * 1.2;
    return vec2(sin(ph), sin(ph * 0.83 + 1.7)) * amp;
}

void main() {
    float kind = aB.z;
    float jit  = aB.x;
    float S = mix(BUD_SCALE, 1.0, uBloom) * (1.0 + sin(uTime * 0.9) * 0.012);
    vec3  P;
    vec3  col;
    float bri;
    float szv = 0.55 + jit * 1.1;

    if (kind < 0.5) {
        float u   = aA.x;
        float v   = aA.y;
        float phi = aA.z;
        float ln  = aA.w;
        float b     = whorlBloom(ln);
        float inner = 1.0 - ln * 0.32;
        float th0 = mix(TH0_BUD, TH0_OPEN, b) * (0.70 + 0.30 * inner);
        float th1 = mix(TH1_BUD, TH1_OPEN * inner, b);
        th1 += sin(uTime * 1.7 + aA.z * 3.0 + ln * 2.4) * FLUTTER;
        float L = uPetalLen * (0.42 + 0.58 * inner) * mix(BUD_LEN, 1.0, b);
        float s = u * L;
        float k   = (th1 - th0) / max(L, 1.0);
        float x   = k * s * 0.5;
        float sc  = abs(x) < 1e-4 ? 1.0 : sin(x) / x;
        float mid = th0 + x;
        float R   = s * sin(mid) * sc;
        float H   = s * cos(mid) * sc;
        float th  = th0 + k * s;
        vec3 rh = vec3(cos(phi), 0.0, sin(phi));
        vec3 tt = vec3(-sin(phi), 0.0, cos(phi));
        vec3 nh = rh * cos(th) - vec3(0.0, 1.0, 0.0) * sin(th);
        float wp = pow(max(sin(PI * pow(u, 0.85)), 0.0), 0.55);
        float radial = uCoreR * 1.10 + R;
        float halfW  = wp * PETAL_FILL * (PI / max(uPetals, 3.0)) * radial;
        P = rh * radial + vec3(0.0, H, 0.0) + tt * (v * halfW) - nh * (CUP * halfW * v * v) + nh * (aB.y * uScatter * (0.35 + wp));
        float tip  = smoothstep(0.55, 1.0, u);
        float rim  = smoothstep(0.55, 1.0, abs(v));
        float mixA = clamp(uAccentMix * (0.35 + tip * 0.80 + rim * 0.50) + step(jit, uAccentMix) * 0.25, 0.0, 1.0);
        col = mix(uBase, uAccent, mixA);
        bri = (0.35 + jit * 0.50) * (0.55 + wp * 0.55) * (0.75 + b * 0.45);
        bri *= smoothstep(0.0, 0.22, u);
    } else if (kind < 1.5) {
        float cr = aA.x;
        float ca = aA.y;
        float el = aA.z * PI * 0.5;
        float rad = uCoreR * (0.30 + 0.70 * cr) * mix(0.72, 1.0, uBloom);
        P = vec3(cos(ca) * cos(el), sin(el) * 0.85, sin(ca) * cos(el)) * rad;
        P.y += uCoreR * 0.12;
        col = mix(uAccent, vec3(1.0), 0.35 * jit);
        bri = (0.50 + jit * 0.55) * (0.50 + uBloom * 0.60);
        szv *= 0.85;
    } else {
        float t   = aA.x;
        float az  = aA.y;
        float rr  = aA.z;
        float rad = STEM_R * (0.55 + 0.45 * t);
        vec2  sw  = swayAt(t);
        P = vec3(cos(az) * rr * rad + sw.x, -t * STEM_LEN, sin(az) * rr * rad + sw.y);
        col = uStem;
        bri = (0.30 + jit * 0.35) * (0.70 + 0.40 * (1.0 - t));
        bri *= 1.0 - smoothstep(0.62, 1.0, t);
        szv *= 0.75;
    }

    if (kind < 1.5) bri *= pow(S, 1.05);
    if (kind < 1.5) {
        P *= S;
        P.xz += swayAt(0.0);
    }

    P.y += ATTACH_Y;
    float c  = cos(uPitch);
    float sp = sin(uPitch);
    float ry = P.y * c + P.z * sp;
    float rz = uDist - P.y * sp + P.z * c;

    if (rz < 30.0) {
        gl_Position  = vec4(2.0, 2.0, 0.0, 1.0);
        gl_PointSize = 0.0;
        vA   = 0.0;
        vCol = uBase;
        return;
    }

    float cr = cos(uRoll);
    float sr = sin(uRoll);
    float sx = (P.x * cr - ry * sr) * uFocal / rz;
    float sy = (P.x * sr + ry * cr) * uFocal / rz;
    gl_Position  = vec4(sx / (uRes.x * 0.5), sy / (uRes.y * 0.5), 0.0, 1.0);
    gl_PointSize = clamp(uDot * uFocal / rz * szv, 1.0, 26.0);
    float dep = 1.0 - 0.50 * smoothstep(uDist * 0.55, uDist * 1.50, rz);
    vCol = col;
    vA   = clamp(bri * dep, 0.0, 3.0);
}
`;

  const FLOWER_FRAG = `
precision highp float;
varying vec3  vCol;
varying float vA;
void main() {
    vec2  c = gl_PointCoord - 0.5;
    float d = length(c) * 2.0;
    float a = vA * (1.0 - smoothstep(0.5, 1.0, d));
    gl_FragColor = vec4(vCol * a, a);
}
`;

  function parseFlowerColor(s) {
    if (!s) return [0, 0, 0];
    let h = s.replace('#', '').trim();
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    h = h.padEnd(6, '0');
    return [
      parseInt(h.slice(0, 2), 16) / 255,
      parseInt(h.slice(2, 4), 16) / 255,
      parseInt(h.slice(4, 6), 16) / 255
    ];
  }

  function flowerMulberry32(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function flowerGauss(rnd) {
    const u1 = Math.max(1e-9, rnd());
    const u2 = rnd();
    const g = Math.sqrt(-2 * Math.log(u1)) * Math.cos(FLOWER_TAU * u2);
    return Math.max(-3, Math.min(3, g));
  }

  function flowerSampleU(rnd) {
    for (let i = 0; i < 24; i++) {
      const u = rnd();
      const w = Math.pow(Math.max(0, Math.sin(Math.PI * Math.pow(u, 0.85))), 0.55);
      if (rnd() < w) return u;
    }
    return rnd();
  }

  function compileFlowerShader(gl, type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return sh;
  }

  function initBloomingFlower() {
    const canvas = document.getElementById('dagerozFlowerCanvas');
    if (!canvas) return;

    if (!flowerGl) {
      flowerGl = canvas.getContext('webgl', {
        alpha: true,
        antialias: false,
        premultipliedAlpha: true,
        depth: false
      });
      if (!flowerGl) return;

      flowerProg = flowerGl.createProgram();
      flowerGl.attachShader(flowerProg, compileFlowerShader(flowerGl, flowerGl.VERTEX_SHADER, FLOWER_VERT));
      flowerGl.attachShader(flowerProg, compileFlowerShader(flowerGl, flowerGl.FRAGMENT_SHADER, FLOWER_FRAG));
      flowerGl.linkProgram(flowerProg);
      flowerGl.useProgram(flowerProg);

      flowerA_A = flowerGl.getAttribLocation(flowerProg, 'aA');
      flowerA_B = flowerGl.getAttribLocation(flowerProg, 'aB');
      const U = n => flowerGl.getUniformLocation(flowerProg, n);
      flowerUniforms = {
        res: U('uRes'),
        focal: U('uFocal'),
        dist: U('uDist'),
        pitch: U('uPitch'),
        roll: U('uRoll'),
        time: U('uTime'),
        dot: U('uDot'),
        bloom: U('uBloom'),
        stagger: U('uStagger'),
        petalLen: U('uPetalLen'),
        petals: U('uPetals'),
        coreR: U('uCoreR'),
        scatter: U('uScatter'),
        base: U('uBase'),
        stem: U('uStem'),
        accent: U('uAccent'),
        accentMix: U('uAccentMix')
      };

      flowerBuf = flowerGl.createBuffer();

      // Build Bloomed Geometry (Density 35 for silky 60fps)
      const P = 16, LN = 1, d = 35;
      const petalTotal = Math.max(600, Math.round(d * FLOWER_PETAL_PER_DENSITY));
      const coreTotal = Math.round(petalTotal * FLOWER_CORE_SHARE);
      const stemTotal = Math.round(petalTotal * FLOWER_STEM_SHARE);
      const petalHeadroom = P * LN;
      const total = petalTotal + petalHeadroom + coreTotal + stemTotal;
      const data = new Float32Array(total * 8);
      const rnd = flowerMulberry32(0x5eed10f);
      let p = 0;
      const push = (a0, a1, a2, a3, b0, b1, b2, b3) => {
        const o = p * 8;
        data[o] = a0; data[o + 1] = a1; data[o + 2] = a2; data[o + 3] = a3;
        data[o + 4] = b0; data[o + 5] = b1; data[o + 6] = b2; data[o + 7] = b3;
        p++;
      };

      const weights = [];
      let wSum = 0;
      for (let l = 0; l < LN; l++) {
        const w = 1 - (l / Math.max(1, LN)) * 0.45;
        weights.push(w);
        wSum += w;
      }

      for (let l = 0; l < LN; l++) {
        const ln = LN === 1 ? 0 : l / (LN - 1);
        const offset = (l * Math.PI) / P;
        const perLayer = Math.round((petalTotal * weights[l]) / wSum);
        const perPetal = Math.max(1, Math.round(perLayer / P));
        for (let k = 0; k < P; k++) {
          const phi = offset + (k * FLOWER_TAU) / P;
          for (let i = 0; i < perPetal; i++) {
            push(flowerSampleU(rnd), rnd() * 2 - 1, phi, ln, rnd(), flowerGauss(rnd), 0, 0);
          }
        }
      }

      for (let i = 0; i < coreTotal; i++) {
        push(Math.cbrt(rnd()), rnd() * FLOWER_TAU, rnd(), 0, rnd(), 0, 1, 0);
      }
      for (let i = 0; i < stemTotal; i++) {
        push(rnd(), rnd() * FLOWER_TAU, Math.pow(rnd(), 0.4), 0, rnd(), 0, 2, 0);
      }

      flowerCount = p;
      flowerGl.bindBuffer(flowerGl.ARRAY_BUFFER, flowerBuf);
      flowerGl.bufferData(flowerGl.ARRAY_BUFFER, data.subarray(0, p * 8), flowerGl.STATIC_DRAW);

      flowerGl.disable(flowerGl.DEPTH_TEST);
      flowerGl.enable(flowerGl.BLEND);
      flowerGl.blendFunc(flowerGl.ONE, flowerGl.ONE);
    }

    startBloomingFlower();
  }

  function resizeFlowerCanvas() {
    const canvas = document.getElementById('dagerozFlowerCanvas');
    if (!canvas || !flowerGl) return;
    const dpr = Math.min(window.devicePixelRatio || 1, FLOWER_DPR_CAP);
    const w = Math.max(1, Math.round(window.innerWidth * dpr));
    const h = Math.max(1, Math.round(window.innerHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    flowerGl.viewport(0, 0, w, h);
  }

  function startBloomingFlower() {
    if (flowerRunning) return;
    flowerRunning = true;
    flowerLast = performance.now();

    const baseCol = parseFlowerColor('#C4327E');
    const stemCol = parseFlowerColor('#2F7A4F');
    const accentCol = parseFlowerColor('#FFD98A');
    const dotWorld = (10 / 100) * FLOWER_DOT_AT_100;
    const windRate = (50 / 50) * FLOWER_WIND_AT_50;
    const tilt = 66;
    const distance = 2820;

    let flowerSyncStartTime = performance.now();

    const render = now => {
      if (!flowerRunning) return;
      flowerRaf = requestAnimationFrame(render);
      const dt = Math.min((now - flowerLast) / 1000, 0.05);
      flowerLast = now;

      resizeFlowerCanvas();
      const canvas = document.getElementById('dagerozFlowerCanvas');
      if (!canvas || !flowerGl) return;

      flowerTime = (flowerTime + dt * windRate) % 3600;

      const wDev = canvas.width;
      const hDev = canvas.height;
      const focal = hDev / (2 * Math.tan(((FLOWER_FOV / 2) * Math.PI) / 180));

      // 4 harmonic wave variations in shader under 1.0 second, synchronized with water ripple waves
      const surgeElapsed = now - flowerSyncStartTime;
      let syncDot = dotWorld;
      let syncDist = Math.max(400, distance);
      let syncScatter = FLOWER_SCATTER;

      if (surgeElapsed < 1000) {
        const normTime = surgeElapsed / 1000;
        // Exactly 4 oscillations in 1.0 second (8 * Math.PI)
        const surgeWave = Math.sin(8 * Math.PI * normTime);
        const damp = Math.pow(1 - normTime, 1.2);
        const surge = surgeWave * damp;

        syncDot = dotWorld * (1.0 + 0.65 * surge);
        syncDist = distance * (1.0 - 0.25 * surge);
        syncScatter = FLOWER_SCATTER * (1.0 + 0.75 * surge);
      }

      flowerGl.clearColor(0, 0, 0, 0);
      flowerGl.clear(flowerGl.COLOR_BUFFER_BIT);

      flowerGl.useProgram(flowerProg);
      flowerGl.uniform2f(flowerUniforms.res, wDev, hDev);
      flowerGl.uniform1f(flowerUniforms.focal, focal);
      flowerGl.uniform1f(flowerUniforms.dist, syncDist);
      flowerGl.uniform1f(flowerUniforms.pitch, (tilt * Math.PI) / 180);
      flowerGl.uniform1f(flowerUniforms.roll, FLOWER_ROLL);
      flowerGl.uniform1f(flowerUniforms.time, flowerTime);
      flowerGl.uniform1f(flowerUniforms.dot, syncDot);
      flowerGl.uniform1f(flowerUniforms.bloom, 1.0); // 100% Fully Bloomed Pixel Flower (Zero Bud)
      flowerGl.uniform1f(flowerUniforms.stagger, FLOWER_STAGGER);
      flowerGl.uniform1f(flowerUniforms.petalLen, FLOWER_PETAL_LEN);
      flowerGl.uniform1f(flowerUniforms.petals, 16.0);
      flowerGl.uniform1f(flowerUniforms.coreR, FLOWER_CORE_R);
      flowerGl.uniform1f(flowerUniforms.scatter, syncScatter);
      flowerGl.uniform3f(flowerUniforms.base, baseCol[0], baseCol[1], baseCol[2]);
      flowerGl.uniform3f(flowerUniforms.stem, stemCol[0], stemCol[1], stemCol[2]);
      flowerGl.uniform3f(flowerUniforms.accent, accentCol[0], accentCol[1], accentCol[2]);
      flowerGl.uniform1f(flowerUniforms.accentMix, 1.0);

      flowerGl.bindBuffer(flowerGl.ARRAY_BUFFER, flowerBuf);
      flowerGl.enableVertexAttribArray(flowerA_A);
      flowerGl.vertexAttribPointer(flowerA_A, 4, flowerGl.FLOAT, false, 32, 0);
      flowerGl.enableVertexAttribArray(flowerA_B);
      flowerGl.vertexAttribPointer(flowerA_B, 4, flowerGl.FLOAT, false, 32, 16);

      flowerGl.drawArrays(flowerGl.POINTS, 0, flowerCount);
    };

    flowerRaf = requestAnimationFrame(render);
  }

  function stopBloomingFlower() {
    flowerRunning = false;
    if (flowerRaf) cancelAnimationFrame(flowerRaf);
  }

  // =========================================================================
  // 11. APPLE "HELLO" CHOREOGRAPHY (Center Fullscreen -> Upper Shift -> Second Text)
  // =========================================================================
  let typewriterTimeoutId = null;
  let helloTypewriterTimeoutId = null;

  // Native Web Audio API Keystroke Sound Synthesizer & Mobile Haptic Vibration
  let typewriterAudioCtx = null;

  function playTypewriterClick(isAccent) {
    try {
      if (!typewriterAudioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) typewriterAudioCtx = new AudioContextClass();
      }
      if (typewriterAudioCtx && typewriterAudioCtx.state === 'suspended') {
        typewriterAudioCtx.resume();
      }
      if (typewriterAudioCtx && typewriterAudioCtx.state === 'running') {
        const now = typewriterAudioCtx.currentTime;
        const osc = typewriterAudioCtx.createOscillator();
        const gain = typewriterAudioCtx.createGain();

        // Crisp tactile mechanical keystroke (pitch between 850Hz and 1250Hz)
        // Authentic Apple MacBook keyboard sound that user noted was perfect
        const freq = isAccent ? 780 : (850 + Math.random() * 380);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Tactile click envelope: rapid attack and crisp 16ms exponential decay
        const peakGain = isAccent ? 0.050 : 0.042;
        gain.gain.setValueAtTime(peakGain, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.016);

        osc.connect(gain);
        gain.connect(typewriterAudioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.018);
      }
    } catch (e) {}

    // Tactile mobile haptic feedback (very gentle 4ms)
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(4);
      }
    } catch (e) {}
  }

  function runAppleIntroSequence() {
    const modal = document.getElementById('dagerozModal');
    const card = modal ? modal.querySelector('.dageroz-founder-card') : null;
    const intro = document.getElementById('dagerozAppleIntro');
    const content = document.getElementById('dagerozFounderContent');
    const stage = document.getElementById('appleHelloStage');
    const helloWord = document.getElementById('appleHelloWord');
    const helloCursor = document.getElementById('appleHelloCursor');
    const textEl = document.getElementById('appleTypewriterText');
    const textCursor = document.getElementById('appleTypewriterCursor');

    if (!intro || !content || !helloWord || !textEl || !stage) return;

    // Clear any pending timers
    if (typewriterTimeoutId) clearTimeout(typewriterTimeoutId);
    if (helloTypewriterTimeoutId) clearTimeout(helloTypewriterTimeoutId);

    // Initial state: Card transparent during intro so glowing flower shines on Z-Black, scroll to top
    if (card) {
      card.scrollTop = 0;
      card.classList.add('is-intro-playing');
    }
    intro.classList.remove('intro-complete');
    content.classList.remove('active');
    stage.classList.remove('is-shifted-up');

    // Ensure blooming flower canvas is actively rendering
    startBloomingFlower();

    // Prime Web Audio on replay gesture
    try {
      if (!typewriterAudioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) typewriterAudioCtx = new AudioContextClass();
      }
      if (typewriterAudioCtx && typewriterAudioCtx.state === 'suspended') {
        typewriterAudioCtx.resume();
      }
    } catch (e) {}

    helloWord.textContent = '';
    textEl.textContent = '';
    if (helloCursor) helloCursor.style.display = 'inline-block';
    if (textCursor) textCursor.style.display = 'none';

    // STAGE 1: Large "hello" typed in the absolute center of the full screen
    // Each character plays the crisp click sound at smooth 115ms cadence (preserved as requested)
    const helloStr = "hello.";
    let helloIdx = 0;

    function typeHelloChar() {
      if (helloIdx < helloStr.length) {
        helloWord.textContent += helloStr.charAt(helloIdx);
        helloIdx++;
        playTypewriterClick(helloIdx === helloStr.length);
        helloTypewriterTimeoutId = setTimeout(typeHelloChar, 115); // Deliberate, smooth Apple cadence
      } else {
        // "hello." is now completely typed in the center of the full page!
        // STAGE 2: Pause in center to let user admire the moment (850ms)
        helloTypewriterTimeoutId = setTimeout(function () {
          // STAGE 3: Smoothly glide "hello" up to the upper side
          stage.classList.add('is-shifted-up');

          // STAGE 4: After glide finishes (~750ms), switch cursor and type the second message
          helloTypewriterTimeoutId = setTimeout(function () {
            if (helloCursor) helloCursor.style.display = 'none';
            if (textCursor) textCursor.style.display = 'inline-block';
            startSecondTypingText();
          }, 450);
        }, 850);
      }
    }

    function startSecondTypingText() {
      const message = "We are college student freelancers crafting high-performance digital platforms between lectures.";
      let charIdx = 0;

      function typeChar() {
        if (charIdx < message.length) {
          const char = message.charAt(charIdx);
          textEl.textContent += char;
          charIdx++;

          // USER DIRECTIVE: Make sound on every WORD instead of every character on the next line!
          // Word begins at first char of message, or when previous character was space or hyphen
          const isFirstChar = (charIdx === 1);
          const isStartOfNewWord = (charIdx > 1 && (message.charAt(charIdx - 2) === ' ' || message.charAt(charIdx - 2) === '-') && char !== ' ');
          const isFinalPunctuation = (charIdx === message.length && (char === '.' || char === '!'));

          if (isFirstChar || isStartOfNewWord || isFinalPunctuation) {
            playTypewriterClick(isFinalPunctuation);
          }

          // Natural human typing micro-variations (smooth characters, distinct rhythm per word)
          const delay = (char === ' ' || char === '-') ? 52 : (26 + Math.random() * 8);
          typewriterTimeoutId = setTimeout(typeChar, delay);
        } else {
          // STAGE 5: Pause (1200ms) to read, then reveal the founders dossier seamlessly
          typewriterTimeoutId = setTimeout(showFounderProfile, 1200);
        }
      }

      typeChar();
    }

    // Begin typing "hello." centered after modal open transition
    helloTypewriterTimeoutId = setTimeout(typeHelloChar, 280);
  }

  function showFounderProfile() {
    const modal = document.getElementById('dagerozModal');
    const card = modal ? modal.querySelector('.dageroz-founder-card') : null;
    const intro = document.getElementById('dagerozAppleIntro');
    const content = document.getElementById('dagerozFounderContent');

    if (typewriterTimeoutId) clearTimeout(typewriterTimeoutId);
    if (helloTypewriterTimeoutId) clearTimeout(helloTypewriterTimeoutId);

    if (card) {
      card.classList.remove('is-intro-playing');
      card.scrollTop = 0;
    }
    if (intro) intro.classList.add('intro-complete');
    if (content) content.classList.add('active');
  }

  function openDagerozModal() {
    const modal = document.getElementById('dagerozModal');
    if (!modal) return;

    // Prime Web Audio on user gesture
    try {
      if (!typewriterAudioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) typewriterAudioCtx = new AudioContextClass();
      }
      if (typewriterAudioCtx && typewriterAudioCtx.state === 'suspended') {
        typewriterAudioCtx.resume();
      }
    } catch (e) {}

    modal.classList.add('active');
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    // Start WebGL Bloomed Flower on Z-Black background
    initBloomingFlower();

    // Start sequential Apple "hello" typing animation
    runAppleIntroSequence();

    const closeBtn = document.getElementById('dagerozCloseBtn');
    if (closeBtn) closeBtn.focus();
  }

  function closeDagerozModal() {
    const modal = document.getElementById('dagerozModal');
    if (!modal) return;

    if (typewriterTimeoutId) clearTimeout(typewriterTimeoutId);
    if (helloTypewriterTimeoutId) clearTimeout(helloTypewriterTimeoutId);

    stopBloomingFlower();

    modal.classList.remove('active');
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  function initDagerozModalEvents() {
    const modal = document.getElementById('dagerozModal');
    if (!modal) return;

    // 1. Direct Bind: Top-Right Close Button
    const closeBtn = document.getElementById('dagerozCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeDagerozModal();
      });
    }

    // 2. Direct Bind: Backdrop Click
    const backdrop = document.getElementById('dagerozBackdrop');
    if (backdrop) {
      backdrop.addEventListener('click', function (e) {
        if (e.target === backdrop) {
          closeDagerozModal();
        }
      });
    }

    // 3. Direct Bind: Skip to Founders Button during intro
    const skipBtn = document.getElementById('dagerozSkipIntro') || document.getElementById('dagerozSkipIntroBtn');
    if (skipBtn) {
      skipBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        showFounderProfile();
      });
    }

    // 4. Direct Bind: Replay Intro Button
    const replayBtn = document.getElementById('dagerozReplayIntro');
    if (replayBtn) {
      replayBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        runAppleIntroSequence();
      });
    }

    // 5. Direct Bind: Footer "Back to School Portal" Button
    const footerClose = document.getElementById('dagerozFooterClose');
    if (footerClose) {
      footerClose.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeDagerozModal();
      });
    }

    // 6. Direct Bind: All generic return buttons
    const returnBtns = modal.querySelectorAll('.founder-return-btn, .founder-close-link-btn');
    returnBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeDagerozModal();
      });
    });

    // 7. Event Delegation on the Modal container: guarantees ANY click on Replay or Close works
    modal.addEventListener('click', function (e) {
      const target = e.target;
      if (!target) return;

      const replayEl = target.closest('#dagerozReplayIntro, .replay-intro-btn');
      if (replayEl) {
        e.preventDefault();
        e.stopPropagation();
        runAppleIntroSequence();
        return;
      }

      const closeEl = target.closest('#dagerozFooterClose, #dagerozCloseBtn, .founder-close-link-btn, .founder-return-btn, .dageroz-close-btn');
      if (closeEl) {
        e.preventDefault();
        e.stopPropagation();
        closeDagerozModal();
        return;
      }

      const skipEl = target.closest('#dagerozSkipIntro, #dagerozSkipIntroBtn, .dageroz-skip-intro-btn');
      if (skipEl) {
        e.preventDefault();
        e.stopPropagation();
        showFounderProfile();
        return;
      }
    });

    // 8. ESC Key to close modal
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeDagerozModal();
      }
    });
  }

  // =========================================================================
  // Eye gallery discarded per user request

  function initLiquidGlassHeader() {
    if (window.innerWidth <= 768) return; // Dedicated mobile Dynamic Island handles mobile; do not poll scroll
    const header = document.querySelector('.dps-header');
    if (!header) return;

    let isScrolled = false;
    let ticking = false;

    function handleScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        const shouldBeScrolled = (window.scrollY || window.pageYOffset) > 20;
        if (shouldBeScrolled !== isScrolled) {
          isScrolled = shouldBeScrolled;
          if (isScrolled) {
            header.classList.add('is-scrolled');
          } else {
            header.classList.remove('is-scrolled');
          }
        }
        ticking = false;
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  function initLaptopMegaMenu() {
    const trigger = document.getElementById('dpsMegaMenuTrigger');
    const overlay = document.getElementById('dpsMegaMenu');
    const closeBtn = document.getElementById('dpsMegaCloseBtn');
    const backdrop = document.getElementById('dpsMegaBackdrop');

    if (!overlay) return;

    function openMenu() {
      overlay.removeAttribute('hidden');
      overlay.style.display = 'flex';
      requestAnimationFrame(function () {
        overlay.classList.add('active');
      });
      document.body.classList.add('dps-menu-active');
      document.querySelectorAll('#dpsMegaMenuTrigger, .dps-mega-trigger-pill').forEach(function (btn) {
        btn.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        const label = btn.querySelector('.trigger-label');
        const icon = btn.querySelector('.trigger-icon');
        if (label) label.textContent = 'Close';
        if (icon) icon.innerHTML = '&times;';
      });
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      overlay.classList.remove('active');
      document.body.classList.remove('dps-menu-active');
      document.querySelectorAll('#dpsMegaMenuTrigger, .dps-mega-trigger-pill').forEach(function (btn) {
        btn.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        const label = btn.querySelector('.trigger-label');
        const icon = btn.querySelector('.trigger-icon');
        if (label) label.textContent = 'Menu';
        if (icon) icon.innerHTML = '&#9776;';
      });
      // Reset mobile accordions to clean closed 2x2 grid
      overlay.querySelectorAll('.dps-mega-col.is-open').forEach(function (c) {
        c.classList.remove('is-open');
        const h = c.querySelector('.mega-col-heading');
        if (h) h.setAttribute('aria-expanded', 'false');
      });
      document.body.style.overflow = '';
      setTimeout(function () {
        if (!overlay.classList.contains('active')) {
          overlay.setAttribute('hidden', '');
          overlay.style.display = 'none';
        }
      }, 220);
    }

    function toggleMenu(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (overlay.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    // Attach single unified toggle handler to all menu triggers
    document.querySelectorAll('#dpsMegaMenuTrigger, .dps-mega-trigger-pill, .mobile-nav-toggle').forEach(function (btn) {
      btn.addEventListener('click', toggleMenu);
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        closeMenu();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeMenu);
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeMenu();
      }
    });

    // Close when clicking any link inside the menu
    const menuLinks = overlay.querySelectorAll('.mega-link-list a, .mega-footer-actions a');
    menuLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // =========================================================================
    // DYNAMIC ISLAND INTERACTION & GESTURE SUITE (Mobile & Touch)
    // "if person tap on logo it redirected to home and if slides the menu should open and it should work as dynamic island"
    // =========================================================================
    const dynamicIsland = document.querySelector('.header-left-group');
    const brands = document.querySelectorAll('.dps-brand');
    const megaCard = overlay.querySelector('.dps-mega-card');

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isSlidingGesture = false;
    let isTouchingIsland = false;

    // 1. Guaranteed Tap on Logo -> Redirect to Home
    brands.forEach(function (brand) {
      brand.addEventListener('click', function (e) {
        if (isSlidingGesture) {
          // Slide gesture was performed: suppress navigation
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        // If deliberately tapped, navigate directly to index.html (or scroll to top if already there)
        const currentPath = window.location.pathname.replace(/\\/g, '/');
        const isHomePage = currentPath.endsWith('index.html') ||
                           currentPath.endsWith('/') ||
                           currentPath === '';
        if (isHomePage) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.location.href = 'index.html';
        }
      });
    });

    // 2. Slide / Swipe Gesture on Dynamic Island Capsule
    if (dynamicIsland) {
      dynamicIsland.addEventListener('touchstart', function (e) {
        if (e.touches.length !== 1) return;
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchStartTime = Date.now();
        isTouchingIsland = true;
        isSlidingGesture = false;
      }, { passive: true });

      dynamicIsland.addEventListener('touchmove', function (e) {
        if (!isTouchingIsland || e.touches.length !== 1) return;
        const touch = e.touches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;

        // Slide detection: pull down (> 12px) or swipe horizontally (> 16px)
        if (deltaY > 12 || Math.abs(deltaX) > 16) {
          isSlidingGesture = true;
          // Fluid Dynamic Island stretch physics before opening
          if (!overlay.classList.contains('active')) {
            const pullDown = Math.min(Math.max(deltaY, 0) * 0.35, 14);
            dynamicIsland.style.transform = 'translateX(-50%) translateY(' + pullDown + 'px) scale(' + (1 + pullDown * 0.005) + ')';
          }
        }
      }, { passive: true });

      dynamicIsland.addEventListener('touchend', function (e) {
        if (!isTouchingIsland) return;
        isTouchingIsland = false;
        dynamicIsland.style.transform = '';

        if (isSlidingGesture) {
          // Slide gesture detected! Open Dynamic Island menu!
          if (!overlay.classList.contains('active')) {
            openMenu();
          }
          // Prevent tap/click event from firing on logo
          setTimeout(function () {
            isSlidingGesture = false;
          }, 200);
        }
      });

      dynamicIsland.addEventListener('touchcancel', function () {
        isTouchingIsland = false;
        isSlidingGesture = false;
        dynamicIsland.style.transform = '';
      });
    }

    // 3. Swipe Up on Menu Card to Collapse back into Dynamic Island
    if (megaCard) {
      let cardTouchStartY = 0;
      megaCard.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) {
          cardTouchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      megaCard.addEventListener('touchend', function (e) {
        if (e.changedTouches.length === 1) {
          const deltaY = e.changedTouches[0].clientY - cardTouchStartY;
          // Swipe up gesture near top of menu card collapses menu
          if (deltaY < -45 && megaCard.scrollTop <= 8) {
            closeMenu();
          }
        }
      }, { passive: true });
    }

    // Dark Mode Permanently Removed (Light Luxury Glass Theme Enforced)
    try {
      localStorage.removeItem('dps_theme');
      document.documentElement.classList.remove('dark-theme');
      document.body.classList.remove('dark-theme');
    } catch (e) {}

    // =========================================================================
    // MOBILE ACCORDION / EXPANDABLE BUTTONS (REFERENCE MATCHING 01-04 PILLS)
    // Mobile view only: turns each column into a frosted expandable pill button
    // =========================================================================
    function initMobileMenuAccordions() {
      const cols = overlay.querySelectorAll('.dps-mega-col');
      if (!cols.length) return;

      cols.forEach(function (col) {
        const heading = col.querySelector('.mega-col-heading');
        const list = col.querySelector('.mega-link-list');
        if (!heading || !list) return;

        // Ensure left group structure: num + title
        if (!heading.querySelector('.mega-col-left')) {
          const num = heading.querySelector('.mega-col-num');
          const title = heading.querySelector('.mega-col-title');
          const leftWrap = document.createElement('div');
          leftWrap.className = 'mega-col-left';
          if (num) leftWrap.appendChild(num);
          if (title) leftWrap.appendChild(title);
          heading.insertBefore(leftWrap, heading.firstChild);
        }

        // Add count badge + caret if not present
        if (!heading.querySelector('.mega-col-meta')) {
          const count = list.querySelectorAll('li').length;
          const meta = document.createElement('div');
          meta.className = 'mega-col-meta';
          meta.innerHTML = '<span class="mega-col-count">' + count + '</span>' +
            '<span class="mega-col-caret" aria-hidden="true">&#9662;</span>';
          heading.appendChild(meta);
        }

        heading.setAttribute('role', 'button');
        heading.setAttribute('tabindex', '0');
        heading.setAttribute('aria-expanded', 'false');

        // Toggle mobile accordion on tap / click
        heading.addEventListener('click', function (e) {
          if (window.innerWidth > 768) return; // Desktop remains full 4-col directory
          e.preventDefault();
          e.stopPropagation();

          const wasOpen = col.classList.contains('is-open');

          // Close other columns so only one clean drawer is open
          cols.forEach(function (otherCol) {
            if (otherCol !== col) {
              otherCol.classList.remove('is-open');
              const otherH = otherCol.querySelector('.mega-col-heading');
              if (otherH) otherH.setAttribute('aria-expanded', 'false');
            }
          });

          col.classList.toggle('is-open', !wasOpen);
          heading.setAttribute('aria-expanded', !wasOpen ? 'true' : 'false');
        });

        // Accessibility: Enter and Space triggers click
        heading.addEventListener('keydown', function (e) {
          if (window.innerWidth > 768) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            heading.click();
          }
        });
      });
    }

    initMobileMenuAccordions();
  }

  // Initialize all editorial frame controllers on DOM ready
  
  // =========================================================================
  // APPLE / GOOGLE / META STYLE MOBILE BOTTOM NAVIGATION DOCK
  // Most-used primary destinations at thumb-reach; clean minimal header on top
  // =========================================================================
  function initMobileBottomDock() {
    if (document.getElementById('mobileBottomDock')) return;

    const dock = document.createElement('nav');
    dock.id = 'mobileBottomDock';
    dock.className = 'mobile-bottom-dock';
    dock.setAttribute('aria-label', 'Primary Mobile Navigation');

    const path = window.location.pathname.toLowerCase();
    const isHome = path.endsWith('index.html') || path === '/' || path.endsWith('/');
    const isAcademics = path.includes('academics');
    const isAdmissions = path.includes('admissions');
    const isGallery = path.includes('gallery');
    const isContact = path.includes('contact');

    dock.innerHTML = `
      <a href="index.html" class="dock-tab-item ${isHome ? 'is-active' : ''}" data-tab="home" aria-label="Home">
        <div class="dock-tab-icon-wrap">
          <svg class="dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <span class="dock-tab-label">Home</span>
      </a>

      <a href="academics.html" class="dock-tab-item ${isAcademics ? 'is-active' : ''}" data-tab="academics" aria-label="Academics">
        <div class="dock-tab-icon-wrap">
          <svg class="dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
          </svg>
        </div>
        <span class="dock-tab-label">Academics</span>
      </a>

      <a href="admissions.html" class="dock-tab-item dock-tab-primary ${isAdmissions ? 'is-active' : ''}" data-tab="admissions" aria-label="Admissions">
        <div class="dock-tab-icon-wrap dock-icon-primary">
          <svg class="dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
        </div>
        <span class="dock-tab-label">Apply Now</span>
      </a>

      <a href="gallery.html" class="dock-tab-item ${isGallery ? 'is-active' : ''}" data-tab="gallery" aria-label="Photo Gallery">
        <div class="dock-tab-icon-wrap">
          <svg class="dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        </div>
        <span class="dock-tab-label">Gallery</span>
      </a>

      <a href="contact.html" class="dock-tab-item ${isContact ? 'is-active' : ''}" data-tab="contact" aria-label="Contact">
        <div class="dock-tab-icon-wrap">
          <svg class="dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </div>
        <span class="dock-tab-label">Contact</span>
      </a>
    `;

    document.body.appendChild(dock);
  }

document.addEventListener('DOMContentLoaded', function () {
    initMobileBottomDock();
    initHeroControls();
    initImageModeSwitcher();
    initPillFaq();
    initSubscribeForm();
    initInspireHeroSlider();
    initDagerozDraggableButton();
    initDagerozModalEvents();
    initLaptopMegaMenu();
    initLiquidGlassHeader();
    initUniversalMobileDrawers();

  // Universal Mobile Category Drawer Controller (Liquid Glass Mega-Style)
  function initUniversalMobileDrawers() {
    const drawers = [
      { toggleId: 'scrapbookCategoryToggle', drawerId: 'scrapbookMobileDrawer', barId: 'scrapbookFilterBar', labelId: 'smctActiveCategoryLabel' },
      { toggleId: 'facCategoryToggle', drawerId: 'facMobileDrawer', barId: 'facFilterBar', labelId: 'facActiveCategoryLabel' },
      { toggleId: 'acadCategoryToggle', drawerId: 'acadMobileDrawer', barId: 'acadFilterBar', labelId: 'acadActiveCategoryLabel' }
    ];

    drawers.forEach(function (d) {
      const toggle = document.getElementById(d.toggleId);
      const drawer = document.getElementById(d.drawerId);
      const bar = document.getElementById(d.barId);
      const label = document.getElementById(d.labelId);

      if (!toggle || !drawer || !bar) return;

      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        const isOpen = drawer.classList.contains('is-open');
        if (isOpen) {
          drawer.classList.remove('is-open');
          bar.classList.remove('is-drawer-open');
          toggle.setAttribute('aria-expanded', 'false');
        } else {
          drawer.classList.add('is-open');
          bar.classList.add('is-drawer-open');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });

      // Close when clicking any link/btn inside bar
      bar.querySelectorAll('a, button').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (label) {
            const labelText = btn.querySelector('.btn-tab-label') ? btn.querySelector('.btn-tab-label').textContent.trim() : btn.textContent.trim();
            const countText = btn.querySelector('.btn-tab-count') ? btn.querySelector('.btn-tab-count').textContent.trim() : '';
            label.textContent = labelText + (countText ? ' (' + countText + ')' : '');
          }
          drawer.classList.remove('is-open');
          bar.classList.remove('is-drawer-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });

      // Close on outside tap
      document.addEventListener('click', function (e) {
        if (!drawer.contains(e.target) && !bar.contains(e.target) && drawer.classList.contains('is-open')) {
          drawer.classList.remove('is-open');
          bar.classList.remove('is-drawer-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

    // Eye gallery discarded per user request
  });

})();
