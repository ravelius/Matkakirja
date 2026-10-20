/*
 * ASEMATAULU: VALMISTUNEET 10 UUSINTA, SINULLE JA KULUTUS POIS (omistaja 20.10.2026 klo 23.32–23.35;
 * docs/moduulit/asemataulu.md luvut 3 ja 7). synkka.py siirtää työlistan vanhemmat valmiit arkistoon ennen vientiä,
 * eikä vie dokumentteja viestit ja kulutus; sivulla ei ole Sinulle- eikä Kulutus-osiota.
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

function kansio() {
  const t = mkdtempSync(join(tmpdir(), 'asemataulu-valmiit-'));
  for (const n of ['synkka.py', 'tarkista-junat.py']) copyFileSync(join(lahde, n), join(t, n));
  mkdirSync(join(t, 'data/talo'), { recursive: true });
  mkdirSync(join(t, 'lista'), { recursive: true });
  return t;
}
const aja = (t) => spawnSync('python3', ['-I', join(t, 'synkka.py'), '--lista', join(t, 'lista'), '--ulos', join(t, 'kirjoitukset.json')],
  { encoding: 'utf8' });

test('synkka.py jättää 10 uusinta valmista ja arkistoi vanhemmat kerran', () => {
  const t = kansio();
  const rivit = [{ otsikko: 'Kesken', tila: 'työn alla', tilanne: 'Työn alla:\n– x' }];
  for (let i = 1; i <= 13; i++) rivit.push({ otsikko: 'Valmis ' + i, tila: 'valmis', tilanne: 'Valmiina:\n– x', valmistui: i + '.10.' });
  rivit.push({ otsikko: 'Vain valmiina-osio', tila: 'työn alla', tilanne: 'Valmiina:\n– y', valmistui: '1.9.' });
  writeFileSync(join(t, 'data/talo/tyolista.json'), JSON.stringify({ rivit, ts: Date.now() }));
  writeFileSync(join(t, 'data/talo/viestit.json'), JSON.stringify({ rivit: [{ otsikko: 'x', teksti: 'y' }] }));
  writeFileSync(join(t, 'data/talo/kulutus.json'), JSON.stringify({ rivit: [] }));
  const r = aja(t);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /ARKISTOITU\|tyolista\|4\|/);
  const tl = JSON.parse(readFileSync(join(t, 'data/talo/tyolista.json'), 'utf8'));
  assert.deepEqual(tl.rivit.map((x) => x.otsikko), ['Kesken', ...Array.from({ length: 10 }, (_, i) => 'Valmis ' + (i + 4))]);
  const ark = readFileSync(join(t, 'data/talo-arkisto/tyolista-valmiit.jsonl'), 'utf8').trim().split('\n').map((x) => JSON.parse(x));
  assert.deepEqual(ark.map((x) => x.rivi.otsikko).sort(), ['Vain valmiina-osio', 'Valmis 1', 'Valmis 2', 'Valmis 3']);
  const vienti = JSON.parse(readFileSync(join(t, 'kirjoitukset.json'), 'utf8')).map((x) => x.doc_id);
  assert.ok(vienti.includes('tyolista'));
  assert.ok(!vienti.includes('viestit') && !vienti.includes('kulutus'), 'viestit ja kulutus eivät lähde tauluun');
  // PT kirjoittaa vanhan listan uudelleen: sama rivi ei tule arkistoon toista kertaa.
  writeFileSync(join(t, 'data/talo/tyolista.json'), JSON.stringify({ rivit, ts: Date.now() }));
  assert.equal(aja(t).status, 0);
  assert.equal(readFileSync(join(t, 'data/talo-arkisto/tyolista-valmiit.jsonl'), 'utf8').trim().split('\n').length, 4);
  assert.ok(!existsSync(join(t, 'data/talo/tyolista-valmiit.jsonl')));
});

test('sivulla ei ole Sinulle- eikä Kulutus-osiota; Valmistuneet 10 uusinta Työlistan väliotsikkona', () => {
  const h = readFileSync(join(lahde, 'asemataulu.html'), 'utf8');
  assert.doesNotMatch(h, /viestit|kulutus|Sinulle/i);
  assert.match(h, /var VALMIIT_NAKYY = 10;/);
  assert.match(h, /class="ryhma-otsikko" id="valmistuneet-otsikko"/);
  assert.match(h, /class="ryhma-otsikko" id="odottaa-otsikko"/);
  assert.ok(!existsSync(join(lahde, 'kulutus.py')) && !existsSync(join(lahde, 'kulutus-projektit.json')));
});
