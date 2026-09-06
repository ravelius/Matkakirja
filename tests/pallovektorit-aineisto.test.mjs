/*
 * PALLON VEKTORIAINEISTO (erä V0, docs/moduulit/pallon-vektoriviivat.md
 * luvut 2.4 ja 4).
 *
 * tools/tee-pallovektorit.mjs kirjoittaa rantaviivat ja maiden rajat
 * ämpäriin tasoittain yksinkertaistettuina ja 10°:n soluihin
 * leikattuina. Aineisto ei ole pelin koodia, mutta sen kolme puhdasta
 * muunnosta ovat: yksinkertaistus, solujako ja deltakoodaus. Kaikki
 * kolme voi tehdä väärin niin, että tulos on silti uskottavan
 * näköinen — liian innokas Douglas–Peucker syö niemet, solujako jättää
 * saumaan raon, ja deltakoodaus ajelehtii pisteen kerrallaan sivuun.
 * Siksi ne testataan synteettisellä aineistolla, jonka oikean
 * vastauksen voi laskea päässä.
 *
 * NELJÄS TESTI ON KAHDEN TIEDOSTON VÄLINEN: purkaja `puraDelta` elää
 * KAHTENA KOPIONA — työkalussa ja selainmoduulissa js/pallovektorit.js
 * (erä V1) — koska työkalu ei voi tuoda pelin moduulia eikä peli
 * työkalua. Kopiot on pakko pitää sanasta sanaan samoina, muuten
 * ämpärin tavut purkautuisivat selaimessa toisin kuin ne kirjoitettiin.
 * Testi lukee molemmat TEKSTINÄ ja vaatii saman rungon. Jos V1:tä ei
 * vielä ole, testi ohitetaan selvällä viestillä.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

import {
  DELTA_KATTO, deltakoodaa, dp, puraDelta, soluAvain, soluihin, vektorienKansio,
} from '../tools/tee-pallovektorit.mjs';

/** Puretut Float64Array-viivat takaisin [lon, lat] -pareiksi. */
const pareiksi = (viiva) => {
  const ulos = [];
  for (let i = 0; i < viiva.length; i += 2) ulos.push([viiva[i], viiva[i + 1]]);
  return ulos;
};

/* ---------------- Douglas–Peucker ---------------------------------- */

test('dp toleranssilla 0 ei muuta yhtään pistettä', () => {
  const viiva = [[0, 0], [1, 0.5], [2, 0], [3, 1.2], [4, 0]];
  assert.deepEqual(dp(viiva, 0), viiva);
});

test('dp jättää suorasta kolmen pisteen viivasta päät', () => {
  assert.deepEqual(dp([[0, 0], [1, 1], [2, 2]], 0.1), [[0, 0], [2, 2]]);
});

test('dp pitää kärjen, joka on toleranssia kauempana', () => {
  // Kärki on 1° suoran yläpuolella: 0,1°:n toleranssilla se säilyy,
  // 2°:n toleranssilla ei.
  const viiva = [[0, 0], [1, 1], [2, 0]];
  assert.deepEqual(dp(viiva, 0.1), viiva);
  assert.deepEqual(dp(viiva, 2), [[0, 0], [2, 0]]);
});

test('dp ei koske alle kolmen pisteen viivaan', () => {
  assert.deepEqual(dp([[0, 0], [5, 5]], 99), [[0, 0], [5, 5]]);
});

/* ---------------- solujako ------------------------------------------ */

test('soluAvain laskee sarakkeen lännestä ja rivin pohjoisesta', () => {
  assert.equal(soluAvain(-180, 90, 10), '0_0');
  assert.equal(soluAvain(-175, 85, 10), '0_0');
  assert.equal(soluAvain(5, 5, 10), '18_8');
  // Itälaita ja etelänapa pyöristyvät viimeiseen soluun, eivät yli.
  assert.equal(soluAvain(180, -90, 10), '35_17');
});

test('solun vaihtuessa viiva katkeaa ja rajapiste on molemmissa', () => {
  // Sauma kulkee pituusasteella 10 (sarakkeet 18 ja 19).
  const viiva = [[5, 5], [9, 5], [11, 5], [15, 5]];
  const solut = soluihin([viiva], 10);
  assert.deepEqual([...solut.keys()].sort(), ['18_8', '19_8']);
  const lansi = solut.get('18_8');
  const ita = solut.get('19_8');
  assert.equal(lansi.length, 1);
  assert.equal(ita.length, 1);
  // Läntinen osa päättyy itäiseen rajapisteeseen ja itäinen alkaa siitä:
  // ilman tätä naapurisolujen väliin jäisi rako.
  assert.deepEqual(lansi[0], [[5, 5], [9, 5], [11, 5]]);
  assert.deepEqual(ita[0], [[11, 5], [15, 5]]);
});

test('yhden pisteen jäänne ei päädy soluun', () => {
  // Viiva käy naapurisolussa yhdellä pisteellä ja palaa: kumpaankin
  // soluun jää vähintään kaksi pistettä tai ei mitään.
  const solut = soluihin([[[9, 5], [11, 5], [9.5, 5]]], 10);
  for (const [avain, viivat] of solut) {
    for (const osa of viivat) assert.ok(osa.length >= 2, `${avain} sai yhden pisteen osan`);
  }
});

test('koko maailma yhtenä soluna antaa avaimen 0_0', () => {
  const solut = soluihin([[[-170, 80], [170, -80]]], 360);
  assert.deepEqual([...solut.keys()], ['0_0']);
});

/* ---------------- deltakoodaus ja purku ----------------------------- */

test('deltakoodaus ja purku palauttavat samat pisteet', () => {
  const viivat = [
    [[23.7275, 37.9838], [23.73, 37.99], [23.8, 38.0512], [24.1, 38.2]],
    [[-0.1276, 51.5072], [-0.13, 51.51]],
  ];
  const { puskuri, katkoja, viivoja, pisteita } = deltakoodaa(viivat);
  assert.equal(katkoja, 0);
  assert.equal(viivoja, 2);
  assert.equal(pisteita, 6);
  // 2 otsikkoa (12 tavua) + 4 deltaparia (4 tavua).
  assert.equal(puskuri.length, 12 * 2 + 4 * 4);
  const puretut = puraDelta(puskuri).map(pareiksi);
  assert.deepEqual(puretut, viivat);
});

test('purku kelpaa myös ArrayBufferina (selaimen fetch)', () => {
  const viivat = [[[10, 20], [10.5, 20.5], [11, 21]]];
  const { puskuri } = deltakoodaa(viivat);
  const ab = puskuri.buffer.slice(puskuri.byteOffset, puskuri.byteOffset + puskuri.length);
  assert.deepEqual(puraDelta(ab).map(pareiksi), viivat);
});

test('delta pyöristyy 1e-4 asteeseen eikä ajelehdi', () => {
  // Askel 0,00005° pyöristyy nollaan; summa ei silti karkaa, koska
  // koodaus laskee erotuksen aina KIRJOITETUSTA pisteestä.
  const viiva = [[0, 0]];
  for (let i = 1; i <= 200; i += 1) viiva.push([i * 0.00005, 0]);
  const { puskuri } = deltakoodaa([viiva]);
  const purettu = pareiksi(puraDelta(puskuri)[0]);
  for (let i = 0; i < viiva.length; i += 1) {
    assert.ok(Math.abs(purettu[i][0] - viiva[i][0]) <= 0.00006,
      `piste ${i} ajelehti: ${purettu[i][0]} vs ${viiva[i][0]}`);
  }
});

test('yli ±32767 pituusasteen askel katkaisee viivan uuteen osaan', () => {
  // 4° = 40 000 yksikköä > 32 767: jana jää piirtämättä ja seuraava osa
  // alkaa sen toisesta päästä.
  const viiva = [[0, 0], [1, 0], [5, 0], [6, 0]];
  const { puskuri, katkoja, viivoja } = deltakoodaa([viiva]);
  assert.equal(katkoja, 1);
  assert.equal(viivoja, 2);
  const puretut = puraDelta(puskuri).map(pareiksi);
  assert.deepEqual(puretut, [[[0, 0], [1, 0]], [[5, 0], [6, 0]]]);
});

test('yli ±32767 leveysasteen askel katkaisee samoin', () => {
  const { puskuri, katkoja } = deltakoodaa([[[0, 0], [0, 3.2], [0, 10], [0, 10.5]]]);
  assert.equal(katkoja, 1);
  assert.deepEqual(puraDelta(puskuri).map(pareiksi), [[[0, 0], [0, 3.2]], [[0, 10], [0, 10.5]]]);
});

test('tasan ±32767 mahtuu vielä samaan osaan', () => {
  const raja = DELTA_KATTO / 1e4;
  const { puskuri, katkoja, viivoja } = deltakoodaa([[[0, 0], [raja, 0], [2 * raja, 0]]]);
  assert.equal(katkoja, 0);
  assert.equal(viivoja, 1);
  assert.equal(puraDelta(puskuri)[0].length / 2, 3);
});

test('pelkkä liian pitkä jana ei tuota tiedostoon mitään', () => {
  const { puskuri, katkoja, viivoja } = deltakoodaa([[[0, 0], [20, 0]]]);
  assert.equal(viivoja, 0);
  assert.equal(katkoja, 1);
  assert.equal(puskuri.length, 0);
  assert.deepEqual(puraDelta(puskuri), []);
});

/* ---------------- ämpärin polku ------------------------------------- */

test('vektorien kansio on versioitu ja päättyy vinoviivaan', () => {
  assert.equal(vektorienKansio('2026-09-07a'), 'julisteet/pallo/vektorit/2026-09-07a/');
});

/* ---------------- purkaja on sama kahdessa tiedostossa -------------- */

/** Funktion runko tekstinä: `export function nimi(` … vastaava `}`. */
function runko(lahde, nimi) {
  const alku = lahde.indexOf(`export function ${nimi}(`);
  if (alku < 0) return null;
  const auki = lahde.indexOf('{', alku);
  let syvyys = 0;
  for (let i = auki; i < lahde.length; i += 1) {
    if (lahde[i] === '{') syvyys += 1;
    else if (lahde[i] === '}') {
      syvyys -= 1;
      if (syvyys === 0) return lahde.slice(auki, i + 1).replace(/\s+/g, ' ').trim();
    }
  }
  return null;
}

test('puraDelta purkaa samat tavut samoiksi koordinaateiksi työkalussa ja selainmoduulissa', async (t) => {
  /*
   * Työkalu purkaa Float64Array-viivoiksi (mittaus ja testit), selain
   * [lon, lat] -pareiksi (Line2-janat) — muoto saa erota, KOORDINAATIT
   * eivät: sama puskuri, sama pistemäärä, samat luvut 1e-4°:n tarkkuudella
   * ja sama katkojen käsittely. Tekstivertailu hylättiin V1:ssä, koska
   * selainpurkaja lukee vajaan tiedoston turvallisesti (keskeytys) eikä
   * sitä haluta työkaluun.
   */
  const moduuli = new URL('../js/pallovektorit.js', import.meta.url);
  if (!existsSync(moduuli)) {
    t.skip('js/pallovektorit.js puuttuu vielä (erä V1 tekeillä)');
    return;
  }
  const { puraDelta: puraSelain } = await import('../js/pallovektorit.js');
  const viivat = [
    [[15.9612, 26.9701], [15.9700, 26.9800], [16.5000, 27.4444], [16.5001, 27.4445]],
    [[-179.9999, 71.1234], [179.9999, 71.1235]], // antimeridiaani: iso askel → katko
    [[0, 0], [3.2767, 0], [6.5534, 0], [9.8301, 0.0001]], // tasan katon rajalla
  ];
  const { puskuri } = deltakoodaa(viivat);
  const tyokalu = puraDelta(puskuri).map(pareiksi);
  const selain = puraSelain(puskuri).map((v) => v.map(([x, y]) => [x, y]));
  assert.equal(selain.length, tyokalu.length, 'viivojen (osien) määrä');
  for (let i = 0; i < tyokalu.length; i += 1) {
    assert.equal(selain[i].length, tyokalu[i].length, `viiva ${i}: pisteitä`);
    for (let k = 0; k < tyokalu[i].length; k += 1) {
      assert.ok(Math.abs(selain[i][k][0] - tyokalu[i][k][0]) < 1e-9
        && Math.abs(selain[i][k][1] - tyokalu[i][k][1]) < 1e-9, `viiva ${i} piste ${k}`);
    }
  }
  // Tyhjä ja vajaa puskuri: selainpurkaja ei kaadu, työkalu ei tuota roskaa.
  assert.deepEqual(puraSelain(new ArrayBuffer(0)), []);
  assert.deepEqual(puraSelain(puskuri.subarray(0, 10)), []);
});
