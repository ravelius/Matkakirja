/*
 * Tiedostokokojen vahti (omistaja 20.10.2026 15.23, Raamattu 7.22): tools/tarkista-tiedostokoot.sh mittaa roolien uusimmat
 * aloitus-, luovutus- ja tilatiedostot sekä MEMORY.md:n. Testi rakentaa väliaikaisen repon ja muistikansion.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { uusimmat, tilalinkit, RAJA_TIEDOSTO, RAJA_MUISTI } from '../tools/tarkista-tiedostokoot.mjs';

const SKRIPTI = fileURLToPath(new URL('../tools/tarkista-tiedostokoot.sh', import.meta.url));
const juuri = mkdtempSync(join(tmpdir(), 'tiedostokoot-'));
test.after(() => rmSync(juuri, { recursive: true, force: true }));

function rakenna(nimi, { repo = {}, muisti = {} }) {
  const r = join(juuri, nimi, 'repo'), m = join(juuri, nimi, 'muisti');
  mkdirSync(join(r, 'docs/aloitusviestit'), { recursive: true });
  mkdirSync(join(r, 'docs/raportit'), { recursive: true });
  mkdirSync(m, { recursive: true });
  for (const [p, t] of Object.entries(repo)) writeFileSync(join(r, p), t);
  for (const [p, t] of Object.entries(muisti)) writeFileSync(join(m, p), t);
  return spawnSync('sh', [SKRIPTI], { encoding: 'utf8', env: { ...process.env, TIEDOSTOKOOT_REPO: r, TIEDOSTOKOOT_MUISTI: m } });
}

const iso = (t) => 'x'.repeat(t + 1);
const MUISTI = '## Ydin\n- [A](a.md) — lyhyt\n## Rooli-tilaraportit\n- [PT](fable-tila-20261020.md) — tila\n';

test('uusin luovutus per rooli: päivämäärä ratkaisee, vanha iso tiedosto ei hälytä', () => {
  const m = uusimmat([
    'viesti-fable-luovutus-20261019-yo.md', 'viesti-fable-luovutus-20261020-1238.md', 'viesti-3d-selvittaja-luovutus-20261001.md',
  ], /^viesti-(.+?)-luovutus-(.*)\.md$/);
  assert.equal(m.get('fable'), 'viesti-fable-luovutus-20261020-1238.md');
  assert.equal(m.get('3d-selvittaja'), 'viesti-3d-selvittaja-luovutus-20261001.md');
  const a = uusimmat(['viesti-fable-aloitus-20261001.md', 'viesti-fable-aloitus.md'], /^viesti-(.+?)-aloitus(?:-(.*))?\.md$/);
  assert.equal(a.get('fable'), 'viesti-fable-aloitus.md');
});

test('tilalinkit vain Rooli-tilaraportit-osiosta', () => {
  assert.deepEqual(tilalinkit(MUISTI), ['fable-tila-20261020.md']);
});

test('kaikki rajojen sisällä → OK, koodi 0', () => {
  const r = rakenna('ok', {
    repo: { 'docs/aloitusviestit/postivahti.md': 'a', 'docs/raportit/viesti-fable-luovutus-20261020-1238.md': 'b' },
    muisti: { 'MEMORY.md': MUISTI, 'fable-tila-20261020.md': 'c' },
  });
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.stdout.trim(), 'OK');
});

test('ylitykset: uusin luovutus, aloitus, tila, MEMORY.md ja pitkä rivi; vanha luovutus ei', () => {
  const pitka = '- [B](b.md) — ' + 'ä'.repeat(100);
  const r = rakenna('yli', {
    repo: {
      'docs/aloitusviestit/keskustelukanava.md': iso(RAJA_TIEDOSTO),
      'docs/raportit/viesti-julkaisija-aloitus.md': 'ok',
      'docs/raportit/viesti-fable-luovutus-20261019-yo.md': iso(RAJA_TIEDOSTO),
      'docs/raportit/viesti-fable-luovutus-20261020-1238.md': iso(RAJA_TIEDOSTO),
      'docs/raportit/viesti-julkaisija-luovutus-20261020-0900.md': 'ok',
    },
    muisti: {
      'MEMORY.md': MUISTI + pitka + '\n' + '#'.repeat(RAJA_MUISTI),
      'fable-tila-20261020.md': iso(RAJA_TIEDOSTO),
    },
  });
  assert.equal(r.status, 1, r.stderr);
  const rivit = r.stdout.trim().split('\n');
  assert.ok(rivit.includes('YLITYS|keskustelukanava|docs/aloitusviestit/keskustelukanava.md|15,0 kt > 15 kt'), r.stdout);
  assert.ok(rivit.includes('YLITYS|fable|docs/raportit/viesti-fable-luovutus-20261020-1238.md|15,0 kt > 15 kt'), r.stdout);
  assert.ok(!rivit.some((x) => x.includes('20261019-yo')), r.stdout);
  assert.ok(rivit.includes('YLITYS|fable|muisti/fable-tila-20261020.md|15,0 kt > 15 kt'), r.stdout);
  assert.ok(rivit.some((x) => x.startsWith('YLITYS|muisti|muisti/MEMORY.md|')), r.stdout);
  assert.ok(rivit.includes('YLITYS|muisti|muisti/MEMORY.md:5|114 merkkiä > 100'), r.stdout);
  assert.ok(rivit.every((x) => x.split('|').length === 4), r.stdout);
});
