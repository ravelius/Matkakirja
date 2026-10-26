/*
 * PODGORICAN FOKUSVIRTA — KEVYT PAKKI (Sisältökirjuri 15.10.2026, juna 193:
 * pääkaupunki laudan pysäkiksi, PT:n erä b, 3 kaupunkia).
 *
 * Sama muoto kuin js/packs/fokusvirta-luxemburg.js: matkakirja ja pulun
 * kupla. EI vielä kohtaamista eikä kohtamispistettä (laudan paikka tulee
 * Karttaseppä:ltä, kohtaaminen omana eränään) eikä luentaa/ääntä
 * (Äänittäjä). Rekisteröinti js/packs/fokusvirrat.js + KEVYET_FOKUSVIRRAT
 * on Pelikoodarin kytkentä. Lähteet ja huomiot:
 * proto-3d/_tyo/sisaltokirjuri/pysakit-193b/tulos-*.json.
 */
export const FOKUSVIRTA_PODGORICA = {
  kaupunki: 'podgorica',

  matkakirja: {
    paikkarivi: 'Podgorica, toukokuussa 1873. Linnoitus ja kivinen kellotorni '
          + 'kahden joen kulmassa kukkulan alla.',
    teksti: 'Podgorica, toukokuussa 1873. Nimi tarkoittaa kukkulan alla, ja '
          + 'kaupunki on ottomaanien. Ribnican rannalla Stara Varošin '
          + 'kapeat kujat kiertävät linnoitusta ja Sahat kulaa, kivistä '
          + 'kellotornia, joka on seissyt täällä yli kaksisataa vuotta. '
          + 'Kolmen uskon väki kulkee samoja katuja. Idässä ei ole muuria, '
          + 'vain kaivanto, ja torni toimii vahtina vuorille päin.',
  },

  pollo: {
    kommentti: [
      'Isoisäsi näki kaupungin, jossa vanhaa oli kaikki. Sodan '
          + 'jälkeen jäi Stara Varoš, ja muu on uutta.',
      'Torni selvisi pommituksista. Isoisäsi kuuli sen lyövän tunnit, '
          + 'minä kuulen espressokoneen.',
    ],
    tunne: { tunne: 'miettiva', voimakkuus: 0.5 },
    kuva: {
      tiedosto: 'Podgorica Uhrturm (Sahat Kula).JPG',
      lyhyt: 'Sahat kula, ottomaanien aikainen kellotorni Podgorican '
          + 'vanhassa kaupungissa.',
      selite: 'Sahat kula valmistui vuonna 1667 Stara Varošiin, joten torni '
          + 'seisoi jo isoisän matkavuonna 1873.',
      lahde: 'Colomen, Commons (CC BY-SA 4.0)',
    },
  },
};
