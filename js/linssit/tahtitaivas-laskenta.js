/*
 * TÄHTITAIVAS — LASKENTA (kolmas leikkilinssi, Fable 21.9.2026).
 *
 * Aineisto on js/packs/linssi-tahdet.js (Yale Bright Star Catalogue,
 * ConstellationLines, IAU-nimet; haettu 4.8.2026). Tämä moduuli tekee
 * siitä kaupungin taivaan: paikallinen tähtiaika hetkestä ja pituus-
 * asteesta, tähden korkeus ja atsimuutti leveysasteelta, taivaankupu
 * ruudulle (napa-etäisyysprojektio: keskellä zeniitti, kehällä
 * horisontti, pohjoinen ylhäällä, ITÄ VASEMMALLA kuten taivaalle
 * katsottaessa), valosaasteen kirkkausraja, näkyvät tähdistöt ja
 * Livian kysymys. Puhdasta laskentaa — kanvas ja kortti ovat
 * js/linssit/tahtitaivas.js:ssä.
 *
 * Presessio siirtää taivasta n. 0,014°/v eli 1873 → nyt noin 2°; se
 * kirjataan selitteeseen eikä lasketa (pakan otsikko: pelin
 * tarkkuudella taivas on sama). Ero 1873:n ja nykyhetken välillä on
 * VALOSAASTE: kaupungin taivaalta näkyy nyt vain kirkkaimmat tähdet.
 */

import { TAHDET, TAHTIKUVIOT, TAHTI_KENTAT } from '../packs/linssi-tahdet.js';

/** Tietäjäpisteet oikeasta tähdistöstä (Fable 21.9.2026). */
export const ARVAUKSEN_TP = 20;
/** Vaihtoehtoja Livian kysymyksessä. */
export const VAIHTOEHTOJA = 4;
/** Horisontin yläpuolella vähintään tämän verran, jotta tähti "näkyy" (astetta). */
export const HORISONTIN_VARA_AST = 4;

/*
 * KIRKKAUSRAJAT (näennäinen magnitudi; pienempi on kirkkaampi).
 * 1873: kaupungin katolta näkyy lähes koko paljain silmin nähtävä
 * taivas — pakan tähdet ovat mag ≤ 5, näytetään 4,5:een, jottei
 * kupu tukkeudu. NYT: valosaaste — suurkaupungissa ~2,5, muualla ~3,5
 * (Bortle 7–9 vs. 5–6, tyypilliset rajamagnitudit).
 */
export const KIRKKAUSRAJAT = { 1873: 4.5, nyt: 3.5, suurkaupunki: 2.5 };
/** Pelin kaupungit, joiden taivas on suurkaupungin taivas (valosaaste ~2,5). */
export const SUURKAUPUNGIT = new Set([
  'lontoo', 'pariisi', 'moskova', 'istanbul', 'berliini', 'madrid', 'rooma', 'newyork', 'tokio',
  'shanghai', 'peking', 'mexico', 'kairo', 'mumbai', 'delhi', 'saopaulo', 'buenosaires', 'losangeles',
  'chicago', 'hongkong', 'kanton', 'soul', 'jakarta', 'bangkok', 'manila', 'kolkata', 'karachi',
  'lagos', 'teheran', 'bagdad', 'riad', 'sydney', 'melbourne', 'toronto', 'lima', 'bogota', 'santiago',
]);

/** Kirkkausraja tilan ja kaupungin mukaan. */
export function kirkkausraja(tila, cityId = null) {
  if (tila === '1873') return KIRKKAUSRAJAT[1873];
  return SUURKAUPUNGIT.has(cityId) ? KIRKKAUSRAJAT.suurkaupunki : KIRKKAUSRAJAT.nyt;
}

const RAD = Math.PI / 180;
const K = Object.fromEntries(TAHTI_KENTAT.map((n, i) => [n, i]));

/** Tähti taulukkorivistä olioksi. */
export function tahti(rivi) {
  return {
    hr: rivi[K.hr], ra: rivi[K.ra], dec: rivi[K.dec], mag: rivi[K.mag], bv: rivi[K.bv],
    bayer: rivi[K.bayer], flamsteed: rivi[K.flamsteed], kuvio: rivi[K.kuvio], nimi: rivi[K.nimi],
  };
}

/** Kaikki tähdet olioina (kerran). */
let tahdetMuisti = null;
export function kaikkiTahdet() {
  if (!tahdetMuisti) tahdetMuisti = TAHDET.map(tahti);
  return tahdetMuisti;
}
/** HR-numero → tähti. */
let hrMuisti = null;
export function tahtiHr(hr) {
  if (!hrMuisti) hrMuisti = new Map(kaikkiTahdet().map((t) => [t.hr, t]));
  return hrMuisti.get(hr) ?? null;
}

/** Juliaaninen päivä UTC-millisekunneista. */
export function julianPaiva(hetkiMs) {
  return hetkiMs / 86400000 + 2440587.5;
}

/**
 * Paikallinen tähtiaika asteina (0…360) — GMST (Meeus, lineaarinen
 * termi riittää: virhe alle 0,01° tällä vuosisadalla) + pituusaste.
 */
export function tahtiaika(hetkiMs, lon) {
  const d = julianPaiva(hetkiMs) - 2451545.0;
  const gmst = 280.46061837 + 360.98564736629 * d;
  return ((gmst + lon) % 360 + 360) % 360;
}

/**
 * Tähden korkeus ja atsimuutti (astetta; A pohjoisesta itään) leveys-
 * asteelta `lat` tähtiajalla `lst`.
 */
export function korkeusJaAtsimuutti(ra, dec, lat, lst) {
  const H = ((lst - ra) % 360 + 360) % 360;
  const sinH = Math.sin(dec * RAD) * Math.sin(lat * RAD) + Math.cos(dec * RAD) * Math.cos(lat * RAD) * Math.cos(H * RAD);
  const h = Math.asin(Math.max(-1, Math.min(1, sinH))) / RAD;
  const cosA = (Math.sin(dec * RAD) - sinH * Math.sin(lat * RAD)) / (Math.cos(h * RAD) * Math.cos(lat * RAD) || 1e-9);
  let A = Math.acos(Math.max(-1, Math.min(1, cosA))) / RAD;
  if (Math.sin(H * RAD) > 0) A = 360 - A;
  return { h, A };
}

/**
 * Taivaankupu ruudulle: zeniitti keskellä, horisontti kehällä (säde R),
 * pohjoinen ylhäällä ja itä VASEMMALLA (taivaalle katsotaan alhaalta,
 * ei kartalle ylhäältä). Napa-etäisyysprojektio r = R·(90 − h)/90.
 */
export function kuvulle(h, A, cx, cy, R) {
  const r = R * (90 - h) / 90;
  return { x: cx - r * Math.sin(A * RAD), y: cy - r * Math.cos(A * RAD), r };
}

/**
 * Näkyvät tähdet: horisontin yläpuolella (vara) ja kirkkausrajan
 * sisällä, ruutupaikkoineen. `ms` on hetki, `lat/lon` kaupunki.
 */
export function nakyvatTahdet({ lat, lon, hetkiMs, magRaja, cx, cy, R, tahdet = kaikkiTahdet() }) {
  const lst = tahtiaika(hetkiMs, lon);
  const ulos = [];
  for (const t of tahdet) {
    if (t.mag > magRaja) continue;
    const { h, A } = korkeusJaAtsimuutti(t.ra, t.dec, lat, lst);
    if (h < HORISONTIN_VARA_AST) continue;
    ulos.push({ ...t, h, A, ...kuvulle(h, A, cx, cy, R) });
  }
  return ulos;
}

/** Tähden ruutuvälimuisti tähdistön viivoja varten (kaikki, myös rajan yli). */
export function tahdenPaikka(t, lat, lst, cx, cy, R) {
  const { h, A } = korkeusJaAtsimuutti(t.ra, t.dec, lat, lst);
  return { ...t, h, A, ...kuvulle(h, A, cx, cy, R) };
}

/**
 * Tähdistöt, jotka ovat "näkyvissä": viivojen tähdistä vähintään 2/3
 * horisontin yläpuolella JA kirkkain tähti kirkkausrajan sisällä
 * (muuten kuviota ei näe kaupungista). Palauttaa kuvion, sen
 * viivapisteet ruudulla ja keskipisteen.
 */
export function nakyvatKuviot({ lat, lon, hetkiMs, magRaja, cx, cy, R, kuviot = TAHTIKUVIOT }) {
  const lst = tahtiaika(hetkiMs, lon);
  const ulos = [];
  for (const k of kuviot) {
    const hrt = [...new Set(k.viivat.flat())];
    const pisteet = hrt.map((hr) => tahtiHr(hr)).filter(Boolean).map((t) => tahdenPaikka(t, lat, lst, cx, cy, R));
    if (pisteet.length < 2) continue;
    const ylla = pisteet.filter((p) => p.h >= HORISONTIN_VARA_AST);
    if (ylla.length < (2 * pisteet.length) / 3) continue;
    const kirkkain = Math.min(...pisteet.map((p) => p.mag));
    if (kirkkain > magRaja) continue;
    const paikat = new Map(pisteet.map((p) => [p.hr, p]));
    const viivat = k.viivat.map((jono) => jono.map((hr) => paikat.get(hr)).filter(Boolean));
    const keski = {
      x: ylla.reduce((s, p) => s + p.x, 0) / ylla.length,
      y: ylla.reduce((s, p) => s + p.y, 0) / ylla.length,
    };
    ulos.push({ kuvio: k, viivat, pisteet, keski, kirkkain });
  }
  return ulos;
}

/** Lähin näkyvä tähdistö ruudun pisteestä (px): lähin viivatähti ≤ sade. */
export function kuvioPisteesta(kuviot, x, y, sade = 26) {
  let paras = null;
  for (const k of kuviot) {
    for (const p of k.pisteet) {
      if (p.h < HORISONTIN_VARA_AST) continue;
      const d = Math.hypot(p.x - x, p.y - y);
      if (d <= sade && (!paras || d < paras.d)) paras = { k, d };
    }
  }
  return paras?.k ?? null;
}

/** Tähden sävy B−V-indeksistä: sinivalkoinen … keltainen … punertava. */
export function tahdenVari(bv) {
  if (bv === null || bv === undefined) return '#f4f1e6';
  if (bv < 0) return '#c8d8ff';
  if (bv < 0.4) return '#f0f2ff';
  if (bv < 0.8) return '#fff6dc';
  if (bv < 1.3) return '#ffd9a0';
  return '#ffb27a';
}

/** Tähden säde ruudulla magnitudista (px, 1 = pienin). */
export function tahdenSade(mag) {
  return Math.max(0.9, 3.6 - 0.65 * mag);
}

/** Fisher–Yates annetulla arvalla. */
export function sekoita(lista, arpa = Math.random) {
  const ulos = [...lista];
  for (let i = ulos.length - 1; i > 0; i -= 1) {
    const j = Math.min(i, Math.floor(arpa() * (i + 1)));
    [ulos[i], ulos[j]] = [ulos[j], ulos[i]];
  }
  return ulos;
}

/*
 * LIVIAN KYSYMYKSET (Fable 21.9.2026, sanatarkasti; tähdistö on
 * sytytetty, nimeä ei sanota). Palautteissa {TÄHDISTÖ} on suomenkielinen
 * nimi.
 */
export const LIVIAN_KYSYMYKSET = [
  { tunnus: 'kirjekyyhky', teksti: 'Katso, sytytin sinulle yhden tähdistön. Kirjekyyhky suunnistaa näiden mukaan öisin, joten minä tiedän nimen. Tiedätkö sinä?' },
  { tunnus: 'latinaksi', teksti: 'Isoisäsi olisi nimennyt tämän latinaksi ja mitannut sen korkeuden. Sinulle riittää nimi: mikä tähdistö?' },
  { tunnus: 'katulamput', teksti: 'Tämä kuvio näkyi täällä vuonna 1873 ja näkyy yhä, jos katulamput sammuttaa. Minkä niminen?' },
];
export const PALAUTE_OIKEIN = 'Aivan, {TÄHDISTÖ}. Sen alla lentää kotiin vaikka silmät kiinni.';
export const PALAUTE_VAARIN = 'Ei, se on {TÄHDISTÖ}. Katso viivoja vielä kerran, ensi yönä tunnistat sen.';

export function palaute(oikein, kuvio) {
  return (oikein ? PALAUTE_OIKEIN : PALAUTE_VAARIN).split('{TÄHDISTÖ}').join(kuvio.suomi);
}

/**
 * Arvo kysymys näkyvistä tähdistöistä: oikea (mieluiten ei juuri
 * kysytty, vähintään 3 viivatähteä) ja kolme muuta näkyvää nimeä.
 */
export function arvoKysymys(nakyvat, { kysytyt = new Set(), jarjestys = 0, arpa = Math.random } = {}) {
  const kaikki = nakyvat.filter((n) => n.pisteet.length >= 3);
  // Kirkkaat kuviot ensin (kirkkain tähti ≤ 3,0), jos niitä on tarpeeksi — Otava ennen Ilmapumppua.
  const kirkkaat = kaikki.filter((n) => n.kirkkain <= 3.0);
  const ehdokkaat = kirkkaat.length >= VAIHTOEHTOJA ? kirkkaat : kaikki;
  if (ehdokkaat.length < VAIHTOEHTOJA) return null;
  const tuoreet = ehdokkaat.filter((n) => !kysytyt.has(n.kuvio.lyhenne));
  const lahde = tuoreet.length ? tuoreet : ehdokkaat;
  const oikea = lahde[Math.min(lahde.length - 1, Math.floor(arpa() * lahde.length))];
  const muut = sekoita(ehdokkaat.filter((n) => n !== oikea), arpa).slice(0, VAIHTOEHTOJA - 1);
  return {
    oikea,
    vaihtoehdot: sekoita([oikea, ...muut], arpa).map((n) => n.kuvio),
    kysymys: LIVIAN_KYSYMYKSET[jarjestys % LIVIAN_KYSYMYKSET.length],
  };
}
