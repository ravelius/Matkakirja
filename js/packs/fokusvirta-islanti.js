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
    /* KAANON UUSIKSI v6 (Fable 8.9.2026 ilta: yksi kohtaus, Horation oma kieli; omistaja katsoo koosteesta). 392 merkkiä (yläraja 400). */
    teksti: 'Maasta nousee höyryä, vaikka mikään ei pala. Ratsastin päivän '
      + 'Thingvellirin rotkoon, jossa kansa on kokoontunut käräjille ennen '
      + 'kuin Euroopassa oli kuninkaita. Mittasin kuuman lähteen, ja '
      + 'lämpömittari halkesi kädessäni. Opas nauroi: edellinen '
      + 'englantilainen keitti siinä munan ja hattunsa. Kartassani saaren '
      + 'keskellä on tyhjää. Kartta ei valehtele, se vaikenee. Painolasti: '
      + 'haljennut mittari.',
    /* LUENTA = RUUTUTEKSTI SANASTA SANAAN, vain kolme tunnetagia. */
    /* ÄÄNITE VANHENTUNUT (8.9.2026): generoitava uudelleen tästä. */
    luenta: '[curious] Maasta nousee höyryä, vaikka mikään ei pala. Ratsastin '
      + 'päivän Thingvellirin rotkoon, jossa kansa on kokoontunut käräjille '
      + 'ennen kuin Euroopassa oli kuninkaita. Mittasin kuuman lähteen, ja '
      + 'lämpömittari halkesi kädessäni. Opas nauroi: edellinen '
      + 'englantilainen keitti siinä munan ja hattunsa. Kartassani saaren '
      + 'keskellä on tyhjää. Kartta ei valehtele, se vaikenee. [softly] '
      + 'Painolasti: haljennut mittari.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-islanti.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /* Yksi kupla luennan jälkeen, ei alustusta eikä välihuutoa. */
    /* KUPLAT UUSIKSI v6 (Fable 8.9.2026 ilta; omistaja katsoo koosteesta). */
    kommentti: [
      'Kartta vaikenee, ja se on kartanpiirtäjälle pahempi kuin valhe. Kaupunki kasvoi, puita istutettiin. Puu on yhä harvinaisuus.',
    ],
    /*
     * HERO on kaupunkilehden oma avauskuva (js/packs/kulttuuri-
     * kategoriat.js, islanti/kaupunki/avauskuvat): Thingvellirin laakso,
     * juuri se rotko, jonne merkinnän kirjoittaja ratsasti päivän.
     * Selite ja lähde ovat lehden omat.
     */
    kuva: {
      ampari: 'herokoe/hero-islanti-keskipaiva.jpg',
      selite: 'Þingvellirin laaksossa kokoontui Islannin alþingi vuodesta '
        + '930 vuoteen 1798, ja laakso on Pohjois-Amerikan ja Euraasian '
        + 'mannerlaattojen railo — sen suurin repeämä Almannagjá on '
        + 'kokonainen kanjoni.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },
};
