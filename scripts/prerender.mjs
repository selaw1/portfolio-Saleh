// Writes the rendered page into dist/index.html so search engines and link
// previews get the full content without running JavaScript.
import { readFile, rm, writeFile } from 'node:fs/promises';

const { render } = await import('../dist-server/entry-server.js');

const file = new URL('../dist/index.html', import.meta.url);
const html = await readFile(file, 'utf8');
const marker = '<!--app-html-->';

if (!html.includes(marker)) {
  throw new Error(`prerender: ${marker} not found in dist/index.html`);
}

await writeFile(file, html.replace(marker, render()));
await rm(new URL('../dist-server', import.meta.url), { recursive: true, force: true });

console.log('prerender: wrote page HTML into dist/index.html');
