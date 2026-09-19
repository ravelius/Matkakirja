/*
 * LJUBLJANAN FOKUSVIRTA — KEVYT PAKKI (Sonnet-sisältösessio 20.9.2026,
 * omistajan päätös 19.9.2026: Slovenia saa pelikaupungin Ljubljana).
 *
 * Sama muoto ja samat perustelut kuin js/packs/fokusvirta-bryssel.js:ssä
 * ja muissa KEVYET_FOKUSVIRRAT-pakeissa: kevyt pakki kantaa vain
 * isoisän merkinnän ja pulun kuplan, koska pelin nykyinen kulku ei lue
 * muuta (js/fokusvirta.js FOKUSVIRTA_KORTIT === false). Kevyet pakit on
 * nimetty rekisterissä (js/packs/fokusvirrat.js KEVYET_FOKUSVIRRAT).
 *
 * MATKAKIRJAN TEKSTI ON Fablen kaanon 20.9.2026 klo 00.30 (oli LUONNOS) — Fable kirjoittaa kaanonin
 * (isoisän matkakirjan sävy, päivämäärä ja reitti). Livian kupla on
 * Sonnetin kirjoittama, koska se on nykypäivän ääni eikä kaanonia.
 *
 * KUVA: Ljubljanica ja fransiskaanikirkko Commonsista (tiedosto-kenttä,
 * sama kolmiportainen kuvaosoite kuin muualla fokusvirrassa — ks.
 * js/fokusvirta.js kuvanOsoite). Lisenssi tarkistettu Commonsin
 * imageinfo/extmetadata-rajapinnasta 20.9.2026: Jakub Hałun, CC BY 4.0.
 *
 * ÄÄNITETTÄ EI VIELÄ OLE — puuttuva tiedosto on hiljainen (js/luenta.js
 * playDiaryVoice), samoin kuin muilla kevyillä pakeilla.
 */
export const FOKUSVIRTA_LJUBLJANA = {
  kaupunki: 'ljubljana',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    paikkarivi: 'Ljubljana (Laibach), 1873. Joen rannalla aamu-usva, '
      + 'linnavuori kohoaa kaupungin yllä.',
    /*
     * LUONNOS, Fable kirjoittaa kaanonin. Tilapäisteksti, jotta
     * fokusvirtapakki ja saapumisteksti-testi (tests/vanha-maailma.test.mjs)
     * läpäisevät ennen sitä. Perustuu artikkelin (EUROPE_ARTIKKELIT.Ljubljana)
     * faktoihin: Laibach, linna vankilana, lohikäärme, rautatie Wienistä.
     * Päivämäärä ja reitin järjestys on jätetty auki (paikkarivissä vain
     * vuosi).
     */
    teksti: 'Ljubljana, syyskuussa 1873. Laibach, sanovat itävaltalaiset '
      + 'virkamiehet, ja kaupunki kuuntelee kahdella korvalla. Linna '
      + 'kyyhöttää kukkulalla kuin vartija, joka on nukahtanut virkaansa: '
      + 'sisällä on vankila, ei ruhtinaita. Ljubljanica kiertää vanhan '
      + 'kaupungin hitaasti kuin ei tahtoisi lähteä, ja rannan pajat haisevat '
      + 'nahalta ja tervalta. Juna toi minut Wienistä yhdessä päivässä; '
      + 'isoisäni aikaan matka kesti viikon.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /* KUPLAT: Sonnetin kirjoittamat, ei kaanonia — Livian nykypäivän ääni. */
    kommentti: [
      'Lohikäärme on yhä Ljubljanan tunnus: se on linnan tornissa, vaakunassa ja sillalla, jota isoisäsi ei ehtinyt nähdä.',
      'Tänään Ljubljana on Slovenian pääkaupunki. Isoisäsi aikana se oli Krainin pääkaupunki, ja saksaksi Laibach.',
    ],
    tunne: { tunne: 'utelias', voimakkuus: 0.5 },
    kuva: {
      tiedosto: 'Franciscan Church of the Annunciation and Ljubljanica River in Ljubljana, 20240502 1809 7777.jpg',
      lyhyt: 'Ljubljanica-joki ja punainen fransiskaanikirkko nykyään.',
      selite: 'Ljubljanica-joen rantamuuri ja Ilmestyksen fransiskaanikirkko '
        + 'Ljubljanan keskustassa. Kirkko rakennettiin 1646–1660, joten '
        + 'sama punainen julkisivu seisoi jo isoisän aikaan.',
      lahde: 'Jakub Hałun, Commons (CC BY 4.0)',
    },
  },
};
