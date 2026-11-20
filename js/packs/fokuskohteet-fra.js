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
    nappi: 'Palatsi, joka myytiin kivinä',
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
     * kuvitettuna tarinana: kertojan jaksot (8.1; ERÄ 1, 20.11.2026, P-261120-3: ei nimi-, esittely- eikä isoisäjaksoa,
     * leipäteksti alkaa paikan nimellä ja etenee vuosi vuodelta, raportti docs/raportit/pariisi-nostot-era1-teksti-20261120.md),
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
    // Tarinarivi (enintään 40 merkkiä, ei vuotta; KK 20.11.2026, P-261120-3): näkyy otsikon alla, kertoja ei lue sitä.
    otsikko: 'Palatsi, joka myytiin kivinä',
    /*
     * Äänikansiota (`aanikansio: 'tuileries-koe/v1'`) ei enää ole (P-261120-3 M5): vanhat otot kuuluvat vanhaan
     * tekstiin (jaksojen järjestys muuttui), joten ne eivät saa soida uuden tekstin päällä. Nosto luetaan lennossa
     * kuten muut, kunnes Äänittäjä saa luvan äänittää uuden tekstin (uusi kansio, v2).
     */
    jaksot: [
      {
        osa: 'tapahtuma',
        kuva: 'loisto',
        teksti: 'Tuileries\'n palatsi oli Ranskan hallitsijoiden koti Pariisissa, ennen kuin se poltettiin ja '
          + 'myytiin kivinä. Kuningatar Katariina de Medici aloitti sen rakentamisen Louvren viereen vuonna '
          + '1564, ja palatsi seisoi yli kolmesataa vuotta.',
        vuodet: [
          { vuosi: '1564', selite: 'rakentaminen alkaa', kohta: 'vuonna 1564' },
        ],
      },
      {
        osa: 'tapahtuma',
        kuva: 'palo',
        teksti: 'Toukokuussa 1871 Pariisin kommuuni oli kukistumassa. Sen kannattajat sytyttivät Tuileries\'n '
          + 'palatsin. Tuli paloi yli kaksi vuorokautta ja poltti talon sisältä tyhjäksi.',
        vuodet: [
          { vuosi: '1871', selite: 'palatsi sytytetään', kohta: 'Toukokuussa 1871' },
        ],
      },
      {
        osa: 'tapahtuma',
        kuva: 'purku',
        teksti: 'Palon jälkeen kivimuurit jäivät pystyyn, vaikka katto ja sisustus olivat poissa. Poltettu '
          + 'kaupungintalo rakennettiin uudelleen, Tuileries\'ta ei. Rauniot seisoivat katottomina yli '
          + 'kymmenen vuotta.',
      },
      {
        osa: 'kaanne',
        kuva: 'purku',
        teksti: 'Vuonna 1882 kolmas tasavalta päätti purkaa raunion, ja purku valmistui 1883. Purkuyrittäjä myi '
          + 'kiviä ja marmoria, ja suuresta erästä rakennettiin linna Korsikalle.',
        hologrammi: 'sammuu',
        hologrammiKohta: 'päätti purkaa',
        vuodet: [
          { vuosi: '1882', selite: 'purkupäätös', kohta: 'Vuonna 1882' },
          { vuosi: '1883', selite: 'purku valmis', kohta: 'valmistui 1883' },
        ],
      },
      {
        osa: 'tanaan',
        kuva: 'paatykolmio',
        teksti: 'Palatsin paikalla on nyt avointa tilaa Louvren ja puutarhan välissä. Yksi sen paloista seisoo '
          + 'yhä Pariisissa: keskipaviljongin päätykolmio on puistossa nimeltä Square Georges Cain.',
        kartta: { nimi: 'Square Georges Cain', lat: 48.8581, lon: 2.3628 },
      },
    ],
    /*
     * jaksokuvat: avain → kuva (`kuvat` on kohteilla jo kuvalista). Kuvatekstit
     * ja lajit SK:n raportin kohta 7, kuvat 3, 6 ja 7 kohdat 4–5 (KK valitsi).
     * `tulossa` = tilattu (osoite vielä null): esitys näyttää paikkamerkin.
     */
    jaksokuvat: {
      loisto: {
        osoite: 'https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-tuileries-loistoaika-v2-3x2.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Tuileries\'n palatsi loistoaikanaan',
        lahde: 'Tekoälyllä tuotettu havainnekuva; Matkakirjan havainnekuva. Faktat: Musée du Louvre, rajattu',
        tekija: 'Matkakirja (tekoälyllä tuotettu havainnekuva)',
        lisenssi: 'Matkakirjan oma',
        leveys: 1200,
        korkeus: 800,
      },
      palo: {
        osoite: 'https://media.matkakirja.app/kuvat/tuileries-palo.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Tuileries palaa, toukokuu 1871',
        lahde: 'Tekoälyllä tuotettu havainnekuva; rakennusreferenssit Achille Quinet PH14096 ja Godefroy PH83415, Paris Musées / Carnavalet, CC0, rajattu',
        tekija: 'Matkakirja (tekoälyllä tuotettu havainnekuva); referenssit Quinet ja Godefroy',
        lisenssi: 'Matkakirjan oma; referenssit CC0',
        leveys: 1200,
        korkeus: 800,
      },
      purku: {
        osoite: 'https://media.matkakirja.app/kuvat/tuileries-purku.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Palatsin purku ja kivien myynti',
        lahde: 'Tekoälyllä tuotettu havainnekuva; rakennusreferenssit Godefroy PH83415 ja PH20009, Paris Musées / Carnavalet, CC0, rajattu',
        tekija: 'Matkakirja (tekoälyllä tuotettu havainnekuva); referenssit Godefroy',
        lisenssi: 'Matkakirjan oma; referenssit CC0',
        leveys: 1200,
        korkeus: 800,
      },
      paatykolmio: {
        osoite: 'https://media.matkakirja.app/kuvat/tuileries-paatykolmio.jpg',
        laji: 'valokuva',
        lyhyt: 'Palatsin päätykolmio Square Georges Cainissa',
        lahde: 'Guilhem Vellut, Wikimedia Commons (CC BY 2.0), rajattu',
        tekija: 'Guilhem Vellut',
        lisenssi: 'CC BY 2.0',
        leveys: 1200,
        korkeus: 800,
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
      osoite: 'https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-tuileries-loistoaika-v2-3x2.jpg',
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
    otsikko: 'Päivä, jona Mona Lisa katosi',
    /*
     * Äänitteitä ei ole vielä: `aanikansio` ja jaksojen `aanite` lisätään, kun Äänittäjä on
     * äänittänyt (äänitysjonon rivit ovat data/aanitysjono.tsv:ssä). Siihen asti jaksot
     * kuuluvat suoratoistona.
     */
    jaksot: [
      {
        osa: 'tapahtuma',
        kuva: 'julkisivu',
        teksti: 'Louvre oli ennen kuninkaiden palatsi, ja museoksi se avattiin vuonna 1793. Yli sata vuotta '
          + 'myöhemmin sen seinältä varastettiin Mona Lisa.',
        vuodet: [
          { vuosi: '1793', selite: 'Louvre museoksi', kohta: 'vuonna 1793' },
        ],
      },
      {
        osa: 'tapahtuma',
        kuva: 'varkaus',
        teksti: 'Maanantaina elokuussa 1911 Louvre oli suljettu. Valkoiseen työtakkiin pukeutunut mies nosti Mona '
          + 'Lisan seinältä, ja lukitun oven avasi hänelle putkimies.',
        vuodet: [
          { vuosi: '1911', selite: 'taulu varastetaan', kohta: 'elokuussa 1911' },
        ],
      },
      {
        osa: 'tapahtuma',
        teksti: 'Kukaan ei huomannut mitään ennen seuraavaa päivää. Silloin maalari tuli kopioimaan taulua ja '
          + 'löysi tyhjän seinän. Poliisi pidätti runoilija Guillaume Apollinairen, ja Pablo Picasso joutui '
          + 'epäillyksi.',
      },
      {
        osa: 'kaanne',
        kuva: 'uffizi1913',
        teksti: 'Varas oli Louvressa työskennellyt lasittaja Vincenzo Peruggia, jonka poliisi oli jo '
          + 'kuulustellut. Taulu odotti laatikossa yli kaksi vuotta, kunnes hän tarjosi sitä vuonna 1913 '
          + 'firenzeläiselle taidekauppiaalle, joka hälytti poliisin. Peruggia väitti vieneensä taulun '
          + 'takaisin Italiaan.',
        vuodet: [
          { vuosi: '1913', selite: 'varas jää kiinni', kohta: 'vuonna 1913' },
        ],
      },
      {
        osa: 'tanaan',
        kuva: 'jono',
        teksti: 'Mona Lisa palasi Louvreen vuonna 1914, ja varkaus teki siitä entistä kuuluisamman. Nykyään se on '
          + 'Louvren ensimmäisessä kerroksessa. Sen edessä on jono, ja taulua vartioidaan tarkasti.',
        vuodet: [
          { vuosi: '1914', selite: 'taulu palaa Louvreen', kohta: 'vuonna 1914' },
        ],
      },
    ],
    /*
     * jaksokuvat: kaikki jo olemassa olevia (ei uusia generoituja kuvia): havainnekuva
     * skandaalin ämpärikuvasta, muut Commonsin vapaita kuvia (lisenssit luettu 17.11.2026).
     * Viimeinen kuva on aito nykyvalokuva.
     */
    jaksokuvat: {
      varkaus: {
        osoite: 'https://media.matkakirja.app/kuvat/tarina-louvre-2-varkaus.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Valkotakkinen mies Salon Carrén seinän edessä, jossa on tyhjä ripustuspaikka',
        lahde: 'Tekoälyllä tuotettu havainnekuva; Matkakirjan havainnekuva. Rekonstruktio vuoden 1911 varkaudesta; viitteinä Salon Carrén vanhat kuvat ja Mona Lisan tyhjä paikka (Wikimedia Commons, public domain), Musée du Louvre',
        tekija: 'Matkakirja (tekoälyllä tuotettu havainnekuva)',
        lisenssi: 'Matkakirjan oma',
        leveys: 1200,
        korkeus: 800,
      },
      julkisivu: {
        osoite: 'https://media.matkakirja.app/kuvat/louvre-julkisivu.jpg',
        laji: 'valokuva',
        lyhyt: 'Louvren itäjulkisivu',
        lahde: 'GFreihalter, Wikimedia Commons (CC BY-SA 4.0), rajattu',
        tekija: 'GFreihalter',
        lisenssi: 'CC BY-SA 4.0',
        leveys: 1200,
        korkeus: 800,
      },
      uffizi1913: {
        osoite: 'https://media.matkakirja.app/kuvat/louvre-uffizi1913.jpg',
        laji: 'valokuva',
        lyhyt: 'Mona Lisa löydön jälkeen, 1913',
        lahde: 'Tuntematon kuvaaja, 1913, Wikimedia Commons (public domain), rajattu',
        tekija: 'Tuntematon kuvaaja',
        lisenssi: 'Public domain',
        leveys: 1200,
        korkeus: 800,
      },
      jono: {
        osoite: 'https://media.matkakirja.app/kuvat/louvre-jono.jpg',
        laji: 'valokuva',
        lyhyt: 'Jono Mona Lisan edessä Louvressa',
        lahde: 'Amaury Laporte, Wikimedia Commons (CC BY 2.0), rajattu',
        tekija: 'Amaury Laporte',
        lisenssi: 'CC BY 2.0',
        leveys: 1200,
        korkeus: 800,
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
    otsikko: 'Linna, joka jaettiin kivinä',
    aanikansio: 'bastilji/v1',
    jaksot: [
      {
        osa: 'tapahtuma',
        kuva: 'loisto',
        aanite: 'kertoja-1-otsikko-jakso2',
        teksti: 'Bastilji rakennettiin 1300-luvun lopulla vartioimaan Pariisin itäistä porttia, ja siinä oli '
          + 'kahdeksan tornia. Myöhemmin siitä tuli valtionvankila. Kuningas saattoi lähettää sinne ihmisen '
          + 'kirjeellä, ilman oikeudenkäyntiä, ja linnasta tuli mielivallan symboli.',
      },
      {
        osa: 'tapahtuma',
        kuva: 'valtaus',
        aanite: 'kertoja-2-jakso3',
        teksti: 'Heinäkuun 14. päivänä 1789 pariisilaisilla oli Invalidien sotilaskodista otettuja aseita mutta '
          + 'ei ruutia, ja ruutia uskottiin olevan Bastiljissa. Vankeja oli vain seitsemän. Silti väkijoukko '
          + 'valtasi linnan, ja kuvernööri surmattiin.',
        vuodet: [
          { vuosi: '1789', selite: 'valtaus', kohta: 'päivänä 1789' },
        ],
      },
      {
        osa: 'kaanne',
        kuva: 'purku',
        aanite: 'kertoja-3-jakso4',
        teksti: 'Purku alkoi jo samana iltana. Työmaata johti Palloy, jonka työpajassa kivistä veistettiin '
          + 'pienoismalleja ja muistoesineitä. Osa kivistä päätyi Pariisin siltoihin, ja muutamassa vuodessa '
          + 'linnasta ei jäänyt pystyyn mitään.',
        hologrammi: 'sammuu',
        hologrammiKohta: 'Purku alkoi',
      },
      {
        osa: 'tanaan',
        kuva: 'nyt',
        aanite: 'kertoja-4-jakso5',
        teksti: 'Linnan paikalla on nyt aukio. Aukion pylväs muistuttaa vuoden 1830 vallankumouksesta, ei '
          + '1789:stä. Tornin pohjakiviä on koottu Henri-Galli-puistoon, ja metroaseman laiturilla näkyy pala '
          + 'vallihaudan muuria.',
        vuodet: [
          { vuosi: '1830', selite: 'vallankumous', kohta: '1830' },
        ],
        kartta: { nimi: 'Square Henri-Galli', lat: 48.8513, lon: 2.3618 },
      },
    ],
    jaksokuvat: {
      loisto: {
        osoite: 'https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-bastilji-loistoaika-v2-3x2.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Bastilji loistoaikanaan',
        lahde: 'Tekoälyllä tuotettu havainnekuva; Matkakirjan havainnekuva. Faktat: Musée Carnavalet, La Bastille au XVIIIe siècle, rajattu',
        tekija: 'Matkakirja (tekoälyllä tuotettu havainnekuva)',
        lisenssi: 'Matkakirjan oma',
        leveys: 1200,
        korkeus: 800,
      },
      valtaus: {
        osoite: 'https://media.matkakirja.app/kuvat/bastilji-valtaus.jpg',
        laji: 'maalaus',
        lyhyt: 'Bastiljin valtaus 14. heinäkuuta 1789',
        lahde: 'Jean-Baptiste Lallemand 1789, Musée Carnavalet, Wikimedia Commons (PD), rajattu',
        tekija: 'Jean-Baptiste Lallemand',
        lisenssi: 'Public domain',
        leveys: 1200,
        korkeus: 800,
      },
      purku: {
        osoite: 'https://media.matkakirja.app/kuvat/bastilji-purku.jpg',
        laji: 'maalaus',
        lyhyt: 'Bastiljin purku, Hubert Robertin maalaus',
        lahde: 'Hubert Robert 1789, Wikimedia Commons (PD), rajattu',
        tekija: 'Hubert Robert',
        lisenssi: 'Public domain',
        leveys: 1200,
        korkeus: 800,
      },
      nyt: {
        osoite: 'https://media.matkakirja.app/kuvat/bastilji-nyt.jpg',
        laji: 'valokuva',
        lyhyt: 'Place de la Bastille ja heinäkuun pylväs nykyään',
        lahde: 'Guillaume Flament, Wikimedia Commons (CC BY-SA 4.0), rajattu',
        tekija: 'Guillaume Flament',
        lisenssi: 'CC BY-SA 4.0',
        leveys: 1200,
        korkeus: 800,
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
      osoite: 'https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-bastilji-loistoaika-v2-3x2.jpg',
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
    korostukset: ['Victor Lustig', 'Champ de Mars|Champ de Mars'],
    nappi: 'Torni, jonka piti seistä vain kaksikymmentä vuotta',
    laudat: {
      maailmankartta: { x: 5909.8, y: 1439.5 },
      europe: { x: 255.3, y: 608.6 },
    },
    // teksti lasketaan jaksoista tiedoston lopussa.
    lahde: 'Matkakirjan oma teksti · lähteinä Mental Floss, Ripley\'s, Today I Found Out ja The Hustle (Lustig), Snippets of Paris, '
      + 'Science News Explores, Architizer ja Mental Floss (torni) sekä introducingparis.com ja en-Wikipedia "Champ de Mars" '
      + '(tarkistettu 17.11.2026).',
    otsikko: 'Torni, joka myytiin romuksi',
    jaksot: [
      {
        osa: 'tapahtuma',
        kuva: 'rakenteilla',
        teksti: 'Eiffel-torni rakennettiin seisomaan vain kaksikymmentä vuotta, ja kerran huijari myi sen '
          + 'romuksi. Ennen tornia paikalla oli Champ de Mars, sotilaiden harjoituskenttä.',
      },
      {
        osa: 'tapahtuma',
        kuva: 'rakenteilla',
        teksti: 'Vuonna 1887 kentälle alettiin koota rautatornia maailmannäyttelyä varten. Työmiehet niittasivat '
          + 'tuhansia osia yhteen yhä korkeammalla. Moni pariisilainen vastusti tornia, mutta vuonna 1889 se '
          + 'oli valmis.',
        vuodet: [
          { vuosi: '1887', selite: 'rakentaminen alkaa', kohta: 'Vuonna 1887' },
          { vuosi: '1889', selite: 'torni valmis', kohta: 'vuonna 1889' },
        ],
      },
      {
        osa: 'tapahtuma',
        kuva: 'nayttely1889',
        teksti: 'Kaksikymmentä vuotta kului, mutta kukaan ei purkanut tornia. Sen huipulla oli radioantenni, ja '
          + 'armeijalle siitä oli niin paljon hyötyä, että torni sai jäädä.',
      },
      {
        osa: 'kaanne',
        kuva: 'lustig',
        teksti: 'Vuonna 1925 huijari Victor Lustig luki lehdestä, että tornin kunnossapito on kallista. '
          + 'Väärennetyin virkapaperein hän esiintyi ministeriön apulaisjohtajana ja myi muka tornin '
          + 'romukauppiaalle. Kauppias häpesi eikä ilmoittanut poliisille, joten Lustig palasi ja yritti '
          + 'uudestaan.',
        vuodet: [
          { vuosi: '1925', selite: 'Lustigin huijaus', kohta: 'Vuonna 1925' },
        ],
      },
      {
        osa: 'tanaan',
        kuva: 'nykyinen',
        teksti: 'Torni seisoo yhä. Vanha harjoituskenttä on nykyään puisto sen jalalla, ja ensimmäisen kerroksen '
          + 'alle on kirjoitettu kullatuin kirjaimin 72 ranskalaisen tiedemiehen ja insinöörin nimeä.',
      },
    ],
    jaksokuvat: {
      lustig: {
        osoite: 'https://media.matkakirja.app/kuvat/tarina-eiffel-torni-4-lustig.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Hotellin salongissa neuvotellaan tornin kaupasta, ikkunasta näkyy Eiffel-torni',
        lahde: 'Tekoälyllä tuotettu havainnekuva; Matkakirjan havainnekuva. Salongin asettelu on rekonstruktio; viitteinä Hôtel de Crillonin salonki, Eiffel-tornin rakenne ja aikakauden asu (Wikimedia Commons, public domain ja CC0)',
        tekija: 'Matkakirja (tekoälyllä tuotettu havainnekuva)',
        lisenssi: 'Matkakirjan oma',
        leveys: 1200,
        korkeus: 800,
      },
      rakenteilla: {
        osoite: 'https://media.matkakirja.app/kuvat/eiffel-torni-rakenteilla.jpg',
        laji: 'valokuva',
        lyhyt: 'Eiffel-torni rakenteilla 1888',
        lahde: 'Neurdein, 1888, Wikimedia Commons (public domain), rajattu',
        tekija: 'Neurdein',
        lisenssi: 'Public domain',
        leveys: 1200,
        korkeus: 800,
      },
      nayttely1889: {
        osoite: 'https://media.matkakirja.app/kuvat/eiffel-torni-nayttely1889.jpg',
        laji: 'valokuva',
        lyhyt: 'Eiffel-torni ja Champ de Mars näyttelyssä 1889',
        lahde: 'Tuntematon valokuvaaja, 1889, Wikimedia Commons (public domain), rajattu',
        tekija: 'Tuntematon valokuvaaja',
        lisenssi: 'Public domain',
        leveys: 1200,
        korkeus: 800,
      },
      nykyinen: {
        osoite: 'https://media.matkakirja.app/kuvat/eiffel-torni-nykyinen.jpg',
        laji: 'valokuva',
        lyhyt: 'Eiffel-torni ja Champ de Mars ylhäältä katsottuna',
        lahde: 'Carlos Delgado, Wikimedia Commons (CC BY-SA 3.0), rajattu',
        tekija: 'Carlos Delgado',
        lisenssi: 'CC BY-SA 3.0',
        leveys: 1200,
        korkeus: 800,
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
    otsikko: 'Kappeli ja kuningattaren kaulanauha',
    /*
     * Äänitteitä ei ole vielä: `aanikansio` ja jaksojen `aanite` lisätään, kun Äänittäjä on
     * äänittänyt (äänitysjonon rivit ovat data/aanitysjono.tsv:ssä). Siihen asti jaksot
     * kuuluvat suoratoistona.
     */
    jaksot: [
      {
        osa: 'tapahtuma',
        kuva: 'piha',
        teksti: 'Sainte-Chapelle on kappeli Cité-saaren palatsin pihalla. Kuningas Ludvig IX rakennutti sen '
          + 'säilyttämään Kristuksen orjantappurakruunua, ja se vihittiin vuonna 1248. Samassa palatsissa '
          + 'ratkaistiin kuningattaren kaulanauhajuttu.',
        vuodet: [
          { vuosi: '1248', selite: 'kappeli vihitään', kohta: 'vuonna 1248' },
        ],
      },
      {
        osa: 'tapahtuma',
        kuva: 'kaulanauha',
        teksti: '1770-luvulla jalokivikauppiaat tekivät timanttikaulanauhan. Marie Antoinette kieltäytyi '
          + 'ostamasta sitä, mutta huijari Jeanne de La Motte sai kardinaali de Rohanin uskomaan, että '
          + 'kuningatar halusi nauhan salaa.',
      },
      {
        osa: 'tapahtuma',
        teksti: 'Elokuussa 1784 kardinaali tapasi Versailles\'n puistossa naisen, jonka hän luuli kuningattareksi. '
          + 'Alkuvuodesta 1785 hän sai nauhan kauppiailta ja luovutti sen Jeannelle. Kun kauppiaat pyysivät '
          + 'maksua, kuningatar vaati selvitystä, ja kardinaali pidätettiin.',
        vuodet: [
          { vuosi: '1784', selite: 'yöllinen tapaaminen', kohta: 'Elokuussa 1784' },
          { vuosi: '1785', selite: 'nauha luovutetaan', kohta: 'Alkuvuodesta 1785' },
        ],
      },
      {
        osa: 'kaanne',
        kuva: 'parlamentti',
        teksti: 'Oikeudenkäynti pidettiin Pariisin parlamentissa. Toukokuussa 1786 kardinaali vapautettiin, ja '
          + 'Jeanne leimattiin varkaaksi ja vietiin vankilaan. Kuningattaren maine kärsi.',
        vuodet: [
          { vuosi: '1786', selite: 'Rohan vapautetaan', kohta: 'Toukokuussa 1786' },
        ],
      },
      {
        osa: 'tanaan',
        kuva: 'ikkunat',
        teksti: 'Sainte-Chapelle on yhä saman palatsin pihalla. Sen ikkunoissa on yli tuhat kohtausta, ja '
          + 'kappeliin mennään turvatarkastuksen kautta.',
      },
    ],
    /*
     * jaksokuvat: kaikki jo olemassa olevia (ei uusia generoituja kuvia): havainnekuva skandaalin
     * ämpärikuvasta, muut Commonsin vapaita kuvia (lisenssit luettu 17.11.2026).
     */
    jaksokuvat: {
      parlamentti: {
        osoite: 'https://media.matkakirja.app/kuvat/tarina-sainte-chapelle-4-parlamentti.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Pariisin parlamentin istuntosali, ikkunasta näkyy kappelin torni',
        lahde: 'Tekoälyllä tuotettu havainnekuva; Matkakirjan havainnekuva. Tornin näkyminen ikkunasta on sommitteluratkaisu; viitteinä Carnavalet\'n istuntosalin piirros (CC0) ja Château de Versailles',
        tekija: 'Matkakirja (tekoälyllä tuotettu havainnekuva)',
        lisenssi: 'Matkakirjan oma',
        leveys: 1200,
        korkeus: 800,
      },
      kaulanauha: {
        osoite: 'https://media.matkakirja.app/kuvat/tarina-sainte-chapelle-2-kaulanauha.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Yöllinen kuja Versailles\'n puistossa, kaukana kaksi hahmoa',
        lahde: 'Tekoälyllä tuotettu havainnekuva; Matkakirjan havainnekuva. Kuja on havainnollistettu, ei pohjapiirroksen kopio; viitteinä Bosquet de la Reine (Wikimedia Commons, CC BY-SA 3.0) ja Château de Versailles',
        tekija: 'Matkakirja (tekoälyllä tuotettu havainnekuva)',
        lisenssi: 'Matkakirjan oma',
        leveys: 1200,
        korkeus: 800,
      },
      piha: {
        osoite: 'https://media.matkakirja.app/kuvat/tarina-sainte-chapelle-1-piha.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Sainte-Chapelle palatsin pihalla',
        lahde: 'Tekoälyllä tuotettu havainnekuva; Matkakirjan havainnekuva. Rekonstruktio; viitteinä Martinetin 1780-luvun näkymät sekä kappelin rungon valokuvat (Wikimedia Commons, public domain, CC0 ja CC BY-SA 4.0), Centre des monuments nationaux',
        tekija: 'Matkakirja (tekoälyllä tuotettu havainnekuva)',
        lisenssi: 'Matkakirjan oma',
        leveys: 1200,
        korkeus: 800,
      },
      ikkunat: {
        osoite: 'https://media.matkakirja.app/kuvat/sainte-chapelle-ikkunat.jpg',
        laji: 'valokuva',
        lyhyt: 'Yläkappelin lasimaalaukset',
        lahde: 'Gerda Arendt, Wikimedia Commons (CC0), rajattu',
        tekija: 'Gerda Arendt',
        lisenssi: 'CC0',
        leveys: 1200,
        korkeus: 800,
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
    otsikko: 'Vaja, jossa radium hohti',
    /*
     * Äänitteitä ei ole vielä: `aanikansio` ja jaksojen `aanite` lisätään, kun Äänittäjä on
     * äänittänyt (äänitysjonon rivit ovat data/aanitysjono.tsv:ssä). Siihen asti jaksot
     * kuuluvat suoratoistona.
     */
    jaksot: [
      {
        osa: 'tapahtuma',
        kuva: 'vaja',
        teksti: 'Curien vaja oli Pariisin fysiikan ja kemian koulun pihalla seissyt vaja, jossa Marie ja Pierre '
          + 'Curie eristivät radiumin. Se oli ennen ollut ruumiinavaussali.',
      },
      {
        osa: 'tapahtuma',
        kuva: 'radiumtyo',
        teksti: 'Marie ja Pierre Curie tutkivat uraanimalmin sisältämää säteilyä. Heinäkuussa 1898 he ilmoittivat '
          + 'löytäneensä uuden alkuaineen. He nimesivät sen Marien kotimaan Puolan mukaan poloniumiksi. '
          + 'Joulukuussa he ilmoittivat toisen, radiumin.',
        vuodet: [
          { vuosi: '1898', selite: 'löytö ilmoitettu', kohta: 'Heinäkuussa 1898' },
        ],
      },
      {
        osa: 'tapahtuma',
        kuva: 'hohto',
        teksti: 'Pelkkä ilmoitus ei riittänyt, vaan alkuaine piti saada puhtaana erilleen malmista. Vaja oli '
          + 'huonosti tuuletettu eikä pitänyt sadetta, ja malmia kului tonneittain.',
      },
      {
        osa: 'kaanne',
        teksti: 'Työ vei yli kolme vuotta, ja vuonna 1902 heillä oli kymmenesosagramma puhdasta radiumkloridia. '
          + 'Iltaisin radium hohti pimeässä, ja Curiet ihailivat sitä. Marie sai fysiikan Nobelin vuonna 1903 '
          + 'Pierren ja Henri Becquerelin kanssa ja kemian Nobelin vuonna 1911 yksin.',
        vuodet: [
          { vuosi: '1902', selite: 'radiumkloridi', kohta: 'vuonna 1902' },
          { vuosi: '1903', selite: 'fysiikan Nobel', kohta: 'vuonna 1903' },
          { vuosi: '1911', selite: 'kemian Nobel', kohta: 'vuonna 1911' },
        ],
      },
      {
        osa: 'tanaan',
        kuva: 'laatta',
        teksti: 'Koulun seinässä on laatta, joka kertoo löydöstä. Marien myöhempi laboratorio on lähellä '
          + 'Curie-museona.',
      },
    ],
    /*
     * jaksokuvat: kaikki jo olemassa olevia (ei uusia generoituja kuvia): havainnekuva hetken
     * ämpärikuvasta, muut Commonsin vapaita kuvia (lisenssit luettu 18.11.2026).
     * Viimeinen kuva on aito nykyvalokuva.
     */
    jaksokuvat: {
      hohto: {
        osoite: 'https://media.matkakirja.app/kuvat/tarina-curie-1898-4-hohto.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Hämärä vaja, pöydällä pulloja ja putkia, jotka hohtavat himmeästi',
        lahde: 'Tekoälyllä tuotettu havainnekuva; Matkakirjan havainnekuva. Haalea sinivihreä hohto on kuvituksen tulkinta; viitteinä AIP (Marie Curien muistelmat) ja Wikimedia Commons (public domain)',
        tekija: 'Matkakirja (tekoälyllä tuotettu havainnekuva)',
        lisenssi: 'Matkakirjan oma',
        leveys: 1200,
        korkeus: 800,
      },
      radiumtyo: {
        osoite: 'https://media.matkakirja.app/kuvat/tarina-curie-1898-2-radiumtyo.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Marie ja Pierre Curie työssä vajassa, jonka katto vuotaa',
        lahde: 'Tekoälyllä tuotettu havainnekuva; Matkakirjan havainnekuva. Rekonstruktio; työtilan ja asujen viitteinä Wikimedia Commons (public domain), AIP (Marie Curien muistelmat)',
        tekija: 'Matkakirja (tekoälyllä tuotettu havainnekuva)',
        lisenssi: 'Matkakirjan oma',
        leveys: 1200,
        korkeus: 800,
      },
      vaja: {
        osoite: 'https://media.matkakirja.app/kuvat/tarina-curie-1898-1-vaja.jpg',
        laji: 'havainnekuva',
        lyhyt: 'Curien työtilana toiminut pihavaja koulun pihalla',
        lahde: 'Tekoälyllä tuotettu havainnekuva; Matkakirjan havainnekuva. Vajan julkisivu on rekonstruktio; viitteinä AIP (Marie Curien muistelmat) ja Wikimedia Commons (public domain), Musée Curien arkistokuvaa ei käytetty',
        tekija: 'Matkakirja (tekoälyllä tuotettu havainnekuva)',
        lisenssi: 'Matkakirjan oma',
        leveys: 1200,
        korkeus: 800,
      },
      laatta: {
        osoite: 'https://media.matkakirja.app/kuvat/curie-1898-laatta.jpg',
        laji: 'valokuva',
        lyhyt: 'Laatta kertoo radiumin löydöstä koulun seinässä',
        lahde: 'Monceau from San Antonio, Wikimedia Commons (CC BY 2.0), rajattu',
        tekija: 'Monceau from San Antonio',
        lisenssi: 'CC BY 2.0',
        leveys: 1200,
        korkeus: 800,
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
    otsikko: 'Ilta, jona kuvat alkoivat liikkua',
    /*
     * Äänitteitä ei ole vielä: `aanikansio` ja jaksojen `aanite` lisätään, kun Äänittäjä on
     * äänittänyt (äänitysjonon rivit ovat data/aanitysjono.tsv:ssä). Siihen asti jaksot
     * kuuluvat suoratoistona.
     */
    jaksot: [
      {
        osa: 'tapahtuma',
        kuva: 'bulevardi',
        teksti: 'Grand Café oli kahvila Capucines-bulevardilla Pariisissa, ja sen kellarissa maksava yleisö '
          + 'katsoi Lumièren veljesten elokuvaa.',
      },
      {
        osa: 'tapahtuma',
        kuva: 'portti',
        teksti: 'Lumièren veljekset patentoivat keksintönsä helmikuussa 1895. Laite oli kamera ja projektori '
          + 'yhdessä, ja sillä kuvattu filmi oli noin minuutin pituinen.',
        vuodet: [
          { vuosi: '1895', selite: 'patentti', kohta: 'helmikuussa 1895' },
        ],
      },
      {
        osa: 'tapahtuma',
        kuva: 'portti',
        teksti: 'Joulukuun 28. päivänä 1895 Grand Cafén kellarisalissa pidettiin maksullinen näytös. Lippu maksoi '
          + 'frangin, ja illalla katsojia oli vain kolmisenkymmentä. Valkokankaalla Lumièren tehtaan portti '
          + 'Lyonissa aukesi, ja työläiset kävelivät ulos.',
        vuodet: [
          { vuosi: '1895', selite: 'Grand Cafén näytös', kohta: 'päivänä 1895' },
        ],
      },
      {
        osa: 'kaanne',
        kuva: 'melies',
        teksti: 'Kutsuvieraiden joukossa oli taikuri Georges Méliès. Hän halusi ostaa laitteen, mutta Lumièret '
          + 'eivät myyneet sitä. Puhe levisi, ja kadulle syntyi jono. Méliès alkoi tehdä omia elokuviaan: '
          + 'ensimmäisen hän teki vuonna 1896 ja Matkan kuuhun vuonna 1902.',
        vuodet: [
          { vuosi: '1896', selite: 'Mélièsin elokuva', kohta: 'vuonna 1896' },
          { vuosi: '1902', selite: 'Matka kuuhun', kohta: 'vuonna 1902' },
        ],
      },
      {
        osa: 'tanaan',
        kuva: 'scribe',
        teksti: 'Grand Cafén paikalla on nykyään Hôtel Scribe. Sen ravintoloiden sisäänkäynnillä on laatta, joka '
          + 'kertoo näytöksestä.',
      },
    ],
    /*
     * jaksokuvat: kaikki jo olemassa olevia (ei uusia generoituja kuvia): havainnekuva hetken
     * ämpärikuvasta, muut Commonsin vapaita kuvia. Viimeinen kuva on aito nykyvalokuva.
     */
    jaksokuvat: {
      bulevardi: {
        osoite: 'https://media.matkakirja.app/kuvat/lumiere-1895-bulevardi.jpg',
        laji: 'valokuva',
        lyhyt: 'Capucines-bulevardi 1890-luvulla, Café de la Paix oikealla',
        lahde: 'Tuntematon valokuvaaja, Wikimedia Commons (Public domain), rajattu',
        tekija: 'Tuntematon kuvaaja',
        lisenssi: 'Public domain',
        leveys: 1200,
        korkeus: 800,
      },
      portti: {
        osoite: 'https://media.matkakirja.app/kuvat/lumiere-1895-portti.jpg',
        laji: 'valokuva',
        lyhyt: 'Ruutu Lumièren tehtaan elokuvasta',
        lahde: 'Louis Lumière (ruutu elokuvasta), Wikimedia Commons (Public domain), rajattu',
        tekija: 'Tuntematon (Louis Lumièren elokuva)',
        lisenssi: 'Public domain',
        leveys: 1200,
        korkeus: 800,
      },
      melies: {
        osoite: 'https://media.matkakirja.app/kuvat/lumiere-1895-melies.jpg',
        laji: 'valokuva',
        lyhyt: 'Kohtaus Mélièsin elokuvasta Matka kuuhun, 1902',
        lahde: 'Georges Méliès, Wikimedia Commons (Public domain), rajattu',
        tekija: 'Georges Méliès',
        lisenssi: 'Public domain',
        leveys: 1200,
        korkeus: 800,
      },
      scribe: {
        osoite: 'https://media.matkakirja.app/kuvat/lumiere-1895-scribe.jpg',
        laji: 'valokuva',
        lyhyt: 'Hôtel Scribe Capucines-bulevardilla nykyään',
        lahde: 'ScareCriterion12, Wikimedia Commons (CC BY-SA 4.0), rajattu',
        tekija: 'ScareCriterion12',
        lisenssi: 'CC BY-SA 4.0',
        leveys: 1200,
        korkeus: 800,
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
    otsikko: 'Mies, joka punnitsi kaiken',
    /*
     * Äänitteitä ei ole vielä: `aanikansio` ja jaksojen `aanite` lisätään, kun Äänittäjä on
     * äänittänyt (äänitysjonon rivit ovat data/aanitysjono.tsv:ssä). Siihen asti jaksot
     * kuuluvat suoratoistona.
     */
    jaksot: [
      {
        osa: 'tapahtuma',
        kuva: 'koe',
        teksti: 'Lavoisierin laboratorio oli Arsenaalin asunnon yhteydessä Pariisissa. Antoine Lavoisier johti '
          + 'Arsenaalissa ruudin valmistusta ja punnitsi laboratoriossaan kaiken ennen koetta ja sen jälkeen. '
          + 'Tuloksista hän päätteli, että ainetta on kokeen jälkeen yhtä paljon kuin ennen sitä.',
      },
      {
        osa: 'tapahtuma',
        kuva: 'koe',
        teksti: 'Vuonna 1771 Lavoisier meni naimisiin Marie-Annen kanssa. Marie-Anne oppi englantia ja käänsi '
          + 'ulkomaisia tutkimuksia ranskaksi. Lavoisier huomasi kokeissaan, että palaessa aine yhtyy ilman '
          + 'osaan, jonka hän nimesi hapeksi.',
        vuodet: [
          { vuosi: '1771', selite: 'naimisiin', kohta: 'Vuonna 1771' },
        ],
      },
      {
        osa: 'tapahtuma',
        kuva: 'david',
        teksti: 'Vuonna 1788 Jacques-Louis David maalasi Lavoisierista ja Marie-Annesta muotokuvan. Marie-Annen '
          + 'työ näkyi myös oppikirjassa: vuonna 1789 ilmestyneeseen Lavoisierin oppikirjaan hän piirsi '
          + 'laitteiden kuvat.',
        vuodet: [
          { vuosi: '1788', selite: 'Davidin muotokuva', kohta: 'Vuonna 1788' },
          { vuosi: '1789', selite: 'oppikirja', kohta: 'vuonna 1789' },
        ],
      },
      {
        osa: 'tanaan',
        kuva: 'valineet',
        teksti: 'Lavoisier oli kuulunut vanhan hallinnon veronkantajiin. Vallankumouksen tuomioistuin tuomitsi '
          + 'hänet kuolemaan, ja hänet mestattiin toukokuun 8. päivänä 1794. Lavoisierin laboratorion '
          + 'välineitä on nykyään Arts et Métiers -museossa Pariisissa.',
        vuodet: [
          { vuosi: '1794', selite: 'Lavoisier mestattiin', kohta: 'päivänä 1794' },
        ],
      },
    ],
    /*
     * jaksokuvat: kaikki jo olemassa olevia (ei uusia generoituja kuvia): Wellcomen kuva (Commons),
     * hetken havainnekuva sekä jaksoille 4 ja 5 Commons-kuvat (SK 18.11.2026, KK 03.32).
     */
    jaksokuvat: {
      koe: {
        osoite: 'https://media.matkakirja.app/kuvat/lavoisier-1780-koe.jpg',
        laji: 'piirros',
        lyhyt: 'Lavoisierin koe laboratoriossa, 1700-luvun piirros',
        lahde: 'Wellcome Collection, Wikimedia Commons (CC BY 4.0), rajattu',
        tekija: 'Tuntematon (Wellcome Collection)',
        lisenssi: 'CC BY 4.0',
        leveys: 1200,
        korkeus: 800,
      },
      david: {
        osoite: 'https://media.matkakirja.app/kuvat/lavoisier-1780-david.jpg',
        laji: 'maalaus',
        lyhyt: 'Davidin maalaus Lavoisierista ja Marie-Annesta 1788',
        lahde: 'Jacques-Louis David 1788, Wikimedia Commons (Public domain), rajattu',
        tekija: 'Jacques-Louis David',
        lisenssi: 'Public domain',
        leveys: 1200,
        korkeus: 800,
      },
      valineet: {
        osoite: 'https://media.matkakirja.app/kuvat/lavoisier-1780-valineet.jpg',
        laji: 'valokuva',
        lyhyt: 'Lavoisierin laboratorion välineitä Arts et Métiersissä',
        lahde: 'Rama, Wikimedia Commons (CC BY-SA 2.0 fr), rajattu',
        tekija: 'Rama',
        lisenssi: 'CC BY-SA 2.0 fr',
        leveys: 1200,
        korkeus: 800,
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
    otsikko: 'Pullot, jotka pysyivät kirkkaina',
    /*
     * Äänitteitä ei ole vielä: `aanikansio` ja jaksojen `aanite` lisätään, kun Äänittäjä on
     * äänittänyt (äänitysjonon rivit ovat data/aanitysjono.tsv:ssä). Siihen asti jaksot
     * kuuluvat suoratoistona.
     */
    jaksot: [
      {
        osa: 'tapahtuma',
        kuva: 'piha',
        teksti: 'Pasteurin laboratorio oli École normale supérieuren tiloissa rue d\'Ulmilla Pariisissa. Louis '
          + 'Pasteur tuli kouluun vuonna 1857 tieteellisten opintojen johtajaksi.',
        vuodet: [
          { vuosi: '1857', selite: 'tulee kouluun', kohta: 'vuonna 1857' },
        ],
      },
      {
        osa: 'tapahtuma',
        kuva: 'pullo',
        teksti: 'Pasteurin vastustaja Félix Pouchet uskoi, että elämä voi syntyä itsestään mätänevästä aineesta. '
          + 'Tiedeakatemia oli luvannut palkinnon sille, joka ratkaisee kiistan kokeilla.',
      },
      {
        osa: 'tapahtuma',
        kuva: 'pullo',
        teksti: 'Pasteur keitti lientä lasipulloissa, joiden kaula oli taivutettu joutsenen kaulan muotoon. Ilma '
          + 'pääsi pulloon, mutta pöly jäi mutkaan, ja liemi pysyi kirkkaana. Vuonna 1860 hän vei liemipulloja '
          + 'jopa Alppien jäätikölle, jossa ilmassa oli vain vähän pölyä.',
        vuodet: [
          { vuosi: '1860', selite: 'pullot jäätiköllä', kohta: 'Vuonna 1860' },
        ],
      },
      {
        osa: 'kaanne',
        kuva: 'maalaus',
        teksti: 'Pasteur voitti kiistan ja julkaisi tuloksensa 1860-luvun alussa. Hän osoitti myös, että käyminen '
          + 'on elävien mikrobien työtä. Viinin tauteja hän torjui kuumentamalla viiniä, ja keksinnölle '
          + 'haettiin patentti vuonna 1865. Menetelmää kutsutaan pastöroinniksi.',
        vuodet: [
          { vuosi: '1865', selite: 'pastörointipatentti', kohta: 'vuonna 1865' },
        ],
      },
      {
        osa: 'tanaan',
        kuva: 'ens',
        teksti: 'Vuonna 1888 avattiin Institut Pasteur, joka kantaa hänen nimeään. École normale supérieure '
          + 'toimii yhä rue d\'Ulmilla Latinalaiskorttelissa.',
        vuodet: [
          { vuosi: '1888', selite: 'Institut Pasteur', kohta: 'Vuonna 1888' },
        ],
      },
    ],
    /*
     * jaksokuvat: kaikki jo olemassa olevia (ei uusia generoituja kuvia): hetken havainnekuva ja
     * Edelfeltin maalaus (Commons, PD); jaksoille 3 ja 5 Commons-kuvat (SK 18.11.2026, KK 03.32).
     */
    jaksokuvat: {
      piha: {
        osoite: 'https://media.matkakirja.app/kuvat/pasteur-1862-piha.jpg',
        laji: 'valokuva',
        lyhyt: 'École normale supérieuren sisäpiha rue d\'Ulmilla',
        lahde: 'Jan Sokol, Wikimedia Commons (CC BY-SA 3.0), rajattu',
        tekija: 'Jan Sokol',
        lisenssi: 'CC BY-SA 3.0',
        leveys: 1200,
        korkeus: 800,
      },
      pullo: {
        osoite: 'https://media.matkakirja.app/kuvat/pasteur-1862-pullo.jpg',
        laji: 'valokuva',
        lyhyt: 'Joutsenkaulapullo Pasteurin kokeista',
        lahde: 'Wellcome Collection, Wikimedia Commons (CC BY 4.0), rajattu, taustaa jatkettu',
        tekija: 'Tuntematon (Wellcome Collection)',
        lisenssi: 'CC BY 4.0',
        leveys: 1200,
        korkeus: 800,
      },
      maalaus: {
        osoite: 'https://media.matkakirja.app/kuvat/pasteur-1862-maalaus.jpg',
        laji: 'maalaus',
        lyhyt: 'Edelfeltin maalaus Pasteurista laboratoriossa 1885',
        lahde: 'Albert Edelfelt 1885, Wikimedia Commons (Public domain), rajattu',
        tekija: 'Albert Edelfelt',
        lisenssi: 'Public domain',
        leveys: 1200,
        korkeus: 800,
      },
      ens: {
        osoite: 'https://media.matkakirja.app/kuvat/pasteur-1862-ens.jpg',
        laji: 'valokuva',
        lyhyt: 'École normale supérieuren sisäänkäynti rue d\'Ulmilla',
        lahde: 'Mbzt, Wikimedia Commons (CC BY 4.0), rajattu',
        tekija: 'Mbzt',
        lisenssi: 'CC BY 4.0',
        leveys: 1200,
        korkeus: 800,
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
  {
    /*
     * PALAIS GARNIER (Pariisin nostot uudella tavalla, erä 12; PT 18.11.2026). 48,8719 N / 2,3317 E — sama
     * piste kuin kartan Palais Garnier -nähtävyys. Yksi paikka = yksi nosto: entinen nähtävyysjuttu
     * "Palais Garnier" (nahtavyysjutut.js) on tässä jaksoina. Piaf ja Django (`nosto-pariisi-soi`) on riippumaton
     * tarina eikä kuulu tähän juoneen (suunnitelman 1.5 kohta 4): se pysyy omana tarinanaan saman pisteen alla.
     * Lähdeaineisto: docs/raportit/palais-garnier-nosto-teksti-20261118.md (ei pelaajalle näkyvään tekstiin).
     */
    id: 'palais-garnier',
    nimi: 'Palais Garnier',
    tyyppi: 'historia',
    symboli: 'historia',
    // Pulun kysymykset kolme (vastauksia ei kirjoiteta).
    kysymykset: [
      'Miksi Napoleon III halusi uuden oopperan?',
      'Miksi oopperan kellariin rakennettiin säiliö?',
      'Mitä Palais Garnierissa esitetään nykyään?',
    ],
    korostukset: ['Charles Garnier', 'Marc Chagall'],
    nappi: 'Ooppera, joka odotti',
    laudat: {
      maailmankartta: { x: 5911.1, y: 1438.9 },
      europe: { x: 256.0, y: 608.3 },
    },
    // teksti lasketaan jaksoista tiedoston lopussa.
    lahde: 'Matkakirjan oma teksti · lähteinä napoleon.org, Pariisin oopperan sivut (operadeparis.fr), Bonjour Paris, '
      + 'evous.fr, Visiting Paris by Yourself, Hérodote.net, Art Visit Guide ja Europe for Visitors '
      + '(avatut sivut, tarkistettu 18.11.2026).',
    otsikko: 'Ooppera, joka odotti',
    /*
     * Äänitteitä ei ole vielä: `aanikansio` ja jaksojen `aanite` lisätään, kun Äänittäjä on
     * äänittänyt (äänitysjonon rivit ovat data/aanitysjono.tsv:ssä).
     */
    jaksot: [
      {
        osa: 'tapahtuma',
        kuva: 'piirtosali',
        teksti: 'Palais Garnier on Pariisin oopperatalo, jonka rakentamisen sai alkuun murhayritys. Vuonna 1858 '
          + 'keisari Napoleon III välttyi murhayritykseltä vanhan oopperan edessä. Sen jälkeen hän päätti '
          + 'rakennuttaa uuden. Kilpailuun tuli yli sata ehdotusta, ja voittajaksi valittiin nuori, '
          + 'tuntematon arkkitehti Charles Garnier.',
        vuodet: [
          { vuosi: '1858', selite: 'murhayritys', kohta: 'Vuonna 1858' },
        ],
      },
      {
        osa: 'tapahtuma',
        kuva: 'tyomaa',
        teksti: 'Kun työmaalla kaivettiin perustuksia, maasta nousi pohjavettä. Garnier rakennutti kellariin '
          + 'vesitiiviin betonisäiliön. Vuonna 1870 alkanut sota ja Pariisin kommuuni pysäyttivät '
          + 'rakentamisen.',
        vuodet: [
          { vuosi: '1870', selite: 'sota alkaa', kohta: 'Vuonna 1870' },
        ],
      },
      {
        osa: 'kaanne',
        kuva: 'palo',
        teksti: 'Syksyllä 1873 vanha oopperatalo paloi. Palon jälkeen Garnierin työmaa sai jatkua, ja uusi talo '
          + 'valmistui alle kahdessa vuodessa.',
        vuodet: [
          { vuosi: '1873', selite: 'vanha ooppera paloi', kohta: 'Syksyllä 1873' },
        ],
      },
      {
        osa: 'tanaan',
        kuva: 'portaikko',
        teksti: 'Talo avattiin tammikuussa 1875, ja Garnier joutui maksamaan paikkansa avajaisissa itse. Nykyään '
          + 'talossa esitetään yhä balettia, ja katsomon katon on maalannut Marc Chagall vuonna 1964.',
        vuodet: [
          { vuosi: '1875', selite: 'talo avattiin', kohta: 'tammikuussa 1875' },
          { vuosi: '1964', selite: 'kattomaalaus', kohta: 'vuonna 1964' },
        ],
      },
    ],
    jaksokuvat: {
      piirtosali: {
        osoite: 'https://media.matkakirja.app/kuvat/palais-garnier-piirtosali.jpg',
        laji: 'valokuva',
        lyhyt: 'Arkkitehdit Garnierin piirtosalissa',
        lahde: 'Louis-Émile Durandelle, Metropolitan Museum of Art, Wikimedia Commons (CC0), esirajattu ja rajattu',
        tekija: 'Louis-Émile Durandelle',
        lisenssi: 'CC0',
        leveys: 1200,
        korkeus: 800,
      },
      tyomaa: {
        osoite: 'https://media.matkakirja.app/kuvat/palais-garnier-tyomaa.jpg',
        laji: 'valokuva',
        lyhyt: 'Palais Garnierin työmaa 1866',
        lahde: 'Delmaet & Durandelle 1866, Wikimedia Commons (CC0), rajattu',
        tekija: 'Delmaet & Durandelle',
        lisenssi: 'CC0',
        leveys: 1200,
        korkeus: 800,
      },
      palo: {
        osoite: 'https://media.matkakirja.app/kuvat/palais-garnier-palo.jpg',
        laji: 'piirros',
        lyhyt: 'Vanhan oopperatalon palo rue Le Peletierillä',
        lahde: 'Arthur Hauger (Le Monde illustré, 1873), Paris Musées / Musée Carnavalet, Wikimedia Commons (CC0), esirajattu ja rajattu',
        tekija: 'Arthur Hauger',
        lisenssi: 'CC0',
        leveys: 1200,
        korkeus: 800,
      },
      portaikko: {
        osoite: 'https://media.matkakirja.app/kuvat/palais-garnier-portaikko.jpg',
        laji: 'valokuva',
        lyhyt: 'Palais Garnierin pääportaikko',
        lahde: 'Pierre André Leclercq, Wikimedia Commons (CC BY-SA 4.0), rajattu',
        tekija: 'Pierre André Leclercq',
        lisenssi: 'CC BY-SA 4.0',
        leveys: 1200,
        korkeus: 800,
      },
    },
    visa: {
      kysymys: 'Kuka taiteilija maalasi Palais Garnierin katsomon katon 1960-luvulla?',
      vaihtoehdot: ['Marc Chagall', 'Claude Monet', 'Pablo Picasso'],
      oikea: 0,
      fakta: 'Marc Chagall maalasi Palais Garnierin katsomon katon vuonna 1964.',
    },
  },
];

/*
 * TUILERIES-KOE: kohteen `teksti` = jaksot kappaleina ilman nimiosaa (vuodesta 20.11.2026 jaksoissa ei ole
 * nimi-, esittely- eikä isoisäjaksoa). Yksi lähde: vanha esitys, lehti
 * (js/lehtinostot.js) ja Pulun konteksti lukevat saman tekstin kuin
 * jaksoesitys.
 */
for (const kohde of FOKUSKOHTEET_FRA) {
  if (Array.isArray(kohde.jaksot) && kohde.teksti == null) {
    // `nimi`-osa jää pois: kohteen nimi luetaan jo otsikkona (Puhe.cs), joten sen toisto antaisi nimen kahdesti.
    kohde.teksti = kohde.jaksot.filter((j) => j.osa !== 'nimi').map((j) => j.teksti).join('\n\n');
  }
}
