import { mkdir, readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const rootDir = process.cwd();
const clientDir = path.join(rootDir, "dist");
const templatePath = path.join(clientDir, "index.html");
const serverEntry = path.join(rootDir, "dist-ssr", "entry-server.js");
const mashupDataPath = path.join(rootDir, "src", "data", "funnyMashupList.json");
const projectDataPath = path.join(rootDir, "src", "data", "musicVideoList.json");
const mountPattern = /(<div\s+id=["']root["'][^>]*>)\s*(<\/div>)/;
const funnyMashupList = JSON.parse(await readFile(mashupDataPath, "utf8"));
const musicVideoList = JSON.parse(await readFile(projectDataPath, "utf8"));
const slugifyProject = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const baseRoutes = [
  "/",
  "/projets",
  "/music-production",
  "/youtube-videos",
  "/process",
  "/realisateur-clip-nantes",
  "/cgv",
  ...musicVideoList.map((item) => `/projets/${slugifyProject(`${item.artist}-${item.song}`)}`),
  ...funnyMashupList
    .map((item) => item.slug)
    .filter(Boolean)
    .map((slug) => `/mashups/${slug}`),
];

const template = await readFile(templatePath, "utf8");
if (!mountPattern.test(template)) {
  throw new Error(
    `Empty React mount point #root was not found in ${templatePath}. Run the client build before prerendering.`,
  );
}

const {
  absoluteUrl,
  filmSeoRoutes,
  getSeoData,
  getStructuredData,
  render,
} = await import(`${pathToFileURL(serverEntry).href}?t=${Date.now()}`);

const routes = [...baseRoutes, ...filmSeoRoutes];

const escapeHtml = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const replaceMeta = (html, attribute, name, content) => {
  const pattern = new RegExp(
    `<meta\\s+${attribute}=["']${name}["'][^>]*>`,
    "i",
  );
  const tag = `<meta ${attribute}="${name}" content="${escapeHtml(content)}" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("<!--seo-head-->", `${tag}\n    <!--seo-head-->`);
};

const injectSeo = (html, route) => {
  const seo = getSeoData(route);
  const image = absoluteUrl(seo.image);
  let result = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`)
    .replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`);

  for (const [attribute, name, content] of [
    ["name", "description", seo.description],
    ["name", "robots", "index, follow"],
    ["property", "og:title", seo.title],
    ["property", "og:description", seo.description],
    ["property", "og:type", seo.type],
    ["property", "og:url", seo.canonical],
    ["property", "og:image", image],
    ["name", "twitter:card", "summary_large_image"],
    ["name", "twitter:title", seo.title],
    ["name", "twitter:description", seo.description],
    ["name", "twitter:image", image],
  ]) {
    result = replaceMeta(result, attribute, name, content);
  }

  const verification = process.env.VITE_GOOGLE_SITE_VERIFICATION?.trim();
  const verificationTag = verification
    ? `<meta name="google-site-verification" content="${escapeHtml(verification)}" />\n    `
    : "";
  const jsonLd = JSON.stringify(getStructuredData(route, seo)).replace(/</g, "\\u003c");
  return result.replace(
    "<!--seo-head-->",
    `${verificationTag}<script type="application/ld+json" data-seo-json-ld>${jsonLd}</script>`,
  );
};

for (const route of routes) {
  const appHtml = await render(route);
  if (!appHtml.trim()) {
    throw new Error(`Prerender produced empty HTML for ${route}.`);
  }

  const html = injectSeo(template.replace(mountPattern, `$1${appHtml}$2`), route);
  const outputPath =
    route === "/"
      ? templatePath
      : path.join(clientDir, route.slice(1), "index.html");

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
  console.log(`prerendered ${route} -> ${path.relative(rootDir, outputPath)}`);
}

const sitemapRoutes = routes.filter((route) => route !== "/realisateur-clip-nantes");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapRoutes.map((route) => `  <url><loc>https://ferd.fr${route === "/" ? "/" : route}</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile(path.join(clientDir, "sitemap.xml"), sitemap);
