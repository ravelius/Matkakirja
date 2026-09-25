/*
 * MAASTOKOHTEET JA KOHTEET — IND (Intia). Erä M3, Aasia, 6.9.2026.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Intialla oli ennen tätä erää vain eläintäky eikä yhtäkään
 * karttamerkkiä kohteista tai maastosta
 * (docs/moduulit/karttanostot-kattavuus.md, Aasian taulukko). Tavoite
 * maata kohti on kahdeksan KOHDETTA ja kolme MAASTOKOHDETTA.
 *
 * MIKSI TÄSSÄ TIEDOSTOSSA EIKÄ fokuskohteet-ind.js:ssä — sama syy kuin
 * K2-erissä 1–4: kohdepakki vaatisi rivin js/fokuskohteet.js:n
 * KOHDE_MAAT-tauluun ja FOKUS_LISANIMET-lohkon (js/packs/fokus-grc.js),
 * jonka lähtöaineisto on ämpärissä eikä repossa.
 *
 * VAIN MAAILMANKARTAN RIVI (Euroopan erillislaudasta luovuttu,
 * Raamattu 30.8.2026). Koordinaatit on laskettu koneella
 * `tools/johda-maastokohteet.mjs`:n vientifunktiolla `laudat(lon, lat)`
 * en-Wikipedian coordinates-propin lon/lat-parista.
 *
 * MAASTOKOHTEET ON VALITTU KÄSIN, koska tools/maastoaineisto/IND.json
 * -tiedostoa ei ole. Valinta on Kangchenjunga, Chilikajärvi ja
 * Bengalinlahti — vuori, järvi ja meri. GANGES JÄTETTIIN POIS
 * TARKOITUKSELLA: kartalla on jo Ganges-niminen jokinimiö
 * (js/packs/maailmankartta-nimet.js), ja sääntö N3 sanoo, että sama
 * nimi esiintyy kartalla vain kerran. Samasta syystä pois jäivät myös
 * Jamuna, Brahmaputra, Godavari, Krishna, Narmada, Indus, Sutlej,
 * Himalaja ja Länsi-Ghatit — kaikki jo nimitaulussa.
 *
 * EI PELIKAUPUNGIN KOHDALLA. Etäisyys mitattiin jokaiseen
 * js/packs/maailmankartta.js CITIES-kaupunkiin (Varanasi, Delhi,
 * Kolkata, Mumbai, Chennai ja muut). Lähin uusi merkki on Khajuraho
 * 57,3 lautayksikön päässä Varanasista; raja KAUPUNGIN_KOHDALLA_SADE
 * on 7 ja kaupunkikaton säde 8. Elephantan luolat pudotettiin juuri
 * tästä säännöstä: ne ovat Mumbai-laatan kohdalla.
 *
 * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
 * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026. Herkkien
 * kohteiden linjaus (docs/aasia-tyoaineisto/spec-asia.md, SITOVA):
 * siirtomaahistoria neutraalina, vuoden 1947 jaon väkivalta vain
 * maininnan tasolla — alla olevissa korteissa siihen ei ole aihetta.
 */
export const MAASTOKOHTEET_IND = [
  /* ─────────────────────────── KOHTEET (8) ─────────────────────── */
  {
    id: 'taj-mahal',
    nimi: 'Taj Mahal',
    tyyppi: 'historia',
    kysymykset: [
      'Kenen haudaksi rakennus tehtiin?',
      'Kuinka monta työntekijää sen rakensi?',
    ],
    korostukset: ['mausoleumi|mausoleumi'],
    nappi: 'Marmorihauta Yamunan rannalla',
    // 78.0419 E / 27.175 N — en-Wikipedia "Taj Mahal"
    laudat: {
      maailmankartta: { x: 8434.7, y: 2283.1 },
    },
    teksti: 'Taj Mahal on norsunluunvalkoisesta marmorista tehty mausoleumi '
      + 'Yamuna-joen oikealla rannalla Agrassa. Mogulikeisari Shah Jahan tilasi '
      + 'sen 1631 puolisonsa Mumtaz Mahalin haudaksi, ja siihen on haudattu myös '
      + 'keisari itse. Mausoleumi valmistui 1648, ja koko 17 hehtaarin '
      + 'kokonaisuus moskeijoineen ja puutarhoineen arvioidaan valmistuneen 1653. '
      + 'Työmaalla oli yli 20 000 työntekijää ja käsityöläistä, ja arkkitehtien '
      + 'ryhmää johti hovin arkkitehti Ustad Ahmad Lahori. Marmorin rinnalla '
      + 'käytettiin puolijalokiviupotuksia ja muissa rakennuksissa punaista '
      + 'hiekkakiveä.',
    lahde: 'en-Wikipedia "Taj Mahal", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'ajanta',
    nimi: 'Ajanta',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä vihara ja chaitya tarkoittavat?',
      'Miten luolat löytyivät uudelleen 1819?',
    ],
    korostukset: ['jatakat|jatakoita'],
    nappi: 'Kolmekymmentä luolaa kalliossa',
    // 75.70028 E / 20.55333 N — en-Wikipedia "Ajanta Caves"
    laudat: {
      maailmankartta: { x: 8356.7, y: 2516.8 },
    },
    teksti: 'Ajantan luolat ovat kolmekymmentä kallioon hakattua buddhalaista '
      + 'luolamonumenttia Maharashtrassa; vanhimmat ovat 200-luvulta eaa. ja '
      + 'nuorimmat noin vuodelta 480. Ne ovat luostareita eli viharoita ja '
      + 'rukoussaleja eli chaityoja, kaiverrettuna 75 metriä korkeaan '
      + 'kallioseinään Waghur-joen U-muotoisessa rotkossa. Maalauksissa on '
      + 'Buddhan aiempia elämiä eli jatakoita, ja luolat 1, 2, 16 ja 17 '
      + 'muodostavat suurimman säilyneen kokonaisuuden vanhaa intialaista '
      + 'seinämaalausta. Luolat olivat metsän peitossa, kunnes eversti John '
      + 'Smith osui niihin 1819 tiikerinmetsästysretkellä.',
    lahde: 'en-Wikipedia "Ajanta Caves", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'ellora',
    nimi: 'Ellora',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mikä Kailasan temppeli on?',
      'Montako uskontoa luolat edustavat?',
    ],
    korostukset: ['monoliittinen|monoliittinen'],
    nappi: 'Temppeli, joka kaiverrettiin ylhäältä alas',
    // 75.1771 E / 20.0268 N — en-Wikipedia "Ellora Caves"
    laudat: {
      maailmankartta: { x: 8339.2, y: 2535.1 },
    },
    teksti: 'Elloran luolat ovat yksi maailman suurimmista kallioluolakomplekseista '
      + 'Aurangabadin lähellä, ja taide on peräisin vuosilta 600–1000. Luolia on '
      + 'yli sata basalttikallioissa, ja niistä 34 on avoinna: 17 hindulaista, 12 '
      + 'buddhalaista ja 5 jainalaista — kolme uskontoa vierekkäin. Luola 16 eli '
      + 'Kailasan temppeli on maailman suurin yhdestä kalliosta louhittu '
      + 'monoliittinen rakennus, vaunun muotoinen ja omistettu Shivalle. '
      + 'Monumentit rakennettiin Rashtrakuta-dynastian (753–982) ja jainaluolien '
      + 'osalta Yadava-dynastian aikana, ja paikka oli myös kauppapaikka '
      + 'vanhalla Etelä-Aasian kauppareitillä.',
    lahde: 'en-Wikipedia "Ellora Caves", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'khajuraho',
    nimi: 'Khajuraho',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuinka moni temppeli on säilynyt?',
      'Kuka löysi temppelit 1838?',
    ],
    korostukset: ['nagara|nagara'],
    nappi: 'Chandela-dynastian temppelikenttä',
    // 79.921427 E / 24.854422 N — en-Wikipedia "Khajuraho Group of Monuments"
    laudat: {
      maailmankartta: { x: 8497.4, y: 2365.9 },
    },
    teksti: 'Khajuraho on hindulaisten ja digambara-jainalaisten temppelien ryhmä '
      + 'Madhya Pradeshissa. Suurin osa rakennettiin Chandela-dynastian aikana '
      + 'vuosina 885–1000, ja 1100-luvulla temppeleitä oli 85 kahdenkymmenen '
      + 'neliökilometrin alueella; niistä on säilynyt noin 25 kuuden '
      + 'neliökilometrin alalla. Temppelit ovat kuuluisia nagara-tyylin '
      + 'arkkitehtuurista ja muutamista eroottisista veistoksista, ja niistä '
      + 'runsain on Kandariya Mahadevan temppeli. Alue kasvoi umpeen ja unohtui, '
      + 'kunnes brittiläinen insinööri, kapteeni T. S. Burt löysi sen 1838 ja '
      + 'raportoi Bengalin aasialaisen seuran lehdessä.',
    lahde: 'en-Wikipedia "Khajuraho Group of Monuments", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'hampi',
    nimi: 'Hampi',
    tyyppi: 'historia',
    kysymykset: [
      'Minkä valtakunnan pääkaupunki Hampi oli?',
      'Mitä kaupungille tapahtui 1565?',
    ],
    korostukset: ['Vijayanagaran|Vijayanagaran'],
    nappi: 'Maailman toiseksi suurin kaupunki 1500',
    // 76.46222 E / 15.33444 N — en-Wikipedia "Hampi"
    laudat: {
      maailmankartta: { x: 8382.1, y: 2696.4 },
    },
    teksti: 'Hampi oli Vijayanagaran valtakunnan pääkaupunki 1336–1565 '
      + 'Tungabhadra-joen varrella nykyisessä Karnatakassa. Persialaiset ja '
      + 'eurooppalaiset matkakertomukset kuvaavat sitä vauraana ja suurena '
      + 'kaupunkina, jossa oli lukemattomia temppeleitä ja kauppapaikkoja; '
      + 'vuoteen 1500 mennessä se oli arvioiden mukaan maailman toiseksi suurin '
      + 'kaupunki Pekingin jälkeen. Vuonna 1565 sulttaanikuntien liittouma valtasi '
      + 'ja hävitti kaupungin, ja se jäi raunioiksi. Rauniot levittäytyvät '
      + '4 100 hehtaarille, ja Unesco laskee niissä yli 1 600 säilynyttä jäännöstä '
      + 'linnoituksista ja temppeleistä pylvässaleihin ja vesirakenteisiin.',
    lahde: 'en-Wikipedia "Hampi", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'konark',
    nimi: 'Konarkin aurinkotemppeli',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Minkä muotoiseksi temppeli rakennettiin?',
      'Miksi eurooppalaiset merenkulkijat kutsuivat sitä Mustaksi pagodiksi?',
    ],
    korostukset: ['Surya|Surya-jumalalle'],
    nappi: 'Kivestä tehdyt vaununpyörät',
    // 86.09472 E / 19.8875 N — en-Wikipedia "Konark Sun Temple"
    laudat: {
      maailmankartta: { x: 8703.2, y: 2539.9 },
    },
    teksti: 'Konarkin aurinkotemppeli on 1200-luvun hindutemppeli Odishan '
      + 'rannikolla, ja se on omistettu Surya-jumalalle eli auringolle. Temppelin '
      + 'rakennutti itäisen Ganga-dynastian kuningas Narasingha Deva I noin 1250, '
      + 'ja säilynyt osa muistuttaa 30 metriä korkeaa vaunua valtavine pyörineen '
      + 'ja hevosineen — kaikki kivestä. Alun perin rakennus oli yli 61 metriä '
      + 'korkea, mutta pyhäkön päällä ollut torni on romahtanut, eikä sen tuhon '
      + 'syystä ole yksimielisyyttä. Eurooppalaiset merenkulkijat kutsuivat sitä '
      + 'jo 1676 Mustaksi pagodiksi, koska se näytti kaukaa tummalta '
      + 'porrastornilta; Purin Jagannath oli vastaavasti Valkoinen pagodi, ja '
      + 'molemmat olivat Bengalinlahden merimerkkejä.',
    lahde: 'en-Wikipedia "Konark Sun Temple", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'jantar-mantar',
    nimi: 'Jantar Mantar',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mitä sana jantar mantar tarkoittaa?',
      'Miksi Jai Singh rakennutti kojeet?',
    ],
    korostukset: ['aurinkokello|aurinkokello'],
    nappi: 'Kivestä muurattu observatorio',
    // 75.82444 E / 26.92472 N — en-Wikipedia "Jantar Mantar, Jaipur"
    laudat: {
      maailmankartta: { x: 8360.8, y: 2292.1 },
    },
    teksti: 'Jaipurin Jantar Mantar on yhdeksäntoista tähtitieteellisen kojeen '
      + 'kokoelma, jonka rakennutti rajputkuningas Sawai Jai Singh ja joka '
      + 'valmistui 1734. Siihen kuuluu maailman suurin kivinen aurinkokello, ja '
      + 'kojeilla voi havaita taivaankappaleiden asemat paljain silmin. Nimi tulee '
      + 'sanskritin sanoista yantra eli koje ja mantrana eli laskea — siis '
      + 'laskukoje. Jai Singh rakennutti ne, koska huomasi, etteivät zij-taulukot '
      + 'vastanneet havaittuja asemia, ja hän pystytti kaikkiaan viisi '
      + 'observatoriota eri kaupunkeihin. Unesco pitää Jaipurin kokonaisuutta '
      + 'Intian merkittävimpänä ja parhaiten säilyneenä historiallisena '
      + 'observatoriona.',
    lahde: 'en-Wikipedia "Jantar Mantar, Jaipur", johdanto sekä osiot "Name" ja '
      + '"Purpose" (tarkistettu 6.9.2026).',
  },
  {
    id: 'darjeelingin-vuoristorata',
    nimi: 'Darjeelingin vuoristorata',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miten rata nousee vuorelle ilman hammastankoa?',
      'Kuinka kapea raideleveys on?',
    ],
    korostukset: ['sik-sak|sik-sakkia'],
    nappi: 'Kaksi jalkaa leveä rata Himalajalle',
    // 88.44389 E / 26.68389 N — en-Wikipedia "Darjeeling Himalayan Railway"
    laudat: {
      maailmankartta: { x: 8781.5, y: 2300.7 },
    },
    teksti: 'Darjeelingin vuoristorata on 610 millimetrin raideleveydellä kulkeva '
      + 'rautatie New Jalpaigurin ja Darjeelingin välillä Länsi-Bengalissa. Se '
      + 'rakennettiin 1879–1881, on noin 88 kilometriä pitkä ja nousee sadasta '
      + 'metristä 2 200 metriin käyttäen kuutta sik-sakkia ja kolmea silmukkaa — '
      + 'ei siis hammastankoa vaan pelkkää kitkaa ja nokkelaa linjausta. Ghumin '
      + 'asema 2 260 metrissä on Intian korkein rautatieasema. Ehdotuksen teki '
      + 'Itä-Bengalin rautatien asiamies Franklin Prestage, ja Bengalin '
      + 'varakuvernööri Ashley Eden asetti sitä arvioimaan komitean; Unesco '
      + 'hyväksyi radan maailmanperintökohteeksi 5. joulukuuta 1999.',
    lahde: 'en-Wikipedia "Darjeeling Himalayan Railway", johdanto ja osio '
      + '"History" (tarkistettu 6.9.2026).',
  },
  /* ────────────────────── MAASTOKOHTEET (3) ────────────────────── */
  {
    id: 'kangchenjunga',
    nimi: 'Kangchenjunga',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuorta pidettiin maailman korkeimpana vuoteen 1852?',
      'Miksi ensinousijat pysähtyivät juuri ennen huippua?',
    ],
    korostukset: ['trigonometrinen mittaus|trigonometrisen mittauksen'],
    nappi: 'Lumen viisi aarretta',
    // 88.14667 E / 27.7025 N — en-Wikipedia "Kangchenjunga"
    laudat: {
      maailmankartta: { x: 8771.6, y: 2264.2 },
    },
    teksti: 'Kangchenjunga on maailman kolmanneksi korkein vuori, 8 586 metriä, '
      + 'Nepalin Koshin maakunnan ja Intian Sikkimin rajaseudulla. Vuoteen 1852 '
      + 'sitä pidettiin maailman korkeimpana, kunnes Intian Suuren '
      + 'trigonometrisen mittauksen laskelmat 1849 osoittivat Mount Everestin '
      + 'korkeammaksi; asia julistettiin virallisesti 1856. Nimen selittivät '
      + 'veljekset Hermann, Adolf ja Robert Schlagintweit tiibetin sanoista '
      + '"korkean lumen viisi aarretta". Joe Brown ja George Band nousivat '
      + 'ensimmäisinä 25. toukokuuta 1955, mutta pysähtyivät juuri ennen huippua '
      + 'pitääkseen lupauksensa Sikkimin hallitsijalle Tashi Namgyalille siitä, '
      + 'että laki jää koskemattomaksi.',
    lahde: 'en-Wikipedia "Kangchenjunga", johdanto ja osio "Etymology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'chilikajarvi',
    nimi: 'Chilikajärvi',
    tyyppi: 'jarvi',
    kysymykset: [
      'Miksi järven suolaisuus vaihtelee?',
      'Mikä Ramsar-kohde on?',
    ],
    korostukset: ['laguuni|laguuni'],
    nappi: 'Aasian suurin murtovesilaguuni',
    // 85.31667 E / 19.71667 N — en-Wikipedia "Chilika Lake"
    laudat: {
      maailmankartta: { x: 8677.2, y: 2545.8 },
    },
    teksti: 'Chilikajärvi on Intian niemimaan itärannikon suurin murtovesilaguuni '
      + 'ja maailman toiseksi suurin rannikkolaguuni; pinta-ala vaihtelee kesän '
      + 'noin 900 neliökilometristä monsuunin aikaiseen laajuuteen. Se levittäytyy '
      + 'Odishan Purin, Khordhan ja Ganjamin piirikuntiin Daya-joen suulle. '
      + 'Suolaisuus vaihtelee alueittain makeasta vedestä meriveden tasolle sen '
      + 'mukaan, virtaako paikalle jokivettä vai vuorovettä. Chilika oli 1981 '
      + 'toinen Intian kahdesta ensimmäisestä Ramsar-kosteikosta, ja siellä elää '
      + 'yli 225 lintulajia sekä uhanalainen irrawaddyndelfiini; noin 200 000 '
      + 'kalastajaa yli 130 kylästä saa siitä elantonsa.',
    lahde: 'en-Wikipedia "Chilika Lake", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'bengalinlahti',
    nimi: 'Bengalinlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Mitkä suuret joet laskevat lahteen?',
      'Missä kulkee lahden eteläraja?',
    ],
    korostukset: ['Sundarbans|Sundarbans'],
    nappi: 'Intian valtameren koillisnurkka',
    // 88 E / 15 N — en-Wikipedia "Bay of Bengal"
    laudat: {
      maailmankartta: { x: 8766.7, y: 2707.8 },
    },
    teksti: 'Bengalinlahti on Intian valtameren koillisosa Intian niemimaan ja '
      + 'Indokiinan välissä, ja se kattaa 2,6 miljoonaa neliökilometriä. Lännessä '
      + 'ja luoteessa on Intia, pohjoisessa Bangladesh, koillisessa Myanmar ja '
      + 'idässä Andamaanit ja Nikobaarit. Eteläraja kulkee Sri Lankan '
      + 'Sangaman Kandan ja Sumatran luoteisimman kärjen välillä. Lahteen laskevat '
      + 'muun muassa Ganges, Brahmaputra, Iravadi, Godavari, Krishna, Mahanadi ja '
      + 'Kaveri. Rannoilla on maailman pisimpiä hiekkarantoja, kuten Cox\'s Bazar, '
      + 'ja Sundarbans, maailman laajin mangrovemetsä.',
    lahde: 'en-Wikipedia "Bay of Bengal", johdanto ja osio "Extent" '
      + '(tarkistettu 6.9.2026).',
  },
];
