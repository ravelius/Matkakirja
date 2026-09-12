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
 * Haettu: 2026-09-12. Kohteita 26, kuvia 37.
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
  }
];
