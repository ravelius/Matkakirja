#!/usr/bin/env node
// MAA–MAA-RAJAT NATIIVILLE (Karttaseppä 25.9.2026, omistajan löydös 127, build 16):
// "Maanraja vain kahden maan välillä, ei niiltä osin, joissa maa loppuu mereen."
//
// Natiivin kehä (Maaraja.cs) piirtää maapolygonit.geojsonin KOKO renkaan, eli
// myös rannikon. Tämä työkalu jakaa saman renkaan (sama aineisto, samat kärjet,
// joten viiva osuu täsmälleen entiseen kohtaan) kahteen osaan ja vie vain
// maa–maa-osuudet: jana on maaraja, kun sen keskipisteestä kohtisuoraan
// kumpaankin suuntaan ETAISYYS asteen päässä on maata ja puolet ovat ERI
// maita (vuonot ja saaristot: sama maa molemmin puolin → rannikkoa). Maat =
// Natural Earth 10m admin-0 -polygonit (kaikki maat, myös pelin ulkopuoliset
// naapurit) maatunnusrasterina MASKI-askeleella. Järvien läpi kulkevat rajat (Suuret järvet,
// Victoria) ovat admin-0:ssa maata ja jäävät rajoiksi; rannikko (myös
// Kaspianmeri) putoaa pois. Alle LYHIN_JAKSO-janan jaksot (rannikon ja rajan
// liitoskohdan kohina) yhdistetään naapureihinsa.
//
// SALMET (Natiivisepän huomio 26.9.2026: Samos 7,4 km ja Korfu 0,8 km luokittuivat
// maarajaksi). Kapeassa salmessa rannan molemmin puolin ETAISYYS-päässä on eri maata,
// ja 0,02°:n rasteri ei näe alle ~2 km:n vettä. Siksi ehdokasjana hylätään, jos sen
// keskipisteen normaali ±VESI_ETAISYYS leikkaa meren rantaviivan (NE 10m ocean,
// vektorina, ruudukkoindeksillä). Raja jää vain maalle; rajan rannikkopäästä voi
// lyhentyä enintään VESI_ETAISYYS.
//
//   node tools/maarajat-maamaa.mjs assets/data/maapolygonit.json \
//     <ne_10m_admin_0_countries.geojson> <ulos.geojson> [--meri <ne_10m_ocean.geojson>]
//
// Ämpäriin gzipattuna maapolygonit.geojsonin viereen:
// julisteet/pallo/vektorit/maarajat-<pvm>/maamaa.geojson
// (FeatureCollection, properties.iso = ISO3, MultiLineString lon/lat).
import { readFileSync, writeFileSync } from 'node:fs';
import { maapolygonitLonLat } from './maapolygonit-geojson.mjs';

export const MASKI = 0.02; // astetta / pikseli (≈ 2,2 km; Uint16-rasteri 324 Mt)
export const ETAISYYS = 0.04; // koepisteiden etäisyys janasta (≈ 4,4 km)
export const LYHIN_JAKSO = 3; // janaa
export const VESI_ETAISYYS = 0.015; // normaalin puolikas salmitestissä (≈ 1,7 km)

/** Meren rantaviivan särmät 0,1°-ruudukkoon: leikkaa(a, b) = leikkaako jana a–b rantaviivaa. */
export function meriviivat(meri, ruutu = 0.1) {
  const solut = new Map();
  const avain = (x, y) => `${x},${y}`;
  for (const f of meri.features) {
    const g = f.geometry; if (!g) continue;
    const polyt = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : [];
    for (const poly of polyt) for (const r of poly) for (let i = 0; i < r.length - 1; i += 1) {
      const [x0, y0] = r[i]; const [x1, y1] = r[i + 1];
      for (let cx = Math.floor(Math.min(x0, x1) / ruutu); cx <= Math.floor(Math.max(x0, x1) / ruutu); cx += 1) {
        for (let cy = Math.floor(Math.min(y0, y1) / ruutu); cy <= Math.floor(Math.max(y0, y1) / ruutu); cy += 1) {
          const k = avain(cx, cy); if (!solut.has(k)) solut.set(k, []); solut.get(k).push([x0, y0, x1, y1]);
        }
      }
    }
  }
  const risti = (ax, ay, bx, by, cx, cy) => (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
  return {
    leikkaa([ax, ay], [bx, by]) {
      const nahty = new Set();
      for (let cx = Math.floor(Math.min(ax, bx) / ruutu); cx <= Math.floor(Math.max(ax, bx) / ruutu); cx += 1) {
        for (let cy = Math.floor(Math.min(ay, by) / ruutu); cy <= Math.floor(Math.max(ay, by) / ruutu); cy += 1) {
          for (const e of solut.get(avain(cx, cy)) ?? []) {
            if (nahty.has(e)) continue; nahty.add(e);
            const [x0, y0, x1, y1] = e;
            const d1 = risti(ax, ay, bx, by, x0, y0); const d2 = risti(ax, ay, bx, by, x1, y1);
            const d3 = risti(x0, y0, x1, y1, ax, ay); const d4 = risti(x0, y0, x1, y1, bx, by);
            if ((d1 > 0) !== (d2 > 0) && (d3 > 0) !== (d4 > 0)) return true;
          }
        }
      }
      return false;
    },
  };
}

/** Maatunnusrasteri admin-0-polygoneista (0 = meri, 1… = maa), rivi = leveyspiiri pohjoisesta. */
export function maamaski(ne, askel = MASKI) {
  const W = Math.round(360 / askel); const H = Math.round(180 / askel);
  const tunnus = new Uint16Array(W * H);
  const renkaat = [];
  ne.features.forEach((f, k) => {
    const g = f.geometry; if (!g) return;
    const polyt = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : [];
    for (const p of polyt) renkaat.push([p, k + 1]); // ulko + reiät yhdessä: parillisuussääntö
  });
  // Scanline per polygoni (reiät samaan särmälistaan → even-odd).
  for (const [poly, id] of renkaat) {
    const sarmat = [];
    let yMin = Infinity; let yMax = -Infinity;
    for (const r of poly) {
      for (let i = 0; i < r.length - 1; i += 1) {
        const [x0, y0] = r[i]; const [x1, y1] = r[i + 1];
        if (y0 === y1) continue;
        sarmat.push([x0, y0, x1, y1]);
        yMin = Math.min(yMin, y0, y1); yMax = Math.max(yMax, y0, y1);
      }
    }
    const r0 = Math.max(0, Math.floor((90 - yMax) / askel)); const r1 = Math.min(H - 1, Math.ceil((90 - yMin) / askel));
    for (let rivi = r0; rivi <= r1; rivi += 1) {
      const lat = 90 - (rivi + 0.5) * askel;
      const xt = [];
      for (const [x0, y0, x1, y1] of sarmat) {
        if ((y0 <= lat) !== (y1 <= lat)) xt.push(x0 + ((lat - y0) / (y1 - y0)) * (x1 - x0));
      }
      xt.sort((a, b) => a - b);
      for (let k = 0; k + 1 < xt.length; k += 2) {
        const c0 = Math.max(0, Math.ceil((xt[k] + 180) / askel - 0.5));
        const c1 = Math.min(W - 1, Math.floor((xt[k + 1] + 180) / askel - 0.5));
        tunnus.fill(id, rivi * W + c0, rivi * W + c1 + 1);
      }
    }
  }
  return {
    maa(lon, lat) {
      let l = lon; while (l >= 180) l -= 360; while (l < -180) l += 360;
      const c = Math.floor((l + 180) / askel); const rivi = Math.floor((90 - lat) / askel);
      if (rivi < 0 || rivi >= H) return 0;
      return tunnus[rivi * W + Math.min(W - 1, c)];
    },
  };
}

/** Janan luokka: true = maaraja (molemmin puolin maata, eri maat). */
function janaOnRaja(maski, [ax, ay], [bx, by], d = ETAISYYS, rannat = null) {
  let dx = bx - ax; if (dx > 180) dx -= 360; if (dx < -180) dx += 360;
  const kx = Math.cos(((ay + by) / 2) * (Math.PI / 180)); // pituusaste lyhenee
  const vx = dx * kx; const vy = by - ay; const l = Math.hypot(vx, vy);
  if (!l) return null;
  const mx = ax + dx / 2; const my = (ay + by) / 2;
  const nx = (-vy / l) * d / Math.max(kx, 0.05); const ny = (vx / l) * d;
  const a = maski.maa(mx + nx, my + ny); const b = maski.maa(mx - nx, my - ny);
  if (!(a && b && a !== b)) return false;
  if (!rannat) return true;
  const k = VESI_ETAISYYS / d;
  return !rannat.leikkaa([mx + nx * k, my + ny * k], [mx - nx * k, my - ny * k]);
}

/** Suljetun renkaan maaraja-jaksot viivoiksi (alku ja loppu yhdistetään). */
export function rajajaksot(rengas, maski, d = ETAISYYS, rannat = null) {
  const n = rengas.length - 1; // viimeinen = ensimmäinen
  if (n < 3) return [];
  const luokka = new Array(n);
  for (let i = 0; i < n; i += 1) luokka[i] = janaOnRaja(maski, rengas[i], rengas[i + 1], d, rannat);
  for (let i = 0; i < n; i += 1) if (luokka[i] === null) luokka[i] = luokka[(i + n - 1) % n] ?? false;
  // Lyhyet jaksot naapureihin (kohina rajan ja rannan liitoksessa).
  const jaksot = () => {
    const out = []; let alku = 0;
    for (let i = 1; i <= n; i += 1) if (i === n || luokka[i] !== luokka[alku]) { out.push([alku, i]); alku = i; }
    if (out.length > 1 && luokka[0] === luokka[n - 1]) { const [a] = out.pop(); out[0] = [a - n, out[0][1]]; }
    return out;
  };
  for (let kierros = 0; kierros < 3; kierros += 1) {
    const js = jaksot(); if (js.length < 3) break;
    let muuttui = false;
    for (const [a, b] of js) if (b - a < LYHIN_JAKSO) { for (let i = a; i < b; i += 1) luokka[(i + n) % n] = !luokka[(i + n) % n]; muuttui = true; }
    if (!muuttui) break;
  }
  if (luokka.every(Boolean)) return [rengas.slice()];
  return jaksot().filter(([a]) => luokka[(a + n) % n])
    .map(([a, b]) => { const p = []; for (let i = a; i <= b; i += 1) p.push(rengas[(i + n) % n]); return p; });
}

export function maamaaRajat(maapolygonit, ne, meri = null) {
  const maski = maamaski(ne);
  const rannat = meri ? meriviivat(meri) : null;
  const maat = maapolygonitLonLat(maapolygonit);
  const tilasto = {};
  const features = maat.map(({ iso, renkaat }) => {
    const viivat = [];
    let koko = 0; let raja = 0;
    const pituus = (p) => { let s = 0; for (let i = 1; i < p.length; i += 1) s += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); return s; };
    for (const r of renkaat) {
      koko += pituus(r);
      for (const v of rajajaksot(r, maski, ETAISYYS, rannat)) { viivat.push(v); raja += pituus(v); }
    }
    tilasto[iso] = koko ? raja / koko : 0;
    return { type: 'Feature', properties: { iso }, geometry: { type: 'MultiLineString', coordinates: viivat } };
  });
  return { features, tilasto };
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  const [,, lahde, nePolku, ulos] = process.argv;
  const mi = process.argv.indexOf('--meri'); const meriPolku = mi >= 0 ? process.argv[mi + 1] : null;
  if (!lahde || !nePolku || !ulos) {
    console.error('Käyttö: node tools/maarajat-maamaa.mjs assets/data/maapolygonit.json <ne_10m_admin_0_countries.geojson> <ulos.geojson>');
    process.exit(1);
  }
  const j = JSON.parse(readFileSync(lahde, 'utf8'));
  const { features, tilasto } = maamaaRajat(j, JSON.parse(readFileSync(nePolku, 'utf8')), meriPolku ? JSON.parse(readFileSync(meriPolku, 'utf8')) : null);
  writeFileSync(ulos, JSON.stringify({
    type: 'FeatureCollection',
    lahde: `${j.lahde}; luokittelu: admin-0-maamaski ${MASKI}°, koepisteet ±${ETAISYYS}°${meriPolku ? `, salmitesti NE 10m ocean ±${VESI_ETAISYYS}°` : ''}`,
    kuvaus: 'Maan renkaan osuudet, joilla naapurina on toinen maa (ei rannikkoa). Samat kärjet kuin maapolygonit.geojsonissa.',
    features,
  }));
  const pisteita = features.reduce((s, f) => s + f.geometry.coordinates.reduce((t, v) => t + v.length, 0), 0);
  console.log(`${features.length} maata, ${pisteita} pistettä`);
  for (const iso of ['FIN', 'CHE', 'AUT', 'ISL', 'JPN', 'AUS', 'FRA', 'ESP', 'USA', 'CAN', 'EGY', 'GRC']) {
    if (iso in tilasto) console.log(`  ${iso} maarajaa ${(100 * tilasto[iso]).toFixed(1)} % renkaasta`);
  }
}
