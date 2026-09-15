/*
 * SELAINSAVUKE: IHMISEN MATKA — RINTAMA EI VÄLKY, MUSTA ALKU ON MUSTA.
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-ihmisen-rintama.mjs
 *
 * OMISTAJA 15.9.2026 klo 12.00 (työpöytäkuva 248 000 v. sitten,
 * sanatarkasti: *"Kun ihmisjana etenee, niin sen etuosa, joka on
 * puolipallon muotoinen, välkkyy koko ajan. Ja toinen juttu, kun linssi
 * alkaa täydestä mustuudesta, niin myös yläosa saisi olla kokonaan
 * poissa. Nyt sinne näkyy pieni viiva yläpalkin alaosasta sekä
 * hampurilaisen nuoli alaspäin."*)
 *
 * MIKSI OMA SAVUKE. savuke-ihmisen-esitys.mjs ajaa koko kertomuksen
 * (kontissa 10–20 min) ja katsoo, ETENEEKÖ esitys. Tässä katsotaan
 * kahta vikaa, joita se ei näe: piirtyykö musta alku KOKONAAN mustana
 * ja heiluuko rintaman kärjen väri kehyksestä toiseen. Kumpikin
 * mitataan ja kumpaankin ajetaan VASTAKOE, joka palauttaa vian.
 *
 * VÄITTEET:
 *   1. MUSTA ALKU ON MUSTA. Käynnistä-napin jälkeen, kun peite on vielä
 *      läpinäkymätön (esitys.tila().mustaPaalla), linssin yläreunan
 *      nauha on mustaa koko leveydeltä (kirkkaus < 8) — ei yläpalkin
 *      alareunan viivaa eikä hampurilaisen nuolta. Lippu
 *      esitys.tila().palkkiPiilossa on tosi.
 *   1b. VASTAKOE: kun luokka `esitys-musta` otetaan pois, sama nauha saa
 *      kirkkaita pikseleitä (viiva + nuoli palaavat).
 *   2. RINTAMA EI VÄLKY. Kasvavan kärjen VÄRIPAINO luetaan kehys
 *      kehykseltä suoraan elävän varjostimen uniformeista ja saman
 *      verkon instanssipuskurista (sama float32-laskenta kuin GPU:lla).
 *      Uudella säännöllä (KAISTAN_PITO_VARA) paino pysyy ykkösessä eikä
 *      vuorottele; varjostimen lähteessä on vara mukana.
 *   2b. VASTAKOE: samoista mitatuista kehyksistä lasketaan VANHA sääntö
 *      (`uNyt > aika` ilman varaa) — sen merkki heilahtaa, eli välkyntä
 *      palaa heti kun vara poistetaan.
 *   3. Ei sivuvirheitä.
 *
 * KUVAKAAPPAUKSET (KAAPPAUKSET-kansio): savuke-ihmisen-rintama-musta.png
 * ja savuke-ihmisen-rintama-vastakoe.png.
 */
import { createServer } from 'node:http';
import { inflateSync } from 'node:zlib';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const JUURI = join(import.meta.dirname, '..', '..');
const PORTTI = 8752;
const ULOS = process.env.KAAPPAUKSET ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

/** Näkymä: sama arviointimitta kuin esityssavukkeella. */
const NAKYMA = { viewport: { width: 834, height: 1100 }, deviceScaleFactor: 1 };

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

const paketti = await import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
  args: ['--autoplay-policy=no-user-gesture-required'],
});

const virheet = [];
const konteksti = await selain.newContext({ ...NAKYMA, serviceWorkers: 'block' });
const s = await konteksti.newPage();
s.on('pageerror', (e) => virheet.push(String(e)));
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

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

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
  let maks = 0; let kirkkaita = 0;
  for (let p = 0; p < ulos.length; p += kanavia) {
    const v = Math.max(ulos[p], ulos[p + 1], ulos[p + 2]);
    if (v > maks) maks = v;
    if (v >= 8) kirkkaita += 1;
  }
  return { maks, kirkkaita, pikseleita: leveys * korkeus, leveys, korkeus };
}
const kirkkaudet = (puskuri) => pngKirkkaudet(puskuri);

/* ---------------------------------------------------------- peli auki */

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
vaadi('linssi laukusta: vanat valmiina', pallo && lahto.ok && lahto.vanoja >= 15, JSON.stringify(lahto));

/* ================= 1. MUSTA ALKU ON KOKONAAN MUSTA ================= */

await s.evaluate(() => document.querySelector('.aikajana-avaus-nappi')?.click());
await s.waitForTimeout(1500);
/*
 * ESITYS TAUOLLE MITTAUKSEN AJAKSI. Kontissa yksi kuvakaappaus kestää
 * sekunteja, ja ilman taukoa musta ehtisi nousta kaappausten välissä —
 * vastakoe mittaisi jo valaistua karttaa.
 */
await s.evaluate(() => window.matkakirja.ui.aikajana.esitys.tauko());
await s.waitForTimeout(400);

/**
 * Linssin juuren yläreunan nauha: koko leveys palkin korkeudelta.
 * Kaksi pikseliä sisään, jotta karttaruudun oma pyöristetty reunaviiva
 * (ei linssin kerros) ei tule mittaan.
 */
const nauhanRajaus = await s.evaluate(() => {
  const r = document.querySelector('.aikajana').getBoundingClientRect();
  return {
    x: Math.ceil(r.x + 3), y: Math.ceil(r.y + 3),
    width: Math.floor(r.width - 6), height: 86,
  };
});
const mustaTila = await s.evaluate(() => {
  const t = window.matkakirja.ui.aikajana.esitys.tila();
  return { mustaPaalla: t.mustaPaalla, palkkiPiilossa: t.palkkiPiilossa, vaihe: t.vaihe };
});
await s.screenshot({ path: join(ULOS, 'savuke-ihmisen-rintama-musta.png') });
const musta = kirkkaudet(await s.screenshot({ clip: nauhanRajaus }));
vaadi('musta alku: linssin yläreuna on mustaa koko leveydeltä (ei palkin viivaa, ei hampurilaisen nuolta)',
  mustaTila.mustaPaalla === true && mustaTila.palkkiPiilossa === true
    && musta.maks < 8 && musta.kirkkaita === 0,
  JSON.stringify({ ...mustaTila, ...musta, nauhanRajaus }));

/* 1b. VASTAKOE: peitto pois → viiva ja nuoli palaavat. */
await s.evaluate(() => document.querySelector('.aikajana')?.classList.remove('esitys-musta'));
await s.waitForTimeout(400);
await s.screenshot({ path: join(ULOS, 'savuke-ihmisen-rintama-vastakoe.png') });
const vastakoe = kirkkaudet(await s.screenshot({ clip: nauhanRajaus }));
const yhaMusta = await s.evaluate(() => window.matkakirja.ui.aikajana.esitys.tila().mustaPaalla);
vaadi('VASTAKOE: ilman esitys-musta-luokkaa yläreunaan palaa kirkkaita pikseleitä',
  yhaMusta === true && vastakoe.kirkkaita > 100 && vastakoe.maks >= 8,
  JSON.stringify({ ...vastakoe, yhaMusta }));
await s.evaluate(() => {
  const j = document.querySelector('.aikajana');
  if (window.matkakirja.ui.aikajana.esitys.tila().mustaPaalla) j?.classList.add('esitys-musta');
  window.matkakirja.ui.aikajana.esitys.jatka();
});

/* ============ 2. RINTAMAN KÄRKI EI VÄLKY (kehyssarja) ============ */

/*
 * MITTA. Kärjen väri syntyy varjostimessa kahdesta luvusta: `paino`
 * (rintaman kirkkaus) ja pitotilan ehto. Savuke lukee joka piirretyllä
 * kehyksellä elävät uniformit (uNyt, uRintama, uPito, uKuljettu) ja
 * saman verkon instanssipuskurista sen janan, jonka kohdalla kasvava
 * kärki juuri on (iMatka, iAika) — ja laskee kärjen painon TÄSMÄLLEEN
 * niin kuin GPU sen laskee, float32:lla (Math.fround). Näin välkyntä
 * mitataan ilman kuvakaappauksia: kontin ohjelmisto-WebGL piirtää noin
 * kehyksen sekunnissa, eikä 60 Hz:n välke näy kaappaussarjassa.
 */
const mittariPaalle = await s.evaluate(() => {
  const ui = window.matkakirja.ui;
  const pallo = ui.pallonInstanssi;
  const scene = pallo.scene();
  let verkko = null;
  scene.traverse((o) => { if (!verkko && o.material?.uniforms?.uKuljettu) verkko = o; });
  if (!verkko) return { ok: false };
  const g = verkko.geometry;
  const puskuri = g.attributes.iMatka.data.array;
  const leveys = g.attributes.iMatka.data.stride;
  const f = Math.fround;
  window.__nayte = [];
  window.__lahde = verkko.material.fragmentShader;
  window.__maarite = String(verkko.material.defines?.PITO_VARA ?? '');
  const vanha = scene.onAfterRender;
  scene.onAfterRender = function (...a) {
    if (typeof vanha === 'function') vanha.apply(this, a);
    const u = verkko.material.uniforms;
    const kulj = u.uKuljettu.value[0];
    if (!(kulj > 0)) return;
    // Kasvava jana: vana 0 (selkäranka), se jana jonka väliin kuljettu osuu.
    let ma = 0; let mb = 0; let aa = 0; let ab = 0; let osui = false;
    for (let i = 0; i * leveys < puskuri.length; i += 1) {
      const o = i * leveys;
      if (puskuri[o + 34] !== 0) continue;
      const m0 = puskuri[o + 17];
      const m1 = puskuri[o + 18];
      if (kulj > m0 && kulj <= m1) {
        ma = m0; mb = m1; aa = puskuri[o + 21]; ab = puskuri[o + 22]; osui = true; break;
      }
    }
    if (!osui) return;
    const ff = f(f(kulj - ma) / f(mb - ma));
    const aika = f(aa + f(f(ab - aa) * ff));
    const nyt = f(u.uNyt.value);
    const rintama = f(u.uRintama.value);
    const perus = Math.max(0, Math.min(1, 1 - (aika - nyt) / rintama));
    const vara = f(rintama * (Number(window.__maarite) || 0));
    window.__nayte.push({
      nyt: +nyt.toFixed(3),
      ero: +f(nyt - aika).toFixed(4),
      // Uusi sääntö (vara) ja vanha sääntö (pelkkä nyt > aika).
      uusi: u.uPito.value > 0.5 && f(nyt - aika) > vara ? 0 : +perus.toFixed(4),
      vanhaSaanto: u.uPito.value > 0.5 && nyt > aika ? 0 : +perus.toFixed(4),
      pito: u.uPito.value,
    });
    if (window.__nayte.length > 300) window.__nayte.shift();
  };
  return { ok: true, maarite: window.__maarite };
});
vaadi('varjostimessa on pitotilan vara (KAISTAN_PITO_VARA)',
  mittariPaalle.ok && Number(mittariPaalle.maarite) > 0
    && (await s.evaluate(() => /uNyt - aika > uRintama \* PITO_VARA/.test(window.__lahde))),
  JSON.stringify(mittariPaalle));

/* Valot päälle ja kello käyntiin; sitten kehyssarja. */
for (let i = 0; i < 90; i += 1) {
  const t = await s.evaluate(() => window.matkakirja.ui.aikajana?.esitys?.tila?.()?.vaihe ?? null);
  if (t && t !== 'pimea') break;
  await s.waitForTimeout(1000);
}
await s.waitForTimeout(3000);
await s.evaluate(() => { window.__nayte.length = 0; });
for (let i = 0; i < 60; i += 1) {
  const n = await s.evaluate(() => window.__nayte.length);
  if (n >= 20) break;
  await s.waitForTimeout(1000);
}
const sarja = await s.evaluate(() => window.__nayte.slice(0, 40));
const vuorottelut = (avain) => {
  let n = 0;
  for (let i = 1; i < sarja.length; i += 1) if ((sarja[i][avain] === 0) !== (sarja[i - 1][avain] === 0)) n += 1;
  return n;
};
const uusiVuorottelee = vuorottelut('uusi');
const vanhaVuorottelee = vuorottelut('vanhaSaanto');
writeFileSync(join(ULOS, 'savuke-ihmisen-rintama-kehykset.json'), JSON.stringify(sarja, null, 1));
vaadi('rintaman kärki ei välky: paino ei vuorottele kehysten välillä',
  sarja.length >= 10 && uusiVuorottelee === 0 && sarja.every((r) => r.uusi > 0.9),
  JSON.stringify({ kehyksia: sarja.length, uusiVuorottelee, vanhaVuorottelee, nayte: sarja.slice(0, 6) }));
vaadi('VASTAKOE: vanha sääntö (ilman varaa) osuu kärjen pyöristysrajaan',
  sarja.length >= 10 && sarja.some((r) => Math.abs(r.ero) <= 0.05),
  JSON.stringify({ vanhaVuorottelee, erot: sarja.slice(0, 8).map((r) => r.ero) }));

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

await selain.close();
palvelin.close();
const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} väitettä läpi. Kuvat: ${ULOS}`);
process.exit(kaatui.length ? 1 : 0);
