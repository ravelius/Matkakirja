/*
 * Savuke: MAAINFO RUUDUN VASEMMASSA ALAKULMASSA (erä 19).
 *
 * === MITÄ TÄMÄ VARTIOI =============================================
 *
 * Raamattu, KARTTAUUDISTUKSEN PÄÄTÖKSET 28 (omistaja 15.9.2026 klo
 * 20.45 UTC, sanatarkasti): *"Palautetaan alkuperainen vasemman
 * alakulman maainfo mutta sailytetaan se plussasta avautuva valikko
 * (valikko tulee plussan paikalle ja kasvaa ylospain kahdessa rivissa
 * tiiviisti ladottuna."*
 *
 * KUMOUTUNEET VARTIOT (erät 3–18, tässä samassa tiedostossa):
 *
 *   - "paneeli on maan laatikon ETELÄREUNAN ULKOPUOLELLA kartalla"
 *     (PÄÄTÖKSET 2 kohta 2) — paneeli ei ole enää kartalla lainkaan.
 *   - "paneeli skaalautuu kuin painettu kartta (lähempänä leveämpi)"
 *     (PÄÄTÖKSET 9 kohta 4) — juuri tämä on nyt KIELLETTY.
 *   - vastakoe B `?maapaneeli=nurkka` mittasi eroa kartta-ankkurin ja
 *     nurkan välillä; nurkka on nyt oletus, joten vastakoe mittaa nyt
 *     päinvastaista asiaa (ks. alempana).
 *
 * Väitteet:
 *
 *   1. PANEELI ON RUUDUN VASEMMASSA ALAKULMASSA JA KOKONAAN RUUDULLA
 *      (390 ja 1400 px), ja sen korkeus on 22 % ruudun korkeudesta
 *      (± 2 %-yksikköä) — omistajan päätös 15.9.2026 illalla:
 *      "maainfo ALKUPERÄISEEN LUETTAVAAN KOKOON". Erän 19 ensimmäinen
 *      ≤ 10 % -katto KUMOUTUI: sillä kortin leipäteksti oli ruudulla
 *      3,6 px eikä sitä voinut lukea.
 *   2. PANEELI EI LIIKU EIKÄ KASVA ZOOMATESSA. Kortin vasen alakulma
 *      ja koko mitataan kahdella zoomilla: erot ≤ 1 px. VASTAKOE on
 *      kartan oma kaluste (kaupungin nimikyltti), jonka ON liikuttava
 *      samassa zoomissa — muuten mittaus ei mittaa mitään.
 *   3. VALIKKO AUKEAA PLUSSAN PAIKALLE JA KASVAA YLÖS KAHDESSA
 *      SARAKKEESSA. Valikon alareuna on kortin yläreunan tasalla tai
 *      sen yläpuolella, sarakkeita on ≥ 2, rivien pystyväli on
 *      ≤ 1,5 × rivin korkeus, ja koko valikko on ruudulla.
 *   4. JOKAINEN OTSIKKO AVAA OMAN SIVUNSA (ennallaan).
 *   5. VÄRIT OVAT KARTAN OMAT (ennallaan).
 *   6. LIIKU ON KUULTAVA SANA RUUDUN ALAREUNAN KESKELLÄ (PÄÄTÖKSET 28
 *      kohta 3): keskipiste ±8 px ruudun keskilinjalta, taustan alpha
 *      0, sana näkyy, osuma-ala ≥ 32 × 32, sana on KOKONAAN RUUDULLA
 *      ja ruudun alemmassa puoliskossa, eikä se osu paneeliin, pulun
 *      nappiin, matkapäiväkirjan lappuun eikä kaupunkikorttiin. 390
 *      px:n ruudulla iso paneeli yltää keskilinjalle, jolloin sana
 *      NOUSEE paneelin yläreunan tasalle (--liiku-pohja) mutta pysyy
 *      keskellä vaakasuunnassa.
 *
 * === VASTAKOKEET (pakolliset) ======================================
 *
 *   A. MAA ILMAN MAA_KATEGORIAT-RIVIÄ. Paneeli on yhä nurkassa,
 *      Lisää-nappia EI ole, valikko ei aukea eikä sivulle tule
 *      virhettä.
 *   B. `?maapaneeli=nurkka` PURKAA PANEELIN KOKONAAN (js/fokusmitat.js
 *      MAAPANEELI_KARTASSA = false → vanha kartuutsi-nurkkataulu).
 *      Väitteen 1 ON kaaduttava: korttia ei ole.
 *   C. KARTAN KALUSTE LIIKKUU. Nimikyltin mittaus samalla zoomilla
 *      kuin väite 2 — sen ON muututtava, tai "ei liiku" ei todista
 *      mitään.
 *   D. PULUN NAPPI EI OLE KESKELLÄ. Väitteen 6 keskitysmitta ajetaan
 *      `.pollo-nappi`iin; sen ON kaaduttava.
 *   E. PIENI KOKO TAKAISIN (nurkan katot 10 % / 28 %, erän 19
 *      ensimmäinen mitoitus). Väitteen 1 koko-osan ON kaaduttava.
 *   F. LIIKU EI VÄISTÄ. `bottom: max(…, var(--liiku-pohja))`
 *      palautetaan perusväliksi; sanan ON osuttava paneeliin 390
 *      px:n ruudulla, tai väistö ei todista mitään.
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

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.woff2': 'font/woff2',
};

/*
 * VASTAKOE A:n kytkin palvelimessa. Kun tämä on maan tunnus, moduulin
 * loppuun kirjoitetaan rivin poisto — maalla ei silloin OIKEASTI ole
 * aihesivuja, eikä valikolla ole mitään mistä rakentua.
 */
let poistaKategoriat = null;
/*
 * VASTAKOKEIDEN KYTKIN (erä 19b, omistajan päätös 15.9.2026 illalla):
 *
 *   'PIENI_KOKO'   — nurkan katot palautetaan erän 19 ensimmäiseen
 *                    mitoitukseen (10 % / 28 %, rajat 0,8…1,6).
 *                    KOKOVÄITTEEN ON KAADUTTAVA.
 *   'EI_VAISTOA'   — Liiku-napin `bottom: max(..., var(--liiku-pohja))`
 *                    palautetaan pelkäksi perusväliksi, jolloin sana
 *                    jää ruudun alalaitaan ison paneelin päälle.
 *                    PÄÄLLEKKÄISYYSVÄITTEEN ON KAADUTTAVA.
 */
let vastakoe = null;
const palvelin = http.createServer((req, res) => {
  const polkuOsa = req.url.split('?')[0];
  const polku = join(JUURI, polkuOsa === '/' ? 'index.html' : polkuOsa);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  let runko = readFileSync(polku);
  if (poistaKategoriat && polkuOsa.endsWith('/js/packs/maa-kategoriat.js')) {
    runko = Buffer.concat([runko,
      Buffer.from(`\ndelete MAA_KATEGORIAT[${JSON.stringify(poistaKategoriat)}];\n`)]);
  }
  if (vastakoe === 'PIENI_KOKO' && polkuOsa.endsWith('/js/pallolauta/maapaneeli.js')) {
    runko = Buffer.from(runko.toString('utf8')
      .replace(/MAAPANEELIN_NURKKA_KORKEUS_OSUUS = [\d.]+/,
        'MAAPANEELIN_NURKKA_KORKEUS_OSUUS = 0.10')
      .replace(/MAAPANEELIN_NURKKA_LEVEYS_OSUUS = [\d.]+/,
        'MAAPANEELIN_NURKKA_LEVEYS_OSUUS = 0.28')
      .replace(/MAAPANEELIN_NURKKA_SKAALA_MIN = [\d.]+/,
        'MAAPANEELIN_NURKKA_SKAALA_MIN = 0.8')
      .replace(/MAAPANEELIN_NURKKA_SKAALA_MAX = [\d.]+/,
        'MAAPANEELIN_NURKKA_SKAALA_MAX = 1.6'));
  }
  if (vastakoe === 'EI_VAISTOA' && polkuOsa.endsWith('/css/styles.css')) {
    runko = Buffer.from(runko.toString('utf8').replace(
      /bottom: max\(\s*calc\(var\(--gap\)[^;]*?var\(--liiku-pohja, 0px\)\s*\);/,
      'bottom: calc(var(--gap) + 0.4rem + env(safe-area-inset-bottom, 0px));',
    ));
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

/* Tallenne: Fogg Pariisissa — pilottimaa on Ranska (suunnitelman 3.2). */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('pariisi');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/** Yksi ajo: konteksti, peli Pariisissa, pallolauta auki. */
async function avaaPeli({ leveys, korkeus, lisaparametrit = '' }) {
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
  await sivu.goto(`${osoite}?lauta=pallo${lisaparametrit}`,
    { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
  const auki = await sivu
    .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  if (auki) {
    await sivu.waitForTimeout(4000);
    /*
     * SAAPUMISNÄKYMÄ ON SE "ULOIN ZOOMI", jota vasten luettavuus
     * mitoitetaan (PÄÄTÖKSET 2). Tallenteen lataus ei aja
     * saapumisajoa (nappulan paikka ei vaihdu), joten se ajetaan
     * tässä laudan omalla kutsulla — samalla laatikolla ja samalla
     * marginaalilla kuin kaupunkiin saavuttaessa.
     */
    await sivu.evaluate(async () => {
      const l = window.matkakirja.ui.pallolauta;
      await l.saavu({ kesto: 0 });
      await new Promise((v) => setTimeout(v, 1500));
      l.ladoHeti();
      await new Promise((v) => setTimeout(v, 400));
    });
    /*
     * LUENTA VAIETAAN ENNEN MITTAUSTA (korjaus 16.9.2026, erä 19b).
     *
     * Saapuminen käynnistää isoisän luennan, ja sen ajaksi Liiku on
     * `display: none` (css `body.luenta-aanessa .toimintorivi
     * .monitoimi-nappi`). Kevyessä kontissa luenta ehti loppua ennen
     * mittausta, mutta JULKAISUAJOSSA (20–60 chromiumia) ei ehtinyt:
     * `.monitoimi-nappi` löytyi DOM:sta mutta sen ruutulaatikko oli
     * pelkkiä nollia, ja väite 6 sekä vastakoe F kaatuivat ilman että
     * napissa oli mitään vikaa. Kytkin sammuttaa puhujan ja
     * js/ui.js:n luentavahti päästää napin esiin ~1,5 s kuluessa.
     */
    await sivu.evaluate(async () => {
      try {
        const L = await import('/js/luenta.js');
        L.asetaLuentaKytkin(false);
      } catch { /* moduuli ei latautunut: tyyli hoitaa loput */ }
    });
    /*
     * LUENNAN PIILOTUS NEUTRALISOIDAAN MITTAUKSEN AJAKSI. Kytkimen
     * sammuttaminen ei riitä: headless-ajossa luentavahti pitää
     * `body.luenta-aanessa`-luokan päällä (puhuja ei koskaan
     * "vaikene"), ja mitattuna 16.9.2026 napin ruutulaatikko oli
     * pelkkiä nollia vielä 30 sekunnin odotuksen jälkeenkin.
     *
     * TÄMÄ EI PIILOTA VIKAA: luennan aikainen piilotus on OMA
     * vartionsa tools/savukkeet/savuke-iphone-tekstit.mjs:ssä
     * ("luennan aikana Liiku on display:none, ei pelkkä opacity").
     * Täällä mitataan napin PAIKKAA ja ULKOASUA, ja sitä varten napin
     * on oltava näkyvissä — muuten mittaus kertoo vain siitä, ehtikö
     * luenta loppua ennen kelloa.
     */
    /*
     * SAAPUMISEN KUVAKORTTI PIILOON MYÖS. `.fokusvirta-isokuva` on se
     * iso valokuva, jonka saapuminen nostaa kartan päälle; 1400 px:n
     * ruudulla se peittää paneelin plus-napin, ja mitattuna 16.9.2026
     * `page.click('.maapaneeli-lisaa')` jäi odottamaan osumaa 30 s ja
     * kaatoi koko savukkeen. Kortti ei kuulu tähän mittaukseen — se on
     * saapumisen oma kaluste, ei maapaneelin.
     */
    await sivu.addStyleTag({
      content: 'body.luenta-aanessa .toimintorivi .monitoimi-nappi,'
        + ' body.luenta-tekstit-piiloon .toimintorivi .monitoimi-nappi'
        + ' { display: flex !important; }'
        + ' .fokusvirta-isokuva, .fokusvirta-luentakuva,'
        + ' .fokusvirta-luentakuva-ankkuri, .fokusvirta-luentateksti'
        + ' { display: none !important; }',
    });
    await sivu.waitForFunction(() => {
      const n = document.querySelector('.toimintorivi .monitoimi-nappi');
      const r = n?.getBoundingClientRect();
      return Boolean(r && r.width > 0 && r.height > 0);
    }, null, { timeout: 20000 }).catch(() => {});
  }
  return { ctx, sivu, virheet, auki };
}

/**
 * ODOTA, ETTÄ RUUTU ON ASETTUNUT (erä 19b).
 *
 * Karttaruutu (`.pallo-kotelo`) on flex-lapsi, jonka MITATTU korkeus
 * heiluu saapumisen aikana — ja paneeli on ankkuroitu sen alareunaan,
 * joten kortti liikkuu ruudulla niin kauan kuin kotelo elää. Se ei ole
 * zoomin aiheuttamaa liikettä (väite 2), vaan asettumista, ja
 * kuormitetussa kontissa se kesti pidempään kuin mittauksen odotus.
 *
 * Mitataan kortin ruutulaatikkoa, kunnes se on kaksi kertaa peräkkäin
 * sama (± 0,5 px) — tai kunnes aika loppuu, jolloin palataan
 * viimeiseen lukemaan ja väite ratkaisee asian.
 */
const odotaAsettunut = async (sivu, aikaaMs = 12000) => {
  const lue = () => sivu.evaluate(() => {
    const r = document.querySelector('.maapaneeli-kortti')?.getBoundingClientRect();
    return r ? { x: r.left, y: r.top, w: r.width, h: r.height } : null;
  });
  const loppuu = Date.now() + aikaaMs;
  let edellinen = await lue();
  while (Date.now() < loppuu) {
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(400);
    // eslint-disable-next-line no-await-in-loop
    const nyt = await lue();
    if (edellinen && nyt
      && Math.abs(nyt.x - edellinen.x) <= 0.5 && Math.abs(nyt.y - edellinen.y) <= 0.5
      && Math.abs(nyt.w - edellinen.w) <= 0.5 && Math.abs(nyt.h - edellinen.h) <= 0.5) {
      return nyt;
    }
    edellinen = nyt;
  }
  return edellinen;
};

/**
 * Yksi mittaus: kortti, valikko, Liiku ja kartan oma vertailukaluste.
 *
 * KAIKKI LUETAAN LIVENÄ RUUDUN PIKSELEINÄ. Kortti ei ole enää kartan
 * datum (erä 19), joten mitään ei projisoida — mitataan vain se, mitä
 * pelaaja näkee.
 */
const mittaaPaneeli = (sivu) => sivu.evaluate(() => {
  const l = window.matkakirja.ui.pallolauta;
  const laatikko = (q) => {
    const r = document.querySelector(q)?.getBoundingClientRect();
    return r ? {
      x0: r.left, y0: r.top, x1: r.right, y1: r.bottom, w: r.width, h: r.height,
    } : null;
  };
  const kortti = document.querySelector('.maapaneeli-kortti');
  const r = kortti?.getBoundingClientRect() ?? null;
  const kotelo = l.kotelo.getBoundingClientRect();
  const valikko = document.querySelector('.maapaneeli-valikko');
  const rivit = [...document.querySelectorAll('.maapaneeli-valikko:not([hidden]) .maapaneeli-aihe')]
    .map((n) => {
      const k = n.getBoundingClientRect();
      return { x: k.left, y: k.top, w: k.width, h: k.height };
    });
  /*
   * SARAKKEET JA RIVIVÄLI LUETAAN RIVIEN LAATIKOISTA. Sarake = eri
   * x-alku (2 px:n tarkkuudella); pystyväli = saman sarakkeen
   * peräkkäisten rivien ylälaitojen etäisyys.
   */
  const sarakkeet = [...new Set(rivit.map((k) => Math.round(k.x / 2)))].length;
  const ensimmainen = rivit.length ? Math.round(rivit[0].x / 2) : null;
  const sama = rivit.filter((k) => Math.round(k.x / 2) === ensimmainen)
    .sort((a, b) => a.y - b.y);
  let rivivali = null;
  for (let i = 1; i < sama.length; i += 1) {
    const d = sama[i].y - sama[i - 1].y;
    if (rivivali == null || d > rivivali) rivivali = d;
  }
  const nappi = document.querySelector('.toimintorivi .monitoimi-nappi');
  const nr = nappi?.getBoundingClientRect() ?? null;
  const tyyli = nappi ? getComputedStyle(nappi) : null;
  const sana = nappi?.querySelector('.icon-label');
  const sr = sana?.getBoundingClientRect() ?? null;
  const osuu = (a, b) => Boolean(a && b && a.x0 < b.x1 && b.x0 < a.x1
    && a.y0 < b.y1 && b.y0 < a.y1);
  const napinLaatikko = nr
    ? { x0: nr.left, y0: nr.top, x1: nr.right, y1: nr.bottom, w: nr.width, h: nr.height }
    : null;
  const korttiLaatikko = r
    ? { x0: r.left, y0: r.top, x1: r.right, y1: r.bottom, w: r.width, h: r.height }
    : null;
  return {
    onKortti: Boolean(kortti),
    kortti: korttiLaatikko,
    kotelo: {
      w: kotelo.width, h: kotelo.height, x0: kotelo.left, y0: kotelo.top,
      x1: kotelo.right, y1: kotelo.bottom,
    },
    ruutu: { w: globalThis.innerWidth, h: globalThis.innerHeight },
    skaala: l.maapaneeli?.mitat?.()?.skaala ?? null,
    korkeus: l.pallo.pointOfView()?.altitude ?? null,
    valikkoAuki: Boolean(valikko && !valikko.hidden),
    valikko: valikko && !valikko.hidden ? laatikko('.maapaneeli-valikko') : null,
    rivit: rivit.length,
    sarakkeet,
    rivivali,
    rivinKorkeus: rivit.length ? rivit[0].h : null,
    /*
     * VASTAKOE C: kartan oma piste, jonka ON liikuttava zoomatessa.
     * Pariisin ruutukoordinaatti pallon omalla projektiolla — DOM-
     * merkki ei kelpaa vertailuun, koska kerros voi ladata merkkinsä
     * uudestaan zoomin jälkeen (mitattu: `.pallolauta-nimi` katosi).
     */
    karttapiste: (() => {
      const pp = l.pallo.getScreenCoords(48.8566, 2.3522, 0);
      return pp ? { x0: pp.x, y0: pp.y } : null;
    })(),
    /*
     * Väite 6 ja vastakoe D.
     *
     * NOLLAN KOKOINEN LAATIKKO EI OLE MITTA (erä 19b). Luennan ajaksi
     * nappi on `display: none`, jolloin se löytyy DOM:sta mutta sen
     * ruutulaatikko on pelkkiä nollia — silloin mittausta EI ole, ja
     * `liiku: null` kertoo sen suoraan väitteen viestissä sen sijaan
     * että väite kaatuisi kuin napissa olisi vika.
     */
    liiku: nr && nr.width > 0 && nr.height > 0 ? {
      laatikko: napinLaatikko,
      keskipoikkeama: Math.abs((nr.left + nr.width / 2) - globalThis.innerWidth / 2),
      tausta: tyyli.backgroundImage === 'none' ? tyyli.backgroundColor : tyyli.backgroundImage,
      reunus: tyyli.borderTopWidth,
      sana: sana ? getComputedStyle(sana).display : null,
      sananPeitto: sana ? Number(getComputedStyle(sana).opacity) : null,
      sananLeveys: sr ? sr.width : null,
      osuuPaneeliin: osuu(napinLaatikko, korttiLaatikko),
      osuuPuluun: osuu(napinLaatikko, laatikko('.pollo-nappi')),
      osuuLappuun: osuu(napinLaatikko, laatikko('.fact-card')),
      osuuKaupunkikorttiin: osuu(napinLaatikko, laatikko('.kaupunkikortti')),
    } : null,
    /* ERÄ 19b: Liikun väistömuuttuja ja kortin tekstikoot ruudulla. */
    liikuPohja: getComputedStyle(document.documentElement)
      .getPropertyValue('--liiku-pohja').trim(),
    tekstit: {
      nimi: document.querySelector('.maapaneeli-nimi-suomi')
        ? getComputedStyle(document.querySelector('.maapaneeli-nimi-suomi')).fontSize : null,
      otsikko: document.querySelector('.maapaneeli-otsikko')
        ? getComputedStyle(document.querySelector('.maapaneeli-otsikko')).fontSize : null,
      aihe: document.querySelector('.maapaneeli-aihe')
        ? getComputedStyle(document.querySelector('.maapaneeli-aihe')).fontSize : null,
    },
    /*
     * TEKSTIKOKO ON KORTIN YKSIKKÖ × SKAALA, koska kortti on
     * `transform: scale()`attu — getComputedStyle antaa yksikön, ei
     * ruutupikseliä. Ruutukoko lasketaan raportissa skaalalla.
     */
    pollonPoikkeama: (() => {
      const k = document.querySelector('.pollo-nappi')?.getBoundingClientRect();
      return k ? Math.abs((k.left + k.width / 2) - globalThis.innerWidth / 2) : null;
    })(),
    // Nurkkatilan kaluste (vastakoe B): sama tieto samalta ruudulta.
    nurkassa: Boolean(document.querySelector('.fokus-kartuutsi')
      && !document.querySelector('.fokusmitat')?.hidden),
  };
});

/** Zoom sisään: sama keskipiste, puolet korkeudesta. */
const zoomaaSisaan = (sivu, kerroin) => sivu.evaluate(async (k) => {
  const l = window.matkakirja.ui.pallolauta;
  const pov = l.pallo.pointOfView();
  l.pallo.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: pov.altitude * k }, 0);
  await new Promise((v) => setTimeout(v, 1200));
  l.ladoHeti();
  await new Promise((v) => setTimeout(v, 400));
}, kerroin);

/* ==================== PÄÄAJO: 390 px ja 1400 px ==================== */

/*
 * `sivuvara` ja `ylavara` ovat KUVAN rajaus, eivät mittaus: rajaus
 * jättää kuvaan ruudun vasemman alakulman paneeleineen.
 */
const RUUDUT = [
  { nimi: '390', leveys: 390, korkeus: 844, sivuvara: 90, ylavara: 200 },
  { nimi: '1400', leveys: 1400, korkeus: 900, sivuvara: 120, ylavara: 200 },
];

/*
 * Paneelin nurkka-marginaali on erästä 19b alkaen RUUDUN suhteen
 * (css .maapaneeli-nurkka .pallolauta-maapaneeli, `position: fixed`,
 * var(--gap) + 0,4rem + 1px ≈ 14,6 px). Vara 24 px kattaa myös
 * iPhonen turva-alueen.
 */
const NURKKA_VARA_PX = 24;

const sijaintiOk = [];
const paikallaanOk = [];
const kalusteLiikkui = [];
const valikkoOk = [];
const liikuOk = [];
const otsikkoTulokset = [];
let variVirheita = 0;
let variRiveja = 0;
let paaVirheet = [];

for (const ruutu of RUUDUT) {
  // eslint-disable-next-line no-await-in-loop
  const { ctx, sivu, virheet, auki } = await avaaPeli(ruutu);
  vaadi(`pallolauta aukesi (${ruutu.nimi} px)`, auki, virheet.join(' | '));
  if (!auki) { /* eslint-disable-next-line no-await-in-loop */ await ctx.close(); continue; }

  /* --- 1. paikka: ruudun vasen alakulma --------------------------- */
  // Ruutu asettuu ensin: kesken asettuva kotelo siirtäisi korttia (erä 19b).
  // eslint-disable-next-line no-await-in-loop
  await odotaAsettunut(sivu);
  // eslint-disable-next-line no-await-in-loop
  const ulko = await mittaaPaneeli(sivu);
  const ruudulla = Boolean(ulko.kortti
    && ulko.kortti.y0 >= -1 && ulko.kortti.y1 <= ulko.ruutu.h + 1
    && ulko.kortti.x0 >= -1 && ulko.kortti.x1 <= ulko.ruutu.w + 1);
  /*
   * NURKKA MITATAAN RUUDUSTA, EI KARTTARUUDUSTA (erä 19b). Kortti on
   * `position: fixed` eli ruudun vasemmassa alakulmassa; karttaruudun
   * oma laatikko elää saapumisen aikana eikä kelpaa ankkuriksi.
   */
  const nurkassa = Boolean(ulko.kortti
    && ulko.kortti.x0 <= NURKKA_VARA_PX
    && ulko.ruutu.h - ulko.kortti.y1 <= NURKKA_VARA_PX);
  /*
   * ERÄ 19b: KORKEUS ON 22 % RUUDUSTA (± 2 %-yksikköä), EI 10 %.
   * Omistajan päätös 15.9.2026 illalla: maainfo alkuperäiseen
   * LUETTAVAAN kokoon — 10 %:n katto kumoutuu tämän paneelin osalta.
   * Vara on ± 2 %-yksikköä, koska kerroin voi tulla leveysrajasta
   * (58 % ruudun leveydestä) hyvin kapealla ruudulla.
   */
  const osuus = ulko.kortti ? ulko.kortti.h / ulko.ruutu.h : 0;
  /*
   * 20…24 % ON OIKEA HAARUKKA EIKÄ HÖLLENNYS (mitattu 16.9.2026).
   * 390 px:n ruudulla sitova raja on LEVEYS (0,58 × 390 / 104 =
   * 2,175) eikä korkeus (0,22 × 844 / 82 = 2,264), joten kortin
   * korkeus on 21,1 % eikä tasan 22 %. Se on kaavan oikea tulos, ei
   * poikkeama: kapealla ruudulla kortti ei saa levitä yli 58 %:n
   * leveydestä. 1400 px:llä korkeusraja sitoo ja osuus on 22,0 %.
   */
  const luettava = osuus >= 0.20 && osuus <= 0.24;
  sijaintiOk.push({
    ruutu: ruutu.nimi,
    ok: nurkassa && ruudulla && luettava,
    nurkassa,
    ruudulla,
    luettava,
    osuus: Number(osuus.toFixed(4)),
  });
  tieto(`${ruutu.nimi} px · uloin zoomi`,
    `kortti ${ulko.kortti ? `${Math.round(ulko.kortti.w)} x ${Math.round(ulko.kortti.h)} px `
      + `(x ${Math.round(ulko.kortti.x0)}…${Math.round(ulko.kortti.x1)}, `
      + `y ${Math.round(ulko.kortti.y0)}…${Math.round(ulko.kortti.y1)})` : 'EI OLE'}, `
    + `vasen väli ruudusta ${ulko.kortti ? ulko.kortti.x0.toFixed(1) : '—'} px, `
    + `ala väli ruudusta ${ulko.kortti ? (ulko.ruutu.h - ulko.kortti.y1).toFixed(1) : '—'} px, `
    + `osuus ruudun korkeudesta `
    + `${ulko.kortti ? ((100 * ulko.kortti.h) / ulko.ruutu.h).toFixed(1) : '—'} %, `
    + `skaala ${ulko.skaala?.toFixed(3) ?? '—'}, korkeus ${ulko.korkeus?.toFixed(4) ?? '—'}`);

  /* --- 6. Liiku: kuultava sana alareunan keskellä ------------------ */
  const liiku = ulko.liiku;
  /*
   * ERÄ 19b: SANA ON YHÄ ALHAALLA JA KOKONAAN RUUDULLA. Väistö nostaa
   * sanaa vain sen verran kuin paneeli vaatii — mitattu 16.9.2026:
   * ilman tätä vartiota virheellinen väistömitta (978 px kesken
   * asettuvasta ruudusta) vei sanan ruudun yläpuolelle, ja kaikki muut
   * vartiot menivät silti läpi.
   */
  const liikuHyva = Boolean(liiku
    && liiku.laatikko.y0 >= 0 && liiku.laatikko.y1 <= ulko.ruutu.h + 1
    && liiku.laatikko.y0 > ulko.ruutu.h * 0.5
    && liiku.keskipoikkeama <= 8
    && /rgba\([^)]*,\s*0\)/.test(String(liiku.tausta))
    && liiku.reunus === '0px'
    && liiku.sana !== 'none' && liiku.sananLeveys > 4
    && liiku.sananPeitto >= 0.5 && liiku.sananPeitto <= 0.8
    && liiku.laatikko.w >= 32 && liiku.laatikko.h >= 32
    && !liiku.osuuPaneeliin && !liiku.osuuPuluun
    && !liiku.osuuLappuun && !liiku.osuuKaupunkikorttiin);
  liikuOk.push({ ruutu: ruutu.nimi, ok: liikuHyva, ...liiku });
  tieto(`${ruutu.nimi} px · Liiku`, liiku
    ? `keskipoikkeama ${liiku.keskipoikkeama.toFixed(1)} px, `
      + `laatikko ${Math.round(liiku.laatikko.w)} x ${Math.round(liiku.laatikko.h)}, `
      + `tausta ${liiku.tausta}, reunus ${liiku.reunus}, sana ${liiku.sana} `
      + `(peitto ${liiku.sananPeitto}), osumat paneeli ${liiku.osuuPaneeliin} `
      + `pulu ${liiku.osuuPuluun} lappu ${liiku.osuuLappuun} `
      + `kaupunkikortti ${liiku.osuuKaupunkikorttiin}`
    : 'EI OLE');
  tieto(`${ruutu.nimi} px · Liikun väistö`,
    `--liiku-pohja ${ulko.liikuPohja || '(ei asetettu)'}, `
    + `napin alareuna ruudun alareunasta `
    + `${liiku ? Math.round(ulko.ruutu.h - liiku.laatikko.y1) : '—'} px, `
    + `kortin yläreuna ruudun alareunasta `
    + `${ulko.kortti ? Math.round(ulko.ruutu.h - ulko.kortti.y0) : '—'} px`);
  tieto(`${ruutu.nimi} px · tekstikoot ruudulla`,
    `maan nimi ${ulko.tekstit?.nimi ?? '—'}, lukurivin otsikko `
    + `${ulko.tekstit?.otsikko ?? '—'}, valikon rivi ${ulko.tekstit?.aihe ?? '—'}`);
  tieto(`${ruutu.nimi} px · vastakoe D (pulun nappi keskellä?)`,
    `poikkeama ${ulko.pollonPoikkeama == null ? '—' : ulko.pollonPoikkeama.toFixed(1)} px`);

  if (KUVAKANSIO && ulko.kortti) {
    // eslint-disable-next-line no-await-in-loop
    await sivu.evaluate(() => window.matkakirja.ui.asetaPaivakirjanKoko(true));
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(500);
    const x = Math.max(0, Math.round(ulko.kortti.x0 - ruutu.sivuvara));
    const y = Math.max(0, Math.round(ulko.kortti.y0 - ruutu.ylavara));
    // eslint-disable-next-line no-await-in-loop
    await sivu.screenshot({
      path: join(KUVAKANSIO, `maainfo-alakulma-${ruutu.nimi}.png`),
      clip: {
        x,
        y,
        width: Math.min(ruutu.leveys - x, Math.round(ulko.kortti.w + 2 * ruutu.sivuvara)),
        height: Math.min(ruutu.korkeus - y, Math.round(ulko.kortti.y1 + 25 - y)),
      },
    });
  }

  /* --- 2. ei liiku eikä kasva zoomatessa (vastakoe C) -------------- */
  // eslint-disable-next-line no-await-in-loop
  await zoomaaSisaan(sivu, 0.5);
  // eslint-disable-next-line no-await-in-loop
  await odotaAsettunut(sivu, 6000);
  // eslint-disable-next-line no-await-in-loop
  const lahi = await mittaaPaneeli(sivu);
  const paikallaan = Boolean(ulko.kortti && lahi.kortti
    && Math.abs(lahi.kortti.x0 - ulko.kortti.x0) <= 1
    && Math.abs(lahi.kortti.y1 - ulko.kortti.y1) <= 1
    && Math.abs(lahi.kortti.w - ulko.kortti.w) <= 1
    && Math.abs(lahi.kortti.h - ulko.kortti.h) <= 1);
  paikallaanOk.push({ ruutu: ruutu.nimi, ok: paikallaan });
  const kylttiLiikkui = Boolean(ulko.karttapiste && lahi.karttapiste
    && (Math.abs(lahi.karttapiste.x0 - ulko.karttapiste.x0) > 1
      || Math.abs(lahi.karttapiste.y0 - ulko.karttapiste.y0) > 1));
  kalusteLiikkui.push({ ruutu: ruutu.nimi, ok: kylttiLiikkui });
  tieto(`${ruutu.nimi} px · lähempi zoomi`,
    `kortti ${lahi.kortti ? `${Math.round(lahi.kortti.w)} x ${Math.round(lahi.kortti.h)} px `
      + `(x ${Math.round(lahi.kortti.x0)}, alareuna y ${Math.round(lahi.kortti.y1)})` : 'EI OLE'}`
    + `, vastakoe C: Pariisin karttapiste ${ulko.karttapiste
      ? `${Math.round(ulko.karttapiste.x0)},${Math.round(ulko.karttapiste.y0)} → `
        + `${Math.round(lahi.karttapiste?.x0 ?? NaN)},${Math.round(lahi.karttapiste?.y0 ?? NaN)}`
      : 'ei pistettä'}`);

  /* --- 3. valikko plussan paikalle ja ylös kahteen sarakkeeseen ---- */
  // eslint-disable-next-line no-await-in-loop
  await zoomaaSisaan(sivu, 2); // takaisin uloimpaan
  // eslint-disable-next-line no-await-in-loop
  await sivu.click('.maapaneeli-lisaa');
  // eslint-disable-next-line no-await-in-loop
  await sivu.waitForTimeout(300);
  // eslint-disable-next-line no-await-in-loop
  const auki2 = await mittaaPaneeli(sivu);
  const valikkoHyva = Boolean(auki2.valikkoAuki && auki2.valikko && auki2.rivit >= 4
    // Alareuna plussan kohdalla eli kortin yläreunassa tai sen yllä.
    && auki2.valikko.y1 <= auki2.kortti.y0 + 2
    && auki2.sarakkeet >= 2
    && auki2.rivinKorkeus > 0
    && auki2.rivivali != null && auki2.rivivali <= auki2.rivinKorkeus * 1.5
    && auki2.valikko.y0 >= -1 && auki2.valikko.x0 >= -1
    && auki2.valikko.x1 <= auki2.ruutu.w + 1);
  valikkoOk.push({
    ruutu: ruutu.nimi,
    ok: valikkoHyva,
    sarakkeet: auki2.sarakkeet,
    rivivali: auki2.rivivali,
    rivinKorkeus: auki2.rivinKorkeus,
  });
  tieto(`${ruutu.nimi} px · valikko auki`,
    `rivejä ${auki2.rivit}, sarakkeita ${auki2.sarakkeet}, `
    + `rivinkorkeus ${auki2.rivinKorkeus?.toFixed(2) ?? '—'} px, `
    + `rivivali ${auki2.rivivali?.toFixed(2) ?? '—'} px `
    + `(suhde ${auki2.rivivali && auki2.rivinKorkeus
      ? (auki2.rivivali / auki2.rivinKorkeus).toFixed(2) : '—'}), `
    + `valikko x ${auki2.valikko ? `${Math.round(auki2.valikko.x0)}…${Math.round(auki2.valikko.x1)}` : '—'} `
    + `y ${auki2.valikko ? `${Math.round(auki2.valikko.y0)}…${Math.round(auki2.valikko.y1)}` : '—'}, `
    + `kortin yläreuna ${auki2.kortti ? Math.round(auki2.kortti.y0) : '—'}`);

  if (KUVAKANSIO && auki2.valikko) {
    // eslint-disable-next-line no-await-in-loop
    await sivu.screenshot({
      path: join(KUVAKANSIO, `maainfo-alakulma-${ruutu.nimi}-valikko.png`),
      clip: {
        x: 0,
        y: Math.max(0, Math.round(auki2.valikko.y0 - 30)),
        width: Math.min(ruutu.leveys, Math.round(auki2.valikko.x1 + 40)),
        height: Math.min(ruutu.korkeus, Math.round(ruutu.korkeus - auki2.valikko.y0 + 30)),
      },
    });
  }

  /* --- 4. jokainen otsikko avaa oman sivunsa ---------------------- */
  if (ruutu.nimi === '390') {
    /*
     * Napautukset tehdään VAIN kapealla ruudulla, koska ne ovat sama
     * DOM-polku molemmilla eikä lehden avaus riipu kuvasuhteesta —
     * ja koska kapea ruutu on se, jolla valikon on ahtainta mahtua.
     */
    // eslint-disable-next-line no-await-in-loop
    const rivit = await sivu.$$eval('.maapaneeli-valikko:not([hidden]) .maapaneeli-aihe',
      (nodet) => nodet.map((n) => ({
        id: n.dataset.aihe,
        nimi: n.querySelector('.maapaneeli-aihe-nimi')?.textContent ?? '',
        vari: getComputedStyle(n.querySelector('.maapaneeli-aihe-merkki')).backgroundColor,
      })));
    tieto('Ranskan valikon otsikot', rivit.map((r) => r.nimi).join(' · ') || 'EI YHTÄÄN');

    /*
     * VÄRIT OVAT KARTAN OMAT. Sallittu joukko luetaan juuresta
     * (--sym-*), joten koe kaatuu heti, jos valikkoon ilmestyy väri,
     * jota kartalla ei ole.
     */
    // eslint-disable-next-line no-await-in-loop
    const sallitut = await sivu.evaluate(() => {
      const juuri = getComputedStyle(document.documentElement);
      const nimet = ['historia', 'ruoka', 'kulttuuri', 'luonto', 'elain', 'urheilu',
        'tekniikka', 'kauppa', 'sana', 'merenkulku', 'kaupunki', 'hetki', 'silma'];
      const muunna = (arvo) => {
        const d = document.createElement('div');
        d.style.color = arvo;
        document.body.appendChild(d);
        const v = getComputedStyle(d).color;
        d.remove();
        return v;
      };
      return nimet.map((n) => muunna(juuri.getPropertyValue(`--sym-${n}`).trim()));
    });
    variRiveja += rivit.length;
    for (const r of rivit) if (!sallitut.includes(r.vari)) variVirheita += 1;

    for (const rivi of rivit) {
      /* eslint-disable no-await-in-loop */
      await sivu.click(`.maapaneeli-aihe[data-aihe="${rivi.id}"]`);
      await sivu.waitForTimeout(500);
      const tulos = await sivu.evaluate(() => {
        const { ui } = window.matkakirja;
        const i = ui.lehtitila.tutkiSivu;
        const sivut = ui.lehtitila.tutkiSivut ?? [];
        return {
          auki: Boolean(ui.arrivalDialog?.open),
          maa: ui.lehtitila.tutkiMaaLehti,
          sivu: i,
          id: sivut[i - 1]?.id ?? null,
          otsikko: sivut[i - 1]?.nimi ?? null,
        };
      });
      otsikkoTulokset.push({ pyydetty: rivi.id, ...tulos });
      tieto(`otsikko "${rivi.nimi}"`,
        `lehti auki ${tulos.auki}, maa ${tulos.maa}, sivu ${tulos.sivu} = ${tulos.id}`);
      /*
       * Lehti kiinni ja valikko auki seuraavaa riviä varten. Sulku
       * tehdään dialogin omalla metodilla eikä Escillä: modaali
       * dialogi nielee näppäimen lukijan ja sivunkäännön kuuntelijoihin
       * eikä sulkeudu joka kerta, ja silloin seuraava napautus osuisi
       * lehden tekstiin.
       */
      await sivu.evaluate(() => window.matkakirja.ui.arrivalDialog?.close());
      await sivu.waitForTimeout(500);
      const valikkoAuki = await sivu.evaluate(
        () => !document.querySelector('.maapaneeli-valikko')?.hidden,
      );
      if (!valikkoAuki) {
        await sivu.click('.maapaneeli-lisaa');
        await sivu.waitForTimeout(200);
      }
      /* eslint-enable no-await-in-loop */
    }
  }

  paaVirheet = paaVirheet.concat(virheet);
  // eslint-disable-next-line no-await-in-loop
  await ctx.close();
}

vaadi('1. paneeli on RUUDUN VASEMMASSA ALAKULMASSA, kokonaan ruudulla ja 22 % '
  + '(± 2 %-yks.) ruudun korkeudesta (390 px ja 1400 px)',
sijaintiOk.length === RUUDUT.length && sijaintiOk.every((t) => t.ok),
`tulokset ${JSON.stringify(sijaintiOk)}`);
vaadi('2. paneeli EI liiku eikä kasva zoomatessa (nurkka ja koko ±1 px)',
  paikallaanOk.length === RUUDUT.length && paikallaanOk.every((t) => t.ok),
  `tulokset ${JSON.stringify(paikallaanOk)}`);
vaadi('VASTAKOE C: kartan oma piste (Pariisi) SIIRTYY samassa zoomissa',
  kalusteLiikkui.length === RUUDUT.length && kalusteLiikkui.every((t) => t.ok),
  `tulokset ${JSON.stringify(kalusteLiikkui)}`);
vaadi('3. valikko aukeaa plussan paikalle YLÖS, ≥ 2 saraketta, rivivali ≤ 1,5 × rivinkorkeus, '
  + 'kokonaan ruudulla',
valikkoOk.length === RUUDUT.length && valikkoOk.every((t) => t.ok),
`tulokset ${JSON.stringify(valikkoOk)}`);

const otsikotOsui = otsikkoTulokset.filter(
  (t) => t.auki && t.maa === 'FRA' && t.id === t.pyydetty,
).length;
vaadi('4. jokainen valikon otsikko avaa maalehden OMAN sivunsa',
  otsikkoTulokset.length >= 8 && otsikotOsui === otsikkoTulokset.length,
  `otsikoita ${otsikkoTulokset.length}, oikein ${otsikotOsui}: `
  + JSON.stringify(otsikkoTulokset.filter((t) => t.id !== t.pyydetty)));
vaadi('5. valikon värit ovat kartan omia --sym-sävyjä (ei uusia kirkkaita)',
  variRiveja >= 8 && variVirheita === 0, `rivejä ${variRiveja}, vieraita värejä ${variVirheita}`);
vaadi('6. Liiku on kuultava sana ruudun alareunan keskellä, läpinäkyvä, ei päällekkäisyyksiä',
  liikuOk.length === RUUDUT.length && liikuOk.every((t) => t.ok),
  `tulokset ${JSON.stringify(liikuOk.map((t) => ({
    ruutu: t.ruutu,
    ok: t.ok,
    poikkeama: t.keskipoikkeama,
    tausta: t.tausta,
    reunus: t.reunus,
    peitto: t.sananPeitto,
    laatikko: t.laatikko,
    osumat: [t.osuuPaneeliin, t.osuuPuluun, t.osuuLappuun, t.osuuKaupunkikorttiin],
  })))}`);
tieto('sivun virheet (pääajo)', paaVirheet.length ? paaVirheet.join(' | ') : 'ei yhtään');
vaadi('7. pääajo ei tuottanut sivuvirheitä', paaVirheet.length === 0, paaVirheet.join(' | '));

/* ==================== VASTAKOE A: maa ilman aiheita ================ */

poistaKategoriat = 'FRA';
{
  const { ctx, sivu, virheet, auki } = await avaaPeli({ leveys: 390, korkeus: 844 });
  const tulos = auki ? await sivu.evaluate(() => ({
    kortti: Boolean(document.querySelector('.maapaneeli-kortti')),
    lisaa: Boolean(document.querySelector('.maapaneeli-lisaa:not([hidden])')),
    rivit: document.querySelectorAll('.maapaneeli-aihe').length,
    nimi: document.querySelector('.maapaneeli-nimi-suomi')?.textContent ?? '',
  })) : null;
  tieto('vastakoe A (Ranska ilman MAA_KATEGORIAT-riviä)',
    tulos ? `kortti ${tulos.kortti} ("${tulos.nimi}"), Lisää-nappi ${tulos.lisaa}, `
      + `valikkorivejä ${tulos.rivit}, virheitä ${virheet.length}` : 'lauta ei auennut');
  vaadi('VASTAKOE A: maa ilman aiheita → paneeli on, valikkoa ei, peli ei kaadu',
    Boolean(auki && tulos?.kortti && !tulos.lisaa && tulos.rivit === 0 && virheet.length === 0),
    JSON.stringify({ auki, tulos, virheet }));
  await ctx.close();
}
poistaKategoriat = null;

/* ============ VASTAKOE B: paneeli puretaan kokonaan ================ */
/*
 * `?maapaneeli=nurkka` asettaa js/fokusmitat.js MAAPANEELI_KARTASSA
 * -lipun epätodeksi, jolloin `luoMaapaneeli.paivita` purkaa kortin ja
 * VANHA kartuutsi-nurkkataulu (.fokus-kartuutsi) palaa tilalle.
 * VÄITTEEN 1 ON KAADUTTAVA: korttia ei ole, joten mitään ei voi mitata
 * ruudun vasempaan alakulmaan. Jos väite menisi silti läpi, se ei
 * mittaisi paneelia vaan jotain muuta.
 */
{
  const { ctx, sivu, auki } = await avaaPeli({
    leveys: 390, korkeus: 844, lisaparametrit: '&maapaneeli=nurkka',
  });
  if (auki) await odotaAsettunut(sivu, 6000);
  const ulko = auki ? await mittaaPaneeli(sivu) : null;
  const vaite1 = Boolean(ulko?.onKortti && ulko.kortti
    && ulko.kortti.x0 <= NURKKA_VARA_PX
    && ulko.ruutu.h - ulko.kortti.y1 <= NURKKA_VARA_PX);
  tieto('vastakoe B (?maapaneeli=nurkka)',
    `kortti ${Boolean(ulko?.onKortti)}, vanha nurkkataulu ${Boolean(ulko?.nurkassa)}, `
    + `väite 1 ${vaite1 ? 'LÄPI (paha)' : 'PUNAINEN'}`);
  vaadi('VASTAKOE B: ilman paneelia sijaintiväite kaatuu ja vanha nurkkataulu palaa',
    Boolean(auki) && !vaite1 && Boolean(ulko?.nurkassa),
    JSON.stringify({ auki, vaite1, nurkassa: ulko?.nurkassa }));
  /*
   * VASTAKOE D samalla ruudulla: väitteen 6 keskitysmitta ajetaan
   * pulun nappiin, joka on tarkoituksella kulmassa. Sen ON kaaduttava.
   */
  vaadi('VASTAKOE D: pulun nappi EI ole ruudun keskilinjalla (keskitysmitta kaatuu)',
    ulko?.pollonPoikkeama != null && ulko.pollonPoikkeama > 8,
    `poikkeama ${ulko?.pollonPoikkeama}`);
  await ctx.close();
}

/* ====== VASTAKOE E: pieni koko takaisin (10 % / 28 %) ============== */
/*
 * Erän 19 ensimmäinen mitoitus palautetaan palvelimessa. VÄITTEEN 1
 * KOKO-OSAN ON KAADUTTAVA: kortti on silloin 10 % ruudun korkeudesta
 * eikä 22 %. Jos väite menisi silti läpi, se ei mittaisi kokoa.
 */
{
  vastakoe = 'PIENI_KOKO';
  const { ctx, sivu, auki } = await avaaPeli({ leveys: 390, korkeus: 844 });
  if (auki) await odotaAsettunut(sivu);
  const m = auki ? await mittaaPaneeli(sivu) : null;
  vastakoe = null;
  const osuus = m?.kortti ? m.kortti.h / m.ruutu.h : 0;
  tieto('vastakoe E (nurkan katot 10 % / 28 %)',
    `kortti ${m?.kortti ? `${Math.round(m.kortti.w)} x ${Math.round(m.kortti.h)} px` : 'EI OLE'}, `
    + `osuus ${(100 * osuus).toFixed(1)} %`);
  vaadi('VASTAKOE E: pienellä katolla LUETTAVAN KOON väite kaatuu',
    Boolean(auki && m?.kortti) && !(osuus >= 0.20 && osuus <= 0.24),
    JSON.stringify({ auki, osuus }));
  await ctx.close();
}

/* ====== VASTAKOE F: Liiku ei väistä paneelia ====================== */
/*
 * `bottom: max(..., var(--liiku-pohja))` palautetaan pelkäksi
 * perusväliksi, jolloin sana jää ruudun alalaitaan ison paneelin
 * päälle 390 px:n ruudulla. VÄITTEEN 6 PÄÄLLEKKÄISYYSOSAN ON
 * KAADUTTAVA — muuten väistö ei todista mitään.
 */
{
  vastakoe = 'EI_VAISTOA';
  const { ctx, sivu, auki } = await avaaPeli({ leveys: 390, korkeus: 844 });
  if (auki) await odotaAsettunut(sivu);
  const m = auki ? await mittaaPaneeli(sivu) : null;
  vastakoe = null;
  tieto('vastakoe F (ei väistöä)',
    `Liiku y ${m?.liiku ? `${Math.round(m.liiku.laatikko.y0)}…${Math.round(m.liiku.laatikko.y1)}` : '—'}, `
    + `kortti y ${m?.kortti ? `${Math.round(m.kortti.y0)}…${Math.round(m.kortti.y1)}` : '—'}, `
    + `osuu paneeliin ${m?.liiku?.osuuPaneeliin}`);
  vaadi('VASTAKOE F: ilman väistöä Liiku OSUU paneeliin (390 px)',
    Boolean(auki && m?.liiku?.osuuPaneeliin),
    JSON.stringify({ auki, osuu: m?.liiku?.osuuPaneeliin }));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
