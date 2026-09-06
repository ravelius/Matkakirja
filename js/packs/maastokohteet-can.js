/*
 * MAASTOKOHTEET — CAN. Kanadan maasto ja kahdeksan kohdetta kartalle.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Kanadalla ei ollut yhtäkään karttamerkkiä pääkartalla
 * (docs/moduulit/karttanostot-kattavuus.md, Pohjois-Amerikka): nolla
 * kohdetta, nolla maastokohdetta, pelkkä eläintäky. Tämä tiedosto on
 * maailman erän M4 Kanadan osuus: kahdeksan KOHDETTA ja kolme
 * MAASTOKOHDETTA, sama malli kuin Euroopan erissä
 * (js/packs/maastokohteet-isl.js, -dnk.js).
 *
 * EI AINEISTOTIEDOSTOA, JOTEN MAASTO ON VALITTU KÄSIN. Työkalun
 * lähtöaineistoa tools/maastoaineisto/CAN.json ei ole, joten kolme
 * maastokohdetta on valittu itse ja koordinaatit on laskettu koneella
 * työkalun omalla kaavalla (`import { laudat } from
 * tools/johda-maastokohteet.mjs`, lon/lat en-Wikipedian artikkelista).
 *
 * KANADA ON KURATOIDULLA REITILLÄ (tools/fokuskartta/maat.mjs
 * FOKUSMAAT.CAN), ja sen lehdelle on poltettu kolme merennimeä:
 * JÄÄMERI, HUDSONINLAHTI ja ATLANTTI. Yhtäkään niistä ei ole tässä
 * listassa — merkin nimiö ei siis tule poltetun nimen päälle, ja
 * sääntö N3 (sama nimi kartalla vain kerran) pitää. Samasta syystä
 * täältä puuttuu Mackenzie: se on jo laudan oma jokinimi
 * (js/packs/maailmankartta-nimet.js), ja sen tilalla on Naha Dehé
 * eli South Nahanni, joka ei ole kartalla kertaakaan.
 *
 * VARTIO 7a JA MAA ILMAN FOKUSLEHTEÄ. tools/savukkeet/savuke-maastokohteet.mjs
 * vaatii, että jokainen kohde osuu maan fokuslehden rajaukseen
 * (`osuuLehteen`). Kanadalla rajaus ON olemassa (js/packs/fokus-grc.js
 * FOKUS_POHJAT.CAN, lauta maailmankartta), joten vartio pätee tähänkin
 * tiedostoon eikä sitä ole kierretty: jokainen alla oleva piste on
 * tarkistettu rajausta vasten yksitellen ennen kirjoittamista. (Jos
 * maalla ei olisi rajausta, `osuuLehteen` palauttaisi null ja vartio
 * ohittaisi maan — vartiota EI ole muutettu kummassakaan tapauksessa.)
 *
 * EI YKSIKÄÄN OLE PELIKAUPUNGIN KOHDALLA. Etäisyys on mitattu jokaiseen
 * js/packs/maailmankartta.js CITIES-kaupunkiin (Kanadassa yksitoista:
 * Whitehorse, Yellowknife, Vancouver, Winnipeg, Churchill, Iqaluit,
 * Labrador, St. John's, Halifax, Montreal, Toronto). Lähin uusi merkki
 * on Vanha Québec 77,5 lautayksikön päässä Montrealista, eli reilusti
 * yli KAUPUNGIN_KOHDALLA_SADE-rajan (7, js/fokuskohteet.js). Jokaisen
 * kohteen lähin kaupunki on kirjattu sen koordinaattirivin viereen.
 *
 * VAIN MAAILMANKARTAN RIVI. Erillislaudasta on luovuttu (Raamattu
 * 30.8.2026), joten `laudat`-kentässä on vain maailmankartta.
 *
 * KUVATON ERÄ. Kortti kantaa tekstin ja lähteen; tarkistamaton
 * Commons-tiedosto olisi huonompi kuin kuvaton kortti (Perustuslaki,
 * faktakuri). Faktat on tarkistettu en-Wikipediasta kohde kerrallaan
 * 6.9.2026, ja jokaisen kohteen `lahde`-rivi kertoo artikkelin osan.
 */
export const MAASTOKOHTEET_CAN = [
  /* ================================================================
   * MAASTO — kolme kohdetta: huippu, joki ja saari.
   * ============================================================== */
  {
    id: 'mount-logan',
    nimi: 'Mount Logan',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on Pohjois-Amerikan korkein vuori?',
      'Miksi vuoren korkeutta ei tiedetty tarkasti ennen vuotta 1992?',
    ],
    korostukset: ['GPS|GPS'],
    nappi: 'Kanadan korkein — ja yhä kasvava',
    // -140.4058 E / 60.5672 N — en-Wikipedia "Mount Logan"
    // Lähin pelikaupunki: Whitehorse 177,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 1153.1, y: 897.3 },
    },
    teksti: 'Mount Logan Kluanen kansallispuistossa Yukonissa on Kanadan korkein vuori ja '
      + 'Pohjois-Amerikan toiseksi korkein Denalin jälkeen. Vuori on nimetty geologi William '
      + 'Edmond Loganin mukaan, ja sen massiivissa on yksitoista yli 5 000 metrin huippua — '
      + 'uskotaan, että millään muulla ei-tulivuorella maailmassa ei ole yhtä laajaa jalustaa. '
      + 'Vuori kasvaa yhä noin 0,35 millimetriä vuodessa, ja ennen vuotta 1992 sen korkeudeksi '
      + 'arvailtiin 5 959–6 050 metriä; toukokuussa 1992 retkikunta mittasi huipun GPS-laitteella '
      + 'ja sai lukemaksi 5 959 metriä. Ylätasangolla ilma on talvella noin −45-asteista, ja '
      + 'lumi sulaa niin vähän, että jääkerros on paikoin lähes 300 metriä paksu.',
    lahde: 'en-Wikipedia "Mount Logan", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'naha-dehe',
    nimi: 'Naha Dehé',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä on antesedentti joki?',
      'Miksi laaksoa kutsuttiin päättömien miesten laaksoksi?',
    ],
    korostukset: ['kanjoni|kanjonia'],
    nappi: 'Joki, joka oli täällä ennen vuoria',
    // -125.7658 E / 61.6042 N (Virginia Falls) — en-Wikipedia "South Nahanni River"
    // Lähin pelikaupunki: Whitehorse 314,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 1641.1, y: 844.8 },
    },
    teksti: 'South Nahanni eli Naha Dehé virtaa Luoteisterritorioissa noin 500 kilometriä '
      + 'Yellowknifesta länteen ja on Nahannin kansallispuiston sydän. Joki on harvinainen '
      + 'esimerkki antesedentistä joesta: se mutkitteli tasangolla jo ennen kuin vuoret '
      + 'kohosivat, ja koska kohoaminen oli hidasta ja joki voimakas, se sahasi mutkansa '
      + 'suoraan nousevaan kallioon. Niin syntyi neljä kanjonia, joiden seinät nousevat '
      + 'paikoin tuhanteen metriin. Puistoa on kutsuttu myös Päättömien miesten laaksoksi '
      + 'joukosta selvittämättömiä kuolemantapauksia, ja legendat elivät, kunnes Raymond M. '
      + 'Pattersonin kirja Dangerous River kuivasi ne 1950-luvulla.',
    lahde: 'en-Wikipedia "South Nahanni River", johdanto-osa, ja "Nahanni National Park '
      + 'Reserve", johdanto-osa ja osio "Geography" (tarkistettu 6.9.2026).',
  },
  {
    id: 'baffininsaari',
    nimi: 'Baffininsaari',
    tyyppi: 'saari',
    kysymykset: [
      'Mitä Qikiqtaaluk tarkoittaa?',
      'Miksi saari sai nimensä William Baffinilta?',
    ],
    korostukset: ['Helluland|Helluland'],
    nappi: 'Kivimaa, jonka nimi vaihtui kolmesti',
    // -70 E / 68 N — en-Wikipedia "Baffin Island" (68°N 70°W)
    // Lähin pelikaupunki: Iqaluit 351,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3500, y: 499.2 },
    },
    teksti: 'Baffininsaari on Kanadan suurin ja maailman viidenneksi suurin saari, ja sillä '
      + 'asuu noin 13 000 ihmistä eli 0,026 asukasta neliökilometriä kohti. Inuktitutiksi se '
      + 'on Qikiqtaaluk, "hyvin suuri saari", ja viikinkien uskotaan kutsuneen sitä nimellä '
      + 'Helluland, kivimaa. Martin Frobisher nousi maihin 1576 ja nimesi saaren Kuningatar '
      + 'Elisabetin niemimaaksi; nykyinen nimi tulee William Baffinilta, joka kartoitti '
      + 'Baffininlahden 1616, ja sen antoi Edward Parry vasta 1821. Saarta on asuttu '
      + 'vähintään 3 000 vuotta, ja sen eteläkärjessä Frobisherinlahden rannalla on Nunavutin '
      + 'pääkaupunki Iqaluit — joka oli vuoteen 1987 asti nimeltään Frobisher Bay, kunnes '
      + 'asukkaat äänestivät inuktitutinkielisen nimen takaisin.',
    lahde: 'en-Wikipedia "Baffin Island", johdanto-osa sekä osiot "Name" ja "Geography" '
      + '(tarkistettu 6.9.2026).',
  },
  /* ================================================================
   * K2-ERÄ M4, 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston
   * alussa.
   * ============================================================== */
  {
    id: 'lanse-aux-meadows',
    nimi: "L'Anse aux Meadows",
    tyyppi: 'historia',
    kysymykset: [
      'Mistä vuodesta 1021 tiedetään niin tarkasti?',
      'Mitä sagat kertovat Leif Erikssonin matkasta?',
    ],
    korostukset: ['vuosilustoajoitus|vuosilustoajoitus'],
    nappi: 'Viikinkien leiri Amerikassa',
    // -55.5306 E / 51.5964 N — en-Wikipedia "L'Anse aux Meadows"
    // Lähin pelikaupunki: St. John's 147,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3982.3, y: 1320.1 },
    },
    teksti: "L'Anse aux Meadows on Newfoundlandin pohjoiskärjessä sijaitseva norjalainen "
      + 'asuinpaikka, joka kaivettiin esiin 1960-luvulla. Radiohiiliajoitus antaa vuodet '
      + '990–1050 ja vuosilustoajoitus tarkan vuoden 1021, ja se tekee paikasta ainoan '
      + 'kiistattoman todisteen eurooppalaisten valtamerten yli tapahtuneesta kontaktista '
      + 'Amerikkaan ennen Kolumbusta — Grönlantia lukuun ottamatta. Löydöt sopivat yhteen '
      + 'Grönlantilaisten saagan ja Punaisen Eirikin saagan kertomusten kanssa Leif '
      + 'Erikssonista, vaikka saagat kirjoitettiin muistiin vasta 1200-luvulla. Paikalta on '
      + 'kaivettu kahdeksan turpeesta ja puusta rakennetun rakennuksen jäännökset, yli 800 '
      + 'esinettä sekä jälkiä raudanvalmistuksesta. Arkeologit pitävät paikkaa tukikohtana, '
      + 'josta käsin etelämpänä olevia seutuja tutkittiin.',
    lahde: "en-Wikipedia \"L'Anse aux Meadows\", johdanto-osa (tarkistettu 6.9.2026).",
  },
  {
    id: 'craigellachien-viimeinen-naula',
    nimi: 'Craigellachie',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi British Columbia liittyi Kanadaan?',
      'Ketkä puuttuvat kuuluisasta naulakuvasta?',
    ],
    korostukset: ['lumisuoja|lumisuojia'],
    nappi: 'Viimeinen naula, 7.11.1885 kello 9.22',
    // -118.7175 E / 50.9722 N — en-Wikipedia "Last spike (Canadian Pacific Railway)"
    // Lähin pelikaupunki: Vancouver 153,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 1876.1, y: 1347.6 },
    },
    teksti: 'Craigellachiessa British Columbiassa lyötiin 7. marraskuuta 1885 kello 9.22 '
      + 'Kanadan Tyynenmeren radan viimeinen naula. Naulan löi rahoittaja Donald Smith, ja '
      + 'se päätti hankkeen, jota olivat vaivanneet luonnonmullistukset, rahakriisit ja '
      + 'kapina. Rata oli lupaus: British Columbia oli liittynyt Kanadaan 1871 sillä '
      + 'ehdolla, että maa rakentaa radan Tyyneltämereltä itään. Ensimmäinen määräaika 1881 '
      + 'meni umpeen, kun vain vähän oli valmiina, ja osa British Columbian poliitikoista '
      + 'uhkasi erolla; uusi yhtiö sai kymmenen vuotta lisäaikaa ja teki työn viidessä. '
      + 'Läpikulkevat junat lähtivät kuitenkin vasta kesäkuussa 1886, koska Rogersin ja '
      + 'Kicking Horsen solat vaativat lumisuojia. Kiinalaisten rautatietyöläisten osuus '
      + 'jäi varjoon: kuuluisassa naulakuvassa ei ole yhtäkään kiinalaista.',
    lahde: 'en-Wikipedia "Last spike (Canadian Pacific Railway)", johdanto-osa ja osio '
      + '"Background to completion of the railway" (tarkistettu 6.9.2026).',
  },
  {
    id: 'rideaun-kanava',
    nimi: 'Rideaun kanava',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi kanava rakennettiin alun perin?',
      'Mitä ranskan sana rideau tarkoittaa?',
    ],
    korostukset: ['sulkua|sulkua'],
    nappi: 'Pohjois-Amerikan vanhin yhä käytössä oleva kanava',
    // -76.486 E / 44.2312 N (kanavan eteläpää Kingstonissa) — en-Wikipedia "Rideau Canal"
    // Lähin pelikaupunki: Toronto 99,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3283.8, y: 1633.3 },
    },
    teksti: 'Rideaun kanava yhdistää Ottawajoen Ottawassa Cataraquijokeen ja Ontariojärveen '
      + 'Kingstonissa 202 kilometrin matkalla. Sen 46 sulkua nostavat veneen Ottawajoesta 83 '
      + 'metriä ylös Rideaujärville ja laskevat sen sieltä 50 metriä alas Kingstoniin. Kanava '
      + 'avattiin rahtiliikenteelle 1832; rahti siirtyi aikanaan rautateille ja Saint '
      + 'Lawrencen merireitille, mutta kanava on yhä käytössä huviveneilijöiden reittinä '
      + 'toukokuusta lokakuuhun. Se on Pohjois-Amerikan vanhin yhtäjaksoisesti toiminut '
      + 'kanavajärjestelmä ja Unescon maailmanperintökohde. Nimi tulee Rideaujoesta, joka '
      + 'sai nimensä putouksistaan: ranskaksi rideau on verho, ja putoukset näyttivät '
      + 'verholta siinä, missä ne yhtyvät Ottawajokeen.',
    lahde: 'en-Wikipedia "Rideau Canal", johdanto-osa ja osio "Toponymy" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'head-smashed-in',
    nimi: 'Head-Smashed-In',
    tyyppi: 'historia',
    kysymykset: [
      'Miten biisonit ohjattiin jyrkänteelle ennen hevosia?',
      'Mistä paikan nimi kertoo?',
    ],
    korostukset: ['ajokujat|ajokujille'],
    nappi: 'Jyrkänne, jota käytettiin 5 500 vuotta',
    // -113.6272 E / 49.6975 N — en-Wikipedia "Head-Smashed-In Buffalo Jump"
    // Lähin pelikaupunki: Vancouver 309,2 lautayksikköä (Yellowstone 238,8 on USA:ssa).
    laudat: {
      maailmankartta: { x: 2045.8, y: 1403.3 },
    },
    teksti: 'Head-Smashed-In eli Estipah-skikikini-kots on biisonijyrkänne ja mustajalkojen '
      + 'kulttuurin museo Albertassa, siellä missä Kalliovuorten juuret nousevat preerialta. '
      + 'Tasankojen alkuperäiskansat ajoivat biisoneja yksitoistametrisen jyrkänteen yli '
      + '5 500 vuoden ajan. Ennen hevosia mustajalat ajoivat lauman laidunmaalta noin kolmen '
      + 'kilometrin päästä ajokujille, joita reunustivat sadat kiviröykkiöt, ja pukeutuivat '
      + 'kojooteiksi ja susiksi; erityisesti koulutetut nuoret miehet, "biisonijuoksijat", '
      + 'ohjasivat eläimet kujaan. Luukerrostuma jyrkänteen alla on kaksitoista metriä paksu. '
      + 'Nimi tulee tarinasta pojasta, joka halusi katsoa syöksyä alhaalta ja jäi eläinten '
      + 'alle. Paikka on Unescon maailmanperintökohde.',
    lahde: 'en-Wikipedia "Head-Smashed-In Buffalo Jump", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'dinosaur-provincial-park',
    nimi: 'Dinosaur Provincial Park',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä on badland-maasto?',
      'Montako dinosauruslajia puistosta on löydetty?',
    ],
    korostukset: ['badland|badland'],
    nappi: 'Viisisataa dinosaurusta maailman museoihin',
    // -111.5069 E / 50.7669 N — en-Wikipedia "Dinosaur Provincial Park"
    // Lähin pelikaupunki: Vancouver 421,9 (Yellowstone 263,6 ja Mount Rushmore 366,8 USA:ssa).
    laudat: {
      maailmankartta: { x: 2116.4, y: 1356.7 },
    },
    teksti: 'Dinosaur Provincial Park on Unescon maailmanperintökohde Red Deer -joen '
      + 'laaksossa Albertassa, 220 kilometriä Calgarysta itään. Laakso tunnetaan '
      + 'silmiinpistävästä badland-maastostaan ja fossiilirunsaudestaan: puisto on yksi '
      + 'maailman rikkaimmista dinosauruslöytöpaikoista. Sieltä on löydetty 58 dinosauruslajia '
      + 'ja poistettu yli 500 näytettä, jotka ovat päätyneet museoihin ympäri maailman. '
      + 'Maailmanperintöluetteloon puisto otettiin 1979, ja perusteena oli lähes 500 '
      + 'eliölajin kokonaisuus mikroskooppisista saniaisitiöistä suuriin petodinosauruksiin. '
      + 'Vierailukeskuksen lähellä seisoo myös John Waren mökki — 1900-luvun alun '
      + 'karjapaimenen koti, joka on kunnostettu museoksi.',
    lahde: 'en-Wikipedia "Dinosaur Provincial Park", johdanto-osa ja osio "Dinosaur '
      + 'Provincial Park Visitor Centre" (tarkistettu 6.9.2026).',
  },
  {
    id: 'vanha-quebec',
    nimi: 'Vanha Québec',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi ylä- ja alakaupunki eroavat toisistaan?',
      'Kuka valitsi paikan vuonna 1608?',
    ],
    korostukset: ['Cap Diamant|Cap Diamant'],
    nappi: 'Kaupunki kalliolla, ylä- ja alakerta',
    // -71.2075 E / 46.8131 N — en-Wikipedia "Old Quebec"
    // Lähin pelikaupunki: Montreal 77,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3459.8, y: 1526.4 },
    },
    teksti: 'Vanha Québec on Québecin kaupungin historiallinen kaupunginosa ja Unescon '
      + 'maailmanperintökohde. Se jakautuu ylä- ja alakaupunkiin, ja ero on jyrkkä: Samuel '
      + 'de Champlain valitsi 1608 ylätasanteen Fort Saint Louis'
      + ' -linnoitukselleen, ja Cap Diamant -kallion päällä oleva paikka on ollut siitä '
      + 'lähtien kaupungin sotilaallinen ja hallinnollinen keskus. Britannian valloituksen '
      + 'jälkeen ylhäällä asuivat brittihallinnon virkamiehet ja katolinen papisto, kun taas '
      + 'ranskalaiset ja englantilaiset kauppiaat ja käsityöläiset asuivat alakaupungissa. '
      + 'Kaupunginosaa kutsutaan toisinaan myös latinalaiseksi kortteliksi Séminaire de '
      + 'Québecin ympäristön mukaan — siellä oli Laval-yliopiston alkuperäinen paikka.',
    lahde: 'en-Wikipedia "Old Quebec", johdanto-osa ja osio "Upper Town" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'louisbourgin-linnoitus',
    nimi: 'Louisbourgin linnoitus',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi linnoitus oli heikko maan puolelta?',
      'Mihin Louisbourg vaihdettiin rauhanneuvotteluissa?',
    ],
    korostukset: ['vaihtokolikko|vaihtokolikkona'],
    nappi: 'Kallein linnoitus Uudessa maailmassa',
    // -59.9833 E / 45.8917 N — en-Wikipedia "Fortress of Louisbourg"
    // Lähin pelikaupunki: Halifax 121,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3833.9, y: 1564.9 },
    },
    teksti: 'Louisbourgin linnoitus Cape Bretonin saarella Nova Scotiassa perustettiin 1713 '
      + 'kalasatamana ja kasvoi 1700-luvun puoliväliin mennessä yhdeksi Pohjois-Amerikan '
      + 'laajimmista ja kalleimmista eurooppalaisista linnoituksista. Muurit rakennettiin '
      + 'pääosin 1720–1740, ja linnoitus sai nimensä Ludvig XIV:n mukaan. Se oli kuitenkin '
      + 'rakennettu matalalle maalle lähikukkuloiden alle ja suunniteltu torjumaan hyökkäys '
      + 'mereltä, joten maan puoleiset varustukset olivat heikot — ja apu oli kaukana sekä '
      + 'Ranskasta että Québecistä. Uudisasukkaat valtasivat sen 1745, ja se toimi '
      + 'vaihtokolikkona vuoden 1748 rauhassa: Ranska sai sen takaisin nykyisen Belgian '
      + 'alueen rajakaupunkeja vastaan. Britit valtasivat sen uudelleen 1758 ja purkivat '
      + 'varustukset järjestelmällisesti. Neljäsosa linnoituksesta rakennettiin uudelleen '
      + '1961 alkaneessa hankkeessa, joka on Pohjois-Amerikan suurin ennallistus.',
    lahde: 'en-Wikipedia "Fortress of Louisbourg", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'dawson-city',
    nimi: 'Dawson City',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi jokaisen oli tuotava mukanaan vuoden ruoat?',
      'Miksi kultaryntäys loppui vuonna 1899?',
    ],
    korostukset: ['Chilkoot|Chilkootin'],
    nappi: '500 asukasta 1896, 17 000 kaksi vuotta myöhemmin',
    // -139.4333 E / 64.0603 N — en-Wikipedia "Klondike Gold Rush"
    // Lähin pelikaupunki: Whitehorse 226,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 1185.6, y: 716.7 },
    },
    teksti: 'Klondiken kultaryntäys vei arviolta 100 000 kullanetsijää kohti Yukonia vuosina '
      + '1896–1898. Kulta löytyi elokuussa 1896, ja kun tieto saapui seuraavana vuonna '
      + 'Seattleen ja San Franciscoon, alkoi ryntäys. Useimmat kulkivat Alaskan Dyean ja '
      + 'Skagwayn kautta Chilkootin tai White Passin polkua Yukonjoelle; Kanadan viranomaiset '
      + 'vaativat jokaiselta vuoden ruokavarastot nälänhädän estämiseksi, joten varusteet '
      + 'painoivat lähes tonnin ja ne kannettiin perille erissä. Klondikejoen ja Yukonin '
      + 'yhtymäkohtaan syntynyt Dawson City kasvoi 500 asukkaasta noin 17 000:een kesään 1898 '
      + 'mennessä. Puinen, eristyksissä oleva kaupunki kärsi tulipaloista, korkeista hinnoista '
      + 'ja kulkutaudeista, ja alueen alkuperäiskansa hän siirrettiin väkisin reservaattiin. '
      + 'Kun Nomesta Alaskasta löytyi kultaa 1899, ryntäys kääntyi sinne ja Dawson tyhjeni.',
    lahde: 'en-Wikipedia "Klondike Gold Rush", johdanto-osa (tarkistettu 6.9.2026).',
  },
];
