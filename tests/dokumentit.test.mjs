/*
 * Ohjedokumentit löytyvät yhdestä ovesta.
 *
 * Omistajan linjaus 15.8.2026: "Raamatussa pitää olla listattuna muut
 * ohjedokumentit mikäli sellaisia on. Kehitystä vaihdellaan sessioiden
 * välillä ja rikkinäinen puhelin on kaikkein pahin."
 *
 * Vanhan Raamatun käsin pidetty ohjekartta (luku 13) korvautui 12.11.2026
 * ovella `node tools/kirjaa.mjs hae`, joka käy ohjeet läpi itse
 * (tools/kirjaa-ohjeet.mjs; KK 12.11. 17.30, vanhan js:n poisto vaihe 1).
 * Nämä testit pitävät linjauksen koneellisena: docs/-ohje ei voi jäädä
 * oven ulkopuolelle, eikä kortti voi viitata kadonneeseen tiedostoon.
 * Arkisto ja raportit ovat oven ulkopuolella tarkoituksella — ne eivät
 * ole ohjeita, ja arkistoidut tiedostot kantavat otsikkohuomautusta.
 * Päätösloki docs/raamattu-loki/ löytyy omalla ovellaan tools/loki-hae.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ohjeTiedostot } from '../tools/kirjaa-ohjeet.mjs';

const JUURI = fileURLToPath(new URL('../', import.meta.url));
const DOCS = new URL('../docs/', import.meta.url);

/** Raamatun uusi koti: kortit, perusta ja KIRJASTOT (docs/raamattu/**.md). */
function korttiTekstit() {
  const out = [];
  const kayLapi = (d) => {
    for (const f of readdirSync(d)) {
      const q = join(d, f);
      if (statSync(q).isDirectory()) kayLapi(q); else if (f.endsWith('.md')) out.push(q);
    }
  };
  kayLapi(join(JUURI, 'docs/raamattu'));
  return out.map((p) => readFileSync(p, 'utf8')).join('\n');
}

test('jokainen docs/-ohjedokumentti löytyy ovesta (kirjaa hae)', () => {
  const ovi = new Set(ohjeTiedostot(JUURI).map((p) => relative(JUURI, p)));
  const tiedostot = [
    ...readdirSync(DOCS).filter((n) => n.endsWith('.md')),
    ...(existsSync(new URL('moduulit/', DOCS))
      ? readdirSync(new URL('moduulit/', DOCS))
        .filter((n) => n.endsWith('.md')).map((n) => `moduulit/${n}`)
      : []),
  ];
  assert.ok(tiedostot.length >= 8, `ohjeita vain ${tiedostot.length}`);
  for (const nimi of tiedostot) {
    assert.ok(ovi.has(`docs/${nimi}`),
      `docs/${nimi} ei löydy ovesta (tools/kirjaa-ohjeet.mjs) — lisää kansio luetteloon tai arkistoi `
      + 'tiedosto docs/arkisto/-kansioon otsikkohuomautuksella.');
  }
});

test('korttien docs/-viitteissä ei ole kadonneita tiedostoja', () => {
  // Kaikki docs/-polut, joihin kortit viittaavat, ovat olemassa —
  // kuollut viite kortilla on yhtä paha kuin puuttuva ohje.
  const viitteet = [...korttiTekstit().matchAll(/docs\/[\w./-]+\.md/g)].map((m) => m[0]);
  assert.ok(viitteet.length >= 8, `kortit vaikuttavat tyhjiltä (${viitteet.length} viitettä)`);
  for (const polku of new Set(viitteet)) {
    assert.ok(existsSync(new URL(`../${polku}`, import.meta.url)),
      `kortti viittaa tiedostoon ${polku}, jota ei ole — päivitä kortti (node tools/kirjaa.mjs kortti).`);
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
