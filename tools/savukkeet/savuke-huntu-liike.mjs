/*
 * SAVUKE: HUNTU PYSYY LIIKKEEN AJAN — LÄHTÖ- JA KOHDEMAA AUKKOINA
 * (omistaja 21.9.2026, Fablen erä "huntu liikkeen ajan").
 *
 * Sääntö: kerman huntu (80 %) pysyy päällä myös nappulan etenemisen
 * ajan, mutta liikkeen ajaksi SEKÄ lähtömaa ETTÄ kohdemaa ovat hunnun
 * ulkopuolella (kaksi aukkoa maapolygonien mukaan); perillä aukko on
 * vain kohdemaassa. Toteutus js/laattapyramidi.js HUNTU PYSYY LIIKKEEN
 * AJAN; kytkin js/ui.js matkanKermattomuus(pois, kohdeIso).
 *
 * MITTAUS KUVAKAAPPAUKSESTA kolmessa hetkessä — ennen noppaa, liikkeen
 * puolivälissä, perillä — kolmessa pisteessä: lähtömaan sisus (GRC,
 * Larisa), kohdemaan sisus (BGR, Plovdiv) ja muu maailma (MKD, Skopje;
 * vara TUR, Edirne). Pikselin "kermaisuus" on sen etäisyys kerman
 * väristä (#faf4d6) 80 %:n huntu antaa lähes kerman värin; paljas
 * reliefi on tummempi ja värikkäämpi. Matka on Ateena → Sofia (4
 * askelta maitse), sama kuin savuke-nappula-liikkeessä.
 *
 * VARTIOT (390 ja 1400 px):
 *   1. ENNEN NOPPAA: lähtömaa paljas, kohdemaa ja muu maailma hunnussa.
 *   2. LIIKKEEN PUOLIVÄLISSÄ: lähtömaa JA kohdemaa paljaina, muu
 *      maailma hunnussa; tasoituksen lippu ja kohdemaa asetettu.
 *   3. PERILLÄ: kohdemaa paljas, lähtömaa ja muu maailma hunnussa;
 *      lippu pois.
 *   4. Ei sivuvirheitä.
 *
 * Aja: PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-huntu-liike.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { decodePng } from './pallon-liike-mittarit.mjs';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=pallo`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) lapi += 1;
  console.log(`${ehto ? 'OK  ' : 'FAIL'}  ${nimi}${ehto ? '' : ` — ${lisa}`}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const valimuisti = new Map();
async function ampariHaku(url) {
  if (valimuisti.has(url)) return valimuisti.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' }))
    .catch(() => null);
  valimuisti.set(url, lupaus);
  return lupaus;
}

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('ateena');
const TALLENNE = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});

const RUUDUT = (process.env.SAVUKE_RUUTU ? [process.env.SAVUKE_RUUTU] : ['390', '1400']).map((w) => (
  w === '390' ? { nimi: '390', width: 390, height: 844 } : { nimi: '1400', width: 1400, height: 900 }
));

/*
 * MITTAPISTEET: maa, nimi, lat, lon — useampi ehdokas maata kohti, koska
 * kamera on eri paikassa ennen noppaa (Ateena), liikkeessä (matkan
 * näkymä) ja perillä (Sofia). Kustakin maasta mitataan se ehdokas, joka
 * on ruudulla kartan vapaalla alalla (ei yläpalkin, paikkarivin eikä
 * alalaidan kalusteiden alla). `muu` = muu maailma.
 */
const PISTEET = [
  { maa: 'GRC', nimi: 'Boiotia', lat: 38.45, lon: 23.1 },
  { maa: 'GRC', nimi: 'Larisa', lat: 39.64, lon: 22.42 },
  { maa: 'GRC', nimi: 'Serres', lat: 41.09, lon: 23.55 },
  { maa: 'BGR', nimi: 'Sofian itäpuoli', lat: 42.55, lon: 23.9 },
  { maa: 'BGR', nimi: 'Smoljan', lat: 41.57, lon: 24.7 },
  { maa: 'BGR', nimi: 'Plovdiv', lat: 42.14, lon: 24.75 },
  { maa: 'muu', nimi: 'Kriva Palanka (MKD)', lat: 42.2, lon: 22.3 },
  { maa: 'muu', nimi: 'Bitola (MKD)', lat: 41.03, lon: 21.34 },
  { maa: 'muu', nimi: 'Skopje (MKD)', lat: 41.99, lon: 21.43 },
  { maa: 'muu', nimi: 'Edirne (TUR)', lat: 41.68, lon: 26.56 },
];
/** Kartan vapaa ala ruudulla (px): yläpalkki + paikkarivi, alalaidan kalusteet, reunat. */
const VAPAA = { yla: 120, ala: 130, sivu: 24 };
/** Kerman väri (js/laattapyramidi.js pyramidinTasoitus oletus). */
const KERMA = [0xfa, 0xf4, 0xd6];
/*
 * KERMAISUUDEN RAJA: 80 %:n huntu jättää pikselin muutaman yksikön
 * päähän kerman väristä; paljas reliefi (seepia, vihreä, ruskea) on
 * kymmeniä yksiköitä kauempana. Raja on niiden välissä.
 */
const KERMARAJA = 32;

/** Mediaanietäisyys kerman väristä pisteen ympäriltä (säde px). */
const kermaEtaisyys = (kuva, x, y, sade = 5) => {
  const arvot = [];
  for (let dy = -sade; dy <= sade; dy += 1) {
    for (let dx = -sade; dx <= sade; dx += 1) {
      const px = Math.round(x + dx);
      const py = Math.round(y + dy);
      if (px < 0 || py < 0 || px >= kuva.width || py >= kuva.height) continue;
      const i = (py * kuva.width + px) * 4;
      arvot.push(Math.hypot(kuva.data[i] - KERMA[0], kuva.data[i + 1] - KERMA[1], kuva.data[i + 2] - KERMA[2]));
    }
  }
  if (!arvot.length) return Infinity;
  arvot.sort((a, b) => a - b);
  return arvot[Math.floor(arvot.length / 2)];
};

for (const ruutu of RUUDUT) {
  console.log(`\n=== RUUTU ${ruutu.nimi} ===`);
  /* eslint-disable no-await-in-loop */
  const ctx = await selain.newContext({
    viewport: { width: ruutu.width, height: ruutu.height },
    deviceScaleFactor: 1,
    serviceWorkers: 'block',
    hasTouch: ruutu.nimi === '390',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
    } catch { /* yksityinen tila */ }
  }, TALLENNE);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route(/^https?:\/\/(?!localhost)/, async (route) => {
    const url = route.request().url();
    if (/media\.matkakirja\.app|r2\.dev\//.test(url)) {
      if (/\.(mp3|mp4|webm|ogg|wav|m4a)(\?|$)/.test(url)) { route.abort(); return; }
      const v = await ampariHaku(url);
      if (!v || v.status !== 200) { route.abort(); return; }
      route.fulfill({
        status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
        headers: { 'access-control-allow-origin': '*' },
      });
      return;
    }
    route.abort();
  });
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  await sivu.waitForTimeout(3000);
  await sivu.evaluate(async () => {
    const { ui, game: g } = window.matkakirja;
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;
    g.player.pos = { type: 'city', city: 'ateena' };
    g.world.visited.add('ateena');
    g.phase = 'action';
    ui.render();
    // Saapumisvirran kortit pois kuvan päältä.
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(ui);
    for (const el of document.querySelectorAll('.fokusnosto-kerros, .fokuskohde-popup, .saapumistraileri')) el.remove();
    await new Promise((r) => setTimeout(r, 1500));
  });
  // Laatat valmiiksi ennen ensimmäistä mittaa (renkaat saapuvat laiskasti).
  await sivu.waitForFunction(async () => {
    const m = await import('/js/laattapyramidi.js');
    return Boolean(m.pyramidinTasoitus()?.suoja?.tarkka);
  }, null, { timeout: 60000 }).catch(() => {});
  await sivu.waitForTimeout(4000);

  /** Mittapisteet ruudulla + tasoituksen tila. */
  const lueTila = () => sivu.evaluate(async (pisteet) => {
    const { ui } = window.matkakirja;
    const l = ui.pallolauta;
    const m = await import('/js/laattapyramidi.js');
    const koti = l.kotelo.getBoundingClientRect();
    const t = m.pyramidinTasoitus();
    return {
      pisteet: pisteet.map((p) => {
        const s = l.pallo.getScreenCoords(p.lat, p.lon, 0);
        return s ? { ...p, x: koti.left + s.x, y: koti.top + s.y } : { ...p, x: null, y: null };
      }),
      lippu: m.tasoituksenLiike(),
      kohde: m.tasoituksenLiikkeenKohde?.() ?? null,
      maa: m.pyramidinVaritasonMaa?.() ?? null,
      renkaita: t?.renkaat?.length ?? 0,
      liikkeenKohde: t?.liikkeenKohde ?? null,
      avain: t?.avain ?? '',
      luokka: document.body.classList.contains('kerma-pois-liikkeessa'),
      liikkuva: Boolean(document.querySelector('.pallolauta-liikkuva')),
    };
  }, PISTEET);

  /*
   * KORTIT JA TRAILERI POIS KUVAN PÄÄLTÄ MITTAA VARTEN: saapumisvirta
   * nostaa kuvakortteja kartan päälle omaan tahtiinsa (fokusvirta), ja
   * kortti mittapisteen päällä mittaisi valokuvaa eikä huntua. Piilotus on
   * tyyli, joka ei muuta pelin tilaa.
   */
  await sivu.addStyleTag({ content: '.fokusvirta-kortti, .fokusvirta-isokuva, .fokusvirta-kupla, .fokusvirta-lentokerros, .saapumistraileri, .fokusnosto-kerros, .fokuskohde-popup { visibility: hidden !important; }' });
  const mittaa = async (hetki) => {
    const tila = await lueTila();
    const png = await sivu.screenshot();
    if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `huntu-${hetki}-${ruutu.nimi}.png`), png);
    const kuva = decodePng(png);
    const arvot = {};
    const kaytetyt = {};
    for (const p of tila.pisteet) {
      if (arvot[p.maa] != null) continue;
      const nakyy = p.x != null && p.x >= VAPAA.sivu && p.x < ruutu.width - VAPAA.sivu
        && p.y >= VAPAA.yla && p.y < ruutu.height - VAPAA.ala;
      if (!nakyy) continue;
      arvot[p.maa] = Math.round(kermaEtaisyys(kuva, p.x, p.y));
      kaytetyt[p.maa] = `${p.nimi}@${Math.round(p.x)},${Math.round(p.y)}`;
    }
    for (const maa of ['GRC', 'BGR', 'muu']) if (arvot[maa] == null) arvot[maa] = null;
    tieto(`${ruutu.nimi} · ${hetki}`, `kermaetäisyys ${JSON.stringify(arvot)}; pisteet ${JSON.stringify(kaytetyt)}; lippu ${tila.lippu}, `
      + `kohde ${tila.kohde}, maa ${tila.maa}, renkaita ${tila.renkaita}, avain ${tila.avain}`);
    return { ...tila, arvot };
  };
  const paljas = (arvot, maa) => arvot[maa] != null && arvot[maa] > KERMARAJA;
  const hunnussa = (arvot, maa) => arvot[maa] != null && arvot[maa] <= KERMARAJA;
  // Piste, joka ei ole ruudulla (kapea puhelinruutu Ateenan tai Sofian
  // näkymässä), ei voi kumota väitettä: se vain jää mittaamatta.
  const hunnussaTaiPiilossa = (arvot, maa) => arvot[maa] == null || arvot[maa] <= KERMARAJA;

  /* ── 1. ennen noppaa ─────────────────────────────────────────────── */
  const ennen = await mittaa('ennen');
  vaadi(`${ruutu.nimi} · 1. ennen noppaa: lähtömaa paljas, kohdemaa ja muu maailma hunnussa`,
    paljas(ennen.arvot, 'GRC') && hunnussa(ennen.arvot, 'BGR') && hunnussaTaiPiilossa(ennen.arvot, 'muu')
      && !ennen.lippu,
    JSON.stringify(ennen.arvot));


  /* ── 2. liikkeen puolivälissä ─────────────────────────────────────── */
  await sivu.evaluate(async () => {
    const { ui, game: g } = window.matkakirja;
    const { findMoves } = await import('/js/rules.js');
    const { autokyydinAskel } = await import('/js/siirtokoreografia.js');
    const moves = findMoves(g.board, g.player.pos, 4, { mode: 'land' });
    const siirto = [...moves.entries()].find(([, v]) => v.path[v.path.length - 1]?.city === 'sofia');
    if (!siirto) { window.__ajo = Promise.resolve('ei siirtoa'); return; }
    const polku = siirto[1].path;
    const from = { ...g.player.pos };
    window.__ajo = ui.animatePawn(g.player, from, polku, autokyydinAskel(polku.length), {
      saatto: true, maitse: true, kyyti: true, tapa: 'land',
    }).then(() => { g.player.pos = { type: 'city', city: 'sofia' }; g.world.visited.add('sofia'); ui.render(); return 'ok'; });
  });
  // Odotetaan, että liikkuva nappula on laudalla (ennakkozoomi ohi) ja
  // laatat ehtineet koota uudelleen: mitta liikkeen puolivälistä.
  await sivu.waitForFunction(() => Boolean(document.querySelector('.pallolauta-liikkuva')), null, { timeout: 30000 })
    .catch(() => {});
  /*
   * MITTA LIIKKEEN AIKANA: laatat kootaan uudelleen liikkeen hunnulla
   * (kaksi aukkoa) vasta kun ne on haettu ja maskattu uudestaan — se
   * kestää sekunnin–pari — ja matka on lyhyt. Siksi mitataan
   * toistuvasti niin kauan kuin nappula liikkuu, ja väite on: JOSSAIN
   * vaiheessa liikettä lähtö- ja kohdemaa ovat molemmat paljaina ja muu
   * maailma hunnussa. Ensimmäinen osuma riittää.
   */
  const naytteet = [];
  let kesken = null;
  for (let i = 0; i < 14; i += 1) {
    const n = await mittaa(`liike${i}`);
    naytteet.push({ liikkuva: n.liikkuva, arvot: n.arvot });
    if (!kesken) kesken = n;
    if (n.liikkuva && paljas(n.arvot, 'GRC') && paljas(n.arvot, 'BGR') && hunnussa(n.arvot, 'muu')) {
      kesken = n;
      break;
    }
    if (!n.liikkuva && i > 0) break;
    await sivu.waitForTimeout(150);
  }
  vaadi(`${ruutu.nimi} · 2a. liikkeessä: liikkeen huntu päällä ja kohdemaa asetettu (BGR)`,
    kesken.lippu && kesken.kohde === 'BGR' && kesken.liikkeenKohde === 'BGR',
    JSON.stringify({ lippu: kesken.lippu, kohde: kesken.kohde, liikkeenKohde: kesken.liikkeenKohde }));
  vaadi(`${ruutu.nimi} · 2b. liikkeessä: lähtömaa JA kohdemaa paljaina, muu maailma hunnussa`,
    kesken.liikkuva && paljas(kesken.arvot, 'GRC') && paljas(kesken.arvot, 'BGR') && hunnussa(kesken.arvot, 'muu'),
    `näytteet ${JSON.stringify(naytteet)}`);
  const tulos = await sivu.evaluate(() => window.__ajo);
  tieto(`${ruutu.nimi} · matka`, tulos);
  // Saapumistraileri ja -kortit pois kuvan päältä ennen perillä-mittaa.
  await sivu.waitForFunction(() => !document.querySelector('.saapumistraileri'), null, { timeout: 30000 })
    .catch(() => {});
  await sivu.evaluate(async () => {
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(window.matkakirja.ui);
    for (const el of document.querySelectorAll('.fokusnosto-kerros, .fokuskohde-popup, .saapumistraileri')) el.remove();
  });
  await sivu.waitForTimeout(4000);

  /* ── 3. perillä ──────────────────────────────────────────────────── */
  const perilla = await mittaa('perilla');
  vaadi(`${ruutu.nimi} · 3. perillä: kohdemaa paljas, lähtömaa ja muu maailma hunnussa; lippu pois`,
    paljas(perilla.arvot, 'BGR') && hunnussaTaiPiilossa(perilla.arvot, 'GRC') && hunnussa(perilla.arvot, 'muu')
      && !perilla.lippu && !perilla.luokka && perilla.maa === 'BGR',
    JSON.stringify({ arvot: perilla.arvot, lippu: perilla.lippu, maa: perilla.maa }));

  vaadi(`${ruutu.nimi} · 4. ei sivuvirheitä`, virheet.length === 0, virheet.slice(0, 2).join(' | '));
  await ctx.close();
  /* eslint-enable no-await-in-loop */
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
