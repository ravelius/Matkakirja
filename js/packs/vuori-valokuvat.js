// Vuorikohteiden kuvakarusellit: käsin kuratoidut valokuvat kartan
// maastonimien "Lue lisää" -ikkunaan.
//
// Omistajan tilaus 10.8.2026 (kuvakaappaus Kaukasus-popupista):
// "Vuorilta on varmasti hienoja kuvia. Niitä voisi lisätä jopa
// kymmenen. Tällaisiin kohteisiin, samanlaisiin karuselliin, voi käydä
// kaikki vuorikohteet läpi samalla tavalla ja lisätä laadukkaita
// kuvia."
//
// --- miksi käsin ja miksi tässä ---
//
// Maastonimen i-nappi avaa saman ikkunan kuin kaupungit, ja se osaa
// näyttää artikkelin kuvat karusellina ilmaiseksi. Wikipedian
// artikkelin kuvasto ei kuitenkaan kelpaa vuorille: Karpaattien
// artikkelissa on kaksi karttaa ja geologinen leikkaus, Uralilla
// rajapyykki. Kartan tummin läiskä ansaitsee parempaa, joten kuvat on
// valittu käsin.
//
// Avain on maastonimen `avain` (js/packs/maasto-nimet-vuoret.js), EI
// Wikipedia-otsikko. Otsikot törmäävät: Madagaskarin ylängön artikkeli
// on "Madagaskar", ja sama otsikko on Afrikan laudan saarikohteella —
// otsikkoavain olisi antanut kaupungille vuoristogallerian.
//
// --- mistä kuvat ovat ja mitä niistä on tarkistettu ---
//
// Kaikki Wikimedia Commonsista, vain PD- ja CC-lisenssit ilman ND- ja
// NC-ehtoa. Ehdokkaat on koottu Commonsin KATEGORIASTA, joka on sidottu
// vuoristoon Wikidatan kautta (tools/hae-vuorikuvat.mjs) — ei
// nimihaulla, koska hakutuloksen otsikko ei kerro, mikä vuori kuvassa
// on.
//
// JOKAINEN KUVA ON KATSOTTU SILMÄLLÄ ennen hyväksyntää
// (tools/tee-kuvataulu.py latoo ehdokkaat 480 pikselin ruuduiksi).
// Automaattinen seula ei näe väärää vuorta, vesileimaa eikä pehmeää
// tarkennusta; niistä kaikista on tässä työssä hylätty ehdokkaita.
//
// --- kentät ---
//
// tiedosto  Commonsin tiedostonimi ilman "File:"-etuliitettä. Yhdellä
//           rivillä (julkaisusääntö), vaikka nimi olisi pitkä.
// selite    suomenkielinen kuvateksti: mitä kuvassa näkyy ja mistä.
//           Kirjoitettu Commonsin kuvauksen POHJALTA, ei käännetty
//           sellaisenaan.
// lahde     tekijä ja lisenssi pelin vakiomuodossa
//           "Tekijä, Wikimedia Commons (CC BY-SA 4.0)". Tekijä on
//           Commonsin Artist-kentästä, ei muistista — väärä
//           tekijämerkintä on lisenssirikkomus siinä missä puuttuvakin.
//
// Enintään kymmenen kuvaa kohteessa (omistajan katto). Vähempi on
// parempi kuin heikko täytekuva: kuudesta upeasta jää parempi
// muistijälki kuin kymmenestä keskinkertaisesta.

export const VUORIKUVAT = {
  'uuden-guinean-ylangot': [
    {
      tiedosto: '53 Magical Afternoon over Central Mountain Range Papua-Indonesia.jpg',
      selite: 'Iltapäivän valo Keskivuoriston harjanteilla Papualla. Jono '
        + 'kulkee saaren halki idästä länteen, ja sen korkein huippu Puncak '
        + 'Jaya (4 884 m) on koko Oseanian korkein.',
      lahde: 'WidodoMargotomo, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Papua New Guinea (5986599443).jpg',
      selite: 'Ylängön metsäisiä selänteitä Papua-Uudessa-Guineassa. '
        + 'Laaksot olivat toisistaan erillään niin kauan, että saarella '
        + 'puhutaan yli 800 kieltä — enemmän kuin missään muualla.',
      lahde: 'eGuide Travel, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Kainantu (5987220226).jpg',
      selite: 'Kainantun kaupunki ylängön laaksossa. Ulkomaailma sai tietää '
        + 'näistä tiheään asutuista laaksoista vasta 1930-luvulla, kun '
        + 'kullanetsijät lensivät niiden yli.',
      lahde: 'eGuide Travel, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: '21 Cyathea Papua Rain Forest Papua-Indonesia.jpg',
      selite: 'Puusaniaisia (Cyathea) ylängön sademetsässä. Ne kasvavat '
        + 'puun korkuisiksi ja ovat sukua saniaisille, jotka hallitsivat '
        + 'maapallon metsiä ennen kukkakasveja.',
      lahde: 'WidodoMargotomo, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'PNG Highlands (5986725581) (2).jpg',
      selite: 'Aamusumu ylängön niityllä. Ylänkö on 1 500–2 500 metrissä, '
        + 'joten ilma on viileää vaikka päiväntasaaja on lähellä.',
      lahde: 'eGuide Travel, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Papua New Guinea (5987153434).jpg',
      selite: 'Puutarhoja raivattuna rinteeseen. Ylängöllä on viljelty '
        + 'bataattia ja taroa tuhansia vuosia — se on maailman '
        + 'varhaisimpia maanviljelyn syntypaikkoja.',
      lahde: 'eGuide Travel, Wikimedia Commons (CC BY 2.0)',
    },
  ],

  'sierra-madre-occidental': [
    {
      tiedosto: 'Río Urique - panoramio.jpg',
      selite: 'Uriquejoen rotko Kuparikanjonissa. Kanjonijono on syvempi ja '
        + 'laajempi kuin Grand Canyon — kuusi jokea on leikannut Sierra '
        + 'Madre Occidentalin laavatasangon halki.',
      lahde: 'panza.rayada, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Copper Canyon Charlie on Travel 12.jpg',
      selite: 'Kuparikanjonin porrastetut seinät. Nimi tulee kanjonin '
        + 'seinämien vihertävästä sävystä, ei kuparista.',
      lahde: 'Charlie Marchant, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Barrancas del Cobre, Sierra Tarahumara, Chihuahua (23970874809).jpg',
      selite: 'Köysirata ylittää Barrancas del Cobren Sierra Tarahumarassa. '
        + 'Alue on rarámurien eli tarahumarien kotiseutua — kansan, joka on '
        + 'tunnettu satojen kilometrien juoksuistaan.',
      lahde: 'Comisión Mexicana de Filmaciones, Wikimedia Commons (CC BY-SA 2.0)',
    },
    {
      tiedosto: 'Cerro El Divisadero - panoramio.jpg',
      selite: 'Cerro El Divisadero kohoaa kanjonin reunalta. Ylätasanko on '
        + 'mäntymetsää, mutta muutaman sadan metrin päässä alaspäin alkaa '
        + 'trooppinen kasvillisuus.',
      lahde: 'panza.rayada, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Río Chínipas - panoramio (1).jpg',
      selite: 'Chínipasjoki mutkittelee vuorten välissä. Joet ovat '
        + 'kaivertaneet vuoristoon uomansa niin syvälle, että pohjalla on '
        + 'oma ilmastonsa.',
      lahde: 'panza.rayada, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Estribaciones sierra Madre Occidental - panoramio.jpg',
      selite: 'Sierra Madre Occidentalin uloimmat harjanteet. Vuoristo '
        + 'kulkee 1 500 kilometriä Meksikon länsirannikkoa pitkin ja on '
        + 'lähes kokonaan vanhaa tulivuoriainesta.',
      lahde: 'panza.rayada, Wikimedia Commons (CC BY-SA 3.0)',
    },
  ],

  'sierra-madre-oriental': [
    {
      tiedosto: 'CerroDeLaSilla201806p1.jpg',
      selite: 'Cerro de la Silla eli Satulavuori Nuevo Leónissa. Kaksi '
        + 'huippua ja niiden välinen notko antoivat vuorelle nimen, ja se on '
        + 'Monterreyn tunnus.',
      lahde: 'Carlos Valenzuela, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'View of Monterrey (2015).jpg',
      selite: 'Monterrey Satulavuoren juurella. Kaupunki on kasvanut '
        + 'laaksoon, jonka Sierra Madre Oriental sulkee kolmelta suunnalta.',
      lahde: 'Rick González, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Panorámica desde la Carretera a Rayones - panoramio.jpg',
      selite: 'Kalkkikivijyrkänteitä Rayonesin tieltä. Sierra Madre Oriental '
        + 'on poimuvuoristo, jonka kerrokset ovat taipuneet aaltoina — '
        + 'toisin kuin lännen tulivuoriylänkö.',
      lahde: 'panza-rayada, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Invierno-Primavera - panoramio.jpg',
      selite: 'Talvi ja kevät samassa kuvassa: varjorinne on yhä ruskea, '
        + 'aurinkoinen puoli jo vihreä.',
      lahde: 'panza-rayada, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Palmas - panoramio.jpg',
      selite: 'Kalkkikivitornit nousevat metsän yläpuolelle. Vuoristo '
        + 'pysäyttää Meksikonlahden kostean ilman, ja itärinteillä kasvaa '
        + 'sumumetsää.',
      lahde: 'panza-rayada, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Monterrey, panorámica del Cerro de la Silla (2014).jpg',
      selite: 'Panoraama Satulavuorelta yli Monterreyn. Kaupunki ulottuu '
        + 'laakson reunasta reunaan, ja takana jono jatkuu etelään.',
      lahde: 'Enrique Vera, Wikimedia Commons (CC BY 2.0)',
    },
  ],

  sarawat: [
    {
      tiedosto: 'Sarawat Mountains, Baha Region, Saudi Arabia (6) - 50919499217.jpg',
      selite: 'Vuoristotie siltoineen Sarawat-vuorten jyrkänteellä Al Bahan '
        + 'seudulla. Vuoristo laskee lännessä Punaisenmeren rannikkotasangolle '
        + 'lähes pystysuorana portaana.',
      lahde: 'Prof. Mortel, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Sarawat Mountains, Baha Region, Saudi Arabia (12) - 50919360401.jpg',
      selite: 'Vanhoja kivisiä vartiotorneja harjanteen laella. Sarawatin '
        + 'kylät rakensivat torneja vartioimaan viljelysterasseja ja '
        + 'karavaanireittiä.',
      lahde: 'Prof. Mortel, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Sarawat Mountains, Baha Region, Saudi Arabia (7) - 50919365371.jpg',
      selite: 'Vihreä rinne Sarawat-vuorilla. Vuoristo saa Arabian '
        + 'niemimaan runsaimmat sateet, ja siksi sen rinteillä on viljelty '
        + 'terasseilla tuhansia vuosia.',
      lahde: 'Prof. Mortel, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Sarawat Mountains, Baha Region, Saudi Arabia (8) - 50919363996.jpg',
      selite: 'Jyrkänteen reuna ja pilvet sen yllä. Sarawat kulkee Punaisen '
        + 'meren suuntaisesti Jordaniasta Jemeniin.',
      lahde: 'Prof. Mortel, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Sarawat Mountains, Baha Region, Saudi Arabia (13) - 50918670338.jpg',
      selite: 'Autioitunut kivitalo rinteessä. Vanhat kylät on rakennettu '
        + 'paikallisesta liuskekivestä ilman laastia.',
      lahde: 'Prof. Mortel, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Sarawat Mountains, Baha Region, Saudi Arabia (23).jpg',
      selite: 'Sumu valuu rinteen yli tammikuussa. Kosteus tulee Punaiselta '
        + 'mereltä ja tiivistyy heti, kun ilma nousee vuoren rinnettä.',
      lahde: 'Prof. Mortel, Wikimedia Commons (CC BY 2.0)',
    },
  ],

  'annamin-ylanko': [
    {
      tiedosto: 'Annamite range pu mat 2007 05.jpg',
      selite: 'Kylä ja metsäiset harjanteet Pu Matin kansallispuistossa '
        + 'Vietnamissa. Annamin ylängön metsistä on löytynyt 1990-luvulta '
        + 'lähtien uusia suuria nisäkäslajeja — saola tunnistettiin vasta '
        + '1992.',
      lahde: 'Rolf Müller, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Phou Bia seen from Xaysomboun.jpg',
      selite: 'Phou Bia, Laosin korkein huippu, Xaysomboun\'n suunnalta. '
        + 'Vuori on 2 819 metriä ja sen ylärinteet ovat pitkään olleet '
        + 'suljettuja ulkopuolisilta.',
      lahde: 'Boroli, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'PhouBia from Nam Ngum Lake.jpg',
      selite: 'Phou Bia siintää Nam Ngumin tekojärven takana. Järvi '
        + 'padottiin 1971, ja sen alle jäi kokonainen laakso kylineen.',
      lahde: 'Chaoborus, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'National route 8A Vietnam.jpg',
      selite: 'Kansallistie 8A kiemurtelee sumuisessa rinteessä Vietnamissa. '
        + 'Annamin ylänkö on Vietnamin ja Laosin raja, ja sen yli menee vain '
        + 'kourallinen teitä.',
      lahde: 'Phó Nháy, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'Hoi Yen QNam Landscape.jpg',
      selite: 'Maisema Annamin ylängön eteläpuolella Quang Namin '
        + 'maakunnassa. Vuoret loppuvat tasangoksi, jonka läpi joet '
        + 'kuljettavat vuoriston maa-aineksen merelle.',
      lahde: 'Gene Bromberg, Wikimedia Commons (CC BY-SA 2.0)',
    },
  ],

  'kapmaan-taittovuoret': [
    {
      tiedosto: 'Hex1973.jpg',
      selite: 'Hex Riverin vuoristosola vuonna 1973. Sola on ollut '
        + 'Kapkaupungin ja sisämaan välinen portti siitä asti, kun '
        + 'ensimmäiset vaunut kiipesivät sen yli.',
      lahde: 'Hmvh, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Hottentots-Holland range from Stark-Condé winery.jpg',
      selite: 'Hottentots-Hollandin jono viinitilan puutarhasta '
        + 'Stellenboschissa. Kapmaan taittovuoret erottavat viiniseudun '
        + 'sisämaan kuivasta Karoosta.',
      lahde: 'Julie Anne Workman, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Groote River (32663315262).jpg',
      selite: 'Groote River Meiringspoortin solassa Swartbergin läpi. Joki '
        + 'on leikannut pystyyn taipuneiden hiekkakivikerrosten läpi kapean '
        + 'käytävän.',
      lahde: 'Bernard DUPONT, Wikimedia Commons (CC BY-SA 2.0)',
    },
    {
      tiedosto: 'Cederberg Mountain Reserve - panoramio.jpg',
      selite: 'Cederbergin suojelualueen rapautuneet hiekkakivimuodostumat. '
        + 'Kerrokset poimuttuivat, kun eteläinen Afrikka törmäsi '
        + 'Gondwanan muodostuessa.',
      lahde: 'Lourens van Dyk, Wikimedia Commons (CC BY-SA 3.0)',
    },
  ],

  'madagaskarin-ylanko': [
    {
      tiedosto: 'North Madagascar. (in explore) - Flickr - Rod Waddington.jpg',
      selite: 'Madagaskarin ylängön kumpuilevat kukkulat ja niiden juurella '
        + 'riisiterassit. Metsä on hakattu vuosisatojen aikana lähes '
        + 'kokonaan, ja punainen maa paljastuu rinteistä.',
      lahde: 'Rod Waddington, Wikimedia Commons (CC BY-SA 2.0)',
    },
    {
      tiedosto: 'The great africa.jpg',
      selite: 'Graniittikupoli kohoaa kylän takaa. Ylänkö on vanhaa '
        + 'peruskalliota, ja sen pehmeämpi aines on kulunut pois kupolien '
        + 'ympäriltä.',
      lahde: 'Mostafasamee7, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Isalo - Massif.jpg',
      selite: 'Isalon massiivi ylängön lounaisreunalla. Hiekkakivi on '
        + 'kulunut harjanteiksi ja kanjoneiksi, joiden pohjilla kasvaa '
        + 'palmuja.',
      lahde: 'Andrea Schieber, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Isalo National Park 04.jpg',
      selite: 'Isalon kansallispuiston kerroksellisia kallioita. Puisto on '
        + 'ylängön kuivinta osaa: sade tulee vain muutamana kuukautena '
        + 'vuodessa.',
      lahde: 'Bernard Gagnon, Wikimedia Commons (CC BY-SA 3.0)',
    },
  ],

  altai: [
    {
      tiedosto: 'Зимняя Катунь.jpg',
      selite: 'Katun-joki talvella Altain lumihuippujen alla. Joki saa '
        + 'alkunsa Beluhan jäätiköiltä ja jäätyy vasta pakkasten '
        + 'kiristyttyä — virta on liian nopea aikaisemmalle jäälle.',
      lahde: 'UlyanaYam, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Первое Куехтанарское озеро.jpg',
      selite: 'Ensimmäinen Kuehtanarin järvi vuorten välissä. Väri tulee '
        + 'jäätikön hiomasta kivijauheesta, ja rinteiden vaalea kivikko on '
        + 'rapautunutta liusketta.',
      lahde: 'Aleksei Baturin, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Космачёв Павел - Алтайские виды (ИФПМ СО РАН).jpg',
      selite: 'Tšuisky-valtatie kulkee Altain arojen halki. Tie noudattaa '
        + 'vanhaa karavaanireittiä Venäjältä Mongoliaan — samaa, jota '
        + 'käytettiin jo satoja vuosia sitten.',
      lahde: 'Pavel Kosmatšov, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Граница между Алтайским краем и Республикой Алтай (44016421152).jpg',
      selite: 'Ukkospilvi nousee muurina vuorten yli Altain rajaseudulla. '
        + 'Aro loppuu ja vuoristo alkaa käytännössä yhdessä kohdassa.',
      lahde: 'Dmitry Karyshev, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Perevalka Forest 013 3923.jpg',
      selite: 'Tie Aktrun vuoristoleirille Kosh-Agachin piirissä. Metsä on '
        + 'lehtikuusta, joka pudottaa neulasensa talveksi ja kestää siksi '
        + 'Siperian pakkaset.',
      lahde: 'Ludvig14, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  'guyanan-ylanko': [
    {
      tiedosto: 'Roraima e kukenan.jpg',
      selite: 'Roraima ja Kukenán kohoavat savannin yllä. Tepuit ovat '
        + 'hiekkakivestä kuluneita pöytävuoria, ja niiden laet ovat olleet '
        + 'erillään ympäristöstään miljoonia vuosia.',
      lahde: 'Diego Carrion Serrano, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Monte Roraima com nuvens e céu azul.jpg',
      selite: 'Roraiman pystysuora seinä leirin kohdalta. Seinämä on '
        + 'neljäsataa metriä korkea, ja ylös pääsee vain yhtä vinoa '
        + 'kalliohyllyä pitkin.',
      lahde: 'Ney Guimarães Filho, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Monte Roraima, ponto mais alto.jpg',
      selite: 'Roraiman laki Venezuelan puolella. Ylätasanko on mustaa '
        + 'kivilabyrinttiä ja lammikoita — Arthur Conan Doyle sijoitti '
        + '"Kadonneen maailmansa" juuri tällaiselle vuorelle.',
      lahde: 'Tinhojv, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Monte Roraima e Kukenan Tepui noturno.jpg',
      selite: 'Leiri tepuiden juurella yöllä. Roraima ja Kukenán näkyvät '
        + 'tähtitaivasta vasten mustina muureina.',
      lahde: 'Ney Guimarães Filho, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Stegolepis Guianensis en el Tepuy Roraima, estado Bolívar.JPG',
      selite: 'Stegolepis guianensis Roraiman laella yli 2 500 metrissä. '
        + 'Tepuiden huipuilla elää lajeja, joita ei ole missään muualla — '
        + 'jokainen vuori on oma saarensa.',
      lahde: 'Jflores2916, Wikimedia Commons (CC BY-SA 3.0)',
    },
  ],

  'brasilian-ylanko': [
    {
      tiedosto: 'Pico do Itaguaré.jpg',
      selite: 'Pico do Itaguaré iltavalossa Mantiqueiran vuoristossa. '
        + 'Brasilian ylänkö on vanhaa, kulunutta kilpeä, josta kovimmat '
        + 'graniittiharjat nousevat esiin.',
      lahde: 'Frederico Tomas de Souza e Miranda, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Monumento Natural Estadual da Pedra do Baú Rodrigo Rosa (01).jpg',
      selite: 'Pedra do Baú São Bento do Sapucaín yllä auringonlaskussa. '
        + 'Kalliopaasi kohoaa metsäisen harjanteen päästä kuin torni.',
      lahde: 'Rodrigorosa85, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Pico dos Marins e Itaguaré 17.jpg',
      selite: 'Rosoinen graniittiharja Marinsin ja Itaguarén välisellä '
        + 'reitillä. Ylänkö on kilometrin korkeudessa, joten ilma on '
        + 'viileää vaikka rannikko on lähellä.',
      lahde: 'Ederson Ladeira da Silva, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Pedra Partida 04.jpg',
      selite: 'Auringonlasku Pedra Partidalta Monte Verdessä. Ylängön reuna '
        + 'laskee tästä alas rannikkotasangolle, ja kaukaisuudessa näkyy '
        + 'usvassa kylien valoja.',
      lahde: 'Ederson Ladeira da Silva, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Topo da Pedra Redonda (31585689310).jpg',
      selite: 'Pedra Redondan laki Monte Verdessä. Kumpuilevat harjanteet '
        + 'jatkuvat horisonttiin — ylänkö peittää lähes puolet Brasiliasta.',
      lahde: 'Rafael Vianna Croffi, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'São Bento do Sapucaí - SP (51376893521).jpg',
      selite: 'Bauzinhon polku São Bento do Sapucaín yllä. Rinteillä '
        + 'kasvaa yhä alkuperäistä atlantinmetsää, jota on jäljellä vain '
        + 'murto-osa entisestä.',
      lahde: 'Rafael Vianna Croffi, Wikimedia Commons (CC BY 2.0)',
    },
  ],

  balkanvuoret: [
    {
      tiedosto: 'Na vrhu.jpg',
      selite: 'Tuulen kasaama lumiharja Balkanvuorten laella, reunalla kaksi '
        + 'kulkijaa. Vuoristo kulkee Bulgarian halki idästä länteen ja '
        + 'jakaa maan kahtia.',
      lahde: 'Onomatopeja8, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Kozji kamen.jpg',
      selite: 'Kozji kamen (1 181 m) Itä-Serbiassa Zavojin tekojärven '
        + 'yläpuolella. Järvi syntyi 1963, kun maanvyöry tukki laakson ja '
        + 'vesi nousi kylän ylle.',
      lahde: 'Medeniacus, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Pogled na Midžor.jpg',
      selite: 'Näkymä Midžorille, Serbian korkeimmalle huipulle (2 169 m). '
        + 'Ylärinteet ovat laidunniittyä, ja polut ovat karjan kulkemia.',
      lahde: 'Djordje Markovic, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Konjarnik staza.jpg',
      selite: 'Polku Konjarnikin rinteellä heinäkuussa, tienvieressä kukkivaa '
        + 'horsmaa. Balkanvuorten laet ovat metsänrajan yläpuolella avointa '
        + 'niittyä.',
      lahde: 'Djordje Markovic, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Midžor u daljini.jpg',
      selite: 'Vanha tiilikattoinen lato ja kaukana Midžor. Vuoristokylät '
        + 'ovat tyhjentyneet, ja rakennukset jäävät metsän valtaan.',
      lahde: 'Djordje Markovic, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Crnovrška reka, selo Crni vrh.jpg',
      selite: 'Crnovrškajoki Crni vrhin kylän kohdalla. Balkanvuorten purot '
        + 'ovat lyhyitä ja jyrkkiä: vedenjakaja on lähellä, ja matka '
        + 'Tonavaan on kaikkea muuta kuin loiva.',
      lahde: 'Djordje Markovic, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  tibesti: [
    {
      tiedosto: 'Chad Tousside Trou au Natron 2299.jpg',
      selite: 'Trou au Natronin kaldera ja sen takana Toussiden tulivuori. '
        + 'Kraatteri on kahdeksan kilometriä leveä ja lähes kilometrin syvä '
        + '— yksi Saharan hämmästyttävimmistä paikoista.',
      lahde: 'Gerhard Holub, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Chad Tousside Trou au Natron 2310-3.jpg',
      selite: 'Kalderan pohjalla oleva valkoinen kenttä on natronia eli '
        + 'soodaa, ja sen keskellä kohoaa nuori tuhkakartio. Vesi haihtuu '
        + 'saman tien ja jättää suolan jälkeensä.',
      lahde: 'Gerhard Holub, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Natron deposits, Trou au Natron, Chad.jpg',
      selite: 'Natronkuorta kalderan pohjalla aamuvalossa. Kuori rätisee '
        + 'jalan alla kuin ohut jää.',
      lahde: 'Alexios Niarchos, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Chad Tousside.jpg',
      selite: 'Toussiden tulivuori laavatasangon takana. Tibesti on Saharan '
        + 'korkein vuoristo, ja sen huiput nousevat yli 3 400 metriin '
        + 'keskellä autiomaata.',
      lahde: 'Gerhard Holub, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  kamerunvuori: [
    {
      tiedosto: 'The Buea Mountain Savannah Bed.jpg',
      selite: 'Kamerunvuoren savannivyöhyke Buean yläpuolella. Vuori nousee '
        + 'suoraan merestä 4 040 metriin, joten sen rinteillä on kaikki '
        + 'vyöhykkeet sademetsästä paljaaseen laavaan.',
      lahde: 'Jacob Ekaineck, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Journey To the summit.jpg',
      selite: 'Yöpymismaja huipulle vievän polun varrella. Kamerunvuori on '
        + 'yhä toimiva tulivuori — se on purkautunut viimeksi 2000-luvulla '
        + 'ja rinteillä on tuoretta laavaa.',
      lahde: 'Jacob Ekaineck, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Savannah and Forest Connect.jpg',
      selite: 'Kohta, jossa metsä vaihtuu savanniksi. Kamerunvuori on yksi '
        + 'Afrikan sateisimpia paikkoja: länsirinteelle sataa yli kymmenen '
        + 'metriä vuodessa.',
      lahde: 'Jacob Ekaineck, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Mount Cameroon from Douala Bessengué.jpg',
      selite: 'Kamerunvuori Doualan rautatieasemalta illansuussa. '
        + 'Karthagolainen Hanno kuvasi purjehduksellaan noin 500 eaa. '
        + '"jumalten vaunuja" — tulta vuoren laella, mahdollisesti juuri '
        + 'tämän purkauksen.',
      lahde: 'Edouard Tamba, Wikimedia Commons (CC0)',
    },
  ],

  ahaggar: [
    {
      tiedosto: "Parc culturel de l'Ahaggar 08.jpg",
      selite: 'Ahaggarin tulivuorenpiiput autiomaassa. Pehmeä tuhka on '
        + 'kulunut pois, ja jäljelle ovat jääneet tulivuoren kurkkuun '
        + 'jähmettyneet kovat laavatäytteet.',
      lahde: 'Bernard Gagnon, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Ilamane 01.jpg',
      selite: 'Ilamane (2 739 m) Hoggarin vuoristossa Algeriassa. Vuoristo '
        + 'kohoaa keskellä Saharaa, ja sen korkeus tuo sinne sadetta ja '
        + 'yöpakkasia keskelle autiomaata.',
      lahde: 'Bernard Gagnon, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Ilamane 03.jpg',
      selite: 'Pystyyn jäänyt lohkare Ilamanen edustalla. Autiomaan '
        + 'lämpötilanvaihtelu halkoo kiveä: päivällä on yli 30 astetta, '
        + 'yöllä lähellä nollaa.',
      lahde: 'Bernard Gagnon, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Mosquée Ilamane 05.jpg',
      selite: 'Kivistä ladottu moskeija Ilamanen juurella. Hoggar on '
        + 'tuaregien maata, ja rakennukset tehdään siitä, mitä on '
        + 'käsillä — kivestä ja muutamasta puunrungosta.',
      lahde: 'Bernard Gagnon, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Ilamane 05.jpg',
      selite: 'Ilamane kaukaa tasangon yli. Ero juurelta huipulle on vain '
        + 'muutama sata metriä, mutta autiomaan tasaisuus tekee vuoresta '
        + 'valtavan näköisen.',
      lahde: 'Bernard Gagnon, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Ilamane 06.jpg',
      selite: 'Rapautunutta graniittia Ilamanen kupeessa. Kasvillisuus on '
        + 'harvaa pensasta, joka odottaa vuosikausia seuraavaa sadetta.',
      lahde: 'Bernard Gagnon, Wikimedia Commons (CC BY 4.0)',
    },
  ],

  ruwenzori: [
    {
      tiedosto: 'Alexandra Peak Margherita Peak Rwenzori.jpg',
      selite: 'Aleksandran huippu (5 091 m) vasemmalla ja Margheritan huippu '
        + '(5 109 m) oikealla, alla Margheritan jäätikkö. Nämä ovat Afrikan '
        + 'kolmanneksi korkeimmat huiput — ja päiväntasaajalla.',
      lahde: 'Rafał Kozubek, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Lower Kitandara Lake.jpg',
      selite: 'Alempi Kitandara-järvi (3 989 m) Butawun laaksossa. '
        + 'Vasemmalla Stanleyn massiivi, oikealla Baker-vuoren seinät. '
        + 'Ptolemaios kutsui näitä vuoria Kuun vuoriksi ja arveli Niilin '
        + 'saavan täältä alkunsa.',
      lahde: 'Rafał Kozubek, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Bog in Mulyambuli valley Rwenzori.jpg',
      selite: 'Suo Mulyambulin laaksossa 3 400 metrissä. Ruwenzori on '
        + 'jatkuvasti märkä: sumu ja sade tekevät koko vuoristosta yhden '
        + 'suuren sammalikon.',
      lahde: 'Rafał Kozubek, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Mutinda pool Rwenzori.jpg',
      selite: 'Mutindan lampi Kamusongin laaksossa 3 510 metrissä. Taustalla '
        + 'puumaisia kanervikkoja — täällä kanervasta kasvaa metsä.',
      lahde: 'Rafał Kozubek, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Lake Bugata recessional moraine.jpg',
      selite: 'Bugata-järvi (3 983 m) ja sen vieressä kielimäinen moreeni, '
        + 'jonka päällä Kilembe Trail kulkee. Moreeni on merkki '
        + 'vetäytyneestä jäätiköstä.',
      lahde: 'Rafał Kozubek, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Rwenzori tropical montane forest.jpg',
      selite: 'Trooppista vuoristosademetsää Nyamwamban laakson yläpuolella '
        + '2 340 metrissä. Vyöhykkeitä on Ruwenzorilla viisi, ja ne '
        + 'vaihtuvat parissa päivämatkassa.',
      lahde: 'Rafał Kozubek, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  'etiopian-ylangot': [
    {
      tiedosto: 'Relief du Simien.jpg',
      selite: 'Simienin ylängön repaleinen reuna. Ylänkö on vanhaa laavaa, '
        + 'jonka sadevesi on syönyt torneiksi ja rotkoiksi — jäljellä on '
        + 'vain se, mikä oli kovinta.',
      lahde: 'Hervé Doulat, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Simien mountains 2.jpg',
      selite: 'Iltavalo Simienin kallioseinillä. Etiopian ylängöt ovat '
        + 'Afrikan laajin vuoristoalue, ja niitä on kutsuttu maanosan '
        + 'kattohuoneeksi.',
      lahde: 'Indrik myneur, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: "Plateau de Sona vu depuis l'Inatye.jpg",
      selite: 'Sonan tasanko Inatyen huipulta. Viljelysarat ulottuvat '
        + 'jyrkänteen reunalle asti: ylängöllä asuu miljoonia ihmisiä, ja '
        + 'jokainen tasainen kaistale on käytössä.',
      lahde: 'Hervé Doulat, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'GeladaTroopSimienMountains.jpg',
      selite: 'Geladalauma Simienin ylängöllä auringonlaskun aikaan. Gelada '
        + 'elää vain Etiopian ylängöillä, ja se on ainoa apina, joka syö '
        + 'pääasiassa ruohoa.',
      lahde: 'Evan Williams, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Road to Debarq.jpg',
      selite: 'Tie Debarqiin kiertää Simienin pohjoisseinää. Ylängöltä '
        + 'alas pääsee vain harvasta kohtaa, ja siksi vuoristo suojasi '
        + 'Etiopiaa valloittajilta vuosisatoja.',
      lahde: 'Evan Williams, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Giant Lobelias, Simien Mtns, Ethiopia (23538066709).jpg',
      selite: 'Jättiläislobelioita sumussa Simienin ylängöllä. Kasvi kasvaa '
        + 'vuosikymmeniä, kukkii kerran ja kuolee.',
      lahde: 'Rod Waddington, Wikimedia Commons (CC BY-SA 2.0)',
    },
    {
      tiedosto: 'Giant Lobelia, Ethiopia (10412309613).jpg',
      selite: 'Lobeliametsikkö ylängön yläosassa. Tämä vyöhyke on '
        + 'kolmen kilometrin yläpuolella, missä yöt ovat pakkasella ympäri '
        + 'vuoden.',
      lahde: 'Rod Waddington, Wikimedia Commons (CC BY-SA 2.0)',
    },
  ],

  'kaakkois-australian-ylangot': [
    {
      tiedosto: 'Mount Kosciusko (height 7,328 feet), N.S.W. LCCN2017657837.jpg',
      selite: 'Mount Kosciuszko vuoden 1890 photochrom-vedoksessa. '
        + 'Käsinväritettyjä matkakuvia myytiin juuri isoisän aikaan, ja '
        + 'korkeus on merkitty vielä jalkoina.',
      lahde: 'Photoglob Co., Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'Kosciuszko main range from Scammel Spur Lookout.jpg',
      selite: 'Kosciuszkon pääharjanne lumen peittämänä Scammel Spurilta. '
        + 'Australian korkein huippu on vain 2 228 metriä — koko manner on '
        + 'matala ja kulunut.',
      lahde: 'Thennicke, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Mount Kosciuszko Summit 360 panorama.jpg',
      selite: 'Kosciuszkon laki keskikesällä. Huipulle pääsee kävellen '
        + 'muutamassa tunnissa, ja kivikossa istuu keskipäivällä '
        + 'retkeilijöitä eväillään.',
      lahde: 'Toby Hudson, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Mt. Feathertop444 edit.jpg',
      selite: 'Näkymä Mount Feathertopin laelta Victoriassa. Australian '
        + 'Alpit ovat pyöreitä ylänköjä, ei teräviä huippuja: jäätiköitä ei '
        + 'täällä ole ollut miljooniin vuosiin.',
      lahde: 'Benjamint444 / Fir0002, Wikimedia Commons (CC BY-SA 3.0)',
    },
  ],

  'suuri-vedenjakajavuoristo': [
    {
      tiedosto: 'Clarrie hall dam mount warning.JPG',
      selite: 'Mount Warning peilautuu Clarrie Hall -tekojärveen '
        + 'Uudessa-Etelä-Walesissa. Vuori on kuluneen tulivuoren jäänne ja '
        + 'mantereen ensimmäinen paikka, jolle aamuaurinko osuu.',
      lahde: 'Pouts31, Wikimedia Commons (CC BY 3.0)',
    },
    {
      tiedosto: 'Snow gums, Dead Horse Gap NSW Australia.jpg',
      selite: 'Palaneita lumieukalyptuksia Dead Horse Gapissa. Lumieukalyptus '
        + 'on puuraja-alueen puu: se kestää lumen, mutta metsäpalot jättävät '
        + 'rungot pystyyn vuosikymmeniksi.',
      lahde: 'Thennicke, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Etheridge Ridge.jpg',
      selite: 'Etheridge Ridge kohoaa Seamans Hutin takana talvella. Maja on '
        + 'rakennettu 1929 kahden hiihtäjän muistoksi, jotka kuolivat '
        + 'myrskyyn tällä harjulla.',
      lahde: 'Cybergothiche, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Hovel near Geehi hut.jpg',
      selite: 'Vanha suoja Alpine Wayn varrella Geehin majan lähellä, '
        + 'taustalla Kosciuszkon pääharjanne. Karjapaimenet rakensivat '
        + 'tällaisia matkan varrelle kesälaitumille noustessaan.',
      lahde: 'Thennicke, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'MG 2448 highres.jpg',
      selite: 'Puro virtaa graniittilohkareiden yli Kosciuszkon '
        + 'kansallispuistossa. Vedenjakajan nimi on kirjaimellinen: täältä '
        + 'vedet lähtevät joko itään merelle tai länteen sisämaahan.',
      lahde: 'Edward Forgacs, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'The Basin Retarding Basin.jpg',
      selite: 'Dandenongin vuorten juurella oleva allas Victoriassa. '
        + 'Vuoristo jatkuu Australian itärannikkoa pitkin 3 500 kilometriä, '
        + 'ja etelässä se on jo matalaa metsäistä kukkulamaastoa.',
      lahde: 'Ellebeeess, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  kilimanjaro: [
    {
      tiedosto: 'Amboseli National Park and Mt. Kilimanjaro.jpg',
      selite: 'Norsuja Amboselin kansallispuistossa ja niiden takana '
        + 'Kilimanjaro. Vuori on Tansanian puolella, mutta se näkyy '
        + 'parhaiten Kenian tasangolta — sieltä ei ole mitään sen edessä.',
      lahde: 'Ninaras, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Snowy Mountains In Sky (Unsplash).jpg',
      selite: 'Kilimanjaron lumihuippu pilvimeren yläpuolella. Afrikan '
        + 'korkein vuori on 5 895 metriä, ja sen jäätiköt ovat kutistuneet '
        + 'sadassa vuodessa murto-osaan entisestä.',
      lahde: 'Joel Peel, Wikimedia Commons (CC0)',
    },
    {
      tiedosto: 'Clouds Over Mount Kilimanjaro (Unsplash).jpg',
      selite: 'Pilvet kiertävät Kilimanjaron laella. Vuori tekee oman '
        + 'säänsä: kostea ilma nousee rinteitä ylös ja tiivistyy pilviksi, '
        + 'jotka peittävät huipun suurimman osan päivästä.',
      lahde: 'Joel Peel, Wikimedia Commons (CC0)',
    },
    {
      tiedosto: 'Giant Groundsels michael peter.jpg',
      selite: 'Jättiläisvillakkoja Kilimanjaron rinteellä sumussa. Kasvi '
        + 'kasvaa vain Itä-Afrikan korkeilla vuorilla, ja sen paksu '
        + 'lehtitupsu suojaa yöpakkaselta.',
      lahde: 'Michael Mwakalundwa, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Lake Challa of Kenya.jpg',
      selite: 'Challa-järvi Kilimanjaron koillisrinteellä. Kraatterin reuna '
        + 'nousee järven ympärillä 170 metriä, ja vesi vaihtaa väriä '
        + 'sinisestä turkoosiin vuodenajan mukaan.',
      lahde: 'Galkey, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  'dinaariset-alpit': [
    {
      tiedosto: 'Biokovo mountains.jpg',
      selite: 'Biokovon karstiharjanteet Adrianmeren yllä. Dinaarinen '
        + 'karsti on antanut nimensä koko ilmiölle: kalkkikivi liukenee '
        + 'sadeveteen, ja pinta on täynnä kuoppia, rotkoja ja luolia.',
      lahde: 'Breta Valek, Wikimedia Commons (CC BY-SA 2.0)',
    },
    {
      tiedosto: 'Vidikovac Banjska stena i pogled na jezero Perućac i kanjon reke Drine.jpg',
      selite: 'Banjska stenan näköalapaikka Perućacjärven ja Drinan rotkon '
        + 'yllä. Joet ovat leikanneet Dinaarisiin Alppeihin Euroopan '
        + 'syvimpiä kanjoneita.',
      lahde: 'TarjaMitrovic, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Baska Voda-mountain.jpg',
      selite: 'Paljas kalkkikivihuippu Baška Vodan yläpuolella. Rannikon '
        + 'vuoret ovat lähes kasvittomia: sadevesi katoaa heti kallioon '
        + 'eikä jää maaperään.',
      lahde: 'László Szalai, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'Biokovo 11 2019.jpg',
      selite: 'Biokovon laki ja sen takana meri. Vuoristo nousee rannalta '
        + 'lähes pystysuoraan 1 700 metriin, joten uimarannalta on '
        + 'lumirajalle vain muutama kilometri.',
      lahde: 'SKas, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Balkan mountains near the city Foča. Dinaric Alps 09.jpg',
      selite: 'Metsäisiä rinteitä Fočan lähellä Bosniassa. Sisämaan puolella '
        + 'Dinaariset Alpit ovat vehreitä — sade jää harjanteen tälle '
        + 'puolelle.',
      lahde: 'JukoFF, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  'kenia-vuori': [
    {
      tiedosto: 'Mount Kenya Peaks.jpg',
      selite: 'Kenia-vuoren kolme huippua Nyerin suunnalta: Batian, Nelion '
        + 'ja Lenana. Vuori on sammunut tulivuori, jonka pehmeä kartio on '
        + 'kulunut pois — jäljellä on kova laavatäyte keskeltä.',
      lahde: 'Galkey, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Batian peak as visible from Lenana peak Mt Kenya.jpg',
      selite: 'Batian, vuoren korkein huippu (5 199 m), Lenanan laelta '
        + 'nähtynä. Batianille pääsee vain kalliokiipeilynä; Lenanalle '
        + 'kävellään.',
      lahde: 'Bett Duncan, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Batian peak Mt Kenya.jpg',
      selite: 'Batian aamun ensimmäisessä valossa. Päiväntasaajan '
        + 'tuntumassa oleva vuori on lumen ja jään peitossa ympäri vuoden, '
        + 'vaikka juurella on savannia.',
      lahde: 'Bett Duncan, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Panoramaansicht See am Mount Kenya in Kenia.jpg',
      selite: 'Vuoristojärvi Kenia-vuorella. Ympärillä kasvaa jättiläis-'
        + 'lobelioita ja -villakkoja: ne ovat kehittyneet suuriksi juuri '
        + 'täällä, missä yöt ovat pakkasella ja päivät kuumia ympäri '
        + 'vuoden.',
      lahde: 'Nina R, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'View of Lenana peak at sunrise.jpg',
      selite: 'Lenanan huippu auringonnousussa kiivetessä. Lenana on '
        + '4 985 metrissä, ja sinne noustaan tavallisesti aamuyöllä, jotta '
        + 'huipulla oltaisiin auringon noustessa.',
      lahde: 'Bett Duncan, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Slopes of Mount Kenya.jpg',
      selite: 'Kenia-vuoren rinteet Merun suunnalta. Vuori nousee yksinään '
        + 'tasangolta, joten se näkyy hyvällä säällä kymmenien kilometrien '
        + 'päähän.',
      lahde: 'Galkey, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Slopes of Mt Kenya.jpg',
      selite: 'Sama rinne lähempää: metsävyöhyke, sen yläpuolella '
        + 'kanervikkoa ja ylimpänä paljas kallio. Vyöhykkeet vaihtuvat '
        + 'muutamassa kilometrissä.',
      lahde: 'Galkey, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  'sierra-nevada': [
    {
      tiedosto: 'Darwin Bench.jpg',
      selite: 'Darwin Bench Kalifornian Sierra Nevadassa. Graniittialtaat ja '
        + 'niiden pikkulammet ovat jääkauden jäljiltä: jäätikkö hioi kallion '
        + 'sileäksi ja jätti kuopat veden täytettäviksi.',
      lahde: 'Martin Bravenboer, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Isosceles Peak and Columbine Peak.jpg',
      selite: 'Isosceles Peak ja Columbine Peak Dusy Basinista. Sierra '
        + 'Nevada on yksi valtava graniittilohkare, joka on kallistunut '
        + 'idästä ylös ja lännestä loivasti alas.',
      lahde: 'Martin Bravenboer, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Across the Sierra Nevadas LCCN2003667088.jpg',
      selite: 'Vuoriston ylitys 1800-luvun kivipainoksessa. Tällaisia '
        + 'värilitografioita myytiin matkailijoille juuri isoisän aikaan, '
        + 'kun rautatie oli vasta noussut Sierran yli.',
      lahde: 'Popular Graphic Arts, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'Goodale, Taboose, Cardinal.jpg',
      selite: 'Goodale Mountain, Taboosen sola ja Cardinal Mountain Owensin '
        + 'laaksosta. Itärinne nousee laaksosta kolme kilometriä lähes '
        + 'suoraan — se on Yhdysvaltain jyrkin vuorenseinä.',
      lahde: 'Annette Bernhardt, Wikimedia Commons (CC BY-SA 2.0)',
    },
    {
      tiedosto: 'Eastern Sierra High Peaks Panorama.jpg',
      selite: 'Mount Langley, Mount Whitney ja itäisen Sierran huiput Cirque '
        + 'Peakin laelta. Whitney on Alaskan ulkopuolisen Yhdysvaltain '
        + 'korkein huippu, 4 421 metriä.',
      lahde: 'trailkrum, Wikimedia Commons (CC BY-SA 2.0)',
    },
    {
      tiedosto: 'Highland Peak, Silver Peak, and Round Top.jpg',
      selite: 'Highland Peak, Silver Peak ja Round Top lokakuussa. Sierran '
        + 'pohjoisosa on matalampi, ja sen yli kulkevat solat pysyvät auki '
        + 'pidempään syksyyn.',
      lahde: 'Peter.Yaworsky, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  'alaskan-vuoristo': [
    {
      tiedosto: 'Denali, Denali National Park and Preserve.jpg',
      selite: 'Denali kesäyön punaisessa valossa Wonder Laken takana. '
        + 'Pohjois-Amerikan korkein vuori, 6 190 metriä — ja koska ympäröivä '
        + 'tasanko on matala, sen nousu juurelta huipulle on suurempi kuin '
        + 'Everestin.',
      lahde: 'NPS / Emily Mesner, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'Mount McKinely (14240628174).jpg',
      selite: 'Denalin lumiseinät pilvien yläpuolella. Vuori tekee oman '
        + 'säänsä: se pysäyttää etelästä tulevan kostean ilman, ja huippu on '
        + 'näkyvissä vain noin joka kolmas päivä.',
      lahde: 'Denali National Park and Preserve, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'Parque nacional y reserva Denali, Alaska, Estados Unidos, 2017-08-30, DD 49.jpg',
      selite: 'Denali sumumeren yllä. Vuori kantoi vuodesta 1917 nimeä Mount '
        + 'McKinley, mutta palasi 2015 vanhaan athabaskien nimeensä, joka '
        + 'tarkoittaa "korkeaa".',
      lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'A view of Denali from the Kantishna area (2f18a78d-1dd8-b71c-0761-06c11350a017).jpg',
      selite: 'Denali Kantishnan suunnalta kuusten välistä. Etualan matala '
        + 'metsä on taigaa, joka vaihtuu muutamassa sadassa metrissä '
        + 'tundraksi.',
      lahde: 'Jacob W. Frank, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'Denali and Mount Hunter (53991403814).jpg',
      selite: 'Denali ja Mount Hunter syksyn keltaisten koivujen takana. '
        + 'Ruska tulee Alaskassa jo elokuun lopulla.',
      lahde: 'David Zhang, Wikimedia Commons (CC BY-SA 2.0)',
    },
    {
      tiedosto: 'Parque nacional y reserva Denali, Alaska, Estados Unidos, 2017-08-30, DD 50.jpg',
      selite: 'Alaskan vuoristo jatkuu jonona horisonttiin. Kaari kulkee '
        + '600 kilometriä ja erottaa Alaskan sisämaan rannikosta.',
      lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  appalakit: [
    {
      tiedosto: 'White Rocks near Sand Cave and the Cumberland Gap.jpg',
      selite: 'White Rocksin kalkkikivijyrkänne Cumberland Gapin lähellä '
        + 'ruskan aikaan. Gap on kapea sola, josta siirtolaiset kulkivat '
        + '1700-luvulta lähtien Appalakkien länsipuolelle — ensimmäinen '
        + 'portti mantereen sisäosiin.',
      lahde: 'BrianSWoods, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Ridge-and-Valley.jpg',
      selite: 'Appalakkien harju- ja laaksovyöhyke syksyllä. Kapeat '
        + 'harjanteet ja niiden väliset viljelylaaksot toistuvat '
        + 'rinnakkain satojen kilometrien matkan — poimuttunut vuoristo, '
        + 'joka on kulunut matalaksi.',
      lahde: 'Ak1047, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Grassy Ridge Bald.jpg',
      selite: 'Grassy Ridge Bald Appalachian Trailin varrella aamu-usvassa. '
        + 'Baldit ovat puuttomia lakia, joiden syntyä ei täysin tunneta: '
        + 'metsäraja on ympärillä paljon korkeammalla.',
      lahde: 'Chaneyforkriver, Wikimedia Commons (CC0)',
    },
    {
      tiedosto: 'Forillon panorama.jpg',
      selite: 'Forillonin kansallispuisto Mont-Saint-Albanin huipulta '
        + 'Québecissä. Tässä Appalakit päättyvät mereen: sama vuorijono '
        + 'jatkuu Alabamasta Gaspén niemimaalle asti.',
      lahde: 'Amateria1121, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Hemlock Ridge Preserve (9) (13810762514).jpg',
      selite: 'Lehtimetsää Hemlock Ridgen suojelualueella Pennsylvaniassa. '
        + 'Puussa oleva keltainen merkki on polkumerkintä — Appalakit ovat '
        + 'ennen kaikkea kävelyvuoristo.',
      lahde: 'Nicholas A. Tonelli, Wikimedia Commons (CC BY 2.0)',
    },
  ],

  rannikkovuoret: [
    {
      tiedosto: 'Ipsoot Mountain, east.jpg',
      selite: 'Ipsoot Mountainin itäsivu talvella Mount Taylorilta nähtynä. '
        + 'Brittiläisen Kolumbian rannikkovuoret keräävät Tyyneltämereltä '
        + 'tulevan kosteuden, ja lunta tulee metrikaupalla.',
      lahde: 'Martin Bravenboer, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Fissile Peak and Whirlwind Peak.jpg',
      selite: 'Fissile Peak ja sen takana Whirlwind Peak. Etualan kuuset '
        + 'ovat huurteen peitossa: tuuli jäädyttää sumun suoraan oksiin.',
      lahde: 'Martin Bravenboer, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Kumcan and Kwoiek peaks.jpg',
      selite: 'Kumcanin ja Kwoiekin huiput ja niiden välissä Kwoiek-jäätikkö '
        + 'ilmasta. Rannikkovuoret ovat Pohjois-Amerikan jäätiköitynein '
        + 'vuoristo napa-alueiden ulkopuolella.',
      lahde: 'Murray Foubister, Wikimedia Commons (CC BY-SA 2.0)',
    },
    {
      tiedosto: 'Forger Peak (from Whirlwind).jpg',
      selite: 'Forger Peak nousee pilvimeren yläpuolelle. Rannikolta tuleva '
        + 'kostea ilma jää usein laaksoihin, ja huiput jäävät saariksi '
        + 'pilven päälle.',
      lahde: 'Martin Bravenboer, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Ipsoot Moountain.jpg',
      selite: 'Ipsoot Mountainin eteläsivu Rainbow Mountainilta. Jono kulkee '
        + 'yli 1 600 kilometriä rannikkoa pitkin, ja sen laaksot päättyvät '
        + 'vuonoihin.',
      lahde: 'Martin Bravenboer, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Journeyman Peak.jpg',
      selite: 'Journeyman Peakin luoteisrinne maaliskuussa. Puuraja jää '
        + 'täällä matalalle, koska lumi viipyy rinteillä pitkälle kesään.',
      lahde: 'Martin Bravenboer, Wikimedia Commons (CC BY 2.0)',
    },
  ],

  'uuden-seelannin-alpit': [
    {
      tiedosto: 'Aoraki - Mt Cook, Aoraki - Mount Cook National Park, New Zealand.jpg',
      selite: 'Aoraki eli Mount Cook Mueller Hutin polulta nähtynä. '
        + 'Uuden-Seelannin korkein huippu (3 724 m) on maorien kertomuksissa '
        + 'taivaanisän poika, joka jähmettyi kiveksi.',
      lahde: 'Michal Klajban, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Mount Cook from Kea Point 01.jpg',
      selite: 'Mount Cook Kea Pointilta. Etualan harmaa harjanne on '
        + 'Mueller-jäätikön moreenia: jäätikkö on sen alla, sorakerroksen '
        + 'peittämänä.',
      lahde: 'Krzysztof Golik, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Aoraki, Aoraki - Mount Cook National Park, New Zealand 02.jpg',
      selite: 'Aorakin huippu pilvien yläpuolella. Vuoren korkeus laski '
        + 'kymmenen metriä vuonna 1991, kun huipun jäähattu romahti '
        + 'maanvyörynä alas.',
      lahde: 'Michal Klajban, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Aoraki from Mueller Hut, Aoraki - Mount Cook National Park, New Zealand.jpg',
      selite: 'Aoraki Mueller Hutin edustalta. Maja on 1 800 metrissä, ja '
        + 'sinne noustaan tuhat porrasta jyrkkää rinnettä.',
      lahde: 'Michal Klajban, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Main Divide from Yeats Ridge Hut, West Coast Region, New Zealand.jpg',
      selite: 'Päävedenjakaja Yeats Ridge Hutilta länsirannikon puolelta. '
        + 'Harjanne jakaa saaren kahtia: lännessä sataa moninkertaisesti '
        + 'enemmän kuin idässä.',
      lahde: 'Michal Klajban, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Aoraki - Mt Cook from Sealy Tarns Track, Aoraki - Mount Cook National Park, New Zealand.jpg',
      selite: 'Aoraki Sealy Tarnsin polulta. Etualan tiheä pensaikko on '
        + 'kotoperäistä kasvillisuutta, jollaista ei kasva missään muualla.',
      lahde: 'Michal Klajban, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Dome Mountain.jpg',
      selite: 'Dome Mountain Arthur\'s Passin kansallispuistossa '
        + 'Waimakaririjoen laaksosta nähtynä. Keltainen kukkakenttä kasvaa '
        + 'joen sorapohjan reunassa.',
      lahde: 'Krzysztof Golik, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Main Divide from Toaroha Range, West Coast Region, New Zealand.jpg',
      selite: 'Päävedenjakaja Toarohan harjanteelta. Ruskea tussock-heinä '
        + 'kestää tuulen ja kuivuuden siellä, missä metsä ei enää kasva.',
      lahde: 'Michal Klajban, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  andit: [
    {
      tiedosto: 'The Andes from Mendoza.jpg',
      selite: 'Andien lumipeitteinen selkä Mendozan puolelta. Tästä kohtaa '
        + 'vuoristo on korkeimmillaan: Aconcagua nousee lähes 7 000 metriin '
        + 'ja on Amerikkojen korkein huippu.',
      lahde: 'Steve Peck, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Entrada de nubes.jpg',
      selite: 'Pilvet valuvat sinisinä kerroksina Andien harjanteiden väliin. '
        + 'Vuorijono on maailman pisin, lähes 7 000 kilometriä, ja se kulkee '
        + 'seitsemän maan halki.',
      lahde: 'Raul photoss, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Andes mountains from 35,000 feet (24495877342).jpg',
      selite: 'Andit yli kymmenen kilometrin korkeudesta. Ylhäältä näkyy, '
        + 'miten kapea jono on: lumiraja alkaa heti, ja molemmin puolin '
        + 'lasketaan nopeasti kuivaan maastoon.',
      lahde: 'sgbirch, Wikimedia Commons (CC BY-SA 2.0)',
    },
    {
      tiedosto: 'Historical panorama of Cuzco in the 1900s.png',
      selite: 'Cuzco vuoristolaaksossaan noin vuonna 1900, arkeologi Max '
        + 'Uhlen ottamana. Inkojen pääkaupunki on 3 400 metrissä, ja '
        + 'ympäröivät rinteet on porrastettu viljelyterasseiksi.',
      lahde: 'Max Uhle, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'Apu El Plomo.tif',
      selite: 'El Plomon vuori pilvien alla Chilessä. Ketšuan kielessä apu '
        + 'tarkoittaa vuorenhenkeä: korkeimmat huiput olivat pyhiä, ja '
        + 'niiden laella on tehty uhrimenoja.',
      lahde: 'Adiaz1499, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Andes mountains in the Huila department (Montañas de los Andes en el departamento del Huila).jpg',
      selite: 'Andien vihreät rinteet Huilan maakunnassa Kolumbiassa. '
        + 'Pohjoisessa jono haarautuu kolmeksi, ja niiden välissä olevat '
        + 'laaksot ovat maan tiheimmin asuttuja seutuja.',
      lahde: 'SergiXCX, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  kalliovuoret: [
    {
      tiedosto: 'Fairview Mountain across Lake Louise with wildfire smoke haze, Banff National Park, Alberta, Canada.jpg',
      selite: 'Fairview Mountain Louise-järven takana Banffin '
        + 'kansallispuistossa. Järven turkoosi väri tulee jäätikön '
        + 'hiomasta kivijauheesta, joka jää veteen leijumaan.',
      lahde: 'Ethan Sahagun, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: '20190329-FS-FlatheadNF-YFYF-105 (46609141605).jpg',
      selite: 'Syksyn keltaiset lehtikuuset ja lumihuippu Flatheadin '
        + 'kansallismetsässä Montanassa. Kalliovuoret ovat Pohjois-Amerikan '
        + 'vedenjakaja: sen kummallakin puolella vedet lähtevät eri merelle.',
      lahde: 'Forest Service, USDA, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'Athabasca Glacier from the valley floor, Jasper National Park, Alberta, Canada.jpg',
      selite: 'Athabascan jäätikkö laaksosta nähtynä Jasperin '
        + 'kansallispuistossa. Jäätikkö on vetäytynyt yli kilometrin sadassa '
        + 'vuodessa, ja edessä oleva sora on sen jättämää.',
      lahde: 'Ethan Sahagun, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: '20190329-FS-FlatheadNF-YFYF-082 (46609246585).jpg',
      selite: 'Joki kiemurtelee laakson pohjalla ilmasta nähtynä. '
        + 'Kalliovuorten laaksot ovat leveitä ja loivia, koska jäätiköt ovat '
        + 'kuluttaneet ne auki.',
      lahde: 'Forest Service, USDA, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'Elizabeth Parker Hut in winter under beautiful blue skies.png',
      selite: 'Elizabeth Parkerin maja lumen alla Yohon kansallispuistossa. '
        + 'Majat ovat hiihtäjien ja kiipeilijöiden ainoa suoja siellä, minne '
        + 'tie ei nouse.',
      lahde: 'Luke Gibson, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Big Cottonwood Canyon winter.jpg',
      selite: 'Tie kiertää Big Cottonwood Canyonin läpi talvella Utahissa. '
        + 'Kanjonit ovat ainoat reitit vuoriston läpi, ja lumivyöryt '
        + 'sulkevat ne toisinaan päiviksi.',
      lahde: 'GyozaDumpling, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: '20190329-FS-FlatheadNF-YFYF-106 (46609135235).jpg',
      selite: 'Pilvet repeilevät lumihuippujen ympäriltä havumetsän yllä. '
        + 'Metsäraja nousee Kalliovuorilla etelässä yli kolmen kilometrin, '
        + 'pohjoisessa se jää alle kahden.',
      lahde: 'Forest Service, USDA, Wikimedia Commons (PD)',
    },
  ],

  kaskadit: [
    {
      tiedosto: 'Craterlake-panorama.jpg',
      selite: 'Kraatterijärvi Oregonissa. Järvi täyttää Mazama-tulivuoren '
        + 'romahtaneen huipun, ja se on Yhdysvaltain syvin — lähes 600 '
        + 'metriä.',
      lahde: 'Snottywong, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Broken Top panorama.jpg',
      selite: 'Broken Topin repeytynyt kraatteri ja sen alla oleva lampi. '
        + 'Nimi kertoo, mitä vuorelle kävi: purkaukset ja jäätiköt ovat '
        + 'syöneet huipun auki.',
      lahde: 'Chaneyforkriver, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Mountain climbers near Index, Washington, March 1, 1900 - DPLA - c918a0650fcdc495e6413586e6623937.jpg',
      selite: 'Vuorikiipeilijöitä Indexin lähellä Washingtonissa maaliskuussa '
        + '1900. Sauvat, hatut ja pitkät hameet olivat retkeilyvarustus '
        + 'siihen aikaan, kun näitä vuoria vasta kartoitettiin.',
      lahde: 'Arthur Clarence Pillsbury, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'Keechelus Lake October 2026.jpg',
      selite: 'Keechelus-järvi lokakuussa, taustalla Kaskadien terävät '
        + 'huiput. Järven pinta lasketaan syksyksi, ja sen paljastuva pohja '
        + 'on täynnä vanhoja kantoja.',
      lahde: 'Guywelch2000, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Phelps Ridge from Maude.jpg',
      selite: 'Phelpsin harjanne Maude-vuorelta lokakuussa. Kaskadit ovat '
        + 'tulivuorijono, mutta niiden välissä on myös vanhaa, teräväksi '
        + 'kulunutta kalliota.',
      lahde: 'Martin Bravenboer, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'High in the Cascades, Washington LCCN2011632596.tif',
      selite: 'Kaskadien harjanteita Washingtonissa. Jono jakaa osavaltion '
        + 'kahtia: lännessä sataa runsaasti, idässä alkaa lähes aavikko.',
      lahde: 'Carol M. Highsmith, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'Cascades view from Mt. Adams.jpg',
      selite: 'Näkymä Mount Adamsin lumikentiltä yli Kaskadien. Ylimpänä '
        + 'kaikki on lunta ja jäätikköä ympäri vuoden.',
      lahde: 'KingRolly, Wikimedia Commons (CC BY 4.0)',
    },
  ],

  atlas: [
    {
      tiedosto: 'A shepherd with his goats in the Atlas Mountains in Morocco, February 2022.jpg',
      selite: 'Paimen ja vuohilauma punaisella rinteellä Atlasvuorilla. '
        + 'Laumat kulkevat vuodenaikojen mukaan ylös ja alas, ja polku '
        + 'kaartaa rinnettä loivasti — suoraan ylös vuohetkaan eivät nouse.',
      lahde: 'Imad.kastalani, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Aït Bouguemez, Haut Atlas, Maroc (49367502458).jpg',
      selite: 'Aït Bouguemezin laakso Korkealla Atlaksella. Laakson pohja on '
        + 'vihreä pelto pellon vieressä, ja rinteet ovat paljasta kiveä — '
        + 'kastelukanavat vetävät sulamisveden peltoihin.',
      lahde: 'Frank Vassen, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Atlas mountains aerial 1.jpg',
      selite: 'Atlasvuoret ilmasta talvella. Lumi peittää harjanteet, mutta '
        + 'muutaman kymmenen kilometrin päässä alkaa jo autiomaa: vuoristo on '
        + 'se muuri, joka pitää Saharan erossa Välimeren rannikosta.',
      lahde: 'kallerna, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Valley of Ait Bouguemez.png',
      selite: 'Aït Bouguemezin laakso alempaa nähtynä. Kylät ovat rinteen '
        + 'juurella, jotta tasainen maa jäisi viljelyyn.',
      lahde: 'Mohamed Haddi, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Atlas mountains aerial 2.jpg',
      selite: 'Lumipeitteisiä harjanteita peräkkäin ilmasta. Atlas ei ole '
        + 'yksi jono vaan useita rinnakkaisia — Korkea, Keski- ja '
        + 'Anti-Atlas.',
      lahde: 'kallerna, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Berbere country.jpg',
      selite: 'Punaiset kalliot ja linssipilvi berberien asuttamalla '
        + 'seudulla. Pilvi syntyy, kun tuuli nousee vuoren yli ja jäähtyy '
        + 'harjanteen päällä.',
      lahde: '2babouches, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  drakensberg: [
    {
      tiedosto: 'Clouds in the drakensberge 01.jpg',
      selite: 'Pilvet valuvat Pohjois-Drakensbergin jyrkänteen yli Sentinelin '
        + 'ja Amfiteatterin välisestä aukosta. Kosteus nousee Intian '
        + 'valtamereltä ja tiivistyy juuri reunalla.',
      lahde: 'Thomas Fuhrmann, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Clouds in the drakensberge 04.jpg',
      selite: 'Pilvi kaatuu harjanteen yli kuin vesiputous. Drakensberg on '
        + 'Etelä-Afrikan sisäylängön reuna, ja pudotus rannikkotasangolle on '
        + 'lähes kaksi kilometriä.',
      lahde: 'Thomas Fuhrmann, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Clouds in the drakensberge 03.jpg',
      selite: 'Iltavalo pilvien läpi Drakensbergin pohjoisosassa. Nimi '
        + 'tarkoittaa hollanniksi lohikäärmevuoria; zulun kielellä se on '
        + 'uKhahlamba, "keihäsvalli".',
      lahde: 'Thomas Fuhrmann, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Sunset in the drakensberge.jpg',
      selite: 'Auringonlasku Drakensbergin reunalla. Ylätasangon ruoho on '
        + 'lyhyttä ja sitkeää: se palaa kuivana kautena ja vihertää taas '
        + 'ensimmäisten sateiden jälkeen.',
      lahde: 'Thomas Fuhrmann, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Blyde River Canyon Nature Reserve (ZA), Lowveld View -- 2024 -- 9972.jpg',
      selite: 'Näkymä Lowveld View'
        + "'lta Blyde River Canyonin luonnonpuistossa. Rotko on maailman "
        + 'suurimpia vihreitä kanjoneita — toisin kuin useimmat, se ei ole '
        + 'autiomaassa.',
      lahde: 'Dietmar Rabich, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Bergville Drakensbergen Waterfall 08.jpg',
      selite: 'Puro laskee kalliokynnyksiä pitkin Bergvillen lähellä, '
        + 'taustalla jyrkänne. Drakensbergin sateet syöttävät Oranjejoen, '
        + 'joka virtaa mantereen poikki Atlantille.',
      lahde: 'Ad Meskens, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Thaba Chweu (ZA), Mac-mac River -- 2024 -- 9942.jpg',
      selite: 'Mac-Mac-joen laakso Mpumalangassa. Rinteet ovat metsän '
        + 'peitossa, koska jyrkänteen itäpuoli saa sateet ensimmäisenä.',
      lahde: 'Dietmar Rabich, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Songimvelo Nature Reserve.jpg',
      selite: 'Songimvelon luonnonsuojelualue Eswatinin rajan tuntumassa. '
        + 'Drakensbergin eteläpää on loivempaa kumpuilevaa ylänköä kuin '
        + 'pohjoisen pystyseinät.',
      lahde: 'Christian Wolkersdorfer, Wikimedia Commons (CC BY 4.0)',
    },
  ],
  himalaja: [
    {
      tiedosto: 'Sunset view of Everest.jpg',
      selite: 'Auringonlasku Mount Everestillä. Viimeinen valo osuu vain '
        + 'ylimpiin huippuihin, kun laaksot ovat jo pimeässä — Everestin '
        + 'huipun poikki kulkee Nepalin ja Kiinan raja.',
      lahde: 'Nir B. Gurung, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Aerial View of Peaks of Khumbu, Ngozumpa Glacier and Gokyo Lakes (crop).jpg',
      selite: 'Khumbun huiput ilmasta: Ngozumpa-jäätikkö kivimoreenin alla ja '
        + 'Gokyon järvet sen vieressä. Taustan jonossa ovat Everest ja Makalu, '
        + 'ja koko näkymä on Sagarmathan kansallispuistoa.',
      lahde: 'Megaurab09 / UnpetitproleX, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Annapurna Massif-IMG 5221-Pano.jpg',
      selite: 'Annapurnan vuoristo perusleiristä nähtynä: edessä Annapurna '
        + 'South ja takana Annapurna I:n eteläseinä. Ryhmässä on yksi yli '
        + 'kahdeksantuhannen metrin huippu ja kolmetoista yli seitsemän '
        + 'tuhannen.',
      lahde: 'Bijay Chaurasia, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Panorama from poonhill-2019-BJ.jpg',
      selite: 'Aamupanoraama Poon Hillistä. Vasemmalta oikealle nousevat '
        + 'Gurja, Dhaulagirin huiput, Tukche ja Nilgiri — Dhaulagiri itse '
        + 'kohoaa 8 167 metriin.',
      lahde: 'Bijay Chaurasia, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Machapuchare Himal-3797.jpg',
      selite: 'Machapuchare eli Kalanpyrstö auringonnousussa. Vuori on '
        + 'Nepalissa pyhä, eikä sen huipulle ole annettu kiipeämislupaa — se '
        + 'on yksi harvoista suurista huipuista, joilla kukaan ei ole käynyt.',
      lahde: 'Bijay Chaurasia, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Machhapuchhre or Fishtail Mountain 6,993 m (22,943 ft)- IMG 5246.jpg',
      selite: 'Machhapuchhre (6 993 m) Annapurnan perusleiristä. Nimi '
        + 'tarkoittaa kalanpyrstöä: kaksihuippuinen harja näyttää siltä '
        + 'sivusta katsottuna.',
      lahde: 'Bijay Chaurasia, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Ama Dablam, Nepal.jpg',
      selite: 'Ama Dablam luoteesta Pherichen kylän luota. Nimi tarkoittaa '
        + '"äidin kaulakorua": harjanteet ovat kädet ja rinteen riippuva '
        + 'jäätikkö se koru.',
      lahde: 'Vyacheslav Argenberg, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: '160316-031 Bridge near Tatopani.jpg',
      selite: 'Riippusilta Kali Gandakin yli Tatopanin lähellä, taustalla '
        + 'Nilgiri South (6 839 m). Kuormahevoset ovat yhä tavallinen '
        + 'kulkuneuvo siellä, minne tie ei nouse.',
      lahde: 'Faj2323, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Kagbeni Mustang-WLV-0741.jpg',
      selite: 'Kagbenin kylä Ylä-Mustangissa Kali Gandakin laaksossa. Talot '
        + 'on rakennettu kiinni toisiinsa savesta ja kivestä, koska laakson '
        + 'läpi puhaltaa päivittäin voimakas tuuli.',
      lahde: 'Bijay Chaurasia, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Everest, Himalayas.jpg',
      selite: 'Mount Everest lähikuvassa: maailman korkein vuori 8 849 '
        + 'metriin. Huipulta lähtevä lumisuihku kertoo suihkuvirtauksesta, '
        + 'joka pyyhkii harjaa suurimman osan vuodesta.',
      lahde: 'Vyacheslav Argenberg, Wikimedia Commons (CC BY 4.0)',
    },
  ],

  karakoram: [
    {
      tiedosto: 'The Mighty K2 PAkistan.jpg',
      selite: 'K2 Concordian jäätiköiden risteyksestä. Maailman toiseksi '
        + 'korkein vuori (8 611 m) on jyrkempi ja vaarallisempi kuin Everest, '
        + 'eikä sitä ole koskaan noustu talvella ilman lisähappea.',
      lahde: 'Maqsood aktar, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: "Hunza Valley, view from Eagle's Nest.jpg",
      selite: 'Hunzan laakso Gilgit-Baltistanissa Eagle\'s Nestistä nähtynä. '
        + 'Näkymässä ovat Rakaposhi, Baltitin ja Altitin linnoitukset sekä '
        + 'Hunzan ja Nagarin jokien yhtymäkohta — Silkkitien haara kulki '
        + 'tästä laaksosta.',
      lahde: 'Alllexxxis, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Aerial view of Baltoro range.jpg',
      selite: 'Baltoron jäätikkö ilmasta. Tummat juovat ovat moreenia eli '
        + 'jäätikön kuljettamaa kiviainesta, ja niiden mutkista näkee, miten '
        + 'sivujäätiköt liittyvät päävirtaan.',
      lahde: 'Tariq hameed sulemani, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Biafo hisper glaciers , baltoro , pakistan.jpg',
      selite: 'Biafon ja Hisparin jäätiköt kohtaavat. Yhdessä ne muodostavat '
        + 'yli sadan kilometrin jäätie, joka on napa-alueiden ulkopuolen '
        + 'pisimpiä.',
      lahde: 'Tariq hameed sulemani, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Broad Peak and K2.jpg',
      selite: 'Broad Peak ja K2 matkalla K2:n perusleiriin. Neljä '
        + 'kahdeksantuhattametristä huippua on täällä muutaman kymmenen '
        + 'kilometrin säteellä.',
      lahde: 'Sallahuddin shah, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Western Karakorams Aerial View.jpg',
      selite: 'Läntinen Karakoram ilmasta. Etualan harjanne kuuluu vielä '
        + 'Himalajaan, ja niiden välissä kulkee Indusjoen laakso — takana '
        + 'oleva jono on Rakaposhi-Haramoshin harjanne.',
      lahde: 'Moiz Ismaili, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Sunset in mountains of Pakistan.jpg',
      selite: 'Auringonlasku Paun vuorilla Skardun lähellä. Säteet lähtevät '
        + 'harjanteen takaa viuhkana, kun laakso on jo varjossa.',
      lahde: 'Muhammad Nazir Baltistani, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Goma Village, Ghanche, Gilgit and Baltistan, Pakistan.JPG',
      selite: 'Ilta Goman kylässä Ghanchen piirikunnassa juuri ennen talven '
        + 'tuloa. Kylät ovat laaksonpohjissa, koska ylempänä ei kasva mitään.',
      lahde: 'Abrarwyne, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Karakoram2 K2.jpg',
      selite: 'Baltoron jäätikkö ja sen takana K2 keskellä, Broad Peak '
        + 'oikealla. Jäätikön pinta on lumen alla railoinen, ja reitti sen '
        + 'yli on merkittävä joka kevät uudelleen.',
      lahde: 'Abbas Shah1, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'The Wildlife of Karakoram.jpg',
      selite: 'Jakki jäätyneen puron yläpuolella Khunjerabin lähellä. Jakki '
        + 'on Karakoramin kuormajuhta: se kestää ohuen ilman korkeuksissa, '
        + 'joissa hevonen ei enää kulje.',
      lahde: 'Tanzeel Khan, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  hindukush: [
    {
      tiedosto: 'Tirich Mir and Falakser Peaks (Aerial).jpg',
      selite: 'Tirich Mir (vasemmalla takana), Falaksar ja Istor-o-Nal '
        + 'ilmasta. Tirich Mir on Hindukushin korkein huippu, 7 708 metriä, '
        + 'ja se näkyy selkeällä säällä Chitralin kaupunkiin asti.',
      lahde: 'Khankayani512, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Hindukush Mountains near Chitral.jpg',
      selite: 'Hindukush Bumburetin laaksosta Chitralin piirikunnassa. '
        + 'Laakso on yksi kolmesta Kalash-laaksosta, joissa asuu oma '
        + 'kansansa omine tapoineen.',
      lahde: 'Zeeshan-ul-hassan Usmani, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'NO-NB BLDSA GM2b101n.jpg',
      selite: 'Näkymä Dorahin solasta alas Chitralin puolelle vuonna 1929. '
        + 'Sola on 4 400 metrissä, ja se oli pitkään yksi harvoista '
        + 'kulkukelpoisista teistä Afganistanin ja Brittiläisen Intian '
        + 'välillä.',
      lahde: 'Georg Morgenstierne, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'Hindukush Mountains Range.jpg',
      selite: 'Lumen täyttämä kattilalaakso Hindukushissa. Rinteiden juovat '
        + 'ovat lumivyöryjen uria: ne pysyvät puuttomina, koska vyöry '
        + 'toistuu joka talvi samassa kohdassa.',
      lahde: 'Zeeshan-ul-hassan Usmani, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Buildings in Panjshir Province, Afghanistan.JPG',
      selite: 'Taloryhmä kalliolla joen toisella puolella Panjshirin '
        + 'laaksossa Afganistanissa. Laakso on Hindukushin sisällä oleva '
        + 'käytävä, jonne pääsee käytännössä vain yhtä kapeaa solaa pitkin.',
      lahde: 'Teddy Wade, U.S. Army, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'Kiss Of Peaks.jpg',
      selite: 'Kohta, jossa kolme suurta vuoristoa kohtaa Gilgit-'
        + 'Baltistanissa: oikealla Himalaja, keskellä Karakoram ja '
        + 'vasemmalla Hindukush.',
      lahde: 'Drroomanulhaq, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Branches of the Kunar River meet in Kunar Province.jpg',
      selite: 'Kunarjoen haarat yhtyvät helikopterista nähtynä. Joki tuo '
        + 'Hindukushin sulamisvedet alas Kabuljokeen ja edelleen Indukseen.',
      lahde: 'Teddy Wade, U.S. Army, Wikimedia Commons (PD)',
    },
  ],

  pamir: [
    {
      tiedosto: 'Lake Karakul.jpg',
      selite: 'Karakul-järvi kaakosta nähtynä Vuoristo-Badahšanissa. Järvi '
        + 'on syntynyt meteoriitin törmäyskuoppaan lähes 4 000 metrin '
        + 'korkeuteen, ja sen vesi on suolaista.',
      lahde: 'Benoît Vicart, Wikimedia Commons (CC0)',
    },
    {
      tiedosto: 'Ak-Baital Pass.jpg',
      selite: 'Ak-Baitalin sola (4 655 m) Pamirin valtatiellä. Se on koko '
        + 'entisen Neuvostoliiton korkein autotie, ja kyltti kertoo '
        + 'korkeuden metreinä.',
      lahde: 'Benoît Vicart, Wikimedia Commons (CC0)',
    },
    {
      tiedosto: 'Timeless..... (21534381075).jpg',
      selite: 'Aamuaurinko osuu rotkon seinään Pamirin solmun reunalla. '
        + 'Joki on leikannut uomansa suoraan kallioon, eikä laaksoon mahdu '
        + 'muuta kuin vesi.',
      lahde: 'lensnmatter, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Cheval Sarhad-e Broghil.jpg',
      selite: 'Hevonen laitumella Sarhad-e Broghilissa Wakhanin käytävässä '
        + 'Afganistanissa. Käytävä on kapea kaistale, joka erotti aikoinaan '
        + 'Venäjän ja Brittiläisen Intian toisistaan.',
      lahde: 'Benoît Vicart, Wikimedia Commons (CC0)',
    },
    {
      tiedosto: 'Jizew valley river and bridge.jpg',
      selite: 'Riippusilta joen yli Jizewin laaksossa Tadžikistanissa. '
        + 'Laaksoon ei tule tietä, joten kylään kuljetaan polkua pitkin ja '
        + 'tavarat kannetaan.',
      lahde: 'Vicartb, Wikimedia Commons (CC0)',
    },
    {
      tiedosto: 'Pamir001.JPG',
      selite: 'Pamirin lumihuiput vihreän ylängön takana. Ylätasanko on '
        + 'itsessään yli 3 500 metrissä, joten huiput näyttävät matalammilta '
        + 'kuin ovat.',
      lahde: 'BorisMir, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Panj river landscape.jpg',
      selite: 'Panjjoen laakso Pamirin valtatien varrella. Joki on '
        + 'Tadžikistanin ja Afganistanin raja, ja molemmilla rannoilla '
        + 'kulkee oma polkunsa.',
      lahde: 'Benoît Vicart, Wikimedia Commons (CC0)',
    },
  ],

  tienshan: [
    {
      tiedosto: 'Tian Shan in Kyrgyzstan 02.jpg',
      selite: 'Karjaa Tienšanin laitumilla Karakolin lähellä Kirgisiassa. '
        + 'Takana nousevat lumihuiput: laidun on syksyllä kuivaa ruskeaa, '
        + 'vaikka jää alkaa muutaman kilometrin päästä.',
      lahde: 'Bgag, Wikimedia Commons (CC0)',
    },
    {
      tiedosto: 'Bayanbulak grassland.jpg',
      selite: 'Bayanbulakin aro Tienšanin sisällä. Joki mutkittelee '
        + 'tasangolla niin loivasti, että se kääntyy silmukoille — vuoret '
        + 'pidättävät veden ylängölle sen sijaan että päästäisivät sen alas.',
      lahde: 'Srr, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Panorama of the Too Ashuu Pass, Kyrgyz Alatau, Kyrgyzstan 02.jpg',
      selite: 'Too-Ašuun sola Kirgisian Alataussa. Solan yli kulkee '
        + 'Biškekin ja Oshin välinen tie, ja lumi säilyy varjopuolella '
        + 'pitkälle kesään.',
      lahde: 'Vilya Shoni, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Kol-Tor flowers 22.jpg',
      selite: 'Kol-Torin järvi 2 733 metrin korkeudessa. Vesi saa värinsä '
        + 'jäätikön hiomasta kivijauheesta, joka jää veteen leijumaan.',
      lahde: 'Guliaim Aiylchy, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Glacier - panoramio - Michael Karavanov.jpg',
      selite: 'Jäätikkö Tienšanissa. Vuoristossa on tuhansia jäätiköitä, ja '
        + 'niiden sulamisvesi on Keski-Aasian kuivien tasankojen tärkein '
        + 'vesivarasto.',
      lahde: 'Michael Karavanov, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Работа гляциологов на леднике Абрамова (Тянь-Шань) - 1.jpg',
      selite: 'Jäätikkötutkijoita Abramovin jäätiköllä vuonna 1976. Tuuli on '
        + 'kasannut lumesta terävän harjanteen, jonka reunalla mies seisoo '
        + 'mittaamassa.',
      lahde: 'Aleksei Aleksandrovitš Vasiljev, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Teil des zentralen Tian-Schan.jpg',
      selite: 'Keskisen Tienšanin panoraama Gottfried Merzbacherin '
        + 'tutkimusretken julkaisusta. Piirros on tehty juuri niiltä '
        + 'vuosilta, jolloin eurooppalaiset kartoittivat vuoristoa '
        + 'ensimmäisen kerran.',
      lahde: 'Gottfried Merzbacher, Wikimedia Commons (PD)',
    },
  ],

  alpit: [
    {
      tiedosto: 'Tofana di Rozes parete sud Dolomiti Ampezzo.jpg',
      selite: 'Tofana di Rozesin eteläseinä Ampezzon Dolomiiteilla. Dolomiitit '
        + 'ovat muinaisen korallimeren kalkkikiveä, joka on kohonnut '
        + 'pystyseiniksi kilometrien korkeuteen.',
      lahde: 'Wolfgang Moroder, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Tofana di Rozes 5.jpg',
      selite: 'Panoraama Averaulta: Tofana di Rozes, Cinque Torrin tornit ja '
        + 'Nuvolau. Cinque Torri oli ensimmäisessä maailmansodassa rintamalinja, '
        + 'ja kallioissa on yhä juoksuhautoja.',
      lahde: 'kallerna, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Lac de Roy 10.jpg',
      selite: 'Lac de Roy Haute-Savoiessa. Alppien pikkujärvet ovat jääkauden '
        + 'jättämiä kuoppia, joihin sulamisvesi jää seisomaan.',
      lahde: 'Krzysztof Golik, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Steinbock 14962940265.jpg',
      selite: 'Alppikauris Hohe Tauernin kansallispuistossa Itävallassa. Laji '
        + 'oli 1800-luvulla metsästetty lähes sukupuuttoon: jäljellä oli '
        + 'muutama sata eläintä, joista kaikki nykyiset polveutuvat.',
      lahde: 'Bernd Thaller, Wikimedia Commons (CC BY-SA 3.0 AT)',
    },
    {
      tiedosto: 'Lac de Montriond 06.jpg',
      selite: 'Montriond-järvi aamun tyynessä, taustalla Roc d\'Enfer. Järvi '
        + 'syntyi maanvyörymästä, joka tukki laakson.',
      lahde: 'Krzysztof Golik, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Cappella Passo Falzarego Sass Stria.jpg',
      selite: 'Kappeli Falzaregon solassa ja sen takana Sass de Strian huippu. '
        + 'Alppien soliin on rakennettu kappeleita niille, jotka lähtivät '
        + 'ylitykseen tietämättä, pääsevätkö perille.',
      lahde: 'Wolfgang Moroder, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Overview of Les Menuires and the Belleville valley.jpg',
      selite: 'Belleville-laakso ja Les Menuires\'n hiihtokaupunki talvella. '
        + 'Alpeilla vuoristo ei tyhjene talveksi vaan täyttyy — matkailu on '
        + 'kääntänyt vuodenajat päinvastoin kuin muualla vuoristossa.',
      lahde: 'DimiTalen, Wikimedia Commons (CC0)',
    },
    {
      tiedosto: 'Bad Hindelang panorama view from south.jpg',
      selite: 'Ostrachin laakso Bad Hindelangin kohdalla Baijerin Alpeilla. '
        + 'Laaksonpohja on niittyä ja kylää, rinteet metsää — jako on sama '
        + 'kaikkialla Alpeilla.',
      lahde: 'Jürgen Matern, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Averau Forcella Averau Croda Negra.jpg',
      selite: 'Croda Negra, Lagazuoi ja Falzaregon sola Averaun solasta '
        + 'nähtynä. Hiihtoladut kulkevat samoja reittejä, joita pitkin karja '
        + 'nousi kesälaitumille.',
      lahde: 'Wolfgang Moroder, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: "Pointe de Nyon & Pointe d'Angolon (12).jpg",
      selite: 'Pointe de Nyon (2 019 m) ja Pointe d\'Angolon (2 090 m) '
        + 'Morzinen kunnassa. Polku kiertää rinnettä vinosti, koska suoraan '
        + 'ylös ei pääse kuormaa kantaen.',
      lahde: 'Krzysztof Golik, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  apenniinit: [
    {
      tiedosto: 'Gran sasso visto da Rocca Calascio.jpg',
      selite: 'Rocca Calascion linnanraunio ja sen takana Gran Sasso '
        + 'talvi-illassa. Linna vartioi 1200-luvulta lähtien lammaslaumojen '
        + 'vaellusreittiä ylängöltä rannikolle.',
      lahde: 'Rabih omeiri, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Panorama Gran Sasso 2017.jpg',
      selite: 'Gran Sasso Campo Imperatoren ylängöltä maaliskuussa. Corno '
        + 'Grande (2 912 m) on Apenniinien korkein huippu, ja sen rinteellä '
        + 'on Euroopan eteläisin jäätikkö.',
      lahde: 'kallerna, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Lago di Pietranzoni - vista corno grande.jpg',
      selite: 'Pietranzonin lampi ja Corno Grande sen takana. Ylänkö on '
        + 'karstimaata: sadevesi katoaa kallioon, ja lampia on vain siellä '
        + 'missä pohja on tiivis.',
      lahde: 'Rabih omeiri, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Campo Imperatore with il Corno Grande in the background - Gran Sasso.jpg',
      selite: 'Campo Imperatoren ylätasanko keväällä. Tasankoa on kutsuttu '
        + '"Italian pikku-Tiibetiksi": se on parikymmentä kilometriä pitkä, '
        + 'lähes puuton ja tyhjä.',
      lahde: 'Bouke ten Cate, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Parco Nazionale del Gran Sasso e Monti della Laga, Campo Imperatore, Cavalli si abbeverano al Laghetto Pietranzoni.jpg',
      selite: 'Hevoset juovat Pietranzonin lammella. Campo Imperatorella '
        + 'laiduntaa yhä vapaana kulkevia hevosia ja lampaita, kuten '
        + 'vuosisatoja aiemmin.',
      lahde: 'Laura Bertonazzi, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Parco Nazionale del Gran Sasso e Monti della Laga, Campo Imperatore, Cavalli al Laghetto Pietranzoni.jpg',
      selite: 'Hevoslauma sumun laskeutuessa Campo Imperatorelle. Ylängön sää '
        + 'vaihtuu nopeasti, koska se on korkealla mutta lähellä merta.',
      lahde: 'Laura Bertonazzi, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Galactic Arc on Pietranzoni Lake.jpg',
      selite: 'Linnunrata Pietranzonin lammen yllä kesäyönä. Ylängöllä ei ole '
        + 'asutusta eikä valoja, joten tähtitaivas näkyy kuten ennen '
        + 'sähkövalon aikaa.',
      lahde: 'Alessandro Ziantoni, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  kamtshatka: [
    {
      tiedosto: 'Курильское озеро 347.jpg',
      selite: 'Kurilskoje-järvi ja Iljinskin tulivuori Kamtšatkan '
        + 'eteläosassa. Kartio on lähes täydellisen symmetrinen, koska se on '
        + 'rakentunut kerroksittain samasta aukosta.',
      lahde: 'Olga Kostjutšenko, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Three Volcanoes-ElizovskyDistrict-Russia.jpg',
      selite: 'Kolme tulivuorta Jelizovon piirissä. Etualan musta hiekka on '
        + 'purkausten tuhkaa, ja lammikot ovat sulaneen lumen jättämiä.',
      lahde: 'Kozintsev, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Корякский, Авачинский, Козельский.jpg',
      selite: 'Korjakski, Avatšinski ja Kozelski peilautuvat tyyneen veteen. '
        + 'Nämä kolme kohoavat Petropavlovskin kaupungin takana, ja '
        + 'Avatšinski on yksi niemimaan aktiivisimmista.',
      lahde: 'Kozintsev, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Долина гейзеров (2018).jpg',
      selite: 'Geysirien laakso Kronotskin luonnonpuistossa. Laakso '
        + 'löydettiin vasta 1941, ja se on Islannin ulkopuolella maailman '
        + 'suurimpia geysiralueita.',
      lahde: 'Malupasic, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Кальдера Узона.jpg',
      selite: 'Uzonin kaldera: kymmenen kilometrin levyinen romahtanut '
        + 'tulivuoren huippu, jonka pohjalla on kiehuvia lampia ja '
        + 'väripintaisia savikenttiä.',
      lahde: 'Rost.galis, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Термальное поле на Узоне.jpg',
      selite: 'Uzonin terminen kenttä ylhäältä. Värit tulevat rikistä, '
        + 'raudasta ja bakteereista, jotka elävät kiehuvassa vedessä.',
      lahde: 'Rost.galis, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Озеро Банное на Узоне.jpg',
      selite: 'Bannoje-järvi Uzonin kalderassa. Järven pohjalla on sulaa '
        + 'rikkiä, ja vesi on happamampaa kuin etikka.',
      lahde: 'Rost.galis, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Туристы изучают следы вулканической активности.jpg',
      selite: 'Retkeilijöitä höyryävällä kentällä Kronotskin '
        + 'luonnonpuistossa. Puistoon pääsee vain helikopterilla ja '
        + 'saattajan kanssa.',
      lahde: 'Rost.galis, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  pyreneet: [
    {
      tiedosto: 'Panoramic view of the mountain.jpg',
      selite: 'Ordesan laakso Monte Perdidon kansallispuistossa. Laakso on '
        + 'jäätikön kaivertama U-muotoinen uoma, jonka seinät nousevat '
        + 'tuhannen metrin kalkkikiviportaina.',
      lahde: 'Raquelalcaine, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Ordesa desde Calcilarruego - panoramio.jpg',
      selite: 'Ordesan laakso Calcilarruegon kalliolta nähtynä. Reunapolku '
        + 'kulkee jyrkänteen päällä, ja laakson pohja on lähes kilometrin '
        + 'alempana.',
      lahde: 'Pintafontes Senapeli, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Chorreando.jpg',
      selite: 'Lumipeitteinen huippu Ordesan laakson yläpuolella maaliskuussa. '
        + 'Pyreneet ovat kapea muuri Ranskan ja Espanjan välissä, ja lumi '
        + 'sulkee sen solat talveksi.',
      lahde: 'Patisalva, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Parque nacional de Ordesa y Monte Perdido, Huesca, España, 2015-01-07, DD 01.JPG',
      selite: 'Monte Perdidon massiivi talvella Huescan maakunnassa. Monte '
        + 'Perdido on Euroopan korkein kalkkikivivuori, 3 355 metriä.',
      lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Parque nacional de Ordesa y Monte Perdido, Huesca, España, 2015-01-07, DD 02.JPG',
      selite: 'Kalkkikiviseinä ja sen alla metsäinen rinne. Vaakasuorat '
        + 'kerrokset ovat merenpohjan kalkkia, jonka mannerlaattojen törmäys '
        + 'nosti pystyyn.',
      lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Desde el valle de Ordesa.jpg',
      selite: 'Syksyn värit Ordesan laaksossa. Puisto on Espanjan '
        + 'vanhimpia — perustettu 1918 — ja kuuluu Unescon '
        + 'maailmanperintöluetteloon.',
      lahde: 'Javier Ripoll, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  karpaatit: [
    {
      tiedosto: 'Скелі Свидовець.jpg',
      selite: 'Blyznytsjan kalliot Svydovetsin ylängöllä Ukrainan '
        + 'Karpaateilla. Harjanteen laki on puutonta niittyä, jota on '
        + 'laidunnettu kesäisin vuosisatoja.',
      lahde: 'Nata Mostova, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Полонина Пожижевська.jpg',
      selite: 'Pozjyzjevskan tunturiniitty Tšornohoran harjanteella. '
        + 'Karpaateilla tällaista laidunta kutsutaan polonynaksi, ja '
        + 'paimenet nousevat sinne karjan kanssa juhannuksen tienoilla.',
      lahde: 'Nata Mostova, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Брескул.jpg',
      selite: 'Breskulin huippu Tšornohoran harjanteella talven jäljiltä. '
        + 'Karpaatit ovat matalammat kuin Alpit, mutta yhtenäinen kaari '
        + 'ulottuu Wienistä Romanian halki lähes 1 500 kilometriä.',
      lahde: 'Nata Mostova, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Будинок в горах.jpg',
      selite: 'Yksinäinen talo vuoristoniityllä usvan noustessa metsästä. '
        + 'Karpaattien kylät ovat hajallaan rinteillä, koska laaksonpohja on '
        + 'kapea eikä sinne mahdu peltoa kaikille.',
      lahde: 'Anatolij Volkov, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  skandit: [
    {
      tiedosto: 'View from a ridge between Segla and Hesten, Senja, Norway, 2014 August.jpg',
      selite: 'Näkymä Seglan ja Hestenin väliseltä harjanteelta Senjassa. '
        + 'Vasemmalla on Øyfjorden, oikealla Mefjorden — Skandien luoteisreuna '
        + 'putoaa mereen jyrkkänä eikä jätä rannikkotasankoa lainkaan.',
      lahde: 'Simo Räsänen, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Isterdalen from above Stigfossen, Rauma, Møre og Romsdal, Norway, 2025 May.jpg',
      selite: 'Isterdalen ja Trollstigenin mutkat Stigfossenin yläpuolelta. '
        + 'Tie nousee laakson päästä yhdellätoista neulansilmämutkalla, ja se '
        + 'on auki vain kesäkuukaudet.',
      lahde: 'Simo Räsänen, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Geirangerfjord from Ørnesvingen, 2013 June.jpg',
      selite: 'Geirangervuono Ørnesvingenistä nähtynä. Vuono on jääkauden '
        + 'kaivertama laakso, jonka meri valtasi jään sulettua — pohja on '
        + 'paikoin syvemmällä kuin sen suulla.',
      lahde: 'Simo Räsänen, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'View to Romsdalen from Litlefjellet, 2013 June.jpg',
      selite: 'Romsdalen Litlefjelletin harjanteelta. Laakson seinämät ovat '
        + 'Euroopan korkeimpia pystysuoria kalliopintoja, ja pohjalla '
        + 'mutkittelee Rauma-joki.',
      lahde: 'Simo Räsänen, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'From Tennfjorden towards Raftsundet, Hinnøya, Norway, 2015 September - 4.jpg',
      selite: 'Tennfjorden ja sen takana Austvågøyan vuoret, joukossa '
        + 'Trolltindanin ryhmä. Vuonojen välissä liikutaan yhä veneellä, '
        + 'koska maitse kierto olisi kymmeniä kilometrejä.',
      lahde: 'Simo Räsänen, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Djupfjorden, 2010 09.jpg',
      selite: 'Djupfjorden Moskenesøyalla Lofooteilla syyskuussa. Tyyni vesi '
        + 'ja jyrkät huiput ovat Lofoottien tavallinen näkymä: saaret ovat '
        + 'käytännössä merestä nousevia vuoria.',
      lahde: 'Simo Räsänen, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Mountain massif of Fjølhaugen at Knutevika in Senja, Troms, Norway, 2015 September.jpg',
      selite: 'Fjølhaugenin vuorimassiivi Senjassa syksyn väreissä. Oikealla '
        + 'oleva lahti Knutevika kuuluu Mefjordeniin.',
      lahde: 'Simo Räsänen, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Torkilstöten Panorama Jule 2013.jpg',
      selite: 'Helags (vasemmalla) ja Sylarna Torkilstötenistä nähtynä '
        + 'Ruotsin puolella. Helagsilla on Skandien eteläisin jäätikkö, ja '
        + 'sen ympärillä on pelkkää tunturikangasta.',
      lahde: 'Arild Vågen, Wikimedia Commons (CC BY-SA 3.0)',
    },
  ],

  taurusvuoret: [
    {
      tiedosto: 'J22 319 D696, Taurusquerung.jpg',
      selite: 'Tie kiertää Taurusvuorten yli maaliskuisessa lumessa. Vuoristo '
        + 'erottaa Anatolian ylängön Välimeren rannikosta, ja sen solat ovat '
        + 'olleet armeijoiden ja kauppiaiden tie tuhansia vuosia.',
      lahde: 'Falk2, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Taurus mountains - Toros Dağları 06.jpg',
      selite: 'Taurusvuorten lumihuiput tummien kukkuloiden takana. Kevään '
        + 'sulamisvedet katoavat kalkkikiveen ja purkautuvat alempaa '
        + 'lähteinä — vuoristo on täynnä luolia.',
      lahde: 'Zeynel Cebeci, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Taurus mountains - Toros Dağları 07.jpg',
      selite: 'Laaja laakso Taurusvuorten juurella. Ylängöllä on laidunnettu '
        + 'kesäisin vuosisatoja: karja nousee lumen sulettua ja laskeutuu '
        + 'takaisin syksyllä.',
      lahde: 'Zeynel Cebeci, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Taurus mountains - Toros Dağları 04.jpg',
      selite: 'Lumiraja Taurusvuorilla huhtikuussa. Alarinteillä on jo '
        + 'kevät, kun harjanne on yhä valkoinen.',
      lahde: 'Zeynel Cebeci, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Taurus mountains - Toros Dağları 13.jpg',
      selite: 'Punamultainen rinne ja sen takana Taurusvuorten lumipeitteinen '
        + 'harja. Maa on täällä ohutta, ja kivi tulee esiin heti pintakerroksen '
        + 'alta.',
      lahde: 'Zeynel Cebeci, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  verhojansk: [
    {
      tiedosto: 'Verkhoyansk Range, Republic of Sakha (Yakutia), Russia - 2019.jpg',
      selite: 'Verhojanskin vuoristo helmikuussa ilmasta nähtynä. Aurinko käy '
        + 'talvella niin matalalla, että se värjää harjanteet punaisiksi '
        + 'keskellä päivää.',
      lahde: 'Ilja Varlamov, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Verkhoyansk Range, Republic of Sakha (Yakutia), Russia - 2-2019.jpg',
      selite: 'Kultainen valo Verhojanskin harjanteilla. Jonon takana on '
        + 'Ojmjakonin laakso, maailman kylmin asuttu paikka — pakkanen on '
        + 'käynyt alle 67 asteessa.',
      lahde: 'Ilja Varlamov, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Verkhoyansk Range, Republic of Sakha, Russia - 2019.jpg',
      selite: 'Verhojanskin jono jatkuu horisonttiin asti. Vuoristo kaartaa '
        + 'yli tuhat kilometriä Lenan suulta etelään eikä sen läpi kulje '
        + 'yhtään ympärivuotista tietä.',
      lahde: 'Ilja Varlamov, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Yakutia - DSC 6072.jpg',
      selite: 'Lumen peittämiä selänteitä Jakutiassa. Lunta on vähän — '
        + 'sisämaassa sataa niukasti — mutta se ei sula puoleen vuoteen.',
      lahde: 'Ilja Varlamov, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Yakutia - DSC 6186.jpg',
      selite: 'Iltavalo Verhojanskin harjanteilla. Rinteet ovat puuttomia: '
        + 'ikirouta ei päästä juuria syvälle, ja metsä loppuu jo matalalla.',
      lahde: 'Ilja Varlamov, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Yakutia - DSC 6035.jpg',
      selite: 'Yksinäinen kukkula pakkasusvassa. Kylmä ilma valuu laaksoihin '
        + 'ja jää sinne, joten laaksonpohja on kylmempi kuin rinteen laki.',
      lahde: 'Ilja Varlamov, Wikimedia Commons (CC BY-SA 3.0)',
    },
  ],

  'lansi-ghatit': [
    {
      tiedosto: 'A beautiful scenic view of the western ghats during golden hour.jpg',
      selite: 'Länsi-Ghatit sinisinä kerroksina aamu-usvan yllä. Vuoristo '
        + 'pysäyttää lounaismonsuunin, ja sen länsirinteille sataa moninkertaisesti '
        + 'enemmän kuin sisämaahan.',
      lahde: 'Sreerag Santhosh, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Landscapes of Western Ghats from Mullayyanagiri Betta.jpg',
      selite: 'Metsäisiä kukkuloita Mullayanagirin huipulta. Länsi-Ghatit on '
        + 'yksi maailman kahdeksasta kuumimmasta monimuotoisuuskeskuksesta: '
        + 'sen lajeista suuri osa ei elä missään muualla.',
      lahde: 'iMahesh, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Jog Falls Karnataka India.jpg',
      selite: 'Jogin putoukset Karnatakassa. Sharavathi-joki putoaa Ghattien '
        + 'reunalta neljänä haarana yli kahdensadan metrin syvyyteen — '
        + 'täysillään vain monsuunin aikaan.',
      lahde: 'Naveen R Gowda, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Bhuibawada Ghat Hill.jpg',
      selite: 'Bhuibawadan ghattikukkula Maharashtrassa. Ghatit ovat '
        + 'jyrkkäreunainen porras: ylhäällä on tasankoa, alhaalla '
        + 'rannikkokaistale, ja väliin jää lähes pystysuora rinne.',
      lahde: 'Contributers2020, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Beauty of western ghats.jpg',
      selite: 'Vihreä ylätasanko Länsi-Ghateilla sadekauden jälkeen. Ruoho '
        + 'kasvaa kalliopinnan päälle ohuen maakerroksen varassa.',
      lahde: 'Sundaram Perumal, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  'japanin-alpit': [
    {
      tiedosto: 'Hida Mountains Panorama (53622323610).jpg',
      selite: 'Hidan vuoret eli Pohjoiset Japanin Alpit talvella. Etualan '
        + 'kuuset ovat huurteessa, ja harjanteen takana on yli kolmen '
        + 'kilometrin korkuisia huippuja.',
      lahde: 'Raita Futo, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Lake Kurobe01s4592.jpg',
      selite: 'Kurobejärvi lumiseinien keskellä. Järvi on Japanin korkeimman '
        + 'padon takana, ja sen ympäri kulkeva vuoristoreitti aukeaa vasta '
        + 'kun lumi on aurattu käytäviksi.',
      lahde: '663highland, Wikimedia Commons (CC BY 2.5)',
    },
    {
      tiedosto: 'Morning in the Japanese Alps (51832001344).jpg',
      selite: 'Aamu Japanin Alpeilla: harjanne nousee sumumeren yläpuolelle. '
        + 'Nimen antoivat 1800-luvun lopulla brittiläiset insinöörit, joiden '
        + 'mielestä vuoret muistuttivat Alppeja.',
      lahde: 'Raita Futo, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Autumn in Japan Alps (52489399522).jpg',
      selite: 'Syksyn punaista pensaikkoa Japanin Alpeilla. Ruska nousee '
        + 'vuorilla ensin ja laskeutuu sitten viikko viikolta alemmas.',
      lahde: 'Raita Futo, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Morning in the Japanese Alps (51831767043).jpg',
      selite: 'Terävä harjanne aamuvalossa. Japanin Alpit ovat nuoret ja '
        + 'jyrkät, ja jääkauden jäätiköt ovat kaivertaneet niihin '
        + 'kattilalaaksoja.',
      lahde: 'Raita Futo, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Autumn in Japan alps (52460317999).jpg',
      selite: 'Syksyinen tunturikangas pilven reunalla. Puuraja jää Japanin '
        + 'Alpeilla noin 2 500 metriin, ja sen yläpuolella kasvaa vain '
        + 'matalaa varpua.',
      lahde: 'Raita Futo, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Koumi-line Series110.jpg',
      selite: 'Koumin radan juna vuoristoniityn laidalla. Rata on Japanin '
        + 'korkeimmalle nouseva tavallinen rautatie, ja se kiertää Alppien '
        + 'itäpuolta.',
      lahde: 'MaedaAkihiko, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  'tiibetin-ylatasanko': [
    {
      tiedosto: 'Tibet, panorámicas (1999) 05.jpg',
      selite: 'Tiibetin ylätasanko Lalungin solassa. Teltta ja sen ympärillä '
        + 'laiduntavat jakit ovat koko näkymän ainoa merkki ihmisestä — '
        + 'ylätasanko on lähes puuton ja lähes tyhjä.',
      lahde: 'LBM1948, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Tibet, panorámicas (1999) 03.jpg',
      selite: 'Yamdrokjärvi, yksi Tiibetin kolmesta pyhästä järvestä. Vesi on '
        + 'suolaista eikä laske mihinkään jokeen: ylätasangolla sade jää '
        + 'altaisiin ja haihtuu.',
      lahde: 'LBM1948, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Tibet, panorámicas (1999) 04.jpg',
      selite: 'Nyenchen Kangsan jäätikkö Karon solasta nähtynä. Ylätasangon '
        + 'jäätiköt ruokkivat Aasian suuria jokia — Induksen, Mekongin ja '
        + 'Jangtsen latvat ovat kaikki täällä.',
      lahde: 'LBM1948, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Landscape of Tibet1.jpg',
      selite: 'Vihreä laakso ylätasangolla kesällä. Ruoho kasvaa vain '
        + 'muutaman viikon, ja koko paimentolaisten vuosi on rakennettu sen '
        + 'ympärille.',
      lahde: 'Antoine Taveneaux, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Nagarze, Shannan, Tibet, China - panoramio (10).jpg',
      selite: 'Kiviröykkiö järven rannassa Nagarzessa. Matkalainen lisää '
        + 'kiven kulkiessaan ohi — tapa on ylätasangolla vanha ja yhä '
        + 'elävä.',
      lahde: 'Chen Zhi, Wikimedia Commons (CC BY 3.0)',
    },
    {
      tiedosto: 'Baxoi, Qamdo, Tibet, China - panoramio (1).jpg',
      selite: 'Serpentiinitie kiemurtelee laaksoon Baxoissa Itä-Tiibetissä. '
        + 'Ylätasangon reunalla korkeusero laaksonpohjaan on kilometrejä, '
        + 'joten tie ei voi laskeutua suoraan.',
      lahde: 'christiali, Wikimedia Commons (CC BY 3.0)',
    },
  ],

  kunlun: [
    {
      tiedosto: '格尔木 青藏铁路与玉珠峰雪山 01.jpg',
      selite: 'Kameleita Yuzhu-huipun edustalla Golmudin lähellä. Kunlun on '
        + 'Taklamakanin autiomaan eteläreuna, ja Silkkitien eteläinen haara '
        + 'kulki juuri näiden vuorten juurta.',
      lahde: 'Liuxingy, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: '格尔木 青藏铁路与玉珠峰雪山 02.jpg',
      selite: 'Yuzhu-huipun jäätiköt ja niiden alla kulkeva Qinghai–Tiibet-'
        + 'rautatie. Rata nousee yli 5 000 metriin, ja se on rakennettu '
        + 'ikiroudan päälle.',
      lahde: 'Liuxingy, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: '格尔木 在小干沟桥之南的青藏公路上望向两侧昆仑山 02.jpg',
      selite: 'Kunlunin kuluneet rinteet Qinghai–Tiibet-tien varrella. Sade '
        + 'on täällä harvinaista, joten rinteitä muokkaa tuuli ja lumen '
        + 'sulaminen — ei virtaava vesi.',
      lahde: 'Liuxingy, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: '治多 在青藏公路沿线可可西里遥望昆仑山雪山 07.jpg',
      selite: 'Kunlunin lumihuiput Hoh Xilin autiotasangon takaa. Väli on '
        + 'kymmeniä kilometrejä tyhjää ylänköä, ja siksi vuoret näyttävät '
        + 'matalilta.',
      lahde: 'Liuxingy, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: '格尔木 在青藏公路纳赤台至五十三道班间望向昆仑山.jpg',
      selite: 'Kunlun Qinghai–Tiibet-tieltä Nachitain ja 53. tienhoitoaseman '
        + 'väliltä. Tie nousee vuoriston yli Golmudista Lhasaan.',
      lahde: 'Liuxingy, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  elburz: [
    {
      tiedosto: 'CH-NB - Persien, Elburs-Gebirge (Elburz)- Landschaft - Annemarie Schwarzenbach - SLA-Schwarzenbach-A-5-06-150.jpg',
      selite: 'Lumen peittämä Damavand 1930-luvulla. Iranin korkein huippu '
        + '(5 610 m) on tulivuori, ja se näkyy selkeällä säällä Teheraniin '
        + 'asti.',
      lahde: 'Annemarie Schwarzenbach, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'CH-NB - Persien, Elburs-Gebirge (Elburz)- Strassenszene - Annemarie Schwarzenbach - SLA-Schwarzenbach-A-5-04-041.jpg',
      selite: 'Kuormatut aasit ja niiden ajaja vuoristotiellä 1930-luvun '
        + 'alussa, taustalla auto. Kuva on juuri siitä hetkestä, kun '
        + 'moottoriajoneuvot tulivat karavaanien rinnalle.',
      lahde: 'Annemarie Schwarzenbach, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'CH-NB - Persien, Elburs-Gebirge (Elburz)- Reiten - Annemarie Schwarzenbach - SLA-Schwarzenbach-A-5-06-193.jpg',
      selite: 'Ratsastajia Elburzin rinteillä vuonna 1935. Ennen teitä '
        + 'vuoriston yli kuljettiin hevosella, ja matka Kaspianmeren '
        + 'rannalta Teheraniin kesti päiviä.',
      lahde: 'Annemarie Schwarzenbach, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'Baladeh View - panoramio.jpg',
      selite: 'Elburzin lumiharjanne Baladehin yllä. Vuoristo on kapea muuri '
        + 'Kaspianmeren ja Iranin ylängön välissä, ja se erottaa kaksi '
        + 'täysin erilaista ilmastoa.',
      lahde: 'Alireza Javaheri, Wikimedia Commons (CC BY 3.0)',
    },
    {
      tiedosto: 'Mazandaran - Baladeh View from Zarde Kamar - panoramio.jpg',
      selite: 'Baladehin kylä laakson pohjalla Zarde Kamarilta nähtynä. '
        + 'Asutus on siellä, missä laakso levenee sen verran että peltoja '
        + 'mahtuu.',
      lahde: 'Alireza Javaheri, Wikimedia Commons (CC BY 3.0)',
    },
    {
      tiedosto: 'Mazandaran - Royan - Galandroud - panoramio.jpg',
      selite: 'Syksyn värit Hyrkanian metsässä Elburzin pohjoisrinteellä. '
        + 'Kaspianmeren puoli saa sateet, ja siksi täällä kasvaa lehtimetsää '
        + 'siinä missä etelärinne on aavikkoa.',
      lahde: 'Alireza Javaheri, Wikimedia Commons (CC BY 3.0)',
    },
    {
      tiedosto: 'Baladeh - Royan road - Bimak - panoramio.jpg',
      selite: 'Baladehin ja Royanin välinen tie kiertää laaksoa Bimakin '
        + 'kohdalla. Tämä on yksi harvoista teistä, jotka ylittävät Elburzin '
        + 'Kaspianmeren rannalle.',
      lahde: 'Alireza Javaheri, Wikimedia Commons (CC BY 3.0)',
    },
  ],

  ural: [
    {
      tiedosto: 'Приполярный Урал, оз. Падежа-ты, вид с хребта Юаснырд.jpg',
      selite: 'Padeža-ty-järvi Napapiirin Uralilla Juasnyrdin harjanteelta '
        + 'nähtynä. Kesäkuussakin rinteillä on lumilaikkuja, ja järvien '
        + 'ympärillä on pelkkää tundraa.',
      lahde: 'RDA-Inta, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Отроги горы Тельпосиз на Северном Урале, национальный парк "Югыд ва".jpg',
      selite: 'Telposizin rinteet Pohjois-Uralilla Jugyd va -kansallispuistossa. '
        + 'Puisto on Euroopan laajin koskematon metsäalue.',
      lahde: 'Natalia Beshkareva, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Гора Большой Нургуш.jpg',
      selite: 'Suuri Nurgušin vuori Zjuratkulin kansallispuistossa Etelä-'
        + 'Uralilla. Laki on puurajan yläpuolella kivikkoa, vaikka vuori on '
        + 'vain runsaan kilometrin korkuinen.',
      lahde: 'Ljvty, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Нургуш со склонов Зюраткуля - panoramio.jpg',
      selite: 'Nurguš Zjuratkulin rinteiltä. Uralin selänteet ovat kuluneet '
        + 'matalaksi: vuoristo on yksi maailman vanhimmista, ja sen huiput '
        + 'ovat pyöreitä eivätkä teräviä.',
      lahde: 'Quarkgluonplasma, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Russia (28686712760).jpg',
      selite: 'Ilta Uralin selänteiden yllä. Vuorijono on Euroopan ja Aasian '
        + 'raja, ja sen yli päästään monesta kohdasta ilman solaa — juuri '
        + 'siksi se ei ole koskaan pysäyttänyt liikennettä kuten Alpit.',
      lahde: 'Pavel Marianov, Wikimedia Commons (CC BY 2.0)',
    },
  ],

  zagros: [
    {
      tiedosto: 'اورامان.jpg',
      selite: 'Hawramanin kylä Zagrosin rinteessä Iranin Kurdistanissa. '
        + 'Talot on porrastettu niin, että alemman katto on ylemmän piha — '
        + 'jyrkässä rinteessä ei ole muuta tasaista maata.',
      lahde: 'Salar.arkan, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'RAI 40-12 Sepid Dasht 1.jpg',
      selite: 'Paikallisjuna Zagrosin rotkossa Sepid Dashtin kohdalla. '
        + 'Iranin poikittaisrautatie kiipeää vuoriston yli sadoilla silloilla '
        + 'ja tunneleilla — se oli 1930-luvun suurimpia rakennushankkeita.',
      lahde: 'Kabelleger / David Gubler, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Oshtoran kuhj.jpg',
      selite: 'Oshtorankuhin jyrkät seinämät Lorestanin maakunnassa. '
        + 'Zagrosin poimuvuoret ovat syntyneet Arabian ja Euraasian '
        + 'mannerlaattojen törmäyksessä, ja kerrokset näkyvät rinteissä '
        + 'raitoina.',
      lahde: 'ninara, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Gezicht op de rivier de Daliki en bergen in Perzië Daliki rivier Shiraz-Buchire (titel op object), RP-F-F01048-T.jpg',
      selite: 'Dalakijoki ja Zagrosin vuoret 1880-luvulla otetussa vedoksessa. '
        + 'Kuva on matka-albumista Shirazin ja Bushehrin väliseltä '
        + 'karavaanitieltä — juuri sitä reittiä isoisän aikalaiset kulkivat '
        + 'Persian halki.',
      lahde: 'Rijksmuseum, Wikimedia Commons (CC0)',
    },
    {
      tiedosto: 'ETH-BIB-Gebirge vor Chorrenabad-Persienflug 1924-1925-LBS MH02-02-0064-AL-FL.tif',
      selite: 'Lorestanin vuoristo neljän kilometrin korkeudesta vuonna 1925. '
        + 'Kuva on Walter Mittelholzerin Persian-lennolta, yhdeltä '
        + 'ensimmäisistä kerroista kun vuoristo nähtiin ylhäältä.',
      lahde: 'Walter Mittelholzer, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'Butin&Chema.jpg',
      selite: 'Butinin ja Pendron huiput Misakin vuorelta nähtynä. Zagrosin '
        + 'pohjoisosassa lumi pysyy huipuilla pitkälle kevääseen, vaikka '
        + 'laaksoissa on jo lämmintä.',
      lahde: 'Khoshhat, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  kaukasus: [
    {
      tiedosto: 'Селение Ний.jpg',
      selite: 'Niyn kylän vainah-tornit Ingušiassa. Tornit olivat yhtä aikaa '
        + 'asuntoja ja linnoituksia, ja samaa rakennustapaa on kaikkialla '
        + 'Ingušiassa ja Tšetšeniassa. Taustan huiput ovat pilven peitossa.',
      lahde: 'Altushkin, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'View of Stepantsminda.jpg',
      selite: 'Stepantsminda Kvemi Mtan rinteeltä 2 170 metristä nähtynä. '
        + 'Vasemmalla kohoaa Khuro (4 071 m) ja takana Šanin valkoinen '
        + 'huippu (4 451 m).',
      lahde: 'WaltDisno, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Утро в горах Кавказа.jpg',
      selite: 'Aamu Kaukasuksen vuorilla: aurinko osuu ensin ylärinteiden '
        + 'niittyihin, kun laakson pohja on vielä varjossa.',
      lahde: 'Ilja Bunin, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Тебердинский заповедник. Вид на ледник и перевал Птыш.jpg',
      selite: 'Teberdan luonnonsuojelualue Luoteis-Kaukasuksella: jäätikkö ja '
        + 'Ptyšin sola syyskuussa, kun rinteiden lehtipuut ovat jo ruskassa.',
      lahde: 'Aleksandr Baidukov, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Mountains near Karadla.jpg',
      selite: 'Kevätaurinko Karadlan yllä: lumiset huiput nousevat metsäisen '
        + 'laakson yläpuolelle, ja kevään sulamisvedet ovat vielä matkalla '
        + 'alas.',
      lahde: 'M. S. Gorbunova, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Qalayxudat, Guba.jpg',
      selite: 'Vuoristotie Qalayxudatin kylälle Quban seudulla '
        + 'Azerbaidžanissa. Talvella tie on ainoa yhteys kylään, ja se kulkee '
        + 'lumihuippujen juurella.',
      lahde: 'Judaideep, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Balakən District Nature - View of the Greater Caucasus Mountains.jpg',
      selite: 'Suur-Kaukasuksen vihreitä selänteitä Balakənin piirikunnassa '
        + 'Luoteis-Azerbaidžanissa. Metsäraja jää alas, ja ylin vyöhyke on '
        + 'pelkkää laidunniittyä.',
      lahde: 'Golden, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Balakən District Nature - River Cutting through the Greater Caucasus Mountains.jpg',
      selite: 'Vuoristopuro on leikannut uoman Suur-Kaukasuksen laaksoon '
        + 'Balakənin piirikunnassa. Kuva on kesäkuulta, ja laakson pohjalla on '
        + 'yhä lunta.',
      lahde: 'Golden, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Mt Turklitau. Border between Levashinsky and Gunibsky District.jpg',
      selite: 'Turklitau-vuoren itäsivu Dagestanissa. Eteläinen rinne on '
        + 'lähes kasviton, ja vuori jatkuu paljon pidemmälle kuin kuvaan '
        + 'mahtuu.',
      lahde: 'M. S. Gorbunova, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Mountains near Karadla 2.jpg',
      selite: 'Vuoristotie kiertää rinnettä Karadlan lähellä. Vastapäätä '
        + 'nousee lumihuippu, ja tien ja huipun välissä on koko laakso.',
      lahde: 'M. S. Gorbunova, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],
};

/**
 * Kohteen kuvat maastonimen avaimella, tai null jos kohdetta ei ole
 * vielä kuratoitu.
 *
 * Null eikä tyhjä taulukko: kutsuja erottaa "ei kuratoitu" (näytä
 * Wikipedian oma kuvasto) ja "kuratoitu tyhjäksi" toisistaan.
 */
export function vuorikuvat(avain) {
  const kuvat = VUORIKUVAT[avain];
  return kuvat?.length ? kuvat : null;
}
