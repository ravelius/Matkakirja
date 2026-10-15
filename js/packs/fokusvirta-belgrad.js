/*
 * BELGRADN FOKUSVIRTA — KEVYT PAKKI (Sisältökirjuri 15.10.2026, juna 193:
 * pääkaupunki laudan pysäkiksi, PT:n rajaus 8 kaupunkia).
 *
 * Sama muoto kuin js/packs/fokusvirta-luxemburg.js: matkakirja ja pulun
 * kupla. EI vielä kohtaamista eikä kohtaamispistettä (laudan paikka tulee
 * Karttaseppä:ltä, kohtaaminen omana eränään) eikä luentaa/ääntä
 * (Äänittäjä). Rekisteröinti js/packs/fokusvirrat.js + KEVYET_FOKUSVIRRAT
 * on Pelikoodarin kytkentä. Lähteet ja huomiot:
 * proto-3d/_tyo/sisaltokirjuri/pysakit-193/tulos-*.json.
 */
export const FOKUSVIRTA_BELGRAD = {
  kaupunki: 'belgrad',

  matkakirja: {
    paikkarivi: 'Belgrad, syyskuussa 1873. Joet kohtaavat yhä saman '
          + 'kalliorinteen juurella, mutta kaupunki ei enää näytä samalta '
          + 'kuin ennen.',
    teksti: 'Belgrad, syyskuussa 1873. Sulttaanin varuskunta lähti '
          + 'linnoituksesta kuusi vuotta sitten, ja siitä asti kaupunki on '
          + 'repinyt itseään uudeksi: Stambolin portti on purettu, sen '
          + 'paikalle on noussut teatteri, ja insinööri vetää mutkaisten '
          + 'turkkilaiskujien tilalle suoria katuja. Serbialaiset '
          + 'vartioivat nyt muureja, vaikka Wien ei tunnusta heitä '
          + 'omistajiksi. Kahvilan vanhat miehet sanovat sitä edistykseksi, '
          + 'hieman epäillen.',
  },

  pollo: {
    kommentti: [
      'Linnoituksen muureilla kävelee nykyään vartijoiden sijaan turisteja, ja harjoituskentästä on tullut Kalemegdanin puisto.',
      'Isoisäsi näki mutkien suoristuvan. Tasavallan aukiolla seisoo nykyään ruhtinas Mihailon ratsastajapatsas.',
    ],
    tunne: { tunne: 'miettiva', voimakkuus: 0.5 },
    kuva: {
      tiedosto: 'Belgrade – Kalemegdan (2021) 02.jpg',
      lyhyt: 'Belgradin linnoitus ja Kalemegdan nykyään.',
      selite: 'Linnoituksen edustan kentältä alettiin muotoilla Kalemegdanin '
          + 'puistoa 1860-luvun lopulla. Isoisän matkavuonna 1873 '
          + 'istutukset olivat vielä kesken.',
      lahde: 'Imeao, Commons (CC0)',
    },
  },
};
