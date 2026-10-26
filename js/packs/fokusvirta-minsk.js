/*
 * MINSKN FOKUSVIRTA — KEVYT PAKKI (Sisältökirjuri 15.10.2026, juna 193:
 * pääkaupunki laudan pysäkiksi, PT:n rajaus 8 kaupunkia).
 *
 * Sama muoto kuin js/packs/fokusvirta-luxemburg.js: matkakirja ja pulun
 * kupla. EI vielä kohtaamista eikä kohtaamispistettä (laudan paikka tulee
 * Karttaseppä:ltä, kohtaaminen omana eränään) eikä luentaa/ääntä
 * (Äänittäjä). Rekisteröinti js/packs/fokusvirrat.js + KEVYET_FOKUSVIRRAT
 * on Pelikoodarin kytkentä. Lähteet ja huomiot:
 * proto-3d/_tyo/sisaltokirjuri/pysakit-193/tulos-*.json.
 */
export const FOKUSVIRTA_MINSK = {
  kaupunki: 'minsk',

  matkakirja: {
    paikkarivi: 'Minsk, lokakuussa 1873. Kuvernementin kaupunki, johon rautatie '
          + 'on juuri saapunut.',
    teksti: 'Minsk, lokakuussa 1873. Kuvernementin kaupunki Venäjän '
          + 'keisarikunnassa ja nyt myös ratasolmu: Moskovan ja Varsovan '
          + 'rata on kulkenut tästä jo kaksi vuotta, ja tänä vuonna siihen '
          + 'risteää uusi rata Vilnasta. Asema on vielä pelkkä puurakennus, '
          + 'mutta kaupunki kasvaa sen ympärille. Pyhän Hengen katedraali, '
          + 'jonka luostari on palanut kahdesti, vihittiin uudelleen kolme '
          + 'vuotta sitten.',
  },

  pollo: {
    kommentti: [
      'Isoisäsi puuasema on korvattu kahdesti, ja nykyinen rakennus valmistui 2002. Radat risteävät silti samassa kohdassa.',
      'Sodan jälkeen keskusta rakennettiin uusiksi. Pyhän Hengen katedraalin isoisäsi vielä tunnistaisi.',
    ],
    tunne: { tunne: 'vakava', voimakkuus: 0.4 },
    kuva: {
      tiedosto: 'Holy Spirit Cathedral in Minsk.jpg',
      lyhyt: 'Pyhän Hengen katedraali Minskin Yläkaupungissa.',
      selite: 'Pyhän Hengen katedraali rakennettiin 1633–1642 '
          + 'bernardiiniluostarin kirkoksi, ja se vihittiin uudelleen '
          + '22.10.1870. Isoisä näki sen kolmen vuoden ikäisenä '
          + 'kunnostettuna kirkkona.',
      lahde: 'Insider, Commons (CC BY-SA 3.0)',
    },
  },
};
