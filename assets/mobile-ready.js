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

  /* Destination detail pages share the same visual system as the Jodhpur ride guide. */
  const detailStyle = document.createElement("style");
  detailStyle.id = "hiddenrides-destination-detail-layout";
  detailStyle.textContent = `
    body.destination-detail-page main { min-width: 0; }
    body.destination-detail-page main .facts {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      align-items: stretch;
      gap: 12px;
      margin: 30px 0;
    }
    body.destination-detail-page main .fact {
      min-width: 0;
      height: 100%;
      border: 1px solid #e2e5e7;
      border-radius: 16px;
      padding: 17px;
      background: #f7f7f5;
      overflow-wrap: anywhere;
    }
    body.destination-detail-page main .fact small,
    body.destination-detail-page main .fact b {
      display: block;
      margin-bottom: 7px;
      color: #626b72;
      font-size: 10px;
      font-weight: 800;
      line-height: 1.4;
      text-transform: uppercase;
      letter-spacing: .045em;
    }
    body.destination-detail-page main .fact strong {
      display: block;
      color: #111315;
      font-size: 14px;
      line-height: 1.5;
      overflow-wrap: anywhere;
    }
    body.destination-detail-page main .photo {
      width: 100%;
      height: clamp(220px, 38vw, 380px);
      margin: 22px 0 8px;
      overflow: hidden;
      border: 1px solid #e2e5e7;
      border-radius: 20px;
      background: #f1f2ef;
    }
    body.destination-detail-page main .photo img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
    body.destination-detail-page main .content {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 16px;
      padding: 16px 0 56px;
    }
    body.destination-detail-page main .content > .box {
      width: 100%;
      min-width: 0;
      margin: 0;
      padding: 26px;
      border: 1px solid #e2e5e7;
      border-radius: 22px;
      background: #f7f7f5;
    }
    body.destination-detail-page main .actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      margin-top: 24px;
    }
    body.destination-detail-page main .btn,
    body.destination-detail-page main .cta {
      display: inline-flex;
      min-height: 44px;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 16px;
      border: 1px solid #dfe3e5;
      border-radius: 11px;
      font-size: 12px;
      font-weight: 800;
      line-height: 1.4;
      text-align: center;
      overflow-wrap: anywhere;
    }
    body.destination-detail-page main .btn.primary,
    body.destination-detail-page main .cta {
      background: #b7df00;
      border-color: #b7df00;
      color: #111315;
    }
    body.destination-detail-page main .note {
      margin-top: 18px;
      padding: 14px 16px;
      border-left: 3px solid #b7df00;
      border-radius: 0 12px 12px 0;
      background: #fff;
    }
    body.destination-detail-page main p,
    body.destination-detail-page main li {
      overflow-wrap: anywhere;
    }
    body.destination-detail-page .sources,
    body.destination-detail-page footer {
      border-color: #e2e5e7;
      color: #626b72;
    }
    @media (max-width: 800px) {
      body.destination-detail-page main .facts {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }
    }
    @media (max-width: 620px) {
      body.destination-detail-page .wrap { width: calc(100% - 32px); }
      body.destination-detail-page header { min-height: 64px; height: auto; }
      body.destination-detail-page .logo { font-size: 21px; }
      body.destination-detail-page .back { max-width: 48%; text-align: right; line-height: 1.4; }
      body.destination-detail-page main .hero { padding: 46px 0 26px; }
      body.destination-detail-page main .hero h1,
      body.destination-detail-page main h1 {
        max-width: 100%;
        font-size: clamp(36px, 10vw, 52px);
        line-height: 1.02;
        letter-spacing: -.045em;
        overflow-wrap: anywhere;
      }
      body.destination-detail-page main .hero p { font-size: 14px; line-height: 1.7; }
      body.destination-detail-page main .facts { margin: 24px 0; gap: 8px; }
      body.destination-detail-page main .fact { padding: 14px; border-radius: 14px; }
      body.destination-detail-page main .fact strong { font-size: 13px; line-height: 1.45; }
      body.destination-detail-page main .content { padding: 12px 0 42px; gap: 12px; }
      body.destination-detail-page main .content > .box { padding: 20px 18px; border-radius: 18px; }
      body.destination-detail-page main .actions { align-items: stretch; }
      body.destination-detail-page main .actions .btn { flex: 1 1 170px; }
      body.destination-detail-page main .photo { height: clamp(210px, 62vw, 320px); border-radius: 16px; }
    }
  `;
  document.head.appendChild(detailStyle);

  const markDestinationDetailPage = () => {
    const main = document.querySelector("main");
    const app = document.querySelector("#app");
    const isDynamicRide = app && new URLSearchParams(window.location.search).has("place");
    if ((main && main.querySelector(".facts") && main.querySelector("h1")) || isDynamicRide) {
      document.body.classList.add("destination-detail-page");
    }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", markDestinationDetailPage, { once: true });
  } else {
    markDestinationDetailPage();
  }

  /* Normalize detail-page spacing and type across static and query-driven destination pages. */
  const detailPolish = document.createElement("style");
  detailPolish.id = "hiddenrides-detail-page-polish";
  detailPolish.textContent = `
    body.destination-detail-page { min-width: 0; }
    body.destination-detail-page #app,
    body.destination-detail-page #app .blr-page,
    body.destination-detail-page main { min-width: 0; width: 100%; }
    body.destination-detail-page .wrap { width: min(1000px, calc(100% - 40px)); margin-inline: auto; }
    body.destination-detail-page .hero,
    body.destination-detail-page #app > .hero { padding-top: clamp(36px, 5vw, 62px); }
    body.destination-detail-page .hero h1,
    body.destination-detail-page #app .hero h1,
    body.destination-detail-page main h1 { font-size: clamp(36px, 5.2vw, 64px) !important; line-height: 1.06 !important; letter-spacing: -.045em !important; margin: 16px 0 20px !important; overflow-wrap: anywhere; }
    body.destination-detail-page .hero p,
    body.destination-detail-page #app .hero p { max-width: 780px; font-size: clamp(16px, 1.7vw, 20px) !important; line-height: 1.7 !important; }
    body.destination-detail-page .actions { gap: 10px !important; margin: 24px 0 32px !important; }
    body.destination-detail-page .btn,
    body.destination-detail-page .cta { min-height: 46px !important; padding: 12px 18px !important; border-radius: 12px !important; font-size: 13px !important; }
    body.destination-detail-page .photo { aspect-ratio: 1.9 / 1; height: auto !important; min-height: 0; max-height: 400px; margin: 20px 0 6px; border-radius: 20px; overflow: hidden; }
    body.destination-detail-page .photo img { width: 100%; height: 100%; object-fit: cover; }
    body.destination-detail-page .facts { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; gap: 10px !important; margin: 28px 0 32px !important; }
    body.destination-detail-page .fact { min-width: 0; padding: 16px !important; border-radius: 15px !important; overflow-wrap: anywhere; }
    body.destination-detail-page .fact strong { font-size: 14px !important; line-height: 1.5; }
    body.destination-detail-page .content { display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; padding: 10px 0 44px !important; }
    body.destination-detail-page .content > .box { min-width: 0; padding: 24px !important; border-radius: 20px !important; }
    body.destination-detail-page .content > .box h2 { font-size: 21px !important; line-height: 1.3; }
    body.destination-detail-page .content > .box p,
    body.destination-detail-page .content > .box li { font-size: 15px !important; line-height: 1.75 !important; }
    body.destination-detail-page .blr-page { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
    body.destination-detail-page .blr-hero { min-height: 400px; border-radius: 24px; overflow: hidden; }
    body.destination-detail-page .blr-hero h1 { font-size: clamp(38px, 5.5vw, 68px) !important; line-height: 1.04 !important; letter-spacing: -.045em !important; }
    body.destination-detail-page .blr-hero-copy { padding: clamp(24px, 5vw, 56px) !important; }
    body.destination-detail-page .blr-stats { grid-template-columns: repeat(4, minmax(0,1fr)); gap: 10px; margin: 24px 0 34px; }
    body.destination-detail-page .blr-stat { min-width: 0; overflow-wrap: anywhere; }
    body.destination-detail-page .blr-two-col { grid-template-columns: repeat(2, minmax(0,1fr)); gap: 14px; }
    body.destination-detail-page .blr-panel { min-width: 0; padding: 22px; }
    body.destination-detail-page .blr-gallery { gap: 12px; }
    body.destination-detail-page .blr-photo img { width: 100%; object-fit: cover; }
    @media (max-width: 800px) {
      body.destination-detail-page .facts,
      body.destination-detail-page .blr-stats { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
      body.destination-detail-page .blr-two-col { grid-template-columns: minmax(0,1fr); }
    }
    @media (max-width: 620px) {
      body.destination-detail-page .wrap,
      body.destination-detail-page .blr-page { width: calc(100% - 32px); }
      body.destination-detail-page header { min-height: 64px; height: auto; }
      body.destination-detail-page .hero,
      body.destination-detail-page #app > .hero { padding-top: 38px; }
      body.destination-detail-page .hero h1,
      body.destination-detail-page #app .hero h1,
      body.destination-detail-page main h1 { font-size: clamp(34px, 9.5vw, 48px) !important; letter-spacing: -.04em !important; }
      body.destination-detail-page .hero p,
      body.destination-detail-page #app .hero p { font-size: 16px !important; }
      body.destination-detail-page .actions { display: flex; margin: 22px 0 28px !important; }
      body.destination-detail-page .btn,
      body.destination-detail-page .cta { flex: 0 1 auto; min-height: 44px !important; }
      body.destination-detail-page .photo { aspect-ratio: 1.35 / 1; border-radius: 16px; }
      body.destination-detail-page .facts { margin: 22px 0 !important; gap: 8px !important; }
      body.destination-detail-page .fact { padding: 13px !important; }
      body.destination-detail-page .content > .box { padding: 19px !important; }
      body.destination-detail-page .blr-hero { min-height: 390px; border-radius: 18px; }
      body.destination-detail-page .blr-hero-copy { padding: 22px !important; }
      body.destination-detail-page .blr-hero h1 { font-size: clamp(34px, 9vw, 48px) !important; }
      body.destination-detail-page .blr-stats { gap: 8px; }
      body.destination-detail-page .blr-panel { padding: 18px; }
    }
  `;
  document.head.appendChild(detailPolish);

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