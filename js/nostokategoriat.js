/**
 * NOSTOJEN KATEGORIAT (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 34).
 *
 * MIKSI OMA MODUULI. Samaa ryhmittelyä käyttävät kaupunkiliuska
 * (js/pallolauta/kaupunkiliuska.js, joka vie tämän edelleen) ja
 * kaupunkilehden osiohakemisto (js/lehtiosiot.js). Lehti ei saa tuoda
 * pallolautaa, koska pallolauta ei kuulu yhden tiedoston versioon
 * (tests/pallolauta.test.mjs), joten ryhmittely asuu täällä ja lukee
 * aiheiden nimet suoraan karttaselitteestä (js/karttavalot.js).
 */

import { KARTTAVALO_AIHEET } from './karttavalot.js';

/** Onko aihe karttaselitteen oma aihe (ks. MUUT_AIHE). */
const tunnettuAihe = (aihe) => KARTTAVALO_AIHEET.some((r) => r.aihe === aihe);
/** Aiheen nimi karttaselitteestä (sama kuin pallolaudan aiheenNimi). */
const aiheenNimi = (aihe) => KARTTAVALO_AIHEET.find((r) => r.aihe === aihe)?.nimi ?? 'Nostot';

/**
 * KATEGORIAT LUKUMÄÄRINEEN. Ryhmittely on sama aihe kuin aihenostoilla
 * (PAATOKSET 27), jonka kartalta poistuminen on juuri se, mitä
 * PAATOKSET 34 kohta 3 sanoo: *"aihenostot poistuvat kartalta ja
 * niiden aiheet ovat listan otsikoita"*.
 *
 * Järjestys on ensiesiintymän järjestys, jotta lista ei vaihda
 * järjestystä ladonnasta toiseen (sama peruste kuin aihenoston
 * nimiöllä, js/pallolauta/nostot.js TÄRKEIN ON PAKETIN ENSIMMÄINEN).
 */
export const MUUT_AIHE = '';
export const MUUT_NIMIO = 'Muut';

export function kategoriat(nostot) {
  const jarjestys = [];
  const kasat = new Map();
  for (const n of nostot ?? []) {
    /*
     * AIHEETON NOSTO EI KATOA (PAATOKSET 34 kohta 11, omistaja
     * sanatarkasti: *"Eikö niille ole kategoriaa joilla ei vielä
     * ole?"*). Nosto, jolla ei ole aihetta — tai jonka aihe ei vastaa
     * yhtäkään karttaselitteen aihetta (js/karttavalot.js
     * KARTTAVALO_AIHEET, luettu `aiheenNimi`illa) — menee yhteen
     * "Muut"-kasaan. Ilman tätä sen kategoria olisi ollut nimetön tai
     * aiheita olisi ollut yhtä monta kuin tuntemattomia aiheita, ja
     * kumpikin rikkoisi säännön *"lukumäärien summa = kaupungin
     * sisäisten nostojen määrä"*.
     */
    const oma = n.aihe ?? '';
    const aihe = tunnettuAihe(oma) ? oma : MUUT_AIHE;
    if (!kasat.has(aihe)) { kasat.set(aihe, []); jarjestys.push(aihe); }
    kasat.get(aihe).push(n);
  }
  // "Muut" on aina LISTAN LOPUSSA, muut ensiesiintymän järjestyksessä.
  jarjestys.sort((x, y) => (x === MUUT_AIHE ? 1 : 0) - (y === MUUT_AIHE ? 1 : 0));
  return jarjestys.map((aihe) => ({
    aihe,
    nimi: tunnettuAihe(aihe) ? aiheenNimi(aihe) : MUUT_NIMIO,
    jasenet: kasat.get(aihe),
    maara: kasat.get(aihe).length,
  }));
}
