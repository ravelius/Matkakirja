/*
 * TROMSSAN FOKUSVIRTA — KEVYT PAKKI (omistaja 8.9.2026).
 *
 * Sama muoto ja samat perustelut kuin js/packs/fokusvirta-kreeta.js:ssä:
 * kevyt pakki kantaa vain isoisän merkinnän ja pulun kuplan, koska pelin
 * nykyinen kulku ei lue muuta (js/fokusvirta.js FOKUSVIRTA_KORTIT ===
 * false). Kevyet pakit on nimetty rekisterissä (js/packs/fokusvirrat.js
 * KEVYET_FOKUSVIRRAT).
 *
 * Tromssa oli yksi kuudesta Euroopan kohteesta, joiden merkintä luettiin
 * yhä vanhasta saapumistaulusta (js/packs/europe-saapumiset.js,
 * arkistoitu docs/arkisto/europe-saapumiset-2026-09-08.js.txt). Tämän
 * paketin myötä Euroopan lauta kulkee kokonaan fokusvirtapakkien kautta.
 *
 * KAANON (päätoimittaja-Fable 8.9.2026): paikkarivi, teksti ja pulun
 * kupla ovat SANATARKASTI hänen kirjoittamiaan. Luenta on sama teksti
 * tunnetagein; yksikään sana ei vaihdu.
 *
 * ÄÄNITETTÄ EI VIELÄ OLE — puuttuva tiedosto on hiljainen (js/luenta.js
 * playDiaryVoice).
 */
export const FOKUSVIRTA_TROMSSA = {
  kaupunki: 'tromssa',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — toinen virke on kortin tunnelmarivi. */
    paikkarivi: 'Tromssa, heinäkuussa 1873. Aurinko ei laske; satamassa '
      + 'hylkeenpyytäjiä; puntari korkealla.',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    /* KAANON: OMISTAJAN TEKSTI (postilaatikko 9.9.2026, EUROOPPA-MATKAKIRJA-1873-20260909). Sanasta sanaan. 364 merkkiä (yläraja 400). */
    teksti: 'Tromssaan on perustettu museo. Satamasta tuodaan sinne pohjoisen '
      + 'luita ja kiviä, asioita joista laivanvarustaja ei tavallisesti maksa. '
      + 'Pöydällä makasi pieni simpukka ja sen vieressä luu, jonka eläimeen en '
      + 'toivo törmääväni uimassa. Ikkunasta näkyi pyyntilaivojen mastoja. '
      + 'Sama meri ruokkii täällä sekä vatsan että uteliaisuuden. Jälkimmäinen '
      + 'vaikutti pohjattomalta.',
    /* LUENTA = RUUTUTEKSTI SANASTA SANAAN, vain kolme tunnetagia. */
    /* ÄÄNITE: luenta generoitu 9.9.2026 tästä tekstistä (generoi-luennat.yml ajo 17). */
    luenta: '[curious] Tromssaan on perustettu museo. Satamasta tuodaan sinne '
      + 'pohjoisen luita ja kiviä, asioita joista laivanvarustaja ei '
      + 'tavallisesti maksa. Pöydällä makasi pieni simpukka ja sen vieressä '
      + 'luu, jonka eläimeen en toivo törmääväni uimassa. Ikkunasta näkyi '
      + 'pyyntilaivojen mastoja. Sama meri ruokkii täällä sekä vatsan että '
      + 'uteliaisuuden. [softly] Jälkimmäinen vaikutti pohjattomalta.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-tromssa.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /* Yksi kupla luennan jälkeen, ei alustusta eikä välihuutoa. */
    /* KUPLA: OMISTAJAN TEKSTI (postilaatikko 9.9.2026). Sanasta sanaan. */
    kommentti: [
      'Tromssassa on nyt yliopistokin. Isoisä osui oikeaan: pienestä simpukasta voi alkaa pitkä matka.',
    ],
    /*
     * HERO on kaupunkilehden oma avauskuva (js/packs/kulttuuri-
     * kategoriat.js, tromssa/kaupunki/avauskuvat): napamuseo 1840-luvun
     * tullimakasiineissa — samat makasiinit satamassa, jossa merkinnän
     * hylkeenpyytäjät purkavat lastiaan. Selite ja lähde ovat lehden
     * omat.
     */
    kuva: {
      ampari: 'herokoe/hero-tromssa-ilta.jpg',
      selite: 'Polarmuseet avattiin 18. kesäkuuta 1978 tasan viisikymmentä '
        + 'vuotta Roald Amundsenin viimeisen lennon jälkeen, ja se toimii '
        + '1840-luvun tullimakasiineissa Skansenin lähellä.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },
};
