/*
 * Savuke: EI KAISTOJA LAAJALLA RUUDULLA — tasoituskerroksen reunat
 * (karttauudistus, erä 1c:n jälkipuinti; rootin live-QA 13.9.2026).
 *
 *   PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers NODE_USE_ENV_PROXY=1 \
 *     node tools/savukkeet/savuke-kaistat-levea.mjs
 *          [--ruutu 2560x1352] [--ilman-korjausta] [--kuvat <kansio>]
 *
 * === MITÄ TÄMÄ VARTIOI =============================================
 *
 * Rootin havainto julkaistusta v1856:sta (Chrome, 2560 × 1352,
 * Marseille → Pariisi): kartalla on useita valtavia suoria
 * TERÄVÄREUNAISIA vaaleita kaistoja Atlantilla, Keski-Euroopassa ja
 * idässä. Ne liikkuvat pannun mukana, eli ne ovat kartan pinnassa.
 *
 * MITATTU JUURISYY on tasoituslaataston RAJA, kahdessa kohdassa:
 *
 *   1. LAATTARUUDUKON REUNA. Laatasto ajetaan vain kohdemaan laatikon
 *      alalle, mutta laatasto kattaa KOKONAISIA laattoja: z4:llä laatta
 *      on 569 lautayksikköä eli 17° pituuspiiriä. Ranskan laatikon
 *      (lon −10,25…14,67) ympärille jää siis täyden kerman marginaali
 *      lon −21,40…29,80 asti, ja siitä ulos kerma loppuu kesken.
 *   2. FEIDAUKSEN HÄIVE. Häive pyyhkii kerman nollaan laatikon
 *      REUNALLA ja nostaa sen täyteen vasta sisempänä, mutta laatikon
 *      ulkopuolella kerma on taas täysi (mitattu laatasta z4/9/4:
 *      alfa 217 → 20 → 217).
 *
 * Kumpikin on SUORA VIIVA kartalla, ja molemmat näkyvät vain
 * ruudulla, joka on laatikkoa leveämpi — puhelimella (390 × 844) ja
 * 1920 × 1080:lla laatikko täyttää ruudun, 2560 × 1352:lla ei.
 *
 * VÄITTEET (jokainen on kahden pisteen ero rajan yli, mediaani 7 × 7
 * ruudusta; pisteet ovat avomerellä, jotta maaston oma vaihtelu ei
 * sekoitu mittaukseen):
 *
 *   V0  Tasoituskerros on päällä: variMaa FRA, varillisia > 0,
 *       mittarien `syy` tyhjä.
 *   V1  Läntinen LAATTARUUDUKON reuna (lon −21,40) ei ole nähtävissä.
 *   V2  Itäinen laattaruudukon reuna (lon 29,80) ei ole nähtävissä.
 *   V3  Läntinen LAATIKON reuna (lon −10,25) ei ole nähtävissä.
 *   V4  Itäinen laatikon reuna (lon 14,67) ei ole nähtävissä.
 *   V5  Ranska on yhä kartalla omana itsenään: Keski-Ranskan
 *       reliefikontrasti (9 × 9 keskihajonta) on selvästi suurempi
 *       kuin naapurin tasoitetun alan — eli maalaus EI ole levinnyt
 *       kohdemaahan.
 *
 * === VASTAKOE ON PAKOLLINEN ========================================
 *
 * `--ilman-korjausta` tarjoilee js/pallolaatat.js:n niin, että
 * asiakkaan kerma-maalaus on poissa (tasoitus = null) — peli
 * sellaisena kuin se oli v1856:ssa. Silloin V1…V4 ON KAADUTTAVA.
 * Koodissa ei ole testilippua: vastakoe tehdään tarjoilussa, jolloin
 * savuke mittaa tuotantokoodia eikä omaa haaraansa.
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
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
const ILMAN_KORJAUSTA = argv.includes('--ilman-korjausta');
const KUVAT = valitsin('kuvat', '');
const RUUTU = (() => {
  const [w, h] = String(valitsin('ruutu', '2560x1352')).toLowerCase().split('x').map(Number);
  if (!(w > 0) || !(h > 0)) { console.error('--ruutu <leveys>x<korkeus>'); process.exit(2); }
  return { w, h };
})();

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/*
 * VASTAKOE TARJOILUSSA. Tuotantokoodissa ei ole lippua, jolla korjauksen
 * voisi kytkeä pois — se olisi testihaara pelin sisällä. Sen sijaan
 * savuke tarjoilee moduulin, jossa maalaus on korvattu nullilla, eli
 * täsmälleen sillä rivillä, jonka tämä erä lisäsi.
 */
const KORJAUS_RIVI = 'const tasoitus = kerrokset.vari ? pyramidinTasoitus() : null;';
const rikoKorjaus = (teksti) => {
  if (!teksti.includes(KORJAUS_RIVI)) {
    console.error('Vastakoe ei löydä korjausriviä js/pallolaatat.js:stä — onko se nimetty uudelleen?');
    process.exit(2);
  }
  return teksti.replace(KORJAUS_RIVI, 'const tasoitus = null;');
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
  const tyyppi = TYYPIT[extname(polku)] ?? 'application/octet-stream';
  if (ILMAN_KORJAUSTA && reitti === '/js/pallolaatat.js') {
    res.writeHead(200, { 'content-type': tyyppi });
    res.end(rikoKorjaus(readFileSync(polku, 'utf8')));
    return;
  }
  res.writeHead(200, { 'content-type': tyyppi });
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
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' })).catch(() => null);
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
 * RAJAT LUETAAN LUETTELOSTA EIKÄ KIRJOITETA SAVUKKEESEEN. Laatikon
 * reunat ovat `varitasot.FRA.alue`, ja laattaruudukon reunat lasketaan
 * laataston bittikartasta: uloin olemassa oleva sarake kertoo, mihin
 * kerma ulottuu. Näin savuke mittaa sitä laatastoa, joka ämpärissä on.
 */
const luettelo = await ampariHaku(`${AMPARI}julisteet/pyramidi/pyramidi.json`);
if (luettelo?.status !== 200) {
  console.log('OHITUS: pyramidin luetteloa ei saatu ämpäristä.');
  palvelin.close();
  process.exit(0);
}
const PYRAMIDI = JSON.parse(luettelo.body.toString('utf8'));
const VT = PYRAMIDI.varitasot?.FRA ?? null;
if (!VT?.tasoitus || !VT.alue) {
  console.log('OHITUS: ämpärissä ei ole Ranskan tasoituslaatastoa (vanha luettelo).');
  palvelin.close();
  process.exit(0);
}
/** Laataston uloimmat sarakkeet tasolla z → pituuspiirit asteina. */
function ruudukonReunat(z) {
  const taso = PYRAMIDI.tasot.find((t) => t.z === z);
  const b64 = VT.laatastot?.[z];
  if (!taso || !b64) return null;
  const bitit = Buffer.from(b64, 'base64');
  let s0 = Infinity;
  let s1 = -Infinity;
  for (let r = 0; r < taso.riveja; r += 1) {
    for (let s = 0; s < taso.sarakkeita; s += 1) {
      const i = r * taso.sarakkeita + s;
      const t = bitit[i >> 3];
      if (t === undefined || !((t >> (i & 7)) & 1)) continue;
      if (s < s0) s0 = s;
      if (s > s1) s1 = s;
    }
  }
  if (!(s1 >= s0)) return null;
  const { arkki, projektio, laatta } = PYRAMIDI;
  const lon = (px) => ((px / taso.pikseliaPerYksikko + arkki.x) / projektio.leveys) * 360 + projektio.lon0;
  return { lansi: lon(s0 * laatta), ita: lon((s1 + 1) * laatta) };
}
const RUUDUKKO = ruudukonReunat(4);
if (!RUUDUKKO) {
  console.log('OHITUS: laataston bittikarttaa ei voitu lukea.');
  palvelin.close();
  process.exit(0);
}
tieto('laataston reunat', `ruudukko z4 lon ${RUUDUKKO.lansi.toFixed(2)}…${RUUDUKKO.ita.toFixed(2)}`
  + ` · laatikko lon ${VT.alue.lon0.toFixed(2)}…${VT.alue.lon1.toFixed(2)}`
  + ` · peitto ${VT.peitto} · kerma ${VT.kerma} · häive ${VT.feidausReuna}`);

/*
 * MITTAUSPARIT. Jokainen on RAJA ja se latitudi, jolla raja on
 * avomerellä — maaston oma vaihtelu ei saa sekoittua mittaukseen.
 * `vali` on etäisyys rajasta asteina: tarpeeksi kauas, jotta laatan
 * oma pehmennetty reuna ei osu kumpaankaan pisteeseen.
 */
const RAJAT = [
  {
    avain: 'ruudukko-lansi', vaite: 'V1', lon: RUUDUKKO.lansi, lat: 44.0, vali: 1.6,
    seloste: 'laattaruudukon läntinen reuna, Atlantti',
  },
  {
    avain: 'ruudukko-ita', vaite: 'V2', lon: RUUDUKKO.ita, lat: 43.0, vali: 1.6,
    seloste: 'laattaruudukon itäinen reuna, Mustameri',
  },
  {
    avain: 'laatikko-lansi', vaite: 'V3', lon: VT.alue.lon0, lat: 44.5, vali: 1.2,
    seloste: 'laataston laatikon läntinen reuna, Biskaja',
  },
  {
    avain: 'laatikko-ita', vaite: 'V4', lon: VT.alue.lon1, lat: 43.4, vali: 1.2,
    seloste: 'laataston laatikon itäinen reuna, Adrianmeri',
  },
];
/** V5: kohdemaa vs. naapuri — maalaus ei saa levitä Ranskaan. */
const KONTRASTI = [
  { avain: 'ranska', lon: 2.6, lat: 45.6, seloste: 'Keski-Ranska (alkuperäinen reliefi)' },
  { avain: 'naapuri', lon: 5.3, lat: 50.05, seloste: 'Belgia, Ardennit (tasoitettu)' },
];

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--disable-dev-shm-usage'],
});
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());
const ctx = await selain.newContext({
  viewport: { width: RUUTU.w, height: RUUTU.h },
  deviceScaleFactor: 1,
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
  const vastaus = await ampariHaku(route.request().url());
  if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
  route.fulfill({
    status: 200,
    contentType: vastaus.tyyppi ?? 'application/octet-stream',
    body: vastaus.body,
    headers: { 'access-control-allow-origin': '*' },
  });
});

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
await sivu.evaluate(() => {
  const g = window.matkakirja.game;
  if (g.phase === 'pickstart') g.actionPickStart('lontoo', 0);
  g.player.pos = { type: 'city', city: 'pariisi' };
  g.visitCity(g.player);
  window.matkakirja.ui.render();
});
await sivu.waitForTimeout(4000);
await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu({ kesto: 0 }));
await sivu.waitForTimeout(3000);

const mittarit = () => sivu.evaluate(() => {
  const m = window.matkakirja.ui.pallolauta.lepokerros()?.mittarit?.() ?? null;
  return m ? {
    tila: m.tila, taso: m.taso, syy: m.syy, laattoja: m.laattoja, valmiita: m.valmiita,
    jumissa: m.jumissa, hapyvia: m.hapyvia, varillisia: m.varillisia, variMaa: m.variMaa,
  } : null;
});
async function odotaLepo(kierroksia = 14) {
  for (let i = 0; i < kierroksia; i += 1) {
    await sivu.evaluate(() => window.matkakirja.ui.pallolauta.lepokerros()?.kokoa?.()); // eslint-disable-line no-await-in-loop
    await sivu.waitForTimeout(1400); // eslint-disable-line no-await-in-loop
    const m = await mittarit(); // eslint-disable-line no-await-in-loop
    if (m && m.jumissa === 0 && m.valmiita > 0 && m.valmiita >= m.laattoja && m.hapyvia === 0) return m;
  }
  return mittarit();
}
const m = await odotaLepo();
tieto('lepokerros', JSON.stringify(m));
vaadi('V0 tasoituskerros on päällä (FRA)', Boolean(m && m.variMaa === 'FRA' && m.varillisia > 0 && !m.syy),
  `variMaa ${m?.variMaa} · varillisia ${m?.varillisia} · syy "${m?.syy}"`);

/*
 * KAIKKI PALLON KANKAAN ULKOPUOLINEN PIILOON MITTAUKSEN AJAKSI.
 * Sääntö on käänteinen nimettyyn listaan: saapumiskortteja on monta
 * lajia ja uusia tulee, ja yksikin niistä mittauspisteen päällä
 * tekisi väitteestä valheen (erän 1 ansa 1).
 */
const piilotettuja = await sivu.evaluate(() => {
  const kangas = document.querySelector('.pallolauta canvas') ?? document.querySelector('canvas');
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
await sivu.waitForTimeout(700);

const cdp = await ctx.newCDPSession(sivu);
const png = Buffer.from((await cdp.send('Page.captureScreenshot', { format: 'png' })).data, 'base64');
if (KUVAT) {
  mkdirSync(KUVAT, { recursive: true });
  const nimi = `kaistat-${RUUTU.w}-${ILMAN_KORJAUSTA ? 'ennen' : 'jalkeen'}.png`;
  writeFileSync(join(KUVAT, nimi), png);
  tieto('kuva', join(KUVAT, nimi));
}

/*
 * MITTAUS TAPAHTUU SIVULLA. Pisteen ruutupaikka tulee Globe.gl:n omalta
 * `getScreenCoords`ilta — oma kaava olisi toinen totuus projektiosta —
 * ja kankaan siirtymä lisätään, koska kuvakaappaus on RUUDUN
 * koordinaatistossa (erän 1c löydös 7.3).
 */
const mittaus = await sivu.evaluate(async ({ pngB64, rajat, kontrasti }) => {
  const img = new Image();
  img.src = `data:image/png;base64,${pngB64}`;
  await img.decode();
  const c = document.createElement('canvas');
  c.width = img.width;
  c.height = img.height;
  const g = c.getContext('2d', { willReadFrequently: true });
  g.drawImage(img, 0, 0);
  const pallo = window.matkakirja.ui.pallolauta.pallo;
  const kangas = document.querySelector('.pallolauta canvas') ?? document.querySelector('canvas');
  const kehys = kangas.getBoundingClientRect();
  const dpr = img.width / window.innerWidth;
  const luminanssi = (d, i) => 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
  const ruutu = (lat, lon, sade) => {
    const s = pallo.getScreenCoords(lat, lon, 0);
    if (!s || !Number.isFinite(s.x)) return null;
    const x = Math.round((s.x + kehys.left) * dpr);
    const y = Math.round((s.y + kehys.top) * dpr);
    if (x < sade + 2 || y < sade + 2 || x >= img.width - sade - 2 || y >= img.height - sade - 2) return null;
    const d = g.getImageData(x - sade, y - sade, sade * 2 + 1, sade * 2 + 1).data;
    const arvot = [];
    for (let i = 0; i < d.length; i += 4) arvot.push(luminanssi(d, i));
    arvot.sort((a, b) => a - b);
    const ka = arvot.reduce((a, b) => a + b, 0) / arvot.length;
    const hajonta = Math.sqrt(arvot.reduce((a, b) => a + (b - ka) ** 2, 0) / arvot.length);
    return { x, y, L: arvot[(arvot.length - 1) >> 1], sigma: hajonta };
  };
  const tulos = { rajat: [], kontrasti: [] };
  for (const r of rajat) {
    const a = ruutu(r.lat, r.lon - r.vali, 3);
    const b = ruutu(r.lat, r.lon + r.vali, 3);
    tulos.rajat.push({
      ...r, a, b, ero: a && b ? Math.abs(a.L - b.L) : null,
    });
  }
  for (const k of kontrasti) tulos.kontrasti.push({ ...k, piste: ruutu(k.lat, k.lon, 4) });
  return tulos;
}, { pngB64: png.toString('base64'), rajat: RAJAT, kontrasti: KONTRASTI });

/*
 * KYNNYS 8 LUMINANSSIYKSIKKÖÄ. Mitattu vika on 36–45 yksikköä ja
 * korjattu kartta 0–3; kynnys on niiden välissä niin, ettei paperin
 * rae tai laatan pehmennetty reuna laukaise sitä.
 */
const KYNNYS = 8;
let mitattuja = 0;
for (const r of mittaus.rajat) {
  if (r.ero === null) { tieto(`${r.vaite} ${r.avain}`, `piste ei ruudulla (${r.seloste}) — ei mitattu`); continue; }
  mitattuja += 1;
  tieto(`${r.vaite} ${r.avain}`, `${r.seloste}: L ${Math.round(r.a.L)} → ${Math.round(r.b.L)} · ero ${r.ero.toFixed(1)}`);
  vaadi(`${r.vaite} ei porrasta rajalla ${r.avain}`, r.ero < KYNNYS,
    `luminanssiero ${r.ero.toFixed(1)} ≥ ${KYNNYS} — terävä reuna lon ${r.lon.toFixed(2)}:n kohdalla`);
}
vaadi('rajoja mitattiin vähintään neljä', mitattuja >= 4,
  `mitattiin ${mitattuja} — ruutu ${RUUTU.w}×${RUUTU.h} ei näytä kaikkia rajoja, väitteet olisivat tyhjiä`);

const ranska = mittaus.kontrasti.find((k) => k.avain === 'ranska')?.piste ?? null;
const naapuri = mittaus.kontrasti.find((k) => k.avain === 'naapuri')?.piste ?? null;
tieto('V5 reliefikontrasti', `Ranska σ ${ranska?.sigma?.toFixed(2)} · naapuri σ ${naapuri?.sigma?.toFixed(2)}`);
vaadi('V5 kohdemaa ei ole tasoittunut', Boolean(ranska && naapuri && ranska.sigma > naapuri.sigma + 0.5),
  `Ranskan σ ${ranska?.sigma?.toFixed(2)} ei ole naapurin σ ${naapuri?.sigma?.toFixed(2)} suurempi`);

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' · '));

console.log(`\n${lapi}/${kaikki} väitettä läpi${ILMAN_KORJAUSTA ? ' (VASTAKOE: V1…V4 pitää kaatua)' : ''}`);
await ctx.close();
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
