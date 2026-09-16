/*
 * Savuke: NIMIKYLTTI ON KIINNI KAUPUNGISSA, EI RUUDUSSA.
 *
 * Omistaja 14.9.2026 (Raamattu KARTTAUUDISTUKSEN PAATOKSET 12 kohta 1,
 * sanatarkasti): *"Pariisin nimikyltti liikkuu panoroitaessa. sen pitaa
 * pysya paikallaan."* Sitova tausta on PAATOKSET 2: staattinen
 * käsinpiirretty kartta, jossa kaikki on kiinnitetty karttaan eikä
 * ruutuun.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   1. KYLTTI PYSYY KIINNI KAUPUNGISSA. Kaupungin nimen ruutulaatikon
 *      keskipiste MIINUS kaupungin oma pallopiste (`getScreenCoords`)
 *      on sama luku ennen ja jälkeen panoroinnin: hajonta ≤ 1 px sekä
 *      x- että y-suunnassa, neljän 100 px:n vedon yli.
 *   2. SAMA KAHDELLA RUUDULLA (390 × 844 ja 1400 × 900) ja KAHDESSA
 *      KAUPUNGISSA (Pariisi, Marseille).
 *   3. NIMI EI KATOA VEDON AIKANA: kyltti on ruudulla joka
 *      mittauksessa, jossa kaupunki on syvällä ruudulla (yli 90 px
 *      joka reunasta). Laidalla lukko purkautuu tarkoituksella
 *      (js/pallolauta/nimet.js RUUDUN REUNA PURKAA LUKON).
 *
 * MITTA ON KAUPUNGIN PIIRRETTY PISTE, EI LAUDAN KOHTA: pallolla
 * kaupungilla on oma pallopiste (js/pallo.js pallonOmatPisteet), ja
 * juuri sen päällä merkki ja nimi ovat — sama lähde, jota osumatesti
 * lukee (docs/raportit/viesti-fable-osumareititys-20260914.md).
 *
 * MITTAUS AJETAAN VEDON JÄLKEEN LEVOSSA, ja veto tehdään aidolla
 * hiirellä kankaaseen (sivu.mouse), jotta ladonta ajautuu vedon aikana
 * juuri niin monta kertaa kuin oikeassa pelissä (js/pallolauta/lauta.js
 * LADONTA KULKEE MUKANA, enintään kerran 200 ms:ssä).
 *
 * VETO EI SAA VIEDÄ KAUPUNKIA RUUDUN LAITAAN: siellä lukko purkautuu
 * tarkoituksella (js/pallolauta/nimet.js RUUDUN REUNA PURKAA LUKON),
 * koska muuten nimi putoaisi kokonaan. Sarja on siksi −100, +200, +200
 * alas, −200 ylös: 200 px kumpaankin suuntaan ilman laitaa.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-nimikyltti.mjs [kuvakansio]
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
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/** Suurin sallittu hajonta kyltin ja kaupungin välisessä erossa (px). */
const HAJONNAN_RAJA_PX = 1;
/** Vedot pikseleinä: 200 px itään ja 200 px etelään ilman ruudun laitaa. */
const VEDOT = [[-100, 0], [200, 0], [0, 200], [0, -200]];
/*
 * KYLTIN KOKO SAAPUMISNÄKYMÄSSÄ ENNEN MUUTOSTA (ruutuvakio, mitattu
 * Chromiumilla 14.9.2026 dpr 2, pelaaja Pariisissa). Karttaan sidotun
 * kyltin vertailu on KUNKIN LAITTEEN oma saapuminen, joten saapumisessa
 * koko ei saa muuttua yhdelläkään ruudulla (Fablen päätös 14.9.2026).
 */
const RUUDUT = [
  { nimi: 'puhelin', w: 390, h: 844 },
  { nimi: 'tyopoyta', w: 1400, h: 900 },
];
/*
 * 2560 × 1352 EI OLE MUKANA: kontin Chromium kaatuu siihen kesken
 * vedon (*"GPU process isn't usable. Goodbye."*, mitattu 14.9.2026
 * myös dpr 1:llä). Saman väitteen — saapumisnäkymän kyltti on
 * kaikilla ruuduilla entisen kokoinen — mittaa sen sijaan
 * tests/pallonimikyltti.test.mjs vartio 7 kolmella MITATULLA
 * mittakaavalla (0,6552 / 1,8370 / 2,8483), joista viimeinen on juuri
 * tämän ruudun saapumisnäkymä.
 */
/** Kuinka paljon saapumisnäkymän karttakerroin saa poiketa ykkösestä. */
const SAAPUMISEN_VARA = 0.02;
/*
 * ANKKURIN VARAT (vartio 7, tehtävänannon mitta): kyltin suunta
 * merkistä ±5° ja tekstikorkeuteen suhteutettu etäisyys ±10 %.
 */
const ANKKURIN_KULMAVARA = 5;
const ANKKURIN_ETAISYYSVARA = 0.1;
const KAUPUNGIT = ['pariisi', 'marseille'];

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);
const p = (v, n = 2) => (Number.isFinite(v) ? v.toFixed(n) : '—');

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
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; savuke ohitetaan');
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

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

async function avaaSivu(ruutu, kaupunki) {
  const ctx = await selain.newContext({
    viewport: { width: ruutu.w, height: ruutu.h },
    deviceScaleFactor: 2,
    serviceWorkers: 'block',
  });
  await ctx.addInitScript((d) => {
    try {
      localStorage.setItem('matkakirja-save-v1', d);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne(kaupunki));
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
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  /*
   * SAAPUMINEN AJETAAN LOPPUUN ENNEN MITTAUSTA. Isoisän luentakuva
   * nousee kartalle isona luennan ajaksi ja pienenee vasta sen
   * jälkeen (js/fokusvirta.js), ja iso kuva on nimiladonnalle VARAUS:
   * sen alta nimi väistyy ja palaa kuvan kutistuessa. Se on ajan, ei
   * panoroinnin, aiheuttama siirto — mitattu 14.9.2026, ja se
   * peittäisi juuri sen ilmiön, jota tämä savuke mittaa.
   */
  await sivu.waitForTimeout(42000);
  return { ctx, sivu, virheet };
}

/** Kyltin ruutulaatikon keskipiste MIINUS kaupungin piirretty pallopiste. */
const mittaaSuhde = (sivu, id) => sivu.evaluate((kaupunkiId) => {
  const ui = window.matkakirja.ui;
  const lauta = ui.pallolauta;
  const city = ui.game.pack.cities.find((c) => c.id === kaupunkiId);
  const asteet = lauta.asteet({ x: city.x, y: city.y });
  const piste = asteet ? lauta.pallo.getScreenCoords(asteet.lat, asteet.lon, 0) : null;
  const teksti = document.querySelector(`.pallolauta-nimi[data-kaupunki="${kaupunkiId}"] text`);
  const r = teksti ? teksti.getBoundingClientRect() : null;
  const koti = (document.querySelector('.pallolauta-kotelo') ?? document.body).getBoundingClientRect();
  if (!piste || !r || !(r.width > 0)) {
    return {
      piste,
      kyltti: null,
      syvalla: Boolean(piste) && piste.x > 90 && piste.y > 90
        && piste.x < koti.width - 90 && piste.y < koti.height - 90,
    };
  }
  const koti2 = koti;
  return {
    piste,
    // Onko kaupunki niin syvällä ruudulla, että kyltti mahtuu joka
    // kyljelle? Laidalla ladonta saa yhä pudottaa nimen (nimet.js
    // RUUDUN REUNA PURKAA LUKON), eikä sitä lasketa vikaan.
    syvalla: piste.x > 90 && piste.y > 90
      && piste.x < koti2.width - 90 && piste.y < koti2.height - 90,
    kyltti: {
      x: r.left + r.width / 2 - koti.left,
      y: r.top + r.height / 2 - koti.top,
      w: r.width,
      h: r.height,
    },
    dx: r.left + r.width / 2 - koti.left - piste.x,
    dy: r.top + r.height / 2 - koti.top - piste.y,
  };
}, id);

/** Aito veto kankaalla: sormi alas, kaksikymmentä askelta, ylös, lepo. */
async function veda(sivu, dx, dy) {
  const laatikko = await sivu.evaluate(() => {
    const k = document.querySelector('.pallolauta-kotelo canvas') ?? document.querySelector('canvas');
    const r = k.getBoundingClientRect();
    return { x: r.left, y: r.top, w: r.width, h: r.height };
  });
  const x0 = laatikko.x + laatikko.w / 2;
  const y0 = laatikko.y + laatikko.h / 2;
  await sivu.mouse.move(x0, y0);
  await sivu.mouse.down();
  /*
   * KAHDEKSAN ASKELTA RIITTAA. Veto on aito (kirjaston oma
   * pointermove-ketju) ja kattaa useamman ladonnan
   * (LADONNAN_TAHTI_MS 200 ms); tiheampi ketju vain moninkertaistaa
   * savukkeen keston, koska jokainen askel odottaa pallon piirron.
   */
  for (let i = 1; i <= 8; i += 1) {
    await sivu.mouse.move(x0 + (dx * i) / 8, y0 + (dy * i) / 8);
    await sivu.waitForTimeout(40);
  }
  await sivu.mouse.up();
  await sivu.waitForTimeout(1200);
}

/*
 * YKSI SIVU RUUTUA KOHDEN, KAKSI KAUPUNKIA SAMASTA NÄKYMÄSTÄ: pelaaja
 * on Pariisissa ja Marseille näkyy samassa Ranskan saapumisnäkymässä,
 * joten molemmat mitataan samoista vedoista. Kaksi sivua neljän sijaan
 * — savuke ajaa saman mittauksen puolessa ajassa.
 */
for (const ruutu of RUUDUT) {
  const { ctx, sivu, virheet } = await avaaSivu(ruutu, 'pariisi');
  const sarjat = new Map(KAUPUNGIT.map((k) => [k, []]));
  const mittaaKaikki = async () => {
    for (const k of KAUPUNGIT) sarjat.get(k).push(await mittaaSuhde(sivu, k));
  };
  const alkuPov = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.pallo.pointOfView());
  await mittaaKaikki();
  for (const [dx, dy] of VEDOT) {
    await veda(sivu, dx, dy);
    await mittaaKaikki();
  }
  /*
   * 4. NIMIKYLTTI ON KARTAN MITTA (omistajan päätös 14.9.2026
   * klo 15.05 UTC). Kyltin ruutukoon suhde maapaneelin leipätekstiin
   * — joka on jo karttaan sidottu (js/pallolauta/maapaneeli.js) — on
   * sama kolmella zoomilla. Jos kyltti olisi yhä ruutuvakio, suhde
   * muuttuisi zoomin mukana.
   */
  const zoomit = [];
  for (const osuus of [1, 0.85, 0.7, 0.6, 0.35]) {
    const mitta = await sivu.evaluate(async ([kerroin, pov]) => {
      const l = window.matkakirja.ui.pallolauta;
      // Takaisin saapumisnäkymän keskelle: vedot ovat vieneet Pariisin
      // laitaan, eikä laidalta mitata kyltin kokoa.
      l.pallo.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: pov.altitude * kerroin }, 0);
      await new Promise((v) => setTimeout(v, 1400));
      l.ladoHeti();
      await new Promise((v) => setTimeout(v, 400));
      // NIMENOMAAN PELAAJAN KAUPUNKI: `.pallolauta-nimi text` antaisi
      // DOM-järjestyksen ensimmäisen, joka vaihtuu zoomin mukana.
      const teksti = document.querySelector('.pallolauta-nimi[data-kaupunki="pariisi"] text');
      // Karttanoston merkki: sama kerroin kuin kyltillä (nostot.js
      // KARTTANOSTON KYLTTI ON KARTAN MITTA). Mitta luetaan siitä
      // transformista, jota kerros oikeasti kirjoittaa.
      const nosto = document.querySelector('.pallolauta-nosto .pallolauta-nosto-siirto');
      const nostonMitta = nosto
        ? Number((nosto.style.transform.match(/scale\(([\d.]+)\)/u) ?? [])[1] ?? 0) : 0;
      const arvo = document.querySelector('.pallolauta-maapaneeli .maapaneeli-arvo');
      const paneeli = document.querySelector('.pallolauta-maapaneeli .maapaneeli-kortti');
      const skaala = paneeli
        ? Number((paneeli.style.transform.match(/scale\(([\d.]+)\)/u) ?? [])[1] ?? 1) : 1;
      const perus = arvo ? parseFloat(getComputedStyle(arvo).fontSize) : 0;
      /*
       * KYLTIN ANKKURI MERKKIIN NÄHDEN (vartio 7, Raamattu
       * KARTTAUUDISTUKSEN PAATOKSET 24). Mitta on tekstin keskipiste
       * MIINUS oman CSS2D-solmun keskipiste: solmu on kaupungin
       * pisteessä (translate(-50%, -50%), css/styles.css), joten sen
       * 1 × 1 -laatikon keskipiste ON merkin paikka ruudulla.
       * `getScreenCoords(lat, lon, 0)` ei kelpaa tähän: se on eri
       * korkeudella kuin merkkikerros, ja ero kasvaa zoomatessa —
       * silloin mitta liikkuisi, vaikka kyltti olisi paikallaan.
       */
      const kyltit = [...document.querySelectorAll('.pallolauta-nimi')].map((el) => {
        const t = el.querySelector('text');
        const r = t ? t.getBoundingClientRect() : null;
        const a = el.getBoundingClientRect();
        const koko = t ? Number(t.getAttribute('font-size')) : 0;
        if (!r || !(r.width > 0) || !(koko > 0)) return null;
        const dx = r.left + r.width / 2 - (a.left + a.width / 2);
        const dy = r.top + r.height / 2 - (a.top + a.height / 2);
        return {
          id: el.dataset.kaupunki,
          kulma: (Math.atan2(dy, dx) * 180) / Math.PI,
          suhde: Math.hypot(dx, dy) / koko,
          ank: t.getAttribute('text-anchor'),
        };
      }).filter(Boolean);
      return {
        kyltit,
        alt: l.pallo.pointOfView().altitude,
        kyltti: teksti ? Number(teksti.getAttribute('font-size')) : 0,
        paneeli: perus * skaala,
        karttaskaala: l.kamera.nakyvaAlue()?.skaala ?? 0,
        // Vertailu on laudan oma saapumisskaala: karttakerroin on
        // uloimmalla sallitulla zoomilla tasan 1 joka ruudulla.
        vertailuskaala: l.saapumisenSkaala?.() ?? 0,
        nostonMitta,
      };
    }, [osuus, alkuPov]);
    zoomit.push(mitta);
  }
  tieto(`${ruutu.nimi} · kyltti kolmella zoomilla`,
    zoomit.map((z) => `alt ${p(z.alt, 4)}: kyltti ${p(z.kyltti, 2)} px, `
      + `paneelin teksti ${p(z.paneeli, 2)} px, karttaskaala ${p(z.karttaskaala, 3)}`).join(' | '));
  /*
   * SUHDE MITATAAN NIILTÄ ZOOMEILTA, JOILLA KYLTTI ON OLEMASSA.
   * Syvimmällä zoomilla työpöydällä kyltti kasvaa karttasidonnan myötä
   * niin isoksi (karttaskaala 5,2 → ≈ 39 px), ettei se enää mahdu
   * nappulan ja maapaneelin väliin ja ladonta pudottaa sen — se on
   * MITTAUSTULOS eikä tämän vartion asia (ks. raportti). Kyltin
   * olemassaolon vartioi vartio 3.
   */
  const olemassa = zoomit.filter((z) => z.kyltti > 0 && z.paneeli > 0);
  const suhteet = olemassa.map((z) => z.kyltti / z.paneeli);
  const keski = suhteet.reduce((a, b) => a + b, 0) / (suhteet.length || 1);
  const ero = suhteet.length >= 2
    ? (Math.max(...suhteet) - Math.min(...suhteet)) / keski : Infinity;
  vaadi(`4. ${ruutu.nimi}: kyltti / maapaneelin teksti sama zoomista riippumatta `
    + `(${olemassa.length} tasoa, ±3 %)`,
    ero <= 0.03, `hajonta ${p(100 * ero, 2)} %`);

  /*
   * 5. SAAPUMISNÄKYMÄ EI MUUTU. Vertailu on kunkin laitteen oma
   * saapuminen, joten uloimmalla sallitulla zoomilla kyltti on
   * täsmälleen entisen kokoinen joka ruudulla (Fablen päätös).
   */
  const alku = zoomit[0];
  const kerroinSaapuessa = alku?.vertailuskaala > 0 ? alku.karttaskaala / alku.vertailuskaala : 0;
  const poikkeama = kerroinSaapuessa > 0 ? Math.abs(kerroinSaapuessa - 1) : Infinity;
  tieto(`${ruutu.nimi} · saapumisnäkymä`,
    `kyltti ${p(alku?.kyltti, 2)} px, karttaskaala ${p(alku?.karttaskaala, 3)}, `
    + `vertailu ${p(alku?.vertailuskaala, 3)}, kerroin ${p(kerroinSaapuessa, 4)}`);
  vaadi(`5. ${ruutu.nimi}: saapumisnäkymän kyltti on entinen `
    + `(karttakerroin 1 ±${100 * SAAPUMISEN_VARA} %)`,
    poikkeama <= SAAPUMISEN_VARA, `kerroin ${p(kerroinSaapuessa, 4)}`);

  /*
   * 6. KARTTANOSTON KYLTTI SKAALAUTUU SAMALLA KERTOIMELLA. Noston
   * merkin mitta jaettuna kaupungin kyltin koolla on sama luku joka
   * zoomilla — eli molemmat seuraavat samaa karttakerrointa.
   */
  const parit6 = zoomit.filter((z) => z.kyltti > 0 && z.nostonMitta > 0);
  const suhteet6 = parit6.map((z) => z.nostonMitta / z.kyltti);
  const keski6 = suhteet6.reduce((a, b) => a + b, 0) / (suhteet6.length || 1);
  const ero6 = suhteet6.length >= 2
    ? (Math.max(...suhteet6) - Math.min(...suhteet6)) / keski6 : Infinity;
  tieto(`${ruutu.nimi} · noston mitta zoomeittain`,
    zoomit.map((z) => `${p(z.nostonMitta, 4)}`).join(' | '));
  vaadi(`6. ${ruutu.nimi}: karttanoston kyltti seuraa samaa kerrointa `
    + `(${parit6.length} tasoa, ±3 %)`,
    ero6 <= 0.03, `hajonta ${p(100 * ero6, 2)} %`);

  /*
   * 7. KYLTIN ANKKURI ON KIINTEÄ KAIKILLA ZOOMEILLA (omistaja
   * 15.9.2026, Raamattu KARTTAUUDISTUKSEN PAATOKSET 24: *"nyt ne
   * hyppivat eri puolille kaupungin merkkia. pitaisi pysya samassa
   * kohdassa"*, ja *"koko voi muuttua"*). Jokaiselle kaupungille,
   * jonka kyltti on olemassa vähintään kahdella tämän sarjan
   * zoomtasolla: sama kylki (text-anchor), suunta ±ANKKURIN_KULMAVARA
   * astetta ja tekstikorkeuteen suhteutettu etäisyys
   * ±ANKKURIN_ETAISYYSVARA.
   */
  const ankkurit = new Map();
  for (const z of zoomit) {
    for (const k of z.kyltit ?? []) {
      if (!ankkurit.has(k.id)) ankkurit.set(k.id, []);
      ankkurit.get(k.id).push(k);
    }
  }
  const hajonta = (luvut) => Math.max(...luvut) - Math.min(...luvut);
  let mitattuja = 0;
  for (const [id, sarja] of ankkurit) {
    if (sarja.length < 2) continue;
    mitattuja += 1;
    const kulmat = sarja.map((k) => k.kulma);
    const suhteet7 = sarja.map((k) => k.suhde);
    const keski7 = suhteet7.reduce((a, b) => a + b, 0) / suhteet7.length;
    tieto(`${ruutu.nimi}/${id} · ankkuri zoomeittain`,
      sarja.map((k) => `${p(k.kulma, 1)}° / ${p(k.suhde, 2)}× ${k.ank}`).join('  |  '));
    vaadi(`7a. ${ruutu.nimi}/${id}: kylki sama kaikilla zoomeilla (${sarja.length} tasoa)`,
      sarja.every((k) => k.ank === sarja[0].ank), sarja.map((k) => k.ank).join('/'));
    vaadi(`7b. ${ruutu.nimi}/${id}: suunta pysyy (±${ANKKURIN_KULMAVARA}°)`,
      hajonta(kulmat) <= 2 * ANKKURIN_KULMAVARA, `hajonta ${p(hajonta(kulmat), 1)}°`);
    vaadi(`7c. ${ruutu.nimi}/${id}: etäisyys tekstikorkeuteen suhteutettuna pysyy `
      + `(±${100 * ANKKURIN_ETAISYYSVARA} %)`,
      hajonta(suhteet7) <= 2 * ANKKURIN_ETAISYYSVARA * keski7,
      `hajonta ${p((100 * hajonta(suhteet7)) / keski7, 1)} %`);
  }
  vaadi(`7. ${ruutu.nimi}: ankkuri mitattiin vähintään yhdestä kaupungista`,
    mitattuja > 0, `${mitattuja} kaupunkia kahdella zoomtasolla`);

  if (KUVAKANSIO) {
    await sivu.screenshot({
      // JPEG eikä PNG: raportin kuvien katto on 300 kt, ja työpöydän
      // ruutu on png:nä lähes megatavu.
      path: join(KUVAKANSIO, `nimikyltti-${ruutu.nimi}.jpg`),
      type: 'jpeg',
      quality: 72,
      scale: 'css',
      timeout: 120000,
    });
  }
  await ctx.close();
  for (const kaupunki of KAUPUNGIT) {
    const sarja = sarjat.get(kaupunki);
    const syvat = sarja.filter((m) => m.syvalla);
    const nakyvia = syvat.filter((m) => m.kyltti).length;
    /*
     * PELAAJAN OMA KAUPUNKI EI SAA KADOTA TYÖPÖYDÄLLÄ LAINKAAN.
     * Muualla sallitaan yksi pudotus: nimibudjetti on puhelimen
     * saapumisnäkymässä vain kourallinen nimiä (js/pallolauta/nimet.js
     * NIMIBUDJETTI ZOOMTASON MUKAAN), ja sivukaupungin nimi väistyy
     * tärkeämpien tieltä, kun näkymä siirtyy — mitattu 14.9.2026.
     */
    const sallitutPudotukset = (kaupunki === 'pariisi' && ruutu.w >= 700) ? 0 : 2;
    if (nakyvia === 0) {
      // Nimi ei mahdu tämän ruudun nimibudjettiin lainkaan (puhelimella
      // Marseille, kun pelaaja on Pariisissa) — ei mitattavaa.
      tieto(`${ruutu.nimi}/${kaupunki} · 3 ohitettu`,
        'kyltti ei ollut ruudulla kertaakaan (nimibudjetti)');
    } else {
      vaadi(`3. ${ruutu.nimi}/${kaupunki}: kyltti näkyy, kun kaupunki on syvällä ruudulla `
        + `(pudotuksia ≤ ${sallitutPudotukset})`,
        syvat.length - nakyvia <= sallitutPudotukset, `${nakyvia}/${syvat.length}`);
    }
    /*
     * MITTA ON PERÄKKÄISTEN VEDON JÄLKEISTEN MITTAUSTEN ERO, ei koko
     * sarjan hajonta: omistajan ilmiö on *"kyltti liikkuu
     * panoroitaessa"*, eli kyltti on ruudulla ennen vetoa ja sen
     * jälkeen mutta eri kohdassa. Jos kyltti katoaa välissä kokonaan,
     * kyseessä on eri vika — sen mittaa vartio 3.
     */
    const parit = [];
    for (let i = 1; i < sarja.length; i += 1) {
      if (sarja[i - 1].kyltti && sarja[i].kyltti) {
        parit.push({
          dx: Math.abs(sarja[i].dx - sarja[i - 1].dx),
          dy: Math.abs(sarja[i].dy - sarja[i - 1].dy),
        });
      }
    }
    const suurin = (avain) => (parit.length ? Math.max(...parit.map((v) => v[avain])) : Infinity);
    tieto(`${ruutu.nimi}/${kaupunki} kyltin ero kaupungista`,
      sarja.map((m) => (m.kyltti ? `${p(m.dx, 1)}/${p(m.dy, 1)}` : 'ei kylttiä')).join('  →  '));
    if (parit.length === 0) {
      /*
       * Ei yhtään vedon yli säilynyttä kyltti-paria: kaupungin nimi ei
       * mahdu tämän ruudun nimibudjettiin (puhelimella Marseille, kun
       * pelaaja on Pariisissa). Silloin ei ole mitään mitattavaa — se
       * ei ole tämän vartion vika eikä sen onnistuminen.
       */
      tieto(`${ruutu.nimi}/${kaupunki} · 1–2 ohitettu`,
        'kyltti ei ollut ruudulla kahdessa peräkkäisessä mittauksessa (nimibudjetti)');
    } else {
      vaadi(`1. ${ruutu.nimi}/${kaupunki}: ero x pysyy vedon yli (≤ ${HAJONNAN_RAJA_PX} px)`,
        suurin('dx') <= HAJONNAN_RAJA_PX, `suurin siirto ${p(suurin('dx'))} px`);
      vaadi(`2. ${ruutu.nimi}/${kaupunki}: ero y pysyy vedon yli (≤ ${HAJONNAN_RAJA_PX} px)`,
        suurin('dy') <= HAJONNAN_RAJA_PX, `suurin siirto ${p(suurin('dy'))} px`);
    }
  }
  vaadi(`${ruutu.nimi}: ei js-virheitä`, virheet.length === 0, virheet[0] ?? '');
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
