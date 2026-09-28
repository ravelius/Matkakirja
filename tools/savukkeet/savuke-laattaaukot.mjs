#!/usr/bin/env node
/*
 * Savuke: LAATTA-AUKOT — epäonnistunut laatta ei jää pysyväksi aukoksi
 * (Pelikoodari 27.9.2026, PR #3516).
 *
 *   node tools/savukkeet/savuke-laattaaukot.mjs [--juuri <checkout>]
 *        [--lauta pallo|kartta] [--siemen 1873] [--osuus 0.25]
 *        [--tausta-ms 8000] [--kaikki-kerrokset] [--kuvat <kansio>]
 *
 * Omistaja 27.9.2026 klo 23.5x (iPad web): isoja tasaisia
 * pergamenttiruutuja ja tarkkoja ja karkeita laattoja vierekkäin;
 * *"karttavirhe palaa, vaikka olisi aluksi näyttänyt kaiken oikein"*.
 *
 * === PALLO (oletus) — js/pallolaatat.js ============================
 *
 * Peli piirtää kartan pallolla; tasokartta on pois käytöstä. Ennen
 * korjausta lataa() kokosi laatan ILMAN epäonnistunutta kerrosta ja
 * merkitsi sen valmiiksi (pohjan puuttuessa pysyvä pergamentti), eikä
 * virhetilan laattaa haettu enää koskaan. Korjauksen jälkeen pudonnut
 * olemassa olevan kerroksen kuva tekee laatasta virheen, virhe uusitaan
 * 1,5/4,5/13,5/20 s:n välein ja visibilitychange/pageshow/online uusivat
 * heti (mittarit laattavirheita, uusittu).
 *
 * MITTARIT — kaksi, koska kumpikaan ei yksin näe molempia versioita:
 *
 *   AUKKOJA (laattakerroksen omat mittarit, ei lähdemuutoksia):
 *     nakyvia − nakyviaScenessa asettumisen jälkeen = näkyvän alueen
 *     laatat, jotka eivät ole scenessä, eli käytännössä tila 'virhe'
 *     (lataukset ovat ehtineet loppua). Tämä on JÄLKEEN-version vaatimus
 *     (AUKKOJA 0). ENNEN-versiossa se näkee pysyvät virhelaatat mutta EI
 *     vajaana valmiiksi koottua laattaa (se on scenessä).
 *   KUVAERO (vertailuajo): lopun kamera-asento otetaan talteen, ja
 *     samaan asentoon avataan puhdas sivu ILMAN injektiota. Kuvat
 *     verrataan 16×16 px:n lohkoina (keskimääräinen kanavaero > 24);
 *     tulos on poikkeavien lohkojen osuus pallon alasta. Tämä näkee myös
 *     vajaan valmiin laatan (pergamentti oikean kuvan paikalla), joten
 *     se on ENNEN/JÄLKEEN-vertailun kuvallinen mitta. Kohinan takia
 *     muut kerrokset ovat pois (`?kerrokset=porras1` = vain laatat;
 *     `--kaikki-kerrokset` kytkee ne takaisin). Kuvaerosta ei tehdä
 *     vaatimusta: vertailuajon taso voi erota ajoituksen takia.
 *   Versio tunnistetaan lähteestä (`laattavirheita` js/pallolaatat.js:ssä)
 *   ja mittariolion kentästä; puuttuvat luvut tulostetaan '–'.
 *
 * TUNNETTU RAJOITUS (28.9.2026): vertailusivu avautuu eri UI-tilaan
 * (karttaruutu eri korkuinen ja eri mittakaavassa), joten KUVAERO vertaa
 * eri rajausta — sama 1,18 % ENNEN- ja JÄLKEEN-ajossa. Käytä AUKKOJA-,
 * laattavirheita- ja uusittu-lukuja; kuvaero vaatii saman asettelun.
 *
 * KATKAISIJA: pallolaatat.js:n peiliPetti('laatat') katkaisee uudet
 * lataukset 20 s:ksi kolmen verkkovirheen jälkeen. Lopuksi odotetaan
 * 30 s, sitten niin kauan kuin katko on päällä tai näkyviä on kesken
 * (enintään 40 s lisää). Huom: pallon haku kaatuessaan kokeilee
 * varapolkua (Image, sama osoite) — arvottu katkaisu osuu vain
 * ensimmäiseen pyyntöön, joten aukot syntyvät lähinnä taustajaksosta.
 *
 * === TASOKARTTA (--lauta kartta) — js/laattapyramidi.js ============
 *
 * SVG-pyramidi (g.laattapyramidi image) elää vain tasokartalla. Portti
 * (VANHA_KARTTA_KAYTOSSA) avataan VAIN tämän savukkeen palvelimessa
 * kuten savuke-varilaatat. AUKKO = ruudulla oleva <image>, jolta puuttuu
 * href tai jolla on data-virhe, eikä se ole data-ladattu; 404-laatta
 * (ei ämpärissä) ei ole aukko. Versio: `function paikkaaLaatta`.
 *
 * === INJEKTIO (molemmat laudat) ====================================
 *
 * Ämpärin kuvat kulkevat Noden kautta. Laattaosoitteet
 * (…/z<n>/<x>/<y>.<muoto>, pallolla pyramidinLaattaUrl):
 *   1. Jokaisen eri laatan (osoite ilman ?r/?p) ENSIMMÄINEN pyyntö
 *      katkaistaan `route.abort('failed')` --osuus todennäköisyydellä;
 *      arpa on siemenen ja osoitteen tiiviste (järjestyksestä riippumaton).
 *   2. TAUSTAJAKSO keskellä: kamera uuteen kohtaan, document.hidden = true
 *      + visibilitychange, --tausta-ms ajan KAIKKI laattahaut poikki (myös
 *      matkalla olevat), sitten takaisin näkyväksi + visibilitychange.
 *
 * Laite: WebKit, iPad 834×1194 (DPR 2). Ajo ~3 min (pallo, vertailuajon kanssa).
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { extname, join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : oletus;
};
const JUURI = resolve(valitsin('juuri', process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..')));
const LAUTA = valitsin('lauta', 'pallo');
const SIEMEN = Number(valitsin('siemen', '1873'));
const OSUUS = Number(valitsin('osuus', '0.25'));
/*
 * KATKAISUJA PER ARVOTTU LAATTA (28.9.2026): pallon haku kokeilee kaatuessaan
 * varapolkua samalla osoitteella, joten pelkän ensimmäisen pyynnön katkaisu ei
 * pudota kerrosta kummassakaan versiossa (mitattu: ENNEN 0 aukkoa 5 %:lla).
 * Oletus 2 = haku JA varapolku katkeavat, kuten Safarin taustakatkossa;
 * kolmas pyyntö (JÄLKEEN-version uusinta) menee läpi.
 */
const KATKAISUJA = Number(valitsin('katkaisuja', '2'));
const TAUSTA_MS = Number(valitsin('tausta-ms', '8000'));
const KAIKKI_KERROKSET = argv.includes('--kaikki-kerrokset');
const LOPPUODOTUS_MS = LAUTA === 'pallo' ? 30000 : 12000;
const LISAODOTUS_KATTO_MS = 40000;
/** Keinotekoinen verkon viive laatoille: pitää hakuja matkalla, jotta taustajakso osuu kesken olevaan. */
const VIIVE_MS = Number(process.env.VIIVE_MS ?? 60);
const ULOS = valitsin('kuvat', process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/laattaaukot');
mkdirSync(ULOS, { recursive: true });
if (!['kartta', 'pallo'].includes(LAUTA)) { console.error('--lauta pallo|kartta'); process.exit(2); }
if (!existsSync(join(JUURI, 'js/pallolaatat.js'))) { console.error(`Ei checkoutia: ${JUURI}`); process.exit(2); }

/* Versio palveltavan checkoutin lähteestä. */
const lahde = (p) => readFileSync(join(JUURI, p), 'utf8');
const JALKEEN = LAUTA === 'pallo'
  ? lahde('js/pallolaatat.js').includes('laattavirheita')
  : lahde('js/laattapyramidi.js').includes('function paikkaaLaatta');
const VERSIO = JALKEEN ? 'jalkeen' : 'ennen';

const { Game } = await import(pathToFileURL(join(JUURI, 'js/game.js')).href);
const { packById } = await import(pathToFileURL(join(JUURI, 'js/pack.js')).href);
const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = pw.webkit ? pw : (pw.default ?? pw);

/* Tasokartan portti auki vain tämän savukkeen palvelimessa (ks. savuke-varilaatat). */
const PORTTI_AUKI = ['export const VANHA_KARTTA_KAYTOSSA = false;', 'export const VANHA_KARTTA_KAYTOSSA = true;'];
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.geojson': 'application/json', '.woff2': 'font/woff2', '.bin': 'application/octet-stream' };
const palvelin = http.createServer((req, res) => {
  const pyydetty = req.url.split('?')[0];
  const polku = join(JUURI, pyydetty === '/' ? 'index.html' : pyydetty);
  if (!polku.startsWith(JUURI) || !existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  if (LAUTA === 'kartta' && pyydetty === '/js/ui-apurit.js') {
    const teksti = readFileSync(polku, 'utf8');
    if (!teksti.includes(PORTTI_AUKI[0])) { console.error('VANHA_KARTTA_KAYTOSSA-vakiota ei löytynyt — tasokarttaa ei voi avata.'); process.exit(2); }
    res.end(teksti.replace(PORTTI_AUKI[0], PORTTI_AUKI[1]));
    return;
  }
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(Number(process.env.PORTTI) || 0, ok));
const KERROSLIPPU = LAUTA === 'pallo' && !KAIKKI_KERROKSET ? '&kerrokset=porras1' : '';
const osoite = `http://localhost:${palvelin.address().port}/?lauta=${LAUTA}${KERROSLIPPU}`;

/* Ämpäri Noden kautta; välimuisti osoitteittain (laatat ilman ?r/?p). */
const muisti = new Map();
const ampari = (url) => {
  if (!muisti.has(url)) muisti.set(url, fetch(url).then(async (v) => (v.ok ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') } : null)).catch(() => null));
  return muisti.get(url);
};
const LAATTA = /\/z\d+\/\d+\/\d+\.(webp|png|jpe?g|avif)(\?|$)/;
/** Laatan avain: osoite ilman uusinta- (r) ja paikkausparametria (p). */
const laatanAvain = (url) => {
  try {
    const u = new URL(url);
    u.searchParams.delete('r'); u.searchParams.delete('p');
    return u.toString();
  } catch { return url.replace(/[?&][rp]=\d+/g, ''); }
};
/** Siemenellinen arpa osoitteesta (FNV-1a), järjestyksestä riippumaton. */
const arpa = (avain) => {
  let h = (0x811c9dc5 ^ SIEMEN) >>> 0;
  for (let i = 0; i < avain.length; i += 1) { h ^= avain.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b) >>> 0; h ^= h >>> 13;
  return (h >>> 0) / 2 ** 32;
};
const nahdyt = new Map(); // laatan avain → pyyntökerrat
const laskurit = { laattapyyntoja: 0, arvottuKatkaisu: 0, taustaKatkaisu: 0, uusintaPyyntoja: 0, paikkausPyyntoja: 0 };
let tausta = false;

const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }], pack: packById('maailmankartta'), seed: 5 });
peli.phase = 'action'; peli.tokens.delete('marseille');
const tallenne = JSON.stringify(peli.toJSON());
const kaupungit = Object.fromEntries((packById('maailmankartta').cities ?? []).map((c) => [c.id, { x: c.x, y: c.y }]));

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const luku = (x) => (x == null ? '–' : String(x));

const selain = await paketti.webkit.launch();

/** Uusi iPad-sivu; `injektio` false = puhdas vertailuajo. */
async function avaaSivu(injektio) {
  const ctx = await selain.newContext({ viewport: { width: 834, height: 1194 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
  await ctx.addInitScript((d) => {
    localStorage.setItem('matkakirja-save-v1', d);
    localStorage.removeItem('matkakirja-lauta');
    /* Tasokartta: laatan alkuperäinen osoite talteen luonnissa (ENNEN-versio poistaa href:n virheessä). */
    new MutationObserver((muutokset) => {
      for (const m of muutokset) {
        for (const n of m.addedNodes) {
          if (n.localName === 'image' && n.classList?.contains('pyramidi-laatta') && !n.dataset.mittaOsoite) {
            n.dataset.mittaOsoite = n.getAttribute('href') ?? '';
          }
        }
      }
    }).observe(document, { childList: true, subtree: true });
    /* Taustalle ja takaisin: document.hidden + visibilitychange. */
    window.__taustalle = (piiloon) => {
      Object.defineProperty(document, 'hidden', { configurable: true, get: () => piiloon });
      Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => (piiloon ? 'hidden' : 'visible') });
      document.dispatchEvent(new Event('visibilitychange'));
    };
  }, tallenne);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message)));
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => {
    const url = r.request().url();
    if (LAATTA.test(url)) {
      const avain = laatanAvain(url);
      if (injektio) {
        laskurit.laattapyyntoja += 1;
        if (/[?&]r=\d+/.test(url)) laskurit.uusintaPyyntoja += 1;
        if (/[?&]p=\d+/.test(url)) laskurit.paikkausPyyntoja += 1;
        const kerta = (nahdyt.get(avain) ?? 0) + 1;
        nahdyt.set(avain, kerta);
        if (tausta) { laskurit.taustaKatkaisu += 1; r.abort('failed'); return; }
        if (kerta <= KATKAISUJA && arpa(avain) < OSUUS) {
          laskurit.arvottuKatkaisu += 1;
          void ampari(avain); // olemassaolo tiedetään mittausta varten
          r.abort('failed');
          return;
        }
      }
      const v = await ampari(avain);
      if (injektio && VIIVE_MS) await new Promise((ok) => setTimeout(ok, VIIVE_MS));
      // Matkalla ollut haku katkeaa, jos sivu meni sillä välin taustalle.
      if (injektio && tausta) { laskurit.taustaKatkaisu += 1; r.abort('failed').catch(() => {}); return; }
      if (!v) { r.fulfill({ status: 404, body: '' }).catch(() => {}); return; }
      r.fulfill({ status: 200, contentType: v.tyyppi ?? 'image/webp', body: v.body, headers: { 'access-control-allow-origin': '*' } }).catch(() => {});
      return;
    }
    const v = await ampari(url);
    if (!v) { r.abort().catch(() => {}); return; }
    r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }).catch(() => {});
  });
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 90000 });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => { setInterval(() => { const ui = window.matkakirja?.ui; const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi'); if (n) n.click(); }, 150); });
  await sivu.waitForTimeout(2000);
  return { ctx, sivu, virheet };
}

/* ── LIIKE: pelin omat kamerakomennot, Eurooppa ~70 s ─────────────── */
const REITTI = [
  ['marseille', 1400], ['pariisi', 700], ['pariisi', 300], ['lontoo', 300], ['lontoo', 120],
  ['amsterdam', 300], ['berliini', 700], ['berliini', 160], ['praha', 300],
  /* ← taustajakso tässä välissä (TAUSTA_KOHTA) */
  ['wien', 300], ['wien', 120], ['budapest', 400], ['rooma', 700], ['rooma', 160],
  ['barcelona', 400], ['madrid', 250], ['lissabon', 700], ['marseille', 1400], ['pariisi', 300],
];
const TAUSTA_KOHTA = 9;
/** Näkyvä leveys laudan yksikköinä → pallon korkeus (Eurooppa ≈ 1400 yksikköä ≈ 0,4). */
const PALLO_KORKEUS = (leveys) => Math.max(0.02, leveys / 3500);
const RAD = Math.PI / 180;
/* Laudan piste (Miller, leveys 12000, lon0 −175, pohjoinen 76; ks. savuke-varilaatat) → lat/lng. */
const lautaLatLng = ({ x, y }) => {
  const SKAALA = 12000 / (2 * Math.PI);
  const millerY = (lat) => -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RAD));
  const Y0 = millerY(76);
  const lng = ((x / SKAALA) / RAD) - 175;
  const my = y / SKAALA + Y0;
  const lat = (2.5 * Math.atan(Math.exp(-my / 1.25)) - (5 * Math.PI) / 8) / RAD;
  return { lat, lng: ((lng + 540) % 360) - 180 };
};
const liiku = async (sivu, kaupunki, leveys, kesto = 900) => {
  const k = kaupungit[kaupunki];
  if (!k) return;
  if (LAUTA === 'kartta') {
    await sivu.evaluate(async ({ x, y, leveys: l, kesto: t }) => {
      const ui = window.matkakirja.ui;
      await ui.kartta?.ajaKamera?.({ x, y, leveys: l }, { kesto: t, pakota: true });
      ui.taydennaTaide?.();
    }, { ...k, leveys, kesto });
  } else {
    await sivu.evaluate(({ pov, kesto: t }) => {
      window.matkakirja.ui.pallolauta?.heraa?.();
      window.matkakirja.ui.pallonInstanssi?.pointOfView(pov, t);
    }, { pov: { ...lautaLatLng(k), altitude: PALLO_KORKEUS(leveys) }, kesto });
    await sivu.waitForTimeout(kesto + 100);
  }
};

/** Pallon laattakerroksen mittarit + katkaisijan jäljellä oleva aika. */
const palloTila = (sivu) => sivu.evaluate(async () => {
  const m = window.matkakirja?.ui?.pallolauta?.lepokerros?.()?.mittarit?.() ?? null;
  let katko = 0;
  try { katko = (await import('/js/media.js')).peilinKatkoJaljella?.('laatat') ?? 0; } catch { /* vanha */ }
  if (!m) return { katko };
  return {
    katko, nakyvia: m.nakyvia, scenessa: m.nakyviaScenessa, taysin: m.nakyviaTaysin, jumissa: m.jumissa,
    jonossa: m.jonossa, ladattavia: m.ladattavia, katkaistu: m.katkaistu, taso: m.taso, tila: m.tila,
    laattavirheita: 'laattavirheita' in m ? m.laattavirheita : null, uusittu: 'uusittu' in m ? m.uusittu : null,
    onUusi: 'laattavirheita' in m, peitto: m.peittoOsuus,
  };
});
/** Odottaa, kunnes katko on ohi ja näkyvät ovat scenessä (tai katto täynnä). */
async function odotaAsettuminen(sivu, katto) {
  const alku = Date.now();
  let t = await palloTila(sivu);
  while (Date.now() - alku < katto) {
    const kesken = (t.nakyvia ?? 0) > (t.scenessa ?? 0) && ((t.jonossa ?? 0) > 0 || (t.ladattavia ?? 0) > 0);
    if (!(t.katko > 0) && !kesken) break;
    await sivu.waitForTimeout(1000);
    t = await palloTila(sivu);
  }
  return { tila: t, ms: Date.now() - alku };
}

/* ── PÄÄAJO (injektio) ─────────────────────────────────────────────── */
console.log(`INFO  versio ${VERSIO.toUpperCase()} (${JUURI}), lauta ${LAUTA}${KERROSLIPPU ? ' (vain laatat)' : ''}, WebKit iPad 834×1194, siemen ${SIEMEN}, osuus ${OSUUS}, tausta ${TAUSTA_MS} ms`);
const paa = await avaaSivu(true);
const { sivu } = paa;
if (LAUTA === 'kartta') {
  const valmis = await sivu.waitForFunction(() => {
    const ui = window.matkakirja?.ui;
    return Boolean(ui?.pyramidiKerros?.isConnected && typeof ui.kartta?.ajaKamera === 'function' && !ui.kartta.sijainen);
  }, null, { timeout: 60000 }).then(() => true).catch(() => false);
  vaadi('tasokartta heräsi (portti auki savukkeen palvelimessa)', valmis, 'ui.pyramidiKerros tai kartta.ajaKamera puuttuu');
} else {
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
}
await sivu.waitForTimeout(3000);

const alku = Date.now();
for (let i = 0; i < REITTI.length; i += 1) {
  if (i === TAUSTA_KOHTA) {
    // Uusi alue pyyntöön ja heti taustalle: matkalla olevat haut katkeavat.
    await liiku(sivu, 'wien', 700, 600);
    tausta = true;
    await sivu.evaluate(() => window.__taustalle(true));
    const t0 = Date.now();
    await sivu.waitForTimeout(TAUSTA_MS);
    tausta = false;
    await sivu.evaluate(() => window.__taustalle(false));
    console.log(`INFO  taustajakso ${Date.now() - t0} ms, katkaistuja tähän mennessä ${laskurit.taustaKatkaisu}`);
    await sivu.waitForTimeout(1500);
  }
  const [kaupunki, leveys] = REITTI[i];
  await liiku(sivu, kaupunki, leveys);
  await sivu.waitForTimeout(2800);
}
console.log(`INFO  liike ${Math.round((Date.now() - alku) / 1000)} s, odotetaan ${LOPPUODOTUS_MS / 1000} s`);
await sivu.waitForTimeout(LOPPUODOTUS_MS);

if (LAUTA === 'pallo') await mittaaPallo(); else await mittaaKartta();

await selain.close();
palvelin.close();
console.log(`${lapi}/${kaikki} OK`);
process.exit(lapi === kaikki ? 0 : 1);

/** Pelkkä pallon kangas näkyviin (kuvaeroa varten). */
async function vainPallo(s) {
  await s.evaluate(() => {
    const kankaat = [...document.querySelectorAll('canvas')];
    const pallo = kankaat.sort((a, b) => b.width * b.height - a.width * a.height)[0];
    document.body.style.visibility = 'hidden';
    if (pallo) pallo.style.visibility = 'visible';
  });
  await s.waitForTimeout(300);
}

/* ── MITTA: PALLO ──────────────────────────────────────────────────── */
async function mittaaPallo() {
  const { tila: t, ms } = await odotaAsettuminen(sivu, LISAODOTUS_KATTO_MS);
  const pov = await sivu.evaluate(() => window.matkakirja.ui.pallonInstanssi.pointOfView());
  const kuvaA = join(ULOS, `laattaaukot-${VERSIO}-pallo.png`);
  await sivu.screenshot({ path: kuvaA, timeout: 20000 }).catch(() => null);
  /*
   * KUVAERO VAIN PALLOSTA (28.9.2026): kertomuskortti oli vertailuajossa
   * eri tilassa (auki/kiinni) ja antoi ENNEN-ajoon 5 %:n väärän eron.
   * Vertailukuvat otetaan siksi pelkästä pallon kankaasta: kaikki muu
   * piiloon (visibility periytyy, kangas ottaa sen takaisin).
   */
  const kuvaAPallo = join(ULOS, `laattaaukot-${VERSIO}-pallo-kangas.png`);
  await vainPallo(sivu);
  const pngA = await sivu.screenshot({ path: kuvaAPallo, timeout: 20000 }).catch(() => null);
  const aukkoja = Math.max(0, (t.nakyvia ?? 0) - (t.scenessa ?? 0));
  console.log(`AUKKOJA ${aukkoja} / näkyviä ${luku(t.nakyvia)}, laattavirheita ${luku(t.laattavirheita)}, uusittu ${luku(t.uusittu)}`);
  console.log(`INFO  lisäodotus ${ms} ms; taso ${t.taso}, scenessä ${t.scenessa}, täysin ${t.taysin}, jumissa ${t.jumissa}, jonossa ${t.jonossa}, katkaisija ${t.katkaistu ? 'AUKI' : 'kiinni'} (katkoa jäljellä ${t.katko} ms), peitto ${luku(t.peitto)}`);
  console.log(`INFO  verkko: laattapyyntöjä ${laskurit.laattapyyntoja}, arvottuja katkaisuja ${laskurit.arvottuKatkaisu}, taustakatkaisuja ${laskurit.taustaKatkaisu}`);
  if (pngA) console.log(`INFO  kuva ${kuvaA}`);
  if (paa.virheet.length) console.log(`INFO  sivuvirheitä ${paa.virheet.length}: ${paa.virheet.slice(0, 3).join(' | ')}`);

  /* KUVAERO: puhdas vertailusivu samaan asentoon. */
  const vert = await avaaSivu(false);
  await vert.sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  await vert.sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
  await vert.sivu.waitForTimeout(2000);
  await vert.sivu.evaluate((p) => { window.matkakirja.ui.pallolauta?.heraa?.(); window.matkakirja.ui.pallonInstanssi.pointOfView(p, 0); }, pov);
  await vert.sivu.waitForTimeout(8000);
  const v = await odotaAsettuminen(vert.sivu, LISAODOTUS_KATTO_MS);
  const kuvaB = join(ULOS, `laattaaukot-${VERSIO}-pallo-vertailu.png`);
  await vainPallo(vert.sivu);
  const pngB = await vert.sivu.screenshot({ path: kuvaB, timeout: 20000 }).catch(() => null);
  let ero = null;
  if (pngA && pngB) {
    ero = await vert.sivu.evaluate(async ({ a, b }) => {
      const lue = async (s) => { const i = new Image(); i.src = `data:image/png;base64,${s}`; await i.decode(); const c = document.createElement('canvas'); c.width = i.width; c.height = i.height; const g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(i, 0, 0); return g.getImageData(0, 0, i.width, i.height); };
      const A = await lue(a); const B = await lue(b);
      if (A.width !== B.width || A.height !== B.height) return null;
      const L = 16; const w = A.width; const h = A.height;
      const tausta = [B.data[8], B.data[9], B.data[10]]; // vertailukuvan kulma = avaruus/tausta
      let pallolla = 0; let poikkeavia = 0;
      for (let by = 0; by + L <= h; by += L) {
        for (let bx = 0; bx + L <= w; bx += L) {
          let summa = 0; let taustaa = 0;
          for (let y = by; y < by + L; y += 1) {
            for (let x = bx; x < bx + L; x += 1) {
              const i = (y * w + x) * 4;
              summa += Math.abs(A.data[i] - B.data[i]) + Math.abs(A.data[i + 1] - B.data[i + 1]) + Math.abs(A.data[i + 2] - B.data[i + 2]);
              if (Math.abs(B.data[i] - tausta[0]) + Math.abs(B.data[i + 1] - tausta[1]) + Math.abs(B.data[i + 2] - tausta[2]) < 12) taustaa += 1;
            }
          }
          if (taustaa > (L * L) / 2) continue;
          pallolla += 1;
          if (summa / (L * L * 3) > 24) poikkeavia += 1;
        }
      }
      return { pallolla, poikkeavia, osuus: pallolla ? poikkeavia / pallolla : 0 };
    }, { a: pngA.toString('base64'), b: pngB.toString('base64') });
  }
  if (ero) {
    console.log(`KUVAERO ${ero.poikkeavia} / ${ero.pallolla} lohkoa (${(ero.osuus * 100).toFixed(2)} % pallon alasta) vs. puhdas vertailuajo (taso ${luku(v.tila.taso)} vs. ${luku(t.taso)})`);
  } else {
    console.log('INFO  kuvaeroa ei saatu (kuvakaappaus puuttuu tai koko eri)');
  }
  if (pngB) console.log(`INFO  vertailukuva ${kuvaB}`);
  await vert.ctx.close();

  /* Mittauksen oma kunto: koskee molempia versioita. */
  vaadi('injektio osui: arvottuja katkaisuja > 0', laskurit.arvottuKatkaisu > 0, `laattapyyntöjä ${laskurit.laattapyyntoja}`);
  vaadi('taustajakso katkaisi laattapyyntöjä', laskurit.taustaKatkaisu > 0, 'yhtään laattaa ei ollut matkalla taustajakson aikana');
  vaadi('pallon laattakerros mitattiin (näkyviä > 0)', (t.nakyvia ?? 0) > 0, 'lepokerros().mittarit() puuttuu tai näkyviä 0');
  vaadi('versiotunnistus: lähde ja mittariolio samaa mieltä', t.onUusi == null || t.onUusi === JALKEEN, `lähde ${VERSIO}, laattavirheita-kenttä ${t.onUusi}`);
  if (JALKEEN) {
    vaadi('JÄLKEEN: AUKKOJA 0 (näkyvät laatat scenessä)', aukkoja === 0, `${aukkoja} / ${t.nakyvia} näkyvää ei scenessä, laattavirheita ${t.laattavirheita}, uusittu ${t.uusittu}`);
  } else {
    console.log(`INFO  ENNEN: aukkoja ${aukkoja}, kuvaero ${ero ? `${(ero.osuus * 100).toFixed(2)} %` : '–'} (ei vaatimusta)`);
  }
}

/* ── MITTA: TASOKARTTA ─────────────────────────────────────────────── */
async function mittaaKartta() {
  const tulos = await sivu.evaluate(async () => {
    const w = window.innerWidth; const h = window.innerHeight;
    const piilossa = (e) => {
      for (let n = e; n && n.nodeType === 1; n = n.parentNode) {
        const s = getComputedStyle(n);
        if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) === 0) return true;
        if (n.classList?.contains('laattapyramidi')) break;
      }
      return false;
    };
    const laatat = [];
    for (const kuva of document.querySelectorAll('g.laattapyramidi image')) {
      const r = kuva.getBoundingClientRect();
      if (!(r.width > 0 && r.height > 0 && r.right > 0 && r.bottom > 0 && r.left < w && r.top < h)) continue;
      if (kuva.dataset.peruttu === '1' || piilossa(kuva)) continue;
      const kerros = [...(kuva.parentNode?.classList ?? [])].find((c) => c.startsWith('pyramidi-')) ?? '?';
      const href = kuva.getAttribute('href') ?? kuva.getAttribute('xlink:href');
      const ehdokas = (!href || Boolean(kuva.dataset.virhe)) && kuva.dataset.ladattu !== '1';
      laatat.push({ kerros, taso: kuva.dataset.taso, ehdokas, osoite: kuva.dataset.mittaOsoite || null, virhe: Boolean(kuva.dataset.virhe) });
      if (ehdokas) kuva.dataset.mittaEhdokas = '1';
    }
    let m = globalThis.__pyramidinMittarit?.() ?? null;
    if (!m) { try { m = (await import('/js/laattapyramidi.js')).pyramidinMittarit(); } catch { m = null; } }
    return {
      laatat,
      mittarit: m ? { epaonnistui: m.epaonnistui ?? null, uusittu: 'uusittu' in m ? m.uusittu : null, paikattu: 'paikattu' in m ? m.paikattu : null, onUusittu: 'uusittu' in m } : null,
    };
  });
  /* 404-laatta ei ole aukko: olemassaolo ämpäristä. */
  let aukkoja = 0; let puuttuvia = 0; let tuntemattomia = 0;
  const aukot = [];
  for (const l of tulos.laatat.filter((x) => x.ehdokas)) {
    if (!l.osoite) { tuntemattomia += 1; aukkoja += 1; aukot.push(l); continue; }
    if (await ampari(laatanAvain(l.osoite))) { aukkoja += 1; aukot.push(l); } else puuttuvia += 1;
  }
  /* Aukot punaisella kehyksellä kuvaan. */
  await sivu.evaluate((osoitteet) => {
    const joukko = new Set(osoitteet);
    for (const kuva of document.querySelectorAll('g.laattapyramidi image[data-mitta-ehdokas="1"]')) {
      if (kuva.dataset.mittaOsoite && !joukko.has(kuva.dataset.mittaOsoite)) continue;
      const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      for (const a of ['x', 'y', 'width', 'height']) r.setAttribute(a, kuva.getAttribute(a));
      r.setAttribute('fill', 'rgba(255,0,0,0.15)'); r.setAttribute('stroke', '#e00'); r.setAttribute('stroke-width', '3');
      r.setAttribute('vector-effect', 'non-scaling-stroke');
      kuva.parentNode.appendChild(r);
    }
  }, aukot.map((a) => a.osoite).filter(Boolean));
  const kuva = join(ULOS, `laattaaukot-${VERSIO}-kartta.png`);
  await sivu.screenshot({ path: kuva, timeout: 20000 }).then(() => console.log(`INFO  kuva ${kuva}`)).catch((e) => console.log(`INFO  kuvakaappaus epäonnistui: ${e.message.split('\n')[0]}`));

  const m = tulos.mittarit ?? {};
  const laattoja = tulos.laatat.length;
  console.log(`AUKKOJA ${aukkoja} / laattoja ${laattoja}, epaonnistui ${luku(m.epaonnistui)}, uusittu ${luku(m.uusittu)}, paikattu ${luku(m.paikattu)}`);
  const kerroksittain = {};
  for (const l of tulos.laatat) { const k = (kerroksittain[l.kerros] ??= { laattoja: 0, aukkoja: 0 }); k.laattoja += 1; }
  for (const a of aukot) kerroksittain[a.kerros].aukkoja += 1;
  console.log(`INFO  kerroksittain ${JSON.stringify(kerroksittain)}; 404-puuttuvia ${puuttuvia}, osoitteettomia aukkoja ${tuntemattomia}`);
  console.log(`INFO  verkko: laattapyyntöjä ${laskurit.laattapyyntoja}, arvottuja katkaisuja ${laskurit.arvottuKatkaisu}, taustakatkaisuja ${laskurit.taustaKatkaisu}, ?r-uusintoja ${laskurit.uusintaPyyntoja}, ?p-paikkauksia ${laskurit.paikkausPyyntoja}`);
  if (paa.virheet.length) console.log(`INFO  sivuvirheitä ${paa.virheet.length}: ${paa.virheet.slice(0, 3).join(' | ')}`);

  vaadi('injektio osui: arvottuja katkaisuja > 0', laskurit.arvottuKatkaisu > 0, `laattapyyntöjä ${laskurit.laattapyyntoja}`);
  vaadi('taustajakso katkaisi laattapyyntöjä', laskurit.taustaKatkaisu > 0, 'yhtään laattaa ei ollut matkalla taustajakson aikana');
  vaadi('ruudulla on pyramidilaattoja (mittaus ei ole tyhjä)', laattoja > 0, 'g.laattapyramidi image ruudulla 0');
  vaadi('versiotunnistus: lähde ja mittariolio samaa mieltä', !tulos.mittarit || m.onUusittu === JALKEEN, `lähde ${VERSIO}, uusittu-kenttä ${m.onUusittu}`);
  if (JALKEEN) vaadi('JÄLKEEN: AUKKOJA 0', aukkoja === 0, `${aukkoja} aukkoa ${laattoja} laatasta`);
  else console.log(`INFO  ENNEN: aukkoja ${aukkoja} (ei vaatimusta)`);
}
