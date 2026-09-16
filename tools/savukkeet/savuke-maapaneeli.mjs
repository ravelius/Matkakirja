/*
 * Savuke: MAAINFO 27.8.2026 ASUSSA — EI LAATIKKOA, NIMI AVAA (erä 20).
 *
 * === MITÄ TÄMÄ VARTIOI =============================================
 *
 * Raamattu, KARTTAUUDISTUKSEN PÄÄTÖKSET 28 TARKENNUS 2 (omistaja
 * 16.9.2026 klo 10.45 UTC, iPad-kuva 27.8.2026 Kreikasta,
 * sanatarkasti): *"se maainfon vanha versio oli sellainen missa ei ole
 * tuota valkoista taustaa. Muistatko minkalainen se oli?"* ja
 * kysymyskortilla: *"nakyisi vain nimi ja alarivi ja klikkaamalla sita
 * tulisi perustiedot seka otsikot kahdessa rivissa perustietojen
 * ylapuolelle. kaikki samalla fontilla"*.
 *
 * TARKENNUS 3 (omistaja 16.9.2026 kortilla): kategoriaotsikot PELKKÄNÄ
 * TEKSTINÄ — harvennetut kapiteelit, erottimena välipiste " · " kuten
 * alarivissä, EI väripalloja; valittu otsikko erottuu vain ohuella
 * alleviivauksella aiheen omassa --sym-sävyssä.
 *
 * KUMOUTUNEET VARTIOT (erät 3–19, tässä samassa tiedostossa):
 *
 *   - "kortin korkeus on 22 % ruudun korkeudesta" ja sen vastakoe E
 *     (nurkan katot 10 % / 28 %) — kalusteella ei ole enää laatikkoa
 *     eikä `nurkanSkaala`-mittakaavaa, joten korkeus on sen sisältö.
 *   - "valikko aukeaa plussan paikalle ylös KAHTEEN SARAKKEESEEN" —
 *     plus-nappi on poistettu ja otsikot ovat kahdella VAAKARIVILLÄ.
 *   - "valikon värit ovat kartan omia --sym-sävyjä" väripalloina —
 *     palloja ei ole; väri on vain valitun otsikon alleviivauksessa.
 *
 * Väitteet:
 *
 *   1. LEVOSSA VAIN NIMI, VIIVA JA ALARIVI — EI TAUSTAA. Kaluste on
 *      ruudun vasemmassa alakulmassa ja kokonaan ruudulla; näkyviä
 *      tekstirivejä on TÄSMÄLLEEN kaksi (nimi ja alarivi) ja niiden
 *      välissä viiva; perustiedot ja otsikot ovat piilossa;
 *      plus-nappia (.maapaneeli-lisaa) EI OLE; jokaisen osan laskettu
 *      taustaväri on alpha 0, taustakuva `none`, `box-shadow` `none` ja
 *      reunus 0 px.
 *   2. NAPAUTUS NIMEEN AVAA, UUSI SULKEE. Auki: kategoriaotsikot
 *      KAHDELLA rivillä (mitattuja y-rivejä ≤ 2), perustiedot niiden
 *      ALAPUOLELLA ja nimen YLÄPUOLELLA, kaikki kokonaan ruudulla ja
 *      yhä ilman taustaa. Toinen napautus palauttaa levon.
 *   3. KAIKKI SAMALLA FONTILLA (omistajan sana): nimi, alarivi,
 *      perustiedot ja otsikot jakavat saman `font-family`n.
 *   4. OTSIKOT OVAT PELKKÄÄ TEKSTIÄ (TARKENNUS 3): väripallo-
 *      elementtejä 0 kpl, erottimet ovat välipisteitä " · ",
 *      otsikot ovat kapiteeleja ja harvennettuja (letter-spacing
 *      ≥ 0,1 em).
 *   5. KALUSTE EI LIIKU EIKÄ KASVA ZOOMATESSA (nurkka ja koko ±1 px).
 *      VASTAKOE C: kartan oma piste, jonka ON liikuttava.
 *   6. RULLA MENEE KALUSTEEN LÄPI KARTALLE (PÄÄTÖKSET 21): ctrl-rulla
 *      kalusteen päältä muuttaa kameran korkeutta saman verran kuin
 *      SAMASTA pisteestä ilman kalustetta (suhde 1,0 ± 10 %).
 *   7. JOKAINEN OTSIKKO AVAA OMAN SIVUNSA (ennallaan).
 *   8. LIIKU ON KUULTAVA SANA RUUDUN ALAREUNAN KESKELLÄ (PÄÄTÖKSET 28
 *      kohta 3) eikä osu kalusteeseen — ei levossa eikä avattuna.
 *      Avattuna kaluste yltää 390 px:n ruudulla keskilinjalle, jolloin
 *      sana NOUSEE sen yläreunan tasalle (--liiku-pohja).
 *
 * === VASTAKOKEET (pakolliset) ======================================
 *
 *   A. MAA ILMAN MAA_KATEGORIAT-RIVIÄ. Kaluste on yhä nurkassa, mutta
 *      otsikkorivejä ei ole eikä sivulle tule virhettä.
 *   B. `?maapaneeli=nurkka` PURKAA KALUSTEEN KOKONAAN (js/fokusmitat.js
 *      MAAPANEELI_KARTASSA = false → vanha kartuutsi-nurkkataulu).
 *      Väitteen 1 ON kaaduttava: kalustetta ei ole.
 *   C. KARTAN KALUSTE LIIKKUU. Pariisin karttapiste samalla zoomilla
 *      kuin väite 5 — sen ON muututtava.
 *   D. PULUN NAPPI EI OLE KESKELLÄ. Väitteen 8 keskitysmitta ajetaan
 *      `.pollo-nappi`iin; sen ON kaaduttava.
 *   E. LAATIKKO TAKAISIN. Palvelin maalaa kalusteelle kermapohjan,
 *      reunuksen ja varjon. Väitteen 1 TAUSTAOSAN ON kaaduttava.
 *   F. LIIKU EI VÄISTÄ. `bottom: max(…, var(--liiku-pohja))`
 *      palautetaan perusväliksi; sanan ON osuttava AVATTUUN
 *      kalusteeseen 390 px:n ruudulla, tai väistö ei todista mitään.
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
 * VASTAKOKEIDEN KYTKIN:
 *
 *   'LAATIKKO'     — kalusteelle maalataan takaisin kermapohja, reunus
 *                    ja varjo (erän 19 kortti). VÄITTEEN 1 TAUSTAOSAN
 *                    ON KAADUTTAVA.
 *   'EI_VAISTOA'   — Liiku-napin `bottom: max(..., var(--liiku-pohja))`
 *                    palautetaan pelkäksi perusväliksi, jolloin sana
 *                    jää ruudun alalaitaan avatun kalusteen päälle.
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
  if (vastakoe === 'LAATIKKO' && polkuOsa.endsWith('/css/styles.css')) {
    runko = Buffer.concat([runko, Buffer.from('\n.maapaneeli-kortti {'
      + ' background: var(--kerma) !important;'
      + ' border: 1px solid var(--map-ink) !important;'
      + ' box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;'
      + ' padding: 8px 9px !important; }\n')]);
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
        + ' { display: none !important; }'
        /*
         * LUENNAN HUNTU POIS MYÖS. `body.luenta-huntu .map-pane::after`
         * (css/fokusvirta.css) sumentaa ja tummentaa koko karttaruudun
         * luennan ajaksi — ja headless-ajossa kertoja ei koskaan
         * vaikene, joten huntu jää päälle. Se peittää myös kalusteen,
         * eikä mittaus (tai kuva) kertoisi kalusteen omasta ulkoasusta
         * mitään. Huntu on OMA vartionsa (savuke-pulun-kuvat).
         */
        + ' body.luenta-huntu .map-pane::after { display: none !important; }',
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
 * Yksi mittaus: kaluste, sen osat, otsikot, Liiku ja kartan oma
 * vertailupiste.
 *
 * KAIKKI LUETAAN LIVENÄ RUUDUN PIKSELEINÄ. Kaluste ei ole kartan datum
 * (erä 19) eikä enää skaalattu kortti (erä 20), joten mitään ei
 * projisoida eikä kerrota mittakaavalla — mitataan vain se, mitä
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
  const kaluste = document.querySelector('.maapaneeli-kortti');
  const r = kaluste?.getBoundingClientRect() ?? null;
  const kotelo = l.kotelo.getBoundingClientRect();

  /*
   * POHJATTOMUUS MITATAAN LASKETUSTA TYYLISTÄ, EI LÄHDEKOODISTA.
   * Jokainen osa erikseen: jos vaikka valikko saisi laatikon takaisin,
   * kalusteen runko ei sitä kertoisi.
   */
  const pohja = (q) => {
    const e = document.querySelector(q);
    if (!e) return null;
    const t = getComputedStyle(e);
    return {
      tausta: t.backgroundColor,
      kuva: t.backgroundImage,
      varjo: t.boxShadow,
      reunus: `${t.borderTopWidth} ${t.borderRightWidth} `
        + `${t.borderBottomWidth} ${t.borderLeftWidth}`,
    };
  };
  const OSAT = ['.maapaneeli-kortti', '.maapaneeli-avain', '.maapaneeli-sisus',
    '.maapaneeli-valikko', '.maapaneeli-rivit', '.maapaneeli-aihe'];
  const pohjat = Object.fromEntries(OSAT.map((q) => [q, pohja(q)]));

  const nakyy = (q) => {
    const e = document.querySelector(q);
    if (!e) return false;
    const k = e.getBoundingClientRect();
    return k.width > 0 && k.height > 0;
  };
  /* Näkyvät tekstirivit: eri y-alkukohdat kalusteen sisällä. */
  const tekstisolmut = kaluste
    ? [...kaluste.querySelectorAll('.maapaneeli-nimi-suomi, .maapaneeli-alarivi,'
      + ' .maapaneeli-otsikko, .maapaneeli-arvo, .maapaneeli-aihe')]
      .filter((e) => {
        const k = e.getBoundingClientRect();
        return k.width > 0 && k.height > 0;
      })
    : [];
  const tekstirivit = [...new Set(tekstisolmut.map((e) => Math.round(
    e.getBoundingClientRect().top / 2,
  )))].length;

  const otsikkoSolmut = [...document.querySelectorAll(
    '.maapaneeli-valikko:not([hidden]) .maapaneeli-aihe',
  )];
  const otsikot = otsikkoSolmut.map((n) => {
    const k = n.getBoundingClientRect();
    const t = getComputedStyle(n);
    return {
      id: n.dataset.aihe,
      nimi: n.querySelector('.maapaneeli-aihe-nimi')?.textContent ?? '',
      x: k.left, y: k.top, w: k.width, h: k.height,
      perhe: t.fontFamily,
      koko: parseFloat(t.fontSize),
      harvennus: parseFloat(t.letterSpacing) / (parseFloat(t.fontSize) || 1),
      kapiteeli: t.textTransform,
      valittu: n.classList.contains('on'),
      alleviivaus: getComputedStyle(n.querySelector('.maapaneeli-aihe-nimi')).borderBottomColor,
    };
  });
  // Otsikkorivi = eri y-alku (2 px:n tarkkuudella).
  const otsikkorivit = [...new Set(otsikot.map((k) => Math.round(k.y / 2)))].length;
  const erottimet = [...document.querySelectorAll('.maapaneeli-erotin')]
    .map((n) => (n.textContent ?? '').trim());
  const pallot = document.querySelectorAll(
    '.maapaneeli-aihe-merkki, .valikko-pallo, .maapaneeli-valikko svg',
  ).length;

  const perheet = {
    nimi: nakyy('.maapaneeli-nimi-suomi')
      ? getComputedStyle(document.querySelector('.maapaneeli-nimi-suomi')).fontFamily : null,
    alarivi: document.querySelector('.maapaneeli-nimi-oma')
      ? getComputedStyle(document.querySelector('.maapaneeli-nimi-oma')).fontFamily : null,
    otsikko: document.querySelector('.maapaneeli-otsikko')
      ? getComputedStyle(document.querySelector('.maapaneeli-otsikko')).fontFamily : null,
    arvo: document.querySelector('.maapaneeli-arvo')
      ? getComputedStyle(document.querySelector('.maapaneeli-arvo')).fontFamily : null,
    aihe: otsikot.length ? otsikot[0].perhe : null,
  };
  const koot = {
    nimi: document.querySelector('.maapaneeli-nimi-suomi')
      ? getComputedStyle(document.querySelector('.maapaneeli-nimi-suomi')).fontSize : null,
    harvennus: document.querySelector('.maapaneeli-nimi-suomi')
      ? getComputedStyle(document.querySelector('.maapaneeli-nimi-suomi')).letterSpacing : null,
    alarivi: document.querySelector('.maapaneeli-nimi-oma')
      ? getComputedStyle(document.querySelector('.maapaneeli-nimi-oma')).fontSize : null,
    aika: document.querySelector('.maapaneeli-aika')
      ? getComputedStyle(document.querySelector('.maapaneeli-aika')).fontSize : null,
    lukurivi: document.querySelector('.maapaneeli-arvo')
      ? getComputedStyle(document.querySelector('.maapaneeli-arvo')).fontSize : null,
    otsikko: otsikot.length ? `${otsikot[0].koko}px` : null,
  };

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
    onKortti: Boolean(kaluste),
    kortti: korttiLaatikko,
    avain: laatikko('.maapaneeli-avain'),
    nimi: laatikko('.maapaneeli-nimi-suomi'),
    viiva: laatikko('.maapaneeli-viiva'),
    alarivi: laatikko('.maapaneeli-alarivi'),
    perustiedot: nakyy('.maapaneeli-rivit') ? laatikko('.maapaneeli-rivit') : null,
    perustietoja: document.querySelectorAll('.maapaneeli-rivit dt').length,
    plussia: document.querySelectorAll('.maapaneeli-lisaa').length,
    kehyksia: document.querySelectorAll('.maapaneeli-kehys').length,
    tekstirivit,
    pohjat,
    perheet,
    koot,
    kotelo: {
      w: kotelo.width, h: kotelo.height, x0: kotelo.left, y0: kotelo.top,
      x1: kotelo.right, y1: kotelo.bottom,
    },
    ruutu: { w: globalThis.innerWidth, h: globalThis.innerHeight },
    korkeus: l.pallo.pointOfView()?.altitude ?? null,
    valikkoAuki: Boolean(l.maapaneeli?.valikkoAuki?.()),
    valikko: nakyy('.maapaneeli-valikko') ? laatikko('.maapaneeli-valikko') : null,
    otsikot,
    otsikkorivit,
    erottimet,
    pallot,
    /*
     * VASTAKOE C: kartan oma piste, jonka ON liikuttava zoomatessa.
     * Pariisin ruutukoordinaatti pallon omalla projektiolla — DOM-merkki
     * ei kelpaa vertailuun, koska kerros voi ladata merkkinsä uudestaan.
     */
    karttapiste: (() => {
      const pp = l.pallo.getScreenCoords(48.8566, 2.3522, 0);
      return pp ? { x0: pp.x, y0: pp.y } : null;
    })(),
    /*
     * Väite 8 ja vastakoe D. NOLLAN KOKOINEN LAATIKKO EI OLE MITTA:
     * luennan ajaksi nappi on `display: none`, jolloin se löytyy DOM:sta
     * mutta sen ruutulaatikko on pelkkiä nollia.
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
    liikuPohja: getComputedStyle(document.documentElement)
      .getPropertyValue('--liiku-pohja').trim(),
    pollonPoikkeama: (() => {
      const k = document.querySelector('.pollo-nappi')?.getBoundingClientRect();
      return k ? Math.abs((k.left + k.width / 2) - globalThis.innerWidth / 2) : null;
    })(),
    // Nurkkatilan kaluste (vastakoe B): sama tieto samalta ruudulta.
    nurkassa: Boolean(document.querySelector('.fokus-kartuutsi')
      && !document.querySelector('.fokusmitat')?.hidden),
  };
});

/** Onko laskettu taustaväri läpinäkyvä? */
const lapinakyva = (arvo) => /rgba\([^)]*,\s*0\)/.test(String(arvo))
  || String(arvo) === 'transparent';

/** Onko yksi osa täysin pohjaton (tausta, kuva, varjo, reunus)? */
const pohjaton = (o) => Boolean(o && lapinakyva(o.tausta) && o.kuva === 'none'
  && o.varjo === 'none' && /^0px 0px 0px 0px$/.test(o.reunus));

/** Kaikki mitatut osat pohjattomia? */
const kaikkiPohjattomia = (pohjat) => Object.values(pohjat)
  .filter(Boolean).every(pohjaton);

/*
 * NAPAUTUS ON RUUTUPISTE, EI `page.click(valitsin)`.
 *
 * Kaluste on `pointer-events: none` (PÄÄTÖKSET 21), joten Playwrightin
 * valitsinnapautus jäisi odottamaan osumaa ikuisesti. Napautus tehdään
 * siis samalla tavalla kuin sormella: ruudun koordinaatteihin. Juuri
 * se onkin mitattava asia — osumatestin on poimittava napautus,
 * vaikka osumakohde on kartta.
 */
const napautaKohtaa = async (sivu, laatikko) => {
  if (!laatikko) return false;
  await sivu.mouse.click(
    Math.round(laatikko.x0 + laatikko.w / 2),
    Math.round(laatikko.y0 + laatikko.h / 2),
  );
  await sivu.waitForTimeout(400);
  return true;
};

/** Zoom sisään: sama keskipiste, puolet korkeudesta. */
const zoomaaSisaan = (sivu, kerroin) => sivu.evaluate(async (k) => {
  const l = window.matkakirja.ui.pallolauta;
  const pov = l.pallo.pointOfView();
  l.pallo.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: pov.altitude * k }, 0);
  await new Promise((v) => setTimeout(v, 1200));
  l.ladoHeti();
  await new Promise((v) => setTimeout(v, 400));
}, kerroin);

/*
 * VÄITE 6: CTRL-RULLA MENEE KALUSTEEN LÄPI (PÄÄTÖKSET 21).
 *
 * MIKSI CTRL-RULLA: pallon eleissä (js/pallo.js) paljas rulla PANOROI
 * ja ctrl/cmd-rulla ZOOMAA — ctrl-rulla on myös trackpadin nipistys.
 * Panorointi kuuntelee kotelon kaappausvaiheessa ja toimisi kalusteen
 * päälläkin; zoomin ottaa vastaan OrbitControlsin oma kuuntelija
 * KANKAALLA, joten se jää saamatta, jos kaluste on osumakohde.
 *
 * MITTA ON SUHTEELLINEN JA SAMASTA PISTEESTÄ: Globe.gl zoomaa
 * osoittimen kohtaa kohti, joten vertailu on otettava samasta
 * ruutupisteestä samalla sivulla — ainoa ero on, onko kaluste siinä.
 */
const rullaa = async (sivu, x, y, pykalia = 6) => {
  const lue = () => sivu.evaluate(
    () => window.matkakirja.ui.pallolauta.pallo.pointOfView().altitude,
  );
  const ennen = await lue();
  await sivu.keyboard.down('Control');
  await sivu.mouse.move(x, y);
  for (let i = 0; i < pykalia; i += 1) {
    await sivu.mouse.wheel(0, -120); // eslint-disable-line no-await-in-loop
    await sivu.waitForTimeout(30); // eslint-disable-line no-await-in-loop
  }
  await sivu.keyboard.up('Control');
  await sivu.waitForTimeout(800);
  const jalkeen = await lue();
  return { ennen, jalkeen, muutos: ennen - jalkeen };
};

/** Kamera takaisin saapumisnäkymään mittausten väliin. */
const palautaNakyma = async (sivu) => {
  await sivu.evaluate(async () => {
    await window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 });
  }).catch(() => {});
  await sivu.waitForTimeout(1200).catch(() => {});
};

/* ==================== PÄÄAJO: 390 px ja 1400 px ==================== */

/*
 * `sivuvara` ja `ylavara` ovat KUVAN rajaus, eivät mittaus: rajaus
 * jättää kuvaan ruudun vasemman alakulman kalusteineen.
 */
const RUUDUT = [
  { nimi: '390', leveys: 390, korkeus: 844, sivuvara: 60, ylavara: 120 },
  { nimi: '1400', leveys: 1400, korkeus: 900, sivuvara: 120, ylavara: 160 },
];

/*
 * Nurkka-marginaali on RUUDUN suhteen (css .maapaneeli-nurkka
 * .pallolauta-maapaneeli, `position: fixed`, var(--gap) + 0,4rem + 1px
 * ≈ 14,6 px). Vara 24 px kattaa myös iPhonen turva-alueen.
 */
const NURKKA_VARA_PX = 24;

const levossaOk = [];
const avautuuOk = [];
const fonttiOk = [];
const tekstiOtsikotOk = [];
const paikallaanOk = [];
const kalusteLiikkui = [];
const lapiOk = [];
const liikuOk = [];
const otsikkoTulokset = [];
let paaVirheet = [];

for (const ruutu of RUUDUT) {
  // eslint-disable-next-line no-await-in-loop
  const { ctx, sivu, virheet, auki } = await avaaPeli(ruutu);
  vaadi(`pallolauta aukesi (${ruutu.nimi} px)`, auki, virheet.join(' | '));
  if (!auki) { /* eslint-disable-next-line no-await-in-loop */ await ctx.close(); continue; }

  /* --- 1. levossa vain nimi, viiva ja alarivi, ei taustaa ---------- */
  // eslint-disable-next-line no-await-in-loop
  await odotaAsettunut(sivu);
  // eslint-disable-next-line no-await-in-loop
  const lepo = await mittaaPaneeli(sivu);
  const ruudulla = Boolean(lepo.kortti
    && lepo.kortti.y0 >= -1 && lepo.kortti.y1 <= lepo.ruutu.h + 1
    && lepo.kortti.x0 >= -1 && lepo.kortti.x1 <= lepo.ruutu.w + 1);
  const nurkassa = Boolean(lepo.kortti
    && lepo.kortti.x0 <= NURKKA_VARA_PX
    && lepo.ruutu.h - lepo.kortti.y1 <= NURKKA_VARA_PX);
  const viivaOk = Boolean(lepo.viiva && lepo.viiva.h >= 0.5 && lepo.viiva.w > 0
    && lepo.nimi && lepo.alarivi
    && lepo.viiva.y0 >= lepo.nimi.y1 - 1 && lepo.viiva.y1 <= lepo.alarivi.y0 + 1);
  const levossaHyva = Boolean(lepo.onKortti && nurkassa && ruudulla && viivaOk
    && lepo.tekstirivit === 2
    && !lepo.perustiedot && !lepo.valikko
    && lepo.plussia === 0 && lepo.kehyksia === 0
    && kaikkiPohjattomia(lepo.pohjat));
  levossaOk.push({
    ruutu: ruutu.nimi,
    ok: levossaHyva,
    nurkassa,
    ruudulla,
    viivaOk,
    tekstirivit: lepo.tekstirivit,
    plussia: lepo.plussia,
    pohjaton: kaikkiPohjattomia(lepo.pohjat),
  });
  tieto(`${ruutu.nimi} px · levossa`,
    `kaluste ${lepo.kortti ? `${Math.round(lepo.kortti.w)} x ${Math.round(lepo.kortti.h)} px `
      + `(x ${Math.round(lepo.kortti.x0)}…${Math.round(lepo.kortti.x1)}, `
      + `y ${Math.round(lepo.kortti.y0)}…${Math.round(lepo.kortti.y1)})` : 'EI OLE'}, `
    + `tekstirivejä ${lepo.tekstirivit}, viiva `
    + `${lepo.viiva ? `${Math.round(lepo.viiva.w)} x ${lepo.viiva.h.toFixed(1)} px` : '—'}, `
    + `plussia ${lepo.plussia}, kehyksiä ${lepo.kehyksia}, `
    + `vasen väli ${lepo.kortti ? lepo.kortti.x0.toFixed(1) : '—'} px, `
    + `ala väli ${lepo.kortti ? (lepo.ruutu.h - lepo.kortti.y1).toFixed(1) : '—'} px`);
  tieto(`${ruutu.nimi} px · pohjattomuus`, JSON.stringify(lepo.pohjat));
  tieto(`${ruutu.nimi} px · typografia`,
    `nimi ${lepo.koot.nimi} (harvennus ${lepo.koot.harvennus}), `
    + `alarivi ${lepo.koot.alarivi}, valtiomuoto ${lepo.koot.aika}`);

  /* --- 8a. Liiku levossa ------------------------------------------ */
  const liiku = lepo.liiku;
  const liikuHyva = Boolean(liiku
    && liiku.laatikko.y0 >= 0 && liiku.laatikko.y1 <= lepo.ruutu.h + 1
    && liiku.laatikko.y0 > lepo.ruutu.h * 0.5
    && liiku.keskipoikkeama <= 8
    && /rgba\([^)]*,\s*0\)/.test(String(liiku.tausta))
    && liiku.reunus === '0px'
    && liiku.sana !== 'none' && liiku.sananLeveys > 4
    && liiku.sananPeitto >= 0.5 && liiku.sananPeitto <= 0.8
    && liiku.laatikko.w >= 32 && liiku.laatikko.h >= 32
    && !liiku.osuuPaneeliin && !liiku.osuuPuluun
    && !liiku.osuuLappuun && !liiku.osuuKaupunkikorttiin);
  tieto(`${ruutu.nimi} px · Liiku levossa`, liiku
    ? `keskipoikkeama ${liiku.keskipoikkeama.toFixed(1)} px, `
      + `laatikko ${Math.round(liiku.laatikko.w)} x ${Math.round(liiku.laatikko.h)}, `
      + `tausta ${liiku.tausta}, sana ${liiku.sana} (peitto ${liiku.sananPeitto}), `
      + `osuu kalusteeseen ${liiku.osuuPaneeliin}, --liiku-pohja `
      + `${lepo.liikuPohja || '(ei asetettu)'}`
    : 'EI OLE');

  if (KUVAKANSIO && lepo.kortti) {
    // eslint-disable-next-line no-await-in-loop
    await sivu.evaluate(() => window.matkakirja.ui.asetaPaivakirjanKoko(true));
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(500);
    const x = Math.max(0, Math.round(lepo.kortti.x0 - ruutu.sivuvara));
    const y = Math.max(0, Math.round(lepo.kortti.y0 - ruutu.ylavara));
    // eslint-disable-next-line no-await-in-loop
    await sivu.screenshot({
      path: join(KUVAKANSIO, `maainfo-vanha-${ruutu.nimi}-kiinni.png`),
      clip: {
        x,
        y,
        width: Math.min(ruutu.leveys - x, Math.round(lepo.kortti.w + 2 * ruutu.sivuvara)),
        height: Math.min(ruutu.korkeus - y, Math.round(lepo.kortti.y1 + 25 - y)),
      },
    });
  }

  /* --- 5. ei liiku eikä kasva zoomatessa (vastakoe C) -------------- */
  // eslint-disable-next-line no-await-in-loop
  await zoomaaSisaan(sivu, 0.5);
  // eslint-disable-next-line no-await-in-loop
  await odotaAsettunut(sivu, 6000);
  // eslint-disable-next-line no-await-in-loop
  const lahi = await mittaaPaneeli(sivu);
  const paikallaan = Boolean(lepo.kortti && lahi.kortti
    && Math.abs(lahi.kortti.x0 - lepo.kortti.x0) <= 1
    && Math.abs(lahi.kortti.y1 - lepo.kortti.y1) <= 1
    && Math.abs(lahi.kortti.w - lepo.kortti.w) <= 1
    && Math.abs(lahi.kortti.h - lepo.kortti.h) <= 1);
  paikallaanOk.push({ ruutu: ruutu.nimi, ok: paikallaan });
  const kylttiLiikkui = Boolean(lepo.karttapiste && lahi.karttapiste
    && (Math.abs(lahi.karttapiste.x0 - lepo.karttapiste.x0) > 1
      || Math.abs(lahi.karttapiste.y0 - lepo.karttapiste.y0) > 1));
  kalusteLiikkui.push({ ruutu: ruutu.nimi, ok: kylttiLiikkui });
  tieto(`${ruutu.nimi} px · lähempi zoomi`,
    `kaluste ${lahi.kortti ? `${Math.round(lahi.kortti.w)} x ${Math.round(lahi.kortti.h)} px `
      + `(x ${Math.round(lahi.kortti.x0)}, alareuna y ${Math.round(lahi.kortti.y1)})` : 'EI OLE'}`
    + `, vastakoe C: Pariisin karttapiste ${lepo.karttapiste
      ? `${Math.round(lepo.karttapiste.x0)},${Math.round(lepo.karttapiste.y0)} → `
        + `${Math.round(lahi.karttapiste?.x0 ?? NaN)},${Math.round(lahi.karttapiste?.y0 ?? NaN)}`
      : 'ei pistettä'}`);

  /* --- 2. napautus nimeen avaa, uusi sulkee ------------------------ */
  // eslint-disable-next-line no-await-in-loop
  await zoomaaSisaan(sivu, 2); // takaisin uloimpaan
  // eslint-disable-next-line no-await-in-loop
  await napautaKohtaa(sivu, lepo.avain);
  // eslint-disable-next-line no-await-in-loop
  const auki2 = await mittaaPaneeli(sivu);
  const jarjestys = Boolean(auki2.valikko && auki2.perustiedot && auki2.avain
    && auki2.valikko.y1 <= auki2.perustiedot.y0 + 2
    && auki2.perustiedot.y1 <= auki2.avain.y0 + 2);
  const avautuuHyva = Boolean(auki2.valikkoAuki && auki2.valikko && auki2.perustiedot
    && auki2.otsikot.length >= 4 && auki2.otsikkorivit === 2
    && auki2.perustietoja >= 4
    && jarjestys
    && auki2.valikko.y0 >= -1 && auki2.valikko.x0 >= -1
    && auki2.valikko.x1 <= auki2.ruutu.w + 1
    && auki2.kortti.y1 <= auki2.ruutu.h + 1
    && kaikkiPohjattomia(auki2.pohjat));
  tieto(`${ruutu.nimi} px · avattuna`,
    `otsikoita ${auki2.otsikot.length} rivillä ${auki2.otsikkorivit}, `
    + `perustietorivejä ${auki2.perustietoja}, `
    + `otsikot y ${auki2.valikko ? `${Math.round(auki2.valikko.y0)}…${Math.round(auki2.valikko.y1)}` : '—'}, `
    + `perustiedot y ${auki2.perustiedot ? `${Math.round(auki2.perustiedot.y0)}…${Math.round(auki2.perustiedot.y1)}` : '—'}, `
    + `nimi y ${auki2.avain ? Math.round(auki2.avain.y0) : '—'}, `
    + `kaluste ${auki2.kortti ? `${Math.round(auki2.kortti.w)} x ${Math.round(auki2.kortti.h)} px` : '—'}, `
    + `otsikkokoko ${auki2.koot.otsikko}, lukurivi ${auki2.koot.lukurivi}, `
    + `pohjaton ${kaikkiPohjattomia(auki2.pohjat)}`);

  /* --- 3. kaikki samalla fontilla ---------------------------------- */
  const perheet = Object.values(auki2.perheet).filter(Boolean);
  const fonttiHyva = perheet.length >= 5 && new Set(perheet).size === 1;
  fonttiOk.push({ ruutu: ruutu.nimi, ok: fonttiHyva, perheita: new Set(perheet).size });
  tieto(`${ruutu.nimi} px · fontit`, JSON.stringify(auki2.perheet));

  /* --- 4. otsikot ovat pelkkää tekstiä ----------------------------- */
  const erotinOk = auki2.erottimet.length === auki2.otsikot.length - auki2.otsikkorivit
    && auki2.erottimet.every((t) => t === '·');
  const kapiteeliOk = auki2.otsikot.every(
    (k) => k.kapiteeli === 'uppercase' && k.harvennus >= 0.1,
  );
  const tekstiHyva = Boolean(auki2.otsikot.length >= 4 && auki2.pallot === 0
    && erotinOk && kapiteeliOk);
  tekstiOtsikotOk.push({
    ruutu: ruutu.nimi,
    ok: tekstiHyva,
    pallot: auki2.pallot,
    erottimia: auki2.erottimet.length,
    erotinOk,
    kapiteeliOk,
  });
  tieto(`${ruutu.nimi} px · otsikot tekstinä`,
    `väripalloja ${auki2.pallot}, erottimia ${auki2.erottimet.length} `
    + `("${[...new Set(auki2.erottimet)].join('","')}"), kapiteeli `
    + `${auki2.otsikot[0]?.kapiteeli}, harvennus `
    + `${auki2.otsikot[0]?.harvennus?.toFixed(3)} em, rivit `
    + `${[0, 1].map((i) => auki2.otsikot.filter(
      (k) => Math.round(k.y / 2) === [...new Set(auki2.otsikot.map(
        (o) => Math.round(o.y / 2),
      ))].sort((a, b) => a - b)[i],
    ).map((k) => k.nimi).join(' · ')).filter(Boolean).join(' || ')}`);

  /* --- 8b. Liiku avattuna: väistö nostaa sanan -------------------- */
  const liikuAuki = auki2.liiku;
  const liikuAukiHyva = Boolean(liikuAuki
    && liikuAuki.laatikko.y0 >= 0 && liikuAuki.laatikko.y1 <= auki2.ruutu.h + 1
    && liikuAuki.laatikko.y0 > auki2.ruutu.h * 0.5
    && liikuAuki.keskipoikkeama <= 8
    && !liikuAuki.osuuPaneeliin && !liikuAuki.osuuPuluun
    && !liikuAuki.osuuLappuun && !liikuAuki.osuuKaupunkikorttiin);
  liikuOk.push({
    ruutu: ruutu.nimi,
    ok: liikuHyva && liikuAukiHyva,
    levossa: liikuHyva,
    avattuna: liikuAukiHyva,
    poikkeama: liiku?.keskipoikkeama,
    tausta: liiku?.tausta,
    peitto: liiku?.sananPeitto,
    osumaAuki: liikuAuki?.osuuPaneeliin,
  });
  tieto(`${ruutu.nimi} px · Liiku avattuna`,
    `--liiku-pohja ${auki2.liikuPohja || '(ei asetettu)'}, sana y `
    + `${liikuAuki ? `${Math.round(liikuAuki.laatikko.y0)}…${Math.round(liikuAuki.laatikko.y1)}` : '—'}, `
    + `kalusteen yläreuna y ${auki2.kortti ? Math.round(auki2.kortti.y0) : '—'}, `
    + `osuu kalusteeseen ${liikuAuki?.osuuPaneeliin}`);

  if (KUVAKANSIO && auki2.kortti) {
    // eslint-disable-next-line no-await-in-loop
    await sivu.screenshot({
      path: join(KUVAKANSIO, `maainfo-vanha-${ruutu.nimi}-auki.png`),
      clip: {
        x: 0,
        y: Math.max(0, Math.round(auki2.kortti.y0 - 40)),
        width: ruutu.leveys,
        height: Math.min(ruutu.korkeus, Math.round(ruutu.korkeus - auki2.kortti.y0 + 40)),
      },
    });
  }

  /* Uusi napautus nimeen sulkee. */
  // eslint-disable-next-line no-await-in-loop
  await napautaKohtaa(sivu, auki2.avain);
  // eslint-disable-next-line no-await-in-loop
  const kiinni2 = await mittaaPaneeli(sivu);
  const sulkeutui = Boolean(!kiinni2.valikkoAuki && !kiinni2.valikko
    && !kiinni2.perustiedot && kiinni2.tekstirivit === 2);
  avautuuOk.push({ ruutu: ruutu.nimi, ok: avautuuHyva && sulkeutui, avautuu: avautuuHyva, sulkeutui });
  tieto(`${ruutu.nimi} px · uusi napautus sulkee`,
    `valikkoAuki ${kiinni2.valikkoAuki}, tekstirivejä ${kiinni2.tekstirivit}, `
    + `kaluste ${kiinni2.kortti ? `${Math.round(kiinni2.kortti.w)} x ${Math.round(kiinni2.kortti.h)} px` : '—'}`);

  /* --- 6. rulla menee kalusteen läpi kartalle (vain 1400 px) ------ */
  if (ruutu.nimi === '1400' && lepo.kortti) {
    const px = Math.round((lepo.kortti.x0 + lepo.kortti.x1) / 2);
    const py = Math.round((lepo.kortti.y0 + lepo.kortti.y1) / 2);
    /* eslint-disable no-await-in-loop */
    await palautaNakyma(sivu);
    const yli = await rullaa(sivu, px, py);
    await palautaNakyma(sivu);
    await sivu.evaluate(() => {
      document.querySelector('.maapaneeli-nurkka')
        ?.style.setProperty('display', 'none', 'important');
    });
    const ilman = await rullaa(sivu, px, py);
    await sivu.evaluate(() => {
      document.querySelector('.maapaneeli-nurkka')?.style.removeProperty('display');
    });
    await palautaNakyma(sivu);
    /* eslint-enable no-await-in-loop */
    const suhde = ilman.muutos > 1e-4 ? yli.muutos / ilman.muutos : null;
    lapiOk.push({
      ruutu: ruutu.nimi,
      ok: Boolean(suhde !== null && Math.abs(suhde - 1) <= 0.1),
      suhde,
    });
    tieto('1400 px · rulla kalusteen päältä',
      `ctrl-rulla kalusteen päällä muutti korkeutta ${yli.muutos.toFixed(5)}, `
      + `SAMASTA pisteestä ilman kalustetta ${ilman.muutos.toFixed(5)} `
      + `(suhde ${suhde === null ? '—' : suhde.toFixed(3)}, vara 10 %)`);
  }

  /* --- 7. jokainen otsikko avaa oman sivunsa (vain 390 px) -------- */
  if (ruutu.nimi === '390') {
    /* eslint-disable no-await-in-loop */
    tieto('Ranskan otsikot', auki2.otsikot.map((r) => r.nimi).join(' · ') || 'EI YHTÄÄN');
    for (const rivi of auki2.otsikot) {
      // Kaluste on kiinni edellisen napautuksen jäljiltä: avaa uudestaan.
      const lepo2 = await mittaaPaneeli(sivu);
      if (!lepo2.valikkoAuki) await napautaKohtaa(sivu, lepo2.avain);
      const nyt = await mittaaPaneeli(sivu);
      const kohde = nyt.otsikot.find((k) => k.id === rivi.id);
      if (!kohde) { otsikkoTulokset.push({ pyydetty: rivi.id, auki: false }); continue; }
      await napautaKohtaa(sivu, {
        x0: kohde.x, y0: kohde.y, w: kohde.w, h: kohde.h,
      });
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
       * Lehti kiinni dialogin omalla metodilla eikä Escillä: modaali
       * dialogi nielee näppäimen eikä sulkeudu joka kerta.
       */
      await sivu.evaluate(() => window.matkakirja.ui.arrivalDialog?.close());
      await sivu.waitForTimeout(500);
    }
    /* Valittu otsikko merkitään alleviivauksella aiheen värissä. */
    const lepo3 = await mittaaPaneeli(sivu);
    if (!lepo3.valikkoAuki) await napautaKohtaa(sivu, lepo3.avain);
    const merkitty = await mittaaPaneeli(sivu);
    const valitut = merkitty.otsikot.filter((k) => k.valittu);
    tieto('valittu otsikko',
      `merkittyjä ${valitut.length}: `
      + `${valitut.map((k) => `${k.nimi} (${k.alleviivaus})`).join(', ') || 'ei yhtään'}`);
    await napautaKohtaa(sivu, merkitty.avain);
    /* eslint-enable no-await-in-loop */
  }

  paaVirheet = paaVirheet.concat(virheet);
  // eslint-disable-next-line no-await-in-loop
  await ctx.close();
}

vaadi('1. LEVOSSA vain nimi, viiva ja alarivi — ei taustaa, ei plussaa, ruudun vasen '
  + 'alakulma (390 px ja 1400 px)',
levossaOk.length === RUUDUT.length && levossaOk.every((t) => t.ok),
`tulokset ${JSON.stringify(levossaOk)}`);
vaadi('2. napautus nimeen AVAA (otsikot 2 rivillä, perustiedot niiden alla) ja uusi '
  + 'napautus SULKEE',
avautuuOk.length === RUUDUT.length && avautuuOk.every((t) => t.ok),
`tulokset ${JSON.stringify(avautuuOk)}`);
vaadi('3. nimi, alarivi, perustiedot ja otsikot ovat SAMALLA fontilla',
  fonttiOk.length === RUUDUT.length && fonttiOk.every((t) => t.ok),
  `tulokset ${JSON.stringify(fonttiOk)}`);
vaadi('4. otsikot ovat pelkkää tekstiä: 0 väripalloa, erottimina välipisteet, '
  + 'harvennetut kapiteelit',
tekstiOtsikotOk.length === RUUDUT.length && tekstiOtsikotOk.every((t) => t.ok),
`tulokset ${JSON.stringify(tekstiOtsikotOk)}`);
vaadi('5. kaluste EI liiku eikä kasva zoomatessa (nurkka ja koko ±1 px)',
  paikallaanOk.length === RUUDUT.length && paikallaanOk.every((t) => t.ok),
  `tulokset ${JSON.stringify(paikallaanOk)}`);
vaadi('VASTAKOE C: kartan oma piste (Pariisi) SIIRTYY samassa zoomissa',
  kalusteLiikkui.length === RUUDUT.length && kalusteLiikkui.every((t) => t.ok),
  `tulokset ${JSON.stringify(kalusteLiikkui)}`);
vaadi('6. ctrl-rulla menee kalusteen LÄPI kartalle (suhde 1,0 ± 10 %)',
  lapiOk.length === 1 && lapiOk.every((t) => t.ok), `tulokset ${JSON.stringify(lapiOk)}`);

const otsikotOsui = otsikkoTulokset.filter(
  (t) => t.auki && t.maa === 'FRA' && t.id === t.pyydetty,
).length;
vaadi('7. jokainen otsikko avaa maalehden OMAN sivunsa',
  otsikkoTulokset.length >= 8 && otsikotOsui === otsikkoTulokset.length,
  `otsikoita ${otsikkoTulokset.length}, oikein ${otsikotOsui}: `
  + JSON.stringify(otsikkoTulokset.filter((t) => t.id !== t.pyydetty)));
vaadi('8. Liiku on kuultava sana alareunan keskellä eikä osu kalusteeseen — ei levossa '
  + 'eikä avattuna',
liikuOk.length === RUUDUT.length && liikuOk.every((t) => t.ok),
`tulokset ${JSON.stringify(liikuOk)}`);
tieto('sivun virheet (pääajo)', paaVirheet.length ? paaVirheet.join(' | ') : 'ei yhtään');
vaadi('9. pääajo ei tuottanut sivuvirheitä', paaVirheet.length === 0, paaVirheet.join(' | '));

/* ==================== VASTAKOE A: maa ilman aiheita ================ */

poistaKategoriat = 'FRA';
{
  const { ctx, sivu, virheet, auki } = await avaaPeli({ leveys: 390, korkeus: 844 });
  if (auki) await odotaAsettunut(sivu, 6000);
  const lepo = auki ? await mittaaPaneeli(sivu) : null;
  if (auki && lepo?.avain) await napautaKohtaa(sivu, lepo.avain);
  const tulos = auki ? await mittaaPaneeli(sivu) : null;
  tieto('vastakoe A (Ranska ilman MAA_KATEGORIAT-riviä)',
    tulos ? `kaluste ${tulos.onKortti}, otsikoita ${tulos.otsikot.length}, `
      + `perustietoja ${tulos.perustietoja}, virheitä ${virheet.length}` : 'lauta ei auennut');
  vaadi('VASTAKOE A: maa ilman aiheita → kaluste on, otsikkorivejä ei, peli ei kaadu',
    Boolean(auki && tulos?.onKortti && tulos.otsikot.length === 0
      && tulos.perustietoja >= 4 && virheet.length === 0),
    JSON.stringify({ auki, onKortti: tulos?.onKortti, otsikoita: tulos?.otsikot.length, virheet }));
  await ctx.close();
}
poistaKategoriat = null;

/* ============ VASTAKOE B: kaluste puretaan kokonaan ================ */
/*
 * `?maapaneeli=nurkka` asettaa js/fokusmitat.js MAAPANEELI_KARTASSA
 * -lipun epätodeksi, jolloin `luoMaapaneeli.paivita` purkaa kalusteen ja
 * VANHA kartuutsi-nurkkataulu (.fokus-kartuutsi) palaa tilalle.
 * VÄITTEEN 1 ON KAADUTTAVA: kalustetta ei ole, joten mitään ei voi
 * mitata ruudun vasempaan alakulmaan.
 */
{
  const { ctx, sivu, auki } = await avaaPeli({
    leveys: 390, korkeus: 844, lisaparametrit: '&maapaneeli=nurkka',
  });
  if (auki) await odotaAsettunut(sivu, 6000);
  const lepo = auki ? await mittaaPaneeli(sivu) : null;
  const vaite1 = Boolean(lepo?.onKortti && lepo.kortti
    && lepo.kortti.x0 <= NURKKA_VARA_PX
    && lepo.ruutu.h - lepo.kortti.y1 <= NURKKA_VARA_PX);
  tieto('vastakoe B (?maapaneeli=nurkka)',
    `kaluste ${Boolean(lepo?.onKortti)}, vanha nurkkataulu ${Boolean(lepo?.nurkassa)}, `
    + `väite 1 ${vaite1 ? 'LÄPI (paha)' : 'PUNAINEN'}`);
  vaadi('VASTAKOE B: ilman kalustetta levon väite kaatuu ja vanha nurkkataulu palaa',
    Boolean(auki) && !vaite1 && Boolean(lepo?.nurkassa),
    JSON.stringify({ auki, vaite1, nurkassa: lepo?.nurkassa }));
  /*
   * VASTAKOE D samalla ruudulla: väitteen 8 keskitysmitta ajetaan pulun
   * nappiin, joka on tarkoituksella kulmassa. Sen ON kaaduttava.
   */
  vaadi('VASTAKOE D: pulun nappi EI ole ruudun keskilinjalla (keskitysmitta kaatuu)',
    lepo?.pollonPoikkeama != null && lepo.pollonPoikkeama > 8,
    `poikkeama ${lepo?.pollonPoikkeama}`);
  await ctx.close();
}

/* ====== VASTAKOE E: laatikko takaisin ============================= */
/*
 * Palvelin maalaa kalusteelle kermapohjan, reunuksen ja varjon — siis
 * täsmälleen sen laatikon, jonka omistaja pyysi pois. VÄITTEEN 1
 * TAUSTAOSAN ON KAADUTTAVA.
 */
{
  vastakoe = 'LAATIKKO';
  const { ctx, sivu, auki } = await avaaPeli({ leveys: 390, korkeus: 844 });
  if (auki) await odotaAsettunut(sivu);
  const m = auki ? await mittaaPaneeli(sivu) : null;
  vastakoe = null;
  const pohjatOk = m ? kaikkiPohjattomia(m.pohjat) : true;
  tieto('vastakoe E (laatikko takaisin)',
    `kalusteen pohja ${JSON.stringify(m?.pohjat['.maapaneeli-kortti'])} → `
    + `väite 1 ${pohjatOk ? 'LÄPI (paha)' : 'PUNAINEN'}`);
  vaadi('VASTAKOE E: kermapohjalla, reunuksella ja varjolla POHJATTOMUUS-väite kaatuu',
    Boolean(auki && m?.onKortti) && !pohjatOk,
    JSON.stringify({ auki, pohja: m?.pohjat['.maapaneeli-kortti'] }));
  await ctx.close();
}

/* ====== VASTAKOE F: Liiku ei väistä avattua kalustetta ============ */
/*
 * `bottom: max(..., var(--liiku-pohja))` palautetaan pelkäksi
 * perusväliksi, jolloin sana jää ruudun alalaitaan AVATUN kalusteen
 * päälle 390 px:n ruudulla. VÄITTEEN 8 PÄÄLLEKKÄISYYSOSAN ON
 * KAADUTTAVA — muuten väistö ei todista mitään.
 */
{
  vastakoe = 'EI_VAISTOA';
  const { ctx, sivu, auki } = await avaaPeli({ leveys: 390, korkeus: 844 });
  if (auki) await odotaAsettunut(sivu);
  const lepo = auki ? await mittaaPaneeli(sivu) : null;
  if (auki && lepo?.avain) await napautaKohtaa(sivu, lepo.avain);
  const m = auki ? await mittaaPaneeli(sivu) : null;
  vastakoe = null;
  tieto('vastakoe F (ei väistöä, kaluste auki)',
    `Liiku y ${m?.liiku ? `${Math.round(m.liiku.laatikko.y0)}…${Math.round(m.liiku.laatikko.y1)}` : '—'}, `
    + `kaluste y ${m?.kortti ? `${Math.round(m.kortti.y0)}…${Math.round(m.kortti.y1)}` : '—'}, `
    + `osuu kalusteeseen ${m?.liiku?.osuuPaneeliin}`);
  vaadi('VASTAKOE F: ilman väistöä Liiku OSUU avattuun kalusteeseen (390 px)',
    Boolean(auki && m?.valikkoAuki && m?.liiku?.osuuPaneeliin),
    JSON.stringify({ auki, avattu: m?.valikkoAuki, osuu: m?.liiku?.osuuPaneeliin }));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
