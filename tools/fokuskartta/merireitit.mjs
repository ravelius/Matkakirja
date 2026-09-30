/*
 * MERIREITTIEN MAAOSUUDET (Euroopan laatukierros 27.9.2026, N1; Fablen
 * päätös vaihtoehto a): laivareitti alkaa kaupungin pisteestä, joka on
 * usein sisämaassa (Lontoo, Rooma, Reykjavik…), ja sen katkoviiva kulki
 * maan yli rannikolle. Matka kulkee maitse satamaan ja sitten laivalla:
 * maalla oleva osuus piirretään MAAREITIN tyylillä (yhtenäinen veto) ja
 * vain vedessä oleva osuus katkoviivana. Reitin muotoa (poly) ei muuteta —
 * heitot interpoloidaan kärkien indeksien mukaan, ja lisätty kärki
 * muuttaisi jokaisen merireitin piirron — vaan maaosuudet kirjataan reitin
 * kaaren osuuksina `r.maaosuudet = [[t0, t1], …]` (0…1 laudan kaaresta).
 * Piirto (maailmapiirto.js piirraReititKankaalle) ohittaa niillä katkot
 * ja vetää maaviivan.
 *
 * Meri on SAMA kuin pohjalla: maailma.mjs `meriRenkaat` samalla
 * harvennuksella. Järviä ei lasketa merellä kulkevaksi osuudeksi.
 */

/**
 * Pistetesti meren renkaille: parillisuus säteellä länteen, reunat
 * leveyskaistoittain indeksoituina (kaista 0,05°).
 * @param {Array<Array<[number, number]>>} renkaat lon/lat-renkaat
 * @returns {(lon:number, lat:number) => boolean} tosi = meri
 */
export function merenPistetesti(renkaat, kaista = 0.05) {
  const kaistat = new Map();
  for (const r of renkaat) {
    for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
      const [xa, ya] = r[j]; const [xb, yb] = r[i];
      if (ya === yb) continue;
      const k0 = Math.floor(Math.min(ya, yb) / kaista);
      const k1 = Math.floor(Math.max(ya, yb) / kaista);
      for (let k = k0; k <= k1; k += 1) {
        if (!kaistat.has(k)) kaistat.set(k, []);
        kaistat.get(k).push(xa, ya, xb, yb);
      }
    }
  }
  return (lon, lat) => {
    const e = kaistat.get(Math.floor(lat / kaista));
    if (!e) return false;
    let c = 0;
    for (let i = 0; i < e.length; i += 4) {
      const xa = e[i]; const ya = e[i + 1]; const xb = e[i + 2]; const yb = e[i + 3];
      if ((ya > lat) === (yb > lat)) continue;
      if (lon < xa + ((lat - ya) / (yb - ya)) * (xb - xa)) c ^= 1;
    }
    // Säde itään (lon < leikkaus) — parillisuus on sama kumpaan tahansa
    // suuntaan suljetuilla renkailla, kehysrengas mukaan lukien.
    return c === 1;
  };
}

/**
 * Yhden reitin maaosuudet kaaren osuuksina.
 * @param {Array<[number, number]>} poly laudan koordinaatit
 * @param {(x:number) => number} lautaLon
 * @param {(y:number) => number} lautaLat
 * @param {(lon:number, lat:number) => boolean} onMeri
 * @param {{ askel?: number, lyhin?: number, paa?: (piste:[number, number]) => boolean }} asetukset
 *   askel ja lyhin laudan yksiköissä. VAIN PÄÄT: palautetaan vain reitin
 *   alusta ja lopusta alkavat maaosuudet (kaupungista satamaan) — keskellä
 *   reittiä olevat saarten ylitykset ovat suoran janan geometriaa, eivät
 *   maamatkaa, ja jäävät katkoviivaksi. `paa([x, y])` (laudan piste) rajaa päät (esim.
 *   vain Euroopan kaupungit, VAIN EUROOPPA).
 * @returns {Array<[number, number]>}
 */
export function reitinMaaosuudet(poly, lautaLon, lautaLat, onMeri, { askel = 0.2, lyhin = 0.6, paa = null } = {}) {
  const pit = [0];
  for (let i = 1; i < poly.length; i += 1) {
    pit.push(pit[i - 1] + Math.hypot(poly[i][0] - poly[i - 1][0], poly[i][1] - poly[i - 1][1]));
  }
  const L = pit.at(-1);
  if (!(L > 0)) return [];
  const lonLat = (x, y) => [((lautaLon(x) + 540) % 360) - 180, lautaLat(y)];
  const pisteessa = (s) => {
    let i = 1;
    while (i < poly.length - 1 && pit[i] < s) i += 1;
    const t = (s - pit[i - 1]) / ((pit[i] - pit[i - 1]) || 1);
    const x = poly[i - 1][0] + (poly[i][0] - poly[i - 1][0]) * t;
    const y = poly[i - 1][1] + (poly[i][1] - poly[i - 1][1]) * t;
    return onMeri(...lonLat(x, y));
  };
  const n = Math.max(2, Math.ceil(L / askel) + 1);
  const osat = [];
  let alku = null;
  let edS = 0;
  // Rajan tarkennus puolitushaulla näytteiden välissä.
  const raja = (s0, s1, meri0) => {
    for (let k = 0; k < 12; k += 1) {
      const m = (s0 + s1) / 2;
      if (pisteessa(m) === meri0) s0 = m; else s1 = m;
    }
    return (s0 + s1) / 2;
  };
  let edMeri = pisteessa(0);
  if (!edMeri) alku = 0;
  for (let i = 1; i < n; i += 1) {
    const s = (L * i) / (n - 1);
    const meri = pisteessa(s);
    if (meri !== edMeri) {
      const r = raja(edS, s, edMeri);
      if (!meri) alku = r; else { osat.push([alku, r]); alku = null; }
    }
    edMeri = meri; edS = s;
  }
  if (alku !== null) osat.push([alku, L]);
  const paat = osat.filter(([a, b]) => (a === 0 || b === L) && b - a >= lyhin && b - a < L)
    .filter(([a]) => !paa || paa(a === 0 ? poly[0] : poly.at(-1)));
  return paat.map(([a, b]) => [a / L, b / L]);
}

/**
 * Merireittien maaosuudet sisältöön paikallaan (`r.maaosuudet`), vain
 * reitin päissä ja vain `kaupungit`-joukon (laudan pisteet) kaupungeissa.
 * @returns {number} reittejä, joilla on maaosuus
 */
export function merkitseMaaosuudet(reitit, { renkaat, kaava, kaupungit, sade = 2 }) {
  const onMeri = merenPistetesti(renkaat);
  const paa = ([x, y]) => kaupungit.some(([kx, ky]) => Math.hypot(kx - x, ky - y) <= sade);
  let n = 0;
  for (const r of reitit) {
    if (r.laji !== 'meri') continue;
    const o = reitinMaaosuudet(r.poly, kaava.lautaLon, kaava.lautaLat, onMeri, { paa });
    if (o.length) { r.maaosuudet = o; n += 1; }
  }
  return n;
}
