/*
 * ETUSIVUN PALLO — esirenderöity, sumennettu kuvasarja videoksi.
 *
 *   node tools/tee-etusivupallo.mjs [--kuiva] [--fps 15] [--lava 900]
 *        [--kuva 800] [--sumennus 6] [--taso 5] [--kehykset N]
 *        [--ulos kansio] [--ffmpeg polku] [--ei-videota] [--sauma]
 *        [--osa k/n] [--kokoa] [--odotus 60000]
 *
 * OMISTAJAN TILAUS 5.9.2026, sanatarkasti: *"etusivun kartan voi pitää
 * aluksi vielä vanhassa mutta sitten kun ehditään tehdä uusi, niin
 * siihen kannattaa varmaan renderöidä oma spesifi zoomattu pallo joka
 * pyörii hitaasti lontoosta kohti aasiaa, mutta on jo renderöity
 * blurrattuna, jotta efekti ei vie etusivulla tehoja."*
 *
 * TÄSMENNYS 5.9.2026 ilta, sanatarkasti: *"animaatio pitää mennä koko
 * maapallon ympäri niin että se voi loopata. eli pysähtyy lontooseen ja
 * punainen viiva ottaa kiinni lopuksi."*
 *
 * ── SAUMATON LOOPPI ────────────────────────────────────────────────
 *
 * Kierros on TÄSMÄLLEEN 360°: reitti päättyy Lontooseen, josta se
 * lähti, ja js/etusivupallo.js laskee pituusasteet jatkuvina. Kamera on
 * siksi jaksollinen, ja kehys hetkellä KESTO näyttää samalta kuin kehys
 * hetkellä 0. Poltettuja kehyksiä on KEHYKSIA kappaletta hetkillä
 * i × KESTO / KEHYKSIA (i = 0 … KEHYKSIA−1), eli viimeisen kehyksen
 * jälkeen seuraava olisi tasan ensimmäinen — juuri niin video looppaa
 * ilman hyppyä. Kuvataajuus annetaan ffmpegille murtolukuna
 * (KEHYKSIA / KESTO), jotta videon kesto on tasan kierroksen kesto.
 *
 * Videoon EI enää polteta häivytystä (aiemmin kierroksen sauma
 * häivytettiin paperiin): saumaa ei ole. Etusivulla häivytetään enää
 * punainen viiva ja kone, kun ne ovat sulkeneet ympyrän Lontoossa.
 *
 * `--sauma` polttaa vain kaksi kehystä (t = 0 ja t = KESTO) ja vertaa
 * niitä tavu tavulta: näin loopin saumattomuuden voi tarkistaa
 * kontissa ilman koko sarjaa ja ilman ffmpegiä.
 *
 * ── MIKSI VIDEO EIKÄ KUVASARJA TAI PANORAAMA ───────────────────────
 *
 * Kolme vaihtoehtoa punnittiin (perustelu raportissa ja
 * docs/moduulit/karttapallo.md luku 7, vaihe 5):
 *   1. WebP-kuvasarja: 600 kehystä × ~25 kt = 15 Mt, ja selain joutuu
 *      vaihtamaan <img>-lähdettä 15 kertaa sekunnissa — kallista.
 *   2. Yksi iso sumennettu panoraama + CSS-animaatio: kevyin ladata,
 *      mutta ortografista palloa EI voi kiertää CSS:llä ilman että
 *      projektio vääristyy — ja silloin koneen ruutupiste ei enää
 *      osuisi pallon pintaan. Hylätty juuri siksi: kone ja viiva ovat
 *      tilauksen ydin.
 *   3. VIDEO (tämä): sumennettu sisältö pakkautuu murto-osaan, purku
 *      on raudalla, ja aika ↔ kameran pituusaste on tarkka. Kaksi
 *      muotoa (VP9/WebM ja H.264/MP4) kattaa kaikki selaimet, ja yksi
 *      pysäytyskuva (juliste) palvelee reduced motionia.
 *
 * ── MITEN ──────────────────────────────────────────────────────────
 *
 * Playwright ajaa headless-Chromiumin, joka lataa Globe.gl:n ja pelin
 * omat pallolaatat ämpäristä (samat kuin pelissä). Kamera asetetaan
 * joka kehykselle js/etusivupallo.js:n kameranNakyma-funktiolla —
 * SAMALLA funktiolla, jota etusivu käyttää — joten kehysnumero ja
 * kameran pituusaste vastaavat toisiaan pelissä ilman erillistä
 * taulukkoa. Sumennus tehdään SELAIMESSA (CSS filter: blur lavan
 * paperitaustan päällä), joten työkalu ei tarvitse sharpia; kuva
 * rajataan lavan keskeltä, jottei sumennus vuoda reunoilta.
 *
 * Kehykset menevät ffmpegille (ubuntu-latest: libvpx-vp9 + libx264).
 * Repoon ei viedä kuvia eikä videoita — tulos menee ämpäriin polkuun
 * julisteet/etusivu/<versio>/ (workflow tee-etusivupallo).
 *
 * KONTISSA: Chromium on /opt/pw-browsers/chromium ja ämpäri kulkee
 * Noden fetchin kautta (NODE_USE_ENV_PROXY=1) — selain ei osaa
 * välityspalvelinta, joten ämpärin pyynnöt reititetään page.routella
 * kuten tools/savukkeet/savuke-pallolauta.mjs:ssä.
 */

import { spawnSync } from 'node:child_process';
import http from 'node:http';
import {
  existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const TAMA = fileURLToPath(import.meta.url);
if (process.argv[1] === TAMA && !process.env.NODE_USE_ENV_PROXY
  && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [TAMA, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

const {
  ETUSIVUPALLO_VERSIO, ETUSIVUN_KAMERA, ETUSIVUPALLO_TIEDOSTOT, HAIVYTYS_S,
  KIERROKSEN_ASTEET, LOPPU_PITO_S,
  kameranNakyma, koneenTila, pallonPiste, reitinPisteet, teeReitti,
} = await import('../js/etusivupallo.js');
const { PALLO_LAATAT, PALLO_KIRJASTO, laattakynnykset } = await import('../js/pallo.js');
const { packById } = await import('../js/pack.js');

const argv = process.argv.slice(2);
const lippu = (nimi) => argv.includes(`--${nimi}`);
const arvo = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};

const KUIVA = lippu('kuiva');
const EI_VIDEOTA = lippu('ei-videota') || lippu('sauma');
/** Saumakoe: vain kehykset t = 0 ja t = KESTO, ja niiden vertailu. */
const SAUMA = lippu('sauma');
const FPS = Number(arvo('fps', '15'));
/** Lava = renderöity kangas; kuva rajataan sen keskeltä sumennuksen takia. */
const LAVA = Number(arvo('lava', '900'));
const KUVA = Number(arvo('kuva', '800'));
const SUMENNUS = Number(arvo('sumennus', '6'));
const TASO = Number(arvo('taso', '5'));
const ULOS = arvo('ulos', join(process.cwd(), 'etusivupallo-ulos'));
const FFMPEG = arvo('ffmpeg', process.env.FFMPEG ?? 'ffmpeg');
/** Pelin paperinsävy: lava on samaa paperia kuin etusivu, joten sumennus ei jätä reunaa. */
const PAPERI = arvo('tausta', '#efdcb4');
/*
 * RINNAKKAISUUS (omistaja 7.9.2026: "kaikki ytimet"). Kehykset ovat
 * toisistaan riippumattomia — kehys hetkellä t riippuu vain kamerasta
 * ja laatoista, ei edellisestä kehyksestä — joten sarja voidaan polttaa
 * monella prosessilla samaan kehyskansioon:
 *
 *   --osa k/n   polttaa vain kaistansa kehykset (yhtenäinen väli, jotta
 *               naapurikehysten laatat osuvat samaan selainvälimuistiin);
 *               ei tee videoita eikä luetteloa. Kaista 0 polttaa myös
 *               julisteen. Kehyskansiota EI tyhjennetä — kutsuja
 *               (työnkulku) tyhjentää sen kerran ennen kaistoja.
 *   --kokoa     ei polta mitään: tarkistaa että kaikki kehykset ovat
 *               kansiossa ja tekee niistä videot, julisteen ja luettelon.
 *
 * Kaistat eivät jaa mitään tilaa, ja jokainen tekee saman esilämmityksen
 * kuin peräkkäinen ajo, joten kehysten tavut ovat samat kuin yhdellä
 * prosessilla poltettuna (todennettu otoksella 7.9.2026).
 */
/*
 * Odotuksen HÄTÄKATTO millisekunteina: varsinainen ehto on kehyksissä
 * (ks. odotaLaatat), ja tämä katkaisee vain ikuiseksi jääneen odotuksen.
 * Kuormitetulla koneella yksi piirretty kehys voi kestää sekunteja,
 * joten katto on väljä tarkoituksella.
 */
const ODOTUS = Number(arvo('odotus', '60000'));
/** Esilämmityksen ja julisteen katto: ensimmäiset kehykset lataavat eniten. */
const ESILAMMITYS_ODOTUS = Math.max(ODOTUS, 8000);
const OSA = arvo('osa', '');
const KOKOA = lippu('kokoa');
const OSAT = OSA ? (() => {
  const m = /^(\d+)\/(\d+)$/.exec(OSA);
  if (!m) throw new Error('--osa on muotoa k/n, esim. 0/8');
  const k = Number(m[1]);
  const n = Number(m[2]);
  if (n < 1 || k >= n) throw new Error(`--osa ${OSA}: k < n ja n >= 1`);
  return { k, n };
})() : null;
if (OSAT && KOKOA) throw new Error('--osa ja --kokoa ovat eri ajoja');
if (OSAT && SAUMA) throw new Error('--sauma polttaa vain kaksi kehystä — ei kaistoja');

const pack = packById('maailmankartta');
const reitti = teeReitti(reitinPisteet(pack));
if (reitti.jaksot.length < 4) throw new Error('reitin kaupunkeja ei löytynyt paketista');
/*
 * KIERROS ON KESTO — ei kehysmäärä jaettuna kuvataajuudella. Kehykset
 * jaetaan tasan kierrokselle, ja ffmpeg saa murtolukuisen taajuuden,
 * jotta videon kesto on tasan kierroksen kesto. Vain silloin videon
 * aika ↔ kameran pituusaste pysyy kohdallaan koko loopin ajan.
 */
const KESTO = reitti.kesto;
const KEHYKSIA = SAUMA ? 2 : Number(arvo('kehykset', String(Math.round(KESTO * FPS))));
/** Todellinen kuvataajuus: kehykset jaettuna kierroksen kestolla. */
const TAAJUUS = KEHYKSIA / KESTO;
/** Kehyksen i hetki kierroksella (viimeisen jälkeen tulee taas nolla). */
const kehyksenAika = (i) => (i * KESTO) / KEHYKSIA;
/** Kierron kattavuus: pitää olla tasan 360°, muuten looppi hyppäisi. */
const KIERTO = reitti.pisteet[reitti.pisteet.length - 1].lon - reitti.pisteet[0].lon;
if (Math.abs(KIERTO - KIERROKSEN_ASTEET) > 1e-6) {
  throw new Error(`reitti kiertää ${KIERTO.toFixed(3)}° eikä ${KIERROKSEN_ASTEET}° — `
    + 'looppi ei olisi saumaton (js/etusivupallo.js ETUSIVUN_REITTI)');
}
/** Julisteen (pysäytyskuvan) hetki: puolimatkassa, jolloin viivaa on jo kertynyt. */
const JULISTE_AIKA = Math.min(KESTO, reitti.jaksot[5]?.alku ?? KESTO / 2);

const AVAIN = `julisteet/etusivu/${ETUSIVUPALLO_VERSIO}/`;

const luettelo = {
  versio: ETUSIVUPALLO_VERSIO,
  tehty: new Date().toISOString(),
  kesto: Number(KESTO.toFixed(4)),
  fps: Number(TAAJUUS.toFixed(6)),
  kehyksia: KEHYKSIA,
  /* Saumaton looppi: kierto tasan 360°, ei häivytystä videossa. */
  saumaton: true,
  kierrosAste: KIERROKSEN_ASTEET,
  loppuPitoS: LOPPU_PITO_S,
  haivytysS: HAIVYTYS_S,
  julisteAika: Number(JULISTE_AIKA.toFixed(3)),
  sumennus: SUMENNUS,
  laatat: PALLO_LAATAT,
  laattataso: TASO,
  mitat: {
    leveys: KUVA, korkeus: KUVA, lava: LAVA, fov: ETUSIVUN_KAMERA.fov,
  },
  kamera: {
    korkeus: ETUSIVUN_KAMERA.korkeus,
    latKerroin: ETUSIVUN_KAMERA.latKerroin,
    latMin: ETUSIVUN_KAMERA.latMin,
    latMax: ETUSIVUN_KAMERA.latMax,
    silotusS: ETUSIVUN_KAMERA.silotusS,
  },
  // Reitti asteina: video on poltettu NÄILLÄ koordinaateilla, joten
  // etusivu laskee koneen paikan tästä eikä paketista (js/etusivupallo.js).
  reitti: reitti.pisteet.map((p) => ({
    id: p.id, nimi: p.nimi, lat: Number(p.lat.toFixed(5)), lon: Number(p.lon.toFixed(5)),
  })),
  tiedostot: ETUSIVUPALLO_TIEDOSTOT,
};

console.log(`Etusivun pallo ${ETUSIVUPALLO_VERSIO}: ${KEHYKSIA} kehystä @ `
  + `${TAAJUUS.toFixed(3)} fps = ${KESTO.toFixed(2)} s (kierto ${KIERTO.toFixed(2)}°), `
  + `lava ${LAVA}px → kuva ${KUVA}px, sumennus ${SUMENNUS}px, laattataso ${TASO}`);
console.log(`Reitti: ${reitti.pisteet.map((p) => p.nimi).join(' → ')} `
  + `(+ ${LOPPU_PITO_S} s pysähdys Lontoossa)`);
console.log(`Ämpärin polku: ${AVAIN}`);

if (KUIVA) {
  console.log(JSON.stringify(luettelo, null, 1));
  process.exit(0);
}

/* ffmpeg tarkistetaan ENNEN kuin poltetaan satoja kehyksiä. */
if (!EI_VIDEOTA && !OSAT) {
  const koe = spawnSync(FFMPEG, ['-version'], { stdio: 'ignore' });
  if (koe.status !== 0) {
    throw new Error(`ffmpeg ei löydy polusta "${FFMPEG}" — anna --ffmpeg <polku> `
      + 'tai aja --ei-videota (pelkät kehykset)');
  }
}

mkdirSync(ULOS, { recursive: true });
const KEHYSKANSIO = join(ULOS, 'kehykset');
/* Vain kokonainen ajo tyhjentää kansion: kaista polttaa sisaruksensa viereen. */
if (!OSAT && !KOKOA) rmSync(KEHYSKANSIO, { recursive: true, force: true });
mkdirSync(KEHYSKANSIO, { recursive: true });

const numero = (i) => String(i).padStart(5, '0');
const kehyksenPolku = (i) => join(KEHYSKANSIO, `kehys-${numero(i)}.png`);
/* Kaistan yhtenäinen väli [ALKU, LOPPU) — sama jako kuin xargsilla shardeissa. */
const ALKU = OSAT ? Math.floor((OSAT.k * KEHYKSIA) / OSAT.n) : 0;
const LOPPU = OSAT ? Math.floor(((OSAT.k + 1) * KEHYKSIA) / OSAT.n) : KEHYKSIA;
/* Juliste on yksi kuva: sen polttaa kokonainen ajo tai kaista 0. */
const JULISTE = !OSAT || OSAT.k === 0;
if (OSAT) {
  console.log(`Kaista ${OSAT.k + 1}/${OSAT.n}: kehykset ${ALKU}…${LOPPU - 1}`
    + `${JULISTE ? ' + juliste' : ''}`);
}

/* Kokoava ajo ei polta mitään: kehykset ovat jo kansiossa. */
if (!KOKOA) {
  /* ---------- ämpäri Noden fetchin kautta (kontti) ---------- */

  const valimuisti = new Map();
  /*
   * VARTIJA: ämpäristä tulematta jäänyt tiedosto jättää palloon
   * karkeamman laatan — kehys on hiljaa sumeampi eikä mikään muu kerro
   * siitä. Vain VERKKOVIRHEET lasketaan: 404 on tavallinen ja
   * harmiton, koska laattamoottori pyytää myös laattoja, joita
   * arkilla ei ole (napa-alueet), ja moottori osaa jättää ne pois.
   */
  let laattavirheita = 0;
  /*
   * NOUTO UUSITAAN. Rinnakkaiset kaistat kuormittavat samaa yhteyttä,
   * ja yksikin pudonnut nouto jättää palloon karkeamman laatan koko
   * kehyksen ajaksi. Mitattu kontissa 7.9.2026: kaksi kaistaa yhtä
   * aikaa tuotti 266 ja 402 pudonnutta noutoa (peräkkäisajossa nolla),
   * ja juuri ne selittivät kaistojen ja peräkkäisajon kuvaeron.
   * Kolme yritystä ja lyhyt odotus riittää; epäonnistunutta ei jätetä
   * välimuistiin, jotta seuraava pyyntö samaan laattaan yrittää yhä.
   */
  const YRITYKSIA = 3;
  const nuku = (ms) => new Promise((ok) => { setTimeout(ok, ms); });
  async function ampariHaku(url) {
    if (valimuisti.has(url)) return valimuisti.get(url);
    const lupaus = (async () => {
      for (let y = 1; y <= YRITYKSIA; y += 1) {
        const v = await fetch(url).then(async (r) => (r.ok
          ? { status: 200, body: Buffer.from(await r.arrayBuffer()), tyyppi: r.headers.get('content-type') }
          : { status: r.status, body: Buffer.alloc(0), tyyppi: 'text/plain' }))
          .catch(() => null);
        // 404 on kelvollinen vastaus: arkilla ei ole napa-alueiden laattoja.
        if (v && (v.status === 200 || v.status === 404)) return v;
        if (y < YRITYKSIA) await nuku(300 * y);
      }
      laattavirheita += 1;
      valimuisti.delete(url);
      return null;
    })();
    valimuisti.set(url, lupaus);
    return lupaus;
  }

  /* ---------- pieni palvelin: yksi sivu ---------- */

  const SIVU = `<!doctype html><meta charset="utf-8">
  <style>
    html, body { margin: 0; background: ${PAPERI}; }
    #lava {
      width: ${LAVA}px; height: ${LAVA}px; background: ${PAPERI};
      filter: blur(${SUMENNUS}px); overflow: hidden;
    }
    #pallo { width: ${LAVA}px; height: ${LAVA}px; }
  </style>
  <div id="lava"><div id="pallo"></div></div>
  <script src="${PALLO_KIRJASTO}"></script>
  <script>
    const LAATAT = ${JSON.stringify(PALLO_LAATAT)};
    window.pallo = Globe()(document.getElementById('pallo'))
      .width(${LAVA}).height(${LAVA})
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(true).atmosphereColor('#d9a13b').atmosphereAltitude(0.18);
    window.pallo.globeTileEngineUrl((x, y, l) => LAATAT + l + '/' + x + '/' + y + '.jpg')
      .globeTileEngineMaxLevel(${TASO});
    window.pallo.controls().enabled = false;
    window.pallo.renderer().setPixelRatio(1);
    // Laattamoottorin kynnykset: taso valitaan korkeudesta, joten kerroin
    // pakottaa halutun tason (sama kaava kuin js/pallo.js lepokerroin).
    window.asetaKynnykset = (kynnykset) => {
      let moottori = null;
      window.pallo.scene().traverse((o) => {
        if (!moottori && Array.isArray(o.thresholds) && typeof o.updatePov === 'function') moottori = o;
      });
      if (!moottori) return false;
      moottori.thresholds = kynnykset;
      return true;
    };
    // Kierroksen sauma on saumaton (360°), joten videoon ei polteta
    // häivytystä — pallo on aina täydellä peittävyydellä.
  </script>`;

  const palvelin = http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(SIVU);
  });
  await new Promise((ok) => palvelin.listen(0, ok));
  const osoite = `http://localhost:${palvelin.address().port}/`;

  /* ---------- selain ---------- */

  const paketti = await import('playwright')
    .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
  const chromium = paketti.chromium ?? paketti.default?.chromium;
  const KROMI = process.env.PW_CHROMIUM
    ?? (process.env.GITHUB_ACTIONS ? undefined : '/opt/pw-browsers/chromium');

  const selain = await chromium.launch({
    ...(KROMI ? { executablePath: KROMI } : {}),
    args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
  });
  const ctx = await selain.newContext({
    viewport: { width: LAVA, height: LAVA }, deviceScaleFactor: 1,
  });
  const sivu = await ctx.newPage();

  let lennossa = 0;
  /** Kumulatiivinen laattapyyntöjen määrä: odotus katsoo, kasvaako se yhä. */
  let pyyntoja = 0;
  let viimeisin = Date.now();
  const laatta = (url) => url.includes('julisteet/pallo/laatat');
  sivu.on('request', (r) => {
    if (laatta(r.url())) { lennossa += 1; pyyntoja += 1; viimeisin = Date.now(); }
  });
  const valmis = (r) => { if (laatta(r.url())) { lennossa -= 1; viimeisin = Date.now(); } };
  sivu.on('requestfinished', valmis);
  sivu.on('requestfailed', valmis);
  sivu.on('pageerror', (e) => console.log(`HUOM sivun virhe: ${e.message ?? e}`));

  /*
   * ÄMPÄRIN ISÄNTÄ ON media.matkakirja.app (sama korjaus kuin
   * savuke-pallolauta.mjs:ssä): pelkkä r2.dev-kaava jätti kirjaston ja
   * laatat kontissa noutamatta ("Globe is not defined"), koska selain ei
   * osaa välityspalvelinta. Ajokoneella verkko on suora, joten vika
   * näkyi vain kontissa.
   */
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
    const vastaus = await ampariHaku(route.request().url());
    if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
    route.fulfill({
      status: 200,
      contentType: vastaus.tyyppi ?? 'application/octet-stream',
      headers: { 'access-control-allow-origin': '*' },
      body: vastaus.body,
    });
  });

  await sivu.goto(osoite, { waitUntil: 'load', timeout: 120000 });
  await sivu.waitForFunction(() => Boolean(window.pallo), null, { timeout: 60000 });

  /*
   * Laattataso pakotetaan: kerroin, jolla 8k/2^taso ≤ korkeus mutta
   * 8k/2^(taso−1) > korkeus (js/pallo.js laattakynnykset).
   *
   * KYNNYSTEN ASETUS ON PAKKO ONNISTUA. Moottori syntyy vasta
   * ensimmäisillä piirretyillä kehyksillä, ja aiemmin tätä yritettiin
   * 40 kertaa 150 ms:n välein ja LUOVUTETTIIN HILJAA. Kuormitetulla
   * koneella (kaksi rinnakkaista kaistaa neljällä ytimellä) kuusi
   * sekuntia ei riitä, jolloin moottori valitsi tason itse ja koko
   * pallo poltettiin karkeammilla laatoilla — ero peräkkäisajoon oli
   * koko pallon alalla (mitattu 7.9.2026: 25–72 % pikseleistä,
   * suurin 68/255) eikä mikään kertonut siitä. Nyt odotetaan kehyksinä
   * ja kaadutaan, jos moottoria ei kuulu.
   */
  const kerroin = (0.8 * ETUSIVUN_KAMERA.korkeus * 2 ** TASO) / 8;
  const kynnykset = laattakynnykset(kerroin);
  let kynnyksetAsetettu = false;
  for (let y = 0; y < 200 && !kynnyksetAsetettu; y++) {
    kynnyksetAsetettu = await sivu.evaluate((k) => window.asetaKynnykset(k), kynnykset);
    if (!kynnyksetAsetettu) await sivu.evaluate(() => new Promise((ok) => requestAnimationFrame(ok)));
  }
  if (!kynnyksetAsetettu) {
    throw new Error('laattamoottoria ei syntynyt 200 kehyksessä — kynnyksiä ei saatu '
      + 'asetettua, ja pallo poltettaisiin väärällä laattatasolla');
  }
  console.log(`Laattataso z${TASO} pakotettu kynnyksillä (kerroin ${kerroin.toFixed(3)})`);

  /*
   * ODOTUS MITATAAN KEHYKSINÄ EIKÄ MILLISEKUNTEINA — juuri tämä tekee
   * rinnakkaisajosta luotettavan (mitattu kontissa 7.9.2026, 4 vCPU,
   * ohjelmisto-WebGL). Laattamoottori päättää tarvitsemansa laatat
   * VASTA piirtäessään, joten kuormitetulla koneella se on ehtinyt
   * tehdä vähemmän päätöksiä samassa seinäkellon ajassa: vanha ehto
   * "ei pyyntöjä lennossa ja 140 ms hiljaista" täyttyi ennen kuin
   * moottori oli ehtinyt pyytää tarkempia laattoja, ja kaista kaappasi
   * karkeamman pallon (ero peräkkäisajoon 20–57 % pikseleistä, suurin
   * 24–68/255 — eikä katon nosto 30 sekuntiin auttanut lainkaan).
   * Nyt odotetaan, että moottori on piirtänyt VAKAUS_KEHYKSET kehystä
   * pyytämättä yhtään uutta laattaa eikä yksikään pyyntö ole lennossa.
   * Kehysten määrä ei riipu koneen kuormasta, joten kaista näkee saman
   * pallon kuin peräkkäisajo — hitaammin mutta samana.
   */
  const VAKAUS_KEHYKSET = 6;
  let katkaisuja = 0;
  const piirraKehyksia = (maara) => sivu.evaluate((n) => new Promise((ok) => {
    let jaljella = n;
    const askel = () => {
      jaljella -= 1;
      if (jaljella <= 0) ok();
      else requestAnimationFrame(askel);
    };
    requestAnimationFrame(askel);
  }), maara);
  /** Odottaa, että laattapyynnöt ovat maalissa ja kuva on piirretty. */
  async function odotaLaatat(enintaanMs = ODOTUS) {
    const alku = Date.now();
    for (;;) {
      const ennen = pyyntoja;
      await piirraKehyksia(VAKAUS_KEHYKSET);
      if (lennossa <= 0 && pyyntoja === ennen) break;
      if (Date.now() - alku > enintaanMs) { katkaisuja += 1; break; }
    }
    await piirraKehyksia(2);
  }

  /** Kamera hetkelle t. Ei häivytystä: looppi on saumaton. */
  async function asetaKehys(t) {
    const nakyma = kameranNakyma(reitti, t);
    await sivu.evaluate((n) => {
      window.pallo.pointOfView({ lat: n.lat, lng: n.lon, altitude: n.korkeus }, 0);
    }, nakyma);
  }

  /*
   * VARTIJA: kirjaston oma ruutupiste. Luetaan VASTA kun kamera on
   * asettunut — pointOfView(…, 0) siirtää kameran vasta seuraavalla
   * kehyksellä, joten samassa evaluatessa luettu piste olisi edellisen
   * kehyksen kamerasta (mitattu 5.9.2026: virhe 1 209 px).
   */
  const kirjastonRuutupiste = (piste) => sivu.evaluate(
    (k) => window.pallo.getScreenCoords?.(k.lat, k.lon, 0) ?? null, piste,
  );

  const rajaus = {
    x: Math.round((LAVA - KUVA) / 2), y: Math.round((LAVA - KUVA) / 2), width: KUVA, height: KUVA,
  };
  /*
   * Kaappaus on SIVUN kaappaus rajauksella eikä elementin kaappaus:
   * Playwrightin locator.screenshot EI tue clip-valintaa (mitattu
   * 5.9.2026 — kehykset tulivat lavan kokoisina, jolloin sumennuksen
   * reuna olisi jäänyt videoon). Näkymä on lavan kokoinen ja #lava on
   * sen vasemmassa ylänurkassa, joten rajaus osuu suoraan.
   */
  const kaappaa = () => sivu.screenshot({ clip: rajaus });

  /*
   * KEHYS ON VALMIS VASTA KUN KUVA EI ENÄÄ MUUTU.
   *
   * Laattapyynnön päättyminen ei tarkoita, että laatta näkyy: JPEG
   * puretaan ja viedään näytönohjaimelle vasta sen jälkeen, eikä siitä
   * tule yhtään tapahtumaa Playwrightille. Siksi nopea kone ehti
   * kaapata kehyksen ENNEN kuin osa tekstuureista oli paikallaan ja
   * kuormitettu kone (rinnakkaiset kaistat) sai saman kehyksen
   * TERÄVÄMPÄNÄ — mitattu 7.9.2026: rinnakkain poltetut kehykset olivat
   * 2–7 % suurempia PNG:itä eli niissä oli enemmän yksityiskohtia.
   * Kaappaus toistetaan siksi, kunnes kaksi peräkkäistä kaappausta on
   * tavulleen sama: silloin kehys on asettunut eikä tulos riipu koneen
   * nopeudesta eikä siitä, montako kaistaa polttaa yhtä aikaa.
   */
  let vakautumattomia = 0;
  async function kaappaaVakaa(polku) {
    let edellinen = await kaappaa();
    for (let y = 0; y < 40; y++) {
      await piirraKehyksia(VAKAUS_KEHYKSET);
      const uusi = await kaappaa();
      if (uusi.equals(edellinen)) { writeFileSync(polku, uusi); return; }
      edellinen = uusi;
    }
    vakautumattomia += 1;
    writeFileSync(polku, edellinen);
  }

  /*
   * Esilämmitys: sama kierros kerran harvakseltaan, jotta laatat ovat
   * selaimen välimuistissa eikä ensimmäinen kierros ehdi sumeaksi. Kierros
   * on nyt koko maapallon ympäri (360°), joten näytteitä tarvitaan
   * kaksinkertaisesti entiseen verrattuna — muuten Tyynenmeren laatat
   * latautuisivat vasta poltossa.
   */
  const ESILAMMITYS = 24;
  for (let i = 0; i < ESILAMMITYS; i++) {
    await asetaKehys((i / ESILAMMITYS) * KESTO);
    await odotaLaatat(ESILAMMITYS_ODOTUS);
  }

  let projektiovirhe = 0;
  const kehysajat = [];
  /*
   * SAUMAKOE polttaa kehykset t = 0 ja t = KESTO. Jos looppi on
   * saumaton, ne ovat sama kuva — ja koska kumpikin on Chromiumin
   * deterministinen PNG samasta näkymästä, tavut täsmäävät.
   */
  const KEHYSTEN_AJAT = SAUMA ? [0, KESTO] : null;
  for (let i = ALKU; i < LOPPU; i++) {
    const t = KEHYSTEN_AJAT ? KEHYSTEN_AJAT[i] : kehyksenAika(i);
    const alku = Date.now();
    await asetaKehys(t);
    await odotaLaatat();
    // Oma projektio vs. kirjaston getScreenCoords: jos nämä eroavat,
    // kone lentäisi etusivulla väärässä paikassa.
    const ruutu = await kirjastonRuutupiste(koneenTila(reitti, t));
    if (ruutu && Number.isFinite(ruutu.x)) {
      const oma = pallonPiste(koneenTila(reitti, t), kameranNakyma(reitti, t),
        { leveys: LAVA, korkeus: LAVA, lava: LAVA, fov: ETUSIVUN_KAMERA.fov });
      projektiovirhe = Math.max(projektiovirhe, Math.hypot(oma.x - ruutu.x, oma.y - ruutu.y));
    }
    await kaappaaVakaa(kehyksenPolku(i));
    kehysajat.push(Date.now() - alku);
    if (i % 25 === 0 || i === LOPPU - 1) {
      console.log(`  kehys ${i + 1}/${KEHYKSIA} (t=${t.toFixed(2)} s, ${Date.now() - alku} ms)`);
    }
  }

  /* Juliste (pysäytyskuva) omalla hetkellään. */
  if (JULISTE) {
    await asetaKehys(JULISTE_AIKA);
    await odotaLaatat(ESILAMMITYS_ODOTUS);
    await kaappaaVakaa(join(ULOS, 'juliste.png'));
  }

  await ctx.close();
  await selain.close();
  palvelin.close();

  console.log(`Kehykset valmiit: ${kehysajat.length} kpl, keskimäärin `
    + `${Math.round(kehysajat.reduce((a, b) => a + b, 0) / Math.max(1, kehysajat.length))} ms/kehys`);

  if (projektiovirhe > KUVA * 0.01) {
    throw new Error(`projektio eroaa kirjaston omasta ${projektiovirhe.toFixed(1)} px — `
      + 'kone lentäisi etusivulla väärässä paikassa (js/etusivupallo.js pallonPiste)');
  }
  console.log(`Projektiovartija: suurin ero kirjaston getScreenCoordsiin ${projektiovirhe.toFixed(2)} px`);
  if (vakautumattomia) {
    console.log(`::warning::${vakautumattomia} kehystä ei asettunut 40 kierroksessa — `
      + 'kuva saattoi yhä muuttua kaappaushetkellä');
  }
  if (laattavirheita) {
    console.log(`::warning::ämpäri jätti ${laattavirheita} tiedostoa tuomatta — `
      + 'kehyksissä voi olla karkeampia laattoja kuin pitäisi');
  }
  if (katkaisuja) {
    console.log(`::warning::laattojen odotus katkesi kattoon (${ODOTUS} ms) ${katkaisuja} kertaa `
      + '— kehys voi olla karkeammilla laatoilla kuin peräkkäin poltettuna; '
      + 'vähennä kaistoja tai nosta --odotus');
  } else {
    console.log(`Odotusvartija: laatat ehtivät maaliin joka kerta (katto ${ODOTUS} ms)`);
  }

  if (SAUMA) {
    /*
     * SAUMAVARTIJA: kierroksen ensimmäinen ja "yli menevä" kehys ovat
     * sama näkymä, joten PNG-tavujen on täsmättävä. Jos ne eroavat,
     * kierto ei ole tasan 360° tai kamera ei ole jaksollinen — video
     * hyppäisi loopin kohdalla.
     */
    const alkuPng = readFileSync(kehyksenPolku(0));
    const loppuPng = readFileSync(kehyksenPolku(1));
    const sama = alkuPng.length === loppuPng.length && alkuPng.equals(loppuPng);
    const kamerat = [0, KESTO].map((t) => kameranNakyma(reitti, t));
    const lonEro = (kamerat[1].lon - kamerat[0].lon) - KIERROKSEN_ASTEET;
    const latEro = kamerat[1].lat - kamerat[0].lat;
    console.log(`Saumakoe: kameran lon-ero 360°:sta ${lonEro.toExponential(2)}°, `
      + `lat-ero ${latEro.toExponential(2)}°`);
    console.log(`Saumakoe: kehykset t=0 ja t=${KESTO.toFixed(2)} `
      + `${sama ? 'IDENTTISET (pikseliero 0)' : 'EROAVAT'} (${alkuPng.length} tavua)`);
    if (Math.abs(lonEro) > 1e-6 || Math.abs(latEro) > 1e-9) {
      throw new Error('kamera ei ole jaksollinen — looppi hyppäisi saumassa');
    }
    if (!sama) throw new Error('saumakehykset eroavat tavutasolla — looppi ei ole saumaton');
    console.log('Saumakoe läpi. (Videoita ei poltettu: --sauma)');
    process.exit(0);
  }
}

if (OSAT) {
  const omat = [];
  for (let i = ALKU; i < LOPPU; i++) if (existsSync(kehyksenPolku(i))) omat.push(i);
  if (omat.length !== LOPPU - ALKU) {
    throw new Error(`kaistalta puuttuu ${LOPPU - ALKU - omat.length} kehystä`);
  }
  console.log(`Kaista ${OSAT.k + 1}/${OSAT.n} valmis: ${omat.length} kehystä kansiossa `
    + `${KEHYSKANSIO} — videot tehdään --kokoa-ajolla.`);
  process.exit(0);
}

/*
 * KOKOAVA AJO: kehykset ovat kaistoilta, joten niiden täydellisyys
 * tarkistetaan ENNEN ffmpegiä. Puuttuva kehys ei kaataisi ffmpegiä vaan
 * lyhentäisi videon hiljaa ja siirtäisi loput kehykset väärille hetkille.
 */
if (KOKOA) {
  const puuttuu = [];
  for (let i = 0; i < KEHYKSIA; i++) if (!existsSync(kehyksenPolku(i))) puuttuu.push(i);
  if (puuttuu.length) {
    throw new Error(`kehyksiä puuttuu ${puuttuu.length}/${KEHYKSIA} `
      + `(ensimmäinen ${puuttuu[0]}) — aja puuttuva kaista uudestaan`);
  }
  const ylimaaraisia = readdirSync(KEHYSKANSIO).length - KEHYKSIA;
  if (ylimaaraisia > 0) {
    throw new Error(`kehyskansiossa on ${ylimaaraisia} ylimääräistä tiedostoa — `
      + 'vanhan ajon kehykset sekoittaisivat sarjan; tyhjennä kansio ja polta uudestaan');
  }
  if (!existsSync(join(ULOS, 'juliste.png'))) {
    throw new Error('juliste.png puuttuu — kaista 0 ei ole ajettu loppuun');
  }
  console.log(`Kokoan ${KEHYKSIA} kehystä: ${KEHYSKANSIO}`);
}

/* ---------- videot ---------- */

const aja = (args) => {
  const ajo = spawnSync(FFMPEG, args, { stdio: 'inherit' });
  if (ajo.status !== 0) throw new Error(`${FFMPEG} ${args[0]}… epäonnistui (${ajo.status})`);
};
const koko = (p) => {
  try { return statSync(p).size; } catch { return 0; }
};
const kilot = (n) => `${(n / 1024).toFixed(0)} kt`;

if (!EI_VIDEOTA) {
  /*
   * Kuvataajuus on MURTOLUKU (kehykset / kierroksen kesto): vain siten
   * videon kesto on tasan kierroksen kesto ja looppi osuu kohdalleen.
   */
  const syote = ['-y', '-framerate', TAAJUUS.toFixed(6),
    '-i', join(KEHYSKANSIO, 'kehys-%05d.png')];
  aja([...syote, '-c:v', 'libvpx-vp9', '-crf', '40', '-b:v', '0', '-row-mt', '1',
    '-pix_fmt', 'yuv420p', '-an', join(ULOS, ETUSIVUPALLO_TIEDOSTOT.webm)]);
  aja([...syote, '-c:v', 'libx264', '-crf', '30', '-preset', 'slow', '-profile:v', 'main',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', join(ULOS, ETUSIVUPALLO_TIEDOSTOT.mp4)]);
  aja(['-y', '-i', join(ULOS, 'juliste.png'), '-q:v', '4',
    join(ULOS, ETUSIVUPALLO_TIEDOSTOT.juliste)]);
}

luettelo.koot = Object.fromEntries(Object.values(ETUSIVUPALLO_TIEDOSTOT)
  .map((t) => [t, koko(join(ULOS, t))]));
writeFileSync(join(ULOS, 'etusivu.json'), `${JSON.stringify(luettelo, null, 1)}\n`);
writeFileSync(join(ULOS, 'avain.txt'), AVAIN);

for (const [nimi, n] of Object.entries(luettelo.koot)) console.log(`  ${nimi}: ${kilot(n)}`);
/* Puhelin lataa VAIN toisen videon (source-valinta) ja julisteen. */
const puhelin = Math.max(luettelo.koot[ETUSIVUPALLO_TIEDOSTOT.webm] ?? 0,
  luettelo.koot[ETUSIVUPALLO_TIEDOSTOT.mp4] ?? 0) + (luettelo.koot[ETUSIVUPALLO_TIEDOSTOT.juliste] ?? 0);
console.log(`Puhelimen lataus (yksi video + juliste): noin ${kilot(puhelin)}`);
if (!EI_VIDEOTA && puhelin > 3 * 1024 * 1024) {
  console.log('::warning::yli 3 Mt puhelimelle — nosta --crf-arvoja tai pudota --fps/--kuva');
}
console.log(`Kehyskansio ${KEHYSKANSIO} (${readdirSync(KEHYSKANSIO).length} kuvaa) — ei viedä ämpäriin.`);
console.log(`Valmis: ${ULOS} → s3://…/${AVAIN}`);
