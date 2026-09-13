/*
 * Savuke: PARIISIN KAUPUNKILEHDEN SIVUT OVAT KARTALLA KLIKATTAVINA.
 *
 * Karttauudistuksen erä 5 (suunnitelma docs/raportit/
 * karttauudistus-suunnitelma-20260913.md luku 4.7, pallon versio
 * karttauudistus-suunnitelma-pallo-20260913.md luku 3.4). Pariisin
 * kaupunkilehden sivujen nostot siirtyivät kuudeksi karttanostoksi:
 * "Tornissa on 72 nimeä kullalla", "Metron sisäänkäynti koottiin
 * palasista", "Kukko putosi ja löytyi seuraavana päivänä", "Paras
 * patonki valitaan sokkona", "Pariisi soi" ja "Pariisin vuosisadat".
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   0. MERKKIMÄÄRÄT PYSYVÄT RAJOISSA. Ranskassa pääkartalla ≤ 21 ja
 *      kaupunkilehden kohdekartalla ≤ 17 (tehtävänannon raja).
 *   1. JOKAISELLA UUDELLA NOSTOLLA ON KOHDEKARTTAPISTE eikä yksikään
 *      ole pääkartalla (omistajan sääntö 2.9.2026).
 *   2. KIINTIÖ: minikysymys joka kolmannessa Pariisin nostossa.
 *   3. VASTAKOE (väite): kun yhden uuden noston kohdekarttapiste
 *      poistetaan ajossa, nosto menettää karttapaikkansa kokonaan —
 *      kaupunkinostojen katto pitää sen poissa pääkartaltakin — ja
 *      vartio 1 kaatuisi. Jos näin ei käy, karsintasääntö ei mittaa
 *      sitä, mitä tämä savuke väittää sen mittaavan.
 *   4. JOKAINEN UUSI NOSTO AVAUTUU KORTIKSI pallon päällä, ja kortin
 *      leipäteksti on SANATARKASTI noston oma `lunastus`.
 *   5. KAUPUNKILEHTI AVAUTUU YHÄ (`ui.avaaTutkinta`) ja sen kohdekartta
 *      piirtää pisteensä.
 *
 * Vartiot 0–3 ajetaan Nodessa pelin omilla funktioilla (tools/
 * tarkista-nostopaikat.mjs), vartiot 4–5 selaimessa pallolaudalla.
 *
 * MIKSI KORTTI AVATAAN TUNNUKSESTA EIKÄ HIIRELLÄ: nämä nostot ovat
 * kohdekartalla, joten pallolla ei ole merkkiä, jota napauttaa
 * (js/fokuskohteet.js karsiKaupunkikartanNostot). Savuke ajaa saman
 * polun kuin merkin napautus mutta tunnuksesta (js/fokusnosto.js
 * avaaNostonTunnuksella) — sama tapa kuin savuke-nostovisa.mjs.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-pariisin-nostot.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { FOKUSVIRTA_PARIISI } from '../../js/packs/fokusvirta-pariisi.js';
import { KAUPUNKIKARTAT } from '../../js/packs/maakartat.js';
import { MAAILMANKARTTA } from '../../js/packs/maailmankartta.js';
import { paakartanNostot, kohdekarttojenNostot } from '../tarkista-nostopaikat.mjs';

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/** Tehtävänannon rajat. */
const PAAKARTAN_KATTO = 21;
const KOHDEKARTAN_KATTO = 17;
/** Erän 5 kuusi uutta nostoa, järjestyksessä. */
const UUDET = [
  'pariisin-72-nimea', 'guimardin-metro', 'notre-damen-kukko',
  'pariisin-patonki', 'pariisi-soi', 'pariisin-vuosisadat',
];
const NOSTOT = FOKUSVIRTA_PARIISI.takynostot;
/** Näkymä: Pariisi lähikuvassa. */
const PARIISI = { lat: 48.8566, lng: 2.3522, alt: 0.09 };

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* ==================== VARTIOT 0–3: NODE ==================== */

/** Ranskan merkkimäärät pelin omalla passilla. */
function ranskanLuvut() {
  const { kaikki: rivit, kartalla } = paakartanNostot(MAAILMANKARTTA);
  const linkit = kohdekarttojenNostot();
  const maanRivit = rivit.filter((r) => r.iso === 'FRA');
  return {
    paakartalla: maanRivit.filter((r) => kartalla.has(r.id)).length,
    kohdekartalla: maanRivit.filter((r) => !kartalla.has(r.id) && linkit.has(r.id)).length,
    kartalla,
    linkit,
  };
}

const luvut = ranskanLuvut();
tieto('Ranska pääkartalla / kohdekartalla', `${luvut.paakartalla} / ${luvut.kohdekartalla}`);
vaadi(`0a. pääkartan merkkejä Ranskassa ≤ ${PAAKARTAN_KATTO}`,
  luvut.paakartalla <= PAAKARTAN_KATTO, `${luvut.paakartalla}`);
vaadi(`0b. kohdekartan merkkejä Ranskassa ≤ ${KOHDEKARTAN_KATTO}`,
  luvut.kohdekartalla <= KOHDEKARTAN_KATTO, `${luvut.kohdekartalla}`);

const ilmanPistetta = UUDET.filter((id) => !luvut.linkit.has(`nosto-${id}`));
const paakartalla = UUDET.filter((id) => luvut.kartalla.has(`nosto-${id}`));
tieto('uusia nostoja', `${UUDET.length} (${UUDET.join(', ')})`);
vaadi('1. jokaisella uudella nostolla on kohdekarttapiste',
  ilmanPistetta.length === 0, ilmanPistetta.join(', '));
vaadi('1b. yksikään uusi nosto ei ole pääkartalla',
  paakartalla.length === 0, paakartalla.join(', '));

const visallisia = NOSTOT.filter((n) => n.visa).length;
const kiintio = Math.floor(NOSTOT.length / 3);
tieto('Pariisin nostot / minikysymykset', `${NOSTOT.length} / ${visallisia}`);
vaadi('2. minikysymys joka kolmannessa nostossa',
  visallisia >= kiintio, `${visallisia} < ${kiintio}`);

/*
 * VASTAKOE. Poistetaan yhden uuden noston kohdekarttapiste ajossa ja
 * lasketaan uudelleen: nosto menettää karttapaikkansa (kaupunkinostojen
 * katto pitää sen poissa pääkartaltakin), eli vartio 1 kaatuisi. Piste
 * palautetaan heti.
 */
const kohteet = KAUPUNKIKARTAT.pariisi.kohteet;
const irti = kohteet.findIndex((k) => k.nosto === 'nosto-pariisin-patonki');
const poistettu = kohteet.splice(irti, 1)[0];
const koe = ranskanLuvut();
kohteet.splice(irti, 0, poistettu);
tieto('vastakoe: ilman pistettä pää / kohde', `${koe.paakartalla} / ${koe.kohdekartalla}`);
vaadi('3. VASTAKOE: kohdekarttapisteen poisto vie nostolta karttapaikan',
  !koe.linkit.has('nosto-pariisin-patonki')
    && koe.kohdekartalla === luvut.kohdekartalla - 1,
  `kohdekartalla ${koe.kohdekartalla}, odotettu ${luvut.kohdekartalla - 1}`);
vaadi('3b. piste palautui ajon jälkeen',
  ranskanLuvut().kohdekartalla === luvut.kohdekartalla);

/* ==================== VARTIOT 4–5: SELAIN ==================== */

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
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
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; selainvartiot ohitetaan');
  palvelin.close();
  console.log(`\n${lapi}/${kaikki} läpi`);
  process.exit(lapi === kaikki ? 0 : 1);
}

function tallenne() {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }],
    pack: packById('maailmankartta'),
    seed: 5,
  });
  peli.phase = 'action';
  peli.tokens.delete('pariisi');
  return JSON.stringify(peli.toJSON());
}

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, serviceWorkers: 'block',
});
await ctx.addInitScript((d) => {
  try {
    localStorage.setItem('matkakirja-save-v1', d);
    localStorage.removeItem('matkakirja-lauta');
    localStorage.setItem('matkakirja-kehittaja', '1');
  } catch { /* yksityinen tila */ }
}, tallenne());
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
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
await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
const auki = await sivu
  .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
  .then(() => true).catch(() => false);
vaadi('pallolauta aukesi', auki);
if (auki) await sivu.waitForTimeout(3500);

const osumat = await sivu.evaluate(async (n) => {
  const l = window.matkakirja.ui.pallolauta;
  l.pallo.pointOfView({ lat: n.lat, lng: n.lng, altitude: n.alt }, 0);
  await new Promise((v) => setTimeout(v, 1600));
  l.ladoHeti();
  await new Promise((v) => setTimeout(v, 500));
  return l.nostot.osumat().map((o) => o.id);
}, PARIISI);
tieto('pallon osumat Pariisin päällä', osumat.join(', ') || '(ei yhtään)');
vaadi('1c. yksikään uusi nosto ei ole pallon osumissa',
  UUDET.every((id) => !osumat.includes(`nosto-${id}`)), osumat.join(', '));

/** Kortti auki tunnuksesta; palauttaa otsikon ja leipätekstin. */
const avaaKortti = (id) => sivu.evaluate(async (nostoId) => {
  for (const el of document.querySelectorAll('.fokusnosto-kerros')) el.remove();
  const { avaaNostonTunnuksella } = await import('/js/fokusnosto.js');
  const loytyi = avaaNostonTunnuksella(window.matkakirja.ui, nostoId);
  await new Promise((v) => setTimeout(v, 400));
  const lisaa = document.querySelector('.fokusnosto-kortti .nostokuva-lisaa');
  if (lisaa) { lisaa.click(); await new Promise((v) => setTimeout(v, 500)); }
  const kortti = document.querySelector('.fokusnosto-kortti');
  const kappaleet = [...(kortti?.querySelectorAll('.fokusnosto-teksti p') ?? [])]
    .map((p) => p.textContent.trim());
  return {
    loytyi,
    otsikko: kortti?.querySelector('.fokusnosto-kortti-otsikko')?.textContent?.trim() ?? '',
    kappaleet,
    visa: Boolean(kortti?.querySelector('.fokusnosto-visa')),
  };
}, id);

for (const id of UUDET) {
  const nosto = NOSTOT.find((n) => n.id === id);
  const kortti = await avaaKortti(id);
  /*
   * KORTTI JAKAA PITKÄN KAPPALEEN LUETTAVIIN PALOIHIN (js/fokusnosto.js
   * leipäteksti), joten kappalemäärä ei ole sama kuin datassa. Vertailu
   * tehdään siksi koko leipätekstistä: kaikki kappaleet peräkkäin,
   * välit yhdenmukaistettuina — merkki merkiltä, ei sisältövertailuna.
   */
  const siisti = (t) => t.replace(/\s+/gu, ' ').trim();
  const odotettu = siisti(nosto.lunastus.join(' '));
  const saatu = siisti(kortti.kappaleet.join(' '));
  const tasmaa = saatu === odotettu;
  tieto(`${id}`, `kappaleita ${kortti.kappaleet.length}, merkkejä ${saatu.length}/${odotettu.length}, visa ${kortti.visa ? 'on' : 'ei'}`);
  vaadi(`4. ${id}: kortti aukeaa`, kortti.loytyi && kortti.kappaleet.length > 0,
    JSON.stringify({ loytyi: kortti.loytyi, kappaleita: kortti.kappaleet.length }));
  vaadi(`4b. ${id}: kortin teksti täsmää lähteeseen sanatarkasti`, tasmaa,
    tasmaa ? '' : `ero kohdassa ${[...saatu].findIndex((c, i) => c !== odotettu[i])}`);
  if (KUVAKANSIO && id === 'pariisin-vuosisadat') {
    await sivu.locator('.fokusnosto-kortti').screenshot({
      path: join(KUVAKANSIO, 'karttauudistus-5-nosto-vuosisadat.png'), scale: 'css',
    });
  }
}

const lehti = await sivu.evaluate(async () => {
  for (const el of document.querySelectorAll('.fokusnosto-kerros')) el.remove();
  const { ui, game } = window.matkakirja;
  ui.avaaTutkinta(game.cityOf());
  await new Promise((v) => setTimeout(v, 2600));
  return {
    auki: Boolean(document.querySelector('.kartta-kehys')),
    pisteita: document.querySelectorAll('.kartta-kehys .maakartta-piste').length,
    selitteita: document.querySelectorAll('.kartta-selite').length,
  };
});
tieto('kaupunkilehden kohdekartta', `pisteitä ${lehti.pisteita}, selitteitä ${lehti.selitteita}`);
vaadi('5. kaupunkilehti avautuu ja kohdekartta piirtää pisteensä',
  lehti.auki && lehti.pisteita > 0, JSON.stringify(lehti));
if (KUVAKANSIO) {
  // Vain kartta ja css-mitassa: koko ruutu 2× tarkkuudella on yli 1 Mt.
  await sivu.locator('.kartta-kehys').first().screenshot({
    path: join(KUVAKANSIO, 'karttauudistus-5-kohdekartta.png'), scale: 'css',
  });
}

/*
 * VARTIO 6. Sivut 2 (Musiikki) ja 3 (Historia) ovat nyt ilman nostoja:
 * niiden sisältö on kartalla. Sivujen on silti auettava, ja niillä on
 * yhä johdanto ja oma lehtitehtävä — ilman niitä siirto olisi rikkonut
 * lehden sen sijaan että se tyhjensi sivun.
 */
for (const sivunro of [2, 3]) {
  const sivutila = await sivu.evaluate(async (n) => {
    window.matkakirja.ui.naytaTutkiSivu(n, { heti: true });
    await new Promise((v) => setTimeout(v, 900));
    const kohde = document.querySelector('.tutki-sivu') ?? document.querySelector('.lehti-sivu');
    return {
      otsikko: document.querySelector('.lehti-osasto-otsikko, .tutki-otsikko')?.textContent?.trim() ?? '',
      nostoja: document.querySelectorAll('.kulttuuri-nosto').length,
      tehtava: Boolean(document.querySelector('.minitehtava')),
      tekstia: (kohde?.textContent ?? document.body.textContent).trim().length,
    };
  }, sivunro);
  tieto(`kaupunkilehden sivu ${sivunro}`, JSON.stringify(sivutila));
  vaadi(`6. sivu ${sivunro} avautuu ilman nostoja mutta tekstin ja tehtävän kanssa`,
    sivutila.nostoja === 0 && sivutila.tehtava && sivutila.tekstia > 100,
    JSON.stringify(sivutila));
  if (KUVAKANSIO && sivunro === 2) {
    await sivu.screenshot({
      path: join(KUVAKANSIO, 'karttauudistus-5-lehden-sivu.png'), scale: 'css',
    });
  }
}

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 2).join(' | '));

await ctx.close();
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
