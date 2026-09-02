/*
 * SKANDAALIT — kuuluisat kohut, huijaukset ja kavallukset kartalle.
 *
 * Raamatun kirjaus SKANDAALIT KARTALLE: pääkategoria Skandaalit
 * (huuto-symboli) saa oman sisältönsä — 2–3 opettavaa skandaalia,
 * kohua tai kuuluisaa huijausta per maa. Tämä erä: 83 skandaalia
 * 29 maassa (Fablen katselmointi 30.8.2026: 85 luonnoksesta
 * pudotettiin 2). Korttitekstit ovat Fablen hyväksymiä; kirjoitus-
 * virhekorjaus ja EST/FIN-pirtuparin ristiviittausvirkkeet ovat
 * katselmointimuistion mukaiset. Erä tehtiin kuvattomana; kuvat
 * lisätään skandaali kerrallaan valinnaiseen `kuva`-kenttään.
 *
 * Taulun muoto: maakoodi (ISO-3) → skandaalilista. Kentät:
 *
 *   id       erän sisällä yksikäsitteinen tunnus; minitehtäväavain on
 *            skandaali:<id> (js/skandaalit.js).
 *   otsikko  kortin otsikko.
 *   nimio    lyhyt karttanimiö (≤ 18 merkkiä ennen lyhennystä,
 *            js/fokusnosto-symbolit.js NOSTOSYM_NIMIO_MERKKEJA).
 *   vuosi    tapahtuma-aika kortin metariville.
 *   paikka   paikan nimi kortin metariville.
 *   lat/lon  tapahtumapaikka asteina. Laudalle projisoidaan ajossa
 *            (js/fokusmitat.js projisoiLaudalle) kuten syvennys-
 *            paikoilla — ei käsin laskettuja lautakoordinaatteja.
 *   kortti   Fablen hyväksymä korttiteksti sellaisenaan.
 *   kuva     VALINNAINEN kortin kuva { osoite, selite, lahde }.
 *            Kuvaton skandaali piirtyy ennallaan (js/skandaalit.js).
 *            `osoite` on valmis osoite pelin omassa ämpärissä — nämä
 *            ovat Matkakirjan omia havainnekuvia, joten lähderivi
 *            alkaa "Matkakirjan havainnekuva:" ja saa selitelinkin
 *            (js/havainnekuva.js). Selite on yksi virke siitä, mitä
 *            kuvassa on.
 *   visa     minivisa: kysymys, kolme vaihtoehtoa, oikean indeksi.
 *            Oikean paikan jakauma tasattiin koko erän yli
 *            (28/28/27), ettei se painotu yhteen indeksiin.
 *
 * Lähteet ja koordinaattien tarkistusmerkinnät ovat kunkin skandaalin
 * kommentissa. Epävarmoiksi merkityt koordinaatit tarkistettiin
 * Wikipedia/Nominatim-kutsuin 30.8.2026 (±100 m riitti); korjatut
 * pisteet on merkitty kommenttiin.
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten ainoa top-level-nimi alkaa
 * SKANDAALI-etuliitteellä.
 */

/*
 * HAVAINNEKUVIEN JUURI. Kuvat ovat Matkakirjan omia havainnekuvia ja
 * asuvat pelin omassa ämpärissä (sama R2 kuin js/media.js:n peili ja
 * js/kohtaamiskuvat-data.js:n kohtaamiskuvat), eivät repossa —
 * omistajan linjaus "kaikki aina ämpäriin eikä repoon". Osoite on
 * siksi valmis `osoite`, jolla ei ole varareittiä: puuttuva tiedosto
 * piilottaa kuvakehyksen eikä riko korttia (js/fokusnosto.js
 * asetaNostonKuva).
 */
const SKANDAALI_KUVAJUURI = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/kohtaamiset/kuvajono/';

export const SKANDAALIT = {
  AUT: [
    /*
     * Schönbrunnin palatsi, Wien (ensiesitys hoville).
     * Lähde: en.wikipedia.org: Mechanical Turk
     */
    {
      id: 'shakkiturkkilainen',
      otsikko: 'Shakkiturkkilainen — kone joka voitti Napoleonin',
      nimio: 'Shakkiturkkilainen',
      vuosi: '1770–1854',
      paikka: 'Schönbrunnin palatsi, Wien (ensiesitys hoville)',
      lat: 48.1845, lon: 16.3119,
      kortti: 'Kone kumarsi, siirsi nappulaa ja voitti keisarit — '
        + 'kahdeksankymmentäneljä vuotta kukaan ei saanut todistettua, että '
        + 'kaapissa istui ihminen. Napoleonkin hävisi puisennäköiselle '
        + 'turkkilaiselle. Paras huijaus on se, jonka kaikki aavistavat eikä '
        + 'kukaan pysty osoittamaan.',
      lahde: 'en-Wikipedia "Mechanical Turk". Tarkistettu 1.9.2026.',
      kuva: {
        osoite: `${SKANDAALI_KUVAJUURI}skandaali-shakkiturkkilainen.jpg`,
        selite: 'Kaapin ovet on avattu yleisölle: rattaiden ja vipujen '
          + 'takana on tila, johon shakinpelaaja mahtui istumaan.',
        lahde: 'Matkakirjan havainnekuva: kaappi avattuna ennen näytöstä',
      },
      visa: {
        kysymys: 'Miten shakkiturkkilainen todellisuudessa pelasi?',
        vaihtoehdot: [
          'Kaapin sisällä piileskellyt shakkimestari ohjasi siirtoja vivuin '
            + 'ja magneetein',
          'Kellokoneisto toisti ennalta ohjelmoituja pelejä',
          'Esittäjä ohjasi nukkea salaa langoilla',
        ],
        oikea: 0,
      },
    },
    /*
     * Wienin yliopiston päärakennus.
     * Lähde: en.wikipedia.org: Klimt University of Vienna Ceiling Paintings
     */
    {
      id: 'klimtin-tiedekuntamaalaukset',
      otsikko: 'Klimtin tiedekuntamaalaukset — yliopiston hylkäämä katto',
      nimio: 'Klimtin maalaukset',
      vuosi: '1900–1907',
      paikka: 'Wienin yliopiston päärakennus',
      lat: 48.2131, lon: 16.3597,
      kortti: 'Yliopisto tilasi taiteilijalta katon täydeltä tieteen riemuvoittoa '
        + 'ja sai sen sijaan Klimtin näkemyksen — mikä oli professorien '
        + 'mielestä skandaali. Maalauksia ei ripustettu koskaan, ja lopulta '
        + 'sota poltti koko kiistan kohteen. Jäljelle jäivät mustavalkoiset '
        + 'valokuvat ja opetus tilaustöiden vaaroista.',
      lahde: 'en-Wikipedia "Klimt University of Vienna Ceiling Paintings". '
        + 'Tarkistettu 1.9.2026.',
      kuva: {
        osoite: `${SKANDAALI_KUVAJUURI}skandaali-klimtin-tiedekuntamaalaukset.jpg`,
        selite: 'Juhlasalin kullattu kattokehys jäi tyhjäksi, ja tilattu '
          + 'kangas makaa pukkien päällä rullalla telineiden alla.',
        lahde: 'Matkakirjan havainnekuva: ripustamatta jäänyt tilaustyö',
      },
      visa: {
        kysymys: 'Mikä oli Klimtin tiedekuntamaalausten lopullinen kohtalo?',
        vaihtoehdot: [
          'Ne ripustettiin lopulta yliopiston juhlasaliin',
          'Ne myytiin amerikkalaiselle keräilijälle',
          'Niiden uskotaan tuhoutuneen linnan palossa sodan lopussa 1945',
        ],
        oikea: 2,
      },
    },
    /*
     * Kunsthistorisches Museum, Wien.
     * Lähde: en.wikipedia.org: Cellini Salt Cellar
     */
    {
      id: 'salieran-varkaus',
      otsikko: 'Saliera — suola-astia joka katosi kolmeksi vuodeksi',
      nimio: 'Saliera',
      vuosi: '2003–2006',
      paikka: 'Kunsthistorisches Museum, Wien',
      lat: 48.2036, lon: 16.3619,
      kortti: 'Renessanssin kuuluisin suola-astia vietiin museosta '
        + 'rakennustelineitä pitkin, ja hälytys kuitattiin tekniseksi viaksi. '
        + 'Kolme vuotta kultainen Cellini makasi lyijyarkussa metsässä. '
        + 'Museovartioinnin oppikirjat saivat uuden luvun; suola pysyi koko '
        + 'ajan turvassa.',
      lahde: 'en-Wikipedia "Cellini Salt Cellar". Tarkistettu 1.9.2026.',
      kuva: {
        osoite: `${SKANDAALI_KUVAJUURI}skandaali-salieran-varkaus.jpg`,
        selite: 'Cellinin kultainen suola-astia vitriinissään särkyneen '
          + 'lasin takana; ikkunan ulkopuolella näkyvät rakennustelineet, '
          + 'joita pitkin varas tuli sisään.',
        lahde: 'Matkakirjan havainnekuva: murtoyö museosalissa',
      },
      visa: {
        kysymys: 'Mistä Saliera löytyi vuonna 2006?',
        vaihtoehdot: [
          'Sveitsiläisestä pankkiholvista',
          'Metsään haudatusta lyijyarkusta',
          'Antiikkihuutokaupasta Münchenistä',
        ],
        oikea: 1,
      },
    },
  ],
  BGR: [
    /*
     * Gotse Delchev (ent. Nevrokop), Länsi-Rodopit.
     * Lähde: en.wikipedia.org: Veda Slovena
     */
    {
      id: 'veda-slovena',
      otsikko: 'Veda Slovena — laulut jotka olivat liian muinaisia',
      nimio: 'Veda Slovena',
      vuosi: '1874–1881',
      paikka: 'Gotse Delchev (ent. Nevrokop), Länsi-Rodopit',
      lat: 41.5717, lon: 23.7261,
      kortti: 'Kyläopettaja toimitti keräilijälle lauluja, joissa Rodopien paimenet '
        + 'muistelivat Orfeusta kuin naapuria — vuosituhansien takaa, mitatussa '
        + 'runomitassa. Keräilijä uskoi joka säkeen ja julkaisi kaksi paksua '
        + 'nidettä. Euroopan oppineet lukivat, ihastuivat ja sitten laskivat, '
        + 'montako sattumaa on liikaa.',
      lahde: 'en-Wikipedia "Veda Slovena". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Kuka Veda Slovenan laulut tutkijoiden enemmistön mukaan '
          + 'todellisuudessa sepitti?',
        vaihtoehdot: [
          'Kyläopettaja Ivan Gologanov, joka väitti keränneensä ne',
          'Julkaisija Stjepan Verković itse',
          'Ne olivat aitoja pomakkien kansanlauluja',
        ],
        oikea: 0,
      },
    },
    /*
     * Entinen ruhtinaanpalatsi (nyk. Kansallinen taidegalleria), Sofia.
     * Lähde: en.wikipedia.org: Alexander of Battenberg
     */
    {
      id: 'battenbergin-ruhtinaskaappaus',
      otsikko: 'Ruhtinas kaapataan — Battenbergin pakkoluopuminen',
      nimio: 'Ruhtinaskaappaus',
      vuosi: '1886',
      paikka: 'Entinen ruhtinaanpalatsi (nyk. Kansallinen taidegalleria), Sofia',
      lat: 42.6965, lon: 23.3268,
      kortti: 'Maan ensimmäinen ruhtinas herätettiin omassa palatsissaan pistimet '
        + 'ovella ja saatettiin allekirjoittamaan luopumiskirja yöpuvussa. Hän '
        + 'ehti vielä palata — mutta huomasi, että kaapattua kruunua on vaikea '
        + 'pitää päässä. Palatsissa katsellaan nykyään tauluja, mikä on kaikin '
        + 'puolin rauhallisempaa.',
      lahde: 'en-Wikipedia "Alexander of Battenberg". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Ketkä pakottivat ruhtinas Aleksander Battenbergin luopumaan '
          + 'kruunusta 1886?',
        vaihtoehdot: [
          'Osmanien sulttaanin lähettiläät',
          'Oman armeijan venäjämieliset upseerit',
          'Bulgarian parlamentin tasavaltalaiset',
        ],
        oikea: 1,
      },
    },
    /*
     * Ivan Vazovin kansallisteatteri, Sofia.
     * Lähde: en.wikipedia.org: Sofia University
     * Lähde: en.wikipedia.org: Ivan Vazov National Theatre
     */
    {
      id: 'kansallisteatterin-vihellyskohu',
      otsikko: 'Vihellyskonsertti ruhtinaalle — ja yliopisto kiinni',
      nimio: 'Vihellyskonsertti',
      vuosi: '1907',
      paikka: 'Ivan Vazovin kansallisteatteri, Sofia',
      lat: 42.6942, lon: 23.3264,
      kortti: 'Ylioppilaat viheltivät ruhtinaalle teatterin avajaisissa, ja '
        + 'ruhtinas sulki vastineeksi koko yliopiston — puoleksi vuodeksi, '
        + 'opettajat erotettuina. Harvoin on yksi vihellyskonsertti tullut '
        + 'valtiolle näin kalliiksi. Teatteri sentään jäi pystyyn, ja se on yhä '
        + 'kaupungin komeimpia.',
      lahde: 'en-Wikipedia "Sofia University" ja en-Wikipedia "Ivan Vazov '
        + 'National Theatre". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miten hallitus rankaisi ylioppilaita, jotka viheltivät ruhtinas '
          + 'Ferdinandille kansallisteatterin avajaisissa 1907?',
        vaihtoehdot: [
          'Sulki yliopiston puoleksi vuodeksi ja erotti kaikki opettajat',
          'Kielsi teatteriesitykset ylioppilailta vuodeksi',
          'Karkotti ylioppilaiden johtajat maasta',
        ],
        oikea: 0,
      },
    },
  ],
  BIH: [
    /*
     * Fojnican fransiskaaniluostari, Fojnica.
     * Lähde: en-Wikipedia "Fojnica Armorial" (tarkistettu 30.8.2026)
     * Lähde: en-Wikipedia "Korjenić-Neorić Armorial" (Ohmučevićin sepitetty
     *   sukupuu; tarkistettu 30.8.2026)
     * Korjattu 561 m: hr-Wikipedia "Franjevački samostan Duha Svetoga u
     *   Fojnici" -koordinaatit.
     */
    {
      id: 'fojnican-vaakunakirja',
      otsikko: 'Fojnican vaakunakirja ja keksitty aateli',
      nimio: 'Vaakunakirja',
      vuosi: '1500–1600-luku',
      paikka: 'Fojnican fransiskaaniluostari, Fojnica',
      lat: 43.9612, lon: 17.8967,
      kortti: 'Amiraali tarvitsi aatelisarvon, joten hän tilasi itselleen sukupuun '
        + 'ja vaakunakirjan — molemmat tuoreeltaan keskiaikaisia. Temppu toimi, '
        + 'ja keksityt vaakunat päätyivät vuosisadoiksi ihan oikeiden '
        + 'historiankirjojen kuvitukseksi. Fojnican luostarissa säilynyt '
        + 'kappale on väärennös, josta tuli itsestään aito aarre.',
      lahde: 'en-Wikipedia "Fojnica Armorial" ja en-Wikipedia '
        + '"Korjenić-Neorić Armorial". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miksi amiraali Petar Ohmučević teetti vaakunakirjan keksittyine '
          + 'vaakunoineen?',
        vaihtoehdot: [
          'Koristaakseen lippulaivansa kajuutan',
          'Todistaakseen sepitetyn aatelissukunsa aidoksi',
          'Myydäkseen sen keräilijöille Venetsiassa',
        ],
        oikea: 1,
      },
    },
    /*
     * Vijećnica (Sarajevon kaupungintalo), Sarajevo.
     * Lähde: en-Wikipedia "Bosnian Crisis" (tarkistettu 30.8.2026)
     */
    {
      id: 'bosnian-kriisi-1908',
      otsikko: 'Vuoden 1908 liittämiskriisi',
      nimio: 'Liittämiskriisi',
      vuosi: '1908–1909',
      paikka: 'Vijećnica (Sarajevon kaupungintalo), Sarajevo',
      lat: 43.8592, lon: 18.4342,
      kortti: 'Kaksi ulkoministeriä sopi linnassa hiljaiset kaupat: sinä saat '
        + 'maakunnan, minä salmet. Toinen ehti kassalle ensin, ja toinen '
        + 'huomasi maksaneensa tyhjästä. Euroopan lehdet saivat skandaalinsa, '
        + 'diplomaatit harmaita hiuksia — ja historia varoituksen siitä, mitä '
        + 'salaisista sopimuksista seuraa.',
      lahde: 'en-Wikipedia "Bosnian Crisis". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mitä Venäjän ulkoministeri tavoitteli Buchlaun salaisissa '
          + 'neuvotteluissa 1908 vastineeksi Bosnian liittämisestä?',
        vaihtoehdot: [
          'Sotalaivoille kulkuoikeutta Turkin salmiin',
          'Osuutta Bosnian kaivoksista',
          'Itävallan tukea Puolan jakoon',
        ],
        oikea: 0,
      },
    },
  ],
  CHE: [
    /*
     * Anna Göldi -museo, Ennenda (Glarus).
     * Lähde: en.wikipedia.org: Anna Göldi
     */
    {
      id: 'anna-goldin-tapaus',
      otsikko: 'Anna Göldi — Euroopan viimeinen \'noita\'',
      nimio: 'Anna Göldi',
      vuosi: '1782 (maineenpalautus 2008)',
      paikka: 'Anna Göldi -museo, Ennenda (Glarus)',
      lat: 47.0333, lon: 9.0833,
      kortti: 'Valistusfilosofit kirjoittivat jo tietosanakirjoja, kun Glarus '
        + 'tuomitsi palvelijattaren noituudesta. Aikalaiset keksivät '
        + 'tapaukselle sanan, joka jäi kieleen: oikeusmurha. Virallinen '
        + 'anteeksipyyntö ehti perille 226 vuotta myöhässä — parempi sekin kuin '
        + 'ei koskaan.',
      lahde: 'en-Wikipedia "Anna Göldi". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Milloin Glarusin kantoni palautti Anna Göldin maineen '
          + 'virallisesti?',
        vaihtoehdot: [
          'Heti Ranskan vallankumouksen jälkeen 1789',
          'Sveitsin liittovaltion synnyttyä 1848',
          'Vasta vuonna 2008',
        ],
        oikea: 2,
      },
    },
    /*
     * Väärän rahan museo (Musée de la Fausse Monnaie), Saillon.
     * Lähde: fr.wikipedia.org: Joseph-Samuel Farinet
     */
    {
      id: 'farinet-alppien-vaararahanpainaja',
      otsikko: 'Farinet — väärän rahan Robin Hood',
      nimio: 'Farinet',
      vuosi: '1869–1880',
      paikka: 'Väärän rahan museo (Musée de la Fausse Monnaie), Saillon',
      lat: 46.1667, lon: 7.1833,
      kortti: 'Farinet\'n väärillä kolikoilla maksettiin Valais\'ssa auliimmin kuin '
        + 'oikeilla — harvinainen saavutus rahanväärentäjälle. Poliisi jahtasi '
        + 'miestä vuosikausia vuorilla, joilla jokainen paimen katsoi toiseen '
        + 'suuntaan. Nykyään väärentäjällä on oma museo ja viinitarha; '
        + 'keskuspankeilla ei kummassakaan sananvaltaa.',
      lahde: 'fr-Wikipedia "Joseph-Samuel Farinet". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miksi Valais\'n kansa suojeli rahanväärentäjä Farinet\'ta?',
        vaihtoehdot: [
          'Hän lahjoi kylänvanhimmat kullalla',
          'Häntä pidettiin köyhien puolustajana ja hänen rahansa kelpasivat '
            + 'kaikille',
          'Hän oli kantonin hallituksen salainen agentti',
        ],
        oikea: 1,
      },
    },
    /*
     * Zürich (Scheuchzerin koti- ja työkaupunki).
     * Lähde: en.wikipedia.org: Andrias scheuchzeri
     */
    {
      id: 'vedenpaisumuksen-todistaja',
      otsikko: 'Homo diluvii testis — salamanteri joka luultiin syntiseksi',
      nimio: 'Homo diluvii',
      vuosi: '1726–1811',
      paikka: 'Zürich (Scheuchzerin koti- ja työkaupunki)',
      lat: 47.3744, lon: 8.5411,
      kortti: 'Tutkija katsoi kiveä ja näki vedenpaisumukseen hukkuneen syntisen; '
        + 'Cuvier katsoi samaa kiveä ja näki jättiläissalamanterin. Kivi ei '
        + 'ollut muuttunut — katsoja oli. Lajin tieteellinen nimi ikuistaa '
        + 'kohteliaasti sekä erehdyksen että erehtyjän.',
      lahde: 'en-Wikipedia "Andrias scheuchzeri". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mikä Scheuchzerin \'vedenpaisumuksen todistaja\' todellisuudessa '
          + 'oli?',
        vaihtoehdot: [
          'Jättiläissalamanterin fossiili',
          'Varhaisen ihmisapinan luuranko',
          'Kalliota vasten painunut suurikokoinen kala',
        ],
        oikea: 0,
      },
    },
  ],
  CZE: [
    /*
     * Kansallismuseo, Praha (käsikirjoitusten säilytyspaikka).
     * Lähde: en-Wikipedia: Manuscripts of Dvůr Králové and Zelená Hora
     */
    {
      id: 'kuninkaanhovin-kasikirjoitukset',
      otsikko: 'Dvůr Královén ja Zelená Horan käsikirjoitusväärennökset',
      nimio: 'Dvůr Králové',
      vuosi: '1817–1818, kumottu 1886',
      paikka: 'Kansallismuseo, Praha (käsikirjoitusten säilytyspaikka)',
      lat: 50.0793, lon: 14.431,
      kortti: 'Kansakunta sai muinaiset sankarirunonsa kirkontornista, ja vain '
        + 'ilonpilaaja kysyi, miksi muinaistšekki kuulosti epäilyttävän '
        + 'tuoreelta. Masaryk kysyi — ja hänestä tuli hetkeksi Böömin vihatuin '
        + 'mies. Myöhemmin hänestä tuli presidentti, mikä kertoo jotain '
        + 'lohdullista totuuden pitkästä matkasta.',
      lahde: 'en-Wikipedia "Manuscripts of Dvůr Králové and Zelená Hora". '
        + 'Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Kuka johti taistelua käsikirjoitusten paljastamiseksi '
          + 'väärennöksiksi 1886?',
        vaihtoehdot: [
          'Tomáš Masaryk, myöhempi presidentti',
          'Václav Hanka, käsikirjoitusten löytäjä',
          'Itävallan keisarin sensori',
        ],
        oikea: 0,
      },
    },
    /*
     * Hněvínin linna, Most (Kelleyn viimeinen vankila).
     * Lähde: en-Wikipedia: Edward Kelley
     * Korjattu 401 m: en-Wikipedia "Hněvín" -koordinaatit.
     */
    {
      id: 'kelley-alkemistihuijari',
      otsikko: 'Edward Kelley — keisarin kultaa luvannut alkemisti',
      nimio: 'Edward Kelley',
      vuosi: '1586–1597',
      paikka: 'Hněvínin linna, Most (Kelleyn viimeinen vankila)',
      lat: 50.5203, lon: 13.6336,
      kortti: 'Kelley myi keisarille tuotetta, jota ei ollut olemassa: huomenna '
        + 'valmistuvaa kultaa. Liiketoimintamallin heikkous paljastui siinä '
        + 'vaiheessa, kun keisari alkoi odottaa toimitusta linnanmuurien kera. '
        + 'Alkemistin ura päättyi tornihuoneeseen, josta paraskaan tinktuura ei '
        + 'auttanut ulos.',
      lahde: 'en-Wikipedia "Edward Kelley". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miksi keisari Rudolf II vangitutti alkemisti Edward Kelleyn?',
        vaihtoehdot: [
          'Kelley yritti myrkyttää keisarin',
          'Kaksintaistelun takia — ja jottei kullantekijä karkaisi ennen '
            + 'tuloksia',
          'Kelley oli paljastunut Englannin vakoojaksi',
        ],
        oikea: 1,
      },
    },
    /*
     * Týnin kirkko, Praha (Brahen hauta).
     * Lähde: en-Wikipedia: Tycho Brahe
     */
    {
      id: 'tycho-brahen-kuolinmysteeri',
      otsikko: 'Tycho Brahen kuolinmysteeri ja myrkytyshuhut',
      nimio: 'Tychon mysteeri',
      vuosi: '1601, haudanavaukset 1901 ja 2010',
      paikka: 'Týnin kirkko, Praha (Brahen hauta)',
      lat: 50.0879, lon: 14.4225,
      kortti: 'Neljäsataa vuotta hyvä juoru voitti lääkärintodistuksen: '
        + 'tähtitieteilijä myrkytettiin, ja tekijä oli tietysti kollega. Sitten '
        + 'kaksi haudanavausta ja yksi laboratorio pilasivat kertomuksen — '
        + 'kuolinsyy oli kohtalokas kohteliaisuus pitopöydässä. Sivutuotteena '
        + 'selvisi, että legendaarinen hopeanenä oli messinkiä. Huhut kestävät '
        + 'huonosti punnitusta.',
      lahde: 'en-Wikipedia "Tycho Brahe". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mitä Tycho Brahen vuoden 2010 haudanavaus paljasti '
          + 'myrkytyshuhuista?',
        vaihtoehdot: [
          'Merkkejä elohopeamyrkytyksestä ei ollut',
          'Elohopeaa löytyi tappava määrä',
          'Haudassa ei ollutkaan Brahen ruumis',
        ],
        oikea: 0,
      },
    },
  ],
  DEU: [
    /*
     * Würzburgin yliopisto.
     * Lähde: en.wikipedia.org: Beringer's Lying Stones
     */
    {
      id: 'beringerin-valhekivet',
      otsikko: 'Würzburgin valhekivet — fossiileja Jumalan nimikirjoituksella',
      nimio: 'Valhekivet',
      vuosi: '1725–1726',
      paikka: 'Würzburgin yliopisto',
      lat: 49.7881, lon: 9.9353,
      kortti: 'Professori löysi kiviä, joissa oli valmiit kuvat linnuista, '
        + 'hämähäkeistä ja tähdenlennoista — ja piti jumalallisena johdatuksena '
        + 'sitä, ettei kukaan muu ollut sattunut samalle kukkulalle. Kollegat '
        + 'olivat veistäneet joka ikisen. Kirja ehti painoon ennen kuin kukaan '
        + 'kehtasi kertoa.',
      lahde: 'en-Wikipedia "Beringer\'s Lying Stones". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Ketkä olivat kätkeneet väärennetyt \'fossiilit\' Beringerin '
          + 'löydettäviksi?',
        vaihtoehdot: [
          'Hänen opiskelijansa kostoksi hylätyistä tenteistä',
          'Kiertelevä kivenhakkaaja rahan toivossa',
          'Hänen omat yliopistokollegansa pilkatakseen häntä',
        ],
        oikea: 2,
      },
    },
    /*
     * Köpenickin raatihuone, Berliini.
     * Lähde: en.wikipedia.org: Wilhelm Voigt
     */
    {
      id: 'kopenickin-kapteeni',
      otsikko: 'Köpenickin kapteeni — univormu joka komensi kaupunkia',
      nimio: 'Valekapteeni',
      vuosi: '1906',
      paikka: 'Köpenickin raatihuone, Berliini',
      lat: 52.4455, lon: 13.5745,
      kortti: 'Suutari osti käytetyn kapteenin univormun, ja Preussin sotilaskuri '
        + 'hoiti loput: sotilaat tottelivat, pormestari antautui, kassa aukesi. '
        + 'Kukaan ei pyytänyt papereita — takki riitti. Keisarikin nauroi, '
        + 'tosin vasta armahduspaperit allekirjoitettuaan.',
      lahde: 'en-Wikipedia "Wilhelm Voigt". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mihin \'Köpenickin kapteenin\' vallankäyttö perustui?',
        vaihtoehdot: [
          'Väärennettyyn keisarin valtakirjaan',
          'Pelkkään preussilaisen upseerin univormuun',
          'Lahjottuihin kaupungin virkamiehiin',
        ],
        oikea: 1,
      },
    },
    /*
     * Sternin toimitalo, Hampuri.
     * Lähde: en.wikipedia.org: Hitler Diaries
     */
    {
      id: 'hitlerin-paivakirjat',
      otsikko: 'Sternin päiväkirjaskandaali — 60 väärennettyä nidettä',
      nimio: 'Väärät päiväkirjat',
      vuosi: '1981–1983',
      paikka: 'Sternin toimitalo, Hampuri',
      lat: 53.5436, lon: 9.9805,
      kortti: 'Lehti maksoi miljoonia päiväkirjoista, joiden paperia ei ollut '
        + 'valmistettu ennen kuin niiden kirjoittaja oli jo kuollut. Tekninen '
        + 'tarkistus tilattiin vasta lehdistötilaisuuden jälkeen — järjestys, '
        + 'jota toimitusopit eivät suosittele. Väärentäjä istui tuomionsa ja '
        + 'jatkoi sitten uraa myymällä \'aitoja Kujau-väärennöksiä\'.',
      lahde: 'en-Wikipedia "Hitler Diaries". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miten Hitlerin päiväkirjat lopulta paljastuivat väärennöksiksi?',
        vaihtoehdot: [
          'Käsiala ei vastannut Hitlerin kirjeitä',
          'Väärentäjä tunnusti televisiohaastattelussa',
          'Tekninen tutkimus osoitti paperin ja musteen sodanjälkeisiksi',
        ],
        oikea: 2,
      },
    },
  ],
  DNK: [
    /*
     * Kastellet, Kööpenhamina (Struensee odotti täällä tuomiotaan).
     * Lähde: en.wikipedia.org: Johann Friedrich Struensee
     */
    {
      id: 'struensee-kuninkaan-laakari',
      otsikko: 'Kuninkaan lääkäri, joka hallitsi Tanskaa',
      nimio: 'Struensee',
      vuosi: '1770–1772',
      paikka: 'Kastellet, Kööpenhamina (Struensee odotti täällä tuomiotaan)',
      lat: 55.6911, lon: 12.5939,
      kortti: 'Struensee tuli hoitamaan kuningasta ja päätyi hoitamaan koko '
        + 'valtakuntaa: parhaimmillaan uudistusasetuksia syntyi tiheämmin kuin '
        + 'virkamiehet ehtivät niitä lukea. Lääkäri hallitsi Tanskaa kaksi '
        + 'vuotta ilman että osasi kunnolla tanskaa — se ei kaatanut häntä, '
        + 'mutta kuningattaren sydän kaatoi.',
      lahde: 'en-Wikipedia "Johann Friedrich Struensee". Tarkistettu '
        + '1.9.2026.',
      visa: {
        kysymys: 'Mikä oli Johann Friedrich Struenseen virallinen tehtävä Tanskan '
          + 'hovissa?',
        vaihtoehdot: [
          'Kuningas Kristian VII:n henkilääkäri',
          'Kuningattaren tanskan kielen opettaja',
          'Hovin ylikamariherra',
        ],
        oikea: 0,
      },
    },
    /*
     * Børsen, vanha pörssitalo, Kööpenhamina.
     * Lähde: en.wikipedia.org: Danish state bankruptcy of 1813
     */
    {
      id: 'tanskan-valtionvararikko-1813',
      otsikko: 'Vuoden 1813 valtionvararikko',
      nimio: 'Vararikko 1813',
      vuosi: '1813',
      paikka: 'Børsen, vanha pörssitalo, Kööpenhamina',
      lat: 55.6756, lon: 12.5839,
      kortti: 'Valtio ei voi mennä konkurssiin, sanotaan usein. Tanska kokeili '
        + 'tammikuussa 1813 ja osoitti väitteen vääräksi. Setelien omistajat '
        + 'saivat pitää paperinsa — arvosta suurin osa vain oli kadonnut, ja '
        + 'luottamuksen paluuta saatiin odottaa pidempään kuin rauhaa.',
      lahde: 'en-Wikipedia "Danish state bankruptcy of 1813". Tarkistettu '
        + '1.9.2026.',
      visa: {
        kysymys: 'Mikä ajoi Tanskan valtion vararikkoon vuonna 1813?',
        vaihtoehdot: [
          'Epäonnistunut siirtomaakauppa Intiassa',
          'Napoleonin sotien rahoittaminen setelipainolla',
          'Kööpenhaminan suurpalon jälleenrakennus',
        ],
        oikea: 1,
      },
    },
    /*
     * Kööpenhaminan oikeustalo (Domhuset), Nytorv.
     * Lähde: en.wikipedia.org: Peter Adler Alberti
     */
    {
      id: 'alberti-skandaali',
      otsikko: 'Oikeusministeri ilmoittautui poliisille',
      nimio: 'Alberti',
      vuosi: '1908',
      paikka: 'Kööpenhaminan oikeustalo (Domhuset), Nytorv',
      lat: 55.6772, lon: 12.5731,
      kortti: 'Harva rikos selviää niin vaivattomasti: oikeusministeri hoiti '
        + 'ilmiannon, tunnustuksen ja syyllisen kiinnioton samalla '
        + 'asiointikerralla. Poliisin työksi jäi lähinnä kirjata summa — 18 '
        + 'miljoonaa kruunua — ja tarkistaa, ettei nollia puutu.',
      lahde: 'en-Wikipedia "Peter Adler Alberti". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miten oikeusministeri Albertin kavallukset paljastuivat '
          + 'lopullisesti vuonna 1908?',
        vaihtoehdot: [
          'Säästökassan tilintarkastaja löysi väärennetyt kirjat',
          'Sanomalehti julkaisi salaisia tiliotteita',
          'Alberti ilmoittautui itse poliisille',
        ],
        oikea: 2,
      },
    },
  ],
  ESP: [
    /*
     * Sacromonten luostari, Granada.
     * Lähde: en-Wikipedia "Lead Books of Sacromonte" (tarkistettu 30.8.2026)
     */
    {
      id: 'sacromonten-lyijykirjat',
      otsikko: 'Sacromonten lyijykirjat',
      nimio: 'Lyijykirjat',
      vuosi: '1595–1682',
      paikka: 'Sacromonten luostari, Granada',
      lat: 37.1822, lon: -3.5697,
      kortti: 'Lyijylevyille kaiverretut \'muinaiset\' kirjat kertoivat juuri sen, '
        + 'mitä Granadassa haluttiin kuulla — ja siksi niitä haluttiin uskoa '
        + 'lähes sata vuotta. Rooma tarvitsi neljä vuosikymmentä ja yhden '
        + 'inkvisition todetakseen ilmeisen. Väärennös oli huono, mutta toive '
        + 'oli vahva.',
      lahde: 'en-Wikipedia "Lead Books of Sacromonte". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mistä materiaalista Sacromonten \'muinaiset kirjat\' oli tehty?',
        vaihtoehdot: [
          'Lyijylevyistä',
          'Pergamentista',
          'Papyruksesta',
        ],
        oikea: 0,
      },
    },
    /*
     * Lavapiésin kaupunginosa, Madrid.
     * Lähde: es-Wikipedia "Baldomera Larra" (tarkistettu 30.8.2026)
     */
    {
      id: 'baldomera-larra-pyramidi',
      otsikko: 'Baldomera Larran rahapyramidi',
      nimio: 'Baldomera',
      vuosi: '1870-luku',
      paikka: 'Lavapiésin kaupunginosa, Madrid',
      lat: 40.4089, lon: -3.7009,
      kortti: 'Baldomera lupasi tallettajille korkoa, jollaista pankit eivät '
        + 'kehdanneet edes vitsinä luvata, ja madridilaiset jonottivat ovelle. '
        + 'Järjestelmä toimi täydellisesti — niin kauan kuin uusia jonottajia '
        + 'riitti. Menetelmä sai myöhemmin nimensä eräältä herra Ponzilta, joka '
        + 'keksi saman pyörän uudestaan.',
      lahde: 'es-Wikipedia "Baldomera Larra". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miten Baldomera Larran \'talletuskassa\' maksoi luvatut suuret '
          + 'korot?',
        vaihtoehdot: [
          'Kultakaivosten osingoilla',
          'Uusien tallettajien rahoilla',
          'Kuninkaan salaisella tuella',
        ],
        oikea: 1,
      },
    },
    /*
     * Cerro de los Santosin pyhäkkö, Montealegre del Castillo.
     * Lähde: en-Wikipedia "Cerro de los Santos" (tarkistettu 30.8.2026)
     * Lähde: es-Wikipedia "Cerro de los Santos" (väärennökset ja Vicente Juan
     *   y Amat; tarkistettu 30.8.2026)
     */
    {
      id: 'cerro-de-los-santos-vaarennokset',
      otsikko: 'Cerro de los Santosin väärennetyt patsaat',
      nimio: 'Iberipatsaat',
      vuosi: '1860–1870-luku',
      paikka: 'Cerro de los Santosin pyhäkkö, Montealegre del Castillo',
      lat: 38.7333, lon: -1.2694,
      kortti: 'Kun museo maksaa muinaisista patsaista kappalehinnan, muinaisia '
        + 'patsaita alkaa merkillisesti riittää. Kansallismuseon kokoelmiin '
        + 'päätyi aitojen iberiveistosten sekaan tuoreita — ja tutkijat '
        + 'lajittelevat perintöä yhä. Kysyntä loi tarjontaa jo 1800-luvulla.',
      lahde: 'en-Wikipedia "Cerro de los Santos" ja es-Wikipedia "Cerro de '
        + 'los Santos". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miksi Cerro de los Santosin löytöjen joukkoon ilmestyi '
          + 'väärennöksiä 1800-luvulla?',
        vaihtoehdot: [
          'Kaivaja myi veistoksia museolle ja lisäsi tarjontaa omin käsin',
          'Kyläläiset halusivat pilailla tutkijoiden kustannuksella',
          'Hallitus halusi paisuttaa kansallista muinaishistoriaa',
        ],
        oikea: 0,
      },
    },
  ],
  EST: [
    /*
     * Lasnamäen kalliranta, Tallinna.
     * Lähde: en-Wikipedia: Juhan Leinberg
     * Korjattu n. 1,5 km: vanha piste jäi Kadriorgin puistoon; uusi on
     *   Lasnamäen rantatörmällä Narva mnt:n varrella (Nominatim/OSM
     *   "Lasnamägi"), josta merelle näkee. Odottajien tarkkaa kohtaa törmällä
     *   ei tunneta — arvio.
     */
    {
      id: 'lasnamaen-valkea-laiva',
      otsikko: 'Lasnamäen valkea laiva — profeetta Maltsvetin lupaus',
      nimio: 'Valkea laiva',
      vuosi: '1861',
      paikka: 'Lasnamäen kalliranta, Tallinna',
      lat: 59.4446, lon: 24.8135,
      kortti: 'Sadat ihmiset istuivat viikkoja rantakalliolla katsomassa '
        + 'horisonttiin, jossa valkean laivan piti milloin tahansa näkyä. Laiva '
        + 'ei tullut, mutta tarina jäi: \'valkea laiva\' tarkoittaa yhä toivoa, '
        + 'joka on liian kaunis saapuakseen. Profeetta itse palasi lopulta '
        + 'arkisempaan ammattiin — kaupankäyntiin.',
      lahde: 'en-Wikipedia "Juhan Leinberg". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mitä maltsvetilaiset odottivat Lasnamäen kalliolla 1861?',
        vaihtoehdot: [
          'Tsaarin armahduskirjettä',
          'Valkeaa laivaa, joka veisi heidät Krimille',
          'Profeetan paluuta Siperiasta',
        ],
        oikea: 1,
      },
    },
    /*
     * Tallinnan satama.
     * Lähde: fi-Wikipedia: Kieltolaki (Suomi)
     */
    {
      id: 'pirtukauppa-suomenlahdella',
      otsikko: 'Pirtulaivat Suomenlahdella — kieltolain kuuma vientituote',
      nimio: 'Pirtulaivat',
      vuosi: '1919–1932 (ja jo 1850-luku)',
      paikka: 'Tallinnan satama',
      lat: 59.4433, lon: 24.7511,
      kortti: 'Laki poisti viinan kaupoista, ja Suomenlahti hoiti logistiikan: '
        + 'pimeinä öinä Viron rannikolta lähti nopeita veneitä, joiden lasti '
        + 'loiskui kanistereissa. Tulli takavarikoi vuodessa sen, minkä yksi '
        + 'emälaiva toi yhdessä yössä. Harva laki on opettanut taloustiedettä '
        + 'yhtä tehokkaasti — tai kastellut yhtä montaa oppituntia. '
        + 'Vastaanottava ranta oli Suomen — sama tarina jatkuu Helsingin '
        + 'Kauppatorilla.',
      lahde: 'fi-Wikipedia "Kieltolaki (Suomi)". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mistä pirtu pääosin salakuljetettiin Suomeen kieltolain '
          + 'alkuvuosina?',
        vaihtoehdot: [
          'Ruotsista',
          'Neuvosto-Venäjältä',
          'Virosta',
        ],
        oikea: 2,
      },
    },
    /*
     * Toompean linna, Tallinna (kuuluisan pakoretken näyttämö).
     * Lähde: et-Wikipedia: Rummu Jüri
     */
    {
      id: 'rummu-jyri-mestarikarkuri',
      otsikko: 'Rummu Jüri — kartanoiden kauhu ja mestarikarkuri',
      nimio: 'Rummu Jüri',
      vuosi: '1870-luku, kiinniotto 1879',
      paikka: 'Toompean linna, Tallinna (kuuluisan pakoretken näyttämö)',
      lat: 59.4356, lon: 24.7375,
      kortti: 'Vanginvartijat rakensivat Rummu Jürille sellin kaksinkertaisella '
        + 'katolla ja lattialla, koska tavallinen selli oli hänelle lähinnä '
        + 'ehdotus. Kartanonherrat pelkäsivät, kansa hymyili partaansa, ja '
        + 'lehdet keksivät hänelle ulkomaisia rosvonimiä, kun kotimainen suosio '
        + 'kiusasi. Legendan viimeinen temppu oli paras: kukaan ei varmasti '
        + 'tiedä, missä ja milloin hän kuoli.',
      lahde: 'et-Wikipedia "Rummu Jüri". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miten Rummu Jüri pakeni Toompean lossivankilasta?',
        vaihtoehdot: [
          'Lahjomalla vartijan hopealla',
          'Piiloutumalla pyykkikärryyn',
          'Katon kautta ja tornista köyttä pitkin',
        ],
        oikea: 2,
      },
    },
  ],
  FIN: [
    /*
     * Aleksis Kiven kuolinmökki, Tuusula.
     * Lähde: fi.wikipedia.org: Seitsemän veljestä
     * Lähde: fi.wikipedia.org: August Ahlqvist
     */
    {
      id: 'seitseman-veljesta-kirjasota',
      otsikko: 'Kirjasota Seitsemästä veljeksestä',
      nimio: 'Kirjasota',
      vuosi: '1870',
      paikka: 'Aleksis Kiven kuolinmökki, Tuusula',
      lat: 60.4236, lon: 25.0461,
      kortti: 'Yksi arvostelu voi olla tehokkaampi kuin sensuuri: professorin '
        + 'tyrmäys pysäytti Seitsemän veljeksen myynnin kolmeksi vuodeksi. '
        + 'Jälkipolvet ovat äänestäneet toisin — teilatusta kirjasta tuli '
        + 'kansalliskirjallisuuden kulmakivi, ja arvostelu muistetaan lähinnä '
        + 'varoittavana esimerkkinä.',
      lahde: 'fi-Wikipedia "Seitsemän veljestä" ja fi-Wikipedia "August '
        + 'Ahlqvist". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mitä Seitsemän veljeksen tyrmäävästä arvostelusta seurasi vuonna '
          + '1870?',
        vaihtoehdot: [
          'Kirja kiellettiin keisarillisella asetuksella',
          'Vihkojen myynti keskeytettiin ja kirjajulkaisu lykkääntyi vuosia',
          'Kivi veti teoksensa pois myynnistä ja kirjoitti sen uusiksi',
        ],
        oikea: 1,
      },
    },
    /*
     * Helsingin Kauppatori ja Eteläsatama.
     * Lähde: fi.wikipedia.org: Kieltolaki (Suomi)
     * Lähde: fi.wikipedia.org: Algoth Niska
     * Tarkennettu 120 m: fi-Wikipedia "Kauppatori (Helsinki)" -koordinaatit.
     */
    {
      id: 'kieltolaki-ja-pirtukuningas',
      otsikko: 'Kieltolaki ja pirtukuningas',
      nimio: 'Pirtukuningas',
      vuosi: '1919–1932',
      paikka: 'Helsingin Kauppatori ja Eteläsatama',
      lat: 60.1676, lon: 24.9547,
      kortti: 'Laki kielsi alkoholin, mutta unohti kysyä kansalta. Kolmetoista '
        + 'vuotta pirtu kulki Suomenlahden yli nopeammin kuin tulli ehti '
        + 'perässä, ja tunnetuin salakuljettaja oli entinen '
        + 'maajoukkuejalkapalloilija. Lopulta äänestäjät ratkaisivat ottelun '
        + 'lain tappioksi. Lastien lähtöranta oli Viron — sama tarina alkaa '
        + 'Tallinnan satamasta.',
      lahde: 'fi-Wikipedia "Kieltolaki (Suomi)" ja fi-Wikipedia "Algoth '
        + 'Niska". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Kuinka kauan Suomen kieltolaki oli voimassa?',
        vaihtoehdot: [
          'Vuodet 1919–1932',
          'Vuodet 1907–1917',
          'Vuodet 1929–1944',
        ],
        oikea: 0,
      },
    },
    /*
     * Paavo Nurmen patsas, Helsingin Olympiastadion.
     * Lähde: en.wikipedia.org: Paavo Nurmi
     * Lähde: fi.wikipedia.org: Paavo Nurmi
     */
    {
      id: 'nurmen-amatoorikohu',
      otsikko: 'Nurmen amatöörikohu',
      nimio: 'Nurmen kohu',
      vuosi: '1932',
      paikka: 'Paavo Nurmen patsas, Helsingin Olympiastadion',
      lat: 60.1875, lon: 24.9272,
      kortti: 'Aikakauden kovin kestävyysjuoksija pysäytettiin lopulta paperilla, '
        + 'ei radalla: kaksi päivää ennen avajaisia kokous päätti, ettei Nurmi '
        + 'juokse. Kysymys kuului, oliko juoksija ottanut matkoistaan rahaa — '
        + 'vastausta ei virallisesti annettu koskaan, mutta maratonhaave jäi.',
      lahde: 'en-Wikipedia "Paavo Nurmi" ja fi-Wikipedia "Paavo Nurmi". '
        + 'Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miksi Paavo Nurmi ei saanut kilpailla Los Angelesin '
          + 'olympialaisissa 1932?',
        vaihtoehdot: [
          'Hän myöhästyi laivamatkalta Amerikkaan',
          'Loukkaantuminen esti maratonin juoksemisen',
          'IAAF hyllytti hänet amatöörisääntöepäilyjen vuoksi',
        ],
        oikea: 2,
      },
    },
  ],
  FRA: [
    /*
     * Louvre, Pariisi.
     * Lähde: en-Wikipedia "Vincenzo Peruggia" (tarkistettu 30.8.2026)
     */
    {
      id: 'mona-lisan-varkaus-1911',
      otsikko: 'Mona Lisan varkaus',
      nimio: 'Mona Lisan varkaus',
      vuosi: '1911–1913',
      paikka: 'Louvre, Pariisi',
      lat: 48.8611, lon: 2.3364,
      kortti: 'Maailman kuuluisin taulu vietiin Louvresta maanantaiaamuna työtakin '
        + 'alla, eikä kukaan huomannut mitään ennen seuraavaa päivää. Varas '
        + 'odotti sankarin mainetta Italiassa — sai sellin ja jälkimaailmalta '
        + 'sivuosan taulun tarinassa. Taulu sen sijaan sai varkaudesta '
        + 'lopullisen maailmanmaineensa.',
      lahde: 'en-Wikipedia "Vincenzo Peruggia". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Missä kaupungissa Mona Lisa löytyi yli kaksi vuotta varkauden '
          + 'jälkeen?',
        vaihtoehdot: [
          'Milanossa',
          'Firenzessä',
          'Roomassa',
        ],
        oikea: 1,
      },
    },
    /*
     * Versailles'n palatsi.
     * Lähde: en-Wikipedia "Affair of the Diamond Necklace" (tarkistettu
     *   30.8.2026)
     */
    {
      id: 'kaulanauhajuttu-1785',
      otsikko: 'Kuningattaren kaulanauhajuttu',
      nimio: 'Kaulanauhajuttu',
      vuosi: '1784–1785',
      paikka: 'Versailles\'n palatsi',
      lat: 48.8049, lon: 2.1204,
      /*
       * KAUPUNKIKATOSTA VAPAA (js/fokuskohteet.js, osio KATTOVAPAA):
       * Versailles on 20 kilometriä Pariisin keskustasta eikä osu
       * kaupunkilehden kohdekartan rajaukseen, joten merkki kuuluu
       * pääkartalle — kaupunkinostojen katto ei koske sitä.
       */
      kattoVapaa: true,
      kortti: 'Huijari myi kardinaalille tarinan, kardinaali osti '
        + 'timanttikaulanauhan kuningattarelle, eikä kuningatar tiennyt asiasta '
        + 'mitään. Kun lasku erääntyi, kaulanauha oli jo pilkottu myyntiin. '
        + 'Maksajaksi jäi lopulta koko kuningaskunta — maineessa mitattuna.',
      lahde: 'en-Wikipedia "Affair of the Diamond Necklace". Tarkistettu '
        + '1.9.2026.',
      visa: {
        kysymys: 'Kenen nimissä huijari Jeanne de la Motte sai kardinaali de Rohanin '
          + 'ostamaan timanttikaulanauhan?',
        vaihtoehdot: [
          'Kuningatar Marie Antoinetten',
          'Keisarinna Maria Teresian',
          'Madame de Pompadourin',
        ],
        oikea: 0,
      },
    },
    /*
     * Institut de France (tiedeakatemia), Pariisi.
     * Lähde: en-Wikipedia "Denis Vrain-Lucas" (tarkistettu 30.8.2026)
     */
    {
      id: 'vrain-lucas-kirjevaarennokset',
      otsikko: 'Vrain-Lucasin 27 000 väärennettyä kirjettä',
      nimio: 'Vrain-Lucas',
      vuosi: '1861–1870',
      paikka: 'Institut de France (tiedeakatemia), Pariisi',
      lat: 48.8573, lon: 2.3372,
      kortti: 'Kleopatra kirjoitti Julius Caesarille ranskaksi, vesileimatulle '
        + 'paperille — ja kuuluisa matemaatikko osti kirjeen ilomielin, ja '
        + 'perään 27 000 muuta. Kansallisylpeys teki ostajasta sokean: olihan '
        + 'kirjeissä todiste, että painovoima keksittiin Ranskassa. '
        + 'Tiedeakatemia ei ollut aivan yhtä ilahtunut.',
      lahde: 'en-Wikipedia "Denis Vrain-Lucas". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mikä paljasti järkevälle lukijalle Vrain-Lucasin \'Kleopatran '
          + 'kirjeet\' väärennöksiksi?',
        vaihtoehdot: [
          'Muste oli kemiallisesti uutta',
          'Kirjeet oli sinetöity väärin',
          'Ne oli kirjoitettu 1800-luvun ranskaksi',
        ],
        oikea: 2,
      },
    },
  ],
  GBR: [
    /*
     * Piltdown, East Sussex (löytöpaikka).
     * Lähde: en.wikipedia.org: Piltdown Man
     */
    {
      id: 'piltdownin-ihminen',
      otsikko: 'Piltdownin ihminen — puuttuva rengas joka ei ollut',
      nimio: 'Piltdownin ihminen',
      vuosi: '1912–1953',
      paikka: 'Piltdown, East Sussex (löytöpaikka)',
      lat: 50.9878, lon: 0.0628,
      kortti: 'Sorakuopasta nousi 1912 \'ihmiskunnan puuttuva rengas\': ihmisen kallo '
        + 'ja apinan leuka samassa paketissa. Tiedemaailma nielaisi syötin '
        + 'neljäksikymmeneksi vuodeksi — kukaan ei tullut kysyneeksi, miksi '
        + 'luut oli värjätty. Löytäjä halusi kuuluisaksi, ja tulikin: '
        + 'väärentäjänä.',
      lahde: 'en-Wikipedia "Piltdown Man". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mistä Piltdownin ihminen oli oikeasti koottu?',
        vaihtoehdot: [
          'Neandertalinihmisen luurangosta',
          'Ihmisen kallosta ja apinan leukaluusta',
          'Kipsistä valetusta jäljennöksestä',
        ],
        oikea: 1,
      },
    },
    /*
     * South Sea House, Threadneedle Street, Lontoo.
     * Lähde: en.wikipedia.org: South Sea Company
     * Korjattu 90 m: Threadneedle Streetin ja Bishopsgaten kulma
     *   (Nominatim/OSM), jossa South Sea House seisoi — vanha piste oli
     *   Bishopsgatella talon pohjoispuolella.
     */
    {
      id: 'etelameren-kupla',
      otsikko: 'Etelämeren kupla — pörssiromahdus joka opetti sanan \'bubble\'',
      nimio: 'Etelämeren kupla',
      vuosi: '1720',
      paikka: 'South Sea House, Threadneedle Street, Lontoo',
      lat: 51.5146, lon: -0.0837,
      kortti: 'Yhtiöllä oli yksinoikeus kauppaan, jota ei voinut käydä, ja osake, '
        + 'joka vain nousi — kunnes ei enää noussut. Lontoo oppi vuonna 1720 '
        + 'sanan \'kupla\' kalleimmalla mahdollisella tavalla. '
        + 'Konttorirakennuksen nimi seisoo yhä Threadneedle Streetin kulmassa.',
      lahde: 'en-Wikipedia "South Sea Company". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miksi South Sea Companyn luvattu Etelä-Amerikan kauppa ei koskaan '
          + 'tuottanut voittoa?',
        vaihtoehdot: [
          'Espanja ja Portugali hallitsivat aluetta, eikä kauppaa päässyt '
            + 'syntymään',
          'Yhtiön laivat upposivat myrskyissä',
          'Parlamentti kielsi kaupankäynnin heti alkuunsa',
        ],
        oikea: 0,
      },
    },
    /*
     * Leithin satama, Edinburgh (siirtolaislaivan lähtöpaikka).
     * Lähde: en.wikipedia.org: Gregor MacGregor
     */
    {
      id: 'poyaisin-huijaus',
      otsikko: 'Poyais — maa jota ei ollut olemassa',
      nimio: 'Poyais',
      vuosi: '1821–1823',
      paikka: 'Leithin satama, Edinburgh (siirtolaislaivan lähtöpaikka)',
      lat: 55.98, lon: -3.17,
      kortti: 'MacGregor ei myynyt sijoittajille huonoa maata — hän myi maata, jota '
        + 'ei ollut olemassa lainkaan. Poyaisilla oli lippu, obligaatiot ja '
        + 'opaskirjakin; puuttui vain itse valtio. Laivat purjehtivat kartalta '
        + 'löytymättömään satamaan täydessä lastissa.',
      lahde: 'en-Wikipedia "Gregor MacGregor". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mitä Poyaisiin purjehtineet siirtolaiset löysivät perille '
          + 'päästyään?',
        vaihtoehdot: [
          'Espanjalaisten miehittämän linnoituksen',
          'Hylätyn kultakaivoksen',
          'Pelkkää koskematonta viidakkoa',
        ],
        oikea: 2,
      },
    },
  ],
  GRC: [
    /*
     * Parthenon, Ateenan Akropolis.
     * Lähde: en-Wikipedia "Elgin Marbles" (tarkistettu 30.8.2026)
     */
    {
      id: 'elginin-marmorit',
      otsikko: 'Elginin marmorikiista',
      nimio: 'Elginin marmorit',
      vuosi: '1801–',
      paikka: 'Parthenon, Ateenan Akropolis',
      lat: 37.9715, lon: 23.7267,
      kortti: 'Parthenonin friisi lähti Ateenasta laivalla 1800-luvun alussa, eikä '
        + 'ole vieläkään palannut. Lupapaperista kiistellään kohta kolmatta '
        + 'vuosisataa — harvasta kuitista on väännetty näin pitkään. Ateenassa '
        + 'marmoreille on varattu museosali valmiiksi, varmuuden vuoksi.',
      lahde: 'en-Wikipedia "Elgin Marbles". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Missä suurin osa Parthenonin irrotetuista veistoksista on nykyään?',
        vaihtoehdot: [
          'Louvressa Pariisissa',
          'British Museumissa Lontoossa',
          'Akropolis-museossa Ateenassa',
        ],
        oikea: 1,
      },
    },
    /*
     * Symin saari, Egeanmeri.
     * Lähde: en-Wikipedia "Constantine Simonides" (tarkistettu 30.8.2026)
     */
    {
      id: 'simonides-kasikirjoitusvaarentaja',
      otsikko: 'Simonides, käsikirjoitusten mestariväärentäjä',
      nimio: 'Simonides',
      vuosi: '1820–1890',
      paikka: 'Symin saari, Egeanmeri',
      lat: 36.6158, lon: 27.8388,
      kortti: 'Simonides myi \'muinaisia\' käsikirjoituksia kuninkaille ja museoille, '
        + 'ja kun eräs aito ikivanha Raamatun koodeksi löytyi, hän ilmoitti '
        + 'tehneensä senkin itse. Mies väärensi urallaan niin paljon, että '
        + 'väärensi lopulta oman kuolemansakin. Paleografia sai hänestä sekä '
        + 'painajaisensa että parhaan mainoksensa.',
      lahde: 'en-Wikipedia "Constantine Simonides". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Minkä kuuluisan aidon käsikirjoituksen Simonides väitti '
          + 'kirjoittaneensa itse?',
        vaihtoehdot: [
          'Codex Sinaiticuksen',
          'Kuolleenmeren kirjakääröt',
          'Magna Cartan',
        ],
        oikea: 0,
      },
    },
    /*
     * Panathinaikon-stadion, Ateena.
     * Lähde: en-Wikipedia "Athletics at the 1896 Summer Olympics – Men's
     *   marathon" (tarkistettu 30.8.2026)
     * Lähde: en-Wikipedia "Spyridon Belokas" (tarkistettu 30.8.2026)
     */
    {
      id: 'belokas-maratonhuijaus-1896',
      otsikko: 'Maratonin salamatkustaja 1896',
      nimio: 'Maratonhuijaus',
      vuosi: '1896',
      paikka: 'Panathinaikon-stadion, Ateena',
      lat: 37.9683, lon: 23.741,
      kortti: 'Olympia-aate oli 1896 muutaman päivän vanha, kun sitä jo koeteltiin: '
        + 'maratonin kolmonen oli matkannut osan reittiä kärryillä. Yleisö ehti '
        + 'hurrata kreikkalaista kolmoisvoittoa kokonaisen illan. Opetus kesti '
        + 'pidempään kuin pronssi — perässä tuleva unkarilainen näet laski, '
        + 'montako juoksijaa hänet ohitti.',
      lahde: 'en-Wikipedia "Athletics at the 1896 Summer Olympics – Men\'s '
        + 'marathon" ja en-Wikipedia "Spyridon Belokas". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miten Spyridon Belokas eteni osan vuoden 1896 olympiamaratonista?',
        vaihtoehdot: [
          'Polkupyörällä',
          'Soutuveneellä',
          'Hevoskärryillä',
        ],
        oikea: 2,
      },
    },
  ],
  HRV: [
    /*
     * Rijekan satama ja kaupungin keskusta.
     * Lähde: hr-Wikipedia "Riječka krpica" (tarkistettu 30.8.2026)
     * Lähde: en-Wikipedia "Croatian–Hungarian Settlement" (artikla 66 ja
     *   Rijekan asema; tarkistettu 30.8.2026)
     */
    {
      id: 'rijecka-krpica-1868',
      otsikko: 'Rijekan paperilappu',
      nimio: 'Rijekan lappu',
      vuosi: '1868',
      paikka: 'Rijekan satama ja kaupungin keskusta',
      lat: 45.3271, lon: 14.4422,
      kortti: 'Valtiosopimukseen tuli jälkikäteen pieni korjaus: artiklan päälle '
        + 'liimattiin lappu, jossa luki toinen sisältö. Näin kokonainen '
        + 'satamakaupunki vaihtoi hallitsijaa paperiliuskan hinnalla. '
        + 'Alkuperäinen teksti kuultaa lapun alta yhä — historian ohuin '
        + 'peittely on kestänyt valoa huonosti.',
      lahde: 'hr-Wikipedia "Riječka krpica" ja en-Wikipedia '
        + '"Croatian–Hungarian Settlement". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miten Kroatian ja Unkarin sovintosopimuksen Rijekaa koskeva '
          + 'artikla muutettiin 1868?',
        vaihtoehdot: [
          'Sivu kirjoitettiin kokonaan uudelleen ja sinetöitiin',
          'Alkuperäisen tekstin päälle liimattiin paperiliuska uudella '
            + 'tekstillä',
          'Artikla yliviivattiin punakynällä',
        ],
        oikea: 1,
      },
    },
    /*
     * Biograd na Moru (kruunauskaupunki).
     * Lähde: en-Wikipedia "Pacta conventa (Croatia)" (tarkistettu 30.8.2026)
     */
    {
      id: 'pacta-conventa-vaarennosepaily',
      otsikko: 'Pacta conventa — sopimus vai väärennös?',
      nimio: 'Pacta conventa',
      vuosi: '1102 / 1300-luku',
      paikka: 'Biograd na Moru (kruunauskaupunki)',
      lat: 43.9436, lon: 15.4519,
      kortti: 'Yksi pergamentti, kaksi tulkintaa kansakunnan asemasta — ja vanhin '
        + 'kappale on parisataa vuotta väitettyä sopimusta nuorempi. Aito tai '
        + 'ei, paperi teki töitä 800 vuotta valtio-opin raskaassa sarjassa. '
        + 'Historioitsijat väittelevät yhä; pergamentti vaikenee.',
      lahde: 'en-Wikipedia "Pacta conventa (Croatia)". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miksi osa historioitsijoista epäilee vuoden 1102 Pacta conventaa '
          + 'väärennökseksi?',
        vaihtoehdot: [
          'Sen sinetti kuuluu väärälle kuninkaalle',
          'Se on kirjoitettu kielellä, jota ei vielä ollut olemassa',
          'Vanhin säilynyt käsikirjoitus on vasta 1300-luvulta',
        ],
        oikea: 2,
      },
    },
    /*
     * Zagrebin katedraali (Zrinskin ja Frankopanin hauta).
     * Lähde: en-Wikipedia "Magnate conspiracy" (tarkistettu 30.8.2026)
     */
    {
      id: 'zrinski-frankopan-salaliitto',
      otsikko: 'Zrinskin ja Frankopanin salaliitto',
      nimio: 'Zrinski-Frankopan',
      vuosi: '1664–1671',
      paikka: 'Zagrebin katedraali (Zrinskin ja Frankopanin hauta)',
      lat: 45.8144, lon: 15.9799,
      kortti: 'Kaksi Kroatian mahtavinta sukua uskoi keisarin lupaukseen armosta ja '
        + 'matkusti Wieniin neuvottelemaan. Lupaus osoittautui kuolleeksi '
        + 'kirjaimeksi, ja sukujen maat — kolmannes maasta — valuivat keisarin '
        + 'kassaan. Salaliitto epäonnistui perusteellisesti, mutta muistona se '
        + 'on menestynyt: kaksikon nimet ovat Kroatiassa yhä katukylttien '
        + 'vakiokalustoa.',
      lahde: 'en-Wikipedia "Magnate conspiracy". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mitä Zrinskin ja Frankopanin sukujen maaomaisuuksille tapahtui '
          + 'salaliiton kukistuttua 1671?',
        vaihtoehdot: [
          'Keisari takavarikoi ne itselleen',
          'Ne jaettiin kirkolle ja kaupungeille',
          'Ne myytiin Venetsian tasavallalle',
        ],
        oikea: 0,
      },
    },
  ],
  HUN: [
    /*
     * Visegrádin ylälinna.
     * Lähde: en-Wikipedia: Helene Kottanner
     */
    {
      id: 'pyhan-kruunun-varkaus-1440',
      otsikko: 'Hovinaisen kruunuvarkaus — Pyhän Tapanin kruunu tyynyn sisässä',
      nimio: 'Kruunuvarkaus 1440',
      vuosi: '1440',
      paikka: 'Visegrádin ylälinna',
      lat: 47.7846, lon: 18.9822,
      kortti: 'Unkarin laki oli selvä: kuningas on se, jolla on kruunu. Niinpä '
        + 'hovinainen, pari apuria, viila ja tyyny ratkaisivat '
        + 'kruununperimyksen tehokkaammin kuin yksikään armeija. Jos joskus '
        + 'näet Pyhän Tapanin kruunun vinon ristin, tiedät nyt, että se taipui '
        + 'pakoreessä jäätyneellä Tonavalla.',
      lahde: 'en-Wikipedia "Helene Kottanner". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Missä Unkarin pyhä kruunu piilotettiin, kun se varastettiin '
          + 'Visegrádista 1440?',
        vaihtoehdot: [
          'Viinitynnyrissä',
          'Tyynyn sisässä',
          'Heinäkuorman alla',
        ],
        oikea: 1,
      },
    },
    /*
     * Budapest, de Horyn synnyinkaupunki.
     * Lähde: en-Wikipedia: Elmyr de Hory
     */
    {
      id: 'elmyr-de-hory-vaarentaja',
      otsikko: 'Elmyr de Hory — tuhannen väärennöksen mestari',
      nimio: 'Elmyr de Hory',
      vuosi: '1906–1976 (paljastui 1967–1968)',
      paikka: 'Budapest, de Horyn synnyinkaupunki',
      lat: 47.4979, lon: 19.0402,
      kortti: 'De Hory väärensi mestareita niin hyvin, että asiantuntijat ostivat — '
        + 'ja väärensi oman elämäkertansa niin hyvin, että toimittajat ostivat '
        + 'senkin. Hänestä kirjan kirjoittanut mies jäi pian itse kiinni '
        + 'väärennetyistä muistelmista, mikä lienee alan täydellisin oppitunti: '
        + 'väärentäjän ympärillä kaikki alkaa olla vähän väärennettyä.',
      lahde: 'en-Wikipedia "Elmyr de Hory". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Minkä taiteilijoiden tyyliin Elmyr de Hory erityisesti väärensi '
          + 'teoksia?',
        vaihtoehdot: [
          'Rembrandtin ja Vermeerin',
          'Da Vincin ja Michelangelon',
          'Picasson, Matissen ja Modiglianin',
        ],
        oikea: 2,
      },
    },
    /*
     * Unkarin kansallismuseo, Budapest (aarteen nykyinen koti).
     * Lähde: en-Wikipedia: Seuso Treasure
     */
    {
      id: 'seuso-aarteen-kiista',
      otsikko: 'Seuson hopea-aarre ja väärennetyt paperit',
      nimio: 'Seuson hopeat',
      vuosi: 'löytö n. 1975–76, skandaali 1990, paluu 2014 ja 2017',
      paikka: 'Unkarin kansallismuseo, Budapest (aarteen nykyinen koti)',
      lat: 47.4912, lon: 19.0625,
      kortti: 'Roomalainen hopeakalusto matkusti Unkarin pellosta Lontoon holveihin '
        + 'paperilla, jonka mukaan se oli aina asunut Libanonissa. Hopea itse '
        + 'todisti toista: lautaseen oli kaiverrettu Balatonin roomalainen '
        + 'nimi. Esine voi valehdella alkuperänsä vain, jos kukaan ei lue mitä '
        + 'siihen on kirjoitettu.',
      lahde: 'en-Wikipedia "Seuso Treasure". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mikä kaiverrus tuki Unkarin väitettä Seuson aarteen alkuperästä?',
        vaihtoehdot: [
          '\'Pelso\' — Balaton-järven roomalainen nimi',
          '\'Pannonia\' — Rooman maakunnan nimi',
          'Omistajan sukuvaakuna',
        ],
        oikea: 0,
      },
    },
  ],
  IRL: [
    /*
     * Phoenix Park, Dublin (kirjeiden aihe).
     * Lähde: en.wikipedia.org: Richard Pigott
     * Lähde: en.wikipedia.org: Charles Stewart Parnell
     */
    {
      id: 'pigottin-vaarennetyt-kirjeet',
      otsikko: 'Pigottin kirjeet — väärennös joka kaatui yhteen kirjoitusvirheeseen',
      nimio: 'Pigottin kirjeet',
      vuosi: '1887–1889',
      paikka: 'Phoenix Park, Dublin (kirjeiden aihe)',
      lat: 53.36, lon: -6.33,
      kortti: 'Suuri sanomalehti osti kirjeet, jotka olisivat tuhonneet Irlannin '
        + 'kuuluisimman poliitikon — ja koko juttu kaatui yhteen väärin '
        + 'kirjoitettuun sanaan. Väärentäjä teki oikeussalissa saman virheen '
        + 'kuin paperilla. Oikoluku olisi kannattanut.',
      lahde: 'en-Wikipedia "Richard Pigott" ja en-Wikipedia "Charles Stewart '
        + 'Parnell". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miten Richard Pigottin väärennös paljastui erityistuomioistuimessa '
          + '1889?',
        vaihtoehdot: [
          'Musteen kemiallinen analyysi osoitti kirjeet uusiksi',
          'Hän toisti sanelussa saman kirjoitusvirheen kuin kirjeissä',
          'Parnell esitti alibin kirjeiden päiväyksille',
        ],
        oikea: 1,
      },
    },
    /*
     * Avondale House, Rathdrum (Parnellin kotitalo).
     * Lähde: en.wikipedia.org: Charles Stewart Parnell
     */
    {
      id: 'parnellin-lankeemus',
      otsikko: 'Parnellin lankeemus — skandaali joka jakoi Irlannin',
      nimio: 'Parnell',
      vuosi: '1890–1891',
      paikka: 'Avondale House, Rathdrum (Parnellin kotitalo)',
      lat: 52.9133, lon: -6.2228,
      kortti: 'Mies, joka piti käsissään Britannian parlamentin vaakaa, kaatui '
        + 'avioero-oikeudenkäyntiin. Vuodessa kansallissankarista tuli '
        + 'puolueensa riitakysymys, ja Irlannin itsehallinto siirtyi '
        + 'sukupolvella eteenpäin. Historia tuntee harvoja kalliimpia '
        + 'yksityiselämän paljastuksia.',
      lahde: 'en-Wikipedia "Charles Stewart Parnell". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mikä oli Parnellin vuoden 1890 skandaalin merkittävin poliittinen '
          + 'seuraus?',
        vaihtoehdot: [
          'Irlannin puolue hajosi ja itsehallintohanke lykkääntyi '
            + 'vuosikymmeniksi',
          'Britannia myönsi Irlannille välittömän itsehallinnon',
          'Parnell karkotettiin siirtomaihin',
        ],
        oikea: 0,
      },
    },
    /*
     * Custom House, Dublin (kauppasataman symboli).
     * Lähde: en.wikipedia.org: Ouzel Galley
     */
    {
      id: 'ouzel-galleyn-mysteeri',
      otsikko: 'Ouzel Galley — kadonnut laiva joka palasi aarteineen',
      nimio: 'Ouzel Galley',
      vuosi: '1695–1705',
      paikka: 'Custom House, Dublin (kauppasataman symboli)',
      lat: 53.3485, lon: -6.2531,
      kortti: 'Laiva julistettiin menneeksi, miehistö kuolleiksi ja vakuutukset '
        + 'maksettiin — sitten koko komeus purjehti takaisin satamaan lasti '
        + 'täynnä. Kenelle kuuluu aarre, jonka omistajille on jo korvattu sen '
        + 'menetys? Dublin perusti kysymyksen ratkomiseen kokonaisen seuran.',
      lahde: 'en-Wikipedia "Ouzel Galley". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mitä Ouzel Galleyn ylimääräiselle saalisrahalle tehtiin, kun '
          + 'omistajat ja vakuuttajat oli hyvitetty?',
        vaihtoehdot: [
          'Se lahjoitettiin kuninkaalle',
          'Se jaettiin miehistön kesken',
          'Se ohjattiin köyhtyneiden kauppiaiden avustusrahastoksi',
        ],
        oikea: 2,
      },
    },
  ],
  ISL: [
    /*
     * Stjórnarráðshúsið (hallituksen talo), Reykjavík.
     * Lähde: en.wikipedia.org: Jørgen Jørgensen
     */
    {
      id: 'koirapaivien-kuningas',
      otsikko: 'Koirapäivien kuningas — kaksi kuukautta vallankumousta',
      nimio: 'Koirapäiväkuningas',
      vuosi: '1809',
      paikka: 'Stjórnarráðshúsið (hallituksen talo), Reykjavík',
      lat: 64.1475, lon: -21.933,
      kortti: 'Mies astui maihin kauppalaivasta, pidätti kuvernöörin ja julisti '
        + 'saarivaltion itsenäiseksi — kaikki tämä yhden kesän aikana. Kahden '
        + 'kuukauden päästä kuningaskunta oli ohi ja kuningas vankina laivassa. '
        + 'Islanti antoi hänelle arvonimen, jota yksikään hallitsija ei ole '
        + 'halunnut periä.',
      lahde: 'en-Wikipedia "Jørgen Jørgensen". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miksi islantilaiset kutsuvat Jørgen Jørgenseniä \'koirapäivien '
          + 'kuninkaaksi\'?',
        vaihtoehdot: [
          'Hän kulki kaikkialla koiralaumansa kanssa',
          'Hänen lyhyt valtakautensa osui kesän koirapäiviin',
          'Hän verotti islantilaisten koiria',
        ],
        oikea: 1,
      },
    },
    /*
     * Eldeyn saari (viimeisten lintujen pesäpaikka).
     * Lähde: en.wikipedia.org: Great auk
     */
    {
      id: 'siivettoman-ruokin-loppu',
      otsikko: 'Eldey 1844 — kokoelmiin kerätty sukupuutto',
      nimio: 'Eldey 1844',
      vuosi: '1844',
      paikka: 'Eldeyn saari (viimeisten lintujen pesäpaikka)',
      lat: 63.7409, lon: -22.9576,
      kortti: 'Mitä harvinaisemmaksi lintu kävi, sitä enemmän museot siitä '
        + 'maksoivat — ja sitä nopeammin se katosi. Viimeinen pari haettiin '
        + 'Eldeyn kalliolta tilaustyönä vuonna 1844. Kokoelma täydentyi; laji '
        + 'loppui.',
      lahde: 'en-Wikipedia "Great auk". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miksi viimeiset siivettömät ruokit tapettiin Eldeyllä vuonna 1844?',
        vaihtoehdot: [
          'Kauppias halusi yksilöt kokoelmiin',
          'Saarelaiset tarvitsivat ravintoa katovuonna',
          'Linnut uhkasivat kalastajien verkkoja',
        ],
        oikea: 0,
      },
    },
  ],
  ITA: [
    /*
     * Fosso Reale -kanava, Livorno.
     * Lähde: en-Wikipedia "Amedeo Modigliani" (osio Legacy: 1984 heads hoax;
     *   tarkistettu 30.8.2026)
     */
    {
      id: 'modiglianin-paat-1984',
      otsikko: 'Modiglianin väärennetyt päät',
      nimio: 'Modiglianin päät',
      vuosi: '1984',
      paikka: 'Fosso Reale -kanava, Livorno',
      lat: 43.5485, lon: 10.3106,
      kortti: 'Livornon kanavasta nousi 1984 kolme kivipäätä, ja asiantuntijat '
        + 'itkivät liikutuksesta: Modiglianin kadonneet veistokset! Sitten '
        + 'opiskelijat näyttivät television katsojille videon, jolla päät '
        + 'syntyivät porakoneella. Asiantuntijat eivät itkeneet enää '
        + 'liikutuksesta.',
      lahde: 'en-Wikipedia "Amedeo Modigliani". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Millä työkalulla opiskelijat paljastivat veistäneensä yhden '
          + 'Livornon kanavasta löytyneistä \'Modiglianin päistä\'?',
        vaihtoehdot: [
          'Taltalla ja nuijalla',
          'Porakoneella',
          'Kulmahiomakoneella',
        ],
        oikea: 1,
      },
    },
    /*
     * Palazzo Montecitorio (parlamentti), Rooma.
     * Lähde: en-Wikipedia "Banca Romana scandal" (tarkistettu 30.8.2026)
     */
    {
      id: 'banca-romana-1893',
      otsikko: 'Banca Romanan skandaali',
      nimio: 'Banca Romana',
      vuosi: '1893',
      paikka: 'Palazzo Montecitorio (parlamentti), Rooma',
      lat: 41.9009, lon: 12.4785,
      kortti: 'Kun setelipainossa loppuvat numerot kesken, voi tietysti painaa '
        + 'samat numerot kahdesti — näin ajateltiin Banca Romanassa. Skandaali '
        + 'kaatoi hallituksen ja synnytti sivutuotteena Italian keskuspankin. '
        + 'Harva pankkikriisi on ollut näin tuottelias.',
      lahde: 'en-Wikipedia "Banca Romana scandal". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mikä instituutio perustettiin Banca Romanan skandaalin '
          + 'seurauksena?',
        vaihtoehdot: [
          'Italian keskuspankki Banca d\'Italia',
          'Euroopan keskuspankki',
          'Rooman pörssi',
        ],
        oikea: 0,
      },
    },
    /*
     * Forte di San Leo, San Leo.
     * Lähde: en-Wikipedia "Alessandro Cagliostro" (tarkistettu 30.8.2026)
     */
    {
      id: 'cagliostro-san-leo',
      otsikko: 'Cagliostro, huijareiden kreivi',
      nimio: 'Cagliostro',
      vuosi: '1743–1795',
      paikka: 'Forte di San Leo, San Leo',
      lat: 43.8962, lon: 12.3411,
      kortti: 'Kreivi Cagliostro paransi sairaita, muutti metalleja kullaksi ja '
        + 'luki tulevaisuutta — ainakin omien sanojensa mukaan. Euroopan hovit '
        + 'uskoivat vuosikausia. Ura päättyi vuoristolinnoituksen selliin, '
        + 'josta edes suuri maagikko ei loihtinut itseään ulos.',
      lahde: 'en-Wikipedia "Alessandro Cagliostro". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mikä oli \'kreivi Cagliostrona\' esiintyneen huijarin oikea nimi?',
        vaihtoehdot: [
          'Vincenzo Peruggia',
          'Bernardo Tanlongo',
          'Giuseppe Balsamo',
        ],
        oikea: 2,
      },
    },
  ],
  LTU: [
    /*
     * Liettuan suurruhtinaiden palatsi, Vilna.
     * Lähde: en.wikipedia.org: Barbara Radziwiłł
     */
    {
      id: 'barbora-salainen-avioliitto',
      otsikko: 'Kuninkaan salainen avioliitto',
      nimio: 'Salattu avioliitto',
      vuosi: '1547–1551',
      paikka: 'Liettuan suurruhtinaiden palatsi, Vilna',
      lat: 54.6862, lon: 25.289,
      kortti: 'Kuningas voi julistaa sotia ja säätää lakeja, mutta salaa solmittu '
        + 'avioliitto osoittautui vaikeimmaksi asiaksi puolustaa. Sigismund '
        + 'August valitsi Barboran ja piti valintansa — vaikka koko valtakunta, '
        + 'oma äiti etunenässä, oli toista mieltä. Myrkkyhuhut elävät Vilnassa '
        + 'yhä.',
      lahde: 'en-Wikipedia "Barbara Radziwiłł". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Kuka vastusti kiivaimmin Sigismund Augustin ja Barbora Radvilaitėn '
          + 'avioliittoa?',
        vaihtoehdot: [
          'Kuninkaan äiti Bona Sforza ja Puolan aateli',
          'Barboran oma Radvila-suku',
          'Paavi, joka ei tunnustanut liittoa',
        ],
        oikea: 0,
      },
    },
    /*
     * Dariuksen ja Girėnasin muistomerkki, Ąžuolynasin puisto, Kaunas.
     * Lähde: en.wikipedia.org: Lituanica
     */
    {
      id: 'lituanican-viimeinen-lento',
      otsikko: 'Lituanican viimeinen lento',
      nimio: 'Lituanica',
      vuosi: '1933',
      paikka: 'Dariuksen ja Girėnasin muistomerkki, Ąžuolynasin puisto, Kaunas',
      lat: 54.9, lon: 23.944,
      kortti: 'Kaksi siirtolaislentäjää, yksi pieni kone ja 6 411 kilometriä '
        + 'avomerta — kaikki meni nappiin, kunnes viimeiset 650 kilometriä '
        + 'jäivät lentämättä. Syytä ei koskaan selvitetty, ja juuri se piti '
        + 'tarinan hengissä: jokainen liettualainen tuntee Lituanican, ja moni '
        + 'tietää siitä oman versionsa.',
      lahde: 'en-Wikipedia "Lituanica". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mihin Lituanican lento vuonna 1933 päättyi?',
        vaihtoehdot: [
          'Kone laskeutui polttoaineen loputtua Itämereen',
          'Kone saapui Kaunasiin kolme päivää myöhässä',
          'Kone syöksyi maahan Saksassa, syy jäi selvittämättä',
        ],
        oikea: 2,
      },
    },
    /*
     * Liettuan pankin rahamuseo, Vilna.
     * Lähde: en.wikipedia.org: Boratynka
     */
    {
      id: 'boratynka-kuparikohu',
      otsikko: 'Boratynka — kuparirahojen kohu',
      nimio: 'Boratynka',
      vuosi: '1659–1668',
      paikka: 'Liettuan pankin rahamuseo, Vilna',
      lat: 54.6861, lon: 25.2833,
      kortti: 'Kun kassa on tyhjä, voi aina lyödä lisää rahaa — kunhan ei kysy, '
        + 'mitä raha sen jälkeen on arvoltaan. Puola-Liettua kokeili tätä '
        + '1600-luvulla kuparilla, ja kansa antoi kolikolle pilkkanimen, joka '
        + 'on kestänyt pidempään kuin kolikon ostovoima.',
      lahde: 'en-Wikipedia "Boratynka". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mistä boratynka-kolikko sai nimensä?',
        vaihtoehdot: [
          'Kolikkoa lyöneen rahapajan kaupungista',
          'Rahanlyönnistä vastanneesta Tito Livio Burattinista',
          'Puolan sanasta, joka tarkoittaa halpaa',
        ],
        oikea: 1,
      },
    },
  ],
  LVA: [
    /*
     * Zaube (entinen Jürgensburg), Latvia — oikeudenkäynnin pitäjä.
     * Lähde: en.wikipedia.org: Thiess of Kaltenbrun
     */
    {
      id: 'thiess-ihmissusi',
      otsikko: 'Jumalan koira — Liivinmaan ihmissusioikeudenkäynti',
      nimio: 'Jumalan koira',
      vuosi: '1692',
      paikka: 'Zaube (entinen Jürgensburg), Latvia — oikeudenkäynnin pitäjä',
      lat: 56.9963, lon: 25.2611,
      kortti: 'Useimmat oikeusjutut alkavat kiistämisellä. Tämä alkoi sillä, että '
        + 'kahdeksankymppinen vastaaja myönsi heti olevansa ihmissusi — ja '
        + 'lisäsi, että hän on nimenomaan hyvien puolella, Jumalan koira, joka '
        + 'käy helvetissä hakemassa varastetun sadon takaisin. Tuomarit '
        + 'pyörittelivät papereitaan pitkään.',
      lahde: 'en-Wikipedia "Thiess of Kaltenbrun". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miksi Thiess omien sanojensa mukaan muuttui ihmissudeksi?',
        vaihtoehdot: [
          'Hän taisteli Paholaista ja noitia vastaan sadon puolesta',
          'Hän halusi pelotella naapurinsa pois mailtaan',
          'Noita oli kironnut hänet vasten tahtoaan',
        ],
        oikea: 0,
      },
    },
    /*
     * Riian raatihuoneentori (Rātslaukums), Riika.
     * Lähde: en.wikipedia.org: Calendar riots in Riga
     */
    {
      id: 'riian-kalenterikahakat',
      otsikko: 'Riian kalenterikahakat',
      nimio: 'Kalenterikahakat',
      vuosi: '1584–1589',
      paikka: 'Riian raatihuoneentori (Rātslaukums), Riika',
      lat: 56.9469, lon: 24.1064,
      kortti: 'Voiko kymmenen kadonnutta päivää kaataa kaupungin? Riiassa vuonna '
        + '1584 pystyi: uusi kalenteri vei kaupungin vuosiksi sekasortoon, ja '
        + 'kun pöly laskeutui, Riika päätti pysyä vanhassa ajassa. Sinnikkyys '
        + 'kesti — kaupunki vaihtoi kalenteria vasta 335 vuotta myöhemmin.',
      lahde: 'en-Wikipedia "Calendar riots in Riga". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Milloin Riika lopulta siirtyi gregoriaaniseen kalenteriin?',
        vaihtoehdot: [
          'Vuonna 1589, kalenterikahakoiden päätyttyä',
          'Vuonna 1700, Ruotsin vallan aikana',
          'Vasta vuonna 1919',
        ],
        oikea: 2,
      },
    },
  ],
  NLD: [
    /*
     * Tresoar (Frieslandin maakunta-arkisto), Leeuwarden.
     * Lähde: en.wikipedia.org: Oera Linda Book
     */
    {
      id: 'oera-linda-kasikirjoitus',
      otsikko: 'Oera Linda -kirja — muinaiskäsikirjoitus joka oli liian hyvä',
      nimio: 'Oera Linda',
      vuosi: '1867–1879',
      paikka: 'Tresoar (Frieslandin maakunta-arkisto), Leeuwarden',
      lat: 53.2035, lon: 5.7903,
      kortti: 'Käsikirjoitus lupasi friiseille neljäntuhannen vuoden kunniakkaan '
        + 'historian — paperilla, joka tuoksui vielä painomusteelta. Oppineet '
        + 'riitelivät vuosikymmenen ennen kuin sepite myönnettiin sepitteeksi. '
        + 'Väärennös on nyt arkistossa arvopaikalla: se on aito väärennös.',
      lahde: 'en-Wikipedia "Oera Linda Book". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Millä kielellä Oera Linda -kirja oli kirjoitettu?',
        vaihtoehdot: [
          'Latinaksi',
          'Muinaisnorjaksi',
          'Jäljitellyllä muinaisfriisillä',
        ],
        oikea: 2,
      },
    },
    /*
     * Museum Boijmans Van Beuningen, Rotterdam.
     * Lähde: en.wikipedia.org: Han van Meegeren
     */
    {
      id: 'van-meegerenin-vermeerit',
      otsikko: 'Van Meegeren — mies joka maalasi Vermeerit itse',
      nimio: 'Van Meegeren',
      vuosi: '1937–1947',
      paikka: 'Museum Boijmans Van Beuningen, Rotterdam',
      lat: 51.9142, lon: 4.4733,
      kortti: 'Ainoa keino välttää tuomio maanpetoksesta oli tunnustaa olevansa '
        + 'väärentäjä — ja todistaa se maalaamalla vartijoiden katsellessa uusi '
        + 'Vermeer. Göring oli maksanut omaisuuden taulusta, jota Vermeer ei '
        + 'ollut koskaan nähnyt. Hollanti sai sodanjälkeisen sankarin, jonka '
        + 'ammatti oli petos.',
      lahde: 'en-Wikipedia "Han van Meegeren". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miksi van Meegeren tunnusti väärentäneensä \'Vermeerinsä\'?',
        vaihtoehdot: [
          'Röntgenkuvaus paljasti maalikerrosten alta luonnoksen',
          'Häntä syytettiin kansallisaarteen myymisestä natseille, mistä '
            + 'uhkasi kuolemantuomio',
          'Kilpaileva väärentäjä kavalsi hänet',
        ],
        oikea: 1,
      },
    },
    /*
     * Delft (Naundorffin hautamuistomerkki).
     * Lähde: en.wikipedia.org: Karl Wilhelm Naundorff
     */
    {
      id: 'naundorff-delftin-valekuningas',
      otsikko: 'Naundorff — kelloseppä joka haudattiin kuninkaana',
      nimio: 'Naundorff',
      vuosi: '1845 (vaateet 1830-luvulta)',
      paikka: 'Delft (Naundorffin hautamuistomerkki)',
      lat: 52.0123, lon: 4.3609,
      kortti: 'Ranskan kuningashuone kiisti miehen eläessä kaiken — mutta Delftissä '
        + 'hänen hautakivensä julistaa yhä: tässä lepää Ludvig XVII, Ranskan '
        + 'kuningas. Kelloseppä hävisi jokaisen oikeusjutun ja voitti '
        + 'hautakirjoituksen. DNA ratkaisi kiistan vasta puolentoista '
        + 'vuosisadan päästä.',
      lahde: 'en-Wikipedia "Karl Wilhelm Naundorff". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Kuka Karl Wilhelm Naundorff väitti olevansa?',
        vaihtoehdot: [
          'Ludvig XVII, Ranskan kadonnut kruununperijä',
          'Napoleonin salainen poika',
          'Alankomaiden laillinen kuningas',
        ],
        oikea: 0,
      },
    },
  ],
  NOR: [
    /*
     * Sogndalsfjøra, Sogndal (Baardsenin lapsuudenkoti, säilytetty museona).
     * Lähde: en.wikipedia.org: Gjest Baardsen
     */
    {
      id: 'gjest-baardsen-mestarivaras',
      otsikko: 'Gjest Baardsen, mestarivaras ja pakotaituri',
      nimio: 'Gjest Baardsen',
      vuosi: '1791–1849',
      paikka: 'Sogndalsfjøra, Sogndal (Baardsenin lapsuudenkoti, säilytetty '
        + 'museona)',
      lat: 61.2288, lon: 7.0965,
      kortti: 'Baardsenin ura sisälsi kaksi taitolajia: lukkojen avaamisen ja oman '
        + 'tarinansa kertomisen. Jälkimmäinen osoittautui tuottoisammaksi — '
        + 'elinkautisvanki kirjoitti sellissään omaelämäkerran, jossa varas on '
        + 'sankari, ja kansa osti tarinan mieluummin kuin viranomaisten '
        + 'version.',
      lahde: 'en-Wikipedia "Gjest Baardsen". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mistä Gjest Baardsen tuli tunnetuksi rikostensa lisäksi?',
        vaihtoehdot: [
          'Vankilapaoistaan ja sellissä kirjoitetusta omaelämäkerrasta',
          'Hän lahjoitti kaiken saaliinsa kirkolle',
          'Hän toimi myöhemmin Oslon poliisimestarina',
        ],
        oikea: 0,
      },
    },
    /*
     * Nasjonalgalleriet, Universitetsgata 13, Oslo.
     * Lähde: en.wikipedia.org: The Scream
     */
    {
      id: 'huudon-varkaus',
      otsikko: 'Huuto katosi olympia-aamuna',
      nimio: 'Huudon varkaus',
      vuosi: '1994',
      paikka: 'Nasjonalgalleriet, Universitetsgata 13, Oslo',
      lat: 59.9163, lon: 10.7373,
      kortti: 'Koko maailman katsoessa Lillehammerille joku katsoi Oslon '
        + 'kansallisgallerian toisen kerroksen ikkunaa. Taidehistorian '
        + 'kuuluisin kirkaisu vietiin tikapuilla, ja varkaiden jättämä '
        + 'kiitoskortti vartioinnista lienee lajissaan tylyimpiä '
        + 'asiakaspalautteita.',
      lahde: 'en-Wikipedia "The Scream". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mitä Huudon varastaneet miehet jättivät jälkeensä vuonna 1994?',
        vaihtoehdot: [
          'Väärennetyn kopion taulun paikalle',
          'Lapun, jossa kiitettiin huonosta vartioinnista',
          'Lunnasvaatimuksen gallerian ovelle',
        ],
        oikea: 1,
      },
    },
    /*
     * Grand Café, Karl Johans gate, Oslo (Kristianian boheemien
     *   kantapaikkoja).
     * Lähde: no.wikipedia.org: Fra Kristiania-Bohêmen
     * Lähde: en.wikipedia.org: Hans Jæger
     */
    {
      id: 'boheemikirjan-takavarikko',
      otsikko: 'Boheemikirjan takavarikko',
      nimio: 'Boheemikirja',
      vuosi: '1885–1886',
      paikka: 'Grand Café, Karl Johans gate, Oslo (Kristianian boheemien '
        + 'kantapaikkoja)',
      lat: 59.9135, lon: 10.741,
      kortti: 'Kirja ehti tuskin kirjakauppaan, kun valtio jo keräsi sen pois. '
        + 'Virallisesti kyse oli säädyllisyydestä; epävirallisesti siitä, että '
        + 'Kristiania oli pieni kaupunki ja romaanin henkilöt tunnistettavia. '
        + 'Mikään ei tee kirjasta kiinnostavampaa kuin takavarikko — sen '
        + 'tiesivät boheemitkin.',
      lahde: 'no-Wikipedia "Fra Kristiania-Bohêmen" ja en-Wikipedia "Hans '
        + 'Jæger". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mitä kirjailija Hans Jægerille tapahtui romaanin Fra '
          + 'Kristiania-Bohêmen ilmestyttyä?',
        vaihtoehdot: [
          'Hän pakeni Pariisiin ja jäi sinne loppuiäkseen',
          'Hän sai valtion kirjailijapalkinnon',
          'Kirja takavarikoitiin ja hän sai sakot ja vankeutta',
        ],
        oikea: 2,
      },
    },
  ],
  POL: [
    /*
     * Wawelin linnan aarrekammio, Krakova.
     * Lähde: en-Wikipedia: Szczerbiec
     */
    {
      id: 'szczerbiec-odysseia',
      otsikko: 'Szczerbiec — kruunajaismiekan 133 vuoden harharetki',
      nimio: 'Szczerbiec',
      vuosi: '1795–1928',
      paikka: 'Wawelin linnan aarrekammio, Krakova',
      lat: 50.0541, lon: 19.9352,
      kortti: 'Kokonainen kuningaskunnan aarrekammio katosi maailmalle, ja jäljelle '
        + 'jäi yksi miekka — sekin myytiin välillä väärällä nimilapulla. '
        + 'Pariisin maailmannäyttelyssä 1878 puolalaiset kävijät tuijottivat '
        + '\'saksalaista miekkaa\' ja kuiskivat, että tuohan näyttää '
        + 'epäilyttävästi omalta kruunajaismiekalta. He olivat oikeassa; '
        + 'paluumatka kesti silti vielä viisikymmentä vuotta.',
      lahde: 'en-Wikipedia "Szczerbiec". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miten kruunajaismiekka Szczerbiec palasi Puolaan vuonna 1928?',
        vaihtoehdot: [
          'Puolalainen keräilijä osti sen huutokaupasta',
          'Neuvosto-Venäjä palautti sen Riian rauhansopimuksen nojalla',
          'Se löytyi muurin sisästä Wawelin remontissa',
        ],
        oikea: 1,
      },
    },
    /*
     * Wrocław–Wałbrzych-radan 'kilometri 65', Wałbrzych.
     * Lähde: en-Wikipedia: Nazi gold train
     */
    {
      id: 'walbrzychin-kultajuna',
      otsikko: 'Wałbrzychin kultajuna — aarre jota ei ollut',
      nimio: 'Kultajuna',
      vuosi: '1945 (legenda), 2015–2016 (kaivaukset)',
      paikka: 'Wrocław–Wałbrzych-radan \'kilometri 65\', Wałbrzych',
      lat: 50.8222, lon: 16.3067,
      kortti: 'Maatutka näytti vuonna 2015 jotain junanmuotoista, ja pian puoli '
        + 'maailmaa tiesi tarkalleen, missä natsien kultajuna makaa. '
        + 'Kaivinkoneet löysivät kunnioitettavan määrän savea. Legenda ei tästä '
        + 'lannistunut — kadonneen aarteen paras piilopaikka on ihmisten '
        + 'mielikuvitus, jonne ei lapio yllä.',
      lahde: 'en-Wikipedia "Nazi gold train". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mitä Wałbrzychin kultajunan kaivauksissa 2016 lopulta löytyi?',
        vaihtoehdot: [
          'Tyhjä tunneli ilman junaa',
          'Muutama kultaharkko mutta ei junaa',
          'Vain luonnollisia maakerroksia',
        ],
        oikea: 2,
      },
    },
    /*
     * Puolan kansalliskirjasto, Varsova (julkaisukaupunki).
     * Lähde: pl-Wikipedia: Kronika Prokosza
     */
    {
      id: 'prokoszin-kronikka',
      otsikko: 'Prokoszin kronikka — keksitty 900-luvun historiateos',
      nimio: 'Prokoszin kronikka',
      vuosi: '1825 (julkaisu ja paljastus 1826)',
      paikka: 'Puolan kansalliskirjasto, Varsova (julkaisukaupunki)',
      lat: 52.214, lon: 21.0035,
      kortti: 'Kirja lupasi kokonaisen rivin muinaisia kuninkaita, joista kukaan '
        + 'muu ei ollut kuullutkaan — mikä olisi pitänyt olla ensimmäinen '
        + 'varoitusmerkki. Historioitsija Lelewel tarvitsi väärennöksen '
        + 'kaatamiseen noin vuoden ja yhden väärään aikaan päivätyn '
        + 'käsikirjoituksen. Opetus on kestänyt paremmin kuin kronikka: mitä '
        + 'mairittelevampi menneisyys, sitä tarkemmin kannattaa katsoa paperin '
        + 'ikää.',
      lahde: 'pl-Wikipedia "Kronika Prokosza". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Kuka paljasti Prokoszin kronikan väärennökseksi?',
        vaihtoehdot: [
          'Krakovan arkkipiispa',
          'Kirjan kustantaja itse',
          'Historioitsija Joachim Lelewel',
        ],
        oikea: 2,
      },
    },
  ],
  PRT: [
    /*
     * Banco de Portugal, Lissabon.
     * Lähde: en-Wikipedia "Alves dos Reis" (tarkistettu 30.8.2026)
     */
    {
      id: 'alves-dos-reis-setelihuijaus',
      otsikko: 'Alves dos Reisin setelihuijaus',
      nimio: 'Alves dos Reis',
      vuosi: '1924–1925',
      paikka: 'Banco de Portugal, Lissabon',
      lat: 38.7085, lon: -9.139,
      kortti: 'Alves dos Reis ei väärentänyt seteleitä — hän väärensi paperit, '
        + 'joilla oikea setelipaino painoi hänelle aitoja. Hetken Portugalissa '
        + 'kiersi kahdet aidot 500 escudon setelit, joista vain toiset oli '
        + 'tilattu. Suunnitelman ainoa vika oli, että sarjanumerotkin olivat '
        + 'aitoja: samat kahteen kertaan.',
      lahde: 'en-Wikipedia "Alves dos Reis". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miksi Alves dos Reisin huijausseteleitä oli lähes mahdoton '
          + 'tunnistaa vääriksi?',
        vaihtoehdot: [
          'Ne oli painettu keskuspankin holvissa',
          'Ne vaihdettiin heti kullaksi',
          'Oikea setelipaino painoi ne aidoilta painolaatoilta',
        ],
        oikea: 2,
      },
    },
    /*
     * Convento da Conceição (Mértolan ikkuna), Beja.
     * Lähde: en-Wikipedia "Letters of a Portuguese Nun" (tarkistettu
     *   30.8.2026)
     */
    {
      id: 'portugalilaisen-nunnan-kirjeet',
      otsikko: 'Portugalilaisen nunnan kirjeet',
      nimio: 'Nunnan kirjeet',
      vuosi: '1669',
      paikka: 'Convento da Conceição (Mértolan ikkuna), Beja',
      lat: 38.0117, lon: -7.865,
      kortti: 'Viisi rakkauskirjettä, epätoivoinen nunna ja komea upseeri — '
        + 'Euroopan lukijat hykertelivät, ja painokset loppuivat kesken. Vasta '
        + 'paljon myöhemmin heräsi kysymys, oliko koko nunnaa olemassakaan. '
        + 'Bejassa näytetään silti yhä ikkunaa, josta häntä ei ehkä koskaan '
        + 'katsottu.',
      lahde: 'en-Wikipedia "Letters of a Portuguese Nun". Tarkistettu '
        + '1.9.2026.',
      visa: {
        kysymys: 'Kuka useimpien tutkijoiden mukaan todella kirjoitti '
          + '\'portugalilaisen nunnan\' kuuluisat rakkauskirjeet?',
        vaihtoehdot: [
          'Nunna Mariana Alcoforado itse',
          'Markiisi de Chamilly',
          'Ranskalainen diplomaatti Guilleragues',
        ],
        oikea: 2,
      },
    },
    /*
     * Sociedade de Geografia de Lisboa, Lissabon.
     * Lähde: en-Wikipedia "1890 British Ultimatum" (tarkistettu 30.8.2026)
     */
    {
      id: 'vaaleanpunainen-kartta-1890',
      otsikko: 'Vaaleanpunainen kartta ja Britannian ultimaatum',
      nimio: 'Ultimaatum 1890',
      vuosi: '1890',
      paikka: 'Sociedade de Geografia de Lisboa, Lissabon',
      lat: 38.716, lon: -9.1414,
      kortti: 'Portugali väritti kartalle vaaleanpunaisen vyöhykkeen Atlantilta '
        + 'Intian valtamerelle — Britannia lähetti vastaukseksi ultimaatumin, '
        + 'ja väri kuivui kokoon päivässä. Lissabonissa nöyryytys muistettiin '
        + 'pitkään, ja lasku lankesi lopulta kuningashuoneelle. Kartta on '
        + 'sentään tallessa.',
      lahde: 'en-Wikipedia "1890 British Ultimatum". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mitä Portugalin \'vaaleanpunainen kartta\' esitti?',
        vaihtoehdot: [
          'Rautatietä Lissabonista Intiaan',
          'Portugalin vaatimaa yhtenäistä siirtomaa-aluetta Angolasta '
            + 'Mosambikiin',
          'Brasilian jakoa Portugalin ja Espanjan kesken',
        ],
        oikea: 1,
      },
    },
  ],
  ROU: [
    /*
     * Gara de Nord, Bukarest.
     * Lähde: ro-Wikipedia: Afacerea Strousberg
     * Lähde: en-Wikipedia: Bethel Henry Strousberg
     */
    {
      id: 'strousbergin-rautatieskandaali',
      otsikko: 'Strousbergin rautatieskandaali',
      nimio: 'Strousberg',
      vuosi: '1868–1872',
      paikka: 'Gara de Nord, Bukarest',
      lat: 44.4463, lon: 26.0745,
      kortti: 'Rautatiekuningas lupasi kiskottaa Romanian Eurooppaan, kunhan '
        + 'sopimuksen sai kirjoittaa itse ja mielellään Berliinissä. Kiskoja '
        + 'tuli hitaammin kuin laskuja, ja laskut olivat sopimuksessa ainoa '
        + 'täsmällisesti toimiva osa. Nuori valtio oppi kalliisti '
        + 'kansainvälisen rahoituksen ensimmäisen säännön: lue paperi ennen '
        + 'kuin juna lähtee.',
      lahde: 'ro-Wikipedia "Afacerea Strousberg" ja en-Wikipedia "Bethel '
        + 'Henry Strousberg". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miten Strousbergin rautatiekonsessio Romaniassa päättyi?',
        vaihtoehdot: [
          'Rata valmistui ajallaan ja voitollisena',
          'Strousberg meni vararikkoon ja Romania mitätöi konsession lailla '
            + '1871',
          'Itävalta osti radan ja liitti sen omaan verkkoonsa',
        ],
        oikea: 1,
      },
    },
    /*
     * Romanian kansallishistorian museo, Bukarest (aarre esillä).
     * Lähde: en-Wikipedia: Pietroasele Treasure
     * Lähde: ro-Wikipedia: Tezaurul de la Pietroasa
     */
    {
      id: 'kultakanan-ryosto-1875',
      otsikko: '\'Kultakana poikasineen\' — Pietroaselen aarteen ryöstö',
      nimio: 'Kultakana',
      vuosi: 'löytö 1837, ryöstö 1875',
      paikka: 'Romanian kansallishistorian museo, Bukarest (aarre esillä)',
      lat: 44.4313, lon: 26.0973,
      kortti: 'Tämä aarre on selvinnyt varkaudesta, sahasta, tulipalosta ja '
        + 'neljänkymmenen vuoden ulkomaanevakosta — museoesineeksi harvinaisen '
        + 'vauhdikas ura. Varas katkoi ainoan riimukirjoitetun kaularenkaan '
        + 'paloiksi, ja muinainen teksti pelastui vain siksi, että joku oli '
        + 'sattunut valokuvaamaan sen Lontoossa. Kopio voi joskus olla aarteen '
        + 'tärkein osa.',
      lahde: 'en-Wikipedia "Pietroasele Treasure" ja ro-Wikipedia "Tezaurul '
        + 'de la Pietroasa". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miksi Pietroaselen aarteen riimukirjoitus voitiin rekonstruoida '
          + 'vuoden 1875 ryöstön jälkeen?',
        vaihtoehdot: [
          'Kaularenkaasta oli otettu valokuvat Lontoossa ennen varkautta',
          'Varas tunnusti ja saneli tekstin muistista',
          'Sama teksti löytyi toisesta aarteesta',
        ],
        oikea: 0,
      },
    },
  ],
  RUS: [
    /*
     * Pietari-Paavalin linnoitus, Pietari.
     * Lähde: en-Wikipedia: Princess Tarakanova
     */
    {
      id: 'prinsessa-tarakanova',
      otsikko: 'Prinsessa Tarakanova — huijariprinsessa ja keisarinnan ansa',
      nimio: 'Tarakanova',
      vuosi: '1774–1775',
      paikka: 'Pietari-Paavalin linnoitus, Pietari',
      lat: 59.95, lon: 30.3164,
      kortti: 'Nainen ilman nimeä pelotti Euroopan mahtavinta keisarinnaa niin, '
        + 'että perään lähetettiin laivasto ja viettelijä. Kuulustelijat eivät '
        + 'koskaan saaneet selville, kuka hän oli — eikä kukaan muukaan ole '
        + 'saanut. Taulussa hän hukkuu selliin tulvassa; todellisuus oli '
        + 'proosallisempi, mutta arvoitus jäi, ja arvoitus elää pidempään kuin '
        + 'tulva.',
      lahde: 'en-Wikipedia "Princess Tarakanova". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miten \'prinsessa Tarakanova\' saatiin kiinni?',
        vaihtoehdot: [
          'Amiraali Orlov vietteli hänet ja houkutteli laivalleen '
            + 'Livornossa',
          'Hänet tunnistettiin Pietarin oopperassa',
          'Oma kamarineiti kavalsi hänet palkkiota vastaan',
        ],
        oikea: 0,
      },
    },
    /*
     * Moskovan Kreml.
     * Lähde: en-Wikipedia: Lost Library of Ivan the Terrible
     */
    {
      id: 'iivanan-kadonnut-kirjasto',
      otsikko: 'Iivana Julman kadonnut kirjasto Kremlin alla',
      nimio: 'Kadonnut kirjasto',
      vuosi: '1500-luku, etsintöjä nykypäivään',
      paikka: 'Moskovan Kreml',
      lat: 55.7517, lon: 37.6178,
      kortti: 'Paras kadonnut aarre on sellainen, jonka olemassaoloa ei voi '
        + 'todistaa eikä kumota — Iivana Julman kirjasto on lajin mestariteos. '
        + 'Viisisataa vuotta etsintöjä, nolla nidettä, ja silti joka sukupolvi '
        + 'joku laskeutuu Kremlin kellareihin lyhty kädessä. Kirjaston '
        + 'sisällysluettelokin on kadonnut, mikä on etsijöiden kannalta '
        + 'suorastaan käytännöllistä.',
      lahde: 'en-Wikipedia "Lost Library of Ivan the Terrible". Tarkistettu '
        + '1.9.2026.',
      visa: {
        kysymys: 'Mistä Iivana Julman kirjaston arvokkaimpien käsikirjoitusten '
          + 'kerrotaan tulleen Moskovaan?',
        vaihtoehdot: [
          'Novgorodin kauppiaiden tuomina',
          'Sotasaaliina Puolasta',
          'Sofia Palaiologinan mukana Konstantinopolista',
        ],
        oikea: 2,
      },
    },
    /*
     * Vagankovon hautausmaa, Moskova (Sonjan legendamuistomerkki).
     * Lähde: en-Wikipedia: Sonya Golden Hand
     * Tarkennettu 105 m: en-Wikipedia "Vagankovo Cemetery" -koordinaatit.
     */
    {
      id: 'sonja-kultakasi',
      otsikko: 'Sonja Kultakäsi — keisarikunnan kuuluisin huijaritar',
      nimio: 'Sonja Kultakäsi',
      vuosi: '1870–1880-luvut',
      paikka: 'Vagankovon hautausmaa, Moskova (Sonjan legendamuistomerkki)',
      lat: 55.7681, lon: 37.5483,
      kortti: 'Sonja Kultakäsi ymmärsi, että paras työkalu ei ole tiirikka vaan '
        + 'hyvin harjoiteltu kohtaus: hänen huijauksissaan oli rooleja, '
        + 'lavastus ja täydellinen ajoitus. Jalokivikauppias sai psykiatrilta '
        + 'diagnoosin, Sonja sai jalokivet. Laki sai hänet lopulta kiinni, '
        + 'mutta legenda karkasi Sahalinilta helpommin kuin hän itse.',
      lahde: 'en-Wikipedia "Sonya Golden Hand". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Millä tempulla Sonja Kultakäsi huijasi moskovalaista '
          + 'jalokivikauppiasta 1883?',
        vaihtoehdot: [
          'Hän vaihtoi korut kopioihin sovituskopissa',
          'Hän esitti psykiatrin vaimoa ja jätti kauppiaan \'potilaaksi\'',
          'Hän nukutti kauppiaan teellä',
        ],
        oikea: 1,
      },
    },
  ],
  SWE: [
    /*
     * Södra Bankohuset, Järntorget, Gamla Stan, Tukholma.
     * Lähde: en.wikipedia.org: Stockholms Banco
     * Lähde: en.wikipedia.org: Johan Palmstruch
     */
    {
      id: 'palmstruchin-setelipankki',
      otsikko: 'Euroopan ensimmäiset setelit — ja ensimmäinen setelipankin romahdus',
      nimio: 'Setelipankki',
      vuosi: '1657–1668',
      paikka: 'Södra Bankohuset, Järntorget, Gamla Stan, Tukholma',
      lat: 59.3225, lon: 18.0739,
      kortti: 'Setelin keksiminen oli nerokasta: paperi painaa vähemmän kuin '
        + 'kahdenkymmenen kilon kuparilevy. Toinen oivallus — että paperia voi '
        + 'painaa enemmän kuin kassassa on katetta — vei keksijän vankilaan ja '
        + 'pankin nurin. Molemmat opetukset ovat pysyneet ajankohtaisina siitä '
        + 'asti.',
      lahde: 'en-Wikipedia "Stockholms Banco" ja en-Wikipedia "Johan '
        + 'Palmstruch". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miksi Stockholms Banco, Euroopan ensimmäinen setelipankki, kaatui?',
        vaihtoehdot: [
          'Seteleitä painettiin enemmän kuin pankilla oli katetta',
          'Setelit väärennettiin heti liian helposti',
          'Kuningas takavarikoi pankin varat sotaan',
        ],
        oikea: 0,
      },
    },
    /*
     * Kuninkaallinen ooppera, Gustav Adolfs torg, Tukholma (murhapaikalla
     *   seisova nykyinen oopperatalo).
     * Lähde: en.wikipedia.org: Gustav III
     */
    {
      id: 'naamiaisten-laukaus',
      otsikko: 'Naamiaisten laukaus',
      nimio: 'Naamiaislaukaus',
      vuosi: '1792',
      paikka: 'Kuninkaallinen ooppera, Gustav Adolfs torg, Tukholma (murhapaikalla '
        + 'seisova nykyinen oopperatalo)',
      lat: 59.3297, lon: 18.0706,
      kortti: 'Naamiaiset ovat salamurhaajan kannalta käytännölliset: kaikilla on '
        + 'naamio, eikä kukaan ihmettele, miksi joku lähestyy kuningasta. '
        + 'Kustaa III oli saanut varoituskirjeenkin, mutta meni tanssiaisiin '
        + 'silti. Jälkimaailma sai aiheesta oopperan; Ruotsi sai '
        + 'perustuslakikriisin.',
      lahde: 'en-Wikipedia "Gustav III". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Missä kuningas Kustaa III ammuttiin vuonna 1792?',
        vaihtoehdot: [
          'Metsästysretkellä Djurgårdenissa',
          'Naamiaisissa Tukholman oopperatalossa',
          'Drottningholmin linnan juhlaillallisella',
        ],
        oikea: 1,
      },
    },
    /*
     * Tändstickspalatset (Tulitikkupalatsi), Västra Trädgårdsgatan 15,
     *   Tukholma.
     * Lähde: en.wikipedia.org: Ivar Kreuger
     */
    {
      id: 'kreugerin-romahdus',
      otsikko: 'Tulitikkukuninkaan romahdus',
      nimio: 'Kreuger',
      vuosi: '1932',
      paikka: 'Tändstickspalatset (Tulitikkupalatsi), Västra Trädgårdsgatan 15, '
        + 'Tukholma',
      lat: 59.3318, lon: 18.0696,
      kortti: 'Kreuger keksi liikeidean, jota valtiovarainministerit rakastivat: '
        + 'hän lainasi valtioille rahaa ja pyysi vastineeksi vain yksinoikeuden '
        + 'tulitikkuihin. Kukaan ei kysynyt liian tarkkaan, mistä lainarahat '
        + 'tulivat — ennen kuin kevät 1932 vastasi kysymykseen kaikkien '
        + 'puolesta.',
      lahde: 'en-Wikipedia "Ivar Kreuger". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mitä Ivar Kreuger pyysi valtioilta vastineeksi lainoistaan?',
        vaihtoehdot: [
          'Kaivosoikeuksia ja rautatieosuuksia',
          'Verovapauden yhtiöilleen',
          'Tulitikkujen myyntimonopolin',
        ],
        oikea: 2,
      },
    },
  ],
  TUR: [
    /*
     * Topkapın palatsin aarrekammio, Istanbul.
     * Lähde: en-Wikipedia "Spoonmaker's Diamond" (tarkistettu 30.8.2026)
     */
    {
      id: 'kasikci-elmasi-legenda',
      otsikko: 'Lusikantekijän timantti',
      nimio: 'Kaşıkçı-timantti',
      vuosi: '1700-luku–',
      paikka: 'Topkapın palatsin aarrekammio, Istanbul',
      lat: 41.0128, lon: 28.984,
      kortti: 'Topkapın kuuluisin timantti on saanut nimensä kaupasta, jossa toinen '
        + 'osapuoli sai 86 karaattia ja toinen kolme puulusikkaa. Näin ainakin '
        + 'kerrotaan — ja juuri se on tämän kiven erikoisuus: kukaan ei tiedä, '
        + 'mistä se tuli. Aarrekammiossa kiiltää 86 karaattia todistetta siitä, '
        + 'että paraskaan tarina ei tarvitse kuittia.',
      lahde: 'en-Wikipedia "Spoonmaker\'s Diamond". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mihin hintaan legendan köyhä löytäjä luopui myöhemmin '
          + 'Lusikantekijän timanttina tunnetusta kivestä?',
        vaihtoehdot: [
          'Kolmeen puulusikkaan',
          'Aasiin ja kärryihin',
          'Säkilliseen riisiä',
        ],
        oikea: 0,
      },
    },
    /*
     * Osmanien valtionvelkahallinnon talo (nyk. Istanbul Erkek Lisesi),
     *   Cağaloğlu, Istanbul.
     * Lähde: en-Wikipedia "Ottoman Public Debt Administration" (tarkistettu
     *   30.8.2026)
     * Korjattu 205 m: en-Wikipedia "Istanbul High School" (OPDA-talo)
     *   -koordinaatit.
     */
    {
      id: 'osmanien-vararikko-1875',
      otsikko: 'Imperiumin vararikko ja velkojien virasto',
      nimio: 'Vararikko 1875',
      vuosi: '1875–1881',
      paikka: 'Osmanien valtionvelkahallinnon talo (nyk. Istanbul Erkek Lisesi), '
        + 'Cağaloğlu, Istanbul',
      lat: 41.0122, lon: 28.9739,
      kortti: 'Kun imperiumi ei enää maksanut velkojaan, velkojat eivät lähettäneet '
        + 'karhukirjettä — he perustivat Istanbuliin oman viraston keräämään '
        + 'imperiumin verot. Velkojien konttorissa oli lopulta enemmän väkeä '
        + 'kuin sulttaanin valtiovarainministeriössä. Suurvallan arvokkuudelle '
        + 'tämä oli kova kolaus, kirjanpidolle kuulemma erinomainen.',
      lahde: 'en-Wikipedia "Ottoman Public Debt Administration". Tarkistettu '
        + '1.9.2026.',
      visa: {
        kysymys: 'Mitä eurooppalaisten velkojien johtama OPDA sai tehdä '
          + 'Osmanivaltiossa vuodesta 1881?',
        vaihtoehdot: [
          'Painaa imperiumin setelit',
          'Nimittää suurvisiirin',
          'Kerätä valtion veroja suoraan velkojen maksuun',
        ],
        oikea: 2,
      },
    },
    /*
     * Uşakin arkeologinen museo, Uşak.
     * Lähde: en-Wikipedia "Karun Treasure" (tarkistettu 30.8.2026)
     */
    {
      id: 'karun-aarre',
      otsikko: 'Karun-aarteen pitkä kotimatka',
      nimio: 'Karun-aarre',
      vuosi: '1966–2006',
      paikka: 'Uşakin arkeologinen museo, Uşak',
      lat: 38.6803, lon: 29.4064,
      kortti: 'Lyydian kulta-aarre ryöstettiin haudasta, salakuljetettiin New '
        + 'Yorkiin, voitettiin oikeudessa kotiin — ja sitten museon oma johtaja '
        + 'vaihtoi sen kuuluisimman soljen väärennökseen. Paikalliset syyttivät '
        + 'haudan vanhaa kirousta, tuomioistuin pelivelkoja. Aarre on nyt '
        + 'esillä Uşakissa, ja sitä vahditaan tarkemmin kuin koskaan.',
      lahde: 'en-Wikipedia "Karun Treasure". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miten New Yorkin Metropolitan-museon ja Turkin kiista '
          + 'Karun-aarteesta päättyi 1993?',
        vaihtoehdot: [
          'Museo osti aarteen Turkilta virallisesti',
          'Museo myönsi tienneensä esineet varastetuiksi ja palautti ne',
          'Aarre jaettiin puoliksi museoiden kesken',
        ],
        oikea: 1,
      },
    },
  ],
  UKR: [
    /*
     * Herson, Potemkinin perustama kaupunki Dneprin varrella.
     * Lähde: en-Wikipedia: Potemkin village
     */
    {
      id: 'potemkinin-kulissikylat',
      otsikko: 'Potemkinin kulissikylät — huijaus, joka olikin liioittelua',
      nimio: 'Kulissikylät',
      vuosi: '1787',
      paikka: 'Herson, Potemkinin perustama kaupunki Dneprin varrella',
      lat: 46.6354, lon: 32.6169,
      kortti: 'Maailman kuuluisin lavastehuijaus on sekin osittain lavaste: '
        + 'kulissikylistä kertoi innokkaimmin diplomaatti, joka ei ollut '
        + 'matkalla mukana. Potemkin toki maalautti ja koristeli minkä ehti, '
        + 'mutta teki sen kaikkien nähden. Sana jäi silti elämään — julkisivuja '
        + 'rakennetaan yhä, ja harvoin näin rehellisesti.',
      lahde: 'en-Wikipedia "Potemkin village". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mitä nykyhistorioitsijat sanovat Potemkinin kulissikylistä?',
        vaihtoehdot: [
          'Siirrettäviä kyliä löydettiin kaivauksissa 1950-luvulla',
          'Tarina on suurelta osin liioittelua — Potemkin somisti kyliä '
            + 'salailematta',
          'Katariina II keksi tarinan itse',
        ],
        oikea: 1,
      },
    },
    /*
     * Odessa, Rouhomovskin verstaan muistolaatta.
     * Lähde: en-Wikipedia: Tiara of Saitaferne
     */
    {
      id: 'saitafernesin-tiaara',
      otsikko: 'Saitafernesin tiaara — odessalainen kultaseppä huijasi Louvrea',
      nimio: 'Tiaarahuijaus',
      vuosi: '1896, tunnustus 1903',
      paikka: 'Odessa, Rouhomovskin verstaan muistolaatta',
      lat: 46.4825, lon: 30.7233,
      kortti: 'Louvren asiantuntijat tunnistivat muinaisen mestariteoksen; he eivät '
        + 'vain arvanneet, että mestari asui Odessassa ja oli tavattavissa. Kun '
        + 'Rouhomovski tuli Pariisiin tunnustamaan, museo ei suostunut uskomaan '
        + 'ennen kuin hän takoi uuden palan tiaaraa siinä paikassa. Harvinainen '
        + 'huijaus, jossa ainoa täysin rehellinen osapuoli oli väärennöksen '
        + 'tekijä.',
      lahde: 'en-Wikipedia "Tiara of Saitaferne". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Miten kultaseppä Rouhomovski todisti Louvrelle tehneensä '
          + '\'muinaisen\' tiaaran?',
        vaihtoehdot: [
          'Hän esitti tilauskuitin kauppiailta',
          'Hänen nimikirjaimensa löytyivät tiaaran sisältä',
          'Hän valmisti palan tiaaraa museon silmien alla',
        ],
        oikea: 2,
      },
    },
    /*
     * Velykyi Burluk, Harkovan alue (väitetty löytöpaikka).
     * Lähde: en-Wikipedia: Book of Veles
     */
    {
      id: 'velesin-kirja',
      otsikko: 'Velesin kirja — \'muinaisslaavilainen\' väärennös puulaudoilla',
      nimio: 'Velesin kirja',
      vuosi: 'väitetty löytö 1919, julkaisu 1957–1959',
      paikka: 'Velykyi Burluk, Harkovan alue (väitetty löytöpaikka)',
      lat: 50.0619, lon: 37.3907,
      kortti: 'Todistusketju on vaikuttava: laudat, jotka vain yksi mies näki, '
        + 'kopiot, jotka vain yksi mies teki, ja alkuperäiset, jotka katosivat '
        + 'sopivasti sodan jalkoihin. Kieli paljasti loput — muinaisteksti oli '
        + 'kirjoitettu kieliopilla, jota ei ole ollut millään vuosisadalla. '
        + 'Väärennös ei silti kuollut faktoihin; hyvä tarina harvoin kuolee.',
      lahde: 'en-Wikipedia "Book of Veles". Tarkistettu 1.9.2026.',
      visa: {
        kysymys: 'Mikä paljastaa tutkijoiden mukaan Velesin kirjan väärennökseksi?',
        vaihtoehdot: [
          'Kieli on sekoitus nykyslaavilaisia kieliä ilman kunnollista '
            + 'kielioppia',
          'Puulautojen hiilikoe ajoitti ne 1900-luvulle',
          'Tekijä tunnusti kuolinvuoteellaan',
        ],
        oikea: 0,
      },
    },
  ],
};
