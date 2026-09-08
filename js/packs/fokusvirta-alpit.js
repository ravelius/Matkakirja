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
      + 'ilmanpuntari korkealla.',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Vaunut kiipesivät laaksoa ylös niin jyrkästi, että laukkuni '
      + 'liukui lattialle, ja vastarinteeltä alppitorven ääni ylitti koko '
      + 'laakson. Hotellin portaille asti ulottuu jäätikkö, jonka reunalta '
      + 'lapset myyvät jääpaloja englantilaisille. Opas sanoo sen liikkuvan; '
      + 'en nähnyt. Toisella puolen vuoria porataan tunnelia suoraan vuoren '
      + 'läpi, ja miehet sanovat, että juna kulkee siitä ennen kuin heidän '
      + 'lapsensa ovat aikuisia.',
    /* LUENTA = RUUTUTEKSTI SANASTA SANAAN, vain kolme tunnetagia. */
    luenta: '[curious] Vaunut kiipesivät laaksoa ylös niin jyrkästi, että '
      + 'laukkuni liukui lattialle, ja vastarinteeltä alppitorven ääni '
      + 'ylitti koko laakson. [warmly] Hotellin portaille asti ulottuu '
      + 'jäätikkö, jonka reunalta lapset myyvät jääpaloja englantilaisille. '
      + 'Opas sanoo sen liikkuvan; en nähnyt. [softly] Toisella puolen '
      + 'vuoria porataan tunnelia suoraan vuoren läpi, ja miehet sanovat, '
      + 'että juna kulkee siitä ennen kuin heidän lapsensa ovat aikuisia.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-alpit.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /* Yksi kupla luennan jälkeen, ei alustusta eikä välihuutoa. */
    kommentti: [
      'Jäätikkö on vetäytynyt kauas portailta. Tunneli valmistui, ja sen alla on nyt vielä pidempi.',
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
