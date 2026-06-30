import { createHighlighter, type Highlighter } from "shiki";
import { parseHTML } from "linkedom";
import { escapeHtml } from "./escape";

let highlighter: Highlighter | null = null;

const SUPPORTED_LANGS = ["bash", "json", "yaml", "toml", "typescript", "javascript", "rust", "go", "shell", "sh", "zsh", "lua"];

async function getHighlighter(): Promise<Highlighter> {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-dark"],
      langs: SUPPORTED_LANGS,
    });
  }
  return highlighter;
}

/**
 * Get the Shiki highlighter instance (for use by other modules)
 */
export { getHighlighter };

/**
 * Highlight a code string with Shiki, returning just the inner HTML
 * (the highlighted spans without the pre/code wrapper)
 */
export async function highlightCode(code: string, lang: string): Promise<string> {
  const hl = await getHighlighter();
  const loadedLangs = hl.getLoadedLanguages();

  // Normalize language aliases
  let normalizedLang = lang.toLowerCase();
  if (normalizedLang === "sh" || normalizedLang === "shell" || normalizedLang === "zsh") {
    normalizedLang = "bash";
  }

  if (normalizedLang && loadedLangs.includes(normalizedLang as any)) {
    // Get Shiki's HTML output
    const shikiHtml = hl.codeToHtml(code, { lang: normalizedLang, theme: "github-dark" });

    // Extract just the code content from Shiki's output
    // Shiki outputs: <pre class="shiki..." style="..."><code>...spans...</code></pre>
    // We want just the spans inside the code tag
    const codeMatch = shikiHtml.match(/<code[^>]*>([\s\S]*?)<\/code>/);
    if (codeMatch) {
      return codeMatch[1];
    }
    return shikiHtml;
  }

  // Fallback: escape HTML for unknown languages
  return escapeHtml(code);
}

/**
 * Process HTML content to highlight all code blocks with Shiki
 * Finds <code class="language-xxx"> elements using a proper DOM parser
 * and replaces their content with Shiki-highlighted spans
 */
export async function highlightHtmlCodeBlocks(html: string): Promise<string> {
  const { document } = parseHTML(html);
  const codeBlocks = document.querySelectorAll('code[class*="language-"]');

  for (const el of codeBlocks) {
    const lang = el.className.match(/language-(\w+)/)?.[1];
    if (!lang) continue;

    const highlighted = await highlightCode(el.textContent ?? "", lang);
    el.innerHTML = highlighted;
  }

  return document.toString();
}
