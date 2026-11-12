(() => {
  const installFooter = () => {
    const current = document.querySelector("body > footer, main + footer, footer");
    if (!current || current.dataset.universalFooter === "true") return;
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.dataset.universalFooter = "true";
    footer.setAttribute("aria-label", "HiddenRides footer");
    footer.innerHTML = `
      <div class="site-footer-brand">
        <a class="site-footer-logo" href="/" aria-label="HiddenRides home">
          <img src="/assets/favicon.svg" alt="" width="52" height="52">
          <span>HIDDEN<strong>RIDES</strong></span>
        </a>
        <p>Discover roads worth getting lost on. Find the places, people and journeys that make every ride memorable.</p>
      </div>
      <div class="site-footer-links">
        <nav class="site-footer-column" aria-label="Explore">
          <h2>Explore</h2>
          <a href="/">Home</a>
          <a href="/discover">Find a ride</a>
          <a href="/events">Events</a>
          <a href="/motorcycle-rides-near-me">Rides near me</a>
        </nav>
        <nav class="site-footer-column" aria-label="HiddenRides">
          <h2>HiddenRides</h2>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy policy</a>
          <a href="/terms">Terms</a>
        </nav>
      </div>
      <div class="site-footer-bottom">
        <p>© 2026 HiddenRides. All rights reserved.</p>
        <p>Event details can change. Confirm with organisers before travelling.</p>
      </div>`;
    current.replaceWith(footer);
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", installFooter, { once: true });
  else installFooter();
})();