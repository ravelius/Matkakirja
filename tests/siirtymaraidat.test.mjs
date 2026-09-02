/*
 * Siirtymäraitojen leikkauslogiikka (tools/generoi-siirtymamusiikki.mjs).
 *
 * Raita on saumaton looppi vain jos leikkauksen kolme palaa osuvat
 * yhteen SEKUNNIN MURTO-OSAN tarkkuudella: hännän on alettava tasan
 * siitä, mihin keski loppuu, ja häivytyksen päätyttävä tasan siihen,
 * mistä keski alkaa (työkalun otsikko "MITEN SAUMA TEHDÄÄN"). Yksikään
 * ajo ei paljastaisi virhettä siinä laskennassa — mp3 syntyisi,
 * mittarit näyttäisivät oikeaa kestoa ja tasoa, ja vika kuuluisi vasta
 * pelissä naksahduksena joka kierroksella. Siksi laskenta on puhtaita
 * funktioita ja vartioitu täällä.
 *
 * Toinen vartioitava asia on NIMET: peli hakee kolme tiedostoa nimeltä
 * ämpärin aanet/-kansiosta (js/siirtymamusiikki.js RAIDAT). Jos
 * työkalu kirjoittaisi eri nimen, ajo näyttäisi onnistuvan ja peli
 * jäisi hiljaiseksi — puuttuva raita on siellä normaali tila eikä
 * virhe.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  GENEROITAVA_MS, LAJIT, hiljaisuusVirheet, looppiLeikkaus, looppiSuodatin,
  tulkitseArgumentit, tulkitseEbur128, tulkitseLoudnorm, valitseLajit,
} from '../tools/generoi-siirtymamusiikki.mjs';

const TYOKALU = readFileSync(
  new URL('../tools/generoi-siirtymamusiikki.mjs', import.meta.url), 'utf8',
);
const PELI = readFileSync(new URL('../js/siirtymamusiikki.js', import.meta.url), 'utf8');

/* --- 1. leikkaus --------------------------------------------------- */

test('leikkaus otetaan lähteen keskeltä ja on tasan tilatun mittainen', () => {
  const { alku, looppi, risti } = looppiLeikkaus({ lahde: 24.03, looppi: 12, risti: 1.5 });
  assert.equal(looppi, 12);
  assert.equal(risti, 1.5);
  // Käytetty pala on L + R = 13,5 s, joten molemmin puolin jää 5,265 s.
  assert.ok(Math.abs(alku - 5.265) < 1e-9, `alku ${alku}`);
  // Leikkaus ei saa koskaan yltää lähteen ulkopuolelle.
  assert.ok(alku + looppi + risti <= 24.03 + 1e-9);
});

test('lyhyt lähde kaventaa ensin ristiä, ei loopin vähimmäiskestoa', () => {
  // 11 s lähteestä ei saa 12 s looppia: looppi kutistuu vähimmäismittaan
  // (10 s) ja risti saa lopun — ei toisin päin.
  const { alku, looppi, risti } = looppiLeikkaus({ lahde: 11, looppi: 12, risti: 1.5 });
  assert.equal(looppi, 10);
  assert.ok(Math.abs(risti - 1) < 1e-9, `risti ${risti}`);
  assert.ok(Math.abs(alku) < 1e-9, `alku ${alku}`);
});

test('liian lyhyt lähde kaataa leikkauksen eikä tuota vajaata looppia', () => {
  assert.throws(() => looppiLeikkaus({ lahde: 10.2, looppi: 12, risti: 1.5 }), /liian lyhyt/);
  assert.throws(() => looppiLeikkaus({ lahde: 0, looppi: 12, risti: 1.5 }), /kesto puuttuu/);
});

test('risti ei voi olla looppia pidempi', () => {
  assert.throws(() => looppiLeikkaus({ lahde: 24, looppi: 1.5, risti: 1.5 }),
    /lyhyempi kuin ristihäivytys/);
});

/* --- 2. suodatin --------------------------------------------------- */

test('suodattimen kolme palaa ovat vierekkäiset eivätkä mene päällekkäin', () => {
  const leikkaus = looppiLeikkaus({ lahde: 24, looppi: 16, risti: 2 });
  const suodatin = looppiSuodatin(leikkaus);
  const trimit = [...suodatin.matchAll(/atrim=start=([\d.]+):end=([\d.]+)/g)]
    .map(([, a, b]) => [Number(a), Number(b)]);
  assert.equal(trimit.length, 3, 'kolme palaa: pää, häntä, keski');
  const [paa, hanta, keski] = trimit;
  const { alku, looppi, risti } = leikkaus;
  assert.deepEqual(paa, [alku, alku + risti], 'pää = loopin ensimmäiset R sekuntia');
  assert.deepEqual(keski, [alku + risti, alku + looppi], 'keski jatkaa päästä');
  assert.deepEqual(hanta, [alku + looppi, alku + looppi + risti],
    'häntä alkaa tasan siitä, mihin keski loppuu — muuten sauma naksahtaa');
});

test('sauma ommellaan afade+amixilla, ei acrossfadella', () => {
  const suodatin = looppiSuodatin({ alku: 3, looppi: 16, risti: 2 });
  // acrossfade palauttaa tyhjän raidan, kun syöte on tasan häivytyksen
  // mittainen (ffmpeg 6.1.1) — juuri tämä tapaus.
  assert.ok(!suodatin.includes('acrossfade'), 'acrossfade ei kelpaa tähän');
  assert.ok(suodatin.includes('afade=t=in:st=0:d=2.000:curve=qsin'));
  assert.ok(suodatin.includes('afade=t=out:st=0:d=2.000:curve=qsin'));
  // normalize=0: amix ei saa puolittaa tasoa summatessaan.
  assert.ok(suodatin.includes('amix=inputs=2:duration=shortest:normalize=0'));
  // Mono ja 44,1 kHz jo ennen leikkausta, ks. aanet.md formaattivaatimus.
  assert.ok(suodatin.includes('channel_layouts=mono'));
  assert.ok(suodatin.includes('sample_rates=44100'));
});

/* --- 3. mittarien tulkinta ----------------------------------------- */

test('loudnormin JSON luetaan lokin lopusta', () => {
  const loki = 'Input #0, wav\n[Parsed_loudnorm_0 @ 0x1] \n'
    + '{\n\t"input_i" : "-25.35",\n\t"input_tp" : "-17.99",\n'
    + '\t"input_lra" : "0.70",\n\t"target_offset" : "0.03"\n}\n';
  assert.equal(tulkitseLoudnorm(loki).taso, -25.35);
  assert.equal(tulkitseLoudnorm('ei jsonia'), null);
  assert.equal(tulkitseLoudnorm('{ "input_i" : "N/A" }'), null);
});

test('ebur128:sta otetaan yhteenvedon viimeinen integroitu taso', () => {
  const loki = '[Parsed_ebur128_0] t: 1 M: -30.0 S: -30.0 I: -29.0 LUFS\n'
    + 'Summary:\n\n  Integrated loudness:\n    I:         -33.4 LUFS\n'
    + '    Threshold: -43.4 LUFS\n';
  assert.equal(tulkitseEbur128(loki), -33.4);
  assert.equal(tulkitseEbur128('ei mittausta'), null);
});

test('hiljaisuus päissä erotetaan hiljaisuudesta keskellä', () => {
  const alussa = hiljaisuusVirheet('silence_start: 0.0\nsilence_end: 0.9\n', 12);
  assert.equal(alussa.paissa.length, 1);
  assert.equal(alussa.keskella.length, 0);

  // Ilman silence_end-riviä jakso jatkuu tiedoston loppuun asti.
  const lopussa = hiljaisuusVirheet('silence_start: 11.4\n', 12);
  assert.equal(lopussa.paissa.length, 1);
  assert.equal(lopussa.paissa[0].loppu, 12);

  const keskella = hiljaisuusVirheet('silence_start: 5.0\nsilence_end: 5.4\n', 12);
  assert.equal(keskella.paissa.length, 0);
  assert.equal(keskella.keskella.length, 1);

  assert.deepEqual(hiljaisuusVirheet('', 12), { paissa: [], keskella: [] });
});

/* --- 4. liput ------------------------------------------------------ */

test('--laji on pakollinen ja tuntematon nimi torjutaan', () => {
  assert.match(tulkitseArgumentit([]).virhe, /--laji puuttuu/);
  assert.match(tulkitseArgumentit(['--laji']).virhe, /ilman arvoa/);
  assert.match(tulkitseArgumentit(['--hupsis']).virhe, /tuntematon argumentti/);
  assert.equal(valitseLajit('hupsis'), null);
  assert.deepEqual(valitseLajit('kaikki'), ['jalan', 'laiva', 'lento']);
  assert.deepEqual(valitseLajit('laiva'), ['laiva']);
});

test('--kuiva ja --ei-vientia luetaan lipuiksi', () => {
  const liput = tulkitseArgumentit(['--laji', 'kaikki', '--kuiva', '--ei-vientia']);
  assert.equal(liput.virhe, undefined);
  assert.deepEqual(liput, { laji: 'kaikki', kuiva: true, vienti: false });
  assert.equal(tulkitseArgumentit(['--laji', 'jalan']).vienti, true);
});

/* --- 5. kytkentä peliin ja vaatimuksiin ---------------------------- */

test('työkalu kirjoittaa tasan ne tiedostot, jotka peli hakee', () => {
  const pelinNimet = [...PELI.matchAll(/aanet\/(siirtyma-[a-z]+\.mp3)/g)].map((m) => m[1]);
  assert.equal(pelinNimet.length, 3, 'peli hakee kolme raitaa ämpärin aanet/-kansiosta');
  const tyokalunNimet = Object.values(LAJIT).map((r) => r.tiedosto);
  assert.deepEqual([...tyokalunNimet].sort(), [...pelinNimet].sort());
  // Lajien avaimet ovat samat kuin pelin SIIRTYMALAJIT-listalla.
  const lajit = PELI.match(/export const SIIRTYMALAJIT = \[([^\]]+)\]/)[1]
    .match(/'([a-z]+)'/g).map((s) => s.replaceAll("'", ''));
  assert.deepEqual(Object.keys(LAJIT), lajit);
});

test('jokainen looppi mahtuu vaatimusten 10–20 s väliin ja lähteen sisään', () => {
  for (const [nimi, raita] of Object.entries(LAJIT)) {
    assert.ok(raita.looppi >= 10 && raita.looppi <= 20, `${nimi}: looppi ${raita.looppi} s`);
    assert.ok(raita.risti >= 0.5 && raita.risti < raita.looppi, `${nimi}: risti ${raita.risti} s`);
    assert.ok(raita.looppi + raita.risti < GENEROITAVA_MS / 1000,
      `${nimi}: leikkaus ei mahdu ${GENEROITAVA_MS / 1000} s lähteeseen`);
  }
});

test('promptit ovat instrumentaaleja ja kieltävät elektroniikan', () => {
  for (const [nimi, raita] of Object.entries(LAJIT)) {
    assert.match(raita.prompt, /No modern synths/, `${nimi}: tyyli puuttuu`);
    assert.match(raita.prompt, /no vocals/, `${nimi}: laulukielto puuttuu`);
    assert.match(raita.prompt, /repeat forever/, `${nimi}: saumaohje puuttuu`);
  }
  assert.match(TYOKALU, /force_instrumental: true/);
});

test('API-avain ei koskaan päädy tulosteeseen', () => {
  const tulosteet = [...TYOKALU.matchAll(/console\.(?:log|error)\(([^\n]*)/g)].map((m) => m[1]);
  for (const rivi of tulosteet) {
    assert.ok(!/\bavain\b/.test(rivi) || /puuttuu ympäristöstä|ilman avainta/.test(rivi),
      `tuloste vuotaa avaimen: ${rivi}`);
  }
});
