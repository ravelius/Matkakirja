/*
 * ASEMATAULUN JUNARIVIKOMENTO tools/asemataulu/juna.py (omistaja 2.11.2026): lisaa, valmis, lukitse, tf.
 * Ajetaan väliaikaiskansiossa; lisäksi koukun pt-taulu-muistutus.py junarivivahti.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const juuri = join(dirname(fileURLToPath(import.meta.url)), '..');
const juna = join(juuri, 'tools/asemataulu/juna.py');
const hook = join(juuri, 'tools/hooks/pt-taulu-muistutus.py');

function uusi(rivit) {
  const k = mkdtempSync(join(tmpdir(), 'juna-'));
  writeFileSync(join(k, 'junat.json'), JSON.stringify({ rivit: rivit || [{ nimi: 'Juna 300', tila: 'Työn alla', edistys: 1, teksti: 'Työn alla:\n– a\n\nValmiina:\n– b' }], ts: 1 }));
  return k;
}
const aja = (k, ...a) => spawnSync('python3', ['-I', juna, '--kansio', k, ...a], { encoding: 'utf8' });
const lue = (k) => JSON.parse(readFileSync(join(k, 'junat.json'), 'utf8'));

test('lisaa: kohta Työn alle, ajat poistuvat, ts päivittyy, kaksoiskohta ohitetaan', () => {
  const k = uusi();
  let r = aja(k, 'lisaa', '--juna', '300', '2.11. 10.03: uusi asia klo 9.5x');
  assert.equal(r.status, 0, r.stdout);
  const d = lue(k);
  assert.equal(d.rivit[0].teksti, 'Työn alla:\n– a\n– uusi asia\n\nValmiina:\n– b');
  assert.ok(d.ts > 1 && d.rivit[0].ts === d.ts);
  r = aja(k, 'lisaa', '--juna', '300', 'Uusi asia');
  assert.match(r.stdout, /jo rivillä/);
  assert.equal(lue(k).rivit[0].teksti.split('uusi asia').length, 2);
});

test('lisaa: valmiin työn sana tai liian pitkä kohta hylätään eikä tallenneta', () => {
  const k = uusi();
  const ennen = readFileSync(join(k, 'junat.json'), 'utf8');
  let r = aja(k, 'lisaa', '--juna', '300', 'saumaviiva korjattu');
  assert.equal(r.status, 1);
  assert.match(r.stdout, /valmiin työn sana/);
  r = aja(k, 'lisaa', '--juna', '300', 'x'.repeat(130));
  assert.equal(r.status, 1);
  assert.equal(readFileSync(join(k, 'junat.json'), 'utf8'), ennen);
});

test('valmis: osa tekstistä siirtää kohdan Valmiinaan; epäselvä osuma hylätään', () => {
  const k = uusi([{ nimi: 'Juna 300', tila: 'Työn alla', edistys: 1, teksti: 'Työn alla:\n– sokkelin kaide\n– sokkelin valo\n\nValmiina:' }]);
  let r = aja(k, 'valmis', '--juna', '300', 'sokkelin');
  assert.equal(r.status, 1);
  r = aja(k, 'valmis', '--juna', '300', 'kaide');
  assert.equal(r.status, 0, r.stdout);
  assert.equal(lue(k).rivit[0].teksti, 'Työn alla:\n– sokkelin valo\n\nValmiina:\n– sokkelin kaide');
});

test('lukitse: vain Valmiina jää ja tila Lukittu; ei-tyhjä Työn alla hylätään', () => {
  const k = uusi();
  assert.equal(aja(k, 'lukitse', '--juna', '300').status, 1);
  assert.equal(aja(k, 'valmis', '--juna', '300', 'a').status, 0);
  const r = aja(k, 'lukitse', '--juna', '300');
  assert.equal(r.status, 0, r.stdout);
  const rivi = lue(k).rivit[0];
  assert.equal(rivi.tila, 'Lukittu');
  assert.equal(rivi.teksti, 'Valmiina:\n– b\n– a');
  assert.equal(aja(k, 'lisaa', '--juna', '300', 'c').status, 1);
});

test('tf: rivistä TF N, Uutta-otsikko, edistys pois, eteneminen tyhjenee', () => {
  const k = uusi();
  writeFileSync(join(k, 'eteneminen.json'), JSON.stringify({ nimi: 'Juna 300', edistys: 2 }));
  aja(k, 'valmis', '--juna', '300', 'a');
  assert.equal(aja(k, 'lukitse', '--juna', '300').status, 0);
  const r = aja(k, 'tf', '--juna', '300', '--aika', '4.07');
  assert.equal(r.status, 0, r.stdout);
  const rivi = lue(k).rivit[0];
  assert.equal(rivi.nimi, 'TF 300');
  assert.match(rivi.teksti, /^Uutta \(\d+\.\d+\. klo 04\.07; myös Macille\):\n– b\n– a$/);
  assert.equal(rivi.edistys, undefined);
  assert.equal(JSON.parse(readFileSync(join(k, 'eteneminen.json'), 'utf8')).nimi, undefined);
  assert.equal(aja(k, 'tf', '--juna', '300', '--aika', 'huomenna').status, 1);
});

test('koukku: virheelliset junarivit tulevat lisäkontekstiin, oikea muoto ei tuota mitään', () => {
  const k = uusi([{ nimi: 'Juna 300', tila: 'Työn alla', edistys: 1, teksti: 'Työn alla:\n– 2.11. 10.03: viety palvelimelle' }]);
  const tila = join(mkdtempSync(join(tmpdir(), 'tila-')), 'tila.json');
  const env = { ...process.env, PT_TAULU_DATA: k, PT_TAULU_TILA: tila };
  const syote = JSON.stringify({ hook_event_name: 'PostToolUse', session_id: 'x', tool_input: { message: 'hei' } });
  let r = spawnSync('python3', ['-I', hook], { input: syote, encoding: 'utf8', env });
  assert.equal(r.status, 0);
  assert.match(JSON.parse(r.stdout).hookSpecificOutput.additionalContext, /JUNARIVIT VIRHEELLISET/);
  const k2 = uusi();
  r = spawnSync('python3', ['-I', hook], { input: syote, encoding: 'utf8', env: { ...env, PT_TAULU_DATA: k2, PT_TAULU_TILA: tila + '2' } });
  assert.equal(r.stdout.trim(), '');
  assert.ok(existsSync(join(k2, 'junat.json')));
});
