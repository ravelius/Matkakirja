/*
 * EU-maiden hahmotelmanostojen lukitut ankkurit (Fablen erä I 19.9.2026,
 * PAATOKSET 48:n velka; raportti
 * docs/raportit/viesti-fable-ankkurilukitus-20260919.md).
 *
 * VARTIO: jokaisen maan taulun ankkuri on MAALLA (tools/maamaski.mjs,
 * sama ne50-aineisto kuin pelin rantaviiva) — paitsi saari, joka
 * puuttuu 1:50M-maskista, ja tyypin 'meri' nosto (meri on kohde,
 * Fablen päätös K2). Taulussa on vain maan omia nostoja, ja maat eivät
 * ole LUKITUT_MAAT-listalla (hahmotelmat pysyvät elävinä).
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { onMaalla } from '../tools/maamaski.mjs';
import { paakartanNostot } from '../tools/tarkista-nostopaikat.mjs';
import { LUKITUT_MAAT, lukittuAnkkuri, lukittujaAnkkureita } from '../js/pallolauta/nostoankkurit.js';
import { NOSTOANKKURIT_FRA } from '../js/packs/nostoankkurit-fra.js';

const MAAT = ['ESP', 'ITA', 'DEU', 'PRT', 'GRC', 'AUT', 'NLD', 'BEL', 'POL', 'CZE', 'DNK', 'HUN', 'SWE'];
const TAULUT = Object.fromEntries(await Promise.all(MAAT.map(async (iso) => [
  iso, (await import(`../js/packs/nostoankkurit-${iso.toLowerCase()}.js`))[`NOSTOANKKURIT_${iso}`],
])));
const { kaikki } = paakartanNostot();
/** Maan oma rivi avaimella (sama id voi olla usealla maalla eri paikassa). */
const rivi = (iso, avain) => kaikki.find((r) => r.iso === iso && `nosto:${r.id}` === avain);
/** Saaret, jotka puuttuvat 1:50M-maskista (ks. tools/lukitse-nostoankkurit-maalle.mjs). */
const SAARET = new Set(['hahmotelma-stromboli']);

test('jokaisella 13 maalla on ankkuritaulu, ja ankkurit ovat maan omia nostoja', () => {
  for (const iso of MAAT) {
    const taulu = TAULUT[iso];
    assert.ok(taulu && Object.keys(taulu).length > 0, `${iso}: taulu tyhjä`);
    for (const avain of Object.keys(taulu)) {
      assert.match(avain, /^nosto:/, `${iso}: ${avain}`);
      assert.ok(rivi(iso, avain), `${iso}: ${avain} ei ole maan oma nosto`);
    }
  }
});

test('maakohteen ankkuri on maalla; saari ja meri pitävät pisteensä', () => {
  for (const iso of MAAT) {
    for (const [avain, a] of Object.entries(TAULUT[iso])) {
      const r = rivi(iso, avain);
      if (r?.tyyppi === 'meri' || r?.tyyppi === 'saari' || SAARET.has(r?.id)) continue;
      assert.ok(onMaalla(a.lat, a.lng), `${iso}: ${avain} on merellä (${a.lat}, ${a.lng})`);
    }
  }
});

test('peli lukee maiden taulut, FRA voittaa, eikä poltto muutu', () => {
  assert.deepEqual([...LUKITUT_MAAT], ['FRA']);
  const ita = Object.keys(TAULUT.ITA)[0];
  assert.deepEqual(lukittuAnkkuri(ita), { lat: TAULUT.ITA[ita].lat, lng: TAULUT.ITA[ita].lng });
  const fra = Object.keys(NOSTOANKKURIT_FRA)[0];
  assert.deepEqual(lukittuAnkkuri(fra), NOSTOANKKURIT_FRA[fra]);
  assert.ok(lukittujaAnkkureita() >= Object.keys(NOSTOANKKURIT_FRA).length + MAAT.length);
});

test('sama id eri maissa: kukin maa saa oman ankkurinsa (Välimeri ei hyppää Touloniin)', () => {
  const esp = lukittuAnkkuri('nosto:valimeri', 'ESP');
  const fra = lukittuAnkkuri('nosto:valimeri', 'FRA');
  assert.ok(esp && fra, 'Välimeren ankkuri puuttuu');
  assert.ok(esp.lng < 3 && fra.lng > 4, `ESP ${JSON.stringify(esp)} FRA ${JSON.stringify(fra)}`);
  // Maa ilman taulua ei saa toisen maan ankkuria.
  assert.equal(lukittuAnkkuri('nosto:valimeri', 'SYR'), null);
});
