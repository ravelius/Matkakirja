/*
 * JOKAISELLA NOSTOLLA PULUN KYSYMYKSET (Raamattu 2.218, SITOVA; omistaja
 * 9.11.2026 klo 13.18: "jokaisesta uudesta nostosta kun se kirjoitetaan
 * täytyy tarkistaa että sille on kirjoitettu kysymyksiä").
 *
 * Uuden noston kirjoittaja kirjoittaa sille kysymykset (vähintään kaksi)
 * samassa haarassa. Testi kokoaa sisältöpaketin kuten vienti
 * (tools/vienti/vie-sisalto.mjs kokoaVienti) ja laskee jokaiselle
 * karttavalolle kortin kirjoitetut kysymykset samalla säännöllä kuin natiivi
 * (tools/vienti/nosto-kysymykset.mjs). Nykyiset puutteet ovat poikkeuslistalla
 * tests/fixtures/nosto-kysymykset-poikkeukset.tsv, joka vain lyhenee.
 *
 * Natiivin pari: proto Peli-testit/Testit/NostoKysymyksetTestit.cs (vartioi
 * myös Pulun valmiit kysymykset ämpäristä).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { kokoaVienti } from '../tools/vienti/vie-sisalto.mjs';
import { VAHIMMAT, luePoikkeukset, nostojenKysymykset } from '../tools/vienti/nosto-kysymykset.mjs';

const POIKKEUKSET = new URL('./fixtures/nosto-kysymykset-poikkeukset.tsv', import.meta.url);
const { tiedostot } = await kokoaVienti();
const rivit = nostojenKysymykset(tiedostot);
const poikkeukset = luePoikkeukset(POIKKEUKSET);

test('jokaisella uudella nostolla on vähintään kaksi kirjoitettua kysymystä', () => {
  const uudet = rivit.filter((r) => r.kirjoitetut < VAHIMMAT && !poikkeukset.has(r.id));
  assert.deepEqual(
    uudet.map((r) => `${r.id} ${r.nimi} (${r.kirjoitetut})`), [],
    'Nostolta puuttuvat kysymykset: kirjoita sille vähintään kaksi kysymystä `kysymykset`-kenttään '
      + '(fokuskohde/maastokohde/hahmotelma tai NOSTO_MAAT). Älä lisää sitä poikkeuslistalle (Raamattu 2.218).',
  );
});

test('poikkeuslista vain lyhenee: kysymyksensä saanut tai poistunut nosto pois listalta', () => {
  const nyt = new Map(rivit.map((r) => [r.id, r]));
  const vanhat = [...poikkeukset.keys()].filter((id) => !nyt.has(id) || nyt.get(id).kirjoitetut >= VAHIMMAT);
  assert.deepEqual(
    vanhat.map((id) => `${id} ${nyt.has(id) ? `(${nyt.get(id).kirjoitetut} kysymystä)` : '(ei enää nostoa)'}`), [],
    'Poista rivit tiedostosta tests/fixtures/nosto-kysymykset-poikkeukset.tsv.',
  );
});

test('laskenta löytää kohteiden ja täkynostojen kysymykset (tunnukset vastaavat pakettia)', () => {
  // Vartija sille, ettei tunnusten muutos tee kaikista nostoista "kysymyksettömiä" huomaamatta.
  const kysymyksin = (laji) => rivit.filter((r) => r.laji === laji && r.kirjoitetut >= VAHIMMAT).length;
  assert.ok(rivit.length > 3000, `karttavaloja ${rivit.length}`);
  assert.ok(kysymyksin('kohde') > 2000, `kohteita kysymyksin ${kysymyksin('kohde')}`);
  assert.ok(kysymyksin('nosto') > 50, `täkynostoja kysymyksin ${kysymyksin('nosto')}`);
});
