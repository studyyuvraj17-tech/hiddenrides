import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const ignoredDirs = new Set([".git", "node_modules", ".wrangler"]);
const sourceExtensions = new Set([".html", ".css", ".js", ".json", ".jsonc", ".xml", ".txt", ".svg"]);
const walk = async (dir = root) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory() && !ignoredDirs.has(entry.name)) {
      files.push(...await walk(path.join(dir, entry.name)));
    } else if (entry.isFile() && sourceExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(path.join(dir, entry.name));
    }
  }
  return files;
};

const files = await walk();
const sources = [];
for (const file of files) {
  if (file.includes(`${path.sep}scripts${path.sep}audit-assets.mjs`)) continue;
  try { sources.push([file, await readFile(file, "utf8")]); } catch {}
}

const candidates = [];
for (const file of files) {
  const relative = path.relative(root, file).split(path.sep).join("/");
  if (!relative.startsWith("assets/")) continue;
  const basename = path.basename(relative);
  const usedBy = sources
    .filter(([source, text]) => source !== file && (text.includes(relative) || text.includes(basename)))
    .map(([source]) => path.relative(root, source).split(path.sep).join("/"));
  if (usedBy.length === 0) candidates.push(relative);
}

console.log("Asset reference audit (advisory only)");
console.log("Scanned source files:", sources.length);
console.log("Possible unreferenced assets:", candidates.length ? candidates.join(", ") : "none detected");
console.log("IMPORTANT: do not delete candidates automatically; runtime-generated paths and external references require manual review.");
