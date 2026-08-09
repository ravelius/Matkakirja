// Henkilöjutut: nähtävyysteksteissä mainittu henkilö saa oman
// juttunsa, joka aukeaa nimestä (omistajan tilaus 10.8.2026:
// "Helsinkiin voisi tehdä oman jutun Engelistä joka aukeaisi hänen
// nimen linkistä"). Juttu on samaa muotoa kuin nähtävyysjuttu
// (aika, teksti \n\n-kappaleina, kuvat, lahde), joten se renderöityy
// samalla avaaNahtavyys-polulla — vain avaustapa on eri.
//
// HENKILOLINKIT kertoo, minkä kaupungin jutuissa kenenkin nimi
// muutetaan linkiksi. Kuvio on säännöllinen lauseke, joka kattaa
// nimen taivutusmuodot ("Engelin", "Engeliä"); linkiksi muuttuu
// osuma sellaisenaan, joten teksti ei muutu.
//
// Pilotti: Carl Ludvig Engel Helsingissä. Uudet henkilöt lisätään
// tähän samalla kaavalla, kun omistaja tilaa ne.

export const HENKILOT = {
  engel: {
    nimi: 'Carl Ludvig Engel',
    aika: 'Arkkitehti · 1778–1840',
    teksti: 'Carl Ludvig Engel syntyi Berliinissä vuonna 1778 '
        + 'muurarimestarin poikana ja opiskeli arkkitehdiksi samassa '
        + 'koulussa kuin aikansa kuuluisimmat saksalaiset rakentajat. '
        + 'Työt veivät hänet ensin Tallinnaan ja Turkuun, ja matkan '
        + 'varrella hän ehti suunnitella taloja myös Pietarissa.'
      + '\n\n'
      + 'Vuonna 1816 Engel sai elämänsä tehtävän: Helsingistä oli '
        + 'juuri tullut Suomen pääkaupunki, ja sille piti rakentaa '
        + 'pääkaupungin näköinen keskusta. Engel suunnitteli '
        + 'Senaatintorin ympärille kokonaisuuden, jossa tuomiokirkko, '
        + 'senaatintalo ja yliopiston rakennukset seisovat vaaleina ja '
        + 'pylväikköineen kuin antiikin temppelit. Tyyliä kutsutaan '
        + 'empireksi, ja Helsingin keskusta on sen hienoimpia '
        + 'kokonaisuuksia koko maailmassa.'
      + '\n\n'
      + 'Engel ei piirtänyt vain Helsinkiä: hänen kynästään lähti '
        + 'kirkkoja, raatihuoneita ja kartanoita eri puolille Suomea, '
        + 'ja vuodesta 1824 hän johti koko maan julkista rakentamista. '
        + 'Kirjeissään hän ikävöi välillä Berliiniä, mutta kehui '
        + 'niissä myös Helsingin kaunista paikkaa meren äärellä.'
      + '\n\n'
      + 'Engel kuoli Helsingissä vuonna 1840, kaksitoista vuotta '
        + 'ennen kuin hänen suurin työnsä, Senaatintorin tuomiokirkko, '
        + 'vihittiin käyttöön. Kirkon portailla seisova näkee yhä '
        + 'yhdellä silmäyksellä, millaisen kaupungin yksi arkkitehti '
        + 'osasi piirtää.',
    kuvat: [
      {
        tiedosto: 'CFEngel-2.jpg',
        selite: 'Carl Ludvig Engel Johan Erik Lindhin maalaamassa '
          + 'muotokuvassa noin vuodelta 1840.',
        lahde: 'Johan Erik Lindh, Wikimedia Commons (PD)',
      },
    ],
    lahde: 'Wikipedia',
  },
};

export const HENKILOLINKIT = {
  helsinki: [
    // "Carl Ludvig Engel", "Engel", "Engelin", "Engeliä", …
    { id: 'engel', kuvio: /(?:Carl Ludvig )?Engel\w*/ },
  ],
};
