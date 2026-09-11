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
      selite: "Naiset pitivät pyykin, saippuan ja oman työnsä järjestyksessä samalla kun maa lämmitti veden. Lähteen höyry liikkui tuulen mukana niin, että osa maisemasta katosi hetkeksi näkyvistä. Reykjavikin pienet talot jäivät kauemmas, ja pesupaikka näytti tavalliselta osalta niiden arkea. Asetin kameran sivuun roiskeista. Minulle tämä oli ihme; kuvassa oleville naisille se oli tehtävä, joka piti saada valmiiksi.",
      lahde: "Matkakirjan havainnekuva",
      lahteet: ["https://borgarsogusafn.is/en/exhibitions/the-washerwomen-s-walk-a-stroll-into-history"],
    },
    luentakuva2: {
      osoite: "https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-islanti-r20260911-paper2-v1.jpg",
      lyhyt: "Reykjavik, 1873. Paita palasi puhtaana, saari jäi suureksi kysymykseksi.",
      selite: "Kuljin kuumilta lähteiltä takaisin kohti Reykjavikin pieniä taloja. Tuuli tarttui takkiin ja puhtaan paidan kaulukseen. Tien ympärillä maa avautui niin laajana, ettei mikään puu katkaissut näkymää. Kaulukseni oli selkeämpi kuin käsitykseni saaresta.",
      lahde: "Matkakirjan havainnekuva",
      lahteet: ["https://borgarsogusafn.is/en/exhibitions/the-washerwomen-s-walk-a-stroll-into-history"],
    },
    /* KAANON (Fable) — toinen virke on kortin tunnelmarivi. */
    paikkarivi: 'Reykjavik, elokuussa 1873. Tuulista; ei yhtään puuta; '
      + 'puntari matalalla.',
    /* KAANON: OMISTAJAN TEKSTI (postilaatikko 9.9.2026, EUROOPPA-MATKAKIRJA-1873-20260909). Sanasta sanaan. 357 merkkiä (yläraja 400). */
    teksti: 'Reykjavikin ulkopuolella naiset pesivät pyykkiä kuumassa '
      + 'lähteessä. Höyry nousi maasta, ja tuuli yritti viedä sen merelle. '
      + 'Annoin pestäväksi paitani. Se oli ensimmäinen kerta, kun maa teki '
      + 'minulle palveluksen vaatimatta lapioimista. Paluumatkalla näin pienet '
      + 'talot ja niiden takana suuren tyhjyyden. Kaulukseni oli puhtaampi '
      + 'kuin käsitykseni tästä saaresta.',
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
      { id: 'islanti.r1', ankkuri: 'kuumassa lähteessä', tarkoitus: 'hammastyy', voimakkuus: 0.4, siirtyma: 0,
        perustelu: 'Pyykki pestään maan omassa kuumassa vedessä.' },
      { id: 'islanti.r2', ankkuri: 'Annoin pestäväksi paitani', tarkoitus: 'myotailee', voimakkuus: 0.3, siirtyma: 0,
        perustelu: 'Isoisä luottaa paikalliseen tapaan.' },
      { id: 'islanti.r3', ankkuri: 'vaatimatta lapioimista', tarkoitus: 'huvittuu', voimakkuus: 0.55, siirtyma: 0,
        perustelu: 'Merkinnän vitsi maan palveluksista.' },
      { id: 'islanti.r4', ankkuri: 'suuren tyhjyyden', tarkoitus: 'vakavoituu', voimakkuus: 0.5, siirtyma: 0,
        perustelu: 'Maiseman mittakaava vakavoittaa.' },
      { id: 'islanti.r5', ankkuri: 'käsitykseni tästä saaresta', tarkoitus: 'huvittuu', voimakkuus: 0.5, siirtyma: 0,
        perustelu: 'Loppuvitsi omasta ennakkoluulosta.' },
    ],
    /* ÄÄNITE: luenta generoitu 9.9.2026 tästä tekstistä (generoi-luennat.yml ajo 17). */
    luenta: '[curious] Reykjavikin ulkopuolella naiset pesivät pyykkiä '
      + 'kuumassa lähteessä. Höyry nousi maasta, ja tuuli yritti viedä sen '
      + 'merelle. Annoin pestäväksi paitani. Se oli ensimmäinen kerta, kun maa '
      + 'teki minulle palveluksen vaatimatta lapioimista. Paluumatkalla näin '
      + 'pienet talot ja niiden takana suuren tyhjyyden. [softly] Kaulukseni '
      + 'oli puhtaampi kuin käsitykseni tästä saaresta.',
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
        selite: 'Laugardalurissa kuumia lähteitä käytettiin ennen pyykinpesuun. Nyt '
          + 'laaksossa on myös suuri geotermisesti lämmitetty uimala, ja '
          + 'kaupungin talot saavat lämpönsä samasta maanalaisesta voimasta. '
          + 'Asetuin altaan ulkopuoliselle aidalle katsomaan höyryä. Isoisän '
          + 'paita oli tämän tarinan pieni alku. Minä pidän kehityksen '
          + 'suunnasta: ihmiset ovat löytäneet syyn istua ulkona silloinkin, '
          + 'kun ilma ei sitä ehdota.',
        lahde: 'Matkakirjan havainnekuva',
        lahteet: [
          'https://visitreykjavik.is/laugardalur-valley',
          'https://www.icelandtravel.is/attractions/laugardalur-2-2/',
        ],
      },
    ],
    /* Yksi kupla luennan jälkeen, ei alustusta eikä välihuutoa. */
    /* KUPLA: OMISTAJAN TEKSTI (postilaatikko 9.9.2026). Sanasta sanaan. */
    kommentti: [
      'Reykjavikin talotkin lämpiävät nyt maan lämmöllä. Paita oli lupaava alku. Minä arvostan lämmintä räystästä.',
    ],
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
