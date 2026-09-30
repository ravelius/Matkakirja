// KRIM JA SEVASTOPOL UKRAINALLE (Päätoimittaja 30.9.2026: kansainvälinen tunnustus
// ja Suomen kanta; Sisältökirjurin löytö maakuntadatasta).
//
// Natural Earthin oletusaineisto on de facto -näkymä: Krim ja Sevastopol ovat RUS:n
// monikulmiossa (admin-0), admin-1:ssä adm0_a3 = RUS (UA-43, UA-40), ja
// boundary_lines_land -aineistossa Perekopin ja Arabatin kannaksen viiva on
// maiden välinen raja. Tämä moduuli korjaa kaikki kolme LÄHTEESSÄ, ennen kuin
// generaattorit (generoi-maapolygonit, maarajat-maamaa, tee-maakuntavektorit,
// hae-maiden-rajat) tekevät niistä pelin aineistoja — näin korjaus ei unohdu
// seuraavassa uudelleengeneroinnissa.
//
// Admin-0: Krimin monikulmio siirretään RUS:lta UKR:lle ja liitetään Manner-
// Ukrainan renkaaseen poistamalla yhteinen reuna (NE on topologisesti
// yhtenäinen: kannaksilla on samat kärjet molemmissa renkaissa), joten
// korostukseen, huntuun tai maskiin ei jää sisäistä viivaa.

/** Krimin sisäpiste (lon, lat) monikulmion tunnistamiseen. */
export const KRIM_PISTE = [34.1, 45.0];
/** Admin-1-alueet, jotka siirretään (ISO 3166-2). */
export const KRIM_ALUEET = ['UA-43', 'UA-40'];

const avain = (q) => `${q[0].toFixed(6)},${q[1].toFixed(6)}`;

function sisalla(rengas, [x, y]) {
  let c = false;
  for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i++) {
    const [xi, yi] = rengas[i]; const [xj, yj] = rengas[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

const suljettu = (r) => avain(r[0]) === avain(r[r.length - 1]);
const avaa = (r) => (suljettu(r) ? r.slice(0, -1) : r.slice());

/**
 * Kahden renkaan liitos yhteisen reunaketjun yli. Palauttaa suljetun renkaan
 * tai heittää, jos yhteinen ketju ei ole yksi yhtenäinen jakso.
 */
export function liitaRenkaat(a0, b0) {
  const a = avaa(a0); const b = avaa(b0);
  const bAvaimet = new Set(b.map(avain));
  const yhteinen = a.map((q) => bAvaimet.has(avain(q)));
  if (!yhteinen.some(Boolean)) throw new Error('renkailla ei yhteisiä kärkiä');
  // Kierretään a niin, että yhteinen jakso ei ylitä taulukon rajaa.
  let alku = yhteinen.findIndex((v, i) => v && !yhteinen[(i - 1 + a.length) % a.length]);
  const A = [...a.slice(alku), ...a.slice(0, alku)];
  const Y = [...yhteinen.slice(alku), ...yhteinen.slice(0, alku)];
  const loppu = Y.findIndex((v) => !v) - 1; // yhteinen jakso on A[0..loppu]
  if (Y.slice(loppu + 1).some(Boolean)) throw new Error('yhteinen reuna ei ole yksi jakso');
  const j0 = b.findIndex((q) => avain(q) === avain(A[0]));
  const j1 = b.findIndex((q) => avain(q) === avain(A[loppu]));
  // B:n polku j1 → j0 sitä kautta, joka ei kulje yhteisiä kärkiä pitkin.
  const polku = (suunta) => {
    const p = [];
    for (let j = (j1 + suunta + b.length) % b.length; j !== j0; j = (j + suunta + b.length) % b.length) p.push(b[j]);
    return p;
  };
  const eteen = polku(1); const taakse = polku(-1);
  const aA = new Set(A.slice(0, loppu + 1).map(avain));
  const vapaa = (p) => p.every((q) => !aA.has(avain(q)));
  const bPolku = vapaa(eteen) ? eteen : vapaa(taakse) ? taakse : null;
  if (!bPolku) throw new Error('liitospolkua ei löytynyt');
  // A:n ei-yhteinen osa A[loppu..end] + A[0], sitten B:n vapaa polku takaisin A[loppu]:iin.
  const tulos = [...A.slice(loppu), A[0], ...bPolku.reverse(), A[loppu]];
  // Poista peräkkäiset kaksoiskärjet ja sulje.
  const siisti = tulos.filter((q, i) => i === 0 || avain(q) !== avain(tulos[i - 1]));
  if (avain(siisti[0]) !== avain(siisti[siisti.length - 1])) siisti.push(siisti[0]);
  return siisti;
}

const monikulmiot = (g) => (g.type === 'Polygon' ? [g.coordinates] : g.coordinates);

/** Admin-0 (ADM0_A3 tai adm0_a3): Krim RUS → UKR ja liitos mantereeseen. Muuttaa paikallaan. */
export function krimUkrainalleAdmin0(ne) {
  const iso = (f) => f.properties.ADM0_A3 ?? f.properties.adm0_a3;
  const rus = ne.features.find((f) => iso(f) === 'RUS');
  const ukr = ne.features.find((f) => iso(f) === 'UKR');
  if (!rus || !ukr) throw new Error('RUS tai UKR puuttuu');
  const rp = monikulmiot(rus.geometry);
  const ki = rp.findIndex((p) => sisalla(p[0], KRIM_PISTE));
  if (ki < 0) return { siirretty: false }; // jo korjattu tai aineisto ei ole de facto
  const [krim] = rp.splice(ki, 1);
  rus.geometry = rp.length === 1 ? { type: 'Polygon', coordinates: rp[0] } : { type: 'MultiPolygon', coordinates: rp };
  const up = monikulmiot(ukr.geometry);
  let paras = -1; let liitos = null;
  for (let i = 0; i < up.length; i += 1) {
    try { liitos = liitaRenkaat(up[i][0], krim[0]); paras = i; break; } catch { /* ei naapuri */ }
  }
  if (paras < 0) throw new Error('Krimiä ei voitu liittää UKR:n renkaaseen');
  up[paras] = [liitos, ...up[paras].slice(1), ...krim.slice(1)];
  ukr.geometry = up.length === 1 ? { type: 'Polygon', coordinates: up[0] } : { type: 'MultiPolygon', coordinates: up };
  return { siirretty: true, karkia: liitos.length };
}

/** Admin-1: UA-43 (Krim) ja UA-40 (Sevastopol) UKR:lle. Muuttaa paikallaan. */
export function krimUkrainalleAdmin1(ne) {
  let n = 0;
  for (const f of ne.features) {
    const p = f.properties;
    if (!KRIM_ALUEET.includes(p.iso_3166_2)) continue;
    Object.assign(p, { adm0_a3: 'UKR', iso_a2: 'UA', admin: 'Ukraine', geonunit: 'Ukraine', gu_a3: 'UKR', sov_a3: 'UKR', adm0_label: p.adm0_label });
    n += 1;
  }
  return n;
}

/**
 * Rajaviivasto (lon/lat-viivoja): pois viivat, jotka kulkevat Krimin ja Manner-
 * Ukrainan välisellä kannaksella (kaikki pisteet laatikossa 32,4–36,8 E, 45,3–46,4 N).
 */
export function poistaKriminRaja(viivat, piste = (v) => v) {
  const laatikossa = ([x, y]) => x > 32.4 && x < 36.8 && y > 45.3 && y < 46.4;
  const ennen = viivat.length;
  const jaa = viivat.filter((v) => !piste(v).every(laatikossa));
  return { viivat: jaa, poistettu: ennen - jaa.length };
}
