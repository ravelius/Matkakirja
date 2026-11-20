/*
 * NOSTOTEKSTIEN KUUSI TARKISTUSTA (P-261120-3, L5-2; suunnitelma 20261120-viisi-lisaysta.md L5.5; KK 20.11.2026).
 *
 * Pariisin 46 nostotekstiä (tools/sisalto/noston-tarkistus.mjs). Lähtöluettelo
 * docs/raportit/pariisin-nostot-rikkeet-lahto-20261120.json on rikkeet ennen erää 1: luettelo saa vain pienentyä,
 * eli rike, jota luettelossa ei ole, kaataa testin. Erän 1 13 nostoa (ERA_1) eivät saa rikkoa mitään, ja
 * niiden nimi on oltava ensimmäisessä virkkeessä sellaisenaan.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { keraaPariisinNostot, tarkista, merkkeja, nimenVarsi, ensimmainenVirke, sanotutVuodet, PITUUS_MAX } from '../tools/sisalto/noston-tarkistus.mjs';

const LAHTO = JSON.parse(fs.readFileSync(new URL('../docs/raportit/pariisin-nostot-rikkeet-lahto-20261120.json', import.meta.url), 'utf8'));
const ERA_1 = ['tuileries', 'louvre', 'bastilji', 'eiffel-torni', 'sainte-chapelle', 'curie-1898', 'lumiere-1895', 'lavoisier-1780',
  'pasteur-1862', 'palais-garnier', 'hahmotelma-palais-orsay', 'hahmotelma-palais-industrie', 'hahmotelma-les-halles'];

const NOSTOT = await keraaPariisinNostot();
const { FOKUSKOHTEET_FRA } = await import('../js/packs/fokuskohteet-fra.js');
const { EUROOPAN_KADONNEET } = await import('../js/packs/monumentit-eurooppa.js');
const rikkeet = (n) => tarkista(n);

/** Rikkeet, joita lähtöluettelossa ei ole (uusi rike) tai jotka ovat erän 1 nostolla (ei saa olla yhtään). */
function uudetRikkeet(koodi) {
  const virheet = [];
  for (const n of NOSTOT) {
    const nyt = rikkeet(n);
    const sallittu = LAHTO.nostot[n.id]?.rikkeet ?? [];
    if (ERA_1.includes(n.id) ? nyt.includes(koodi) : nyt.includes(koodi) && !sallittu.includes(koodi)) virheet.push(`${n.id}: ${koodi}`);
  }
  return virheet;
}

test('Pariisin nostoja on 46 ja erän 1 13 jaksollista löytyy', () => {
  assert.equal(NOSTOT.length, 46);
  for (const id of ERA_1) assert.ok(NOSTOT.some((n) => n.id === id && n.ryhma === 'A'), `${id} puuttuu`);
  assert.equal(LAHTO.nostoja, 46);
});

test('1. nimi on ensimmäisessä virkkeessä (jaksollisilla koko nimi sellaisenaan)', () => {
  assert.deepEqual(uudetRikkeet('alku').filter((v) => v.endsWith('alku')), []);
  for (const n of NOSTOT.filter((x) => ERA_1.includes(x.id))) {
    assert.ok(ensimmainenVirke(n.teksti).toLowerCase().includes(n.nimi.toLowerCase()), `${n.id}: nimi "${n.nimi}" ei ole ensimmäisessä virkkeessä`);
  }
  assert.equal(nimenVarsi('Notre-Dame 2019'), 'notre-da');
});

test('2. ensimmäinen virke ei ala suhteellisella ajalla (myöhemmin, aiemmin, kaksi vuotta sitten)', () => {
  assert.deepEqual(uudetRikkeet('alku'), []);
  const huono = (teksti) => tarkista({ id: 'x', nimi: 'Louvre', teksti });
  assert.ok(huono('Lähes neljäkymmentä vuotta myöhemmin Louvre oli suljettu.').includes('alku'));
  assert.ok(huono('Kaksi vuotta aiemmin, toukokuussa 1871, Louvre paloi.').includes('alku'));
  assert.ok(huono('Myöhemmin Louvre avattiin.').includes('alku'));
  assert.ok(!huono('Louvre oli kuninkaiden palatsi.').includes('alku'));
});

test('3. tekstin vuodet ovat nousevassa järjestyksessä (vuosikymmenet ja "ei 1789:stä" eivät lasketa)', () => {
  assert.deepEqual(uudetRikkeet('jarjestys'), []);
  assert.deepEqual(sanotutVuodet('Pylväs on vuodelta 1830, ei 1789:stä. 1300-luvun lopulla ja 1850-luvulta, 1969.'), [1830, 1969]);
  assert.ok(tarkista({ id: 'x', nimi: 'X', teksti: 'X syntyi 1900. Se paloi 1871.' }).includes('jarjestys'));
});

test('4. jokaisella sanotulla vuodella vuosirivi ja jokaisella rivillä vuosi tekstissä (jaksolliset)', () => {
  assert.deepEqual(uudetRikkeet('rivit'), []);
  const n = { id: 'x', nimi: 'X', teksti: 'X avattiin 1900.', jaksollinen: true };
  assert.ok(tarkista({ ...n, vuodet: [] }).includes('rivit'), 'sanottu vuosi ilman riviä');
  assert.ok(tarkista({ ...n, vuodet: [{ vuosi: '1900' }, { vuosi: '1950' }] }).includes('rivit'), 'rivi ilman vuotta tekstissä');
  assert.ok(!tarkista({ ...n, vuodet: [{ vuosi: '1900' }] }).includes('rivit'));
});

test('5. sana isoisä ei esiinny', () => {
  assert.deepEqual(uudetRikkeet('isoisa'), []);
  assert.ok(tarkista({ id: 'x', nimi: 'X', teksti: 'X, jonka isoisäsi mittasi.' }).includes('isoisa'));
});

test('6. pituus enintään 1 000 merkkiä', () => {
  assert.deepEqual(uudetRikkeet('pituus'), []);
  assert.equal(merkkeja('ab\n\ncd'), 4);
  assert.ok(tarkista({ id: 'x', nimi: 'X', teksti: `X ${'a'.repeat(PITUUS_MAX)}` }).includes('pituus'));
});

test('lähtöluettelo: sen rikkeet ovat vain tunnettuja koodeja eikä erän 1 noston rikettä ole enää sellaisenaan tarpeen', () => {
  const koodit = new Set(['alku', 'isoisa', 'jarjestys', 'pituus', 'rivit']);
  for (const [id, r] of Object.entries(LAHTO.nostot)) {
    assert.ok(NOSTOT.some((n) => n.id === id), `lähtöluettelossa tuntematon nosto ${id}`);
    for (const k of r.rikkeet) assert.ok(koodit.has(k), `${id}: ${k}`);
  }
});

test('erä 1 (13 jaksollista): neljä tai viisi jaksoa, pituus 700–1 000, vuosirivejä 4–6 (Bastilji: äänitetyt palat sanasta sanaan ennallaan → 2 riviä; Eiffel: 1909 vain suhteellisena → 3 riviä)', () => {
  const kaikki = [...FOKUSKOHTEET_FRA, ...EUROOPAN_KADONNEET.FRA];
  const virheet = [];
  for (const id of ERA_1) {
    const k = kaikki.find((x) => x.id === id);
    const j = k.jaksot;
    const rivit = j.flatMap((x) => x.vuodet ?? []).length;
    const pituus = merkkeja(j.map((x) => x.teksti).join('\n\n'));
    if (j.length < 4 || j.length > 5) virheet.push(`${id}: ${j.length} jaksoa`);
    if (pituus < 700 || pituus > 1000) virheet.push(`${id}: ${pituus} merkkiä`);
    if ((rivit < 4 || rivit > 6) && id !== 'bastilji' && id !== 'eiffel-torni') virheet.push(`${id}: ${rivit} vuosiriviä`);
    if (j.some((x) => x.osa === 'nimi' || x.osa === 'esittely' || x.aani === 'isoisa')) virheet.push(`${id}: nimi-, esittely- tai isoisäjakso datassa`);
    if (!/^[^.]{3,40}$/.test(k.otsikko) || /\d{4}/.test(k.otsikko) || k.otsikko.length > 40) virheet.push(`${id}: tarinarivi "${k.otsikko}"`);
  }
  assert.deepEqual(virheet, []);
  // M5: Tuileries'n vanha äänikansio pois (vanha otto ei saa soida uuden tekstin päällä); Bastiljilla säilyy, ja äänitetyt palat ovat ennallaan.
  assert.equal(kaikki.find((x) => x.id === 'tuileries').aanikansio, undefined);
  const b = kaikki.find((x) => x.id === 'bastilji');
  assert.equal(b.aanikansio, 'bastilji/v1');
  assert.deepEqual(b.jaksot.map((x) => x.aanite), ['kertoja-1-otsikko-jakso2', 'kertoja-2-jakso3', 'kertoja-3-jakso4', 'kertoja-4-jakso5']);
  assert.equal(merkkeja(b.jaksot.map((x) => x.teksti).join('\n\n')), 915, 'Bastiljin äänitettyjen palojen yhteispituus muuttui');
  assert.ok(b.jaksot[0].teksti.startsWith('Bastilji rakennettiin 1300-luvun lopulla vartioimaan Pariisin itäistä porttia'));
  assert.ok(b.jaksot[2].teksti.startsWith('Purku alkoi jo samana iltana.'));
});
