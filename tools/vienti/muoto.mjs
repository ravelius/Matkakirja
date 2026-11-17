/*
 * KOHTEEN MUOTO KARTTAVALOILLE (skeema 1.73; Pelikoodari 17.11.2026; suunnitelma 20261117-maakartan-kohteet.md kohdat 3 ja 8).
 *
 * Lähde data/muoto.json (SK): { _kuvaus, <maa>: { <karttavalon id>: { tyyppi } } }. Vienti antaa valolle kentän
 *   muoto = { tyyppi, maisema } tai null (ei riviä).
 * maisema = maasto on kohde (vuori, maasto): natiivin kameran sääntö (KameranSaanto, tapaus 2) laskeutuu maisemaan; muut
 * pysyvät maan kartalla, kunnes paikalla on lähimalli. Tyyppi valitsee maakartan kohteen (KS) tai pisteen/viivamerkin.
 *
 * Vartijat (testit tests/muoto.test.mjs): tuntematon tyyppi on virhe; kohde, jolla on muoto (ei vesi, kaupunki eikä
 * ei-muotoa), ei saa olla vedessä (oma piste yli RANTAVARA_KM maan rajojen ulkopuolella, kun maan rajat tunnetaan); rivi, jonka id:tä ei
 * ole valoissa, on virhe (kirjoitusvirhe tai poistunut valo).
 */
import { existsSync, readFileSync } from 'node:fs';

/** Kohteen muodot: oma kohde tai tyyppikohde (SK:n luettelo + suunnitelman kohdan 3 taulu). */
export const KOHDETYYPIT = Object.freeze([
  'kirkko', 'kupolikirkko', 'temppeli', 'palatsi', 'asema', 'silta', 'linna', 'luostari', 'raunio', 'kaupunginmuuri', 'luola',
  'muistomerkki', 'majakka', 'mylly', 'satama', 'megaliitti', 'kaivos',
]);
/** Maisema: ei kohdetta, kamera laskeutuu maisemaan. */
export const MAISEMATYYPIT = Object.freeze(['vuori', 'maasto']);
/** Ei kohdetta: vesi = viivamerkki, kaupunki ja ei-muotoa = piste. */
export const MERKKITYYPIT = Object.freeze(['vesi', 'kaupunki', 'ei-muotoa']);
export const MUOTOTYYPIT = Object.freeze([...KOHDETYYPIT, ...MAISEMATYYPIT, ...MERKKITYYPIT]);

const TUNNETUT = new Set(MUOTOTYYPIT);
const MAISEMA = new Set(MAISEMATYYPIT);
const KOHDE = new Set(KOHDETYYPIT);

export const MUOTO_KUVAUS = 'muoto (skeema 1.73, data/muoto.json): { tyyppi, maisema } tai null. tyyppi = kohde ('
  + `${KOHDETYYPIT.join(' | ')}), maisema (${MAISEMATYYPIT.join(' | ')}) tai merkki (${MERKKITYYPIT.join(' | ')}); `
  + 'maisema = maasto on kohde (natiivin kameran sääntö: laskeutuu maisemaan), muuten kamera pysyy maan kartalla.';

/** data/muoto.json litteänä: Map id → { tyyppi, maa } (maa = tiedoston maa-avain). Puuttuva tiedosto = tyhjä. */
export function lueMuotoData(polku = new URL('../../data/muoto.json', import.meta.url)) {
  if (!existsSync(polku)) return new Map();
  return litista(JSON.parse(readFileSync(polku, 'utf8')));
}

/** { <maa>: { <id>: { tyyppi } } } → Map; sama id kahdesti on virhe. */
export function litista(data) {
  const rivit = new Map();
  for (const [maa, kohteet] of Object.entries(data ?? {})) {
    if (maa.startsWith('_') || !kohteet || typeof kohteet !== 'object') continue;
    for (const [id, arvo] of Object.entries(kohteet)) {
      if (rivit.has(id)) throw new Error(`muoto: ${id} kahdesti (${rivit.get(id).maa}, ${maa})`);
      rivit.set(id, { tyyppi: arvo?.tyyppi ?? null, maa });
    }
  }
  return rivit;
}

/** Muoto yhdelle riville; tuntematon tyyppi heittää. */
export function muotoRivista(id, rivi) {
  const tyyppi = rivi?.tyyppi;
  if (!TUNNETUT.has(tyyppi)) throw new Error(`muoto: ${id}: tuntematon tyyppi ${JSON.stringify(tyyppi)} (sallitut: ${MUOTOTYYPIT.join(', ')})`);
  return { tyyppi, maisema: MAISEMA.has(tyyppi) };
}

function sisalla(maa, p) {
  if (!maa?.renkaat) return false;
  const [w, s, e, n] = maa.bbox ?? [-Infinity, -Infinity, Infinity, Infinity];
  if (p.lon < w || p.lon > e || p.lat < s || p.lat > n) return false;
  let tulos = false;
  for (const rengas of maa.renkaat) {
    for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i, i += 1) {
      const [xi, yi] = rengas[i]; const [xj, yj] = rengas[j];
      if ((yi > p.lat) !== (yj > p.lat) && p.lon < ((xj - xi) * (p.lat - yi)) / (yj - yi) + xi) tulos = !tulos;
    }
  }
  return tulos;
}

/** Rannan vara (km): kohde saa olla näin lähellä maan rajaa sen ulkopuolella (vuorovesisaari Mont-Saint-Michel, 10 m:n rantaviiva). */
export const RANTAVARA_KM = 3;

/** Pienin etäisyys (km) pisteestä maan rajaviivaan (tasoarvio pisteen leveydellä). */
export function rajanEtaisyysKm(maa, p) {
  const kx = 111.32 * Math.cos((p.lat * Math.PI) / 180), ky = 110.57;
  let min = Infinity;
  for (const rengas of maa?.renkaat ?? []) {
    for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i, i += 1) {
      const ax = (rengas[j][0] - p.lon) * kx, ay = (rengas[j][1] - p.lat) * ky;
      const bx = (rengas[i][0] - p.lon) * kx, by = (rengas[i][1] - p.lat) * ky;
      const dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy;
      const t = l2 > 0 ? Math.max(0, Math.min(1, -(ax * dx + ay * dy) / l2)) : 0;
      min = Math.min(min, Math.hypot(ax + t * dx, ay + t * dy));
    }
  }
  return min;
}

/** Kohde on maalla: oman maan sisällä tai enintään RANTAVARA_KM sen rajasta. */
export function maalla(maa, p) {
  return sisalla(maa, p) || rajanEtaisyysKm(maa, p) <= RANTAVARA_KM;
}

/**
 * Antaa jokaiselle valolle kentän muoto (rivi tai null). <maarajaAlkiot> = maarajat-kokoelman alkiot (id ISO3, renkaat, bbox);
 * kohteen piste tarkistetaan oman maan rajoja vasten (vedessä = virhe). Palauttaa määrät tyypeittäin.
 */
export function rikastaMuoto(valot, rivit, maarajaAlkiot = []) {
  const maarajat = new Map(maarajaAlkiot.map((m) => [m.id, m]));
  const loydetyt = new Set();
  const maarat = {};
  for (const v of valot) {
    const rivi = rivit.get(v.id);
    if (!rivi) { v.muoto = null; continue; }
    loydetyt.add(v.id);
    v.muoto = muotoRivista(v.id, rivi);
    maarat[v.muoto.tyyppi] = (maarat[v.muoto.tyyppi] ?? 0) + 1;
    const raja = maarajat.get(v.maa);
    if (KOHDE.has(v.muoto.tyyppi) && raja && Number.isFinite(v.lat) && !maalla(raja, v)) {
      throw new Error(`muoto: ${v.id} (${v.nimi}, ${v.muoto.tyyppi}) on vedessä: ${rajanEtaisyysKm(raja, v).toFixed(1)} km maan ${v.maa} `
        + `rajan ulkopuolella (${v.lat}, ${v.lon}; vara ${RANTAVARA_KM} km)`);
    }
  }
  const puuttuvat = [...rivit.keys()].filter((id) => !loydetyt.has(id));
  if (puuttuvat.length) throw new Error(`muoto: ${puuttuvat.length} riviä ilman karttavaloa: ${puuttuvat.slice(0, 8).join(', ')}`);
  return maarat;
}
