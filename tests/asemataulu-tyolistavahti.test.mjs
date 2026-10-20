/*
 * ASEMATAULUN TYÖLISTAVAHTI (omistaja 20.10.2026 klo 23.12, Raamattu 7.39 TYÖLISTAVAHTI).
 * Ajaa tools/asemataulu/tyolistavahti.py:n esimerkkityölistalla kiinteällä nykyhetkellä ja tarkistaa säännöt:
 * yli 24 h vanha merkintä, yli 48 h pitoon, puuttuva ts ei pitoon, valmiit ja edistys 5 Valmistuneisiin, edistys ≤ 5,
 * tuplat, yli 15 työn alla, ts:n normalisointi ja dokumentin vahti-kenttä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const juuri = join(dirname(fileURLToPath(import.meta.url)), '..');
const skripti = join(juuri, 'tools/asemataulu/tyolistavahti.py');
const kansio = mkdtempSync(join(tmpdir(), 'tyolistavahti-'));
const NYT = Date.UTC(2026, 9, 20, 21, 0);   // 21.10. klo 00.00 Suomen aikaa
const H = 3600 * 1000;

function aja(tl, kirjoita = true) {
  const polku = join(kansio, 'tl-' + Math.random().toString(36).slice(2) + '.json');
  writeFileSync(polku, JSON.stringify(tl));
  const args = ['-I', skripti, polku, '--nyt', String(NYT)];
  if (kirjoita) args.push('--kirjoita');
  const r = spawnSync('python3', args, { encoding: 'utf8', env: { ...process.env, TZ: 'Europe/Helsinki' } });   // päiväys Suomen ajassa myös CI:ssä
  return { r, tl: JSON.parse(readFileSync(polku, 'utf8')), rivit: r.stdout.trim().split('\n') };
}

const rivi = (otsikko, muut) => ({ otsikko, tila: 'työn alla', edistys: 2, teksti: 't', tilanne: 's', ...muut });
const etsi = (tl, o) => tl.rivit.find((x) => x.otsikko === o);

test('vanhat, pito ja puuttuva ts', () => {
  const { r, tl, rivit } = aja({ rivit: [
    rivi('Tuore', { ts: NYT - 2 * H }),
    rivi('Vuorokausi', { ts: NYT - 30 * H }),
    rivi('Kaksi vuorokautta', { ts: String(NYT - 50 * H) }),
    rivi('Ilman aikaa'),
  ], ts: NYT });
  assert.equal(r.status, 0, r.stderr);
  assert.equal(etsi(tl, 'Tuore').vahti, undefined);
  assert.match(etsi(tl, 'Vuorokausi').vahti, /ei päivitystä 30 h/);
  assert.equal(etsi(tl, 'Vuorokausi').tila, 'työn alla');
  assert.equal(etsi(tl, 'Kaksi vuorokautta').tila, 'pidossa');
  assert.equal(typeof etsi(tl, 'Kaksi vuorokautta').ts, 'number', 'ts normalisoitu luvuksi');
  assert.equal(etsi(tl, 'Ilman aikaa').tila, 'työn alla', 'ei pitoon ilman ts:ää');
  assert.equal(etsi(tl, 'Ilman aikaa').vahti, 'ei päivitysaikaa');
  assert.equal(tl.vahti, '2 vanhaa riviä');
  assert.ok(rivit.includes('TYOLISTA VANHA|Vuorokausi|30 h'), r.stdout);
  assert.ok(rivit.includes('TYOLISTA PIDOSSA|Kaksi vuorokautta|50 h'), r.stdout);
  assert.ok(rivit.includes('TYOLISTA EI TS|Ilman aikaa'), r.stdout);
});

test('valmiit ja edistys', () => {
  const { tl } = aja({ rivit: [
    rivi('Viisi', { ts: NYT, edistys: 5 }),
    rivi('Kuusi', { ts: NYT, edistys: 6, tila: 'jonossa' }),
    rivi('Valmis jo', { ts: NYT, tila: 'valmis', edistys: 3, valmistui: '19.10.' }),
  ], ts: NYT });
  assert.deepEqual([etsi(tl, 'Viisi').tila, etsi(tl, 'Viisi').edistys, etsi(tl, 'Viisi').valmistui], ['valmis', 5, '21.10.']);
  assert.deepEqual([etsi(tl, 'Kuusi').tila, etsi(tl, 'Kuusi').edistys], ['valmis', 5]);
  assert.deepEqual([etsi(tl, 'Valmis jo').edistys, etsi(tl, 'Valmis jo').valmistui], [5, '19.10.']);
  assert.equal(tl.vahti, 'kunnossa');
});

test('tuplat ja liian monta työn alla', () => {
  const rs = Array.from({ length: 16 }, (_, i) => rivi('Työ numero ' + 'abcdefghijklmnop'[i] + ' erillinen ' + i * 7919, { ts: NYT }));
  rs.push(rivi('Kielletyn kaupungin puuttuvat laatat', { ts: NYT, tila: 'jonossa' }));
  rs.push(rivi('Kielletyn kaupungin puuttuvat laatat.', { ts: NYT, tila: 'jonossa' }));
  const { rivit, r } = aja({ rivit: rs, ts: NYT });
  assert.ok(rivit.some((x) => x.startsWith('TYOLISTA TUPLA|Kielletyn kaupungin puuttuvat laatat|')), r.stdout);
  assert.ok(rivit.includes('TYOLISTA LIIKAA|16 työn alla (raja 15)'), r.stdout);
});

test('kuiva-ajo ei kirjoita', () => {
  const alku = { rivit: [rivi('Viisi', { ts: NYT, edistys: 5 })], ts: NYT };
  const { tl, rivit } = aja(alku, false);
  assert.equal(etsi(tl, 'Viisi').tila, 'työn alla');
  assert.ok(rivit.includes('TYOLISTAVAHTI|muuttuisi'));
});
