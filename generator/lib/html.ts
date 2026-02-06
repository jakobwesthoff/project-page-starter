import { minify } from "html-minifier-terser";

/**
 * Minify an HTML string: collapse whitespace, remove comments, and minify
 * inline scripts via Terser.
 */
export async function minifyHtml(html: string): Promise<string> {
  return await minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyJS: true,
  });
}
