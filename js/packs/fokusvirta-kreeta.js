/*
 * KREETAN FOKUSVIRTA — KEVYT PAKKI (omistaja 8.9.2026).
 *
 * Sisartiedosto js/packs/fokusvirta-riika.js:lle ja -vilna.js:lle, mutta
 * KEVYT: siinä on vain ne kaksi lohkoa, jotka pelin nykyinen kulku
 * lukee — isoisän matkakirjamerkintä ja pulun kupla sen perään.
 * Kortteja ei ole (js/fokusvirta.js FOKUSVIRTA_KORTIT === false), joten
 * täkyjä, oppituntia, kohtaamista eikä lehtitehtäviä ei ole tehty:
 * ne olisivat dataa, jota mikään ei piirrä. Kevyet pakit on nimetty
 * rekisterissä (js/packs/fokusvirrat.js KEVYET_FOKUSVIRRAT), jottei
 * täydestä pakista voi kadota lohkoja huomaamatta.
 *
 * MIKSI TÄMÄ PAKKI ON OLEMASSA. Omistajan linjaus 8.9.2026 (Raamattu:
 * KOKO EUROOPPA KULKEE FOKUSVIRTAPAKKIEN KAUTTA), sanatarkasti: *"joo
 * kirjoita niille omat ja arkistoi europe-saapumiset tiedosto ja
 * kirjoita sen alkuun EI ENÄÄ KÄYTÖSSÄ tms tai miten vain parhaiten
 * saadaan pelistä pois että ei vahingossa palaa"*. Kreeta oli yksi
 * kuudesta Euroopan kohteesta, joiden merkintä luettiin yhä vanhasta
 * saapumistaulusta (js/packs/europe-saapumiset.js, arkistoitu
 * docs/arkisto/europe-saapumiset-2026-09-08.js.txt). Nyt manner kulkee
 * kokonaan fokusvirtapakkien kautta.
 *
 * KAANON (päätoimittaja-Fable 8.9.2026): paikkarivi, teksti ja pulun
 * kupla ovat SANATARKASTI hänen kirjoittamiaan — niitä ei ole
 * lyhennetty, täydennetty eikä sanajärjestystä muutettu. Luenta on sama
 * teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * TUNNELMARIVI SYNTYY PAIKKARIVISTÄ. Kortin otsikko on paikkarivin
 * ensimmäinen virke ("Kreeta, huhtikuussa 1873") ja tunnelmarivi sen
 * toinen virke (js/ui-apurit.js matkakirjanOtsikko) — kenttiä ei siis
 * ole kahta.
 *
 * ÄÄNITETTÄ EI VIELÄ OLE. `aanite` osoittaa samalla kaavalla kuin
 * muissa paketeissa (assets/audio/puhe-fokus-matkakirja-<id>.mp3), ja
 * tiedosto generoidaan vasta kun omistaja hyväksyy luennan. Puuttuva
 * äänite on hiljainen eikä kaada mitään: js/luenta.js playDiaryVoice
 * kokeilee varareitin kerran ja vaikenee.
 */
export const FOKUSVIRTA_KREETA = {
  kaupunki: 'kreeta',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* Hyväksytty lopullinen paperikuva; toimitus 10.9.2026, SHA-256 247f297a608718fda5cd4bbf0a1d2182846197ff86686341e2bf5de32b2d8af5. */
    luentakuva: {
      osoite: "https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-kreeta-r20260909-paper-v4.jpg",
      lyhyt: "Hania, 1873. Verkko vaati korjausta valtakunnasta riippumatta.",
      selite: "Kalastajan sormet löysivät verkosta rikkinäisen kohdan nopeammin kuin silmäni. Sataman toisella puolella majakka seisoi venetsialaisten aloittamassa ja egyptiläisten muuttamassa hahmossaan. Kreeta on nyt sulttaanin aluetta, mutta veneen paluu riippuu valosta ja verkon kunto sen korjaajasta. Kuvasin nämä kaksi työtä samaan näkymään. Mies ei pitänyt kumpaakaan arvoituksena.",
      lahde: "Matkakirjan havainnekuva",
      lahteet: ["https://www.chaniatourism.gr/monument/the-egyptian-lighthouse/","https://chaniahistory.gr/en/lighthouse/","https://www.chaniatourism.gr/neighborhood/venetian-harbor/"],
    },
    luentakuva2: {
      osoite: "https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-kreeta-r20260911-paper2-v1.jpg",
      lyhyt: "Hania, 1873. Karttaan piirtyi valo ilman valtakunnan väriä.",
      selite: "Istuin satamakivelle ja avasin kartan polvelleni. Majakan pieni valo kuului merellä niille, jotka tarvitsivat sitä, vaikka torni oli vaihtanut hallitsijaa useammin kuin käyttötarkoitusta. Piirsin valon paikalleen ilman valtakunnan väriä. Veneet lepäsivät sen edessä hiljaisina.",
      lahde: "Matkakirjan havainnekuva",
      lahteet: ["https://chaniahistory.gr/en/lighthouse/"],
    },
    /* KAANON (Fable) — paikkarivi sellaisenaan; toinen virke on kortin
       tunnelmarivi. */
    paikkarivi: 'Kreeta, huhtikuussa 1873. Lämmintä; vuorilla vielä lunta; '
      + 'puntari korkealla.',
    /* KAANON: OMISTAJAN TEKSTI (postilaatikko 9.9.2026, EUROOPPA-MATKAKIRJA-1873-20260909). Sanasta sanaan. 318 merkkiä (yläraja 400). */
    teksti: 'Hanian sataman majakan aloittivat venetsialaiset ja korjasivat '
      + 'egyptiläiset. Nyt kaupunki kuuluu sulttaanille. Kalastaja selvitti '
      + 'minulle kaikki kolme ja paikkasi samalla verkkoaan. Kun kysyin, kenen '
      + 'majakka siis on, hän osoitti merelle. Niiden, jotka tarvitsevat sitä. '
      + 'Piirsin karttaani valon ilman valtakunnan väriä.',
    /*
     * LUENTA = RUUTUTEKSTI SANASTA SANAAN (docs/moduulit/tarinakaari.md,
     * luku 7). Vain tunnetagit on lisätty: kolme tagia, sama maltillinen
     * tyyli kuin muissa paketeissa. Yksikään sana, välimerkki tai
     * sanajärjestys ei muutu.
     */
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
     * Hiljaiset osuudet: majakan rakentajien luettelo (selittävä
     * tausta).
     */
    reaktiot: [
      { id: 'kreeta.r1', ankkuri: 'kuuluu sulttaanille', tarkoitus: 'hammastyy', voimakkuus: 0.4, siirtyma: 0,
        perustelu: 'Kolmas valtakunta samalle majakalle.' },
      { id: 'kreeta.r2', ankkuri: 'paikkasi samalla verkkoaan', tarkoitus: 'huvittuu', voimakkuus: 0.45, siirtyma: 0,
        perustelu: 'Historia kerrotaan työn ohessa.' },
      { id: 'kreeta.r3', ankkuri: 'hän osoitti merelle', tarkoitus: 'hammastyy', voimakkuus: 0.45, siirtyma: 0,
        perustelu: 'Vastaus ei ollut kartalla.' },
      { id: 'kreeta.r4', ankkuri: 'jotka tarvitsevat sitä', tarkoitus: 'vakavoituu', voimakkuus: 0.55, siirtyma: 0,
        perustelu: 'Kalastajan vastaus on merkinnän ydin.' },
      { id: 'kreeta.r5', ankkuri: 'ilman valtakunnan väriä', tarkoitus: 'myotailee', voimakkuus: 0.5, siirtyma: 0,
        perustelu: 'Isoisä merkitsee valon ilman lippua.' },
    ],
    /* ÄÄNITE: luenta generoitu 9.9.2026 tästä tekstistä (generoi-luennat.yml ajo 17). */
    luenta: '[curious] Hanian sataman majakan aloittivat venetsialaiset ja '
      + 'korjasivat egyptiläiset. Nyt kaupunki kuuluu sulttaanille. Kalastaja '
      + 'selvitti minulle kaikki kolme ja paikkasi samalla verkkoaan. Kun '
      + 'kysyin, kenen majakka siis on, hän osoitti merelle. Niiden, jotka '
      + 'tarvitsevat sitä. [softly] Piirsin karttaani valon ilman valtakunnan '
      + 'väriä.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-kreeta.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * PULUCAM (kuvatoimitus 9.9.2026, erat 01-07 + Tampere; tilaus
     * PULU-CAM-EUROOPPA-20260909, tekstisession kuvakohtaiset promptit;
     * omistaja: "ne voi hyvaksya sellaisenaan suoraan peliin").
     * Kuvatekstit sanasta sanaan: lyhyt kuvan alle, pitka karuselliin.
     * Lahteet on tausta-aineisto (ei nay pelaajalle). Tiedostot: pulu-cam-kreeta-01-r20260909-euv1-v1.jpg.
     */
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/matkakirja/pulu-cam/pulu-cam-kreeta-01-r20260909-euv1-v1.jpg',
        lyhyt: 'Hania: majakkaa tarvitaan siltäkin puolelta, josta sitä ei kuvata.',
        selite: 'Hanian majakka seisoo pitkän aallonmurtajan päässä. Sataman suulta '
          + 'sen tehtävä on helppo ymmärtää: valon paikka kertoo, missä kova '
          + 'reuna alkaa ja avoin vesi jatkuu. Lensin matalalta ohi juuri kun '
          + 'pieni vene palasi suojaan. Isoisän kalastaja sanoi majakan '
          + 'kuuluvan sitä tarvitseville. Kuvan alakulmaan jäi vene. Pidin sen '
          + 'mukana, sillä siinä oli koko vastauksen syy.',
        lahde: 'Matkakirjan havainnekuva',
        lahteet: [
          'https://www.chaniatourism.gr/monument/the-egyptian-lighthouse/',
          'https://www.chaniatourism.gr/neighborhood/venetian-harbor/',
        ],
      },
    ],
    /*
     * KAUPUNGIN KULKU: LUENTA — PULU (Raamattu, omistaja 7.9.2026 ja sen
     * kavennus 8.9.2026: *"ota kaikki pulun alustukset pois."*).
     *
     * Yksi kupla luennan jälkeen, ei alustusta eikä välihuutoa —
     * välihuudahdus jäi 8.9.2026 vain noin puoleen kaupungeista. Kupla
     * on Fablen kaanonteksti sellaisenaan: se on puheen mittainen (alle
     * 95 merkkiä), joten sitä ei jaeta kahdeksi.
     */
    /* KUPLA: OMISTAJAN TEKSTI (postilaatikko 9.9.2026). Sanasta sanaan. */
    kommentti: [
      'Kreeta kuuluu nyt Kreikkaan, majakka seisoo yhä. Kalastaja vastasi paremmin kuin isoisän kartta.',
    ],
    /* Pulun reaktiotagi (docs/pulu-reaktiot.md), ei näy tekstissä. */
    tunne: { tunne: 'lammin', voimakkuus: 0.5 },
    /*
     * HERO on kaupunkilehden oma avauskuva (js/packs/kulttuuri-
     * kategoriat.js, kreeta/kaupunki/avauskuvat): venetsialainen
     * satamalinnoitus Heraklionissa — juuri se venetsialainen vartio
     * turkkilaisen kaupungin edessä, josta merkintä puhuu. Selite ja
     * lähde ovat lehden omat, eikä uutta kuvaa ole haettu mistään.
     */
    kuva: {
      ampari: 'herokoe/hero-kreeta-keskipaiva.jpg',
      lyhyt: 'Koulesin linnoitus valmistui Heraklionin satamansuulle 1540; muurissa yhä Pyhän Markuksen leijona.',
      selite: 'Koulesin linnoitus valmistui Heraklionin satamansuulle 1540 '
        + 'venetsialaisten Rocca a Marena, ja sen muurissa on yhä Pyhän '
        + 'Markuksen leijona.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },
};
