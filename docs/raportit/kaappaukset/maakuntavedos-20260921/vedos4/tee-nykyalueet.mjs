/*
 * Nykyalueet ITA/ESP/GBR/POL/AUT (+CHE) Natural Earth 10m admin-1:stä
 * (public domain) — Fablen tilaus 21.9.2026 ilta, sama sääntö kuin FRA/DEU
 * (loki NYKYMAAKUNNAT POHJAKARTALLE 21.9. klo 13.43): nimet ruoste-vahva
 * z7–z8, rajat z6:sta. Ryhmittely: ITA `region` (20 regionia provinsseista),
 * ESP `region` (17 itsehallintoaluetta + Ceuta/Melilla pieninä), GBR
 * `geonunit` (4 maata), POL/AUT/CHE yksi alue per rivi.
 *
 * Ajo (repon juuresta):
 *   node docs/raportit/kaappaukset/maakuntavedos-20260921/vedos4/tee-nykyalueet.mjs \
 *     <ne_10m_admin_1_states_provinces.geojson> <ulos-kansio> [ISO,ISO,…]
 * Tuottaa <ulos>/nykyalueet-<iso>.json ({ lahde, alueet, rajat }) ja
 * <ulos>/nimiot-vedos4.json (tuotannon nimistö + uudet nykyalueet + rajat).
 *
 * RAJAT: polygonien särmät, joiden kahta puolta on ERI alue samassa maassa
 * (sama särmä kahdessa eri ryhmän piirteessä); rannat ja valtionrajat (särmä
 * vain kerran) jäävät pois. Särmät ketjutetaan polylineiksi ja harvennetaan
 * (Douglas–Peucker 0,004°) kuten FRA/DEU:ssa.
 * NIMEN PAIKKA: pinta-alapainotettu keskipiste; käsin säädetyt paikat
 * taulukossa KASIN (törmäävät kaupunkeihin/nostoihin).
 * SAMA NIMI KULTTUURINIMENÄ (1873-nimistön `maakunta`) → nykyalueen nimi
 * jätetään pois, raja piirtyy silti (vedos 2:n sääntö).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const [,, NE, ULOS, ISOT = 'ITA,ESP,GBR,POL,AUT,CHE'] = process.argv;
const TUOTANTO = '/Users/koodaus/pyramidi-poltto/ajo-20260922/nimiot-poltto-3.json';
mkdirSync(ULOS, { recursive: true });
const ne = JSON.parse(readFileSync(NE, 'utf8'));

/** Ryhmän tunnus ja suomenkielinen nimi maittain. */
const RYHMA = {
  ITA: (p) => p.region,
  ESP: (p) => p.region,
  GBR: (p) => p.geonunit,
  POL: (p) => p.name,
  AUT: (p) => p.name,
  CHE: (p) => p.name,
};
const NIMI_FI = {
  ITA: {
    'Abruzzo': 'Abruzzo', 'Apulia': 'Apulia', 'Basilicata': 'Basilicata', 'Calabria': 'Calabria', 'Campania': 'Campania',
    'Emilia-Romagna': 'Emilia-Romagna', 'Friuli-Venezia Giulia': 'Friuli-Venezia Giulia', 'Lazio': 'Lazio', 'Liguria': 'Liguria',
    'Lombardia': 'Lombardia', 'Marche': 'Marche', 'Molise': 'Molise', 'Piemonte': 'Piemonte', 'Sardegna': 'Sardinia',
    'Sicily': 'Sisilia', 'Toscana': 'Toscana', 'Trentino-Alto Adige': 'Trentino-Alto Adige', 'Umbria': 'Umbria',
    "Valle d'Aosta": 'Aostanlaakso', 'Veneto': 'Veneto',
  },
  ESP: {
    'Andalucía': 'Andalusia', 'Aragón': 'Aragonia', 'Asturias': 'Asturia', 'Canary Is.': 'Kanariansaaret', 'Cantabria': 'Kantabria',
    'Castilla y León': 'Kastilia ja León', 'Castilla-La Mancha': 'Kastilia-La Mancha', 'Cataluña': 'Katalonia', 'Ceuta': 'Ceuta',
    'Extremadura': 'Extremadura', 'Foral de Navarra': 'Navarra', 'Galicia': 'Galicia', 'Islas Baleares': 'Baleaarit',
    'La Rioja': 'La Rioja', 'Madrid': 'Madrid', 'Melilla': 'Melilla', 'Murcia': 'Murcia', 'País Vasco': 'Baskimaa', 'Valenciana': 'Valencia',
  },
  GBR: { England: 'Englanti', Scotland: 'Skotlanti', Wales: 'Wales', 'Northern Ireland': 'Pohjois-Irlanti' },
  POL: {
    'Silesian': 'Sleesia', 'Lesser Poland': 'Vähä-Puola', 'Subcarpathian': 'Podkarpackie', 'Lower Silesian': 'Ala-Sleesia',
    'Opole': 'Opole', 'Podlachian': 'Podlasia', 'Warmian-Masurian': 'Varmia-Masuria', 'Lubusz': 'Lubuskie',
    'West Pomeranian': 'Länsi-Pommeri', 'Lublin': 'Lublin', 'Pomeranian': 'Pommeri', 'Masovian': 'Masovia', 'Łódź': 'Łódź',
    'Kuyavian-Pomeranian': 'Kujavia-Pommeri', 'Greater Poland': 'Suur-Puola', 'Świętokrzyskie': 'Świętokrzyskie',
  },
  AUT: {
    'Niederösterreich': 'Ala-Itävalta', 'Oberösterreich': 'Ylä-Itävalta', 'Burgenland': 'Burgenland', 'Vorarlberg': 'Vorarlberg',
    'Tirol': 'Tiroli', 'Salzburg': 'Salzburg', 'Kärnten': 'Kärnten', 'Steiermark': 'Steiermark', 'Wien': 'Wien',
  },
  CHE: {
    'Valais': 'Valais', 'Ticino': 'Ticino', 'Graubünden': 'Graubünden', 'Schaffhausen': 'Schaffhausen', 'Thurgau': 'Thurgau',
    'Zürich': 'Zürich', 'Aargau': 'Aargau', 'Basel-Stadt': 'Basel-Stadt', 'Basel-Landschaft': 'Basel-Landschaft',
    'Sankt Gallen': 'St. Gallen', 'Solothurn': 'Solothurn', 'Jura': 'Jura', 'Genève': 'Geneve', 'Vaud': 'Vaud',
    'Neuchâtel': 'Neuchâtel', 'Bern': 'Bern', 'Lucerne': 'Luzern', 'Zug': 'Zug', 'Uri': 'Uri', 'Schwyz': 'Schwyz',
    'Glarus': 'Glarus', 'Nidwalden': 'Nidwalden', 'Fribourg': 'Fribourg', 'Obwalden': 'Obwalden',
    'Appenzell Ausserrhoden': 'Appenzell Ausserrhoden', 'Appenzell Innerrhoden': 'Appenzell Innerrhoden',
  },
};
/** Pienet alueet (`koko: pieni`, vasta z8:sta). */
const PIENET = new Set(['Ceuta', 'Melilla', 'Madrid', 'Wien', 'Aostanlaakso', 'Molise', 'Basel-Stadt', 'Zug', 'Geneve',
  'Appenzell Innerrhoden', 'Appenzell Ausserrhoden', 'Nidwalden', 'Obwalden', 'Glarus', 'Schaffhausen', 'Uri', 'Schwyz']);
/** Käsin säädetyt sijainnit (lon, lat): pois kaupunkien, nostojen ja jokien päältä. */
const KASIN = {
  'Englanti': [-1.3, 52.6], 'Skotlanti': [-4.2, 56.9], 'Wales': [-3.75, 52.35], 'Pohjois-Irlanti': [-6.9, 54.6],
  'Kastilia ja León': [-5.0, 41.7], 'Kastilia-La Mancha': [-2.9, 39.5], 'Andalusia': [-4.7, 37.4], 'Aragonia': [-0.5, 41.4],
  'Katalonia': [1.2, 41.9], 'Galicia': [-8.0, 42.8], 'Extremadura': [-6.2, 39.2], 'Valencia': [-0.55, 39.4],
  'Emilia-Romagna': [10.9, 44.55], 'Trentino-Alto Adige': [11.3, 46.4], 'Friuli-Venezia Giulia': [12.9, 46.2],
  'Masovia': [21.2, 52.6], 'Suur-Puola': [17.0, 52.3], 'Ala-Sleesia': [16.3, 51.2], 'Vähä-Puola': [20.3, 49.9],
  'Ala-Itävalta': [15.6, 48.3], 'Steiermark': [15.0, 47.2], 'Tiroli': [11.4, 47.25],
};

const norm = (t) => String(t).toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const tuotanto = JSON.parse(readFileSync(TUOTANTO, 'utf8'));
const kulttuuri = new Set(tuotanto.filter((n) => n.luokka === 'maakunta').map((n) => norm(n.teksti)));

/** Pinta-alapainotettu keskipiste ja ala (asteina²) polygonijoukolle. */
function keskipiste(polygonit) {
  let A = 0; let cx = 0; let cy = 0;
  for (const poly of polygonit) {
    const r = poly[0];
    let a = 0; let x = 0; let y = 0;
    for (let i = 0; i < r.length - 1; i += 1) {
      const f = r[i][0] * r[i + 1][1] - r[i + 1][0] * r[i][1];
      a += f; x += (r[i][0] + r[i + 1][0]) * f; y += (r[i][1] + r[i + 1][1]) * f;
    }
    a /= 2; if (!a) continue;
    x /= 6 * a; y /= 6 * a;
    A += Math.abs(a); cx += x * Math.abs(a); cy += y * Math.abs(a);
  }
  return { lon: cx / A, lat: cy / A, ala: A };
}
/** Douglas–Peucker asteina. */
function harvenna(pisteet, eps) {
  if (pisteet.length < 3) return pisteet;
  const [a, b] = [pisteet[0], pisteet[pisteet.length - 1]];
  let max = 0; let idx = 0;
  const dx = b[0] - a[0]; const dy = b[1] - a[1]; const L2 = dx * dx + dy * dy;
  for (let i = 1; i < pisteet.length - 1; i += 1) {
    const p = pisteet[i];
    const t = L2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2)) : 0;
    const d = Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
    if (d > max) { max = d; idx = i; }
  }
  if (max <= eps) return [a, b];
  return [...harvenna(pisteet.slice(0, idx + 1), eps).slice(0, -1), ...harvenna(pisteet.slice(idx), eps)];
}
const avain = (p) => `${p[0].toFixed(5)},${p[1].toFixed(5)}`;
const pyorista = (p) => [Math.round(p[0] * 1e4) / 1e4, Math.round(p[1] * 1e4) / 1e4];

const kaikkiNimet = [];
const kaikkiRajat = [];
const raportti = [];
for (const iso of ISOT.split(',')) {
  const piirteet = ne.features.filter((f) => f.properties.adm0_a3 === iso);
  const ryhmat = new Map();
  for (const f of piirteet) {
    const r = RYHMA[iso](f.properties);
    if (!ryhmat.has(r)) ryhmat.set(r, []);
    const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    ryhmat.get(r).push(...polys);
  }
  // Särmät: avain → { n, ryhmat:Set, a, b }
  const sarmat = new Map();
  for (const [r, polys] of ryhmat) {
    for (const poly of polys) for (const rengas of poly) {
      for (let i = 0; i < rengas.length - 1; i += 1) {
        const a = rengas[i]; const b = rengas[i + 1];
        const ka = avain(a); const kb = avain(b);
        if (ka === kb) continue;
        const k = ka < kb ? `${ka}|${kb}` : `${kb}|${ka}`;
        const s = sarmat.get(k) ?? { ryhmat: new Set(), a: ka < kb ? a : b, b: ka < kb ? b : a };
        s.ryhmat.add(r);
        sarmat.set(k, s);
      }
    }
  }
  const rajasarmat = [...sarmat.values()].filter((s) => s.ryhmat.size >= 2);
  // Ketjutus: pisteestä lähtevät särmät.
  const naapurit = new Map();
  for (const s of rajasarmat) {
    for (const [p, q] of [[s.a, s.b], [s.b, s.a]]) {
      const k = avain(p);
      if (!naapurit.has(k)) naapurit.set(k, []);
      naapurit.get(k).push({ p, q, s });
    }
  }
  const kaytetty = new Set();
  const viivat = [];
  const kulje = (alku) => {
    const ketju = [alku.p];
    let nyt = alku;
    for (;;) {
      kaytetty.add(nyt.s);
      ketju.push(nyt.q);
      const seuraavat = (naapurit.get(avain(nyt.q)) ?? []).filter((e) => !kaytetty.has(e.s));
      if (seuraavat.length !== 1 || (naapurit.get(avain(nyt.q)) ?? []).length !== 2) break;
      nyt = seuraavat[0];
    }
    return ketju;
  };
  // Aloita solmuista (haarautumat ja päät), sitten silmukat.
  const solmut = [...naapurit.entries()].filter(([, e]) => e.length !== 2);
  for (const [, lahdot] of solmut) for (const e of lahdot) if (!kaytetty.has(e.s)) viivat.push(kulje(e));
  for (const s of rajasarmat) if (!kaytetty.has(s)) viivat.push(kulje(naapurit.get(avain(s.a)).find((e) => e.s === s)));
  const harvennetut = viivat.map((v) => harvenna(v, 0.004).map(pyorista)).filter((v) => v.length > 1);
  const pisteita = harvennetut.reduce((n, v) => n + v.length, 0);

  const alueet = [];
  for (const [r, polys] of ryhmat) {
    const nimiFi = NIMI_FI[iso]?.[r] ?? r;
    const { lon, lat, ala } = keskipiste(polys);
    alueet.push({ iso, tunnus: r, nimiFi, lon: Math.round(lon * 1e3) / 1e3, lat: Math.round(lat * 1e3) / 1e3, alaAst2: Math.round(ala * 1e3) / 1e3 });
  }
  alueet.sort((a, b) => b.alaAst2 - a.alaAst2);
  writeFileSync(`${ULOS}/nykyalueet-${iso.toLowerCase()}.json`, JSON.stringify({
    lahde: 'Natural Earth 10m admin_1_states_provinces (public domain)', alueet, rajat: harvennetut,
  }));
  const ohitetut = [];
  for (const a of alueet) {
    if (kulttuuri.has(norm(a.nimiFi))) { ohitetut.push(a.nimiFi); continue; }
    const [lon, lat] = KASIN[a.nimiFi] ?? [a.lon, a.lat];
    kaikkiNimet.push({ teksti: a.nimiFi, luokka: 'nykyalue', lon, lat, iso, koko: PIENET.has(a.nimiFi) ? 'pieni' : 'suuri', aika: 'pysyva', muste: 'ruoste-vahva' });
  }
  kaikkiRajat.push({ luokka: 'raja', iso, muste: 'ruoste-vahva', viivat: harvennetut });
  raportti.push(`${iso}: ${alueet.length} aluetta, nimiä ${alueet.length - ohitetut.length} (ohitettu kulttuurinimenä: ${ohitetut.join(', ') || '-'}), rajaviivoja ${harvennetut.length}, pisteitä ${pisteita}`);
}
writeFileSync(`${ULOS}/nimiot-vedos4.json`, JSON.stringify([...tuotanto, ...kaikkiNimet, ...kaikkiRajat]));
writeFileSync(`${ULOS}/nykyalueet-uudet.json`, JSON.stringify([...kaikkiNimet, ...kaikkiRajat.map((r) => ({ ...r, viivat: r.viivat.length }))], null, 1));
console.log(raportti.join('\n'));
console.log(`nimiot-vedos4.json: ${tuotanto.length} tuotannon riviä + ${kaikkiNimet.length} nimeä + ${kaikkiRajat.length} rajariviä`);
