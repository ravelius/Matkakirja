/*
 * Ohjedokumenttien kartta pysyy täydellisenä.
 *
 * Omistajan linjaus 15.8.2026: "Raamatussa pitää olla listattuna muut
 * ohjedokumentit mikäli sellaisia on. Kehitystä vaihdellaan sessioiden
 * välillä ja rikkinäinen puhelin on kaikkein pahin."
 *
 * Nämä testit tekevät linjauksesta koneellisen: docs/-kansioon ei voi
 * ilmestyä ohjedokumenttia, jota Raamatun kartta ei tunne, eikä
 * kartalta voi kadota tiedostoa, joka on yhä olemassa. Arkisto ja
 * raportit ovat kartan ulkopuolella tarkoituksella — ne eivät ole
 * ohjeita, ja arkistoidut tiedostot kantavat otsikkohuomautusta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';

const RAAMATTU = readFileSync(new URL('../js/tyohuone-raamattu.js', import.meta.url), 'utf8');
const DOCS = new URL('../docs/', import.meta.url);

test('jokainen docs/-ohjedokumentti on Raamatun kartalla', () => {
  const tiedostot = readdirSync(DOCS)
    .filter((n) => n.endsWith('.md'));
  for (const nimi of tiedostot) {
    assert.ok(RAAMATTU.includes(`docs/${nimi}`),
      `docs/${nimi} puuttuu Raamatun ohjedokumenttikartalta `
      + '(js/tyohuone-raamattu.js) — lisää se karttaan tai arkistoi '
      + 'tiedosto docs/arkisto/-kansioon otsikkohuomautuksella.');
  }
});

test('Raamatun kartalla ei ole kadonneita tiedostoja', () => {
  // Kaikki docs/-polut, joihin Raamattu viittaa, ovat olemassa —
  // kuollut viite kartalla on yhtä paha kuin puuttuva rivi.
  const viitteet = [...RAAMATTU.matchAll(/docs\/[\w./-]+\.md/g)].map((m) => m[0]);
  assert.ok(viitteet.length >= 8, `kartta vaikuttaa tyhjältä (${viitteet.length} viitettä)`);
  for (const polku of new Set(viitteet)) {
    assert.ok(existsSync(new URL(`../${polku}`, import.meta.url)),
      `Raamattu viittaa tiedostoon ${polku}, jota ei ole — päivitä kartta.`);
  }
});

test('arkistoitu tilannekuva kantaa otsikkohuomautusta', () => {
  // "Lue tämä ensin" -paperi ilman arkistoleimaa on rikkinäisen
  // puhelimen pahin muoto: sessio voi luulla sitä voimassa olevaksi.
  const arkisto = new URL('../docs/arkisto/', import.meta.url);
  for (const nimi of readdirSync(arkisto).filter((n) => n.endsWith('.md'))) {
    const alku = readFileSync(new URL(nimi, arkisto), 'utf8').slice(0, 400);
    assert.ok(/ARKISTOITU|arkistoitu|Arkistoitu/.test(alku),
      `docs/arkisto/${nimi}: puuttuu arkistointihuomautus tiedoston alusta.`);
  }
});
