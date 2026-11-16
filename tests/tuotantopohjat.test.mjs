/*
 * Tuotantopohjien automaattinen tarkistus (Raamattu 4.21: "automaattinen tarkistus valvoo pohjat"; Työkaluseppä 19.10.2026, PT:n erä).
 * Jokainen docs/moduulit/tuotantopohjat/*.md:
 *   1) alussa "Tavoitteen muoto" -kappale (omistaja 19.10.2026 klo 15.32: muoto kirjataan jokaisen pohjan alkuun),
 *   2) valmiin työn tarkistuslista (- [ ] -rivit),
 *   3) opit- tai retrospektiiviosio (otsikko; paketti on valmis vasta, kun opit on viety pohjaan).
 * Pohjalista = kansio itse (vanhan Raamatun 4.21-lista poistui 12.11.2026, KK 17.30: vanhan js:n poisto vaihe 1).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const KANSIO = new URL('../docs/moduulit/tuotantopohjat/', import.meta.url);
const ALKU_RIVEJA = 40;   // "alussa": johdanto + tavoitteen muoto ennen ensimmäisiä työvaiheita

const pohjat = readdirSync(KANSIO).filter((n) => n.endsWith('.md')).sort();
const lue = (n) => readFileSync(new URL(n, KANSIO), 'utf8');

export function tarkistaPohja(teksti) {
  const puutteet = [];
  const rivit = teksti.split('\n');
  if (!rivit.slice(0, ALKU_RIVEJA).some((r) => /tavoitteen muoto/i.test(r) && /^(\*\*|#{1,3} )/.test(r.trim()))) {
    puutteet.push(`"Tavoitteen muoto" -kappale puuttuu alusta (ensimmäiset ${ALKU_RIVEJA} riviä; lihavoitu kappale tai otsikko, Raamattu 4.21)`);
  }
  if (!rivit.some((r) => /^\s*- \[[ xX]\] \S/.test(r))) puutteet.push('valmiin työn tarkistuslista puuttuu (yksikään "- [ ]" -rivi)');
  if (!rivit.some((r) => /^#{1,4} .*(opit|retrospektiivi)/i.test(r))) puutteet.push('opit- tai retrospektiiviosio puuttuu (otsikko, jossa "Opit" tai "Retrospektiivi")');
  return puutteet;
}

// "3D-maamerkki" → 3d-maamerkki, "kertojan teksti ja ääni" → kertojan-teksti-ja-aani
export const tiedostonimi = (t) => t.trim().toLowerCase().replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/å/g, 'a').replace(/\s+/g, '-') + '.md';

test('tarkistin tunnistaa puutteet (synteettinen pohja)', () => {
  assert.equal(tarkistaPohja('# X\n\nteksti').length, 3);
  assert.deepEqual(tarkistaPohja('# X\n\n**Tavoitteen muoto:** havainnekuva\n\n## Tarkistuslista\n- [ ] pelaaja pääsee sisään\n\n## 9. Opit ja retrospektiivi\n'), []);
  assert.equal(tiedostonimi('kertojan teksti ja ääni'), 'kertojan-teksti-ja-aani.md');
});

test('jokaisessa tuotantopohjassa on tavoitteen muoto, tarkistuslista ja opit-osio', () => {
  assert.ok(pohjat.length >= 7, `pohjia vain ${pohjat.length}`);
  const viat = pohjat.flatMap((n) => tarkistaPohja(lue(n)).map((p) => `docs/moduulit/tuotantopohjat/${n}: ${p}`));
  assert.deepEqual(viat, [], `\n${viat.join('\n')}\n`);
});
