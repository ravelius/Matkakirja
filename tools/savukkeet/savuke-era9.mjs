/*
 * Savuke: KARTTAUUDISTUKSEN ERÄ 9 — MAAPANEELIN KOKO, PANOROINNIN
 * RAJAUS JA "ETSI AARRE" -NAPIN POISTO.
 *
 * === MITÄ TÄMÄ VARTIOI =============================================
 *
 * Omistajan pilottipalaute 13.9.2026 klo 17.50 UTC (kuvakaappaus
 * Ranskasta puhelimella, sanatarkasti): *"Vaihda maa juttu samaan kuin
 * mitä se on ollut tähän asti. Ainoa ero, että se on kiinteästi
 * paikallaan. Pitää olla paljon pienempi koko. Ja rajaa liikkuminen
 * pienemmälle alalla. Ota Etsi aarre nappi pois."*
 *
 * Väitteet:
 *
 *   1. PANEELI ON PIENI JA KOKONAAN RUUDULLA. 390 px:n ruudulla
 *      uloimmalla SALLITULLA zoomilla kortin leveys on enintään
 *      KOKO_KATTO css-pikseliä (erässä 3 se oli 233 px) ja koko kortti
 *      on karttaruudun sisällä. Sama mitataan 1400 px:n ruudulla.
 *   2. PANOROINTI ON RAJATTU. Ohjelmallinen veto ~2000 px
 *      pituusasteen suuntaan EI vie kameran keskipistettä maan
 *      laatikko × 1,3 -alan ulkopuolelle.
 *   3. "ETSI AARRE" -NAPPIA EI OLE. Ranskassa DOM:issa ei ole
 *      `.etsi-aarre-ankkuri`- eikä `.etsi-aarre-nappi`-solmua
 *      missään vaiheessa saapumista.
 *
 * === VASTAKOKEET (pakolliset) ======================================
 *
 *   A. PANOROINNIN RAJAUS RIISUTAAN (`ui.pallonPanorajaus = null`,
 *      eli täsmälleen se kahva, jonka lauta asentaa). Sama veto vie
 *      keskipisteen ulos alalta — VÄITTEEN 2 ON KAADUTTAVA. Jos se
 *      menee läpi ilman rajausta, veto ei mittaa mitään.
 *   B. KOON MUUTOS RIISUTAAN. Palvelin tarjoilee
 *      js/pallolauta/maapaneeli.js:n erän 3 mitoilla (peruskoko
 *      300 × 96, leveysosuus 1 = koko laatikon levyinen). VÄITTEEN 1
 *      KOKOVÄITTEEN ON KAADUTTAVA.
 *
 * === ULOIN ZOOMI ON MITATTAVA, EI ARVATTAVA ========================
 *
 * Saapumisajo päätyy eri korkeuksiin eri ajoilla (mitattu 13.9.2026:
 * Ranska 390 px:n ruudulla altitude 0,4465 tai 0,6268 samalla
 * koodilla — kirjattu erän 9 raporttiin avoimena asiana). Mitta
 * otetaan siksi siitä, mikä on yksikäsitteinen: ULOIN ZOOMI, JONNE
 * PELAAJA PÄÄSEE, eli OrbitControlsin `maxDistance` (erän 2
 * uloszoomauksen esto). Se on myös se näkymä, jossa paneeli on
 * pienimmillään ja panorointivara suurimmillaan.
 *
 * === VERKKO ========================================================
 *
 * Pallo tarvitsee Globe.gl:n ämpäristä. Jos ämpäri ei vastaa, savuke
 * ohitetaan (sama sääntö kuin muilla pallosavukkeilla).
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/**
 * Kortin sallittu leveys ULOIMMALLA SALLITULLA ZOOMILLA. Katto on
 * VÄITE, ei mitoitus, ja se on valittu niin, että se EROTTAA erän 9
 * mitat erän 3 mitoista samalla mittauspisteellä (mitattu 13.9.2026):
 *
 *              390 px      1400 px
 *   erä 9      114 px      223 px
 *   erä 3      187 px      (vastakoe ajetaan 390 px:llä)
 *
 * Tehtävänannon 150–200 css-px koskee SAAPUMISNÄKYMÄÄ (siinä mitta on
 * 167 px); uloin sallittu zoomi on sitä ulompana, joten sen katto on
 * tiukempi. Ks. erän 9 raportin luvut 2.3 ja 2.4.
 */
const KOKO_KATTO = { 390: 150, 1400: 280 };

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.woff2': 'font/woff2',
};

/*
 * VASTAKOE B:n kytkin palvelimessa: maapaneelin mitat erän 3 arvoihin.
 * Muutos tehdään TARJOILTAVAAN TEKSTIIN, joten peli ajaa oikeasti
 * vanhoilla mitoilla — ei piilotettua koetta.
 */
let eranKolmenMitat = false;
const palvelin = http.createServer((req, res) => {
  const polkuOsa = req.url.split('?')[0];
  const polku = join(JUURI, polkuOsa === '/' ? 'index.html' : polkuOsa);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  let runko = readFileSync(polku);
  if (eranKolmenMitat && polkuOsa.endsWith('/js/pallolauta/maapaneeli.js')) {
    runko = Buffer.from(runko.toString('utf8')
      .replace(/MAAPANEELIN_LEVEYS_PX = \d+/, 'MAAPANEELIN_LEVEYS_PX = 300')
      .replace(/MAAPANEELIN_KORKEUS_PX = \d+/, 'MAAPANEELIN_KORKEUS_PX = 96')
      .replace(/MAAPANEELIN_LEVEYS_OSUUS = [\d.]+/, 'MAAPANEELIN_LEVEYS_OSUUS = 1')
      .replace(/MAAPANEELIN_KORKEUS_OSUUS = [\d.]+/, 'MAAPANEELIN_KORKEUS_OSUUS = 0.35'));
  }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(runko);
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

/* Tallenne: Fogg Pariisissa — pilottimaa on Ranska. */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('pariisi');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/** Yksi ajo: konteksti, peli Pariisissa, pallolauta uloimmalla zoomilla. */
async function avaaPeli({ leveys, korkeus }) {
  const ctx = await selain.newContext({
    viewport: { width: leveys, height: korkeus }, deviceScaleFactor: 1, serviceWorkers: 'block',
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
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
  const auki = await sivu
    .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  if (auki) {
    await sivu.waitForTimeout(4000);
    // Saapumisajo laudan omalla kutsulla (sama laatikko ja marginaali
    // kuin kaupunkiin saavuttaessa), sitten lepo: saapumisketju ajaa
    // kameraa vielä sekunteja kutsun jälkeen.
    await sivu.evaluate(async () => {
      const l = window.matkakirja.ui.pallolauta;
      await l.saavu({ kesto: 0 });
    });
    await sivu.waitForTimeout(6000);
    // ULOIN SALLITTU ZOOMI (ks. tiedoston alku).
    await sivu.evaluate(async () => {
      const l = window.matkakirja.ui.pallolauta;
      const sade = l.pallo.getGlobeRadius();
      const pov = l.pallo.pointOfView();
      l.pallo.pointOfView(
        { lat: pov.lat, lng: pov.lng, altitude: l.pallo.controls().maxDistance / sade - 1 }, 0,
      );
      await new Promise((v) => setTimeout(v, 1200));
      l.ladoHeti();
      await new Promise((v) => setTimeout(v, 400));
    });
  }
  return { ctx, sivu, virheet, auki };
}

/** Kortin ruutulaatikko, karttaruutu ja maan laatikko samassa mitassa. */
const mittaaPaneeli = (sivu) => sivu.evaluate(() => {
  const l = window.matkakirja.ui.pallolauta;
  const kortti = document.querySelector('.maapaneeli-kortti');
  const datum = l.pallo.htmlElementsData().find((d) => d.laji === 'maapaneeli') ?? null;
  const r = kortti?.getBoundingClientRect() ?? null;
  const kotelo = l.kotelo.getBoundingClientRect();
  const sisus = document.querySelector('.maapaneeli-sisus');
  return {
    onKortti: Boolean(kortti),
    kortti: r ? { x0: r.left, y0: r.top, x1: r.right, y1: r.bottom, w: r.width, h: r.height } : null,
    kotelo: { x0: kotelo.left, y0: kotelo.top, x1: kotelo.right, y1: kotelo.bottom },
    laatikko: datum?.laatikko ?? null,
    skaala: datum?.skaala ?? null,
    korkeus: l.pallo.pointOfView()?.altitude ?? null,
    // Sisältö ei saa jäädä kortin alle leikkautuneeksi.
    ylivuoto: sisus ? sisus.scrollHeight - sisus.clientHeight : null,
    // Väite 3: napin solmuja ei ole missään.
    aarrenappeja: document.querySelectorAll('.etsi-aarre-ankkuri, .etsi-aarre-nappi').length,
  };
});

/**
 * Kameran keskipiste ja panoroinnin sallitut pituusasterajat.
 *
 * Rajat lasketaan MAAN LAATIKOSTA samalla kaavalla kuin lauta
 * (laatikko × 1,3 keskipisteen ympäri). Paneeli laajentaa laatikkoa
 * vain alaspäin eikä sivuille (paneeli on laatikkoa kapeampi), joten
 * pituusasteen rajat ovat maan laatikon rajat — ne saa laskea tästä
 * datumista eikä laudan yksityisestä muuttujasta.
 */
const mittaaKamera = (sivu) => sivu.evaluate(() => {
  const l = window.matkakirja.ui.pallolauta;
  const datum = l.pallo.htmlElementsData().find((d) => d.laji === 'maapaneeli') ?? null;
  const b = datum?.laatikko ?? null;
  const tila = l.kamera.kameranTila();
  let rajat = null;
  if (b) {
    const kx = b.x + b.w / 2;
    const ky = b.y + b.h / 2;
    const a = l.asteet({ x: kx - 0.65 * b.w, y: ky });
    const c = l.asteet({ x: kx + 0.65 * b.w, y: ky });
    if (a && c) {
      const a1 = a.lon ?? a.lng;
      const c1 = c.lon ?? c.lng;
      rajat = { lngMin: Math.min(a1, c1), lngMax: Math.max(a1, c1) };
    }
  }
  return { lat: tila?.lat ?? null, lng: tila?.lng ?? null, x: tila?.x ?? null, rajat };
});

/**
 * Ohjelmallinen veto: sormi karttaruudun oikeasta laidasta vasempaan,
 * `kierroksia` kertaa. Yhteispituus on kierrokset × matka pikseleinä.
 *
 * SORMI PYSÄHTYY ENNEN IRROTUSTA (200 ms), jolloin peli ei lähetä
 * liukua (js/pallo.js paasta: `seisahtunut`). Näin mitattu siirtymä on
 * VEDON siirtymä eikä liu'un — vastakoe ja koe ovat vertailukelpoisia.
 */
async function veda(sivu, { kierroksia, kotelo }) {
  const y = Math.round((kotelo.y0 + kotelo.y1) / 2);
  const x0 = Math.round(kotelo.x1 - 24);
  const x1 = Math.round(kotelo.x0 + 24);
  for (let i = 0; i < kierroksia; i += 1) {
    /* eslint-disable no-await-in-loop */
    await sivu.mouse.move(x0, y);
    await sivu.mouse.down();
    for (let a = 1; a <= 12; a += 1) {
      await sivu.mouse.move(x0 + ((x1 - x0) * a) / 12, y);
      await sivu.waitForTimeout(16);
    }
    await sivu.waitForTimeout(220);
    await sivu.mouse.up();
    await sivu.waitForTimeout(120);
    /* eslint-enable no-await-in-loop */
  }
  return (x0 - x1) * kierroksia;
}

/* ==================== PÄÄAJO: 390 px ja 1400 px ==================== */

const RUUDUT = [
  { nimi: '390', leveys: 390, korkeus: 844 },
  { nimi: '1400', leveys: 1400, korkeus: 900 },
];

const kokoTulokset = [];
const panoTulokset = [];
let aarrenappeja = 0;
let paaVirheet = [];

for (const ruutu of RUUDUT) {
  // eslint-disable-next-line no-await-in-loop
  const { ctx, sivu, virheet, auki } = await avaaPeli(ruutu);
  vaadi(`pallolauta aukesi (${ruutu.nimi} px)`, auki, virheet.join(' | '));
  if (!auki) { /* eslint-disable-next-line no-await-in-loop */ await ctx.close(); continue; }

  /* --- 1. koko ja täysi näkyvyys --------------------------------- */
  // eslint-disable-next-line no-await-in-loop
  const m = await mittaaPaneeli(sivu);
  const katto = KOKO_KATTO[ruutu.leveys];
  const ruudulla = Boolean(m.kortti
    && m.kortti.x0 >= m.kotelo.x0 - 1 && m.kortti.x1 <= m.kotelo.x1 + 1
    && m.kortti.y0 >= m.kotelo.y0 - 1 && m.kortti.y1 <= m.kotelo.y1 + 1);
  kokoTulokset.push({
    ruutu: ruutu.nimi,
    w: m.kortti ? Math.round(m.kortti.w) : null,
    h: m.kortti ? Math.round(m.kortti.h) : null,
    katto,
    mahtuu: Boolean(m.kortti && m.kortti.w <= katto),
    ruudulla,
    ylivuoto: m.ylivuoto,
  });
  aarrenappeja += m.aarrenappeja;
  tieto(`${ruutu.nimi} px · uloin sallittu zoomi`,
    `kortti ${m.kortti ? `${Math.round(m.kortti.w)} x ${Math.round(m.kortti.h)} px` : 'EI OLE'} `
    + `(${m.kortti ? Math.round((100 * m.kortti.w) / ruutu.leveys) : '—'} % ruudun leveydestä), `
    + `x ${m.kortti ? `${Math.round(m.kortti.x0)}…${Math.round(m.kortti.x1)}` : '—'}, `
    + `y ${m.kortti ? `${Math.round(m.kortti.y0)}…${Math.round(m.kortti.y1)}` : '—'}, `
    + `karttaruutu x ${Math.round(m.kotelo.x0)}…${Math.round(m.kotelo.x1)} `
    + `y ${Math.round(m.kotelo.y0)}…${Math.round(m.kotelo.y1)}, `
    + `skaala ${m.skaala?.toFixed(3) ?? '—'}, korkeus ${m.korkeus?.toFixed(4) ?? '—'}, `
    + `sisällön ylivuoto ${m.ylivuoto} px, Etsi aarre -solmuja ${m.aarrenappeja}`);

  if (KUVAKANSIO && m.kortti) {
    /*
     * ISOISÄN LUENTAKUVA POIS KUVASTA. Saapumisen iso valokuva
     * (.fokusvirta-isokuva) nousee kartan päälle muutama sekunti
     * saapumisen jälkeen ja peittää Ranskan; pelaajalla se on ohi
     * siinä vaiheessa, kun hän katsoo paneelia. Piilotus on vain
     * kuvaa varten eikä vaikuta yhteenkään mittaan — mitat on
     * otettu jo yllä.
     */
    // eslint-disable-next-line no-await-in-loop
    await sivu.evaluate(() => {
      for (const n of document.querySelectorAll('.fokusvirta-isokuva')) {
        n.style.setProperty('display', 'none', 'important');
      }
    });
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(400);
    /*
     * TYÖPÖYDÄN KUVA RAJATAAN. Raportin kuvakatto on 400 kt, ja koko
     * 1400 × 900 -ruutu on PNG:nä 1,3 Mt — suurin osa siitä on tyhjää
     * merta ja naapurimaita. Rajaus jättää kuvaan Ranskan eteläosan ja
     * koko paneelin; puhelinruutu (390 × 844 = 337 kt) mahtuu kattoon
     * kokonaisena, ja siinä kuvan arvo on juuri se, että paneeli näkyy
     * koko ruudun mittasuhteissa.
     */
    const rajaus = ruutu.leveys > 800 ? {
      x: Math.max(0, Math.round((m.kortti.x0 + m.kortti.x1) / 2) - 320),
      y: Math.max(0, Math.round(m.kortti.y1) + 30 - 580),
      width: 640,
      height: 580,
    } : null;
    // eslint-disable-next-line no-await-in-loop
    await sivu.screenshot({
      path: join(KUVAKANSIO, `karttauudistus-9-${ruutu.nimi}.png`),
      ...(rajaus ? { clip: rajaus } : {}),
    });
  }

  /* --- 2. panoroinnin rajaus ------------------------------------- */
  // eslint-disable-next-line no-await-in-loop
  const ennen = await mittaaKamera(sivu);
  // ~2000 px: 390 px:n ruudulla kotelo on 374 px leveä (veto 326 px),
  // joten kuusi kierrosta riittää; työpöydällä kaksi.
  const kierroksia = ruutu.leveys < 800 ? 6 : 2;
  // eslint-disable-next-line no-await-in-loop
  const matka = await veda(sivu, { kierroksia, kotelo: m.kotelo });
  // eslint-disable-next-line no-await-in-loop
  await sivu.waitForTimeout(600);
  // eslint-disable-next-line no-await-in-loop
  const jalkeen = await mittaaKamera(sivu);

  /* VASTAKOE A: sama veto ilman laudan asentamaa rajauskahvaa. */
  // eslint-disable-next-line no-await-in-loop
  await sivu.evaluate(() => {
    const l = window.matkakirja.ui.pallolauta;
    l.kamera.ajaKamera({ bbox: l.pallo.htmlElementsData()
      .find((d) => d.laji === 'maapaneeli')?.laatikko, marginaali: 0.05 }, { kesto: 0 });
  });
  // eslint-disable-next-line no-await-in-loop
  await sivu.waitForTimeout(900);
  // eslint-disable-next-line no-await-in-loop
  await sivu.evaluate(() => { window.matkakirja.ui.pallonPanorajaus = null; });
  // eslint-disable-next-line no-await-in-loop
  const ennenB = await mittaaKamera(sivu);
  // eslint-disable-next-line no-await-in-loop
  await veda(sivu, { kierroksia, kotelo: m.kotelo });
  // eslint-disable-next-line no-await-in-loop
  await sivu.waitForTimeout(600);
  // eslint-disable-next-line no-await-in-loop
  const jalkeenB = await mittaaKamera(sivu);

  const rajat = ennen.rajat;
  const sisalla = Boolean(rajat && jalkeen.lng >= rajat.lngMin - 0.01
    && jalkeen.lng <= rajat.lngMax + 0.01);
  const ulkona = Boolean(rajat && (jalkeenB.lng < rajat.lngMin - 0.01
    || jalkeenB.lng > rajat.lngMax + 0.01));
  panoTulokset.push({ ruutu: ruutu.nimi, sisalla, ulkona });
  tieto(`${ruutu.nimi} px · veto ${matka} px itään`,
    `keskipiste lng ${ennen.lng?.toFixed(3)} → ${jalkeen.lng?.toFixed(3)} `
    + `(sallittu ${rajat ? `${rajat.lngMin.toFixed(3)}…${rajat.lngMax.toFixed(3)}` : '—'}), `
    + `RIISUTTUNA ${ennenB.lng?.toFixed(3)} → ${jalkeenB.lng?.toFixed(3)} `
    + `(siirtymä ${(jalkeenB.lng - ennenB.lng).toFixed(3)}° vs. rajattu `
    + `${(jalkeen.lng - ennen.lng).toFixed(3)}°)`);

  paaVirheet = paaVirheet.concat(virheet);
  // eslint-disable-next-line no-await-in-loop
  await ctx.close();
}

vaadi('1. paneeli on pieni ja kokonaan ruudulla (390 px ja 1400 px, uloin sallittu zoomi)',
  kokoTulokset.length === RUUDUT.length
  && kokoTulokset.every((t) => t.mahtuu && t.ruudulla && t.ylivuoto <= 0),
  `tulokset ${JSON.stringify(kokoTulokset)}`);
vaadi('2. panorointi pysyy maan laatikko × 1,3 -alalla (2000 px:n veto)',
  panoTulokset.length === RUUDUT.length && panoTulokset.every((t) => t.sisalla),
  `tulokset ${JSON.stringify(panoTulokset)}`);
vaadi('VASTAKOE A: ilman panorointirajausta sama veto vie keskipisteen ULOS',
  panoTulokset.length === RUUDUT.length && panoTulokset.every((t) => t.ulkona),
  `tulokset ${JSON.stringify(panoTulokset)}`);
vaadi('3. "Etsi aarre" -nappia ei ole DOM:issa Ranskassa',
  aarrenappeja === 0, `solmuja ${aarrenappeja}`);
tieto('sivun virheet (pääajo)', paaVirheet.length ? paaVirheet.join(' | ') : 'ei yhtään');
vaadi('4. pääajo ei tuottanut sivuvirheitä', paaVirheet.length === 0, paaVirheet.join(' | '));

/* ============ VASTAKOE B: erän 3 mitat takaisin ==================== */

eranKolmenMitat = true;
{
  const { ctx, sivu, auki } = await avaaPeli({ leveys: 390, korkeus: 844 });
  const m = auki ? await mittaaPaneeli(sivu) : null;
  const vaite = Boolean(m?.kortti && m.kortti.w <= KOKO_KATTO[390]);
  tieto('vastakoe B (erän 3 mitat 300 × 96, leveysosuus 1)',
    `kortti ${m?.kortti ? `${Math.round(m.kortti.w)} x ${Math.round(m.kortti.h)} px` : 'EI OLE'}, `
    + `kokoväite ${vaite ? 'LÄPI (paha)' : 'PUNAINEN'}`);
  vaadi('VASTAKOE B: entisillä mitoilla kokoväite kaatuu',
    Boolean(auki && m?.kortti) && !vaite,
    JSON.stringify({ auki, w: m?.kortti?.w }));
  await ctx.close();
}
eranKolmenMitat = false;

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
