/*
 * KATEGORIA PER KAUPUNKI (js/fokusryhmat.js) — ryhmittelyn säännöt.
 *
 * MIKSI YKSIKKÖTESTI EIKÄ SAVUKE: passi on tarkoituksella PUHDAS
 * funktio laudan koordinaateista, koska laattageneraattori joutuu
 * tekemään saman laskennan selaimen ulkopuolella (Raamattu 31.8.2026,
 * KARTTANOSTOT POLTETAAN LAATTOIHIN). Juuri se on tässä koeteltavana:
 * jos jokin näistä väitteistä alkaisi vaatia ruudun mittoja, poltto ei
 * enää olisi mahdollinen.
 *
 * Kartan puoli — että merkkejä oikeasti on vähemmän ja että lehti
 * aukeaa kaikkine osioineen — on savukkeessa (savuke-fokuskohteet
 * vartio 11).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  RYHMA_NIMIO_LEVEYS, RYHMA_RAJA, ryhmaKuori, ryhmaNimio, ryhmitaKohteet, ryhmaTunnus,
} from '../js/fokusryhmat.js';
import { nostosymTekstinLeveys } from '../js/fokusnosto-symbolit.js';

const ATEENA = { id: 'ateena', name: 'Ateena', x: 100, y: 100 };
const SOFIA = { id: 'sofia', name: 'Sofia', x: 400, y: 100 };
const KAUPUNGIT = [ATEENA, SOFIA];

const luokka = (kohde) => kohde.symboli ?? null;
const rivi = (id, symboli, x, y) => ({ kohde: { id, nimi: id, symboli }, paikka: { x, y } });

test('kaksi saman kategorian kohdetta samassa kaupungissa yhdistyy yhdeksi merkiksi', () => {
  const tulos = ryhmitaKohteet([
    rivi('akropolis', 'historia', 100.5, 100.5),
    rivi('agora', 'historia', 100.6, 100.2),
  ], KAUPUNGIT, luokka);
  assert.equal(tulos.length, 1);
  assert.equal(tulos[0].kohde.id, ryhmaTunnus('ateena', 'historia'));
  assert.equal(tulos[0].kohde.symboli, 'historia');
  assert.equal(tulos[0].kohde.kaupunki, 'Ateena');
  assert.ok(ryhmaKuori(tulos[0].kohde));
});

test('yhtäkään kohdetta ei katoa — kaikki jäsenet ovat osat-listassa', () => {
  const syote = [
    rivi('akropolis', 'historia', 100.5, 100.5),
    rivi('agora', 'historia', 100.6, 100.2),
    rivi('olympieion', 'historia', 100.3, 100.1),
    rivi('museo', 'kulttuuri', 100.4, 100.4),
    rivi('marathon', 'sana', 110.3, 100),
  ];
  const tulos = ryhmitaKohteet(syote, KAUPUNGIT, luokka);
  const tunnukset = new Set();
  for (const { kohde } of tulos) {
    for (const osa of kohde.osat ?? [kohde]) tunnukset.add(osa.id);
  }
  assert.deepEqual([...tunnukset].sort(),
    ['agora', 'akropolis', 'marathon', 'museo', 'olympieion']);
  // Kolme historiaa yhteen, kulttuuri ja kaukainen Marathon omikseen.
  assert.equal(tulos.length, 3);
});

test('eri kategoriat eivät yhdisty keskenään', () => {
  const tulos = ryhmitaKohteet([
    rivi('a', 'historia', 100.1, 100.1),
    rivi('b', 'kulttuuri', 100.2, 100.2),
  ], KAUPUNGIT, luokka);
  assert.equal(tulos.length, 2);
  assert.ok(tulos.every(({ kohde }) => !ryhmaKuori(kohde)));
});

test('eri kaupungit eivät yhdisty keskenään', () => {
  const tulos = ryhmitaKohteet([
    rivi('a', 'historia', 100.1, 100.1),
    rivi('b', 'historia', 400.1, 100.1),
  ], KAUPUNGIT, luokka);
  assert.equal(tulos.length, 2);
  assert.deepEqual(tulos.map(({ kohde }) => kohde.id), ['a', 'b']);
});

test('rajan ulkopuolinen kohde pitää oman merkkinsä', () => {
  const kaukana = 100 + RYHMA_RAJA + 0.1;
  const tulos = ryhmitaKohteet([
    rivi('lahella', 'historia', 100.2, 100),
    rivi('kaukana', 'historia', kaukana, 100),
  ], KAUPUNGIT, luokka);
  assert.equal(tulos.length, 2);
  assert.ok(tulos.every(({ kohde }) => !ryhmaKuori(kohde)));
});

test('kaupunki on paikka eikä kategoria — kaupunkimerkit eivät yhdisty', () => {
  const tulos = ryhmitaKohteet([
    rivi('naapuri1', 'kaupunki', 100.5, 100),
    rivi('naapuri2', 'kaupunki', 100.6, 100),
  ], KAUPUNGIT, luokka);
  assert.equal(tulos.length, 2);
});

test('kategoriaton kohde ei yhdisty', () => {
  const tulos = ryhmitaKohteet([
    rivi('a', null, 100.1, 100),
    rivi('b', null, 100.2, 100),
  ], KAUPUNGIT, luokka);
  assert.equal(tulos.length, 2);
});

test('kuori istuu lähimmän jäsenensä paikassa eikä keksityssä keskipisteessä', () => {
  const tulos = ryhmitaKohteet([
    rivi('kauempi', 'historia', 102, 100),
    rivi('lahempi', 'historia', 100.4, 100),
  ], KAUPUNGIT, luokka);
  assert.equal(tulos.length, 1);
  assert.deepEqual(tulos[0].paikka, { x: 100.4, y: 100 });
  // Osiot kaupungin etäisyyden järjestyksessä: lähin ensin.
  assert.deepEqual(tulos[0].kohde.osat.map((o) => o.id), ['lahempi', 'kauempi']);
});

test('kuori ottaa listassa ensimmäisen jäsenensä paikan (nimiöiden väistöjärjestys)', () => {
  const tulos = ryhmitaKohteet([
    rivi('eka', 'kulttuuri', 100.1, 100),
    rivi('toka', 'historia', 100.2, 100),
    rivi('kolmas', 'historia', 100.3, 100),
  ], KAUPUNGIT, luokka);
  assert.deepEqual(tulos.map(({ kohde }) => kohde.id),
    ['eka', ryhmaTunnus('ateena', 'historia')]);
});

test('sama syöte antaa aina saman tuloksen — ei ruutua, ei satunnaisuutta', () => {
  const syote = () => [
    rivi('a', 'historia', 100.5, 100.5),
    rivi('b', 'historia', 100.5, 100.5),
    rivi('c', 'huuto', 100.1, 100.9),
    rivi('d', 'huuto', 99.4, 100.2),
  ];
  const eka = ryhmitaKohteet(syote(), KAUPUNGIT, luokka);
  const toka = ryhmitaKohteet(syote(), KAUPUNGIT, luokka);
  const tiiviste = (t) => t.map(({ kohde, paikka }) => `${kohde.id}@${paikka.x},${paikka.y}`
    + `:${(kohde.osat ?? []).map((o) => o.id).join('+')}`).join('|');
  assert.equal(tiiviste(eka), tiiviste(toka));
});

test('ilman kaupunkeja lista palautuu koskemattomana', () => {
  const syote = [rivi('a', 'historia', 100.1, 100), rivi('b', 'historia', 100.2, 100)];
  assert.equal(ryhmitaKohteet(syote, [], luokka), syote);
});

/* ============ NIMIÖ ON JÄSENTEN NIMET PILKULLA =====================
 *
 * Omistajan tilaus 31.8.2026 ja sen katkaisusääntö: *"kohteet voisi
 * kirjoittaa mahdollisimman tiiviissä muodossa ja erotella pilkulla"*
 * — *"Jos kaikki teksti ei mahdu, niin katkaistaan vain jostain
 * kohtaa ja lisätään loppuun kolme pistettä."*
 *
 * SAMA POLTON EHTO kuin ryhmittelyllä: katkaisukohta on osa ladontaa,
 * joten se lasketaan merkkileveystaulukosta eikä selaimen
 * tekstinmittauksesta (js/fokusnosto-symbolit.js nostosymTekstinLeveys).
 * Nämä väitteet ajetaan Nodessa ilman DOMia juuri siksi.
 */

test('nimiö on jäsenten nimet pilkulla, kun ne mahtuvat', () => {
  assert.equal(ryhmaNimio(['Tuileries', 'Bastilji']), 'Tuileries, Bastilji');
});

test('liian pitkä lista katkeaa ja saa kolme pistettä', () => {
  const nimio = ryhmaNimio([
    'Olympieion', 'Iliou Melathron', 'Akropolis', 'Niken temppeli',
    'Diogeneen astia', 'Antiikin agora',
  ]);
  assert.ok(nimio.endsWith('…'), nimio);
  assert.ok(nimio.startsWith('Olympieion, '), nimio);
});

test('ellipsi mahtuu budjettiin — se ei tule mitatun tekstin perään', () => {
  const nimet = ['Potjomkin-portaat', 'Odessan ooppera'];
  const nimio = ryhmaNimio(nimet, RYHMA_NIMIO_LEVEYS);
  assert.ok(nostosymTekstinLeveys(nimio) <= RYHMA_NIMIO_LEVEYS,
    `${nimio} = ${nostosymTekstinLeveys(nimio)}`);
});

test('yksikään maailman ryhmänimiö ei ylitä budjettia', () => {
  // Kolme pahinta oikeaa listaa maailmasta (Ateena, Wien, Pariisi).
  const listat = [
    ['Olympieion', 'Iliou Melathron', 'Akropolis', 'Niken temppeli',
      'Diogeneen astia', 'Antiikin agora'],
    ['Näyttely ja pörssi', 'Saliera', 'Klimtin maalaukset', 'Kirahvi ja muoti',
      'Shakkiturkkilainen'],
    ['Vrain-Lucas', 'Mona Lisan varkaus', 'Kirahvin kävelymatka', 'Torni romuraudaksi'],
  ];
  for (const nimet of listat) {
    const nimio = ryhmaNimio(nimet);
    assert.ok(nostosymTekstinLeveys(nimio) <= RYHMA_NIMIO_LEVEYS, nimio);
  }
});

test('katkaisu suosii nimen rajaa, kun se ei hukkaa tilaa', () => {
  // "Forum Romanum, Avaimenreikä, Vatikaanin palatsi" katkeaa niin,
  // että kolmas nimi jää pois kokonaan eikä puolikkaana.
  const nimio = ryhmaNimio(['Forum Romanum', 'Avaimenreikä', 'Vatikaanin palatsi']);
  assert.equal(nimio, 'Forum Romanum, Avaimenreikä…');
});

test('leveys on taulukosta eikä selaimesta — sama vastaus ilman DOMia', () => {
  assert.equal(typeof globalThis.document, 'undefined');
  const a = nostosymTekstinLeveys('Akropolis');
  assert.ok(a > 0 && Number.isFinite(a));
  // Tuntematon merkki putoaa oletusleveyteen eikä NaNiin.
  assert.ok(Number.isFinite(nostosymTekstinLeveys('中文')));
});

test('yhdistetty kuori saa nimiökseen jäsentensä nimet, kortti kategorian', () => {
  const tulos = ryhmitaKohteet([
    { kohde: { id: 'akropolis', nimi: 'Akropolis', symboli: 'historia' }, paikka: { x: 100.5, y: 100.5 } },
    { kohde: { id: 'agora', nimi: 'Antiikin agora', symboli: 'historia' }, paikka: { x: 100.6, y: 100.2 } },
  ], KAUPUNGIT, luokka);
  assert.equal(tulos.length, 1);
  assert.equal(tulos[0].kohde.nimio, 'Antiikin agora, Akropolis');
  assert.equal(tulos[0].kohde.nimi, 'Historia');
});
