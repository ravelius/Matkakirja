// Natiivin kultaisten jälkien vartija: verkkopelin logiikan muutos, joka muuttaa
// natiivin C#-portin kultaisia jälkiä, näkyy tässä. Ohje: tools/natiivi-kultaiset/vartija.mjs.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TIIVISTEET, laskeTiivisteet } from '../tools/natiivi-kultaiset/vartija.mjs';

test('natiivin kultaiset jäljet vastaavat verkkopelin logiikkaa', async () => {
  const odotetut = JSON.parse(readFileSync(TIIVISTEET, 'utf8'));
  const nyt = await laskeTiivisteet();
  const erot = Object.keys({ ...odotetut, ...nyt }).filter((k) => odotetut[k] !== nyt[k]);
  assert.deepEqual(erot, [],
    `Natiivin kultaiset jäljet muuttuivat (${erot.join(', ')}): verkkopelin sääntö tai laudan `
    + 'sisältö muuttui. Jos tarkoituksellista, aja `node tools/natiivi-kultaiset/vartija.mjs '
    + '--paivita` ja committaa tiivisteet.json; Pelikoodari päivittää natiivin portin.');
});
