/*
 * Blender-tuotosten osoitteisto (Linnanrakentaja 30.9.2026, TF 1.0.61:n palikkalinna): js/dioraama/rakennukset/
 * olavinlinna/blender.json kuvaa omistajan tools/dioraama/vie-blender.sh:lla ämpäriin lataaman muuttumattoman kansion.
 * rakenna.mjs kirjoittaa siitä rakennus.json:n kuori- ja valoatlaskentät; vie-dioraama.yml kopioi kansion pakettiin.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { RAKENNUS } from '../js/dioraama/rakennukset/olavinlinna.js';

const B = JSON.parse(readFileSync(new URL('../js/dioraama/rakennukset/olavinlinna/blender.json', import.meta.url), 'utf8'));
const on = new Set(B.tiedostot.map((t) => t.polku));

test('blender.json: hash = sisältö (sama laskenta kuin vie-blender.sh), kansio muuttumaton hash-polku', () => {
  const rivit = [...B.tiedostot].sort((a, b) => (a.polku < b.polku ? -1 : 1)).map((t) => `${t.polku} ${t.sha256}\n`).join('');
  assert.equal(B.hash, createHash('sha256').update(rivit).digest('hex').slice(0, 16));
  assert.equal(B.kansio, `dioraama/${RAKENNUS.id}/blender/${B.hash}/`);
  for (const t of B.tiedostot) assert.ok(/^[0-9a-f]{64}$/.test(t.sha256) && t.tavuja > 0, t.polku);
});

test('blender.json: kuoren kaikki laatutasot ja tekstuurit sekä jokaisen kohdistettavan tilan glb ja päivä- + hämäräatlas', () => {
  for (const t of ['huippu', 'normaali', 'kevyt']) assert.ok(on.has(`ulkokuori/ulkokuori_${t}.glb`), t);
  for (const k of ['4k', '2k']) {
    for (const v of ['', '-hamara']) assert.ok(on.has(`ulkokuori/ulkokuori${v}-${k}-4x4.astcm`), `${v} ${k}`);
    assert.ok(on.has(`ulkokuori/ulkokuori-hamara-${k}.jpg`), k);
  }
  for (const tila of RAKENNUS.tilat.filter((t) => t.kohdistettava)) {
    assert.ok(on.has(`tilat/${tila.id}.glb`), `${tila.id}: leivottu glb`);
    for (const v of ['', '-hamara']) {
      for (const f of ['.jpg', '-2k.jpg', '-4x4.astcm', '-2k-4x4.astcm']) assert.ok(on.has(`valot/${tila.id}${v}${f}`), `${tila.id}${v}${f}`);
    }
  }
});

test('blender.json: ei lähdemallia eikä käyttämättömiä tiedostoja (senaatti-alkup, ulkokuori-4k.jpg)', () => {
  for (const p of on) assert.ok(!p.includes('senaatti-alkup') && p !== 'ulkokuori/ulkokuori-4k.jpg' && p !== 'ulkokuori/ulkokuori-2k.jpg', p);
});
