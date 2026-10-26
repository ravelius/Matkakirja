/*
 * MONACON FOKUSVIRTA — KEVYT PAKKI (Sisältökirjuri 15.10.2026, juna 193:
 * pääkaupunki laudan pysäkiksi, PT:n rajaus 8 kaupunkia).
 *
 * Sama muoto kuin js/packs/fokusvirta-luxemburg.js: matkakirja ja pulun
 * kupla. EI vielä kohtaamista eikä kohtaamispistettä (laudan paikka tulee
 * Karttaseppä:ltä, kohtaaminen omana eränään) eikä luentaa/ääntä
 * (Äänittäjä). Rekisteröinti js/packs/fokusvirrat.js + KEVYET_FOKUSVIRRAT
 * on Pelikoodarin kytkentä. Lähteet ja huomiot:
 * proto-3d/_tyo/sisaltokirjuri/pysakit-193/tulos-*.json.
 */
export const FOKUSVIRTA_MONACO = {
  kaupunki: 'monaco',

  matkakirja: {
    paikkarivi: 'Monaco, maaliskuussa 1873. Kasinon valot, linnoitettu kallio '
          + 'ja ruhtinas, joka ei veroita.',
    teksti: 'Monaco, maaliskuussa 1873. Ruhtinaskunta menetti Menton ja '
          + 'Roquebrunen Ranskalle kaksitoista vuotta sitten, ja jäljelle '
          + 'jäi pieni kaistale rannikkoa. Silti ruhtinas Charles ei ole '
          + 'kerännyt tuloveroa neljään vuoteen, sillä kasino maksaa '
          + 'kaiken. Juna tuo pelaajat suoraan rannalle, ja kasinon '
          + 'ympärille kasvaa uusi kaupunginosa, Monte Carlo. Vanha kallio '
          + 'katselee sitä kuin köyhä sukulainen.',
  },

  pollo: {
    kommentti: [
      'Kasinon tuotot hoitivat veroasiat silloin, ja Monacossa ei yhä '
          + 'ole asukkaiden tuloveroa, ranskalaisia lukuun ottamatta.',
      'Se köyhä sukulainen eli kallio on yhä Grimaldien virallinen '
          + 'asuinpaikka. Hän asuu siis edelleen kunniapaikalla.',
    ],
    tunne: { tunne: 'hammastys', voimakkuus: 0.5 },
    kuva: {
      tiedosto: 'Casino de Montecarlo, Mónaco, 2016-06-23, DD 05.jpg',
      lyhyt: 'Monte Carlon kasino Place du Casino -aukion laidalla nykyään.',
      selite: 'Kasino valmistui 1863, ja ruhtinaskunnan tulot nojasivat '
          + 'siihen jo isoisän aikaan.',
      lahde: 'Diego Delso, Commons (CC BY-SA 4.0)',
    },
  },
};
