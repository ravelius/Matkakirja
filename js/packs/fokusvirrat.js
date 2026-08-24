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
 */
import { FOKUSVIRTA_ATEENA } from './fokusvirta-ateena.js';

export const FOKUSVIRRAT = {
  ateena: FOKUSVIRTA_ATEENA,
};

/** Kaupungin fokusvirta tai null, jos kaupungille ei ole sisältöä. */
export function fokusvirtaKaupungille(cityId) {
  return (cityId && FOKUSVIRRAT[cityId]) || null;
}
