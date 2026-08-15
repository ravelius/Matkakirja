// Matkakirjan valokuvakortit (SOUTHAMERICA_VALOKUVAT).
//
// Sama rakenne kuin EUROPE_VALOKUVAT ja AFRICA_VALOKUVAT: vanha vedos
// isoisän ajoilta, päiväkirjan mainitsemat näkymät (lisat) ja sama
// paikka nykyään. Kuvat haetaan Commonsista sitä mukaa kuin pelaaja ne
// näkee, ja palvelutyöntekijä tallentaa kerran nähdyn omaan koriinsa.
//
// Kuvat on etsitty kaupungin päiväkirjamerkinnän pohjalta ja jokainen
// tiedosto tarkistettu Commonsista ennen kirjoittamista: olemassaolo,
// vähintään 1200 pikseliä, vapaa lisenssi ilman ND-ehtoa, ja vanhaksi
// merkityn kuvan ikä.
//
// Tuotettu komennolla tools/kirjoita-kuvakortit.mjs. Älä muokkaa
// pistelistoja käsin — korjaa lähde ja aja uudelleen.
export const SOUTHAMERICA_VALOKUVAT = {
  antofagasta: {
    tiedosto: 'Una calle de Antofagasta (1912).jpg',
    vuosi: '1912',
    lahde: 'Nevin O. Winter, Commons (PD)',
    selite: 'Katu Antofagastassa vuonna 1912, kuvattuna yhdysvaltalaisen Nevin O. '
      + 'Winterin Chile-kirjaan. Kaupunki eli tuolloin salpietarista: '
      + 'sisämaan Atacamasta tuotu lasti kulki rautateitse rannalle ja sieltä '
      + 'laivoihin.',
    lisat: [
      {
        tiedosto: '“Caleta de Pescadores” in Antofagasta (pzidar paranal lv-2).jpg',
        vuosi: '2011',
        lahde: 'P. Zidar/ESO, Commons (CC BY 4.0)',
        selite: 'Kalastusveneitä Caleta de Pescadores -poukamassa. Antofagasta on '
          + 'venynyt parinkymmenen kilometrin nauhaksi Tyynenmeren ja '
          + 'rannikkovuoriston väliin, joten satamille on jäänyt vain kapeita '
          + 'lahdenpohjukoita.',
      },
      {
        tiedosto: 'Antofagasta - Terminal Pesquero (5203547755).jpg',
        vuosi: '2010',
        lahde: 'Antofagastan kaupunki, Commons (CC BY 2.0)',
        selite: 'Kaupungin kalaterminaali, jossa päivän saalis myydään. Rannikko '
          + 'on autiomaata, mutta Humboldtin virta nostaa pinnalle kylmää ja '
          + 'ravinteikasta vettä, ja siksi kalaa riittää.',
      },
      {
        tiedosto: 'Vista desde el Monumento Natural La Portada, Antofagasta.jpg',
        vuosi: '2018',
        lahde: 'Nicolás Valdés Ortega, Commons (CC BY-SA 4.0)',
        selite: 'Näkymä La Portadan luonnonmuistomerkiltä pohjoiseen kohti Juan '
          + 'Lópezin rantaa, taustalla Morro Morenon massiivi. Kuva on otettu '
          + 'illansuussa, jolloin rannikon värit erottuvat voimakkaimpina.',
      },
    ],
    uusi: {
      tiedosto: 'A main street in Antofagasta (pzidar paranal lv-1).jpg',
      vuosi: '2011',
      lahde: 'P. Zidar/ESO, Commons (CC BY 4.0)',
      selite: 'Yksi Antofagastan pääkaduista nykyään. Salpietarin tilalle tuli '
        + 'kupari: kaupunki on Chilen kaivosteollisuuden keskus ja '
        + 'väkiluvultaan maan viidenneksi suurin.',
    },
  },
  asuncion: {
    tiedosto: 'Movimiento insurgente paraguayo, Asunción (1912).jpg',
    vuosi: '1912',
    lahde: 'Imagoteca Paraguaya (Milda Rivarola), Commons (CC BY 4.0)',
    selite: 'Aseistettuja miehiä vetämässä kärryä pitkin Asunciónin kivetöntä '
      + 'katua kartanon aidan vierestä. Kuva on Paraguayn sisällissodan '
      + 'ajalta 1911–1912, jolloin valta vaihtui pääkaupungissa useaan '
      + 'kertaan parissa vuodessa.',
    lisat: [
      {
        tiedosto: '"Mercado 4" Asunción, (Paraguay).jpg',
        vuosi: '2023',
        lahde: 'David Ramalleira, Commons (CC BY 2.0)',
        selite: 'Mercado 4 eli Nelostori. Kojut ovat levinneet useiden korttelien '
          + 'alueelle katujen päälle, ja siellä myydään kaikkea vihanneksista '
          + 'vaatteisiin. Se on Asunciónin suurin tori ja kaupungin arjen '
          + 'keskus.',
      },
      {
        tiedosto: 'Tereré - infusión 2.jpg',
        vuosi: '2018',
        lahde: 'TitiNicola, Commons (CC BY-SA 4.0)',
        selite: 'Tereré eli kylmä mate. Yrttijauhe pannaan sarvi- tai puukuppiin '
          + 'ja päälle kaadetaan jääkylmää vettä termospullosta. Paraguayssa '
          + 'juoma kuuluu päivään ympäri vuoden, ja kuumuudessa se juodaan '
          + 'nimenomaan kylmänä.',
      },
      {
        tiedosto: 'National Pantheon of the Heroes, Asunción, Paraguay.jpg',
        vuosi: '2012',
        lahde: 'CivArmy, Commons (CC BY-SA 4.0)',
        selite: 'Sankarien kansallinen panteoni Palman ja Chilen katujen kulmassa '
          + 'aivan keskustassa. Kupolirakennus on samalla kirkko ja koko maan '
          + 'mausoleumi: sen sisällä lepäävät Paraguayn historian '
          + 'merkkihenkilöt.',
      },
    ],
    uusi: {
      tiedosto: 'Gran Palacio Nacional de Paraguay.jpg',
      lahde: 'FF MM, Commons (CC BY-SA 4.0)',
      selite: 'López-palatsi Asunciónin vanhassa keskustassa. Se rakennettiin '
        + '1800-luvun puolivälissä maata hallinneen López-suvun asunnoksi ja '
        + 'on nykyään presidentin työpaikka ja hallituksen istuinpaikka.',
    },
  },
  bananal: {
    tiedosto: 'A thousand miles in a dug-out; being the narrative of a journey of investigation among the red-skin Indians of Central Brazil (1911) (14798735293).jpg',
    vuosi: '1911',
    lahde: 'Frederick Charles Glass, Internet Archive Book Images (ei tunnettuja tekijänoikeusrajoituksia)',
    selite: 'Karajá-ryhmä leveällä hiekkasärkällä Araguaia-joen rannassa. '
      + 'Kuva on lähetystyöntekijä Frederick Charles Glassin kirjasta, joka '
      + 'kertoo tuhannen mailin venematkasta jokea ylös vuonna 1911. '
      + 'Kuivalla kaudella särkät ovat niin leveitä, että niillä mahtuu '
      + 'asumaan.',
    lisat: [
      {
        tiedosto: 'Rio Javaés.jpg',
        vuosi: '2012',
        lahde: 'Arthur to, Commons (public domain)',
        selite: 'Javaés-joki Txuirin kylän kohdalla Formoso do Araguaian '
          + 'kunnassa. Javaés on Araguaian sivuhaara: se erkanee päähaarasta '
          + 'ja yhtyy siihen taas satojen kilometrien päässä, ja väliin jäävä '
          + 'maa on Bananalin saari.',
      },
      {
        tiedosto: 'Praias de Transição dos 03 Biomas - Ecótono.JPG',
        vuosi: '2012',
        lahde: 'Leonardo Azevedo, Commons (CC BY-SA 3.0)',
        selite: 'Matalan veden aika Cantãon osavaltiopuistossa Bananalin saaren '
          + 'tuntumassa. Kuvaajan mukaan tässä kohtaa vaihettuvat kolme '
          + 'luonnonaluetta: cerrado-savanni, tulvamaa ja sademetsä. '
          + 'Rantahiekka on veden alla puolet vuodesta.',
      },
      {
        tiedosto: 'Marsh Deer.JPG',
        vuosi: '2010',
        lahde: 'araguaia.org, Commons (CC BY 3.0)',
        selite: 'Suokauris laiduntaa vesilintujen seassa Cantãon '
          + 'osavaltiopuistossa. Se on Etelä-Amerikan suurin hirvieläin ja '
          + 'elää nimenomaan tulvamailla, jollaisia Araguaia täyttää joka '
          + 'sadekaudella.',
      },
    ],
    uusi: {
      tiedosto: 'Rio Javaés 03.jpg',
      lahde: 'Iza Guedes, Commons (CC BY-SA 3.0)',
      selite: 'Auringonlasku Javaés-joen yllä. Sama vesireitti erottaa Bananalin '
        + 'saaren mantereesta. Saaren kylien välillä liikutaan pääosin '
        + 'venein, ja joki on samalla tie ja kalavesi.',
    },
  },
  boavista: {
    lisat: [
      {
        tiedosto: 'Orla de Boa Vista-RR.jpg',
        vuosi: '2021',
        lahde: 'Andrezza Mariot, Commons (CC BY-SA 4.0)',
        selite: 'Boa Vistan jokiranta Rio Brancon varrella. Rantakansi on '
          + 'rakennettu pilareiden varaan veden ylle, sillä joen pinta nousee '
          + 'ja laskee sadekausien mukaan; kuivaan aikaan rantaan paljastuu '
          + 'leveitä hiekkasärkkiä.',
      },
      {
        tiedosto: 'Pintolandia Shelter, 8 March 2017 - Boa Vista, Brazil (01).jpg',
        vuosi: '2017',
        lahde: 'Migration Brazil, Commons (CC BY 4.0)',
        selite: 'Pintolândian vastaanottokeskus Boa Vistassa maaliskuussa 2017. '
          + 'Venezuelasta Brasiliaan johtava maantie kulkee Roraiman läpi, ja '
          + 'Boa Vista on ensimmäinen suuri kaupunki rajan jälkeen — sinne on '
          + 'tullut vuosien mittaan suuri määrä lähtijöitä.',
      },
      {
        tiedosto: 'EDERSON BRITO IGARAPE AGUA BOA BOA VISTA RR (39266636780).jpg',
        vuosi: '2018',
        lahde: 'Ederson Brito / MTur Destinos, Commons (PD)',
        selite: 'Igarapé Água Boa Boa Vistan liepeillä. Roraiman pääkaupunkia ei '
          + 'ympäröi sademetsä vaan lavrado, avoin savanni, ja puut kasvavat '
          + 'lähinnä purojen varsilla. Sillan kupeeseen on syntynyt '
          + 'uimapaikka.',
      },
    ],
    uusi: {
      tiedosto: 'Boa Vista Roraima Brazil.jpg',
      vuosi: '2018',
      lahde: 'Ederson Brito / MTur Destinos, Commons (CC0)',
      selite: 'Boa Vistan keskusta ilmasta. Kadut lähtevät viuhkana Centro '
        + 'Cívicon aukiolta: keskusta kaavoitettiin 1940-luvulla '
        + 'säteittäiseksi, ja siksi se muistuttaa ylhäältä auringonkehrää.',
    },
  },
  bogota: {
    tiedosto: 'Calle Real - Bogota.jpg',
    vuosi: '1886',
    lahde: 'Julio Racines, Gallica / Commons (PD)',
    selite: 'Calle Real eli nykyinen Carrera Séptima. Kadun päässä kohoaa San '
      + 'Franciscon kirkon torni, ja kulkijat näkyvät haamuina, koska '
      + 'valotusaika oli pitkä. Katu oli kaupungin pääväylä jo '
      + 'espanjalaisajalla.',
    lisat: [
      {
        tiedosto: 'Market in Bogotá.jpg',
        vuosi: '2022',
        lahde: 'Mussi Katz, Commons (CC0)',
        selite: 'Paloquemaon torihalli. Kolumbian hedelmät kasvavat hyvin eri '
          + 'korkeuksilla, kylmästä ylätasangosta kuumiin laaksoihin, ja ne '
          + 'kohtaavat vasta täällä samoilla tiskeillä.',
      },
      {
        tiedosto: '2019 Bogotá - Ciclovía en la calle 26.jpg',
        vuosi: '2019',
        lahde: 'Felipe Restrepo Acosta, Commons (CC BY-SA 4.0)',
        selite: 'Ciclovía Calle 26:lla. Sunnuntaisin ja pyhäpäivinä osa '
          + 'pääkaduista suljetaan autoilta ja annetaan pyöräilijöille ja '
          + 'kävelijöille. Tapa alkoi Bogotássa 1970-luvulla ja on sittemmin '
          + 'kopioitu moneen muuhun kaupunkiin.',
      },
      {
        tiedosto: 'Bogotá Monserrate desde La Candelaria.JPG',
        vuosi: '2013',
        lahde: 'Felipe Restrepo Acosta, Commons (CC BY-SA 3.0)',
        selite: 'Monserraten kirkko kohoaa La Candelarian tiilikattojen yllä. '
          + 'Vuorelle noustaan funikulaarilla tai köysiradalla, ja se on '
          + 'ollut pyhiinvaelluskohde vuosisatoja. Bogotá on itsekin jo 2 600 '
          + 'metrissä, joten huipulle jää nousua noin puoli kilometriä.',
      },
    ],
    uusi: {
      tiedosto: 'Peatonalización de Carrera Séptima cerca Avenida Jimenez.jpg',
      lahde: 'Peter Angritt, Commons (CC BY-SA 4.0)',
      selite: 'Sama katu nykyään: Carrera Séptimaa muutetaan kävelykaduksi '
        + 'Avenida Jiménezin kohdalla. Taustalla näkyy yhä San Franciscon '
        + 'kirkon torni, sama kuin vuoden 1886 kuvassa. Työmiehet latovat '
        + 'laattoja entiselle ajoradalle.',
    },
  },
  buenosaires: {
    tiedosto: 'Buenos Aires. Plaza Victoria l LCCN2017656795.jpg',
    vuosi: '1890',
    lahde: 'Photoglob Co., Library of Congress (PD)',
    selite: 'Plaza Victoria eli nykyinen Plaza de Mayo käsinväritettynä '
      + 'photochrom-vedoksena: suihkulähde ja ratsastajapatsas paikoillaan, '
      + 'aukion laidalla vielä matalia kaarikäytäväisiä taloja. Vedokset '
      + 'painettiin Sveitsissä ja myytiin matkailijoille muistoksi.',
    lisat: [
      {
        tiedosto: 'Feria de San Telmo, Buenos Aires.jpg',
        vuosi: '2005',
        lahde: 'Alexandre Campolina, Commons (CC BY 3.0)',
        selite: 'Sunnuntaitori San Telmon mukulakivikadulla; valkoisissa '
          + 'teltoissa myydään vanhoja käyttöesineitä ja huonekaluja. San '
          + 'Telmo oli 1800-luvulla varakkaiden kortteli, kunnes keltakuume '
          + 'ajoi heidät pohjoisemmas ja vanhat talot jäivät '
          + 'siirtolaisperheille.',
      },
      {
        tiedosto: 'San Telmo Plaza Dorrego.JPG',
        vuosi: '2008',
        lahde: 'Helge Høifødt, Commons (CC BY-SA 3.0)',
        selite: 'Tangoa Plaza Dorregolla sunnuntai-iltapäivänä. Sama aukio on San '
          + 'Telmon torin keskus, ja tanssijat ottavat sen käyttöönsä kojujen '
          + 'välissä. Tango syntyi 1800-luvun lopun Buenos Airesissa '
          + 'satamakortteleiden ja siirtolaisten musiikkina.',
      },
      {
        tiedosto: '2018-10-19 La Boca, Buenos Aires, Argentina (Martin Rulsch) 10.jpg',
        vuosi: '2018',
        lahde: 'DerHexer, Commons (CC BY-SA 4.0)',
        selite: 'Caminito La Bocan kaupunginosassa. Talojen seinät on maalattu '
          + 'isoina värikenttinä, ja kujalla myydään taidetta ja '
          + 'matkamuistoja. La Boca kasvoi Riachuelo-joen suulle satamatyön '
          + 'ympärille, ja suuri osa sen asukkaista tuli aikoinaan Genovasta.',
      },
    ],
    uusi: {
      tiedosto: 'Plaza de Mayo panorama.jpg',
      lahde: 'The Cosmonaut, Commons (CC BY-SA 2.5)',
      selite: 'Sama aukio nykyään, kuvattuna vastakkaisesta suunnasta. Perällä on '
        + 'Casa Rosada eli presidentin virastotalo, ja vasemmalla seisoo '
        + 'ratsastajapatsas kuten vanhassakin vedoksessa. Plaza de Mayo on '
        + 'Argentiinan tärkein mielenosoitusten ja juhlien paikka.',
    },
  },
  campogrande: {
    tiedosto: 'Inauguração da base de Mato Grosso com a presença do ministro da Aeronáutica, em Campo Grande..tif',
    vuosi: '1945',
    lahde: 'Arquivo Nacional (Brasilia), Commons (PD)',
    selite: 'Campo Granden lentotukikohdan vihkiäiset 19. huhtikuuta 1945. '
      + 'Nurmikentälle on aseteltu riviin kymmenkunta konetta, kaksitasoja '
      + 'ja yksitasoja sekaisin, ja niiden takana seisoo sotilasosasto '
      + 'ruoduissa. Katselijat jäävät pieniksi hahmoiksi kentän laidalle.',
    lisat: [
      {
        tiedosto: 'Feira Central de Campo Grande, dezembro de 2022 (1).jpg',
        vuosi: '2022',
        lahde: 'Fronteira, Commons (CC BY-SA 4.0)',
        selite: 'Feira Central joulukuisena iltana. Kojukäytävän yllä on '
          + 'kangaskatos ja valoketjut, myyntipöydillä taimia ja ruokaa, ja '
          + 'tolpassa iso punainen joulurusetti. Tori on auki myöhään iltaan, '
          + 'ja monet tulevat sinne nimenomaan syömään.',
      },
      {
        tiedosto: 'Sobá.jpg',
        vuosi: '2018',
        lahde: 'Flávio André / MTur Destinos, Commons (CC BY 2.0)',
        selite: 'Kolme kulhoa sobáa: nuudeliliemi, jossa on paahdettua '
          + 'naudanlihaa, suikaloitua munakasta ja vihreää sipulia. Ruoka '
          + 'tuli Campo Grandeen Okinawalta muuttaneiden siirtolaisten mukana '
          + 'ja on nykyään kaupungin tunnetuin annos.',
      },
      {
        tiedosto: 'Estação Ferroviária de Campo Grande.jpg',
        vuosi: '2018',
        lahde: 'Flávio André / MTur Destinos, Commons (CC BY 2.0)',
        selite: 'Rautatieaseman laituri iltahämärissä. Kyltissä lukee vaihtoasema '
          + 'Ponta Porãn haaralle. Rata teki Campo Grandesta solmukohdan '
          + '1910-luvulla, mutta matkustajaliikenne on loppunut ja kiskojen '
          + 'väli on kasvanut ruohoa.',
      },
    ],
    uusi: {
      tiedosto: 'VA Avenida Afonso Pena.jpg',
      lahde: 'Flávio André / MTur Destinos, Commons (CC BY 2.0)',
      selite: 'Avenida Afonso Pena halkoo kaupungin ilmasta katsottuna. Puurivin '
        + 'jakama keskikaista on poikkeuksellisen leveä, ja kaupunki on '
        + 'kasvanut sen molemmin puolin tornitaloiksi tasaisella tasangolla, '
        + 'jossa mikään maastonmuoto ei rajoita levittäytymistä.',
    },
  },
  caphorn: {
    lisat: [
      {
        tiedosto: '00 2082 Cape Horn - Chile.jpg',
        vuosi: '2005',
        lahde: 'W. Bulach, Commons (CC BY-SA 4.0)',
        selite: 'Kap Horn, Etelä-Amerikan eteläisin kärki. Varsinainen niemi on '
          + '424 metriä korkea basalttikallio, ja noin 240 metrin korkeudella '
          + 'olevalla tasanteella on majakka asuinrakennuksineen, kappeli ja '
          + 'teräslevyistä koottu muistomerkki.',
      },
      {
        tiedosto: 'Horn albatros.JPG',
        vuosi: '2006',
        lahde: 'Rémi Jouan, Commons (CC BY-SA 3.0)',
        selite: 'Kap Hornin muistomerkki, joka on omistettu kapinkiertäjille eli '
          + 'caphornier-merimiehille. Teräslevyistä leikattu muoto esittää '
          + 'albatrossia, ja se on pystytetty niiden muistoksi, jotka jäivät '
          + 'näille vesille.',
      },
      {
        tiedosto: 'Cape Horn, Chile (6315052275).jpg',
        vuosi: '2011',
        lahde: 'Liam Quinn, Commons (CC BY-SA 2.0)',
        selite: 'Mustakulmaalbatrossi liitämässä Kap Hornin edustalla. Laji '
          + 'viettää suurimman osan elämästään avomerellä ja tulee maalle '
          + 'vain pesimään; merimiehet ovat pitäneet sitä näiden vesien '
          + 'tunnusmerkkinä.',
      },
    ],
    uusi: {
      tiedosto: 'Cape Horn (js) 1.jpg',
      vuosi: '2000',
      lahde: 'Jerzy Strzelecki, Commons (CC BY 3.0)',
      selite: 'Kap Horn mereltä nähtynä. Niemi ei ole mantereella vaan Hornoksen '
        + 'saarella, joka kuuluu Wollastonin saariryhmään; kalliolla on '
        + 'Chilen laivaston miehittämä majakka.',
    },
  },
  caracas: {
    tiedosto: 'Panoramic view of Caracas, Venezuela 1900 restored version.jpg',
    vuosi: 'noin 1900',
    lahde: 'Library of Congress, Commons (CC0)',
    selite: 'Caracas El Calvarion kukkulalta kuvattuna. Oikealla on Lourdesin '
      + 'Neitsyen kappeli, alhaalla matalia tiilikattoisia kortteleita ja '
      + 'takana Ávila-vuori, joka erottaa kaupungin merestä. Kaupunki mahtui '
      + 'tuolloin kokonaan laakson pohjalle.',
    lisat: [
      {
        tiedosto: 'Caracas Metro 1.jpg',
        vuosi: '2013',
        lahde: 'Wilfredor, Commons (CC0)',
        selite: 'Plaza Venezuelan metroasema ruuhka-aikaan. Kyltti opastaa '
          + 'linjalle 3 ja suuntaan El Valle. Metro avattiin 1983, ja se '
          + 'kulkee laakson suunnassa kuten kaupunkikin: kapea laakso '
          + 'pakottaa liikenteen yhteen putkeen.',
      },
      {
        tiedosto: 'Teleferico waraira repano caracas.JPG',
        vuosi: '2007',
        lahde: 'Adryan Amaya, Commons (CC BY-SA 3.0)',
        selite: 'Köysirata nousee kaupungin yläpuolelle Waraira Repanon eli '
          + 'Ávilan kansallispuistoon. Vuorenrinne on jätetty rakentamatta, '
          + 'ja huipulla on selvästi viileämpää kuin laaksossa parin '
          + 'kilometrin päässä alempana.',
      },
      {
        tiedosto: 'Plaza Bolivar de Caracas en la celebracion del Bicentenario.JPG',
        vuosi: '2011',
        lahde: 'Javiermartinez76, Commons (CC BY-SA 3.0)',
        selite: 'Plaza Bolívar itsenäisyyden 200-vuotisjuhlan aikaan. Aukio on '
          + 'kaupungin alkuperäisen ruutukaavan keskiruutu vuodelta 1567, ja '
          + 'sen laidoilla ovat katedraali, arkkipiispan palatsi ja '
          + 'kaupungintalo.',
      },
    ],
    uusi: {
      tiedosto: 'Caracas, Venezuela (10707698243).jpg',
      lahde: 'Fernando Flores, Commons (CC BY-SA 2.0)',
      selite: 'Caracas nykyään. Laakso on täyttynyt reunoja myöten ja asutus '
        + 'noussut ympäröiville rinteille. Kaupunki on noin 900 metrin '
        + 'korkeudessa, mikä pitää lämpötilan tasaisena ympäri vuoden vaikka '
        + 'päiväntasaaja on lähellä.',
    },
  },
  cayenne: {
    tiedosto: 'Gezicht op een plein in Cayenne, Frans Guyana Public Square, Cayenne (titel op object), RP-F-2001-7-959-2.jpg',
    vuosi: '1880-luvun loppu',
    lahde: 'W. B. Tyler / Rijksmuseum, Commons (CC0)',
    selite: 'Aukio Cayennessa 1880-luvun lopulla: palmurivi, matalia '
      + 'puutaloja ja yksinäinen kulkija. Painolaatta on kirjasta, jossa '
      + 'Lick-observatorion tutkijat raportoivat joulukuun 1889 '
      + 'auringonpimennyksestä — sitä varten retkikunta matkusti '
      + 'Kaliforniasta Guayanaan.',
    lisat: [
      {
        tiedosto: 'French Guiana Cayenne place du Coq magasin.jpg',
        vuosi: '2013',
        lahde: 'Cayambe, Commons (CC BY-SA 3.0 lu)',
        selite: 'Kauppa Place du Coq\'n laidalla Cayennessa. Ranskan Guayana ei '
          + 'ole siirtomaa vaan Ranskan departementti ja osa Euroopan '
          + 'unionia, joten kaupassa maksetaan euroilla.',
      },
      {
        tiedosto: 'Cayenne, Französisch Guyana (11844039733).jpg',
        vuosi: '2014',
        lahde: 'M M, Commons (CC BY-SA 2.0)',
        selite: 'Papaijoita myytävänä Cayennessa. Kaupungin nimi on kulkeutunut '
          + 'ympäri maailmaa cayennepippurin mukana, vaikka torilla myydään '
          + 'ennen muuta trooppisia hedelmiä.',
      },
      {
        tiedosto: 'Cayenne - Site pénitencier - Depot 003.jpg',
        vuosi: '2018',
        lahde: 'Ayshka Sene, Sophie Fuggle & Claire Reddleman, Commons (CC BY 4.0)',
        selite: 'Entisen rangaistussiirtolan varikkoalue keskellä Cayennea, aidan '
          + 'ja piikkilangan takana. Ranska kuljetti tuomittuja Guayanaan '
          + '1850-luvulta 1930-luvulle, ja leirien rakennuksia seisoo yhä '
          + 'tavallisten katujen varsilla.',
      },
    ],
    uusi: {
      tiedosto: 'Cayenne place des palmistes 2013.jpg',
      vuosi: '2013',
      lahde: 'Cayambe, Commons (CC BY-SA 3.0)',
      selite: 'Place des Palmistes eli palmuaukio Cayennen keskustassa. Nimi '
        + 'tulee aukion korkeista kuninkaanpalmuista; taustalla kulkee Avenue '
        + 'du Général-de-Gaulle.',
    },
  },
  falkland: {
    tiedosto: 'Falklander-1936.jpg',
    vuosi: 'noin 1936',
    lahde: 'Tuntematon kuvaaja, Commons (PD)',
    selite: 'Falklandilainen W. E. Spencer ratsailla noin vuonna 1936. Saarten '
      + 'elinkeino oli tuolloin lammastalous, ja tiettömillä laidunmailla '
      + 'pitkät matkat taitettiin hevosen selässä.',
    lisat: [
      {
        tiedosto: 'Houses possibly painted when paint ship capsized starting tradition of colorful roofs Stanley Falkland Islands.jpg',
        vuosi: '2019',
        lahde: 'amanderson2, Commons (CC BY 2.0)',
        selite: 'Stanleyn asuintaloja, joiden peltikatot on maalattu kirkkain '
          + 'värein. Värikkäät katot ovat pikkukaupungin tunnetuin piirre, ja '
          + 'niiden alkuperästä kerrotaan saarilla useampikin selitys.',
      },
      {
        tiedosto: 'Fish and chips IMG 3689a Stanley.jpg',
        vuosi: '2014',
        lahde: 'Christof46, Commons (CC BY-SA 4.0)',
        selite: 'Fish and chips stanleylaisessa pubissa. Falklandinsaaret ovat '
          + 'Britannian merentakainen alue, ja brittiläinen arki näkyy '
          + 'saarilla ruoasta pubeihin ja vasemmanpuoleiseen liikenteeseen.',
      },
      {
        tiedosto: 'Stanley (Falkland Islands) - Wrack der Jhelum.jpg',
        vuosi: '2010',
        lahde: 'HaSt, Commons (CC BY-SA 4.0)',
        selite: 'Jhelum-purjelaivan hylky Stanleyn rannassa. Alus jäi satamaan '
          + '1870-luvulla eikä siitä enää lähtenyt; Stanley oli '
          + 'purjelaivakaudella paikka, jonne Kap Hornin myrskyissä '
          + 'vaurioituneet laivat hinattiin korjattaviksi.',
      },
    ],
    uusi: {
      tiedosto: 'Stanley waterfront.jpg',
      vuosi: '2014',
      lahde: 'CHK46, Commons (CC BY-SA 4.0)',
      selite: 'Stanleyn rantatie nykyään. Kaupungissa asuu selvä enemmistö '
        + 'saarten väestä, ja se on ainoa paikka Falklandinsaarilla, jota voi '
        + 'kutsua kaupungiksi.',
    },
  },
  galapagos: {
    tiedosto: 'Preparing for the trail LCCN99472325.jpg',
    vuosi: '1903',
    lahde: 'R. H. Beck, Library of Congress (PD)',
    selite: 'Keräysretkikunnan miehiä työssä Galápagossaarilla vuonna 1903: '
      + 'maassa on jättiläiskilpikonnien kilpiä, ja näytteitä valmistellaan '
      + 'kuljetusta varten. Retkikunnat keräsivät saarilta eläinnäytteitä '
      + 'museoiden kokoelmiin.',
    lisat: [
      {
        tiedosto: 'PtoAyoraMercado.jpg',
        vuosi: '2018',
        lahde: 'Torbenbrinker, Commons (CC BY-SA 4.0)',
        selite: 'Puerto Ayoran tori Santa Cruzin saarella. Kaali, banaani, sipuli '
          + 'ja munat myydään muovilaareista ja pahvilaatikoista. Osa '
          + 'tuotteista kasvatetaan saaren kosteammalla ylängöllä, osa '
          + 'tuodaan laivalla mantereelta.',
      },
      {
        tiedosto: '(Zalophus wollebaeki) main water taxi dock at Puerto Ayora, three Galápagos Sea Lions.JPG',
        vuosi: '2015',
        lahde: 'David Adam Kess, Commons (CC BY-SA 4.0)',
        selite: 'Kolme galápagosinmerileijonaa makaa Puerto Ayoran '
          + 'vesitaksilaiturilla. Laituri on saaren vilkkain kohta, mutta '
          + 'eläimet eivät väisty: saarten lajit ovat suojeltuja eivätkä ole '
          + 'oppineet pelkäämään ihmistä.',
      },
      {
        tiedosto: 'Piquero patiazul (Sula nebouxii), isla Lobos, islas Galápagos, Ecuador, 2015-07-25, DD 42.JPG',
        vuosi: '2015',
        lahde: 'Diego Delso, Commons (CC BY-SA 4.0)',
        selite: 'Sinijalkasuulapari kosiomenoissa Lobosin saarella. Koiras '
          + 'nostelee jalkojaan vuoron perään naaraan edessä. Jalkojen '
          + 'sinisen sävy vaihtelee ravinnon mukaan, ja tutkijoiden mukaan se '
          + 'kertoo linnun kunnosta.',
      },
    ],
    uusi: {
      tiedosto: 'Bartholomew - Beautiful Galapagos (35570836620).jpg',
      lahde: 'Derek Keats from Johannesburg, South Africa, Wikimedia Commons (CC BY 2.0)',
      selite: 'Näkymä Bartolomén saaren huipulta: terävä Pinnacle Rock -kallio '
        + 'nousee merestä, ja kapea hiekkakannas erottaa kaksi lahtea '
        + 'toisistaan. Taustalla kohoaa karuja tulivuorenkartioita.',
    },
  },
  iguazu: {
    tiedosto: 'Salto Floriano e Garganta do Inferno, na fronteira Brasil-Argentina.jpg',
    vuosi: '1929–1930',
    lahde: 'B. Rondon, Arquivo Nacional (PD)',
    selite: 'Salto Florianon putoukset ja Garganta do Inferno panoraamavedoksena. '
      + 'Kuva on Brasilian sotaministeriön rajakomission aineistoa: putouksia '
      + 'mitattiin ja kuvattiin, koska ne merkitsevät valtakunnanrajaa '
      + 'Brasilian ja Argentiinan välillä.',
    lisat: [
      {
        tiedosto: 'IGUACU FALLS AND CATWALK, BRAZIL.jpg',
        vuosi: '2009',
        lahde: 'Jerrye & Roy Klotz MD, Commons (CC BY-SA 3.0)',
        selite: 'Kävelysilta vie keskelle putousryhmää kohti Paholaisen kurkkua. '
          + 'Sillalla on jatkuva vesisumu, joka kastelee kulkijat ja kamerat '
          + 'muutamassa minuutissa.',
      },
      {
        tiedosto: 'Parque Nacional do Iguaçú - Iguaçu National Park - Quati - South American Coati (ring-tailed coati - Nasua nasua) (14116265571).jpg',
        vuosi: '2013',
        lahde: 'Deni Williams, Commons (CC BY 2.0)',
        selite: 'Nenäkarhu eli quati kansallispuiston polulla. Laji on tottunut '
          + 'kävijöihin ja etsii ruokaa roskiksista ja repuista, minkä vuoksi '
          + 'puistossa varoitetaan ruokkimasta niitä.',
      },
      {
        tiedosto: 'Boat tour Foz de Iguaçu 64 Nov 2005.jpg',
        vuosi: '2005',
        lahde: 'Mario Roberto Durán Ortiz, Commons (CC BY-SA 4.0)',
        selite: 'Putoukset Iguaçu-joelta nähtynä. Veneet vievät matkustajia '
          + 'putousten juurelle asti; joki muodostaa tässä kohtaa Brasilian '
          + 'ja Argentiinan rajan.',
      },
    ],
    uusi: {
      tiedosto: '00 1828 Views of Iguazu Falls from the Brazilian side.jpg',
      lahde: 'W. Bulach, Commons (CC BY-SA 4.0)',
      selite: 'Sama putousrivi Brasilian puolelta kuvattuna korkean veden aikaan. '
        + 'Putouksia on kaikkiaan noin 20 suurta ja yli 250 pienempää lähes '
        + 'kolmen kilometrin matkalla.',
    },
  },
  iquitos: {
    tiedosto: 'PERU. SCENES IN IQUITOS LCCN2016864106.jpg',
    vuosi: '1912',
    lahde: 'Harris & Ewing, Library of Congress (PD)',
    selite: 'Iquitosin laituri vuonna 1912; kuvan alareunassa lukee The '
      + 'Booth Pier. Höyrylaivoja on kiinni kylki kyljessä ja laiturin '
      + 'päässä nosturi. Kaupunki eli kumibuumista, ja merikelpoiset '
      + 'alukset pääsivät Atlantilta tuhansia kilometrejä ylös Amazonia.',
    lisat: [
      {
        tiedosto: 'Belen, Iquitos (11473478223).jpg',
        vuosi: '2013',
        lahde: 'M M, Commons (CC BY-SA 2.0)',
        selite: 'Belénin kortteli sateen jälkeen. Mototaksit eli moottoripyörän '
          + 'ja rikšan yhdistelmät ovat kaupungin pääasiallinen kulkuneuvo, '
          + 'ja kadun molemmin puolin on peltikatteisia kojuja.',
      },
      {
        tiedosto: 'Iquitos-Plaza de Armas-1.JPG',
        vuosi: '2015',
        lahde: 'Maurice Chédel, Commons (CC BY 3.0)',
        selite: 'Iquitosin pääaukio, oikealla Casa de Fierro eli rautatalo. Sen '
          + 'valurautaosat tuotiin laivalla Euroopasta kumikaupan aikaan, '
          + 'jolloin kaupungilla oli varaa tilata rakennusaineensa meren '
          + 'takaa.',
      },
      {
        tiedosto: 'Paiche en Belen.jpg',
        vuosi: '2006',
        lahde: 'Jorge Mori, Commons (PD)',
        selite: 'Suolattua paichea myynnissä Belénin torilla. Paiche eli arapaima '
          + 'on Amazonin suurimpia kaloja. Suolaus ja kuivaus pitävät saaliin '
          + 'syömäkelpoisena ilman kylmäketjua.',
      },
    ],
    uusi: {
      tiedosto: 'Vista ciudad desde rio.JPG',
      lahde: 'Gabymuaa, Commons (PD)',
      selite: 'Iquitos nykyään Itaya-joelta katsottuna. Rannassa on veneitä ja '
        + 'paalujen varaan rakennettuja taloja, ja niiden takaa kohoaa '
        + 'kaupungin kellotorni. Iquitosiin ei tule tietä muualta: sinne '
        + 'pääsee joko jokea pitkin tai lentäen.',
    },
  },
  joaopessoa: {
    tiedosto: 'João Pessoa, Paraíba circa 1903.jpg',
    vuosi: '1903',
    lahde: 'Virgílio Cardoso de Oliveira, A Patria Brazileira, Commons (PD)',
    selite: 'Parahyban kaupunki jokirannasta katsottuna, kuva kirjasta vuodelta '
      + '1903. Rannassa on höyrylaiva ja pitkä varastorakennus; kaupunki '
      + 'kasvoi Paraíbajoen varteen satamana ja sai nykyisen nimensä João '
      + 'Pessoa vasta 1930, murhatun kuvernöörin mukaan.',
    lisat: [
      {
        tiedosto: 'Vista do Centro Histórico de João Pessoa PB BR.jpg',
        vuosi: '2017',
        lahde: 'Rogerio121402, Commons (CC BY-SA 4.0)',
        selite: 'João Pessoan vanhaakaupunkia illansuussa, takana Paraíbajoki ja '
          + 'sen mangrovesaaret. Kaupunki perustettiin 1585 juuri tähän, joen '
          + 'ja meren väliin, ja se on yksi Brasilian vanhimmista.',
      },
      {
        tiedosto: 'Centro Cultural São Francisco JP PB.jpg',
        vuosi: '2019',
        lahde: 'Rogerio121402, Commons (CC BY-SA 4.0)',
        selite: 'São Franciscon kirkko- ja luostarikokonaisuus João Pessoassa. '
          + 'Etualalla on kivinen ristinjalusta ja taustalla laatoitettu '
          + 'kellotorni; rakentaminen alkoi 1500-luvun lopulla ja jatkui '
          + 'vaiheittain toistasataa vuotta, mikä näkyy tyylien '
          + 'kerroksellisuutena.',
      },
      {
        tiedosto: 'Apr2024. Cabo Branco Lighthouse aka Farol do Cabo Branco, João Pessoa, state of Paraíba, Brazil. 03.jpg',
        vuosi: '2024',
        lahde: 'Ridiculopathy, Commons (CC0)',
        selite: 'Cabo Brancon majakka João Pessoassa. Reilun puolen kilometrin '
          + 'päässä etelään on Ponta do Seixas, koko Amerikan mantereen '
          + 'itäisin kärki — aurinko nousee siellä ennen muuta maanosaa.',
      },
    ],
    uusi: {
      tiedosto: 'João Pessoa, capital da Paraíba.jpg',
      vuosi: '2022',
      lahde: 'Marcos Elias de Oliveira Júnior, Commons (CC0)',
      selite: 'João Pessoa ilmasta. Etualalla matalaa tiilikattoista asutusta, '
        + 'taustalla rannan tornirivi ja Atlantti: kaupunki on kasvanut '
        + 'jokivarresta merenrantaan asti.',
    },
  },
  lima: {
    tiedosto: 'Lima. The Rimac Bridge LCCN2006679716.jpg',
    vuosi: '1868',
    lahde: 'Courret Hermanos, Library of Congress (PD)',
    selite: 'Lima korkealta kuvattuna vuonna 1868: Puente de Piedran '
      + 'holvit, Rímac-joen uoma ja takana paljas San Cristóbalin kukkula. '
      + 'Kaupunki oli tuolloin matalaa, tasakattoista kortteliverkkoa. '
      + 'Albumiinivedos on Courret\'n veljesten kuvaamosta.',
    lisat: [
      {
        tiedosto: 'Lunchtime ceviche at the Mercado Central.jpg',
        vuosi: '2018',
        lahde: 'Bex Walton, Commons (CC BY 2.0)',
        selite: 'Cevichetiski Limán keskustorilla. Ceviche on raakaa kalaa, joka '
          + 'kypsyy limemehun hapossa ja tarjotaan sipulin, chilin ja '
          + 'keitetyn maissin kanssa. Perussa se syödään perinteisesti '
          + 'keskipäivällä.',
      },
      {
        tiedosto: 'Escolta presidencial, Plaza de Armas, Lima, Perú, 2015-07-28, DD 40.JPG',
        vuosi: '2015',
        lahde: 'Diego Delso, Commons (CC BY-SA 4.0)',
        selite: 'Presidentin ratsuväkisaattue Plaza de Armasilla '
          + 'itsenäisyyspäivänä 28. heinäkuuta. Vartiosto kuuluu Mariscal '
          + 'Domingo Nieton ratsuväkirykmenttiin ja esiintyy hallituspalatsin '
          + 'edessä.',
      },
      {
        tiedosto: 'Cerro de San Cristóbal, Lima, Perú, 2015-07-28, DD 113.JPG',
        vuosi: '2015',
        lahde: 'Diego Delso, Commons (CC BY-SA 4.0)',
        selite: 'San Cristóbalin kukkula nykyään. Sama rinne, joka vuoden 1868 '
          + 'kuvassa on paljas, on nyt katettu taloilla laelle asti. '
          + 'Korttelit syntyivät maaltamuuton myötä, ja talot on rakennettu '
          + 'vähitellen omin voimin.',
      },
    ],
    uusi: {
      tiedosto: 'Puente de piedra en el rio rimac Lima.jpg',
      lahde: 'Silvia Alcocer, Commons (CC BY-SA 4.0)',
      selite: 'Puente de Piedra nykyään, kuvattuna Desamparadosin rautatieaseman '
        + 'puolelta. Kivinen holvisilta on 1600-luvun alusta ja yhä käytössä; '
        + 'joen rannat on muurattu ja penkereille istutettu palmuja.',
    },
  },
  macapa: {
    tiedosto: 'Macapá 1908.jpg',
    vuosi: '1908',
    lahde: 'Wikimedia Commons (PD)',
    selite: 'Macapá vuonna 1908: São Josén kirkko aukion laidalla, matalia '
      + 'tiilikattoisia taloja ja yksi katulyhty. Kirkko ja kaupungin '
      + 'linnoitus rakennettiin 1700-luvun jälkipuoliskolla, kun Portugali '
      + 'halusi varmistaa Amazonin suun hallinnan.',
    lisat: [
      {
        tiedosto: 'Fortaleza de São José de Macapá.JPG',
        vuosi: '2011',
        lahde: 'Alécio Cezar, Commons (CC BY-SA 4.0)',
        selite: 'São Josén linnoitus Macapássa. Portugali aloitti sen '
          + 'rakentamisen vuonna 1764 Amazonin pohjoisrannalle, ja '
          + 'tähtimäinen pohjakaava oli aikansa eurooppalaista '
          + 'linnoitustaitoa.',
      },
      {
        tiedosto: 'Marco Zero do Equador, Macapá AP.jpg',
        vuosi: '2018',
        lahde: 'Márcia do Carmo / MTur Destinos, Commons (PD)',
        selite: 'Päiväntasaajan merkki Macapán eteläreunalla. Viiva kulkee '
          + 'kaupungin läpi, joten Macapá on yhtä aikaa pohjoisella ja '
          + 'eteläisellä pallonpuoliskolla; monumentti valmistui 1987.',
      },
      {
        tiedosto: 'Orla de Macapá 01.jpg',
        vuosi: '2013',
        lahde: 'Amir.sebe, Commons (CC BY-SA 3.0)',
        selite: 'Amazonjoki Macapán rantabulevardin kohdalla. Joki on täällä niin '
          + 'leveä, ettei vastarantaa erota, ja meren vuorovesi nostaa ja '
          + 'laskee sen pintaa päivittäin.',
      },
    ],
    uusi: {
      tiedosto: 'Saint Joseph Church, Macapá city, Brazil.jpg',
      vuosi: '2011',
      lahde: 'Jorge Andrade, Commons (CC BY 2.0)',
      selite: 'Sama São Josén kirkko runsaat sata vuotta myöhemmin. Hiekkakentän '
        + 'tilalla on asfalttikatu ja pysäköityjä autoja, mutta kupolillinen '
        + 'kellotorni on entisellään; kaupungin vuosipäivää vietetään yhä '
        + 'täällä messulla.',
    },
  },
  machupicchu: {
    tiedosto: 'Machupicchu hb10.jpg',
    vuosi: '1912',
    lahde: 'Hiram Bingham, National Geographic 1913 (PD)',
    selite: 'Machu Picchu vuonna 1912, kun Hiram Binghamin retkikunta oli '
      + 'raivannut rinteen kasvillisuudesta. Takana kohoaa Huayna Picchu. '
      + 'Vuotta aiemmin paikka oli lähes kokonaan viidakon peitossa, ja '
      + 'raivaus tehtiin käsityönä.',
    lisat: [
      {
        tiedosto: 'Machu Picchu, Perú, 2015-07-30, DD 51.JPG',
        vuosi: '2015',
        lahde: 'Diego Delso, Commons (CC BY-SA 4.0)',
        selite: 'Muureja ja pengerryksiä läheltä. Kivet on hakattu sopimaan '
          + 'toisiinsa ilman laastia, ja terassien tukimuurit pitävät jyrkän '
          + 'rinteen paikallaan sadekaudella.',
      },
      {
        tiedosto: 'Llamas on Machu Picchu Peru.jpg',
        vuosi: '2012',
        lahde: 'Thomas Quine, Commons (CC BY 2.0)',
        selite: 'Laamoja Machu Picchun pengerryksillä. Eläimet liikkuvat alueella '
          + 'vapaasti. Terasseja viljeltiin vielä muutama vuosikymmen sitten, '
          + 'ja nyt niillä kasvaa nurmi.',
      },
      {
        tiedosto: 'Machu Picchu, Perú, 2015-07-30, DD 47.JPG',
        vuosi: '2015',
        lahde: 'Diego Delso, Commons (CC BY-SA 4.0)',
        selite: 'Asuinrakennusten jäännöksiä. Machu Picchu rakennettiin '
          + '1400-luvulla ja hylättiin noin sata vuotta myöhemmin; katot '
          + 'olivat olkea, joten jäljellä ovat vain kiviseinät ja oviaukot.',
      },
    ],
    uusi: {
      tiedosto: 'Machu Picchu, Perú, 2015-07-30, DD 60.JPG',
      lahde: 'Diego Delso, Commons (CC BY-SA 4.0)',
      selite: 'Sama näkymä nykyään: pengerrykset ovat nurmella, rinteessä seisoo '
        + 'pari olkikattoista rekonstruktiota ja Huayna Picchu on yhä '
        + 'taustalla. Muurin päällä laiduntaa laama.',
    },
  },
  manaus: {
    tiedosto: 'Chegada do navio no porto de Manaus 1902Arquivo, César e Cia.Coleção, Jorge Herrán - panoramio.jpg',
    vuosi: '1902',
    lahde: 'César e Cia. / Jorge Herránin kokoelma, Commons (PD)',
    selite: 'Laivan saapuminen Manausin satamaan vuonna 1902. Puoli kaupunkia on '
      + 'soutanut vastaan: veneet ovat täynnä väkeä olkihatuissa ja valkeissa '
      + 'puvuissa, ja rantamuurilla seisoo yleisöä. Kuva on kumibuumin '
      + 'vuosilta, jolloin Amazonin kautsu teki Manausista rikkaan.',
    lisat: [
      {
        tiedosto: 'Mercado Municipal Adolpho Lisboa, Manaus, Brazil 03.jpg',
        vuosi: '2024',
        lahde: 'Ridiculopathy, Commons (CC0)',
        selite: 'Kuivattua ja suolattua kalaa myynnissä Manausin kauppahallissa. '
          + 'Amazonilla kala säilötään yhä kuivaamalla levyiksi, koska '
          + 'kuumuudessa tuore saalis pilaantuu muutamassa tunnissa.',
      },
      {
        tiedosto: 'Interior of Teatro Amazonas, Manaus, Brazil 01.jpg',
        vuosi: '2024',
        lahde: 'Ridiculopathy, Commons (CC0)',
        selite: 'Teatro Amazonasin katsomo: kolme kerrosta hevosenkengän '
          + 'muotoisia parvia, valurautaiset kaiteet ja punaverhoinen '
          + 'keskiaitio. Oopperatalo valmistui 1896 kumirahoilla, ja '
          + 'rakennusaineet tilattiin Euroopasta laivoilla ylös Amazonia.',
      },
      {
        tiedosto: 'Porto flutuante com barcos de cargas e de passageiros - panoramio.jpg',
        vuosi: '2009',
        lahde: 'James Martins, Commons (CC BY 3.0)',
        selite: 'Rahti- ja matkustajaveneitä Manausin kelluvassa satamassa. '
          + 'Amazonin varren kyliin ei useinkaan mene maantietä, joten '
          + 'ihmiset ja tavarat liikkuvat näillä monikerroksisilla '
          + 'jokialuksilla.',
      },
    ],
    uusi: {
      tiedosto: 'Panorama do Porto de Manaus.jpg',
      vuosi: '2018',
      lahde: 'Adriel Marcos, Commons (CC BY-SA 4.0)',
      selite: 'Manausin satama nykyään. Laituri on kelluva, koska Rio Negron '
        + 'pinta vaihtelee vuoden mittaan toistakymmentä metriä; kuvassa vesi '
        + 'on matalalla ja edessä näkyy paljastunut hiekkaranta.',
    },
  },
  montevideo: {
    tiedosto: 'Cerro de Montevideo desde la ciudad. Año 1865.jpg',
    vuosi: '1865',
    lahde: 'Tuntematon kuvaaja, Commons (PD)',
    selite: 'Näkymä vanhankaupungin kattojen yli lahdelle ja sen takana '
      + 'kohoavalle Cerrolle. Redillä on kymmeniä purjelaivoja ankkurissa. '
      + 'Juuri tämä kukkulan suojaama luonnonsatama oli syy siihen, että '
      + 'kaupunki perustettiin tähän kohtaan.',
    lisat: [
      {
        tiedosto: '2016 Mercado del Puerto de Montevideo.jpg',
        vuosi: '2016',
        lahde: 'Felipe Restrepo Acosta, Commons (CC BY-SA 4.0)',
        selite: 'Mercado del Puerto sataman kupeessa. Kaari-ikkunaisen julkisivun '
          + 'takana on vanha rautarunkoinen markkinahalli, jonka kojut ovat '
          + 'vaihtuneet grilliravintoloiksi: sisällä palaa rivi hiilillä '
          + 'lämpiäviä parrilla-grillejä.',
      },
      {
        tiedosto: '2016 Montevideo calle Piedras en la Ciudad Vieja.jpg',
        vuosi: '2016',
        lahde: 'Felipe Restrepo Acosta, Commons (CC BY-SA 4.0)',
        selite: 'Calle Piedras vanhassakaupungissa. Kapea ruutukaavakatu on '
          + 'peräisin siirtomaa-ajalta, jolloin koko kaupunki mahtui muurien '
          + 'sisään niemen kärkeen.',
      },
      {
        tiedosto: 'Terminal Cuenca del Plata.jpg',
        vuosi: '2014',
        lahde: 'Mevrob, Commons (CC BY-SA 4.0)',
        selite: 'Konttinosturit lastaamassa laivaa Montevideon satamassa. Samassa '
          + 'lahdessa, jossa 1800-luvulla makasi purjelaivoja, käsitellään '
          + 'nykyään myös sisämaan naapurimaiden vientiä, joka tulee jokea '
          + 'alas proomuilla.',
      },
    ],
    uusi: {
      tiedosto: 'Montevideo desde arriba.jpg',
      lahde: 'Marcelo Campi, Commons (CC BY-SA 2.0)',
      selite: 'Montevideo ilmasta. Matala ruutukaupunki jatkuu horisonttiin asti '
        + 'Río de la Platan rantaan, ja siellä missä 1865 oli kattojen takana '
        + 'peltoa, on nyt yhtenäinen korttelimatto.',
    },
  },
  portoalegre: {
    tiedosto: 'Porto Alegre, Rio Grande do Sul circa 1903.jpg',
    vuosi: 'noin 1903',
    lahde: 'Virgílio Cardoso de Oliveira, teoksesta A Patria Brazileira (PD)',
    selite: 'Porto Alegre 1900-luvun alussa kaupungin yläpuolelta '
      + 'kuvattuna: matalia taloja, puistokaistoja, suuri kaksikerroksinen '
      + 'julkinen rakennus ja takana matalat kukkulat. Kuva on painettu '
      + 'rasterivedoksena maantieteelliseen teokseen.',
    lisat: [
      {
        tiedosto: 'Mercado Público de Porto Alegre, Centro, Porto Alegre, abril de 2023 (1).jpg',
        vuosi: '2023',
        lahde: 'Fronteira, Commons (CC BY-SA 4.0)',
        selite: 'Keskustan julkinen markkinahalli. Suojeltu rakennus seisoo '
          + 'historiallisessa keskustassa kaupungintalon vieressä, muutaman '
          + 'korttelin päässä Guaíban rannasta, jota myöten tavara aikanaan '
          + 'tuotiin torille.',
      },
      {
        tiedosto: 'Usina do Gasômetro em Porto Alegre.jpg',
        vuosi: '2021',
        lahde: 'Boaventuravinicius, Commons (CC BY-SA 4.0)',
        selite: 'Gasômetron voimalaitos Guaíban rannalla. Rakennus on nykyään '
          + 'kulttuurikeskus, jossa on gallerioita, elokuvasali ja teatteri. '
          + 'Nimi on peräisin samalla paikalla toimineesta kaasulaitoksesta, '
          + 'joka valmisti kaasua kaupungin katulyhtyihin 1800-luvun lopulla.',
      },
      {
        tiedosto: 'Chimarrão em cuia gajeta.jpg',
        vuosi: '2026',
        lahde: 'Nutsie04, Commons (CC BY-SA 4.0)',
        selite: 'Chimarrão eli kuuma mate kurpitsakupissa metallipillin kanssa. '
          + 'Kuppi on koristeltu Rio Grande do Sulin vaakunalla. '
          + 'Etelä-Brasiliassa kuppi kiertää seurueessa niin, että jokainen '
          + 'juo sen tyhjäksi ja antaa takaisin täytettäväksi.',
      },
    ],
    uusi: {
      tiedosto: 'Panoramic of Historic Center, Porto Alegre, Brazil 2014-01-18.JPG',
      lahde: 'Eugenio Hansen OFS, Commons (CC BY-SA 3.0)',
      selite: 'Historiallinen keskusta nykyään. Samat matalat korttelit ovat '
        + 'jääneet tornitalojen väliin, ja kaupunki jatkuu kukkuloille, jotka '
        + 'näkyivät vielä sadan vuoden takaisessa kuvassa tyhjänä '
        + 'horisonttina.',
    },
  },
  portovelho: {
    tiedosto: 'Vista Panorâmica de Porto Velho em 1910 - 1144, Acervo do Museu Paulista da USP.jpg',
    vuosi: '1910',
    lahde: 'Dana Merrill / Museu Paulista (USP), Commons (PD)',
    selite: 'Porto Velho vuonna 1910: raivattua rantatörmää, puisia halleja, '
      + 'kiskoja ja pieni laituri Madeirajoen rannassa. Kuvan otti Dana '
      + 'Merrill, joka palkattiin dokumentoimaan Madeira–Mamoré-radan '
      + 'rakentamista; kaupunki syntyi radan päätepisteeksi keskelle metsää.',
    lisat: [
      {
        tiedosto: 'Estrada de Ferro Madeira Mamoré EFMM- Porto Velho (52265421081).jpg',
        vuosi: '2021',
        lahde: 'Imagens de Rondônia, Commons (PD)',
        selite: 'Madeira–Mamoré-radan ratapiha Porto Velhossa. Kiskot, '
          + 'vaihdeviitta ja punainen veturitalli ovat yhä paikoillaan, mutta '
          + 'junia ei kulje; alue on nykyään museota ja puistoa.',
      },
      {
        tiedosto: 'Museu da Estrada de Ferro Madeira-Mamoré (4154586710).jpg',
        vuosi: '2009',
        lahde: 'Cleber Rech, Commons (CC BY 2.0)',
        selite: 'Yksi Madeira–Mamoré-radan vanhoista asemista, täysin hylättynä. '
          + 'Rata suljettiin 1972, ja suurin osa reilun 360 kilometrin '
          + 'linjasta on jäänyt metsän alle.',
      },
      {
        tiedosto: 'Porto Velho, Rondônia, Brasil (cropped).jpg',
        vuosi: '2018',
        lahde: 'Silva Júnior / MTur, Commons (CC0)',
        selite: 'Madeirajoen ylittävä silta Porto Velhossa. Madeira on Amazonin '
          + 'suurimpia sivujokia ja tuo Andeilta niin paljon lietettä, että '
          + 'vesi pysyy ruskeana ympäri vuoden. Nimi tarkoittaa portugaliksi '
          + 'puuta: joki kuljettaa mukanaan valtavat määrät ajopuuta.',
      },
    ],
    uusi: {
      tiedosto: 'Porto Velho, Rondônia, Brasil.jpg',
      vuosi: '2018',
      lahde: 'Silva Júnior / MTur, Commons (CC0)',
      selite: 'Porto Velho nykyään: etualalla joen ylittävä silta, rannassa '
        + 'viljasiiloja ja proomu, takana korkeaa keskustaa. Sadassa vuodessa '
        + 'metsän reunaan raivatusta ratatyömaasta on tullut osavaltion '
        + 'pääkaupunki, jossa asuu yli puoli miljoonaa ihmistä.',
    },
  },
  puertomontt: {
    tiedosto: 'Puerto Montt (ca. 1912).jpg',
    vuosi: 'noin 1912',
    lahde: 'Bulletin of the Pan American Union, Commons (PD)',
    selite: 'Puerto Montt noin vuonna 1912. Kaupunki perustettiin 1853 '
      + 'saksalaisten siirtolaisten asutuskeskukseksi Reloncavín lahden '
      + 'pohjukkaan, ja nimensä se sai Chilen silloiselta presidentiltä '
      + 'Manuel Monttilta.',
    lisat: [
      {
        tiedosto: 'Angelmó 2014 f06 -entrada al mercado.jpg',
        vuosi: '2014',
        lahde: 'Rodrigo Fernández, Commons (CC BY-SA 4.0)',
        selite: 'Sisäänkäynti Angelmón torille. Angelmó on Puerto Montin '
          + 'satamakylä Tenglon salmen varrella, ja sen kojuista ostetaan '
          + 'kalaa, simpukoita ja merilevää.',
      },
      {
        tiedosto: 'Choromytilus chorus - Choro zapato 03 Mercado Pto Montt 2013 04.jpg',
        vuosi: '2013',
        lahde: 'Rodrigo Fernández, Commons (CC BY-SA 4.0)',
        selite: 'Choro zapato -simpukoita Puerto Montin torilla. Laji on '
          + 'Choromytilus chorus, ja lisänimi zapato eli kenkä viittaa kuoren '
          + 'kokoon.',
      },
      {
        tiedosto: 'Chile - Puerto Montt 23 - Cochayuyo seaweed for sale (6837476714).jpg',
        vuosi: '2012',
        lahde: 'McKay Savage, Commons (CC BY 2.0)',
        selite: 'Cochayuyoa myynnissä torilla. Cochayuyo on rantakallioilta '
          + 'korjattava ruskolevä, jota on syöty Chilen rannikolla kauan '
          + 'ennen espanjalaisten tuloa; se myydään kuivattuina nippuina.',
      },
    ],
    uusi: {
      tiedosto: 'Costanera de Puerto Montt.jpg',
      vuosi: '2016',
      lahde: 'Manxuc, Commons (CC BY-SA 4.0)',
      selite: 'Puerto Montin rantakatu nykyään, kuvassa kohti Paseo Costanera '
        + '-kauppakeskusta. Kaupunki on kasvanut Chilen lohenkasvatuksen '
        + 'keskukseksi ja Patagonian laivareittien lähtösatamaksi.',
    },
  },
  puntaarenas: {
    tiedosto: 'General view of Punta Arenas.jpg',
    vuosi: '1912',
    lahde: 'Nevin O. Winter, Commons (PD)',
    selite: 'Yleisnäkymä Punta Arenasiin vuonna 1912. Kaupunki eli lampaista ja '
      + 'Magalhãesinsalmen läpi kulkevasta laivaliikenteestä; Panaman kanavan '
      + 'valmistuminen 1914 vei salmelta suurimman osan matkustavista '
      + 'laivoista.',
    lisat: [
      {
        tiedosto: 'CL-Punta Arenas hafen.jpg',
        vuosi: '2017',
        lahde: 'Balou46, Commons (CC BY-SA 4.0)',
        selite: 'Punta Arenasin satamaterminaali. Satama palvelee nykyään '
          + 'Patagonian ja Etelämantereen liikennettä: kaupungista lähtevät '
          + 'sekä tutkimusasemien huoltoalukset että risteilijät.',
      },
      {
        tiedosto: 'Punta Arenas, costanera 0808.jpg',
        vuosi: '2019',
        lahde: 'Draceane, Commons (CC BY-SA 4.0)',
        selite: 'Punta Arenasin rantabulevardi Magalhãesinsalmen rannalla. Salmen '
          + 'toisella puolen on Tulimaan saari, ja tuuli käy tällä rannalla '
          + 'lähes yhtenään.',
      },
      {
        tiedosto: 'Punta-arenas-sara-brown.jpg',
        vuosi: '2018',
        lahde: 'Parnikoza, Commons (CC BY-SA 4.0)',
        selite: 'Sara Braunin hahmo hänen palatsinsa edustalla. Braun rikastui '
          + 'Patagonian lammastaloudesta, ja hänen rakennuttamansa palatsi '
          + 'pääaukion laidalla on kaupungin tunnetuimpia rakennuksia.',
      },
    ],
    uusi: {
      tiedosto: 'Punta Arenas, Cerro de la Cruz 0798.jpg',
      vuosi: '2019',
      lahde: 'Draceane, Commons (CC BY-SA 4.0)',
      selite: 'Näkymä Cerro de la Cruzilta Punta Arenasin ylle. Kukkula on aivan '
        + 'keskustan yläpuolella, ja sieltä erottuu sama ruutukaava, joka '
        + 'näkyy jo sadan vuoden takaisessa kuvassa.',
    },
  },
  quito: {
    tiedosto: 'Government Building and principal public square with cathedral at left, Quito, Ecuador LCCN90710775.jpg',
    vuosi: '1907',
    lahde: 'Underwood & Underwood, Library of Congress (PD)',
    selite: 'Quiton pääaukio vuonna 1907: hallituspalatsin pylväikkö, '
      + 'katedraali ja aukiolla taakkojen kantajia sekä saviruukkua '
      + 'päälaellaan kantava kulkija. Kuva on stereokortin puolikas — '
      + 'pariksi otetut vedokset antoivat katselulaitteessa '
      + 'syvyysvaikutelman.',
    lisat: [
      {
        tiedosto: 'Quito calle García Moreno.jpg',
        vuosi: '2010',
        lahde: 'Cayambe, Commons (CC BY-SA 3.0)',
        selite: 'García Morenon katu laskee vanhan keskustan halki, ja perällä El '
          + 'Panecillon kukkulalla seisoo Quiton Neitsyen patsas. Vanha '
          + 'keskusta kuuluu Unescon maailmanperintöluetteloon, ja siksi '
          + 'julkisivuja ei saa muuttaa.',
      },
      {
        tiedosto: 'Iglesia de la Compañía de Jesus, Quito 01.jpg',
        vuosi: '2014',
        lahde: 'Bernard Gagnon, Commons (CC BY-SA 3.0)',
        selite: 'Jesuiittakirkon La Compañían julkisivun yksityiskohta. '
          + 'Kierrepylväät ja koristeet on veistetty vulkaanisesta kivestä '
          + 'paikallisissa työpajoissa, joiden tuotannosta käytetään '
          + 'nimitystä Quiton koulukunta.',
      },
      {
        tiedosto: 'Basílica del Voto Nacional, Quito (exterior) pic.ao1.jpg',
        vuosi: '2017',
        lahde: 'David Adam Kess, Commons (CC BY-SA 4.0)',
        selite: 'Basílica del Voto Nacional illalla. Uusgoottilainen kirkko '
          + 'kohoaa vanhan keskustan yläpuolelle, ja sen torneihin voi '
          + 'kiivetä: ylhäältä näkyvät keskusta ja Pichincha-tulivuori.',
      },
    ],
    uusi: {
      tiedosto: 'Quito Plaza Independencia Pal Carondelet 2010.jpg',
      lahde: 'Cayambe, Commons (CC BY-SA 3.0)',
      selite: 'Sama aukio nykyään. Hallituspalatsin Palacio de Carondelet\'n '
        + 'pylväikkö ja katedraali ovat ennallaan, mutta mukulakivien tilalla '
        + 'on laatoitus ja istutukset ja kuormankantajien tilalla '
        + 'kävelijöitä.',
    },
  },
  rio: {
    tiedosto: 'Copacabana, Acervo do Instituto Moreira Salles.jpg',
    vuosi: '1895',
    lahde: 'Marc Ferrez / Instituto Moreira Salles, Commons (PD)',
    selite: 'Copacabanan lahti ylhäältä kuvattuna. Rannan takana on vain muutama '
      + 'rakennusrivi ja hiekkasärkkä, ja loppu on paljasta rinnettä. Marc '
      + 'Ferrez kuvasi Rion maisemat lasilevyille, ja tämä vedos on hänen '
      + 'kokoelmastaan.',
    lisat: [
      {
        tiedosto: 'Escadaria Selarón - Rio de Janeiro - 20240417062601.jpg',
        vuosi: '2024',
        lahde: 'Donatas Dabravolskas, Commons (CC BY-SA 4.0)',
        selite: 'Selarónin portaat Lapan kaupunginosassa. Chileläinen Jorge '
          + 'Selarón alkoi laatoittaa talonsa edustan rappuja 1990-luvulla ja '
          + 'jatkoi työtä kuolemaansa asti; laattoja on lähetetty hänelle '
          + 'ympäri maailmaa.',
      },
      {
        tiedosto: 'Scene at Feira De Sao Cristovao - Zona Norte - Rio de Janeiro - Brazil - 01 (17556944211).jpg',
        vuosi: '2015',
        lahde: 'Adam Jones, Commons (CC BY-SA 2.0)',
        selite: 'São Cristóvãon markkinat Rion pohjoisosassa. Katetulla '
          + 'käytävällä myydään vaatteita, lääkeyrttejä ja kääretupakkaa. '
          + 'Halli on nimetty laulaja Luiz Gonzagan mukaan, ja se on Rioon '
          + 'muuttaneiden koillisbrasilialaisten oma tori ja tanssipaikka.',
      },
      {
        tiedosto: 'Rocinha rio de janeiro panorama 2010.jpg',
        vuosi: '2010',
        lahde: 'chensiyuan, Commons (CC BY-SA 4.0)',
        selite: 'Rocinha, Brasilian suurimpiin kuuluva favela, peittää jyrkän '
          + 'rinteen Rion eteläosassa. Talot on rakennettu toistensa päälle '
          + 'ilman katusuunnitelmaa, ja kulku sisäosiin käy portaita ja kujia '
          + 'pitkin.',
      },
    ],
    uusi: {
      tiedosto: 'BrunaPrado Praia de Copacabana Praia do Leme Rio de Janeiro RJ (40070449945).jpg',
      lahde: 'Bruna Prado / MTur Destinos, Commons (public domain)',
      selite: 'Sama Copacabanan kaari nykyään, kuvattuna vuorenrinteeltä. Ranta '
        + 'on samanmuotoinen kuin Ferrezin kuvassa, mutta sen takana on '
        + 'yhtenäinen tornitalorivi, joka jatkuu Leman niemeen asti. Rinteet '
        + 'jäivät rakentamatta, koska ne kuuluvat kansallispuistoon.',
    },
  },
  robinsoncrusoe: {
    tiedosto: 'Scene of the story of Robinson Crusoe. Selkirk\'s Cave. Side view looking up the valley. "Crusoe\'s Quibedrada" LCCN2006687056.jpg',
    vuosi: '1874',
    lahde: 'Library of Congress (PD)',
    selite: 'Laakso, jota vedoksen alkuperäinen kuvateksti kutsuu Selkirkin '
      + 'luolaksi, valokuvattuna vuonna 1874. Skotlantilainen merimies '
      + 'Alexander Selkirk jätettiin saarelle 1704 ja eli siellä yksin yli '
      + 'neljä vuotta; tarina antoi aiheen Defoen romaaniin.',
    lisat: [
      {
        tiedosto: 'Isla Juan Fernandez- Langostas (Lobsters).jpg',
        vuosi: '2005',
        lahde: 'Serpentus, Commons (CC BY-SA 3.0)',
        selite: 'Kalastaja ja kaksi langustia Juan Fernándezin saaristossa. '
          + 'Langustinpyynti on saaren tärkein elinkeino, ja pyydettävä laji '
          + 'Jasus frontalis elää vain tämän saariryhmän vesissä.',
      },
      {
        tiedosto: 'Maisons de pêcheurs de langoustes.jpg',
        vuosi: '2013',
        lahde: 'PatHen3333, Commons (CC BY-SA 4.0)',
        selite: 'Langustinkalastajien taloja, jotka on rakennettu pääosin puusta. '
          + 'Saaren ainoa kylä on Cumberlandinlahden rannalla, ja '
          + 'rakennustarpeet samoin kuin muu tavara tuodaan sinne laivalla '
          + 'mantereelta.',
      },
      {
        tiedosto: 'Voie d\'évacuation en cas de tsunami.jpg',
        vuosi: '2013',
        lahde: 'PatHen3333, Commons (CC BY-SA 4.0)',
        selite: 'Tsunamin varalle merkitty pakoreitti. Kylä on rakennettu aivan '
          + 'meren tasalle lahden pohjukkaan, joten hälytyksen tullessa ainoa '
          + 'suunta on ylös rinnettä.',
      },
    ],
    uusi: {
      tiedosto: 'Robinson Crusoe Island bayside view of the town of San Juan Bautista.jpg',
      vuosi: '2020',
      lahde: 'Richard N Horne, Commons (CC BY-SA 4.0)',
      selite: 'San Juan Bautista, saaren ainoa kylä, Cumberlandinlahden rannalla. '
        + 'Kylän ulkopuolinen osa saarta on kansallispuistoa ja Unescon '
        + 'biosfäärialuetta.',
    },
  },
  salta: {
    tiedosto: 'Cabildo de Salta siglo XIX.jpg',
    vuosi: '1890-luku',
    lahde: 'Archivo General de la Nación (Argentiina), Commons (PD)',
    selite: 'Saltan cabildo 1800-luvun lopulla. Cabildo oli siirtomaa-ajan '
      + 'kaupunginhallinnon talo; Saltan cabildo on säilynyt pääaukion '
      + 'laidalla, ja kuva on Argentiinan kansallisarkiston harrastajakuvien '
      + 'kokoelmasta.',
    lisat: [
      {
        tiedosto: 'La Balcarce, ciudad de Salta.jpg',
        vuosi: '2012',
        lahde: 'jikatu, Commons (CC BY-SA 2.0)',
        selite: 'Calle Balcarce Saltan keskustassa. Katu on kaupungin ravintola- '
          + 'ja peñakortteli: peña on paikka, jossa syödään ja kuunnellaan '
          + 'pohjoisen Argentiinan kansanmusiikkia.',
      },
      {
        tiedosto: 'Télécabines.jpg',
        vuosi: '2012',
        lahde: 'Bachelot Pierre J-P, Commons (CC BY-SA 3.0)',
        selite: 'Köysiradan vaunuja ala-asemalla Saltassa. Rata nousee kaupungin '
          + 'yllä kohoavalle Cerro San Bernardolle — samalle huipulle, jolta '
          + 'Saltaa on kuvattu jo 1850-luvulla.',
      },
      {
        tiedosto: 'Vendedor en el parque San Martín.JPG',
        vuosi: '2010',
        lahde: 'Fabianchie, Commons (CC BY-SA 4.0)',
        selite: 'Kaupustelija kärryineen San Martínin puistossa. Puisto on '
          + 'keskustan suurin viheralue, ja sen laidalta lähtee köysirata '
          + 'Cerro San Bernardolle.',
      },
    ],
    uusi: {
      tiedosto: 'Cabildo de Salta, Argentina.jpg',
      vuosi: '2026',
      lahde: 'Dpalma01, Commons (CC BY-SA 4.0)',
      selite: 'Sama cabildo tänään Saltan pääaukion laidalla. Rakennuksessa '
        + 'toimii nykyään pohjoisen Argentiinan historiallinen museo, ja '
        + 'holvikäytävän alta kuljetaan aukiolle.',
    },
  },
  salvador: {
    tiedosto: 'Salvador bahia panorama 1870.jpg',
    vuosi: '1870-luku',
    lahde: 'Guilherme Gaensly, Commons (PD)',
    selite: 'Salvador noin 1870 ylhäältä kuvattuna: alakaupungin kattoja ja '
      + 'Kaikkien pyhien lahti täynnä purjelaivoja. Guilherme Gaensly '
      + 'kiersi Brasiliaa suurella kameralla ja myi vedoksia. Ylä- ja '
      + 'alakaupungin väliä kuljettiin tuolloin jyrkkiä rinnekatuja pitkin.',
    lisat: [
      {
        tiedosto: 'Baiana-acarajé-Salvador.jpg',
        vuosi: '2008',
        lahde: 'Rodrigues Pozzebom / Agência Brasil, Commons (CC BY 3.0 br)',
        selite: 'Acarajé-myyjä Anelita Conceição Viana Salvadorissa. Acarajé on '
          + 'lehmänpavusta muotoiltu ja palmuöljyssä paistettu leipänen, ja '
          + 'myyjien ammatti asuineen ja tapoineen on Brasiliassa suojeltua '
          + 'aineetonta kulttuuriperintöä.',
      },
      {
        tiedosto: 'Largo do Pelourinho, Salvador 20150719-DSC05452.JPG',
        vuosi: '2015',
        lahde: 'Matti Blume, Commons (CC BY-SA 4.0)',
        selite: 'Largo do Pelourinho Salvadorin vanhassakaupungissa. Nimi '
          + 'tarkoittaa häpeäpaalua: aukiolla rangaistiin orjuutettuja '
          + 'ihmisiä julkisesti. Talot kunnostettiin 1990-luvulta alkaen, ja '
          + 'alue on Unescon maailmanperintökohde.',
      },
      {
        tiedosto: 'Elevador Lacerda Salvador Bahia 2019-0359.jpg',
        vuosi: '2019',
        lahde: 'Paul R. Burley, Commons (CC BY-SA 4.0)',
        selite: 'Lacerdan hissi yhdistää Salvadorin alakaupungin ylhäällä olevaan '
          + 'vanhaankaupunkiin. Ensimmäinen, vesivoimalla toimiva hissi '
          + 'avattiin 1873; nykyinen torni on vuodelta 1930, kuten sen '
          + 'seinälaatassa lukee.',
      },
    ],
    uusi: {
      tiedosto: 'Salvador 01.jpg',
      vuosi: '2014',
      lahde: 'Dlgoncalves, Commons (CC BY-SA 4.0)',
      selite: 'Salvadorin alakaupunki nykyään, kuvattuna samalta rinteeltä kuin '
        + 'vanha panoraama. Comércion matalien varastojen tilalla on '
        + 'toimistotorneja, lahdella on purjelaivojen sijasta rahtialuksia ja '
        + 'veneitä, ja vasemmalla erottuu Lacerdan hissin torni.',
    },
  },
  sanambrosio: {
    lisat: [
      {
        tiedosto: 'Benthic microhabitats (10.7717-peerj.10531) Figure 4.png',
        vuosi: '2021',
        lahde: 'Matthias Gorny / Oceana, Commons (CC BY 4.0)',
        selite: 'Merenpohjaa Nazca-Desventuradasin merensuojelualueella, '
          + 'kuvattuna kauko-ohjattavalla sukellusrobotilla 176 ja 200 '
          + 'metrin syvyydessä. Karkealla hiekalla kasvaa merikyniä ja '
          + 'merivuokkoja San Félixin ja San Ambrosion merenalaisilla '
          + 'vuorilla.',
      },
      {
        tiedosto: 'Nazca-Desventuradas Marine Park (10.7717-peerj.8279) Figure 5.png',
        vuosi: '2019',
        lahde: 'Matthias Gorny / Oceana, Commons (CC BY 4.0)',
        selite: 'Lisää sukellusrobotin kuvia samalta suojelualueelta. Juuri '
          + 'näiltä vedenalaisilta vuorilta löytyi kotilo, joka kuvattiin '
          + 'tieteelle uutena lajina vuonna 2019 — saaret ovat niin kaukana, '
          + 'että niiden vesiä on tutkittu vasta vähän.',
      },
    ],
    uusi: {
      tiedosto: 'Desventuradas - Landsat OLI 7.jpg',
      vuosi: '2015',
      lahde: 'USGS/NASA, Commons (PD)',
      selite: 'Desventuradas-saaret Landsat 8 -satelliitin kuvaamana. San '
        + 'Ambrosio on ryhmän suurin saari; se on tulivuoriperäinen, asumaton '
        + 'ja koko kehältään lähes rantautumiskelvoton, ja Chilen rannikolle '
        + 'on sieltä noin 850 kilometriä.',
    },
  },
  santacruz: {
    lisat: [
      {
        tiedosto: '20170803 Bolivia 0990 Santa Cruz sRGB (37270707024).jpg',
        vuosi: '2017',
        lahde: 'Dan Lundberg, Commons (CC BY-SA 2.0)',
        selite: 'Plaza 24 de Septiembre katedraalin kellotornista: palmuja, '
          + 'kukkiva vaaleanpunainen puu ja matalia tiilikattoisia taloja, '
          + 'joiden takaa nousevat tornitalot. Aukion nimi muistuttaa 24. '
          + 'syyskuuta 1810, jolloin kaupunkilaiset nousivat '
          + 'siirtomaahallintoa vastaan.',
      },
      {
        tiedosto: 'Catedral Metropolitana Basílica Menor de San Lorenzo de Santa Cruz - Bolivia (53041053638).jpg',
        vuosi: '2023',
        lahde: 'Rômulo Gama Ferreira, Commons (CC BY 2.0)',
        selite: 'San Lorenzon katedraali aukion laidalla. Kirkko on kaupungin '
          + 'vanhimman keskustan kiintopiste, ja sen tornista aukeaa näkymä, '
          + 'josta muut aukion kuvat on otettu.',
      },
      {
        tiedosto: 'Coche Motor Ferrostaal (FCOSA) 01.jpg',
        vuosi: '2010',
        lahde: 'jimcintosh, Commons (CC BY 2.0)',
        selite: 'Ferrocarril Orientalin moottorivaunu. Runko on saksalainen '
          + 'Ferrostaal-kiskobussi, mutta se on rakennettu uudelleen Santa '
          + 'Cruzin omissa korjaamoissa. Itäinen rataverkko ei ole koskaan '
          + 'yhdistynyt Bolivian länsiosan rataan, vaan kulkee Brasiliaan '
          + 'ja Argentiinaan.',
      },
    ],
    uusi: {
      tiedosto: 'Vista Aérea de Santa Cruz de la Sierra, Bolivia.jpg',
      lahde: 'EEJCC, Commons (CC BY-SA 4.0)',
      selite: 'Santa Cruz ilmasta. Kaupunki on kasvanut leveydelle eikä '
        + 'korkeuteen, ja sen kaava rakentuu sisäkkäisistä kehäkaduista, '
        + 'joita sanotaan anilloiksi ja joiden mukaan osoitteetkin '
        + 'ilmoitetaan.',
    },
  },
  santarem: {
    lisat: [
      {
        tiedosto: 'Observando o encontro das águas (42070272564).jpg',
        vuosi: '2018',
        lahde: 'Wellington-stm, Commons (CC BY 2.0)',
        selite: 'Nainen istuu Santarémin rantapenkillä ja katsoo jokea, jossa '
          + 'erottuu kaksi väriä. Tapajósin kirkas vesi ja Amazonin savinen '
          + 'vesi kulkevat rinnakkain pitkän matkan ennen kuin sekoittuvat.',
      },
      {
        tiedosto: 'Orla de Santarém - Pará (Brasil).JPG',
        vuosi: '2015',
        lahde: 'Nayaniteixeira, Commons (CC BY-SA 4.0)',
        selite: 'Jalohaikara seisoo kiinnityspaalulla Santarémin rannassa. Amazon '
          + 'on kaupungin päätie: matkustajalaivat Belémiin ja Manausiin '
          + 'lähtevät samasta rannasta.',
      },
      {
        tiedosto: 'Catedral Metropolitana de Santarém, Santarém, Pará, 2007.jpg',
        vuosi: '2007',
        lahde: 'Lopmed, Commons (PD)',
        selite: 'Santarémin katedraali. Kaupunki kasvoi jesuiittojen '
          + 'lähetysaseman ympärille Tapajósin suulle 1600-luvulla, ja kirkko '
          + 'on yhä keskustan tunnistettavin rakennus.',
      },
    ],
    uusi: {
      tiedosto: 'Santarém 01.jpg',
      vuosi: '2024',
      lahde: 'Redbaobab, Commons (CC BY 4.0)',
      selite: 'Santarém ylhäältä: sinivihreä Tapajós ja ruskea Amazon kohtaavat '
        + 'aivan kaupungin edustalla. Raja pysyy näkyvissä, koska jokien '
        + 'lämpötila, virtausnopeus ja lietemäärä ovat erilaiset.',
    },
  },
  saoluis: {
    tiedosto: 'Largo do Carmo - São Luís - em 1908.jpg',
    vuosi: '1908',
    lahde: 'Gaudêncio Cunha, Álbum do Maranhão em 1908, Commons (PD)',
    selite: 'Largo do Carmo São Luísissa vuonna 1908: leikattuja puita, penkkejä, '
      + 'lyhtypylväitä ja etualalla raitiotien kiskot. Oikealla Carmon '
      + 'kirkko, jonka mukaan aukio oli nimetty; vuonna 1901 se sai uuden '
      + 'nimen Praça João Lisboa maranhãolaisen kirjailijan mukaan.',
    lisat: [
      {
        tiedosto: 'Mercado das Tulhas - 01.jpg',
        vuosi: '2019',
        lahde: 'Ajmcbarreto, Commons (CC BY-SA 4.0)',
        selite: 'Mercado das Tulhas São Luísin vanhassakaupungissa. Kaarikäytävän '
          + 'yläpuolelle on hakattu vuosiluku 1861, ja halli on yhä '
          + 'kauppapaikka; nykyään kojuissa myydään enimmäkseen käsitöitä ja '
          + 'vaatteita.',
      },
      {
        tiedosto: 'BOI DA MAIOBA ARRASTÃO DA ILHA - SÃO LUÍS MA.jpg',
        vuosi: '2023',
        lahde: 'Clarycepb, Commons (CC BY-SA 4.0)',
        selite: 'Boi da Maioba -ryhmä kulkueessa São Luísissa. Bumba meu boi on '
          + 'Maranhãon kesäkuun juhla, ja tämä ryhmä edustaa matraca-tyyliä: '
          + 'satojen puukapuloiden yhteinen kalke antaa kulkueelle rytmin.',
      },
      {
        tiedosto: 'Azulejos azuis no Centro Histórico de São Luís.jpg',
        vuosi: '2024',
        lahde: 'Thuaia, Commons (CC BY-SA 4.0)',
        selite: 'Sinivalkoisia azulejo-laattoja vanhankaupungin seinässä. Laatat '
          + 'tulivat aikoinaan Portugalista, ja niillä oli myös käytännön '
          + 'tehtävä: keraaminen pinta kestää kosteutta ja pitää seinän '
          + 'viileämpänä kuin rappaus.',
      },
    ],
    uusi: {
      tiedosto: 'São Luis-04.jpg',
      vuosi: '2008',
      lahde: 'JLPizzol, Commons (CC BY-SA 4.0)',
      selite: 'Sama aukio nykyään Praça João Lisboana. Kaksikerroksiset sobradot '
        + 'seisovat rivissä kuten sata vuotta sitten, osa laatoitettuna ja '
        + 'osa korjausta odottamassa — mutta raitiotietä ei enää ole, ja '
        + 'kiskojen tilalla on autorivi.',
    },
  },
  saopaulo: {
    tiedosto: 'Militão Augusto de Azevedo - Rua Direita, 1862.jpg',
    vuosi: '1862',
    lahde: 'Militão Augusto de Azevedo, Biblioteca Guita e José Mindlin (PD)',
    selite: 'Rua Direita hiekkakatuna, laidoilla matalia siirtomaa-ajan taloja '
      + 'markiiseineen ja perällä kirkontorni. Militão Augusto de Azevedo '
      + 'kuvasi samat kadut uudelleen 1887 ja kokosi otokset '
      + 'vertailualbumiksi, joka näyttää 25 vuoden muutoksen.',
    lisat: [
      {
        tiedosto: 'Mercado Municipal São Paulo.jpg',
        vuosi: '2015',
        lahde: 'Celykzk, Commons (CC BY-SA 4.0)',
        selite: 'Kaupungin markkinahallin sisätila. Holvikaton alla on '
          + 'lasimaalauksia ja niiden alla kojurivit. Hallia sanotaan '
          + 'Mercadãoksi, ja sen tunnetuin tuote on paksu mortadellaleipä.',
      },
      {
        tiedosto: 'Liberdade of Sao Paulo.jpg',
        vuosi: '2019',
        lahde: 'Wilfredor, Commons (CC0)',
        selite: 'Liberdaden kaupunginosan pääkatu punaisine lyhtypylväineen '
          + 'ja juhlaviireineen. Alue kasvoi japanilaisten siirtolaisten '
          + 'ympärille 1900-luvun alusta, ja São Paulon osavaltiossa asuu '
          + 'yhä maailman suurin japanilaistaustainen yhteisö Japanin '
          + 'ulkopuolella.',
      },
      {
        tiedosto: 'Avenida Paulista aberta em Domingo.jpg',
        vuosi: '2017',
        lahde: 'Willemarcel, Commons (CC BY-SA 4.0)',
        selite: 'Avenida Paulista sunnuntaina. Kaupungin vilkkain valtaväylä '
          + 'suljetaan viikoittain autoilta, ja tilalle tulevat pyöräilijät, '
          + 'kävelijät ja katukaupustelijat. Katu kulkee harjanteella, joka '
          + 'oli 1800-luvulla kahvitilallisten huvilakortteli.',
      },
    ],
    uusi: {
      tiedosto: 'Caminhando pela Rua Direita (8125039350).jpg',
      lahde: 'Eli Kazuyuki Hayasaka, Commons (CC BY-SA 2.0)',
      selite: 'Sama Rua Direita 150 vuotta myöhemmin, iltakävelyn aikaan. Katu on '
        + 'kivetty ja rauhoitettu jalankulkijoille, liikkeet ovat kiinni ja '
        + 'ainoa liikenne on ryhmä kävelijöitä keskellä keskustaa.',
    },
  },
  titicaca: {
    tiedosto: 'N° 308. Lago Titicaca, Balsas de cañas, hechas por los naturales del pais.png',
    vuosi: '1900',
    lahde: 'Fernando Garreaud, albumi República Peruana (PD)',
    selite: 'Kaislaveneitä Titicacajärvellä vuonna 1900. Miehet seisovat keulassa '
      + 'ja työntävät venettä sauvomalla, ja tyyni vesi kahdentaa mastot. '
      + 'Veneet punotaan totora-kaislasta, jota kasvaa järven matalikoilla.',
    lisat: [
      {
        tiedosto: 'Islas flotantes de los Uros, Lago Titicaca, Perú, 2015-08-01, DD 32.JPG',
        vuosi: '2015',
        lahde: 'Diego Delso, Commons (CC BY-SA 4.0)',
        selite: 'Uros-kansan kelluva saari. Sekä alusta että majat tehdään '
          + 'totora-kaislasta. Pintaan on lisättävä uutta kaislaa jatkuvasti, '
          + 'koska alta se lahoaa veteen.',
      },
      {
        tiedosto: 'Puno, puerto, 2023.jpg',
        vuosi: '2023',
        lahde: 'Draceane, Commons (CC BY-SA 4.0)',
        selite: 'Punon satama järven Perun-puoleisella rannalla. Laiturissa on '
          + 'matkustajaveneiden lisäksi ruoppaaja: väylä on pidettävä auki '
          + 'kaislikon läpi, jotta veneet pääsevät ulos järvelle.',
      },
      {
        tiedosto: 'Dança na Ilha de Taquile.jpg',
        vuosi: '2022',
        lahde: 'NKost94, Commons (CC BY-SA 4.0)',
        selite: 'Taquilen saaren asukkaita tanssimassa kylän aukiolla. Saari '
          + 'tunnetaan käsin kudotuista ja neulotuista tekstiileistä, ja '
          + 'tanssiasut on tehty itse.',
      },
    ],
    uusi: {
      tiedosto: 'Traditional reed boat in the Uros floating islands.jpg',
      lahde: 'H.dav.are, Commons (CC BY-SA 4.0)',
      selite: 'Totora-kaislasta tehty vene Uros-saarten välisellä kanavalla. Vene '
        + 'on punottu samasta kasvista kuin vanhassa kuvassa, mutta sen keula '
        + 'on nyt koristeltu ja matkustajia kuljetetaan saarelta toiselle.',
    },
  },
  valparaiso: {
    tiedosto: 'Harbor of Valparaiso, Chile LCCN2016821516.jpg',
    vuosi: '1910-luku',
    lahde: 'Library of Congress (PD)',
    selite: 'Valparaíson satama lasilevynegatiiville kuvattuna. Satama oli '
      + 'purjelaivakaudella Etelä-Amerikan tärkeimpiä pysähdyspaikkoja Kap '
      + 'Hornin kiertäneille laivoille; Panaman kanavan avaaminen 1914 vei '
      + 'siltä suuren osan liikenteestä.',
    lisat: [
      {
        tiedosto: 'Ascensor El Peral, tipo funicular, año 1902, Valparaíso, Chile.jpg',
        vuosi: '2017',
        lahde: 'Carlos Teixidor Cadenas, Commons (CC BY-SA 4.0)',
        selite: 'Ascensor El Peral, vuonna 1902 rakennettu köysihissi, joka '
          + 'nousee Cerro Alegren rinteeseen. Se on suojeltu historiallisena '
          + 'monumenttina ja kunnostettiin perusteellisesti vuonna 2016.',
      },
      {
        tiedosto: 'Mercado Cardonal (40046532572).jpg',
        vuosi: '2018',
        lahde: 'Deensel, Commons (CC BY 2.0)',
        selite: 'Mercado Cardonal, Valparaíson suuri ruokatori. Halli seisoo '
          + 'kaupungin tasaisella osalla, jota kutsutaan nimellä el plan — '
          + 'kaikki muu kaupunki nousee sen takaa rinteille.',
      },
      {
        tiedosto: 'Cerros de Valparaíso.jpg',
        vuosi: '2021',
        lahde: 'Cris.tbl, Commons (CC BY 4.0)',
        selite: 'Valparaíson rinnekaupunginosia. Talot on rakennettu jyrkkään '
          + 'rinteeseen puusta ja aaltopellistä, ja tämä satamaa ympäröivä '
          + 'kukkulakaupunki on Unescon maailmanperintökohde.',
      },
    ],
    uusi: {
      tiedosto: 'Valparaiso is built across 42 hills and has a major port (38362456435).jpg',
      vuosi: '2017',
      lahde: 'Winniepix, Commons (CC BY 2.0)',
      selite: 'Valparaíso nykyään: satama edessä ja kaupunki nousemassa '
        + 'kukkuloille sen takana. Kuvaaja laskee kukkuloita olevan 42; '
        + 'satama on yhä Chilen vilkkaimpia.',
    },
  },
};
