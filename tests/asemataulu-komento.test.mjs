/*
 * ASEMATAULU YHDELLÄ KOMENNOLLA (omistaja 19.10.2026 klo 19.51; docs/moduulit/asemataulu.md luku 2).
 * Ajaa tools/asemataulu/asemataulu.py:n tyhjään työkansioon (--tyopuu): koodi kopioituu, tila syntyy siemenestä,
 * nykyinen.json saa osoitteen ja id:t osoitekirjasta, toinen ajo ei muuta mitään, käsin muutettu kopio siirtyy
 * _ennen-repoa/-kansioon ja --tarkista huomaa eron ennen sitä. KIERROS (21.10.2026): kaikki tools/asemataulu/:n koodi on
 * kopiolistalla, työkansion asemataulu.py --kierros (synkka.py joka kierroksella) palauttaa koodin ja ohjeen mainista ja
 * päivittää nykyinen.json:n osoitekirjasta, ja on hiljainen, kun mikään ei muutu.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const juuri = join(dirname(fileURLToPath(import.meta.url)), '..');
const komento = join(juuri, 'tools/asemataulu/asemataulu.py');
const taulu = mkdtempSync(join(tmpdir(), 'asemataulu-komento-'));
const ok = join(mkdtempSync(join(tmpdir(), 'asemataulu-ok-')), 'osoitekirja.md');
const url = 'https://claude.ai/artifact/Testi123abc';
const id = (n) => `local_${String(n).repeat(8)}-0000-0000-0000-000000000000`;
const osoitekirja = (asemaId) => [
  '| Rooli | Session id | Kansio | Malli | Alue |', '|---|---|---|---|---|',
  `| PÄÄTOIMITTAJA | ${id(1)} | x | Opus | x |`, `| KESKUSTELUKANAVA | ${id(2)} | x | Opus | x |`,
  `| Julkaisija | ${id(3)} | x | Opus | x |`, `| Natiiviseppä | ${id(4)} | x | Opus | x |`,
  `| Postivahti | ${id(5)} | x | Sonnet | x |`, ...(asemaId ? [`| Asemataulu | ${asemaId} | x | Sonnet | x |`] : []),
  '', `Asemataulu (tämän tilin taulu): ${url}`, '',
].join('\n');
writeFileSync(ok, osoitekirja(id(6)));

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

const lahdeKansio = join(juuri, 'tools/asemataulu');
const koodiTiedostot = (k, ala = '') => readdirSync(join(k, ala)).flatMap((n) => {
  const p = ala ? `${ala}/${n}` : n;
  if (['data', '__pycache__', 'osoitteet.md'].includes(n)) return [];
  return statSync(join(k, p)).isDirectory() ? koodiTiedostot(k, p) : [p];
});
const kierros = (...lisa) => spawnSync('python3', ['-I', join(taulu, 'asemataulu.py'), '--kierros', '--osoitekirja', ok, ...lisa], { encoding: 'utf8' });

test('kaikki tools/asemataulu/:n koodi ja ohje on työkansiossa (myös tyolistavahti.py ja asemataulu.py)', () => {
  const puuttuu = koodiTiedostot(lahdeKansio).map((p) => (p === 'asemataulu.html' ? 'asemataulu-julkaisu.html' : p))
    .filter((p) => !existsSync(join(taulu, p)));
  assert.deepEqual(puuttuu, [], 'lisää tiedosto asemataulu.py:n KOODI-listaan');
});

test('kierros: käsin muutettu koodi ja ohje palautuvat mainista, ohjeesta oma rivi, toinen kierros hiljainen', () => {
  const ny = JSON.parse(readFileSync(join(taulu, 'nykyinen.json'), 'utf8'));
  assert.deepEqual(ny.lahde, { repo: juuri, tyopuu: true }, 'kierros tietää lähteen nykyinen.json:sta');
  writeFileSync(join(taulu, 'synkka.py'), '# käsin muutettu\n');
  writeFileSync(join(taulu, 'ASEMATAULU-ROOLI.md'), '# vanha ohje\n');
  const r = kierros();
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /PÄIVITETTY\|synkka\.py \(vanha: _ennen-repoa\//);
  assert.match(r.stdout, /OHJE PÄIVITETTY\|ASEMATAULU-ROOLI\.md\|lue .* uudelleen/);
  assert.doesNotMatch(r.stdout, /SEURAAVAKSI|TARKISTIN/, 'kierros ei rakenna batchia eikä aja tarkistinta (synkka ajaa)');
  assert.equal(readFileSync(join(taulu, 'synkka.py'), 'utf8'), readFileSync(join(lahdeKansio, 'synkka.py'), 'utf8'));
  assert.equal(kierros().stdout, '', 'mikään ei muuttunut → ei rivejä');
});

test('kierros: vaihtunut id päivittää nykyinen.json:n, puutteellinen osoitekirja ei korvaa sitä', () => {
  writeFileSync(ok, osoitekirja(id(7)));
  let r = kierros();
  assert.match(r.stdout, /NYKYINEN MUUTTUI\|asemataulu\|/);
  assert.equal(JSON.parse(readFileSync(join(taulu, 'nykyinen.json'), 'utf8')).idt.asemataulu, id(7));
  writeFileSync(ok, osoitekirja(null));
  r = kierros();
  assert.equal(r.status, 1);
  assert.match(r.stdout, /PUUTE\|osoitekirjasta puuttuu rooli Asemataulu/);
  assert.equal(JSON.parse(readFileSync(join(taulu, 'nykyinen.json'), 'utf8')).idt.asemataulu, id(7), 'toimiva tiedosto säilyy');
  writeFileSync(ok, osoitekirja(id(6)));
});

test('synkka.py ajaa kierroksen ennen vientiä vain oikeassa työkansiossa', () => {
  writeFileSync(join(taulu, 'ASEMATAULU-ROOLI.md'), '# vanha ohje\n');
  const lista = join(taulu, 'lista-tyhja');
  mkdirSync(lista, { recursive: true });
  const r = spawnSync('python3', ['-I', join(taulu, 'synkka.py'), '--lista', lista, '--ulos', join(taulu, 'k.json')], { encoding: 'utf8' });
  assert.match(r.stdout, /OHJE PÄIVITETTY\|ASEMATAULU-ROOLI\.md/, r.stdout + r.stderr);
  assert.equal(readFileSync(join(taulu, 'ASEMATAULU-ROOLI.md'), 'utf8'), readFileSync(join(lahdeKansio, 'ASEMATAULU-ROOLI.md'), 'utf8'));
  const ilman = mkdtempSync(join(tmpdir(), 'asemataulu-ilman-'));
  for (const n of ['synkka.py', 'tarkista-junat.py', 'tyolistavahti.py']) writeFileSync(join(ilman, n), readFileSync(join(lahdeKansio, n)));
  mkdirSync(join(ilman, 'lista'));
  const r2 = spawnSync('python3', ['-I', join(ilman, 'synkka.py'), '--lista', join(ilman, 'lista'), '--ulos', join(ilman, 'k.json')], { encoding: 'utf8' });
  assert.equal(r2.status, 0, r2.stderr);
  assert.doesNotMatch(r2.stdout, /PÄIVITETTY|PUUTE/, 'ilman nykyinen.json:ia ei päivitetä');
});
