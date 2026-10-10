import { rm, mkdir, writeFile, cp } from "node:fs/promises";
import { dirname } from "node:path";
import cfg from "./site.config.mjs";
import { pages } from "./pages.mjs";

const base = (process.env.SITE_URL || cfg.siteUrl).replace(/\/$/, "");
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
for (const f of ["styles.css", "main.js", "favicon.svg", "og.png"]) await cp(f, `dist/${f}`);

const list = pages(cfg, base);
for (const p of list) {
  await mkdir(dirname(`dist/${p.file}`), { recursive: true });
  await writeFile(`dist/${p.file}`, p.html);
}
const today = new Date().toISOString().slice(0, 10);
const urls = list.filter((p) => p.index).map((p) => `<url><loc>${base}${p.path}</loc><lastmod>${today}</lastmod></url>`);
await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
await writeFile("dist/robots.txt", `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${base}/sitemap.xml\n`);
await writeFile("dist/_headers", `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n`);
console.log(`Built ${list.length} pages -> dist/ (site URL: ${base})`);
