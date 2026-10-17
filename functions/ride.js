const STATIC_RIDE_SLUGS = new Set([
  "nandi-hills",
  "skandagiri",
  "savandurga",
  "yg-gudda-dam",
  "manchanabele",
  "ramanagara",
  "hesaraghatta",
  "devanahalli",
  "mekedatu-sangama",
  "beri-ganga-waterfall",
  "guda-bishnoi",
  "arna-jharna",
  "balsamand",
  "ghoda-ghati-hills",
  "indroka-windmills",
  "jhanwar-road",
  "kaylana",
  "khejarli",
  "osian",
  "sohna"
]);

/**
 * Cloudflare Pages Function for the legacy query-based ride route.
 * Static destinations have dedicated HTML pages and should use their clean URL.
 * Dynamic destinations continue through to ride.html unchanged.
 */
export async function onRequest(context) {
  const request = context.request;
  if (request.method !== "GET" && request.method !== "HEAD") {
    return context.next();
  }

  const url = new URL(request.url);
  const slug = url.searchParams.get("place");
  if (slug && STATIC_RIDE_SLUGS.has(slug)) {
    const target = new URL("/rides/" + slug, url.origin);
    return Response.redirect(target.toString(), 301);
  }

  return context.next();
}
