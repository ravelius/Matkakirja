/*
 * ══════════════════════════════════════════════════════════════════
 * MUSIIKIN SÄÄDIN: KÄYRÄ JA REITTI — VARTIO
 * ══════════════════════════════════════════════════════════════════
 *
 * Omistajan vika 9.9.2026 klo 16.30, sanatarkasti: *"Taustamusiikki on
 * ainakin iPhonilla vielä aivan liian kovalla. Saisiko säätimen niin,
 * että se oikeasti toimisi ja sen pystyisi säätämään todella isolla
 * välillä, niin, että musiikin saisi oikeasti säädettyä oikealle
 * tasolle?"*
 *
 * Kaksi asiaa, ja tämä tiedosto vartioi molempia:
 *
 *  1. KÄYRÄ (js/musiikkivalitsin.js musiikinVahvistus) — puhdas
 *     funktio, jonka rajat, monotonisuus ja oletus ovat testattavissa
 *     ilman selainta. Nolla on aito hiljaisuus ja väli laaja; juuri ne
 *     omistaja pyysi.
 *  2. REITTI (js/musiikkivahvistin.js) — taso menee perille GainNodella
 *     eikä elementin volumella, koska iOS:n WebKit ei tottele volumea.
 *     Testi ajaa mockatun AudioContextin ja tarkistaa, että ketju
 *     rakentuu ja gain saa arvonsa — ja että ilman kontekstia käytös on
 *     täsmälleen entinen (volume-varareitti).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  MUSIIKIN_KATTO, MUSIIKIN_KAYRA, MUSIIKIN_LIUKU_MAX, MUSIIKIN_LIUKU_MIN,
  MUSIIKIN_LIUKU_OLETUS, asetaMusiikinLiuku, musiikinKerroin, musiikinLiuku,
  musiikinLiuunTeksti, musiikinVahvistus,
} from '../js/musiikkivalitsin.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

/* ── 1. käyrä: puhdas funktio ────────────────────────────────────── */

test('käyrän rajat: 0 on hiljaisuus ja 100 on täysi', () => {
  assert.equal(musiikinVahvistus(MUSIIKIN_LIUKU_MIN), 0,
    'säätimen alaraja ei ole aito hiljaisuus');
  assert.equal(musiikinVahvistus(MUSIIKIN_LIUKU_MAX), 1);
  assert.equal(MUSIIKIN_KAYRA, 2.5, 'käyrä on kirjattava vakioksi, ei laskettava lennossa');
});

test('käyrä on aidosti kasvava koko matkaltaan', () => {
  let edellinen = -1;
  for (let x = 0; x <= 100; x += 1) {
    const v = musiikinVahvistus(x);
    assert.ok(v > edellinen, `käyrä ei kasva kohdassa ${x}: ${v} <= ${edellinen}`);
    edellinen = v;
  }
});

test('väli on laaja ja korvan mukainen', () => {
  const dB = (x) => 20 * Math.log10(musiikinVahvistus(x));
  // Puolivälissä ollaan jo selvästi alle täyden — lineaarinen säädin
  // olisi tässä vain −6 dB, ja juuri se teki entisestä säätimestä
  // hyödyttömän ("ei vaikuta ollenkaan").
  assert.ok(dB(50) < -12, `puoliväli ${dB(50).toFixed(1)} dB ei ole tarpeeksi alhaalla`);
  assert.ok(dB(10) < -40, `kymmenes ${dB(10).toFixed(1)} dB ei ole tarpeeksi hiljainen`);
  // Askel kuuluu suunnilleen samana kaikkialla: potenssikäyrän askel
  // on vakio desibeleinä lukuun ottamatta aivan alarajaa.
  const askel = (x) => dB(x) - dB(x - 5);
  assert.ok(Math.abs(askel(50) - askel(80)) < 3,
    'säätimen askel kuuluu eri kokoisena eri kohdissa — käyrä ei ole korvan mukainen');
});

test('kelvoton ja rajojen ulkopuolinen arvo rajataan', () => {
  assert.equal(musiikinVahvistus(-20), 0);
  assert.equal(musiikinVahvistus(500), 1);
  // NaN ei saa päätyä GainNodeen: se vaientaisi koko ketjun ilman virhettä.
  assert.ok(Number.isFinite(musiikinVahvistus(Number.NaN)));
  assert.ok(Number.isFinite(musiikinVahvistus('roska')));
  assert.ok(Number.isFinite(musiikinVahvistus(undefined)));
});

test('oletus on entistä tasoa hiljaisempi ja tallennettava', () => {
  asetaMusiikinLiuku(MUSIIKIN_LIUKU_OLETUS);
  assert.equal(musiikinLiuku(), MUSIIKIN_LIUKU_OLETUS);
  assert.equal(MUSIIKIN_LIUKU_OLETUS, 35, 'oletus on kirjattava vakioksi');
  // Kerroin 1,0 oli 8.9.2026 hyväksytty taso; oletuksen pitää jäädä sen
  // alle (omistaja 9.9.2026: *"vielä aivan liian kovalla"*).
  assert.ok(musiikinKerroin() < 1, `oletuskerroin ${musiikinKerroin()} ei ole hiljaisempi`);
  assert.ok(musiikinKerroin() > 0.3, 'oletus on niin hiljainen ettei musiikkia kuule lainkaan');
  assert.ok(Math.abs(musiikinVahvistus(35) - 0.0725) < 0.001);
  // Yläpää antaa varaa hiljaiselle laitteelle.
  asetaMusiikinLiuku(MUSIIKIN_LIUKU_MAX);
  assert.equal(musiikinKerroin(), MUSIIKIN_KATTO);
  asetaMusiikinLiuku(MUSIIKIN_LIUKU_OLETUS);
});

test('lukema kertoo desibelit, koska korva kuulee niitä', () => {
  assert.match(musiikinLiuunTeksti(0), /vaiti/);
  assert.match(musiikinLiuunTeksti(100), /^100 · 0 dB$/);
  assert.match(musiikinLiuunTeksti(35), /^35 · −2[23] dB$/);
});

test('säädin rajaa ja pyöristää', () => {
  assert.equal(asetaMusiikinLiuku(-5), 0);
  assert.equal(asetaMusiikinLiuku(999), 100);
  assert.equal(asetaMusiikinLiuku('42.7'), 43, 'liuku ei pyöristy kokonaisluvuksi');
  // Kelvoton arvo palaa oletukseen — ei jää roskaksi eikä NaN:iksi.
  assert.equal(asetaMusiikinLiuku('42,7'), MUSIIKIN_LIUKU_OLETUS);
  assert.equal(asetaMusiikinLiuku(Number.NaN), MUSIIKIN_LIUKU_OLETUS);
});

/* ── 2. reitti: mockattu AudioContext ────────────────────────────── */

/** Pienin mahdollinen AudioContext, joka kelpaa reititykseen. */
function tekoKonteksti(tila = 'running') {
  const kytkennat = [];
  const solmu = (nimi, lisa = {}) => {
    const s = {
      nimi,
      connect(kohde) { kytkennat.push([nimi, kohde?.nimi ?? 'ulos']); return kohde; },
      disconnect() { s.purettu = true; },
      ...lisa,
    };
    return s;
  };
  return {
    state: tila,
    currentTime: 0,
    kytkennat,
    destination: solmu('ulos'),
    createMediaElementSource(el) { return solmu('lahde', { media: el }); },
    createGain() {
      return solmu('gain', {
        gain: {
          value: 0,
          cancelScheduledValues() {},
          setValueAtTime() {},
          linearRampToValueAtTime() {},
        },
      });
    },
    createAnalyser() { return solmu('mittari', { fftSize: 0 }); },
    resume() { return Promise.resolve(); },
  };
}

/** Tynkä <audio>, joka TOTTELEE volumea (työpöytäselain). */
class TekoAudio {
  constructor() { this.volume = 1; }
}

/** Tynkä <audio>, joka EI tottele volumea (iOS:n WebKit). */
class ItsepainenAudio {
  constructor() { this._v = 1; }

  get volume() { return 1; }

  set volume(_) { /* WebKit: kirjoitus menee läpi, lukema pysyy ykkösenä */ }
}

/*
 * Tuoreet moduulikopiot: muistettu volume-mittaus ei saa vuotaa testien
 * välillä.
 *
 * SIIVOUS ON PAKOLLINEN. `sfx` on koko prosessin jakama singleton ja
 * `Audio`/`window` ovat globaaleja — ilman palautusta tämä tiedosto
 * kaataisi muut äänitestit samassa ajossa (mitattu: siirtymäraidat ja
 * ambienssin silmukkatesti). Palautus rekisteröidään testin omaan
 * `after`-koukkuun, jotta se ajetaan myös epäonnistuneen väitteen
 * jälkeen.
 */
async function lataaVahvistin(t, { ctx, Audio = TekoAudio }) {
  const alkuAudio = globalThis.Audio;
  const alkuWindow = globalThis.window;
  const alkuDocument = globalThis.document;
  const { sfx } = await import('../js/sound.js');
  const alkuCtx = sfx.ctx;
  const alkuEnsure = sfx.ensureContext;
  t.after(() => {
    globalThis.Audio = alkuAudio;
    globalThis.window = alkuWindow;
    globalThis.document = alkuDocument;
    sfx.ctx = alkuCtx;
    sfx.ensureContext = alkuEnsure;
  });
  globalThis.Audio = Audio;
  globalThis.window = { AudioContext: null };
  // Volume-mittaus tehdään document.createElementilla, jottei se näy
  // soittimien kirjanpidossa yhtenä soittimena lisää.
  globalThis.document = { createElement: () => new Audio() };
  sfx.ctx = ctx;
  sfx.ensureContext = () => ctx;
  const mod = await import(`../js/musiikkivahvistin.js?t=${Math.random()}`);
  mod.nollaaMusiikkivahvistin();
  return mod;
}

test('reititys rakentaa ketjun ja taso menee gainiin', async (t) => {
  const ctx = tekoKonteksti('running');
  const mod = await lataaVahvistin(t, { ctx });
  const audio = new TekoAudio();

  const gain = mod.liitaMusiikkiin(audio);
  assert.ok(gain, 'reititys ei onnistunut käynnissä olevaan kontekstiin');
  assert.equal(audio.aaniVahvistin, gain);
  assert.deepEqual(ctx.kytkennat, [['lahde', 'gain'], ['gain', 'mittari'], ['mittari', 'ulos']]);
  // Reititetyn elementin oma volume on osa ketjua ja jää ykköseen.
  assert.equal(audio.volume, 1);

  mod.asetaMusiikinTaso(audio, 0.0123);
  assert.equal(gain.gain.value, 0.0123, 'taso ei mennyt gainiin');
  assert.equal(mod.lueMusiikinTaso(audio), 0.0123);
  // Gain saa ylittää ykkösen, toisin kuin elementin volume.
  mod.asetaMusiikinTaso(audio, 4);
  assert.equal(gain.gain.value, 4);
  // Negatiivinen ja kelvoton arvo eivät saa päätyä graafiin.
  mod.asetaMusiikinTaso(audio, -1);
  assert.equal(gain.gain.value, 0);
  mod.asetaMusiikinTaso(audio, Number.NaN);
  assert.equal(gain.gain.value, 0);

  mod.irrotaMusiikinVahvistin(audio);
  assert.equal(audio.aaniVahvistin, null);
  assert.equal(audio.aaniSolmut, null);
});

test('varareitti ilman AudioContextia: taso menee volumeen kuten ennen', async (t) => {
  const mod = await lataaVahvistin(t, { ctx: null });
  const audio = new TekoAudio();

  assert.equal(mod.liitaMusiikkiin(audio), null, 'reititys onnistui ilman kontekstia');
  assert.ok(mod.volumeToimii(), 'tämä tynkä tottelee volumea');
  assert.ok(mod.musiikkiSaaSoida(audio), 'volume toimii — raidan saa päästää soimaan');
  mod.asetaMusiikinTaso(audio, 0.034);
  assert.equal(audio.volume, 0.034);
  // Volume ei voi ylittää ykköstä; se on koko varareitin rajoitus.
  mod.asetaMusiikinTaso(audio, 4);
  assert.equal(audio.volume, 1);
});

test('nukkuva konteksti ei reitity — ja odottaja herää kun se herää', async (t) => {
  const ctx = tekoKonteksti('suspended');
  const mod = await lataaVahvistin(t, { ctx });
  const audio = new TekoAudio();
  assert.equal(mod.liitaMusiikkiin(audio), null,
    'nukkuvaan kontekstiin reititetty raita jäisi kokonaan mykäksi');

  let heratyksia = 0;
  mod.kuunteleReitityksenAvautumista(() => { heratyksia += 1; });
  assert.equal(heratyksia, 0, 'nukkuva konteksti herätti odottajan turhaan');

  // Konteksti herää (iOS: eleen jälkeen, asynkronisesti) — ja NYT reititys onnistuu.
  ctx.state = 'running';
  assert.ok(mod.liitaMusiikkiin(audio), 'herännyt konteksti ei kelvannut reititykseen');
  // Uusi ilmoittautuminen käynnissä olevaan kontekstiin herättää heti:
  // soitin ei saa jäädä odottamaan elettä, joka on jo tapahtunut.
  mod.kuunteleReitityksenAvautumista(() => { heratyksia += 1; });
  assert.equal(heratyksia, 1);
});

test('iOS: ilman vahvistinta raita ei saa soida (se soisi täydellä)', async (t) => {
  const mod = await lataaVahvistin(t, { ctx: null, Audio: ItsepainenAudio });
  const audio = new ItsepainenAudio();
  assert.equal(mod.volumeToimii(), false, 'volume-mittaus ei tunnistanut WebKitin käytöstä');
  assert.equal(mod.musiikkiSaaSoida(audio), false,
    'reitittämätön raita päästettiin soimaan selaimessa, joka ei tottele volumea');

  // Reititettynä sama raita saa soida: taso menee gainiin eikä volumeen.
  const ctx = tekoKonteksti('running');
  const mod2 = await lataaVahvistin(t, { ctx, Audio: ItsepainenAudio });
  const audio2 = new ItsepainenAudio();
  const gain = mod2.liitaMusiikkiin(audio2);
  assert.ok(gain);
  assert.equal(mod2.musiikkiSaaSoida(audio2), true);
  mod2.asetaMusiikinTaso(audio2, 0.02);
  assert.equal(gain.gain.value, 0.02);
  assert.equal(audio2.volume, 1, 'WebKitin volume pysyy ykkösenä — juuri siksi gain tarvitaan');
});

/* ── 3. lähdekoodivartio: jokainen musiikkireitti kulkee vahvistimen kautta ── */

test('kaikki musiikkisoittimet pyytävät vahvistinta', () => {
  const REITIT = {
    '../js/ambience-stream.js': 'pohjaraita, kaupunkiraidat, visamusiikki',
    '../js/siirtymamusiikki.js': 'siirtymä- ja linssiraidat',
    '../js/ui.js': 'aarteen paljastusaihe',
  };
  for (const [tiedosto, mita] of Object.entries(REITIT)) {
    const koodi = lue(tiedosto);
    assert.match(koodi, /liitaMusiikkiin\(/,
      `${tiedosto} (${mita}) ei reititä musiikkiaan — iOS soittaisi sen täydellä`);
    assert.match(koodi, /musiikkiSaaSoida\(/,
      `${tiedosto} (${mita}) päästää raidan soimaan tarkistamatta, meneekö taso perille`);
  }
});

test('crossOrigin asetetaan ennen srciä, jotta Web Audio saa kuulla äänen', () => {
  for (const tiedosto of ['../js/siirtymamusiikki.js', '../js/ui.js']) {
    const koodi = lue(tiedosto);
    assert.match(koodi, /crossOrigin = 'anonymous';\s*\n\s*audio\.src =/,
      `${tiedosto}: crossOrigin ei ole ennen srciä — ketju olisi hiljainen ilman virhettä`);
  }
  // Palvelutyöntekijän äänipeili noutaa CORS-tilassa, joten lupa
  // saadaan myös välimuistista (sw.js aaniPeilista).
  assert.match(lue('../sw.js'), /fetch\(pyynto\.url, \{ mode: 'cors' \}\)/);
});
