/*
 * ASEMATAULU YHDELLÄ KOMENNOLLA (omistaja 19.10.2026 klo 19.51; docs/moduulit/asemataulu.md luku 2).
 * Ajaa tools/asemataulu/asemataulu.py:n tyhjään työkansioon (--tyopuu): koodi kopioituu, tila syntyy siemenestä,
 * nykyinen.json saa osoitteen ja id:t osoitekirjasta, toinen ajo ei muuta mitään, käsin muutettu kopio siirtyy
 * _ennen-repoa/-kansioon ja --tarkista huomaa eron ennen sitä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync, existsSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const juuri = join(dirname(fileURLToPath(import.meta.url)), '..');
const komento = join(juuri, 'tools/asemataulu/asemataulu.py');
const taulu = mkdtempSync(join(tmpdir(), 'asemataulu-komento-'));
const ok = join(taulu, 'osoitekirja.md');
const url = 'https://claude.ai/artifact/Testi123abc';
const id = (n) => `local_${String(n).repeat(8)}-0000-0000-0000-000000000000`;
writeFileSync(ok, [
  '| Rooli | Session id | Kansio | Malli | Alue |', '|---|---|---|---|---|',
  `| PÄÄTOIMITTAJA | ${id(1)} | x | Opus | x |`, `| KESKUSTELUKANAVA | ${id(2)} | x | Opus | x |`,
  `| Julkaisija | ${id(3)} | x | Opus | x |`, `| Natiiviseppä | ${id(4)} | x | Opus | x |`,
  `| Postivahti | ${id(5)} | x | Sonnet | x |`, `| Asemataulu | ${id(6)} | x | Sonnet | x |`,
  '', `Asemataulu (tämän tilin taulu): ${url}`, '',
].join('\n'));

const aja = (...lisa) => spawnSync('python3', ['-I', komento, '--tyopuu', '--taulu', taulu, '--osoitekirja', ok, ...lisa], { encoding: 'utf8', cwd: juuri });

test('ensimmäinen ajo rakentaa työkansion reposta', () => {
  const r = aja();
  assert.match(r.stdout, /PÄIVITETTY\|asemataulu-julkaisu\.html/);
  assert.match(r.stdout, /PÄIVITETTY\|hoitaja\/kierros\.py/);
  assert.equal(readFileSync(join(taulu, 'asemataulu-julkaisu.html'), 'utf8'), readFileSync(join(juuri, 'tools/asemataulu/asemataulu.html'), 'utf8'));
  assert.ok(existsSync(join(taulu, 'osoitteet.md')), 'osoitteet.md siemenestä');
  assert.ok(existsSync(join(taulu, 'data/talo/junat.json')), 'data/talo siemenestä');
  const ny = JSON.parse(readFileSync(join(taulu, 'nykyinen.json'), 'utf8'));
  assert.equal(ny.taulu, url);
  assert.equal(ny.idt.paatoimittaja, id(1));
  assert.equal(ny.idt.asemataulu, id(6));
  assert.ok(existsSync(join(taulu, 'vienti/uusi-taulu-batch.json')));
  assert.match(r.stdout, /SEURAAVAKSI/);
});

test('osoitteet.md:n KÄYTÖSSÄ-rivi pitää täsmätä osoitekirjaan', () => {
  writeFileSync(join(taulu, 'osoitteet.md'), `| Tili | Osoite |\n|---|---|\n| testi (KÄYTÖSSÄ) | https://claude.ai/artifact/Toinen999 |\n`);
  assert.match(aja('--tarkista').stdout, /KÄYTÖSSÄ-rivi .* ≠ osoitekirjan taulu/);
  writeFileSync(join(taulu, 'osoitteet.md'), `| Tili | Osoite |\n|---|---|\n| testi (KÄYTÖSSÄ) | ${url} |\n`);
  assert.doesNotMatch(aja('--tarkista').stdout, /KÄYTÖSSÄ/);
});

test('toinen ajo ei päivitä mitään; käsin muutettu kopio havaitaan ja siirtyy talteen', () => {
  assert.doesNotMatch(aja().stdout, /PÄIVITETTY/);
  writeFileSync(join(taulu, 'synkka.py'), '# käsin muutettu\n');
  const t = aja('--tarkista');
  assert.equal(t.status, 1);
  assert.match(t.stdout, /synkka\.py eroaa mainista/);
  assert.equal(readFileSync(join(taulu, 'synkka.py'), 'utf8'), '# käsin muutettu\n', '--tarkista ei kirjoita');
  const r = aja();
  assert.match(r.stdout, /PÄIVITETTY\|synkka\.py \(vanha: _ennen-repoa\//);
  const talteen = readdirSync(join(taulu, '_ennen-repoa'));
  assert.equal(readFileSync(join(taulu, '_ennen-repoa', talteen[0], 'synkka.py'), 'utf8'), '# käsin muutettu\n');
});
