/*
 * Taustaäänen soitinketju: mihin tilaan etusivun soitin päätyy.
 *
 * OMISTAJAN VIKA 13.8.2026 (iPad, v614): *"etusivun taustaääni ei
 * vieläkään kuulu — puhe kuuluu kyllä mutta ei taustaääni."* Vika on
 * ollut olemassa jo ennen iOS-kuorta, ja iPhonella sama koodi soi.
 * Yksikään aiempi testi ei ajanut js/ambience-stream.js:n tilakonetta
 * läpi lainkaan — kaikki mittasivat kertoimia lähdekoodista lukemalla.
 *
 * Nämä testit ajavat oikean moduulin tynkäselaimessa ja mittaavat sen,
 * mikä omistajan korvaan asti kuuluu: soiko soitin, ja millä tasolla.
 * Tynkä toteuttaa molemmat polut, joilla ääni voi kulkea —
 * <audio>-elementin oman volumen ja Web Audio -vahvistimen — koska juuri
 * niiden välinen arvonta on tämän tiedoston vaikein kohta.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

// ── tynkäselain ──────────────────────────────────────────────────────

/*
 * Oma ajastinjono. Hiljaisuusvahti odottaa sekunteja, eikä testin saa
 * antaa odottaa niitä oikeasti. Vaihto tehdään globaaliin setTimeoutiin,
 * jonka moduuli hakee vasta kutsuhetkellä.
 */
const oikeaSetTimeout = globalThis.setTimeout;
const oikeaClearTimeout = globalThis.clearTimeout;
let kello = 0;
let ajastimet = [];
let seuraavaId = 1;

function asennaKello() {
  kello = 0;
  ajastimet = [];
  globalThis.setTimeout = (fn, ms = 0) => {
    const id = seuraavaId++;
    ajastimet.push({ id, aika: kello + ms, fn });
    return id;
  };
  globalThis.clearTimeout = (id) => {
    ajastimet = ajastimet.filter((a) => a.id !== id);
  };
}

function puraKello() {
  globalThis.setTimeout = oikeaSetTimeout;
  globalThis.clearTimeout = oikeaClearTimeout;
}

/** Vie kelloa eteenpäin ja ajaa erääntyneet ajastimet järjestyksessä. */
function kelloEteenpain(ms) {
  const loppu = kello + ms;
  for (;;) {
    const vuoro = ajastimet
      .filter((a) => a.aika <= loppu)
      .sort((a, b) => a.aika - b.aika)[0];
    if (!vuoro) break;
    ajastimet = ajastimet.filter((a) => a !== vuoro);
    kello = vuoro.aika;
    vuoro.fn();
  }
  kello = loppu;
}

/** Päästää lupausketjut läpi ilman ajastimia. */
async function mikrotehtavat(kierroksia = 12) {
  for (let i = 0; i < kierroksia; i++) await Promise.resolve();
}

let rafJono = [];
let rafKello = 0;
globalThis.requestAnimationFrame = (fn) => rafJono.push(fn);
/** Ajaa häivytyksen loppuun asti (rAF-polku). */
function ajaRuudut(ruutuja = 200, askel = 25) {
  for (let i = 0; i < ruutuja; i++) {
    rafKello += askel;
    for (const fn of rafJono.splice(0, rafJono.length)) fn(rafKello);
  }
}

let dokumenttiKuuntelijat = new Map();
globalThis.document = {
  addEventListener(laji, fn) {
    if (!dokumenttiKuuntelijat.has(laji)) dokumenttiKuuntelijat.set(laji, new Set());
    dokumenttiKuuntelijat.get(laji).add(fn);
  },
  removeEventListener(laji, fn) { dokumenttiKuuntelijat.get(laji)?.delete(fn); },
};
const laukaiseEle = (laji = 'pointerdown') => {
  for (const fn of [...(dokumenttiKuuntelijat.get(laji) ?? [])]) fn({ type: laji });
};

globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
globalThis.fetch = () => Promise.reject(new Error('ei verkkoa testissä'));

function param(value = 0) {
  return {
    value,
    setValueAtTime(v) { this.value = v; return this; },
    linearRampToValueAtTime(v) { this.value = v; return this; },
    exponentialRampToValueAtTime(v) { this.value = v; return this; },
    setValueCurveAtTime() { return this; },
    cancelScheduledValues() { return this; },
  };
}

function solmu(tyyppi, ctx) {
  return {
    tyyppi,
    connect(kohde) { ctx.kytkennat.push(tyyppi); return kohde; },
    disconnect() { ctx.purut.push(tyyppi); },
    start() {}, stop() {},
  };
}

/**
 * Äänikonteksti tynkänä. `mykka` jäljittelee sitä WebKitin tilaa, josta
 * moduulin omat kommentit varoittavat: reititetty elementti ei enää soi
 * suoraan kaiuttimeen, ja graafin ulostulo on täyttä hiljaisuutta ilman
 * yhtäkään virhettä.
 */
function teeKonteksti(tila, mykka) {
  const ctx = {
    state: tila, currentTime: 0, sampleRate: 44100,
    destination: { tyyppi: 'destination' },
    kytkennat: [], purut: [], reititetyt: [],
    resume: () => Promise.resolve(),
  };
  const luo = (t, lisa = {}) => Object.assign(solmu(t, ctx), lisa);
  ctx.createGain = () => luo('gain', { gain: param(1) });
  ctx.createDynamicsCompressor = () => luo('compressor', {
    threshold: param(-24), knee: param(30), ratio: param(12),
    attack: param(0.003), release: param(0.25),
  });
  ctx.createAnalyser = () => {
    // Mittari luodaan ketjun viimeisenä, joten juuri reititetty elementti
    // on se, jonka ulostuloa se kuuntelee.
    const el = ctx.reititetyt[ctx.reititetyt.length - 1];
    const n = luo('analyser', { fftSize: 256 });
    n.getFloatTimeDomainData = (data) => {
      // Mykässä ketjussa ulostulo on nollaa; muuten näyte seuraa tasoa.
      const arvo = mykka() || el?.paused ? 0 : (el?.aaniVahvistin?.gain?.value ?? 0);
      data.fill(arvo);
    };
    return n;
  };
  ctx.createMediaElementSource = (el) => {
    ctx.reititetyt.push(el);
    el.reititetty = true;
    return luo('mediaElement');
  };
  ctx.createOscillator = () => luo('osc', { frequency: param(440), type: 'sine' });
  ctx.createBufferSource = () => luo('src', { buffer: null, loop: false });
  ctx.createBiquadFilter = () => luo('filter', { frequency: param(1), Q: param(1) });
  ctx.createConvolver = () => luo('conv', { buffer: null });
  ctx.createBuffer = (ch, frames, rate) => ({
    length: frames, sampleRate: rate, numberOfChannels: ch,
    getChannelData: () => new Float32Array(frames),
  });
  return ctx;
}

let soittimet = [];
let soittoTila = 'ok'; // 'ok' | 'estetty' | 'rikki'
/** iOS jättää volume-asetuksen huomiotta; tällä sen voi jäljitellä. */
let volumeLukittu = false;

class TynkaAudio {
  constructor(src) {
    this._volume = 1;
    this._src = '';
    this.readyState = 0;
    this.duration = 180;
    this.currentTime = 0;
    this.paused = true;
    this.ended = false;
    this.loop = false;
    this.preload = '';
    this.crossOrigin = null;
    this.reititetty = false;
    this.kuuntelijat = new Map();
    this.yritykset = [];
    // Alkuperäinen osoite jää talteen, koska removeAttribute pyyhkii
    // srcin: ilman tätä purettua soitinta ei voisi enää tunnistaa
    // (ks. maisemat-suodatin pystyta():ssa).
    this.alkuSrc = src ?? '';
    if (src) this.src = src;
    soittimet.push(this);
  }

  get volume() { return this._volume; }

  set volume(v) {
    // Selain heittää välin ulkopuolisesta arvosta (IndexSizeError).
    if (!(v >= 0 && v <= 1)) {
      const e = new Error(`volume ${v} ei ole välillä 0–1`);
      e.name = 'IndexSizeError';
      throw e;
    }
    if (!volumeLukittu) this._volume = v;
  }

  get src() { return this._src; }

  set src(v) { this._src = v; this.readyState = 0; }

  getAttribute(nimi) { return nimi === 'src' ? (this._src || null) : null; }

  removeAttribute() { this._src = ''; }

  load() {}

  pause() {
    if (this.paused) return;
    this.paused = true;
    this.laukaise('pause');
  }

  /** Ulkopuolinen keskeytys: sovellusvaihto, puhelu, järjestelmä. */
  keskeyta() { this.pause(); }

  play() {
    this.yritykset.push(soittoTila);
    if (soittoTila === 'ok') {
      this.paused = false;
      this.readyState = 4;
      return Promise.resolve();
    }
    const e = new Error(soittoTila);
    e.name = soittoTila === 'estetty' ? 'NotAllowedError' : 'NotSupportedError';
    return Promise.reject(e);
  }

  addEventListener(laji, fn) {
    if (!this.kuuntelijat.has(laji)) this.kuuntelijat.set(laji, new Set());
    this.kuuntelijat.get(laji).add(fn);
  }

  removeEventListener(laji, fn) { this.kuuntelijat.get(laji)?.delete(fn); }

  laukaise(laji) {
    for (const fn of [...(this.kuuntelijat.get(laji) ?? [])]) fn({ type: laji });
  }

  /** Efektiivinen kuuluva taso. 0 = omistaja ei kuule mitään. */
  get kuuluu() {
    if (this.paused) return 0;
    if (this.reititetty) return this.mykka ? 0 : (this.aaniVahvistin?.gain?.value ?? 0);
    return this._volume;
  }
}
globalThis.Audio = TynkaAudio;

/**
 * Pystyttää tuoreen moduulikopion. sound.js on jaettu (ambience-stream
 * tuo sen ilman leimaa), joten sen konteksti nollataan käsin.
 */
async function pystyta({ ctxTila = 'suspended', mykkaGraafi = false, iosVolume = false, soitto = 'ok' } = {}) {
  soittimet = [];
  rafJono = [];
  rafKello = 0;
  dokumenttiKuuntelijat = new Map();
  soittoTila = soitto;
  volumeLukittu = iosVolume;
  asennaKello();

  const juuri = new URL('../js/', import.meta.url).href;
  const { sfx } = await import(`${juuri}sound.js`);
  sfx.ctx = null;
  sfx.ambience = null;
  sfx.ambienceType = null;
  const konteksti = teeKonteksti(ctxTila, () => mykkaGraafi);
  globalThis.window = { AudioContext: function Ctx() { return konteksti; } };

  const virta = await import(`${juuri}ambience-stream.js?ajo=${seuraavaId++}`);
  virta.nollaaPohjaMusiikki?.();
  return {
    virta,
    sfx,
    konteksti,
    soittimet,
    asetaSoitto: (tila) => { soittoTila = tila; },
    viimeinen: () => soittimet[soittimet.length - 1],
    /*
     * MAISEMAN SOITTIMET, EI KAIKKI SOITTIMET (musiikkipaletti
     * 29.8.2026). playPlaceAmbience käynnistää maiseman rinnalle
     * musiikkipaletin pohjavireen omana soittimenaan
     * (js/ambience-stream.js kaynnistaPohjaMusiikki). Nämä testit
     * mittaavat maiseman soitinketjua, joten pohjavire suodatetaan
     * pois tiedostonimen (musa-*.mp3) perusteella.
     */
    maisemat: () => soittimet.filter((a) => !/musa-/.test(a.alkuSrc)),
  };
}

/** Käynnistää etusivun äänimaiseman ja ajaa häivytykset loppuun. */
async function soitaEtusivu(s) {
  s.virta.playPlaceAmbience('etusivu', 'lentoasema', 'maailma');
  await mikrotehtavat();
  ajaRuudut();
}

test.after(() => puraKello());

// ── testit ───────────────────────────────────────────────────────────

test('etusivu kuuluu, kun konteksti nukkuu soittimen syntyessä', async () => {
  const s = await pystyta({ ctxTila: 'suspended' });
  await soitaEtusivu(s);
  const a = s.viimeinen();
  assert.equal(a.reititetty, false, 'nukkuvaa kontekstia ei saa käyttää reititykseen');
  assert.ok(a.kuuluu > 0, `taustaäänen pitää kuulua, nyt ${a.kuuluu}`);
});

test('etusivu kuuluu, kun konteksti on jo käynnissä (reititetty polku)', async () => {
  const s = await pystyta({ ctxTila: 'running' });
  await soitaEtusivu(s);
  const a = s.viimeinen();
  assert.equal(a.reititetty, true, 'käynnissä oleva konteksti reitittää kompressorin läpi');
  assert.ok(a.kuuluu > 0, `taustaäänen pitää kuulua, nyt ${a.kuuluu}`);
});

test('myöhään saapuva ele käynnistää eston jälkeen saman äänitteen', async () => {
  const s = await pystyta({ ctxTila: 'suspended', soitto: 'estetty' });
  await soitaEtusivu(s);
  assert.equal(s.viimeinen().kuuluu, 0, 'estetty toisto ei vielä kuulu');
  s.asetaSoitto('ok');
  laukaiseEle('pointerdown');
  await mikrotehtavat();
  ajaRuudut();
  const a = s.viimeinen();
  assert.equal(s.maisemat().length, 1, 'eleen pitää jatkaa samalla soittimella');
  assert.ok(a.kuuluu > 0, `eleen jälkeen taustan pitää kuulua, nyt ${a.kuuluu}`);
});

test('volume-polku sietää kertoimen, joka ylittää ykkösen', async () => {
  /*
   * Etusivulla on oma kerroin (ETUSIVUN_VOIMA), ja äänitteellä omansa.
   * Jos niiden tulo nousee yli ykkösen, HTML-soittimen volume heittäisi
   * IndexSizeErrorin — ja häivytyksen sisällä heitetty poikkeus jättäisi
   * voimakkuuden pysyvästi nollaan. Gain-polulla sama kerroin saa
   * säilyä sellaisenaan, koska vahvistinsolmu ei leikkaa ykköseen.
   */
  const s = await pystyta({ ctxTila: 'suspended' });
  await soitaEtusivu(s);
  const a = s.viimeinen();
  assert.doesNotThrow(() => s.virta.vaimennaTausta(12), 'volume-polku ei saa kaatua');
  ajaRuudut();
  assert.equal(a.volume, 1, `volume-polku leikkaa ykköseen, nyt ${a.volume}`);
  assert.ok(a.kuuluu > 0, 'liian suuri kerroin ei saa mykistää taustaa');
});

test('gain-polulla ykkösen ylittävä kerroin säilyy leikkaamatta', async () => {
  const s = await pystyta({ ctxTila: 'running' });
  await soitaEtusivu(s);
  const a = s.viimeinen();
  s.virta.vaimennaTausta(12);
  ajaRuudut();
  assert.ok(a.aaniVahvistin.gain.value > 1,
    `vahvistin saa ylittää ykkösen, nyt ${a.aaniVahvistin.gain.value}`);
});

test('mykkä Web Audio -ketju korjataan reitittämättömäksi soittimeksi', async () => {
  /*
   * WebKitissä reititetty elementti voi jäädä täysin hiljaiseksi ilman
   * virhettä: readyState on kunnossa, nauha etenee, error-tapahtumaa ei
   * tule. Ilman hiljaisuusvahtia etusivu jää mykäksi lopullisesti.
   */
  const s = await pystyta({ ctxTila: 'running', mykkaGraafi: true });
  for (const a of s.soittimet) a.mykka = true;
  await soitaEtusivu(s);
  const eka = s.viimeinen();
  eka.mykka = true;
  assert.equal(eka.reititetty, true);
  assert.equal(eka.kuuluu, 0, 'lähtötilanne: reititetty mutta mykkä');

  // Dataa on (readyState 4) — kyse ei siis ole latauksesta vaan
  // kuolleesta ketjusta.
  assert.ok(eka.readyState >= 3);
  kelloEteenpain(6000);
  await mikrotehtavat();
  ajaRuudut();

  const uusi = s.viimeinen();
  assert.notEqual(uusi, eka, 'mykän ketjun tilalle pitää syntyä uusi soitin');
  assert.equal(uusi.reititetty, false, 'korjattu soitin ei saa mennä Web Audion läpi');
  assert.ok(uusi.kuuluu > 0, `korjatun soittimen pitää kuulua, nyt ${uusi.kuuluu}`);
});

test('kuuluva reititetty ketju jätetään rauhaan', async () => {
  const s = await pystyta({ ctxTila: 'running' });
  await soitaEtusivu(s);
  const eka = s.viimeinen();
  kelloEteenpain(6000);
  await mikrotehtavat();
  assert.equal(s.maisemat().length, 1, 'toimivaa ketjua ei saa rakentaa uudelleen');
  assert.ok(eka.kuuluu > 0);
});

test('järjestelmän keskeyttämä soitin jatkaa itsestään', async () => {
  /*
   * Sovellusvaihto tai puhelu pysäyttää taustasoittimen. Selain ei jatka
   * sitä, ja koska playPlaceAmbience toteaa saman paikan, yksikään
   * renderöinti ei rakenna soitinta uudelleen — tausta jäisi mykäksi
   * lopullisesti.
   */
  const s = await pystyta({ ctxTila: 'suspended' });
  await soitaEtusivu(s);
  const a = s.viimeinen();
  assert.ok(a.kuuluu > 0);

  const yrityksia = a.yritykset.length;
  a.keskeyta();
  await mikrotehtavat();
  ajaRuudut();
  assert.ok(a.yritykset.length > yrityksia, 'keskeytyksen pitää laukaista uusi yritys');
  assert.ok(a.kuuluu > 0, `keskeytetyn soittimen pitää jatkaa, nyt ${a.kuuluu}`);

  // Sama paikka pyydettynä ei saa rakentaa toista soitinta päälle.
  await soitaEtusivu(s);
  assert.equal(s.maisemat().length, 1);
});

test('keskeytys eston aikana odottaa elettä eikä jää yrittämään', async () => {
  const s = await pystyta({ ctxTila: 'suspended' });
  await soitaEtusivu(s);
  const a = s.viimeinen();
  s.asetaSoitto('estetty'); // sivu on taustalla: toisto ei ole sallittua
  a.keskeyta();
  await mikrotehtavat();
  assert.equal(a.kuuluu, 0);
  const yrityksia = a.yritykset.length;

  s.asetaSoitto('ok');
  laukaiseEle('pointerdown');
  await mikrotehtavat();
  ajaRuudut();
  assert.ok(a.kuuluu > 0, `eleen jälkeen taustan pitää palata, nyt ${a.kuuluu}`);
  assert.ok(a.yritykset.length > yrityksia);
});

test('silmukan vahti viritetään vain kerran soitinta kohti', async () => {
  // Keskeytyksestä palaava soitin käy onnistui():n läpi toisenkin
  // kerran; kaksi timeupdate-kuuntelijaa vaihtaisi kierroksen kahdesti.
  const s = await pystyta({ ctxTila: 'suspended' });
  await soitaEtusivu(s);
  const a = s.viimeinen();
  a.keskeyta();
  await mikrotehtavat();
  ajaRuudut();
  assert.equal(a.kuuntelijat.get('timeupdate').size, 1);
});
