import { Marked, type Tokens } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { highlightHtmlCodeBlocks } from "./highlighting";
import { escapeHtml } from "./escape";

/**
 * Render markdown to HTML with Shiki syntax highlighting
 * Code blocks are wrapped in our standard .code-block structure
 * Tables are wrapped in our .docs-table structure
 */
export async function renderMarkdown(markdown: string): Promise<string> {
  // GitHub-style alerts: > [!NOTE], > [!TIP], > [!IMPORTANT], > [!WARNING], > [!CAUTION]
  // Rendered as .callout-box divs (warning/caution get .callout-warning variant)
  const alertPattern = /^<p>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\n?/i;
  const warningTypes = new Set(["WARNING", "CAUTION"]);

  // marked v12+ passes a single token object to each renderer method, and the
  // methods run bound to the active parser instance. We use a plain object of
  // renderer overrides (instead of subclassing `marked.Renderer`) so the
  // extension system supplies `this.parser` at call time.
  const renderer = {
    code({ text, lang }: Tokens.Code): string {
      const language = lang || "";
      // Emit a placeholder code block; Shiki highlighting runs in a second
      // pass over the rendered HTML.
      return `<div class="code-block"><pre><code class="language-${language}">${escapeHtml(text)}</code></pre></div>`;
    },

    blockquote(this: { parser: { parse(tokens: Tokens.Generic[]): string } }, { tokens }: Tokens.Blockquote): string {
      const quote = this.parser.parse(tokens);
      const match = quote.match(alertPattern);
      if (match) {
        const alertType = match[1].toUpperCase();
        const isWarning = warningTypes.has(alertType);
        const cssClass = isWarning ? "callout-box callout-warning" : "callout-box";
        const content = quote.replace(alertPattern, "<p>");
        return `<div class="${cssClass}">${content}</div>`;
      }
      return `<blockquote>${quote}</blockquote>`;
    },

    table(this: { parser: { parseInline(tokens: Tokens.Generic[]): string } }, token: Tokens.Table): string {
      const head = token.header
        .map((cell) => `<th>${this.parser.parseInline(cell.tokens)}</th>`)
        .join("");
      const body = token.rows
        .map((row) => {
          const cells = row
            .map((cell) => `<td>${this.parser.parseInline(cell.tokens)}</td>`)
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");
      return `<div class="docs-table"><table class="table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
    },
  };

  const md = new Marked({ renderer });

  // Assign GitHub-compatible id slugs to headings (e.g. `## Query language` ->
  // `<h2 id="query-language">`). README anchor links are authored against
  // GitHub's slugging, so this extension (backed by github-slugger) makes those
  // in-document cross-references resolve. A fresh instance per render keeps the
  // duplicate-slug counter scoped to a single document.
  md.use(gfmHeadingId());

  // First pass: render markdown to HTML with placeholder code blocks
  let html = await md.parse(markdown);

  // Second pass: highlight all code blocks with Shiki
  html = await highlightHtmlCodeBlocks(html);

  return html;
}
