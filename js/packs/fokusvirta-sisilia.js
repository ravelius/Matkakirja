/*
 * SISILIAN FOKUSVIRTA — KEVYT PAKKI (omistaja 8.9.2026).
 *
 * Sama muoto ja samat perustelut kuin js/packs/fokusvirta-kreeta.js:ssä:
 * kevyt pakki kantaa vain isoisän merkinnän ja pulun kuplan, koska pelin
 * nykyinen kulku ei lue muuta (js/fokusvirta.js FOKUSVIRTA_KORTIT ===
 * false). Kevyet pakit on nimetty rekisterissä (js/packs/fokusvirrat.js
 * KEVYET_FOKUSVIRRAT).
 *
 * Sisilia oli yksi kuudesta Euroopan kohteesta, joiden merkintä luettiin
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
export const FOKUSVIRTA_SISILIA = {
  kaupunki: 'sisilia',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* Hyväksytty lopullinen paperikuva; toimitus 10.9.2026, SHA-256 006defd93653adc6dc991baa5532c7ab1725b216e0e59130914ba67314ac0d0f. */
    luentakuva: {
      osoite: "https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-sisilia-r20260909-paper-v4.jpg",
      lyhyt: "Palermo, 1873. Katon tekijät puhuivat monella kädellä.",
      selite: 'Palatinuskappelin veistetty puukatto kohoaa mosaiikkien ylle kuin kokonainen tumma luolasto. Kamerani joutui tekemään ilman väriä, mikä oli tässä huoneessa selvä puute.',
      lahde: "Matkakirjan havainnekuva",
      lahteet: ["https://www.federicosecondo.org/cappella-palatina/"],
    },
    luentakuva2: {
      osoite: "https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-sisilia-r20260911-paper2-v1.jpg",
      lyhyt: "Palermo, 1873. Niska väsyi ennen kuin kysymykset loppuivat.",
      selite: 'Istuin hetkeksi, sillä mosaiikkien, pylväiden ja veistetyn katon katsominen tuntui jo niskassa. Kuninkaan nimi tunnettiin; tekijöiden nimiä olisin kuunnellut kauemmin.',
      lahde: "Matkakirjan havainnekuva",
      lahteet: ["https://www.federicosecondo.org/la-cappella-palatina/","https://www.federicosecondo.org/wp-content/uploads/2025/02/palatina_eng.pdf"],
    },
    /* KAANON (Fable) — toinen virke on kortin tunnelmarivi. */
    paikkarivi: 'Palermo, toukokuussa 1873. Kuumaa; Etna savuaa horisontissa; '
      + 'puntari korkealla.',
    /* KAANON: OMISTAJAN TEKSTI (postilaatikko 9.9.2026, EUROOPPA-MATKAKIRJA-1873-20260909). Sanasta sanaan. 346 merkkiä (yläraja 400). */
    teksti: 'Palermon palatsikappeli hohti kultaa, ja puukatto kaartui veistetyksi luolastoksi. Normannikuningas teetti sen; mosaiikit ja puuveistokset syntyivät monen maailman käsissä. Katselin ylös, kunnes niska väsyi. Kuninkaan nimi tunnettiin. Tekijöiden nimiä olisin kuunnellut kauemmin.',
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
     * Hiljaiset osuudet: "Normannien kuningas teetti sen, mutta kädet
     * tulivat monesta maailmasta..." (selittävä luettelo).
     */
    reaktiot: [
      { id: 'sisilia.r1', ankkuri: 'veistetyksi luolastoksi', tarkoitus: 'hammastyy', voimakkuus: 0.45, siirtyma: 0,
        perustelu: 'Toimituksellisen Eurooppa-revision hyväksytty reaktio.' },
      { id: 'sisilia.r2', ankkuri: 'kunnes niska väsyi', tarkoitus: 'huvittuu', voimakkuus: 0.45, siirtyma: 0,
        perustelu: 'Toimituksellisen Eurooppa-revision hyväksytty reaktio.' },
      { id: 'sisilia.r3', ankkuri: 'Kuninkaan nimi tunnettiin', tarkoitus: 'epailee', voimakkuus: 0.45, siirtyma: 0,
        perustelu: 'Toimituksellisen Eurooppa-revision hyväksytty reaktio.' },
      { id: 'sisilia.r4', ankkuri: 'olisin kuunnellut kauemmin', tarkoitus: 'vakavoituu', voimakkuus: 0.55, siirtyma: 0,
        perustelu: 'Toimituksellisen Eurooppa-revision hyväksytty reaktio.' },
    ],
    /* ÄÄNITE: luenta generoitu 9.9.2026 tästä tekstistä (generoi-luennat.yml ajo 17). */
    luenta: '[curious] Palermon palatsikappeli hohti kultaa, ja puukatto kaartui veistetyksi luolastoksi. Normannikuningas teetti sen; mosaiikit ja puuveistokset syntyivät monen maailman käsissä. Katselin ylös, kunnes niska väsyi. Kuninkaan nimi tunnettiin. [softly] Tekijöiden nimiä olisin kuunnellut kauemmin.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-sisilia.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * PULUCAM (kuvatoimitus 9.9.2026, erat euv1-era04; tilaus
     * PULU-CAM-EUROOPPA-20260909, tekstisession kuvakohtaiset promptit;
     * omistaja: "ne voi hyvaksya sellaisenaan suoraan peliin").
     * Kuvatekstit sanasta sanaan: lyhyt kuvan alle, pitka karuselliin.
     * Lahteet on tausta-aineisto (ei nay pelaajalle). Tiedostot: pulu-cam-sisilia-01-r20260909-euv1-v1.jpg.
     */
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/matkakirja/pulu-cam/pulu-cam-sisilia-01-r20260909-euv1-v1.jpg',
        lyhyt: 'Palermo: tämän katon näin kuvasta, siipeni jäivät ulkopuolelle.',
        selite: 'Palatinuskappelin sisäkuvassa tumma puukatto ja kultaiset mosaiikit kokoavat monta käsityöperinnettä samaan huoneeseen. Minä kiersin ulkona pihan yllä ja tutkin katon myöhemmin tästä kuvasta; sisälle en lentänyt.',
        lahde: 'Matkakirjan havainnekuva',
        lahteet: [
          'https://www.federicosecondo.org/la-cappella-palatina/',
          'https://www.federicosecondo.org/cenni-storici/',
        ],
      },
    ],
    /* Yksi kupla luennan jälkeen, ei alustusta eikä välihuutoa. */
    /* KUPLA: OMISTAJAN TEKSTI (postilaatikko 9.9.2026). Sanasta sanaan. */
    kommentti: [
      'Kappeli hohtaa palatsissa, jossa kokoontuu Sisilian parlamentti. Kiersin pihan yllä, nokka kohti ikkunoita. Katon näin kuvassa, sillä sisälle en lentänyt.',
    ],
    /* Pulun reaktiotagi (docs/pulu-reaktiot.md), ei näy tekstissä. */
    tunne: { tunne: 'ylpea', voimakkuus: 0.45 },
    /*
     * HERO on kaupunkilehden oma avauskuva (js/packs/kulttuuri-
     * kategoriat.js, sisilia/kaupunki/avauskuvat): Monrealen katedraali,
     * jonka rakensivat normannit, arabit ja bysanttilaiset yhdessä —
     * juuri se merkinnän "kaikkien maa eikä kenenkään". Selite ja lähde
     * ovat lehden omat.
     */
    kuva: {
      ampari: 'herokoe/hero-sisilia-ilta.jpg',
      lyhyt: 'Monrealen katedraali rakennettiin 1170-luvulla normannien, arabien ja bysanttilaisten käsityönä.',
      selite: 'Monrealen katedraali rakennettiin 1170-luvulla normannien, '
        + 'arabien ja bysanttilaisten käsityönä; vieressä avautuu '
        + 'ristikäytävän puutarha.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },
};
