// Eurooppa: maailmankartan sisällön lähdepakka — kaupungit, kysymykset,
// aarteet, lentoreitit ja tekstit.
//
// EUROOPAN ERILLISLAUTA POISTETTIIN (Raamattu 30.8.2026,
// "erillislaudasta luovutaan"): maailmankartta on ainoa pelilauta, eikä
// tässä pakassa ole enää laudan piirtodataa (rannikot, maiden muodot ja
// koristeet poistuivat). Kaupunkien x/y ja reittien via-pisteet ovat
// vanhan 1000 x 1000 -laudan koordinaatteja — x = (pituusaste + 11)
// * 19.2, y = (72 - leveysaste) * 26.3 — ja ne säilyvät, koska
// maailmankartan generaattori johtaa niistä kaupunkien oikeat paikat
// (käänteiskaava) ja reittiverkon (tools/vanha-maailma.mjs).

import { EUROPE_QUESTIONS, EUROPE_FACTS } from './europe-questions.js';
import { EUROPE_CITY_COUNTRY } from './europe-countries.js';
import { EUROPE_PUZZLES } from './europe-puzzles.js';
import { themedTokenTypes } from '../tokens.js';

// start = aloituskaupunki (ei laattaa), airport = lentokenttä.
const EU_CITIES = [
  {
    id: 'lontoo', name: 'Lontoo', wiki: 'Lontoo', ambience: 'kaupunki', x: 209, y: 539, start: true, airport: true,
  },
  {
    id: 'istanbul', name: 'Istanbul', wiki: 'Istanbul', ambience: 'basaari', x: 766, y: 815, start: true, airport: true,
    // Sama kaupunki on myös Lähi-idän laudalla ja sillä on oma kaupunkilautansa.
  },
  { id: 'dublin', name: 'Dublin', wiki: 'Dublin', ambience: 'kaupunki', x: 91, y: 490, la: 'end', lx: -16, ly: 5 },
  { id: 'edinburgh', name: 'Edinburgh', wiki: 'Edinburgh', ambience: 'kaupunki', x: 150, y: 422, la: 'end', lx: -16, ly: 5 },
  { id: 'pariisi', name: 'Pariisi', wiki: 'Pariisi', ambience: 'kaupunki', x: 256, y: 609 },
  { id: 'marseille', name: 'Marseille', ambience: 'satama', wiki: 'Marseille', x: 312, y: 744, la: 'end', lx: -16, ly: 14 },
  { id: 'lissabon', name: 'Lissabon', wiki: 'Lissabon', ambience: 'satama', x: 36, y: 875, la: 'start', lx: 16, ly: 5 },
  {
    id: 'madrid', name: 'Madrid', wiki: 'Madrid', ambience: 'kaupunki', x: 140, y: 831, airport: true,
    // Gibraltarin salmen yli Afrikkaan.
  },
  { id: 'barcelona', name: 'Barcelona', wiki: 'Barcelona', ambience: 'satama', x: 244, y: 800, la: 'start', lx: 16, ly: 5 },
  // Granadan nimikyltti käännettiin oikealle, jotta Sevilla mahtuu sen
  // länsipuolelle Guadalquivirin suunnalle.
  { id: 'granada', name: 'Granada', ambience: 'kaupunki', wiki: 'Granada', x: 142, y: 916, la: 'start', lx: 16, ly: 5 },
  /*
   * SEVILLA ON KARTALLA noin 70 km todellista paikkaansa lounaassa,
   * Doñanan suunnalla: kaavan mukainen piste jäisi 46 yksikön päähän
   * Granadasta, kun laudan vähimmäisväli on 60.
   *
   * TARKISTETTU UUDELLEEN AALLON 4A INTEGROINNISSA (29.8.2026), koska
   * siirto luetaan helposti virheeksi. Laudan projektiolla
   * x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3 Sevilla (37,389 N,
   * 5,985 W) osuu pisteeseen (96,3, 910,3). Se piste AJETTIIN LÄPI
   * tests/rules.test.mjs:llä ja se kaatuu: *"Granada ja Sevilla ovat
   * liian lähekkäin (46)"*.
   *
   * EIKÄ TOSIPAIKAN LÄHELLE OLE MITÄÄN SALLITTUA PISTETTÄ, mikä on
   * syytä sanoa ääneen: Lissabonin (36, 875) ja Granadan (142, 916)
   * väli on 113,7 yksikköä, eli niiden 60 yksikön ympyrät LEIKKAAVAT
   * (60 + 60 = 120 > 113,7). Yhtään kaupunkien yhdysviivalla olevaa
   * pistettä ei siis ole olemassa — Sevillan on pakko istua viivan
   * etelä- tai pohjoispuolella. Koko sallitun alueen läpikäynti
   * (isOnLand + kaikki kaupunkivälit) antaa tosipaikkaa lähimmäksi
   * sallituksi pisteeksi (82, 914), joka on 14,8 yksikön päässä;
   * nykyinen (81, 917) on 16,7:n päässä. Ero on kaksi yksikköä eli
   * laudan mitassa muutama kilometri, joten paikkaa EI siirretty:
   * hyöty on olematon ja siirto liikuttaisi laattaa Tutki-kortin
   * minikartalla ilman syytä (vrt. Sarajevon rajakommentti alempana).
   */
  { id: 'sevilla', name: 'Sevilla', wiki: 'Sevilla', ambience: 'kaupunki', x: 81, y: 917, la: 'end', lx: -16, ly: 5 },
  { id: 'amsterdam', name: 'Amsterdam', wiki: 'Amsterdam', ambience: 'satama', x: 305, y: 516, la: 'start', lx: 16, ly: 5 },
  { id: 'berliini', name: 'Berliini', wiki: 'Berliini', ambience: 'kaupunki', x: 468, y: 512, airport: true },
  { id: 'praha', name: 'Praha', wiki: 'Praha', ambience: 'kaupunki', x: 488, y: 576, la: 'end', lx: -16, ly: 5 },
  { id: 'wien', name: 'Wien', wiki: 'Wien', ambience: 'kaupunki', x: 526, y: 626, la: 'start', lx: 16, ly: -6 },
  { id: 'budapest', name: 'Budapest', wiki: 'Budapest', ambience: 'kaupunki', x: 591, y: 658, la: 'start', lx: 16, ly: 10 },
  { id: 'varsova', name: 'Varsova', wiki: 'Varsova', ambience: 'kaupunki', x: 615, y: 520 },
  { id: 'krakova', name: 'Krakova', ambience: 'kaupunki', wiki: 'Krakova', x: 594, y: 577, la: 'start', lx: 16, ly: 8 },
  { id: 'alpit', name: 'Alpit', wiki: 'Alpit', ambience: 'vuoristo', x: 352, y: 640, la: 'end', lx: -16, ly: 5 },
  // Venetsia on Adrianmeren pohjukassa Milanon tilalla (omistajan valinta).
  { id: 'venetsia', name: 'Venetsia', ambience: 'satama', wiki: 'Venetsia', x: 448, y: 698, la: 'start', lx: 16, ly: -6 },
  /*
   * FIRENZE ON SIIRRETTY LÄNTEEN, ja se on mitattu päätös eikä
   * huolimattomuus. Oikea paikka (43,77° N, 11,256° E) on laudan
   * kaavalla (427, 742), mutta siitä on Venetsiaan vain 49 ja Roomaan
   * 56 yksikköä — lauta vaatii kaupunkien väliksi 60 (minCityDistance),
   * jotta nimikilvet eivät mene päällekkäin. Venetsia ja Rooma ovat
   * molemmat omilla oikeilla paikoillaan ja vain 94 yksikön päässä
   * toisistaan, joten väliin mahtuva piste on pakko työntää sivuun
   * niiden yhdysviivalta. (412, 746) on lähin sallittu piste, joka on
   * maalla: se vastaa Toscanan rannikkoseutua Pisan ja Livornon
   * suunnalla, eli kaupunki on samassa maakunnassa mutta noin 65 km
   * lounaaseen. Sama ratkaisu kuin Wienillä, Budapestilla, Alpeilla ja
   * Sarajevolla — ks. Sarajevon kommentti alempana.
   */
  // Nimi oikealle: vasemmalla se peittäisi Marseillen laatan.
  { id: 'firenze', name: 'Firenze', wiki: 'Firenze', ambience: 'kaupunki', x: 412, y: 746, la: 'start', lx: 16, ly: 5 },
  { id: 'rooma', name: 'Rooma', wiki: 'Rooma', ambience: 'kaupunki', x: 451, y: 792, airport: true, la: 'end', lx: -16, ly: 5 },
  { id: 'sisilia', name: 'Sisilia', wiki: 'Sisilia', ambience: 'meri', x: 468, y: 891, la: 'end', lx: -16, ly: 5 },
  {
    id: 'ateena', name: 'Ateena', wiki: 'Ateena', ambience: 'kaupunki', x: 667, y: 895, start: true, airport: true, la: 'end', lx: -16, ly: 5,
  },
  { id: 'kreeta', name: 'Kreeta', wiki: 'Kreeta', ambience: 'meri', x: 695, y: 964, la: 'middle', lx: 0, ly: 26 },
  // Nimi alapuolelle: Sarajevo on nyt suoraan yläpuolella.
  { id: 'dubrovnik', name: 'Dubrovnik', wiki: 'Dubrovnik', ambience: 'satama', x: 560, y: 770, la: 'middle', lx: 0, ly: 30 },
  // Sarajevoa on siirretty hieman itään, jotta nimet mahtuvat Balkanilla.
  // Sarajevo ei mahdu tarkalleen oikealle paikalleen (565, 740): se on
  // vain 30 yksikön päässä Dubrovnikista, ja lauta vaatii kaupunkien
  // väliksi 60. Aiemmin kaupunkia oli siirretty itään, jolloin piste
  // jäi Bosnian rajojen ULKOPUOLELLE Tutki-kortin minikartalla
  // (omistajan havainto). Nyt siirto on pohjoiseen: tämä on lähin
  // sallittu paikka, joka on maan sisällä.
  { id: 'sarajevo', name: 'Sarajevo', ambience: 'basaari', wiki: 'Sarajevo', x: 561, y: 710, la: 'start', lx: 16, ly: -6 },
  { id: 'sofia', name: 'Sofia', wiki: 'Sofia', ambience: 'kaupunki', x: 659, y: 771, la: 'start', lx: 16, ly: 5 },
  { id: 'bukarest', name: 'Bukarest', wiki: 'Bukarest', ambience: 'kaupunki', x: 712, y: 725, la: 'start', lx: 16, ly: 5 },
  { id: 'kiova', name: 'Kiova', wiki: 'Kiova', ambience: 'kaupunki', x: 797, y: 567 },
  { id: 'odessa', name: 'Odessa', wiki: 'Odessa', ambience: 'satama', x: 800, y: 669, la: 'start', lx: 16, ly: 5 },
  {
    id: 'moskova', name: 'Moskova', wiki: 'Moskova', ambience: 'kaupunki', x: 934, y: 427, start: true, airport: true, la: 'end', lx: -16, ly: 5,
    // Sama kaupunki on myös Maailma-laudalla, josta Siperian rata jatkuu itään.
  },
  // 'Pietari' on fi-wikissä täsmennyssivu (apostoli, kaupunki, etunimi):
  // ilman tarkennetta Lue lisää, kuvat ja peilaus jäivät tyhjiksi.
  { id: 'pietari', name: 'Pietari', wiki: 'Pietari (kaupunki)', ambience: 'kaupunki', x: 793, y: 317, la: 'start', lx: 16, ly: 5 },
  {
    id: 'helsinki', name: 'Helsinki', wiki: 'Helsinki', ambience: 'metsa', x: 688, y: 303, airport: true, la: 'end', lx: -16, ly: -12,
    // Suomen oma lauta avautuu Helsingistä.
  },
  /*
   * TAMPERE JA LAUDAN VÄHIMMÄISVÄLI. Laudan projektiolla
   * x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3 Tampere (61,498 N,
   * 23,761 E) osuisi pisteeseen 667, 276 — vain 34 pikselin päähän
   * Helsingistä (688, 303). Euroopan lauta vaatii kaupunkien väliksi
   * 60 pikseliä (minCityDistance), ja syy on mekaaninen eikä
   * esteettinen: aarrelaatta piirretään kohtaan (x+22, y+18), joten
   * tosipaikallaan Tampereen laatta istuisi suoraan Helsingin pallon
   * päällä. Kaupunki on siksi siirretty samaa Helsinki–Tampere-
   * suuntaa pitkin pohjoiseen pisteeseen 657, 245 (≈ 66 px
   * Helsingistä). Pituuspiiri pysyy lähes oikeana (23,2° vs. 23,8°);
   * leveyspiiri liukuu Keuruun korkeudelle. Nimikilpi lähtee
   * vasemmalle omalle rivilleen, jottei se osu Helsingin kilpeen.
   */
  { id: 'tampere', name: 'Tampere', wiki: 'Tampere', ambience: 'metsa', x: 657, y: 245, la: 'end', lx: -14, ly: -9 },
  { id: 'tallinna', name: 'Tallinna', wiki: 'Tallinna', ambience: 'kaupunki', x: 684, y: 374, la: 'start', lx: 14, ly: 12 },
  { id: 'riika', name: 'Riika', wiki: 'Riika', ambience: 'kaupunki', x: 648, y: 434, la: 'end', lx: -14, ly: 14 },
  { id: 'vilna', name: 'Vilna', wiki: 'Vilna', ambience: 'kaupunki', x: 703, y: 470, la: 'start', lx: 16, ly: 5 },
  {
    id: 'tukholma', name: 'Tukholma', wiki: 'Tukholma', ambience: 'satama', x: 558, y: 333, airport: true, la: 'end', lx: -16, ly: 5,
    // Ruotsinlaiva Ahvenanmaalle — Suomen laudalle.
  },
  { id: 'oslo', name: 'Oslo', wiki: 'Oslo', ambience: 'metsa', x: 418, y: 318, la: 'end', lx: -16, ly: 5 },
  { id: 'bergen', name: 'Bergen', wiki: 'Bergen', ambience: 'satama', x: 313, y: 305, la: 'end', lx: -16, ly: 5 },
  { id: 'kobenhavn', name: 'Kööpenhamina', wiki: 'Kööpenhamina', ambience: 'satama', x: 452, y: 429, la: 'start', lx: 16, ly: 5 },
  /*
   * Kohteen id pysyy 'lappi' — siihen viitataan kymmenissä tiedostoissa
   * (kysymykset, saapumiset, valokuvat, säätiedot, kategoriat). Nimi ja
   * wiki ovat 17.8.2026 alkaen Rovaniemi: koordinaatit ovat aina olleet
   * Rovaniemen (napapiiri), ja laudalla on nyt alueen sijasta kaupunki.
   */
  { id: 'lappi', name: 'Rovaniemi', wiki: 'Rovaniemi', ambience: 'pohjoinen', x: 705, y: 145, la: 'end', lx: -16, ly: 5 },
  { id: 'tromssa', name: 'Tromssa', wiki: 'Tromssa', ambience: 'pohjoinen', x: 577, y: 66, la: 'start', lx: 16, ly: 5 },
  /*
   * Islanti on laudan kaavan ULKOPUOLELLA, ja piste on siksi summittainen.
   *
   * Kaava kattaa pituusasteet -11°...41°. Reykjavík on -21.9°, joten
   * kaava antaisi x = -210: piste jäisi laudan viewBoxin (0...1000)
   * ulkopuolelle näkymättömiin, ja sen kaksi laivareittiä lähtisivät
   * kartan reunan takaa. Siksi piste pantiin laudan yläkulmaan, missä
   * ei ollut rannikkoa vastaan sotimassa — erillislauta on sittemmin
   * poistettu kokonaan (Raamattu 30.8.2026), ja piste on jäljellä vain
   * koska generaattorit lukevat kaupunkilistaa.
   *
   * ÄLÄ käännä tästä lon/lat-arvoa: kaava lukisi 69.7°N 7.8°W eli
   * avomeren Islannin koillispuolelta. Juuri niin maailmankartta peri
   * väärän pisteen (omistajan kuvakaappaus 17.8.2026). Todellinen paikka
   * annetaan käsin: tools/vanha-maailma.mjs TARKAT_PAIKAT.
   */
  { id: 'islanti', name: 'Islanti', ambience: 'pohjoinen', wiki: 'Islanti', x: 62, y: 60, la: 'middle', lx: 0, ly: 42 },
];

/*
 * REITIT OVAT GENERAATTORIN LÄHDEDATAA, EIVÄT ENÄÄ PELILAUDAN PIIRTOA.
 * Yhdistetty maailmankartta johtaa reittiverkkonsa lähdepakkojen
 * edges-listoista (tools/vanha-maailma.mjs reitit, tools/
 * tee-maailmankartta.mjs), joten lista säilyy erillislaudan purusta
 * huolimatta. via-pisteet ovat vanhan laudan koordinaateissa; sovitus
 * maailmankartalle tehdään generaattorissa.
 *
 * steps = kuinka monta silmälukua reitin kulkeminen vaatii.
 * type 'sea' = laivareitti; via = piirto- ja tarkistuspisteet veden päällä.
 */
const EU_EDGES = [
  // Brittein saaret ja Kanaali
  { a: 'lontoo', b: 'edinburgh', steps: 3 },
  // Kanaalitunneli on oikea maayhteys mantereelle.
  { a: 'lontoo', b: 'pariisi', steps: 3 },

  // Länsi-Eurooppa. Biskajan rannikon suora reitti on jätetty pois:
  // Iberiaan kuljetaan Rhônen laaksoa ja rannikkoa pitkin (haaste).
  { a: 'pariisi', b: 'amsterdam', steps: 3 },
  { a: 'pariisi', b: 'marseille', steps: 4 },
  { a: 'pariisi', b: 'alpit', steps: 3 },
  { a: 'marseille', b: 'barcelona', steps: 3 },
  { a: 'marseille', b: 'alpit', steps: 3 },
  { a: 'madrid', b: 'lissabon', steps: 3 },
  { a: 'madrid', b: 'barcelona', steps: 3 },
  { a: 'madrid', b: 'granada', steps: 3 },
  /*
   * Suora granada–lissabon (4) poistettu: Sevilla istuu käytännössä
   * reitin varrella (noin 25 yksikön päässä suorasta linjasta, kun
   * laudan vähimmäisväli on 60), ja ketju sevilla–granada (2) +
   * sevilla–lissabon (2) maksaa saman neljä askelta.
   */
  { a: 'sevilla', b: 'granada', steps: 2 },
  { a: 'sevilla', b: 'lissabon', steps: 2 },
  { a: 'sevilla', b: 'madrid', steps: 3 },

  // Keski-Eurooppa
  { a: 'amsterdam', b: 'berliini', steps: 4 },
  { a: 'berliini', b: 'praha', steps: 2 },
  { a: 'berliini', b: 'varsova', steps: 4 },
  { a: 'berliini', b: 'kobenhavn', steps: 2 },
  { a: 'praha', b: 'wien', steps: 2 },
  { a: 'praha', b: 'krakova', steps: 3 },
  { a: 'krakova', b: 'varsova', steps: 2 },
  { a: 'krakova', b: 'budapest', steps: 3 },
  { a: 'wien', b: 'budapest', steps: 2 },
  { a: 'wien', b: 'venetsia', steps: 4 },
  { a: 'alpit', b: 'venetsia', steps: 3 },
  { a: 'alpit', b: 'berliini', steps: 4 },
  /*
   * Firenze katkaisi vanhan venetsia–rooma-yhteyden (3 askelta)
   * kahdeksi. Molemmat pätkät ovat 60 yksikköä pitkiä, ja laudan
   * muut samanmittaiset maayhteydet (Krakova–Varsova, Sarajevo–
   * Dubrovnik, Budapest–Sarajevo) maksavat kaksi askelta — sama
   * hinta siis tässäkin. Suora Venetsia–Rooma poistettiin, koska se
   * olisi kulkenut Firenzen ohi rinnakkaisena pikatienä ja tehnyt
   * uudesta kaupungista väliinjäävän mutkan.
   */
  { a: 'venetsia', b: 'firenze', steps: 2 },
  { a: 'firenze', b: 'rooma', steps: 2 },
  // Bosnian rata: Budapestista Sarajevoon ja vuorten yli rannikolle.
  { a: 'budapest', b: 'sarajevo', steps: 2 },
  { a: 'sarajevo', b: 'dubrovnik', steps: 2 },
  { a: 'sarajevo', b: 'sofia', steps: 3 },
  { a: 'budapest', b: 'bukarest', steps: 4 },
  { a: 'sofia', b: 'ateena', steps: 4 },
  { a: 'sofia', b: 'istanbul', steps: 3 },
  { a: 'sofia', b: 'bukarest', steps: 2 },
  { a: 'bukarest', b: 'odessa', steps: 3 },
  { a: 'odessa', b: 'kiova', steps: 3 },
  { a: 'kiova', b: 'varsova', steps: 5 },
  { a: 'pietari', b: 'tallinna', steps: 3 },
  { a: 'tallinna', b: 'riika', steps: 2 },
  { a: 'riika', b: 'vilna', steps: 2 },
  { a: 'vilna', b: 'varsova', steps: 3 },
  { a: 'kiova', b: 'moskova', steps: 5 },
  { a: 'moskova', b: 'pietari', steps: 4 },
  { a: 'pietari', b: 'helsinki', steps: 3 },
  /*
   * Suora helsinki–lappi (4) poistettu (omistajan tilaus 17.8.2026):
   * Tampere istuu käytännössä reitin varrella, ja ketju
   * helsinki–tampere (2) + tampere–lappi (3) maksaa vain yhden
   * askelen enemmän (5 vs. 4) — sama hinta kuin laudan muilla
   * vastaavilla korvauksilla (esim. Firenze, Sevilla).
   * Askelmitoitus naapureiden mukaan: 66 px / 2 ja 111 px / 3 eli
   * 33 ja 37 pikseliä silmälukua kohti (laudan haarukka on 26–50).
   */
  { a: 'helsinki', b: 'tampere', steps: 2 },
  { a: 'tampere', b: 'lappi', steps: 3 },
  { a: 'lappi', b: 'tromssa', steps: 3 },
  { a: 'tromssa', b: 'oslo', steps: 6 },
  { a: 'bergen', b: 'oslo', steps: 3 },
  { a: 'oslo', b: 'tukholma', steps: 3 },
  { a: 'oslo', b: 'kobenhavn', steps: 3 },
  { a: 'tukholma', b: 'kobenhavn', steps: 3 },

  // Laivareitit
  { a: 'lontoo', b: 'amsterdam', steps: 3, type: 'sea' },
  // Pohjanmeren yli Skotlantiin: Bergenin vanha väylä länttä kohti.
  { a: 'bergen', b: 'edinburgh', steps: 5, type: 'sea', via: [[270, 330], [230, 350], [200, 380]] },
  { a: 'lontoo', b: 'dublin', steps: 3, type: 'sea',
    via: [[225, 570], [170, 576], [110, 600], [70, 592], [100, 540], [100, 505]] },
  { a: 'dublin', b: 'edinburgh', steps: 3, type: 'sea' },
  // Sardinia ja Korsika ilmestyivät kartalle tarkan rannikon myötä, ja
  // suora reitti kulki niiden yli. Laiva kiertää saaret etelästä, kuten
  // oikeatkin alukset Barcelonasta Tyrrhenanmerelle.
  {
    a: 'barcelona', b: 'rooma', steps: 4, type: 'sea',
    via: [[300, 860], [400, 880], [440, 830]],
  },
  { a: 'venetsia', b: 'dubrovnik', steps: 4, type: 'sea', via: [[505, 745]] },
  { a: 'rooma', b: 'sisilia', steps: 3, type: 'sea' },
  { a: 'sisilia', b: 'ateena', steps: 4, type: 'sea' },
  { a: 'ateena', b: 'kreeta', steps: 2, type: 'sea' },
  { a: 'kreeta', b: 'sisilia', steps: 5, type: 'sea', via: [[620, 950], [540, 930]] },
  { a: 'istanbul', b: 'odessa', steps: 4, type: 'sea' },
  { a: 'dubrovnik', b: 'rooma', steps: 3, type: 'sea' },
  { a: 'tukholma', b: 'helsinki', steps: 2, type: 'sea' },
  { a: 'helsinki', b: 'tallinna', steps: 1, type: 'sea', via: [[672, 340]] },
  { a: 'riika', b: 'tukholma', steps: 3, type: 'sea', via: [[610, 395], [580, 365]] },
  // Islannin pitkät valtamerireitit: etelään Skotlantiin ja itään Jäämerelle.
  // Eteläreitti kiertää EUROOPPA-otsikon itäpuolelta Pohjanmeren kautta.
  { a: 'islanti', b: 'edinburgh', steps: 5, type: 'sea',
    via: [[210, 80], [320, 110], [300, 240], [240, 340], [205, 385]] },
  { a: 'islanti', b: 'tromssa', steps: 5, type: 'sea', via: [[290, 32], [450, 38]] },
];


// Lentoreitit kulkevat suoraan kaupungista toiseen yhdellä vuorolla.
const EU_AIR_ROUTES = [
  { a: 'lontoo', b: 'madrid' },
  { a: 'lontoo', b: 'berliini' },
  { a: 'lontoo', b: 'tukholma' },
  { a: 'madrid', b: 'rooma' },
  { a: 'berliini', b: 'rooma' },
  { a: 'rooma', b: 'ateena' },
  { a: 'rooma', b: 'istanbul' },
  { a: 'tukholma', b: 'moskova' },
  { a: 'istanbul', b: 'moskova' },
];

export const EUROPE = {
  id: 'europe',
  name: 'Meripihkahuone',
  boardLabel: 'Eurooppa',
  tagline: 'Etsi kadonneen Meripihkahuoneen aarre tunturien, kanavien ja raunioiden takaa.',
  ariaLabel: 'Euroopan aarrekartta',

  /*
   * Laudan piirtodata (rannikot, muodot, reitit, koristeet) poistui
   * erillislaudan mukana. cityCountry jää: se on SISÄLTÖKYTKENTÄ
   * (kaupunki -> ISO3), jota maailmankartan generaattori ja työhuoneen
   * tilastot lukevat tästä pakasta.
   */
  map: { cityCountry: EUROPE_CITY_COUNTRY },
  cities: EU_CITIES,
  edges: EU_EDGES,
  airRoutes: EU_AIR_ROUTES,

  tokens: {
    types: themedTokenTypes({
      star: {
        name: 'Meripihkahuoneen aarre',
        fakta: 'Meripihkahuone oli kokonainen huone meripihkapaneeleista: '
          + 'Preussin kuningas lahjoitti sen Pietari Suurelle 1716, ja '
          + 'vuonna 1945 se katosi Königsbergistä jäljettömiin.',
        kuva: 'assets/aarteet/aarre-europe-star.jpg',
      },
      mannerAarre: {
        name: 'Kruununjalokivi', color: '#b0304a',
        kuva: 'assets/aarteet/aarre-europe-manner.jpg',
      },
      // Mantereen oma paikallisaarrepari (entiset jalokiviaarteet
      // nimineen ja kuvineen) — väliaikainen, kunnes maakohtaiset
      // parit (js/packs/paikallisaarteet.js) täyttyvät.
      isoAarre: {
        name: 'Ritarin hopeamiekka', color: '#aeb6c2',
        kuva: 'assets/aarteet/aarre-europe-emerald.jpg',
      },
      /*
       * Kuva on meripihkaa — kokkareita, joista yhteen on jäänyt
       * hyönteinen — joten nimi ja fakta ovat meripihkaa (omistajan
       * päätös 28.8.2026: otsikko seuraa kuvaa, ei toisin päin).
       */
      pieniAarre: {
        name: 'Itämeren meripihka', color: '#d98f2b',
        kuva: 'assets/aarteet/aarre-europe-topaz.jpg',
        fakta: 'Meripihka ei ole kivi vaan havupuiden pihkaa, joka '
          + 'kovettui noin 40 miljoonaa vuotta sitten. Maailman suurin '
          + 'esiintymä on Itämeren rannalla Samlandin niemimaalla, ja '
          + 'myrsky heittää kokkareita yhä rantahiekkaan. Etelään sitä '
          + 'kuljetettiin meripihkatietä pitkin Itämereltä Adrianmerelle '
          + 'asti, ja kirkkaimpiin paloihin on jäänyt hyönteisiä kiinni.',
      },
    }),
    // Laattoja on oltava tasan yhtä monta kuin kaupunkeja (45). Uusi
    // kaupunki lisätään paikallisaarteisiin samassa suhteessa kuin
    // muutkin (noin kolmasosa isoja) — pääaarre ja mantereen aarre ovat
    // aina yksi kumpikin, eikä ryöstäjien määrä muutu kaupunkien mukana.
    counts: { star: 1, mannerAarre: 1, isoAarre: 14, pieniAarre: 29 },
  },

  questions: EUROPE_QUESTIONS,
  placeFacts: EUROPE_FACTS,

  duels: [
    {
      q: 'Mikä näistä kaupungeista EI ole koskaan ollut valtion pääkaupunki?',
      options: ['Milano', 'Praha', 'Wien', 'Varsova', 'Ateena', 'Lissabon', 'Oslo', 'Budapest'],
      correct: 0,
      fact: 'Milano on Lombardian pääkaupunki mutta ei koskaan ollut Italian; kaikki muut ovat oman maansa pääkaupunkeja.',
    },
    {
      q: 'Mikä näistä joista EI laske Mustaanmereen?',
      options: ['Rein', 'Tonava', 'Dnepr', 'Don', 'Dnestr', 'Bug', 'Prut', 'Kubannjoki'],
      correct: 0,
      fact: 'Rein virtaa Alpeilta pohjoiseen ja laskee Pohjanmereen. Kaikki muut päätyvät Mustaanmereen.',
    },
    {
      q: 'Missä maassa sijaitsee Euroopan korkein huippu Elbrus?',
      options: ['Venäjällä', 'Georgiassa', 'Turkissa', 'Italiassa', 'Ranskassa', 'Sveitsissä', 'Itävallassa', 'Espanjassa'],
      correct: 0,
      fact: 'Elbrus on Kaukasuksella Venäjän puolella lähellä Georgian rajaa ja kohoaa 5 642 metriin.',
    },
    {
      q: 'Mikä näistä kielistä EI kuulu indoeurooppalaisiin kieliin?',
      options: ['unkari', 'kreikka', 'albania', 'liettua', 'iiri', 'romania', 'hollanti', 'puola'],
      correct: 0,
      fact: 'Unkari on suomalais-ugrilainen kieli, samoin suomi ja viro. Kaikki muut luetellut ovat indoeurooppalaisia.',
    },
    {
      q: 'Minä vuonna Berliinin muuri avattiin?',
      options: ['1989', '1961', '1968', '1975', '1980', '1985', '1991', '1993'],
      correct: 0,
      fact: 'Muuri avattiin 9. marraskuuta 1989. Se oli seissyt 28 vuotta, sillä sen rakentaminen alkoi 1961.',
    },
    {
      q: 'Mikä näistä on Euroopan unionin virallinen kieli?',
      options: ['iiri', 'norja', 'islanti', 'turkki', 'ukraina', 'serbia', 'albania', 'sveitsinsaksa'],
      correct: 0,
      fact: 'Iiri on ollut EU:n virallinen kieli vuodesta 2007. Norja ja Islanti eivät kuulu unioniin lainkaan.',
    },
  ],

  texts: {
    intro: 'Peli alkaa! Etsikää kadonneen Meripihkahuoneen aarre ja palatkaa kotisatamaan: Lontooseen, Istanbuliin, Moskovaan tai Ateenaan.',
    starFound: (name, city) => `◈ ${name} löysi MERIPIHKAHUONEEN AARTEEN kaupungista ${city}!`,
    starToast: 'MERIPIHKAHUONEEN AARRE!',
    starChase: 'Nyt on kiire kotiin — ensimmäisenä perille ehtinyt voittaa pelin.',
    winStar: 'toi Meripihkahuoneen aarteen turvallisesti kotiin',
    winnerStar: (name, money) => `${name} toi Meripihkahuoneen aarteen kotiin ${money} punnan kanssa.`,
    // Saapumismerkinnät: yksi arvotaan laudalle saavuttaessa.
    diaries: [
      'Kotimantere. Puolet karttani rajoista on väärin, ja loput ylitetään näyttämättä passia. Kukaan ei tarkasta papereitani — en tiedä, olenko helpottunut vai loukkaantunut.',
      '"Mannermaalla tarvitaan passi, kultaa ja kärsivällisyyttä", kirjoitti isoisä. Minulla on kortti, jolla maksan junalipun Lissabonista Tallinnaan, eikä kukaan kysy mitään. Kärsivällisyyttä tarvitaan enää vaihdoilla.',
      'Isoisän kartassa tämä maanosa on jaettu viiden keisarin kesken. Nyt tässä on yli neljäkymmentä valtiota, joista moni käyttää samaa rahaa ja jokainen omaa lippuaan. Hänen viisi keisariaan mahtuisivat nykyään yhteen kokoushuoneeseen — ja jonottaisivat vuoroaan.',
      '"Junat myöhästyvät kaikkialla paitsi Sveitsissä", merkitsi isoisä huolellisesti. Istun asemalla ja katson taulua, joka sanoo saman asian sataviisikymmentä vuotta myöhemmin. Jotkut havainnot eivät vanhene lainkaan.',
      'Isoisä luetteli maanosan suuret joet ja sai ne oikein: Volga, Tonava, Rein, Veiksel. Rajat hän sai väärin lähes kaikki. Vedet pysyivät, rajat eivät — tämä on matkani lyhyin oppitunti.',
    ],
  },

  puzzles: EUROPE_PUZZLES,
};
