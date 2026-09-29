import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// The live address of the site. Used for the canonical URL, social previews,
// structured data and sitemap.xml. No trailing slash.
// public/robots.txt and public/llms.txt spell the address out too; update them if it changes.
const SITE_URL = 'https://saleh.selawii.com'

// Fills %SITE_URL% in index.html and writes sitemap.xml (dated each build) into the build.
function seoFiles(): Plugin {
  return {
    name: 'seo-files',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', SITE_URL),
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ command, isSsrBuild }) => ({
  base: '/',
  plugins: [
    // Source-path attributes are only for the dev inspector; keep them out of the live site
    command === 'serve' && inspectAttr(),
    react(),
    !isSsrBuild && seoFiles(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
