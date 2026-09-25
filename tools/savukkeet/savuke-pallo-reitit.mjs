/*
 * Savuke: REITIN PÄÄ ON KAUPUNGIN PALLOPISTEESSÄ.
 *
 * Omistajan vikailmoitus 7.9.2026 illalla (iPad, pallolauta
 * Helsingissä, sanatarkasti): *"Reitti Helsinkiin pitää korjata ja
 * samalla tarkastaa onko kaikki kaupungit oikealla paikalla."*
 * Nappula seisoi Suomenlahden rannalla kaupungin omassa pallopisteessä,
 * mutta reittiviivojen risteys jäi 34,7 km sisämaahan.
 *
 * ── MITÄ TÄMÄ MITTAA JA MITÄ EI ───────────────────────────────────
 *
 * Reittiviiva piirtyy pelissä KAHDESTI: elävänä pallon viivakerroksessa
 * (js/pallolauta/reitit.js) ja poltettuna laattapyramidin viivatasoon
 * (tools/fokuskartta/sisalto.mjs). Tämä savuke mittaa ELÄVÄN kerroksen
 * — sen, mitä selain piirtää. Poltetun verkon sama ehto on
 * yksikkötestissä tests/pallon-reittipaat.test.mjs, joka lukee
 * generaattorin oman sisällön ilman selainta; se on myös se vartio,
 * joka kaatui ennen korjausta.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   1. JOKAISEN KAUPUNGIN JOKAISEN REITIN PÄÄ on enintään RAJA_KM
 *      kaupungin pallopisteestä (`lauta.asteet`) — sekä maa- että
 *      merireitit, myös via-pisteelliset.
 *   2. ASKELHELMET OVAT SAMALLA VIIVALLA: jokainen helmi osuu siihen
 *      pisteeseen, jonka `pointAlong(reitit.poly(reitti), i/steps)`
 *      antaa. Sama kaava kulkee nappulan kuljettajalla
 *      (js/pallolauta/siirto.js), joten tämä vartioi myös sitä, ettei
 *      siirto pääty nytkähdykseen.
 *   3. NAPPULA SEISOO REITIN PÄÄSSÄ: nappulan jalan ruutupaikka ja
 *      lähimmän reitinpään ruutupaikka ovat samat ±SALLITTU_PX. Juuri
 *      tämän eron omistaja näki kuvasta.
 *
 * Kaupungit ovat ne, joiden pallopiste on kauimpana laudan omasta
 * pisteestä — siellä vika on suurin ja mittaus herkin.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1): kontin
 * selain ei osaa välityspalvelinta, Noden fetch osaa. Ilman ämpäriä
 * pallo ei lataudu; savuke toteaa sen ja päättyy ohituksella.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-pallo-reitit.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? '/tmp/matkakirja-kaappaukset';
if (!existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/** Reitin pään sallittu ero kaupungin pallopisteestä. */
const RAJA_KM = 1;
/** Nappulan jalan ja reitinpään sallittu ero ruudulla. */
const SALLITTU_PX = 2;
/** Askelhelmen sallittu ero omasta kaavastaan. */
const HELMI_KM = 0.5;
/*
 * KAUPUNGIT, JOILLA SIIRTYMÄ ON SUURIN (js/packs/
 * maailmankartta-pallopisteet.js): Helsinki on omistajan oma tapaus,
 * muut ovat taulun kärki. Singapore tuli mukaan 7.9.2026 illan toisella
 * kierroksella (59,8 km), joten se vartioi myös uutta pistettä.
 */
const KAUPUNGIT = ['helsinki', 'havanna', 'iqaluit', 'tallinna', 'singapore'];

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

/* Tallenne: Fogg Helsingissä, siirtovaihe auki (naapurireitit näkyvät). */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'helsinki' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'roll';
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 417, height: 550 }, deviceScaleFactor: 2, serviceWorkers: 'block',
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
await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 120000 });
await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 120000 });
const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null,
  { timeout: 120000 }).then(() => true).catch(() => false);
vaadi('pallolauta aukesi', auki, virheet.join(' | '));

if (auki) {
  await sivu.waitForTimeout(3500);

  const mittaa = (id) => sivu.evaluate(async (kaupunki) => {
    const { ui } = window.matkakirja;
    const l = ui.pallolauta;
    const { board } = ui.game;
    const c = board.cityById.get(kaupunki);
    /*
     * Nappula kaupunkiin ja siirtovaihe auki, jotta naapurireitit
     * piirtyvät (js/ui.js matkareittienValinta): sama sääntö kuin
     * pelissä, ei omaa piirtoa.
     */
    ui.game.player.pos = { type: 'city', city: kaupunki };
    ui.katselu = false;
    ui.liukuAuki = true;
    const p = l.asteet({ x: c.x, y: c.y });
    l.pallo.pointOfView({ lat: p.lat, lng: p.lon, altitude: 0.05 }, 0);
    await new Promise((v) => setTimeout(v, 900));
    ui.paivitaMatkareitit();
    l.paivita();
    await new Promise((v) => setTimeout(v, 700));

    const RAD = Math.PI / 180;
    const SADE = 6371.0088;
    const km = (a, b) => {
      const dLat = (b.lat - a.lat) * RAD;
      const dLon = (b.lng - a.lng) * RAD;
      const h = Math.sin(dLat / 2) ** 2
        + Math.cos(a.lat * RAD) * Math.cos(b.lat * RAD) * Math.sin(dLon / 2) ** 2;
      return 2 * SADE * Math.asin(Math.min(1, Math.sqrt(h)));
    };
    const oma = { lat: p.lat, lng: p.lon };

    /* 1. reittien päät */
    const naapurit = new Set(board.adj.get(kaupunki) ?? []);
    let pahinPaa = 0;
    let paita = 0;
    let polkuja = 0;
    let lahinPaaRuudulla = null;
    for (const d of l.pallo.pathsData()) {
      const eid = String(d.avain ?? '').replace('#varjo', '');
      if (!naapurit.has(eid)) continue;
      const pts = d.pisteet;
      if (!pts?.length) continue;
      polkuja += 1;
      const e = board.edgeById.get(eid);
      for (const [pää, sijainti] of [[pts[0], e.a], [pts[pts.length - 1], e.b]]) {
        if (sijainti !== kaupunki) continue;
        paita += 1;
        pahinPaa = Math.max(pahinPaa, km({ lat: pää[0], lng: pää[1] }, oma));
        const r = l.pallo.getScreenCoords(pää[0], pää[1], 0);
        if (r && Number.isFinite(r.x)) lahinPaaRuudulla = r;
      }
    }

    /* 2. askelhelmet reitin omalla kaavalla */
    const { pointAlong } = await import('/js/rules.js');
    let pahinHelmi = 0;
    let helmia = 0;
    for (const h of l.reitit.helmet()) {
      const [eid, i] = String(h.id).split('#');
      const e = board.edgeById.get(eid);
      if (!e) continue;
      const kohta = pointAlong(l.reitit.poly(e), Number(i) / e.steps);
      const a = l.asteet(kohta);
      helmia += 1;
      pahinHelmi = Math.max(pahinHelmi, km({ lat: h.lat, lng: h.lon }, { lat: a.lat, lng: a.lon }));
    }

    /*
     * 3. NAPPULAN JALKA REITIN PÄÄSSÄ. Mitataan vain siinä kaupungissa,
     * jossa nappula tallenteen mukaan seisoo: kuljettajalla on oma
     * ankkurinsa (js/pallolauta/siirto.js), eikä pelkkä `pos`-kentän
     * kirjoitus siirrä hahmoa — se on siirron tehtävä, ei tämän.
     */
    const lueJalka = () => {
      const koti = l.kotelo.getBoundingClientRect();
      for (const d of l.pallo.htmlElementsData()) {
        if (d.laji !== 'nappula' || !d.el?.isConnected) continue;
        const svg = d.el.querySelector('svg')?.getBoundingClientRect();
        if (!svg) continue;
        return {
          x: svg.left + svg.width / 2 - koti.left,
          y: svg.bottom - koti.top,
          tassa: km({ lat: d.lat, lng: d.lng }, oma) <= 1,
        };
      }
      return null;
    };
    /*
     * KAIKKI LIIKE ANIMOIDAAN: merkki liukuu uuteen paikkaansa, joten
     * mitta otetaan vasta kun se on pysähtynyt (kaksi peräkkäistä
     * lukemaa alle 0,3 px:n päässä toisistaan).
     */
    let jalka = lueJalka();
    for (let i = 0; i < 16; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((v) => setTimeout(v, 200));
      const uusi = lueJalka();
      if (jalka && uusi && Math.hypot(uusi.x - jalka.x, uusi.y - jalka.y) < 0.3) { jalka = uusi; break; }
      jalka = uusi;
    }
    const nappulaTassa = Boolean(jalka?.tassa);
    const jalkaEro = nappulaTassa && jalka && lahinPaaRuudulla
      ? Math.hypot(jalka.x - lahinPaaRuudulla.x, jalka.y - lahinPaaRuudulla.y) : null;

    return {
      kaupunki,
      polkuja,
      paita,
      helmia,
      pahinPaa: Number(pahinPaa.toFixed(3)),
      pahinHelmi: Number(pahinHelmi.toFixed(3)),
      nappulaTassa,
      jalkaEro: jalkaEro === null ? null : Number(jalkaEro.toFixed(2)),
      naapureita: naapurit.size,
    };
  }, id);

  const tulokset = [];
  for (const id of KAUPUNGIT) {
    // eslint-disable-next-line no-await-in-loop
    tulokset.push(await mittaa(id));
  }
  for (const t of tulokset) tieto(t.kaupunki, JSON.stringify(t));

  vaadi(`1. jokaisen reitin pää on ≤ ${RAJA_KM} km kaupungin pallopisteestä`,
    tulokset.every((t) => t.paita >= t.naapureita && t.pahinPaa <= RAJA_KM),
    JSON.stringify(tulokset.filter((t) => t.pahinPaa > RAJA_KM || t.paita < t.naapureita)));
  vaadi(`2. askelhelmet ovat samalla korjatulla viivalla (≤ ${HELMI_KM} km)`,
    tulokset.every((t) => t.helmia > 0 && t.pahinHelmi <= HELMI_KM),
    JSON.stringify(tulokset.map((t) => [t.kaupunki, t.helmia, t.pahinHelmi])));
  /*
   * VARTIO KOSKEE SITÄ KAUPUNKIA, JOHON PELI ON NAPPULAN ASETTANUT.
   * Tallenne aloittaa Helsingistä — omistajan oma tapaus — ja se on
   * ainoa kaupunki, jossa nappula on kuljettajansa (js/pallolauta/
   * siirto.js) asettamana levossa. Muissa kaupungeissa mittaus vain
   * kirjoittaa `pos`-kentän, jolloin hahmo jää kuljettajan oman
   * ankkurin varaan eikä sen ruutupaikka ole pelin tuottama — sitä ei
   * saa vartioida, koska vartio mittaisi mittauksen omaa temppua.
   * Nappulan jalan yleinen sääntö on savuke-pallo-merkit-lukossa.
   */
  const nappulassa = tulokset.filter((t) => t.kaupunki === KAUPUNGIT[0] && t.nappulaTassa);
  vaadi(`3. nappulan jalka on reitin päässä (± ${SALLITTU_PX} px)`,
    nappulassa.length > 0 && nappulassa.every((t) => t.jalkaEro <= SALLITTU_PX),
    JSON.stringify(nappulassa.map((t) => [t.kaupunki, t.jalkaEro])));

  /* Omistajan oma näkymä kuvaksi: Helsinki, 834 × 1100 laitepikseliä. */
  await sivu.setViewportSize({ width: 417, height: 550 });
  await mittaa('helsinki');
  await sivu.waitForTimeout(600);
  const kuva = join(KUVAKANSIO, 'pallo-reitit-helsinki.png');
  await sivu.screenshot({ path: kuva });
  tieto('kuvakaappaus', kuva);
}

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
console.log(`\n${lapi}/${kaikki} läpi`);
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
