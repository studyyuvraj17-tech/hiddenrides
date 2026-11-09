# HiddenRides Safe Refactoring Plan

## Safety contract

- Production branch: `main` (read-only during this work).
- Working branch: `refactor/safe-structure`.
- Never merge or deploy this branch without the owner's explicit approval.
- Preserve rendered appearance, content, routes, SEO metadata, analytics, ads, and all interactions.
- Do not delete code merely because it appears unused. Require reference checks and behavioural evidence.
- Make small, reversible commits and verify each change before proceeding.

## Baseline inventory

Repository snapshot used for this audit: `573c9abb9cedc9152f3bc0a6c36766f5db7a5c0c`.

- 85 repository files in the initial tree.
- Large hand-maintained pages include:
  - `index.html` (~421 KB)
  - `discover.html` (~83 KB)
  - `ride.html` (~119 KB)
  - `bengaluru-ride.js` (~84 KB)
  - `assets/mobile-ready.js` (~20 KB)
- Individual destination pages are under `rides/`.
- Existing shared assets include `footer.css`, `functions/ride.js`, and `assets/mobile-ready.js`.
- Existing validation is in `scripts/validate-site.mjs`, run by `.github/workflows/validate-site.yml`.

## Initial findings

1. Several large pages contain substantial inline CSS and JavaScript. This makes unrelated edits easy to mix together.
2. City listing pages share common concerns (header, cards, filters, image handling, footer), but still contain page-specific markup and styles.
3. Destination images and metadata can be represented in more than one place. Example: a destination's own HTML and its city-page image mapping. This creates a drift risk.
4. The existing validator checks important sitemap, canonical, title, and discovery-link conditions, but does not yet prove visual parity, all internal links, image availability, or interaction behaviour.
5. Some pages intentionally contain page-specific overrides. These must not be removed or consolidated until their effect is understood.

## Proposed low-risk sequence

### Phase 0 — Baseline and inventory
- Keep production untouched.
- Record current file inventory, route inventory, script/style references, SEO metadata, and page-specific behaviour.
- Expand automated checks before changing runtime code.

### Phase 1 — Safety net
- Add checks for internal local links, local asset references, duplicate IDs, missing image alt text, and JavaScript syntax where feasible.
- Add explicit protected-route checks for all current city and destination URLs.
- Keep existing validation rules intact.

### Phase 2 — Data centralisation (only after tests exist)
- Introduce a structured destination data source.
- Migrate one pilot destination first.
- Generate or consume the same image/metadata for its detail page and city listing.
- Compare generated HTML against the current page and require equivalent output before wider migration.

### Phase 3 — Shared components
- Extract only demonstrably identical shared components/styles.
- Keep page-specific CSS and scripts scoped to their page.
- Migrate one page family at a time.

### Phase 4 — Dead-code review
- Search for each candidate selector/function/asset across HTML, JS, CSS, route configuration, dynamic selectors, and build/deployment configuration.
- Remove only when there is positive evidence it is unused.
- Keep uncertain items and record why they remain.

## Non-goals

- No redesign or visual refresh.
- No content rewrites.
- No URL changes or redirects changes.
- No SEO title, description, canonical, schema, or indexing changes.
- No dependency/framework migration.
- No deployment or merge to `main`.

## Acceptance criteria

A proposed refactor is not ready for production unless:
1. Existing validation passes.
2. All current canonical URLs and sitemap entries remain unchanged.
3. Local links and assets resolve.
4. No unrequested content, SEO, or configuration changes appear in the diff.
5. Page behaviour is checked against the baseline.
6. The owner explicitly approves merging to production.
