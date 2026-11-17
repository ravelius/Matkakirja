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
      {
        osa: 'koukku',
        aanite: 'isoisa',
        aani: 'isoisa',
        teksti: 'Pariisi, 1873. Kävelin tänään poltetun palatsin ohi. Katto on '
          + 'poissa, ja ikkuna-aukoista näkyy pelkkää taivasta.',
        kuva: 'raunio1873',
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
        osoite: null, tulossa: 'Codex', laji: 'havainnekuva',
        lyhyt: 'Tuileries palaa, toukokuu 1871',
        lahde: 'Matkakirjan havainnekuva (tilaus 8.4 A)',
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
        osoite: null, tulossa: 'Codex', laji: 'havainnekuva',
        lyhyt: 'Palatsin purku ja kivien myynti',
        lahde: 'Matkakirjan havainnekuva (tilaus 8.4 B)',
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
    ],
    korostukset: ['Porte Saint-Antoine|Saint-Antoinea',
      'valtionvankila|valtionvankilaksi'],
    nappi: 'Linnoitus, jota ei enää ole — mutta jonka päivää juhlitaan',
    laudat: {
      maailmankartta: { x: 5912.3, y: 1439.7 },
      europe: { x: 256.7, y: 608.8 },
    },
    teksti: 'Bastille Saint-Antoine oli keskiaikainen linnoitus Pariisin '
      + 'itälaidalla. Se rakennettiin satavuotisen sodan aikana '
      + 'suojaamaan kaupungin itäistä sisääntuloa, Porte '
      + 'Saint-Antoinea: työt olivat käynnissä jo 1357 ja pääosa nousi '
      + 'vuodesta 1370 alkaen kahdeksantornisena kivimuurina. Vuonna '
      + '1417 se julistettiin valtionvankilaksi, ja vuodesta 1659 se '
      + 'toimi lähinnä siinä tehtävässä — vuoteen 1789 mennessä sen '
      + 'porteista oli kulkenut 5 279 vankia. Heinäkuun 14. päivänä '
      + '1789 väkijoukko valtasi linnoituksen, jonka selleissä oli '
      + 'tuolloin enää seitsemän vankia. Purkutyöt alkoivat heti, ja '
      + 'kivet myytiin muistoesineiksi.',
    lahde: 'en-Wikipedia "Bastille", johdanto, tietolaatikko ja osiot '
      + '"Storming of the Bastille" ja "Legacy" (tarkistettu '
      + '27.8.2026).',
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
];

/*
 * TUILERIES-KOE: kohteen `teksti` = jaksot kappaleina (isoisän lause
 * ensimmäisenä, antaa "Kaksi vuotta aiemmin" -alulle ajan). Yksi lähde: vanha esitys, lehti
 * (js/lehtinostot.js) ja Pulun konteksti lukevat saman tekstin kuin
 * jaksoesitys.
 */
for (const kohde of FOKUSKOHTEET_FRA) {
  if (Array.isArray(kohde.jaksot) && kohde.teksti == null) {
    kohde.teksti = kohde.jaksot.map((j) => j.teksti).join('\n\n');
  }
}
