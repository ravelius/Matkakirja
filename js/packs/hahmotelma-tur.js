/*
 * TURKIN HAHMOTELMANOSTOT — muun Euroopan (ei-EU) karttanostoja, sama
 * malli kuin EU-maiden hahmotelmapakoilla (js/packs/hahmotelma-svn.js
 * ynnä muut): jokaisella nostolla on valmis sisältö, `teksti` 3–5
 * virkettä en-Wikipedian artikkelista omin sanoin suomeksi (ei
 * käännöskopiota, ei keksittyjä faktoja, `lahde`-riville artikkeli ja
 * tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi pulun
 * kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva` +
 * `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä,
 * lisenssi ja lähdesivu kirjattuna). Toisella kahdesta nostosta on
 * lisäksi `visa`-kenttä (kysymys, neljä vaihtoehtoa, oikea indeksi,
 * fakta) täsmälleen kuten kaupunkien täkynostoilla (js/fokusnosto.js
 * nostonVisa): vastaus löytyy noston omasta tekstistä.
 *
 * MIKSI NÄMÄ KAKSI: Turkilla on jo 28 karttanostoa (kolme
 * maastokohteet-tur.js:ssä, 25 fokuskohteet-tur.js:ssä) — pääosin
 * antiikin kaupunkeja ja raunioita, luontokohteita sekä muutama
 * kaupunki ja urheilu/eläinaihe. Kummankaan tiedoston kohdetta ei ole
 * koskettu; nämä kaksi täydentävät joukkoa aiheilla, jotka eivät vielä
 * ole edustettuina: Kommagenen kuningaskunnan patsashauta Nemrut
 * Dağılla (kaakossa, kaukana lähimmästä nostosta Göbekli Tepestä ja
 * Gaziantepista) ja Safranbolun osmanikautinen kauppakaupunki
 * Mustanmeren alueella (pohjoisessa, kaukana Ankarasta ja Bursasta).
 * Kumpikin kohde osuu Turkin fokuslehden rajaukseen (`osuuLehteen`).
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `tur-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260921/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ja niiden JSON-metadata ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/tur/ (kuvat juuressa,
 * metadata _json/-alikansiossa).
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin EU-maiden hahmotelmapakoilla (js/fokuskohteet.js
 * liittää rivit KOHDE_MAAT.TUR:ään olemassa olevan fokuskohteet-tur.js
 * -listan perään). `lahi: true` on sama lähizoomiportti kuin muilla
 * hahmotelmapakoilla (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 21.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen. Laudan luvut on laskettu pelin omalla
 * kaavalla (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Turkin fokuslehden rajaukseen
 * (`osuuLehteen`).
 */

/** Turkin hahmotelmanostot: sisällölliset kohteet. */
export const HAHMOTELMA_TUR = [
  {
    id: 'hahmotelma-nemrut',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/tur-nosto-nemrut-05cd48c4.jpg',
      lyhyt: 'Kaksi irronnutta jättiläispäätä lepää huipun rauniokummun juurella.',
      selite: 'Etualalla kaksi suurta kivistä päätä seisoo maassa raunioiden keskellä. Taustalla '
        + 'kohoaa Nemrut Dağın huipun louhikko, jossa erottuvat patsaiden vartalot rivissä.',
      lahde: 'Valokuva: Klearchos Kapoutsis from Santorini, Greece, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Klearchos Kapoutsis from Santorini, Greece',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mount_Nemrut_-_Apollo_and_Heracles_Artagnes_Ares_(4961939940).jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/tur-nosto-nemrut-4ad37beb.jpg',
        lyhyt: 'Nemrut Dağın sorakumpu auringonnousussa, juurella rivi patsaita ja irtonaisia '
          + 'päitä.',
        selite: 'Vuoren huipulla kohoava keinotekoinen sorakumpu hehkuu auringonnousun valossa. '
          + 'Sen juurella seisoo rivissä istuvien jumalhahmojen vartaloita ja maassa niiden '
          + 'pudonneita päitä.',
        lahde: 'Valokuva: Liselottediehl, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Liselottediehl',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mount_Nemrut_sunrise.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Nemrut Dağı',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Nemrut Dağın patsailta puuttuvat päät?',
      'Mitä huipun suuren sorakummun uskotaan kätkevän?',
    ],
    korostukset: ['Antiokhos I Kommagenelainen|Antiokhos I Kommagenelainen', 'Karl Sester|Karl Sester'],
    nappi: 'Vuonna 1873 huipun patsaat lojuvat vielä löytämättöminä lännessä — saksalainen '
      + 'insinööri löytää raunion vasta kahdeksan vuotta myöhemmin',
    // 38.74083 E / 37.98056 N — en-Wikipedia "Mount Nemrut"
    laudat: {
      maailmankartta: { x: 7124.7, y: 1881.6 },
      europe: { x: 955, y: 894.7 },
    },
    teksti: 'Nemrut Dağı on 2 150 metriä korkea vuori Kaakkois-Turkissa Adıyamanin maakunnassa, '
      + 'Taurusvuoriston itäosien korkeimpia huippuja. Sen laelle rakennutti kuningas Antiokhos '
      + 'I Kommagenelainen noin vuonna 62 eaa. hautapyhäkön, jota reunustavat 8–9 metriä korkeat '
      + 'istuvat patsaat hänestä itsestään, kahdesta leijonasta, kahdesta kotkasta sekä '
      + 'kreikkalais-persialaisiksi sulautetuista jumalista. Patsaiden päät ovat irronneet '
      + 'vartaloista — luultavasti tahallisen kuvainraaston seurauksena — ja makaavat nykyään '
      + 'hajallaan huipulla. Huipun keskellä kohoaa 49 metriä korkea keinotekoinen sorakumpu, '
      + 'jonka uskotaan kätkevän Antiokhoksen varsinaisen haudan, mutta sitä ei ole koskaan '
      + 'löydetty. Saksalainen insinööri Karl Sester dokumentoi rauniot länsimaille vasta vuonna '
      + '1881 kartoittaessaan liikenneyhteyksiä Osmanivaltakunnalle, ja Unesco otti kohteen '
      + 'maailmanperintöluetteloonsa vuonna 1987.',
    lahde: 'en-Wikipedia "Mount Nemrut", osiot "Location and description", "Modern history" '
      + '(tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna saksalainen insinööri Karl Sester dokumentoi Nemrut Dağın raunion '
        + 'länsimaille?',
      vaihtoehdot: [
        '1862',
        '1881',
        '1908',
        '1923',
      ],
      oikea: 1,
      fakta: 'Amerikkalainen arkeologi Theresa Goell näki Nemrut Dağın ensimmäisen kerran '
        + 'vuonna 1947 ja omisti sen jälkeen elämäntyönsä kohteen tutkimiselle; hän aloitti '
        + 'omat kaivauksensa vuonna 1954.',
    },
  },
  {
    id: 'hahmotelma-safranbolu',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/tur-nosto-safranbolu-42c657e3.jpg',
      lyhyt: 'Kivikaarinen portti avautuu Safranbolun vanhankaupungin mukulakivikadulle.',
      selite: 'Kaksi kivikaarta reunustaa kujaa, jonka varrella on osmanikautisia puu- ja '
        + 'kivitaloja. Syksyn lehtiä on siroteltuna katukiville, ja ohikulkijoita näkyy kadulla.',
      lahde: 'Valokuva: Hamdigumus, Wikimedia Commons (CC0).',
      tekija: 'Hamdigumus',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Safranbolu_Evleri_2014.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/tur-nosto-safranbolu-4015288a.jpg',
        lyhyt: 'Vanhankaupungin kauppakuja, jonka varrella on puisia osmanitaloja ja kojuja.',
        selite: 'Mukulakivikuja mutkittelee vanhojen puutalojen välissä, ja pöytiin ja '
          + 'telineisiin aseteltuja myyntitavaroita näkyy molemmin puolin katua. Kauempana '
          + 'rinteellä kohoaa lisää vanhoja taloja.',
        lahde: 'Valokuva: rheins, Wikimedia Commons (CC BY 3.0).',
        tekija: 'rheins',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Streets_of_Safranbolu_Old_Town_-_2014.10_-_panoramio.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Safranbolu',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mistä sanoista Safranbolun nimi juontaa?',
      'Miksi Safranbolun vanhakaupunki pääsi Unescon maailmanperintöluetteloon?',
    ],
    korostukset: ['Kastamonun vilajetti|Kastamonun vilajettiin', 'Unesco|Unesco'],
    nappi: 'Osmanivaltakunnan Kastamonun vilajetin kauppakaupunki, tunnettu safranistaan',
    // 32.68333 E / 41.24944 N — en-Wikipedia "Safranbolu"
    laudat: {
      maailmankartta: { x: 6922.8, y: 1753.5 },
      europe: { x: 838.7, y: 808.7 },
    },
    teksti: 'Safranbolu on pieni kaupunki Karabükin maakunnassa Turkin Mustanmeren alueella, '
      + 'noin 200 kilometriä Ankarasta pohjoiseen ja sata kilometriä Mustanmeren rannikolta '
      + 'sisämaahan. Vanhakaupunki on rakennettu syvään rotkolaaksoon, ja siellä on säilynyt '
      + 'yli tuhat historiallista rakennusta: moskeijoita, hautoja, lähteitä, turkkilaisia '
      + 'kylpylöitä, karavaanimajoja sekä satoja puurunkoisia osmanitaloja ja kartanoita. '
      + 'Kaupungin nimi juontaa sanoista, jotka tarkoittavat safrania ja kreikaksi kaupunkia, '
      + 'sillä paikkakunta oli pitkään kauppapaikka ja safraninviljelyn keskus; safrania '
      + 'kasvatetaan yhä lähikylässä. Vuonna 1873 kaupunki kuuluu hallinnollisesti '
      + 'Osmanivaltakunnan Kastamonun vilajettiin. Unesco liitti Safranbolun vanhankaupungin '
      + 'maailmanperintöluetteloonsa vuonna 1994 sen hyvin säilyneiden osmanikautisten talojen '
      + 'ja arkkitehtuurin ansiosta.',
    lahde: 'en-Wikipedia "Safranbolu", johdanto-osa (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Safranbolun vanhakaupunki liitettiin Unescon '
        + 'maailmanperintöluetteloon?',
      vaihtoehdot: [
        '1873',
        '1929',
        '1994',
        '1956',
      ],
      oikea: 2,
      fakta: 'Vanhakaupunki on rakennettu syvään rotkolaaksoon Karabükin maakunnassa, '
        + 'noin 200 kilometriä Ankarasta pohjoiseen.',
    },
  },
];
