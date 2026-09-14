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
    /* Hyväksytty lopullinen paperikuva; toimitus 10.9.2026, SHA-256 77cf29773de1ea5a2cd13a4b2272546cab541b5bafe82eaa1291bf10a34a8027. */
    luentakuva: {
      osoite: "https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-alpit-r20260909-paper-v4.jpg",
      lyhyt: "Grindelwald, 1873. Jään hiljaisuudessa oli halkeamia.",
      selite: 'Opas pysyi sivummalla, kun katsoin jään halkeamia ja kivistä reunaa. Rasahdus ei tarttunut vedokseen, joten kuva jäi paikkaa hiljaisemmaksi.',
      lahde: "Matkakirjan havainnekuva",
      lahteet: ["https://www.swissinfo.ch/eng/archive-science/scientists-paint-a-glacial-picture/33663410","https://www.swissinfo.ch/eng/archive-science/marking-glacial-change-on-grindelwald-s-trail/2185012"],
    },
    luentakuva2: {
      osoite: "https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-alpit-r20260911-paper2-v1.jpg",
      lyhyt: "Grindelwald, 1873. Rasahdus siirsi sekä kiven että miehen kauemmas.",
      selite: 'Nostin kiven mukaani aivan jäätikön halkeaman vierestä. Pitkä rasahdus sai minut astumaan nopeasti kauemmas.',
      lahde: "Matkakirjan havainnekuva",
      lahteet: ["https://www.swissinfo.ch/eng/archive-science/scientists-paint-a-glacial-picture/33663410","https://www.swissinfo.ch/eng/archive-science/marking-glacial-change-on-grindelwald-s-trail/2185012"],
    },
    /* KAANON (Fable) — toinen virke on kortin tunnelmarivi. */
    paikkarivi: "Grindelwald, heinäkuussa 1873. Kylmää keskellä kesää; puntari korkealla.",
    /* KAANON: OMISTAJAN TEKSTI (postilaatikko 9.9.2026, EUROOPPA-MATKAKIRJA-1873-20260909). Sanasta sanaan. 336 merkkiä (yläraja 400). */
    teksti: "Grindelwaldin jäätiköltä halusin kiven aivan railon reunasta. Opas kielsi oikaisemasta, mutta minulla oli tarkka kartta. Lumi petti saappaan alta. Köysi löi ilmat keuhkoistani, ja jäin riippumaan sinisen jään väliin. Opas veti minut ylös, ja köysi viilsi hänen kämmenensä rikki. Minä pitelin yhä kiveä.",
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
     * Hiljaiset osuudet: ei erikseen hiljaisia osuuksia (jokainen virke
     * saa reaktion).
     */
    reaktiot: [
  {
    "id": "alpit.r1",
    "ankkuri": "halusin kiven aivan railon reunasta",
    "tarkoitus": "epailee",
    "voimakkuus": 0.35,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "alpit.r2",
    "ankkuri": "minulla oli tarkka kartta",
    "tarkoitus": "epailee",
    "voimakkuus": 0.4,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "alpit.r3",
    "ankkuri": "Lumi petti saappaan alta",
    "tarkoitus": "vakavoituu",
    "voimakkuus": 0.55,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "alpit.r4",
    "ankkuri": "jäin riippumaan sinisen jään väliin",
    "tarkoitus": "vakavoituu",
    "voimakkuus": 0.6,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "alpit.r5",
    "ankkuri": "köysi viilsi hänen kämmenensä rikki",
    "tarkoitus": "vakavoituu",
    "voimakkuus": 0.55,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "alpit.r6",
    "ankkuri": "Minä pitelin yhä kiveä",
    "tarkoitus": "epailee",
    "voimakkuus": 0.45,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  }
],
    /* ÄÄNITE: luenta generoitu 9.9.2026 tästä tekstistä (generoi-luennat.yml ajo 17). */
    luenta: "[curious] Grindelwaldin jäätiköltä halusin kiven aivan railon reunasta. Opas kielsi oikaisemasta, mutta minulla oli tarkka kartta. Lumi petti saappaan alta. Köysi löi ilmat keuhkoistani, ja jäin riippumaan sinisen jään väliin. Opas veti minut ylös, ja köysi viilsi hänen kämmenensä rikki. [thoughtfully] Minä pitelin yhä kiveä.",
    aanite: 'assets/audio/puhe-fokus-matkakirja-alpit.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * PULUCAM (kuvatoimitus 9.9.2026, erat euv1-era02; tilaus
     * PULU-CAM-EUROOPPA-20260909, tekstisession kuvakohtaiset promptit;
     * omistaja: "ne voi hyvaksya sellaisenaan suoraan peliin").
     * Kuvatekstit sanasta sanaan: lyhyt kuvan alle, pitka karuselliin.
     * Lahteet on tausta-aineisto (ei nay pelaajalle). Tiedostot: pulu-cam-alpit-01-r20260909-euv1-v1.jpg.
     */
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/matkakirja/pulu-cam/pulu-cam-alpit-01-r20260909-euv1-v1.jpg',
        lyhyt: 'Grindelwald: kuvasin paikan, josta jää on lähtenyt.',
        selite: 'Grindelwaldin jäätikkörotkossa reitti kulkee kallion ja kuohuvan veden vierellä, mutta isoisän kuvaamaa jääseinää ei enää näy. Etsin hänen kiveään ja jouduin myöntämään, että kiviä oli liikaa ja jäätä liian vähän.',
        lahde: 'Matkakirjan havainnekuva',
        lahteet: [
          'https://grindelwald.swiss/en/map/detail/grindelwald-glacier-gorge-aaa98968-c9e4-4a2a-b871-8c25abefc234.html',
          'https://www.outdoor.ch/en/outdoor-experience/glacier-canyon-grindelwald',
        ],
      },
    ],
    /* Yksi kupla luennan jälkeen, ei alustusta eikä välihuutoa. */
    /* KUPLA: OMISTAJAN TEKSTI (postilaatikko 9.9.2026). Sanasta sanaan. */
    kommentti: ["Sveitsin Alpeilla lehmät palaavat syksyllä vuoristolaitumilta kukkaseppeleissä ja kellot kaulassa. Minä lensin juhlakulkueen mukana. Yksi lehmä söi edellä kulkevan seppelettä."],
    /* Pulun reaktiotagi (docs/pulu-reaktiot.md), ei näy tekstissä. */
    tunne: { tunne: 'vakava', voimakkuus: 0.55 },
    /*
     * HERO on kaupunkilehden oma avauskuva (js/packs/kulttuuri-
     * kategoriat.js, alpit/kaupunki/avauskuvat): vuoristorata, joka
     * päättyy kallioon louhitun tunnelin suuhun — juuri se juna, jonka
     * merkinnän miehet lupaavat lapsilleen, ja jonka valmistumista
     * Livian kupla kuittaa. Selite ja lähde ovat lehden omat.
     */
    kuva: {
      ampari: 'herokoe/hero-alpit-keskipaiva.jpg',
      lyhyt: 'Landwasserin viadukti 1901–1902 Albula-radalla: kuusi kalkkikivikaarta ja kallioon päättyvä tunneli.',
      selite: 'Landwasserin viadukti rakennettiin 1901–1902 Albula-radan '
        + 'varteen Alexander Acatosin suunnitelmien mukaan: kuusi '
        + 'kalkkikivikaarta, 65 metriä korkea ja 136 metriä pitkä kaarre, '
        + 'joka päättyy suoraan kallioon louhitun tunnelin suuhun.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },
};
