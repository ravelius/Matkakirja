/*
 * MUOTO (SK 17.11.2026; suunnitelma 20261117-maakartan-kohteet kohta 8): data/muoto.json = tyyppi per karttavalon id.
 * Vartioi: jokainen avain on viennin karttavalo (kirjoitusvirhe ei katoa hiljaa), tyyppi on sallittu, Ranskassa 67 riviä.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { kokoaVienti } from '../tools/vienti/vie-sisalto.mjs';

const TYYPIT = ['kirkko', 'linna', 'palatsi', 'luostari', 'raunio', 'silta', 'luola', 'muistomerkki', 'megaliitti',
  'vuori', 'maasto', 'vesi', 'kaupunki', 'ei-muotoa'];
const muoto = JSON.parse(readFileSync(new URL('../data/muoto.json', import.meta.url), 'utf8'));
const { tiedostot } = await kokoaVienti();
const valot = new Map(JSON.parse(tiedostot.get('kokoelmat/karttavalot.json')).alkiot.map((v) => [v.id, v]));

test('muoto.json Ranska: 67 riviä, avain on karttavalo ja näkyy maatasolla, tyyppi sallittu', () => {
  const rivit = Object.entries(muoto.ranska);
  assert.equal(rivit.length, 67);
  for (const [id, m] of rivit) {
    assert.ok(valot.has(id), `${id}: ei karttavaloa`);
    assert.ok(TYYPIT.includes(m.tyyppi), `${id}: tuntematon tyyppi ${m.tyyppi}`);
  }
});
