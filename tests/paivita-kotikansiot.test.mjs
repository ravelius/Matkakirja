/*
 * tools/paivita-kotikansiot.sh --aja --uusi-haara toimii, kun
 *  1) seurattu .claude/settings.local.json on muutettu paikallisesti ja main on muuttanut samaa tiedostoa,
 *  2) kansiossa on seuraamattomia tiedostoja, jotka mainissa ovat seurattuja.
 * Testi ajaa skriptin väliaikaisilla repoilla (polut korvataan), ei oikeilla kotikansioilla.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const juuri = join(dirname(fileURLToPath(import.meta.url)), '..');
const sh = (cwd, ...a) => execFileSync(a[0], a.slice(1), { cwd, encoding: 'utf8' });
const git = (cwd, ...a) => sh(cwd, 'git', '-c', 'user.email=t@t', '-c', 'user.name=t', ...a);
const zshOlemassa = (() => { try { execFileSync('zsh', ['-c', 'true']); return true; } catch { return false; } })();

test('päivitys onnistuu muutetulla asetustiedostolla ja seuraamattomilla tiedostoilla', { skip: !zshOlemassa }, () => {
  const t = mkdtempSync(join(tmpdir(), 'kotikansio-'));
  git(t, 'init', '-q', '--bare', 'o.git');
  git(t, 'clone', '-q', 'o.git', 'Matkakirja-a');
  const a = join(t, 'Matkakirja-a');
  mkdirSync(join(a, '.claude'));
  writeFileSync(join(a, '.claude/settings.local.json'), 'v1\n');
  writeFileSync(join(a, 'f.txt'), 'base\n');
  git(a, 'add', '-Af'); git(a, 'commit', '-qm', 'base'); git(a, 'branch', '-M', 'main'); git(a, 'push', '-q', 'origin', 'main');
  git(a, 'switch', '-q', '-c', 'tyo'); writeFileSync(join(a, 'oma.txt'), 'oma\n'); git(a, 'add', '-Af'); git(a, 'commit', '-qm', 'oma');
  git(t, 'clone', '-q', '-b', 'main', 'o.git', 'b');
  const b = join(t, 'b');
  writeFileSync(join(b, '.claude/settings.local.json'), 'v2 main\n');
  writeFileSync(join(b, 'sama.txt'), 'sama\n'); writeFileSync(join(b, 'eri.txt'), 'main\n');
  mkdirSync(join(b, 'd')); writeFileSync(join(b, 'd/x.txt'), 'main-x\n');
  git(b, 'add', '-Af'); git(b, 'commit', '-qm', 'main'); git(b, 'push', '-q', 'origin', 'main');
  // paikallinen tila: asetustiedosto (myös tyhjä rivi lopussa ja ei-rivinvaihtoa), seuraamattomat
  const asetus = Buffer.from('lokaali\n\nä\x00loppu');
  writeFileSync(join(a, '.claude/settings.local.json'), asetus);
  writeFileSync(join(a, 'sama.txt'), 'sama\n'); writeFileSync(join(a, 'eri.txt'), 'oma\n');
  mkdirSync(join(a, 'd')); writeFileSync(join(a, 'd/x.txt'), 'oma-x\n');

  const koodi = readFileSync(join(juuri, 'tools/paivita-kotikansiot.sh'), 'utf8')
    .replaceAll('/Users/Shared/Claude/', t + '/');
  writeFileSync(join(t, 'p.sh'), koodi);
  const kuiva = sh(t, 'zsh', 'p.sh', '--uusi-haara');
  assert.match(kuiva, /PÄIVITETTÄISIIN\|Matkakirja-a\|.*seuraamattomia siirretään arkistoon: 2.*identtisiä seuraamattomia jää: 1/);
  assert.equal(readFileSync(join(a, 'eri.txt'), 'utf8'), 'oma\n', 'kuiva-ajo ei muuta mitään');

  const ajo = sh(t, 'zsh', 'p.sh', '--aja', '--uusi-haara');
  assert.match(ajo, /PÄIVITETTY\|Matkakirja-a\|/);
  assert.equal(git(a, 'branch', '--show-current').trim(), 'koti/Matkakirja-a');
  assert.deepEqual(readFileSync(join(a, '.claude/settings.local.json')), asetus, 'asetustiedosto täsmälleen ennallaan');
  assert.equal(readFileSync(join(a, 'eri.txt'), 'utf8'), 'main\n');
  assert.equal(readFileSync(join(a, 'sama.txt'), 'utf8'), 'sama\n');
  const arkisto = join(t, 'arkisto/kotikansiot');
  const kansio = sh(t, 'ls', arkisto).trim();
  assert.match(kansio, /^Matkakirja-a-\d{8}$/);
  assert.equal(readFileSync(join(arkisto, kansio, 'eri.txt'), 'utf8'), 'oma\n');
  assert.equal(readFileSync(join(arkisto, kansio, 'd/x.txt'), 'utf8'), 'oma-x\n');
  assert.ok(!existsSync(join(arkisto, kansio, 'sama.txt')), 'identtistä ei siirretä');
});
