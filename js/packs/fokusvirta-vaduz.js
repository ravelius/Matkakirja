/*
 * VADUZN FOKUSVIRTA — KEVYT PAKKI (Sisältökirjuri 15.10.2026, juna 193:
 * pääkaupunki laudan pysäkiksi, PT:n rajaus 8 kaupunkia).
 *
 * Sama muoto kuin js/packs/fokusvirta-luxemburg.js: matkakirja ja pulun
 * kupla. EI vielä kohtaamista eikä kohtaamispistettä (laudan paikka tulee
 * Karttaseppä:ltä, kohtaaminen omana eränään) eikä luentaa/ääntä
 * (Äänittäjä). Rekisteröinti js/packs/fokusvirrat.js + KEVYET_FOKUSVIRRAT
 * on Pelikoodarin kytkentä. Lähteet ja huomiot:
 * proto-3d/_tyo/sisaltokirjuri/pysakit-193/tulos-*.json.
 */
export const FOKUSVIRTA_VADUZ = {
  kaupunki: 'vaduz',

  matkakirja: {
    paikkarivi: 'Vaduz, lokakuussa 1873. Kylä, josta on tehty pääkaupunki, ja '
          + 'linna katsomassa rinteeltä.',
    teksti: 'Vaduz, lokakuussa 1873. Maan pääkaupunki on kylä, jossa uusi '
          + 'neogoottilainen kirkko vihittiin juuri ja vanha kappeli '
          + 'odottaa purkua. Armeijaa ei ole ollut viiteen vuoteen: se '
          + 'lakkautettiin 1868, kun sotilaiden pito kävi liian kalliiksi. '
          + 'Ruhtinas asuu Wienissä, mutta linna katsoo kylää rinteeltä. '
          + 'Rautatie kulkee maan läpi viime vuodesta, Vaduzin ohi.',
  },

  pollo: {
    kommentti: [
      'Se linna, jota isoisäsi katseli rinteeltä, on ruhtinassuvun '
          + 'vakituinen koti vuodesta 1938. Siksi sinne ei pääse sisään.',
      'Kirkko, jonka isoisäsi näki juuri vihittynä, on nykyään katedraali. Armeijaa ei ole edelleenkään.',
    ],
    tunne: { tunne: 'utelias', voimakkuus: 0.5 },
    kuva: {
      tiedosto: 'Schloss Vaduz. Ansicht von Westen. 2015-10-03 17-52-32.jpg',
      lyhyt: 'Vaduzin linna kohoaa rinteellä kaupungin yllä nykyäänkin.',
      selite: 'Linnan vanhimmat osat ovat 1100-luvulta. Ruhtinassuvun '
          + 'vakituinen koti se on ollut vuodesta 1938.',
      lahde: 'Shesmax, Commons (CC BY-SA 4.0)',
    },
  },
};
