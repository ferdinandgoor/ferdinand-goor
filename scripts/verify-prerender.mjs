import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");

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

console.log(`verified ${htmlFiles.length} prerendered HTML files`);
