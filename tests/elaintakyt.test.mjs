/*
 * ELÄINTÄKYJEN AINEISTO — 29 maata, 29 kuvaa, 29 paikkaa kartalla.
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
import { EUROPE } from '../js/packs/europe.js';
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
  assert.equal(ELAINTAKY_MAAT.length, 29, 'eläintäkyjä on 29 maassa');
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

test('molemmat laudat tuntevat jokaisen eläintäyn maan', () => {
  // Merkin nimilappu ja kortin kuvateksti lukevat maan nimen laudan
  // countryShapes-taulusta (js/elaintaky.js elaintakyMaanNimi). Ilman
  // riviä siellä kartalle ilmestyisi merkki maahan, jota lauta ei
  // muuten tunne.
  for (const iso of ELAINTAKY_MAAT) {
    assert.ok(MAAILMANKARTTA.map.countryShapes[iso],
      `${iso}: maailmankartta ei tunne maata`);
    assert.ok(EUROPE.map.countryShapes[iso], `${iso}: Euroopan lauta ei tunne maata`);
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

test('Euroopan laudalle jäävät täyt osuvat laudalle kokonaan', () => {
  /*
   * Katselutilan Euroopan lauta on 1000 x 1000 yksikköä eli lon
   * −11…41 — Vanjärvi jää sen itäpuolelle, ja Islannin oikea paikka
   * länsipuolelle. Ulkopuolelle jäävä piste on kelvollinen vastaus
   * (js/elaintaky.js jättää merkin piirtämättä), mutta REUNALLE ei saa
   * jäädä yhtään: puoliksi laudan ulkopuolella oleva merkki olisi vika.
   */
  const { width, height } = EUROPE.map;
  for (const iso of ELAINTAKY_MAAT) {
    const { lon, lat } = ELAINTAKYT[iso];
    const piste = projisoiLaudalle('europe', lon, lat);
    assert.ok(piste, `${iso}: Euroopan laudan projektio puuttuu`);
    const ulkona = piste.x < 0 || piste.y < 0 || piste.x > width || piste.y > height;
    if (ulkona) continue;
    assert.ok(piste.x > 30 && piste.x < width - 30 && piste.y > 30 && piste.y < height - 30,
      `${iso}: merkki jää Euroopan laudan reunalle (${piste.x.toFixed(0)}, ${piste.y.toFixed(0)})`);
  }
});
