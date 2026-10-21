/*
 * Tuotantopohjien automaattinen tarkistus (Raamattu 4.21: "automaattinen tarkistus valvoo pohjat"; Työkaluseppä 19.10.2026, PT:n erä).
 * Jokainen docs/moduulit/tuotantopohjat/*.md:
 *   1) alussa "Tavoitteen muoto" -kappale (omistaja 19.10.2026 klo 15.32: muoto kirjataan jokaisen pohjan alkuun),
 *   2) valmiin työn tarkistuslista (- [ ] -rivit),
 *   3) opit- tai retrospektiiviosio (otsikko; paketti on valmis vasta, kun opit on viety pohjaan).
 *   4) ALKUUN "## Tarkista ennen" (omistaja 21.10.2026 klo 17.31: "tehdä kaikista yksinkertaisia tuotantoputkia joista kaikki asiat
 *      tarkastetaan ennenkuin tehdään tai kysytään minulta"): pohjan ensimmäinen ##-otsikko, 5–12 AINA-/EI-riviä Raamatun kohdan
 *      numerolla ja rivi "Ennen kysymystä omistajalle". Pohjat, joista osio vielä puuttuu, ovat listalla TARKISTA_ENNEN_KESKEN; lista
 *      vain lyhenee (testi hylkää listalla olevan pohjan, jossa osio jo on, ja uuden pohjan ilman osiota).
 * Lisäksi Raamatun 4.21:n pohjalista ("Pohjat: …;") on olemassa tiedostoina <tyyppi>.md.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';

const KANSIO = new URL('../docs/moduulit/tuotantopohjat/', import.meta.url);
const RAAMATTU = readFileSync(new URL('../js/tyohuone-raamattu.js', import.meta.url), 'utf8');
const ALKU_RIVEJA = 40;   // "alussa": johdanto + tavoitteen muoto ennen ensimmäisiä työvaiheita

// Pohjat, joihin "Tarkista ennen" lisätään seuraavaksi (omistajat: tyypin rakentaja, PT hyväksyy). Poista rivi, kun osio on lisätty.
export const TARKISTA_ENNEN_KESKEN = new Set([
  '3d-maamerkki.md', 'codex-3d-toimitus.md', 'historiapeli.md', 'kertojan-teksti-ja-aani.md',
  'kuumailmapallokierros.md', 'paakaupungin-avaus.md', 'taidemuseon-maa.md', 'uusi-linssi.md',
]);
const TARKISTA_RIVEJA = [5, 12];

export function tarkistaEnnen(teksti) {
  const rivit = teksti.split('\n');
  const otsikot = rivit.map((r, i) => [r, i]).filter(([r]) => /^## /.test(r));
  if (!otsikot.length || !/^## Tarkista ennen\s*$/.test(otsikot[0][0])) return ['"## Tarkista ennen" ei ole pohjan ensimmäinen ##-otsikko'];
  const loppu = otsikot.length > 1 ? otsikot[1][1] : rivit.length;
  const osio = rivit.slice(otsikot[0][1] + 1, loppu);
  const puutteet = [];
  const saannot = osio.filter((r) => /^- \*\*(AINA|EI)\b/.test(r));
  if (saannot.length < TARKISTA_RIVEJA[0] || saannot.length > TARKISTA_RIVEJA[1]) {
    puutteet.push(`"Tarkista ennen": ${saannot.length} AINA-/EI-riviä (pitää olla ${TARKISTA_RIVEJA[0]}–${TARKISTA_RIVEJA[1]})`);
  }
  for (const r of saannot) if (!/\(\d+\.\d+/.test(r)) puutteet.push(`"Tarkista ennen": rivistä puuttuu Raamatun kohdan numero: ${r.slice(0, 80)}`);
  if (!osio.some((r) => /^- \*\*Ennen kysymystä omistajalle:\*\*/.test(r))) puutteet.push('"Tarkista ennen": rivi "Ennen kysymystä omistajalle" puuttuu');
  return puutteet;
}

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

export function raamatunPohjat(raamattu) {
  const kohta = raamattu.match(/'4\.21 TUOTANTOPOHJAT[^']*'/);
  if (!kohta) return null;
  const m = kohta[0].match(/Pohjat: ([^;]+);/);
  return m ? m[1].split(/,| sekä /).map((s) => s.trim()).filter(Boolean) : null;
}

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

test('Raamatun 4.21:n pohjalista löytyy tiedostoina', () => {
  const lista = raamatunPohjat(RAAMATTU);
  assert.ok(lista && lista.length >= 7, `Raamatun 4.21:stä ei löytynyt pohjalistaa ("Pohjat: …;"), saatiin ${JSON.stringify(lista)}`);
  const puuttuvat = lista.filter((t) => !existsSync(new URL(tiedostonimi(t), KANSIO)))
    .map((t) => `"${t}" → docs/moduulit/tuotantopohjat/${tiedostonimi(t)} puuttuu`);
  assert.deepEqual(puuttuvat, [], `\n${puuttuvat.join('\n')}\n`);
});

test('Tarkista ennen -tarkistin tunnistaa puutteet (synteettinen pohja)', () => {
  const rivi = (n) => `- **AINA** sääntö ${n} (9.${n})`;
  const hyva = ['# X', '', '## Tarkista ennen', '', ...[1, 2, 3, 4, 5].map(rivi), '- **Ennen kysymystä omistajalle:** onko jo päätetty', '', '## 1. Putki'].join('\n');
  assert.deepEqual(tarkistaEnnen(hyva), []);
  assert.equal(tarkistaEnnen('# X\n\n## 1. Putki\n\n## Tarkista ennen\n').length, 1, 'osio ei ole ensimmäinen');
  assert.match(tarkistaEnnen(hyva.replace(rivi(5) + '\n', '')).join(), /4 AINA-\/EI-riviä/);
  assert.match(tarkistaEnnen(hyva.replace('(9.3)', '')).join(), /kohdan numero/);
});

test('jokaisessa tuotantopohjassa on alussa "Tarkista ennen" (KESKEN-lista vain lyhenee)', () => {
  const viat = pohjat.flatMap((n) => {
    const p = tarkistaEnnen(lue(n));
    if (TARKISTA_ENNEN_KESKEN.has(n)) return p.length ? [] : [`${n}: osio on jo kunnossa, poista se listalta TARKISTA_ENNEN_KESKEN`];
    return p.map((x) => `docs/moduulit/tuotantopohjat/${n}: ${x}`);
  });
  for (const n of TARKISTA_ENNEN_KESKEN) if (!pohjat.includes(n)) viat.push(`TARKISTA_ENNEN_KESKEN: ${n} ei ole pohja`);
  assert.deepEqual(viat, [], `\n${viat.join('\n')}\n`);
});
