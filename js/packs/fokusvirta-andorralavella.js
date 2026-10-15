/*
 * ANDORRA LA VELLAN FOKUSVIRTA — KEVYT PAKKI (Sisältökirjuri 15.10.2026, juna 193:
 * pääkaupunki laudan pysäkiksi, PT:n erä b, 5 kaupunkia).
 *
 * Sama muoto kuin js/packs/fokusvirta-luxemburg.js: matkakirja ja pulun
 * kupla. EI vielä kohtaamista eikä kohtamispistettä (laudan paikka tulee
 * Karttaseppä:ltä, kohtaaminen omana eränään) eikä luentaa/ääntä
 * (Äänittäjä). Rekisteröinti js/packs/fokusvirrat.js + KEVYET_FOKUSVIRRAT
 * on Pelikoodarin kytkentä. Lähteet ja huomiot:
 * proto-3d/_tyo/sisaltokirjuri/pysakit-193b/tulos-*.json.
 */
export const FOKUSVIRTA_ANDORRALAVELLA = {
  kaupunki: 'andorralavella',

  matkakirja: {
    paikkarivi: 'Andorra la Vella, marraskuussa 1873. Parlamentti, josta ei '
          + 'lähdetä kotiin ennen päätöstä.',
    teksti: 'Andorra la Vella, marraskuussa 1873. Laaksoja hallitsee kaksi '
          + 'ruhtinasta, Urgellin piispa ja Ranskan valtionpäämies, ja '
          + 'neuvosto istuu kalliolla seisovassa Busquetsin kartanossa. '
          + 'Ovessa lukee 1580. Alakerrassa seisovat neuvosmiesten muulit, '
          + 'sillä miehet jäävät taloon, kunnes asia on ratkaistu. '
          + 'Keittiössä syödään yhdessä.',
  },

  pollo: {
    kommentti: [
      'Parlamentti muutti 2011 uuteen taloon aivan viereen. Vanhassa '
          + 'pidetään yhä perinneistunnot, mutta muulit ovat poissa.',
      'Toinen ruhtinas on yhä Ranskan presidentti, vaikka yksikään '
          + 'andorralainen ei äänestä häntä. Isoisäsi aikaan sama '
          + 'järjestely.',
    ],
    tunne: { tunne: 'miettiva', voimakkuus: 0.5 },
    kuva: {
      tiedosto: 'Casa de la Vall. 1580. Andorra 149.jpg',
      lyhyt: 'Casa de la Vall oli Andorran parlamentin paikka vuoteen 2011.',
      selite: 'Casa de la Vall rakennettiin Busquetsin suvun kartanoksi, ja '
          + 'talon vaakunassa on vuosiluku 1580. Andorran yleiskokous osti '
          + 'sen 1700-luvun alussa, ja se toimi parlamenttitalona vuoteen '
          + '2011.',
      lahde: 'Luis Miguel Bugallo Sánchez (Lmbuga), Commons (CC BY-SA 3.0)',
    },
  },
};
