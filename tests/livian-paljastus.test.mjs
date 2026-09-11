import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  LIVIAN_LUENNAN_PAIKKA, LIVIAN_PALJASTUS, livianPaljastus,
  odotaLivianTraileria, peruLivianTraileriodotus,
} from '../js/livia.js';
import { ilmoitaLivianTilanne } from '../js/livia-tilanteet.js';
import { maahanMuoto, paikkaaMuoto } from '../js/ui-apurit.js';

const UI = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
const LIVIA = readFileSync(new URL('../js/livia.js', import.meta.url), 'utf8');

/*
 * PULUN UUSI RYTMI ATEENASSA: kaksi kuplaa ennen isoisän luentaa,
 * luenta, eikä sen jälkeen enää karttaklikkausohjetta.
 */
test('paljastuksen kaanon säilyttää vanhat ääni-indeksit', () => {
  const kuplat = livianPaljastus({ paikkaan: 'Ateenaan', paikkaa: 'Ateenaa' });
  assert.deepEqual(kuplat, [
    'Kääk, apua! Pöllö on matkoilla, mutta ei hätää, tuuraan häntä sen aikaa.',
    'Tervetuloa Ateenaan. Kuunnellaan, mitä isoisä on kirjoittanut tästä paikasta.',
    'Kantsuu klikata Ateenaa kartalta, jos meinaat löytää aarteen.',
  ]);
  assert.doesNotMatch(kuplat.join(' '), /Sähke pöllöltä|Melkein joka ikisen|kultaista merkkiä/);
});

test('kaupungin nimi tulee taivutusapureista', () => {
  assert.equal(maahanMuoto('Ateena'), 'Ateenaan');
  assert.equal(paikkaaMuoto('Ateena'), 'Ateenaa');
  assert.equal(paikkaaMuoto('Sofia'), 'Sofiaa');
  assert.equal(paikkaaMuoto('Wien'), 'Wieniä');
  assert.equal(paikkaaMuoto('Lontoo'), 'Lontoota');
  assert.equal(paikkaaMuoto(''), '');
  const kuplat = livianPaljastus({
    paikkaan: maahanMuoto('Sofia'), paikkaa: paikkaaMuoto('Sofia'),
  });
  assert.match(kuplat[1], /^Tervetuloa Sofiaan\./);
  assert.match(kuplat[2], /^Kantsuu klikata Sofiaa kartalta/);
});

test('ilman nimeä toivotus ja rekisteriin jäävä vanha ohje ovat yleisiä', () => {
  const [, toka, kolmas] = livianPaljastus();
  assert.match(toka, /^Tervetuloa\. Kuunnellaan/);
  assert.match(kolmas, /^Kantsuu klikata kaupunkia kartalta/);
  assert.deepEqual(LIVIAN_PALJASTUS, livianPaljastus());
});

test('pelin paljastussarja katkaistaan ennen vanhaa karttaklikkauskuplaa', () => {
  assert.match(LIVIA,
    /const repliikit = livianPaljastus\(\{ paikkaan, paikkaa \}\)\s*\n\s*\.slice\(0, LIVIAN_LUENNAN_PAIKKA\);/);
  assert.match(LIVIA,
    /paljastusRepliikki\(ui, city\.id, 0, jalkeen, repliikit,/);
});

/*
 * LUENTA KUPLIEN JÄLKEEN. Kaksi kuplaa tulevat ennen isoisän luentaa,
 * jonka jälkeen sarja päättyy — pulu on hiljaa koko luennan ajan.
 */
test('sarja pysähtyy luennan ajaksi ja jatkaa vasta sen loputtua', () => {
  assert.equal(LIVIAN_LUENNAN_PAIKKA, 2);
  assert.match(LIVIA, /import \{ luennanLoppuun \} from '\.\/luenta\.js';/);
  // Kupla 2 saa lukuaikansa, sitten luenta päästetään liikkeelle —
  // ja NAPAUTUS kulkee samaa tietä, ei ohi luennan.
  assert.match(LIVIA, /const jatka = i === LIVIAN_LUENNAN_PAIKKA - 1\s*\n\s*\? \(\) => odotaLuenta\(ui, cityId, seuraava\)\s*\n\s*: seuraava;/);
  assert.match(LIVIA, /polloSaapumiskupla\(teksti, \{ kuittaus: jatka \}\)/);
  // KUPLA ODOTTAA PUHEEN LOPPUUN (7.9.2026): ajastin on lukuaika TAI
  // äänitteen mitta, kumpi on pidempi (js/liviapuhe.js).
  assert.match(LIVIA, /paljastusAjastin = livianKuplanAjastin\(\s*\n\s*lukuaika\(teksti\), aani, jatka, \(id\) => \{ paljastusAjastin = id; \},\s*\n\s*\);/);
  // Odotus kuuntelee luennan loppua; ilman luentaa varaviive.
  assert.match(LIVIA, /function odotaLuenta\(ui, cityId, jatka\) \{[\s\S]{0,700}const luenta = luennanLoppuun\(ui\);[\s\S]{0,200}setTimeout\(jatka, LUENNAN_VARAVIIVE\)/);
  // Näyttösarja on katkaistu luentapaikkaan, joten luennan jälkeinen
  // jatko päättää sarjan ilman kolmannen kaanonialkion näyttämistä.
  assert.match(LIVIA, /\.slice\(0, LIVIAN_LUENNAN_PAIKKA\)/);
  // Kupla, joka ei mahtunut ruudulle, ei saa jättää luentaa jumiin.
  assert.match(LIVIA, /pysaytaLivianAani\(ui\);\s*\n\s*vapautaLuenta\(ui\);/);
});

test('ui lykkää saapumisen luennan pulun kuplien taakse', () => {
  // Lippu nostetaan ennen saapumisen renderiä, koska luenta lähtee siitä.
  assert.match(UI, /this\.luennanLykkays = livianPaljastusOdottaa\(this\);\s*\n\s*this\.render\(\);/);
  // Luenta ei ala lykkäyksen aikana, mutta tehtävä on tallessa.
  const kohta = UI.slice(UI.indexOf('  asetaMerkinnanLuenta(tehtava'), UI.indexOf('  naytaMerkinnanKaiutin(onAanite)'));
  assert.match(kohta, /if \(this\.luennanLykkays\) \{\s*\n\s*stopDiaryVoice\(this\);\s*\n\s*return;\s*\n\s*\}/);
  assert.match(kohta, /aloitaLykattyLuenta\(\) \{\s*\n\s*this\.luennanLykkays = false;/);
});

test('saapumisen kuplat antavat kaupungin taivutukset paljastukselle', () => {
  const kohta = UI.slice(UI.indexOf('  saapumisenKuplat(kohde) {'), UI.indexOf('  saapumisenOhjekuplat(tervetuloa) {'));
  assert.match(kohta, /naytaLivianPaljastus\(this, \{\s*\n\s*paikkaan: kohde\?\.name \? maahanMuoto\(kohde\.name\) : '',\s*\n\s*paikkaa: kohde\?\.name \? paikkaaMuoto\(kohde\.name\) : '',\s*\n\s*\}\)\) return;/);
  // Paljastuksen jälkeen ei ohjekuplia; jos se ei ala, luenta vapautuu.
  assert.doesNotMatch(kohta, /jalkeen: \(\) => this\.saapumisenOhjekuplat/);
  assert.match(kohta, /this\.aloitaLykattyLuenta\(\);\s*\n\s*this\.saapumisenOhjekuplat\(tervetuloa\);/);
});

test('aloituslennon signaali käyttää samaa tokenia alusta loppuun tai peruun', () => {
  assert.match(UI,
    /aloitaAloituslennonSignaali\(kaupunki\) \{[\s\S]{0,300}const tila = \{ tunnus: \{\}, kaupunki \};[\s\S]{0,200}vaihe: 'alku', \.\.\.tila/);
  assert.match(UI,
    /paataAloituslennonSignaali\(vaihe, tiedot = \{\}\) \{[\s\S]{0,300}this\.aloituslentoSignaali = null;[\s\S]{0,200}vaihe, \.\.\.tila, \.\.\.tiedot/);
  assert.match(UI, /this\.paataAloituslennonSignaali\('peru'\);\s*\n\s*\/\/ Laudan purku/);
});

test('lentosignaali alkaa ennen avauskuplan purkua ja loppuu saapumisen renderiin', () => {
  const valinta = UI.slice(UI.indexOf('  async doPickStart(city) {'),
    UI.indexOf('  /** Aloituslennon yksi tunnus'));
  assert.match(valinta,
    /this\.aloitaAloituslennonSignaali\(city\.id\);[\s\S]{0,500}peruLivianAvaus\(\);/);
  assert.match(UI,
    /this\.render\(\);\s*\n\s*this\.paataAloituslennonSignaali\('loppu', \{\s*\n\s*odottaaTraileria: Boolean\(this\.saapumistraileri\)/);
  assert.match(valinta, /finally \{[\s\S]{0,700}this\.paataAloituslennonSignaali\('peru'\);/);
  assert.match(valinta, /if \(this\.reducedMotion && !this\.dead\) \{\s*this\.paataAloituslennonSignaali\('loppu',/,
    'vähennetyn liikkeen onnistunut lento ei saa lähettää peru-tapahtumaa ennen traileria');
});

test('traileriodotus vapautuu vain oikean tokenin luonnollisesta lopusta', () => {
  const oikea = {};
  const ui = {
    dead: false,
    saapumistraileri: { tunnus: oikea },
    game: { cityOf: () => ({ id: 'ateena' }) },
  };
  let jatkui = 0;
  assert.equal(odotaLivianTraileria(ui, 'ateena', () => { jatkui += 1; }), true);
  ilmoitaLivianTilanne('trailer', { vaihe: 'loppu', tunnus: {}, kaupunki: 'ateena' });
  assert.equal(jatkui, 0, 'vanha token ei vapauta kuplia');
  ilmoitaLivianTilanne('trailer', { vaihe: 'loppu', tunnus: oikea, kaupunki: 'ateena' });
  assert.equal(jatkui, 1);
  ilmoitaLivianTilanne('trailer', { vaihe: 'loppu', tunnus: oikea, kaupunki: 'ateena' });
  assert.equal(jatkui, 1, 'loppu on idempotentti');
});

test('traileriodotuksen peru, kaupunginvaihto ja uusi odotus eivät tuo myöhäistä kuplaa', () => {
  const eka = {}, toka = {};
  let kaupunki = 'ateena';
  const ui = {
    dead: false,
    saapumistraileri: { tunnus: eka },
    game: { cityOf: () => ({ id: kaupunki }) },
  };
  let jatkui = 0;
  odotaLivianTraileria(ui, 'ateena', () => { jatkui += 1; });
  ilmoitaLivianTilanne('trailer', { vaihe: 'peru', tunnus: eka, kaupunki: 'ateena' });
  assert.equal(jatkui, 0);

  ui.saapumistraileri = { tunnus: eka };
  odotaLivianTraileria(ui, 'ateena', () => { jatkui += 1; });
  kaupunki = 'sofia';
  ilmoitaLivianTilanne('trailer', { vaihe: 'loppu', tunnus: eka, kaupunki: 'ateena' });
  assert.equal(jatkui, 0, 'kaupungista lähtenyt ei saa vanhaa kuplaa');

  kaupunki = 'ateena';
  ui.saapumistraileri = { tunnus: eka };
  odotaLivianTraileria(ui, 'ateena', () => { jatkui += 1; });
  ui.saapumistraileri = { tunnus: toka };
  odotaLivianTraileria(ui, 'ateena', () => { jatkui += 10; });
  ilmoitaLivianTilanne('trailer', { vaihe: 'loppu', tunnus: eka, kaupunki: 'ateena' });
  assert.equal(jatkui, 0, 'uusi odotus irrotti vanhan kuulijan');
  assert.equal(peruLivianTraileriodotus(ui), true);
  ilmoitaLivianTilanne('trailer', { vaihe: 'loppu', tunnus: toka, kaupunki: 'ateena' });
  assert.equal(jatkui, 0, 'destroy-purku estää myöhäisen lopun');
});
