/*
 * ROVANIEMEN FOKUSVIRTA — KEVYT PAKKI (omistaja 8.9.2026).
 *
 * TUNNUS ON `lappi`, NIMI ON ROVANIEMI. Laudan kohde on nimeltään
 * Rovaniemi (js/packs/europe.js, `{ id: 'lappi', name: 'Rovaniemi' }`),
 * ja tunnus on sama kaikkialla pelissä — kaupunkilehdessä
 * (js/packs/kulttuuri-kategoriat.js), tilastoissa ja tallennuksessa.
 * Tunnusta ei siis vaihdeta nimen mukaiseksi: vaihto katkaisisi jokaisen
 * viittauksen ja jättäisi vanhat tallennukset ilman kaupunkia.
 *
 * Sama muoto ja samat perustelut kuin js/packs/fokusvirta-kreeta.js:ssä:
 * kevyt pakki kantaa vain isoisän merkinnän ja pulun kuplan, koska pelin
 * nykyinen kulku ei lue muuta (js/fokusvirta.js FOKUSVIRTA_KORTIT ===
 * false). Kevyet pakit on nimetty rekisterissä (js/packs/fokusvirrat.js
 * KEVYET_FOKUSVIRRAT).
 *
 * Rovaniemi oli yksi kuudesta Euroopan kohteesta, joiden merkintä
 * luettiin yhä vanhasta saapumistaulusta (js/packs/europe-saapumiset.js,
 * arkistoitu docs/arkisto/europe-saapumiset-2026-09-08.js.txt).
 *
 * KAANON (päätoimittaja-Fable 8.9.2026): paikkarivi, teksti ja pulun
 * kupla ovat SANATARKASTI hänen kirjoittamiaan. Luenta on sama teksti
 * tunnetagein; yksikään sana ei vaihdu.
 *
 * ÄÄNITETTÄ EI VIELÄ OLE — puuttuva tiedosto on hiljainen (js/luenta.js
 * playDiaryVoice).
 */
export const FOKUSVIRTA_LAPPI = {
  kaupunki: 'lappi',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — toinen virke on kortin tunnelmarivi. */
    paikkarivi: 'Rovaniemi, syyskuussa 1873. Ensimmäinen ruska; yöllä revontulet.',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Ajoimme päivän jokea ylös, ja jossain kohtaa metsä madaltui '
      + 'tunturiksi. Kaupan ovella puhuttiin kolmea kieltä, ja kaikki '
      + 'puhuivat kullasta. Ivalojoen kultakaivannoilla yö on niin valoisa, '
      + 'ettei kukaan muista lopettaa — niin kertoi mies, joka oli tullut '
      + 'sieltä tyhjin käsin ja aikoi palata. Poroja kulki tien yli kuin tie '
      + 'ei kuuluisi kenellekään. Yöllä taivas syttyi vihreänä, eikä kukaan '
      + 'paikallinen edes katsonut ylös.',
    /* LUENTA = RUUTUTEKSTI SANASTA SANAAN, vain neljä tunnetagia. */
    luenta: '[curious] Ajoimme päivän jokea ylös, ja jossain kohtaa metsä '
      + 'madaltui tunturiksi. Kaupan ovella puhuttiin kolmea kieltä, ja '
      + 'kaikki puhuivat kullasta. [excited] Ivalojoen kultakaivannoilla yö '
      + 'on niin valoisa, ettei kukaan muista lopettaa — niin kertoi mies, '
      + 'joka oli tullut sieltä tyhjin käsin ja aikoi palata. [softly] '
      + 'Poroja kulki tien yli kuin tie ei kuuluisi kenellekään. [whispers] '
      + 'Yöllä taivas syttyi vihreänä, eikä kukaan paikallinen edes katsonut '
      + 'ylös.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-lappi.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /* Yksi kupla luennan jälkeen, ei alustusta eikä välihuutoa. */
    kommentti: [
      'Porot kulkevat yhä samoja reittejä. Revontulia tullaan nyt katsomaan kaukaa.',
    ],
    /*
     * HERO on kaupunkilehden oma avauskuva (js/packs/kulttuuri-
     * kategoriat.js, lappi/kaupunki/avauskuvat): Arktikum Ounasjoen
     * varrella — sama joki, jota merkinnässä ajetaan päivä ylöspäin.
     * Selite ja lähde ovat lehden omat.
     */
    kuva: {
      ampari: 'herokoe/hero-lappi-aamu.jpg',
      selite: 'Rovaniemen Arktikum vihittiin käyttöön 2. joulukuuta 1992, ja '
        + 'sen näkyvin osa on Ounasjokea kohti kurottava 172 metriä pitkä '
        + 'lasiputki; talossa toimivat Lapin maakuntamuseo ja Lapin '
        + 'yliopiston Arktinen keskus.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },
};
