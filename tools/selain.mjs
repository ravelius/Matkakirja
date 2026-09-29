// YHTEINEN CHROMIUM-KÄYNNISTYS KAIKILLE PLAYWRIGHT-TYÖKALUILLE (omistaja 29.9.2026 klo 19.2x:
// GPU-oletus kaikkiin Playwright-työkaluihin — vain 18/275 käytti --use-angle=metal ja loput piirsivät
// CPU:lla; Linnanrakentajan esikatselu kesti minuutteja 500 %:n CPU:lla, GPU:lla 6 s).
//
//   import { avaaChromium } from '../selain.mjs';
//   const selain = await avaaChromium({ args: ['--autoplay-policy=no-user-gesture-required'] });
//
// Mitä avaaChromium tekee:
//   1. Playwright: ensin repon oma node_modules ('playwright'), sitten PLAYWRIGHT_JS, sitten Macin Fablen
//      checkoutin node_modules ja kontin /opt/node22/… — worktreessä ajo ei siis tarvitse PLAYWRIGHT_JS:ää.
//   2. Selain: asetukset.executablePath > CHROMIUM > PW_CHROMIUM > kontin /opt/pw-browsers/chromium, jos se
//      on olemassa > Playwrightin oma selain. Kovakoodattu kontin polku ei enää kaada ajoa Macilla.
//   3. GPU OLETUKSENA Macilla: --use-angle=metal --enable-gpu --ignore-gpu-blocklist (headless-Chromium
//      käyttää silloin oikeaa näytönohjainta). Linuxissa (kontti, CI) lippuja ei lisätä.
//   4. CPU vain pyydettäessä: avaaChromium(asetukset, { cpu: true }) tai SELAIN_CPU=1 — suorituskykysavukkeet,
//      jotka mittaavat tarkoituksella ohjelmallista piirtoa. Jos kutsujan omissa lipuissa tai
//      SAVUKE_CHROMIUM_LIPUT-muuttujassa on jo --use-angle= tai --use-gl=, niitä kunnioitetaan eikä GPU-lippuja lisätä.
//   5. Mediapaneeli pois kuten tools/savukkeet/chromium-liput.mjs (kaikki --disable-features yhteen lippuun,
//      koska Chromium lukee vain viimeisen).
//
// chromium-liput.mjs (NODE_OPTIONS --import, aja-sarja.mjs) toimii yhä: se lisää rivin omat liput perään.

import { existsSync } from 'node:fs';

export const GPU_LIPUT = ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'];
const KONTIN_SELAIN = '/opt/pw-browsers/chromium';
const KONTIN_PLAYWRIGHT = '/opt/node22/lib/node_modules/playwright/index.js';
// Mac Studio: worktreeissä ei ole node_modulesia; Fablen checkoutin Playwright (sama kuin PLAYWRIGHT_JS-ohje).
const MACIN_PLAYWRIGHT = '/Users/Shared/Claude/Matkakirja-fable/node_modules/playwright/index.js';
// Sama lista kuin tools/savukkeet/chromium-liput.mjs OLETUSPOIS (sitä ei tuoda: moduuli kytkee
// tuotaessa oman launch-käärön ja tulostaa INFO-rivin).
const OLETUSPOIS = ['HardwareMediaKeyHandling', 'MediaSessionService'];

/** Liput sellaisinaan, paitsi kaikki --disable-features yhdeksi lipuksi oletusten kanssa. */
export function yhdistaLiput(liput) {
  const pois = new Set(OLETUSPOIS);
  const muut = [];
  for (const lippu of liput) {
    const m = /^--disable-features=(.*)$/.exec(lippu);
    if (m) m[1].split(',').filter(Boolean).forEach((f) => pois.add(f));
    else muut.push(lippu);
  }
  return [...muut, `--disable-features=${[...pois].join(',')}`];
}

let playwright = null;

/** Playwright-moduuli (chromium, webkit, firefox) samasta lähteestä kuin avaaChromium. */
export async function lataaPlaywright() {
  if (playwright) return playwright;
  for (const lahde of ['playwright', process.env.PLAYWRIGHT_JS, MACIN_PLAYWRIGHT, KONTIN_PLAYWRIGHT].filter(Boolean)) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const m = await import(lahde);
      if (m?.chromium ?? m?.default?.chromium) { playwright = m.default?.chromium ? m.default : m; return playwright; }
    } catch { /* seuraava lähde */ }
  }
  throw new Error('selain.mjs: Playwrightia ei löytynyt (repo, PLAYWRIGHT_JS, /opt/node22)');
}

/** Käynnistettävän selaimen polku; undefined = Playwrightin oma. */
export function selainPolku(annettu) {
  const polku = annettu ?? process.env.CHROMIUM ?? process.env.PW_CHROMIUM;
  if (polku) return polku;
  return existsSync(KONTIN_SELAIN) ? KONTIN_SELAIN : undefined;
}

/** Lisättävät piirtoliput: GPU Macilla, ellei CPU:ta pyydetty tai piirtotapaa jo valittu. */
export function piirtoLiput(annetut = [], { cpu = false } = {}) {
  if (cpu || process.env.SELAIN_CPU === '1' || process.platform !== 'darwin') return [];
  const kaikki = [...annetut, process.env.SAVUKE_CHROMIUM_LIPUT ?? ''].join(' ');
  if (/--use-(angle|gl)=/.test(kaikki)) return [];
  return GPU_LIPUT;
}

/**
 * Chromium Playwrightilla, GPU oletuksena Macilla.
 * @param {object} [asetukset] chromium.launch-asetukset (args, headless, executablePath …)
 * @param {{cpu?: boolean}} [valinnat] cpu: true = ohjelmallinen piirto (suorituskykymittaus)
 */
export async function avaaChromium(asetukset = {}, valinnat = {}) {
  const { chromium } = await lataaPlaywright();
  const omat = asetukset.args ?? [];
  const args = yhdistaLiput([...omat, ...piirtoLiput(omat, valinnat)]);
  return chromium.launch({ ...asetukset, executablePath: selainPolku(asetukset.executablePath), args });
}
