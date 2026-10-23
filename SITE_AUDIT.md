# HiddenRides website audit

**Scope:** source-code inspection of the GitHub `main` branch and the existing route/sitemap validation logic. This is not a browser-based functional, accessibility, or performance test; the live site could not be fetched by the available web verifier.

## Findings

### Fixed in this branch

- **Duplicate canonical on `experience.html` (SEO correctness).** The page had two identical `rel="canonical"` tags. Duplicate canonical declarations are unnecessary and can make canonical signals less clear. One has been removed, and `scripts/validate-site.mjs` now guards against this exact regression.

### High priority recommendations

1. **Reduce homepage HTML weight — `index.html`.** The homepage embeds a large base64 JPEG directly in a CSS background. This inflates the HTML response and makes the page harder to cache and maintain. The repository already contains `assets/hero.webp` (about 9 KB) and `assets/hero.jpg`; visually compare them with the embedded image, then prefer the smallest matching optimized asset as a normal URL.
2. **Improve SEO for query-driven ride pages — `ride.html`, `functions/ride.js`, `sitemap.xml`.** Many destinations are rendered from `/ride?place=...`, with title, description, canonical and structured data set by client-side JavaScript. Search engines may render JavaScript, but previews and some crawlers can see only the generic template metadata. Where a destination merits organic search traffic, create a dedicated static page or pre-rendered response with its own metadata. Keep query URLs in the sitemap only where they are the intended canonical URL; continue redirecting aliases for destinations that have dedicated `/rides/<slug>` pages.
3. **Make metadata generation consistent.** Keep one canonical per indexable page, ensure each indexable page has a unique title and description, and make Open Graph URLs match the canonical. Add a repeatable automated check across all static pages, not just the experience landing page.
4. **Add a link and asset smoke test.** Extend the current validator to check local `href`/`src` targets, image references, and sitemap canonical alignment. Current validation is useful for sitemap/template and destination-link checks, but it does not check every internal navigation link or asset path.
5. **Measure real-user performance.** After deployment, test the homepage, discover page, and representative city/ride pages on mobile using PageSpeed Insights or Lighthouse. Prioritize LCP image delivery, unused/duplicated CSS, and layout shifts based on measured results rather than guessing.
6. **Improve destination trust and safety.** Distance and timing are explicitly approximate in the code. For each destination, provide a “last checked” date and source for access restrictions, road conditions, opening hours, and distance estimates; avoid presenting uncertain or seasonal access as guaranteed.

## Suggested order

1. Merge and deploy the canonical fix.
2. Verify production HTML and the CI validation run.
3. Compare the embedded homepage image with `assets/hero.webp`, then optimize if visually equivalent.
4. Improve static/pre-rendered destination coverage and sitemap canonical consistency.
5. Run Lighthouse and a broken-link/accessibility audit on the deployed site.
