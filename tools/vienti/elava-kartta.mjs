/*
 * ELÄVÄ KARTTA — skeema 1.45 (Fablen tilaus 26.9.2026, omistajan päätös;
 * docs/raportit/elava-kartta-suunnitelma-20260926.md). Vain natiivi, web ennallaan.
 *
 *   karttavalot.kokoluokka  'paakohde' | 'kohde' | 'pieni'. Sisältökirjurin taulu
 *                           js/packs/nostojen-kokoluokat.js (NOSTOJEN_KOKOLUOKAT[maa]
 *                           ['nosto:<tunnus>']) voittaa; muuten tasosta (Pelikoodari:
 *                           taso 1 → paakohde, 2 → kohde, 3 → pieni), jotta sääntö
 *                           asuu yhdessä paikassa. kokoluokkaLahde = 'data' | 'taso'.
 *   karttavalot.maakunta    "<ISO3>:<tunnus>" = maakuntarajojen alue, jonka sisällä
 *                           valon oma piste (lat/lon) on, saman maan alueista
 *                           (parillisuussääntö). Rannikon piste voi jäädä harvennetun
 *                           rajan ulkopuolelle, joten ulkopuolinen saa lähimmän saman
 *                           maan alueen enintään LAHIN_KM päästä (maakuntaLahde 'lahin');
 *                           meri (laji 'meri') ei saa maakuntaa. null = maalla ei
 *                           maakuntia tai piste kaukana merellä. Natiivin löytölaskuri
 *                           (3/7) laskee tästä.
 *   maakuntarajat.salaisuus karttavalon id tai null: maakunnan salaisuus-nosto
 *                           (js/packs/maakuntasalaisuudet.js, Sisältökirjuri; avaimet
 *                           MAAKUNNAT_KAIKKI-avaimia, esim. 'GRC:Attiki').
 */
import { existsSync } from 'node:fs';
import { NOSTOJEN_KOKOLUOKAT } from '../../js/packs/nostojen-kokoluokat.js';

const SALAISUUDET = new URL('../../js/packs/maakuntasalaisuudet.js', import.meta.url);
// Tiedosto tulee Sisältökirjurilta; puuttuessa jokainen salaisuus on null.
const MAAKUNTASALAISUUDET = existsSync(SALAISUUDET) ? ((await import(SALAISUUDET.href)).MAAKUNTASALAISUUDET ?? {}) : {};
const TASON_KOKOLUOKKA = { 1: 'paakohde', 2: 'kohde', 3: 'pieni' };

function renkaissa(renkaat, lon, lat) {
  let sisalla = false;
  for (const r of renkaat) {
    for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
      const [xi, yi] = r[i]; const [xj, yj] = r[j];
      if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) sisalla = !sisalla;
    }
  }
  return sisalla;
}

export const LAHIN_KM = 30;

function janaanKm(lon, lat, [x1, y1], [x2, y2]) {
  const k = Math.cos((lat * Math.PI) / 180);
  const [px, py, ax, ay, bx, by] = [lon * k, lat, x1 * k, y1, x2 * k, y2];
  const dx = bx - ax; const dy = by - ay;
  const t = dx || dy ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy))) : 0;
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy)) * 111.2;
}

/** { id, lahde: 'sisalla' | 'lahin' } tai null. */
export function maakuntaPisteelle(alueetMaittain, iso, lon, lat, { lahin = true } = {}) {
  const omat = alueetMaittain.get(iso) ?? [];
  for (const a of omat) {
    const [w, s, e, n] = a.bbox;
    if (lon < w || lon > e || lat < s || lat > n) continue;
    if (renkaissa(a.renkaat, lon, lat)) return { id: a.id, lahde: 'sisalla' };
  }
  if (!lahin) return null;
  const vara = LAHIN_KM / 111.2 / Math.max(0.2, Math.cos((lat * Math.PI) / 180));
  let paras = null;
  for (const a of omat) {
    const [w, s, e, n] = a.bbox;
    if (lon < w - vara || lon > e + vara || lat < s - vara || lat > n + vara) continue;
    for (const r of a.renkaat) {
      for (let i = 1; i < r.length; i += 1) {
        const d = janaanKm(lon, lat, r[i - 1], r[i]);
        if (d <= LAHIN_KM && (!paras || d < paras.d)) paras = { id: a.id, d };
      }
    }
  }
  return paras ? { id: paras.id, lahde: 'lahin' } : null;
}

export function rikastaElavaKartta(kokoelmat) {
  const alueet = kokoelmat.maakuntarajat?.alkiot ?? [];
  const alueetMaittain = new Map();
  for (const a of alueet) {
    if (!alueetMaittain.has(a.iso3)) alueetMaittain.set(a.iso3, []);
    alueetMaittain.get(a.iso3).push(a);
  }
  for (const v of kokoelmat.karttavalot.alkiot) {
    const data = NOSTOJEN_KOKOLUOKAT[v.maa]?.[`nosto:${v.tunnus}`];
    v.kokoluokka = data ?? TASON_KOKOLUOKKA[v.taso] ?? 'kohde';
    v.kokoluokkaLahde = data ? 'data' : 'taso';
    const m = Number.isFinite(v.lat) && Number.isFinite(v.lon)
      ? maakuntaPisteelle(alueetMaittain, v.maa, v.lon, v.lat, { lahin: v.laji !== 'meri' }) : null;
    v.maakunta = m?.id ?? null;
    v.maakuntaLahde = m?.lahde ?? null;
  }
  kokoelmat.karttavalot.kuvaus += ' Skeema 1.45 (Elävä kartta, vain natiivi): kokoluokka = paakohde | kohde | pieni '
    + '(kokoluokkaLahde data = js/packs/nostojen-kokoluokat.js, taso = taso 1/2/3), maakunta = maakuntarajojen alue, jossa valon '
    + `piste on (maakuntaLahde sisalla | lahin = lähin saman maan alue ≤ ${LAHIN_KM} km; meri ei saa maakuntaa; null = ei maakuntaa).`;
  kokoelmat.maakuntarajat.kuvaus += ' Skeema 1.45: salaisuus = maakunnan salaisuus-noston karttavalo-id (js/packs/maakuntasalaisuudet.js) tai null.';
  const valot = new Map(kokoelmat.karttavalot.alkiot.map((v) => [v.tunnus, v.id]));
  for (const a of alueet) {
    const tunnus = MAAKUNTASALAISUUDET[a.id];
    a.salaisuus = tunnus ? (valot.get(tunnus) ?? valot.get(tunnus.replace(/^nosto:/, '')) ?? null) : null;
  }
}
