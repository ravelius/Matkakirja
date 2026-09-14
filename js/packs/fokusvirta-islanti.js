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
    /* Hyväksytty lopullinen paperikuva; toimitus 10.9.2026, SHA-256 96ad99971a4ad7f243d4a725cc550c17e3ad315ae6c0f2bea1b2425177a69b20. */
    luentakuva: {
      osoite: "https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-islanti-r20260909-paper-v4.jpg",
      lyhyt: "Reykjavik, 1873. Pyykkipäivä sai lämmön maasta.",
      selite: 'Naiset pesivät pyykkiä kuumassa lähteessä samalla kun höyry peitti hetkittäin avointa maisemaa. Minulle maan lämmittämä vesi oli ihme, heille työ joka piti saada valmiiksi.',
      lahde: "Matkakirjan havainnekuva",
      lahteet: ["https://borgarsogusafn.is/en/exhibitions/the-washerwomen-s-walk-a-stroll-into-history"],
    },
    luentakuva2: {
      osoite: "https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-islanti-r20260911-paper2-v1.jpg",
      lyhyt: "Reykjavik, 1873. Paita palasi puhtaana, saari jäi suureksi kysymykseksi.",
      selite: 'Kuljin kuumilta lähteiltä puhdas paita kädessä kohti Reykjavikin pieniä taloja. Kaulus oli selkeämpi kuin käsitykseni puuttomasta ja avarasta saaresta.',
      lahde: "Matkakirjan havainnekuva",
      lahteet: ["https://borgarsogusafn.is/en/exhibitions/the-washerwomen-s-walk-a-stroll-into-history"],
    },
    /* KAANON (Fable) — toinen virke on kortin tunnelmarivi. */
    paikkarivi: 'Reykjavik, elokuussa 1873. Tuulista; ei yhtään puuta; '
      + 'puntari matalalla.',
    /* KAANON: OMISTAJAN TEKSTI (postilaatikko 9.9.2026, EUROOPPA-MATKAKIRJA-1873-20260909). Sanasta sanaan. 357 merkkiä (yläraja 400). */
    teksti: "Lähdin Islannissa hainpyyntiin soutuveneellä. Hain maksasta saatiin öljyä Euroopan katulamppuihin. Kun saalis vedettiin laidan viereen, vene tuntui äkkiä kovin pieneltä. Kalastaja kohotti harppuunan. Minä painoin airot veteen ja pidin keulan aaltoja vasten.",
    /* LUENTA = RUUTUTEKSTI SANASTA SANAAN, vain kolme tunnetagia. */
    /*
     * TEKSTIN SISÄISET REAKTIOT (omistaja 11.9.2026, Raamattu PULU REAGOI
     * TEKSTIN SISALLA; docs/pulu-reaktiot.md "Luentareaktiot"; Marseillen
     * pilotin laajennus). Ankkuri on katkelma luentatekstistä sanasta
     * sanaan ja osuu tekstiin tasan kerran; hetki lasketaan äänitteen
     * sanakohtaisista aikaleimoista (forced alignment), ei merkkimäärästä.
     * Tarkoitus: myotailee | epailee | torjuu | huvittuu | hammastyy |
     * vakavoituu. siirtyma = ms ankkurin viimeisen sanan lopusta; 0, koska
     * reaktio kuuluu juuri ankkurinsa kohtaan eikä viimeiselle sanalle saa
     * antaa positiivista siirtymää (luonnollinen loppu hoitaa sen).
     * Hiljaiset osuudet: "Höyry nousi maasta, ja tuuli yritti viedä sen
     * merelle" (maisemahavainto).
     */
    reaktiot: [
  {
    "id": "islanti.r1",
    "ankkuri": "hainpyyntiin soutuveneellä",
    "tarkoitus": "epailee",
    "voimakkuus": 0.35,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "islanti.r2",
    "ankkuri": "öljyä Euroopan katulamppuihin",
    "tarkoitus": "hammastyy",
    "voimakkuus": 0.35,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "islanti.r3",
    "ankkuri": "vene tuntui äkkiä kovin pieneltä",
    "tarkoitus": "vakavoituu",
    "voimakkuus": 0.5,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "islanti.r4",
    "ankkuri": "Kalastaja kohotti harppuunan",
    "tarkoitus": "vakavoituu",
    "voimakkuus": 0.55,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "islanti.r5",
    "ankkuri": "pidin keulan aaltoja vasten",
    "tarkoitus": "myotailee",
    "voimakkuus": 0.45,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  }
],
    /* ÄÄNITE: luenta generoitu 9.9.2026 tästä tekstistä (generoi-luennat.yml ajo 17). */
    luenta: "[curious] Lähdin Islannissa hainpyyntiin soutuveneellä. Hain maksasta saatiin öljyä Euroopan katulamppuihin. Kun saalis vedettiin laidan viereen, vene tuntui äkkiä kovin pieneltä. Kalastaja kohotti harppuunan. [softly] Minä painoin airot veteen ja pidin keulan aaltoja vasten.",
    aanite: 'assets/audio/puhe-fokus-matkakirja-islanti.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * PULUCAM (kuvatoimitus 9.9.2026, erat euv1-era04; tilaus
     * PULU-CAM-EUROOPPA-20260909, tekstisession kuvakohtaiset promptit;
     * omistaja: "ne voi hyvaksya sellaisenaan suoraan peliin").
     * Kuvatekstit sanasta sanaan: lyhyt kuvan alle, pitka karuselliin.
     * Lahteet on tausta-aineisto (ei nay pelaajalle). Tiedostot: pulu-cam-islanti-01-r20260909-euv1-v1.jpg.
     */
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/matkakirja/pulu-cam/pulu-cam-islanti-01-r20260909-euv1-v1.jpg',
        lyhyt: 'Reykjavik: lämmin vesi on saanut ympärilleen kokonaisen arjen.',
        selite: 'Laugardalurissa pyykkiä pestiin ennen kuumissa lähteissä; nyt samassa laaksossa uidaan geotermisesti lämmitetyssä altaassa. Isoisän paidasta alkanut tarina on kasvanut kokonaiseksi arjeksi, jossa ihmiset istuvat ulkona säästä huolimatta.',
        lahde: 'Matkakirjan havainnekuva',
        lahteet: [
          'https://visitreykjavik.is/laugardalur-valley',
          'https://www.icelandtravel.is/attractions/laugardalur-2-2/',
        ],
      },
    ],
    /* Yksi kupla luennan jälkeen, ei alustusta eikä välihuutoa. */
    /* KUPLA: OMISTAJAN TEKSTI (postilaatikko 9.9.2026). Sanasta sanaan. */
    kommentti: ["Reykjavíkin vanhassa keskustassa pienet puutalot on verhottu värikkäällä pellillä. Vanhan sataman varastoissa on nyt kahviloita. Minä löysin suojaisan terassin. Tuuli löysi minut."],
    /* Pulun reaktiotagi (docs/pulu-reaktiot.md), ei näy tekstissä. */
    tunne: { tunne: 'lammin', voimakkuus: 0.5 },
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
