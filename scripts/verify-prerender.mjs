import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const siteUrl = "https://ferd.fr";

async function findHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory()
        ? findHtmlFiles(entryPath)
        : entry.name.endsWith(".html")
          ? [entryPath]
          : [];
    }),
  );
  return nested.flat();
}

const htmlFiles = await findHtmlFiles(distDir);
if (!htmlFiles.includes(path.join(distDir, "index.html"))) {
  throw new Error("dist/index.html is missing.");
}

const titles = new Set();
const descriptions = new Set();
const canonicalUrls = new Set();

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const route = `/${path.relative(distDir, path.dirname(file))}`.replace("/.", "/");
  const rootStart = html.search(/<div\s+id=["']root["'][^>]*>/i);

  if (rootStart === -1 || /^<div\s+id=["']root["'][^>]*>\s*<\/div>/i.test(html.slice(rootStart))) {
    throw new Error(`${route}: React root is missing or empty.`);
  }

  const h1Count = (html.match(/<h1(?:\s|>)/gi) ?? []).length;
  if (h1Count !== 1) {
    throw new Error(`${route}: expected exactly one H1, found ${h1Count}.`);
  }

  if (!/<script[^>]+type=["']module["'][^>]+src=/i.test(html)) {
    throw new Error(`${route}: hydration module script is missing.`);
  }

  if (!/Ferd|@ferd\.process|mashup/i.test(html)) {
    throw new Error(`${route}: characteristic page content is missing.`);
  }

  if (/noindex/i.test(html)) {
    throw new Error(`${route}: accidental noindex directive found.`);
  }

  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)?.[1]?.trim();
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1];
  if (!title || !description || !canonical?.startsWith(`${siteUrl}/`)) {
    throw new Error(`${route}: title, description or absolute canonical is missing.`);
  }
  if (titles.has(title) || descriptions.has(description)) {
    throw new Error(`${route}: duplicate SEO metadata found.`);
  }
  titles.add(title);
  descriptions.add(description);
  canonicalUrls.add(canonical);

  const jsonLdText = html.match(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i)?.[1];
  if (!jsonLdText) throw new Error(`${route}: JSON-LD is missing.`);
  const jsonLd = JSON.parse(jsonLdText);
  if (jsonLd["@context"] !== "https://schema.org" || !Array.isArray(jsonLd["@graph"])) {
    throw new Error(`${route}: JSON-LD structure is invalid.`);
  }

  const assetUrls = [
    ...html.matchAll(/<(?:script|img)[^>]+src=["']([^"']+)["']/gi),
    ...html.matchAll(/<link[^>]+href=["']([^"']+)["']/gi),
  ].map((match) => match[1]);

  for (const assetUrl of assetUrls) {
    if (!assetUrl.startsWith("/") || assetUrl.startsWith("//")) continue;
    const assetPath = path.join(distDir, assetUrl.split(/[?#]/, 1)[0]);
    await access(assetPath).catch(() => {
      throw new Error(`${route}: referenced asset does not exist: ${assetUrl}`);
    });
  }
}

const robots = await readFile(path.join(distDir, "robots.txt"), "utf8");
if (/Disallow:\s*\//i.test(robots) || !robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) {
  throw new Error("robots.txt blocks crawling or does not reference the absolute sitemap URL.");
}

const sitemap = await readFile(path.join(distDir, "sitemap.xml"), "utf8");
if (!/^<\?xml[^>]+\?>[\s\S]*<urlset\s+xmlns=["']http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9["'][^>]*>[\s\S]*<\/urlset>\s*$/i.test(sitemap.trim())) {
  throw new Error("sitemap.xml is not a valid sitemap document.");
}
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (sitemapUrls.length !== canonicalUrls.size || sitemapUrls.some((url) => !canonicalUrls.has(url))) {
  throw new Error("sitemap.xml and prerendered canonical routes differ.");
}

console.log(`verified ${htmlFiles.length} prerendered HTML files, metadata, JSON-LD, robots.txt and sitemap.xml`);
