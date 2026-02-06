/**
 * Extract CSS variable values from a theme.css file
 */
export function extractThemeColors(themeCss: string): {
  primary: string | null;
  primaryHover: string | null;
} {
  const primaryMatch = themeCss.match(/--color-primary:\s*([^;]+);/);
  const primaryHoverMatch = themeCss.match(/--color-primary-hover:\s*([^;]+);/);

  return {
    primary: primaryMatch ? primaryMatch[1].trim() : null,
    primaryHover: primaryHoverMatch ? primaryHoverMatch[1].trim() : null,
  };
}
