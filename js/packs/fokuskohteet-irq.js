/*
 * FOKUSKOHTEET — IRAK. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-grc.js:lle ja js/packs/
 * fokuskohteet-egy.js:lle. Kentät ja niiden perustelut on selitetty
 * Kreikan tiedoston alussa; tässä on vain se, mikä Irakissa on toisin.
 *
 * ── YKSI KOHDE, JA SE ON TIETOINEN VALINTA ─────────────────────────
 *
 * Omistajan tilaus 26.8.2026 (*"peliin voisi generoida kaikki antiikin
 * kadonneet ihmeet"*) toi tänne seitsemän ihmeen viimeisen: Babylonin
 * riippuvat puutarhat. Ne olisivat jääneet kokonaan pois, koska
 * Irakilla ei ollut yhtään fokuskohdetta — mutta maan fokuslehti on
 * olemassa (js/packs/fokus-grc.js FOKUS_POHJAT.IRQ, tiedosto
 * IRQ.webp), joten merkillä on lehti, jonka päälle asettua. Tiedosto
 * on siis tarkoituksella yhden kohteen mittainen ja odottaa
 * seuraavaa Irak-erää.
 *
 * ── KOORDINAATIT: VAIN MAAILMANKARTTA ──────────────────────────────
 *
 * IRQ-lehti on maailmankartan lauta, ja Babylon (44,4 E) on joka
 * tapauksessa Euroopan laudan kaavan itäpuolella (kaava kattaa
 * −11°…41°, js/packs/europe.js). Rivillä on siis vain
 * `maailmankartta`, samasta syystä kuin Turkin kahdella itäisimmällä
 * kohteella. Kaava on maailmankartan Millerin lieriö (LEVEYS 12000 /
 * LON0 −175 / POHJOINEN 76) ja se validoitiin ennen käyttöä kolmella
 * jo kirjatulla kohteella (Ateena, Efesos, Olympia: 0,1 yksikön
 * tarkkuus). Piste osuu IRQ-lehden rajaukseen (x 7067–7511,
 * y 1847–2269).
 *
 * ── SE, MITÄ TÄMÄ KOHDE EI VÄITÄ ───────────────────────────────────
 *
 * Riippuvat puutarhat ovat seitsemästä ihmeestä ainoa, jonka paikkaa
 * ei ole koskaan varmistettu, eikä Babylonista ole löytynyt niistä
 * arkeologista todistetta. Teksti sanoo sen suoraan eikä esitä
 * legendaa faktana — ja havainnekuvan selite toistaa saman. Merkki on
 * Babylonin raunioilla (32,5425 N / 44,42111 E — en-Wikipedia
 * "Babylon"), koska se on paikka, josta antiikin kirjoittajat
 * puhuivat; kartalla se on kohteen oma sijainti eikä väite kaivauksen
 * tuloksesta.
 *
 * ── KUVA ON PELIN OMA HAVAINNEKUVA ─────────────────────────────────
 *
 * Kohteella on VAIN `ihme`-kenttä eikä lainkaan `kuva`-kenttää
 * (omistajan tilaus 27.8.2026 ilta: erän ensimmäinen, piirrosmainen
 * rekonstruktio poistettiin, koska fotorealistinen ihmekuva korvaa
 * sen). Kuvakenttä on `osoite` eikä `tiedosto`: polku repoon
 * (assets/kartat/ihmeet/), ei Commonsiin, ja kuva syntyy
 * .github/workflows/generoi-ihmeet.yml -ajossa. Selite kertoo
 * KOHTEESTA, lähderivi merkitsee kuvan havainnekuvaksi ja peli piirtää
 * kuvan kulmaan nauhan "Matkakirjan ihme" — säännöt kokonaisuudessaan
 * Kreikan tiedoston lohkossa "MATKAKIRJAN IHME".
 */
export const FOKUSKOHTEET_IRQ = [
  {
    id: 'babylonin-puutarhat',
    nimi: 'Babylonin riippuvat puutarhat',
    // Kartalle lyhyt asu (js/fokuskohteet.js kohteenKarttanimi):
    // koko nimi ei mahdu nimiöön, ja lyhennys jättäisi siitä määritteen.
    nimio: 'Riippupuutarhat',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Miten vesi olisi saatu nostettua puutarhojen huipulle?',
      'Mitä Babylonin raunioilta on oikeasti löydetty?',
    ],
    korostukset: ['Nebukadnessar|Nebukadnessar toinen', 'Semiramis|Semiramikseen'],
    nappi: 'Ihme, jota ei ole koskaan löydetty',
    laudat: {
      maailmankartta: { x: 7314.0, y: 2087.4 },
    },
    teksti: 'Antiikin kirjoittajat kertoivat Babylonissa olleen '
      + 'porrastetut puutarhat: terassi toisensa päällä puita, pensaita '
      + 'ja köynnöksiä, kuin vihreä vuori savitiilistä. Kreikan sana '
      + 'kremastos ei tarkoita roikkumista vaan juuri sitä, että puut '
      + 'kasvoivat korotetulla rakenteella. Tarinan mukaan ne rakennutti '
      + 'Nebukadnessar toinen (605–562 eaa.) puolisolleen Amytikselle, '
      + 'joka ikävöi kotiseutunsa Meedian vihreitä kukkuloita; '
      + 'toinen perinne liittää ne kuningatar Semiramikseen. Puutarhat '
      + 'ovat seitsemästä ihmeestä ainoa, jonka paikkaa ei ole '
      + 'varmistettu: yksikään babylonialainen teksti ei mainitse niitä, '
      + 'eikä Babylonista ole löytynyt niistä jälkeäkään.',
    lahde: 'en-Wikipedia "Hanging Gardens of Babylon", johdanto-osa '
      + '(tarkistettu 26.8.2026); koordinaatit en-Wikipedia "Babylon".',
    /*
     * MATKAKIRJAN IHME (kadonnut) — säännöt js/packs/fokuskohteet-grc.js:n
     * samannimisessä lohkossa. Puutarhoja ei ole koskaan löydetty, joten
     * tähti kartalla on tässä kirjaimellisin mahdollinen: paikka, jota ei
     * ole edes varmuudella ollut.
     */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-babylonin-puutarhat.webp',
      kadonnut: true,
      selite: 'Riippuvat puutarhat olivat antiikin kirjoittajien mukaan '
        + 'terassi terassin päälle istutettu vihreä vuori savitiilistä '
        + 'keskellä Mesopotamian tasankoa. Ne ovat seitsemästä ihmeestä '
        + 'ainoa, jonka paikkaa ei ole varmistettu: Babylonin raunioilta '
        + 'nykyisen Hillan liepeiltä ei ole löytynyt niistä jälkeäkään.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
  /*
   * ── MATKAKIRJAN IHMEIDEN VÄLIMEREN ERÄ (27.8.2026) ───────────────
   *
   * Kaksi kohdetta lisää, ja tiedoston alun "yksi kohde" -perustelu
   * jää siihen: Irakilla on nyt kolme fokuskohdetta. Kumpikin uusi on
   * ihmekohde eikä maakatsaus, ja kumpikin on `kadonnut: true` —
   * mutta eri syystä, ja se ero on kirjoitettava auki.
   *
   *   ISHTARIN PORTTI on SIIRRETTY. Portti ei tuhoutunut: se
   *     kaivettiin esiin ja vietiin Berliiniin, missä pienempi
   *     etuportti on koottu Pergamonmuseumin saliin. Paikalla
   *     Babylonissa on vuoden 1987 jäljennös, joka on alkuperäistä
   *     selvästi pienempi. Kohde itse — se portti, josta ihmekuva
   *     kertoo — ei siis ole paikallaan, joten kartalla on tähti.
   *     Selitteessä ON SANOTTAVA, missä tiilet ovat (omistajan
   *     linjaus 27.8.2026); ilman sitä tähti valehtelisi kohteen
   *     hävinneen. Sama esitystapa ja sama sääntö kuin Pergamonin
   *     alttarilla (js/packs/fokuskohteet-tur.js).
   *
   *   SANHERIBIN LOUNAISPALATSI on TUHOUTUNUT. Palatsin salit ovat
   *     poissa. Aihe on rajattu neutraaliksi täsmälleen kuten
   *     Palmyran Belin temppelissä (js/packs/fokuskohteet-syr.js):
   *     tuho kerrotaan tapahtumana ja vuosilukuna ja tekijä nimetään
   *     niin kuin lähdeartikkeli sen nimeää, muttei kuvailla tuhoa
   *     eikä tekijöiden muuta toimintaa. Perustuslain
   *     ikäsopivuuskohta koskee juuri tätä: kohde kerrotaan, ei sotaa.
   *
   * KOORDINAATIT: kummallakin vain `maailmankartta`, koska molemmat
   * ovat Euroopan laudan kaavan itäpuolella (kaava kattaa −11°…41°).
   * Kaava on maailmankartan Millerin lieriö, ja molemmat pisteet
   * osuvat IRQ-lehden rajaukseen (x 7067–7511, y 1847–2269).
   *
   * FAKTAPOHJA: en-Wikipedia raakatekstinä artikkelit "Ishtar Gate",
   * "Nineveh" ja "Sennacherib" 27.8.2026.
   */
  {
    /*
     * ISHTARIN PORTTI. 44,422222 E / 32,543333 N — en-Wikipedia
     * "Ishtar Gate" (artikkelin coord, 32°32′36″N 44°25′20″E).
     * Piste on Babylonin raunioalue nykyisen Hillan liepeillä, ja se
     * on lähes sama kuin riippuvien puutarhojen piste yllä (7314,0 /
     * 2087,4) — molemmat ovat samassa kaupungissa. Niputuspassi
     * (js/fokusniput.js) erottaa merkit esityksessä; dataan ei
     * kosketa.
     */
    id: 'ishtarin-portti',
    nimi: 'Ishtarin portti',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Miksi sininen väri oli babylonialaisille niin tärkeä?',
      'Miten portin tiilet päätyivät Berliiniin?',
    ],
    korostukset: ['mušhuššu|mušhuššu', 'Prosessiotie|Prosessiotie'],
    nappi: 'Portti, jonka tiilet ovat nyt Berliinissä',
    laudat: {
      maailmankartta: { x: 7314.1, y: 2087.3 },
    },
    teksti: 'Ishtarin portti oli Babylonin sisemmän kaupunginmuurin '
      + 'kahdeksas portti, ja Nebukadnessar toinen rakennutti sen noin '
      + '569 eaa. kaupungin pohjoislaidalle. Portin tiilet oli '
      + 'lasitettu syvänsiniseksi jäljittelemään lapislatsulia, ja '
      + 'niiden pintaan oli muotoiltu vuorotellen Marduk-jumalan '
      + 'käärmelohikäärme mušhuššu ja ukkosenjumala Adadin alkuhärkä. '
      + 'Portista alkoi yli 800 metriä pitkä Prosessiotie, jonka '
      + 'muureilla asteli kuusikymmentä Ishtarin leijonaa kummallakin '
      + 'puolella. Katto ja ovet olivat setripuuta, ja tiilten saumat '
      + 'tiivistettiin bitumilla. Kerran vuodessa, kevätpäiväntasauksen '
      + 'aikaan alkaneena uudenvuoden juhlana, jumalten patsaat '
      + 'kannettiin portista Prosessiotietä pitkin. Nebukadnessarin '
      + 'vihkikirjoitus kertoo, miksi portti koristeltiin näin: "jotta '
      + 'ihmiskunta katselisi niitä ihmeissään".',
    lahde: 'en-Wikipedia "Ishtar Gate", johdanto sekä osiot "History", '
      + '"Design", "Ishtar Gate and Processional Way", "Inscription of '
      + 'Nebuchadnezzar II" ja "Excavation and display" (tarkistettu '
      + '27.8.2026).',
    /*
     * MATKAKIRJAN IHME (kadonnut paikaltaan) — säännöt js/packs/
     * fokuskohteet-grc.js:n samannimisessä lohkossa. Kortissa on vain
     * tämä kuva.
     */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-ishtarin-portti.webp',
      kadonnut: true,
      selite: 'Ishtarin portti oli Babylonin loistoportti: '
        + 'syvänsiniseksi lasitettuja tiiliä, joiden pintaan oli '
        + 'muotoiltu kultaisia lohikäärmeitä ja härkiä, ja portista '
        + 'alkoi leijonien reunustama Prosessiotie. Alkuperäinen portti '
        + 'ei ole enää paikallaan: Robert Koldeweyn retkikunta kaivoi '
        + 'sen esiin 1900-luvun alussa, ja tiilet vietiin Berliiniin, '
        + 'missä pienempi etuportti on koottu uudelleen '
        + 'Pergamonmuseumin saliin. Babylonin raunioilla Hillan '
        + 'liepeillä seisoo nyt vuonna 1987 valmistunut jäljennös, joka '
        + 'on alkuperäistä selvästi pienempi.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
  {
    /*
     * SANHERIBIN LOUNAISPALATSI. 43,152778 E / 36,359444 N —
     * en-Wikipedia "Nineveh" (tietolaatikon coordinates, 36°21′34″N
     * 43°09′10″E). Piste on Ninive eli Kuyunjiqin ja Nebi Yunusin
     * kummut Tigrisin itärannalla Mosulin laidalla; palatsi on
     * Kuyunjiqin kummulla.
     *
     * ISOISÄN KYTKÖS ON KOHTEEN TEKSTISSÄ eikä keksitty: George Smith
     * kaivoi lounaispalatsissa vuosina 1873–1874 eli täsmälleen
     * päiväkirjan vuonna.
     */
    id: 'niniven-lounaispalatsi',
    nimi: 'Sanheribin lounaispalatsi',
    // Kartalle lyhyt asu (js/fokuskohteet.js kohteenKarttanimi):
    // koko nimi ei mahdu nimiöön, ja lyhennys jättäisi siitä määritteen.
    nimio: 'Sanheribin palatsi',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Mitä George Smith löysi Niniven savitauluista?',
      'Miksi assyrialaiset verhosivat seinät kivireliefeillä?',
    ],
    korostukset: ['Sanherib|Sanherib', 'reliefi|reliefeillä'],
    nappi: 'Palatsi vailla vertaa Tigrisin rannalla',
    laudat: {
      maailmankartta: { x: 7271.8, y: 1943.8 },
    },
    teksti: 'Assyrian kuningas Sanherib siirsi valtakuntansa '
      + 'pääkaupungin Niniveen ja aloitti vuonna 702 eaa. '
      + 'lounaispalatsin rakentamisen Kuyunjiqin kummulle. Hän kutsui '
      + 'sitä nimellä "palatsi vailla vertaa". Rakennus mitattiin '
      + 'kummun mukaan noin 500 metriä pitkäksi ja 240 metriä leveäksi, '
      + 'ja siinä oli ainakin kahdeksankymmentä huonetta. Perustus '
      + 'muurattiin kalkkikivestä ja savitiilestä 22 metrin korkeuteen '
      + '— arviolta 160 miljoonaa tiiltä — ja sen päällä kohosi vielä '
      + 'kaksikymmentä metriä savitiilimuuria. Seinät verhottiin '
      + 'kivireliefeillä, katto tehtiin sypressistä ja setristä ja '
      + 'porteille pystytettiin kolossaaliset härkä- ja '
      + 'leijonapatsaat. Austen Henry Layard löysi palatsin uudelleen '
      + 'vuonna 1849 ja George Smith kaivoi siellä vuosina 1873–1874. '
      + 'Reliefit ovat nyt Lontoossa, Berliinissä, Bagdadissa, '
      + 'Pariisissa ja New Yorkissa.',
    lahde: 'en-Wikipedia "Sennacherib", osiot "Building projects" ja '
      + '"Sources", sekä "Nineveh", osiot "Sennacherib", '
      + '"Archaeology" ja "Threats" (tarkistettu 27.8.2026).',
    /*
     * MATKAKIRJAN IHME (kadonnut) — säännöt js/packs/
     * fokuskohteet-grc.js:n samannimisessä lohkossa. Kortissa on vain
     * tämä kuva.
     *
     * SELITE ON KIRJOITETTU TAPAHTUMANA EIKÄ KUVAUKSENA, kuten
     * Palmyran Belin temppelissä. Se sanoo mikä palatsi oli, missä
     * järjestyksessä se hävisi ja mitä paikalla tehdään nyt — ei
     * enempää.
     */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-niniven-palatsi.webp',
      kadonnut: true,
      selite: 'Sanheribin lounaispalatsi oli Assyrian mahdin '
        + 'näyteikkuna: kahdeksankymmentä huonetta, joiden seinät oli '
        + 'verhottu kivireliefeillä, ja porteilla siivekkäät '
        + 'härkäkolossit. Palatsin salit ovat poissa. Rakennus oli jo '
        + 'raunio, kun Layard kaivoi sen esiin 1800-luvulla, '
        + '1990-luvulta alkaen jäljellä olleet reliefit kärsivät '
        + 'ryöstelystä, ja Isis-järjestö puski valtaistuinsalin maan '
        + 'tasalle vuonna 2016. Kuyunjiqin kumpu on yhä paikallaan '
        + 'Mosulin laidalla Tigrisin itärannalla, ja saksalainen '
        + 'retkikunta on vuodesta 2021 pelastanut ja korjannut '
        + 'särkyneitä reliefejä.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
];
