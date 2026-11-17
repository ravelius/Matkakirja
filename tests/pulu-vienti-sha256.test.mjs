/*
 * Pulun viennin tarkistussummat (KK 17.11.2026): jokaisen pulu-esigenerointi/**\/vienti/**\/SHA256SUMS-tiedoston rivin
 * summan on täsmättävä tiedostoon. Kaatuu, jos JSONia muutetaan päivittämättä summaa (kuten 5dd527ea3d: 8 maata, 16.11.).
 * Korjaus: `shasum -a 256 <tiedosto>` ja rivi SHA256SUMS:iin samassa commitissa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', 'pulu-esigenerointi');

function summatiedostot(kansio, osa = false) {
  const tulos = [];
  for (const nimi of readdirSync(kansio)) {
    const polku = join(kansio, nimi);
    if (statSync(polku).isDirectory()) tulos.push(...summatiedostot(polku, osa || nimi === 'vienti'));
    else if (osa && nimi === 'SHA256SUMS') tulos.push(polku);
  }
  return tulos;
}

const tiedostot = existsSync(JUURI) ? summatiedostot(JUURI) : [];

test('Pulun viennissä on vähintään yksi SHA256SUMS', () => {
  assert.ok(tiedostot.length > 0, 'pulu-esigenerointi/**/vienti/**/SHA256SUMS puuttuu');
});

for (const sums of tiedostot) {
  test(`SHA256SUMS täsmää: ${sums.slice(JUURI.length + 1)}`, () => {
    const kansio = dirname(sums);
    const virheet = [];
    let rivit = 0;
    for (const rivi of readFileSync(sums, 'utf8').split('\n')) {
      if (!rivi.trim()) continue;
      const m = /^([0-9a-f]{64}) [ *](.+)$/.exec(rivi);
      assert.ok(m, `rivi ei ole shasum-muotoa: ${rivi}`);
      rivit++;
      const polku = join(kansio, m[2]);
      if (!existsSync(polku)) { virheet.push(`${m[2]}: tiedosto puuttuu`); continue; }
      const summa = createHash('sha256').update(readFileSync(polku)).digest('hex');
      if (summa !== m[1]) virheet.push(`${m[2]}: summa ${summa.slice(0, 12)}…, SHA256SUMS ${m[1].slice(0, 12)}…`);
    }
    assert.ok(rivit > 0, 'tyhjä SHA256SUMS');
    assert.deepEqual(virheet, [], 'päivitä summa samassa commitissa (shasum -a 256)');
  });
}
