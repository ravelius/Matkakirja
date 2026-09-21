/*
 * Linssisarja hiomassa-tauluun (omistaja 21.9.2026; Fablen tilaus
 * posti/fable-codexille-linssi-ikonit-20260921.md): 46 hiomassa-riviä
 * rekisterissä (47 − keksinnöt, joka on jo valmis), tunnus = Codexin
 * tiedostonimi ilman linssi-etuliitettä, ikoni vain saapuneilla erillä,
 * eikä tietäjäpistekynnys myönnä hiomassa-linssejä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';

import {
  HIOMASSA_A, HIOMASSA_B, HIOMASSA_C, HIOMASSA_D, HIOMASSA_SARJA, LINSSIT,
} from '../js/linssit/rekisteri.js';
import { Game } from '../js/game.js';
import { packById } from '../js/pack.js';
import { hiomassa, hiomassaNimi, omistetut, tarkistaKynnys } from '../js/linssit/omistus.js';

test('sarja: 19 + 17 + 6 + 4 = 46 hiomassa-riviä, tunnukset yksilöllisiä, keksinnöt ei toistu', () => {
  assert.equal(HIOMASSA_A.length, 19);
  assert.equal(HIOMASSA_B.length, 17);
  assert.equal(HIOMASSA_C.length, 6);
  assert.equal(HIOMASSA_D.length, 4);
  assert.equal(HIOMASSA_SARJA.length, 46);
  const tunnukset = LINSSIT.map((r) => r.tunnus);
  assert.equal(new Set(tunnukset).size, tunnukset.length, 'tunnus toistuu');
  assert.ok(!HIOMASSA_SARJA.some((r) => r.tunnus === 'keksinnot'));
  for (const r of HIOMASSA_SARJA) {
    assert.equal(r.tila, 'hiomassa');
    assert.equal(r.manner, null);
    assert.match(r.tunnus, /^[a-z0-9-]+$/, r.tunnus);
    assert.ok(r.nimi, `${r.tunnus}: nimi`);
    assert.equal(typeof r.tuo, 'undefined', `${r.tunnus}: hiomassa-rivillä ei tuontia`);
    assert.ok(hiomassa(r.tunnus));
    assert.equal(hiomassaNimi(r.tunnus), r.nimi);
  }
});

test('ikoni: erien A ja C kuva on assets/linssit/ikonit/linssi-<tunnus>.png ja tiedosto on olemassa', () => {
  for (const r of [...HIOMASSA_A, ...HIOMASSA_C]) {
    assert.equal(r.ikoni, `assets/linssit/ikonit/linssi-${r.tunnus}.png`);
    assert.ok(existsSync(new URL(`../${r.ikoni}`, import.meta.url)), `${r.ikoni} puuttuu`);
  }
  // B ja D: ei ikonia ennen Codexin erää → laukku käyttää yhteistä hiomassa-kuvaa.
  for (const r of [...HIOMASSA_B, ...HIOMASSA_D]) assert.equal(r.ikoni, undefined, r.tunnus);
});

test('tietäjäpistekynnys ei myönnä hiomassa-linssiä', () => {
  const game = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'lontoo' }], pack: packById('maailmankartta'), seed: 1 });
  const player = game.player;
  const uudet = [];
  let ennen = 0;
  for (const raja of [400, 800, 1400, 2200, 5000, 9000]) {
    uudet.push(...tarkistaKynnys(game, player, ennen, raja));
    ennen = raja;
  }
  assert.ok(uudet.length > 0);
  for (const t of uudet) assert.ok(!hiomassa(t), `${t} on hiomassa`);
  for (const t of omistetut(game, player)) assert.ok(!hiomassa(t), `${t} on hiomassa`);
});
