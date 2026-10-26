/*
 * ZAGREBN FOKUSVIRTA — KEVYT PAKKI (Sisältökirjuri 15.10.2026, juna 193:
 * pääkaupunki laudan pysäkiksi, PT:n rajaus 8 kaupunkia).
 *
 * Sama muoto kuin js/packs/fokusvirta-luxemburg.js: matkakirja ja pulun
 * kupla. EI vielä kohtaamista eikä kohtaamispistettä (laudan paikka tulee
 * Karttaseppä:ltä, kohtaaminen omana eränään) eikä luentaa/ääntä
 * (Äänittäjä). Rekisteröinti js/packs/fokusvirrat.js + KEVYET_FOKUSVIRRAT
 * on Pelikoodarin kytkentä. Lähteet ja huomiot:
 * proto-3d/_tyo/sisaltokirjuri/pysakit-193/tulos-*.json.
 */
export const FOKUSVIRTA_ZAGREB = {
  kaupunki: 'zagreb',

  matkakirja: {
    paikkarivi: 'Zagreb, toukokuussa 1873. Kaksi kukkulaa, yksi kaupunki ja '
          + 'yksi maalaus, joka ei palanut.',
    teksti: 'Zagreb, toukokuussa 1873. Kroatia on viisi vuotta sitten '
          + 'sovittu Unkarin kruunun maihin, mutta torilla ratsastaa silti '
          + 'ban Jelačić; hänen patsaansa pystytettiin vasta seitsemän '
          + 'vuotta sitten. Kivisen portin holvissa palaa kynttilöitä '
          + 'Neitsyt Marian maalauksen edessä. Se löytyi '
          + 'vahingoittumattomana tuhkasta, kun vuoden 1731 palo tuhosi '
          + 'Yläkaupungin, ja ihmiset ovat polvistuneet sen eteen siitä '
          + 'asti.',
  },

  pollo: {
    kommentti: [
      'Maalaus on yhä Kivisen portin holvin alla. Suojelijaksi se julistettiin vasta 1991, mutta kynttilät ovat palaneet jo kauan.',
      'Lotrščakin tornista ammutaan nykyään tykki joka päivä keskipäivällä. Isoisäsi aikaan tunnit kuuli vain kelloista.',
    ],
    tunne: { tunne: 'ilo', voimakkuus: 0.5 },
    kuva: {
      tiedosto: 'Kamenita vrata 29102016-002.jpg',
      lyhyt: 'Kivinen portti on Gradecin ainoa säilynyt kaupunginportti.',
      selite: 'Kivinen portti rakennettiin 1200-luvulla osana Gradecin '
          + 'muureja, ja sen holvin alla on Neitsyt Marian maalaus, joka '
          + 'säilyi vuoden 1731 tulipalossa.',
      lahde: 'Yamen, Commons (CC BY-SA 4.0)',
    },
  },
};
