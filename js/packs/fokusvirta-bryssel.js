/*
 * BRYSSELIN FOKUSVIRTA — KEVYT PAKKI (Sonnet-sisältösessio 19.9.2026,
 * omistajan päätös: Belgia saa pelikaupungin Bryssel, pilotti).
 *
 * Sama muoto ja samat perustelut kuin js/packs/fokusvirta-alpit.js:ssä
 * ja muissa KEVYET_FOKUSVIRRAT-pakeissa: kevyt pakki kantaa vain
 * isoisän merkinnän ja pulun kuplan, koska pelin nykyinen kulku ei lue
 * muuta (js/fokusvirta.js FOKUSVIRTA_KORTIT === false). Kevyet pakit on
 * nimetty rekisterissä (js/packs/fokusvirrat.js KEVYET_FOKUSVIRRAT).
 *
 * MATKAKIRJAN TEKSTI on Fablen kirjoittama kaanon (19.9.2026). Livian
 * kupla on Sonnetin kirjoittama, koska se on nykypäivän ääni eikä
 * kaanonia.
 *
 * KUVA: Grand-Placen panoraama Commonsista (tiedosto-kenttä, sama
 * kolmiportainen kuvaosoite kuin muualla fokusvirrassa — ks.
 * js/fokusvirta.js kuvanOsoite). Lisenssi tarkistettu Commonsin
 * imageinfo/extmetadata-rajapinnasta 19.9.2026: Celuici, CC BY-SA 4.0.
 *
 * ÄÄNITETTÄ EI VIELÄ OLE — puuttuva tiedosto on hiljainen (js/luenta.js
 * playDiaryVoice), samoin kuin muilla kevyillä pakeilla.
 */
export const FOKUSVIRTA_BRYSSEL = {
  kaupunki: 'bryssel',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    paikkarivi: 'Bryssel, kesäkuussa 1873. Sateen jäljiltä kiiltävää; '
      + 'katukivi kaikuu askelista.',
    /*
     * Isoisän matkakirja, Fable 19.9.2026 klo 22.08 Suomen aikaa (kaanon;
     * korvasi Sonnet-sisältösession luonnoksen). Faktat: Sennen kattaminen
     * 1867–1871 ja bulevardit, Grand-Placen kiltatalot, Manneken Pis,
     * Palais de Justice rakenteilla 1866–1883 (Joseph Poelaert), Brysselin
     * pitsi (EUROPE_ARTIKKELIT.Bryssel).
     */
    teksti: 'Bryssel, kesäkuussa 1873. Kaupunki on juuri haudannut '
      + 'jokensa: Senne katettiin kivellä, ja sen päälle vedettiin '
      + 'bulevardi, jolla herrasväki kävelee kuin joki ei olisi koskaan '
      + 'haissutkaan. Grand-Placen kiltatalot on kullattu niin tiheään, '
      + 'että tori näyttää sateen jälkeen avatulta korulippaalta. Kulman '
      + 'takana pronssinen poika tekee tarpeensa suihkulähteeseen, ja '
      + 'koko kaupunki pitää sitä pyhänä. Kukkulalla nousee oikeuspalatsi, '
      + 'jonka pitäisi valmistua kymmenen vuoden päästä; työmiehet sanovat, '
      + 'ettei arkkitehti Poelaert itsekään tiedä, mihin se loppuu. Ostin '
      + 'pitsiä, jota täällä kehrätään kuin hämähäkit kilpaa.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /* KUPLAT: Sonnetin kirjoittamat, ei kaanonia — Livian nykypäivän ääni. */
    kommentti: [
      'Se pieni pronssipoika on yhä samalla kadunkulmalla. Nykyään hänellä on kaapissa yli tuhat eri asua.',
      'Isoisäsi näki hänet alasti. Minä olen nähnyt hänet merenkulkijana, pandana ja kerran jopa kyyhkysenä.',
    ],
    tunne: { tunne: 'ilo', voimakkuus: 0.5 },
    kuva: {
      tiedosto: 'Grand-Place, Brussels - panorama, June 2018.jpg',
      lyhyt: 'Grand-Place Brysselin keskustassa nykyään.',
      selite: 'Grand-Placen kiltatalot ja raatihuoneen torni nykyään. '
        + 'Tori ammuttiin raunioiksi vuonna 1695, ja sama kullattu '
        + 'julkisivurivi seisoo yhä paikallaan jälleenrakennuksen jäljiltä.',
      lahde: 'Celuici, Commons (CC BY-SA 4.0)',
    },
  },
};
