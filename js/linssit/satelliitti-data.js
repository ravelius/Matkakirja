/*
 * SATELLIITTILINSSIN KUVAT — KONEELLISESTI TUOTETTU TIEDOSTO.
 *
 * Älä muokkaa käsin: aja tools/hae-satelliittihavainnot.mjs, joka
 * lukee NASAn kuvakirjaston rajapinnasta astronauttien ottamien
 * Maa-kuvien osoitteet ja kuvaustiedot ja tarkistaa jokaisen
 * osoitteen. Kohteet ja suomenkieliset kuvatekstit ovat työkalun
 * KOHTEET-luettelossa, ja ne on valittu kuvat katsomalla.
 *
 * NASAn kuvat ovat public domainia; kuvat EIVÄT ole repossa vaan
 * ladataan NASAn omasta ämpäristä.
 *
 * Haettu: 2026-09-27. Kohteita 189, kuvia 229.
 */

export const SATELLIITTI_LAHDE = {
  "aineisto": "Astronauttien Maa-kuvat",
  "tekija": "NASA",
  "lisenssi": "Public domain",
  "osoite": "https://images.nasa.gov/",
  "katalogi": "https://images-api.nasa.gov/search?media_type=image",
  "haettu": "2026-09-27"
};

export const SATELLIITTI_KOHTEET = [
  {
    "tunnus": "etna",
    "nimi": "Etna",
    "seutu": "Sisilia, Italia",
    "selite": "Euroopan korkein toimiva tulivuori, joka purkautuu useammin kuin mikään muu.",
    "lat": 37.751,
    "lon": 14.994,
    "oletus": "iss005e19024",
    "havainnot": [
      {
        "id": "iss005e19024",
        "aika": "2002-10-30",
        "teksti": "Etnan purkaus lokakuussa 2002. Tumma tuhkapilvi kulkee kaakkoon Sisilian ylle, ja sen vasemmalla puolella nousee vaaleampaa savua maastopaloista, jotka rinteitä alas valunut laava sytytti. Miehistö sai purkauksen kuvaan sen alkuvaiheessa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 5",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://media.matkakirja.app/linssit/astronautin-kamera/iss005e19024~large.jpg",
        "pikku": "https://media.matkakirja.app/linssit/astronautin-kamera/iss005e19024~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss005e19024"
      },
      {
        "id": "iss013e62714",
        "aika": "2006-08-02",
        "teksti": "Sama vuori neljä vuotta myöhemmin rauhallisempana: huippukraattereista nousee höyryä ja hiukan tuhkaa. Mustat laavavirrat erottuvat vihreästä rinteestä kuin maalitahrat — jokainen niistä on oma purkauksensa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 13",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://media.matkakirja.app/linssit/astronautin-kamera/iss013e62714~large.jpg",
        "pikku": "https://media.matkakirja.app/linssit/astronautin-kamera/iss013e62714~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss013e62714"
      }
    ]
  },
  {
    "tunnus": "italia-yolla",
    "nimi": "Italian saapas yöllä",
    "seutu": "Italia",
    "selite": "Koko niemimaa kerralla: kaupunkien valot piirtävät rannikon tarkemmin kuin kartta.",
    "lat": 41.3,
    "lon": 14.6,
    "oletus": "iss037e018864",
    "havainnot": [
      {
        "id": "iss037e018864",
        "aika": "2013-10-23",
        "teksti": "Italia ja Sisilia yön valoissa. Rooman ja Napolin kirkkaat läiskät ovat keskellä kuvaa, Adrianmeri jää oikealle mustaksi. Rannikon ääriviiva syntyy pelkistä katuvaloista: siellä missä ihmiset asuvat, maa hohtaa, ja vuoristo jää pimeäksi.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 37",
        "kuvaaja": "Michael Hopkins",
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss037e018864/iss037e018864~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss037e018864/iss037e018864~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss037e018864"
      }
    ]
  },
  {
    "tunnus": "istanbul",
    "nimi": "Istanbul",
    "seutu": "Turkki",
    "selite": "Kaupunki kahdella mantereella, ja niiden välissä musta salmi.",
    "lat": 41.02,
    "lon": 28.98,
    "oletus": "iss065e030820",
    "havainnot": [
      {
        "id": "iss032e017547",
        "aika": "2012-08-09",
        "teksti": "Laajempi näkymä yhdeksän vuotta aiemmin. Kaupungin reuna erottuu yöllä terävämmin kuin päivällä — siitä kohdasta valot yksinkertaisesti loppuvat.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 32",
        "kuvaaja": null,
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss032e017547/iss032e017547~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss032e017547/iss032e017547~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss032e017547"
      },
      {
        "id": "iss065e030820",
        "aika": "2021-05-10",
        "teksti": "Bosporinsalmi halkoo kultaisen kaupungin kahtia: vasemmalla Eurooppa, oikealla Aasia. Salmi ja Kultainen sarvi jäävät valojen keskellä täysin mustiksi, ja niiden yli kulkevat siltojen ohuet valojuovat. Kuvan otti Thomas Pesquet.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 65",
        "kuvaaja": "Thomas Pesquet",
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss065e030820/iss065e030820~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss065e030820/iss065e030820~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss065e030820"
      }
    ]
  },
  {
    "tunnus": "sarytsev",
    "nimi": "Sarytševin tulivuori",
    "seutu": "Kuriilit, Venäjä",
    "selite": "Purkaus, joka osui kohdalle juuri oikealla hetkellä.",
    "lat": 48.09,
    "lon": 153.2,
    "oletus": "iss020e009048",
    "havainnot": [
      {
        "id": "iss020e009048",
        "aika": "2009-06-12",
        "teksti": "Purkaus kesken nousunsa: ruskea tuhkapatsas työntyy ylös ja sen huipulla lepää sileä valkoinen pilvenhattu, joka tiivistyy kun ilma nousee pilven mukana. Pilvikatto on auennut tulivuoren ympäriltä renkaaksi. Avaruusaseman rata sattui kulkemaan kohdalta juuri tällä hetkellä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 20",
        "kuvaaja": "Mike Barratt",
        "mitat": [
          1920,
          1311
        ],
        "kuva": "https://media.matkakirja.app/linssit/astronautin-kamera/iss020e009048~large.jpg",
        "pikku": "https://media.matkakirja.app/linssit/astronautin-kamera/iss020e009048~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss020e009048"
      }
    ]
  },
  {
    "tunnus": "siveluts",
    "nimi": "Šiveluts",
    "seutu": "Kamtšatka, Venäjä",
    "selite": "Kamtšatkan vilkkaimpia tulivuoria, lumen ja tuhkan kaksivärinen rinne.",
    "lat": 56.65,
    "lon": 161.36,
    "oletus": "iss014e17165",
    "havainnot": [
      {
        "id": "iss014e17165",
        "aika": "2007-03-21",
        "teksti": "Höyry- ja tuhkapilvi ajautuu länteen lumisen huipun yli. Vasemmalla rinne on tuhkan peittämä ja ruskea, oikealla puhtaan valkoinen — tuuli on lajitellut vuoren kahteen väriin. Purkausjakso oli alkanut muutamaa päivää aiemmin.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 14",
        "kuvaaja": null,
        "mitat": [
          1920,
          1286
        ],
        "kuva": "https://media.matkakirja.app/linssit/astronautin-kamera/iss014e17165~large.jpg",
        "pikku": "https://media.matkakirja.app/linssit/astronautin-kamera/iss014e17165~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss014e17165"
      }
    ]
  },
  {
    "tunnus": "popocatepetl",
    "nimi": "Popocatépetl",
    "seutu": "Meksiko",
    "selite": "Toimiva tulivuori aivan Mexico Cityn kyljessä.",
    "lat": 19.023,
    "lon": -98.622,
    "oletus": "iss064e026423",
    "havainnot": [
      {
        "id": "iss064e026423",
        "aika": "2021-01-25",
        "teksti": "Yli 5 400 metriä korkean tulivuoren huipulta karkaa ohut höyrypilvi länteen. Rinteen juurella näkyy peltojen ja teiden verkko: viisitoista miljoonaa ihmistä asuu alle sadan kilometrin päässä kraatterista.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 64",
        "kuvaaja": "RSN",
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss064e026423/iss064e026423~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss064e026423/iss064e026423~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss064e026423"
      }
    ]
  },
  {
    "tunnus": "fuji",
    "nimi": "Fuji",
    "seutu": "Japani",
    "selite": "Japanin korkein vuori, lähes täydellinen kartio.",
    "lat": 35.361,
    "lon": 138.727,
    "oletus": "iss074e0459342",
    "havainnot": [
      {
        "id": "iss074e0044445",
        "aika": "2026-01-03",
        "teksti": "Sama vuori yöllä. Lumihuippu häämöttää harmaana keskellä kaupunkien valoverkkoa: Fuji-järvien seudulla ja sen ympäristössä asuu yli viisi miljoonaa ihmistä. Kuva on otettu paikallista aikaa noin puoli viideltä aamulla.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 74",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss074e0044445/iss074e0044445~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss074e0044445/iss074e0044445~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss074e0044445"
      },
      {
        "id": "iss074e0459342",
        "aika": "2026-04-10",
        "teksti": "Fuji melkein suoraan ylhäältä. Keskellä näkyy kraatteri mustana kuoppana, ja lumi valuu siitä säteittäin alas kuin kaadettu maito. Vuori on yhä toimiva tulivuori, vaikka viime purkauksesta on vuosi 1707.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 74",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss074e0459342/iss074e0459342~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss074e0459342/iss074e0459342~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss074e0459342"
      }
    ]
  },
  {
    "tunnus": "tokio",
    "nimi": "Tokio",
    "seutu": "Japani",
    "selite": "Maailman väkirikkain kaupunkiseutu yöllä.",
    "lat": 35.68,
    "lon": 139.77,
    "oletus": "iss073e0918643",
    "havainnot": [
      {
        "id": "iss073e0918643",
        "aika": "2025-10-18",
        "teksti": "Tokionlahden ympärillä asuu yli 39 miljoonaa ihmistä. Valojen seasta erottuvat pääratojen linjat, joiden asemat hohtavat ketjuna kirkkaampia pisteitä. Kuva on otettu paikallista aikaa noin neljältä aamulla.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0918643/iss073e0918643~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0918643/iss073e0918643~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0918643"
      }
    ]
  },
  {
    "tunnus": "korea",
    "nimi": "Korean niemimaa yöllä",
    "seutu": "Korea",
    "selite": "Yökuva, jossa valtioiden raja näkyy pelkkänä pimeytenä.",
    "lat": 38.3,
    "lon": 127.2,
    "oletus": "iss038e038300",
    "havainnot": [
      {
        "id": "iss038e038300",
        "aika": "2014-01-30",
        "teksti": "Etelä-Korea loistaa alhaalla oikealla, ja sen keskellä on Soulin suuri valoläiskä. Pohjoisessa on lähes täysin pimeää: ainoa kirkas piste on Pjongjang. Yökuva mittaa sähkönkäyttöä, ja siksi raja erottuu tässä selvemmin kuin päiväkuvassa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 38",
        "kuvaaja": null,
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss038e038300/iss038e038300~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss038e038300/iss038e038300~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss038e038300"
      }
    ]
  },
  {
    "tunnus": "dubai",
    "nimi": "Dubai",
    "seutu": "Arabiemiirikunnat",
    "selite": "Mereen rakennetut keinosaaret, jotka tunnistaa avaruudesta muodosta.",
    "lat": 25.13,
    "lon": 55.13,
    "oletus": "iss073e0247372",
    "havainnot": [
      {
        "id": "iss072e447465",
        "aika": "2025-01-02",
        "teksti": "Sama rannikko yöllä paikallista aikaa noin kymmeneltä illalla. Palm Jumeirahin lehdet piirtyvät valoista, ja aavikolle vievät tiet erottuvat oransseina viivoina kaupungin valkoista hehkua vasten.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 72",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss072e447465/iss072e447465~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss072e447465/iss072e447465~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss072e447465"
      },
      {
        "id": "iss073e0247372",
        "aika": "2025-06-10",
        "teksti": "Persianlahden rannalle kasattu hiekka on muotoiltu palmuiksi ja saariryhmäksi: vasemmalla Palm Jebel Ali, keskellä Palm Jumeirah ja oikealla The World -saaret. Kaikki näkyvä ranta on ihmisen tekemää.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0247372/iss073e0247372~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0247372/iss073e0247372~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0247372"
      }
    ]
  },
  {
    "tunnus": "niilin-suisto",
    "nimi": "Niilin suisto",
    "seutu": "Egypti",
    "selite": "Joki ja sen suisto piirtyvät yöllä valoista, aavikko jää mustaksi.",
    "lat": 30.6,
    "lon": 31.2,
    "oletus": "iss037e004654",
    "havainnot": [
      {
        "id": "iss025e009858",
        "aika": "2010-10-28",
        "teksti": "Sama seutu avaruusaseman ikkunasta. Niili nousee alhaalta ylös kuin valoköysi, ja sen päässä suisto levittäytyy Välimerelle; kaukana horisontissa hohtaa ilmakehän oma vihertävä valo.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 25",
        "kuvaaja": null,
        "mitat": [
          1920,
          1314
        ],
        "kuva": "https://media.matkakirja.app/linssit/astronautin-kamera/iss025e009858~large.jpg",
        "pikku": "https://media.matkakirja.app/linssit/astronautin-kamera/iss025e009858~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss025e009858"
      },
      {
        "id": "iss037e004654",
        "aika": "2013-10-01",
        "teksti": "Kairo on kirkas ryöppy keskellä kuvaa, ja siitä pohjoiseen avautuu Niilin suiston valoviuhka. Joen varsi on asuttu kapeana nauhana, ja sen molemmin puolin alkaa heti aavikon pimeys. Kuvan otti Karen Nyberg.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 37",
        "kuvaaja": "Karen Nyberg",
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss037e004654/iss037e004654~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss037e004654/iss037e004654~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss037e004654"
      }
    ]
  },
  {
    "tunnus": "richat",
    "nimi": "Saharan silmä",
    "seutu": "Mauritania",
    "selite": "Neljäkymmentä kilometriä leveä rengasrakenne keskellä aavikkoa.",
    "lat": 21.124,
    "lon": -11.401,
    "oletus": "iss069e005471",
    "havainnot": [
      {
        "id": "iss002e5693",
        "aika": "2001-04-19",
        "teksti": "Sama kohde 22 vuotta aiemmin, kun hiekkapöly värjää ilman punertavaksi. Astronautit ovat käyttäneet silmää maamerkkinä alusta asti: aavikolla ei ole juuri muuta, mistä paikan tunnistaisi.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 2",
        "kuvaaja": null,
        "mitat": [
          1920,
          1312
        ],
        "kuva": "https://media.matkakirja.app/linssit/astronautin-kamera/iss002e5693~large.jpg",
        "pikku": "https://media.matkakirja.app/linssit/astronautin-kamera/iss002e5693~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss002e5693"
      },
      {
        "id": "iss069e005471",
        "aika": "2023-04-26",
        "teksti": "Richat-rakenne eli Saharan silmä. Kyseessä ei ole törmäyskraatteri vaan kohonnut kalliokupoli, jonka kerrokset tuuli ja vesi ovat kuluttaneet paljaiksi renkaiksi. Kovat kerrokset jäivät harjanteiksi, pehmeät kuluivat kouruiksi.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 69",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss069e005471/iss069e005471~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss069e005471/iss069e005471~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss069e005471"
      }
    ]
  },
  {
    "tunnus": "namib",
    "nimi": "Namibin dyynit",
    "seutu": "Namibia",
    "selite": "Maailman korkeimpia hiekkadyynejä, ja niiden terävä reuna kalliomaata vasten.",
    "lat": -25,
    "lon": 16,
    "oletus": "iss073e0511487",
    "havainnot": [
      {
        "id": "iss071e230722",
        "aika": "2024-06-27",
        "teksti": "Dyynikenttä ylhäältä Atlantin rannikolla. Hiekka vaihtaa väriä vaaleasta ruosteenpunaiseen sitä mukaa kuin rautapitoiset jyvät hapettuvat: mitä vanhempi hiekka, sitä punaisempi dyyni.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 71",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss071e230722/iss071e230722~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss071e230722/iss071e230722~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss071e230722"
      },
      {
        "id": "iss073e0511487",
        "aika": "2025-08-20",
        "teksti": "Oikealla punainen dyynikenttä, vasemmalla paljas kalliomaa — ja niiden välissä lähes viivasuora raja. Meren puolelta puhaltava tuuli kasaa hiekan aina samaan kohtaan, eikä se pääse kallioiden yli.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1078
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0511487/iss073e0511487~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0511487/iss073e0511487~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0511487"
      }
    ]
  },
  {
    "tunnus": "betsiboka",
    "nimi": "Betsiboka",
    "seutu": "Madagaskar",
    "selite": "Joki, joka kuljettaa punaisen maan mereen.",
    "lat": -16,
    "lon": 46.55,
    "oletus": "iss071e218069",
    "havainnot": [
      {
        "id": "iss018e025705",
        "aika": "2009-01-30",
        "teksti": "Sama joki tulvillaan vuonna 2009, kun trooppinen myrsky Eric oli kastellut sen valuma-alueen. Punaisen veden rinnalla näkyy vielä tummanvihreää metsää — juuri sen katoaminen tekee joesta näin punaisen.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 18",
        "kuvaaja": null,
        "mitat": [
          1920,
          1275
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss018e025705/iss018e025705~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss018e025705/iss018e025705~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss018e025705"
      },
      {
        "id": "iss071e218069",
        "aika": "2024-06-26",
        "teksti": "Betsiboka-joki tuo Bombetokanlahteen niin paljon rautapitoista maa-ainesta, että vesi on ruosteenpunaista. Saarekkeet lahden suulla ovat kasvaneet siitä maasta, jonka joki on huuhtonut metsänhakkuiden jäljiltä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 71",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss071e218069/iss071e218069~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss071e218069/iss071e218069~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss071e218069"
      }
    ]
  },
  {
    "tunnus": "gibraltar",
    "nimi": "Gibraltarinsalmi",
    "seutu": "Espanja ja Marokko",
    "selite": "Neljäntoista kilometrin kapeikko kahden mantereen ja kahden meren välissä.",
    "lat": 35.95,
    "lon": -5.6,
    "oletus": "iss071e217183",
    "havainnot": [
      {
        "id": "iss071e217183",
        "aika": "2024-06-25",
        "teksti": "Espanja vasemmalla, Marokko oikealla, ja niiden välissä salmi, joka yhdistää Atlantin Välimereen. Oikeassa yläkulmassa näkyy avaruusaseman robottikäsi. Kuvan otti astronautti Butch Wilmore.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 71",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss071e217183/iss071e217183~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss071e217183/iss071e217183~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss071e217183"
      },
      {
        "id": "iss073e0686324",
        "aika": "2025-08-30",
        "teksti": "Sama salmi yöllä. Molempien rannikoiden valot piirtävät kapeikon muodon, ja horisontissa hohtaa ilmakehän oma vihreä valo. Paikallista aikaa oli puoli kaksi yöllä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0686324/iss073e0686324~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0686324/iss073e0686324~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0686324"
      }
    ]
  },
  {
    "tunnus": "bahama",
    "nimi": "Bahaman matalikot",
    "seutu": "Bahama",
    "selite": "Kirkas vesi matalan kalkkipohjan päällä — avaruuden näkyvin turkoosi.",
    "lat": 24,
    "lon": -77.5,
    "oletus": "iss071e449837",
    "havainnot": [
      {
        "id": "iss058e002206",
        "aika": "2019-01-04",
        "teksti": "Sama matalikkoalue Kuuban suunnasta katsottuna. Kuvan vasemmassa reunassa näkyy avaruusasemaan telakoitu Progress-rahtialus — muistutus siitä, mistä ikkunasta kuvat otetaan.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 58",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss058e002206/iss058e002206~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss058e002206/iss058e002206~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss058e002206"
      },
      {
        "id": "iss071e449837",
        "aika": "2024-07-24",
        "teksti": "Turkoosit alueet ovat vain muutaman metrin syvyisiä kalkkihiekkamatalikoita, joista valo heijastuu takaisin; tummansininen on syvää merta. Ylhäällä kaartuu Maan reuna ja sen yllä ohut ilmakehä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 71",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss071e449837/iss071e449837~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss071e449837/iss071e449837~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss071e449837"
      }
    ]
  },
  {
    "tunnus": "new-york",
    "nimi": "New York yöllä",
    "seutu": "Yhdysvallat",
    "selite": "Katuverkko, jonka muodon tunnistaa pelkistä valoista.",
    "lat": 40.71,
    "lon": -74,
    "oletus": "iss064e016772",
    "havainnot": [
      {
        "id": "iss053e239527",
        "aika": "2017-11-23",
        "teksti": "Laajempi näkymä kaikkiin viiteen kaupunginosaan ja New Jerseyn puolelle. Oranssit valot ovat vanhaa natriumvaloa, kylmän valkoiset uutta LED-valaistusta — ero kertoo, missä katulamput on jo vaihdettu.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 53",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss053e239527/iss053e239527~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss053e239527/iss053e239527~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss053e239527"
      },
      {
        "id": "iss064e016772",
        "aika": "2020-12-30",
        "teksti": "Manhattanin ruutukaava erottuu vaaleana suikaleena, ja Central Park on sen keskellä musta suorakulmio. Joet ja satama jäävät pimeiksi, sillat näkyvät ohuina valojuovina niiden yli.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 64",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss064e016772/iss064e016772~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss064e016772/iss064e016772~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss064e016772"
      }
    ]
  },
  {
    "tunnus": "manicouagan",
    "nimi": "Manicouaganin kraatteri",
    "seutu": "Québec, Kanada",
    "selite": "Rengasjärvi, joka on 214 miljoonaa vuotta vanhan törmäyksen jälki.",
    "lat": 51.38,
    "lon": -68.7,
    "oletus": "iss034e052297",
    "havainnot": [
      {
        "id": "iss034e052297",
        "aika": "2013-02-21",
        "teksti": "Jäätynyt rengasjärvi kiertää keskelle jäänyttä saarta. Kraatteri syntyi noin 214 miljoonaa vuotta sitten asteroidin törmäyksestä, ja jääkaudet ovat sittemmin hioneet sen reunat matalaksi. Se on avaruudesta katsottuna yksi Maan tunnistettavimmista muodoista.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 34",
        "kuvaaja": null,
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss034e052297/iss034e052297~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss034e052297/iss034e052297~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss034e052297"
      }
    ]
  },
  {
    "tunnus": "grand-canyon",
    "nimi": "Grand Canyon",
    "seutu": "Arizona, Yhdysvallat",
    "selite": "Joen kaivama rotko, jonka haarat levittäytyvät kuin puun oksat.",
    "lat": 36.1,
    "lon": -112.1,
    "oletus": "iss074e0208838",
    "havainnot": [
      {
        "id": "iss074e0208838",
        "aika": "2026-01-26",
        "teksti": "Colorado-joki alkoi kaivaa rotkoa noin viisi miljoonaa vuotta sitten. Talvikuvassa varjot ja lumi korostavat sivurotkojen haarautuvaa kuviota, ja ylätasangot erottuvat vaaleina — ne ovat tuhat metriä rotkon pohjan yläpuolella.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 74",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss074e0208838/iss074e0208838~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss074e0208838/iss074e0208838~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss074e0208838"
      }
    ]
  },
  {
    "tunnus": "lago-argentino",
    "nimi": "Lago Argentino",
    "seutu": "Patagonia, Argentiina",
    "selite": "Turkoosi jäätikköjärvi lumihuippujen keskellä.",
    "lat": -50.3,
    "lon": -72.8,
    "oletus": "iss074e0573516",
    "havainnot": [
      {
        "id": "iss030e091253",
        "aika": "2012-02-21",
        "teksti": "Perito Morenon jäätikkö työntyy samaan järveen lännestä. Jäävirta tulee Patagonian mannerjäätiköstä ja päättyy jyrkkään reunaan veden rajassa; kieleke on välillä kasvanut kiinni vastarannan niemeen ja padonnut järven eteläisen haaran.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 30",
        "kuvaaja": null,
        "mitat": [
          1920,
          1275
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss030e091253/iss030e091253~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss030e091253/iss030e091253~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss030e091253"
      },
      {
        "id": "iss074e0573516",
        "aika": "2026-05-06",
        "teksti": "Järven väri tulee jäätikköjauhosta: jäätiköt jauhavat kalliota hienoksi jauheeksi, joka jää veteen leijumaan ja heijastaa valoa turkoosina. Järven sormet työntyvät suoraan Andien lumisten vuorten väliin.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 74",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss074e0573516/iss074e0573516~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss074e0573516/iss074e0573516~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss074e0573516"
      }
    ]
  },
  {
    "tunnus": "ucayali",
    "nimi": "Ucayali",
    "seutu": "Peru",
    "selite": "Amazonin latvajoki, joka vaihtaa uomaansa jatkuvasti.",
    "lat": -7.5,
    "lon": -74.8,
    "oletus": "iss074e0492148",
    "havainnot": [
      {
        "id": "iss074e0492148",
        "aika": "2026-04-15",
        "teksti": "Joki kiemurtelee sademetsän läpi niin jyrkissä mutkissa, että osa niistä on jo kuroutunut umpeen: vanhat uomat näkyvät kaarevina järvinä joen vierellä. Ucayali on Amazonin pääasiallinen latvahaara.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 74",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss074e0492148/iss074e0492148~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss074e0492148/iss074e0492148~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss074e0492148"
      }
    ]
  },
  {
    "tunnus": "taifuuni",
    "nimi": "Taifuunin silmä",
    "seutu": "Tyynimeri, Japanin eteläpuolella",
    "selite": "Myrskyn silmä ylhäältä katsottuna — tyyni reikä keskellä pyörrettä.",
    "lat": 26,
    "lon": 139,
    "oletus": "iss073e1044643",
    "havainnot": [
      {
        "id": "iss073e1044643",
        "aika": "2025-10-08",
        "teksti": "Taifuuni Halong luokkaa neljä Japanin eteläpuolella. Keskellä on silmä, jossa ilma laskeutuu ja pilvet hajoavat; sen ympärillä kiertää tiivis pilviseinä, jossa tuuli on kovimmillaan. Kuvan reunoilla näkyvät avaruusaseman aurinkopaneeli ja robottikäsi.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e1044643/iss073e1044643~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e1044643/iss073e1044643~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e1044643"
      }
    ]
  },
  {
    "tunnus": "revontulet-etela",
    "nimi": "Etelän revontulet",
    "seutu": "Uuden-Seelannin kaakkoispuoli",
    "selite": "Revontulet ylhäältä: valo on samalla korkeudella kuin katsoja.",
    "lat": -48,
    "lon": 179,
    "oletus": "iss073e0256896",
    "havainnot": [
      {
        "id": "iss073e0256896",
        "aika": "2025-06-03",
        "teksti": "Etelän revontulet pyörteilevät pilvien yllä Uuden-Seelannin kaakkoispuolella. Vihreä väri syntyy hapesta noin sadan kilometrin korkeudessa ja punertava sitä ylempää — avaruusasema kiertää noin 400 kilometrissä, eli valon yläpuolella.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0256896/iss073e0256896~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0256896/iss073e0256896~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0256896"
      }
    ]
  },
  {
    "tunnus": "revontulet-pohjoinen",
    "nimi": "Pohjoisen revontulet",
    "seutu": "Saint Lawrencenlahti, Kanada",
    "selite": "Punaista ja vihreää verhoa Kanadan yllä.",
    "lat": 48.5,
    "lon": -62,
    "oletus": "iss072e451060",
    "havainnot": [
      {
        "id": "iss072e451060",
        "aika": "2025-01-04",
        "teksti": "Revontuliverho seisoo pystyssä kuin valoaita: alaosa on vihreä, yläosa punainen. Väri kertoo korkeuden, koska ohuessa yläilmakehässä happi ehtii hehkua punaisena. Tähtiä näkyy verhon läpi.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 72",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss072e451060/iss072e451060~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss072e451060/iss072e451060~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss072e451060"
      }
    ]
  },
  {
    "tunnus": "himalaja",
    "nimi": "Himalaja",
    "seutu": "Nepal ja Kiina",
    "selite": "Vuorijono, joka jakaa ilmaston kahtia.",
    "lat": 28.3,
    "lon": 85.5,
    "oletus": "iss074e0603570",
    "havainnot": [
      {
        "id": "iss074e0603570",
        "aika": "2026-05-20",
        "teksti": "Lumiset huiput erottavat Nepalin Tiibetistä. Vuoristo toimii patona: kostea ilma pysähtyy etelärinteille, ja pohjoispuolen ylätasanko jää kuivaksi. Ero näkyy kuvassa värinä — alhaalla vihreää, ylhäällä ruskeaa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 74",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss074e0603570/iss074e0603570~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss074e0603570/iss074e0603570~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss074e0603570"
      }
    ]
  },
  {
    "tunnus": "goidhoo",
    "nimi": "Goidhoon atolli",
    "seutu": "Malediivit",
    "selite": "Rengasriutta, jonka sisään jää matala laguuni.",
    "lat": 4.9,
    "lon": 72.9,
    "oletus": "iss010e12917",
    "havainnot": [
      {
        "id": "iss010e12917",
        "aika": "2005-01-13",
        "teksti": "Atolli on vanhan tulivuoren ympärille kasvanut koralliriutta: vuori on painunut mereen, riutta jäi. Vaalea vyöhyke on riutan matalikkoa, tummansininen ulkopuolella on satojen metrien syvyistä. Kuva on osa sarjaa, joka otettiin vuoden 2004 tsunamin jälkeen.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 10",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://media.matkakirja.app/linssit/astronautin-kamera/iss010e12917~large.jpg",
        "pikku": "https://media.matkakirja.app/linssit/astronautin-kamera/iss010e12917~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss010e12917"
      }
    ]
  },
  {
    "tunnus": "bermuda",
    "nimi": "Bermuda",
    "seutu": "Pohjois-Atlantti",
    "selite": "Yksinäinen saariryhmä keskellä valtamerta, riutan reunustamana.",
    "lat": 32.32,
    "lon": -64.75,
    "oletus": "iss071e206529",
    "havainnot": [
      {
        "id": "iss071e206529",
        "aika": "2024-06-19",
        "teksti": "Bermudan koukkumainen saariketju on sammuneen tulivuoren huipulle kasvanut kalkkikivikansi. Vaaleansininen alue saaren ympärillä on matalaa riuttatasannetta, sen takana meri syvenee tuhansiin metreihin. Lähin manner on yli 1 000 kilometrin päässä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 71",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss071e206529/iss071e206529~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss071e206529/iss071e206529~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss071e206529"
      }
    ]
  },
  {
    "tunnus": "bazaruto",
    "nimi": "Bazaruton saaristo",
    "seutu": "Mosambik",
    "selite": "Hiekkasärkkiä ja vuorovesivirtoja, jotka piirtyvät veteen kuin suonisto.",
    "lat": -21.6,
    "lon": 35.45,
    "oletus": "iss065e009427",
    "havainnot": [
      {
        "id": "iss065e009427",
        "aika": "2021-04-29",
        "teksti": "Pitkä hiekkasaari erottaa matalan salmen avomerestä. Turkoosit juovat ovat vuoroveden kuljettamaa hiekkaa: vesi virtaa saaren ohi kahdesti päivässä sisään ja ulos, ja pohja järjestyy virran suuntaisiksi harjuiksi.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 65",
        "kuvaaja": "Shane Kimbrough",
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss065e009427/iss065e009427~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss065e009427/iss065e009427~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss065e009427"
      },
      {
        "id": "iss070e064005",
        "aika": "2024-01-10",
        "teksti": "Sama salmi lähempää. Vaaleat viuhkat ovat hiekkaa, tummemmat urat syvempiä väyliä. Kuvio muuttuu myrskyjen mukana, joten merikartat vanhenevat täällä nopeammin kuin kalliorannikolla.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 70",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss070e064005/iss070e064005~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss070e064005/iss070e064005~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss070e064005"
      }
    ]
  },
  {
    "tunnus": "quirimbas",
    "nimi": "Quirimbasin saaret",
    "seutu": "Mosambik",
    "selite": "Riuttasaarten ketju mantereen ja syvän meren rajalla.",
    "lat": -12.3,
    "lon": 40.6,
    "oletus": "iss071e378497",
    "havainnot": [
      {
        "id": "iss071e378497",
        "aika": "2024-07-21",
        "teksti": "Saaret ovat jonossa pitkin mannerjalustan reunaa. Jokaisen ympärillä näkyy vaalea riuttarengas, ja heti sen ulkopuolella vesi muuttuu yhtäkkiä tummansiniseksi — siinä pohja putoaa jyrkästi Intian valtamereen.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 71",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss071e378497/iss071e378497~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss071e378497/iss071e378497~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss071e378497"
      }
    ]
  },
  {
    "tunnus": "turks-caicos",
    "nimi": "Turks- ja Caicossaaret",
    "seutu": "Karibia",
    "selite": "Matalikko, joka hohtaa vaaleana keskellä syvää merta.",
    "lat": 21.75,
    "lon": -71.75,
    "oletus": "iss073e0118628",
    "havainnot": [
      {
        "id": "iss073e0118628",
        "aika": "2025-05-26",
        "teksti": "Saaret ovat vain kapea reunus laajan kalkkimatalikon päällä. Vaaleanvihreä alue on muutaman metrin syvyistä vettä hiekkapohjan yllä; ympäröivä tummansininen on kilometrien syvyistä. Sama raja erottaa myös lämpimän ja kylmän veden.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1078
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0118628/iss073e0118628~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0118628/iss073e0118628~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0118628"
      }
    ]
  },
  {
    "tunnus": "mayotte",
    "nimi": "Mayotte",
    "seutu": "Mosambikin kanaali",
    "selite": "Saari, jonka ympärillä on yhtenäinen valliriutta.",
    "lat": -12.8,
    "lon": 45.15,
    "oletus": "iss071e345427",
    "havainnot": [
      {
        "id": "iss071e345427",
        "aika": "2024-07-15",
        "teksti": "Vanhan tulivuoren ympärille on kasvanut yhtenäinen valliriutta, ja saaren ja riutan väliin jää laguuni. Tulivuori painuu hitaasti mereen, riutta kasvaa ylöspäin samaa tahtia — kun saari lopulta katoaa, jäljelle jää pelkkä rengas eli atolli.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 71",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss071e345427/iss071e345427~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss071e345427/iss071e345427~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss071e345427"
      }
    ]
  },
  {
    "tunnus": "galapagos",
    "nimi": "Galápagossaaret",
    "seutu": "Ecuador, Tyynimeri",
    "selite": "Kuusi kilpitulivuorta merestä, jokaisella oma kraatteri.",
    "lat": -0.4,
    "lon": -91.1,
    "oletus": "STS099-753-032",
    "havainnot": [
      {
        "id": "sts059-213-019",
        "aika": "1994-04-14",
        "teksti": "Isabela on syntynyt useasta tulivuoresta, jotka ovat kasvaneet yhteen. Keskellä näkyy kraatterin romahtanut lakikattila, ja rinteiltä laskeutuu tummia laavavirtoja rantaan asti. Vihreä vyö erottaa sateiset ylärinteet kuivasta rannikosta.",
        "kuvaustapa": "Avaruussukkulasta",
        "retkikunta": null,
        "kuvaaja": null,
        "mitat": [
          1920,
          1920
        ],
        "kuva": "https://images-assets.nasa.gov/image/sts059-213-019/sts059-213-019~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/sts059-213-019/sts059-213-019~small.jpg",
        "sivu": "https://images.nasa.gov/details/sts059-213-019"
      },
      {
        "id": "STS099-753-032",
        "aika": "2000-03-28",
        "teksti": "Saariryhmä ylhäältä: jokaisessa saaressa erottuu pyöreä lakikattila. Tulivuoret nousevat kuumasta pisteestä merenpohjassa, ja maalevyn liikkuessa itään vanhimmat saaret jäävät kauemmas ja sammuvat. Charles Darwin kävi täällä 1835.",
        "kuvaustapa": "Avaruussukkulasta",
        "retkikunta": null,
        "kuvaaja": null,
        "mitat": [
          1901,
          1920
        ],
        "kuva": "https://images-assets.nasa.gov/image/STS099-753-032/STS099-753-032~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/STS099-753-032/STS099-753-032~small.jpg",
        "sivu": "https://images.nasa.gov/details/STS099-753-032"
      }
    ]
  },
  {
    "tunnus": "onekotan",
    "nimi": "Onekotan",
    "seutu": "Kuriilit, Venäjä",
    "selite": "Kraatterijärvi, jonka keskellä kohoaa uusi tulivuorenkartio.",
    "lat": 49.45,
    "lon": 154.75,
    "oletus": "iss071e046421",
    "havainnot": [
      {
        "id": "iss026e016287",
        "aika": "2011-01-09",
        "teksti": "Asumattoman saaren molemmissa päissä on lakikattila. Saari on lumen peitossa, ja pyöreät kattilat erottuvat varjojensa ansiosta: reunat ovat jyrkät, pohja tasainen. Kuriilien ketju erottaa Ohotanmeren Tyynestämerestä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 26",
        "kuvaaja": null,
        "mitat": [
          1920,
          1311
        ],
        "kuva": "https://media.matkakirja.app/linssit/astronautin-kamera/iss026e016287~large.jpg",
        "pikku": "https://media.matkakirja.app/linssit/astronautin-kamera/iss026e016287~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss026e016287"
      },
      {
        "id": "iss071e046421",
        "aika": "2024-04-29",
        "teksti": "Tao-Rusyrin kattilan pohjalla on rengasmainen järvi, ja sen keskellä nousee Krenitsynin huippu — tulivuori järven sisällä. Kattila syntyi, kun vanha huippu romahti tyhjentyneen magmasäiliön päälle; uusi kartio kasvoi romahduksen jälkeen.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 71",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss071e046421/iss071e046421~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss071e046421/iss071e046421~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss071e046421"
      }
    ]
  },
  {
    "tunnus": "mataiva",
    "nimi": "Mataivan atolli",
    "seutu": "Tuamotu, Ranskan Polynesia",
    "selite": "Atolli, jonka laguuni on jakautunut kymmeniksi altaiksi.",
    "lat": -14.88,
    "lon": -148.68,
    "oletus": "iss024e011914",
    "havainnot": [
      {
        "id": "iss024e011914",
        "aika": "2010-08-13",
        "teksti": "Laguunin pohjassa kulkee matalien harjanteiden verkko, joka jakaa sen noin seitsemäänkymmeneen altaaseen. Harjanteet ovat vanhan riutan runkoa, joka jäi pystyyn laguunin syvetessä. Saaren nimi tarkoittaa paikallisella kielellä yhdeksää silmää.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 24",
        "kuvaaja": null,
        "mitat": [
          1920,
          1311
        ],
        "kuva": "https://media.matkakirja.app/linssit/astronautin-kamera/iss024e011914~large.jpg",
        "pikku": "https://media.matkakirja.app/linssit/astronautin-kamera/iss024e011914~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss024e011914"
      }
    ]
  },
  {
    "tunnus": "seurasaaret",
    "nimi": "Seurasaaret",
    "seutu": "Ranskan Polynesia",
    "selite": "Vuorisaaria valliriuttojen sisällä, eri ikäisiä vierekkäin.",
    "lat": -16.5,
    "lon": -151.75,
    "oletus": "sts093-717-066",
    "havainnot": [
      {
        "id": "sts093-717-066",
        "aika": "1999-07-25",
        "teksti": "Kolme saarta samassa kuvassa, kolme eri vaihetta samasta kehityksestä. Nuorimmassa vuori täyttää vielä riuttarenkaan, vanhemmassa vuoren ja riutan väliin on jäänyt leveä laguuni. Bora Bora on näistä pisimmälle kulunut.",
        "kuvaustapa": "Avaruussukkulasta",
        "retkikunta": null,
        "kuvaaja": null,
        "mitat": [
          1920,
          1843
        ],
        "kuva": "https://images-assets.nasa.gov/image/sts093-717-066/sts093-717-066~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/sts093-717-066/sts093-717-066~small.jpg",
        "sivu": "https://images.nasa.gov/details/sts093-717-066"
      }
    ]
  },
  {
    "tunnus": "al-wadj",
    "nimi": "Al Wadjin riuttamatalikko",
    "seutu": "Punainenmeri, Saudi-Arabia",
    "selite": "Aavikko loppuu rantaan, ja vedessä jatkuu koralliriutta.",
    "lat": 25.3,
    "lon": 36.7,
    "oletus": "iss016e019394",
    "havainnot": [
      {
        "id": "iss016e019394",
        "aika": "2008-05-02",
        "teksti": "Hiekkasaarten ympärillä kiemurtelee turkoosi riuttamatalikko. Punainenmeri on kapea repeämä maankuoressa: Afrikka ja Arabia loittonevat toisistaan noin sentin vuodessa, ja riutat kasvavat repeämän reunoille.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 16",
        "kuvaaja": null,
        "mitat": [
          1920,
          1271
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss016e019394/iss016e019394~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss016e019394/iss016e019394~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss016e019394"
      }
    ]
  },
  {
    "tunnus": "ganges",
    "nimi": "Gangesin suisto",
    "seutu": "Bangladesh ja Intia",
    "selite": "Maailman laajin jokisuisto, jonka reunalla kasvaa mangrovemetsä.",
    "lat": 22,
    "lon": 89.2,
    "oletus": "sts066-92-013",
    "havainnot": [
      {
        "id": "sts066-92-013",
        "aika": "1994-11-14",
        "teksti": "Ganges ja Brahmaputra tuovat Himalajalta niin paljon lietettä, että suisto kasvaa yhä merelle päin. Vaalea alue rannan edustalla on veteen sekoittunutta savea. Suiston haarat vaihtavat paikkaa tulvien mukana, ja niiden mukana vaihtuvat kylienkin paikat.",
        "kuvaustapa": "Avaruussukkulasta",
        "retkikunta": null,
        "kuvaaja": null,
        "mitat": [
          1920,
          1917
        ],
        "kuva": "https://images-assets.nasa.gov/image/sts066-92-013/sts066-92-013~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/sts066-92-013/sts066-92-013~small.jpg",
        "sivu": "https://images.nasa.gov/details/sts066-92-013"
      },
      {
        "id": "iss070e005997",
        "aika": "2023-10-19",
        "teksti": "Sundarbansin mangrovemetsä suiston merenpuoleisella reunalla. Tummat saarekkeet ovat metsää, vaaleat haarat vuorovesiuomia. Metsä kasvaa suolaisessa vedessä ja vaimentaa myrskyjen aallot ennen kuin ne osuvat viljelysmaahan.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 70",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss070e005997/iss070e005997~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss070e005997/iss070e005997~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss070e005997"
      }
    ]
  },
  {
    "tunnus": "mississippi-suisto",
    "nimi": "Mississippin suisto",
    "seutu": "Louisiana, Yhdysvallat",
    "selite": "Linnunjalka, jonka joki on työntänyt kauas merelle.",
    "lat": 29.15,
    "lon": -89.25,
    "oletus": "STS062-85-021",
    "havainnot": [
      {
        "id": "STS062-85-021",
        "aika": "1994-03-05",
        "teksti": "Joki on rakentanut omista lietteistään kapeat sormet, jotka jatkuvat kauas merelle — muoto on saanut nimen linnunjalka. Vaalea usva veden päällä on suistosta purkautuvaa savea. Ilman patoja joki olisi jo vaihtanut uomaansa lännemmäs.",
        "kuvaustapa": "Avaruussukkulasta",
        "retkikunta": null,
        "kuvaaja": null,
        "mitat": [
          1906,
          1920
        ],
        "kuva": "https://images-assets.nasa.gov/image/STS062-85-021/STS062-85-021~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/STS062-85-021/STS062-85-021~small.jpg",
        "sivu": "https://images.nasa.gov/details/STS062-85-021"
      }
    ]
  },
  {
    "tunnus": "zeeland",
    "nimi": "Reinin suistosaaret",
    "seutu": "Zeeland, Alankomaat",
    "selite": "Suisto, jonka ihminen on rakentanut osittain uudelleen.",
    "lat": 51.6,
    "lon": 4,
    "oletus": "iss071e488058",
    "havainnot": [
      {
        "id": "iss071e488058",
        "aika": "2024-08-11",
        "teksti": "Rein, Maas ja Schelde laskevat mereen samassa suistossa. Saarten väliset lahdet on suljettu padoilla vuoden 1953 tulvakatastrofin jälkeen; osa suluista aukeaa yhä vuoroveden mukana, jotta suolainen vesi pitää luonnon ennallaan.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 71",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss071e488058/iss071e488058~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss071e488058/iss071e488058~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss071e488058"
      }
    ]
  },
  {
    "tunnus": "niger-suisto",
    "nimi": "Nigerin sisämaan suisto",
    "seutu": "Mali",
    "selite": "Suisto keskellä mannerta: joki leviää eikä pääse mereen.",
    "lat": 15,
    "lon": -4.2,
    "oletus": "iss070e030773",
    "havainnot": [
      {
        "id": "iss070e030773",
        "aika": "2023-11-26",
        "teksti": "Niger hajoaa Malissa satojen uomien ja kausijärvien verkoksi, vaikka meri on yhä tuhannen kilometrin päässä. Sadekaudella alue täyttyy vedellä ja ruokkii kalastajat ja karjan; kuivalla kaudella jäljelle jäävät vaaleat suolareunaiset altaat.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 70",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss070e030773/iss070e030773~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss070e030773/iss070e030773~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss070e030773"
      }
    ]
  },
  {
    "tunnus": "uyuni",
    "nimi": "Uyunin suolatasanko",
    "seutu": "Bolivia",
    "selite": "Maailman laajin suolatasanko ja sen reunalla sammunut tulivuori.",
    "lat": -19.9,
    "lon": -67.6,
    "oletus": "iss012e06456",
    "havainnot": [
      {
        "id": "iss012e06456",
        "aika": "2005-11-03",
        "teksti": "Tumma Tunupan tulivuori työntyy valkoiselle suola-aavikolle. Tasanko on kuivuneen järven pohja: suolakuori on paikoin metrien paksuinen ja niin tasainen, että satelliitit käyttävät sitä korkeusmittariensa tarkistamiseen.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 12",
        "kuvaaja": null,
        "mitat": [
          1920,
          1271
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss012e06456/iss012e06456~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss012e06456/iss012e06456~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss012e06456"
      }
    ]
  },
  {
    "tunnus": "araljarvi",
    "nimi": "Araljärvi",
    "seutu": "Kazakstan ja Uzbekistan",
    "selite": "Järvi, joka kuivui, kun sen joet ohjattiin pelloille.",
    "lat": 45,
    "lon": 59.5,
    "oletus": "sts059-l22-140",
    "havainnot": [
      {
        "id": "sts059-l22-140",
        "aika": "1994-04-14",
        "teksti": "Aral oli 1960-luvulla maailman neljänneksi suurin järvi. Kun sen kaksi jokea ohjattiin puuvillapelloille, vesi väheni vuosi vuodelta; tässä vuoden 1994 kuvassa jäljellä on enää osa entisestä, ja vaalea reunus on paljastunutta suolapohjaa.",
        "kuvaustapa": "Avaruussukkulasta",
        "retkikunta": null,
        "kuvaaja": null,
        "mitat": [
          1919,
          1515
        ],
        "kuva": "https://images-assets.nasa.gov/image/sts059-l22-140/sts059-l22-140~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/sts059-l22-140/sts059-l22-140~small.jpg",
        "sivu": "https://images.nasa.gov/details/sts059-l22-140"
      }
    ]
  },
  {
    "tunnus": "baikal",
    "nimi": "Baikal jäässä",
    "seutu": "Siperia, Venäjä",
    "selite": "Maailman syvin järvi talvisen jään peitossa.",
    "lat": 53.5,
    "lon": 108,
    "oletus": "sts059-90-098",
    "havainnot": [
      {
        "id": "sts059-90-098",
        "aika": "1994-04-16",
        "teksti": "Baikal on yli 1 600 metriä syvä ja sisältää noin viidenneksen maapallon jäätymättömästä makeasta vedestä. Talvella pinta jäätyy metrin paksuiseksi kanneksi, jonka yli on ennen kuljettu hevosilla ja jopa rautateitse.",
        "kuvaustapa": "Avaruussukkulasta",
        "retkikunta": null,
        "kuvaaja": null,
        "mitat": [
          1896,
          1920
        ],
        "kuva": "https://images-assets.nasa.gov/image/sts059-90-098/sts059-90-098~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/sts059-90-098/sts059-90-098~small.jpg",
        "sivu": "https://images.nasa.gov/details/sts059-90-098"
      }
    ]
  },
  {
    "tunnus": "suolajarvi-utah",
    "nimi": "Iso Suolajärvi",
    "seutu": "Utah, Yhdysvallat",
    "selite": "Yksi järvi, kaksi väriä — pengertie jakaa veden kahtia.",
    "lat": 41.2,
    "lon": -112.5,
    "oletus": "iss073e0865636",
    "havainnot": [
      {
        "id": "iss073e0865636",
        "aika": "2025-10-07",
        "teksti": "Järven halki kulkeva rautatiepenger estää veden sekoittumisen, ja puoliskoista on tullut eri suolaisia. Suolaisemmassa puolessa viihtyvät punaista väriainetta tuottavat mikrobit, joten sama järvi näkyy toisaalta sinisenä ja toisaalta punaisena.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1078
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0865636/iss073e0865636~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0865636/iss073e0865636~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0865636"
      }
    ]
  },
  {
    "tunnus": "carnegie",
    "nimi": "Carnegiejärvi",
    "seutu": "Länsi-Australia",
    "selite": "Järvi, joka on useimmiten pelkkä kuiva suomutka.",
    "lat": -26.1,
    "lon": 122.5,
    "oletus": "iss071e615200",
    "havainnot": [
      {
        "id": "iss071e615200",
        "aika": "2024-09-09",
        "teksti": "Carnegie täyttyy vedellä vain harvoina sadevuosina; muulloin se on mutaa, suolaa ja kasvillisuuslaikkuja. Vaaleat rannat ovat suolakuorta, ruskeat läikät matalaa vettä. Kuvio on pikemminkin soiden kuin järven muotoinen.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 71",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss071e615200/iss071e615200~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss071e615200/iss071e615200~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss071e615200"
      }
    ]
  },
  {
    "tunnus": "riftin-jarvet",
    "nimi": "Riftin järvet",
    "seutu": "Etiopia",
    "selite": "Järvijono repeämälaaksossa, jokaisella oma väri.",
    "lat": 7.6,
    "lon": 38.75,
    "oletus": "iss071e132461",
    "havainnot": [
      {
        "id": "iss071e132461",
        "aika": "2024-05-27",
        "teksti": "Itä-Afrikan hautavajoama repeää auki, ja laakson pohjalle on jäänyt järviä. Tummansininen on syvä ja kirkas, ruskea matala ja lietteinen; väriero kertoo syvyydestä ja siitä, mitä jokia kuhunkin laskee.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 71",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss071e132461/iss071e132461~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss071e132461/iss071e132461~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss071e132461"
      }
    ]
  },
  {
    "tunnus": "kanadan-palot",
    "nimi": "Kanadan metsäpalot",
    "seutu": "Manitoba ja Saskatchewan, Kanada",
    "selite": "Rinnakkaisia savuvanoja, jokainen omasta palosta.",
    "lat": 55,
    "lon": -101,
    "oletus": "iss073e0420617",
    "havainnot": [
      {
        "id": "iss073e0420617",
        "aika": "2025-08-03",
        "teksti": "Havumetsävyöhykkeellä palaa kymmenkunta erillistä paloa yhtä aikaa, ja tuuli venyttää jokaisen savun samansuuntaiseksi vanaksi. Savu nousee niin korkealle, että se kulkeutuu mantereen yli asti ja sumentaa taivaan tuhansien kilometrien päässä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0420617/iss073e0420617~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0420617/iss073e0420617~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0420617"
      }
    ]
  },
  {
    "tunnus": "mount-hood",
    "nimi": "Mount Hood",
    "seutu": "Oregon, Yhdysvallat",
    "selite": "Lumihuippu ja sen vieressä palava metsä.",
    "lat": 45.37,
    "lon": -121.7,
    "oletus": "iss075e0001471",
    "havainnot": [
      {
        "id": "iss075e0001471",
        "aika": "2026-07-31",
        "teksti": "Vasemmalla kohoaa Mount Hood, jäätiköiden peittämä tulivuori; oikealla Grasshopper-palo työntää paksua savua itään. Kesän kuivuus ja vuoriston tuulet tekevät samasta rinteestä vuorotellen jäätikkömaisemaa ja paloaluetta.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 75",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss075e0001471/iss075e0001471~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss075e0001471/iss075e0001471~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss075e0001471"
      }
    ]
  },
  {
    "tunnus": "nasser",
    "nimi": "Nasser-järvi",
    "seutu": "Egypti",
    "selite": "Tekojärvi, joka täytti Niilin laakson sivuhaarat.",
    "lat": 22.8,
    "lon": 31.8,
    "oletus": "iss073e0879542",
    "havainnot": [
      {
        "id": "iss058e010623",
        "aika": "2019-02-04",
        "teksti": "Järven länsipuolella aavikkoon on merkitty tummia kasteluruutuja: vesi pumpataan järvestä pelloille. Ilman pumppuja ero on jyrkkä — viljelys loppuu siihen, mihin putki yltää.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 58",
        "kuvaaja": null,
        "mitat": [
          1920,
          1078
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss058e010623/iss058e010623~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss058e010623/iss058e010623~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss058e010623"
      },
      {
        "id": "iss073e0879542",
        "aika": "2025-10-13",
        "teksti": "Assuanin padon taakse noussut vesi täytti Niilin laakson sivukuivat uomat, ja rannasta tuli puumainen haarasto. Pato sitoo tulvat ja lietteen; alajuoksulla pellot saavat nyt vetensä säännöstellysti mutta jäävät ilman entistä lannoittavaa mutaa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": "Zena Cardman",
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0879542/iss073e0879542~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0879542/iss073e0879542~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0879542"
      }
    ]
  },
  {
    "tunnus": "kasteluympyrat",
    "nimi": "Kasteluympyrät",
    "seutu": "Saudi-Arabia",
    "selite": "Aavikolle piirretyt ympyrät, joista jokainen on pelto.",
    "lat": 30.6,
    "lon": 38.2,
    "oletus": "sts083-747-033",
    "havainnot": [
      {
        "id": "sts083-747-033",
        "aika": "2016-08-12",
        "teksti": "Jokainen tumma ympyrä on pelto, jota kastelee keskipisteen ympäri kiertävä putkivarsi. Vesi nousee syvältä pohjavesikerroksesta, joka täyttyi viimeisen jääkauden sateista — sitä kuluu nopeammin kuin se uusiutuu.",
        "kuvaustapa": "Avaruussukkulasta",
        "retkikunta": null,
        "kuvaaja": null,
        "mitat": [
          1889,
          1920
        ],
        "kuva": "https://images-assets.nasa.gov/image/sts083-747-033/sts083-747-033~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/sts083-747-033/sts083-747-033~small.jpg",
        "sivu": "https://images.nasa.gov/details/sts083-747-033"
      }
    ]
  },
  {
    "tunnus": "khufrah",
    "nimi": "Al Khufrahin keidas",
    "seutu": "Libya",
    "selite": "Sahara ja sen keskellä täydellisiä ympyröitä.",
    "lat": 24.18,
    "lon": 23.29,
    "oletus": "iss010e05266",
    "havainnot": [
      {
        "id": "iss010e05266",
        "aika": "2004-10-28",
        "teksti": "Vanhan keitaan viereen on pumpattu pohjavedellä satoja pyöreitä peltoja. Vaalea hiekka ympärillä on täysin kuivaa, eikä sadetta juuri tule: ympyrät pysyvät vihreinä vain niin kauan kuin pumput käyvät.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 10",
        "kuvaaja": null,
        "mitat": [
          1271,
          1920
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss010e05266/iss010e05266~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss010e05266/iss010e05266~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss010e05266"
      }
    ]
  },
  {
    "tunnus": "lake-powell",
    "nimi": "Powell-järvi",
    "seutu": "Utah ja Arizona, Yhdysvallat",
    "selite": "Tekojärvi, joka seuraa vanhan kanjonin mutkia.",
    "lat": 37.3,
    "lon": -110.85,
    "oletus": "STS100-716-176",
    "havainnot": [
      {
        "id": "STS100-716-176",
        "aika": "2001-04-30",
        "teksti": "Colorado on uurtanut itsensä syvälle tasangon sisään, ja pato on täyttänyt uoman vedellä. Järvi ei siksi ole leveä allas vaan kapea, haarautuva kiemura — se noudattaa tarkasti sitä muotoa, jonka joki ehti kaivertaa.",
        "kuvaustapa": "Avaruussukkulasta",
        "retkikunta": null,
        "kuvaaja": null,
        "mitat": [
          1920,
          1920
        ],
        "kuva": "https://images-assets.nasa.gov/image/STS100-716-176/STS100-716-176~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/STS100-716-176/STS100-716-176~small.jpg",
        "sivu": "https://images.nasa.gov/details/STS100-716-176"
      },
      {
        "id": "iss031e006398",
        "aika": "2012-04-30",
        "teksti": "Kuvan keskellä on Rincon: umpeen kuroutunut joenmutka, jonka joki hylkäsi ja jätti kuivaksi renkaaksi kallion päälle. Samanlaisia mutkia näkyy ympärillä yhä vedellä täytettyinä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 31",
        "kuvaaja": "Andre Kuipers",
        "mitat": [
          1920,
          1275
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss031e006398/iss031e006398~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss031e006398/iss031e006398~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss031e006398"
      }
    ]
  },
  {
    "tunnus": "issaouane",
    "nimi": "Issaouanen hiekkameri",
    "seutu": "Algeria",
    "selite": "Dyynikenttä, jossa on kahden eri tuulen jälki.",
    "lat": 26.5,
    "lon": 8.5,
    "oletus": "iss013e65526",
    "havainnot": [
      {
        "id": "iss013e65526",
        "aika": "2006-08-08",
        "teksti": "Isojen dyyniharjanteiden päälle on kasvanut pienempiä, eri suuntaan kulkevia kaarteita. Ne kertovat kahdesta tuulesta: vallitseva tuuli rakentaa suuret muodot hitaasti, kausituuli muokkaa pintaa nopeasti.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 13",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://media.matkakirja.app/linssit/astronautin-kamera/iss013e65526~large.jpg",
        "pikku": "https://media.matkakirja.app/linssit/astronautin-kamera/iss013e65526~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss013e65526"
      }
    ]
  },
  {
    "tunnus": "white-sands",
    "nimi": "White Sands",
    "seutu": "New Mexico, Yhdysvallat",
    "selite": "Lumivalkoiset dyynit, jotka eivät ole hiekkaa vaan kipsiä.",
    "lat": 32.85,
    "lon": -106.3,
    "oletus": "sts060-83-016",
    "havainnot": [
      {
        "id": "sts060-83-016",
        "aika": "1994-02-09",
        "teksti": "Dyynien aines on kipsiä, joka liukenee vedessä eikä siksi yleensä säily hiekkana. Täällä se voi: laakso on umpinainen, vesi ei pääse pois vaan haihtuu, ja jäljelle jäävät kiteet tuuli kasaa valkoisiksi kummuiksi.",
        "kuvaustapa": "Avaruussukkulasta",
        "retkikunta": null,
        "kuvaaja": null,
        "mitat": [
          1888,
          1920
        ],
        "kuva": "https://images-assets.nasa.gov/image/sts060-83-016/sts060-83-016~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/sts060-83-016/sts060-83-016~small.jpg",
        "sivu": "https://images.nasa.gov/details/sts060-83-016"
      }
    ]
  },
  {
    "tunnus": "merijaa",
    "nimi": "Merijää Newfoundlandin edustalla",
    "seutu": "Pohjois-Atlantti, Kanada",
    "selite": "Jäälauttoja, jotka merivirta on kiertänyt pyörteiksi.",
    "lat": 49.5,
    "lon": -53,
    "oletus": "iss071e046021",
    "havainnot": [
      {
        "id": "iss071e046021",
        "aika": "2024-04-27",
        "teksti": "Labradorinvirta tuo pohjoisesta talven aikana syntynyttä jäätä, ja virtauksen pyörteet piirtävät siitä valkoisia kiertoja tummaan veteen. Sama virta kuljettaa tänne myös Grönlannista irronneita jäävuoria.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 71",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss071e046021/iss071e046021~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss071e046021/iss071e046021~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss071e046021"
      }
    ]
  },
  {
    "tunnus": "suez",
    "nimi": "Suezin kanava",
    "seutu": "Egypti",
    "selite": "Suora viiva aavikon halki kahden meren välillä.",
    "lat": 30.4,
    "lon": 32.35,
    "oletus": "iss070e034694",
    "havainnot": [
      {
        "id": "iss013e44847",
        "aika": "2006-06-30",
        "teksti": "Kanavan pohjoinen suu Port Saidissa. Väylät jatkuvat merelle aallonmurtajien välissä, ja odottavat laivat näkyvät pieninä tummina viivoina. Kanava avattiin vuonna 1869 — neljä vuotta ennen isoisän matkaa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 13",
        "kuvaaja": null,
        "mitat": [
          1920,
          1271
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss013e44847/iss013e44847~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss013e44847/iss013e44847~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss013e44847"
      },
      {
        "id": "iss070e034694",
        "aika": "2023-11-30",
        "teksti": "Kanavan eteläpää laskee Suezinlahteen. Vesi kulkee ilman sulkuja, koska Välimeri ja Punainenmeri ovat suunnilleen samalla korkeudella; kanavan varren vihreä nauha on sen tuomaa kastelua keskellä aavikkoa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 70",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss070e034694/iss070e034694~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss070e034694/iss070e034694~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss070e034694"
      }
    ]
  },
  {
    "tunnus": "tiran",
    "nimi": "Tiranin salmi",
    "seutu": "Punainenmeri",
    "selite": "Kapea, riuttojen ahtama portti Akabanlahdelle.",
    "lat": 27.95,
    "lon": 34.55,
    "oletus": "iss036e010628",
    "havainnot": [
      {
        "id": "iss036e010628",
        "aika": "2013-06-23",
        "teksti": "Saarten ja riuttojen väliin jää vain muutaman sadan metrin levyinen syvä väylä. Vaaleat alueet ovat matalaa riuttaa, jonka yli laiva ei kulje. Salmi on ainoa reitti Akabanlahden satamiin, mikä on tehnyt siitä toistuvan kiistakohteen.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 36",
        "kuvaaja": null,
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss036e010628/iss036e010628~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss036e010628/iss036e010628~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss036e010628"
      }
    ]
  },
  {
    "tunnus": "tunis",
    "nimi": "Tunis yöllä",
    "seutu": "Tunisia",
    "selite": "Kaupungin valot piirtävät lahden ja laguunin muodon.",
    "lat": 36.8,
    "lon": 10.18,
    "oletus": "iss073e0078538",
    "havainnot": [
      {
        "id": "iss073e0078538",
        "aika": "2025-05-17",
        "teksti": "Mustat aukot valojen keskellä ovat vettä: matala laguuni kaupungin ja meren välissä sekä suolajärvi lounaassa. Oranssit alueet ovat vanhempaa natriumvaloa, valkoiset uudempaa led-valoa — kaupungin ikä näkyy värissä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0078538/iss073e0078538~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0078538/iss073e0078538~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0078538"
      }
    ]
  },
  {
    "tunnus": "kairo-yolla",
    "nimi": "Kairo yöllä",
    "seutu": "Egypti",
    "selite": "Niili halkaisee valomeren ja jatkuu suistoon.",
    "lat": 30.05,
    "lon": 31.25,
    "oletus": "iss074e0043697",
    "havainnot": [
      {
        "id": "iss074e0043697",
        "aika": "2026-01-03",
        "teksti": "Joki näkyy mustana nauhana keskellä kaupunkia, ja pohjoisessa valot haarautuvat suiston suuntaan. Aavikko jää ympärillä täysin pimeäksi: lähes koko Egyptin väestö asuu tällä kapealla, kastellulla kaistalla.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 74",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss074e0043697/iss074e0043697~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss074e0043697/iss074e0043697~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss074e0043697"
      }
    ]
  },
  {
    "tunnus": "bingham",
    "nimi": "Binghamin avolouhos",
    "seutu": "Utah, Yhdysvallat",
    "selite": "Ihmisen kaivama kuoppa, joka näkyy avaruuteen asti.",
    "lat": 40.52,
    "lon": -112.15,
    "oletus": "iss015e29867",
    "havainnot": [
      {
        "id": "iss015e29867",
        "aika": "2007-09-20",
        "teksti": "Kuparikaivos on louhittu vuoren sisään terassi kerrallaan; kierteinen kuvio on ajoteitä, joita pitkin kuorma-autot nousevat pohjalta. Kuoppa on lähes neljä kilometriä leveä ja yli kilometrin syvä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 15",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://media.matkakirja.app/linssit/astronautin-kamera/iss015e29867~large.jpg",
        "pikku": "https://media.matkakirja.app/linssit/astronautin-kamera/iss015e29867~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss015e29867"
      }
    ]
  },
  {
    "tunnus": "faiyum",
    "nimi": "Faiyumin keidas",
    "seutu": "Egypti",
    "selite": "Vihreä lehti aavikossa, kiinni Niilissä kuin varressa.",
    "lat": 29.45,
    "lon": 30.6,
    "oletus": "iss061e004613",
    "havainnot": [
      {
        "id": "iss061e004613",
        "aika": "2019-10-09",
        "teksti": "Painanne aavikossa täyttyy Niilistä johdetusta vedestä, ja sen ympärille on kasvanut viljelysalue. Kanava on kaivettu jo faaraoiden aikana; altaan pohjalla oleva Qarun-järvi on suolainen, koska vesi haihtuu eikä pääse pois.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 61",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss061e004613/iss061e004613~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss061e004613/iss061e004613~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss061e004613"
      }
    ]
  },
  {
    "tunnus": "ulawun",
    "nimi": "Ulawun",
    "seutu": "Uusi-Britannia, Papua-Uusi-Guinea",
    "selite": "Tuhkapatsas, jonka tuuli taittaa merelle.",
    "lat": -5.05,
    "lon": 151.33,
    "oletus": "iss034e005496",
    "havainnot": [
      {
        "id": "iss034e005496",
        "aika": "2012-11-30",
        "teksti": "Purkaus nousee saaren korkeimmalta huipulta, ja tuuli kääntää tuhkan harmaaksi vanaksi merelle. Ulawun on yksi Tyynenmeren tulirenkaan aktiivisimmista tulivuorista, ja sen juurella asuu tuhansia ihmisiä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 34",
        "kuvaaja": null,
        "mitat": [
          1920,
          1275
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss034e005496/iss034e005496~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss034e005496/iss034e005496~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss034e005496"
      }
    ]
  },
  {
    "tunnus": "jaavuori",
    "nimi": "Pöytäjäävuori",
    "seutu": "Eteläinen Atlantti",
    "selite": "Litteä jäälautta, joka on irronnut mannerjäätiköstä.",
    "lat": -55,
    "lon": -40,
    "oletus": "sts048-73-000q",
    "havainnot": [
      {
        "id": "sts048-73-000q",
        "aika": "1991-09-18",
        "teksti": "Etelämantereen jäähyllystä irronnut jäävuori on tasakantinen, koska se on lohjennut kelluvan jäälautan reunasta. Yhdeksän kymmenesosaa jäästä on pinnan alla. Merivirrat kuljettavat tällaisia lauttoja vuosia pohjoiseen, kunnes ne sulavat.",
        "kuvaustapa": "Avaruussukkulasta",
        "retkikunta": null,
        "kuvaaja": null,
        "mitat": [
          1906,
          1920
        ],
        "kuva": "https://images-assets.nasa.gov/image/sts048-73-000q/sts048-73-000q~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/sts048-73-000q/sts048-73-000q~small.jpg",
        "sivu": "https://images.nasa.gov/details/sts048-73-000q"
      }
    ]
  },
  {
    "tunnus": "heard",
    "nimi": "Heardin saari",
    "seutu": "Eteläinen Intian valtameri",
    "selite": "Jäätikköinen tulivuori keskellä myrskyisää merta.",
    "lat": -53.1,
    "lon": 73.51,
    "oletus": "iss018e038182",
    "havainnot": [
      {
        "id": "iss018e038182",
        "aika": "2009-02-28",
        "teksti": "Mawsonin huippu on jäätiköiden peittämä toimiva tulivuori: jäävirrat laskevat sen rinteiltä suoraan mereen. Saarella ei ole pysyvää asutusta, ja sinne pääsee vain laivalla tuhansien kilometrien päästä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 18",
        "kuvaaja": null,
        "mitat": [
          1920,
          1311
        ],
        "kuva": "https://media.matkakirja.app/linssit/astronautin-kamera/iss018e038182~large.jpg",
        "pikku": "https://media.matkakirja.app/linssit/astronautin-kamera/iss018e038182~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss018e038182"
      }
    ]
  },
  {
    "tunnus": "pariisi",
    "nimi": "Pariisi",
    "seutu": "Ranska",
    "selite": "Ranskan pääkaupunki, jonka säteittäiset bulevardit erottuvat selvästi yöllä avaruudesta.",
    "lat": 48.857,
    "lon": 2.352,
    "oletus": "iss072e789833",
    "havainnot": [
      {
        "id": "iss072e789833",
        "aika": "2025-03-14",
        "teksti": "Pariisi yöllisessä valaistuksessa avaruusasemalta kuvattuna. Eiffel-tornin ja Champs de Marsin kohdalla erottuu kirkas valopilkku kuvan keskellä, ja kaupungin säteittäiset bulevardit haarautuvat siitä joka suuntaan. Seine-joki näkyy tummana, valottomana nauhana kaupungin halki.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 72",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss072e789833/iss072e789833~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss072e789833/iss072e789833~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss072e789833"
      }
    ]
  },
  {
    "tunnus": "lontoo",
    "nimi": "Lontoo",
    "seutu": "Englanti, Yhdistynyt kuningaskunta",
    "selite": "Yhdistyneen kuningaskunnan pääkaupunki, jonka halki mutkitteleva Thames erottaa sen kahtia myös yöllä.",
    "lat": 51.507,
    "lon": -0.128,
    "oletus": "iss074e0405029",
    "havainnot": [
      {
        "id": "iss074e0405029",
        "aika": "2026-03-19",
        "teksti": "Lontoo yöllä avaruusasemalta kuvattuna. Thames-joki mutkittelee kirkkaana valonauhojen välissä kaupungin keskellä ja jakaa sen kahtia. Kuvan alareunassa erottuu Heathrowin lentokentän kiitoratavalaistus ja oikeassa reunassa Gatwickin lentokenttä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 74",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss074e0405029/iss074e0405029~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss074e0405029/iss074e0405029~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss074e0405029"
      }
    ]
  },
  {
    "tunnus": "rooma",
    "nimi": "Rooma",
    "seutu": "Italia",
    "selite": "Italian pääkaupunki ja antiikin valtakunnan sydän, asutettuna yhtäjaksoisesti tuhansia vuosia.",
    "lat": 41.893,
    "lon": 12.483,
    "oletus": "iss073e0343840",
    "havainnot": [
      {
        "id": "iss073e0343840",
        "aika": "2025-07-15",
        "teksti": "Rooma yöllä, avaruusasemalta kuvattuna. Kaupungin tiivis, sokkeloinen valokudos erottuu selvästi ympäröivästä maaseudusta, ja kuvan vasemmassa reunassa näkyy Tyrrhenanmeren pimeä rantaviiva.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0343840/iss073e0343840~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0343840/iss073e0343840~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0343840"
      }
    ]
  },
  {
    "tunnus": "venetsia",
    "nimi": "Venetsia",
    "seutu": "Italia",
    "selite": "Italian kanavakaupunki, rakennettu sadan sokkeloisen saaren päälle laguunin keskelle.",
    "lat": 45.44,
    "lon": 12.332,
    "oletus": "iss014e17346",
    "havainnot": [
      {
        "id": "iss014e17346",
        "aika": "2007-03-15",
        "teksti": "Venetsia päivänvalossa avaruusasemalta kuvattuna. Kaupungin tunnusomainen kalanmuotoinen saari erottuu selvästi laguunin vihertävästä vedestä, ja Canal Granden S-mutka halkoo sitä keskeltä. Kuvan yläosassa näkyy Muranon saari, ja vasemmassa reunassa rautatiesilta, joka yhdistää Venetsian Italian mantereeseen.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 14",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss014e17346/iss014e17346~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss014e17346/iss014e17346~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss014e17346"
      }
    ]
  },
  {
    "tunnus": "moskova",
    "nimi": "Moskova",
    "seutu": "Venäjä",
    "selite": "Venäjän pääkaupunki, jonka säteittäis-rengasmainen katuverkko erottuu selvästi avaruudesta.",
    "lat": 55.751,
    "lon": 37.617,
    "oletus": "iss064e024687",
    "havainnot": [
      {
        "id": "iss064e024687",
        "aika": "2021-01-20",
        "teksti": "Moskova yöllä avaruusasemalta kuvattuna. Kaupungin säteittäis-rengasmainen katuverkko erottuu kirkkaana valokuviona, ja tiiviisti valaistu keskusta hehkuu selvästi ympäröivää, harvemmin valaistua esikaupunkialuetta vasten. Moskova-joki virtaa keskustan halki tummana, valottomana raitana.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 64",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss064e024687/iss064e024687~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss064e024687/iss064e024687~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss064e024687"
      }
    ]
  },
  {
    "tunnus": "peking",
    "nimi": "Peking",
    "seutu": "Kiina",
    "selite": "Kiinan pääkaupunki ja Kielletyn kaupungin kotipaikka, ainoa isännöinyt kesä- ja talviolympialaiset.",
    "lat": 39.904,
    "lon": 116.408,
    "oletus": "iss072e444944",
    "havainnot": [
      {
        "id": "iss072e444944",
        "aika": "2024-12-28",
        "teksti": "Peking yöllä avaruusasemalta kuvattuna. Kaupungin keskusta erottuu ruudukkomaisena, oranssinsävyisenä valomerenä, jota ympäröivät konsentriset kehätiet. Kuvan keskellä erottuu Kielletyn kaupungin kirkkaasti valaistu Meridiaaniportti, ja oikeassa yläkulmassa näkyvät lentokentän valaistut kiitoradat.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 72",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss072e444944/iss072e444944~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss072e444944/iss072e444944~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss072e444944"
      }
    ]
  },
  {
    "tunnus": "hongkong",
    "nimi": "Hongkong",
    "seutu": "Kiina (erityishallintoalue)",
    "selite": "Kiinan erityishallintoalue, jonka valot erottuvat selvästi naapurikaupunki Shenzhenin valoista.",
    "lat": 22.278,
    "lon": 114.159,
    "oletus": "iss072e399613",
    "havainnot": [
      {
        "id": "iss072e399613",
        "aika": "2024-12-20",
        "teksti": "Hongkong ja naapurikaupunki Shenzhen yöllä avaruusasemalta kuvattuna. Kuvan alaosan Hongkongin rannikko erottuu lämpimän kellertävänä valona, kun taas yläosan Shenzhen hohtaa sinertävänä — ero johtuu kaupunkien erilaisesta valaistushistoriasta ja -tekniikasta rajan molemmin puolin.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 72",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss072e399613/iss072e399613~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss072e399613/iss072e399613~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss072e399613"
      }
    ]
  },
  {
    "tunnus": "singapore",
    "nimi": "Singapore",
    "seutu": "Singapore",
    "selite": "Kaupunkivaltio Malesian kärjessä, jonka lentokenttä ja konttisatama näkyvät selvästi yöllä.",
    "lat": 1.3,
    "lon": 103.8,
    "oletus": "iss073e0763866",
    "havainnot": [
      {
        "id": "iss073e0763866",
        "aika": "2025-09-21",
        "teksti": "Singapore erottuu kuvan keskellä, erotettuna Malesian Johor Bahrusta vasemmalla Johorin salmella. Oikealla keskellä siintää Changin lentokenttä, ja kuvan alaosan kirkas suorakulmainen alue on Pasir Panjangin konttisatama, suunniteltu maailman suurimmille konttialuksille. Kuva otettu yöllä ISS:ltä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0763866/iss073e0763866~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0763866/iss073e0763866~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0763866"
      }
    ]
  },
  {
    "tunnus": "sydney",
    "nimi": "Sydney",
    "seutu": "Australia",
    "selite": "Australian suurin kaupunki, jonka lentokenttä ja satama-alueet reunustavat Botany Baytä.",
    "lat": -33.868,
    "lon": 151.21,
    "oletus": "iss055e073720",
    "havainnot": [
      {
        "id": "iss055e073720",
        "aika": "2018-05-19",
        "teksti": "Kuvassa näkyy Sydneyn lentokenttä kahdella kiitoradallaan Botany Bayn rannalla. Lentokentän ympärillä erottuvat sataman konttiterminaalit ja tiheä ruudukkomainen kaupunkirakenne, joka jatkuu rannikkoa pitkin koilliseen. Kuva otettu päivänvalossa ISS:ltä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 55",
        "kuvaaja": "Andrew Feustel",
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss055e073720/iss055e073720~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss055e073720/iss055e073720~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss055e073720"
      }
    ]
  },
  {
    "tunnus": "rio",
    "nimi": "Rio de Janeiro",
    "seutu": "Brasilia",
    "selite": "Brasilian rantakaupunki Guanabaran lahden rannalla, yhdistettynä Niteróihin pitkällä sillalla.",
    "lat": -22.911,
    "lon": -43.206,
    "oletus": "iss070e108427",
    "havainnot": [
      {
        "id": "iss070e108427",
        "aika": "2024-03-05",
        "teksti": "Kuvan keskellä avautuu Guanabaran lahti, jonka länsirannalla on Rio de Janeiro ja itärannalla Niterói. Lahden poikki kulkee noin 13 kilometrin pituinen Rio-Niterói-silta, joka yhdistää kaupungit. Kuva otettu päivänvalossa ISS:ltä Atlantin rannikon yllä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 70",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss070e108427/iss070e108427~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss070e108427/iss070e108427~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss070e108427"
      }
    ]
  },
  {
    "tunnus": "saopaulo",
    "nimi": "São Paulo",
    "seutu": "Brasilia",
    "selite": "Etelä-Amerikan suurin kaupunki ja Brasilian talouden veturi, levittäytynyt laajana valomerenä.",
    "lat": -23.55,
    "lon": -46.634,
    "oletus": "iss073e0982063",
    "havainnot": [
      {
        "id": "iss073e0982063",
        "aika": "2025-09-21",
        "teksti": "São Paulo levittäytyy kuvassa laajana valomerenä yöllä otetussa kuvassa. Kaupungin valot ovat siirtyneet energiatehokkaisiin valkoisiin LED-lamppuihin, jotka näkyvät kuvassa vanhoja oransseja natriumlamppuja kirkkaampina. São Paulon metropolialueella asuu noin 22 miljoonaa ihmistä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0982063/iss073e0982063~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0982063/iss073e0982063~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0982063"
      }
    ]
  },
  {
    "tunnus": "losangeles",
    "nimi": "Los Angeles",
    "seutu": "Yhdysvallat",
    "selite": "Yhdysvaltain Tyynenmeren rannikon suurkaupunki, jonka satama on maan vilkkain konttisatama.",
    "lat": 34.05,
    "lon": -118.25,
    "oletus": "iss073e0513936",
    "havainnot": [
      {
        "id": "iss073e0513936",
        "aika": "2025-08-22",
        "teksti": "Kuvassa erottuu Los Angelesin rannikkoa ja tiheää ruudukkomaista kaupunkirakennetta aina Long Beachin satama-alueelle ja Terminal Islandille asti oikeassa alakulmassa. Vasemmalla rannikolla näkyy myös lentokenttä- ja satamarakenteita. Kuva otettu päivänvalossa ISS:ltä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1078
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0513936/iss073e0513936~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0513936/iss073e0513936~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0513936"
      }
    ]
  },
  {
    "tunnus": "sanfrancisco",
    "nimi": "San Francisco",
    "seutu": "Yhdysvallat",
    "selite": "Kalifornian lahtikaupunki, joka tunnetaan Golden Gate -sillasta ja lähellä syntyneestä Piilaaksosta.",
    "lat": 37.779,
    "lon": -122.419,
    "oletus": "iss073e0285002",
    "havainnot": [
      {
        "id": "iss073e0285002",
        "aika": "2025-07-04",
        "teksti": "Kuvassa San Franciscon lahti erottuu pimeänä alueena, jonka ympärillä valot piirtävät kaupungin ja sen esikaupunkien, kuten San Josen ja Oaklandin, ääriviivat näkyviin. Lahden yli kulkevat siltayhteydet erottuvat valojuovina veden yllä. Kuva otettu keskiyön aikaan ISS:ltä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0285002/iss073e0285002~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0285002/iss073e0285002~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0285002"
      }
    ]
  },
  {
    "tunnus": "chicago",
    "nimi": "Chicago",
    "seutu": "Yhdysvallat",
    "selite": "Yhdysvaltain Keskilännen suurkaupunki Michiganjärven rannalla, pilvenpiirtäjien syntypaikka.",
    "lat": 41.882,
    "lon": -87.628,
    "oletus": "iss073e0080182",
    "havainnot": [
      {
        "id": "iss073e0080182",
        "aika": "2025-05-15",
        "teksti": "Chicago erottuu kuvassa kirkkaana valoruudukkona Michiganjärven eteläkärjessä, ja järven pimeä pinta rajaa kaupungin selvästi idässä. Kaupungin ydin pistää esiin ympäröivästä esikaupunkialueesta kirkkaimpana valopilkkuna. Kuva otettu yöllä ISS:ltä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0080182/iss073e0080182~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0080182/iss073e0080182~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0080182"
      }
    ]
  },
  {
    "tunnus": "mexico",
    "nimi": "Mexico City",
    "seutu": "Meksiko",
    "selite": "Meksikon pääkaupunki entisen järven pohjalla korkealla vuoristolaaksossa, joka vaipuu vuosi vuodelta.",
    "lat": 19.411,
    "lon": -99.131,
    "oletus": "iss073e0075943",
    "havainnot": [
      {
        "id": "iss073e0075943",
        "aika": "2025-05-16",
        "teksti": "Mexico City loistaa yöllä kirkkaana Meksikon laakson pohjalla. Kaupungin valot täyttävät koko altaan, ja niitä reunustavat tummat, valottomat alueet: Texcocon ja Tláhuac-Xicon luonnonsuojelualueet sekä Ajuscon kansallispuiston vuoret. Kuva otettiin Kansainväliseltä avaruusasemalta.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0075943/iss073e0075943~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0075943/iss073e0075943~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0075943"
      }
    ]
  },
  {
    "tunnus": "kapkaupunki",
    "nimi": "Kapkaupunki",
    "seutu": "Etelä-Afrikka",
    "selite": "Etelä-Afrikan lainsäädäntöpääkaupunki mantereen lounaiskärjessä, Kapniemen vuorten juurella.",
    "lat": -33.925,
    "lon": 18.425,
    "oletus": "iss064e038871",
    "havainnot": [
      {
        "id": "iss064e038871",
        "aika": "2021-02-28",
        "teksti": "Kapkaupunki ja sen ympäröivä rannikko näkyvät päivänvalossa Etelä-Afrikan kärjessä, auringon kimmellyksen loistaessa Atlantin pinnalla. Kaupungin katuverkko erottuu vaaleana, tiiviisti rakennettuna alueena rannikon tuntumassa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 64",
        "kuvaaja": null,
        "mitat": [
          1920,
          1364
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss064e038871/iss064e038871~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss064e038871/iss064e038871~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss064e038871"
      }
    ]
  },
  {
    "tunnus": "mumbai",
    "nimi": "Mumbai",
    "seutu": "Intia",
    "selite": "Intian talouselämän keskus, rakennettu alun perin seitsemälle erilliselle saarelle Arabianmeren rannalla.",
    "lat": 18.975,
    "lon": 72.826,
    "oletus": "iss014e08744",
    "havainnot": [
      {
        "id": "iss014e08744",
        "aika": "2006-11-28",
        "teksti": "Mumbain satama ja kaupunkialue täyttävät kapean Salsette-niemekkeen Arabianmeren rannalla. Rakennettu alue jatkuu yhtenäisenä noin 50 kilometrin matkan pohjoisesta etelään, ja kuvassa erottuvat myös rannikon pienet niemet ja lahdet.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 14",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss014e08744/iss014e08744~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss014e08744/iss014e08744~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss014e08744"
      }
    ]
  },
  {
    "tunnus": "delhi",
    "nimi": "Delhi",
    "seutu": "Intia",
    "selite": "Intian pääkaupunkialue, maailman toiseksi suurin metropolialue Himalajan eteläpuolella.",
    "lat": 28.61,
    "lon": 77.23,
    "oletus": "iss072e757452",
    "havainnot": [
      {
        "id": "iss072e757452",
        "aika": "2025-03-06",
        "teksti": "Delhin valot loistavat kirkkaina lähellä puolta yötä paikallista aikaa, Himalajan reunan tuntumassa. Kaupungin tiivis valoverkko peittää laajan alueen tasaisella tasangolla, ja valojen tiheys vaihtelee vanhan ja uuden kaupunginosan välillä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 72",
        "kuvaaja": "Don Pettit",
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss072e757452/iss072e757452~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss072e757452/iss072e757452~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss072e757452"
      }
    ]
  },
  {
    "tunnus": "bangkok",
    "nimi": "Bangkok",
    "seutu": "Thaimaa",
    "selite": "Thaimaan pääkaupunki, jonka Chao Phraya -joki jakaa kahtia matkalla Siaminlahteen.",
    "lat": 13.75,
    "lon": 100.517,
    "oletus": "iss072e757257",
    "havainnot": [
      {
        "id": "iss072e757257",
        "aika": "2025-03-05",
        "teksti": "Bangkok jakautuu selvästi kahtia Chao Phraya -joen ympärille, joka erottuu kuvassa mustana nauhana kaupungin valojen keskellä. Kuvan keskioikealla erottuu tumma, vähemmän valaistu Bang Krachaon viheralue joen mutkassa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 72",
        "kuvaaja": "Don Pettit",
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss072e757257/iss072e757257~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss072e757257/iss072e757257~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss072e757257"
      }
    ]
  },
  {
    "tunnus": "jakarta",
    "nimi": "Jakarta",
    "seutu": "Indonesia",
    "selite": "Indonesian pääkaupunki, joka vajoaa nopeasti ja jota siksi korvaamaan rakennetaan uutta pääkaupunkia.",
    "lat": -6.21,
    "lon": 106.845,
    "oletus": "iss030e015896",
    "havainnot": [
      {
        "id": "iss030e015896",
        "aika": "2011-12-25",
        "teksti": "Kuva on otettu infrapunakameralla, joten Jakartan kaupunkialue hohtaa oranssinpunaisena rannikolla. Tiivis, verkkomainen kaupunkirakenne erottuu selvästi ympäröivästä pimeästä merestä ja harvaan asutusta maaseudusta.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 30",
        "kuvaaja": null,
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss030e015896/iss030e015896~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss030e015896/iss030e015896~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss030e015896"
      }
    ]
  },
  {
    "tunnus": "shanghai",
    "nimi": "Shanghai",
    "seutu": "Kiina",
    "selite": "Kiinan väkirikkain kaupunki Jangtse-joen suulla, jonka rannikko värjäytyy joen liejusta.",
    "lat": 31.224,
    "lon": 121.476,
    "oletus": "iss073e0513927",
    "havainnot": [
      {
        "id": "iss073e0513927",
        "aika": "2025-08-22",
        "teksti": "Kuva näyttää Shanghain kaupunkialueen päiväsaikaan Jangtse-joen suulla Itä-Kiinan meren rannalla. Ylälaidassa erottuu Pudongin kansainvälisen lentokentän kiitoradat, ja kuvan oikealla puolella näkyy pyöreä Dishui-järvi, Kiinan suurin tekoallas. Mereen laskeva sedimenttipitoinen vesi näkyy vaaleanruskeana rannikon tuntumassa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1078
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0513927/iss073e0513927~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0513927/iss073e0513927~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0513927"
      }
    ]
  },
  {
    "tunnus": "wien",
    "nimi": "Wien",
    "seutu": "Itävalta",
    "selite": "Itävallan pääkaupunki Tonavan rannalla, jonka tiivis keskusta erottuu selvästi yöllä avaruudesta.",
    "lat": 48.208,
    "lon": 16.373,
    "oletus": "iss064e005231",
    "havainnot": [
      {
        "id": "iss064e005231",
        "aika": "2020-11-21",
        "teksti": "Kuva näyttää Wienin yöllä avaruusasemalta kuvattuna, katuvalot piirtävät kaupungin tiheän verkkomaisen rakenteen selvästi näkyviin. Tonava-joki erottuu kuvan keskellä pimeänä, valottomana nauhana, joka halkoo valaistua kaupunkialuetta.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 64",
        "kuvaaja": "VIV",
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss064e005231/iss064e005231~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss064e005231/iss064e005231~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss064e005231"
      }
    ]
  },
  {
    "tunnus": "soul",
    "nimi": "Soul",
    "seutu": "Etelä-Korea",
    "selite": "Etelä-Korean pääkaupunki, jonka Han-joki jakaa kaupungin kahtia niemimaan keskiosassa.",
    "lat": 37.567,
    "lon": 126.978,
    "oletus": "iss072e757318",
    "havainnot": [
      {
        "id": "iss072e757318",
        "aika": "2025-03-05",
        "teksti": "Kuva näyttää Soulin yöllä, kaupungin tiheä valoverkko peittää laajan alueen Korean niemimaan keskiosassa. Han-joki kulkee kuvan poikki pimeänä nauhana ja jakaa kaupungin selvästi kahteen osaan. Kuva paljastaa myös kaupungin ympärille leviävän esikaupunkialueen tiiviin tieverkoston.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 72",
        "kuvaaja": "Don Pettit",
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss072e757318/iss072e757318~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss072e757318/iss072e757318~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss072e757318"
      }
    ]
  },
  {
    "tunnus": "kilimanjaro",
    "nimi": "Kilimanjaro",
    "seutu": "Tansania",
    "selite": "Afrikan korkein vuori, jonka huipun jää on kutistunut 85 prosenttia sadan vuoden aikana.",
    "lat": -3.07,
    "lon": 37.35,
    "oletus": "iss014e18950",
    "havainnot": [
      {
        "id": "iss014e18950",
        "aika": "2007-04-03",
        "teksti": "Kraatterin reuna suoraan ylhäältä kuvattuna. Lumi ja jää peittävät enää osan Kibon huipusta, ja tumma kivikko pilkistää esiin rengasmaisen jäätikön keskeltä. Vuoren jää oli vuonna 1912 vielä 11,4 neliökilometrin kokoinen korkki; tässä kuvassa siitä on jäljellä hajanaisia läiskiä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 14",
        "kuvaaja": null,
        "mitat": [
          1920,
          1271
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss014e18950/iss014e18950~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss014e18950/iss014e18950~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss014e18950"
      },
      {
        "id": "iss056e098062",
        "aika": "2018-07-22",
        "teksti": "Sama vuori yksitoista vuotta myöhemmin, pilvirenkaan ympäröimänä kuin silmä. Lumihuippu erottuu tumman rinteen keskeltä pienenä valkoisena kolmiona. Kenian raja jää kuvan taakse pohjoiseen, ja Kilimanjaro nousee tasangosta ilman yhtäkään vieressään kilpailevaa huippua.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 56",
        "kuvaaja": "Alexander Gerst",
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss056e098062/iss056e098062~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss056e098062/iss056e098062~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss056e098062"
      }
    ]
  },
  {
    "tunnus": "victorianputous",
    "nimi": "Victorianputous",
    "seutu": "Sambia ja Zimbabwe",
    "selite": "Maailman suurin yhtenäinen putoavan veden verho, 1708 metriä leveä.",
    "lat": -17.92,
    "lon": 25.86,
    "oletus": "iss007e14361",
    "havainnot": [
      {
        "id": "iss007e14361",
        "aika": "2003-09-03",
        "teksti": "Putous näkyy ohuena valkoisena raitana Zambezi-joen poikki, ja sen alapuolella joki jatkaa matkaansa terävinä sik-sakkeina — samoja basalttirotkoja, jotka putous on kaivertanut itselleen perääntyessään vuosituhansien varrella. Victoria Falls -kaupunki näkyy oikealla partaalla.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 7",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss007e14361/iss007e14361~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss007e14361/iss007e14361~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss007e14361"
      }
    ]
  },
  {
    "tunnus": "iso-valliriutta",
    "nimi": "Iso valliriutta",
    "seutu": "Queensland, Australia",
    "selite": "Maailman suurin koralliriuttajärjestelmä, yli 2300 kilometrin matkalla.",
    "lat": -16.5,
    "lon": 145.7,
    "oletus": "iss068e004262",
    "havainnot": [
      {
        "id": "iss068e004262",
        "aika": "2022-09-30",
        "teksti": "Queenslandin rannikko oikealla, ja sen edustalla riuttojen laikukas turkoosi vyöhyke jatkuu kuvan reunalle asti. Jokainen vaaleampi laikku on oma matala riuttansa, jonka ympärillä syvempi vesi tummuu siniseksi — tässä kuvassa näkyy vain murto-osa yli 2900 erillisestä riutasta.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 68",
        "kuvaaja": null,
        "mitat": [
          1920,
          1078
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss068e004262/iss068e004262~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss068e004262/iss068e004262~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss068e004262"
      }
    ]
  },
  {
    "tunnus": "kata-tjuta",
    "nimi": "Kata Tjuta",
    "seutu": "Pohjoisterritorio, Australia",
    "selite": "Kolmisenkymmentä punaista kivikupolia aution tasangon keskellä, Uluru-Kata Tjuta -kansallispuistossa.",
    "lat": -25.31,
    "lon": 130.74,
    "oletus": "iss023e029806",
    "havainnot": [
      {
        "id": "iss023e029806",
        "aika": "2010-04-30",
        "teksti": "Iltapäivän valo korostaa Kata Tjutan pyöristyneitä kivikupoleja, joiden väliin varjot piirtävät syviä rakoja. Korkein kupoli, Mount Olga, on 206 metriä naapuriaan Ulurua korkeampi, vaikka Uluru on niistä kahdesta kuuluisampi. Vihreä kasvillisuus seuraa kuivia puronuomia alaosassa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 23",
        "kuvaaja": "Soichi Noguchi",
        "mitat": [
          1920,
          1314
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss023e029806/iss023e029806~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss023e029806/iss023e029806~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss023e029806"
      }
    ]
  },
  {
    "tunnus": "kuollutmeri",
    "nimi": "Kuollut meri",
    "seutu": "Israel, Jordania ja Länsiranta",
    "selite": "Maapallon matalin kohta merenpinnasta, ja järvi joka kutistuu vuosi vuodelta.",
    "lat": 31.4,
    "lon": 35.5,
    "oletus": "iss062e078990",
    "havainnot": [
      {
        "id": "iss062e078990",
        "aika": "2020-03-04",
        "teksti": "Meren eteläpää, jossa luonnollinen sininen vesi (vasen) vaihtuu geometrisiksi haihdutusaltaiksi (oikea): niissä auringossa haihdutetaan suolavettä potaskaksi. Altaiden vihertävä ja vaaleanpunainen sävy syntyy eri suolapitoisuuksista.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 62",
        "kuvaaja": "Drew Morgan",
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss062e078990/iss062e078990~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss062e078990/iss062e078990~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss062e078990"
      },
      {
        "id": "iss073e0425936",
        "aika": "2025-08-07",
        "teksti": "Laajempi näkymä samalta seudulta: Galileanjärvi (vasemmalla) ja Kuollut meri (oikealla) yhdistää Jordan-joki, ohut tumma viiva kuvan keskellä. Galileanjärvi on maailman matalin makeanveden järvi, Kuollut meri matalin suolajärvi — molemmat samassa hautavajoamassa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0425936/iss073e0425936~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0425936/iss073e0425936~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0425936"
      }
    ]
  },
  {
    "tunnus": "tsadjarvi",
    "nimi": "Tšadjärvi",
    "seutu": "Tšad, Niger, Nigeria ja Kamerun",
    "selite": "Järvi, joka on kutistunut noin 90 prosenttia 1960-luvulta.",
    "lat": 13.15,
    "lon": 14.3,
    "oletus": "iss037e015757",
    "havainnot": [
      {
        "id": "iss037e015757",
        "aika": "2013-10-17",
        "teksti": "Auringon heijastus vedestä paljastaa matalan, pirstoutuneen järven ääriviivat paremmin kuin suora kuva pystyisi. 1960-luvulla järvi peitti 25 000 neliökilometriä; nyt siitä on jäljellä enää murto-osa, ja vesi on hajonnut saarekkeiden ja ruovikon verkoksi.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 37",
        "kuvaaja": "Karen Nyberg",
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss037e015757/iss037e015757~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss037e015757/iss037e015757~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss037e015757"
      }
    ]
  },
  {
    "tunnus": "fitrijarvi",
    "nimi": "Fitrijärvi",
    "seutu": "Tšad",
    "selite": "Umpijärvi keskellä Saheliä, josta ei lähde ainuttakaan jokea mereen.",
    "lat": 12.83,
    "lon": 17.43,
    "oletus": "iss030e059398",
    "havainnot": [
      {
        "id": "iss030e059398",
        "aika": "2012-01-19",
        "teksti": "Mutainen keltaruskea vesi täyttää autiomaan painanteen keskeltä, ja sen ympärillä tummempi rengas on paljastunut, palaneen kasvillisuuden peittämä järvenpohja. Kaikki Fitrijärveen tuleva vesi joko haihtuu tai imeytyy hiekkaan — mereen ei johda yksikään puro.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 30",
        "kuvaaja": null,
        "mitat": [
          1920,
          1275
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss030e059398/iss030e059398~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss030e059398/iss030e059398~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss030e059398"
      }
    ]
  },
  {
    "tunnus": "dardanellit",
    "nimi": "Dardanellit",
    "seutu": "Turkki",
    "selite": "Kapea salmi, joka yhdistää Egeanmeren Marmarameren kautta Mustallemerelle.",
    "lat": 40.14,
    "lon": 26.4,
    "oletus": "iss014e08138",
    "havainnot": [
      {
        "id": "iss002e7758",
        "aika": "2001-06-28",
        "teksti": "Laajempi näkymä samalta salmelta viisi vuotta aiemmin: Gelibolun niemimaa työntyy alas vasemmalla, Egeanmeren saaria pilkottaa oikealla, ja avaruuden musta reuna kaartuu ylhäällä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 2",
        "kuvaaja": null,
        "mitat": [
          1920,
          1312
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss002e7758/iss002e7758~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss002e7758/iss002e7758~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss002e7758"
      },
      {
        "id": "iss014e08138",
        "aika": "2006-11-09",
        "teksti": "Gallipolin kaupunki kuvan keskellä salmen suulla. Vesi virtaa yhtä aikaa koilliseen ja lounaaseen, sillä pinta- ja pohjavirtaus kulkevat vastakkaisiin suuntiin, ja muutama laiva näkyy tummina pilkkuina salmessa kaupungin lounaispuolella.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 14",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss014e08138/iss014e08138~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss014e08138/iss014e08138~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss014e08138"
      }
    ]
  },
  {
    "tunnus": "okavango",
    "nimi": "Okavango-suisto",
    "seutu": "Botswana",
    "selite": "Joki joka ei koskaan tavoita merta vaan haihtuu aavikon keskellä viuhkamaiseksi kosteikoksi.",
    "lat": -19.28,
    "lon": 22.97,
    "oletus": "iss073e0604445",
    "havainnot": [
      {
        "id": "iss040e008209",
        "aika": "2014-06-05",
        "teksti": "Auringon heijastus vedestä muuttaa suiston yhdeksi kirkkaaksi hopeajuovaksi tummaa maata vasten — tekniikka, jolla miehistö saa esiin veden hienoimmatkin yksityiskohdat. Aseman oma aurinkopaneeli reunustaa kuvan oikeaa laitaa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 40",
        "kuvaaja": "Reid Wiseman",
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss040e008209/iss040e008209~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss040e008209/iss040e008209~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss040e008209"
      },
      {
        "id": "iss073e0604445",
        "aika": "2025-08-30",
        "teksti": "Angolasta virtaava Okavango-joki haarautuu Kalaharin hiekalle lukemattomiksi tummiksi suoniksi vaaleaa hiekkaa vasten, kuin puun juuristo. Vesi ei koskaan saavuta merta: se haihtuu ja imeytyy kokonaan, ja suisto ylläpitää yhtä Afrikan lajirikkaimmista ekosysteemeistä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1078
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0604445/iss073e0604445~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0604445/iss073e0604445~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0604445"
      }
    ]
  },
  {
    "tunnus": "kolmen-rotkon-pato",
    "nimi": "Kolmen rotkon pato",
    "seutu": "Kiina",
    "selite": "Maailman suurin pato, jonka tekojärvi on yli 600 kilometriä pitkä.",
    "lat": 30.82,
    "lon": 111,
    "oletus": "iss019e007720",
    "havainnot": [
      {
        "id": "iss019e007720",
        "aika": "2009-04-15",
        "teksti": "Pato näkyy vasemmassa reunassa kapeana valkoisena viivana joen poikki, ja sen takana Jangtse-joki on juuri alkanut täyttää laaksoaan uudeksi, kapeaksi tekojärveksi — kuva on yksi ensimmäisistä, jotka tallensivat täyttymisen vuonna 2009. Vuoristoinen maasto selittää altaan mutkittelun.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 19",
        "kuvaaja": null,
        "mitat": [
          1920,
          1311
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss019e007720/iss019e007720~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss019e007720/iss019e007720~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss019e007720"
      }
    ]
  },
  {
    "tunnus": "vesuvius",
    "nimi": "Vesuvius",
    "seutu": "Italia",
    "selite": "Tulivuori joka tuhosi Pompejin vuonna 79, ja asuu nyt kolmen miljoonan ihmisen naapurina.",
    "lat": 40.82,
    "lon": 14.43,
    "oletus": "iss067e010622",
    "havainnot": [
      {
        "id": "iss061e006435",
        "aika": "2019-10-15",
        "teksti": "Naapurikaupunki Pompeiji jää kuvassa vuoren juurelle: se hautautui tuhkaan vuonna 79 purkauksessa, joka tappoi tuhansia. Kolme miljoonaa ihmistä asuu nykyään alueella, jonka Vesuvius voisi vielä joskus haudata uudelleen.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 61",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss061e006435/iss061e006435~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss061e006435/iss061e006435~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss061e006435"
      },
      {
        "id": "iss067e010622",
        "aika": "2022-04-12",
        "teksti": "Vesuviuksen pyöreä kraatteri erottuu Napolinlahden rannalla, ja kaupunki on levittäytynyt aivan rinteille asti. Capri ja Ischia näkyvät saarina lahden suulla. Vuori purkautui viimeksi 1944, mutta se on yhä yksi maailman tarkimmin valvotuista tulivuorista.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 67",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss067e010622/iss067e010622~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss067e010622/iss067e010622~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss067e010622"
      }
    ]
  },
  {
    "tunnus": "ounianga",
    "nimi": "Ouniangan järvet",
    "seutu": "Tšad",
    "selite": "Kymmenen makean veden järveä keskellä Saharaa, jäänteinä muinaisesta suurjärvestä.",
    "lat": 19.05,
    "lon": 20.49,
    "oletus": "iss021e026475",
    "havainnot": [
      {
        "id": "iss021e026475",
        "aika": "2009-11-14",
        "teksti": "Oranssit hiekkadyynit ovat tunkeutuneet järven poikki ja pilkkoneet sen tummiksi kaistaleiksi, jotka näyttävät puun oksilta. Järvet ovat jäänteitä yhdestä isosta järvestä, joka peitti alueen 14 800–5 500 vuotta sitten kun Sahara oli vihreä; nyt pohjavesi pitää ne täynnä keskellä autiomaata.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 21",
        "kuvaaja": "Jeffrey Williams",
        "mitat": [
          1920,
          1311
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss021e026475/iss021e026475~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss021e026475/iss021e026475~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss021e026475"
      }
    ]
  },
  {
    "tunnus": "sokotra",
    "nimi": "Sokotra",
    "seutu": "Jemen",
    "selite": "Saari niin eristyksissä, että 37 prosenttia sen kasveista ei kasva missään muualla.",
    "lat": 12.46,
    "lon": 53.82,
    "oletus": "iss069e004768",
    "havainnot": [
      {
        "id": "iss069e004768",
        "aika": "2023-04-20",
        "teksti": "Sokotran eteläisen rannikon vuoristo laskeutuu jyrkkinä laaksoina turkoosiin mereen. Saari erosi mantereesta miljoonia vuosia sitten ja on siksi oma evoluution laboratorionsa: sen sateenvarjonmuotoiset lohikäärmeenveripuut eivät kasva luonnossa missään muualla maailmassa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 69",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss069e004768/iss069e004768~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss069e004768/iss069e004768~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss069e004768"
      }
    ]
  },
  {
    "tunnus": "titicaca",
    "nimi": "Titicaca-järvi",
    "seutu": "Peru ja Bolivia",
    "selite": "Maailman korkeimmalla sijaitseva suuri purjehduskelpoinen järvi, Andien huipuilla.",
    "lat": -15.78,
    "lon": -69.34,
    "oletus": "iss055e071030",
    "havainnot": [
      {
        "id": "iss055e071030",
        "aika": "2018-05-14",
        "teksti": "Järvi täyttää Andien ylätasangon painanteen, ja sen luoteisreunaa vasten kohoavat lumihuippuiset vuoret. Järvi sijaitsee noin 3812 metrin korkeudessa ja jakautuu Perun ja Bolivian kesken rajaviivaa pitkin keskeltä vettä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 55",
        "kuvaaja": "Ricky Arnold",
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss055e071030/iss055e071030~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss055e071030/iss055e071030~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss055e071030"
      },
      {
        "id": "iss067e149915",
        "aika": "2022-06-26",
        "teksti": "Lähempi kuva samasta järvestä: auringon kimallus vedessä piirtää vaaleita raitoja, jotka paljastavat pintavirtausten suunnan. Niemet ja lahdet erottuvat terävinä rantaviivoina — järvi on niin suuri, että sen tuulet ja aallot muistuttavat merta.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 67",
        "kuvaaja": null,
        "mitat": [
          1920,
          1078
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss067e149915/iss067e149915~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss067e149915/iss067e149915~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss067e149915"
      }
    ]
  },
  {
    "tunnus": "gizan-pyramidit",
    "nimi": "Gizan pyramidit",
    "seutu": "Egypti",
    "selite": "Muinaisen maailman seitsemästä ihmeestä ainoa, joka on vielä pystyssä.",
    "lat": 29.87,
    "lon": 30.95,
    "oletus": "iss032e009123",
    "havainnot": [
      {
        "id": "iss032e009123",
        "aika": "2012-07-25",
        "teksti": "Kolme pyramidia näkyy tummina kolmiovarjoineen aivan siinä kohtaa, missä Kairon tiheä kaupunkikudos loppuu ja aavikko alkaa — raja on käytännössä suora viiva. Suurin pyramideista, 146,6 metriä valmistuessaan noin 2560 eaa., oli maailman korkein rakennelma yli 3700 vuotta.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 32",
        "kuvaaja": "                                ",
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss032e009123/iss032e009123~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss032e009123/iss032e009123~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss032e009123"
      },
      {
        "id": "iss068e006657",
        "aika": "2022-10-01",
        "teksti": "Laajempi näkymä kymmenen vuotta myöhemmin: pyramidit näkyvät pieninä kolmioina kuvan yläosassa, ja alhaalla Niilin vihreä laakso ja joki itse leikkaavat aavikon halki. Kaupunki on levinnyt entistä lähemmäs pyramideja.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 68",
        "kuvaaja": "Bob Hines",
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss068e006657/iss068e006657~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss068e006657/iss068e006657~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss068e006657"
      }
    ]
  },
  {
    "tunnus": "tshernobyl",
    "nimi": "Tšernobyl",
    "seutu": "Ukraina",
    "selite": "Ydinvoimala, jonka ympärille jäi kielletty vyöhyke vuoden 1986 onnettomuuden jälkeen.",
    "lat": 51.39,
    "lon": 30.1,
    "oletus": "iss057e051419",
    "havainnot": [
      {
        "id": "iss057e051419",
        "aika": "2018-10-14",
        "teksti": "Voimalan rakennukset ja niitä ympäröivät jäähdytysaltaat erottuvat Pripjat-joen mutkassa. Räjähtäneen neljännen reaktorin päälle rakennettu uusi teräskaari näkyy vaaleana suorakulmiona. Rajan taakse Valko-Venäjälle perustettiin oma suojelualueensa säteilylle altistuneelle alueelle — luonto on vallannut molemmat puolet takaisin ihmisen lähdettyä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 57",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss057e051419/iss057e051419~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss057e051419/iss057e051419~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss057e051419"
      }
    ]
  },
  {
    "tunnus": "everest",
    "nimi": "Mount Everest",
    "seutu": "Nepal ja Kiina",
    "selite": "Maapallon korkein kohta merenpinnasta, 8849 metriä.",
    "lat": 27.99,
    "lon": 86.93,
    "oletus": "iss069e003192",
    "havainnot": [
      {
        "id": "iss069e003192",
        "aika": "2023-04-13",
        "teksti": "Terävät lumihuiput työntyvät pilvimeren yläpuolelle Nepalin puolella Himalajaa, Everest kuvan keskellä muiden jättiläisten joukossa. Pilvet kasautuvat vuorten eteläpuolelle, koska kostea ilma nousee ja jäähtyy törmätessään Himalajan seinämään.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 69",
        "kuvaaja": null,
        "mitat": [
          1920,
          1078
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss069e003192/iss069e003192~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss069e003192/iss069e003192~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss069e003192"
      }
    ]
  },
  {
    "tunnus": "aletsch",
    "nimi": "Aletschin jäätikkö",
    "seutu": "Sveitsi",
    "selite": "Alppien pisin jäätikkö, 23 kilometriä, joka virtaa kolmen tunnetun huipun juurelta.",
    "lat": 46.43,
    "lon": 8.02,
    "oletus": "iss013e77377",
    "havainnot": [
      {
        "id": "iss013e77377",
        "aika": "2006-09-05",
        "teksti": "Jäätikkö mutkittelee laaksossa Jungfrau-, Mönch- ja Eiger-huippujen juurelta alaspäin, ja sen keskellä kulkevat tummat raidat ovat moreeneja: kolmen erillisen jäävirran mukanaan tuomaa kivi- ja soraröykkiötä, joka on puristunut yhteen jäätiköiden sulautuessa. Kuvan yläreunassa siintää Brienzinjärvi.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 13",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss013e77377/iss013e77377~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss013e77377/iss013e77377~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss013e77377"
      }
    ]
  },
  {
    "tunnus": "torres-del-paine",
    "nimi": "Torres del Paine",
    "seutu": "Chile",
    "selite": "Patagonian graniittitornit ja niitä ympäröivät jäätiköt, jotka kalvavat vuosi vuodelta.",
    "lat": -50.95,
    "lon": -73.03,
    "oletus": "iss056e096830",
    "havainnot": [
      {
        "id": "iss016e012047",
        "aika": "2007-11-22",
        "teksti": "Tyndall-jäätikkö yksitoista vuotta aiemmin: 32 kilometriä pitkä jäävirta, jonka keskellä näkyy tumma moreeniviiva ja lähempänä reunaa rikkonaisia railokenttiä — kohtia, joissa jää halkeilee virratessaan kallionkielekkeen ohi.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 16",
        "kuvaaja": null,
        "mitat": [
          1920,
          1271
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss016e012047/iss016e012047~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss016e012047/iss016e012047~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss016e012047"
      },
      {
        "id": "iss056e096830",
        "aika": "2018-07-15",
        "teksti": "Jäätikkö päättyy jyrkkään, siniseen jäärintamaan järveen, joka on täynnä juuri irronneita jäälohkareita. Ympärillä jyrkät vuoret kohoavat suoraan jäästä — koko kansallispuisto on graniittihuippujen ja jään yhteispeliä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 56",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss056e096830/iss056e096830~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss056e096830/iss056e096830~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss056e096830"
      }
    ]
  },
  {
    "tunnus": "kilauea",
    "nimi": "Kilauea",
    "seutu": "Havaiji, Yhdysvallat",
    "selite": "Yksi maailman aktiivisimmista tulivuorista, joka muokkaa Ison saaren rantaviivaa yhä uudelleen.",
    "lat": 19.42,
    "lon": -155.29,
    "oletus": "iss055e070297",
    "havainnot": [
      {
        "id": "iss055e070297",
        "aika": "2018-05-12",
        "teksti": "Vaalea tuhka- ja kaasupilvi valuu Ison saaren itärannikolta merelle päin — tämä on toukokuussa 2018 alkaneen purkauksen alkuvaiheita, jolloin laava tuhosi yli 700 kotia ja loi saarelle kokonaan uutta rantaviivaa. Vuoren rinteet näkyvät tummina laavavirtojen uurtamina.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 55",
        "kuvaaja": "Ricky Arnold",
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss055e070297/iss055e070297~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss055e070297/iss055e070297~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss055e070297"
      }
    ]
  },
  {
    "tunnus": "ararat",
    "nimi": "Ararat",
    "seutu": "Turkki",
    "selite": "Turkin korkein vuori, kaksoishuippu joka näkyy kolmen maan rajaseudulta.",
    "lat": 39.7,
    "lon": 44.3,
    "oletus": "iss064e029480",
    "havainnot": [
      {
        "id": "iss064e029480",
        "aika": "2021-02-06",
        "teksti": "Vinosta kuvakulmasta otettu näkymä paljastaa Araratin kaksi huippua selvästi: suurempi, 5137-metrinen Suur-Ararat etualalla ja pienempi kartiomainen Pikku-Ararat sen takana. Lumi peittää molemmat huiput kokonaan, ja rinteiltä laskeutuvat tummat laavavirrat erottuvat terävinä juovina lumen alta.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 64",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss064e029480/iss064e029480~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss064e029480/iss064e029480~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss064e029480"
      }
    ]
  },
  {
    "tunnus": "crater-lake",
    "nimi": "Crater Lake",
    "seutu": "Oregon, Yhdysvallat",
    "selite": "Yhdysvaltain syvin järvi, 592 metriä, syntynyt kun tulivuori romahti sisäänpäin.",
    "lat": 42.94,
    "lon": -122.11,
    "oletus": "iss013e54243",
    "havainnot": [
      {
        "id": "iss013e54243",
        "aika": "2006-07-19",
        "teksti": "Poikkeuksellisen syvänsininen järvi täyttää pyöreän kalderan, joka syntyi kun Mount Mazama -tulivuori räjähti ja romahti noin 7700 vuotta sitten. Wizard Island, pieni tulivuorikartio järven sisällä, näkyy tummana pilkkuna eteläreunan lähellä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 13",
        "kuvaaja": null,
        "mitat": [
          1920,
          1271
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss013e54243/iss013e54243~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss013e54243/iss013e54243~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss013e54243"
      },
      {
        "id": "iss062e152575",
        "aika": "2020-03-05",
        "teksti": "Sama kaldera talvella, lähes 14 vuotta myöhemmin: lumi peittää kraatterin reunat kauttaaltaan, mutta järven pinta pysyy sulana ja yhtä tummansinisenä kuin kesällä. Wizard Island erottuu nyt valkoisena lumihuippuna tumman veden keskeltä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 62",
        "kuvaaja": "Roscosmos",
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss062e152575/iss062e152575~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss062e152575/iss062e152575~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss062e152575"
      }
    ]
  },
  {
    "tunnus": "upsala-jaatikko",
    "nimi": "Upsalan jäätikkö",
    "seutu": "Patagonia, Argentiina",
    "selite": "Etelä-Patagonian jäätikköalueen kolmanneksi suurin jäätikkö, joka on vetäytynyt nopeasti.",
    "lat": -49.88,
    "lon": -73.3,
    "oletus": "iss021e015243",
    "havainnot": [
      {
        "id": "iss021e015243",
        "aika": "2009-10-25",
        "teksti": "Upsala-jäätikön pää työntyy Argentino-järveen lokakuussa 2009. Reunasta irtoaa jäävuoria järveen — kaksi niistä kuljettaa mukanaan tummaa moreeniainesta, joka näkyy tummana raitana jään pinnalla. Vasemmalla oleva sininen järvi on jäätikön kuluttaman kallion ympäröimä, kirkkaampi kuin sameampi pääjärvi.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 21",
        "kuvaaja": null,
        "mitat": [
          1920,
          1311
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss021e015243/iss021e015243~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss021e015243/iss021e015243~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss021e015243"
      },
      {
        "id": "iss037e005104",
        "aika": "2013-09-30",
        "teksti": "Sama jäätikön pää neljä vuotta myöhemmin, lokakuussa 2013. Jään reuna on vetäytynyt keskimäärin 3,6 kilometriä vuodesta 2002, ja järven pinta on tuoreen jäänmurtuman jäljiltä valkoisen jäämurskan peitossa; suuremmat jäävuoret näkyvät valkoisina pilkkuina oikealla. Tutkijoiden mukaan vetäytyminen kertoo alueen ilmaston lämpenemisestä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 37",
        "kuvaaja": null,
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss037e005104/iss037e005104~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss037e005104/iss037e005104~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss037e005104"
      }
    ]
  },
  {
    "tunnus": "poopojarvi",
    "nimi": "Poopó-järvi",
    "seutu": "Oruro, Bolivia",
    "selite": "Andien korkealla ylängöllä oleva matala suolajärvi, joka on kuivunut toistuvasti lähes kokonaan.",
    "lat": -18.75,
    "lon": -67.13,
    "oletus": "iss012e06469",
    "havainnot": [
      {
        "id": "iss012e06469",
        "aika": "2005-11-03",
        "teksti": "Poopó-järvi marraskuussa 2005, vielä vihertävän veden peittämänä ja valkoisen suolareunuksen kehystämänä. Järvi on niin matala — yleensä alle kolme metriä — että pienetkin sademäärän muutokset ylä-Andeilla näkyvät suoraan sen pinta-alassa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 12",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss012e06469/iss012e06469~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss012e06469/iss012e06469~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss012e06469"
      },
      {
        "id": "iss070e098385",
        "aika": "2024-02-23",
        "teksti": "Sama järvi helmikuussa 2024, lähes täysin kuivana. Punaiset ja oranssinruskeat sävyt ovat paljastunutta suolaista ja mineraalipitoista pohjaa, ja vain muutama tumma vesiallas on enää jäljellä. Kaivostoiminta ja kastelu ovat vieneet vettä syöttöjoista.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 70",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss070e098385/iss070e098385~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss070e098385/iss070e098385~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss070e098385"
      }
    ]
  },
  {
    "tunnus": "etosha",
    "nimi": "Etosha-tasanko",
    "seutu": "Namibia",
    "selite": "Suunnaton, yleensä täysin kuiva suolatasanko, joka värjäytyy harvinaisina sadevuosina levien mukaan.",
    "lat": -18.6,
    "lon": 16,
    "oletus": "iss030e234965",
    "havainnot": [
      {
        "id": "iss011e09504",
        "aika": "2005-06-24",
        "teksti": "Sama seutu lähempää: pinkki ja vaaleanvihreä lampi pistävät esiin valkoisen suolakuoren keskeltä. Värin tekevät suolaa sietävät mikrolevät, joiden sävy vaihtelee veden lämpötilan ja suolaisuuden mukaan. Tasanko on 120 kilometriä pitkä ja Namibian suurimman eläinpuiston sydän.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 11",
        "kuvaaja": null,
        "mitat": [
          1920,
          1271
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss011e09504/iss011e09504~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss011e09504/iss011e09504~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss011e09504"
      },
      {
        "id": "iss030e234965",
        "aika": "2012-12-30",
        "teksti": "Etosha-tasangon luoteiskulma, jonka valkoinen suolapinta erottuu ruskeasta savannista. Harvinaisen sadejakson jäljiltä Ekuma-joki on tuonut vettä lampeen oikealla, ja levä värjää sen vaaleanvihreäksi; toinen pieni allas hehkuu kirkkaan vihreänä. Yleensä tasanko on täysin kuiva.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 30",
        "kuvaaja": null,
        "mitat": [
          1920,
          1275
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss030e234965/iss030e234965~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss030e234965/iss030e234965~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss030e234965"
      }
    ]
  },
  {
    "tunnus": "eyrejarvi",
    "nimi": "Eyre-järven tulva",
    "seutu": "Etelä-Australia",
    "selite": "Yleensä täysin kuiva järvi, joka harvinaisina vuosina värjäytyy suolaa rakastavien mikrobien mukaan.",
    "lat": -28.9,
    "lon": 137.3,
    "oletus": "iss030e009271",
    "havainnot": [
      {
        "id": "iss030e009271",
        "aika": "2011-12-05",
        "teksti": "Vuoden 2011 poikkeuksellisten sateiden täyttämä Eyre-järvi. Vihreä Belt Bay on syvempää vettä, punainen Madigan Gulf matalampaa ja suolaisempaa — sen mikrobitiheys voi kohota niin suureksi, että solujen karotenoidipigmentti värjää koko lahden. Alareunassa näkyvä lohko on yhä täysin kuiva ja valkoinen suolasta.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 30",
        "kuvaaja": null,
        "mitat": [
          1275,
          1920
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss030e009271/iss030e009271~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss030e009271/iss030e009271~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss030e009271"
      }
    ]
  },
  {
    "tunnus": "sharkbay",
    "nimi": "Shark Bay",
    "seutu": "Länsi-Australia",
    "selite": "Haarautunut aavikkolahti, jossa kasvaa maailman laajin merikaislaniitty ja elää eläviä stromatoliitteja.",
    "lat": -25.75,
    "lon": 113.6,
    "oletus": "iss064e003722",
    "havainnot": [
      {
        "id": "iss057e105411",
        "aika": "2018-11-20",
        "teksti": "Sama rannikko idempää, missä lahti pilkkoutuu saariksi ja matalikoiksi. Vaaleat hiekkasärkät ja tummemmat syvänteet piirtävät lahden pohjan muodon suoraan veden läpi.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 57",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss057e105411/iss057e105411~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss057e105411/iss057e105411~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss057e105411"
      },
      {
        "id": "iss064e003722",
        "aika": "2020-11-07",
        "teksti": "Shark Bayn syvälle Länsi-Australian rannikkoon pistävät turkoosit haarat. Matala vesi on täynnä merikaislaa, ja lahden pohjalla elää myös eläviä stromatoliitteja — kivimäisiä mikrobimattoja, jotka muistuttavat maapallon varhaisimpia elämänmuotoja.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 64",
        "kuvaaja": null,
        "mitat": [
          1078,
          1920
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss064e003722/iss064e003722~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss064e003722/iss064e003722~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss064e003722"
      }
    ]
  },
  {
    "tunnus": "pyramidjarvi",
    "nimi": "Pyramid Lake",
    "seutu": "Nevada, Yhdysvallat",
    "selite": "Jääkautisen jättimäisen Lahontan-järven jäänne aavikon keskellä, nimetty pyramidinmuotoisesta kalkkikivipatsaasta.",
    "lat": 40,
    "lon": -119.58,
    "oletus": "iss073e0919979",
    "havainnot": [
      {
        "id": "iss025e005259",
        "aika": "2010-09-28",
        "teksti": "Sama järvi talvella, jolloin auringon kajastus paljastaa veden pinnalla kaksi suurta pyörrettä — tuulen jättämän jäljen. Ne kertovat pintavirtauksista, jotka muuttavat paikallisesti sitä, kuinka paljon valoa vesi heijastaa takaisin avaruusasemalle.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 25",
        "kuvaaja": null,
        "mitat": [
          1920,
          1311
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss025e005259/iss025e005259~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss025e005259/iss025e005259~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss025e005259"
      },
      {
        "id": "iss073e0919979",
        "aika": "2025-10-19",
        "teksti": "Pyramid Lake syysauringossa; vihreät ja siniset pyörteet vedessä ovat levän värjäämiä virtauksia. Järveä ympäröi jyrkkä aavikkomaasto keskellä Nevadaa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0919979/iss073e0919979~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0919979/iss073e0919979~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0919979"
      }
    ]
  },
  {
    "tunnus": "monojarvi",
    "nimi": "Mono-järvi",
    "seutu": "Kalifornia, Yhdysvallat",
    "selite": "Laskujoeton suolajärvi Kalifornian korkealla aavikolla, jonka keskellä kohoaa tulivuoritoiminnan synnyttämä saari.",
    "lat": 38,
    "lon": -119.02,
    "oletus": "iss069e000859",
    "havainnot": [
      {
        "id": "iss069e000859",
        "aika": "2023-04-04",
        "teksti": "Lumen ympäröimä Mono-järvi huhtikuussa. Järven keskellä kohoava vaalea Paoha-saari on kolmesta saaresta nuorin ja syntyi tulivuoritoiminnasta alle 400 vuotta sitten. Järvellä ei ole luonnollista laskujokea, joten se on jäänyt suolaiseksi ja emäksiseksi.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 69",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss069e000859/iss069e000859~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss069e000859/iss069e000859~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss069e000859"
      }
    ]
  },
  {
    "tunnus": "saltonjarvi",
    "nimi": "Salton Sea",
    "seutu": "Kalifornia, Yhdysvallat",
    "selite": "Vahingossa vuonna 1905 syntynyt järvi Kalifornian eteläisellä aavikolla, joka suolaantuu vuosi vuodelta.",
    "lat": 33.3,
    "lon": -115.8,
    "oletus": "iss040e011868",
    "havainnot": [
      {
        "id": "iss040e011868",
        "aika": "2014-06-14",
        "teksti": "Salton Sea makaa tummana pisarana aavikon keskellä, vihreiden viljelysten ympäröimänä. Järvi syntyi, kun Colorado-joki murtautui kastelukanavan läpi ja täytti kuivan altaan kahdeksi vuodeksi ennen padon korjaamista; ilman jokea uudistuvaa vettä siitä on sittemmin tullut yhä suolaisempi.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 40",
        "kuvaaja": "Steve Swanson",
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss040e011868/iss040e011868~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss040e011868/iss040e011868~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss040e011868"
      }
    ]
  },
  {
    "tunnus": "etelaalpit-jarvet",
    "nimi": "Etelä-Alppien jäätikköjärvet",
    "seutu": "Uusi-Seelanti",
    "selite": "Jäätikköjauhon turkoosiksi värjäämiä järviä Uuden-Seelannin korkeimpien vuorten juurella.",
    "lat": -44.13,
    "lon": 170.13,
    "oletus": "iss071e073568",
    "havainnot": [
      {
        "id": "iss071e073568",
        "aika": "2024-05-11",
        "teksti": "Kolme peräkkäistä jäätikköjärveä samassa kuvassa — Tekapo, Pukaki ja Ohau vasemmalta oikealle. Kunkin sävy on hieman erilainen sen mukaan, kuinka paljon jäätikköjauhoa eli hienoksi jauhautunutta kivipölyä sen oma syöttöjoki kuljettaa; suurin niistä, Pukaki, on Aoraki/Mount Cookin, maan korkeimman vuoren, eteläpuolella.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 71",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss071e073568/iss071e073568~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss071e073568/iss071e073568~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss071e073568"
      }
    ]
  },
  {
    "tunnus": "zion",
    "nimi": "Zion Canyon",
    "seutu": "Utah, Yhdysvallat",
    "selite": "Virginin joen kaivama punahiekkakivikanjoni, jonka jyrkät seinämät kohoavat satoja metrejä.",
    "lat": 37.3,
    "lon": -113.05,
    "oletus": "iss017e005351",
    "havainnot": [
      {
        "id": "iss017e005351",
        "aika": "2008-04-26",
        "teksti": "Zion Canyonin punertavat ja vaaleanpinkit hiekkakivijyrkänteet lähes suoraan ylhäältä kuvattuna. Kivi on noin 200 miljoonaa vuotta vanhan aavikon hiekkadyynien jäänne, ja jokien kaivamat pystysuorat railot seuraavat kallion vanhoja säröjä. Vasemmassa alakulmassa erottuu kapea tie, joka kiipeää kanjonin seinämää pitkin.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 17",
        "kuvaaja": null,
        "mitat": [
          1920,
          1310
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss017e005351/iss017e005351~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss017e005351/iss017e005351~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss017e005351"
      }
    ]
  },
  {
    "tunnus": "volgansuisto",
    "nimi": "Volgan suisto",
    "seutu": "Astrahanin alue, Venäjä",
    "selite": "Euroopan pisimmän joen laaja haarautuva suisto Kaspianmeren rannalla.",
    "lat": 45.7,
    "lon": 47.9,
    "oletus": "iss005e11203",
    "havainnot": [
      {
        "id": "iss005e11203",
        "aika": "2002-08-25",
        "teksti": "Volga-joki haarautuu kymmeniksi uomiksi ennen laskuaan Kaspianmereen; vihreät suistosaaret erottuvat selvästi ruskeasta maasta pohjoisessa ja vihertävästä merestä etelässä. Suisto on tärkeä pysähdyspaikka muuttolinnuille ja elinympäristö belugasammille, joista saadaan Venäjän kuuluisaa kaviaaria.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 5",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss005e11203/iss005e11203~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss005e11203/iss005e11203~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss005e11203"
      },
      {
        "id": "iss013e77351",
        "aika": "2006-09-05",
        "teksti": "Sama suisto tulvan aikaan syyskuussa 2006, muutama päivä rankkojen sateiden jälkeen. Sameat tulvavedet virtaavat pitkinä juovina laivaväylän molemmin puolin kosteikkojen yli suoraan Kaspianmereen.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 13",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss013e77351/iss013e77351~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss013e77351/iss013e77351~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss013e77351"
      }
    ]
  },
  {
    "tunnus": "irrawaddyn-suisto",
    "nimi": "Irrawaddyn suisto",
    "seutu": "Myanmar",
    "selite": "Myanmarin tärkeimmän joen mangrovemetsien ja riisipeltojen halkoma suisto Andamaanien merellä.",
    "lat": 16,
    "lon": 95,
    "oletus": "iss073e1197819",
    "havainnot": [
      {
        "id": "iss073e1197819",
        "aika": "2025-11-22",
        "teksti": "Irrawaddy-joki haarautuu lukemattomiksi mangrovemetsän reunustamiksi uomiksi ennen laskuaan Andamaanien merelle. Ruskea sedimenttivyöhyke rannikon edustalla paljastaa, kuinka paljon liejua joki kuljettaa mukanaan riisipeltojen ja kosteikkojen halki. Avaruusaseman aurinkopaneeli näkyy kuvan oikeassa reunassa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e1197819/iss073e1197819~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e1197819/iss073e1197819~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e1197819"
      }
    ]
  },
  {
    "tunnus": "colorado-suisto",
    "nimi": "Colorado-joen suisto",
    "seutu": "Kalifornianlahti, Meksiko",
    "selite": "Kuivunut jokisuisto, joka paljastaa kuinka kastelu vie Colorado-joen veden ennen kuin se ehtii mereen.",
    "lat": 31.8,
    "lon": -114.75,
    "oletus": "iss064e002258",
    "havainnot": [
      {
        "id": "iss064e002258",
        "aika": "2020-10-28",
        "teksti": "Colorado-joen suisto Kalifornianlahden pohjukassa. Valkoinen alue vasemmalla on entistä jokiuomaa, joka on kuivunut, koska joen vesi käytetään lähes kokonaan kasteluun ennen kuin se ehtii merelle asti. Turkoosi sedimenttipitoinen vesi näyttää, missä vielä virtaava vesi kohtaa lahden. Avaruusaseman rakenteet näkyvät kuvan oikeassa reunassa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 64",
        "kuvaaja": null,
        "mitat": [
          1920,
          1078
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss064e002258/iss064e002258~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss064e002258/iss064e002258~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss064e002258"
      }
    ]
  },
  {
    "tunnus": "santorini",
    "nimi": "Santorini",
    "seutu": "Kykladit, Kreikka",
    "selite": "Kalderasaaristo, joka syntyi yhden historian voimakkaimmista tulivuorenpurkauksista.",
    "lat": 36.4,
    "lon": 25.4,
    "oletus": "iss017e005037",
    "havainnot": [
      {
        "id": "iss017e005037",
        "aika": "2008-04-20",
        "teksti": "Santorinin saariryhmä ylhäältä: oikealla Théran pääsaari, jonka valkoiset kattojen rivit seuraavat jyrkän kalderan reunaa, ja vasemmalla tumma Nea Kamenin saari, joka on kasvanut esiin merestä laavavirroista. Kalderan synnytti noin vuonna 1620 eaa. tapahtunut purkaus, yksi viimeisten 10 000 vuoden voimakkaimmista. Saaren oikeassa yläkulmassa erottuu lentokenttä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 17",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss017e005037/iss017e005037~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss017e005037/iss017e005037~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss017e005037"
      }
    ]
  },
  {
    "tunnus": "amazonin-suu",
    "nimi": "Amazonin suu",
    "seutu": "Pará, Brasilia",
    "selite": "Maailman vesirikkaimman joen suualue, jossa virtaukset muovaavat rantaviivaa jatkuvasti uudelleen.",
    "lat": -0.6,
    "lon": -49.9,
    "oletus": "iss010e13029",
    "havainnot": [
      {
        "id": "iss010e13029",
        "aika": "2005-01-13",
        "teksti": "Punaruskea liejuinen vesi virtaa vehreiden saarien välistä siellä missä Amazon laskee mereen; Perigoso-kanava erottaa saaren mantereesta, ja pilvet peittävät osan näkymästä. NASA:n tutkijat vertasivat vuosien 2000 ja 2005 kuvia ja havaitsivat kanavan siirtyneen satoja metrejä, kun joki syö rantaa toiselta puolelta ja kasaa lietettä toiselle.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 10",
        "kuvaaja": null,
        "mitat": [
          1920,
          1271
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss010e13029/iss010e13029~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss010e13029/iss010e13029~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss010e13029"
      }
    ]
  },
  {
    "tunnus": "fundynlahti",
    "nimi": "Fundynlahti",
    "seutu": "Nova Scotia ja New Brunswick, Kanada",
    "selite": "Lahti, jossa on maailman suurin vuorovesivaihtelu — vesi voi nousta ja laskea yli kymmenen metriä.",
    "lat": 45.3,
    "lon": -64.5,
    "oletus": "iss059e059149",
    "havainnot": [
      {
        "id": "iss059e059149",
        "aika": "2019-05-07",
        "teksti": "Fundynlahti erottaa Nova Scotian (oikealla) New Brunswickistä (vasemmalla). Lahden pohjukoissa vesi on punaruskeaa: maailman suurimmat vuorovedet huuhtovat esiin hiekkakiveä ja punaista mutaa kahdesti päivässä. Pilvijuova kulkee lahden yli kuvan alareunassa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 59",
        "kuvaaja": "David Saint-Jacques",
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss059e059149/iss059e059149~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss059e059149/iss059e059149~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss059e059149"
      }
    ]
  },
  {
    "tunnus": "falklandinsaaret",
    "nimi": "Falklandinsaaret",
    "seutu": "Etelä-Atlantti, Britannian merentakainen alue",
    "selite": "Kahden pääsaaren ja satojen pienempien saarten ryhmä keskellä eteläistä Atlanttia, kaukana lähimmästä mantereesta.",
    "lat": -51.7,
    "lon": -59.5,
    "oletus": "iss071e582470",
    "havainnot": [
      {
        "id": "iss066e091560",
        "aika": "2021-11-30",
        "teksti": "Sama saaristo runsaat kaksi vuotta aiemmin, pilvien raosta kuvattuna. Saarten välistä kulkeva salmi erottaa Länsi- ja Itä-Falklandin toisistaan. Saariryhmän kaksi nimeä — brittiläinen Falklandinsaaret ja argentiinalainen Malvinas — kertovat kiistasta, joka johti sotaan 1982.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 66",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss066e091560/iss066e091560~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss066e091560/iss066e091560~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss066e091560"
      },
      {
        "id": "iss071e582470",
        "aika": "2024-09-02",
        "teksti": "Länsi- ja Itä-Falkland erottuvat tummina, repaleisina saarina kirkkaan sinisen valtameren keskeltä. Saarilla asuu vain runsaat 3 700 ihmistä mutta moninkertainen määrä lampaita, ja rannikon lahdet ovat pingviinien ja merileijonien suosimia poikuupaikkoja.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 71",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss071e582470/iss071e582470~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss071e582470/iss071e582470~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss071e582470"
      }
    ]
  },
  {
    "tunnus": "etela-georgia",
    "nimi": "Etelä-Georgia",
    "seutu": "Eteläinen Atlantti, Britannian merentakainen alue",
    "selite": "Jäätikköinen vuorisaari, jonne Ernest Shackleton käveli hakemaan apua pelastusretkellään 1916.",
    "lat": -54.3,
    "lon": -36.5,
    "oletus": "iss011e12148",
    "havainnot": [
      {
        "id": "iss011e12148",
        "aika": "2005-08-26",
        "teksti": "Lumihuippuiset vuoret laskevat suoraan jäätiköinä mereen, ja niiden välissä tumma vuono heijastaa taivasta. Saari on niin jyrkkä ja jäätikköinen, ettei sen halki ole koskaan rakennettu tietä — Shackleton ja kaksi toveria ylittivät samankaltaisen maaston jalan vuonna 1916 pelastaakseen haaksirikkoutuneen miehistönsä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 11",
        "kuvaaja": null,
        "mitat": [
          1920,
          1271
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss011e12148/iss011e12148~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss011e12148/iss011e12148~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss011e12148"
      }
    ]
  },
  {
    "tunnus": "dasht-e-lut",
    "nimi": "Dasht-e Lutin kaluutit",
    "seutu": "Kerman, Iran",
    "selite": "Yksi Maan kuumimmista paikoista, jonka tuuli on veistänyt pitkiksi, harjanteisiksi yardangeiksi.",
    "lat": 30.7,
    "lon": 58.5,
    "oletus": "iss012e18779",
    "havainnot": [
      {
        "id": "iss012e18779",
        "aika": "2006-02-28",
        "teksti": "Kaluutit eli tuulen kuluttamat harjanteet piirtyvät aavikkoon kymmenien kilometrien pituisina riveinä, kultaisina iltapäivän valossa. Satelliitit ovat mitanneet Dasht-e Lutin pintalämpötilaksi yli 70 astetta — yhden korkeimmista koskaan mitatuista maanpinnan lämpötiloista. Pilvet kuvassa ovat harvinaisia: alueella ei sada juuri koskaan.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 12",
        "kuvaaja": null,
        "mitat": [
          1920,
          1271
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss012e18779/iss012e18779~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss012e18779/iss012e18779~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss012e18779"
      }
    ]
  },
  {
    "tunnus": "damavand",
    "nimi": "Damavand",
    "seutu": "Mazandaran, Iran",
    "selite": "Iranin ja koko Lähi-idän korkein huippu, lähes symmetrinen lumihuippuinen tulivuori.",
    "lat": 35.951,
    "lon": 52.109,
    "oletus": "iss010e13393",
    "havainnot": [
      {
        "id": "iss010e13393",
        "aika": "2005-01-15",
        "teksti": "Vuoren rinteiltä laskeutuu säteittäin lumiuurteita joka suuntaan kuin valtava valkoinen sateenvarjo. Damavand on yli 5 600 metriä korkea ja yhä toimiva tulivuori — huipulla purkautuu rikkikaasua — vaikka viimeisestä laavapurkauksesta on kulunut tuhansia vuosia.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 10",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss010e13393/iss010e13393~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss010e13393/iss010e13393~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss010e13393"
      }
    ]
  },
  {
    "tunnus": "sarezjarvi",
    "nimi": "Sarezjärvi",
    "seutu": "Pamir, Tadžikistan",
    "selite": "Maanjäristyksen padottu vuoristojärvi, jonka luonnollinen pato uhkaa yhä pettää.",
    "lat": 38.264,
    "lon": 72.573,
    "oletus": "iss074e0814815",
    "havainnot": [
      {
        "id": "iss074e0814815",
        "aika": "2026-07-17",
        "teksti": "Turkoosi järvi täyttää Pamirin vuoristolaakson mutkitellen yli 60 kilometrin matkan. Se syntyi 1911, kun voimakas maanjäristys irrotti kalliovyöryn, joka tukki laakson — Usoin sortuma on yhä yksi maailman korkeimmista luonnollisista padoista. Geologit seuraavat patoa jatkuvasti, sillä sen pettäminen uhkaisi satojatuhansia ihmisiä alajuoksulla.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 74",
        "kuvaaja": null,
        "mitat": [
          1920,
          1078
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss074e0814815/iss074e0814815~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss074e0814815/iss074e0814815~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss074e0814815"
      }
    ]
  },
  {
    "tunnus": "toktogul",
    "nimi": "Toktogulin tekojärvi",
    "seutu": "Tien-shan, Kirgisia",
    "selite": "Keski-Aasian suurimpiin kuuluva tekojärvi, joka varastoi vuoriston sulamisvedet vuoriston sisään.",
    "lat": 41.72,
    "lon": 73,
    "oletus": "iss074e0825692",
    "havainnot": [
      {
        "id": "iss074e0825692",
        "aika": "2026-07-17",
        "teksti": "Kirkkaan turkoosi tekojärvi täyttää joenlaakson Tien-shanin vuorten keskellä. Pato valmistui 1974, ja järvi tuottaa suuren osan Kirgisian sähköstä. Kesken talven päästetty vesi on toistuvasti riidan aihe naapurimaiden kanssa, jotka tarvitsisivat saman veden keväällä kastelukauden alkuun.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 74",
        "kuvaaja": null,
        "mitat": [
          1280,
          1920
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss074e0825692/iss074e0825692~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss074e0825692/iss074e0825692~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss074e0825692"
      }
    ]
  },
  {
    "tunnus": "kljutsevskaja",
    "nimi": "Kljutševskaja Sopka",
    "seutu": "Kamtšatka, Venäjä",
    "selite": "Euraasian korkein toimiva tulivuori, joka purkautuu useita kertoja vuosikymmenessä.",
    "lat": 56.056,
    "lon": 160.642,
    "oletus": "iss038e005515",
    "havainnot": [
      {
        "id": "iss038e005515",
        "aika": "2013-11-16",
        "teksti": "Tuhkapatsas nousee suoraan huipulta ja taittuu tuulen mukana sivulle — purkaus oli käynnissä juuri kun avaruusasema lensi ylitse. Vuori on lähes 4 800 metriä korkea ja kasvaa joka purkauksen myötä. Vasemmalla näkyy lumihuippuinen naapuritulivuori, jonka purkauspilvi jättää varjoonsa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 38",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss038e005515/iss038e005515~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss038e005515/iss038e005515~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss038e005515"
      }
    ]
  },
  {
    "tunnus": "reunion",
    "nimi": "Réunion",
    "seutu": "Intian valtameri, Ranska",
    "selite": "Ranskan merentakainen departementti, jonka keskellä kohoaa yksi maailman aktiivisimmista tulivuorista.",
    "lat": -21.13,
    "lon": 55.54,
    "oletus": "iss055e020372",
    "havainnot": [
      {
        "id": "iss055e020372",
        "aika": "2018-04-10",
        "teksti": "Saaren pyöreä muoto ja rosoiset laaksot paljastavat sen synnyn: koko saari on yhden ainoan kilpitulivuoren, Piton des Neigesin, rakentama. Vuoren jyrkät valurenkaat erottuvat kuvan vasemmassa reunassa vihreinä syvänteinä. Saaren toisella laidalla purkautuu säännöllisesti Piton de la Fournaise, joka purkautuu keskimäärin kerran vuodessa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 55",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss055e020372/iss055e020372~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss055e020372/iss055e020372~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss055e020372"
      }
    ]
  },
  {
    "tunnus": "villarrica",
    "nimi": "Villarrica",
    "seutu": "Araucanía, Chile",
    "selite": "Yksi Etelä-Amerikan aktiivisimmista tulivuorista, jonka kraatterissa lipuu pysyvä laavajärvi.",
    "lat": -39.42,
    "lon": -71.93,
    "oletus": "iss068e040596",
    "havainnot": [
      {
        "id": "iss068e040596",
        "aika": "2023-01-17",
        "teksti": "Lumihuippu piirtää täydellisen kartion kahden järven, Villarrican ja Calafquénin, väliin. Rinteiltä laskeutuvat tummat juovat ovat vanhoja laavavirtoja ja mutavirtojen uria. Huipun kraatterissa kiehuu jatkuvasti näkyvä laavajärvi — yksi vain viidestä koko maailmassa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 68",
        "kuvaaja": "Koichi Wakata",
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss068e040596/iss068e040596~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss068e040596/iss068e040596~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss068e040596"
      }
    ]
  },
  {
    "tunnus": "laguna-verde",
    "nimi": "Laguna Verde",
    "seutu": "Atacama, Chile",
    "selite": "Turkoosi korkean vuoriston järvi maailman korkeimman aktiivisen tulivuoren, Ojos del Saladon, juurella.",
    "lat": -26.98,
    "lon": -68.55,
    "oletus": "iss074e0760459",
    "havainnot": [
      {
        "id": "iss074e0760459",
        "aika": "2026-06-22",
        "teksti": "Järven vesi hohtaa kirkkaan turkoosina liuenneiden mineraalien ansiosta, yli 4 300 metrin korkeudessa. Ympäröivä maasto on täynnä pieniä tulivuorenkartioita ja tuoreita laavavirtoja. Vain muutaman kilometrin päässä kohoaa Ojos del Salado, 6 893 metriä korkea maailman korkein aktiivinen tulivuori.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 74",
        "kuvaaja": null,
        "mitat": [
          1920,
          1078
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss074e0760459/iss074e0760459~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss074e0760459/iss074e0760459~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss074e0760459"
      }
    ]
  },
  {
    "tunnus": "laguna-colorada",
    "nimi": "Laguna Colorada",
    "seutu": "Potosí, Bolivia",
    "selite": "Veripunainen suolajärvi Andien ylätasangolla, jonka rannoilla pesii tuhansia flamingoja.",
    "lat": -22.2,
    "lon": -67.78,
    "oletus": "iss066e110899",
    "havainnot": [
      {
        "id": "iss066e110899",
        "aika": "2022-01-07",
        "teksti": "Järven pinta hohtaa veripunaisena keskellä ruskeaa ylätasankoa, ja valkoiset boraattisaarekkeet pilkottavat sen läpi. Punainen väri syntyy pigmentistä, jota levät ja mikrobit tuottavat suojautuakseen kirkkaalta auringolta yli 4 200 metrin korkeudessa. Kolme flamingolajia ruokailee järven levillä ja äyriäisillä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 66",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss066e110899/iss066e110899~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss066e110899/iss066e110899~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss066e110899"
      }
    ]
  },
  {
    "tunnus": "san-rafael",
    "nimi": "San Rafaelin jäätikkö",
    "seutu": "Aysén, Chile",
    "selite": "Patagonian pohjoisen jäätikköalueen jäätikkö, joka laskee suoraan laguuniin ja kalvaa siihen jäävuoria.",
    "lat": -46.68,
    "lon": -73.83,
    "oletus": "iss063e081907",
    "havainnot": [
      {
        "id": "iss063e081907",
        "aika": "2020-09-01",
        "teksti": "Jäätikön sininen, rikkonainen etureuna työntyy suoraan laguuniin, ja sen edestä irronneet jäävuoret kelluvat vedessä satoina valkoisina lohkareina. San Rafael on eteläisen pallonpuoliskon matalimmilla leveysasteilla oleva jäätikkö, joka ulottuu lähes sademetsävyöhykkeeseen asti — ja on vetäytynyt viime vuosikymmeninä useita kilometrejä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 63",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss063e081907/iss063e081907~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss063e081907/iss063e081907~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss063e081907"
      }
    ]
  },
  {
    "tunnus": "simienit",
    "nimi": "Simienin vuoret",
    "seutu": "Amhara, Etiopia",
    "selite": "Jyrkkiin huippuihin ja syviin rotkoihin kulunut ylätasanko, jota kutsutaan Afrikan Grand Canyoniksi.",
    "lat": 13.19,
    "lon": 38.24,
    "oletus": "iss016e010784",
    "havainnot": [
      {
        "id": "iss016e010784",
        "aika": "2007-11-16",
        "teksti": "Vuosimiljoonien sadevedet ovat uurtaneet rotkoja, jotka haarautuvat ylätasangosta kuin puun juuret, ja jyrkät reunat erottuvat terävinä varjoina. Ylätasanko on jäänne paljon suuremmasta laavakerrostumasta, josta eroosio on jättänyt jäljelle vain kovimmat, sakaraiset huiput. Alueella elää geladapaviaani, jota ei tavata luonnossa missään muualla maailmassa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 16",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss016e010784/iss016e010784~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss016e010784/iss016e010784~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss016e010784"
      }
    ]
  },
  {
    "tunnus": "everglades",
    "nimi": "Everglades",
    "seutu": "Florida, Yhdysvallat",
    "selite": "Valtavan matalana virtaava \"ruohon joki\", yksi maailman suurimmista kosteikoista.",
    "lat": 25.4,
    "lon": -80.9,
    "oletus": "iss015e08920",
    "havainnot": [
      {
        "id": "iss015e08920",
        "aika": "2007-05-19",
        "teksti": "Turkoosin ja tummanvihreän kirjava kuvio on satojen tuhansien hehtaarien laajuinen saraikko, jonka läpi vesi virtaa niin hitaasti — vain muutaman sadan metrin päivässä — että aluetta kutsutaan \"ruohon joeksi\". Kansallispuisto on maailman ainoa paikka, jossa amerikanalligaattori ja amerikankrokotiili elävät luonnossa samalla alueella.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 15",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss015e08920/iss015e08920~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss015e08920/iss015e08920~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss015e08920"
      }
    ]
  },
  {
    "tunnus": "ennedi",
    "nimi": "Ennedin ylänkö",
    "seutu": "Ennedi, Tšad",
    "selite": "UNESCOn suojelema hiekkakivimuodostuma Saharan keskellä, jonka pinnalla on myös muinaisen meteoriitin jättämä kraatteri.",
    "lat": 17.42,
    "lon": 21.75,
    "oletus": "iss074e0320315",
    "havainnot": [
      {
        "id": "iss072e404551",
        "aika": "2024-12-26",
        "teksti": "Laajempi näkymä samasta ylängöstä: punertava hiekkakivi on kulunut sokkeloiseksi labyrintiksi kanjoneita ja pylväitä. Muodostuma on satoja miljoonia vuosia vanha, ja sen kallioseinillä on tuhansia vuosia vanhoja maalauksia ajalta, jolloin Sahara oli vihreä ja märkä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 72",
        "kuvaaja": null,
        "mitat": [
          1280,
          1920
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss072e404551/iss072e404551~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss072e404551/iss072e404551~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss072e404551"
      },
      {
        "id": "iss074e0320315",
        "aika": "2026-02-21",
        "teksti": "Gweni-Fadan kraatteri erottuu lähes täydellisenä ympyränä aavikon keskeltä — NASA tunnistaa sen eroosion paljastamaksi, meteoriitin törmäyksestä syntyneeksi rakenteeksi, halkaisijaltaan yli kolme kilometriä. Sen ympärillä mutkittelevat kuivat jokiuomat täyttyvät vedellä vain harvoin sadekausina.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 74",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss074e0320315/iss074e0320315~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss074e0320315/iss074e0320315~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss074e0320315"
      }
    ]
  },
  {
    "tunnus": "nevado-del-ruiz",
    "nimi": "Nevado del Ruiz",
    "seutu": "Kolumbia",
    "selite": "Jäätikköinen tulivuori, jonka vuoden 1985 purkaus suli jäätikköä ja hautasi kokonaisen kaupungin mutavirran alle.",
    "lat": 4.892,
    "lon": -75.324,
    "oletus": "iss023e027737",
    "havainnot": [
      {
        "id": "iss023e027737",
        "aika": "2010-04-23",
        "teksti": "Lumi- ja jäätikkökupu peittää huipun, ja sen keskellä erottuu tumma, pyöreä kraatteri, josta nousee yhä höyryä. Rinteiltä laskeutuvat syvät, säteittäiset uurteet ovat vanhojen mutavirtojen jälkiä. Vuoden 1985 purkaus suli osan jäätiköstä ja synnytti laharin, joka hautasi Armeron kaupungin ja surmasi yli 23 000 ihmistä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 23",
        "kuvaaja": "Soichi Noguchi",
        "mitat": [
          1920,
          1314
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss023e027737/iss023e027737~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss023e027737/iss023e027737~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss023e027737"
      }
    ]
  },
  {
    "tunnus": "sakurajima",
    "nimi": "Sakurajima",
    "seutu": "Kyūshū, Japani",
    "selite": "Yksi Japanin aktiivisimmista tulivuorista kohoaa keskellä Kagoshiman lahtea, kaupungin kupeessa.",
    "lat": 31.593,
    "lon": 130.657,
    "oletus": "iss034e027139",
    "havainnot": [
      {
        "id": "iss034e027139",
        "aika": "2013-01-10",
        "teksti": "Sakurajima purkautuu tammikuussa 2013 kuvattuna Kansainväliseltä avaruusasemalta. Tuhkapilvi kulkeutuu kaakkoon yli lahden, ja purkauspilven varjo osuu vedenpinnalle. Alempana näkyy Kagoshiman kaupunki, jonka noin 600 000 asukasta elävät tulivuoren varjossa ja pyyhkivät tuhkaa katoiltaan lähes viikoittain.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 34",
        "kuvaaja": null,
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss034e027139/iss034e027139~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss034e027139/iss034e027139~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss034e027139"
      }
    ]
  },
  {
    "tunnus": "aorounga",
    "nimi": "Aorounga-kraatteri",
    "seutu": "Sahara, Tšad",
    "selite": "Yksi maailman parhaiten säilyneistä meteoriittikraattereista piirtyy tarkkoina renkaina Saharan hiekkaan.",
    "lat": 19.1,
    "lon": 19.25,
    "oletus": "iss012e09639",
    "havainnot": [
      {
        "id": "iss012e09639",
        "aika": "2005-11-29",
        "teksti": "Aorounga-kraatterin renkaat erottuvat terävinä Tšadin pohjoisosan aavikolla. Kraatterin halkaisija on noin 17 kilometriä, ja tutkijoiden mukaan sen iskun jäljet ovat säilyneet lähes koskemattomina satojen miljoonien vuosien ajan, koska alueella ei ole ollut juuri lainkaan eroosiota kuluttavaa kasvillisuutta tai vettä. Tutkakuvaukset ovat paljastaneet hiekan alta vielä kaksi samanikäistä kraatteria vierekkäin, mikä viittaa kolmen kappaleen peräkkäiseen törmäykseen.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 12",
        "kuvaaja": null,
        "mitat": [
          1920,
          1271
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss012e09639/iss012e09639~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss012e09639/iss012e09639~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss012e09639"
      }
    ]
  },
  {
    "tunnus": "emi-koussi",
    "nimi": "Emi Koussi",
    "seutu": "Tibestin vuoret, Tšad",
    "selite": "Saharan korkein huippu on kilpitulivuori, jonka laella on yksi maailman suurimmista kalderoista.",
    "lat": 19.792,
    "lon": 18.556,
    "oletus": "iss030e005456",
    "havainnot": [
      {
        "id": "iss030e005456",
        "aika": "2011-11-26",
        "teksti": "Emi Koussin harmaanvihreä kilpitulivuori kohoaa Tšadin Tibestin vuoristossa, ja oikealla näkyy vertailun vuoksi Aorounga-kraatterin rengasmuodostuma samassa kuvassa. Emi Koussin huipulla on noin 12 x 19 kilometrin kalderarakennelma, yksi laajimmista koko maailmassa. Vuori kohoaa 3 415 metriin ja on samalla koko Saharan aavikon korkein kohta.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 30",
        "kuvaaja": null,
        "mitat": [
          1920,
          1275
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss030e005456/iss030e005456~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss030e005456/iss030e005456~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss030e005456"
      }
    ]
  },
  {
    "tunnus": "meteor-crater-arizona",
    "nimi": "Meteorikraatteri",
    "seutu": "Arizona, Yhdysvallat",
    "selite": "Ensimmäinen kraatteri, joka todistettiin tieteellisesti meteoriitin iskun jäljeksi, aukeaa terävärajaisena Arizonan ylängöllä.",
    "lat": 35.027,
    "lon": -111.022,
    "oletus": "iss074e0208832",
    "havainnot": [
      {
        "id": "iss074e0208832",
        "aika": "2026-01-26",
        "teksti": "Meteorikraatteri erottuu tarkkarajaisena reikänä Arizonan lumisen ylängön keskellä. Kraatteri syntyi noin 50 000 vuotta sitten, kun noin 50 metriä leveä rauta-nikkelimeteoriitti iski maahan. Se on halkaisijaltaan noin 1,2 kilometriä, ja NASA on käyttänyt paikkaa Kuu-astronauttien maastokoulutukseen sen kuumaisemaa muistuttavan pinnan takia.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 74",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss074e0208832/iss074e0208832~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss074e0208832/iss074e0208832~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss074e0208832"
      }
    ]
  },
  {
    "tunnus": "buenos-aires-yolla",
    "nimi": "Buenos Aires yöllä",
    "seutu": "Argentiina",
    "selite": "Argentiinan pääkaupunki levittäytyy miljoonine valoineen Río de la Platan rannalle.",
    "lat": -34.61,
    "lon": -58.44,
    "oletus": "iss072e519264",
    "havainnot": [
      {
        "id": "iss072e519264",
        "aika": "2025-01-21",
        "teksti": "Buenos Airesin katuverkko piirtyy oranssina ja valkoisena yöllisessä kuvassa tammikuulta 2025. Kaupungissa asuu noin 3,1 miljoonaa ihmistä, mutta metropolialueella yli 15 miljoonaa – lähes kolmasosa koko Argentiinan väestöstä. Río de la Plata, maailman leveimpiin kuuluva jokisuisto, jää kuvan oikeaan reunaan mustana.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 72",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss072e519264/iss072e519264~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss072e519264/iss072e519264~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss072e519264"
      }
    ]
  },
  {
    "tunnus": "riyadh-yolla",
    "nimi": "Riad yöllä",
    "seutu": "Saudi-Arabia",
    "selite": "Aavikon keskelle noussut pääkaupunki hehkuu yöllä laajana ruudukkona ilman ainoatakaan lähijokea.",
    "lat": 24.7136,
    "lon": 46.6753,
    "oletus": "iss033e020288",
    "havainnot": [
      {
        "id": "iss033e020288",
        "aika": "2012-11-13",
        "teksti": "Riadin katuverkko hohtaa keltaisena ja sinisenä marraskuisessa yökuvassa vuodelta 2012. Kaupungin väkiluku on kasvanut räjähdysmäisesti: vielä 1960 asukkaita oli noin 150 000, nykyään yli 7 miljoonaa. Riad sijaitsee Najdin ylätasangolla, eikä sen lähellä virtaa yhtään pysyvää jokea – vesi tulee suolanpoistolaitoksista ja pohjavedestä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 33",
        "kuvaaja": null,
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss033e020288/iss033e020288~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss033e020288/iss033e020288~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss033e020288"
      }
    ]
  },
  {
    "tunnus": "casablanca-yolla",
    "nimi": "Casablanca yöllä",
    "seutu": "Marokko",
    "selite": "Marokon suurin kaupunki ja tärkein satama loistaa Atlantin rannalla.",
    "lat": 33.5731,
    "lon": -7.5898,
    "oletus": "iss072e645691",
    "havainnot": [
      {
        "id": "iss072e645691",
        "aika": "2025-02-17",
        "teksti": "Casablancan valot piirtävät rannikon ääriviivan tarkasti Atlantin mustaa merta vasten. Kaupunki on Marokon suurin ja tärkein talouskeskus, ja siellä asuu yli 3,7 miljoonaa ihmistä. Nimi tarkoittaa espanjaksi 'valkoista taloa' – portugalilaiset ja espanjalaiset merenkulkijat antoivat sen valkoisiksi kalkittujen rakennusten mukaan.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 72",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss072e645691/iss072e645691~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss072e645691/iss072e645691~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss072e645691"
      }
    ]
  },
  {
    "tunnus": "empty-quarter",
    "nimi": "Tyhjä neljännes",
    "seutu": "Rub al-Khali, Saudi-Arabia",
    "selite": "Maailman suurin yhtenäinen hiekkameri aaltoilee tuulen muovaamana loputtomiin.",
    "lat": 20,
    "lon": 52,
    "oletus": "iss027e034290",
    "havainnot": [
      {
        "id": "iss027e034290",
        "aika": "2011-05-16",
        "teksti": "Rub al-Khalin – Tyhjän neljänneksen – dyynit muodostavat tarkan, säännöllisen kuvion aavikon pinnalle. Hiekkameri on maailman suurin yhtenäinen dyynialue, ja sen dyynit voivat kohota jopa 250 metrin korkuisiksi. Alueen ylitti ensimmäisten eurooppalaisten joukossa brittiläinen tutkimusmatkailija Bertram Thomas vuosina 1930–31.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 27",
        "kuvaaja": null,
        "mitat": [
          1920,
          1314
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss027e034290/iss027e034290~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss027e034290/iss027e034290~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss027e034290"
      }
    ]
  },
  {
    "tunnus": "taklamakan",
    "nimi": "Taklamakanin autiomaa",
    "seutu": "Xinjiang, Kiina",
    "selite": "Yksi maailman suurimmista liikkuvan hiekan aavikoista täyttää koko Tarimin altaan Keski-Aasiassa.",
    "lat": 39.5,
    "lon": 76.5,
    "oletus": "iss074e0316083",
    "havainnot": [
      {
        "id": "iss074e0316083",
        "aika": "2026-02-18",
        "teksti": "Taklamakanin autiomaan läntinen reuna kohtaa Pamirin vuoriston lumihuiput jyrkässä siirtymässä. Autiomaa on toiseksi suurin liikkuvan hiekan alue maailmassa, ja sen nimen on tulkittu tarkoittavan suunnilleen 'sinne menee mutta ei tule takaisin'. Muinaiset silkkitiekulkijat kiersivät koko autiomaan sen reunoja pitkin sen sijaan, että olisivat yrittäneet ylittää sen.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 74",
        "kuvaaja": null,
        "mitat": [
          1920,
          1078
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss074e0316083/iss074e0316083~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss074e0316083/iss074e0316083~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss074e0316083"
      }
    ]
  },
  {
    "tunnus": "simpson-desert",
    "nimi": "Simpsonin autiomaa",
    "seutu": "Australia",
    "selite": "Satojen kilometrien pituiset punaiset hiekkaharjanteet juovittavat Australian sydänmaata.",
    "lat": -24.5,
    "lon": 137,
    "oletus": "iss005e21295",
    "havainnot": [
      {
        "id": "iss005e21295",
        "aika": "2002-11-23",
        "teksti": "Simpsonin autiomaan oranssinpunaiset dyyniharjanteet erottuvat selvästi vastikään palaneesta, sinertävän vihreästä kasvillisuudesta. Dyynit ovat pitkittäisiä ja voivat jatkua satojen kilometrien matkan lähes suorina linjoina. Punainen väri syntyy hiekanjyvien pintaa peittävästä rautaoksidikerroksesta, joka on muodostunut vuosituhansien kuluessa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 5",
        "kuvaaja": null,
        "mitat": [
          1920,
          1271
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss005e21295/iss005e21295~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss005e21295/iss005e21295~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss005e21295"
      }
    ]
  },
  {
    "tunnus": "aurora-scandinavia",
    "nimi": "Revontulet Pohjolan yllä",
    "seutu": "Ruotsi ja Suomi",
    "selite": "Vihreä revontulinauha kaartuu maapallon reunan yli Pohjoismaiden kaupunkivalojen päällä.",
    "lat": 60,
    "lon": 20,
    "oletus": "iss064e024089",
    "havainnot": [
      {
        "id": "iss064e024089",
        "aika": "2021-01-18",
        "teksti": "Vihreä ja punertava revontulinauha kaartuu tähtitaivasta vasten Ruotsin ja Suomen kaupunkivalojen yllä, ja niiden välissä pimeänä erottuu Itämeri. Revontulet syntyvät, kun Auringosta tulevat varautuneet hiukkaset törmäävät yläilmakehän kaasuihin. Vihreä väri syntyy noin 100–300 kilometrin korkeudessa hehkuvasta hapesta.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 64",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss064e024089/iss064e024089~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss064e024089/iss064e024089~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss064e024089"
      }
    ]
  },
  {
    "tunnus": "manam",
    "nimi": "Manam",
    "seutu": "Papua-Uusi-Guinea",
    "selite": "Oma saarensa muodostava tulivuori on yksi Papua-Uusi-Guinean aktiivisimmista.",
    "lat": -4.08,
    "lon": 145.037,
    "oletus": "sts093-709-051",
    "havainnot": [
      {
        "id": "sts093-709-051",
        "aika": "1999-07-25",
        "teksti": "Manam-saaren pyöreä tulivuori työntää tuhkapilveä pitkälle Bismarckinmerelle. Vuori muodostaa kokonaan oman, halkaisijaltaan noin 10 kilometrin saarensa Papua-Uuden-Guinean koillisrannikon edustalla. Vuoden 2004 suuri purkaus pakotti evakuoimaan koko saaren noin 9 000 asukasta mantereelle.",
        "kuvaustapa": "Avaruussukkulasta",
        "retkikunta": null,
        "kuvaaja": null,
        "mitat": [
          1920,
          1859
        ],
        "kuva": "https://images-assets.nasa.gov/image/sts093-709-051/sts093-709-051~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/sts093-709-051/sts093-709-051~small.jpg",
        "sivu": "https://images.nasa.gov/details/sts093-709-051"
      }
    ]
  },
  {
    "tunnus": "karymsky",
    "nimi": "Karymski",
    "seutu": "Kamtšatka, Venäjä",
    "selite": "Kamtšatkan aktiivisin tulivuori purkautuu lähes jatkuvasti vanhan kalderajärven kupeessa.",
    "lat": 54.049,
    "lon": 159.443,
    "oletus": "iss033e019822",
    "havainnot": [
      {
        "id": "iss033e019822",
        "aika": "2012-11-09",
        "teksti": "Karymskin tulivuoren tumma tuhkapilvi kohoaa lumisen rinteen yllä, ja vieressä siintää pyöreä kalderajärvi. Vuori on yksi Kamtšatkan aktiivisimmista, ja se on purkautunut lähes yhtäjaksoisesti vuodesta 1996 lähtien. Vuori sijaitsee vanhemman, suuremman kalderan sisällä, joka syntyi noin 7 600 vuotta sitten.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 33",
        "kuvaaja": null,
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss033e019822/iss033e019822~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss033e019822/iss033e019822~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss033e019822"
      }
    ]
  },
  {
    "tunnus": "tarawa",
    "nimi": "Tarawan atollit",
    "seutu": "Kiribati",
    "selite": "Matalat koralliatollit Tyynellämerellä ovat sekä Kiribatin sydän että ilmastonmuutoksen etulinja.",
    "lat": 1.5,
    "lon": 173,
    "oletus": "iss053e180184",
    "havainnot": [
      {
        "id": "iss053e180184",
        "aika": "2017-11-12",
        "teksti": "Abaiangin, Tarawan ja Maianan atollit kuvattuna marraskuussa 2017 muodostavat vihreänsinisen ketjun keskelle Tyyntämerta. Yhdessä ne ovat osa Kiribatin 33 koralliatollin ja saaren joukkoa. Tarawa oli näyttämönä toisen maailmansodan verisimpiin taisteluihin kuuluneelle Tarawan taistelulle marraskuussa 1943.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 53",
        "kuvaaja": null,
        "mitat": [
          1920,
          1078
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss053e180184/iss053e180184~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss053e180184/iss053e180184~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss053e180184"
      }
    ]
  },
  {
    "tunnus": "wake-island",
    "nimi": "Waken saari",
    "seutu": "Tyynimeri, Yhdysvallat",
    "selite": "Yksinäinen koralliatolli keskellä Tyyntämerta toimi lentotukikohtana jo ennen toista maailmansotaa.",
    "lat": 19.28,
    "lon": 166.65,
    "oletus": "iss033e007873",
    "havainnot": [
      {
        "id": "iss033e007873",
        "aika": "2012-09-27",
        "teksti": "Waken atollin vaaleanturkoosi laguuni erottuu selvästi tummansinistä valtamerta vasten. Atollin muodostavat kolme pientä saarta noin 4 000 kilometrin päässä Havaijista. Japani valtasi Waken joulukuussa 1941 lyhyen mutta ankaran taistelun jälkeen, ja saari pysyi japanilaismiehityksessä koko sodan ajan.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 33",
        "kuvaaja": null,
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss033e007873/iss033e007873~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss033e007873/iss033e007873~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss033e007873"
      }
    ]
  },
  {
    "tunnus": "bassac-vietnam",
    "nimi": "Bassac-joen suisto",
    "seutu": "Vietnam",
    "selite": "Mekongin toiseksi suurin haara jakautuu hedelmätarhojen ja mangrovemetsien ympäröimäksi jokisaareksi ennen Etelä-Kiinan merta.",
    "lat": 9.55,
    "lon": 106.23,
    "oletus": "iss073e0818427",
    "havainnot": [
      {
        "id": "iss073e0818427",
        "aika": "2025-10-02",
        "teksti": "Bassac-joki – Mekongin yksi yhdeksästä 'lohikäärmehaarasta' – kiertää Cù Lao Dungin jokisaarta ruskeana ja sedimenttipitoisena juuri ennen laskuaan mereen. Vasemmalla näkyy tummempaa maata ja oikealla vihreämpää viljelysmaata ja hedelmätarhoja. Sameus syntyy Mekongin koko valuma-alueelta kertyneestä liejusta, jota vuorovesi sekoittaa edelleen suulla.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1078
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0818427/iss073e0818427~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0818427/iss073e0818427~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0818427"
      }
    ]
  },
  {
    "tunnus": "kenya-rift",
    "nimi": "Kenian riftilaakso",
    "seutu": "Kenia",
    "selite": "Itä-Afrikan hautavajoama repii mannerta kahtia ja jättää jälkeensä värikkäitä soodajärviä.",
    "lat": -1.87,
    "lon": 36.28,
    "oletus": "iss030e035487",
    "havainnot": [
      {
        "id": "iss030e035487",
        "aika": "2012-01-14",
        "teksti": "Kenian riftilaakson rinnakkaiset murroslinjat viiruttavat maastoa vinosti kuvan poikki, ja keskellä hohtaa vaaleanpunertava soodajärvi. Laakso on osa Itä-Afrikan hautavajoamaa, joka syntyy, kun Afrikan ja Somalian mannerlaatat vetäytyvät hitaasti erilleen. Miljoonien vuosien kuluessa liike voi lopulta halkaista Afrikan ja synnyttää alueelle uuden valtameren.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 30",
        "kuvaaja": null,
        "mitat": [
          1920,
          1275
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss030e035487/iss030e035487~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss030e035487/iss030e035487~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss030e035487"
      }
    ]
  },
  {
    "tunnus": "sahara-dust-western",
    "nimi": "Länsi-Saharan pölymyrsky",
    "seutu": "Länsi-Sahara",
    "selite": "Saharasta nouseva pölypilvi peittää rannikon ja kulkeutuu edelleen Atlantin ylle.",
    "lat": 24,
    "lon": -13.5,
    "oletus": "iss007e08259",
    "havainnot": [
      {
        "id": "iss007e08259",
        "aika": "2003-06-25",
        "teksti": "Vaaleanruskea pölypilvi peittää Länsi-Saharan rannikon ja leviää pilvien lomasta kohti Atlantin valtamerta ja Kanariansaaria. Sahara nostaa ilmakehään valtavia määriä hienoa pölyä, joka voi kulkeutua tuhansien kilometrien päähän saakka Amazonin sademetsään asti. Pöly tuo mukanaan fosforia, joka lannoittaa sademetsän köyhää maaperää.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 7",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss007e08259/iss007e08259~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss007e08259/iss007e08259~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss007e08259"
      }
    ]
  },
  {
    "tunnus": "baghdad-yolla",
    "nimi": "Bagdad yöllä",
    "seutu": "Irak",
    "selite": "Tigris-joen mutka kiemurtelee kirkkaana miljoonakaupungin valomeren keskellä.",
    "lat": 33.3152,
    "lon": 44.3661,
    "oletus": "iss073e0515117",
    "havainnot": [
      {
        "id": "iss073e0515117",
        "aika": "2025-08-23",
        "teksti": "Bagdadin valot piirtävät kaupungin ääriviivat, ja niiden keskeltä erottuu Tigris-joen tumma S-mutka. Bagdad perustettiin vuonna 762 Abbasidien kalifikunnan pääkaupungiksi, ja siitä tuli pian yksi keskiajan maailman suurimmista ja oppineimmista kaupungeista. Nykyään Bagdadissa asuu yli seitsemän miljoonaa ihmistä, ja se on edelleen Irakin pääkaupunki.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 73",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss073e0515117/iss073e0515117~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss073e0515117/iss073e0515117~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss073e0515117"
      }
    ]
  },
  {
    "tunnus": "malaspina",
    "nimi": "Malaspina",
    "seutu": "Alaska, Yhdysvallat",
    "selite": "Maailman suurin niin sanottu jalustajäätikkö, joka levittäytyy vuorten juurelta leveäksi jäälakeudeksi rannikolle.",
    "lat": 59.87,
    "lon": -140.5,
    "oletus": "STS066-117-014",
    "havainnot": [
      {
        "id": "STS066-117-014",
        "aika": "1994-11-14",
        "teksti": "Jäätikön pinnalla kiemurtelee tummia raitoja: ne ovat moreeneja, kivi- ja soravöitä, jotka syntyvät kun useampi vuoristojäätikkö yhtyy samaksi jäälevyksi rannikkotasangolla. Malaspina on niin laaja, että se peittäisi kokonaisen pienen osavaltion. Kuva otettiin sukkula Atlantiksen STS-66-lennolta marraskuussa 1994.",
        "kuvaustapa": "Avaruussukkulasta",
        "retkikunta": null,
        "kuvaaja": null,
        "mitat": [
          1920,
          1920
        ],
        "kuva": "https://images-assets.nasa.gov/image/STS066-117-014/STS066-117-014~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/STS066-117-014/STS066-117-014~small.jpg",
        "sivu": "https://images.nasa.gov/details/STS066-117-014"
      }
    ]
  },
  {
    "tunnus": "makgadikgadin-altaat",
    "nimi": "Makgadikgadin suola-altaat",
    "seutu": "Botswana",
    "selite": "Yksi maailman suurimmista suolatasangoista, jonka reunalla altaissa haihdutetaan soodaa ja suolaa punaisten suolarakkojen värjäämästä suolavedestä.",
    "lat": -20.6,
    "lon": 26.08,
    "oletus": "iss014e15732",
    "havainnot": [
      {
        "id": "iss014e15732",
        "aika": "2007-03-01",
        "teksti": "Geometriset haihdutusaltaat reunustavat Makgadikgadin suolatasankoa: tummanpunaiset lammikot ovat suolaa rakastavien levien värjäämiä, ja niiden reunoille on kiteytynyt valkoista soodaa ja suolaa. Suolavesi pumpataan pinnan alta ja haihdutetaan alueen aurinkoisessa ilmastossa. Tuotanto on jatkunut samalla paikalla vuodesta 1991 lähtien.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 14",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss014e15732/iss014e15732~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss014e15732/iss014e15732~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss014e15732"
      }
    ]
  },
  {
    "tunnus": "kaukasusvuoret",
    "nimi": "Kaukasusvuoret",
    "seutu": "Azerbaidžan ja Venäjä",
    "selite": "Euroopan ja Aasian rajalla kohoava lumihuippuinen vuorijono, jonka juurella lepää Kaukasuksen suurin tekojärvi.",
    "lat": 41.05,
    "lon": 47,
    "oletus": "iss071e041651",
    "havainnot": [
      {
        "id": "iss023e035670",
        "aika": "2010-05-08",
        "teksti": "Sama tekojärvi lähempää, neljätoista vuotta aiemmin kuvattuna. Mingečaurin allas täyttää Kuran laakson syvennystä Suur- ja Vähä-Kaukasuksen välissä, ja sen rannat on jaettu selkeisiin, suorakulmaisiin viljelylohkoihin.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 23",
        "kuvaaja": null,
        "mitat": [
          1920,
          1314
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss023e035670/iss023e035670~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss023e035670/iss023e035670~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss023e035670"
      },
      {
        "id": "iss071e041651",
        "aika": "2024-04-25",
        "teksti": "Lumipeitteiset Kaukasuksen huiput kohoavat Azerbaidžanin ja Venäjän rajaseudulla, ja kuvan yläreunassa kimaltaa Mingečaurin tekojärvi. Se on Kaukasuksen suurin allas, ja sitä käytetään kalastukseen, juomaveden hankintaan ja peltojen kasteluun. Kuva otettiin huhtikuussa 2024 avaruusaseman kiertäessä noin 415 kilometrin korkeudessa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 71",
        "kuvaaja": null,
        "mitat": [
          1920,
          1078
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss071e041651/iss071e041651~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss071e041651/iss071e041651~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss071e041651"
      }
    ]
  },
  {
    "tunnus": "guadalupen-pyorteet",
    "nimi": "Guadalupen saaren pyörteet",
    "seutu": "Tyynimeri, Meksiko",
    "selite": "Tulivuorisaari, jonka jyrkkä huippu pysäyttää matalan pilvikerroksen virtauksen ja synnyttää toistuvasti näyttäviä pilvipyörteiden ketjuja.",
    "lat": 29.03,
    "lon": -118.27,
    "oletus": "iss036e035663",
    "havainnot": [
      {
        "id": "iss036e035663",
        "aika": "2013-08-24",
        "teksti": "Guadalupen saaren korkea, tulivuorinen selänne katkaisee tasaisen pilvikerroksen virtauksen, ja saaren tuulen alle syntyy pyörteiden ketju eli von Kármánin pyörrekatu. Ilmiö on nimetty Theodore von Kármánin mukaan, joka kuvasi sen ensimmäisenä ja oli myöhemmin perustamassa NASAn JPL-tutkimuskeskusta. Pyörteiden sarja jatkuu satoja kilometrejä saaren taakse.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 36",
        "kuvaaja": "Karen Nyberg",
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss036e035663/iss036e035663~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss036e035663/iss036e035663~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss036e035663"
      },
      {
        "id": "iss040e016570",
        "aika": "2014-06-21",
        "teksti": "Sama saari lähes suoraan ylhäältä kuvattuna vajaan vuoden kuluttua. Pyörteet ovat nyt kiertyneet tiukemmiksi spiraaleiksi; niiden tarkka muoto riippuu kulloisestakin tuulen nopeudesta ja pilvikerroksen paksuudesta.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 40",
        "kuvaaja": "Alex Gerst",
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss040e016570/iss040e016570~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss040e016570/iss040e016570~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss040e016570"
      }
    ]
  },
  {
    "tunnus": "kanariansaarten-pyorteet",
    "nimi": "Kanariansaarten pyörteet",
    "seutu": "Atlantti, Espanja",
    "selite": "Saariketju, jonka tulivuorihuiput pysäyttävät passaatituulen alapilvet ja synnyttävät toistuvia pyörrekatuja valtamerelle.",
    "lat": 28.3,
    "lon": -16.5,
    "oletus": "s40-75-003",
    "havainnot": [
      {
        "id": "s40-75-003",
        "aika": "1991-06-14",
        "teksti": "Yksi Kanariansaarista lepää matalan pilvikerroksen keskellä kuin reikä valkoisessa peitteessä, ja sen taakse kiertyy peräkkäisiä pyörteitä. Passaattituulten yllä oleva lämmin ilmakerros lukitsee pilvet matalalle, jolloin saaren jyrkkä huippu muokkaa virtausta selvästi näkyväksi kuvioksi. Kuva otettiin sukkula Columbian STS-40-lennolla kesäkuussa 1991.",
        "kuvaustapa": "NASAn miehitetyltä lennolta",
        "retkikunta": null,
        "kuvaaja": null,
        "mitat": [
          1920,
          1920
        ],
        "kuva": "https://images-assets.nasa.gov/image/s40-75-003/s40-75-003~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/s40-75-003/s40-75-003~small.jpg",
        "sivu": "https://images.nasa.gov/details/s40-75-003"
      }
    ]
  },
  {
    "tunnus": "zagrosvuoret",
    "nimi": "Zagrosvuoret",
    "seutu": "Iran",
    "selite": "Iranin ylängön reunalla kohoava poimuvuoristo, jonka rinteet piirtyvät avaruudesta kuin sormenjäljet.",
    "lat": 33.5,
    "lon": 46.7,
    "oletus": "iss074e0315889",
    "havainnot": [
      {
        "id": "iss074e0315889",
        "aika": "2026-02-16",
        "teksti": "Kalliokerrokset ovat taittuneet mannerlaattojen puristuksessa pitkiksi, yhdensuuntaisiksi harjanteiksi. Kuvan yläreunassa harjanteiden laet kohoavat lumirajan yläpuolelle. Poimut ovat syntyneet, kun Arabian laatta on työntynyt hitaasti Euraasian laattaa vasten miljoonien vuosien ajan.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 74",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss074e0315889/iss074e0315889~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss074e0315889/iss074e0315889~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss074e0315889"
      }
    ]
  },
  {
    "tunnus": "lasvegas-yolla",
    "nimi": "Las Vegas yöllä",
    "seutu": "Nevada, Yhdysvallat",
    "selite": "Aavikkokaupunki, jonka suorakulmainen katuverkko ja kirkkaasti valaistu Strip erottuvat yöllä selvästi ympäröivästä pimeästä autiomaasta.",
    "lat": 36.17,
    "lon": -115.14,
    "oletus": "iss026e006255",
    "havainnot": [
      {
        "id": "iss026e006255",
        "aika": "2010-11-26",
        "teksti": "Las Vegasin kaupunkialue täyttää laakson Mojaven aavikon keskellä, ja kadut piirtävät säännöllisen ruudukon. Kirkkain, valkoinen valokimppu keskellä kuvaa on kuuluisa Strip, jonka kasinot ja hotellit ovat auki ympäri vuorokauden. Kaupungin ympärillä alkaa heti asumaton, pimeä aavikko.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 26",
        "kuvaaja": null,
        "mitat": [
          1920,
          1314
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss026e006255/iss026e006255~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss026e006255/iss026e006255~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss026e006255"
      }
    ]
  },
  {
    "tunnus": "iberia-yolla",
    "nimi": "Iberian niemimaa yöllä",
    "seutu": "Espanja ja Portugali",
    "selite": "Koko niemimaa yöllä: kaksi pääkaupunkia erottuu kirkkaimpina pisteinä valoverkon keskellä.",
    "lat": 40,
    "lon": -4.5,
    "oletus": "iss030e010008",
    "havainnot": [
      {
        "id": "iss030e010008",
        "aika": "2011-12-04",
        "teksti": "Espanjan ja Portugalin rannikot ja kaupungit piirtyvät oranssina valoverkkona. Madrid hehkuu kirkkaana pisteenä niemimaan keskellä, ja Lissabon loistaa rannikolla oikealla. Ilmakehän vihertävä hehku erottuu selvästi horisontin yllä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 30",
        "kuvaaja": null,
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss030e010008/iss030e010008~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss030e010008/iss030e010008~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss030e010008"
      }
    ]
  },
  {
    "tunnus": "labradorin-jaameri",
    "nimi": "Labradorin merijää",
    "seutu": "Kanada",
    "selite": "Kylmä Labradorin virta kuljettaa merijäätä ja jäävuoria etelään, ja jään reunalla näkyvät virtausten piirtämät pyörteet.",
    "lat": 54,
    "lon": -57,
    "oletus": "iss070e086805",
    "havainnot": [
      {
        "id": "iss070e086805",
        "aika": "2024-02-03",
        "teksti": "Merijää ajelehtii Labradorin rannikolla virtausten mukana, ja jään reuna piirtää näkyviin pyörteitä ja raitoja. Kuvan otti astronautti Loral O'Hara käsikamerallaan helmikuussa 2024. Saman talven aikana Arktiksen merijää kasvoi tutkijoiden mukaan tavallista hitaammin.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 70",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss070e086805/iss070e086805~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss070e086805/iss070e086805~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss070e086805"
      }
    ]
  },
  {
    "tunnus": "lake-sharpe",
    "nimi": "Lake Sharpe ja kastelurenkaat",
    "seutu": "Etelä-Dakota, Yhdysvallat",
    "selite": "Missourijoen entinen mutka padottiin tekojärveksi, ja sen niemekkeelle piirtyy pyöreiden keskipistekastelukoneiden kuvio.",
    "lat": 44.07,
    "lon": -99.57,
    "oletus": "iss038e023651",
    "havainnot": [
      {
        "id": "iss038e023651",
        "aika": "2013-12-30",
        "teksti": "Missourijoen entinen mutka on nyt Lake Sharpe -tekojärven lahti, ja sen sisäkaarteeseen jäänyt niemeke on täynnä pyöreitä keskipistekastelun kenttiä. Missourijoki on Pohjois-Amerikan pisin joki, ja sen alajuoksua on padottu useaan otteeseen 1900-luvulla. Kuva otettiin joulukuussa 2013, ennen talven lumia.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 38",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss038e023651/iss038e023651~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss038e023651/iss038e023651~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss038e023651"
      }
    ]
  },
  {
    "tunnus": "new-orleans-mutka",
    "nimi": "New Orleans ja joen mutka",
    "seutu": "Louisiana, Yhdysvallat",
    "selite": "Mississippijoki kiemurtelee kaupungin läpi niin jyrkästi, että New Orleansia kutsutaan Puolikuun kaupungiksi.",
    "lat": 29.95,
    "lon": -90.07,
    "oletus": "iss039e001640",
    "havainnot": [
      {
        "id": "iss039e001640",
        "aika": "2014-03-13",
        "teksti": "Mississippijoen ruskea vesi kiertää New Orleansin keskustan läpi kahdessa jyrkässä mutkassa. Oikeassa alakulmassa Pontchartrain-järvi kimaltaa auringon heijastuksessa. Kuva on otettu 400 millimetrin polttovälillä maaliskuussa 2014.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 39",
        "kuvaaja": "Rick Mastracchio",
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss039e001640/iss039e001640~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss039e001640/iss039e001640~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss039e001640"
      }
    ]
  },
  {
    "tunnus": "rio-negro-mutkat",
    "nimi": "Río Negron mutkat",
    "seutu": "Patagonia, Argentiina",
    "selite": "Yksi Etelä-Amerikan mutkittelevimmista joista kiemurtelee Patagonian tasangon poikki lukemattomina hylättyinä lenkkeinä.",
    "lat": -40.5,
    "lon": -63.5,
    "oletus": "iss022e019513",
    "havainnot": [
      {
        "id": "iss022e019513",
        "aika": "2010-01-04",
        "teksti": "Río Negron nykyinen uoma ja lukuisat entiset jokilenkit erottuvat tummina käyrinä kuivalla tasangolla. Yksi hylätyistä lenkeistä hohtaa oranssina, todennäköisesti kuivuneen kasvillisuuden värjäämänä. Joki tunnetaan astronauttien keskuudessa juuri poikkeuksellisen mutkittelevasta uomastaan.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 22",
        "kuvaaja": null,
        "mitat": [
          1920,
          1311
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss022e019513/iss022e019513~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss022e019513/iss022e019513~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss022e019513"
      }
    ]
  },
  {
    "tunnus": "ebron-suisto",
    "nimi": "Ebron suisto",
    "seutu": "Espanja",
    "selite": "Riisiviljelysten pilkkoma suisto, jossa joen makea vesi ja Välimeren suolainen vesi kohtaavat.",
    "lat": 40.72,
    "lon": 0.72,
    "oletus": "iss009e09985",
    "havainnot": [
      {
        "id": "iss009e09985",
        "aika": "2004-06-03",
        "teksti": "Ebro-joki laskee Välimereen kolmiomaisena suistona, jonka pintaa peittävät geometriset riisipellot. Kuva on otettu auringon kimmellyksessä, joka paljastaa joen makean veden rajapinnan suolaisempaa merta vasten. Yläjuoksun padot ovat vähentäneet suistoon päätyvän veden ja kiintoaineksen määrää.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 9",
        "kuvaaja": null,
        "mitat": [
          1920,
          1271
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss009e09985/iss009e09985~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss009e09985/iss009e09985~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss009e09985"
      }
    ]
  },
  {
    "tunnus": "selengan-suisto",
    "nimi": "Selengajoen suisto",
    "seutu": "Burjatia, Venäjä",
    "selite": "Baikal-järven suurimman sivujoen suisto, joka suodattaa vettä ennen kuin se päätyy järveen.",
    "lat": 52.16,
    "lon": 106.5,
    "oletus": "iss029e037915",
    "havainnot": [
      {
        "id": "iss029e037915",
        "aika": "2011-11-03",
        "teksti": "Selengajoki haarautuu lukemattomiksi kanaviksi ja koukeroisiksi harjanteiksi ennen laskuaan Baikal-järveen. Tuore lumi korostaa suiston lohkomaista, viuhkamaista muotoa. Suiston laajuus ja muoto riippuvat siitä, kuinka paljon kiintoainesta joki kuljettaa mukanaan.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 29",
        "kuvaaja": null,
        "mitat": [
          1920,
          1275
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss029e037915/iss029e037915~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss029e037915/iss029e037915~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss029e037915"
      }
    ]
  },
  {
    "tunnus": "texasin-kastelurenkaat",
    "nimi": "Länsi-Texasin kastelurenkaat",
    "seutu": "Texas, Yhdysvallat",
    "selite": "Permin altaan öljynporausalue ja pyöreät kastelupellot limittyvät samalle kuivalle tasangolle.",
    "lat": 32,
    "lon": -102.1,
    "oletus": "iss074e0603632",
    "havainnot": [
      {
        "id": "iss074e0603632",
        "aika": "2026-05-16",
        "teksti": "Satoja pyöreitä keskipistekastelun kenttiä peittää Länsi-Texasin tasankoa, ja niiden joukossa erottuu öljynporauslaitteita ja teitä vaaleina pilkkuina. Alue lepää Permin altaan päällä, joka on yksi maailman tuottavimmista öljyesiintymistä. Kastelu tekee viljelyn mahdolliseksi muuten kuivalla aavikkoalueella.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 74",
        "kuvaaja": null,
        "mitat": [
          1920,
          1078
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss074e0603632/iss074e0603632~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss074e0603632/iss074e0603632~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss074e0603632"
      }
    ]
  },
  {
    "tunnus": "ningaloo-riutta",
    "nimi": "Ningaloo-riutta",
    "seutu": "Länsi-Australia",
    "selite": "Mantereen laidalle kasvanut reunariutta erottaa turkoosin matalikon syvästä valtamerestä pitkän niemen länsipuolella.",
    "lat": -22.7,
    "lon": 113.85,
    "oletus": "sts067-722a-053",
    "havainnot": [
      {
        "id": "sts067-722a-053",
        "aika": "1995-03-17",
        "teksti": "Ningaloo-riutta kulkee ohuena turkoosina reunuksena Luoteisniemen länsirannalla aivan mantereen laidassa. Niemen itäpuolella avautuu Exmouth-lahti, jonka sameaan veteen hurrikaani Bobbyn tulvat olivat huuhtoneet punaista mutaa viikkoa aiemmin. Riutta on yksi harvoista suurista koralliriutoista, jotka kasvavat kiinni mantereeseen kaukana avomerellä sijaitsevien riuttojen sijaan.",
        "kuvaustapa": "Avaruussukkulasta",
        "retkikunta": null,
        "kuvaaja": null,
        "mitat": [
          1920,
          1920
        ],
        "kuva": "https://images-assets.nasa.gov/image/sts067-722a-053/sts067-722a-053~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/sts067-722a-053/sts067-722a-053~small.jpg",
        "sivu": "https://images.nasa.gov/details/sts067-722a-053"
      }
    ]
  },
  {
    "tunnus": "niagara",
    "nimi": "Niagaranputous",
    "seutu": "New York, Yhdysvallat ja Ontario, Kanada",
    "selite": "Niagaranjoki ja sen kuuluisa putous muodostavat luonnollisen rajan Yhdysvaltojen ja Kanadan välille.",
    "lat": 43.08,
    "lon": -79.07,
    "oletus": "iss010e17563",
    "havainnot": [
      {
        "id": "iss010e17563",
        "aika": "2005-02-11",
        "teksti": "Talvinen näkymä Niagaranjoelta helmikuussa 2005: joki mutkittelee lumisen maiseman halki ja erottaa Yhdysvallat ja Kanadan toisistaan. Kuvan alaosassa erottuu jokiuoman jyrkkä silmukka, Niagaran pyörre, joka syntyi kun putous on vuosituhansien aikana kaivautunut taaksepäin kalliopohjaan. Itse putous jää kuvassa lumipeitteisen maiseman keskelle, mutta sen tekemä jälki näkyy koko jokilaaksossa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 10",
        "kuvaaja": null,
        "mitat": [
          1920,
          1271
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss010e17563/iss010e17563~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss010e17563/iss010e17563~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss010e17563"
      },
      {
        "id": "iss015e05624",
        "aika": "2007-04-29",
        "teksti": "Sama alue huhtikuussa 2007, kun Erie-järven talvijää on juuri sulanut ja lähtenyt liikkeelle Niagaranjokea pitkin. Vaalea, jäänmurskaa täynnä oleva joki erottuu selvästi jo sulaneesta, tummasta vedestä. Erie-järven suulle asennettu jääpuomi pidättelee jäätä joka talvi, jotta se ei tukkisi voimalaitosten vedenottoa.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 15",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss015e05624/iss015e05624~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss015e05624/iss015e05624~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss015e05624"
      }
    ]
  },
  {
    "tunnus": "gronlannin-vuonot",
    "nimi": "Grönlannin vuonot",
    "seutu": "Lounais-Grönlanti, Tanska",
    "selite": "Grönlannin lounaisrannikko on satojen jääkauden veistämien vuonojen pirstoma, ja saaren sisäosaa peittää kilometrien paksuinen mannerjää.",
    "lat": 60.72,
    "lon": -46.03,
    "oletus": "sts066-114-031",
    "havainnot": [
      {
        "id": "sts066-114-031",
        "aika": "1994-11-14",
        "teksti": "Marraskuussa 1994 otettu kuva näyttää Grönlannin lounaisrannikon vuonoverkoston lähellä Kap Farvelia ja Julianehåbin lahtea. Rannikon terävät niemet ja syvät lahdet erottuvat selvästi sisämaan tasaisesta, valkoisesta jäätikköylängöstä. Grönlannin mannerjää on paksuimmillaan lähes 3,5 kilometriä, ja sen reunoilta valuu jäätikkövirtoja, jotka murtuvat mereen jäävuoriksi.",
        "kuvaustapa": "Avaruussukkulasta",
        "retkikunta": null,
        "kuvaaja": null,
        "mitat": [
          1920,
          1916
        ],
        "kuva": "https://images-assets.nasa.gov/image/sts066-114-031/sts066-114-031~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/sts066-114-031/sts066-114-031~small.jpg",
        "sivu": "https://images.nasa.gov/details/sts066-114-031"
      }
    ]
  },
  {
    "tunnus": "manaus",
    "nimi": "Vetten kohtaaminen Manausissa",
    "seutu": "Amazonas, Brasilia",
    "selite": "Manausin kaupungin kohdalla tumma Rio Negro ja samea Solimões-joki yhtyvät muodostaen Amazon-joen, mutta niiden vedet sekoittuvat toisiinsa vasta kilometrien päässä.",
    "lat": -3.1,
    "lon": -59.99,
    "oletus": "iss009e15488",
    "havainnot": [
      {
        "id": "iss009e15488",
        "aika": "2004-07-20",
        "teksti": "Heinäkuussa 2004 otettu kuva näyttää, miten Solimõesin vaaleanruskea, sedimenttipitoinen vesi virtaa kaupungin ohi kuvan alalaitaa kohti, kun taas Rio Negron tummempi vesi tulee oikealta. Manausin kaupunki erottuu keskellä terävänä, ruutukaavamaisena alueena jokikielekkeen kärjessä. Vedet eivät sekoitu heti, koska niiden lämpötila, virtausnopeus ja tiheys eroavat toisistaan – ilmiö jatkuu jokien yhtymäkohdasta kymmenien kilometrien päähän.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 9",
        "kuvaaja": null,
        "mitat": [
          1920,
          1271
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss009e15488/iss009e15488~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss009e15488/iss009e15488~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss009e15488"
      }
    ]
  },
  {
    "tunnus": "cosiguina",
    "nimi": "Cosigüinan tulivuori",
    "seutu": "Nicaragua",
    "selite": "Cosigüinan tulivuoren huippua peittää kraatterijärvi niemellä, joka sulkee Fonsecanlahden suuta Tyynenmeren rannikolla Nicaraguassa.",
    "lat": 12.98,
    "lon": -87.58,
    "oletus": "iss016e010894",
    "havainnot": [
      {
        "id": "iss016e010894",
        "aika": "2007-11-17",
        "teksti": "Marraskuussa 2007 otettu kuva näyttää Cosigüinan tulivuoren pyöreän tunturin ja sen huipulla lepäävän kraatterijärven, Laguna Cosigüinan. Vuoren juurella erottuu Fonsecanlahden sameaa vettä, joka virtaa jokisuistosta Tyynellemerelle. Vuori purkautui viimeksi vuonna 1859, mutta sen vuoden 1835 purkaus oli Keski-Amerikan historian suurin: tuhkaa levisi aina Meksikoon ja Jamaikalle asti.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 16",
        "kuvaaja": null,
        "mitat": [
          1920,
          1307
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss016e010894/iss016e010894~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss016e010894/iss016e010894~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss016e010894"
      }
    ]
  },
  {
    "tunnus": "jamesinlahti-harjanteet",
    "nimi": "Jamesinlahden rantaharjanteet",
    "seutu": "Ontario ja Québec, Kanada",
    "selite": "Jamesinlahden etelärannalla maankamara nousee yhä, koska jääkauden mannerjää painoi sitä alas tuhansien vuosien ajan.",
    "lat": 51.05,
    "lon": -80,
    "oletus": "STS099-706-090",
    "havainnot": [
      {
        "id": "STS099-706-090",
        "aika": "2000-03-14",
        "teksti": "Helmikuussa 2000 kuvattu Hannah Bay Jamesinlahden eteläosassa näyttää kymmeniä toisiaan seuraavia vaaleita harjanteita, jotka ovat entisiä rantaviivoja. Kun mannerjää suli viimeisen jääkauden jälkeen, maa alkoi hitaasti kohota ja meri perääntyi, jättäen jälkeensä nämä 100–200 metriä leveät muinaiset rantavallit. Ilmiö jatkuu yhä: Hudsoninlahden ja Jamesinlahden ranta-alueet ovat yksi maapallon nopeimmin kohoavista alueista.",
        "kuvaustapa": "Avaruussukkulasta",
        "retkikunta": null,
        "kuvaaja": null,
        "mitat": [
          1907,
          1920
        ],
        "kuva": "https://images-assets.nasa.gov/image/STS099-706-090/STS099-706-090~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/STS099-706-090/STS099-706-090~small.jpg",
        "sivu": "https://images.nasa.gov/details/STS099-706-090"
      }
    ]
  },
  {
    "tunnus": "krimin-lagunit",
    "nimi": "Krimin värilliset lagunit",
    "seutu": "Krimin niemimaa",
    "selite": "Krimin niemimaan matalat rannikkolagunit hehkuvat turkoosina, punaisena ja violettina, koska niiden suola- ja levämäärä vaihtelee lammikoittain.",
    "lat": 45.35,
    "lon": 36.3,
    "oletus": "iss056e032828",
    "havainnot": [
      {
        "id": "iss056e032828",
        "aika": "2018-06-24",
        "teksti": "Kesäkuussa 2018 otettu kuva näyttää sarjan pieniä rannikkolaguuneja Krimillä, Atsovanmeren ja Mustanmeren välissä. Jokainen allas hohtaa omaa väriään – turkoosia, vaaleanpunaista, viininpunaista – koska veden suolapitoisuus, syvyys ja mikrolevien määrä poikkeavat toisistaan lammikosta toiseen. Krim on kansainvälisesti tunnustettu osaksi Ukrainaa, mutta Venäjä on hallinnoinut aluetta vuodesta 2014 lähtien.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 56",
        "kuvaaja": null,
        "mitat": [
          1280,
          1920
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss056e032828/iss056e032828~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss056e032828/iss056e032828~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss056e032828"
      }
    ]
  },
  {
    "tunnus": "valakian-tasanko",
    "nimi": "Valakian tasanko yöllä",
    "seutu": "Romania",
    "selite": "Yöllä otetussa kuvassa Karpaateilta Valakian tasangolle laskevat joet erottuvat siitä, miten asutuksen valot seuraavat jokilaaksoja.",
    "lat": 45.3,
    "lon": 25.3,
    "oletus": "iss074e0149572",
    "havainnot": [
      {
        "id": "iss074e0149572",
        "aika": "2026-01-18",
        "teksti": "Tammikuussa 2026 otettu yökuva näyttää, kuinka kylien ja kaupunkien valot haarautuvat puumaiseksi kuvioksi seuraten jokilaaksoja, jotka virtaavat Karpaateilta Romanian Valakian tasangon hedelmällisille alangoille. Tummat, valottomat alueet kuvion välissä ovat vuorten metsäisiä, harvaan asuttuja rinteitä. Valakia on Romanian väkirikkain alue, ja sen eteläosassa sijaitsee myös pääkaupunki Bukarest.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 74",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss074e0149572/iss074e0149572~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss074e0149572/iss074e0149572~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss074e0149572"
      }
    ]
  },
  {
    "tunnus": "montreal",
    "nimi": "Montréal",
    "seutu": "Québec, Kanada",
    "selite": "Montréal on rakennettu saarelle, jonka kärjessä Ottawa-joki yhtyy Saint Lawrence -jokeen.",
    "lat": 45.5,
    "lon": -73.57,
    "oletus": "sts060-94-072",
    "havainnot": [
      {
        "id": "sts060-94-072",
        "aika": "1994-02-09",
        "teksti": "Helmikuussa 1994 kuvattu lumipeitteinen Montréal näkyy tarkkarajaisena saarena, jonka pääväylät ja katuverkko erottuvat valkoista lunta vasten. Kaupungin keskellä kohoava Mont Royal -puisto erottuu tummana, metsäisenä kukkulana keskustan yllä. Montréal on Kanadan toiseksi suurin kaupunki ja maailman toiseksi suurin ranskankielinen kaupunki Pariisin jälkeen, vaikka se sijaitsee lähes 1 600 kilometrin päässä merestä.",
        "kuvaustapa": "Avaruussukkulasta",
        "retkikunta": null,
        "kuvaaja": null,
        "mitat": [
          1903,
          1920
        ],
        "kuva": "https://images-assets.nasa.gov/image/sts060-94-072/sts060-94-072~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/sts060-94-072/sts060-94-072~small.jpg",
        "sivu": "https://images.nasa.gov/details/sts060-94-072"
      }
    ]
  },
  {
    "tunnus": "englanninkanaali-yolla",
    "nimi": "Englannin kanaali yöllä",
    "seutu": "Iso-Britannia, Ranska, Belgia ja Alankomaat",
    "selite": "Englannin kanaalin molemmin puolin syttyvät Lontoon, Amsterdamin, Brysselin ja niiden naapurikaupunkien valot yhdeksi Euroopan tiheimmin asutuksi yövyöhykkeeksi.",
    "lat": 51.2,
    "lon": 2,
    "oletus": "iss058e005276",
    "havainnot": [
      {
        "id": "iss058e005276",
        "aika": "2019-01-18",
        "teksti": "Tammikuussa 2019 otettu yökuva näyttää Englannin kanaalin molemmin puolin loistavat kaupungit: oikealla Lontoo, vasemmalla myötäpäivään Amsterdam, Haag, Rotterdam, Antwerpen ja Bryssel. Itse kanaali erottuu kuvan keskellä täysin pimeänä vyönä, koska merellä ei ole maakohteiden valoja. Kanaalin ali kulkee Eurotunneli, ja sen vedet ovat yksi maailman vilkkaimmin liikennöidyistä merireiteistä.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 58",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss058e005276/iss058e005276~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss058e005276/iss058e005276~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss058e005276"
      }
    ]
  },
  {
    "tunnus": "tanska",
    "nimi": "Tanskan saaristo",
    "seutu": "Tanska",
    "selite": "Tanska koostuu Jyllannin niemimaasta ja yli 400 saaresta, jotka pistävät esiin meren sinestä kuin palapelin palat.",
    "lat": 55.5,
    "lon": 9.8,
    "oletus": "iss039e017228",
    "havainnot": [
      {
        "id": "iss039e017228",
        "aika": "2014-04-28",
        "teksti": "Kuvassa näkyy Tanskan keskiosa: vasemmalla Jyllannin niemimaan itärannikko, keskellä pyöreähkö Fynin saari ja oikealla saaristo, joka jatkuu kohti Sjællantia. Kesäinen kuva näyttää maan poikkeuksellisen tasaisena ja vihreänä, sillä Tanskassa ei ole yhtään yli 200 metrin korkeuteen nousevaa kukkulaa. Maan yli 400 saaresta noin 70 on asuttuja, ja monet niistä on yhdistetty toisiinsa silloilla.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 39",
        "kuvaaja": "Rick Mastracchio",
        "mitat": [
          1920,
          1277
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss039e017228/iss039e017228~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss039e017228/iss039e017228~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss039e017228"
      }
    ]
  },
  {
    "tunnus": "geneven-jarvi",
    "nimi": "Geneven järvi",
    "seutu": "Sveitsi ja Ranska",
    "selite": "Geneven järven puolikuun muotoinen allas lepää Alppien juurella Sveitsin ja Ranskan rajalla.",
    "lat": 46.45,
    "lon": 6.5,
    "oletus": "sts068-243-076",
    "havainnot": [
      {
        "id": "sts068-243-076",
        "aika": "1994-09-30",
        "teksti": "Syyskuussa 1994 otettu kuva näyttää Geneven järven sinisenä puolikuuna Alppien lumihuippujen keskellä. Järveä ruokkii Rhône-joki, joka syntyy alppijäätiköiltä ja virtaa järven läpi matkallaan kohti Välimerta. Järvi on tilavuudeltaan Länsi-Euroopan suurin, ja Ranskan ja Sveitsin raja kulkee sitä pitkin lähes keskeltä.",
        "kuvaustapa": "Avaruussukkulasta",
        "retkikunta": null,
        "kuvaaja": null,
        "mitat": [
          1920,
          1904
        ],
        "kuva": "https://images-assets.nasa.gov/image/sts068-243-076/sts068-243-076~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/sts068-243-076/sts068-243-076~small.jpg",
        "sivu": "https://images.nasa.gov/details/sts068-243-076"
      }
    ]
  },
  {
    "tunnus": "pico",
    "nimi": "Pico-tulivuori",
    "seutu": "Azorit, Portugali",
    "selite": "Portugalin korkein vuori, Pico, on jyrkkäpiirteinen tulivuori keskellä Atlantin valtamerta Azoreilla.",
    "lat": 38.47,
    "lon": -28.4,
    "oletus": "iss036e009390",
    "havainnot": [
      {
        "id": "iss036e009390",
        "aika": "2013-06-18",
        "teksti": "Kesäkuussa 2013 otettu pystykuva näyttää Pico-saaren pitkänomaisena vihreänä muotona Atlantilla; saaren itäpäässä kohoaa 2 351 metriä korkea Pico-tulivuori huippukraattereineen. Vuori on koko Portugalin korkein kohta, vaikka se sijaitsee tuhansien kilometrien päässä Euroopan mantereesta. Saaren länsiosan viinitarhat kasvavat mustan laavakiven ruutujen suojissa, ja perinne on nykyään Unescon maailmanperintökohde.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 36",
        "kuvaaja": null,
        "mitat": [
          1920,
          1275
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss036e009390/iss036e009390~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss036e009390/iss036e009390~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss036e009390"
      }
    ]
  },
  {
    "tunnus": "prinssiedwardinsaari",
    "nimi": "Prinssi Edwardin saari",
    "seutu": "Saint Lawrencenlahti, Kanada",
    "selite": "Kanadan pienin provinssi on punamultainen, sirppimäinen saari Saint Lawrencenlahdella.",
    "lat": 46.51,
    "lon": -63.42,
    "oletus": "iss067e035819",
    "havainnot": [
      {
        "id": "iss059e019410",
        "aika": "2019-04-11",
        "teksti": "Huhtikuussa 2019 kuvattu laajempi näkymä samalta alueelta näyttää Saint Lawrencenlahden, Prinssi Edwardin saaren sekä osia Québecistä ja Uudesta-Brunswickista yhdellä silmäyksellä. Saari on tunnettu myös kirjailija L. M. Montgomeryn Anna-kirjoista, jotka sijoittuvat sen maalaismaisemiin. Manterelle saaren yhdistää Confederation-silta, joka on yksi maailman pisimmistä jääpeitteisen veden yli rakennetuista silloista.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 59",
        "kuvaaja": "David Saint-Jacques",
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss059e019410/iss059e019410~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss059e019410/iss059e019410~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss059e019410"
      },
      {
        "id": "iss067e035819",
        "aika": "2022-05-07",
        "teksti": "Toukokuussa 2022 otettu kuva auringon kimallellessa merestä näyttää Prinssi Edwardin saaren tumman sirpin Saint Lawrencenlahdella, Uuden-Brunswickin ja Uuden-Skotlannin välissä. Kirkas heijastus meren pinnalla korostaa rannikon muotoja tavallista tarkemmin. Saari on Kanadan pienin provinssi, ja sen punamulta syntyy maaperän runsaasta rautapitoisuudesta.",
        "kuvaustapa": "Kansainväliseltä avaruusasemalta",
        "retkikunta": "Retkikunta 67",
        "kuvaaja": null,
        "mitat": [
          1920,
          1280
        ],
        "kuva": "https://images-assets.nasa.gov/image/iss067e035819/iss067e035819~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss067e035819/iss067e035819~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss067e035819"
      }
    ]
  }
];
