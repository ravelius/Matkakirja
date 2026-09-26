// KULTAINEN ÄÄNIJÄLKI (B7): verkkopelin musiikin ja äänimaiseman puhtaat funktiot ja koko
// sekoituksen tapahtumakone ajetaan käsikirjoitetuilla syötteillä, ja tulokset kirjataan
// tiedostoon Kultaiset/aanijalki.json. C#-portti (Assets/Matkakirja/Peli/Aani/) toistaa saman
// testissä Testit/AaniTestit.cs ja vaatii identtisen jäljen (tasot suhteellisella toleranssilla 1e-12).
//
// Käyttö: node Kultaiset/tee-aanijalki.mjs [verkkopelin js-kansio]
//
// Jäljet (B7-spesifikaatio §4):
//   1 ketjut      musiikkivalitsin.js musiikkiketju (tilat syötteenä)
//   2 valinnat    valitseMusiikki (puuttuvien osajoukot)
//   3 alueet      kaupunkimusiikki.js kaupunginAlue
//   4 liuku       musiikinVahvistus × MUSIIKIN_KATTO, musiikinLiuunTeksti
//   5 osoitteet   media.js aaniOsoite / peiliAaniPolku / turvanimi
//   6 jaaAlku     aani-ehdokkaat.js jaaAlku
//   7 korit       kaupunkiKori → maaKori → tyyppiKori (porras kirjataan)
//   8 arvonta     ambience-stream.js arvoAani + hyppaa (aloituskohta) tynkäsoittimella
//   9 vaisto      voimassaVaisto (lisaaVaistaja-kuuntelijasta) ja siirtymamusiikki.js lajinVaisto
//  10 kone        koko sekoitus: ambience-stream.js, siirtymamusiikki.js ja ui.js:n aarreaihe
//                 ajetaan tynkä-Audiolla (malli tests/ambienssi.test.mjs TynkaAudio); jokaisen
//                 tapahtuman jälkeen kirjataan kanavittain soiva osoite, rampin loppuarvo ja kesto.
//
// Math.random on mulberry32 (sama kuin C#:n Satunnainen), joten arvonta toistuu.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const tama = dirname(fileURLToPath(import.meta.url));
const JS = resolve(process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-pelikoodari/js');
const tuo = (nimi) => import(pathToFileURL(join(JS, nimi)).href);
const LAUTA = 'maailmankartta';

// --- tynkäselain (ennen moduulien tuontia) ------------------------------------

const muisti = new Map();
globalThis.localStorage = {
  getItem: (k) => (muisti.has(k) ? muisti.get(k) : null),
  setItem: (k, v) => { muisti.set(k, String(v)); },
  removeItem: (k) => { muisti.delete(k); },
};
globalThis.fetch = () => Promise.reject(new Error('ei verkkoa jäljessä'));

let kello = 0;
let ajastimet = [];
let ajastinId = 1;
globalThis.setTimeout = (fn, ms = 0) => { const id = ajastinId++; ajastimet.push({ id, aika: kello + ms, fn }); return id; };
globalThis.clearTimeout = (id) => { ajastimet = ajastimet.filter((a) => a.id !== id); };
globalThis.setInterval = () => 0;
globalThis.clearInterval = () => {};
function kelloEteenpain(ms) {
  const loppu = kello + ms;
  for (;;) {
    const vuoro = ajastimet.filter((a) => a.aika <= loppu).sort((a, b) => a.aika - b.aika || a.id - b.id)[0];
    if (!vuoro) break;
    ajastimet = ajastimet.filter((a) => a !== vuoro);
    kello = vuoro.aika;
    vuoro.fn();
  }
  kello = loppu;
}
async function mikrotehtavat(kierroksia = 20) { for (let i = 0; i < kierroksia; i++) await Promise.resolve(); }
globalThis.requestAnimationFrame = () => { throw new Error('rAF-polku ei kuulu jälkeen (vahvistin puuttuu)'); };

const dokumentti = new Map();
globalThis.document = {
  hidden: false,
  addEventListener(laji, fn) { if (!dokumentti.has(laji)) dokumentti.set(laji, new Set()); dokumentti.get(laji).add(fn); },
  removeEventListener(laji, fn) { dokumentti.get(laji)?.delete(fn); },
};

let tapahtumaNro = -1; // monesko käsikirjoituksen tapahtuma on menossa (muutosten leima)

/** AudioParam: ramppi kirjataan (kohde, kesto ms, tapahtuma); suora asetus on kesto 0. */
function param(ctx, alku = 0) {
  return {
    _v: alku,
    muutokset: [],
    get value() { return this._v; },
    set value(v) { this._v = v; this.muutokset.push({ t: tapahtumaNro, kohde: v, kesto: 0 }); },
    setValueAtTime(v) { this._v = v; return this; },
    linearRampToValueAtTime(v, t) {
      this._v = v;
      this.muutokset.push({ t: tapahtumaNro, kohde: v, kesto: Math.round((t - ctx.currentTime) * 1000) });
      return this;
    },
    exponentialRampToValueAtTime(v) { this._v = v; return this; },
    setValueCurveAtTime() { return this; },
    cancelScheduledValues() { return this; },
  };
}
function teeKonteksti() {
  const ctx = {
    state: 'running', currentTime: 0, sampleRate: 44100, destination: {},
    resume: () => Promise.resolve(), suspend: () => Promise.resolve(),
    addEventListener() {}, decodeAudioData: () => Promise.reject(new Error('ei dataa')),
  };
  const solmu = (lisa = {}) => Object.assign({ connect: (k) => k, disconnect() {}, start() {}, stop() {} }, lisa);
  ctx.createGain = () => solmu({ gain: param(ctx, 1) });
  ctx.createDynamicsCompressor = () => solmu({
    threshold: param(ctx), knee: param(ctx), ratio: param(ctx), attack: param(ctx), release: param(ctx),
  });
  // Mittari näkee aina ääntä: webin hiljaisuusvahdit (iOS-korjaus) eivät kuulu jälkeen (§2.9).
  ctx.createAnalyser = () => solmu({ fftSize: 256, getFloatTimeDomainData: (d) => d.fill(1), getByteTimeDomainData: (d) => d.fill(255) });
  ctx.createMediaElementSource = () => solmu();
  ctx.createOscillator = () => solmu({ frequency: param(ctx, 440), type: 'sine' });
  ctx.createBufferSource = () => solmu({ buffer: null, loop: false, playbackRate: param(ctx, 1) });
  ctx.createBiquadFilter = () => solmu({ frequency: param(ctx, 1), Q: param(ctx, 1), gain: param(ctx, 0) });
  ctx.createConvolver = () => solmu({ buffer: null });
  ctx.createBuffer = (ch, frames, rate) => ({ length: frames, sampleRate: rate, numberOfChannels: ch, duration: frames / rate, getChannelData: () => new Float32Array(frames) });
  return ctx;
}
const konteksti = teeKonteksti();
globalThis.window = { AudioContext: function Ctx() { return konteksti; } };

const soittimet = [];
let oletusKesto = 180;
class TynkaAudio {
  constructor(src) {
    this._src = ''; this.alkuSrc = ''; this.readyState = 0; this.duration = oletusKesto; this.currentTime = 0;
    this.paused = true; this.ended = false; this.loop = false; this.preload = ''; this.crossOrigin = null;
    this.kuuntelijat = new Map(); this.syntyi = tapahtumaNro; this.vapautettu = null; this._vahvistin = null;
    this.viimeVahvistin = null; this.volume = 1;
    if (src) this.src = src;
    soittimet.push(this);
  }
  get aaniVahvistin() { return this._vahvistin; }
  set aaniVahvistin(v) { this._vahvistin = v; if (v) this.viimeVahvistin = v; }
  get src() { return this._src; }
  set src(v) { this._src = v; if (!this.alkuSrc) this.alkuSrc = v ?? ''; this.readyState = 2; }
  getAttribute(n) { return n === 'src' ? (this._src || null) : null; }
  removeAttribute() { if (this._src && this.vapautettu === null) this.vapautettu = tapahtumaNro; this._src = ''; }
  load() {}
  pause() { if (this.paused) return; this.paused = true; this.laukaise('pause'); }
  play() { this.paused = false; this.ended = false; this.readyState = 4; return Promise.resolve(); }
  addEventListener(l, fn) { if (!this.kuuntelijat.has(l)) this.kuuntelijat.set(l, new Set()); this.kuuntelijat.get(l).add(fn); }
  removeEventListener(l, fn) { this.kuuntelijat.get(l)?.delete(fn); }
  dispatchEvent(e) { if (e.type === 'ended') { this.ended = true; this.paused = true; this.paattyi = tapahtumaNro; } this.laukaise(e.type); return true; }
  laukaise(l) { for (const fn of [...(this.kuuntelijat.get(l) ?? [])]) fn({ type: l }); }
}
globalThis.Audio = TynkaAudio;
// js/aani-tausta.js:n turvaverkko (pysaytaLoput) tuntee soittimet HTMLMediaElementin play-kääreestä.
globalThis.HTMLMediaElement = TynkaAudio;

// --- moduulit ----------------------------------------------------------------

const { mulberry32 } = await tuo('game.js');
const media = await tuo('media.js');
const valitsin = await tuo('musiikkivalitsin.js');
const kmus = await tuo('kaupunkimusiikki.js');
const ehd = await tuo('aani-ehdokkaat.js');
const { MAAILMANKARTTA } = await tuo('packs/maailmankartta.js');
const { onAarre } = await tuo('tokens.js');
const aaniTausta = await tuo('aani-tausta.js');
const { sfx, REAL_SAMPLES } = await tuo('sound.js');
const virta = await tuo('ambience-stream.js');
const siirtyma = await tuo('siirtymamusiikki.js');
const voimat = await tuo('kehittajan-voimat.js');
const vahvistin = await tuo('musiikkivahvistin.js');

const lahde = (nimi) => readFileSync(join(JS, nimi), 'utf8');
/** Poimii lähteestä yhden ylätason määrittelyn (function tai const) sellaisenaan. */
function poimi(tiedosto, kuvio, nimi) {
  const m = lahde(tiedosto).match(kuvio);
  if (!m) throw new Error(`${nimi} puuttuu ${tiedosto}:stä`);
  return m[0];
}

const kaupungit = MAAILMANKARTTA.cities.map((c) => ({ id: c.id, tyyppi: c.ambience ?? null }));
const maat = MAAILMANKARTTA.map.cityCountry;
const VIRTUAALIT = [['etusivu', 'lentoasema'], ['lentomatka', 'lentokone'], ['jalkamatka', 'metsa'], ['merimatka', 'meri']];

// --- vakiot: ne, jotka C# pitää omina vakioinaan (§1.10 kohta 2) ---------------

const OLETUSKORIT = new Function(`${poimi('aani-ehdokkaat.js', /const OLETUSKORIT = \{[^]*?\n\};\n/, 'OLETUSKORIT')} return OLETUSKORIT;`)();
const YHDISTETYT = new Function(`${poimi('aani-ehdokkaat.js', /const YHDISTETYT = \{[^]*?\n\};\n/, 'YHDISTETYT')} return YHDISTETYT;`)();
const VAKIOPAIKAT = [...new Function(`${poimi('ambience-stream.js', /const VAKIOPAIKAT = new Set\([^)]*\);/, 'VAKIOPAIKAT')} return VAKIOPAIKAT;`)()];
const AARRE_MUSIIKKI = new Function('musaPolku', `${poimi('ui.js', /const AARRE_MUSIIKKI = \{[^]*?\n\};\n/, 'AARRE_MUSIIKKI')} return AARRE_MUSIIKKI;`)(media.musaPolku);
// Musiikkisuunnitelma (vaiheet 1–2): matkan aiheet ui.js:stä (aloituslento, loppu, ratkaisu, epaonnistuminen).
const MATKAN_AIHEET = /const MATKAN_AIHEET = \{/.test(lahde('ui.js'))
  ? new Function('musaPolku', `${poimi('ui.js', /const MATKAN_AIHEET = \{[^]*?\n\};\n/, 'MATKAN_AIHEET')} return MATKAN_AIHEET;`)(media.musaPolku)
  : {};

const vakiot = {
  aaniJuuri: media.AANI_JUURI,
  musiikinPaate: media.MUSIIKIN_PAATE,
  pohjaraita: valitsin.POHJARAITA,
  tilaraidat: Object.entries(valitsin.TILARAIDAT).map(([nimi, v]) => ({ nimi, tunnus: v.tunnus })),
  paikkaraidat: Object.entries(valitsin.PAIKKARAIDAT).map(([nimi, v]) => ({ nimi, tunnus: v.tunnus })),
  kaupunkiraidat: Object.keys(kmus.KAUPUNKIRAIDAT),
  kaupunginAlue: kmus.KAUPUNGIN_ALUE,
  alueraidat: Object.keys(kmus.ALUERAIDAT),
  alueenMaat: kmus.ALUEEN_MAAT,
  musiikinPerustaso: valitsin.MUSIIKIN_PERUSTASO,
  musiikinKayra: valitsin.MUSIIKIN_KAYRA,
  musiikinKatto: valitsin.MUSIIKIN_KATTO,
  musiikinLiukuOletus: valitsin.MUSIIKIN_LIUKU_OLETUS,
  siirtymaRaidat: Object.entries(siirtyma.RAIDAT).map(([laji, r]) => ({ laji, ...r })),
  visaOletus: ehd.EHDOKKAAT['musiikki:tietovisa']?.oletus ?? null,
  aarreMusiikki: AARRE_MUSIIKKI,
  vakiopaikat: VAKIOPAIKAT,
  yhdistetyt: YHDISTETYT,
  oletuskorit: OLETUSKORIT,
  kaupunkiEhdokkaat: Object.fromEntries(Object.entries(ehd.KAUPUNKI_EHDOKKAAT).map(([lauta, t]) => [lauta,
    Object.fromEntries(Object.entries(t).map(([id, l]) => [id, l.map((e) => (e.alku ? { url: e.url, alku: e.alku } : { url: e.url }))]))])),
  kaupungit: kaupungit.map((k) => [k.id, k.tyyppi, maat[k.id] ?? null]),
  // Musiikkisuunnitelma vaihe 2 (26.9.2026): maanosat, maanosaraidat, saapumistunnukset, visan alle jäävät tilat.
  maanosat: kmus.MAANOSAT ?? [],
  alueenMaanosa: kmus.ALUEEN_MAANOSA ?? {},
  maanMaanosa: kmus.MAAN_MAANOSA ?? {},
  maanosaraidat: Object.keys(kmus.MAANOSARAIDAT ?? {}),
  saapumistunnukset: Object.fromEntries(Object.entries(kmus.SAAPUMISTUNNUKSET ?? {}).map(([k, v]) => [k, media.musaPolku(v)])),
  visanAlleJaavat: valitsin.VISAN_ALLE_JAAVAT ?? [],
  matkanAiheet: MATKAN_AIHEET,
};

// --- 1. ketjut ---------------------------------------------------------------

// Soittimet eivät saa syntyä puhtaiden jälkien aikana (tilan vaihto herättää pohjaraidan kuuntelijan).
sfx.enabled = false;
sfx.loadRealSamples = () => {};
const TILAJOUKOT = [[], ['lehti'], ['matkalaukku'], ['lehti', 'matkalaukku'], ['matkalaukku', 'lehti', 'pollo'],
  ['kohtaaminen'], ['kohtaaminen', 'matkalaukku', 'lehti']];
// Vaihe 2: visan raita soi (asetaVisaSoi) — kohtaaminen odottaa ketjussa (VISAN_ALLE_JAAVAT), lehti ei.
const VISAJOUKOT = [['kohtaaminen'], ['kohtaaminen', 'lehti']];
const PAIKAT = [...kaupungit.map((k) => [k.id, maat[k.id] ?? null]), ...VIRTUAALIT.map(([p]) => [p, null]),
  [null, null], ['marseille', null], ['ateena', null], ['tuntematon', 'GRC'], ['tuntematon', 'XXX'], ['etusivu', 'FIN']];
function asetaTilat(tilat) {
  for (const n of Object.keys(valitsin.TILARAIDAT)) valitsin.asetaMusiikkitila(n, false);
  for (const n of tilat) valitsin.asetaMusiikkitila(n, true);
}
const ketjut = TILAJOUKOT.map((tilat) => {
  asetaTilat(tilat);
  return { tilat, rivit: PAIKAT.map(([p, maa]) => [p, maa, valitsin.musiikkiketju(p, maa)]) };
});
if (valitsin.asetaVisaSoi) {
  for (const tilat of VISAJOUKOT) {
    asetaTilat(tilat);
    valitsin.asetaVisaSoi(true);
    ketjut.push({ tilat, visaSoi: true, rivit: PAIKAT.map(([p, maa]) => [p, maa, valitsin.musiikkiketju(p, maa)]) });
    valitsin.asetaVisaSoi(false);
  }
}

// --- 2. valinnat -------------------------------------------------------------

const valinnat = [];
for (const [tilat, p] of [[['lehti'], 'ateena'], [['lehti', 'matkalaukku'], 'etusivu'], [[], 'lontoo'], [[], 'kairo'], [['matkalaukku'], 'marseille']]) {
  asetaTilat(tilat);
  const ketju = valitsin.musiikkiketju(p, maat[p] ?? null);
  for (let maski = 0; maski < (1 << ketju.length); maski++) {
    const puuttuvat = ketju.filter((_, i) => maski & (1 << i));
    valinnat.push({ ketju, puuttuvat, valinta: valitsin.valitseMusiikki(new Set(puuttuvat), p, maat[p] ?? null) });
  }
}
asetaTilat([]);

// --- 3. alueet ---------------------------------------------------------------

// Neljäs sarake (vaihe 2): kaupunginMaanosa.
const alueet = PAIKAT.map(([p, maa]) => [p, maa, kmus.kaupunginAlue(p, maa), kmus.kaupunginMaanosa?.(p, maa) ?? null]);

// --- 4. liuku ----------------------------------------------------------------

const LIUT = [];
for (let x = -5; x <= 105; x += 0.5) LIUT.push(x);
LIUT.push(43.5, 35.4, 35.49, 0.2, 0.5, 99.5, 100.4, -0.4, -0.5, NaN, Infinity, -Infinity);
const liuku = LIUT.map((x) => ({
  liuku: Number.isFinite(x) ? x : String(x),
  kerroin: valitsin.musiikinVahvistus(x) * valitsin.MUSIIKIN_KATTO,
  teksti: valitsin.musiikinLiuunTeksti(x),
}));

// --- 5. osoitteet ------------------------------------------------------------

const osoiteSyotteet = new Set();
for (const { rivit } of ketjut) for (const [, , k] of rivit) k.forEach((p) => osoiteSyotteet.add(p));
for (const r of Object.values(siirtyma.RAIDAT)) { osoiteSyotteet.add(r.ampari); osoiteSyotteet.add(r.oma); }
for (const n of Object.values(REAL_SAMPLES)) if (n?.url) osoiteSyotteet.add(n.url);
for (const l of Object.values(OLETUSKORIT)) l.forEach((u) => osoiteSyotteet.add(u));
for (const t of Object.values(ehd.KAUPUNKI_EHDOKKAAT)) for (const l of Object.values(t)) l.forEach((e) => osoiteSyotteet.add(e.url));
Object.values(AARRE_MUSIIKKI).forEach((u) => osoiteSyotteet.add(u));
if (vakiot.visaOletus) osoiteSyotteet.add(vakiot.visaOletus);
for (const u of [
  null, '', 'https://example.com/x.mp3', 'https://archive.org/details/aporee_1_2', 'https://cdn.freesound.org/previews/713/713120_14632469-lq.mp3',
  'http://cdn.freesound.org/previews/1/99_2-hq.ogg?x=1#alku=3', 'https://archive.org/download/aporee_9_9/Ääni Tiedosto.WAV',
  'https://archive.org/download/aporee_9_9/nimi.flac2', 'https://archive.org/download/aporee_9_9/nimi', 'https://archive.org/download/Δοκιμή/x.mp3',
  'https://archive.org/download/東京/x.mp3', 'https://archive.org/download/aporee_9_9/a/b.mp3', './assets/audio/musa-pohja-lyria.mp3',
  '/assets/audio/efekti-klik.mp3', 'assets/audio/efekti-klik.mp3?v=3', 'assets/audio/', 'assets/kuvat/x.jpg', 'musa-pohja',
]) osoiteSyotteet.add(u);
const osoitteet = [...osoiteSyotteet].map((u) => ({ syote: u ?? null, url: media.aaniOsoite(u) ?? null, peili: media.peiliAaniPolku(u) }));
const TURVANIMET = ['Ääni Tiedosto', '  --a__b..c--  ', 'Тебердинский заповедник. Вид', '玉珠峰雪山 02', '昆仑山 02', 'x'.repeat(120),
  'Crème Brûlée', 'ǅemal Ŀ', 'aporee-aporee_40377_46111', '', '🎵 music 🎵', 'Łódź', 'ß'];
const turvanimet = TURVANIMET.flatMap((t) => [null, 'mp3'].map((pate) => ({ teksti: t, pate, nimi: media.turvanimi(t, pate) })));

// --- 6. jaaAlku --------------------------------------------------------------

const alkuSyotteet = new Set([null, '', '#', '#alku', '#alku=x', 'u#alku=20', 'u#alku=20&voima=1.5', 'u#voima=0.05', 'u#voima=0',
  'u#alku=-5', 'u#alku=1=2', 'a#b#alku=3', 'u#alku=1&alku=7', 'u#alku=0x10&voima=1e1', 'u#alku= 12 &voima=', 'u#alku=Infinity',
  'u#voima=-3', 'u#&&alku=4&', 'u#alku=12.75&voima=2.25', 'u?q=1#alku=5', 'u#voima=abc', 'u#alku=1_0', 'u#alku=.5', 'u#alku=5.',
  'u#alku=+7', 'u#alku=0b11', 'u#alku=0o7', 'u#voima=1E-1', 'u#alku=\t8\n']);
for (const l of Object.values(OLETUSKORIT)) l.forEach((u) => alkuSyotteet.add(u));
for (const t of Object.values(ehd.KAUPUNKI_EHDOKKAAT)) for (const l of Object.values(t)) l.forEach((e) => alkuSyotteet.add(e.url));
const jaaAlku = [...alkuSyotteet].map((a) => ({ syote: a, ...ehd.jaaAlku(a) }));

// --- 7. korit ----------------------------------------------------------------

function kori(lauta, paikka, tyyppi, cityCountry) {
  const oma = ehd.kaupunkiKori(lauta, paikka);
  if (oma.length) return { porras: 'kaupunki', kori: oma };
  const maa = ehd.maaKori(lauta, paikka, cityCountry);
  if (maa.length) return { porras: 'maa', kori: maa };
  const tk = tyyppi ? ehd.tyyppiKori(tyyppi, lauta) : [];
  return tk.length ? { porras: 'tyyppi', kori: tk } : { porras: null, kori: [] };
}
const koriSyotteet = [
  ...kaupungit.map((k) => [LAUTA, k.id, k.tyyppi, true]),
  ...VIRTUAALIT.map(([p, t]) => [LAUTA, p, t, false]),
  ['europe', 'lontoo', 'kaupunki', true], ['europe', 'manchester', 'kaupunki', true], ['africa', 'lontoo', 'kaupunki', true],
  ['maailma', 'istanbul', 'basaari', true], [LAUTA, 'tuntematon', 'avaruus', true], [LAUTA, 'tuntematon', null, true],
  [LAUTA, 'lontoo', null, false], [LAUTA, 'kairo', 'aavikko', false],
];
const korit = koriSyotteet.map(([lauta, paikka, tyyppi, mailla]) => ({ lauta, paikka, tyyppi, maat: mailla, ...kori(lauta, paikka, tyyppi, mailla ? maat : null) }));

// --- 8–10: tapahtumakone tynkäsoittimilla ------------------------------------

// --- tehosteet: REAL_PLAYERS-siivut sellaisinaan (Tehostetaulu, §1.8) ----------------

const TEHOSTENIMET = ['dieTick', 'dieLand', 'pen', 'quizOpen', 'click', 'paper', 'coin', 'correct', 'wrong', 'swipe', 'step', 'arrive',
  'ferry', 'flight', 'hint', 'kupla', 'popup', 'tick', 'timeout', 'flip', 'clack', 'star', 'gem', 'empty', 'stuck', 'turn', 'win'];
const MASTER_PERUSTASO = new Function(`${poimi('sound.js', /const MASTER_PERUSTASO = [^;]*;/, 'MASTER_PERUSTASO')} return MASTER_PERUSTASO;`)();
let siivu = null;
sfx.enabled = true;
sfx.taustaTauko = false;
const oikeaSiivu = sfx.playSlice;
sfx.playSlice = (naytte, o = {}) => { siivu = { naytte, ...o }; return true; };
const tehosteet = TEHOSTENIMET.map((nimi) => {
  siivu = null;
  sfx.play(nimi);
  if (!siivu) throw new Error(`tehoste ${nimi} ei soita siivua`);
  const o = siivu;
  return {
    nimi, naytte: o.naytte, url: media.aaniOsoite(REAL_SAMPLES[o.naytte]?.url ?? null) ?? null,
    dur: o.dur ?? 0.1, gain: o.gain ?? 0.3, tail: o.tail ?? null, alusta: Boolean(o.alusta), isku: Boolean(o.isku),
    tasavire: Boolean(o.tasavire), vire: o.vire ?? null, delay: o.delay ?? 0,
  };
});
sfx.playSlice = oikeaSiivu;
const lento = { url: media.aaniOsoite(REAL_SAMPLES.jet.url) };
const AARRETYYPIT = [...new Function(`${poimi('tokens.js', /export const AARRETYYPIT = new Set\([^)]*\);/, 'AARRETYYPIT').replace('export ', '')} return AARRETYYPIT;`)()];

sfx.enabled = true;
sfx.play = () => {};          // tehosteet eivät kuulu tähän jälkeen (Tehostetaulu erikseen)
sfx.setAmbience = () => {};   // synteesiä ei portata (§2.10)
sfx.vaimennaAmbienssi = () => {};
sfx.loadRealSamples = () => {}; // näytteiden haku (verkko, uusintayritysten arpa) ei kuulu jälkeen
sfx.ensureContext();          // masteriketju (ja sen kohina) ennen arvontaa: ei kuluta arpaa kesken jäljen
if (sfx.ctx !== konteksti) throw new Error('äänikonteksti ei ole tynkä');

let arpa = mulberry32(1);
let arpoja = 0;
Math.random = () => { arpoja++; return arpa(); };

// ui.js:n aarreaihe (soitaAarreMusiikki / pysaytaAarreMusiikki) lähdetekstinä pieneen olioon.
const metodi = (nimi) => poimi('ui.js', new RegExp(`\\n  ${nimi}\\([^)]*\\) \\{[^]*?\\n  \\}\\n`), nimi);
const AARRE_MUSIIKIN_VOIMA_L = poimi('ui.js', /const AARRE_MUSIIKIN_VOIMA = [^;]*;/, 'AARRE_MUSIIKIN_VOIMA');
const AARRE_MUSIIKIN_SYY_L = poimi('ui.js', /const AARRE_MUSIIKIN_SYY = [^;]*;/, 'AARRE_MUSIIKIN_SYY');
const aiheLauseke = poimi('ui.js', /const aihe = onAarre\(type\)[^;]*;/, 'aihe');
const Aarre = new Function('sfx', 'musiikkiPaalla', 'aaniUrl', 'liitaMusiikkiin', 'asetaMusiikinTaso', 'MUSIIKIN_PERUSTASO',
  'musiikinKerroin', 'hiljennaAmbienssi', 'palautaAmbienssi', 'kuunteleMusiikinKerrointa', 'musiikkiSaaSoida',
  'irrotaMusiikinVahvistin', 'onAarre', 'AARRE_MUSIIKKI', `${AARRE_MUSIIKIN_VOIMA_L}\n${AARRE_MUSIIKIN_SYY_L}
  return class { ${metodi('soitaAarreMusiikki')} ${metodi('pysaytaAarreMusiikki')}
    aiheTyypille(type) { ${aiheLauseke} return aihe; }
    // Matkan loppu (vaihe 1) vaatii kaikki pääaarteet löydetyiksi; jäljen koneessa niitä ei ole.
    ajastaMatkanLoppu() {} };`)(
  sfx, valitsin.musiikkiPaalla, media.aaniUrl, vahvistin.liitaMusiikkiin, vahvistin.asetaMusiikinTaso, valitsin.MUSIIKIN_PERUSTASO,
  valitsin.musiikinKerroin, virta.hiljennaAmbienssi, virta.palautaAmbienssi, valitsin.kuunteleMusiikinKerrointa,
  vahvistin.musiikkiSaaSoida, vahvistin.irrotaMusiikinVahvistin, onAarre, AARRE_MUSIIKKI);
const ui = new Aarre();

/** Soittimen kanava alkuperäisestä osoitteesta. */
function kanava(a) {
  const s = a.alkuSrc;
  if (/musa-(aarre|paaaarre)-/.test(s)) return 'aarre';
  if (/musa-visa|713120_/.test(s)) return 'visa';
  if (/\/audio\/musa-/.test(s)) return 'pohja';
  if (/(siirtyma|linssi)-[a-z-]+-lyria/.test(s)) return 'siirtyma';
  return 'maisema';
}
const KANAVAT = ['pohja', 'maisema', 'visa', 'siirtyma', 'aarre'];
// Virheen saanut soitin, jonka osoite ei vaihtunut varareittiin, on mykkä (web: luovuta ilman vapautusta).
const kuollut = (a) => a.ended || (a.virheSrc != null && a.virheSrc === a.getAttribute('src'));
const elava = (a) => a.getAttribute('src') && !kuollut(a);
const muutokset = (a) => a.viimeVahvistin?.gain.muutokset ?? [];

/** Kanavien tila tapahtuman jälkeen: soiva osoite, taso, tämän tapahtuman ramppi, uusi, pois, tauko. */
function tila() {
  const ulos = {};
  for (const k of KANAVAT) {
    const omat = soittimet.filter((a) => kanava(a) === k);
    const soivat = omat.filter(elava);
    if (soivat.length > 1) throw new Error(`kanavalla ${k} soi ${soivat.length} soitinta`);
    const a = soivat[0] ?? null;
    const pois = omat.filter((b) => b.vapautettu === tapahtumaNro
      || (b.getAttribute('src') && kuollut(b) && (b.paattyi === tapahtumaNro || b.virheT === tapahtumaNro)));
    let poisMs = null;
    for (const b of pois) {
      const m = muutokset(b).filter((x) => x.t === tapahtumaNro && x.kesto > 0);
      const viim = m[m.length - 1];
      const ms = viim && viim.kohde === 0 ? viim.kesto : 0;
      poisMs = Math.max(poisMs ?? 0, ms);
    }
    const tamat = a ? muutokset(a).filter((x) => x.t === tapahtumaNro) : [];
    const viimeinen = tamat[tamat.length - 1];
    ulos[k] = {
      url: a ? a.getAttribute('src') : null,
      taso: a ? (a.viimeVahvistin?.gain.value ?? null) : null,
      kesto: viimeinen ? viimeinen.kesto : null,
      uusi: a ? a.syntyi === tapahtumaNro : false,
      pois: poisMs,
      tauko: a ? a.paused : false,
      alku: a ? a.currentTime : null,
      silmukka: a ? a.loop : false,
    };
  }
  return ulos;
}

// Webin kutsut natiivin tapahtumille (spesifikaatio §3; linssi §3 loppu, Raamatun mukaan).
let paikka = null;
let tyyppi = null;
let visaAuki = false;
let pito = null;
const kanavanSoitin = (k) => soittimet.filter((a) => kanava(a) === k && elava(a))[0];
function soitaPaikka() {
  if (!paikka) virta.playPlaceAmbience(null, null);
  else virta.playPlaceAmbience(paikka, tyyppi, LAUTA, maat);
}
const TOIMINNOT = {
  paikka: (e) => { paikka = e.paikka; tyyppi = e.tyyppi ?? null; soitaPaikka(); },
  kesto: (e) => { const a = kanavanSoitin('maisema'); a.duration = e.s; a.laukaise('loadedmetadata'); },
  // Kierroksen vaihto: uusi soitin saa metatiedot heti (sama kesto), jolloin hyppaa asettaa kohdan #alku.
  silmukka: () => {
    const a = kanavanSoitin('maisema');
    a.currentTime = a.duration - 1;
    a.laukaise('timeupdate');
    const uusi = soittimet[soittimet.length - 1];
    if (uusi !== a) { uusi.duration = a.duration; uusi.laukaise('loadedmetadata'); }
  },
  tila: (e) => valitsin.asetaMusiikkitila(e.nimi, e.auki),
  hiljennys: (e) => (e.auki ? virta.hiljennaAmbienssi(e.syy) : virta.palautaAmbienssi(e.syy)),
  puhe: (e) => (e.auki ? virta.puheAlkoi() : virta.puheLoppui()),
  nayte: (e) => (e.auki ? virta.vaimennaTausta() : virta.palautaTausta()),
  visa: (e) => { visaAuki = e.auki; if (e.auki) virta.startQuizMusic(LAUTA); else virta.stopQuizMusic(); },
  siirtyma: (e) => (e.laji ? siirtyma.aloitaSiirtymamusiikki(e.laji) : siirtyma.lopetaSiirtymamusiikki()),
  himmennys: (e) => siirtyma.himmennaSiirtymamusiikki(e.kerroin),
  linssi: (e) => {
    if (e.auki) {
      pito = virta.pidaMusiikkiKiinni();
      virta.hiljennaAmbienssi('linssi');
      virta.stopPlaceStream();
    } else {
      pito?.pura();
      pito = null;
      virta.palautaAmbienssi('linssi');
      soitaPaikka();
    }
  },
  musiikki: (e) => {
    valitsin.asetaMusiikkiPaalla(e.auki);
    if (!e.auki) {
      virta.stopPohjaMusiikki(); virta.stopQuizMusic(); siirtyma.lopetaSiirtymamusiikki(); ui.pysaytaAarreMusiikki();
      return;
    }
    if (!sfx.enabled) return;
    virta.kaynnistaPohjaMusiikki();
    if (visaAuki) virta.startQuizMusic(LAUTA);
  },
  aanimaisema: (e) => {
    if (!e.auki) {
      sfx.setEnabled(false);
      virta.stopPlaceStream(); virta.stopQuizMusic(); virta.stopPohjaMusiikki(); siirtyma.lopetaSiirtymamusiikki();
      ui.pysaytaAarreMusiikki();
      return;
    }
    sfx.setEnabled(true);
    soitaPaikka();
    if (visaAuki) virta.startQuizMusic(LAUTA);
  },
  liuku: (e) => valitsin.asetaMusiikinLiuku(e.arvo),
  tausta: (e) => voimat.asetaKehittajanKerroin('tausta', e.arvo),
  puuttuu: (e) => { const a = kanavanSoitin(e.kanava); a.virheSrc = a.getAttribute('src'); a.virheT = tapahtumaNro; a.laukaise('error'); },
  aarre: (e) => { const aihe = ui.aiheTyypille(e.tyyppi); if (aihe) ui.soitaAarreMusiikki(aihe); },
  aarreLoppui: () => kanavanSoitin('aarre').dispatchEvent({ type: 'ended' }),
  avaus: (e) => (e.auki ? virta.aloitaAvauksenAani() : virta.lopetaAvauksenAani()),
  taustalle: (e) => (e.auki ? aaniTausta.hiljennaTaustalle() : aaniTausta.palautaEtualalle()),
  uusiMatka: () => { virta.stopPlaceStream(); virta.stopQuizMusic(); virta.stopPohjaMusiikki(); siirtyma.lopetaSiirtymamusiikki(); visaAuki = false; },
};

async function aja(kasikirjoitus, siemen) {
  arpa = mulberry32(siemen);
  const askeleet = [];
  for (const e of kasikirjoitus) {
    tapahtumaNro += 1;
    arpoja = 0;
    // Ennen kutsua päättyneet (aarreLoppui merkitsee omansa) eivät kuulu tähän tapahtumaan.
    TOIMINNOT[e.e](e);
    await mikrotehtavat();
    kelloEteenpain(20000); // häivytykset loppuun ja väistyvät soittimet vapaiksi
    await mikrotehtavat();
    askeleet.push({ ...e, arpoja, kanavat: tila() });
  }
  return askeleet;
}

// --- 10. kone ----------------------------------------------------------------

const KONE = [
  // Aloitusnäkymä ja avaus
  { e: 'paikka', paikka: 'etusivu', tyyppi: 'lentoasema' },
  { e: 'kesto', s: 300 },
  { e: 'avaus', auki: true },
  { e: 'puhe', auki: true },
  { e: 'hiljennys', syy: 'pollo', auki: true },
  { e: 'hiljennys', syy: 'pollo', auki: false },
  { e: 'puhe', auki: false },
  { e: 'avaus', auki: false },
  { e: 'avaus', auki: false },
  // Avauslento
  { e: 'paikka', paikka: 'lentomatka', tyyppi: 'lentokone' },
  { e: 'siirtyma', laji: 'lento' },
  { e: 'siirtyma', laji: 'lento' },
  { e: 'paikka', paikka: 'lontoo', tyyppi: 'kaupunki' },
  { e: 'siirtyma', laji: null },
  { e: 'kesto', s: 600 },
  // Lehti ja matkalaukku kaupungissa
  { e: 'hiljennys', syy: 'lehti', auki: true },
  { e: 'tila', nimi: 'matkalaukku', auki: true },
  { e: 'hiljennys', syy: 'lehti', auki: false },
  { e: 'nayte', auki: true },
  { e: 'nayte', auki: false },
  { e: 'tila', nimi: 'matkalaukku', auki: false },
  { e: 'tila', nimi: 'tuntematon', auki: true },
  // Visa ja kertoja (visahavainto §2.3)
  { e: 'visa', auki: true },
  { e: 'puhe', auki: true },
  { e: 'puhe', auki: true },
  { e: 'puhe', auki: false },
  { e: 'puhe', auki: false },
  { e: 'puhe', auki: false },
  { e: 'visa', auki: true },
  { e: 'liuku', arvo: 60 },
  { e: 'hiljennys', syy: 'pollo', auki: true },
  { e: 'visa', auki: false },
  { e: 'hiljennys', syy: 'pollo', auki: false },
  { e: 'liuku', arvo: 35 },
  // Kohtaaminen (vaihe 2, js/visa.js): tervehdyssivu, kysymyssivu (visa voittaa), tulos, sulku; ilman tervehdystä
  // visa ensin ja kohtaaminen sen alle, sulku kohtaaminen ennen visaa. Lehti kohtaamisen päällä voittaa.
  { e: 'tila', nimi: 'kohtaaminen', auki: true },
  { e: 'visa', auki: true },
  { e: 'visa', auki: false },
  { e: 'hiljennys', syy: 'lehti', auki: true },
  { e: 'hiljennys', syy: 'lehti', auki: false },
  { e: 'tila', nimi: 'kohtaaminen', auki: false },
  { e: 'visa', auki: true },
  { e: 'tila', nimi: 'kohtaaminen', auki: true },
  { e: 'tila', nimi: 'kohtaaminen', auki: false },
  { e: 'visa', auki: false },
  // Aarre
  { e: 'aarre', tyyppi: 'pieniAarre' },
  { e: 'liuku', arvo: 50 },
  { e: 'aarre', tyyppi: 'star' },
  { e: 'aarreLoppui' },
  { e: 'aarre', tyyppi: 'empty' },
  { e: 'liuku', arvo: 35 },
  // Jalkamatka ja meri
  { e: 'siirtyma', laji: 'jalan' },
  { e: 'paikka', paikka: 'jalkamatka', tyyppi: 'metsa' },
  { e: 'paikka', paikka: null },
  { e: 'siirtyma', laji: 'laiva' },
  { e: 'paikka', paikka: 'merimatka', tyyppi: 'meri' },
  { e: 'kesto', s: 400 },
  { e: 'silmukka' },
  { e: 'puhe', auki: true },
  { e: 'puhe', auki: false },
  { e: 'paikka', paikka: 'marseille', tyyppi: 'satama' },
  { e: 'siirtyma', laji: null },
  { e: 'paikka', paikka: 'ateena', tyyppi: 'kaupunki' },
  { e: 'paikka', paikka: 'ateena', tyyppi: 'kaupunki' },
  // Puuttuvat raidat
  { e: 'puuttuu', kanava: 'pohja' },
  { e: 'puuttuu', kanava: 'pohja' },
  { e: 'hiljennys', syy: 'lehti', auki: true },
  { e: 'puuttuu', kanava: 'pohja' },
  { e: 'hiljennys', syy: 'lehti', auki: false },
  { e: 'paikka', paikka: 'lontoo', tyyppi: 'kaupunki' },
  { e: 'puuttuu', kanava: 'maisema' },
  { e: 'siirtyma', laji: 'laiva' },
  { e: 'puuttuu', kanava: 'siirtyma' },
  { e: 'puuttuu', kanava: 'siirtyma' },
  { e: 'siirtyma', laji: 'laiva' },
  { e: 'siirtyma', laji: 'jalan' },
  { e: 'visa', auki: true },
  { e: 'puuttuu', kanava: 'visa' },
  { e: 'visa', auki: false },
  // Linssi (pito, hiljennys, oma raita, himmennys)
  { e: 'linssi', auki: true },
  { e: 'siirtyma', laji: 'keksinnot' },
  { e: 'himmennys', kerroin: 0.5 },
  { e: 'puhe', auki: true },
  { e: 'hiljennys', syy: 'pollo', auki: true },
  { e: 'puhe', auki: false },
  { e: 'hiljennys', syy: 'pollo', auki: false },
  { e: 'musiikki', auki: false },
  { e: 'musiikki', auki: true },
  { e: 'tila', nimi: 'matkalaukku', auki: true },
  { e: 'tila', nimi: 'matkalaukku', auki: false },
  { e: 'siirtyma', laji: 'ihmisen-matka' },
  { e: 'himmennys', kerroin: 7 },
  { e: 'siirtyma', laji: null },
  { e: 'linssi', auki: false },
  { e: 'kesto', s: 90 },
  // Kytkimet ja säätimet
  { e: 'musiikki', auki: false },
  { e: 'visa', auki: true },
  { e: 'musiikki', auki: true },
  { e: 'aanimaisema', auki: false },
  { e: 'paikka', paikka: 'pariisi', tyyppi: 'kaupunki' },
  { e: 'aanimaisema', auki: true },
  { e: 'visa', auki: false },
  { e: 'tausta', arvo: 0.5 },
  { e: 'liuku', arvo: 0 },
  { e: 'liuku', arvo: 100 },
  { e: 'liuku', arvo: 35 },
  { e: 'tausta', arvo: 1 },
  // Taustalle ja takaisin
  { e: 'siirtyma', laji: 'jalan' },
  { e: 'aarre', tyyppi: 'isoAarre' },
  { e: 'taustalle', auki: true },
  { e: 'paikka', paikka: 'berliini', tyyppi: 'kaupunki' },
  { e: 'taustalle', auki: false },
  { e: 'kesto', s: 240 },
  { e: 'siirtyma', laji: null },
  { e: 'taustalle', auki: true },
  { e: 'taustalle', auki: false },
  // Etusivun avaus hiljennyksen kanssa ja uusi matka
  { e: 'paikka', paikka: 'etusivu', tyyppi: 'lentoasema' },
  { e: 'hiljennys', syy: 'lehti', auki: true },
  { e: 'avaus', auki: true },
  { e: 'avaus', auki: true },
  { e: 'hiljennys', syy: 'lehti', auki: false },
  { e: 'avaus', auki: false },
  { e: 'visa', auki: true },
  { e: 'uusiMatka' },
  { e: 'paikka', paikka: 'kairo', tyyppi: 'aavikko' },
  { e: 'paikka', paikka: 'tuntematon', tyyppi: 'avaruus' },
  { e: 'paikka', paikka: null },
];
const kone = { siemen: 7, lauta: LAUTA, askeleet: await aja(KONE, 7) };
TOIMINNOT.uusiMatka({});
await mikrotehtavat(); kelloEteenpain(20000); await mikrotehtavat();

// Kone ajetaan ensin puhtaasta tilasta; arvonta ja väistö jatkavat samoilla moduuleilla sen jälkeen.
// --- 8. arvonta: maiseman valinta ja aloituskohta (sama kone, vain maisemakanava) ---

const ARVONTA = [];
for (const [p, t, s] of [['etusivu', 'lentoasema', 300], ['lontoo', 'kaupunki', 400], ['lontoo', 'kaupunki', 400], ['pariisi', 'kaupunki', 30],
  ['kairo', 'aavikko', 200], ['kairo', 'aavikko', 200], ['lontoo', 'kaupunki', 49], ['lontoo', 'kaupunki', 60], ['istanbul', 'basaari', 1000],
  ['merimatka', 'meri', 500], ['jalkamatka', 'metsa', 700], ['lentomatka', 'lentokone', 700], ['dublin', 'kaupunki', 95], ['helsinki', 'pohjoinen', 51],
  ['sydney', 'satama', 80], ['rio', 'sademetsa', 3000], ['edinburgh', 'kaupunki', 50.5], ['nairobi', 'savanni', 120]]) {
  ARVONTA.push({ e: 'paikka', paikka: p, tyyppi: t });
  ARVONTA.push({ e: 'kesto', s });
}
const arvontaAskeleet = await aja(ARVONTA, 20260924);
const arvonta = {
  siemen: 20260924,
  askeleet: arvontaAskeleet.map((a) => ({ e: a.e, paikka: a.paikka ?? null, tyyppi: a.tyyppi ?? null, s: a.s ?? null, arpoja: a.arpoja,
    url: a.kanavat.maisema.url, alku: a.kanavat.maisema.alku })),
};
TOIMINNOT.uusiMatka({});
await mikrotehtavat(); kelloEteenpain(20000); await mikrotehtavat();

// --- 9. väistö ---------------------------------------------------------------

let viimeVaisto = null;
virta.lisaaVaistaja((kerroin, kesto, tiedot) => { viimeVaisto = { kerroin, kesto, syyt: [...(tiedot?.syyt ?? [])], pohja: tiedot?.pohja ?? null }; });
const lajinVaisto = new Function('RAIDAT', 'LINSSIN_HILJENNYS', 'tila', `
  const { siirtymanVaisto, vaistonSyyt, vaistonPohja } = tila;
  ${poimi('siirtymamusiikki.js', /function lajinVaisto\(laji\) \{[^]*?\n\}\n/, 'lajinVaisto')}
  return lajinVaisto;`);
const vaisto = [];
const PYYNNOT = [['puhe', () => virta.puheAlkoi(), () => virta.puheLoppui()], ['nayte', () => virta.vaimennaTausta(), () => virta.palautaTausta()],
  ['nayte0.5', () => virta.vaimennaTausta(0.5), () => virta.palautaTausta()], ['nayte12', () => virta.vaimennaTausta(12), () => virta.palautaTausta()],
  ['nayte0', () => virta.vaimennaTausta(0), () => virta.palautaTausta()], ['ei', () => {}, () => {}]];
const SYYJOUKOT = [[], ['lehti'], ['linssi'], ['lehti', 'linssi'], ['pollo'], ['aarremusiikki', 'pollo', 'linssi']];
for (const [nimi, alku, loppu] of PYYNNOT) {
  for (const syyt of SYYJOUKOT) {
    alku();
    for (const s of syyt) virta.hiljennaAmbienssi(s);
    const v = { ...viimeVaisto };
    const lajit = Object.fromEntries(Object.keys(siirtyma.RAIDAT).map((laji) => [laji,
      lajinVaisto(siirtyma.RAIDAT, siirtyma.LINSSIN_HILJENNYS, { siirtymanVaisto: v.kerroin, vaistonSyyt: v.syyt, vaistonPohja: v.pohja })(laji)]));
    vaisto.push({ pyynto: nimi, syyt, pyydetty: v.pohja, voimassa: v.kerroin, lajit });
    for (const s of syyt) virta.palautaAmbienssi(s);
    loppu();
  }
}
virta.nollaaPuhujat();
await mikrotehtavat(); kelloEteenpain(20000); await mikrotehtavat();

// --- kirjoitus ---------------------------------------------------------------

const jalki = {
  kuvaus: 'tee-aanijalki.mjs: musiikkivalitsin, kaupunkimusiikki, media, aani-ehdokkaat, ambience-stream, siirtymamusiikki ja ui.js:n aarreaihe (B7 §4)',
  vakiot: { ...vakiot, aarretyypit: AARRETYYPIT, master: MASTER_PERUSTASO },
  tehosteet: { lista: tehosteet, lento },
  ketjut,
  valinnat,
  alueet,
  liuku,
  osoitteet,
  turvanimet,
  jaaAlku,
  korit,
  arvonta,
  vaisto,
  kone,
};
writeFileSync(join(tama, 'aanijalki.json'), `${JSON.stringify(jalki, null, 1)}\n`);
console.log(`aanijalki.json: ${ketjut.length}×${PAIKAT.length} ketjua, ${valinnat.length} valintaa, ${liuku.length} liukua, `
  + `${osoitteet.length} osoitetta, ${jaaAlku.length} jaaAlku, ${korit.length} koria, ${arvonta.askeleet.length} arvonta-askelta, `
  + `${vaisto.length} väistöä, ${kone.askeleet.length} kone-askelta`);
