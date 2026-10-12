/**
 * Taidemuseo-linssin valmiit kysymykset ja esikirjoitetut vastaukset
 * (omistaja 12.10.2026 klo 22.2x: museossa Pulu tarjosi kartan kysymyksiä;
 * junaan 186). Rakenne sama kuin js/linssit/astronaut-kysymykset.js ja
 * ihmisen-matka-kysymykset.js: avain on teoksen tunnus täsmälleen
 * (Resources/Museo/alankomaat/teokset.json, isot kirjaimet säilyvät),
 * kaksi kysymystä (≤ 60 merkkiä) ja niille vastaukset lähteineen.
 * Avain "_museo" = kaksi yleistä kysymystä taidemuseosta (kun yksikään teos
 * ei ole auki, esim. kävely huoneesta toiseen).
 * Puuttuva teos = ei valmiita kysymyksiä. Teoksia toimitetaan erissä.
 *
 * Tiedot ovat verifioitu kahdella erillisellä Sonnet-agentilla (kirjoittaja
 * ja riippumaton tarkistaja); epävarmat väitteet on jätetty pois.
 */
export const MUSEO_KYSYMYKSET = {
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
  "SK-A-2344": {
    "kysymykset": [
      "Mitä Vermeer maalasi Maitotytön taustalta piiloon?",
      "Miten Vermeer maalasi Maitotytön valon ja maidon virran?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä Vermeer maalasi Maitotytön taustalta piiloon?",
        "vastaus": "Vuonna 2022 julkistetussa tutkimuksessa lyhytaaltoinen infrapunakuvaus paljasti, että Vermeer oli maalannut kuvaan astiatelineen riippuvine kannuineen tytön pään taakse sekä tulikorin hänen jalkojensa juureen ja peittänyt ne itse myöhemmin maalauskerroksen alle. Aiemmat röntgenkuvat olivat näyttäneet jotain samoissa kohdissa, mutta sitä ei osattu tulkita.",
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
  "vgm-s0005v1962": {
    "kysymykset": [
      "Mitä Perunansyöjien lampunvalo ja kädet kertovat?",
      "Minkä värisiksi van Gogh maalasi Perunansyöjien kasvot?"
    ],
    "vastaukset": [
      {
        "kysymys": "Mitä Perunansyöjien lampunvalo ja kädet kertovat?",
        "vastaus": "Van Gogh maalasi teoksen Nuenenissa huhti–toukokuussa 1885, ja yhtenä mallina oli todennäköisesti paikallisen de Grootin perheen Gordina. Hän halusi katsojan ymmärtävän, että lampun valossa perunoita syövät ihmiset ovat itse muokanneet maata samoilla käsillä, joilla he ottavat ruokaa vadista.",
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
  "SK-C-6": {
    "kysymykset": [
      "Keitä olivat Amsterdamin kangastarkastajat ja työnsä?",
      "Miksi Staalmeesters-maalauksen pöytä työntyy kohti katsojaa?"
    ],
    "vastaukset": [
      {
        "kysymys": "Keitä olivat Amsterdamin kangastarkastajat ja työnsä?",
        "vastaus": "Maalauksen viisi miestä olivat Amsterdamin kangaskillan tarkastajia eli staalmeestereita, jotka arvioivat värjättyjen kankaiden laatua; kuudes, Frans Hendricksz Bel, oli killan palvelija. Nimi viittaa kangasnäytteisiin. Tehtävä oli palkaton luottamustoimi, jota hoidettiin vuosi kerrallaan.",
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
        "vastaus": "Rembrandt valitsi matalan katselukulman, joten katsoja näkee pöydän alhaalta päin ja se tuntuu ulottuvan kohti katsojaa. Kulma myös korostaa miesten arvokkuutta. Teos oli todennäköisesti ripustettu korkealle, jolloin ylöspäin katsova perspektiivi sopi sen paikkaan.",
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
  }
};
