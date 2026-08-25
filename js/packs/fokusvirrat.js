/*
 * FOKUSVIRTOJEN REKISTERI — kevyt taulu kaupunki-id → annostelusisältö.
 *
 * Avain on KAUPUNGIN tunnus ilman laudan tunnusta, samoin kuin
 * julisteilla ja kohtaamisilla (js/packs/kohtaamiset.js): Ateena on
 * sama kaupunki kummalla tahansa laudalla, ja sen esittelyvirtakin on
 * sama. Kaupunki, jolla ei ole riviä, ei saa mitään uutta — fokusmoodi
 * käyttäytyy siellä täsmälleen kuten ennenkin.
 *
 * Pilotti on Ateena (Raamatun osio "Fokusmoodi": PILOTTI). Rekisteri on
 * oma tiedostonsa, jotta seuraavan kaupungin lisääminen on yhden rivin
 * työ eikä koske moottoriin (js/fokusvirta.js) lainkaan.
 *
 * Sofia on toinen kaupunki (omistajan lupa 25.8.2026) ja todistaa sen:
 * uusi kaupunki oli yksi tuonti ja yksi rivi tähän tauluun. Sofia on
 * Ateenasta yksi askel jalan pelin maantieteessä.
 */
import { FOKUSVIRTA_ATEENA } from './fokusvirta-ateena.js';
import { FOKUSVIRTA_ISTANBUL } from './fokusvirta-istanbul.js';
import { FOKUSVIRTA_ROOMA } from './fokusvirta-rooma.js';
import { FOKUSVIRTA_SOFIA } from './fokusvirta-sofia.js';

export const FOKUSVIRRAT = {
  ateena: FOKUSVIRTA_ATEENA,
  sofia: FOKUSVIRTA_SOFIA,
  istanbul: FOKUSVIRTA_ISTANBUL,
  rooma: FOKUSVIRTA_ROOMA,
};

/** Kaupungin fokusvirta tai null, jos kaupungille ei ole sisältöä. */
export function fokusvirtaKaupungille(cityId) {
  return (cityId && FOKUSVIRRAT[cityId]) || null;
}
