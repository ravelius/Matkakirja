/*
 * SKOPJEN FOKUSVIRTA — KEVYT PAKKI (Sisältökirjuri 15.10.2026, juna 193:
 * pääkaupunki laudan pysäkiksi, PT:n rajaus 8 kaupunkia).
 *
 * Sama muoto kuin js/packs/fokusvirta-luxemburg.js: matkakirja ja pulun
 * kupla. EI vielä kohtaamista eikä kohtaamispistettä (laudan paikka tulee
 * Karttaseppä:ltä, kohtaaminen omana eränään) eikä luentaa/ääntä
 * (Äänittäjä). Rekisteröinti js/packs/fokusvirrat.js + KEVYET_FOKUSVIRRAT
 * on Pelikoodarin kytkentä. Lähteet ja huomiot:
 * proto-3d/_tyo/sisaltokirjuri/pysakit-193/tulos-*.json.
 */
export const FOKUSVIRTA_SKOPJE = {
  kaupunki: 'skopje',

  matkakirja: {
    paikkarivi: 'Üsküb, lokakuussa 1873. Sulttaanin kaupunki joen molemmin '
          + 'puolin ja uusi asema savuaa.',
    teksti: 'Üsküb, lokakuussa 1873. Sulttaanin kaupunki makaa Vardarin '
          + 'molemmin puolin. Kivisilta, jonka kaaret ovat kantaneet yli '
          + 'neljäsataa vuotta, vie etelärannalta basaariin, ja '
          + 'Kale-linnoitus vartioi molempia. Etelärannalle on tänä vuonna '
          + 'noussut uutta: rautatie Salonikiin asti. Basaarin kauppiaat '
          + 'tuntevat vanhat tiet, mutta junan savu kertoo, että ne ovat '
          + 'muuttumassa.',
  },

  pollo: {
    kommentti: [
      'Kivisilta kantaa yhä. Sen ympärillä kaupunki on uusi, sillä vuoden 1963 maanjäristys tuhosi valtaosan rakennuksista.',
      'Üsküb on nykyään Skopje, Pohjois-Makedonian pääkaupunki. Basaarin kauppiaiden tilalla ovat kahvilat.',
    ],
    tunne: { tunne: 'miettiva', voimakkuus: 0.5 },
    kuva: {
      tiedosto: 'Stone Bridge (44229534855).jpg',
      lyhyt: 'Kivisilta on 214 metriä pitkä ja 12-kaarinen, ja se on '
          + 'kaupungin vaakunan pääaihe.',
      selite: 'Silta rakennettiin roomalaisten perustusten päälle 1451–1469 '
          + 'ja yhdistää Makedonia-aukion Vanhaan basaariin.',
      lahde: 'jjmusgrove, Commons (CC BY 2.0)',
    },
  },
};
