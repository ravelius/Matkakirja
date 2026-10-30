/*
 * ASEMATAULU: LAITTEIDEN ROOLI ILMAN CLAUDE-VANHEMPAA (PT 30.10.2026): laitteet.py päättelee roolin ajon työkansiosta tai
 * komennosta (proto-3d/lokit/<rooli>-…, _tyo/<rooli>/, wt/<rooli>-…), kun prosessilla ei ole Claude-vanhempaa; Linnanrakentaja = Lavastaja.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const juuri = join(dirname(fileURLToPath(import.meta.url)), '..');
const laitteet = join(juuri, 'tools/asemataulu/laitteet.py');

function rooli(teksti) {
  const koodi = `import importlib.util,sys\nspec=importlib.util.spec_from_file_location('l',${JSON.stringify(laitteet)})\nm=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)\nprint(m.rooli_polusta(sys.argv[1]))`;
  const r = spawnSync('python3', ['-I', '-c', koodi, teksti], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr);
  return r.stdout.trim();
}

test('rooli työkansiosta tai komennosta', () => {
  assert.equal(rooli('/bin/sh /Users/Shared/Claude/proto-3d/lokit/natiiviseppa-ipad-20261030/aja.sh'), 'Natiiviseppä');
  assert.equal(rooli('cwd /Users/Shared/Claude/_tyo/linnanrakentaja/blender'), 'Lavastaja');
  assert.equal(rooli('/Users/Shared/Claude/wt/pelikoodari-kivikoko/ipad-ajo.sh'), 'Pelikoodari');
  assert.equal(rooli('/Users/Shared/Claude/wt/proto-natiivi-ui-juoksu/x.sh'), 'Natiivi-UI');
  assert.equal(rooli('/usr/bin/python3 jokin.py'), '');
});
