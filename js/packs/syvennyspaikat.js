/*
 * SYVENNYSTARINOIDEN PAIKAT JA AIHESYMBOLIT — karttamerkin data.
 *
 * Raamatun kirjaus SYVENNYSTARINAT KARTALLE (omistaja 29.8.2026 ilta):
 * v1326:ssa reitittömiksi jääneet fokusvirtatäkyt — syvennystarinat
 * kuvineen ja minivisoineen — siirretään KARTALLE MERKEIKSI. Tarinat
 * itse asuvat kaupunkien fokusvirtapaketeissa (js/packs/fokusvirta-*.js
 * `takyt`); tämä taulu antaa jokaiselle tarinalle sen, mitä kartta
 * tarvitsee eikä paketti kanna:
 *
 *   lat/lon   jutun tapahtumapaikka asteina. Laudalle projisoidaan
 *             ajossa (js/fokusmitat.js projisoiLaudalle) — sama
 *             ratkaisu kuin eläintäyillä (js/packs/elaintakyt.js),
 *             joten sama taulu palvelee jokaista lautaa ilman
 *             käsin laskettuja koordinaatteja.
 *   symboli   aihesymboli symbolikirjaston kategoriana
 *             (js/fokusnosto-symbolit.js NOSTOSYM_TYYPIT). Raamatun
 *             YHTENÄINEN KOHDEMALLI: erot kohteiden välillä ovat
 *             sisällön laajuus ja AIHESYMBOLI — selitevalikon aihevalo
 *             löytää tarinan tällä (NOSTOSYM_PAAKATEGORIAT).
 *   nimio     lyhyt karttanimiö merkin kylkeen (≤ ~18 merkkiä ennen
 *             lyhennystä) — kortin otsikko on lause, nimiö on nimi.
 *
 * KOORDINAATIT ON TARKISTETTU LÄHTEISTÄ (agenttikartoitus 30.8.2026,
 * erä 2 samana päivänä): jokaisen pisteen kommentissa on paikan nimi
 * ja lähde, ja arvioksi jäänyt sijainti on merkitty. Sisältöön
 * (otsikot, tekstit, visat, kuvat) tämä tiedosto ei koske sanallakaan.
 *
 * Avaimet: kaupunki-id (js/packs/fokusvirrat.js) → täyn id → tiedot.
 * Erän 2 jälkeen taulussa ovat KAIKKI 39 fokuskaupunkia.
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten ainoa top-level-nimi alkaa
 * SYVENNYS-etuliitteellä.
 */

export const SYVENNYSPAIKAT = {
  amsterdam: {
    /*
     * Boasin veljesten höyryhiomo 1879 (nyk. Gassan Diamonds),
     * Nieuwe Uilenburgerstraat 173–175 (sijainti on arvio).
     * Lähde: Nominatim/OSM "Gassan Diamonds, Nieuwe Uilenburgerstraat
     *   173-175, Amsterdam" (30.8.2026); arvio, koska teksti nimeää kaksi
     *   paikkaa (alkuperäinen hevoskiertohiomo Nieuwe Keizersgrachtilla
     *   1870 ja höyrytehdas 1879) ja piste on valittu jälkimmäiselle,
     *   joka seisoo yhä
     */
    timantit: {
      lat: 52.3696, lon: 4.904, symboli: 'kauppa', nimio: 'Timanttihiomo',
    },
    /*
     * Amsterdamin keskusta (Dam; yleinen kaupunkiaihe, ei yksittäistä
     * paikkaa) (sijainti on arvio).
     * Lähde: en-Wikipedia "Dam Square" -koordinaatit (API prop=coordinates
     *   30.8.2026); teksti ei sido haikaroita yhteen paikkaan (kanavat,
     *   torikojut, pikaruokapaikat) — sijoitettu symbolisesti keskustaan,
     *   kuten Berliinin viemärit
     */
    haikarat: {
      lat: 52.3731, lon: 4.8928, symboli: 'elain', nimio: 'Harmaahaikarat',
    },
    /*
     * Het Scheepvaartmuseum (Amsterdam-laivan täysikokoinen replika
     * museon laiturissa) (sijainti on arvio).
     * Lähde: nl-Wikipedia "Het Scheepvaartmuseum" -koordinaatit (API
     *   prop=coordinates 30.8.2026); tarinan todellinen paikka on hylky
     *   Bulverhythen rannassa Hastingsissa Englannissa (en-Wikipedia
     *   "Amsterdam (1748 ship)": 50,8469 N / 0,5243 E), mutta se on maan
     *   ulkopuolella — piste annettu laivan replikalle merimuseon
     *   laiturissa, tehtävänannon maarajauksen mukaisesti
     */
    'voc-hylky': {
      lat: 52.3714, lon: 4.9147, symboli: 'merenkulku', nimio: 'Amsterdam-laiva',
    },
  },
  ateena: {
    /*
     * Athena Niken temppeli, Akropoliin lounaiskulma.
     * Lähde: en-Wikipedia "Temple of Athena Nike" -koordinaatit; sama alue
     *   kuin pakin oma kohtaamispiste "Akropolis" (23,72573E/37,97154N)
     */
    nike: {
      lat: 37.9717, lon: 23.7258, symboli: 'historia', nimio: 'Niken temppeli',
    },
    /*
     * Ateenan antiikin agora (Ancient Agora of Athens).
     * Lähde: en-Wikipedia "Ancient Agora of Athens" -koordinaatit
     */
    diogenes: {
      lat: 37.975, lon: 23.7233, symboli: 'sana', nimio: 'Diogeneen astia',
    },
    /*
     * Iliou Melathron / Ateenan numismaattinen museo, Panepistimiou-katu 12.
     * Lähde: en-Wikipedia "Numismatic Museum, Athens" -koordinaatit
     */
    schliemann: {
      lat: 37.9808, lon: 23.7328, symboli: 'historia', nimio: 'Iliou Melathron',
    },
  },
  barcelona: {
    /*
     * Font de Canaletes, Ramblan yläpää (lintutorin Rambla dels Estudis
     * alkaa samasta kohdasta).
     * Lähde: en-Wikipedia "Font de Canaletes" -koordinaatit (API
     *   prop=coordinates 30.8.2026); tekstin kaksi kauppaa — lintutori ja
     *   lähde — ovat molemmat Ramblan yläpäässä, ja lähde on niistä se,
     *   joka on yhä paikallaan
     */
    rambla: {
      lat: 41.3853, lon: 2.1701, symboli: 'kulttuuri', nimio: 'Font de Canaletes',
    },
    /*
     * Sant Sadurní d'Anoia (cavan kotikylä, Fil·loxeran juhla).
     * Lähde: ca-Wikipedia "Sant Sadurní d'Anoia" -koordinaatit (API
     *   prop=coordinates 30.8.2026); teksti kattaa koko Katalonian
     *   viinialueen, mutta nimeää täsmäpaikkana Sant Sadurnín, jossa
     *   kirvaa yhä juhlitaan ja jossa Codorníun Raventós teki cavansa
     *   1872 — kauempana kaupungista tarkoituksella, kuten Korintin
     *   kanava -tyyppi
     */
    filloksera: {
      lat: 41.4261, lon: 1.785, symboli: 'ruoka', nimio: 'Sant Sadurní',
    },
    /*
     * Plaça de Rovira i Trias, Gràcia (kilpailun voittajan muistoaukio,
     * jossa hänen kaavansa on valettu pronssiin) (sijainti on arvio).
     * Lähde: ca-Wikipedia "Plaça de Rovira i Trias" -koordinaatit (API
     *   prop=coordinates 30.8.2026); arvio, koska tarina koskee koko
     *   Eixamplen kenttää eikä teksti nimeä tätä aukiota — piste on
     *   valittu muistomerkille, jossa Roviran patsas istuu voittaneen,
     *   rakentamatta jääneen kaavansa päällä (tarinan ydin: voittaja
     *   jäi paperille)
     */
    kilpailu: {
      lat: 41.4076, lon: 2.1584, symboli: 'kaupunki', nimio: 'Roviran aukio',
    },
  },
  bergen: {
    /*
     * Borgundin sauvakirkko, Lærdal, Vestland.
     * Lähde: en-Wikipedia "Borgund Stave Church" -koordinaatit (API
     *   prop=coordinates 30.8.2026); kauempana Bergenistä tarkoituksella —
     *   teksti nimeää kirkon ja paikkakunnan suoraan
     */
    sauvakirkko: {
      lat: 61.0472, lon: 7.8122, symboli: 'historia', nimio: 'Borgundin kirkko',
    },
    /*
     * Dovrefjell (Snøhettan tunturialue, myskihärkäkannan ydinalue)
     * (sijainti on arvio).
     * Lähde: en-Wikipedia "Snøhetta" -koordinaatit (API prop=coordinates
     *   30.8.2026); teksti puhuu Dovrefjellin tuntureista, ei yhdestä
     *   pisteestä — piste annettu alueen tunnetuimmalle huipulle, jonka
     *   ympärillä lauma elää; koko maan eläinaihe kaukana Bergenistä,
     *   kuten Zărneștin karhut
     */
    myskiharka: {
      lat: 62.3198, lon: 9.2677, symboli: 'elain', nimio: 'Dovrefjell',
    },
    /*
     * Geirangervuono, Møre og Romsdal.
     * Lähde: en-Wikipedia "Geirangerfjord" -koordinaatit (API
     *   prop=coordinates 30.8.2026); kauempana Bergenistä tarkoituksella —
     *   teksti kertoo juuri tästä vuonosta
     */
    vuono: {
      lat: 62.121, lon: 7.129, symboli: 'luonto', nimio: 'Geirangervuono',
    },
  },
  berliini: {
    /*
     * Voitonpylväs (Siegessäule), Großer Stern (sijainti on arvio).
     * Lähde: en/de-Wikipedia "Siegessäule" -koordinaatit (nykyinen paikka
     *   Großer Sternillä; teksti kuvaa 1873 vihkiäisiä Königsplatzilla,
     *   nyk. Platz der Republik n. 1,5 km pohjoisempana — arvio, koska
     *   kahdesta mahdollisesta pisteestä on valittu nykyinen)
     */
    kultaliisa: {
      lat: 52.5145, lon: 13.3501, symboli: 'historia', nimio: 'Kulta-Liisa',
    },
    /*
     * Berliinin keskusta (yleinen sijainti, ei yksittäistä paikkaa) (sijainti on arvio).
     * Lähde: Täky ei kuvaa yksittäistä paikkaa vaan koko kaupungin
     *   viemäriverkon rakentamista; sijoitettu symbolisesti keskustaan
     *   (Alexanderplatz)
     */
    viemarit: {
      lat: 52.5219, lon: 13.4132, symboli: 'tekniikka', nimio: 'Hobrechtin putket',
    },
    /*
     * Köllnischer Park (Berliinin entisen karhutarhan paikka).
     * Lähde: en-Wikipedia "Köllnischer Park" -koordinaatit; Commons-kuvan
     *   kuvaus vahvistaa saman puiston
     */
    karhu: {
      lat: 52.5099, lon: 13.4143, symboli: 'elain', nimio: 'Berliinin karhu',
    },
  },
  budapest: {
    /*
     * Aquincum, Óbuda.
     * Lähde: en-Wikipedia "Aquincum" -koordinaatit
     */
    aquincum: {
      lat: 47.5661, lon: 19.0442, symboli: 'historia', nimio: 'Aquincum',
    },
    /*
     * Pál-völgyi-barlang (sijainti on arvio).
     * Lähde: en-Wikipedia "Pál-völgyi Cave" -koordinaatit; teksti mainitsee
     *   myös Szemlő-hegyin luolan ja Gellértinvuoren kristalliluolan, joten
     *   piste on annettu tekstin päänostona olevalle suurimmalle luolalle
     */
    luolat: {
      lat: 47.5394, lon: 18.9758, symboli: 'luonto', nimio: 'Budan luolat',
    },
    /*
     * Andrássy út / Millenniumin maanalainen (Oktogon, linjan keskivaihe) (sijainti on arvio).
     * Lähde: en-Wikipedia "Metro Line M1 (Budapest Metro)"; rata kulkee
     *   koko Andrássy-kadun alla Vörösmarty tériltä Hősök terelle, piste
     *   valittu reitin keskivaiheilta
     */
    kisfoldalatti: {
      lat: 47.5057, lon: 19.0631, symboli: 'tekniikka', nimio: 'Maanalainen',
    },
  },
  bukarest: {
    /*
     * Colțean tornin paikka.
     * Lähde: Pakin oma kommentti: en-Wikipedia "Turnul Colței"
     *   -koordinaatit (sama piste kuin paketin oma kohtaamispiste)
     */
    coltea: {
      lat: 44.43515, lon: 26.10298, symboli: 'historia', nimio: 'Colțean torni',
    },
    /*
     * Bukarestin vanhakaupunki (studion likimääräinen sijainti) (sijainti on arvio).
     * Lähde: Lähdeteksti (en-Wikipedia "Carol Popp de Szathmari",
     *   takyt-bukarest.md) ei anna studion tarkkaa osoitetta; sijoitettu
     *   Bukarestin vanhaankaupunkiin/Coltean lähelle, jossa hän toimi
     */
    szathmari: {
      lat: 44.4305, lon: 26.101, symboli: 'kulttuuri', nimio: 'Szathmárin studio',
    },
    /*
     * Libearty-karhusanktuaari, Zărnești (sijainti on arvio).
     * Lähde: en-Wikipedia "Zărnești" -koordinaatit (sanktuaarin täsmällistä
     *   porttia ei erikseen haettu); kaukana Bukarestista, kuten
     *   tehtävänannon Korintin kanava -tyyppinen poikkeus — koko maan
     *   eläinaihe
     */
    karhut: {
      lat: 45.558, lon: 25.349, symboli: 'elain', nimio: 'Karhusanktuaari',
    },
  },
  dublin: {
    /*
     * Trinity Collegen vanha kirjasto (Kellsin kirjan näyttelypaikka
     * vuodesta 1661).
     * Lähde: en-Wikipedia "Trinity College Dublin" -koordinaatit (API
     *   prop=coordinates 30.8.2026); teksti sanoo suoraan, että kirja
     *   tuli Trinity Collegeen 1661 ja isoisä näki sen siellä
     */
    kellsinkirja: {
      lat: 53.3444, lon: -6.2577, symboli: 'sana', nimio: 'Kellsin kirja',
    },
    /*
     * Guinnessin panimo, St James's Gate.
     * Lähde: en-Wikipedia "Guinness Brewery" -koordinaatit (API
     *   prop=coordinates 30.8.2026: 53,3444/−6,2889, tarkennettu
     *   panimoalueen keskelle St. James's Gaten artikkelin
     *   53,3433/−6,2846 kanssa); Arthur Guinnessin 9000 vuoden
     *   vuokrasopimuksen tontti
     */
    vuokrakirja: {
      lat: 53.3419, lon: -6.2867, symboli: 'kauppa', nimio: 'St James’s Gate',
    },
    /*
     * Dublinin eläintarha, Phoenix Park (Cairbre/Slats-leijonan
     * syntymäpaikka 1919).
     * Lähde: en-Wikipedia "Dublin Zoo" -koordinaatit (API prop=coordinates
     *   30.8.2026); tarinan loppu vie Hollywoodiin, mutta ankkuri on
     *   eläintarha, jossa leijona syntyi ja jota isoisän aikaan tultiin
     *   katsomaan
     */
    leijona: {
      lat: 53.3539, lon: -6.3039, symboli: 'elain', nimio: 'Dublinin leijona',
    },
  },
  dubrovnik: {
    /*
     * Minčetan torni, Dubrovnikin kaupunginmuuri.
     * Lähde: WebSearch: Tripomatic/locationscout, 42°38'34.9"N 18°6'30.4"E
     */
    tornit: {
      lat: 42.643, lon: 18.1084, symboli: 'historia', nimio: 'Muurin tornit',
    },
    /*
     * Lokrumin saari, Dubrovnikin edustalla.
     * Lähde: en-Wikipedia "Lokrum" (42°38'N 18°07'E, tarkennettu
     *   42.6311/18.1177)
     */
    lokrum: {
      lat: 42.632, lon: 18.1177, symboli: 'luonto', nimio: 'Lokrum',
    },
    /*
     * Sponzan palatsi, Stradun, Dubrovnikin vanhakaupunki.
     * Lähde: Wikidata Q2986276 / en-Wikipedia "Sponza Palace", 42°38'37"N
     *   18°6'36"E
     */
    sponza: {
      lat: 42.6436, lon: 18.11, symboli: 'kauppa', nimio: 'Sponzan palatsi',
    },
  },
  edinburgh: {
    /*
     * Greyfriars Bobbyn muistomerkki/juomakaivo, Candlemaker Row'n ja
     * George IV Bridgen kulma.
     * Lähde: en-Wikipedia "Greyfriars Bobby Fountain" -koordinaatit (API
     *   prop=coordinates 30.8.2026); juuri se muistomerkki, jonka isoisä
     *   kirjasi ennen sen paljastamista, Greyfriarsin kirkkomaan portin
     *   vieressä
     */
    bobby: {
      lat: 55.9469, lon: -3.1913, symboli: 'elain', nimio: 'Greyfriars Bobby',
    },
    /*
     * Arthur's Seat (arkkujen löytöpaikka koillisrinteellä 1836)
     * (sijainti on arvio).
     * Lähde: en-Wikipedia "Arthur's Seat" -koordinaatit (API
     *   prop=coordinates 30.8.2026, huipun piste); löytökolon tarkkaa
     *   kohtaa koillisrinteellä ei tunneta metrilleen, joten piste on
     *   vuoren huippu — arkut itse ovat nykyään National Museum of
     *   Scotlandissa
     */
    arkut: {
      lat: 55.9442, lon: -3.1619, symboli: 'sana', nimio: 'Pikkuarkut',
    },
    /*
     * Scott-monumentti, Princes Street Gardens.
     * Lähde: en-Wikipedia "Scott Monument" -koordinaatit (API
     *   prop=coordinates 30.8.2026)
     */
    'scott-monumentti': {
      lat: 55.9524, lon: -3.1933, symboli: 'sana', nimio: 'Scott-monumentti',
    },
  },
  firenze: {
    /*
     * Piazzale Michelangelo (Poggin terassi, viale dei Collin pääte).
     * Lähde: en-Wikipedia "Piazzale Michelangelo" -koordinaatit (API-haku
     *   30.8.2026: 43,76278/11,26506); teksti huipentuu juuri tähän
     *   terassiin ja Davidin jäljennökseen, ja pakin oma kuva on otettu
     *   tältä terassilta
     */
    paakaupunki: {
      lat: 43.7628, lon: 11.2651, symboli: 'kaupunki', nimio: 'Poggin terassi',
    },
    /*
     * Il Porcellino / Fontana del Porcellino, Mercato Nuovon loggia.
     * Lähde: it-Wikipedia "Fontana del Porcellino" -koordinaatit (API-haku
     *   30.8.2026: 43,769886/11,254233); parin sadan metrin päässä pakin
     *   kohtaamispisteestä Ponte Vecchiolta, kuten teksti sanoo
     */
    porcellino: {
      lat: 43.7699, lon: 11.2542, symboli: 'kulttuuri', nimio: 'Porcellino',
    },
    /*
     * Firenzen tuomiokirkko Santa Maria del Fiore (Toscanellin gnomoni
     * kupolissa).
     * Lähde: en-Wikipedia "Florence Cathedral" -koordinaatit (API-haku
     *   30.8.2026); tarinan konkreettinen paikka on kupoliin 1475
     *   puhkaistu gnomonireikä ja lattian meridiaaniviiva
     */
    toscanelli: {
      lat: 43.7731, lon: 11.2569, symboli: 'tekniikka', nimio: 'Duomon gnomoni',
    },
  },
  granada: {
    /*
     * Alhambra (Irvingin asuinhuoneet nasridien palatsissa, laatalla
     * merkityt).
     * Lähde: en-Wikipedia "Alhambra" -koordinaatit (API-haku 30.8.2026:
     *   37,1775/−3,59); sama paikka kuin pakin oma kohtaamispiste
     *   Alhambra — pakin oma visafakta mainitsee huoneet merkitsevän
     *   laatan
     */
    irving: {
      lat: 37.1775, lon: -3.59, symboli: 'sana', nimio: 'Irvingin huoneet',
    },
    /*
     * Alcaicería, tuomiokirkon kupeessa.
     * Lähde: en-Wikipedia "Alcaicería of Granada" -koordinaatit (API-haku
     *   30.8.2026: 37,17589/−3,59839)
     */
    alcaiceria: {
      lat: 37.1759, lon: -3.5984, symboli: 'kauppa', nimio: 'Alcaicería',
    },
    /*
     * Leijonain piha (Patio de los Leones), Alhambra — itäisen
     * paviljongin katto.
     * Lähde: en-Wikipedia "Court of the Lions" -koordinaatit (API-haku
     *   30.8.2026: 37,17707/−3,58927)
     */
    kupoli: {
      lat: 37.1771, lon: -3.5893, symboli: 'historia', nimio: 'Leijonain piha',
    },
  },
  helsinki: {
    /*
     * Kotiharjun sauna, Harjutorinkatu 1, Kallio, Helsinki.
     * Lähde: WebSearch: kotiharjunsauna.fi / Apple Maps, Harjutorinkatu 1
     */
    sauna: {
      lat: 60.18647, lon: 24.95728, symboli: 'kulttuuri', nimio: 'Löyly ja avanto',
    },
    /*
     * Helsingin keskusta (ei sidottu yksittäiseen paikkaan -- soitin, ei paikka) (sijainti on arvio).
     * Lähde: Ei todellista paikkaa tekstissä; sijoitettu kaupungin
     *   keskustaan yleisohjeen mukaisesti
     */
    kantele: {
      lat: 60.1699, lon: 24.9384, symboli: 'kulttuuri', nimio: 'Kantele',
    },
    /*
     * Ruotsalainen teatteri (Svenska Teatern), Helsinki -- kantaesityspaikka marraskuussa 1899.
     * Lähde: WebSearch: Wikidata Q926046, Pohjoisesplanadi 2, 60°10'02"N
     *   24°56'36"E
     */
    finlandia: {
      lat: 60.16722, lon: 24.94333, symboli: 'kulttuuri', nimio: 'Finlandia',
    },
  },
  istanbul: {
    /*
     * Käärmepylväs, Hippodromi/Sultanahmet, Istanbul.
     * Lähde: Peli: koodikommentti js/packs/fokusvirta-istanbul.js r.600
     *   (kaanon, kohtaamispiste käyttää samaa pylvästä)
     */
    kaarmepylvas: {
      lat: 41.0058, lon: 28.9758, symboli: 'historia', nimio: 'Käärmepylväs',
    },
    /*
     * Camondon portaat (Kamondo Merdivenleri), Galata/Karaköy, Istanbul.
     * Lähde: WebSearch: en-Wikipedia "Camondo Stairs", 41°01'31.7"N
     *   28°58'27.2"E
     */
    camondo: {
      lat: 41.02547, lon: 28.97422, symboli: 'kauppa', nimio: 'Camondon portaat',
    },
    /*
     * Kadıköy, Istanbulin Aasian puoli (kuva otettu siellä; teksti koskee koko kaupunkia) (sijainti on arvio).
     * Lähde: Yleistieto Kadıköyn keskipisteestä; teksti ei sido kissoja
     *   yhteen paikkaan, sijoitus kuvan ottopaikan mukaan
     */
    kissat: {
      lat: 40.9833, lon: 29.0333, symboli: 'elain', nimio: 'Istanbulin kissat',
    },
  },
  kiova: {
    /*
     * Kontraktova-aukio (Kontraktova ploštša), Podil (sijainti on arvio).
     * Lähde: Täky kertoo koko tšumakkien ammattikunnasta eikä yhdestä
     *   paikasta (suolareitit kulkivat Halytšynasta ja Mustaltamereltä
     *   pohjoiseen); sijoitettu Kiovan historialliselle kauppa- ja
     *   markkina-aukiolle Podiliin — koordinaatit en-Wikipedia
     *   "Kontraktova Square" (API prop=coordinates 30.8.2026)
     */
    tsumakit: {
      lat: 50.4639, lon: 30.5181, symboli: 'kauppa', nimio: 'Kontraktova',
    },
    /*
     * Poltava (Dokutšajevin mustamulta-tutkimusten seutu 1883)
     * (sijainti on arvio).
     * Lähde: en-Wikipedia "Poltava" -koordinaatit (API 30.8.2026); täky
     *   nimeää Poltavan seudun paikkana, jossa Dokutšajev kaivoi aromaat
     *   auki 1883 — koko seudun aihe, joten kaupungin keskipiste on
     *   arvio. Kaukana Kiovasta mutta maan sisällä, kuten Zărneștin
     *   karhut
     */
    mustamulta: {
      lat: 49.5894, lon: 34.5514, symboli: 'luonto', nimio: 'Mustamulta',
    },
    /*
     * Paltšykyn kylä, Tšernihivin alue (Prokopovytšin koulu, hauta ja
     * muistomerkki).
     * Lähde: uk-Wikipedia "Пальчики" -koordinaatit (API prop=coordinates
     *   30.8.2026); täky itse nimeää kylän: koulu toimi siellä 53
     *   vuotta, Prokopovytš haudattiin sinne ja kylässä on hänen
     *   muistomerkkinsä. Kaukana Kiovasta mutta maan sisällä
     */
    mehilaiset: {
      lat: 51.3092, lon: 32.7656, symboli: 'tekniikka', nimio: 'Prokopovytš',
    },
  },
  kobenhavn: {
    /*
     * Tivoli, Kööpenhamina.
     * Lähde: WebSearch: Wikidata Q110289, 55°40'25"N 12°34'06"E
     */
    tivoli: {
      lat: 55.67361, lon: 12.56833, symboli: 'kulttuuri', nimio: 'Tivolin portti',
    },
    /*
     * Jellingin kivet, Jylanti, Tanska.
     * Lähde: WebSearch: en-Wikipedia "Jelling stones", 55°45'24"N 9°25'10"E
     */
    jelling: {
      lat: 55.75667, lon: 9.41944, symboli: 'historia', nimio: 'Jellingin kivet',
    },
    /*
     * Billund, Tanska (Legon syntypaikka).
     * Lähde: WebSearch: en-Wikipedia "Billund, Denmark", 55.73083 N /
     *   9.11528 E
     */
    lego: {
      lat: 55.73083, lon: 9.11528, symboli: 'tekniikka', nimio: 'Legon syntysija',
    },
  },
  krakova: {
    /*
     * Sukiennice (kangashalli), Rynek Główny.
     * Lähde: pl-Wikipedia "Sukiennice w Krakowie" -koordinaatit (API
     *   prop=coordinates 30.8.2026)
     */
    sukiennice: {
      lat: 50.0617, lon: 19.9372, symboli: 'kauppa', nimio: 'Sukiennice',
    },
    /*
     * Mariankirkon korkeampi torni (Bazylika Mariacka), Rynek Główny.
     * Lähde: en-Wikipedia "St. Mary's Basilica, Kraków" -koordinaatit (API
     *   prop=coordinates 30.8.2026); soitto tapahtuu juuri tästä tornista
     */
    hejnal: {
      lat: 50.0617, lon: 19.9392, symboli: 'kulttuuri', nimio: 'Mariankirkon torni',
    },
    /*
     * Wawelin linna ja kukkula.
     * Lähde: en-Wikipedia "Wawel Castle" -koordinaatit (API
     *   prop=coordinates 30.8.2026)
     */
    wawel: {
      lat: 50.0539, lon: 19.9347, symboli: 'historia', nimio: 'Wawel',
    },
  },
  lissabon: {
    /*
     * Ajudan palatsi (kuninkaallisen kirjaston koti ennen
     * Brasiliaan-vientiä 1810–1811) (sijainti on arvio).
     * Lähde: en-Wikipedia "Palace of Ajuda" -koordinaatit (API
     *   prop=coordinates 30.8.2026); arvio, koska tarinalla on kaksi
     *   paikkaa — kirjaston loppupiste on Rio de Janeiron
     *   kansalliskirjasto Brasiliassa (maan ulkopuolella), joten piste
     *   on annettu Ajudalle, jossa kokoelma koottiin ja josta se
     *   laivattiin
     */
    kirjasto: {
      lat: 38.7076, lon: -9.1983, symboli: 'sana', nimio: 'Ajudan palatsi',
    },
    /*
     * Rossion aukio (Praça de D. Pedro IV), vuoden 1848 aaltokuvio.
     * Lähde: pt-Wikipedia "Praça D. Pedro IV" -koordinaatit (API
     *   prop=coordinates 30.8.2026); tekstin päätapahtuma on Rossion
     *   aaltoladonta 1848, ja pakin kuva on samalta aukiolta
     */
    calcada: {
      lat: 38.7139, lon: -9.1394, symboli: 'kulttuuri', nimio: 'Calçada',
    },
    /*
     * Largo da Severa / Rua do Capelão, Mouraria (Severan kuolinpaikka
     * ja laulukujat) (sijainti on arvio).
     * Lähde: Nominatim/OSM "Largo da Severa, Lisboa" (30.8.2026); teksti
     *   nimeää Rua do Capelãon, jonka varrella oleva aukio kantaa
     *   nykyään Severan nimeä — tarkkaa kuolintaloa ei tunneta, joten
     *   katutason arvio
     */
    severa: {
      lat: 38.7161, lon: -9.1344, symboli: 'kulttuuri', nimio: 'Largo da Severa',
    },
  },
  lontoo: {
    /*
     * Millennium Bridgen laskuvesiranta (Thames-foreshore).
     * Lähde: en-Wikipedia "Millennium Bridge, London" (sama koordinaatti
     *   kuin paketin oma kohtaamispiste; mudlark-kuva on juuri tältä
     *   kohdalta)
     */
    vuorovesi: {
      lat: 51.510173, lon: -0.098438, symboli: 'luonto', nimio: 'Thamesin vuorovesi',
    },
    /*
     * Richmond Park.
     * Lähde: en-Wikipedia "Richmond Park", prop=coordinates
     */
    hirvet: {
      lat: 51.44333, lon: -0.275, symboli: 'elain', nimio: 'Richmond Park',
    },
    /*
     * Cheapside (30-32 Cheapside, City of London) (sijainti on arvio).
     * Lähde: en-Wikipedia "Cheapside", prop=coordinates (katukoordinaatti;
     *   täsmällistä 30-32-osoitepistettä ei haettu erikseen, ero muutamia
     *   kymmeniä metrejä)
     */
    cheapside: {
      lat: 51.5141, lon: -0.0937, symboli: 'kauppa', nimio: 'Cheapsiden kätkö',
    },
  },
  madrid: {
    /*
     * Entisen Casa de Fierasin paikka, Retiron puisto (nyk. Paseo de Fernán Núñez 24 / kirjasto) (sijainti on arvio).
     * Lähde: es-Wikipedia "Parque del Buen Retiro" +
     *   madrid.es-kirjastotieto (osoite Paseo de Fernán Núñez 24); tarkkaa
     *   geokoodausta ei tehty, arvioitu kartalta
     */
    casadefieras: {
      lat: 40.4105, lon: -3.678, symboli: 'elain', nimio: 'Casa de Fieras',
    },
    /*
     * Plaza de Oriente, Monumento a Felipe IV.
     * Lähde: es-Wikipedia "Monumento a Felipe IV", prop=coordinates
     */
    felipe: {
      lat: 40.418538, lon: -3.71224, symboli: 'kulttuuri', nimio: 'Filipin patsas',
    },
    /*
     * Madridin keskusta / Congreso de los Diputados (symbolinen sijainti, teksti ei nimeä yhtä paikkaa) (sijainti on arvio).
     * Lähde: Ei sijaintia tekstissä; sijoitettu Espanjan tasavallan
     *   hallituksen istuntopaikan (Palacio de las Cortes) kohdalle
     *   symbolisesti
     */
    tasavalta: {
      lat: 40.4153, lon: -3.6971, symboli: 'historia', nimio: 'Tasavallan vuosi',
    },
  },
  marseille: {
    /*
     * Cosquerin luola, Cap Morgiou (sisäänkäynti 37 m pinnan alla).
     * Lähde: en-Wikipedia "Cosquer Cave" -koordinaatit (API-haku
     *   30.8.2026: 43,20278/5,44917); calanque-rannikolla kaupungin
     *   kaakkoispuolella, kaupungin seudulla
     */
    cosquer: {
      lat: 43.2028, lon: 5.4492, symboli: 'historia', nimio: 'Cosquerin luola',
    },
    /*
     * Roquefavourin akvedukti, Ventabren (Arc-joen laakso).
     * Lähde: en-Wikipedia "Roquefavour Aqueduct" -koordinaatit (API-haku
     *   30.8.2026: 43,51619/5,31253); kauempana keskustasta
     *   tarkoituksella — Marseillen kanavan pahin este oli täällä, kuten
     *   teksti kertoo (Korintin kanava -tyyppinen tapaus)
     */
    roquefavour: {
      lat: 43.5162, lon: 5.3125, symboli: 'tekniikka', nimio: 'Roquefavour',
    },
    /*
     * Notre-Dame de la Garden basilika (la Bonne Mère).
     * Lähde: fr-Wikipedia "Basilique Notre-Dame-de-la-Garde" -koordinaatit
     *   (API-haku 30.8.2026: 43,28395/5,37123)
     */
    exvotot: {
      lat: 43.2839, lon: 5.3712, symboli: 'kulttuuri', nimio: 'La Bonne Mère',
    },
  },
  moskova: {
    /*
     * Perlovin teetalo, Mjasnitskaja 19 (sijainti on arvio — VARAPISTE).
     * TARINAN OIKEA PAIKKA ON KYAHTA, Burjatiassa Mongolian rajalla
     * (en-Wikipedia "Kyakhta": n. 50,35 N / 106,45 E) — täky kertoo
     * nimenomaan Kyahtan ja Maimaitshengin rajakaupasta, mutta piste on
     * n. 4 600 km Moskovasta itään EIKÄ mahdu Euroopan lehdille
     * (Euroopan laudan itäreuna on 41°E). Fablen päätös (30.8.2026):
     * merkki käyttää varakoordinaattia, samovaariteeman paikkaa
     * Moskovan keskustassa — teekauppa, jonka julkisivu on rakennettu
     * kiinalaisen teekaupan muistoksi.
     * Lähde: kartoituksen HUOM INTEGROIJALLE -rivi (era2-osuus-d.json);
     *   Perlovin teetalon koordinaatti luettu kartalta (Mjasnitskaja
     *   19: n. 55,7626/37,636) — arvio
     */
    karavaanitee: {
      lat: 55.7626, lon: 37.636, symboli: 'kauppa', nimio: 'Perlovin teetalo',
    },
    /*
     * Moskovan eläintarha, Presnjan lammikoiden alue.
     * Lähde: en-Wikipedia "Moscow Zoo" -koordinaatit (API prop=coordinates
     *   30.8.2026); tarha on yhä samalla Presnjan paikalla kuin
     *   avajaisissa 1864, kuten täky itsekin sanoo
     */
    elaintarha: {
      lat: 55.7619, lon: 37.5772, symboli: 'elain', nimio: 'Eläintarha 1864',
    },
    /*
     * Polyteknillinen museo, Novaja ploštšad (näyttelyn kokoelmien
     * pysyvä koti) (sijainti on arvio).
     * Lähde: ru-Wikipedia "Политехнический музей" -koordinaatit (API
     *   prop=coordinates 30.8.2026); näyttely 1872 levittäytyi eri
     *   puolille keskustaa (kuvan pääportti Voskresenskin aukiolla) ja
     *   museo asui ensin vuokratiloissa Pretshistenkalla — piste on
     *   annettu museon omalle, 1877 vihitylle talolle, johon näyttelyn
     *   perintö päätyi, joten sijainti on arvio
     */
    nayttely1872: {
      lat: 55.7577, lon: 37.6295, symboli: 'tekniikka', nimio: 'Näyttely 1872',
    },
  },
  odessa: {
    /*
     * Potjomkinin portaat (Primorskin portaat).
     * Lähde: en-Wikipedia "Potemkin Stairs" -koordinaatit (API
     *   prop=coordinates 30.8.2026)
     */
    portaat: {
      lat: 46.4892, lon: 30.7433, symboli: 'kulttuuri', nimio: 'Potjomkin-portaat',
    },
    /*
     * Odessan ooppera- ja balettiteatteri.
     * Lähde: uk-Wikipedia "Одеський національний академічний театр опери
     *   та балету" -koordinaatit (API prop=coordinates 30.8.2026);
     *   vuoden 1887 talo seisoo samalla paikalla kuin 1873 palanut
     *   edeltäjänsä
     */
    ooppera: {
      lat: 46.4855, lon: 30.7413, symboli: 'kulttuuri', nimio: 'Odessan ooppera',
    },
    /*
     * Kuyalnykin lahti (Kujalnytskyi lyman), Odessan pohjoispuolella
     * (sijainti on arvio).
     * Lähde: uk-Wikipedia "Куяльницький лиман" -koordinaatit (API
     *   prop=coordinates 30.8.2026); lahti on 28 km pitkä ja piste on
     *   artikkelin antama keskivaiheen koordinaatti, joten yksittäinen
     *   piste on arvio — vuoden 1834 kylpylä on lahden eteläpäässä
     *   lähempänä kaupunkia (n. 8 km keskustasta, kuten täky sanoo)
     */
    kuyalnyk: {
      lat: 46.6644, lon: 30.7131, symboli: 'luonto', nimio: 'Kuyalnyk',
    },
  },
  oslo: {
    /*
     * St. Hanshaugenin puisto, Oslo (Asbjørnsenin muistomerkki)
     * (sijainti on arvio).
     * Lähde: Täky kertoo koko Etelä-Norjan keruumatkoista eikä yhdestä
     *   paikasta; sijoitettu Christiania-syntyisen Asbjørnsenin
     *   muistomerkille St. Hanshaugenille (puiston koordinaatit
     *   no-Wikipedia "St. Hanshaugen (park)", API-haku 30.8.2026:
     *   59,9267/10,7409)
     */
    sadut: {
      lat: 59.9267, lon: 10.7409, symboli: 'sana', nimio: 'St. Hanshaugen',
    },
    /*
     * Akershusin linnoitus ja Kristianian satamanranta (sijainti on arvio).
     * Lähde: Täky ei kuvaa yksittäistä paikkaa vaan lippua, jota isoisä
     *   katsoi Kristianian satamassa; sijoitettu sataman ylle Akershusin
     *   linnoitukselle (en-Wikipedia "Akershus Fortress", API-haku
     *   30.8.2026: 59,90667/10,73611)
     */
    unionilippu: {
      lat: 59.9067, lon: 10.7361, symboli: 'historia', nimio: 'Akershus',
    },
    /*
     * Sykkylvsfjorden, Sykkylven (Vikin veljesten ensimmäiset merikassit)
     * (sijainti on arvio).
     * Lähde: no-Wikipedia "Sykkylvsfjorden" -koordinaatit (API-haku
     *   30.8.2026: 62,3992/6,5505); teksti nimeää juuri tämän vuonon
     *   kasvatuksen syntypaikaksi, mutta kassien tarkkaa kohtaa vuonossa
     *   ei tiedetä, siksi arvio. Kaukana Oslosta mutta Norjassa —
     *   Korintin kanava -tyyppinen koko maan aihe
     */
    lohi: {
      lat: 62.3992, lon: 6.5505, symboli: 'tekniikka', nimio: 'Sykkylvsfjorden',
    },
  },
  pariisi: {
    /*
     * Tuileries-palatsin entinen paikka, Jardin des Tuileries / Place du Carrousel.
     * Lähde: en-Wikipedia "Tuileries Palace", prop=coordinates
     */
    tuileriat: {
      lat: 48.86222, lon: 2.3325, symboli: 'historia', nimio: 'Tuileriain rauniot',
    },
    /*
     * Pariisi (ei yhtä nimettyä paikkaa; koko piiritetty kaupunki ja Seinen katkaistu salakaapeli) (sijainti on arvio).
     * Lähde: Teksti ei nimeä yhtä paikkaa (piiritys koski koko kaupunkia);
     *   sijoitettu kaupungin keskipisteeseen
     */
    kyyhkyposti: {
      lat: 48.8566, lon: 2.3522, symboli: 'tekniikka', nimio: 'Kyyhkyposti',
    },
    /*
     * Boulevard des Capucines (Nadarin ateljeen alue; täsmällistä katuosoitetta ei ole paketin lähteessä) (sijainti on arvio).
     * Lähde: Paketin oma kommentti: Nadarin ateljeen katuosoite ei ole
     *   lähteessä, joten koordinaatti on arvio boulevardin keskivaiheilta
     *   (yleisesti tunnettu suunnilleen no. 35 -alue Place de l'Opéran ja
     *   Madeleinen välissä)
     */
    impressionistit: {
      lat: 48.8705, lon: 2.328, symboli: 'kulttuuri', nimio: 'Impressionistit',
    },
  },
  pietari: {
    /*
     * Fabergé-museo, Šuvalovin palatsi, Fontankan rantakatu 21
     * (ensimmäisen munan nykyinen koti) (sijainti on arvio).
     * Lähde: en-Wikipedia "Fabergé Museum in Saint Petersburg" antaa vain
     *   karkeat koordinaatit (59,93/30,34); piste tarkennettu Šuvalovin
     *   palatsin tunnetun osoitteen (Fontanka 21) mukaan kartalta —
     *   arvio. Täky kiertää montaa paikkaa (liike 1842, Suuri Merikatu
     *   1881, Kreml, Yhdysvallat); museoksi valittu siksi, että täyn
     *   kuvan Kanamuna on näytteillä juuri siellä
     */
    faberge: {
      lat: 59.9349, lon: 30.3435, symboli: 'kulttuuri', nimio: 'Fabergé-museo',
    },
    /*
     * Vaskiratsastaja ja ukkoskivijalusta, Senaatintori.
     * Lähde: en-Wikipedia "Bronze Horseman" -koordinaatit (API
     *   prop=coordinates 30.8.2026); kivi itse on siirtotarinan
     *   päätepisteessä patsaan jalustana. Kiven löytöpaikka Lahta on
     *   n. 59,9877/30,1514, jos joskus halutaan lähtöpiste
     */
    ukkoskivi: {
      lat: 59.9364, lon: 30.3022, symboli: 'tekniikka', nimio: 'Ukkoskivi',
    },
    /*
     * Pulkovan observatorio, Pulkovan kukkulat.
     * Lähde: en-Wikipedia "Pulkovo Observatory" -koordinaatit (API
     *   prop=coordinates 30.8.2026); täsmää täyn omaan mittaan
     *   (meridiaani 30°19,6' itäistä pituutta = 30,3267°)
     */
    pulkova: {
      lat: 59.7717, lon: 30.3261, symboli: 'tekniikka', nimio: 'Pulkova',
    },
  },
  praha: {
    /*
     * Tynin kirkko (Church of Our Lady before Týn), Vanhankaupungin tori.
     * Lähde: en-Wikipedia "Church of Our Lady before Týn", prop=coordinates
     */
    tycho: {
      lat: 50.0876, lon: 14.4227, symboli: 'historia', nimio: 'Tycho Brahe',
    },
    /*
     * Klementinum.
     * Lähde: en-Wikipedia "Clementinum", prop=coordinates
     */
    klementinum: {
      lat: 50.08667, lon: 14.41639, symboli: 'sana', nimio: 'Klementinum',
    },
    /*
     * Prahan eläintarha (Zoo Praha), Troja.
     * Lähde: en-Wikipedia "Prague Zoo", prop=coordinates
     */
    przewalski: {
      lat: 50.11694, lon: 14.40611, symboli: 'elain', nimio: 'Prahan hevoset',
    },
  },
  riika: {
    /*
     * Riian vanhakaupunki, Raatihuoneenaukion seutu (Kunzen apteekin
     * likimääräinen alue) (sijainti on arvio).
     * Lähde: Abraham Kunzen vuoden 1752 apteekin tarkkaa osoitetta ei
     *   lähteissä ole (en-Wikipedia "Riga Black Balsam" ei anna
     *   koordinaatteja); sijoitettu symbolisesti vanhaankaupunkiin,
     *   jossa apteekki toimi — sama ratkaisu kuin Szathmárin studio
     */
    balsami: {
      lat: 56.9472, lon: 24.1064, symboli: 'ruoka', nimio: 'Musta balsami',
    },
    /*
     * Viestura dārzs (ent. Keizardārzs), vuoden 1873 ensimmäisten
     * laulujuhlien pitopaikka.
     * Lähde: lv-Wikipedia "Viestura dārzs" -koordinaatit (API
     *   prop=coordinates 30.8.2026); ensimmäiset yleiset latvialaiset
     *   laulujuhlat kesäkuussa 1873 pidettiin Keizardārzsissa,
     *   nykyisessä Viestura dārzsissa — puiston keskipiste
     */
    laulujuhlat: {
      lat: 56.9639, lon: 24.101, symboli: 'kulttuuri', nimio: 'Laulujuhlat 1873',
    },
    /*
     * Alberta iela (Eisensteinin jugendtalot 1901–1906).
     * Lähde: Wikidata Q2687278 "Albert Street, Riga" P625-koordinaatit
     *   (30.8.2026; sama piste kuin Alberta iela 8:n
     *   kulttuurimuistomerkin Q55935709); tekstin päänosto on juuri
     *   Alberta-kadun Eisenstein-talot
     */
    jugend: {
      lat: 56.9592, lon: 24.1098, symboli: 'kulttuuri', nimio: 'Alberta iela',
    },
  },
  rooma: {
    /*
     * Vatikaanin apostolinen palatsi.
     * Lähde: en-Wikipedia "Apostolic Palace" -koordinaatit
     *   (41,90361/12,45639); teksti sanoo paavin jääneen juuri
     *   Vatikaanin palatsiin
     */
    vatikaani: {
      lat: 41.9036, lon: 12.4564, symboli: 'historia', nimio: 'Vatikaanin palatsi',
    },
    /*
     * Largo di Torre Argentina.
     * Lähde: en-Wikipedia "Largo di Torre Argentina" -koordinaatit
     *   (41,89528/12,47694)
     */
    kissat: {
      lat: 41.8953, lon: 12.4769, symboli: 'elain', nimio: 'Torre Argentina',
    },
    /*
     * Villa del Priorato di Malta, Piazza dei Cavalieri di Malta,
     * Aventinus.
     * Lähde: en-Wikipedia "Villa del Priorato di Malta" -koordinaatit
     *   (41,88361/12,4775); käytännössä sama piste kuin pakin oma
     *   kohtaamiskoordinaatti (41,8827/12,4783, fokusvirta-rooma.js
     *   r. 552)
     */
    avaimenreika: {
      lat: 41.8836, lon: 12.4775, symboli: 'historia', nimio: 'Avaimenreikä',
    },
  },
  sarajevo: {
    /*
     * Inat kuća, Miljackan itäranta Vijećnicaa vastapäätä.
     * Lähde: Wikidata Q1257066 ("Inat house", bs-Wikipedia "Inat kuća")
     *   P625-koordinaatit (43,85854/18,43428); sopii tekstiin — talo on
     *   joen vastarannalla kaupungintaloa vastapäätä
     */
    'inat-kuca': {
      lat: 43.8585, lon: 18.4343, symboli: 'historia', nimio: 'Inat kuća',
    },
    /*
     * Bosnia-Hertsegovinan kansallismuseo (Zemaljski muzej).
     * Lähde: en-Wikipedia "National Museum of Bosnia and Herzegovina"
     *   -koordinaatit (43,8545/18,4025); haggada on museon vitriinissä,
     *   kuten tekstin ensimmäinen lause sanoo
     */
    haggada: {
      lat: 43.8545, lon: 18.4025, symboli: 'sana', nimio: 'Haggada',
    },
    /*
     * Cincar-vuoren juuri, Livnon ja Kupresin välinen ylänkö
     * (sijainti on arvio).
     * Lähde: en-Wikipedia "Cincar" -koordinaatit (43,90222/17,06278);
     *   lauma laukkaa n. 145 km²:n ylängöllä eikä yhdessä pisteessä,
     *   joten piste on annettu tekstin nimeämälle vuorelle — arvio;
     *   kaukana Sarajevosta, kuten Korintin kanava / Zărneștin karhut
     *   -tyyppinen koko maan eläinaihe
     */
    villihevoset: {
      lat: 43.9022, lon: 17.0628, symboli: 'elain', nimio: 'Livnon lauma',
    },
  },
  sevilla: {
    /*
     * Muelle de las Mulas, Magalhãesin retkikunnan lähtölaituri
     * Guadalquivirin rannalla.
     * Lähde: es-Wikipedia "Muelle de las Mulas" -koordinaatit
     *   (37,38013/−5,99691) — laituri, josta viisi laivaa lähti
     *   10.8.1519 ja jonne Victoria palasi 1522; parisataa metriä pakin
     *   omasta kohtaamispisteestä Torre del Orosta
     */
    victoria: {
      lat: 37.3801, lon: -5.9969, symboli: 'merenkulku', nimio: 'Victorian laituri',
    },
    /*
     * Doñanan kansallispuisto, Guadalquivirin suisto (sijainti on arvio).
     * HUOM: piste osuu n. 0,1 km:n päähän Iberianilves-täkynostosta
     * (js/packs/fokusvirta-sevilla.js `iberianilves`) — sama puisto,
     * kaksi eri sisältöä; erottelupassi (js/fokuskohteet.js
     * eritteleKohdeRyhmat) pitää merkit erillään.
     * Lähde: en-Wikipedia "Doñana National Park" -koordinaatit (37/−6,5);
     *   543 km²:n suistoalue, ei yhtä pistettä, ja Wikipedian
     *   koordinaatti on karkea puiston keskikoordinaatti — arvio;
     *   kauempana kaupungista tarkoituksella, kuten Korintin kanava
     *   -esimerkki (joen suu, jonne teksti itse kulkee Sevillasta
     *   alavirtaan)
     */
    donana: {
      lat: 37, lon: -6.5, symboli: 'luonto', nimio: 'Doñana',
    },
    /*
     * Real de la Feria, Los Remedios (ferian alue vuodesta 1973)
     * (sijainti on arvio).
     * Lähde: en-Wikipedia "Seville Fair" -koordinaatit (37,37111/−5,9975,
     *   nykyinen Real de la Feria); teksti kertoo myös ensimmäisten
     *   messujen paikan Prado de San Sebastiánin (es-Wikipedia
     *   37,37969/−5,98689) — kahdesta mahdollisesta pisteestä on
     *   valittu nykyinen, kuten Berliinin Kulta-Liisassa — arvio
     */
    feria: {
      lat: 37.3711, lon: -5.9975, symboli: 'kulttuuri', nimio: 'Feria',
    },
  },
  sofia: {
    /*
     * Vasil Levskin muistomerkki (teloituspaikka).
     * Lähde: en-Wikipedia "Monument to Vasil Levski, Sofia" -koordinaatit
     *   (geosearch 42,69666/23,33526); teksti sanoo muistomerkin
     *   seisovan tuomion täytäntöönpanopaikalla
     */
    levski: {
      lat: 42.6967, lon: 23.3353, symboli: 'historia', nimio: 'Levski',
    },
    /*
     * Serdican amfiteatteri (Arena di Serdica -hotellin pohjakerros).
     * Lähde: en-Wikipedia "Amphitheatre of Serdica" -koordinaatit
     *   (42,69722/23,32833)
     */
    areena: {
      lat: 42.6972, lon: 23.3283, symboli: 'historia', nimio: 'Serdican areena',
    },
    /*
     * Sofia-patsas, Nezavisimost-aukio.
     * Lähde: en-Wikipedia "Statue of Sofia" -koordinaatit
     *   (42,69779/23,32147)
     */
    pollopatsas: {
      lat: 42.6978, lon: 23.3215, symboli: 'kulttuuri', nimio: 'Sofia-patsas',
    },
    /*
     * Sofian eläintarha (nykyinen paikka, Hladilnika).
     * Lähde: en-Wikipedia "Sofia Zoo" -koordinaatit (42,65806/23,33194);
     *   teksti itse sanoo tarhan jääneen nykyiselle paikalleen n. neljä
     *   km keskustasta etelään, joten nykyinen paikka on tekstin oma
     *   piste (alkuperäinen 1888 paikka oli palatsin puisto keskustassa)
     */
    elaintarha: {
      lat: 42.6581, lon: 23.3319, symboli: 'elain', nimio: 'Sofian eläintarha',
    },
  },
  tallinna: {
    /*
     * Raatihuoneentori (Raekoja plats), Tallinnan vanhakaupunki
     * (sijainti on arvio).
     * Lähde: Täky ei ole paikkasidonnainen (ruokalaji, ei paikka);
     *   sijoitettu symbolisesti vanhankaupungin ytimeen
     *   Raatihuoneentorille — koordinaatti en-Wikipedia "Tallinn Town
     *   Hall" (59,43709/24,74547), sama piste jonka pakki itse nimeää
     *   raatihuoneen todelliseksi paikaksi (fokusvirta-tallinna.js
     *   r. 468)
     */
    kama: {
      lat: 59.4371, lon: 24.7455, symboli: 'ruoka', nimio: 'Kama',
    },
    /*
     * Riigikogu (Viron parlamentti), Toompean linna (sijainti on arvio).
     * Lähde: Täky ei kuvaa yhtä paikkaa (koko maan sähköinen asiointi);
     *   ydin on vaaleissa äänestäminen, joten piste on annettu
     *   parlamenttitalolle — en-Wikipedia "Riigikogu" -koordinaatit
     *   (59,43583/24,73722) — arvio
     */
    'e-valtio': {
      lat: 59.4358, lon: 24.7372, symboli: 'tekniikka', nimio: 'E-valtio',
    },
    /*
     * Lyhyen jalan porttitorni (Lühikese jala väravatorn).
     * Lähde: et-Wikipedia "Lühikese jala väravatorn" -koordinaatit
     *   (59,43604/24,74102); juuri se torni, jonka ampuma-aukoista
     *   teksti kertoo
     */
    'kaksi-kaupunkia': {
      lat: 59.436, lon: 24.741, symboli: 'historia', nimio: 'Lyhyen jalan torni',
    },
  },
  tampere: {
    /*
     * Tammerkoski.
     * Lähde: en-Wikipedia "Tammerkoski" -koordinaatit (API-haku
     *   30.8.2026: 61,49806/23,76389); sama paikka kuin pakin oma
     *   kohtaamispiste Tammerkoski
     */
    koski: {
      lat: 61.4981, lon: 23.7639, symboli: 'luonto', nimio: 'Tammerkoski',
    },
    /*
     * Finlaysonin tehdasalue (Kuusvooninkinen ja Finlaysonin kirkko)
     * (sijainti on arvio).
     * Lähde: fi-Wikipedia "Finlaysonin tehdasalue" ei anna koordinaatteja
     *   (API-haku 30.8.2026); piste asetettu kartalta tehdasalueen
     *   keskelle Tammerkosken niskan länsipuolelle, jossa
     *   Kuusvooninkinen (1837) ja Finlaysonin kirkko (1879) sijaitsevat
     *   — arvio, koska täky kattaa koko korttelin eikä yhtä rakennusta
     */
    finlayson: {
      lat: 61.5008, lon: 23.7585, symboli: 'tekniikka', nimio: 'Finlayson',
    },
    /*
     * Tampereen tuomiokirkko (Simbergin kattofresko).
     * Lähde: fi-Wikipedia "Tampereen tuomiokirkko" -koordinaatit
     *   (API-haku 30.8.2026: 61,5025/23,76972)
     */
    kaarme: {
      lat: 61.5025, lon: 23.7697, symboli: 'kulttuuri', nimio: 'Tuomiokirkko',
    },
  },
  tukholma: {
    /*
     * Spillingsin löytöpelto, Othemin pitäjä, Gotlanti.
     * Lähde: en-Wikipedia "Spillings Hoard" -koordinaatit
     *   (57,72161/18,78035, itse löytöpaikka); kaukana Tukholmasta,
     *   kuten Korintin kanava -tyyppinen poikkeus — koko maan
     *   aarreaihe Gotlannissa
     */
    hopeakatko: {
      lat: 57.7216, lon: 18.7804, symboli: 'historia', nimio: 'Spillingsin kätkö',
    },
    /*
     * Norrström eduskuntatalon (Riksdagshuset) vieressä.
     * Lähde: sv-Wikipedia "Norrström" -koordinaatit (59,32861/18,07131);
     *   en-Wikipedia "Parliament House, Stockholm" (59,3275/18,0675)
     *   vahvistaa, että virta kulkee aivan eduskuntatalon vierestä
     */
    lohi: {
      lat: 59.3286, lon: 18.0713, symboli: 'elain', nimio: 'Norrström',
    },
    /*
     * Storkyrkan, Gamla stan (taulun ripustuspaikka).
     * Lähde: sv-Wikipedia "Storkyrkan" -koordinaatit (59,32583/18,07028);
     *   taulu riippuu kirkossa, ja myös vuoden 1535 halo nähtiin tämän
     *   kaupungin yllä
     */
    aurinkotaulu: {
      lat: 59.3258, lon: 18.0703, symboli: 'kulttuuri', nimio: 'Vädersolstavlan',
    },
  },
  varsova: {
    /*
     * Kuninkaanlinna, Canaletton sali (Bellotton vedutat).
     * Lähde: en-Wikipedia "Royal Castle, Warsaw" -koordinaatit (API
     *   prop=coordinates 30.8.2026); maalaukset riippuvat linnan
     *   Canaletton salissa, kuten täky kertoo
     */
    canaletto: {
      lat: 52.2478, lon: 21.0142, symboli: 'kulttuuri', nimio: 'Canaletton sali',
    },
    /*
     * Wienin aseman (Dworzec Wiedeński) paikka, Al. Jerozolimskie /
     * Marszałkowska.
     * Lähde: pl-Wikipedia "Dworzec Wiedeński w Warszawie" -koordinaatit
     *   (API prop=coordinates 30.8.2026); asema on purettu, mutta
     *   paikka on dokumentoitu — sama käytäntö kuin Colțean torni
     */
    raideleveys: {
      lat: 52.2297, lon: 21.0094, symboli: 'tekniikka', nimio: 'Wienin asema',
    },
    /*
     * Jaktorówin kylä (viimeisen turin muistokivi 1972) (sijainti on arvio).
     * Lähde: pl-Wikipedia "Jaktorów" -koordinaatit (API prop=coordinates
     *   30.8.2026); muistokiven täsmällistä pistettä kylässä ei haettu
     *   erikseen, joten kylän koordinaatti on arvio. Etäisyys täsmää
     *   täyn omaan "vajaan neljänkymmenen kilometrin päässä Varsovasta"
     */
    tur: {
      lat: 52.0906, lon: 20.5469, symboli: 'elain', nimio: 'Jaktorów',
    },
  },
  venetsia: {
    /*
     * Markuksen basilika (hevoset sisällä, kopiot parvekkeella).
     * Lähde: en-Wikipedia "Horses of Saint Mark" -koordinaatit (API-haku
     *   30.8.2026: 45,43449/12,33937)
     */
    hevoset: {
      lat: 45.4345, lon: 12.3394, symboli: 'historia', nimio: 'Markuksen hevoset',
    },
    /*
     * Dogen palatsi (äänten lasku 27.10.1866, muistolaatta laskusalin
     * käytävässä).
     * Lähde: en-Wikipedia "Doge's Palace" -koordinaatit (API-haku
     *   30.8.2026); teksti nimeää dogen palatsin laskuhuoneen,
     *   parvekkeen ja laatan
     */
    plebiskiitti: {
      lat: 45.4337, lon: 12.3405, symboli: 'historia', nimio: 'Dogen palatsi',
    },
    /*
     * Campo Sant'Agostin / Rio Terà Secondo, San Polo (Aldine-painon
     * perinteinen paikka) (sijainti on arvio).
     * Lähde: en-Wikipedia "Aldine Press" ei anna koordinaatteja;
     *   painotalon perinteinen, muistolaatalla merkitty paikka on Rio
     *   Terà Secondo Campo Sant'Agostinin kupeessa San Polossa
     *   (paikasta on tutkijoiden kesken kiistaa, siksi arvio) — piste
     *   luettu kartalta, muutaman sadan metrin päässä pakin
     *   kohtaamispisteestä Campo San Pololta
     */
    aldus: {
      lat: 45.439, lon: 12.3287, symboli: 'sana', nimio: 'Aldon paino',
    },
  },
  vilna: {
    /*
     * Vilnan yliopisto, vanhakaupunki (sijainti on arvio).
     * Lähde: Täky kertoo koko maan kirjasalakuljetuksesta Itä-Preussin
     *   rajalta, ei yhdestä paikasta; sijoitettu symbolisesti Vilnan
     *   yliopistolle, liettuan kielen ja kirjan keskukseen vanhassa-
     *   kaupungissa lähelle pakin kohtaamispistettä (kirjansitomo).
     *   Koordinaatit en-Wikipedia "Vilnius University" (API-haku
     *   30.8.2026: 54,6825/25,28722)
     */
    knygnesiai: {
      lat: 54.6825, lon: 25.2872, symboli: 'sana', nimio: 'Kirjankantajat',
    },
    /*
     * Pyhien Pietarin ja Paavalin kirkko, Antakalnis.
     * Lähde: en-Wikipedia "Church of St. Peter and St. Paul, Vilnius"
     *   -koordinaatit (API-haku 30.8.2026: 54,69417/25,30639)
     */
    barokki: {
      lat: 54.6942, lon: 25.3064, symboli: 'kulttuuri', nimio: 'Pietari ja Paavali',
    },
    /*
     * Palangan meripihkamuseo (Meripihkan aurinko).
     * Lähde: lt-Wikipedia "Palangos gintaro muziejus" -koordinaatit
     *   (API-haku 30.8.2026: 55,90694/21,05583); teksti nimeää museon ja
     *   sen kuuluisimman palan, ja pakin kuva on museosta. Kaukana
     *   Vilnasta mutta Liettuassa — Korintin kanava -tyyppinen koko
     *   maan aihe (meripihka on Itämeren rannikon tavaraa)
     */
    meripihka: {
      lat: 55.9069, lon: 21.0558, symboli: 'luonto', nimio: 'Palangan museo',
    },
  },
  wien: {
    /*
     * Vuoden 1873 maailmannäyttelyn alue, Rotunden paikka, Prater
     * (sijainti on arvio).
     * HUOM: piste on käytännössä sama (n. 0,06 km) kuin täkynoston
     * "maailmannayttely-1873" paikka (js/packs/fokusvirta-wien.js) —
     * sama näyttelyalue, kaksi eri sisältöä; erottelupassi
     * (js/fokuskohteet.js eritteleKohdeRyhmat) pitää merkit erillään.
     * Lähde: de-Wikipedia "Rotunde (Wien)" -koordinaatit (samat kuin
     *   pakin oma kommentti r. 618); konehalli (Maschinenhalle)
     *   purettiin näyttelyn jälkeen eikä sillä ole omaa koordinaattia,
     *   joten piste on annettu näyttelyalueen tunnukselle Rotundelle —
     *   arvio
     */
    sahko: {
      lat: 48.2122, lon: 16.4094, symboli: 'tekniikka', nimio: 'Konehalli',
    },
    /*
     * Hochstrahlbrunnen, Schwarzenbergplatz (sijainti on arvio).
     * Lähde: de-Wikipedia "Hochstrahlbrunnen" -koordinaatit
     *   (48,19839/16,376); itse vesijohto on 95 km pitkä Raxilta
     *   kaupunkiin eikä yksi piste, joten piste on annettu tekstin
     *   päättävälle suihkulähteelle, joka avattiin samana päivänä
     *   24.10.1873 — arvio
     */
    vesijohto: {
      lat: 48.1984, lon: 16.376, symboli: 'tekniikka', nimio: 'Vuoristovesijohto',
    },
    /*
     * Wienin keskushautausmaa (Wiener Zentralfriedhof), Simmering.
     * Lähde: de-Wikipedia "Wiener Zentralfriedhof" -koordinaatit
     *   (48,15083/16,43806); tekstin mainitsema vanha juutalainen osa
     *   on saman hautausmaan sisällä
     */
    kauriit: {
      lat: 48.1508, lon: 16.4381, symboli: 'elain', nimio: 'Keskushautausmaa',
    },
  },
};
