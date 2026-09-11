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
      selite: "Palatinakappelin katon syvennykset tarttuivat valoon eri kohdista, ja seinien mosaiikit vastasivat siihen kullalla. Normannikuninkaan tilaamassa tilassa kohtaavat eri seutujen käsityötaidot. Kamerani joutuu tekemään ilman väriä, mikä on tässä huoneessa selvä puute. Koetin saada puun pienet muodot näkyviin. Yhden katseen nostaminen ylös osoittautui helpoksi; sen palauttaminen alas kesti paljon kauemmin.",
      lahde: "Matkakirjan havainnekuva",
      lahteet: ["https://www.federicosecondo.org/cappella-palatina/"],
    },
    luentakuva2: {
      osoite: "https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-sisilia-r20260911-paper2-v1.jpg",
      lyhyt: "Palermo, 1873. Niska väsyi ennen kuin kysymykset loppuivat.",
      selite: "Istuin hetkeksi, sillä pitkään ylöspäin katsominen tuntui jo niskassa. Mosaiikit, pylväät ja veistetty puu kertoivat monen käsityöperinteen kohtaamisesta. Kuninkaan nimi oli helppo kuulla. Niiden käsien nimiä, jotka tekivät työn, olisin kuunnellut kauemmin.",
      lahde: "Matkakirjan havainnekuva",
      lahteet: ["https://www.federicosecondo.org/la-cappella-palatina/","https://www.federicosecondo.org/wp-content/uploads/2025/02/palatina_eng.pdf"],
    },
    /* KAANON (Fable) — toinen virke on kortin tunnelmarivi. */
    paikkarivi: 'Palermo, toukokuussa 1873. Kuumaa; Etna savuaa horisontissa; '
      + 'puntari korkealla.',
    /* KAANON: OMISTAJAN TEKSTI (postilaatikko 9.9.2026, EUROOPPA-MATKAKIRJA-1873-20260909). Sanasta sanaan. 346 merkkiä (yläraja 400). */
    teksti: 'Palermon palatsikappelissa seinät hohtavat kultaa ja puukatto '
      + 'näyttää puusta veistetyltä luolastolta. Normannien kuningas teetti '
      + 'sen, mutta kädet tulivat monesta maailmasta: kreikkalaisia '
      + 'mosaiikkeja, arabialaista veistotyötä. Katselin ylös, kunnes niska '
      + 'väsyi. Kuninkaan nimi mainittiin monta kertaa. Tekijöiden nimiä '
      + 'olisin kuunnellut kauemmin.',
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
      { id: 'sisilia.r1', ankkuri: 'veistetyltä luolastolta', tarkoitus: 'hammastyy', voimakkuus: 0.45, siirtyma: 0,
        perustelu: 'Kultainen kappeli ja puinen luolasto samassa.' },
      { id: 'sisilia.r2', ankkuri: 'kunnes niska väsyi', tarkoitus: 'huvittuu', voimakkuus: 0.45, siirtyma: 0,
        perustelu: 'Katseleminen käy työstä.' },
      { id: 'sisilia.r3', ankkuri: 'mainittiin monta kertaa', tarkoitus: 'epailee', voimakkuus: 0.45, siirtyma: 0,
        perustelu: 'Kuninkaan nimi toistuu liikaa.' },
      { id: 'sisilia.r4', ankkuri: 'olisin kuunnellut kauemmin', tarkoitus: 'vakavoituu', voimakkuus: 0.55, siirtyma: 0,
        perustelu: 'Merkinnän päätös: tekijät jäivät nimettömiksi.' },
    ],
    /* ÄÄNITE: luenta generoitu 9.9.2026 tästä tekstistä (generoi-luennat.yml ajo 17). */
    luenta: '[curious] Palermon palatsikappelissa seinät hohtavat kultaa ja '
      + 'puukatto näyttää puusta veistetyltä luolastolta. Normannien kuningas '
      + 'teetti sen, mutta kädet tulivat monesta maailmasta: kreikkalaisia '
      + 'mosaiikkeja, arabialaista veistotyötä. Katselin ylös, kunnes niska '
      + 'väsyi. Kuninkaan nimi mainittiin monta kertaa. [softly] Tekijöiden '
      + 'nimiä olisin kuunnellut kauemmin.',
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
        lyhyt: 'Palermo: tätä kattoa varten kannattaa nostaa nokkaa.',
        selite: 'Palatinakappelin puukaton pienet syvennykset asettuvat päällekkäin '
          + 'kuin huolellisesti rakennettu pesä, jonka tekijä ei ole halunnut '
          + 'lopettaa. Mosaiikkien kulta tuo tilaan toisenlaista valoa. Isoisä '
          + 'kyseli käsityöläisten nimiä. Minä katselin, kuinka monta erilaista '
          + 'taitoa voi mahtua samaan huoneeseen. Palatsissa työskentelee nyt '
          + 'myös Sisilian parlamentti. Katon puheenvuoro on kestänyt kauemmin.',
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
      'Kappeli hohtaa yhä. Palermon palatsissa istuu nyt Sisilian parlamentti. Katto ansaitsee edelleen puheenvuoron.',
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
