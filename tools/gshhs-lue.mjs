/*
 * GSHHG-BINÄÄRIN LUKU JA RENKAIDEN NORMALISOINTI (yhteinen
 * tools/gshhs-meri.mjs:lle ja tools/gshhs-jarvet.mjs:lle).
 *
 * Binäärimuoto (README.TXT): 11 × int32 big-endian otsake (id, n, flag,
 * west, east, south, north, area, area_full, container, ancestor), sitten
 * n × (int32 lon, int32 lat) mikroasteina. flag & 255 = taso: 1 maa,
 * 2 järvi, 3 saari järvessä, 4 lampi saarella, 5/6 Etelämanner.
 */

/** Lukee binäärin monikulmioiksi { id, taso, n, laajuus, container, pisteet:Float64Array }. */
export function lueGshhs(buf) {
  const ulos = [];
  let p = 0;
  while (p < buf.length) {
    const id = buf.readInt32BE(p);
    const n = buf.readInt32BE(p + 4);
    const flag = buf.readInt32BE(p + 8);
    const laajuus = {
      w: buf.readInt32BE(p + 12) / 1e6,
      e: buf.readInt32BE(p + 16) / 1e6,
      s: buf.readInt32BE(p + 20) / 1e6,
      n: buf.readInt32BE(p + 24) / 1e6,
    };
    // Säiliö: saaren (taso 3) järvi tai järven (taso 2) maa; −1 = ei.
    const container = buf.readInt32BE(p + 36);
    const pisteet = new Float64Array(n * 2);
    let q = p + 44;
    for (let i = 0; i < n; i += 1) {
      pisteet[i * 2] = buf.readInt32BE(q) / 1e6;
      pisteet[i * 2 + 1] = buf.readInt32BE(q + 4) / 1e6;
      q += 8;
    }
    ulos.push({
      id, taso: flag & 255, n, laajuus, container, pisteet,
    });
    p = q;
  }
  return ulos;
}

/**
 * Sutherland–Hodgman yhdelle puolitasolle: pitää pisteet, joilla
 * `sisalla(lon)` on tosi, ja lisää leikkauspisteet rajalle `raja`.
 */
function leikkaa(rengas, sisalla, raja) {
  const ulos = [];
  const n = rengas.length;
  for (let i = 0; i < n; i += 1) {
    const a = rengas[(i + n - 1) % n];
    const b = rengas[i];
    const aS = sisalla(a[0]);
    const bS = sisalla(b[0]);
    if (aS !== bS) {
      const t = (raja - a[0]) / (b[0] - a[0]);
      ulos.push([raja, a[1] + t * (b[1] - a[1])]);
    }
    if (bS) ulos.push(b);
  }
  return ulos;
}

/**
 * Rengas ±180-alueelle: enintään kolme rengasta (keski-, länsi- ja
 * itäosa). Lähteessä pituusasteet ovat 0..360 ja Greenwichin ylittävä
 * rengas HYPPÄÄ 359,99 → 0,01, joten rengas AUKAISTAAN ensin jatkuvaksi
 * (yli 180 asteen askel korjataan ±360:llä; Euraasia on sen jälkeen
 * −10..190) ja leikataan vasta sitten 180:ssa ja −180:ssa.
 */
export function normalisoi(rengas) {
  const jatkuva = [];
  let siirto = 0;
  let ed = null;
  // Etelämanner on lähteessä valmiiksi −180..180 ja sulkeutuu navan
  // kautta (180,−90) → (−180,−90): sitä ei saa "aukaista".
  const valmis = rengas.some(([lon]) => lon < 0);
  for (const [lon, lat] of rengas) {
    if (valmis) { jatkuva.push([lon, lat]); continue; }
    if (ed !== null) {
      if (lon - ed > 180) siirto -= 360;
      else if (ed - lon > 180) siirto += 360;
    }
    ed = lon;
    jatkuva.push([lon + siirto, lat]);
  }
  const osat = [];
  for (const [alku, loppu] of [[-540, -180], [-180, 180], [180, 540]]) {
    let osa = leikkaa(jatkuva, (lon) => lon >= alku, alku);
    if (osa.length > 2) osa = leikkaa(osa, (lon) => lon <= loppu, loppu);
    if (osa.length > 2) {
      const s = alku === -180 ? 0 : (alku < -180 ? 360 : -360);
      osat.push(osa.map(([lon, lat]) => [lon + s, lat]));
    }
  }
  return osat;
}

/** Esiharvennus: peräkkäiset pisteet lähempänä kuin askel jäävät pois. */
export function harvenna(rengas, askel) {
  if (!(askel > 0)) return rengas;
  const ulos = [];
  let ed = null;
  for (const p of rengas) {
    if (ed && Math.abs(p[0] - ed[0]) < askel && Math.abs(p[1] - ed[1]) < askel) continue;
    ulos.push(p);
    ed = p;
  }
  return ulos;
}

export function pyorista(x) { return Math.round(x * 1e6) / 1e6; }
