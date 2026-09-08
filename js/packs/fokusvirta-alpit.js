/*
 * ALPPIEN FOKUSVIRTA — KEVYT PAKKI (omistaja 8.9.2026).
 *
 * Sama muoto ja samat perustelut kuin js/packs/fokusvirta-kreeta.js:ssä:
 * kevyt pakki kantaa vain isoisän merkinnän ja pulun kuplan, koska pelin
 * nykyinen kulku ei lue muuta (js/fokusvirta.js FOKUSVIRTA_KORTIT ===
 * false). Kevyet pakit on nimetty rekisterissä (js/packs/fokusvirrat.js
 * KEVYET_FOKUSVIRRAT).
 *
 * Alpit oli yksi kuudesta Euroopan kohteesta, joiden merkintä luettiin
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
export const FOKUSVIRTA_ALPIT = {
  kaupunki: 'alpit',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — toinen virke on kortin tunnelmarivi. */
    paikkarivi: 'Grindelwald, heinäkuussa 1873. Kylmää keskellä kesää; '
      + 'puntari korkealla.',
    /* KAANON UUSIKSI v6 (Fable 8.9.2026 ilta: yksi kohtaus, Horation oma kieli; omistaja katsoo koosteesta). 395 merkkiä (yläraja 400). */
    teksti: 'Vaunut kiipesivät niin jyrkästi, että laukkuni liukui lattialle, '
      + 'ja kiersin hevoset kaukaa heti ulos päästyäni. Hotellin portaille '
      + 'asti ulottuu jäätikkö. Opas sanoi sen liikkuvan. Istuin sen reunalla '
      + 'kaksi tuntia ja näin vain englantilaisia ostamassa jääpaloja. Sitten '
      + 'jää paukahti kuin tykki, ja talon kokoinen lohkare irtosi kyynärän '
      + 'päästä jalastani. Hattu lähti päästä itsestään. Lakkipiste.',
    /* LUENTA = RUUTUTEKSTI SANASTA SANAAN, vain kolme tunnetagia. */
    /* ÄÄNITE VANHENTUNUT (8.9.2026): generoitava uudelleen tästä. */
    luenta: '[curious] Vaunut kiipesivät niin jyrkästi, että laukkuni liukui '
      + 'lattialle, ja kiersin hevoset kaukaa heti ulos päästyäni. Hotellin '
      + 'portaille asti ulottuu jäätikkö. Opas sanoi sen liikkuvan. Istuin '
      + 'sen reunalla kaksi tuntia ja näin vain englantilaisia ostamassa '
      + 'jääpaloja. Sitten jää paukahti kuin tykki, ja talon kokoinen lohkare '
      + 'irtosi kyynärän päästä jalastani. Hattu lähti päästä itsestään. '
      + '[softly] Lakkipiste.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-alpit.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /* Yksi kupla luennan jälkeen, ei alustusta eikä välihuutoa. */
    /* KUPLAT UUSIKSI v6 (Fable 8.9.2026 ilta; omistaja katsoo koosteesta). */
    kommentti: [
      'Lakkipiste on paikka, jossa hattu lähtee päästä itsestään. Jäätikkö on nyt kaukana portailta. Minä olin katolla.',
    ],
    /*
     * HERO on kaupunkilehden oma avauskuva (js/packs/kulttuuri-
     * kategoriat.js, alpit/kaupunki/avauskuvat): vuoristorata, joka
     * päättyy kallioon louhitun tunnelin suuhun — juuri se juna, jonka
     * merkinnän miehet lupaavat lapsilleen, ja jonka valmistumista
     * Livian kupla kuittaa. Selite ja lähde ovat lehden omat.
     */
    kuva: {
      ampari: 'herokoe/hero-alpit-keskipaiva.jpg',
      selite: 'Landwasserin viadukti rakennettiin 1901–1902 Albula-radan '
        + 'varteen Alexander Acatosin suunnitelmien mukaan: kuusi '
        + 'kalkkikivikaarta, 65 metriä korkea ja 136 metriä pitkä kaarre, '
        + 'joka päättyy suoraan kallioon louhitun tunnelin suuhun.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },
};
