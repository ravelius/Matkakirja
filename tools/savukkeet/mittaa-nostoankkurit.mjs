/*
 * MITTA: NOSTOT EIVÄT LIIKU ZOOMATESSA, YKSI KOKO, EI PÄÄLLEKKÄISYYTTÄ
 * (Raamattu KARTTAUUDISTUKSEN PAATOKSET 32 kohdat 1, 2, 4 ja 5).
 *
 * Kohdemitta, ei savukesarja: Pariisi 390 px kolmella zoomilla
 * (saapuminen, välizoomi, lähizoomi). Kolme väitettä:
 *
 *   1) ANKKURI EI LIIKU: sama nosto on samassa lat/lng-pisteessä
 *      kaikilla kolmella zoomilla (ero 0).
 *   2) EI PÄÄLLEKKÄISYYTTÄ: nostojen ja aihenostojen osumalaatikot
 *      (symboli + nimiö), kaupunkien nimikyltit ja pelinappula eivät
 *      limity millään zoomilla.
 *   3) YKSI KOKO: jokaisen elävän noston ja aihenoston mitta on sama
 *      kuin poltetun kartan noston (NOSTON_MITTA).
 *
 * VASTAKOE: `?nostoankkurit=0` palauttaa vanhan ladonnan ja limityksen.
 *
 * Ajo (Mac):
 *   PLAYWRIGHT_JS=… CHROMIUM="…" node tools/savukkeet/mittaa-nostoankkurit.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { NOSTON_MITTA } from '../../js/pallolauta/nostot.js';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] && process.argv[2] !== '-' ? process.argv[2] : null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const RUUTU = { w: 390, h: 844 };
/** Kolme zoomia: saapuminen (1,0), välizoomi ja lähizoomi. */
const ZOOMIT = [
  { nimi: 'saapuminen', osuus: 1 },
  { nimi: 'valizoomi', osuus: 0.6 },
  { nimi: 'lahizoomi', osuus: 0.34 },
];

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);
const p = (v, n = 2) => (Number.isFinite(v) ? v.toFixed(n) : '—');
const limittyy = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.mp3': 'audio/mpeg',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(Number(process.env.PORTTI) || 0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

const AMPARI = 'https://media.matkakirja.app/';
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
const kirjasto = await ampariHaku(`${AMPARI}vendor/globe.gl-2.46.2.min.js`);
if (kirjasto?.status !== 200) {
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; mitta ohitetaan');
  palvelin.close();
  process.exit(0);
}

function tallenne(kaupunki) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
    pack: packById('maailmankartta'),
    seed: 5,
  });
  peli.phase = 'action';
  peli.tokens.delete(kaupunki);
  return JSON.stringify(peli.toJSON());
}

const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

async function avaaSivu({ ankkurit = true } = {}) {
  const ctx = await selain.newContext({
    viewport: { width: RUUTU.w, height: RUUTU.h },
    deviceScaleFactor: 2,
    serviceWorkers: 'block',
  });
  await ctx.addInitScript((d) => {
    try {
      localStorage.setItem('matkakirja-save-v1', d);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne('pariisi'));
  const sivu = await ctx.newPage();
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
    const v = await ampariHaku(route.request().url());
    if (!v || v.status !== 200) { route.abort(); return; }
    route.fulfill({
      status: 200,
      contentType: v.tyyppi ?? 'application/octet-stream',
      body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  const lippu = ankkurit ? '' : '&nostoankkurit=0&nostokoko=0';
  await sivu.goto(`${osoite}?lauta=pallo${lippu}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  // Saapuminen ajetaan loppuun: isoisän kuvasarja ja pulu kulkevat ruudun
  // poikki ensimmäiset 40 s (sama odotus kuin savuke-pariisi-lahizoom).
  await sivu.waitForTimeout(44000);
  return { ctx, sivu };
}

/** Kamera Pariisin päälle annettuun osuuteen saapumiskorkeudesta. */
async function zoomaa(sivu, osuus) {
  await sivu.evaluate(async (k) => {
    const { ui } = window.matkakirja;
    const l = ui.pallolauta;
    const c = ui.game.pack.cities.find((x) => x.id === 'pariisi');
    const a = l.asteet({ x: c.x, y: c.y });
    if (!window.__saapumiskorkeus) window.__saapumiskorkeus = l.pallo.pointOfView().altitude;
    l.pallo.pointOfView(
      { lat: a.lat, lng: a.lon, altitude: window.__saapumiskorkeus * k }, 0,
    );
    await new Promise((v) => setTimeout(v, 1800));
    window.matkakirja.ui.pallolauta.ladoHeti?.();
    await new Promise((v) => setTimeout(v, 600));
  }, osuus);
}

/** Yhden zoomin lukema: merkit, laatikot, esteet. */
async function lue(sivu) {
  return sivu.evaluate(() => {
    const l = window.matkakirja.ui.pallolauta;
    const kotelo = document.querySelector('.pallolauta')?.getBoundingClientRect()
      ?? { left: 0, top: 0 };
    const merkit = l.nostot.osumat().map((o) => ({
      id: o.id,
      nimi: o.nimi ?? null,
      perhe: o.perhe,
      poltettu: Boolean(o.poltettu),
      kaupunki: Boolean(o.kaupunki),
      lat: o.lat,
      lng: o.lng,
      mitta: o.datum?.mitta ?? null,
    }));
    const laatikot = l.nostot.osumaLaatikot();
    const rect = (el) => {
      const r = el.getBoundingClientRect();
      return {
        x0: r.left - kotelo.left,
        y0: r.top - kotelo.top,
        x1: r.right - kotelo.left,
        y1: r.bottom - kotelo.top,
      };
    };
    const nimet = [...document.querySelectorAll('.pallolauta-nimi')]
      .filter((el) => el.getBoundingClientRect().width > 0)
      .map((el) => ({ nimi: el.textContent.trim(), ...rect(el) }));
    /*
     * NAPPULAN LAATIKKO LUETAAN SVG:STÄ, EI ELEMENTISTÄ. Lepomerkin
     * oma laatikko on 0 × 0 (css/styles.css
     * `.pallolauta-nappula:not(.pallolauta-liikkuva)`), jotta CSS2D:n
     * keskitys ei siirrä sitä, ja koko hahmo on svg:n ylivuotoa —
     * elementin rect antaa siis nollan ja vanha `width > 0` -suodin
     * pudotti nappulan mitasta kokonaan. Sama lähde kuin pelillä
     * itsellään (js/pallolauta/merkit.js `laatikot`).
     */
    const nappula = [...document.querySelectorAll('.pallolauta-nappula')]
      .map((el) => el.querySelector('svg') ?? el)
      .filter((el) => el.getBoundingClientRect().width > 0)
      .map((el) => ({ nimi: 'nappula', ...rect(el) }));
    /*
     * KYLTIN MITTA RUUDULTA (PAATOKSET 32 TARKENNUS 2 kohta a): sama
     * luku, jonka `asetteleTuristiInfo` kirjoittaa siirtoryhmän
     * transformiin — ei laudan sisäinen kenttä vaan se, mikä ruudulla
     * oikeasti piirtyy.
     */
    const kylttiG = document.querySelector('.pallolauta-turisti-info-siirto');
    const kylttiR = kylttiG?.getBoundingClientRect();
    const kyltti = kylttiG ? {
      nimi: 'Turisti-info',
      mitta: Number(/scale\(([\d.]+)\)/.exec(kylttiG.style.transform ?? '')?.[1] ?? NaN),
      ...(kylttiR?.width > 0 ? rect(kylttiG) : {}),
    } : null;
    /*
     * NOSTOPALLOJEN HALKAISIJA RUUDULLA (PAATOKSET 33 kohta 3).
     * Luetaan piirretystä ympyrästä eikä vakiosta: aihenoston lautanen
     * on <circle class="pallolauta-aihemerkki-lautanen"> ja sen
     * ruutuhalkaisija on 2 × r × merkin mitta. Poltetun pisteen mitta
     * on sama kaava NOSTOSYM_PISTE_R:llä — se on laatassa, joten sitä
     * ei voi lukea DOMista, mutta elävä ja poltettu piirretään samasta
     * kirjastosta samalla mitalla, joten lukujen on oltava samat.
     */
    const pallot = [...document.querySelectorAll('.pallolauta-aihemerkki')].map((el) => {
      const kehys = el.querySelector('.pallolauta-aihemerkki-lautanen');
      const r = kehys?.getBoundingClientRect();
      return {
        nimi: el.dataset.nimio || el.dataset.aihemerkki || 'aihenosto',
        halkaisija: r?.width > 0 ? r.width : null,
      };
    }).filter((x) => x.halkaisija);
    /* Listan alle piilotettu muste (PAATOKSET 32 kohta 5). */
    const piilotetut = l.nostot.viuhkanPiilotetut?.() ?? [];
    return {
      merkit, laatikot, nimet, nappula, kyltti, pallot, piilotetut,
      osuus: l.uloimmanOsuus?.() ?? null,
    };
  });
}

async function kaappaa(sivu, nimi) {
  if (!KUVAKANSIO) return null;
  try {
    const polku = join(KUVAKANSIO, nimi);
    await sivu.screenshot({ path: polku, timeout: 15000 });
    return polku;
  } catch { return null; }
}

const { ctx, sivu } = await avaaSivu();
const lukemat = [];
for (const z of ZOOMIT) {
  // eslint-disable-next-line no-await-in-loop
  await zoomaa(sivu, z.osuus);
  // eslint-disable-next-line no-await-in-loop
  const tila = await lue(sivu);
  // eslint-disable-next-line no-await-in-loop
  const kuva = await kaappaa(sivu, `nostoankkurit-${z.nimi}.png`);
  lukemat.push({ ...z, ...tila, kuva });
  tieto(`${z.nimi} merkkejä`, `${tila.merkit.length} (laatikoita ${tila.laatikot.length}, nimiä ${tila.nimet.length})`);
  if (kuva) tieto(`${z.nimi} kaappaus`, kuva);
}

/* ── 1) ANKKURI EI LIIKU ─────────────────────────────────────────── */
const elava = (m) => !m.poltettu && (m.perhe === 'nosto' || m.perhe === 'aihemerkki');
/*
 * KAUPUNKIMERKKI EI OLE NOSTO. Sen nimiö on omistajan oma 11,5 px
 * (PAATOKSET 25 kohta 2), eikä PAATOKSET 32 kohta 4 puhu siitä —
 * kohta 4 koskee nostopalloja ja niiden nimiöitä.
 */
const nosto = (m) => elava(m) && !m.kaupunki;
const perus = new Map(lukemat[0].merkit.filter(elava).map((m) => [m.id, m]));
let suurinEro = 0;
let liikkuneita = 0;
for (const l of lukemat.slice(1)) {
  for (const m of l.merkit.filter(elava)) {
    const a = perus.get(m.id);
    if (!a) continue;
    const ero = Math.hypot(m.lat - a.lat, m.lng - a.lng);
    if (ero > suurinEro) suurinEro = ero;
    if (ero > 1e-9) liikkuneita += 1;
  }
}
tieto('suurin ankkurin ero (astetta)', p(suurinEro, 9));
vaadi('1 sama nosto samassa lat/lng-ankkurissa kaikilla zoomeilla',
  liikkuneita === 0, `liikkuneita ${liikkuneita}, suurin ero ${p(suurinEro, 6)}°`);

/* ── 2) EI PÄÄLLEKKÄISYYTTÄ ──────────────────────────────────────── */
/*
 * POLTETTU MUSTE EI OLE TÄMÄN ERÄN ASIA. Kaksi laattaan poltettua
 * nostoa (esim. *Camarguen hevoset* ja *Camarguenvarsa*) limittyvät
 * kuvassa, eikä sitä voi siirtää ilman uutta polttoa (R2-ajo). Elävä
 * muste väistää poltettua — se on tämän mitan väite; poltettu pari
 * raportoidaan erikseen.
 */
for (const l of lukemat) {
  const laatikot = [
    ...l.laatikot.map((r) => ({ nimi: r.nimi ?? r.id, poltettu: Boolean(r.poltettu), ...r })),
    ...l.nimet.map((r) => ({ ...r, poltettu: false })),
    ...l.nappula.map((r) => ({ ...r, poltettu: false })),
    // Kyltti on nyt nostojen kokoinen (kohta 4), joten se mitataan
    // samassa joukossa kuin muukin muste.
    ...(l.kyltti?.x1 ? [{ ...l.kyltti, poltettu: false }] : []),
  ];
  const parit = [];
  let laatassa = 0;
  for (let i = 0; i < laatikot.length; i += 1) {
    for (let j = i + 1; j < laatikot.length; j += 1) {
      if (!limittyy(laatikot[i], laatikot[j])) continue;
      if (laatikot[i].poltettu && laatikot[j].poltettu) { laatassa += 1; continue; }
      parit.push(`${laatikot[i].nimi} × ${laatikot[j].nimi}`);
    }
  }
  tieto(`${l.nimi} limittyviä pareja`, `${parit.length}${parit.length ? ` (${parit.slice(0, 6).join('; ')})` : ''}; poltettu×poltettu ${laatassa}`);
  vaadi(`2 ${l.nimi}: limittyviä laatikkopareja 0`, parit.length === 0, `${parit.length} paria`);
}

/* ── 3) YKSI KOKO ────────────────────────────────────────────────── */
for (const l of lukemat) {
  const mitat = l.merkit.filter((m) => nosto(m) && Number.isFinite(m.mitta)).map((m) => m.mitta);
  const poikkeavat = mitat.filter((m) => Math.abs(m - NOSTON_MITTA) > 1e-6);
  tieto(`${l.nimi} mitat`, `${[...new Set(mitat.map((m) => p(m, 3)))].join(', ')} (poltettu ${p(NOSTON_MITTA, 3)})`);
  vaadi(`3 ${l.nimi}: kaikki nostot poltetun kartan kokoa`,
    mitat.length > 0 && poikkeavat.length === 0, `poikkeavia ${poikkeavat.length}`);
}

/* ── 4) TURISTI-INFON KYLTTI ON SAMAA KOKOA KUIN NOSTOT ──────────── */
/*
 * PAATOKSET 32 TARKENNUS 2 kohta a (omistaja 17.9.2026 illalla):
 * kyltti kutistuu poltetun kartan mittaan — sama pallo ja sama 8,5 px:n
 * nimiö kuin nostoilla, kaikilla zoomeilla. Kumoaa PAATOKSET 31
 * TARKENNUS 2 kohdan 5 mitan (11,5 px saapuessa, 16 px lähizoomissa).
 */
for (const l of lukemat) {
  const m = l.kyltti?.mitta;
  tieto(`${l.nimi} kyltin mitta`, `${p(m, 3)} (poltettu ${p(NOSTON_MITTA, 3)})`);
  vaadi(`4 ${l.nimi}: kyltin mitta = poltetun kartan mitta`,
    Number.isFinite(m) && Math.abs(m - NOSTON_MITTA) <= 1e-3,
    `kyltin mitta ${p(m, 4)}`);
}

/* ── 5) PELINAPPULA ON ESTE: MIKÄÄN NIMIÖ TAI MERKKI EI OLE SEN PÄÄLLÄ ── */
/*
 * PAATOKSET 32 TARKENNUS 2 kohta b. Vartio on erillinen kohdasta 2,
 * koska nappula putosi ennen mitasta kokonaan (0 × 0 elementti, ks.
 * `lue`) — nyt se nimetään omaksi väitteekseen, jottei sama vika voi
 * enää mennä läpi hiljaisena.
 */
for (const l of lukemat) {
  if (!l.nappula.length) tieto(`${l.nimi} nappula`, 'ei nappulaa ruudulla');
  /*
   * LÄHDE MUKAAN NIMEEN. Kaupungilla on ruudulla KAKSI laatikkoa,
   * joilla on sama nimi: nostokerroksen kaupunkimerkki (piste +
   * nimiö) ja nimikerroksen oma tekstielementti. Ilman lähdettä
   * punainen vartio ei kerro, kumpi niistä on nappulan päällä — ja
   * juuri se ratkaisee, onko korjaus ladonnassa (nimi) vai
   * rakenteessa (merkki seisoo kaupungin pisteessä, jossa nappulakin
   * seisoo).
   */
  const paalla = [];
  const lahteet = [
    ...l.laatikot.map((r) => ({ ...r, lahde: 'nostokerros' })),
    ...l.nimet.map((r) => ({ ...r, lahde: 'nimikerros' })),
    ...(l.kyltti?.x1 ? [{ ...l.kyltti, lahde: 'kyltti' }] : []),
  ];
  for (const n of l.nappula) {
    for (const r of lahteet) {
      if (limittyy(n, r)) paalla.push(`${r.nimi ?? r.id} [${r.lahde}]`);
    }
  }
  tieto(`${l.nimi} nappulan päällä`, `${paalla.length}${paalla.length ? ` (${paalla.slice(0, 6).join('; ')})` : ''}`);
  vaadi(`5 ${l.nimi}: nappulan laatikon päällä ei yhtään nimiötä eikä merkkiä`,
    l.nappula.length > 0 && paalla.length === 0,
    l.nappula.length ? `${paalla.length} päällä` : 'nappulaa ei löytynyt ruudulta');
}

/* ── 6) KAIKKI NOSTOPISTEET POLTETUN MERKIN KOKOA ────────────────── */
/*
 * PAATOKSET 33 kohta 3 (omistaja 17.9.2026 klo 21.40: *"kaikki
 * nostopisteet pitää olla yhtä pieniä, kuin mitä kartalle poltetut
 * merkit ovat. Viimeisimmässä kaappauksessa pisteet olivat vielä liian
 * isoja."*). Poltetun pisteen halkaisija ruudulla on
 * 2 × NOSTOSYM_PISTE_R × NOSTON_MITTA; aihenoston lautanen luetaan
 * ruudulta ja sen on osuttava siihen ±0,5 px.
 */
const POLTETUN_HALKAISIJA = 2 * 3.4 * NOSTON_MITTA;
for (const l of lukemat) {
  const isot = (l.pallot ?? []).filter((x) => Math.abs(x.halkaisija - POLTETUN_HALKAISIJA) > 0.5);
  tieto(`${l.nimi} nostopallon halkaisija`,
    `${[...new Set((l.pallot ?? []).map((x) => p(x.halkaisija, 2)))].join(', ')} px `
    + `(poltettu ${p(POLTETUN_HALKAISIJA, 2)} px, palloja ${(l.pallot ?? []).length})`);
  vaadi(`6 ${l.nimi}: nostopallon halkaisija = poltetun halkaisija ±0,5 px`,
    (l.pallot ?? []).length > 0 && isot.length === 0,
    `poikkeavia ${isot.length}`);
}

/* ── 7) LISTAN ALLE PIILOTETTU MUSTE KIRJATAAN ───────────────────── */
/*
 * PAATOKSET 32 kohta 5 (Fablen erä 3): lista ei jää toisen tekstin
 * päälle; ahtaassa paikassa listan alle jäävät nostonimiöt piilotetaan
 * listan ajaksi. Tässä mitassa lista ei ole auki, joten luvun on
 * oltava 0 — vartio pitää huolen, ettei piilotus jää päälle.
 */
for (const l of lukemat) {
  const n = (l.piilotetut ?? []).length;
  tieto(`${l.nimi} listan alle piilotettuja`, `${n}`);
  vaadi(`7 ${l.nimi}: lista kiinni → piilotettuja 0`, n === 0, `${n} piilossa`);
}

await ctx.close();

/*
 * VASTAKOETTA EI AJETA TÄSSÄ ERÄSSÄ (Fablen ohje 17.9.2026 illalla:
 * *"Yksi Playwright-kohdemittaus, ei koko sarjoja, ei vastakoetta
 * (UI-säätö)"*). Vastakokeen liput ovat yhä koodissa ja ajettavissa
 * käsin: `?nostoankkurit=0` palauttaa vanhan ladonnan ja
 * `?nostokoko=0` kartan mukana kasvavan mitan; erän 1 vastakoekuvat
 * ovat kansiossa `nostoankkurit-vastakoe-*.png`.
 */

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
