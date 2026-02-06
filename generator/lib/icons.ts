import { join } from "path";
import { readdir } from "fs/promises";
import { parseHTML } from "linkedom";

/**
 * Load all SVG icon files from a directory into a name→markup map.
 * The icon name is derived from the filename (e.g. "github.svg" → "github").
 */
export async function loadIcons(iconsDir: string): Promise<Map<string, string>> {
  const icons = new Map<string, string>();
  const files = await readdir(iconsDir);

  for (const file of files) {
    if (!file.endsWith(".svg")) continue;
    const name = file.replace(/\.svg$/, "");
    const content = await Bun.file(join(iconsDir, file)).text();
    icons.set(name, content.trim());
  }

  return icons;
}

/**
 * Replace all <i data-icon="..."></i> elements in the HTML with the
 * corresponding SVG markup, using a proper DOM parser.
 */
export function replaceIcons(html: string, icons: Map<string, string>): string {
  const { document } = parseHTML(html);
  const iconElements = document.querySelectorAll("i[data-icon]");

  for (const el of iconElements) {
    const name = el.getAttribute("data-icon");
    if (!name) continue;

    const svg = icons.get(name);
    if (!svg) {
      console.warn(`Warning: unknown icon "${name}"`);
      continue;
    }

    const { document: svgDoc } = parseHTML(svg);
    const svgEl = svgDoc.querySelector("svg");
    if (svgEl) {
      el.replaceWith(document.importNode(svgEl, true));
    }
  }

  return document.toString();
}
