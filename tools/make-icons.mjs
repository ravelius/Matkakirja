// Luo sovelluskuvakkeet (assets/icon.svg + PNG:t): vanha maailmankartta
// kahtena pallonpuoliskona, kuten pelin aloitusnäkymässä. Punainen
// lentoreitti ylittää Atlantin ja pallonpuoliskojen välissä lepää
// kultainen vinoneliö — sama merkki kuin pelin aarrelaatoissa.
//
//   node tools/make-icons.mjs                     # vain SVG
//   node tools/make-icons.mjs --png <polku>       # myös PNG:t Playwrightilla
//
// PNG:t on versioitu repoon, joten skriptiä ei tarvitse ajaa normaalisti.
// Jos Playwrightin selainta ei löydy automaattisesti, anna polku
// ympäristömuuttujassa ICON_CHROMIUM.

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { avaaChromium } from './selain.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const SIZE = 512;

/*
 * Vinoneliö annettuun kohtaan. Sama merkki kuin pelin aarrelaatoissa
 * (js/tokens.js: symbol '◈'), joten kuvake ja lauta puhuvat samaa
 * kieltä. Kaksi sisäkkäistä vinoneliötä tekee siitä ◈:n eikä pelkkää
 * ruutua — ulompi täytetään kullalla, sisempi jää viivaksi.
 */
function timanttiPath(cx, cy, rx, ry) {
  const p = (x, y) => `${x.toFixed(1)},${y.toFixed(1)}`;
  return `M${p(cx, cy - ry)} L${p(cx + rx, cy)} L${p(cx, cy + ry)} L${p(cx - rx, cy)} Z`;
}

// Kuvake: pergamenttilaatta, jolla vanha maailmankartta kahtena
// pallonpuoliskona. Mantereet ovat tarkoituksella karkeita läiskiä —
// kuvakkeen pitää lukea "vanha maailmankartta" vielä 60 pikselissä.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" role="img" aria-label="Unohdettu aarre">
  <defs>
    <radialGradient id="paper" cx="40%" cy="34%" r="78%">
      <stop offset="0%" stop-color="#f8ecd0"/>
      <stop offset="62%" stop-color="#e8d2a5"/>
      <stop offset="100%" stop-color="#c9a86f"/>
    </radialGradient>
    <radialGradient id="gold" cx="36%" cy="30%" r="72%">
      <stop offset="0%" stop-color="#ffdb85"/>
      <stop offset="58%" stop-color="#e5ac36"/>
      <stop offset="100%" stop-color="#b9811d"/>
    </radialGradient>
    <clipPath id="lansi"><circle cx="164" cy="266" r="106"/></clipPath>
    <clipPath id="ita"><circle cx="348" cy="266" r="106"/></clipPath>
  </defs>

  <rect width="${SIZE}" height="${SIZE}" rx="112" fill="#241a12"/>
  <rect x="24" y="24" width="${SIZE - 48}" height="${SIZE - 48}" rx="92" fill="url(#paper)"/>
  <rect x="52" y="52" width="${SIZE - 104}" height="${SIZE - 104}" rx="72"
        fill="none" stroke="#46331f" stroke-width="6" stroke-dasharray="22 16" opacity="0.45"/>

  <!-- Napapallot: pieni pohjoinen ylhäällä ja eteläinen alhaalla,
       kuten pelin maailmankartassa ja vanhoissa kaksoispallokartoissa. -->
  <g stroke="#46331f">
    <circle cx="256" cy="116" r="37" fill="#f1e2bd" stroke-width="5"/>
    <path d="M232,110 q10,-12 26,-9 q16,3 20,13 q-6,10 -24,10 q-16,0 -22,-14 z"
          fill="#c9ab7c" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="256" cy="414" r="37" fill="#f1e2bd" stroke-width="5"/>
    <path d="M230,414 q10,-14 28,-12 q18,2 24,12 q-8,14 -28,14 q-18,0 -24,-14 z"
          fill="#e9dcc0" stroke-width="4" stroke-linejoin="round"/>
  </g>

  <!-- Pallonpuoliskot -->
  <circle cx="164" cy="266" r="106" fill="#f1e2bd" stroke="#46331f" stroke-width="7"/>
  <circle cx="348" cy="266" r="106" fill="#f1e2bd" stroke="#46331f" stroke-width="7"/>

  <!-- Astejanat himmeinä -->
  <g stroke="#46331f" fill="none" stroke-width="3" opacity="0.2">
    <ellipse cx="164" cy="266" rx="48" ry="106"/>
    <line x1="60" y1="266" x2="268" y2="266"/>
    <ellipse cx="348" cy="266" rx="48" ry="106"/>
    <line x1="244" y1="266" x2="452" y2="266"/>
  </g>

  <!-- Läntinen pallonpuolisko: Amerikat -->
  <g clip-path="url(#lansi)" fill="#c9ab7c" stroke="#46331f" stroke-width="6" stroke-linejoin="round">
    <path d="M84,222 q4,-40 46,-50 q46,-11 80,3 q26,11 13,32 q-17,9 -24,28 q-5,17 -22,23 q-11,21 -28,15 q-9,-15 -28,-19 q-30,-9 -37,-32 z"/>
    <path d="M158,286 q24,-7 39,9 q13,13 7,36 q-7,28 -17,47 q-9,17 -20,10 q-11,-9 -13,-32 q-2,-26 -5,-43 q-2,-21 9,-27 z"/>
  </g>

  <!-- Itäinen pallonpuolisko: Eurooppa, Aasia, Afrikka, Australia -->
  <g clip-path="url(#ita)" fill="#c9ab7c" stroke="#46331f" stroke-width="6" stroke-linejoin="round">
    <path d="M262,234 q11,-43 56,-51 q58,-13 103,-2 q37,9 43,30 q4,19 -19,26 q-28,6 -54,4 q-17,13 -39,9 q-26,-5 -47,0 q-32,4 -43,-16 z"/>
    <path d="M298,264 q19,-15 45,-9 q24,7 26,30 q2,26 -9,50 q-9,21 -26,23 q-17,0 -26,-21 q-9,-24 -13,-43 q-4,-21 3,-30 z"/>
    <path d="M402,326 q19,-9 34,2 q13,11 7,28 q-9,19 -28,17 q-19,-2 -24,-19 q-4,-17 11,-28 z"/>
  </g>

  <!-- Lentoreitti Atlantin yli -->
  <path d="M184,232 Q256,170 332,234" fill="none" stroke="#c2452f"
        stroke-width="9" stroke-linecap="round" stroke-dasharray="1 20"/>
  <circle cx="184" cy="232" r="9" fill="#c2452f"/>
  <circle cx="332" cy="234" r="9" fill="#c2452f"/>

  <!-- Unohdettu aarre lepää pallonpuoliskojen välissä, lentoreitin alla.
       Keskellä eikä minkään maanosan päällä: aarre voi olla missä vain. -->
  <g stroke="#5c430f" stroke-linejoin="round">
    <path d="${timanttiPath(256, 300, 42, 56)}" fill="url(#gold)" stroke-width="8"/>
    <path d="${timanttiPath(256, 300, 21, 28)}" fill="none" stroke-width="6" opacity="0.7"/>
  </g>

  <!-- Aallot -->
  <g stroke="#7d9bb0" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.7">
    <path d="M84,424 q12,-9 24,0 q12,9 24,0"/>
    <path d="M380,418 q12,-9 24,0 q12,9 24,0"/>
  </g>
</svg>
`;

writeFileSync(join(root, 'assets/icon.svg'), svg);
console.log('assets/icon.svg');

const pngFlag = process.argv.indexOf('--png');
if (pngFlag !== -1) {
  const playwrightPath = process.argv[pngFlag + 1];
  if (!playwrightPath) throw new Error('Anna Playwrightin polku: --png <polku/index.mjs>');
  const executablePath = process.env.ICON_CHROMIUM;
  const browser = await avaaChromium(executablePath ? { executablePath } : {});
  const page = await browser.newPage();

  for (const [size, padding, file] of [
    [192, 0, 'assets/icon-192.png'],
    [512, 0, 'assets/icon-512.png'],
    [180, 0, 'assets/apple-touch-icon.png'],
    [512, 56, 'assets/icon-maskable-512.png'],
  ]) {
    const inner = size - padding * 2;
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(
      `<body style="margin:0;background:#241a12">
         <div style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center">
           <div style="width:${inner}px;height:${inner}px">${svg}</div>
         </div>
       </body>`,
    );
    writeFileSync(join(root, file), await page.screenshot());
    console.log(file);
  }
  await browser.close();
}
