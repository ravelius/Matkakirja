/**
 * KAUPUNKILIUSKAN YLÄRYHMÄN NIMIÖT (Raamattu, KARTTAUUDISTUKSEN
 * PAATOKSET 34 kohta 8, omistajan omat sanat).
 *
 * MIKSI OMA MODUULI. Sama sana esiintyy kahdessa paikassa: liuskan
 * rivinä (js/pallolauta/kaupunkiliuska.js) ja kaupunkilehden
 * kohdekartan otsikkona (js/nahtavyydet.js). Yksi lähde estää
 * ajautumisen — mutta nähtävyydet EI saa tuoda pallolautaa, koska
 * pallolauta ei kuulu yhden tiedoston versioon (MODULES-listalla ei
 * saa olla `js/pallolauta/`-riviä; tests/pallolauta.test.mjs ja
 * tests/linssikartta.test.mjs vartioivat sitä). Siksi sana asuu
 * täällä, ilman riippuvuuksia, ja molemmat tuovat sen tästä.
 */

/** Liuskan rivi ja kohdekartan otsikko (entinen "Kaupunki kartalla"). */
export const NAHTAVYYDET_NIMIO = 'Nähtävyydet';
/** Liuskan rivi (entinen "Turisti-info"). */
export const TURISTIOPPAAN_NIMIO = 'Turistiopas';
