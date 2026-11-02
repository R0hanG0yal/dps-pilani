/**
 * Polaroid Line Carousel — Instant photos pegged to a sagging string.
 * Vanilla JavaScript implementation ported from React/Originkit Architecture.
 * Durga Public School, Pilani, Rajasthan
 *
 * Drag the line (or use the arrows) and the prints slide along it, swinging on their
 * pegs with the speed you give them and settling back with a little overshoot; even
 * at rest they sway in a light breeze. The one in the middle is the active card.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.PolaroidLineCarousel = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function wrap(i, n) {
    return n ? ((i % n) + n) % n : 0;
  }

  function clamp(v, a, b) {
    return Math.min(b, Math.max(a, v));
  }

  function stringY(x, w, y0, sag) {
    const t = clamp(x / w, 0, 1);
    return y0 + 4 * sag * t * (1 - t);
  }

  function springStep(x, v, target, dt, k) {
    if (k === undefined) k = 70;
    const c = 2 * Math.sqrt(k);
    const nv = v + (k * (target - x) - c * v) * dt;
    return [x + nv * dt, nv];
  }

  function swingStep(a, w, lineVel, dt, gain) {
    const nw = w + (-38 * a - 4.2 * w + lineVel * 0.0034 * gain) * dt;
    return [clamp(a + nw * dt, -0.6, 0.6), nw];
  }

  function nearestAt(off, spacing, n) {
    return clamp(Math.round(off / spacing), 0, Math.max(0, n - 1));
  }

  function pad2(n) {
    return n < 10 ? '0' + n : String(n);
  }

  /* ------------------------------------------------ painted images fallback */

  const PALETTES = {
    dawn: { top: '#e7b7a5', bottom: '#f8e8d6', sun: '#fff4df', far: '#d2b2bb', near: '#3a2a3b', mist: '255,240,232' },
    alpine: { top: '#7ea5c8', bottom: '#e3ecf2', sun: '#ffffff', far: '#a9bfd0', near: '#1c3044', mist: '236,244,250' },
    dusk: { top: '#2a2450', bottom: '#ef8d60', sun: '#ffd9a6', far: '#93607c', near: '#18121f', mist: '255,196,160' },
    mist: { top: '#c4d0cb', bottom: '#eef1ec', sun: '#ffffff', far: '#aebcb5', near: '#2c3a33', mist: '246,248,245' }
  };

  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function hexRgb(h) {
    const v = parseInt(h.replace('#', ''), 16);
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  }

  function mixRgb(a, b, t) {
    const A = hexRgb(a);
    const B = hexRgb(b);
    return 'rgb(' + A.map(function (v, i) { return Math.round(v + (B[i] - v) * t); }).join(',') + ')';
  }

  function paintLandscape(seed, palette, w, h) {
    if (typeof document === 'undefined') return '';
    if (!w) w = 1200;
    if (!h) h = 800;
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const g = c.getContext('2d');
    if (!g) return '';
    const P = PALETTES[palette] || PALETTES.dawn;
    const r = mulberry32(seed * 104729 + 7);

    const sky = g.createLinearGradient(0, 0, 0, h * 0.72);
    sky.addColorStop(0, P.top);
    sky.addColorStop(1, P.bottom);
    g.fillStyle = sky;
    g.fillRect(0, 0, w, h);
    const sx = w * (0.22 + r() * 0.56);
    const sy = h * (0.26 + r() * 0.16);
    const halo = g.createRadialGradient(sx, sy, 0, sx, sy, w * 0.45);
    halo.addColorStop(0, 'rgba(' + hexRgb(P.sun).join(',') + ',.85)');
    halo.addColorStop(0.08, 'rgba(' + hexRgb(P.sun).join(',') + ',.55)');
    halo.addColorStop(1, 'rgba(' + hexRgb(P.sun).join(',') + ',0)');
    g.fillStyle = halo;
    g.fillRect(0, 0, w, h);
    g.fillStyle = P.sun;
    g.beginPath();
    g.arc(sx, sy, h * 0.045, 0, Math.PI * 2);
    g.fill();

    const layers = 5;
    for (let L = 0; L < layers; L++) {
      const k = L / (layers - 1);
      const base = h * (0.42 + k * 0.4);
      const amp = h * (0.07 + k * 0.1);
      const ph = [r(), r(), r(), r()].map(function (v) { return v * Math.PI * 2; });
      const fr = [1.3 + r(), 3.1 + r() * 2, 7 + r() * 4, 17 + r() * 8];
      const ridge = function (x) {
        const u = x / w;
        return (
          base -
          amp *
            (0.55 * Math.sin(u * fr[0] + ph[0]) +
              0.28 * Math.sin(u * fr[1] + ph[1]) +
              0.12 * Math.abs(Math.sin(u * fr[2] + ph[2])) +
              0.05 * Math.sin(u * fr[3] + ph[3]))
        );
      };
      const mist = g.createLinearGradient(0, base - amp * 1.4, 0, base + amp * 0.4);
      mist.addColorStop(0, 'rgba(' + P.mist + ',0)');
      mist.addColorStop(1, 'rgba(' + P.mist + ',' + (0.55 - k * 0.35).toFixed(2) + ')');
      g.fillStyle = mist;
      g.fillRect(0, base - amp * 1.4, w, amp * 1.8);
      const body = g.createLinearGradient(0, base - amp, 0, h);
      body.addColorStop(0, mixRgb(P.far, P.near, Math.pow(k, 1.3)));
      body.addColorStop(1, mixRgb(P.far, P.near, Math.min(1, Math.pow(k, 1.3) + 0.18)));
      g.fillStyle = body;
      g.beginPath();
      g.moveTo(0, h);
      for (let x = 0; x <= w; x += 6) g.lineTo(x, ridge(x));
      g.lineTo(w, h);
      g.closePath();
      g.fill();
    }

    const vig = g.createRadialGradient(w / 2, h * 0.45, h * 0.3, w / 2, h / 2, w * 0.78);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(0,0,0,.32)');
    g.fillStyle = vig;
    g.fillRect(0, 0, w, h);

    return c.toDataURL('image/jpeg', 0.88);
  }

  const DEFAULT_OPTIONS = {
    slides: [],
    height: '100%',
    cardWidth: 280,
    sag: 44,
    swing: 1,
    autoplay: 4500,
    string: '#8a7f72',
    background: '#FAF8F4',
    ink: '#2E0815',
    containFit: false,
    onChange: null,
    onSlideClick: null,
    ariaLabel: 'Polaroid photo carousel'
  };

  function PolaroidLineCarousel(container, options) {
    if (!container) return;
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) return;

    this.opts = Object.assign({}, DEFAULT_OPTIONS, options || {});
    this.slides = (this.opts.slides || []).map(function (s, i) {
      return Object.assign({
        palette: s.palette || 'dawn',
        seed: s.seed !== undefined ? s.seed : (i + 1)
      }, s, {
        image: s.image || s.src || s.fullImage || '',
        title: s.title || '',
        caption: s.caption || s.sub || s.desc || '',
        note: s.note || s.newspaper || s.tag || s.title || '',
        alt: s.alt || s.title || '',
        raw: s
      });
    });

    this.n = this.slides.length;
    if (this.n === 0) return;

    this.active = 0;
    this.activeRef = 0;
    this.dragging = false;
    this.size = { w: 1200, h: 600, cw: this.opts.cardWidth };
    this.sim = {
      off: 0,
      vel: 0,
      target: 0,
      a: new Float64Array(this.n),
      w: new Float64Array(this.n)
    };
    this.drag = null;
    this.lastTouch = performance.now();
    this.visible = true;
    this.rafId = 0;
    this.autoplayTimer = null;
    this.cards = [];

    this.init();
  }

  PolaroidLineCarousel.prototype.init = function () {
    this.buildDOM();
    this.updateSizes();
    this.bindEvents();
    this.startSimulation();
    this.startAutoplay();
  };

  PolaroidLineCarousel.prototype.buildDOM = function () {
    this.container.innerHTML = '';
    this.root = document.createElement('div');
    this.root.className = 'pl-root' + (this.opts.className ? ' ' + this.opts.className : '');
    this.root.setAttribute('data-drag', '0');
    this.root.setAttribute('role', 'region');
    this.root.setAttribute('aria-roledescription', 'carousel');
    this.root.setAttribute('aria-label', this.opts.ariaLabel);
    this.root.setAttribute('tabindex', '0');

    this.root.style.setProperty('--pl-bg', this.opts.background);
    this.root.style.setProperty('--pl-ink', this.opts.ink);
    this.root.style.setProperty('--pl-muted', 'color-mix(in srgb, var(--pl-ink) 55%, transparent)');
    this.root.style.setProperty('--pl-line', 'color-mix(in srgb, var(--pl-ink) 18%, transparent)');
    this.root.style.setProperty('--pl-cw', this.opts.cardWidth + 'px');

    if (this.opts.height) {
      this.root.style.height = typeof this.opts.height === 'number' ? (this.opts.height + 'px') : this.opts.height;
    }

    // SVG String
    const svgNS = 'http://www.w3.org/2000/svg';
    this.svg = document.createElementNS(svgNS, 'svg');
    this.svg.setAttribute('class', 'pl-string');
    this.svg.setAttribute('aria-hidden', 'true');

    this.path = document.createElementNS(svgNS, 'path');
    this.path.setAttribute('fill', 'none');
    this.path.setAttribute('stroke', this.opts.string);
    this.path.setAttribute('stroke-width', '1.8');
    this.path.setAttribute('stroke-linecap', 'round');
    this.svg.appendChild(this.path);
    this.root.appendChild(this.svg);

    // Cards
    this.cards = [];
    const self = this;
    this.slides.forEach(function (sl, i) {
      const card = document.createElement('div');
      card.className = 'pl-card';
      card.setAttribute('data-i', String(i));
      card.setAttribute('data-on', i === self.active ? '1' : '0');
      if (i !== self.active) card.setAttribute('aria-hidden', 'true');

      const print = document.createElement('div');
      print.className = 'pl-print';

      const shot = document.createElement('div');
      shot.className = 'pl-shot' + (self.opts.containFit ? ' pl-shot-contain' : '');

      let imgSrc = sl.image;
      if (!imgSrc) {
        imgSrc = paintLandscape(sl.seed, sl.palette, 900, 700);
      }

      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = sl.alt || sl.title || '';
      img.draggable = false;
      img.loading = i < 4 ? 'eager' : 'lazy';
      img.decoding = 'async';
      shot.appendChild(img);

      const note = document.createElement('div');
      note.className = 'pl-note';
      note.textContent = sl.note || sl.title || '';

      print.appendChild(shot);
      print.appendChild(note);

      const peg = document.createElement('div');
      peg.className = 'pl-peg';

      card.appendChild(print);
      card.appendChild(peg);

      self.root.appendChild(card);
      self.cards.push(card);
    });

    // Liquid Glass Floating Controls Dock at bottom
    this.dock = document.createElement('div');
    this.dock.className = 'pl-dock pl-bar';
    this.bar = this.dock;

    // 1. Liquid Glass Caption / Story Card
    this.capPill = document.createElement('div');
    this.capPill.className = 'pl-cap-pill';

    this.cap = document.createElement('div');
    this.cap.className = 'pl-cap';
    this.cap.setAttribute('aria-hidden', 'true');
    this.capPill.appendChild(this.cap);
    this.dock.appendChild(this.capPill);

    // 2. Liquid Glass Separated Navigation Pod
    this.navPod = document.createElement('div');
    this.navPod.className = 'pl-nav-pod';

    // 2a. Standalone Liquid Glass Counter Capsule
    this.countEl = document.createElement('div');
    this.countEl.className = 'pl-count-capsule pl-count';
    this.countEl.setAttribute('aria-hidden', 'true');
    this.navPod.appendChild(this.countEl);

    // 2b. Standalone Liquid Glass Circular Prev Button
    this.prevBtn = document.createElement('button');
    this.prevBtn.type = 'button';
    this.prevBtn.className = 'pl-btn pl-btn-prev';
    this.prevBtn.setAttribute('aria-label', 'Previous photo');
    this.prevBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';
    this.navPod.appendChild(this.prevBtn);

    // 2c. Standalone Liquid Glass Circular Next Button
    this.nextBtn = document.createElement('button');
    this.nextBtn.type = 'button';
    this.nextBtn.className = 'pl-btn pl-btn-next';
    this.nextBtn.setAttribute('aria-label', 'Next photo');
    this.nextBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>';
    this.navPod.appendChild(this.nextBtn);

    this.dock.appendChild(this.navPod);
    this.root.appendChild(this.dock);

    // 3. Floating Liquid Glass Stage Flank Paddles (Left & Right)
    this.flankPrev = document.createElement('button');
    this.flankPrev.type = 'button';
    this.flankPrev.className = 'pl-flank-arrow prev';
    this.flankPrev.setAttribute('aria-label', 'Previous photo');
    this.flankPrev.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';
    this.root.appendChild(this.flankPrev);

    this.flankNext = document.createElement('button');
    this.flankNext.type = 'button';
    this.flankNext.className = 'pl-flank-arrow next';
    this.flankNext.setAttribute('aria-label', 'Next photo');
    this.flankNext.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>';
    this.root.appendChild(this.flankNext);

    // Screen reader live status
    this.srEl = document.createElement('div');
    this.srEl.className = 'pl-sr';
    this.srEl.setAttribute('aria-live', 'polite');
    this.root.appendChild(this.srEl);

    this.container.appendChild(this.root);
    this.updateCaption();
  };

  PolaroidLineCarousel.prototype.updateSizes = function () {
    if (!this.root) return;
    const r = this.root.getBoundingClientRect();
    const w = r.width || 1200;
    const h = r.height || 600;
    const targetWidth = this.opts.cardWidth || 280;
    const cw = Math.round(Math.max(160, Math.min(targetWidth, w * 0.44, h * 0.52)));

    this.size = { w: w, h: h, cw: cw };
    this.spacing = cw * 1.08;
    this.root.style.setProperty('--pl-cw', cw + 'px');

    this.sim.target = this.activeRef * this.spacing;
    this.sim.off = this.activeRef * this.spacing;
  };

  PolaroidLineCarousel.prototype.updateCaption = function () {
    const sl = this.slides[this.active] || {};
    this.cap.innerHTML = '';

    if (sl.title) {
      const titleSpan = document.createElement('span');
      titleSpan.className = 'pl-title';
      titleSpan.textContent = sl.title;
      this.cap.appendChild(titleSpan);
    }
    if (sl.caption) {
      const subSpan = document.createElement('span');
      subSpan.className = 'pl-sub';
      subSpan.innerHTML = sl.caption;
      this.cap.appendChild(subSpan);
    }

    this.countEl.innerHTML = '<b>' + pad2(this.active + 1) + '</b> / ' + pad2(this.n);
    this.srEl.textContent = 'Print ' + (this.active + 1) + ' of ' + this.n + (sl.title ? ': ' + sl.title : '');

    // Update active attribute on cards
    const self = this;
    this.cards.forEach(function (card, i) {
      if (i === self.active) {
        card.setAttribute('data-on', '1');
        card.removeAttribute('aria-hidden');
      } else {
        card.setAttribute('data-on', '0');
        card.setAttribute('aria-hidden', 'true');
      }
    });

    if (typeof this.opts.onChange === 'function') {
      this.opts.onChange(this.active);
    }
  };

  PolaroidLineCarousel.prototype.goTo = function (i) {
    this.sim.target = clamp(i, 0, this.n - 1) * this.spacing;
  };

  PolaroidLineCarousel.prototype.step = function (dir) {
    this.lastTouch = performance.now();
    this.goTo(clamp(this.activeRef + dir, 0, this.n - 1));
  };

  PolaroidLineCarousel.prototype.startSimulation = function () {
    const self = this;
    const reduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
    let prev = performance.now();

    function frame(now) {
      self.rafId = 0;
      if (!self.visible) return;

      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;

      const w = self.size.w;
      const h = self.size.h;
      const cw = self.size.cw;
      const y0 = Math.max(36, h * 0.18);
      const d = self.drag;
      const S = self.sim;

      let lineVel;
      if (d && d.moved) {
        lineVel = d.v * 1000;
      } else {
        const before = S.off;
        const res = springStep(S.off, S.vel, S.target, dt);
        S.off = res[0];
        S.vel = res[1];
        lineVel = -(S.off - before) / Math.max(dt, 1e-3);
      }

      const g = reduce ? 0 : (self.opts.swing || 1);
      const near = nearestAt(S.off, self.spacing, self.n);

      for (let i = 0; i < self.n; i++) {
        const el = self.cards[i];
        if (!el) continue;
        const x = w / 2 + i * self.spacing - S.off;

        if (x < -cw * 1.5 || x > w + cw * 1.5) {
          el.style.visibility = 'hidden';
          continue;
        }
        el.style.visibility = 'visible';

        let a = S.a[i] || 0;
        let av = S.w[i] || 0;
        const swingRes = swingStep(a, av, lineVel, dt, g);
        a = swingRes[0];
        av = swingRes[1];

        // Light gentle breeze swaying even when idle
        if (g) {
          a += Math.sin(now / 1300 + i * 1.7) * 0.0009 * g;
        }
        S.a[i] = a;
        S.w[i] = av;

        const y = stringY(x, w, y0, self.opts.sag || 44) - 6;
        el.style.transform = 'translate(' + (x - cw / 2).toFixed(1) + 'px,' + y.toFixed(1) + 'px) rotate(' + a.toFixed(4) + 'rad)';
        el.style.zIndex = String(i === near ? self.n + 1 : self.n - Math.abs(i - near));
      }

      if (self.path) {
        const sag = self.opts.sag || 44;
        self.path.setAttribute('d', 'M0 ' + y0 + ' Q' + (w / 2) + ' ' + (y0 + 2 * sag) + ' ' + w + ' ' + y0);
      }

      if (near !== self.activeRef) {
        self.activeRef = near;
        self.active = near;
        self.updateCaption();
      }

      self.rafId = requestAnimationFrame(frame);
    }

    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(function (entries) {
        self.visible = entries[0].isIntersecting;
        if (self.visible) {
          self.updateSizes();
          if (!self.rafId) {
            prev = performance.now();
            self.rafId = requestAnimationFrame(frame);
          }
        }
      });
      this.observer.observe(this.root);
    }

    this.rafId = requestAnimationFrame(frame);
  };

  PolaroidLineCarousel.prototype.startAutoplay = function () {
    if (!this.opts.autoplay || this.n < 2) return;
    const self = this;
    this.stopAutoplay();

    this.autoplayTimer = setInterval(function () {
      if (document.hidden || self.drag || performance.now() - self.lastTouch < self.opts.autoplay) return;
      const next = self.activeRef >= self.n - 1 ? 0 : self.activeRef + 1;
      self.goTo(next);
    }, this.opts.autoplay);
  };

  PolaroidLineCarousel.prototype.stopAutoplay = function () {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  };

  PolaroidLineCarousel.prototype.bindEvents = function () {
    const self = this;

    // Resize Observer
    if (typeof ResizeObserver !== 'undefined') {
      this.ro = new ResizeObserver(function () {
        self.updateSizes();
      });
      this.ro.observe(this.root);
    } else {
      window.addEventListener('resize', function () {
        self.updateSizes();
      });
    }

    // Pointer events (drag, throw, click)
    const onDown = function (e) {
      if (e.target.closest('.pl-dock, .pl-bar, .pl-flank-arrow, .pl-btn')) return;
      self.lastTouch = performance.now();
      self.drag = {
        x: e.clientX,
        off: self.sim.off,
        lx: e.clientX,
        lt: e.timeStamp,
        v: 0,
        moved: false
      };
    };

    const onMove = function (e) {
      const d = self.drag;
      if (!d) return;
      const dx = e.clientX - d.x;

      if (!d.moved && Math.abs(dx) > 5) {
        d.moved = true;
        self.dragging = true;
        self.root.setAttribute('data-drag', '1');
        if (self.root.setPointerCapture) {
          self.root.setPointerCapture(e.pointerId);
        }
      }

      if (!d.moved) return;

      const dt = Math.max(1, e.timeStamp - d.lt);
      d.v = 0.7 * ((e.clientX - d.lx) / dt) + 0.3 * d.v;
      d.lx = e.clientX;
      d.lt = e.timeStamp;

      const max = (self.n - 1) * self.spacing;
      let off = d.off - dx;
      if (off < 0) off *= 0.35;
      if (off > max) off = max + (off - max) * 0.35;
      self.sim.off = off;
    };

    const onUp = function (e) {
      const d = self.drag;
      self.drag = null;
      self.lastTouch = performance.now();
      if (!d) return;

      if (d.moved) {
        self.dragging = false;
        self.root.setAttribute('data-drag', '0');
        self.sim.vel = -d.v * 1000;
        self.goTo(nearestAt(self.sim.off - d.v * 180, self.spacing, self.n));
        return;
      }

      const card = e.target.closest('[data-i]');
      if (card) {
        const clickedIndex = Number(card.getAttribute('data-i'));
        if (clickedIndex === self.active && typeof self.opts.onSlideClick === 'function') {
          self.opts.onSlideClick(self.slides[clickedIndex], clickedIndex);
        } else {
          self.goTo(clickedIndex);
        }
      }
    };

    this.root.addEventListener('pointerdown', onDown);
    this.root.addEventListener('pointermove', onMove);
    this.root.addEventListener('pointerup', onUp);
    this.root.addEventListener('pointercancel', onUp);

    // Prev / Next button clicks
    this.prevBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      self.step(-1);
    });

    this.nextBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      self.step(1);
    });

    if (this.flankPrev) {
      this.flankPrev.addEventListener('click', function (e) {
        e.stopPropagation();
        self.step(-1);
      });
    }

    if (this.flankNext) {
      this.flankNext.addEventListener('click', function (e) {
        e.stopPropagation();
        self.step(1);
      });
    }

    // Keyboard arrow navigation
    this.root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        self.step(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        self.step(-1);
      }
    });
  };

  PolaroidLineCarousel.prototype.setItems = function (newSlides) {
    this.opts.slides = newSlides;
    this.stopAutoplay();
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.ro) this.ro.disconnect();
    if (this.observer) this.observer.disconnect();

    this.slides = (newSlides || []).map(function (s, i) {
      return Object.assign({
        palette: s.palette || 'dawn',
        seed: s.seed !== undefined ? s.seed : (i + 1)
      }, s, {
        image: s.image || s.src || s.fullImage || '',
        title: s.title || '',
        caption: s.caption || s.sub || s.desc || '',
        note: s.note || s.newspaper || s.tag || s.title || '',
        alt: s.alt || s.title || '',
        raw: s
      });
    });
    this.n = this.slides.length;
    this.active = 0;
    this.activeRef = 0;
    this.sim.off = 0;
    this.sim.vel = 0;
    this.sim.target = 0;
    this.sim.a = new Float64Array(this.n);
    this.sim.w = new Float64Array(this.n);
    this.init();
  };

  PolaroidLineCarousel.prototype.destroy = function () {
    this.stopAutoplay();
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.ro) this.ro.disconnect();
    if (this.observer) this.observer.disconnect();
    if (this.root && this.root.parentNode) {
      this.root.parentNode.removeChild(this.root);
    }
  };

  return PolaroidLineCarousel;
}));

