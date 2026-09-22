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
     * Isoisän matkakirja, Fable 19.9.2026 klo 22.08, lyhennetty 22.48 (omistaja:
     * "liian pitkä. Max 450 merkkiä"; nyt alle 450) (kaanon;
     * korvasi Sonnet-sisältösession luonnoksen). Faktat: Sennen kattaminen
     * 1867–1871 ja bulevardit, Grand-Placen kiltatalot, Manneken Pis,
     * Palais de Justice rakenteilla 1866–1883 (Joseph Poelaert), Brysselin
     * pitsi (EUROPE_ARTIKKELIT.Bryssel).
     */
    teksti: 'Bryssel, kesäkuussa 1873. Kaupunki on juuri haudannut jokensa: Senne '
      + 'katettiin kivellä, ja päälle vedettiin bulevardi, jolla herrasväki '
      + 'kävelee kuin joki ei olisi koskaan haissutkaan. Grand-Placen '
      + 'kullatut kiltatalot kiiltävät sateen jälkeen kuin avattu korulipas. '
      + 'Kulman takana pronssinen poika tekee tarpeensa suihkulähteeseen, ja '
      + 'koko kaupunki pitää sitä pyhänä. Ostin pitsiä, jota täällä kehrätään '
      + 'kuin hämähäkit kilpaa.',
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

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kaksi kenttää kuin täysissä pakeissa (esim. fokusvirta-
   * tampere.js). Fable vahvisti 22.9.2026, ettei kevyt pakki estä
   * kohtaamisen kirjoittamista: vihreä piste avaa kohtaamisen suoraan
   * laattakysymyksenä (js/fokusvirta.js avaaFokusKohtaaminen). Ei
   * vihjeOsiota — Brysselillä ei ole kaupunkilehden osioita (kevyt
   * pakki). Kohtaamiskortin todellinen sisältö (js/packs/kohtaamiset.js,
   * avain 'bryssel') on kivenveistäjä Aline.
   */
  kohtaaminen: {
    hahmo: 'Kivenveistäjä Aline',
    nappi: 'Tapaa kivenveistäjä',
    varmistus: 'Haluatko varmasti tavata Alinen juuri nyt?',
    teksti: 'Aline seisoo pörssitalon keskeneräisillä telineillä, taltta '
      + 'kädessään ja kivipöly hihoissaan. Rakennus avataan juhlallisesti '
      + 'vasta joulun alla, puoli vuotta myöhemmin kuin isoisä kulki '
      + 'ohitse — hän näki vain runkovaiheen ja kuvanveistäjien '
      + 'käsityön kesken. Aline haluaa tietää, tunteeko tulija maailman '
      + 'muutenkin kuin valmiiden rakennusten kautta, ennen kuin näyttää '
      + 'kumpi kivireliefeistä on hänen omaa käsialaansa.',
  },

  /*
   * KOHTAAMISPAIKKA: PÖRSSITALON TYÖMAA (La Bourse). Koordinaatit ovat
   * kaupungin oma laattapaikka (sama perusteltu poikkeus kuin Riiassa):
   * js/packs/europe.js 295/556, js/packs/maailmankartta.js 5978.4/1353.
   */
  kohtaamispiste: {
    nimi: 'Pörssitalon työmaa',
    laudat: {
      maailmankartta: { x: 5978.4, y: 1353 },
      europe: { x: 295, y: 556 },
    },
  },
};
