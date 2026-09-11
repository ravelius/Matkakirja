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
    /* Hyväksytty lopullinen paperikuva; toimitus 10.9.2026, SHA-256 bda006756bc34bd4103f0fe5a4a713b07c84362e618525fc08d175c7195f3d4d. */
    luentakuva: {
      osoite: "https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-tromssa-r20260909-paper-v4.jpg",
      lyhyt: "Tromssa, 1873. Pieni simpukka ja suuri kysymys samassa huoneessa.",
      selite: "Museon pöydällä simpukka ja luu saivat paikan vierekkäin ilman, että suurempi olisi vienyt pienemmältä arvoa. Tromssan satamasta tuodaan näytteitä pohjoisen meriltä; osa tavarasta alkaa tuottaa kysymyksiä siinä missä muu lasti rahaa. Ikkunan mastot muistuttivat, ettei keräämiseen tarvita pelkkää kaappia vaan myös matka. Kuvasin pöydän sellaisenaan. Sen järjestys oli minusta hyvä alku museolle.",
      lahde: "Matkakirjan havainnekuva",
      lahteet: ["https://en.uit.no/om/historie","https://uit.no/ressurs/uit/mediebok/Labyrint0412/Labyrint_2012-04_web.pdf","https://uit.no/tmu/samlinger/samling?p_document_id=667875"],
    },
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
     * Hiljaiset osuudet: "Tromssaan on perustettu museo" ja "Ikkunasta
     * näkyi pyyntilaivojen mastoja" (tausta ja havainto).
     */
    reaktiot: [
      { id: 'tromssa.r1', ankkuri: 'ei tavallisesti maksa', tarkoitus: 'huvittuu', voimakkuus: 0.45, siirtyma: 0,
        perustelu: 'Luut ja kivet eivät kuulu rahtiin.' },
      { id: 'tromssa.r2', ankkuri: 'törmääväni uimassa', tarkoitus: 'huvittuu', voimakkuus: 0.55, siirtyma: 0,
        perustelu: 'Merkinnän vitsi tuntemattomasta eläimestä.' },
      { id: 'tromssa.r3', ankkuri: 'vatsan että uteliaisuuden', tarkoitus: 'myotailee', voimakkuus: 0.45, siirtyma: 0,
        perustelu: 'Meren kaksi antia todetaan tyytyväisenä.' },
      { id: 'tromssa.r4', ankkuri: 'vaikutti pohjattomalta', tarkoitus: 'huvittuu', voimakkuus: 0.5, siirtyma: 0,
        perustelu: 'Loppuvitsi uteliaisuuden määrästä.' },
    ],
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
    /*
     * PULUCAM (kuvatoimitus 9.9.2026, pulu-cam-tromssa-01-r20260909-14mm-v3.jpg, tilaus
     * PULU-CAM-EUROOPPA-20260909-OHJAUS-01; omistaja: "ne voi hyvaksya
     * sellaisenaan suoraan peliin"). Kuvatekstit tekstisession sanasta
     * sanaan: lyhyt kuvan alle, pitka karuselliin. Lahteet on
     * tausta-aineisto (ei nay pelaajalle).
     */
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/matkakirja/pulu-cam/pulu-cam-tromssa-01-r20260909-14mm-v3.jpg',
        lyhyt: 'Tromssa: yksi simpukankuori ja koko meri täynnä kysymyksiä.',
        selite: 'Tromssan Polaarimuseo toimii vanhoissa tullirakennuksissa meren '
          + 'äärellä. Se kertoo pyynnistä, retkikunnista ja arjesta '
          + 'pohjoisessa. Museon laituri on rakennettu uudelleen vanhojen '
          + 'valokuvien avulla. Laudalle jäänyt simpukankuori ei kuulu '
          + 'näyttelyyn, mutta pysäytti minut silti. Isoisäkin huomasi, että '
          + 'pienestä esineestä voi alkaa suuri uteliaisuus. Minä aloitin '
          + 'tarkistamalla, oliko asunto jo vapaa.',
        lahde: 'Matkakirjan havainnekuva',
        lahteet: [
          'https://en.uit.no/tavla/artikkel?p_document_id=804921',
          'https://www.visittromso.no/polar-museum',
          'https://en.uit.no/om/historie',
          'https://uit.no/Content/672073/cache%3D20222601171440/transformation%3DkompJpgHighTommy/Foto%2C-Marius-Fiskum_tmu_Slider1.jpg',
          'https://uit.no/Content/411677/transformation%3Dscale10000x560/tollbunaustet.jpg',
        ],
      },
    ],
    /* Yksi kupla luennan jälkeen, ei alustusta eikä välihuutoa. */
    /* KUPLA: OMISTAJAN TEKSTI (postilaatikko 9.9.2026). Sanasta sanaan. */
    kommentti: [
      'Tromssassa on nyt yliopistokin. Isoisä osui oikeaan: pienestä simpukasta voi alkaa pitkä matka.',
    ],
    /* Pulun reaktiotagi (docs/pulu-reaktiot.md), ei näy tekstissä. */
    tunne: { tunne: 'utelias', voimakkuus: 0.5 },
    /*
     * HERO on kaupunkilehden oma avauskuva (js/packs/kulttuuri-
     * kategoriat.js, tromssa/kaupunki/avauskuvat): napamuseo 1840-luvun
     * tullimakasiineissa — samat makasiinit satamassa, jossa merkinnän
     * hylkeenpyytäjät purkavat lastiaan. Selite ja lähde ovat lehden
     * omat.
     */
    kuva: {
      ampari: 'herokoe/hero-tromssa-ilta.jpg',
      lyhyt: 'Polarmuseet avattiin 1978, 50 vuotta Amundsenin viimeisen lennon jälkeen, tullimakasiineissa.',
      selite: 'Polarmuseet avattiin 18. kesäkuuta 1978 tasan viisikymmentä '
        + 'vuotta Roald Amundsenin viimeisen lennon jälkeen, ja se toimii '
        + '1840-luvun tullimakasiineissa Skansenin lähellä.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },
};
