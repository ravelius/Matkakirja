import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

import { R2_JUURI, kohtaamiskuvat } from '../js/kohtaamiskuvat-data.js';

test('kohtaamiskuvagalleria käyttää vain R2-mediaa', async () => {
  assert.match(R2_JUURI, /^https:\/\/[^/]+\.r2\.dev\/kohtaamiset$/);
  for (const kohtaaminen of kohtaamiskuvat) {
    assert.match(kohtaaminen.tiedosto, /^kasvo-[a-z0-9-]+\.jpg$/);
    await assert.rejects(stat(new URL(`../${kohtaaminen.tiedosto}`, import.meta.url)));
  }
});

test('jokaisella kohtaamiskuvalla on kaupungin lisäksi tilanteen kuvateksti', () => {
  assert.ok(kohtaamiskuvat.length > 0);
  for (const kohtaaminen of kohtaamiskuvat) {
    assert.ok(kohtaaminen.kaupunki);
    assert.ok(kohtaaminen.maa);
    assert.ok(kohtaaminen.hahmo);
    assert.ok(kohtaaminen.kuvateksti.length >= 60);
    assert.ok(kohtaaminen.hetki.length >= 40);
    assert.ok(kohtaaminen.vihje.length >= 40);
  }
});

test('galleriasivu kytkee katalogin ja R2-virheen varanäkymän', async () => {
  const [html, selainkoodi] = await Promise.all([
    readFile(new URL('../kohtaamiskuvat.html', import.meta.url), 'utf8'),
    readFile(new URL('../js/kohtaamiskuvat.js', import.meta.url), 'utf8'),
  ]);
  assert.match(html, /id="galleria"/);
  assert.match(html, /js\/kohtaamiskuvat\.js/);
  assert.match(selainkoodi, /R2_JUURI/);
  assert.match(selainkoodi, /addEventListener\('error'/);
});
