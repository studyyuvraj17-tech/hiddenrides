(() => {
  if (window.__hiddenRidesMobileReady) return;
  window.__hiddenRidesMobileReady = true;

  const style = document.createElement("style");
  style.id = "hiddenrides-mobile-ready";
  style.textContent = `
    html { max-width: 100%; overflow-x: clip; scroll-padding-top: 88px; }
    body { line-height: 1.55; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
    a, button, input, select, textarea, summary { -webkit-tap-highlight-color: transparent; }
    :focus-visible { outline: 3px solid #b7df00 !important; outline-offset: 3px; }
    button, input[type="button"], input[type="submit"], input[type="reset"], select { min-height: 44px; }
    header nav a { min-height: 44px; }
    ::selection { background: rgba(183,223,0,.28); color: inherit; }
    .card, .ride, .destination-card, .experience-card, .route-card {
      border-radius: 16px;
      transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease;
    }
    @media (hover:hover) {
      .card:hover, .ride:hover, .destination-card:hover, .experience-card:hover, .route-card:hover {
        transform: translateY(-2px);
      }
    }
    body { min-width: 0; max-width: 100%; }
    img, video, iframe, canvas, svg { max-width: 100%; }
    pre, code { overflow-wrap: anywhere; }
    table { max-width: 100%; }
    /* Shared city destination cards: keep every tile aligned to the Jodhpur layout. */
    .grid {
      align-items: stretch;
      grid-auto-rows: 1fr;
    }
    .grid > .ride,
    .grid > .destination-card,
    .grid > .route-card {
      display: flex;
      flex-direction: column;
      align-self: stretch;
      min-width: 0;
      height: 100%;
      overflow: hidden;
    }
    .grid > .ride > .visual,
    .grid > .destination-card > .visual,
    .grid > .route-card > .visual {
      position: relative;
      flex: 0 0 155px;
      height: 155px;
      min-height: 155px;
      overflow: hidden;
    }
    .grid > .ride > .visual img,
    .grid > .destination-card > .visual img,
    .grid > .route-card > .visual img {
      position: absolute;
      inset: 0;
      display: block;
      width: 100%;
      height: 100%;
      max-width: none;
      object-fit: cover;
      object-position: center;
    }
    .grid > .ride > .body,
    .grid > .destination-card > .body,
    .grid > .route-card > .body {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      min-width: 0;
    }
    .grid > .ride .body h3,
    .grid > .destination-card .body h3,
    .grid > .route-card .body h3 {
      line-height: 1.3;
      overflow-wrap: anywhere;
    }
    .grid > .ride .route,
    .grid > .destination-card .route,
    .grid > .route-card .route {
      margin-top: auto;
      padding-top: 15px;
      line-height: 1.45;
      overflow-wrap: anywhere;
    }
    .grid > .ride .meta,
    .grid > .destination-card .meta,
    .grid > .route-card .meta {
      align-items: flex-start;
    }
    @media (max-width: 900px) {
      .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 620px) {
      .grid { grid-template-columns: minmax(0, 1fr); }
      .grid > .ride,
      .grid > .destination-card,
      .grid > .route-card { height: auto; }
      .grid > .ride > .visual,
      .grid > .destination-card > .visual,
      .grid > .route-card > .visual {
        flex-basis: 155px;
        height: 155px;
        min-height: 155px;
      }
    }
    @media (max-width: 700px) {
      input, select, textarea { font-size: 16px; }
      button, input[type="button"], input[type="submit"], input[type="reset"] { min-height: 44px; }
      .mobile-menu-toggle {
        display: inline-flex !important;
        align-items: center;
        justify-content: center;
        gap: 9px;
        flex: 0 0 auto;
        min-width: 44px;
        min-height: 44px;
        padding: 0 13px;
        border: 1px solid rgba(223,255,50,.42);
        border-radius: 12px;
        background: #dfff32;
        color: #111315;
        font: 800 13px/1 system-ui, sans-serif;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
      .mobile-menu-toggle .menu-icon { display: grid; gap: 4px; width: 17px; }
      .mobile-menu-toggle .menu-icon span { display: block; width: 17px; height: 2px; border-radius: 2px; background: currentColor; }
      header nav.mobile-nav-panel {
        display: none !important;
        position: fixed !important;
        top: max(70px, calc(env(safe-area-inset-top) + 64px)) !important;
        left: 16px !important;
        right: 16px !important;
        width: auto !important;
        max-width: 420px !important;
        max-height: calc(100dvh - 92px) !important;
        overflow-y: auto !important;
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 0 !important;
        margin: 0 0 0 auto !important;
        padding: 8px !important;
        border: 1px solid rgba(223,255,50,.25) !important;
        border-radius: 16px !important;
        background: #0b0e10 !important;
        color: #f5f7f8 !important;
        box-shadow: 0 18px 60px rgba(0,0,0,.32) !important;
        z-index: 100000 !important;
        font-size: 15px !important;
        text-shadow: none !important;
      }
      header nav.mobile-nav-panel.is-open { display: flex !important; }
      header nav.mobile-nav-panel a {
        display: flex !important;
        align-items: center;
        min-height: 48px;
        padding: 12px 14px !important;
        border-radius: 10px;
        color: #f5f7f8 !important;
        text-decoration: none;
        text-shadow: none !important;
        line-height: 1.35;
      }
      header nav.mobile-nav-panel a:hover,
      header nav.mobile-nav-panel a:focus-visible { background: rgba(223,255,50,.12) !important; color: #dfff32 !important; outline: none; }
      header .logo { min-width: 0; max-width: calc(100% - 82px); }
      header .logo img { flex-shrink: 0; }
    }
    @media (min-width: 701px) { .mobile-menu-toggle { display: none !important; } }
    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto !important; }
      *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
    }
  `;
  document.head.appendChild(style);

  const setup = () => {
    const header = document.querySelector("header");
    if (!header) return;
    const nav = header.querySelector("nav");
    if (!nav || nav.querySelector("[aria-label='Legal']")) return;
    if (header.querySelector(".mobile-menu-toggle")) return;

    nav.classList.add("mobile-nav-panel");
    if (!nav.id) nav.id = "mobile-site-navigation";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "mobile-menu-toggle";
    toggle.setAttribute("aria-controls", nav.id);
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open site menu");
    toggle.innerHTML = '<span class="menu-icon" aria-hidden="true"><span></span><span></span><span></span></span><span class="menu-label">Menu</span>';
    header.insertBefore(toggle, nav);

    const close = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open site menu");
      toggle.querySelector(".menu-label").textContent = "Menu";
    };
    toggle.addEventListener("click", () => {
      const opening = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", opening);
      toggle.setAttribute("aria-expanded", String(opening));
      toggle.setAttribute("aria-label", opening ? "Close site menu" : "Open site menu");
      toggle.querySelector(".menu-label").textContent = opening ? "Close" : "Menu";
      if (opening) {
        const firstLink = nav.querySelector("a[href]");
        if (firstLink) firstLink.focus();
      }
    });
    nav.addEventListener("click", event => {
      if (event.target.closest("a")) close();
    });
    document.addEventListener("click", event => {
      if (!header.contains(event.target)) close();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") { close(); toggle.focus(); }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) close();
    }, { passive: true });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setup, { once: true });
  else setup();
})();