/*
 * MAASTOKOHTEET — UZB. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs UZB --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/UZB.json. Työkalu laskee laudan
 * projektiot (maailmankartta = Millerin lieriö, europe = tasaväli),
 * jättää pois laudan, jonka kaavan ulkopuolelle kohde jää, ja
 * tarkistaa että jokainen kohde osuu maan fokuslehden rajaukseen —
 * ikkunan ulkopuolinen merkki olisi olemassa mutta pelaajan
 * ulottumattomissa. Faktat on tarkistettu en-Wikipediasta lähde
 * kerrallaan, ja jokaisen kohteen `lahde`-rivi kertoo mistä artikkelin
 * osasta se on.
 *
 * Maa on YLEISELLÄ reitillä: lehdellä ei ole poltettuja
 * maastonimiä lainkaan, joten merkin nimiö on maastonimen ainoa
 * esiintymä kartalla. Kaksoisnimen vaaraa ei siis ole.
 *
 * Lista yhdistyy maan muihin kohteisiin js/packs/maastokohteet.js
 * -hakemiston kautta (js/fokuskohteet.js KOHDE_MAAT), joten maan
 * mahdollista olemassa olevaa fokuskohteet-pakkia EI ole tarvinnut
 * koskea eikä yhtään sen kohdetta ole toistettu täällä.
 *
 * Uzbekistanin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Araljärvi on suomeksi järvi mutta otsakkeeksi 'Meri' olisi silti väärin ja 'Vuori' vielä väärempi: tyyppi vaihdetaan pakissa käsin arvoon 'muu' + symboli 'luonto' Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js).
 */
export const MAASTOKOHTEET_UZB = [
  {
    id: 'khazretsultan',
    nimi: 'Khazret Sultan',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuoren nimi vaihdettiin?',
      'Mikä Gissarin vuoristo on?',
    ],
    korostukset: ['Gissarin vuoristo|Gissarin vuoristossa'],
    nappi: 'Uzbekistanin katto',
    // 68.1722 E / 38.9483 N — en-Wikipedia "Khazret Sultan"
    laudat: {
      maailmankartta: { x: 8105.7, y: 1844 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Uzbekistanin korkein vuori on vaihtanut nimeä kerran ja saattaa pian menettää '
      + 'arvonimensäkin. Neuvostoaikana huippu tunnettiin kommunistisen puolueen 22. '
      + 'puoluekokouksen huippuna; nyt se on Khazret Sultan, 4 643 metriä, Gissarin vuoristossa '
      + 'aivan Tadžikistanin rajalla. Korkeus on Neuvostoliiton vuoden 1980 mittauksesta, eikä '
      + 'sitä ole korvattu — mutta vuonna 2025 vuorikiipeilijä Eric Gilbertson julkaisi '
      + 'mittauksen, jonka mukaan toinen huippu, Alpomish, on maan korkein. Uzbekistanin '
      + 'viranomaiset pitävät toistaiseksi kiinni vanhasta lukemasta. Rinteiltä on 1800-luvulla '
      + 'löydetty tieteelle uusia perhoslajeja.',
    lahde: 'en-Wikipedia "Khazret Sultan", johdanto-osa (tarkistettu 1.9.2026).',
  },
  {
    id: 'araljarvi',
    nimi: 'Araljärvi',
    // Järvi ei ole meri-otsakkeen kohde: tyyppi 'muu' + symboli
    // 'luonto' Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js)
    // — kortin ylärivi näyttää silloin luokan Luonto.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Minne kokonainen järvi voi kadota?',
      'Mitä järven paljastuneelta pohjalta löytyy?',
    ],
    korostukset: ['suolajärvi'],
    nappi: 'Järvi joka katosi',
    // 58.5 E / 44.3 N — eteläisen Araljärven läntinen allas Karakalpakstanin puolella; artikkelin oma keskipiste 60 / 45 on suurelta osin kuivunutta pohjaa
    laudat: {
      maailmankartta: { x: 7783.3, y: 1630.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Araljärvi oli vielä 1960-luvulla maailman kolmanneksi suurin järvi, 68 000 '
      + 'neliökilometrin suolajärvi Kazakstanin ja Uzbekistanin välissä. Kun '
      + 'neuvostoliittolaiset kasteluhankkeet käänsivät sitä ruokkivat joet pelloille, järvi '
      + 'alkoi kuivua: vuoteen 2007 mennessä jäljellä oli kymmenesosa, neljäksi erilliseksi '
      + 'altaaksi hajonneena. Nimi tarkoittaa saarten merta — saaria järvessä oli yli tuhat.',
    lahde: 'en-Wikipedia "Aral Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'amudarja',
    nimi: 'Amudarja',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joki ei enää pääse perille asti?',
      'Minkä rajan Oxus muinoin merkitsi?',
    ],
    korostukset: ['Oxus|Oxuksena'],
    nappi: 'Antiikin Oxus',
    // 60.63 E / 41.55 N — joen laakso Urgenchin kohdalla Khorezmin keitaalla; artikkelin koordinaatti 59,68 / 44,11 on kuivuneella suulla
    laudat: {
      maailmankartta: { x: 7854.3, y: 1741.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Amudarja syntyy Pamirin vuoristossa Vakhshin ja Panjin yhtyessä ja virtaa luoteeseen '
      + 'kohti Araljärven eteläisiä jäänteitä — mutta perille se ei enää yllä, vaan sen suu on '
      + 'kuivuneella järvenpohjalla. Antiikin maailma tunsi joen Oxuksena, ja sitä pidettiin '
      + 'suur-Iranin ja Turanin rajana. Vettä se kuljettaa keskimäärin noin 70 kuutiokilometriä '
      + 'vuodessa.',
    lahde: 'en-Wikipedia "Amu Darya", johdanto-osa (tarkistettu 30.8.2026).',
  },
  /* ───── KOHTEET (7) JA YKSI MAASTOKOHDE — ERÄ M14, AASIA 4, 6.9.2026
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Uzbekistanilla oli ennen tätä erää kaksi maastokohdetta (Khazret
   * Sultan ja Amudarja) ja yksi kohde (Araljärvi, tyyppi `muu`) eikä
   * eläintäkyä tai skandaalia lainkaan. Tavoite maata kohti on
   * kahdeksan KOHDETTA ja kolme MAASTOKOHDETTA, joten tästä erästä
   * tuli seitsemän kohdetta ja kolmas maastokohde, Aydarjärvi.
   *
   * VAIN MAAILMANKARTAN RIVI (Raamattu 30.8.2026). Koordinaatit on
   * laskettu koneella tools/johda-maastokohteet.mjs:n vientifunktiolla
   * `laudat(lon, lat)`; lon/lat on luettu en-Wikipedian
   * coordinates-propista tai — kun prop on tyhjä — artikkelin oman
   * infolaatikon {{coord}}-mallista, ja kumpi kulloinkin, se lukee
   * kohteen koordinaattirivillä. Jokainen piste osuu maan fokuslehden
   * rajaukseen (x 7596,2…8374,7 ja y 1515,7…1969,8).
   *
   * EI PELIKAUPUNGIN KOHDALLA. Etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin: lähin uusi merkki on
   * Shahrisabz 25,5 lautayksikön päässä Samarkandista, ja raja
   * KAUPUNGIN_KOHDALLA_SADE on 7.
   *
   * BUKHARA EI OLE TÄSSÄ LISTASSA, ja syy on mitattu: maan
   * Konolly–Stoddart-skandaali (js/packs/skandaalit.js) asuu Bukharan
   * Arkin edustalla, ja mikä tahansa Bukharan monumentti — Poi Kalyan,
   * Ark, Chor-Bakr — osuisi 2–3 lautayksikön päähän siitä eli suoraan
   * sen päälle. Kaupungin tarina kerrotaan siis skandaalin kortissa.
   *
   * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
   * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
   */
  {
    id: 'itchan-kala',
    nimi: 'Itchan Kala',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä muurien sisällä on?',
      'Kuka legendan mukaan kaivoi Khivan kanavan?',
    ],
    korostukset: ['Khivan|Khivan'],
    nappi: 'Kokonainen vanhakaupunki muurien sisällä',
    // 60.36389 E / 41.37833 N — en-Wikipedia "Itchan Kala" (artikkelin
    // infolaatikon coord). Lähin pelikaupunki Samarkand 227,7
    // lautayksikköä.
    laudat: {
      maailmankartta: { x: 7845.5, y: 1748.4 },
    },
    teksti: 'Itchan Kala on Khivan muurien ympäröimä sisäkaupunki ja Unescon '
      + 'maailmanperintökohde vuodesta 1990. Sen 37,5 hehtaarilla on yli 50 historiallista '
      + 'muistomerkkiä ja 250 vanhaa taloa, valtaosa 1700- ja 1800-luvuilta. Juma-moskeija '
      + 'perustettiin jo 900-luvulla ja rakennettiin uudelleen 1788–1789, mutta sen '
      + 'kuuluisassa pylvässalissa on yhä 112 pylvästä, jotka on otettu vanhemmista '
      + 'rakennuksista. Muureihin mahtuvat myös Konya Arkin linna, khaanien medresat, '
      + 'mausoleumit sekä karavaaniseraljit ja torit. Perimätiedon mukaan Khivan pyhän '
      + 'Xeyvak-kanavan kaivoi Nooan poika Seem ihmelapiollaan.',
    lahde: 'en-Wikipedia "Itchan Kala", johdanto sekä osiot "Legend of origin" ja "Walls" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'shahrisabz',
    nimi: 'Shahrisabz',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka kaupungissa syntyi?',
      'Mikä kaupungin vanha nimi oli?',
    ],
    korostukset: ['Timur|Timur'],
    nappi: 'Vihreä kaupunki, valloittajan kotikaupunki',
    // 66.8333 E / 39.05 N — en-Wikipedia "Shahrisabz" (artikkelin
    // infolaatikon coord). Lähin pelikaupunki Samarkand 25,5
    // lautayksikköä; koko erän lähin merkki.
    laudat: {
      maailmankartta: { x: 8061.1, y: 1840.1 },
    },
    teksti: 'Shahrisabzin nimi tarkoittaa vihreää kaupunkia, ja se on Qashqadaryon alueella '
      + 'noin 80 kilometriä Samarkandista etelään 622 metrin korkeudessa. Aiemmin se '
      + 'tunnettiin nimellä Kesh tai Kish, ja se on Keski-Aasian vanhimpia kaupunkeja: '
      + 'perustettu yli 2 700 vuotta sitten ja Sogdianan tärkeä keskus Akhaimenidien '
      + 'valtakunnassa 500–300-luvuilla eaa. Kaupunki tunnetaan ennen kaikkea Timurin '
      + 'syntymäpaikkana; hän piti Keshiä kotikaupunkinaan ja aikoi tulla haudatuksi sinne, '
      + 'mutta valtakunnan painopiste siirtyi Samarkandiin. Timurin aikana rakennettiin '
      + 'Ak-Sarayn palatsi ja Dorus-Saodatin muistokompleksi, ja niiden ansiosta vanha '
      + 'kaupunginosa pääsi maailmanperintöluetteloon.',
    lahde: 'en-Wikipedia "Shahrisabz", johdanto sekä osiot "History" ja "The birthplace of '
      + 'Timur" (tarkistettu 6.9.2026).',
  },
  {
    id: 'moynaq',
    nimi: 'Moynaq',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi laivat ovat keskellä autiomaata?',
      'Kuinka kaukana meri nyt on?',
    ],
    korostukset: ['Aralkum|Aralkumin'],
    nappi: 'Satamakaupunki 150 kilometrin päässä vedestä',
    // 59.0333 E / 43.7667 N — en-Wikipedia "Moynaq" (coordinates-prop).
    // Lähin pelikaupunki Samarkand 308,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7801.1, y: 1652.3 },
    },
    teksti: 'Moynaq oli Uzbekistanin ainoa satamakaupunki ja vilkas kalastajayhteisö, jossa '
      + 'asui kymmeniätuhansia ihmisiä ja jonka elinkeinona oli teollinen kalastus ja '
      + 'säilyketuotanto. Kun neuvostohallinto käänsi 1960-luvulla Amudarjan ja Syrdarjan '
      + 'vedet puuvillapelloille, Araljärvi alkoi kuivua. Nyt kaupunki on 150 kilometrin '
      + 'päässä vedestä keskellä Aralkumin autiomaata, ja sen tunnetuin nähtävyys on '
      + 'ruostuvien laivanrunkojen armada entisellä rannalla. Yhden huoneen museossa on '
      + 'maalauksia ja valokuvia kaupungin paremmilta päiviltä. Kuivuneelta pohjalta '
      + 'nousevat pölymyrskyt tuovat suolaa ja sairauksia jäljelle jääneille asukkaille, '
      + 'joista suurin osa on karakalpakkeja.',
    lahde: 'en-Wikipedia "Moynaq", johdanto sekä osiot "History" ja "Aral Sea Memorial" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'nukusin-museo',
    nimi: 'Nukusin museo',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka museon kokoelman keräsi?',
      'Miksi museota sanotaan aavikon Louvreksi?',
    ],
    korostukset: ['avantgarde|avantgarde-taiteen'],
    nappi: 'Kielletty taide piilossa autiomaan laidalla',
    // 59.61233 E / 42.46581 N — en-Wikipedia "Nukus Museum of Art"
    // (artikkelin infolaatikon coord). Lähin pelikaupunki Samarkand
    // 266,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7820.4, y: 1704.9 },
    },
    teksti: 'Nukusin taidemuseo eli Karakalpakstanin valtion taidemuseo on nimetty Igor '
      + 'Savitskin mukaan, joka perusti sen 1966 ja toimi sen ensimmäisenä intendenttinä. '
      + 'Aluksi esillä oli Karakalpakstanin arkeologisia löytöjä, kopioita antiikin '
      + 'veistoksista ja kansantaidetta, ja Savitski keräsi valtaosan kokoelmasta itse. '
      + 'Sitten hän alkoi ostaa keskiaasialaisten nykytaiteilijoiden töitä, ja museoon '
      + 'kertyi maailman toiseksi suurin venäläisen avantgarde-taiteen kokoelma. Esineitä '
      + 'on kaikkiaan yli 82 000. The Guardian on kutsunut museota Uzbekistanin Louvreksi.',
    lahde: 'en-Wikipedia "Nukus Museum of Art", johdanto-osa ja osio "History of the '
      + 'museum" (tarkistettu 6.9.2026).',
  },
  {
    id: 'kampir-tepe',
    nimi: 'Kampir Tepe',
    tyyppi: 'historia',
    kysymykset: [
      'Minkä kadonneen kaupungin paikka tämä voisi olla?',
      'Miksi joki ei enää virtaa raunioiden vieressä?',
    ],
    korostukset: ['Kušanan|Kušanan'],
    nappi: 'Keski-Aasian Pompeiji Oxuksen vanhalla rannalla',
    // 67.0282 E / 37.4105 N — en-Wikipedia "Kampir Tepe" (artikkelin
    // oma {{Coord}}). Lähin pelikaupunki Samarkand 89,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 8067.6, y: 1903.6 },
    },
    teksti: 'Kampir Tepe on kaivauspaikka Surxondaryon alueella lähellä Shoʻrobin kylää, '
      + 'Termezistä luoteeseen. Sitä pidetään Ptolemaioksen kuvaaman kadonneen Oxuksen '
      + 'Aleksandrian paikkana, vaikka Amudarja eli antiikin Oxus on sittemmin siirtänyt '
      + 'uomaansa. The Telegraph on kutsunut paikkaa Keski-Aasian Pompeijiksi. Arkeologi '
      + 'Edvard Rtveladze löysi sen 1972 tutkiessaan Amudarjan rantaa, ja kaivaukset '
      + 'alkoivat 1977 Galina Pugatšenkovan johdolla. Suurin osa löydöistä on Kušanan '
      + 'keisari Kanishkan ajalta 100-luvulta jaa., ja näkyvät rauniot ovat kušanalaisia '
      + 'linnoituksia, jotka rakennettiin 300-luvulta eaa. periytyvän hellenistisen '
      + 'kaupunkikaavan päälle.',
    lahde: 'en-Wikipedia "Kampir Tepe", johdanto-osa ja osio "Discovery" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'ayaz-kala',
    nimi: 'Ayaz-Kala',
    tyyppi: 'historia',
    kysymykset: [
      'Ketä vastaan linnoitukset rakennettiin?',
      'Montako linnoitusta paikalla on?',
    ],
    korostukset: ['Khorezm|Khorezm'],
    nappi: 'Kolme autiomaalinnaa kukkulan päällä',
    // 61.02722 E / 42.00972 N — en-Wikipedia "Ayaz-Kala" (artikkelin
    // infolaatikon coord). Lähin pelikaupunki Samarkand 216,0
    // lautayksikköä.
    laudat: {
      maailmankartta: { x: 7867.6, y: 1723.2 },
    },
    teksti: 'Ayaz-Kala on kaivauspaikka Ellikqalan piirissä Karakalpakstanissa Pohjois-'
      + 'Uzbekistanissa. Kukkulan laella Kyzylkumin autiomaan reunalla on kolmen '
      + 'khorezmilaisen linnoituksen rauniot, jotka rakennettiin 300-luvun eaa. ja '
      + '600-luvun jaa. välillä. Linnoitukset kuuluivat ketjuun, joka suojasi viljelysalueita '
      + 'paimentolaisten ja Syrdarjan suiston sakojen ratsastusretkiltä. Vanhin niistä, '
      + 'Ayaz Kala 1, on 300-luvun lopulta tai 200-luvun alusta eaa. — ajalta, jolloin '
      + 'Khorezm oli itsenäistynyt Persiasta. Se seisoo noin sadan metrin korkuisella '
      + 'kukkulalla, on suorakaiteen muotoinen ja sivuiltaan 182 ja 152 metriä. Osan '
      + 'rakensi 100-luvulla Kušanan valtakunta.',
    lahde: 'en-Wikipedia "Ayaz-Kala", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'kokand',
    nimi: 'Kokand',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä Kokandin khaanikunta oli?',
      'Kuinka monta huonetta khaanin palatsissa oli?',
    ],
    korostukset: ['khaanikunnan|khaanikunnan'],
    nappi: 'Tuulten kaupunki Ferganan laakson portilla',
    // 70.9425 E / 40.52861 N — en-Wikipedia "Kokand"
    // (coordinates-prop). Lähin pelikaupunki Samarkand 138,7
    // lautayksikköä.
    laudat: {
      maailmankartta: { x: 8198.1, y: 1782.1 },
    },
    teksti: 'Kokand on Ferganan laakson lounaisreunalla kahden vanhan kauppatien '
      + 'risteyksessä, ja sitä sanotaan tuulten kaupungiksi. Nykyinen kaupunki alkoi '
      + 'linnoituksesta vuonna 1732 vanhemman Eski-Kurganin paikalla, ja 1740 siitä tuli '
      + 'Kokandin khaanikunnan pääkaupunki; valtakunta ulottui lännessä Kyzylordaan ja '
      + 'koillisessa Biškekiin. Kokand oli myös laakson uskonnollinen keskus, ja siellä oli '
      + 'yli 300 moskeijaa. Khudayar-khaanin palatsin rakensi vuosina 1863–1874 arkkitehti '
      + 'Mir Ubaydullo: siinä oli 114 huonetta seitsemän sisäpihan ympärillä, ja '
      + 'yhdysvaltalainen diplomaatti Eugene Schuyler kuvasi sitä paljon mahtavammaksi kuin '
      + 'mikään muu palatsi Keski-Aasiassa. Neuvostoaikana suurin osa purettiin, mutta 19 '
      + 'huonetta on jäljellä.',
    lahde: 'en-Wikipedia "Kokand", johdanto sekä osiot "History" ja "The Palace of Khudayar '
      + 'Khan" (tarkistettu 6.9.2026).',
  },
  {
    id: 'aydarjarvi',
    nimi: 'Aydarjärvi',
    // Järvi ei ole meri-otsakkeen kohde: tyyppi 'jarvi' pitää sen
    // MAASTOKOHTEENA (tools/laske-karttanostot.mjs MAASTON_TYYPIT) ja
    // symboli 'luonto' antaa kortille saman ylärivin kuin Araljärvelle.
    symboli: 'luonto',
    tyyppi: 'jarvi',
    kysymykset: [
      'Miten järvi syntyi vahingossa?',
      'Miksi vettä sanotaan murtovedeksi eikä suolaiseksi?',
    ],
    korostukset: ['Arnasayn|Arnasayn'],
    nappi: 'Meri hiekassa, jota ei suunniteltu',
    // 66.8 E / 40.9167 N — en-Wikipedia "Aydar Lake" (artikkelin
    // infolaatikon coord). Lähin pelikaupunki Samarkand 48,1
    // lautayksikköä.
    laudat: {
      maailmankartta: { x: 8060, y: 1766.7 },
    },
    teksti: 'Aydarjärvi kuuluu Aydar–Arnasayn järviryhmään, joka peittää 4 000 '
      + 'neliökilometriä Kyzylkumin kaakkoisia painanteita. Vielä viime vuosisadan '
      + 'puoliväliin asti Arnasayn alanko oli suurimman osan vuodesta kuiva suola-aavikko. '
      + '1960-luvun alussa Syrdarja padottiin ja Shardaran pato rakennettiin, ja kun sen '
      + 'tulvaluukut avattiin rajussa tulvassa vuonna 1969, helmikuun 1969 ja helmikuun '
      + '1970 välillä altaasta valui alankoon lähes 60 prosenttia Syrdarjan keskivirtaamasta '
      + 'eli 21 kuutiokilometriä vettä. Näin syntyi vahingossa Keski-Aasian kolmanneksi '
      + 'suurin järvi Issyk-Kulin ja Kaspianmeren jälkeen: lähes 250 kilometriä pitkä ja '
      + 'jopa 15 kilometriä leveä. Vesi on murtovettä, noin kaksi grammaa suolaa litrassa.',
    lahde: 'en-Wikipedia "Aydar Lake", johdanto-osa ja osio "Background" '
      + '(tarkistettu 6.9.2026).',
  },
];
