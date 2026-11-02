/*
 * ASEMATAULUN TYÖLISTAKOMENTO tools/asemataulu/tyolista.py (2.11.2026): lisaa, tilanne, valmis (+ --juna)
 * sekä koukun pt-taulu-muistutus.py uudet haarat (KK:n välittämät omistajan päätökset, vanhentuneet aktiiviset rivit).
 * Ajetaan väliaikaiskansiossa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const juuri = join(dirname(fileURLToPath(import.meta.url)), '..');
const komento = join(juuri, 'tools/asemataulu/tyolista.py');
const hook = join(juuri, 'tools/hooks/pt-taulu-muistutus.py');
const H = 3600 * 1000;

function uusi(rivit) {
  const k = mkdtempSync(join(tmpdir(), 'tyolista-'));
  writeFileSync(join(k, 'tyolista.json'), JSON.stringify({
    rivit: rivit || [
      { otsikko: 'Työlista päivittyy automaattisesti', teksti: 't', lisa: 'PT', edistys: 1, tila: 'työn alla', tilanne: '2.11. 11.4x: vanha', ts: 1, vahti: 'ei päivitystä 30 h' },
      { otsikko: 'Kadonneet ihmeet', teksti: 't', lisa: 'KS', edistys: 3, tila: 'työn alla', ts: 1 },
      { otsikko: 'Kadonneet kellot', teksti: 't', lisa: 'KS', edistys: 2, tila: 'työn alla', ts: 1 },
    ], kysymykset: [], ts: 1,
  }));
  return k;
}
const aja = (k, ...a) => spawnSync('python3', ['-I', komento, '--kansio', k, ...a], { encoding: 'utf8' });
const lue = (k) => JSON.parse(readFileSync(join(k, 'tyolista.json'), 'utf8'));

test('tilanne: uusi teksti eteen, vanha Aiempi-osaan, ts päivittyy, vahti pois, osamerkkijono riittää', () => {
  const k = uusi();
  const r = aja(k, 'tilanne', 'automaattisesti', 'Koukku valmis', '--edistys', '3');
  assert.equal(r.status, 0, r.stdout);
  const d = lue(k);
  const rivi = d.rivit[0];
  assert.match(rivi.tilanne, /^\d+\.\d+\. \d\d\.\dx: Koukku valmis\n\nAiempi: 2\.11\. 11\.4x: vanha$/);
  assert.equal(rivi.edistys, 3);
  assert.equal(rivi.vahti, undefined);
  assert.ok(rivi.ts > 1 && d.ts === rivi.ts);
});

test('otsikko: epäyksikäsitteinen tai tuntematon hylätään ehdokkailla eikä tallenneta', () => {
  const k = uusi();
  const ennen = readFileSync(join(k, 'tyolista.json'), 'utf8');
  let r = aja(k, 'tilanne', 'Kadonneet', 'x');
  assert.equal(r.status, 1);
  assert.match(r.stdout, /ihmeet[\s\S]*kellot/);
  r = aja(k, 'tilanne', 'olematon', 'x');
  assert.equal(r.status, 1);
  assert.match(r.stdout, /ei löydy/);
  assert.equal(readFileSync(join(k, 'tyolista.json'), 'utf8'), ennen);
  assert.equal(aja(k, 'tilanne', 'kadonneet ihmeet', 'x').status, 0);
});

test('lisaa: uusi rivi alkuun, kaksoisrivi hylätään', () => {
  const k = uusi();
  let r = aja(k, 'lisaa', 'Uusi asia', '--teksti', 'Pyysit', '--lisa', 'PT', '--tilanne', 'aloitettu');
  assert.equal(r.status, 0, r.stdout);
  const rivi = lue(k).rivit[0];
  assert.equal(rivi.otsikko, 'Uusi asia');
  assert.equal(rivi.tila, 'työn alla');
  assert.equal(rivi.edistys, 1);
  assert.match(rivi.tilanne, /: aloitettu$/);
  assert.equal(aja(k, 'lisaa', 'uusi asia', '--teksti', 'x').status, 1);
});

test('valmis: tila valmis, edistys 5, valmistui tänään', () => {
  const k = uusi();
  const r = aja(k, 'valmis', 'Kadonneet ihmeet', 'Peliin viety');
  assert.equal(r.status, 0, r.stdout);
  const rivi = lue(k).rivit[1];
  assert.equal(rivi.tila, 'valmis');
  assert.equal(rivi.edistys, 5);
  assert.match(rivi.valmistui, /^\d+\.\d+\.$/);
  assert.match(rivi.tilanne, /Peliin viety/);
});

test('--juna: sama teksti kirjautuu myös junaan; juna.py:n hylkäys estää työlistan kirjauksen', () => {
  const k = uusi();
  writeFileSync(join(k, 'junat.json'), JSON.stringify({ rivit: [{ nimi: 'Juna 300', tila: 'Työn alla', edistys: 1, teksti: 'Työn alla:\n– a\n\nValmiina:\n– b' },
    { nimi: 'Juna 299', tila: 'Lukittu', edistys: 0, teksti: 'Valmiina:\n– c' }], ts: 1 }));
  let r = aja(k, 'tilanne', 'automaattisesti', 'uusi kohta', '--juna', '300');
  assert.equal(r.status, 0, r.stdout);
  assert.match(JSON.parse(readFileSync(join(k, 'junat.json'), 'utf8')).rivit[0].teksti, /– uusi kohta/);
  r = aja(k, 'valmis', 'automaattisesti', 'valmis', '--juna', '300', '--juna-kohta', 'uusi kohta');
  assert.equal(r.status, 0, r.stdout);
  assert.match(JSON.parse(readFileSync(join(k, 'junat.json'), 'utf8')).rivit[0].teksti, /Valmiina:\n– b\n– uusi kohta/);
  const ennen = readFileSync(join(k, 'tyolista.json'), 'utf8');
  r = aja(k, 'tilanne', 'Kadonneet ihmeet', 'x', '--juna', '299');
  assert.equal(r.status, 1);
  assert.equal(readFileSync(join(k, 'tyolista.json'), 'utf8'), ennen);
});

function koukku(data, prompt, tapahtuma = 'UserPromptSubmit') {
  const tila = join(mkdtempSync(join(tmpdir(), 'tila-')), 'tila.json');
  const env = { ...process.env, PT_TAULU_DATA: data, PT_TAULU_TILA: tila };
  const syote = JSON.stringify({ hook_event_name: tapahtuma, session_id: 's', prompt, tool_input: { message: 'hei' } });
  const r = spawnSync('python3', ['-I', hook], { input: syote, encoding: 'utf8', env });
  assert.equal(r.status, 0);
  return r.stdout.trim() ? JSON.parse(r.stdout).hookSpecificOutput.additionalContext : '';
}

test('koukku: KK:n välittämä OMISTAJAN PÄÄTÖS muistuttaa tyolista.py:stä, muu roolien viesti ei', () => {
  const k = uusi([{ otsikko: 'Tuore', edistys: 1, tila: 'työn alla', ts: Date.now() }]);
  const kk = '<cross-session-message from="local_37f7c945">OMISTAJAN PÄÄTÖS klo 11.40: tee x</cross-session-message>';
  assert.match(koukku(k, kk), /tyolista\.py lisaa[\s\S]*tyolista\.py tilanne/);
  assert.equal(koukku(k, '<cross-session-message from="muu">Valmis erä</cross-session-message>'), '');
  assert.match(koukku(k, 'tee jotain'), /ASEMATAULU \(hook\)/);
});

test('koukku: yli 3 h vanhat työn alla -rivit listataan (myös yli 48 h), tuore ja valmis eivät; valmis-tilanne huomataan', () => {
  const nyt = Date.now();
  const k = uusi([
    { otsikko: 'Vanhahko rivi', edistys: 1, tila: 'työn alla', ts: nyt - 5 * H },
    { otsikko: 'Tuore rivi', edistys: 1, tila: 'työn alla', ts: nyt - 1 * H },
    { otsikko: 'Hylätty rivi', edistys: 1, tila: 'työn alla', ts: nyt - 60 * H },
    { otsikko: 'Valmis rivi', edistys: 5, tila: 'valmis', ts: nyt - 5 * H },
    { otsikko: 'Unohtunut valmis', edistys: 0, tila: 'työn alla', tilanne: '1.11. 17.2x: valmis ja kuitattu, menossa junaan 216.', ts: nyt - 0.5 * H },
  ]);
  const t = koukku(k, '<cross-session-message>x</cross-session-message>', 'PostToolUse');
  assert.match(t, /TYÖLISTA \(hook\)/);
  assert.match(t, /Vanhahko rivi[\s\S]*Hylätty rivi|Hylätty rivi[\s\S]*Vanhahko rivi/);
  assert.match(t, /tilanne sanoo valmis mutta tila ei: Unohtunut valmis/);
  assert.doesNotMatch(t, /Tuore rivi|Valmis rivi/);
  const k2 = uusi([{ otsikko: 'Tuore rivi', edistys: 1, tila: 'työn alla', ts: nyt - H }]);
  assert.doesNotMatch(koukku(k2, 'x', 'PostToolUse'), /TYÖLISTA \(hook\)/);
});

test('--juna: tuntematon juna hylätään, ja koko historia säilyy', () => {
  const k = uusi();
  writeFileSync(join(k, 'junat.json'), JSON.stringify({ rivit: [{ nimi: 'Juna 300', tila: 'Työn alla', edistys: 1, teksti: 'Työn alla:\n– a' }], ts: 1 }));
  const ennen = readFileSync(join(k, 'tyolista.json'), 'utf8');
  assert.equal(aja(k, 'tilanne', 'automaattisesti', 'x', '--juna', '999').status, 1);
  assert.equal(readFileSync(join(k, 'tyolista.json'), 'utf8'), ennen);
  for (const t of ['a', 'b', 'c', 'd', 'e']) assert.equal(aja(k, 'tilanne', 'automaattisesti', t).status, 0);
  assert.equal(lue(k).rivit[0].tilanne.split('\n\nAiempi: ').length, 6);
});

test('koukku: Odottaa-rivit muistutetaan kerran päivässä aamulla (klo 6–12)', () => {
  const k = uusi([{ otsikko: 'Odottava', edistys: 0, tila: 'pidossa', ts: Date.now() }]);
  const t = koukku(k, '<cross-session-message>x</cross-session-message>', 'PostToolUse');
  const h = new Date().getHours();
  if (h >= 6 && h < 12) assert.match(t, /kerran päivässä aamulla[\s\S]*1 Odottaa-riviä/);
  else assert.doesNotMatch(t, /kerran päivässä/);
});
