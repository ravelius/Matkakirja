/*
 * POHJOISNAVAN JA ARKTISEN ALUEEN NOSTOT — paikka asteina, ei laudan
 * pisteenä. Sisartesti tests/etelamanner.test.mjs:lle.
 *
 * OMISTAJA 11.9.2026, sanatarkasti: *"tehdään sinne myös nostoja,
 * varsinkin historialliset ja oikeastaan kaikki mahdolliset nostot,
 * mitä sinne vain voi keksiä."*
 *
 * Nämä testit vartioivat sitä osaa, jota silmällä ei voi tarkistaa:
 *
 *   1. ETTÄ LAUTA TODELLA LOPPUU ENNEN NAPAA. Lauta päättyy
 *      pohjoisessa 76,0° N:ään, ja valtaosa näistä kohteista on sen
 *      rivin yläpuolella — niille lautapiste on mahdoton. Loput ovat
 *      napapiirin (66,5° N) pohjoispuolella, eli kaikki kuuluvat
 *      samaan seutuun.
 *   2. ETTÄ TASOKARTTA JÄTTÄÄ NE POIS ITSESTÄÄN eikä kaadu: pelin oma
 *      passi (kohdeKarttarivit) suodattaa rivin, jolla ei ole
 *      äärellistä lautapistettä.
 *   3. ETTÄ PALLO OSAA SIJOITTAA NE — ja että pohjoisen napakalotin
 *      alalle (80°–90° N) osuvat kohteet mahtuvat kalotin kuvaan.
 *   4. ETTÄ JOKAISELLA ON PIIRTYVÄ KARTTAMERKKI. Tuntematon tyyppi jää
 *      ilman symbolia, jolloin nostokerros ohittaa rivin hiljaa — sitä
 *      ei näe muuten kuin mittaamalla (ks. kohdeMerkinLadonta).
 *   5. ETTÄ SISÄLTÖ ON TALON SÄÄNNÖN MUKAINEN: tunnukset uniikkeja,
 *      lähde nimetty, ei kuvakenttiä, kysymykset ja korostukset
 *      paikallaan — ja että jokainen korostus löytyy omasta
 *      tekstistään, muuten alleviivausta ei synny lainkaan.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { MAASTOKOHTEET_ARK } from '../js/packs/maastokohteet-ark.js';
import { MAASTOKOHTEET_ATA } from '../js/packs/maastokohteet-ata.js';
import { KOHDE_MAAT, kohdeKarttarivit, kohdeMerkinLadonta } from '../js/fokuskohteet.js';
import { MAASTOKOHTEET } from '../js/packs/maastokohteet.js';
import { laudaltaAsteiksi, projisoiLaudalle } from '../js/fokusmitat.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { NAPAKALOTTI, kalotinKuvapiste } from '../js/pallo.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
/** Napapiiri: eteläisin leveysaste, jolle arktinen nosto saa osua. */
const NAPAPIIRI = 66.5;
/** Pienin sallittu etäisyys pelikaupunkiin laudan yksikköinä. */
const KAUPUNKIVARA = 11;

test('nostoja on kolmekymmentäviisi ja jokaisella on oma tunnus', () => {
  assert.equal(MAASTOKOHTEET_ARK.length, 35);
  const tunnukset = MAASTOKOHTEET_ARK.map((k) => k.id);
  assert.equal(new Set(tunnukset).size, MAASTOKOHTEET_ARK.length);
  for (const id of tunnukset) assert.match(id, /^ark-[a-z-]+$/);
  // Tunnus ei saa törmätä minkään maan eikä Etelämantereen nostoon
  // (kortit haetaan tunnuksella).
  const muut = new Set(MAASTOKOHTEET_ATA.map((k) => k.id));
  for (const lista of Object.values(KOHDE_MAAT)) for (const k of lista) muut.add(k.id);
  for (const lista of Object.values(MAASTOKOHTEET)) for (const k of lista) muut.add(k.id);
  for (const id of tunnukset) assert.ok(!muut.has(id), `tunnus ${id} on jo käytössä`);
});

test('kaikki ovat napapiirin pohjoispuolella ja valtaosa laudan ulkopuolella', () => {
  const korkeus = MAAILMANKARTTA.map.height;
  // Laudan yläreuna: tästä pohjoiseen lautapistettä ei ole olemassa.
  const ylareuna = laudaltaAsteiksi('maailmankartta', 0, 0);
  assert.ok(ylareuna.lat < 80, `laudan yläreuna on ${ylareuna.lat}`);
  let ulkona = 0;
  for (const k of MAASTOKOHTEET_ARK) {
    assert.ok(k.asteet.lat >= NAPAPIIRI, `${k.id}: ${k.asteet.lat}° on napapiirin eteläpuolella`);
    assert.ok(k.asteet.lat <= 90, `${k.id}: ${k.asteet.lat}°`);
    assert.ok(k.asteet.lon >= -180 && k.asteet.lon <= 180, `${k.id}: pituusaste ${k.asteet.lon}`);
    const p = projisoiLaudalle('maailmankartta', k.asteet.lon, k.asteet.lat);
    assert.ok(p, `${k.id}: projektio ei antanut pistettä`);
    if (p.y < 0 || p.y > korkeus) ulkona += 1;
  }
  // Enemmistö on laudan reunan takana — juuri siksi tämä on oma
  // joukkonsa eikä maiden nostoja.
  assert.ok(ulkona > MAASTOKOHTEET_ARK.length / 2,
    `vain ${ulkona} kohdetta laudan ulkopuolella`);
});

test('yksikään nosto ei osu pelikaupungin päälle', () => {
  // Mitta on laudan yksikköä; alle tämän merkki menisi kaupungin
  // nappulan alle (vrt. js/fokuskohteet.js KAUPUNGIN_KOHDALLA_SADE).
  for (const k of MAASTOKOHTEET_ARK) {
    const p = projisoiLaudalle('maailmankartta', k.asteet.lon, k.asteet.lat);
    for (const c of MAAILMANKARTTA.cities) {
      const d = Math.hypot(c.x - p.x, c.y - p.y);
      assert.ok(d >= KAUPUNKIVARA, `${k.id} on ${d.toFixed(1)} yksikön päässä: ${c.name}`);
    }
  }
});

test('nostoilla EI ole laudat-kenttää — tasokartta jättää ne pois itsestään', () => {
  for (const k of MAASTOKOHTEET_ARK) {
    assert.equal(k.laudat, undefined, `${k.id}: lautapiste ei saa olla`);
    assert.ok(Number.isFinite(k.asteet?.lat) && Number.isFinite(k.asteet?.lon));
  }
  /*
   * PELIN OMA PASSI, EI JÄLJITELMÄ: kohdeKarttarivit suodattaa rivin,
   * jolla ei ole äärellistä lautapistettä. Kun nämä syötetään sille
   * lisärivinä (sama muoto kuin hetkillä ja skandaaleilla), tuloksen on
   * oltava tyhjä — ei riviä, ei merkkiä, ei poikkeusta.
   */
  const lisat = MAASTOKOHTEET_ARK.map((kohde) => ({ kohde, paikka: kohde.laudat?.maailmankartta }));
  const rivit = kohdeKarttarivit({
    iso: null, lauta: 'maailmankartta', kaupungit: [], pohjanAlla: () => true, lisat,
  });
  assert.deepEqual(rivit, []);
});

test('pohjoisen kalotin alalle osuvat kohteet mahtuvat kalotin kuvaan', () => {
  const k = NAPAKALOTTI.pohjoinen;
  let kalotilla = 0;
  for (const kohde of MAASTOKOHTEET_ARK) {
    const { lat, lon } = kohde.asteet;
    if (lat < k.reuna) continue;
    kalotilla += 1;
    // Kuvapiste kalotissa: r ≤ 1 tarkoittaa kuvan sisällä.
    const p = kalotinKuvapiste('pohjoinen', lat, lon);
    assert.ok(p.r <= 1 + 1e-12, `${kohde.id}: r ${p.r}`);
  }
  assert.ok(kalotilla >= 10, `kalotin alalla vain ${kalotilla} kohdetta`);
  // Pohjoisnapa on mukana ja osuu täsmälleen kuvan keskelle.
  const napa = MAASTOKOHTEET_ARK.find((x) => x.asteet.lat === 90);
  assert.ok(napa, 'pohjoisnapa puuttuu nostoista');
  assert.ok(Math.abs(kalotinKuvapiste('pohjoinen', 90, 0).r) < 1e-12);
});

test('jokaisella nostolla on karttamerkki — tuntematon tyyppi putoaisi hiljaa', () => {
  for (const kohde of MAASTOKOHTEET_ARK) {
    const lado = kohdeMerkinLadonta({ game: {} }, kohde);
    assert.ok(lado.symboli, `${kohde.id}: tyyppi "${kohde.tyyppi}" ei anna karttasymbolia`);
  }
});

test('pallon nostokerros lukee asteet-kentän eikä lautapistettä', () => {
  const kerros = lue('../js/pallolauta/nostot.js');
  assert.match(kerros, /import \{ MAASTOKOHTEET_ARK \}/);
  assert.match(kerros, /const a = kohde\.asteet;/);
  assert.match(kerros, /ARKTIS_NAKYY_ASTETTA/);
  // Merkki ei ole koskaan poltettu: laattapyramidissa ei ole napa-alueita.
  assert.match(kerros, /avain: `ark:\$\{kohde\.id\}`/);
});

test('palvelutyöntekijä tuntee paketin', () => {
  const sw = lue('../sw.js');
  assert.ok(sw.includes("'./js/packs/maastokohteet-ark.js'"),
    'maastokohteet-ark.js puuttuu sw.js:n SHELL-listasta');
});

test('sisältö: lähde nimetty, ei kuvia, kysymykset ja teksti paikallaan', () => {
  for (const k of MAASTOKOHTEET_ARK) {
    assert.ok(k.nimi && k.nimi.length <= 40, `${k.id}: nimi`);
    assert.ok(k.tyyppi, `${k.id}: tyyppi puuttuu`);
    assert.equal(k.kuva, undefined, `${k.id}: kuvakenttiä ei kirjoiteta käsin`);
    assert.equal(k.kuvat, undefined, `${k.id}: kuvakenttiä ei kirjoiteta käsin`);
    assert.equal(k.kysymykset?.length, 2, `${k.id}: kaksi pöllön kysymystä`);
    assert.ok(Array.isArray(k.korostukset) && k.korostukset.length >= 1, `${k.id}: korostukset`);
    assert.ok(k.nappi && k.nappi.length <= 60, `${k.id}: nappi`);
    assert.ok(k.teksti.length >= 400, `${k.id}: teksti on liian lyhyt`);
    assert.match(k.lahde, /^en-Wikipedia "/, `${k.id}: lähde ei nimeä artikkelia`);
    assert.match(k.lahde, /tarkistettu 11\.9\.2026/, `${k.id}: tarkistuspäivä puuttuu`);
  }
});

test('jokainen korostus löytyy omasta tekstistään', () => {
  /*
   * Korostus on 'perusmuoto|näkyvä muoto' (js/fokuskohteet.js
   * puraKorostus), ja NÄKYVÄ muoto haetaan leipätekstistä. Jos sitä ei
   * ole, alleviivausta ei tule eikä pöllön kysymysnappia synny — vika,
   * jota ei näe koodista vaan vain vertaamalla.
   */
  for (const k of MAASTOKOHTEET_ARK) {
    for (const merkinta of k.korostukset) {
      const nakyva = merkinta.includes('|') ? merkinta.split('|')[1] : merkinta;
      assert.ok(k.teksti.toLowerCase().includes(nakyva.toLowerCase()),
        `${k.id}: korostusta "${nakyva}" ei ole tekstissä`);
    }
  }
});

test('jokainen kohde on nimetty myös lähdekommentissa rivin yläpuolella', () => {
  const paketti = lue('../js/packs/maastokohteet-ark.js');
  for (const k of MAASTOKOHTEET_ARK) {
    const artikkeli = k.lahde.match(/^en-Wikipedia "([^"]+)"/)[1];
    assert.ok(paketti.includes(`en.wikipedia.org "${artikkeli}"`),
      `${k.id}: artikkelia "${artikkeli}" ei mainita tiedoston kommenteissa`);
  }
});
