import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

// Used at build time by scripts/prerender.mjs to write the page's HTML into index.html
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
