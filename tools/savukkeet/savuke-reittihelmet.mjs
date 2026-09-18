/*
 * Savuke: VÄLIPISTE ON PÄÄTEPISTEEN KOKOINEN YMPYRÄ ILMAN PUNAISTA
 * (Raamattu KARTTAUUDISTUKSEN PAATOKSET 39).
 *
 * OMISTAJA 18.9.2026 klo 20.40, puhelintestin v1944 löydös 3, kuva
 * Marseillen siirtovaiheesta, sanatarkasti:
 *   *"valipisteet saisi nakya isommalla. saman kokoinen ympyra kuin
 *   paatepiste, mutta ilman punaista korostusta"*
 * Kuvassa katkoviivareitit lähtivät Marseillesta, päätepisteissä oli
 * pergamenttiympyrä punaisella katkorenkaalla (nopanheiton kohdemerkki
 * js/pallolauta/merkit.js kohdeElementti) ja välipisteet olivat pieninä
 * valkoisina tappeina (askelhelmi, js/pallolauta/reitit.js).
 *
 * ── MIKÄ ON PÄÄTEPISTE, JOHON MITATAAN ────────────────────────────
 *
 * Kohdemerkkejä on kaksi kokoa: kaupunkikohde KOHDEMERKIN_PX (24 px) ja
 * REITIN VARRELLA oleva askelpiste KOHDEMERKIN_PISTE_PX (15 px,
 * .target-piste.far). Välipiste on täsmälleen samaa lajia kuin
 * jälkimmäinen — reitin askel — ja ero on vain siinä, onko se juuri nyt
 * valittavissa. Siksi mitta on 15 px: kun askel on valittavissa, sen
 * päälle tulee punainen katkorengas; kun ei ole, jäljelle jää sama
 * ympyrä ilman korostusta. Molemmat kohdemerkkilajit mitataan ja
 * kirjataan, jotta Fable näkee suhteen.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   1. HELMIÄ ON ja jokaisella on reunuslevy (reuna: true) ja
 *      pergamenttilevy — kaksi levyä samassa pisteessä.
 *   2. RUUTUVAKIO: helmen ULKOhalkaisija on 15 px ± 1 px MOLEMMILLA
 *      zoomeilla (0,05 ja 0,15). Mitta luetaan piirretystä
 *      geometriasta: levyn reunapiste projisoidaan kameralla ruudulle,
 *      eli mitataan se, minkä renderöijä piirtää, ei kaavaa jolla se
 *      laskettiin.
 *   3. SAMA KUIN PÄÄTEPISTE: helmen ulkohalkaisija = reitin varren
 *      kohdemerkin ympyrän halkaisija ± 1 px (CTM:stä luettuna).
 *   4. EI PUNAISTA HELMESSÄ: helmen ympäriltä otetusta ruudusta
 *      yhdessäkään pikselissä R − max(G, B) < 40.
 *   5. PUNAINEN RENGAS ON YHÄ PÄÄTEPISTEESSÄ: kohdemerkin alueelta
 *      löytyy pikseleitä joissa R − max(G, B) ≥ 40, ja .target-piste
 *      käyttää yhä katkoviivaa (stroke-dasharray).
 *   6. KORKEUSJÄRJESTYS ENNALLAAN: helmi reitin viivan (0,002) päällä
 *      ja kaupunkipisteiden (0,003) alla; reunus helmen alla.
 *   7. FPS ≥ 50 panoroinnissa, kun helmet ovat ruudulla.
 *
 * KAAPPAUKSET: ennen/jälkeen 390 px:n siirtovaiheesta. "Ennen" tehdään
 * palauttamalla vanha KARTTAVAKIO (säde 0,014 pallon yksikköä) suoraan
 * levyjen skaalaan ja piilottamalla reunuslevyt — sama kuva kuin
 * v1944:ssä, ilman että savuke joutuu ajamaan toista työpuuta.
 *
 * Aja:
 *   NODE_USE_ENV_PROXY=1 PORTTI=8825 node tools/savukkeet/savuke-reittihelmet.mjs [kuvakansio]
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
const KUVAKANSIO = process.argv[2] ?? join(JUURI, 'tools/savukkeet/kaappaukset/reittihelmet');
if (!existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/** Päätepisteen (reitin varren kohdemerkin) ympyrän halkaisija ruudulla. */
const KOHDEMERKIN_PISTE_PX = 15;
/** Sallittu ero helmen ja päätepisteen välillä. */
const SALLITTU_PX = 1;
/** Punaisuuden raja: R − max(G, B). */
const PUNAINEN_RAJA = 40;
/** Kehysnopeuden portti panoroinnissa. */
const FPS_RAJA = 50;
/*
 * KAKSI ZOOMIA: ruutuvakio ei saa muuttua niiden välillä. Luvut on
 * valittu niin, että Marseillen koko reittiviuhka (helmet JA
 * kohdemerkit) mahtuu puhelinruudulle — lähemmällä 0,05:llä viuhka
 * levisi ruudun ulkopuolelle eikä pikselimittausta voinut ottaa.
 */
const ZOOMIT = [0.35, 0.15];
/** Ruudut: puhelin ja työpöytä. */
const RUUDUT = [
  { nimi: '390', width: 390, height: 844, dpr: 2 },
  { nimi: '1400', width: 1400, height: 900, dpr: 1 },
];

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.mp3': 'audio/mpeg', '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(Number(process.env.PORTTI ?? 0), ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* Ämpäri Noden kautta (CLAUDE.md: kontin selain ei osaa välitystä). */
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

const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});

/**
 * Mittauskoodi sivulla: nappula Marseilleen, noppa kiinnitetään
 * kolmoseen ja matkustetaan maateitse, jolloin siirtovaiheessa on sekä
 * kaupunkikohteita (Alpit, Barcelona) että reitin varren askelpiste
 * (Pariisin suunta, 4 askelta) — täsmälleen omistajan kuvan tilanne.
 */
const KOHDE = 'marseille';

/* Tallenne: Fogg Marseillessa, vuoro heittovaiheessa. */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: KOHDE }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'roll';
const TALLENNE = JSON.stringify(peli.toJSON());

async function avaa(ruutu) {
  const ctx = await selain.newContext({
    viewport: { width: ruutu.width, height: ruutu.height },
    deviceScaleFactor: ruutu.dpr,
    serviceWorkers: 'block',
  });
  /*
   * TALLENNE SUORAAN LOKAALIVARASTOON (sama kaava kuin
   * savuke-pallo-reitit.mjs): Fogg seisoo Marseillessa ja vuoro on
   * heittovaiheessa, joten peli avautuu laudalle ilman etusivun
   * avauslentoa — savuke ei saa mitata avausanimaatiota.
   */
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, TALLENNE);
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
  return { ctx, sivu, virheet, auki };
}

/*
 * SAAPUMISLUENTA POIS ALTA. Marseilleen saapuminen käynnistää isoisän
 * luennan, joka peittää kartan kuvalla ja harsolla (js/fokusvirta.js) —
 * mittaus lukisi silloin harson värit eikä helmiä. "Ohita" on pelin oma
 * tie ulos, joten savuke käyttää sitä eikä omaa temppua.
 */
async function ohitaLuenta(sivu) {
  for (let i = 0; i < 3; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const oli = await sivu.evaluate(() => {
      const b = document.querySelector('.fokusvirta-isokuva-ohita');
      if (!b) return false;
      b.click();
      return true;
    });
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(400);
    if (!oli) break;
  }
}

/** Siirtovaihe auki Marseillessa ja kamera annetulle korkeudelle. */
async function siirtovaihe(sivu, kaupunki, korkeus) {
  return sivu.evaluate(async ({ id, alt }) => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') {
      game.actionPickStart(game.pack.cities.find((c) => c.links?.length ?? true).id, 0);
      await new Promise((r) => setTimeout(r, 400));
    }
    game.player.pos = { type: 'city', city: id };
    game.world.visited.add(id);
    game.phase = 'action';
    ui.katselu = false;
    game.rollDie = () => 3;
    /*
     * SIIRTOVAIHE SYNTYY VASTA NOPANHEITOSTA: actionTravel valitsee
     * tavan ja jättää pelin 'roll'-vaiheeseen, actionRoll laskee
     * päätepisteet ja siirtää vaiheeseen 'move' (js/game.js). Molemmat
     * tarvitaan, jotta kohdemerkit piirtyvät.
     */
    try {
      game.actionTravel('land');
      game.actionRoll();
    } catch { /* reitti puuttuu */ }
    ui.liukuAuki = true;
    ui.matkaSessio = id;
    ui.render();
    const l = ui.pallolauta;
    const c = game.board.cityById.get(id);
    const p = l.asteet({ x: c.x, y: c.y });
    l.kamera?.pysaytaKameraAjo?.();
    l.pallo.pointOfView({ lat: p.lat, lng: p.lon, altitude: alt }, 0);
    await new Promise((r) => setTimeout(r, 700));
    ui.paivitaMatkareitit();
    l.paivita();
    await new Promise((r) => setTimeout(r, 900));
    return { vaihe: game.phase, kohteita: (game.moveOptions?.() ?? []).length };
  }, { id: kaupunki, alt: korkeus });
}

/** Siirtovaihe + luennan ohitus + uusi kameran asetus sen jälkeen. */
async function siirtovaiheSelvana(sivu, kaupunki, korkeus) {
  const eka = await siirtovaihe(sivu, kaupunki, korkeus);
  await ohitaLuenta(sivu);
  await sivu.waitForTimeout(600);
  const toka = await siirtovaihe(sivu, kaupunki, korkeus);
  await ohitaLuenta(sivu);
  await sivu.waitForTimeout(400);
  return toka.kohteita ? toka : eka;
}

/**
 * Mitat ruudulta. Helmen halkaisija luetaan PIIRRETYSTÄ geometriasta:
 * levyn paikallinen kärki (1, 0, −1) muunnetaan maailmaan ja
 * projisoidaan kameralla, jolloin saadaan sama luku, jonka silmä näkee.
 * Kohdemerkin ympyrä luetaan svg:n ruutu-CTM:stä.
 */
async function mittaa(sivu) {
  return sivu.evaluate(() => {
    const { ui } = window.matkakirja;
    const l = ui.pallolauta;
    const koti = l.kotelo.getBoundingClientRect();
    const kamera = l.pallo.camera();
    const ruutuPiste = (o, lx, ly) => {
      const v = o.localToWorld(new o.position.constructor(lx, ly, -1));
      const p = v.clone().project(kamera);
      return { x: (p.x * 0.5 + 0.5) * koti.width, y: (0.5 - p.y * 0.5) * koti.height };
    };
    /* Kohdemerkit: ympyrän säde svg-yksiköissä x ruudun CTM. */
    const kohteet = [];
    for (const el of document.querySelectorAll('.pallolauta-kohde')) {
      const ymp = el.querySelector('.target-piste');
      if (!ymp) continue;
      const ctm = ymp.getScreenCTM();
      if (!ctm) continue;
      const skaala = Math.hypot(ctm.a, ctm.b);
      const laatikko = el.getBoundingClientRect();
      kohteet.push({
        far: ymp.classList.contains('far'),
        halkaisija: 2 * Number(ymp.getAttribute('r')) * skaala,
        katko: getComputedStyle(ymp).strokeDasharray,
        viiva: getComputedStyle(ymp).stroke,
        x: laatikko.left + laatikko.width / 2 - koti.left,
        y: laatikko.top + laatikko.height / 2 - koti.top,
      });
    }
    /*
     * HELMET VASTA KOHTEIDEN JÄLKEEN: näytehelmeksi valitaan se, joka on
     * KAUIMPANA jokaisesta kohdemerkistä ja muista helmistä — muuten
     * punaisuusmittaus lukisi viereisen päätepisteen katkorenkaan helmen
     * omaksi väriksi. Paras ehdokas kelpaa aina, joten mittaus ei jää
     * tyhjäksi vain siksi, että helmet sattuvat olemaan lähekkäin.
     */
    const helmet = l.pallo.pointsData().filter((d) => d.laji === 'helmi');
    const mitat = { reunat: [], taytteet: [] };
    const kesket = [];
    for (const d of helmet) {
      const o = d.__threeObjPoint;
      if (!o) continue;
      o.updateMatrixWorld(true);
      const keski = ruutuPiste(o, 0, 0);
      const reunaP = ruutuPiste(o, 1, 0);
      const halkaisija = 2 * Math.hypot(reunaP.x - keski.x, reunaP.y - keski.y);
      (d.reuna ? mitat.reunat : mitat.taytteet).push(halkaisija);
      if (!d.reuna) kesket.push(keski);
    }
    const sisalla = (p, marginaali) => p.x > marginaali && p.y > marginaali
      && p.x < koti.width - marginaali && p.y < koti.height - marginaali;
    const etaisin = (lista, muut) => {
      let paras = null;
      let parasArvo = -1;
      for (const p of lista) {
        if (!sisalla(p, 20)) continue;
        let arvo = Infinity;
        for (const q of muut) {
          if (q === p) continue;
          arvo = Math.min(arvo, Math.hypot(q.x - p.x, q.y - p.y));
        }
        if (arvo > parasArvo) { parasArvo = arvo; paras = p; }
      }
      return paras ? { ...paras, valjyys: Math.round(parasArvo * 10) / 10 } : null;
    };
    const naytehelmi = etaisin(kesket, [...kesket, ...kohteet]);
    const naytekohde = etaisin(kohteet.map((k) => ({ x: k.x, y: k.y })), kesket);
    const korkeus = l.pallo.pointAltitude();
    const helmiD = helmet.find((d) => !d.reuna);
    const reunaD = helmet.find((d) => d.reuna);
    const kaupunkiD = l.pallo.pointsData().find((d) => d.laji !== 'helmi' && d.laji !== 'valo');
    return {
      helmia: mitat.taytteet.length,
      reunoja: mitat.reunat.length,
      ulko: mitat.reunat.length
        ? Math.round((mitat.reunat.reduce((a, b) => a + b, 0) / mitat.reunat.length) * 100) / 100
        : null,
      sisa: mitat.taytteet.length
        ? Math.round((mitat.taytteet.reduce((a, b) => a + b, 0) / mitat.taytteet.length) * 100) / 100
        : null,
      ulkoMin: mitat.reunat.length ? Math.round(Math.min(...mitat.reunat) * 100) / 100 : null,
      ulkoMax: mitat.reunat.length ? Math.round(Math.max(...mitat.reunat) * 100) / 100 : null,
      kesket: kesket.map((k) => [Math.round(k.x), Math.round(k.y)]),
      kohteet,
      naytehelmi,
      naytekohde,
      kotelo: { w: Math.round(koti.width), h: Math.round(koti.height) },
      korkeudet: {
        helmi: helmiD ? korkeus(helmiD) : null,
        reuna: reunaD ? korkeus(reunaD) : null,
        kaupunki: kaupunkiD ? korkeus(kaupunkiD) : null,
      },
    };
  });
}

/** Punaisuus (R − max(G, B)) annetun ruutupisteen ympäriltä. */
async function punaisuus(sivu, piste, sadePx) {
  const kuva = (await sivu.screenshot()).toString('base64');
  return sivu.evaluate(async ({ data, p, r }) => {
    const img = new Image();
    img.src = `data:image/png;base64,${data}`;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const g = c.getContext('2d', { willReadFrequently: true });
    g.drawImage(img, 0, 0);
    const dpr = img.width / window.innerWidth;
    const koti = window.matkakirja.ui.pallolauta.kotelo.getBoundingClientRect();
    const x = Math.round((p.x + koti.left) * dpr);
    const y = Math.round((p.y + koti.top) * dpr);
    const s = Math.round(r * dpr);
    if (x - s < 0 || y - s < 0 || x + s >= img.width || y + s >= img.height) return null;
    const leveys = 2 * s + 1;
    const d = g.getImageData(x - s, y - s, leveys, leveys).data;
    /*
     * YMPYRÄ, EI NELIÖ. Merkki on ympyrä, joten neliön kulmat osuvat jo
     * kartan pintaan — ensimmäisellä mittauskierroksella juuri ne neljä
     * kulmaa toivat "punaista helmeen" (3-8 pikseliä 169:stä).
     */
    let suurin = -255;
    let punaisia = 0;
    let pikselia = 0;
    for (let i = 0; i < d.length; i += 4) {
      const p1 = i / 4;
      const dx = (p1 % leveys) - s;
      const dy = Math.floor(p1 / leveys) - s;
      if (dx * dx + dy * dy > s * s) continue;
      pikselia += 1;
      const ero = d[i] - Math.max(d[i + 1], d[i + 2]);
      if (ero > suurin) suurin = ero;
      if (ero >= 40) punaisia += 1;
    }
    return { suurin, punaisia, pikselia };
  }, { data: kuva, p: piste, r: sadePx });
}

const tulokset = {};
for (const ruutu of RUUDUT) {
  // eslint-disable-next-line no-await-in-loop
  const { ctx, sivu, virheet, auki } = await avaa(ruutu);
  vaadi(`${ruutu.nimi}: pallolauta aukesi`, auki, virheet.slice(0, 2).join(' | '));
  if (!auki) { await ctx.close(); continue; } // eslint-disable-line no-await-in-loop
  const omat = [];
  for (const zoom of ZOOMIT) {
    // eslint-disable-next-line no-await-in-loop
    const tila = await siirtovaiheSelvana(sivu, KOHDE, zoom);
    // eslint-disable-next-line no-await-in-loop
    const m = await mittaa(sivu);
    omat.push({ zoom, tila, m });
    tieto(`${ruutu.nimi} zoom ${zoom}`, JSON.stringify({
      vaihe: tila.vaihe,
      kohteita: tila.kohteita,
      helmia: m.helmia,
      reunoja: m.reunoja,
      ulkoPx: m.ulko,
      sisaPx: m.sisa,
      ulkoMin: m.ulkoMin,
      ulkoMax: m.ulkoMax,
      kesket: m.kesket,
      kohdePaikat: m.kohteet.map((k) => [Math.round(k.x), Math.round(k.y)]),
      kohdeYmpyrat: m.kohteet.map((k) => [k.far ? 'far' : 'city', Math.round(k.halkaisija * 100) / 100]),
    }));
  }
  tulokset[ruutu.nimi] = omat;

  vaadi(`${ruutu.nimi}: 1. helmiä on ja jokaisella on reunuslevy`,
    omat.every((o) => o.m.helmia > 0 && o.m.reunoja === o.m.helmia),
    JSON.stringify(omat.map((o) => [o.zoom, o.m.helmia, o.m.reunoja])));

  vaadi(`${ruutu.nimi}: 2. helmen ulkohalkaisija on ${KOHDEMERKIN_PISTE_PX} px ± ${SALLITTU_PX} molemmilla zoomeilla`,
    omat.every((o) => o.m.ulkoMin !== null
      && Math.abs(o.m.ulkoMin - KOHDEMERKIN_PISTE_PX) <= SALLITTU_PX
      && Math.abs(o.m.ulkoMax - KOHDEMERKIN_PISTE_PX) <= SALLITTU_PX),
    JSON.stringify(omat.map((o) => [o.zoom, o.m.ulkoMin, o.m.ulkoMax])));

  const kohdeParit = omat.map((o) => {
    const far = o.m.kohteet.find((k) => k.far);
    return far ? [o.zoom, Math.round(far.halkaisija * 100) / 100, o.m.ulko] : [o.zoom, null, o.m.ulko];
  });
  const mitatut = kohdeParit.filter((p) => p[1] !== null);
  vaadi(`${ruutu.nimi}: 3. helmi = reitin varren päätepisteen ympyrä ± ${SALLITTU_PX} px`,
    mitatut.length > 0 && mitatut.every((p) => Math.abs(p[1] - p[2]) <= SALLITTU_PX),
    JSON.stringify(kohdeParit));

  /* 4 ja 5: punaisuus helmen ja kohdemerkin ympäriltä. */
  // eslint-disable-next-line no-await-in-loop
  await siirtovaiheSelvana(sivu, KOHDE, ZOOMIT[0]);
  // eslint-disable-next-line no-await-in-loop
  const m0 = await mittaa(sivu);
  const helmiPiste = m0.naytehelmi;
  // eslint-disable-next-line no-await-in-loop
  const helmiPunainen = helmiPiste ? await punaisuus(sivu, helmiPiste, 6) : null;
  const kohde = m0.naytekohde;
  // eslint-disable-next-line no-await-in-loop
  const kohdePunainen = kohde ? await punaisuus(sivu, kohde, 12) : null;
  tieto(`${ruutu.nimi} punaisuus`, JSON.stringify({
    helmiPiste, helmi: helmiPunainen, kohdePiste: kohde, kohde: kohdePunainen, kotelo: m0.kotelo,
  }));
  vaadi(`${ruutu.nimi}: 4. helmen alueella ei punaista (R − max(G,B) < ${PUNAINEN_RAJA})`,
    Boolean(helmiPunainen) && helmiPunainen.punaisia === 0,
    JSON.stringify(helmiPunainen));
  vaadi(`${ruutu.nimi}: 5. päätepisteessä on yhä punainen katkorengas`,
    Boolean(kohdePunainen) && kohdePunainen.punaisia > 0
      && m0.kohteet.every((k) => /\d/.test(k.katko)),
    JSON.stringify({ kohdePunainen, katko: m0.kohteet.map((k) => k.katko) }));

  vaadi(`${ruutu.nimi}: 6. korkeusjärjestys ennallaan (viiva < reunus < helmi < kaupunki)`,
    m0.korkeudet.helmi !== null && m0.korkeudet.reuna !== null
      && m0.korkeudet.reuna < m0.korkeudet.helmi
      && m0.korkeudet.reuna > 0.002
      && m0.korkeudet.helmi < (m0.korkeudet.kaupunki ?? 0.003),
    JSON.stringify(m0.korkeudet));

  /* 7: fps panoroinnissa, helmet ruudulla. */
  // eslint-disable-next-line no-await-in-loop
  const fps = await sivu.evaluate(async () => {
    const l = window.matkakirja.ui.pallolauta;
    const nyt = l.pallo.pointOfView();
    const alku = performance.now();
    let kehyksia = 0;
    await new Promise((valmis) => {
      const askel = () => {
        const t = (performance.now() - alku) / 3000;
        kehyksia += 1;
        l.pallo.pointOfView({ ...nyt, lng: nyt.lng + t * 0.9 }, 0);
        if (t >= 1) { valmis(); return; }
        requestAnimationFrame(askel);
      };
      requestAnimationFrame(askel);
    });
    return Math.round((kehyksia / ((performance.now() - alku) / 1000)) * 10) / 10;
  });
  tieto(`${ruutu.nimi} fps panoroinnissa`, fps);
  vaadi(`${ruutu.nimi}: 7. fps ≥ ${FPS_RAJA} panoroinnissa`, fps >= FPS_RAJA, String(fps));

  /* Kaappaukset vain puhelinruudulta: ennen (vanha karttavakio) ja jälkeen. */
  if (ruutu.nimi === '390') {
    // eslint-disable-next-line no-await-in-loop
    await siirtovaiheSelvana(sivu, KOHDE, ZOOMIT[0]);
    // eslint-disable-next-line no-await-in-loop
    await sivu.evaluate(() => {
      /*
       * ENNEN-KUVA: vanha KARTTAVAKIO (REITTIHELMEN_SADE 0,014) takaisin
       * levyjen skaalaan ja reunuslevyt pois. Sama kirjaston kaava kuin
       * pointRadius-luennassa (PISTEEN_SKAALA = 2πR/360, R = 100).
       */
      const l = window.matkakirja.ui.pallolauta;
      const SKAALA = (2 * Math.PI * 100) / 360;
      for (const d of l.pallo.pointsData()) {
        if (d.laji !== 'helmi') continue;
        const o = d.__threeObjPoint;
        if (!o) continue;
        const s = d.reuna ? 0 : 0.014 * SKAALA;
        o.scale.x = s; o.scale.y = s;
      }
      l.heraa?.();
    });
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(500);
    // eslint-disable-next-line no-await-in-loop
    await sivu.screenshot({ path: join(KUVAKANSIO, 'ennen-390.png') });
    // eslint-disable-next-line no-await-in-loop
    await siirtovaiheSelvana(sivu, KOHDE, ZOOMIT[0]);
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(500);
    // eslint-disable-next-line no-await-in-loop
    await sivu.screenshot({ path: join(KUVAKANSIO, 'jalkeen-390.png') });
    tieto('kaappaukset', `${join(KUVAKANSIO, 'ennen-390.png')} ja ${join(KUVAKANSIO, 'jalkeen-390.png')}`);
  }

  vaadi(`${ruutu.nimi}: ei sivuvirheitä`, virheet.length === 0, virheet.slice(0, 3).join(' | '));
  // eslint-disable-next-line no-await-in-loop
  await ctx.close();
}

console.log(`\n${lapi}/${kaikki} läpi`);
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
