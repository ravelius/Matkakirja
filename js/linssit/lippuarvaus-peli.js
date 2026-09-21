/*
 * LIPPUARVAUS — PELIN LASKENTA (leikkilinssi, Fable 21.9.2026).
 *
 * Liput ovat jo repossa (assets/liput, tools/fetch-flags.mjs) ja maat
 * laudan countryShapes-taulussa (nimi, lippu, keskus laudan pikseleinä):
 * tämä moduuli tekee niistä lippulistan asteina, rajaa Euroopan,
 * arpoo kysymyksen ja sen neljä vaihtoehtoa (oikea + kolme lähintä
 * naapuria "hämäämässä", Fablen lause) ja kantaa Livian repliikit.
 * Puhdasta laskentaa; piirto ja kortti ovat js/linssit/lippuarvaus.js:ssä.
 */

import { laudaltaAsteiksi } from '../fokusmitat.js';
import { PALLO_LAUTA } from '../pallo.js';

/** Vaihtoehtoja per kysymys (oikea + naapurit). */
export const VAIHTOEHTOJA = 4;
/** Tietäjäpisteet oikeasta arvauksesta (Fable 21.9.2026). */
export const ARVAUKSEN_TP = 20;

/*
 * EUROOPPA (vipu, oletus): laudan maat, joiden keskus on laatikossa
 * lon −25…45, lat > 34, poikkeuksina Syyria ja Georgia pois ja Venäjä
 * mukaan (keskus Siperiassa, mutta pelin Eurooppaa: Pietari, Moskova).
 */
const EUROOPAN_LISAT = new Set(['RUS']);
const EUROOPAN_POISTOT = new Set(['SYR', 'GEO']);

/** Onko maa Euroopassa tämän linssin mielessä. */
export function euroopassa(maa) {
  if (EUROOPAN_LISAT.has(maa.iso)) return true;
  if (EUROOPAN_POISTOT.has(maa.iso)) return false;
  return maa.lon >= -25 && maa.lon <= 45 && maa.lat > 34;
}

/**
 * Lippumaat laudalta: { iso, nimi, lippu (Commons-tiedostonimi), lat, lon }.
 * Ilman lippua tai keskusta oleva maa jää pois.
 */
export function lippumaat(pack) {
  const muodot = pack?.map?.countryShapes ?? {};
  const ulos = [];
  for (const [iso, m] of Object.entries(muodot)) {
    if (!m?.lippu || !Array.isArray(m.keskus)) continue;
    const a = laudaltaAsteiksi(PALLO_LAUTA, m.keskus[0], m.keskus[1]);
    if (!a) continue;
    ulos.push({ iso, nimi: m.nimi ?? iso, lippu: m.lippu, lat: a.lat, lon: a.lon });
  }
  return ulos.sort((x, y) => x.nimi.localeCompare(y.nimi, 'fi'));
}

/** Isoympyräetäisyys asteina (riittää naapuruuden järjestykseen). */
export function etaisyysAst(a, b) {
  const r = Math.PI / 180;
  const s = Math.sin((b.lat - a.lat) * r / 2) ** 2
    + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin((b.lon - a.lon) * r / 2) ** 2;
  return (2 * Math.asin(Math.min(1, Math.sqrt(s)))) / r;
}

/** Fisher–Yates annetulla arvalla ([0,1)). */
export function sekoita(lista, arpa = Math.random) {
  const ulos = [...lista];
  for (let i = ulos.length - 1; i > 0; i -= 1) {
    const j = Math.min(i, Math.floor(arpa() * (i + 1)));
    [ulos[i], ulos[j]] = [ulos[j], ulos[i]];
  }
  return ulos;
}

/**
 * Vaihtoehdot: oikea maa ja sen lähimmät naapurit joukosta, sekoitettuna.
 * Naapurit valitaan ETÄISYYDEN mukaan (Fable: "naapurit ovat tarjolla
 * vaihtoehtoina"), joten Suomelle tulevat Viro, Ruotsi ja Venäjä, ei
 * Portugali.
 */
export function vaihtoehdot(maat, oikea, arpa = Math.random, maara = VAIHTOEHTOJA) {
  const naapurit = maat
    .filter((m) => m.iso !== oikea.iso)
    .map((m) => ({ m, d: etaisyysAst(m, oikea) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, Math.max(0, maara - 1))
    .map((x) => x.m);
  return sekoita([oikea, ...naapurit], arpa);
}

/*
 * LIVIAN KYSYMYKSET (Fable 21.9.2026, sanatarkasti; kysymyksessä ei
 * maan nimeä). Palautteissa {MAA} on maan nimi perusmuodossa.
 */
export const LIVIAN_KYSYMYKSET = [
  {
    tunnus: 'lentoreitti',
    teksti: 'Tämä lippu liehui juuri lentoreittini alla. Minkä maan se on? Vihje: naapurit ovat tarjolla vaihtoehtoina, ja ne ovat siellä vain hämäämässä.',
  },
  {
    tunnus: 'kirjekyyhky',
    teksti: 'Kirjekyyhky tunnistaa lipun kauempaa kuin sinä katedraalin. Kokeile silti: kenen värit?',
  },
  {
    tunnus: 'isoisa',
    teksti: 'Isoisäsi olisi piirtänyt tämän lipun väärän maan kohdalle. Sinä tiedät paremmin, eikö niin?',
  },
];
export const PALAUTE_OIKEIN = 'Aivan. {MAA}. Katso, siinä se välähtää pallolla.';
export const PALAUTE_VAARIN = 'Läheltä liippasi, mutta ei. Se on {MAA}. Nyt tiedät, mihin suuntaan lentää.';

/** Palaute maan nimellä. */
export function palaute(oikein, maa) {
  return (oikein ? PALAUTE_OIKEIN : PALAUTE_VAARIN).split('{MAA}').join(maa.nimi);
}

/*
 * SARJA JA ENNÄTYS (Fable 21.9.2026, jatkoerä): peräkkäiset oikeat
 * vastaukset ovat sarja; pisin sarja on laitteen ennätys (localStorage
 * ENNATYS_AVAIN). Väärä vastaus katkaisee sarjan, ei ennätystä.
 */
export const ENNATYS_AVAIN = 'matkakirja-lippuarvaus-ennatys';

/** Sarjan ja ennätyksen seuraava tila vastauksesta. */
export function paivitaSarja({ sarja = 0, ennatys = 0 } = {}, oikein) {
  const uusi = oikein ? sarja + 1 : 0;
  return { sarja: uusi, ennatys: Math.max(ennatys, uusi), uusiEnnatys: oikein && uusi > ennatys };
}

/** Ennätys talteen / esiin (yksityinen tila ei kaada). */
export function lueEnnatys(varasto = globalThis.localStorage) {
  try { return Math.max(0, Number(varasto?.getItem?.(ENNATYS_AVAIN)) || 0); } catch { return 0; }
}
export function tallennaEnnatys(arvo, varasto = globalThis.localStorage) {
  try { varasto?.setItem?.(ENNATYS_AVAIN, String(arvo)); } catch { /* yksityinen tila */ }
}

/**
 * Kysymykset napautusmuotoon: vain ne Livian lauseet, jotka eivät
 * puhu vaihtoehdoista (kysymys 1 lupaa naapurit napeiksi).
 */
export const NAPAUTUSKYSYMYKSET = LIVIAN_KYSYMYKSET.filter((k) => k.tunnus !== 'lentoreitti');
/** Livian ohje napautusmuodossa kysymyksen perään. */
export const NAPAUTUSOHJE = 'Napauta maata pallolla.';

/**
 * Arvo kysymys: maa `ehdokkaista` (mieluiten ruudulla näkyvistä), jota
 * ei ole juuri kysytty, vaihtoehdot koko `joukosta` (sama rajaus:
 * Eurooppa tai maailma), kysymysteksti vuorotellen.
 *
 * @param {Array} joukko  kaikki linssin maat nykyisellä rajauksella
 * @param {Array} ehdokkaat  maat, joista oikea arvotaan (ruudulla)
 * @param {Set<string>} kysytyt  jo kysytyt iso-tunnukset (vältetään)
 * @param {number} jarjestys  monesko kysymys (tekstin vuorottelu)
 * @param {'nimet'|'kartta'} muoto  napit vai napautus pallolla
 */
export function arvoKysymys(joukko, ehdokkaat, { kysytyt = new Set(), jarjestys = 0, arpa = Math.random, muoto = 'nimet' } = {}) {
  const pohja = (ehdokkaat?.length ? ehdokkaat : joukko).filter((m) => joukko.some((j) => j.iso === m.iso));
  if (!pohja.length || joukko.length < 2) return null;
  const tuoreet = pohja.filter((m) => !kysytyt.has(m.iso));
  const lahde = tuoreet.length ? tuoreet : pohja;
  const maa = lahde[Math.min(lahde.length - 1, Math.floor(arpa() * lahde.length))];
  const lauseet = muoto === 'kartta' ? NAPAUTUSKYSYMYKSET : LIVIAN_KYSYMYKSET;
  return {
    maa,
    muoto,
    vaihtoehdot: muoto === 'kartta' ? [] : vaihtoehdot(joukko, maa, arpa),
    kysymys: lauseet[jarjestys % lauseet.length],
  };
}
