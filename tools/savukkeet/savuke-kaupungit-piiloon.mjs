/*
 * Savuke: MUIDEN MAIDEN KAUPUNGIT PIILOON, KUN EI OLLA LIIKKUMASSA.
 *
 * OMISTAJAN KYSYMYS 18.9.2026 (Raamattu, KARTTAUUDISTUKSEN PAATOKSET
 * 43 kohta 8, sanatarkasti): *"Voiko muiden maiden kaupungit piilottaa
 * kartalta jos ei olla liikkumassa?"*
 *
 * PÄÄTÖS: kohdemaan ulkopuolisten kaupunkien ELÄVÄT pisteet
 * (`pointsData`) ja nimet (CSS2D) jäävät pelinäkymässä pois, kun
 * siirtovaihe ei ole päällä. Siirtovaiheessa nopanheiton tarjolla
 * olevat kohteet tulevat nimineen näkyviin — muut muiden maiden
 * kaupungit pysyvät piilossa. Pelaajan oma kaupunki ja kohdemaan
 * kaupungit ovat aina näkyvissä, ja kehittäjän maailmatila näyttää
 * kaikki kuten ennen. Laattaan poltetut kaupunkinimet ovat kerman alla
 * (PAATOKSET 37) eivätkä kuulu tähän kerrokseen.
 *
 * ── MIKSI SAVUKE EIKÄ YKSIKKÖTESTI ────────────────────────────────
 *
 * Suodatus elää kahdessa kerroksessa, jotka syntyvät vasta oikeassa
 * selaimessa: pistejoukko on Globe.gl:n `pointsData` ja nimet ovat
 * CSS2D-elementtejä, jotka ladotaan ruudun mitoista. Kumpaakaan ei ole
 * olemassa Nodessa, eikä kohdemaan päättely (kohteidenNykyinenIso →
 * korostuskehä, värilaatasto, nostotaso) kulje ilman UI:n asettumista.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   1. ILMAN NOPPAA: jokainen kartan kaupunkipiste kuuluu kohdemaahan.
 *      Muiden maiden pisteitä 0.
 *   2. ILMAN NOPPAA: jokainen ladottu kaupungin nimi kuuluu
 *      kohdemaahan. Muiden maiden nimiä 0 — sekä ladonnan omassa
 *      kirjanpidossa (`nimet.nimetyt()`) että DOM:ssa
 *      (`.pallolauta-nimi`), koska kumpikin voi eriytyä toisestaan.
 *   3. PELAAJAN OMA KAUPUNKI ON AINA KARTALLA (piste ja nimi).
 *   4. NOPAN JÄLKEEN: jokainen tarjolla oleva kohdekaupunki on
 *      kartalla pisteenä, myös ulkomailla. Muut kuin kohdemaan tai
 *      kohteiden kaupungit pysyvät yhä piilossa.
 *   5. KEHITTÄJÄN MAAILMATILA NÄYTTÄÄ KAIKKI: pisteitä selvästi
 *      enemmän kuin kohdemaassa, ja tila pois päältä palauttaa
 *      rajauksen.
 *   6. VASTAKOE: ei sivuvirheitä missään vaiheessa.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1) — pallon
 * kirjasto haetaan sieltä, joten ilman ämpäriä savuke OHITETAAN.
 *
 * Aja: NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-kaupungit-piiloon.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/** Pilotti on RANSKA: Fogg Pariisissa, sama maa kuin nostotasoilla. */
const LAHTOKAUPUNKI = 'pariisi';
const KAIKKI_RUUDUT = [
  { nimi: '390 px', width: 390, height: 844, dpr: 2 },
  { nimi: '1400 px', width: 1400, height: 900, dpr: 1 },
];
const RUUDUT = process.env.SAVUKE_RUUTU
  ? KAIKKI_RUUDUT.filter((r) => String(r.width) === String(process.env.SAVUKE_RUUTU))
  : KAIKKI_RUUDUT;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

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
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; savuke ohitetaan');
  palvelin.close();
  process.exit(0);
}

/** Jäsenyystaulu samasta laudasta, jonka kaupunkeja pallo piirtää. */
const PALLON_PACK = packById('maailmankartta');
const MAA = PALLON_PACK.map.cityCountry;
const KOHDEMAA = MAA[LAHTOKAUPUNKI];
const KOHDEMAAN_KAUPUNGIT = Object.keys(MAA).filter((id) => MAA[id] === KOHDEMAA);
tieto('kohdemaa', `${KOHDEMAA} (${KOHDEMAAN_KAUPUNGIT.join(', ')})`);

const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});

/*
 * Kartan kaupungit yhdestä hetkestä: pistejoukko, ladonnan kirjanpito
 * ja DOM. Kolme lukua, koska suodatus elää kahdessa kerroksessa ja
 * niiden eriytyminen on juuri se vika, jota tämä vahtii.
 */
const LUE = `() => {
  const { ui } = window.matkakirja;
  const l = ui.pallolauta;
  const pallo = ui.pallonInstanssi;
  const domNimet = [...document.querySelectorAll('.pallolauta-nimi')]
    .map((e) => (e.textContent || '').trim()).filter(Boolean);
  return {
    pisteet: pallo.pointsData().filter((p) => !p.laji).map((p) => p.id),
    kohdemerkkeja: pallo.htmlElementsData().filter((d) => d.laji === 'kohde').length,
    nimetyt: [...l.nimet.nimetyt()],
    domNimia: domNimet.length,
    domTekstit: domNimet,
    oma: ui.game.cityOf()?.id ?? null,
    vaihe: ui.game.phase,
  };
}`;

for (const ruutu of RUUDUT) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: LAHTOKAUPUNKI }],
    pack: PALLON_PACK,
    seed: 5,
  });
  peli.phase = 'action';
  peli.tokens.delete(LAHTOKAUPUNKI);
  const tallenne = JSON.stringify(peli.toJSON());

  const ctx = await selain.newContext({
    viewport: { width: ruutu.width, height: ruutu.height },
    deviceScaleFactor: ruutu.dpr,
    serviceWorkers: 'block',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne);
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

  const tunnus = ruutu.nimi;
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
  const auki = await sivu
    .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  vaadi(`${tunnus}: pallolauta aukesi`, auki, virheet.join(' | '));
  if (!auki) { await ctx.close(); continue; }

  // Saapumisnäkymä on se kuva, jossa pelaaja maata katsoo.
  await sivu.evaluate(async () => {
    const l = window.matkakirja.ui.pallolauta;
    await l.saavu({ kesto: 0 });
    await new Promise((v) => setTimeout(v, 1600));
    l.ladoHeti();
    await new Promise((v) => setTimeout(v, 400));
  });

  /* ── 1–3. ilman noppaa ───────────────────────────────────────── */
  const ennen = await sivu.evaluate(`(${LUE})()`);
  if (KUVAKANSIO) {
    await sivu.screenshot({
      path: join(KUVAKANSIO, `ranska-ennen-${ruutu.width}.png`),
      scale: 'css',
    });
  }
  const vieraatPisteet = ennen.pisteet.filter((id) => MAA[id] !== KOHDEMAA);
  const vieraatNimet = ennen.nimetyt.filter((id) => MAA[id] !== KOHDEMAA);
  tieto(`${tunnus}: kaupunkipisteet ilman noppaa`, ennen.pisteet.join(', ') || '—');
  tieto(`${tunnus}: ladotut nimet ilman noppaa`, ennen.nimetyt.join(', ') || '—');
  tieto(`${tunnus}: nimiä DOM:ssa`, `${ennen.domNimia} (${ennen.domTekstit.join(', ')})`);
  vaadi(`${tunnus}: 1. muiden maiden kaupunkipisteitä 0`,
    vieraatPisteet.length === 0, JSON.stringify(vieraatPisteet));
  vaadi(`${tunnus}: 2. muiden maiden nimiä 0 (ladonta ja DOM samaa mieltä)`,
    vieraatNimet.length === 0 && ennen.domNimia === ennen.nimetyt.length,
    JSON.stringify({ vieraat: vieraatNimet, dom: ennen.domNimia, ladonta: ennen.nimetyt.length }));
  vaadi(`${tunnus}: 3. pelaajan oma kaupunki on kartalla pisteenä ja nimenä`,
    ennen.oma === LAHTOKAUPUNKI && ennen.pisteet.includes(LAHTOKAUPUNKI)
      && ennen.nimetyt.includes(LAHTOKAUPUNKI),
    JSON.stringify({ oma: ennen.oma, pisteet: ennen.pisteet, nimet: ennen.nimetyt }));

  /* ── 4. nopan jälkeen kohteet näkyviin ───────────────────────── */
  const heitto = await sivu.evaluate(async () => {
    const { ui, game } = window.matkakirja;
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;
    game.autoTravel = false;
    const valinta = game.actionTravel('land');
    if (!valinta.ok) return { virhe: valinta.error };
    /*
     * NOPPA KIINNITETÄÄN: silmäluku 1 Pariisista ei yllä yhteenkään
     * kaupunkiin (Pariisi–Bryssel on 2 askelta), jolloin moveOptions
     * tarjoaa vain reitin pisteitä ja väite 4a putoaa noppaonnesta
     * (punainen v1970:ssä, vihreä v1968–v1969 sattumalta). Mittarin
     * kysymys on kaupunkien piilotus, ei noppa, joten heitetään aina 6.
     */
    game.rollDie = () => 6;
    ui.doRoll();
    for (let i = 0; i < 120 && ui.busy; i += 1) await new Promise((r) => setTimeout(r, 50));
    await new Promise((r) => setTimeout(r, 600));
    ui.pallolauta.ladoHeti();
    await new Promise((r) => setTimeout(r, 400));
    return {
      vaihe: game.phase,
      kohteet: game.moveOptions().map((o) => o.city?.id ?? null).filter(Boolean),
    };
  });
  vaadi(`${tunnus}: nopanheitto vei siirtovaiheeseen`,
    heitto.vaihe === 'move', JSON.stringify(heitto));
  const jalkeen = await sivu.evaluate(`(${LUE})()`);
  if (KUVAKANSIO) {
    await sivu.screenshot({
      path: join(KUVAKANSIO, `ranska-jalkeen-${ruutu.width}.png`),
      scale: 'css',
    });
  }
  const sallitut = new Set([...KOHDEMAAN_KAUPUNGIT, ...(heitto.kohteet ?? [])]);
  const ulkomaisetKohteet = (heitto.kohteet ?? []).filter((id) => MAA[id] !== KOHDEMAA);
  tieto(`${tunnus}: kohdekaupungit`, (heitto.kohteet ?? []).join(', ') || '—');
  tieto(`${tunnus}: ulkomaiset kohteet`, ulkomaisetKohteet.join(', ') || '—');
  tieto(`${tunnus}: kaupunkipisteet nopan jälkeen`, jalkeen.pisteet.join(', ') || '—');
  const ulkomaisetNakyvat = jalkeen.pisteet.filter((id) => MAA[id] !== KOHDEMAA);
  tieto(`${tunnus}: ulkomaiset kaupungit kartalla ennen / jälkeen`,
    `${ennen.pisteet.filter((id) => MAA[id] !== KOHDEMAA).length} / ${ulkomaisetNakyvat.length}`
    + ` (${ulkomaisetNakyvat.join(', ') || '—'})`);
  /*
   * VASTINPARI, JOKA ON KOKO PÄÄTÖKSEN YDIN: ilman noppaa ulkomaisia
   * kaupunkeja on kartalla NOLLA, ja nopan jälkeen niitä on — ja
   * jokainen niistä on tarjolla oleva kohde. Kumpikin luku samasta
   * istunnosta, joten ero ei voi tulla mistään muusta kuin
   * siirtovaiheesta.
   */
  vaadi(`${tunnus}: 4a. nopan jälkeen ulkomaisia kaupunkeja näkyy ja jokainen on kohde`,
    ulkomaisetKohteet.length > 0 && ulkomaisetNakyvat.length > 0
      && ulkomaisetNakyvat.every((id) => (heitto.kohteet ?? []).includes(id)),
    JSON.stringify({ kohteet: heitto.kohteet, nakyvat: ulkomaisetNakyvat }));
  vaadi(`${tunnus}: 4b. muut kuin kohdemaan tai kohteiden kaupungit pysyvät piilossa`,
    jalkeen.pisteet.every((id) => sallitut.has(id)),
    JSON.stringify(jalkeen.pisteet.filter((id) => !sallitut.has(id))));
  /*
   * KOHDE EI OLE KAUPUNKIPISTEEN VARASSA. Nimibudjetti (PAATOKSET 34
   * kohta 21, js/pallolauta/nimet.js nimibudjetti) pudottaa uloimmilla
   * zoomtasoilla osan kaupunkien nimistä, ja piste seuraa nimeä —
   * maarajaus ei siihen liity. Kohde näkyy silti aina omana
   * kohdemerkkinään, joten vartio mittaa sen eikä kaupunkipisteitä.
   */
  vaadi(`${tunnus}: 4c. jokaisella tarjolla olevalla kohteella on kohdemerkki kartalla`,
    jalkeen.kohdemerkkeja >= (heitto.kohteet ?? []).length,
    JSON.stringify({ merkkeja: jalkeen.kohdemerkkeja, kohteita: heitto.kohteet?.length }));
  tieto(`${tunnus}: nimibudjetin pudottamat kohteet`,
    (heitto.kohteet ?? []).filter((id) => !jalkeen.pisteet.includes(id)).join(', ') || '—');

  /* ── 5. kehittäjän maailmatila näyttää kaikki ────────────────── */
  const maailma = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    const { asetaKehittajaMaailma } = await import('./js/ui-apurit.js');
    asetaKehittajaMaailma(true);
    ui.kehittajaMaailma = true;
    ui.render();
    ui.pallolauta.ladoHeti();
    await new Promise((r) => setTimeout(r, 500));
    const paalla = ui.pallonInstanssi.pointsData().filter((p) => !p.laji).length;
    asetaKehittajaMaailma(false);
    ui.kehittajaMaailma = false;
    ui.render();
    ui.pallolauta.ladoHeti();
    await new Promise((r) => setTimeout(r, 500));
    return { paalla, pois: ui.pallonInstanssi.pointsData().filter((p) => !p.laji).length };
  });
  tieto(`${tunnus}: maailmatila pisteitä päällä / pois`, `${maailma.paalla} / ${maailma.pois}`);
  vaadi(`${tunnus}: 5. maailmatila näyttää kaikki ja sammutus palauttaa rajauksen`,
    maailma.paalla === 264 && maailma.pois < maailma.paalla, JSON.stringify(maailma));

  vaadi(`${tunnus}: 6. ei sivuvirheitä`, virheet.length === 0,
    virheet.join(' | ').slice(0, 300));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
