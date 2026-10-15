/*
 * SAN MARINON FOKUSVIRTA — KEVYT PAKKI (Sisältökirjuri 15.10.2026, juna 193:
 * pääkaupunki laudan pysäkiksi, PT:n erä b, 5 kaupunkia).
 *
 * Sama muoto kuin js/packs/fokusvirta-luxemburg.js: matkakirja ja pulun
 * kupla. EI vielä kohtaamista eikä kohtamispistettä (laudan paikka tulee
 * Karttaseppä:ltä, kohtaaminen omana eränään) eikä luentaa/ääntä
 * (Äänittäjä). Rekisteröinti js/packs/fokusvirrat.js + KEVYET_FOKUSVIRRAT
 * on Pelikoodarin kytkentä. Lähteet ja huomiot:
 * proto-3d/_tyo/sisaltokirjuri/pysakit-193b/tulos-*.json.
 */
export const FOKUSVIRTA_SANMARINO = {
  kaupunki: 'sanmarino',

  matkakirja: {
    paikkarivi: 'San Marino, syyskuussa 1873. Tasavalta vuorella, jota Italia '
          + 'kiertää joka puolelta.',
    teksti: 'San Marino, syyskuussa 1873. Italian kuningaskunta kietoo '
          + 'vuoren joka puolelta, mutta tasavalta seisoo yhä omillaan. '
          + 'Maata johtaa kaksi kapteenivaltionhoitajaa, jotka vaihtuvat '
          + 'puolen vuoden välein, kuten jo vuosisatoja. Täällä kerrotaan, '
          + 'että Garibaldi sai turvan vuonna 1849, ja keväällä 1872 maa '
          + 'uusi ystävyyssopimuksensa Italian kanssa. Harjalla vartioivat '
          + 'kolme tornia, eikä kukaan ole vielä saanut niitä vaihtamaan '
          + 'isäntää.',
  },

  pollo: {
    kommentti: [
      'Kaksi valtionpäämiestä vaihtuu yhä kuuden kuukauden välein. '
          + 'Isoisäsi aikaan sääntö oli jo yli 600 vuotta vanha.',
      'Vapauden patsas ja kaupungintalo puuttuivat vielä. Tornit '
          + 'olivat jo paikalla, ja nyt ne koristavat koko maan lippua.',
    ],
    tunne: { tunne: 'ylpea', voimakkuus: 0.45 },
    kuva: {
      tiedosto: 'Guaita fortress and the City of San Marino (2023).jpg',
      lyhyt: 'Guaitan linnake ja San Marinon kaupunki Monte Titanon '
          + 'rinteellä.',
      selite: 'Guaitan torni on rakennettu 1000-luvulla, joten se vartioi '
          + 'harjaa jo isoisän matkavuonna 1873. Se on kuvattu maan '
          + 'lipussa.',
      lahde: 'Terragio67, Commons (CC BY-SA 4.0)',
    },
  },
};
