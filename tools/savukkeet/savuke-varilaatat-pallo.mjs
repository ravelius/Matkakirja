/*
 * Savuke: VÄRILAATAT PALLOLLA — kohdemaan värillinen topografia ja
 * uloszoomauksen esto (karttauudistus, erät 1b ja 2).
 *
 *   PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *     node tools/savukkeet/savuke-varilaatat-pallo.mjs --laatat <kansio>
 *          [--ilman-rajausta] [--rikki-versio] [--kuvat <kansio>]
 *          [--nimi <tunnus>]
 *
 * Omistaja 13.9.2026 (karttauudistuksen PÄÄTÖKSET 2 ja 3): kohdemaan
 * korkeuserot *"seepiaan sointuvilla MURRETUILLA savyilla"*, *"MUUT
 * MAAT FEIDATAAN vaaleammiksi"*, kehä punainen, ja *"Pelaaja ei voi
 * itse zoomata ulospain, ainoastaan sisaanpain"* — kaikki PALLOLLE,
 * koska tasokartta on pelistä pois (PÄÄTÖKSET 3).
 *
 * === MIKSI TÄMÄ MITTAA KAHDESSA VAIHEESSA ==========================
 *
 * Murrettu paletti on TARKOITUKSELLA vähemmän kylläinen kuin pelin
 * seepia (suunnitelman luku 2.3: kroma 39 vs. 68). Erän 1 savuke
 * luokitteli pikselin kolmella absoluuttisella ehdolla — sininen,
 * vihreä, lämmin — mutta murretulla paletilla Ranskan alanko on
 * samassa lämpimässä perheessä kuin seepia: absoluuttinen kynnys
 * mittaisi kynnystä eikä väriä.
 *
 * Siksi sama neljä pistettä mitataan KAHDESTI samassa ajossa:
 *
 *   A  ILMAN VÄRITASOA. Luettelosta tarjoillaan `varitasot`-taulu
 *      poistettuna, eli peli on täsmälleen se, mikä se oli ennen tätä
 *      erää. Tämä on samalla valmis-kriteerin vaatima vertailuajo.
 *   B  VÄRITASO PÄÄLLÄ, sama kamera, sama taso, samat pisteet.
 *
 * Väitteet ovat A:n ja B:n EROJA, eivät kynnyksiä — ja juuri ero on
 * se, mitä omistajan lause vaatii: kohdemaa muuttuu, naapuri
 * vaalenee, aluevesi sinertyy, avomeri vaalenee.
 *
 * === MITÄ TÄMÄ VARTIOI =============================================
 *
 *   V0  Kerros on pallolla ja se on Ranskan: `variMaa === 'FRA'` ja
 *       `varillisia > 0`.
 *   V1  `mittarit().syy` on tyhjä — versioportti
 *       (js/pallolaatat.js lepokerroksenKerrokset) EI sammuttanut
 *       laattakerrosta. Ilman tätä väritaso voisi olla "päällä"
 *       kartalla, joka on pelkkää sumeaa Mercator-sarjaa.
 *   V2  RANSKAN SISÄLTÄ pikseli MUUTTUI ja tummui: murrettu alanko on
 *       seepiaa tummempi (mitattu asteikoista: 207 vs. 224).
 *   V3  BELGIAN PUOLELTA pikseli VAALENI ja pysyi seepiana — omistajan
 *       *"MUUT MAAT FEIDATAAN vaaleammiksi"*. Sävyn on pysyttävä
 *       lämpimänä (r > g > b): feidaus on paperia, ei väriä.
 *   V4  ALUEVESI (12 mpk) SINERTYI: A:ssa r > b (seepia), B:ssä
 *       b >= r (savunsininen).
 *   V5  AVOMERI 40 mpk:n päässä VAALENI ja pysyi seepiana — se on
 *       leikkurin ulkopuolella eikä saa sinertyä.
 *   V6  Laattamäärä pallolla ei kasva yli +10 %: väri on samassa
 *       kankaassa eikä tuo verkkoa eikä tekstuuria.
 *   V7  ULOSZOOMAUKSEN ESTO Ranskassa: kameran etäisyys ei ylitä
 *       laatikko × 1,15 -rajaa, vaikka zoomaa ulos.
 *   V8  RUS EI LUKKIUDU: Venäjässä rajaa ei aseteta (laatikko ei mahdu
 *       saapumisrajaukseen), eli kamera pääsee laudan omaan kattoon.
 *
 * === VASTAKOKEET OVAT PAKOLLISIA ===================================
 *
 *   `--ilman-rajausta`  laatat on ajettu ILMAN poltettua leikkuria
 *                       (generaattorin sama lippu). Silloin V3 ja V5
 *                       ON KAADUTTAVA: Belgia ja avomeri saavat
 *                       murretun paletin täydellä peitolla.
 *   `--rikki-versio`    pyramidin luettelon versio muutetaan niin,
 *                       ettei se vastaa pallon sarjaa. Silloin V1 ON
 *                       KAADUTTAVA (`syy` ei ole tyhjä) — se on ainoa
 *                       koe siitä, että V1 mittaa porttia.
 *
 * === POHJA TULEE OIKEASTA ÄMPÄRISTÄ ================================
 *
 * Vain `vari/z…` tarjoillaan paikallisesta pilottikansiosta; pohja,
 * ranta-, viiva- ja nostotaso tulevat tuotannon pyramidista. Syy on
 * versioportti: pallon sarja (laatat.json) ja pyramidi (pyramidi.json)
 * on oltava samaa versiota, tai kerros sammuu kokonaan. Pilottipohjalla
 * savuke mittaisi siis sammunutta kerrosta — ja tämä tapa on myös
 * rehellisempi: kartta on se kartta, jonka omistaja näkee.
 */
import http from 'node:http';
import {
  existsSync, mkdirSync, readFileSync, writeFileSync,
} from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : oletus;
};
const LAATAT = valitsin('laatat', process.env.PYRAMIDI_VARILAATAT ?? '');
const ILMAN_RAJAUSTA = argv.includes('--ilman-rajausta');
const RIKKI_VERSIO = argv.includes('--rikki-versio');
const KUVAT = valitsin('kuvat', '');
const NIMI = valitsin('nimi', ILMAN_RAJAUSTA ? 'ilman-rajausta' : (RIKKI_VERSIO ? 'rikki-versio' : 'vihrea'));

/*
 * OHITUS ILMAN LAATTOJA. Savuke tarvitsee pilottilaataston, eikä sitä
 * ole repossa (laatat menevät ämpäriin). Sarja-ajossa
 * (tools/tarkista-savukkeet.mjs) tämä on ohitus eikä kaatuminen —
 * sama käytäntö kuin erän 1 savukkeella.
 */
if (!LAATAT || !existsSync(join(LAATAT, 'pyramidi.json'))) {
  console.log('OHITUS: pilottilaatastoa ei annettu. Aja ensin\n'
    + '  node tools/generoi-laattapyramidi.mjs <kansio> --data <ne-kansio> \\\n'
    + '       --tasot 4-7 --kaariminuutit 3 --vari FRA --variversio pilotti\n'
    + 'ja anna kansio: --laatat <kansio> (tai PYRAMIDI_VARILAATAT).');
  process.exit(0);
}
const PILOTTI = JSON.parse(readFileSync(join(LAATAT, 'pyramidi.json'), 'utf8'));
const VARITASOT = PILOTTI.varitasot ?? null;
if (!VARITASOT?.FRA?.tasot?.length) {
  console.error('Pilottiluettelossa ei ole varitasot.FRA-kirjausta — onko ajo tehty --vari FRA:lla?');
  process.exit(2);
}

/*
 * MITTAUSPISTEET ASTEINA (samat kuin erän 1 savukkeella, jotta luvut
 * ovat vertailukelpoisia). Jokainen on valittu niin, ettei sen päällä
 * ole kaupunkia, reittiä eikä nostoa.
 */
const PISTEET = [
  {
    avain: 'ranska', lon: 2.0, lat: 47.3, ryhma: 'maa', odotus: 'tummui',
    seloste: 'Keski-Ranska (Sologne, ~120 m)',
  },
  {
    avain: 'belgia', lon: 4.6, lat: 50.6, ryhma: 'maa', odotus: 'vaaleni-seepia',
    seloste: 'Belgia (Namurin seutu, ~50 km rajasta)',
  },
  {
    avain: 'aluevesi', lon: 5.3, lat: 43.15, ryhma: 'meri', odotus: 'sinertyi',
    seloste: 'Välimeri Marseillen edustalla, ~8 mpk rannasta',
  },
  {
    avain: 'avomeri', lon: 5.3, lat: 42.5, ryhma: 'meri', odotus: 'vaaleni-seepia',
    seloste: 'Välimeri ~40 mpk rannasta',
  },
];

/*
 * KAKSI MITTAUSKAMERAA, EIKÄ YKSI. Ensimmäisessä ajossa kaikki neljä
 * pistettä mitattiin saapumisnäkymästä, ja aluevesi luki lämpimäksi:
 * 12 mpk:n kaistale on 6,7 lautayksikköä eli siinä näkymässä 4 css-
 * pikseliä, ja mediaani 9 × 9 laitepikselin ruudusta sekoitti siihen
 * rantaviivan ja maan. Kaistaleen mittaaminen vaatii näkymän, jossa se
 * on kymmeniä pikseleitä leveä — ja zoomaaminen SISÄÄN on juuri se,
 * mitä erän 2 esto sallii.
 *
 * Laatikot ovat laudan yksiköissä (LAUTA-projektio alla).
 */
const KAMERAT = {
  maa: {
    seloste: 'Ranska ja Belgia (saapumisnäkymää lähempänä)',
    lon0: 0.5, lat0: 46.2, lon1: 6.2, lat1: 51.6,
  },
  meri: {
    seloste: 'Marseillen edusta: 12 mpk:n kaistale ja avomeri',
    lon0: 4.6, lat0: 42.1, lon1: 6.0, lat1: 43.5,
  },
};

/*
 * LAUDAN PROJEKTIO ON LUKITTU (leveys 12000, lon0 −175, pohjoinen 76;
 * tools/generoi-laattapyramidi.mjs LAUTA). Kaava on tässä auki eikä
 * tuotuna, koska savuke ei saa tuoda pelin karttamoduuleja Node-
 * puolelle — sivu tuo ne itse. Sama ratkaisu kuin erän 1 savukkeessa.
 */
const RAD = Math.PI / 180;
const SKAALA = 12000 / (2 * Math.PI);
const millerY = (lat) => -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RAD));
const Y0 = millerY(76);
const lautaX = (lon) => ((((lon + 175) * RAD) % (2 * Math.PI)) + 2 * Math.PI)
  % (2 * Math.PI) * SKAALA;
const lautaY = (lat) => (millerY(lat) - Y0) * SKAALA;
const laatikkoAsteista = (k) => {
  const x0 = lautaX(k.lon0);
  const x1 = lautaX(k.lon1);
  const y0 = lautaY(k.lat1);
  const y1 = lautaY(k.lat0);
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
};

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const reitti = req.url.split('?')[0];
  const polku = join(JUURI, reitti === '/' ? 'index.html' : reitti);
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
  console.log('OHITUS: ämpäri ei vastaa — pallo ei voi latautua, savuke ei voi mitata.');
  palvelin.close();
  process.exit(0);
}

/*
 * VÄRITASO PÄÄLLE JA POIS ON YKSI LIPPU PALVELIMELLA, eikä pelin
 * koodin muutos: sama sivu, sama kamera, sama laattataso — vain
 * luettelon `varitasot`-taulu on tai ei ole. Näin A- ja B-vaihe
 * eroavat täsmälleen siinä, mitä tämä erä lisäsi.
 */
let variPaalla = false;

/** Pilotin väriversio (polun osa): tästä tunnistetaan paikalliset laatat. */
const VARIVERSIO = VARITASOT.FRA.versio;

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--disable-dev-shm-usage'],
});
/* Tallenne: Fogg Ateenassa (sama kuin muilla pallosavukkeilla). */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());
const ctx = await selain.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 3,
  serviceWorkers: 'block',
});
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    localStorage.removeItem('matkakirja-lauta');
  } catch { /* yksityinen selaus */ }
}, tallenne);
const sivu = await ctx.newPage();
sivu.setDefaultTimeout(120000);
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
  const url = route.request().url();
  const osa = url.split('/julisteet/pyramidi/')[1] ?? null;
  /*
   * VÄRILAATTA PAIKALLISESTA KANSIOSTA. Osoite on
   * `<variversio>/vari/z<taso>/<sarake>/<rivi>.webp`, ja kansiossa
   * laatat ovat suoraan `vari/z…`-polussa ilman versio-osaa.
   */
  if (osa && osa.includes('/vari/')) {
    const tiedosto = join(LAATAT, osa.slice(osa.indexOf('/vari/') + 1));
    if (!existsSync(tiedosto)) { route.fulfill({ status: 404, body: 'ei' }); return; }
    route.fulfill({
      status: 200,
      contentType: 'image/webp',
      body: readFileSync(tiedosto),
      headers: { 'access-control-allow-origin': '*' },
    });
    return;
  }
  const vastaus = await ampariHaku(url);
  if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
  /*
   * LUETTELOON LISÄTÄÄN PILOTIN VÄRITASOT. Tuotannon pyramidi.json ei
   * tunne niitä, koska laatat ovat vain tässä kansiossa. Tasogeometria
   * (laatta 512, sarakkeet, arkki, projektio) on sama molemmissa —
   * tarkistetaan alla, eikä oleteta.
   */
  if (osa === 'pyramidi.json') {
    const luettelo = JSON.parse(vastaus.body.toString('utf8'));
    if (variPaalla) luettelo.varitasot = VARITASOT;
    /*
     * VASTAKOE 2: pyramidin versio muutetaan, pallon sarjaa ei.
     * Silloin lepokerroksenKerrokset palauttaa nullin ja koko
     * laattakerros sammuu — `syy` kertoo sen.
     */
    if (RIKKI_VERSIO) luettelo.versio = `${luettelo.versio}-rikki`;
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(luettelo),
      /*
       * EI VÄLIMUISTIA LUETTELOLLE. Savuke tarjoilee saman osoitteen
       * kahdesti eri sisällöllä (A ilman väritasoja, B niiden kanssa),
       * ja välimuistista tullut vastaus tekisi B:stä A:n kopion —
       * kaksi identtistä mittausta ja kaikki väitteet punaisina.
       */
      headers: { 'access-control-allow-origin': '*', 'cache-control': 'no-store' },
    });
    return;
  }
  route.fulfill({
    status: 200,
    contentType: vastaus.tyyppi ?? 'application/octet-stream',
    body: vastaus.body,
    headers: { 'access-control-allow-origin': '*' },
  });
});

/* Tasogeometrian yhteensopivuus: pilotti ja tuotanto samalla ruudukolla. */
{
  const tuotanto = await ampariHaku(`${AMPARI}julisteet/pyramidi/pyramidi.json`);
  const luettelo = tuotanto?.status === 200 ? JSON.parse(tuotanto.body.toString('utf8')) : null;
  const sama = luettelo && luettelo.laatta === PILOTTI.laatta
    && JSON.stringify(luettelo.projektio) === JSON.stringify(PILOTTI.projektio)
    && JSON.stringify(luettelo.arkki) === JSON.stringify(PILOTTI.arkki)
    && VARITASOT.FRA.tasot.every((z) => {
      const a = luettelo.tasot.find((t) => t.z === z);
      const b = PILOTTI.tasot.find((t) => t.z === z);
      return a && b && a.sarakkeita === b.sarakkeita && a.riveja === b.riveja;
    });
  vaadi('pilottilaatasto on tuotannon laattaruudukolla', Boolean(sama),
    'laatta, projektio, arkki tai sarakkeet eroavat — värilaatat osuisivat väärään kohtaan');
  tieto('tuotannon pyramidi', `${luettelo?.versio} (pilotin väriversio ${VARIVERSIO})`);
}

await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
  .then(() => true).catch(() => false);
vaadi('pallolauta avautuu', auki);
if (!auki) {
  console.log(`\n${lapi}/${kaikki} väitettä läpi — pallo ei avautunut`);
  await ctx.close();
  await selain.close();
  palvelin.close();
  process.exit(1);
}
await sivu.waitForTimeout(2500);

/** Pelaaja Pariisiin ja saapumisajo (maan laatikko ruutuun). */
const alku = await sivu.evaluate(async () => {
  const g = window.matkakirja.game;
  if (g.phase === 'pickstart') g.actionPickStart('lontoo', 0);
  const p = g.player;
  p.pos = { type: 'city', city: 'pariisi' };
  g.visitCity(p);
  window.matkakirja.ui.render();
  return { vaihe: g.phase, kaupunki: g.player?.pos?.city ?? null };
});
tieto('lähtö', JSON.stringify(alku));
await sivu.waitForTimeout(4000);
await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu({ kesto: 0 }));
await sivu.waitForTimeout(3000);

/** Laattakerroksen mittarit (js/pallolaatat.js). */
const mittarit = () => sivu.evaluate(() => {
  const m = window.matkakirja.ui.pallolauta.lepokerros()?.mittarit?.() ?? null;
  if (!m) return null;
  return {
    tila: m.tila, taso: m.taso, syy: m.syy, laattoja: m.laattoja, scenessa: m.scenessa,
    valmiita: m.valmiita, jumissa: m.jumissa, hapyvia: m.hapyvia,
    nakyvia: m.nakyvia, nakyviaScenessa: m.nakyviaScenessa,
    varillisia: m.varillisia, variMaa: m.variMaa,
    kaytetytTavut: m.kaytetytTavut,
  };
});

/** Odota lepoa: ei jumissa olevia eikä keskeneräisiä latauksia. */
async function odotaLepo(kierroksia = 14) {
  for (let i = 0; i < kierroksia; i += 1) {
    await sivu.evaluate(() => window.matkakirja.ui.pallolauta.lepokerros()?.kokoa?.()); // eslint-disable-line no-await-in-loop
    await sivu.waitForTimeout(1500); // eslint-disable-line no-await-in-loop
    const m = await mittarit(); // eslint-disable-line no-await-in-loop
    /*
     * LEPO ON KOLME EHTOA: ei jumissa olevia, kaikki valmiita JA
     * häive perillä. Kesken häivytyksen mitattu pikseli on kahden
     * kartan sekoitus — ja juuri se teki ensimmäisessä ajossa
     * avomeren pisteestä eri värin A:ssa ja B:ssä, vaikka piste on
     * laataston ulkopuolella eikä voi muuttua.
     */
    if (m && m.jumissa === 0 && m.valmiita > 0 && m.valmiita >= m.laattoja
      && m.hapyvia === 0) return m;
  }
  return mittarit();
}

/*
 * PIKSELIN LUKU PALLOLTA. Pisteen ruutupaikka tulee Globe.gl:n omalta
 * `getScreenCoords`ilta — sama matriisi, jolla kirjasto asettaa pallon
 * pinnan ruudulle; oma kaava olisi toinen totuus projektiosta.
 *
 * MEDIAANI 9 × 9 RUUDUSTA: paperin rae ja pigmentti heittelevät
 * yksittäistä pikseliä kymmenen sävyä.
 *
 * JOKAINEN PISTE TARKISTETAAN `elementFromPoint`illa (erän 1 ansa 1:
 * mittauspiste osui saapumiskorttiin ja väite meni läpi myös silloin,
 * kun leikkuri oli rikki). Pallon kangas on karttaruudun lapsi.
 */
async function mittaaPisteet(ryhma) {
  const kohde = KAMERAT[ryhma];
  await sivu.evaluate(async (b2) => {
    await window.matkakirja.ui.pallolauta.kamera.ajaKamera({ bbox: b2 }, { kesto: 0, pakota: true });
  }, laatikkoAsteista(kohde));
  await sivu.waitForTimeout(2000);
  const m = await odotaLepo();
  tieto(`kamera ${ryhma}`, `${kohde.seloste} · taso z${m?.taso} · scenessä ${m?.scenessa}`
    + ` · värillisiä ${m?.varillisia} · jumissa ${m?.jumissa}`);
  /*
   * KAIKKI PALLON KANKAAN ULKOPUOLINEN PIILOON MITTAUKSEN AJAKSI.
   *
   * Erän 1 ansa 1 toistui heti ensimmäisessä ajossa: Pariisin
   * saapumiskortin valokuva peitti ruudun keskikolmanneksen, ja
   * Keski-Ranskan piste luki sen harmaata (133,120,112). Nimetty
   * lista selektoreita ei riitä — kortteja on monta lajia ja uusia
   * tulee — joten sääntö on käänteinen: näkyviin jää VAIN pallon
   * kangas ja sen esivanhemmat.
   *
   * `visibility` EIKÄ `display`: asettelu ei muutu, joten kotelo
   * pysyy samankokoisena eikä kamera siirry kesken mittauksen.
   */
  const piilotettuja = await sivu.evaluate(() => {
    const kangas = document.querySelector('.pallolauta canvas')
      ?? document.querySelector('canvas');
    if (!kangas) return -1;
    const ketju = new Set();
    for (let n = kangas; n; n = n.parentElement) ketju.add(n);
    let n = 0;
    for (const e of document.querySelectorAll('body *')) {
      if (ketju.has(e) || e.contains(kangas)) continue;
      if (e.style.visibility === 'hidden') continue;
      e.style.visibility = 'hidden';
      n += 1;
    }
    return n;
  });
  tieto('mittauksen ajaksi piiloon', `${piilotettuja} elementtiä`);
  await sivu.waitForTimeout(600);
  const cdp = await ctx.newCDPSession(sivu);
  const kuva = Buffer.from(
    (await cdp.send('Page.captureScreenshot', { format: 'png' })).data, 'base64',
  );
  const tulos = await sivu.evaluate(async ({ png, pisteet }) => {
    const img = new Image();
    img.src = `data:image/png;base64,${png}`;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.width;
    c.height = img.height;
    const g = c.getContext('2d', { willReadFrequently: true });
    g.drawImage(img, 0, 0);
    const pallo = window.matkakirja.ui.pallolauta.pallo;
    const dpr = img.width / window.innerWidth;
    const ulos = [];
    for (const p of pisteet) {
      const s = pallo.getScreenCoords(p.lat, p.lon, 0);
      if (!s || !Number.isFinite(s.x)) { ulos.push({ ...p, ruudulla: false, syy: 'ei ruutupaikkaa' }); continue; }
      const x = Math.round(s.x * dpr);
      const y = Math.round(s.y * dpr);
      if (x < 6 || y < 6 || x >= img.width - 6 || y >= img.height - 6) {
        ulos.push({ ...p, ruudulla: false, syy: 'ruudun ulkopuolella' });
        continue;
      }
      /*
       * VAIN PALLON KANGAS KELPAA. Ehto oli aluksi väljempi ("jokin
       * karttakuoren sisällä"), ja saapumiskortti menisi siitä läpi,
       * koska se on kuoren lapsi. Kangas on ainoa elementti, jossa
       * pallon pikselit ovat.
       */
      const osuma = document.elementFromPoint(s.x, s.y);
      const kartalla = osuma && osuma.tagName === 'CANVAS';
      if (!kartalla) {
        const ketju = [];
        for (let n = osuma; n && n !== document.body && ketju.length < 4; n = n.parentElement) {
          ketju.push(`${n.tagName.toLowerCase()}.${n.className || ''}`);
        }
        ulos.push({ ...p, ruudulla: false, syy: `päällä ${ketju.join(' < ') || 'ei mitään'}` });
        continue;
      }
      /*
       * MEDIAANI 5 × 5 EIKÄ 9 × 9. Rae ja pigmentti heittelevät
       * yksittäistä pikseliä kymmenen sävyä, joten mediaani on pakko —
       * mutta 9 × 9 laitepikseliä on dpr 3:lla kolme css-pikseliä
       * kumpaankin suuntaan, ja 12 mpk:n kaistaleen mittauksessa se
       * ulottui rantaviivan yli. 5 × 5 riittää raetta vastaan.
       */
      const kanavat = [[], [], []];
      for (let dy = -2; dy <= 2; dy += 1) {
        for (let dx = -2; dx <= 2; dx += 1) {
          const d = g.getImageData(x + dx, y + dy, 1, 1).data;
          kanavat[0].push(d[0]); kanavat[1].push(d[1]); kanavat[2].push(d[2]);
        }
      }
      const med = kanavat.map((k) => k.sort((a, b) => a - b)[Math.floor(k.length / 2)]);
      ulos.push({
        ...p, ruudulla: true, x, y, r: med[0], g: med[1], b: med[2],
      });
    }
    return ulos;
  }, { png: kuva.toString('base64'), pisteet: PISTEET.filter((p) => p.ryhma === ryhma) });
  return { kuva, mittaukset: tulos, mitat: m };
}

/* ---------------- kaksi vaihetta samalla koodipolulla ------------- */

/*
 * A JA B AJETAAN TÄSMÄLLEEN SAMALLA POLULLA, ja se on mittauksen ehto.
 * Ensimmäisessä yrityksessä A mitattiin ensimmäiseltä latauksesta ja B
 * uudelleenlatauksen jälkeen — kamera ja laattojen lataustila eivät
 * silloin olleet samat, ja `scenessa` erosi 18 vs. 34 ilman että väri
 * lisäsi yhtään verkkoa. Nyt kumpikin vaihe tekee saman: lataa sivun,
 * siirtää nappulan Pariisiin, ajaa saapumisen, odottaa levon ja
 * mittaa. Ero vaiheiden välillä on VAIN luettelon `varitasot`-taulu.
 */
async function vaihe(vari, tunnus) {
  variPaalla = vari;
  await sivu.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => {
    const g = window.matkakirja.game;
    if (g.phase === 'pickstart') g.actionPickStart('lontoo', 0);
    const p = g.player;
    p.pos = { type: 'city', city: 'pariisi' };
    g.visitCity(p);
    window.matkakirja.ui.render();
  });
  await sivu.waitForTimeout(4000);
  await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu({ kesto: 0 }));
  await sivu.waitForTimeout(3000);
  const mitat = await odotaLepo();
  const pov = await sivu.evaluate(() => {
    const p = window.matkakirja.ui.pallolauta.pallo.pointOfView();
    return { lat: Number(p.lat.toFixed(3)), lng: Number(p.lng.toFixed(3)), alt: Number(p.altitude.toFixed(4)) };
  });
  tieto(`${tunnus} mittarit (saapumisnäkymä)`, JSON.stringify(mitat));
  tieto(`${tunnus} kamera (saapumisnäkymä)`, JSON.stringify(pov));
  const maa = await mittaaPisteet('maa');
  const meri = await mittaaPisteet('meri');
  return {
    mitat,
    pov,
    kuva: maa.kuva,
    merikuva: meri.kuva,
    mittaukset: [...maa.mittaukset, ...meri.mittaukset],
  };
}

const A = await vaihe(false, 'A (ilman väriä)');
const B = await vaihe(true, 'B (värillä)');
const mA = A.mitat;
const mB = B.mitat;

if (KUVAT) {
  mkdirSync(KUVAT, { recursive: true });
  writeFileSync(join(KUVAT, `varilaatat-pallo-${NIMI}-ilman-varia.png`), A.kuva);
  writeFileSync(join(KUVAT, `varilaatat-pallo-${NIMI}.png`), B.kuva);
  writeFileSync(join(KUVAT, `varilaatat-pallo-${NIMI}-meri.png`), B.merikuva);
  tieto('kuvat', join(KUVAT, `varilaatat-pallo-${NIMI}*.png`));
}

/* ---------------- erä 2: uloszoomauksen esto ---------------------- */

/**
 * Kameran etäisyys ja ohjaimen katto. `maxDistance` on se luku, jonka
 * uloszoomauksen esto asettaa (js/pallolauta/lauta.js
 * tahdistaZoomirajat), ja `etaisyys` on se, minne kamera pääsee kun
 * sitä työnnetään laudan omaan kattoon.
 */
const zoomitila = () => sivu.evaluate(() => {
  const lauta = window.matkakirja.ui.pallolauta;
  const pallo = lauta.pallo;
  const ohj = pallo.controls();
  const sade = pallo.getGlobeRadius();
  return {
    sade,
    maxDistance: ohj.maxDistance,
    maxKorkeus: ohj.maxDistance / sade - 1,
    korkeus: pallo.pointOfView().altitude,
  };
});

/**
 * Työnnä kamera niin kauas kuin ohjain sallii: pyydetään laudan omaa
 * kattoa (2,5) ja katsotaan, mihin kamera todella jää. Tämä mittaa
 * SAMAA polkua kuin sormi ja rulla (OrbitControls), ei kamera-ajoa.
 */
const tyonnaUlos = () => sivu.evaluate(async () => {
  const lauta = window.matkakirja.ui.pallolauta;
  const pallo = lauta.pallo;
  const ohj = pallo.controls();
  const sade = pallo.getGlobeRadius();
  const pov = pallo.pointOfView();
  // Kamera suoraan kauas: ohjaimen oma rajoitin leikkaa liikkeen.
  pallo.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: 2.5 }, 0);
  ohj.update?.();
  await new Promise((ok) => requestAnimationFrame(() => ok()));
  const etaisyys = ohj.object?.position?.length?.() ?? null;
  return {
    korkeus: pallo.pointOfView().altitude,
    etaisyysKorkeutena: etaisyys === null ? null : etaisyys / sade - 1,
    maxKorkeus: ohj.maxDistance / sade - 1,
  };
});

const zoomFra = await zoomitila();
const ulosFra = await tyonnaUlos();
tieto('FRA zoomiraja', JSON.stringify({ ...zoomFra, ...ulosFra }));

/* Venäjä: laatikko ei mahdu saapumisrajaukseen → rajaa ei aseteta. */
await sivu.evaluate(() => {
  const g = window.matkakirja.game;
  const p = g.player;
  p.pos = { type: 'city', city: 'moskova' };
  g.visitCity(p);
  window.matkakirja.ui.render();
});
await sivu.waitForTimeout(3000);
await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu({ kesto: 0 }));
await sivu.waitForTimeout(2500);
const zoomRus = await zoomitila();
tieto('RUS zoomiraja', JSON.stringify(zoomRus));

/* ---------------- väitteet ---------------------------------------- */

const kirkkaus = (p) => (p.r + p.g + p.b) / 3;
const lampo = (p) => p.r - p.b;
const parit = PISTEET.map((p) => ({
  ...p,
  a: A.mittaukset.find((m) => m.avain === p.avain),
  b: B.mittaukset.find((m) => m.avain === p.avain),
}));

console.log('\n--- MITATUT PIKSELIT (A = ilman väriä, B = värillä) ---');
for (const p of parit) {
  const kuvaa = (m) => (m?.ruudulla ? `rgb(${m.r},${m.g},${m.b})` : `EI KARTALLA (${m?.syy})`);
  console.log(`  ${p.avain.padEnd(9)} A ${kuvaa(p.a).padEnd(20)} B ${kuvaa(p.b).padEnd(20)} `
    + `${p.a?.ruudulla && p.b?.ruudulla
      ? `ΔL ${(kirkkaus(p.b) - kirkkaus(p.a)).toFixed(1)} Δ(r−b) ${(lampo(p.b) - lampo(p.a)).toFixed(1)}`
      : ''} — ${p.seloste}`);
}
console.log(`\n  A: taso z${mA?.taso} · laattoja ${mA?.laattoja} · scenessä ${mA?.scenessa} `
  + `· tavuja ${mA?.kaytetytTavut} · syy "${mA?.syy}"`);
console.log(`  B: taso z${mB?.taso} · laattoja ${mB?.laattoja} · scenessä ${mB?.scenessa} `
  + `· tavuja ${mB?.kaytetytTavut} · värillisiä ${mB?.varillisia} · maa ${mB?.variMaa} `
  + `· syy "${mB?.syy}"`);

console.log('\n--- VÄITTEET ---');
vaadi('V0 väritaso on pallolla ja se on Ranskan',
  mB?.varillisia > 0 && mB?.variMaa === 'FRA',
  `varillisia ${mB?.varillisia}, variMaa ${mB?.variMaa}`);

vaadi('V1 versioportti ei sammuttanut laattakerrosta (syy tyhjä)',
  mB?.tila === 'nakyy' && !mB?.syy,
  `tila ${mB?.tila}, syy "${mB?.syy}"`);

const molemmat = (p) => p.a?.ruudulla && p.b?.ruudulla;
const ranska = parit.find((p) => p.avain === 'ranska');
vaadi('V2 Ranskan sisältä pikseli tummui murretuksi maastoksi',
  molemmat(ranska) && kirkkaus(ranska.b) < kirkkaus(ranska.a) - 4,
  molemmat(ranska)
    ? `A ${kirkkaus(ranska.a).toFixed(1)} → B ${kirkkaus(ranska.b).toFixed(1)}`
    : `piste ei kartalla: ${ranska.a?.syy ?? ranska.b?.syy}`);

const belgia = parit.find((p) => p.avain === 'belgia');
vaadi('V3 Belgian puoli vaaleni ja pysyi seepiana',
  molemmat(belgia) && kirkkaus(belgia.b) > kirkkaus(belgia.a) + 2
    && belgia.b.r > belgia.b.g && belgia.b.g > belgia.b.b,
  molemmat(belgia)
    ? `A ${kirkkaus(belgia.a).toFixed(1)} → B ${kirkkaus(belgia.b).toFixed(1)}, `
      + `rgb(${belgia.b.r},${belgia.b.g},${belgia.b.b})`
    : `piste ei kartalla: ${belgia.a?.syy ?? belgia.b?.syy}`);

const aluevesi = parit.find((p) => p.avain === 'aluevesi');
vaadi('V4 aluevesi (12 mpk) sinertyi savunsiniseksi',
  molemmat(aluevesi) && aluevesi.a.r > aluevesi.a.b && aluevesi.b.b >= aluevesi.b.r,
  molemmat(aluevesi)
    ? `A r−b ${lampo(aluevesi.a)} → B r−b ${lampo(aluevesi.b)}`
    : `piste ei kartalla: ${aluevesi.a?.syy ?? aluevesi.b?.syy}`);

const avomeri = parit.find((p) => p.avain === 'avomeri');
vaadi('V5 avomeri 40 mpk vaaleni ja pysyi seepiana',
  molemmat(avomeri) && kirkkaus(avomeri.b) > kirkkaus(avomeri.a) + 2
    && avomeri.b.r > avomeri.b.b,
  molemmat(avomeri)
    ? `A ${kirkkaus(avomeri.a).toFixed(1)} → B ${kirkkaus(avomeri.b).toFixed(1)}, `
      + `rgb(${avomeri.b.r},${avomeri.b.g},${avomeri.b.b})`
    : `piste ei kartalla: ${avomeri.a?.syy ?? avomeri.b?.syy}`);

vaadi('V6 laattamäärä ei kasva yli +10 %',
  mA?.scenessa > 0 && mB?.scenessa <= Math.ceil(mA.scenessa * 1.1),
  `A ${mA?.scenessa} → B ${mB?.scenessa}`);

/*
 * V7: raja on laatikko × 1,15, ja se on selvästi laudan oman katon
 * (PALLO_KORKEUS_MAX 2,5) alla. Kamera ei saa päästä sen yli, vaikka
 * sitä työnnetään suoraan kattoon.
 */
vaadi('V7 uloszoomaus pysähtyy Ranskassa laatikon rajaan',
  zoomFra.maxKorkeus > 0 && zoomFra.maxKorkeus < 2.4
    && ulosFra.korkeus <= zoomFra.maxKorkeus + 0.02,
  `maxKorkeus ${zoomFra.maxKorkeus?.toFixed(3)}, ulos ${ulosFra.korkeus?.toFixed(3)}`);

vaadi('V8 Venäjässä rajaa ei aseteta (kamera ei lukkiudu)',
  zoomRus.maxKorkeus > 2.4,
  `RUS maxKorkeus ${zoomRus.maxKorkeus?.toFixed(3)}`);

if (virheet.length) console.log(`\nSIVUVIRHEET: ${virheet.slice(0, 4).join(' | ')}`);

await ctx.close();
await selain.close();
palvelin.close();

console.log(`\n${lapi}/${kaikki} väitettä läpi`);
process.exit(lapi === kaikki ? 0 : 1);
