/*
 * SAAPUMISPUHE MINITRAILERISSA (js/luenta.js soitaSaapumispuhe,
 * js/saapumistraileri.js).
 *
 * Omistaja 15.9.2026, sanatarkasti: *"Kokeile tehdä pelkästään isoisän
 * äänellä. Siinä paras että generaattori tekee itse tauon"* ja
 * hyväksyntä *"Nyt hyvä. Tee kaikkiin ja vie peliin"*. Isoisä sanoo
 * kaupungin nimen ja nykyisen iskulauseen YHTENÄ ottona
 * (js/packs/saapumispuheet.js); pulu ei puhu saapumisessa.
 *
 * NELJÄ ASIAA, JOITA KUUNTELU EI PALJASTA:
 *
 *   1. VALINTA. Puhe soi vain kun kertojan luentakytkin on päällä JA
 *      kaupungille on otto. Euroopan ulkopuolinen kaupunki jättää
 *      trailerin täsmälleen ennalleen.
 *   2. YKSI SOITTO PER SAAPUMINEN. Nimi nostetaan kahdesti (rAF ja
 *      50 ms:n varakutsu), eikä kahta ottoa saa lähteä.
 *   3. MATKAKIRJALUENTA ODOTTAA. Trailerin lupaus — jota js/ui.js
 *      renderFact odottaa ennen kirjoituskonetta ja luentaa — ratkeaa
 *      luonnollisessa kulussa vasta puheen 'ended'-tapahtumasta, ei
 *      kellosta. Ohitus ja kaupungin vaihto vaientavat puheen heti.
 *   4. HYLÄTTY AUTOPLAY EI JUMITA. iOS voi hylätä play():n
 *      (NotAllowedError); silloin lupaus ratkeaa kuten ilman puhetta.
 *
 * DOM ja Audio ovat pieniä omia malleja samaan tapaan kuin
 * tests/saapumistraileri.test.mjs:ssä — Nodessa ei ole selainta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

/* ---------------------------------------------------------------- */
/* Pieni DOM- ja Audio-malli (ennen moduulien latausta)              */
/* ---------------------------------------------------------------- */

class Elementti {
  constructor(nimi) {
    this.nodeType = 1;
    this.nodeName = String(nimi).toUpperCase();
    this.childNodes = [];
    this.parentNode = null;
    this.luokat = [];
    this.attrs = {};
    this.kuuntelijat = new Map();
    this.style = { setProperty() {} };
  }

  get classList() {
    const el = this;
    return {
      add: (...n) => n.forEach((x) => { if (!el.luokat.includes(x)) el.luokat.push(x); }),
      remove: (...n) => { el.luokat = el.luokat.filter((x) => !n.includes(x)); },
      contains: (n) => el.luokat.includes(n),
      toggle: (n, p) => (p ? el.classList.add(n) : el.classList.remove(n)),
    };
  }

  get className() { return this.luokat.join(' '); }

  set className(arvo) { this.luokat = String(arvo).split(/\s+/).filter(Boolean); }

  setAttribute(nimi, arvo) { this.attrs[nimi] = String(arvo); }

  getAttribute(nimi) { return this.attrs[nimi] ?? null; }

  appendChild(lapsi) {
    lapsi.parentNode = this;
    this.childNodes.push(lapsi);
    return lapsi;
  }

  append(...lapset) { lapset.forEach((l) => this.appendChild(l)); }

  remove() {
    const i = this.parentNode?.childNodes.indexOf(this) ?? -1;
    if (i >= 0) this.parentNode.childNodes.splice(i, 1);
    this.parentNode = null;
  }

  addEventListener(laji, fn) {
    if (!this.kuuntelijat.has(laji)) this.kuuntelijat.set(laji, []);
    this.kuuntelijat.get(laji).push(fn);
  }

  removeEventListener(laji, fn) {
    this.kuuntelijat.set(laji, (this.kuuntelijat.get(laji) ?? []).filter((k) => k !== fn));
  }

  dispatch(laji) { [...(this.kuuntelijat.get(laji) ?? [])].forEach((fn) => fn({ type: laji })); }
}

const kaikkiAanet = [];

/** Selaimen <audio> sen verran kuin luenta siitä käyttää. */
class TekoAudio extends Elementti {
  constructor() {
    super('audio');
    this.src = '';
    this.crossOrigin = '';
    this.volume = 1;
    this.paused = true;
    this.ended = false;
    this.currentTime = 0;
    this.soitot = 0;
    this.hylkaa = null;
    kaikkiAanet.push(this);
  }

  play() {
    this.soitot += 1;
    if (this.hylkaa) return Promise.reject(this.hylkaa);
    this.paused = false;
    this.aaniAlkoiSoida = true;
    this.dispatch('playing');
    return Promise.resolve();
  }

  pause() {
    if (this.paused) return;
    this.paused = true;
    this.dispatch('pause');
  }

  /** Luonnollinen loppu: soitin lähettää 'ended' itse. */
  paatyLoppuun() {
    this.ended = true;
    this.paused = true;
    this.dispatch('ended');
  }

  removeAttribute() { this.src = ''; }
}

globalThis.Audio = TekoAudio;

const asiakirja = {
  body: new Elementti('body'),
  head: new Elementti('head'),
  documentElement: { clientWidth: 1024, clientHeight: 768 },
  hidden: false,
  createElement: (nimi) => new Elementti(nimi),
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {},
  removeEventListener: () => {},
};
globalThis.document = asiakirja;
globalThis.addEventListener = () => {};
globalThis.removeEventListener = () => {};

const muisti = new Map();
globalThis.localStorage = {
  getItem: (a) => (muisti.has(a) ? muisti.get(a) : null),
  setItem: (a, b) => muisti.set(a, String(b)),
  removeItem: (a) => muisti.delete(a),
};

const { naytaSaapumistraileri, piilotaSaapumistraileri } = await import('../js/saapumistraileri.js');
const { pysaytaSaapumispuhe, saapumispuheenSoitin } = await import('../js/luenta.js');
const { SAAPUMISPUHEET } = await import('../js/packs/saapumispuheet.js');
const { haeSaapumispuhe } = await import('../js/media.js');

/* ---------------------------------------------------------------- */
/* Apurit                                                            */
/* ---------------------------------------------------------------- */

/* Marseillella on sekä trailerikuvat että hyväksytty saapumisotto. */
const KAUPUNKI = { id: 'marseille', name: 'Marseille' };
/* Kuvat on, puhetta ei (Eurooppa loppuu): traileri ennallaan. */
const PUHUMATON = { id: 'kairo', name: 'Kairo' };

const tekoUi = () => ({ game: { cityOf: () => KAUPUNKI } });

/** Trailerin nimi nostetaan rAF:lla ja 50 ms:n varakutsulla. */
function nostaNimi() {
  // Molemmat herätykset: juuri tässä kaksoissoiton vaara on.
  for (const fn of [...ajastimet]) fn();
}

let ajastimet = [];
const oikeaTimeout = globalThis.setTimeout;
test.beforeEach(() => {
  ajastimet = [];
  kaikkiAanet.length = 0;
  muisti.clear();
  globalThis.setTimeout = (fn, viive) => {
    // Vain nimen nosto (50 ms) ja lyhyet kutsut ajetaan käsin.
    if (viive <= 50) ajastimet.push(fn);
    return 0;
  };
  globalThis.requestAnimationFrame = (fn) => { ajastimet.push(fn); return 0; };
});
test.afterEach(() => {
  globalThis.setTimeout = oikeaTimeout;
  pysaytaSaapumispuhe(null);
});

/* ---------------------------------------------------------------- */
/* 1. Valinta: kytkin ja aineisto                                    */
/* ---------------------------------------------------------------- */

test('aineisto ja haku tuntevat koekaupungit', () => {
  assert.ok(SAAPUMISPUHEET[KAUPUNKI.id]?.url, 'Marseillelle on saapumisotto');
  assert.equal(haeSaapumispuhe(PUHUMATON.id), null, 'Kairo on Euroopan ulkopuolella');
  // Yksi otto: nimi ja iskulause samassa tiedostossa, ei pulun osuutta.
  assert.equal(SAAPUMISPUHEET[KAUPUNKI.id].singleTake, true);
});

test('puhe soi kun kertoja on päällä ja kaupungille on otto', () => {
  const ui = tekoUi();
  naytaSaapumistraileri(ui, KAUPUNKI);
  nostaNimi();
  const audio = saapumispuheenSoitin();
  assert.ok(audio, 'saapumispuheen pitää soida');
  assert.equal(audio.src, SAAPUMISPUHEET[KAUPUNKI.id].url);
  assert.equal(audio.crossOrigin, 'anonymous', 'Web Audio -reititys vaatii CORS-luvan');
  assert.equal(audio.soitot, 1);
  piilotaSaapumistraileri(ui);
});

test('kertoja pois päältä: traileri pyörii, puhe ei soi', () => {
  muisti.set('matkakirja-kertoja', 'ei');
  const ui = tekoUi();
  naytaSaapumistraileri(ui, KAUPUNKI);
  nostaNimi();
  assert.equal(saapumispuheenSoitin(), null);
  assert.equal(kaikkiAanet.length, 0, 'soitinta ei edes luoda');
  piilotaSaapumistraileri(ui);
});

test('puhumaton kaupunki jättää trailerin ennalleen', async () => {
  const ui = tekoUi();
  const lupaus = naytaSaapumistraileri(ui, PUHUMATON);
  nostaNimi();
  assert.equal(saapumispuheenSoitin(), null);
  // Lupaus ratkeaa kuten ennen: matkakirjaluenta ei jää odottamaan.
  piilotaSaapumistraileri(ui, { odotaPuhe: true });
  assert.equal(await lupaus, true);
});

/* ---------------------------------------------------------------- */
/* 2. Ei kaksoissoittoa                                              */
/* ---------------------------------------------------------------- */

test('rAF ja varakutsu nostavat saman nimen — puhe lähtee kerran', () => {
  const ui = tekoUi();
  naytaSaapumistraileri(ui, KAUPUNKI);
  nostaNimi();
  assert.equal(kaikkiAanet.length, 1, 'yksi soitin per saapuminen');
  assert.equal(kaikkiAanet[0].soitot, 1, 'play() kutsutaan kerran');
  piilotaSaapumistraileri(ui);
});

/* ---------------------------------------------------------------- */
/* 3. Matkakirjaluenta odottaa puheen loppua                         */
/* ---------------------------------------------------------------- */

test('lupaus ratkeaa vasta puheen ended-tapahtumasta, ei kellosta', async () => {
  const ui = tekoUi();
  const lupaus = naytaSaapumistraileri(ui, KAUPUNKI);
  nostaNimi();
  const audio = saapumispuheenSoitin();
  let ratkennut = false;
  void lupaus.then(() => { ratkennut = true; });
  // Trailerin kuvat ovat ohi: kehys pois, mutta isoisä puhuu yhä.
  piilotaSaapumistraileri(ui, { odotaPuhe: true });
  await Promise.resolve();
  assert.equal(ratkennut, false, 'matkakirjaluenta ei saa alkaa puheen päälle');
  assert.equal(audio.paused, false, 'puhetta ei leikata kellon perusteella');
  audio.paatyLoppuun();
  assert.equal(await lupaus, true);
  assert.equal(saapumispuheenSoitin(), null, 'loppunut puhe siivotaan');
});

test('ohitus vaientaa puheen ja päästää luennan eteenpäin', async () => {
  const ui = tekoUi();
  const lupaus = naytaSaapumistraileri(ui, KAUPUNKI);
  nostaNimi();
  const audio = saapumispuheenSoitin();
  ui.saapumistraileri.kehys.dispatch('pointerdown');
  assert.equal(audio.paused, true, 'ohitus pysäyttää puheen heti');
  assert.equal(saapumispuheenSoitin(), null);
  // Ohituksen häivytysajastin ajetaan käsin (setTimeout on kahleissa).
  piilotaSaapumistraileri(ui);
  assert.equal(await lupaus, true);
});

test('kaupungin vaihto siivoaa puheen eikä jätä lupausta auki', async () => {
  const ui = tekoUi();
  const lupaus = naytaSaapumistraileri(ui, KAUPUNKI);
  nostaNimi();
  const audio = saapumispuheenSoitin();
  piilotaSaapumistraileri(ui, { peru: true });
  assert.equal(audio.paused, true);
  assert.equal(audio.src, '', 'soitin siivotaan, ei jää lataamaan');
  assert.equal(saapumispuheenSoitin(), null);
  assert.equal(await lupaus, true);
});

test('uusi traileri vaientaa edellisen kaupungin puheen', () => {
  const ui = tekoUi();
  naytaSaapumistraileri(ui, KAUPUNKI);
  nostaNimi();
  const eka = saapumispuheenSoitin();
  naytaSaapumistraileri(ui, KAUPUNKI);
  assert.equal(eka.paused, true, 'vanha nimi ei jää soimaan uuden päälle');
  assert.notEqual(saapumispuheenSoitin(), eka);
  piilotaSaapumistraileri(ui);
});

/* ---------------------------------------------------------------- */
/* 4. Hylätty autoplay ei jumita traileria                           */
/* ---------------------------------------------------------------- */

test('hylätty play() päättää odotuksen eikä jätä puhujaa äänessä', async () => {
  const virhe = Object.assign(new Error('gesture required'), { name: 'NotAllowedError' });
  const alkuperainen = globalThis.Audio;
  globalThis.Audio = class extends TekoAudio {
    constructor() { super(); this.hylkaa = virhe; }
  };
  const ui = tekoUi();
  const lupaus = naytaSaapumistraileri(ui, KAUPUNKI);
  nostaNimi();
  try {
    // play() hylkääntyy mikrotehtävässä: odotetaan se pois.
    await Promise.resolve();
    await Promise.resolve();
    assert.equal(saapumispuheenSoitin(), null, 'käynnistymätön puhe siivotaan');
    piilotaSaapumistraileri(ui, { odotaPuhe: true });
    assert.equal(await lupaus, true, 'traileri ei jää jumiin');
  } finally {
    globalThis.Audio = alkuperainen;
  }
});
