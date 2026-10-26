/*
 * CHIȘINĂUN FOKUSVIRTA — KEVYT PAKKI (Sisältökirjuri 15.10.2026, juna 193:
 * pääkaupunki laudan pysäkiksi, PT:n rajaus 8 kaupunkia).
 *
 * Sama muoto kuin js/packs/fokusvirta-luxemburg.js: matkakirja ja pulun
 * kupla. EI vielä kohtaamista eikä kohtaamispistettä (laudan paikka tulee
 * Karttaseppä:ltä, kohtaaminen omana eränään) eikä luentaa/ääntä
 * (Äänittäjä). Rekisteröinti js/packs/fokusvirrat.js + KEVYET_FOKUSVIRRAT
 * on Pelikoodarin kytkentä. Lähteet ja huomiot:
 * proto-3d/_tyo/sisaltokirjuri/pysakit-193/tulos-*.json.
 */
export const FOKUSVIRTA_CHISINAU = {
  kaupunki: 'chisinau',

  matkakirja: {
    paikkarivi: 'Chișinău, toukokuussa 1873. Suorat kadut, pylväikkökatedraali '
          + 'ja riemukaari tsaarin kaupungissa.',
    teksti: 'Chișinău, toukokuussa 1873. Venäläiset sanovat tätä '
          + 'Kišinjoviksi, sillä kaupunki on tsaarin kaupunki: '
          + 'pylväikköinen katedraali seisoo keskellä, ja riemukaari '
          + 'muistuttaa voitosta Turkin sodassa. Rautatie tuli tänne pari '
          + 'vuotta sitten. Ciuflea-kirkon rakennutti kauppiasveljesten '
          + 'perintö, ja veljekset tulivat Makedoniasta asti. Tällä '
          + 'kaupungilla on monta kotimaata.',
  },

  pollo: {
    kommentti: [
      'Isoisäsi kirjoitti nimen venäläisittäin, Kišinjov. Nykyään kaupunki on Moldovan pääkaupunki ja kirjoitetaan Chișinău.',
      'Riemukaari seisoo yhä paikallaan, vaikka toinen maailmansota '
          + 'ja maanjäristykset veivät paljon muuta.',
    ],
    tunne: { tunne: 'miettiva', voimakkuus: 0.5 },
    kuva: {
      tiedosto: 'Arco del triunfo, Chisináu, Moldavia, 2023-11-03, DD 27.jpg',
      lyhyt: 'Chișinăun riemukaari valmistui 1840-luvun alussa muistoksi '
          + 'Venäjän voitosta Turkin sodassa.',
      selite: 'Kaari on 13 metriä korkea ja kaksikerroksinen, ja sen '
          + 'yläkerrassa riippui vuoteen 2011 asti lähes kuuden ja puolen '
          + 'tonnin kello.',
      lahde: 'Diego Delso, Commons (CC BY-SA 4.0)',
    },
  },
};
