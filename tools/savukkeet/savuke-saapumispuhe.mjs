/*
 * Savuke: SAAPUMISPUHE MINITRAILERISSA — HORATIO YKSIN.
 *
 * Omistaja 15.9.2026, sanatarkasti: *"Kokeile tehdä pelkästään isoisän
 * äänellä. Siinä paras että generaattori tekee itse tauon"*, ja
 * hyväksyntä *"Nyt hyvä. Tee kaikkiin ja vie peliin"*. Codexin
 * toimitus: js/packs/saapumispuheet.js (45 Euroopan kaupunkia, yksi
 * otto per kaupunki), kytkentä tässä haarassa.
 *
 * VARTIOT (Ateena, 390 × 844 ja 1400 × 900):
 *   1. TRAILERI NOUSEE ja kaupungin nimi on ruudulla.
 *   2. PUHE ON SE OIKEA TIEDOSTO: soittimen src on tasan
 *      SAAPUMISPUHEET.ateena.url.
 *   3. PLAY KUTSUTAAN KERRAN. Nimi nostetaan kahdesti (rAF ja 50 ms:n
 *      varakutsu) — kaksoissoitto kuuluisi kaikuna.
 *   4. PUHE KULKEE LUENNAN REITTIÄ: crossOrigin='anonymous',
 *      Web Audio -vahvistin ja analysaattori (kaiuttimen VU-mittari).
 *   5. MATKAKIRJALUENTA EI ALA PUHEEN PÄÄLLE. Traileri päätetään
 *      kesken puheen (piilotaSaapumistraileri odotaPuhe) → `diaryVoice`
 *      pysyy tyhjänä, kunnes puhe lähettää 'ended'-tapahtumansa.
 *      Tapahtuma simuloidaan, jotta koe ei riipu kellosta.
 *   6. OHITUS PYSÄYTTÄÄ. Napautus vaientaa puheen heti ja siivoaa
 *      soittimen.
 *
 * VASTAKOE: kertoja pois päältä (localStorage matkakirja-kertoja='ei')
 * → traileri pyörii, mutta soitinta ei synny lainkaan.
 *
 * VERKKO. Ämpärin MP3 haetaan Noden kautta (selaimessa ei ole
 * ulkoverkkoa) ja tarjoillaan reitiltä. Jos lataus katkeaa välipalvelimeen,
 * savuke tarjoilee tilalle paikallisen HILJAISEN MP3:n (ffmpeg, 3,2 s) ja
 * KIRJAA sen lokiin — kytkentä mitataan silloinkin, vain äänen sisältö ei.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *         node tools/savukkeet/savuke-saapumispuhe.mjs
 */
import http from 'node:http';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import { tmpdir } from 'node:os';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { SAAPUMISPUHEET } from '../../js/packs/saapumispuheet.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KAUPUNKI = 'ateena';
const PUHE = SAAPUMISPUHEET[KAUPUNKI];
const RUUDUT = [
  { nimi: 'puhelin', width: 390, height: 844 },
  { nimi: 'tyopoyta', width: 1400, height: 900 },
];

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=pallo`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* ── Ääni: ämpäristä, tarvittaessa paikallinen hiljaisuus ────────── */
let hiljaisuus = null;
function hiljainenMp3() {
  if (hiljaisuus) return hiljaisuus;
  const ulos = join(tmpdir(), 'savuke-saapumispuhe-hiljaisuus.mp3');
  execFileSync('ffmpeg', ['-y', '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono',
    '-t', String(PUHE.duration.toFixed(2)), '-b:a', '64k', ulos], { stdio: 'ignore' });
  hiljaisuus = readFileSync(ulos);
  return hiljaisuus;
}
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
let varaAaniKaytossa = false;

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: KAUPUNKI }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  // Ilman tätä Chromium ei päästä <audio>-elementtiä soimaan ilman elettä.
  args: ['--autoplay-policy=no-user-gesture-required'],
});
const virheet = [];

/*
 * AVAA PELIN ATEENAAN. Ateena on tallenteen aloituskaupunki, joten peli
 * saapuu sinne itse heti latauksessa — mitattava saapuminen on siis
 * pelin oma, ei savukkeen lavastama. `kertoja:false` = luenta pois.
 */
async function avaaAjo(viewport, { kertoja = true } = {}) {
  const ctx = await selain.newContext({ viewport, serviceWorkers: 'block' });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data.tallenne);
      localStorage.setItem('matkakirja-livia-avaus', '1');
      localStorage.setItem('matkakirja-livia-paljastus', '1');
      if (!data.kertoja) localStorage.setItem('matkakirja-kertoja', 'ei');
    } catch { /* yksityinen tila */ }
    // Jokainen play() talteen: kaksoissoitto näkyy vain laskurista.
    window.__saapumisSoitot = [];
    window.__saapumisOsoite = data.osoite;
    const alku = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function play(...a) {
      window.__saapumisSoitot.push(this.getAttribute('src') ?? this.src ?? '');
      return alku.apply(this, a);
    };
  }, { tallenne, kertoja, osoite: PUHE.url });
  const sivu = await ctx.newPage();
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
    const url = route.request().url();
    const v = await ampariHaku(url);
    if (!v || v.status !== 200) {
      if (!url.endsWith('.mp3')) { route.abort(); return; }
      varaAaniKaytossa = true;
      route.fulfill({
        status: 200,
        contentType: 'audio/mpeg',
        body: hiljainenMp3(),
        headers: { 'access-control-allow-origin': '*' },
      });
      return;
    }
    route.fulfill({
      status: 200,
      contentType: v.tyyppi ?? 'application/octet-stream',
      body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 60000 });
  return { ctx, sivu };
}

/** Soivan saapumispuheen tila sivulta. */
const PUHEEN_TILA = `(async () => {
  const m = await import('/js/luenta.js');
  const a = m.saapumispuheenSoitin();
  const { ui } = window.matkakirja;
  return {
    on: Boolean(a),
    src: a?.getAttribute('src') ?? null,
    paused: a?.paused ?? null,
    crossOrigin: a?.crossOrigin ?? null,
    vahvistin: Boolean(a?.luennanVahvistin),
    mittari: Boolean(a?.aaniMittari),
    diary: Boolean(ui.diaryVoice),
    traileri: document.querySelectorAll('.saapumistraileri').length,
    nimi: document.querySelector('.saapumistraileri-nimi')?.getAttribute('aria-label') ?? null,
    soitot: window.__saapumisSoitot.filter((s) => s === window.__saapumisOsoite).length,
  };
})()`;

/** Kysyy tilan, kunnes ehto täyttyy tai aika loppuu (Node pollaa). */
async function odota(sivu, ehto, katto = 15000) {
  const loppu = Date.now() + katto;
  let viimeinen = null;
  for (;;) {
    viimeinen = await sivu.evaluate(PUHEEN_TILA);
    if (ehto(viimeinen) || Date.now() > loppu) return viimeinen;
    await sivu.waitForTimeout(100);
  }
}

for (const ruutu of RUUDUT) {
  console.log(`\n=== ${ruutu.nimi} ${ruutu.width}x${ruutu.height} ===`);
  const { ctx, sivu } = await avaaAjo({ width: ruutu.width, height: ruutu.height });

  const tila = await odota(sivu, (t) => t.on && t.paused === false, 60000);
  /*
   * PUHE HIDASTETAAN MITTAUKSEN AJAKSI (playbackRate 0,25). Otto on
   * 3,2 s, ja seuraavat kolme mittausta — trailerin päättäminen kesken
   * puheen, odotus ja 'ended' — eivät mahtuisi sen sisään kuormitetulla
   * koneella. Hidastus ei koske pelin logiikkaa: se vain venyttää
   * soittimen oman kellon, jotta koe ei kilpaile sen kanssa.
   */
  await sivu.evaluate(async () => {
    const m = await import('/js/luenta.js');
    const a = m.saapumispuheenSoitin();
    if (a) a.playbackRate = 0.25;
  });
  const soi = tila.on && tila.paused === false;
  tieto(`${ruutu.nimi} puheen tila`, JSON.stringify(tila));

  vaadi(`${ruutu.nimi}: traileri ruudulla ja nimi ladottu`,
    tila.traileri === 1 && tila.nimi === 'Ateena', JSON.stringify(tila));
  vaadi(`${ruutu.nimi}: saapumispuhe soi`, soi && tila.on && tila.paused === false);
  vaadi(`${ruutu.nimi}: src on Ateenan hyväksytty otto`, tila.src === PUHE.url,
    String(tila.src));
  vaadi(`${ruutu.nimi}: play kutsuttu TASAN KERRAN`, tila.soitot === 1,
    `soittoja ${tila.soitot}`);
  vaadi(`${ruutu.nimi}: puhe kulkee luennan Web Audio -reittiä`,
    tila.crossOrigin === 'anonymous' && tila.vahvistin && tila.mittari,
    JSON.stringify(tila));
  vaadi(`${ruutu.nimi}: matkakirjaluenta ei ole vielä alkanut`, tila.diary === false);

  // 5. Traileri loppuu kesken puheen: lupaus jää odottamaan 'endediä'.
  await sivu.evaluate(async () => {
    const t = await import('/js/saapumistraileri.js');
    t.piilotaSaapumistraileri(window.matkakirja.ui, { odotaPuhe: true });
  });
  await sivu.waitForTimeout(800);
  const kesken = await sivu.evaluate(PUHEEN_TILA);
  tieto(`${ruutu.nimi} traileri pois, puhe kesken`, JSON.stringify(kesken));
  vaadi(`${ruutu.nimi}: kuvat poissa mutta puhe jatkuu leikkaamatta`,
    kesken.traileri === 0 && kesken.on && kesken.paused === false, JSON.stringify(kesken));
  vaadi(`${ruutu.nimi}: matkakirjaluenta odottaa puheen loppua`,
    kesken.diary === false, JSON.stringify(kesken));

  // 'ended' simuloidaan, jotta koe ei riipu kellosta eikä verkosta.
  await sivu.evaluate(async () => {
    const m = await import('/js/luenta.js');
    m.saapumispuheenSoitin()?.dispatchEvent(new Event('ended'));
  });
  const jatkui = await sivu.waitForFunction(
    () => Boolean(window.matkakirja.ui.diaryVoice), null, { timeout: 15000 },
  ).then(() => true).catch(() => false);
  const lopussa = await sivu.evaluate(PUHEEN_TILA);
  tieto(`${ruutu.nimi} ended jälkeen`, JSON.stringify(lopussa));
  vaadi(`${ruutu.nimi}: matkakirjaluenta alkaa vasta ended-tapahtumasta`, jatkui);
  vaadi(`${ruutu.nimi}: loppunut puhe siivotaan soittimesta`, lopussa.on === false);

  await ctx.close();

  // 6. OHITUS: napautus vaientaa puheen heti.
  const ohitus = await avaaAjo({ width: ruutu.width, height: ruutu.height });
  const ennenOhitusta = await odota(ohitus.sivu, (t) => t.on, 20000);
  vaadi(`${ruutu.nimi}: puhe soi ennen ohitusta`, ennenOhitusta.on,
    JSON.stringify(ennenOhitusta));
  await ohitus.sivu.evaluate(() => {
    document.querySelector('.saapumistraileri')
      ?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
  });
  const ohitettu = await ohitus.sivu.evaluate(PUHEEN_TILA);
  tieto(`${ruutu.nimi} ohituksen jälkeen`, JSON.stringify(ohitettu));
  vaadi(`${ruutu.nimi}: ohitus pysäyttää puheen ja siivoaa soittimen`,
    ohitettu.on === false, JSON.stringify(ohitettu));
  await ohitus.ctx.close();

  // VASTAKOE: kertoja pois → traileri pyörii, puhetta ei synny.
  const vastakoe = await avaaAjo({ width: ruutu.width, height: ruutu.height },
    { kertoja: false });
  // Traileri on ruudulla; puheelle annetaan reilusti aikaa alkaa —
  // vartio on se, ettei se ala.
  const naki = await odota(vastakoe.sivu, (t) => t.traileri === 1, 30000);
  await vastakoe.sivu.waitForTimeout(2000);
  const mykka = await vastakoe.sivu.evaluate(PUHEEN_TILA);
  tieto(`${ruutu.nimi} vastakokeen traileri`, JSON.stringify(naki));
  tieto(`${ruutu.nimi} vastakoe (kertoja pois)`, JSON.stringify(mykka));
  vaadi(`${ruutu.nimi}: VASTAKOE luenta pois → traileri pyörii, puhe ei soi`,
    naki.traileri === 1 && mykka.on === false && mykka.soitot === 0, JSON.stringify(mykka));
  await vastakoe.ctx.close();
}

await selain.close();
palvelin.close();

tieto('ääni', varaAaniKaytossa
  ? 'ämpärin lataus katkesi — käytettiin paikallista hiljaista MP3:a'
  : 'ämpärin alkuperäinen MP3 (media.matkakirja.app)');
if (virheet.length) console.log(`HUOM  sivuvirheitä: ${virheet.slice(0, 5).join(' | ')}`);
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
