/*
 * LINSSIT KAUPUNKIEN AARREPALKKIOIKSI (omistaja 21.9.2026; Raamatun loki
 * "HIOMASSA-LINSSI JA OPTIKON HYVITYS: MEKANIIKKA HYVAKSYTTY").
 *
 * Historialinssi voi olla kaupungin ISON paikallisaarteen kylkiäinen:
 * aarteen raha maksetaan kuten ennenkin, ja lisäksi pelaaja saa
 * linssin (js/linssit/omistus.js myonna). Pieni aarre ei koskaan anna
 * linssiä. Toisella pelikerralla linssi on jo passissa, ja aarre on
 * tavallinen iso aarre.
 *
 * TAULU ON TUOTANNOSSA TYHJÄ (Fablen rajaus 21.9.2026): omistaja päättää
 * linssien määrän ja tyylin, ja Fable antaa sisällön yhtenä listana
 * (kaupunki → tunnus → nimi → ikoni). Testit ja savuke antavat oman
 * taulunsa parametrina. Kun taulu täytetään, jokaisen tunnuksen on
 * oltava rekisterissä (js/linssit/rekisteri.js) joko valmiina tai
 * `tila: 'hiomassa'` -rivinä.
 */

/** Ankkurikaupunki → linssin tunnus. */
export const LINSSIAARTEET = {};

/**
 * Mikä linssi kuuluu tämän kaupungin aarteeseen. Vain iso
 * paikallisaarre antaa linssin.
 *
 * @param {string} cityId
 * @param {string} type   laattatyyppi (js/tokens.js)
 * @param {object} [taulu] testeille
 * @returns {string|null}
 */
export function linssiAarteesta(cityId, type, taulu = LINSSIAARTEET) {
  if (type !== 'isoAarre' || !cityId) return null;
  return taulu?.[cityId] ?? null;
}
