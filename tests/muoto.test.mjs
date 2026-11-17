/*
 * MUOTO (SK 17.11.2026; suunnitelma 20261117-maakartan-kohteet kohta 8): data/muoto.json = tyyppi per karttavalon id.
 * Vartioi: jokainen avain on viennin karttavalo (kirjoitusvirhe ei katoa hiljaa), tyyppi on sallittu, Ranskassa 67 riviä.
 *
 * VIENTI (PK 17.11.2026; skeema 1.73, tools/vienti/muoto.mjs): (1) tuntematon tyyppi on virhe ja maisema = vuori | maasto; (2) kohde vedessä
 * (yli rannan varan maan rajasta) on virhe, vuorovesisaari rannan varassa ei; (3) rivi ilman karttavaloa ja sama id kahdesti ovat virheitä;
 * (4) viennissä jokaisella valolla on kenttä muoto (rivi tai null), rivit ovat tunnettuja tyyppejä ja SK:n rivit päätyvät valoille.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { kokoaVienti } from '../tools/vienti/vie-sisalto.mjs';
import { MUOTOTYYPIT, RANTAVARA_KM, litista, muotoRivista, rikastaMuoto, rajanEtaisyysKm } from '../tools/vienti/muoto.mjs';

const TYYPIT = ['kirkko', 'linna', 'palatsi', 'luostari', 'raunio', 'silta', 'luola', 'muistomerkki', 'megaliitti',
  'vuori', 'maasto', 'vesi', 'kaupunki', 'ei-muotoa'];
const muoto = JSON.parse(readFileSync(new URL('../data/muoto.json', import.meta.url), 'utf8'));
const { tiedostot } = await kokoaVienti();
const valot = new Map(JSON.parse(tiedostot.get('kokoelmat/karttavalot.json')).alkiot.map((v) => [v.id, v]));

test('muoto.json Ranska: 67 riviä, avain on karttavalo ja näkyy maatasolla, tyyppi sallittu', () => {
  const rivit = Object.entries(muoto.ranska);
  assert.equal(rivit.length, 67);
  for (const [id, m] of rivit) {
    assert.ok(valot.has(id), `${id}: ei karttavaloa`);
    assert.ok(TYYPIT.includes(m.tyyppi), `${id}: tuntematon tyyppi ${m.tyyppi}`);
  }
});

// Neliömaa 0–1° × 45–46°.
const MAA = { id: 'TST', bbox: [0, 45, 1, 46], renkaat: [[[0, 45], [1, 45], [1, 46], [0, 46], [0, 45]]] };
const valo = (id, lat, lon) => ({ id, nimi: id, maa: 'TST', lat, lon });

test('tyyppi: tunnettu, maisema vuorelle ja maastolle, tuntematon on virhe', () => {
  assert.deepEqual(muotoRivista('a', { tyyppi: 'vuori' }), { tyyppi: 'vuori', maisema: true });
  assert.deepEqual(muotoRivista('a', { tyyppi: 'maasto' }), { tyyppi: 'maasto', maisema: true });
  assert.deepEqual(muotoRivista('a', { tyyppi: 'linna' }), { tyyppi: 'linna', maisema: false });
  for (const t of ['kirkko', 'palatsi', 'luostari', 'raunio', 'silta', 'luola', 'muistomerkki', 'megaliitti', 'vesi', 'kaupunki', 'ei-muotoa']) {
    assert.ok(MUOTOTYYPIT.includes(t), `SK:n tyyppi ${t}`);
  }
  assert.throws(() => muotoRivista('a', { tyyppi: 'linnoitus' }), /tuntematon tyyppi/);
  assert.throws(() => muotoRivista('a', {}), /tuntematon tyyppi/);
});

test('kohde vedessä on virhe, rannan varassa ei; vesi ja piste saavat olla vedessä', () => {
  const rivit = litista({ testi: { sisalla: { tyyppi: 'linna' }, ranta: { tyyppi: 'luostari' }, meri: { tyyppi: 'vesi' } } });
  const valot = [valo('sisalla', 45.5, 0.5), valo('ranta', 45.5, 1.02), valo('meri', 45.5, 1.5), valo('muu', 45.5, 0.2)];
  assert.ok(rajanEtaisyysKm(MAA, valot[1]) < RANTAVARA_KM, 'ranta 1,6 km rajasta');
  assert.deepEqual(rikastaMuoto(valot, rivit, [MAA]), { linna: 1, luostari: 1, vesi: 1 });
  assert.equal(valot[3].muoto, null, 'ei riviä = null');
  const kaukana = litista({ testi: { linna: { tyyppi: 'linna' } } });
  assert.throws(() => rikastaMuoto([valo('linna', 45.5, 1.2)], kaukana, [MAA]), /on vedessä: 15\.\d km/);
  // Maan rajat tuntemattomat: ei tarkistusta.
  assert.doesNotThrow(() => rikastaMuoto([{ ...valo('linna', 45.5, 1.2), maa: 'XXX' }], kaukana, [MAA]));
});

test('rivi ilman valoa ja sama id kahdesti ovat virheitä; _kuvaus ohitetaan', () => {
  assert.throws(() => rikastaMuoto([valo('a', 45.5, 0.5)], litista({ t: { b: { tyyppi: 'linna' } } }), [MAA]), /1 riviä ilman karttavaloa: b/);
  assert.throws(() => litista({ t: { a: { tyyppi: 'linna' } }, u: { a: { tyyppi: 'kirkko' } } }), /a kahdesti/);
  assert.equal(litista({ _kuvaus: 'x', t: { a: { tyyppi: 'linna' } } }).size, 1);
});

test('vienti: jokaisella karttavalolla muoto (rivi tai null), rivit tunnettuja, SK:n rivit valoilla', () => {
  for (const v of valot.values()) {
    assert.ok('muoto' in v, `${v.id}: kenttä muoto`);
    if (v.muoto === null) continue;
    assert.ok(MUOTOTYYPIT.includes(v.muoto.tyyppi), `${v.id}: ${v.muoto.tyyppi}`);
    assert.equal(v.muoto.maisema, v.muoto.tyyppi === 'vuori' || v.muoto.tyyppi === 'maasto', `${v.id}: maisema`);
  }
  for (const [id, m] of Object.entries(muoto.ranska)) assert.equal(valot.get(id)?.muoto?.tyyppi, m.tyyppi, `${id}: vienti`);
  for (const t of TYYPIT) assert.ok(MUOTOTYYPIT.includes(t), `SK:n tyyppi ${t} viennissä`);
});
