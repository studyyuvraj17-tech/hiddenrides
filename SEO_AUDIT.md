# HiddenRides technical SEO audit

## Reviewed
- `index.html`
- `ride.html`
- `jodhpur.html`
- `robots.txt`
- `sitemap.xml`
- `_redirects`

## Findings
1. Homepage and Jodhpur already have descriptive titles, descriptions, canonical URLs and social metadata.
2. `robots.txt` allows crawling and references the sitemap.
3. `ride.html` generates destination metadata and JSON-LD in client-side JavaScript from the `place` query parameter. Validate rendered HTML in Google Search Console before relying on it.
4. `sitemap.xml` contains many `/ride?place=...` URLs and some clean `/rides/<slug>` URLs. Do not convert all URLs blindly: first verify each clean route returns the correct destination and a successful status.
5. `_redirects` comments mention Cloudflare Pages, but repository files alone do not prove the current live host or deployed redirect behavior.

## Priorities
1. Use Search Console URL Inspection on the homepage, a city page, one query-based ride URL, and one clean ride URL. Verify status, rendered content, canonical, robots directives and indexing eligibility.
2. Standardize each destination on one canonical URL only after its clean route is verified. Add permanent redirects for verified old-to-new mappings; avoid loops and chains.
3. Keep only canonical, indexable, successful URLs in the sitemap. Update lastmod only when meaningful page content changes.
4. Ensure each destination has unique title, description, H1 and original helpful information: route distance, duration methodology, road conditions, seasonality, safety notes and nearby stops.
5. Validate JSON-LD against visible page content; add BreadcrumbList only when breadcrumb navigation is present and accurate.
6. Improve descriptive internal links and image alt text; measure mobile Core Web Vitals before and after changes.
7. Track sitemap processing, indexing, clicks, impressions, CTR and queries in Google Search Console.

## Release safety
A GitHub commit does not prove deployment. Test URL mappings, redirects and canonicals in a preview/live environment before merging URL architecture changes. Do not rewrite the sitemap until route mappings are verified.