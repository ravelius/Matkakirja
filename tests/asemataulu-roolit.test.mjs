/*
 * ASEMATAULU: ROOLIKORTIT JOHDETAAN JOKA KIERROKSELLA (omistaja 20.10.2026 klo 23.48: "roolit taitavat kuitenkin laahata perässä";
 * docs/moduulit/asemataulu.md luvut 3 ja 6). hoitaja/kierros.py: tila työ, kun viimeisin toiminta < 15 min (ei hetken busy/idle);
 * teksti työlistan Työn alla -otsikoista (lisa-kentän nimet, vanhat nimet, enintään 2, uusin ensin). synkka.py siivoaa vanhat
 * toimi-*-dokumentit. Käsin kirjoitettu tehtavat-dokumentti on poistettu.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, copyFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const juuri = join(dirname(fileURLToPath(import.meta.url)), '..');
const lahde = join(juuri, 'tools/asemataulu');

function taulu() {
  const t = mkdtempSync(join(tmpdir(), 'asemataulu-roolit-'));
  mkdirSync(join(t, 'hoitaja'), { recursive: true });
  mkdirSync(join(t, 'data/talo'), { recursive: true });
  copyFileSync(join(lahde, 'hoitaja/kierros.py'), join(t, 'hoitaja/kierros.py'));
  for (const n of ['synkka.py', 'tarkista-junat.py']) copyFileSync(join(lahde, n), join(t, n));
  return t;
}
const iso = (minuuttiaSitten) => new Date(Date.now() - minuuttiaSitten * 60000).toISOString();
const kierros = (t) => {
  const r = spawnSync('python3', ['-I', join(t, 'hoitaja/kierros.py'), '--vain-roolit'], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr);
  return Object.fromEntries(JSON.parse(readFileSync(join(t, 'hoitaja/roolit.json'), 'utf8')).rivit.map((x) => [x.nimi, x]));
};

test('A: tila työ, kun viimeisin toiminta on alle 15 min vanha; muuten odottaa tai lepo', () => {
  const t = taulu();
  writeFileSync(join(t, 'hoitaja/sessiot.json'), JSON.stringify([
    { title: 'Pelikoodari (Opus, high)', isRunning: false, lastActivityAt: iso(5) },
    { title: 'Julkaisija (Opus, medium)', isRunning: false, lastActivityAt: iso(40) },
    { title: 'Natiiviseppä (Opus, high)', isRunning: false, lastActivityAt: iso(40) },
    { title: 'Valoseppä (Opus, high)', isRunning: true, lastActivityAt: iso(30) },
    { title: 'PÄÄTOIMITTAJA (Opus, medium)', isRunning: false, lastActivityAt: iso(90) },
    { title: 'Postivahti (Sonnet 5.5, low)', isRunning: true, lastActivityAt: iso(1) },
  ]));
  writeFileSync(join(t, 'hoitaja/odottaa.json'), JSON.stringify({ Julkaisija: 'odottaa käännösvuoroa' }));
  const k = kierros(t);
  assert.equal(k['Pelikoodari'].tila, 'työ', 'idle mutta toimi 5 min sitten = työ');
  assert.equal(k['Pelikoodari'].teksti, 'Työ käynnissä');
  assert.equal(k['Julkaisija'].tila, 'odottaa');
  assert.equal(k['Julkaisija'].teksti, 'odottaa käännösvuoroa');
  assert.equal(k['Natiiviseppä'].tila, 'lepo');
  assert.equal(k['Natiiviseppä'].teksti, 'Levossa');
  assert.equal(k['Valoseppä'].tila, 'työ', 'juuri nyt käynnissä = työ');
  assert.equal(k['Päätoimittaja'].tila, 'työ');
  assert.equal(k['Asemataulu'].tila, 'työ');
  assert.ok(!k['Postivahti']);
  // Tarkistin hyväksyy kortit.
  const tr = spawnSync('python3', ['-I', join(t, 'tarkista-junat.py'), '--kansio', join(t, 'data/talo')], { encoding: 'utf8' });
  assert.doesNotMatch(tr.stdout, /VIRHE.*roolit/);
});

test('B: työssä olevan kortin teksti = työlistan Työn alla -otsikot lisa-kentän mukaan, enintään 2, uusin ensin', () => {
  const t = taulu();
  writeFileSync(join(t, 'hoitaja/sessiot.json'), JSON.stringify([
    { title: 'Lavastaja (Opus, medium)', isRunning: false, lastActivityAt: iso(2) },
    { title: 'Pelikoodari (Opus, high)', isRunning: false, lastActivityAt: iso(2) },
    { title: 'Projektiseppä (Opus, high)', isRunning: false, lastActivityAt: iso(60) },
  ]));
  writeFileSync(join(t, 'data/talo/tyolista.json'), JSON.stringify({ rivit: [
    { otsikko: 'Vanha linna', tila: 'työn alla', lisa: 'Linnanrakentaja, Valoseppä', ts: 100 },
    { otsikko: 'Uusin museo', tila: 'työn alla', lisa: 'Pelikoodari, Lavastaja (ent. Linnanrakentaja)', ts: 300 },
    { otsikko: 'Keskimmäinen rengas', tila: 'Työn alla', lisa: 'Keskustelukanava → Lavastaja', ts: 200 },
    { otsikko: 'Valmis juttu', tila: 'valmis', lisa: 'Lavastaja', ts: 400 },
    { otsikko: 'Jonossa oleva', tila: 'jonossa', lisa: 'Lavastaja', ts: 500 },
    { otsikko: 'Siirron jälki', tila: 'työn alla', lisa: 'Siirtoseppä', ts: 50 },
  ] }));
  const k = kierros(t);
  assert.equal(k['Lavastaja'].tila, 'työ');
  assert.equal(k['Lavastaja'].teksti, 'Uusin museo; Keskimmäinen rengas');
  assert.equal(k['Pelikoodari'].teksti, 'Uusin museo');
  assert.equal(k['Projektiseppä'].tila, 'lepo', 'työlistan rivi ei tee lepäävästä työssä olevaa');
});

test('D: synkka.py poistaa kuitatut (yli 30 min) ja kuittaamattomat yli 2 h vanhat toimi-dokumentit', () => {
  const t = taulu();
  const lista = join(t, 'lista');
  const sessiot = join(t, 'sessiot');
  mkdirSync(lista); mkdirSync(sessiot);
  const nyt = Date.now();
  const toimi = {
    'toimi-keskustelukanava-odottaa': { rooli: 'Keskustelukanava', kysymys: 'x', ts: nyt - 45 * 60000 },
    'toimi-julkaisija-odottaa': { rooli: 'Julkaisija', kysymys: 'x', ts: nyt - 45 * 60000 },
    'toimi-natiiviseppa': { rooli: 'Natiiviseppä', kysymys: 'x', ts: nyt - 150 * 60000 },
    'toimi-pelikoodari': { rooli: 'Pelikoodari', kysymys: 'x', ts: nyt - 60 * 60000 },
    'toimi-valoseppa': { rooli: 'Valoseppä', kysymys: 'x', ts: nyt - 40 * 60000, kuitattu: true },
    'toimi-lavastaja-odottaa': { rooli: 'Lavastaja', kysymys: 'x', ts: nyt - 10 * 60000 },
  };
  for (const [d, v] of Object.entries(toimi)) writeFileSync(join(lista, d + '.json'), JSON.stringify(v));
  writeFileSync(join(t, 'data/talo/toimi-keskustelukanava-odottaa.json'), JSON.stringify(toimi['toimi-keskustelukanava-odottaa']));
  writeFileSync(join(sessiot, '1.json'), JSON.stringify({ name: 'KESKUSTELUKANAVA (Opus, max)', status: 'idle' }));
  writeFileSync(join(sessiot, '2.json'), JSON.stringify({ name: 'Julkaisija (Opus, medium)', status: 'waiting' }));
  const versiot = Object.keys(toimi).map((d, i) => `${d}=${i + 1}`).join(',');
  const r = spawnSync('python3', ['-I', join(t, 'synkka.py'), '--lista', lista, '--versiot', versiot, '--sessiot', sessiot,
    '--ulos', join(t, 'kirjoitukset.json')], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr);
  const poistot = JSON.parse(readFileSync(join(t, 'kirjoitukset.json'), 'utf8')).filter((x) => x.op === 'delete').map((x) => x.doc_id).sort();
  assert.deepEqual(poistot, ['toimi-keskustelukanava-odottaa', 'toimi-natiiviseppa', 'toimi-valoseppa']);
  assert.match(r.stdout, /SIIVOA\|toimi-keskustelukanava-odottaa\|4\d\|kuitattu/);
  assert.ok(!existsSync(join(t, 'data/talo/toimi-keskustelukanava-odottaa.json')), 'paikallinen kopio arkistoon');
});

test('C: tehtavat-dokumenttia ei lueta, viedä eikä peilata', () => {
  const h = readFileSync(join(lahde, 'asemataulu.html'), 'utf8');
  assert.doesNotMatch(h, /tehtavat/);
  assert.doesNotMatch(readFileSync(join(lahde, 'synkka.py'), 'utf8'), /PT_DOCS = \[[^\]]*tehtavat/);
  assert.match(readFileSync(join(lahde, 'asemataulu.py'), 'utf8'), /POISTETUT = \{[^}]*"tehtavat"/);
  assert.ok(!existsSync(join(lahde, 'data/talo/tehtavat.json')));
});
