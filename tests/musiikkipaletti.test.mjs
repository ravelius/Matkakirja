/*
 * MUSIIKKIPALETTI: työkalu, moottori ja pelin kytkin.
 *
 * Omistajan linjaus 5.9.2026 illalla, sanatarkasti: *"kaikki musiikki
 * lyrialla"*. Siirtymä- ja linssiraidat olivat jo Lyria 3.5:llä; tämä
 * vartioi, että paletti (pohja, visa, aarre, pääaarre) on samalla
 * moottorilla, samalla haulla ja saman nimisäännön alla.
 *
 * Kolme asiaa, joista jokainen menisi rikki HILJAA:
 *
 *   1. OLETUSMOOTTORI. Jos `--moottori` unohtuu työnkulusta tai
 *      oletus valuu takaisin ElevenLabsiin, ajo onnistuu ja maksaa —
 *      ja tuottaa raidat, jotka eivät ole niitä, jotka omistaja
 *      valitsi. Vain nimestä (-lyria) sen huomaisi jälkikäteen.
 *   2. YHTEINEN LYRIA-MODUULI. Kaksi kopiota Gemini API:n
 *      vastausrakenteen etsinnästä on kaksi paikkaa, jotka pitäisi
 *      muistaa korjata yhdessä. Testi vaatii, että molemmat työkalut
 *      käyttävät SAMAA funktiota (identiteettivertailu), ei vain
 *      samannäköistä koodia.
 *   3. YKSI KYTKIN NELJÄLLE POLULLE. Paletin soittokohtia on neljä
 *      (pohjavire, visamusiikki, kaksi aarreaihetta) ja viides on
 *      työhuoneen kuuntelulehti. Jos yksi niistä jää kirjoittamaan
 *      tiedostonimen käsin, kytkimen kääntäminen jättää sen soittamaan
 *      vanhaa raitaa — ja puuttuva ääni on pelissä hiljainen normaali
 *      tila, joten kukaan ei huomaisi.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import * as lyria from '../tools/lyria.mjs';
import {
  ALUEIDEN_RAIDAT, KAUPUNKIEN_RAIDAT, PALETIN_RAIDAT, RAIDAT, TILOJEN_RAIDAT,
  tulkitseArgumentit, valitseRaidat,
} from '../tools/generoi-musiikki.mjs';
import { raidanTiedosto as raidanTiedostoSiirtyma } from '../tools/generoi-siirtymamusiikki.mjs';
import { MUSIIKIN_PAATE, musaPolku } from '../js/media.js';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');

const TYOKALU = lue('../tools/generoi-musiikki.mjs');
const SIIRTYMATYOKALU = lue('../tools/generoi-siirtymamusiikki.mjs');
const TYONKULKU = lue('../.github/workflows/generoi-musiikki.yml');

/* ── 1. moottori ─────────────────────────────────────────────────── */

test('oletusmoottori on lyria, ja vain tunnetut moottorit kelpaavat', () => {
  assert.equal(tulkitseArgumentit(['kaikki']).moottori, 'lyria');
  assert.equal(tulkitseArgumentit([]).moottori, 'lyria');
  assert.equal(tulkitseArgumentit(['kaikki', '--moottori', 'eleven']).moottori, 'eleven');
  assert.equal(tulkitseArgumentit(['kaikki', '--moottori', 'lyria']).moottori, 'lyria');
  assert.match(tulkitseArgumentit(['kaikki', '--moottori', 'suno']).virhe, /--moottori/);
  assert.match(tulkitseArgumentit(['--hupsis']).virhe, /tuntematon argumentti/);
});

test('raitojen nimet ovat paljaita argumentteja lippujen seassa', () => {
  const liput = tulkitseArgumentit(['pohja', 'visa', '--moottori', 'eleven', '--kuiva']);
  assert.equal(liput.virhe, undefined);
  assert.deepEqual(liput.raidat, ['pohja', 'visa']);
  assert.equal(liput.kuiva, true);
  /*
   * `kaikki` on PALETTI eikä koko taulukko: kaupunkiraidat (5.9.2026)
   * ovat oma ryhmänsä, jottei valmista kaupunkiraitaa generoida
   * vahingossa uudestaan paletin mukana — jokainen kutsu maksaa.
   */
  assert.deepEqual(valitseRaidat(['kaikki']), ['pohja', 'visa', 'aarre', 'paaaarre']);
  /*
   * `kaupungit` on kaupunkien omat kappaleet JA alueraidat (5.9.2026
   * yö): ne soivat samassa paikassa sekoituksessa, ja pelin kannalta
   * ne ovat sama asia — pohjavireen sijainen. Alueet erikseen saa
   * ryhmällä `alueet`, näkymien raidat ryhmällä `tilat`.
   */
  assert.deepEqual(valitseRaidat(['kaupungit']), [...KAUPUNKIEN_RAIDAT, ...ALUEIDEN_RAIDAT]);
  assert.deepEqual(valitseRaidat(['alueet']), ALUEIDEN_RAIDAT);
  assert.deepEqual(valitseRaidat(['tilat']), TILOJEN_RAIDAT);
  for (const nimi of [...KAUPUNKIEN_RAIDAT, ...ALUEIDEN_RAIDAT, ...TILOJEN_RAIDAT]) {
    assert.ok(!valitseRaidat(['kaikki']).includes(nimi),
      `${nimi} lipsahti paletin "kaikki"-valintaan`);
  }
  assert.equal(valitseRaidat([]), null);
});

test('työnkulun moottorivalinta on lyria|eleven ja oletus lyria', () => {
  assert.match(TYONKULKU, /moottori:\s*\n\s+description:/, 'moottori-input puuttuu työnkulusta');
  assert.match(TYONKULKU, /default: 'lyria'/);
  assert.match(TYONKULKU, /options: \['lyria', 'eleven'\]/);
  // Avain valitaan moottorin mukaan, kuten siirtymämusiikin ajossa.
  assert.match(TYONKULKU, /secrets\.GOOGLE_API_KEY/);
  assert.match(TYONKULKU, /GOOGLE_API_KEY: \$\{\{ secrets\.GOOGLE_API_KEY \}\}/);
  // Molemmat ajot (kuiva ja oikea) saavat saman moottorin.
  // Vain oikeat askeleet (run:), ei otsikon esimerkkikomentoja.
  const ajot = [...TYONKULKU.matchAll(/run: (node tools\/generoi-musiikki\.mjs [^\n]*)/g)]
    .map((m) => m[1]);
  assert.equal(ajot.length, 2, `odotettiin kuiva + oikea ajo, löytyi ${ajot.length}`);
  for (const ajo of ajot) {
    assert.match(ajo, /--moottori \$\{\{ inputs\.moottori \|\| 'lyria' \}\}/, ajo);
  }
});

/* ── 2. yhteinen lyria-moduuli ───────────────────────────────────── */

test('molemmat musiikkityökalut käyttävät samaa Lyria-hakua', () => {
  // Identiteettivertailu: kopio olisi eri funktio, vaikka koodi olisi sama.
  assert.equal(raidanTiedostoSiirtyma, lyria.raidanTiedosto,
    'siirtymätyökalulla on oma kopio raidanTiedosto-säännöstä');
  assert.equal(typeof lyria.haeLyriasta, 'function');
  for (const [nimi, teksti] of [['paletti', TYOKALU], ['siirtymä', SIIRTYMATYOKALU]]) {
    assert.match(teksti, /from '\.\/lyria\.mjs'/, `${nimi}: ei tuo tools/lyria.mjs:ää`);
    assert.doesNotMatch(teksti, /generativelanguage\.googleapis\.com/,
      `${nimi}: Lyrian osoite on kopioitu työkaluun — se kuuluu tools/lyria.mjs:ään`);
    assert.doesNotMatch(teksti, /async function haeLyriasta/,
      `${nimi}: oma kopio Lyria-hausta`);
  }
});

test('Lyria-raidat saavat -lyria-päätteen, ElevenLabs paljaan nimen', () => {
  for (const raita of Object.values(RAIDAT)) {
    assert.equal(lyria.raidanTiedosto(raita, 'eleven'), raita.tiedosto);
    assert.equal(lyria.raidanTiedosto(raita, 'lyria'),
      raita.tiedosto.replace(/\.mp3$/, '-lyria.mp3'));
  }
  assert.deepEqual(
    PALETIN_RAIDAT.map((id) => lyria.raidanTiedosto(RAIDAT[id], 'lyria')),
    ['musa-pohja-lyria.mp3', 'musa-visa-2-lyria.mp3',
      'musa-aarre-lyria.mp3', 'musa-paaaarre-lyria.mp3'],
  );
});

test('kehotteessa pyydetään sauma vain looppiraidoilta', () => {
  const looppi = lyria.lyriaKehote({ prompt: 'X.', sekunnit: 45, looppi: true });
  const kerta = lyria.lyriaKehote({ prompt: 'X.', sekunnit: 10, looppi: false });
  assert.match(looppi, /about 45 seconds that could loop seamlessly\.$/);
  assert.match(kerta, /about 10 seconds\.$/);
  for (const kehote of [looppi, kerta]) {
    assert.match(kehote, /Instrumental only, absolutely no vocals or singing\./);
  }
});

/* ── 3. raidat ja promptit ───────────────────────────────────────── */

test('paletin neljä raitaa, kestot ja looppisuus ovat ennallaan', () => {
  assert.deepEqual(PALETIN_RAIDAT, ['pohja', 'visa', 'aarre', 'paaaarre']);
  const mitat = Object.fromEntries(
    PALETIN_RAIDAT.map((id) => [id, [RAIDAT[id].kesto, RAIDAT[id].looppi]]),
  );
  assert.deepEqual(mitat, {
    pohja: [80000, true],
    visa: [45000, true],
    aarre: [10000, false],
    paaaarre: [13000, false],
  });
});

test('promptit ovat yhä paletin omat kuvaukset', () => {
  // Moottorin vaihto ei ole tilaisuus muuttaa sitä, mitä on tilattu.
  assert.match(RAIDAT.pohja.prompt, /sits far beneath other sounds/);
  assert.match(RAIDAT.visa.prompt, /ticking underscore for a moment of curiosity/);
  assert.match(RAIDAT.aarre.prompt, /rising four-note theme/);
  assert.match(RAIDAT.paaaarre.prompt, /The same simple rising four-note theme/);
  for (const [nimi, raita] of Object.entries(RAIDAT)) {
    assert.match(raita.prompt, /No modern synths/, `${nimi}: yhteinen tyylilause puuttuu`);
    assert.match(raita.prompt, /no vocals/, `${nimi}: laulukielto puuttuu`);
    if (raita.looppi) {
      assert.match(raita.prompt, /Seamless loop/, `${nimi}: saumaohje puuttuu looppiraidalta`);
    }
  }
});

test('API-avain ei koskaan päädy tulosteeseen', () => {
  const tulosteet = [...TYOKALU.matchAll(/console\.(?:log|error)\(([^\n]*)/g)].map((m) => m[1]);
  for (const rivi of tulosteet) {
    assert.ok(!/\bavain\b/.test(rivi) || /puuttuu ympäristöstä|ilman avainta|Avain/.test(rivi),
      `tuloste vuotaa avaimen: ${rivi}`);
  }
});

/* ── 4. pelin kytkin ─────────────────────────────────────────────── */

test('MUSIIKIN_PAATE on tyhjä tai -lyria eikä mitään muuta', () => {
  assert.ok(['', '-lyria'].includes(MUSIIKIN_PAATE),
    `tuntematon moottoripääte: ${MUSIIKIN_PAATE}`);
  assert.equal(musaPolku('musa-pohja'), `assets/audio/musa-pohja${MUSIIKIN_PAATE}.mp3`);
});

test('kytkin kattaa paletin tiedostonimet työkalussa', () => {
  // musaPolku saa TUNNUKSEN (musa-pohja), työkalu kirjoittaa
  // TIEDOSTON (musa-pohja.mp3). Ne on pidettävä samana joukkona.
  const tunnukset = Object.values(RAIDAT).map((r) => r.tiedosto.replace(/\.mp3$/, ''));
  assert.deepEqual(tunnukset.map((t) => musaPolku(t)),
    tunnukset.map((t) => `assets/audio/${t}${MUSIIKIN_PAATE}.mp3`));
});

test('kaikki neljä soittokohtaa ja kuuntelulehti käyttävät kytkintä', () => {
  const kohdat = [
    /*
     * Pohjavireen tunnus muutti js/musiikkivalitsin.js:ään (5.9.2026
     * yö): soitin hakee sen sieltä vakiona (musaPolku(POHJARAITA)),
     * koska valitsin panee sen ketjun viimeiseksi tasoksi. Kytkin on
     * yhä sama — polku syntyy musaPolulla kummassakin päässä.
     */
    ['js/musiikkivalitsin.js', ["POHJARAITA = 'musa-pohja'", 'musaPolku(POHJARAITA)']],
    ['js/ambience-stream.js', ['musaPolku(POHJARAITA)']],
    ['js/aani-ehdokkaat.js', ["musaPolku('musa-visa-2')"]],
    ['js/ui.js', ["musaPolku('musa-aarre')", "musaPolku('musa-paaaarre')"]],
    ['js/tyohuone-musiikki.js', ['musaPolku(raita.tunnus)']],
  ];
  for (const [tiedosto, kutsut] of kohdat) {
    const teksti = lue(`../${tiedosto}`);
    for (const kutsu of kutsut) {
      assert.ok(teksti.includes(kutsu), `${tiedosto}: ${kutsu} puuttuu`);
    }
  }
});

test('yksikään pelin moduuli ei kirjoita paletin polkua käsin', () => {
  /*
   * Käsin kirjoitettu 'assets/audio/musa-….mp3' ohittaisi kytkimen, ja
   * kytkimen kääntämisen jälkeen se soittaisi vanhaa raitaa — hiljaa,
   * koska puuttuva ääni on pelissä normaali tila. Kommentit ja proosa
   * saavat mainita nimet, joten seula koskee vain merkkijonoliteraaleja.
   */
  const moduulit = ['js/ambience-stream.js', 'js/aani-ehdokkaat.js', 'js/ui.js',
    'js/tyohuone-musiikki.js', 'js/media.js', 'js/musiikkivalitsin.js',
    'js/kaupunkimusiikki.js'];
  for (const tiedosto of moduulit) {
    const rivit = lue(`../${tiedosto}`).split('\n')
      .filter((r) => /'[^']*assets\/audio\/musa-[^']*'/.test(r));
    assert.deepEqual(rivit, [],
      `${tiedosto}: paletin polku kirjoitettu käsin — käytä js/media.js musaPolku()`);
  }
});
