/*
 * SELAINSAVUKE: ASTRONAUTIN KAMERA OIKEALLA WEBKITILLÄ — CODEXIN
 * WEBAPP-LÖYDÖSTEN TOISTO (Raamattu, ASTRONAUTIN KAMERA LISÄYS 13,
 * kohdat 36 ja 37).
 *
 *   PLAYWRIGHT_JS=<polku>/node_modules/playwright/index.js \
 *     node tools/savukkeet/savuke-astro-webkit.mjs
 *
 * Tämä EI ole vartija vaan MITTARI: se ei vaadi mitään, vaan kirjaa
 * jokaisesta avauksesta sen, mitä Codex luki asennetun macOS Safari
 * WebAppin ?pallodiag=1-lokista, ja tulostaa taulukon raporttia varten
 * (docs/raportit/viesti-fable-webkit-toisto-20260917.md).
 *
 * MITÄ MITATAAN (per selain × kotelo × avauskerta):
 *   a) pallodiag-lokin rivit: kirjasto, avaruus-alku (kotelo, kangas,
 *      itsenainen, dpr), vaiheet, alku/ladonta/valmis (pinnan koko),
 *      vartija (puute, pisteita).
 *   b) kohdepisteiden (.satelliitti-piste) määrä DOMissa 0,5 s välein
 *      15 s ajan.
 *   c) pallon keskipisteen kirkkaus kuvakaappauksesta 5 s ja 15 s
 *      kohdalla (sama mittari kuin savuke-astro-pallo väite 8:
 *      luminanssi 13 × 13 px:n ikkunasta ruudun keskeltä).
 *   d) avaus toistetaan KOLME kertaa peräkkäin samassa sivussa
 *      (linssi suljetaan välissä sen omalla ✕:llä), koska Codexin
 *      kolmas avaus erosi kahdesta ensimmäisestä.
 *
 * SELAIMET: webkit (varsinainen) ja chromium (vastakoe). Kotelot:
 * 2539 × 1321 dpr 1 (Codexin WebApp-ikkuna) ja 390 × 844 dpr 3
 * (iPhone). SELAIMET=webkit tai KOTELOT=iphone rajaa ajon.
 *
 * VERKKO: ämpäri (reliefikuva, Globe.gl, laatat, äänet) Noden fetchin
 * kautta kuten savuke-astro-pallossa. Mitattu 17.9.2026: suoraan
 * haettuna ämpäri ei anna CORS-lupaa 127.0.0.1-originille, ja WebKit
 * pitää estetyt pyynnöt vireillä yli 200 s, jolloin `load` ei laukea
 * lainkaan. Välitys lisää access-control-allow-origin: * — se on
 * ainoa ero pelaajan verkkoon. Muu ulkoverkko katkaistaan. Service
 * worker estetään (serviceWorkers: 'block'), koska paikallinen
 * palvelin ei ole julkaisuosoite.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodePng, luminanssi } from './pallon-liike-mittarit.mjs';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ULOS = process.env.KAAPPAUKSET ?? '';
if (ULOS) mkdirSync(ULOS, { recursive: true });
const PORTTI = Number(process.env.PORTTI ?? 8757);
const PVM = process.env.PVM ?? '20260917';
/*
 * LISÄPARAMETRIT OSOITERIVILLE. `LISAPARAMIT=&reliefipyramidi=0` ajaa
 * saman mittauksen VANHALLA polulla (pelkkä 4k-tekstuuri), ja se on
 * terävyysvertailun "ennen".
 */
const LISAPARAMIT = process.env.LISAPARAMIT ?? '';
/*
 * LAASTARIN KAAPPAUKSEN NIMI. Oletus on savukkeen oma pitkä nimi
 * (selain, kotelo, kerta, päivä); `LAASTARIN_KUVA=astro-laastari-yo`
 * antaa raportin pyytämän parin `…-ennen.jpg` / `…-jalkeen.jpg`.
 */
const LAASTARIN_KUVA = process.env.LAASTARIN_KUVA ?? '';
const AVAUKSIA = Number(process.env.AVAUKSIA ?? 3);
const SEURANTA_MS = 15000;
const SEURANTA_VALI_MS = 500;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

const VALIMUISTI = new Map();
async function ulkohaku(url) {
  if (VALIMUISTI.has(url)) return VALIMUISTI.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : null)).catch(() => null);
  VALIMUISTI.set(url, lupaus);
  return lupaus;
}

async function ohjaaVerkko(s) {
  await s.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (r) => r.abort());
  await s.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/, async (route) => {
    const v = await ulkohaku(route.request().url());
    if (!v) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
}

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(PORTTI, r));

let paketti = null;
for (const polku of [process.env.PLAYWRIGHT_JS, join(JUURI, 'node_modules', 'playwright', 'index.js'),
  '/opt/node22/lib/node_modules/playwright/index.js']) {
  if (!polku) continue;
  paketti = await import(polku).catch(() => null);
  if (paketti) break;
}
if (!paketti) { console.error('Playwrightia ei löydy: anna PLAYWRIGHT_JS'); process.exit(2); }
const pw = paketti.default ?? paketti;

const IPHONE_UA = pw.devices?.['iPhone 14']?.userAgent
  ?? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1';

const KOTELOT = {
  webapp: { viewport: { width: 2539, height: 1321 }, deviceScaleFactor: 1 },
  iphone: {
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 3,
    hasTouch: true, isMobile: true, userAgent: IPHONE_UA,
  },
};
const SELAIMET = (process.env.SELAIMET ?? 'webkit,chromium').split(',').map((x) => x.trim()).filter(Boolean);
const VALITUT_KOTELOT = (process.env.KOTELOT ?? Object.keys(KOTELOT).join(','))
  .split(',').map((x) => x.trim()).filter(Boolean);

/* Kirkkaus kuvakaappauksesta — sama laskutapa kuin savuke-astro-pallo. */
const kirkkaus = (kuva, x, y, sade = 6) => {
  let summa = 0;
  let n = 0;
  for (let dy = -sade; dy <= sade; dy += 1) {
    for (let dx = -sade; dx <= sade; dx += 1) {
      const px = Math.round(x + dx);
      const py = Math.round(y + dy);
      if (px < 0 || py < 0 || px >= kuva.width || py >= kuva.height) continue;
      summa += luminanssi(kuva.data, (py * kuva.width + px) * 4);
      n += 1;
    }
  }
  return n ? summa / n : 0;
};

/** Keskipiste + neljä sivupistettä (±12 % ruudusta) — musta pinta näkyy kaikissa. */
function pallonKirkkaus(kuva, { leveys, korkeus, dpr }) {
  const kx = (leveys / 2) * dpr;
  const ky = (korkeus / 2) * dpr;
  const dx = leveys * 0.12 * dpr;
  const dy = korkeus * 0.12 * dpr;
  const keski = kirkkaus(kuva, kx, ky);
  const sivut = [[kx - dx, ky], [kx + dx, ky], [kx, ky - dy], [kx, ky + dy]].map(([x, y]) => kirkkaus(kuva, x, y));
  return {
    keski: +keski.toFixed(1),
    sivut: sivut.map((v) => +v.toFixed(1)),
    max: +Math.max(keski, ...sivut).toFixed(1),
  };
}

async function avaaPeli(s) {
  /*
   * SIVUN LATAUS: 60 s JA VARAREITTI (mitattu 18.9.2026).
   *
   * WebKit jäi jokaisella ajolla Playwrightin 30 s:n oletukseen ennen
   * kuin peli oli edes auki. Syy on tämän savukkeen oman otsikon
   * mukainen: estetyt ulkoverkon pyynnöt jäävät WebKitissä vireille
   * pitkäksi aikaa, eikä `load` laukea siinä ajassa, vaikka sivu on
   * ruudulla ja toimii. Kello nostetaan samaan 60 s:iin kuin
   * kaappauksilla, ja jos sekään ei riitä, `domcontentloaded` kelpaa:
   * sen jälkeen tuleva `waitForFunction(pallolauta)` on se oikea
   * vartija sille, onko peli pystyssä.
   */
  const osoite = `http://127.0.0.1:${PORTTI}/index.html?lauta=pallo&pallodiag=1${LISAPARAMIT}`;
  await s.goto(osoite, { waitUntil: 'load', timeout: 60000 })
    .catch((e) => {
      /*
       * EI UUTTA NAVIGOINTIA: sivu on jo ladattu ja ajossa, ja toinen
       * `goto` samaan osoitteeseen purkaisi WebGL-kontekstin kesken
       * alustuksen (mitattu 18.9.2026: WebKit sulki sivun kokonaan).
       * Jatketaan siitä, mikä on — `waitForFunction(pallolauta)` alla
       * on se vartija, joka kertoo, onko peli oikeasti pystyssä.
       */
      console.log(`    (load ei lauennut: ${e.message.split('\n')[0]} — jatketaan silti)`);
    });
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
    // Linssi laukkuun samalle kentälle, johon js/linssit/omistus.js sen kirjoittaa.
    game.player.linssit = [...(game.player.linssit ?? []), 'satelliitti'];
    ui.render();
  });
  const ok = await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  await s.waitForTimeout(1800);
  await s.keyboard.press('Escape');
  await s.evaluate(async () => {
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(window.matkakirja.ui);
  });
  await s.waitForTimeout(500);
  await s.evaluate(() => {
    document.querySelector('dialog[open]')?.close?.();
    for (const el of document.querySelectorAll('.fokusvirta-isokuva, .saapumistraileri')) el.remove();
  });
  await s.waitForTimeout(1200);
  return ok;
}

/* Sama pelaajan ele kuin savuke-astro-pallossa: laukku → ruutu → Aktivoi. */
async function avaaLinssiEleella(s) {
  await s.click('#turn-pill', { timeout: 20000 })
    .catch(() => s.evaluate(() => document.getElementById('turn-pill')?.click()));
  await s.waitForTimeout(1200);
  const ruutu = s.locator('button[data-linssi="satelliitti"]');
  await ruutu.waitFor({ timeout: 15000 });
  await ruutu.scrollIntoViewIfNeeded();
  await ruutu.click({ timeout: 20000 })
    .catch(() => s.evaluate(() => document.querySelector('button[data-linssi="satelliitti"]')?.click()));
  await s.waitForTimeout(700);
  const aktivoi = s.locator('.linssi-aktivoi');
  await aktivoi.waitFor({ timeout: 15000 });
  await aktivoi.scrollIntoViewIfNeeded();
  await aktivoi.click({ timeout: 20000 })
    .catch(() => s.evaluate(() => document.querySelector('.linssi-aktivoi')?.click()));
}

/* Linssi kiinni sen omalla ✕:llä (satelliitti-linssisulku), kuten pelaaja. */
async function suljeLinssi(s) {
  const nappi = s.locator('.satelliitti-linssisulku');
  const on = await nappi.count();
  if (on) {
    await nappi.first().click({ timeout: 10000 })
      .catch(() => s.evaluate(() => document.querySelector('.satelliitti-linssisulku')?.click()));
  } else {
    await s.evaluate(() => window.matkakirja?.ui?.valitseLinssi?.(null));
  }
  const varit = await s.evaluate(async () => {
    const lue = () => { const m = window.matkakirja?.ui?.pallolauta?.pallo?.globeMaterial?.(); return m ? (m.color ? m.color.getHexString() : 'null') : '-'; };
    const ulos = [`0:${lue()}`];
    for (const ms of [50, 200, 1000, 2500]) { await new Promise((r) => setTimeout(r, ms)); ulos.push(`+${ms}:${lue()}`); }
    return ulos.join(' ');
  });
  console.log(`    VÄRI SULUN JÄLKEEN ${varit}`);
  return s.evaluate(() => {
    const pallo = window.matkakirja?.ui?.pallolauta?.pallo;
    const m = pallo?.globeMaterial?.();
    return {
      linssi: window.matkakirja?.ui?.linssiValittu ?? null,
      pisteita: document.querySelectorAll('.satelliitti-piste').length,
      ilmoitus: Boolean(document.getElementById('linssivirhe')),
      /* Materiaalin väri sulun jälkeen: globe.gl:n Color(0)-haara näkyy tässä. */
      vari: m ? (m.color ? m.color.getHexString() : 'null') : 'ei-materiaalia',
      kuvaOsoite: String(pallo?.globeImageUrl?.() ?? 'null').slice(0, 40),
      laattaOsoite: String(pallo?.globeTileEngineUrl?.() ?? 'null').slice(0, 40),
    };
  });
}

const LUE_TILA = () => {
  const kahva = window.matkakirja?.ui?.pallolinssi?.kahva ?? null;
  const tila = (() => { try { return kahva?.avaruus?.tila?.() ?? null; } catch (e) { return { virhe: String(e) }; } })();
  return {
    linssi: window.matkakirja?.ui?.linssiValittu ?? null,
    kahva: Boolean(kahva),
    puute: kahva?.puute ? String(kahva.puute() ?? 'ei') : 'ei-kahvaa',
    kaatuneet: kahva?.kaatuneetVaiheet ? kahva.kaatuneetVaiheet() : null,
    pisteita: document.querySelectorAll('.satelliitti-piste').length,
    ilmoitus: (document.getElementById('linssivirhe')?.textContent ?? '').slice(0, 100) || null,
    pinnanOsoite: tila?.pinnanOsoite ?? null,
    reliefi: tila?.reliefi ?? null,
    reliefinTarkkuus: tila?.reliefinTarkkuus ?? null,
    reliefinKestoMs: tila?.reliefinKestoMs ?? null,
    tekstuuri: tila?.tekstuuri ?? null,
    kangas: tila?.kangas ?? null,
    kotelo: tila?.kotelo ?? null,
    kontekstiHukassa: tila?.kontekstiHukassa ?? null,
    halkaisijaPx: tila?.halkaisijaNytPx ?? null,
  };
};

/* Lokin rivit tekstinä siitä kohdasta, missä avaus alkoi. */
const LUE_DIAG = async (alku) => {
  const { pallodiagLoki } = await import('/js/pallodiag.js');
  return pallodiagLoki().slice(alku).map((r) => {
    const { vaihe, ...t } = r;
    const osat = Object.entries(t).map(([k, v]) => `${k}=${v}`).join(' ');
    return osat ? `${vaihe} ${osat}` : String(vaihe);
  });
};
const DIAG_PITUUS = async () => {
  const { pallodiagLoki } = await import('/js/pallodiag.js');
  return pallodiagLoki().length;
};

/*
 * ══════════════════════════════════════════════════════════════════
 * RELIEFILAASTARIN VARTIOT (Raamattu PAATOKSET 41 kohta 4,
 * ASTRONAUTIN KAMERA LISAYS 16 kohta 47)
 * ══════════════════════════════════════════════════════════════════
 *
 * Omistajan vika 18.9.2026 (iPhone-kuva "Italian saapas yöllä"):
 * Astronautin kameran lähizoomi on sumea, koska pallolla on 4k-
 * tekstuuri. Korjaus on sama reliefipyramidin laattakone kuin
 * topografialinssillä, laastarina näkyvälle ikkunalle.
 *
 * NELJÄ MITTAA, KAIKKI SAMASTA NÄKYMÄSTÄ (Italia, korkeus 0,14):
 *
 *  1. TERÄVYYS = reunojen gradienttisumma linssin sisällä. Sumea
 *     kuva on tasainen: naapuripikselien ero on pieni. Sama luku
 *     lasketaan `?reliefipyramidi=0`-ajosta (vanha 4k-polku) ja
 *     oletusajosta, ja jälkimmäisen on oltava selvästi suurempi.
 *     Mitta on ruudun keskiöstä (60 %), jotta pallon reuna ja tähdet
 *     eivät ole mukana.
 *  2. ENSIMMÄINEN RELIEFILAATTA < 300 ms laastarin syttymisestä.
 *  3. SEEPIAPOHJAN PYYNTÖJÄ 0 — laastari ei saa ladata pelin omaa
 *     karttaa alleen (LISAYS 16 kohta 49).
 *  4. MUISTI JA FPS (karttapallo.md luku 6, fps >= 50).
 */
const LAASTARIN_NAKYMA = { lat: 41.6, lng: 14.6, altitude: 0.14 };
const LAASTARIN_ODOTUS_MS = Number(process.env.LAASTARI_ODOTUS_MS ?? 6000);

/**
 * Reunojen gradienttisumma ruudun keskiössä (osuus 0,6).
 *
 * Summa jaetaan näytteiden määrällä, jotta luku ei riipu kaappauksen
 * koosta: sama näkymä eri dpr:llä antaa saman suuruusluokan.
 */
function teravyys(kuva, osuus = 0.6) {
  const x0 = Math.floor((kuva.width * (1 - osuus)) / 2);
  const x1 = Math.ceil(kuva.width - x0);
  const y0 = Math.floor((kuva.height * (1 - osuus)) / 2);
  const y1 = Math.ceil(kuva.height - y0);
  let summa = 0;
  let n = 0;
  for (let y = y0; y < y1 - 1; y += 1) {
    for (let x = x0; x < x1 - 1; x += 1) {
      const i = (y * kuva.width + x) * 4;
      const oikea = (y * kuva.width + x + 1) * 4;
      const ala = ((y + 1) * kuva.width + x) * 4;
      summa += Math.abs(luminanssi(kuva.data, i) - luminanssi(kuva.data, oikea))
        + Math.abs(luminanssi(kuva.data, i) - luminanssi(kuva.data, ala));
      n += 1;
    }
  }
  return n ? +(summa / n).toFixed(3) : 0;
}

/*
 * ══════════════════════════════════════════════════════════════════
 * VARTIO 5: LAASTARI ON YHTÄ HÄMÄRÄ KUIN POHJA (PAATOKSET 41 kohta 4)
 * ══════════════════════════════════════════════════════════════════
 *
 * Fablen luenta 18.9.2026: laastarin alue oli *kirkas päivänvalo*
 * siinä missä 4k-pohja oli astronautin hämärä, ja reunalla oli
 * kirkkausraja. Juurisyy on pallon valo: pohjatekstuuriin on poltettu
 * valon käänteisluku (`valoLiuku`), laastariin ei ollut.
 *
 * ── MIKSI TÄSSÄ EI OLE "YÖNÄKYMÄÄ" JA "PÄIVÄNÄKYMÄÄ" ─────────────
 *
 * Astronautin kamerassa EI OLE TERMINAATTORIA. Pallon valot ovat
 * pelin omat (AmbientLight π + DirectionalLight 0,6 π pohjoisnavan
 * yläpuolelta), eikä niissä ole vuorokautta: "yö" kaappauksessa on
 * valon vastakaava (41,6°:ssa 0,72) ja kalvon reunavarjo. Vartio on
 * siksi se SUHDE, joka pätee 4k-pohjalle — juuri kuten tilauksessa
 * sanottiin: *mittaa pohjasta ensin, käytä samaa suhdetta.*
 *
 * KAKSI LUKUA, MOLEMMAT SAMASTA NÄKYMÄSTÄ (Italia, korkeus 0,14):
 *
 *  5a. KAISTAERO. Ruudun pallonala jaetaan neljään vaakakaistaan
 *      (= neljä leveysastevyöhykettä). Kaistan keskikirkkaus
 *      laastarin kanssa ja ilman laastaria saa erota alle 8:n.
 *      Tämä ON laastarin reunan kahden puolen ero: reuna on
 *      täsmälleen se paikka, jossa laastari kohtaa pohjan, ja jos
 *      kaista on pohjan kanssa samassa kirkkaudessa joka
 *      leveysasteella, rajaa ei ole missään.
 *  5b. VALON KAARI. Pohjoisimman ja eteläisimmän kaistan suhde
 *      kertoo, kulkeeko valon vaimennus laastarin yli. Pohjan suhde
 *      mitataan ensin, ja laastarin suhde saa erota siitä alle 0,04.
 *
 * VERTAILUPARI ON AJOPARI. "Ennen" on `LISAPARAMIT=&reliefipyramidi=0`
 * (vanha 4k-polku) ja "jälkeen" oletusajo. Ensimmäinen kirjoittaa
 * lukunsa kaappauskansioon (`astro-laastari-pohja.json`), jälkimmäinen
 * lukee ne ja tulostaa vartion. Ilman pohjatiedostoa luvut tulostuvat
 * mittarina ilman tuomiota — vartija ei saa olla tiukempi kuin sen
 * tieto.
 */
const KAISTAERON_KATTO = 8;
const KAAREN_KATTO = 0.04;
/** Mitta-ala ruudusta: pallo ilman reunaa ja ilman pallodiag-lokia. */
const KAISTA_ALA = { x0: 0.12, x1: 0.88, y0: 0.08, y1: 0.52 };

/**
 * Vaakakaistojen keskikirkkaus mitta-alalta (ylin kaista ensin eli
 * pohjoisin). Sama ala ja sama jako molemmissa ajoissa, joten luvut
 * vertautuvat suoraan.
 */
function kaistojenKirkkaus(kuva, kaistoja = 4) {
  const x0 = Math.floor(kuva.width * KAISTA_ALA.x0);
  const x1 = Math.ceil(kuva.width * KAISTA_ALA.x1);
  const y0 = Math.floor(kuva.height * KAISTA_ALA.y0);
  const y1 = Math.ceil(kuva.height * KAISTA_ALA.y1);
  const ulos = [];
  for (let k = 0; k < kaistoja; k += 1) {
    const ya = y0 + Math.floor(((y1 - y0) * k) / kaistoja);
    const yb = y0 + Math.floor(((y1 - y0) * (k + 1)) / kaistoja);
    let summa = 0;
    let n = 0;
    for (let y = ya; y < yb; y += 1) {
      for (let x = x0; x < x1; x += 1) { summa += luminanssi(kuva.data, (y * kuva.width + x) * 4); n += 1; }
    }
    ulos.push(n ? +(summa / n).toFixed(2) : 0);
  }
  return ulos;
}

/** Valon kaari: pohjoisimman ja eteläisimmän kaistan suhde. */
function valonKaari(kaistat) {
  const a = kaistat?.[0];
  const b = kaistat?.[kaistat.length - 1];
  return b > 0 ? +(a / b).toFixed(4) : null;
}

/** Kehystahti: kuinka monta rAF-kehystä kahdessa sekunnissa. */
const LUE_FPS = () => new Promise((valmis) => {
  let n = 0;
  const alku = performance.now();
  const askel = () => {
    n += 1;
    if (performance.now() - alku >= 2000) { valmis(+(n / ((performance.now() - alku) / 1000)).toFixed(1)); return; }
    requestAnimationFrame(askel);
  };
  requestAnimationFrame(askel);
});

/** JS-kasa megatavuina tai null (WebKitissä ei ole performance.memory). */
const LUE_MUISTI = () => {
  const m = performance.memory;
  return m ? Math.round(m.usedJSHeapSize / 1048576) : null;
};

const poimi = (rivit, alku) => rivit.filter((r) => r.startsWith(alku));
const kentta = (rivi, nimi) => (rivi ?? '').match(new RegExp(`(?:^|\\s)${nimi}=(\\S+)`))?.[1] ?? '';

async function mittaaAvaus(s, { selain, kotelo, kerta, dpr, leveys, korkeus }) {
  const diagAlku = await s.evaluate(DIAG_PITUUS);
  const tEle = Date.now();
  const variEnnen = await s.evaluate(() => { const m = window.matkakirja?.ui?.pallolauta?.pallo?.globeMaterial?.(); return m ? (m.color ? m.color.getHexString() : 'null') : '-'; });
  console.log(`    VÄRI ENNEN AVAUSTA ${variEnnen}`);
  await avaaLinssiEleella(s);
  /*
   * KELLO ALKAA AKTIVOI-NAPAUTUKSESTA. Playwrightin omat napautukset
   * odottavat elementin rauhoittumista, ja raskaalla WebGL-sivulla
   * kolme napautusta voi kestää yli kymmenen sekuntia (mitattu
   * Chromiumissa 17.9.2026) — se ei ole linssin aikaa.
   */
  const eleMs = Date.now() - tEle;
  const t0 = Date.now();
  const pisteSarja = [];
  const kirkkausSarja = [];
  const kirkkausHetket = [1000, 2000, 5000, 15000];
  let kuva5 = null;
  let kirkkaus5 = null;
  while (Date.now() - t0 < SEURANTA_MS) {
    const hetki = Date.now() - t0;
    const n = await s.evaluate(() => document.querySelectorAll('.satelliitti-piste').length);
    pisteSarja.push([Math.round(hetki / 100) / 10, n]);
    if (kirkkausHetket.length && hetki >= kirkkausHetket[0]) {
      const raja = kirkkausHetket.shift();
      const kuva = await s.screenshot({ type: 'png', timeout: 60000 });
      const k = pallonKirkkaus(decodePng(kuva), { leveys, korkeus, dpr });
      kirkkausSarja.push([raja / 1000, k.keski, k.max]);
      if (raja === 5000) { kuva5 = kuva; kirkkaus5 = k; }
    }
    const seuraava = t0 + (pisteSarja.length) * SEURANTA_VALI_MS;
    await s.waitForTimeout(Math.max(0, seuraava - Date.now()));
  }
  const kuva15 = await s.screenshot({ type: 'png', timeout: 60000 });
  const kirkkaus15 = pallonKirkkaus(decodePng(kuva15), { leveys, korkeus, dpr });
  /* Materiaalin kartta: mikä kuva pinnalla oikeasti on ja onko se latautunut. */
  const kartta = await s.evaluate(() => {
    try {
      const pallo = window.matkakirja?.ui?.pallolauta?.pallo ?? window.matkakirja?.ui?.pallolinssi?.kahva?.avaruus?.pallo;
      const m = pallo?.globeMaterial?.();
      const kuva = m?.map?.image;
      return {
        map: Boolean(m?.map), tyyppi: kuva?.constructor?.name ?? null,
        koko: kuva ? `${kuva.naturalWidth ?? kuva.width}x${kuva.naturalHeight ?? kuva.height}` : null,
        valmis: kuva?.complete ?? null, src: String(kuva?.src ?? '').slice(0, 20),
        versio: m?.map?.version ?? null, vari: m?.color?.getHexString?.() ?? null,
        emissive: m?.emissive?.getHexString?.() ?? null,
        /* Materiaalin kaikki yksinkertaiset ominaisuudet: musta ja ehjä avaus verrataan. */
        ominaisuudet: (() => {
          const o = {};
          if (!m) return o;
          for (const k of Object.keys(m)) {
            const v = m[k];
            if (v === null || ['number', 'boolean', 'string'].includes(typeof v)) o[k] = v;
            else if (v?.isColor) o[k] = v.getHexString();
            else if (v?.isTexture) o[k] = `Texture(${v.image?.width ?? v.image?.naturalWidth ?? '?'} v${v.version})`;
            else if (v?.isVector2 || v?.isVector3) o[k] = [v.x, v.y, v.z].filter((n) => n !== undefined).join(',');
          }
          return o;
        })(),
        /* Kaikki pallot ja valot näkymässä: mikä pinta on päällimmäisenä ja palaako valo. */
        pallot: (() => {
          const ulos = [];
          pallo?.scene?.()?.traverse?.((o) => {
            if (o.isLight) { ulos.push(`${o.type} ${o.intensity} ${o.visible ? '' : 'PIILOSSA'}`); return; }
            if (!o.isMesh || !/Sphere/.test(o.geometry?.type ?? '')) return;
            const mt = Array.isArray(o.material) ? o.material[0] : o.material;
            ulos.push(`${o.name || o.geometry.type} r=${o.geometry.parameters?.radius ?? '?'}`
              + ` nak=${o.visible ? 1 : 0} vanh=${(() => { let p = o.parent; while (p) { if (!p.visible) return 1; p = p.parent; } return 0; })()}`
              + ` map=${mt?.map ? `${mt.map.image?.width ?? mt.map.image?.naturalWidth ?? '?'}` : '-'}`
              + ` mat=${mt?.type} vari=${mt?.color?.getHexString?.() ?? '-'} op=${mt?.opacity} lapi=${mt?.transparent ? 1 : 0}`
              + ` jarj=${o.renderOrder}`);
          });
          return ulos;
        })(),
      };
    } catch (e) { return { virhe: String(e).slice(0, 80) }; }
  });
  /*
   * ── RELIEFILAASTARI: ITALIAN SAAPAS LÄHIZOOMISSA ────────────────
   * Vartiot 1–4 (ks. RELIEFILAASTARIN VARTIOT yllä). Ajetaan ENNEN
   * mustan pinnan erittelyä, koska erittely muuttaa pinnan tilaa.
   */
  const laastari = { ...LAASTARIN_NAKYMA };
  const verkko = { reliefi: 0, seepia: 0, ekaMs: null };
  const t0Laastari = Date.now();
  const kuuntelija = (pyynto) => {
    const url = pyynto.url();
    if (/\/reliefipyramidi\//.test(url) && /\.webp/.test(url)) {
      verkko.reliefi += 1;
      if (verkko.ekaMs === null) verkko.ekaMs = Date.now() - t0Laastari;
    } else if (/\/laatat\/|\/pyramidi\//.test(url) && /\.webp/.test(url)) verkko.seepia += 1;
  };
  s.on('request', kuuntelija);
  await s.evaluate((n) => {
    const p = window.matkakirja?.ui?.pallolauta?.pallo;
    p?.pointOfView?.({ lat: n.lat, lng: n.lng, altitude: n.altitude }, 0);
    window.matkakirja?.ui?.pallolauta?.heraa?.();
  }, laastari);
  await s.waitForTimeout(LAASTARIN_ODOTUS_MS);
  s.off('request', kuuntelija);
  const laastarinKuva = await s.screenshot({ type: 'png', timeout: 60000 });
  const laastarinPikselit = decodePng(laastarinKuva);
  const laastarinTeravyys = teravyys(laastarinPikselit);
  const laastarinKaistat = kaistojenKirkkaus(laastarinPikselit);
  const laastarinKaari = valonKaari(laastarinKaistat);
  const laastarinFps = await s.evaluate(LUE_FPS);
  const laastarinMuisti = await s.evaluate(LUE_MUISTI);
  const laastarinTila = await s.evaluate(async () => {
    const { reliefiAstronautilla, reliefiKaytossa, reliefinLinssitila } = await import('/js/reliefipyramidi.js');
    const kerros = window.matkakirja?.ui?.pallolauta?.lepokerros?.() ?? null;
    const m = kerros?.mittarit?.() ?? null;
    return {
      tila: reliefinLinssitila(), kaytossa: reliefiKaytossa(), astro: reliefiAstronautilla(),
      taso: m?.taso?.z ?? m?.taso ?? null, laattoja: m?.laattoja ?? null, valmiita: m?.valmiita ?? null,
      scenessa: m?.scenessa ?? null, tavut: m?.kaytetytTavut ?? null, syy: m?.syy ?? null,
      reliefi404: m?.reliefi404 ?? null, merivariAukkoja: m?.merivariAukkoja ?? null, varoja: m?.reliefiVaroja ?? null, tasavareja: m?.reliefiTasavareja ?? null,
      jumissa: m?.jumissa ?? null, valmiita: m?.valmiita ?? null,
    };
  }).catch((e) => ({ virhe: String(e).slice(0, 120) }));
  if (process.env.LAASTARIN_LAATAT === '1') {
    const laatat = await s.evaluate(() => {
      const p = window.matkakirja.ui.pallolauta.pallo;
      const ulos = [];
      p.scene().traverse((o) => {
        const ud = o.userData?.laattakerros;
        if (!ud || !o.material?.map?.image) return;
        const kuva = o.material.map.image;
        let ka = null; let hajonta = null;
        try {
          const c = document.createElement('canvas');
          c.width = 32; c.height = 32;
          const x = c.getContext('2d');
          x.drawImage(kuva, 0, 0, 32, 32);
          const d = x.getImageData(0, 0, 32, 32).data;
          const r = []; const g = []; const b = [];
          for (let i = 0; i < d.length; i += 4) { r.push(d[i]); g.push(d[i + 1]); b.push(d[i + 2]); }
          const m = (a) => a.reduce((s2, v) => s2 + v, 0) / a.length;
          ka = [m(r), m(g), m(b)].map(Math.round);
          const l = r.map((v, i) => 0.2126 * v + 0.7152 * g[i] + 0.0722 * b[i]);
          const lm = m(l);
          hajonta = +Math.sqrt(m(l.map((v) => (v - lm) ** 2))).toFixed(1);
        } catch (e) { ka = String(e).slice(0, 40); }
        let nakyy = o.visible; let y = o.parent; while (nakyy && y) { nakyy = y.visible; y = y.parent; }
        ulos.push({ z: ud.z, s: ud.sarake, r: ud.rivi, nakyy, ka, hajonta });
      });
      return ulos;
    });
    console.log(`LAATAT ${JSON.stringify(laatat)}`);
    const muut = await s.evaluate(() => {
      const { pallo: p, kotelo } = window.matkakirja.ui.pallolauta;
      const kamera = p.camera(); const kr = kotelo.getBoundingClientRect();
      const ryhmat = {};
      p.scene().traverse((o) => {
        if (!o.isMesh || Object.keys(o.userData ?? {}).length) return;
        let nakyy = o.visible; let y = o.parent; while (nakyy && y) { nakyy = y.visible; y = y.parent; }
        if (!nakyy) return;
        const m = Array.isArray(o.material) ? o.material[0] : o.material;
        const kuva = m?.map?.image;
        const tila = !m?.map ? 'ei-karttaa' : (!kuva ? 'ei-kuvaa' : (kuva.complete === false ? 'lataamatta' : `${kuva.width ?? kuva.naturalWidth}x${kuva.height ?? kuva.naturalHeight}`));
        o.geometry?.computeBoundingSphere?.();
        const bs = o.geometry?.boundingSphere;
        let ruutu = null;
        if (bs) {
          const v = bs.center.clone().applyMatrix4(o.matrixWorld).project(kamera);
          if (Math.abs(v.x) <= 1.2 && Math.abs(v.y) <= 1.2 && v.z < 1) ruutu = [Math.round((v.x + 1) / 2 * kr.width), Math.round((1 - v.y) / 2 * kr.height)];
        }
        const avain = `${m?.type} vari=${m?.color?.getHexString?.()} ${tila} ro=${o.renderOrder} ${String(kuva?.src ?? '').replace(/^.*\/laatat\//, '').replace(/\/\d+\/\d+\.jpg.*$/, '')}`;
        (ryhmat[avain] ??= { n: 0, ruudulla: [] }).n += 1;
        if (ruutu && ryhmat[avain].ruudulla.length < 6) ryhmat[avain].ruudulla.push(ruutu);
      });
      return ryhmat;
    });
    console.log(`MUUT ${JSON.stringify(muut)}`);
    if (ULOS) {
      await s.evaluate(() => { window.matkakirja.ui.pallolinssi?.kahva?.avaruus?.piilotaPilvet?.(true); window.matkakirja.ui.pallolauta?.heraa?.(); });
      await s.waitForTimeout(800);
      await s.screenshot({ path: join(ULOS, `laastari-ilman-pilvia-${selain}.jpg`), type: 'jpeg', quality: 60, scale: 'css' }).catch(() => {});
      await s.evaluate(() => { window.matkakirja.ui.pallolinssi?.kahva?.avaruus?.piilotaPilvet?.(false); window.matkakirja.ui.pallolauta?.heraa?.(); });
      await s.waitForTimeout(800);
      await s.screenshot({ path: join(ULOS, `laastari-pilvet-takaisin-${selain}.jpg`), type: 'jpeg', quality: 60, scale: 'css' }).catch(() => {});
    }
  }
  const pohjaAjo = /reliefipyramidi=0/.test(LISAPARAMIT);
  if (ULOS) {
    const nimi = LAASTARIN_KUVA
      ? `${LAASTARIN_KUVA}-${pohjaAjo ? 'ennen' : 'jalkeen'}.jpg`
      : `astro-laastari-${selain}-${kotelo}-${kerta}-${pohjaAjo ? 'ennen' : 'jalkeen'}-${PVM}.jpg`;
    await s.screenshot({
      path: join(ULOS, nimi), type: 'jpeg', quality: 60, scale: 'css', timeout: 60000,
    }).catch(() => {});
    laastari.kuva = nimi;
  }
  /*
   * VARTIO 5 (ks. VARTIO 5 yllä). Pohja-ajo kirjoittaa lukunsa
   * levylle, laastariajo lukee ne ja tuomitsee. Tiedosto on
   * kaappauskansiossa ja kotelokohtainen: eri kotelo on eri ruutu eikä
   * sen kaistat vertaudu.
   */
  const pohjaPolku = ULOS ? join(ULOS, `astro-laastari-pohja-${selain}-${kotelo}.json`) : '';
  let vartio5 = null;
  if (pohjaAjo) {
    if (pohjaPolku) {
      writeFileSync(pohjaPolku, JSON.stringify({
        selain, kotelo, kaistat: laastarinKaistat, kaari: laastarinKaari, teravyys: laastarinTeravyys,
      }, null, 1));
    }
  } else if (pohjaPolku && existsSync(pohjaPolku)) {
    try {
      const pohja = JSON.parse(readFileSync(pohjaPolku, 'utf8'));
      const erot = laastarinKaistat.map((v, i) => +(v - (pohja.kaistat?.[i] ?? v)).toFixed(2));
      const kaistaEro = Math.max(...erot.map(Math.abs));
      const kaariEro = (laastarinKaari !== null && pohja.kaari)
        ? +Math.abs(laastarinKaari - pohja.kaari).toFixed(4) : null;
      vartio5 = {
        pohjanKaistat: pohja.kaistat ?? null,
        erot,
        kaistaEro: +kaistaEro.toFixed(2),
        kaistaEroOk: kaistaEro < KAISTAERON_KATTO,
        pohjanKaari: pohja.kaari ?? null,
        kaariEro,
        kaariOk: kaariEro === null ? null : kaariEro < KAAREN_KATTO,
      };
    } catch (e) { vartio5 = { virhe: String(e).slice(0, 80) }; }
  }
  Object.assign(laastari, {
    teravyys: laastarinTeravyys, fps: laastarinFps, muistiMt: laastarinMuisti,
    kaistat: laastarinKaistat, kaari: laastarinKaari, vartio5,
    reliefipyyntoja: verkko.reliefi, seepiapyyntoja: verkko.seepia, ekaLaattaMs: verkko.ekaMs,
    ...laastarinTila,
  });
  console.log(`    LAASTARI Italia: terävyys ${laastarinTeravyys}, fps ${laastarinFps},`
    + ` muisti ${laastarinMuisti ?? '–'} Mt, reliefipyyntöjä ${verkko.reliefi} (1. ${verkko.ekaMs ?? '–'} ms),`
    + ` seepiapyyntöjä ${verkko.seepia}, tila ${JSON.stringify(laastarinTila)}`);
  console.log(`    LAASTARI kirkkaus: kaistat ${laastarinKaistat.join(' / ')}, valon kaari ${laastarinKaari}`
    + (vartio5
      ? (vartio5.virhe ? `, pohjaa ei luettu (${vartio5.virhe})`
        : `, pohja ${vartio5.pohjanKaistat?.join(' / ')}, erot ${vartio5.erot.join(' / ')},`
          + ` suurin ${vartio5.kaistaEro} → ${vartio5.kaistaEroOk ? 'VIHREÄ' : 'PUNAINEN'} (< ${KAISTAERON_KATTO}),`
          + ` kaari ${vartio5.pohjanKaari} → ${laastarinKaari}, ero ${vartio5.kaariEro}`
          + ` → ${vartio5.kaariOk ? 'VIHREÄ' : 'PUNAINEN'} (< ${KAAREN_KATTO})`)
      : (pohjaAjo ? ' (pohja-ajo: luvut talteen)' : ' (pohjatiedostoa ei ole — ei tuomiota)')));

  /* Kuva raporttiin ENNEN erittelyn kokeita: kokeet muuttavat pinnan tilaa. */
  let kuvanNimi = null;
  if (ULOS) {
    const nimi = `astro-webkit-${selain}-${kotelo}-${kerta}-${PVM}.jpg`;
    await s.screenshot({
      path: join(ULOS, nimi), type: 'jpeg', quality: dpr > 1 ? 55 : 36, scale: 'css', timeout: 60000,
    }).catch((e) => console.log(`    (kaappaus ei onnistunut: ${e.message.split('\n')[0]})`));
    kuvanNimi = nimi;
  }
  /*
   * MUSTAN PINNAN ERITTELY. Kun keskipiste on musta 15 s kohdalla,
   * mitataan mistä kerroksesta musta tulee: (1) piirtääkö kehyssilmukka
   * yhä, (2) mitä WebGL-kangas itse sanoo keskipisteestään (readPixels
   * heti oman render-kutsun perään), (3) palautuuko pinta, kun kalvo
   * piilotetaan / materiaali merkitään päivitettäväksi / sama osoite
   * asetetaan uudelleen. Nämä ovat kokeita mittaussivulla, eivät
   * pelikoodin muutoksia.
   */
  let erittely = null;
  if (kirkkaus15.max < 20) {
    const kehykset = await s.evaluate(async () => {
      const pallo = window.matkakirja?.ui?.pallolauta?.pallo;
      const r = pallo?.renderer?.();
      const alku = r?.info?.render?.frame ?? null;
      await new Promise((ok) => setTimeout(ok, 1000));
      return { alku, loppu: r?.info?.render?.frame ?? null };
    });
    const gl = await s.evaluate(() => {
      try {
        const pallo = window.matkakirja?.ui?.pallolauta?.pallo;
        const r = pallo.renderer(); const gl = r.getContext();
        r.render(pallo.scene(), pallo.camera());
        const px = new Uint8Array(4);
        gl.readPixels(Math.floor(gl.drawingBufferWidth / 2), Math.floor(gl.drawingBufferHeight / 2), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
        return { keski: [...px], puskuri: `${gl.drawingBufferWidth}x${gl.drawingBufferHeight}`, hukassa: gl.isContextLost() };
      } catch (e) { return { virhe: String(e).slice(0, 80) }; }
    });
    const koe = async (nimi, teko) => {
      await s.evaluate(teko);
      await s.waitForTimeout(2000);
      const k = pallonKirkkaus(decodePng(await s.screenshot({ type: 'png', timeout: 60000 })), { leveys, korkeus, dpr });
      return `${nimi}: keski ${k.keski} max ${k.max}`;
    };
    const kokeet = [];
    kokeet.push(await koe('kalvo piiloon', () => { for (const el of document.querySelectorAll('.astro-kalvo')) el.style.visibility = 'hidden'; }));
    await s.evaluate(() => { for (const el of document.querySelectorAll('.astro-kalvo')) el.style.visibility = ''; });
    kokeet.push(await koe('materiaali needsUpdate', () => { const m = window.matkakirja.ui.pallolauta.pallo.globeMaterial(); m.needsUpdate = true; if (m.map) m.map.needsUpdate = true; }));
    kokeet.push(await koe('sama osoite uudelleen', () => { const p = window.matkakirja.ui.pallolauta.pallo; p.globeImageUrl(p.globeImageUrl()); }));
    /* Onko pallo ylipäätään piirrossa: kartta pois ja väri punaiseksi → kirkkaus > 0 jos verkko piirtyy. */
    kokeet.push(await koe('kartta pois, väri punainen', () => {
      const m = window.matkakirja.ui.pallolauta.pallo.globeMaterial();
      window.__astroKartta = m.map; m.map = null; m.color?.set?.('#ff4040'); m.needsUpdate = true;
    }));
    kokeet.push(await koe('kartta takaisin', () => {
      const m = window.matkakirja.ui.pallolauta.pallo.globeMaterial();
      m.map = window.__astroKartta ?? null; m.color?.set?.('#ffffff'); m.needsUpdate = true;
    }));
    /* Väri on null molemmissa avauksissa (mitattu): annetaan valkoinen Color → palaako pinta. */
    kokeet.push(await koe('color null → valkoinen Color', () => {
      const m = window.matkakirja.ui.pallolauta.pallo.globeMaterial();
      const C = m.specular?.constructor; if (!C) return;
      window.__astroVariEnnen = m.color; m.color = new C('#ffffff'); m.needsUpdate = true;
    }));
    kokeet.push(await koe('color takaisin', () => {
      const m = window.matkakirja.ui.pallolauta.pallo.globeMaterial();
      m.color = window.__astroVariEnnen ?? null; m.needsUpdate = true;
    }));
    /* Materiaali kokonaan uusiksi samalla kartalla: jos pinta palaa, vika on vanhassa materiaali-/ohjelmatilassa. */
    kokeet.push(await koe('uusi materiaali (sama luokka) samalla kartalla', () => {
      const pallo = window.matkakirja.ui.pallolauta.pallo;
      let verkko = null;
      pallo.scene().traverse((o) => { if (!verkko && o.isMesh && /Sphere/.test(o.geometry?.type ?? '') && o.material?.type === 'MeshPhongMaterial') verkko = o; });
      if (!verkko) return;
      const THREE_Tex = window.__astroKartta?.constructor;
      window.__astroVanhaMat = verkko.material;
      const Mat = Object.getPrototypeOf(verkko.material).constructor;
      const uusi = new Mat(); uusi.map = window.__astroKartta ?? verkko.material.map; uusi.needsUpdate = true;
      verkko.material = uusi; void THREE_Tex;
    }));
    erittely = { kehykset, gl, kokeet };
    console.log(`    ERITTELY ${JSON.stringify(erittely)}`);
  }
  const tila = await s.evaluate(LUE_TILA);
  const diag = await s.evaluate(LUE_DIAG, diagAlku);
  /* Kirjasto ladataan jo pallolaudan kanssa (ennen linssiä): rivi koko lokista. */
  const kokoLoki = await s.evaluate(LUE_DIAG, 0);

  const alkuRivi = poimi(diag, 'alku ').at(-1);
  const ladonta = poimi(diag, 'ladonta ');
  const valmis = poimi(diag, 'valmis ').at(-1);
  const vartijat = poimi(diag, 'vartija ');
  const avaruusAlku = poimi(diag, 'avaruus-alku ').at(-1);
  const kirjasto = poimi(diag, 'kirjasto ').at(-1) ?? poimi(kokoLoki, 'kirjasto ').at(-1);
  const vaiheetKaatui = poimi(diag, 'vaihe ').filter((r) => kentta(r, 'ok') === '0');
  /* Korjaushaaran (astro-webkit2) uudet rivit; puuttuvat v1929:ssä. */
  const uudet = {
    pintaMittaus: poimi(diag, 'pinta-mittaus ').map((r) => r.replace('pinta-mittaus ', '')),
    pintaMusta: poimi(diag, 'pinta-musta ').map((r) => r.replace('pinta-musta ', '')),
    kehykset: poimi(diag, 'kehykset ').map((r) => r.replace('kehykset ', '')),
    pistemittari: poimi(diag, 'pistemittari ').map((r) => r.replace('pistemittari ', '')),
    pisteetUusinta: poimi(diag, 'pisteet-uusinta ').map((r) => r.replace('pisteet-uusinta ', '')),
  };
  const tulos = {
    selain, kotelo, kerta,
    kirjasto: kirjasto ?? '(ei riviä)',
    avaruusAlku: avaruusAlku ?? '(ei riviä)',
    lahde: kentta(alkuRivi, 'lahde'),
    ladontaKangas: kentta(alkuRivi, 'kangas'),
    ladontaRivit: ladonta.map((r) => `${kentta(r, 'koko')} ok=${kentta(r, 'ok')} tapa=${kentta(r, 'tapa')}`),
    valmis: valmis ? `${kentta(valmis, 'syy')} ${kentta(valmis, 'ms')} ms` : '(ei valmis-riviä)',
    vaiheetKaatui,
    ...uudet,
    vartijat: vartijat.map((r) => `${kentta(r, 'puute')}/${kentta(r, 'pisteita')}`),
    puuteLopussa: tila.puute,
    pisteitaLopussa: tila.pisteita,
    pisteSarja,
    pisteitaEnsinHetki: pisteSarja.find(([, n]) => n > 0)?.[0] ?? null,
    kirkkaus5, kirkkaus15, kirkkausSarja, eleMs, kartta, erittely, kuva: kuvanNimi,
    reliefinTarkkuus: tila.reliefinTarkkuus,
    reliefinKestoMs: tila.reliefinKestoMs,
    pinnanOsoite: tila.pinnanOsoite,
    kangas: tila.kangas,
    laastari,
    koteloMitat: tila.kotelo,
    kontekstiHukassa: tila.kontekstiHukassa,
    ilmoitus: tila.ilmoitus,
    diag,
  };
  return tulos;
}

async function ajaSelain(nimi) {
  const tyyppi = pw[nimi];
  if (!tyyppi) { console.log(`selainta ${nimi} ei ole Playwrightissa`); return []; }
  const asetukset = {};
  if (nimi === 'chromium' && process.env.CHROMIUM) asetukset.executablePath = process.env.CHROMIUM;
  if (nimi === 'webkit' && process.env.WEBKIT) asetukset.executablePath = process.env.WEBKIT;
  const selain = await tyyppi.launch(asetukset);
  console.log(`\n=== ${nimi} ${selain.version()} ===`);
  const tulokset = [];
  for (const kotelo of VALITUT_KOTELOT) {
    const asetus = KOTELOT[kotelo];
    if (!asetus) continue;
    const virheet = [];
    const konsoli = [];
    const konteksti = await selain.newContext({ ...asetus, serviceWorkers: 'block', reducedMotion: 'no-preference' });
    const s = await konteksti.newPage();
    s.on('pageerror', (e) => virheet.push(String(e).split('\n')[0]));
    s.on('console', (m) => { if (m.type() === 'error' || /pallodiag|WebGL|texture|canvas/i.test(m.text())) konsoli.push(`${m.type()}: ${m.text().slice(0, 160)}`); });
    await ohjaaVerkko(s);
    const dpr = asetus.deviceScaleFactor ?? 1;
    const { width: leveys, height: korkeus } = asetus.viewport;
    const t0 = Date.now();
    const lauta = await avaaPeli(s);
    console.log(`--- ${nimi} × ${kotelo} (${leveys}×${korkeus} dpr ${dpr}): pallolauta ${lauta} ${Date.now() - t0} ms`);
    const ruutu = await s.evaluate(() => ({
      inner: `${innerWidth}x${innerHeight}`, dpr: devicePixelRatio,
      standalone: navigator.standalone === true, ua: navigator.userAgent.slice(0, 80),
    }));
    console.log(`    ruutu ${JSON.stringify(ruutu)}`);
    for (let kerta = 1; kerta <= AVAUKSIA; kerta += 1) {
      const t = await mittaaAvaus(s, { selain: nimi, kotelo, kerta, dpr, leveys, korkeus });
      t.ruutu = ruutu;
      tulokset.push(t);
      console.log(`  avaus ${kerta} (ele ${t.eleMs} ms): pisteitä ${t.pisteitaLopussa} (ensin ${t.pisteitaEnsinHetki ?? '–'} s),`
        + ` puute ${t.puuteLopussa}, vartija [${t.vartijat.join(' ')}], ladonta ${t.ladontaKangas}`
        + ` [${t.ladontaRivit.join('; ')}], valmis ${t.valmis}, reliefi ${t.reliefinTarkkuus} ${t.reliefinKestoMs} ms,`
        + ` kirkkaus 5 s ${t.kirkkaus5?.keski} / 15 s ${t.kirkkaus15?.keski} (max ${t.kirkkaus15?.max}),`
        + ` pinta "${t.pinnanOsoite}", kangas ${JSON.stringify(t.kangas)}, kirkkaussarja ${JSON.stringify(t.kirkkausSarja)},`
        + ` kartta ${JSON.stringify(t.kartta)}`);
      console.log(`    UUDET RIVIT pinta-mittaus [${t.pintaMittaus.join('; ')}] pinta-musta [${t.pintaMusta.join('; ')}]`
        + ` kehykset [${t.kehykset.join('; ')}] pistemittari [${t.pistemittari.join('; ')}] pisteet-uusinta [${t.pisteetUusinta.join('; ')}]`);
      for (const r of t.diag) console.log(`      ${r}`);
      if (kerta > 1) {
        const eka = tulokset.find((x) => x.selain === nimi && x.kotelo === kotelo && x.kerta === 1)?.kartta?.ominaisuudet ?? {};
        const nyt = t.kartta?.ominaisuudet ?? {};
        const erot = [...new Set([...Object.keys(eka), ...Object.keys(nyt)])]
          .filter((k) => JSON.stringify(eka[k]) !== JSON.stringify(nyt[k]))
          .map((k) => `${k}: ${JSON.stringify(eka[k])} → ${JSON.stringify(nyt[k])}`);
        console.log(`    MATERIAALIN EROT avaukseen 1: ${erot.length ? erot.join(' | ') : 'ei eroja'}`);
        t.materiaalinErot = erot;
      }
      const sulku = await suljeLinssi(s);
      console.log(`    sulku: linssi ${sulku.linssi}, pisteitä ${sulku.pisteita}, ilmoitus ${sulku.ilmoitus},`
        + ` materiaalin väri ${sulku.vari}, kuva "${sulku.kuvaOsoite}", laatat "${sulku.laattaOsoite}"`);
    }
    if (virheet.length) console.log(`    sivuvirheet: ${virheet.slice(0, 5).join(' | ')}`);
    if (konsoli.length) console.log(`    konsoli: ${konsoli.filter((r) => !/pallodiag/.test(r)).slice(0, 5).join(' | ')}`);
    tulokset.at(-1).virheet = virheet;
    tulokset.at(-1).konsoli = konsoli.filter((r) => !/pallodiag/.test(r));
    await konteksti.close();
  }
  await selain.close();
  return tulokset;
}

const kaikki = [];
for (const nimi of SELAIMET) kaikki.push(...await ajaSelain(nimi));
palvelin.close();

if (ULOS) {
  /* Raskaat listat (materiaalin ominaisuudet, näkymän pallot) jäävät lokiin; JSON pysyy pienenä. */
  const kevyt = kaikki.map((t) => ({ ...t, kartta: { ...t.kartta, ominaisuudet: undefined, pallot: undefined } }));
  writeFileSync(join(ULOS, `astro-webkit-mittaus-${PVM}.json`), JSON.stringify(kevyt, null, 1));
}

/* Taulukko raporttia varten. */
console.log('\n| selain | kotelo | avaus | pisteitä (ensin s) | puute | kirkkaus 5 s / 15 s | ladonta | reliefi | valmis | pinta-mittaus | kehykset |');
console.log('|---|---|---|---|---|---|---|---|---|---|---|');
for (const t of kaikki) {
  console.log(`| ${t.selain} | ${t.kotelo} | ${t.kerta} | ${t.pisteitaLopussa} (${t.pisteitaEnsinHetki ?? '–'})`
    + ` | ${t.puuteLopussa} | ${t.kirkkaus5?.keski} / ${t.kirkkaus15?.keski} | ${t.ladontaKangas || '–'}`
    + ` | ${t.reliefinTarkkuus ?? '–'} ${t.reliefinKestoMs ?? ''} ms | ${t.valmis} | ${t.pintaMittaus.join('; ') || '–'} | ${t.kehykset.join('; ') || '–'} |`);
}
process.exit(0);
