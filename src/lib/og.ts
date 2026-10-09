// Address of a page's generated social preview image (written by scripts/og.mjs at build time).
// /blog/texas-sales-tax-guide/ -> /og/blog/texas-sales-tax-guide.png
export function ogImagePath(path: string) {
  return path === '/' ? '/og-image.png' : `/og${path.replace(/\/$/, '')}.png`;
}
