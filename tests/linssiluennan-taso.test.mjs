/*
 * LINSSILUENNAN JA HIHKAISUN TASO — MYÖS PUHELIMESSA.
 *
 * Molemmat ovat soineet perustasollaan `audio.volumen` kautta, ja iOS:n
 * WebKit ei tottele sitä: kirjoitus menee läpi ilman virhettä ja lukema
 * palaa ykköseksi (js/musiikkivahvistin.js, omistajan vika 9.9.2026).
 * Puhelimessa linssiluenta ja hihkaisu ovat siis soineet TIEDOSTON
 * OMALLA TASOLLA, eikä Lukija-liuku ole tavoittanut niitä lainkaan.
 *
 * MITATTU 14.9.2026 kolmesta linssiluennasta (mpg123-decoder): viimeinen
 * näyte 0,000000, viimeisten 50 ms:n RMS −∞ dBFS, loppuhiljaisuus
 * 151–164 ms. Linssiluenta käyttäytyy siis kuin Livian repliikit eikä
 * kuin kertojan matkakirjaluenta — NAKSAHDUSTA EI OLE, eikä
 * loppuhäivytystä siksi lisätty. Tämä erä koskee vain tasoa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { asetaLinssiluennanTaso, linssiluennanTaso } from '../js/linssipuhe.js';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');

test('taso luetaan ja kirjoitetaan elementin volumeen ilman vahvistinta', () => {
  const audio = { volume: 1 };
  asetaLinssiluennanTaso(audio, 0.42);
  assert.equal(audio.volume, 0.42);
  assert.equal(linssiluennanTaso(audio), 0.42);
  asetaLinssiluennanTaso(audio, -2);
  assert.equal(audio.volume, 0);
  asetaLinssiluennanTaso(audio, 5);
  assert.equal(audio.volume, 1);
});

test('reititetyllä polulla taso menee vahvistimeen eikä volumeen', () => {
  // Juuri tämä on korjaus: iOS:ssä volume jää ykköseksi.
  const audio = { volume: 1, luennanVahvistin: { gain: { value: 1 } } };
  asetaLinssiluennanTaso(audio, 0.3);
  assert.equal(audio.luennanVahvistin.gain.value, 0.3);
  assert.equal(audio.volume, 1, 'elementin oma volume jää ykköseen');
  assert.equal(linssiluennanTaso(audio), 0.3);
});

test('tason kirjoitus ei kaadu selaimeen, joka torjuu arvon', () => {
  const audio = { set volume(v) { throw new Error('ei sallittu'); }, get volume() { return 1; } };
  assert.doesNotThrow(() => asetaLinssiluennanTaso(audio, 0.5));
  assert.doesNotThrow(() => linssiluennanTaso(null));
});

test('linssipuhe ei kirjoita tasoa suoraan volumeen muualla', () => {
  /*
   * Portin ydin: suoraan volumeen kirjoittava uusi tasonasetus toimisi
   * työpöydällä ja katoaisi puhelimessa ilman että mikään kaatuu.
   * Ainoa sallittu kirjoitus on asetaLinssiluennanTason varapolku.
   */
  const linssi = lue('../js/linssipuhe.js');
  const kirjoitukset = (linssi.match(/^\s*audio\.volume = /gm) ?? []);
  assert.equal(kirjoitukset.length, 1,
    'vain asetaLinssiluennanTaso saa kirjoittaa suoraan volumeen');
  assert.match(linssi, /export function asetaLinssiluennanTaso\(audio, arvo\)/);
});

test('crossOrigin asetetaan ennen srciä ja vain reitittävällä polulla', () => {
  for (const [polku, ehto] of [
    ['../js/linssipuhe.js', /if \(!linssinVolumeToimii\(\)\) audio\.crossOrigin = 'anonymous';/],
    ['../js/ui.js', /if \(reititetaan\) audio\.crossOrigin = 'anonymous';/],
  ]) {
    const lahde = lue(polku);
    const cross = lahde.indexOf("audio.crossOrigin = 'anonymous'");
    const src = lahde.indexOf('audio.src =', cross);
    assert.ok(cross > 0, `${polku}: crossOrigin puuttuu`);
    assert.ok(src > cross, `${polku}: crossOrigin on asetettava ennen srciä`);
    assert.match(lahde, ehto, `${polku}: lupa pyydetään myös reitittämättömällä polulla`);
  }
});

test('hihkaisu vie tason vahvistimeen kun elementin volume ei kelpaa', () => {
  // ui.js: vahvistin ensin, volume vain varapolkuna.
  const ui = lue('../js/ui.js');
  const kohta = ui.slice(ui.indexOf('soitaHihkaisu(lahde) {'));
  const runko = kohta.slice(0, kohta.indexOf('\n  }'));
  assert.match(runko, /const reititetaan = !volumeToimii\(\);/);
  assert.match(runko, /if \(vahvistin\) vahvistin\.gain\.value = /,
    'taso ei mene vahvistimeen');
  assert.match(runko, /else audio\.volume = puheVoima\(\);/,
    'varapolku puuttuu — reitittämätön hihkaisu soisi täydellä');
  assert.match(runko, /irrotaMusiikinVahvistin\(audio\)/,
    'reititys jää purkamatta ja soitin muistiin');
});
