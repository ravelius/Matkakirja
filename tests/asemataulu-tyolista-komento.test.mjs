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
  const kk = '<cross-session-message from="local_37f7c945-e1a0-4638-90b8-93c389a36fbe">\nOMISTAJAN PÄÄTÖS klo 11.40: tee x</cross-session-message>';
  assert.doesNotMatch(koukku(k, '<cross-session-message from="local_5df52e10">\nOMISTAJAN PÄÄTÖS klo 11.40: x</cross-session-message>'), /tyolista\.py lisaa/);
  assert.doesNotMatch(koukku(k, '<cross-session-message from="local_37f7c945-e1a0-4638-90b8-93c389a36fbe">KK: lainaus "OMISTAJAN PÄÄTÖS" -sanasta</cross-session-message>'), /tyolista\.py lisaa/);
  assert.match(koukku(k, kk), /tyolista\.py lisaa[\s\S]*tyolista\.py tilanne/);
  assert.equal(koukku(k, '<cross-session-message from="muu">Valmis erä</cross-session-message>'), '');
  assert.match(koukku(k, 'tee jotain'), /ASEMATAULU \(hook\)/);
});

test('koukku: vanhoja työn alla -rivejä ei listata (KK 16.11., 20261116-aina-toita.md kohta 5); valmis-tilanne huomataan', () => {
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
  assert.match(t, /tilanne sanoo valmis mutta tila ei: Unohtunut valmis/);
  assert.doesNotMatch(t, /Vanhahko rivi|Hylätty rivi|Tuore rivi|Valmis rivi/);
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

/* MUISTI PALA 3 (suunnitelma 20261117-muisti-ilman-uudelleenkertomista, luku 5): avoimet asiat avaa, merkitse, sulje, avoimet, tila. */
const D = 24 * H;

test('avaa: ilman lähdettä tai väärällä lähteellä hylätään eikä tallenneta; oikea lähde näkyy tulosteessa', () => {
  const k = uusi();
  const ennen = readFileSync(join(k, 'tyolista.json'), 'utf8');
  for (const sana of [[], ['--sana', ''], ['--sana', 'omistaja'], ['--sana', 'omistaja:eilen'], ['--sana', 'KK:']]) {
    const r = aja(k, 'avaa', '--kuka', 'KK', '--laji', 'LUPAUS', '--mita', 'Kerro kun puut linkissä', ...sana);
    assert.equal(r.status, 1, r.stdout);
    assert.match(r.stdout, /HYLÄTTY: lähde/);
  }
  assert.equal(readFileSync(join(k, 'tyolista.json'), 'utf8'), ennen);
  let r = aja(k, 'avaa', '--kuka', 'KK', '--laji', 'lupaus', '--mita', 'Kerro kun puut linkissä', '--odottaa', 'versio 224.5',
    '--sitten', 'kerro omistajalle', '--sana', 'omistaja:P-261117-55', '--rivi', 'kadonneet ihmeet');
  assert.equal(r.status, 0, r.stdout);
  assert.match(r.stdout, /^A-\d{6}-1: avattu \[OMISTAJA P-261117-55\]/);
  r = aja(k, 'avaa', '--kuka', 'KK', '--laji', 'EHTO', '--mita', 'ei junaan ennen laitelukuja', '--sana', 'KK:bck');
  assert.equal(r.status, 0, r.stdout);
  assert.equal(aja(k, 'avaa', '--kuka', 'NS', '--laji', 'KATSO', '--mita', 'x', '--sana', 'omistaja:17.11. klo 12.26').status, 0);
  assert.equal(aja(k, 'avaa', '--kuka', 'kk', '--laji', 'EHTO', '--mita', 'Ei junaan  ennen laitelukuja', '--sana', 'KK:x').status, 1); // sama auki
  const d = lue(k);
  assert.equal(d.ts, 1); // asia-komennot eivät koske työlistan ts:ään
  assert.equal(d.asiat.length, 3);
  assert.equal(d.asiat[0].rivi, 'Kadonneet ihmeet');
  const t = aja(k, 'tila', '--kuka', 'KK').stdout;
  assert.match(t, /LUPAUKSET:\n– A-\d+-1 Kerro kun puut linkissä · odottaa: versio 224\.5 · → kerro omistajalle \[OMISTAJA P-261117-55\]/);
  assert.match(t, /EHDOT:\n– A-\d+-2 ei junaan ennen laitelukuja \[KK:n oma ehto, bck\]/);
  assert.doesNotMatch(t, /KATSO NYT:/); // NS:n asia ei näy KK:lle
  // vanhat komennot toimivat edelleen, kun asiat-avain on olemassa
  assert.equal(aja(k, 'lisaa', 'Uusi rivi', '--teksti', 'x').status, 0);
  assert.equal(aja(k, 'seuraava').status, 0);
});

test('merkitse ja sulje: sulkeminen vaatii näytön, peruttu vaatii lähteen, suljettua ei muuteta', () => {
  const k = uusi();
  assert.equal(aja(k, 'avaa', '--kuka', 'KK', '--laji', 'ODOTTAA', '--mita', 'NS:n kivipinta', '--sana', 'rooli:NS').status, 0);
  const id = lue(k).asiat[0].tunnus;
  assert.equal(aja(k, 'merkitse', id, 'ajo käynnissä').status, 0);
  assert.equal(aja(k, 'merkitse', 'A-000000-9', 'x').status, 1);
  for (const n of ['', 'hyvä on', 'peruttu', 'peruttu: kukaan ei halua']) assert.equal(aja(k, 'sulje', id, '--naytto', n).status, 1, n);
  assert.equal(lue(k).asiat[0].suljettu, undefined);
  for (const n of ['PR #7010', 'docs/raamattu/C-talo.md', 'sha 4c07df0fe3', 'versio 224.5', 'kerrottu omistajalle klo 12.40', 'peruttu: omistaja:P-261117-55']) {
    const k2 = uusi();
    aja(k2, 'avaa', '--kuka', 'KK', '--laji', 'LUPAUS', '--mita', 'm', '--sana', 'KK:a');
    assert.equal(aja(k2, 'sulje', lue(k2).asiat[0].tunnus, '--naytto', n).status, 0, n);
  }
  assert.equal(aja(k, 'sulje', id, '--naytto', 'PR #7010').status, 0);
  const a = lue(k).asiat[0];
  assert.equal(a.merkinnat[0].teksti, 'ajo käynnissä');
  assert.equal(a.suljettu.naytto, 'PR #7010');
  assert.equal(aja(k, 'merkitse', id, 'myöhään').status, 1);
  assert.equal(aja(k, 'sulje', id, '--naytto', 'PR #7011').status, 1);
  assert.match(aja(k, 'avoimet').stdout, /^0 avointa/m);
  assert.match(aja(k, 'avoimet', '--suljetut').stdout, /suljettu .*PR #7010/);
});

test('tila --kuka KK: ≤ 6 kt suurellakin kirjanpidolla, vanhat ensin luvuiksi, omistajaa odottavat ensin', () => {
  const k = uusi();
  const d = lue(k);
  const nyt = Date.now();
  const lajit = ['ODOTTAA', 'KATSO', 'LUPAUS', 'KYSYMYS', 'EHTO'];
  d.asiat = Array.from({ length: 200 }, (_, i) => ({
    tunnus: `A-261117-${i + 1}`, avattu: nyt - (i % 3 === 0 ? 5 * D : i * 60000), kuka: i % 10 === 9 ? 'NS' : 'KK', laji: lajit[i % 5],
    mita: (`Asia ${i}: ` + 'pitkä kuvaus Sacré-Cœurin puista ja Temple-tornin sisätilasta '.repeat(3)).slice(0, 140),
    odottaa: i % 7 === 0 ? 'omistajan vastaus' : 'NS:n ajo', sitten: 'kerro omistajalle ja vie junaan', sana: i % 2 ? 'KK:bck' : 'omistaja:P-261117-55',
    merkinnat: i % 4 ? [] : [{ ts: nyt, teksti: 'merkintä '.repeat(10) }],
  }));
  writeFileSync(join(k, 'tyolista.json'), JSON.stringify(d));
  const r = aja(k, 'tila', '--kuka', 'KK');
  assert.equal(r.status, 0, r.stdout);
  assert.ok(Buffer.byteLength(r.stdout, 'utf8') <= 6000, `tila ${Buffer.byteLength(r.stdout, 'utf8')} tavua`);
  assert.match(r.stdout, /^TILA KK .*: 180 avointa asiaa/);
  assert.match(r.stdout, /SINÄ \(odottaa omistajaa\):\n– A-/);
  assert.match(r.stdout, /ja \d+ muuta, niistä \d+ yli 3 päivää vanhaa/);
  for (const rivi of r.stdout.split('\n')) assert.ok(rivi.length <= 200, rivi);
  assert.doesNotMatch(r.stdout, /A-261117-10 /); // NS:n asia ei näy KK:lle
  assert.match(aja(k, 'avoimet', '--kuka', 'KK', '--vanhat', '3').stdout, /^60 avointa/m);
});

test('tilanne --pidata-kesken asettaa ja tyhjä poistaa kentän (ESI-ISÄTARKISTUS, KK 20.11. 09.33)', () => {
  const k = uusi([{ otsikko: 'Aarre', edistys: 1, tila: 'työn alla', ts: Date.now() }]);
  assert.equal(aja(k, 'tilanne', 'Aarre', 'x', '--pidata-kesken', 'kytkin pois,  palvelinosa puuttuu').status, 0);
  assert.equal(lue(k).rivit[0].pidata_kesken, 'kytkin pois, palvelinosa puuttuu');
  assert.equal(aja(k, 'tilanne', 'Aarre', 'y', '--pidata-kesken', '').status, 0);
  assert.equal('pidata_kesken' in lue(k).rivit[0], false);
});
