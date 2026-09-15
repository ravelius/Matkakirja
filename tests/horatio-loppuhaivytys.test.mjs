/*
 * KERTOJAN TASO JA LOPPUHÄIVYTYS — MYÖS PUHELIMESSA.
 *
 * Kertojan loppuhäivytys (`pehmeaLoppu`) on ollut olemassa kauan, ja
 * MITATTU 14.9.2026 kolmesta tuotanto-mp3:sta (mpg123-decoder) kertoo,
 * miksi se tarvitaan: toisin kuin Livian äänitteet, kertojan äänite EI
 * pääty hiljaisuuteen.
 *
 *   tiedosto   loppu 50 ms RMS   viimeinen näyte   loppuhiljaisuus
 *   pariisi    −36,9 dBFS        −0,000850         0,0 ms
 *   ateena     −37,6 dBFS        −0,005189         0,0 ms
 *   lontoo     −31,7 dBFS        +0,011618         0,0 ms
 *
 * Lontoon viimeinen näyte on −38,7 dBFS:n DC-hyppy nollaan — juuri se
 * töksähdys, jonka pehmeaLoppu estää.
 *
 * Vika oli, että KOKO häivytys kirjoitti `audio.volumeen`, jota iOS ei
 * tottele (js/musiikkivahvistin.js): puhelimessa `pause()` osui täyteen
 * ääneen 25 ms ennen tiedoston reunaa. Nämä testit vartioivat sitä,
 * että taso menee sitä polkua, jota selain tottelee — ja ettei
 * häivytyksen käyrää samalla muutettu.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { asetaLuennanTaso, luennanTaso } from '../js/luenta.js';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');

test('taso luetaan ja kirjoitetaan elementin volumeen ilman vahvistinta', () => {
  const audio = { volume: 1 };
  asetaLuennanTaso(audio, 0.42);
  assert.equal(audio.volume, 0.42);
  assert.equal(luennanTaso(audio), 0.42);
  asetaLuennanTaso(audio, -2);
  assert.equal(audio.volume, 0);
  asetaLuennanTaso(audio, 5);
  assert.equal(audio.volume, 1);
});

test('reititetyllä polulla taso menee vahvistimeen eikä volumeen', () => {
  // iOS:ssä volume jää ykköseksi, joten taso on pakko viedä gainiin.
  const audio = { volume: 1, luennanVahvistin: { gain: { value: 1 } } };
  asetaLuennanTaso(audio, 0.3);
  assert.equal(audio.luennanVahvistin.gain.value, 0.3);
  assert.equal(audio.volume, 1, 'elementin oma volume jää ykköseen');
  assert.equal(luennanTaso(audio), 0.3);
});

test('tason kirjoitus ei kaadu selaimeen, joka torjuu arvon', () => {
  // iOS heittää joissakin tiloissa; luennan on jatkuttava silti.
  const audio = { set volume(v) { throw new Error('ei sallittu'); }, get volume() { return 1; } };
  assert.doesNotThrow(() => asetaLuennanTaso(audio, 0.5));
  assert.doesNotThrow(() => luennanTaso(null));
});

test('yhtään tason kirjoitusta ei jäänyt suoraan volumeen', () => {
  /*
   * Tämä on portin ydin: jos uusi häivytys- tai liukukohta kirjoittaa
   * suoraan `audio.volumeen`, se toimii työpöydällä ja katoaa
   * puhelimessa — eikä mikään kaadu. Ainoa sallittu kirjoitus on
   * asetaLuennanTason sisällä oleva varapolku.
   */
  const luenta = lue('../js/luenta.js');
  const kirjoitukset = (luenta.match(/^\s*audio\.volume = /gm) ?? []);
  assert.equal(kirjoitukset.length, 1,
    'vain asetaLuennanTaso saa kirjoittaa suoraan volumeen');
  assert.match(luenta, /export function asetaLuennanTaso\(audio, arvo\)/);
});

test('häivytyksen käyrää ei muutettu', () => {
  // Omistajan hienosäätämät kynnykset: 120 ms ramppi, 25 ms hiljaisuus
  // ennen tiedoston reunaa, ease-in. Vain kirjoituspaikka vaihtui.
  const luenta = lue('../js/luenta.js');
  assert.match(luenta, /const LOPUN_HAIPYMA_S = 0\.12;/);
  assert.match(luenta, /const LOPUN_HILJAISUUS_S = 0\.025;/);
  assert.match(luenta, /const pehmene = \(t\) => Math\.max\(0, Math\.min\(1, t\)\) \*\* 1\.8;/);
  // Loppu vaietaan nollaan ennen pysäytystä.
  assert.match(luenta, /asetaLuennanTaso\(audio, 0\);\n\s*\/\*/);
});

test('crossOrigin asetetaan ennen srciä ja kaikilla laitteilla', () => {
  /*
   * MUUTOS 15.9.2026 (omistaja: *"Kajutin kuvake elää, mutta se ei elä
   * puheen tahdissa."*). Ennen crossOrigin pyydettiin vain iOS:n
   * reitittävällä polulla, koska reititystä tarvittiin vain tason
   * kirjoittamiseen. Nyt luenta reititetään KAIKILLA laitteilla, jotta
   * kaiuttimen VU-mittari saa ketjun AnalyserNodesta todellisen
   * äänitason — ja ilman CORS-lupaa MediaElementSource antaisi
   * hiljaisuutta ilman virhettä. Srcin jälkeen asetettuna lupa ei
   * vaikuttaisi lainkaan, joten järjestys on yhä sitova.
   */
  const luenta = lue('../js/luenta.js');
  const kohta = luenta.slice(luenta.indexOf('function luentaSoitin'));
  const runko = kohta.slice(0, kohta.indexOf('\n}'));
  const cross = runko.indexOf('crossOrigin');
  const src = runko.indexOf('audio.src =');
  assert.ok(cross > 0 && src > cross, 'crossOrigin on asetettava ennen srciä');
  assert.match(runko, /^\s*audio\.crossOrigin = 'anonymous';$/m);
  assert.doesNotMatch(runko, /kertojanVolumeToimii/,
    'iOS-portti on poistettu: reititys on kaikilla laitteilla');
});

test('luenta reititetään kaikilla laitteilla ja uusitaan kontekstin herätessä', () => {
  /*
   * JUURISYY, jonka tämä vartioi (omistaja 15.9.2026, iPhone v1908):
   * `AudioContext.resume()` on asynkroninen, joten istunnon
   * ensimmäinen luenta jäi reitittämättä, analysaattoria ei ollut ja
   * kaiuttimen kaaret piirsivät ajastettua kuviota. Uusinta korjaa sen.
   */
  const luenta = lue('../js/luenta.js');
  assert.match(luenta, /function liitaLuennanVahvistin\(audio\) \{\n\s*if \(!audio \|\| audio\.luennanVahvistin\)/,
    'reititys ei saa portittua volumen tottelemisella');
  assert.match(luenta, /kuunteleReitityksenAvautumista/,
    'reititys on yritettävä uudelleen, kun äänikonteksti herää');
  assert.match(luenta, /if \(!liitaLuennanVahvistin\(audio\)\) varaaReitityksenUusinta\(audio\);/);
  // Vahti on purettava, ettei kuollut soitin jää odottajaksi.
  assert.match(luenta, /function irrotaLuennanVahvistin\(audio\) \{\n\s*audio\?\.luennanReititysvahti\?\.\(\);/);
});
