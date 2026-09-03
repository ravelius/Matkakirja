/*
 * ISOISÄN VALOKUVAT 1873 (omistajan tilaus 3.9.2026, Raamattu: ISOISAN
 * VALOKUVAT). Kuvaputken generoimat albumiinivedokset — sama mies
 * kaikissa: noin 35–40-vuotias brittiläinen herrasmiesmatkailija,
 * vilpitön hymy. Kaanon isoisän ulkonäöstä on docs/tarina.md:ssä
 * ("Hahmo"). Kuvat ovat pelin R2-mediämpärissä (kuvaputki varmensi
 * 3.9.2026 19:42 UTC), ja niihin viitataan valmiina osoitteina.
 *
 * Kaksi kytkentää: aloitussivun työpöydällä (index.html
 * #intro-valokuva) pieni Kanton-kuva matkakirjan alla, ja ensimmäisessä
 * lentokohtauksessa (js/ui.js aloituslentoSisalla) Bombay-kuva "löytyy
 * matkakirjan välistä" kartan päälle. Napautus lennolla suurentaa.
 */
import { AANI_JUURI } from './media.js';

export const ISOISAN_KUVAJUURI = `${AANI_JUURI}kohtaamiset/isoisa/`;

export const ISOISAN_VALOKUVAT = {
  kanton: {
    osoite: `${ISOISAN_KUVAJUURI}isoisa-kanton-1873-kulunut-v1.jpg`,
    selite: 'Isoisä teehuoneen pöydässä Kantonissa 1873. Kulunut cabinet card '
      + 'isoisän matkalaukusta.',
    lahde: 'Kuvaputken generoitu valokuva',
  },
  bombay: {
    osoite: `${ISOISAN_KUVAJUURI}isoisa-bombay-1873-kulunut-v1.jpg`,
    selite: 'Isoisä Bombayn satamalaiturilla matka-arkkunsa vieressä 1873. '
      + 'Valokuva löytyi matkakirjan välistä.',
    lahde: 'Kuvaputken generoitu valokuva',
  },
};

/** Lennolla valokuva nousee esiin vasta, kun repliikki on ehtinyt alkaa. */
export const LENNON_VALOKUVAN_VIIVE_MS = 2600;
