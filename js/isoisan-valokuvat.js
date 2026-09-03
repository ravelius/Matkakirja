/*
 * ISOISÄN VALOKUVAT 1873 (omistajan tilaus 3.9.2026, Raamattu: ISOISAN
 * VALOKUVAT). Kuvaputken generoimat albumiinivedokset — sama mies
 * kaikissa: noin 35–40-vuotias brittiläinen herrasmiesmatkailija,
 * vilpitön hymy. Kaanon isoisän ulkonäöstä on docs/tarina.md:ssä
 * ("Hahmo"). Kuvat ovat pelin R2-mediämpärissä (kuvaputki varmensi
 * 3.9.2026 19:42 UTC), ja niihin viitataan valmiina osoitteina.
 *
 * Kytkentä: ensimmäisessä lentokohtauksessa (js/ui.js
 * aloituslentoSisalla) Bombay-kuva "löytyy matkakirjan välistä" kartan
 * päälle kuvatekstinsä kanssa; napautus suurentaa. Aloitussivun
 * Kanton-kuva oli mukana v1509–v1510, omistaja jätti sen pois 3.9.2026
 * ("jätetään isoisän kuva pois etusivulta"); tiedot säilyvät tässä.
 */
import { AANI_JUURI } from './media.js';

export const ISOISAN_KUVAJUURI = `${AANI_JUURI}kohtaamiset/isoisa/`;

/*
 * KORTTI IRTI VALKOISESTA TAUSTASTA (omistaja 3.9.2026: *"tuo isoisän kuva
 * pitää leikata irti valkoisesta taustasta"*). JPG:ssä cabinet card on
 * valkoisella pohjalla; rajaus on kortin reunat kuvan mittojen osuuksina
 * (mitattu Chromiumin kanvaasilla, kynnys min(r,g,b) < 238, pieni vara).
 * CSS leikkaa clip-pathilla ja skaalaa kortin täyteen (rajausTyyli).
 */
export const ISOISAN_VALOKUVAT = {
  kanton: {
    osoite: `${ISOISAN_KUVAJUURI}isoisa-kanton-1873-kulunut-v1.jpg`,
    rajaus: { x0: 0.054, y0: 0.032, x1: 0.943, y1: 0.956 },
    selite: 'Isoisä teehuoneen pöydässä Kantonissa 1873. Kulunut cabinet card '
      + 'isoisän matkalaukusta.',
    lahde: 'Kuvaputken generoitu valokuva',
    kuvateksti: 'Isoisä, Kanton, 1873',
  },
  bombay: {
    osoite: `${ISOISAN_KUVAJUURI}isoisa-bombay-1873-kulunut-v1.jpg`,
    rajaus: { x0: 0.076, y0: 0.091, x1: 0.923, y1: 0.915 },
    selite: 'Isoisä Bombayn satamalaiturilla matka-arkkunsa vieressä 1873. '
      + 'Valokuva löytyi matkakirjan välistä.',
    lahde: 'Kuvaputken generoitu valokuva',
    kuvateksti: 'Isoisä, Bombay, 1873',
  },
};

/**
 * Kortin alle lyöty pieni lappu (omistaja 3.9.2026: "Isoisä,
 * paikkakunta, 1873"). Kelpaa vain ISOISAN_VALOKUVAT-muodossa.
 */
export function valokuvanKuvateksti(kuva) {
  return String(kuva?.kuvateksti ?? '').trim();
}

/** Lennolla valokuva nousee esiin vasta, kun repliikki on ehtinyt alkaa. */
export const LENNON_VALOKUVAN_VIIVE_MS = 2600;

/**
 * Rajaus CSS-muuttujina (css .isoisa-rajattu): clip-path leikkaa kortin
 * reunoihin ja skaala täyttää elementin leikatulla kortilla.
 */
export function rajausTyyli(kuva) {
  const r = kuva?.rajaus;
  if (!r) return '';
  const leveys = r.x1 - r.x0;
  const korkeus = r.y1 - r.y0;
  const skaala = 1 / Math.max(leveys, korkeus);
  return `--rx0:${r.x0};--ry0:${r.y0};--rx1:${r.x1};--ry1:${r.y1};--rskaala:${skaala.toFixed(4)}`;
}
