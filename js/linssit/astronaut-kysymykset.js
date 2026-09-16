/**
 * Astronautin kameran valmiit kysymykset. Lähde: tools/astronaut/qa-*.json.
 * Kaksi per kohde; kysymykset:string[] sopii nykyisiin kysymyskortteihin.
 * Kuvapäivä on havainnon päivä, ei nykyhetken väite. Ei UI- tai äänikäynnistyksiä.
 * Päivitä toimituslähteet ja aja node tools/astronaut/build-questions.mjs.
 */
export const ASTRONAUTIN_KYSYMYKSET = {
  "etna": {
    "kysymykset": [
      "Miksi Etnan yllä on kaksi eriväristä pilveä?",
      "Kuinka pitkälle Etnan purkaushistoria tunnetaan?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Etnan yllä on kaksi eriväristä pilveä?",
        "vastaus": "Tummempi juova on Etnan tuhkapilvi 30. lokakuuta 2002. Vaaleammat juovat alempana ovat savua metsäpaloista, jotka rinteille valunut laava sytytti — melkoinen näky avaruusaseman ikkunasta.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss005e19024",
            "title": "NASA Image Library: ISS005-E-19024"
          }
        ],
        "havaintoId": "iss005e19024"
      },
      {
        "kysymys": "Kuinka pitkälle Etnan purkaushistoria tunnetaan?",
        "vastaus": "Etnan toimintaa on dokumentoitu ainakin 2 700 vuoden ajan. UNESCO pitää sitä yhtenä maailman pisimmistä tulivuorten havaintohistorioista — ihmiset ovat katselleet näitä tulia hyvin kauan.",
        "lahteet": [
          {
            "url": "https://whc.unesco.org/en/list/1427",
            "title": "UNESCO World Heritage Centre: Mount Etna"
          }
        ],
        "havaintoId": "iss005e19024"
      }
    ]
  },
  "italia-yolla": {
    "kysymykset": [
      "Miksi Italian saapas näkyy yöllä näin selvästi?",
      "Mikä saari näkyy saappaan kärjen edessä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Italian saapas näkyy yöllä näin selvästi?",
        "vastaus": "Kaupunkien ja teiden keinovalo hahmottelee asutut rannikkoalueet, kun taas meret ja monet vuoriseudut jäävät tummiksi. Kuvassa erottuvat erityisen kirkkaina Rooma ja Napoli.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss037e018864",
            "title": "NASA Image Library: ISS037-E-018864"
          },
          {
            "url": "https://assets.science.nasa.gov/content/dam/science/esd/eo/eokids/wp-content/uploads/sites/6/2019/11/22_Night-Lights_Nov-2019.pdf",
            "title": "NASA Earth Observatory: Night Vision"
          }
        ],
        "havaintoId": "iss037e018864"
      },
      {
        "kysymys": "Mikä saari näkyy saappaan kärjen edessä?",
        "vastaus": "Saari on Sisilia, ja sen itärannalla kohoaa Etna. Astronautin 23. lokakuuta 2013 ottamassa kuvassa koko Sisilia näkyy valoineen, kun Adrianmeri jää Italian oikealle puolelle mustaksi.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss037e018864",
            "title": "NASA Image Library: ISS037-E-018864"
          }
        ],
        "havaintoId": "iss037e018864"
      }
    ]
  },
  "istanbul": {
    "kysymykset": [
      "Mikä halkaisee Istanbulin valomeren?",
      "Miksi Istanbulia kutsutaan mannerten risteykseksi?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä halkaisee Istanbulin valomeren?",
        "vastaus": "Tumma, mutkitteleva väylä on Bosporinsalmi, ja siitä länteen haarautuu Kultainen sarvi. Vesi ei loista katujen tavoin, joten salmet piirtyvät 10. toukokuuta 2021 otetussa yökuvassa mustina.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss065e030820",
            "title": "NASA Image Library: ISS065-E-030820"
          }
        ],
        "havaintoId": "iss065e030820"
      },
      {
        "kysymys": "Miksi Istanbulia kutsutaan mannerten risteykseksi?",
        "vastaus": "Kaupunki levittäytyy Bosporinsalmen molemmille rannoille Eurooppaan ja Aasiaan. Jo Byzantionin perustamisesta noin 600-luvulla eaa. lähtien sijainti on tehnyt siitä merikaupan ja kulttuurien tärkeän solmukohdan.",
        "lahteet": [
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/istanbul-turkey-the-crossroads-of-europe-and-asia-4466/",
            "title": "NASA Earth Observatory: Istanbul, Turkey"
          }
        ],
        "havaintoId": "iss065e030820"
      }
    ]
  },
  "sarytsev": {
    "kysymykset": [
      "Puhkaisiko purkaus reiän pilviin?",
      "Missä Sarytševin tulivuori sijaitsee?"
    ],
    "vastaukset": [
      {
        "kysymys": "Puhkaisiko purkaus reiän pilviin?",
        "vastaus": "Sitä ei tiedetä varmasti. NASA kertoo kolmesta kilpailevasta selityksestä: saaren tavallisesta pilvivana-aukosta, purkauksen paineaallosta tai purkauspatsaan sivuilla laskevasta, pilviä haihduttavasta ilmasta.",
        "lahteet": [
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/sarychev-peak-eruption-kuril-islands-38985/",
            "title": "NASA Science: Sarychev Peak Eruption, Kuril Islands"
          }
        ],
        "havaintoId": "iss020e009048"
      },
      {
        "kysymys": "Missä Sarytševin tulivuori sijaitsee?",
        "vastaus": "Sarytšev kohoaa Matua-saaren luoteispäässä Venäjän Kuriileilla, Japanista koilliseen. Se kuuluu saarijonon aktiivisimpiin tulivuoriin; tämä varhainen purkausvaihe kuvattiin 12. kesäkuuta 2009.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss020e009048",
            "title": "NASA Image Library: ISS020-E-009048"
          }
        ],
        "havaintoId": "iss020e009048"
      }
    ]
  },
  "siveluts": {
    "kysymykset": [
      "Mitä Šivelutšin huipulta kulkeutuu länteen?",
      "Miksi Šivelutšia seurataan satelliiteilla?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä Šivelutšin huipulta kulkeutuu länteen?",
        "vastaus": "Kuvassa näkyy pääasiassa höyryä ja luultavasti vähän tuhkaa sisältävä vana. Tuuli kuljetti vanan länteen 21. maaliskuuta 2007, ennen voimakkaampia purkauksia kuun lopussa.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss014e17165",
            "title": "NASA Image Library: ISS014-E-17165"
          }
        ],
        "havaintoId": "iss014e17165"
      },
      {
        "kysymys": "Miksi Šivelutšia seurataan satelliiteilla?",
        "vastaus": "Kamtšatka on vaikeakulkuinen ja harvaan asuttu, joten mittalaitteiden ylläpito maastossa on hankalaa. Tulivuoren tuhka voi silti nousta vilkkaasti liikennöityyn Tyynenmeren ilmatilaan, joten satelliitit ovat tärkeitä vartijoita.",
        "lahteet": [
          {
            "url": "https://earthobservatory.nasa.gov/images/144854/ash-and-snow-at-shiveluch",
            "title": "NASA Earth Observatory: Ash and Snow at Shiveluch"
          }
        ],
        "havaintoId": "iss014e17165"
      }
    ]
  },
  "popocatepetl": {
    "kysymykset": [
      "Mikä kohoaa Popocatépetlin kraatterista?",
      "Kuinka lähellä Mexico Cityä tulivuori on?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä kohoaa Popocatépetlin kraatterista?",
        "vastaus": "Kraatterista nousee ohut vana aktiivisen tulivuoren yllä. Tämä Popocatépetlin näkymä kuvattiin 25. tammikuuta 2021, joten se ei kerro tulivuoren tämänhetkisestä tilanteesta.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss064e026423",
            "title": "NASA Image Library: ISS064-E-026423"
          }
        ],
        "havaintoId": "iss064e026423"
      },
      {
        "kysymys": "Kuinka lähellä Mexico Cityä tulivuori on?",
        "vastaus": "Popocatépetl sijaitsee noin 70 kilometrin päässä Mexico Citystä. NASA seuraa sen rikkidioksidipäästöjä satelliiteilla: myös luonnon oma tulivuori voi olla suuri ilmakehän kaasujen lähde.",
        "lahteet": [
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/the-ups-and-downs-of-sulfur-dioxide-in-north-america-90276/",
            "title": "NASA Earth Observatory: The Ups and Downs of Sulfur Dioxide"
          }
        ],
        "havaintoId": "iss064e026423"
      }
    ]
  },
  "fuji": {
    "kysymykset": [
      "Miksi Fuji näyttää ylhäältä lähes tähtimäiseltä?",
      "Onko Fuji sammunut tulivuori?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Fuji näyttää ylhäältä lähes tähtimäiseltä?",
        "vastaus": "Keskellä on tumma huippukraatteri, ja lumi korostaa siitä säteittäin laskevia uurteita. Lähes suoraan ylhäältä 10. huhtikuuta 2026 kuvattu kartio on niin säännöllinen, että sen tunnistaa heti.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss074e0459342",
            "title": "NASA Image Library: ISS074-E-0459342"
          }
        ],
        "havaintoId": "iss074e0459342"
      },
      {
        "kysymys": "Onko Fuji sammunut tulivuori?",
        "vastaus": "Ei, Fuji luokitellaan edelleen aktiiviseksi ja sitä valvotaan ympäri vuorokauden. Suuri purkaus ei ole kuitenkaan toistunut vuoden 1707 jälkeen — pitkä hiljaisuus ei tee tulivuoresta sammunutta.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss074e0459342",
            "title": "NASA Image Library: ISS074-E-0459342"
          }
        ],
        "havaintoId": "iss074e0459342"
      }
    ]
  },
  "tokio": {
    "kysymykset": [
      "Miksi Tokion valoissa näkyy helmijonoja?",
      "Mikä on Suur-Tokio?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Tokion valoissa näkyy helmijonoja?",
        "vastaus": "Kirkkaat pisteketjut seuraavat suuria rautatielinjoja ja niiden asemia Tokionlahden ympärillä. Kuva otettiin noin neljältä aamulla 18. lokakuuta 2025, mutta liikenneverkko piirtyi silti valoon.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss073e0918643",
            "title": "NASA Image Library: ISS073-E-0918643"
          }
        ],
        "havaintoId": "iss073e0918643"
      },
      {
        "kysymys": "Mikä on Suur-Tokio?",
        "vastaus": "Suur-Tokio tarkoittaa Tokion ja sitä ympäröivien kaupunkien laajaa metropolialuetta. Kuvan valomeri kiertää Tokionlahtea ja jatkuu kauas keskustan ulkopuolelle rautatielinjojen mukana.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss073e0918643",
            "title": "NASA Image Library: ISS073-E-0918643"
          }
        ],
        "havaintoId": "iss073e0918643"
      }
    ]
  },
  "korea": {
    "kysymykset": [
      "Mitä Korean niemimaan pimeys oikeastaan kertoo?",
      "Milloin Koreoiden rajavyöhyke syntyi?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä Korean niemimaan pimeys oikeastaan kertoo?",
        "vastaus": "Yökuva näyttää keinovalon ja sähkönkäytön eron, ei ihmisten puuttumista. Pohjois-Korea erottuu Etelä-Koreaa ja Kiinaa paljon tummempana, mutta Pjongjang näkyy pienenä valosaarekkeena.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss038e038300",
            "title": "NASA Image Library: ISS038-E-038300"
          }
        ],
        "havaintoId": "iss038e038300"
      },
      {
        "kysymys": "Milloin Koreoiden rajavyöhyke syntyi?",
        "vastaus": "Koreoiden välinen demilitarisoitu vyöhyke perustettiin vuoden 1953 aselevossa. Yökuvassa rajan huomaa ennen kaikkea valaistuksen jyrkästä muutoksesta, ei itse rajaviivan hohteesta.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss038e038300",
            "title": "NASA Image Library: ISS038-E-038300"
          },
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/the-korean-peninsula-at-night-153325/",
            "title": "NASA Earth Observatory: The Korean Peninsula at Night"
          }
        ],
        "havaintoId": "iss038e038300"
      }
    ]
  },
  "dubai": {
    "kysymykset": [
      "Mitkä keinosaaret kuvassa erottuvat?",
      "Milloin Dubain keinosaarten rakentaminen alkoi?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitkä keinosaaret kuvassa erottuvat?",
        "vastaus": "Kuvassa näkyvät Palm Jebel Ali, Palm Jumeirah ja The World -saaristo. Ne on rakennettu Dubain Persianlahden-rannikolle, mutta koko kuvassa näkyvä rantaviiva ei ole keinotekoinen.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss073e0247372",
            "title": "NASA Image Library: ISS073-E-0247372"
          }
        ],
        "havaintoId": "iss073e0247372"
      },
      {
        "kysymys": "Milloin Dubain keinosaarten rakentaminen alkoi?",
        "vastaus": "Palm Jumeirahin rakentaminen alkoi vuonna 2001 ja The Worldin vuonna 2003. Saaristojen muodot suunniteltiin ihmisten pöydillä, eivätkä niiden palmut ja maailmankartta ole luonnon sattumaa.",
        "lahteet": [
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/artificial-archipelagos-dubai-united-arab-emirates-42477/",
            "title": "NASA Earth Observatory: Artificial Archipelagos, Dubai"
          },
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss073e0247372",
            "title": "NASA Image Library: ISS073-E-0247372"
          }
        ],
        "havaintoId": "iss073e0247372"
      }
    ]
  },
  "niilin-suisto": {
    "kysymykset": [
      "Miksi Niili muodostaa yöllä valoviuhkan?",
      "Miksi Niilin suisto on Egyptille niin tärkeä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Niili muodostaa yöllä valoviuhkan?",
        "vastaus": "Asutus ja tiet seuraavat Niilin kapeaa laaksoa ja leviävät pohjoisessa suiston haaroille. Keinovalot piirtävät siksi joen ja suiston muodon, kun ympäröivä vähävaloinen aavikko jää tummaksi.",
        "lahteet": [
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/nile-river-delta-at-night-46820/",
            "title": "NASA Earth Observatory: Nile River Delta at Night"
          },
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss037e004654",
            "title": "NASA Image Library: ISS037-E-004654"
          }
        ],
        "havaintoId": "iss037e004654"
      },
      {
        "kysymys": "Miksi Niilin suisto on Egyptille niin tärkeä?",
        "vastaus": "Niilin vesi ja hedelmällinen maa ovat tehneet laaksosta ja suistosta Egyptin asutuksen ja viljelyn ytimen. Ympäröivään aavikkoon verrattuna elämälle otollinen alue on kapea — sen muoto näkyy jopa yövaloissa.",
        "lahteet": [
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/city-lights-illuminate-the-nile-79807/",
            "title": "NASA Earth Observatory: City Lights Illuminate the Nile"
          }
        ],
        "havaintoId": "iss037e004654"
      }
    ]
  },
  "richat": {
    "kysymykset": [
      "Onko Saharan silmä törmäyskraatteri?",
      "Miksi astronautit tuntevat Richat-rakenteen?"
    ],
    "vastaukset": [
      {
        "kysymys": "Onko Saharan silmä törmäyskraatteri?",
        "vastaus": "Ei ole. Richat on kohonnut geologinen kupoli, jonka eri tavoin kuluvat kivikerrokset ovat paljastuneet sisäkkäisiksi renkaiksi — kuin valtava kalliosta tehty maalitaulu keskellä Saharaa.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss069e005471",
            "title": "NASA Image Library: ISS069-E-005471"
          },
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/richat-structure-92071/",
            "title": "NASA Earth Observatory: Richat Structure"
          }
        ],
        "havaintoId": "iss069e005471"
      },
      {
        "kysymys": "Miksi astronautit tuntevat Richat-rakenteen?",
        "vastaus": "Selvä rengaskuvio erottuu Mauritanian muuten laajassa aavikkomaisemassa poikkeuksellisen hyvin. NASA kertoo sen kiehtoneen astronautteja lähes koko miehitettyjen avaruuslentojen ajan.",
        "lahteet": [
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/richat-structure-92071/",
            "title": "NASA Earth Observatory: Richat Structure"
          }
        ],
        "havaintoId": "iss069e005471"
      }
    ]
  },
  "namib": {
    "kysymykset": [
      "Mikä piirtää Namibin dyynit riveiksi?",
      "Kuinka vanha Namibin autiomaa on?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä piirtää Namibin dyynit riveiksi?",
        "vastaus": "Voimakkaat ja pitkäkestoiset rannikkotuulet siirtävät hiekkaa ja rakentavat dyyneistä toistuvia harjanteita. Tässä 20. elokuuta 2025 otetussa kuvassa dyynit ovat lähellä Atlantin rannikkoa.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss073e0511487",
            "title": "NASA Image Library: ISS073-E-0511487"
          },
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/linear-dunes-namib-sand-sea-89136/",
            "title": "NASA Earth Observatory: Linear Dunes, Namib Sand Sea"
          }
        ],
        "havaintoId": "iss073e0511487"
      },
      {
        "kysymys": "Kuinka vanha Namibin autiomaa on?",
        "vastaus": "Namibin autiomaan arvellaan olevan yli 30 miljoonaa vuotta vanha. Dyynimeren vanhojen hiekkakerrostumien päälle on kasautunut nuorempaa hiekkaa, joten maisemassa on monta ikäkerrosta.",
        "lahteet": [
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/linear-dunes-namib-sand-sea-89136/",
            "title": "NASA Earth Observatory: Linear Dunes, Namib Sand Sea"
          },
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/between-the-ripples-of-the-namib-sand-sea-92695/",
            "title": "NASA Earth Observatory: Between the Ripples of the Namib Sand Sea"
          }
        ],
        "havaintoId": "iss073e0511487"
      }
    ]
  },
  "betsiboka": {
    "kysymykset": [
      "Miksi Betsibokan vesi on ruosteenpunaista?",
      "Miten Bombetokanlahden saarekkeet syntyvät?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Betsibokan vesi on ruosteenpunaista?",
        "vastaus": "Joki kuljettaa Bombetokanlahteen runsaasti rautapitoista maa-ainesta, joka värjää veden punaruskeaksi. Kuvan väri kertoo siis vedessä leijuvasta sedimentistä, ei itse veden pysyvästä väristä.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss071e218069",
            "title": "NASA Image Library: ISS071-E-218069"
          }
        ],
        "havaintoId": "iss071e218069"
      },
      {
        "kysymys": "Miten Bombetokanlahden saarekkeet syntyvät?",
        "vastaus": "Betsibokan tuoma sedimentti kasaantuu suistoon hiekkasärkiksi ja saariksi. Joen virtaus ja vuoroveden edestakainen liike muotoilevat niitä yhä, joten lahden kartta elää hitaasti.",
        "lahteet": [
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/bombetoka-bay-madagascar-5245/",
            "title": "NASA Earth Observatory: Bombetoka Bay, Madagascar"
          }
        ],
        "havaintoId": "iss071e218069"
      }
    ]
  },
  "gibraltar": {
    "kysymykset": [
      "Mitkä kaksi mannerta kuva erottaa?",
      "Mitä meriä Gibraltarinsalmi yhdistää?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitkä kaksi mannerta kuva erottaa?",
        "vastaus": "Gibraltarinsalmen pohjoisrannalla on Espanja Euroopassa ja etelärannalla Marokko Afrikassa. Astronautti Butch Wilmore kuvasi tämän kapean sinisen väylän 25. kesäkuuta 2024.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss071e217183",
            "title": "NASA Image Library: ISS071-E-217183"
          }
        ],
        "havaintoId": "iss071e217183"
      },
      {
        "kysymys": "Mitä meriä Gibraltarinsalmi yhdistää?",
        "vastaus": "Salmi yhdistää Atlantin valtameren Välimereen. Pinnalla vähäsuolaisempaa Atlantin vettä virtaa itään, samalla kun syvempi, suolaisempi Välimeren vesi kulkee länteen.",
        "lahteet": [
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/solitons-strait-of-gibraltar-4585/",
            "title": "NASA Earth Observatory: Solitons, Strait of Gibraltar"
          }
        ],
        "havaintoId": "iss071e217183"
      }
    ]
  },
  "bahama": {
    "kysymykset": [
      "Miksi Bahaman vesi vaihtaa turkoosista siniseksi?",
      "Mistä Bahaman matalikot ovat rakentuneet?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Bahaman vesi vaihtaa turkoosista siniseksi?",
        "vastaus": "Turkoosi paljastaa matalan veden ja vaalean kalkkihiekkapohjan, joka heijastaa valoa takaisin. Kun merenpohja putoaa syvemmälle, väri tummuu nopeasti syvänsiniseksi — tästä näkymästä pidän erityisesti.",
        "lahteet": [
          {
            "url": "https://earthobservatory.nasa.gov/images/89060/little-bahama-bank",
            "title": "NASA Earth Observatory: Little Bahama Bank"
          },
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss071e449837",
            "title": "NASA Image Library: ISS071-E-449837"
          }
        ],
        "havaintoId": "iss071e449837"
      },
      {
        "kysymys": "Mistä Bahaman matalikot ovat rakentuneet?",
        "vastaus": "Suuret Bahaman pankit ovat kalkkikivitasanteita, joille on kertynyt karbonaattihiekkaa hyvin pitkään. Kalkkikivi syntyy muun muassa korallien ja huokoseläinten kalkkipitoisista jäännöksistä.",
        "lahteet": [
          {
            "url": "https://earthobservatory.nasa.gov/blogs/earthmatters/2014/01/16/",
            "title": "NASA Earth Matters: Great Bahama Bank"
          }
        ],
        "havaintoId": "iss071e449837"
      }
    ]
  },
  "new-york": {
    "kysymykset": [
      "Mikä tumma suorakulmio on keskellä Manhattania?",
      "Mitä aluetta New Yorkin valomeri kattaa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä tumma suorakulmio on keskellä Manhattania?",
        "vastaus": "Se on Central Park, joka erottuu ympäröivästä katuvalojen ruudukosta tummana alueena. Myös Hudson- ja East River sekä satama jäävät pimeiksi, kun sillat piirtyvät kapeina valojuovina.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss064e016772",
            "title": "NASA Image Library: ISS064-E-016772"
          },
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/new-york-city/",
            "title": "NASA Earth Observatory: New York City"
          }
        ],
        "havaintoId": "iss064e016772"
      },
      {
        "kysymys": "Mitä aluetta New Yorkin valomeri kattaa?",
        "vastaus": "Valomeri jatkuu New Yorkin kaupungista ympäröivälle metropolialueelle New Yorkin ja New Jerseyn osavaltioihin. Kaupungin hallinnolliset rajat eivät siis rajaa tätä yhtenäisen näköistä yömaisemaa.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss064e016772",
            "title": "NASA Image Library: ISS064-E-016772"
          }
        ],
        "havaintoId": "iss064e016772"
      }
    ]
  },
  "manicouagan": {
    "kysymykset": [
      "Miksi Manicouagan näyttää valtavalta renkaalta?",
      "Missä Manicouaganin kraatteri sijaitsee?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Manicouagan näyttää valtavalta renkaalta?",
        "vastaus": "Muoto on vanhan meteoriittitörmäyksen monirengaskraatteri. Sen näkyvin osa on noin 70 kilometriä leveä rengasmainen tekojärvi, joka ympäröi keskelle jäänyttä saariylänköä.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss034e052297",
            "title": "NASA Image Library: ISS034-E-052297"
          }
        ],
        "havaintoId": "iss034e052297"
      },
      {
        "kysymys": "Missä Manicouaganin kraatteri sijaitsee?",
        "vastaus": "Kraatteri sijaitsee Québecin Côte-Nordissa Kanadassa, noin 300 kilometriä Baie-Comeausta pohjoiseen. Se on yksi vanhimmista suurista törmäysrakenteista, jotka yhä erottuvat Maan pinnalla.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss034e052297",
            "title": "NASA Image Library: ISS034-E-052297"
          }
        ],
        "havaintoId": "iss034e052297"
      }
    ]
  },
  "grand-canyon": {
    "kysymykset": [
      "Miksi sivurotkot haarautuvat kuin puu?",
      "Onko kanjoni yhtä vanha kuin sen kivet?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi sivurotkot haarautuvat kuin puu?",
        "vastaus": "Coloradojoki leikkaa pääuomaa alaspäin, ja sade, lumen sulamisvesi sekä sivupurot kuluttavat rinteitä siihen liittyviksi haaroiksi. Talven lumi ja pitkät varjot tekevät verkostosta erityisen näkyvän.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss074e0208838",
            "title": "NASA Image Library: ISS074-E-0208838"
          },
          {
            "url": "https://www.nps.gov/grca/learn/nature/grca-geology.htm",
            "title": "National Park Service: Grand Canyon Geology"
          }
        ],
        "havaintoId": "iss074e0208838"
      },
      {
        "kysymys": "Onko kanjoni yhtä vanha kuin sen kivet?",
        "vastaus": "Ei: kanjoni on syntynyt pääosin viimeisten viiden tai kuuden miljoonan vuoden aikana. Sen seinämissä paljastuu silti jopa noin 1,8 miljardin vuoden ikäisiä kiviä — aivan eri aikakausien kerroskakku.",
        "lahteet": [
          {
            "url": "https://www.nps.gov/grca/learn/nature/grca-geology.htm",
            "title": "National Park Service: Grand Canyon Geology"
          }
        ],
        "havaintoId": "iss074e0208838"
      }
    ]
  },
  "lago-argentino": {
    "kysymykset": [
      "Miksi Lago Argentino hohtaa turkoosina?",
      "Mikä kansallispuisto liittyy Lago Argentinoon?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Lago Argentino hohtaa turkoosina?",
        "vastaus": "Jäätiköt jauhavat kalliota hyvin hienoksi jäätikköjauhoksi ja kuljettavat sitä järveen. Vedessä leijuvat vaaleat hiukkaset sirottavat valoa niin, että järvi näyttää avaruudesta maitomaisen turkoosilta.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss074e0573516",
            "title": "NASA Image Library: ISS074-E-0573516"
          },
          {
            "url": "https://earthobservatory.nasa.gov/images/145156/los-glaciares-national-park-argentina",
            "title": "NASA Earth Observatory: Los Glaciares National Park"
          }
        ],
        "havaintoId": "iss074e0573516"
      },
      {
        "kysymys": "Mikä kansallispuisto liittyy Lago Argentinoon?",
        "vastaus": "Järven länsipäähän laskevat jäätiköt kuuluvat Los Glaciaresin kansallispuistoon Argentiinan Patagoniassa. Vain osa Lago Argentinosta kuuluu suojelualueeseen, mutta puiston jäätiköt syöttävät sen vesiä.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss074e0573516",
            "title": "NASA Image Library: ISS074-E-0573516"
          },
          {
            "url": "https://whc.unesco.org/en/list/145",
            "title": "UNESCO World Heritage Centre: Los Glaciares National Park"
          }
        ],
        "havaintoId": "iss074e0573516"
      }
    ]
  },
  "ucayali": {
    "kysymykset": [
      "Miksi Ucayalin vierellä näkyy kaarevia järviä?",
      "Miten Ucayali liittyy Amazonjokeen?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Ucayalin vierellä näkyy kaarevia järviä?",
        "vastaus": "Joki kuluttaa mutkien ulkoreunaa ja kasaa ainesta sisäreunalle, jolloin mutka kasvaa. Kun joenuoma oikaisee mutkan kaulan poikki, vanha kaari voi jäädä erilliseksi makkarajärveksi.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss074e0492148",
            "title": "NASA Image Library: ISS074-E-0492148"
          },
          {
            "url": "https://earthobservatory.nasa.gov/images/3717/changes-in-the-mamore-river-bolivia",
            "title": "NASA Earth Observatory: Changes in the Mamore River"
          }
        ],
        "havaintoId": "iss074e0492148"
      },
      {
        "kysymys": "Miten Ucayali liittyy Amazonjokeen?",
        "vastaus": "Ucayali on suuri Amazonin sivujoki ja yksi sen pääasiallisista latvahaaroista keskisessä Perussa. Kuvassa se virtaa alavan Amazonin sademetsän halki ja rakentaa jatkuvasti uutta uomaansa.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss074e0492148",
            "title": "NASA Image Library: ISS074-E-0492148"
          }
        ],
        "havaintoId": "iss074e0492148"
      }
    ]
  },
  "taifuuni": {
    "kysymykset": [
      "Miksi taifuunin silmä on pilvetön?",
      "Mikä myrsky kuvassa pyörii?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi taifuunin silmä on pilvetön?",
        "vastaus": "Silmässä ilma laskeutuu, puristuu ja lämpenee, mikä kuivattaa sitä ja hajottaa pilviä. Sen ympärillä kohoaa silmäseinämä: ukkospilvien rengas, jossa rankkasade ja myrskyn kovimmat tuulet riehuvat.",
        "lahteet": [
          {
            "url": "https://science.nasa.gov/earth/natural-disasters/hurricanes-typhoons/hurricanes-the-greatest-storms-on-earth/",
            "title": "NASA Science: Hurricanes, the Greatest Storms on Earth"
          }
        ],
        "havaintoId": "iss073e1044643"
      },
      {
        "kysymys": "Mikä myrsky kuvassa pyörii?",
        "vastaus": "Kuvassa on taifuuni Halong Japanin eteläpuolella 8. lokakuuta 2025. Se oli kuvaushetkellä neljännen luokan myrsky, joten kaunis pilvispiraali peittää alleen hyvin voimakkaat tuulet.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss073e1044643",
            "title": "NASA Image Library: ISS073-E-1044643"
          }
        ],
        "havaintoId": "iss073e1044643"
      }
    ]
  },
  "revontulet-etela": {
    "kysymykset": [
      "Miksi etelän revontulet ovat vihreitä ja punaisia?",
      "Missä tämä etelän revontuli kuvattiin?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi etelän revontulet ovat vihreitä ja punaisia?",
        "vastaus": "Auringosta tulevat hiukkaset virittävät yläilmakehän atomeja, jotka vapauttavat energian valona. Happi hohtaa tavallisesti vihreänä noin 100–200 kilometrissä ja punaisena yleensä yli 200 kilometrissä.",
        "lahteet": [
          {
            "url": "https://science.nasa.gov/sun/auroras/",
            "title": "NASA Science: Auroras"
          }
        ],
        "havaintoId": "iss073e0256896"
      },
      {
        "kysymys": "Missä tämä etelän revontuli kuvattiin?",
        "vastaus": "Revontuli kuvattiin Uuden-Seelannin kaakkoispuolella Tyynenmeren yllä 3. kesäkuuta 2025. Eteläisen pallonpuoliskon revontulia kutsutaan nimellä aurora australis; sama ilmiö valaisee myös pohjoisen taivasta.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss073e0256896",
            "title": "NASA Image Library: ISS073-E-0256896"
          },
          {
            "url": "https://science.nasa.gov/sun/auroras/",
            "title": "NASA Science: Auroras"
          }
        ],
        "havaintoId": "iss073e0256896"
      }
    ]
  },
  "revontulet-pohjoinen": {
    "kysymykset": [
      "Miksi punainen hohde on vihreän yläpuolella?",
      "Missä pohjoisen valoverho kuvattiin?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi punainen hohde on vihreän yläpuolella?",
        "vastaus": "Punainen valo syntyy harvemmassa ilmassa korkeammalla kuin tavallinen vihreä happihehku. NASA sijoittaa vihreän yleensä noin 100–200 kilometriin ja punaisen yli 200 kilometriin, joten värit kerrostuvat.",
        "lahteet": [
          {
            "url": "https://science.nasa.gov/sun/auroras/",
            "title": "NASA Science: Auroras"
          }
        ],
        "havaintoId": "iss072e451060"
      },
      {
        "kysymys": "Missä pohjoisen valoverho kuvattiin?",
        "vastaus": "Punavihreä revontuli kuvattiin Kanadan Saint Lawrencenlahden yllä 4. tammikuuta 2025. Pohjoisen revontulien nimi aurora borealis tarkoittaa pohjoista aamunkoittoa — aika osuva nimi tälle hohteelle.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss072e451060",
            "title": "NASA Image Library: ISS072-E-451060"
          },
          {
            "url": "https://science.nasa.gov/sun/auroras/",
            "title": "NASA Science: Auroras"
          }
        ],
        "havaintoId": "iss072e451060"
      }
    ]
  },
  "himalaja": {
    "kysymykset": [
      "Miksi Himalajan puolet ovat erivärisiä?",
      "Miten Himalaja syntyi?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Himalajan puolet ovat erivärisiä?",
        "vastaus": "Vuoristo pysäyttää kosteaa ilmaa Nepalin puolelle, missä metsät ovat vihreämpiä. Pohjoisessa Tiibetin ylätasanko jää paljon kuivemmaksi ja näkyy ruskeana — vuorijono toimii kuvassa ilmaston rajana.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss074e0603570",
            "title": "NASA Image Library: ISS074-E-0603570"
          }
        ],
        "havaintoId": "iss074e0603570"
      },
      {
        "kysymys": "Miten Himalaja syntyi?",
        "vastaus": "Himalaja kohosi, kun Intian mannerlaatta törmäsi Aasiaan ja maankuori rypistyi vuorijonoksi. Vuorten korkeus ei siis syntynyt tulivuoren purkauksista vaan valtavien mannerlaattojen kohtaamisesta.",
        "lahteet": [
          {
            "url": "https://earthobservatory.nasa.gov/Features/Wegener/wegener_4.php",
            "title": "NASA Earth Observatory: Alfred Wegener"
          }
        ],
        "havaintoId": "iss074e0603570"
      }
    ]
  },
  "goidhoo": {
    "kysymykset": [
      "Mitä Goidhoon vaaleat reunat ovat?",
      "Miksi Goidhoo kuvattiin tammikuussa 2005?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä Goidhoon vaaleat reunat ovat?",
        "vastaus": "Vaaleat alueet ovat matalaa koralliriuttaa ja hiekkapohjaa, jotka heijastavat enemmän valoa kuin syvä meri. Tummansininen ympärillä kertoo veden syvenevän nopeasti atollin ulkopuolella.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss010e12917",
            "title": "NASA Image Library: ISS010-E-12917"
          },
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/amazing-atolls-of-the-maldives/",
            "title": "NASA Earth Observatory: Amazing Atolls of the Maldives"
          }
        ],
        "havaintoId": "iss010e12917"
      },
      {
        "kysymys": "Miksi Goidhoo kuvattiin tammikuussa 2005?",
        "vastaus": "Kuva kuului sarjaan, jonka avaruusaseman miehistö otti vuoden 2004 Intian valtameren tsunamin jälkeen. NASA tutki Malediivien mahdollisia vaurioita ja arvioi koralliriuttojen lieventäneen aaltojen vaikutusta.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss010e12917",
            "title": "NASA Image Library: ISS010-E-12917"
          }
        ],
        "havaintoId": "iss010e12917"
      }
    ]
  },
  "bermuda": {
    "kysymykset": [
      "Miksi Bermudan ympärillä on vaaleansininen kehä?",
      "Onko Bermuda yksi saari?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Bermudan ympärillä on vaaleansininen kehä?",
        "vastaus": "Vaalea vesi peittää matalaa riuttatasannetta, kun taas sen ulkopuolella Pohjois-Atlantti syvenee ja tummuu. Saariketjun mutkitteleva koukkumuoto erottuu siksi avaruudesta hämmästyttävän terävänä.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss071e206529",
            "title": "NASA Image Library: ISS071-E-206529"
          },
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/bermuda-7397/",
            "title": "NASA Earth Observatory: Bermuda"
          }
        ],
        "havaintoId": "iss071e206529"
      },
      {
        "kysymys": "Onko Bermuda yksi saari?",
        "vastaus": "Ei, Bermuda on yli 180 saaren ja luodon saaristo Pohjois-Atlantilla. Avaruusaseman 19. kesäkuuta 2024 ottamassa kuvassa pienet saaret näyttävät lähes yhtenäiseltä koukulta.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss071e206529",
            "title": "NASA Image Library: ISS071-E-206529"
          }
        ],
        "havaintoId": "iss071e206529"
      }
    ]
  },
  "bazaruto": {
    "kysymykset": [
      "Mikä tekee Bazaruton veteen turkoosit kuviot?",
      "Kuinka kauan Bazarutossa on asuttu?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä tekee Bazaruton veteen turkoosit kuviot?",
        "vastaus": "Vuorovesi ja virtaukset siirtävät vaaleaa hiekkaa matalikoilla, muovaavat hiekkasärkkiä ja kaivavat tummempia kanavia. Kuviot eivät ole maalattuja: koko hiekkakartta järjestyy uudelleen veden mukana.",
        "lahteet": [
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/bazaruto-archipelago-national-park-154448/",
            "title": "NASA Earth Observatory: Bazaruto Archipelago National Park"
          }
        ],
        "havaintoId": "iss065e009427"
      },
      {
        "kysymys": "Kuinka kauan Bazarutossa on asuttu?",
        "vastaus": "Arkeologiset löydöt osoittavat ihmisten asuneen saarilla jo rautakaudella, noin vuosina 200–300 jaa. Meri on yhä saariston asukkaiden tärkeä toimeentulon lähde, erityisesti kalastuksen kautta.",
        "lahteet": [
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/bazaruto-archipelago-national-park-154448/",
            "title": "NASA Earth Observatory: Bazaruto Archipelago National Park"
          }
        ],
        "havaintoId": "iss065e009427"
      }
    ]
  },
  "quirimbas": {
    "kysymykset": [
      "Miksi Quirimbasin saarten reunat hohtavat?",
      "Millainen saaristo Quirimbas on?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Quirimbasin saarten reunat hohtavat?",
        "vastaus": "Vaaleansininen ja vihreä vesi paljastaa matalia koralliriuttoja, hiekkasärkkiä ja meriruohikkoa. Ulompana syvä Intian valtameri näkyy tummansinisenä, joten veden väri auttaa lukemaan merenpohjaa.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss071e378497",
            "title": "NASA Image Library: ISS071-E-378497"
          },
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/quirimbas-islands-150933/",
            "title": "NASA Earth Observatory: Quirimbas Islands"
          }
        ],
        "havaintoId": "iss071e378497"
      },
      {
        "kysymys": "Millainen saaristo Quirimbas on?",
        "vastaus": "Quirimbas koostuu 32 saaresta Mosambikin edustalla läntisellä Intian valtamerellä. Koralliriutat, mangrovemetsät ja hiekkasärkät liittävät osan saarista maisemallisesti mannermaahan.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss071e378497",
            "title": "NASA Image Library: ISS071-E-378497"
          }
        ],
        "havaintoId": "iss071e378497"
      }
    ]
  },
  "turks-caicos": {
    "kysymykset": [
      "Miksi saaret ovat vain ohuita viivoja?",
      "Missä Turks- ja Caicossaaret sijaitsevat?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi saaret ovat vain ohuita viivoja?",
        "vastaus": "Matalat saaret kohoavat laajojen koralliriuttojen ympäröimiltä matalikoilta. Turkoosi vesi näyttää riuttojen ja vaalean pohjan paikat, kun syvä meri niiden ulkopuolella tummuu siniseksi.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss073e0118628",
            "title": "NASA Image Library: ISS073-E-0118628"
          },
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/grand-turk-and-salt-cay-islands-38238/",
            "title": "NASA Earth Observatory: Grand Turk and Salt Cay Islands"
          }
        ],
        "havaintoId": "iss073e0118628"
      },
      {
        "kysymys": "Missä Turks- ja Caicossaaret sijaitsevat?",
        "vastaus": "Saaristo sijaitsee Atlantilla Bahamasta kaakkoon ja on Britannian merentakainen alue. Tämän laajan matalikon avaruusasema kuvasi 26. toukokuuta 2025.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss073e0118628",
            "title": "NASA Image Library: ISS073-E-0118628"
          }
        ],
        "havaintoId": "iss073e0118628"
      }
    ]
  },
  "mayotte": {
    "kysymykset": [
      "Mikä rengas ympäröi Mayotten saaria?",
      "Missä Mayotte sijaitsee ja miten se syntyi?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä rengas ympäröi Mayotten saaria?",
        "vastaus": "Saarten ympärillä kaartuu valliriutta, jonka sisään jää suuri laguuni. Matalat riutat näkyvät vaaleina, kun niiden ulkopuolinen Mosambikin kanaalin syvempi vesi tummuu lähes mustansiniseksi.",
        "lahteet": [
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/mayottes-lagoon-151046/",
            "title": "NASA Earth Observatory: Mayotte’s Lagoon"
          },
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss071e345427",
            "title": "NASA Image Library: ISS071-E-345427"
          }
        ],
        "havaintoId": "iss071e345427"
      },
      {
        "kysymys": "Missä Mayotte sijaitsee ja miten se syntyi?",
        "vastaus": "Mayotte sijaitsee Mosambikin kanaalissa Madagaskarin ja Mosambikin välissä. Se on Komorien saariston vanhin saari, jonka tulivuoret rakensivat ennen kuin meri ja koralliriutat muovasivat sen rantoja.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=iss071e345427",
            "title": "NASA Image Library: ISS071-E-345427"
          },
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/mayottes-lagoon-151046/",
            "title": "NASA Earth Observatory: Mayotte’s Lagoon"
          }
        ],
        "havaintoId": "iss071e345427"
      }
    ]
  },
  "galapagos": {
    "kysymykset": [
      "Miksi Galápagossaarissa näkyy pyöreitä kuoppia?",
      "Miksi Darwinin vuoden 1835 käynti muistetaan?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Galápagossaarissa näkyy pyöreitä kuoppia?",
        "vastaus": "Saaret ovat tuliperäisiä, ja pyöreät kuopat ovat tulivuorten huippujen kraattereita ja kalderoita. Kaldera on laaja painanne, joka syntyy huipun romahtaessa magmasäiliön tyhjentyessä.",
        "lahteet": [
          {
            "url": "https://images-api.nasa.gov/search?nasa_id=STS099-753-032",
            "title": "NASA Image Library: STS099-753-032"
          },
          {
            "url": "https://www.usgs.gov/observatories/yvo/news/caldera-or-craterwhats-difference",
            "title": "USGS: Caldera or crater…what’s the difference?"
          },
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/fernandina-island-galapagos-2690/",
            "title": "NASA Earth Observatory: Fernandina Island, Galapagos"
          }
        ],
        "havaintoId": "STS099-753-032"
      },
      {
        "kysymys": "Miksi Darwinin vuoden 1835 käynti muistetaan?",
        "vastaus": "Darwin tarkkaili saariston erikoisia eläimiä, ja havainnot auttoivat häntä kehittämään ajatuksia luonnonvalinnasta. UNESCO kuvaa Galápagosta eläväksi evoluution museoksi, jonka eristyneisyys synnytti ainutlaatuista lajistoa.",
        "lahteet": [
          {
            "url": "https://whc.unesco.org/en/list/1",
            "title": "UNESCO World Heritage Centre: Galápagos Islands"
          }
        ],
        "havaintoId": "STS099-753-032"
      }
    ]
  },
  "onekotan": {
    "kysymykset": [
      "Miksi vuori näyttää olevan järven sisällä?",
      "Millainen paikka Onekotan on?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi vuori näyttää olevan järven sisällä?",
        "vastaus": "Vuoden 2024 kuvassa Krenitsynin tulivuoren kartio kohoaa Tao-Rusyrin kalderan keskeltä, ja sitä ympäröi rengasmainen järvi. Näky on niin siisti, että tekisi mieli kiertää koko rengas siivillä.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss071e046421",
            "title": "NASA: Onekotan, an uninhabited volcanic island"
          },
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/tao-rusyr-caldera-onekotan-island-kuril-islands-40891/",
            "title": "NASA Earth Observatory: Tao-Rusyr Caldera, Onekotan Island"
          }
        ],
        "havaintoId": "iss071e046421"
      },
      {
        "kysymys": "Millainen paikka Onekotan on?",
        "vastaus": "Onekotan on asumaton tulivuorisaari Kuriilien pohjoisosassa. Saari kuuluu Tyynenmeren tulirenkaaseen, ja sen eteläpäässä Krenitsynin kartio kohoaa järven täyttämän Tao-Rusyrin kalderan sisältä.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss071e046421",
            "title": "NASA: Onekotan, an uninhabited volcanic island"
          },
          {
            "url": "https://science.nasa.gov/earth/earth-observatory/tao-rusyr-caldera-onekotan-island-kuril-islands-40891/",
            "title": "NASA Earth Observatory: Tao-Rusyr Caldera, Onekotan Island"
          }
        ],
        "havaintoId": "iss071e046421"
      }
    ]
  },
  "mataiva": {
    "kysymykset": [
      "Mitä valkoiset viivat laguunissa ovat?",
      "Mistä Mataivan nimi tulee?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä valkoiset viivat laguunissa ovat?",
        "vastaus": "Vuoden 2010 kuvassa vaaleat harjanteet ovat kuluneiden koralliriuttojen jäänteitä. Ne jakavat Mataivan laguunin pieniksi altaiksi — aivan kuin meri olisi piirtänyt itselleen mosaiikin.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss024e011914",
            "title": "NASA: Earth Observations — Mataiva Atoll"
          }
        ],
        "havaintoId": "iss024e011914"
      },
      {
        "kysymys": "Mistä Mataivan nimi tulee?",
        "vastaus": "Mataiva tarkoittaa tuamotun kielessä yhdeksää silmää, eli saaren yhdeksää kapeaa kanavaa. Pahua on atollin ainoa kylä, ja se sijaitsee laguunin ainoan pysyvästi mereen yhdistyvän solan molemmin puolin.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss024e011914",
            "title": "NASA: Earth Observations — Mataiva Atoll"
          }
        ],
        "havaintoId": "iss024e011914"
      }
    ]
  },
  "seurasaaret": {
    "kysymykset": [
      "Mitkä renkaat kiertävät saaria?",
      "Mihin saariryhmään nämä saaret kuuluvat?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitkä renkaat kiertävät saaria?",
        "vastaus": "Vuoden 1999 sukkulakuvassa Bora Boraa, Tahaa ja Raiateaa ympäröivät koralliriutat. Vaaleat, hienot kehät erottuvat meressä niin selvästi, että kolmen saaren seuraaminen käy yhdellä silmäyksellä.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/sts093-717-066",
            "title": "NASA: Bora-Bora's coral reefs during STS-93"
          }
        ],
        "havaintoId": "sts093-717-066"
      },
      {
        "kysymys": "Mihin saariryhmään nämä saaret kuuluvat?",
        "vastaus": "Bora Bora, Tahaa ja Raiatea kuuluvat Seurasaariin Ranskan Polynesiassa keskisellä eteläisellä Tyynellämerellä. Samaan saariryhmään kuuluu myös Tahiti, vaikka se ei ole tässä rajauksessa mukana.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/sts093-717-066",
            "title": "NASA: Bora-Bora's coral reefs during STS-93"
          }
        ],
        "havaintoId": "sts093-717-066"
      }
    ]
  },
  "al-wadj": {
    "kysymykset": [
      "Mistä veden kirjavat muodot syntyvät?",
      "Miksi Al Wadj on tärkeä meriluonnolle?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mistä veden kirjavat muodot syntyvät?",
        "vastaus": "Joulukuun 2007 kuvassa vain hiekanväriset saaret ovat vedenpinnan yläpuolella. NASA tulkitsee tummanvihreän meriheinäksi ja turkoosit sävyt matalan riuttajärjestelmän vedeksi, mutta väri ei yksin ole syvyysmittari.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss016e019394",
            "title": "NASA: Al Wadj Bank, Saudi Arabia"
          }
        ],
        "havaintoId": "iss016e019394"
      },
      {
        "kysymys": "Miksi Al Wadj on tärkeä meriluonnolle?",
        "vastaus": "Vuoden 2007 kuvaan liittyvässä selosteessa NASA kuvasi Al Wadjin riuttoja hyväkuntoisiksi ja monimuotoisiksi. Seloste mainitsi myös laajat meriheinäniityt ja huomattavan dugongikannan; se ei ole arvio alueen nykytilasta.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss016e019394",
            "title": "NASA: Al Wadj Bank, Saudi Arabia"
          }
        ],
        "havaintoId": "iss016e019394"
      }
    ]
  },
  "ganges": {
    "kysymykset": [
      "Miksi suisto näyttää sokkelolta?",
      "Mikä tekee Gangesin suistosta erityisen?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi suisto näyttää sokkelolta?",
        "vastaus": "Vuoden 1994 kuvassa Gangesin ja Brahmaputran haarat kuljettavat ja kasaavat lietettä ja savea. Siksi saaret ja vesiväylät muodostavat muuttuvan sokkelon Bengalinlahden rannalle — kartta elää joen mukana.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/sts066-92-013",
            "title": "NASA: Ganges River Delta, Bangladesh, India"
          }
        ],
        "havaintoId": "sts066-92-013"
      },
      {
        "kysymys": "Mikä tekee Gangesin suistosta erityisen?",
        "vastaus": "NASA kuvaa sitä maailman suurimmaksi vuorovesien vaikutuspiirissä olevaksi suistoksi. Mangroveliejukot, suokasvillisuus ja hiekkadyynit tekevät siitä tyypillisen mutta poikkeuksellisen laajan trooppisen rannikon.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/sts066-92-013",
            "title": "NASA: Ganges River Delta, Bangladesh, India"
          }
        ],
        "havaintoId": "sts066-92-013"
      }
    ]
  },
  "mississippi-suisto": {
    "kysymykset": [
      "Miten linnunjalan muoto syntyy?",
      "Onko tämä suisto aina ollut samassa paikassa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miten linnunjalan muoto syntyy?",
        "vastaus": "Vuoden 1994 kuvassa joki haarautuu pitkiksi uomiksi ennen Meksikonlahtea. Kun virtaus hidastuu, hiekka, liete ja savi laskeutuvat ja pidentävät suiston kapeita “varpaita” merelle päin.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/STS062-85-021",
            "title": "NASA: Mississippi River Delta as seen from STS-62"
          }
        ],
        "havaintoId": "STS062-85-021"
      },
      {
        "kysymys": "Onko tämä suisto aina ollut samassa paikassa?",
        "vastaus": "Ei. Mississippi on historiansa aikana rakentanut uusia suistohaaroja, kun tulvat ovat löytäneet lyhyemmän reitin mereen; vanhat haarat painuvat ja muuttuvat soiksi ja lahdiksi. Kuvan Balize-haara on näistä nuorimpia.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/STS062-85-021",
            "title": "NASA: Mississippi River Delta as seen from STS-62"
          }
        ],
        "havaintoId": "STS062-85-021"
      }
    ]
  },
  "zeeland": {
    "kysymykset": [
      "Mitä vesien ja kaupunkien verkko esittää?",
      "Miksi Zeelandissa on valtavia sulkuportteja?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä vesien ja kaupunkien verkko esittää?",
        "vastaus": "Vuoden 2024 kuvassa Haag ja Rotterdam näkyvät Reinin, Maasin ja Schelden yhteisen suistoalueen vierellä Pohjanmeren rannalla. Täällä joet, satamat ja meriväylät lomittuvat hyvin tiheäksi verkoksi.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss071e488058",
            "title": "NASA: The Hague and Rotterdam by the river delta"
          }
        ],
        "havaintoId": "iss071e488058"
      },
      {
        "kysymys": "Miksi Zeelandissa on valtavia sulkuportteja?",
        "vastaus": "Vuoden 1953 tuhoisan Pohjanmeren tulvan jälkeen Alankomaat rakensi Deltawerken-suojajärjestelmän. Oosterschelden liikkuvat portit suljetaan vaarallisen korkean veden ajaksi, mutta tavallisesti vuorovesi pääsee kulkemaan.",
        "lahteet": [
          {
            "url": "https://www.rijkswaterstaat.nl/en/projects/iconic-structures/eastern-scheldt-barrier",
            "title": "Rijkswaterstaat: Eastern Scheldt barrier"
          }
        ],
        "havaintoId": "iss071e488058"
      }
    ]
  },
  "niger-suisto": {
    "kysymykset": [
      "Kuinka suisto voi olla keskellä mannerta?",
      "Miten sisämaan suisto elättää ihmisiä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka suisto voi olla keskellä mannerta?",
        "vastaus": "Vuoden 2023 kuvassa Nigerjoki leviää Malin tasaiselle sisämaalle moniksi uomiksi ja tulvatasangoiksi. Se näyttää merisuistolta, vaikka vesi kokoontuu myöhemmin takaisin joeksi ja jatkaa matkaansa etelään.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss070e030773",
            "title": "NASA: Niger River creates an inland delta in Mali"
          },
          {
            "url": "https://www.ramsar.org/sites/default/files/documents/library/wurc_mgt_planning2008.pdf",
            "title": "Ramsar: Stakeholder involvement in the Inner Niger Delta"
          }
        ],
        "havaintoId": "iss070e030773"
      },
      {
        "kysymys": "Miten sisämaan suisto elättää ihmisiä?",
        "vastaus": "Kausittainen tulva muuttaa alueen vesien ja tulvatasankojen mosaiikiksi. Ramsarin aineiston mukaan kalastus, karjanhoito ja riisinviljely ovat suiston keskeisiä elinkeinoja — veden rytmi määrää vuoden tahdin.",
        "lahteet": [
          {
            "url": "https://www.ramsar.org/sites/default/files/documents/library/wurc_mgt_planning2008.pdf",
            "title": "Ramsar: Stakeholder involvement in the Inner Niger Delta"
          }
        ],
        "havaintoId": "iss070e030773"
      }
    ]
  },
  "uyuni": {
    "kysymykset": [
      "Miksi tasanko hohtaa valkoisena?",
      "Miten Uyunin suolatasanko syntyi?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi tasanko hohtaa valkoisena?",
        "vastaus": "Vuoden 2005 kuvassa Uyunin pinta on vaalea mineraalikuori, jossa on etenkin haliittia eli ruokasuolaa ja kipsiä. Tumma Tunupan tulivuori nousee sen reunalta, joten vastakohta näkyy kiertoradalle asti.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss012e06456",
            "title": "NASA: Salar de Uyuni and Mount Tunupa"
          }
        ],
        "havaintoId": "iss012e06456"
      },
      {
        "kysymys": "Miten Uyunin suolatasanko syntyi?",
        "vastaus": "Bolivian Altiplanon altailla ei ole laskujokia merelle. Muinaisen järven veden haihtuessa mineraalit jäivät pohjalle, ja kerrostumiin tallentui myös alueen aiempien vedenkorkeuksien ja ilmaston vaihtelujen historiaa.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss012e06456",
            "title": "NASA: Salar de Uyuni and Mount Tunupa"
          }
        ],
        "havaintoId": "iss012e06456"
      }
    ]
  },
  "araljarvi": {
    "kysymykset": [
      "Mitä vuoden 1994 kuvassa näkyy?",
      "Miksi Araljärvi alkoi kutistua?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä vuoden 1994 kuvassa näkyy?",
        "vastaus": "Kuva näyttää Araljärven osittain jään peittämänä huhtikuussa 1994, ei sen nykytilaa. Etelässä näkyvät Amudarjan kasteltu viuhkasuisto ja laajat suolatasangot — tämä on yhden ajanhetken historiallinen havainto.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/sts059-l22-140",
            "title": "NASA: Aral Sea seen from STS-59"
          }
        ],
        "havaintoId": "sts059-l22-140"
      },
      {
        "kysymys": "Miksi Araljärvi alkoi kutistua?",
        "vastaus": "Aral oli aikanaan maailman neljänneksi suurin sisäjärvi. NASA liittää sen pienenemisen siihen, että järveen virtaavaa jokivettä ohjattiin ja käytettiin liikaa kasteluun kuivassa ilmastossa.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/sts059-l22-140",
            "title": "NASA: Aral Sea seen from STS-59"
          }
        ],
        "havaintoId": "sts059-l22-140"
      }
    ]
  },
  "baikal": {
    "kysymykset": [
      "Miksi Baikal on kokonaan vaalea?",
      "Kuinka syvä Baikal on?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Baikal on kokonaan vaalea?",
        "vastaus": "Huhtikuun 1994 sukkulakuvassa Baikaljärven pinta on jään peitossa. Pilvet kulkevat osan kuvan yli, mutta pitkä järviallas erottuu silti selvästi Siperian suuren repeämälaakson sisällä.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/sts059-90-098",
            "title": "NASA: Ice-covered Lake Baikal during STS-59"
          }
        ],
        "havaintoId": "sts059-90-098"
      },
      {
        "kysymys": "Kuinka syvä Baikal on?",
        "vastaus": "Baikal on syvimmillään runsaat 1,6 kilometriä ja maailman syvin järvi. Sen pitkä allas sijaitsee maankuoren repeämässä, ja valtava vesimäärä tekee siitä myös maailman suurimman makean veden järven tilavuudeltaan.",
        "lahteet": [
          {
            "url": "https://pubs.usgs.gov/fs/baikal/",
            "title": "USGS: Lake Baikal — A Touchstone for Global Change and Rift Studies"
          },
          {
            "url": "https://whc.unesco.org/en/list/754",
            "title": "UNESCO World Heritage Centre: Lake Baikal"
          }
        ],
        "havaintoId": "sts059-90-098"
      }
    ]
  },
  "suolajarvi-utah": {
    "kysymykset": [
      "Miksi järven puoliskot ovat eri väriset?",
      "Miten viereinen Bear Lake eroaa siitä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi järven puoliskot ovat eri väriset?",
        "vastaus": "Vuoden 2025 kuvassa rautatiepenger rajoittaa veden sekoittumista Ison Suolajärven puoliskojen välillä. NASA kertoo punaisen osan olevan paljon suolaisempi kuin sinisen, vähäsuolaisemman osan.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss073e0865636",
            "title": "NASA: Bear Lake and Great Salt Lake"
          }
        ],
        "havaintoId": "iss073e0865636"
      },
      {
        "kysymys": "Miten viereinen Bear Lake eroaa siitä?",
        "vastaus": "Bear Lake on makeavetinen ja keskimäärin noin 63 metriä syvä. Iso Suolajärvi on sitä suurempi mutta keskimäärin vain noin neljä metriä syvä — naapureina ne ovat aivan eri luonteiset järvet.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss073e0865636",
            "title": "NASA: Bear Lake and Great Salt Lake"
          }
        ],
        "havaintoId": "iss073e0865636"
      }
    ]
  },
  "carnegie": {
    "kysymykset": [
      "Mitä Carnegiejärven pinnalla näkyy?",
      "Miksi Carnegiejärvi katoaa välillä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä Carnegiejärven pinnalla näkyy?",
        "vastaus": "Syyskuun 2024 kuvassa näkyy veden ja mudan sekoitus, ei tasainen järvenselkä. NASA kuvaa Carnegieä ajoittaiseksi järveksi, joten eri sävyiset laikut kertovat juuri tuon kuvaushetken kirjavasta pinnasta.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss071e615200",
            "title": "NASA: Lake Carnegie in Western Australia"
          }
        ],
        "havaintoId": "iss071e615200"
      },
      {
        "kysymys": "Miksi Carnegiejärvi katoaa välillä?",
        "vastaus": "Carnegie täyttyy kunnolla vain voimakkaiden sateiden aikana. Kuivina vuosina yksi Länsi-Australian suurimmista järvistä on enimmäkseen mutainen suo — sana “järvi” ei siis lupaa vettä jokaisena päivänä.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss071e615200",
            "title": "NASA: Lake Carnegie in Western Australia"
          }
        ],
        "havaintoId": "iss071e615200"
      }
    ]
  },
  "riftin-jarvet": {
    "kysymykset": [
      "Miksi kolme järveä ovat eri värisiä?",
      "Mitkä järvet kuvassa ovat?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi kolme järveä ovat eri värisiä?",
        "vastaus": "Toukokuun 2024 kuvassa Shala ja Abijatta ovat emäksisiä järviä. NASA yhdistää Langanon ruskean värin runsaaseen rikkiin ja muihin mineraaleihin; pelkästä väristä ei silti pidä päätellä tarkkaa syvyyttä.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss071e132461",
            "title": "NASA: A Trio of Ethiopian Lakes"
          }
        ],
        "havaintoId": "iss071e132461"
      },
      {
        "kysymys": "Mitkä järvet kuvassa ovat?",
        "vastaus": "Etiopian hautavajoaman järvet ovat vasemmalta oikealle Shala, Abijatta ja Langano. Kolmikko mahtuu samaan avaruuskuvaan, vaikka jokaisella järvellä on oma vesikemiansa ja ilmeensä.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss071e132461",
            "title": "NASA: A Trio of Ethiopian Lakes"
          }
        ],
        "havaintoId": "iss071e132461"
      }
    ]
  },
  "kanadan-palot": {
    "kysymykset": [
      "Miksi savuvanat kulkevat samaan suuntaan?",
      "Kuinka kauas palojen savu kulkeutui?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi savuvanat kulkevat samaan suuntaan?",
        "vastaus": "Elokuun 2025 kuvassa useat palot lähettävät savua Kanadan keskisten provinssien ylle. Yhtenäinen ilmavirtaus venyttää erilliset savupatsaat samansuuntaisiksi vanoiksi — kuin monta harmaata sulkaa rinnakkain.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss073e0420617",
            "title": "NASA: Wildfires burn throughout Canada's central provinces"
          }
        ],
        "havaintoId": "iss073e0420617"
      },
      {
        "kysymys": "Kuinka kauas palojen savu kulkeutui?",
        "vastaus": "NASA raportoi savun ajautuneen Yhdysvaltojen Suurten järvien alueelle ja koillisosaan asti, missä se heikensi ilmanlaatua. Kuvan pitkät vanat eivät siis jääneet vain palopaikkojen ylle.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss073e0420617",
            "title": "NASA: Wildfires burn throughout Canada's central provinces"
          }
        ],
        "havaintoId": "iss073e0420617"
      }
    ]
  },
  "mount-hood": {
    "kysymykset": [
      "Mikä työntää paksun savun vuoren viereen?",
      "Onko Mount Hood itse tulivuori?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä työntää paksun savun vuoren viereen?",
        "vastaus": "Heinäkuun 2026 kuvassa savu nousee Grasshopper-metsäpalosta, ei Mount Hoodin kraatterista. Luminen vuori näkyy kuvan vasemmassa yläosassa, joten vierekkäisyys voi ensi silmäyksellä narrata.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss075e0001471",
            "title": "NASA: Grasshopper wildfire near Mount Hood"
          }
        ],
        "havaintoId": "iss075e0001471"
      },
      {
        "kysymys": "Onko Mount Hood itse tulivuori?",
        "vastaus": "On: USGS luokittelee Mount Hoodin aktiiviseksi Kaskadien tulivuoreksi ja Oregonin korkeimmaksi huipuksi. Se sijaitsee noin 80 kilometriä Portlandin metropolialueesta itään.",
        "lahteet": [
          {
            "url": "https://www.usgs.gov/volcanoes/mount-hood/science/geology-and-history-summary-mount-hood",
            "title": "USGS: Geology and History Summary for Mount Hood"
          }
        ],
        "havaintoId": "iss075e0001471"
      }
    ]
  },
  "nasser": {
    "kysymykset": [
      "Miksi järven ranta haarautuu kuin puu?",
      "Miksi Nasserjärvi rakennettiin?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi järven ranta haarautuu kuin puu?",
        "vastaus": "Lokakuun 2025 kuvassa Nasserjärven vesi täyttää Niilin vanhan laakson ja sen sivulaaksot. Siksi tekojärven reuna haarautuu aavikkoon lukuisina pitkinä lahtina — kartta näyttää melkein suonistolta.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss073e0879542",
            "title": "NASA: Lake Nasser, created by the Aswan High Dam"
          }
        ],
        "havaintoId": "iss073e0879542"
      },
      {
        "kysymys": "Miksi Nasserjärvi rakennettiin?",
        "vastaus": "Nasserjärvi syntyi Assuanin korkean padon taakse Etelä-Egyptiin. Se varastoi Ylä-Niilin vettä ja säännöstelee virtausta Ala-Niilille; järvi jatkuu myös pohjoisen Sudanin puolelle.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss073e0879542",
            "title": "NASA: Lake Nasser, created by the Aswan High Dam"
          }
        ],
        "havaintoId": "iss073e0879542"
      }
    ]
  },
  "kasteluympyrat": {
    "kysymykset": [
      "Miksi pellot ovat täydellisiä ympyröitä?",
      "Mistä aavikkopellot saavat vetensä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi pellot ovat täydellisiä ympyröitä?",
        "vastaus": "Huhtikuun 1997 kuvassa kasteluvarsi pyörii kaivon ympärillä ja levittää vettä tasaiselle säteelle. Siksi vihreä kasvusto piirtyy aavikkoon ympyräksi; putki toimii kuin valtava kellonviisari.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/sts083-747-033",
            "title": "NASA: Center Pivot Irrigation in Saudi Arabia"
          }
        ],
        "havaintoId": "sts083-747-033"
      },
      {
        "kysymys": "Mistä aavikkopellot saavat vetensä?",
        "vastaus": "Vettä pumpataan jopa noin 900 metrin syvyydestä fossiilisista pohjavesivarastoista. NASA muistuttaa, että vesi kertyi kosteampina jääkausijaksoina eikä uusiudu nykyilmastossa samaa tahtia kuin sitä käytetään.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/sts083-747-033",
            "title": "NASA: Center Pivot Irrigation in Saudi Arabia"
          }
        ],
        "havaintoId": "sts083-747-033"
      }
    ]
  },
  "khufrah": {
    "kysymykset": [
      "Mitä vihreät kiekot Saharassa ovat?",
      "Mikä Al Khufrahin keidas on?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä vihreät kiekot Saharassa ovat?",
        "vastaus": "Vuoden 2004 kuvassa kiekot ovat noin kilometrin levyisiä peltoja, joita kastellaan keskeltä pyörivällä putkivarrella. Tummilla pelloilla kasvoi esimerkiksi vehnää tai sinimailasta; vaalea pelto saattoi olla eri työvaiheessa.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss010e05266",
            "title": "NASA: Al Khufrah Oasis"
          }
        ],
        "havaintoId": "iss010e05266"
      },
      {
        "kysymys": "Mikä Al Khufrahin keidas on?",
        "vastaus": "Al Khufrah sijaitsee Kaakkois-Libyassa lähellä Egyptin rajaa ja kuuluu Libyan suurimpiin maataloushankkeisiin. Keskipistekastelun ympyrät tekevät siitä myös helposti tunnistettavan maamerkin avaruudesta.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss010e05266",
            "title": "NASA: Al Khufrah Oasis"
          }
        ],
        "havaintoId": "iss010e05266"
      }
    ]
  },
  "lake-powell": {
    "kysymykset": [
      "Miksi Powelljärvi on niin mutkikas?",
      "Miten Powelljärvi sai alkunsa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Powelljärvi on niin mutkikas?",
        "vastaus": "Vuoden 2001 kuvassa vesi seuraa syvälle uurtunutta Coloradon jokilaaksoa ja sen sivuhaaroja. Tekojärvi ei siis täytä pyöreää allasta, vaan vanhojen kanjonien mutkat — ilmasta se näyttää siniseltä oksistolta.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/STS100-716-176",
            "title": "NASA: Lake Powell during STS-100"
          }
        ],
        "havaintoId": "STS100-716-176"
      },
      {
        "kysymys": "Miten Powelljärvi sai alkunsa?",
        "vastaus": "Glen Canyonin pato varastoi Ylä-Coloradon vettä ja synnytti Powelljärven. Pato on Pohjois-Arizonassa, kun taas suuri osa kuvassa näkyvästä tekojärvestä ja sen Escalante- ja San Juan -sivuhaaroista on Utahissa.",
        "lahteet": [
          {
            "url": "https://home.nps.gov/glca/learn/nature/hydrologicactivity.htm",
            "title": "National Park Service: Hydrologic Activity at Glen Canyon"
          },
          {
            "url": "https://images.nasa.gov/details/STS100-716-176",
            "title": "NASA: Lake Powell during STS-100"
          }
        ],
        "havaintoId": "STS100-716-176"
      }
    ]
  },
  "issaouane": {
    "kysymykset": [
      "Miksi dyynit kulkevat moneen suuntaan?",
      "Kuinka Issaouanen hiekkameri syntyi?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi dyynit kulkevat moneen suuntaan?",
        "vastaus": "Vuoden 2006 kuvassa vanhojen megadyynien päällä on pienempiä, eri suuntiin kaartuvia harjanteita. Eri kokoiset dyynit reagoivat eri aikojen ja paikallisten korkeuserojen ohjaamiin tuuliin — siinä on monta rytmiä päällekkäin.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss013e65526",
            "title": "NASA: Issaouane Dune Sea, Eastern Algeria"
          }
        ],
        "havaintoId": "iss013e65526"
      },
      {
        "kysymys": "Kuinka Issaouanen hiekkameri syntyi?",
        "vastaus": "Kun Sahara kuivui voimakkaasti noin 2,5 miljoonaa vuotta sitten, pienenevät joet jättivät hiekkakuormansa sisämaahan. Tuuli kasasi aineksen vähitellen suuriksi dyyniketjuiksi, joita pienemmät dyynit yhä muokkaavat.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss013e65526",
            "title": "NASA: Issaouane Dune Sea, Eastern Algeria"
          }
        ],
        "havaintoId": "iss013e65526"
      }
    ]
  },
  "white-sands": {
    "kysymykset": [
      "Onko White Sandsin valkea aines hiekkaa?",
      "Miksi kipsihiekka säilyy juuri täällä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Onko White Sandsin valkea aines hiekkaa?",
        "vastaus": "On, mutta se on mineraaliltaan kipsihiekkaa eikä tavallista kvartsihiekkaa. Hiekka tarkoittaa raekokoa: NPS kertoo White Sandsin dyynien olevan noin 98-prosenttisesti kipsihiekkaa — oikeaa hiekkaa siis.",
        "lahteet": [
          {
            "url": "https://www.nps.gov/whsa/learn/sand.htm",
            "title": "National Park Service: Sand at White Sands"
          },
          {
            "url": "https://images.nasa.gov/details/sts060-83-016",
            "title": "NASA: White Sands as seen from STS-60"
          }
        ],
        "havaintoId": "sts060-83-016"
      },
      {
        "kysymys": "Miksi kipsihiekka säilyy juuri täällä?",
        "vastaus": "Tularosan allas on kuin malja ilman laskuaukkoa: vesi tuo vuorilta liuennutta kipsiä, mutta ei vie sitä mereen. Haihtuminen jättää seleniittikiteitä, jotka vesi ja tuuli jauhavat hiekan kokoisiksi rakeiksi.",
        "lahteet": [
          {
            "url": "https://www.nps.gov/whsa/learn/geology-of-white-sands.htm",
            "title": "National Park Service: Geology of White Sands"
          }
        ],
        "havaintoId": "sts060-83-016"
      }
    ]
  },
  "merijaa": {
    "kysymykset": [
      "Miksi jää piirtää pyörteitä mereen?",
      "Onko merijää sama asia kuin jäävuori?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi jää piirtää pyörteitä mereen?",
        "vastaus": "Huhtikuun 2024 kuvassa merijää kelluu valkoisina kiehkuroina Newfoundlandin edustalla. Veden liike hajottaa ja kiertää jääkenttää, joten astronautti Mike Barratt näki pinnalla melkein siveltimenvetoja.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss071e046021",
            "title": "NASA: Sea ice swirls in the North Atlantic Ocean"
          }
        ],
        "havaintoId": "iss071e046021"
      },
      {
        "kysymys": "Onko merijää sama asia kuin jäävuori?",
        "vastaus": "Ei. Merijää syntyy, kasvaa ja sulaa suolaisessa merivedessä, kun taas jäävuori on maalla syntyneestä jäätiköstä tai jäähyllystä irronnut kappale. Tässä NASA tunnistaa valkoiset kuviot merijääksi.",
        "lahteet": [
          {
            "url": "https://nsidc.org/learn/parts-cryosphere/sea-ice/science-sea-ice",
            "title": "NSIDC: Science of Sea Ice"
          },
          {
            "url": "https://images.nasa.gov/details/iss071e046021",
            "title": "NASA: Sea ice swirls in the North Atlantic Ocean"
          }
        ],
        "havaintoId": "iss071e046021"
      }
    ]
  },
  "suez": {
    "kysymykset": [
      "Mitä suora vesiviiva aavikolla on?",
      "Mistä kanavanvarren viljely saa makeaa vettä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä suora vesiviiva aavikolla on?",
        "vastaus": "Marraskuun 2023 kuvassa näkyvät Suezin kanavan eteläosa ja oikealla Suezinlahti. Kanava on suolainen laivaväylä Välimeren ja Punaisenmeren välillä; sen vierellä näkyvä vihreys ei saa vetensä suoraan tästä merikanavasta.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss070e034694",
            "title": "NASA: Southern portion of the Suez Canal"
          },
          {
            "url": "https://www.esa.int/Applications/Observing_the_Earth/Earth_from_Space_Suez_Canal",
            "title": "ESA: Earth from Space — Suez Canal"
          }
        ],
        "havaintoId": "iss070e034694"
      },
      {
        "kysymys": "Mistä kanavanvarren viljely saa makeaa vettä?",
        "vastaus": "Viljelyä palvelee erillinen makean veden kastelujärjestelmä, muun muassa Niilin vettä tuova Ismailian–Suezin kanavaverkko. Suezin laivakanavan vesi on merivettä, joten sitä ei pidä sekoittaa tähän kasteluveteen.",
        "lahteet": [
          {
            "url": "https://sis.gov.eg/en/media-center/news/irrigation-minister-full-study-of-suez-canal-vital-to-ensure-meeting-water-needs/",
            "title": "Egypt State Information Service: Suez irrigation canal and water needs"
          },
          {
            "url": "https://www.esa.int/Applications/Observing_the_Earth/Earth_from_Space_Suez_Canal",
            "title": "ESA: Earth from Space — Suez Canal"
          }
        ],
        "havaintoId": "iss070e034694"
      }
    ]
  },
  "tiran": {
    "kysymykset": [
      "Mikä hopeinen hohde vedessä on?",
      "Miksi Tiranin salmi on strateginen?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä hopeinen hohde vedessä on?",
        "vastaus": "Kesäkuun 2013 kuvassa hohde on auringonvälkettä: valo heijastuu veden pinnasta kohti avaruusasemaa. Se voi tuoda näkyviin aaltoja ja virtauksia, mutta kirkkaus ei tarkoita vaaleaa pohjaa.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss036e010628",
            "title": "NASA: Strait of Tiran, Red Sea and Gulf of Aqaba"
          }
        ],
        "havaintoId": "iss036e010628"
      },
      {
        "kysymys": "Miksi Tiranin salmi on strateginen?",
        "vastaus": "Noin kuusi kilometriä leveä salmi yhdistää Akabanlahden Punaiseenmereen ja sisältää suurille laivoille kaksi kulkukelpoista väylää. Siksi sen hallinta vaikutti esimerkiksi Suezin kriisiin 1956 ja kuuden päivän sotaan 1967.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss036e010628",
            "title": "NASA: Strait of Tiran, Red Sea and Gulf of Aqaba"
          }
        ],
        "havaintoId": "iss036e010628"
      }
    ]
  },
  "tunis": {
    "kysymykset": [
      "Mitä pimeät aukot Tunisin valoissa ovat?",
      "Missä Tunis sijaitsee?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä pimeät aukot Tunisin valoissa ovat?",
        "vastaus": "Toukokuun 2025 yökuvassa Tunis sijoittuu kahden tumman vesialueen väliin: Tunisjärvi on kaupungin koillispuolella ja kausittainen Sebkhet Sejoumi lounaassa. Valot piirtävät niiden reunat näkyviin.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss073e0078538",
            "title": "NASA: The city lights of Tunis"
          }
        ],
        "havaintoId": "iss073e0078538"
      },
      {
        "kysymys": "Missä Tunis sijaitsee?",
        "vastaus": "Tunis on Tunisian pääkaupunki Välimeren puolella Tunislahden äärellä. Se on Tunisjärven ja kausittaisen suolatasangon välissä; valojen eri sävyistä ei kuitenkaan voi päätellä kaupunginosien ikää.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss073e0078538",
            "title": "NASA: The city lights of Tunis"
          }
        ],
        "havaintoId": "iss073e0078538"
      }
    ]
  },
  "kairo-yolla": {
    "kysymykset": [
      "Miksi Kairon valot ovat kahden värisiä?",
      "Miten Niili jakaa Kairon?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Kairon valot ovat kahden värisiä?",
        "vastaus": "Tammikuun 2026 kuvassa keskustan uudemmat led-valot hohtavat valkoisina, kun monilla esikaupunkialueilla käytetään yhä lämpimän meripihkan sävyisiä suurpainenatriumlamppuja. Väri kertoo lampusta, ei alueen iästä.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss074e0043697",
            "title": "NASA: Cairo metropolitan area at night"
          }
        ],
        "havaintoId": "iss074e0043697"
      },
      {
        "kysymys": "Miten Niili jakaa Kairon?",
        "vastaus": "Kairon metropolialue levittäytyy Niilin molemmille puolille aivan Niilin suiston eteläreunalla. Tammikuun 2026 yökuvassa tumma jokinauha halkoo kaupunkivalojen verkkoa ja auttaa hahmottamaan kaupungin muodon.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss074e0043697",
            "title": "NASA: Cairo metropolitan area at night"
          }
        ],
        "havaintoId": "iss074e0043697"
      }
    ]
  },
  "bingham": {
    "kysymykset": [
      "Miksi kaivoksen seinät ovat raidalliset?",
      "Mitä Binghamin kaivoksesta louhitaan?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi kaivoksen seinät ovat raidalliset?",
        "vastaus": "Vuoden 2007 kuvassa raidat ovat 16–25 metriä korkeita louhintapenkereitä eli terasseja. Ne antavat koneille pääsyn kallioon ja vakauttavat avolouhoksen jyrkkiä seiniä; leveä tumma kierre on ajotie.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss015e29867",
            "title": "NASA: Bingham Canyon Mine, Utah"
          }
        ],
        "havaintoId": "iss015e29867"
      },
      {
        "kysymys": "Mitä Binghamin kaivoksesta louhitaan?",
        "vastaus": "Kuparia. Malmi syntyi, kun maan sisällä jäähtyvän magman kuumat nesteet kerryttivät kuparimineraaleja ympäröivään kallioon. NASA kuvaa Bingham Canyonia yhdeksi maailman suurimmista avolouhoksista.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss015e29867",
            "title": "NASA: Bingham Canyon Mine, Utah"
          }
        ],
        "havaintoId": "iss015e29867"
      }
    ]
  },
  "faiyum": {
    "kysymykset": [
      "Miksi Faiyum näyttää lehdeltä aavikossa?",
      "Missä Faiyumin keidas sijaitsee?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Faiyum näyttää lehdeltä aavikossa?",
        "vastaus": "Lokakuun 2019 kuvassa vihreä Faiyumin keidas työntyy Niililtä länteen kuin lehti varresta. Muoto syntyy viljellyn keidasalueen ja ympäröivän vaalean aavikon voimakkaasta rajasta.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss061e004613",
            "title": "NASA: Faiyum Oasis"
          }
        ],
        "havaintoId": "iss061e004613"
      },
      {
        "kysymys": "Missä Faiyumin keidas sijaitsee?",
        "vastaus": "Faiyum levittäytyy Niilin länsipuolelle ja Kairon eteläpuolelle Egyptissä. Samassa kuvassa Niilin vehreä suisto avautuu pohjoiseen kohti Välimerta — hyvä suunnistuskuva myös korkealla lentävälle linnulle.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss061e004613",
            "title": "NASA: Faiyum Oasis"
          }
        ],
        "havaintoId": "iss061e004613"
      }
    ]
  },
  "ulawun": {
    "kysymykset": [
      "Miten erotan tuhkapilven tavallisista pilvistä?",
      "Millainen tulivuori Ulawun on?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miten erotan tuhkapilven tavallisista pilvistä?",
        "vastaus": "Marraskuun 2012 kuvassa valkea höyry- ja tuhkapilvi alkaa suoraan Ulawunin huippukraatterista ja venyy luoteeseen. Läheisen Bamusvuoren yllä olevat valkoiset kumpupilvet eivät NASA:n mukaan ole vulkaanisia.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss034e005496",
            "title": "NASA: Eruption at Ulawun volcano"
          }
        ],
        "havaintoId": "iss034e005496"
      },
      {
        "kysymys": "Millainen tulivuori Ulawun on?",
        "vastaus": "Ulawun kohoaa Uuden-Britannian saarella Papua-Uudessa-Guineassa 2 334 metriin ja on saaren korkein tulivuori. NASA luonnehtii sitä yhdeksi alueen aktiivisimmista, ja toimintaa tunnetaan ainakin vuodesta 1700.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss034e005496",
            "title": "NASA: Eruption at Ulawun volcano"
          }
        ],
        "havaintoId": "iss034e005496"
      }
    ]
  },
  "jaavuori": {
    "kysymykset": [
      "Miksi jäävuori on litteä kuin pöytä?",
      "Kuinka suuri tämä pöytäjäävuori oli?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi jäävuori on litteä kuin pöytä?",
        "vastaus": "Vuoden 1991 kuvassa tasakantinen jäävuori on murtunut Etelämantereen mannerjäätiköstä. Sen pinta oli jo ennen irtoamista laaja ja tasainen, joten merelle lähtenyt kappale säilyttää pöytämäisen muodon.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/sts048-73-000q",
            "title": "NASA: Large Tabular Iceberg, South Atlantic Ocean"
          }
        ],
        "havaintoId": "sts048-73-000q"
      },
      {
        "kysymys": "Kuinka suuri tämä pöytäjäävuori oli?",
        "vastaus": "NASA arvioi jäävuoren kooksi noin 35 kertaa 69 kilometriä. Tuuli, merivirrat ja vuorovesi kuljettivat sitä hitaasti pohjoiseen ja itään Etelä-Atlantilla — aikamoinen jäälaiva ilman kapteenia.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/sts048-73-000q",
            "title": "NASA: Large Tabular Iceberg, South Atlantic Ocean"
          }
        ],
        "havaintoId": "sts048-73-000q"
      }
    ]
  },
  "heard": {
    "kysymykset": [
      "Mitä jäätiköiden keskeltä kohoaa?",
      "Miksi Heardin saari on erityinen?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä jäätiköiden keskeltä kohoaa?",
        "vastaus": "Helmikuun 2009 kuvassa Mawson Peak kohoaa Big Ben -tulivuoren sortumakalderan laidalla. Huipun varjo osoittaa kohti puolikuun muotoista kalderan reunaa, ja Gotley- sekä Lied-jäätiköt peittävät rinteitä.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss018e038182",
            "title": "NASA: Mawson Peak, Heard Island"
          }
        ],
        "havaintoId": "iss018e038182"
      },
      {
        "kysymys": "Miksi Heardin saari on erityinen?",
        "vastaus": "Heard on syrjäinen subantarktinen tulivuorisaari eteläisellä Intian valtamerellä ja kuuluu UNESCOn maailmanperintöön. Sen lähes koskematon luonto sekä aktiiviset tulivuoret ja nopeasti muuttuvat jäätiköt ovat arvokkaita tutkimukselle.",
        "lahteet": [
          {
            "url": "https://whc.unesco.org/en/list/577",
            "title": "UNESCO World Heritage Centre: Heard and McDonald Islands"
          },
          {
            "url": "https://images.nasa.gov/details/iss018e038182",
            "title": "NASA: Mawson Peak, Heard Island"
          }
        ],
        "havaintoId": "iss018e038182"
      }
    ]
  }
};

/** Nykyiseen nosto.kysymykset-kenttään; tuntematon kohde ei saa arvattuja kysymyksiä. */
export function haeAstronautinKysymykset(tunnus) {
  return [...(ASTRONAUTIN_KYSYMYKSET[tunnus]?.kysymykset ?? [])];
}

/** Täsmällinen esikirjoitettu vastaus. Renderöi tekstinä, älä innerHTML:nä. */
export function haeAstronautinVastaus(tunnus, kysymys) {
  if (typeof kysymys !== 'string') return null;
  const row = ASTRONAUTIN_KYSYMYKSET[tunnus]?.vastaukset?.find(item => item.kysymys === kysymys.trim());
  return row ? { ...row, lahteet: row.lahteet.map(source => ({ ...source })) } : null;
}
