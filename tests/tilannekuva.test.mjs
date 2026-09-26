// Sisältöpaketin tilannekuva buildiin (tools/vienti/tilannekuva.mjs, Siirtoseppä 26.9.2026).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { kokoaTilannekuva, hakemistonTiiviste, TILANNEKUVAN_TIEDOSTOT } from '../tools/vienti/tilannekuva.mjs';
import { kokoaHakemisto, paketinTiiviste } from '../tools/vienti/julkaise-sisalto.mjs';

const sha = (b) => createHash('sha256').update(b).digest('hex');
const J = 'https://esim/';

function paketti() {
  const tiedostot = new Map([...TILANNEKUVAN_TIEDOSTOT, 'kokoelmat/kaupunkilehdet.json', 'manifest.json']
    .map((p, i) => [p, `{"n":${i},"ä":"${p}"}\n`]));
  const h = kokoaHakemisto(tiedostot);
  const osoitin = { versio: 7, polku: 'sisalto/1/v7/', sha256: paketinTiiviste(tiedostot), skeemaversio: '1.48',
    julkaistu: '2026-09-26T10:30:00.000Z',
    hakemisto: { polku: 'hakemisto.json', sha256: h.sha256, tavuja: h.tavuja } };
  const ampari = new Map([[`${J}sisalto/1/uusin.json`, JSON.stringify(osoitin)], [`${J}sisalto/1/v7/hakemisto.json`, h.teksti],
    ...[...tiedostot].map(([p, t]) => [`${J}sisalto/1/v7/${p}`, t])]);
  const hae = async (url) => { if (!ampari.has(url)) throw new Error(`404 ${url}`); return Buffer.from(ampari.get(url)); };
  return { tiedostot, osoitin, ampari, hae };
}

test('tilannekuva: vain aloitusdata, sisällön mukaan avainnettuna, tiivisteet tarkistettuina', async () => {
  const { tiedostot, hae } = paketti();
  const t = await kokoaTilannekuva({ juuri: J, hae });
  assert.equal(t.osoitin.versio, 7);
  for (const p of TILANNEKUVAN_TIEDOSTOT) assert.ok(t.tiedostot.has(`tiedostot/${sha(tiedostot.get(p))}`), p);
  assert.ok(!t.tiedostot.has(`tiedostot/${sha(tiedostot.get('kokoelmat/kaupunkilehdet.json'))}`), 'ei koko pakettia');
  const kuvaus = JSON.parse(t.tiedostot.get('tilannekuva.json'));
  assert.deepEqual(kuvaus.tiedostot, TILANNEKUVAN_TIEDOSTOT);
  assert.ok(t.tiedostot.has('osoitin.json') && t.tiedostot.has('hakemisto.json'));
  // Natiivin varareitti (7eb88111) lukee osoittimen julkaistu-kentän: tilannekuva ≤ 14 vrk vanha.
  assert.equal(JSON.parse(t.tiedostot.get('osoitin.json')).julkaistu, '2026-09-26T10:30:00.000Z');
});

test('tilannekuva: sama tiivistesääntö kuin julkaisussa, ja väärä tiedosto hylätään', async () => {
  const { tiedostot, osoitin, ampari, hae } = paketti();
  const rivit = [...tiedostot].map(([polku, t]) => ({ polku, sha256: sha(t) }));
  assert.equal(hakemistonTiiviste(rivit), osoitin.sha256);
  ampari.set(`${J}sisalto/1/v7/kokoelmat/reitit.json`, '{"rikki":true}\n');
  await assert.rejects(kokoaTilannekuva({ juuri: J, hae }), /reitit\.json: sha256/);
  ampari.set(`${J}sisalto/1/uusin.json`, JSON.stringify({ ...osoitin, hakemisto: undefined }));
  await assert.rejects(kokoaTilannekuva({ juuri: J, hae }), /ei hakemistoa/);
});

test('tilannekuvan tiedostot ovat paketissa (vienti)', async () => {
  const { kokoaVienti } = await import('../tools/vienti/vie-sisalto.mjs');
  const { tiedostot } = await kokoaVienti();
  for (const p of TILANNEKUVAN_TIEDOSTOT) assert.ok(tiedostot.has(p), `${p} puuttuu paketista`);
});
