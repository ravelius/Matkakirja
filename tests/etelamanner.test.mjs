/*
 * ETELÄMANTEREEN NOSTOT — paikka asteina, ei laudan pisteenä.
 *
 * OMISTAJA 11.9.2026, sanatarkasti: *"Etelä-Mantereelle tehdään myös
 * omia nostoja, koska se on mielenkiintoinen tutkimuspaikka. Niin se
 * saisi piirtyä hyvin, myös silloin kun sitä zoomaan."*
 *
 * Nämä testit vartioivat sitä osaa, jota silmällä ei voi tarkistaa:
 *
 *   1. ETTÄ LAUTAPISTE ON OIKEASTI MAHDOTON. Jos joku joskus
 *      "korjaa" nämä nostot antamalla niille `laudat.maailmankartta`
 *      -pisteen, merkki menisi laudan ulkopuolelle — tässä lasketaan
 *      pelin omalla projektiolla, että jokainen kuudesta osuisi
 *      laudan alareunan alapuolelle.
 *   2. ETTÄ TASOKARTTA JÄTTÄÄ NE POIS ITSESTÄÄN eikä kaadu: pelin oma
 *      passi (kohdeKarttarivit) suodattaa rivin, jolla ei ole
 *      äärellistä lautapistettä.
 *   3. ETTÄ PALLO OSAA SIJOITTAA NE. Sama kaava kuin pallolaudan
 *      nostokerroksella: lat/lon suoraan kohteen `asteet`-kentästä,
 *      ja jokainen osuu eteläkalotin alalle (js/pallo.js NAPAKALOTTI).
 *   4. ETTÄ SISÄLTÖ ON TALON SÄÄNNÖN MUKAINEN: tunnukset uniikkeja,
 *      lähde nimetty, ei kuvakenttiä, kysymykset ja korostukset
 *      paikallaan.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { MAASTOKOHTEET_ATA } from '../js/packs/maastokohteet-ata.js';
import { KOHDE_MAAT, kohdeKarttarivit } from '../js/fokuskohteet.js';
import { MAASTOKOHTEET } from '../js/packs/maastokohteet.js';
import { laudaltaAsteiksi, projisoiLaudalle } from '../js/fokusmitat.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { NAPAKALOTTI, kalotinKuvapiste } from '../js/pallo.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
/** Maailmankartan korkeus lautayksikköinä (juliste loppuu 61,47° S). */
const LAUDAN_KORKEUS = MAAILMANKARTTA.map.height;

test('nostoja on kuusi ja jokaisella on oma tunnus', () => {
  assert.equal(MAASTOKOHTEET_ATA.length, 6);
  const tunnukset = MAASTOKOHTEET_ATA.map((k) => k.id);
  assert.equal(new Set(tunnukset).size, 6);
  for (const id of tunnukset) assert.match(id, /^ata-[a-z-]+$/);
  // Tunnus ei saa törmätä minkään maan nostoon (kortit haetaan tunnuksella).
  const muut = new Set();
  for (const lista of Object.values(KOHDE_MAAT)) for (const k of lista) muut.add(k.id);
  for (const lista of Object.values(MAASTOKOHTEET)) for (const k of lista) muut.add(k.id);
  for (const id of tunnukset) assert.ok(!muut.has(id), `tunnus ${id} on jo käytössä`);
});

test('Etelämanner ei ole maiden tauluissa — se ei ole maa eikä sillä ole lehteä', () => {
  assert.equal(KOHDE_MAAT.ATA, undefined);
  assert.equal(MAASTOKOHTEET.ATA, undefined);
  // Eikä maailmankartan maalistassa: siellä ovat ne maat, joissa
  // pelaaja voi seistä (tools/laske-karttanostot.mjs lukee tämän).
  const maat = new Set(Object.values(MAAILMANKARTTA.map.cityCountry ?? {}));
  assert.ok(!maat.has('ATA'));
});

test('lautapiste on mahdoton: jokainen kohde osuisi laudan ulkopuolelle', () => {
  for (const k of MAASTOKOHTEET_ATA) {
    const p = projisoiLaudalle('maailmankartta', k.asteet.lon, k.asteet.lat);
    assert.ok(p, `${k.id}: projektio ei antanut pistettä`);
    assert.ok(p.y > LAUDAN_KORKEUS,
      `${k.id} projisoituu riville ${p.y.toFixed(0)}, laudan korkeus on ${LAUDAN_KORKEUS}`);
  }
  // Ja sama toisin päin: laudan alareuna on vasta 58° S:n tienoilla,
  // joten mantereen pohjoisin kärkikään ei mahdu.
  const alareuna = laudaltaAsteiksi('maailmankartta', 0, LAUDAN_KORKEUS);
  assert.ok(alareuna.lat > -60, `laudan alareuna on ${alareuna.lat}`);
});

test('nostoilla EI ole laudat-kenttää — tasokartta jättää ne pois itsestään', () => {
  for (const k of MAASTOKOHTEET_ATA) {
    assert.equal(k.laudat, undefined, `${k.id}: lautapiste ei saa olla`);
    assert.ok(Number.isFinite(k.asteet?.lat) && Number.isFinite(k.asteet?.lon));
  }
  /*
   * PELIN OMA PASSI, EI JÄLJITELMÄ: kohdeKarttarivit suodattaa rivin,
   * jolla ei ole äärellistä lautapistettä. Kun nämä kuusi syötetään
   * sille lisärivinä (sama muoto kuin hetkillä ja skandaaleilla),
   * tuloksen on oltava tyhjä — ei riviä, ei merkkiä, ei poikkeusta.
   */
  const lisat = MAASTOKOHTEET_ATA.map((kohde) => ({ kohde, paikka: kohde.laudat?.maailmankartta }));
  const rivit = kohdeKarttarivit({
    iso: null, lauta: 'maailmankartta', kaupungit: [], pohjanAlla: () => true, lisat,
  });
  assert.deepEqual(rivit, []);
});

test('pallo sijoittaa jokaisen kohteen eteläkalotin alalle', () => {
  const k = NAPAKALOTTI.etela;
  for (const kohde of MAASTOKOHTEET_ATA) {
    const { lat, lon } = kohde.asteet;
    assert.ok(lat <= k.reuna && lat >= -90, `${kohde.id}: ${lat}° ei ole kalotin alalla`);
    assert.ok(lon >= -180 && lon <= 180, `${kohde.id}: pituusaste ${lon}`);
    // Kuvapiste kalotissa: r ≤ 1 tarkoittaa kuvan sisällä.
    const p = kalotinKuvapiste('etela', lat, lon);
    assert.ok(p.r <= 1 + 1e-12, `${kohde.id}: r ${p.r}`);
  }
  // Etelänapa on mukana ja osuu täsmälleen kuvan keskelle.
  const napa = MAASTOKOHTEET_ATA.find((x) => x.asteet.lat === -90);
  assert.ok(napa, 'etelänapa puuttuu nostoista');
  assert.ok(Math.abs(kalotinKuvapiste('etela', -90, 0).r) < 1e-12);
});

test('pallon nostokerros lukee asteet-kentän eikä lautapistettä', () => {
  const kerros = lue('../js/pallolauta/nostot.js');
  assert.match(kerros, /import \{ MAASTOKOHTEET_ATA \}/);
  assert.match(kerros, /const a = kohde\.asteet;/);
  assert.match(kerros, /ETELAMANNER_NAKYY_ASTETTA/);
  // Merkki ei ole koskaan poltettu: laattapyramidissa ei ole Etelämannerta.
  assert.match(kerros, /avain: `ata:\$\{kohde\.id\}`/);
});

test('sisältö: lähde nimetty, toimitetut kuvat, kysymykset ja teksti paikallaan', () => {
  for (const k of MAASTOKOHTEET_ATA) {
    assert.ok(k.nimi && k.nimi.length <= 40, `${k.id}: nimi`);
    assert.ok(k.tyyppi, `${k.id}: tyyppi puuttuu`);
    assert.match(k.kuva?.osoite ?? '', /^https:\/\/media\.matkakirja\.app\/karttanostot\//, `${k.id}: varmennettu kuva`);
    assert.ok(k.kuva.lyhyt && k.kuva.selite && k.kuva.lahde && k.kuva.lahdeUrl, `${k.id}: kuvan tekstit ja lähde`);
    assert.equal(k.kuvat, undefined, `${k.id}: kuvakenttiä ei kirjoiteta käsin`);
    assert.equal(k.kysymykset?.length, 2, `${k.id}: kaksi pöllön kysymystä`);
    assert.ok(Array.isArray(k.korostukset) && k.korostukset.length >= 1, `${k.id}: korostukset`);
    assert.ok(k.nappi && k.nappi.length <= 60, `${k.id}: nappi`);
    assert.ok(k.teksti.length >= 400, `${k.id}: teksti on liian lyhyt`);
    assert.match(k.lahde, /^en-Wikipedia "/, `${k.id}: lähde ei nimeä artikkelia`);
    assert.match(k.lahde, /tarkistettu 11\.9\.2026/, `${k.id}: tarkistuspäivä puuttuu`);
  }
});

test('jokainen kohde on nimetty myös lähdekommentissa rivin yläpuolella', () => {
  const paketti = lue('../js/packs/maastokohteet-ata.js');
  for (const k of MAASTOKOHTEET_ATA) {
    const artikkeli = k.lahde.match(/^en-Wikipedia "([^"]+)"/)[1];
    assert.ok(paketti.includes(`en.wikipedia.org "${artikkeli}"`),
      `${k.id}: artikkelia "${artikkeli}" ei mainita tiedoston kommenteissa`);
  }
});
