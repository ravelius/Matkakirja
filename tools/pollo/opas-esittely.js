/*
 * ESIGENEROITU ESITTELY (omistaja 7.10.2026 00.4x, Päätoimittaja): lukitun kaupungin kohteiden kerronta on kirjoitettu
 * etukäteen (Opus-agentit, kieli- ja faktatarkistus, tools/opas/) ja on ämpärissä kiinteänä datana:
 *   media.matkakirja.app/opas/esittely-v1/<kaupunki-id>.json = { kaupunki, id, versio, kohteet: [{ id (Q), nimi, kuvaus,
 *     luokka, koko_m, korkeus_m?, teksti, lyhyt (kierros) | null, syventava, isoisa, lahteet }] }
 * Worker tarjoaa valmiin tekstin ensin (valmis: true) eikä kutsu mallia; Kysy ja muut toiveet pysyvät live-Sonnetilla.
 * Haetaan vain aineistoindeksin esittely-listan kaupungeille (CDN välimuistittaa 404:n), isolaatin muistissa 10 min.
 */
import { OPAS_AINEISTOT } from './aineistot.js';
import { OPAS_OMAT } from './opas-omat.js';

export const ESITTELY_JUURI = 'https://media.matkakirja.app/opas/esittely-v1/';
const MUISTI_MS = 10 * 60 * 1000;
const muisti = new Map();

/** Kaupungin id kuten aineistoindeksissä: pienaakkoset, diakriitit pois, ø → o, muut merkit → "-" (pariisi, koopenhamina). */
export const kaupunkiId = (nimi) => String(nimi ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/ø/g, 'o').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function tyhjennaEsittelyt() { muisti.clear(); }

/** Omat kohteet (opas-omat.js) kaupungin nimellä tai tunnuksella ("Gizan pyramidit" / giza) tai null. */
export function omatKohteet(kaupunki, env = null) {
  const id = kaupunkiId(kaupunki);
  const [avain, o] = Object.entries(OPAS_OMAT).find(([k, v]) => k === id || kaupunkiId(v.nimi) === id) ?? [];
  if (o?.kokeilu && !(env?.OPAS_KOKEILU ?? []).includes(avain)) return null;
  return o?.kohteet?.length ? o : null;
}

/** Kaupungin valmis esittely tai null (ei listalla, haku epäonnistui tai muoto väärä). env.OPAS_ESITTELY_TESTI: { id: data }. */
export async function oppaanEsittely(env, kaupunki, haku = fetch, nyt = Date.now()) {
  const id = kaupunkiId(kaupunki);
  if (!id) return null;
  if (env?.OPAS_ESITTELY_TESTI) return env.OPAS_ESITTELY_TESTI[id] ?? null;
  const omat = omatKohteet(kaupunki, env);
  if (omat) return omat;
  if (!(OPAS_AINEISTOT.esittely ?? []).includes(id)) return null;
  const m = muisti.get(id);
  if (m && nyt - m.aika < MUISTI_MS) return m.data;
  let data = null;
  try {
    const polku = OPAS_AINEISTOT.esittely_polut?.[id];
    const v = await haku(polku ? `https://media.matkakirja.app/${polku}` : `${ESITTELY_JUURI}${id}.json`);
    const d = v.ok ? await v.json() : null;
    data = Array.isArray(d?.kohteet) ? d : null;
  } catch { data = null; }
  muisti.set(id, { aika: nyt, data });
  return data;
}

/*
 * KIERROKSEN ALKU (omistaja 7.10.: avaus lupaa "Kierros alkaa X:stä"): kaupungin avauksen nimeämä ensimmäinen pysähdys
 * (esittelypohjan kierroksen ensimmäinen). Ilman tätä worker aloitti kameraa lähimmästä (Rooma keskipisteestä Trevi, avaus
 * Forum Romanum). Uusissa esittelyissä kenttä kierros: [id, …]; ämpärin muuttumattomille v1-tiedostoille taulu.
 */
export const ESITTELY_ALKU = Object.freeze({ pariisi: 'Q2981', rooma: 'Q180212', lontoo: 'Q41225', koopenhamina: 'Q110289' });

/** Avauksen lupaama kierroksen ensimmäinen kohde (Q) tai null (ei avausta → alku kameraa lähimmästä kuten ennen). */
export function esittelynAlku(esittely, kaupunki) {
  if (!esittely?.avaus) return null;
  return esittely.kierros?.[0] ?? ESITTELY_ALKU[kaupunkiId(kaupunki)] ?? null;
}

/** Kohteen valmis kerronta tunnuksella; lyhyt (kierros) jos pyydetty ja olemassa. */
export function valmisKohde(esittely, id) {
  return esittely?.kohteet?.find((k) => k.id === id && typeof k.teksti === 'string' && k.teksti.trim()) ?? null;
}
