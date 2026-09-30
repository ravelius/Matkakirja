// tools/vie-delta.mjs: vain muuttuneet laatat, kartta js/deltasarja.js:n koodauksella.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { keraaLaatat, tiivisteet, vertaa } from '../tools/vie-delta.mjs';
import { laattaMuuttunut } from '../js/deltasarja.js';

globalThis.atob ??= (s) => Buffer.from(s, 'base64').toString('binary');

function sarja(laatat) {
  const juuri = mkdtempSync(join(tmpdir(), 'delta-'));
  for (const [avain, sisalto] of Object.entries(laatat)) {
    const [z, x, y] = avain.split('/');
    mkdirSync(join(juuri, `z${z}`, x), { recursive: true });
    writeFileSync(join(juuri, `z${z}`, x, `${y}.webp`), sisalto);
  }
  return juuri;
}

test('vain eroavat laatat viedään; muuttumattomat ohjautuvat perussarjaan', () => {
  const perus = sarja({ '0/0/0': 'a', '2/0/0': 'b', '2/1/0': 'c', '2/3/3': 'd', '2/2/1': 'e' });
  const uusi = sarja({ '0/0/0': 'A', '2/0/0': 'b', '2/1/0': 'C', '2/3/3': 'd', '2/2/1': 'e', '2/0/3': 'uusi' });
  const t = tiivisteet(keraaLaatat([perus]));
  const { delta, vietavat, tilasto } = vertaa(keraaLaatat([uusi]), t, 'P', (z) => 2 ** z, 0.5);
  assert.equal(delta.perus, 'P');
  assert.equal(delta.muuttuneet[0], null, 'taso 0: 1/1 muuttui → koko taso');
  assert.deepEqual(tilasto[2], { laattoja: 5, muuttuneita: 2 });
  assert.deepEqual(vietavat.map((l) => `${l.taso}/${l.sarake}/${l.rivi}`).sort(), ['0/0/0', '2/0/3', '2/1/0']);
  // Asiakkaan tulkinta samasta kartasta.
  assert.equal(laattaMuuttunut(delta, 2, 1, 0, 4), true);
  assert.equal(laattaMuuttunut(delta, 2, 0, 3, 4), true, 'perussarjasta puuttuva laatta on muuttunut');
  assert.equal(laattaMuuttunut(delta, 2, 0, 0, 4), false);
  assert.equal(laattaMuuttunut(delta, 2, 3, 3, 4), false, 'suurimman indeksin yli = muuttumaton');
  assert.equal(laattaMuuttunut(delta, 0, 0, 0, 1), true);
});

test('sama laatta kahdesta juuresta on virhe (shardien päällekkäisyys)', () => {
  const a = sarja({ '1/0/0': 'x' });
  const b = sarja({ '1/0/0': 'y' });
  assert.throws(() => keraaLaatat([a, b]), /sama laatta kahdesti/);
});
