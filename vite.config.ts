import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import { SITE_URL } from './src/data/site'

// Fills %SITE_URL% in index.html. Per-page tags and sitemap.xml are written by scripts/prerender.mjs.
function siteUrl(): Plugin {
  return {
    name: 'site-url',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', SITE_URL),
  }
}

// https://vite.dev/config/
export default defineConfig(({ command, isSsrBuild }) => ({
  base: '/',
  plugins: [
    // Source-path attributes are only for the dev inspector; keep them out of the live site
    command === 'serve' && inspectAttr(),
    react(),
    !isSsrBuild && siteUrl(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
