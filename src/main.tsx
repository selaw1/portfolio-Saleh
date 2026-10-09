import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
// Self-hosted so the first paint doesn't wait on Google Fonts
import '@fontsource/schibsted-grotesk/latin-400.css'
import '@fontsource/schibsted-grotesk/latin-500.css'
import '@fontsource/schibsted-grotesk/latin-600.css'
import './index.css'
import App from './App.tsx'
import { loadPostHtml } from './lib/blog'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
)

// A post page needs its article HTML before React attaches, so it matches the prerendered page
const slug = window.location.pathname.match(/^\/blog\/([^/]+)\/?$/)?.[1]

;(slug ? loadPostHtml(slug) : Promise.resolve()).then(() => {
  // The production build ships prerendered HTML; attach to it instead of re-rendering
  if (root.firstElementChild) {
    hydrateRoot(root, app)
  } else {
    createRoot(root).render(app)
  }
})
