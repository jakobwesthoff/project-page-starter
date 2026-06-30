#!/usr/bin/env bun

import nunjucks from "nunjucks";
import { parseArgs } from "util";
import { join, relative } from "path";
import { readdir } from "fs/promises";
import { loadConfig, type Config } from "../lib/config";
import { extractDocs } from "../lib/readme";
import { renderMarkdown } from "../lib/markdown";
import { highlightHtmlCodeBlocks } from "../lib/highlighting";
import { extractThemeColors } from "../lib/theme";
import { loadIcons, replaceIcons } from "../lib/icons";
import { bundleCss } from "../lib/css";
import { minifyHtml } from "../lib/html";
import { createPipeline, type StepLogger } from "../lib/pipeline";

// --- Types ---

type Paths = {
  docs: string;
  readme: string;
  output: string;
  templates: string;
};

type GeneratorContext = {
  paths: Paths;
  config: Config;
};

type Theme = {
  css: string;
  primaryColor: string;
  primaryHoverColor: string;
};

type RenderedSite = {
  indexHtml: string;
  imprintHtml: string | null;
  faviconSvg: string;
  bundledCss: string;
};

// --- Helpers ---

async function mapSiteHtml(
  site: RenderedSite,
  fn: (html: string) => string | Promise<string>,
): Promise<RenderedSite> {
  const indexHtml = await fn(site.indexHtml);
  const imprintHtml = site.imprintHtml ? await fn(site.imprintHtml) : null;
  return { ...site, indexHtml, imprintHtml };
}

// --- Steps ---

/**
 * Load SVG icons from the templates/icons/ directory.
 */
async function loadIconsStep(
  { log }: StepLogger,
  { paths }: GeneratorContext,
): Promise<Map<string, string>> {
  const icons = await loadIcons(join(paths.templates, "icons"));
  for (const name of icons.keys()) {
    log(name);
  }
  return icons;
}

/**
 * Replace <icon name="..."/> elements with actual SVG markup in all rendered
 * HTML files.
 */
async function replaceIconsInSite(
  { log }: StepLogger,
  rendered: RenderedSite,
  icons: Map<string, string>,
): Promise<RenderedSite> {
  return mapSiteHtml(rendered, (html) => {
    log(html === rendered.indexHtml ? "index.html" : "imprint.html");
    return replaceIcons(html, icons);
  });
}

/**
 * Merge base theme CSS with project overrides and extract primary colors for
 * favicon generation.
 */
async function buildTheme(
  { log }: StepLogger,
  { paths }: GeneratorContext,
): Promise<Theme> {
  const baseThemeCss = await Bun.file(
    join(paths.templates, "styles/theme.css"),
  ).text();

  let projectThemeCss = "";
  try {
    projectThemeCss = await Bun.file(join(paths.docs, "theme.css")).text();
  } catch (err: unknown) {
    if (
      !(err instanceof Error && "code" in err && (err as NodeJS.ErrnoException).code === "ENOENT") &&
      !(err instanceof Error && err.message.includes("No such file"))
    ) {
      throw err;
    }
  }

  const css =
    baseThemeCss + "\n/* Project overrides */\n" + projectThemeCss;

  const baseColors = extractThemeColors(baseThemeCss);
  if (!baseColors.primary || !baseColors.primaryHover) {
    throw new Error("Base theme.css is missing required --color-primary or --color-primary-hover variables");
  }

  const projectColors = projectThemeCss ? extractThemeColors(projectThemeCss) : null;
  const primaryColor = projectColors?.primary ?? baseColors.primary;
  const primaryHoverColor = projectColors?.primaryHover ?? baseColors.primaryHover;

  log(`Primary: ${primaryColor}`);

  return { css, primaryColor, primaryHoverColor };
}

/**
 * Load each configured section from its source (README extraction or HTML
 * file) and render it to HTML.
 */
async function buildSections(
  { log }: StepLogger,
  { paths, config }: GeneratorContext,
): Promise<Array<{ id: string; html: string; source: string }>> {
  const sections: Array<{ id: string; html: string; source: string }> = [];

  for (const section of config.sections) {
    let html: string;

    let source: string;

    if (section.source === "readme") {
      log(`${section.id}: extracting from README.md`);
      source = "readme";
      const docsMarkdown = await extractDocs(paths.readme);
      html = await renderMarkdown(docsMarkdown);
    } else if (section.file) {
      log(`${section.id}: loading ${section.file}`);
      source = section.file;
      const rawHtml = await Bun.file(join(paths.docs, section.file)).text();
      html = await highlightHtmlCodeBlocks(rawHtml);
    } else {
      log(`${section.id}: skipped (no source)`);
      continue;
    }

    sections.push({ id: section.id, html, source });
  }

  return sections;
}

/**
 * Bundle all CSS files into a single minified stylesheet using LightningCSS.
 */
async function bundleCssStep(
  { log }: StepLogger,
  { paths }: GeneratorContext,
  theme: Theme,
): Promise<string> {
  const entryFile = join(paths.templates, "styles/styles.css");
  log("styles.css");
  const css = await bundleCss({
    entryFile,
    mergedThemeCss: theme.css,
    minify: true,
  });
  return css;
}

/**
 * Render Nunjucks templates (index, imprint, favicon) with config, sections,
 * and theme data.
 */
async function renderTemplates(
  { log }: StepLogger,
  { paths, config }: GeneratorContext,
  sections: Array<{ id: string; html: string; source: string }>,
  theme: Theme,
  bundledCss: string,
): Promise<RenderedSite> {
  const env = nunjucks.configure(paths.templates, { autoescape: true });

  log("index.html");
  const indexHtml = env.render("index.njk", { config, sections });

  let imprintHtml: string | null = null;
  if (config.imprint?.enabled) {
    log("imprint.html");
    imprintHtml = env.render("imprint.njk", { config });
  }

  log("favicon.svg");
  const faviconSvg = env.render("favicon.svg.njk", {
    primaryColor: theme.primaryColor,
    primaryHoverColor: theme.primaryHoverColor,
  });

  return { indexHtml, imprintHtml, faviconSvg, bundledCss };
}

/**
 * Minify rendered HTML files: collapse whitespace, remove comments, and
 * minify inline scripts.
 */
async function minifyHtmlInSite(
  { log }: StepLogger,
  rendered: RenderedSite,
): Promise<RenderedSite> {
  return mapSiteHtml(rendered, (html) => {
    log(html === rendered.indexHtml ? "index.html" : "imprint.html");
    return minifyHtml(html);
  });
}

/**
 * Write all rendered files and copy static stylesheets to the output
 * directory.
 */
async function writeOutput(
  { log }: StepLogger,
  { paths }: GeneratorContext,
  rendered: RenderedSite,
): Promise<void> {
  // Ensure output directories exist
  await Bun.write(join(paths.output, ".gitkeep"), "");
  await Bun.write(join(paths.output, "styles", ".gitkeep"), "");

  log("index.html");
  await Bun.write(join(paths.output, "index.html"), rendered.indexHtml);

  log("favicon.svg");
  await Bun.write(join(paths.output, "favicon.svg"), rendered.faviconSvg);

  log("styles/styles.css");
  await Bun.write(
    join(paths.output, "styles/styles.css"),
    rendered.bundledCss,
  );

  if (rendered.imprintHtml) {
    log("imprint.html");
    await Bun.write(
      join(paths.output, "imprint.html"),
      rendered.imprintHtml,
    );
  }
}

/**
 * Recursively collect all file paths under a directory.
 */
async function collectFiles(dir: string): Promise<string[]> {
  const files: string[] = [];

  // Inferring the type from the call keeps the correct `withFileTypes`
  // overload; a missing directory simply yields no entries.
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Copy project assets from the docs assets directory to the output assets
 * directory. Skips .gitkeep files. Silently skips if the source directory
 * does not exist or is empty.
 */
async function copyAssets(
  { log }: StepLogger,
  { paths }: GeneratorContext,
): Promise<void> {
  const srcDir = join(paths.docs, "assets");
  const destDir = join(paths.output, "assets");

  const files = await collectFiles(srcDir);

  for (const srcPath of files) {
    const relPath = relative(srcDir, srcPath);

    // Skip .gitkeep files
    if (relPath === ".gitkeep" || relPath.endsWith("/.gitkeep")) {
      continue;
    }

    const destPath = join(destDir, relPath);
    const content = await Bun.file(srcPath).arrayBuffer();
    await Bun.write(destPath, content);
    log(`assets/${relPath}`);
  }
}

/**
 * Print a summary of generated files.
 */
function printSummary(
  { paths }: GeneratorContext,
  rendered: RenderedSite,
): void {
  console.log(`\nGenerated site in ${paths.output}`);
  console.log("  index.html");
  console.log("  favicon.svg");
  console.log("  styles/");
  if (rendered.imprintHtml) {
    console.log("  imprint.html");
  }
  console.log("  assets/");
}

// --- Setup & CLI ---

function parseCliArgs(): Paths {
  const { values: args } = parseArgs({
    args: Bun.argv.slice(2),
    options: {
      docs: { type: "string", short: "d" },
      readme: { type: "string", short: "r" },
      output: { type: "string", short: "o" },
      templates: { type: "string", short: "t" },
    },
  });

  if (!args.docs || !args.readme || !args.output || !args.templates) {
    console.error(`Usage: generate.ts --docs <path> --readme <path> --output <path> --templates <path>

Required arguments:
  -d, --docs      Path to docs/ directory containing config.yaml, theme.css, sections/
  -r, --readme    Path to project README.md
  -o, --output    Output directory for generated site
  -t, --templates Path to templates/ directory in project-page-starter
`);
    process.exit(1);
  }

  return {
    docs: args.docs,
    readme: args.readme,
    output: args.output,
    templates: args.templates,
  };
}

async function setup(paths: Paths): Promise<GeneratorContext> {
  console.log("Loading configuration...");
  const config = await loadConfig(join(paths.docs, "config.yaml"));
  console.log(`  Project: ${config.name}`);
  return { paths, config };
}

// --- Main ---

async function main() {
  const paths = parseCliArgs();
  const ctx = await setup(paths);
  const step = createPipeline(ctx);

  const theme = await step("Processing theme", buildTheme);
  const icons = await step("Loading icons", loadIconsStep);
  const sections = await step("Processing sections", buildSections);

  const bundledCss = await step("Bundling CSS", (log, ctx) =>
    bundleCssStep(log, ctx, theme),
  );

  const rendered = await step("Rendering templates", (log, ctx) =>
    renderTemplates(log, ctx, sections, theme, bundledCss),
  );

  const withIcons = await step("Replacing icons", (log) =>
    replaceIconsInSite(log, rendered, icons),
  );

  const final = await step("Minifying HTML", (log) =>
    minifyHtmlInSite(log, withIcons),
  );

  await step("Writing output", (log, ctx) =>
    writeOutput(log, ctx, final),
  );

  await step("Copying assets", copyAssets);

  printSummary(ctx, rendered);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
