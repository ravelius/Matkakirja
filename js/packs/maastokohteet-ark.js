/*
 * POHJOISNAVAN JA ARKTISEN ALUEEN NOSTOT — paikka asteina, ei laudan
 * pisteenä. Sisarpaketti js/packs/maastokohteet-ata.js:lle, ja sama
 * koneisto lukee molemmat (js/pallolauta/nostot.js).
 *
 * OMISTAJA 11.9.2026, sanatarkasti: *"tehdään sinne myös nostoja,
 * varsinkin historialliset ja oikeastaan kaikki mahdolliset nostot,
 * mitä sinne vain voi keksiä."*
 *
 * ── MIKSI TÄLLÄ TIEDOSTOLLA EI OLE `laudat`-KENTTÄÄ ────────────────
 *
 * Pelin juliste on Millerin lieriöprojektiota, ja LAUTA LOPPUU
 * POHJOISESSA 76 ASTEESEEN: js/fokusmitat.js laudaltaAsteiksi antaa
 * rivillä y = 0 leveysasteen 76,0° N (alareunalla 58,0° S). Kaksi
 * kolmasosaa tästä listasta — napa itse, Huippuvuoret, Frans Josefin
 * maa, Ellesmere, Alert, jäädriftit ja ilmalaivat — on sen rivin
 * YLÄPUOLELLA, eli laudan ulkopuolella. Niille lautapiste ei ole
 * epätarkka vaan mahdoton, täsmälleen kuten Etelämantereella
 * (js/packs/maastokohteet-ata.js).
 *
 * LOPUT OVAT SAMAA ALUETTA, JOTEN NE OVAT SAMASSA LISTASSA. Napapiirin
 * (66,5° N) ja laudan yläreunan välissä on kohteita, joiden lautapiste
 * kyllä laskettaisiin — Ilulissat, Kuolan syväreikä, Norilsk,
 * Utqiaġvik, saamelaisten Sápmi. Ne eivät silti ole minkään
 * fokuslehden nostoja: kartan kohdemerkit ladotaan MAAN lehden päälle
 * (js/fokuskohteet.js maanKohdemerkit), ja lehti näkyy vasta kun se
 * täyttää puolet näkymästä. Jäämeren kehä ei ole yhden maan lehti vaan
 * yksi seutu, jota katsotaan pallon päältä. Siksi koko kehä piirtyy
 * yhtenä kerroksena samalla zoomilla, ja tässä listassa on sama
 * portti kaikille: paikka asteina.
 *
 * PALLOLLA NAPA-ALUE ON OLEMASSA. Karttapallo sai v1774:ssä molemmille
 * navoille oman atsimutaalisen karttakuvansa (js/pallo.js NAPAKALOTIT,
 * tools/tee-napakalotit.mjs); pohjoinen kalotti kattaa 80°–90° N, ja
 * sen alapuolella ovat tavalliset laatat. Nämä kohteet ovat siis
 * kaikki oikean kartan päällä.
 *
 * TASOKARTTA JÄTTÄÄ NÄMÄ POIS ITSESTÄÄN — js/fokuskohteet.js
 * kohdeKarttarivit suodattaa jokaisen rivin, jolla ei ole äärellistä
 * `laudat[lauta]`-pistettä. Ei merkkiä, ei rikkinäistä riviä, ei
 * poikkeusta: se on sama polku, jolla kartan ulkopuolelle jäävät
 * hetket ovat aina pudonneet.
 *
 * ── MIHIN TAULUUN NÄMÄ EIVÄT MENE (ja miksi) ───────────────────────
 *
 * EI KOHDE_MAAT-tauluun eikä MAASTOKOHTEET-hakemistoon. Molemmat
 * tarkoittavat MAATA, ja ladonta, kaupunkikatto, nimiöväistö ja
 * laattapoltto tehdään sen maan fokuslehden rajauksessa. Jäämerellä ei
 * ole fokuslehteä; Grönlanti, Kanada, Venäjä ja Norja ovat omia
 * lehtiään, eikä yksikään niistä kata sitä kehää, jonka nämä kohteet
 * muodostavat. Tauluun kirjaaminen lisäisi rivin, joka ei tee mitään,
 * ja sotkisi kattavuustyökalun maakohtaiset luvut
 * (tools/laske-karttanostot.mjs).
 *
 * EIKÄ FOKUS_POHJAT-tauluun: se on KUVIEN taulu, jossa jokainen rivi
 * lupaa ämpärissä olevan lehden ja sen lautarajauksen.
 *
 * Tämä lista on siis OMA JOUKKONSA, jonka ainoa lukija on pallon
 * nostokerros. Sisältö noudattaa täsmälleen samaa kaavaa kuin
 * maastokohteet-*.js (id, nimi, tyyppi, kysymykset, korostukset,
 * nappi, teksti, lahde), joten kortti, pöllö ja karttamerkki
 * käyttäytyvät kuten kaikkialla muualla.
 *
 * ── SISÄLTÖ ────────────────────────────────────────────────────────
 *
 * Kohderyhmä on 13 vuotta täyttäneet ja aikuiset. Faktat on tarkistettu
 * en-Wikipediasta kohde kerrallaan 11.9.2026, artikkeli on nimetty
 * `lahde`-kentässä ja rivin yläpuolisessa kommentissa, eikä yhtään
 * väitettä ole lisätty lähteen ulkopuolelta. Kuvakenttiä ei ole:
 * kuvat tilataan erikseen kuvaputkelta.
 *
 * PAINOPISTE ON HISTORIASSA, koska omistaja pyysi sitä: naparetket,
 * kadonneet retkikunnat, väylät, jäädriftit, kylmän sodan jäljet.
 * Isoisän matkan vuosi 1873 on useassa tekstissä läsnä — Frans Josefin
 * maa löydettiin juuri sinä vuonna, Vega lähti viisi vuotta myöhemmin,
 * ja Franklinin retkikunnan kohtalosta kiisteltiin yhä. Se sanotaan
 * ääneen aina kun se on luontevaa.
 *
 * TYYPIT OVAT NIITÄ, JOILLE ON SYMBOLI. js/fokuskohteet.js
 * KOHDE_TYYPPISYMBOLIT kääntää tyypin karttamerkiksi, ja tuntematon
 * tyyppi jää ilman symbolia — jolloin merkki ei piirry lainkaan
 * (js/pallolauta/nostot.js ohittaa rivin, jolla ei ole symbolia).
 * Siksi tässä käytetään vain tunnettuja tyyppejä: historia,
 * merenkulku, tekniikka, kulttuuri, kauppa, elain sekä luonnon
 * vuori / meri / saari / joki.
 */

/** Arktisen alueen nostot. Paikka asteina, ei lautapisteenä (ks. yllä). */
export const MAASTOKOHTEET_ARK = [
  /*
   * 1. POHJOISNAPA.
   * Lähde: en.wikipedia.org "North Pole"
   */
  {
    id: 'ark-pohjoisnapa',
    nimi: 'Pohjoisnapa',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi navalle ei voi rakentaa asemaa?',
      'Kuinka syvää navalla on?',
    ],
    korostukset: ['merijää|merijään', 'Kaffeklubben|Kaffeklubbenin'],
    nappi: 'Piste, jossa kaikki suunnat ovat etelään',
    // 90° N, pituusaste mikä tahansa; en-Wikipedia "North Pole"
    asteet: { lat: 90, lon: 0 },
    teksti: 'Maapallon pyörimisakselin pohjoinen pää on keskellä Jäämerta, ei maalla. Siinä '
      + 'kaikki pituuspiirit yhtyvät, kaikki suunnat osoittavat etelään eikä pisteelle ole '
      + 'annettu aikavyöhykettä lainkaan: navalla saa olla mikä kello tahansa. Lähin maa on '
      + 'yleensä sanottu olevan Kaffeklubbenin saari Grönlannin pohjoisrannikolla noin 700 '
      + 'kilometrin päässä, ja lähin pysyvästi asuttu paikka on Alert Ellesmeresaarella, 817 '
      + 'kilometriä. Etelänavasta poiketen tämä napa ei lepää mantereella vaan lähes '
      + 'ympärivuotisen, alati liikkuvan merijään päällä, ja siksi pysyvän aseman rakentaminen '
      + 'on käytännössä mahdotonta — jää vie kaiken mukanaan. Meren syvyydeksi on mitattu 4 261 '
      + 'metriä venäläisellä Mir-sukelluslaitteella vuonna 2007 ja 4 087 metriä Nautiluksen '
      + 'kaikuluotaimella vuonna 1958. Ensimmäinen varmennettu käynti navalla mitä tahansa tietä '
      + 'oli ilmalaiva Norgen ylilento 11.–14. toukokuuta 1926.',
    lahde: 'en-Wikipedia "North Pole", johdanto-osa, sekä artikkeli "Norge (airship)" '
      + '(tarkistettu 11.9.2026).',
  },
  /*
   * 2. FRAM JÄÄSSÄ — NANSENIN AJELEHTIMISRETKI.
   * Lähde: en.wikipedia.org "Nansen's Fram expedition"
   */
  {
    id: 'ark-fram',
    nimi: 'Fram jäässä',
    tyyppi: 'merenkulku',
    kysymykset: [
      'Miksi laiva jäädytettiin tahallaan jäähän?',
      'Miten Nansen keksi, että virtaus vie länteen?',
    ],
    korostukset: ['ajelehtiminen|ajelehti', 'napameri|napameren'],
    nappi: 'Laiva, joka jäädytettiin jäähän tahallaan',
    // 78°49′ N / 132°53′ E — Framin talvehtimispaikka 5.10.1893;
    // en-Wikipedia "Nansen's Fram expedition"
    asteet: { lat: 78.8167, lon: 132.8833 },
    teksti: 'Vuonna 1881 amerikkalainen Jeannette upposi Siperian pohjoispuolella, ja kolme '
      + 'vuotta myöhemmin sen tavaroita löytyi Grönlannin lounaisrannikolta. Meteorologi Henrik '
      + 'Mohn päätteli, että jään mukana kulkee virtaus poikki koko napameren, ja Fridtjof '
      + 'Nansen päätti käyttää sitä kyydikseen. Hän rakennutti pyöreäpohjaisen laivan, jonka jää '
      + 'nostaa puristuksen sijasta ylös, ja ajoi sen tahallaan jäähän Uusien Siperiansaarten '
      + 'pohjoispuolella: 5. lokakuuta 1893 Fram oli paikassa 78°49′ N, 132°53′ E ja miehistö '
      + 'kirjasi laivan "kunnolla kiinnitetyksi talveksi". Puolentoista vuoden kuluttua Nansen ja '
      + 'Hjalmar Johansen lähtivät koirineen kohti napaa, mutta kääntyivät 7. huhtikuuta 1895 '
      + 'leveyspiirillä 86°13,6′ N — lähempänä napaa kuin kukaan aiemmin — ja pakenivat Frans '
      + 'Josefin maalle. Fram itse ajelehti kolme vuotta miehistöineen ja nousi jäistä ehjänä '
      + '13. elokuuta 1896 Huippuvuorten pohjoispuolella, juuri sieltä mistä Nansen oli '
      + 'ennustanut. Retki todisti, ettei Euraasian ja navan välissä ole mannerta.',
    lahde: 'en-Wikipedia "Nansen\'s Fram expedition", johdanto-osa sekä osiot "Background", '
      + '"Voyage" ja "Drift" (tarkistettu 11.9.2026).',
  },
  /*
   * 3. ANDRÉEN VETYPALLO 1897.
   * Lähde: en.wikipedia.org "S. A. Andrée's Arctic Balloon Expedition of 1897"
   */
  {
    id: 'ark-andree',
    nimi: 'Andréen vetypallo',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi palloa ei voinut ohjata?',
      'Milloin retkikunnan kohtalo selvisi?',
    ],
    korostukset: ['köysi|köydet', 'Kvitøya|Kvitøyalle'],
    nappi: 'Kolme miestä, jotka lensivät kohti napaa',
    // 80°06′ N / 32°36′ E, Kvitøya — viimeinen leiri;
    // en-Wikipedia "S. A. Andrée's Arctic Balloon Expedition of 1897"
    asteet: { lat: 80.1, lon: 32.6 },
    teksti: 'Ruotsalainen patenttivirkailija Salomon August Andrée uskoi, että vetypallon voi '
      + 'ohjata maata laahaavilla köysillä, ja aikoi purjehtia Huippuvuorilta napaa sivuten '
      + 'Alaskaan tai Venäjälle. Örnen-pallo nousi Danskøyalta 11. heinäkuuta 1897 Andréen, Nils '
      + 'Strindbergin ja Knut Frænkelin kanssa. Nousussa köydet kiertyivät irti kiinnikkeistään: '
      + '530 kiloa köyttä katosi ja miehet heittivät 210 kiloa hiekkaa yli laidan, eli '
      + 'ensimmäisten minuuttien aikana hävisi 740 kiloa painoa ja koko ohjattavuus. Vapaata '
      + 'lentoa kesti 10 tuntia 29 minuuttia, sitten 41 tuntia töyssyttelyä jäätä vasten, ja '
      + '14. heinäkuuta pallo jäi lopullisesti jäälle. Miehet olivat ehjiä. He vetivät kelkkojaan '
      + 'kolme kuukautta kohti ruokavarastoja, ajautuivat jäälautan mukana ja nousivat lokakuun '
      + 'alussa autiolle Kvitøyalle, jossa kuolivat pian 8. lokakuuta jälkeen. Kohtalo oli 33 '
      + 'vuotta arvoitus, kunnes viimeinen leiri löytyi sattumalta 1930 — päiväkirjat ja '
      + 'Strindbergin noin 200 valokuvaa mukaan lukien.',
    lahde: 'en-Wikipedia "S. A. Andrée\'s Arctic Balloon Expedition of 1897", johdanto-osa sekä '
      + 'osiot "The flight", "The trek" ja "Discovery" (tarkistettu 11.9.2026).',
  },
  /*
   * 4. FRANKLININ RETKIKUNTA JA EREBUKSEN HYLKY.
   * Lähde: en.wikipedia.org "Franklin's lost expedition"
   */
  {
    id: 'ark-erebus-terror',
    nimi: 'Erebus ja Terror',
    tyyppi: 'merenkulku',
    kysymykset: [
      'Mitä 129 miehelle tapahtui?',
      'Milloin hylyt vihdoin löytyivät?',
    ],
    korostukset: ['lyijymyrkytys|lyijymyrkytystä', 'hylky|hylky'],
    nappi: 'Kaksi laivaa, jotka katosivat jäihin',
    // 68°17′44″ N / 98°49′23″ W — Erebuksen hylky Queen Maud Gulfissa;
    // en-Wikipedia "Franklin's lost expedition"
    asteet: { lat: 68.2956, lon: -98.8231 },
    teksti: 'Sir John Franklin lähti Englannista 1845 kahdella laivalla, HMS Erebuksella ja HMS '
      + 'Terrorilla, purjehtiakseen Luoteisväylän viimeiset kartoittamattomat osuudet. Miehiä oli '
      + '129. Laivat jäätyivät kiinni Victoria Straitiin King William Islandin luona, ja kun ne '
      + 'huhtikuussa 1848 hylättiin, kaksikymmentäneljä miestä — Franklin heidän joukossaan — oli '
      + 'jo kuollut. Loput lähtivät kävellen kohti Kanadan mannerta eivätkä palanneet. Etsintä '
      + 'alkoi 1848 Franklinin vaimon Janen painostuksesta ja jatkui vuosikymmeniä; isoisäsi '
      + 'matkan aikaan kohtalo oli yhä kiistanalainen. Syiksi on esitetty hypotermiaa, nälkää, '
      + 'keripukkia ja lyijymyrkytystä, ja luiden viiltojäljet tukevat sitä, minkä John Rae kuuli '
      + 'inuiiteilta jo 1854: viimeiset miehet turvautuivat kannibalismiin. Väitteet raivostuttivat '
      + 'Lontoota aikanaan. Erebuksen hylky löytyi vasta 2014 Queen Maud Gulfista ja Terror kaksi '
      + 'vuotta myöhemmin Terror Bayn pohjasta; molemmat ovat nyt suojeltuja muistomerkkejä.',
    lahde: 'en-Wikipedia "Franklin\'s lost expedition", johdanto-osa sekä osiot "Search", '
      + '"Lead poisoning" ja "Discovery of the wrecks" (tarkistettu 11.9.2026).',
  },
  /*
   * 5. BEECHEY ISLANDIN HAUDAT.
   * Lähde: en.wikipedia.org "Beechey Island"
   */
  {
    id: 'ark-beechey',
    nimi: 'Beechey Island',
    tyyppi: 'historia',
    kysymykset: [
      'Ketkä on haudattu saarelle?',
      'Miksi haudat avattiin 1980-luvulla?',
    ],
    korostukset: ['hauta|haudat', 'ikirouta|ikirouta'],
    nappi: 'Kolme hautaa ikiroudassa',
    // 74°43′ N / 91°50′ W; en-Wikipedia "Beechey Island"
    asteet: { lat: 74.7167, lon: -91.8333 },
    teksti: 'Pieni saari Barrow Straitin pohjoispuolella on arktisen tutkimusmatkailun '
      + 'tunnetuimpia paikkoja. William Edward Parry kävi siellä ensimmäisenä eurooppalaisena '
      + '1819, ja hänen luutnanttinsa Frederick William Beechey antoi saarelle isänsä nimen. '
      + 'Vuonna 1845 Franklin valitsi sen suojaisan sataman retkikuntansa ensimmäiseksi '
      + 'talvipaikaksi, ja sinne jäi kolme hautaa. Leiriä ei löydetty uudelleen ennen vuotta '
      + '1850, kun brittiläiset ja yhdysvaltalaiset etsintäalukset ankkuroituivat lähelle. '
      + 'Vuonna 1854 saarelle pystytettiin Northumberland House, hylkylaivan puusta rakennettu '
      + 'varasto, jotta mahdolliset eloonjääneet löytäisivät ruokaa. Roald Amundsen pysähtyi '
      + 'saarella 1903 kunnioittamaan Franklinia ennen omaa onnistunutta Luoteisväylän '
      + 'purjehdustaan. Elokuussa 1984 tutkijaryhmä avasi haudat: ikirouta oli säilyttänyt '
      + 'ruumiit, ja John Torringtonin kudoksista mitatut lyijypitoisuudet kertoivat miehen '
      + 'kärsineen vakavista oireista jo ennen kuolemaansa.',
    lahde: 'en-Wikipedia "Beechey Island", johdanto-osa sekä osiot "History" ja "Beechey Island '
      + 'graves" (tarkistettu 11.9.2026).',
  },
  /*
   * 6. LUOTEISVÄYLÄ.
   * Lähde: en.wikipedia.org "Northwest Passage"
   */
  {
    id: 'ark-luoteisvayla',
    nimi: 'Luoteisväylä',
    tyyppi: 'merenkulku',
    kysymykset: [
      'Kuka purjehti väylän ensimmäisenä läpi?',
      'Kenelle vesialue kuuluu?',
    ],
    korostukset: ['Gjøa|Gjøa', 'sisävesi|sisävesinään'],
    nappi: 'Oikotie Aasiaan, jota etsittiin 400 vuotta',
    // Parry Channelin länsiosa (Viscount Melville Sound), 74,1° N / 104° W;
    // en-Wikipedia "Northwest Passage"
    asteet: { lat: 74.1, lon: -104 },
    teksti: 'Atlantilta Tyynellemerelle johtavaa pohjoista merireittiä etsittiin Kolumbuksesta '
      + 'alkaen neljäsataa vuotta, ja etsintä maksoi enemmän henkiä kuin toi kauppaa. Irlantilainen '
      + 'Robert McClure löysi jäisen reitin 1850, mutta joutui vetämään kelkkoja viimeisen osuuden. '
      + 'John Rae kartoitti eteläisemmän kulun 1854, ja juuri sitä myöten Roald Amundsen purjehti '
      + 'ensimmäisenä koko väylän pelkällä laivalla vuosina 1903–1906. Hänen Gjøansa oli '
      + 'silakkavene, miehistöä kuusi ja pohja matala, jotta se pääsisi rannan matalikoilla — '
      + 'Franklinin suuret laivat olivat tuhoutuneet viisikymmentä vuotta aiemmin. Gjøa jäätyi '
      + 'King William Islandin etelärannalle lähes kahdeksi vuodeksi, ja miehistö opetteli '
      + 'inuiiteilta elämisen taidot samalla kun mittasi magneettisen navan paikkaa; satamasta '
      + 'kasvoi Gjoa Havenin kylä. Ensimmäinen rahtilaiva oli SS Manhattan 1969. Elokuussa 2007 '
      + 'väylä oli ensi kertaa mittaushistorian aikana auki ilman jäänmurtajaa. Kanada pitää vesiä '
      + 'sisävesinään, Yhdysvallat kansainvälisenä salmena.',
    lahde: 'en-Wikipedia "Northwest Passage", johdanto-osa sekä osiot "History", "Amundsen" ja '
      + '"Climate change" (tarkistettu 11.9.2026).',
  },
  /*
   * 7. KOILLISVÄYLÄ JA NORDENSKIÖLDIN VEGA.
   * Lähde: en.wikipedia.org "Vega Expedition"
   */
  {
    id: 'ark-vega',
    nimi: 'Vegan koillisväylä',
    tyyppi: 'merenkulku',
    kysymykset: [
      'Kuka johti ensimmäistä koillisväylän läpipurjehdusta?',
      'Kuinka kauan Vega oli jäässä?',
    ],
    korostukset: ['Koillisväylä|Koillisväylän', 'tšuktšit|tšuktšien'],
    nappi: 'Suomalaissyntyinen mies avasi Koillisväylän',
    // 77°43′ N / 104°17′ E, Tšeljuskinin niemi — Euraasian pohjoisin kärki;
    // en-Wikipedia "Vega Expedition"
    asteet: { lat: 77.7167, lon: 104.2833 },
    teksti: 'Helsingissä syntynyt Adolf Erik Nordenskiöld purjehti höyrylaiva Vegalla '
      + 'ensimmäisenä Koillisväylän läpi — Euroopasta Aasiaan Siperian pohjoispuolitse — ja '
      + 'kiersi samalla ensimmäisenä koko Euraasian. Matka alkoi Karlskronasta 22. kesäkuuta '
      + '1878, vain viisi vuotta isoisäsi oman matkan jälkeen, ja pysähtyi Tromssassa, jossa '
      + 'mukaan liittyi rahtilaiva Lena. Euraasian pohjoisimman kärjen, Tšeljuskinin niemen, '
      + 'Vega ohitti 19. elokuuta 1878. Sitten kävi huonosti: 28. syyskuuta laiva jäätyi kiinni '
      + 'puolitoista kilometriä rannasta Tšuktšien niemimaan luona, vain päivämatkan päässä '
      + 'Beringinsalmesta. Talvi vierähti tšuktšien naapurina Pitlekajn kylän kupeessa. '
      + 'Ensikohtaaminen oli jännittynyt — ruotsalaiset ampuivat kiväärinlaukauksia ilmaan — '
      + 'mutta talven mittaan juhlittiin yhdessä syntymäpäiviä, ja yksi miehistön jäsen laati '
      + 'ruotsi–tšuktši-sanakirjan. Vega vapautui vasta 18. elokuuta 1879 ja palasi Tukholmaan '
      + '24. huhtikuuta 1880 koko kaupungin juhliessa rannalla.',
    lahde: 'en-Wikipedia "Vega Expedition", johdanto-osa sekä osiot "The voyage", "First '
      + 'contact with the Chukchi people" ja "Return" (tarkistettu 11.9.2026).',
  },
  /*
   * 8. AMUNDSENIN MAUD.
   * Lähde: en.wikipedia.org "Maud (ship)"
   */
  {
    id: 'ark-maud',
    nimi: 'Maud',
    tyyppi: 'merenkulku',
    kysymykset: [
      'Millä Amundsen kastoi laivansa?',
      'Missä Maud makasi kahdeksankymmentä vuotta?',
    ],
    korostukset: ['jääpala|jääpalalla', 'nostettiin|nostettiin'],
    nappi: 'Laiva, joka kastettiin jäällä eikä samppanjalla',
    // 69°07′ N / 105°03′ W, Cambridge Bay — hylyn paikka;
    // en-Wikipedia "Maud (ship)"
    asteet: { lat: 69.1167, lon: -105.0583 },
    teksti: 'Roald Amundsen rakennutti Maudin toista arktista retkeään varten ja kastoi sen '
      + 'samppanjapullon sijasta jääpalalla, jonka hän murskasi keulaa vasten: "Jäätä varten '
      + 'sinut on rakennettu, ja jäässä sinä vietät suurimman osan elämääsi." Lupaus piti '
      + 'kirjaimellisesti. Laiva purjehti Koillisväylän läpi, mutta matka ei sujunut suunnitelman '
      + 'mukaan ja kesti kuusi vuotta, 1918–1924. Lopulta Maud päätyi Nomeen Alaskaan, ja '
      + 'elokuussa 1925 se myytiin Amundsenin velkojien lukuun Seattlessa. Ostaja oli Hudson\'s '
      + 'Bay Company, joka antoi sille nimen Baymaud ja käytti sitä huoltoaluksena Kanadan '
      + 'läntisen arktisen alueen kauppa-asemille. Talvella 1926 se jäätyi kiinni Cambridge '
      + 'Bayhin ja upposi siihen 1930. Hylky makasi rannan tuntumassa lähes kahdeksankymmentä '
      + 'vuotta, kunnes se nostettiin pintaan 2016 ja vietiin 2018 takaisin Norjaan '
      + 'säilytettäväksi. Amundsenin muut alukset Gjøa ja Fram olivat päässeet museoon paljon '
      + 'aiemmin.',
    lahde: 'en-Wikipedia "Maud (ship)", johdanto-osa sekä osiot "Career" ja "Salvage" '
      + '(tarkistettu 11.9.2026).',
  },
  /*
   * 9. ILMALAIVA ITALIAN HAAKSIRIKKO 1928.
   * Lähde: en.wikipedia.org "Airship Italia"
   */
  {
    id: 'ark-italia',
    nimi: 'Punainen teltta',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi teltta värjättiin punaiseksi?',
      'Kuka katosi pelastusretkellä?',
    ],
    korostukset: ['punainen teltta|punaisen teltan', 'Krasin|Krasin'],
    nappi: 'Ilmalaiva putosi, teltta värjättiin punaiseksi',
    // 81°14′ N / 28°14′ E — putoamispaikka; en-Wikipedia "Airship Italia"
    asteet: { lat: 81.2333, lon: 28.2333 },
    teksti: 'Umberto Nobilen ilmalaiva Italia lähti Ny-Ålesundista kohti napaa toukokuussa 1928. '
      + 'Paluumatkalla jäätä kertyi potkureihin ja repi reikiä kuoreen, korkeusperäsin juuttui, '
      + 'ja 25. toukokuuta alus iskeytyi jäähän paikassa 81°14′ N, 28°14′ E, noin 120 kilometriä '
      + 'Nordaustlandetista koilliseen. Yhdeksän miestä ja yksi kuollut jäivät jäälle; kuusi '
      + 'ajautui pois kuoren mukana eikä heitä ole koskaan löydetty. Radiosähköttäjä Giuseppe '
      + 'Biagi pelasti radionsa ja alkoi lähettää hätäkutsuja, ja miehet värjäsivät '
      + 'kaksi kertaa kaksi metriä leveän silkkitelttansa punaisilla raidoilla, jotta se '
      + 'näkyisi ilmaan. Ruokaa oli 300 grammaa päivässä miestä kohti. Lentäjä Umberto Maddalena '
      + 'löysi punaisen teltan 20. kesäkuuta, ruotsalainen Einar Lundborg haki Nobilen mutta '
      + 'rikkoi koneensa palatessaan, ja lopulta neuvostomurtaja Krasin nosti viimeiset '
      + 'eloonjääneet jäältä 12. heinäkuuta. Kuolleita oli kaikkiaan seitsemäntoista. Yksi '
      + 'heistä oli Roald Amundsen, joka katosi lentokoneineen matkalla etsintöihin.',
    lahde: 'en-Wikipedia "Airship Italia", johdanto-osa sekä osiot "Polar expedition", "The '
      + 'crash" ja "Rescue" (tarkistettu 11.9.2026).',
  },
  /*
   * 10. NY-ÅLESUND JA NORGEN MASTO.
   * Lähde: en.wikipedia.org "Ny-Ålesund"
   */
  {
    id: 'ark-ny-alesund',
    nimi: 'Ny-Ålesund',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mitä kaivoskylästä tuli kaivoksen jälkeen?',
      'Miksi hallitus kaatui kaivosonnettomuuteen?',
    ],
    korostukset: ['kiinnitysmasto|kiinnitysmasto', 'Kings Bay|Kings Bayn'],
    nappi: 'Pohjoisin siviilikylä ja ilmalaivojen masto',
    // 78°55′30″ N / 11°56′ E, Kongsfjorden; en-Wikipedia "Ny-Ålesund"
    asteet: { lat: 78.925, lon: 11.93 },
    teksti: 'Maailman pohjoisin toimiva siviiliasutus on Kongsfjordenin rannalla Huippuvuorilla. '
      + 'Peter Brandal perusti sen kaivosyhtiöksi 1917, ja hiiltä louhittiin vaihtelevalla '
      + 'menestyksellä vuosikymmeniä. Vuosina 1925–1928 kylästä lähti neljä yritystä napaa kohti '
      + 'ilmateitse: Amundsenin lentoveneet, Byrdin ja Bennettin kone sekä Amundsenin ja Nobilen '
      + 'ilmalaiva Norge, joka lähti 11. toukokuuta 1926 ja lensi navan yli Alaskaan. Kaksi '
      + 'vuotta myöhemmin Italia lähti samasta paikasta eikä palannut. Ilmalaivojen kiinnitysmasto '
      + 'seisoo kylän laidalla yhä. Kaivostoiminta loppui 5. marraskuuta 1962 sattuneeseen '
      + 'onnettomuuteen, jossa kuoli 21 kaivosmiestä; Kings Bayn tapaus kaatoi Norjan hallituksen. '
      + 'Sen jälkeen kylästä on tullut tutkimusasema, jolla on 19 laitosta yhdestätoista maasta, '
      + 'talvella 30–35 asukasta ja kesällä runsaat sata. Zeppelinfjelletin rinteellä 485 metrin '
      + 'korkeudessa on ilmakehän mittausasema, jonne noustaan köysiradalla.',
    lahde: 'en-Wikipedia "Ny-Ålesund", johdanto-osa sekä osiot "History", "Research" ja '
      + '"Transport" (tarkistettu 11.9.2026).',
  },
  /*
   * 11. PEARY, COOK JA CAPE COLUMBIA.
   * Lähde: en.wikipedia.org "Robert Peary"
   */
  {
    id: 'ark-cape-columbia',
    nimi: 'Cape Columbia',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka väitti olleensa navalla ensin?',
      'Mitä nykytutkimus sanoo Pearyn väitteestä?',
    ],
    korostukset: ['Camp Jesup|Camp Jesupin', 'kiista|kiistan'],
    nappi: 'Lähtöpiste kiistanalaiselle naparetkelle',
    // 83°06′41″ N / 69°57′30″ W — Kanadan pohjoisin kärki;
    // en-Wikipedia "Robert Peary"
    asteet: { lat: 83.1114, lon: -69.9536 },
    teksti: 'Ellesmeresaaren pohjoiskärki on Kanadan pohjoisin maapiste ja siksi luonteva '
      + 'lähtöpaikka koiravaljakkoretkelle jäälle. Sieltä Robert Peary lähti keväällä 1909 '
      + 'kahdeksannella arktisella retkellään: mukana oli seitsemän retkikunnan jäsentä, 19 '
      + 'inuiittia, 140 koiraa ja 28 kelkkaa, ja tukiosastot kääntyivät takaisin yksi kerrallaan. '
      + 'Viimeisen matkan teki Peary neljän inuiitin ja Matthew Hensonin kanssa. Peary ilmoitti '
      + 'pystyttäneensä 6. huhtikuuta 1909 Camp Jesupin leirin viiden kilometrin päähän navasta. '
      + 'Väitettä puitiin vuosikymmeniä, koska amerikkalainen Frederick Cook oli ilmoittanut '
      + 'käyneensä navalla jo edellisenä vuonna. Pearyn kertomus voitti aikanaan kiistan, mutta '
      + 'vuonna 1989 brittitutkija Wally Herbert päätyi siihen, ettei Peary luultavasti '
      + 'saavuttanut napaa — hän saattoi jäädä siitä sadan kilometrin päähän. Sen sijaan Henson, '
      + 'joka oli mukana jokaisella Pearyn retkellä, tokaisi kulkeneensa edellä: "Taidan olla '
      + 'ensimmäinen mies, joka istuu maailman huipulla."',
    lahde: 'en-Wikipedia "Robert Peary", johdanto-osa sekä osiot "1908–1909 expedition" ja '
      + '"Controversy" (tarkistettu 11.9.2026).',
  },
  /*
   * 12. PAPANININ JÄÄASEMA SP-1.
   * Lähde: en.wikipedia.org "North Pole-1"
   */
  {
    id: 'ark-papanin',
    nimi: 'Jääasema SP-1',
    tyyppi: 'historia',
    kysymykset: [
      'Miten neljä miestä päätyi ajelehtivalle jäälautalle?',
      'Kuinka pitkälle lautta kulki?',
    ],
    korostukset: ['jäälautta|lautta', 'ajelehtiminen|ajelehtiva'],
    nappi: 'Neljä miestä asui yhdeksän kuukautta jäälautalla',
    // 89°25′ N — laskeutumispaikka 21.5.1937; en-Wikipedia "North Pole-1"
    asteet: { lat: 89.4, lon: -78 },
    teksti: 'Maailman ensimmäinen miehitetty ajelehtiva jääasema perustettiin 21. toukokuuta '
      + '1937 noin kahdenkymmenen kilometrin päähän navasta, ja se avattiin virallisesti '
      + '6. kesäkuuta. Otto Schmidtin johtama Sever-1-retkikunta lensi miehet ja tarvikkeet '
      + 'paikalle; lentotoiminnasta vastasi Mark Ševeljov. Asemaa komensi Ivan Papanin, ja '
      + 'hänen kanssaan lautalla asuivat hydrobiologi Pjotr Širšov, geofyysikko Jevgeni Fjodorov '
      + 'ja radiomies Ernst Krenkel. Neljä miestä eli jään päällä yhdeksän kuukautta, ja sinä '
      + 'aikana lautta kulki virtausten mukana 2 850 kilometriä. Se oli myös se sama virtaus, '
      + 'jonka Nansen oli osoittanut Framillaan. Neuvostoliittolaiset jäänmurtajat Taimyr ja '
      + 'Murman hakivat miehet 19. helmikuuta 1938 Grönlannin itärannikon tuntumasta, ja Jermak '
      + 'toi heidät Leningradiin 15. maaliskuuta. Kaikki neljä saivat Neuvostoliiton sankarin '
      + 'arvonimen. Jääasemien sarja jatkui tästä vuosikymmeniä.',
    lahde: 'en-Wikipedia "North Pole-1" (tarkistettu 11.9.2026).',
  },
  /*
   * 13. NAUTILUS NAVAN ALITSE 1958.
   * Lähde: en.wikipedia.org "USS Nautilus (SSN-571)"
   */
  {
    id: 'ark-nautilus',
    nimi: 'Nautilus navan alla',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi sukellusvene meni navan ali?',
      'Miksi kompassi ei auta napa-alueella?',
    ],
    korostukset: ['hyrräkompassi|hyrräkompassi', 'Sunshine|Sunshine'],
    nappi: 'Ensimmäinen alus navalla kulki jään alla',
    // Reitti Tšuktšienmereltä navalle, 88° N / 170° W;
    // en-Wikipedia "USS Nautilus (SSN-571)"
    asteet: { lat: 88, lon: -170 },
    teksti: 'Maailman ensimmäinen ydinkäyttöinen sukellusvene USS Nautilus sai presidentti '
      + 'Eisenhowerilta tehtävän, jonka tarkoitus oli yhtä paljon näytös kuin tutkimus: '
      + 'Neuvostoliiton Sputnik oli juuri noussut kiertoradalle, ja Yhdysvallat tarvitsi oman '
      + 'tekniikkanäytöksensä. Operaatio Sunshine lähti Seattlesta 9. kesäkuuta 1958, mutta '
      + 'joutui kääntymään Tšuktšienmerellä 19. kesäkuuta, koska ajojää ulottui matalassa vedessä '
      + 'liian syvälle. Uusi yritys alkoi 23. heinäkuuta. Sukellus tapahtui Barrow Sea Valleyssä '
      + '1. elokuuta, ja 3. elokuuta 1958 Nautilus oli ensimmäisenä aluksena maantieteellisellä '
      + 'pohjoisnavalla — jään alla. Navigointi oli vaikeinta koko matkassa: sekä magneettinen '
      + 'että tavallinen hyrräkompassi menevät epätarkoiksi 85 asteen pohjoispuolella, joten '
      + 'alukseen oli asennettu erityinen hyrräkompassi ja inertianavigointilaite. Matka jään '
      + 'alla kesti 96 tuntia ja 1 590 meripeninkulmaa, ja alus nousi pintaan Grönlannin '
      + 'koillispuolella.',
    lahde: 'en-Wikipedia "USS Nautilus (SSN-571)", osiot "Operation Sunshine – under the North '
      + 'Pole" ja "Navigation" (tarkistettu 11.9.2026).',
  },
  /*
   * 14. ARKTIKA 1977.
   * Lähde: en.wikipedia.org "Arktika (1972 icebreaker)"
   */
  {
    id: 'ark-arktika',
    nimi: 'Arktika',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mikä alus pääsi ensimmäisenä pintaa pitkin navalle?',
      'Kuinka paksua jäätä murtaja rikkoo?',
    ],
    korostukset: ['jäänmurtaja|jäänmurtaja', 'ilmakupla|ilmakuplajärjestelmä'],
    nappi: 'Ensimmäinen pintalaiva pohjoisnavalla',
    // Reitti navalle 17.8.1977, 89° N / 60° E;
    // en-Wikipedia "Arktika (1972 icebreaker)"
    asteet: { lat: 89, lon: 60 },
    teksti: 'Neuvostoliittolainen ydinjäänmurtaja Arktika oli ensimmäinen pintaa pitkin kulkeva '
      + 'alus, joka ylsi pohjoisnavalle: se saavutti navan 17. elokuuta 1977 matkalla, joka oli '
      + 'omistettu lokakuun vallankumouksen 60-vuotispäivälle. Alus on kaksirunkoinen. Ulkokuori '
      + 'on 48 ja sisäkuori 25 millimetriä paksu, ja väliin jäävää tilaa käytetään painolastin '
      + 'vesisäiliöinä; valuteräksinen keula on paksuimmillaan puoli metriä ja kaareva, jotta se '
      + 'murtaisi jäätä painollaan eikä puskisi sitä edellään. Paksuin jää, jonka Arktika '
      + 'läpäisee, on noin 2,8 metriä. Lisäksi aluksessa on ilmakuplajärjestelmä, joka puhaltaa '
      + 'yhdeksän metrin syvyydestä 24 kuutiometriä höyryä sekunnissa rikkomaan jäätä rungon '
      + 'ympäriltä. Perässä on helikopterikansi ja halli jäätiedustelua varten. Vuonna 1982 alus '
      + 'nimettiin Leonid Brežneviksi, mutta miehistö kieltäytyi vastaamasta radioon millään '
      + 'muulla nimellä kuin Arktika, ja viikossa vanha nimi palautettiin. Palveluksessa se oli '
      + 'vuodesta 1975 vuoteen 2008.',
    lahde: 'en-Wikipedia "Arktika (1972 icebreaker)", johdanto-osa sekä osiot "Renaming '
      + 'controversy" ja "Service history" (tarkistettu 11.9.2026).',
  },
  /*
   * 15. JÄÄLEIRI BARNEO.
   * Lähde: en.wikipedia.org "Barneo"
   */
  {
    id: 'ark-barneo',
    nimi: 'Barneo',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi leiri rakennetaan joka kevät uudestaan?',
      'Paljonko käynti maksaa?',
    ],
    korostukset: ['Longyearbyen|Longyearbyeniin', 'huhtikuu|huhtikuussa'],
    nappi: 'Leiri, joka rakennetaan joka kevät uudelleen',
    // Leirin tyypillinen paikka navan tuntumassa, 89,2° N / 150° E;
    // en-Wikipedia "Barneo"
    asteet: { lat: 89.2, lon: 150 },
    teksti: 'Barneo on yksityinen tilapäinen leiri Jäämeren jäällä lähellä napaa. Kun se on '
      + 'pystyssä muutaman viikon huhtikuussa, se on maailman pohjoisin asuttu paikka. Leiri '
      + 'perustettiin ensi kerran 2002, ja koska jää ajelehtii koko ajan, se on rakennettu joka '
      + 'kevät kokonaan uudelleen: vuonna 2007 leiri oli kohdassa 89°31,5′ N, 30°27′ W eli noin '
      + '48 kilometrin päässä navasta, ja pohjoistuuli kuljetti sitä kaakkoon 0,8 kilometrin '
      + 'tuntivauhdilla. Käynnin hinta alkaa noin kahdestakymmenestätuhannesta dollarista. '
      + 'Leiri kuuluu Venäjän maantieteellisen seuran suojelukseen; sen perusti Aleksandr Orlov, '
      + 'ja nykyään sen omistaa ruotsalainen lääketeollisuuden miljardööri Frederik Paulsen. '
      + 'Vuosina 2002–2017 kaikki matkat alkoivat ja päättyivät Longyearbyeniin Huippuvuorilla. '
      + 'Barneo on ollut tyhjillään vuodesta 2018: ensin poliittinen kiista, sitten pandemia ja '
      + 'Venäjän hyökkäys Ukrainaan peruivat kauden toisensa jälkeen. Leiriä ei pidä sekoittaa '
      + 'tieteellisiin SP-jääasemiin.',
    lahde: 'en-Wikipedia "Barneo", johdanto-osa sekä osio "History" (tarkistettu 11.9.2026).',
  },
  /*
   * 16. LOMONOSOVIN HARJU JA MERENPOHJAN LIPPU.
   * Lähde: en.wikipedia.org "Lomonosov Ridge"
   */
  {
    id: 'ark-lomonosov',
    nimi: 'Lomonosovin harju',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi merenalaisesta harjusta kiistellään?',
      'Kuka vei lipun napamerenpohjaan?',
    ],
    korostukset: ['mannerjalusta|mannerjalustan', 'titaanilippu|titaanisen lipun'],
    nappi: 'Vuorijono merenpohjassa — ja valtioiden kiista',
    // Harjun keskiosa navan ja Uusien Siperiansaarten välillä, 86° N / 150° E;
    // en-Wikipedia "Lomonosov Ridge"
    asteet: { lat: 86, lon: 150 },
    teksti: 'Jäämeren pohjassa kulkee 1 800 kilometriä pitkä harju Uusilta Siperiansaarilta '
      + 'navan yli Ellesmeresaarelle asti. Se on 60–200 kilometriä leveä ja nousee 3 300–3 700 '
      + 'metriä 4 200 metrin syvyisestä merenpohjasta; matalimmillaan vettä on sen yllä alle '
      + 'neljäsataa metriä. Harju jakaa napameren kahteen altaaseen. Neuvostoliiton '
      + 'korkeiden leveysasteiden retkikunnat löysivät sen 1948, ja se nimettiin Mihail '
      + 'Lomonosovin mukaan. Tavallinen merenpohjan muoto siitä tuli kiistakapula, koska harju on '
      + 'mannerkuorta: jos se on jonkin valtion mannerjalustan jatke, sen mukana siirtyvät myös '
      + 'oikeudet pohjan varoihin. Venäjä jätti ensimmäisen esityksensä YK:lle 20. joulukuuta '
      + '2001, Tanska ja Kanada ovat esittäneet omansa. Elokuun 2. päivänä 2007 venäläinen '
      + 'Arktika-retkikunta laski Mir-sukellusveneillä 4 261 metrin syvyyteen navan alle ja '
      + 'pystytti pohjaan ruostumattoman titaanisen lipun. Vaatimuksia puidaan YK:n '
      + 'välityslautakunnassa yhä.',
    lahde: 'en-Wikipedia "Lomonosov Ridge", johdanto-osa sekä osiot "Territorial dispute" ja '
      + '"Arktika 2007 Expedition" (tarkistettu 11.9.2026).',
  },
  /*
   * 17. HUIPPUVUORET.
   * Lähde: en.wikipedia.org "Svalbard"
   */
  {
    id: 'ark-huippuvuoret',
    nimi: 'Huippuvuoret',
    tyyppi: 'saari',
    kysymykset: [
      'Kuka saa asua ja tehdä työtä Huippuvuorilla?',
      'Miksi saaristossa ei ole teitä kylien välillä?',
    ],
    korostukset: ['Huippuvuorten sopimus|Huippuvuorten sopimus', 'jääkarhu|jääkarhuja'],
    nappi: 'Saaristo, jonne pääsee ilman viisumia',
    // Spitsbergenin itäosa, 79,2° N / 18,5° E; en-Wikipedia "Svalbard"
    asteet: { lat: 79.2, lon: 18.5 },
    teksti: 'Huippuvuoret on norjalainen saaristo Jäämeren ja Atlantin rajalla, suunnilleen '
      + 'puolimatkassa Norjan pohjoisrannikolta navalle. Saaret ulottuvat 74. ja 81. '
      + 'leveysasteen välille; suurin niistä on Spitsbergen, 37 673 neliökilometriä. '
      + 'Valaanpyytäjät käyttivät saaria tukikohtina 1600- ja 1700-luvuilla, minkä jälkeen '
      + 'saaristo hylättiin; hiilenlouhinta alkoi 1900-luvun alussa ja synnytti kylät kuten '
      + 'Pyramidenin ja Barentsburgin. Vuoden 1920 Huippuvuorten sopimus tunnustaa Norjan '
      + 'suvereniteetin mutta tekee saarista vapaan talousalueen ja rajoittaa sotilaallista '
      + 'käyttöä, joten sopimusvaltioiden kansalaiset saavat asua ja työskennellä siellä '
      + 'vapaasti. Noin 60 prosenttia pinnasta on jäätikköä, ja kylien välillä ei kulje teitä: '
      + 'liikutaan moottorikelkalla, veneellä tai lentäen. Seitsemän kansallispuistoa ja 23 '
      + 'luonnonsuojelualuetta kattavat kaksi kolmasosaa saaristosta. Jääkarhuja, peuroja ja '
      + 'naaleja on enemmän kuin ihmisiä, ja vuodesta 2024 alkaen risteilyaluksesta saa nousta '
      + 'maihin enintään kaksisataa matkustajaa kerrallaan.',
    lahde: 'en-Wikipedia "Svalbard", johdanto-osa sekä osiot "History", "Geography" ja '
      + '"Politics" (tarkistettu 11.9.2026).',
  },
  /*
   * 18. SVALBARDIN SIEMENHOLVI.
   * Lähde: en.wikipedia.org "Svalbard Global Seed Vault"
   */
  {
    id: 'ark-siemenholvi',
    nimi: 'Siemenholvi',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mitä holvissa säilytetään ja kenen lukuun?',
      'Paljonko siementen tallettaminen maksaa?',
    ],
    korostukset: ['varmuuskopio|varmuuskopio', 'geenipankki|geenipankit'],
    nappi: 'Maailman viljelykasvien varmuuskopio',
    // 78°14′15″ N / 15°29′29″ E; en-Wikipedia "Svalbard Global Seed Vault"
    asteet: { lat: 78.2375, lon: 15.4914 },
    teksti: 'Longyearbyenin lähellä vuoren sisään louhittu holvi on maapallon viljelykasvien '
      + 'varmuuskopio. Se säilyttää pitkäaikaisesti kaksoiskappaleita siemenistä, joita '
      + 'maailman geenipankit jo pitävät tallessa: jos jonkin maan pankki tuhoutuu sodassa, '
      + 'onnettomuudessa tai rahoituksen loppuessa, lajike ei häviä. Holvia hallitaan Norjan '
      + 'valtion, Crop Trustin ja pohjoismaisen NordGenin kolmikantasopimuksella. Norja maksoi '
      + 'koko rakentamisen, noin 45 miljoonaa kruunua, ja Norja ja Crop Trust vastaavat '
      + 'käyttökuluista — tallettajalle säilytys on ilmaista, ja siemenet pysyvät tallettajan '
      + 'omaisuutena. Ajatus ei syntynyt tyhjästä: pohjoismainen geenipankki oli säilyttänyt '
      + 'siemeniään hylätyssä hiilikaivoksessa Longyearbyenin ulkopuolella jo vuodesta 1984. '
      + 'Kesäkuussa 2025 holvissa oli 1 355 591 siemenerää, ja niihin sisältyy yli 13 000 vuotta '
      + 'maanviljelyn historiaa. Ikirouta pitää holvin kylmänä silloinkin, kun sähköt ovat '
      + 'poikki.',
    lahde: 'en-Wikipedia "Svalbard Global Seed Vault", johdanto-osa sekä osio "History" '
      + '(tarkistettu 11.9.2026).',
  },
  /*
   * 19. PYRAMIDEN.
   * Lähde: en.wikipedia.org "Pyramiden"
   */
  {
    id: 'ark-pyramiden',
    nimi: 'Pyramiden',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi autiokylä on säilynyt niin ehjänä?',
      'Mikä siellä on pohjoisinta laatuaan?',
    ],
    korostukset: ['kaivoskaupunki|kaivoskaupunki', 'Lenin|Lenin-patsas'],
    nappi: 'Neuvostokaupunki, joka jäi seisomaan tyhjilleen',
    // 78°39′22″ N / 16°20′ E, Billefjorden; en-Wikipedia "Pyramiden"
    asteet: { lat: 78.656, lon: 16.34 },
    teksti: 'Billefjordenin pohjukassa, pyramidin muotoisen vuoren juurella, seisoo hylätty '
      + 'neuvostoliittolainen kaivoskaupunki. Ruotsi perusti sen 1910 ja myi Neuvostoliitolle '
      + '1927. Kukoistusaikanaan 1950-luvulla siellä asui 2 500 ihmistä, enimmäkseen '
      + 'ukrainalaisia kaivosmiehiä Donbasista ja työntekijöitä Volynista. Kylässä oli '
      + 'kulttuuritalo teattereineen, kirjasto, taide- ja musiikkistudiot, urheiluhalli, '
      + 'peruskoulu ja ruokala, joka oli auki vuorokauden ympäri. Siellä on myös maailman '
      + 'pohjoisin Lenin-patsas ja pohjoisin uima-allas. Kaivos suljettiin 1998, ja asukkaat '
      + 'lähtivät jättäen rakennukset, koneet ja huonekalut paikoilleen. Kylmä ilmasto on '
      + 'säilyttänyt ne niin hyvin, että kaupunki näyttää yhä siltä, kuin väki olisi lähtenyt '
      + 'eilen. Vuodesta 2007 paikkaa on kehitetty matkailukohteeksi: hotelli kunnostettiin ja '
      + 'avattiin uudelleen 2013, ja kesäisin kylässä on kuusi vahtimestaria. Omistaja on '
      + 'venäläinen valtionyhtiö Arktikugol.',
    lahde: 'en-Wikipedia "Pyramiden", johdanto-osa sekä osio "History" (tarkistettu 11.9.2026).',
  },
  /*
   * 20. NOVAJA ZEMLJA JA TSAARIPOMMI.
   * Lähde: en.wikipedia.org "Novaya Zemlya", "Tsar Bomba"
   */
  {
    id: 'ark-novaja-zemlja',
    nimi: 'Novaja Zemlja',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä räjähti saarella lokakuussa 1961?',
      'Kuinka kauas räjähdys tuntui?',
    ],
    korostukset: ['Tsaaripommi|Tsaaripommi', 'sienipilvi|sienipilvi'],
    nappi: 'Saaristo, jolla räjäytettiin historian suurin pommi',
    // 73°42′ N / 54°30′ E — Suhoi Nosin koealue Severnyjn saarella;
    // en-Wikipedia "Novaya Zemlya" ja "Tsar Bomba"
    asteet: { lat: 73.7, lon: 54.5 },
    teksti: 'Novaja Zemlja eli "uusi maa" on kaksiosainen saaristo Barentsinmeren ja Karanmeren '
      + 'välissä; saaret erottaa toisistaan kapea Matotškinin salmi. Novgorodilaiset metsästäjät '
      + 'tunsivat sen jo 1000-luvulla, ja hollantilainen Willem Barentsz saapui länsirannikolle '
      + '1594 etsiessään koillista merireittiä. Kylmän sodan aikana saaristosta tuli '
      + 'Neuvostoliiton toinen suuri ydinkoealue. Siellä räjäytettiin 30. lokakuuta 1961 '
      + 'Tsaaripommi, historian voimakkain koskaan rakennettu ase: 50 megatonnia, pudotettuna '
      + 'laskuvarjossa Tu-95V-pommikoneesta ja laukaistuna neljän kilometrin korkeudessa Suhoi '
      + 'Nosin niemen yllä. Tulipallo oli kahdeksan kilometriä leveä ja näkyi lähes tuhannen '
      + 'kilometrin päähän, ja sienipilvi nousi 67 kilometriin — kahdeksan kertaa Mount '
      + 'Everestin korkeuteen. Viidenkymmenenviiden kilometrin päässä ollut Severnyjn kylä '
      + 'tuhoutui kokonaan, ja ikkunoita rikkoutui yhdeksänsadan kilometrin päässä, Norjassa ja '
      + 'Suomessa asti.',
    lahde: 'en-Wikipedia "Novaya Zemlya", johdanto-osa ja osio "History", sekä "Tsar Bomba", '
      + 'osiot "The test" ja "Effects" (tarkistettu 11.9.2026).',
  },
  /*
   * 21. FRANS JOSEFIN MAA.
   * Lähde: en.wikipedia.org "Franz Josef Land"
   */
  {
    id: 'ark-frans-josefin-maa',
    nimi: 'Frans Josefin maa',
    tyyppi: 'saari',
    kysymykset: [
      'Minä vuonna saaristo löydettiin?',
      'Ketkä talvehtivat siellä kivimajassa?',
    ],
    korostukset: ['1873|1873', 'maja|majassa'],
    nappi: 'Saaristo, joka löytyi isoisäsi matkavuonna',
    // 80°42′ N / 55° E, saariston keskiosa; en-Wikipedia "Franz Josef Land"
    asteet: { lat: 80.7, lon: 55 },
    teksti: 'Venäjälle kuuluva saaristo koostuu 192 saaresta, jotka kattavat 16 134 '
      + 'neliökilometriä ja levittäytyvät 375 kilometrin matkalle idästä länteen. Pysyvää '
      + 'väestöä siellä ei ole koskaan ollut, vain sotilaita. Noin 85 prosenttia pinnasta on '
      + 'jäätikön alla, ja Rudolfin saaren Fligelynniemi on itäisen pallonpuoliskon pohjoisin '
      + 'maapiste. Norjalaiset merimiehet näkivät saaret jo 1865 mutta eivät kertoneet '
      + 'löydöstään; ensimmäisen ilmoituksen teki Julius von Payerin ja Karl Weyprechtin '
      + 'itävaltalais-unkarilainen naparetkikunta vuonna 1873 — täsmälleen sinä vuonna, jona '
      + 'isoisäsi kirjoitti päiväkirjaansa toisella puolella maailmaa. Saaristo pelasti '
      + 'kaksikymmentä vuotta myöhemmin Fridtjof Nansenin ja Hjalmar Johansenin: kun he olivat '
      + 'kääntyneet takaisin napamatkaltaan, he talvehtivat Jacksonin saarella kivistä ja '
      + 'mursunnahoista kyhätyssä majassa kahdeksan kuukautta ja söivät karhua, mursua ja '
      + 'hyljettä. 17. kesäkuuta 1896 Nansen kuuli koiran haukkuvan ja käveli vastaan englantilaisen '
      + 'Frederick Jacksonin, joka kysyi: "Tehän olette Nansen?"',
    lahde: 'en-Wikipedia "Franz Josef Land", johdanto-osa ja osio "History", sekä "Nansen\'s Fram '
      + 'expedition", osio "To Cape Flora" (tarkistettu 11.9.2026).',
  },
  /*
   * 22. ELLESMERESAARI.
   * Lähde: en.wikipedia.org "Ellesmere Island"
   */
  {
    id: 'ark-ellesmere',
    nimi: 'Ellesmeresaari',
    tyyppi: 'saari',
    kysymykset: [
      'Kuinka moni saarella asuu?',
      'Mikä saarella on erityistä maailman mitassa?',
    ],
    korostukset: ['Quttinirpaaq|Quttinirpaaqin', 'vuoristoinen|vuoristoisimman'],
    nappi: 'Kanadan pohjoisin ja vuoristoisin saari',
    // 79°48′ N / 78° W, saaren keskiosa; en-Wikipedia "Ellesmere Island"
    asteet: { lat: 79.8, lon: -78 },
    teksti: 'Kanadan pohjoisin ja kolmanneksi suurin saari on 197 790 neliökilometriä eli hitusen '
      + 'Isoa-Britanniaa pienempi, ja sen pituus on 830 kilometriä. Se kuuluu Kuningatar '
      + 'Elisabetin saariin. Pohjoiskärki Cape Columbia on Kanadan pohjoisin maapiste, ja koko '
      + 'maapallon pohjoisin kiistaton maapiste, Grönlannin Kaffeklubbenin saari, on aivan sen '
      + 'lähellä. Arktinen Kordilleeri peittää suuren osan saaresta ja tekee siitä '
      + 'saaristonsa vuoristoisimman; yli viidesosa on suojeltu Quttinirpaaqin '
      + 'kansallispuistona. Saari on myös maapallon magneettikentän merkillinen kulma: vuonna '
      + '2025 geomagneettinen pohjoisnapa sijaitsi saarella kohdassa 80°51′ N, 72°46′ W. '
      + 'Asukkaita oli vuoden 2021 laskennassa 144 kolmessa paikassa — Alertissa, Eurekassa ja '
      + 'Grise Fiordissa. Hallinnollisesti saari kuuluu Nunavutin Qikiqtaalukin alueeseen. Sen '
      + 'pohjoisrannoilta ovat lähteneet niin Pearyn kuin monen muunkin retket kohti napaa.',
    lahde: 'en-Wikipedia "Ellesmere Island", johdanto-osa sekä osiot "Geology" ja "Demographics" '
      + '(tarkistettu 11.9.2026).',
  },
  /*
   * 23. ALERT.
   * Lähde: en.wikipedia.org "Alert, Nunavut"
   */
  {
    id: 'ark-alert',
    nimi: 'Alert',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi Alertissa ei ole yhtään pysyvää asukasta?',
      'Kuinka pitkä kaamos siellä on?',
    ],
    korostukset: ['kaamos|kaamos', 'signaalitiedustelu|signaalitiedusteluasemaa'],
    nappi: 'Pohjoisin pysyvästi asuttu paikka maailmassa',
    // 82°30′05″ N / 62°20′53″ W; en-Wikipedia "Alert, Nunavut"
    asteet: { lat: 82.5014, lon: -62.3481 },
    teksti: 'Ellesmeresaaren pohjoisrannalla, 817 kilometrin päässä navasta, on maailman '
      + 'pohjoisin yhtäjaksoisesti asuttu paikka. Nimi tulee brittiläisestä sota-aluksesta HMS '
      + 'Alertista, joka talvehti kymmenen kilometrin päässä nykyisestä asemasta vuosina '
      + '1875–1876; kapteeni George Naresin miehistö oli ensimmäinen kirjattu eurooppalaisryhmä '
      + 'Ellesmeren pohjoispäässä. Jokainen alertilainen on tilapäinen: kukin palvelee kolmesta '
      + 'kuuteen kuukautta kerrallaan, ja vuoden 2021 väestönlaskennassa pysyviä asukkaita oli '
      + 'nolla. Väki pyörittää Kanadan puolustusvoimien signaalitiedusteluasemaa ja sen '
      + 'lentokenttää sekä samalla paikalla olevaa Dr. Neil Trivettin ilmakehän '
      + 'tarkkailuasemaa, jossa mitataan ilmakehän koostumusta maailmanlaajuista seurantaa '
      + 'varten. Kaamos kestää lokakuun 14. päivästä helmikuun 28. päivään ja yötön yö '
      + 'huhtikuun 7. päivästä syyskuun 4. päivään. Väliin jää kaksi lyhyttä hämärän kautta, '
      + 'jolloin aurinko vain viipyy horisontin rajalla.',
    lahde: 'en-Wikipedia "Alert, Nunavut", johdanto-osa sekä osiot "History" ja "Climate" '
      + '(tarkistettu 11.9.2026).',
  },
  /*
   * 24. GRÖNLANNIN JÄÄTIKKÖ.
   * Lähde: en.wikipedia.org "Greenland ice sheet"
   */
  {
    id: 'ark-gronlannin-jaatikko',
    nimi: 'Grönlannin jäätikkö',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka paksua jää on?',
      'Mitä tapahtuisi, jos koko jäätikkö sulaisi?',
    ],
    korostukset: ['mannerjäätikkö|mannerjäätikkö', 'merenpinta|merenpinta'],
    nappi: 'Toiseksi suurin jäämassa maapallolla',
    // 72°35′ N / 38°28′ W, jäätikön lakialue; en-Wikipedia "Greenland ice sheet"
    asteet: { lat: 72.58, lon: -38.46 },
    teksti: 'Grönlannin mannerjäätikkö on maapallon toiseksi suurin jäämassa. Se peittää '
      + '1 710 000 neliökilometriä eli noin 80 prosenttia saaresta, on keskimäärin 1 673 metriä '
      + 'paksu ja paksuimmillaan yli 3 488 metriä. Pituutta pohjoisesta etelään on lähes 2 900 '
      + 'kilometriä ja leveyttä enimmillään 1 100 kilometriä. Jäätiköitä Grönlannissa on ollut '
      + 'ainakin 18 miljoonaa vuotta, mutta yksi yhtenäinen jäätikkö peitti saaren vasta noin '
      + '2,6 miljoonaa vuotta sitten; vanhin tunnettu jää on miljoonan vuoden ikäistä. Nyt '
      + 'jäätikkö on lämpimimmillään tuhanteen vuoteen ja menettää jäätä nopeammin kuin kertaakaan '
      + 'ainakaan 12 000 vuoteen — kaksi tai viisi kertaa nopeammin kuin ennen vuotta 1850, eikä '
      + 'lumisade ole riittänyt korvaamaan sulamista vuoden 1996 jälkeen. Jos kaikki 2,9 '
      + 'miljoonaa kuutiokilometriä sulaisi, merenpinta nousisi noin 7,4 metriä. Jo 1,7–2,3 '
      + 'asteen lämpeneminen tekisi sulamisesta todennäköisesti väistämätöntä, joskin se veisi '
      + 'tuhansia vuosia.',
    lahde: 'en-Wikipedia "Greenland ice sheet", johdanto-osa sekä osiot "Geography" ja '
      + '"Future melting" (tarkistettu 11.9.2026).',
  },
  /*
   * 25. CAMP CENTURY JA PROJEKTI ICEWORM.
   * Lähde: en.wikipedia.org "Camp Century"
   */
  {
    id: 'ark-camp-century',
    nimi: 'Camp Century',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mitä jään sisään rakennettiin ja miksi?',
      'Mitä sinne jäi, kun tukikohta hylättiin?',
    ],
    korostukset: ['ydinreaktori|ydinreaktori', 'jääkairaus|jääkairaukset'],
    nappi: 'Kaupunki jään sisällä — ja sen salainen tarkoitus',
    // 77°10′ N / 61°08′ W; en-Wikipedia "Camp Century"
    asteet: { lat: 77.17, lon: -61.13 },
    teksti: 'Yhdysvaltain armeija rakensi Grönlannin jäätikön sisään tukikohdan, jota esiteltiin '
      + 'julkisuudessa halpana mallina arktisista tukikohdista ja tutkimusasemana. Se toimi '
      + 'vuosina 1959–1967, ja siihen kuului 21 tunnelia, yhteensä kolme kilometriä käytävää, '
      + 'joiden sähkön tuotti oma siirrettävä ydinreaktori. Vuonna 1996 julki tulleet asiakirjat '
      + 'kertoivat todellisen suunnitelman: Camp Century oli esiaste hankkeelle nimeltä Project '
      + 'Iceworm, jossa jään sisään olisi kaivettu valtava verkosto ohjustukikohtia, jotka '
      + 'kestäisivät vastustajan ensi-iskun. Ohjuksia ei koskaan tuotu paikalle, eikä lupaa '
      + 'niille edes kysytty Tanskan hallitukselta. Hanke haudattiin, kun huomattiin ettei '
      + 'jäätikkö pysy paikallaan niin kuin oli oletettu. Reaktori vietiin pois, mutta '
      + 'ongelmajätettä jäi jään alle, ja se huolettaa nyt ilmaston lämmetessä. Tukikohdan '
      + 'jääkairaukset olivat sen sijaan tieteen kannalta arvokkaita: niistä tehdyt '
      + 'isotooppianalyysit ovat perusta nykyisille ilmastomalleille, ja näytteiden maa-aines '
      + 'kertoo, että paikka oli jäätön vielä 400 000 vuotta sitten.',
    lahde: 'en-Wikipedia "Camp Century", johdanto-osa sekä osiot "Scientific research" ja '
      + '"History" (tarkistettu 11.9.2026).',
  },
  /*
   * 26. ILULISSATIN JÄÄVUONO.
   * Lähde: en.wikipedia.org "Ilulissat Icefjord"
   */
  {
    id: 'ark-ilulissat',
    nimi: 'Ilulissatin jäävuono',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka nopeasti jäätikkö liikkuu?',
      'Miksi jäävuoret juuttuvat vuonoon?',
    ],
    korostukset: ['jäävuori|jäävuoria', 'poikiminen|poikii'],
    nappi: 'Vuono, jossa jäävuoret syntyvät',
    // 69°10′ N / 51°06′ W; en-Wikipedia "Ilulissat Icefjord"
    asteet: { lat: 69.17, lon: -51.1 },
    teksti: 'Länsi-Grönlannissa, 250 kilometriä napapiirin pohjoispuolella, kulkee 40 kilometrin '
      + 'pituinen vuono mannerjäätiköltä Diskonlahteen. Sen perällä on Sermeq Kujalleq, '
      + 'pohjoisen pallonpuoliskon tuotteliain jäätikkö: se virtaa 20–35 metriä vuorokaudessa ja '
      + 'poikii vuosittain noin kaksikymmentä miljardia tonnia jäävuoria. Osa vuorista on niin '
      + 'suuria — jopa kilometrin korkuisia — etteivät ne kellu vuonon matalikoiden yli vaan '
      + 'juuttuvat pohjaan joskus vuosiksi, kunnes takaa tuleva jää murtaa ne. Avomerellä '
      + 'virtaukset vievät niitä ensin pohjoiseen ja sitten etelään Atlantille; suurimmat '
      + 'sulavat vasta 40.–45. leveyspiirin tienoilla, Britannian eteläpuolella. Vuonon jää on '
      + 'jopa 250 000 vuotta vanhaa, ja juuri täältä saatujen havaintojen varaan rakentui '
      + 'ymmärrys ihmisen aiheuttamasta ilmastonmuutoksesta — siksi vuono otettiin Unescon '
      + 'maailmanperintöluetteloon 2004. Sermermiutin asuinpaikka kertoo, että ihmiset ovat '
      + 'eläneet rannalla lähes 4 000 vuotta.',
    lahde: 'en-Wikipedia "Ilulissat Icefjord", johdanto-osa sekä osiot "Geography" ja '
      + '"Settlements and human activities" (tarkistettu 11.9.2026).',
  },
  /*
   * 27. JÄÄMEREN MERIJÄÄ.
   * Lähde: en.wikipedia.org "Arctic sea ice decline"
   */
  {
    id: 'ark-merijaa',
    nimi: 'Jäämeren merijää',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka nopeasti merijää vähenee?',
      'Miksi navan seutu lämpenee muita nopeammin?',
    ],
    korostukset: ['merijää|merijää', 'arktinen vahvistuma|arktiseen vahvistumaan'],
    nappi: 'Jää, joka sulaa nopeammin kuin se jäätyy',
    // Beaufortinmeren pohjoispuoli, 84° N / 120° W;
    // en-Wikipedia "Arctic sea ice decline"
    asteet: { lat: 84, lon: -120 },
    teksti: 'Jäämeren merijää on kutistunut vuosikymmen vuosikymmeneltä sekä pinta-alaltaan että '
      + 'tilavuudeltaan: kesällä sulaa enemmän kuin talvella jäätyy. Vähenemisvauhti on noin '
      + '4,7 prosenttia vuosikymmenessä, ja ensimmäisistä satelliittimittauksista eli vuodesta '
      + '1979 jäätä on kadonnut yli puolet. Sulamiskausi on pidentynyt viisi päivää '
      + 'vuosikymmenessä, enimmäkseen siksi, että syksyn jäätyminen alkaa myöhemmin. Syyskuussa '
      + '2020 jäätä oli 3,74 miljoonaa neliökilometriä, toiseksi vähiten mittaushistoriassa. '
      + 'Vuosina 1994–2017 maapallolta suli 28 biljoonaa tonnia jäätä, ja siitä 7,6 biljoonaa '
      + 'tonnia oli juuri arktista merijäätä. IPCC:n kuudennen arviointiraportin (2021) mukaan '
      + 'jäätä on todennäköisesti jonain syyskuuna alle miljoona neliökilometriä jo ennen vuotta '
      + '2050. Merijään häviäminen on yksi pääsyistä arktiseen vahvistumaan, siihen että napa-alue '
      + 'lämpenee muuta maapalloa nopeammin: valkoinen jää heijastaa auringonvalon, tumma meri '
      + 'nielee sen.',
    lahde: 'en-Wikipedia "Arctic sea ice decline", johdanto-osa (tarkistettu 11.9.2026).',
  },
  /*
   * 28. THULEN KULTTUURI JA INUIITIT.
   * Lähde: en.wikipedia.org "Thule people"
   */
  {
    id: 'ark-thule',
    nimi: 'Thulen kulttuuri',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Keitä nykyiset inuiitit polveutuvat?',
      'Kenet he kohtasivat Grönlannissa?',
    ],
    korostukset: ['Thule|Thulen', 'dorsetin kulttuuri|dorsetin kulttuurin'],
    nappi: 'Kaikkien inuiittien esi-isät',
    // 77°28′ N / 69°14′ W, Pituffik–Qaanaaq; en-Wikipedia "Thule people"
    asteet: { lat: 77.47, lon: -69.23 },
    teksti: 'Thulen eli proto-inuiittien kulttuuri on kaikkien nykyisten inuiittien ja jupikien '
      + 'edeltäjä. Se kehittyi Alaskan rannikolla noin vuoteen 1000 mennessä ja levisi sieltä '
      + 'itään poikki Pohjois-Kanadan, kunnes saavutti Grönlannin 1200-luvulla. Matkallaan '
      + 'thulelaiset syrjäyttivät aiemman dorsetin kulttuurin väen, joka oli asuttanut alueen '
      + 'ennen heitä; 1400-luvulle tultaessa vaihdos oli täydellinen. Nimi tulee Thulesta, '
      + 'nykyiseltä Pituffikilta Luoteis-Grönlannissa, jossa kulttuurin jäänteet ensimmäisen '
      + 'kerran kaivettiin esiin Comer\'s Middenin löytöpaikasta; kulttuurin kartoitti Therkel '
      + 'Mathiassen, joka osallistui arkeologina ja kartantekijänä Knud Rasmussenin viidenteen '
      + 'Thule-retkikuntaan 1921. Todisteet viittaavat siihen, että thulelaiset olivat '
      + 'tekemisissä viikinkien kanssa, jotka saapuivat Kanadan rannoille 1000-luvulla ja '
      + 'kutsuivat tapaamiaan ihmisiä skrälingeiksi. Pikku jääkausi 1650–1850 ja '
      + 'eurooppalaiskontaktien tiivistyminen hajottivat thulelaisten yhteisöt.',
    lahde: 'en-Wikipedia "Thule people", johdanto-osa sekä osio "History" (tarkistettu '
      + '11.9.2026).',
  },
  /*
   * 29. NENETSIT.
   * Lähde: en.wikipedia.org "Nenets people"
   */
  {
    id: 'ark-nenetsit',
    nimi: 'Nenetsit',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mistä samojedikoira on saanut nimensä?',
      'Mitä neuvostoaika teki paimentolaiselämälle?',
    ],
    korostukset: ['samojedikoira|samojedikoiran', 'poropaimentolaisuus|poropaimentolaisuus'],
    nappi: 'Tundran poropaimentolaiset ja heidän koiransa',
    // Jamalin niemimaa, 70° N / 70,5° E; en-Wikipedia "Nenets people"
    asteet: { lat: 70, lon: 70.5 },
    teksti: 'Nenetsit ovat samojedikansa Venäjän arktisella rannikolla Kuolan ja Taimyrin '
      + 'niemimaiden välissä. Vuoden 2021 laskennassa heitä oli 49 646, ja he asuvat enimmäkseen '
      + 'Jamalin Nenetsian, Nenetsian ja Taimyrin alueilla. Kieliä on kaksi, tundra- ja '
      + 'metsänenetsi. Vanha venäläinen nimitys samojedit jäi pois käytöstä 1900-luvun alussa; '
      + 'kansa kutsuu itseään sanalla, joka tarkoittaa "oikeita ihmisiä". Elanto tulee '
      + 'metsästyksestä ja poronhoidosta, ja koska poro kelpaa myös vetojuhdaksi ympäri vuoden, '
      + 'matkat ovat pitkiä. Laajamittainen poropaimentolaisuus syntyi 1700-luvulla. Nenetsit '
      + 'jalostivat samojedikoiran auttamaan porojen paimennuksessa ja vetämään rekiä — juuri '
      + 'näitä koiria eurooppalaiset naparetkeilijät myöhemmin käyttivät, koska ne kestivät '
      + 'arktiset olot. Asumus on kartiomainen teltta, mya. Neuvostoaika pakkoasutti perheitä '
      + 'kyliin ja vei lapset sisäoppilaitoksiin, ja moni menetti äidinkielensä. Poroja '
      + 'menetettiin kollektivisoinnissa, mutta 1950-luvulta alkaen karjat kasvoivat jälleen.',
    lahde: 'en-Wikipedia "Nenets people", johdanto-osa sekä osiot "Etymology", "Culture" ja '
      + '"Soviet era" (tarkistettu 11.9.2026).',
  },
  /*
   * 30. SAAMELAISET.
   * Lähde: en.wikipedia.org "Sámi people"
   */
  {
    id: 'ark-saamelaiset',
    nimi: 'Saamelaiset',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Missä Saamenmaa sijaitsee?',
      'Kuka saa harjoittaa poronhoitoa?',
    ],
    korostukset: ['Sápmi|Sápmi', 'poronhoito|poronhoito'],
    nappi: 'Euroopan unionin ainoa alkuperäiskansa',
    // 69°00′40″ N / 23°02′30″ E, Koutokeino; en-Wikipedia "Sámi people"
    asteet: { lat: 69.0111, lon: 23.0417 },
    teksti: 'Saamelaiset ovat Sápmin eli Saamenmaan alkuperäiskansa. Sápmi kattaa laajat '
      + 'pohjoisosat Norjasta, Ruotsista ja Suomesta sekä Kuolan niemimaan Venäjällä. Aiempi '
      + 'englanninkielinen nimitys lappalainen on vierasnimi, jota saamelaiset pitävät '
      + 'loukkaavana ja jonka sijaan he käyttävät omaa nimeään. Saamen kielet kuuluvat '
      + 'uralilaiseen kielikuntaan, samaan kuin suomi. Elinkeinoja on aina ollut monta: '
      + 'rannikkokalastus, turkismetsästys ja lampaiden hoito, mutta tunnetuin on '
      + 'puolikiertolainen poronhoito. Vuonna 2007 noin kymmenen prosenttia saamelaisista sai '
      + 'elantonsa poroista, ja pelkästään Norjassa noin 2 800 saamelaista hoiti poroja '
      + 'päätoimisesti; poro antaa lihaa, nahkaa ja kulkuvälineen. Perinteisistä, '
      + 'ympäristöllisistä, kulttuurisista ja poliittisista syistä poronhoito on joillakin '
      + 'Pohjoismaiden alueilla laissa varattu yksinomaan saamelaisille — oikeus, jollaista '
      + 'harvalla alkuperäiskansalla on.',
    lahde: 'en-Wikipedia "Sámi people", johdanto-osa sekä osio "Etymologies" (tarkistettu '
      + '11.9.2026).',
  },
  /*
   * 31. WRANGELIN SAARI JA VIIMEISET MAMMUTIT.
   * Lähde: en.wikipedia.org "Wrangel Island"
   */
  {
    id: 'ark-wrangel',
    nimi: 'Wrangelin saari',
    tyyppi: 'elain',
    kysymykset: [
      'Milloin viimeiset mammutit kuolivat?',
      'Miksi päivämäärärajaa on siirretty saaren takia?',
    ],
    korostukset: ['mammutti|mammutit', 'päivämääräraja|päivämäärärajaa'],
    nappi: 'Saari, jolla mammutit elivät pyramidien aikaan',
    // 71°14′ N / 179°24′ W; en-Wikipedia "Wrangel Island"
    asteet: { lat: 71.23, lon: -179.4 },
    teksti: 'Wrangelin saari on Tšuktšienmeren ja Itä-Siperian meren välissä, ja se on '
      + 'suunnilleen Kreetan kokoinen. Saari on 180. pituuspiirin päällä, joten kansainvälistä '
      + 'päivämäärärajaa on siirretty idemmäs, jotta saari ja Tšuktšien niemimaa pysyisivät '
      + 'samassa päivässä muun Venäjän kanssa. Saari on tunnetuin siitä, että viimeiset '
      + 'yleisesti hyväksytyt villimammutit elivät siellä: radiohiiliajoitukset osoittavat '
      + 'niiden säilyneen noin 4 000 vuotta sitten eli ajanjaksolla 2500–2000 eaa. Mantereelta '
      + 'mammutit hävisivät jo 10 000 vuotta sitten, mutta saarelle jäi eristyksiin 500–1 000 '
      + 'yksilön kanta, joka jatkoi elämäänsä kuusituhatta vuotta — samaan aikaan kun Sumerissa '
      + 'ja Egyptin neljännen dynastian aikana rakennettiin kaupunkeja ja pyramideja. Saari '
      + 'julistettiin tiukasti suojelluksi luonnonpuistoksi eli zapovednikiksi 1976. Siellä on '
      + 'maailman tihein jääkarhun pesäkanta, mursuja, hylkeitä, naaleja ja ahmoja, ja rannan '
      + 'tuntumassa uivat grönlanninvalaat ja harmaavalaat.',
    lahde: 'en-Wikipedia "Wrangel Island", johdanto-osa sekä osiot "Fauna" ja "Extinction of the '
      + 'woolly mammoth" (tarkistettu 11.9.2026).',
  },
  /*
   * 32. KUOLAN SYVÄREIKÄ.
   * Lähde: en.wikipedia.org "Kola Superdeep Borehole"
   */
  {
    id: 'ark-kuolan-syvareika',
    nimi: 'Kuolan syväreikä',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kuinka syvälle reikä ulottuu?',
      'Miksi poraaminen lopetettiin?',
    ],
    korostukset: ['Kuolan niemimaa|Kuolan niemimaalla', 'graniitti|graniitin'],
    nappi: 'Syvin reikä, jonka ihminen on maahan porannut',
    // 69°23′46″ N / 30°36′34″ E; en-Wikipedia "Kola Superdeep Borehole"
    asteet: { lat: 69.3961, lon: 30.6094 },
    teksti: 'Kuolan niemimaalla, aivan Norjan rajan tuntumassa, on syvin reikä, jonka ihminen on '
      + 'maahan porannut: SG-3 ulottuu 12 262 metriin. Poraus alkoi 24. toukokuuta 1970 '
      + 'tavallisella öljynporauslautalla, jota oli hieman muokattu yltämään seitsemään '
      + 'kilometriin; 1974 paikalle pystytettiin tätä työtä varten rakennettu Uralmaš-15000, '
      + 'jonka nimi kertoi uudesta tavoitteesta, viidestätoista kilometristä. Keskusreiästä '
      + 'haarautui kaikkiaan viisi 23 senttimetrin levyistä reikää. Kesäkuun 6. päivänä 1979 '
      + 'SG-3 ohitti siihenastisen maailmanennätyksen, ja lokakuussa 1982 ensimmäinen haara oli '
      + '11 662 metrissä. Syvimmältä paljastui yllätyksiä: vettä lammikoitui kolmen ja kuuden '
      + 'kilometrin välillä, koska se oli tihkunut graniitin läpi ja pysähtynyt läpäisemättömään '
      + 'kerrokseen. Neljännen reiän poraaminen lopetettiin 1992 syvyydessä 11 882 metriä, kun '
      + 'lämpötila osoittautui odotettua korkeammaksi: 180 astetta. Yhtiö lakkautettiin '
      + 'kannattamattomana 2008 ja paikka hylättiin.',
    lahde: 'en-Wikipedia "Kola Superdeep Borehole", johdanto-osa sekä osiot "Drilling", '
      + '"Findings" ja "Current status" (tarkistettu 11.9.2026).',
  },
  /*
   * 33. NORILSK.
   * Lähde: en.wikipedia.org "Norilsk"
   */
  {
    id: 'ark-norilsk',
    nimi: 'Norilsk',
    tyyppi: 'kauppa',
    kysymykset: [
      'Mitä Norilskissa louhitaan?',
      'Miksi kaupunki on suljettu?',
    ],
    korostukset: ['nikkeli|nikkeliä', 'ikirouta|ikiroudan'],
    nappi: 'Maailman pohjoisin suurkaupunki ikiroudan päällä',
    // 69°21′ N / 88°12′ E; en-Wikipedia "Norilsk"
    asteet: { lat: 69.35, lon: 88.2 },
    teksti: 'Norilsk on suljettu teollisuuskaupunki Taimyrin niemimaan eteläpuolella, 300 '
      + 'kilometriä napapiirin pohjoispuolella ja 2 400 kilometriä navasta. Asukkaita on 176 735 '
      + '(2024) ja tilapäiset mukaan lukien jopa 220 000, joten se on maailman pohjoisin yli '
      + '175 000 asukkaan kaupunki ja napapiirin sisäpuolen toiseksi suurin Murmanskin jälkeen. '
      + 'Norilsk ja Jakutsk ovat ainoat suurkaupungit yhtenäisen ikiroudan alueella. Kaupunki '
      + 'seisoo maailman suurimpien nikkeliesiintymien päällä, ja kaivostoiminta ja sulatot ovat '
      + 'sen koko elinkeino: nikkeliä, kuparia, kobolttia, platinaa, palladiumia ja kivihiiltä. '
      + 'Tehtaan rakentamisesta päätettiin 1935, ja työn teki pääosin vankityövoima. '
      + 'Hinta on ollut kova: Venäjän tilastoviranomainen luokittelee Norilskin maan '
      + 'saastuneimmaksi kaupungiksi, ja vuonna 2017 sieltä lähti ilmaan 1,798 miljoonaa tonnia '
      + 'päästöjä. Kesäkuussa 2020 voimalan säiliöstä valui 20 000 tonnia dieseliä maastoon. '
      + 'Kaamos kestää marraskuun lopusta tammikuun 13. päivään.',
    lahde: 'en-Wikipedia "Norilsk", johdanto-osa sekä osiot "Climate" ja "Environment" '
      + '(tarkistettu 11.9.2026).',
  },
  /*
   * 34. MAGNEETTINEN POHJOISNAPA.
   * Lähde: en.wikipedia.org "North Magnetic Pole"
   */
  {
    id: 'ark-magneettinen-napa',
    nimi: 'Magneettinen napa',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi kompassineula osoittaa siellä alaspäin?',
      'Mihin suuntaan napa on liikkumassa?',
    ],
    korostukset: ['kompassi|kompassineula', 'ulkoydin|ulkoytimen'],
    nappi: 'Napa, joka karkaa kohti Siperiaa',
    // 86,400° N / 156,786° E (arvio 2021); en-Wikipedia "North Magnetic Pole"
    asteet: { lat: 86.4, lon: 156.786 },
    teksti: 'Magneettinen pohjoisnapa on se piste, jossa maapallon magneettikenttä osoittaa '
      + 'suoraan alaspäin: vapaasti kolmessa ulottuvuudessa kääntyvä kompassineula seisoo siellä '
      + 'pystyssä. Se ei ole sama paikka kuin maantieteellinen napa, eikä se pysy paikallaan, '
      + 'koska maapallon ulkoytimen virtaukset muuttuvat jatkuvasti. Kanadan geologinen '
      + 'tutkimuslaitos määritti navan vuonna 2001 Ellesmeresaaren länsipuolelle kohtaan 81°18′ '
      + 'N, 110°48′ W. Vuonna 2005 se oli 83°06′ N, 117°48′ W ja vuonna 2009 jo 84°54′ N, '
      + '131°00′ W — ja tuolloin se liikkui kohti Venäjää 55–60 kilometrin vuosivauhtia. Vuonna '
      + '2013 maantieteellisen ja magneettisen navan väli oli noin 800 kilometriä, ja vuodelle '
      + '2021 napa arvioitiin jo Kanadan saariston ulkopuolelle, kohtaan 86,400° N, 156,786° E. '
      + 'Fysiikan kannalta nurinkurista on, että maapallon magneettinen pohjoisnapa on '
      + 'tavallisen magneetin mittapuulla etelänapa: siksi magneetin pohjoispää vetää sitä '
      + 'puoleensa.',
    lahde: 'en-Wikipedia "North Magnetic Pole", johdanto-osa ja osio "Polarity" (tarkistettu '
      + '11.9.2026).',
  },
  /*
   * 35. UTQIAĠVIK.
   * Lähde: en.wikipedia.org "Utqiagvik, Alaska"
   */
  {
    id: 'ark-utqiagvik',
    nimi: 'Utqiaġvik',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi kaupungin nimi vaihtui?',
      'Kuinka kauan aurinko on poissa?',
    ],
    korostukset: ['iñupiatit|iñupiatien', 'dekolonisaatio|dekolonisaatiosta'],
    nappi: 'Kaupunki, joka otti takaisin oman nimensä',
    // 71°17′26″ N / 156°47′19″ W; en-Wikipedia "Utqiagvik, Alaska"
    asteet: { lat: 71.2906, lon: -156.7886 },
    teksti: 'Yhdysvaltain pohjoisin kaupunki on ollut iñupiatien asuinpaikka yli 1 500 vuotta. '
      + 'Iñupiaqinkielinen nimi tarkoittaa paikkaa, josta kerätään villejä juuria, ja se '
      + 'kirjattiin ensimmäisen kerran muistiin 1853 muodossa "Ot-ki-a-wing". Ulkopuoliset '
      + 'käyttivät vuosikymmeniä nimeä Barrow, joka tuli läheiseltä Point Barrow\'lta ja oli '
      + 'heille helpompi lausua; postitoimisto avattiin sillä nimellä 1901. Lokakuun 6. päivänä '
      + '2016 asukkaat äänestivät, ja joulukuun alusta kaupunki on virallisesti Utqiaġvik — '
      + 'kaupunginvaltuutettu Qaiyaan Harcharekin mukaan kyse oli iñupiaqin kielen tukemisesta '
      + 'ja dekolonisaatiosta. Asukkaita oli 4 927 vuonna 2020. Aurinko laskee 18. marraskuuta '
      + 'eikä nouse ennen 23. tammikuuta, eli kaamosta riittää noin 66 päiväksi; kesällä '
      + 'aurinko pysyy horisontin yläpuolella 83 vuorokautta. Ruoka on kallista kuljettaa, '
      + 'joten moni elää edelleen pyynnillä: valasta, hyljettä, mursua, karibua ja kalaa.',
    lahde: 'en-Wikipedia "Utqiagvik, Alaska", johdanto-osa sekä osiot "Name", "Climate" ja '
      + '"Economy" (tarkistettu 11.9.2026).',
  },
];
