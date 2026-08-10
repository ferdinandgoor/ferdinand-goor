import { mkdir, readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const rootDir = process.cwd();
const clientDir = path.join(rootDir, "dist");
const templatePath = path.join(clientDir, "index.html");
const serverEntry = path.join(rootDir, "dist-ssr", "entry-server.js");
const mashupDataPath = path.join(rootDir, "src", "data", "funnyMashupList.json");
const mountPattern = /(<div\s+id=["']root["'][^>]*>)([\s\S]*?)(<\/div>)/;
const funnyMashupList = JSON.parse(await readFile(mashupDataPath, "utf8"));

const routes = [
  "/",
  "/music-videos",
  "/music-production",
  "/youtube-videos",
  "/links",
  ...funnyMashupList
    .map((item) => item.slug)
    .filter(Boolean)
    .map((slug) => `/mashups/${slug}`),
];

const template = await readFile(templatePath, "utf8");
if (!mountPattern.test(template)) {
  throw new Error(`React mount point #root was not found in ${templatePath}.`);
}

const { render } = await import(`${pathToFileURL(serverEntry).href}?t=${Date.now()}`);

for (const route of routes) {
  const appHtml = await render(route);
  if (!appHtml.trim()) {
    throw new Error(`Prerender produced empty HTML for ${route}.`);
  }

  const html = template.replace(mountPattern, `$1${appHtml}$3`);
  const outputPath =
    route === "/"
      ? templatePath
      : path.join(clientDir, route.slice(1), "index.html");

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
  console.log(`prerendered ${route} -> ${path.relative(rootDir, outputPath)}`);
}
