/*
 * Tehosteketjut (js/tehosteketju.js) — Tuna 1.1.3 ämpärin vendor/-polusta.
 *
 * Omistajan päätös 5.9.2026 (kirjastokartoituksen TOP 6, *"Sitten 5."*).
 * Web Audiota ei ole Nodessa, joten ketjut rakennetaan tynkäkontekstiin
 * ja väärennettyyn Tunaan, joka toteuttaa samat kentät (input/output)
 * kuin oikea. Näin testi ajaa oikeasti ketjujen kytkennän, ristihäivytyksen
 * ja purun — eikä vain totea, ettei mikään kaadu ilman äänilaitetta.
 * Oikea kirjasto ajetaan selaimessa (tools/savukkeet/savuke-tehosteketju.mjs).
 *
 * Kytkentäpaikat luetaan TEKSTINÄ (puhe.js, fokuskohteet.js, pakit, sw.js,
 * build-standalone, lahteet, index.html, main.js): siirto tai nimenvaihto
 * rikkoisi kytkennän hiljaa, ja tämä testi kaatuu sen sijaan.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

import {
  AKUSTIIKAT, KETJUN_HAIVYTYS_S, TEHOSTEKETJUT, TUNA_KIRJASTO,
  akustiikka, asetaAkustiikka, ketjunImpulssi, lataaTuna, tehosteketju,
  tunaValmis, unohdaTuna,
} from '../js/tehosteketju.js';
import { PEILI_JUURI } from '../js/media.js';
import { LAHTEET } from '../js/lahteet.js';

const lue = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

/* ---------------------------------------------------------------- */
/* Tynkäkonteksti                                                    */
/* ---------------------------------------------------------------- */

function param(value = 0) {
  const p = {
    value,
    rampit: [],
    setValueAtTime(v) { p.value = v; return p; },
    linearRampToValueAtTime(v, t) { p.rampit.push({ v, t }); p.value = v; return p; },
    exponentialRampToValueAtTime(v, t) { p.rampit.push({ v, t }); p.value = v; return p; },
    cancelScheduledValues() { return p; },
  };
  return p;
}

function solmu(ctx, tyyppi) {
  const n = {
    tyyppi,
    ulos: [],
    irrotettu: 0,
    gain: param(1),
    frequency: param(350),
    Q: param(1),
    detune: param(0),
    type: 'lowpass',
    buffer: null,
    loop: false,
    kaynnistetty: false,
    pysaytetty: false,
    connect(kohde) { n.ulos.push(kohde); ctx.kytkennat.push([n, kohde]); return kohde; },
    disconnect() { n.irrotettu += 1; n.ulos = []; },
    start() { n.kaynnistetty = true; },
    stop() { n.pysaytetty = true; },
  };
  ctx.solmut.push(n);
  return n;
}

function tynkaKonteksti() {
  const ctx = {
    currentTime: 1,
    sampleRate: 8000,
    solmut: [],
    kytkennat: [],
    destination: null,
    createBuffer(ch, frames) {
      const kanavat = Array.from({ length: ch }, () => new Float32Array(frames));
      return { numberOfChannels: ch, length: frames, sampleRate: 8000, getChannelData: (i) => kanavat[i] };
    },
  };
  ctx.destination = solmu(ctx, 'destination');
  for (const laji of ['Gain', 'BiquadFilter', 'Convolver', 'BufferSource', 'Oscillator', 'WaveShaper', 'Delay']) {
    ctx[`create${laji}`] = () => solmu(ctx, laji);
  }
  return ctx;
}

/** Väärennetty Tuna: samat solmunimet ja input/output-kentät kuin oikealla. */
function TynkaTuna(ctx) {
  if (!(this instanceof TynkaTuna)) return new TynkaTuna(ctx);
  TynkaTuna.viimeisin = ctx;
  TynkaTuna.luotu += 1;
}
TynkaTuna.luotu = 0;
for (const nimi of ['Filter', 'Overdrive', 'Bitcrusher', 'Tremolo', 'Delay', 'Convolver']) {
  TynkaTuna.prototype[nimi] = function tunaSolmu(asetukset) {
    const ctx = TynkaTuna.viimeisin;
    this.nimi = nimi;
    this.asetukset = asetukset;
    this.input = solmu(ctx, `tuna:${nimi}:in`);
    this.output = solmu(ctx, `tuna:${nimi}:out`);
    this.input.connect(this.output);
    TynkaTuna.solmut.push(this);
  };
}
TynkaTuna.solmut = [];

/** Onko `alku`-solmusta polku `loppu`-solmuun kytkentöjen kautta? */
function polku(alku, loppu, nahty = new Set()) {
  if (alku === loppu) return true;
  if (nahty.has(alku)) return false;
  nahty.add(alku);
  return alku.ulos.some((k) => polku(k, loppu, nahty));
}

/* ---------------------------------------------------------------- */
/* Nimet ja osoite                                                   */
/* ---------------------------------------------------------------- */

test('ketjujen nimet ovat ne viisi, jotka peli tarvitsee, ja akustiikat niiden osajoukko', () => {
  assert.deepEqual([...TEHOSTEKETJUT], ['megafoni', 'radio', 'puhelin', 'luola', 'ulkoilma']);
  for (const a of AKUSTIIKAT) assert.ok(TEHOSTEKETJUT.includes(a), a);
  assert.ok(AKUSTIIKAT.includes('luola'), 'luola on kohdekorttien akustiikka');
});

test('kirjaston osoite on ämpärin vendor/-polku eikä tuotantokoodissa ole CDN:ää', () => {
  assert.equal(TUNA_KIRJASTO, `${PEILI_JUURI}vendor/tuna-1.1.3.js`);
  assert.match(TUNA_KIRJASTO, /^https:\/\/(?:media\.matkakirja\.app|pub-[0-9a-f]+\.r2\.dev)\/vendor\/tuna-1\.1\.3\.js$/);
  for (const p of ['js/tehosteketju.js', 'js/puhe.js', 'js/fokuskohteet.js', 'js/main.js', 'sw.js']) {
    const src = lue(p);
    assert.doesNotMatch(src, /jsdelivr|cdnjs|unpkg|esm\.sh/i, `${p} viittaa CDN:ään`);
  }
  // Toista AudioContextia ei luoda: konteksti tulee aina kutsujalta.
  assert.doesNotMatch(lue('js/tehosteketju.js'), /new\s+(window\.)?(webkit)?AudioContext/);
});

/* ---------------------------------------------------------------- */
/* Laiska lataus ja virhehaara                                       */
/* ---------------------------------------------------------------- */

const manifestiSivu = ({ skripti = null } = {}) => ({
  querySelector: (v) => (v === 'link[rel="manifest"]' ? {} : null),
  createElement: () => {
    const el = { kuuntelijat: {}, addEventListener(n, f) { el.kuuntelijat[n] = f; } };
    return el;
  },
  head: {
    appendChild: (el) => {
      if (skripti) skripti(el);
      else el.kuuntelijat.error?.();
    },
  },
});

test('ilman sivua tai yhden tiedoston versiossa kirjastoa ei edes yritetä ladata', async () => {
  unohdaTuna();
  let kutsut = 0;
  const tuo = async () => { kutsut += 1; return { default: TynkaTuna }; };
  assert.equal(await lataaTuna({ doc: null, tuo }), null);
  // Ei manifest-linkkiä = yhden tiedoston versio (js/main.js:n tunniste).
  const dist = { querySelector: () => null };
  assert.equal(await lataaTuna({ doc: dist, tuo }), null);
  assert.equal(kutsut, 0, 'tuojaa ei saa kutsua');
  assert.equal(tunaValmis(), null);
});

test('virhehaara: tuonti ja <script> epäonnistuvat → null, ja seuraava tarve yrittää uudestaan', async () => {
  unohdaTuna();
  let kutsut = 0;
  const tuo = async () => { kutsut += 1; throw new Error('CORS'); };
  assert.equal(await lataaTuna({ doc: manifestiSivu(), tuo }), null);
  assert.equal(await lataaTuna({ doc: manifestiSivu(), tuo }), null);
  assert.equal(kutsut, 2, 'epäonnistunut lataus ei saa jäädä muistiin');
  assert.equal(tunaValmis(), null);
});

test('onnistunut tuonti muistetaan: toinen kutsu ei tuo uudestaan', async () => {
  unohdaTuna();
  let kutsut = 0;
  const tuo = async () => { kutsut += 1; return { default: TynkaTuna }; };
  assert.equal(await lataaTuna({ doc: manifestiSivu(), tuo }), TynkaTuna);
  assert.equal(await lataaTuna({ doc: manifestiSivu(), tuo }), TynkaTuna);
  assert.equal(kutsut, 1);
  assert.equal(tunaValmis(), TynkaTuna);
  unohdaTuna();
});

test('UMD-varapolku: tuonti ei anna oletusvientiä, <script> kirjoittaa globaalin', async () => {
  unohdaTuna();
  const tuo = async () => { throw new Error('ei moduuli'); };
  const doc = manifestiSivu({
    skripti: (el) => { globalThis.Tuna = TynkaTuna; el.kuuntelijat.load?.(); },
  });
  try {
    assert.equal(await lataaTuna({ doc, tuo }), TynkaTuna);
  } finally {
    delete globalThis.Tuna;
    unohdaTuna();
  }
});

/* ---------------------------------------------------------------- */
/* Ketjut                                                            */
/* ---------------------------------------------------------------- */

test('ilman kirjastoa tehosteketju palauttaa null — ääni kulkee suoraan', () => {
  unohdaTuna();
  const ctx = tynkaKonteksti();
  assert.equal(tehosteketju(ctx, 'luola', ctx.destination), null);
  assert.equal(ctx.kytkennat.length, 0, 'ilman kirjastoa ei synny yhtään kytkentää');
});

test('jokainen ketju syntyy annettuun kontekstiin, kulkee päätteeseen ja liukuu märäksi 200 ms:ssa', () => {
  for (const nimi of TEHOSTEKETJUT) {
    const ctx = tynkaKonteksti();
    TynkaTuna.luotu = 0;
    const ketju = tehosteketju(ctx, nimi, ctx.destination, { Tuna: TynkaTuna });
    assert.ok(ketju, `${nimi} ei syntynyt`);
    assert.equal(ketju.nimi, nimi);
    assert.equal(TynkaTuna.viimeisin, ctx, `${nimi}: Tuna sidottiin väärään kontekstiin`);
    assert.equal(TynkaTuna.luotu, 1, `${nimi}: Tuna luodaan kerran per ketju`);
    assert.ok(polku(ketju.input, ctx.destination), `${nimi}: input ei kulje päätteeseen`);
    assert.ok(polku(ketju.input, ketju.output), `${nimi}: input ei kulje outputiin`);
    // Kuiva reitti ja märkä reitti: input haarautuu kahteen gainiin, ja
    // molemmat rampit kestävät ristihäivytyksen verran.
    const haarat = ketju.input.ulos;
    assert.equal(haarat.length, 2, `${nimi}: input haarautuu kuivaan ja märkään`);
    const rampit = haarat.flatMap((g) => g.gain.rampit);
    assert.ok(rampit.length >= 2, `${nimi}: ristihäivytys puuttuu`);
    for (const r of rampit) {
      assert.ok(Math.abs((r.t - ctx.currentTime) - KETJUN_HAIVYTYS_S) < 1e-9, `${nimi}: rampin kesto ${r.t - ctx.currentTime}`);
    }
    assert.equal(ketju.purettu(), false);
  }
});

test('tuntematon nimi, puuttuva konteksti tai pääte → null', () => {
  const ctx = tynkaKonteksti();
  assert.equal(tehosteketju(ctx, 'sauna', ctx.destination, { Tuna: TynkaTuna }), null);
  assert.equal(tehosteketju(null, 'luola', ctx.destination, { Tuna: TynkaTuna }), null);
  assert.equal(tehosteketju(ctx, 'luola', null, { Tuna: TynkaTuna }), null);
});

test('luola on pitkä kaiku ja radio rätisee: konvoluutio ja kohinalähde ovat ketjussa', () => {
  const luola = tynkaKonteksti();
  tehosteketju(luola, 'luola', luola.destination, { Tuna: TynkaTuna });
  const conv = luola.solmut.find((s) => s.tyyppi === 'Convolver');
  assert.ok(conv?.buffer, 'luolalla on impulssi');
  assert.ok(conv.buffer.length >= luola.sampleRate * 3, 'luolan häntä on vähintään 3 s');
  const radio = tynkaKonteksti();
  tehosteketju(radio, 'radio', radio.destination, { Tuna: TynkaTuna });
  const kohina = radio.solmut.find((s) => s.tyyppi === 'BufferSource');
  assert.ok(kohina?.kaynnistetty && kohina.loop, 'radion kohina soi silmukkana');
  assert.ok(polku(kohina, radio.destination), 'kohina summautuu ulostuloon');
  const tunaNimet = TynkaTuna.solmut.filter((s) => s.input && radio.solmut.includes(s.input)).map((s) => s.nimi);
  assert.ok(tunaNimet.includes('Bitcrusher') && tunaNimet.includes('Tremolo'), tunaNimet.join());
});

test('pura liukuu kuivaan, jättää kuivan reitin paikalleen ja irrottaa efektit vasta liu\'un jälkeen', async () => {
  const ctx = tynkaKonteksti();
  const ketju = tehosteketju(ctx, 'radio', ctx.destination, { Tuna: TynkaTuna });
  const [kuiva, marka] = ketju.input.ulos;
  ketju.pura();
  assert.equal(ketju.purettu(), true);
  assert.equal(kuiva.gain.value, 1, 'kuiva reitti nousee');
  assert.equal(marka.gain.value, 0, 'märkä reitti laskee');
  assert.equal(marka.irrotettu, 0, 'efektit eivät irtoa ennen liukua');
  await new Promise((r) => setTimeout(r, KETJUN_HAIVYTYS_S * 1000 + 120));
  assert.ok(marka.irrotettu >= 1, 'märkä reitti irrotettiin liu\'un jälkeen');
  const kohina = ctx.solmut.find((s) => s.tyyppi === 'BufferSource');
  assert.ok(kohina.pysaytetty, 'kohina pysäytettiin');
  assert.ok(polku(ketju.input, ctx.destination), 'kuiva reitti jää: kesken oleva lähde soi loppuun');
  ketju.pura(); // toinen kutsu ei tee mitään
});

test('impulssi on kaksikanavainen ja vaimenee nollaan', () => {
  const ctx = tynkaKonteksti();
  const buf = ketjunImpulssi(ctx, 0.5, 2.2, () => 1);
  assert.equal(buf.numberOfChannels, 2);
  assert.equal(buf.length, ctx.sampleRate / 2);
  const d = buf.getChannelData(0);
  assert.ok(d[0] > 0.99 && d[d.length - 1] < 0.001);
  for (let i = 1; i < d.length; i += 1) assert.ok(d[i] <= d[i - 1]);
});

/* ---------------------------------------------------------------- */
/* Akustiikka                                                        */
/* ---------------------------------------------------------------- */

test('akustiikka: tunnettu nimi jää voimaan, tuntematon ja null nollaavat', () => {
  unohdaTuna();
  assert.equal(asetaAkustiikka('luola'), 'luola');
  assert.equal(akustiikka(), 'luola');
  assert.equal(asetaAkustiikka('sauna'), null);
  assert.equal(akustiikka(), null);
  assert.equal(asetaAkustiikka('ulkoilma'), 'ulkoilma');
  assert.equal(asetaAkustiikka(null), null);
  assert.equal(akustiikka(), null);
});

/* ---------------------------------------------------------------- */
/* Kytkentäpaikat                                                    */
/* ---------------------------------------------------------------- */

test('lukijaääni kysyy akustiikan palaa aikatauluttaessaan ja purkaa ketjun lopussa', () => {
  const puhe = lue('js/puhe.js');
  assert.match(puhe, /import \{ akustiikka, tehosteketju \} from '\.\/tehosteketju\.js'/);
  assert.match(puhe, /verho\.connect\(paate\(\)\)/, 'palat kytketään päätteen kautta');
  assert.match(puhe, /const nimi = akustiikka\(\)/);
  assert.match(puhe, /tehosteketju\(piiri, nimi, suora\)/, 'ketju rakennetaan lukijan omaan piiriin');
  assert.ok((puhe.match(/puraKetju\(\)/g) ?? []).length >= 4, 'purku lopussa, pysäytyksessä, virheessä ja vaihdossa');
});

test('kohdekortti asettaa akustiikan avautuessaan ja nollaa sen sulkeutuessaan', () => {
  const fokus = lue('js/fokuskohteet.js');
  assert.match(fokus, /import \{ asetaAkustiikka \} from '\.\/tehosteketju\.js'/);
  assert.match(fokus, /asetaAkustiikka\(kohde\.akustiikka \?\? null\)/);
  assert.match(fokus, /asetaAkustiikka\(null\)/);
});

test('pakeissa on vähintään kolme luolakohdetta ja jokainen akustiikka on tunnettu', () => {
  const kansio = new URL('../js/packs/', import.meta.url);
  const tiedostot = readdirSync(kansio).filter((f) => /^fokuskohteet-[a-z]{3}\.js$/.test(f));
  const loydot = [];
  for (const f of tiedostot) {
    const src = readFileSync(new URL(f, kansio), 'utf8');
    for (const m of src.matchAll(/^\s*akustiikka: '([a-z]+)',/gm)) loydot.push({ f, arvo: m[1] });
  }
  assert.ok(loydot.length >= 3, `luolakohteita ${loydot.length}`);
  for (const l of loydot) assert.ok(AKUSTIIKAT.includes(l.arvo), `${l.f}: ${l.arvo}`);
  const luolat = loydot.filter((l) => l.arvo === 'luola').map((l) => l.f);
  for (const f of ['fokuskohteet-bih.js', 'fokuskohteet-hun.js', 'fokuskohteet-rou.js']) {
    assert.ok(luolat.includes(f), `${f}: luola puuttuu`);
  }
});

test('moduuli on kuoressa, niputuksessa oikealla kohdalla, lähdesivulla ja ratasvalikossa', () => {
  assert.match(lue('sw.js'), /'\.\/js\/tehosteketju\.js'/, 'SHELL');
  const build = lue('tools/build-standalone.mjs');
  const lohko = build.slice(build.indexOf('const MODULES = ['), build.indexOf('\n];', build.indexOf('const MODULES = [')));
  const kohta = (p) => lohko.indexOf(`'${p}'`);
  assert.ok(kohta('js/tehosteketju.js') > kohta('js/sound.js'), 'sound.js ennen tehosteketjua');
  assert.ok(kohta('js/tehosteketju.js') > kohta('js/media.js'), 'media.js ennen tehosteketjua');
  assert.ok(kohta('js/tehosteketju.js') < kohta('js/puhe.js'), 'tehosteketju ennen puhe.js:ää (tuoja)');
  const rivi = LAHTEET.flatMap((r) => r.rivit).find((r) => /Tuna 1\.1\.3/.test(r.nimi));
  assert.ok(rivi, 'lähdesivulta puuttuu Tuna');
  assert.match(rivi.lisenssi, /MIT/);
  assert.match(rivi.tekija, /DinahMoe AB & Oskar Eriksson/);
  assert.match(lue('index.html'), /id="kehittaja-tehosteketjut-btn"/);
  const main = lue('js/main.js');
  assert.match(main, /kehittaja-tehosteketjut-btn/);
  assert.match(main, /kuunteleTehosteketjut\(\)/);
});

test('radion suoraa lähetystä ei reititetä ketjuun (se ei kulje Web Audion läpi)', () => {
  const radio = lue('js/linssit/radio.js');
  assert.doesNotMatch(radio, /tehosteketju/);
  assert.doesNotMatch(radio, /createMediaElementSource\(/);
});
