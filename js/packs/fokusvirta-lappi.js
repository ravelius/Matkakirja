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
    /* Hyväksytty lopullinen paperikuva; toimitus 10.9.2026, SHA-256 6ea4e301acf72241adab27536312e22cd9417fa89f82e128ab880048710ec9eb. */
    luentakuva: {
      osoite: "https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-lappi-r20260909-paper-v4.jpg",
      lyhyt: "Rovaniemi, 1873. Matkatavara sidottiin tien sijasta veneeseen.",
      selite: "Veneen kuorma sidottiin matalaksi, jotta se kulkisi vakaasti joella. Rannassa odottava nainen katseli seuraavaa matkaa yläjuoksun suuntaan. Ounasjoen ja Kemijoen seudulla veden ääreen asettunut talo on samalla reitin varrella. Kuvasin veneen ennen lähtöä ja jätin talon savun mukaan. Se kertoi käytössä olevasta paikasta, mitä pelkkä pieni neliö kartassa ei osaa sanoa.",
      lahde: "Matkakirjan havainnekuva",
      lahteet: ["https://historia.rovaniemi.fi/historia/roieng24-27.pdf","https://www.finna.fi/Record/museovirasto.56B7F05404DF17550CEC4C1D3FD888DD","https://lapinkavijat.rovaniemi.fi/lapinportti/concorde.htm"],
    },
    /* KAANON (Fable) — toinen virke on kortin tunnelmarivi. */
    paikkarivi: 'Rovaniemi, syyskuussa 1873. Ensimmäinen ruska; yöllä '
      + 'revontulet; puntari korkealla.',
    /* KAANON: OMISTAJAN TEKSTI (postilaatikko 9.9.2026, EUROOPPA-MATKAKIRJA-1873-20260909). Sanasta sanaan. 334 merkkiä (yläraja 400). */
    teksti: 'Rovaniemellä Ounasjoki tuo vetensä Kemijokeen kuin matkustaja '
      + 'suurempaan veneeseen. Rannassa sidottiin kuormaa, ja kauppapuodissa '
      + 'puhuttiin yläjuoksun puista. Olin piirtänyt joet rajoiksi. Täällä ne '
      + 'olivat teitä. Veneeseen astuva nainen tiesi seuraavan talon savusta, '
      + 'ei kartasta. Lisäsin rannalle talon ja jätin savulle tilaa nousta.',
    /* LUENTA = RUUTUTEKSTI SANASTA SANAAN, vain neljä tunnetagia. */
    /* ÄÄNITE: luenta generoitu 9.9.2026 tästä tekstistä (generoi-luennat.yml ajo 17). */
    luenta: '[curious] Rovaniemellä Ounasjoki tuo vetensä Kemijokeen kuin '
      + 'matkustaja suurempaan veneeseen. Rannassa sidottiin kuormaa, ja '
      + 'kauppapuodissa puhuttiin yläjuoksun puista. Olin piirtänyt joet '
      + 'rajoiksi. Täällä ne olivat teitä. Veneeseen astuva nainen tiesi '
      + 'seuraavan talon savusta, ei kartasta. [softly] Lisäsin rannalle talon '
      + 'ja jätin savulle tilaa nousta.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-lappi.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * PULUCAM (kuvatoimitus 9.9.2026, erat euv1-era03; tilaus
     * PULU-CAM-EUROOPPA-20260909, tekstisession kuvakohtaiset promptit;
     * omistaja: "ne voi hyvaksya sellaisenaan suoraan peliin").
     * Kuvatekstit sanasta sanaan: lyhyt kuvan alle, pitka karuselliin.
     * Lahteet on tausta-aineisto (ei nay pelaajalle). Tiedostot: pulu-cam-lappi-01-r20260909-euv1-v2.jpg.
     */
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/matkakirja/pulu-cam/pulu-cam-lappi-01-r20260909-euv1-v2.jpg',
        lyhyt: 'Rovaniemi: jokien risteyksessä ei ole liikennevaloja.',
        selite: 'Ounasjoki liittyy Kemijokeen aivan Rovaniemen äärellä. Rannoilta '
          + 'nähtynä veden leveys on maisema; ilmasta sen suunnat alkavat '
          + 'muistuttaa reittejä. Lensin hetken veneen kulkusuunnan mukana ja '
          + 'kuvasin, missä virrat liittyvät. Isoisä piirsi joet ensin '
          + 'rajoiksi. Minä pidän hänen korjauksestaan. Kaupunkiin voi tulla '
          + 'lentäen ja huomata silti, että vesi ehti yhdistää paikat paljon '
          + 'aikaisemmin.',
        lahde: 'Matkakirjan havainnekuva',
        lahteet: [
          'https://www.visitrovaniemi.fi/professionals/media/rovaniemi-facts/',
          'https://www.visitrovaniemi.fi/summer-by-the-river-in-rovaniemi/',
        ],
      },
    ],
    /* Yksi kupla luennan jälkeen, ei alustusta eikä välihuutoa. */
    /* KUPLA: OMISTAJAN TEKSTI (postilaatikko 9.9.2026). Sanasta sanaan. */
    kommentti: [
      'Rovaniemelle lennetään nyt joulupukin vuoksi. Joet kohtaavat yhä. Minusta niissäkin olisi matkan aihetta.',
    ],
    /*
     * HERO on kaupunkilehden oma avauskuva (js/packs/kulttuuri-
     * kategoriat.js, lappi/kaupunki/avauskuvat): Arktikum Ounasjoen
     * varrella — sama joki, jota merkinnässä ajetaan päivä ylöspäin.
     * Selite ja lähde ovat lehden omat.
     */
    kuva: {
      ampari: 'herokoe/hero-lappi-aamu.jpg',
      lyhyt: 'Rovaniemen Arktikum avattiin 1992; sen 172 metrin lasiputki kurottaa Ounasjokea kohti.',
      selite: 'Rovaniemen Arktikum vihittiin käyttöön 2. joulukuuta 1992, ja '
        + 'sen näkyvin osa on Ounasjokea kohti kurottava 172 metriä pitkä '
        + 'lasiputki; talossa toimivat Lapin maakuntamuseo ja Lapin '
        + 'yliopiston Arktinen keskus.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },
};
