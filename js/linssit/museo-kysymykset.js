/**
 * Taidemuseo-linssin valmiit kysymykset ja esikirjoitetut vastaukset
 * (omistaja 12.10.2026 klo 22.2x: museossa Pulu tarjosi kartan kysymyksiä;
 * junaan 186). Rakenne sama kuin js/linssit/astronaut-kysymykset.js ja
 * ihmisen-matka-kysymykset.js: avain on teoksen tunnus täsmälleen
 * (Resources/Museo/alankomaat/teokset.json, isot kirjaimet säilyvät),
 * kaksi kysymystä (≤ 60 merkkiä) ja niille vastaukset lähteineen.
 * Avain "_museo" = kaksi yleistä kysymystä taidemuseosta (kun yksikään teos
 * ei ole auki, esim. kävely huoneesta toiseen).
 * Kaikki 64 teosta (Natiivi-UI:n lista 12.10.2026) ja _museo toimitettu.
 *
 * Tiedot ovat verifioitu kahdella erillisellä Sonnet-agentilla (kirjoittaja
 * ja riippumaton tarkistaja); epävarmat väitteet on jätetty pois.
 */
export const MUSEO_KYSYMYKSET = {
  "_museo": {
    "kysymykset": [
      "Miksi vanhoihin maalauksiin tulee halkeamia?",
      "Miksi maalaustaide kukoisti Alankomaissa 1600-luvulla?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi vanhoihin maalauksiin tulee halkeamia?",
        "vastaus": "Ikääntyessään maali- ja pohjakerrokset muuttuvat jäykemmiksi ja hauraammiksi. Kosteuden ja lämpötilan vaihtelut saavat kankaan tai paneelin laajenemaan ja kutistumaan, mutta kerrokset eivät taivu mukana, joten ne halkeavat jännityksen purkamiseksi. Siksi museot pitävät sisäilman olosuhteet mahdollisimman vakaina.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Craquelure",
            "title": "en-Wikipedia: Craquelure"
          },
          {
            "url": "https://link.springer.com/10.1186/s40494-020-0352-0",
            "title": "Heritage Science (2020): craquelure"
          }
        ]
      },
      {
        "kysymys": "Miksi maalaustaide kukoisti Alankomaissa 1600-luvulla?",
        "vastaus": "Kalvinismi kielsi uskonnolliset maalaukset kirkoissa, joten kirkon tilaukset vähenivät ja taiteilijat siirtyivät maallisiin aiheisiin, kuten muotokuviin, maisemiin ja asetelmiin. Kaupunkien kauppiaat ja keskiluokka ostivat maalauksia koteihinsa, ja moni teos tehtiin ilman tilausta myyntiin esimerkiksi markkinoilla. Suuren tuotantomäärän vuoksi hinnat olivat melko matalat tunnetuimpia taiteilijoita lukuun ottamatta.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Dutch_Golden_Age_painting",
            "title": "en-Wikipedia: Dutch Golden Age painting"
          },
          {
            "url": "https://pure.eur.nl/en/publications/a-mass-market-for-the-visual-arts-the-golden-age-of-dutch-paintin/",
            "title": "Erasmus University: A mass market for the visual arts"
          }
        ]
      }
    ]
  },
  "SK-C-251": {
    "kysymykset": [
      "Mikä kartta roikkuu Vermeerin kirjeenlukijan takana?",
      "Mitä Sinipukuisen kirjeenlukijan entisöinti paljasti?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä kartta roikkuu Vermeerin kirjeenlukijan takana?",
        "vastaus": "Naisen takana seinällä on Hollannin kreivikunnan ja Länsi-Friisin kartta, jonka Balthasar Florisz. van Berckenrode laati 1620 ja Willem Blaeu julkaisi uudelleen 1621. Maalauksessa kartta on yksivärinen, ja röntgenkuvan mukaan Vermeer levensi sitä vasemmalle maalatessaan. Karttaa on tulkittu viittaukseksi poissaolevaan rakastettuun tai matkustavaan mieheen, mutta se on tulkintaa.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Woman_Reading_a_Letter_(Vermeer)",
            "title": "en-Wikipedia: Woman Reading a Letter (Vermeer)"
          },
          {
            "url": "https://www.essentialvermeer.com/cat_about/blue.html",
            "title": "Essential Vermeer: Woman in Blue"
          },
          {
            "url": "https://www.codart.nl/?p=2890",
            "title": "CODART: Woman Reading a Letter"
          }
        ]
      },
      {
        "kysymys": "Mitä Sinipukuisen kirjeenlukijan entisöinti paljasti?",
        "vastaus": "Vuosien 2010-2011 entisöinnissä poistettiin kellastunut vernissa, ja Vermeerin siniset sävyt tulivat esiin täydellä voimallaan. Tuolin alla oleva seinäosa oli alun perin purppuranpuhuvan sininen, mutta se oli myöhemmin maalattu ylemmän seinän vihertävänharmaaksi. Tutkimus näytti myös, että Vermeer muutti sommitelmaa maalausvaiheessa.",
        "lahteet": [
          {
            "url": "https://www.essentialvermeer.com/cat_about/blue.html",
            "title": "Woman in Blue Reading a Letter - Essential Vermeer"
          },
          {
            "url": "https://www.codart.nl/?p=2890",
            "title": "Woman in Blue Reading a Letter - CODART"
          }
        ]
      }
    ]
  },
  "SK-A-2860": {
    "kysymykset": [
      "Missä Vermeerin Pieni katu sijaitsee?",
      "Kenen talo on Pienessä kadussa oikealla?"
    ],
    "vastaukset": [
      {
        "kysymys": "Missä Vermeerin Pieni katu sijaitsee?",
        "vastaus": "Rijksmuseo sijoittaa kadun Delftin Vlamingstraatille, nykyisten numeroiden 40 ja 42 kohdalle. Taidehistorioitsija Frans Grijzenhout tunnisti paikan 2015 vuoden 1667 laituri- ja kanavamaksurekisterin avulla, josta selviävät talojen ja porttikäytävien leveydet. Aiemmin ehdokkaina olivat muun muassa Voldersgracht ja Nieuwe Langendijk.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-2860",
            "title": "View of Houses in Delft, Known as 'The Little Street' - Rijksmuseum"
          },
          {
            "url": "https://www.codart.nl/research-study/exact-location-of-vermeer-s-the-little-street-discovered/",
            "title": "Exact location of Vermeer's The Little Street discovered - CODART"
          }
        ]
      },
      {
        "kysymys": "Kenen talo on Pienessä kadussa oikealla?",
        "vastaus": "Oikeanpuoleinen talo kuului Vermeerin tädille, leskelle Ariaentgen Claesille, joka asui siinä lastensa kanssa noin vuodesta 1645 kuolemaansa 1670. Hän elätti perheensä myymällä pötsiä, ja talon viereistä käytävää kutsuttiin nimellä Penspoort eli pötsiportti. Maalauksen hahmojen henkilöllisyyttä ei tiedetä.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-2860",
            "title": "View of Houses in Delft, Known as 'The Little Street' - Rijksmuseum"
          },
          {
            "url": "https://en.wikipedia.org/wiki/The_Little_Street",
            "title": "The Little Street - Wikipedia"
          }
        ]
      }
    ]
  },
  "RP-P-OB-602": {
    "kysymykset": [
      "Mistä Sadan guldenin vedos on saanut nimensä?",
      "Mitä Sadan guldenin vedoksessa tapahtuu?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mistä Sadan guldenin vedos on saanut nimensä?",
        "vastaus": "Nimi viittaa summaan, 100 guldeniin, jonka vedoksesta kerrotaan maksetun. Jo vuonna 1654 kirjeessä todettiin sen myyneen Hollannissa monta kertaa 100 guldenilla tai enemmän, ja Metropolitan-museo pitää tarinaa Rembrandtin takaisinostosta epäluotettavana. Vedos tunnetaan myös nimillä Kristus parantaa sairaita ja Kristus saarnaa. Rembrandt teki sen noin 1647–1649.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Hundred_Guilder_Print",
            "title": "en-Wikipedia: Hundred Guilder Print"
          },
          {
            "url": "https://www.metmuseum.org/art/collection/search/371732",
            "title": "Metropolitan Museum: Hundred Guilder Print"
          },
          {
            "url": "https://collections.tepapa.govt.nz/object/43734",
            "title": "Te Papa: Hundred Guilder Print"
          }
        ]
      },
      {
        "kysymys": "Mitä Sadan guldenin vedoksessa tapahtuu?",
        "vastaus": "Vedos yhdistää yhteen kuvaan useita Matteuksen evankeliumin 19. luvun tapahtumia: Kristus parantaa sairaita, väittelee oppineiden kanssa ja kutsuu luokseen lapsia. Oikealla pimeässä portissa kulkee kameli, joka viittaa sananlaskuun neulansilmästä, ja lähellä istuu rikas nuorukainen. Tekniikat ovat etsaus, kuivaneula ja kaiverrus.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Hundred_Guilder_Print",
            "title": "Hundred Guilder Print - Wikipedia"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-602",
            "title": "The Hundred Guilder Print - Rijksmuseum"
          }
        ]
      }
    ]
  },
  "SK-A-4691": {
    "kysymykset": [
      "Miten Rembrandt teki omakuvan hiuskiharat?",
      "Pidettiinkö Rembrandtin nuoruuden omakuvaa joskus kopiona?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miten Rembrandt teki omakuvan hiuskiharat?",
        "vastaus": "Rembrandt raaputti kiharat vielä märkään maaliin pensselin takapäällä, jolloin hiukset näyttävät sekaisilta. Valo osuu vain oikeaan poskeen, ja loppu kasvoista jää varjoon. Rijksmuseo toteaa, ettei kokematon nuori taiteilija säikkynyt kokeilemista. Pieni puupaneeliin maalattu työ on noin vuodelta 1628.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-4691",
            "title": "Self-portrait, Rembrandt - Rijksmuseum"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Self-Portrait_with_Dishevelled_Hair",
            "title": "Self-Portrait with Dishevelled Hair - Wikipedia"
          }
        ]
      },
      {
        "kysymys": "Pidettiinkö Rembrandtin nuoruuden omakuvaa joskus kopiona?",
        "vastaus": "Lontoon Sothebyn huutokaupassa 1959 teos luetteloitiin nimikkeellä 'after Rembrandt', eli Rembrandtin mukaan tehdyksi, mikä tarkoittaa kopiota tai seuraajan työtä. Se oli sitten lainassa Rijksmuseossa 1960-1971, ja museo osti sen 1977 Vereniging Rembrandtin ja muiden tahojen tuella.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-4691",
            "title": "Self-portrait, Rembrandt - Rijksmuseum"
          },
          {
            "url": "https://europeana.eu/en/item/90402/SK_A_4691",
            "title": "SK-A-4691 - Europeana"
          }
        ]
      }
    ]
  },
  "SK-A-354": {
    "kysymykset": [
      "Millainen taiteilija Rachel Ruysch oli omana aikanaan?",
      "Mistä Ruysch sai kukkien tarkan tuntemuksen?"
    ],
    "vastaukset": [
      {
        "kysymys": "Millainen taiteilija Rachel Ruysch oli omana aikanaan?",
        "vastaus": "Rijksmuseo kuvaa Ruyschia aikansa tunnetuimmaksi naistaiteilijaksi. Hän jatkoi maalaamista avioiduttuaan ja saatuaan kymmenen lasta, ja hän signeerasi työnsä omalla nimellään. Vuosina 1708-1716 hän oli Düsseldorfin hovimaalari Pfalzin vaaliruhtinas Johann Wilhelmin palveluksessa.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-354",
            "title": "Still Life with Flowers in a Glass Vase - Rijksmuseum"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Rachel_Ruysch",
            "title": "Rachel Ruysch - Wikipedia"
          }
        ]
      },
      {
        "kysymys": "Mistä Ruysch sai kukkien tarkan tuntemuksen?",
        "vastaus": "Rachel Ruysch kasvoi kasvitieteilijä ja anatomi Frederik Ruyschin kodissa, ja isän kokoelmat sekä Amsterdamin kasvitieteellinen puutarha antoivat aineistoa tutkia ja piirtää. Hän oppi myös flaamilaisen kukkamaalarin Willem van Aelstin oppilaana. Rijksmuseon kuvauksen mukaan hän tutki laajasti elävää ja preparoitua kukkaa, minkä ansiosta kimput ovat niin tarkkoja; kimppu on kuitenkin keinotekoinen, sillä kukat kukkivat eri aikoina.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Rachel_Ruysch",
            "title": "en-Wikipedia: Rachel Ruysch"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-2338",
            "title": "Rijksmuseum: Ruysch (SK-A-2338)"
          }
        ]
      }
    ]
  },
  "SK-C-6": {
    "kysymykset": [
      "Keitä Staalmeesters-maalauksen miehet olivat?",
      "Miksi Staalmeesters-maalauksen pöytä työntyy kohti katsojaa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Keitä Staalmeesters-maalauksen miehet olivat?",
        "vastaus": "Maalauksen viisi miestä olivat Amsterdamin kangaskillan tarkastajia eli staalmeestereita, jotka arvioivat värjättyjen kankaiden laatua; kuudes, Frans Hendricksz Bel, oli killan palvelija. Nimi viittaa kangasnäytteisiin.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-C-6",
            "title": "Rijksmuseum: The Syndics (SK-C-6)"
          },
          {
            "url": "https://nl.wikipedia.org/wiki/De_Staalmeesters",
            "title": "nl-Wikipedia: De Staalmeesters"
          }
        ]
      },
      {
        "kysymys": "Miksi Staalmeesters-maalauksen pöytä työntyy kohti katsojaa?",
        "vastaus": "Rembrandt valitsi matalan katselukulman, joten katsoja näkee pöydän alhaalta päin ja se tuntuu ulottuvan kohti katsojaa. Kulma myös korostaa miesten arvokkuutta.",
        "lahteet": [
          {
            "url": "https://nl.wikipedia.org/wiki/De_Staalmeesters",
            "title": "nl-Wikipedia: De Staalmeesters"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Syndics_of_the_Drapers'_Guild",
            "title": "en-Wikipedia: Syndics of the Drapers' Guild"
          }
        ]
      }
    ]
  },
  "SK-C-216": {
    "kysymykset": [
      "Ketä Rembrandtin Juutalaismorsian esittää?",
      "Mitä Van Gogh sanoi Juutalaismorsiamesta?"
    ],
    "vastaukset": [
      {
        "kysymys": "Ketä Rembrandtin Juutalaismorsian esittää?",
        "vastaus": "Nimi Juutalaismorsian on peräisin 1800-luvun alusta, kun tuntematon amsterdamilainen keräilijä tulkitsi kuvan isäksi ja tyttäreksi; tulkintaa ei enää pidetä uskottavana. Rijksmuseon otsikko on Iisak ja Rebekka: Iisak väitti Rebekkaa sisarekseen, mutta hellyys paljasti heidät kuningas Abimelekille. Kuvan on ehdotettu esittävän myös Rembrandtin poikaa Titusta morsiamineen tai muita Vanhan testamentin pareja, joten varmuutta ei ole.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/The_Jewish_Bride",
            "title": "en-Wikipedia: The Jewish Bride"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-C-216",
            "title": "Rijksmuseum: Isaac and Rebecca (SK-C-216)"
          }
        ]
      },
      {
        "kysymys": "Mitä Van Gogh sanoi Juutalaismorsiamesta?",
        "vastaus": "Van Gogh kävi vastavalmistuneessa Rijksmuseossa lokakuussa 1885. Ystävänsä Anton Kerssemakersin 1912 kirjaaman muistelman mukaan hän viipyi taulun edessä pitkään ja sanoi antavansa kymmenen vuotta elämästään, jos saisi istua siinä kaksi viikkoa pelkän kuivan leivän varassa. Sanamuoto vaihtelee lähteittäin.",
        "lahteet": [
          {
            "url": "https://www.webexhibits.org/vangogh/letter/15/etc-435c.htm?qp=money",
            "title": "Kerssemakers' recollection - Van Gogh's letters, WebExhibits"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/press/press-releases/rijksmuseum-receives-three-van-gogh-paintings-on-long-term-loan",
            "title": "Rijksmuseum receives three Van Gogh paintings on long-term loan"
          }
        ]
      }
    ]
  },
  "SK-C-374": {
    "kysymykset": [
      "Miksi tämän miliisimaalauksen teki kaksi taiteilijaa?",
      "Miksi maalausta kutsutaan Laihaksi komppaniaksi?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi tämän miliisimaalauksen teki kaksi taiteilijaa?",
        "vastaus": "Frans Hals sai tilauksen 1633, mutta ei saanut sitä valmiiksi. Hän tarjoutui viimeistelemään maalauksen Haarlemissa, jos miehet tulisivat hänen luokseen, mutta tilaajat kieltäytyivät. Pieter Codde viimeisteli työn 1637 ja jäljitteli Halsin leveää pensselinjälkeä.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-C-374",
            "title": "Militia Company of District XI - Rijksmuseum"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Meagre_Company",
            "title": "Meagre Company - Wikipedia"
          }
        ]
      },
      {
        "kysymys": "Miksi maalausta kutsutaan Laihaksi komppaniaksi?",
        "vastaus": "Lempinimi 'Meagre Company' on peräisin Jan van Dykin vuoden 1758 luettelosta Amsterdamin raatihuoneen maalauksista, jossa miehiä sanotaan kuihtuneiksi ja hoikiksi. Miehet näyttävät laihemmilta kuin myöhemmissä amsterdamilaisissa ryhmämuotokuvissa. Virallinen nimi viittaa kapteeni Reynier Reaeliin.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-C-374",
            "title": "Militia Company of District XI - Rijksmuseum"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Meagre_Company",
            "title": "Meagre Company - Wikipedia"
          }
        ]
      }
    ]
  },
  "SK-A-4": {
    "kysymykset": [
      "Mitä Asselijnin Uhattu joutsen tarkoittaa?",
      "Miten Uhattu joutsen päätyi valtion taidegalleriaan?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä Asselijnin Uhattu joutsen tarkoittaa?",
        "vastaus": "Joutsen puolustaa pesäänsä koiralta. Viimeistään 1800 kuvaa luettiin allegoriana: joutsen olisi raadinpensionaari Johan de Witt, joka suojaa Hollannin tasavaltaa vihollisilta. Kuvan tekstit lisättiin Asselijnin kuoleman jälkeen; ajoituksesta ei ole varmuutta, joten tulkinta on myöhäinen eikä taiteilijan oma.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/The_Threatened_Swan",
            "title": "en-Wikipedia: The Threatened Swan"
          },
          {
            "url": "https://canon.codart.nl/?p=240",
            "title": "CODART Canon: The Threatened Swan"
          }
        ]
      },
      {
        "kysymys": "Miten Uhattu joutsen päätyi valtion taidegalleriaan?",
        "vastaus": "Teos ostettiin 11. kesäkuuta 1800 Kansalliseen taidegalleriaan (Nationale Konst-Gallerij), Rijksmuseon edeltäjään, ja se oli gallerian ensimmäinen hankinta. Kauppias Cornelis Sebille Roos osti sen Jan Gildemeesterin perinnön huutokaupasta; gallerian johtaja oli Alexander Gogel. Maalausta pidettiin kansallisesti tärkeänä.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-4",
            "title": "Rijksmuseum: The Threatened Swan (SK-A-4)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Cornelis_Sebille_Roos",
            "title": "en-Wikipedia: Cornelis Sebille Roos"
          }
        ]
      }
    ]
  },
  "SK-A-44": {
    "kysymykset": [
      "Miksi Bol maalasi De Ruyterin muotokuvan 1667?",
      "Mitä De Ruyterin ympärillä muotokuvassa näkyy?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Bol maalasi De Ruyterin muotokuvan 1667?",
        "vastaus": "Muotokuva maalattiin muistoksi De Ruyterin voitosta neljän päivän meritaistelussa 1666. Sen jälkeen päätettiin, että amiraalin kuvat ripustetaan kaikkien viiden amiraliteetin neuvottelusaleihin. Bol maalasi 1667 useita elämänkokoisia muotokuvia, ja tämä kappale lähetettiin Middelburgiin.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-44",
            "title": "Michiel de Ruyter as Lieutenant-Admiral - Rijksmuseum"
          },
          {
            "url": "https://rmg.co.uk/collections/objects/rmgc-object-14470",
            "title": "Lieutenant-Admiral Michiel de Ruyter (1607-1676) - Royal Museums Greenwich"
          }
        ]
      },
      {
        "kysymys": "Mitä De Ruyterin ympärillä muotokuvassa näkyy?",
        "vastaus": "De Ruyter nojaa taivaanpalloon, ja pöydällä on Zeelandin ja Flanderin rannikon kartta, jossa on hänen syntymäseutunsa Walcheren. Merimaisemassa on hänen lippulaivansa Zeven Provinciën. Kaulassa on Pyhän Mikaelin ritarikunnan merkki, jonka Rijksmuseon mukaan Ranskan kuningas myönsi.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-44",
            "title": "Michiel de Ruyter as Lieutenant-Admiral - Rijksmuseum"
          },
          {
            "url": "https://rmg.co.uk/collections/objects/rmgc-object-14470",
            "title": "Lieutenant-Admiral Michiel de Ruyter (1607-1676) - Royal Museums Greenwich"
          }
        ]
      }
    ]
  },
  "SK-C-5": {
    "kysymykset": [
      "Miksi Yövartio on saanut nimensä, vaikka se ei esitä yötä?",
      "Miksi Yövartion reunoja leikattiin pois vuonna 1715?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Yövartio on saanut nimensä, vaikka se ei esitä yötä?",
        "vastaus": "Rembrandtin maalauksella ei ollut alun perin lainkaan nimeä, ja nimi Yövartio mainitaan asiakirjassa ensimmäisen kerran vuonna 1797. Kohtaus ei kuitenkaan ole yöllinen: vuosisatojen aikana maalauksen päälle kertynyt tumma vernissa sai sen näyttämään yölliseltä, ja tummuneesta vernissasta poistettiin osa vasta 1940-luvulla (1946–47). Teoksen virallinen nimi on pitkä kuvaus kapteeni Frans Banninck Cocqin johtamasta miliisikomppaniasta.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/The_Night_Watch_(painting)",
            "title": "The Night Watch (Wikipedia)"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/stories/10-things/story/10-things-about-rembrandt-s-night-watch",
            "title": "10 things about Rembrandt's Night Watch (Rijksmuseum)"
          }
        ]
      },
      {
        "kysymys": "Miksi Yövartion reunoja leikattiin pois vuonna 1715?",
        "vastaus": "Maalaus siirrettiin vuonna 1715 Amsterdamin kaupungintaloon Damin torille, nykyiseen kuninkaanlinnaan. Jotta se sopisi uuteen paikkaan, siitä leikattiin pois neljä kaistaletta, suurin vasemmalta puolelta; vasemmalta katosi muun muassa kaksi hahmoa. Leikattuja kaistaleita ei ole koskaan löydetty.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/stories/10-things/story/10-things-about-rembrandt-s-night-watch",
            "title": "10 things about Rembrandt's Night Watch (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/The_Night_Watch_(painting)",
            "title": "The Night Watch (Wikipedia)"
          }
        ]
      }
    ]
  },
  "SK-A-2344": {
    "kysymykset": [
      "Mitä Vermeer maalasi Maitotytön taustalta piiloon?",
      "Miten Vermeer maalasi Maitotytön valon ja maidon virran?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä Vermeer maalasi Maitotytön taustalta piiloon?",
        "vastaus": "Vuonna 2022 julkistetussa tutkimuksessa lyhytaaltoinen infrapunakuvaus paljasti, että tytön pään taakse oli luonnosteltu astiateline riippuvine kannuineen, jota ei kehitetty pidemmälle, ja hänen jalkojensa juureen oli maalattu tulikori, joka peitettiin myöhemmin. Aiemmat röntgenkuvat olivat näyttäneet jotain samoissa kohdissa, mutta sitä ei osattu tulkita.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/press/press-releases/rijksmuseum-reveals-major-discoveries-on-vermeer-s-painting-the-milkmaid",
            "title": "Rijksmuseum: major discoveries on Vermeer's The Milkmaid"
          },
          {
            "url": "https://www.thehistoryblog.com/?p=65195",
            "title": "The History Blog: Vermeer's Milkmaid"
          }
        ]
      },
      {
        "kysymys": "Miten Vermeer maalasi Maitotytön valon ja maidon virran?",
        "vastaus": "Vermeer maalasi auringonvalon osuessa pintoihin satoja värillisiä pisteitä ja pieniä siveltimenvetoja, mikä muistuttaa lähes pointillismia. Tyttö kaataa kannuun ohuen maitosuihkun, ja kuvassa kaikki muu paitsi virtaava maito on liikkumatonta.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-2344",
            "title": "Rijksmuseum: The Milkmaid (SK-A-2344)"
          },
          {
            "url": "https://artsandculture.google.com/story/eQVhb89R45GfJg",
            "title": "Google Arts & Culture: The Milkmaid"
          }
        ]
      }
    ]
  },
  "SK-A-1595": {
    "kysymykset": [
      "Miten Vermeerin Rakkauskirje varastettiin vuonna 1971?",
      "Mitä merimaisema Vermeerin Rakkauskirjeessä tarkoittaa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miten Vermeerin Rakkauskirje varastettiin vuonna 1971?",
        "vastaus": "Syyskuussa 1971 maalaus oli lainassa Brysselin Rembrandt-näyttelyssä, ja 21-vuotias Mario Roymans leikkasi kankaan irti kehyksistä. Hän vaati 200 miljoonaa Belgian frangia Itä-Pakistanin (nyk. Bangladesh) nälänhädän ja sodan uhreille. Poliisi pidätti hänet noin kahden viikon kuluttua, ja maalauksen restaurointi kesti lähes vuoden.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/The_Love_Letter_(Vermeer)",
            "title": "The Love Letter (Vermeer) - Wikipedia"
          },
          {
            "url": "https://artsandculture.google.com/story/stolen-vermeers-mauritshuis/fgXBDxyCMeVtJw?hl=en",
            "title": "Stolen Vermeers - Google Arts & Culture"
          }
        ]
      },
      {
        "kysymys": "Mitä merimaisema Vermeerin Rakkauskirjeessä tarkoittaa?",
        "vastaus": "Taustan seinällä on myrskyisä merimaisema. Rijksmuseumin mukaan 1600-luvulla merta verrattiin usein rakkauteen ja rakastajaa laivaan, joten maalaus voi liittyä kirjeen aiheeseen. Tulkinta on mahdollinen, ei varma.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-1595",
            "title": "The Love Letter - Rijksmuseum"
          },
          {
            "url": "https://en.wikipedia.org/wiki/The_Love_Letter_(Vermeer)",
            "title": "The Love Letter (Vermeer) - Wikipedia"
          }
        ]
      }
    ]
  },
  "SK-A-182": {
    "kysymykset": [
      "Miten de Hooch rakensi tilan Piika ja lapsi -maalaukseen?",
      "Onko de Hoochin maalauksen lapsi tyttö vai poika?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miten de Hooch rakensi tilan Piika ja lapsi -maalaukseen?",
        "vastaus": "De Hooch maalasi kaksi näkymää huoneesta toiseen: toinen johtaa kellariin tai ruokakomeroon, toinen etuhuoneeseen, jonne päivänvalo virtaa. Etuhuoneessa näkyvät avoin ikkuna, tyynyllinen tuoli ja miehen muotokuva seinällä. Teos on signeerattu P.D.H.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-182",
            "title": "A Maid with a Child in a Pantry - Rijksmuseum"
          },
          {
            "url": "https://en.wikipedia.org/wiki/A_Woman_with_a_Child_in_a_Pantry",
            "title": "A Woman with a Child in a Pantry - Wikipedia"
          }
        ]
      },
      {
        "kysymys": "Onko de Hoochin maalauksen lapsi tyttö vai poika?",
        "vastaus": "Lähteet ovat ristiriidassa. Rijksmuseumin englanninkielinen kuvaus puhuu pikkupojasta, mutta aihetunniste ja hollanninkielinen kuvaus tytöstä; Wikipedia kutsuu lasta tytöksi, vaikka puku voi viitata poikaan. Lapsella on mekko ja taluttimet, jotka Rijksmuseumin mukaan olivat tavallinen apu kävelemään opettelevalle.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-182",
            "title": "A Maid with a Child in a Pantry - Rijksmuseum"
          },
          {
            "url": "https://en.wikipedia.org/wiki/A_Woman_with_a_Child_in_a_Pantry",
            "title": "A Woman with a Child in a Pantry - Wikipedia"
          }
        ]
      }
    ]
  },
  "RP-P-OB-444": {
    "kysymykset": [
      "Missä Rembrandtin Kolme puuta -maisema on?",
      "Onko Kolme puuta -vedoksessa myrsky vai aurinko?"
    ],
    "vastaukset": [
      {
        "kysymys": "Missä Rembrandtin Kolme puuta -maisema on?",
        "vastaus": "Tarkkaa paikkaa ei tiedetä, ja Rembrandt on voinut osin keksiä näkymän. Rijksmuseon mukaan puut reunustivat todennäköisimmin Zuiderzeen padon penkkaa. Maisema on vapaasti sommiteltu Amsterdamin ympäristön inspiroima, eikä tarkka topografinen kuva; joissakin tulkinnoissa sitä on verrattu Diemerdijkin ja Haarlemmerdijkin näkymiin.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-444",
            "title": "The Three Trees - Rijksmuseum"
          },
          {
            "url": "https://en.wikipedia.org/wiki/The_Three_Trees",
            "title": "The Three Trees - Wikipedia"
          }
        ]
      },
      {
        "kysymys": "Onko Kolme puuta -vedoksessa myrsky vai aurinko?",
        "vastaus": "Molempia: oikealla matala aurinko korostaa dramatiikkaa, ja vasemmalla ukkosmyrsky on väistymässä. Tutkijat ovat eri mieltä siitä, kuvaako yläkulman tiheä viivoitus sadetta vai auringonvaloa.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-444",
            "title": "The Three Trees - Rijksmuseum"
          },
          {
            "url": "https://en.wikipedia.org/wiki/The_Three_Trees",
            "title": "The Three Trees - Wikipedia"
          }
        ]
      }
    ]
  },
  "SK-A-199": {
    "kysymykset": [
      "Millaista posliinia Kalf asetelmaansa maalasi?",
      "Millaisia ylellisiä esineitä Kalfin asetelmassa on?"
    ],
    "vastaukset": [
      {
        "kysymys": "Millaista posliinia Kalf asetelmaansa maalasi?",
        "vastaus": "Kalf valitsi harvinaisia, jo vuosikymmeniä vanhoja esineitä eikä tavallisimpia aasialaisia tuontitavaroita. Rijksmuseumin mukaan hän yhdisteli eri esineiden osia: maljan sisäpuolen koristelu vastaa aiempia maljatyyppejä, ulkopuoli taas on mallinnettu silloin uudemman posliiniesineen mukaan. Wan Li -malja sitrushedelmineen on Kalfin asetelmien tuttu aihe.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-199",
            "title": "Still Life with a Silver Jug and a Porcelain Bowl - Rijksmuseum"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Willem_Kalf",
            "title": "Willem Kalf - Wikipedia"
          }
        ]
      },
      {
        "kysymys": "Millaisia ylellisiä esineitä Kalfin asetelmassa on?",
        "vastaus": "Maalauksessa on koristeellinen hopeakannu kansineen, roemer-lasi valkoviinillä, Wan Li -tyylinen malja sitruunoineen ja appelsiineineen sekä taskukello. Kalfin kypsissä asetelmissa, pronkstilleveneissä, on kaikkein eksoottisimpia ja ylellisimpiä esineitä, kuten kulta- ja hopea-astioita ja venetsialaistyylisiä laseja.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-199",
            "title": "Still Life with a Silver Jug and a Porcelain Bowl - Rijksmuseum"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Willem_Kalf",
            "title": "Willem Kalf - Wikipedia"
          }
        ]
      }
    ]
  },
  "SK-A-135": {
    "kysymykset": [
      "Kuka on Frans Halsin Iloinen juoja?",
      "Miksi Halsin Iloinen juoja näyttää niin eloisalta?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuka on Frans Halsin Iloinen juoja?",
        "vastaus": "Sitä ei tiedetä. Mies on pukeutunut keltaiseen hihattomaan sotilaspukuun ja kantaa mitalia, joten hän on ehkä sotilas tai kaupunkikaartilainen. Rijksmuseum pitää häntä todennäköisesti nimettömänä koomisena hahmona, mutta mahdollisesti sittenkin muotokuvana. Tutkijat kiistelevät, onko teos muotokuva vai arkielämän kuva.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-135",
            "title": "The Merry Drinker - Rijksmuseum"
          },
          {
            "url": "https://rijksmuseum.nl/en/stories/dutch-masters/story/frans-hals-10",
            "title": "Frans Hals - Rijksmuseum, Dutch Masters"
          },
          {
            "url": "https://en.wikipedia.org/wiki/The_Merry_Drinker",
            "title": "The Merry Drinker - Wikipedia"
          }
        ]
      },
      {
        "kysymys": "Miksi Halsin Iloinen juoja näyttää niin eloisalta?",
        "vastaus": "Hals maalasi nopeasti ja rosoisesti: siveltimenvedot risteilevät kankaalla ja antavat vaikutelman nopeasta maalaamisesta. Pitsikaulus on tehty lyhyin luonnosmaisin vedoin, ja hihat, kalvosimet ja mitali ovat sumeita. Lasissa viini lainehtii, ja mies on kohottamassa maljaa katsojalle.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-135",
            "title": "The Merry Drinker - Rijksmuseum"
          },
          {
            "url": "https://en.wikipedia.org/wiki/The_Merry_Drinker",
            "title": "The Merry Drinker - Wikipedia"
          }
        ]
      }
    ]
  },
  "SK-C-229": {
    "kysymykset": [
      "Mitä sananlasku Steenin Iloisessa perheessä tarkoittaa?",
      "Mitä lapset tekevät Steenin Iloisessa perheessä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä sananlasku Steenin Iloisessa perheessä tarkoittaa?",
        "vastaus": "Takan reunuksella olevassa lapussa lukee: \"Kuten vanhat laulavat, niin nuoret piipittävät.\" Sananlasku tarkoittaa, että lapset omaksuvat vanhempiensa esimerkin. Rijksmuseum kysyy, mitä lapsille käy, jos vanhemmat näyttävät väärää esimerkkiä. Isä, äiti ja isoäiti laulavat täyttä kurkkua, ja lapset yhtyvät mukaan.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-C-229",
            "title": "The Merry Family - Rijksmuseum"
          },
          {
            "url": "https://en.wikipedia.org/wiki/The_Happy_Family_(painting)",
            "title": "The Happy Family (painting) - Wikipedia"
          }
        ]
      },
      {
        "kysymys": "Mitä lapset tekevät Steenin Iloisessa perheessä?",
        "vastaus": "Lapset ovat täysillä mukana: yksi poika soittaa huilua, poika ja tyttö polttavat piippua, ja pöydän edessä lapsi saa kannusta siemauksen viiniä. Lattialla on koira, kannuja ja kattila. Teos on signeerattu ja vuodelta 1668.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-C-229",
            "title": "The Merry Family - Rijksmuseum"
          }
        ]
      }
    ]
  },
  "SK-A-1718": {
    "kysymykset": [
      "Keitä Avercampin talvimaiseman jäällä on?",
      "Kuka oli talvimaisemien maalari Hendrick Avercamp?"
    ],
    "vastaukset": [
      {
        "kysymys": "Keitä Avercampin talvimaiseman jäällä on?",
        "vastaus": "Jäällä on satoja ihmisiä: useimmat huvikseen, jotkut pakon edessä. Mukana on luistelijoita, kolf-peliä (golfin esiaste) pelaavia, kävelijöitä, kelkkoja, jäälaivoja ja kalastaja ankeriaskeihäineen. Vasemmassa etualalla on kuoliaaksi paleltunut hevonen, jota varikset ja koira syövät.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-1718",
            "title": "Winter Landscape with Ice Skaters - Rijksmuseum"
          },
          {
            "url": "https://artsandculture.google.com/asset/winter-landscape-with-ice-skaters/5AE9Ec9G0xa7bg?hl=en",
            "title": "Winter Landscape with Ice Skaters - Google Arts & Culture"
          }
        ]
      },
      {
        "kysymys": "Kuka oli talvimaisemien maalari Hendrick Avercamp?",
        "vastaus": "Avercamp syntyi Amsterdamissa 1585 ja kuoli Kampenissa 1634. Hän oli mykkä ja luultavasti kuuro, ja hänet tunnettiin nimellä \"de Stomme van Kampen\". Rijksmuseum kutsuu häntä ensimmäiseksi hollantilaistaiteilijaksi, joka kuvasi talven ja sen huvit. Hänen valmiit piirroksensa, usein akvarellilla sävytetyt, tehtiin luultavasti myytäväksi.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-1718",
            "title": "Winter Landscape with Ice Skaters - Rijksmuseum"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Hendrick_Avercamp",
            "title": "Hendrick Avercamp - Wikipedia"
          }
        ]
      }
    ]
  },
  "SK-C-211": {
    "kysymykset": [
      "Missä Ruisdaelin tuulimylly oikeasti seisoi?",
      "Miten Ruisdael sai tuulimyllyn hallitsemaan maisemaa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Missä Ruisdaelin tuulimylly oikeasti seisoi?",
        "vastaus": "Wijk bij Duurstedessa Lek-joen rannalla. Taustalla näkyvät Duurstedin linnan tornit ja Pyhän Johanneksen kirkon torni. Ruisdaelin alkuperäinen mylly ei enää seiso, ja toinen, lähellä oleva mylly sekoitetaan usein siihen.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-C-211",
            "title": "Windmill at Wijk bij Duurstede - Rijksmuseum"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Windmill_at_Wijk_bij_Duurstede",
            "title": "Windmill at Wijk bij Duurstede - Wikipedia"
          }
        ]
      },
      {
        "kysymys": "Miten Ruisdael sai tuulimyllyn hallitsemaan maisemaa?",
        "vastaus": "Ruisdael yhdisti matalan maan, veden ja laajan taivaan niin, että ne kaikki johdattavat katseen myllyyn, joka kohoaa pilvisen taivaan alla. Jokiranta ja siivet muodostavat sopusointuisia linjoja ja valon ja varjon vastakohdat tiivistävät massaa ja tilaa.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-C-211",
            "title": "Windmill at Wijk bij Duurstede - Rijksmuseum"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Windmill_at_Wijk_bij_Duurstede",
            "title": "Windmill at Wijk bij Duurstede - Wikipedia"
          }
        ]
      }
    ]
  },
  "uva-amsterdam-kartta-1625": {
    "kysymykset": [
      "Miksi Amsterdamin vuoden 1625 kartta on erityinen?",
      "Mistä osista Amsterdamin jättikartta koottiin?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Amsterdamin vuoden 1625 kartta on erityinen?",
        "vastaus": "Seinäkartta on yli kaksi neliömetriä suuri, ja Allard Piersonin mukaan Amsterdam on siinä ensimmäistä kertaa kuvattu suoraan ylhäältä päin. Rakennukset on piirretty kolmiulotteisesti. Allard Pierson kuvaa sitä 1600-luvun yksityiskohtaisimmaksi ja luotettavimmaksi näkymäksi Amsterdamista.",
        "lahteet": [
          {
            "url": "https://www.allardpierson.nl/en/news/allard-pierson-acquires-unique-17th-century-wall-map-of-amsterdam",
            "title": "Allard Pierson acquires unique 17th century wall map of Amsterdam"
          }
        ]
      },
      {
        "kysymys": "Mistä osista Amsterdamin jättikartta koottiin?",
        "vastaus": "Kartta koostuu yhdeksästä kaiverretusta arkista, jotka voi liimata yhteen. Mukaan kuuluu puupiirroskaistale, jossa on latinankielinen otsikko, suomeksi \"Amsterdam, Hollannin tärkein kauppapaikka ja koko Euroopan kuuluisin\". Allard Piersonin kappale on 1630-luvun painos vuoden 1625 kartasta, ja se on värjätty käsin valmistuksen aikaan.",
        "lahteet": [
          {
            "url": "https://www.allardpierson.nl/en/news/allard-pierson-acquires-unique-17th-century-wall-map-of-amsterdam",
            "title": "Allard Pierson acquires unique 17th century wall map of Amsterdam"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Balthasar_Florisz._van_Berckenrode",
            "title": "Balthasar Florisz. van Berckenrode - Wikipedia"
          }
        ]
      }
    ]
  },
  "RP-P-OB-832": {
    "kysymykset": [
      "Miten Segers värjäsi tämän etsauksen?",
      "Miksi saman laatan kaksi vedosta eroavat?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miten Segers värjäsi tämän etsauksen?",
        "vastaus": "Segers painoi vedoksen mustana vaaleanpunertavalla, lyijypohjaisella pohjustuksella päällystetylle paperille ja maalasi sen päälle siveltimellä läpikuultavaa valkoista, sinivihreää, vihreänkeltaista ja ruskeaa. Vedos on lähes kokonaan ylimaalattu, ja tien oikealle puolelle hän lisäsi kaksi pientä kulkijaa. Rijksmuseon luettelon mukaan yksikään graafikko ennen häntä ei ollut kokeillut yhtä laajasti, mutta tämä viittaa Segersin kokeiluihin yleensä, ei vain tähän vedokseen.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-832",
            "title": "Rocky Landscape with a Road and a River (Rijksmuseum)"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-832/catalogue-entry",
            "title": "Rocky Landscape with a Road and a River, catalogue entry (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Hercules_Segers",
            "title": "Hercules Segers (Wikipedia)"
          }
        ]
      },
      {
        "kysymys": "Miksi saman laatan kaksi vedosta eroavat?",
        "vastaus": "Rijksmuseon kaksi vedosta ovat ainoat tunnetut tästä laatasta. Värillinen on ensimmäinen asu, värittämätön toinen, johon on lisätty koeetsauksia. Segers vaihteli vedoksiaan tarkoituksella, vaikka aikanaan saman kuvan vedosten kuului näyttää samanlaisilta. Rijksmuseo merkitsee tekijäksi Segersin; tekopaikka (ehkä Amsterdam) ja ajoitus 1622–1625 ovat epävarmoja.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-832/catalogue-entry",
            "title": "Rocky Landscape with a Road and a River, catalogue entry (Rijksmuseum)"
          },
          {
            "url": "https://www.metmuseum.org/en/perspectives/hercules-segers-printed-paintings",
            "title": "Hercules Segers's Printed Paintings (The Met)"
          }
        ]
      }
    ]
  },
  "RP-F-AB12278-A": {
    "kysymykset": [
      "Kenen katolta Singelin näkymä on kuvattu?",
      "Ovatko Asserin kuvat Amsterdamin vanhimpia?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kenen katolta Singelin näkymä on kuvattu?",
        "vastaus": "Näkymä on kuvattu valokuvaaja Eduard Asserin oman kodin katolta Singel-kanavan varrelta Amsterdamista, noin vuonna 1852. Asserin perhe muutti suureen kanavataloon lähellä Munttornia vuonna 1821, ja hän asui siellä koko elämänsä. Kuva on suolapaperivedos.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-F-AB12278-A",
            "title": "Gezicht vanaf het dak van het huis van de fotograaf op het Singel, Amsterdam (Rijksmuseum)"
          },
          {
            "url": "https://lbs.ucl.ac.uk/lbs/person/view/41600",
            "title": "Eduard Isaac Asser (UCL Legacies of British Slavery)"
          }
        ]
      },
      {
        "kysymys": "Ovatko Asserin kuvat Amsterdamin vanhimpia?",
        "vastaus": "Asserin kuvia pidetään Amsterdamin vanhimpina säilyneinä valokuvina. Hän oli lakimies ja harrastajavalokuvaaja, joka alkoi kokeilla valokuvausta noin vuonna 1842. Hänen jälkeläisensä lahjoittivat vuonna 1993 valtiolle noin 200 hänen kuvaansa, ja ne kuuluvat nykyään Rijksmuseon kokoelmaan.",
        "lahteet": [
          {
            "url": "https://nl.wikipedia.org/wiki/Eduard_Isaac_Asser",
            "title": "Eduard Isaac Asser (Wikipedia)"
          },
          {
            "url": "https://lbs.ucl.ac.uk/lbs/person/view/41600",
            "title": "Eduard Isaac Asser (UCL Legacies of British Slavery)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Eduard_Isaac_Asser",
            "title": "Eduard Isaac Asser (Wikipedia)"
          }
        ]
      }
    ]
  },
  "RP-F-AB12278-Z": {
    "kysymykset": [
      "Mikä on suolapaperivedos?",
      "Kuka oli valokuvaaja Eduard Asser?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä on suolapaperivedos?",
        "vastaus": "Se on varhainen paperivalokuvauksen menetelmä, jonka William Henry Fox Talbot kehitti 1830-luvun puolivälissä. Paperi kasteltiin suolaliuoksessa ja sivelttiin hopeanitraatilla, jolloin siitä tuli valoherkkää. Negatiivi asetettiin päälle ja paperi tummui valossa. Menetelmä oli yleisin positiivivedosten tapa noin vuodesta 1839 vuoteen 1860; myös Asserin laivamalli on tällainen vedos.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Salt_print",
            "title": "Salt print (Wikipedia)"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-F-AB12278-Z",
            "title": "Scheepsmodel (Rijksmuseum)"
          }
        ]
      },
      {
        "kysymys": "Kuka oli valokuvaaja Eduard Asser?",
        "vastaus": "Asser oli amsterdamilainen lakimies ja harrastajavalokuvaaja, jota pidetään Alankomaiden valokuvauksen uranuurtajana. Hän opetteli alaa itse noin vuodesta 1842, aloitti daguerreotypioilla ja siirtyi sitten paperinegatiiveihin. 1850-luvulla hän kuvasi muun muassa kaupunkinäkymiä ja asetelmia, ja myöhemmin hän kehitti valokuvalitografisen menetelmän.",
        "lahteet": [
          {
            "url": "https://nl.wikipedia.org/wiki/Eduard_Isaac_Asser",
            "title": "Eduard Isaac Asser (Wikipedia)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Eduard_Isaac_Asser",
            "title": "Eduard Isaac Asser (Wikipedia)"
          },
          {
            "url": "https://lbs.ucl.ac.uk/lbs/person/view/41600",
            "title": "Eduard Isaac Asser (UCL Legacies of British Slavery)"
          }
        ]
      }
    ]
  },
  "RP-P-OB-849": {
    "kysymykset": [
      "Miten Segers loi Ison puun valon ja varjot?",
      "Mitä Rembrandt teki Segersin kuparilaatalle?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miten Segers loi Ison puun valon ja varjot?",
        "vastaus": "Segers peitti lähes koko laatan tiheällä ristiinviivoituksella ja suojasi valoisiksi jäävät kohdat peitelakalla ennen happokylpyä: osan taivaasta, lehvästön, oksat, ruohon, rakennukset ja taustamaiseman. Painettuna syntyvät mustan, harmaan ja valon hienot sävyt. Luettelon kirjoittajan mukaan puun kuvaus on 1600-luvun grafiikassa lähes vertaansa vailla.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-849/catalogue-entry",
            "title": "The Large Tree, catalogue entry (Rijksmuseum)"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-849",
            "title": "The Large Tree (Rijksmuseum)"
          },
          {
            "url": "https://www.metmuseum.org/perspectives/hercules-segers-etching-process",
            "title": "Hercules Segers etching process (The Met)"
          }
        ]
      },
      {
        "kysymys": "Mitä Rembrandt teki Segersin kuparilaatalle?",
        "vastaus": "Rembrandt ihaili Segersiä: hänellä oli kahdeksan Segersin maalausta ja useita vedoksia. Noin 1653 hän osti Segersin kuparilaatan, jossa oli Tobias ja enkeli, poisti hahmot ja lisäsi Pyhän perheen. Maisema jäi lähes ennalleen.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Hercules_Segers",
            "title": "Hercules Segers (Wikipedia)"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-P-1962-31",
            "title": "The Flight into Egypt, on a Plate by Segers (Rijksmuseum)"
          }
        ]
      }
    ]
  },
  "RP-F-00-565": {
    "kysymykset": [
      "Milloin Breitner alkoi ottaa valokuvia?",
      "Missä Breitnerin valokuvat ovat nykyään?"
    ],
    "vastaukset": [
      {
        "kysymys": "Milloin Breitner alkoi ottaa valokuvia?",
        "vastaus": "Todennäköisesti vuonna 1889: arviolta tuolta vuodelta oleva kirje kysyy taidemaalari Herman van der Weeleltä, miten tämän kaltainen kamera tehdään. Varhaisimmaksi varmasti ajoitettavaksi kuvaksi oletetaan kirjailija Lodewijk van Deysselin muotokuva vuodelta 1889. Kuvaaminen jatkui ainakin vuoteen 1915, maalauksen rinnalla.",
        "lahteet": [
          {
            "url": "https://breitnerenglish.rkdstudies.nl/1-introduction/3-a-painter-out-taking-photographs",
            "title": "George Hendrik Breitner: A painter out taking photographs (RKD)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/George_Hendrik_Breitner",
            "title": "George Hendrik Breitner (Wikipedia)"
          }
        ]
      },
      {
        "kysymys": "Missä Breitnerin valokuvat ovat nykyään?",
        "vastaus": "Suurin tunnettu kokoelma on Haagin RKD-taidehistorian instituutissa, jolla on noin 2 300 Breitnerin alkuperäiskuvaa. Osa on muualla, esimerkiksi Amsterdamin kaupunginarkistossa (263 negatiivia). Rijksmuseoon Oudezijds Achterburgwalin kuva tuli vuonna 1949 Breitner-Jordanin jäämistöstä. Kuva on otettu vuosina 1894–1898, ja se katsoo kanavaa etelään, vasemmalla Zeedijkin takapuoli.",
        "lahteet": [
          {
            "url": "https://breitnerenglish.rkdstudies.nl/1-introduction",
            "title": "George Hendrik Breitner: Introduction (RKD)"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-F-00-565",
            "title": "Oudezijds Achterburgwal en links de achterzijde van de Zeedijk (Rijksmuseum)"
          }
        ]
      }
    ]
  },
  "RP-F-K89497": {
    "kysymykset": [
      "Mihin Breitner käytti valokuviaan?",
      "Kuka valmisti Breitnerin Dam-kuvan vedoksen?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mihin Breitner käytti valokuviaan?",
        "vastaus": "Breitner käytti valokuvia työmateriaalina maalauksiinsa. Joskus kuva oli suoraan maalauksen esikuva, kuten kimonotytöissä, mutta useammin se oli viitemateriaalia kaupunkielämästä, valosta ja liikkeestä. Hän kuvasi samaa kohdetta usein eri kuvakulmista ja eri säässä.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/George_Hendrik_Breitner",
            "title": "George Hendrik Breitner (Wikipedia)"
          },
          {
            "url": "https://breitnerenglish.rkdstudies.nl/1-introduction/3-a-painter-out-taking-photographs",
            "title": "George Hendrik Breitner: A painter out taking photographs (RKD)"
          }
        ]
      },
      {
        "kysymys": "Kuka valmisti Breitnerin Dam-kuvan vedoksen?",
        "vastaus": "Rijksmuseon luettelo mainitsee vedoksen tekijäksi Harm Botmanin, ei Breitneriä itseään: kyseessä on moderni vedos RKD:n kokoelman negatiivista (merkintä BR 1891). Taustalla näkyvät Nieuwe Kerk ja kuninkaanlinna.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-F-K89497",
            "title": "Rijksmuseum: Breitner, Dam (RP-F-K89497)"
          }
        ]
      }
    ]
  },
  "RP-F-K89483": {
    "kysymykset": [
      "Millainen paikka Van Diemenstraat oli?",
      "Miten Breitner maalasi Van Diemenstraatin työmaan?"
    ],
    "vastaukset": [
      {
        "kysymys": "Millainen paikka Van Diemenstraat oli?",
        "vastaus": "Kun Pohjanmeren kanava valmistui vuonna 1876, Amsterdamin IJ kävi suurille valtamerilaivoille. Kanavan varteen rakennettiin uusia katuja varastoineen, ja Van Diemenstraat oli yksi niistä. Breitner kuvasi sen rakennustyömaata, ja Rijksmuseon kuva työläisistä rakennuskuopassa on uusi vedos hänen negatiivistaan.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-3581",
            "title": "Lunchtime at the Building Site on the Van Diemenstraat (Rijksmuseum)"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-F-K89483",
            "title": "Bouwvakkers aan het werk in een bouwput aan de Van Diemenstraat (Rijksmuseum)"
          }
        ]
      },
      {
        "kysymys": "Miten Breitner maalasi Van Diemenstraatin työmaan?",
        "vastaus": "Kyllä: vuonna 1897 hän maalasi Van Diemenstraatin työmaan lounastauon. Siinä työmiehet istuvat lankuilla lounastauolla, ja Breitner kuvaa heidät takaapäin. Heidän kulmikkaat muotonsa muistuttavat lankkuja ja taustan telttoja ja purjeita. Maalaus tuli Rijksmuseolle testamenttina vuonna 1944.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-3581",
            "title": "Lunchtime at the Building Site on the Van Diemenstraat (Rijksmuseum)"
          }
        ]
      }
    ]
  },
  "SK-C-149": {
    "kysymykset": [
      "Mitä de Hooch muutti Äidin velvollisuus -maalauksessa?",
      "Mikä on de Hoochin oviaukkonäkymien erikoisuus?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä de Hooch muutti Äidin velvollisuus -maalauksessa?",
        "vastaus": "Uutistoimisto ANP:n mukaan de Hooch muutti hahmoja kesken maalaamisen: vuoteen luona seisoivat alun perin toiset ihmiset, ja heidän asentonsa oli aivan toinen kuin lopullisessa kuvassa. Rijksmuseon ja Delftin Prinsenhofin tutkijat huomasivat tämän vuonna 2019 makro-XRF-skannauksella ja heijastuskuvantamisella, joilla näkee maalikerrosten läpi. Vastaavia muutoksia hän teki muissakin maalauksissa.",
        "lahteet": [
          {
            "url": "https://nieuws.nl/algemeen/de-hooch-wijzigde-schilderijen-ingrijpend",
            "title": "De Hooch wijzigde schilderijen ingrijpend (ANP / nieuws.nl)"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/research/our-research/conservation-science/paintings/pieter-de-hooch",
            "title": "Pieter de Hooch research (Rijksmuseum)"
          }
        ]
      },
      {
        "kysymys": "Mikä on de Hoochin oviaukkonäkymien erikoisuus?",
        "vastaus": "De Hooch erikoistui huoneisiin, joissa katse kulkee oviaukon läpi toiseen tilaan. Rijksmuseo kutsuu näitä näkymiä virtuaalitodellisuuden esiasteeksi. Tässä oviaukosta näkyy aurinkoinen takahuone ja puutarha. Huoneet olivat taiteilijan ateljeessa suunnittelemia, eivät todellisia.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-C-149",
            "title": "A Mother Delousing her Child's Hair, Known as 'A Mother's Duty' (Rijksmuseum)"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/stories/dutch-masters/story/pieter-de-hooch-10",
            "title": "Pieter de Hooch (Rijksmuseum, Dutch Masters)"
          }
        ]
      }
    ]
  },
  "RP-P-OB-550": {
    "kysymykset": [
      "Kuka oli kultaseppä Jan Lutma?",
      "Miksi Lutma ehkä tilasi muotokuvansa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuka oli kultaseppä Jan Lutma?",
        "vastaus": "Lutma (n. 1584–1669) oli Amsterdamissa työskennellyt kulta- ja hopeaseppä ja Rembrandtin ystävä. Rijksmuseon mukaan hän oli 1600-luvulla yhtä kuuluisa kuin nykyinen supertähti. Hänen syntymäpaikkansa on lähteissä epävarma (Emden tai Groningen), ja Amsterdamissa hänet tunnetaan vuodesta 1621.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-550",
            "title": "Rijksmuseum: Lutma (RP-P-OB-550)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Johannes_Lutma",
            "title": "en-Wikipedia: Johannes Lutma"
          }
        ]
      },
      {
        "kysymys": "Miksi Lutma ehkä tilasi muotokuvansa?",
        "vastaus": "Princetonin museon mukaan Lutma saattoi tilata sekä tämän että poikansa tekemän muotokuvan ilmoittaakseen työskentelevänsä taas kultaseppänä: hän oli toipunut vuonna 1656 tilapäisestä näön heikentymisestä. Varmaa tietoa tilauksesta ei ole, ja Norton Simon -museo pitää mahdollisena, että tilaaja oli poika. Kuvassa on hänen työvälineitään: pieni vasara, jauhepurkki ja hopeinen juomamalja.",
        "lahteet": [
          {
            "url": "https://artmuseum.princeton.edu/art/collections/objects/7255",
            "title": "Princeton University Art Museum: Lutma"
          },
          {
            "url": "https://www.nortonsimon.org/art/detail/P.1961.36",
            "title": "Norton Simon Museum: Lutma"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-550",
            "title": "Rijksmuseum: Lutma (RP-P-OB-550)"
          }
        ]
      }
    ]
  },
  "SK-A-3276": {
    "kysymykset": [
      "Mitä Jeremia suree Rembrandtin maalauksessa?",
      "Mitä esineitä Jeremian vieressä on?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä Jeremia suree Rembrandtin maalauksessa?",
        "vastaus": "Ikääntynyt profeetta Jeremia nojaa päätään käteensä ja suree Jerusalemin tuhoa: taustalla palaa kaupunki, ja vasemmalla alhaalla näkyy soturit. Rembrandt vahvisti draamaa voimakkailla valon ja varjon kontrasteilla. Profeetan parrakkaan pään hän mallinsi vanhoista miehistä, joita hän etsasi tuohon aikaan usein.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-3276",
            "title": "Jeremiah Lamenting the Destruction of Jerusalem (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Jeremiah_Lamenting_the_Destruction_of_Jerusalem",
            "title": "Jeremiah Lamenting the Destruction of Jerusalem (Wikipedia)"
          }
        ]
      },
      {
        "kysymys": "Mitä esineitä Jeremian vieressä on?",
        "vastaus": "Profeetan vieressä kivellä on kultainen vati, kannu ja kirjoja. Rijksmuseon kuvauksen mukaan ne ovat tuhoutuneen temppelin pyhiä esineitä. Paksu kirja, johon Jeremia nojaa, on Raamattu: Stroganovien kokoelman luettelo mainitsi jo vuonna 1793 kirjan nimellä 'La Bible'. Maalaus on signeerattu ja päivätty 1630.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-3276",
            "title": "Jeremiah Lamenting the Destruction of Jerusalem (Rijksmuseum)"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/stories/rembrandt-van-rijn/story/jeremiah-lamenting",
            "title": "Jeremiah Lamenting the Destruction of Jerusalem (Rijksmuseum, 100 masterpieces)"
          }
        ]
      }
    ]
  },
  "RP-P-1961-1117": {
    "kysymykset": [
      "Mitä Rembrandtin Jagertje-etsauksessa tapahtuu?",
      "Onko Jagertjen maisema todellinen?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä Rembrandtin Jagertje-etsauksessa tapahtuu?",
        "vastaus": "Metsästäjä kulkee polkua kahden koiran kanssa selkä vuoria kohti. Olallaan hänellä on pitkä keppi, jolla jänikset voi ajaa koloistaan. Saalista ei näy, joten metsästys ei Rijksmuseon kuvauksen mukaan ole todennäköisesti vielä alkanut. Työ on etsaus ja kuivaneula, noin vuodelta 1648.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-P-1961-1117",
            "title": "Landscape with Sportsman and Dogs ('Het jagertje') (Rijksmuseum)"
          }
        ]
      },
      {
        "kysymys": "Onko Jagertjen maisema todellinen?",
        "vastaus": "Vain osittain. Kylä on Diemen, mutta Rembrandt sijoitti sen kuvitellun vuoristoalueen juurelle. Maisema on siis yhdistelmä todellista paikkaa ja keksittyä taustaa. Etsaus on pieni, noin 13 × 16 senttimetriä, ja Rijksmuseo ajoittaa sen noin vuoteen 1648.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-P-1961-1117",
            "title": "Landscape with Sportsman and Dogs ('Het jagertje') (Rijksmuseum)"
          }
        ]
      }
    ]
  },
  "RP-P-OB-810": {
    "kysymykset": [
      "Miten Segers teki värilliset vedoksensa?",
      "Mitä Segersin kaukomaisemassa on näkyvissä?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miten Segers teki värilliset vedoksensa?",
        "vastaus": "Tämä vedos on viivaetsaus, joka on painettu tummansinisellä puuvillakankaalle ja värjätty käsin ruskealla, vihreällä ja sinisellä maalilla. Segers painoi etsauksiaan myös paperille ja pellavalle ja värjäsi niitä käsin. Rijksmuseo nimeää tekijäksi Segersin; työpaikaksi merkitty Amsterdam on museon tiedoissa epävarma.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-810",
            "title": "Distant View with a Road and Mossy Branches (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Hercules_Segers",
            "title": "Hercules Segers (Wikipedia)"
          }
        ]
      },
      {
        "kysymys": "Mitä Segersin kaukomaisemassa on näkyvissä?",
        "vastaus": "Kuvitteellinen laaja maisema: etualalla kiviä ja sammaleisia oksia, sitten leveä kärrynjälkien uurtama tie, jolla pieni hahmo kiirehtii linnakkeella varustettua kaupunkia kohti. Kauempana on tasanko, mutkitteleva joki ja kukkuloita. Veneet, padot ja saaret erottuvat vain terävimmistä vedoksista. Vedos on noin vuosilta 1622–1625.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-810",
            "title": "Distant View with a Road and Mossy Branches (Rijksmuseum)"
          }
        ]
      }
    ]
  },
  "SK-A-2338": {
    "kysymykset": [
      "Miksi Ruyschin kimppua olisi vaikea koota oikeasti?",
      "Kuka Rachel Ruysch oli?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Ruyschin kimppua olisi vaikea koota oikeasti?",
        "vastaus": "Kimpussa on yli kymmenen kukkalajia, muun muassa ruusuja, unikoita, kurjenmiekkoja ja neilikoita, ja ne kukkivat eri aikoihin. Tosielämässä sellaista kimppua olisi vaikea koota. Ruysch tutki eläviä ja preparoituja kukkia ja yhdisti ne yhdeksi kuvaksi. Maljakossa ja kukkien joukossa on myös runsaasti hyönteisiä.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-2338",
            "title": "Still Life with Flowers on a Marble Tabletop (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Rachel_Ruysch",
            "title": "Rachel Ruysch (Wikipedia)"
          }
        ]
      },
      {
        "kysymys": "Kuka Rachel Ruysch oli?",
        "vastaus": "Ruysch oli yksi aikansa tunnetuimpia eurooppalaisia kukka-asetelmien maalareita. Hänen isänsä Frederik Ruysch oli anatomian ja kasvitieteen professori, jonka kokoelmista tytär harjoitteli piirtämistä. Ruysch oli Düsseldorfin hovimaalari vuodesta 1708, ja tämä maalaus syntyi vuonna 1716, jolloin vaaliruhtinas Johann Wilhelm kuoli.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Rachel_Ruysch",
            "title": "Rachel Ruysch (Wikipedia)"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-2338",
            "title": "Still Life with Flowers on a Marble Tabletop (Rijksmuseum)"
          }
        ]
      }
    ]
  },
  "SK-A-2099": {
    "kysymykset": [
      "Mikä erottaa Coorten parsan runsaista asetelmista?",
      "Millä tekniikalla Coorten parsa on maalattu?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä erottaa Coorten parsan runsaista asetelmista?",
        "vastaus": "Coorte maalasi pieniä, hillittyjä asetelmia yksinkertaisista aiheista, kuten parsasta tai marjoista. Aikansa muodikkaiden runsaiden asetelmien sijaan tässä huomio on yhden vihanneksen hienossa kuvauksessa. Tumma tausta ja valo, joka osuu aiheeseen kuin kohdevalo, korostavat sitä. Teos on signeerattu ja päivätty 1697.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-2099",
            "title": "Still Life with Asparagus (Rijksmuseum)"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/stories/one-hundred-masterpieces/story/still-life-asparagus",
            "title": "Still Life with Asparagus (Rijksmuseum, 100 masterpieces)"
          }
        ]
      },
      {
        "kysymys": "Millä tekniikalla Coorten parsa on maalattu?",
        "vastaus": "Öljyvärillä paperille, joka on liimattu puupaneelille. Pieni teos on noin 25 senttimetriä korkea. Coorte maalasi usein juuri paperille, ja hän kuvasi mieluiten vaatimattomia kohteita kuten parsaa, mansikoita ja karviaisia. Hän oli oman aikansa jälkeen lähes unohdettu, ja hänen tuotantonsa arvostus alkoi nousta vasta 1900-luvun puolivälissä.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-2099",
            "title": "Still Life with Asparagus (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Adriaen_Coorte",
            "title": "Adriaen Coorte (Wikipedia)"
          }
        ]
      }
    ]
  },
  "SK-C-206": {
    "kysymykset": [
      "Miksi Potterin sonnit näyttävät niin mahtavilta?",
      "Millainen maalari Paulus Potter oli?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Potterin sonnit näyttävät niin mahtavilta?",
        "vastaus": "Neljä nuorta sonnia erottuu pilvisen harmaata taivasta vasten. Niiden painavat ruumiit heittävät tummia varjoja, ja matala katselukulma saa eläimet vaikuttamaan entistä mahtavammilta. Matalaa katsontapistettä Potter käytti muutenkin maisemissaan, joissa on eläimiä.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-C-206",
            "title": "Four Young Bulls in a Meadow (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Paulus_Potter",
            "title": "Paulus Potter (Wikipedia)"
          }
        ]
      },
      {
        "kysymys": "Millainen maalari Paulus Potter oli?",
        "vastaus": "Rijksmuseon mukaan Potter oli ensimmäinen maalari, joka antoi hollantilaiselle karjalle pääroolin. Hän erikoistui eläimiä sisältäviin maisemiin ja maalasi noin sata työtä. Potter kuoli tuberkuloosiin vuonna 1654, vain 28-vuotiaana. Tunnetuin työ on Nuori sonni, joka on Haagin Mauritshuisissa.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-C-206",
            "title": "Four Young Bulls in a Meadow (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Paulus_Potter",
            "title": "Paulus Potter (Wikipedia)"
          }
        ]
      }
    ]
  },
  "SK-A-2326": {
    "kysymykset": [
      "Miksi Leysterin lutunsoittajaa kutsutaan Serenadiksi?",
      "Miten Leysterin tekijyys paljastui?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Leysterin lutunsoittajaa kutsutaan Serenadiksi?",
        "vastaus": "Teoksessa hymyilevä lutunsoittaja katsoo ylöspäin, mahdollisesti rakastettuaan kohti, ja se sopii ajan käsitykseen rakkauden ja musiikin yhteydestä. Hahmo on kuvattu läheltä ja alhaalta päin kuin näyttämöllä. Hänen asunsa on aikalaismuodin mukainen sulkabaretti, viilloshihainen takki ja pitsikaulus.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-2326",
            "title": "The Serenade (Rijksmuseum)"
          }
        ]
      },
      {
        "kysymys": "Miten Leysterin tekijyys paljastui?",
        "vastaus": "Serenadia pidettiin pitkään Halsin työnä: Bode esitti sen Jan Halsin tekemäksi vuonna 1883. Vuonna 1893 Cornelis Hofstede de Groot tunnisti teoksen J-kirjaimen ja tähden monogrammin Judith Leysterin merkiksi. Tähti viittaa hänen sukunimeensä, joka tarkoittaa ohjaavaa tähteä (lodestar).",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-2326",
            "title": "The Serenade (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Judith_Leyster",
            "title": "Judith Leyster (Wikipedia)"
          }
        ]
      }
    ]
  },
  "SK-A-1685": {
    "kysymykset": [
      "Mitä tupakka ja kannu kertovat Iloisesta juojasta?",
      "Mistä Iloinen juoja muistuttaa Frans Halsia?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä tupakka ja kannu kertovat Iloisesta juojasta?",
        "vastaus": "Nauravaposkinen, juopunut mies hohtavin poskin nostaa tyhjää kantista kannua, ja pöydällä ovat hiilipannu, piippu ja tupakka. Rijksmuseon mukaan hän on juojan lisäksi tupakoitsija: Haarlemin moralistit pitivät tupakointia ja juomista toisiinsa liittyvinä paheina. Kannun tyhjyys kuuluu tyyppiin: näytös on lopussa.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-1685",
            "title": "The Jolly Drinker (Rijksmuseum)"
          }
        ]
      },
      {
        "kysymys": "Mistä Iloinen juoja muistuttaa Frans Halsia?",
        "vastaus": "Leyster otti Halsilta mallia, ja Rijksmuseon mukaan sulkamotiivi on peräisin Halsin teoksesta Nuori mies pääkallon kanssa. Hän omaksui Halsilta vinon asennon, tyhjän seinän ja leveän siveltimenjäljen. Siksi maalausta pidettiin pitkään Halsin työnä, kunnes Leysterin monogrammi tunnistettiin vuonna 1893.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-1685",
            "title": "The Jolly Drinker (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Judith_Leyster",
            "title": "Judith Leyster (Wikipedia)"
          }
        ]
      }
    ]
  },
  "SK-A-4050": {
    "kysymykset": [
      "Miksi Rembrandt maalasi itsensä apostoli Paavalina?",
      "Mistä Paavalin tunnistaa Rembrandtin omakuvasta?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Rembrandt maalasi itsensä apostoli Paavalina?",
        "vastaus": "Varmaa syytä ei tunneta. Rijksmuseon mukaan oman kasvon käyttö kutsuu katsojan kohtaamaan pyhän henkilökohtaisesti. Taidehistorioitsijat ovat arvelleet, että Paavali oli 1600-luvun protestanteille tärkeä hahmo ja opettaja, kuten Rembrandt omalla taiteellaan. Hän oli maalatessaan noin 55-vuotias.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-4050",
            "title": "Self-portrait as the Apostle Paul (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Self-Portrait_as_the_Apostle_Paul",
            "title": "Self-Portrait as the Apostle Paul (Wikipedia)"
          }
        ]
      },
      {
        "kysymys": "Mistä Paavalin tunnistaa Rembrandtin omakuvasta?",
        "vastaus": "Paavali tunnistetaan hänen perinteisistä tunnusesineistään: miekka näkyy viitan alta ja kädessä on nippu kirjeitä eli käsikirjoituksia. Päässä on valkoinen turbaani, jonka maali on paksua. Rijksmuseon kertomuksessa kehotetaan katsomaan juuri tuota paksua maalia.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-4050",
            "title": "Self-portrait as the Apostle Paul (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Self-Portrait_as_the_Apostle_Paul",
            "title": "Self-Portrait as the Apostle Paul (Wikipedia)"
          }
        ]
      }
    ]
  },
  "SK-A-3137": {
    "kysymykset": [
      "Kuka paljasti Pietarin Rembrandtin maalauksessa?",
      "Miten Pietarin kieltäminen päätyi Rijksmuseoon?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuka paljasti Pietarin Rembrandtin maalauksessa?",
        "vastaus": "Palvelijatar kynttilä kädessä tunnistaa Pietarin Jeesuksen opetuslapseksi, ja Pietari kiistää sen. Taustalla sotilaat vievät Jeesusta pois, ja tämä katsoo olkansa yli taaksepäin Pietaria. Rembrandt on allekirjoittanut ja päivännyt maalauksen vuodelle 1660.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-3137",
            "title": "The Denial of St Peter, Rembrandt van Rijn, 1660 (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/The_Denial_of_Saint_Peter_(Rembrandt)",
            "title": "The Denial of Saint Peter (Rembrandt) (Wikipedia)"
          }
        ]
      },
      {
        "kysymys": "Miten Pietarin kieltäminen päätyi Rijksmuseoon?",
        "vastaus": "Maalaus myytiin vuonna 1781 Venäjän keisarinna Katariina II:lle, ja se päätyi Eremitaasiin Pietariin. Myöhemmin Neuvostoliitto myi sen pois muiden teosten mukana. Vereniging Rembrandt -yhdistys osti sen Lontoon kautta Rijksmuseolle vuonna 1933.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-3137",
            "title": "The Denial of St Peter, Rembrandt van Rijn, 1660 (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/The_Denial_of_Saint_Peter_(Rembrandt)",
            "title": "The Denial of Saint Peter (Rembrandt) (Wikipedia)"
          }
        ]
      }
    ]
  },
  "SK-C-230": {
    "kysymykset": [
      "Mitä lääkäri yrittää selvittää sairaasta naisesta?",
      "Miksi Steenin lääkäri on vanhanaikaisessa asussa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä lääkäri yrittää selvittää sairaasta naisesta?",
        "vastaus": "Nuori nainen on heikko, ja hänen sairautensa voi olla rakastumista tai raskaus. Rijksmuseon mukaan tällainen kvasilääkäri poltti kaistaleen potilaan vaatteesta hiilloksessa, jotta haju paljastaisi salaisuuden.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-C-230",
            "title": "The Sick Woman, Jan Havicksz. Steen (Rijksmuseum)"
          },
          {
            "url": "https://hekint.org/2018/08/30/jan-steen-quack-doctors-visit-lovesick-maidens/",
            "title": "Jan Steen: Quack Doctors Visit Lovesick Maidens (Hektoen International)"
          }
        ]
      },
      {
        "kysymys": "Miksi Steenin lääkäri on vanhanaikaisessa asussa?",
        "vastaus": "Steen esittää lääkärin huijarina, ja Rijksmuseon mukaan vanhanaikainen asu tekee hänestä koomisen hahmon. Steen oli tunnettu juuri lääkärikäyntiaiheistaan.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-C-230",
            "title": "The Sick Woman, Jan Havicksz. Steen (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Jan_Steen",
            "title": "Jan Steen (Wikipedia)"
          }
        ]
      }
    ]
  },
  "SK-A-385": {
    "kysymykset": [
      "Mitä itkevä poika löysi kengästään Steenin maalauksessa?",
      "Mitä tyttö pitää sylissään Steenin Nikolaus-maalauksessa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä itkevä poika löysi kengästään Steenin maalauksessa?",
        "vastaus": "Itkevä poika vasemmalla löysi kengästään vain risukimpun, merkiksi siitä että oli ollut tuhma. Joissakin kuvauksissa kenkä on kuitenkin tyhjä. Keskellä oleva tyttö taas sai hyvän lapsen palkkiona herkkuja.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-385",
            "title": "The Feast of St Nicholas, Jan Havicksz. Steen (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/The_Feast_of_Saint_Nicholas",
            "title": "The Feast of Saint Nicholas (Wikipedia)"
          }
        ]
      },
      {
        "kysymys": "Mitä tyttö pitää sylissään Steenin Nikolaus-maalauksessa?",
        "vastaus": "Tyttö pitää sylissään nukkea, joka esittää Johannes Kastajaa, ja kädessään hän kantaa ämpäriä täynnä herkkuja. Nukke on tulkittu kamelinkarvapaitaan pukeutuneeksi hahmoksi, jolla on pitkä risti. Juhlaa vietetään Alankomaissa joulukuussa, ja lahjat löytyvät lasten kengistä.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-385",
            "title": "The Feast of St Nicholas, Jan Havicksz. Steen (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/The_Feast_of_Saint_Nicholas",
            "title": "The Feast of Saint Nicholas (Wikipedia)"
          }
        ]
      }
    ]
  },
  "SK-A-404": {
    "kysymykset": [
      "Miksi maalausta kutsutaan nimellä Isän neuvo?",
      "Miksi Ter Borchin satiinia ihailtiin?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi maalausta kutsutaan nimellä Isän neuvo?",
        "vastaus": "Nimi tulee Johann Georg Willen vuonna 1765 Pariisissa julkaisemasta kaiverruksesta Instruction paternelle, joka esitti isän nuhtelevan tytärtään; Goethekin tulkitsi kuvan niin romaanissaan Die Wahlverwandtschaften. Nykytutkijat näkevät kuvassa joko kosiskelun tai asiakkaan ja prostituoidun kohtaamisen. Rijksmuseon mukaan Ter Borch todennäköisesti jätti aiheen tahallaan monitulkintaiseksi.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-404",
            "title": "Gallant Conversation, Known as 'The Paternal Admonition', Gerard ter Borch (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/The_Gallant_Conversation",
            "title": "The Gallant Conversation (Wikipedia)"
          },
          {
            "url": "https://works.wellcomecollection.org/works/n6eveqct",
            "title": "Instruction paternelle, print after ter Borch (Wellcome Collection)"
          }
        ]
      },
      {
        "kysymys": "Miksi Ter Borchin satiinia ihailtiin?",
        "vastaus": "Ter Borch osasi kuvata kankaita, erityisesti satiinia, poikkeuksellisen tarkasti. Naisen hopeanvalkoisen puvun kiilto ja laskokset vetävät katseen tummien sävyjen keskeltä. Rijksmuseon luettelossa tutkija kutsuu hänen satiininsa kuvausta fenomenaaliseksi.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-404",
            "title": "Gallant Conversation, Known as 'The Paternal Admonition', Gerard ter Borch (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/The_Gallant_Conversation",
            "title": "The Gallant Conversation (Wikipedia)"
          }
        ]
      }
    ]
  },
  "SK-A-351": {
    "kysymykset": [
      "Miksi Haarlemin edustalla oli valkaisupeltoja?",
      "Miksi Ruisdaelin kuvassa on niin paljon taivasta?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Haarlemin edustalla oli valkaisupeltoja?",
        "vastaus": "Pellavakangasta levitettiin pelloille auringon valkaistavaksi. Pellavavalkaisu oli Haarlemin tärkeitä elinkeinoja Ruisdaelin aikaan, ja se tarvitsi paljon vettä. Rijksmuseon mukaan valkaisu hyödynsi dyynien puhdasta vettä.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-351",
            "title": "View of Haarlem from the Northwest, with the Bleaching Fields in the Foreground, Jacob van Ruisdael (Rijksmuseum)"
          },
          {
            "url": "https://theartwolf.com/masterworks/landscapes/van-ruysdael-haarlem-bleaching-grounds/",
            "title": "Van Ruysdael: View of Haarlem with Bleaching Grounds (The Art Wolf)"
          }
        ]
      },
      {
        "kysymys": "Miksi Ruisdaelin kuvassa on niin paljon taivasta?",
        "vastaus": "Ruisdael asetti horisontin hyvin matalalle, jolloin suurin osa kankaasta jää leveälle, pilvien täyttämälle taivaalle. Näkymä on otettu korkealta dyynilta, ja kaukana siintää Haarlemin silhuetti ja Pyhän Bavon kirkon korkea katto.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-351",
            "title": "View of Haarlem from the Northwest, with the Bleaching Fields in the Foreground, Jacob van Ruisdael (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/View_of_Haarlem_from_the_Northwest,_with_the_Bleaching_Fields_in_the_Foreground",
            "title": "View of Haarlem from the Northwest, with the Bleaching Fields in the Foreground (Wikipedia)"
          }
        ]
      }
    ]
  },
  "SK-A-1320": {
    "kysymykset": [
      "Miksi Avercampia kutsuttiin ”mykäksi”?",
      "Mitä jäällä tapahtuu Avercampin kylämaisemassa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Avercampia kutsuttiin ”mykäksi”?",
        "vastaus": "Avercamp tunnettiin lempinimellä ”de Stomme”, mykkä. Häntä on pitkään pidetty syntymästään kuurona ja mykkänä, vaikka nimitys ei yksin todista sitä. Hän asui suurimman osan elämästään Kampenissa ja tuli tunnetuksi talvimaisemistaan.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-T-1886-A-684/catalogue-entry",
            "title": "Hendrick Avercamp, biography (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Hendrick_Avercamp",
            "title": "Hendrick Avercamp (Wikipedia)"
          }
        ]
      },
      {
        "kysymys": "Mitä jäällä tapahtuu Avercampin kylämaisemassa?",
        "vastaus": "Jäällä luistellaan ja ajetaan kelkalla, mutta arki jatkuu: nainen pesee pyykkiä avannossa ja mies kantaa ruokokimppua. Talonpoika kiiruhtaa tikkaiden kanssa auttamaan neljää jäihin pudonnutta. Teos kuuluu talvimaisemien (wintertjes) perinteeseen.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-1320",
            "title": "Ice-Skating in a Village, Hendrick Avercamp (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Hendrick_Avercamp",
            "title": "Hendrick Avercamp (Wikipedia)"
          }
        ]
      }
    ]
  },
  "SK-C-244": {
    "kysymykset": [
      "Mikä on Tykinlaukauksen vastinkappale?",
      "Miksi van de Velde nuorempi muutti Englantiin?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä on Tykinlaukauksen vastinkappale?",
        "vastaus": "Vastinkappale on saman taiteilijan Puuska (The Gust), noin vuodelta 1680. Tykinlaukauksessa hollantilainen sotalaiva makaa tyynellä merellä purjeet löysällä ja ampuu kunnialaukauksen. Puuskassa tuulenpuuska katkaisee englantilaisen sotalaivan yhden mastoista.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-C-244",
            "title": "The Cannon Shot, Willem van de Velde (II) (Rijksmuseum)"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-1848",
            "title": "A Ship on the High Seas Caught by a Squall, Known as 'The Gust' (Rijksmuseum)"
          }
        ]
      },
      {
        "kysymys": "Miksi van de Velde nuorempi muutti Englantiin?",
        "vastaus": "Willem van de Velde nuorempi siirtyi isänsä kanssa Englannin hovin palvelukseen vuoden 1672 tienoilla. Sodat Ranskan kanssa ajoivat heidät pois Alankomaista, ja Kaarle II palkkasi molemmat. Tykinlaukaus ja sen vastinkappale maalattiin noin vuonna 1680, taiteilijan Englannin-vuosina.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-1848",
            "title": "A Ship on the High Seas Caught by a Squall, Known as 'The Gust' (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Willem_van_de_Velde_the_Younger",
            "title": "Willem van de Velde the Younger (Wikipedia)"
          }
        ]
      }
    ]
  },
  "SK-A-45": {
    "kysymykset": [
      "Mitä Caritas tarkoittaa Bolin muotokuvassa?",
      "Keitä Bolin Caritas-maalauksessa on?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä Caritas tarkoittaa Bolin muotokuvassa?",
        "vastaus": "Caritas on hyväntekeväisyyden vertauskuva. Joanna de Geer on kuvattu huolehtivana äitinä lastensa ja pienen koiran kanssa, minkä vuoksi teos tulkitaan hyväntekeväisyyden allegoriaksi.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-45",
            "title": "Caritas: Joanna de Geer with her Children Cecilia Trip and Laurens Trip, Ferdinand Bol (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Portrait_of_Johanna_de_Geer_and_her_Children_as_Charity",
            "title": "Portrait of Johanna de Geer and her Children as Charity (Wikipedia)"
          }
        ]
      },
      {
        "kysymys": "Keitä Bolin Caritas-maalauksessa on?",
        "vastaus": "Kuvassa on Joanna de Geer sekä hänen lapsensa Cecilia ja Laurens Trip. Joanna oli kauppias Hendrik Tripin toinen vaimo, ja maalaus oli alun perin tarkoitettu Trippenhuisin, Hendrikin ja Louis Tripin Amsterdamiin rakennuttaman kaksoistalon, takan päälle.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-45",
            "title": "Caritas: Joanna de Geer with her Children Cecilia Trip and Laurens Trip, Ferdinand Bol (Rijksmuseum)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Portrait_of_Johanna_de_Geer_and_her_Children_as_Charity",
            "title": "Portrait of Johanna de Geer and her Children as Charity (Wikipedia)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Trippenhuis",
            "title": "Trippenhuis (Wikipedia)"
          }
        ]
      }
    ]
  },
  "SK-A-156": {
    "kysymykset": [
      "Kuka opetti Hobbemaa maalaamaan?",
      "Mikä oli Hobbeman päivätyö?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kuka opetti Hobbemaa maalaamaan?",
        "vastaus": "Hobbema oppi maisemamaalauksen Jacob van Ruisdaelilta, joka todisti vuonna 1660 Hobbeman palvelleen ja oppineen luonaan joitakin vuosia. Rijksmuseon mukaan opettajan ja oppilaan työt muistuttavat toisiaan, mutta Hobbeman vaikutelma on ystävällisempi ja valoisampi.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-156",
            "title": "A Watermill, Meindert Hobbema (Rijksmuseum)"
          },
          {
            "url": "https://allenartcollection.oberlin.edu/people/4002/meindert-hobbema",
            "title": "Meindert Hobbema (Allen Memorial Art Museum, Oberlin)"
          }
        ]
      },
      {
        "kysymys": "Mikä oli Hobbeman päivätyö?",
        "vastaus": "Vuonna 1668 Hobbemasta tuli Amsterdamin viininmittaaja, jonka työ oli viinin veroittamiseen liittyvää, ja hän piti virkaa kuolemaansa saakka. Sen jälkeen hän maalasi selvästi vähemmän, vaikka tunnetuin teos Middelharnisin lehtokuja syntyi vasta 1689.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Meindert_Hobbema",
            "title": "Meindert Hobbema (Wikipedia)"
          },
          {
            "url": "https://allenartcollection.oberlin.edu/people/4002/meindert-hobbema",
            "title": "Meindert Hobbema (Allen Memorial Art Museum, Oberlin)"
          }
        ]
      }
    ]
  },
  "SK-A-3957": {
    "kysymykset": [
      "Onko tämä maalaus varmasti Aelbert Cuypin tekemä?",
      "Mistä tämän maiseman kultainen valo tulee?"
    ],
    "vastaukset": [
      {
        "kysymys": "Onko tämä maalaus varmasti Aelbert Cuypin tekemä?",
        "vastaus": "Ei aivan varmasti. Rijksmuseum merkitsee tekijän varauksella: teoksessa on Cuypin signeeraus, mutta tutkija Alan Chong piti kuvaa 1800-luvun alun jäljitelmänä. Museo ei hyväksy tätä, ja puulevyn vuosirenkaiden tutkimus osoittaa levyn olleen käyttövalmis jo noin 1639.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-3957",
            "title": "River Landscape with Cows - Rijksmuseum (SK-A-3957)"
          }
        ]
      },
      {
        "kysymys": "Mistä tämän maiseman kultainen valo tulee?",
        "vastaus": "Taustalla hehkuu illan auringon pehmeä kultainen valo, jonka Rijksmuseumin luettelo tunnistaa Cuypille tyypilliseksi. Cuyp omaksui 1640-luvun puolivälissä Jan Bothin italialaisvaikutteisen tavan tuoda valo viistosti kuvan taustalta.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-3957",
            "title": "River Landscape with Cows - Rijksmuseum (SK-A-3957)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Aelbert_Cuyp",
            "title": "Aelbert Cuyp - Wikipedia"
          }
        ]
      }
    ]
  },
  "SK-A-2979": {
    "kysymykset": [
      "Mikä Amsterdamin kulma on Breitnerin talvikuvassa?",
      "Käyttikö Breitner valokuvia maalaustensa apuna?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mikä Amsterdamin kulma on Breitnerin talvikuvassa?",
        "vastaus": "Maalaus esittää Brouwersgrachtin ja Korte Prinsengrachtin kulmaa Amsterdamissa. Lumisen kanavamaiseman etualalla on useita proomuja. Rijksmuseum ajoittaa teoksen noin vuosiin 1900-1901.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/SK-A-2979",
            "title": "Winter in Amsterdam - Rijksmuseum (SK-A-2979)"
          }
        ]
      },
      {
        "kysymys": "Käyttikö Breitner valokuvia maalaustensa apuna?",
        "vastaus": "Kyllä. Breitner käytti valokuvia maalaustensa apuna vuodesta 1889, ja niiden suora, rajattu kuvakulma näkyy hänen maalauksissaan. Kriitikot pitivät hänen rajattuja sommitelmiaan aluksi keskeneräisinä. Hän piirsi myös jatkuvasti, ja Rijksmuseumilla on 119 hänen luonnoskirjaansa.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/stories/dutch-masters/story/george-hendrik-breitner-10",
            "title": "George Hendrik Breitner - Rijksmuseum"
          },
          {
            "url": "https://en.wikipedia.org/wiki/George_Hendrik_Breitner",
            "title": "George Hendrik Breitner - Wikipedia"
          }
        ]
      }
    ]
  },
  "SK-A-1328": {
    "kysymykset": [
      "Keitä Keltaiset ratsastajat olivat?",
      "Miksi tämä maalaus teki Breitnerin tunnetuksi?"
    ],
    "vastaukset": [
      {
        "kysymys": "Keitä Keltaiset ratsastajat olivat?",
        "vastaus": "Rijksmuseum kuvaa heitä eliittiyksiköksi, ratsastavaksi tykistöksi, joka laukkaa dyyniltä alas ällistyttävää vauhtia. Univormuissa näkyvät mustapunaiset karvalakit ja kultanauhat. Etummaisten hevosten nostattama hiekka peittää takana tulevat ratsastajat.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/object/SK-A-1328--ca80fe396099a6b215dcde3d9ab94e66",
            "title": "The Yellow Riders - Rijksmuseum (SK-A-1328)"
          }
        ]
      },
      {
        "kysymys": "Miksi tämä maalaus teki Breitnerin tunnetuksi?",
        "vastaus": "Rijksmuseum osti maalauksen vuonna 1886, ja ostoa pidetään Breitnerin läpimurtona. Aihe, hevoset ja sotaharjoitukset, oli tyypillinen hänen varhaiselle tuotannolleen.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/stories/dutch-masters/story/george-hendrik-breitner-10",
            "title": "George Hendrik Breitner - Rijksmuseum"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/collection/object/SK-A-1328--ca80fe396099a6b215dcde3d9ab94e66",
            "title": "The Yellow Riders - Rijksmuseum (SK-A-1328)"
          }
        ]
      }
    ]
  },
  "mauritshuis-605": {
    "kysymykset": [
      "Miten Tiklin maalaaja Carel Fabritius kuoli?",
      "Miten Tikli löytyi uudelleen yli kahden vuosisadan jälkeen?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miten Tiklin maalaaja Carel Fabritius kuoli?",
        "vastaus": "Rembrandtin oppilaana opiskellut Fabritius kuoli Delftin ruutivaraston räjähdyksessä vuonna 1654 vain noin 32-vuotiaana. Räjähdys tuhosi suuren osan kaupunkia, ja hänen töistään on säilynyt vain noin 12–15.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/The_Goldfinch_(painting)",
            "title": "The Goldfinch (painting) – Wikipedia"
          },
          {
            "url": "https://www.dutchnews.nl/2015/09/10-things-you-might-like-to-know-about-the-goldfinch",
            "title": "10 things you might like to know about the Goldfinch – DutchNews"
          }
        ]
      },
      {
        "kysymys": "Miten Tikli löytyi uudelleen yli kahden vuosisadan jälkeen?",
        "vastaus": "Maalaus oli kadoksissa yli kaksi vuosisataa ja ilmestyi uudelleen Brysselissä vuonna 1859. Ranskalainen kriitikko Théophile Thoré-Bürger, Vermeerin uudelleenlöytäjä, omisti sen myöhemmin: hän sai sen vuonna 1865 lahjaksi tai perintönä Brysselin keräilijä Camberlynin perillisiltä. Mauritshuisin kokoelmassa se on ollut vuodesta 1896.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/The_Goldfinch_(painting)",
            "title": "The Goldfinch (painting) – Wikipedia"
          },
          {
            "url": "https://www.dutchnews.nl/2015/09/10-things-you-might-like-to-know-about-the-goldfinch",
            "title": "10 things you might like to know about the Goldfinch – DutchNews"
          }
        ]
      }
    ]
  },
  "fhm-os-i-116": {
    "kysymykset": [
      "Keitä Haarlemin vanhustenkodin naiset olivat?",
      "Miksi Halsin pensselinjälki on tässä niin karkeaa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Keitä Haarlemin vanhustenkodin naiset olivat?",
        "vastaus": "He olivat Haarlemin Oudemannenhuisin eli vanhojen miesten almutalon neljä hallintonaista, ja oikealla on lisäksi talon johtaja. Vasemmalta oikealle naiset ovat nimeltä Adriaentje Schouten, Marijtje Willemsdr, Anna van Damme ja Adriana Bredenhof. Vauraat kansalaiset hoitivat tehtävää vapaaehtoisesti: miehet vastasivat rahoista, naiset talon arjesta.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Regentesses_of_the_Old_Men%27s_Almshouse",
            "title": "Regentesses of the Old Men's Almshouse - Wikipedia"
          },
          {
            "url": "https://www.nhnieuws.nl/nieuws/318740/de-verdwenen-stad-het-frans-hals-museum-was-ooit-bedoeld-voor-oude-mannen",
            "title": "De Verdwenen Stad: het Frans Hals Museum was ooit bedoeld voor oude mannen - NH Nieuws"
          }
        ]
      },
      {
        "kysymys": "Miksi Halsin pensselinjälki on tässä niin karkeaa?",
        "vastaus": "Hals maalasi teoksen vapaalla, karkeavetoisella myöhäistyylillään, ja viimeistelyn puute on naisten muotokuvissa epätavallista. Siksi sen arvellaan syntyneen hänen elämänsä loppuvaiheessa. Vuosiluku 1664 on perinteinen, eikä sitä ole voitu vahvistaa arkistolähteillä.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Regentesses_of_the_Old_Men%27s_Almshouse",
            "title": "Regentesses of the Old Men's Almshouse - Wikipedia"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Frans_Hals",
            "title": "Frans Hals - Wikipedia"
          }
        ]
      }
    ]
  },
  "vgm-s0005v1962": {
    "kysymykset": [
      "Mitä van Gogh halusi kertoa Perunansyöjien käsillä?",
      "Minkä värisiksi van Gogh maalasi Perunansyöjien kasvot?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä van Gogh halusi kertoa Perunansyöjien käsillä?",
        "vastaus": "Van Gogh halusi näyttää, että lampun valossa perunoita syövät ihmiset ovat itse muokanneet maata samoilla käsillä, joilla he ottavat ruokaa vadista. Hän maalasi teoksen Nuenenissa huhti–toukokuussa 1885, ja yhtenä mallina oli todennäköisesti paikallisen de Grootin perheen Gordina.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/The_Potato_Eaters",
            "title": "en-Wikipedia: The Potato Eaters"
          },
          {
            "url": "https://museothyssen.org/en/node/16915",
            "title": "Museo Thyssen: The Potato Eaters"
          },
          {
            "url": "https://vangoghletters.org/vg/letters/let499/notes.html",
            "title": "Van Gogh Letters: kirje 499, huomautukset"
          }
        ]
      },
      {
        "kysymys": "Minkä värisiksi van Gogh maalasi Perunansyöjien kasvot?",
        "vastaus": "Noin 2. toukokuuta 1885 van Gogh kirjoitti veljelleen Theolle maalanneensa kasvot uudelleen, kun ensimmäinen sävy oli liian vaalea. Hän kuvasi lopullista sävyä pölyisen perunan väriseksi, kuorimattoman tietenkin.",
        "lahteet": [
          {
            "url": "https://vangoghletters.org/vg/letters/let499/letter.html",
            "title": "Van Gogh Letters: kirje 499"
          }
        ]
      }
    ]
  },
  "SK-A-2280": {
    "kysymykset": [
      "Miksi Mesdagin majakkamaalaus on poikkeus?",
      "Miten pankkiirin pojasta tuli merimaalari?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Mesdagin majakkamaalaus on poikkeus?",
        "vastaus": "Mesdag maalasi yleensä mieluummin Scheveningenin kalastajien perinteistä elämää. Rijksmuseumin mukaan tämä kuva on poikkeus: se esittää majakkaa tai oikeammin merimerkkiä korkeiden aaltojen ja tumman myrskytaivaan keskellä. Maalaus on ajoitettu noin vuosiin 1900–1907.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/object/SK-A-2280--e9b43b0883a7826bcaf02e0fdd8af35a",
            "title": "Lighthouse in Breaking Waves - Rijksmuseum (SK-A-2280)"
          }
        ]
      },
      {
        "kysymys": "Miten pankkiirin pojasta tuli merimaalari?",
        "vastaus": "Hendrik Willem Mesdag syntyi 1831 Groningenissa pankkiirin poikana. Kun hän ja hänen vaimonsa olivat perineet omaisuuden, hän jätti pankkiuran noin 35-vuotiaana ja ryhtyi maalariksi. Opintojen jälkeen Brysselissä hän muutti 1868 Haagiin maalaamaan merta, ja vuonna 1870 hän voitti Pariisin salongissa kultamitalin.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Hendrik_Willem_Mesdag",
            "title": "Hendrik Willem Mesdag - Wikipedia"
          }
        ]
      }
    ]
  },
  "vgm-s0149v1962": {
    "kysymykset": [
      "Oliko Vehnäpelto ja varikset van Goghin viimeinen työ?",
      "Mitä Van Gogh kirjoitti pelloista Theolle?"
    ],
    "vastaukset": [
      {
        "kysymys": "Oliko Vehnäpelto ja varikset van Goghin viimeinen työ?",
        "vastaus": "Usein niin väitetään, mutta luultavasti ei. Vuoden 1956 elokuva Lust for Life vahvisti myyttiä. Uusimman tutkimuksen mukaan maalaus tehtiin heinäkuun 1890 alussa, ja noin viikkoa myöhemmin kirjoitettu työluettelo ei mainitse sitä. Van Goghin viimeinen työ oli luultavasti Puunjuuret.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Wheatfield_with_Crows",
            "title": "Wheatfield with Crows - Wikipedia"
          },
          {
            "url": "https://www.theartnewspaper.com/2026/06/12/van-goghs-wheatfields-under-turbulent-skies",
            "title": "Van Gogh's wheatfields 'under turbulent skies' - The Art Newspaper"
          }
        ]
      },
      {
        "kysymys": "Mitä Van Gogh kirjoitti pelloista Theolle?",
        "vastaus": "Noin 10. heinäkuuta 1890 kirjeessä Theolle ja Jolle hän kuvasi valtavia vehnäpeltoja myrskyisen taivaan alla ja kertoi yrittäneensä ilmaista surua ja äärimmäistä yksinäisyyttä. Samassa kappaleessa hän sanoo maiseman olevan terveellistä ja vahvistavaa. Tutkijat eivät ole yksimielisiä siitä, tarkoittaako kirje juuri tätä kangasta.",
        "lahteet": [
          {
            "url": "https://vangoghletters.org/vg/letters/let898/letter.html",
            "title": "Letter to Theo van Gogh and Jo van Gogh-Bonger, on or about 10 July 1890 - Van Gogh Letters"
          },
          {
            "url": "https://www.theartnewspaper.com/2026/06/12/van-goghs-wheatfields-under-turbulent-skies",
            "title": "Van Gogh's wheatfields 'under turbulent skies' - The Art Newspaper"
          }
        ]
      }
    ]
  },
  "kmska-2200": {
    "kysymykset": [
      "Keitä Dam-aukion illan kulkijat ovat?",
      "Maalasiko Breitner tämän kadulla vai ateljeessa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Keitä Dam-aukion illan kulkijat ovat?",
        "vastaus": "Kuvassa kulkee arkinen väkijoukko: sinisessä univormussa oleva palvelijatar pitää hienosti puetun tytön kädestä, ja tehdastyttöjä palaa töistä. Kauempana liikkuu hienoja rouvia ja herroja sekä kaksi raitiovaunuhevosta odottamassa. Hahmot on maalattu nopein vedoin, ja Breitner kuvasi köyhiä ilman sentimentaalisuutta.",
        "lahteet": [
          {
            "url": "https://kmska.be/en/masterpiece/evening-dam-square-amsterdam",
            "title": "Evening on Dam Square in Amsterdam - KMSKA"
          },
          {
            "url": "https://vlaamsekunstcollectie.be/en/collectie/2200",
            "title": "Evening on Dam Square in Amsterdam - Vlaamse Kunstcollectie"
          }
        ]
      },
      {
        "kysymys": "Maalasiko Breitner tämän kadulla vai ateljeessa?",
        "vastaus": "Ateljeessa, vaikka kuva tuntuu syntyneen ulkona. Kadulla Breitner teki muistiinpanoja luonnoskirjoihin, ja niistä sekä piirustuksista ja usein myös valokuvista hän rakensi tilannekuvamaisia kokonaisuuksia. Vuodesta 1890 hän maalasi useita iltahämärän näkymiä Dam-aukiolta.",
        "lahteet": [
          {
            "url": "https://kmska.be/en/masterpiece/evening-dam-square-amsterdam",
            "title": "Evening on Dam Square in Amsterdam - KMSKA"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/stories/dutch-masters/story/george-hendrik-breitner-10",
            "title": "George Hendrik Breitner - Rijksmuseum"
          }
        ]
      }
    ]
  },
  "vgm-s0031v1962": {
    "kysymykset": [
      "Miksi van Gogh maalasi Auringonkukista toisen version?",
      "Miksi Auringonkukkien keltainen on vaarassa tummua?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi van Gogh maalasi Auringonkukista toisen version?",
        "vastaus": "Gauguin ihaili Arlesin Auringonkukkia ja halusi yhden, mutta van Gogh ei halunnut luopua Lontoon versiosta. Tammikuussa 1889 hän maalasi sen sijaan toisinnon (repetition) ja kirjasi sen valmistumisen kirjeeseen 28.1.1889. Tutkijoiden mukaan Amsterdamin maalaus ei ole täsmällinen kopio: värit, maalipinta ja siveltimenjälki poikkeavat.",
        "lahteet": [
          {
            "url": "https://vangoghletters.org/vg/letters/let741/letter.html",
            "title": "Van Gogh Letters: kirje 741"
          },
          {
            "url": "https://vangoghletters.org/vg/letters/let743/letter.html",
            "title": "Van Gogh Letters: kirje 743"
          },
          {
            "url": "https://gulfnews.com/world/americas/how-different-are-van-goghs-sunflowers-1.64813523",
            "title": "Gulf News: How different are Van Gogh's Sunflowers?"
          }
        ]
      },
      {
        "kysymys": "Miksi Auringonkukkien keltainen on vaarassa tummua?",
        "vastaus": "Amsterdamin maalauksesta otettiin kaksi alle millimetrin näytettä, ja niiden perusteella valolle herkkä kromikeltainen tummuu: rikkiä sisältävässä muodossa kromi pelkistyy valon vaikutuksesta. Tutkijoiden mukaan väri on muuttunut ainakin kahdessa näytepaikassa, ja teos on voinut alun perin näyttää erilaiselta.",
        "lahteet": [
          {
            "url": "https://www.uantwerpen.be/en/research-groups/axis/news-and-events/in-the-media/study-pigment-degradation/",
            "title": "Antwerpenin yliopisto: pigmenttien hajoaminen"
          }
        ]
      }
    ]
  },
  "mauritshuis-146": {
    "kysymykset": [
      "Kenen ruumis on Tulpin anatomian oppitunnilla?",
      "Onko maalauksen avattu käsivarsi anatomisesti oikein?"
    ],
    "vastaukset": [
      {
        "kysymys": "Kenen ruumis on Tulpin anatomian oppitunnilla?",
        "vastaus": "Pöydällä makaa yleensä tunnistetun ryöstöstä tuomitun Aris Kindtin ruumis; hänet oli teloitettu samana päivänä. Kirurgikilta sai pitää vain yhden julkisen ruumiinavauksen vuodessa, ja ruumiin täytyi kuulua teloitetulle rikolliselle.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/The_Anatomy_Lesson_of_Dr._Nicolaes_Tulp",
            "title": "The Anatomy Lesson of Dr. Nicolaes Tulp – Wikipedia"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Nicolaes_Tulp",
            "title": "Nicolaes Tulp – Wikipedia"
          }
        ]
      },
      {
        "kysymys": "Onko maalauksen avattu käsivarsi anatomisesti oikein?",
        "vastaus": "Siitä on kiistelty. Vuonna 2006 hollantilaistutkijat toistivat kohtauksen ruumiilla ja löysivät vasemmasta kyynärvarresta useita poikkeamia. Vuoden 2007 tutkimus yhdisti ranteen valkoisen nauhan harvinaiseen kyynärvarren lihasvariaatioon.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/The_Anatomy_Lesson_of_Dr._Nicolaes_Tulp",
            "title": "The Anatomy Lesson of Dr. Nicolaes Tulp – Wikipedia"
          }
        ]
      }
    ]
  },
  "mauritshuis-840": {
    "kysymykset": [
      "Miksi Rembrandt vaihtoi päähineen vuoden 1669 omakuvassa?",
      "Miten Rembrandtin viimeinen omakuva päätyi Haagiin?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Rembrandt vaihtoi päähineen vuoden 1669 omakuvassa?",
        "vastaus": "Röntgenkuva paljastaa, että Rembrandt maalasi ensin päähän valkoisen pellavalakin, jota 1600-luvulla käytettiin vain kotona. Lopullisessa teoksessa on raidallinen, tuolloin itämaisena pidetty lakki, joka tuo kuvaan eksoottisen sävyn. Mauritshuis arvelee, että hän kuvasi ensin nopeasti peilistä näkemänsä ja valitsi vasta sitten haluamansa päähineen.",
        "lahteet": [
          {
            "url": "https://www.mauritshuis.nl/en/our-collection/artworks/840-self-portrait",
            "title": "Rembrandt van Rijn, Self-Portrait (Mauritshuis)"
          }
        ]
      },
      {
        "kysymys": "Miten Rembrandtin viimeinen omakuva päätyi Haagiin?",
        "vastaus": "Teos oli lainassa Rijksmuseossa vuodesta 1925. Natsit veivät sen Alt Ausseen suolakaivokseen, jonne Hitlerin henkilökunta kokosi teoksia suunniteltua Linzin museota varten. Sodan jälkeen se palautettiin Rathenaun perheelle, joka myi sen Mauritshuisille vuonna 1947 Rembrandt-yhdistyksen ja yksityisten tukijoiden avulla.",
        "lahteet": [
          {
            "url": "https://www.mauritshuis.nl/en/what-s-on/exhibitions/exhibitions-from-the-past/loot/rembrandt",
            "title": "Mauritshuis: Loot — Rembrandt"
          },
          {
            "url": "https://www.humboldtforum.org/en/self-portrait-by-rembrandt/",
            "title": "Humboldt Forum: Self-portrait by Rembrandt"
          }
        ]
      }
    ]
  },
  "mauritshuis-92": {
    "kysymykset": [
      "Mihin aikaan aamusta Vermeerin Delft on kuvattu?",
      "Käyttikö Vermeer Delftin näkymässä camera obscuraa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mihin aikaan aamusta Vermeerin Delft on kuvattu?",
        "vastaus": "Taivas on aamutaivas ja täyttää noin puolet kuvasta. Schiedamin portin pieni kello näyttää yleisimmän tulkinnan mukaan hieman yli seitsemää, mutta kellotaulu on epäselvä ja tutkijat ovat lukeneet ajan eri tavoin, jopa lähes kahdeksaksi.",
        "lahteet": [
          {
            "url": "https://essentialvermeer.com/cat_about/view.html",
            "title": "View of Delft – Essential Vermeer"
          },
          {
            "url": "https://drrichardstemp.com/2023/03/02/189-vermeer-of-delft/",
            "title": "Vermeer… of Delft – Richard Stemp"
          }
        ]
      },
      {
        "kysymys": "Käyttikö Vermeer Delftin näkymässä camera obscuraa?",
        "vastaus": "Siitä kiistellään. Taidehistorioitsija Arthur Wheelock Jr. uskoo Vermeerin käyttäneen sitä: rakennusten ja veden pehmeät, hajanaiset valokohdat sekä veneiden pistemäiset korostukset muistuttavat osittain tarkennettua linssikuvaa. Karl Schütz on väittänyt, ettei Vermeer käyttänyt sitä missään maalauksessaan.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/View_of_Delft",
            "title": "View of Delft – Wikipedia"
          },
          {
            "url": "https://essentialvermeer.com/cat_about/view.html",
            "title": "View of Delft – Essential Vermeer"
          }
        ]
      }
    ]
  },
  "mauritshuis-670": {
    "kysymykset": [
      "Esittääkö Tyttö ja helmikorvakoru oikeaa henkilöä?",
      "Onko Vermeerin maalaamassa korvakorussa oikea helmi?"
    ],
    "vastaukset": [
      {
        "kysymys": "Esittääkö Tyttö ja helmikorvakoru oikeaa henkilöä?",
        "vastaus": "Maalaus ei ole muotokuva vaan tronie, eli kuvitteellisen hahmon pään tutkielma. Tronien tarkoitus ei ollut tallentaa tietyn henkilön piirteitä. Vuoden 2018 tutkimus löysi tytölle ripset ja taustalta haalistuneen vihreän verhon, mutta museon johtaja Martine Gosselink kertoi, etteivät tutkijat saaneet selville, kuka malli oli.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/Girl_with_a_Pearl_Earring",
            "title": "Girl with a Pearl Earring (Wikipedia)"
          },
          {
            "url": "https://www.pbs.org/newshour/amp/arts/hi-tech-scans-uncover-new-details-of-girl-with-a-pearl-earring-but-not-her-identity",
            "title": "Hi-tech scans uncover new details of Girl with a Pearl Earring, but not her identity (PBS NewsHour)"
          }
        ]
      },
      {
        "kysymys": "Onko Vermeerin maalaamassa korvakorussa oikea helmi?",
        "vastaus": "Todennäköisesti ei: helmi olisi liian suuri ollakseen aito, ja kyseessä voi olla vernissattu lasihelmi. Vincent Icke on esittänyt vuonna 2014, että korvakoru muistuttaa enemmän kiillotettua tinaa. Maalauksessa helmen vaikutelma syntyy vain muutamasta valkoisesta vedosta.",
        "lahteet": [
          {
            "url": "https://dutchnews.nl/2020/05/inburgering-with-dutchnews-nl-11-things-to-know-about-the-girl-with-a-pearl-earring",
            "title": "11 things to know about the Girl with a Pearl Earring (DutchNews.nl)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Girl_with_a_Pearl_Earring",
            "title": "Girl with a Pearl Earring (Wikipedia)"
          }
        ]
      }
    ]
  },
  "RP-P-OB-612": {
    "kysymykset": [
      "Miten Rembrandt teki tämän suuren vedoksen?",
      "Mitä Rembrandt muutti Ecce Homon eri tiloissa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miten Rembrandt teki tämän suuren vedoksen?",
        "vastaus": "Kokonaan kuivaneulalla: hän raapi kuvan suoraan kuparilevyyn neulalla. Neulan viivojen viereen nousee metallirouhe, joka antaa jäljelle samettisen ilmeen, mutta kuluu painettaessa, joten Rijksmuseon mukaan levyä vahvistettiin uusilla viivoilla. Vedos on noin 36 x 45 cm ja kuuluu hänen suurimpiinsa.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-612",
            "title": "Rijksmuseum: Ecce Homo (RP-P-OB-612)"
          },
          {
            "url": "https://en.wikipedia.org/wiki/Christ_Presented_to_the_People",
            "title": "en-Wikipedia: Christ Presented to the People"
          }
        ]
      },
      {
        "kysymys": "Mitä Rembrandt muutti Ecce Homon eri tiloissa?",
        "vastaus": "Vedoksia tunnetaan kahdeksassa eri tilassa. Kuudennessa tilassa Rembrandt hioi pois Pilatuksen lavan edessä seisoneen väkijoukon ja lisäsi sen tilalle kaksi tiiliholvia, ja viimeisessä tilassa holvien väliin tuli patsas. Muutosten merkitys on Metropolitan-museon mukaan arvoitus, mutta ne asettavat katsojan suoraan Kristuksen kohtalon eteen.",
        "lahteet": [
          {
            "url": "https://www.metmuseum.org/art/collection/search/356476",
            "title": "Christ Presented to the People - The Metropolitan Museum of Art"
          },
          {
            "url": "https://www.rijksmuseum.nl/en/collection/object/RP-P-OB-611--8a35b160e78719d15cfee3a7e32ac7d5",
            "title": "Christ Presented to the People (Ecce Homo) - Rijksmuseum"
          }
        ]
      }
    ]
  },
  "RP-P-OB-616": {
    "kysymykset": [
      "Miksi Rembrandt teki Kolme ristiä kuivaneulalla?",
      "Miten Kolme ristiä muuttui myöhemmissä vedoksissa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Miksi Rembrandt teki Kolme ristiä kuivaneulalla?",
        "vastaus": "Rembrandt teki kohtauksen lähes kokonaan kuivaneulalla, tekniikalla, jota ei ollut juuri koskaan käytetty näin suureen kuvaan. Vedos on noin 39 x 45 cm ja esittää Kristuksen ristillä kahden ryövärin välissä, ympärillä Maria, opetuslapsia ja sotilaita. Neulan jättämä metallirouhe antaa viivoille samettisen jäljen.",
        "lahteet": [
          {
            "url": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-616",
            "title": "Christ Crucified between the Two Thieves ('The Three Crosses') - Rijksmuseum"
          },
          {
            "url": "https://en.wikipedia.org/wiki/The_Three_Crosses",
            "title": "The Three Crosses - Wikipedia"
          }
        ]
      },
      {
        "kysymys": "Miten Kolme ristiä muuttui myöhemmissä vedoksissa?",
        "vastaus": "Kolmesta ensimmäisestä tilasta vedettiin noin kuusikymmentä vedosta. Neljännessä tilassa Rembrandt hioi ja kaavi pois suuria osia kuvasta, muutti hahmoja ja ratsastajia ja peitti taivaan tiheällä viivastolla. Kuva tummeni, ja valo keskittyy entistä enemmän Kristukseen.",
        "lahteet": [
          {
            "url": "https://en.wikipedia.org/wiki/The_Three_Crosses",
            "title": "The Three Crosses - Wikipedia"
          },
          {
            "url": "https://www.metmuseum.org/zh/essays/rembrandt-van-rijn-1606-1669-prints",
            "title": "Rembrandt van Rijn (1606-1669): Prints - The Metropolitan Museum of Art"
          }
        ]
      }
    ]
  }
};
