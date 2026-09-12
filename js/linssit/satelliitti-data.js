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
 * Haettu: 2026-09-12. Kohteita 64, kuvia 83.
 */

export const SATELLIITTI_LAHDE = {
  "aineisto": "Astronauttien Maa-kuvat",
  "tekija": "NASA",
  "lisenssi": "Public domain",
  "osoite": "https://images.nasa.gov/",
  "katalogi": "https://images-api.nasa.gov/search?media_type=image",
  "haettu": "2026-09-12"
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
        "kuva": "https://images-assets.nasa.gov/image/iss005e19024/iss005e19024~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss005e19024/iss005e19024~small.jpg",
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
        "kuva": "https://images-assets.nasa.gov/image/iss013e62714/iss013e62714~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss013e62714/iss013e62714~small.jpg",
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
        "kuva": "https://images-assets.nasa.gov/image/iss020e009048/iss020e009048~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss020e009048/iss020e009048~small.jpg",
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
        "kuva": "https://images-assets.nasa.gov/image/iss014e17165/iss014e17165~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss014e17165/iss014e17165~small.jpg",
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
        "kuva": "https://images-assets.nasa.gov/image/iss025e009858/iss025e009858~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss025e009858/iss025e009858~small.jpg",
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
        "kuva": "https://images-assets.nasa.gov/image/iss002e5693/iss002e5693~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss002e5693/iss002e5693~small.jpg",
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
        "kuva": "https://images-assets.nasa.gov/image/iss010e12917/iss010e12917~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss010e12917/iss010e12917~small.jpg",
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
        "kuva": "https://images-assets.nasa.gov/image/iss026e016287/iss026e016287~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss026e016287/iss026e016287~small.jpg",
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
        "kuva": "https://images-assets.nasa.gov/image/iss024e011914/iss024e011914~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss024e011914/iss024e011914~small.jpg",
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
        "kuva": "https://images-assets.nasa.gov/image/iss013e65526/iss013e65526~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss013e65526/iss013e65526~small.jpg",
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
        "kuva": "https://images-assets.nasa.gov/image/iss015e29867/iss015e29867~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss015e29867/iss015e29867~small.jpg",
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
        "kuva": "https://images-assets.nasa.gov/image/iss018e038182/iss018e038182~large.jpg",
        "pikku": "https://images-assets.nasa.gov/image/iss018e038182/iss018e038182~small.jpg",
        "sivu": "https://images.nasa.gov/details/iss018e038182"
      }
    ]
  }
];
