/*
 * FOKUSKOHTEET — RANSKA. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-grc.js:lle ja js/packs/
 * fokuskohteet-irq.js:lle. Kentät ja niiden perustelut on selitetty
 * Kreikan tiedoston alussa; tässä on vain se, mikä Ranskassa on
 * toisin.
 *
 * ── MIKSI TÄMÄ TIEDOSTO ON OLEMASSA ────────────────────────────────
 *
 * Matkakirjan ihmeiden EUROOPAN ERÄ (27.8.2026) toi peliin kolme
 * kadonnutta eurooppalaista, ja yksi niistä on Tuileries'n palatsi.
 * Ranskalla ei ollut vielä yhtään fokuskohdetta, joten palatsi olisi
 * jäänyt kokonaan pois — mutta maan fokuslehti on jo olemassa
 * (js/packs/fokus-grc.js FOKUS_POHJAT.FRA, tiedosto FRA.webp), joten
 * merkillä on lehti, jonka päälle asettua. Se oli lisäyksen ainoa
 * tekninen ehto, sama kuin Egyptillä ja Irakilla edellisessä erässä.
 * Tiedosto on siis tarkoituksella yhden kohteen mittainen ja odottaa
 * ensimmäistä varsinaista Ranska-erää.
 *
 * MAAILMAN ERÄ (27.8.2026, neljätoista uutta ihmettä) toi listalle
 * toisen kohteen: Bastiljin. Se ei muuta yllä olevaa — lista on yhä
 * pelkkä ihme-erien jalusta.
 *
 * TÄMÄ TIEDOSTO EI OLE KOKO KUVA (korjattu 23.9.2026, Fablen
 * tarkistuspyyntö). "Varsinainen Ranska-erä" tuli myöhemmin, mutta
 * eri tiedostoihin: js/packs/maastokohteet-fra.js (K2-erä 6.9.2026 ja
 * kuvaerä 19.9.2026, mm. Mont-Saint-Michel, Chambord, Lascaux, Pont du
 * Gard, Carcassonne, Millaun silta, Camargue, Dune du Pilat) ja
 * js/packs/hahmotelma-fra.js (mm. Puy de Sancy, Canal du Midi). Kaikki
 * kolme tiedostoa yhdistyvät samaan KOHDE_MAAT.FRA-taulukkoon
 * (js/fokuskohteet.js), joten Ranskan TODELLINEN kokonaiskohdemäärä on
 * KOHDE_MAAT.FRA.length (55 kpl 23.9.2026, enemmän kuin Saksan 53) —
 * ei tämän tiedoston kahden rivin määrä. Uutta kohdetta lisättäessä
 * tarkista ensin KOHDE_MAAT.FRA, ettei kohde ole jo maastokohteena tai
 * hahmotelmana (docs/raportit/viesti-fable-jumi-fokuskohteet-fra-
 * 20260923.md).
 *
 * ── MIKSI OMA KOHDEPISTE EIKÄ IHME LOUVREN KYLKEEN ─────────────────
 *
 * Raamatun sääntö on, että KOKONAAN KADONNUT kohde saa kartalle oman
 * tähtimerkkinsä ja sen kortin kuva aukeaa suoraan ihmekuvaan. Louvre
 * on olemassa, Tuileries ei ole. Jos ihme ripustettaisiin Louvreen,
 * kartalla ei olisi tähteä lainkaan ja "Koe ihme" lupaisi Louvren
 * loistoaikaa mutta näyttäisi toisen rakennuksen. Sitä paitsi
 * Louvre-kohdetta ei ole olemassa: Ranskan lista alkaa tästä
 * tiedostosta. Palatsi saa siis oman pisteensä omalla paikallaan,
 * Louvren pihan länsipäässä, missä se seisoi.
 *
 * ── KOORDINAATIT: MOLEMMAT LAUDAT ──────────────────────────────────
 *
 * Toisin kuin Egyptillä ja Irakilla, Pariisi on Euroopan laudan kaavan
 * sisällä (kaava kattaa −11°…41°, js/packs/europe.js), joten rivillä
 * on molemmat laudat samaan tapaan kuin Kreikassa ja Italiassa:
 *
 *   maailmankartta — Millerin lieriö, LEVEYS 12000 / LON0 −175 /
 *     POHJOINEN 76 (tools/tee-fokuskartta.mjs laudanProjektio).
 *   europe — tasaväli, x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3.
 *
 * Kummatkin kaavat validoitiin ennen käyttöä jo kirjatulla kohteella
 * (Ateena: laskettu 6624,2 / 1881,9 ja 666,7 / 894,9 vastasi
 * kirjattuja 0,1 yksikön tarkkuudella). Piste osuu FRA-lehden
 * rajaukseen (x 5574–6240, y 1265–1818).
 *
 * ── KUVA ON PELIN OMA HAVAINNEKUVA ─────────────────────────────────
 *
 * Kohteella on VAIN `ihme`-kenttä eikä lainkaan `kuva`-kenttää, koska
 * palatsia ei ole: viimeiset muurit purettiin 1880-luvulla. Kuvakenttä
 * on `osoite` eikä `tiedosto` — polku repoon (assets/kartat/ihmeet/),
 * ei Commonsiin. Selite kertoo KOHTEESTA, lähderivi merkitsee kuvan
 * havainnekuvaksi ja peli piirtää kuvan kulmaan nauhan "Matkakirjan
 * ihme" — säännöt kokonaisuudessaan Kreikan tiedoston lohkossa
 * "MATKAKIRJAN IHME".
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * en-Wikipedia raakatekstinä (index.php?action=raw) artikkeli
 * "Tuileries Palace" 27.8.2026 — ei työaineistoa, joten lähderivi
 * osoittaa suoraan artikkeliin.
 */
export const FOKUSKOHTEET_FRA = [
  {
    /*
     * TUILERIES'N PALATSI. 2,3325 E / 48,86222 N — en-Wikipedia
     * "Tuileries Palace" (48°51′44″N 2°19′57″E). Piste on palatsin oma
     * paikka Louvren pihan länsipäässä, nykyisen Tuileries'n puutarhan
     * itälaidan terassilla.
     */
    id: 'tuileries',
    nimi: 'Tuileries\'n palatsi',
    // Kartalle lyhyt asu (js/fokuskohteet.js kohteenKarttanimi):
    // koko nimi ei mahdu nimiöön, ja lyhennys jättäisi siitä määritteen.
    nimio: 'Tuileries',
    tyyppi: 'historia',
    symboli: 'historia',
    // Pulun kysymykset kolme (Tuileries-koe 8.1, KK 11.16).
    kysymykset: [
      'Miksi palatsia ei rakennettu uudelleen, vaikka muurit jäivät pystyyn?',
      'Minne muualle palatsin palat päätyivät?',
      'Mitä palatsin paikalla on nykyään?',
    ],
    // Näkyvät muodot jaksojen tekstistä (Tuileries-koe 17.11.2026).
    korostukset: ['Katariina de Medici', 'Pariisin kommuuni'],
    nappi: 'Palatsi, jonka isoisä näki raunioina',
    laudat: {
      maailmankartta: { x: 5911.1, y: 1439.4 },
      europe: { x: 256.0, y: 608.5 },
    },
    // teksti lasketaan jaksoista tiedoston lopussa (Tuileries-koe).
    // Tuileries-koe (KK 11.38): jaksojen lähteet SK:n raportin kohdasta 2 (kaksi itsenäistä lähdettä per väite).
    // Lähdeaineisto: docs/raportit/tuileries-koe-teksti-20261117.md (ei pelaajalle näkyvään tekstiin).
    lahde: 'Matkakirjan oma teksti · lähteinä napoleon.org, Mérimée PA00099072, paris.fr ja Louvre '
      + '(tarkistettu 17.11.2026).',
    /*
     * JAKSOT (TUILERIES-KOE; omistaja 17.11.2026 klo 10.58 ja 10.51, KK 11.11
     * ja 11.16; suunnitelma scratchpad/keskustelukanava/suunnitelmat/
     * 20261117-nostot-tarinoiksi.md luku 8, sitova). Nosto kuunneltavana,
     * kuvitettuna tarinana: isoisän lause ja neljä kertojan jaksoa (8.1),
     * seitsemän kuvaa (8.2), tahdistus jaksoista ja tekstikohdista (8.3).
     * jaksot[].teksti on ainoa luettava teksti; kuva, toinen kuva
     * (`lisakuva` tekstikohdassa), vuosirivit, hologrammi ja karttapiste
     * luetaan samasta jaksosta. `kohta` = sana tai lause jakson tekstistä
     * (tasan kerran), jonka kohdalla asia tapahtuu. Muoto ja tarkistus:
     * tests/noston-jaksot.test.mjs. Kulkee pakettiin raakamoduulina
     * (moduulit/js/packs/fokuskohteet-fra.json); natiivi NostoJaksot.Lue.
     *
     * Tekstit, vuosirivit, kysymys ja kuvat: Sisältökirjurin lähdetarkistettu
     * raportti docs/raportit/tuileries-koe-teksti-20261117.md (PR 6983), KK
     * hyväksyi 17.11. klo 11.24. Lähdetaulukko raportin kohdassa 2.
     * `teksti` lasketaan jaksoista (alla tiedoston lopussa), jotta
     * vanha esitys ja lehti näyttävät saman tekstin, kunnes esitys lukee
     * jaksot. Syvennystarina `tuileriat` (fokusvirta-pariisi.js) ja sen
     * kopio (nahtavyysjutut.js) poistettu: pisteellä on yksi nosto.
     */
    // Tarinan otsikko (SK:n raportti, KK 11.24): kertoja lukee sen ensimmäisen kertojan jakson alussa; lehti käyttää sitä.
    otsikko: 'Tuileries 1871 — palatsi, joka myytiin kivinä',
    /*
     * Äänitteet (Äänittäjä 17.11.2026, KK:n äänityssana 11.29; avain PK
     * 17.11. 11.4x, KK 11.32 "vienti kun avain sovittu"): ämpäri
     * äänikansion polku <aanikansio>/<aanite>.mp3 ja .sanat.json (sanakohtaiset ajat).
     * Versiokansio on muuttumaton: uusi otto → v2 ja uusi aanikansio tähän.
     * Kertojan ensimmäinen äänite sisältää otsikon.
     */
    aanikansio: 'tuileries-koe/v1',
    jaksot: [
      /*
       * NOSTON ALKU (omistaja 17.11.2026 klo 19.23, kohta F, PYSYVÄ; KK 19.26; PT F4):
       * nosto alkaa KERTOJAN äänellä paikan nimellä, ja isoisän lausetta edeltää kertojan
       * esittely. Soitto datan järjestyksessä: nimi → esittely → isoisän koukku → jaksot.
       * Esittely ei toista päivämäärää eikä paljasta rauniota (isoisän oma lause kertoo
       * sen); isoisän käynti lokakuussa 1873 on pelin tarinaa, ei historiaväite.
       * Osat `nimi` ja `esittely` ovat lyhyitä ilman kuvaa; kuva tulee vasta koukulla.
       */
      { osa: 'nimi', aanite: 'nimi', teksti: 'Tuileries\'n palatsi.' },
      { osa: 'esittely', aanite: 'esittely', teksti: 'Isoisäsi kulki tästä matkallaan.' },
      {
        osa: 'koukku',
        aanite: 'isoisa',
        aani: 'isoisa',
        teksti: 'Pariisi, 1873. Kävelin tänään poltetun palatsin ohi. Katto on '
          + 'poissa, ja ikkuna-aukoista näkyy pelkkää taivasta.',
        kuva: 'raunio1873',
        vuodet: [{ vuosi: '1873', selite: 'isoisän matka', kohta: 'Pariisi, 1873' }],
      },
      {
        osa: 'tapahtuma',
        aanite: 'kertoja-1-otsikko-jakso2',
        teksti: 'Kaksi vuotta aiemmin, toukokuussa 1871, Pariisin kommuuni oli '
          + 'kukistumassa. Sen kannattajat sytyttivät Tuileries\'n palatsin. '
          + 'Tuli paloi yli kaksi vuorokautta ja poltti talon sisältä tyhjäksi.',
        kuva: 'palo',
        vuodet: [{ vuosi: '1871', selite: 'palatsi sytytetään', kohta: 'toukokuussa 1871' }],
      },
      {
        osa: 'tapahtuma',
        aanite: 'kertoja-2-jakso3',
        teksti: 'Palatsi oli seissyt Louvren vieressä yli kolmesataa vuotta. '
          + 'Kuningatar Katariina de Medici aloitti sen, ja siitä tuli Ranskan '
          + 'hallitsijoiden koti Pariisissa. Palon jälkeen kivimuurit jäivät '
          + 'pystyyn, vaikka katto ja sisustus olivat poissa. Poltettu '
          + 'kaupungintalo rakennettiin uudelleen, Tuileries\'ta ei.',
        kuva: 'loisto',
        lisakuva: { kuva: 'rauniot1871', kohta: 'Palon jälkeen' },
        vuodet: [{ vuosi: '1564', selite: 'rakentaminen alkaa' }],
      },
      {
        osa: 'kaanne',
        aanite: 'kertoja-3-jakso4',
        teksti: 'Tuileries seisoi katottomana yli kymmenen vuotta. Sitten kolmas '
          + 'tasavalta päätti purkaa sen. Purkuyrittäjä myi kiviä ja marmoria, '
          + 'ja suuresta erästä rakennettiin linna Korsikalle.',
        kuva: 'purku',
        lisakuva: { kuva: 'punta', kohta: 'rakennettiin linna Korsikalle' },
        hologrammi: 'sammuu',
        hologrammiKohta: 'päätti purkaa',
        vuodet: [
          { vuosi: '1882', selite: 'purkupäätös', kohta: 'päätti purkaa' },
          { vuosi: '1883', selite: 'purku valmis', kohta: 'päätti purkaa' },
        ],
      },
      {
        osa: 'tanaan',
        aanite: 'kertoja-4-jakso5',
        teksti: 'Palatsin paikalla on nyt avointa tilaa Louvren ja puutarhan '
          + 'välissä. Yksi sen paloista seisoo yhä Pariisissa: keskipaviljongin '
          + 'päätykolmio on puistossa nimeltä Square Georges Cain.',
        kuva: 'paatykolmio',
        // Piste fr-Wikipedia "Square Georges-Cain" (48°51′29″N 2°21′46″E).
        kartta: { nimi: 'Square Georges Cain', lat: 48.8581, lon: 2.3628 },
      },
    ],
    /*
     * jaksokuvat: avain → kuva (`kuvat` on kohteilla jo kuvalista). Kuvatekstit
     * ja lajit SK:n raportin kohta 7, kuvat 3, 6 ja 7 kohdat 4–5 (KK valitsi).
     * `tulossa` = tilattu (osoite vielä null): esitys näyttää paikkamerkin.
     */
    jaksokuvat: {
      raunio1873: {
        osoite: 'assets/kartat/nostot/nosto-tuileriat-loistoaika.webp',
        laji: 'havainnekuva',
        lyhyt: 'Poltetun palatsin rauniot vuonna 1873',
        lahde: 'Matkakirjan havainnekuva: rauniot isoisän matkavuonna',
      },
      palo: {
        // Tilaus 8.4 A valmis; KK hyväksyi 17.11.2026 klo 14.42 (P-261117-61). Ämpäri kuvat/ (vienti
        // proto-3d/_valmiit/tuileries-palo-kuva-vienti-20261117), SHA-256 874c9bb4…da2e631a, 2400 × 1600.
        osoite: 'https://media.matkakirja.app/kuvat/tuileries-palo-1871.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Tuileries palaa, toukokuu 1871',
        lahde: 'Tekoälyllä tuotettu havainnekuva; rakennusreferenssit Achille Quinet PH14096 ja '
          + 'Godefroy PH83415, Paris Musées / Carnavalet, CC0',
      },
      loisto: {
        osoite: 'https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-tuileries-loistoaika-v2.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Tuileries\'n palatsi loistoaikanaan',
        lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana '
          + 'aikanaan. Faktat: Musée du Louvre, tarkistettu 5.9.2026.',
      },
      rauniot1871: {
        tiedosto: "Vue des Tuileries après l'incendie de 1871, PH83415.jpg",
        laji: 'valokuva',
        lyhyt: 'Palatsin rauniot palon jälkeen',
        lahde: 'Godefroy, Henri Emile Cimarosa, Wikimedia Commons (CC0)',
      },
      purku: {
        // Tilaus 8.4 B valmis; KK hyväksyi 17.11.2026 klo 14.43 (P-261117-61); KK 15.53–15.54 korvasi B3-versiolla
        // (friisit häivytetty). Ämpäri kuvat/ (lähde proto-3d/_review-tarina-pariisi-20261117/
        // tarina-tuileries-5-purku-b3-friisi.jpg), SHA-256 f6032dfdb5147a4bec7bdd390f8474a5b2be83c347d07f6f7f7861379538d8b5.
        osoite: 'https://media.matkakirja.app/kuvat/tuileries-purku-1880-luku-b3.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Palatsin purku ja kivien myynti',
        lahde: 'Tekoälyllä tuotettu havainnekuva; rakennusreferenssit Godefroy PH83415 ja PH20009, '
          + 'Paris Musées / Carnavalet, CC0',
      },
      punta: {
        // Ämpärissä pienin kirjaimin (JU 11.32); osoite voittaa, tiedosto = Commons-nimi tekijätarkistukselle.
        osoite: 'https://media.matkakirja.app/kuvat/la-punta.jpg',
        tiedosto: 'La-punta.JPG',
        laji: 'valokuva',
        lyhyt: 'Château de la Punta, Korsika',
        lahde: 'Patricia Ripnel, Wikimedia Commons (CC BY-SA 3.0)',
      },
      paatykolmio: {
        // Ämpärissä pienin kirjaimin (JU 11.32); osoite voittaa, tiedosto = Commons-nimi tekijätarkistukselle.
        osoite: 'https://media.matkakirja.app/kuvat/georges-cain-05.jpg',
        tiedosto: 'Georges-cain-05.JPG',
        laji: 'valokuva',
        lyhyt: 'Päätykolmio, Square Georges Cain',
        lahde: 'Marais, Wikimedia Commons (CC BY-SA 3.0)',
      },
    },
    /*
     * KYSYMYS (KK 17.11.2026 11.24; SK:n raportti kohta 1): vanha visa
     * ("Mihin kivet päätyivät?") ei enää käy, koska kuva 6 näyttää vastauksen.
     */
    visa: {
      kysymys: 'Mitä Tuileries\'n palatsista jäi pystyyn palon jälkeen?',
      vaihtoehdot: [
        'Kivimuurit',
        'Katto ja kupoli',
        'Vain keskipaviljonki',
      ],
      oikea: 0,
      fakta: 'Tulipalo vei palatsin katon ja sisustan, mutta kivimuurit jäivät '
        + 'pystyyn; kaupungintalokin rakennettiin uudelleen.',
    },
    /*
     * TYÖNJAKO SYVENNYSTARINAN KANSSA (1.9.2026, nostojen sisältöaudit).
     * Samasta palatsista, samasta vuoden 1871 palosta ja samasta
     * pisteestä kertoi kaksi korttia: tämä kohde ja Pariisin
     * syvennystäky `tuileriat` (js/packs/fokusvirta-pariisi.js).
     * Kumpaakaan ei poistettu. TÄMÄ KORTTI ON PALATSI — mikä se oli ja
     * miten se poltettiin — eikä sen tekstiä ole muutettu, koska
     * `korostukset`, `kysymykset` ja alempi kadonneen ihmeen kortti
     * nojaavat siihen. SYVENNYS ON RAUNIO: ne yksitoista vuotta, jotka
     * isoisä näki, ja se mihin palatsin kivet hajosivat. Palon resepti
     * (petroli, terva, tärpätti, 48 tuntia) on nyt vain täällä.
     */
    /*
     * MATKAKIRJAN IHME (kadonnut) — säännöt js/packs/fokuskohteet-grc.js:n
     * samannimisessä lohkossa. Palatsia ei ole, joten `kadonnut: true`:
     * kartalla tähti ja kortissa tämä kuva ensimmäisenä — ja ainoana.
     *
     * TÄMÄ KOHDE KOSKETTAA PÄIVÄKIRJAA SUORAAN: palatsi paloi 1871 ja
     * viimeiset muurit purettiin 30.9.1883, joten isoisä näki matkallaan
     * 1873 täsmälleen sen välitilan, jota ei ole enää kummassakaan
     * päässä — mustuneet muurit keskellä Pariisia. Selite sanoo sen
     * ääneen.
     *
     * Loistoaika-v2 (kuvaputki, omistaja hyväksynyt 5.9.2026): kohde
     * omana aikanaan, ei nykyajan elementtejä.
     */
    ihme: {
      osoite: 'https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-tuileries-loistoaika-v2.jpg',
      kadonnut: true,
      lyhyt: 'Palatsin ompelijan tytär ihastelee kristallikruunua; neljä vuotta myöhemmin palatsi palaa poroksi.',
      selite: 'Palatsin ompelija kiirehtii iltavastaanoton pukua sisään, mutta '
        + 'hänen tyttärensä pysähtyy katsomaan palvelijoiden kantamaa '
        + 'kristallikruunua. Lapselle pitkä kivijulkisivu on satulinna; '
        + 'äidille se on työpaikka, jossa myöhästyminen huomataan. Neljä '
        + 'vuotta myöhemmin palatsi palaa, eikä tästä keisarillisesta '
        + 'kodista jää puutarhan ja Louvren väliin muuta kuin avoin tila.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana '
        + 'aikanaan. Faktat: Musée du Louvre — From Royal Garden to Public '
        + 'Park, tarkistettu 5.9.2026.',
      url: 'https://www.louvre.fr/en/explore/the-palace/from-royal-garden-to-public-park',
    },
  },
  {
    /*
     * LOUVRE + MONA LISAN VARKAUS 1911 (Pariisin nostot uudella tavalla, omistaja 17.11.2026
     * klo 20.06; KK:n erä 1, paikka 3). Yksi merkki, yksi nosto: Louvren nähtävyyspiste
     * (maakartat.js `Louvre`) avaa tämän; skandaali `mona-lisan-varkaus-1911` on tässä
     * jaksoina eikä enää kartan merkki. Tuileries'n palatsin tarina (palatsi Louvren pihalla)
     * on oma nostonsa `tuileries`: tässä ei toisteta sitä. Tarina on Mona Lisan varkaus ja
     * sen käänne (varas, jonka poliisi oli jo kuulustellut). Piste: Louvre, en-/fi-Wikipedia
     * (Wikidata Q19675 P625), sama kuin kartan piste 48,861 N / 2,3358 E; laudat laskettu
     * tools/johda-maastokohteet.mjs `laudat`-funktiolla (sama kaava kuin Tuileries'llä).
     * Lähdetaulukko: docs/raportit/louvre-nosto-teksti-20261117.md.
     */
    id: 'louvre',
    nimi: 'Louvre',
    tyyppi: 'kulttuuri',
    symboli: 'kulttuuri',
    // Pulun kysymykset kolme: skandaalin kaksi entistä + yksi uusi (vastauksia ei kirjoiteta).
    kysymykset: [
      'Miten Mona Lisa pääsi ulos Louvresta kenenkään huomaamatta?',
      'Miksi Mona Lisa palasi Louvreen kuuluisampana kuin lähti?',
      'Miksi Peruggia luuli Mona Lisan kuuluvan Italialle?',
    ],
    korostukset: ['Mona Lisa', 'Vincenzo Peruggia'],
    nappi: 'Museo, jonka seinältä taulu katosi',
    laudat: {
      maailmankartta: { x: 5911.2, y: 1439.4 },
      europe: { x: 256.0, y: 608.6 },
    },
    // teksti lasketaan jaksoista tiedoston lopussa.
    lahde: 'Matkakirjan oma teksti · lähteinä Musée du Louvre, Sortiraparis, Europeana, CrimeReads ja '
      + 'Spokesman-Review / Washington Post (tarkistettu 17.11.2026).',
    otsikko: 'Mona Lisa 1911 — taulu, joka katosi',
    /*
     * Äänitteitä ei ole vielä: `aanikansio` ja jaksojen `aanite` lisätään, kun Äänittäjä on
     * äänittänyt (äänitysjonon rivit ovat data/aanitysjono.tsv:ssä). Siihen asti jaksot
     * kuuluvat suoratoistona.
     */
    jaksot: [
      // Noston alku (omistaja 17.11.2026 klo 19.23 F, PYSYVÄ): kertojan nimi, esittely, sitten isoisä.
      { osa: 'nimi', teksti: 'Louvre.' },
      { osa: 'esittely', teksti: 'Isoisäsi kulki tästä ohi matkallaan.' },
      {
        osa: 'koukku',
        aani: 'isoisa',
        teksti: 'Pariisi, 1873. Kävelin tänään pitkin Louvren julkisivua ja yritin '
          + 'laskea ikkunat. Menetin laskun kolmesti.',
        kuva: 'julkisivu',
        vuodet: [{ vuosi: '1873', selite: 'isoisän matka', kohta: 'Pariisi, 1873' }],
      },
      {
        osa: 'tapahtuma',
        teksti: 'Lähes neljäkymmentä vuotta myöhemmin, maanantaina elokuussa, Louvre '
          + 'oli suljettu. Valkoiseen työtakkiin pukeutunut mies nosti Mona Lisan '
          + 'seinältä ja jätti kehyksen portaikkoon. Lukitun oven avasi hänelle '
          + 'putkimies, ja taulu lähti ulos.',
        kuva: 'varkaus',
        lisakuva: { kuva: 'monalisa', kohta: 'Mona Lisan' },
        vuodet: [{ vuosi: '1911', selite: 'taulu varastetaan', kohta: 'elokuussa' }],
      },
      {
        osa: 'tapahtuma',
        teksti: 'Kukaan ei huomannut mitään ennen seuraavaa päivää. Silloin maalari '
          + 'tuli kopioimaan taulua ja löysi tyhjän seinän. Poliisi pidätti runoilija '
          + 'Guillaume Apollinairen, ja Pablo Picasso joutui epäillyksi. Ihmiset '
          + 'jonottivat katsomaan tyhjää seinää.',
        kuva: 'tyhja-seina',
      },
      {
        osa: 'kaanne',
        teksti: 'Varas oli Louvressa työskennellyt lasittaja Vincenzo Peruggia. '
          + 'Poliisi oli kuulustellut häntä ja uskonut hänen selityksensä. Taulu '
          + 'odotti laatikossa yli kaksi vuotta. Sitten hän tarjosi sitä '
          + 'firenzeläiselle taidekauppiaalle, joka hälytti poliisin. Peruggia '
          + 'väitti vieneensä sen takaisin Italiaan, vaikka Leonardo oli itse '
          + 'tuonut taulun Ranskaan.',
        kuva: 'peruggia',
        vuodet: [{ vuosi: '1913', selite: 'varas jää kiinni', kohta: 'Sitten hän tarjosi' }],
      },
      {
        osa: 'tanaan',
        teksti: 'Mona Lisa palasi Louvreen, ja varkaus teki siitä entistä '
          + 'kuuluisamman. Nykyään se on Louvren ensimmäisessä kerroksessa. Sen '
          + 'edessä on jono, ja taulua vartioidaan tarkasti.',
        kuva: 'jono',
        vuodet: [{ vuosi: '1914', selite: 'taulu palaa Louvreen', kohta: 'palasi Louvreen' }],
      },
    ],
    /*
     * jaksokuvat: kaikki jo olemassa olevia (ei uusia generoituja kuvia): havainnekuva
     * skandaalin ämpärikuvasta, muut Commonsin vapaita kuvia (lisenssit luettu 17.11.2026).
     * Viimeinen kuva on aito nykyvalokuva.
     */
    jaksokuvat: {
      julkisivu: {
        tiedosto: 'Paris 1er Louvre Colonnade 559.jpg',
        laji: 'valokuva',
        lyhyt: 'Louvren itäjulkisivu',
        lahde: 'GFreihalter, Wikimedia Commons (CC BY-SA 4.0)',
      },
      varkaus: {
        osoite: 'https://media.matkakirja.app/kohtaamiset/kuvajono/skandaali-mona-lisan-varkaus-1911-photo-v1.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Peruggia kantaa taulun ulos Louvresta',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Faktat: Musée du Louvre (The theft of the century); '
          + 'huoltoportaikon kohtaus on dramatisoitu.',
      },
      monalisa: {
        tiedosto: 'Leonardo da Vinci - Mona Lisa (Louvre, Paris).jpg',
        laji: 'maalaus',
        lyhyt: 'Leonardo da Vincin Mona Lisa',
        lahde: 'Leonardo da Vinci, Musée du Louvre; Wikimedia Commons (public domain)',
      },
      'tyhja-seina': {
        tiedosto: 'Mona Lisa stolen-1911.jpg',
        laji: 'valokuva',
        lyhyt: 'Tyhjä seinä Louvressa, elokuu 1911',
        lahde: 'Tuntematon kuvaaja, 1911, Wikimedia Commons (public domain)',
      },
      peruggia: {
        tiedosto: 'Vincenzo Perugia.jpg',
        laji: 'valokuva',
        lyhyt: 'Vincenzo Peruggian poliisikortti',
        lahde: 'Tuntematon tekijä, Pariisin poliisin kortti 1909, Wikimedia Commons (public domain)',
      },
      jono: {
        tiedosto: 'Crowd in front of the Mona Lisa 1.jpg',
        laji: 'valokuva',
        lyhyt: 'Jono Mona Lisan edessä Louvressa',
        lahde: 'Amaury Laporte, Wikimedia Commons (CC BY 2.0)',
      },
    },
    /*
     * KYSYMYS (yksi per paikka; säilyy skandaalin visasta, KK 17.11.2026 "kysymystehtävät
     * säilyvät"): vastaus on kertomuksessa, ei vuosiriveissä eikä kuvateksteissä.
     */
    visa: {
      kysymys: 'Missä kaupungissa Mona Lisa löytyi yli kaksi vuotta varkauden jälkeen?',
      vaihtoehdot: [
        'Milanossa',
        'Firenzessä',
        'Roomassa',
      ],
      oikea: 1,
      fakta: 'Peruggia tarjosi taulua firenzeläiselle taidekauppiaalle, joka hälytti poliisin; '
        + 'varas jäi kiinni Firenzessä.',
    },
  },
  /*
   * ── MATKAKIRJAN IHMEIDEN MAAILMAN ERÄ (27.8.2026) ────────────────
   *
   * BASTILJI, listan toinen kohde. Tuileries yllä on ennallaan; tämä
   * on sen perässä omana eränään samaan tapaan kuin Italian ja Kreikan
   * tiedostoissa.
   *
   * PARIISI ON PELILAATTA, BASTILJI EI OLE. Sama sääntö ja sama
   * ratkaisu kuin Forum Romanumilla Roomassa (js/packs/
   * fokuskohteet-ita.js): kohde on yksi nimetty paikka kaupungin
   * sisällä, ei toinen Pariisi. Merkki asettuu kaupunkimerkin viereen
   * niputuspassin sarakkeeseen (js/fokusniput.js), aivan kuten
   * Tuileries'n merkki jo tekee.
   *
   * ESITYSTAPA ON "KADONNUT" (`kadonnut: true`). Linnoitus purettiin
   * heti valtauksen jälkeen 1789–1790, eikä paikalla ole siitä enää
   * mitään pystyssä: kartalla siis tähti ja kortissa ihmekuva
   * ensimmäisenä ja ainoana. Aukiolla on nyt heinäkuun pylväs ja
   * Opéra Bastille — kummastakin voisi ottaa valokuvan, mutta kumpikaan
   * ei ole tämä kohde.
   *
   * 2,36917 E / 48,85333 N — en-Wikipedia "Bastille" (tietolaatikon
   * coordinates). Piste on Place de la Bastille, aukio joka kattaa
   * suurimman osan linnoituksen vanhasta paikasta. Laskettu samoilla
   * kaavoilla kuin Tuileries yllä; piste osuu FRA-lehden rajaukseen
   * (x 5574–6240, y 1265–1818).
   */
  {
    id: 'bastilji',
    nimi: 'Bastilji',
    tyyppi: 'historia',
    symboli: 'historia',
    kysymykset: [
      'Miksi juuri Bastiljista tuli vallankumouksen vertauskuva?',
      'Millaista elämä linnoituksen sisällä oli?',
      'Mihin Bastiljin kivet päätyivät?',
    ],
    // Näkyvät muodot jaksojen tekstistä (Bastilji-nosto 17.11.2026).
    korostukset: ['Palloy', 'Henri-Galli'],
    nappi: 'Linnoitus, jota ei enää ole — mutta jonka päivää juhlitaan',
    laudat: {
      maailmankartta: { x: 5912.3, y: 1439.7 },
      europe: { x: 256.7, y: 608.8 },
    },
    // teksti lasketaan jaksoista tiedoston lopussa (kuten Tuileries).
    // Lähdeaineisto: docs/raportit/bastilji-nosto-teksti-20261117.md (ei pelaajalle näkyvään tekstiin).
    lahde: 'Matkakirjan oma teksti · lähteinä Larousse, Futura, Hérodote, Pariisin kaupungin Parcours Révolution, '
      + 'paris.fr ja Ranskan kulttuuriministeriö (tarkistettu 17.11.2026).',
    /*
     * JAKSOT (omistaja 17.11.2026 klo 20.06, P-261117-98; Tuileries'n malli, PR 7073). Vanhat tekstit
     * (kohteen oma teksti, nähtävyysjutut Bastilji ja Bastilji 1789) kirjoitettu uudelleen jaksoiksi:
     * faktat kahdesta itsenäisestä lähteestä, raportti docs/raportit/bastilji-nosto-teksti-20261117.md.
     * Historian hetki `ranskan-vallankumous-bastilji-1789` (lehden sivu ja sen kartapiste) jää ennalleen.
     */
    otsikko: 'Bastilji 1789 — linna, joka jaettiin kivinä',
    aanikansio: 'bastilji/v1',
    jaksot: [
      { osa: 'nimi', aanite: 'nimi', teksti: 'Bastilji.' },
      { osa: 'esittely', aanite: 'esittely', teksti: 'Isoisäsi kulki tästä matkallaan.' },
      {
        osa: 'koukku',
        aanite: 'isoisa',
        aani: 'isoisa',
        teksti: 'Pariisi, 1873. Kartassani lukee Bastilji, ja astuin aukiolle mitta kädessä. '
          + 'Linnaa ei ole. Keskellä seisoo vain korkea pylväs, jonka päällä on patsas.',
        kuva: 'pylvas1860',
        vuodet: [{ vuosi: '1873', selite: 'isoisän matka', kohta: 'Pariisi, 1873' }],
      },
      {
        osa: 'tapahtuma',
        aanite: 'kertoja-1-otsikko-jakso2',
        teksti: 'Bastilji rakennettiin 1300-luvun lopulla vartioimaan Pariisin itäistä porttia, '
          + 'ja siinä oli kahdeksan tornia. Myöhemmin siitä tuli valtionvankila. Kuningas saattoi '
          + 'lähettää sinne ihmisen kirjeellä, ilman oikeudenkäyntiä, ja linnasta tuli mielivallan symboli.',
        kuva: 'loisto',
        lisakuva: { kuva: 'silvestre', kohta: 'kahdeksan tornia' },
      },
      {
        osa: 'tapahtuma',
        aanite: 'kertoja-2-jakso3',
        teksti: 'Heinäkuun 14. päivänä 1789 pariisilaisilla oli Invalidien sotilaskodista otettuja '
          + 'aseita mutta ei ruutia, ja ruutia uskottiin olevan Bastiljissa. Vankeja oli vain seitsemän. '
          + 'Silti väkijoukko valtasi linnan, ja kuvernööri surmattiin.',
        kuva: 'valtaus',
        lisakuva: { kuva: 'portti', kohta: 'Silti väkijoukko valtasi linnan' },
        vuodet: [{ vuosi: '1789', selite: 'valtaus', kohta: 'päivänä 1789' }],
      },
      {
        osa: 'kaanne',
        aanite: 'kertoja-3-jakso4',
        teksti: 'Purku alkoi jo samana iltana. Työmaata johti Palloy, jonka työpajassa kivistä '
          + 'veistettiin pienoismalleja ja muistoesineitä. Osa kivistä päätyi Pariisin siltoihin, ja '
          + 'muutamassa vuodessa linnasta ei jäänyt pystyyn mitään.',
        kuva: 'purku',
        hologrammi: 'sammuu',
        hologrammiKohta: 'Purku alkoi',
      },
      {
        osa: 'tanaan',
        aanite: 'kertoja-4-jakso5',
        teksti: 'Linnan paikalla on nyt aukio. Aukion pylväs muistuttaa vuoden 1830 vallankumouksesta, '
          + 'ei 1789:stä. Tornin pohjakiviä on koottu Henri-Galli-puistoon, ja metroaseman laiturilla '
          + 'näkyy pala vallihaudan muuria.',
        kuva: 'metro',
        vuodet: [
          { vuosi: '1830', selite: 'vallankumous', kohta: '1830' },
          { vuosi: '1840', selite: 'pylväs valmistuu', kohta: 'pylväs' },
          { vuosi: '1899', selite: 'tornin pohja löytyy', kohta: 'pohjakiviä' },
        ],
        // Square Henri-Galli 48,8513 N / 2,3618 E (fr-Wikipedia ja OpenStreetMap).
        kartta: { nimi: 'Square Henri-Galli', lat: 48.8513, lon: 2.3618 },
      },
    ],
    jaksokuvat: {
      pylvas1860: {
        tiedosto: 'Colonne de Juillet, Place de la Bastille, 11ème arrondissement, Paris. Vers 1865. PH18320.jpg',
        laji: 'valokuva',
        lyhyt: 'Bastiljin aukio ja pylväs 1860-luvulla',
        lahde: 'Pierre Emonts, Musée Carnavalet / Paris Musées, Wikimedia Commons (CC0)',
      },
      loisto: {
        osoite: 'https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-bastilji-loistoaika-v2.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Bastilji loistoaikanaan',
        lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan. '
          + 'Faktat: Musée Carnavalet — La Bastille au XVIIIe siècle, tarkistettu 5.9.2026.',
      },
      silvestre: {
        tiedosto: 'Le Chasteau de la Bastille de Paris, hors la Porte Sainct Antoine. G.285.jpg',
        laji: 'piirros',
        lyhyt: 'Bastiljin linnoitus 1600-luvulla',
        lahde: 'Israël Silvestre 1650–1660, Musée Carnavalet, Wikimedia Commons (CC0)',
      },
      valtaus: {
        tiedosto: 'Jean-Baptiste Lallemand - La prise de la Bastille, le 14 juillet 1789 - P1718 - Musée Carnavalet.jpg',
        laji: 'maalaus',
        lyhyt: 'Bastiljin valtaus 14. heinäkuuta 1789',
        lahde: 'Jean-Baptiste Lallemand 1789, Musée Carnavalet, Wikimedia Commons (PD)',
      },
      portti: {
        osoite: 'https://media.matkakirja.app/kohtaamiset/historian-hetket/hetki-ranskan-vallankumous-bastilji-1789-lahi-photo-v4.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Pariisilainen Bastiljin portilla 1789',
        lahde: 'Matkakirjan havainnekuva. Faktat: Musée Carnavalet — Taking of the Bastille, tarkistettu 5.9.2026.',
      },
      purku: {
        tiedosto: 'The Bastille in the first days of its demolition, by Hubert Robert.jpg',
        laji: 'maalaus',
        lyhyt: 'Bastiljin purku alkaa heinäkuussa 1789',
        lahde: 'Hubert Robert 1789, Wikimedia Commons (PD)',
      },
      metro: {
        tiedosto: 'Bastille Metro 2, August 18, 2012.jpg',
        laji: 'valokuva',
        lyhyt: 'Muurin pala metroaseman laiturilla',
        lahde: 'Shihchuan, Wikimedia Commons (CC BY-SA 2.0)',
      },
    },
    /*
     * KYSYMYS (KK 17.11.2026 21.34): paikan oma kysymys koskee tarinan käännettä (purku); historian hetken
     * ruutivisa jää hetken omalle sivulle, eikä paikan kysymys toista sitä. Faktat: Parcours Révolution
     * (Palloy lähetti työmiehet samana iltana ilman virallista lupaa; puolentoista vuoden päästä ei jäänyt mitään)
     * ja Hérodote (katsojat irrottivat kiviä torneista jo 14.7. iltana).
     */
    visa: {
      kysymys: 'Milloin Bastiljin purku alkoi?',
      vaihtoehdot: [
        'Valtauspäivän iltana',
        'Vasta vuonna 1792, kun tasavalta julistettiin',
        'Vasta kuukausien päästä, kun kuningas oli antanut luvan',
      ],
      oikea: 0,
      fakta: 'Palloy lähetti työmiehet linnalle ilman virallista lupaa jo 14. heinäkuun iltana; '
        + 'puolentoista vuoden päästä linnasta ei ollut jäljellä mitään.',
    },
    /*
     * MATKAKIRJAN IHME (kadonnut) — säännöt js/packs/fokuskohteet-grc.js:n
     * samannimisessä lohkossa. Linnoitusta ei ole, joten `kadonnut: true`
     * ja kortissa on vain tämä kuva.
     *
     * MITÄ SELITE EI VÄITÄ: aukiolla on yhä nähtävissä hitusen
     * alkuperäistä kiveä (artikkelin tietolaatikko: "limited stonework
     * survives"), mutta linnoitusta itseään ei ole. Selite sanoo, mitä
     * paikalla NYT on, eikä väitä paikkaa tyhjäksi.
     *
     * Loistoaika-v2 (kuvaputki, omistaja hyväksynyt 5.9.2026): kohde
     * omana aikanaan, ei nykyajan elementtejä.
     */
    ihme: {
      osoite: 'https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-bastilji-loistoaika-v2.jpg',
      kadonnut: true,
      lyhyt: 'Käsityöläinen katsoo Bastillin kahdeksaa tornia, jotka symboloivat kuninkaan rajatonta valtaa.',
      selite: 'Faubourg Saint-Antoinen käsityöläinen pysäyttää kärrynsä '
        + 'vallihaudan reunalle ja nostaa katseensa vankilan kahdeksaan '
        + 'torniin. Linnoituksessa oli tuolloin vain vähän vankeja, mutta '
        + 'tavalliselle pariisilaiselle suljetut portit merkitsivät silti '
        + 'kuninkaan valtaa, joka saattoi ulottua ihmisen elämään ilman '
        + 'julkista oikeudenkäyntiä.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana '
        + 'aikanaan. Faktat: Musée Carnavalet — La Bastille au XVIIIe '
        + 'siècle, tarkistettu 5.9.2026.',
      url: 'https://www.parismuseescollections.paris.fr/fr/musee-carnavalet/oeuvres/la-bastille-au-xviiie-siecle',
    },
  },
  {
    /*
     * EIFFEL-TORNI (Pariisin nosto uudella tavalla, SK 17.11.2026; malli Tuileries'n palatsi). Yksi merkki, yksi nosto:
     * tähän yhdistyvät kohdekartan nähtävyys "Eiffel-torni", tarinapaikka "Eiffel-torni 1888" (hetki eiffel-torni-1888)
     * ja tarinapaikka "Lustig 1925" (täkynosto lustig-eiffel). Kohdekartan piste "Eiffel-torni" (maakartat.js) avaa tämän
     * (`nosto: 'eiffel-torni'`); 72 nimeä yhdistetty tänään-jaksoon (KK 17.11.2026 21.55).
     * 48,85822 N / 2,2945 E — en-Wikipedia "Eiffel Tower"; laudat samat kuin vanhalla täkynostolla `lustig-eiffel`.
     * Pelkkä historia ja tapahtumat: tornin voisi näyttää isona kuvana, mutta tarina kulkee kentältä (1873) torniin.
     * Lähdetaulukko: docs/raportit/eiffel-nosto-teksti-20261117.md.
     */
    id: 'eiffel-torni',
    nimi: 'Eiffel-torni',
    tyyppi: 'tekniikka',
    symboli: 'tekniikka',
    // Pulun kysymykset kolme (vanhoista korteista; vastauksia ei kirjoitettu).
    kysymykset: [
      'Miten Eiffel-tornin romukauppa saatiin kuulostamaan uskottavalta?',
      'Miksi tornia ei purettu, vaikka sen luvattiin seisovan vain kaksikymmentä vuotta?',
      'Oliko Eiffel-tornin purkamisesta oikeasti puhetta?',
    ],
    korostukset: ['Victor Lustig', 'Champ de Mars|Champ de Marsin'],
    nappi: 'Torni, jonka piti seistä vain kaksikymmentä vuotta',
    laudat: {
      maailmankartta: { x: 5909.8, y: 1439.5 },
      europe: { x: 255.3, y: 608.6 },
    },
    // teksti lasketaan jaksoista tiedoston lopussa.
    lahde: 'Matkakirjan oma teksti · lähteinä Mental Floss, Ripley\'s, Today I Found Out ja The Hustle (Lustig), Snippets of Paris, '
      + 'Science News Explores, Architizer ja Mental Floss (torni) sekä introducingparis.com ja en-Wikipedia "Champ de Mars" '
      + '(tarkistettu 17.11.2026).',
    otsikko: 'Eiffel-torni 1925 — myyty romuksi',
    jaksot: [
      // Noston alku: kertojan nimi ja esittely ennen isoisän lausetta (omistaja 19.23 F; sama kuin Tuileries).
      { osa: 'nimi', teksti: 'Eiffel-torni.' },
      { osa: 'esittely', teksti: 'Isoisäsi kulki tästä matkallaan.' },
      {
        osa: 'koukku',
        aani: 'isoisa',
        teksti: 'Pariisi, 1873. Mittasin tänään Champ de Marsin askelin. Se on sotilaiden harjoituskenttä, '
          + 'tasainen kuin pöytä.',
        // Koukulla ei ole kuvaa (KK 17.11.2026 21.57): kenttää ennen tornia ei löytynyt; ei paikkamerkkiä pelaajalle.
        vuodet: [{ vuosi: '1873', selite: 'isoisän matka', kohta: 'Pariisi, 1873' }],
      },
      {
        osa: 'tapahtuma',
        teksti: 'Neljätoista vuotta myöhemmin kentälle alettiin rakentaa rautatornia. Se koottiin tuhansista osista, '
          + 'jotka työmiehet niittasivat yhteen yhä korkeammalla. Moni pariisilainen vihasi tornia, '
          + 'ja sen piti seistä vain kaksikymmentä vuotta.',
        kuva: 'rakenteilla',
        lisakuva: { kuva: 'niittaus', kohta: 'työmiehet niittasivat yhteen' },
        vuodet: [
          { vuosi: '1887', selite: 'taiteilijavetoomus', kohta: 'vihasi tornia' },
          { vuosi: '1889', selite: 'torni valmis' },
        ],
      },
      {
        osa: 'tapahtuma',
        teksti: 'Kaksikymmentä vuotta kului, mutta kukaan ei purkanut tornia. Sen huipulla oli radioantenni, '
          + 'ja armeijalle siitä oli niin paljon hyötyä, että torni sai jäädä.',
        kuva: 'photochrom1900',
        vuodet: [{ vuosi: '1909', selite: 'tornin purkuaika' }],
      },
      {
        osa: 'kaanne',
        teksti: 'Vuonna 1925 huijari Victor Lustig luki lehdestä, että tornin kunnossapito on kallista. '
          + 'Väärennetyin virkapaperein hän esiintyi ministeriön apulaisjohtajana ja myi muka tornin '
          + 'romukauppiaalle, joka maksoi hänelle myös lahjuksen. Kauppias häpesi eikä ilmoittanut '
          + 'poliisille, joten Lustig palasi ja yritti uudestaan.',
        kuva: 'lustig',
        vuodet: [{ vuosi: '1925', selite: 'Lustigin huijaus', kohta: 'Vuonna 1925' }],
      },
      {
        osa: 'tanaan',
        teksti: 'Torni seisoo yhä, ja se maalataan uudelleen noin seitsemän vuoden välein. '
          + 'Kenttä, jonka isoisäsi mittasi, on nykyään puisto tornin jalalla. Tornin ensimmäisen kerroksen '
          + 'alle on kirjoitettu 72 ranskalaisen tiedemiehen ja insinöörin nimeä kullatuin kirjaimin.',
        kuva: 'nykyinen',
      },
    ],
    jaksokuvat: {
      rakenteilla: {
        tiedosto: 'Louis-Emile Durandelle, The Eiffel Tower - State of the Construction, 1888.jpg',
        laji: 'valokuva',
        lyhyt: 'Torni rakenteilla vuonna 1888',
        lahde: 'Louis-Émile Durandelle 1888, Wikimedia Commons (PD)',
      },
      niittaus: {
        osoite: 'https://media.matkakirja.app/kohtaamiset/historian-hetket/hetki-eiffel-torni-1888-lahi-photo-v4.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Niittaajat tornin työmaalla',
        lahde: 'Matkakirjan havainnekuva. Faktat: Eiffel Tower official site — history, tarkistettu 5.9.2026.',
      },
      photochrom1900: {
        tiedosto: 'Eiffel Tower, full-view looking toward the Trocadero, Exposition Universal, 1900, Paris, France.jpg',
        laji: 'valokuva',
        lyhyt: 'Eiffel-torni noin vuonna 1900',
        lahde: 'Library of Congress, Wikimedia Commons (PD)',
      },
      lustig: {
        osoite: 'assets/kartat/nostot/nosto-lustig-eiffel-loistoaika.webp',
        laji: 'havainnekuva',
        lyhyt: 'Huijaus hotellin salongissa',
        lahde: 'Matkakirjan havainnekuva: hetki, jona torni myytiin',
      },
      nykyinen: {
        tiedosto: 'Eiffel Tower from Champ-de-Mars, Paris 5 February 2019.jpg',
        laji: 'valokuva',
        lyhyt: 'Eiffel-torni Champ de Marsilta',
        lahde: 'Alexandre Prévot, Wikimedia Commons (CC BY-SA 2.0)',
      },
    },
    // Yksi kysymys (vanhasta Lustig-kortista): vastaus on jaksossa 5, eikä mikään näkyvä ennen sitä paljasta sitä.
    visa: {
      kysymys: 'Miksi huijarin uhri ei ilmoittanut huijauksesta poliisille?',
      vaihtoehdot: [
        'Hän häpesi',
        'Hän sai rahansa takaisin',
        'Hän ei huomannut huijausta',
      ],
      oikea: 0,
      fakta: 'Lustig palasi Pariisiin ja yritti samaa temppua uudestaan; silloin joku ilmoitti, ja hän pakeni Yhdysvaltoihin.',
    },
  },
  {
    /*
     * SAINTE-CHAPELLE JA KAULANAUHA 1785 (Pariisin nostot uudella tavalla, erä 4 / 5; omistaja 17.11.2026).
     * 48,8554 N / 2,3450 E — Palais de la Cité'n palatsikappeli, jonka palatsissa Pariisin parlamentti
     * istui (PR 6964, valinta A). Yksi paikka = yksi nosto: vanha täkynosto `kaulanauha-1785`, nähtävyysjuttu
     * Kaulanauha 1785 ja nähtävyysjuttu Sainte-Chapelle on yhdistetty tähän.
     * Lähdeaineisto: docs/raportit/kaulanauha-nosto-teksti-20261117.md (ei pelaajalle näkyvään tekstiin).
     */
    id: 'sainte-chapelle',
    nimi: 'Sainte-Chapelle',
    tyyppi: 'historia',
    symboli: 'historia',
    // Pulun kysymykset kolme: vanhan kortin kaksi (toinen uudelleen sanottuna) + yksi uusi (vastauksia ei kirjoiteta).
    kysymykset: [
      'Miksi kardinaali uskoi tapaavansa kuningattaren?',
      'Mihin kaulanauhan timantit lopulta päätyivät?',
      'Miksi kuningattaren maine kärsi, vaikka hän ei ollut osallinen?',
    ],
    korostukset: ['Jeanne de La Motte', 'Rohan'],
    nappi: 'Kappeli, jonka vieressä tuomittiin kaulanauhan huijari',
    laudat: {
      maailmankartta: { x: 5911.5, y: 1439.7 },
      europe: { x: 256.3, y: 608.7 },
    },
    // teksti lasketaan jaksoista tiedoston lopussa.
    lahde: 'Matkakirjan oma teksti · lähteinä Château de Versailles, Hérodote, History Is Now, HistorySkills ja '
      + 'Sortiraparis (tarkistettu 17.11.2026).',
    otsikko: 'Kaulanauha 1785 — huijaus kuningattaren nimissä',
    /*
     * Äänitteitä ei ole vielä: `aanikansio` ja jaksojen `aanite` lisätään, kun Äänittäjä on
     * äänittänyt (äänitysjonon rivit ovat data/aanitysjono.tsv:ssä). Siihen asti jaksot
     * kuuluvat suoratoistona.
     */
    jaksot: [
      { osa: 'nimi', teksti: 'Sainte-Chapelle.' },
      { osa: 'esittely', teksti: 'Isoisäsi kulki tästä matkallaan.' },
      {
        osa: 'koukku',
        aani: 'isoisa',
        teksti: 'Pariisi, 1873. Löysin Sainte-Chapellen oikeuspalatsin pihalta. '
          + 'Ikkunat ovat niin täynnä pieniä kuvia, että luovutin niiden laskemisen.',
        kuva: 'piha',
        vuodet: [{ vuosi: '1873', selite: 'isoisän matka', kohta: 'Pariisi, 1873' }],
      },
      {
        osa: 'tapahtuma',
        teksti: 'Kuninkaan jalokivikauppiaat tekivät timanttikaulanauhan, jossa oli lähes 650 kiveä. '
          + 'Hinta oli 1,6 miljoonaa livreä, ja Marie Antoinette kieltäytyi ostamasta sitä. '
          + 'Huijari Jeanne de La Motte sai kardinaali de Rohanin uskomaan, että kuningatar halusi nauhan salaa.',
        kuva: 'nauha',
        lisakuva: { kuva: 'juoni', kohta: 'Huijari Jeanne de La Motte' },
      },
      {
        osa: 'tapahtuma',
        teksti: 'Elokuussa 1784 kardinaali tapasi Versailles\'n puistossa naisen, jonka hän luuli kuningattareksi. '
          + 'Alkuvuodesta 1785 hän sai nauhan kauppiailta ja luovutti sen Jeannelle. Kun kauppiaat '
          + 'pyysivät maksua, kuningatar vaati selvitystä, ja kardinaali pidätettiin.',
        kuva: 'rohan',
        vuodet: [
          { vuosi: '1784', selite: 'yöllinen tapaaminen', kohta: 'Elokuussa 1784' },
          { vuosi: '1785', selite: 'nauha luovutetaan', kohta: 'Alkuvuodesta 1785' },
        ],
      },
      {
        osa: 'kaanne',
        teksti: 'Oikeudenkäynti pidettiin Pariisin parlamentissa, joka istui Cité-saaren palatsissa. '
          + 'Toukokuussa 1786 kardinaali vapautettiin. Jeanne leimattiin varkaaksi ja vietiin vankilaan. '
          + 'Timantit oli jo myyty, moni niistä Lontoossa, ja kuningattaren maine kärsi pahasti.',
        kuva: 'viuhka',
        vuodet: [{ vuosi: '1786', selite: 'Rohan vapautetaan', kohta: 'Toukokuussa 1786' }],
      },
      {
        osa: 'tanaan',
        teksti: 'Sainte-Chapelle on yhä saman palatsin pihalla. Kuningas Ludvig IX rakennutti sen 1240-luvulla '
          + 'säilyttämään Kristuksen orjantappurakruunua. Ikkunoissa on yli tuhat kohtausta, ja kappeliin '
          + 'mennään turvatarkastuksen kautta.',
        kuva: 'ikkunat',
      },
    ],
    /*
     * jaksokuvat: kaikki jo olemassa olevia (ei uusia generoituja kuvia): havainnekuva skandaalin
     * ämpärikuvasta, muut Commonsin vapaita kuvia (lisenssit luettu 17.11.2026).
     */
    jaksokuvat: {
      piha: {
        tiedosto: 'Paris Sainte Chapelle East View 02.JPG',
        laji: 'valokuva',
        lyhyt: 'Sainte-Chapellen torni oikeuspalatsin rakennusten yllä',
        lahde: 'Uoaei1, Wikimedia Commons (CC BY-SA 4.0)',
      },
      nauha: {
        tiedosto: 'Collier de la Reine.jpg',
        laji: 'valokuva',
        lyhyt: 'Kuningattaren kaulanauhan jäljitelmä Breteuilin linnassa',
        lahde: 'Château de Breteuil, Wikimedia Commons (CC BY-SA 3.0); kuvassa on jäljitelmä, alkuperäinen on kadonnut',
      },
      juoni: {
        osoite: 'https://media.matkakirja.app/kohtaamiset/kuvajono/skandaali-kaulanauhajuttu-1785-photo-v1.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Huijarin juoni kuningattaren nimissä',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Faktat: Château de Versailles — L\'affaire du collier de la Reine; '
          + 'oppipojan kohtaus on dramatisoitu.',
      },
      rohan: {
        tiedosto: 'Cardinal Rohan2.jpg',
        laji: 'maalaus',
        lyhyt: 'Kardinaali de Rohan',
        lahde: 'Tuntematon taidemaalari, 1700-luku, Wikimedia Commons (public domain)',
      },
      viuhka: {
        tiedosto: 'L\'Affaire du Collier de la Reine, EV0120.jpg',
        laji: 'valokuva',
        lyhyt: 'Viuhka, jossa on kaulanauhajutun henkilöiden muotokuvat',
        lahde: 'Tuntematon tekijä, 1700-luku, Musée Carnavalet / Paris Musées, Wikimedia Commons (CC0)',
      },
      ikkunat: {
        tiedosto: 'Sainte-Chapelle, Paris, upper chapel windows.jpg',
        laji: 'valokuva',
        lyhyt: 'Yläkappelin lasimaalaukset',
        lahde: 'Gerda Arendt, Wikimedia Commons (CC0)',
      },
    },
    visa: {
      kysymys: 'Kuka kaulanauhajutussa tuomittiin vankilaan?',
      vaihtoehdot: [
        'Kardinaali de Rohan',
        'Jeanne de La Motte',
        'Marie Antoinette',
      ],
      oikea: 1,
      fakta: 'Pariisin parlamentti vapautti kardinaali Rohanin toukokuussa 1786; Jeanne de La Motte '
        + 'piestiin, leimattiin varkaaksi ja vietiin vankilaan.',
    },
  },
  {
    /*
     * CURIE 1898, VAJA (Pariisin nostot uudella tavalla, SK 18.11.2026; KK 00.40 hyväksyi tekstin).
     * Yksi merkki, yksi nosto: kartan "Curien vaja" (maakartat.js) avaa tämän. 48,842 N / 2,3476 E
     * (ESPCI, sama piste kuin hetken). Historian hetki `marie-curie-hangaari-1898` ja sen lehtisivu
     * JÄÄVÄT (KK-sääntö, kuten Eiffel 1888): piilopiste "Curie 1898" maakartat.js:ssä.
     * KK 00.40: jakso 5 laatta ilman "valokuvia"; vajan kuvaus jää (toinen lähde avattu: Gulf News
     * "The curious days of the Curies" sade ja huono tuuletus, AIP sivu "Making repeated separations").
     * Laatan sijainti: lähteet eroavat (Paris.fr: koulun sisäänkäynti 10 rue Vauquelin; Commons-kuva:
     * koulun seinä rue Pierre Brossolette -puolella), siksi tekstissä vain "koulun seinässä".
     * Teksti ja lähdetaulukko: docs/raportit/curie-nosto-teksti-20261118.md.
     */
    id: 'curie-1898',
    nimi: 'Curien vaja',
    tyyppi: 'tekniikka',
    symboli: 'tekniikka',
    // Pulun kysymykset kolme: vanhan hetken ensimmäinen + kaksi uutta (vastauksia ei kirjoiteta).
    kysymykset: [
      'Miksi alkuaineen ilmoittaminen ei vielä riittänyt tiedemiehille?',
      'Miksi Curiet työskentelivät vajassa eivätkä tavallisessa laboratoriossa?',
      'Miksi radium hohti pimeässä?',
    ],
    korostukset: ['Pierre Curie', 'Henri Becquerel'],
    nappi: 'Vaja, jossa radium eristettiin',
    laudat: {
      maailmankartta: { x: 5911.6, y: 1440.2 },
      europe: { x: 256.3, y: 609.1 },
    },
    // teksti lasketaan jaksoista tiedoston lopussa.
    lahde: 'Matkakirjan oma teksti · lähteinä AIP, History.com, Science Museum Group, Paris.fr ja Institut Curie '
      + '(tarkistettu 18.11.2026).',
    otsikko: 'Curie 1898 — hohtava alkuaine',
    /*
     * Äänitteitä ei ole vielä: `aanikansio` ja jaksojen `aanite` lisätään, kun Äänittäjä on
     * äänittänyt (äänitysjonon rivit ovat data/aanitysjono.tsv:ssä). Siihen asti jaksot
     * kuuluvat suoratoistona.
     */
    jaksot: [
      { osa: 'nimi', teksti: 'Curien vaja.' },
      { osa: 'esittely', teksti: 'Isoisäsi kulki tästä matkallaan.' },
      {
        osa: 'koukku',
        aani: 'isoisa',
        teksti: 'Pariisi, 1873. Eksyin tänään Latinalaiskortteliin. '
          + 'Kaduilla käveli opiskelijoita, ja jokaisella oli kirjoja kainalossa.',
        vuodet: [{ vuosi: '1873', selite: 'isoisän matka', kohta: 'Pariisi, 1873' }],
      },
      {
        osa: 'tapahtuma',
        teksti: 'Marie ja Pierre Curie tutkivat uraanimalmin sisältämää säteilyä. '
          + 'Heinäkuussa 1898 he ilmoittivat löytäneensä uuden alkuaineen. '
          + 'He nimesivät sen Marien kotimaan Puolan mukaan poloniumiksi. '
          + 'Joulukuussa he ilmoittivat toisen, radiumin.',
        kuva: 'marie',
        vuodet: [{ vuosi: '1898', selite: 'löytö ilmoitettu', kohta: 'Heinäkuussa 1898' }],
      },
      {
        osa: 'tapahtuma',
        teksti: 'Pelkkä ilmoitus ei riittänyt, vaan alkuaine piti saada puhtaana erilleen malmista. '
          + 'Työ tehtiin koulun pihan toisella puolella olevassa vajassa, joka oli ennen ollut ruumiinavaussali. '
          + 'Vaja oli huonosti tuuletettu eikä pitänyt sadetta, ja malmia kului tonneittain.',
        kuva: 'vaja',
      },
      {
        osa: 'kaanne',
        teksti: 'Työ vei yli kolme vuotta, ja lopulta heillä oli kymmenesosagramma puhdasta radiumkloridia. '
          + 'Iltaisin radium hohti pimeässä, ja Curiet ihailivat sitä. '
          + 'Marie sai fysiikan Nobelin Pierren ja Henri Becquerelin kanssa ja myöhemmin kemian Nobelin yksin.',
        kuva: 'laboratorio',
        vuodet: [
          { vuosi: '1902', selite: 'radiumkloridi', kohta: 'kymmenesosagramma' },
          { vuosi: '1903', selite: 'fysiikan Nobel', kohta: 'fysiikan Nobelin' },
          { vuosi: '1911', selite: 'kemian Nobel', kohta: 'kemian Nobelin' },
        ],
      },
      {
        osa: 'tanaan',
        teksti: 'Koulun seinässä on laatta, joka kertoo löydöstä. '
          + 'Marien myöhempi laboratorio on lähellä Curie-museona.',
        kuva: 'laatta',
      },
    ],
    /*
     * jaksokuvat: kaikki jo olemassa olevia (ei uusia generoituja kuvia): havainnekuva hetken
     * ämpärikuvasta, muut Commonsin vapaita kuvia (lisenssit luettu 18.11.2026).
     * Viimeinen kuva on aito nykyvalokuva.
     */
    jaksokuvat: {
      marie: {
        tiedosto: 'Marie Curie c. 1898.jpg',
        laji: 'valokuva',
        lyhyt: 'Marie Curie noin 1898',
        lahde: 'Tuntematon valokuvaaja, noin 1898, Wikimedia Commons (public domain)',
      },
      vaja: {
        osoite: 'https://media.matkakirja.app/kohtaamiset/historian-hetket/hetki-marie-curie-hangaari-1898-kauko-photo-v4.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Curien laboratorio oli pihavaja',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Faktat: AIP ja Paris.fr; vajan sisustus on dramatisoitu.',
      },
      laboratorio: {
        tiedosto: 'Maria Skłodowska-Curie i Pierre Curie w laboratorium (1900).jpg',
        laji: 'valokuva',
        lyhyt: 'Marie ja Pierre Curie laboratoriossa noin 1900',
        lahde: 'Tuntematon valokuvaaja, noin 1900, Wikimedia Commons (public domain)',
      },
      laatta: {
        tiedosto: 'Plaque - Location de découvert du radium - rue Pierre Brossolette, Paris 5.jpg',
        laji: 'valokuva',
        lyhyt: 'Laatta kertoo radiumin löydöstä koulun seinässä',
        lahde: 'Monceau from San Antonio, Wikimedia Commons (CC BY 2.0)',
      },
    },
    /*
     * KYSYMYS (yksi per paikka; KK 17.11.2026 "kysymystehtävät säilyvät"): vastaus on kertomuksessa
     * (jakso 2), ei vuosiriveissä eikä kuvateksteissä.
     */
    visa: {
      kysymys: 'Minkä alkuaineen Curiet nimesivät Marien kotimaan mukaan?',
      vaihtoehdot: [
        'Radium',
        'Polonium',
        'Uraani',
      ],
      oikea: 1,
      fakta: 'Heinäkuussa 1898 ilmoitettu alkuaine sai nimensä Puolasta; joulukuussa ilmoitettu toinen oli radium.',
    },
  },
  {
    /*
     * LUMIÈRE 1895, GRAND CAFÉ (Pariisin nostot uudella tavalla, SK 18.11.2026; KK 00.40 hyväksyi
     * tekstin). Yksi merkki, yksi nosto: kartan "Grand Café" (maakartat.js; entinen "Lumière 1895", jonka nimellä hetken piilopiste jää) avaa tämän.
     * 48,8703 N / 2,3294 E (Grand Café, 14 boulevard des Capucines; sama kuin hetken piste).
     * Historian hetki `lumiere-elokuva-1895` ja sen lehtisivu JÄÄVÄT (KK-sääntö, kuten Eiffel 1888):
     * piilopiste maakartat.js:ssä. Teksti ja lähdetaulukko: docs/raportit/lumiere-nosto-teksti-20261118.md.
     * KK 00.40: "Lumièren veljekset patentoivat" (patentti 13.2.1895 haettiin molempien nimissä:
     * DPMA FR 245.032, 1895-lehden tutkimus OpenEdition; Google Arts sanoo vain Louis keksijäksi),
     * "vain kolmisenkymmentä" (Institut Lumière 33, muut 35: ristiriitaa ei ratkaista luvulla).
     */
    id: 'lumiere-1895',
    nimi: 'Grand Café',
    tyyppi: 'kulttuuri',
    symboli: 'kulttuuri',
    // Pulun kysymykset kolme (vastauksia ei kirjoiteta).
    kysymykset: [
      'Miksi laite oli sekä kamera että projektori?',
      'Miksi taikuri Méliès halusi ostaa laitteen?',
      'Miksi Grand Cafén kellari valittiin näytöspaikaksi?',
    ],
    korostukset: ['Georges Méliès', 'Hôtel Scribe'],
    nappi: 'Kellari, jossa kuvat alkoivat liikkua',
    laudat: {
      maailmankartta: { x: 5911, y: 1439 },
      europe: { x: 255.9, y: 608.3 },
    },
    // teksti lasketaan jaksoista tiedoston lopussa.
    lahde: 'Matkakirjan oma teksti · lähteinä Hérodote, Paris ZigZag, Guinness World Records, '
      + 'Science and Media Museum, Google Arts & Culture ja Un jour de plus à Paris (tarkistettu 18.11.2026).',
    otsikko: 'Lumière 1895 — kuvat alkavat liikkua',
    /*
     * Äänitteitä ei ole vielä: `aanikansio` ja jaksojen `aanite` lisätään, kun Äänittäjä on
     * äänittänyt (äänitysjonon rivit ovat data/aanitysjono.tsv:ssä). Siihen asti jaksot
     * kuuluvat suoratoistona.
     */
    jaksot: [
      { osa: 'nimi', teksti: 'Grand Café.' },
      { osa: 'esittely', teksti: 'Isoisäsi kulki tästä matkallaan.' },
      {
        osa: 'koukku',
        aani: 'isoisa',
        teksti: 'Pariisi, 1873. Kävelin tänään Capucines-bulevardia pitkin. '
          + 'Ihmisiä oli niin paljon, että jouduin astumaan kadulle.',
        vuodet: [{ vuosi: '1873', selite: 'isoisän matka', kohta: 'Pariisi, 1873' }],
      },
      {
        osa: 'tapahtuma',
        teksti: 'Lumièren veljekset patentoivat keksintönsä helmikuussa 1895. '
          + 'Laite oli kamera ja projektori yhdessä, ja sillä kuvattu filmi oli noin minuutin pituinen.',
        kuva: 'veljekset',
        vuodet: [{ vuosi: '1895', selite: 'patentti', kohta: 'helmikuussa 1895' }],
      },
      {
        osa: 'tapahtuma',
        teksti: 'Saman vuoden joulukuun 28. päivänä Grand Cafén kellarisalissa Capucines-bulevardilla '
          + 'pidettiin maksullinen näytös. Lippu maksoi frangin, ja illalla katsojia oli vain kolmisenkymmentä. '
          + 'Valkokankaalla Lumièren tehtaan portti Lyonissa aukesi, ja työläiset kävelivät ulos.',
        kuva: 'juliste',
        vuodet: [{ vuosi: '1895', selite: 'Grand Cafén näytös', kohta: 'joulukuun 28. päivänä' }],
      },
      {
        osa: 'kaanne',
        teksti: 'Kutsuvieraiden joukossa oli taikuri Georges Méliès. Hän halusi ostaa laitteen, '
          + 'mutta Lumièret eivät myyneet sitä. Puhe levisi, ja kadulle syntyi jono. '
          + 'Méliès alkoi tehdä omia elokuviaan.',
        kuva: 'melies',
      },
      {
        osa: 'tanaan',
        teksti: 'Grand Cafén paikalla on nykyään Hôtel Scribe. '
          + 'Sen ravintoloiden sisäänkäynnillä on laatta, joka kertoo näytöksestä.',
        kuva: 'laatta',
      },
    ],
    /*
     * jaksokuvat: kaikki jo olemassa olevia (ei uusia generoituja kuvia): havainnekuva hetken
     * ämpärikuvasta, muut Commonsin vapaita kuvia. Viimeinen kuva on aito nykyvalokuva.
     */
    jaksokuvat: {
      veljekset: {
        tiedosto: 'Fratelli Lumiere.jpg',
        laji: 'valokuva',
        lyhyt: 'Auguste ja Louis Lumière noin 1895',
        lahde: 'Wikimedia Commons (public domain)',
      },
      juliste: {
        tiedosto: 'Cinematograph Lumiere advertisement 1895.jpg',
        laji: 'valokuva',
        lyhyt: 'Lumièren Cinématographen mainos 1895',
        lahde: 'Cinématographe Lumièren mainos 1895, Wikimedia Commons (public domain)',
      },
      melies: {
        osoite: 'https://media.matkakirja.app/kohtaamiset/historian-hetket/hetki-lumiere-elokuva-1895-lahi-photo-v4.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Georges Méliès katsoo, kun valkokankaalla tehtaan portti aukeaa',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Faktat: Hérodote ja Science and Media Museum; '
          + 'Mélièsin ilme on dramatisoitu.',
      },
      laatta: {
        tiedosto: 'Plaque Lumière.jpg',
        laji: 'valokuva',
        lyhyt: 'Laatta Boulevard des Capucinesilla kertoo näytöksestä',
        lahde: 'Tangopaso, Wikimedia Commons (public domain)',
      },
    },
    /*
     * KYSYMYS (yksi per paikka; KK 17.11.2026 "kysymystehtävät säilyvät"): vastaus on kertomuksessa
     * (jakso 3), ei vuosiriveissä eikä kuvateksteissä.
     */
    visa: {
      kysymys: 'Paljonko lippu maksoi Grand Cafén näytökseen?',
      vaihtoehdot: [
        'Puoli frangia',
        'Yksi frangi',
        'Viisi frangia',
      ],
      oikea: 1,
      fakta: 'Näytös pidettiin Grand Cafén kellarissa Pariisissa, ja lippu maksoi yhden frangin.',
    },
  },
  {
    /*
     * LAVOISIERIN LABORATORIO, ARSENAALI (Pariisin nostot uudella tavalla, erä 8, SK 18.11.2026; KK lukee).
     * Yksi merkki, yksi nosto: kartan "Lavoisierin laboratorio" (maakartat.js) avaa tämän. 48,8503 N / 2,3635 E
     * (Arsenaali, sama piste kuin hetken). Historian hetki `lavoisier-laboratorio-1780` ja sen lehtisivu JÄÄVÄT
     * (KK-sääntö, kuten Eiffel 1888): piilopiste "Lavoisier 1780" maakartat.js:ssä.
     * Teksti ja lähdetaulukko: docs/raportit/lavoisier-nosto-teksti-20261118.md.
     */
    id: 'lavoisier-1780',
    nimi: 'Lavoisierin laboratorio',
    tyyppi: 'tekniikka',
    symboli: 'tekniikka',
    // Pulun kysymykset kolme: vanhan hetken toinen + kaksi uutta (vastauksia ei kirjoiteta).
    kysymykset: [
      'Miksi Lavoisier punnitsi kaiken ennen koetta ja sen jälkeen?',
      'Miksi Marie-Anne piirsi laitteet mittakaavaan?',
      'Miksi vallankumous mestasi miehen, joka oli uudistanut kemian?',
    ],
    nimio: 'Lavoisier',
    korostukset: ['Antoine Lavoisier', 'Marie-Anne'],
    nappi: 'Laboratorio, jossa kaikki punnittiin',
    laudat: {
      maailmankartta: { x: 5912.1, y: 1439.9 },
      europe: { x: 256.6, y: 608.8 },
    },
    // teksti lasketaan jaksoista tiedoston lopussa.
    lahde: 'Matkakirjan oma teksti · lähteinä Science History Institute, Encyclopedia.com, ACS, Britannica ja Google Arts & Culture '
      + '(tarkistettu 18.11.2026).',
    otsikko: 'Lavoisier 1780 — kaikki punnittiin',
    /*
     * Äänitteitä ei ole vielä: `aanikansio` ja jaksojen `aanite` lisätään, kun Äänittäjä on
     * äänittänyt (äänitysjonon rivit ovat data/aanitysjono.tsv:ssä). Siihen asti jaksot
     * kuuluvat suoratoistona.
     */
    jaksot: [
      { osa: 'nimi', teksti: 'Lavoisierin laboratorio.' },
      { osa: 'esittely', teksti: 'Isoisäsi kulki tästä matkallaan.' },
      {
        osa: 'koukku',
        aani: 'isoisa',
        teksti: 'Pariisi, 1873. Kävelin tänään Bastiljin lähellä kanavan vartta. '
          + 'Rannassa oli niin paljon proomuja, että niiden välistä ei nähnyt vettä.',
        vuodet: [{ vuosi: '1873', selite: 'isoisän matka', kohta: 'Pariisi, 1873' }],
      },
      {
        osa: 'tapahtuma',
        teksti: 'Antoine Lavoisier johti Arsenaalissa ruudin valmistusta. '
          + 'Hänen laboratorionsa oli asunnon vieressä, ja siellä hän punnitsi kaiken ennen koetta ja sen jälkeen. '
          + 'Tuloksista hän päätteli, että ainetta on kokeen jälkeen yhtä paljon kuin ennen sitä.',
        kuva: 'koe',
      },
      {
        osa: 'tapahtuma',
        teksti: 'Kokeissaan hän huomasi, että palaessa aine yhtyy ilman osaan, jonka hän nimesi hapeksi. '
          + 'Hänen vaimonsa Marie-Anne oli oppinut englantia ja käänsi ulkomaisia tutkimuksia ranskaksi. '
          + 'Hän myös piirsi laitteet mittakaavaan, ja piirrokset ovat Lavoisierin oppikirjassa.',
        kuva: 'laboratorio',
        vuodet: [{ vuosi: '1789', selite: 'oppikirja', kohta: 'oppikirjassa' }],
      },
      {
        osa: 'kaanne',
        teksti: 'Lavoisier oli kuulunut vanhan hallinnon veronkantajiin. '
          + 'Vallankumouksen tuomioistuin tuomitsi hänet kuolemaan, ja hänet mestattiin toukokuun 8. päivänä 1794.',
        kuva: 'david',
        vuodet: [{ vuosi: '1794', selite: 'Lavoisier mestattiin', kohta: 'toukokuun 8. päivänä' }],
      },
      {
        osa: 'tanaan',
        teksti: 'Lavoisierin laboratorion välineitä on nykyään Arts et Métiers -museossa Pariisissa. '
          + 'Ne ovat siellä esillä.',
        kuva: 'kaasumittarit',
      },
    ],
    /*
     * jaksokuvat: kaikki jo olemassa olevia (ei uusia generoituja kuvia): Wellcomen kuva (Commons),
     * hetken havainnekuva sekä jaksoille 4 ja 5 Commons-kuvat (SK 18.11.2026, KK 03.32).
     */
    jaksokuvat: {
      koe: {
        tiedosto: 'Lavoisier experimenting on respiration Wellcome L0000145.jpg',
        laji: 'piirros',
        lyhyt: 'Lavoisier mittaamassa hengitystä',
        lahde: 'Wellcome Collection, Wikimedia Commons (CC BY 4.0)',
      },
      laboratorio: {
        osoite: 'https://media.matkakirja.app/kohtaamiset/historian-hetket/hetki-lavoisier-laboratorio-1780-kauko-photo-v4.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Lavoisierin laboratorio, havainnekuva',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Faktat: Science History Institute; laboratorion sisustus on dramatisoitu.',
      },
      david: {
        tiedosto: 'Antoine-Laurent Lavoisier (1743–1794) and His Wife (Marie-Anne-Pierrette Paulze, 1758–1836) MET DT1992.jpg',
        laji: 'maalaus',
        lyhyt: 'Jacques-Louis Davidin maalaus Lavoisierista ja Marie-Annesta 1788',
        lahde: 'Jacques-Louis David 1788, Metropolitan Museum of Art, Wikimedia Commons (CC0)',
      },
      kaasumittarit: {
        tiedosto: 'Laboratoire-de-Lavoisier.jpg',
        laji: 'valokuva',
        lyhyt: 'Lavoisierin laboratorion kaasumittareita Arts et Métiers -museossa',
        lahde: 'Edal Anton Lefterov, Wikimedia Commons (CC BY-SA 3.0)',
      },
    },
    /*
     * KYSYMYS (yksi per paikka; KK 17.11.2026 "kysymystehtävät säilyvät"): vanhan hetken lehtitehtävä siirtyy;
     * vastaus on kertomuksessa (jakso 3), ei vuosiriveissä eikä kuvateksteissä.
     */
    visa: {
      kysymys: 'Mikä oli Marie-Anne Paulze Lavoisierin osuus kemian vallankumouksessa?',
      vaihtoehdot: [
        'Hän rahoitti laboratorion perintörahoillaan',
        'Hän keksi happi-sanan',
        'Hän käänsi englantilaiset tutkimukset ja piirsi laitteet',
        'Hän johti ruutikomissiota',
      ],
      oikea: 2,
      fakta: 'Traité élémentaire de chimie (1789) sisältää kolmetoista Marie-Annen piirrosta; Antoine mestattiin 8. toukokuuta 1794.',
    },
  },
  {
    /*
     * PASTEURIN LABORATORIO, ÉCOLE NORMALE SUPÉRIEURE (Pariisin nostot uudella tavalla, erä 9, SK 18.11.2026; KK lukee).
     * Yksi merkki, yksi nosto: kartan "Pasteurin laboratorio" (maakartat.js) avaa tämän. 48,8419 N / 2,3444 E
     * (rue d'Ulm, sama piste kuin hetken). Historian hetki `pasteur-pullot-1862` ja sen lehtisivu JÄÄVÄT
     * (KK-sääntö, kuten Eiffel 1888): piilopiste "Pasteur 1862" maakartat.js:ssä.
     * Palkinnon vuotta ei sanota (lähteet eroavat). Tutkimuksen julkaisuvuotta ei sanota tarkasti: tutkielma ilmestyi
     * ensin 1861 (Annales des sciences naturelles) ja uudelleen 1862 (Annales de chimie et de physique), joten tekstissä
     * "1860-luvun alussa" (KK 18.11.). Patentti 1865: Institut Pasteur (11.4.1865) ja Encyclopædia Universalis.
     * Teksti ja lähdetaulukko: docs/raportit/pasteur-nosto-teksti-20261118.md.
     */
    id: 'pasteur-1862',
    nimi: 'Pasteurin laboratorio',
    nimio: 'Pasteur',
    tyyppi: 'tekniikka',
    symboli: 'tekniikka',
    // Pulun kysymykset kolme: vanhan hetken kaksi (toinen muokattu) + yksi uusi (vastauksia ei kirjoiteta).
    kysymykset: [
      'Mitä ihmiset uskoivat ennen Pasteuria siitä, mistä elämä syntyy?',
      'Miksi Pasteur vei liemipullonsa Alppien jäätikölle asti?',
      'Miksi viiniä kuumennetaan pastöroinnissa?',
    ],
    korostukset: ['Louis Pasteur', 'Félix Pouchet'],
    nappi: 'Laboratorio, jossa pullot pysyivät kirkkaina',
    laudat: {
      maailmankartta: { x: 5911.5, y: 1440.2 },
      europe: { x: 256.2, y: 609.1 },
    },
    // teksti lasketaan jaksoista tiedoston lopussa.
    lahde: 'Matkakirjan oma teksti · lähteinä Institut Pasteur, École normale supérieure, Carl Zimmer (NYT) '
      + 'ja Encyclopædia Universalis (avatut sivut, tarkistettu 18.11.2026).',
    otsikko: 'Pasteur — pullot pysyivät kirkkaina',
    /*
     * Äänitteitä ei ole vielä: `aanikansio` ja jaksojen `aanite` lisätään, kun Äänittäjä on
     * äänittänyt (äänitysjonon rivit ovat data/aanitysjono.tsv:ssä). Siihen asti jaksot
     * kuuluvat suoratoistona.
     */
    jaksot: [
      { osa: 'nimi', teksti: 'Pasteurin laboratorio.' },
      { osa: 'esittely', teksti: 'Isoisäsi kulki tästä matkallaan.' },
      {
        osa: 'koukku',
        aani: 'isoisa',
        teksti: 'Pariisi, 1873. Kävelin tänään rue d\'Ulmia pitkin. '
          + 'Kadulla käveli muutama nuori mies, ja jokaisella oli kirja kainalossa.',
        vuodet: [{ vuosi: '1873', selite: 'isoisän matka', kohta: 'Pariisi, 1873' }],
      },
      {
        osa: 'tapahtuma',
        teksti: 'Louis Pasteur työskenteli École normale supérieuren laboratoriossa rue d\'Ulmilla. '
          + 'Hän keitti lientä lasipulloissa, joiden kaula oli taivutettu joutsenen kaulan muotoon. '
          + 'Ilma pääsi pulloon, mutta pöly jäi mutkaan.',
        kuva: 'pullot',
      },
      {
        osa: 'tapahtuma',
        teksti: 'Pasteurin vastustaja Félix Pouchet uskoi, että elämä voi syntyä itsestään mätänevästä aineesta. '
          + 'Tiedeakatemia oli luvannut palkinnon sille, joka ratkaisee kiistan kokeilla. '
          + 'Pasteur avasi pulloja jopa Alppien jäätiköllä. 1860-luvun alussa hän julkaisi tuloksensa.',
        kuva: 'pouchet',
      },
      {
        osa: 'kaanne',
        teksti: 'Pasteur voitti kiistan. Hän osoitti myös, että käyminen on elävien mikrobien työtä. '
          + 'Viinin tauteja hän torjui kuumentamalla viiniä, ja keksinnölle haettiin patentti 1865. '
          + 'Menetelmää kutsutaan pastöroinniksi.',
        kuva: 'maalaus',
        vuodet: [{ vuosi: '1865', selite: 'pastörointipatentti', kohta: 'patentti 1865' }],
      },
      {
        osa: 'tanaan',
        teksti: 'École normale supérieure toimii yhä rue d\'Ulmilla Latinalaiskorttelissa. '
          + 'Pasteur oli koulun tieteellisten opintojen johtaja ja työskenteli siellä vuosikymmeniä.',
        kuva: 'ens',
      },
    ],
    /*
     * jaksokuvat: kaikki jo olemassa olevia (ei uusia generoituja kuvia): hetken havainnekuva ja
     * Edelfeltin maalaus (Commons, PD); jaksoille 3 ja 5 Commons-kuvat (SK 18.11.2026, KK 03.32).
     */
    jaksokuvat: {
      pullot: {
        osoite: 'https://media.matkakirja.app/kohtaamiset/historian-hetket/hetki-pasteur-pullot-1862-lahi-photo-v4.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Pasteurin pullot, havainnekuva',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Faktat: Institut Pasteur; laboratorion sisustus on dramatisoitu.',
      },
      maalaus: {
        tiedosto: 'Albert Edelfelt - Louis Pasteur - 1885.jpg',
        laji: 'maalaus',
        lyhyt: 'Albert Edelfeltin maalaus Pasteurista 1885',
        lahde: 'Albert Edelfelt 1885, Wikimedia Commons (public domain)',
      },
      pouchet: {
        tiedosto: 'Portrait of Felix-Archimede Pouchet. Wellcome M0006271.jpg',
        laji: 'piirros',
        lyhyt: 'Félix-Archimède Pouchet, muotokuva',
        lahde: 'Wellcome Collection, Wikimedia Commons (CC BY 4.0)',
      },
      ens: {
        tiedosto: 'CF6477 Paris 5e rue Ulm ENS rwk.jpg',
        laji: 'valokuva',
        lyhyt: 'École normale supérieuren sisäänkäynti rue d\'Ulmilla',
        lahde: 'Mbzt, Wikimedia Commons (CC BY 4.0)',
      },
    },
    /*
     * KYSYMYS (yksi per paikka; KK 17.11.2026 "kysymystehtävät säilyvät"): vanhan hetken lehtitehtävä siirtyy;
     * vastaus on kertomuksessa (jakso 2), ei vuosiriveissä eikä kuvateksteissä.
     */
    visa: {
      kysymys: 'Miksi joutsenkaulapullon liemi pysyi kirkkaana, vaikka ilma pääsi sisään?',
      vaihtoehdot: [
        'Lasin mutka pysäytti ilman mukana kulkevan pölyn ja mikrobit',
        'Liemi oli suolattu',
        'Pullo oli tiiviisti suljettu',
        'Ilma ei ollut vielä keksitty koeaineeksi',
      ],
      oikea: 0,
      fakta: 'Tiedeakatemia palkitsi Pasteurin kokeet. Viinin kuumennusta kutsutaan pastöroinniksi.',
    },
  },
];

/*
 * TUILERIES-KOE: kohteen `teksti` = jaksot kappaleina ilman nimiosaa (esittely ensin, isoisän lause
 * sen jälkeen, antaa "Kaksi vuotta aiemmin" -alulle ajan). Yksi lähde: vanha esitys, lehti
 * (js/lehtinostot.js) ja Pulun konteksti lukevat saman tekstin kuin
 * jaksoesitys.
 */
for (const kohde of FOKUSKOHTEET_FRA) {
  if (Array.isArray(kohde.jaksot) && kohde.teksti == null) {
    // `nimi`-osa jää pois: kohteen nimi luetaan jo otsikkona (Puhe.cs), joten sen toisto antaisi nimen kahdesti.
    kohde.teksti = kohde.jaksot.filter((j) => j.osa !== 'nimi').map((j) => j.teksti).join('\n\n');
  }
}
