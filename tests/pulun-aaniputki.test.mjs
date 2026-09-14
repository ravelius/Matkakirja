/**
 * PULUN ÄÄNIPUTKEN KAKSI SITOVAA SÄÄNTÖÄ (omistaja 14.9.2026).
 *
 * 1. ALKUPERÄISET ÄÄNITIEDOSTOT SÄILYTETÄÄN AINA. Jokaisen maksullisen
 *    generoinnin raakatuotos viedään ämpäriin versionoituun avaimeen
 *    ENNEN käsittelyä, kuitti kirjaa avaimen ja sha256:n, eikä raakaa
 *    koskaan ylikirjoiteta. Ajo, joka voisi jatkaa ilman raakavientiä,
 *    on virheellinen: työkalun pitää KIELTÄYTYÄ, ei jatkaa hiljaa.
 *
 * 2. ELEVENLABSIN OLETUSASETUKSET, EI FFMPEG-KÄSITTELYÄ. Omistaja kuuli
 *    uusissa äänissä "pienen digitaalisen häiriön". Mitattu syy oli
 *    toinen häviöllinen mp3-sukupolvi: ketju purki ElevenLabsin
 *    mp3_44100_128:n ja koodasi sen uudelleen samalla 128 kbps:llä.
 *    Mallin mp3 menee nyt sellaisenaan sekä raaka- että final-avaimeen.
 *    Malli (eleven_v3), ääni (Flicker) ja tekstin tagit eivät muutu.
 *
 * Nämä vartiot lukevat työkalun lähdekoodin, koska varsinainen ajo on
 * maksullinen eikä sitä voi testissä käynnistää.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  LIVIA_KASITTELY, PULU_ULOSTULOMUOTO, raakaAmpariKansio, raakavientiEste, tulkitseArgumentit,
} from '../tools/generoi-pulu.mjs';
import { OUTPUT_FORMAT as HORATIO_ULOSTULOMUOTO } from '../tools/generoi-luennat.mjs';
import { kelpaaUlostulomuoto } from '../tools/kohdista-pulu-eleet.mjs';

const LAHDE = readFileSync(new URL('../tools/generoi-pulu.mjs', import.meta.url), 'utf8');

// ── 1. raakavienti ─────────────────────────────────────────────────

test('maksullinen generointi kieltäytyy ilman raakavientiä', () => {
  const este = raakavientiEste(tulkitseArgumentit(['--repliikit', 'ateena-3', '--ei-vientia']));
  assert.ok(este, '--ei-vientia olisi saanut generoida — raakavienti jäisi tekemättä');
  assert.match(este, /raakavient/i);
});

test('vienti päällä ja kuiva ajo saavat jatkaa', () => {
  assert.equal(raakavientiEste(tulkitseArgumentit(['--repliikit', 'ateena-3'])), null);
  assert.equal(raakavientiEste(tulkitseArgumentit(['--kuiva', '--ei-vientia'])), null);
  assert.equal(raakavientiEste(tulkitseArgumentit(['--aanet'])), null);
});

test('raaka-avain on eräkohtainen eikä voi ylikirjoittaa toista erää', () => {
  const a = raakaAmpariKansio('aanet/pulu', 'pulu-aaaaaaaaaaaaaaaaaaaa');
  const b = raakaAmpariKansio('aanet/pulu', 'pulu-bbbbbbbbbbbbbbbbbbbb');
  assert.equal(a, 'aanet/pulu/raaka/pulu-aaaaaaaaaaaaaaaaaaaa');
  assert.notEqual(a, b);
  // Avain ei saa karata toiseen kansioon erätunnuksen kautta, eikä
  // kelvotonta tunnusta siivota kelvolliseksi (se voisi törmätä).
  assert.throws(() => raakaAmpariKansio('aanet/pulu', '../live'), /erätunnu/);
  assert.throws(() => raakaAmpariKansio('aanet/pulu', ''), /erätunnu/);
});

test('raaka viedään ämpäriin ennen viimeistelyä ja kuittiin tulee avain', () => {
  const vienti = LAHDE.indexOf('vieAmpariin(lahde, raakaNimi, raakaKansioAmpari)');
  assert.ok(vienti > 0, 'raakatiedostoa ei viedä ämpäriin lainkaan');
  const kasittely = LAHDE.indexOf('if (LIVIA_KASITTELY) {');
  assert.ok(vienti < kasittely, 'raaka on vietävä ENNEN käsittelyä, ei sen jälkeen');
  assert.match(LAHDE, /objectKey: `\$\{raakaKansioAmpari\}\/\$\{raakaNimi\}`/);
  assert.match(LAHDE, /raakatiedoston vienti epäonnistui/);
  // Molemmat kuittihaarat (hylätty ja onnistunut) kirjaavat saman raa'an.
  assert.equal((LAHDE.match(/rawArtifact: raakaTiedot,/g) ?? []).length, 2);
});

// ── 2. ei käsittelyä, ei uudelleenkoodausta ────────────────────────

test('Livian jälkikäsittely on pois', () => {
  assert.equal(LIVIA_KASITTELY, false);
});

test('mallin mp3 kopioidaan sellaisenaan, ei koodata uudelleen', () => {
  assert.match(LAHDE, /copyFileSync\(lahde, kohde\)/);
  // libmp3lame saa esiintyä vain käsittelyhaarassa, joka on nyt kuollut
  // kirjain; kopioiva haara ei saa kutsua ffmpegiä lainkaan.
  const haara = LAHDE.slice(LAHDE.indexOf('} else {', LAHDE.indexOf('if (LIVIA_KASITTELY) {')),
    LAHDE.indexOf('const tulos = tarkista(kohde);'));
  assert.equal(haara.includes('ffmpeg'), false, `ffmpeg kopiohaarassa: ${haara}`);
  assert.equal(haara.includes('libmp3lame'), false);
});

test('kaikuversiota ei tehdä, kun käsittely on pois', () => {
  assert.match(LAHDE, /if \(tyo\.kaikuNimi && !LIVIA_KASITTELY\)/);
});

// ── 3. ElevenLabsin oletusasetukset ────────────────────────────────

test('voice_settings antaa vain stabilityn', () => {
  const runko = LAHDE.slice(LAHDE.indexOf('voice_settings: {'),
    LAHDE.indexOf('signal: AbortSignal.timeout(180000)'));
  assert.match(runko, /stability: STABILITY/);
  for (const kentta of ['similarity_boost', 'style', 'use_speaker_boost']) {
    assert.equal(runko.includes(kentta), false,
      `${kentta} lähetetään yhä — omistaja tilasi rajapinnan omat oletukset`);
  }
});

// ── 4. ulostulomuoto 192 kbps ──────────────────────────────────────

test('molemmat äänet pyytävät 192 kbps (ElevenLabs Pro, omistaja 14.9.2026)', () => {
  assert.equal(PULU_ULOSTULOMUOTO, 'mp3_44100_192');
  assert.equal(HORATIO_ULOSTULOMUOTO, 'mp3_44100_192');
  // Muoto on luettava vakiosta, ei kirjoitettuna kahteen paikkaan:
  // pyyntö ja kuitti eivät saa päästä eri muotoihin.
  assert.match(LAHDE, /output_format=\$\{PULU_ULOSTULOMUOTO\}/);
  assert.match(LAHDE, /outputFormat: PULU_ULOSTULOMUOTO,/);
  assert.equal(LAHDE.includes("outputFormat: 'mp3_44100_128'"), false);
});

test('kohdistus hyväksyy uuden ja vanhan muodon, ei muuta', () => {
  // Vanha on pidettävä kelvollisena: 40 äänen kohdistus on yhä ajamatta.
  assert.equal(kelpaaUlostulomuoto('mp3_44100_192'), true);
  assert.equal(kelpaaUlostulomuoto('mp3_44100_128'), true);
  for (const vaara of ['mp3_22050_32', 'mp3_44100_64', 'pcm_44100', '', null, undefined]) {
    assert.equal(kelpaaUlostulomuoto(vaara), false, `hyväksyi väärän muodon: ${vaara}`);
  }
});

test('malli, ääni ja tagit eivät muuttuneet', () => {
  assert.match(LAHDE, /PULU_MALLI_OLETUS = 'eleven_v3'/);
  assert.match(LAHDE, /PULU_AANI_OLETUS = 'piI8Kku0DcvcL6TTSeQt'/);
  assert.match(LAHDE, /PULU_VAKAUS_OLETUS = 'natural'/);
  assert.match(LAHDE, /const TAGIT_KAYTOSSA = MALLI === 'eleven_v3'/);
});
