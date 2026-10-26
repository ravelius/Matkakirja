// Animoitu historiakartta: kauppareitit, kauppakaupungit ja valtakuntien
// rajat aikaikkunoittain. Ensimmäinen aihe on Silkkitie, mutta rakenne
// on yleinen: uusi aihe lisätään aiheet-listaan omine ikkunoineen.
//
// ==========================================================================
// VAROITUS: HISTORIALLISET RAJAT OVAT TULKINTOJA, EIVÄT MITTAUKSIA.
//
// Tämän tiedoston monikulmiot eivät ole rajoja siinä mielessä kuin
// nykyvaltion raja on. Ne ovat karkeita kuvia siitä, mille alueelle
// jonkin hallitsijan valta ulottui — ja valta oli asteittaista: kaupunki
// saattoi maksaa veroa kahteen suuntaan, aroalueella ei ollut viivaa
// lainkaan, ja autiomaassa "raja" tarkoitti vain sitä, että vartioasemien
// välissä ei ollut ketään. Kartantekijät piirtävät samat valtakunnat eri
// kokoisina, ja kaikki ovat omalla tavallaan oikeassa.
//
// Mitä kauemmas ajassa mennään, sitä epävarmempaa kaikki on. Vuoden 1500
// osmanivaltakunnan pohjoisraja tunnetaan asiakirjoista lähes kylä
// kylältä; vuoden 100 eaa. Han-valtakunnan lounaisreuna on arvaus, joka
// perustuu muutamaan hallintoluetteloon. Siksi jokaisessa muodossa on
// kenttä varmuus, ja se on luettava ennen kuin muotoon uskoo.
// ==========================================================================
//
// TÄTÄ TIEDOSTOA EI OLE KIRJOITTANUT KONE. Sisältö on käsin koottu ja
// lähteistetty väite kerrallaan, koska koneellisesti vapaana ei ole
// yhtään aineistoa, joka antaisi Silkkitien reitit ja historialliset
// rajat suomeksi ja käyttökelpoisella lisenssillä. Muokkaa siis käsin —
// mutta älä koskaan ilman lahde-kenttää. Rakenteen ja koordinaatit
// tarkistaa kone:
//   node tools/tarkista-historia.mjs             rakenne, ei verkkoa
//   NODE_USE_ENV_PROXY=1 node tools/tarkista-historia.mjs --verkko
//
// Aineisto: Kaupunkien koordinaatit Wikipedian sivujen koordinaateista
//           (en.wikipedia.org/w/api.php, prop=coordinates). Ajoitukset ja
//           tapahtumat rivikohtaisista lähteistä, jotka on merkitty
//           jokaisen kohteen lahde-kenttään. Reittiviivat ja valtakuntien
//           ääriviivat on piirretty käsin näiden paikkojen ja julkaistun
//           tutkimuskirjallisuuden yleiskuvan perusteella.
// Viite:    UNESCO Silk Roads Programme (en.unesco.org/silkroad);
//           International Dunhuang Programme, British Library (idp.bl.uk);
//           University of Washington, Silk Road Seattle
//           (depts.washington.edu/silkroad); Encyclopaedia Britannica;
//           Wikipedia. Yksittäiset viitteet ovat lahde-kentissä.
// Haettu:   3.8.2026
// Lisenssi: Koordinaatit ja vuosiluvut ovat tosiasioita eivätkä sellaisina
//           tekijänoikeuden alaisia; lähde on silti merkitty, jotta väitteen
//           voi tarkistaa. Suomenkieliset selitetekstit on kirjoitettu tähän
//           tiedostoon itse eikä niitä ole käännetty tai kopioitu mistään
//           lähteestä. Wikipedian tekstiin ei siis nojata sisällöllisesti,
//           vain paikannukseen.
//
// --- varmuus ---
//
// Kolmiportainen ja sama joka kentässä:
//   'melko varma'  paikka ja ajoitus tunnetaan hyvin: elävä kaupunki,
//                  asiakirjoista tunnettu vuosiluku.
//   'karkea'       suuruusluokka ja suunta ovat oikein, yksityiskohdat
//                  ovat yksinkertaistuksia. KAIKKI valtakuntien rajat
//                  ovat vähintään tätä.
//   'epavarma'     tutkijat ovat eri mieltä, tai lähde antaa vain arvion.
//
// --- rakenne ---
//
// Reitit, kaupungit ja valtakunnat ovat aiheen tasolla omina luetteloinaan,
// ja aikaikkuna viittaa niihin AVAIMELLA. Näin sama reittiviiva ei toistu
// viidessä ikkunassa viittä kertaa, ja piirtäjä voi häivyttää saman viivan
// pehmeästi ikkunasta toiseen sen sijaan että piirtäisi sen uudelleen.
//
//   const aihe = HISTORIA.aiheet[0];
//   const ikkuna = aihe.ikkunat[2];
//   const reitit = ikkuna.reitit.map((a) => aihe.reitit.find((r) => r.avain === a));
//
// Koordinaatit ovat [lon, lat] asteina, sama järjestys kuin muissakin
// paketeissa. Kaupungeissa kolme desimaalia (~100 m), reittiviivoissa ja
// ääriviivoissa yksi desimaali (~11 km) — tarkempi luku antaisi väärän
// vaikutelman siitä, että viiva tietää mistä se kulkee.
//
// Ääriviivat ovat suljettuja renkaita: viimeinen piste on sama kuin
// ensimmäinen. Valtakunnalla voi olla monta rengasta (manner ja saaret).
// Vuodet ovat kokonaislukuja, negatiivinen on eaa. Nolla-vuotta ei ole,
// joten -100 tarkoittaa vuotta 100 eaa.

// --------------------------------------------------------------------------
// Kaupungit. alkaen/asti kertovat, milloin paikka oli SILKKITIEN SOLMUNA
// merkittävä — ei milloin siellä on asuttu. Samarkandissa asutaan yhä,
// mutta sen aika suurena karavaanikaupunkina on ohi; asti on siksi se
// vuosi, jonka jälkeen paikka ei enää ollut reitin kannalta tärkeä.
// null tarkoittaa, ettei rajaa ole tai ettei sitä voi antaa.
// --------------------------------------------------------------------------

const HISTORIA_KAUPUNGIT = [
  // --- Kiina ja Hexin käytävä ---
  {
    avain: 'changan',
    nimi: 'Chang\'an',
    muutNimet: ['Xi\'an'],
    lon: 108.858, lat: 34.308,
    alkaen: -200, asti: 907,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Chang\'an", koordinaatti Wikipedian API:sta 3.8.2026; Britannica',
    selite: 'Reitin itäinen pää. Han-dynastian pääkaupunki 200-luvulta eaa. ja uudelleen Tangin aikana 618–904, jolloin siellä asui satojatuhansia ihmisiä ja kokonainen sogdilainen kauppiaskortteli. Koordinaatti on muinaisen kaupungin, ei nykyisen Xi\'anin keskustan: ne ovat noin 10 km:n päässä toisistaan.',
  },
  {
    avain: 'luoyang',
    nimi: 'Luoyang',
    lon: 112.454, lat: 34.620,
    alkaen: 25, asti: 907,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Luoyang", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Itäisen Han-dynastian pääkaupunki vuodesta 25 jaa. Kun pääkaupunki siirtyi tänne, myös silkin lähtöpiste siirtyi 300 kilometriä itään.',
  },
  {
    avain: 'wuwei',
    nimi: 'Wuwei',
    muutNimet: ['Liangzhou'],
    lon: 102.638, lat: 37.929,
    alkaen: -115, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Wuwei, Gansu", koordinaatti Wikipedian API:sta 3.8.2026; Hexin neljä komentokuntaa perustettiin 121–111 eaa.',
    selite: 'Ensimmäinen Hexin käytävän neljästä varuskuntakaupungista. Käytävä on kapea kaistale Qilian-vuorten ja autiomaan välissä — sen hallinta oli koko reitin ehto.',
  },
  {
    avain: 'zhangye',
    nimi: 'Zhangye',
    lon: 100.450, lat: 38.925,
    alkaen: -111, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Zhangye", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Hexin käytävän toinen komentokunta.',
  },
  {
    avain: 'jiuquan',
    nimi: 'Jiuquan',
    lon: 98.494, lat: 39.733,
    alkaen: -111, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Jiuquan", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Hexin käytävän kolmas komentokunta.',
  },
  {
    avain: 'dunhuang',
    nimi: 'Dunhuang',
    lon: 94.664, lat: 40.141,
    alkaen: -111, asti: null,
    varmuus: 'melko varma',
    lahde: 'International Dunhuang Programme, British Library (idp.bl.uk), Dunhuangin aikajana; komentokunta perustettiin 111 eaa.',
    selite: 'Paikka, jossa reitti haarautui pohjoiseen ja eteläiseen. Luolatemppeleitä alettiin kaivertaa 300-luvulla jaa., ja niiden muurattuun kirjastoluolaan jäi kymmeniätuhansia käsikirjoituksia — suurin osa siitä, mitä reitin arjesta ylipäätään tiedetään.',
  },
  {
    avain: 'yumen',
    nimi: 'Yumen-portti',
    muutNimet: ['Jadeportti'],
    lon: 93.864, lat: 40.353,
    alkaen: -111, asti: 800,
    varmuus: 'karkea',
    lahde: 'Wikipedia (en) "Yumen Pass", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Han-muurin läntinen tarkastusportti pohjoisella haaralla. Portista länteen alkoi alue, jota kiinalaiset lähteet kutsuivat Länsimaiksi.',
  },
  {
    avain: 'yangguan',
    nimi: 'Yang-portti',
    lon: 94.059, lat: 39.927,
    alkaen: -111, asti: 800,
    varmuus: 'karkea',
    lahde: 'Wikipedia (en) "Yang Pass", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Eteläisen haaran vastaava portti, muutaman tunnin matkan päässä Yumenista etelään.',
  },
  {
    avain: 'hami',
    nimi: 'Hami',
    muutNimet: ['Kumul'],
    lon: 93.515, lat: 42.819,
    alkaen: -60, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Hami City", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Ensimmäinen keidas Gobin poikki tulevalle. Pohjoinen haara nousi täältä Tianshanin eteläreunaa länteen.',
  },

  // --- Tarimin allas: pohjoinen reuna ---
  {
    avain: 'turfan',
    nimi: 'Turfan',
    muutNimet: ['Gaochang', 'Jiaohe', 'Qocho'],
    lon: 89.189, lat: 42.951,
    alkaen: -100, asti: 1400,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Turpan" ja "Jiaohe ruins", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Merenpinnan alapuolella oleva keidasallas, jonka rusinat ja viinit mainitaan lähteissä yhtä usein kuin silkki. Jiaohen savikaupungin rauniot ovat 12 km länteen; uiguurien Qochon valtakunnan keskus 800-luvulta 1200-luvulle.',
  },
  {
    avain: 'karashahr',
    nimi: 'Karashahr',
    muutNimet: ['Yanqi'],
    lon: 86.568, lat: 42.059,
    alkaen: -100, asti: 1000,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Karasahr", koordinaatti Wikipedian API:sta 3.8.2026; yksi Tangin Anxin neljästä varuskunnasta',
    selite: 'Pohjoisen haaran keidas ja yksi Tang-dynastian neljästä länsivaruskunnasta.',
  },
  {
    avain: 'kucha',
    nimi: 'Kucha',
    muutNimet: ['Qiuci', 'Kuqa'],
    lon: 82.932, lat: 41.716,
    alkaen: -100, asti: 1000,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Kucha", koordinaatti Wikipedian API:sta 3.8.2026; Wikipedia (en) "Four Garrisons of Anxi" (varuskunnat 648–658)',
    selite: 'Pohjoisen haaran suurin keidasvaltio ja buddhalaisen käännöstyön keskus. Täältä lähtenyt munkki Kumarajiva käänsi sutria kiinaksi 400-luvulla.',
  },
  {
    avain: 'aksu',
    nimi: 'Aksu',
    lon: 80.290, lat: 41.185,
    alkaen: -100, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Aksu City", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Viimeinen suuri keidas ennen Kashgaria pohjoista reunaa kuljettaessa.',
  },

  // --- Tarimin allas: eteläinen reuna ---
  {
    avain: 'loulan',
    nimi: 'Loulan',
    muutNimet: ['Kroraina'],
    lon: 89.841, lat: 40.528,
    alkaen: -100, asti: 400,
    varmuus: 'epavarma',
    lahde: 'Wikipedia (en) "Loulan Kingdom", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Lop Nur -järven rannalla ollut varuskunta ja tienhaara, josta pääsi sekä pohjoiselle että eteläiselle reunalle. Hylättiin 300-luvulla, kun vesi siirtyi; paikka on nyt keskellä autiomaata. Ajoitus ja tarkka sijainti ovat arkeologien tulkintoja.',
  },
  {
    avain: 'miran',
    nimi: 'Miran',
    lon: 88.939, lat: 39.234,
    alkaen: -100, asti: 800,
    varmuus: 'epavarma',
    lahde: 'Wikipedia (en) "Miran (Xinjiang)", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Eteläisen haaran keidas, jonka temppelimaalauksissa on siivekkäitä hahmoja selvästi kreikkalais-roomalaiseen tapaan — tuhansia kilometrejä Välimereltä.',
  },
  {
    avain: 'qiemo',
    nimi: 'Qiemo',
    muutNimet: ['Cherchen'],
    lon: 85.530, lat: 38.146,
    alkaen: -100, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Qiemo County", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Eteläisen reunan keidas Kunlun-vuorten juurella.',
  },
  {
    avain: 'niya',
    nimi: 'Niya',
    muutNimet: ['Cadota', 'Jingjue'],
    lon: 82.738, lat: 38.021,
    alkaen: -100, asti: 450,
    varmuus: 'epavarma',
    lahde: 'Wikipedia (en) "Niya ruins" (38°01′17″N 82°44′15″E), haettu 3.8.2026',
    selite: 'Hiekkaan hautautunut keidaskaupunki noin 115 km nykyisestä Niyan taajamasta pohjoiseen. Hylättiin 300–400-luvuilla. Sen puutauluista löytyneet velkakirjat ja riitapöytäkirjat kertovat, millaista elämä keitaalla oli.',
  },
  {
    avain: 'khotan',
    nimi: 'Khotan',
    muutNimet: ['Hotan', 'Yutian'],
    lon: 79.917, lat: 37.117,
    alkaen: -100, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Hotan", koordinaatti Wikipedian API:sta 3.8.2026; Wikipedia (en) "Four Garrisons of Anxi"',
    selite: 'Eteläisen haaran tärkein kaupunki. Kuuluisa jadesta, jota kerättiin joesta, ja tarinan mukaan paikka, jonne silkkiäistoukan salaisuus ensimmäisenä vuoti Kiinasta.',
  },
  {
    avain: 'yarkand',
    nimi: 'Yarkand',
    muutNimet: ['Shache'],
    lon: 77.223, lat: 38.391,
    alkaen: -100, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Yarkant County", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Eteläisen reunan viimeinen keidas ennen Kashgaria.',
  },
  {
    avain: 'kashgar',
    nimi: 'Kashgar',
    muutNimet: ['Shule', 'Kashi'],
    lon: 75.994, lat: 39.468,
    alkaen: -100, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Kashgar", koordinaatti Wikipedian API:sta 3.8.2026; Wikipedia (en) "Four Garrisons of Anxi"',
    selite: 'Solmukohta, jossa pohjoinen ja eteläinen haara yhtyivät ennen vuoristoa. Kashgarista länteen jokainen reitti nousi joko Pamirien tai Tianshanin yli.',
  },

  // --- Keski-Aasia ---
  {
    avain: 'osh',
    nimi: 'Osh',
    lon: 72.800, lat: 40.530,
    alkaen: -100, asti: null,
    varmuus: 'karkea',
    lahde: 'Wikipedia (en) "Osh", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Fergananan laakson itäpää, ensimmäinen asuttu paikka Kashgarista tultaessa Terek-solan yli.',
  },
  {
    avain: 'kokand',
    nimi: 'Fergananan laakso',
    muutNimet: ['Kokand'],
    lon: 70.942, lat: 40.529,
    alkaen: -100, asti: null,
    varmuus: 'karkea',
    lahde: 'Wikipedia (en) "Kokand", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Laakso, jonka hevosia Han-hovi halusi niin kovasti, että lähetti niiden vuoksi kaksi sotaretkeä 104–101 eaa. Koordinaatti on laakson keskustaajaman; itse Kokandin kaupunki on paljon myöhempi.',
  },
  {
    avain: 'tashkent',
    nimi: 'Tashkent',
    muutNimet: ['Chach'],
    lon: 69.280, lat: 41.311,
    alkaen: 100, asti: null,
    varmuus: 'karkea',
    lahde: 'Wikipedia (en) "Tashkent", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Sogdialainen keidaskaupunki pohjoisemmalla, aron reunaa kulkevalla linjalla.',
  },
  {
    avain: 'samarkand',
    nimi: 'Samarkand',
    muutNimet: ['Marakanda', 'Afrasiab'],
    lon: 66.965, lat: 39.651,
    alkaen: -300, asti: 1500,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Samarkand", koordinaatti Wikipedian API:sta 3.8.2026; UNESCO Silk Roads Programme',
    selite: 'Sogdien pääkaupunki ja pitkään koko reitin varakkain solmu. Aleksanteri valtasi sen 329 eaa., mongolit hävittivät 1220, ja Timur teki siitä valtakuntansa pääkaupungin 1370.',
  },
  {
    avain: 'bukhara',
    nimi: 'Buhara',
    lon: 64.423, lat: 39.767,
    alkaen: 500, asti: 1500,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Bukhara", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Samanidien pääkaupunki 800–900-luvuilla ja islamilaisen oppineisuuden keskus. Reitin kaupungit eivät myyneet vain tavaraa vaan myös kirjoja, kieliä ja uskontoja.',
  },
  {
    avain: 'merv',
    nimi: 'Merv',
    muutNimet: ['Margiana', 'Mary'],
    lon: 62.193, lat: 37.663,
    alkaen: -250, asti: 1221,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Merv", koordinaatti Wikipedian API:sta 3.8.2026; UNESCO:n maailmanperintökohde',
    selite: 'Keidas, jossa Keski-Aasian ja Iranin reitit yhtyivät. Aikansa suurimpia kaupunkeja, kunnes mongolit tuhosivat sen 1221 niin perusteellisesti, ettei se enää toipunut.',
  },
  {
    avain: 'balkh',
    nimi: 'Balkh',
    muutNimet: ['Bactra'],
    lon: 66.898, lat: 36.758,
    alkaen: -500, asti: 1220,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Balkh", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Baktrian pääkaupunki ja risteys, josta pääsi sekä Intiaan etelään että Merviin länteen. Mongolit hävittivät sen 1220.',
  },
  {
    avain: 'termez',
    nimi: 'Termez',
    lon: 67.283, lat: 37.217,
    alkaen: -300, asti: 1220,
    varmuus: 'karkea',
    lahde: 'Wikipedia (en) "Termez", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Amudarjan ylityspaikka Baktriaan mentäessä.',
  },
  {
    avain: 'taraz',
    nimi: 'Taraz',
    muutNimet: ['Talas'],
    lon: 71.367, lat: 42.900,
    alkaen: 400, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Taraz", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Aron reunan kaupunki. Lähistöllä käytiin 751 Talasin taistelu, jossa abbasidijoukot pysäyttivät Tangin etenemisen länteen — käännekohta, jonka jälkeen Keski-Aasia kääntyi islamin suuntaan.',
  },
  {
    avain: 'otrar',
    nimi: 'Otrar',
    lon: 68.303, lat: 42.852,
    alkaen: 800, asti: 1400,
    varmuus: 'karkea',
    lahde: 'Wikipedia (en) "Otrar", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Syrdarjan varren kauppakaupunki. Sen käskynhaltija surmautti Tšingis-kaanin lähettämän karavaanin 1218 — teko, josta seurasi mongolien hyökkäys Keski-Aasiaan.',
  },
  {
    avain: 'urgench',
    nimi: 'Urgentš',
    lon: 60.633, lat: 41.550,
    alkaen: 900, asti: 1400,
    varmuus: 'karkea',
    lahde: 'Wikipedia (en) "Urgench", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Horezmin pääkaupunki Amudarjan alajuoksulla ja pohjoisen aroreitin tärkein solmu.',
  },
  {
    avain: 'sarai',
    nimi: 'Sarai',
    lon: 47.434, lat: 47.181,
    alkaen: 1250, asti: 1396,
    varmuus: 'epavarma',
    lahde: 'Wikipedia (en) "Sarai (city)": Selitrennoen kaupunkirauniot 47°10′53″N 47°26′04″E; Timur ryösti kaupungin talvella 1395–1396',
    selite: 'Kultaisen ordan pääkaupunki Volgan alajuoksulla. Vanhemman Sarain sijainnista tutkijat eivät ole yksimielisiä, joten tämä koordinaatti koskee 1300-luvun kaupunkia.',
  },

  // --- Iran ja Mesopotamia ---
  {
    avain: 'nishapur',
    nimi: 'Nishapur',
    lon: 58.793, lat: 36.206,
    alkaen: 250, asti: 1221,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Nishapur", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Khorasanin pääkaupunki ja Iranin ylängön portti idästä tultaessa.',
  },
  {
    avain: 'rey',
    nimi: 'Rey',
    muutNimet: ['Rhagae'],
    lon: 51.434, lat: 35.597,
    alkaen: -300, asti: 1220,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Ray, Iran", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Iranin ylängön risteyskaupunki nykyisen Teheranin eteläpuolella.',
  },
  {
    avain: 'hamadan',
    nimi: 'Hamadan',
    muutNimet: ['Ekbatana'],
    lon: 48.515, lat: 34.798,
    alkaen: -500, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Hamadan", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Median vanha pääkaupunki Zagros-vuorten solassa. Kaikki idästä Mesopotamiaan tuleva liikenne kulki tästä.',
  },
  {
    avain: 'ktesifon',
    nimi: 'Ktesifon',
    lon: 44.581, lat: 33.094,
    alkaen: -120, asti: 637,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Ctesiphon", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Parthien ja sitten sasanidien pääkaupunki Tigriin varrella. Kiinasta tulleen tavaran hinta kaksinkertaistui täällä, kun se vaihtoi omistajaa Rooman suuntaan.',
  },
  {
    avain: 'baghdad',
    nimi: 'Bagdad',
    lon: 44.366, lat: 33.315,
    alkaen: 762, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Baghdad", koordinaatti Wikipedian API:sta 3.8.2026; kalifi al-Mansur perusti kaupungin 762, mongolit valtasivat sen 1258',
    selite: 'Abbasidikalifaatin pääkaupunki vuodesta 762: maareitit ja Persianlahden meritie kohtasivat täällä. Mongolivalloitus 1258 lopetti kalifaatin, ja kaupan painopiste siirtyi Tabriziin — mutta Bagdad pysyi reitin varrella, joten asti on tässä tyhjä.',
  },
  {
    avain: 'basra',
    nimi: 'Basra',
    lon: 47.810, lat: 30.515,
    alkaen: 638, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Basra", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Persianlahden pohjukan satama, josta Bagdadin tavara jatkoi laivalla Intiaan ja Kiinaan.',
  },
  {
    avain: 'tabriz',
    nimi: 'Tabriz',
    lon: 46.300, lat: 38.067,
    alkaen: 1265, asti: 1550,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Tabriz", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Ilkaanien pääkaupunki 1200-luvun lopulta. Genovalaisilla ja venetsialaisilla oli täällä omat kauppahuoneensa — kauimpana idässä, minne eurooppalainen kauppias tavallisesti pääsi.',
  },

  // --- Levantti, Anatolia ja Eurooppa ---
  {
    avain: 'palmyra',
    nimi: 'Palmyra',
    lon: 38.268, lat: 34.551,
    alkaen: -100, asti: 273,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Palmyra", koordinaatti Wikipedian API:sta 3.8.2026; keisari Aurelianus kukisti kaupungin 272–273',
    selite: 'Keidaskaupunki keskellä Syyrian autiomaata. Sen kauppiassuvut järjestivät karavaanit Eufratilta Välimerelle ja pystyttivät itselleen kunniapatsaita, joiden tekstit ovat yhä pystyssä.',
  },
  {
    avain: 'antiokia',
    nimi: 'Antiokia',
    lon: 36.182, lat: 36.205,
    alkaen: -300, asti: 1268,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Antioch", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Maareitin läntinen pääte Roomalle. Tavara siirtyi täällä laivaan ja jatkoi Välimerta pitkin Roomaan.',
  },
  {
    avain: 'tyros',
    nimi: 'Tyros',
    lon: 35.196, lat: 33.271,
    alkaen: -1000, asti: 1291,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Tyre, Lebanon", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Foinikialainen satamakaupunki ja purppuravärin koti. Silkki värjättiin täällä ennen kuin se myytiin Roomaan.',
  },
  {
    avain: 'aleppo',
    nimi: 'Aleppo',
    lon: 37.160, lat: 36.200,
    alkaen: 900, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Aleppo", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Syyrian karavaanikaupunki, joka peri Palmyran roolin idän ja Välimeren välissä.',
  },
  {
    avain: 'konstantinopoli',
    nimi: 'Konstantinopoli',
    muutNimet: ['Bysantion', 'Istanbul'],
    lon: 28.980, lat: 41.013,
    alkaen: 330, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Constantinople", koordinaatti Wikipedian API:sta 3.8.2026; osmanit valtasivat kaupungin 1453',
    selite: 'Bysantin pääkaupunki vuodesta 330 ja osmanivaltakunnan pääkaupunki vuodesta 1453. Kaupunki, jonka läpi lähes kaikki idästä Eurooppaan tullut silkki kulki.',
  },
  {
    avain: 'trabzon',
    nimi: 'Trabzon',
    muutNimet: ['Trebizond'],
    lon: 39.722, lat: 41.005,
    alkaen: 1204, asti: 1461,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Trabzon", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Mustanmeren satama, jonne Tabrizin tavara tuotiin muulikaravaanilla ja josta italialaiset laivat veivät sen Konstantinopoliin.',
  },
  {
    avain: 'kaffa',
    nimi: 'Kaffa',
    muutNimet: ['Feodosia'],
    lon: 35.379, lat: 45.034,
    alkaen: 1266, asti: 1475,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Feodosia", koordinaatti Wikipedian API:sta 3.8.2026; genovalaiset saivat kauppapaikan mongoleilta 1266',
    selite: 'Genovan siirtokunta Krimillä ja aroreitin läntinen pää. Osmanit valtasivat sen 1475.',
  },
  {
    avain: 'tana',
    nimi: 'Tana',
    muutNimet: ['Azov'],
    lon: 39.418, lat: 47.108,
    alkaen: 1300, asti: 1475,
    varmuus: 'karkea',
    lahde: 'Wikipedia (en) "Azov", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Venetsian kauppapaikka Donin suulla. Firenzeläinen Pegolotti kirjoitti 1340-luvulla ohjeen, jonka mukaan matka täältä Pekingiin kesti noin kahdeksan kuukautta ja oli ”täysin turvallinen” — mikä kertoo enemmän mongolirauhasta kuin tiestä.',
  },
  {
    avain: 'bursa',
    nimi: 'Bursa',
    lon: 29.062, lat: 40.197,
    alkaen: 1326, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Bursa", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Osmanien ensimmäinen pääkaupunki ja Anatolian silkkimarkkina, jonne iranilainen raakasilkki tuotiin myytäväksi italialaisille ostajille.',
  },
  {
    avain: 'venetsia',
    nimi: 'Venetsia',
    lon: 12.336, lat: 45.438,
    alkaen: 1000, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Venice", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Läntinen pääte. Venetsia ja Genova kilpailivat siitä, kumpi hallitsisi idän tavaran viimeistä osuutta Eurooppaan.',
  },
  {
    avain: 'genova',
    nimi: 'Genova',
    lon: 8.933, lat: 44.411,
    alkaen: 1100, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Genoa", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Venetsian kilpailija, jonka siirtokunnat olivat Mustallamerellä.',
  },

  // --- Intia ja Gandhara ---
  {
    avain: 'bamiyan',
    nimi: 'Bamiyan',
    lon: 67.833, lat: 34.825,
    alkaen: 200, asti: 900,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Bamyan", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Vuorilaakso Hindukushin yli menevällä haaralla. Kallioon veistetyt jättiläisbuddhat olivat merkki siitä, että buddhalaisuus matkusti reittiä länteen ja pohjoiseen.',
  },
  {
    avain: 'kabul',
    nimi: 'Kabul',
    lon: 69.178, lat: 34.525,
    alkaen: 100, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Kabul", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Solmu Intian ja Keski-Aasian välisellä haaralla.',
  },
  {
    avain: 'peshawar',
    nimi: 'Peshawar',
    muutNimet: ['Purushapura'],
    lon: 71.567, lat: 34.014,
    alkaen: 100, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Peshawar", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Kushan-valtakunnan pääkaupunki Khyber-solan eteläpuolella.',
  },
  {
    avain: 'taxila',
    nimi: 'Taxila',
    lon: 72.787, lat: 33.746,
    alkaen: -300, asti: 500,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Taxila", koordinaatti Wikipedian API:sta 3.8.2026; UNESCO:n maailmanperintökohde',
    selite: 'Gandharan oppikaupunki, jossa kreikkalainen veistotapa ja buddhalainen aihe sekoittuivat. Hiipui 400–500-luvuilla hunnien hyökkäysten jälkeen.',
  },
  {
    avain: 'mathura',
    nimi: 'Mathura',
    lon: 77.674, lat: 27.492,
    alkaen: 50, asti: 400,
    varmuus: 'karkea',
    lahde: 'Wikipedia (en) "Mathura", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Kushanien eteläinen keskus Gangesin tasangolla ja reitin pää Intian suuntaan.',
  },
  {
    avain: 'bharuch',
    nimi: 'Bharuch',
    muutNimet: ['Barygaza'],
    lon: 72.993, lat: 21.712,
    alkaen: -100, asti: 1200,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Bharuch", koordinaatti Wikipedian API:sta 3.8.2026; satama mainitaan Periplus Maris Erythraei -käsikirjassa (n. 40–70 jaa.)',
    selite: 'Gujaratin satama, jota Punaisenmeren kauppiaiden käsikirja kuvaa yksityiskohtaisesti — myös sen vaaralliset vuorovedet.',
  },
  {
    avain: 'muziris',
    nimi: 'Muziris',
    muutNimet: ['Pattanam'],
    lon: 76.209, lat: 10.157,
    alkaen: -50, asti: 500,
    varmuus: 'epavarma',
    lahde: 'Wikipedia (en) "Pattanam", koordinaatti Wikipedian API:sta 3.8.2026; sataman samastaminen Pattanamiin on kiistanalainen',
    selite: 'Keralan pippurisatama, jonne roomalaiset laivat purjehtivat monsuunilla suoraan Arabianmeren yli. Sataman tarkasta sijainnista kiistellään yhä; Pattanam on vahvin ehdokas, ei varmuus.',
  },
  {
    avain: 'kozhikode',
    nimi: 'Kozhikode',
    muutNimet: ['Calicut'],
    lon: 75.784, lat: 11.249,
    alkaen: 1200, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Kozhikode", koordinaatti Wikipedian API:sta 3.8.2026; Vasco da Gama saapui 20.5.1498',
    selite: 'Malabarin pippurisatama, jossa Kiinan, arabien ja myöhemmin portugalilaisten laivat kohtasivat. Vasco da Gama rantautui tänne 1498.',
  },
  {
    avain: 'mantai',
    nimi: 'Mantai',
    lon: 79.883, lat: 8.967,
    alkaen: -100, asti: 1000,
    varmuus: 'epavarma',
    lahde: 'Wikipedia (en) "Mannar, Sri Lanka", koordinaatti Wikipedian API:sta 3.8.2026; Mantain satamapaikka on Mannarin luoteispuolella',
    selite: 'Sri Lankan luoteisrannikon satama, jossa läntinen ja itäinen merenkulku kohtasivat. Koordinaatti on Mannarin, koska itse satamapaikan sijainti on arkeologinen tulkinta.',
  },
  {
    avain: 'nagapattinam',
    nimi: 'Nagapattinam',
    lon: 79.845, lat: 10.767,
    alkaen: 500, asti: 1300,
    varmuus: 'karkea',
    lahde: 'Wikipedia (en) "Nagapattinam", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Coromandelin rannikon satama, josta lähdettiin Bengalinlahden yli Kaakkois-Aasiaan.',
  },

  // --- Punainenmeri, Arabia ja Itä-Afrikka ---
  {
    avain: 'aleksandria',
    nimi: 'Aleksandria',
    lon: 29.892, lat: 31.198,
    alkaen: -300, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Alexandria", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Meritien läntinen pää. Intiasta tullut tavara kannettiin Punaiseltamereltä Niilille ja purjehti sieltä Aleksandriaan Rooman markkinoille.',
  },
  {
    avain: 'myoshormos',
    nimi: 'Myos Hormos',
    lon: 34.242, lat: 26.157,
    alkaen: -250, asti: 300,
    varmuus: 'epavarma',
    lahde: 'Wikipedia (en) "Myos Hormos", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Rooman ajan Punaisenmeren satama, joka on samastettu Quseir al-Qadimin raunioihin.',
  },
  {
    avain: 'berenike',
    nimi: 'Berenike',
    lon: 35.472, lat: 23.909,
    alkaen: -275, asti: 550,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Berenice Troglodytica", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Ptolemaiosten perustama Punaisenmeren satama. Kaivauksista on löytynyt intialaista pippuria säkeittäin ja tekstejä useilla kielillä.',
  },
  {
    avain: 'aden',
    nimi: 'Aden',
    lon: 45.033, lat: 12.800,
    alkaen: -100, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Aden", koordinaatti Wikipedian API:sta 3.8.2026; Periplus Maris Erythraei mainitsee sataman nimellä Eudaimon Arabia',
    selite: 'Punaisenmeren suun satama, jossa lähes kaikki Intian valtameren liikenne vaihtoi laivaa tai ainakin kävi täydentämässä varastonsa.',
  },
  {
    avain: 'siraf',
    nimi: 'Siraf',
    lon: 52.347, lat: 27.665,
    alkaen: 700, asti: 1050,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Bandar Siraf", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Persianlahden satama, josta abbasidikaudella purjehdittiin suoraan Kiinaan asti. Maanjäristys 977 aloitti sen hiipumisen.',
  },
  {
    avain: 'hormuz',
    nimi: 'Hormuz',
    lon: 56.460, lat: 27.067,
    alkaen: 1300, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Hormuz Island", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Persianlahden suulla oleva saarikaupunki, joka peri Sirafin roolin. Portugalilaiset valtasivat sen 1515.',
  },
  {
    avain: 'muscat',
    nimi: 'Masqat',
    lon: 58.408, lat: 23.589,
    alkaen: 800, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Muscat, Oman", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Omanin satama Persianlahden suun ulkopuolella.',
  },
  {
    avain: 'mogadishu',
    nimi: 'Mogadishu',
    lon: 45.342, lat: 2.039,
    alkaen: 1000, asti: 1500,
    varmuus: 'karkea',
    lahde: 'Wikipedia (en) "Mogadishu", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Itä-Afrikan rannikon kauppakaupunki, jonka Ibn Battuta kuvasi 1330-luvulla vauraaksi ja väkirikkaaksi.',
  },
  {
    avain: 'kilwa',
    nimi: 'Kilwa',
    lon: 39.513, lat: -8.960,
    alkaen: 1100, asti: 1500,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Kilwa Kisiwani", koordinaatti Wikipedian API:sta 3.8.2026; UNESCO:n maailmanperintökohde',
    selite: 'Swahilirannikon eteläisin suuri satama ja Zimbabwen kullan vientiväylä. Kiinalaista posliinia on löytynyt sen raunioista.',
  },

  // --- Kaakkois-Aasia ja Kiinan satamat ---
  {
    avain: 'ocEo',
    nimi: 'Óc Eo',
    lon: 105.152, lat: 10.233,
    alkaen: 100, asti: 650,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Óc Eo", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Funanin satamakaupunki Mekongin suistossa. Sieltä on kaivettu roomalaisia rahoja ja intialaisia koruja — todiste siitä, että meritie toimi jo 100-luvulla jaa.',
  },
  {
    avain: 'palembang',
    nimi: 'Palembang',
    muutNimet: ['Srivijaya'],
    lon: 104.756, lat: -2.986,
    alkaen: 650, asti: 1300,
    varmuus: 'karkea',
    lahde: 'Wikipedia (en) "Palembang", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Srivijayan valtakunnan keskus, joka hallitsi Malakan salmea satojen vuosien ajan ja peri tullia läpikulkevilta laivoilta.',
  },
  {
    avain: 'malakka',
    nimi: 'Malakka',
    lon: 102.249, lat: 2.194,
    alkaen: 1400, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Malacca City" ja "Malacca Sultanate", koordinaatti Wikipedian API:sta 3.8.2026; sulttaanikunta perustettiin noin 1400, portugalilaiset valtasivat sen 1511',
    selite: 'Salmen kapeimman kohdan satama ja 1400-luvun tärkein tavaranvaihtopaikka Intian valtameren ja Kiinan välillä.',
  },
  {
    avain: 'guangzhou',
    nimi: 'Guangzhou',
    muutNimet: ['Kanton'],
    lon: 113.260, lat: 23.130,
    alkaen: -100, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Guangzhou", koordinaatti Wikipedian API:sta 3.8.2026; Tang perusti merikaupan viraston (shibosi) vuonna 714',
    selite: 'Kiinan vanhin suuri ulkomaansatama. Tang-kaudella siellä oli oma arabialainen ja persialainen kauppiaskortteli.',
  },
  {
    avain: 'quanzhou',
    nimi: 'Quanzhou',
    muutNimet: ['Zaitun'],
    lon: 118.676, lat: 24.874,
    alkaen: 1000, asti: 1400,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Quanzhou", koordinaatti Wikipedian API:sta 3.8.2026; UNESCO:n maailmanperintökohde; Ibn Battuta kutsui sitä maailman suurimmaksi satamaksi',
    selite: 'Song- ja Yuan-kausien suurin satama, arabikauppiaiden Zaitun. Sekä Marco Polo että Ibn Battuta kuvasivat sen laivoja liioitteluun asti.',
  },
  {
    avain: 'hangzhou',
    nimi: 'Hangzhou',
    lon: 120.153, lat: 30.267,
    alkaen: 1130, asti: 1400,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Hangzhou", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Eteläisen Song-dynastian pääkaupunki ja Suuren kanavan eteläpää.',
  },
  {
    avain: 'khanbaliq',
    nimi: 'Khanbaliq',
    muutNimet: ['Dadu', 'Peking'],
    lon: 116.397, lat: 39.907,
    alkaen: 1264, asti: null,
    varmuus: 'melko varma',
    lahde: 'Wikipedia (en) "Beijing", koordinaatti Wikipedian API:sta 3.8.2026',
    selite: 'Kublai-kaanin pääkaupunki ja mongolikauden aroreitin itäinen pää.',
  },
];

// --------------------------------------------------------------------------
// Reitit. pisteet on murtoviiva, ei mitattu tie: se kertoo mitä kautta
// kuljettiin, ei missä pyörän jälki oli. Vuoristo-osuudet ovat suoria
// viivoja kahden keitaan välillä, koska todellinen sola vaihtui vuodesta
// ja vuodenajasta toiseen — Pamirien yli oli useita kelvollisia reittejä
// eikä kukaan kulkenut niistä kaikkia.
//
// Yhtään kauppiasta ei kulkenut reittiä päästä päähän. Tavara vaihtoi
// omistajaa kymmeniä kertoja matkalla, ja kukin karavaani hoiti oman
// tuttunsa osuuden. Viiva kuvaa tavaran matkaa, ei ihmisen.
//
// kaupungit-lista antaa reitin nimetyt pysähdykset avaimina siinä
// järjestyksessä kuin ne viivalla ovat. Kaikki pisteet eivät ole
// kaupunkeja: merireiteillä osa on pelkkiä käännöskohtia.
// --------------------------------------------------------------------------

const HISTORIA_REITIT = [
  {
    avain: 'pohjoinen',
    nimi: 'Pohjoinen haara',
    laji: 'maa',
    varmuus: 'karkea',
    lahde: 'Reitin keitaat: University of Washington, Silk Road Seattle (depts.washington.edu/silkroad); UNESCO Silk Roads Programme. Koordinaatit ks. kaupungit.',
    selite: 'Chang\'anista Hexin käytävää Dunhuangiin, sieltä Taklamakanin pohjoisreunaa Tianshanin juurella Kashgariin ja edelleen Fergananan kautta Samarkandiin, Merviin ja Iranin ylängön poikki Välimerelle.',
    kaupungit: ['changan', 'wuwei', 'zhangye', 'jiuquan', 'dunhuang', 'yumen', 'hami',
      'turfan', 'karashahr', 'kucha', 'aksu', 'kashgar', 'osh', 'kokand',
      'samarkand', 'bukhara', 'merv', 'nishapur', 'rey', 'hamadan', 'ktesifon',
      'palmyra', 'antiokia'],
    pisteet: [
      [108.9, 34.3], [105.8, 34.8], [103.8, 36.1], [102.6, 37.9], [100.5, 38.9],
      [98.5, 39.7], [97.6, 39.8], [94.7, 40.1], [93.9, 40.4], [93.5, 42.8],
      [89.2, 43.0], [86.6, 42.1], [82.9, 41.7], [80.3, 41.2], [76.0, 39.5],
      [72.8, 40.5], [70.9, 40.5], [67.0, 39.7], [64.4, 39.8], [62.2, 37.7],
      [58.8, 36.2], [51.4, 35.6], [48.5, 34.8], [44.6, 33.1], [41.0, 34.0],
      [38.3, 34.6], [36.9, 35.6], [36.2, 36.2],
    ],
  },
  {
    avain: 'etelainen',
    nimi: 'Eteläinen haara',
    laji: 'maa',
    varmuus: 'karkea',
    lahde: 'Reitin keitaat: University of Washington, Silk Road Seattle; UNESCO Silk Roads Programme. Koordinaatit ks. kaupungit.',
    selite: 'Erkanee Dunhuangissa: Yang-portista Lop Nurin eteläpuolitse Taklamakanin eteläreunaa Kunlun-vuorten juurella Khotanin kautta Kashgariin, ja sieltä Pamirien yli Baktriaan ja Merviin. Piirretty vain Dunhuangista alkaen, koska sitä ennen se on sama tie kuin pohjoinen haara.',
    kaupungit: ['dunhuang', 'yangguan', 'loulan', 'miran', 'qiemo', 'niya',
      'khotan', 'yarkand', 'kashgar', 'termez', 'balkh', 'merv'],
    pisteet: [
      [94.7, 40.1], [94.1, 39.9], [89.8, 40.5], [88.9, 39.2], [85.5, 38.1],
      [82.7, 38.0], [79.9, 37.1], [77.2, 38.4], [76.0, 39.5], [74.5, 37.5],
      [71.5, 37.2], [67.3, 37.2], [66.9, 36.8], [63.5, 37.0], [62.2, 37.7],
    ],
  },
  {
    avain: 'intianhaara',
    nimi: 'Intian haara',
    laji: 'maa',
    varmuus: 'karkea',
    lahde: 'Reitin paikat: UNESCO Silk Roads Programme; Wikipedia (en) "Grand Trunk Road", "Gandhara". Koordinaatit ks. kaupungit.',
    selite: 'Baktriasta Hindukushin yli Bamiyanin ja Kabulin kautta Gandharaan ja edelleen Gangesin tasangolle. Tätä tietä buddhalaisuus kulki Intiasta Keski-Aasiaan ja sieltä Kiinaan.',
    kaupungit: ['balkh', 'bamiyan', 'kabul', 'peshawar', 'taxila', 'mathura'],
    pisteet: [
      [66.9, 36.8], [67.8, 34.8], [69.2, 34.5], [71.6, 34.0], [72.8, 33.7],
      [74.3, 31.6], [77.7, 27.5],
    ],
  },
  {
    avain: 'arotie',
    nimi: 'Pohjoinen aroreitti',
    laji: 'maa',
    varmuus: 'epavarma',
    lahde: 'Reitin yleiskulku: Francesco Balducci Pegolottin kauppiaan käsikirja "La pratica della mercatura" (n. 1340), joka kuvaa matkan Tanasta Kiinaan; paikkojen koordinaatit ks. kaupungit.',
    selite: 'Mongolikauden reitti, joka kiersi vuoret pohjoisen kautta: Mustaltamereltä Volgalle, Aral-järven eteläpuolitse Syrdarjalle ja aroa myöten Dzungariaan ja Pekingiin. Kulki hevosen selässä eikä kameleilla, ja oli auki vain niin kauan kuin yksi valta piti aroa kurissa. Väliasemien tarkka linja on tulkintaa.',
    kaupungit: ['kaffa', 'tana', 'sarai', 'urgench', 'otrar', 'taraz', 'khanbaliq'],
    pisteet: [
      [35.4, 45.0], [39.4, 47.1], [47.4, 47.2], [53.0, 45.0], [60.6, 41.6],
      [64.5, 42.5], [68.3, 42.9], [71.4, 42.9], [76.9, 43.2], [82.0, 45.5],
      [87.6, 43.8], [93.5, 42.8], [100.5, 38.9], [105.7, 38.5], [111.0, 40.5],
      [116.4, 39.9],
    ],
  },
  {
    avain: 'meritie',
    nimi: 'Meritie',
    laji: 'meri',
    varmuus: 'karkea',
    lahde: 'Varhaisin osuus: Periplus Maris Erythraei (n. 40–70 jaa.), käännös University of Washington, Silk Road Seattle. Myöhemmät satamat ks. kaupungit.',
    selite: 'Punaisenmereltä monsuunin kanssa Arabianmeren yli Intiaan, Sri Lankan ohi Bengalinlahden poikki Malakan salmelle ja Etelä-Kiinan merta pitkin Guangzhouhun. Aleksandriasta Punaisellemerelle mentiin maitse ja jokea pitkin — se osuus viivaa ei ole purjehdusta.',
    kaupungit: ['aleksandria', 'myoshormos', 'berenike', 'aden', 'muziris',
      'mantai', 'nagapattinam', 'malakka', 'palembang', 'ocEo', 'guangzhou',
      'quanzhou'],
    pisteet: [
      [29.9, 31.2], [32.6, 29.9], [34.2, 26.2], [35.5, 23.9], [39.5, 17.0],
      [43.4, 12.7], [45.0, 12.8], [55.0, 12.0], [72.0, 10.5], [76.2, 10.2],
      [77.0, 8.0], [79.9, 9.0], [79.8, 10.8], [86.0, 8.0], [95.3, 5.5],
      [99.5, 3.5], [102.2, 2.2], [104.8, -3.0], [105.5, 2.0], [105.2, 10.2],
      [108.5, 15.0], [111.5, 20.0], [113.3, 23.1], [117.0, 23.5], [118.7, 24.9],
    ],
  },
  {
    avain: 'persianlahti',
    nimi: 'Persianlahden haara',
    laji: 'meri',
    varmuus: 'karkea',
    lahde: 'Satamat: Wikipedia (en) "Siraf", "Basra", "Hormuz Island"; koordinaatit ks. kaupungit.',
    selite: 'Meritien toinen läntinen pää. Bagdadin tavara laskeutui Tigristä Basraan ja purjehti Persianlahden suulta samoja monsuunireittejä Intiaan ja Kiinaan.',
    kaupungit: ['baghdad', 'basra', 'siraf', 'hormuz', 'muscat'],
    pisteet: [
      [44.4, 33.3], [47.8, 30.5], [49.5, 29.5], [52.3, 27.7], [56.5, 27.1],
      [58.4, 23.6], [61.0, 22.0], [68.0, 15.0], [76.2, 10.2],
    ],
  },
  {
    avain: 'itaafrikka',
    nimi: 'Itä-Afrikan haara',
    laji: 'meri',
    varmuus: 'karkea',
    lahde: 'Satamat: Wikipedia (en) "Mogadishu", "Kilwa Kisiwani"; Periplus Maris Erythraei mainitsee rannikon kauppapaikat jo 1. vuosisadalla jaa.',
    selite: 'Swahilirannikko oli osa samaa monsuuniverkkoa: sieltä tuli kultaa, norsunluuta ja mangrovepuuta, ja sinne meni intialaista kangasta ja kiinalaista posliinia.',
    kaupungit: ['aden', 'mogadishu', 'kilwa'],
    pisteet: [
      [45.0, 12.8], [51.3, 11.8], [51.0, 5.0], [45.3, 2.0], [42.0, -2.5],
      [39.7, -4.1], [39.5, -9.0],
    ],
  },
];

// --------------------------------------------------------------------------
// Valtakunnat. LUE TIEDOSTON ALUN VAROITUS ENNEN KUIN USKOT NÄITÄ MUOTOJA.
//
// Jokainen ääriviiva on piirretty käsin yhdestä ainoasta näkökulmasta:
// mikä alue oli suunnilleen tämän hallitsijan verotusvallassa mainittuna
// vuonna. Se on tarkoituksellinen yksinkertaistus. Vasallivaltiot,
// suojelualueet ja veroa maksavat naapurit on joko otettu kokonaan mukaan
// tai jätetty kokonaan pois, ja kumpi kulloinkin, se lukee selitteessä.
//
// Autiomaissa ja aroilla viiva on puhdas sopimus. Roomalla ei ollut rajaa
// Saharassa eikä Han-dynastialla Gobissa: oli vartioasemia ja niiden
// välissä ei mitään. Viiva piirretään siihen, mihin kartantekijät ovat
// tottuneet sen piirtämään, koska tyhjää ei voi piirtää.
//
// Renkaista on jätetty pois pienet saaret. Rooman kohdalla Sisilia,
// Sardinia, Korsika, Kreeta ja Kypros jäävät mannerrenkaan sisään, koska
// rengas kiertää koko Välimeren; se on piirtoteknisesti kätevää mutta
// tarkoittaa, että meri näkyy täytettynä. Piirtäjä voi halutessaan
// piirtää valtakunnat pelkkänä ääriviivana ilman täyttöä.
// --------------------------------------------------------------------------

const HISTORIA_VALTAKUNNAT = [
  {
    avain: 'han-100eaa',
    nimi: 'Han-dynastia',
    vuosi: -100,
    aikavali: 'noin 100 eaa.',
    varmuus: 'karkea',
    lahde: 'Britannica "Han dynasty"; Wikipedia (en) "Han dynasty", "Hexi Corridor". Hexin neljä komentokuntaa perustettiin 121–111 eaa., Nanyue liitettiin 111 eaa. ja Korean komentokunnat 108 eaa.',
    selite: 'Läntinen Han juuri sen jälkeen, kun se oli ottanut Hexin käytävän xiongnuilta ja avannut tien länteen. Tarimin allas EI ole mukana: sen keidasvaltiot tulivat Hanin suojelukseen vasta vuodesta 60 eaa., ja silloinkin vain vasalleina.',
    aariviivat: [[
      [94.7, 40.1], [98.5, 39.7], [100.5, 38.9], [102.6, 37.9], [104.5, 37.4],
      [106.6, 38.9], [107.5, 40.6], [110.5, 40.9], [112.6, 40.4], [114.5, 41.0],
      [117.5, 41.3], [120.5, 41.8], [122.5, 41.5], [124.0, 41.1], [125.7, 40.3],
      [126.6, 39.6], [125.7, 39.0], [126.5, 38.0], [127.3, 37.6], [126.4, 37.5],
      [122.7, 37.5], [120.3, 37.6], [120.0, 36.1], [119.5, 35.0], [120.5, 34.0],
      [121.5, 32.0], [121.9, 30.9], [121.5, 29.0], [120.0, 27.5], [118.5, 24.5],
      [116.5, 23.0], [113.5, 22.2], [110.5, 21.2], [108.5, 21.5], [106.7, 20.8],
      [106.6, 18.7], [107.5, 16.5], [106.0, 16.8], [104.8, 19.5], [104.0, 22.5],
      [103.5, 24.5], [101.5, 25.5], [100.0, 25.7], [99.5, 27.0], [102.0, 28.5],
      [103.0, 30.5], [104.5, 32.0], [105.5, 33.5], [104.0, 34.5], [103.0, 35.5],
      [102.5, 36.5], [100.0, 37.5], [97.5, 38.7], [95.5, 39.5], [94.7, 40.1],
    ]],
  },
  {
    avain: 'han-100jaa',
    nimi: 'Han-dynastia',
    vuosi: 100,
    aikavali: 'noin 100 jaa.',
    varmuus: 'karkea',
    lahde: 'Britannica "Han dynasty"; Wikipedia (en) "Eastern Han", "Protectorate of the Western Regions". Ban Chao palautti Hanin vaikutusvallan Länsimaissa 91–102 jaa.',
    selite: 'Itäinen Han, pääkaupunki nyt Luoyangissa. Ydinalue on lähes sama kuin kaksisataa vuotta aiemmin; muutos tapahtui lännessä, jossa Tarimin keidasvaltiot olivat jälleen Hanin suojeluksessa. Ne on piirretty erikseen omaksi muodokseen.',
    aariviivat: [[
      [94.7, 40.1], [98.5, 39.7], [100.5, 38.9], [102.6, 37.9], [104.5, 37.4],
      [106.6, 38.9], [107.5, 40.4], [110.5, 40.7], [112.6, 40.3], [114.5, 40.8],
      [117.5, 41.1], [120.5, 41.6], [122.5, 41.4], [124.0, 41.0], [125.7, 40.3],
      [126.6, 39.6], [125.7, 39.0], [126.5, 38.0], [127.3, 37.6], [126.4, 37.5],
      [122.7, 37.5], [120.3, 37.6], [120.0, 36.1], [119.5, 35.0], [120.5, 34.0],
      [121.5, 32.0], [121.9, 30.9], [121.5, 29.0], [120.0, 27.5], [118.5, 24.5],
      [116.5, 23.0], [113.5, 22.2], [110.5, 21.2], [108.5, 21.5], [106.7, 20.8],
      [106.6, 18.7], [107.5, 16.5], [106.0, 16.8], [104.8, 19.5], [104.0, 22.5],
      [103.5, 24.5], [101.5, 25.5], [100.0, 25.7], [99.5, 27.0], [102.0, 28.5],
      [103.0, 30.5], [104.5, 32.0], [105.5, 33.5], [104.0, 34.5], [103.0, 35.5],
      [102.5, 36.5], [100.0, 37.5], [97.5, 38.7], [95.5, 39.5], [94.7, 40.1],
    ]],
  },
  {
    avain: 'lansimaat-100jaa',
    nimi: 'Länsimaiden suojelualue',
    vuosi: 100,
    aikavali: 'noin 100 jaa.',
    varmuus: 'epavarma',
    lahde: 'Wikipedia (en) "Protectorate of the Western Regions"; Britannica "Ban Chao". Keitaiden koordinaatit ks. kaupungit.',
    selite: 'Tämä ei ollut valtakunnan osa vaan kymmenkunta omaa kuningastaan tottelevaa keidasvaltiota, jotka maksoivat Hanille ja pitivät sen varuskuntia. ”Raja” on tässä oikeasti rengas keitaita autiomaan ympärillä — allas itse oli tyhjä. Piirrä mieluummin katkoviivalla kuin täyttönä.',
    aariviivat: [[
      [76.0, 39.5], [80.3, 41.2], [82.9, 41.7], [86.6, 42.1], [89.2, 43.0],
      [93.5, 42.8], [90.6, 40.2], [88.9, 39.2], [85.5, 38.1], [82.7, 38.0],
      [79.9, 37.1], [77.2, 38.4], [76.0, 39.5],
    ]],
  },
  {
    avain: 'partia',
    nimi: 'Parthian valtakunta',
    vuosi: 1,
    aikavali: 'noin 100 eaa. – 100 jaa.',
    varmuus: 'epavarma',
    lahde: 'Britannica "Parthia"; Wikipedia (en) "Parthian Empire". Mithridates II laajensi valtakunnan Eufratille noin 100 eaa.',
    selite: 'Yksi muoto kahdelle aikaikkunalle, koska parthien raja ei pysynyt paikallaan hetkeäkään: Mesopotamiasta soti Rooman kanssa ja koillisessa alue vaihtoi omistajaa kushaneille. Reitin kannalta olennaista on, että Iranin ylänkö oli yhden vallan käsissä ja se peri välikäden voiton.',
    aariviivat: [[
      [44.0, 30.0], [47.6, 30.9], [48.5, 30.0], [50.5, 29.5], [52.0, 27.5],
      [55.0, 26.8], [57.0, 25.5], [60.0, 25.3], [61.5, 25.5], [62.0, 27.5],
      [61.5, 30.0], [61.0, 32.0], [60.5, 34.0], [61.0, 36.0], [62.2, 37.7],
      [60.0, 38.5], [57.0, 38.5], [54.0, 37.5], [53.5, 37.0], [50.0, 37.0],
      [48.5, 38.5], [47.0, 39.5], [45.5, 38.5], [44.5, 37.5], [43.0, 36.5],
      [41.5, 35.5], [40.0, 34.5], [41.0, 33.0], [42.0, 31.5], [44.0, 30.0],
    ]],
  },
  {
    avain: 'kushan',
    nimi: 'Kushan-valtakunta',
    vuosi: 100,
    aikavali: 'noin 100 jaa.',
    varmuus: 'epavarma',
    lahde: 'Britannica "Kushan dynasty"; Wikipedia (en) "Kushan Empire". Rajat tunnetaan pääosin rahalöydöistä ja piirtokirjoituksista.',
    selite: 'Keskellä reittiä ollut valtakunta, joka hallitsi sekä Baktriaa että Gandharaa ja siksi kaikkia Intian ja Keski-Aasian välisiä solia. Sen rajoista ei ole yhtään aikalaiskarttaa; muoto on arvio siitä, mistä kushanien rahoja on löydetty.',
    aariviivat: [[
      [65.0, 38.0], [68.5, 38.0], [71.5, 37.5], [74.5, 37.0], [76.0, 35.0],
      [75.5, 34.0], [77.5, 31.5], [79.5, 29.0], [81.5, 27.0], [83.5, 25.5],
      [82.0, 24.0], [78.0, 23.5], [74.5, 24.5], [73.0, 24.0], [70.5, 25.5],
      [68.0, 25.0], [66.5, 26.5], [66.0, 29.0], [65.0, 31.0], [64.0, 33.0],
      [63.5, 35.0], [64.5, 36.5], [65.0, 38.0],
    ]],
  },
  {
    avain: 'rooma-117',
    nimi: 'Rooman valtakunta',
    vuosi: 117,
    aikavali: 'noin 117 jaa.',
    varmuus: 'karkea',
    lahde: 'Britannica "Roman Empire"; Wikipedia (en) "Roman Empire", "Limes Germanicus", "Roman Dacia". Trajanuksen aikana valtakunta oli laajimmillaan vuonna 117.',
    selite: 'Laajimmillaan, Trajanuksen kuolinvuonna. Itäraja on piirretty Eufratille, vaikka Trajanus valtasi 116 myös Mesopotamian ja Armenian — ne menetettiin heti seuraavana vuonna, eikä yhden vuoden valloitusta kannata piirtää samalla viivalla kuin kolmensadan vuoden provinssia. Rengas kiertää koko Välimeren, joten Sisilia, Kreeta ja Kypros jäävät sen sisään.',
    aariviivat: [
      [
        [-6.8, 34.0], [-5.4, 35.8], [-2.0, 35.3], [1.0, 35.6], [3.5, 36.0],
        [6.5, 35.5], [8.5, 34.5], [9.6, 33.3], [10.6, 33.6], [11.1, 32.7],
        [13.2, 32.6], [15.2, 31.2], [17.5, 30.6], [19.2, 30.5], [20.1, 31.9],
        [21.6, 32.7], [23.5, 32.1], [25.1, 31.6], [27.2, 31.3], [29.9, 31.2],
        [31.2, 30.0], [32.5, 27.0], [32.9, 24.1], [33.9, 23.9], [34.6, 27.8],
        [34.9, 29.5], [35.6, 30.3], [36.8, 31.5], [37.5, 33.0], [38.3, 34.6],
        [40.0, 35.0], [40.5, 36.5], [41.0, 37.2], [39.5, 38.4], [40.5, 39.6],
        [41.4, 40.2], [39.7, 41.0], [37.0, 41.5], [35.0, 42.0], [33.0, 42.0],
        [31.0, 41.4], [29.0, 41.2], [28.5, 42.5], [28.0, 43.7], [28.8, 44.9],
        [27.5, 45.6], [26.5, 47.2], [25.0, 47.7], [23.0, 47.6], [21.5, 46.8],
        [21.5, 44.8], [20.5, 44.8], [19.0, 45.3], [18.9, 46.5], [19.0, 47.5],
        [17.9, 47.8], [16.9, 48.1], [15.5, 48.2], [13.5, 48.6], [12.1, 49.0],
        [11.0, 49.2], [9.4, 49.2], [8.6, 50.2], [7.6, 50.4], [6.9, 51.2],
        [6.1, 51.9], [4.6, 52.0], [3.2, 51.3], [1.6, 50.9], [0.2, 49.5],
        [-1.9, 49.7], [-4.8, 48.4], [-2.0, 47.2], [-1.2, 46.2], [-1.5, 43.5],
        [-3.8, 43.5], [-8.9, 43.8], [-9.5, 38.7], [-8.9, 37.0], [-6.3, 36.0],
        [-6.8, 34.0],
      ],
      [
        [-4.6, 54.9], [-2.5, 55.1], [-1.5, 54.9], [0.2, 53.5], [1.7, 52.7],
        [1.4, 51.4], [0.9, 50.8], [-1.5, 50.6], [-3.5, 50.4], [-5.7, 50.1],
        [-4.2, 51.2], [-3.0, 51.5], [-4.5, 52.0], [-4.7, 52.8], [-4.6, 53.4],
        [-3.1, 53.4], [-3.0, 54.2], [-4.6, 54.9],
      ],
    ],
  },
  {
    avain: 'tang-750',
    nimi: 'Tang-dynastia',
    vuosi: 750,
    aikavali: 'noin 750 jaa.',
    varmuus: 'karkea',
    lahde: 'Britannica "Tang dynasty"; Wikipedia (en) "Tang dynasty", "Four Garrisons of Anxi", "Nanzhao". Nanzhao itsenäistyi 738 ja löi Tangin joukot 751.',
    selite: 'Tang juuri ennen käännekohtaa. Yunnan ei ole mukana, koska Nanzhao oli irtaantunut; Korea ei ole, koska Silla oli itsenäinen vuodesta 676. Tiibetiläiset painoivat lännessä, joten Hexin käytävä oli kapea kaistale.',
    aariviivat: [[
      [94.7, 40.1], [98.0, 39.8], [100.5, 38.9], [102.6, 37.9], [104.5, 37.3],
      [106.6, 38.9], [107.5, 40.3], [110.5, 40.6], [112.6, 40.3], [115.0, 40.8],
      [117.5, 41.0], [120.0, 41.5], [122.5, 41.3], [124.0, 40.8], [125.5, 40.2],
      [124.5, 39.8], [122.0, 39.2], [119.5, 39.2], [118.5, 38.5], [119.0, 37.5],
      [120.7, 37.8], [122.5, 37.4], [120.5, 36.0], [119.5, 35.0], [120.7, 34.0],
      [121.6, 32.2], [121.9, 30.9], [121.5, 29.0], [120.0, 27.4], [118.6, 24.7],
      [116.7, 23.2], [113.6, 22.2], [110.5, 21.2], [108.5, 21.6], [106.8, 20.9],
      [106.0, 19.5], [107.3, 16.5], [106.0, 17.0], [104.5, 19.5], [104.0, 22.0],
      [104.5, 23.5], [104.0, 25.5], [105.0, 27.5], [103.5, 29.0], [102.5, 30.5],
      [102.0, 31.5], [103.5, 33.0], [104.5, 34.0], [103.5, 35.0], [102.5, 36.3],
      [100.5, 37.5], [98.0, 38.8], [95.5, 39.6], [94.7, 40.1],
    ]],
  },
  {
    avain: 'anxi-750',
    nimi: 'Anxin suojelualue',
    vuosi: 750,
    aikavali: 'noin 750 jaa.',
    varmuus: 'epavarma',
    lahde: 'Wikipedia (en) "Four Garrisons of Anxi" (varuskunnat perustettiin 648–658), "Protectorate General to Pacify the West". Tang veti joukkonsa pois An Lushanin kapinan takia 755–763.',
    selite: 'Neljä varuskuntaa — Kucha, Khotan, Kashgar ja Karashahr — ja niiden ympärillä keidasvaltiot, joita Tang valvoi. Sama varaus kuin Hanin aikana: tämä on rengas keitaita, ei yhtenäinen alue. Kaikki tämä menetettiin An Lushanin kapinan jälkeen, kun joukot vedettiin itään.',
    aariviivat: [[
      [76.0, 39.5], [80.3, 41.2], [82.9, 41.7], [86.6, 42.1], [89.2, 43.0],
      [93.5, 42.8], [90.6, 40.2], [88.9, 39.2], [85.5, 38.1], [82.7, 38.0],
      [79.9, 37.1], [77.2, 38.4], [76.0, 39.5],
    ]],
  },
  {
    avain: 'abbasidit-750',
    nimi: 'Abbasidikalifaatti',
    vuosi: 750,
    aikavali: 'noin 750–800 jaa.',
    varmuus: 'karkea',
    lahde: 'Britannica "Abbasid dynasty"; Wikipedia (en) "Abbasid Caliphate". Abbasidit nousivat valtaan 750, al-Mansur perusti Bagdadin 762.',
    selite: 'Yksi valta Atlantilta Indukselle. Iberian niemimaa on jätetty pois, koska se irtaantui omaksi emiraatikseen jo 756. Saharan ja Arabian sisäosissa viiva on pelkkä sopimus: siellä ei ollut ketään, jolta verottaa.',
    aariviivat: [[
      [-9.0, 32.0], [-5.5, 35.8], [-1.0, 35.5], [3.0, 36.8], [8.0, 37.0],
      [10.5, 37.0], [11.0, 33.5], [13.2, 32.9], [15.2, 31.2], [20.0, 32.0],
      [23.0, 32.2], [25.0, 31.6], [29.9, 31.2], [32.3, 31.2], [34.3, 31.4],
      [35.0, 33.0], [36.0, 36.0], [36.5, 37.2], [38.5, 37.5], [40.5, 37.5],
      [43.0, 37.5], [44.5, 38.5], [46.5, 40.0], [48.5, 41.5], [50.0, 40.0],
      [50.0, 37.0], [53.5, 37.0], [55.0, 38.0], [58.0, 38.5], [61.0, 38.0],
      [62.2, 37.7], [64.4, 39.8], [67.0, 39.7], [69.3, 41.3], [71.0, 40.5],
      [72.0, 39.5], [71.0, 37.5], [70.0, 34.5], [68.5, 33.5], [67.0, 32.0],
      [66.5, 30.0], [68.0, 27.5], [69.0, 26.5], [68.5, 24.5], [66.5, 25.0],
      [62.0, 25.3], [57.5, 25.5], [56.5, 25.0], [58.5, 23.5], [57.5, 20.0],
      [55.0, 17.5], [52.5, 16.5], [48.5, 14.0], [45.0, 12.8], [43.4, 12.7],
      [42.5, 15.5], [39.0, 21.5], [37.0, 25.0], [35.5, 28.0], [34.9, 29.5],
      [33.0, 28.0], [33.5, 24.0], [33.8, 22.0], [31.5, 22.0], [30.5, 24.0],
      [27.0, 26.0], [25.0, 29.0], [22.0, 29.5], [17.0, 29.0], [14.0, 28.5],
      [10.0, 30.0], [7.0, 31.0], [3.0, 32.0], [-2.0, 32.5], [-6.0, 31.5],
      [-9.0, 32.0],
    ]],
  },
  {
    avain: 'mongolit-1300',
    nimi: 'Mongolivaltakunta ja sen kaanikunnat',
    vuosi: 1300,
    aikavali: 'noin 1280–1310 jaa.',
    varmuus: 'karkea',
    lahde: 'Britannica "Mongol empire"; Wikipedia (en) "Mongol Empire" (laajimmillaan 1294, noin 23,5 milj. km²), "Pax Mongolica". Yuan valtasi eteläisen Songin 1279.',
    selite: 'Piirretty yhtenä alueena, vaikka valtakunta oli jo jakautunut neljäksi kaanikunnaksi: Yuan Kiinassa, ilkaanit Iranissa, Kultainen orda arolla ja tšagataidit Keski-Aasiassa. Ne sotivat keskenään mutta päästivät kauppiaat läpi, ja juuri se teki tästä reitin parhaan vuosisadan. Korea ja Rus\'in ruhtinaskunnat olivat vasalleja, eivät suoraan hallittuja; ne on silti otettu mukaan.',
    aariviivat: [[
      [26.0, 48.5], [25.0, 50.5], [28.0, 52.5], [31.0, 55.0], [31.5, 58.0],
      [36.0, 60.0], [45.0, 60.0], [50.0, 58.0], [56.0, 57.0], [62.0, 58.0],
      [70.0, 58.0], [80.0, 56.0], [88.0, 55.0], [95.0, 53.0], [104.0, 52.5],
      [110.0, 52.0], [116.0, 51.0], [120.0, 50.5], [126.0, 50.0], [131.0, 48.5],
      [138.0, 52.0], [140.5, 48.0], [135.0, 45.0], [132.0, 43.0], [130.5, 42.5],
      [129.5, 41.5], [128.0, 40.5], [127.5, 38.5], [129.3, 35.5], [126.5, 34.3],
      [126.5, 37.5], [124.5, 39.8], [122.0, 39.2], [119.5, 39.2], [118.5, 38.5],
      [119.0, 37.4], [120.7, 37.8], [122.6, 37.4], [120.5, 36.0], [119.5, 35.0],
      [120.7, 34.0], [121.6, 32.2], [121.9, 30.9], [121.5, 29.0], [120.0, 27.4],
      [118.6, 24.7], [116.7, 23.2], [113.6, 22.2], [110.5, 21.2], [108.5, 21.6],
      [106.8, 21.7], [104.0, 22.5], [101.5, 22.0], [99.0, 22.0], [97.5, 24.0],
      [98.0, 26.5], [96.5, 28.5], [93.0, 29.0], [88.0, 28.0], [85.0, 28.0],
      [81.0, 30.0], [79.0, 32.5], [78.0, 35.0], [76.0, 36.5], [74.0, 37.0],
      [72.0, 37.0], [70.5, 37.0], [69.0, 36.5], [67.0, 35.0], [65.0, 33.0],
      [64.5, 31.5], [62.0, 30.5], [61.0, 29.0], [60.0, 26.0], [57.5, 25.5],
      [55.0, 26.8], [52.0, 27.5], [50.0, 29.5], [48.5, 30.0], [47.5, 30.5],
      [46.0, 31.0], [44.0, 32.0], [42.0, 33.5], [41.0, 35.0], [40.0, 36.5],
      [38.5, 37.0], [36.5, 37.5], [34.0, 37.0], [32.0, 37.5], [30.0, 38.5],
      [30.0, 40.5], [35.0, 41.5], [38.0, 41.0], [40.0, 41.5], [41.5, 42.5],
      [43.0, 42.0], [45.0, 42.5], [47.5, 42.0], [48.5, 41.5], [47.0, 44.0],
      [45.0, 45.5], [40.0, 45.5], [37.0, 45.5], [35.0, 45.3], [33.5, 44.5],
      [32.5, 46.0], [30.5, 46.5], [28.5, 45.5], [26.5, 47.5], [26.0, 48.5],
    ]],
  },
  {
    avain: 'osmanit-1500',
    nimi: 'Osmanivaltakunta',
    vuosi: 1500,
    aikavali: 'noin 1500 jaa.',
    varmuus: 'karkea',
    lahde: 'Britannica "Ottoman Empire: The peak of Ottoman power 1481–1566"; Wikipedia (en) "Bayezid II". Konstantinopoli 1453, Trabzon 1461, Bosnia 1463, Kaffa 1475, Akkerman 1484.',
    selite: 'Bayezid II:n aikaa. Egypti ja Levantti EIVÄT ole mukana: ne olivat vielä mamelukkien, ja osmanit ottivat ne vasta 1516–1517. Belgrad oli Unkarin hallussa vuoteen 1521, joten pohjoisraja kulkee Savaa ja Tonavaa. Vasallit Valakia ja Moldova ovat mukana.',
    aariviivat: [
      [
        [16.0, 45.1], [19.0, 45.0], [21.0, 44.7], [22.7, 44.6], [24.0, 45.4],
        [26.0, 46.3], [27.0, 48.2], [28.6, 48.4], [30.0, 46.5], [29.6, 45.3],
        [28.8, 44.2], [28.0, 43.2], [28.1, 42.1], [29.0, 41.2], [31.0, 41.4],
        [33.0, 42.0], [35.0, 42.0], [37.0, 41.4], [39.7, 41.0], [41.0, 41.2],
        [41.0, 40.0], [40.0, 39.5], [38.5, 38.5], [37.2, 37.6], [36.5, 36.9],
        [34.9, 36.8], [33.0, 36.3], [31.0, 36.5], [29.0, 36.2], [27.5, 36.8],
        [27.2, 37.6], [26.4, 38.4], [26.7, 40.0], [26.2, 40.4], [25.0, 40.9],
        [23.9, 40.5], [22.6, 40.4], [22.6, 39.2], [23.6, 38.3], [23.7, 37.9],
        [23.1, 37.5], [23.2, 36.4], [22.5, 36.4], [21.7, 37.0], [21.3, 38.3],
        [20.9, 39.3], [19.5, 40.1], [19.4, 41.3], [18.9, 42.4], [18.0, 43.0],
        [17.0, 43.5], [16.5, 44.0], [16.0, 45.1],
      ],
      [
        [32.5, 45.4], [33.6, 45.4], [34.9, 45.3], [36.6, 45.4], [35.9, 44.9],
        [34.8, 44.4], [33.6, 44.4], [32.5, 45.4],
      ],
    ],
  },
  {
    avain: 'ming-1500',
    nimi: 'Ming-dynastia',
    vuosi: 1500,
    aikavali: 'noin 1500 jaa.',
    varmuus: 'karkea',
    lahde: 'Britannica "Ming dynasty"; Wikipedia (en) "Ming dynasty", "Great Wall of China", "Haijin". Jiayuguan on Ming-muurin läntisin linnake.',
    selite: 'Ming vetäytyi mannerreitiltä: valtakunnan länsipää on Jiayuguanin linnake, ja sen takana alkoi alue, jota Ming ei enää yrittänyt hallita. Merikieltojen (haijin) kaudella myös yksityinen merikauppa oli välillä kielletty, mikä siirsi sen salakuljetukseksi ja Malakan kaltaisiin välisatamiin.',
    aariviivat: [[
      [97.5, 39.8], [99.0, 38.9], [101.0, 38.0], [103.0, 37.5], [104.5, 37.0],
      [106.5, 38.5], [108.0, 39.5], [110.5, 39.5], [112.5, 40.3], [114.0, 40.7],
      [116.5, 40.6], [118.5, 40.2], [120.5, 40.5], [122.5, 41.5], [123.5, 42.0],
      [124.5, 41.0], [125.5, 40.4], [124.4, 40.0], [123.5, 39.8], [121.7, 39.0],
      [121.2, 38.9], [119.5, 39.2], [118.5, 38.5], [119.0, 37.4], [120.7, 37.8],
      [122.6, 37.4], [120.5, 36.0], [119.5, 35.0], [120.7, 34.0], [121.6, 32.2],
      [121.9, 30.9], [121.5, 29.0], [120.0, 27.4], [118.6, 24.7], [116.7, 23.2],
      [113.6, 22.2], [110.5, 21.2], [108.5, 21.6], [106.7, 21.8], [104.5, 22.8],
      [103.0, 22.5], [101.5, 22.2], [99.5, 22.0], [98.5, 24.0], [97.5, 25.5],
      [98.5, 27.5], [99.0, 29.0], [100.5, 30.5], [101.5, 32.0], [103.0, 33.5],
      [104.0, 34.5], [103.0, 35.5], [102.0, 36.5], [101.0, 37.0], [99.5, 38.5],
      [97.5, 39.8],
    ]],
  },
];

// --------------------------------------------------------------------------
// Aikaikkunat. Ikkuna ei ole vuosi vaan tilannekuva: "tältä reitti näytti
// suunnilleen tähän aikaan". alku ja loppu kertovat, kuinka leveää siivua
// vuosia ikkuna edustaa — sata vuotta kumpaankin suuntaan on tavallista,
// eikä se ole epätarkkuutta vaan rehellisyyttä.
//
// Selitteet on kirjoitettu aikuiselle, joka ei ole aihetta opiskellut:
// ei kuvitteellista lukijaa taluteta kädestä, mutta ei myöskään oleteta,
// että hän tietäisi kuka Ban Chao oli.
// --------------------------------------------------------------------------

const HISTORIA_IKKUNAT = [
  {
    avain: 'v100eaa',
    nimi: '100 eaa.',
    vuosi: -100,
    alku: -140, loppu: -40,
    otsikko: 'Han avaa käytävän länteen',
    varmuus: 'karkea',
    selite: 'Han-hovi lähetti Zhang Qianin länteen 138 eaa. etsimään liittolaisia xiongnuja vastaan. Hän ei löytänyt liittolaista mutta palasi tiedolla siitä, että vuorten takana oli kaupunkeja ja markkinoita. Seuraavan kolmenkymmenen vuoden aikana Han valtasi kapean Hexin käytävän ja rakensi sen varteen varuskunnat aina Dunhuangiin asti — vasta se teki säännöllisestä kaupasta mahdollista.',
    reitit: ['pohjoinen', 'etelainen'],
    valtakunnat: ['han-100eaa', 'partia'],
    kaupungit: [
      'changan', 'wuwei', 'zhangye', 'jiuquan', 'dunhuang', 'yumen', 'yangguan',
      'turfan', 'karashahr', 'kucha', 'aksu', 'loulan', 'miran', 'qiemo', 'niya',
      'khotan', 'yarkand', 'kashgar', 'osh', 'kokand', 'samarkand', 'merv',
      'balkh', 'termez', 'taxila', 'rey', 'hamadan', 'ktesifon', 'palmyra',
      'antiokia', 'tyros', 'aleksandria', 'berenike', 'myoshormos', 'aden',
      'bharuch', 'guangzhou',
    ],
  },
  {
    avain: 'v100jaa',
    nimi: '100 jaa.',
    vuosi: 100,
    alku: 1, loppu: 200,
    otsikko: 'Kaksi valtakuntaa saman langan päissä',
    varmuus: 'karkea',
    selite: 'Rooma ja Han olivat molemmat laajimmillaan eivätkä koskaan tavanneet toisiaan. Väliin jäivät parthit ja kushanit, jotka elivät siitä, että tavara vaihtoi heidän käsissään omistajaa. Samaan aikaan avautui toinen tie: kun monsuunituulten säännönmukaisuus opittiin, laiva pääsi Punaiseltamereltä Intiaan noin neljässäkymmenessä päivässä, ja meritiestä tuli maareitin kilpailija — ei sen jatke.',
    reitit: ['pohjoinen', 'etelainen', 'intianhaara', 'meritie'],
    valtakunnat: ['rooma-117', 'partia', 'kushan', 'han-100jaa', 'lansimaat-100jaa'],
    kaupungit: [
      'changan', 'luoyang', 'wuwei', 'zhangye', 'jiuquan', 'dunhuang', 'yumen',
      'yangguan', 'hami', 'turfan', 'karashahr', 'kucha', 'aksu', 'loulan',
      'miran', 'qiemo', 'niya', 'khotan', 'yarkand', 'kashgar', 'osh', 'kokand',
      'tashkent', 'samarkand', 'merv', 'balkh', 'termez', 'kabul', 'peshawar',
      'taxila', 'mathura', 'rey', 'hamadan', 'ktesifon', 'palmyra', 'antiokia',
      'tyros', 'aleksandria', 'berenike', 'myoshormos', 'aden', 'bharuch',
      'muziris', 'mantai', 'ocEo', 'guangzhou',
    ],
  },
  {
    avain: 'v750',
    nimi: '750 jaa.',
    vuosi: 750,
    alku: 650, loppu: 850,
    otsikko: 'Sogdien vuosisata',
    varmuus: 'karkea',
    selite: 'Reitin arkea eivät hoitaneet suurvallat vaan sogdit, Samarkandin ja Buharan seudun kauppiaat, joiden kieli oli reitillä sama kuin englanti on nyt lentokentällä. Tang-Kiina piti Tarimin keitailla varuskuntia ja abbasidikalifaatti ulottui Atlantilta Indukselle. Vuonna 751 nämä kaksi kohtasivat Talasjoella, ja pian sen jälkeen Kiinan oma kapina pakotti sen vetämään joukot pois lännestä lopullisesti.',
    reitit: ['pohjoinen', 'etelainen', 'intianhaara', 'meritie', 'persianlahti'],
    valtakunnat: ['tang-750', 'anxi-750', 'abbasidit-750'],
    kaupungit: [
      'changan', 'luoyang', 'wuwei', 'zhangye', 'jiuquan', 'dunhuang', 'yumen',
      'yangguan', 'hami', 'turfan', 'karashahr', 'kucha', 'aksu', 'miran',
      'qiemo', 'khotan', 'yarkand', 'kashgar', 'osh', 'kokand', 'tashkent',
      'taraz', 'samarkand', 'bukhara', 'merv', 'balkh', 'termez', 'nishapur',
      'rey', 'hamadan', 'basra', 'siraf', 'bamiyan', 'kabul', 'peshawar',
      'konstantinopoli', 'aleksandria', 'aden', 'bharuch', 'mantai',
      'nagapattinam', 'palembang', 'guangzhou',
    ],
  },
  {
    avain: 'v1300',
    nimi: '1300 jaa.',
    vuosi: 1300,
    alku: 1250, loppu: 1350,
    otsikko: 'Mongolirauha',
    varmuus: 'karkea',
    selite: 'Mongolivalloitus tappoi ja tuhosi kaupunkeja, joista osa ei toipunut koskaan — mutta se myös yhdisti reitin ensimmäistä kertaa yhden vallan alle. Kun aro oli turvallinen, avautui kokonaan uusi pohjoinen linja, joka kiersi vuoret Volgan ja Syrdarjan kautta. Italialainen kauppias saattoi tässä ajassa kulkea Krimiltä Pekingiin, ja moni myös kulki.',
    reitit: ['pohjoinen', 'etelainen', 'arotie', 'meritie', 'persianlahti', 'itaafrikka'],
    valtakunnat: ['mongolit-1300'],
    kaupungit: [
      'khanbaliq', 'hangzhou', 'quanzhou', 'guangzhou', 'turfan', 'aksu',
      'kashgar', 'yarkand', 'khotan', 'qiemo', 'osh', 'kokand', 'tashkent',
      'taraz', 'otrar', 'samarkand', 'bukhara', 'urgench', 'sarai', 'tana',
      'kaffa', 'trabzon', 'tabriz', 'baghdad', 'basra', 'hormuz', 'muscat',
      'aden', 'aleppo', 'konstantinopoli', 'venetsia', 'genova', 'kozhikode',
      'nagapattinam', 'mogadishu', 'kilwa', 'aleksandria',
    ],
  },
  {
    avain: 'v1500',
    nimi: '1500 jaa.',
    vuosi: 1500,
    alku: 1450, loppu: 1550,
    otsikko: 'Meri vie voiton',
    varmuus: 'melko varma',
    selite: 'Mongolirauha oli hajonnut, aroreitti sulkeutunut ja Kiina vetäytynyt Jiayuguanin linnakkeen taakse. Osmanit hallitsivat Konstantinopolia vuodesta 1453 ja siten sitä kohtaa, jossa idän tavara siirtyi Eurooppaan. Vasco da Gama purjehti Afrikan ympäri Kalikutiin 1498, ja seuraavan sadan vuoden aikana maareitin merkitys valui purjelaivoihin. Reitti ei kuollut, mutta se lakkasi olemasta se, jota myöten maailman kalleimmat tavarat kulkivat.',
    reitit: ['pohjoinen', 'meritie', 'persianlahti', 'itaafrikka'],
    valtakunnat: ['osmanit-1500', 'ming-1500'],
    kaupungit: [
      'khanbaliq', 'guangzhou', 'kashgar', 'yarkand', 'khotan', 'aksu', 'qiemo',
      'osh', 'kokand', 'tashkent', 'taraz', 'samarkand', 'bukhara', 'tabriz',
      'basra', 'hormuz', 'muscat', 'aden', 'aleppo', 'bursa', 'konstantinopoli',
      'venetsia', 'genova', 'aleksandria', 'kozhikode', 'malakka', 'mogadishu',
      'kilwa',
    ],
  },
];

const HISTORIA_VAROITUS = 'Historialliset rajat ovat tulkintoja, eivät mittauksia. '
  + 'Tämän kartan valtakuntien ääriviivat ovat karkeita arvioita siitä, '
  + 'mille alueelle jonkin hallitsijan valta suunnilleen ulottui. Mitä '
  + 'kauemmas ajassa mennään, sitä epävarmempia ne ovat. Jokaisessa '
  + 'muodossa on kenttä varmuus — lue se ennen kuin uskot muodon.';

export const HISTORIA = {
  varoitus: HISTORIA_VAROITUS,
  aiheet: [
    {
      avain: 'silkkitie',
      nimi: 'Silkkitie',
      lyhyt: 'Kiinan ja Välimeren välinen kauppaverkko noin 100 eaa. – 1500 jaa.',
      varoitus: HISTORIA_VAROITUS,
      huomio: 'Nimi "Silkkitie" on 1800-luvulta: saksalainen maantieteilijä '
        + 'Ferdinand von Richthofen otti sen käyttöön 1877. Kukaan reittiä '
        + 'kulkenut ei tuntenut sitä sillä nimellä, eikä kyse ollut tiestä '
        + 'vaan verkosta, jonka osat aukesivat ja sulkeutuivat eri aikoina.',
      reitit: HISTORIA_REITIT,
      kaupungit: HISTORIA_KAUPUNGIT,
      valtakunnat: HISTORIA_VALTAKUNNAT,
      ikkunat: HISTORIA_IKKUNAT,
    },
  ],
};
