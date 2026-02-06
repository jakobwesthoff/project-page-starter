import { marked, Marked } from "marked";
import { highlightHtmlCodeBlocks } from "./highlighting";
import { escapeHtml } from "./escape";

/**
 * Render markdown to HTML with Shiki syntax highlighting
 * Code blocks are wrapped in our standard .code-block structure
 * Tables are wrapped in our .docs-table structure
 */
export async function renderMarkdown(markdown: string): Promise<string> {
  // Configure marked to use our custom renderers
  const renderer = new marked.Renderer();

  renderer.code = function(code: string, lang?: string): string {
    const language = lang || "";
    // Return a placeholder that we'll replace after async processing
    return `<div class="code-block"><pre><code class="language-${language}">${escapeHtml(code)}</code></pre></div>`;
  };

  renderer.table = function(header: string, body: string): string {
    return `<div class="docs-table"><table class="table"><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
  };

  const md = new Marked({ renderer });

  // First pass: render markdown to HTML with placeholder code blocks
  let html = await md.parse(markdown);

  // Second pass: highlight all code blocks with Shiki
  html = await highlightHtmlCodeBlocks(html);

  return html;
}
