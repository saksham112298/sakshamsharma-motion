/* Saksham Sharma portfolio. Builds the work grid from works.js, runs the GSAP motion, opens videos. */
(function () {
  "use strict";

  var root = document.documentElement;
  var hasGsap = typeof window.gsap !== "undefined";
  var CATS = {
    "motion-graphics": "Motion graphics",
    "vfx": "VFX",
    "3d": "3D animation",
    "documentary": "Documentary"
  };
  var WORKS = Array.isArray(window.WORKS) ? window.WORKS : [];
  var REEL = window.REEL || {};

  /* ---------- helpers ---------- */
  function el(tag, cls, attrs) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (attrs) for (var k in attrs) if (attrs[k] !== undefined) n.setAttribute(k, attrs[k]);
    return n;
  }

  function youtubeId(v) {
    if (!v) return "";
    v = String(v).trim();
    if (/^[\w-]{11}$/.test(v)) return v;
    var m = v.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : "";
  }

  function isLive(w) { return !!(youtubeId(w.youtube) || w.video); }

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function timecode(frames) {
    var f = frames % 24, s = Math.floor(frames / 24);
    return pad(Math.floor(s / 3600)) + ":" + pad(Math.floor(s / 60) % 60) + ":" + pad(s % 60) + ":" + pad(f);
  }

  function reducedMotion() { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }

  /* ---------- player ---------- */
  var player = document.getElementById("player");
  var playerBox = document.getElementById("playerBox");
  var lastTrigger = null;

  function openPlayer(item, trigger) {
    var id = youtubeId(item.youtube);
    playerBox.innerHTML = "";
    playerBox.classList.toggle("is-tall", item.ratio === "9:16");
    if (id) {
      var f = el("iframe", "", {
        src: "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0&playsinline=1",
        title: item.title || "Video",
        allow: "autoplay; encrypted-media; picture-in-picture; fullscreen",
        allowfullscreen: ""
      });
      playerBox.appendChild(f);
    } else if (item.video) {
      var v = el("video", "", { src: item.video, controls: "", autoplay: "", playsinline: "" });
      playerBox.appendChild(v);
    } else {
      return;
    }
    lastTrigger = trigger || null;
    if (typeof player.showModal === "function") player.showModal();
    else player.setAttribute("open", "");
  }

  function closePlayer() {
    if (player.open) player.close();
  }

  player.addEventListener("close", function () {
    playerBox.innerHTML = "";
    if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
  });
  document.getElementById("playerClose").addEventListener("click", closePlayer);
  player.addEventListener("click", function (e) { if (e.target === player) closePlayer(); });

  /* ---------- showreel frame ---------- */
  (function buildReel() {
    var wrap = document.getElementById("reelWrap");
    var standby = document.getElementById("reel");
    var id = youtubeId(REEL.youtube);
    if (!wrap || !standby || !(id || REEL.video)) return;

    var b = el("button", "reel reel--live", { type: "button", "aria-label": "Play showreel" });
    var src = REEL.poster || (id ? "https://i.ytimg.com/vi/" + id + "/maxresdefault.jpg" : "");
    if (src) {
      var img = el("img", "reel__img", { src: src, alt: "", loading: "eager" });
      img.onerror = function () { if (id) img.src = "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg"; };
      b.appendChild(img);
    }
    b.appendChild(el("span", "corners", { "aria-hidden": "true" }));
    b.appendChild(el("span", "reel__play", { "aria-hidden": "true" }));
    b.addEventListener("click", function () { openPlayer({ youtube: REEL.youtube, video: REEL.video, title: "Showreel", ratio: "16:9" }, b); });
    wrap.replaceChild(b, standby);
  })();

  /* ---------- work grid ---------- */
  var grid = document.getElementById("grid");
  var filtersBox = document.getElementById("filters");
  var cards = [];

  function buildCard(w) {
    var live = isLive(w);
    var label = CATS[w.category] || "Video";
    var tall = w.ratio === "9:16";
    var card = live
      ? el("button", "card card--live", { type: "button", "aria-label": "Play " + (w.title || label) })
      : el("div", "card card--empty");
    if (w.feature) card.classList.add("card--feature");
    card.dataset.cat = w.category;

    var frame = el("div", "card__frame" + (tall ? " card__frame--tall" : ""));
    if (live) {
      var id = youtubeId(w.youtube);
      var src = w.thumb || (id ? "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg" : "");
      if (src) frame.appendChild(el("img", "card__img", { src: src, alt: "", loading: "lazy" }));
      if (w.preview) {
        var pv = el("video", "card__preview", { src: w.preview, muted: "", loop: "", playsinline: "", preload: "none", "aria-hidden": "true" });
        pv.muted = true;
        frame.appendChild(pv);
        card.addEventListener("mouseenter", function () { var p = pv.play(); if (p && p.catch) p.catch(function () {}); });
        card.addEventListener("mouseleave", function () { pv.pause(); pv.currentTime = 0; });
      }
      frame.appendChild(el("span", "card__play", { "aria-hidden": "true" }));
      card.addEventListener("click", function () { openPlayer(w, card); });
    } else {
      var slot = el("div", "slot", { "aria-hidden": "true" });
      slot.appendChild(el("span", "corners"));
      var chip = el("span", "slot__chip");
      chip.textContent = "Coming soon";
      slot.appendChild(chip);
      slot.appendChild(el("span", "slot__bars"));
      frame.appendChild(slot);
    }
    card.appendChild(frame);

    var meta = el("div", "card__meta");
    var t = el("span", "card__title");
    t.textContent = w.title || label;
    meta.appendChild(t);
    if (live && w.title) {
      var c = el("span", "card__cat");
      c.textContent = label;
      meta.appendChild(c);
    }
    card.appendChild(meta);
    return card;
  }

  WORKS.forEach(function (w) {
    var c = buildCard(w);
    cards.push(c);
    grid.appendChild(c);
  });

  var current = "all";
  var filterButtons = [];

  function addFilter(key, text) {
    var b = el("button", "filter", { type: "button", "aria-pressed": key === "all" ? "true" : "false" });
    b.textContent = text;
    b.dataset.key = key;
    b.addEventListener("click", function () { applyFilter(key); });
    filtersBox.appendChild(b);
    filterButtons.push(b);
  }
  addFilter("all", "All");
  Object.keys(CATS).forEach(function (k) {
    if (WORKS.some(function (w) { return w.category === k; })) addFilter(k, CATS[k]);
  });

  function applyFilter(key) {
    if (key === current) return;
    current = key;
    filterButtons.forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.key === key ? "true" : "false"); });

    var canFlip = hasGsap && typeof window.Flip !== "undefined" && !reducedMotion();
    var state = canFlip ? Flip.getState(cards) : null;

    cards.forEach(function (c) { c.hidden = !(key === "all" || c.dataset.cat === key); });
    grid.classList.toggle("is-all", key === "all");

    if (canFlip) {
      Flip.from(state, {
        duration: 0.55,
        ease: "power2.inOut",
        absolute: true,
        onEnter: function (els) { return gsap.fromTo(els, { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.15 }); }
      });
    }
  }

  /* ---------- menu ---------- */
  var nav = document.getElementById("nav");
  var menuBtn = document.getElementById("menuBtn");

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.textContent = open ? "Close" : "Menu";
    document.body.style.overflow = open ? "hidden" : "";
  }
  menuBtn.addEventListener("click", function () { setMenu(!nav.classList.contains("is-open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); menuBtn.focus(); }
  });
  window.matchMedia("(min-width: 901px)").addEventListener("change", function (e) { if (e.matches) setMenu(false); });

  /* ---------- scroll playhead and timecode (user-driven) ---------- */
  var playhead = document.getElementById("playhead");
  var tcEl = document.getElementById("tc");
  var TOTAL_FRAMES = 24 * 60;

  function paintProgress(p) {
    p = Math.max(0, Math.min(1, p));
    playhead.style.clipPath = "inset(0 " + ((1 - p) * 100).toFixed(2) + "% 0 0)";
    if (tcEl) tcEl.textContent = timecode(Math.round(p * TOTAL_FRAMES));
  }
  function readScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    paintProgress(max > 0 ? window.scrollY / max : 0);
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; readScroll(); });
  }, { passive: true });
  window.addEventListener("resize", readScroll);
  readScroll();

  /* ---------- hero intro (the one orchestrated moment) ---------- */
  function showEverything() {
    clearTimeout(window.__introTimer);
    root.classList.remove("intro-hide");
  }

  function runIntro() {
    var title = document.getElementById("heroTitle");
    var reel = document.querySelector(".hero__reel");
    var reelTc = document.querySelector(".reel__tc");

    gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

    gsap.set(".intro", { opacity: 0, y: 14 });
    gsap.set(reel, { clipPath: "inset(0 100% 0 0)" });
    var counter = { f: 0 };

    var tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    SplitText.create(title, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: function (self) {
        gsap.set(title, { opacity: 1 });
        showEverything();
        return tl
          .from(self.lines, { yPercent: 105, duration: 1, stagger: 0.09 }, 0)
          .to(reel, { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.inOut" }, 0.25)
          .to(".intro", { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, 0.55)
          .to(counter, {
            f: 24 * 7 + 11, duration: 1.4, ease: "power2.out",
            onUpdate: function () { if (reelTc) reelTc.textContent = timecode(Math.round(counter.f)); }
          }, 0.25);
      }
    });
  }

  function init() {
    if (!hasGsap || reducedMotion()) { showEverything(); return; }
    var go = function () { try { runIntro(); } catch (e) { showEverything(); } };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else go();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
