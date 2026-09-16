/*
 * SELAINSAVUKE: IHMISEN MATKA — KEHYS POISSA KOKO AVARUUSVAIHEEN AJAN.
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-ihmisen-kehys.mjs
 *
 * OMISTAJA 15.9.2026 klo 19.05 (iPhone-kuva avaruusvaiheesta "He vain
 * lähtivät.", sanatarkasti: *"Alussa oli vain musta mutta sitten kehys
 * palasi liian aikaisin"*). Linjaus: kehys — yläpalkki, sen reunaviiva
 * ja valikkonappi — pysyy poissa KOKO avaruusvaiheen ajan (tähdet,
 * pieni Maa, alkutekstit) ja palaa vasta kun kartta valkenee, samassa
 * feidauksessa.
 *
 * MIKSI OMA SAVUKE. savuke-ihmisen-rintama.mjs mittaa vain sen hetken,
 * jolloin peite on TÄYSIN musta (esitys-musta). Tässä mitataan koko
 * avaruusvaihe AJAN FUNKTIONA kahdella ruudulla.
 *
 * VÄITTEET (390 x 844 ja 1400 x 900):
 *   1. KEHYS EI NOUSE ENNEN KARTTAA. Sarjassa (0–20 s, 250 ms välein)
 *      jokainen näyte, jossa kartta on yhä piilossa (peitteen ja
 *      avaruuslevyn peittävyys >= 0,95), näyttää yläpalkin
 *      peittävyydeksi <= 0,05 ja valikkonapin mitattavissa olevaksi
 *      mutta läpinäkyväksi (kehysPiilossa = tosi). Samassa näytteessä
 *      mitataan myös ALAPALKKI (linssin aikaselain, peittävyys 0) ja
 *      LIIKU (pelin monitoiminappi, laatikon leveys 0 — se on koko
 *      linssin ajan display:none, ei vain avaruusvaiheessa).
 *   2. SAMA FEIDAUS. Kehyksen nousu alkaa samasta näytteestä kuin
 *      kartan valkeneminen (ero <= 500 ms) ja kestää saman ajan
 *      (VALOJEN_MS 2600 ms, sallittu heitto 750 ms).
 *   3. RUUDULLA EI OLE KEHYSTÄ. Avaruusvaiheessa pysäytetystä
 *      esityksestä yläreunan nauhassa ei ole kirkkaita pikseleitä
 *      palkin reunaviivasta eikä hampurilaisesta.
 *   3b. VASTAKOE (vanha käytös): kun `esitys-avaruus` otetaan pois
 *      samassa kohdassa — juuri niin kuin nostaMusta ennen teki —
 *      nauhaan palaa kirkkaita pikseleitä. Punainen.
 *   4. NAPAUTUS EI TUO KEHYSTÄ kesken avaruusvaiheen: pallolauta
 *      ottaa kosketuksia vastaan koko esityksen ajan, joten
 *      vahinkokosketus toisi kehyksen juuri "liian aikaisin".
 *   5. Ei sivuvirheitä.
 *
 * KUVAKAAPPAUKSET (KAAPPAUKSET-kansio):
 *   savuke-ihmisen-kehys-<leveys>.jpg      avaruusvaihe ilman kehystä
 *   savuke-ihmisen-kehys-vastakoe-<leveys>.png
 *   savuke-ihmisen-kehys-<leveys>.json     koko aikasarja
 */
import { createServer } from 'node:http';
import { inflateSync } from 'node:zlib';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const JUURI = join(import.meta.dirname, '..', '..');
const PORTTI = 8763;
const ULOS = process.env.KAAPPAUKSET ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

/** Hiljaisuus WAV:na — ämpärissä ei ole kertomusluentoja (ks. esityssavuke). */
function hiljaisuusWav(sekunteja = 3, hz = 8000) {
  const tavuja = hz * sekunteja * 2;
  const p = Buffer.alloc(44 + tavuja);
  p.write('RIFF', 0); p.writeUInt32LE(36 + tavuja, 4); p.write('WAVE', 8); p.write('fmt ', 12);
  p.writeUInt32LE(16, 16); p.writeUInt16LE(1, 20); p.writeUInt16LE(1, 22);
  p.writeUInt32LE(hz, 24); p.writeUInt32LE(hz * 2, 28); p.writeUInt16LE(2, 32);
  p.writeUInt16LE(16, 34); p.write('data', 36); p.writeUInt32LE(tavuja, 40);
  return p;
}
const HILJAISUUS = hiljaisuusWav(3);
const HILJAISUUS_AVAUS = hiljaisuusWav(18);

/* Ämpäri Noden kautta (CLAUDE.md: NODE_USE_ENV_PROXY=1). */
const AMPARI = new Map();
async function ampariHaku(url) {
  if (AMPARI.has(url)) return AMPARI.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : null)).catch(() => null);
  AMPARI.set(url, lupaus);
  return lupaus;
}

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(PORTTI, r));

/*
 * PNG:N PURKU ILMAN KIRJASTOA. Kontissa ei ole pngjs:ää, joten kaappaus
 * puretaan tässä: Playwright kirjoittaa 8-bittistä RGB:tä (väritila 2,
 * ei lomitusta), joten riittää zlib.inflate ja PNG:n viisi suodatinta.
 * Selaimen oma <canvas>-purku kokeiltiin ensin, mutta se palautti saman
 * tuloksen kahdelle eri kuvalle — mittaus ei saa nojata siihen.
 */
function pngKirkkaudet(puskuri) {
  const leveys = puskuri.readUInt32BE(16);
  const korkeus = puskuri.readUInt32BE(20);
  const syvyys = puskuri[24];
  const varitila = puskuri[25];
  if (syvyys !== 8 || (varitila !== 2 && varitila !== 6)) {
    throw new Error(`odottamaton PNG: syvyys ${syvyys}, väritila ${varitila}`);
  }
  const kanavia = varitila === 2 ? 3 : 4;
  const palat = [];
  let i = 8;
  while (i + 8 <= puskuri.length) {
    const pituus = puskuri.readUInt32BE(i);
    const tyyppi = puskuri.toString('latin1', i + 4, i + 8);
    if (tyyppi === 'IDAT') palat.push(puskuri.subarray(i + 8, i + 8 + pituus));
    if (tyyppi === 'IEND') break;
    i += 12 + pituus;
  }
  const raaka = inflateSync(Buffer.concat(palat));
  const rivi = leveys * kanavia;
  const ulos = Buffer.alloc(korkeus * rivi);
  for (let y = 0; y < korkeus; y += 1) {
    const suodatin = raaka[y * (rivi + 1)];
    const lahde = raaka.subarray(y * (rivi + 1) + 1, y * (rivi + 1) + 1 + rivi);
    const kohde = ulos.subarray(y * rivi, (y + 1) * rivi);
    const yla = y > 0 ? ulos.subarray((y - 1) * rivi, y * rivi) : null;
    for (let x = 0; x < rivi; x += 1) {
      const a = x >= kanavia ? kohde[x - kanavia] : 0;
      const b = yla ? yla[x] : 0;
      const c = yla && x >= kanavia ? yla[x - kanavia] : 0;
      let lisa = 0;
      if (suodatin === 1) lisa = a;
      else if (suodatin === 2) lisa = b;
      else if (suodatin === 3) lisa = (a + b) >> 1;
      else if (suodatin === 4) {
        const pp = a + b - c;
        const pa = Math.abs(pp - a); const pb = Math.abs(pp - b); const pc = Math.abs(pp - c);
        lisa = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      kohde[x] = (lahde[x] + lisa) & 255;
    }
  }
  let maks = 0; let kirkkaita = 0; let kehysmaisia = 0;
  for (let p = 0; p < ulos.length; p += kanavia) {
    const v = Math.max(ulos[p], ulos[p + 1], ulos[p + 2]);
    if (v > maks) maks = v;
    if (v >= 8) kirkkaita += 1;
    /*
     * KEHYSMITTA on oma rajansa (>= 96). Avaruusvaiheessa yläreunassa
     * on tähtiä ja Maan hehkua, ja mitattuna koko nauha saattoi olla
     * tasaisesti arvossa 16 — raja 8 laski silloin kaikki pikselit
     * "kirkkaiksi". Palkin kultainen reunaviiva ja hampurilainen ovat
     * selvästi tämän rajan yli (maks 241).
     */
    if (v >= 96) kehysmaisia += 1;
  }
  return { maks, kirkkaita, kehysmaisia, pikseleita: leveys * korkeus, leveys, korkeus };
}
const kirkkaudet = (puskuri) => pngKirkkaudet(puskuri);

const virheet = [];
const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

const paketti = await import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
  args: ['--autoplay-policy=no-user-gesture-required'],
});

/** Sivu pystyyn yhdelle näkymälle: samat reitit kuin rintamasavukkeella. */
async function avaaSivu(leveys, korkeus) {
  const konteksti = await selain.newContext({
    viewport: { width: leveys, height: korkeus }, deviceScaleFactor: 1, serviceWorkers: 'block',
  });
  const s = await konteksti.newPage();
  s.on('pageerror', (e) => virheet.push(`${leveys}px: ${e}`));
  await s.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  await s.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
    const vastaus = await ampariHaku(route.request().url());
    if (!vastaus) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  await s.route(/\/puhe\/|\/aanet\//, (route) => route.fulfill({
    status: 200,
    contentType: 'audio/wav',
    body: /kertomus-(avaus|afrikka|jebel-irhoud)\./.test(route.request().url()) ? HILJAISUUS_AVAUS : HILJAISUUS,
    headers: { 'access-control-allow-origin': '*' },
  }));
  return { s, konteksti };
}

/**
 * PELI AUKI JA LINSSI LAUKUSTA. Sama polku kuin
 * savuke-ihmisen-rintama.mjs:ssä: peli käyntiin, pelaaja Ateenaan,
 * pallolauta pystyyn ja Ihmisen matka -linssi päälle.
 */
async function avaaLinssi(s) {
  await s.goto(`http://127.0.0.1:${PORTTI}/index.html?lauta=pallo`, { waitUntil: 'load' });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.phase = 'action';
    ui.render();
  });
  await s.waitForTimeout(1200);
  const pallo = await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
    .then(() => true).catch(() => false);
  await s.waitForTimeout(1500);
  const lahto = await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('ihmisen-matka')) ui.game.player.linssit.push('ihmisen-matka');
    ui.valitseLinssi('ihmisen-matka');
    for (let i = 0; i < 600; i += 1) { if (ui.aikajana) break; await new Promise((r) => setTimeout(r, 25)); }
    const ajo = ui.aikajana;
    if (!ajo?.virrat) return { ok: false };
    await ajo.virrat.valmis;
    return { ok: true, vanoja: ajo.virrat.tila().vanoja };
  });
  return { pallo, lahto };
}

/**
 * YKSI MITTAUS. Linssi auki, Käynnistä painettuna, ja sitten sarja:
 * yläpalkin peittävyys, valikkonapin näkyvyys, peitteen ja
 * avaruuslevyn peittävyys (= kartan piilo) 250 ms:n välein.
 */
async function mittaa(leveys, korkeus) {
  const { s, konteksti } = await avaaSivu(leveys, korkeus);
  const { pallo, lahto } = await avaaLinssi(s);
  vaadi(`${leveys}px: linssi laukusta, vanat valmiina`, pallo && lahto.ok && lahto.vanoja >= 15, JSON.stringify(lahto));

  /* Käynnistä-nappi: musta ruutu, avausluenta, avaruusvaihe. */
  await s.evaluate(() => document.querySelector('.aikajana-avaus-nappi')?.click());

  /* --------- 1–2. AIKASARJA: kehys vs. kartta, 250 ms:n välein --------- */
  const sarja = [];
  const t0 = Date.now();
  for (let n = 0; n < 80; n += 1) {
    const naytto = await s.evaluate(() => {
      const juuri = document.querySelector('.aikajana');
      const palkki = juuri?.querySelector('.aikajana-ylarivi');
      // Valikkonappi on linssin juuressa; nimi js/aikajana-valikko.js.
      const nappi = juuri?.querySelector('.aikajana-valikko-nappi')
        ?? document.querySelector('.aikajana-valikko-nappi');
      const peite = juuri?.querySelector('.aikajana-esitys-peite');
      // Alapalkki = linssin oma aikaselain; Liiku = pelin monitoiminappi.
      const selain = document.querySelector('.aikaselain');
      const liikuEl = document.querySelector('.toimintorivi .monitoimi-nappi');
      const levy = document.querySelector('.aikajana-avaruus');
      const luku = (el) => (el ? Number(getComputedStyle(el).opacity) : null);
      const napinRuutu = nappi?.getBoundingClientRect();
      const t = window.matkakirja.ui.aikajana?.esitys?.tila?.() ?? {};
      const peiteOp = luku(peite) ?? 0;
      const levyOp = levy ? luku(levy) : 0;
      return {
        palkki: luku(palkki),
        // Napin oma peittävyys kertautuu palkin kanssa: tämä on se, mitä silmä näkee.
        nappi: nappi ? (luku(nappi) ?? 1) * (luku(palkki) ?? 1) : null,
        napinLeveys: napinRuutu ? Math.round(napinRuutu.width) : 0,
        selain: selain ? (luku(selain) ?? 1) : null,
        /*
         * LIIKU on piilotettu `display: none`-säännöllä (css/styles.css
         * body.aikajana-paalla .toimintorivi .monitoimi-nappi), joten
         * peittävyys ei kelpaa mitaksi: mitataan laatikko.
         */
        liiku: liikuEl ? Math.round(liikuEl.getBoundingClientRect().width) : 0,
        peite: +peiteOp.toFixed(3),
        levy: +levyOp.toFixed(3),
        // Kartan näkyvyys: mustan peitteen ja avaruuden mustan levyn takaa.
        kartta: +Math.max(0, (1 - peiteOp) * (1 - levyOp)).toFixed(3),
        vaihe: t.vaihe ?? null,
        mustaPaalla: Boolean(t.mustaPaalla),
        kehysPiilossa: Boolean(t.kehysPiilossa),
      };
    });
    // Oikea kello, ei näytelaskuri: evaluate maksaa kontissa oman aikansa.
    sarja.push({ ms: Date.now() - t0, ...naytto });
    if (sarja.length > 8 && naytto.kartta > 0.98 && (naytto.palkki ?? 0) > 0.98) break;
    await s.waitForTimeout(250);
  }
  writeFileSync(join(ULOS, `savuke-ihmisen-kehys-${leveys}.json`), JSON.stringify(sarja, null, 1));

  /*
   * NOUSUN JA LASKUN AJAT. Kehys nousee (palkin peittävyys 0 → 1) ja
   * kartta valkenee (mustan peitteen ja avaruuslevyn takaa) samassa
   * 2600 ms:n feidauksessa. Mustan peitteen oma lasku tapahtuu jo
   * paljon aiemmin (nostaMusta vie mustan harsoksi ensimmäisen virkkeen
   * jälkeen), ja juuri siihen kehys ennen tarttui — siksi se mitataan
   * erikseen ja vaaditaan, ettei kehys nouse sen mukana.
   */
  const nousu = (avain) => {
    const alku = sarja.find((r) => (r[avain] ?? 0) > 0.05);
    const perilla = sarja.find((r) => (r[avain] ?? 0) > 0.95);
    return alku && perilla ? { alku: alku.ms, perilla: perilla.ms, kesto: perilla.ms - alku.ms } : null;
  };
  const lasku = (avain) => {
    const alku = sarja.find((r) => (r[avain] ?? 1) < 0.95);
    const perilla = sarja.find((r) => (r[avain] ?? 1) < 0.05);
    return alku && perilla ? { alku: alku.ms, perilla: perilla.ms, kesto: perilla.ms - alku.ms } : null;
  };
  const kehys = nousu('palkki');
  const kartta = nousu('kartta');
  // Musta peite laskee jo paljon aiemmin (nostaMusta, harso) — se on
  // sarjassa mukana vain sen näyttämiseksi, ettei kehys seuraa sitä.
  const musta = lasku('peite');
  /*
   * AVARUUSVAIHE = näytteet ennen kehyksen nousua, joissa kartta on yhä
   * piilossa. Nousun jälkeen kartta on hetken vielä alle rajan (feidaus
   * kestää 2,6 s), eikä se kuulu tähän väitteeseen.
   */
  const avaruudessa = sarja.filter((r) => r.kartta <= 0.05 && r.ms < (kehys?.alku ?? Infinity));
  const vuotaa = avaruudessa.filter((r) => (r.palkki ?? 0) > 0.05 || (r.nappi ?? 0) > 0.05
    || (r.selain ?? 0) > 0.05 || r.liiku > 0);
  vaadi(`${leveys}px: kehys on poissa koko avaruusvaiheen ajan (palkki, reunaviiva, valikkonappi, alapalkki, Liiku)`,
    avaruudessa.length >= 8 && vuotaa.length === 0
      /*
       * Luokka on päällä koko avaruusvaiheen. Valojen syttymisen näyte
       * ('valot') osuu siihen silmänräpäykseen, jossa luokka on juuri
       * poistettu mutta feidaus ei ole vielä ehtinyt yhdellekään
       * piirretylle kehykselle — silloin kartta on yhä pimeä, mutta
       * kehyksen paluu on jo oikeutettu.
       */
      && avaruudessa.every((r) => r.kehysPiilossa === true || r.vaihe === 'valot')
      // Nappi on mitattavissa (leveys > 0) mutta läpinäkyvä.
      && avaruudessa.every((r) => r.napinLeveys > 0),
    JSON.stringify({
      naytteita: avaruudessa.length, vuotoja: vuotaa.length, vuoto: vuotaa.slice(0, 3),
      napinLeveys: avaruudessa[0]?.napinLeveys ?? null,
    }));


  vaadi(`${leveys}px: kehys nousee vasta kartan kanssa ja samalla nopeudella`,
    Boolean(kehys && kartta)
      && Math.abs(kehys.alku - kartta.alku) <= 500
      && Math.abs(kehys.kesto - kartta.kesto) <= 750
      && kehys.alku > musta.perilla + 2000,
    JSON.stringify({ kehys, kartta, mustanLasku: musta }));

  await konteksti.close();
  return { sarja, kehys, kartta, musta };
}

/**
 * KUVAMITTA JA VASTAKOE. Esitys pysäytetään avaruusvaiheessa (tähdet
 * näkyvissä, kartta yhä piilossa) ja yläreunan nauha luetaan
 * kaappauksesta — ensin uudella käytöksellä, sitten vanhalla.
 */
async function kuvamitta(leveys, korkeus) {
  const { s, konteksti } = await avaaSivu(leveys, korkeus);
  const { pallo, lahto } = await avaaLinssi(s);


  if (!pallo || !lahto.ok) { await konteksti.close(); return; }
  await s.evaluate(() => document.querySelector('.aikajana-avaus-nappi')?.click());
  /* Odotetaan, että musta on noussut harsoksi: tähdet ja pieni Maa. */
  for (let n = 0; n < 40; n += 1) {
    const t = await s.evaluate(() => window.matkakirja.ui.aikajana.esitys.tila());
    if (!t.mustaPaalla && t.kehysPiilossa) break;
    await s.waitForTimeout(500);
  }
  await s.evaluate(() => window.matkakirja.ui.aikajana.esitys.tauko());
  await s.waitForTimeout(400);
  const tila = await s.evaluate(() => window.matkakirja.ui.aikajana.esitys.tila());
  const rajaus = await s.evaluate(() => {
    const r = document.querySelector('.aikajana').getBoundingClientRect();
    return { x: Math.ceil(r.x + 3), y: Math.ceil(r.y + 3), width: Math.floor(r.width - 6), height: 86 };
  });
  await s.screenshot({ path: join(ULOS, `savuke-ihmisen-kehys-${leveys}.jpg`), type: 'jpeg', quality: 72 });
  const nyt = kirkkaudet(await s.screenshot({ clip: rajaus }));
  /*
   * NOLLAMITTA. Avaruusvaiheessa yläreunassa on jo TÄHTIÄ, joten
   * "ei kirkkaita pikseleitä" ei kelpaa väitteeksi (mitattu: 56 kirkasta
   * pikseliä 390 px:llä ilman kehystä). Vertailukohta otetaan
   * piilottamalla palkki kokonaan: jos kehys on oikein poissa, kuva on
   * käytännössä sama kuin ilman palkkia.
   */
  await s.evaluate(() => { document.querySelector('.aikajana-ylarivi').style.display = 'none'; });
  await s.waitForTimeout(400);
  const nolla = kirkkaudet(await s.screenshot({ clip: rajaus }));
  await s.evaluate(() => { document.querySelector('.aikajana-ylarivi').style.display = ''; });
  await s.waitForTimeout(400);
  vaadi(`${leveys}px: avaruusvaiheen yläreunassa ei ole kehystä (ei viivaa, ei hampurilaista)`,
    tila.kehysPiilossa === true && tila.mustaPaalla === false
      && Math.abs(nyt.kehysmaisia - nolla.kehysmaisia) <= 40,
    JSON.stringify({ kehysPiilossa: tila.kehysPiilossa, nyt, nolla }));

  /* 3b. VASTAKOE: vanha käytös — kehys palasi jo avaruusvaiheessa. */
  await s.evaluate(() => document.querySelector('.aikajana')?.classList.remove('esitys-avaruus'));
  await s.waitForTimeout(3000);
  await s.screenshot({ path: join(ULOS, `savuke-ihmisen-kehys-vastakoe-${leveys}.png`) });
  const vanha = kirkkaudet(await s.screenshot({ clip: rajaus }));
  vaadi(`${leveys}px: VASTAKOE — vanhalla käytöksellä kehys näkyy avaruusvaiheessa`,
    vanha.kehysmaisia > nolla.kehysmaisia + 100,
    JSON.stringify({ vanha, nolla }));

  /*
   * 4. NAPAUTUS EI TUO KEHYSTÄ. Kehys on poissa koko avaruusvaiheen
   * eikä sitä saa takaisin kesken kaiken — pallolauta ottaa
   * kosketukset vastaan koko esityksen ajan, joten vahinkokosketus
   * tähtitaivaalla toisi kehyksen "liian aikaisin". (Esc ei ole
   * pakotie vaan sulkee koko linssin, js/aikajana.js nappain.)
   */
  await s.evaluate(() => {
    const j = document.querySelector('.aikajana');
    // Sama nolla kuin aloituksessa: kehys katoaa ilman liukua.
    j?.style.setProperty('--avaruuden-feidi', '0ms');
    j?.classList.add('esitys-avaruus');
  });
  await s.waitForTimeout(400);
  const ennen = await s.evaluate(() => Number(getComputedStyle(document.querySelector('.aikajana-ylarivi')).opacity));
  await s.mouse.click(Math.round(leveys / 2), Math.round(korkeus / 2));
  /*
   * ODOTUS ON PITKÄ TARKOITUKSELLA. Kontin ohjelmisto-WebGL piirtää
   * noin kehyksen sekunnissa, ja liukuva opacity päivittyy vain
   * piirretyillä kehyksillä: 800 ms ei riittäisi näyttämään muutosta,
   * jos sellainen tulisi.
   */
  await s.waitForTimeout(3000);
  const jalkeen = await s.evaluate(() => ({
    palkki: Number(getComputedStyle(document.querySelector('.aikajana-ylarivi')).opacity),
    luokka: document.querySelector('.aikajana').classList.contains('esitys-avaruus'),
  }));
  vaadi(`${leveys}px: napautus EI tuo kehystä kesken avaruusvaiheen`,
    ennen <= 0.05 && jalkeen.palkki <= 0.05 && jalkeen.luokka === true,
    JSON.stringify({ ennen, jalkeen }));
  await konteksti.close();
}

/* KOOT=390 ajaa vain kapean ruudun (nopeampi silmukka työn aikana). */
const KOOT = (process.env.KOOT ? process.env.KOOT.split(',').map(Number) : [390, 1400])
  .map((w) => (w === 390 ? [390, 844] : [w, 900]));
for (const [leveys, korkeus] of KOOT) {
  await mittaa(leveys, korkeus);
  await kuvamitta(leveys, korkeus);
}

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

await selain.close();
palvelin.close();
const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} väitettä läpi. Kuvat: ${ULOS}`);
process.exit(kaatui.length ? 1 : 0);
