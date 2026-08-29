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
import { FOKUSVIRTA_BERLIINI } from './fokusvirta-berliini.js';
import { FOKUSVIRTA_BUDAPEST } from './fokusvirta-budapest.js';
import { FOKUSVIRTA_DUBROVNIK } from './fokusvirta-dubrovnik.js';
import { FOKUSVIRTA_ISTANBUL } from './fokusvirta-istanbul.js';
import { FOKUSVIRTA_BUKAREST } from './fokusvirta-bukarest.js';
import { FOKUSVIRTA_HELSINKI } from './fokusvirta-helsinki.js';
import { FOKUSVIRTA_KOBENHAVN } from './fokusvirta-kobenhavn.js';
import { FOKUSVIRTA_LONTOO } from './fokusvirta-lontoo.js';
import { FOKUSVIRTA_MADRID } from './fokusvirta-madrid.js';
import { FOKUSVIRTA_PRAHA } from './fokusvirta-praha.js';
import { FOKUSVIRTA_PARIISI } from './fokusvirta-pariisi.js';
import { FOKUSVIRTA_ROOMA } from './fokusvirta-rooma.js';
import { FOKUSVIRTA_SARAJEVO } from './fokusvirta-sarajevo.js';
import { FOKUSVIRTA_SOFIA } from './fokusvirta-sofia.js';
import { FOKUSVIRTA_TALLINNA } from './fokusvirta-tallinna.js';
import { FOKUSVIRTA_TUKHOLMA } from './fokusvirta-tukholma.js';
import { FOKUSVIRTA_WIEN } from './fokusvirta-wien.js';

export const FOKUSVIRRAT = {
  ateena: FOKUSVIRTA_ATEENA,
  sofia: FOKUSVIRTA_SOFIA,
  istanbul: FOKUSVIRTA_ISTANBUL,
  rooma: FOKUSVIRTA_ROOMA,
  bukarest: FOKUSVIRTA_BUKAREST,
  sarajevo: FOKUSVIRTA_SARAJEVO,
  /*
   * EUROOPPA KAUTTAALTAAN VALMIIKSI, AALTO 1 (Raamattu, osio
   * "Fokusmoodi", omistaja 28.8.2026 ilta): Madrid, Wien, Pariisi ja
   * Berliini nostettiin vanhasta mallista fokusvirtamalliin. Kaikki
   * neljä ovat maansa aarrekaupunkeja, joten ne saavat Raamatun
   * syvyysportaikon TÄYDEN pinon — matkakirja, Livia, herokuva, kolme
   * täkyä, oppitunti, kohtaaminen ja lehtitehtävät.
   */
  madrid: FOKUSVIRTA_MADRID,
  wien: FOKUSVIRTA_WIEN,
  pariisi: FOKUSVIRTA_PARIISI,
  berliini: FOKUSVIRTA_BERLIINI,
  /*
   * AALTO 2 (sama Raamatun osio, 29.8.2026): Lontoo, Budapest,
   * Dubrovnik ja Praha. Nämäkin ovat maansa aarrekaupunkeja ja saavat
   * saman TÄYDEN pinon.
   *
   * AALTO 2 EROAA AALLOSTA 1 YHDESSÄ ASIASSA: näille neljälle maalle
   * ei ollut takynostot-työaineistoa, joten täyt, oppitunnit,
   * lehtitehtävät ja maakohtaiset täkynostot on rakennettu pelin omasta
   * kuratoidusta aineistosta ja siihen erikseen tarkistetuista
   * lisätiedoista. Perustelut ja lähteet ovat kunkin paketin omissa
   * kommenteissa.
   */
  lontoo: FOKUSVIRTA_LONTOO,
  budapest: FOKUSVIRTA_BUDAPEST,
  dubrovnik: FOKUSVIRTA_DUBROVNIK,
  praha: FOKUSVIRTA_PRAHA,
  /*
   * AALTO 3 (sama Raamatun osio, 29.8.2026): Pohjola ja Baltia —
   * Tukholma, Kööpenhamina, Helsinki ja Tallinna. Sama TÄYSI pino ja
   * sama faktapohja kuin aallolla 2 (kuratoitu pelidata + kahden
   * riippumattoman lähteen tarkistus).
   *
   * TUKHOLMA POIKKEAA YHDESSÄ ASIASSA: se pilotoi PÖLLÖN SÄHKETEHTÄVÄN
   * kohtaamisen sijasta (Raamattu, PÖLLÖN SÄHKETEHTÄVÄ). Rekisteri ei
   * huomaa siitä mitään — valinta on datassa (`sahketehtava` kentän
   * `kohtaaminen` tilalla), ei täällä.
   */
  tukholma: FOKUSVIRTA_TUKHOLMA,
  kobenhavn: FOKUSVIRTA_KOBENHAVN,
  helsinki: FOKUSVIRTA_HELSINKI,
  tallinna: FOKUSVIRTA_TALLINNA,
};

/** Kaupungin fokusvirta tai null, jos kaupungille ei ole sisältöä. */
export function fokusvirtaKaupungille(cityId) {
  return (cityId && FOKUSVIRRAT[cityId]) || null;
}
