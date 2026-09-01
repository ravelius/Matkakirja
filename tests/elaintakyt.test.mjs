/*
 * ELÄINTÄKYJEN AINEISTO — 27 maata, 27 kuvaa, 27 paikkaa kartalla
 * (BIH ja TUR poistettu 1.9.2026 kaksoiskappaleina, ks.
 * js/packs/elaintakyt.js; palaavat uusina eläiminä).
 *
 * Merkin paikka on tässä pelissä sisältöä siinä missä teksti: väärään
 * kohtaan piirretty eläin väittää jotain maantieteestä. Paikkoja ei voi
 * kuitenkaan katsoa silmin joka julkaisussa, joten ne tarkistetaan
 * koneellisesti — piste on maalla, oman maansa rajojen sisällä ja irti
 * kaupunkimerkeistä.
 *
 * Sama tarkistus vartioi myös sitä, ettei kuva pääse eksymään: kortti
 * hakee kuvan verkosta vasta avatessaan (js/elaintaky.js), joten
 * puuttuva tiedosto ei kaataisi mitään — se jättäisi vain kortin
 * kuvattomaksi kenenkään huomaamatta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';

import { ELAINTAKYT, ELAINTAKY_MAAT } from '../js/packs/elaintakyt.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { isOnLand } from '../js/mapart.js';
import { projisoiLaudalle } from '../js/fokusmitat.js';

const JUURI = new URL('..', import.meta.url);

/**
 * ISLANTI ON RAJATESTIN POIKKEUS, JA SYY ON LAUDAN VANHASSA DATASSA.
 *
 * Maailmankartan ISL-muoto (countryShapes) on Euroopan laudan
 * tyylitellyllä paikalla (lon ≈ −7,7, lat ≈ 69,8), vaikka piirretty
 * saari ja Islanti-kaupunki ovat oikeassa paikassaan (lon ≈ −21,8).
 * Merkki noudattaa piirrettyä saarta — se on se, minkä pelaaja näkee —
 * eikä siis osu maan omaan monikulmioon. Muoto on korjattava joskus,
 * mutta se on eri työ kuin tämä.
 */
const RAJATESTIN_POIKKEUS = new Set(['ISL']);

/** Lyhin sallittu etäisyys kaupunkimerkkiin maailmankartan yksikköinä. */
const VAHIN_ETAISYYS_KAUPUNKIIN = 35;

/** Lyhin sallittu etäisyys toiseen eläintäkyyn samalla laudalla. */
const VAHIN_ETAISYYS_TAKYYN = 30;

function sisallaRenkaassa([px, py], rengas) {
  let osuu = false;
  for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i++) {
    const [xi, yi] = rengas[i];
    const [xj, yj] = rengas[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) osuu = !osuu;
  }
  return osuu;
}

const paikat = new Map(ELAINTAKY_MAAT.map((iso) => {
  const { lon, lat } = ELAINTAKYT[iso];
  return [iso, projisoiLaudalle('maailmankartta', lon, lat)];
}));

test('jokaisella eläintäyllä on kaanoniteksti, kuva ja paikka', () => {
  assert.equal(ELAINTAKY_MAAT.length, 27, 'eläintäkyjä on 27 maassa (29 − BIH − TUR)');
  for (const iso of ELAINTAKY_MAAT) {
    const taky = ELAINTAKYT[iso];
    assert.match(iso, /^[A-Z]{3}$/, `${iso}: avain on kolmikirjaiminen maatunnus`);
    for (const kentta of ['elain', 'otsikko', 'teksti', 'kuva']) {
      assert.ok(typeof taky[kentta] === 'string' && taky[kentta].trim(),
        `${iso}: kenttä ${kentta} puuttuu tai on tyhjä`);
    }
    assert.ok(taky.teksti.length > 120, `${iso}: teksti on epäilyttävän lyhyt`);
    assert.ok(Number.isFinite(taky.lon) && Number.isFinite(taky.lat),
      `${iso}: lon/lat puuttuu`);
    assert.equal(taky.kuva, `assets/elaimet/elain-${iso.toLowerCase()}.jpg`,
      `${iso}: kuvan nimi ei noudata kaavaa`);
    assert.ok(existsSync(new URL(taky.kuva, JUURI)),
      `${iso}: kuvatiedostoa ${taky.kuva} ei ole — aja tools/elaintakykuvat.mjs`);
  }
});

test('maailmankartta tuntee jokaisen eläintäyn maan', () => {
  // Merkin nimilappu ja kortin kuvateksti lukevat maan nimen laudan
  // countryShapes-taulusta (js/elaintaky.js elaintakyMaanNimi). Ilman
  // riviä siellä kartalle ilmestyisi merkki maahan, jota lauta ei
  // muuten tunne. (Euroopan erillislauta poistui — Raamattu 30.8.2026 —
  // joten maailmankartta on ainoa lauta, jolla merkit piirtyvät.)
  for (const iso of ELAINTAKY_MAAT) {
    assert.ok(MAAILMANKARTTA.map.countryShapes[iso],
      `${iso}: maailmankartta ei tunne maata`);
  }
});

test('eläintäky on maalla eikä merellä', () => {
  for (const iso of ELAINTAKY_MAAT) {
    const { x, y } = paikat.get(iso);
    assert.ok(isOnLand([x, y], MAAILMANKARTTA.map),
      `${iso}: merkki jäisi veteen (${x.toFixed(0)}, ${y.toFixed(0)})`);
  }
});

test('eläintäky on oman maansa rajojen sisällä', () => {
  for (const iso of ELAINTAKY_MAAT) {
    if (RAJATESTIN_POIKKEUS.has(iso)) continue;
    const { x, y } = paikat.get(iso);
    const renkaat = MAAILMANKARTTA.map.countryShapes[iso].renkaat ?? [];
    assert.ok(renkaat.some((rengas) => sisallaRenkaassa([x, y], rengas)),
      `${iso}: merkki on maan rajojen ulkopuolella`);
  }
});

test('eläintäky ei istu kaupunkimerkin päällä eikä toisen täyn päällä', () => {
  // Kaksi merkkiä samassa pisteessä on yksi merkki (sama sääntö kuin
  // vihreällä pisteellä, js/fokuspiste.js PISTE_ERO_MIN).
  for (const iso of ELAINTAKY_MAAT) {
    const { x, y } = paikat.get(iso);
    for (const kaupunki of MAAILMANKARTTA.cities) {
      const etaisyys = Math.hypot(kaupunki.x - x, kaupunki.y - y);
      assert.ok(etaisyys >= VAHIN_ETAISYYS_KAUPUNKIIN,
        `${iso}: merkki on ${etaisyys.toFixed(0)} yksikön päässä kaupungista `
        + `${kaupunki.name} (vähintään ${VAHIN_ETAISYYS_KAUPUNKIIN})`);
    }
    for (const toinen of ELAINTAKY_MAAT) {
      if (toinen === iso) continue;
      const b = paikat.get(toinen);
      const etaisyys = Math.hypot(b.x - x, b.y - y);
      assert.ok(etaisyys >= VAHIN_ETAISYYS_TAKYYN,
        `${iso} ja ${toinen} ovat ${etaisyys.toFixed(0)} yksikön päässä toisistaan`);
    }
  }
});

