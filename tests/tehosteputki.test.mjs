/**
 * TEHOSTEPUTKEN KAKSI SITOVAA SÄÄNTÖÄ (omistaja 14.9.2026).
 *
 * 1. ALKUPERÄISET ÄÄNITIEDOSTOT SÄILYTETÄÄN AINA. Sääntö koskee kaikkia
 *    äänirooleja, myös tehosteita. Mallin raakatuotos viedään ämpäriin
 *    eräkohtaiseen avaimeen ENNEN viimeistelyä, kuitti kirjaa avaimen ja
 *    sha256:n, eikä raakaa koskaan ylikirjoiteta. Ajo, joka voisi jatkaa
 *    ilman raakavientiä, on virheellinen: työkalun pitää KIELTÄYTYÄ.
 *
 * 2. VIIMEISTELYN KOODAUS 320 kbps. Tehoste käy läpi kaksi mp3-
 *    sukupolvea, eikä jälkimmäistä voi poistaa: normalisointi on
 *    tarpeen, koska lyhyet tehosteet tulevat mallilta eri tasoissa ja
 *    niiden on asetuttava 3 dB musiikin yläpuolelle. Mitattuna
 *    (docs/raportit/viesti-fable-aaniputki-20260914.md) toinen
 *    128 kbps sukupolvi lisää −25 dB virhettä ja 320 kbps vain
 *    −59 dB, joten se yksi sukupolvi tehdään läpinäkyvästi.
 *    NORMALISOINTI SÄILYY — sitä ei saa poistaa tämän mukana.
 *
 * Vartiot lukevat työkalun lähdekoodin, koska varsinainen ajo on
 * maksullinen eikä sitä voi testissä käynnistää.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  TEHOSTEET, kokoaKuitti, raakaAmpariKansio, raakavientiEste,
  tulkitseArgumentit, tuotantoEraId,
} from '../tools/generoi-tehosteet.mjs';

const LAHDE = readFileSync(new URL('../tools/generoi-tehosteet.mjs', import.meta.url), 'utf8');
const COMMIT = '0'.repeat(40);

// ── 1. raakavienti ─────────────────────────────────────────────────

test('maksullinen generointi kieltäytyy ilman raakavientiä', () => {
  const este = raakavientiEste(tulkitseArgumentit(['--laji', 'kohahdus', '--ei-vientia']));
  assert.ok(este, '--ei-vientia olisi saanut generoida — raakavienti jäisi tekemättä');
  assert.match(este, /raakavient/i);
});

test('vienti päällä ja kuiva ajo saavat jatkaa', () => {
  assert.equal(raakavientiEste(tulkitseArgumentit(['--laji', 'kohahdus'])), null);
  assert.equal(raakavientiEste(tulkitseArgumentit(['--laji', 'kohahdus', '--kuiva'])), null);
  // Kuiva ajo saa yhä jättää viennin pois: se ei kutsu APIa lainkaan.
  assert.equal(
    raakavientiEste(tulkitseArgumentit(['--laji', 'kohahdus', '--kuiva', '--ei-vientia'])), null,
  );
});

test('kielto tarkistetaan ennen ffmpegiä ja ennen API-kutsuja', () => {
  const kielto = LAHDE.indexOf('const este = raakavientiEste(liput);');
  const ffmpeg = LAHDE.indexOf("for (const komento of ['ffmpeg', 'ffprobe'])");
  const api = LAHDE.indexOf('await haeApista(');
  assert.ok(kielto > 0 && kielto < ffmpeg, 'kielto on tarkistettava ennen ffmpeg-etsintää');
  assert.ok(kielto < api, 'kielto on tarkistettava ennen ensimmäistä maksullista kutsua');
});

test('raaka-avain on eräkohtainen eikä voi ylikirjoittaa toista erää', () => {
  const a = raakaAmpariKansio('tehoste-aaaaaaaaaaaaaaaaaaaa');
  assert.equal(a, 'aanet/tehosteet/raaka/tehoste-aaaaaaaaaaaaaaaaaaaa');
  assert.notEqual(a, raakaAmpariKansio('tehoste-bbbbbbbbbbbbbbbbbbbb'));
  // Kelvotonta tunnusta ei siivota kelvolliseksi — siivottu voisi törmätä.
  assert.throws(() => raakaAmpariKansio('../kohahdus-1.mp3'), /erätunnu/);
  assert.throws(() => raakaAmpariKansio(''), /erätunnu/);
});

test('erätunnus on deterministinen ja muuttuu reseptin mukana', () => {
  const a = tuotantoEraId('kohahdus', 4, COMMIT);
  assert.match(a, /^tehoste-[0-9a-f]{20}$/);
  assert.equal(a, tuotantoEraId('kohahdus', 4, COMMIT), 'sama resepti → sama tunnus');
  assert.notEqual(a, tuotantoEraId('kohahdus', 2, COMMIT), 'eri määrä → eri tunnus');
  assert.notEqual(a, tuotantoEraId('kohahdus', 4, '1'.repeat(40)), 'eri commit → eri tunnus');
  assert.throws(() => tuotantoEraId('kohahdus', 4, null), /sourceCommit/);
  assert.throws(() => tuotantoEraId('ei-tallaista', 4, COMMIT), /tuntematon laji/);
});

test('raaka viedään ämpäriin ennen viimeistelyä', () => {
  const vienti = LAHDE.indexOf('vieAmpariin(lahde, `raaka-${nimi}`, raakaKansioAmpari)');
  const viimeistely = LAHDE.indexOf('const { leikattu, mitattu, korjaus } = viimeistele(');
  assert.ok(vienti > 0, 'raakatiedostoa ei viedä ämpäriin lainkaan');
  assert.ok(vienti < viimeistely, 'raaka on vietävä ENNEN viimeistelyä, ei sen jälkeen');
  // Vienti on varmistettava, ei vain yritettävä.
  assert.match(LAHDE, /raakatiedoston vienti epäonnistui/);
});

test('kuitti kirjaa raa\'an avaimen ja sha256:n jokaiselle variantille', () => {
  const batchId = tuotantoEraId('kohahdus', 4, COMMIT);
  const kuitti = kokoaKuitti('kohahdus', 4, { sourceCommit: COMMIT, batchId });
  assert.equal(kuitti.schemaVersion, 1);
  assert.equal(kuitti.batchId, batchId);
  assert.equal(kuitti.sourceCommit, COMMIT);
  assert.equal(kuitti.kind, 'kohahdus');
  assert.equal(kuitti.promptSha256.length, 64);
  assert.equal(kuitti.variants.length, 4);
  for (let i = 0; i < 4; i += 1) {
    const v = kuitti.variants[i];
    assert.equal(v.fileName, TEHOSTEET.kohahdus.tiedosto(i));
    assert.equal(v.rawObjectKey, `aanet/tehosteet/raaka/${batchId}/raaka-${v.fileName}`);
    assert.equal(v.finalObjectKey, `aanet/tehosteet/${v.fileName}`);
  }
  // Salaisuudet eivät voi päätyä kuittiin.
  assert.doesNotMatch(JSON.stringify(kuitti), /ELEVEN_API_KEY|xi-api-key|R2_SECRET/);
});

test('myös hylätyn variantin raaka kirjataan kuittiin', () => {
  const batchId = tuotantoEraId('kohahdus', 1, COMMIT);
  const raaka = { fileName: 'raaka-kohahdus-1.mp3', sha256: 'a'.repeat(64), bytes: 1234 };
  const kuitti = kokoaKuitti('kohahdus', 1, {
    sourceCommit: COMMIT,
    batchId,
    status: 'completed-with-errors',
    tulokset: new Map([['kohahdus-1.mp3', {
      status: 'validation-failed', reason: 'taso -27,0 LUFS', rawArtifact: raaka,
    }]]),
  });
  assert.equal(kuitti.variants[0].status, 'validation-failed');
  assert.deepEqual(kuitti.variants[0].rawArtifact, raaka);
  // Koodissa hylätty haara kirjaa raa'an eikä ohita kuittia.
  assert.match(LAHDE, /status: 'validation-failed', reason: tulos\.virheet\.join/);
});

// ── 2. koodaus 320 kbps, normalisointi säilyy ──────────────────────

test('viimeistely koodaa 320 kbps:llä', () => {
  assert.match(LAHDE, /const KOODAUS_KBPS = 320;/);
  assert.match(LAHDE, /'-c:a', 'libmp3lame', '-b:a', `\$\{KOODAUS_KBPS\}k`, kohde,/);
});

test('syntetisoitu kuivan ajon lähde pysyy 128 kbps:ssä', () => {
  // Se jäljittelee ElevenLabsin omaa tuotosta (MUOTO): jos sekin
  // nostettaisiin, kuiva ajo mittaisi eri ketjua kuin oikea ajo.
  const pala = LAHDE.slice(LAHDE.indexOf('function syntetisoiLahde'),
    LAHDE.indexOf('/** Yksi maksullinen kutsu'));
  assert.match(pala, /'-b:a', '128k'/);
  assert.match(LAHDE, /const MUOTO = 'mp3_44100_128';/);
});

test('NORMALISOINTI SÄILYY — 320 kbps ei saa viedä tasonkorjausta mukanaan', () => {
  // Omistaja perusteli normalisoinnin lyhyillä tehosteilla: ne tulevat
  // mallilta eri tasoissa ja niiden on asetuttava 3 dB musiikin yli.
  assert.match(LAHDE, /const TAVOITE_LUFS = -30;/);
  assert.match(LAHDE, /loudnorm=I=\$\{TAVOITE_LUFS\}:TP=-2:LRA=11:print_format=json/);
  assert.match(LAHDE, /const korjaus = TAVOITE_LUFS - mitattu\.taso;/);
  assert.match(LAHDE, /viimeistelySuodatin\(\{ kesto: leikattu, korjausDb: korjaus \}\)/);
  // Ja tasotarkistus on yhä portti, ei pelkkä varoitus.
  assert.match(LAHDE, /virheet\.push\(`taso \$\{taso\.toFixed\(1\)\} LUFS, tavoite/);
});

test('kuitti kertoo koodauksen ja tason, ei vanhoja arvoja', () => {
  const kuitti = kokoaKuitti('kohahdus', 4, {
    sourceCommit: COMMIT, batchId: tuotantoEraId('kohahdus', 4, COMMIT),
  });
  assert.equal(kuitti.postprocess.bitrateKbps, 320);
  assert.equal(kuitti.postprocess.targetLufs, -30);
  assert.equal(kuitti.postprocess.silenceTrim, true);
  assert.equal(kuitti.synthesis.outputFormat, 'mp3_44100_128');
});
