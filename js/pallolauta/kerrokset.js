/*
 * ABLAATIOTIKAS — `?kerrokset=<lista>` (omistajan menetelmä 21.9.2026,
 * Fable: sulavuusmittaus kerros kerrallaan; VAIN MITTAUKSEEN, ei
 * pelaajan lippu).
 *
 * Pallolauta rakennetaan portaittain, ja jokaisella portaalla mitataan
 * kehysajat panoroinnissa ja zoomissa (tools/savukkeet/mittaa-ablaatio.mjs).
 * Portaat ovat kumulatiivisia:
 *
 *   1  laatat                       pallo ja laattapyramidi
 *   2  + vektorit                   rajat, joet, rantaviiva, reitit (Line2)
 *   3  + nimet                      GL-nimiöt (kaupunkien nimet rungolla)
 *   4  + nostot, nappula            GL-nostot (ikoni + nimiö) ja pelinappula
 *                                   rungolla — nostojen CSS2D-jäänteet
 *                                   (ankkurit, liuskat, luonnokset, pisteet)
 *                                   kulkevat nostojen mukana, koska ne ovat
 *                                   saman ladonnan tulos
 *   5  + kohteet                    CSS2D: matkan kohteet (sykkivä halo)
 *                                   ja linssimerkit
 *   6  + pulu, ui, aanet            = tuotanto (kartan pieni liike ja pulu,
 *                                   yläpalkki, toimintorivi, maapaneeli,
 *                                   kartuutsi; äänet)
 *
 * Osoite: `?kerrokset=porras3` tai suoraan lista `?kerrokset=laatat,nimet`.
 * Ilman lippua kaikki kerrokset ovat päällä (tuotanto). Lippu luetaan
 * kerran osoitteesta ja muistetaan hakumerkkijonoa kohti, koska
 * `kerrosKaytossa` kysytään ladonnassa.
 *
 * Laitepalvelin (docs/laitepalvelin) välittää hakumerkkijonon
 * sellaisenaan, joten Laitetestaaja toistaa samat portaat oikealla
 * iPhonella samalla osoitteella.
 */

/** Kerrosten nimet siinä järjestyksessä, jossa tikas ne lisää. */
export const KERROKSET = ['laatat', 'vektorit', 'nimet', 'nostot', 'nappula', 'kohteet', 'pulu', 'ui', 'aanet'];

/** Porras → kerrokset (kumulatiivinen). */
export const ABLAATIOPORTAAT = {
  1: ['laatat'],
  2: ['laatat', 'vektorit'],
  3: ['laatat', 'vektorit', 'nimet'],
  4: ['laatat', 'vektorit', 'nimet', 'nostot', 'nappula'],
  5: ['laatat', 'vektorit', 'nimet', 'nostot', 'nappula', 'kohteet'],
  6: KERROKSET,
};

/**
 * Lipun arvo → käytössä olevien kerrosten joukko, tai null kun lippua
 * ei ole (kaikki päällä). Puhdas funktio (testit).
 *
 * @param {string} haku osoitteen hakumerkkijono (`?…`)
 * @returns {?Set<string>}
 */
export function kerroksetHausta(haku) {
  let arvo = null;
  try { arvo = new URLSearchParams(haku ?? '').get('kerrokset'); } catch { return null; }
  if (arvo == null || arvo === '') return null;
  const porras = /^porras(\d)$/u.exec(arvo.trim());
  if (porras) return new Set(ABLAATIOPORTAAT[Number(porras[1])] ?? KERROKSET);
  const lista = arvo.split(',').map((s) => s.trim()).filter((s) => KERROKSET.includes(s));
  // Laatat ovat aina pohja: ilman niitä ei ole lautaa.
  lista.push('laatat');
  return new Set(lista);
}

let muisti = { haku: null, joukko: null };
function joukkoNyt(haku) {
  const h = haku ?? (() => { try { return globalThis.location?.search ?? ''; } catch { return ''; } })();
  if (muisti.haku !== h) muisti = { haku: h, joukko: kerroksetHausta(h) };
  return muisti.joukko;
}

/**
 * Onko kerros käytössä. Ilman lippua aina true.
 *
 * @param {string} nimi KERROKSET-nimi
 * @param {string} [haku] hakumerkkijono (testit); oletus osoitteesta
 */
export function kerrosKaytossa(nimi, haku) {
  const joukko = joukkoNyt(haku);
  return joukko ? joukko.has(nimi) : true;
}

/** Onko ablaatiolippu päällä lainkaan (mittarit, body-luokat). */
export function ablaatioPaalla(haku) {
  return joukkoNyt(haku) !== null;
}

/**
 * Pois kytkettyjen kerrosten body-luokat `kerros-pois-<nimi>`
 * (css/styles.css ABLAATIOTIKAS): pulu, ui ja äänet ovat laudan
 * ulkopuolista käyttöliittymää, joka piilotetaan tyylillä.
 */
export function kerrostenBodyLuokat(haku) {
  const joukko = joukkoNyt(haku);
  if (!joukko) return [];
  return KERROKSET.filter((k) => !joukko.has(k)).map((k) => `kerros-pois-${k}`);
}
