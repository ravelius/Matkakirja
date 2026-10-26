/*
 * LINSSIEN ESITTELYT (omistaja 29.9.2026, loki 09.12): linssin napautus
 * pelin uudessa Linssit-näkymässä näyttää havainnekuvan ja esittelyn
 * siitä, mitä linssi näyttää/tekee. Jokaisella pelaajalle avatulla
 * linssillä (rekisterin `tuo`-rivit) on oltava LINSSI.esittely, 1-2
 * lausetta, enintään 160 merkkiä (Pelikoodari, pelikoodari-pillerivalikko:
 * napautusnäkymä lukee esittelyn ja käyttää lyhyt-kenttää vain varana).
 * HUOM: kenttä ei ole `selite` — se on jo varattu karttaselitteen
 * funktioksi kahdessa linssissä (topografia.js, vesistot.js, luettu
 * js/ui.js:n linssiSelite-kortissa `linssi.selite?.()`).
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { LINSSIT } from '../js/linssit/rekisteri.js';

const AVATUT = LINSSIT.filter((rivi) => typeof rivi.tuo === 'function');

test('jokaisella avatulla linssillä on esittely, 1-2 lausetta, enintään 160 merkkiä', async () => {
  assert.ok(AVATUT.length > 0, 'rekisterissä on avattuja linssejä testattavaksi');
  for (const { tunnus, tuo } of AVATUT) {
    const { LINSSI } = await tuo();
    assert.ok(LINSSI, `${tunnus}: moduuli ei vie LINSSI-vakiota`);
    assert.equal(typeof LINSSI.esittely, 'string', `${tunnus}: esittely puuttuu tai ei ole merkkijono`);
    assert.ok(LINSSI.esittely.trim().length > 0, `${tunnus}: esittely on tyhjä`);
    assert.ok(LINSSI.esittely.length <= 160, `${tunnus}: esittely ${LINSSI.esittely.length} merkkiä (katto 160)`);
  }
});
