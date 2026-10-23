/*
 * UI-PERIAATTEET MITATTAVINA (Raamattu 4.21, omistaja 21.10.2026 klo 18.16; Natiivi-UI 23.10.2026).
 *
 * docs/tuotanto/tekotavat/ui.md luku 0.1 kirjoittaa rajat muodossa "N pt (`polku`)", "N ms (`polku`)" tai "N % (`polku`)".
 * Vartija katsoo, että jokainen tällainen luku on sama kuin tyylikirja/tyylikirja.json:n arvo, joten ohje ei jää jälkeen,
 * kun tyylikirja muuttuu (ja päinvastoin).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const ohje = readFileSync(new URL('../docs/tuotanto/tekotavat/ui.md', import.meta.url), 'utf8');
const tk = JSON.parse(readFileSync(new URL('../tyylikirja/tyylikirja.json', import.meta.url), 'utf8'));

const arvo = (polku) => polku.split('.').reduce((o, k) => (o == null ? undefined : o[k]), tk);
const viitteet = [...ohje.matchAll(/(\d+(?:,\d+)?) (?:pt|ms|%) \(`([a-z][\w-]*(?:\.[\w-]+)+)`\)/g)]
  .map(([, luku, polku]) => ({ luku: Number(luku.replace(',', '.')), polku }));

test('luvun 0.1 tyylikirjaviitteitä on ja ne osoittavat olemassa oleviin arvoihin', () => {
  assert.ok(viitteet.length >= 25, `viitteitä vain ${viitteet.length}`);
  for (const { polku } of viitteet) assert.equal(typeof arvo(polku), 'number', `tyylikirjassa ei lukua: ${polku}`);
});

test('ohjeen luvut ovat samat kuin tyylikirjassa', () => {
  for (const { luku, polku } of viitteet) assert.equal(luku, arvo(polku), `ui.md: ${luku} (${polku}), tyylikirja: ${arvo(polku)}`);
});
