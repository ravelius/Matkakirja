/*
 * NOSTOVALIKON AIHETAGIT (skeema 1.72; tools/vienti/tagit.mjs; suunnitelma 20261117-nostovalikko kohdat 2.1 ja 7).
 *
 * Vartioi: (1) johtosääntö aiheesta ja tarinapaikan merkistä, datan oma tagi voittaa, tuntematon on virhe;
 * (2) viennissä jokaisella ei-kaupunkivalolla on tagi ja kaupunkivalolla null; (3) kohdekartan kohteen ja linkkien
 * tagi; (4) maataso: tagin maat, joissa vähintään kolme paikkaa, ovat suunnitelman TULOS-tagit 2:n kokoluokkaa
 * (Historia 96, Luonto 117 maata), jotta valikon sirut eivät hiljaa katoa.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { kokoaVienti } from '../tools/vienti/vie-sisalto.mjs';
import { TAGIT, johdaTagi } from '../tools/vienti/tagit.mjs';

test('johtosääntö: aihe, tarinapaikan merkki ja datan oma tagi', () => {
  assert.deepEqual(TAGIT, ['kadonneet', 'historia', 'tiede', 'kulttuuri', 'luonto', 'skandaalit', 'uskonnot']);
  const aiheet = {
    ihmeet: 'kadonneet', historia: 'historia', hetket: 'historia', kauppa: 'tiede', kulttuuri: 'kulttuuri',
    luonto: 'luonto', elaimet: 'luonto', skandaalit: 'skandaalit', kaupungit: null,
  };
  for (const [aihe, tagi] of Object.entries(aiheet)) assert.equal(johdaTagi({ aihe }), tagi, aihe);
  assert.equal(johdaTagi({}), null);
  assert.equal(johdaTagi({ tarinapaikka: true }), 'historia', 'puuttuva merkki = tiimalasi');
  assert.equal(johdaTagi({ tarinapaikka: true, merkki: 'lamppu' }), 'tiede');
  assert.equal(johdaTagi({ tarinapaikka: true, merkki: 'lyyra' }), 'kulttuuri');
  assert.equal(johdaTagi({ tarinapaikka: true, merkki: 'skandaali' }), 'skandaalit');
  assert.equal(johdaTagi({ tagi: 'uskonnot', aihe: 'historia' }), 'uskonnot', 'datan oma voittaa');
  assert.equal(johdaTagi({ tagi: 'uskonnot', tarinapaikka: true, merkki: 'lyyra' }), 'uskonnot');
  assert.throws(() => johdaTagi({ tagi: 'uskonto' }), /tuntematon tagi/);
  assert.throws(() => johdaTagi({ tarinapaikka: true, merkki: 'kukka' }), /tuntematon merkki/);
});

const { tiedostot } = await kokoaVienti();
const lue = (nimi) => JSON.parse(tiedostot.get(`kokoelmat/${nimi}.json`)).alkiot;
const valot = lue('karttavalot');
const kohdekartat = lue('kohdekartat');

test('karttavalot: tagi jokaisella paikalla, kaupunkivalolla null', () => {
  const vaarat = valot.filter((v) => (v.aihe === 'kaupungit' ? v.tagi !== null : !TAGIT.includes(v.tagi)));
  assert.deepEqual(vaarat.map((v) => `${v.id} aihe ${v.aihe} tagi ${v.tagi}`), []);
});

test('kohdekartat: kohteen ja linkin tagi, tarinapaikka merkin mukaan', () => {
  let tarinapaikkoja = 0;
  for (const kartta of kohdekartat) {
    for (const k of kartta.kohteet) {
      assert.ok(k.tagi === null || TAGIT.includes(k.tagi), `${kartta.id} ${k.nimi}: ${k.tagi}`);
      for (const l of k.linkit ?? []) assert.ok(l.tagi === null || TAGIT.includes(l.tagi), `${kartta.id} ${k.nimi} ${l.tunnus}`);
      if (k.tarinapaikka) {
        tarinapaikkoja++;
        assert.notEqual(k.tagi, null, `${kartta.id} ${k.nimi}: tarinapaikalla aina tagi`);
      }
    }
  }
  // 40 → 35: yhdistämisen vaihe A (KK 17.11.2026) poisti 13 tarinapaikkaa, joiden nostot siirtyivät kohteen merkille.
  assert.ok(tarinapaikkoja >= 35, `tarinapaikkoja ${tarinapaikkoja}`);
  const pariisi = kohdekartat.find((k) => k.id === 'pariisi');
  const bastilji = pariisi.kohteet.find((k) => k.nimi === 'Bastilji');
  assert.equal(bastilji?.tagi, 'kadonneet', 'Bastilji on kadonnut');
});

test('viisi kaupunkia: jokaisella nähtävyydellä tagi datassa, Uskonnot 12 paikkaa (SK 17.11.2026)', () => {
  const viisi = ['pariisi', 'lontoo', 'amsterdam', 'wien', 'rooma'];
  const tagittomat = []; const uskonnot = [];
  for (const kartta of kohdekartat.filter((k) => viisi.includes(k.id))) {
    for (const k of kartta.kohteet) {
      if (k.tagi == null) tagittomat.push(`${kartta.id} ${k.nimi}`);
      if (k.tagi === 'uskonnot') uskonnot.push(`${kartta.id} ${k.nimi}`);
    }
  }
  assert.deepEqual(tagittomat, []);
  assert.deepEqual(uskonnot.sort(), [
    'amsterdam Portugalilainen synagoga', 'lontoo Pyhän Paavalin katedraali', 'lontoo Westminster Abbey',
    'pariisi Notre-Dame', 'pariisi Sacré-Cœur', 'pariisi Saint-Eustache', 'pariisi Sainte-Chapelle',
    'pariisi Tour Saint-Jacques', 'rooma Pantheon', 'rooma Pietarinkirkko', 'rooma Vatikaanin palatsi', 'wien Stephansdom',
  ].sort());
});

test('maataso: tagit täyttävät kolmen paikan rajan suunnitelman verran maita', () => {
  const VIISI = new Set(['pariisi', 'lontoo', 'amsterdam', 'wien', 'rooma']);
  const maat = new Map();
  for (const v of valot) {
    if (v.aihe === 'kaupungit' || !v.maa || VIISI.has(v.kohdekartta) || VIISI.has(v.kaupunkiAvain)) continue;
    const m = maat.get(v.maa) ?? {};
    m[v.tagi] = (m[v.tagi] ?? 0) + 1;
    maat.set(v.maa, m);
  }
  const rajan = (t) => [...maat.values()].filter((m) => (m[t] ?? 0) >= 3).length;
  // TULOS-tagit 2 (origin/main 3b52d053e7): Luonto 117, Historia 96, Kulttuuri 46, Tiede 31, Skandaalit 23, Kadonneet 13.
  const odotus = { luonto: 117, historia: 96, kulttuuri: 46, tiede: 31, skandaalit: 23, kadonneet: 13 };
  for (const [t, n] of Object.entries(odotus)) {
    const nyt = rajan(t);
    assert.ok(Math.abs(nyt - n) <= Math.max(3, n * 0.1), `${t}: ${nyt} maata (suunnitelma ${n})`);
  }
});

test('maakuntaNimi: maakunnalliselle valolle nimi maakuntarajoista', () => {
  const alueet = new Map(lue('maakuntarajat').map((a) => [a.id, a.nimi]));
  const vaarat = valot.filter((v) => (v.maakunta ? v.maakuntaNimi !== (alueet.get(v.maakunta) ?? null) : v.maakuntaNimi !== null));
  assert.deepEqual(vaarat.slice(0, 5).map((v) => `${v.id} ${v.maakunta} ${v.maakuntaNimi}`), []);
  assert.ok(valot.filter((v) => v.maakuntaNimi).length > 2500, 'maakunnan nimiä');
});
