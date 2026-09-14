/*
 * Savuke: OSUMAREITITYS — VIHJEPISTE EI OLE KAUPUNGIN MERKIN ALLA.
 *
 * Rootin havainto 13.9.2026: kaupungin vihjepiste (kohtaamispiste) jää
 * kaupungin merkin alle, ja keskustanapautus avaa kaupungin tietoruudun
 * vihjeen sijaan. Mitattu juurisyy (ks. js/fokuspiste.js
 * fokuspisteenAsteet): sivusiirto laskettiin LAUDAN YKSIKÖISSÄ, mutta
 * pallolla kaupungin merkki ei ole laudan kohdassaan vaan omassa
 * pallopisteessään — Budapestin 32,45 laudan yksikköä olivat ruudulla
 * 0,2 px.
 *
 * MIKSI SAVUKE EIKÄ PELKKÄ YKSIKKÖTESTI. Yksikkötesti
 * (tests/osumareititys.test.mjs) mittaa SÄÄNNÖN kameran kaavoista;
 * vasta selain kertoo, mitä oikea projektio, oikea ladonta ja oikea
 * sormi tekevät. Napautukset ovat aitoja: sormi osuu kankaaseen siinä
 * ruutupisteessä, johon merkki projisoituu (pallo.getScreenCoords),
 * eikä savuke kutsu avaajia suoraan.
 *
 * ── VARTIOT (kummallekin kaupungille, KAHDELLA ZOOMILLA) ──────────
 *
 *   1. PISTE ON KARTALLA ja auki (kaksi ratkaistua nostotehtävää).
 *   2. PISTE EROTTUU KAUPUNGIN MERKISTÄ: ruutuero ≥ VAHIN_ERO_PX.
 *   3. PISTEEN NAPAUTUS AVAA VIHJEEN eikä kaupungin tietoruutua.
 *   4. KAUPUNGIN NAPAUTUS AVAA YHÄ KAUPUNGIN TIETORUUDUN (vastavartio:
 *      piste ei saa niellä kaupungin napautusta).
 *
 * KAKSI ZOOMIA: saapumisnäkymä (l.saavu — se näkymä, johon pelaaja
 * kaupunkiin saapuu) ja lähikuva (saapumiskorkeus / 4).
 *
 * KAKSI KAUPUNKIA: Budapest on rootin ilmoittama vika (piste oli
 * 0,2 px kaupungista) ja Ateena omistajan 6.9.2026 hienosäädön kohde
 * (piste oli jo erillään) — korjaus ei saa rikkoa jälkimmäistä.
 *
 * VASTAKOE (pakollinen, ajetaan käsin ja kirjataan raporttiin):
 * palauta js/pallolauta/nostot.js:n rivi muotoon
 *   const siirto = fokuspisteenSiirto(city, piste);
 *   const a = asteet({ x: piste.x + siirto.x, y: piste.y + siirto.y });
 * → Budapestin vartiot 2 ja 3 punaisiksi molemmilla zoomeilla.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 *
 * Aja: NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *      node tools/savukkeet/savuke-osumareititys.mjs [kuvakansio]
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

/** Mitatut kaupungit: vika (Budapest) ja hienosäädetty (Ateena). */
const KAUPUNGIT = [
  { id: 'budapest', nimi: 'Budapest' },
  { id: 'ateena', nimi: 'Ateena' },
];
/**
 * VÄHIN RUUTUERO. Omistaja hyväksyi 6.9.2026 Ateenan eron, ja uusi
 * sääntö antaa saman eron jokaiselle kaupungille joka leveysasteella.
 * Selaimesta mitattuna (390 × 844, dpr 2) se on saapumisnäkymässä
 * 16–21 px kaupungin oman laatikon koon mukaan ja lähikuvassa
 * nelinkertainen. Vartija on mitatun alapuolella, jotta se kertoo
 * säännöstä eikä pyöristyksestä.
 */
const VAHIN_ERO_PX = 14;
/** Kynnys, jolla piste on auki (js/fokusvirta.js NOSTOTEHTAVIA_AARREPISTEESEEN). */
const RATKAISTUJA = 2;

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

/**
 * Tallenne: Fogg kaupungissa, kaksi nostotehtävää ratkaistuna (piste
 * auki) ja laatta paikallaan (aarre yhä löytämättä — juuri silloin
 * pisteen kuuluu olla kartalla).
 */
function tallenne(cityId) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: cityId }],
    pack: packById('maailmankartta'),
    seed: 5,
  });
  peli.phase = 'action';
  peli.nostotehtavatRatkaistu = RATKAISTUJA;
  peli.aarrepisteOhjeNahty = true;
  peli.polloLoydetty = true;
  return JSON.stringify(peli.toJSON());
}

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/** Yksi selainkonteksti valmiiksi ladattuna kaupungin palloon. */
async function avaaPeli(cityId) {
  const ctx = await selain.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, serviceWorkers: 'block',
  });
  await ctx.addInitScript((d) => {
    try {
      localStorage.setItem('matkakirja-save-v1', d);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne(cityId));
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
  if (auki) await sivu.waitForTimeout(3500);
  return { ctx, sivu, auki, virheet };
}

/**
 * SAAPUMISEN KERROKSET POIS KAAPPAUKSELTA JA SORMELTA. Traileri
 * (`.saapumistraileri`, z 90) ja isokuva (`.fokusvirta-isokuva`)
 * peittävät kartan; sama tapa kuin savuke-aarrepiste.mjs:ssä. Poisto
 * koskee VAIN savukkeen esitystä — vartiot lukevat merkkien
 * ruutupisteet kirjastosta, eivät kuvasta.
 */
const paljastaKartta = (sivu) => sivu.evaluate(async () => {
  if (!document.getElementById('savuke-piilota-saapuminen')) {
    const tyyli = document.createElement('style');
    tyyli.id = 'savuke-piilota-saapuminen';
    tyyli.textContent = '.saapumistraileri, .fokusvirta-isokuva { display: none !important; }';
    document.head.appendChild(tyyli);
  }
  for (const d of document.querySelectorAll('dialog[open]')) d.close?.();
  for (const k of document.querySelectorAll('.pollo-vihje')) k.remove();
  await new Promise((v) => setTimeout(v, 600));
});

/**
 * NÄKYMÄ NOLLATAAN JOKA MITTAUKSEEN. Kaupungin napautus ajaa kameran
 * kaupungin ylle (js/pallolauta/lauta.js napautaKaupunki), joten
 * mittausten välissä kamera on aina eri paikassa kuin luulisi —
 * mitattu 14.9.2026: pelkkä `pointOfView` napautuksen jälkeen jäi
 * käynnissä olevan kamera-ajon alle eikä muuttunut lainkaan.
 *
 * Saapumisajo (l.saavu) on se näkymä, johon pelaaja kaupunkiin saapuu;
 * `kerroin` vie siitä syvemmälle (1 = saapuminen, 0,25 = lähikuva).
 *
 * @returns {number} kameran korkeus mittaushetkellä
 */
const asetaNakyma = (sivu, kerroin) => sivu.evaluate(async (k) => {
  const l = window.matkakirja.ui.pallolauta;
  await l.saavu({ kesto: 0 });
  await new Promise((v) => setTimeout(v, 1500));
  if (k !== 1) {
    const alt = l.pallo.pointOfView().altitude;
    l.pallo.pointOfView({ altitude: alt * k }, 0);
    await new Promise((v) => setTimeout(v, 1400));
  }
  l.ladoHeti();
  await new Promise((v) => setTimeout(v, 500));
  return l.pallo.pointOfView().altitude;
}, kerroin);

/**
 * Kaupunkipisteen ja kohtaamispisteen ruutupisteet SAMASTA HETKESTÄ.
 * Molemmat luetaan siitä lähteestä, jota osumatesti itse lukee
 * (js/pallolauta/lauta.js lahinMerkki: `kaupungit` ja `nostot.osumat()`).
 */
const mittaa = (sivu, cityId) => sivu.evaluate((id) => {
  const l = window.matkakirja.ui.pallolauta;
  const r = l.kotelo.getBoundingClientRect();
  const ruudulle = (lat, lng) => {
    const p = l.pallo.getScreenCoords(lat, lng, 0);
    return p ? { x: r.left + p.x, y: r.top + p.y } : null;
  };
  const k = l.kaupunki(id);
  const d = l.nostot.osumat().find((o) => o.perhe === 'piste');
  const kaupunki = k ? ruudulle(k.lat, k.lon) : null;
  const piste = d ? ruudulle(d.lat, d.lng) : null;
  return {
    kaupunki,
    piste,
    pisteNimi: d?.nimi ?? null,
    lukittu: d?.lukittu ?? null,
    merkkiDomissa: Boolean(document.querySelector('.pallolauta-piste')),
    ero: kaupunki && piste ? Math.hypot(piste.x - kaupunki.x, piste.y - kaupunki.y) : null,
  };
}, cityId);

/**
 * Mitä ruudulla on auki napautuksen jälkeen.
 *
 * PINTAA ODOTETAAN, EI ARVATA. Napautus kulkee `ui.doAction`in läpi
 * (js/fokusvirta.js avaaFokusKohtaaminen), joten visalaatikko aukeaa
 * vasta muutaman mikrotehtävän päästä — kuormitetulla koneella se on
 * mitattu yli sekunnin. Kiinteä odotus teki vartiosta 3 satunnaisen;
 * nyt kysytään kunnes jokin pinta on auki tai aika loppuu.
 */
const avoinPinta = (sivu, odota = 8000) => sivu.evaluate(async (ms) => {
  const lue = () => ({
    kaupunkipopup: Boolean(document.querySelector('.kaupunkipopup-kaupunki')),
    turistiinfo: Boolean(document.querySelector('.kaupunkipopup-info')),
    visa: Boolean(document.getElementById('quiz-dialog')?.open),
    kohtaaminen: Boolean(document.querySelector('.fokusvirta-kortti, .fokuskohde-popup')),
    kupla: ([...document.querySelectorAll('.pollo-vihje')]
      .find((k) => !k.hidden && (k.textContent ?? '').trim())?.textContent ?? '').trim(),
  });
  const loppu = Date.now() + ms;
  let tila = lue();
  while (Date.now() < loppu
    && !(tila.kaupunkipopup || tila.turistiinfo || tila.visa || tila.kohtaaminen)) {
    await new Promise((v) => setTimeout(v, 250));
    tila = lue();
  }
  return tila;
}, odota);

/** Sulje kaikki auki oleva pinta, jotta seuraava napautus on puhdas. */
const sulje = (sivu) => sivu.evaluate(async () => {
  for (const d of document.querySelectorAll('dialog[open]')) d.close?.();
  for (const p of document.querySelectorAll('.kaupunkipopup-kaupunki, .kaupunkipopup-info, '
    + '.fokusvirta-kortti, .fokuskohde-popup')) p.remove();
  await new Promise((v) => setTimeout(v, 400));
});

for (const kaupunki of KAUPUNGIT) {
  const { ctx, sivu, auki, virheet } = await avaaPeli(kaupunki.id);
  vaadi(`${kaupunki.nimi}: pallolauta aukesi`, auki, virheet.join(' | '));
  if (!auki) { await ctx.close(); continue; }
  await paljastaKartta(sivu);

  /** Kaksi zoomia: saapumisnäkymä ja neljäsosa siitä (lähikuva). */
  const ZOOMIT = [
    { nimi: 'saapuminen', kerroin: 1 },
    { nimi: 'lahi', kerroin: 0.25 },
  ];

  for (const zoomi of ZOOMIT) {
    const tunnus = `${kaupunki.nimi} @ ${zoomi.nimi}`;
    const korkeus = await asetaNakyma(sivu, zoomi.kerroin);
    await paljastaKartta(sivu);
    const m = await mittaa(sivu, kaupunki.id);
    tieto(`${tunnus}: kamerakorkeus`, korkeus?.toFixed?.(4) ?? korkeus);
    tieto(`${tunnus}: kohtaamispiste`, `${m.pisteNimi} (lukittu ${m.lukittu})`);
    tieto(`${tunnus}: ruutuero kaupunkipisteestä`,
      m.ero === null ? 'ei mitattavissa' : `${m.ero.toFixed(1)} px`);

    /* --- vartio 1: piste on kartalla ja auki --------------------------- */
    vaadi(`${tunnus}: 1. kohtaamispiste on kartalla ja auki`,
      Boolean(m.piste) && m.lukittu === false && m.merkkiDomissa,
      JSON.stringify({ piste: m.piste, lukittu: m.lukittu, dom: m.merkkiDomissa }));

    /* --- vartio 2: piste erottuu kaupungin merkistä -------------------- */
    vaadi(`${tunnus}: 2. piste erottuu kaupungin merkistä (≥ ${VAHIN_ERO_PX} px)`,
      Number.isFinite(m.ero) && m.ero >= VAHIN_ERO_PX,
      m.ero === null ? 'ei mitattavissa' : `${m.ero.toFixed(1)} px`);

    /* --- kaappaus omistajan silmäystä varten --------------------------- */
    if (KUVAKANSIO && m.piste && m.kaupunki) {
      const leveys = 320;
      const korkeusPx = 240;
      const kx = (m.piste.x + m.kaupunki.x) / 2;
      const ky = (m.piste.y + m.kaupunki.y) / 2;
      await sivu.screenshot({
        path: join(KUVAKANSIO, `osuma-${kaupunki.id}-${zoomi.nimi}.png`),
        clip: {
          x: Math.max(0, Math.min(390 - leveys, kx - leveys / 2)),
          y: Math.max(0, Math.min(844 - korkeusPx, ky - korkeusPx / 2)),
          width: leveys,
          height: korkeusPx,
        },
      });
    }

    /* --- vartio 3: pisteen napautus avaa vihjeen ----------------------- */
    if (m.piste) {
      await sulje(sivu);
      await sivu.mouse.click(m.piste.x, m.piste.y);
      const pinta = await avoinPinta(sivu);
      tieto(`${tunnus}: pisteen napautus`, JSON.stringify(pinta));
      vaadi(`${tunnus}: 3. pisteen napautus avaa vihjeen, EI kaupungin tietoruutua`,
        (pinta.visa || pinta.kohtaaminen) && !pinta.kaupunkipopup,
        JSON.stringify(pinta));
      await sulje(sivu);
    }

    /* --- vartio 4 (vastavartio): kaupungin napautus avaa kaupungin -----
     * Näkymä nollataan ensin: edellinen napautus on voinut ajaa kameraa,
     * eikä vanha ruutupiste osoittaisi enää mihinkään.
     */
    await asetaNakyma(sivu, zoomi.kerroin);
    await paljastaKartta(sivu);
    const tuore = await mittaa(sivu, kaupunki.id);
    if (tuore.kaupunki) {
      await sivu.mouse.click(tuore.kaupunki.x, tuore.kaupunki.y);
      const pinta = await avoinPinta(sivu);
      tieto(`${tunnus}: kaupungin napautus`, JSON.stringify(pinta));
      vaadi(`${tunnus}: 4. kaupungin napautus avaa yhä kaupungin tietoruudun`,
        pinta.kaupunkipopup && !pinta.visa,
        JSON.stringify(pinta));
      await sulje(sivu);
    }
  }
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
