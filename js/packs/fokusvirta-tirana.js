/*
 * TIRANAN FOKUSVIRTA — KEVYT PAKKI (Sisältökirjuri 15.10.2026, juna 193:
 * pääkaupunki laudan pysäkiksi, PT:n rajaus 8 kaupunkia).
 *
 * Sama muoto kuin js/packs/fokusvirta-luxemburg.js: matkakirja ja pulun
 * kupla. EI vielä kohtaamista eikä kohtaamispistettä (laudan paikka tulee
 * Karttaseppä:ltä, kohtaaminen omana eränään) eikä luentaa/ääntä
 * (Äänittäjä). Rekisteröinti js/packs/fokusvirrat.js + KEVYET_FOKUSVIRRAT
 * on Pelikoodarin kytkentä. Lähteet ja huomiot:
 * proto-3d/_tyo/sisaltokirjuri/pysakit-193/tulos-*.json.
 */
export const FOKUSVIRTA_TIRANA = {
  kaupunki: 'tirana',

  matkakirja: {
    paikkarivi: 'Tirana, huhtikuussa 1873. Basaari, kellotorni ja moskeija, '
          + 'jonka seinillä kasvaa maalattu metsä.',
    teksti: 'Tirana, huhtikuussa 1873. Ottomaanien valtakunnan '
          + 'basaarikaupunki, jota kukaan ei vielä kutsu pääkaupungiksi. '
          + 'Et\'hem Beyn moskeijan seinillä on maalattuja puita, '
          + 'vesiputouksia ja siltoja, jotka eivät esitä mitään oikeaa '
          + 'paikkaa, ja sen vieressä kohoaa kellotorni. Kello lyö tunnit '
          + 'basaarin yllä, jossa kauppaa ja vesimyllyjä on pyörinyt jo '
          + 'kauan ennen tätä moskeijaa.',
  },

  pollo: {
    kommentti: [
      'Moskeijan ja kellotornin viereen on noussut jalankulkijoiden aukio. Isoisäsi aikaan siinä oli basaari.',
      'Pyramidin kylkeä pitkin pääsee kävelemään huipulle. Diktaattorin museoksi tarkoitettu rakennus on nuorten teknologiakeskus.',
    ],
    tunne: { tunne: 'utelias', voimakkuus: 0.5 },
    kuva: {
      tiedosto: 'Clock Tower and Mosque of Tirana (night).jpg',
      lyhyt: 'Et\'hem Beyn moskeija ja kellotorni Skanderbeg-aukion laidalla '
          + 'yöllä.',
      selite: 'Et\'hem Beyn moskeija valmistui 1819 tai 1821 ja kellotorni '
          + '1820-luvulla, joten molemmat seisoivat jo isoisän matkavuonna '
          + '1873.',
      lahde: 'Liridon, Commons (CC0)',
    },
  },
};
