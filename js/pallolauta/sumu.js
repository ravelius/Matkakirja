/*
 * LÖYTÄMISEN SUMU — PROTOTYYPPI KEHITTÄJÄLIPUN TAKANA (Fable 21.9.2026,
 * omistajalle kaappauksina; ei julkaisuun ennen hyväksyntää).
 *
 * Kolme osaa, kaikki tämän lipun (`?sumu=1` tai localStorage
 * `matkakirja-sumu` = 1) takana, ja ilman lippua peli on täsmälleen
 * entinen:
 *
 *   1. NOSTOT LUONNOKSINA. Kohdemaan löytämättömät nostot piirretään
 *      haaleina lyijykynäluonnoksina (css .pallolauta-nosto-luonnos:
 *      harmaa, opacity 0,45), löydetyt mustetaan nykyiseen tapaan
 *      pehmeällä siirtymällä. Löytösääntö: nosto ~LOYTOSADE_KM:n
 *      säteellä käydystä kaupungista (game.world.visited + nykyinen)
 *      mustetaan itsestään; luonnoksen saa avata, ja avaaminen mustaa
 *      sen; ykköstaso on aina musteena. Löydetyt id:t localStorageen.
 *
 *   2. NAAPURIMAIDEN RAJAT. Maat, joissa ei ole käyty, saavat
 *      vaaleamman rajaviivan (js/pallovektorit.js asetaSumu: rajojen
 *      peitto × SUMUN_RAJAKERROIN); käytyjen maiden renkaat piirretään
 *      normaalilla peitolla omana viivajoukkonaan.
 *
 *   3. MAAN SISÄINEN SUMU. Jos kohdemaassa on useampi kohdekaupunki ja
 *      jokin niistä on käymättä, käymättömien seudut peittyvät
 *      kevyellä kermalla (SISASUMUN_PEITTO) ja käytyjen kaupunkien
 *      ympärille jää SISASUMUN_SADE_KM:n aukko pehmeällä reunalla
 *      (js/pallolaatat.js maalaaSisasumu, sama maskimekanismi kuin
 *      hunnussa).
 */
import { laudaltaAsteiksi, projisoiLaudalle } from '../fokusmitat.js';

export const SUMU_AVAIN = 'matkakirja-sumu';
export const LOYDETYT_AVAIN = 'matkakirja-loydetyt';
/** Nosto tämän säteen sisällä käydystä kaupungista löytyy itsestään. */
export const LOYTOSADE_KM = 150;
/** Käydyn kaupungin ympärille jäävä sumuton aukko. */
export const SISASUMUN_SADE_KM = 200;
/** Sisäisen sumun peitto (huntu on 0,8). */
export const SISASUMUN_PEITTO = 0.35;
/** Käymättömän maan rajan peiton kerroin. */
export const SUMUN_RAJAKERROIN = 0.35;
/** Luonnoksen peitto (css .pallolauta-nosto-luonnos). */
export const LUONNOKSEN_PEITTO = 0.45;

let sumuMuisti = null;

/** Onko löytämisen sumu päällä (kehittäjälippu). */
export function sumuPaalla() {
  if (sumuMuisti !== null) return sumuMuisti;
  try {
    const param = new URLSearchParams(globalThis.location?.search ?? '').get('sumu');
    if (param != null) sumuMuisti = /^(1|on|true)$/.test(param);
    else sumuMuisti = globalThis.localStorage?.getItem(SUMU_AVAIN) === '1';
  } catch { sumuMuisti = false; }
  return sumuMuisti;
}

/** Testit ja savukkeet: lippu päälle/pois ilman uutta latausta. */
export function asetaSumu(paalla) {
  sumuMuisti = paalla === null ? null : Boolean(paalla);
}

/* ---- löydetyt nostot ------------------------------------------------ */

let loydetyt = null;

function lueLoydetyt() {
  if (loydetyt) return loydetyt;
  loydetyt = new Set();
  try {
    const t = JSON.parse(globalThis.localStorage?.getItem(LOYDETYT_AVAIN) ?? '[]');
    if (Array.isArray(t)) for (const id of t) loydetyt.add(String(id));
  } catch { /* yksityinen tila */ }
  return loydetyt;
}

function tallennaLoydetyt() {
  try { globalThis.localStorage?.setItem(LOYDETYT_AVAIN, JSON.stringify([...lueLoydetyt()])); } catch { /* ei muistia */ }
}

/** Onko nosto löydetty (avattu tai automaattisesti mustattu). */
export function nostoLoydetty(id) {
  return lueLoydetyt().has(String(id));
}

/** Merkitse nosto löydetyksi; palauttaa true, jos tila vaihtui. */
export function merkitseLoydetyksi(id) {
  const s = lueLoydetyt();
  if (!id || s.has(String(id))) return false;
  s.add(String(id));
  tallennaLoydetyt();
  return true;
}

/** Testit: tyhjennä löydöt. */
export function tyhjennaLoydot() {
  loydetyt = new Set();
  tallennaLoydetyt();
}

/** Isoympyräetäisyys kilometreinä. */
export function etaisyysKm(a, b) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const s = Math.sin(dLat / 2) ** 2
    + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}

/**
 * Käydyt kaupungit asteina: world.visited + nykyinen kaupunki.
 *
 * @returns {Array<{ id: string, lat: number, lon: number }>}
 */
export function kaydytKaupungit(ui, asteet) {
  const game = ui?.game;
  if (!game || typeof asteet !== 'function') return [];
  const idt = new Set(game.world?.visited ?? []);
  const nyt = game.cityOf?.();
  if (nyt?.id) idt.add(nyt.id);
  const ulos = [];
  for (const id of idt) {
    const c = game.board?.cityById?.get(id) ?? game.pack?.cities?.find((k) => k.id === id);
    if (!c) continue;
    const a = asteet({ x: c.x, y: c.y });
    if (a) ulos.push({ id, lat: a.lat, lon: a.lon });
  }
  return ulos;
}

/**
 * Onko piste löytösäteen sisällä jostakin käydystä kaupungista.
 */
export function loytosateella(piste, kaydyt, sadeKm = LOYTOSADE_KM) {
  if (!piste || !Number.isFinite(piste.lat) || !Number.isFinite(piste.lon)) return false;
  return kaydyt.some((k) => etaisyysKm(piste, k) <= sadeKm);
}

/**
 * Sisäisen sumun aukot laudan yksiköissä: ellipsi käydyn kaupungin
 * ympärillä (SISASUMUN_SADE_KM). Palauttaa null, jos maassa on alle
 * kaksi kohdekaupunkia tai kaikki on käyty — silloin sumua ei ole.
 *
 * @param {object} p
 * @param {string} p.iso        kohdemaa
 * @param {object} p.game
 * @param {string} p.lauta      laudan tunnus (projisoiLaudalle)
 * @returns {{ aukot: Array<{x:number,y:number,rx:number,ry:number}>, kaymatta: string[] }|null}
 */
export function sisasumunAukot({ iso, game, lauta, sadeKm = SISASUMUN_SADE_KM } = {}) {
  const cityCountry = game?.pack?.map?.cityCountry;
  if (!iso || !cityCountry) return null;
  const maan = (game.pack?.cities ?? []).filter((c) => cityCountry[c.id] === iso);
  if (maan.length < 2) return null;
  const kaydyt = new Set(game.world?.visited ?? []);
  const nyt = game.cityOf?.();
  if (nyt?.id) kaydyt.add(nyt.id);
  const kaymatta = maan.filter((c) => !kaydyt.has(c.id)).map((c) => c.id);
  if (!kaymatta.length) return null;
  const aukot = [];
  for (const c of maan) {
    if (!kaydyt.has(c.id)) continue;
    const x0 = c.x;
    const y0 = c.y;
    if (!Number.isFinite(x0) || !Number.isFinite(y0)) continue;
    // Kaupungin asteet laudan projektiosta (sama kaava kuin pallonAsteet);
    // säde 200 km asteina (lat) ja pituusasteina (cos lat) projisoituna
    // laudalle — ellipsin puoliakselit laudan yksiköissä.
    const asteet = laudaltaAsteiksi(lauta, x0, y0);
    if (!asteet) continue;
    const dLat = sadeKm / 111;
    const dLon = sadeKm / (111 * Math.max(0.2, Math.cos((asteet.lat * Math.PI) / 180)));
    const px = projisoiLaudalle(lauta, asteet.lon + dLon, asteet.lat);
    const py = projisoiLaudalle(lauta, asteet.lon, asteet.lat + dLat);
    const keskus = projisoiLaudalle(lauta, asteet.lon, asteet.lat) ?? { x: x0, y: y0 };
    if (!px || !py) continue;
    aukot.push({
      x: keskus.x, y: keskus.y, rx: Math.abs(px.x - keskus.x), ry: Math.abs(py.y - keskus.y), id: c.id,
    });
  }
  return { aukot, kaymatta };
}
