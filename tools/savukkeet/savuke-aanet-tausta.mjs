/*
 * Savuke: taustalle mennyt peli on täysin hiljaa.
 *
 * OMISTAJAN TILAUS 24.8.2026: "Pelin äänet pitäisi hiljentyä kaikki
 * jos sovellus ei ole iOS-laitteella auki päällimmäisenä."
 *
 * Vartioi keskitettyä näkyvyysvahtia (js/aani-tausta.js) ja sen
 * kuutta rekisteröityä vaimentajaa. Yksikkötesti ei näe tästä mitään:
 * kyse on oikeista mediaelementeistä, oikeista WebAudio-konteksteista
 * ja oikeasta visibilitychange-tapahtumaketjusta.
 *
 * MITÄ MITATAAN
 *  1. Piiloon mennessä: mediakanavan ankkuri pysähtyy, tehosteiden
 *     konteksti nukkuu, jokainen soiva mediaelementti pysähtyy —
 *     myös sellainen, jota yksikään äänimoduuli ei omista
 *     (turvaverkko: js/ui.js:n "Kuuntele näyte" on tällainen).
 *  2. Palatessa: ankkuri ja silmukat jatkavat, kertaluontoinen ääni ei
 *     — ja se saa 'ended'-tapahtuman, jotta sen omistaja siivoaa
 *     jälkensä (nappi, taustan väistö).
 *  3. Kesken jäänyt LUENTA EI ALA ITSESTÄÄN: lukijaäänen piiri jää
 *     nukkumaan vaikka tehosteiden konteksti herää.
 *  4. Selaimen syntetisaattori vaiennetaan perumalla (cancel), ei
 *     tauottamalla — WebKitissä tauko ei vaienna sitä.
 *
 *   node tools/savukkeet/savuke-aanet-tausta.mjs
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

/** Hiljainen 8-bittinen wav (8 kHz) — dekoodautuu oikeasti WebAudiossa. */
function hiljainenWav(sekunnit) {
  const taajuus = 8000;
  const naytteita = Math.round(taajuus * sekunnit);
  const tavut = Buffer.alloc(44 + naytteita, 128);
  tavut.write('RIFF', 0, 'ascii');
  tavut.writeUInt32LE(36 + naytteita, 4);
  tavut.write('WAVEfmt ', 8, 'ascii');
  tavut.writeUInt32LE(16, 16);
  tavut.writeUInt16LE(1, 20);
  tavut.writeUInt16LE(1, 22);
  tavut.writeUInt32LE(taajuus, 24);
  tavut.writeUInt32LE(taajuus, 28);
  tavut.writeUInt16LE(1, 32);
  tavut.writeUInt16LE(8, 34);
  tavut.write('data', 36, 'ascii');
  tavut.writeUInt32LE(naytteita, 40);
  return tavut;
}

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

/*
 * Tarkkailu ennen sivun skriptejä:
 *  - soittimet kerätään konstruktorista (ne eivät ole DOMissa),
 *  - äänikontekstit kerätään konstruktorista (tehosteiden ja
 *    lukijaäänen piirit on erotettava toisistaan),
 *  - navigator.audioSession puuttuu Chromiumista,
 *  - speechSynthesis korvataan laskurilla: oikea syntetisaattori ei
 *    kerro perumisistaan mitään mitattavaa.
 */
const TARKKAILU = `
window.__aanet = [];
const AlkuperainenAudio = window.Audio;
window.Audio = function Audio(...a) {
  const el = new AlkuperainenAudio(...a);
  window.__aanet.push(el);
  return el;
};
window.__piirit = [];
for (const nimi of ['AudioContext', 'webkitAudioContext']) {
  const Alku = window[nimi];
  if (typeof Alku !== 'function') continue;
  window[nimi] = function Piiri(...a) {
    const ctx = new Alku(...a);
    window.__piirit.push(ctx);
    return ctx;
  };
}
Object.defineProperty(navigator, 'audioSession', {
  configurable: true,
  value: { _t: 'auto', get type() { return this._t; }, set type(v) { this._t = v; } },
});
window.__synth = {
  puhutut: 0, perutut: 0, tauot: 0, speaking: false, pending: false, paused: false,
  speak() { this.puhutut += 1; this.speaking = true; },
  cancel() { this.perutut += 1; this.speaking = false; },
  pause() { this.tauot += 1; },
  resume() {},
  getVoices() { return []; },
  addEventListener() {},
};
Object.defineProperty(window, 'speechSynthesis', {
  configurable: true, get() { return window.__synth; },
});

/** Hiljaista 8-bittistä wavia halutun sekuntimäärän verran. */
window.__hiljaisuus = (sekunnit) => {
  const taajuus = 8000;
  const naytteita = Math.round(taajuus * sekunnit);
  const tavut = new Uint8Array(44 + naytteita);
  const nakyma = new DataView(tavut.buffer);
  const teksti = (kohta, arvo) => {
    for (let i = 0; i < arvo.length; i += 1) tavut[kohta + i] = arvo.charCodeAt(i);
  };
  teksti(0, 'RIFF');
  nakyma.setUint32(4, 36 + naytteita, true);
  teksti(8, 'WAVEfmt ');
  nakyma.setUint32(16, 16, true);
  nakyma.setUint16(20, 1, true);
  nakyma.setUint16(22, 1, true);
  nakyma.setUint32(24, taajuus, true);
  nakyma.setUint32(28, taajuus, true);
  nakyma.setUint16(32, 1, true);
  nakyma.setUint16(34, 8, true);
  teksti(36, 'data');
  nakyma.setUint32(40, naytteita, true);
  tavut.fill(128, 44);
  let merkit = '';
  for (let i = 0; i < tavut.length; i += 1) merkit += String.fromCharCode(tavut[i]);
  return 'data:audio/wav;base64,' + btoa(merkit);
};

window.__ankkuri = () => window.__aanet.find(
  (a) => (a.src || '').startsWith('data:audio/wav') && a.loop && a.__ankkuriEi !== true,
) ?? null;

/** Näkyvyyden vaihto: sekä visibilityState että hidden, sitten tapahtuma. */
window.__nakyvyys = (tila) => {
  Object.defineProperty(document, 'visibilityState', {
    configurable: true, get: () => tila,
  });
  Object.defineProperty(document, 'hidden', {
    configurable: true, get: () => tila === 'hidden',
  });
  document.dispatchEvent(new Event('visibilitychange'));
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
/*
 * Puhepalvelin (js/packs/pollo-asetukset.js POLLOPALVELIN) mockataan,
 * jotta striimattu lukijaääni toimii ilman verkkoa. Vastaus on kuuden
 * sekunnin hiljaisuutta: luennan on kestettävä yli koko piilo–paluu-
 * kierroksen, muuten se ehtisi loppua omia aikojaan ja mittaus
 * "luenta ei ala itsestään" jäisi tyhjäksi.
 *
 * Reitti rekisteröidään ulkomaailman katkaisun JÄLKEEN: Playwright
 * kokeilee reittejä käänteisessä lisäysjärjestyksessä.
 */
await sivu.route(/matkakirja-pollo/, (reitti) => reitti.fulfill({
  status: 200,
  contentType: 'audio/wav',
  body: hiljainenWav(6),
}));
await sivu.goto(osoite, { waitUntil: 'domcontentloaded' });
await sivu.waitForTimeout(2500);

vaadi('sivu latautui ilman poikkeuksia', virheet.length === 0, virheet.join(' | ').slice(0, 300));

// --- ele: mediakanava ja tehosteet käyntiin ---------------------------------
await sivu.mouse.move(500, 400);
await sivu.mouse.down();
await sivu.mouse.up();
await sivu.waitForTimeout(800);

const alku = await sivu.evaluate(async () => {
  const { sfx } = await import('/js/sound.js');
  sfx.enabled = true;
  sfx.play('click');
  await new Promise((r) => setTimeout(r, 300));
  return { ankkuri: window.__ankkuri()?.paused, tehosteet: sfx.ctx?.state ?? null };
});
vaadi('eleen jälkeen ankkuri soi', alku.ankkuri === false, JSON.stringify(alku));
vaadi('eleen jälkeen tehosteiden konteksti on käynnissä', alku.tehosteet === 'running',
  String(alku.tehosteet));

/*
 * Kaksi omistajatonta soitinta: silmukka (kuten taustamusiikki) ja
 * kertaluontoinen (kuten "Kuuntele näyte"). Kumpikaan ei rekisteröidy
 * taustavahtiin — ne mittaavat turvaverkkoa.
 */
await sivu.evaluate(async () => {
  const tee = (silmukka) => {
    const el = new window.Audio(window.__hiljaisuus(30));
    el.__ankkuriEi = true;
    el.loop = silmukka;
    el.volume = 0;
    el.paattyi = 0;
    el.addEventListener('ended', () => { el.paattyi += 1; });
    return el;
  };
  window.__silmukka = tee(true);
  window.__kerta = tee(false);
  await Promise.all([window.__silmukka.play(), window.__kerta.play()]);
});
await sivu.waitForTimeout(400);

// --- striimattu luenta käyntiin ---------------------------------------------
const luenta = await sivu.evaluate(async () => {
  const lukija = await import('/js/lukija.js');
  const lahti = lukija.lueAaneen('Tokiossa astuin risteykseen. Sade alkoi heti.', null,
    { persoona: 'merkinnat' });
  await new Promise((r) => setTimeout(r, 900));
  const { sfx } = await import('/js/sound.js');
  const piiri = window.__piirit.find((c) => c !== sfx.ctx) ?? null;
  return { lahti, lukee: lukija.lukijaLukee(), piiri: piiri?.state ?? null };
});
vaadi('striimattu luenta lähti käyntiin', luenta.lahti === true, JSON.stringify(luenta));
vaadi('lukijaäänen piiri on hereillä ennen taustaa', luenta.piiri === 'running',
  JSON.stringify(luenta));

// --- PILOON ------------------------------------------------------------------
const piilossa = await sivu.evaluate(async () => {
  window.__nakyvyys('hidden');
  await new Promise((r) => setTimeout(r, 500));
  const { sfx } = await import('/js/sound.js');
  const lukija = await import('/js/lukija.js');
  const vahti = await import('/js/aani-tausta.js');
  const piiri = window.__piirit.find((c) => c !== sfx.ctx) ?? null;
  return {
    taustalla: vahti.taustallaNyt(),
    ankkuri: window.__ankkuri()?.paused,
    tehosteet: sfx.ctx?.state ?? null,
    piiri: piiri?.state ?? null,
    silmukka: window.__silmukka.paused,
    kerta: window.__kerta.paused,
    kertaPaattyi: window.__kerta.paattyi,
    lukee: lukija.lukijaLukee(),
    soivat: window.__aanet.filter((a) => !a.paused).length,
  };
});
vaadi('vahti tietää olevansa taustalla', piilossa.taustalla === true, JSON.stringify(piilossa));
vaadi('ankkuri pysähtyy piilossa', piilossa.ankkuri === true, JSON.stringify(piilossa));
vaadi('tehosteiden konteksti nukkuu piilossa', piilossa.tehosteet === 'suspended',
  String(piilossa.tehosteet));
vaadi('lukijaäänen piiri nukkuu piilossa', piilossa.piiri === 'suspended',
  String(piilossa.piiri));
vaadi('omistajaton silmukka pysähtyy (turvaverkko)', piilossa.silmukka === true,
  JSON.stringify(piilossa));
vaadi('omistajaton kertaääni pysähtyy (turvaverkko)', piilossa.kerta === true,
  JSON.stringify(piilossa));
vaadi('yksikään mediaelementti ei soi piilossa', piilossa.soivat === 0,
  String(piilossa.soivat));
vaadi('kesken jäänyt luenta jää tauolle eikä katoa', piilossa.lukee === true,
  JSON.stringify(piilossa));

// --- ETUALALLE ---------------------------------------------------------------
const takaisin = await sivu.evaluate(async () => {
  window.__nakyvyys('visible');
  await new Promise((r) => setTimeout(r, 700));
  const { sfx } = await import('/js/sound.js');
  const vahti = await import('/js/aani-tausta.js');
  const piiri = window.__piirit.find((c) => c !== sfx.ctx) ?? null;
  return {
    taustalla: vahti.taustallaNyt(),
    ankkuri: window.__ankkuri()?.paused,
    tehosteet: sfx.ctx?.state ?? null,
    piiri: piiri?.state ?? null,
    silmukka: window.__silmukka.paused,
    kerta: window.__kerta.paused,
    kertaPaattyi: window.__kerta.paattyi,
  };
});
vaadi('vahti tietää palanneensa etualalle', takaisin.taustalla === false,
  JSON.stringify(takaisin));
vaadi('ankkuri soi taas', takaisin.ankkuri === false, JSON.stringify(takaisin));
vaadi('tehosteiden konteksti herää', takaisin.tehosteet === 'running',
  String(takaisin.tehosteet));
vaadi('KESKEN JÄÄNYT LUENTA EI ALA ITSESTÄÄN (piiri jää nukkumaan)',
  takaisin.piiri === 'suspended', String(takaisin.piiri));
vaadi('silmukka jatkaa itsestään', takaisin.silmukka === false, JSON.stringify(takaisin));
vaadi('kertaluontoinen ei ala uudestaan', takaisin.kerta === true, JSON.stringify(takaisin));
vaadi('kertaluontoinen sai loppusignaalin (omistaja siivoaa jälkensä)',
  takaisin.kertaPaattyi === 1, JSON.stringify(takaisin));

// --- selaimen syntetisaattori: perutaan, ei tauoteta -------------------------
const synth = await sivu.evaluate(async () => {
  const lukija = await import('/js/lukija.js');
  const puhe = await import('/js/puhe.js');
  lukija.pysaytaLukija();
  // Striimattu lukijaääni pois käytöstä → laitteen oma ääni ottaa luennan.
  puhe.estaPuhe();
  const lahti = lukija.lueAaneen('Kertoja lukee laitteen omalla äänellä.', null,
    { persoona: 'merkinnat' });
  await new Promise((r) => setTimeout(r, 300));
  const ennen = { puhutut: window.__synth.puhutut, perutut: window.__synth.perutut };
  window.__nakyvyys('hidden');
  await new Promise((r) => setTimeout(r, 300));
  const jalkeen = {
    perutut: window.__synth.perutut, tauot: window.__synth.tauot, lukee: lukija.lukijaLukee(),
  };
  window.__nakyvyys('visible');
  await new Promise((r) => setTimeout(r, 300));
  return {
    lahti, ennen, jalkeen, lukeeJalkeen: lukija.lukijaLukee(),
  };
});
vaadi('laitteen ääni otti luennan', synth.lahti === true && synth.ennen.puhutut > 0,
  JSON.stringify(synth));
vaadi('syntetisaattori PERUTAAN taustalle mentäessä',
  synth.jalkeen.perutut > synth.ennen.perutut, JSON.stringify(synth));
vaadi('syntetisaattoria ei jätetä pelkkään taukoon', synth.jalkeen.tauot === 0,
  JSON.stringify(synth));
vaadi('syntetisaattoriluenta päättyy kokonaan', synth.jalkeen.lukee === false,
  JSON.stringify(synth));
vaadi('luenta ei käynnisty itsestään paluussa', synth.lukeeJalkeen === false,
  JSON.stringify(synth));

// --- radion taustatauko on olemassa ja turvallinen kutsua tyhjänä -----------
const radio = await sivu.evaluate(async () => {
  const mod = await import('/js/linssit/radio.js');
  const tyypit = {
    taustalle: typeof mod.taustalleRadio, etualalle: typeof mod.etualalleRadio,
  };
  let heitti = false;
  try {
    mod.taustalleRadio();
    mod.etualalleRadio();
  } catch (e) {
    heitti = String(e);
  }
  return { tyypit, heitti, paalla: mod.paalla(), tauko: mod.tauko() };
});
vaadi('radiolla on taustatauko ja paluu',
  radio.tyypit.taustalle === 'function' && radio.tyypit.etualalle === 'function',
  JSON.stringify(radio));
vaadi('radion taustatauko on turvallinen ilman lähetystä', radio.heitti === false,
  String(radio.heitti));
vaadi('radion taustatauko ei koske pelaajan omaan taukoon', radio.tauko === false,
  JSON.stringify(radio));

// --- pagehide vaientaa myös silloin kun visibilitychange ei ehdi ------------
const poistuma = await sivu.evaluate(async () => {
  const vahti = await import('/js/aani-tausta.js');
  const { sfx } = await import('/js/sound.js');
  await window.__silmukka.play();
  await new Promise((r) => setTimeout(r, 200));
  const ennen = window.__silmukka.paused;
  window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true }));
  await new Promise((r) => setTimeout(r, 300));
  const jalkeen = {
    taustalla: vahti.taustallaNyt(),
    silmukka: window.__silmukka.paused,
    tehosteet: sfx.ctx?.state ?? null,
  };
  window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
  await new Promise((r) => setTimeout(r, 400));
  return { ennen, jalkeen, palasi: vahti.taustallaNyt() };
});
vaadi('silmukka soi ennen pagehidea', poistuma.ennen === false, JSON.stringify(poistuma));
vaadi('pagehide vaientaa kaiken', poistuma.jalkeen.taustalla === true
  && poistuma.jalkeen.silmukka === true && poistuma.jalkeen.tehosteet === 'suspended',
JSON.stringify(poistuma));
vaadi('pageshow palauttaa etualalle', poistuma.palasi === false, JSON.stringify(poistuma));

vaadi('sivu ei kaatunut ajon aikana', virheet.length === 0, virheet.join(' | ').slice(0, 300));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
