// Euroopan Kaupungin elämää -nostot (sama rakenne kuin AFRICA_KULTTUURI).
// Rakentuu kaupunki kerrallaan. Kuvien lisenssit varmistettu Commonsin
// extmetadatasta (Venetsia 31.7.2026, muut 1.8.2026), ja kuvista on
// paikalliset kopiot kansiossa assets/valokuvat.
export const EUROPE_KULTTUURI = {
  venetsia: {
    /*
     * Venetsian nostot siirtyivät kansisivuksi
     * kulttuuri-kategoriat.js:ään (maa–kaupunki-pilotti 5.8.2026) —
     * tänne jää vain kulttuurivisa, joka piirretään
     * saapumiskortille litteästä taulusta.
     */
    kysymys: {
      q: 'Minkä niminen on Vivaldin kuuluisa konserttosarja, jossa musiikki kuvaa kevättä, kesää, syksyä ja talvea?',
      options: ['Neljä vuodenaikaa', 'Kaksitoista kuukautta', 'Meren laulu', 'Talviyön tarina'],
      correct: 0,
      fact: 'Neljä vuodenaikaa on neljän viulukonserton sarja — jokainen '
        + 'kuvaa yhtä vuodenaikaa, ja musiikista voi kuulla linnunlaulua '
        + 'ja ukkosen. Vivaldi sävelsi sen noin vuosina 1718–1723.',
    },
  },

  marseille: {
    /*
     * Marseille sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Miksi Ranskan kansallislaulua kutsutaan Marseillaisiksi, vaikka se sävellettiin Strasbourgissa?',
      options: [
        'Marseillelaiset vapaaehtoiset lauloivat sitä marssiessaan Pariisiin',
        'Säveltäjä syntyi Marseillessa',
        'Se esitettiin ensi kerran Marseillen satamassa',
        'Marseillen kaupunki maksoi sen säveltämisen',
      ],
      correct: 0,
      fact: 'Rouget de Lisle sävelsi laulun Strasbourgissa 1792. Kun '
        + 'marseillelaiset vapaaehtoiset marssivat sen tahtiin '
        + 'Pariisiin, pariisilaiset alkoivat kutsua sävelmää heidän '
        + 'mukaansa — ja nimi jäi.',
    },
  },

  granada: {
    /*
     * Granada sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Mikä oli Alhambra ennen kuin siitä tuli museo?',
      options: [
        'Granadan emiirikunnan hallitsijan palatsi ja linnoitus',
        'Roomalainen kylpylä',
        'Luostari',
        'Kuninkaallinen ratsutalli',
      ],
      correct: 0,
      fact: 'Alhambra rakennettiin 1200–1300-luvuilla Nasridi-suvun '
        + 'hallitsijoiden palatsiksi ja linnoitukseksi. Se oli Iberian '
        + 'viimeisen muslimivaltion keskus, ja se luovutettiin '
        + 'Kastilian ja Aragonian hallitsijoille vuonna 1492.',
    },
  },

  krakova: {
    /*
     * Krakova sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Miksi Krakovan Marian kirkon torvisoitto katkeaa aina kesken sävelen?',
      options: [
        'Perimätiedon mukaan nuoli osui soittajaan kesken varoituksen',
        'Torvi on rikki eikä sitä ole korjattu',
        'Soittajalla loppuu ilma samassa kohdassa',
        'Sävelmä on jäänyt säveltäjältä kesken',
      ],
      correct: 0,
      fact: 'Tarinan mukaan torvensoittaja varoitti kaupunkia '
        + 'hyökkäyksestä, kun nuoli osui häneen kesken soiton. Katkos '
        + 'toistetaan joka tunti — ja keskipäivällä se kuullaan koko '
        + 'Puolassa radiossa.',
    },
  },

  sarajevo: {
    /*
     * Sarajevo sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Mistä sana sevdalinka on peräisin?',
      options: [
        'Turkin sanasta sevda, joka tarkoittaa rakkaudenkaipuuta',
        'Erään säveltäjän sukunimestä',
        'Bosnialaisesta soittimesta',
        'Sarajevon kaupunginosan nimestä',
      ],
      correct: 0,
      fact: 'Sevdalinka on Bosnian oma laulutyyli, ja sen nimi tulee '
        + 'turkin sanasta sevda — rakkaudenkaipuu. Laulut ovat vanhoja '
        + 'kaupunkilauluja, jotka siirtyivät suullisesti sukupolvelta '
        + 'toiselle.',
    },
  },

  islanti: {
    kysymys: {
      q: 'Mikä on Þingvellirin erikoisuus maantieteellisesti?',
      options: [
        'Se on kohdassa, jossa kaksi mannerlaattaa erkanee toisistaan',
        'Se on Islannin korkein vuori',
        'Se on maailman pohjoisin kaupunki',
        'Se on saaren ainoa metsä',
      ],
      correct: 0,
      fact: 'Þingvellir sijaitsee Pohjois-Amerikan ja Euraasian '
        + 'mannerlaattojen saumassa: laatat erkanevat toisistaan noin '
        + 'kaksi senttiä vuodessa, ja maasto repeää kallionrotkoiksi. '
        + 'Samassa paikassa kokoontui Alþingi vuodesta 930.',
    },
  },

  ateena: {
    /*
     * Ateena sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    /*
     * Visa kysyi ennen evzonin puvun laskoksista, mutta se juttu
     * siirtyi vaihe B:ssä Arki ja tavat -sivulle. Visa näkyy lehden
     * kansisivulla, joten vastausta ei ollut samalla sivulla lainkaan
     * (omistajan bugilöytö 10.8.2026). Kysymys osoittaa nyt kannen
     * omaan juttuun Tuulten tornista.
     */
    kysymys: {
      q: 'Miten Tuulten torni näytti aikaa silloin, kun aurinko oli pilvessä?',
      options: [
        'Sisällä käyvä vesikello',
        'Katolla palava soihtu',
        'Tähtien asento',
        'Kellon lyönnit tunnin välein',
      ],
      correct: 0,
      fact: 'Vesikelloa pyöritti Akropoliin lähteestä johdettu vesi. Katolla '
        + 'seisonut pronssinen Triton kääntyi tuulen mukana ja osoitti '
        + 'sauvallaan, mistä se puhalsi.',
    },
  },

  rooma: {
    /*
     * Rooma sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Miten Rooman akveduktit saivat veden liikkeelle?',
      options: [
        'Painovoimalla — putki laskee koko matkan',
        'Orjien pyörittämillä pumpuilla',
        'Tuulivoimalla',
        'Vesi nostettiin ämpäreillä porras kerrallaan',
      ],
      correct: 0,
      fact: 'Kaltevuus oli paikoin vain 30 senttiä kilometrillä. Kaaret '
        + 'rakennettiin juuri siksi: laakson yli piti pitää putki '
        + 'täsmälleen oikeassa kulmassa.',
    },
  },

  kreeta: {
    kysymys: {
      q: 'Kuinka vanha Knossoksen palatsikulttuuri on?',
      options: [
        'Noin 4 000 vuotta — Euroopan vanhin kaupunkikulttuuri',
        'Noin 1 000 vuotta',
        'Noin 500 vuotta',
        'Se rakennettiin roomalaisten aikaan',
      ],
      correct: 0,
      fact: 'Minolainen kulttuuri kukoisti noin 2000–1450 eaa. Palatsissa '
        + 'oli juokseva vesi ja viemärit aikana, jolloin muualla '
        + 'Euroopassa asuttiin puumajoissa.',
    },
  },

  sisilia: {
    kysymys: {
      q: 'Mikä on abbanniata?',
      options: [
        'Torikauppiaan laulava myyntihuuto',
        'Sisilialainen jälkiruoka',
        'Etnan purkaustyyppi',
        'Nukketeatterin päähenkilö',
      ],
      correct: 0,
      fact: 'Abbanniata on Palermon torien oma huutolaulu. Jokaisella '
        + 'myyjällä on oma melodiansa, ja vakioasiakkaat tunnistavat '
        + 'kauppiaan pelkästä äänestä.',
    },
  },

  dubrovnik: {
    kysymys: {
      q: 'Millä Dubrovnikin tasavalta pysyi vuosisatoja itsenäisenä?',
      options: [
        'Kaupankäynnillä ja neuvottelemalla, ei sotimalla',
        'Euroopan suurimmalla laivastolla',
        'Vuoristo esti hyökkäykset kokonaan',
        'Se ei ollut koskaan itsenäinen',
      ],
      correct: 0,
      fact: 'Ragusa maksoi veroa milloin ottomaaneille, milloin '
        + 'Unkarille, ja piti kaikkiin välit kunnossa. Se kielsi '
        + 'orjakaupan jo 1416 — yhtenä ensimmäisistä Euroopassa.',
    },
  },

  sofia: {
    /*
     * Sofia sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      // Ruusujuttu on nykyään Bulgarian maalehdessä, joten visa jäi
      // kaupunkilehden kannelle ilman lähdejuttua. Kysymys osoittaa nyt
      // kannen omaan juttuun neljästä uskonnosta.
      q: 'Miksi Sofian keskustaa kutsutaan suvaitsevaisuuden neliöksi?',
      options: [
        'Kaupungissa on neljä kaupunginosaa',
        'Aukiolla on neljä samanlaista suihkulähdettä',
        'Neljä valtatietä risteää keskustassa',
        'Neljän uskonnon rakennukset ovat vierekkäin',
      ],
      correct: 3,
      fact: 'Muutaman sadan metrin säteellä ovat ortodoksinen kirkko, '
        + 'moskeija vuodelta 1566, synagoga ja katolinen katedraali.',
    },
  },

  lontoo: {
    /*
     * Lontoon nostot asuvat kategorioittain kulttuuri-kategoriat.js:ssä
     * (9 aihetta) — tänne jää vain kulttuurivisa, joka piirretään
     * saapumiskortille litteästä taulusta.
     */
    kysymys: {
      q: 'Mikä veti maailman ensimmäisiä metrojunia Lontoossa vuonna 1863?',
      options: [
        'Höyryveturi',
        'Sähkömoottori',
        'Hevoset',
        'Paineilma',
      ],
      correct: 0,
      fact: 'Sähkövetoinen metrolinja avattiin Lontoossa vasta 1890. '
              + 'Ensimmäisellä radalla savu oli niin sakeaa, että tunneliin '
              + 'jätettiin aukkoja, joista se pääsi kadulle.',
    },
  },

  edinburgh: {
    /*
     * Edinburgh sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Miten Edinburghin Fringe-festivaali sai alkunsa vuonna 1947?',
      options: [
        'Kahdeksan kutsumatonta ryhmää tuli esiintymään silti',
        'Kuningatar määräsi sen perustettavaksi',
        'Se alkoi radio-ohjelmana',
        'Se siirrettiin Edinburghiin Lontoosta',
      ],
      correct: 0,
      fact: 'Fringe tarkoittaa reunaa. Festivaali on yhä avoin kaikille: '
              + 'ohjelmaa ei valitse mikään raati, mutta esiintyjän on itse '
              + 'hankittava esityspaikkansa ja maksettava se.',
    },
  },

  dublin: {
    /*
     * Dublin sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Miten irlantilaiseen uilleann-säkkipilliin saadaan ilmaa?',
      options: [
        'Palkeella, joka on kiinni soittajan kyynärpäässä',
        'Puhaltamalla putkeen',
        'Jalkapolkimella',
        'Pienellä sähköpumpulla',
      ],
      correct: 0,
      fact: 'Nimi uilleann tulee irlannin sanasta uillinn eli kyynärpää. '
              + 'Palkeen kuiva ilma pitää soittimen vireessä paremmin kuin '
              + 'suusta puhallettu kostea ilma.',
    },
  },

  pariisi: {
    /*
     * Pariisi sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Mitä pariisilainen leipuri saa palkinnoksi, jos voittaa kaupungin '
           + 'patonkikilpailun?',
      options: [
        'Hän toimittaa vuoden ajan leivät presidentin palatsiin',
        'Hän saa leipoa yhden päivän Eiffel-tornissa',
        'Hänen leipomonsa vapautuu verosta',
        'Hän pääsee raatiin seuraavaksi vuodeksi',
      ],
      correct: 0,
      fact: 'Pariisin patonkikilpailu on järjestetty vuodesta 1994. Raati '
              + 'maistaa leivät sokkona, ja voittaja saa rahapalkinnon sekä '
              + 'oikeuden — ja velvollisuuden — toimittaa Élysée-palatsin '
              + 'patongit seuraavan vuoden ajan.',
    },
  },

  lissabon: {
    /*
     * Lissabon sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Mistä portugalilaisten seinälaattojen nimi azulejo tulee?',
      options: [
        'Arabian sanasta az-zulayj, kiillotettu pikkukivi',
        'Espanjan sanasta azul, sininen',
        'Lissabonin Azul-korttelin nimestä',
        'Latinan sanasta azula, savi',
      ],
      correct: 0,
      fact: 'Moni luulee nimen tulevan sinisestä väristä, koska laatat ovat '
              + 'usein sinivalkoisia. Sana on kuitenkin arabiaa ja tarkoittaa '
              + 'kiillotettua pikkukiveä eli mosaiikin palasta. Portugalissa '
              + 'laattoja on tehty yli viisisataa vuotta.',
    },
  },

  madrid: {
    /*
     * Madrid sai kategoriat (kulttuuri-kategoriat.js + maa-kategoriat
     * ESP, 6.8.2026), jotka korvaavat litteät nostot Tutki-ikkunassa.
     * Ainutlaatuinen sisältö siirrettiin sinne: chotis
     * musiikkilinkkeineen kaupungin kanteen, cocido ja uudenvuoden
     * rypäleet Espanjan Ruoka-aiheeseen. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Mikä on madridilaisen chotis-tanssin tunnetuin sääntö?',
      options: [
        'Mies ei siirry laatalta, jolla seisoo',
        'Tanssijat eivät saa koskettaa toisiaan',
        'Tanssia saa vain ulkosalla',
        'Pari vaihtuu joka kahdeksas tahti',
      ],
      correct: 0,
      fact: 'Sanotaan, että chotis tanssitaan yhden laatan päällä: mies '
              + 'pyörii paikallaan ja nainen kiertää hänen ympärillään. Tanssi '
              + 'tuli Madridiin 1850 Keski-Euroopasta ja sai kaupungissa oman '
              + 'muotonsa — sama nosto on lehden kannessa.',
    },
  },

  barcelona: {
    /*
     * Barcelona sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Mitä katalaanien ihmistornin huipulle kiipeävä lapsi, enxaneta, '
           + 'tekee päästyään ylös?',
      options: [
        'Nostaa kätensä ja näyttää neljää sormea',
        'Heittää alas punaisen huivin',
        'Huutaa tornin nimen',
        'Soittaa pientä kelloa',
      ],
      correct: 0,
      fact: 'Neljä sormea tarkoittaa Katalonian lipun neljää raitaa, ja '
              + 'merkki kertoo että torni on valmis. Onnistuneeksi torni '
              + 'lasketaan kuitenkin vasta, kun se on purettu kaatumatta. '
              + 'Unesco otti castells-perinteen suojelukseensa 2010.',
    },
  },

  amsterdam: {
    /*
     * Amsterdam sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Miksi Amsterdamin vanhat kanavatalot ovat niin kapeita?',
      options: [
        'Kiinteistövero laskettiin julkisivun leveydestä',
        'Kapea talo kesti tulvat paremmin',
        'Kanavan varrella ei ollut tilaa leveämmille',
        'Laki kielsi yli kolme metriä leveät talot',
      ],
      correct: 0,
      fact: '1600-luvulla vero määräytyi julkisivun leveyden mukaan, joten '
              + 'rakennettiin kapeaa ja syvää. Kapein talo, Oude Hoogstraat 22, '
              + 'on 2,02 metriä leveä — ja siinä toimii nykyään kauppa.',
    },
  },

  /*
   * Berliinin nostot siirtyivät lehtipaketin myötä muualle
   * (monistusohjeen sääntö: ainutlaatuinen sisältö kanteen):
   * Ampelmännchen on kaupungin kannessa (kulttuuri-kategoriat.js),
   * currywurst maan Ruoka-sivulla ja tekno musiikkilinkkeineen maan
   * Musiikki-sivulla (maa-kategoriat.js DEU). Tänne jää vain visa —
   * sen aihe (Ampelmännchen) näkyy kannen nostossa.
   */
  berliini: {
    kysymys: {
      q: 'Mistä Berliinin liikennevalojen hattupäinen ukkeli on peräisin?',
      options: [
        'Itä-Saksasta, jossa se suunniteltiin vuonna 1961',
        'Berliinin olympialaisista vuodelta 1936',
        'Se on 2000-luvun matkamuistokeksintö',
        'Ranskasta, jossa se otettiin ensin käyttöön',
      ],
      correct: 0,
      fact: 'Karl Peglau suunnitteli Ampelmännchenin Itä-Saksan '
              + 'liikenneministeriölle vuonna 1961, ja ensimmäiset valot '
              + 'syttyivät Itä-Berliinissä 1969. Yhdistymisen jälkeen '
              + 'kansalaiskampanja esti sen poistamisen.',
    },
  },

  wien: {
    /*
     * Wien sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      // Kunnan vuokra-asunnoista kertova juttu on nykyään Itävallan
      // maalehdessä ("Kilometrin pituinen kotitalo"), joten vanha visa
      // jäi kaupunkilehden kannelle ilman lähdejuttua. Kysymys osoittaa
      // nyt kannen omaan juttuun jättipyörästä.
      q: 'Miksi Praterin jättipyörän vaunut roikkuvat joka toisessa kulmassa?',
      options: [
        'Vaunut ovat liian painavia vierekkäin',
        'Puolet vaunuista on aina huollossa',
        'Ratas paloi, ja vaunuja palautettiin puolet',
        'Kulmia lisättiin myöhemmin kaksin verroin',
      ],
      correct: 2,
      fact: 'Ratas nousi vuonna 1897, ja siinä oli kolmekymmentä vaunua — '
              + 'yksi jokaista kulmaa kohti. Vuoden 1945 tulipalon jälkeen '
              + 'vaunuja ripustettiin takaisin viisitoista.',
    },
  },

  alpit: {
    kysymys: {
      q: 'Miksi alppitorvella voi soittaa vain tietyt sävelet?',
      options: [
        'Siinä ei ole venttiilejä eikä läppiä, joten se soittaa vain '
          + 'luonnonsäveliä',
        'Se on liian pitkä matalia ääniä varten',
        'Puu ei kestäisi kaikkia ääniä',
        'Soittajat eivät perinteen mukaan saa käyttää kaikkia säveliä',
      ],
      correct: 0,
      fact: 'Alppitorvi on luonnontorvi: sävelkorkeutta muutetaan vain '
              + 'huulilla. Siksi siitä saa noin kuusitoista säveltä, ja yksi '
              + 'niistä kuulostaa hieman epävireiseltä — sitä sanotaan '
              + 'alppitorvisäveleksi.',
    },
  },

  praha: {
    /*
     * Praha sai kategoriat (kulttuuri-kategoriat.js, 8.8.2026), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin sinne: Smetana lehden Musiikki-sivulle, chlebíček ja
     * nukketeatteri Arki ja tavat -sivulle. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Mikä oli erikoista siinä, miten Bedřich Smetana sävelsi Vltavan '
           + 'vuonna 1874?',
      options: [
        'Hän oli juuri menettänyt kuulonsa kokonaan',
        'Hän sävelsi sen laivamatkalla',
        'Hän oli vasta kymmenvuotias',
        'Hän sävelsi sen ulkomuistista kahdella kielellä',
      ],
      correct: 0,
      fact: 'Smetana kuuroutui täysin lokakuussa 1874. Vltava syntyi 20. '
              + 'marraskuuta ja 8. joulukuuta välisenä aikana, eikä hän kuullut '
              + 'sitä koskaan. Prahan kevät -festivaali on avattu tällä '
              + 'musiikilla joka 12. toukokuuta vuodesta 1952.',
    },
  },

  budapest: {
    /*
     * Budapest sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Mitä gulyás tarkoittaa Unkarissa?',
      options: [
        'Keittoa',
        'Paksua patalihaa',
        'Paprikajauhetta',
        'Grillattua leipää',
      ],
      correct: 0,
      fact: 'Gulyás on unkariksi keitto, jossa on lientä, naudanlihaa, '
              + 'perunaa ja paprikaa. Se paksu pata, jota muualla Euroopassa '
              + 'kutsutaan gulassiksi, on Unkarissa nimeltään pörkölt.',
    },
  },

  varsova: {
    /*
     * Varsova sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Mitä Fryderyk Chopinista palasi Varsovaan hänen kuolemansa '
           + 'jälkeen?',
      options: [
        'Hänen sydämensä',
        'Hänen flyygelinsä',
        'Hänen kirjastonsa',
        'Hänen nuottikäsikirjoituksensa',
      ],
      correct: 0,
      fact: 'Chopin kuoli Pariisissa vuonna 1849. Hänen sisarensa Ludwika '
              + 'toi sydämen Varsovaan, ja se on muurattuna Pyhän Ristin kirkon '
              + 'pilariin. Muuten hänet on haudattu Pariisiin.',
    },
  },

  bukarest: {
    /*
     * Bukarest sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Minkä maailmanennätyksen Bukarestin Parlamenttipalatsi pitää?',
      options: [
        'Se on maailman painavin rakennus',
        'Se on maailman korkein rakennus',
        'Se on maailman vanhin parlamenttitalo',
        'Siinä on maailman pisin liukuportaikko',
      ],
      correct: 0,
      fact: 'Palatsi painaa noin 4,1 miljoonaa tonnia ja on siten maailman '
              + 'painavin rakennus. Lattiapinta-alaltaan se on maailman suurin '
              + 'siviilihallinnon rakennus; ainoa sitä suurempi '
              + 'hallintorakennus on Yhdysvaltain Pentagon.',
    },
  },

  kiova: {
    /*
     * Kiova sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Miksi Kiovan Arsenalnan metroasema kaivettiin yli sadan metrin '
           + 'syvyyteen?',
      options: [
        'Dneprin ranta kohoaa jyrkkänä muun kaupungin yläpuolelle',
        'Maan alta löytyi kultaa, joka piti louhia ensin',
        'Asema rakennettiin valmiiseen luolastoon',
        'Syvyys pitää junat kesällä viileinä',
      ],
      correct: 0,
      fact: 'Kiova on Dneprin korkealla länsirannalla, ja asema on törmän '
              + 'sisällä. Se oli maailman syvin metroasema vuoteen 2022 saakka.',
    },
  },

  odessa: {
    /*
     * Odessa sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Miten Odessan alle syntyi noin 2 500 kilometriä käytäviä?',
      options: [
        'Kaupungin rakennuskivi louhittiin sen omasta alustasta',
        'Ne kaivettiin sodan aikana pommisuojiksi',
        'Ne ovat luonnon muovaamia tippukiviluolia',
        'Niissä kulki aikoinaan maanalainen rautatie',
      ],
      correct: 0,
      fact: 'Odessan talot tehtiin simpukkakalkkikivestä, jota otettiin '
              + 'suoraan jalkojen alta. Vasta myöhemmin käytäviä käytettiin '
              + 'varastoina ja suojina.',
    },
  },

  moskova: {
    /*
     * Moskova sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Mitä Majakovskajan metroaseman katon 34 mosaiikkia esittävät?',
      options: [
        'Vuorokautta neuvostotaivaalla',
        'Moskovan historian käännekohtia',
        'Venäjän suurimpia jokia',
        'Kuuluisia balettikohtauksia',
      ],
      correct: 0,
      fact: 'Aleksandr Deinekan mosaiikeissa lentää lentokoneita, '
              + 'laskuvarjoja, lintuja ja purjelentokoneita. Ylös katsova näkee '
              + 'taivaan, vaikka on 33 metriä maan alla.',
    },
  },

  pietari: {
    /*
     * Pietari sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Miksi Eremitaašin kellareissa asuu kissoja?',
      options: [
        'Ne pitävät hiiret poissa taidekokoelmien kimpusta',
        'Ne ovat museon maskotteja matkailijoita varten',
        'Ne kuuluvat museon taidekokoelmaan',
        'Ne johdattavat vieraat salista toiseen',
      ],
      correct: 0,
      fact: 'Keisarinna Elisabet määräsi 1745 tuomaan Kazanista parhaat '
              + 'hiirenpyytäjät Talvipalatsiin. Työ jatkuu yhä, ja kissoja on '
              + 'noin 60.',
    },
  },

  tallinna: {
    /*
     * Tallinna sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      // Verkkoäänestysjuttu on nykyään Viron maalehdessä, joten visa jäi
      // kaupunkilehden kannelle ilman lähdejuttua. Kysymys osoittaa nyt
      // kannen omaan juttuun raatihuoneentorin apteekista.
      q: 'Mitä Raatihuoneentorin apteekki myi sydänsuruun?',
      options: [
        'Kastematojen öljyä',
        'Marsipaania',
        'Oriin kavioita',
        'Poltettuja siilejä',
      ],
      correct: 1,
      fact: 'Apteekki on toiminut samassa talossa ainakin vuodesta 1422, ja '
              + 'marsipaania saa sen tiskiltä yhä.',
    },
  },

  riika: {
    kysymys: {
      q: 'Mistä Riian keskustorin hallit on tehty?',
      options: [
        'Ilmalaivojen halleista',
        'Vanhoista kirkoista',
        'Laivojen rungoista',
        'Rautatiesillan osista',
      ],
      correct: 0,
      fact: 'Saksan armeija jätti Latviaan zeppelin-hallit ensimmäisen '
              + 'maailmansodan jälkeen. Teräsrungot purettiin, kuljetettiin '
              + 'Riikaan ja pystytettiin uudelleen kauppahalleiksi.',
    },
  },

  vilna: {
    kysymys: {
      q: 'Mitä Užupisin perustuslaki lupaa koiralle?',
      options: [
        'Oikeuden olla koira',
        'Oman äänestyslipun',
        'Ilmaisen ruoan torilta',
        'Paikan tasavallan hallituksessa',
      ],
      correct: 0,
      fact: 'Perustuslain pykälä 12 kuuluu: "Koiralla on oikeus olla '
              + 'koira." Pykäliä on kaikkiaan 41, ja ne on käännetty useille '
              + 'kymmenille kielille.',
    },
  },

  istanbul: {
    /*
     * Istanbul sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      // Teejuttu on nykyään Turkin maalehdessä, joten visa jäi
      // kaupunkilehden kannelle ilman lähdejuttua. Kysymys osoittaa nyt
      // kannen omaan juttuun Sultanahmetin obeliskista.
      q: 'Milloin Sultanahmetin aukion obeliski veistettiin?',
      options: [
        'Roomassa vuonna 390',
        'Egyptissä noin 1450 eaa.',
        'Konstantinopolissa 500-luvulla',
        'Sulttaanin käskystä 1500-luvulla',
      ],
      correct: 1,
      fact: 'Kivi on faarao Thutmosis III:n ajalta, ja keisari Theodosius toi '
              + 'sen Konstantinopoliin vuonna 390. Mikään muu kaupungissa '
              + 'pystyssä oleva ei ole yhtä vanhaa tekoa.',
    },
  },

  helsinki: {
    /*
     * Helsinki sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/moduulit/kaupunkilehti.md).
     */
    /*
     * Finlandia-kysymys siirtyi pois 9.8.2026, kun Sibelius-nosto
     * muutti Suomen maalehden Sävel-sivulle (v443) — kaupunkivisa
     * kysyy nyt kaupungin omasta jutusta (Linnanmäki, kansisivu).
     */
    kysymys: {
      q: 'Miksi Linnanmäen puisen vuoristoradan junassa seisoo aina '
           + 'jarrumestari?',
      options: [
        'Vauhtia hidastetaan käsin, ja hän hoitaa jarrutuksen',
        'Hän tarkastaa matkaliput kyydin aikana',
        'Hän kuuluttaa mäkien nimet matkustajille',
        'Hän korjaa rataa kierrosten välissä',
      ],
      correct: 0,
      fact: 'Puinen Vuoristorata valmistui 1951, ja se on yksi maailman '
              + 'harvoista radoista, joilla junan vauhtia hidastetaan käsin '
              + '— jarrumestari seisoo junan takaosassa koko matkan.',
    },
  },

  tukholma: {
    /*
     * Tukholma sai kategoriat (kulttuuri-kategoriat.js + maa-kategoriat
     * SWE, 7.8.2026), jotka korvaavat litteät nostot Tutki-ikkunassa.
     * Ainutlaatuinen sisältö siirrettiin sinne: metron taide kaupungin
     * kanteen, fika Ruotsin Ruoka-aiheeseen kanelipullana ja ABBA
     * Apple Music -linkkeineen Ruotsin Musiikki-aiheeseen (omistajan
     * tarkennus 7.8.2026: yhtye on koko maan tarina — kannessa sen
     * paikan sai Vasa-laiva). Tänne jää vain visa, jonka aihe
     * (metron taide) näkyy kannen nostossa (docs/moduulit/kaupunkilehti.md).
     */
    kysymys: {
      q: 'Kuinka monella Tukholman noin sadasta metroasemasta on taidetta?',
      options: [
        'Yli 90:llä',
        'Noin 20:llä',
        'Kolmella',
        'Ei yhdelläkään',
      ],
      correct: 0,
      fact: 'Metroa on kutsuttu maailman pisimmäksi taidenäyttelyksi. '
              + 'Teoksia on tehnyt yli 150 taiteilijaa, ja ensimmäiset '
              + 'tilattiin asemille jo 1950-luvulla.',
    },
  },

  oslo: {
    kysymys: {
      q: 'Kuinka moni taiteilija teki Frognerin puiston yli 200 veistosta?',
      options: [
        'Yksi — Gustav Vigeland',
        'Kymmenen norjalaista kuvanveistäjää',
        'Sata eri taiteilijaa',
        'Veistokset ostettiin valmiina eri maista',
      ],
      correct: 0,
      fact: 'Vigeland teki koko puiston: veistokset, sillat, portit ja '
              + 'lyhdyt. Kaupunki antoi hänelle vastineeksi työhuoneen ja '
              + 'asunnon, ja työn tulokset jäivät kaupungin omaisuudeksi.',
    },
  },

  firenze: {
    kysymys: {
      q: 'Mikä Firenzessä lyöty kultaraha kelpasi maksuksi ympäri '
           + 'keskiajan Eurooppaa?',
      options: [
        'Floriini',
        'Dukaatti',
        'Guldeni',
        'Taalari',
      ],
      correct: 0,
      fact: 'Kolikkoa alettiin lyödä vuonna 1252, ja siinä oli aina sama '
              + 'kultamäärä ja sama kuva: kaupungin liljavaakuna toisella '
              + 'puolella ja Johannes Kastaja toisella. Juuri muuttumattomuus '
              + 'teki siitä luotetun — kauppias tiesi mitä sai, vaikka raha '
              + 'olisi kulkenut kolmen maan läpi.',
    },
  },

  kobenhavn: {
    kysymys: {
      q: 'Kuinka suuri osa Kööpenhaminan työ- ja koulumatkoista tehdään '
           + 'pyörällä?',
      options: [
        'Noin puolet',
        'Noin neljäsosa',
        'Noin kymmenesosa',
        'Alle 5 prosenttia',
      ],
      correct: 0,
      fact: 'Kaupunki on rakentanut noin 385 kilometriä pyöräteitä ja '
              + 'laskee pyöräilijöiden määrän vuosittain. Osuus on kasvanut '
              + 'vuosikymmeniä, koska pyörätiet on erotettu autoliikenteestä '
              + 'omalle tasolleen.',
    },
  },

  lappi: {
    kysymys: {
      q: 'Mitä näistä kielistä puhutaan vain Suomessa?',
      options: [
        'Suomi',
        'Inarinsaame',
        'Koltansaame',
        'Pohjoissaame',
      ],
      correct: 1,
      fact: 'Suomea puhutaan myös Ruotsissa ja Norjassa, ja pohjois- ja '
              + 'koltansaamea puhutaan kolmen valtion alueella. Inarinsaame on '
              + 'kotonaan vain Inarijärven kylissä. Puhujia on muutama sata — '
              + 'enemmän kuin kolmekymmentä vuotta sitten.',
    },
  },

  tromssa: {
    kysymys: {
      q: 'Tromssassa juhlitaan auringon paluuta vasta 21. tammikuuta. '
           + 'Miksi?',
      options: [
        'Vuoret peittävät auringon vielä pari viikkoa',
        'Aurinko nousee horisontin yläpuolelle vasta silloin',
        'Se on kaupungin perustamispäivä',
        'Juhla siirrettiin sopimaan koulujen lomiin',
      ],
      correct: 0,
      fact: 'Aurinko nousee horisontin yläpuolelle jo tammikuun '
              + 'puolivälissä, mutta kaupungin eteläpuoliset vuoret pitävät sen '
              + 'piilossa 21. päivään asti. Silloin syödään aurinkopullia ja '
              + 'appelsiineja.',
    },
  },
};
