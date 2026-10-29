// Ämpäriluettelo (Julkaisija 28.10.2026, R2-kulut): koot ja olemassaolo paikallisesta luettelosta HEAD-pyyntöjen sijaan.
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import {
  avainOsoitteesta, jasennaRivi, luettelonEtuliitteet, luettelonKoot, luettelonPolku, osoitteidenKoot,
} from '../tools/vienti/ampariluettelo.mjs';

const kansio = mkdtempSync(join(tmpdir(), 'ampariluettelo-'));
const polku = join(kansio, 'amparin-luettelo.tsv');
writeFileSync(polku, [
  'julisteet/pallo/kerma/v1/FIN/5/17/9.webp\t1234\tabc',
  'kuvat/a b.jpg\t99\t"def"',
  'pieni/kuvat/x.jpg\t50\t-',
  'None',
  '',
].join('\n'));
writeFileSync(join(kansio, 'amparin-luettelo.lisays.tsv'), 'pieni/kuvat/uusi.png\t7\t-\n');

test('avain julkisesta osoitteesta: kysely pois, %-koodaus auki, vieras osoite null', () => {
  assert.equal(avainOsoitteesta('https://media.matkakirja.app/kuvat/a%20b.jpg?v=2'), 'kuvat/a b.jpg');
  assert.equal(avainOsoitteesta('https://example.com/kuvat/a.jpg'), null);
  assert.equal(avainOsoitteesta(undefined), null);
});

test('rivin jäsennys hyväksyy aws:n text-tulosteen ja hylkää None-rivin', () => {
  assert.deepEqual(jasennaRivi('a/b.jpg\t12\t"e"'), ['a/b.jpg', 12]);
  assert.equal(jasennaRivi('None'), null);
  assert.equal(jasennaRivi(''), null);
});

test('koot luettelosta ja lisäyksistä; puuttuva avain ei ole tuloksessa', async () => {
  const k = await luettelonKoot(['kuvat/a b.jpg', 'pieni/kuvat/uusi.png', 'ei/ole.jpg'], { polku });
  assert.equal(k.get('kuvat/a b.jpg'), 99);
  assert.equal(k.get('pieni/kuvat/uusi.png'), 7);
  assert.equal(k.has('ei/ole.jpg'), false);
});

test('osoitteiden koot ja etuliitehaku', async () => {
  const u = 'https://media.matkakirja.app/julisteet/pallo/kerma/v1/FIN/5/17/9.webp';
  const k = await osoitteidenKoot([u, 'https://media.matkakirja.app/ei/ole.jpg', 'https://muu.example/x'], { polku });
  assert.deepEqual([...k], [[u, 1234]]);
  const e = await luettelonEtuliitteet(['pieni/'], { polku });
  assert.deepEqual([...e.keys()].sort(), ['pieni/kuvat/uusi.png', 'pieni/kuvat/x.jpg']);
});

test('ilman luetteloa null (työkalu käyttää HEAD:ia kuten ennen); AMPARI_LUETTELO=pois ohittaa', async () => {
  assert.equal(luettelonPolku(join(kansio, 'ei-ole.tsv')), null);
  assert.equal(luettelonPolku('pois'), null);
  assert.equal(await luettelonKoot(['x'], { polku: null }), null);
  assert.equal(luettelonPolku(polku), polku);
});

test('mediakuvat.mjs mittaa luettelossa olevat ilman verkkoa', async () => {
  const { paivita, lue } = await import('../tools/vienti/mediakuvat.mjs');
  const tiedosto = join(kansio, 'mediakuvat.json');
  writeFileSync(tiedosto, JSON.stringify({ tiedostot: {} }));
  const ehdokkaat = { FIN: [['https://media.matkakirja.app/kuvat/a b.jpg', 1]] };
  const r = await paivita({ ehdokkaat, ulos: join(kansio, 'pienet'), tiedosto, luettelo: polku });
  assert.equal(r.mitattu, 1);
  assert.deepEqual(lue(tiedosto).tiedostot['kuvat/a b.jpg'], [99, null]);
});
