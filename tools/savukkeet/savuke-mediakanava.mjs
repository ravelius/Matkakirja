/*
 * Savuke: pelin äänet mediakanavassa, ja pelin oma mykistys pitää.
 *
 * Kaksi omistajan bugiraporttia 22.8.2026, molemmat js/sound.js:n
 * ympärillä:
 *  1. "Pelin pitäisi totella aina tuota äänisäädintä. Nyt ääntä pystyi
 *     muuttamaan iPadin napeista mutta tuo säädin pysyi paikallaan."
 *     → mediakanavan ankkuri (hiljainen <audio>-silmukka) + audioSession.
 *  2. "Vaikka pelin oma mykistys on päällä niin peli lukee silti
 *     matkakirjaa ääneen mutta vain jos ääni on striimi generoitu."
 *     → mykistysportti js/lukija.js:n molemmissa sisäänkäynneissä.
 *
 * Kumpaakaan ei näe yksikkötestistä: ankkuri on oikean selaimen
 * mediaelementti (autoplay-esto, loop, readyState) ja mykistysportti
 * elää oikean moduulikehän läpi. Chromium ei kerro AVAudioSessionin
 * luokasta mitään — se on iPadin käsintesti — mutta KAIKKI muu ehto,
 * josta luokka syntyy (elementti on olemassa, soi, on silmukka, ei ole
 * mykkä ja on volume 1), mitataan täällä.
 *
 *   node tools/savukkeet/savuke-mediakanava.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg',
  '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const pyyntö = decodeURIComponent(req.url.split('?')[0]);
  const polku = join(JUURI, pyyntö === '/' ? 'index.html' : pyyntö);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

/*
 * Tarkkailu ennen sivun skriptejä: soittimet eivät ole DOMissa
 * (new Audio()), joten ne kerätään konstruktorin kautta. navigator
 * .audioSession puuttuu Chromiumista, joten se mockataan — näin
 * ASETUSJÄRJESTYS (playback → auto → playback sanelun yli) tulee
 * mitatuksi, vaikka oikea luokka jää iPadin varaan.
 */
const TARKKAILU = `
window.__aanet = [];
const AlkuperainenAudio = window.Audio;
window.Audio = function Audio(...a) {
  const el = new AlkuperainenAudio(...a);
  window.__aanet.push(el);
  return el;
};
window.__istunto = [];
Object.defineProperty(navigator, 'audioSession', {
  configurable: true,
  value: {
    _t: 'auto',
    get type() { return this._t; },
    set type(v) { this._t = v; window.__istunto.push(v); },
  },
});
window.__ankkuri = () => {
  const el = window.__aanet.find((a) => (a.src || '').startsWith('data:audio/wav') && a.loop);
  if (!el) return null;
  return {
    loop: el.loop, volume: el.volume, muted: el.muted, paused: el.paused,
    readyState: el.readyState, duration: el.duration,
    playsinline: el.getAttribute('playsinline'),
    airplay: el.getAttribute('x-webkit-airplay'),
  };
};
`;

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
// serviceWorkers: 'block' — muuten sw sieppaa pyynnöt ja ajo mittaa välimuistia.
const ctx = await selain.newContext({ viewport: { width: 1024, height: 768 }, serviceWorkers: 'block' });
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));
await sivu.addInitScript(TARKKAILU);
// Ulkomaailma poikki: ajo ei saa riippua verkosta.
await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (reitti) => reitti.abort());
await sivu.goto(osoite, { waitUntil: 'domcontentloaded' });
await sivu.waitForTimeout(2500);

vaadi('sivu latautui ilman poikkeuksia', virheet.length === 0, virheet.join(' | ').slice(0, 300));

// --- ennen elettä: hiljaista ------------------------------------------------
const ennen = await sivu.evaluate(() => ({ ankkuri: window.__ankkuri(), istunto: window.__istunto }));
vaadi('ennen elettä ankkuri ei soi', !ennen.ankkuri || ennen.ankkuri.paused === true,
  JSON.stringify(ennen.ankkuri));
vaadi('ennen elettä mediakanavaa ei oteta (pelaajan musiikki jää soimaan)',
  ennen.istunto.length === 0, JSON.stringify(ennen.istunto));

// --- ele: mediakanava käyttöön ----------------------------------------------
await sivu.mouse.move(500, 400);
await sivu.mouse.down();
await sivu.mouse.up();
await sivu.waitForTimeout(1200);

const jalkeen = await sivu.evaluate(() => ({ ankkuri: window.__ankkuri(), istunto: window.__istunto }));
const a = jalkeen.ankkuri;
vaadi('eleestä asetettiin audioSession playback', jalkeen.istunto[0] === 'playback',
  JSON.stringify(jalkeen.istunto));
vaadi('ankkuri on olemassa', Boolean(a), JSON.stringify(jalkeen));
vaadi('ankkuri soi', a?.paused === false, JSON.stringify(a));
vaadi('ankkuri on silmukka, täydellä volumella eikä mykkä',
  a?.loop === true && a?.volume === 1 && a?.muted === false, JSON.stringify(a));
vaadi('ankkurissa on oikea ääniraita (kesto > 0, metadata luettu)',
  a?.readyState >= 1 && a?.duration > 0, JSON.stringify(a));
vaadi('ankkuri on playsinline ja airplay-kielletty',
  a?.playsinline === '' && a?.airplay === 'deny', JSON.stringify(a));

// --- tehoste soi kontekstin läpi --------------------------------------------
const tehoste = await sivu.evaluate(async () => {
  const mod = await import('/js/sound.js');
  try {
    mod.sfx.enabled = true;
    mod.sfx.play('click');
    return { ok: true, tila: mod.sfx.ctx?.state ?? null };
  } catch (e) { return { ok: false, virhe: String(e) }; }
});
vaadi('sfx.play ei heitä', tehoste.ok === true, JSON.stringify(tehoste));
vaadi('WebAudio-konteksti on käynnissä', tehoste.tila === 'running', String(tehoste.tila));

// --- sanelu: mediakanava purkautuu ja palaa ---------------------------------
const sanelu = await sivu.evaluate(async () => {
  const mod = await import('/js/sound.js');
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  mod.sfx.taukoaKonteksti();
  await odota(300);
  const tauolla = { ankkuri: window.__ankkuri(), tila: mod.sfx.ctx?.state };
  mod.sfx.jatkaKonteksti();
  await odota(600);
  const takaisin = { ankkuri: window.__ankkuri(), tila: mod.sfx.ctx?.state };
  return { tauolla, takaisin, jarjestys: window.__istunto };
});
vaadi('sanelun ajaksi ankkuri pysähtyy (mikrofoni tarvitsee session)',
  sanelu.tauolla.ankkuri?.paused === true, JSON.stringify(sanelu.tauolla));
vaadi('sanelun ajaksi WebAudio-konteksti nukkuu', sanelu.tauolla.tila === 'suspended',
  String(sanelu.tauolla.tila));
vaadi('sanelun jälkeen ankkuri soi taas', sanelu.takaisin.ankkuri?.paused === false,
  JSON.stringify(sanelu.takaisin));
vaadi('sanelun jälkeen konteksti herää', sanelu.takaisin.tila === 'running',
  String(sanelu.takaisin.tila));
vaadi('asetusjärjestys playback → auto → playback',
  JSON.stringify(sanelu.jarjestys) === JSON.stringify(['playback', 'auto', 'playback']),
  JSON.stringify(sanelu.jarjestys));

// --- ankkuri herää ulkopuolisesta tauosta (Ohjauskeskus, puhelu) ------------
const elvytys = await sivu.evaluate(async () => {
  const el = window.__aanet.find((x) => (x.src || '').startsWith('data:audio/wav') && x.loop);
  el.pause();
  const pysahtyi = el.paused;
  document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
  await new Promise((r) => setTimeout(r, 500));
  return { pysahtyi, uudelleen: el.paused };
});
vaadi('ulkopuolinen tauko pysäyttää ankkurin', elvytys.pysahtyi === true, JSON.stringify(elvytys));
vaadi('seuraava ele käynnistää ankkurin uudestaan', elvytys.uudelleen === false,
  JSON.stringify(elvytys));

// --- mykistys koskee myös striimattua lukijaääntä ---------------------------
//
// Puhepalvelin mockataan, jotta striimipolku toimii ilman verkkoa.
await sivu.route(/\/puhe/, (reitti) => reitti.fulfill({
  status: 200,
  contentType: 'audio/wav',
  body: Buffer.from('UklGRiwAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQgAAACAgICAgICAgA==', 'base64'),
}));

const mykistys = await sivu.evaluate(async () => {
  const { sfx } = await import('/js/sound.js');
  const lukija = await import('/js/lukija.js');
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const teksti = 'Tokiossa astuin risteykseen.';

  // 1. Mykkänä kumpikaan sisäänkäynti ei lähde.
  sfx.setEnabled(false);
  const lahtiMykkana = lukija.lueAaneen(teksti, null, { persoona: 'merkinnat' });
  const virtaMykkana = lukija.lueVirtana(null, { persoona: 'pollo' });
  await odota(300);
  const lukeeMykkana = lukija.lukijaLukee();

  // 2. Äänillä lähtee. Tila luetaan heti: verkkovastauksen kohtalo ei
  //    kuulu tähän vartioon.
  sfx.setEnabled(true);
  const lahtiAanella = lukija.lueAaneen(teksti, null, { persoona: 'merkinnat' });
  const lukeeAanella = lukija.lukijaLukee();

  // 3. Mykistys KESKEN luennan pysäyttää soivan luennan.
  sfx.setEnabled(false);
  const lukeeMykistyksenJalkeen = lukija.lukijaLukee();
  sfx.setEnabled(true);
  await odota(50);
  return {
    lahtiMykkana, virtaMykkana, lukeeMykkana, lahtiAanella, lukeeAanella, lukeeMykistyksenJalkeen,
  };
});
vaadi('mykkänä lueAaneen ei lähde', mykistys.lahtiMykkana === false, JSON.stringify(mykistys));
vaadi('mykkänä lueVirtana palauttaa null', mykistys.virtaMykkana === null, JSON.stringify(mykistys));
vaadi('mykkänä lukija ei lue mitään', mykistys.lukeeMykkana === false, JSON.stringify(mykistys));
vaadi('äänillä lueAaneen lähtee', mykistys.lahtiAanella === true, JSON.stringify(mykistys));
vaadi('äänillä lukija lukee', mykistys.lukeeAanella === true, JSON.stringify(mykistys));
vaadi('mykistys kesken luennan pysäyttää sen',
  mykistys.lukeeMykistyksenJalkeen === false, JSON.stringify(mykistys));

vaadi('ei sivupoikkeuksia ajon lopussa', virheet.length === 0, virheet.join(' | ').slice(0, 300));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} ok`);
process.exit(lapi === kaikki ? 0 : 1);
