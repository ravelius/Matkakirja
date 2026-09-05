/*
 * GEO-APURI VASTAA PELIN OMAA KAAVAA.
 *
 * js/geo.js rakentaa d3-projektion, jonka on annettava TÄSMÄLLEEN samat
 * lautayksiköt kuin pelin oma projisoiLaudalle (js/fokusmitat.js) ja
 * sama leveysaste kuin pallolaattojen käänteismuunnos
 * (tools/tee-pallolaatat.mjs julisteenLeveysvali). Jos ne eroaisivat,
 * kirjastolla piirretty linssi olisi eri kartalla kuin kaupungit — ja
 * ero olisi juuri sen kokoinen, ettei sitä huomaa kuin lähizoomissa.
 *
 * KUMPAAKAAN TOTEUTUSTA EI VAIHDETA. Pelin kaava ja laattaputken kaava
 * pysyvät sellaisina kuin ovat; tämä testi vain vartioi, että
 * kirjastopolku on niiden kanssa sama.
 *
 * Testit OHITTAVAT itsensä, jos kirjastoa ei ole asennettu — se on
 * sama offline-sääntö kuin selaimessa (Raamattu: kirjaston puuttuminen
 * ei kaada mitään). Asennus ajoa varten:
 *
 *     npm install --no-save d3-geo d3-geo-projection topojson-client
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  lataaGeo, unohdaGeo, laudanProjektio, geojsonLaudalle, topojsonLaudalle,
  isokaari, etaisyysKm, nakyvyysympyra, pallolle, MAAPALLON_SADE_KM,
} from '../js/geo.js';
import { projisoiLaudalle, laudaltaAsteiksi } from '../js/fokusmitat.js';
import { FOKUS_LAUTAPROJEKTIOT } from '../js/packs/fokus-grc.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { julisteenLeveysvali } from '../tools/tee-pallolaatat.mjs';

const geo = await lataaGeo();
const ohita = geo ? false : 'geo-kirjastoja ei ole asennettu (npm install --no-save d3-geo d3-geo-projection topojson-client)';

/** Suurin sallittu ero pelin kaavaan lautayksiköissä (tilaus: 0,01). */
const RAJA = 0.01;

test('laudan projektio vastaa pelin kaavaa kaikilla kaupungeilla', { skip: ohita }, () => {
  const pr = laudanProjektio('maailmankartta');
  assert.ok(pr, 'projektiota ei saatu');
  let pahin = 0;
  let kaupunkeja = 0;
  for (const c of MAAILMANKARTTA.cities) {
    const asteet = laudaltaAsteiksi('maailmankartta', c.x, c.y);
    const oma = projisoiLaudalle('maailmankartta', asteet.lon, asteet.lat);
    const [x, y] = pr([asteet.lon, asteet.lat]);
    pahin = Math.max(pahin, Math.abs(oma.x - x), Math.abs(oma.y - y));
    kaupunkeja += 1;
  }
  assert.ok(kaupunkeja >= 200, `kaupunkeja vain ${kaupunkeja}`);
  assert.ok(pahin < RAJA, `suurin ero ${pahin} lautayksikköä (raja ${RAJA})`);
});

test('projektio vastaa pelin kaavaa myös reunoilla ja saumalla', { skip: ohita }, () => {
  const pr = laudanProjektio('maailmankartta');
  const p = FOKUS_LAUTAPROJEKTIOT.maailmankartta;
  const koetellut = [
    [p.lon0, p.pohjoinen], [p.lon0, -57], [p.lon0 + 0.001, 0], [p.lon0 - 0.001, 0],
    [-180, 0], [179.999, 0], [0, 0], [24.9, 60.2], [-58.4, -34.6], [151.2, -33.9],
  ];
  let pahin = 0;
  for (const [lon, lat] of koetellut) {
    const oma = projisoiLaudalle('maailmankartta', lon, lat);
    const [x, y] = pr([lon, lat]);
    // Sauman toisella puolella lauta ja d3 valitsevat saman kierroksen;
    // ero saa olla vain pyöristystä.
    pahin = Math.max(pahin, Math.abs(oma.x - x), Math.abs(oma.y - y));
  }
  assert.ok(pahin < RAJA, `reunapisteiden suurin ero ${pahin}`);
});

test('tasavälinen lauta (europe) osuu samaan', { skip: ohita }, () => {
  const pr = laudanProjektio('europe');
  assert.ok(pr, 'europe-projektiota ei saatu');
  let pahin = 0;
  for (let i = 0; i < 500; i += 1) {
    const lon = -25 + (i % 25) * 2.6;
    const lat = 34 + Math.floor(i / 25) * 1.4;
    const oma = projisoiLaudalle('europe', lon, lat);
    const [x, y] = pr([lon, lat]);
    pahin = Math.max(pahin, Math.abs(oma.x - x), Math.abs(oma.y - y));
  }
  assert.ok(pahin < RAJA, `europe-laudan suurin ero ${pahin}`);
});

test('Millerin käänteismuunnos on sama kuin laattaputkella', { skip: ohita }, () => {
  /*
   * tools/tee-pallolaatat.mjs julisteenLeveysvali kääntää laudan y:n
   * takaisin asteiksi omalla kaavallaan. Sitä EI vaihdeta d3:een —
   * tämä vain tarkistaa, että kaavat ovat sama kaava.
   */
  const p = FOKUS_LAUTAPROJEKTIOT.maailmankartta;
  const pr = laudanProjektio('maailmankartta');
  let pahin = 0;
  for (let i = 0; i < 200; i += 1) {
    const lat = -57 + Math.random() * (p.pohjoinen + 57);
    const [, y] = pr([p.lon0, lat]);
    const putki = julisteenLeveysvali({ projektio: p, rajaus: { y, h: 0 } }).pohjoinen;
    const d3lat = pr.invert([p.leveys / 2, y])[1];
    pahin = Math.max(pahin, Math.abs(putki - d3lat), Math.abs(putki - lat));
  }
  assert.ok(pahin < 1e-6, `käänteismuunnosten suurin ero ${pahin} astetta`);
});

test('isokaari, etäisyys ja näkyvyysympyrä', { skip: ohita }, () => {
  const lontoo = { lon: -0.13, lat: 51.51 };
  const bombay = { lon: 72.88, lat: 19.08 };
  const kaari = isokaari(lontoo, bombay, 64, 'maailmankartta');
  assert.equal(kaari.asteet.length, 65);
  assert.equal(kaari.laudalla.length, 65);
  // Päätepisteet ovat päätepisteitä.
  assert.ok(Math.abs(kaari.asteet[0][0] - lontoo.lon) < 1e-9);
  assert.ok(Math.abs(kaari.asteet[64][1] - bombay.lat) < 1e-9);
  // Isokaari EI ole suora viiva kartalla: keskikohta on selvästi
  // pohjoisempana kuin päätepisteiden keskiarvo (juuri se, mitä
  // pelaajalle halutaan näyttää).
  const puolivali = kaari.asteet[32];
  assert.ok(puolivali[1] > (lontoo.lat + bombay.lat) / 2 + 3,
    `kaaren puoliväli ${puolivali[1]}° ei nouse pohjoiseen`);
  // Lontoo–Bombay on noin 7 200 km (isokaari).
  const km = etaisyysKm(lontoo, bombay);
  assert.ok(km > 7000 && km < 7400, `etäisyydeksi tuli ${km} km`);

  const ympyra = nakyvyysympyra(lontoo, 1000);
  assert.equal(ympyra.type, 'Polygon');
  for (const [lon, lat] of ympyra.coordinates[0]) {
    const d = etaisyysKm(lontoo, [lon, lat]);
    assert.ok(Math.abs(d - 1000) < 1, `ympyrän piste ${d} km keskuksesta`);
  }
  assert.ok(MAAPALLON_SADE_KM > 6370 && MAAPALLON_SADE_KM < 6372);
});

test('GeoJSON ja TopoJSON kääntyvät laudan polulle', { skip: ohita }, () => {
  const viiva = {
    type: 'LineString',
    coordinates: [[-0.13, 51.51], [30, 45], [72.88, 19.08]],
  };
  const polku = geojsonLaudalle(viiva, 'maailmankartta');
  assert.ok(typeof polku === 'string' && polku.startsWith('M'), `polku: ${polku}`);

  const topo = {
    type: 'Topology',
    objects: { rajat: { type: 'LineString', arcs: [0] } },
    arcs: [[[-0.13, 51.51], [30, 45], [72.88, 19.08]]],
  };
  assert.equal(topojsonLaudalle(topo, 'rajat', 'maailmankartta'), polku);

  // Rajaus leikkaa polun laudan suorakaiteeseen.
  const { width, height } = MAAILMANKARTTA.map;
  const rajattu = geojsonLaudalle(viiva, 'maailmankartta', { rajaus: [[0, 0], [width, height]] });
  const luvut = rajattu.match(/-?\d+(?:\.\d+)?/g).map(Number);
  for (let i = 0; i < luvut.length; i += 2) {
    assert.ok(luvut[i] >= -1 && luvut[i] <= width + 1, `x ${luvut[i]} laudan ulkona`);
    assert.ok(luvut[i + 1] >= -1 && luvut[i + 1] <= height + 1, `y ${luvut[i + 1]} laudan ulkona`);
  }
});

test('pallolle antaa Globe.gl:n pathsData-muodon', { skip: ohita }, () => {
  const kokoelma = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: { type: 'LineString', coordinates: [[-0.13, 51.51], [72.88, 19.08]] },
    }],
  };
  const polut = pallolle(kokoelma);
  assert.equal(polut.length, 1);
  // js/pallolauta/reitit.js: pathPoints('pisteet'), pathPointLat p[0].
  assert.deepEqual(polut[0].pisteet, [[51.51, -0.13], [19.08, 72.88]]);
});

test('ilman kirjastoa apuri palauttaa nullin eikä kaadu', async () => {
  unohdaGeo();
  assert.equal(laudanProjektio('maailmankartta'), null);
  assert.equal(geojsonLaudalle({ type: 'Point', coordinates: [0, 0] }, 'maailmankartta'), null);
  assert.equal(isokaari({ lon: 0, lat: 0 }, { lon: 1, lat: 1 }), null);
  assert.equal(etaisyysKm({ lon: 0, lat: 0 }, { lon: 1, lat: 1 }), null);
  assert.equal(nakyvyysympyra({ lon: 0, lat: 0 }, 100), null);
  assert.equal(topojsonLaudalle({}, 'rajat', 'maailmankartta'), null);
  // pallolle ei tarvitse kirjastoa lainkaan — se on pelkkä muodonvaihto.
  assert.deepEqual(pallolle({ type: 'LineString', coordinates: [[1, 2], [3, 4]] }),
    [{ pisteet: [[2, 1], [4, 3]] }]);
  await lataaGeo();
});
