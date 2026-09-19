/*
 * Savuke: KARTTANOSTON NAPAUTUS AVAA OMAN KORTTINSA — ja muiden maiden
 * nostot ovat piilossa kohdemaan ulkopuolella.
 *
 * OMISTAJA 14.9.2026, sanatarkasti (Raamattu, KARTTAUUDISTUKSEN
 * PAATOKSET 12): *"karttanostoja ei voi klikata ja niita pitaisi olla
 * enemman."* ja *"pystyyko muiden maiden karttanostoja piilottamaan
 * helposti?"*
 *
 * MITATTU JUURISYY (Chromium 390 × 844, Ranskan saapumisnäkymä,
 * napautus jokaisen merkin OMAAN ruutupisteeseen): 8 Ranskan 20
 * merkistä avasi väärän kortin tai ei mitään. Kaksi syytä, kumpikin
 * osumakilpailussa (js/pallolauta/lauta.js):
 *
 *   A) TASAPELIN MITTA OLI LAATIKON KESKI. Kun kaksi mustelaatikkoa
 *      peitti sormen (kumpikin etäisyys 0), voitti se, jonka LAATIKON
 *      keskipiste oli lähinnä — ja laatikko on kuvake + nimiö, joten
 *      pitkänimisen naapurin keski oli usein lähempänä kuin sen
 *      merkin oma, jonka KUVAKKEELLA sormi oli. Mitattu: sormi
 *      Chartresin kuvakkeella → Chartresin laatikon keski 20 px,
 *      Mont-Saint-Michelin 11 px → aukesi Mont-Saint-Michel.
 *   B) TURISTI-INFON MYÖNNYTYS OLI EHDOTON. `lahinMerkki` palautti
 *      turisti-infon aina, kun se oli lähin merkki 44 px:n sisällä —
 *      myös silloin, kun sormi oli kokonaan toisen noston nimiön
 *      päällä. Saapumisnäkymässä Pariisin seutu on yhden sormen
 *      kokoinen (mitattu 6,7 km/px), joten Chambordin nimiön napautus
 *      avasi turisti-infon.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   1. JOKAINEN NÄKYVÄ NOSTO AVAA OMAN KORTTINSA HIIRELLÄ, kun sormi
 *      on merkin omassa ruutupisteessä (kuvake).
 *   2. SAMA KOSKETUKSELLA (touchscreen.tap).
 *   3. JOKAINEN NÄKYVÄ NOSTO AVAA OMAN KORTTINSA NIMIÖN PÄÄLTÄ
 *      (Raamattu VIAT v1672: teksti on osa osumapintaa).
 *   4. MUIDEN MAIDEN NOSTOJA EI OLE OSUMALISTALLA (lippu
 *      NAYTA_VAIN_KOHDEMAAN_NOSTOT).
 *   4b. VASTAKOE: merkit ovat yhä olemassa — `naapurienPoltetutMerkit`
 *      palauttaa samassa näkymässä > 0 merkkiä, eli lippu (ei puuttuva
 *      data) on se, joka ne piilottaa.
 *   5. RUUDUN MERKKIMÄÄRÄ: napautettavia on selvästi vähemmän kuin
 *      ilman lippua (ennen/jälkeen INFO-riveillä).
 *
 * VASTAKOE SÄÄNNÖLLE A (yksikkömitta, ajetaan tässä): sama
 * `musteenVoittaja` ILMAN `keski`-kenttää palauttaa Chartresin mitatussa
 * asetelmassa naapurin — eli vartio 1 mittaa juuri tätä sääntöä.
 *
 * VASTAKOE SÄÄNNÖLLE B (käsin, kirjattu raporttiin): palauta rivi
 * muotoon `if (voittaja?.laji === 'turistiinfo') return voittaja;`
 * → Chambordin nimiön napautus avaa taas turisti-infon.
 *
 * KAKSI RUUTUA: puhelin pystyssä 390 × 844 ja työpöytä 1400 × 900.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 * Ilman ämpäriä selainvartiot OHITETAAN.
 *
 * Aja: NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *      node tools/savukkeet/savuke-nostoklikkaus.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { NAYTA_VAIN_KOHDEMAAN_NOSTOT } from '../../js/pallolauta/nostot.js';
import { musteenVoittaja } from '../../js/pallolauta/lauta.js';

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] && process.argv[2] !== '-' ? process.argv[2] : null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* ========== VARTIO 0: SÄÄNNÖN VASTAKOE NODESSA ========== */

/*
 * CHARTRESIN MITATTU ASETELMA (Chromium 390 × 844, Ranskan
 * saapumisnäkymä 14.9.2026): sormi Chartresin kuvakkeella (191, 405).
 * Chartresin oma laatikko on kuvake + nimiö oikealla (52 × 11 px),
 * Mont-Saint-Michelin laatikko (77 × 11 px) ulottuu sormen alle sen
 * omasta pisteestä (148, 400).
 */
const CHARTRES = {
  r: { x0: 185, y0: 399, x1: 237, y1: 411 },
  voittaja: { laji: 'nosto', o: { id: 'chartresin-katedraali' } },
  keski: { x: 191, y: 405 },
};
const MSM = {
  r: { x0: 142, y0: 394, x1: 219, y1: 406 },
  voittaja: { laji: 'nosto', o: { id: 'mont-saint-michel' } },
  keski: { x: 148, y: 400 },
};
const sormi = { x: 191, y: 405 };
const ilman = (e) => ({ r: e.r, voittaja: e.voittaja });
vaadi('0. tasapelin voittaa merkki, jonka OMALLA pisteellä sormi on',
  musteenVoittaja(sormi, [CHARTRES, MSM])?.o?.id === 'chartresin-katedraali',
  JSON.stringify(musteenVoittaja(sormi, [CHARTRES, MSM])));
vaadi('0b. VASTAKOE — ilman `keski`-kenttää voittaa naapurin nimiö',
  musteenVoittaja(sormi, [ilman(CHARTRES), ilman(MSM)])?.o?.id === 'mont-saint-michel',
  'vanha sääntö ei enää tuota vikaa — vartio 0 ei mittaa sääntöä');
vaadi('0c. lippu on päällä (muiden maiden nostot piilossa)',
  NAYTA_VAIN_KOHDEMAAN_NOSTOT === true, `${NAYTA_VAIN_KOHDEMAAN_NOSTOT}`);

/* ========== SELAINVARTIOT ========== */

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
if ((await ampariHaku(`${AMPARI}vendor/globe.gl-2.46.2.min.js`))?.status !== 200) {
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; selainvartiot ohitetaan');
  palvelin.close();
  console.log(`\n${lapi}/${kaikki} läpi`);
  process.exit(lapi === kaikki ? 0 : 1);
}

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const tallenne = (aloitus) => {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: aloitus }],
    pack: packById('maailmankartta'),
    seed: 5,
  });
  peli.phase = 'action';
  peli.tokens.delete(aloitus);
  return JSON.stringify(peli.toJSON());
};

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const virheet = [];

async function avaaPeli(kaupunki, leveys, korkeus) {
  const ctx = await selain.newContext({
    viewport: { width: leveys, height: korkeus },
    deviceScaleFactor: 1,
    serviceWorkers: 'block',
    hasTouch: true,
  });
  await ctx.addInitScript((d) => {
    try {
      localStorage.setItem('matkakirja-save-v1', d);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne(kaupunki));
  const sivu = await ctx.newPage();
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
  if (auki) await sivu.waitForTimeout(2500);
  return { ctx, sivu, auki };
}

/** Auki oleva kelluva pinta — sama valitsin kuin laudan nielulla. */
const KORTIT = '.fokuskohde-popup, .elaintaky-kerros, .skandaali-kerros, .hetki-kerros,'
  + ' .fokusnosto-kerros, .syvennys-kerros, .minipopup, .kaupunkipopup';
const avoinna = (sivu) => sivu.evaluate((sel) => {
  const el = document.querySelector(sel);
  /*
   * KORTIN HENKILÖLLISYYS. Fokuskohteen kortti kertoo tunnuksensa
   * (ui.fokuskohdeAuki.id), mutta syvennys, skandaali, historian hetki
   * ja eläintäky ovat omia kerroksiaan ilman tunnusta — niiden
   * `role="dialog"` kantaa otsikon aria-labelissa, ja se riittää
   * erottamaan kaksi eri korttia toisistaan.
   */
  const dialogi = el?.querySelector?.('[role="dialog"]') ?? null;
  return {
    fokus: window.matkakirja.ui.fokuskohdeAuki?.id ?? null,
    kortti: el ? String(el.className?.baseVal ?? el.className ?? el.tagName) : null,
    otsikko: dialogi?.getAttribute('aria-label') ?? null,
  };
}, KORTIT);
/** Kortin tunniste vertailua varten (tunnus tai otsikko + kerros). */
const tunniste = (a) => (a?.fokus ?? null)
  ?? (a?.otsikko ? `${a.kortti}|${a.otsikko}` : a?.kortti ?? null);
/** Sulkee kaiken auki olevan, jotta seuraava napautus on puhdas. */
async function sulje(sivu) {
  for (let i = 0; i < 6; i += 1) {
    const t = await avoinna(sivu);
    if (!t.fokus && !t.kortti) return;
    await sivu.keyboard.press('Escape');
    await sivu.waitForTimeout(220);
  }
  await sivu.evaluate(async (sel) => {
    const { suljeFokuskohde } = await import('/js/fokuskohteet.js');
    suljeFokuskohde(window.matkakirja.ui);
    for (const e of document.querySelectorAll(sel)) e.remove();
  }, KORTIT);
  await sivu.waitForTimeout(200);
}
/** Saapumisnäkymä uudestaan: kortin avaus on voinut siirtää kameraa. */
const saavu = (sivu) => sivu.evaluate(async () => {
  const l = window.matkakirja.ui.pallolauta;
  await l.saavu({ kesto: 0 });
  await new Promise((v) => setTimeout(v, 1500));
  l.ladoHeti();
  await new Promise((v) => setTimeout(v, 500));
});

/** Näkymän mitat ja osumalista maittain. */
const kartoita = (sivu) => sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const l = ui.pallolauta;
  const { kohteidenNykyinenIso, naapurienPoltetutMerkit } = await import('/js/fokuskohteet.js');
  const { pallonNostoOnPoltettu } = await import('/js/pallo.js');
  const nakyva = l.kamera.nakyvaAlue();
  const osumat = l.nostot.osumat();
  return {
    iso: kohteidenNykyinenIso(ui),
    nakyva: { w: +nakyva.w.toFixed(1), h: +nakyva.h.toFixed(1) },
    portti: l.nostot.portti()?.merkit.length ?? null,
    piiloon: l.nostot.portti()?.piiloon.length ?? 0,
    omat: osumat.filter((o) => o.avain.startsWith('nosto:')).map((o) => o.id),
    naapureita: osumat.filter((o) => o.avain.startsWith('naapuri:')).length,
    elaimia: osumat.filter((o) => o.avain.startsWith('elain:')).length,
    osumia: osumat.length,
    elavia: document.querySelectorAll('.pallolauta-nosto').length,
    // Vastakoe: data on yhä olemassa, lippu vain jättää sen pois.
    naapurimerkkeja: naapurienPoltetutMerkit(ui, nakyva, pallonNostoOnPoltettu).length,
  };
});

/**
 * MITÄ MERKIN OMA AVAAJA AVAA — vertailukohta aidolle napautukselle.
 *
 * Savuke ei voi tietää ulkopuolelta, mikä kortti kuuluu millekin
 * merkille: syvennys- ja skandaalikerroksella ei ole tunnusta. Se
 * kysytään siksi laudalta itseltään (`napautaNosto(id)`, sama
 * `avaa`-kutsu jonka osumatesti tekisi) ja verrataan siihen.
 */
async function odotettu(sivu, id) {
  await sulje(sivu);
  await sivu.evaluate((tunnus) => window.matkakirja.ui.pallolauta.napautaNosto(tunnus), id);
  await sivu.waitForTimeout(700);
  const a = await avoinna(sivu);
  await sulje(sivu);
  return tunniste(a);
}

/** Merkin tuore ruutupiste ja nimiölaatikon keski SIVUN koordinaateissa. */
const tuore = (sivu, id) => sivu.evaluate((tunnus) => {
  const l = window.matkakirja.ui.pallolauta;
  const o = l.nostot.osumat().find((x) => x.id === tunnus);
  if (!o) return null;
  const p = l.pallo.getScreenCoords(o.lat, o.lng, 0);
  const b = l.nostot.osumaLaatikot().find((x) => x.id === tunnus) ?? null;
  // getScreenCoords antaa KANKAAN koordinaatit; sormi osuu sivuun.
  const kr = l.pallo.renderer().domElement.getBoundingClientRect();
  // Etäisyys pelaajan oman kaupungin pisteeseen: kaupunkipisteen oma
  // muste voittaa lapun (js/pallolauta/lauta.js lahinMerkki), ja se on
  // vanhempi ja tarkoituksellinen sääntö — ks. KAUPUNKIPISTEEN ALLA.
  const city = window.matkakirja.ui.game.cityOf?.();
  const cp = city ? l.pallo.getScreenCoords(...(() => {
    const a = l.asteet({ x: city.x, y: city.y });
    return a ? [a.lat, a.lon, 0] : [0, 0, 0];
  })()) : null;
  return {
    px: p ? Math.round(p.x + kr.x) : null,
    py: p ? Math.round(p.y + kr.y) : null,
    bx: b ? Math.round((b.x0 + b.x1) / 2 + kr.x) : null,
    by: b ? Math.round((b.y0 + b.y1) / 2 + kr.y) : null,
    kaupunkiin: (p && cp) ? Math.round(Math.hypot(p.x - cp.x, p.y - cp.y) * 10) / 10 : null,
  };
}, id);

/**
 * Yksi aito napautus: näkymä nollataan, koordinaatit luetaan vasta
 * sitten (kortin avaus siirtää kameraa), ja tulos on se, mikä aukesi.
 */
async function napauta(sivu, id, kohta, tapa, koko) {
  await sulje(sivu);
  await saavu(sivu);
  const t = await tuore(sivu, id);
  if (!t || t.px === null) return { tila: 'ei merkkiä' };
  const x = kohta === 'ikoni' ? t.px : t.bx;
  const y = kohta === 'ikoni' ? t.py : t.by;
  if (x < 0 || y < 0 || x > koko.w || y > koko.h) return { tila: 'ruudun ulkopuolella' };
  const alla = await sivu.evaluate(([xx, yy]) => {
    const e = document.elementFromPoint(xx, yy);
    return e ? `${e.tagName}.${e.className?.baseVal ?? e.className ?? ''}` : 'ei';
  }, [x, y]);
  if (tapa === 'hiiri') await sivu.mouse.click(x, y);
  else await sivu.touchscreen.tap(x, y);
  await sivu.waitForTimeout(700);
  const a = await avoinna(sivu);
  return {
    x,
    y,
    alla: String(alla).slice(0, 34),
    auki: tunniste(a),
    kaupunkiin: t.kaupunkiin,
  };
}

/*
 * PANEELIN ALLE JÄÄVÄ KUVAKE EI OLE TÄMÄN SÄÄNNÖN ASIA. Maapaneeli
 * (js/pallolauta/maapaneeli.js, 104 × 82 px, pointer-events: auto) on
 * kartan päällä oleva kortti, ja sen alle jäävä kuvake ei saa
 * napautusta lainkaan — napautus ei edes yllä palloon asti. Mitattu
 * 14.9.2026: Biskajanlahden kuvake Ranskan saapumisnäkymässä. Vartio
 * kirjaa sen INFOna eikä lue sitä osumareitityksen viaksi; nimiö on
 * paneelin ulkopuolella ja avaa kortin normaalisti.
 */
const PANEELI = /maapaneeli/;
/*
 * KAUPUNKIPISTEEN ALLA. Pelaajan oman kaupungin piste voittaa lapun,
 * kun sormi on sen oman musteen päällä (js/pallolauta/lauta.js
 * lahinMerkki, "KAUPUNKIPISTEEN OMA MUSTE VOITTAA LAPUN", omistaja
 * 9.9.2026). Ranskassa Kaulanauhajutun merkki on juuri Pariisin
 * pisteen päällä, joten sen KUVAKE avaa kaupungin — tarkoituksella.
 * Nimiö on pisteen ulkopuolella ja avaa noston normaalisti, ja vartio
 * 3 mittaa sen. Vara on kaupunkipisteen piirretty halkaisija
 * saapumisnäkymässä pyöristettynä ylöspäin.
 */
const KAUPUNKIPISTEEN_VARA_PX = 12;

const RUUDUT = [{ w: 390, h: 844 }, { w: 1400, h: 900 }];
for (const koko of RUUDUT) {
  const nimi = `${koko.w}x${koko.h}`;
  const { ctx, sivu, auki } = await avaaPeli('pariisi', koko.w, koko.h);
  vaadi(`${nimi}: pallolauta aukesi`, auki, virheet.join(' | '));
  if (!auki) { await ctx.close(); continue; }
  await saavu(sivu);
  const k = await kartoita(sivu);
  tieto(`${nimi} näkymä`, `${k.iso}, leveys ${k.nakyva.w}, portti päästää ${k.portti}, lähizoomiin ${k.piiloon}`);
  tieto(`${nimi} merkit ruudulla`,
    `napautettavia ${k.osumia} (omia ${k.omat.length}, naapureita ${k.naapureita}, eläintäkyjä ${k.elaimia}), eläviä H-merkkejä ${k.elavia}`);
  tieto(`${nimi} naapurimerkkejä ilman lippua`, `${k.naapurimerkkeja}`);

  const vaarat = { ikoniHiiri: [], ikoniKosketus: [], lappuHiiri: [] };
  const paneelissa = [];
  const kaupunginAlla = [];
  for (const id of k.omat) {
    const odote = await odotettu(sivu, id);
    const ih = await napauta(sivu, id, 'ikoni', 'hiiri', koko);
    const kaupungissa = ih.kaupunkiin !== null && ih.kaupunkiin <= KAUPUNKIPISTEEN_VARA_PX;
    if (PANEELI.test(ih.alla ?? '')) paneelissa.push(id);
    else if (kaupungissa) kaupunginAlla.push(`${id} (${ih.kaupunkiin} px)`);
    else {
      if (ih.auki !== odote) vaarat.ikoniHiiri.push(`${id}→${ih.auki ?? ih.tila ?? '-'}`);
      const ik = await napauta(sivu, id, 'ikoni', 'kosketus', koko);
      if (ik.auki !== odote) vaarat.ikoniKosketus.push(`${id}→${ik.auki ?? ik.tila ?? '-'}`);
    }
    const lh = await napauta(sivu, id, 'lappu', 'hiiri', koko);
    if (lh.auki !== odote) vaarat.lappuHiiri.push(`${id}→${lh.auki ?? lh.tila ?? '-'}`);
  }
  if (paneelissa.length) tieto(`${nimi} maapaneelin alla (kuvake ohitettu)`, paneelissa.join(', '));
  if (kaupunginAlla.length) tieto(`${nimi} kaupunkipisteen musteen alla (kuvake ohitettu)`, kaupunginAlla.join(', '));

  vaadi(`${nimi}: 1. jokainen nosto avaa OMAN korttinsa hiirellä (kuvake)`,
    vaarat.ikoniHiiri.length === 0, vaarat.ikoniHiiri.join(', '));
  vaadi(`${nimi}: 2. sama kosketuksella`,
    vaarat.ikoniKosketus.length === 0, vaarat.ikoniKosketus.join(', '));
  vaadi(`${nimi}: 3. nimiön napautus avaa oman kortin`,
    vaarat.lappuHiiri.length === 0, vaarat.lappuHiiri.join(', '));
  vaadi(`${nimi}: 4. muiden maiden nostoja ei ole osumalistalla`,
    k.naapureita === 0, `${k.naapureita}`);
  vaadi(`${nimi}: 4b. VASTAKOE — merkit ovat yhä olemassa (lippu piilottaa, ei data)`,
    k.naapurimerkkeja > 0, `${k.naapurimerkkeja}`);
  vaadi(`${nimi}: 5. lippu vähentää napautettavien määrää`,
    k.osumia + k.naapurimerkkeja > k.osumia, `${k.osumia}`);

  /*
   * 6. MERINOSTO PYSYY NAPAUTETTAVANA MYÖS LÄHIZOOMISSA (omistaja
   * 19.9.2026 klo 23.31, iPad: Biskajanlahden nimiö ei ota napautusta).
   *
   * Lahden datapiste on ulapalla (45,3 N / −3,2 E), mutta muste on
   * lukitussa ankkurissa rannikolla (45,2 N / −1,14 E). Ennen korjausta
   * näkyvyys luettiin datapisteestä, joten lähizoomissa rivi putosi
   * osumalistalta vaikka nimiö oli keskellä ruutua. Vartio ajaa kameran
   * ANKKURIIN ja tarkistaa, että datapiste on silloin ruudun
   * ULKOPUOLELLA — muuten väite ei mittaisi tätä sääntöä lainkaan.
   */
  const meri = await sivu.evaluate(async () => {
    const l = window.matkakirja.ui.pallolauta;
    const kotelo0 = () => (document.querySelector('.pallo-kotelo')?.getBoundingClientRect()
      ?? { left: 0, top: 0, width: 0, height: 0 });
    const nakyy = (p, k) => Boolean(p && p.x >= 0 && p.y >= 0 && p.x <= k.width && p.y <= k.height);
    /*
     * ZOOMATAAN, KUNNES DATAPISTE ON RUUDUN ULKOPUOLELLA. Leveällä
     * ruudulla sama korkeus näyttää enemmän karttaa, joten kiinteä
     * 0,05 jätti lahden ulapan vielä ruudulle eikä väite mitannut
     * mitään (mitattu 1400 px). Premissi tehdään siis todeksi
     * mittaamalla, ei arvaamalla.
     */
    let data = true;
    for (const korkeus of [0.05, 0.035, 0.025, 0.018]) {
      l.pallo.pointOfView({ lat: 45.199962, lng: -1.14248, altitude: korkeus }, 600);
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 2200));
      l.ladoHeti();
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 900));
      data = nakyy(l.pallo.getScreenCoords(45.3, -3.2, 0), kotelo0());
      if (!data) break;
    }
    const kotelo = kotelo0();
    const ruudulla = (p) => nakyy(p, kotelo);
    const o = (l.nostot?.osumat?.() ?? []).find((x) => x.id === 'biskajanlahti');
    if (!o) return { listalla: false, dataRuudulla: data };
    const p = l.pallo.getScreenCoords(o.lat, o.lng, 0);
    const b = p && o.lappu ? o.lappu(p) : null;
    return {
      listalla: true,
      dataRuudulla: data,
      lat: Number(o.lat.toFixed(3)),
      lng: Number(o.lng.toFixed(3)),
      x: b ? Math.round((b.x0 + b.x1) / 2 + kotelo.left) : null,
      y: b ? Math.round((b.y0 + b.y1) / 2 + kotelo.top) : null,
    };
  });
  let meriAukesi = null;
  if (meri.listalla && meri.x != null) {
    await sivu.mouse.click(meri.x, meri.y);
    await sivu.waitForTimeout(900);
    meriAukesi = await sivu.evaluate(() => {
      const auki = window.matkakirja.ui.fokuskohdeAuki?.id ?? null;
      document.querySelector('.fokuskohde-sulje')?.click();
      return auki;
    });
    await sivu.waitForTimeout(400);
  }
  tieto(`${nimi} merinosto lähizoomissa`,
    `${JSON.stringify(meri)}, napautus avasi ${meriAukesi ?? 'ei mitään'}`);
  vaadi(`${nimi}: 6. merinoston nimiö avaa kortin lähizoomissa, vaikka datapiste on ruudun ulkopuolella`,
    Boolean(meri.listalla && meri.dataRuudulla === false && meriAukesi === 'biskajanlahti'),
    JSON.stringify({ meri, meriAukesi }));
  await saavu(sivu);
  /*
   * KUVA VASTA LOPUKSI. Saapumistraileri (kaupungin saapumiskortti)
   * peittää ruudun ensimmäiset sekunnit — sen läpi otettu kuva näyttää
   * kortin eikä karttaa. Napautuskierroksen jälkeen traileri on ohi,
   * ja `saavu()` palauttaa saman saapumisnäkymän, jota vartiot
   * mittasivat.
   */
  if (KUVAKANSIO) {
    await sulje(sivu);
    await saavu(sivu);
    /*
     * KUVA OTETAAN CDP:LLÄ, EI page.screenshot()-KUTSULLA. Playwrightin
     * oma kuvaus ODOTTAA fonttien latautumista (`document.fonts.ready`),
     * ja savuke ajaa ämpärin läpi ilman verkkoa: lupaus ei ratkea, ja
     * kuvaus jää aikakatkaisuun. CDP:n Page.captureScreenshot ottaa
     * ruudun sellaisenaan. Kuva on todiste, ei vartio, joten virhe ei
     * kaada savuketta.
     */
    try {
      const cdp = await ctx.newCDPSession(sivu);
      // JPEG, jotta kuva mahtuu raportin 300 kt:n rajaan (PNG oli 357 kt).
      const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 72 });
      writeFileSync(join(KUVAKANSIO, `nostoklikkaus-${nimi}.jpg`), Buffer.from(data, 'base64'));
      await cdp.detach();
    } catch (e) { console.log(`INFO  ${nimi} kuva jäi ottamatta: ${e.message}`); }
  }

  await ctx.close();
}

vaadi('sivulla ei skriptivirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
