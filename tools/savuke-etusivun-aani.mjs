/*
 * SELAINSAVUKE: etusivun taustaäänen polku oikeassa selaimessa.
 *
 * OMISTAJAN VIKA 13.8.2026 (iPad, v614): *"etusivun taustaääni ei
 * vieläkään kuulu — puhe kuuluu kyllä mutta ei taustaääni."* iPhonella
 * sama koodi soi, ja vika on ollut olemassa jo ennen iOS-kuorta.
 *
 * Yksikkötestit (tests/ambienssi.test.mjs) ajavat saman tilakoneen
 * tynkäselaimessa. Tämä ajo tekee sen, mitä tynkä ei osaa: soittaa
 * oikeaa äänitiedostoa oikealla selaimen äänigraafilla ja mittaa
 * ulostulon AnalyserNodella. Tässä koneessa on vain Chromium, joten
 * WebKitin oma käytös ei mittaudu — mutta VIKAMEKANISMI (Web Audioon
 * reititetty mutta mykkä elementti) toistetaan Chromiumilla, ja
 * korjauksen on poistettava se.
 *
 *   node tools/savuke-etusivun-aani.mjs
 *
 * Ulkopuoliset osoitteet katkaistaan; äänitiedostot tarjoillaan
 * paikallisesti syntetisoidusta WAVista, jotta ajo ei riipu verkosta.
 * serviceWorkers: 'block' on pakollinen — muuten sw sieppaa pyynnöt ja
 * ajo mittaa välimuistia eikä koodia.
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};
const palvelin = createServer((req, res) => {
  const polku = join(JUURI, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8736, r));

/**
 * Kaistanrajattua kohinaa WAV-muodossa. Ei koskaan digitaalista
 * hiljaisuutta: hiljaisuusvahdin pitää saada mitattavaa signaalia, ja
 * pelkkä siniaalto voisi osua nollakohtaan juuri näytehetkellä.
 */
function teeWav(sekunteja = 30, taajuus = 44100) {
  const naytteita = sekunteja * taajuus;
  const data = Buffer.alloc(naytteita * 2);
  let edellinen = 0;
  for (let i = 0; i < naytteita; i++) {
    edellinen = edellinen * 0.85 + (Math.random() * 2 - 1) * 0.15;
    // Vähintään puolet täydestä tasosta, jottei näyte pyöristy nollaan.
    const arvo = Math.max(0.5, Math.min(1, Math.abs(edellinen) + 0.5)) * (i % 2 ? 1 : -1);
    data.writeInt16LE(Math.round(arvo * 32000), i * 2);
  }
  const otsake = Buffer.alloc(44);
  otsake.write('RIFF', 0);
  otsake.writeUInt32LE(36 + data.length, 4);
  otsake.write('WAVE', 8);
  otsake.write('fmt ', 12);
  otsake.writeUInt32LE(16, 16);
  otsake.writeUInt16LE(1, 20);
  otsake.writeUInt16LE(1, 22);
  otsake.writeUInt32LE(taajuus, 24);
  otsake.writeUInt32LE(taajuus * 2, 28);
  otsake.writeUInt16LE(2, 32);
  otsake.writeUInt16LE(16, 34);
  otsake.write('data', 36);
  otsake.writeUInt32LE(data.length, 40);
  return Buffer.concat([otsake, data]);
}
const WAV = teeWav();

const paketti = await import(process.env.PLAYWRIGHT_JS
  ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/*
 * Sivun oma tarkkailu. Soittimet eivät ole DOMissa (new Audio()), joten
 * ne kerätään konstruktorin kautta. Moduuli merkitsee reititetyn
 * soittimen solmut elementtiin (aaniVahvistin, aaniMittari), joten
 * ulostulo saadaan mitattua pelin OMASTA mittarista eikä testin
 * rinnakkaisesta — rinnakkainen haara voisi mitata eri signaalia.
 */
const TARKKAILU = `
window.__aanet = [];
const AlkuperainenAudio = window.Audio;
window.Audio = function Audio(...a) {
  const el = new AlkuperainenAudio(...a);
  window.__aanet.push(el);
  return el;
};
window.__tila = () => window.__aanet.map((el) => ({
  src: (el.getAttribute('src') || '').slice(-24),
  reititetty: Boolean(el.aaniVahvistin),
  paused: el.paused,
  volume: el.volume,
  currentTime: el.currentTime,
  readyState: el.readyState,
  gain: el.aaniVahvistin ? el.aaniVahvistin.gain.value : null,
  huippu: (() => {
    if (!el.aaniMittari) return null;
    const d = new Float32Array(el.aaniMittari.fftSize);
    el.aaniMittari.getFloatTimeDomainData(d);
    let m = 0;
    for (const x of d) m = Math.max(m, Math.abs(x));
    return m;
  })(),
}));
`;

/*
 * Vikamekanismin toisto Chromiumilla.
 *
 * Kaksi asiaa yhdessä:
 *  1. Konteksti VÄITTÄÄ olevansa käynnissä, jotta soitin ylipäätään
 *     reititetään jo sivun latautuessa (ennen ensimmäistä elettä).
 *  2. createMediaElementSource luodaan aidosti — se on se kutsu, joka
 *     IRROTTAA elementin kaiuttimesta — mutta lähdesolmu ei koskaan
 *     yhdisty eteenpäin. Lopputulos on täsmälleen se tila, josta
 *     ambience-stream.js:n omat kommentit varoittavat WebKitin
 *     kohdalla: elementti "soi", virhettä ei tule, readyState on
 *     kunnossa — ja ulostulo on täyttä hiljaisuutta.
 */
const MYKKA_REITITYS = `
for (const N of [window.AudioContext, window.webkitAudioContext]) {
  if (!N) continue;
  Object.defineProperty(N.prototype, 'state', { get: () => 'running', configurable: true });
  const alkuperainen = N.prototype.createMediaElementSource;
  N.prototype.createMediaElementSource = function (el) {
    const solmu = alkuperainen.call(this, el);
    solmu.connect = (kohde) => kohde;
    return solmu;
  };
}
`;

async function avaa({ valehteleva = false, viewport = { width: 1024, height: 768 } } = {}) {
  const ctx = await selain.newContext({ viewport, serviceWorkers: 'block' });
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e)));
  await sivu.addInitScript(TARKKAILU + (valehteleva ? MYKKA_REITITYS : ''));
  // Äänitiedostot paikallisesta WAVista; muu ulkomaailma poikki.
  await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => {
    if (/\.(mp3|wav|ogg|m4a)(\?|#|$)/i.test(route.request().url())) {
      route.fulfill({
        status: 200,
        headers: { 'content-type': 'audio/wav', 'access-control-allow-origin': '*' },
        body: WAV,
      });
      return;
    }
    route.abort();
  });
  await sivu.goto('http://127.0.0.1:8736/index.html', { waitUntil: 'load' });
  return { ctx, sivu, virheet };
}

/** Napauttaa aloitusporttia, joka on pelin ensimmäinen ele. */
async function aloita(sivu) {
  const nappi = sivu.locator('.start-btn');
  await nappi.waitFor({ state: 'visible', timeout: 8000 });
  await nappi.click();
}

/*
 * Vain taustaäänen soittimet. Sivulla soi myös kertojan avausluenta
 * (intro-puhe.mp3) omalla soittimellaan — juuri se, jonka omistaja
 * kuulee vaikka tausta on mykkä. Sitä ei saa laskea taustaääneksi.
 */
const ambienssit = (tila) => tila.filter((t) => /freesound/.test(t.src));
const kuuluva = (tila) => ambienssit(tila)
  .filter((t) => !t.paused && (t.reititetty ? t.huippu > 0 : t.volume > 0));

// ── (c) normaali polku ───────────────────────────────────────────────
{
  const { ctx, sivu, virheet } = await avaa();
  await aloita(sivu);
  await sivu.waitForTimeout(3500);
  const tila = await sivu.evaluate('window.__tila()');
  const soivat = kuuluva(tila);
  vaadi('normaali polku: etusivun tausta soi', soivat.length > 0,
    JSON.stringify(tila));
  vaadi('normaali polku: nauha etenee', ambienssit(tila).some((t) => t.currentTime > 0),
    `currentTime ${ambienssit(tila).map((t) => t.currentTime.toFixed(2)).join(', ')}`);
  vaadi('normaali polku: ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));
  await ctx.close();
}

// ── (b) ele saapuu myöhään ───────────────────────────────────────────
{
  const { ctx, sivu, virheet } = await avaa();
  // Ei kosketa sivuun: automaattitoiston esto laukeaa ja soitin jää
  // odottamaan elettä. Vahdin raja on 6 s, joten odotus ylittää sen.
  await sivu.waitForTimeout(7000);
  const ennen = await sivu.evaluate('window.__tila()');
  vaadi('myöhäinen ele: ennen elettä ei soi', kuuluva(ennen).length === 0,
    JSON.stringify(ennen));
  await aloita(sivu);
  await sivu.waitForTimeout(3500);
  const jalkeen = await sivu.evaluate('window.__tila()');
  vaadi('myöhäinen ele: tausta lähtee soimaan', kuuluva(jalkeen).length > 0,
    JSON.stringify(jalkeen));
  vaadi('myöhäinen ele: ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));
  await ctx.close();
}

// ── (a) volume-polku ja ykkösen ylittävä kerroin ─────────────────────
{
  const { ctx, sivu, virheet } = await avaa();
  await aloita(sivu);
  await sivu.waitForTimeout(3000);
  const reititetty = ambienssit(await sivu.evaluate('window.__tila()')).some((t) => t.reititetty);
  vaadi('volume-polku: soitin ei ole reititetty ennen kontekstin heräämistä', !reititetty);
  /*
   * Väistökerroin yli ykkösen nostaa soivan tason yli sen, mitä
   * HTML-soittimen volume sallii. Leikkaamaton arvo heittäisi
   * IndexSizeErrorin keskellä häivytystä, ja voimakkuus jäisi nollaan.
   */
  await sivu.evaluate(`import('/js/ambience-stream.js').then((m) => m.vaimennaTausta(12))`);
  await sivu.waitForTimeout(2500);
  const tila = await sivu.evaluate('window.__tila()');
  vaadi('volume-polku: kerroin > 1 ei kaada häivytystä', virheet.length === 0, virheet.join(' | '));
  vaadi('volume-polku: taso leikkautuu ykköseen eikä nollaan',
    ambienssit(tila).some((t) => !t.paused && t.volume === 1),
    JSON.stringify(ambienssit(tila)));
  await ctx.close();
}

// ── (d) reititetty mutta mykkä ketju ─────────────────────────────────
{
  /*
   * Vikamekanismi: konteksti väittää olevansa käynnissä, joten soitin
   * reititetään Web Audioon — mutta graafi ei tuota ääntä. Elementti ei
   * enää soi suoraan kaiuttimeen, virhettä ei tule, readyState on
   * kunnossa. Ilman hiljaisuusvahtia etusivu jää mykäksi lopullisesti.
   */
  const { ctx, sivu, virheet } = await avaa({ valehteleva: true });
  await aloita(sivu);
  await sivu.waitForTimeout(1500);
  const alku = await sivu.evaluate('window.__tila()');
  vaadi('mykkä ketju: soitin todella reitittyi', ambienssit(alku).some((t) => t.reititetty),
    JSON.stringify(ambienssit(alku)));
  vaadi('mykkä ketju: reititetyn ulostulo on nollaa',
    ambienssit(alku).filter((t) => t.reititetty).every((t) => t.huippu === 0),
    JSON.stringify(ambienssit(alku)));

  // Hiljaisuusvahti näytteistää 2,5 s + 3 × 0,5 s.
  await sivu.waitForTimeout(7000);
  const loppu = await sivu.evaluate('window.__tila()');
  const korjattu = ambienssit(loppu).filter((t) => !t.reititetty && !t.paused && t.volume > 0);
  vaadi('mykkä ketju: tilalle syntyy reitittämätön soitin', korjattu.length > 0,
    JSON.stringify(ambienssit(loppu)));
  vaadi('mykkä ketju: ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));
  await ctx.close();
}

// ── (e) ÄÄNET-VALIKON KAKSI KYTKINTÄ (omistajan tilaus v1119) ────────
{
  /*
   * *"Erittele ÄÄNET-osioon kaksi selkeää omaa päälle/pois-kytkintä:
   * KERTOJA (luennat) ja TAUSTAÄÄNET (ambienssi + efektit) — kumpikin
   * pysyvä valinta"*, ja *"matkapäiväkirjalaatikon kaiutinkuvake
   * SYNKRONOIDAAN suoraan valikon KERTOJA-kytkimeen … kumpikin
   * päivittyy heti kun toista painetaan"*.
   *
   * Vanha rivi oli kolme kuvakenappia yhtenä valintaryhmänä; uusi on
   * kaksi riippumatonta kytkintä, joilla on nimi ja tila sanana.
   */
  const { ctx, sivu } = await avaa();
  await sivu.evaluate(() => document.getElementById('menu-btn').click());
  await sivu.waitForTimeout(300);
  const lue = () => sivu.evaluate(() => {
    const rivit = [...document.querySelectorAll('#kertoja-valikko button')].map((b) => ({
      kytkin: b.dataset.kytkin,
      nimi: b.querySelector('.aanikytkin-nimi')?.textContent ?? '',
      tila: b.querySelector('.aanikytkin-tila')?.textContent ?? '',
      paalla: b.classList.contains('valittu'),
    }));
    return {
      rivit,
      kertojaMuisti: localStorage.getItem('matkakirja-kertoja'),
      kaiutinMykka: document.getElementById('fact-kuuntele')?.classList.contains('mykistetty'),
    };
  });
  const alku = await lue();
  vaadi('ÄÄNET-osiossa on kaksi kytkintä: kertoja ja taustaäänet',
    alku.rivit.length === 2
      && alku.rivit[0].kytkin === 'kertoja' && alku.rivit[1].kytkin === 'tausta',
    JSON.stringify(alku.rivit));
  vaadi('kummankin kytkimen tila lukee rivillä sanana',
    alku.rivit.every((r) => r.tila === 'päällä' || r.tila === 'pois'),
    JSON.stringify(alku.rivit.map((r) => r.tila)));

  // KERTOJA pois valikosta: kaiutinkuvake saa vinoviivan samassa hetkessä.
  await sivu.evaluate(() => document.querySelector('[data-kytkin="kertoja"]').click());
  await sivu.waitForTimeout(200);
  const kertojaPois = await lue();
  vaadi('kertojan sammutus jää laitteen muistiin',
    kertojaPois.kertojaMuisti === 'ei' && kertojaPois.rivit[0].paalla === false,
    JSON.stringify(kertojaPois));
  vaadi('kaiutinkuvake seuraa valikon kertojakytkintä',
    kertojaPois.kaiutinMykka === true, `mykistetty ${kertojaPois.kaiutinMykka}`);
  vaadi('taustaäänet eivät sammuneet kertojan mukana',
    kertojaPois.rivit[1].paalla === true, JSON.stringify(kertojaPois.rivit[1]));

  // Sama kytkin toisesta kahvasta: kortin kaiutin kääntää sen takaisin.
  await sivu.evaluate(() => {
    const ui = window.matkakirja.ui;
    ui.factCard.hidden = false;
    ui.factKuuntele.hidden = false;
    ui.factKuuntele.click();
  });
  await sivu.waitForTimeout(200);
  const kaiuttimesta = await lue();
  vaadi('kaiuttimen painallus kääntää valikon kytkimen',
    kaiuttimesta.rivit[0].paalla === true && kaiuttimesta.kertojaMuisti !== 'ei',
    JSON.stringify(kaiuttimesta));

  // TAUSTAÄÄNET pois: kertojan valinta säilyy erikseen.
  await sivu.evaluate(() => document.querySelector('[data-kytkin="tausta"]').click());
  await sivu.waitForTimeout(200);
  const taustaPois = await lue();
  vaadi('taustaäänten sammutus ei kaada kertojan omaa valintaa',
    taustaPois.rivit[1].paalla === false && taustaPois.rivit[0].paalla === true,
    JSON.stringify(taustaPois.rivit));
  await ctx.close();
}

await selain.close();
await new Promise((r) => palvelin.close(r));

const hylatyt = tulokset.filter((t) => !t.ok).length;
console.log(`\n${tulokset.length - hylatyt}/${tulokset.length} läpi`);
process.exit(hylatyt ? 1 : 0);
