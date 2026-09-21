/*
 * Linssisarja hiomassa-tauluun (omistaja 21.9.2026; Fablen tilaus
 * posti/fable-codexille-linssi-ikonit-20260921.md): 46 hiomassa-riviä
 * rekisterissä (47 − keksinnöt, joka on jo valmis), tunnus = Codexin
 * tiedostonimi ilman linssi-etuliitettä, ikoni vain saapuneilla erillä,
 * eikä tietäjäpistekynnys myönnä hiomassa-linssejä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';

import {
  HIOMASSA_A, HIOMASSA_B, HIOMASSA_C, HIOMASSA_D, HIOMASSA_SARJA, LINSSIT,
} from '../js/linssit/rekisteri.js';
import { Game } from '../js/game.js';
import { packById } from '../js/pack.js';
import { hiomassa, hiomassaNimi, omistetut, tarkistaKynnys } from '../js/linssit/omistus.js';

test('sarja: 19 + 17 + 4 + 4 = 44 hiomassa-riviä, tunnukset yksilöllisiä, valmiit linssit eivät toistu', () => {
  assert.equal(HIOMASSA_A.length, 19);
  assert.equal(HIOMASSA_B.length, 17);
  assert.equal(HIOMASSA_C.length, 4);
  assert.equal(HIOMASSA_D.length, 4);
  assert.equal(HIOMASSA_SARJA.length, 44);
  const tunnukset = LINSSIT.map((r) => r.tunnus);
  assert.equal(new Set(tunnukset).size, tunnukset.length, 'tunnus toistuu');
  assert.ok(!HIOMASSA_SARJA.some((r) => r.tunnus === 'keksinnot'));
  assert.ok(!HIOMASSA_SARJA.some((r) => r.tunnus === 'kellot'), 'kellot on valmis linssi');
  assert.ok(!HIOMASSA_SARJA.some((r) => r.tunnus === 'lippuarvaus'), 'lippuarvaus on valmis linssi');
  const lippu = LINSSIT.find((r) => r.tunnus === 'lippuarvaus');
  assert.equal(typeof lippu?.tuo, 'function');
  assert.equal(lippu?.ikoni, 'assets/linssit/ikonit/linssi-lippuarvaus.webp');
  const kellot = LINSSIT.find((r) => r.tunnus === 'kellot');
  assert.equal(typeof kellot?.tuo, 'function');
  assert.equal(kellot?.ikoni, 'assets/linssit/ikonit/linssi-kellot.webp');
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

test('ikoni: jokaisen rivin kuva on assets/linssit/ikonit/linssi-<tunnus>.webp ≤ 192 px ja tiedosto on olemassa', () => {
  for (const r of HIOMASSA_SARJA) {
    assert.equal(r.ikoni, `assets/linssit/ikonit/linssi-${r.tunnus}.webp`);
    assert.ok(existsSync(new URL(`../${r.ikoni}`, import.meta.url)), `${r.ikoni} puuttuu`);
  }
  // Fablen päätös 21.9.2026: repoon vain webp; 512 px:n PNG:t jäävät Codexin kansioon.
  const kansio = new URL('../assets/linssit/ikonit/', import.meta.url);
  const tiedostot = readdirSync(kansio);
  assert.ok(!tiedostot.some((f) => f.endsWith('.png')), 'png repossa');
  for (const f of tiedostot.filter((t) => t.endsWith('.webp'))) {
    const tavut = readFileSync(new URL(f, kansio));
    // WebP VP8X: leveys ja korkeus 24-bittisinä tavuissa 24–29 (arvo − 1).
    assert.equal(tavut.toString('ascii', 0, 4), 'RIFF', f);
    assert.equal(tavut.toString('ascii', 8, 12), 'WEBP', f);
    const w = tavut.toString('ascii', 12, 16) === 'VP8X' ? 1 + tavut.readUIntLE(24, 3) : null;
    if (w !== null) assert.ok(w <= 192, `${f}: ${w} px`);
    assert.ok(tavut.length < 60000, `${f}: ${tavut.length} tavua`);
  }
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
