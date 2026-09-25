/*
 * REITIN PÄÄ ON KAUPUNGIN PALLOPISTEESSÄ — MOLEMMISSA PIIRTÄJISSÄ.
 *
 * Omistajan vikailmoitus 7.9.2026 illalla (iPad, pallolauta
 * Helsingissä, sanatarkasti): *"Reitti Helsinkiin pitää korjata ja
 * samalla tarkastaa onko kaikki kaupungit oikealla paikalla."* Nappula
 * seisoi Suomenlahden rannalla kaupungin omassa pallopisteessä, mutta
 * reittiviivojen risteys jäi 34,7 km sisämaahan.
 *
 * MITATTU JUURISYY: reittiviiva piirtyy KAHDESTI — elävänä pallon
 * viivakerroksessa (js/pallolauta/reitit.js) ja poltettuna
 * laattapyramidin viivatasoon (tools/fokuskartta/sisalto.mjs). Korjaus
 * oli vain elävässä kerroksessa. Laattaan poltettu verkko luki raakaa
 * `edge.poly`a, ja 219 reittiä 408:sta päättyi yli kilometrin päähän
 * kaupungin pallopisteestä.
 *
 * Vartio pitää molemmat samassa kaavassa (js/pallo.js
 * pallonKorjattuPoly) ILMAN SELAINTA: pelkkää dataa, joten se ajetaan
 * joka `node --test tests/*.test.mjs` -kierroksella. Selainpuolen sama
 * ehto on tools/savukkeet/savuke-pallo-reitit.mjs.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { buildBoard, pointAlong } from '../js/rules.js';
import {
  PALLO_LAUTA, laudanPisteenAvain, pallonOmatPisteet, pallonReitinPoly,
} from '../js/pallo.js';
import { laudaltaAsteiksi } from '../js/fokusmitat.js';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Sallittu ero reitin pään ja kaupungin pallopisteen välillä. */
const RAJA_KM = 1;
const SADE_KM = 6371.0088;

/** Isoympyräetäisyys kilometreinä. */
function etaisyysKm(a, b) {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLon = (b.lon - a.lon) * rad;
  const h = Math.sin(dLat / 2) ** 2
    + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * SADE_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

const lauta = buildBoard(MAAILMANKARTTA.cities, MAAILMANKARTTA.edges, MAAILMANKARTTA.map);
const { pisteet, siirtymat } = pallonOmatPisteet(MAAILMANKARTTA);

/** Kaupungin piste pallolla: oma pallopiste tai laudan projektio. */
function kaupunginPiste(id) {
  const c = lauta.cityById.get(id);
  return pisteet.get(laudanPisteenAvain(c.x, c.y))
    ?? laudaltaAsteiksi(PALLO_LAUTA, c.x, c.y);
}

/** Laudan kohta asteiksi. */
const asteet = ([x, y]) => laudaltaAsteiksi(PALLO_LAUTA, x, y);

/** Polun päiden etäisyys kaupunkiensa pallopisteistä: [alku, loppu] km. */
function paidenEro(poly, edge) {
  return [
    etaisyysKm(asteet(poly[0]), kaupunginPiste(edge.a)),
    etaisyysKm(asteet(poly[poly.length - 1]), kaupunginPiste(edge.b)),
  ];
}

test('pallon elävä reitti päättyy kaupungin pallopisteeseen kummastakin päästä', () => {
  const rikkeet = [];
  for (const e of lauta.edges) {
    const poly = pallonReitinPoly(e, siirtymat);
    // Via-pisteet säilyvät: korjaus liu'uttaa polya, ei suorista sitä.
    assert.equal(poly.length, e.poly.length, e.id);
    const [alku, loppu] = paidenEro(poly, e);
    if (alku > RAJA_KM || loppu > RAJA_KM) {
      rikkeet.push(`${e.id} ${alku.toFixed(1)}/${loppu.toFixed(1)} km`);
    }
  }
  assert.equal(rikkeet.length, 0, rikkeet.slice(0, 8).join(', '));
});

test('korjaamaton poly EI kelpaisi — vartio mittaa oikeaa asiaa', () => {
  /*
   * Ilman korjausta 219 reittiä 408:sta ylittää rajan (Helsinki 34,7 km,
   * Havanna 276 km, Iqaluit 339 km). Jos tämä luku putoaisi nollaan,
   * vartio olisi muuttunut tyhjäksi eikä sitä huomaisi kukaan.
   */
  let rikkeita = 0;
  for (const e of lauta.edges) {
    const [alku, loppu] = paidenEro(e.poly, e);
    if (alku > RAJA_KM || loppu > RAJA_KM) rikkeita += 1;
  }
  assert.ok(rikkeita > 100, `korjaamattomia rikkeitä vain ${rikkeita}`);
});

test('laattaan poltettu reittiverkko päättyy samaan pisteeseen kuin elävä', async () => {
  const { keraaSisalto } = await import('../tools/fokuskartta/sisalto.mjs');
  const sisalto = await keraaSisalto(MAAILMANKARTTA, join(JUURI, 'js', 'packs'), JUURI);
  assert.equal(sisalto.reitit.length, lauta.edges.length);
  const rikkeet = [];
  let pahinAskelma = 0;
  for (let i = 0; i < lauta.edges.length; i += 1) {
    const e = lauta.edges[i];
    const r = sisalto.reitit[i];
    const [alku, loppu] = paidenEro(r.poly, e);
    if (alku > RAJA_KM || loppu > RAJA_KM) {
      rikkeet.push(`${e.id} ${alku.toFixed(1)}/${loppu.toFixed(1)} km`);
    }
  }
  assert.equal(rikkeet.length, 0, rikkeet.slice(0, 8).join(', '));

  /*
   * POLTETTU ASKELMA JA ELÄVÄ ASKELHELMI OVAT SAMA PISTE. Molemmat ovat
   * `pointAlong(poly, i/steps)` samasta korjatusta polusta, joten ero on
   * nolla lautayksikköä — ei "likimain sama". Mittaus tehdään
   * KARSIMATTOMASTA sisällöstä, koska rinnakkaiskarsinta jättää osan
   * askelmista polttamatta (kuva, ei geometria) eivätkä indeksit silloin
   * vastaa askelnumeroa.
   */
  const raaka = await keraaSisalto(MAAILMANKARTTA, join(JUURI, 'js', 'packs'), JUURI,
    { karsinta: false });
  for (let i = 0; i < lauta.edges.length; i += 1) {
    const e = lauta.edges[i];
    const poly = pallonReitinPoly(e, siirtymat);
    assert.equal(raaka.reitit[i].askelmat.length, Math.max(0, e.steps - 1), e.id);
    raaka.reitit[i].askelmat.forEach((a, k) => {
      const b = pointAlong(poly, (k + 1) / e.steps);
      pahinAskelma = Math.max(pahinAskelma, Math.hypot(a[0] - b.x, a[1] - b.y));
    });
  }
  assert.ok(pahinAskelma < 1e-9, `askelma erosi ${pahinAskelma}`);
});

test('lentoreitin päätkin ovat kaupungin pallopisteessä', async () => {
  const { keraaSisalto } = await import('../tools/fokuskartta/sisalto.mjs');
  const sisalto = await keraaSisalto(MAAILMANKARTTA, join(JUURI, 'js', 'packs'), JUURI);
  const lennot = MAAILMANKARTTA.airRoutes ?? [];
  assert.ok(sisalto.lentoreitit.length === lennot.length && lennot.length > 0);
  for (let i = 0; i < lennot.length; i += 1) {
    const e = lennot[i];
    const r = sisalto.lentoreitit[i];
    const alku = etaisyysKm(asteet([r.ax, r.ay]), kaupunginPiste(e.a));
    const loppu = etaisyysKm(asteet([r.bx, r.by]), kaupunginPiste(e.b));
    assert.ok(alku <= RAJA_KM && loppu <= RAJA_KM,
      `${e.a}|${e.b} ${alku.toFixed(1)}/${loppu.toFixed(1)} km`);
  }
});
