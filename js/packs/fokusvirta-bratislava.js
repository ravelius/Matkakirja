/*
 * BRATISLAVAN FOKUSVIRTA — KEVYT PAKKI (Sisältökirjuri 15.10.2026, juna 193:
 * pääkaupunki laudan pysäkiksi, PT:n erä b, 3 kaupunkia).
 *
 * Sama muoto kuin js/packs/fokusvirta-luxemburg.js: matkakirja ja pulun
 * kupla. EI vielä kohtaamista eikä kohtamispistettä (laudan paikka tulee
 * Karttaseppä:ltä, kohtaaminen omana eränään) eikä luentaa/ääntä
 * (Äänittäjä). Rekisteröinti js/packs/fokusvirrat.js + KEVYET_FOKUSVIRRAT
 * on Pelikoodarin kytkentä. Lähteet ja huomiot:
 * proto-3d/_tyo/sisaltokirjuri/pysakit-193b/tulos-*.json.
 */
export const FOKUSVIRTA_BRATISLAVA = {
  kaupunki: 'bratislava',

  matkakirja: {
    paikkarivi: 'Pozsony, syyskuussa 1873. Raunioitunut linna, kultainen kruunu '
          + 'ja silta, joka kelluu.',
    teksti: 'Pozsony, syyskuussa 1873. Saksalaiset sanovat Pressburg, '
          + 'unkarilaiset Pozsony. Linna on ollut raunio vuodesta 1811, '
          + 'mutta Pyhän Martinin kirkon tornissa kiiltää kultainen kruunu, '
          + 'sillä täällä kruunattiin Unkarin kuninkaita vuoteen 1830. '
          + 'Tonavan yli kuljetaan yhä laivojen varaan rakennettua siltaa, '
          + 'koska kiinteää siltaa ei ole.',
  },

  pollo: {
    kommentti: [
      'Linna on nykyään kunnostettu ja täynnä kävijöitä. Isoisäsi '
          + 'aikaan siinä törrötti vain palanut runko.',
      'Tonavan yli on nykyään kuusi siltaa. Isoisäsi aikaan niitä oli '
          + 'yksi, ja sekin kellui.',
    ],
    tunne: { tunne: 'miettiva', voimakkuus: 0.5 },
    kuva: {
      tiedosto: 'View of Bratislava from Nový most, 20210727 1012 0262.jpg',
      lyhyt: 'Bratislavan vanha kaupunki ja linna Tonavan rannalla.',
      selite: 'Bratislavan linna ja vanha kaupunki Tonavan varrella. Linna '
          + 'paloi 1811 ja oli yhä raunio isoisän matkavuonna 1873.',
      lahde: 'Jakub Hałun, Commons (CC BY-SA 4.0)',
    },
  },
};
