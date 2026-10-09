// Generates a 1200x630 social preview image for every page that has a `card` in src/routes.tsx.
// Used by scripts/prerender.mjs; the images land in dist/og/ (see src/lib/og.ts for the paths).
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const fontDir = new URL('./fonts/', import.meta.url);
const fonts = [
  { name: 'Schibsted Grotesk', data: await readFile(new URL('SchibstedGrotesk-Regular.ttf', fontDir)), weight: 400 },
  { name: 'Schibsted Grotesk', data: await readFile(new URL('SchibstedGrotesk-Medium.ttf', fontDir)), weight: 500 },
];

// Site palette (src/index.css)
const porcelain = 'rgb(242, 243, 240)';
const evergreen = 'rgb(14, 59, 51)';
const deep = 'rgb(9, 40, 35)';
const brass = 'rgb(201, 169, 106)';

const h = (type, style, ...children) => ({ type, props: { style, children: children.length === 0 ? undefined : children.length === 1 ? children[0] : children } });

function card({ eyebrow, title }) {
  const size = title.length > 70 ? 58 : title.length > 45 ? 66 : 76;
  return h(
    'div',
    {
      width: 1200,
      height: 630,
      display: 'flex',
      flexDirection: 'column',
      padding: '64px 72px',
      backgroundImage: `linear-gradient(135deg, ${evergreen} 0%, ${deep} 70%)`,
      color: porcelain,
      fontFamily: 'Schibsted Grotesk',
    },
    h(
      'div',
      { display: 'flex', justifyContent: 'space-between', fontSize: 26 },
      h('div', { display: 'flex', fontWeight: 500 }, 'Saleh Ahmad'),
      h('div', { display: 'flex', opacity: 0.6 }, 'Accounting · Weatherford, Texas')
    ),
    h(
      'div',
      { display: 'flex', alignItems: 'center', marginTop: 'auto', fontSize: 28, color: brass },
      h('div', { width: 56, height: 2, backgroundColor: brass, marginRight: 20 }),
      eyebrow
    ),
    h('div', { display: 'flex', marginTop: 24, fontSize: size, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.035em' }, title),
    h('div', { display: 'flex', marginTop: 48, fontSize: 24, opacity: 0.6 }, 'saleh.selawii.com')
  );
}

export async function writeOgImages(routes, dist, ogImagePath) {
  let count = 0;
  for (const { path, card: text } of routes) {
    if (!text) continue;
    const svg = await satori(card(text), { width: 1200, height: 630, fonts });
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
    const file = new URL(`.${ogImagePath(path)}`, dist);
    await mkdir(new URL('.', file), { recursive: true });
    await writeFile(file, png);
    count++;
  }
  return count;
}
