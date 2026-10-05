/*
 * NOMINATIM (OpenStreetMap) elävälle oppaalle (omistaja 5.10.2026 ilta "lisää Nominatim", juna 146; Päätoimittajan ehdot).
 *
 * Käyttö vain kahteen: (1) koordinaatit paikalle, jolle Wikipedia/Wikidata ei anna koordinaattia, ja (2) kadun tai kanavan
 * muoto (polygon_geojson) korostusviivan reittipisteiksi. Nominatimin käyttöehdot (operations.osmfoundation.org/policies/
 * nominatim): enintään 1 haku sekunnissa koko palvelusta, tulokset välimuistiin, tunnistava User-Agent, ei
 * automaattista täydennystä eikä massahakuja. Siksi:
 *   - pysyvä KV-välimuisti (nominatim:v1:…; tyhjä tulos 7 vrk),
 *   - vuoro: isolaatin oma 1/s-jono + KV-aikaleima koko palvelulle (paras mahdollinen ilman keskitettyä lukkoa;
 *     hakuja on vain oppaan pysähdyksissä, joten todellinen tahti on paljon alle rajan),
 *   - oma UA sovelluksen nimellä (ei sähköpostia), palvelin env.NOMINATIM_OSOITE (vaihdettavissa ilman sovelluspäivitystä).
 * Data: © OpenStreetMap -tekijät, ODbL; vastaukseen merkitään lahteet: ['osm'], ja natiivi näyttää krediitin.
 */

export const NOMINATIM_OLETUS = 'https://nominatim.openstreetmap.org';
const UA = 'Matkakirja-opas/1.0 (+https://matkakirja.app)';
const VALI_MS = 1000;
const TYHJA_TTL_S = 7 * 24 * 60 * 60;
let viimeisin = 0;

const nuku = (ms) => new Promise((r) => setTimeout(r, ms));

async function tiiviste(teksti) {
  const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(teksti));
  return [...new Uint8Array(h)].slice(0, 16).map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Odottaa vuoroa: ≤ 1 haku/s isolaatissa ja (paras mahdollinen) koko palvelussa KV-aikaleimalla. */
async function vuoro(kv, kello = Date.now) {
  const oma = Math.max(0, viimeisin + VALI_MS - kello());
  viimeisin = kello() + oma;
  if (oma) await nuku(oma);
  if (kv) {
    const yhteinen = Number(await kv.get('nominatim:vuoro').catch(() => 0)) || 0;
    const odota = Math.max(0, yhteinen + VALI_MS - kello());
    if (odota) await nuku(Math.min(odota, 2000));
    await kv.put('nominatim:vuoro', String(kello()), { expirationTtl: 60 }).catch(() => {});
  }
}

/**
 * Yksi Nominatim-haku nimellä (välimuistista, jos on). Palauttaa { lat, lon, geometria, osm } tai null.
 * geometria = GeoJSON (vain kun geometria: true).
 */
export async function nominatimHaku(haku, env, kysely, { geometria = false, osmTunnus = null } = {}) {
  const kv = env?.POLLO_KV ?? null;
  const avain = `nominatim:v1:${geometria ? 'g' : 'p'}:${await tiiviste((osmTunnus ? `lookup:${osmTunnus}` : kysely).toLowerCase())}`;
  if (kv) {
    const talletettu = await kv.get(avain).catch(() => null);
    if (talletettu) {
      const t = JSON.parse(talletettu);
      return t.tyhja ? null : t;
    }
  }
  await vuoro(kv);
  const juuri = String(env?.NOMINATIM_OSOITE || NOMINATIM_OLETUS).replace(/\/+$/, '');
  // osmTunnus (esim. R1234 Wikidatan P402:sta): tarkka haku tunnuksella, ei nimellä.
  const url = (osmTunnus ? `${juuri}/lookup?format=jsonv2&osm_ids=${encodeURIComponent(osmTunnus)}`
    : `${juuri}/search?format=jsonv2&limit=1&accept-language=fi&q=${encodeURIComponent(kysely)}`)
    + (geometria ? '&polygon_geojson=1&polygon_threshold=0.00002' : '');
  let tulos = null;
  try {
    const v = await haku(url, { headers: { 'user-agent': UA, accept: 'application/json' }, signal: AbortSignal.timeout?.(5000) });
    if (!v.ok) return null;   // palvelinvirhettä ei välimuisteta
    const d = (await v.json())?.[0];
    if (d) {
      tulos = { lat: Number(d.lat), lon: Number(d.lon), osm: `${d.osm_type ?? ''}${d.osm_id ?? ''}`,
        ...(geometria && d.geojson ? { geometria: d.geojson } : {}) };
    }
  } catch {
    return null;
  }
  if (kv) {
    await kv.put(avain, JSON.stringify(tulos ?? { tyhja: true }), tulos ? {} : { expirationTtl: TYHJA_TTL_S }).catch(() => {});
  }
  return tulos;
}

function etaisyys(a, b) {
  const r = Math.PI / 180, R = 6371000;
  const dLat = (b[0] - a[0]) * r, dLon = (b[1] - a[1]) * r;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

const pyor = (x) => [Math.round(x[0] * 1e6) / 1e6, Math.round(x[1] * 1e6) / 1e6];

/** Kohtisuora etäisyys metreinä pisteestä p janaan a–b (paikallinen tasoprojektio). */
function janaEtaisyys(p, a, b) {
  const kx = Math.cos((a[0] * Math.PI) / 180) * 111320, ky = 110540;
  const P = [(p[1] - a[1]) * kx, (p[0] - a[0]) * ky], B = [(b[1] - a[1]) * kx, (b[0] - a[0]) * ky];
  const l2 = B[0] ** 2 + B[1] ** 2;
  const t = l2 ? Math.max(0, Math.min(1, (P[0] * B[0] + P[1] * B[1]) / l2)) : 0;
  return Math.hypot(P[0] - t * B[0], P[1] - t * B[1]);
}

/** Douglas–Peucker (toleranssi metreinä). */
export function harvenna(pisteet, tol) {
  if (pisteet.length <= 2) return pisteet;
  let suurin = -1, i = 0;
  for (let j = 1; j < pisteet.length - 1; j += 1) {
    const d = janaEtaisyys(pisteet[j], pisteet[0], pisteet.at(-1));
    if (d > suurin) { suurin = d; i = j; }
  }
  if (suurin <= tol) return [pisteet[0], pisteet.at(-1)];
  return [...harvenna(pisteet.slice(0, i + 1), tol).slice(0, -1), ...harvenna(pisteet.slice(i), tol)];
}

/** Katuosuudet (MultiLineString) yhdeksi viivaksi: pisimmästä alkaen liitetään lähin pää (≤ 40 m), tarvittaessa käännettynä. */
function ketjuta(viivat) {
  const jaljella = viivat.filter((v) => v.length >= 2).sort((x, y) => y.length - x.length);
  if (!jaljella.length) return [];
  let ketju = jaljella.shift();
  for (let lisatty = true; lisatty && jaljella.length;) {
    lisatty = false;
    let paras = null;
    for (const [i, v] of jaljella.entries()) {
      for (const [loppuun, kaannos] of [[true, false], [true, true], [false, false], [false, true]]) {
        const w = kaannos ? [...v].reverse() : v;
        const d = loppuun ? etaisyys(ketju.at(-1), w[0]) : etaisyys(w.at(-1), ketju[0]);
        if (d <= 40 && (!paras || d < paras.d)) paras = { i, w, loppuun, d };
      }
    }
    if (paras) {
      jaljella.splice(paras.i, 1);
      ketju = paras.loppuun ? [...ketju, ...paras.w.slice(1)] : [...paras.w.slice(0, -1), ...ketju];
      lisatty = true;
    }
  }
  return ketju;
}

/** Alue (kanava-allas) → keskilinjan arvio: pääakselin lohkojen keskiarvot ~60 m välein. */
function keskilinja(pisteet) {
  let a = pisteet[0], b = pisteet[1], pisin = -1;
  const otos = pisteet.length > 400 ? pisteet.filter((_, i) => i % Math.ceil(pisteet.length / 400) === 0) : pisteet;
  for (const x of otos) for (const y of otos) { const d = etaisyys(x, y); if (d > pisin) { pisin = d; a = x; b = y; } }
  if (pisin < 20) return [];
  const kx = Math.cos((a[0] * Math.PI) / 180);
  const ax = [(b[1] - a[1]) * kx, b[0] - a[0]];
  const pituus2 = ax[0] ** 2 + ax[1] ** 2;
  const lohkoja = Math.min(30, Math.max(3, Math.round(pisin / 60)));
  const summat = Array.from({ length: lohkoja }, () => [0, 0, 0]);
  for (const x of pisteet) {
    const t = Math.min(0.999999, Math.max(0, ((x[1] - a[1]) * kx * ax[0] + (x[0] - a[0]) * ax[1]) / pituus2));
    const s = summat[Math.floor(t * lohkoja)];
    s[0] += x[0]; s[1] += x[1]; s[2] += 1;
  }
  return summat.filter((s) => s[2]).map((s) => [s[0] / s[2], s[1] / s[2]]);
}

/**
 * GeoJSON → reittipisteet [lat, lon] päästä päähän todellisen muodon mukaan (Linssiseppä: korostusviiva käyttää pisteet
 * sellaisenaan): viivat ketjutetaan ja harvennetaan Douglas–Peuckerilla 5 m (toleranssi kasvaa, kunnes ≤ enintaan
 * pistettä); alueelle keskilinjan arvio. null, jos käyttökelpoista muotoa ei ole.
 */
export function geometriaPisteiksi(geojson, enintaan = 30) {
  const k = geojson?.coordinates;
  if (!k) return null;
  const kaanna = (viiva) => viiva.filter((x) => Number.isFinite(x?.[0]) && Number.isFinite(x?.[1])).map(([lon, lat]) => [lat, lon]);
  let viiva;
  if (geojson.type === 'LineString') viiva = kaanna(k);
  else if (geojson.type === 'MultiLineString') viiva = ketjuta(k.map(kaanna));
  else if (geojson.type === 'Polygon') viiva = keskilinja(kaanna(k[0]));
  else if (geojson.type === 'MultiPolygon') viiva = keskilinja(k.flatMap((p) => kaanna(p[0])));
  else return null;
  if (!viiva || viiva.length < 2) return null;
  let tol = 5;
  let tulos = harvenna(viiva, tol);
  while (tulos.length > enintaan) { tol *= 1.5; tulos = harvenna(viiva, tol); }
  return tulos.length >= 2 ? tulos.map(pyor) : null;
}
