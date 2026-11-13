/*
 * TARINAPAIKAN SYMBOLI SEURAA KARTAN MERKKIÄ (KK 13.11.2026 klo 09.57, Lontoon faktapohja kohta 8).
 *
 * Kortin ylärivin luokka tulee noston `symboli`-kentästä; puuttuva symboli on oletuksena 'huuto' = SKANDAALIT
 * (js/fokusnosto.js nostoMerkinKentat ja kortin ylärivi; natiivi NostoSisalto.cs sama sääntö). Savusumu 1952 näkyi
 * siksi Skandaaleina. Pelaajalle kartan merkki ja kortin ylärivi sanovat saman asian:
 *   tiimalasi → historia · lyyra → kulttuuri (kulttuuri tai ruoka) · lamppu → kauppa (tekniikka) · skandaali → skandaalit.
 * Koskee kohdekartan tarinapaikkoja (kohteet[].tarinapaikka), joiden juttu on täkynosto (nosto-…). Historian hetket
 * (hetki-…), syvennykset (syvennys-…) ja skandaalikokoelman jutut (skandaali-…) ovat omia lajejaan ja jäävät pois.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { KAUPUNKIKARTAT } from '../js/packs/maakartat.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { NOSTOSYM_TYYPIT, nostosymPaakategoria } from '../js/fokusnosto-symbolit.js';
import { nostoKarttarivit } from '../js/fokusnosto.js';
import { kohdeMerkinLadonta } from '../js/fokuskohteet.js';

const MERKIN_PAAKATEGORIA = { tiimalasi: 'historia', lyyra: 'kulttuuri', lamppu: 'kauppa', skandaali: 'skandaalit' };

const nostot = new Map();
for (const virta of Object.values(FOKUSVIRRAT)) for (const n of virta?.takynostot ?? []) nostot.set(`nosto-${n.id}`, n);

const tarinapaikat = [];
for (const [kaupunki, kartta] of Object.entries(KAUPUNKIKARTAT))
  for (const k of kartta.kohteet ?? [])
    if (k.tarinapaikka && typeof k.nosto === 'string' && k.nosto.startsWith('nosto-')) tarinapaikat.push({ kaupunki, k });

test('tarinapaikkoja, joiden juttu on täkynosto, löytyy (Savusumu 1952 mukana)', () => {
  assert.ok(tarinapaikat.length >= 8, `vain ${tarinapaikat.length}`);
  assert.ok(tarinapaikat.some(({ k }) => k.nimi === 'Savusumu 1952'));
});

for (const { kaupunki, k } of tarinapaikat) {
  test(`${kaupunki} / ${k.nimi}: noston symboli kirjoitettu ja vastaa merkkiä ${k.merkki ?? 'tiimalasi'}`, () => {
    const nosto = nostot.get(k.nosto);
    assert.ok(nosto, `nostoa ${k.nosto} ei löydy fokusvirtojen takynostoista`);
    assert.ok(NOSTOSYM_TYYPIT.has(nosto.symboli), `${k.nosto}: symboli puuttuu tai tuntematon (${nosto.symboli}) → kortti näyttäisi SKANDAALIT`);
    const odotus = MERKIN_PAAKATEGORIA[k.merkki ?? 'tiimalasi'];
    assert.ok(odotus, `tuntematon merkki ${k.merkki}`);
    assert.equal(nostosymPaakategoria(nosto.symboli), odotus, `${k.nosto}: symboli ${nosto.symboli} ei vastaa merkkiä ${k.merkki}`);
  });
}

/*
 * KAIKKI TÄKYNOSTOT (KK 13.11.2026 klo 10.18; SK:n taulukko docs/raportit/takynostojen-symboliehdotus-20261113.md):
 * symboli kirjoitetaan aina näkyviin, jotta kortti ei putoa oletukseen 'huuto' = SKANDAALIT. Käydään virta kerrallaan,
 * koska sama tunnus voi esiintyä kahden kaupungin virrassa.
 */
const kaikki = [];
for (const [kaupunki, virta] of Object.entries(FOKUSVIRRAT))
  for (const n of virta?.takynostot ?? []) kaikki.push({ kaupunki, n });

test('täkynostoja löytyy kaikista virroista (yli 100)', () => {
  assert.ok(kaikki.length > 100, `vain ${kaikki.length}`);
});

for (const { kaupunki, n } of kaikki) {
  test(`${kaupunki} / nosto-${n.id}: symboli kirjoitettu ja tunnettu`, () => {
    assert.ok(NOSTOSYM_TYYPIT.has(n.symboli), `symboli puuttuu tai tuntematon (${n.symboli}) → kortti näyttäisi SKANDAALIT`);
    assert.ok(nostosymPaakategoria(n.symboli), `symbolilla ${n.symboli} ei ole kartan pääkategoriaa`);
  });
}

/*
 * LUONNON TÄKYNOSTON LAJI (KK 13.11.2026, täkymerkit c; proto-3d/_tyo/pelikoodari/takymerkit/TULOS.md):
 * luontonoston merkki valitaan lajista (jarvi|joki|meri), muuten se on vuori. Baikal näkyi siksi vuorena. Laji kulkee
 * merkkiriville (js/fokusnosto.js nostoMerkinKentat) ja ladontaan (js/fokuskohteet.js kohdeMerkinLadonta) → viennin
 * karttavalot.laji → natiivin Kuvamerkki. Jokaisella luontonostolla laji on joko tunnettu tai tarkoituksella puuttuu
 * (vuori on oikea merkki: fossiili, puu, dyyni, tulivuoret, vuorovesi odottaa KK:n sanaa).
 */
const LUONNON_LAJIT = new Set(['jarvi', 'joki', 'meri']);
const LAJI_TARKOITUKSELLA_PUUTTUU = new Set([
  'archaeopteryx', 'korkkitammi', 'maalehti-dune-du-pilat', 'maalehti-chaine-des-puys', 'maalehti-couesnonin-vuorovesi',
]);
const luontonostot = kaikki.filter(({ n }) => n.symboli === 'luonto');

test('luontotäkyjä löytyy, ja Baikal on järvi', () => {
  assert.ok(luontonostot.length >= 13, `vain ${luontonostot.length}`);
  assert.equal(luontonostot.find(({ n }) => n.id === 'baikal')?.n.laji, 'jarvi');
});

for (const { kaupunki, n } of luontonostot) {
  test(`${kaupunki} / nosto-${n.id}: luonnon laji tunnettu tai tarkoituksella puuttuu`, () => {
    if (LAJI_TARKOITUKSELLA_PUUTTUU.has(n.id)) assert.equal(n.laji, undefined, 'laji lisätty: poista listalta');
    else assert.ok(LUONNON_LAJIT.has(n.laji), `laji puuttuu tai tuntematon (${n.laji}) → merkki olisi vuori`);
  });
}

for (const { kaupunki, n } of kaikki.filter(({ n }) => n.laji)) {
  test(`${kaupunki} / nosto-${n.id}: laji kulkee merkkiriville ja ladontaan`, () => {
    const { rivit } = nostoKarttarivit([{ ...n, kohde: undefined, paikka: { x: 1, y: 1, nimi: n.nimio } }], 'maailma');
    assert.equal(rivit[0]?.kohde.laji, n.laji);
    assert.equal(kohdeMerkinLadonta({}, rivit[0].kohde).laji, n.laji);
  });
}

test('lajiton nosto pitää ladonnan lajina tyypin', () => {
  const { rivit } = nostoKarttarivit([{ id: 'x', otsikko: 'x', symboli: 'historia', paikka: { x: 1, y: 1 } }], 'maailma');
  assert.equal(kohdeMerkinLadonta({}, rivit[0].kohde).laji, 'nosto');
});
