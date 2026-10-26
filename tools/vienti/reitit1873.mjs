/*
 * REITIT 1873 — skeema 1.46 (Elävä kartta, Fable 26.9.2026; Karttasepän vektorit #3266).
 * Vuoden 1873 laivalinjat ja rautatiet omana kerroksenaan, vain natiivi. Lähde on
 * tools/vienti/reitit1873.json.gz (tools/tee-reitit1873.mjs): juuressa lahteet ja reitit
 * { id, laji 'laiva' | 'rautatie', nimi, vuosi, viivat [[[lon, lat], …]], lahde, lisenssi }.
 */
import { existsSync, readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';

export const REITTITIEDOSTO = new URL('./reitit1873.json.gz', import.meta.url);

export function lueReitit1873() {
  return existsSync(REITTITIEDOSTO)
    ? JSON.parse(gunzipSync(readFileSync(REITTITIEDOSTO)).toString('utf8')) : { lahteet: [], reitit: [] };
}

export function reitti1873Kokoelma(taulukko) {
  const { lahteet, reitit } = lueReitit1873();
  const k = taulukko('tools/vienti/reitit1873.json.gz (tools/tee-reitit1873.mjs, Karttaseppä)',
    'Vuoden 1873 laivalinjat ja rautatiet (skeema 1.46, Elävä kartta, vain natiivi): { id, laji = laiva | rautatie, '
      + 'nimi (null nimettömillä radoilla), vuosi, viivat [[[lon, lat], …]] (1e-3°, harvennettu), lahde = lähteen osoite (rata tai linja), '
      + 'lisenssi }. Rautatieryhmä = radan nimi (OpenHistoricalMap, start_date ≤ 1873). Juuren lahteet [{ id, nimi, url, lisenssi }]. '
      + 'Laiva lipuu 1873-reittiä kohdemaan lähimerellä ja junan savu nousee radalta (docs/raportit/elava-kartta-suunnitelma-20260926.md).',
    {}, reitit.map((r) => ({ ...r, nimi: r.nimi ?? null })));
  k.lahteet = lahteet;
  return k;
}
