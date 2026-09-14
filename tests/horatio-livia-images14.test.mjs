import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';

const packet = JSON.parse(readFileSync(new URL('./fixtures/horatio-livia-images14-20260914.json', import.meta.url)));
const sha = (text) => createHash('sha256').update(text).digest('hex');
const slot = (pack, path) => path.replace(/\[(\d+)\]/g, '.$1').split('.').reduce((value, key) => value?.[key], pack);

test('tarinakuvaerä sisältää täsmälleen 14 eri olemassa olevan kuvan vaihtoa', () => {
  assert.equal(packet.items.length, 14);
  assert.equal(new Set(packet.items.map(i => i.id)).size, 14);
  assert.equal(new Set(packet.items.map(i => i.replacement.osoite)).size, 14);
  assert.deepEqual([...new Set(packet.items.map(i => i.city))].sort(),
    ['amsterdam', 'bergen', 'bukarest', 'oslo', 'pariisi', 'varsova']);
});

for (const item of packet.items) {
  test(`${item.id}: uusi kuva ja kuvatekstit vastaavat toimitusta sekä nykyistä tarinaa`, () => {
    const pack = FOKUSVIRRAT[item.city];
    const image = slot(pack, item.slot);
    assert.deepEqual(image, item.replacement);
    assert.notEqual(image.osoite, item.oldUrl);
    assert.match(image.osoite, /^https:\/\/media\.matkakirja\.app\/matkakirja\/.+-r20260914-tarina-v1\.jpg$/);
    const raw = item.speaker === 'horatio' ? pack.matkakirja.teksti : pack.pollo.kommentti;
    assert.equal(sha(Array.isArray(raw) ? raw[0] : raw), item.narrativeSha256,
      'kuva ei saa vaihtua eri tarinan rinnalle');
    assert.ok(image.lyhyt.length > 0 && image.lyhyt.length <= 110);
    assert.ok(image.selite.length > 0 && image.selite.length <= 300);
    assert.doesNotMatch(image.lyhyt, /https?:|Matkakirjan havainnekuva/);
    assert.equal(image.lahde, 'Matkakirjan havainnekuva');
    assert.ok(image.lahteet.length >= 1);
    assert.match(item.imageSha256, /^[0-9a-f]{64}$/);
    assert.ok(item.bytes > 0);
  });
}

test('viiden odottavan kaupungin vanhaan tarinaan ei tule tulevan tarinan kuvia', () => {
  for (const city of ['sisilia', 'islanti', 'alpit', 'lappi', 'tromssa']) {
    assert.equal(packet.items.some(i => i.city === city), false);
    assert.doesNotMatch(JSON.stringify(FOKUSVIRRAT[city]), /r20260914-tarina-v1/);
  }
});
