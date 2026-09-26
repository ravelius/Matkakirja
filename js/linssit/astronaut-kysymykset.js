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
  },
  "pariisi": {
    "kysymykset": [
      "Miksi Pariisia kutsutaan Valon kaupungiksi?",
      "Milloin Eiffel-torni valmistui?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Pariisia kutsutaan Valon kaupungiksi?",
        "vastaus": "Pariisia kutsutaan ranskaksi \"la Ville Lumière\". Nimitys juontuu 1800-luvulta, kun kaupunki oli edelläkävijä katuvalaistuksessa ja valistusajan ajatusten keskuksena, ja se vakiintui erityisesti 1889 ja 1900 maailmannäyttelyiden sähkövalaistuksen myötä.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Paris",
            "title": "Paris – Wikipedia"
          }
        ],
        "havaintoId": "iss072e789833"
      },
      {
        "kysymys": "Milloin Eiffel-torni valmistui?",
        "vastaus": "Eiffel-torni valmistui vuonna 1889 Pariisin maailmannäyttelyä varten. Sen rakensi insinööri Gustave Eiffelin yhtiö, ja 312-metrisenä se oli valmistuessaan maailman korkein rakennelma.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Eiffel_Tower",
            "title": "Eiffel Tower – Wikipedia"
          }
        ],
        "havaintoId": "iss072e789833"
      }
    ]
  },
  "lontoo": {
    "kysymykset": [
      "Mikä joki halkoo Lontoota kahtia?",
      "Mikä on Heathrowin merkitys Euroopan lentoliikenteessä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä joki halkoo Lontoota kahtia?",
        "vastaus": "Thames-joki virtaa Lontoon läpi ja jakaa kaupungin pohjois- ja etelärannalle. Se on Englannin pisin joki, ja sen varrella sijaitsevat monet Lontoon nähtävyyksistä, kuten Tower Bridge ja parlamenttitalo.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/River_Thames",
            "title": "River Thames – Wikipedia"
          }
        ],
        "havaintoId": "iss074e0405029"
      },
      {
        "kysymys": "Mikä on Heathrowin merkitys Euroopan lentoliikenteessä?",
        "vastaus": "Lontoon Heathrow on yksi Euroopan vilkkaimmista lentokentistä matkustajamäärällä mitattuna ja toimii useiden lentoyhtiöiden pääkeskuksena. Se palvelee vuosittain kymmeniä miljoonia matkustajia kahdella kiitoradalla.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Heathrow_Airport",
            "title": "Heathrow Airport – Wikipedia"
          }
        ],
        "havaintoId": "iss074e0405029"
      }
    ]
  },
  "rooma": {
    "kysymykset": [
      "Miksi Roomaa kutsutaan ikuiseksi kaupungiksi?",
      "Mikä on Vatikaanivaltio ja missä se sijaitsee?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Roomaa kutsutaan ikuiseksi kaupungiksi?",
        "vastaus": "Nimitys \"ikuinen kaupunki\" (Roma aeterna) juontuu antiikin ajoilta, kun roomalaiset uskoivat kaupunkinsa säilyvän ikuisesti. Rooma on ollut asutettu yhtäjaksoisesti antiikista nykypäivään, perinteisen tarinan mukaan vuodesta 753 eaa.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Rome",
            "title": "Rome – Wikipedia"
          }
        ],
        "havaintoId": "iss073e0343840"
      },
      {
        "kysymys": "Mikä on Vatikaanivaltio ja missä se sijaitsee?",
        "vastaus": "Vatikaanivaltio on maailman pienin itsenäinen valtio, ja se sijaitsee kokonaan Rooman kaupungin sisällä. Se perustettiin vuonna 1929 Lateraanisopimuksella, ja sitä johtaa paavi.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Vatican_City",
            "title": "Vatican City – Wikipedia"
          }
        ],
        "havaintoId": "iss073e0343840"
      }
    ]
  },
  "venetsia": {
    "kysymykset": [
      "Kuinka monesta saaresta Venetsian keskusta koostuu?",
      "Mikä on MOSE-hanke Venetsiassa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka monesta saaresta Venetsian keskusta koostuu?",
        "vastaus": "Venetsian historiallinen keskusta on rakennettu noin 118 pienelle saarelle, jotka yhdistävät toisiinsa yli 400 siltaa. Kaupungin halki kulkee myös S-kirjaimen muotoinen pääkanava, Canal Grande.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Venice",
            "title": "Venice – Wikipedia"
          }
        ],
        "havaintoId": "iss014e17346"
      },
      {
        "kysymys": "Mikä on MOSE-hanke Venetsiassa?",
        "vastaus": "MOSE on Venetsian laguunin suulle rakennettu tulvasulkujärjestelmä, joka suojaa kaupunkia \"acqua alta\" -tulvilta nostettavilla patoporteilla. Järjestelmä otettiin käyttöön vuosikymmenten rakentamisen jälkeen 2020-luvulla.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/MOSE_Project",
            "title": "MOSE Project – Wikipedia"
          }
        ],
        "havaintoId": "iss014e17346"
      }
    ]
  },
  "moskova": {
    "kysymykset": [
      "Mikä joki virtaa Moskovan halki?",
      "Mikä on MKAD Moskovassa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä joki virtaa Moskovan halki?",
        "vastaus": "Moskova-joki (Moskva) virtaa kaupungin läpi, ja kaupunki on saanut nimensä joesta. Joen varrella sijaitsevat monet Moskovan tärkeimmät nähtävyydet, mukaan lukien Kreml.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Moskva_River",
            "title": "Moskva River – Wikipedia"
          }
        ],
        "havaintoId": "iss064e024687"
      },
      {
        "kysymys": "Mikä on MKAD Moskovassa?",
        "vastaus": "MKAD on Moskovan uloin kehätie, joka seuraa pitkälti kaupungin virallista rajaa. Se on yksi kaupungin useista konsentrisista kehäteistä keskustan Puutarhakehän lisäksi, ja ne näkyvät selvästi kaupungin säteittäis-rengasmaisessa katuverkossa.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Moscow_Ring_Road",
            "title": "Moscow Ring Road – Wikipedia"
          }
        ],
        "havaintoId": "iss064e024687"
      }
    ]
  },
  "peking": {
    "kysymykset": [
      "Kuinka monta kehätietä Pekingissä on?",
      "Mikä on Kielletty kaupunki?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka monta kehätietä Pekingissä on?",
        "vastaus": "Pekingin keskustaa ympäröi useita konsentrisia kehäteitä. Ensimmäistä kehätietä ei koskaan rakennettu erillisenä väylänä, joten käytössä on 2.–6. kehätie, ja seitsemättä suunnitellaan kaupungin laajentuessa.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Ring_roads_of_Beijing",
            "title": "Ring roads of Beijing – Wikipedia"
          }
        ],
        "havaintoId": "iss072e444944"
      },
      {
        "kysymys": "Mikä on Kielletty kaupunki?",
        "vastaus": "Kielletty kaupunki on Pekingin keskustassa sijaitseva entinen keisarillinen palatsi, joka valmistui vuonna 1420 Ming-dynastian aikana. Se toimi Kiinan keisarien asuinpaikkana noin 500 vuoden ajan ja on nykyisin UNESCOn maailmanperintökohde.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Forbidden_City",
            "title": "Forbidden City – Wikipedia"
          }
        ],
        "havaintoId": "iss072e444944"
      }
    ]
  },
  "hongkong": {
    "kysymykset": [
      "Miksi Britannia palautti Hongkongin Kiinalle 1997?",
      "Mitä tarkoittaa \"yksi maa, kaksi järjestelmää\"?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Britannia palautti Hongkongin Kiinalle 1997?",
        "vastaus": "Britannia oli vuokrannut Hongkongin Uudet alueet Kiinalta 99 vuodeksi vuonna 1898, ja vuokrasopimuksen päättyminen johti koko alueen palauttamiseen. Palautuksesta sovittiin Kiinan ja Britannian yhteisessä julistuksessa 1984, ja luovutus tapahtui 1.7.1997.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Transfer_of_sovereignty_over_Hong_Kong",
            "title": "Transfer of sovereignty over Hong Kong – Wikipedia"
          }
        ],
        "havaintoId": "iss072e399613"
      },
      {
        "kysymys": "Mitä tarkoittaa \"yksi maa, kaksi järjestelmää\"?",
        "vastaus": "Periaate tarkoittaa, että Hongkong säilyttää omat oikeus-, talous- ja hallintojärjestelmänsä osana Kiinaa vuoteen 2047 asti, vaikka kuuluu Kiinan kansantasavaltaan erityishallintoalueena. Periaate on kirjattu Hongkongin perustuslakiin (Basic Law).",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/One_country,_two_systems",
            "title": "One country, two systems – Wikipedia"
          }
        ],
        "havaintoId": "iss072e399613"
      }
    ]
  },
  "singapore": {
    "kysymykset": [
      "Milloin Singaporesta tuli itsenäinen valtio?",
      "Mikä tekee Changin lentokentästä erikoisen?"
    ],
    "vastaukset": [
      {
        "kysymys": "Milloin Singaporesta tuli itsenäinen valtio?",
        "vastaus": "Singapore itsenäistyi 9. elokuuta 1965, kun se erosi kahden vuoden kestäneestä liitosta Malesian kanssa. Päivästä tuli maan kansallispäivä, ja Singaporesta kehittyi nopeasti yksi Aasian vauraimmista kaupunkivaltioista.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Singapore",
            "title": "Singapore – Wikipedia"
          }
        ],
        "havaintoId": "iss073e0763866"
      },
      {
        "kysymys": "Mikä tekee Changin lentokentästä erikoisen?",
        "vastaus": "Singaporen Changin lentokenttä on toistuvasti valittu maailman parhaaksi lentoasemaksi. Sen Jewel-terminaalissa on maailman korkein sisätiloissa oleva vesiputous ja yli 2000 puun kaupunkimetsä.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Singapore_Changi_Airport",
            "title": "Singapore Changi Airport – Wikipedia"
          }
        ],
        "havaintoId": "iss073e0763866"
      }
    ]
  },
  "sydney": {
    "kysymykset": [
      "Milloin Sydneyn lentokenttä avattiin?",
      "Miksi Botany Bay on historiallisesti merkittävä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Milloin Sydneyn lentokenttä avattiin?",
        "vastaus": "Sydneyn Kingsford Smith -lentokenttä on toiminut vuodesta 1920 ja on yksi maailman vanhimmista yhä toimivista kansainvälisistä lentokentistä. Se sijaitsee Botany Bayn rannalla vain noin 8 kilometrin päässä Sydneyn keskustasta.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Sydney_Airport",
            "title": "Sydney Airport – Wikipedia"
          }
        ],
        "havaintoId": "iss055e073720"
      },
      {
        "kysymys": "Miksi Botany Bay on historiallisesti merkittävä?",
        "vastaus": "Kapteeni James Cook laskeutui Botany Bayhin huhtikuussa 1770 ensimmäisenä eurooppalaisena tutkimusmatkailijana Australian itärannikolla. Lahti nimettiin sen ainutlaatuisen kasvillisuuden mukaan, jota retkikunnan kasvitieteilijät keräsivät.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Botany_Bay",
            "title": "Botany Bay – Wikipedia"
          }
        ],
        "havaintoId": "iss055e073720"
      }
    ]
  },
  "rio": {
    "kysymykset": [
      "Kuinka pitkä Rio-Niterói-silta on?",
      "Mikä tekee Guanabaran lahdesta tärkeän Riolle?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka pitkä Rio-Niterói-silta on?",
        "vastaus": "Rio-Niterói-silta on noin 13,3 kilometriä pitkä ja ylittää Guanabaran lahden. Valmistuessaan 1974 se oli pitkään yksi maailman pisimmistä esijännitetyistä betonisiltarakenteista.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Rio%E2%80%93Niter%C3%B3i_Bridge",
            "title": "Rio–Niterói Bridge – Wikipedia"
          }
        ],
        "havaintoId": "iss070e108427"
      },
      {
        "kysymys": "Mikä tekee Guanabaran lahdesta tärkeän Riolle?",
        "vastaus": "Guanabaran lahti on Brasilian toiseksi suurin merenlahti ja Rio de Janeiron tärkein satama- ja liikenneväylä. Sen rannoilla sijaitsevat myös kaupungin kansainvälinen lentokenttä Galeão ja useita historiallisia saaria.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Guanabara_Bay",
            "title": "Guanabara Bay – Wikipedia"
          }
        ],
        "havaintoId": "iss070e108427"
      }
    ]
  },
  "saopaulo": {
    "kysymykset": [
      "Kuinka suuri São Paulon metropolialue on?",
      "Miksi São Paulossa on paljon pilvenpiirtäjiä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka suuri São Paulon metropolialue on?",
        "vastaus": "São Paulon metropolialueella asuu noin 22 miljoonaa ihmistä, mikä tekee siitä eteläisen pallonpuoliskon väkirikkaimman kaupunkialueen. Kaupunki on Brasilian talouden ja teollisuuden keskus.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/S%C3%A3o_Paulo",
            "title": "São Paulo – Wikipedia"
          }
        ],
        "havaintoId": "iss073e0982063"
      },
      {
        "kysymys": "Miksi São Paulossa on paljon pilvenpiirtäjiä?",
        "vastaus": "São Paulo on Etelä-Amerikan pilvenpiirtäjärikkain kaupunki nopean 1900-luvun kasvun ja tiiviin kaupunkirakentamisen seurauksena. Keskustassa ja sen ympärillä on tuhansia korkeita rakennuksia.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/S%C3%A3o_Paulo",
            "title": "São Paulo – Wikipedia"
          }
        ],
        "havaintoId": "iss073e0982063"
      }
    ]
  },
  "losangeles": {
    "kysymykset": [
      "Miksi Los Angelesin satama on tärkeä?",
      "Kuinka monta matkustajaa LAX-lentokenttä palvelee?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Los Angelesin satama on tärkeä?",
        "vastaus": "Los Angelesin satama on Yhdysvaltain vilkkain konttisatama, ja se käsittelee suuren osan Aasian ja Pohjois-Amerikan välisestä konttiliikenteestä. Satama sijaitsee San Pedrossa, ja siihen liittyy kiinteästi viereinen Long Beachin satama.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Port_of_Los_Angeles",
            "title": "Port of Los Angeles – Wikipedia"
          }
        ],
        "havaintoId": "iss073e0513936"
      },
      {
        "kysymys": "Kuinka monta matkustajaa LAX-lentokenttä palvelee?",
        "vastaus": "Los Angelesin kansainvälinen lentokenttä (LAX) on yksi maailman vilkkaimmista, ja se palveli ennen koronapandemiaa yli 80 miljoonaa matkustajaa vuodessa. Se on Yhdysvaltain länsirannikon tärkein kansainvälinen solmukohta.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Los_Angeles_International_Airport",
            "title": "Los Angeles International Airport – Wikipedia"
          }
        ],
        "havaintoId": "iss073e0513936"
      }
    ]
  },
  "sanfrancisco": {
    "kysymykset": [
      "Kuinka pitkä Golden Gate -silta on?",
      "Miksi Piilaakso syntyi San Franciscon lahdelle?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka pitkä Golden Gate -silta on?",
        "vastaus": "Golden Gate -silta ylittää San Franciscon lahden sisäänkäynnin ja on noin 2,7 kilometriä pitkä. Valmistuessaan 1937 se oli maailman pisin riippusilta, ja siitä on tullut San Franciscon tunnetuin maamerkki.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Golden_Gate_Bridge",
            "title": "Golden Gate Bridge – Wikipedia"
          }
        ],
        "havaintoId": "iss073e0285002"
      },
      {
        "kysymys": "Miksi Piilaakso syntyi San Franciscon lahdelle?",
        "vastaus": "Piilaakso kehittyi lahden eteläosaan 1900-luvun puolivälin jälkeen Stanfordin yliopiston ja puolijohdeteollisuuden ympärille. Alueesta tuli myöhemmin maailman johtava teknologiayritysten keskittymä.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Silicon_Valley",
            "title": "Silicon Valley – Wikipedia"
          }
        ],
        "havaintoId": "iss073e0285002"
      }
    ]
  },
  "chicago": {
    "kysymykset": [
      "Miksi Chicago rakennettiin uudelleen 1871 jälkeen?",
      "Miksi Chicagoa pidetään pilvenpiirtäjien syntypaikkana?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Chicago rakennettiin uudelleen 1871 jälkeen?",
        "vastaus": "Suuri Chicagon tulipalo tuhosi lokakuussa 1871 suuren osan kaupungin keskustasta. Jälleenrakennuksessa otettiin käyttöön paloturvallisempia rakennusmateriaaleja ja -tekniikoita, jotka mahdollistivat myöhemmin pilvenpiirtäjien synnyn.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Great_Chicago_Fire",
            "title": "Great Chicago Fire – Wikipedia"
          }
        ],
        "havaintoId": "iss073e0080182"
      },
      {
        "kysymys": "Miksi Chicagoa pidetään pilvenpiirtäjien syntypaikkana?",
        "vastaus": "Chicagossa rakennettiin 1880-luvulla ensimmäisiä teräsrunkoisia pilvenpiirtäjiä, kuten Home Insurance Building vuonna 1885. Kaupungin arkkitehdit kehittivät niin kutsutun Chicagon koulukunnan tyylin, joka vaikutti pilvenpiirtäjien suunnitteluun maailmanlaajuisesti.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Home_Insurance_Building",
            "title": "Home Insurance Building – Wikipedia"
          }
        ],
        "havaintoId": "iss073e0080182"
      }
    ]
  },
  "mexico": {
    "kysymykset": [
      "Millä korkeudella Mexico City sijaitsee?",
      "Miksi Mexico City vaipuu vuosi vuodelta?"
    ],
    "vastaukset": [
      {
        "kysymys": "Millä korkeudella Mexico City sijaitsee?",
        "vastaus": "Mexico City sijaitsee noin 2 240 metrin korkeudessa Meksikon laakson pohjalla, entisen Texcoco-järven paikalla. Se on yksi Amerikan mantereen korkeimmalla sijaitsevista suurkaupungeista.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Mexico_City",
            "title": "Mexico City – Wikipedia"
          }
        ],
        "havaintoId": "iss073e0075943"
      },
      {
        "kysymys": "Miksi Mexico City vaipuu vuosi vuodelta?",
        "vastaus": "Kaupunki on rakennettu entisen Texcoco-järven pohjasedimentin päälle, ja pohjaveden liiallinen pumppaus tiivistää savikerroksia. Osissa kaupungista maaperä vaipuu jopa noin 30 senttiä vuodessa, minkä takia kadut ja rakennukset vinoutuvat.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Mexico_City",
            "title": "Mexico City – Wikipedia"
          }
        ],
        "havaintoId": "iss073e0075943"
      }
    ]
  },
  "kapkaupunki": {
    "kysymykset": [
      "Mikä on Kapkaupungin asema Etelä-Afrikassa?",
      "Milloin Kapkaupunki perustettiin?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä on Kapkaupungin asema Etelä-Afrikassa?",
        "vastaus": "Kapkaupunki on Etelä-Afrikan lainsäädäntöpääkaupunki, jossa maan parlamentti kokoontuu. Muut kaksi pääkaupunkia ovat Pretoria (hallinnollinen) ja Bloemfontein (oikeudellinen).",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Cape_Town",
            "title": "Cape Town – Wikipedia"
          }
        ],
        "havaintoId": "iss064e038871"
      },
      {
        "kysymys": "Milloin Kapkaupunki perustettiin?",
        "vastaus": "Alankomaiden Itä-Intian kauppakomppania perusti huoltoaseman Table Bayn rannalle vuonna 1652 Jan van Riebeeckin johdolla. Siitä kehittyi Etelä-Afrikan vanhin eurooppalaisperäinen siirtokunta ja nykyinen Kapkaupunki.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Cape_Town",
            "title": "Cape Town – Wikipedia"
          }
        ],
        "havaintoId": "iss064e038871"
      }
    ]
  },
  "mumbai": {
    "kysymykset": [
      "Millä nimellä Mumbai tunnettiin aiemmin?",
      "Miten Mumbain saaret yhdistyivät toisiinsa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Millä nimellä Mumbai tunnettiin aiemmin?",
        "vastaus": "Mumbaita kutsuttiin aiemmin Bombayksi. Osavaltion hallitus muutti kaupungin virallisen nimen Mumbaiksi vuonna 1995 marathinkielisen nimen mukaisesti.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Mumbai",
            "title": "Mumbai – Wikipedia"
          }
        ],
        "havaintoId": "iss014e08744"
      },
      {
        "kysymys": "Miten Mumbain saaret yhdistyivät toisiinsa?",
        "vastaus": "Mumbai rakennettiin alun perin seitsemälle erilliselle saarelle Arabianmeren rannikolla. Siirtomaakaudella saaret yhdistettiin toisiinsa maantäytöillä yhdeksi yhtenäiseksi Salsette-niemekkeeksi, jolla nykyinen kaupunki sijaitsee.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Mumbai",
            "title": "Mumbai – Wikipedia"
          }
        ],
        "havaintoId": "iss014e08744"
      }
    ]
  },
  "delhi": {
    "kysymykset": [
      "Kuinka suuri Delhin metropolialue on?",
      "Mikä UNESCO-kohde sijaitsee Delhissä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka suuri Delhin metropolialue on?",
        "vastaus": "Delhin kansallinen pääkaupunkialue on väestöltään maailman toiseksi suurin metropolialue, noin 34–35 miljoonaa asukasta. Se on Intian pääkaupunkialue ja yksi maan tärkeimmistä talousalueista.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Delhi",
            "title": "Delhi – Wikipedia"
          }
        ],
        "havaintoId": "iss072e757452"
      },
      {
        "kysymys": "Mikä UNESCO-kohde sijaitsee Delhissä?",
        "vastaus": "Delhissä sijaitsee Punainen linnoitus (Lal Qila), 1600-luvulla rakennettu mogulikeisarien linnoitus. UNESCO merkitsi sen maailmanperintökohteeksi vuonna 2007.",
        "lahteet": [
          {
            "url": "https://whc.unesco.org/en/list/231/",
            "title": "Red Fort Complex, Delhi – UNESCO World Heritage Centre"
          }
        ],
        "havaintoId": "iss072e757452"
      }
    ]
  },
  "bangkok": {
    "kysymykset": [
      "Mikä joki halkoo Bangkokia?",
      "Mikä on Bangkokin virallinen täysi nimi?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä joki halkoo Bangkokia?",
        "vastaus": "Chao Phraya -joki virtaa Bangkokin läpi ja jakaa kaupungin kahtia matkalla Siaminlahteen. Joen suistoalueelle rakennettu kaupunki oli aiemmin tunnettu myös kanavineen.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Bangkok",
            "title": "Bangkok – Wikipedia"
          }
        ],
        "havaintoId": "iss072e757257"
      },
      {
        "kysymys": "Mikä on Bangkokin virallinen täysi nimi?",
        "vastaus": "Bangkokin täysi seremoniallinen nimi on yksi maailman pisimmistä virallisista paikannimistä. Se sisältää yli 160 kirjainta ja kuvailee kaupungin mytologisena \"enkelien kaupunkina\".",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Bangkok",
            "title": "Bangkok – Wikipedia"
          }
        ],
        "havaintoId": "iss072e757257"
      }
    ]
  },
  "jakarta": {
    "kysymykset": [
      "Miksi Indonesia rakentaa uuden pääkaupungin?",
      "Kuinka paljon Jakarta on vajonnut?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Indonesia rakentaa uuden pääkaupungin?",
        "vastaus": "Jakarta vajoaa ja kärsii toistuvista tulvista, ja kaupunki on äärimmäisen ruuhkainen. Tästä syystä Indonesia siirtää pääkaupunkinsa Nusantaraan Borneon saarelle Itä-Kalimantaniin.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Nusantara_(city)",
            "title": "Nusantara (city) – Wikipedia"
          }
        ],
        "havaintoId": "iss030e015896"
      },
      {
        "kysymys": "Kuinka paljon Jakarta on vajonnut?",
        "vastaus": "Pohjaveden liikakäytön vuoksi Pohjois-Jakartan osat ovat vajonneet useita metrejä viime vuosikymmeninä, paikoin jopa noin 10–20 senttiä vuodessa. Vajoaminen on yksi keskeinen syy uuden pääkaupungin rakentamiseen.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Jakarta",
            "title": "Jakarta – Wikipedia"
          }
        ],
        "havaintoId": "iss030e015896"
      }
    ]
  },
  "shanghai": {
    "kysymykset": [
      "Mikä on Dishui-järvi Shanghain kuvassa?",
      "Miksi meri näyttää kuvassa ruskealta?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä on Dishui-järvi Shanghain kuvassa?",
        "vastaus": "Dishui-järvi on ihmisen rakentama makeanveden allas Shanghain itälaidalla. Se on Kiinan suurin tekoallas, ja kuvassa se erottuu selvänä pyöreänä muotona kaupungin rakennetun alueen keskellä, Pudongin lentokentän lähellä.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Shanghai",
            "title": "Shanghai – Wikipedia"
          }
        ],
        "havaintoId": "iss073e0513927"
      },
      {
        "kysymys": "Miksi meri näyttää kuvassa ruskealta?",
        "vastaus": "Jangtse-joen suu tuo mereen runsaasti lietettä ja sedimenttiä, joka värjää rannikkoveden vaaleanruskeaksi. Sedimenttipitoinen rannikkovesi erottuu kuvassa selvästi tummansinisestä avomerestä.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Yangtze",
            "title": "Yangtze – Wikipedia"
          }
        ],
        "havaintoId": "iss073e0513927"
      }
    ]
  },
  "wien": {
    "kysymykset": [
      "Mikä joki halkoo Wienia kuvassa?",
      "Miksi Wienin keskusta näkyy niin kirkkaana?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä joki halkoo Wienia kuvassa?",
        "vastaus": "Tonava virtaa Wienin läpi ja erottuu kuvassa pimeänä nauhana valaistun kaupunkialueen keskellä. Joki jakaa kaupungin ja paljastaa sen sijainnin selvästi myös yökuvassa avaruudesta.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Vienna",
            "title": "Vienna – Wikipedia"
          }
        ],
        "havaintoId": "iss064e005231"
      },
      {
        "kysymys": "Miksi Wienin keskusta näkyy niin kirkkaana?",
        "vastaus": "Tiheä katuvalaistus ja rakennettu ydinalue tekevät Wienin keskustan kirkkaammaksi kuin ympäröivät pienemmät kunnat. Valojen tiheys ja katuverkon kuvio paljastavat kaupungin rajat selvästi avaruudesta käsin.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Vienna",
            "title": "Vienna – Wikipedia"
          }
        ],
        "havaintoId": "iss064e005231"
      }
    ]
  },
  "soul": {
    "kysymykset": [
      "Mikä joki jakaa Soulin kahtia kuvassa?",
      "Kuinka monta asukasta Soulin alueella on?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä joki jakaa Soulin kahtia kuvassa?",
        "vastaus": "Han-joki virtaa Soulin keskustan läpi ja näkyy kuvassa pimeänä, valottomana nauhana kirkkaasti valaistun kaupungin keskellä. Joki on kaupungin tärkein maantieteellinen piirre myös avaruudesta katsottuna.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Seoul",
            "title": "Seoul – Wikipedia"
          }
        ],
        "havaintoId": "iss072e757318"
      },
      {
        "kysymys": "Kuinka monta asukasta Soulin alueella on?",
        "vastaus": "Soulin metropolialueella asuu noin 25 miljoonaa ihmistä, mikä tekee siitä yhden maailman suurimmista kaupunkialueista. Kaupungissa on myös useita UNESCOn maailmanperintökohteita Joseon-dynastian ajalta.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Seoul",
            "title": "Seoul – Wikipedia"
          }
        ],
        "havaintoId": "iss072e757318"
      }
    ]
  },
  "kilimanjaro": {
    "kysymykset": [
      "Kuinka paljon Kilimanjaron jäätikkö on sulanut?",
      "Mikä on Kilimanjaron korkeus ja sijainti?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka paljon Kilimanjaron jäätikkö on sulanut?",
        "vastaus": "Kilimanjaron huipun jääkentät ovat kutistuneet noin 85 prosenttia vuodesta 1912. Vuonna 1912 jäätä oli 11,4 neliökilometriä, vuonna 2011 enää 1,76 neliökilometriä, ja ennusteiden mukaan jää saattaa kadota kokonaan 2040-luvulla.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Northern_Ice_Field_(Mount_Kilimanjaro)",
            "title": "Northern Ice Field (Mount Kilimanjaro) – Wikipedia"
          }
        ],
        "havaintoId": "iss014e18950"
      },
      {
        "kysymys": "Mikä on Kilimanjaron korkeus ja sijainti?",
        "vastaus": "Kilimanjaro on Afrikan korkein vuori, 5895 metriä merenpinnasta, ja sijaitsee Tansaniassa lähellä Kenian rajaa. Se on vapaasti seisova tulivuori ilman vieressään kilpailevaa vuoristoketjua.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Mount_Kilimanjaro",
            "title": "Mount Kilimanjaro – Wikipedia"
          }
        ],
        "havaintoId": "iss056e098062"
      }
    ]
  },
  "victorianputous": {
    "kysymykset": [
      "Miksi Victorianputousta sanotaan maailman suurimmaksi?",
      "Mitkä kaksi maata jakavat Victorianputouksen?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Victorianputousta sanotaan maailman suurimmaksi?",
        "vastaus": "Victorianputous on 1708 metriä leveä ja noin 108 metriä korkea, mikä tekee siitä leveyden ja korkeuden yhdistelmänä maailman suurimman yhtenäisen putoavan vesiverhon. Paikallinen nimi Mosi-oa-Tunya tarkoittaa \"jyrisevää savua\", sumupilven mukaan joka näkyy kilometrien päähän.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Victoria_Falls",
            "title": "Victoria Falls – Wikipedia"
          }
        ],
        "havaintoId": "iss007e14361"
      },
      {
        "kysymys": "Mitkä kaksi maata jakavat Victorianputouksen?",
        "vastaus": "Putous on Sambian ja Zimbabwen rajalla, Zambezi-joen varrella. Molemmilla puolilla on oma kansallispuistonsa, ja koko alue on Mosi-oa-Tunya / Victoria Falls -nimisenä Unescon maailmanperintökohde.",
        "lahteet": [
          {
            "url": "https://whc.unesco.org/en/list/509/",
            "title": "Mosi-oa-Tunya / Victoria Falls – UNESCO World Heritage Centre"
          }
        ],
        "havaintoId": "iss007e14361"
      }
    ]
  },
  "iso-valliriutta": {
    "kysymykset": [
      "Kuinka pitkä Iso valliriutta on?",
      "Näkyykö Iso valliriutta avaruudesta paljain silmin?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka pitkä Iso valliriutta on?",
        "vastaus": "Iso valliriutta ulottuu yli 2300 kilometrin matkalla Australian koillisrannikkoa pitkin ja koostuu lähes 3000 erillisestä riutasta ja yli 900 saaresta. Se on maailman suurin elävien organismien rakentama muodostelma.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Great_Barrier_Reef",
            "title": "Great Barrier Reef – Wikipedia"
          }
        ],
        "havaintoId": "iss068e004262"
      },
      {
        "kysymys": "Näkyykö Iso valliriutta avaruudesta paljain silmin?",
        "vastaus": "Kyllä — Iso valliriutta on yksi harvoista elävistä rakenteista, jotka astronautit ovat maininneet erottuvan avaruudesta sen laajuuden ja värikontrastin vuoksi. Matala vesi riuttojen päällä heijastaa valoa eri tavalla kuin syvempi vesi ympärillä, mikä piirtää turkoosin mosaiikin.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Great_Barrier_Reef",
            "title": "Great Barrier Reef – Wikipedia"
          }
        ],
        "havaintoId": "iss068e004262"
      }
    ]
  },
  "kata-tjuta": {
    "kysymykset": [
      "Mistä kivestä Kata Tjutan kupolit koostuvat?",
      "Kuinka korkea Kata Tjutan korkein huippu on?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mistä kivestä Kata Tjutan kupolit koostuvat?",
        "vastaus": "Kata Tjuta koostuu Mount Currien konglomeraatista, hiekkaan sitoutuneista pyöristyneistä kivilohkareista, jotka ovat peräisin noin 550 miljoonaa vuotta sitten kuluneista vuorista. Se eroaa geologisesti läheisestä Uluru-hiekkakivestä.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Kata_Tjuta",
            "title": "Kata Tjuta – Wikipedia"
          }
        ],
        "havaintoId": "iss023e029806"
      },
      {
        "kysymys": "Kuinka korkea Kata Tjutan korkein huippu on?",
        "vastaus": "Korkein kupoli, Mount Olga, kohoaa 1069 metriin merenpinnasta eli 546 metriä ympäröivää tasankoa korkeammalle. Se on 206 metriä korkeampi kuin läheinen Uluru.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Kata_Tjuta",
            "title": "Kata Tjuta – Wikipedia"
          }
        ],
        "havaintoId": "iss023e029806"
      }
    ]
  },
  "kuollutmeri": {
    "kysymykset": [
      "Kuinka syvällä merenpinnan alla Kuollut meri on?",
      "Miksi Kuollut meri kutistuu?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka syvällä merenpinnan alla Kuollut meri on?",
        "vastaus": "Kuolleen meren rantaviiva on noin 430 metriä merenpinnan alapuolella, mikä tekee siitä Maan matalimman maalla sijaitsevan kohdan. Suolapitoisuus on noin 34 prosenttia, lähes kymmenkertainen valtameriin verrattuna.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Dead_Sea",
            "title": "Dead Sea – Wikipedia"
          }
        ],
        "havaintoId": "iss062e078990"
      },
      {
        "kysymys": "Miksi Kuollut meri kutistuu?",
        "vastaus": "Jordan-joesta virtaava vesi on padottu maatalouskäyttöön, ja mineraaliteollisuus haihduttaa suolavettä altaissa, joten meren pintaa ei enää täydennä riittävästi vesi. Pinta laskee noin metrin vuodessa, ja etelärannalla on syntynyt satoja romahduskuoppia.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Dead_Sea",
            "title": "Dead Sea – Wikipedia"
          }
        ],
        "havaintoId": "iss073e0425936"
      }
    ]
  },
  "tsadjarvi": {
    "kysymykset": [
      "Kuinka paljon Tšadjärvi on kutistunut 1960-luvulta?",
      "Mitkä maat rajautuvat Tšadjärveen?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka paljon Tšadjärvi on kutistunut 1960-luvulta?",
        "vastaus": "Tšadjärvi on kutistunut noin 90 prosenttia 1960-luvun noin 25 000 neliökilometristä nykyiseen noin 1350 neliökilometriin. Syinä ovat sekä ilmastonmuutos että kasvanut kastelukäyttö neljässä rajanaapurimaassa.",
        "lahteet": [
          {
            "url": "https://www.brookings.edu/articles/figure-of-the-week-the-shrinking-lake-chad",
            "title": "Figure of the week: The shrinking Lake Chad – Brookings"
          }
        ],
        "havaintoId": "iss037e015757"
      },
      {
        "kysymys": "Mitkä maat rajautuvat Tšadjärveen?",
        "vastaus": "Tšadjärvi sijaitsee Tšadin, Nigerin, Nigerian ja Kamerunin rajaseudulla Sahelin vyöhykkeellä. Järven kutistuminen on vaikuttanut ruokaturvaan alueella, jossa asuu kymmeniä miljoonia ihmisiä.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Lake_Chad",
            "title": "Lake Chad – Wikipedia"
          }
        ],
        "havaintoId": "iss037e015757"
      }
    ]
  },
  "fitrijarvi": {
    "kysymykset": [
      "Mikä tekee Fitrijärvestä umpijärven?",
      "Miksi Fitrijärvi on suojeltu Ramsar-alue?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä tekee Fitrijärvestä umpijärven?",
        "vastaus": "Fitrijärvi on umpijärvi eli sillä ei ole luonnollista purkautumisreittiä mereen — kaikki siihen tuleva vesi joko haihtuu tai imeytyy maaperään. Se sijaitsee keskisessä Tšadissa Sahelin ja Saharan rajavyöhykkeellä.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Lake_Fitri",
            "title": "Lake Fitri – Wikipedia"
          }
        ],
        "havaintoId": "iss030e059398"
      },
      {
        "kysymys": "Miksi Fitrijärvi on suojeltu Ramsar-alue?",
        "vastaus": "Fitrijärvi on nimetty kansainvälisesti tärkeäksi kosteikoksi Ramsar-sopimuksen alla, koska se on tärkeä pesimä- ja levähdyspaikka muuttolinnuille Sahelin kuivalla vyöhykkeellä. Alue tarjoaa myös elannon kalastajille ja karjapaimenille.",
        "lahteet": [
          {
            "url": "https://rsis.ramsar.org/ris/732",
            "title": "Lac Fitri – Ramsar Sites Information Service"
          }
        ],
        "havaintoId": "iss030e059398"
      }
    ]
  },
  "dardanellit": {
    "kysymykset": [
      "Mitkä kaksi merta Dardanellit yhdistää?",
      "Mikä historiallinen taistelu käytiin Gallipolin niemimaalla?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitkä kaksi merta Dardanellit yhdistää?",
        "vastaus": "Dardanellit on 61 kilometriä pitkä salmi, joka yhdistää Egeanmeren Marmarameren kautta Mustaanmereen. Se erottaa Euroopan ja Aasian mantereet toisistaan yhdessä Bosporin kanssa.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Dardanelles",
            "title": "Dardanelles – Wikipedia"
          }
        ],
        "havaintoId": "iss014e08138"
      },
      {
        "kysymys": "Mikä historiallinen taistelu käytiin Gallipolin niemimaalla?",
        "vastaus": "Vuosina 1915–1916 Gallipolin taistelu käytiin salmen länsipuolella osana ensimmäistä maailmansotaa, kun liittoutuneet yrittivät vallata salmen epäonnistuneesti. Taistelu vaati satojatuhansia uhreja molemmin puolin.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Gallipoli_campaign",
            "title": "Gallipoli campaign – Wikipedia"
          }
        ],
        "havaintoId": "iss002e7758"
      }
    ]
  },
  "okavango": {
    "kysymykset": [
      "Miksi Okavango-joki ei koskaan saavuta merta?",
      "Milloin Okavango-suisto nimettiin maailmanperinnöksi?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Okavango-joki ei koskaan saavuta merta?",
        "vastaus": "Okavango-joki virtaa Angolan ylängöiltä Kalaharin aavikon tasaiselle hiekalle Botswanassa, jossa se haarautuu suistoksi ja haihtuu tai imeytyy kokonaan ennen merta. Se on maailman suurin sisämaan suisto.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Okavango_Delta",
            "title": "Okavango Delta – Wikipedia"
          }
        ],
        "havaintoId": "iss073e0604445"
      },
      {
        "kysymys": "Milloin Okavango-suisto nimettiin maailmanperinnöksi?",
        "vastaus": "Okavango-suisto liitettiin Unescon maailmanperintöluetteloon vuonna 2014 tuhannentena kohteena listalla. Se tulvii vuosittain sesongin mukaan, mikä tekee siitä poikkeuksellisen dynaamisen ekosysteemin.",
        "lahteet": [
          {
            "url": "https://whc.unesco.org/en/list/1432/",
            "title": "Okavango Delta – UNESCO World Heritage Centre"
          }
        ],
        "havaintoId": "iss040e008209"
      }
    ]
  },
  "kolmen-rotkon-pato": {
    "kysymykset": [
      "Kuinka pitkä Kolmen rotkon padon tekojärvi on?",
      "Mitkä olivat padon rakentamisen päätavoitteet?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka pitkä Kolmen rotkon padon tekojärvi on?",
        "vastaus": "Patoallas ulottuu yli 600 kilometrin matkalla Jangtse-jokea pitkin. Pato on maailman suurin voimalaitos asennetulta teholtaan ja valmistui vuonna 2006.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Three_Gorges_Dam",
            "title": "Three Gorges Dam – Wikipedia"
          }
        ],
        "havaintoId": "iss019e007720"
      },
      {
        "kysymys": "Mitkä olivat padon rakentamisen päätavoitteet?",
        "vastaus": "Padon tehtävät ovat vesivoiman tuotanto, tulvasuojelu alajuoksun tiheästi asutuilla alueilla ja joen laivaliikenteen parantaminen. Rakennustyö siirsi arviolta 1,3 miljoonaa ihmistä uusille asuinsijoille.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Three_Gorges_Dam",
            "title": "Three Gorges Dam – Wikipedia"
          }
        ],
        "havaintoId": "iss019e007720"
      }
    ]
  },
  "vesuvius": {
    "kysymykset": [
      "Minä vuonna Vesuvius tuhosi Pompejin?",
      "Milloin Vesuvius purkautui viimeksi?"
    ],
    "vastaukset": [
      {
        "kysymys": "Minä vuonna Vesuvius tuhosi Pompejin?",
        "vastaus": "Vesuvius purkautui vuonna 79 jaa. ja hautasi kaupungit Pompejin ja Herculaneumin tuhkaan ja pyroklastisiin virtoihin. Tuhkakerros säilytti kaupungit yllättävän hyvin tuhansiksi vuosiksi.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Mount_Vesuvius",
            "title": "Mount Vesuvius – Wikipedia"
          }
        ],
        "havaintoId": "iss061e006435"
      },
      {
        "kysymys": "Milloin Vesuvius purkautui viimeksi?",
        "vastaus": "Vesuviuksen viimeisin purkaus tapahtui maaliskuussa 1944, toisen maailmansodan aikana, ja tuhosi useita kyliä sekä lähes 80 amerikkalaista pommikonetta lentokentällä. Siitä lähtien vuori on ollut lepotilassa.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Mount_Vesuvius",
            "title": "Mount Vesuvius – Wikipedia"
          }
        ],
        "havaintoId": "iss067e010622"
      }
    ]
  },
  "ounianga": {
    "kysymykset": [
      "Miksi Ouniangan järvissä on makeaa vettä keskellä Saharaa?",
      "Mistä Ouniangan järvet ovat peräisin?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Ouniangan järvissä on makeaa vettä keskellä Saharaa?",
        "vastaus": "Järviä ruokkii suuri pohjavesivaranto, joka tuo makeaa vettä pintaan haihtumista nopeammin. Vain yksi kymmenestä järvestä on suolainen, vaikka haihtuminen alueella on erittäin voimakasta.",
        "lahteet": [
          {
            "url": "https://whc.unesco.org/en/list/1400/",
            "title": "Lakes of Ounianga – UNESCO World Heritage Centre"
          }
        ],
        "havaintoId": "iss021e026475"
      },
      {
        "kysymys": "Mistä Ouniangan järvet ovat peräisin?",
        "vastaus": "Järvet ovat jäänteitä yhdestä suuresta, noin 50 metriä syvästä järvestä, joka täytti alueen niin sanotun Afrikan kostean kauden aikana noin 14 800–5 500 vuotta sitten. Ilmaston kuivuessa tuulen kasaamat dyynit pilkkoivat sen nykyisiksi erillisiksi järviksi.",
        "lahteet": [
          {
            "url": "https://whc.unesco.org/en/list/1400/",
            "title": "Lakes of Ounianga – UNESCO World Heritage Centre"
          }
        ],
        "havaintoId": "iss021e026475"
      }
    ]
  },
  "sokotra": {
    "kysymykset": [
      "Kuinka moni Sokotran kasvilaji on endeemisiä?",
      "Mikä on lohikäärmeenveripuu ja miksi se on tärkeä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka moni Sokotran kasvilaji on endeemisiä?",
        "vastaus": "Sokotran noin 825 kasvilajista 307 eli 37 prosenttia ei kasva luonnossa missään muualla maailmassa. Myös 90 prosenttia saaren matelijoista on endeemisiä, mikä tekee saaresta yhden maailman biologisesti ainutlaatuisimmista paikoista.",
        "lahteet": [
          {
            "url": "https://www.nationalgeographic.com/environment/article/socotra-yemen-biodiversity-photography",
            "title": "Can Socotra, Yemen's 'Dragon's Blood Island,' be saved? – National Geographic"
          }
        ],
        "havaintoId": "iss069e004768"
      },
      {
        "kysymys": "Mikä on lohikäärmeenveripuu ja miksi se on tärkeä?",
        "vastaus": "Lohikäärmeenveripuu (Dracaena cinnabari) on Sokotralle endeeminen, sateenvarjonmuotoinen puu, jonka punainen pihka on ollut arvostettu väriaine ja lääkeaine vuosisatoja. Puun latvus kerää kosteutta ja suojaa alleen kasvavia muita harvinaisia kasveja.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Dragon%27s_blood_tree",
            "title": "Dragon's blood tree – Wikipedia"
          }
        ],
        "havaintoId": "iss069e004768"
      }
    ]
  },
  "titicaca": {
    "kysymykset": [
      "Kuinka korkealla Titicaca-järvi sijaitsee?",
      "Mitkä maat jakavat Titicaca-järven?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka korkealla Titicaca-järvi sijaitsee?",
        "vastaus": "Titicaca-järvi sijaitsee noin 3812 metrin korkeudessa Andeilla, mikä tekee siitä maailman korkeimman suurten alusten purjehduskelpoisen järven. Se on myös Etelä-Amerikan suurin järvi tilavuudeltaan.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Lake_Titicaca",
            "title": "Lake Titicaca – Wikipedia"
          }
        ],
        "havaintoId": "iss055e071030"
      },
      {
        "kysymys": "Mitkä maat jakavat Titicaca-järven?",
        "vastaus": "Järvi on Perun ja Bolivian rajalla, ja kumpikin maa hallinnoi noin puolta sen vesialueesta. Järven saarilla, kuten ihmiskäsin rakennetuilla Uros-ruokosaarilla, asuu edelleen alkuperäiskansojen yhteisöjä.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Lake_Titicaca",
            "title": "Lake Titicaca – Wikipedia"
          }
        ],
        "havaintoId": "iss067e149915"
      }
    ]
  },
  "gizan-pyramidit": {
    "kysymykset": [
      "Kuinka kauan Gizan pyramidi oli korkein rakennelma?",
      "Mikä ihme antiikin seitsemästä on yhä pystyssä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka kauan Gizan pyramidi oli korkein rakennelma?",
        "vastaus": "Khufun pyramidi valmistui noin 2560 eaa. 146,6 metrin korkuisena ja pysyi maailman korkeimpana ihmisen rakentamana rakennelmana yli 3700 vuotta. Nykyään sen korkeus on 138,5 metriä, koska ulkopinnan kalkkikivilaatat on poistettu vuosisatojen varrella.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza",
            "title": "Great Pyramid of Giza – Wikipedia"
          }
        ],
        "havaintoId": "iss032e009123"
      },
      {
        "kysymys": "Mikä ihme antiikin seitsemästä on yhä pystyssä?",
        "vastaus": "Gizan suuri pyramidi on ainoa antiikin maailman seitsemästä ihmeestä, joka on säilynyt pääosin ehjänä nykypäivään. Muut kuusi, kuten Babylonin riippuvat puutarhat, ovat tuhoutuneet vuosisatojen kuluessa.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza",
            "title": "Great Pyramid of Giza – Wikipedia"
          }
        ],
        "havaintoId": "iss068e006657"
      }
    ]
  },
  "tshernobyl": {
    "kysymykset": [
      "Minä päivänä Tšernobylin ydinonnettomuus tapahtui?",
      "Mikä on voimalan päälle rakennettu teräskaari?"
    ],
    "vastaukset": [
      {
        "kysymys": "Minä päivänä Tšernobylin ydinonnettomuus tapahtui?",
        "vastaus": "Onnettomuus tapahtui 26. huhtikuuta 1986, kun voimalan nelosreaktori räjähti testin aikana ja levitti radioaktiivista laskeumaa laajalle alueelle Eurooppaa. Noin 350 000 ihmistä evakuoitiin alueelta.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Chernobyl_disaster",
            "title": "Chernobyl disaster – Wikipedia"
          }
        ],
        "havaintoId": "iss057e051419"
      },
      {
        "kysymys": "Mikä on voimalan päälle rakennettu teräskaari?",
        "vastaus": "Räjähtäneen nelosreaktorin päälle valmistui vuonna 2016 uusi suojarakenne, New Safe Confinement, joka estää radioaktiivisen materiaalin leviämisen ja mahdollistaa vanhan, kiireesti rakennetun sarkofagin purkamisen. Rakenne on tarpeeksi suuri peittämään koko vaurioituneen reaktorirakennuksen.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Chernobyl_New_Safe_Confinement",
            "title": "Chernobyl New Safe Confinement – Wikipedia"
          }
        ],
        "havaintoId": "iss057e051419"
      }
    ]
  },
  "everest": {
    "kysymykset": [
      "Mikä on Mount Everestin virallinen korkeus?",
      "Ketkä kiipesivät Everestille ensimmäisinä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä on Mount Everestin virallinen korkeus?",
        "vastaus": "Nepal ja Kiina vahvistivat yhdessä vuonna 2020 Everestin korkeudeksi 8849 metriä merenpinnasta. Se on maapallon korkein kohta merenpinnasta mitattuna, vaikka se ei ole kauimpana maapallon keskipisteestä.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Mount_Everest",
            "title": "Mount Everest – Wikipedia"
          }
        ],
        "havaintoId": "iss069e003192"
      },
      {
        "kysymys": "Ketkä kiipesivät Everestille ensimmäisinä?",
        "vastaus": "Uusiseelantilainen Edmund Hillary ja nepalilainen Tenzing Norgay saavuttivat huipun ensimmäisinä 29. toukokuuta 1953. Siitä lähtien tuhannet kiipeilijät ovat seuranneet heidän jäljissään, osa menettäen henkensä matkalla.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/1953_British_Mount_Everest_expedition",
            "title": "1953 British Mount Everest expedition – Wikipedia"
          }
        ],
        "havaintoId": "iss069e003192"
      }
    ]
  },
  "aletsch": {
    "kysymykset": [
      "Kuinka pitkä Aletschin jäätikkö on?",
      "Mitkä kolme huippua reunustavat Aletschin jäätikköä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka pitkä Aletschin jäätikkö on?",
        "vastaus": "Aletschin jäätikkö on noin 23 kilometriä pitkä ja Alppien suurin ja pisin jäätikkö. Se on kutistunut 1980-luvulta yli kilometrin verran pituudeltaan ilmaston lämmetessä.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Aletsch_Glacier",
            "title": "Aletsch Glacier – Wikipedia"
          }
        ],
        "havaintoId": "iss013e77377"
      },
      {
        "kysymys": "Mitkä kolme huippua reunustavat Aletschin jäätikköä?",
        "vastaus": "Jungfrau, Mönch ja Eiger kohoavat jäätikön yläpuolella Bernin Alpeilla, ja niiden juurelta yhtyvät jäävirrat muodostavat Aletschin jäätikön. Alue kuuluu Jungfrau-Aletsch-Bietschhornin Unescon maailmanperintökohteeseen.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Aletsch_Glacier",
            "title": "Aletsch Glacier – Wikipedia"
          }
        ],
        "havaintoId": "iss013e77377"
      }
    ]
  },
  "torres-del-paine": {
    "kysymykset": [
      "Mistä Torres del Painen graniittitornit ovat syntyneet?",
      "Mikä uhkaa Torres del Painen jäätiköitä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mistä Torres del Painen graniittitornit ovat syntyneet?",
        "vastaus": "Tornit ovat noin 12 miljoonaa vuotta sitten syntynyttä graniittia, joka on paljastunut kun pehmeämpi ympäröivä kivi on kulunut pois jäätiköiden ja sään vaikutuksesta. Korkein torni kohoaa yli 2850 metriin.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Torres_del_Paine_National_Park",
            "title": "Torres del Paine National Park – Wikipedia"
          }
        ],
        "havaintoId": "iss056e096830"
      },
      {
        "kysymys": "Mikä uhkaa Torres del Painen jäätiköitä?",
        "vastaus": "Patagonian jäätiköt, mukaan lukien kansallispuiston Grey- ja Tyndall-jäätiköt, ovat perääntyneet nopeasti viime vuosikymmeninä ilmaston lämmetessä. Sulava jää muuttaa alueen järvien vedenpintoja ja jokien virtaamia.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Southern_Patagonian_Ice_Field",
            "title": "Southern Patagonian Ice Field – Wikipedia"
          }
        ],
        "havaintoId": "iss016e012047"
      }
    ]
  },
  "kilauea": {
    "kysymykset": [
      "Kuinka monta kotia Kilauean 2018 purkaus tuhosi?",
      "Miksi Kilauea on yksi maailman aktiivisimmista tulivuorista?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka monta kotia Kilauean 2018 purkaus tuhosi?",
        "vastaus": "Toukokuussa 2018 alkanut Kilauean alarinteen purkaus tuhosi yli 700 kotia ja pakotti tuhannet asukkaat evakkoon Ison saaren itäosassa. Laava loi saarelle myös satoja hehtaareja kokonaan uutta maata mereen valuessaan.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/2018_lower_Puna_eruption",
            "title": "2018 lower Puna eruption – Wikipedia"
          }
        ],
        "havaintoId": "iss055e070297"
      },
      {
        "kysymys": "Miksi Kilauea on yksi maailman aktiivisimmista tulivuorista?",
        "vastaus": "Kilauea on purkautunut lähes jatkuvasti vuosikymmenten ajan, koska se sijaitsee Havaijin kuuman pisteen yllä, jossa magmaa nousee suoraan vaipasta pintaan. Vuori on yksi viidestä tulivuoresta, jotka muodostavat Havaijin Ison saaren.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/K%C4%ABlauea",
            "title": "Kīlauea – Wikipedia"
          }
        ],
        "havaintoId": "iss055e070297"
      }
    ]
  },
  "ararat": {
    "kysymykset": [
      "Kuinka korkea Ararat-vuori on?",
      "Mihin raamatulliseen tarinaan Ararat liittyy?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka korkea Ararat-vuori on?",
        "vastaus": "Ararat kohoaa 5137 metriin merenpinnasta ja on Turkin korkein vuori. Se on sammunut tulivuori, jonka juurella Turkin, Armenian ja Iranin rajat kohtaavat lähellä toisiaan.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Mount_Ararat",
            "title": "Mount Ararat – Wikipedia"
          }
        ],
        "havaintoId": "iss064e029480"
      },
      {
        "kysymys": "Mihin raamatulliseen tarinaan Ararat liittyy?",
        "vastaus": "Ararat-vuori mainitaan Raamatun 1. Mooseksen kirjassa paikkana, johon Nooan arkin kerrotaan pysähtyneen vedenpaisumuksen jälkeen. Vuori on siksi ollut vuosisatoja tutkimusmatkailijoiden ja arkin etsijöiden kohteena.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Mount_Ararat",
            "title": "Mount Ararat – Wikipedia"
          }
        ],
        "havaintoId": "iss064e029480"
      }
    ]
  },
  "crater-lake": {
    "kysymykset": [
      "Kuinka syvä Crater Lake on ja miten se syntyi?",
      "Miksi Crater Lake on niin poikkeuksellisen sininen?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka syvä Crater Lake on ja miten se syntyi?",
        "vastaus": "Crater Lake on 592 metriä syvä, Yhdysvaltain syvin järvi. Se täytti Mount Mazama -tulivuoren kalderan noin 7700 vuotta sitten tapahtuneen valtavan purkauksen ja sen jälkeisen romahduksen jälkeen.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Crater_Lake_National_Park",
            "title": "Crater Lake National Park – Wikipedia"
          }
        ],
        "havaintoId": "iss013e54243"
      },
      {
        "kysymys": "Miksi Crater Lake on niin poikkeuksellisen sininen?",
        "vastaus": "Järveä ruokkii ainoastaan sade ja lumi, ei jokia, joten vesi on erittäin puhdasta ja kirkasta. Puhdas vesi absorboi punaisen valon ja heijastaa sinisen, mikä tekee järvestä poikkeuksellisen tummansinisen.",
        "lahteet": [
          {
            "url": "https://www.nps.gov/crla/planyourvisit/upload/Introduction-to-Crater-Lake-508.pdf",
            "title": "Introduction to Crater Lake – National Park Service"
          }
        ],
        "havaintoId": "iss062e152575"
      }
    ]
  },
  "upsala-jaatikko": {
    "kysymykset": [
      "Kuinka paljon Upsala-jäätikkö on vetäytynyt?",
      "Mikä on Etelä-Patagonian jäätikköalue?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka paljon Upsala-jäätikkö on vetäytynyt?",
        "vastaus": "Vuosien 2002 ja 2013 välillä Upsala-jäätikön reuna vetäytyi keskimäärin 3,6 kilometriä. Tutkijoiden mukaan vetäytyminen liittyy alueen ilmaston lämpenemiseen ja on osa laajempaa suuntausta, joka on havaittu kymmenissä Patagonian jäätiköissä.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss037e005104",
            "title": "Upsala Glacier Retreat – NASA"
          }
        ],
        "havaintoId": "iss037e005104"
      },
      {
        "kysymys": "Mikä on Etelä-Patagonian jäätikköalue?",
        "vastaus": "Etelä-Patagonian jäätikköalue Argentiinan ja Chilen rajalla on Etelämantereen ja Grönlannin jälkeen maailman kolmanneksi suurin yhtenäinen jäämassa. Upsala on sen kolmanneksi suurin yksittäinen jäätikkö.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Southern_Patagonian_Ice_Field",
            "title": "Southern Patagonian Ice Field – Wikipedia"
          }
        ],
        "havaintoId": "iss021e015243"
      }
    ]
  },
  "poopojarvi": {
    "kysymykset": [
      "Miksi Poopó-järvi kuivui lähes kokonaan?",
      "Kuinka korkealla Poopó-järvi sijaitsee?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Poopó-järvi kuivui lähes kokonaan?",
        "vastaus": "Poopó kuivui lähes kokonaan vuonna 2015 ja uudelleen 2020-luvulla. Sitä ruokkivien jokien vettä on ohjattu yhä enemmän kaivoksille ja maataloudelle, ja ilmaston lämmetessä haihdunta on kiihtynyt.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Lake_Poop%C3%B3",
            "title": "Lake Poopó – Wikipedia"
          }
        ],
        "havaintoId": "iss070e098385"
      },
      {
        "kysymys": "Kuinka korkealla Poopó-järvi sijaitsee?",
        "vastaus": "Järvi sijaitsee noin 3 700 metrin korkeudessa Bolivian Andeilla. Se on niin matala — yleensä alle kolme metriä — että pienikin sademäärän muutos ylä-Andeilla näkyy suoraan sen pinta-alassa.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss012e06469",
            "title": "Lake Poopo – NASA"
          }
        ],
        "havaintoId": "iss012e06469"
      }
    ]
  },
  "etosha": {
    "kysymykset": [
      "Kuinka pitkä Etosha-tasanko on?",
      "Miksi Etosha on yleensä täysin kuiva?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka pitkä Etosha-tasanko on?",
        "vastaus": "Etosha-tasanko on noin 120 kilometriä pitkä kuivunut järvenpohja Pohjois-Namibiassa. Se on nykyisin maan suurimman eläinpuiston sydän, jossa elää muun muassa norsuja, sarvikuonoja ja leijonia.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Etosha_Pan",
            "title": "Etosha Pan – Wikipedia"
          }
        ],
        "havaintoId": "iss030e234965"
      },
      {
        "kysymys": "Miksi Etosha on yleensä täysin kuiva?",
        "vastaus": "Tasangolle laskevien jokien vesi imeytyy yleensä uomaan matkalla, joten se ei juuri koskaan yllä pannun pohjalle saakka. Noin 16 000 vuotta sitten nykyistä kosteampi ilmasto täytti koko järven vedellä.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss011e09504",
            "title": "Ekuma River and Etosha Pan – NASA"
          }
        ],
        "havaintoId": "iss011e09504"
      }
    ]
  },
  "eyrejarvi": {
    "kysymykset": [
      "Mikä sai Eyre-järven veden punaiseksi?",
      "Miksi Eyre-järvi on yleensä kuiva?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä sai Eyre-järven veden punaiseksi?",
        "vastaus": "Punaisen värin tekevät suolaa sietävät mikrobit, jotka lisääntyvät valtavan tiheiksi kun haihtuminen nostaa veden suolapitoisuutta. Niiden solukalvojen karotenoidipigmentti värjää koko lammen punaiseksi tai vaaleanpunaiseksi.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss030e009271",
            "title": "Lake Eyre Floods – NASA"
          }
        ],
        "havaintoId": "iss030e009271"
      },
      {
        "kysymys": "Miksi Eyre-järvi on yleensä kuiva?",
        "vastaus": "Eyre on umpialtaan järvi ilman laskua mereen, joten kaikki siihen tuleva vesi vain haihtuu. Vettä nousee pinnalle vain harvoina sadevuosina; suurimman osan ajasta pohja on paljasta valkoista suolaa.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Lake_Eyre",
            "title": "Lake Eyre – Wikipedia"
          }
        ],
        "havaintoId": "iss030e009271"
      }
    ]
  },
  "sharkbay": {
    "kysymykset": [
      "Mikä tekee Shark Baysta ainutlaatuisen?",
      "Miksi Shark Bay on maailmanperintökohde?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä tekee Shark Baysta ainutlaatuisen?",
        "vastaus": "Shark Bayssa kasvaa maailman laajin ja vanhin merikaislaniitty. Sen matalissa lahdissa elää eläviä stromatoliitteja — kivimäisiä mikrobimattoja, jotka muistuttavat maapallon varhaisimpia elämänmuotoja yli 3 miljardin vuoden takaa.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Shark_Bay",
            "title": "Shark Bay – Wikipedia"
          }
        ],
        "havaintoId": "iss064e003722"
      },
      {
        "kysymys": "Miksi Shark Bay on maailmanperintökohde?",
        "vastaus": "Shark Bay liitettiin Unescon maailmanperintöluetteloon 1991 ainutlaatuisen merikaislakasvillisuutensa ja harvinaisten stromatoliittiensa vuoksi. Alueella elää myös maailman suurin tunnettu dugong-lehmäkalakanta.",
        "lahteet": [
          {
            "url": "https://whc.unesco.org/en/list/578/",
            "title": "Shark Bay, Western Australia – UNESCO World Heritage"
          }
        ],
        "havaintoId": "iss057e105411"
      }
    ]
  },
  "pyramidjarvi": {
    "kysymykset": [
      "Mistä Pyramid Lake on saanut nimensä?",
      "Mikä oli muinainen Lahontan-järvi?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mistä Pyramid Lake on saanut nimensä?",
        "vastaus": "Järvi on saanut nimensä pyramidinmuotoisesta tufakalkkikivipatsaasta rannallaan. Alue kuuluu Pyramid Laken paiute-heimon reservaattiin Nevadassa.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Pyramid_Lake_(Nevada)",
            "title": "Pyramid Lake (Nevada) – Wikipedia"
          }
        ],
        "havaintoId": "iss073e0919979"
      },
      {
        "kysymys": "Mikä oli muinainen Lahontan-järvi?",
        "vastaus": "Muinainen Lahontan-järvi peitti viimeisimmän jääkauden huipulla noin 15 000 vuotta sitten suuren osan Nevadaa. Pyramid Lake on sen syvimmän altaan jäljellä oleva jäänne.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss025e005259",
            "title": "Pyramid Lake, Nevada – NASA"
          }
        ],
        "havaintoId": "iss025e005259"
      }
    ]
  },
  "monojarvi": {
    "kysymykset": [
      "Miksi Mono-järvi on suolainen?",
      "Mikä on tufa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Mono-järvi on suolainen?",
        "vastaus": "Mono-järvellä ei ole luonnollista laskujokea, joten sinne virtaavat suolat ja mineraalit jäävät veteen ja haihtuminen väkevöittää niitä. Järvi on noin 2–3 kertaa merivettä suolaisempi.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Mono_Lake",
            "title": "Mono Lake – Wikipedia"
          }
        ],
        "havaintoId": "iss069e000859"
      },
      {
        "kysymys": "Mikä on tufa?",
        "vastaus": "Tufa on kalkkikiveä, joka saostuu kun kalsiumpitoinen lähdevesi kohtaa emäksisen järviveden. Mono-järven tufapatsaat paljastuivat, kun Los Angeles alkoi 1940-luvulla johtaa järven syöttöjokia kaupunkiin ja vedenpinta laski.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Mono_Lake",
            "title": "Mono Lake – Wikipedia"
          }
        ],
        "havaintoId": "iss069e000859"
      }
    ]
  },
  "saltonjarvi": {
    "kysymykset": [
      "Miten Salton Sea syntyi?",
      "Miksi Salton Sea suolaantuu koko ajan?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miten Salton Sea syntyi?",
        "vastaus": "Salton Sea syntyi vahingossa vuonna 1905, kun Colorado-joki murtautui kastelukanavan läpi. Vuoto täytti kuivan altaan kahdeksi vuodeksi ennen kuin se saatiin tukittua.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Salton_Sea",
            "title": "Salton Sea – Wikipedia"
          }
        ],
        "havaintoId": "iss040e011868"
      },
      {
        "kysymys": "Miksi Salton Sea suolaantuu koko ajan?",
        "vastaus": "Järvellä ei ole luonnollista laskua mereen, ja sen vesi haihtuu jatkuvasti jättäen suolan jälkeensä. Nykyisin Salton Sea on suolaisempi kuin valtameri.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Salton_Sea",
            "title": "Salton Sea – Wikipedia"
          }
        ],
        "havaintoId": "iss040e011868"
      }
    ]
  },
  "etelaalpit-jarvet": {
    "kysymykset": [
      "Kuka on Aoraki eli Mount Cook?",
      "Miksi jäätikköjärvet ovat turkoosin värisiä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuka on Aoraki eli Mount Cook?",
        "vastaus": "Aoraki eli Mount Cook on Uuden-Seelannin korkein vuori, 3 724 metriä merenpinnasta. Se on maorien pyhä vuori ja Etelä-Alppien jäätiköiden pääsolmukohta.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Aoraki_/_Mount_Cook",
            "title": "Aoraki / Mount Cook – Wikipedia"
          }
        ],
        "havaintoId": "iss071e073568"
      },
      {
        "kysymys": "Miksi jäätikköjärvet ovat turkoosin värisiä?",
        "vastaus": "Jäätiköt jauhavat kalliota hienoksi kivijauhoksi, joka jää veteen leijumaan eikä laskeudu pohjaan. Jauho heijastaa auringonvaloa turkoosina, ja väri vaihtelee sen mukaan, kuinka paljon jauhoa syöttöjoki kuljettaa.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss071e073568",
            "title": "Lakes Tekapo, Pukaki, and Ohau – NASA"
          }
        ],
        "havaintoId": "iss071e073568"
      }
    ]
  },
  "zion": {
    "kysymykset": [
      "Milloin Zion kansallispuisto perustettiin?",
      "Mistä Zionin punainen kivi on peräisin?"
    ],
    "vastaukset": [
      {
        "kysymys": "Milloin Zion kansallispuisto perustettiin?",
        "vastaus": "Zion National Park perustettiin vuonna 1919, kymmenen vuotta sen jälkeen kun aluetta oli suojeltu Mukuntuweap-kansallismonumenttina. Uusi tie mahdollisti pääsyn kanjoniin autolla.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Zion_National_Park",
            "title": "Zion National Park – Wikipedia"
          }
        ],
        "havaintoId": "iss017e005351"
      },
      {
        "kysymys": "Mistä Zionin punainen kivi on peräisin?",
        "vastaus": "Zionin vaaleanpunertava Navajo-hiekkakivi on noin 200 miljoonaa vuotta vanhan aavikon hiekkadyynien jäänne. Alue muistutti tuolloin nykyistä Saharaa.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss017e005351",
            "title": "Zion National Park, Utah – NASA"
          }
        ],
        "havaintoId": "iss017e005351"
      }
    ]
  },
  "volgansuisto": {
    "kysymykset": [
      "Mihin Volga laskee?",
      "Mitä kalaa Volgan suistosta pyydystetään?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mihin Volga laskee?",
        "vastaus": "Volga on Euroopan pisin joki. Se laskee yli 3 500 kilometrin matkan jälkeen suistonsa kautta Kaspianmereen, joka on maailman suurin järvi.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Volga_River",
            "title": "Volga River – Wikipedia"
          }
        ],
        "havaintoId": "iss005e11203"
      },
      {
        "kysymys": "Mitä kalaa Volgan suistosta pyydystetään?",
        "vastaus": "Volgan suisto on tärkeä pyyntialue beluga-sammelle, jonka mädistä valmistetaan arvostettua beluga-kaviaaria. Laji on nykyään erittäin uhanalainen liikakalastuksen vuoksi.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss005e11203",
            "title": "The Volga Delta, Russia – NASA"
          }
        ],
        "havaintoId": "iss005e11203"
      }
    ]
  },
  "irrawaddyn-suisto": {
    "kysymykset": [
      "Kuinka pitkä Irrawaddy-joki on?",
      "Mitä Irrawaddyn suisto tuottaa Myanmarille?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka pitkä Irrawaddy-joki on?",
        "vastaus": "Irrawaddy-joki virtaa noin 2 170 kilometriä Myanmarin halki pohjoisesta etelään. Se on maan tärkein vesiväylä ja elinkeinojen lähde.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Irrawaddy_River",
            "title": "Irrawaddy River – Wikipedia"
          }
        ],
        "havaintoId": "iss073e1197819"
      },
      {
        "kysymys": "Mitä Irrawaddyn suisto tuottaa Myanmarille?",
        "vastaus": "Suiston mangrovemetsät, riisipellot ja kosteikot tuottavat suuren osan Myanmarin riisistä ja suojaavat rannikkoa myrskyiltä. Vuoden 2008 Nargis-hirmumyrsky tuhosi silti suuren osan aluetta.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss073e1197819",
            "title": "Irrawaddy Delta, Myanmar – NASA"
          }
        ],
        "havaintoId": "iss073e1197819"
      }
    ]
  },
  "colorado-suisto": {
    "kysymykset": [
      "Miksi Colorado-joki ei enää yllä mereen?",
      "Mikä on Kalifornianlahti?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Colorado-joki ei enää yllä mereen?",
        "vastaus": "Colorado-joen vesi käytetään lähes kokonaan kasteluun ja kaupunkien vedenjakeluun Yhdysvalloissa ja Meksikossa. Se ehtii nykyään suistoonsa asti enää harvoin.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Colorado_River",
            "title": "Colorado River – Wikipedia"
          }
        ],
        "havaintoId": "iss064e002258"
      },
      {
        "kysymys": "Mikä on Kalifornianlahti?",
        "vastaus": "Kalifornianlahti erottaa Baja Californian niemimaan Meksikon mantereesta. Sen pohjukkaan laskeva Colorado-joen suisto on nimetty biosfäärialueeksi harvinaisen lajistonsa vuoksi.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss064e002258",
            "title": "Colorado River Delta Biosphere Reserve – NASA"
          }
        ],
        "havaintoId": "iss064e002258"
      }
    ]
  },
  "santorini": {
    "kysymykset": [
      "Milloin Santorini purkautui viimeksi rajusti?",
      "Missä Santorini sijaitsee Kreikassa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Milloin Santorini purkautui viimeksi rajusti?",
        "vastaus": "Santorinin suuri purkaus tapahtui noin vuonna 1620 eaa. ja on yksi viimeisten 10 000 vuoden voimakkaimmista. Se romahdutti saaren keskiosan mereen ja loi nykyisen kalderan.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Minoan_eruption",
            "title": "Minoan eruption – Wikipedia"
          }
        ],
        "havaintoId": "iss017e005037"
      },
      {
        "kysymys": "Missä Santorini sijaitsee Kreikassa?",
        "vastaus": "Santorini eli Théra on osa Kykladien saariryhmää Egeanmerellä. Se sijaitsee noin 200 kilometriä Kreikan mantereelta kaakkoon ja 118 kilometriä Kreetan saaresta pohjoiseen.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Santorini",
            "title": "Santorini – Wikipedia"
          }
        ],
        "havaintoId": "iss017e005037"
      }
    ]
  },
  "amazonin-suu": {
    "kysymykset": [
      "Kuinka paljon vettä Amazon tuo mereen?",
      "Miksi Amazonin suisto muuttaa muotoaan?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka paljon vettä Amazon tuo mereen?",
        "vastaus": "Amazon on maailman vesirikkain joki. Se purkaa mereen noin viidenneksen kaikesta maailman makeasta jokivedestä — enemmän kuin seuraavat seitsemän suurinta jokea yhteensä.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Amazon_River",
            "title": "Amazon River – Wikipedia"
          }
        ],
        "havaintoId": "iss010e13029"
      },
      {
        "kysymys": "Miksi Amazonin suisto muuttaa muotoaan?",
        "vastaus": "Joki kuljettaa valtavia määriä hiekkaa ja liejua, jotka joko syövät rantaa tai kasaantuvat uusiksi saariksi virtausten mukaan. NASA vertasi vuosien 2000 ja 2005 kuvia ja havaitsi kanavan siirtyneen satoja metrejä.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss010e13029",
            "title": "Perigoso Channel and Amazon River Mouth – NASA"
          }
        ],
        "havaintoId": "iss010e13029"
      }
    ]
  },
  "fundynlahti": {
    "kysymykset": [
      "Kuinka korkealle Fundynlahden vuorovesi nousee?",
      "Missä maissa Fundynlahti sijaitsee?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka korkealle Fundynlahden vuorovesi nousee?",
        "vastaus": "Fundynlahdella on maailman suurin vuorovesivaihtelu: vesi voi nousta ja laskea yli 16 metriä kahdesti vuorokaudessa. Vaihtelu paljastaa laajoja punaisia mutatasankoja lahden pohjukoissa.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Bay_of_Fundy",
            "title": "Bay of Fundy – Wikipedia"
          }
        ],
        "havaintoId": "iss059e059149"
      },
      {
        "kysymys": "Missä maissa Fundynlahti sijaitsee?",
        "vastaus": "Lahti erottaa Kanadan Nova Scotian ja New Brunswickin provinssit. Sen valtavat vuorovedet syntyvät lahden muodon ja Atlantin luonnollisen värähtelyn resonanssista.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Bay_of_Fundy",
            "title": "Bay of Fundy – Wikipedia"
          }
        ],
        "havaintoId": "iss059e059149"
      }
    ]
  },
  "falklandinsaaret": {
    "kysymykset": [
      "Montako ihmistä Falklandinsaarilla asuu?",
      "Miksi Falklandinsaarista käytiin sota vuonna 1982?"
    ],
    "vastaukset": [
      {
        "kysymys": "Montako ihmistä Falklandinsaarilla asuu?",
        "vastaus": "Falklandinsaarilla asuu vain noin 3 700 ihmistä, joista suurin osa pääkaupunki Port Stanleyssa. Lampaita saarilla on moninkertainen määrä asukkaisiin verrattuna, ja villa on tärkeä vientituote.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Falkland_Islands",
            "title": "Falkland Islands – Wikipedia"
          }
        ],
        "havaintoId": "iss071e582470"
      },
      {
        "kysymys": "Miksi Falklandinsaarista käytiin sota vuonna 1982?",
        "vastaus": "Argentiina hyökkäsi saarille huhtikuussa 1982 vaatien niitä omikseen nimellä Malvinas, ja Britannia lähetti laivaston takaisinvaltaukseen. Sota kesti 74 päivää ja päättyi Britannian voittoon.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Falklands_War",
            "title": "Falklands War – Wikipedia"
          }
        ],
        "havaintoId": "iss066e091560"
      }
    ]
  },
  "etela-georgia": {
    "kysymykset": [
      "Kuka käveli Etelä-Georgian yli vuonna 1916?",
      "Mitä eläimiä Etelä-Georgialla pesii miljoonittain?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuka käveli Etelä-Georgian yli vuonna 1916?",
        "vastaus": "Ernest Shackleton ja kaksi toveriaan ylittivät saaren jäätiköt ja vuoret 36 tunnissa hakeakseen apua haaksirikkoutuneelle Endurance-retkikunnalleen. Vaellus on yhä yksi tunnetuimmista selviytymistarinoista napa-alueiden historiassa.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Ernest_Shackleton",
            "title": "Ernest Shackleton – Wikipedia"
          }
        ],
        "havaintoId": "iss011e12148"
      },
      {
        "kysymys": "Mitä eläimiä Etelä-Georgialla pesii miljoonittain?",
        "vastaus": "Etelä-Georgialla pesii miljoonia kuningaspingviinejä ja merileijonia, ja saari on yksi maailman tärkeimmistä alueista näille lajeille. Valaanpyytäjien 1800-luvulla tuomat rotat hävitettiin saarelta myrkytysohjelmalla 2010-luvulla.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/South_Georgia",
            "title": "South Georgia – Wikipedia"
          }
        ],
        "havaintoId": "iss011e12148"
      }
    ]
  },
  "dasht-e-lut": {
    "kysymykset": [
      "Mikä on Dasht-e Lutin lämpötilaennätys?",
      "Mitä kaluutit ovat Dasht-e Lutin maastossa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä on Dasht-e Lutin lämpötilaennätys?",
        "vastaus": "NASA:n satelliitit ovat mitanneet Dasht-e Lutin pintalämpötilaksi yli 70 celsiusastetta, yhden korkeimmista koskaan satelliitilla mitatuista maanpinnan lämpötiloista. Alue on niin kuiva, ettei siellä juuri kasva mitään.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Lut_Desert",
            "title": "Lut Desert – Wikipedia"
          }
        ],
        "havaintoId": "iss012e18779"
      },
      {
        "kysymys": "Mitä kaluutit ovat Dasht-e Lutin maastossa?",
        "vastaus": "Kaluutit ovat tuulen vuosituhansien aikana muovaamia, kymmeniä metrejä korkeita harjanteita, jotka rivistössä muistuttavat linnoituksen muureja. Ne syntyvät, kun voimakas vallitseva tuuli kuluttaa pehmeää savikkoa vuodesta toiseen samaan suuntaan.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Lut_Desert",
            "title": "Lut Desert – Wikipedia"
          }
        ],
        "havaintoId": "iss012e18779"
      }
    ]
  },
  "damavand": {
    "kysymykset": [
      "Kuinka korkea Damavand-tulivuori on?",
      "Mistä asti Damavand voi näkyä selkeällä säällä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka korkea Damavand-tulivuori on?",
        "vastaus": "Damavand kohoaa 5 610 metrin korkeuteen ja on sekä Iranin että koko Lähi-idän korkein huippu. Se on yhä toimiva tulivuori, jonka huipulta purkautuu rikkikaasua.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Damavand",
            "title": "Damavand – Wikipedia"
          }
        ],
        "havaintoId": "iss010e13393"
      },
      {
        "kysymys": "Mistä asti Damavand voi näkyä selkeällä säällä?",
        "vastaus": "Damavand näkyy selkeällä säällä jopa Teheranista asti, yli 60 kilometrin päähän, ja vuori on keskeinen hahmo Persian mytologiassa. Se on suosittu kiipeilykohde, jonne nousee vuosittain kymmeniätuhansia retkeilijöitä.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Damavand",
            "title": "Damavand – Wikipedia"
          }
        ],
        "havaintoId": "iss010e13393"
      }
    ]
  },
  "sarezjarvi": {
    "kysymykset": [
      "Miten Sarezjärvi syntyi vuonna 1911?",
      "Miksi Usoin pato huolestuttaa tutkijoita yhä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miten Sarezjärvi syntyi vuonna 1911?",
        "vastaus": "Voimakas maanjäristys irrotti valtavan kalliovyöryn, joka tukki joenlaakson ja loi Usoin padon. Padon taakse kertynyt vesi muodosti yli 60 kilometriä pitkän Sarezjärven.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Sarez_Lake",
            "title": "Sarez Lake – Wikipedia"
          }
        ],
        "havaintoId": "iss074e0814815"
      },
      {
        "kysymys": "Miksi Usoin pato huolestuttaa tutkijoita yhä?",
        "vastaus": "Usoin pato on maailman korkeimpia, yli 550 metriä, mutta se on löyhää kivi- ja maa-ainesta eikä insinöörien rakentama. Uusi voimakas maanjäristys voisi murtaa padon ja uhata satojatuhansia ihmisiä alapuolisissa laaksoissa.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Sarez_Lake",
            "title": "Sarez Lake – Wikipedia"
          }
        ],
        "havaintoId": "iss074e0814815"
      }
    ]
  },
  "toktogul": {
    "kysymykset": [
      "Milloin Toktogulin pato valmistui?",
      "Miksi Toktogulin veden juoksutus kiistelyttää naapurimaita?"
    ],
    "vastaukset": [
      {
        "kysymys": "Milloin Toktogulin pato valmistui?",
        "vastaus": "Toktogulin pato ja tekojärvi valmistuivat vuonna 1974 osana Neuvostoliiton Syrdarja-joen vesivoimahankkeita. Järvi on Kirgisian suurin ja tärkein sähköntuotannon lähde.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Toktogul_Reservoir",
            "title": "Toktogul Reservoir – Wikipedia"
          }
        ],
        "havaintoId": "iss074e0825692"
      },
      {
        "kysymys": "Miksi Toktogulin veden juoksutus kiistelyttää naapurimaita?",
        "vastaus": "Kirgisia haluaa juoksuttaa vettä talvella sähköntarpeen vuoksi, kun taas alapuoliset Uzbekistan ja Kazakstan tarvitsisivat saman veden keväällä kastelukauden alkuun. Kiista padon käytöstä on jatkunut Neuvostoliiton hajoamisesta lähtien.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Toktogul_Reservoir",
            "title": "Toktogul Reservoir – Wikipedia"
          }
        ],
        "havaintoId": "iss074e0825692"
      }
    ]
  },
  "kljutsevskaja": {
    "kysymykset": [
      "Kuinka usein Kljutševskaja purkautuu?",
      "Miksi Kamtšatkalla on niin paljon tulivuoria?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka usein Kljutševskaja purkautuu?",
        "vastaus": "Kljutševskaja on yksi maailman aktiivisimmista tulivuorista ja purkautuu keskimäärin muutaman vuoden välein. Se on Euraasian korkein toimiva tulivuori, lähes 4 800 metriä korkea.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Klyuchevskaya_Sopka",
            "title": "Klyuchevskaya Sopka – Wikipedia"
          }
        ],
        "havaintoId": "iss038e005515"
      },
      {
        "kysymys": "Miksi Kamtšatkalla on niin paljon tulivuoria?",
        "vastaus": "Kamtšatkan niemimaa on osa Tyynenmeren tulirengasta, jossa Tyynenmeren laatta painuu naapurilaatan alle ja sulaa magmaksi. Niemimaalla on yli 160 tulivuorta, joista noin 30 on yhä toiminnassa.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Kamchatka_Peninsula",
            "title": "Kamchatka Peninsula – Wikipedia"
          }
        ],
        "havaintoId": "iss038e005515"
      }
    ]
  },
  "reunion": {
    "kysymykset": [
      "Kuinka usein Piton de la Fournaise purkautuu?",
      "Mikä hallinnollinen asema Réunionilla on Ranskassa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka usein Piton de la Fournaise purkautuu?",
        "vastaus": "Piton de la Fournaise on yksi maailman aktiivisimmista tulivuorista ja purkautuu keskimäärin kerran vuodessa, joskus useamminkin. Purkaukset ovat harvoin vaarallisia, sillä laava valuu yleensä asumattomaan kalderaan.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Piton_de_la_Fournaise",
            "title": "Piton de la Fournaise – Wikipedia"
          }
        ],
        "havaintoId": "iss055e020372"
      },
      {
        "kysymys": "Mikä hallinnollinen asema Réunionilla on Ranskassa?",
        "vastaus": "Réunion on Ranskan merentakainen departementti ja alue, eli osa Ranskaa ja Euroopan unionia siinä missä Pariisikin. Saaren virallinen valuutta on euro ja kieli ranska.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/R%C3%A9union",
            "title": "Réunion – Wikipedia"
          }
        ],
        "havaintoId": "iss055e020372"
      }
    ]
  },
  "villarrica": {
    "kysymykset": [
      "Kuinka monta pysyvää laavajärveä maailmassa on?",
      "Mikä uhka liittyy erityisesti Villarrican purkauksiin?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka monta pysyvää laavajärveä maailmassa on?",
        "vastaus": "Villarrican kraatterissa on yksi vain noin viidestä maailman tulivuoresta, joissa on jatkuvasti näkyvä, kiehuva laavajärvi. Muita ovat muun muassa Nyiragongo Kongossa ja Erta Ale Etiopiassa.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Villarrica_(volcano)",
            "title": "Villarrica (volcano) – Wikipedia"
          }
        ],
        "havaintoId": "iss068e040596"
      },
      {
        "kysymys": "Mikä uhka liittyy erityisesti Villarrican purkauksiin?",
        "vastaus": "Villarrican huippu on jäätikön peitossa. Purkaus voi siksi sulattaa jäätä nopeasti ja synnyttää laharin — tuhoisan muta- ja kivivirran, joka voi edetä kymmeniä kilometrejä asutuille laaksoille.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Villarrica_(volcano)",
            "title": "Villarrica (volcano) – Wikipedia"
          }
        ],
        "havaintoId": "iss068e040596"
      }
    ]
  },
  "laguna-verde": {
    "kysymykset": [
      "Kuinka korkea Ojos del Salado -tulivuori on?",
      "Mistä Laguna Verden turkoosi väri johtuu?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka korkea Ojos del Salado -tulivuori on?",
        "vastaus": "Ojos del Salado kohoaa 6 893 metriin ja on maailman korkein aktiivinen tulivuori sekä Etelä-Amerikan toiseksi korkein huippu. Sen huipulla on myös maailman korkein pysyvä kraatterijärvi.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Ojos_del_Salado",
            "title": "Ojos del Salado – Wikipedia"
          }
        ],
        "havaintoId": "iss074e0760459"
      },
      {
        "kysymys": "Mistä Laguna Verden turkoosi väri johtuu?",
        "vastaus": "Järven väri syntyy veteen liuenneista mineraaleista, erityisesti kuparista, joita tulivuorinen ympäristö on huuhtonut järveen. Vastaavia värikkäitä korkean Andien järviä on useita samalla alueella.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Ojos_del_Salado",
            "title": "Ojos del Salado – Wikipedia"
          }
        ],
        "havaintoId": "iss074e0760459"
      }
    ]
  },
  "laguna-colorada": {
    "kysymykset": [
      "Mikä värjää Laguna Coloradan veden punaiseksi?",
      "Mikä flamingolaji on harvinainen Laguna Coloradalla?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä värjää Laguna Coloradan veden punaiseksi?",
        "vastaus": "Veden punainen väri syntyy pigmentistä, jota levät ja mikrobit tuottavat suojautuakseen voimakkaalta auringolta ja UV-säteilyltä yli 4 200 metrin korkeudessa. Sama ilmiö värjää monia muitakin Andien suolajärviä.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Laguna_Colorada",
            "title": "Laguna Colorada – Wikipedia"
          }
        ],
        "havaintoId": "iss066e110899"
      },
      {
        "kysymys": "Mikä flamingolaji on harvinainen Laguna Coloradalla?",
        "vastaus": "Jamesinflamingo on harvinaisin kolmesta Etelä-Amerikan flamingolajista, ja Laguna Colorada on sen tärkeimpiä pesimäalueita. Laji luultiin sukupuuttoon kuolleeksi 1900-luvun alussa, kunnes se löydettiin uudelleen 1950-luvulla.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/James%27s_flamingo",
            "title": "James's flamingo – Wikipedia"
          }
        ],
        "havaintoId": "iss066e110899"
      }
    ]
  },
  "san-rafael": {
    "kysymykset": [
      "Mistä jäätikköalueesta San Rafael laskee?",
      "Miten San Rafaelin jäätikkö on viime aikoina muuttunut?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mistä jäätikköalueesta San Rafael laskee?",
        "vastaus": "San Rafael laskee Pohjois-Patagonian jäätiköltä, yhdeltä maailman suurimmista mannerjäätikön ulkopuolisista jäämassoista. Jäätikkö ulottuu poikkeuksellisen alas, lähes sademetsävyöhykkeeseen asti.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Northern_Patagonian_Ice_Field",
            "title": "Northern Patagonian Ice Field – Wikipedia"
          }
        ],
        "havaintoId": "iss063e081907"
      },
      {
        "kysymys": "Miten San Rafaelin jäätikkö on viime aikoina muuttunut?",
        "vastaus": "San Rafael on vetäytynyt useita kilometrejä 1900-luvun puolivälin jälkeen ilmaston lämpenemisen seurauksena, kuten suurin osa Patagonian jäätiköistä. Sulava jää ruokkii laguunia, johon jäätikkö kalvaa jäävuoria.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Northern_Patagonian_Ice_Field",
            "title": "Northern Patagonian Ice Field – Wikipedia"
          }
        ],
        "havaintoId": "iss063e081907"
      }
    ]
  },
  "simienit": {
    "kysymykset": [
      "Mikä eläinlaji elää vain Simienin vuorilla?",
      "Miksi Simienin vuoria kutsutaan Afrikan Grand Canyoniksi?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä eläinlaji elää vain Simienin vuorilla?",
        "vastaus": "Geladapaviaani, ainoa nykyään elävä ruohonsyöjäpaviaanilaji, elää luonnossa vain Etiopian ylängöillä, erityisesti Simienin vuoristossa. Se laiduntaa ruohoa laumoissa, joissa voi olla satoja yksilöitä.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Gelada",
            "title": "Gelada – Wikipedia"
          }
        ],
        "havaintoId": "iss016e010784"
      },
      {
        "kysymys": "Miksi Simienin vuoria kutsutaan Afrikan Grand Canyoniksi?",
        "vastaus": "Vuosimiljoonien eroosio on kaivertanut ylängön reunoihin jyrkkiä, satojen metrien syvyisiä rotkoja ja teräviä huippuja, jotka muistuttavat Yhdysvaltain Grand Canyonia. Alue julistettiin UNESCOn maailmanperintökohteeksi 1978.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Simien_Mountains",
            "title": "Simien Mountains – Wikipedia"
          }
        ],
        "havaintoId": "iss016e010784"
      }
    ]
  },
  "everglades": {
    "kysymykset": [
      "Miksi Evergladesia kutsutaan ruohon joeksi?",
      "Mitkä kaksi krokotiililajia elävät Evergladesissa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Evergladesia kutsutaan ruohon joeksi?",
        "vastaus": "Vesi virtaa Evergladesin läpi hyvin hitaasti, vain muutaman sadan metrin päivässä, leveänä ja matalana virtana saraikon seassa. Siksi aluetta kutsutaan osuvasti ruohon joeksi tavallisen kosteikon sijaan.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Everglades",
            "title": "Everglades – Wikipedia"
          }
        ],
        "havaintoId": "iss015e08920"
      },
      {
        "kysymys": "Mitkä kaksi krokotiililajia elävät Evergladesissa?",
        "vastaus": "Everglades on maailman ainoa paikka, jossa amerikanalligaattori ja uhanalainen amerikankrokotiili elävät samalla alueella luonnossa. Kansallispuisto perustettiin 1947 suojelemaan aluetta laajenevalta maankäytöltä.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Everglades_National_Park",
            "title": "Everglades National Park – Wikipedia"
          }
        ],
        "havaintoId": "iss015e08920"
      }
    ]
  },
  "ennedi": {
    "kysymykset": [
      "Kuinka Gweni-Fadan kraatteri syntyi?",
      "Mitä Ennedin ylängön kallioseinillä on nähtävissä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuinka Gweni-Fadan kraatteri syntyi?",
        "vastaus": "Gweni-Fada on eroosion paljastama rakenne Ennedin hiekkakivessä, halkaisijaltaan yli kolme kilometriä; NASA kuvailee sen meteoriitin törmäyksestä syntyneeksi. Tarkkaa ikää ei tunneta.",
        "lahteet": [
          {
            "url": "https://images.nasa.gov/details/iss074e0320315",
            "title": "Crater Gweni-Fada on Chad's Ennedi Plateau – NASA"
          }
        ],
        "havaintoId": "iss074e0320315"
      },
      {
        "kysymys": "Mitä Ennedin ylängön kallioseinillä on nähtävissä?",
        "vastaus": "Ennedin luolissa ja kallioseinillä on tuhansia vuosia vanhoja maalauksia ja kaiverruksia ihmisistä, karjasta ja villieläimistä ajalta, jolloin Sahara oli vihreä ja märkä. UNESCO merkitsi alueen maailmanperintökohteeksi 2016.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Ennedi_Plateau",
            "title": "Ennedi Plateau – Wikipedia"
          }
        ],
        "havaintoId": "iss072e404551"
      }
    ]
  },
  "nevado-del-ruiz": {
    "kysymykset": [
      "Montako ihmistä Nevado del Ruizin purkaus tappoi 1985?",
      "Miksi 1985 purkaus oli tilavuudeltaan pieni mutta tappava?"
    ],
    "vastaukset": [
      {
        "kysymys": "Montako ihmistä Nevado del Ruizin purkaus tappoi 1985?",
        "vastaus": "Marraskuun 1985 purkaus suli osan huipun jäätiköstä, ja syntynyt lahar hautasi Armeron kaupungin. Onnettomuudessa kuoli yli 23 000 ihmistä, mikä teki siitä 1900-luvun toiseksi tuhoisimman tulivuoripurkauksen.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/1985_Armero_tragedy",
            "title": "1985 Armero tragedy – Wikipedia"
          }
        ],
        "havaintoId": "iss023e027737"
      },
      {
        "kysymys": "Miksi 1985 purkaus oli tilavuudeltaan pieni mutta tappava?",
        "vastaus": "Purkaus tuotti vain vähän tuhkaa ja laavaa verrattuna suurimpiin historiallisiin purkauksiin. Koska huippu on kuitenkin jäätikön peitossa, jo pieni purkaus riitti sulattamaan jäätä ja synnyttämään tuhoisan mutavirran.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Nevado_del_Ruiz",
            "title": "Nevado del Ruiz – Wikipedia"
          }
        ],
        "havaintoId": "iss023e027737"
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
