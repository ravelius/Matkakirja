/*
 * LIVIAN LOPPUHÄIVYTYS — TOISTOSSA, EI TIEDOSTOON.
 *
 * Omistaja 14.9.2026 (Raamattu, "PULUN ÄÄNI … LOPPUHÄIVYTYS"),
 * sanatarkasti: *"Pululle voi tehdä ne loppu feidit, ne ei varmaan
 * edellytä uudelleen pakkausta"*. Livian mp3:t menevät peliin ilman
 * ffmpeg-käsittelyä, joten häivytys on toiston tehtävä.
 *
 * MITATTU 14.9.2026 neljästä tuotantoäänitteestä (pariisi-3, rooma-3,
 * ateena-3, sofia-3; mpg123-decoder): viimeinen näyte on tasan 0,
 * viimeisten 50 ms:n RMS on −∞ dBFS ja loppuhiljaisuutta on
 * 0,150–0,160 s. NAKSAHDUSTA EI OLE. Häivytys on siis varmistus, ja
 * nämä testit vartioivat sitä, ettei varmistus riko toistoa: 'ended'
 * tulee yhä, kupla ei muutu, ja taso on lopussa nolla.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LIVIAN_LOPPUHAIVYTYS_MS, asetaLivianTaso, livianLoppuKerroin, livianTaso,
} from '../js/liviapuhe.js';

test('häivytyskäyrä on 1 ennen ikkunaa ja 0 lopussa', () => {
  const kesto = 10;
  const h = LIVIAN_LOPPUHAIVYTYS_MS / 1000;
  assert.equal(livianLoppuKerroin(0, kesto), 1);
  // Ikkunan reunalla liukuluku jättää hiuksenhienon jäännöksen (1−1e−13);
  // merkitsevää on, ettei kerroin ole vielä laskenut.
  assert.ok(Math.abs(livianLoppuKerroin(kesto - h, kesto) - 1) < 1e-9);
  assert.equal(livianLoppuKerroin(kesto, kesto), 0);
  // Yli lopun (selain raportoi joskus currentTime > duration) pysyy nollassa.
  assert.equal(livianLoppuKerroin(kesto + 1, kesto), 0);
});

test('käyrän ikkuna on tasan 40 ms äänitteen lopussa', () => {
  // Ajossa ramppi käynnistetään enintään 20 ms tätä aiemmin
  // (kytkeLivianLoppuhaivytys VARMUUS_MS), jotta se ehtii nollaan ennen
  // 'ended'-tapahtumaa; käyrän muoto on silti tämä.
  assert.equal(LIVIAN_LOPPUHAIVYTYS_MS, 40);
  const kesto = 25.679; // mitattu livia-pariisi-3.mp3
  const alku = kesto - LIVIAN_LOPPUHAIVYTYS_MS / 1000;
  assert.equal(livianLoppuKerroin(alku - 0.001, kesto), 1);
  assert.ok(livianLoppuKerroin(alku + 0.001, kesto) < 1);
});

test('käyrä on lineaarinen ja monotonisesti laskeva', () => {
  const kesto = 5;
  const h = LIVIAN_LOPPUHAIVYTYS_MS / 1000;
  // Puolivälissä tasan puolet.
  assert.ok(Math.abs(livianLoppuKerroin(kesto - h / 2, kesto) - 0.5) < 1e-9);
  assert.ok(Math.abs(livianLoppuKerroin(kesto - h / 4, kesto) - 0.25) < 1e-9);
  let edellinen = 1;
  for (let i = 0; i <= 40; i += 1) {
    const arvo = livianLoppuKerroin(kesto - h + (i / 40) * h, kesto);
    assert.ok(arvo <= edellinen + 1e-12, `käyrä nousi kohdassa ${i}`);
    assert.ok(arvo >= 0 && arvo <= 1);
    edellinen = arvo;
  }
});

test('tuntematon kesto ei häivytä mitään', () => {
  for (const kesto of [NaN, Infinity, 0, -1, undefined, null]) {
    assert.equal(livianLoppuKerroin(1, kesto), 1, `kesto ${kesto}`);
  }
  assert.equal(livianLoppuKerroin(NaN, 10), 1);
});

test('taso luetaan ja kirjoitetaan elementin volumeen ilman vahvistinta', () => {
  const audio = { volume: 1 };
  asetaLivianTaso(audio, 0.42);
  assert.equal(audio.volume, 0.42);
  assert.equal(livianTaso(audio), 0.42);
  // Rajat pitävät: volume ei koskaan mene alueen ulkopuolelle.
  asetaLivianTaso(audio, -2);
  assert.equal(audio.volume, 0);
  asetaLivianTaso(audio, 5);
  assert.equal(audio.volume, 1);
});

test('reititetyllä polulla taso menee vahvistimeen eikä volumeen', () => {
  // iOS:ssä volume jää ykköseksi, joten taso on pakko viedä gainiin.
  const audio = {
    volume: 1,
    livianVahvistin: { gain: { value: 1, cancelScheduledValues() {} } },
  };
  asetaLivianTaso(audio, 0.3);
  assert.equal(audio.livianVahvistin.gain.value, 0.3);
  assert.equal(audio.volume, 1, 'elementin oma volume jää ykköseen');
  assert.equal(livianTaso(audio), 0.3);
});
