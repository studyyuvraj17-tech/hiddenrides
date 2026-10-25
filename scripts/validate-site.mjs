import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => readFile(path.join(root, file), "utf8");
const exists = async (file) => {
  try { await access(path.join(root, file), constants.F_OK); return true; }
  catch { return false; }
};
const decodeXml = (value) => value.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", '"').replaceAll("&apos;", "'");
const escapeRegExp = (value) => value.replace(/[.*+?^$()|[\]\\]/g, "\\$&");
const canonicalFrom = (html) => {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  const tag = tags.find((item) => /\brel=["']canonical["']/i.test(item));
  return tag?.match(/\bhref=["']([^"']+)["']/i)?.[1] || null;
};

const xml = await read("sitemap.xml");
assert.match(xml, /<urlset\b[^>]*xmlns=["']http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9["']/i, "sitemap must have the standard namespace");
const locs = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => decodeXml(match[1].trim()));
assert.ok(locs.length > 0, "sitemap must contain at least one URL");
assert.equal(new Set(locs).size, locs.length, "sitemap must not contain duplicate URLs");

const rideTemplate = await read("ride.html");
const bengaluruTemplate = await read("bengaluru-ride.js");
const routeFunction = await read("functions/ride.js");
const experiencePage = await read("experience.html");
const experienceCanonicals = [...experiencePage.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi)];
assert.equal(experienceCanonicals.length, 1, "experience page must have exactly one canonical link");
const cleanRideSlugs = new Set();
for (const loc of locs) {
  const url = new URL(loc);
  assert.equal(url.protocol, "https:", "sitemap URL must use HTTPS: " + loc);
  assert.equal(url.hostname, "hiddenrides.com", "unexpected sitemap host: " + loc);
  assert.equal(url.hash, "", "sitemap URL must not contain a fragment: " + loc);
  const escapedLoc = escapeRegExp(loc.replaceAll("&", "&amp;"));
  const lastmodMatch = xml.match(new RegExp("<url>\\s*<loc>" + escapedLoc + "</loc>([\\s\\S]*?)</url>"));
  if (lastmodMatch) {
    const date = lastmodMatch[1].match(/<lastmod>(.*?)<\/lastmod>/i)?.[1];
    if (date) {
      assert.match(date, /^\d{4}-\d{2}-\d{2}$/, "invalid lastmod date for " + loc);
      assert.ok(!Number.isNaN(Date.parse(date)), "unparseable lastmod date for " + loc);
    }
  }

  let file;
  if (url.pathname === "/") file = "index.html";
  else if (url.pathname === "/ride") file = "ride.html";
  else file = url.pathname.slice(1) + ".html";
  assert.ok(await exists(file), "sitemap URL has no matching static/template file: " + loc + " -> " + file);

  if (url.pathname.startsWith("/rides/")) {
    const slug = url.pathname.slice("/rides/".length);
    cleanRideSlugs.add(slug);
    const html = await read(file);
    assert.equal(canonicalFrom(html), "https://hiddenrides.com/rides/" + slug, "wrong/missing canonical in " + file);
    assert.doesNotMatch(html, /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i, "sitemap ride page must not be noindex: " + file);
  }

  if (url.pathname === "/ride" && url.searchParams.has("place")) {
    const slug = url.searchParams.get("place");
    if (cleanRideSlugs.has(slug) || await exists("rides/" + slug + ".html")) {
      assert.fail("legacy query URL appears in sitemap despite a clean static ride page: " + loc);
    }
  }
}

for (const slug of cleanRideSlugs) {
  assert.ok(routeFunction.includes('"' + slug + '"'), "server redirect function missing static ride slug: " + slug);
}

const discover = await read("discover.html");
const links = [...discover.matchAll(/href=["'](?:\/)?rides\/([a-z0-9-]+)["']/gi)].map((match) => match[1]);
for (const slug of new Set(links)) {
  assert.ok(await exists("rides/" + slug + ".html"), "discovery links to missing static ride page: " + slug);
}
const querySlugs = [...discover.matchAll(/href=["'](?:\/)?ride\?place=([a-z0-9-]+)/gi)].map((match) => match[1]);
for (const slug of new Set(querySlugs)) {
  const keyPattern = new RegExp("['\"]" + escapeRegExp(slug) + "['\"]\\s*:");
  assert.ok(keyPattern.test(rideTemplate) || keyPattern.test(bengaluruTemplate) || await exists("rides/" + slug + ".html"), "discovery links to an unknown ride slug: " + slug);
}

assert.match(rideTemplate, /if\(!key\)\{location\.replace\(['"]\/discover['"]\);return;\}/, "missing ride parameter must not silently render the default destination");
assert.match(rideTemplate, /staticSeoSlugs=new Set\(\[/, "legacy static ride aliases must be explicitly redirected");

const sitemapSet = new Set(locs);
const canonicalPages = [
  "index.html", "discover.html", "jodhpur.html", "jaipur.html", "bengaluru.html",
  "delhi-ncr.html", "ahmedabad.html", "ladakh.html", "mumbai.html", "pune.html",
  "hyderabad.html", "kolkata.html", "chandigarh.html",
  ...[...cleanRideSlugs].map((slug) => "rides/" + slug + ".html")
];
const seenTitles = new Map();
for (const file of canonicalPages) {
  if (!(await exists(file))) continue;
  const html = await read(file);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i)?.[1]?.trim();
  const canonicalTags = (html.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi) || []);
  assert.ok(title, "indexable page is missing a title: " + file);
  assert.ok(description, "indexable page is missing a meta description: " + file);
  assert.equal(canonicalTags.length, 1, "page must have exactly one canonical tag: " + file);
  const canonical = canonicalFrom(html);
  assert.ok(canonical && canonical.startsWith("https://hiddenrides.com/"), "canonical must use the preferred HTTPS host: " + file);
  if (file.startsWith("rides/")) {
    const slug = file.slice("rides/".length, -".html".length);
    assert.equal(canonical, "https://hiddenrides.com/rides/" + slug, "static ride canonical mismatch: " + file);
    assert.ok(sitemapSet.has(canonical), "static ride canonical missing from sitemap: " + canonical);
  }
  const normalizedTitle = title.replace(/&amp;/g, "&").toLowerCase();
  if (seenTitles.has(normalizedTitle)) {
    assert.fail("duplicate page title across " + seenTitles.get(normalizedTitle) + " and " + file);
  }
  seenTitles.set(normalizedTitle, file);
}
for (const loc of locs) {
  const url = new URL(loc);
  const slug = url.pathname === "/ride" ? url.searchParams.get("place") : null;
  if (slug && ["arna-jharna","badli-bheruji","balsamand","beri-ganga-waterfall","devanahalli","ghoda-ghati-hills","guda-bishnoi","hesaraghatta","indroka-windmills","jhanwar-road","kaylana","khejarli","manchanabele","mekedatu-sangama","nandi-hills","osian","ramanagara","savandurga","skandagiri","sohna","yg-gudda-dam"].includes(slug)) {
    assert.fail("sitemap contains a query URL for a destination with a clean static page: " + loc);
  }
}

console.log("Site validation passed: " + locs.length + " sitemap URLs, " + cleanRideSlugs.size + " canonical static ride pages, " + (new Set(querySlugs).size + new Set(links).size) + " discovery ride-link checks.");
