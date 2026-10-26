// Maailman merkittävät vuoristot ja ylängöt: nimi, paikka ja tarina.
//
// TÄMÄ TIEDOSTO ON KÄSIN KIRJOITETTU. Naapuritiedostot maasto-korkeus.js
// ja maasto-vedet.js ovat koneen tuotosta, tämä ei ole — eikä voi olla.
//
// --- miksi käsin ---
//
// Korkeusvyöhykkeet (js/packs/maasto-korkeus.js) tulevat ETOPO1:n
// korkeusrasterista. Rasteri tietää maanpinnan korkeuden mutta ei sitä,
// mikä vuoristo on mikäkin: vyöhykkeet ovat nimettömiä monikulmioita.
// Joet ja järvet saivat nimensä Natural Earthin aineistosta ilmaiseksi,
// vuoret eivät saa mistään. Siksi nimet on koottu käsin ja sidottu
// paikkaan koordinaatilla.
//
// Tämä on siis luettelo, ei mittausaineisto. Se ei muutu, vaikka lauta
// piirrettäisiin uudelleen: koordinaatit ovat asteita, ja projisoinnin
// tekee kutsuja samalla sovituksella kuin muullekin maastolle
// (tools/tee-maasto.mjs, sovitaMaailma lon0 -175, etelä -58,
// pohjoinen 76).
//
// --- miten koordinaatit on tarkistettu ---
//
// Väärässä paikassa oleva nimi on pahempi kuin puuttuva nimi, joten
// jokainen keskipiste on ajettu kolmen tarkistuksen läpi:
//
//   1. Onko piste mantereella? js/mapart.js:n isOnLand laudan
//      ääriviivoja vasten. Kaikki 52 ovat.
//   2. Osuuko piste korkeusvyöhykkeeseen? Sama piste-monikulmiossa-
//      testi kuin pelillä, KORKEUSVYOHYKKEET-aineistoa vasten
//      (sisäkkäiset renkaat, pariton osumamäärä = sisällä).
//   3. Mikä on lähin tunnettu kaupunki? maailmankartta.js:n cities
//      laudan koordinaateissa — tarkistaa, ettei nimi ole eksynyt
//      naapurimaahan.
//
// Osa nimistä EI osu mihinkään vyöhykkeeseen, ja se on kunnossa:
// aineisto pudottaa kaiken alle 1000 metrin ja kaikki alle 12000 km²:n
// alueet, joten Appalakit, Apenniinit, Karpaatit, Skandit, Kaskadit ja
// muut kapeat tai matalat jonot eivät jätä siihen jälkeä. Nimi kertoo
// silti oikean paikan. Sen sijaan Himalaja, Karakoram ja Tiibetin
// ylätasanko on nimenomaan asetettu vyöhykkeen päälle: nämä ovat kartan
// tummimmat läiskät, ja niiden kohdalla nimen on osuttava siihen mitä
// silmä näkee.
//
// --- kentät ---
//
// avain     vakaa tunniste (laatat, muistiinpanot, testit)
// nimi      suomenkielinen nimi, se joka kartalle kirjoitetaan
// lon, lat  KESKIPISTE asteina — piste, johon nimi kirjoitetaan
// kulma     asteina, 0 = vaakasuora, positiivinen myötäpäivään.
//           Moni vuoristo on pitkä ja kapea (Andit, Ural, Karpaatit),
//           ja nimi kuuluu kirjoittaa sen suuntaisesti. Kulma EI ole
//           arvattu vaan laskettu: jonon akselille otettiin kaksi
//           päätepistettä asteina, ne projisoitiin laudalle ja kulma
//           luettiin niiden välisestä janasta. Siksi luvut ovat
//           jyrkempiä kuin karttapallolla näyttäisi — Miller venyttää
//           pystysuuntaa pohjoiseen mentäessä, ja label seuraa lautaa,
//           ei palloa. Arvo on välillä -90…90, joten teksti ei koskaan
//           käänny ylösalaisin.
// tarkeys   1-3 kuten vesistöillä: 1 näkyy jo kaukaa, 3 vasta lähellä.
// huippu    korkein huippu ja
// korkeus   sen korkeus metreinä. Tarkistettu Wikipedian tietolaatikoista
//           elokuussa 2026; ristiriitaisissa (Emi Koussi, Narodnaja)
//           on valittu yleisimmin siteerattu luku.
// wiki      artikkelin otsikko "Lue lisää" -hakua varten. Suomi ensin,
//           englanti varalla (js/wiki.js). Kaikki on tarkistettu
//           Wikipedian rajapinnasta: 45 löytyy suomeksi suoraan ilman
//           uudelleenohjausta, ja niissä seitsemässä kohdassa, joissa
//           suomenkielistä artikkelia ei ole (Verkhoyansk Range, Alaska
//           Range, kaksi Sierra Madrea, Cape Fold Belt, New Guinea
//           Highlands, Sarawat Mountains), otsikko on englanniksi —
//           peli näyttää sen silloin englanniksi.
// selitys   1-2 lausetta aikuiselle: mikä sen erottaa ja miten se on
//           vaikuttanut matkustamiseen tai historiaan. Ei koulukirjan
//           luetteloa korkeuksista — se on jo omissa kentissään.
//
// --- kaksi huomiota nimivalinnoista ---
//
// Omistajan toivelistalla oli "Suuri arvomuuri". Sellaista vuoristoa ei
// ole, ja lista jatkoi Australian ja Uuden-Seelannin jonoista, joten se
// on tulkittu Suureksi vedenjakajavuoristoksi (Great Dividing Range) —
// Australian itärannikon 3500 kilometrin muuri, joka on juuri se este
// mitä nimi kuvaa. Suomenkielinen Wikipedia tuntee sen otsikolla
// "Australian Kordillieerit".
//
// Toiseksi: Kaakkois-Australian ylängöt (Australian Alpit) ovat osa
// Suurta vedenjakajavuoristoa, joten molempien korkein huippu on sama
// Kosciuszko. Nimet ovat silti erikseen, koska ne ovat kartalla eri
// kohdissa ja tarkoittavat pelaajalle eri asiaa.

export const VUORISTONIMET = [
  // --- Aasia ---
  {
    avain: 'himalaja',
    nimi: 'Himalaja',
    lon: 85.0,
    lat: 28.5,
    kulma: 19,
    tarkeys: 1,
    huippu: 'Mount Everest',
    korkeus: 8849,
    wiki: 'Himalaja',
    selitys: 'Maapallon korkein vuorijono ja Intian niemimaan pohjoinen muuri: '
      + 'se pysäyttää monsuunisateet etelärinteilleen ja jättää Tiibetin taakseen kuivaksi. '
      + 'Solat aukeavat vain kesäksi, joten Intian ja Kiinan välinen liikenne kiersi '
      + 'vuosituhansia joko Silkkitietä pohjoisesta tai meritse etelästä.',
  },
  {
    avain: 'karakoram',
    nimi: 'Karakoram',
    lon: 76.8,
    lat: 35.8,
    kulma: 22,
    tarkeys: 1,
    huippu: 'K2',
    korkeus: 8611,
    wiki: 'Karakorum',
    selitys: 'Maailman jyrkin vuoristo: neljä kahdeksantuhattametristä muutaman '
      + 'kymmenen kilometrin säteellä ja napa-alueiden ulkopuolen pisimmät jäätiköt. '
      + 'Karakoram Highway seuraa Hunzan laaksossa vanhaa Silkkitien haaraa ja on yhä '
      + 'yksi maailman korkeimmalle nousevista maanteistä.',
  },
  {
    avain: 'hindukush',
    nimi: 'Hindukush',
    lon: 70.5,
    lat: 35.4,
    kulma: -24,
    tarkeys: 2,
    huippu: 'Tirich Mir',
    korkeus: 7708,
    wiki: 'Hindukuš',
    selitys: 'Kabulista Keski-Aasiaan johtavien solien vuoristo. Khyberin ja Salangin '
      + 'solat ovat olleet Aleksanteri Suuresta lähtien jokaisen Intiaan pyrkivän '
      + 'armeijan ovi — ja jokaisen sieltä palaavan ainoa tie ulos.',
  },
  {
    avain: 'pamir',
    nimi: 'Pamir',
    lon: 72.8,
    lat: 38.5,
    kulma: 5,
    tarkeys: 2,
    huippu: 'Kongur Tagh',
    korkeus: 7649,
    wiki: 'Pamir',
    selitys: 'Vuorten solmu, jossa Himalaja, Karakoram, Hindukush ja Tienšan kohtaavat; '
      + 'paikallinen nimi tarkoittaa maailman kattoa. Marco Polo kuvasi ylängön niin '
      + 'korkeaksi, ettei tuli palanut siellä kunnolla eikä ruoka kypsynyt.',
  },
  {
    avain: 'tienshan',
    nimi: 'Tienšan',
    lon: 80.0,
    lat: 42.3,
    kulma: -5,
    tarkeys: 2,
    huippu: 'Jengish Chokusu',
    korkeus: 7439,
    wiki: 'Tienšan',
    selitys: '”Taivaan vuoret” erottavat Kiinan Tarimin altaan Keski-Aasian aroista. '
      + 'Silkkitie jakautui niiden juurella pohjoiseen ja eteläiseen haaraan, ja '
      + 'karavaanikaupungit elivät siitä, kummasta päästä kauppias kiersi.',
  },
  {
    avain: 'altai',
    nimi: 'Altai',
    lon: 88.0,
    lat: 49.3,
    kulma: 33,
    tarkeys: 2,
    huippu: 'Beluha',
    korkeus: 4506,
    wiki: 'Altai',
    selitys: 'Neljän maan — Venäjän, Kazakstanin, Mongolian ja Kiinan — kohtauspaikka '
      + 'ja monen tutkijan mielestä turkkilaisten kielten alkukoti. Denisovan luolasta '
      + 'löytyi 2010 jäänteet ihmislajista, jota ei tunnettu ennestään.',
  },
  {
    avain: 'ural',
    nimi: 'Ural',
    lon: 59.5,
    lat: 61.0,
    kulma: -87,
    tarkeys: 1,
    huippu: 'Narodnaja',
    korkeus: 1895,
    wiki: 'Ural (vuoristo)',
    selitys: 'Matala mutta kaksituhatta kilometriä pitkä selkäranka, jota on tavan '
      + 'mukaan pidetty Euroopan ja Aasian rajana. Sen malmit tekivät Jekaterinburgista '
      + 'Venäjän raudan pääkaupungin, ja Siperian rata ylittää sen niin loivasti, '
      + 'ettei matkustaja huomaa siirtyneensä maanosasta toiseen.',
  },
  {
    avain: 'kaukasus',
    nimi: 'Kaukasus',
    lon: 43.3,
    lat: 43.0,
    kulma: 21,
    tarkeys: 1,
    huippu: 'Elbrus',
    korkeus: 5642,
    wiki: 'Kaukasus',
    selitys: 'Mustanmeren ja Kaspianmeren välinen muuri, jonka laaksoissa puhutaan yli '
      + 'neljääkymmentä kieltä — arabialaiset maantieteilijät kutsuivat sitä kielten '
      + 'vuoreksi. Elbrus on Euroopan korkein huippu, jos maanosien raja vedetään harjalle.',
  },
  {
    avain: 'tiibetin-ylatasanko',
    nimi: 'Tiibetin ylätasanko',
    lon: 86.5,
    lat: 32.8,
    kulma: 4,
    tarkeys: 1,
    huippu: 'Gurla Mandhata',
    korkeus: 7694,
    wiki: 'Tiibetin ylänkö',
    selitys: 'Maailman laajin ja korkein ylätasanko, keskikorkeudeltaan yli neljä '
      + 'kilometriä: kokonainen maa Alppien huippujen tasolla. Aasian suuret joet — '
      + 'Indus, Brahmaputra, Mekong, Jangtse ja Keltainen joki — alkavat kaikki täältä, '
      + 'ja niiden varsilla asuu lähes puolet ihmiskunnasta.',
  },
  {
    avain: 'kunlun',
    nimi: 'Kunlun',
    lon: 81.5,
    lat: 36.0,
    kulma: 3,
    tarkeys: 3,
    huippu: 'Liushi Shan',
    korkeus: 7167,
    wiki: 'Kunlun',
    selitys: 'Kolmetuhatta kilometriä pitkä jono, joka rajaa Tiibetin ylätasangon '
      + 'pohjoisesta ja erottaa sen Taklamakanin autiomaasta. Kiinalaisessa '
      + 'mytologiassa se on jumalten asuinsija ja jaden lähde — ja jadea sieltä '
      + 'todella on louhittu kolmetuhatta vuotta.',
  },
  {
    avain: 'zagros',
    nimi: 'Zagros',
    lon: 50.0,
    lat: 32.5,
    kulma: 39,
    tarkeys: 2,
    huippu: 'Dena',
    korkeus: 4409,
    wiki: 'Zagrosvuoret',
    selitys: 'Mesopotamian ja Iranin ylängön välinen poimuvuoristo, jonka laaksoissa '
      + 'vehnä kesytettiin ja vuohi otettiin kotieläimeksi ensimmäisten joukossa. '
      + 'Sen solat ovat säädelleet kauppaa Bagdadin ja Persian välillä kaikkina aikoina.',
  },
  {
    avain: 'elburz',
    nimi: 'Elburz',
    lon: 52.0,
    lat: 36.2,
    kulma: 3,
    tarkeys: 2,
    huippu: 'Damavand',
    korkeus: 5610,
    wiki: 'Elburs',
    selitys: 'Kapea muuri Kaspianmeren etelärannalla: pohjoisrinne on kosteaa metsää, '
      + 'eteläpuoli aavikkoa muutaman kymmenen kilometrin päässä. Damavand on Aasian '
      + 'korkein tulivuori ja persialaisen taruston keskeisin vuori.',
  },
  {
    avain: 'taurusvuoret',
    nimi: 'Taurusvuoret',
    lon: 34.5,
    lat: 37.3,
    kulma: -8,
    tarkeys: 3,
    huippu: 'Demirkazık',
    korkeus: 3756,
    wiki: 'Taurusvuoret',
    selitys: 'Anatolian eteläreunan muuri, jonka Kilikian portit ovat päästäneet läpi '
      + 'hettiläiset, Aleksanterin, ristiretkeläiset ja lopulta Bagdadin rautatien. '
      + 'Vuoret erottavat Välimeren rannikon ylängön ankarasta mannerilmastosta.',
  },
  {
    avain: 'verhojansk',
    nimi: 'Verhojanskin vuoristo',
    lon: 130.0,
    lat: 66.0,
    kulma: -64,
    tarkeys: 3,
    huippu: 'Orulgan',
    korkeus: 2409,
    wiki: 'Verkhoyansk Range',
    selitys: 'Kaari Lenan takana, maailman kylmimmän asutun seudun ympärillä: '
      + 'Verhojanskissa on mitattu lähes -68 °C. Vuoret sulkevat Jakutian altaan '
      + 'pussiksi, josta talven kylmä ilma ei pääse valumaan pois.',
  },
  {
    avain: 'kamtshatka',
    nimi: 'Kamtšatkan tulivuoret',
    lon: 159.3,
    lat: 55.2,
    kulma: -69,
    tarkeys: 3,
    huippu: 'Kljutševskaja sopka',
    korkeus: 4754,
    wiki: 'Kljutševskaja sopka',
    selitys: 'Kolmisenkymmentä toimivaa tulivuorta Tyynenmeren tulirenkaassa; '
      + 'Kljutševskaja sopka on Euraasian korkein niistä. Niemimaalle ei johda '
      + 'maantietä mistään — sinne pääsee vain laivalla tai lentäen.',
  },
  {
    avain: 'lansi-ghatit',
    nimi: 'Länsi-Ghatit',
    lon: 74.8,
    lat: 14.5,
    kulma: 67,
    tarkeys: 3,
    huippu: 'Anamudi',
    korkeus: 2695,
    wiki: 'Länsi-Ghatit',
    selitys: 'Intian länsirannikon jyrkänne, joka pysäyttää lounaismonsuunin ja tekee '
      + 'Keralasta vihreän ja Deccanin ylängöstä kuivan. Palghatin kaltaiset solat '
      + 'ohjasivat pippurin ja kardemumman matkan satamiin — ja roomalaisten kultarahat '
      + 'samaa tietä takaisin.',
  },
  {
    avain: 'japanin-alpit',
    nimi: 'Japanin Alpit',
    lon: 137.9,
    lat: 36.0,
    kulma: 63,
    tarkeys: 3,
    huippu: 'Kita-dake',
    korkeus: 3193,
    wiki: 'Japanin Alpit',
    selitys: 'Honshun keskellä kohoava kolmen jonon ryhmä, jonka brittiläinen '
      + 'vuori-insinööri nimesi Alpeiksi 1880-luvulla. Ne jakavat saaren Tyynenmeren '
      + 'ja Japaninmeren puoleen; jälkimmäinen on maailman lumisimpia asuttuja seutuja.',
  },
  {
    avain: 'annamin-ylanko',
    nimi: 'Annamin ylänkö',
    lon: 106.2,
    lat: 17.3,
    kulma: 61,
    tarkeys: 3,
    huippu: 'Phou Bia',
    korkeus: 2819,
    wiki: 'Annamin ylänkö',
    selitys: 'Laosin ja Vietnamin välinen selkäranka, joka on tuhat vuotta erottanut '
      + 'kiinalaisen ja intialaisen kulttuuripiirin toisistaan. Sen metsien suojassa '
      + 'kulki myös Ho Chi Minhin polku.',
  },
  {
    avain: 'sarawat',
    nimi: 'Sarawat-vuoret',
    lon: 43.0,
    lat: 18.5,
    kulma: 66,
    tarkeys: 3,
    huippu: 'Jabal an-Nabi Shuayb',
    korkeus: 3666,
    wiki: 'Sarawat Mountains',
    selitys: 'Punaisenmeren itärannan jono Mekasta Jemeniin — ainoa osa Arabian '
      + 'niemimaata, jossa sataa säännöllisesti. Terassiviljely näillä rinteillä teki '
      + 'Jemenistä maailman ensimmäisen kahvinviejän; mokka on sen sataman nimi.',
  },

  // --- Eurooppa ---
  {
    avain: 'alpit',
    nimi: 'Alpit',
    lon: 10.5,
    lat: 46.6,
    kulma: -13,
    tarkeys: 1,
    huippu: 'Mont Blanc',
    korkeus: 4808,
    wiki: 'Alpit',
    selitys: 'Euroopan korkein vuoristo ja sen vedenjakaja: Rein, Rhône, Po ja Inn '
      + 'alkavat samoilta rinteiltä. Brennerin ja Gotthardin solat ovat ohjanneet '
      + 'samaa reittiä Rooman legioonat, keskiajan kauppiaat ja nykyiset rekat.',
  },
  {
    avain: 'pyreneet',
    nimi: 'Pyreneet',
    lon: 0.6,
    lat: 42.7,
    kulma: 12,
    tarkeys: 2,
    huippu: 'Aneto',
    korkeus: 3404,
    wiki: 'Pyreneet',
    selitys: 'Kolmensadan kilometrin muuri Espanjan ja Ranskan välillä, jossa on vain '
      + 'kourallinen kunnollisia solia — siksi Iberian niemimaa on aina kehittynyt '
      + 'omillaan. Roncesvallesin solassa Rolandin jälkijoukko tuhoutui 778, ja siitä '
      + 'tarinasta tuli Ranskan kansalliseepos.',
  },
  {
    avain: 'karpaatit',
    nimi: 'Karpaatit',
    lon: 24.0,
    lat: 47.6,
    kulma: 51,
    tarkeys: 2,
    huippu: 'Gerlachovský štít',
    korkeus: 2655,
    wiki: 'Karpaatit',
    selitys: 'Kaari Slovakiasta Romaniaan, joka rajaa Unkarin tasangon ja sulkee '
      + 'Transilvanian sisäänsä. Vuoret jättivät henkiin Euroopan viimeiset laajat '
      + 'aarniometsät ja mantereen suurimmat karhu- ja susikannat.',
  },
  {
    avain: 'skandit',
    nimi: 'Skandit',
    lon: 13.5,
    lat: 65.0,
    kulma: -54,
    tarkeys: 2,
    huippu: 'Galdhøpiggen',
    korkeus: 2469,
    wiki: 'Skandit',
    selitys: 'Norjan ja Ruotsin välinen selkäranka: lännessä se putoaa jyrkästi '
      + 'vuonoihin, idässä laskeutuu loivasti Pohjanlahdelle. Koska maitse ei päässyt, '
      + 'meritiestä tuli ainoa käytännöllinen reitti — ja siitä syntyi viikinkien maailma.',
  },
  {
    avain: 'apenniinit',
    nimi: 'Apenniinit',
    lon: 13.5,
    lat: 42.4,
    kulma: 41,
    tarkeys: 2,
    huippu: 'Corno Grande',
    korkeus: 2912,
    wiki: 'Apenniinit',
    selitys: 'Italian selkäranka saappaan koko pituudelta. Se jakaa niemimaan idän ja '
      + 'lännen puoleen, ja sen kapeat solat ratkaisivat sekä Hannibalin etenemisen '
      + 'että liittoutuneiden hitaan taipaleen pohjoiseen vuonna 1944.',
  },
  {
    avain: 'dinaariset-alpit',
    nimi: 'Dinaariset Alpit',
    lon: 18.0,
    lat: 43.6,
    kulma: 39,
    tarkeys: 3,
    huippu: 'Jezerca',
    korkeus: 2694,
    wiki: 'Dinaariset Alpit',
    selitys: 'Adrianmeren takainen karstivuoristo, jossa vesi katoaa maan alle ja '
      + 'jättää pinnan paljaaksi kiveksi — sana karsti on lainattu juuri täältä. '
      + 'Rannikkomuuri erotti Dalmatian satamat sisämaasta ja teki Venetsiasta niiden '
      + 'luonnollisen kumppanin.',
  },
  {
    avain: 'balkanvuoret',
    nimi: 'Balkanvuoret',
    lon: 24.8,
    lat: 42.8,
    kulma: 7,
    tarkeys: 3,
    huippu: 'Botev',
    korkeus: 2376,
    wiki: 'Balkanvuoret',
    selitys: 'Bulgarian halkaiseva jono, joka antoi koko niemimaalle nimensä — turkin '
      + 'balkan tarkoittaa vuorta. Šipkan solan puolustus 1877 oli Venäjän ja Turkin '
      + 'sodan ratkaisukohta ja on yhä Bulgarian itsenäisyyden symboli.',
  },

  // --- Afrikka ---
  {
    avain: 'atlas',
    nimi: 'Atlas',
    lon: -4.5,
    lat: 32.3,
    kulma: -23,
    tarkeys: 1,
    huippu: 'Toubkal',
    korkeus: 4167,
    wiki: 'Atlasvuoret',
    selitys: 'Saharan ja Välimeren välinen kolmoisjono, joka pysäyttää aavikon ja '
      + 'tekee Marokosta viljelymaan. Berberien karavaanit ylittivät sen solat matkalla '
      + 'Timbuktuun, jossa Saharan suola vaihtui Länsi-Afrikan kultaan.',
  },
  {
    avain: 'etiopian-ylangot',
    nimi: 'Etiopian ylängöt',
    lon: 38.6,
    lat: 9.8,
    kulma: -61,
    tarkeys: 1,
    huippu: 'Ras Dashen',
    korkeus: 4550,
    wiki: 'Etiopian ylänkö',
    selitys: '”Afrikan katto”: mantereen laajin ylänkö, jonka korkeus ja jyrkät '
      + 'rotkot auttoivat Etiopiaa säilyttämään itsenäisyytensä koko siirtomaakauden. '
      + 'Siniseltä Niililtä tulee kaksi kolmasosaa Egyptin vedestä, ja kahvipensas on '
      + 'kotoisin näiltä rinteiltä.',
  },
  {
    avain: 'drakensberg',
    nimi: 'Drakensberg',
    lon: 28.8,
    lat: -29.6,
    kulma: -51,
    tarkeys: 2,
    huippu: 'Thabana Ntlenyana',
    korkeus: 3482,
    wiki: 'Lohikäärmevuoret',
    selitys: 'Etelä-Afrikan sisämaan ylätasangon reuna: tuhannen metrin jyrkänne, '
      + 'joka erottaa rannikon Lesothon ylängöistä. Se hidasti buurien härkävankkureita '
      + 'kuukausilla, ja sen luolissa on Afrikan laajin kokoelma sanien kalliomaalauksia.',
  },
  {
    avain: 'ruwenzori',
    nimi: 'Ruwenzori',
    lon: 29.9,
    lat: 0.38,
    kulma: -82,
    tarkeys: 2,
    huippu: 'Margherita',
    korkeus: 5109,
    wiki: 'Ruwenzori',
    selitys: 'Päiväntasaajan lumivuoret, joita Ptolemaios kutsui Kuun vuoriksi ja piti '
      + 'Niilin lähteenä. Pilvi peittää ne lähes aina, minkä vuoksi eurooppalaiset '
      + 'löysivät ne vasta 1888 — vuosia sen jälkeen kun Niilin lähde oli jo etsitty '
      + 'muualta.',
  },
  {
    avain: 'kilimanjaro',
    nimi: 'Kilimanjaro',
    lon: 37.35,
    lat: -3.07,
    kulma: 0,
    tarkeys: 1,
    huippu: 'Kibo',
    korkeus: 5895,
    wiki: 'Kilimanjaro',
    selitys: 'Afrikan korkein huippu ja maailman korkein yksinäinen vuori: se nousee '
      + 'savannista suoraan lähes kuusi kilometriä. Huipun jäätiköstä on sadassa '
      + 'vuodessa sulanut yli neljä viidesosaa.',
  },
  {
    avain: 'kenia-vuori',
    nimi: 'Kenia-vuori',
    lon: 37.31,
    lat: -0.15,
    kulma: 0,
    tarkeys: 2,
    huippu: 'Batian',
    korkeus: 5199,
    wiki: 'Mount Kenya',
    selitys: 'Sammunut tulivuori päiväntasaajalla, jonka jäätiköt antoivat koko maalle '
      + 'nimen. Kikuju-kansalle se on Kirinyaga, Jumalan istuin, ja perinteiset talot '
      + 'rakennetaan yhä ovi vuorta kohti.',
  },
  {
    avain: 'ahaggar',
    nimi: 'Ahaggar',
    lon: 5.5,
    lat: 23.3,
    kulma: 0,
    tarkeys: 3,
    huippu: 'Tahat',
    korkeus: 2908,
    wiki: 'Ahaggar',
    selitys: 'Saharan sydämessä kohoava vulkaaninen ylänkö, jossa on vettä ja viileitä '
      + 'öitä keskellä autiomaata. Tuaregien karavaanitiet kulkivat sen kautta, ja '
      + 'kalliomaalaukset kertovat ajasta, jolloin täällä laidunsi karjaa.',
  },
  {
    avain: 'tibesti',
    nimi: 'Tibesti',
    lon: 17.8,
    lat: 20.6,
    kulma: 31,
    tarkeys: 3,
    huippu: 'Emi Koussi',
    korkeus: 3415,
    wiki: 'Tibestivuoristo',
    selitys: 'Saharan korkein vuoristo ja sen suurin tulivuoriryhmä. Alue on niin '
      + 'syrjäinen, että se kartoitettiin kunnolla vasta 1900-luvun puolivälissä, ja '
      + 'sen kraatereita on verrattu Marsin vastaaviin.',
  },
  {
    avain: 'kamerunvuori',
    nimi: 'Kamerunvuori',
    lon: 9.17,
    lat: 4.2,
    kulma: 0,
    tarkeys: 3,
    huippu: 'Fako',
    korkeus: 4040,
    wiki: 'Kamerunvuori',
    selitys: 'Länsi-Afrikan korkein vuori ja yhä toimiva tulivuori, jonka rinteillä '
      + 'sataa enemmän kuin melkein missään maailmassa. Karthagolainen Hanno näki sen '
      + 'purkautuvan noin 500 eaa. ja kutsui sitä Jumalten vaunuiksi.',
  },
  {
    avain: 'kapmaan-taittovuoret',
    nimi: 'Kapmaan taittovuoret',
    lon: 20.8,
    lat: -33.4,
    kulma: -6,
    tarkeys: 3,
    huippu: 'Seweweekspoortpiek',
    korkeus: 2325,
    wiki: 'Cape Fold Belt',
    selitys: 'Kapkaupungin takainen vuorimuuri, joka sulki hollantilaiset uudisasukkaat '
      + 'rannikkokaistalle vuosikymmeniksi. Sen suojaisiin laaksoihin syntyi Etelä-Afrikan '
      + 'viinialue, ja rinteillä kasvaa fynbos — maailman pienin mutta lajirikkain '
      + 'kasvikunta.',
  },
  {
    avain: 'madagaskarin-ylanko',
    nimi: 'Madagaskarin ylänkö',
    lon: 46.9,
    lat: -19.5,
    kulma: -70,
    tarkeys: 3,
    huippu: 'Tsiafajavona',
    korkeus: 2643,
    wiki: 'Madagaskar',
    selitys: 'Saaren keskiselkä, jonne merimatkaajien jälkeläiset vetäytyivät ja jonne '
      + 'Antananarivo perustettiin. Ylänkö jakaa saaren idän sademetsään ja lännen '
      + 'kuivaan savanniin; se itse on raivattu lähes kokonaan riisiterasseiksi.',
  },

  // --- Pohjois-Amerikka ---
  {
    avain: 'kalliovuoret',
    nimi: 'Kalliovuoret',
    lon: -109.7,
    lat: 43.4,
    kulma: 61,
    tarkeys: 1,
    huippu: 'Mount Elbert',
    korkeus: 4401,
    wiki: 'Kalliovuoret',
    selitys: 'Pohjois-Amerikan vedenjakaja Alaskasta New Mexicoon: harjalta vedet '
      + 'lähtevät joko Tyynellemerelle tai Meksikonlahdelle. South Pass Wyomingissa oli '
      + 'ainoa kohta, josta härkävankkuri pääsi yli — Oregonin tie kulki siitä, ja '
      + 'siksi lännen asuttaminen kulki juuri tuota linjaa.',
  },
  {
    avain: 'sierra-nevada',
    nimi: 'Sierra Nevada',
    lon: -119.0,
    lat: 37.6,
    kulma: 64,
    tarkeys: 2,
    huippu: 'Mount Whitney',
    korkeus: 4421,
    wiki: 'Sierra Nevada (Yhdysvallat)',
    selitys: 'Yhtenä kappaleena kallistunut graniittilohkare: itärinne on jyrkkä muuri, '
      + 'länsirinne loiva. Sen lumeen jäi Donnerin retkikunta 1846, ja samojen rinteiden '
      + 'puroista löytynyt kulta käynnisti kultaryntäyksen kolme vuotta myöhemmin.',
  },
  {
    avain: 'appalakit',
    nimi: 'Appalakit',
    lon: -80.0,
    lat: 37.2,
    kulma: -36,
    tarkeys: 1,
    huippu: 'Mount Mitchell',
    korkeus: 2037,
    wiki: 'Appalakit',
    selitys: 'Vanha, kulunut vuoristo, joka oli silti riittävä este pitämään '
      + 'brittisiirtokunnat rannikolla lähes vuosisadan. Cumberland Gap oli portti '
      + 'länteen, ja vuorten hiili teki myöhemmin Yhdysvalloista teollisuusmaan.',
  },
  {
    avain: 'sierra-madre-occidental',
    nimi: 'Sierra Madre Occidental',
    lon: -106.5,
    lat: 26.0,
    kulma: 60,
    tarkeys: 2,
    huippu: 'Cerro Gordo',
    korkeus: 3311,
    wiki: 'Sierra Madre Occidental',
    selitys: 'Meksikon länsiselkä, jonka läpi kaivertuvat Copper Canyonin rotkot ovat '
      + 'Grand Canyonia syvemmät. Rautatie sen yli valmistui vasta 1961 — sitä ennen '
      + 'seutu oli käytännössä saavuttamaton, ja siksi tarahumarat säilyttivät kielensä.',
  },
  {
    avain: 'sierra-madre-oriental',
    nimi: 'Sierra Madre Oriental',
    lon: -99.6,
    lat: 23.4,
    kulma: 63,
    tarkeys: 3,
    huippu: 'Cerro San Rafael',
    korkeus: 3721,
    wiki: 'Sierra Madre Oriental',
    selitys: 'Meksikonlahden puoleinen jono, joka nostaa kostean merituulen ja tekee '
      + 'rinteistä sumumetsää keskellä kuivaa maata. Espanjalaisten hopeatie '
      + 'Zacatecasista Veracruziin joutui kiertämään sen harvojen solien kautta.',
  },
  {
    avain: 'alaskan-vuoristo',
    nimi: 'Alaskan vuoristo',
    lon: -151.0,
    lat: 62.9,
    kulma: -12,
    tarkeys: 2,
    huippu: 'Denali',
    korkeus: 6190,
    wiki: 'Alaska Range',
    selitys: 'Kaari, jonka keskellä Denali nousee ympäröivästä tasangosta yli viisi '
      + 'kilometriä — juurelta mitattuna se on maailman korkein vuori. Jono pysäyttää '
      + 'Tyyneltämereltä tulevan kostean ilman ja jättää sisä-Alaskan lähes aavikoksi.',
  },
  {
    avain: 'kaskadit',
    nimi: 'Kaskadit',
    lon: -121.5,
    lat: 45.5,
    kulma: -86,
    tarkeys: 3,
    huippu: 'Mount Rainier',
    korkeus: 4392,
    wiki: 'Kaskadit',
    selitys: 'Tulivuorijono Kaliforniasta Brittiläiseen Kolumbiaan: Mount St. Helens '
      + 'räjähti 1980, ja Rainieria pidetään Yhdysvaltain vaarallisimpana tulivuorena '
      + 'pelkästään siksi, että Seattle on sen alapuolella. Jono jakaa luoteisrannikon '
      + 'sateiseen länteen ja kuivaan itään.',
  },
  {
    avain: 'rannikkovuoret',
    nimi: 'Rannikkovuoret',
    lon: -126.5,
    lat: 53.0,
    kulma: 51,
    tarkeys: 3,
    huippu: 'Mount Waddington',
    korkeus: 4019,
    wiki: 'Rannikkovuoret',
    selitys: 'Brittiläisen Kolumbian rannikon jäätikkövuoret, jotka vuonot pilkkovat '
      + 'saarten ja salmien sokkeloksi. Inside Passage -laivareitti on olemassa siksi, '
      + 'ettei maateitä pystytty rakentamaan.',
  },

  // --- Etelä-Amerikka ---
  {
    avain: 'andit',
    nimi: 'Andit',
    lon: -68.5,
    lat: -21.5,
    kulma: -84,
    tarkeys: 1,
    huippu: 'Aconcagua',
    korkeus: 6961,
    wiki: 'Andit',
    selitys: 'Maailman pisin vuorijono: seitsemäntuhatta kilometriä Karibialta '
      + 'Tulimaahan. Inkojen valtakunta rakennettiin sen harjalle ja sidottiin kokoon '
      + 'kivetyillä poluilla ja köysisilloilla — pyörästä ei näillä rinteillä olisi '
      + 'ollut mitään hyötyä.',
  },
  {
    avain: 'guyanan-ylanko',
    nimi: 'Guyanan ylänkö',
    lon: -62.0,
    lat: 4.5,
    kulma: -24,
    tarkeys: 3,
    huippu: 'Pico da Neblina',
    korkeus: 2995,
    wiki: 'Guyanan ylänkö',
    selitys: 'Miljardeja vuosia vanha hiekkakivilaatta, josta erilliset pöytävuoret '
      + 'nousevat pystysuorina saarina sademetsän yllä. Yhdeltä niistä syöksyy Angelin '
      + 'putous 979 metriä — maailman korkein vesiputous, löydetty lentokoneesta 1933.',
  },
  {
    avain: 'brasilian-ylanko',
    nimi: 'Brasilian ylänkö',
    lon: -46.0,
    lat: -18.0,
    kulma: -35,
    tarkeys: 3,
    huippu: 'Pico da Bandeira',
    korkeus: 2892,
    wiki: 'Brasilian ylänkö',
    selitys: 'Puolet Brasiliasta on tätä loivaa ylänköä, jonka reuna putoaa rannikolle '
      + 'Serra do Marin jyrkänteenä. Muuri piti portugalilaiset vuosisadan rannikolla, '
      + 'ja sen takaa löytyneet kulta ja timantit siirsivät maan painopisteen sisämaahan.',
  },

  // --- Oseania ---
  {
    avain: 'kaakkois-australian-ylangot',
    nimi: 'Kaakkois-Australian ylängöt',
    lon: 148.0,
    lat: -35.8,
    kulma: -57,
    tarkeys: 2,
    huippu: 'Kosciuszko',
    korkeus: 2228,
    wiki: 'Australian Alpit',
    selitys: 'Mantereen ainoa seutu, jossa on joka talvi pysyvä lumipeite — laajempi '
      + 'kuin Sveitsissä. Snowy Mountains -vesivoimahanke käänsi 1950-luvulla kokonaisten '
      + 'jokien suunnan vuoren läpi, jotta sisämaan kuiva puoli saisi vettä.',
  },
  {
    avain: 'suuri-vedenjakajavuoristo',
    nimi: 'Suuri vedenjakajavuoristo',
    lon: 147.5,
    lat: -21.0,
    kulma: 64,
    tarkeys: 2,
    huippu: 'Kosciuszko',
    korkeus: 2228,
    wiki: 'Australian Kordillieerit',
    selitys: 'Australian itärannikkoa myötäilevä 3500 kilometrin jono, joka erottaa '
      + 'kostean rannikkokaistan sisämaan kuivuudesta. Sinisten vuorten ylitys onnistui '
      + 'vasta 1813, ja siihen asti siirtokunta oli vanki omalla rannallaan.',
  },
  {
    avain: 'uuden-seelannin-alpit',
    nimi: 'Uuden-Seelannin Alpit',
    lon: 170.4,
    lat: -43.5,
    kulma: -41,
    tarkeys: 2,
    huippu: 'Aoraki',
    korkeus: 3724,
    wiki: 'Eteläiset Alpit',
    selitys: 'Eteläsaaren selkäranka, jossa laattojen törmäys nostaa maata nopeammin '
      + 'kuin melkein missään. Länsirinteellä sataa kymmenen metriä vuodessa ja itäpuolen '
      + 'Canterburyn tasanko on kuiva — saman vuoriston kaksi puolta.',
  },
  {
    avain: 'uuden-guinean-ylangot',
    nimi: 'Uuden-Guinean ylängöt',
    lon: 140.0,
    lat: -5.0,
    kulma: 15,
    tarkeys: 2,
    huippu: 'Puncak Jaya',
    korkeus: 4884,
    wiki: 'New Guinea Highlands',
    selitys: 'Saaren halki kulkeva jono, jonka rinteillä on jäätiköitä päiväntasaajalla '
      + 'ja laaksoissa satoja eri kieliä. Suuret asutut laaksot löydettiin ulkomaailmalle '
      + 'vasta 1930-luvulla, kun lentokone lensi ensimmäisen kerran vuorten yli.',
  },
];
