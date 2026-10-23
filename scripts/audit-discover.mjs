import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const discover = readFileSync(new URL("../discover.html", import.meta.url), "utf8");
const ride = readFileSync(new URL("../ride.html", import.meta.url), "utf8");
const cards = [...discover.matchAll(/<article class="ride-card"([\s\S]*?)<\/article>/g)].map((m) => m[0]);
assert.ok(cards.length > 0, "Discover must contain destination cards");

const citySelect = discover.match(/<select id="city">([\s\S]*?)<\/select>/)?.[1] ?? "";
const options = new Set([...citySelect.matchAll(/<option value="([^"]+)">/g)].map((m) => m[1]).filter(Boolean));
const cityCounts = {};
const slugs = [];
const missingDistance = [];
const badDuration = [];

for (const card of cards) {
  const city = card.match(/data-city="([^"]+)"/)?.[1];
  const km = card.match(/data-km="([^"]*)"/)?.[1];
  const duration = card.match(/data-duration="([^"]*)"/)?.[1];
  const slug = card.match(/href="ride\?place=([^"]+)"/)?.[1];
  const title = card.match(/<h2>([\s\S]*?)<\/h2>/)?.[1] ?? "(untitled)";

  assert.ok(city, `Missing city on ${title}`);
  assert.ok(options.has(city), `City filter has no option for ${city} (${title})`);
  cityCounts[city] = (cityCounts[city] ?? 0) + 1;
  assert.ok(["short", "half", "long"].includes(duration), `Invalid duration ${duration} on ${title}`);
  if (km === "" || km === undefined) missingDistance.push(title);
  else assert.ok(Number.isFinite(Number(km)) && Number(km) >= 0, `Invalid distance on ${title}`);

  if (slug) {
    assert.ok(!slugs.includes(slug), `Duplicate ride link slug: ${slug}`);
    slugs.push(slug);
    assert.ok(ride.includes(`'${slug}':{`) || ride.includes(`"${slug}":{`), `No ride detail data for ${slug} (${title})`);
  }
}

assert.ok(discover.includes("km===null"), "Unknown distances must remain visible when distance filtering");
assert.ok(!discover.includes('data-duration="unknown"'), "Cards must not retain unknown duration values");
console.log(JSON.stringify({
  status: "PASS",
  destinations: cards.length,
  cities: cityCounts,
  linkedRideDetails: slugs.length,
  distancesToVerify: missingDistance,
}, null, 2));
