/*
 * AIKAJANAMOOTTORI JA KEKSINTÖLINSSI.
 *
 * Kaksi asiaa, jotka rikkoutuvat hiljaa: tahti (kello ei pysähdy
 * tapahtumaan tai hyppää sen yli) ja data (paikka väärässä maassa,
 * kuvatiedosto kirjoitettu väärin). Moottorin askel on DOM:iton
 * funktio, joten se ajetaan tässä sellaisenaan; datan laudan
 * koordinaatit tarkistetaan pelin omalla projektiolla.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  aikajanaAskel, AIKAJANA_VIIVE_MS, AIKAJANA_PAALU_MS,
} from '../js/aikajana.js';
import { KEKSINNOT, LINSSI } from '../js/linssit/keksinnot.js';
import { projisoiLaudalle } from '../js/fokusmitat.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { LINSSIT } from '../js/linssit/rekisteri.js';
import { tarkistaLinssi } from '../js/linssit/kerros.js';

const TAPAHTUMAT = [{ vuosi: 1770 }, { vuosi: 1773, paalu: true }, { vuosi: 1780 }];
const TAHTI = { vuosiMs: 100, viiveMs: 500, paaluMs: 200 };

test('kello juoksee tyhjät vuodet ja pysähtyy tapahtumaan', () => {
  let tila = { vuosi: 1765, i: -1, viive: 0 };
  let askel = aikajanaAskel(tila, 250, TAPAHTUMAT, TAHTI);
  assert.equal(askel.syttyi, null);
  assert.ok(Math.abs(askel.tila.vuosi - 1767.5) < 1e-9);
  askel = aikajanaAskel(askel.tila, 400, TAPAHTUMAT, TAHTI);
  assert.equal(askel.syttyi, 0, 'ensimmäinen tapahtuma syttyy kun vuosi ylittyy');
  assert.equal(askel.tila.vuosi, 1770, 'kello napsahtaa tapahtuman vuoteen, ei sen yli');
  assert.equal(askel.tila.viive, 500);
});

test('viive kuluu ennen kuin kello jatkaa; merkkipaalu on lyhyempi', () => {
  let tila = { vuosi: 1770, i: 0, viive: 500 };
  let askel = aikajanaAskel(tila, 300, TAPAHTUMAT, TAHTI);
  assert.equal(askel.tila.vuosi, 1770, 'viiveen aikana kello seisoo');
  assert.equal(askel.tila.viive, 200);
  askel = aikajanaAskel(askel.tila, 300, TAPAHTUMAT, TAHTI);
  assert.equal(askel.tila.viive, 0);
  assert.equal(askel.tila.vuosi, 1770, 'viiveen loppukehys ei vielä liikuta kelloa');
  askel = aikajanaAskel(askel.tila, 300, TAPAHTUMAT, TAHTI);
  assert.equal(askel.syttyi, 1, 'paalu syttyy vuonna 1773');
  assert.equal(askel.tila.viive, 200, 'paalun viive');
});

test('viimeisen tapahtuman jälkeen askel ilmoittaa lopun', () => {
  let tila = { vuosi: 1780, i: 2, viive: 500 };
  let askel = aikajanaAskel(tila, 600, TAPAHTUMAT, TAHTI);
  assert.equal(askel.loppu, true);
  askel = aikajanaAskel({ vuosi: 1780, i: 2, viive: 0 }, 100, TAPAHTUMAT, TAHTI);
  assert.equal(askel.loppu, true);
});

test('oletustahti: tapahtuman viive on pidempi kuin paalun', () => {
  assert.ok(AIKAJANA_VIIVE_MS > AIKAJANA_PAALU_MS);
});

/* ==================== KEKSINTÖDATA ==================== */

test('keksintölinssi täyttää linssisopimuksen ja on rekisterissä', () => {
  const linssi = tarkistaLinssi({ LINSSI }, 'keksinnot');
  assert.equal(linssi.kerros, false);
  assert.ok(LINSSIT.some((r) => r.tunnus === 'keksinnot'), 'rekisteririvi puuttuu');
  assert.ok(linssi.aikajana.alku < KEKSINNOT[0].vuosi);
  assert.equal(linssi.aikajana.loppu, KEKSINNOT.at(-1).vuosi);
});

test('jokaisella tapahtumalla on vuosi, paikka, otsikko ja selite; vuodet nousevat', () => {
  let edellinen = 0;
  for (const t of KEKSINNOT) {
    assert.ok(Number.isInteger(t.vuosi), `${t.otsikko}: vuosi`);
    assert.ok(t.vuosi >= edellinen, `${t.otsikko}: vuodet eivät ole järjestyksessä`);
    edellinen = t.vuosi;
    for (const kentta of ['paikka', 'otsikko', 'selite', 'henkilo']) {
      assert.ok(typeof t[kentta] === 'string' && t[kentta].length > 0, `${t.otsikko}: ${kentta}`);
    }
    if (!t.paalu) {
      assert.ok(typeof t.juttu === 'string' && t.juttu.includes('\n\n'), `${t.otsikko}: juttu kahdessa kappaleessa`);
      assert.ok(t.lahde, `${t.otsikko}: lähde`);
    }
  }
});

test('laudan koordinaatit vastaavat asteita pelin omalla projektiolla', () => {
  const EUROOPPA = LINSSI.aikajana.alue;
  for (const t of KEKSINNOT) {
    assert.ok(Number.isFinite(t.x) && Number.isFinite(t.y), `${t.otsikko}: x/y`);
    assert.ok(t.x >= EUROOPPA.x && t.x <= EUROOPPA.x + EUROOPPA.w
      && t.y >= EUROOPPA.y && t.y <= EUROOPPA.y + EUROOPPA.h, `${t.otsikko}: Euroopan alueen ulkopuolella`);
    if (!Number.isFinite(t.lat)) continue;
    const p = projisoiLaudalle('maailmankartta', t.lon, t.lat);
    assert.ok(Math.abs(p.x - t.x) < 1 && Math.abs(p.y - t.y) < 1,
      `${t.otsikko}: x/y ei vastaa asteita (${p.x.toFixed(1)}, ${p.y.toFixed(1)})`);
  }
});

test('pelin omissa kaupungeissa valo osuu kaupungin laatan viereen', () => {
  const kaupungit = new Map(MAAILMANKARTTA.cities.map((c) => [c.name.toLowerCase(), c]));
  for (const t of KEKSINNOT) {
    const c = kaupungit.get(t.paikka.toLowerCase());
    if (!c) continue;
    const ero = Math.hypot(c.x - t.x, c.y - t.y);
    assert.ok(ero < 30, `${t.otsikko}: ${t.paikka} on ${ero.toFixed(1)} yksikköä laatasta`);
  }
});

test('kuvatiedostot ovat Commons-nimiä ilman polkua ja jokaisella on selite', () => {
  for (const t of KEKSINNOT) {
    for (const k of [t.kuva, t.ilmio]) {
      if (!k) continue;
      assert.ok(typeof k.tiedosto === 'string' && !k.tiedosto.includes('/') && /\.(jpe?g|png|gif)$/i.test(k.tiedosto),
        `${t.otsikko}: tiedostonimi ${k.tiedosto}`);
      assert.ok(k.selite, `${t.otsikko}: kuvaselite puuttuu`);
    }
  }
});
