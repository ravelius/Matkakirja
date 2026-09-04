/*
 * LINSSIN LUENTA — kertoja lukee vuoden, keksijän ja keksinnön.
 *
 * Omistajan tilaus 4.9.2026: *"Generoi selostajan äänellä jokaiseen
 * kohtaan vuosiluku, keksijän nimi ja keksintö, eli se tulisi aina
 * Keksinnön vaihtoessa lukijan äänellä."*
 *
 * Näissä testeissä on kaksi vartioitavaa asiaa, ja molemmat pettävät
 * HILJAA:
 *
 *   TIEDOSTONIMI. Peli hakee luennan ämpäristä nimellä, jonka
 *   js/linssipuhe.js luennanRunko johtaa datasta — ja työkalu
 *   kirjoittaa sen samalla funktiolla. Jos nimi ei ole
 *   yksikäsitteinen, kaksi pysäkkiä jakaa saman tiedoston: toinen
 *   kertoo väärän keksinnön eikä mikään kaadu. Vuosi yksin EI kelpaa —
 *   kaaressa on kolme vuoden 1895 pysäkkiä.
 *
 *   KYTKENTÄ. Luenta lähtee js/aikajana.js:n sytyta-kohdasta ja
 *   pysähtyy purussa ja alustuksessa. Jos rivi katoaa toisen työn
 *   mukana, linssi on vain hiljainen — ei virhettä, ei testin kaatoa
 *   mistään muualta.
 *
 * Soitinta ei voi ajaa Nodessa (ei Audiota), mutta nimi, teksti ja
 * kytkentä ovat luettavissa ilman selainta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { KEKSINNOT } from '../js/linssit/keksinnot.js';
import {
  LINSSILUENTA_JUURI,
  LUENNAN_TAUKO,
  luennanOsoite,
  luennanPuhe,
  luennanRunko,
  luennanTeksti,
  luennanTiedosto,
} from '../js/linssipuhe.js';
import { tulkitseArgumentit, valitsePysakit } from '../tools/generoi-linssiluennat.mjs';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const AIKAJANA = readFileSync(new URL('../js/aikajana.js', import.meta.url), 'utf8');

/* ── runkosääntö ──────────────────────────────────────────────────── */

test('jokaisella pysäkillä on runko ja rungot ovat yksikäsitteisiä', () => {
  const rungot = KEKSINNOT.map((t) => luennanRunko(t));
  for (const [i, runko] of rungot.entries()) {
    assert.ok(runko, `pysäkki ${i} (${KEKSINNOT[i].vuosi}) jäi ilman runkoa`);
    assert.match(runko, /^\d{4}-[a-z0-9-]+$/,
      `runko ei ole tiedostokelpoinen: ${runko}`);
  }
  assert.equal(new Set(rungot).size, rungot.length,
    `rungoissa on törmäys: ${rungot.join(', ')}`);
});

test('runko on muotokuvan runko — vuosi yksin ei riittäisi', () => {
  for (const t of KEKSINNOT) {
    if (!t.kuva?.osoite) continue;
    const odotettu = t.kuva.osoite.split('/').pop().replace(/\.[a-z0-9]+$/i, '');
    assert.equal(luennanRunko(t), odotettu, `${t.vuosi}: runko ei seuraa muotokuvaa`);
  }
  // Kolme vuoden 1895 pysäkkiä: juuri siksi vuosi ei kelpaa nimeksi.
  const v1895 = KEKSINNOT.filter((t) => t.vuosi === 1895);
  assert.equal(v1895.length, 3);
  assert.equal(new Set(v1895.map((t) => luennanRunko(t))).size, 3);
});

test('merkkipaalu saa rungon vuodesta ja otsikosta', () => {
  const paalu = KEKSINNOT.find((t) => t.paalu);
  assert.ok(paalu, 'merkkipaalu puuttuu kaaresta');
  assert.equal(paalu.kuva, null, 'merkkipaalulla ei kuulu olla muotokuvaa');
  assert.equal(luennanRunko(paalu), '1873-matkakirjan-vuosi');
});

test('osoite on ämpärin puhekansio muotokuvien vieressä', () => {
  const watt = KEKSINNOT[0];
  assert.equal(luennanTiedosto(watt), '1769-james-watt.mp3');
  assert.equal(luennanOsoite(watt), `${LINSSILUENTA_JUURI}/1769-james-watt.mp3`);
  assert.match(LINSSILUENTA_JUURI, /\/aikajana\/keksinnot\/puhe$/);
  // Sama juuri kuin muotokuvilla: osoite muuttuu yhdestä paikasta.
  assert.ok(watt.kuva.osoite.startsWith(LINSSILUENTA_JUURI.replace(/\/puhe$/, '/')));
});

test('tuntematon pysäkki ei tuota nimeä eikä osoitetta', () => {
  assert.equal(luennanRunko(null), null);
  assert.equal(luennanRunko({}), null);
  assert.equal(luennanOsoite({}), null);
});

/* ── luettava teksti ──────────────────────────────────────────────── */

test('teksti on "<vuosi>. <henkilö>. <keksintö>."', () => {
  for (const t of KEKSINNOT) {
    if (t.paalu) continue;
    assert.equal(luennanTeksti(t), `${t.vuosi}. ${t.henkilo}. ${t.otsikko}.`,
      `${t.vuosi}: luettava teksti ei ole tilattua muotoa`);
  }
  assert.equal(luennanTeksti(KEKSINNOT[0]), '1769. James Watt. Höyrykoneen lauhdutin.');
  // Kaksoispysäkillä henkilö on jo datassa yhtenä nimenä.
  const pallo = KEKSINNOT.find((t) => t.vuosi === 1783);
  assert.equal(luennanTeksti(pallo), '1783. Montgolfier-veljekset. Kuumailmapallo.');
});

test('merkkipaalua ei lueta keksijänä', () => {
  const paalu = KEKSINNOT.find((t) => t.paalu);
  assert.equal(luennanTeksti(paalu), '1873. Matkakirjan vuosi.');
  assert.ok(!luennanTeksti(paalu).includes(paalu.henkilo),
    'merkkipaalun tapahtumateksti ei ole keksijän nimi eikä sitä lueta');
});

test('mallille lähtevässä tekstissä on tauko jokaisen pisteen kohdalla', () => {
  const puhe = luennanPuhe(KEKSINNOT[0]);
  assert.equal(puhe, `1769. ${LUENNAN_TAUKO} James Watt. ${LUENNAN_TAUKO} Höyrykoneen lauhdutin.`);
  assert.match(LUENNAN_TAUKO, /^<break time="[\d.]+s" \/>$/);
  // Tauot pois → sama teksti kuin pelissä näkyvä muoto.
  assert.equal(puhe.split(LUENNAN_TAUKO).join('').replace(/\s+/g, ' ').trim(),
    luennanTeksti(KEKSINNOT[0]));
});

/* ── työkalu ──────────────────────────────────────────────────────── */

test('kuiva ajo tuottaa rivin jokaisesta pysäkistä', () => {
  const tuloste = execFileSync(process.execPath,
    ['tools/generoi-linssiluennat.mjs', '--kuiva'],
    { cwd: JUURI, encoding: 'utf8' });
  const rivit = tuloste.split('\n')
    .filter((rivi) => rivi.startsWith('aikajana/keksinnot/puhe/'));
  assert.equal(rivit.length, 26, `kuivan ajon rivejä ${rivit.length}, odotettiin 26`);
  assert.equal(rivit.length, KEKSINNOT.length);
  assert.ok(rivit[0].includes('1769-james-watt.mp3'));
  assert.ok(rivit[0].includes('1769. James Watt. Höyrykoneen lauhdutin.'));
  // Kuiva ajo ei saa kutsua APIa eikä vaatia avainta — se on koko sen idea.
  assert.ok(tuloste.includes('APIa ei kutsuta'));
});

test('vuosivalinta rajaa pysäkit ja tuntematon vuosi kaataa ajon', () => {
  const { tyot } = valitsePysakit(KEKSINNOT, [1769, 1783]);
  assert.deepEqual(tyot.map((tyo) => tyo.nimi),
    ['1769-james-watt.mp3', '1783-joseph-montgolfier.mp3']);
  // Vuosi 1895 valitsee kaikki kolme sen vuoden pysäkkiä.
  assert.equal(valitsePysakit(KEKSINNOT, [1895]).tyot.length, 3);
  assert.deepEqual(valitsePysakit(KEKSINNOT, [1234]).tuntemattomat, [1234]);
  assert.equal(valitsePysakit(KEKSINNOT).tyot.length, KEKSINNOT.length);
});

test('vuosilista sietää pilkun ja välilyönnin', () => {
  assert.deepEqual(tulkitseArgumentit(['--pysakit', '1769,1783']).pysakit, [1769, 1783]);
  // Työnkulku antaa välilyönnillisen listan shellin hajottamana.
  assert.deepEqual(tulkitseArgumentit(['--pysakit', '1769', '1783']).pysakit, [1769, 1783]);
  assert.equal(tulkitseArgumentit(['--pysakit', '1769', '--kuiva']).kuiva, true);
  assert.ok(tulkitseArgumentit(['--pysakit', 'watt']).virhe);
  assert.ok(tulkitseArgumentit(['--roska']).virhe);
  assert.equal(tulkitseArgumentit(['--pakota']).pakota, true);
});

/* ── kytkentä aikajanamoottoriin ──────────────────────────────────── */

test('luenta lähtee elävästä syttymisestä', () => {
  assert.match(AIKAJANA,
    /import \{[^}]*soitaLinssiluenta[^}]*\} from '\.\/linssipuhe\.js';/,
    'js/aikajana.js ei tuo linssipuhe-moduulia');
  assert.match(AIKAJANA, /sytyta\(i\) \{[\s\S]*?soitaLinssiluenta\(this\.ui, t\);[\s\S]*?\n  \}/,
    'soitaLinssiluenta puuttuu sytyta(i):stä — linssi olisi hiljainen');
});

test('pysäytetyn kellon selailu ei lue ääneen', () => {
  // siirry(i) on kortin ja lampun napautus: pelaaja selaa itse, eikä
  // kertoja saa alkaa puhua joka napautuksesta.
  const siirry = AIKAJANA.match(/\n  siirry\(i\) \{[\s\S]*?\n  \}\n/);
  assert.ok(siirry, 'siirry(i) ei löytynyt js/aikajana.js:stä');
  assert.ok(!siirry[0].includes('soitaLinssiluenta'),
    'siirry(i) ei saa käynnistää luentaa');
});

test('purku ja alustus pysäyttävät luennan', () => {
  for (const nimi of ['pura', 'alusta']) {
    const lohko = AIKAJANA.match(new RegExp(`\\n  ${nimi}\\(\\) \\{[\\s\\S]*?\\n  \\}\\n`));
    assert.ok(lohko, `${nimi}() ei löytynyt js/aikajana.js:stä`);
    assert.ok(lohko[0].includes('pysaytaLinssiluenta(this.ui)'),
      `${nimi}() ei pysäytä linssiluentaa — tausta jäisi väistöön`);
  }
});

test('luentamoduuli on service workerin esilatauslistalla', () => {
  const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
  assert.ok(sw.includes("'./js/linssipuhe.js'"),
    'js/linssipuhe.js puuttuu sw.js:n SHELL-listalta');
});
