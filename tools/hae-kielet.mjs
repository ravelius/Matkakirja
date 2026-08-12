/*
 * Hakee kielikuntien linssin aineiston.
 *
 *   NODE_USE_ENV_PROXY=1 node tools/hae-kielet.mjs [--kuiva]
 *
 * Kirjoittaa js/packs/linssi-kielet.js: 25 kielikuntaa, kullekin
 * suomenkielinen nimi, puhujamäärä, esimerkkikieliä ja karkea
 * levinneisyysalue monikulmioina.
 *
 * --- miksi kolme lähdettä eikä yksi ---
 *
 * Yhtä vapaata aineistoa, jossa olisi sekä kielikuntien sukupuu,
 * kielten sijainnit että puhujamäärät, ei ole olemassa. Siksi:
 *
 *   Glottolog 5.2 (CC BY 4.0)   sukupuu ja kielten koordinaatit
 *   Wikipedian taulukko         puhujamäärät (lähteenään Ethnologue)
 *   Wikidata (CC0)              baskin puhujamäärä
 *   Natural Earth (PD)          maamaski, ne50.geojson repossa
 *
 * Puhujamäärät ovat se kohta, jossa vapaa aineisto loppuu kesken.
 * Kokeiltu ja hylätty: Wikidatan P1098 suoraan kielikuntien
 * kohteilta. Se on CC0 ja siis lisenssiltään paras, mutta kattavuus
 * on reikäinen — uralilaisilta, koreanilaisilta, mongolilaisilta,
 * mandelaisilta, mayalaisilta ja atlantinkongolaisilta puuttuu luku
 * kokonaan — ja siellä missä luku on, se saattaa olla ilmeisen väärä
 * (Wikidata antaa yleisuusiguinealaisille 200 000 puhujaa lähteenään
 * yksi venäläinen kielitieteen verkkosivu; Ethnologuen luku on
 * 3,7 miljoonaa). Osittainen ja osin virheellinen taulukko olisi
 * pahempi kuin ei taulukkoa lainkaan, joten se jätettiin.
 *
 * Wikipedian artikkelin "List of language families" taulukko
 * ilmoittaa lähteikseen Glottolog 5.0:n (kielten lukumäärä) ja
 * Ethnologuen sivun "What are the largest language families?"
 * (puhujamäärät). Taulukko kattaa kaikki tarvittavat kielikunnat
 * yhdellä ja samalla laskentatavalla, mikä on vertailussa
 * tärkeämpää kuin tuoreus. Luvut ovat lukuja eivätkä tekijänoikeuden
 * alaisia; Wikipedia mainitaan silti lähteenä valmiin tiedoston
 * otsikossa, samoin Ethnologue.
 *
 * Baski ei ole taulukossa, koska se ei ole kielikunta vaan isolaatti.
 * Sen luku otetaan Wikidatasta (Q8752, P1098), jonka lähteenä on
 * Ranskan Baskimaan sosiolingvistinen kysely.
 *
 * --- miten levinneisyysalue lasketaan ---
 *
 * Glottolog antaa jokaiselle kielelle YHDEN koordinaatin. Alue
 * kootaan niistä koneellisesti (ei siis käsin piirtäen):
 *
 *   1. asteen ruudukko koko maapallolle
 *   2. ruutu kuuluu kielikuntaan, jos sen keskipiste on enintään
 *      275 km:n päässä jostakin kielikunnan kielipisteestä
 *   3. merelle valunut osa leikataan pois Natural Earthin maamaskilla
 *      — paitsi ruutu, jossa kielipiste itse on: muuten pienet saaret
 *      katoaisivat, ja niillä asuu iso osa austronesialaisista
 *   4. jäljelle jääneiden ruutujen reunat ommellaan renkaiksi ja
 *      pehmennetään RDP:llä
 *
 * Säde 275 km on valittu niin, että harvaan tutkitut alueet (Siperia,
 * Sahel, Australia) pysyvät yhtenäisinä möykkyinä eivätkä hajoa
 * pisteiksi. Se on samalla syy siihen, että pienet kielialueet
 * näyttävät todellista suuremmilta: baskin alue on kartalla noin
 * 25 000 km², oikeasti se on murto-osa siitä.
 *
 * --- mitä alue EI ole ---
 *
 * Se ei ole nykyinen puhuma-alue. Glottolog merkitsee espanjan
 * Espanjaan ja englannin Englantiin, joten siirtomaa-ajan levinneisyys
 * puuttuu: indoeurooppalaisten alue ei kata Amerikkoja eikä
 * Australiaa, vaikka siellä puhutaan enimmäkseen indoeurooppalaisia
 * kieliä. Kreoli- ja siirtolaiskielet ovat Glottologissa omina
 * kielinään omilla paikoillaan, joten täpliä jää silti Karibialle,
 * Länsi-Afrikan rannikolle ja Pohjois-Amerikkaan — mutta ne ovat
 * Pennsylvanian saksaa ja Louisianan ranskaa, eivät englantia tai
 * espanjaa. Tämä ristiriita — 3,2 miljardia puhujaa,
 * alue vain Euroopasta Intiaan — on kirjattu valmiin tiedoston
 * otsikkoon, koska se on linssin tärkein opetus eikä virhe.
 */
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Noden fetch ei lue HTTPS_PROXYa; ks. tools/hae-radiot.mjs.
if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [fileURLToPath(import.meta.url), ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const kuiva = process.argv.includes('--kuiva');
const OTSAKKEET = { 'user-agent': 'Matkakirja/1.0 (opetuspeli)' };

// Glottolog on kiinnitetty julkaisuun. Master muuttuu, ja aineiston ei
// pidä muuttua ajon ja toisen välillä ilman että joku päättää niin.
const GLOTTOLOG_VERSIO = 'v5.2';
const GLOTTOLOG_URL = `https://raw.githubusercontent.com/glottolog/glottolog-cldf/${GLOTTOLOG_VERSIO}/cldf/languages.csv`;
const WIKI_SIVU = 'List_of_language_families';
const BASKI_Q = 'Q8752';

const NE_POLKU = process.env.NE_GEOJSON ?? join(JUURI, 'ne50.geojson');

const ASKEL = 1;                    // ruudukon sivu asteina
const RUUTUJA_X = 360 / ASKEL;
const RUUTUJA_Y = 180 / ASKEL;
const SADE_KM = 275;                // kielipisteen ympärille levitettävä säde
const SULKEMINEN_KM = 175;          // näin leveät aukot alueen sisällä umpeen
const TOLERANSSI = 0.6;             // RDP, asteina
const PIENIN_RENGAS = 1;            // neliöastetta — yhden ruudun saari kelpaa
const ENITEN_RENKAITA = 90;         // suurimmat pinta-alan mukaan

/*
 * Kielikunnat.
 *
 * Valinta: Wikipedian taulukon 21 suurinta puhujamäärän mukaan, ja
 * niiden lisäksi neljä, jotka ovat mukana siksi mitä ne opettavat —
 * yleisuusiguinealaiset (maailman kieltentihein alue), pama-nyungalaiset
 * (Australia), khoe-kwadilaiset ("khoisan", nama) ja baski (isolaatti).
 *
 * koodi     Glottologin kielikunnan koodi. Levinneisyysalue kootaan
 *           kaikista kielistä, joiden Family_ID on tämä.
 * wiki      rivin nimi Wikipedian taulukossa; puhujamäärä haetaan sillä.
 * esimerkit Glottologin kielikoodit. Jokaisen kuuluminen kielikuntaan
 *           TARKISTETAAN ajossa: väärä koodi kaataa työkalun.
 */
const KUNNAT = [
  {
    avain: 'indoeurooppalaiset',
    koodi: 'indo1319',
    wiki: 'Indo-European',
    nimi: 'indoeurooppalaiset kielet',
    vari: '#8c3b2e',
    esimerkit: [
      ['stan1293', 'englanti'], ['stan1288', 'espanja'], ['hind1269', 'hindi'],
      ['russ1263', 'venäjä'], ['west2369', 'persia'], ['mode1248', 'kreikka'],
    ],
    huomio: 'Suurin kielikunta puhujamäärältään, mutta alue kartalla on vain Euroopasta Iranin kautta Pohjois-Intiaan. Espanja, portugali ja englanti veivät kielikunnan Amerikkoihin ja Australiaan vasta 1500-luvulta alkaen, eikä sitä leviämistä näy tässä aineistossa. Amerikan täplät eivät ole englantia tai espanjaa vaan pieniä siirtolais- ja kreolikieliä: Pennsylvanian saksa, Louisianan ranska, Karibian kreolit.',
  },
  {
    avain: 'sinotiibetilaiset',
    koodi: 'sino1245',
    wiki: 'Sino-Tibetan',
    nimi: 'sinotiibetiläiset kielet',
    vari: '#b3742a',
    esimerkit: [['mand1415', 'mandariinikiina'], ['nucl1310', 'burma'], ['tibe1272', 'tiibet']],
    huomio: 'Toiseksi suurin puhujamäärältään mutta alueeltaan tiivis: Kiina, Himalajan rinteet ja Kaakkois-Aasian pohjoisosa. Yksi kieli, mandariinikiina, kattaa siitä valtaosan.',
  },
  {
    avain: 'atlantinkongolaiset',
    koodi: 'atla1278',
    wiki: 'Atlantic–Congo',
    nimi: 'atlantinkongolaiset kielet',
    vari: '#4e7a37',
    esimerkit: [
      ['swah1253', 'swahili'], ['yoru1245', 'joruba'], ['nucl1417', 'igbo'],
      ['zulu1248', 'zulu'], ['shon1251', 'shona'],
    ],
    huomio: 'Tämä on se, mitä koulukirjat kutsuvat nigerkongolaisiksi kieliksi. Glottolog ei hyväksy nigerkongolaista kokonaisuutta todistettuna, koska sen reunoilla olevien ryhmien sukulaisuutta ei ole osoitettu; sen ydin, atlantinkongolaiset, on. Kielten lukumäärältä maailman suurin kielikunta: yli 1400 kieltä, joista bantukielet ovat vain yksi haara.',
  },
  {
    avain: 'afroaasialaiset',
    koodi: 'afro1255',
    wiki: 'Afroasiatic',
    nimi: 'afroaasialaiset kielet',
    vari: '#c08a1e',
    esimerkit: [
      ['stan1318', 'arabia'], ['haus1257', 'hausa'], ['amha1245', 'amhara'],
      ['soma1255', 'somali'], ['hebr1245', 'heprea'],
    ],
    huomio: 'Kielikunta, joka ei välitä Saharasta eikä Punaisestamerestä: sama suku ulottuu Marokosta Arabian niemimaalle ja Nigeriasta Etiopiaan. Arabia ja heprea ovat samaa haaraa, hausa ja somali eri haaroja.',
  },
  {
    avain: 'austronesialaiset',
    koodi: 'aust1307',
    wiki: 'Austronesian',
    nimi: 'austronesialaiset kielet',
    vari: '#2f7d80',
    esimerkit: [
      ['indo1316', 'indonesia'], ['taga1270', 'tagalog'], ['plat1254', 'malagassi'],
      ['maor1246', 'maori'], ['hawa1245', 'havaiji'], ['fiji1243', 'fidži'],
    ],
    huomio: 'Maailman laajimmalle levinnyt kielikunta ennen laivoja: Taiwanista Madagaskarille ja Havaijille, yli puolet maapallon ympärysmitasta. Madagaskarin malagassi on austronesialainen eikä afrikkalainen — sen lähin sukulainen on Borneon ma’anjan, 7000 kilometrin päässä meren yli. Se on tämän linssin selvin yksittäinen yllätys.',
  },
  {
    avain: 'dravidalaiset',
    koodi: 'drav1251',
    wiki: 'Dravidian',
    nimi: 'dravidakielet',
    vari: '#7a4b8f',
    esimerkit: [['tami1289', 'tamili'], ['telu1262', 'telugu'], ['nucl1305', 'kannada'], ['mala1464', 'malajalam']],
    huomio: 'Etelä-Intia puhuu eri kielikuntaa kuin pohjoinen: raja kulkee keskellä yhtä valtiota. Brahui puhutaan kaukana muista, Pakistanin Belutšistanissa, ja siitä kiistellään: onko se jäänne ajalta ennen indoeurooppalaisten tuloa vai myöhempi muutto.',
  },
  {
    avain: 'turkkilaiset',
    koodi: 'turk1311',
    wiki: 'Turkic',
    nimi: 'turkkilaiset kielet',
    vari: '#3f6ea8',
    esimerkit: [
      ['nucl1301', 'turkki'], ['nort2690', 'uzbekki'], ['kaza1248', 'kazakki'],
      ['nort2697', 'azeri'], ['yaku1245', 'saha eli jakuutti'],
    ],
    huomio: 'Pitkä nauha Balkanilta Jäämerelle. Sahaa puhutaan Jakutiassa, yli 6000 kilometrin päässä turkista, ja kielet ovat silti niin lähellä toisiaan, että puhujat tavoittavat toisistaan sanoja — kielikunta on nuori ja levisi nopeasti.',
  },
  {
    avain: 'japonilaiset',
    koodi: 'japo1237',
    wiki: 'Japonic',
    nimi: 'japanilaiset kielet',
    vari: '#a8476b',
    esimerkit: [['nucl1643', 'japani'], ['cent2126', 'okinawa']],
    huomio: 'Yli sata miljoonaa puhujaa ja toistakymmentä kieltä, kaikki yhdellä saariketjulla. Ryukyu-saarten kielet, kuten okinawa, eivät ole japanin murteita vaan omia kieliään, ja ne ovat kuolemassa.',
  },
  {
    avain: 'austroaasialaiset',
    koodi: 'aust1305',
    wiki: 'Austroasiatic',
    nimi: 'austroaasialaiset kielet',
    vari: '#6b8f3a',
    esimerkit: [['viet1252', 'vietnam'], ['cent1989', 'khmer'], ['sant1410', 'santali'], ['mund1320', 'mundari']],
    huomio: 'Kielikunta pirstaleina: vietnam ja khmer Kaakkois-Aasiassa, santali ja mundari keskellä Intiaa tuhannen kilometrin päässä. Väliin on tullut muita kieliä, ja jäljelle jäi saarekkeita.',
  },
  {
    avain: 'taikadailaiset',
    koodi: 'taik1256',
    wiki: 'Kra–Dai',
    nimi: 'taikadailaiset kielet',
    vari: '#c2643a',
    esimerkit: [['thai1261', 'thai'], ['laoo1244', 'lao'], ['shan1277', 'shan'], ['bouy1240', 'bouyei']],
    huomio: 'Kotiseutu ei ole Thaimaassa vaan Etelä-Kiinassa, missä kielikunnan haarat ovat tiheimmillään. Thai ja lao ovat myöhäisiä tulokkaita etelässä.',
  },
  {
    avain: 'koreanilaiset',
    koodi: 'kore1284',
    wiki: 'Koreanic',
    nimi: 'korealaiset kielet',
    vari: '#4b6fb0',
    esimerkit: [['kore1280', 'korea'], ['jeju1234', 'jejun kieli']],
    huomio: 'Koko kielikunta on kaksi kieltä: korea ja Jeju-saaren jeju, jolla on enää muutama tuhat vanhaa puhujaa. Jos jeju katoaa, korea muuttuu isolaatiksi — kieleksi ilman ainoatakaan tunnettua sukulaista.',
  },
  {
    avain: 'niloottiset',
    koodi: 'nilo1247',
    wiki: 'Nilotic',
    nimi: 'niloottiset kielet',
    vari: '#8f6a2e',
    esimerkit: [['nort2815', 'dinka'], ['nuer1246', 'nuer'], ['luok1236', 'luo'], ['masa1300', 'maasai']],
    huomio: 'Yksi niistä kielikunnista, jotka jäivät jäljelle kun nilosaharalaiset hajosivat. Nilosaharalaisia opetettiin pitkään yhtenä Afrikan neljästä suuresta kielikunnasta, mutta sukulaisuutta ei ole saatu todistettua, ja nykyään sitä pidetään kokoelmana toisistaan riippumattomia kielikuntia. Niloottiset ja saharalaiset ovat tässä linssissä kaksi niistä.',
  },
  {
    avain: 'mandelaiset',
    koodi: 'mand1469',
    wiki: 'Mande',
    nimi: 'mandelaiset kielet',
    vari: '#6f9a4e',
    esimerkit: [['bamb1269', 'bambara'], ['soni1259', 'soninke'], ['susu1250', 'susu'], ['vaii1241', 'vai']],
    huomio: 'Länsi-Afrikan sisämaan kielikunta, jota ennen luettiin nigerkongolaisiin. Vailla on oma kirjaimisto, jonka Momolu Duwalu Bukele kehitti 1830-luvulla — yksi harvoista maailman kirjoitusjärjestelmistä, joka syntyi tyhjästä eikä lainaamalla.',
  },
  {
    avain: 'uralilaiset',
    koodi: 'ural1272',
    wiki: 'Uralic',
    nimi: 'uralilaiset kielet',
    vari: '#2e7fa8',
    esimerkit: [
      ['finn1318', 'suomi'], ['esto1258', 'viro'], ['hung1274', 'unkari'],
      ['nort2671', 'pohjoissaame'], ['nene1249', 'tundranenetsi'], ['komi1268', 'komisyrjääni'],
    ],
    huomio: 'Suomi, viro ja unkari ovat saarekkeita keskellä indoeurooppalaista Eurooppaa — unkari on lisäksi erillään pohjoisista sukukielistään yli tuhannen kilometrin päässä. Kielikunnan painopiste ei ole Itämerellä vaan Uralilla ja Länsi-Siperiassa, missä puhujia on vähän mutta haaroja paljon.',
  },
  {
    avain: 'saharalaiset',
    koodi: 'saha1256',
    wiki: 'Saharan',
    nimi: 'saharalaiset kielet',
    vari: '#a58a3f',
    esimerkit: [['cent2050', 'kanuri'], ['teda1241', 'tedaga'], ['daza1242', 'dazaga'], ['zagh1240', 'beria']],
    huomio: 'Kymmenen kieltä Tšad-järven ympärillä ja Saharan keskellä. Kanuri oli Kanem-Bornun valtakunnan kieli tuhannen vuoden ajan. Toinen pala hajonnutta nilosaharalaista.',
  },
  {
    avain: 'hmongmien',
    koodi: 'hmon1336',
    wiki: 'Hmong–Mien',
    nimi: 'hmong-mien-kielet',
    vari: '#9c5aa0',
    esimerkit: [['hmon1264', 'hmong njua'], ['iumi1238', 'iu mien'], ['shee1238', 'she']],
    huomio: 'Vuoristojen kielikunta Etelä-Kiinassa ja Kaakkois-Aasiassa. Raja ei kulje kartalla vaan pystysuunnassa: hmongit ja mienit asuvat rinteillä, ja laaksoissa saman alueen sisällä puhutaan kiinaa, thaita tai vietnamia. Kartta ei osaa näyttää korkeuseroa, joten alue on tässä yhtenäisempi kuin se on.',
  },
  {
    avain: 'keskisudanilaiset',
    koodi: 'cent2225',
    wiki: 'Central Sudanic',
    nimi: 'keskisudanilaiset kielet',
    vari: '#7d7a35',
    esimerkit: [['lugb1240', 'lugbara'], ['mang1394', 'mangbetu'], ['bagi1246', 'bagirmi'], ['madi1260', "ma'di"]],
    huomio: 'Kolmas pala nilosaharalaista: Keski-Afrikan sisämaan kielikunta Tšadista Kongon sademetsän reunalle.',
  },
  {
    avain: 'ketsualaiset',
    koodi: 'quec1387',
    wiki: 'Quechuan',
    nimi: 'ketšuakielet',
    vari: '#b05a2e',
    esimerkit: [['cusc1236', 'Cuscon ketšua'], ['ayac1239', 'Ayacuchon ketšua'], ['imba1240', 'Imbaburan kicua']],
    huomio: 'Inkojen valtakunnan hallintokieli, joka levisi valloitusten mukana ja jatkoi leviämistään espanjalaisten alaisuudessa. Alue on kapea nauha Andien harjalla Ecuadorista Argentiinaan. Ketšua ei ole yksi kieli vaan noin 45, eivätkä kaikki ymmärrä toisiaan.',
  },
  {
    avain: 'omottiset',
    koodi: 'gong1255',
    wiki: 'Ta-Ne-Omotic',
    nimi: 'omottiset kielet',
    vari: '#8f7a55',
    esimerkit: [['wola1242', 'wolaytta'], ['kafa1242', 'kafa'], ['gamo1243', 'gamo'], ['benc1235', 'bench']],
    huomio: 'Pieni tiivis rypäs Etiopian lounaisosassa. Omottisia pidettiin pitkään afroaasialaisten haarana, ja Glottolog erottaa ne omaksi kielikunnakseen — hyvä esimerkki siitä, että sukupuu ei ole valmis vaan tutkimuksen tulos, joka muuttuu.',
  },
  {
    avain: 'mongolilaiset',
    koodi: 'mong1349',
    wiki: 'Mongolic',
    nimi: 'mongolilaiset kielet',
    vari: '#5a6ea0',
    esimerkit: [['halh1238', 'halh-mongoli'], ['mong1330', 'burjaatti'], ['kalm1243', 'kalmukki'], ['daur1238', 'dagur']],
    huomio: 'Tšingis-kaanin valtakunta oli maailmanhistorian laajin yhtenäinen maa-alue, mutta kielikunta jäi pieneksi: seitsemisen miljoonaa puhujaa. Kalmukki on Euroopan ainoa mongolikieli, Volgan alajuoksulla.',
  },
  {
    avain: 'mayalaiset',
    koodi: 'maya1287',
    wiki: 'Mayan',
    nimi: 'mayakielet',
    vari: '#3f8a6e',
    esimerkit: [["kich1262", "k'iche'"], ['yuca1254', 'jukateekin maya'], ['kekc1242', "q'eqchi'"], ['tzel1254', 'tzeltal']],
    huomio: 'Yli kuusi miljoonaa puhujaa Guatemalassa ja Etelä-Meksikossa. Mayat kirjoittivat omaa kieltään hieroglyfeillä yli tuhat vuotta, ja kirjoitus opittiin lukemaan uudelleen vasta 1900-luvun lopulla — se on ainoa Kolumbusta edeltävän Amerikan kirjoitusjärjestelmä, joka osataan lukea.',
  },
  {
    avain: 'yleisuusiguinealaiset',
    koodi: 'nucl1709',
    wiki: 'Trans–New Guinea',
    nimi: 'yleisuusiguinealaiset kielet (ydin)',
    vari: '#7a5a8f',
    esimerkit: [['enga1252', 'enga'], ['huli1244', 'huli'], ['nucl1620', 'wahgi'], ['west2594', 'länsidani']],
    huomio: 'Uusi-Guinea on maailman kieltentihein alue: yhdellä saarella puhutaan yli 800 kieltä, noin kymmenesosaa kaikista maailman kielistä. Tämä on saaren suurin kielikunta, ja silti puhujia on vain muutama miljoona. Vuoristo eristää laaksot toisistaan, ja jokainen laakso puhuu omaansa.',
  },
  {
    avain: 'pamanyungalaiset',
    koodi: 'pama1250',
    wiki: 'Pama–Nyungan',
    nimi: 'pama-nyungalaiset kielet',
    vari: '#a06a3a',
    esimerkit: [['pitj1243', 'pitjantjatjara'], ['warl1254', 'warlpiri'], ['dyir1250', 'dyirbal'], ['gugu1255', 'guugu yimidhirr']],
    huomio: 'Kattaa seitsemän kahdeksasosaa Australiasta ja siinä on 250 kieltä, mutta puhujia on enää muutama kymmenentuhatta: kielikunta on maailman suurimpia alaltaan ja pienimpiä puhujamäärältään. Guugu yimidhirristä tuli sana kenguru.',
  },
  {
    avain: 'khoekwadilaiset',
    koodi: 'khoe1240',
    wiki: 'Khoe-Kwadi',
    nimi: 'khoe-kwadilaiset kielet',
    vari: '#8a8a3a',
    esimerkit: [['nama1264', 'nama'], ['naro1249', 'naro'], ['kxoe1243', 'kxoe'], ['kora1292', 'korana']],
    huomio: '"Khoisankielet" ei ole kielikunta. Nimi kokoaa yhteen eteläisen Afrikan kielet, joissa on naksahdusäänteitä, mutta naksahdus on äänne eikä sukulaisuuden todiste: kyse on ainakin kolmesta toisilleen vieraasta kielikunnasta (khoe-kwadilaiset, kxʼa ja tuu) sekä kahdesta isolaatista, hadzasta ja sandawesta. Nama on näistä suurin ja sitä puhutaan Namibiassa.',
  },
  {
    avain: 'baski',
    koodi: 'basq1248',
    wiki: null,
    nimi: 'baski',
    vari: '#5f5f6e',
    esimerkit: [['basq1248', 'baski']],
    huomio: 'Isolaatti: kieli, jolla ei ole yhtään tunnettua sukulaista maailmassa. Baskia puhutaan Pyreneiden länsipäässä indoeurooppalaisten kielten ympäröimänä, ja se oli siellä ennen niitä. Sukulaisia on etsitty kaukasialaisista ja iberialaisista kielistä eikä löydetty. Alue on tässä liioiteltu: 275 kilometrin säde tekee siitä paljon todellista suuremman.',
  },
];

/** Suomalainen tuhaterotin. */
const luvuksi = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/** Yksikkö vai monikon partitiivi — tulosteet ovat suomea. */
const kpl = (n, yksi, monta) => `${n} ${n === 1 ? yksi : monta}`;

// ---------------------------------------------------------------- verkko

const hae = async (url, kuvaus) => {
  const vastaus = await fetch(url, { headers: OTSAKKEET });
  if (!vastaus.ok) throw new Error(`${kuvaus} epäonnistui: HTTP ${vastaus.status}`);
  return vastaus.text();
};

/*
 * Kevyt CSV-jäsennin.
 *
 * Glottologin taulukossa on lainausmerkkejä (kielten nimissä on
 * pilkkuja), joten pelkkä split(',') katkaisisi rivin väärästä
 * kohdasta ja siirtäisi kaikki sarakkeet yhdellä. Se ei kaataisi
 * ajoa vaan tuottaisi hiljaa väärää aineistoa.
 */
const csv = (teksti) => {
  const rivit = [];
  let rivi = [];
  let kentta = '';
  let lainauksissa = false;
  for (let i = 0; i < teksti.length; i++) {
    const m = teksti[i];
    if (lainauksissa) {
      if (m === '"') {
        if (teksti[i + 1] === '"') { kentta += '"'; i += 1; } else lainauksissa = false;
      } else kentta += m;
    } else if (m === '"') lainauksissa = true;
    else if (m === ',') { rivi.push(kentta); kentta = ''; }
    else if (m === '\n') { rivi.push(kentta); rivit.push(rivi); rivi = []; kentta = ''; }
    else if (m !== '\r') kentta += m;
  }
  if (kentta || rivi.length) { rivi.push(kentta); rivit.push(rivi); }
  return rivit;
};

const haeGlottolog = async () => {
  const rivit = csv(await hae(GLOTTOLOG_URL, 'Glottolog'));
  const otsikko = rivit[0];
  const sar = Object.fromEntries(otsikko.map((n, i) => [n, i]));
  for (const tarvittava of ['ID', 'Name', 'Latitude', 'Longitude', 'Level', 'Family_ID']) {
    if (sar[tarvittava] === undefined) throw new Error(`Glottologista puuttuu sarake ${tarvittava}`);
  }
  const kielet = [];
  for (let i = 1; i < rivit.length; i++) {
    const r = rivit[i];
    if (r.length < otsikko.length || r[sar.Level] !== 'language') continue;
    const lat = Number(r[sar.Latitude]);
    const lon = Number(r[sar.Longitude]);
    kielet.push({
      id: r[sar.ID],
      nimi: r[sar.Name],
      // Ylimmän tason kielikunta. Isolaatilla kenttä on tyhjä, jolloin
      // kieli on itse oma kielikuntansa.
      kunta: r[sar.Family_ID] || r[sar.ID],
      lat: Number.isFinite(lat) && r[sar.Latitude] !== '' ? lat : null,
      lon: Number.isFinite(lon) && r[sar.Longitude] !== '' ? lon : null,
    });
  }
  return kielet;
};

/*
 * Puhujamäärät Wikipedian taulukosta.
 *
 * Rivi on wikitekstissä muotoa
 *   |[[Uralic languages|Uralic]]
 *   |49
 *   |20,716,457
 *   |[[Languages of Asia|Eurasia]]
 * eli linkin näkyvä nimi, kielten lukumäärä, puhujat ja sijainti.
 */
const haePuhujat = async () => {
  const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${WIKI_SIVU}`
    + '&prop=wikitext|revid&format=json&formatversion=2';
  const j = JSON.parse(await hae(url, 'Wikipedia'));
  const teksti = j.parse?.wikitext;
  if (!teksti) throw new Error('Wikipedian sivulta ei tullut wikitekstiä');
  const taulu = new Map();
  const kaava = /\n\|\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]\n\|([\d,]+)\n\|([\d,]+)\n/g;
  let osuma = kaava.exec(teksti);
  while (osuma) {
    const nimi = (osuma[2] ?? osuma[1]).trim();
    taulu.set(nimi, {
      kielia: Number(osuma[3].replace(/,/g, '')),
      puhujia: Number(osuma[4].replace(/,/g, '')),
    });
    osuma = kaava.exec(teksti);
  }
  return { taulu, revid: j.parse.revid };
};

/*
 * Baskin puhujamäärä Wikidatasta. Ensisijainen väite, tai jos sellaista
 * ei ole, tuorein — ja mukaan otetaan se vuosi, jota luku koskee.
 */
const haeBaski = async () => {
  const url = `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${BASKI_Q}`
    + '&props=claims&format=json';
  const j = JSON.parse(await hae(url, 'Wikidata'));
  const vaitteet = j.entities?.[BASKI_Q]?.claims?.P1098 ?? [];
  if (!vaitteet.length) throw new Error(`Wikidatasta ei löytynyt ${BASKI_Q}:n puhujamäärää (P1098)`);
  const vuosi = (v) => v.qualifiers?.P585?.[0]?.datavalue?.value?.time?.slice(1, 5) ?? '';
  const valittu = vaitteet.find((v) => v.rank === 'preferred')
    ?? [...vaitteet].sort((a, b) => vuosi(b).localeCompare(vuosi(a)))[0];
  const maara = Number(valittu.mainsnak?.datavalue?.value?.amount);
  if (!Number.isFinite(maara)) throw new Error('Wikidatan puhujamäärää ei saatu luvuksi');
  return { puhujia: Math.round(maara), vuosi: vuosi(valittu) || null };
};

// ------------------------------------------------------------ geometria

const rad = (a) => (a * Math.PI) / 180;

/** Isoympyrämatka kilometreinä. */
const matka = (lon1, lat1, lon2, lat2) => {
  const dLat = rad(lat2 - lat1);
  const dLon = rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.min(1, Math.sqrt(a)));
};

const sisallaMonikulmiossa = (rengas, x, y) => {
  let osuu = false;
  for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i++) {
    const [xi, yi] = rengas[i];
    const [xj, yj] = rengas[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) osuu = !osuu;
  }
  return osuu;
};

/*
 * Maamaski Natural Earthista.
 *
 * Ruutu on maata, jos sen keskipiste osuu johonkin maapolygoniin TAI
 * jos ruudussa on rannikkoviivan taitepiste. Jälkimmäinen sääntö on
 * pienten saarten takia: Tyynenmeren saaret ovat asteen ruutua
 * pienempiä, eikä yhdenkään keskipiste osuisi maalle. Ilman sitä
 * austronesialaiset katoaisivat Polynesiasta kokonaan.
 */
const teeMaamaski = () => {
  if (!existsSync(NE_POLKU)) {
    throw new Error(`Maamaskia varten tarvitaan ${NE_POLKU} (Natural Earth). `
      + 'Anna toinen polku ympäristömuuttujalla NE_GEOJSON.');
  }
  const ne = JSON.parse(readFileSync(NE_POLKU, 'utf8'));
  const maa = new Uint8Array(RUUTUJA_X * RUUTUJA_Y);
  const ruutu = (x, y) => {
    const i = Math.min(RUUTUJA_X - 1, Math.max(0, Math.floor((x + 180) / ASKEL)));
    const j = Math.min(RUUTUJA_Y - 1, Math.max(0, Math.floor((y + 90) / ASKEL)));
    return j * RUUTUJA_X + i;
  };
  for (const piirre of ne.features) {
    const g = piirre.geometry;
    if (!g) continue;
    const polygonit = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
    for (const p of polygonit) {
      const ulko = p[0];
      if (!ulko || ulko.length < 4) continue;
      let minx = 180; let maxx = -180; let miny = 90; let maxy = -90;
      for (const [x, y] of ulko) {
        if (x < minx) minx = x;
        if (x > maxx) maxx = x;
        if (y < miny) miny = y;
        if (y > maxy) maxy = y;
        maa[ruutu(x, y)] = 1;
      }
      const i0 = Math.max(0, Math.floor((minx + 180) / ASKEL));
      const i1 = Math.min(RUUTUJA_X - 1, Math.floor((maxx + 180) / ASKEL));
      const j0 = Math.max(0, Math.floor((miny + 90) / ASKEL));
      const j1 = Math.min(RUUTUJA_Y - 1, Math.floor((maxy + 90) / ASKEL));
      for (let j = j0; j <= j1; j++) {
        for (let i = i0; i <= i1; i++) {
          if (maa[j * RUUTUJA_X + i]) continue;
          const x = -180 + (i + 0.5) * ASKEL;
          const y = -90 + (j + 0.5) * ASKEL;
          if (sisallaMonikulmiossa(ulko, x, y)) maa[j * RUUTUJA_X + i] = 1;
        }
      }
    }
  }
  return maa;
};

/*
 * Ruutujen naapurusto annetulla kilometrisäteellä.
 *
 * Kutsutaan jokaiselle ruudulle, joka on säteen sisällä. Pituusasteen
 * kaari kutistuu napoja kohti, joten haarukkaa levennetään kosinilla —
 * alaraja estää sitä karkaamasta äärettömään navalla.
 */
const naapurustossa = (i, j, km, teeJotain) => {
  const lat = -90 + (j + 0.5) * ASKEL;
  const lon = -180 + (i + 0.5) * ASKEL;
  const sadeAst = km / 111.195;
  const dLon = sadeAst / Math.max(0.08, Math.cos(rad(lat)));
  const j0 = Math.max(0, Math.floor(j - sadeAst / ASKEL) - 1);
  const j1 = Math.min(RUUTUJA_Y - 1, Math.ceil(j + sadeAst / ASKEL) + 1);
  const i0 = Math.floor(i - dLon / ASKEL) - 1;
  const i1 = Math.ceil(i + dLon / ASKEL) + 1;
  for (let jj = j0; jj <= j1; jj++) {
    for (let ii = i0; ii <= i1; ii++) {
      const ix = ((ii % RUUTUJA_X) + RUUTUJA_X) % RUUTUJA_X;
      const x = -180 + (ix + 0.5) * ASKEL;
      const y = -90 + (jj + 0.5) * ASKEL;
      if (matka(lon, lat, x, y) <= km) teeJotain(jj * RUUTUJA_X + ix);
    }
  }
};

/*
 * Morfologinen sulkeminen: ensin levitys, sitten kutistus samalla
 * säteellä.
 *
 * Miksi: Glottolog antaa yhden pisteen kieltä kohti, ja kahden pisteen
 * väliin jää aukko aina kun ne ovat kauempana kuin kaksi sädettä
 * toisistaan. Istanbul putosi kartalta turkkilaisten ulkopuolelle,
 * koska turkin piste on Ankarassa ja seuraava Traakiassa; Windhoek
 * putosi khoe-kwadilaisten ulkopuolelle naman ja hai//omin väliin.
 * Kumpikin on selvästi kielialueen sisällä, ja aukko on menetelmän
 * vika eikä maailman.
 *
 * Sulkeminen täyttää juuri tällaiset välit kasvattamatta alueen
 * ulkoreunaa: yksinäisen pisteen ympyrä palaa levityksen jälkeen
 * kutistuksessa entiselleen.
 */
const sulje = (ruudut, km) => {
  const laaja = new Uint8Array(ruudut.length);
  for (let j = 0; j < RUUTUJA_Y; j++) {
    for (let i = 0; i < RUUTUJA_X; i++) {
      if (!ruudut[j * RUUTUJA_X + i]) continue;
      naapurustossa(i, j, km, (k) => { laaja[k] = 1; });
    }
  }
  const ulos = new Uint8Array(ruudut.length);
  for (let j = 0; j < RUUTUJA_Y; j++) {
    for (let i = 0; i < RUUTUJA_X; i++) {
      if (!laaja[j * RUUTUJA_X + i]) continue;
      let kaikki = true;
      naapurustossa(i, j, km, (k) => { if (!laaja[k]) kaikki = false; });
      if (kaikki) ulos[j * RUUTUJA_X + i] = 1;
    }
  }
  return ulos;
};

/** Ruudukko, jossa 1 = kielikunnan aluetta. */
const peittoruudukko = (pisteet, maa) => {
  const ruudut = new Uint8Array(RUUTUJA_X * RUUTUJA_Y);
  const oma = new Uint8Array(RUUTUJA_X * RUUTUJA_Y);
  const sadeAst = SADE_KM / 111.195;
  for (const p of pisteet) {
    // Napojen lähellä pituusasteen kaari kutistuu, joten haarukkaa on
    // levennettävä. Kosinille alaraja, ettei se karkaa äärettömään.
    const dLon = sadeAst / Math.max(0.08, Math.cos(rad(p.lat)));
    const i0 = Math.floor((p.lon - dLon + 180) / ASKEL);
    const i1 = Math.floor((p.lon + dLon + 180) / ASKEL);
    const j0 = Math.max(0, Math.floor((p.lat - sadeAst + 90) / ASKEL));
    const j1 = Math.min(RUUTUJA_Y - 1, Math.floor((p.lat + sadeAst + 90) / ASKEL));
    for (let j = j0; j <= j1; j++) {
      for (let ii = i0; ii <= i1; ii++) {
        const i = ((ii % RUUTUJA_X) + RUUTUJA_X) % RUUTUJA_X;
        const x = -180 + (i + 0.5) * ASKEL;
        const y = -90 + (j + 0.5) * ASKEL;
        if (matka(p.lon, p.lat, x, y) <= SADE_KM) ruudut[j * RUUTUJA_X + i] = 1;
      }
    }
    const oi = Math.min(RUUTUJA_X - 1, Math.max(0, Math.floor((p.lon + 180) / ASKEL)));
    const oj = Math.min(RUUTUJA_Y - 1, Math.max(0, Math.floor((p.lat + 90) / ASKEL)));
    oma[oj * RUUTUJA_X + oi] = 1;
    ruudut[oj * RUUTUJA_X + oi] = 1;
  }
  let ennen = 0;
  for (let k = 0; k < ruudut.length; k++) if (ruudut[k]) ennen += 1;

  const suljettu = sulje(ruudut, SULKEMINEN_KM);
  let umpeen = 0;
  for (let k = 0; k < suljettu.length; k++) {
    if (suljettu[k] && !ruudut[k]) umpeen += 1;
    if (suljettu[k]) ruudut[k] = 1;
  }
  // Kielipisteen oma ruutu ei saa kadota kutistuksessa: pieni saari on
  // usein yksinäinen ruutu, jonka sulkeminen söisi.
  for (let k = 0; k < oma.length; k++) if (oma[k]) ruudut[k] = 1;

  let jalkeen = 0;
  for (let k = 0; k < ruudut.length; k++) {
    if (!ruudut[k]) continue;
    if (maa[k] || oma[k]) jalkeen += 1;
    else ruudut[k] = 0;
  }
  return { ruudut, ennen, umpeen, jalkeen };
};

/*
 * Ruudukosta renkaiksi.
 *
 * Jokaisen alueeseen kuuluvan ruudun ne sivut, joiden takana ei ole
 * aluetta, ovat reunasärmiä. Särmät kulkevat vastapäivään, joten ne
 * ommeltuina muodostavat suljettuja silmukoita.
 *
 * Pituuspiirillä 180 EI kierretä: sauman yli menevä alue katkeaa
 * kahdeksi renkaaksi, jotka koskettavat toisiaan saumassa. Se on
 * tarkoituksellista — kiertävä rengas piirtyisi viivana halki kartan
 * (vrt. tools/tee-maasto.mjs).
 */
const renkaiksi = (ruudut) => {
  const sarmat = new Map();
  const avain = (x, y) => `${x},${y}`;
  const lisaa = (ax, ay, bx, by) => {
    const k = avain(ax, ay);
    if (!sarmat.has(k)) sarmat.set(k, []);
    sarmat.get(k).push([bx, by]);
  };
  const on = (i, j) => (i < 0 || i >= RUUTUJA_X || j < 0 || j >= RUUTUJA_Y
    ? 0 : ruudut[j * RUUTUJA_X + i]);
  for (let j = 0; j < RUUTUJA_Y; j++) {
    for (let i = 0; i < RUUTUJA_X; i++) {
      if (!ruudut[j * RUUTUJA_X + i]) continue;
      const x0 = -180 + i * ASKEL;
      const x1 = x0 + ASKEL;
      const y0 = -90 + j * ASKEL;
      const y1 = y0 + ASKEL;
      if (!on(i, j - 1)) lisaa(x0, y0, x1, y0);
      if (!on(i + 1, j)) lisaa(x1, y0, x1, y1);
      if (!on(i, j + 1)) lisaa(x1, y1, x0, y1);
      if (!on(i - 1, j)) lisaa(x0, y1, x0, y0);
    }
  }
  const ulos = [];
  for (const [alku, lista] of sarmat) {
    while (lista.length) {
      const rengas = [alku.split(',').map(Number)];
      let seuraava = lista.pop();
      let vartija = 0;
      while (seuraava && vartija < 200000) {
        vartija += 1;
        rengas.push(seuraava);
        const jatko = sarmat.get(avain(seuraava[0], seuraava[1]));
        if (!jatko || !jatko.length) break;
        seuraava = jatko.pop();
        if (avain(seuraava[0], seuraava[1]) === alku) {
          rengas.push(seuraava);
          seuraava = null;
        }
      }
      if (rengas.length >= 5) ulos.push(rengas);
    }
  }
  return ulos;
};

/** Monikulmion pinta-ala neliöasteina (etumerkki kertoo kiertosuunnan). */
const pintaAla = (r) => {
  let s = 0;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    s += r[j][0] * r[i][1] - r[i][0] * r[j][1];
  }
  return s / 2;
};

const rdp = (pisteet, tol) => {
  if (pisteet.length < 3) return pisteet;
  const [ax, ay] = pisteet[0];
  const [bx, by] = pisteet[pisteet.length - 1];
  const dx = bx - ax;
  const dy = by - ay;
  const pit = Math.hypot(dx, dy);
  let maxD = 0;
  let idx = 0;
  for (let i = 1; i < pisteet.length - 1; i++) {
    const [px, py] = pisteet[i];
    const d = pit < 1e-9
      ? Math.hypot(px - ax, py - ay)
      : Math.abs(dy * px - dx * py + bx * ay - by * ax) / pit;
    if (d > maxD) { maxD = d; idx = i; }
  }
  if (maxD <= tol) return [pisteet[0], pisteet[pisteet.length - 1]];
  return [...rdp(pisteet.slice(0, idx + 1), tol).slice(0, -1), ...rdp(pisteet.slice(idx), tol)];
};

/*
 * Suljetun renkaan yksinkertaistus.
 *
 * RDP olettaa avoimen viivan. Suljetulla renkaalla ensimmäinen ja
 * viimeinen piste ovat sama, jolloin päiden välinen jana on nollan
 * mittainen ja koko rengas litistyy kahdeksi pisteeksi. Siksi rengas
 * katkaistaan ensin alkupisteestä kauimpana olevaan pisteeseen ja
 * puolikkaat käsitellään erikseen.
 */
const yksinkertaista = (rengas, tol) => {
  const auki = rengas.slice(0, -1);
  if (auki.length < 4) return rengas;
  let kauin = 0;
  let maxD = -1;
  for (let i = 1; i < auki.length; i++) {
    const d = Math.hypot(auki[i][0] - auki[0][0], auki[i][1] - auki[0][1]);
    if (d > maxD) { maxD = d; kauin = i; }
  }
  const a = rdp(auki.slice(0, kauin + 1), tol);
  const b = rdp([...auki.slice(kauin), auki[0]], tol);
  return [...a.slice(0, -1), ...b];
};

const pyorista = (r) => r.map(([x, y]) => [Number(x.toFixed(1)), Number(y.toFixed(1))]);

// ------------------------------------------------------------------ ajo

console.log(`Glottolog ${GLOTTOLOG_VERSIO} …`);
const kielet = await haeGlottolog();
console.log(`  ${kielet.length} kieltä, ${kielet.filter((k) => k.lat !== null).length} koordinaatein`);

console.log('Wikipedian kielikuntataulukko …');
const { taulu: puhujat, revid } = await haePuhujat();
console.log(`  ${puhujat.size} riviä, versio ${revid}`);

console.log('Wikidata: baskin puhujamäärä …');
const baski = await haeBaski();
console.log(`  ${luvuksi(baski.puhujia)} (${baski.vuosi})`);

console.log('Maamaski Natural Earthista …');
const maa = teeMaamaski();
console.log(`  ${maa.reduce((s, v) => s + v, 0)} maaruutua`);

// Tarkistukset ennen laskentaa: väärä koodi on hiljainen virhe, ja
// hiljainen virhe on opetuspelissä pahin mahdollinen.
const kieliKoodilla = new Map(kielet.map((k) => [k.id, k]));
const virheet = [];
for (const kunta of KUNNAT) {
  for (const [koodi, nimi] of kunta.esimerkit) {
    const kieli = kieliKoodilla.get(koodi);
    if (!kieli) virheet.push(`${kunta.avain}: esimerkkiä ${koodi} (${nimi}) ei ole Glottologissa`);
    else if (kieli.kunta !== kunta.koodi) {
      virheet.push(`${kunta.avain}: ${koodi} (${nimi}, ${kieli.nimi}) kuuluu kielikuntaan `
        + `${kieli.kunta}, ei ${kunta.koodi}`);
    }
  }
  if (kunta.wiki && !puhujat.has(kunta.wiki)) {
    virheet.push(`${kunta.avain}: Wikipedian taulukossa ei ole riviä "${kunta.wiki}"`);
  }
}
if (virheet.length) {
  console.error('Aineisto ei kelpaa:');
  for (const v of virheet) console.error(`  ${v}`);
  process.exit(1);
}

// Montako ylimmän tason kielikuntaa Glottolog kaikkiaan tuntee. Luku
// kertoo valmiissa tiedostossa, kuinka pieni osa maailmasta tässä on.
const KAIKKI_KUNNAT = new Set(kielet.map((k) => k.kunta)).size;

const kunnat = [];
let renkaitaYht = 0;
let pisteitaYht = 0;
for (const kunta of KUNNAT) {
  const pisteet = kielet.filter((k) => k.kunta === kunta.koodi && k.lat !== null);
  if (!pisteet.length) throw new Error(`${kunta.avain}: kielikunnalla ${kunta.koodi} ei ole yhtään kielipistettä`);

  const { ruudut, ennen, umpeen, jalkeen } = peittoruudukko(pisteet, maa);
  const kaikki = renkaiksi(ruudut)
    .map((r) => pyorista(yksinkertaista(r, TOLERANSSI)))
    .filter((r) => r.length >= 4 && Math.abs(pintaAla(r)) >= PIENIN_RENGAS)
    .sort((a, b) => Math.abs(pintaAla(b)) - Math.abs(pintaAla(a)));
  const renkaat = kaikki.slice(0, ENITEN_RENKAITA);

  const puhujia = kunta.wiki ? puhujat.get(kunta.wiki).puhujia : baski.puhujia;
  const kieliaGlottologissa = kielet.filter((k) => k.kunta === kunta.koodi).length;

  kunnat.push({
    avain: kunta.avain,
    nimi: kunta.nimi,
    puhujia,
    esimerkit: kunta.esimerkit.map(([, nimi]) => nimi),
    huomio: kunta.huomio,
    vari: kunta.vari,
    renkaat,
  });
  renkaitaYht += renkaat.length;
  pisteitaYht += renkaat.reduce((s, r) => s + r.length, 0);
  console.log(`${kunta.avain.padEnd(24)} ${String(kieliaGlottologissa).padStart(5)} kieltä`
    + ` ${String(pisteet.length).padStart(5)} paikannettua`
    + ` | ruutuja ${String(ennen).padStart(5)} +${String(umpeen).padStart(4)} umpeen`
    + ` -> maalla ${String(jalkeen).padStart(5)}`
    + ` | ${String(renkaat.length).padStart(3)} ${renkaat.length === 1 ? 'rengas ' : 'rengasta'},`
    + ` ${String(renkaat.reduce((s, r) => s + r.length, 0)).padStart(5)} pistettä`
    + (kaikki.length > renkaat.length ? ` (${kaikki.length - renkaat.length} pudotettu)` : ''));
}
console.log(`yhteensä ${kpl(renkaitaYht, 'rengas', 'rengasta')}, ${pisteitaYht} pistettä`);

if (kuiva) process.exit(0);

// -------------------------------------------------------------- tiedosto

const paiva = new Date().toISOString().slice(0, 10);
const kunnatTeksti = kunnat.map((k) => {
  const renkaat = k.renkaat
    .map((r) => `      [${r.map(([x, y]) => `[${x},${y}]`).join(',')}],`)
    .join('\n');
  return `  {
    avain: ${JSON.stringify(k.avain)},
    nimi: ${JSON.stringify(k.nimi)},
    puhujia: ${k.puhujia},
    esimerkit: ${JSON.stringify(k.esimerkit)},
    huomio: ${JSON.stringify(k.huomio)},
    vari: ${JSON.stringify(k.vari)},
    renkaat: [
${renkaat}
    ],
  },`;
}).join('\n');

const yhteenveto = kunnat
  .map((k) => `//   ${k.nimi.padEnd(38)} ${luvuksi(k.puhujia).padStart(13)} puhujaa,`
    + ` ${String(k.renkaat.length).padStart(3)} ${k.renkaat.length === 1 ? 'rengas' : 'rengasta'}`)
  .join('\n');

const teksti = `// Kielten kartta: maailman suurimmat kielikunnat karkeina alueina.
//
// TÄMÄ TIEDOSTO ON KONEEN KIRJOITTAMA. Älä muokkaa käsin:
//   NODE_USE_ENV_PROXY=1 node tools/hae-kielet.mjs
//
// Aineisto: Glottolog ${GLOTTOLOG_VERSIO.slice(1)} (sukupuu ja kielten koordinaatit),
//           Wikipedian artikkeli "List of language families" (puhujamäärät),
//           Wikidata (baskin puhujamäärä),
//           Natural Earth 1:50m Admin 0 (maamaski, ne50.geojson).
// Viite:    Hammarström, Harald & Forkel, Robert & Haspelmath, Martin &
//           Bank, Sebastian. 2025. Glottolog 5.2. Leipzig: Max Planck
//           Institute for Evolutionary Anthropology. https://glottolog.org
//           Puhujamäärät: Wikipedia, "List of language families",
//           versio ${revid}; taulukko ilmoittaa lähteekseen Ethnologuen
//           sivun "What are the largest language families?" ja kielten
//           lukumäärien osalta Glottolog 5.0:n.
//           Baski: Wikidata ${BASKI_Q} (P1098)${baski.vuosi ? `, vuosi ${baski.vuosi}` : ''}.
// Haettu:   ${paiva}
//           https://raw.githubusercontent.com/glottolog/glottolog-cldf/${GLOTTOLOG_VERSIO}/cldf/languages.csv
//           https://en.wikipedia.org/wiki/List_of_language_families
//           https://www.wikidata.org/w/api.php (wbgetentities, avoin, ei avainta)
// Lisenssi: Glottolog CC BY 4.0 (creativecommons.org/licenses/by/4.0/).
//           Wikidata CC0 1.0 — ei ehtoja.
//           Natural Earth public domain.
//           Wikipedian teksti on CC BY-SA 4.0. Tästä on otettu vain
//           puhujamäärien luvut, jotka ovat tosiasioita eivätkä
//           tekijänoikeuden alaisia; lähde mainitaan silti.
//
// TÄRKEIN VARAUS — LUE ENNEN PIIRTÄMISTÄ.
//
// KIELIKUNNILLA EI OLE TERÄVIÄ RAJOJA. Kartan viiva on piirtäjän keksintö,
// ei maailman ominaisuus. Kielialueet menevät päällekkäin (Intiassa
// indoeurooppalaiset ja dravidakielet, Etiopiassa afroaasialaiset ja
// omottiset, Siperiassa uralilaiset ja turkkilaiset), ne vaihettuvat
// vähitellen, ja sama ihminen puhuu usein kahden kielikunnan kieltä.
// Alueet on siksi tarkoitettu piirrettäviksi läpikuultavina ja
// päällekkäin, ei toisiaan poissulkevina läiskinä. Terävä raja
// kielikuntien välillä on aina kartantekijän valinta.
//
// --- miten alue on laskettu ---
//
// Alueita EI ole piirretty käsin. Ne on koottu koneellisesti Glottologin
// kielipisteistä:
//   1. asteen ruudukko koko maapallolle
//   2. ruutu kuuluu kielikuntaan, jos sen keskipiste on enintään
//      ${SADE_KM} km:n päässä jostakin kielikunnan kielestä
//   3. alle ${SULKEMINEN_KM * 2} km leveät aukot alueen sisällä umpeen
//      (levitys ja kutistus samalla ${SULKEMINEN_KM} km:n säteellä)
//   4. merelle valunut osa pois Natural Earthin maamaskilla
//   5. reunat renkaiksi, RDP-pehmennys toleranssilla ${TOLERANSSI}°
//
// Ruutu, jossa kielipiste itse on, säilyy vaikka maski ei tuntisi sitä
// maaksi — muuten Tyynenmeren saaret katoaisivat, ja niillä asuu iso
// osa austronesialaisista.
//
// Aukkojen sulkeminen on vaihe 3, koska Glottolog antaa yhden pisteen
// kieltä kohti eikä aluetta: Istanbul jäi turkkilaisten ulkopuolelle,
// koska turkin piste on Ankarassa ja seuraava Traakiassa, ja Windhoek
// jäi khoe-kwadilaisten ulkopuolelle naman ja hai//omin väliin.
// Kumpikin aukko oli menetelmän vika, ei maailman.
//
// Säde ${SADE_KM} km on valittu niin, että harvaan tutkitut alueet pysyvät
// yhtenäisinä. Sama säde suurentaa pienet kielialueet: baskin alue on
// kartalla monikymmenkertainen todelliseen verrattuna.
//
// --- mitä alue EI ole ---
//
// Se ei ole nykyinen puhuma-alue vaan kielten perinteinen kotiseutu.
// Glottolog merkitsee jokaiselle kielelle yhden koordinaatin: espanja
// on Espanjassa, englanti Englannissa, portugali Portugalissa. Siksi
// indoeurooppalaisten alue ei kata Amerikkoja eikä Australiaa, vaikka
// niissä puhutaan nykyään enimmäkseen indoeurooppalaisia kieliä.
// Ristiriita on tarkoituksellinen ja opettava: 3,2 miljardia puhujaa,
// alue Euroopasta Intiaan. Kreoli- ja siirtolaiskielet ovat
// Glottologissa omina kielinään omilla paikoillaan, joten
// indoeurooppalaisia täpliä jää silti Karibialle, Länsi-Afrikan
// rannikolle ja Pohjois-Amerikkaan. Ne eivät ole englantia tai
// espanjaa: New Yorkin kohdalla oleva täplä on Pennsylvanian saksa,
// Mississippin suulla Louisianan ranska.
//
// --- miksi juuri nämä ${kunnat.length} ---
//
// Wikipedian taulukon 21 suurinta puhujamäärän mukaan, ja niiden
// lisäksi neljä, jotka ovat mukana siksi mitä ne opettavat:
// yleisuusiguinealaiset (maailman kieltentihein alue),
// pama-nyungalaiset (Australia), khoe-kwadilaiset ("khoisan", nama)
// ja baski (isolaatti). Lista EI siis ole pelkkä suuruusjärjestys:
// pama-nyungalaisilla on ${luvuksi(kunnat.find((k) => k.avain === 'pamanyungalaiset').puhujia)} puhujaa ja silti oma rivinsä,
// koska muuten Australia olisi kartalla tyhjä.
//
// Glottolog erottaa ${KAIKKI_KUNNAT} ylimmän tason kielikuntaa ja isolaattia,
// ja tässä on niistä ${kunnat.length}. Kaikki muut puuttuvat — kartan tyhjä
// kohta ei tarkoita, ettei siellä puhuttaisi mitään.
//
// --- kielikuntia on vähemmän kuin koulukirjassa ---
//
// Kolme tuttua nimeä puuttuu, koska niitä ei ole todistettu:
//   nigerkongolaiset  -> tässä sen ydin, atlantinkongolaiset
//   nilosaharalaiset  -> tässä kolme sen palasta: niloottiset,
//                        saharalaiset ja keskisudanilaiset
//   khoisankielet     -> tässä khoe-kwadilaiset (nama); naksahdusäänne
//                        on äänne, ei sukulaisuuden todiste
// Jokaisen kohdalla asia on kerrottu myös rivin huomio-kentässä.
//
// --- puhujamäärät ---
//
// Luvut ovat yhdestä ja samasta taulukosta, jotta ne olisivat keskenään
// vertailukelpoisia. Ne ovat Ethnologuen tienoilta vuodelta 2019 —
// indoeurooppalaisten ${luvuksi(kunnat[0].puhujia)} on sama luku, jonka Wikidata
// merkitsee vuodelle 2019. Uudempia lukuja on olemassa, mutta ne
// kattavat vain muutaman suurimman kielikunnan, ja puolittainen
// päivitys tekisi vertailusta harhaanjohtavan.
//
// Puhujamäärä on lisäksi aina sopimuskysymys: lasketaanko äidinkieliset
// vai kaikki puhujat, lasketaanko kaksikielinen kahdesti, mikä on kieli
// ja mikä murre. Eri lähteet antavat indoeurooppalaisille mitä tahansa
// väliltä 2,0 ja 3,4 miljardia. Luvut kertovat suuruusluokan, eivät
// enempää.
//
// Luvut on jätetty tarkoituksella siihen muotoon kuin ne lähteessä ovat,
// vaikka tarkkuus on valheellista: ${luvuksi(kunnat[0].puhujia)} on summa sadoista
// erikseen arvioiduista kielistä, ei laskettu määrä. Pyöristys olisi
// siistimpää mutta hävittäisi jäljen lähteeseen. Jos luku näytetään
// pelaajalle, se on syytä pyöristää vasta siinä kohtaa.
//
// Wikidatan P1098 kokeiltiin ensin, koska se on CC0. Se hylättiin:
// puolelta tämän listan kielikunnista puuttuu luku kokonaan, ja
// mukana on ilmeisiä virheitä (yleisuusiguinealaisille 200 000
// puhujaa, kun Ethnologuen luku on 3,7 miljoonaa).
//
// --- kentät ---
//
//   avain      lyhyt tunnus
//   nimi       suomenkielinen nimi
//   puhujia    puhujia yhteensä, kokonaisluku
//   esimerkit  tunnettuja kieliä suomeksi, ei kattava lista.
//              Jokaisen kuuluminen kielikuntaan on tarkistettu
//              Glottologista ajon aikana.
//   huomio     suomenkielinen selite: mitä tästä kielikunnasta
//              kannattaa tietää. Tarkoitettu näytettäväksi.
//   vari       ehdotus väriksi
//   renkaat    lista suljettuja monikulmioita, piste [lon, lat].
//              Renkaat ovat erillisiä alueita, ei sisäkkäisiä: koloja
//              ei ole laskettu, joten täyttösäännöllä ei ole väliä.
//              Sauma: pituuspiirin 180 ylittävä alue on katkaistu
//              kahdeksi renkaaksi, jotka koskettavat toisiaan
//              saumassa. Kiertävää rengasta ei ole yhtään, joten
//              sauma ei vaadi erityiskäsittelyä (vrt. tools/tee-maasto.mjs).
//
// ${kunnat.length} kielikuntaa, ${renkaitaYht} rengasta, ${pisteitaYht} pistettä.
//
${yhteenveto}

const KUNNAT = [
${kunnatTeksti}
];

export const KIELIKUNNAT = { kunnat: KUNNAT };
`;

const ulos = join(JUURI, 'js/packs/linssi-kielet.js');
writeFileSync(ulos, teksti);
console.log(`kirjoitettu ${ulos} (${Math.round(teksti.length / 1024)} kt)`);
