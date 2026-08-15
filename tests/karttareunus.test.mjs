// Kohdekartan reunus: juliste jatkuu ydinrajauksen yli
// (js/packs/maakartat.js: piirtoRajat, ydinAla, karttaKuvasuhde).
//
// Omistajan tilaus 15.8.2026: "sitä voisi lisätä piirroksessa että
// kartta jatkuisi pidemmälle." Juliste piirretään laajemmalta
// alueelta, mutta LEPOTILASSA LEHTI NÄYTTÄÄ TÄSMÄLLEEN ENTISEN
// RAJAUKSEN. Se lupaus on geometriaa, ei silmämääräinen arvio, joten
// se vahditaan tässä:
//
//   1. piirtoRajat on samasta keskipisteestä ja ydinrajaus on
//      kokonaan sen sisällä;
//   2. ydinrajaus täyttää kehyksen tarkalleen — kehyksen kuvasuhde on
//      sama kuin ennen laajennusta (tämä on koko asettelun ehto,
//      ui.js: aspect-ratio kehykselle ja lavalle);
//   3. kohdepiste on ruudulla samassa kohdassa kuin ennen: kuvan
//      prosentti muuttui, ydinrajauksen prosentti ei;
//   4. kainalo pysyy lepotilan näkymän sisällä;
//   5. laajentamaton kartta ei muutu millään tavalla.

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  KAUPUNKIKARTAT, karttapiste, mittakaava, ydinAla, karttaKuvasuhde,
} from '../js/packs/maakartat.js';

const laajennetut = Object.entries(KAUPUNKIKARTAT).filter(([, k]) => k.piirtoRajat);
const laajentamattomat = Object.entries(KAUPUNKIKARTAT).filter(([, k]) => !k.piirtoRajat);

const keski = (r) => ({ lat: (r.pohjoinen + r.etela) / 2, lon: (r.ita + r.lansi) / 2 });

test('piirtoRajat on samasta keskipisteestä ja ydinrajaus sen sisällä', () => {
  assert.ok(laajennetut.length, 'yhdelläkään kartalla ei ole piirtoRajat-lohkoa');
  for (const [avain, kartta] of laajennetut) {
    const a = keski(kartta.rajat);
    const b = keski(kartta.piirtoRajat);
    // Piirtäjä pyöristää rajat viiteen desimaaliin (noin metri), joten
    // keskipiste saa heittää saman verran mutta ei enempää: sama
    // keskipiste on se, mikä pitää lepotilan näkymän kohdallaan.
    assert.ok(Math.abs(a.lat - b.lat) < 1e-5, `${avain}: keskileveys siirtyi`);
    assert.ok(Math.abs(a.lon - b.lon) < 1e-5, `${avain}: keskipituus siirtyi`);
    const r = kartta.rajat;
    const p = kartta.piirtoRajat;
    assert.ok(p.pohjoinen > r.pohjoinen && p.etela < r.etela
      && p.lansi < r.lansi && p.ita > r.ita, `${avain}: ydinrajaus ei ole reunuksen sisällä`);
  }
});

test('ydinrajaus täyttää kehyksen tarkalleen', () => {
  for (const [avain, kartta] of laajennetut) {
    const ydin = ydinAla(kartta);
    // Kehyksen kuvasuhde asettelussa = lavan kuvasuhde × (leveysosuus
    // / korkeusosuus). Sen on oltava sama kuin ydinrajauksen oma
    // kuvasuhde, tai lepotilan näkymä olisi eri muotoinen kuin ennen.
    const kehyksessa = karttaKuvasuhde(kartta.piirtoRajat) * (ydin.leveys / ydin.korkeus);
    const ennen = karttaKuvasuhde(kartta.rajat);
    assert.ok(Math.abs(kehyksessa / ennen - 1) < 1e-4,
      `${avain}: kehyksen kuvasuhde ${kehyksessa.toFixed(5)} ≠ ${ennen.toFixed(5)}`);
  }
});

test('kohdepisteet ovat lepotilassa samassa kohdassa kuin ennen', () => {
  for (const [avain, kartta] of laajennetut) {
    const ydin = ydinAla(kartta);
    const r = kartta.rajat;
    for (const kohde of kartta.kohteet ?? []) {
      // Kainalon kohde asemoidaan omalla haarallaan (karttapiste),
      // eikä sitä lasketa rajauksesta — se tarkistetaan alempana.
      const kainalossa = (kartta.kainalot ?? []).some((kainalo) => {
        const kr = kainalo.rajat;
        return kohde.lat <= kr.pohjoinen && kohde.lat >= kr.etela
          && kohde.lon >= kr.lansi && kohde.lon <= kr.ita;
      });
      if (kainalossa) continue;
      const p = karttapiste(kartta, kohde.lat, kohde.lon);
      // Sama piste ydinrajauksen prosentteina = se, mitä pelaaja
      // näkee kehyksessä. Vertailu vanhaan kaavaan suoraan rajoista.
      const x = ((p.x - ydin.x) / ydin.leveys) * 100;
      const y = ((p.y - ydin.y) / ydin.korkeus) * 100;
      const ennenX = ((kohde.lon - r.lansi) / (r.ita - r.lansi)) * 100;
      const ennenY = ((r.pohjoinen - kohde.lat) / (r.pohjoinen - r.etela)) * 100;
      assert.ok(Math.abs(x - ennenX) < 0.02 && Math.abs(y - ennenY) < 0.02,
        `${avain}/${kohde.nimi}: ${x.toFixed(2)},${y.toFixed(2)} `
        + `≠ ${ennenX.toFixed(2)},${ennenY.toFixed(2)}`);
      // Ja kaikkien on yhä oltava lepotilan näkymässä: reunus on
      // lisää karttaa, ei uusi paikka kohteille.
      assert.ok(x > 0 && x < 100 && y > 0 && y < 100,
        `${avain}/${kohde.nimi} ei ole lepotilan näkymässä`);
    }
  }
});

test('kainalo pysyy lepotilan näkymän sisällä', () => {
  for (const [avain, kartta] of laajennetut) {
    const ydin = ydinAla(kartta);
    for (const kainalo of kartta.kainalot ?? []) {
      const vasen = ((kainalo.x - ydin.x) / ydin.leveys) * 100;
      const yla = ((kainalo.y - ydin.y) / ydin.korkeus) * 100;
      const oikea = vasen + (kainalo.leveys / ydin.leveys) * 100;
      const ala = yla + (kainalo.korkeus / ydin.korkeus) * 100;
      assert.ok(vasen > 0 && yla > 0 && oikea < 100 && ala < 100,
        `${avain}: kainalo ${vasen.toFixed(1)}–${oikea.toFixed(1)} % / `
        + `${yla.toFixed(1)}–${ala.toFixed(1)} % ei mahdu lepotilan näkymään`);
    }
  }
});

test('mittajana on lepotilassa entisen mittainen', () => {
  for (const [avain, kartta] of laajennetut) {
    const ydin = ydinAla(kartta);
    const jana = mittakaava(kartta);
    // osuus on lehden CSS-leveys (lavasta), ydinOsuus se, minkä
    // pelaaja näkee kehyksessä. Suhde on ydinrajauksen leveysosuus.
    assert.ok(Math.abs(jana.osuus - (jana.ydinOsuus * ydin.leveys) / 100) < 1e-6,
      `${avain}: janan osuudet eivät vastaa toisiaan`);
    assert.ok(jana.ydinOsuus >= 15 && jana.ydinOsuus <= 35,
      `${avain}: jana ${jana.teksti} on ${jana.ydinOsuus.toFixed(1)} % näkymästä`);
  }
});

test('laajentamaton kartta laskee kuten ennen', () => {
  for (const [avain, kartta] of laajentamattomat) {
    const ydin = ydinAla(kartta);
    assert.deepEqual(ydin, { x: 0, y: 0, leveys: 100, korkeus: 100 }, avain);
    const jana = mittakaava(kartta);
    assert.equal(jana.osuus, jana.ydinOsuus, `${avain}: janan osuus muuttui`);
  }
});
