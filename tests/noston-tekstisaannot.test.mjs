/*
 * NOSTOTEKSTIEN KUUSI TARKISTUSTA (P-261120-3, L5-2; suunnitelma 20261120-viisi-lisaysta.md L5.5; KK 20.11.2026).
 *
 * Pariisin 46 nostotekstiä (tools/sisalto/noston-tarkistus.mjs). Lähtöluettelo
 * docs/raportit/pariisin-nostot-rikkeet-lahto-20261120.json on rikkeet ennen erää 1: luettelo saa vain pienentyä,
 * eli rike, jota luettelossa ei ole, kaataa testin. Erän 1 13 nostoa (ERA_1) ja erän 2 4 kadonnutta (ERA_2_B) eivät saa rikkoa
 * mitään, ja niiden nimi on oltava ensimmäisessä virkkeessä sellaisenaan. Erän 2 9 tarinapaikkaa (ERA_2_D) eivät saa rikkoa mitään
 * ja ovat kappalemuodossa (3–4 kappaletta, enintään 1 000 merkkiä).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { keraaPariisinNostot, tarkista, merkkeja, nimenVarsi, ensimmainenVirke, sanotutVuodet, PITUUS_MAX } from '../tools/sisalto/noston-tarkistus.mjs';

const LAHTO = JSON.parse(fs.readFileSync(new URL('../docs/raportit/pariisin-nostot-rikkeet-lahto-20261120.json', import.meta.url), 'utf8'));
const ERA_1 = ['tuileries', 'louvre', 'bastilji', 'eiffel-torni', 'sainte-chapelle', 'curie-1898', 'lumiere-1895', 'lavoisier-1780',
  'pasteur-1862', 'palais-garnier', 'hahmotelma-palais-orsay', 'hahmotelma-palais-industrie', 'hahmotelma-les-halles'];
const ERA_2_B = ['hahmotelma-grand-chatelet', 'hahmotelma-temple-torni', 'hahmotelma-trocadero', 'hahmotelma-galerie-des-machines'];
const ERA_2_D = ['d:Bizet 1875', 'd:Kirahvi 1827', 'd:Bukinistit 1859', 'd:Patonki 1994', 'd:Vrain-Lucas', 'd:Monet 1874', 'd:Piiritys 1870',
  'd:Notre-Dame 2019', 'd:Piaf ja Django'];
const ERA_12 = [...ERA_1, ...ERA_2_B];
const ERA_3 = ['Riemukaari', 'Concorden aukio', 'Luxembourgin puisto', 'Sacré-Cœur', 'Panthéon', 'Notre-Dame', 'Tour Saint-Jacques', 'Saint-Eustache',
  'Pompidou-keskus', 'Place des Vosges', 'Invalidit', 'Petit Palais', 'Tour Montparnasse', 'Metro 1900'].map((n) => `c:${n}`);
const KAIKKI_ERAT = [...ERA_12, ...ERA_2_D, ...ERA_3];

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
    if (KAIKKI_ERAT.includes(n.id) ? nyt.includes(koodi) : nyt.includes(koodi) && !sallittu.includes(koodi)) virheet.push(`${n.id}: ${koodi}`);
  }
  return virheet;
}

test('Pariisin nostoja on 46 ja erien 1 ja 2 17 jaksollista löytyy', () => {
  assert.equal(NOSTOT.length, 46);
  for (const id of ERA_12) assert.ok(NOSTOT.some((n) => n.id === id && n.ryhma === 'A'), `${id} puuttuu`);
  assert.equal(NOSTOT.filter((n) => n.ryhma === 'A').length, 17);
  for (const id of ERA_2_D) assert.ok(NOSTOT.some((n) => n.id === id && n.ryhma === 'D'), `${id} puuttuu`);
  assert.equal(LAHTO.nostoja, 46);
});

test('1. nimi on ensimmäisessä virkkeessä (jaksollisilla koko nimi sellaisenaan)', () => {
  assert.deepEqual(uudetRikkeet('alku').filter((v) => v.endsWith('alku')), []);
  for (const n of NOSTOT.filter((x) => ERA_12.includes(x.id))) {
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

test('erät 1 ja 2 (17 jaksollista): neljä tai viisi jaksoa, pituus 700–1 000, vuosirivejä 4–6 (Bastilji: äänitetyt palat sanasta sanaan ennallaan → 2 riviä; Eiffel: 1909 vain suhteellisena → 3 riviä)', () => {
  const kaikki = [...FOKUSKOHTEET_FRA, ...EUROOPAN_KADONNEET.FRA];
  const virheet = [];
  for (const id of ERA_12) {
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
  // M5: Tuileries'n vanha äänikansio (koe/v1) pois, uusi tekstin mukainen v2 (21.11.2026); Bastiljilla säilyy v1, ja äänitetyt palat ovat ennallaan.
  assert.equal(kaikki.find((x) => x.id === 'tuileries').aanikansio, 'tuileries/v2');
  const b = kaikki.find((x) => x.id === 'bastilji');
  assert.equal(b.aanikansio, 'bastilji/v1');
  assert.deepEqual(b.jaksot.map((x) => x.aanite), ['kertoja-1-otsikko-jakso2', 'kertoja-2-jakso3', 'kertoja-3-jakso4', 'kertoja-4-jakso5']);
  assert.equal(merkkeja(b.jaksot.map((x) => x.teksti).join('\n\n')), 915, 'Bastiljin äänitettyjen palojen yhteispituus muuttui');
  assert.ok(b.jaksot[0].teksti.startsWith('Bastilji rakennettiin 1300-luvun lopulla vartioimaan Pariisin itäistä porttia'));
  assert.ok(b.jaksot[2].teksti.startsWith('Purku alkoi jo samana iltana.'));
});

test('erä 2 (9 tarinapaikkaa): kappalemuoto, 3–4 kappaletta, 700–1 000 merkkiä, ei isoisää pelaajalle näkyvissä kentissä, visan vastaus tekstissä', async () => {
  const { NAHTAVYYSJUTUT } = await import('../js/packs/nahtavyysjutut.js');
  const { FOKUSVIRRAT } = await import('../js/packs/fokusvirrat.js');
  const { SKANDAALIT } = await import('../js/packs/skandaalit.js');
  const nj = NAHTAVYYSJUTUT.pariisi;
  const virheet = [];
  for (const id of ERA_2_D) {
    const nimi = id.slice(2);
    const kappaleet = nj[nimi].teksti.split('\n\n');
    const pituus = merkkeja(nj[nimi].teksti);
    // Vrain-Lucas: kartan kortti on lyhyt (306 merkkiä); noston oma pitkä teksti on skandaalin `teksti`.
    const oma = nimi === 'Vrain-Lucas' ? SKANDAALIT.FRA.find((x) => x.id === 'vrain-lucas-kirjevaarennokset').teksti : nj[nimi].teksti;
    const k = oma.split('\n\n');
    if (k.length < 3 || k.length > 4) virheet.push(`${nimi}: ${k.length} kappaletta`);
    if (merkkeja(oma) < (nimi === 'Vrain-Lucas' ? 700 : 700) || merkkeja(oma) > PITUUS_MAX) virheet.push(`${nimi}: ${merkkeja(oma)} merkkiä`);
    if (nimi !== 'Vrain-Lucas' && (kappaleet.length < 3 || pituus > PITUUS_MAX)) virheet.push(`${nimi}: juttu ${kappaleet.length} kappaletta ${pituus} merkkiä`);
  }
  assert.deepEqual(virheet, []);
  // Ei isoisää tekstissä, kysymyksissä, napissa, otsikossa, visassa eikä lähderivillä (pelaajalle näkyvät kentät).
  const virta = FOKUSVIRRAT.pariisi;
  const kentat = [...(virta.takyt ?? []), ...(virta.takynostot ?? []), ...SKANDAALIT.FRA]
    .filter((x) => ['kyyhkyposti', 'impressionistit', 'kirahvin-kavelymatka', 'pariisin-bukinistit', 'carmenin-ensi-ilta', 'notre-damen-kukko',
      'pariisin-patonki', 'pariisi-soi', 'vrain-lucas-kirjevaarennokset'].includes(x.id));
  assert.equal(kentat.length, 9);
  for (const x of kentat) assert.ok(!/isoisä/i.test(JSON.stringify(x)), `${x.id}: isoisä pelaajalle näkyvässä kentässä`);
  const eurKadonneet = JSON.stringify((await import('../js/packs/monumentit-eurooppa.js')).EUROOPAN_KADONNEET.FRA
    .filter((x) => ERA_2_B.includes(x.id)));
  assert.ok(!/isoisä/i.test(eurKadonneet), 'isoisä jäi erän 2 kadonneen kenttiin');
  assert.ok(!/isoisä/i.test(JSON.stringify(ERA_2_D.map((id) => nj[id.slice(2)]))), 'isoisä jäi tarinapaikan nähtävyysjuttuun');
  // M6: visan vastaus kuuluu yhä tekstiin.
  const teksti = (x) => x.teksti ?? x.lunastus.join('\n\n');
  const vastaus = { kyyhkyposti: 'mikrofilm', impressionistit: 'otsikoi', 'kirahvin-kavelymatka': 'liian vaarallisena',
    'pariisin-bukinistit': 'kantaa pois joka ilta', 'carmenin-ensi-ilta': 'Wienissä', 'notre-damen-kukko': 'raunioista lommoilla',
    'pariisin-patonki': 'presidentinpalatsille', 'vrain-lucas-kirjevaarennokset': 'kirjoitettu ranskaksi' };
  for (const x of kentat) {
    if (!vastaus[x.id]) continue;
    assert.ok(teksti(x).toLowerCase().includes(vastaus[x.id].toLowerCase()), `${x.id}: visan vastaus ei ole tekstissä`);
  }
});

test('erä 2 B (KK 20.11.2026 klo 10.44): neljällä kadonneella yksi koti: hahmotelma; nähtävyysjuttukopiot poistettu, kartan piste viittaa hahmotelmaan', async () => {
  const { NAHTAVYYSJUTUT } = await import('../js/packs/nahtavyysjutut.js');
  const nimet = ['Grand Châtelet', 'Temple-torni', 'Trocadéron palatsi', 'Galerie des Machines'];
  for (const n of nimet) assert.equal(NAHTAVYYSJUTUT.pariisi[n], undefined, `${n}: nähtävyysjuttukopio pitää olla poissa`);
  const lahde = fs.readFileSync(new URL('../js/packs/maakartat.js', import.meta.url), 'utf8');
  for (const [nimi, id] of [['Grand Châtelet', 'hahmotelma-grand-chatelet'], ['Temple-torni', 'hahmotelma-temple-torni'],
    ['Trocadéron palatsi', 'hahmotelma-trocadero'], ['Galerie des Machines', 'hahmotelma-galerie-des-machines']]) {
    assert.ok(lahde.includes(`nimi: '${nimi}'`) && lahde.includes(`nosto: '${id}'`), `${nimi}: kartan pisteen pitää viitata hahmotelmaan ${id}`);
  }
});

test('erä 3 (L5-5, 14 nähtävyysjuttua): kolme kappaletta, 700–1 000 merkkiä, vuosirivejä 3–6, kuva kappaleella 1, ei isoisää, visan vastaus tekstissä', async () => {
  const { NAHTAVYYSJUTUT } = await import('../js/packs/nahtavyysjutut.js');
  const { FOKUSVIRRAT } = await import('../js/packs/fokusvirrat.js');
  const nj = NAHTAVYYSJUTUT.pariisi;
  const virheet = [];
  assert.equal(ERA_3.length, 14);
  for (const id of ERA_3) {
    const nimi = id.slice(2);
    const j = nj[nimi];
    const k = j.teksti.split('\n\n');
    if (k.length !== 3) virheet.push(`${nimi}: ${k.length} kappaletta`);
    const m = merkkeja(j.teksti);
    if (m < 700 || m > PITUUS_MAX) virheet.push(`${nimi}: ${m} merkkiä`);
    const rivit = (j.vuodet ?? []).length;
    // Metro 1900: lähteissä ja tekstissä vain kaksi vuotta (1900, 1978): ei keksittyjä rivejä.
    if (rivit < (nimi === 'Metro 1900' ? 2 : 3) || rivit > 6) virheet.push(`${nimi}: ${rivit} vuosiriviä`);
    // Jokaisen rivin kohta-teksti löytyy tekstistä.
    for (const v of j.vuodet ?? []) if (!j.teksti.includes(v.kohta)) virheet.push(`${nimi}: rivin kohta "${v.kohta}" ei ole tekstissä`);
    if (/isoisä/i.test(JSON.stringify(j))) virheet.push(`${nimi}: isoisä pelaajalle näkyvässä kentässä`);
    // M5: jutulla on kuva (kappaleella 1 avauskappaleen jälkeen); Pompidou-keskuksella ei ole vielä kuvaa (K-4 erä 3).
    if (nimi !== 'Pompidou-keskus' && !(j.kuvat ?? []).length) virheet.push(`${nimi}: ei kuvaa`);
  }
  assert.deepEqual(virheet, []);
  // M6: Metro 1900 on myös takynosto (sama teksti kahdessa paikassa) ja sen visan vastaus kuuluu tekstissä.
  const metro = FOKUSVIRRAT.pariisi.takynostot.find((x) => x.id === 'guimardin-metro');
  assert.equal(metro.lunastus.join('\n\n'), nj['Metro 1900'].teksti, 'Metron kaksi tekstiä eroavat');
  assert.ok(metro.lunastus.join(' ').includes('meni pois muodista'), 'Guimard-visan vastaus ei ole tekstissä');
  assert.ok(!/isoisä/i.test(JSON.stringify(metro)), 'isoisä Metron takynostossa');
});
