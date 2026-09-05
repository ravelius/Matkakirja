/*
 * Savuke: PALLON LAATAT OFFLINE, VARAPOLKU JA TURVATILA (pallolauta
 * vaihe 5c; docs/moduulit/karttapallo.md luku 6 ja luvun 7 vaihe 5:
 * *"SW-välimuisti vendorille ja laatoille; varapolku + turvatila; Z8
 * käyttöön ja lähin korkeus laattatarkkuudesta; hover-raycast pois"*).
 *
 * ── MIKSI TÄMÄ ON OMA SAVUKE ──────────────────────────────────────
 *
 * Palvelutyöntekijän fetch OHITTAA Playwrightin page.routen: muissa
 * pallosavukkeissa työntekijä on siksi kytketty pois (serviceWorkers:
 * 'block') ja ämpäri reititetään sivun kautta. Juuri työntekijä on
 * kuitenkin se, mitä vaihe 5c muuttaa. Siksi tässä savukkeessa
 * TYÖNTEKIJÄ ON PÄÄLLÄ ja ämpäri peilataan PAIKALLISEN PALVELIMEN
 * polkuun /ampari/ (js/pallo.js:n R2-osoite korvataan lennossa, kun
 * tiedosto tarjoillaan). Silloin laatat kulkevat oikean sw.js-haaran
 * läpi, ja "lentotila" on yksi kytkin palvelimessa: /ampari/ vastaa
 * 503, aivan kuten katkennut verkko.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   1. Työntekijä ohjaa sivua ja laatat menevät OMAAN koriin
 *      (matkakirja-pallolaatat-v1), eivät pelin versiokoriin.
 *   2. Esilataus: koko maailma tasoille 0–3 ja aloituskaupungin
 *      ympäristö tasolle 4 on korissa (85 + 9 laattaa) — raportoi
 *      uudet laatat, tavut ja keston.
 *   3. LENTOTILA: sama sivu ladataan uudestaan ilman ämpäriä. Pallo
 *      avautuu (ei varapolkua), tasokartta pysyy lepotilassa, ja koko
 *      maailman näkymä piirtyy välimuistin laatoista — ämpäriin ei
 *      lähde yhtään onnistunutta laattapyyntöä.
 *   4. KATTO PITÄÄ: kun koriin työnnetään yli LAATTAKATON verran
 *      laattoja, seuraava laatta laukaisee siivouksen ja kori jää
 *      katon alle (FIFO, vanhimmat pois). Mittaa myös keys()-ajon
 *      keston — se on siivouksen ainoa kustannus.
 *   5. WEBGL-KONTEKSTIN MENETYS: ensimmäinen menetys rakentaa pallon
 *      kerran uudestaan, toinen pudottaa tasokartalle (varapolku,
 *      yksi rivi pelaajalle).
 *   6. TURVATILA: kahden kaatumisen jälkeen seuraava käynnistys avaa
 *      tasokartan ja näyttää rivin "Karttapallo pois käytöstä tällä
 *      laitteella — kytke päälle ratasvalikosta"; ratasvalikon vipu
 *      nollaa laskurin.
 *   7. HOVER-RAYCAST: kosketuslaitteella pallo on levossa ilman
 *      osoitinvuorovaikutusta ja kytkee sen päälle vain sormen ajaksi.
 *      Raportoi kehysajan mediaanin ja p95:n molemmilla tavoilla.
 *
 * Ämpäri kulkee Noden kautta (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 * Selaimen omat R2-pyynnöt (kuvat, äänet) ohjataan kuolleeseen
 * porttiin, jotta ne epäonnistuvat heti eivätkä hidasta ajoa.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-pallolaatat-offline.mjs [kuvakansio]
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

const AMPARI = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/';
const AMPARIN_ISANTA = 'pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev';
const KORI = 'matkakirja-pallolaatat-v1';
/** sw.js:n oma katto — luetaan lähteestä, jotta luku ei karkaa erilleen. */
const LAATTAKATTO = Number(readFileSync(join(JUURI, 'sw.js'), 'utf8').match(/const LAATTAKATTO = (\d+)/)?.[1] ?? 3000);

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* ---------- paikallinen palvelin: peli + ämpärin peili ------------- */

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
};
const noudetut = new Map();
async function ampariHaku(polku) {
  if (noudetut.has(polku)) return noudetut.get(polku);
  const lupaus = fetch(AMPARI + polku).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' }))
    .catch(() => null);
  noudetut.set(polku, lupaus);
  return lupaus;
}

/** Lentotilan kytkin: false = ämpäri ei vastaa (kaikki 503). */
let verkko = true;
let ampariPyynnot = { laatat: 0, muut: 0, torjuttu: 0 };
const nollaaLaskurit = () => { ampariPyynnot = { laatat: 0, muut: 0, torjuttu: 0 }; };

/** Palvelimen oma osoite; asetetaan kun portti on kuuntelussa. */
let osoite = '';
const palvelin = http.createServer(async (req, res) => {
  const polku = req.url.split('?')[0];
  if (polku.startsWith('/ampari/')) {
    const alipolku = polku.slice('/ampari/'.length);
    if (alipolku.includes('/laatat/')) ampariPyynnot.laatat += 1;
    else ampariPyynnot.muut += 1;
    if (!verkko) {
      ampariPyynnot.torjuttu += 1;
      res.writeHead(503, { 'access-control-allow-origin': '*' });
      res.end();
      return;
    }
    /*
     * HARJOITUSTASO Z9: valelaatta, jota ämpärissä ei ole. Korin katto
     * (3 000 laattaa) mitataan työntekijän omalla tiellä, ja oikeilla
     * laatoilla se tarkoittaisi 30 Mt latausta ämpäristä.
     */
    if (/\/laatat\/[^/]+\/9\//.test(alipolku)) {
      res.writeHead(200, {
        'content-type': 'image/jpeg', 'access-control-allow-origin': '*', 'cache-control': 'no-store',
      });
      res.end(Buffer.alloc(64, 7));
      return;
    }
    const vastaus = await ampariHaku(alipolku);
    if (!vastaus || vastaus.status !== 200) {
      res.writeHead(404, { 'access-control-allow-origin': '*' });
      res.end();
      return;
    }
    res.writeHead(200, {
      'content-type': vastaus.tyyppi ?? 'application/octet-stream',
      'access-control-allow-origin': '*',
      // Ei selaimen omaa välimuistia: lentotilassa mitataan SW:n koria.
      'cache-control': 'no-store',
    });
    res.end(vastaus.body);
    return;
  }
  const tiedosto = join(JUURI, polku === '/' ? 'index.html' : polku);
  if (!existsSync(tiedosto)) { res.writeHead(404); res.end(); return; }
  let sisalto = readFileSync(tiedosto);
  // Ämpäri paikalliseen peiliin: vain js/pallo.js tuntee laattaosoitteet.
  if (polku === '/js/pallo.js') {
    sisalto = Buffer.from(String(sisalto).replaceAll(AMPARI, `${osoite}ampari/`));
  }
  res.writeHead(200, {
    'content-type': TYYPIT[extname(tiedosto)] ?? 'application/octet-stream',
    'cache-control': 'no-store',
  });
  res.end(sisalto);
});
await new Promise((ok) => palvelin.listen(0, ok));
osoite = `http://localhost:${palvelin.address().port}/`;

/* ---------- tallenne: Fogg Ateenassa ------------------------------- */

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('ateena');
const tallenne = JSON.stringify(peli.toJSON());

const kirjasto = await ampariHaku('vendor/globe.gl-2.46.2.min.js');
if (kirjasto?.status !== 200) {
  console.log('FAIL  ämpäri ei vastaa — Globe.gl:ää ei saada, savuketta ei voi ajaa');
  palvelin.close();
  process.exit(1);
}

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: [
    '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist',
    // Muut R2-pyynnöt (kuvat, äänet) kaatuvat heti: kontissa ei ole
    // ulkoyhteyttä, eikä palvelutyöntekijän fetchiä voi reitittää.
    `--host-resolver-rules=MAP ${AMPARIN_ISANTA} 127.0.0.1:9`,
    /*
     * SELAIN EI SAA KÄYTTÄÄ KONTIN VÄLITYSPALVELINTA. Ympäristön
     * HTTPS_PROXY ohjaisi myös Chromiumin omat taustapyynnöt (päivitys,
     * telemetria) proxyn läpi: mitattu 5.9.2026 yli 500 epäonnistunutta
     * yhteyttä yhden ajon aikana, ja selain kaatui kesken savukkeen.
     * Ämpäri tulee tässä savukkeessa Noden kautta paikallisena peilinä,
     * joten selain ei tarvitse ulkoverkkoa lainkaan.
     */
    '--no-proxy-server', '--disable-background-networking',
    '--disable-component-update', '--disable-default-apps', '--no-first-run',
  ],
});
// Kosketuslaite: hover-raycastin katkaisu on juuri niiden sääntö.
const ctx = await selain.newContext({
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true,
});
/*
 * Alustus ajetaan JOKAISESSA latauksessa, joten se ei saa koskea
 * kaatumislaskuriin: turvatilan mittaus (vartija 6) asettaa sen ennen
 * sivunlatausta, ja nollaus täällä pyyhkisi juuri sen.
 */
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
sivu.on('console', (m) => { if (m.type() === 'error') virheet.push(m.text()); });

const avaaPallo = async (aikakatko = 60000) => sivu
  .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: aikakatko, polling: 500 })
  .then(() => true).catch(() => false);

/* ================= 1. TYÖNTEKIJÄ JA OMA KORI ====================== */

/*
 * TYÖNTEKIJÄ REKISTERÖIDÄÄN KÄSIN. Peli tekee sen itse sivun
 * `load`-tapahtumassa (js/main.js), mutta kontissa load ei tule:
 * ämpärin media (kuvat, äänet) on tavoittamattomissa, ja kesken
 * jäävät pyynnöt pitävät readyStaten "interactive"-tilassa määrättömän
 * ajan (mitattu 5.9.2026: yli 120 s tallenteen kanssa). Rekisteröinti
 * on siis harjoituksen alkuehto, ei mitattava asia — mitattava on se,
 * mitä työntekijä tekee laatoille.
 */
await sivu.goto(`${osoite}?lauta=kartta`, { waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.evaluate(() => navigator.serviceWorker.register('sw.js').catch(() => null));
const ohjain = await sivu.waitForFunction(() => Boolean(navigator.serviceWorker?.controller), null,
  { timeout: 120000, polling: 1000 }).then(() => true).catch(() => false);
await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000, polling: 500 });
const auki = await avaaPallo();
vaadi('1. palvelutyöntekijä ohjaa sivua ja pallolauta avautuu', ohjain && auki,
  JSON.stringify({ ohjain, auki, virheet: virheet.slice(0, 3) }));
if (!ohjain || !auki) {
  console.log('\nSavuke ei voi jatkaa ilman työntekijää ja palloa.');
  await selain.close();
  palvelin.close();
  process.exit(1);
}

/* ================= 2. ESILATAUS OMALLA PORTILLA ==================== */
/*
 * Sama lista kuin pelin oma esilataus (js/pallo.js esilatauksenLaatat),
 * mutta oman portin kautta, jotta työntekijän raportti (uudet laatat,
 * tavut, kesto) saadaan mitattua. Pelin oma viesti lähtee 3 s laudan
 * avautumisesta ja löytää laatat silloin jo korista.
 */
const esilataus = await sivu.evaluate(async () => {
  const moduuli = await import('/js/pallo.js');
  const laatat = await moduuli.laatatSaatavilla();
  const kaupunki = { lat: 37.98, lon: 23.73 }; // Ateena (tallenteen kaupunki)
  const osoitteet = moduuli.esilatauksenLaatat({
    ...kaupunki, maxTaso: moduuli.laattatasoMax(laatat),
  });
  const kanava = new MessageChannel();
  const raportti = new Promise((ok) => {
    kanava.port1.onmessage = (e) => ok(e.data ?? null);
    setTimeout(() => ok(null), 120000);
  });
  navigator.serviceWorker.controller.postMessage(
    { tyyppi: 'esilataa-pallolaatat', kansio: moduuli.PALLO_LAATTAKANSIO, osoitteet },
    [kanava.port2],
  );
  return { pyydetty: osoitteet.length, osoitteet, raportti: await raportti };
});
const raportti = esilataus.raportti ?? {};
vaadi('2. esilataus: koko maailma (0–3) ja aloituskaupungin ympäristö (4) haetaan koriin',
  esilataus.pyydetty === 94 && (raportti.uusia ?? 0) + (raportti.jo ?? 0) === esilataus.pyydetty,
  JSON.stringify({ pyydetty: esilataus.pyydetty, raportti }));
tieto('esilataus: uusia / jo korissa / tavuja / kesto (ms)',
  `${raportti.uusia} / ${raportti.jo} / ${raportti.tavuja} / ${raportti.kesto}`);

const koriTila = async (otos = 0) => sivu.evaluate(async ({ nimi, n }) => {
  const kori = await caches.open(nimi);
  const alku = performance.now();
  const avaimet = await kori.keys();
  const keysMs = performance.now() - alku;
  let tavuja = 0;
  if (n) {
    for (const p of avaimet.slice(0, n)) {
      // eslint-disable-next-line no-await-in-loop
      const v = await kori.match(p);
      // eslint-disable-next-line no-await-in-loop
      if (v) tavuja += (await v.clone().arrayBuffer()).byteLength;
    }
  }
  return { maara: avaimet.length, tavuja, keysMs };
}, { nimi: KORI, n: otos });

const kori1 = await koriTila(200);
const maailmaKorissa = await sivu.evaluate(async ({ nimi, osoitteet }) => {
  const kori = await caches.open(nimi);
  let loytyi = 0;
  for (const u of osoitteet) {
    // eslint-disable-next-line no-await-in-loop
    if (await kori.match(u)) loytyi += 1;
  }
  return loytyi;
}, { nimi: KORI, osoitteet: esilataus.osoitteet });
vaadi('   kaikki esiladatut laatat ovat omassa korissa',
  maailmaKorissa === esilataus.pyydetty && kori1.maara >= esilataus.pyydetty,
  JSON.stringify({ loytyi: maailmaKorissa, korissa: kori1.maara }));
tieto('kori esilatauksen jälkeen: laattoja / otoksen (200) tavut / keys() ms',
  `${kori1.maara} / ${kori1.tavuja} / ${kori1.keysMs.toFixed(1)}`);

/* ================= 7. HOVER-RAYCAST (mitattu kehysaika) ============ */

const kehysMittaus = async (paalla) => sivu.evaluate(async (p) => {
  const { ui } = window.matkakirja;
  ui.pallonInstanssi.enablePointerInteraction(p);
  await new Promise((r) => setTimeout(r, 400));
  return new Promise((ok) => {
    const valit = [];
    let edellinen = performance.now();
    const askel = (t) => {
      valit.push(t - edellinen); edellinen = t;
      if (valit.length < 90) requestAnimationFrame(askel);
      else { valit.sort((a, b) => a - b); ok({ mediaani: valit[45], p95: valit[85] }); }
    };
    requestAnimationFrame(askel);
  });
}, paalla);
const hoverPaalla = await kehysMittaus(true);
const hoverPois = await kehysMittaus(false);
tieto('kehysaika hover-raycast PÄÄLLÄ (mediaani / p95 ms)',
  `${hoverPaalla.mediaani.toFixed(1)} / ${hoverPaalla.p95.toFixed(1)}`);
tieto('kehysaika hover-raycast POIS (mediaani / p95 ms)',
  `${hoverPois.mediaani.toFixed(1)} / ${hoverPois.p95.toFixed(1)}`);

const osoitinKytkin = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const kotelo = ui.pallolauta.kotelo;
  const pallo = ui.pallonInstanssi;
  const lepo = pallo.enablePointerInteraction();
  kotelo.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 1 }));
  const sormella = pallo.enablePointerInteraction();
  kotelo.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 1 }));
  await new Promise((r) => setTimeout(r, 900));
  return { lepo, sormella, jalkeen: pallo.enablePointerInteraction() };
});
vaadi('7. hover-raycast on kosketuslaitteella pois levossa ja päällä vain sormen ajan',
  osoitinKytkin.lepo === false && osoitinKytkin.sormella === true && osoitinKytkin.jalkeen === false,
  JSON.stringify(osoitinKytkin));

if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'pallolaatat-verkossa.png') });

/* ================= 3. LENTOTILA ==================================== */

verkko = false;
nollaaLaskurit();
await sivu.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000, polling: 500 });
const lentoAuki = await avaaPallo(45000);
// Koko maailman näkymä: juuri se, mitä esilataus varasi.
const lentotila = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  if (ui.pallolauta) {
    await ui.pallolauta.kamera.ajaKamera({ x: 6000, y: 2000, leveys: 12000 }, { kesto: 0 });
    await new Promise((r) => setTimeout(r, 4000));
  }
  const pallo = ui.pallonInstanssi;
  return {
    pallolauta: Boolean(ui.pallolauta),
    lepotila: ui.kartta.lepotila,
    svgLapsia: document.querySelectorAll('#board *').length,
    tekstuurit: pallo?.renderer?.()?.info?.memory?.textures ?? null,
    leveys: ui.pallolauta?.kamera?.kameranTila?.()?.leveys ?? null,
  };
});
vaadi('3. lentotila: pallo avautuu ilman ämpäriä ja tasokartta pysyy poissa',
  lentoAuki && lentotila.pallolauta && lentotila.lepotila === true && lentotila.svgLapsia === 0,
  JSON.stringify(lentotila));
vaadi('   maailma piirtyy välimuistin laatoista (tekstuureja ladattu, ämpäri ei vastannut)',
  (lentotila.tekstuurit ?? 0) >= 5 && ampariPyynnot.torjuttu > 0,
  JSON.stringify({ tekstuurit: lentotila.tekstuurit, ampari: ampariPyynnot }));
tieto('lentotilassa ämpäriin lähteneet (torjutut) pyynnöt: laattoja / muita',
  `${ampariPyynnot.laatat} / ${ampariPyynnot.muut}`);
if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'pallolaatat-lentotila.png') });

/* ================= 4. KATTO PITÄÄ ================================== */

/*
 * Katto mitataan TYÖNTEKIJÄN OMALLA tiellä: sille lähetetään esilataus,
 * jossa on katon verran laattoja enemmän kuin koriin mahtuu. Palvelin
 * vastaa harjoitustason (Z9) laattoihin pienellä valelaatalla, joten
 * ämpäriä ei rasiteta eikä testi lataa 30 megatavua. Sivun omat
 * cache.put-kutsut EIVÄT kelpaa mittariksi: työntekijä ei näe niitä,
 * ja juuri sen takia korin koko myös mitataan erän välein uudestaan.
 */
verkko = true;
const tayttoAlku = Date.now();
const kattoRaportti = await sivu.evaluate(async ({ maara, pohja }) => {
  const osoitteet = Array.from({ length: maara }, (_, i) => `${pohja}9/${i}/0.jpg`);
  const kanava = new MessageChannel();
  const valmis = new Promise((ok) => {
    kanava.port1.onmessage = (e) => ok(e.data ?? null);
    setTimeout(() => ok(null), 240000);
  });
  navigator.serviceWorker.controller.postMessage(
    { tyyppi: 'esilataa-pallolaatat', kansio: '2026-09-03a-nostot', osoitteet },
    [kanava.port2],
  );
  return valmis;
}, { maara: LAATTAKATTO + 200, pohja: `${osoite}ampari/julisteet/pallo/laatat/2026-09-03a-nostot/` });
const tayttoMs = Date.now() - tayttoAlku;
const kori2 = await koriTila();
/*
 * Yksi esilataus ei voi ylittää kattoa kuin korissa jo olevien laattojen
 * verran: työntekijä rajaa listan katon mittaiseksi (sw.js esilataaLaatat
 * slice). Korissa oli ennen tätä esilatauksen ja pelin omat laatat, joten
 * katto ylittyy — ja siivouksen jälkeen luvun on oltava katon alla.
 */
vaadi('4. korin katto pitää: siivous poistaa vanhimmat, kun katto ylittyy',
  (kattoRaportti?.uusia ?? 0) >= LAATTAKATTO && kori2.maara <= LAATTAKATTO
    && kori2.maara > LAATTAKATTO - 600,
  JSON.stringify({ raportti: kattoRaportti, jalkeen: kori2.maara, katto: LAATTAKATTO }));
tieto('katto: kirjoitettuja / korissa / katto, keys() ms, kirjoitusaika ms',
  `${kattoRaportti?.uusia} / ${kori2.maara} / ${LAATTAKATTO}, ${kori2.keysMs.toFixed(1)}, ${tayttoMs}`);

/* ================= 5. WEBGL-KONTEKSTIN MENETYS ===================== */

await sivu.evaluate(() => { try { localStorage.removeItem('matkakirja-pallo-kaatumiset'); } catch { /* — */ } });
await sivu.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000, polling: 500 });
const uusiAuki = await avaaPallo(45000);
const kaadaKonteksti = async () => sivu.evaluate(() => {
  const kangas = document.querySelector('.pallo-kuori.pallolauta canvas');
  const gl = kangas?.getContext('webgl2') ?? kangas?.getContext('webgl');
  const ext = gl?.getExtension('WEBGL_lose_context');
  if (!ext) return false;
  ext.loseContext();
  return true;
});
// Vanha lauta talteen, jotta uudelleenrakennus erottuu vanhasta oliosta.
const ensimmainenInstanssi = await sivu.evaluate(() => {
  window.__vanhaLauta = window.matkakirja?.ui?.pallolauta ?? null;
  return Boolean(window.matkakirja?.ui?.pallonInstanssi);
});
const kaato1 = uusiAuki && await kaadaKonteksti();
const uudelleen = await sivu.waitForFunction(
  () => {
    const { ui } = window.matkakirja;
    return Boolean(ui.pallolauta) && ui.pallolauta !== window.__vanhaLauta && !ui.pallolautaEpaonnistui;
  },
  null, { timeout: 60000, polling: 500 },
).then(() => true).catch(() => false);
const kaatumiset1 = await sivu.evaluate(() => localStorage.getItem('matkakirja-pallo-kaatumiset'));
vaadi('5. WebGL-kontekstin menetys rakentaa pallon kerran uudestaan',
  kaato1 && ensimmainenInstanssi && uudelleen && kaatumiset1 === '1',
  JSON.stringify({ kaato1, uudelleen, kaatumiset: kaatumiset1 }));

const kaato2 = await kaadaKonteksti();
const varapolku = await sivu.waitForFunction(
  () => document.querySelectorAll('#board *').length > 100,
  null, { timeout: 60000, polling: 500 },
).then(() => true).catch(() => false);
const varatila = await sivu.evaluate(() => ({
  pallolauta: Boolean(window.matkakirja.ui.pallolauta),
  lepotila: window.matkakirja.ui.kartta.lepotila,
  kuori: Boolean(document.querySelector('.pallo-kuori.pallolauta')),
  ilmoitus: [...document.querySelectorAll('.event-toast')].some((t) => /pelataan kartalla/.test(t.textContent)),
  kaatumiset: localStorage.getItem('matkakirja-pallo-kaatumiset'),
}));
vaadi('   toinen menetys pudottaa tasokartalle tälle istunnolle (yksi rivi)',
  kaato2 && varapolku && !varatila.pallolauta && varatila.lepotila === false
    && !varatila.kuori && varatila.ilmoitus && varatila.kaatumiset === '2',
  JSON.stringify(varatila));
if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'pallolaatat-varapolku.png') });

/* ================= 6. TURVATILA ==================================== */

/*
 * Laskuri asetetaan rajalle KÄSIN, vaikka vartija 5 juuri jätti sen
 * kahteen: uudelleenrakennettu pallo ehtii kontin hitaudessa elää yli
 * PALLON_TURVATILAN_UNOHDUS_MS:n mittaisen "vakaan istunnon", jolloin
 * se nollaa laskurin juuri niin kuin sen kuuluukin. Turvatila mitataan
 * siksi tunnetusta lähtötilasta — se, että kaatumiset kertyvät, on
 * vartijan 5 asia.
 */
await sivu.evaluate(() => {
  try { localStorage.setItem('matkakirja-pallo-kaatumiset', '2'); } catch { /* — */ }
});
await sivu.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000, polling: 500 });
const kartalle = await sivu.waitForFunction(() => document.querySelectorAll('#board *').length > 100, null, { timeout: 120000, polling: 500 })
  .then(() => true).catch(() => false);
await sivu.waitForTimeout(1200);
const turvatila = await sivu.evaluate(async () => {
  const apurit = await import('/js/ui-apurit.js');
  const { ui } = window.matkakirja;
  return {
    pallolauta: Boolean(ui.pallolauta),
    lepotila: ui.kartta.lepotila,
    kaatumiset: localStorage.getItem('matkakirja-pallo-kaatumiset'),
    turvatila: apurit.palloTurvatilassa(),
    halutaan: ui.pallolautaHalutaan(),
    // Rivi näytetään kerran istunnossa; se ehtii kadota ruudulta, joten
    // lippu on luotettavampi mittari kuin auki oleva ilmoituslaatikko.
    ilmoitettu: Boolean(ui.pallonTurvatilaIlmoitettu),
    rivit: [...document.querySelectorAll('.event-toast')].map((t) => t.textContent.trim()),
  };
});
vaadi('6. turvatila: kahden kaatumisen jälkeen käynnistys avaa tasokartan ja kertoo rivillä',
  kartalle && !turvatila.pallolauta && turvatila.lepotila === false
    && turvatila.turvatila === true && turvatila.ilmoitettu,
  JSON.stringify(turvatila));

const vipu = await sivu.evaluate(async () => {
  const nappi = document.getElementById('kehittaja-pallo-turvatila-btn');
  if (!nappi) return { nappi: false };
  nappi.click();
  await new Promise((r) => setTimeout(r, 150));
  return { nappi: true, kaatumiset: localStorage.getItem('matkakirja-pallo-kaatumiset') };
});
vaadi('   ratasvalikon vipu nollaa laskurin', vipu.nappi && vipu.kaatumiset === null, JSON.stringify(vipu));

if (virheet.length) tieto('sivun virheet (viisi ensimmäistä)', virheet.slice(0, 5).join(' | '));

await ctx.close();
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
