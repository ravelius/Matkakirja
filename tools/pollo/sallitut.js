/*
 * SALLITUT 3D-KAUPUNGIT (omistaja 7.10.2026 00.4x; Linssiseppä 2:n mittaus 7.10.): oppaaseen ja lentoihin pääsee vain
 * kaupunkiin, jolla on oikea 3D. Lähde: proto-3d/lokit/linssiseppa2-3d-kattavuus/sallitut-3d.json (Google
 * Photorealistic 3D Tiles (Cesium ion 2275207), Linssiseppä 2 7.10.2026).
 * Sääntö: SALLITTU: keskusta (0–0,5 km, 17 pistettä) tarkkoja >= 50 % ja r_m >= 1 km; vesipisteet (mediaanireuna >=
 * 12 m) pois; r_m = uloin rengas, jota ennen kaikissa renkaissa tarkkoja >= 2 ja >= 50 % maapisteistä (yksi >= 1/3
 * rengas sallitaan kerran, jos seuraava on hyvä); RAJA: keskusta tarkkoja >= 20 % tai keskitasoa >= 40 %; muuten POIS
 * Mukana vain SALLITTU-luokka (Päätoimittaja 7.10. 01.2x: "vain oikea 3D"); RAJA-kaupungit (Sisilia, Varsova, Kiova,
 * Sarajevo, Tromssa) ja POIS-luokka eivät ole. Sisilia lisätään, jos LS2:n uusintamittaus korjatulla pisteellä on tarkka.
 * /opas/aineistot palauttaa sallitut (raja: [] yhteensopivuuden vuoksi); natiivi (LS1 OpasSallitut) rajaa niillä
 * kaupunkiehdotukset, lennot ja vapaan liikkeen. Worker torjuu muut kaupungit ja r_m-säteen ulkopuoliset kohteet.
 * Id kuten KaupunkiTiet.Tunnus / aineistoindeksi (pienaakkoset, diakriitit pois, muut → "-").
 */
export const OPAS_SALLITUT = Object.freeze({
  sallitut: [
    {"id": "barcelona", "nimi": "Barcelona", "lat": 41.40325, "lon": 2.15702, "r_m": 20000},
    {"id": "berliini", "nimi": "Berliini", "lat": 52.52087, "lon": 13.41334, "r_m": 20000},
    {"id": "budapest", "nimi": "Budapest", "lat": 47.49105, "lon": 19.06502, "r_m": 20000},
    {"id": "firenze", "nimi": "Firenze", "lat": 43.76615, "lon": 11.24522, "r_m": 20000},
    {"id": "granada", "nimi": "Granada", "lat": 37.17095, "lon": -3.6179, "r_m": 20000},
    {"id": "helsinki", "nimi": "Helsinki", "lat": 60.19638, "lon": 24.93088, "r_m": 20000},
    {"id": "koopenhamina", "nimi": "Kööpenhamina", "lat": 55.67247, "lon": 12.53935, "r_m": 20000},
    {"id": "lissabon", "nimi": "Lissabon", "lat": 38.71282, "lon": -9.14311, "r_m": 20000},
    {"id": "ljubljana", "nimi": "Ljubljana", "lat": 46.05214, "lon": 14.50502, "r_m": 20000},
    {"id": "lontoo", "nimi": "Lontoo", "lat": 51.49754, "lon": -0.12574, "r_m": 20000},
    {"id": "madrid", "nimi": "Madrid", "lat": 40.4198, "lon": -3.69179, "r_m": 20000},
    {"id": "marseille", "nimi": "Marseille", "lat": 43.3089, "lon": 5.40263, "r_m": 20000},
    {"id": "pariisi", "nimi": "Pariisi", "lat": 48.86122, "lon": 2.35092, "r_m": 20000},
    {"id": "rooma", "nimi": "Rooma", "lat": 41.89737, "lon": 12.48703, "r_m": 20000},
    {"id": "tukholma", "nimi": "Tukholma", "lat": 59.3299, "lon": 18.07382, "r_m": 20000},
    {"id": "wien", "nimi": "Wien", "lat": 48.21437, "lon": 16.37199, "r_m": 20000},
    {"id": "dublin", "nimi": "Dublin", "lat": 53.33259, "lon": -6.25881, "r_m": 15000},
    {"id": "edinburgh", "nimi": "Edinburgh", "lat": 55.93615, "lon": -3.17025, "r_m": 15000},
    {"id": "kreeta", "nimi": "Kreeta", "lat": 35.28554, "lon": 25.30426, "r_m": 15000},
    {"id": "bergen", "nimi": "Bergen", "lat": 60.38804, "lon": 5.32924, "r_m": 10000},
    {"id": "bryssel", "nimi": "Bryssel", "lat": 50.85045, "lon": 4.35292, "r_m": 10000},
    {"id": "bukarest", "nimi": "Bukarest", "lat": 44.43251, "lon": 26.10329, "r_m": 10000},
    {"id": "krakova", "nimi": "Krakova", "lat": 50.05902, "lon": 19.9439, "r_m": 10000},
    {"id": "oslo", "nimi": "Oslo", "lat": 59.91888, "lon": 10.74747, "r_m": 10000},
    {"id": "praha", "nimi": "Praha", "lat": 50.08636, "lon": 14.42001, "r_m": 10000},
    {"id": "sevilla", "nimi": "Sevilla", "lat": 37.38158, "lon": -5.99563, "r_m": 10000},
    {"id": "sofia", "nimi": "Sofia", "lat": 42.69789, "lon": 23.33376, "r_m": 10000},
    {"id": "tampere", "nimi": "Tampere", "lat": 61.49193, "lon": 23.75253, "r_m": 10000},
    {"id": "valletta", "nimi": "Valletta", "lat": 35.88815, "lon": 14.49975, "r_m": 10000},
    {"id": "vilna", "nimi": "Vilna", "lat": 54.69282, "lon": 25.26939, "r_m": 10000},
    {"id": "ateena", "nimi": "Ateena", "lat": 37.96964, "lon": 23.71825, "r_m": 7000},
    {"id": "islanti", "nimi": "Islanti", "lat": 64.14135, "lon": -21.81218, "r_m": 7000},
    {"id": "amsterdam", "nimi": "Amsterdam", "lat": 52.3661, "lon": 4.90092, "r_m": 5000},
    {"id": "kosice", "nimi": "Košice", "lat": 48.71823, "lon": 21.25015, "r_m": 5000},
    {"id": "luxemburg", "nimi": "Luxemburg", "lat": 49.6132, "lon": 6.12956, "r_m": 5000},
    {"id": "venetsia", "nimi": "Venetsia", "lat": 45.43566, "lon": 12.33596, "r_m": 3000},
  ],
});

/** Kaupungin id nimestä (sama kaava kuin aineistoindeksissä). */
export const sallittuId = (nimi) => String(nimi ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/ø/g, 'o').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/*
 * KYTKIN (Päätoimittaja 7.10. 01.3x): /opas/aineistot palauttaa sallitut aina, mutta workerin esto (403, kohteiden
 * suodatus, Kysyn ei-sallittu) on päällä vain, kun env.OPAS_SALLITUT_ESTO = '1' — TF 154/155 eivät vielä lue listaa
 * (natiivi junassa 157). Testi voi antaa oman listan env.OPAS_SALLITUT_TESTI ({ sallitut }), jolloin esto on päällä.
 */
const lista = (env) => env?.OPAS_SALLITUT_TESTI ?? (String(env?.OPAS_SALLITUT_ESTO ?? '') === '1' ? OPAS_SALLITUT : null);
const kaikki = (l) => l.sallitut;
const metreina = (a, b) => {
  const r = Math.PI / 180, dLat = (b.lat - a.lat) * r, dLon = (b.lon - a.lon) * r;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371000 * Math.asin(Math.sqrt(x));
};

/** Kaupungin sallittu alue { id, nimi, lat, lon, r_m } tai null (ei sallittu tai tuntematon). */
export function sallittuKaupunki(nimi, env = null) {
  const id = sallittuId(nimi);
  if (!id) return null;
  const l = lista(env);
  if (!l) return { id, nimi, rajaton: true };
  return l.sallitut.find((x) => x.id === id) ?? null;
}

/** Onko piste jonkin sallitun kaupungin r_m-säteellä; kaupunki annettuna vain sen säteellä. */
export function pisteSallittu(piste, kaupunki = null, env = null) {
  const l = lista(env);
  if (!l) return true;
  if (!Number.isFinite(piste?.lat) || !Number.isFinite(piste?.lon)) return false;
  const alueet = kaupunki ? [sallittuKaupunki(kaupunki, env)].filter(Boolean) : kaikki(l);
  return alueet.some((a) => metreina(a, piste) <= a.r_m);
}
