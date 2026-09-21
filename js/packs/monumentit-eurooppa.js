/*
 * KADONNEET EUROOPPALAISET MONUMENTIT — 38 uutta karttakohdetta.
 *
 * Tutkimus: output/fable-images-20260921/source-orders/
 * fable-codexille-monumentit-eurooppa-{1,2,3-4}-20260921.md.
 * Skálholt ei ole tässä: sen olemassa oleva maastokohde saa ihmeen
 * maastokohteet-isl.js:ssä. Raunioina säilyvät 30 parikuvaa ovat jo
 * omissa hahmotelmapakoissaan ja saavat paikalliset ihmeosoitteet siellä.
 */

const ihme = (tiedosto, selite, url) => ({
  osoite: `https://media.matkakirja.app/kohtaamiset/ihmeet/${tiedosto}`,
  kadonnut: true,
  selite,
  lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan. '
    + 'Faktapohja on kohdekortin lähderivillä.',
  url,
});

const kohde = ({ id, nimi, nappi, laudat, teksti, lahde, kuva, url }) => ({
  id: `hahmotelma-${id}`,
  nimi,
  tyyppi: 'historia',
  lahi: true,
  kysymykset: [
    `Miltä ${nimi} näytti loistoaikanaan?`,
    `Miksi ${nimi} katosi?`,
  ],
  nappi,
  laudat,
  teksti,
  lahde,
  ihme: ihme(kuva, `${nimi} on kuvattu ehjänä historiallisten kuvausten, säilyneiden `
    + 'jäänteiden ja tutkimuslähteiden perusteella.', url),
});

export const EUROOPAN_KADONNEET = {
  FRA: [kohde({
    id: 'saint-cloud', nimi: 'Saint-Cloud’n linna',
    nappi: 'Aurinkokuninkaan veljen palatsi Pariisin länsipuolella',
    laudat: { maailmankartta: { x: 5906.2, y: 1440.4 }, europe: { x: 253.2, y: 609.2 } },
    teksti: 'Saint-Cloud’n linna kasvoi 1600-luvulla Orléansin herttuan loisteliaaksi '
      + 'residenssiksi puutarhoineen. Napoleon III käytti sitä kesäpalatsinaan, kunnes '
      + 'rakennus paloi Ranskan–Preussin sodassa 1870. Rauniot purettiin vuonna 1892.',
    lahde: 'en-Wikipedia "Château de Saint-Cloud", johdanto ja historia (tarkistettu 21.9.2026).',
    kuva: 'ihme-saint-cloud-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Ch%C3%A2teau_de_Saint-Cloud',
  })],
  DEU: [
    kohde({
      id: 'hampurin-vanha-raatihuone', nimi: 'Hampurin vanha raatihuone',
      nappi: 'Renessanssiraatihuone, joka räjäytettiin suurpalon tieltä',
      laudat: { maailmankartta: { x: 6166.4, y: 1232.3 }, europe: { x: 403.1, y: 485.2 } },
      teksti: 'Hampurin Alsterin rannalla seissyt renessanssiraatihuone valmistui vuonna 1290 '
        + 'ja laajeni vuosisatojen aikana. Vuoden 1842 suurpalossa rakennus räjäytettiin '
        + 'palokujan avaamiseksi. Nykyinen raatihuone valmistui eri paikalle 1897.',
      lahde: 'de-Wikipedia "Altes Rathaus (Hamburg)" ja Great Fire of Hamburg (tarkistettu 21.9.2026).',
      kuva: 'ihme-hampurin-vanha-raatihuone-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Great_fire_of_Hamburg',
    }),
    kohde({
      id: 'pantaleonstor', nimi: 'Pantaleonstor',
      nappi: 'Kölnin keskiaikaisen muurin kaksoistorninen eteläportti',
      laudat: { maailmankartta: { x: 6064.9, y: 1349.8 }, europe: { x: 344.6, y: 554.3 } },
      teksti: 'Pantaleonstor oli yksi Kölnin suuren keskiaikaisen kaupunginmuurin porteista. '
        + 'Kaksoistorninen portti hallitsi eteläistä maantietä, kunnes kaupunki purki '
        + 'muurit ja portit 1800-luvun lopulla kasvavan liikenteen tieltä.',
      lahde: 'de-Wikipedia "Pantaleonstor" ja Kölnin kaupunginmuurien tutkimus (tarkistettu 21.9.2026).',
      kuva: 'ihme-pantaleonstor-loistoaika.jpg', url: 'https://de.wikipedia.org/wiki/Pantaleonstor',
    }),
  ],
  ITA: [
    kohde({
      id: 'circus-maximus', nimi: 'Circus Maximus',
      nappi: 'Rooman valtava vaunukilparata täyden katsomon aikana',
      laudat: { maailmankartta: { x: 6249.5, y: 1728.1 }, europe: { x: 450.9, y: 792.0 } },
      teksti: 'Circus Maximus oli Rooman ensimmäinen ja suurin vaunukilparata, jonka '
        + 'katsomoihin mahtui yli 150 000 ihmistä. Kilpailuja järjestettiin lähes tuhannen '
        + 'vuoden ajan. Viimeisten kisojen jälkeen vuonna 549 rakenteet muuttuivat kivilouhokseksi.',
      lahde: 'en-Wikipedia "Circus Maximus", johdanto ja historia (tarkistettu 21.9.2026).',
      kuva: 'ihme-circus-maximus-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Circus_Maximus',
    }),
    kohde({
      id: 'vanha-pietarinkirkko', nimi: 'Vanha Pietarinkirkko',
      nappi: 'Konstantinuksen basilika ennen uuden kirkon rakennustöitä',
      laudat: { maailmankartta: { x: 6248.5, y: 1727.5 }, europe: { x: 450.3, y: 791.6 } },
      teksti: 'Konstantinus I rakennutti vanhan Pietarinkirkon 300-luvulla apostoli Pietarin '
        + 'haudan päälle. Basilika seisoi yli tuhat vuotta ja siellä kruunattiin Kaarle Suuri '
        + 'vuonna 800. Se purettiin vaiheittain uuden Pietarinkirkon tieltä vuoteen 1605 mennessä.',
      lahde: 'en-Wikipedia "Old St. Peter’s Basilica", johdanto ja historia (tarkistettu 21.9.2026).',
      kuva: 'ihme-vanha-pietarinkirkko-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Old_St._Peter%27s_Basilica',
    }),
    kohde({
      id: 'domus-aurea', nimi: 'Domus Aurea',
      nappi: 'Neron kultainen palatsialue järvineen ja puutarhoineen',
      laudat: { maailmankartta: { x: 6249.9, y: 1727.9 }, europe: { x: 451.1, y: 791.9 } },
      teksti: 'Nero rakennutti Domus Aurean Rooman suurpalon jälkeen vuosina 64–68. '
        + 'Palatsialueeseen kuului satoja huoneita, puutarhoja, järvi ja valtava pronssipatsas. '
        + 'Neron kuoleman jälkeen rakennukset riisuttiin ja peitettiin uusien rakennusten alle.',
      lahde: 'en-Wikipedia "Domus Aurea", johdanto ja historia (tarkistettu 21.9.2026).',
      kuva: 'ihme-domus-aurea-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Domus_Aurea',
    }),
  ],
  ESP: [
    kohde({
      id: 'real-alcazar-madrid', nimi: 'Madridin Real Alcázar',
      nappi: 'Habsburgien kuninkaanlinna ennen jouluyön tulipaloa',
      laudat: { maailmankartta: { x: 5709.5, y: 1786.4 }, europe: { x: 139.9, y: 830.6 } },
      teksti: 'Madridin maurilainen linnoitus kasvoi Habsburgien kuninkaanlinnaksi, jossa '
        + 'säilytettiin noin kahta tuhatta maalausta. Jouluaattona 1734 syttynyt tulipalo '
        + 'raivosi neljä päivää. Nykyinen Palacio Real rakennettiin sen paikalle.',
      lahde: 'en-Wikipedia "Royal Alcázar of Madrid", johdanto ja vuoden 1734 palo (tarkistettu 21.9.2026).',
      kuva: 'ihme-real-alcazar-madrid-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Royal_Alc%C3%A1zar_of_Madrid',
    }),
    kohde({
      id: 'buen-retiro', nimi: 'Palacio del Buen Retiro',
      nappi: 'Filip IV:n laaja huvilinna puutarhoineen',
      laudat: { maailmankartta: { x: 5710.4, y: 1786.6 }, europe: { x: 140.4, y: 830.7 } },
      teksti: 'Buen Retiro oli Filip IV:lle 1630-luvulla rakennettu yli kahdenkymmenen '
        + 'rakennuksen palatsikokonaisuus. Napoleonin joukot vaurioittivat sitä vuonna 1808, '
        + 'minkä jälkeen suurin osa purettiin. Vain kaksi sivurakennusta säilyi.',
      lahde: 'en-Wikipedia "Buen Retiro Palace", johdanto ja tuho (tarkistettu 21.9.2026).',
      kuva: 'ihme-buen-retiro-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Buen_Retiro_Palace',
    }),
  ],
  PRT: [
    kohde({
      id: 'paco-da-ribeira', nimi: 'Paço da Ribeira',
      nappi: 'Portugalin kuninkaanlinna Tejo-joen rannalla',
      laudat: { maailmankartta: { x: 5528.8, y: 1853.4 }, europe: { x: 35.8, y: 875.6 } },
      teksti: 'Manuel I:n vuonna 1502 valmistunut Paço da Ribeira oli Portugalin '
        + 'kuninkaiden päähallintokeskus. Lissabonin maanjäristys, hyökyaalto ja tulipalo '
        + 'tuhosivat palatsin 1. marraskuuta 1755. Paikalla on nykyinen Praça do Comércio.',
      lahde: 'en-Wikipedia "Ribeira Palace", johdanto ja vuoden 1755 tuho (tarkistettu 21.9.2026).',
      kuva: 'ihme-paco-da-ribeira-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Ribeira_Palace',
    }),
    kohde({
      id: 'hospital-real-todos-os-santos', nimi: 'Hospital Real de Todos-os-Santos',
      nappi: 'Manuel I:n suuri sairaala Rossion laidalla',
      laudat: { maailmankartta: { x: 5528.7, y: 1853.2 }, europe: { x: 35.7, y: 875.4 } },
      teksti: 'Kaikkien pyhien kuninkaallinen sairaala rakennettiin Lissaboniin vuosina '
        + '1492–1504 ja oli aikansa Euroopan suurimpia. Vuoden 1755 maanjäristys ja sitä '
        + 'seurannut tulipalo tuhosivat rakennuksen, jota ei enää rakennettu uudelleen.',
      lahde: 'en-Wikipedia "Hospital Real de Todos-os-Santos" (tarkistettu 21.9.2026).',
      kuva: 'ihme-hospital-real-todos-os-santos-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Hospital_Real_de_Todos-os-Santos',
    }),
  ],
  NLD: [
    kohde({
      id: 'amsterdamin-vanha-raatihuone', nimi: 'Amsterdamin vanha raatihuone',
      nappi: 'Damin goottilainen raatihuone ennen vuoden 1652 paloa',
      laudat: { maailmankartta: { x: 5996.4, y: 1285.4 }, europe: { x: 305.1, y: 516.2 } },
      teksti: 'Amsterdamin keskiaikainen raatihuone seisoi Damin torilla 1400-luvulta lähtien. '
        + 'Tulipalo tuhosi sen 7. heinäkuuta 1652. Uusi raatihuone, nykyinen kuninkaanlinna, '
        + 'valmistui viereen vuonna 1665.',
      lahde: 'Rijksmuseum ja nl-Wikipedia "Oude Stadhuis van Amsterdam" (tarkistettu 21.9.2026).',
      kuva: 'ihme-amsterdamin-vanha-raatihuone-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Royal_Palace_of_Amsterdam',
    }),
    kohde({
      id: 'utrechtin-domkirkon-keskilaiva', nimi: 'Utrechtin Domkirkon keskilaiva',
      nappi: 'Katedraalin keskilaiva ennen vuoden 1674 myrskyä',
      laudat: { maailmankartta: { x: 6004.1, y: 1298.0 }, europe: { x: 309.5, y: 523.6 } },
      teksti: 'Utrechtin Domkirkon keskilaiva jäi vuosisadoiksi keskeneräiseksi rahapulan '
        + 'vuoksi. Hirmumyrsky romahdutti sen 1. elokuuta 1674. Kuori ja torni jäivät '
        + 'erilleen, ja niiden välinen alue on nykyinen Domplein.',
      lahde: 'en-Wikipedia "St. Martin’s Cathedral, Utrecht", vuoden 1674 myrsky (tarkistettu 21.9.2026).',
      kuva: 'ihme-utrechtin-domkirkon-keskilaiva-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/St._Martin%27s_Cathedral,_Utrecht',
    }),
  ],
  AUT: [
    kohde({
      id: 'vanha-burgtheater', nimi: 'Wienin vanha Burgtheater',
      nappi: 'Keisarillinen hoviteatteri Michaelerplatzilla',
      laudat: { maailmankartta: { x: 6378.9, y: 1467.4 }, europe: { x: 525.4, y: 625.7 } },
      teksti: 'Wienin keisarillinen hoviteatteri avattiin vuonna 1741. Siellä kantaesitettiin '
        + 'muun muassa Mozartin Figaron häät vuonna 1786. Kun uusi Burgtheater avattiin '
        + 'Ringstraßella 1888, vanha rakennus purettiin Hofburgin laajennuksen tieltä.',
      lahde: 'en-Wikipedia "Burgtheater", vanhan teatterin historia (tarkistettu 21.9.2026).',
      kuva: 'ihme-vanha-burgtheater-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Burgtheater',
    }),
    kohde({
      id: 'karntnertor-bastioni', nimi: 'Kärntnertor-bastioni',
      nappi: 'Wienin renessanssimuuri juuri ennen Ringstraßea',
      laudat: { maailmankartta: { x: 6379.0, y: 1467.6 }, europe: { x: 525.5, y: 625.9 } },
      teksti: 'Wieniä ympäröivät 1500-luvulta renessanssiajan bastionimuurit. Keisari '
        + 'Frans Joosef määräsi muurit purettaviksi vuonna 1857. Kärntnertor ja sen '
        + 'bastioni katosivat, ja vapautuneelle alueelle rakennettiin Ringstraße.',
      lahde: 'de-Wikipedia "Wiener Stadtmauern" ja Kärntnertor (tarkistettu 21.9.2026).',
      kuva: 'ihme-karntnertor-bastioni-loistoaika.jpg', url: 'https://de.wikipedia.org/wiki/Wiener_Stadtmauern',
    }),
  ],
  CHE: [
    kohde({
      id: 'christoffelturm', nimi: 'Bernin Christoffelturm',
      nappi: 'Pyhän Kristoforoksen vartioima keskiaikainen kaupunginportti',
      laudat: { maailmankartta: { x: 6081.3, y: 1520.7 }, europe: { x: 354.0, y: 658.9 } },
      teksti: 'Christoffelturm rakennettiin vuosina 1344–1346 Bernin kolmannen '
        + 'kaupunginmuurin portiksi. Kaupunginvaltuusto päätti vain neljän äänen erolla '
        + 'purkaa tornin rautatieaseman tieltä. Purku alkoi vuonna 1865.',
      lahde: 'de-Wikipedia "Christoffelturm" ja Bernin kaupunginarkisto (tarkistettu 21.9.2026).',
      kuva: 'ihme-christoffelturm-loistoaika.jpg', url: 'https://de.wikipedia.org/wiki/Christoffelturm',
    }),
    kohde({
      id: 'porte-neuve', nimi: 'Geneven Porte Neuve',
      nappi: 'Geneven läntinen pääportti ennen linnoitusten purkua',
      laudat: { maailmankartta: { x: 6038.1, y: 1552.0 }, europe: { x: 329.1, y: 678.5 } },
      teksti: 'Porte Neuve rakennettiin 1740-luvulla Geneven läntiseksi pääportiksi. '
        + 'Kaupungin linnoitusvyöhyke purettiin 1850-luvulla laajenemisen tieltä, ja portti '
        + 'purettiin vuonna 1853. Sen paikalla on nykyinen Place Neuve.',
      lahde: 'fr-Wikipedia "Place Neuve" ja Geneven linnoitushistoria (tarkistettu 21.9.2026).',
      kuva: 'ihme-porte-neuve-loistoaika.jpg', url: 'https://fr.wikipedia.org/wiki/Place_Neuve_(Gen%C3%A8ve)',
    }),
  ],
  CZE: [kohde({
    id: 'josefov-asanace', nimi: 'Josefov ennen asanacea',
    nappi: 'Prahan juutalaiskorttelin keskiaikainen kujaverkko',
    laudat: { maailmankartta: { x: 6313.9, y: 1386.3 }, europe: { x: 488.0, y: 576.2 } },
    teksti: 'Josefov oli Prahan tiheästi rakennettu keskiaikainen juutalaiskortteli. '
      + 'Frans Joosef vahvisti saneerauslain vuonna 1893, ja valtaosa kujista purettiin '
      + 'vuosina 1895–1913. Kuusi synagogaa ja vanha hautausmaa säilyivät.',
    lahde: 'en-Wikipedia "Josefov" ja Prague Jewish Town redevelopment (tarkistettu 21.9.2026).',
    kuva: 'ihme-josefov-asanace-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Josefov',
  })],
  HUN: [kohde({
    id: 'budan-matyas-palatsi', nimi: 'Budan Mátyás-palatsi',
    nappi: 'Mátyás Corvinuksen italialainen renessanssihovi',
    // Pieni itäinen asettelusiirto pitää Hollókőn ja Kruunuvarkaus 1440:n nimiöt erillään.
    laudat: { maailmankartta: { x: 6469.0, y: 1497.6 }, europe: { x: 577.3, y: 644.5 } },
    teksti: 'Budan keskiaikainen kuninkaanlinna sai Mátyás Corvinuksen aikana 1470-luvulta '
      + 'lähtien loisteliaan varhaisrenessanssiasun. Vuoden 1686 piiritys tuhosi palatsin '
      + 'raskaalla tykistöllä, ja jäljelle jääneet rauniot purettiin 1715.',
    lahde: 'en-Wikipedia "Buda Castle", keskiaikainen palatsi (tarkistettu 21.9.2026).',
    kuva: 'ihme-budan-matyas-palatsi-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Buda_Castle',
  })],
  BGR: [
    kohde({
      id: 'pliska-palatsi', nimi: 'Pliskan kaanien palatsi',
      nappi: 'Ensimmäisen Bulgarian valtakunnan pääkaupungin suurpalatsi',
      laudat: { maailmankartta: { x: 6737.5, y: 1668.6 }, europe: { x: 732.0, y: 753.1 } },
      teksti: 'Pliska oli ensimmäisen Bulgarian valtakunnan pääkaupunki vuosina 681–893. '
        + 'Nikeforos I poltti palatsin vuonna 811, mutta kaani Omurtag rakennutti sen '
        + 'uudelleen. Sodat tuhosivat kaupungin lopullisesti 900-luvun lopulla.',
      lahde: 'en-Wikipedia "Pliska", historia ja palatsialue (tarkistettu 21.9.2026).',
      kuva: 'ihme-pliska-palatsi-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Pliska',
    }),
    kohde({
      id: 'antiikin-serdika', nimi: 'Antiikin Serdika',
      nappi: 'Konstantinus Suuren roomalainen kaupunki nykyisen Sofian alla',
      laudat: { maailmankartta: { x: 6610.7, y: 1695.6 }, europe: { x: 659.0, y: 770.6 } },
      teksti: 'Serdika oli merkittävä roomalainen provinssikaupunki nykyisen Sofian paikalla. '
        + 'Konstantinus Suuren kerrotaan kutsuneen sitä omaksi Roomakseen. Attilan hunnit '
        + 'tuhosivat kaupungin vuonna 447, ja Justinianus rakensi sen uudelleen.',
      lahde: 'en-Wikipedia "History of Sofia", antiikin Serdika (tarkistettu 21.9.2026).',
      kuva: 'ihme-antiikin-serdika-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/History_of_Sofia',
    }),
  ],
  HRV: [kohde({
    id: 'salona-porta-caesarea', nimi: 'Salonan Porta Caesarea',
    nappi: 'Rooman Dalmatian pääkaupungin monumentaalinen portti',
    laudat: { maailmankartta: { x: 6382.8, y: 1661.5 }, europe: { x: 527.7, y: 748.5 } },
    teksti: 'Salona oli Rooman Dalmatian provinssin pääkaupunki ja keisari Diocletianuksen '
      + 'syntymäpaikka. Avaarit ja slaavit tuhosivat kaupungin 600-luvulla. Asukkaat '
      + 'pakenivat Diocletianuksen palatsiin, jonka ympärille Split kasvoi.',
    lahde: 'en-Wikipedia "Salona", johdanto ja tuho (tarkistettu 21.9.2026).',
    kuva: 'ihme-salona-porta-caesarea-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Salona',
  })],
  ROU: [kohde({
    id: 'coltea-torni', nimi: 'Colțea-torni',
    nappi: 'Bukarestin korkein kellotorni juuri ennen purkua',
    laudat: { maailmankartta: { x: 6703.5, y: 1625.1 }, europe: { x: 712.4, y: 725.0 } },
    teksti: 'Colțea-torni valmistui Bukarestiin vuonna 1714 ja oli 54-metrisenä kaupungin '
      + 'korkein rakennelma lähes 175 vuotta. Maanjäristykset vaurioittivat tornia, mutta '
      + 'se seisoi vuoteen 1888, jolloin se purettiin bulevardin tieltä.',
    lahde: 'en-Wikipedia "Colțea Tower", johdanto ja purku (tarkistettu 21.9.2026).',
    kuva: 'ihme-coltea-torni-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Col%C8%9Bea_Tower',
  })],
  SVK: [kohde({
    id: 'vydrica-zuckermandel', nimi: 'Vydrica–Zuckermandel',
    nappi: 'Bratislavan linnan ja Tonavan välinen rantakaupunginosa',
    laudat: { maailmankartta: { x: 6403.1, y: 1470.2 }, europe: { x: 539.4, y: 627.5 } },
    teksti: 'Vydrica ja Zuckermandel muodostivat 1300-luvulta lähtien Bratislavan linnanmäen '
      + 'ja Tonavan välisen kaupunginosan. Kommunistihallinto purki lähes koko alueen '
      + 'vuosina 1967–1974 Uuden sillan liikenneväylien tieltä.',
    lahde: 'sk-Wikipedia "Vydrica" ja "Zuckermandel" (tarkistettu 21.9.2026).',
    kuva: 'ihme-vydrica-zuckermandel-loistoaika.jpg', url: 'https://sk.wikipedia.org/wiki/Vydrica_(Bratislava)',
  })],
  LTU: [kohde({
    id: 'vilnan-alalinna', nimi: 'Vilnan alalinna',
    nappi: 'Liettuan suurruhtinaiden palatsi ennen tsaarin purkutöitä',
    laudat: { maailmankartta: { x: 6676.3, y: 1180.3 }, europe: { x: 696.7, y: 455.4 } },
    teksti: 'Vilnan alalinnan suurruhtinaiden palatsi oli Liettuan hallinnon keskus '
      + '1400-luvulta. Venäjän sota vaurioitti sitä pahoin 1655–1661, ja tsaarin '
      + 'viranomaiset purkivat rauniot 1801–1805. Nykyinen museopalatsi on uusi jäljennös.',
    lahde: 'en-Wikipedia "Palace of the Grand Dukes of Lithuania", historia (tarkistettu 21.9.2026).',
    kuva: 'ihme-vilnan-alalinna-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Palace_of_the_Grand_Dukes_of_Lithuania',
  })],
  LVA: [kohde({
    id: 'mustapaiden-talo', nimi: 'Riian Mustapäiden talo',
    nappi: 'Kauppiasveljeskunnan manneristinen juhlarakennus',
    laudat: { maailmankartta: { x: 6636.9, y: 1074.4 }, europe: { x: 674.1, y: 395.9 } },
    teksti: 'Mustapäiden talo oli Riian kauppiaiden kokoontumispaikka vuodesta 1334. '
      + 'Rakennus paloi tykistötulessa vuonna 1941, ja jäljelle jääneet rauniot räjäytettiin '
      + '1948. Nykyinen talo on vuosina 1996–1999 rakennettu jäljennös.',
    lahde: 'en-Wikipedia "House of the Blackheads (Riga)", historia (tarkistettu 21.9.2026).',
    kuva: 'ihme-mustapaiden-talo-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/House_of_the_Blackheads_(Riga)',
  })],
  EST: [kohde({
    id: 'narvan-vanhakaupunki', nimi: 'Narvan barokkinen vanhakaupunki',
    nappi: 'Narvan yhtenäinen barokkikaupunki 1700-luvun asussa',
    laudat: { maailmankartta: { x: 6773.0, y: 956.6 }, europe: { x: 752.4, y: 332.0 } },
    teksti: 'Narvan vanhakaupunki oli Pohjois-Euroopan parhaiten säilyneitä barokkikaupunkeja. '
      + 'Pommitukset tuhosivat sen maaliskuussa 1944, ja neuvostoviranomaiset purkivat '
      + 'jäljelle jääneet rauniot 1950-luvulla kerrostalojen tieltä.',
    lahde: 'en-Wikipedia "Narva", toinen maailmansota ja jälleenrakennus (tarkistettu 21.9.2026).',
    kuva: 'ihme-narvan-vanhakaupunki-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Narva',
  })],
  FIN: [kohde({
    id: 'turun-tuomiokirkon-vanha-torni', nimi: 'Turun tuomiokirkon vanha torni',
    nappi: 'Sipulikupolinen barokkitorni ennen Turun suurpaloa',
    laudat: { maailmankartta: { x: 6575.9, y: 903.1 }, europe: { x: 638.9, y: 303.7 } },
    teksti: 'Turun tuomiokirkon keskiaikainen torni sai barokkisen sipulikupolin '
      + '1600–1700-luvuilla. Turun suuri palo tuhosi huipun vuonna 1827. C. L. Engelin '
      + 'suunnittelema nykyinen korkeampi torni valmistui vuonna 1836.',
    lahde: 'fi-Wikipedia "Turun tuomiokirkko", tornin rakennushistoria (tarkistettu 21.9.2026).',
    kuva: 'ihme-turun-tuomiokirkon-vanha-torni-loistoaika.jpg', url: 'https://fi.wikipedia.org/wiki/Turun_tuomiokirkko',
  })],
  SWE: [
    kohde({
      id: 'tre-kronor', nimi: 'Tre Kronor',
      nappi: 'Ruotsin keskiaikainen kuninkaanlinna ennen vuoden 1697 paloa',
      laudat: { maailmankartta: { x: 6435.7, y: 959.1 }, europe: { x: 558.2, y: 333.3 } },
      teksti: 'Tre Kronor oli Tukholman keskiaikainen kuninkaanlinna ja Vaasa-suvun '
        + 'hallintokeskus. Tulipalo 7. toukokuuta 1697 tuhosi linnan lähes kokonaan sekä '
        + 'suuren osan varhaisesta kansallisarkistosta. Nykyinen kuninkaanlinna rakennettiin tilalle.',
      lahde: 'en-Wikipedia "Tre Kronor (castle)", johdanto ja palo (tarkistettu 21.9.2026).',
      kuva: 'ihme-tre-kronor-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Tre_Kronor_(castle)',
    }),
    kohde({
      id: 'klara-kloster', nimi: 'Klara kloster',
      nappi: 'Klarissaluostari ennen Kustaa Vaasan uskonpuhdistusta',
      laudat: { maailmankartta: { x: 6435.5, y: 958.9 }, europe: { x: 558.0, y: 333.2 } },
      teksti: 'Sankta Klaran klarissaluostari perustettiin Tukholmaan 1280-luvulla. '
        + 'Kustaa Vaasa määräsi sen purettavaksi vuonna 1527 uskonpuhdistuksen alkaessa, '
        + 'ja tiiliä käytettiin kaupungin puolustusrakenteisiin. Nykyinen kirkko on myöhempi.',
      lahde: 'sv-Wikipedia "Sankta Klara kloster" (tarkistettu 21.9.2026).',
      kuva: 'ihme-klara-kloster-loistoaika.jpg', url: 'https://sv.wikipedia.org/wiki/Sankta_Klara_kloster',
    }),
  ],
  IRL: [kohde({
    id: 'dublinin-keskiaikainen-linna', nimi: 'Dublinin keskiaikainen linna',
    nappi: 'Englannin vallan nelitorninen linnoitus ennen vuoden 1684 paloa',
    laudat: { maailmankartta: { x: 5624.4, y: 1241.7 }, europe: { x: 90.9, y: 490.7 } },
    teksti: 'Kuningas Juhana Maattoman käskystä rakennettu Dublinin linna valmistui '
      + '1200-luvulla ja oli Englannin vallan keskus Irlannissa. Huhtikuun 1684 tulipalo '
      + 'tuhosi suuren osan keskiaikaisista rakennuksista, jotka korvattiin georgiaanisilla.',
    lahde: 'en-Wikipedia "Dublin Castle", keskiaikainen linna ja vuoden 1684 palo (tarkistettu 21.9.2026).',
    kuva: 'ihme-dublinin-keskiaikainen-linna-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Dublin_Castle',
  })],
  DNK: [
    kohde({
      id: 'christiansborg', nimi: 'Toinen Christiansborg',
      nappi: 'Tanskan kuninkaanlinna ennen vuoden 1884 tulipaloa',
      laudat: { maailmankartta: { x: 6252.6, y: 1134.3 }, europe: { x: 452.7, y: 429.3 } },
      teksti: 'Ensimmäinen Christiansborg tuhoutui tulipalossa vuonna 1794. Toinen palatsi '
        + 'valmistui 1828 mutta paloi sekin 1884. Sen rauniot seisoivat 23 vuotta ennen '
        + 'nykyisen, kolmannen Christiansborgin rakennustöiden alkua.',
      lahde: 'en-Wikipedia "Christiansborg Palace", ensimmäinen ja toinen palatsi (tarkistettu 21.9.2026).',
      kuva: 'ihme-christiansborg-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Christiansborg_Palace',
    }),
    kohde({
      id: 'vesterport', nimi: 'Vesterport',
      nappi: 'Kööpenhaminan vilkkain kaupunginportti ennen purkua',
      laudat: { maailmankartta: { x: 6252.2, y: 1134.3 }, europe: { x: 452.4, y: 429.3 } },
      teksti: 'Vesterport oli Kööpenhaminan läntinen pääportti ja kaupungin vilkkain '
        + 'sisäänkäynti. Vuonna 1722 uudistettu portti purettiin 1857–1859, kun '
        + 'linnoituksia purettiin. Paikalla on nykyinen Rådhuspladsen.',
      lahde: 'da-Wikipedia "Vesterport" ja Kööpenhaminan linnoitushistoria (tarkistettu 21.9.2026).',
      kuva: 'ihme-vesterport-loistoaika.jpg', url: 'https://da.wikipedia.org/wiki/Vesterport',
    }),
  ],
  RUS: [kohde({
    id: 'valkokivinen-kreml', nimi: 'Moskovan valkokivinen Kreml',
    nappi: 'Dmitri Donskoin kalkkikivimuuri ennen tiililinnoitusta',
    laudat: { maailmankartta: { x: 7087.2, y: 1130.8 }, europe: { x: 933.4, y: 427.3 } },
    teksti: 'Dmitri Donskoi rakennutti Moskovan Kremlin vahvan valkokivimuurin vuosina '
      + '1366–1368. Ivan III puratti sen ja rakennutti italialaisten arkkitehtien johdolla '
      + 'nykyiset punatiilimuurit vuosina 1485–1495.',
    lahde: 'en-Wikipedia "Moscow Kremlin", valkokivinen Kreml (tarkistettu 21.9.2026).',
    kuva: 'ihme-valkokivinen-kreml-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Moscow_Kremlin',
  })],
  UKR: [kohde({
    id: 'kymmenyskirkko', nimi: 'Kiovan Kymmenyskirkko',
    nappi: 'Kiovan Venäjän ensimmäinen kivikirkko',
    laudat: { maailmankartta: { x: 6850.6, y: 1370.2 }, europe: { x: 797.1, y: 566.6 } },
    teksti: 'Vladimir Suuri rakennutti Kymmenyskirkon vuosina 989–996 Kiovan Venäjän '
      + 'ensimmäiseksi kivikirkoksi ja ruhtinaiden mausoleumiksi. Se romahti Batu-kaanin '
      + 'piirityksessä joulukuussa 1240, kun asukkaat pakenivat sinne turvaan.',
    lahde: 'en-Wikipedia "Church of the Tithes", johdanto ja vuoden 1240 tuho (tarkistettu 21.9.2026).',
    kuva: 'ihme-kymmenyskirkko-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Church_of_the_Tithes',
  })],
  CYP: [
    kohde({
      id: 'salamis', nimi: 'Antiikin Salamis',
      nappi: 'Kyproksen suurin roomalaiskaupunki ennen maanjäristyksiä',
      // Pieni läntinen asettelusiirto jättää Kyproksen keskiosan nimiöryppäälle vapaat kyljet.
      laudat: { maailmankartta: { x: 6962.4, y: 1988.4 }, europe: { x: 861.5, y: 968.2 } },
      teksti: 'Salamis oli antiikin Kyproksen suurin ja vaurain kaupunki. Maanjäristykset '
        + 'vuosina 332 ja 342 tasoittivat suuren osan kaupungista, ja arabien hyökkäykset '
        + '600-luvulla johtivat lopulliseen hylkäämiseen.',
      lahde: 'en-Wikipedia "Salamis, Cyprus", historia ja tuho (tarkistettu 21.9.2026).',
      kuva: 'ihme-salamis-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Salamis,_Cyprus',
    }),
    kohde({
      id: 'kition', nimi: 'Antiikin Kition',
      nappi: 'Foinikialainen satama ja Astarten pyhäkkökaupunki',
      laudat: { maailmankartta: { x: 6954.4, y: 1998.6 }, europe: { x: 857.0, y: 975.3 } },
      teksti: 'Kition oli foinikialainen satamakaupunki ja Astarte-jumalattaren '
        + 'palvontakeskus 800-luvulta eaa. Maanjäristykset 300-luvulla ja pitkä '
        + 'kivenryöstö hävittivät kaupungin lähes kokonaan nykyisen Larnakan alle.',
      lahde: 'en-Wikipedia "Kition", johdanto ja historia (tarkistettu 21.9.2026).',
      kuva: 'ihme-kition-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Kition',
    }),
  ],
  MLT: [kohde({
    id: 'mdinan-vanha-katedraali', nimi: 'Mdinan vanha normannikatedraali',
    nappi: 'Keskiaikainen katedraali ennen vuoden 1693 maanjäristystä',
    laudat: { maailmankartta: { x: 6313.4, y: 1961.8 }, europe: { x: 487.7, y: 949.8 } },
    teksti: 'Mdinan normanniaikainen katedraali rakennettiin 1200-luvulla. Sisilian '
      + 'maanjäristys vaurioitti sitä pahoin vuonna 1693, minkä jälkeen se purettiin ja '
      + 'korvattiin vuosina 1696–1705 nykyisellä barokkikatedraalilla.',
    lahde: 'en-Wikipedia "St. Paul’s Cathedral, Mdina", vanha katedraali (tarkistettu 21.9.2026).',
    kuva: 'ihme-mdinan-vanha-katedraali-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/St._Paul%27s_Cathedral,_Mdina',
  })],
  BIH: [kohde({
    id: 'mile-kruunajaiskirkko', nimi: 'Milen kruunajaiskirkko',
    nappi: 'Bosnian kuninkaiden kruunajais- ja hautauskirkko',
    // Pieni eteläinen asettelusiirto jättää Visokon ympäristön vanhoille nimiöille vapaat kyljet.
    laudat: { maailmankartta: { x: 6437.3, y: 1643.1 }, europe: { x: 559.1, y: 736.6 } },
    teksti: 'Milen kirkko Arnautovićissa rakennettiin 1300-luvulla Bosnian kuninkaiden '
      + 'kruunajais- ja hautauskirkoksi. Tvrtko I kruunattiin siellä ensimmäiseksi Bosnian '
      + 'kuninkaaksi vuonna 1377. Kirkko raunioitui valtakunnan kukistumisen jälkeen.',
    lahde: 'en-Wikipedia "Mile, Visoko" ja Bosnian kansallismonumenttien komissio (tarkistettu 21.9.2026).',
    kuva: 'ihme-mile-kruunajaiskirkko-loistoaika.jpg', url: 'https://en.wikipedia.org/wiki/Mile,_Visoko',
  })],
};
