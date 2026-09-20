/*
 * NIMIÖIDEN REUNATARKISTUS (pallolauta) — maalehden nostojen ja
 * maastokohteiden nimiöt eivät saa mennä ruudun reunan yli.
 *
 * OMISTAJAN HAVAINTO 20.9.2026 (Ranskan maalehti, sanatarkasti "ja
 * varmasti paljon muitakin"): Biskajanlahti ja Dune du Pilat ovat liian
 * lähellä kartan reunaa. Pallolaudan sovittelu (js/pallolauta/sovittelu.js)
 * väistää vain toisia nimiä ja kiinteää mustetta — ei koskaan ruudun
 * omaa reunaa, joten reunalla oleva nimiö ei ole "väistöbugi" vaan
 * puuttuva sääntö.
 *
 * MITTA TULEE KAAVASTA, EI RUUDULTA (sama perustelu kuin
 * tools/savukkeet/savuke-pallo-nostolaput.mjs): jokaisen merkin oma
 * <svg> on 1×1 px ja ylivuotava, joten getBoundingClientRect ei kerro
 * lapusta mitään. Kerros antaa laatikkonsa itse ruutupikseleinä
 * (l.nostot.lappuLaatikot, l.nostot.laatikot) samasta kaavasta, jolla
 * sovittelu ne laski — niitä verrataan suoraan window.innerWidth/Height-
 * ikkunaan.
 *
 * AJO (Mac Studio, ei NODE_USE_ENV_PROXY-tarvetta):
 *   node tools/tarkista-nimio-reuna.mjs
 *   node tools/tarkista-nimio-reuna.mjs --maa FRA
 *   node tools/tarkista-nimio-reuna.mjs --kuvat /tmp/reuna
 *
 * Poistumiskoodi 0 = ei ylityksiä (RAJA_PX:n sisällä). Käy Euroopan
 * maalehtimaat (MAA_KATEGORIAT ∩ lautakaupunki) läpi kahdessa
 * ruutukoossa: 480 px leveä ja puhelinkoko (390×844).
 */
import http from 'node:http';
import {
  readFileSync, existsSync, mkdirSync, writeFileSync,
} from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../js/game.js';
import { packById } from '../js/pack.js';
import { MAA_KATEGORIAT } from '../js/packs/maa-kategoriat.js';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('..', import.meta.url).pathname;

/* ------------------------------------------------------------ liput */

const argv = process.argv.slice(2);
const lippu = (nimi) => {
  const i = argv.indexOf(nimi);
  return i >= 0 ? argv[i + 1] ?? '' : null;
};
const VAIN_MAA = (lippu('--maa') ?? '').toUpperCase() || null;
const KUVAKANSIO = lippu('--kuvat');
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/* Sama Eurooppa-lista kuin tools/tarkista-karttamerkit.mjs. */
const EUROOPPA = [
  'ALB', 'AUT', 'BEL', 'BGR', 'BIH', 'BLR', 'CHE', 'CYP', 'CZE', 'DEU',
  'DNK', 'ESP', 'EST', 'FIN', 'FRA', 'GBR', 'GRC', 'HRV', 'HUN', 'IRL',
  'ISL', 'ITA', 'LTU', 'LUX', 'LVA', 'MDA', 'MKD', 'MNE', 'NLD', 'NOR',
  'POL', 'PRT', 'ROU', 'SRB', 'SVK', 'SVN', 'SWE', 'TUR', 'UKR',
];

const pack = packById('maailmankartta');
const cityCountry = pack.map?.cityCountry ?? {};
const kaupungitMaittain = {};
for (const c of pack.cities ?? []) {
  const iso = cityCountry[c.id];
  if (iso) (kaupungitMaittain[iso] ??= []).push(c);
}

const MAAT = EUROOPPA
  .filter((iso) => MAA_KATEGORIAT[iso])
  .filter((iso) => (kaupungitMaittain[iso] ?? []).length > 0)
  .filter((iso) => !VAIN_MAA || iso === VAIN_MAA);

if (!MAAT.length) {
  console.error(`Ei maita ajettavaksi${VAIN_MAA ? ` (--maa ${VAIN_MAA})` : ''}.`);
  process.exit(2);
}

/* --------------------------------------------------------- palvelin */

const TYYPIT = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

/* ----------------------------------------------------------- ämpäri */

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
  console.error('Ämpäri ei vastaa — palloa ei voi avata. Tarkista verkko.');
  palvelin.close();
  process.exit(2);
}

/* ---------------------------------------------------------- selain */

const selain = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
const ctx = await selain.newContext({
  viewport: { width: 480, height: 854 }, deviceScaleFactor: 2, serviceWorkers: 'block', reducedMotion: 'reduce',
});
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

function tallenne(kaupunki) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
    pack: packById('maailmankartta'),
    seed: 11,
  });
  peli.phase = 'action';
  peli.tokens.delete(kaupunki);
  return JSON.stringify(peli.toJSON());
}

/*
 * Näkymä maan fokusnäkymään (sama kuin pelin oma saapumisajo, instantti).
 *
 * l.nostot.laatikot() (kiinteän musteen nimiladonnan varaukset) EI kanna
 * nimeä — se on ikonien ja poltetun musteen sekalaatikko ilman nimi-
 * kenttää (js/pallolauta/nostot.js nostonLaatikko palauttaa vain
 * {x0,y0,x1,y1}). Nimi haetaan siis osumat()-listasta (id, nimi,
 * nimioNakyy, poltettu, p:{x,y}) ja laatikko lasketaan SAMALLA
 * funktiolla, jota peli itse käyttää (dynaaminen tuonti selaimessa).
 */
const MITTAA = () => sivu.evaluate(async () => {
  const l = window.matkakirja.ui.pallolauta;
  await l.saavu({ kesto: 0 });
  await new Promise((v) => setTimeout(v, 300));
  l.ladoHeti();
  await new Promise((v) => setTimeout(v, 300));

  const M = await import('/js/pallolauta/nostot.js');
  const W = window.innerWidth;
  const H = window.innerHeight;
  const rivi = (r, nimi, lahde) => ({
    lahde,
    nimi: nimi || '(nimetön)',
    x0: r.x0,
    y0: r.y0,
    x1: r.x1,
    y1: r.y1,
    yli: {
      vasen: Math.max(0, -r.x0),
      oikea: Math.max(0, r.x1 - W),
      yla: Math.max(0, -r.y0),
      ala: Math.max(0, r.y1 - H),
    },
  });

  const elavat = l.nostot.lappuLaatikot().map((r) => rivi(r, r.nimi, 'elävä'));

  const osumat = l.nostot.osumat?.() ?? [];
  const poltetut = osumat
    .filter((o) => o.poltettu && o.nimioNakyy && o.nimi && o.p)
    .map((o) => rivi(M.nostonLaatikko(o.p, o), o.nimi, 'poltettu'));

  const kaikki = [...elavat, ...poltetut];
  for (const r of kaikki) r.maxYli = Math.max(r.yli.vasen, r.yli.oikea, r.yli.yla, r.yli.ala);
  return { W, H, kaikki };
});

const NAKYMAT = [
  { nimi: '480px', width: 480, height: 854 },
  { nimi: 'puhelin', width: 390, height: 844 },
];

/* Pieni sallittu marginaali (pyöristys, alipikselit). */
const RAJA_PX = 4;

const loydokset = [];

for (const iso of MAAT) {
  const kaupunki = kaupungitMaittain[iso][0];
  /* eslint-disable no-await-in-loop */
  try {
    await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await sivu.evaluate((data) => {
      try {
        localStorage.setItem('matkakirja-save-v1', data);
        localStorage.removeItem('matkakirja-lauta');
        localStorage.setItem('matkakirja-kehittaja', '1');
      } catch { /* yksityinen tila */ }
    }, tallenne(kaupunki.id));
    await sivu.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
    await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 });
    await sivu.waitForTimeout(3500);

    for (const nakyma of NAKYMAT) {
      await sivu.setViewportSize({ width: nakyma.width, height: nakyma.height });
      await sivu.waitForTimeout(300);

      const tulos = await MITTAA();
      const yli = tulos.kaikki.filter((m) => m.maxYli > RAJA_PX);
      for (const m of yli) loydokset.push({ maa: iso, nakyma: nakyma.nimi, ...m });

      console.log(`${iso} ${nakyma.nimi.padEnd(7)} nimiöitä ${String(tulos.kaikki.length).padStart(3)}`
        + ` reunalla ${String(yli.length).padStart(2)}`);
      for (const m of yli) {
        console.log(`   "${m.nimi}" (${m.lahde}) yli ${Math.round(m.maxYli)}px`
          + ` [vasen ${Math.round(m.yli.vasen)} oikea ${Math.round(m.yli.oikea)}`
          + ` ylä ${Math.round(m.yli.yla)} ala ${Math.round(m.yli.ala)}]`);
      }
      if (KUVAKANSIO) {
        await sivu.screenshot({
          path: join(KUVAKANSIO, `${iso}-${nakyma.nimi}.png`), timeout: 15000,
        }).catch((virhe) => console.log(`   (kaappaus ei onnistunut: ${virhe.name})`));
      }
    }
  } catch (virhe) {
    console.log(`${iso} KAATUI — ${virhe.name}: ${String(virhe.message).split('\n')[0]}`);
    loydokset.push({
      maa: iso, nakyma: '-', nimi: virhe.name, lahde: 'ajo', maxYli: null,
    });
  }
  /* eslint-enable no-await-in-loop */
}

await selain.close();
palvelin.close();

console.log('\n================ RAPORTTI ================');
console.log(`Löydöksiä yhteensä ${loydokset.length} / maita ${MAAT.length}`);
const maittain = {};
for (const l of loydokset) maittain[l.maa] = (maittain[l.maa] ?? 0) + 1;
for (const [maa, n] of Object.entries(maittain).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${maa}: ${n}`);
}
if (KUVAKANSIO) {
  writeFileSync(join(KUVAKANSIO, 'nimio-reuna.json'), JSON.stringify(loydokset, null, 1));
}
process.exit(loydokset.length ? 1 : 0);
