/*
 * Natiivin asetukset (tools/vienti/asetukset.mjs, skeema 1.59): data/asetukset.json
 * viedään tiedostona kokoelmat/asetukset.json ja validoidaan avainlistaa
 * (tools/vienti/asetusavaimet.json) vasten.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { lueAsetukset, lueAvaimet, validoiAsetukset } from '../tools/vienti/asetukset.mjs';
import { JUURI, kokoaVienti } from '../tools/vienti/vie-sisalto.mjs';
import { johdaMajor2 } from '../tools/vienti/major2.mjs';
import { tarkistaMajor2, tarkistaPaketti } from '../tools/vienti/julkaise-sisalto.mjs';

const avaimet = lueAvaimet();
const sha = (s) => createHash('sha256').update(s).digest('hex');

test('oletusasetukset { skeema 1, versio "1" } kelpaavat ilman varoituksia', () => {
  const t = validoiAsetukset({ skeema: 1, versio: '1' }, avaimet);
  assert.deepEqual(t, { virheet: [], varoitukset: [] });
});

test('repon data/asetukset.json on kelvollinen', () => {
  const t = validoiAsetukset(JSON.parse(lueAsetukset(JUURI)), avaimet);
  assert.deepEqual(t.virheet, []);
});

test('virheet: ei objekti, skeema 2, skeema puuttuu, versio ei teksti, ryhmä ei objekti', () => {
  assert.ok(validoiAsetukset([], avaimet).virheet.length);
  assert.ok(validoiAsetukset(null, avaimet).virheet.length);
  assert.ok(validoiAsetukset({ skeema: 2, versio: '1' }, avaimet).virheet.length);
  assert.ok(validoiAsetukset({ skeema: 1.5 }, avaimet).virheet.length);
  assert.ok(validoiAsetukset({ versio: '1' }, avaimet).virheet.length);
  assert.ok(validoiAsetukset({ skeema: 1, versio: 1 }, avaimet).virheet.length);
  assert.ok(validoiAsetukset({ skeema: 1, aanet: 5 }, avaimet).virheet.length);
});

test('virhe: taulukko- ja null-lehti', () => {
  assert.ok(validoiAsetukset({ skeema: 1, aanet: { MaisemanVoima: [0.1] } }, avaimet).virheet.length);
  assert.ok(validoiAsetukset({ skeema: 1, aanet: { MaisemanVoima: null } }, avaimet).virheet.length);
});

test('virhe: kokonais-avain 1.5, väärä luku-, totuus- ja tekstityyppi', () => {
  assert.ok(validoiAsetukset({ skeema: 1, aanet: { HaivytysMs: 1.5 } }, avaimet).virheet.length);
  assert.deepEqual(validoiAsetukset({ skeema: 1, aanet: { HaivytysMs: 400 } }, avaimet).virheet, []);
  assert.ok(validoiAsetukset({ skeema: 1, aanet: { MaisemanVoima: 'kova' } }, avaimet).virheet.length);
  assert.deepEqual(validoiAsetukset({ skeema: 1, aanet: { MaisemanVoima: 0.14 } }, avaimet).virheet, []);
  assert.ok(validoiAsetukset({ skeema: 1, pelit: { laudat: { majatalo: { Nimi: 3 } } } }, avaimet).virheet.length);
  const totuus = Object.entries(avaimet).find(([, t]) => t === 'totuus');
  if (totuus) {
    const [ryhma, ...loput] = totuus[0].split('.');
    const aseta = (arvo) => ({ skeema: 1, [ryhma]: loput.reduceRight((a, k) => ({ [k]: a }), arvo) });
    assert.ok(validoiAsetukset(aseta('kyllä'), avaimet).virheet.length);
  }
});

test('varoitus (ei virhe): tuntematon avain ja tuntematon juuriryhmä', () => {
  const a = validoiAsetukset({ skeema: 1, aanet: { OnTuntematon: 1 } }, avaimet);
  assert.deepEqual(a.virheet, []);
  assert.equal(a.varoitukset.length, 1);
  const b = validoiAsetukset({ skeema: 1, outo: { x: 1 } }, avaimet);
  assert.deepEqual(b.virheet, []);
  assert.ok(b.varoitukset.length >= 1);
});

test("'*'-kuvio: pelit.laudat.majatalo.Nimi on teksti, eikä varoita", () => {
  const t = validoiAsetukset({ skeema: 1, pelit: { laudat: { majatalo: { Nimi: 'Majatalo' } } } }, avaimet);
  assert.deepEqual(t, { virheet: [], varoitukset: [] });
});

test('vienti: kokoelmat/asetukset.json ja manifest.asetukset vastaavat toisiaan (1.x ja 2.0)', async () => {
  const { tiedostot, manifest } = await kokoaVienti();
  const teksti = tiedostot.get('kokoelmat/asetukset.json');
  assert.ok(teksti, 'asetukset.json puuttuu paketista');
  const lahde = JSON.parse(readFileSync(join(JUURI, 'data/asetukset.json'), 'utf8'));
  assert.equal(teksti, `${JSON.stringify(lahde)}\n`);
  assert.deepEqual(manifest.asetukset, { tiedosto: 'kokoelmat/asetukset.json', sha256: sha(teksti), tavuja: Buffer.byteLength(teksti) });
  assert.ok(!manifest.kokoelmat.some((k) => k.nimi === 'asetukset'), 'ei kokoelmaksi');
  assert.ok(!('alkiot' in JSON.parse(teksti)));
  assert.deepEqual(tarkistaPaketti(new Map([...tiedostot].filter(([p]) => !p.startsWith('moduulit/')))), []);

  const t2 = johdaMajor2(tiedostot);
  const m2 = JSON.parse(t2.get('manifest.json'));
  assert.equal(t2.get('kokoelmat/asetukset.json'), teksti);
  assert.equal(m2.asetukset.sha256, sha(teksti));
  assert.deepEqual(tarkistaMajor2(t2), []);
});
