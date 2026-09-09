/*
 * ISLANNIN FOKUSVIRTA — KEVYT PAKKI (omistaja 8.9.2026).
 *
 * Sama muoto ja samat perustelut kuin js/packs/fokusvirta-kreeta.js:ssä:
 * kevyt pakki kantaa vain isoisän merkinnän ja pulun kuplan, koska pelin
 * nykyinen kulku ei lue muuta (js/fokusvirta.js FOKUSVIRTA_KORTIT ===
 * false). Kevyet pakit on nimetty rekisterissä (js/packs/fokusvirrat.js
 * KEVYET_FOKUSVIRRAT).
 *
 * Islanti oli yksi kuudesta Euroopan kohteesta, joiden merkintä luettiin
 * yhä vanhasta saapumistaulusta (js/packs/europe-saapumiset.js,
 * arkistoitu docs/arkisto/europe-saapumiset-2026-09-08.js.txt).
 *
 * KAANON (päätoimittaja-Fable 8.9.2026): paikkarivi, teksti ja pulun
 * kupla ovat SANATARKASTI hänen kirjoittamiaan. Luenta on sama teksti
 * tunnetagein; yksikään sana ei vaihdu.
 *
 * ÄÄNITETTÄ EI VIELÄ OLE — puuttuva tiedosto on hiljainen (js/luenta.js
 * playDiaryVoice).
 */
export const FOKUSVIRTA_ISLANTI = {
  kaupunki: 'islanti',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — toinen virke on kortin tunnelmarivi. */
    paikkarivi: 'Reykjavik, elokuussa 1873. Tuulista; ei yhtään puuta; '
      + 'puntari matalalla.',
    /* KAANON: OMISTAJAN TEKSTI (postilaatikko 9.9.2026, EUROOPPA-MATKAKIRJA-1873-20260909). Sanasta sanaan. 357 merkkiä (yläraja 400). */
    teksti: 'Reykjavikin ulkopuolella naiset pesivät pyykkiä kuumassa '
      + 'lähteessä. Höyry nousi maasta, ja tuuli yritti viedä sen merelle. '
      + 'Annoin pestäväksi paitani. Se oli ensimmäinen kerta, kun maa teki '
      + 'minulle palveluksen vaatimatta lapioimista. Paluumatkalla näin pienet '
      + 'talot ja niiden takana suuren tyhjyyden. Kaulukseni oli puhtaampi '
      + 'kuin käsitykseni tästä saaresta.',
    /* LUENTA = RUUTUTEKSTI SANASTA SANAAN, vain kolme tunnetagia. */
    /* ÄÄNITE: luenta generoitu 9.9.2026 tästä tekstistä (generoi-luennat.yml ajo 17). */
    luenta: '[curious] Reykjavikin ulkopuolella naiset pesivät pyykkiä '
      + 'kuumassa lähteessä. Höyry nousi maasta, ja tuuli yritti viedä sen '
      + 'merelle. Annoin pestäväksi paitani. Se oli ensimmäinen kerta, kun maa '
      + 'teki minulle palveluksen vaatimatta lapioimista. Paluumatkalla näin '
      + 'pienet talot ja niiden takana suuren tyhjyyden. [softly] Kaulukseni '
      + 'oli puhtaampi kuin käsitykseni tästä saaresta.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-islanti.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /* Yksi kupla luennan jälkeen, ei alustusta eikä välihuutoa. */
    /* KUPLA: OMISTAJAN TEKSTI (postilaatikko 9.9.2026). Sanasta sanaan. */
    kommentti: [
      'Reykjavikin talotkin lämpiävät nyt maan lämmöllä. Paita oli lupaava alku. Minä arvostan lämmintä räystästä.',
    ],
    /*
     * HERO on kaupunkilehden oma avauskuva (js/packs/kulttuuri-
     * kategoriat.js, islanti/kaupunki/avauskuvat): Thingvellirin laakso,
     * juuri se rotko, jonne merkinnän kirjoittaja ratsasti päivän.
     * Selite ja lähde ovat lehden omat.
     */
    kuva: {
      ampari: 'herokoe/hero-islanti-keskipaiva.jpg',
      lyhyt: 'Þingvellirissä kokoontui alþingi 930–1798; laakso on mannerlaattojen railo, suurin Almannagjá.',
      selite: 'Þingvellirin laaksossa kokoontui Islannin alþingi vuodesta '
        + '930 vuoteen 1798, ja laakso on Pohjois-Amerikan ja Euraasian '
        + 'mannerlaattojen railo — sen suurin repeämä Almannagjá on '
        + 'kokonainen kanjoni.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },
};
