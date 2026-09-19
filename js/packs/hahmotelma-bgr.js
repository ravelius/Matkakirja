/*
 * BULGARIAN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan, Portugalin, Kreikan, Itävallan, Alankomaiden, Belgian, Puolan,
 * Tšekin, Unkarin, Irlannin ja Kroatian jälkeen Bulgaria.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48) =====
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä edellisten maiden pakat: jokaisella nostolla on
 * valmis sisältö — `teksti` 3–5 virkettä Wikipedian johdannosta omin sanoin
 * suomeksi (ei käännöskopiota, ei keksittyjä faktoja, `lahde`-riville
 * artikkeli ja tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi
 * pulun kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva` +
 * `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi
 * ja lähdesivu kirjattuna, jokaisen kuvan tiedot luettu Commonsin
 * extmetadata-rajapinnasta). 1873-näkökulma: Bulgaria on Osmanien vallan
 * alla (Bulgarian eksarkaatti 1870; Vasil Levski teloitettiin Sofiassa
 * helmikuussa 1873), ja vapaussota 1877–78 sekä Huhtikuun kansannousu 1876
 * ovat vasta edessä: nappi-alaotsikot sanovat "vasta muutaman vuoden
 * kuluttua". Shipka ja Pleven ovat muistopaikkoja (kuvina vain muistomerkit
 * ja rakennukset, ei taistelumaalauksia), ja Karlovo (Levski) käsitellään
 * asiallisesti ilman teloituskuvia. Vuoden 1873 jälkeiset asiat (Ledenikan
 * luolan löytö 1900-luvun alussa, Shipkan muistomerkki 1934) ovat mukana:
 * teksti on nykytietoa ja `nappi` katsoo vuodesta 1873.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `bgr-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/bgr/. Kuvissa ei ole
 * tunnistettavia yksityishenkilöitä.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-maiden hahmotelmilla: nämä ovat kaikki
 * kaupungin (Sofia, Bulgarian ainoa pelikaupunki) ulkopuolella,
 * lähin nosto yli 20 lautayksikön päässä kaupungin merkistä ja
 * keskenään yli 10 lautayksikön päässä, ja js/fokuskohteet.js liittää
 * rivit KOHDE_MAAT.BGR:ään. Bulgariassa on jo 26 nostoa; Plovdiv, Varna,
 * Veliko Tarnovo, Rila, Rilan luostari, Musala, Vitosha, Balkanvuoret,
 * Ruusulaakso, Madara, Nesebar, Belogradtsik, Veliki Preslav, Srebarna ja
 * muut ovat niiden joukossa eikä niitä toisteta. `lahi: true` on sama
 * lähizoomiportti kuin Ranskan hahmotelmalla
 * (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen (Vidinin piste on Baba Vidan, Ledenikan piste
 * Ledenikan luolan artikkelista). Laudan luvut on laskettu pelin omalla
 * kaavalla (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Bulgarian fokuslehden rajaukseen
 * (`osuuLehteen`). Kaksi rannikkokohdetta (Sozopol ja Kaliakra) on pelin
 * karkean maailmankartan BGR-renkaan ULKOPUOLELLA, koska rengas on
 * yksinkertaistettu; niiden koordinaatit ovat Wikipedian todelliset.
 * Shipka on 6,6 yksikköä Ruusulaakson nykyisestä merkistä (hyväksytty).
 */

/** Bulgarian hahmotelmanostot: sisällölliset kohteet kaupungin ulkopuolella. */
export const HAHMOTELMA_BGR = [
  {
    id: 'hahmotelma-bansko',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-bansko-f04a4fe0.jpg',
      lyhyt: 'Kivitalojen reunustama mukulakivikuja Banskon vanhassakaupungissa.',
      selite: 'Kapea kujanne, jonka varrella on kivi- ja puuseinäisiä perinteisiä taloja ja ravintola. Katto on tiilikatettu ja taustalla näkyy havupuita.',
      lahde: 'Valokuva: Explorer1940, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Explorer1940',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bansko_--_Street_in_the_old_town.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-bansko-f64e060c.jpg',
        lyhyt: 'Pyhän Kolminaisuuden kirkko ja sen kellotorni Banskossa.',
        selite: 'Kivinen kellotorni kohoaa kirkon muurin yläpuolelle vanhankaupungin mukulakivikadun laidalla. Kuvauksen mukaan kirkko on rakennettu noin 1835 ja 30 metriä korkea kellotorni pystytetty 1850.',
        lahde: 'Valokuva: Christian Koehn (fragwürdig), Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Christian Koehn (fragwürdig)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sveta_troica_bansko.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-bansko-4cf27e52.jpg',
        lyhyt: 'Banskon vanhakaupunki kivitaloineen ja Pirinin lumihuippuja taustalla.',
        selite: 'Perinteinen kivi- ja tiilikattoinen talo katunäkymässä, jonka perällä kohoavat Pirin-vuorten lumiset huiput.',
        lahde: 'Valokuva: Colin W, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Colin W',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Old_town_Bansko_-_panoramio.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Bansko',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Minkä vuorten juurella Bansko sijaitsee?',
      'Kuinka monta lämmintä kivennäislähdettä läheisessä Banyan kylässä on?',
    ],
    korostukset: ['Pirin|Pirin-vuorten'],
    nappi: 'Pirinin juurella oleva karjankasvattajien ja kiertokauppiaiden kaupunki Osmanien vallan alla',
    // 23.5 E / 41.83333333 N — en-Wikipedia "Bansko"
    laudat: {
      maailmankartta: { x: 6616.7, y: 1730.2 },
      europe: { x: 662.4, y: 793.4 },
    },
    teksti: 'Bansko on kaupunki Lounais-Bulgariassa Blagoevgradin alueella Razlogin lähellä. Se '
      + 'sijaitsee Pirin-vuorten juurella Nestos-joen laaksossa 925 metrin korkeudessa, '
      + 'lähellä samannimistä kansallispuistoa. Ennen Bansko oli pääasiassa '
      + 'karjankasvattajien ja kiertävien kauppiaiden yhteisö, mutta nykyään se on '
      + 'kansainvälinen talvi- ja kesämatkailun keskus ja hiihtokeskus. Kaupungista '
      + 'rakennettiin gondolihissi vuonna 2003, ja hiihtoalueella on 75 kilometriä rinteitä '
      + 'ja hissillä saavutettava huippu 2 600 metrin korkeudessa. Viiden kilometrin päässä '
      + 'sijaitsevassa Banyan kylässä on 27 lämpimän kivennäisveden lähdettä.',
    lahde: 'en-Wikipedia "Bansko", johdanto-osa ja osiot "Location and Transportation" ja '
      + '"Economy" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-pobiti-kamani',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-pobiti-kamani-d6520471.jpg',
      lyhyt: 'Hiekkakivipylväitä Pobiti Kamanin kivimetsässä Varnan lähellä.',
      selite: 'Erikoisen muotoisia kivipylväitä nousee hiekkaiselta ja ruohoiselta tasangolta, taustalla matalia metsäisiä kukkuloita.',
      lahde: 'Valokuva: www.vacacionesbulgaria.com, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'www.vacacionesbulgaria.com',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bulgaria-Pobiti_Kamani-01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-pobiti-kamani-4f508d23.jpg',
        lyhyt: 'Yleiskuva Pobiti Kamanin kivipylväiden kentästä.',
        selite: 'Kuvassa näkyy laaja hiekkainen alue, jolla on hajallaan pylväsmäisiä kivimuodostelmia ja kallioita, sekä avara maisema taustalla.',
        lahde: 'Valokuva: Ivaylo80, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Ivaylo80',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pobiti_kamani_6.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Pobiti kamani',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mitä nimi Pobiti kamani tarkoittaa?',
      'Kuka kuvasi kivipylväät ensimmäisenä vuonna 1829?',
    ],
    korostukset: ['kivipylväät|kivipylväät'],
    nappi: 'Varnan lähellä oleva kivipylväiden aavikko, jonka tiede tuntee vasta vuodesta 1829',
    // 27.70666667 E / 43.22638889 N — en-Wikipedia "Pobiti Kamani"
    laudat: {
      maailmankartta: { x: 6756.9, y: 1674.2 },
      europe: { x: 743.2, y: 756.7 },
    },
    teksti: 'Pobiti kamani, bulgariaksi istutetut kivet, on aavikkomainen kalliomuodostuma Varnan '
      + 'läänin luoteisrajalla Bulgariassa. Venäläinen arkeologi ja historioitsija Viktor '
      + 'Teplyakov kuvasi kivipylväät ensimmäisenä vuonna 1829, ja alue julistettiin '
      + 'luonnonmuistomerkiksi 1930-luvun lopulla. Pylväät ovat putkimaisia kertymiä, jotka '
      + 'ovat muodostuneet metaania sisältävien nesteiden noustessa, ja hiekan poistuttua ne '
      + 'ovat muodostaneet aavikkomaisen maiseman. Alue on kahdeksan kilometriä pitkä ja '
      + 'kolme leveä, ja siinä on seitsemän pylväsryhmää; suurimmassa, Dikilitashissa, on yli '
      + '350 kiveä.',
    lahde: 'en-Wikipedia "Pobiti Kamani", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kaliakra',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-kaliakra-8bde37e0.jpg',
      lyhyt: 'Kaliakran linnoituksen portti jyrkän kalliokärjen päällä Mustanmeren rannalla.',
      selite: 'Kivinen porttitorni ja muurinosa kohoavat kallion reunalla, ja vasemmalla avautuu meri. Kärjellä näkyy myös nykyaikaisia mastoja.',
      lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Diego Delso',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cabo_de_Kaliakra,_Bulgaria,_2016-05-27,_DD_134.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-kaliakra-b2742a38.jpg',
        lyhyt: 'Näkymä Kaliakran kalliokärjeltä pohjoiseen Mustallemerelle.',
        selite: 'Punertavat ja keltaiset jyrkänteet kaartuvat turkoosin meren ylle ruohoisen rinteen alapuolella.',
        lahde: 'Valokuva: Dan Kollmann, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Dan Kollmann',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kaliakra_-_Blick_nach_Norden.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kaliakra',
    tyyppi: 'meri',
    lahi: true,
    kysymykset: [
      'Mitä nimi Kaliakra tarkoittaa perinteisen käännöksen mukaan?',
      'Minä vuonna niemen ensimmäinen nykyaikainen majakka rakennettiin?',
    ],
    korostukset: ['majakka|majakka'],
    nappi: 'Mustanmeren kalliokärki, jonka majakan Osmanien majakkayhtiö rakensi vuonna 1866',
    // 28.46666667 E / 43.36666667 N — en-Wikipedia "Kaliakra"
    laudat: {
      maailmankartta: { x: 6782.2, y: 1668.5 },
      europe: { x: 757.8, y: 753.1 },
    },
    teksti: 'Kaliakra on niemi Etelä-Dobrudzhassa Bulgarian pohjoisella Mustanmeren rannikolla, '
      + 'ja se päättyy pitkään kapeaan kärkeen 12 kilometriä Kavarnasta itään. Rannikko on '
      + 'jyrkkää, ja pystysuorat kalliot laskeutuvat 70 metrin korkeudesta mereen; alue on '
      + 'luonnonsuojelualue, jolla voi havaita delfiinejä ja merimetsoja ja jonka yli kulkee '
      + 'tärkeä lintujen muuttoreitti Via Pontica. Nimi tulee bysanttilaisesta kreikasta ja '
      + 'tarkoittaa kaunista niemeä. Niemellä on keskiaikaisen Dobrotitsan despotaatin '
      + 'pääkaupungin linnoitusmuurien, vesijohdon ja kylpylän jäänteitä, ja ensimmäinen '
      + 'nykyaikainen majakka rakennettiin vuonna 1866 Osmanien valtakunnan majakkayhtiön '
      + 'toimesta.',
    lahde: 'en-Wikipedia "Kaliakra", johdanto-osa ja osiot "Name" ja "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Mitä nimi Kaliakra tarkoittaa perinteisen käännöksen mukaan?',
      vaihtoehdot: [
        'Pitkä ranta',
        'Tuulinen kärki',
        'Kaunis niemi',
        'Valkoinen kallio',
      ],
      oikea: 2,
      fakta: 'Kaliakran edustalla käytiin meritaistelu 11. elokuuta 1791.',
    },
  },
  {
    id: 'hahmotelma-vratsa-ledenika',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-vratsa-ledenika-7bdbfabf.jpg',
      lyhyt: 'Ledenikan luolan suuri sali, jossa tippukivet loistavat valaistuksessa.',
      selite: 'Kuvauksen mukaan kyseessä on luolan konserttisaliksi kutsuttu kammio Vratsan lähellä. Katosta riippuu tippukiviä ja kulkua varten on rakennettu kaide ja portaat.',
      lahde: 'Valokuva: Martin Marinov, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Martin Marinov',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:LedenikaCave.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-vratsa-ledenika-fb26f9fd.jpg',
        lyhyt: 'Suuri jääpylväs Ledenikan luolassa, jonka nimi tulee jäästä.',
        selite: 'Kirkas jääpylväs seisoo luolan kivikossa portaiden vieressä. Kuva on otettu Vrachanski Balkanin luonnonpuistossa sijaitsevassa Ledenikan luolassa.',
        lahde: 'Valokuva: Gligan, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Gligan',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ledenika_cave,_icycle_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ledenikan luola',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mitä nimi Ledenika tarkoittaa?',
      'Minä vuonna luola avattiin matkailijoille?',
    ],
    korostukset: ['stalaktiitti|stalaktiitteja'],
    nappi: 'Vratsan Balkanin luola, joka löydetään vasta 1900-luvun alussa',
    // 23.49111111 E / 43.20444444 N — en-Wikipedia "Ledenika"
    laudat: {
      maailmankartta: { x: 6616.4, y: 1675.1 },
      europe: { x: 662.2, y: 757.3 },
    },
    teksti: 'Ledenika, bulgariaksi jäinen, on luola Balkanvuorten luoteisosassa 16 kilometrin '
      + 'päässä Vratsan kaupungista; sisäänkäynti on noin 830 metrin korkeudessa. Luolassa on '
      + 'runsaasti käytäviä ja vaikuttavia karstimuodostelmia, kuten stalaktiitteja ja '
      + 'stalagmiitteja, ja se löydettiin noin 1900-luvun alussa. Luola on noin 300 metriä '
      + 'pitkä ja siinä on kymmenen salia, joista suurin, Suuri temppeli, on 15 metriä '
      + 'korkea; matkailijoille se on ollut avoinna vuodesta 1961. Talvella katossa voi olla '
      + 'jääpuikkoja, ja niiden runsauden arvellaan antaneen luolalle nimen.',
    lahde: 'en-Wikipedia "Ledenika", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-trigrad',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-trigrad-2ace17dc.jpg',
      lyhyt: 'Trigradin rotko ylhäältä nähtynä: kuollut puu kallionkielekkeellä ja tie rotkon pohjalla.',
      selite: 'Jyrkkien kalliorinteiden ja havumetsän väliin jää kapea laakso, jossa tie kulkee joen vieressä. Taustalla näkyy vuoria.',
      lahde: 'Valokuva: Borislav krustev, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Borislav krustev',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Trigrad_Gorge_1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-trigrad-88c3bbca.jpg',
        lyhyt: 'Kävelysilta ja portaat Devil\'s Throat -luolan sisällä lähellä Trigradia.',
        selite: 'Luolan valaistu kulkureitti kiemurtelee kalliokäytävien läpi kohti korkeaa aukkoa katossa.',
        lahde: 'Valokuva: Vislupus, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Vislupus',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Devil%27s_Throat_Cave_40.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Trigradin rotko',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mihin luolaan Trigradska-joki syöksyy?',
      'Kuinka korkea rotkon länsiseinä on?',
    ],
    korostukset: ['marmori|marmorikallioiden'],
    nappi: 'Rodopien marmorirotko, jossa joki katoaa luolaan',
    // 24.37916667 E / 41.61666667 N — en-Wikipedia "Trigrad Gorge"
    laudat: {
      maailmankartta: { x: 6646, y: 1738.9 },
      europe: { x: 679.3, y: 799.1 },
    },
    teksti: 'Trigradin rotko on Rodopien pystysuorien marmorikallioiden kanjoni Smolyanin '
      + 'läänissä, yhdessä Bulgarian eteläisimmistä lääneistä. Rotko sulkee sisäänsä '
      + 'Trigradska-joen, joka syöksyy Paholaisen kurkku -luolaan ja tulee 530 metrin päästä '
      + 'esiin suurena karstilähteenä. Länsiseinä on 300 metriä ja itäseinä 300–350 metriä '
      + 'korkea, ja seinien väli kapenee pohjoisosassa alun 300 metristä noin 100 metriin. '
      + 'Rotko on 1,2 kilometrin päässä Trigradin kylästä 1 450 metrin korkeudessa, ja se on '
      + 'yksi vain kolmesta maailman joen pelkkään marmoriin kaivamasta rotkosta; '
      + 'suojelualueena se on ollut 1960-luvun alusta ja matkailukäytössä vuodesta 1977.',
    lahde: 'en-Wikipedia "Trigrad Gorge", koko artikkeli (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mihin luolaan Trigradska-joki syöksyy Trigradin rotkossa?',
      vaihtoehdot: [
        'Paholaisen kurkkuun',
        'Ledenikan luolaan',
        'Kuninkaan luolaan',
        'Kristallisaliin',
      ],
      oikea: 0,
      fakta: 'Rotko on yksi vain kolmesta maailman pelkkään marmoriin joen kaivamasta rotkosta.',
    },
  },
  {
    id: 'hahmotelma-strandzha',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-strandzha-cf9c0ec1.jpg',
      lyhyt: 'Strandzhan vuoristoa ja metsäisiä rinteitä Zarevon ja Malko Tarnovon välillä.',
      selite: 'Kuvassa on Strandzhan metsäinen vuorimaisema niityn takaa. Tiedoston kuvauksen mukaan näkymä on Zarevon ja Malko Tarnovon välisestä Strandzhan vuoristosta.',
      lahde: 'Valokuva: Julian Nyča, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Julian Nyča',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zarewo_Strandscha.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-strandzha-d4cccd74.jpg',
        lyhyt: 'Vanha tammi Strandzhan Paroriassa aitauksen takana.',
        selite: 'Kuvassa on Strandzhan alueen vanha unkarintammi (Quercus frainetto) niityllä. Tiedoston kuvauksen mukaan puu on noin 970-vuotias ja yksi Strandzhan vanhimmista tunnetuista tammista.',
        lahde: 'Valokuva: TodorBozhinov, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'TodorBozhinov',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ancient_oak_in_Paroria,_Strandzha,_Bulgaria.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Strandzha',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Kuinka suuri Strandzhan luonnonpuisto on?',
      'Millä tavalla nestinarstvo-perinnettä harjoitetaan?',
    ],
    korostukset: ['luonnonpuisto|luonnonpuisto'],
    nappi: 'Bulgarian kaakkoisin vuoristo, laakeripuumetsiä ja pakanallinen tulentanssi',
    // 27.60861111 E / 42.0125 N — en-Wikipedia "Strandzha Nature Park"
    laudat: {
      maailmankartta: { x: 6753.6, y: 1723.1 },
      europe: { x: 741.3, y: 788.7 },
    },
    teksti: 'Strandzhan luonnonpuisto on Bulgarian suurin suojelualue: se kattaa 1 161 '
      + 'neliökilometriä Strandzhan vuoristossa maan äärimmäisessä kaakkoiskulmassa Turkin '
      + 'rajalla. Puisto perustettiin 25. tammikuuta 1995 suojelemaan eurooppalaisesti '
      + 'merkittäviä ekosysteemejä sekä alueen perinteistä kulttuuria ja kansanperinnettä. '
      + 'Metsät peittävät 80 prosenttia puistosta, ja ne ovat Euroopan viimeisiä lauhkeita '
      + 'metsiä, joissa on ikivihreä laakeripuualuskasvillisuus. Vanhin puiston '
      + 'luonnonsuojelualueista, Silkosia, perustettiin vuonna 1933, ja Uzunbodzhak kuuluu '
      + 'Unescon biosfäärialueiden verkostoon. Perinteisiin kuuluu nestinarstvo, paljain '
      + 'jaloin tanssiminen hehkuvilla hiilillä, joka on pakanallisen menneisyyden jäänne.',
    lahde: 'en-Wikipedia "Strandzha Nature Park", johdanto-osa (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mitä perinnettä Strandzhassa harjoitetaan paljain jaloin hehkuvilla hiilillä?',
      vaihtoehdot: [
        'Koprivshtitsan juhla',
        'Nestinarstvo',
        'Kukeri-naamiaiset',
        'Horo-tanssi',
      ],
      oikea: 1,
      fakta: 'Silkosia on Bulgarian vanhin luonnonsuojelualue, perustettu vuonna 1933.',
    },
  },
  {
    id: 'hahmotelma-smolyan',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-smolyan-18f720f9.jpg',
      lyhyt: 'Smolyanin järven peilityyni pinta ja kalliohuippu syysvärien keskellä.',
      selite: 'Panoraamakuva Smolyanin järvistä: järven pinnassa heijastuvat syksyn väriset puut ja taustalla kohoaa metsäinen vuori kalliohuippuineen.',
      lahde: 'Valokuva: Vislupus, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Vislupus',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Smolyan_Lakes_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-smolyan-6688e5ef.jpg',
        lyhyt: 'Havupuiden kehystämä Trevisto-järvi ja metsäinen vuori Smolyanin järvien alueella.',
        selite: 'Kuva on tiedoston nimen mukaan Smolyanin järvien Trevisto-järveltä. Havupuiden lomasta näkyvät niittyä ympäröivät vesialtaat ja metsäinen vuorenhuippu.',
        lahde: 'Valokuva: Krisko26, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Krisko26',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Смолянски_езера,_Тревисто_езеро_поглед_към_пайзажа,_в_който_се_вижда_и_Смолян.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Smolyan',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mikä on Rodopien korkein huippu Smolyanin lähellä?',
      'Millä nimellä Smolyania kutsuttiin Osmanien aikana?',
    ],
    korostukset: ['hiihtokeskus|hiihtokeskus'],
    nappi: 'Pashmakli: Rodopien vuoristokaupunki Osmanien Edirnen vilajetissa',
    // 24.7 E / 41.58333333 N — en-Wikipedia "Smolyan"
    laudat: {
      maailmankartta: { x: 6656.7, y: 1740.2 },
      europe: { x: 685.4, y: 800 },
    },
    teksti: 'Smolyan on kaupunki ja hiihtokeskus Etelä-Bulgariassa lähellä Kreikan rajaa. Se '
      + 'sijaitsee Tšernan (musta) ja Byalan (valkoinen) jokien kapeassa laaksossa '
      + 'Keski-Rodopeilla vuoriston korkeimman huipun Golyam Perelikin (2 191 metriä) '
      + 'juurella, ja lähellä ovat suositut hiihtokeskukset Pamporovo ja Chepelare. Nimi '
      + 'tulee slaavilaisesta smolyani-heimosta, joka asettui alueelle 600-luvulla, ja '
      + 'keskiajalla seutu kuului Bysantin ja Bulgarian valtakunnille ennen kuin se joutui '
      + 'Osmanien alaisuuteen. Osmanien aikana kaupunki nimettiin Pashmakliksi, ja se oli '
      + 'viisisataa vuotta Osmanien vallan alla; vuosina 1867–1912 se kuului Edirnen '
      + 'vilajetin Gümülcinen sandžakiin. Nykyinen kaupunki muodostui vuonna 1960 kolmen '
      + 'kylän yhdistyessä.',
    lahde: 'en-Wikipedia "Smolyan", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-berkovitsa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-berkovitsa-38efe8b9.jpg',
      lyhyt: 'Berkovitsan kivinen kellotorni, jossa lukee vuosiluku 1762.',
      selite: 'Berkovitsan kellotorni on rakennettu kivestä ja puisesta kerroksesta, ja siinä on puinen lyhtymäinen huippuosa. Tornin seinässä näkyy vuosiluku 1762.',
      lahde: 'Valokuva: Пакко, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Пакко',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Berkovitsa_Clock_Tower.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-berkovitsa-c8827782.jpg',
        lyhyt: 'Berkovitsan keskusaukion kukkaistutuksia, marmorireunaisia altaita ja kerrostaloja.',
        selite: 'Kuvassa on Berkovitsan keskustan aukio, jossa on marmorilla verhoiltuja altaita, punaisia ja keltaisia kukkia, suihkulähde ja taustalla kerrostaloja.',
        lahde: 'Valokuva: Пакко, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Пакко',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Berkovitsa_downtown_view.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Berkovitsa',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Minkä huipun rinteellä Berkovitsa sijaitsee?',
      'Minä vuonna kaupunki mainitaan ensi kerran Osmanien asiakirjoissa?',
    ],
    korostukset: ['Kom|Kom-vuoren'],
    nappi: 'Lounaisen Balkanin juurella oleva kaupunki, jossa Vasil Levski vieraili elokuussa 1872',
    // 23.11666667 E / 43.23333333 N — en-Wikipedia "Berkovitsa"
    laudat: {
      maailmankartta: { x: 6603.9, y: 1673.9 },
      europe: { x: 655, y: 756.6 },
    },
    teksti: 'Berkovitsa on kaupunki ja hiihtokeskus Luoteis-Bulgariassa, Montanan läänissä '
      + 'lähellä Varshetsin kaupunkia; asukkaita on noin 13 900. Se sijaitsee Berkovska Stara '
      + 'Planinan Kom-vuoren pohjoisrinteellä Berkovitsa-joen laaksossa 405 metrin '
      + 'korkeudessa. Kaupunki mainitaan ensi kerran Osmanien asiakirjoissa vuonna 1488, ja '
      + 'aivan sen länsipuolella Kaleto-kukkulalla on vanhan linnoitetun asutuksen ja '
      + 'varhaiskristillisen piispakompleksin jäänteitä. Seutu osallistui Konstantinin ja '
      + 'Fruzhinin kapinaan (1408–1413) sekä Chiprovtsin kapinaan vuonna 1688. Elokuun 1872 '
      + 'lopussa Vasil Levski saapui Berkovitsaan yhdessä Vratsan vallankumouskomitean '
      + 'puheenjohtajan Mito Ankovin kanssa.',
    lahde: 'en-Wikipedia "Berkovitsa", johdanto-osa ja osio "Location and history" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-sozopol',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-sozopol-dedf2f20.jpg',
      lyhyt: 'Sozopolin vanhankaupungin niemi ja Mustanmeren lahti ylhäältä katsottuna.',
      selite: 'Näkymä lahden yli Sozopolin vanhankaupungin niemelle, jonka punakattoiset talot kohoavat kalliorannan päällä. Etualalla on kellotorni.',
      lahde: 'Valokuva: Daniel Albrecht, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Daniel Albrecht',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sozopol_-_The_Bay_from_Above_(41428763151).jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-sozopol-9a80b3b8.jpg',
        lyhyt: 'Vanhankaupungin perinteinen puutalo mukulakivikadun varrella Sozopolissa.',
        selite: 'Kuvassa on Sozopolin vanhankaupungin harmaa puutalo, jonka alakerta on kiveä ja yläkerta puuta. Etualalla on mukulakivikatu.',
        lahde: 'Valokuva: MrPanyGoff, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'MrPanyGoff',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Old_town_Sozopol.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Sozopol',
    tyyppi: 'meri',
    lahi: true,
    kysymykset: [
      'Minkä kaupungin kanssa Sozopol kilpaili kaupankäynnissä antiikissa?',
      'Minä vuonna roomalaiset valtasivat ja ryöstivät Sozopolin?',
    ],
    korostukset: ['Apollonia|Apollonia'],
    nappi: 'Sizebolu: Mustanmeren muinainen kreikkalaissiirtokunta Osmanien alaisuudessa',
    // 27.7 E / 42.41666667 N — en-Wikipedia "Sozopol"
    laudat: {
      maailmankartta: { x: 6756.7, y: 1706.9 },
      europe: { x: 743, y: 778 },
    },
    teksti: 'Sozopol on muinainen merenrantakaupunki Bulgarian Mustanmeren etelärannikolla 35 '
      + 'kilometriä Burgasista etelään, ja se on tunnettu Apollonia-taide- ja '
      + 'elokuvafestivaalista. Kreikkalaiset siirtolaiset Miletoksesta perustivat kaupungin '
      + '600-luvulla eaa. nimellä Antheia, ja myöhemmin se nimettiin Apolloniaksi Apollon '
      + 'temppelin mukaan; siitä tuli yksi Mustanmeren rikkaimmista kreikkalaissiirtokunnista '
      + 'ja Mesembrian, nykyisen Nesebarin, legendaarinen kauppakilpailija. Vuonna 72 eaa. '
      + 'roomalaislegioonat valloittivat ja ryöstivät kaupungin, ja Lucullus vei Apollon '
      + 'patsaan Roomaan. Satamalahdesta on löydetty 2. ja 1. vuosituhannen eaa. ankkureita, '
      + 'jotka todistavat vilkkaasta merenkulusta jo antiikin ajoilta. Osmanien vallan aikana '
      + 'kaupunki tunnettiin nimellä Sizebolu.',
    lahde: 'en-Wikipedia "Sozopol", johdanto-osa ja osiot "Name" ja "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-koprivshtitsa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-koprivshtitsa-d68d9550.jpg',
      lyhyt: 'Koprivshtitsan kaareva kivisilta ja herätysajan talot sen takana.',
      selite: 'Kuvassa on Koprivshtitsan kaareva kivisilta purolla ja sen takana kivijalkaisia, puuosaisia taloja. Kuvan nimi viittaa Ensimmäisen laukauksen siltaan.',
      lahde: 'Valokuva: Esther Westerveld, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Esther Westerveld',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Brug_van_het_eerste_schot_-_Koprivshtitsa_(4759742960).jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-koprivshtitsa-a3dcc10a.jpg',
        lyhyt: 'Koprivshtitsan sinisenä maalattu talo, jossa on ruskeat ikkunaluukut.',
        selite: 'Kuvassa on Koprivshtitsan sinisenä maalattu kaksikerroksinen talo, jonka seinää koristavat valkoiset kehykset ja ikkunoissa on puiset luukut.',
        lahde: 'Valokuva: TwoWings, Wikimedia Commons (public domain).',
        tekija: 'TwoWings',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Blue-house-Koprivshtitsa.JPG',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Koprivshtitsa',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna huhtikuun kansannousun ensimmäinen laukaus ammuttiin?',
      'Mitä bulgarian sana kopriva tarkoittaa?',
    ],
    korostukset: ['herätyksen|herätyksen'],
    nappi: 'Herätysajan talojen vuoristokaupunki; huhtikuun kansannousun ensimmäinen laukaus ammutaan siellä vasta muutaman vuoden kuluttua',
    // 24.35 E / 42.63333333 N — en-Wikipedia "Koprivshtitsa"
    laudat: {
      maailmankartta: { x: 6645, y: 1698.2 },
      europe: { x: 678.7, y: 772.3 },
    },
    teksti: 'Koprivshtitsa on historiallinen kaupunki Sredna Goran vuorilla Topolnitsa-joen '
      + 'varrella, 111 kilometriä Sofiasta itään ja 1 030 metrin korkeudessa; nimi tulee '
      + 'bulgarian sanasta kopriva eli nokkonen. Kaupunki oli yksi vuoden 1876 huhtikuun '
      + 'kansannousun keskuksista, ja ensimmäinen laukaus Osmanien valtaa vastaan ammuttiin '
      + 'täällä sillalla, joka on vuodelta 1813. Kaupungissa on 383 '
      + 'arkkitehtuurimuistomerkkiä Bulgarian kansallisen herätyksen ajalta, joista suurin '
      + 'osa on kunnostettu alkuperäiseen asuunsa; yksi niistä on vuosina 1853–1856 '
      + 'rakennettu Oslekovin talo, nykyään etnografinen museo. Kaupungin ensimmäinen koulu '
      + 'perustettiin vuonna 1837, ja Bulgarian kansallinen kansanperinnefestivaali '
      + 'järjestetään täällä vuodesta 1965 noin viiden vuoden välein.',
    lahde: 'en-Wikipedia "Koprivshtitsa", johdanto-osa ja osiot "History" ja "Landmarks" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-shipka',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-shipka-594cf851.jpg',
      lyhyt: 'Shipkan vapaudenmuistomerkki kohoaa kukkulan huipulla valkoisten portaiden päässä.',
      selite: 'Kivinen muistomerkkitorni, jonka juurella on leijonapatsas, näkyy sinistä taivasta vasten. Muistomerkille johtavat portaat kulkevat vihreän rinteen läpi.',
      lahde: 'Valokuva: Dennis G. Jarvis, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Dennis G. Jarvis',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bulgaria_Bulgaria-0849_-_Shipka_Memorial_(7433104118).jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-shipka-66d18b38.jpg',
        lyhyt: 'Shipkan muistomerkin kivitorni ja leijonapatsas lähikuvassa alhaalta päin.',
        selite: 'Torni on rakennettu karkeista kivilohkareista, ja sen jalustalla on pronssinen leijona. Tornin kyljessä on kyrillisin kirjaimin sana Шейново, ja edessä johtavat portaat sisäänkäynnille.',
        lahde: 'Valokuva: Klearchos Kapoutsis, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Klearchos Kapoutsis',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Shipka_Memorial.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-shipka-7bc4a5db.jpg',
        lyhyt: 'Näkymä Shipkan solaan ja metsäisille Balkanvuorten rinteille muistomerkin juurelta.',
        selite: 'Vihreät Vanhan vuoren rinteet ja solatie avautuvat kuvassa etualan portaita ja niityn kukkia vasten. Kuvassa on muutama etäinen kävijä.',
        lahde: 'Valokuva: Иван Иванов, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Иван Иванов',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Shipka_pass.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Shipkan sola',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minkä kahden kaupungin välillä Shipkan sola kulkee?',
      'Minä vuonna Shipkan muistomerkki avattiin?',
    ],
    korostukset: ['muistomerkki|muistomerkin'],
    nappi: 'Balkanin sola Gabrovon ja Kazanlakin välillä; taistelut käydään vasta muutaman vuoden kuluttua',
    // 25.31666667 E / 42.76666667 N — en-Wikipedia "Shipka Pass"
    laudat: {
      maailmankartta: { x: 6677.2, y: 1692.8 },
      europe: { x: 697.3, y: 768.8 },
    },
    teksti: 'Shipkan sola on 1 150 metrin korkeudessa oleva maisemallinen sola Balkanvuorten läpi '
      + 'Bulgariassa. Se on Stara Zagoran ja Gabrovon läänien raja ja yhdistää Gabrovon ja '
      + 'Kazanlakin kaupungit; sola on osa Bulgarkan luonnonpuistoa. Vuosina 1877–1878 '
      + 'solalla käytiin Shipkan taisteluiksi kutsuttu sarja yhteenottoja, joissa venäläiset '
      + 'joukot ja bulgarialaiset vapaaehtoiset taistelivat Osmanien valtakuntaa vastaan. '
      + 'Vuonna 1934 avatun Shipkan muistomerkin ovat suunnitelleet arkkitehti Atanas Donkov '
      + 'ja kuvanveistäjä Aleksandar Andreev: se on 31,5 metriä korkea kivitorni, jonka '
      + 'sisäänkäynnin yllä on kahdeksan metriä pitkä pronssileijona.',
    lahde: 'en-Wikipedia "Shipka Pass", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-perperikon',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-perperikon-84abdbbd.jpg',
      lyhyt: 'Perperikonin kalliokaupungin muurit ja kalliomuodostelmat kohoavat Rodopien maisemassa.',
      selite: 'Kalliolle louhittuja ja kivistä muurattuja rakenteita on kuvattu kukkulan huipulta, ja taustalla näkyy Rodopien vihreitä rinteitä ja pieni järvi.',
      lahde: 'Valokuva: Kritzolina, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Kritzolina',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Archaeological_complex_of_Perperikon_02.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-perperikon-84c00df4.jpg',
        lyhyt: 'Kaivaukset Perperikonin kukkulan huipulla paljastavat kivimuurien pohjia.',
        selite: 'Kuvassa näkyvät kaivettujen rakennusten kiviseinät ja keskellä valkoinen kivinen istuinmainen rakenne. Taustalla on Rodopien vuoristomaisemaa ja lipputanko.',
        lahde: 'Valokuva: Anton Lefterov, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Anton Lefterov',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:PerpericonCathedral.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Perperikon',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minkä kaupungin lähellä Perperikon sijaitsee?',
      'Mikä oli Perperikonin saarnatuolin löydön erityisyys?',
    ],
    korostukset: ['megaliittinen|megaliittinen'],
    nappi: 'Rodopien traakialainen kalliokaupunki, jota ei ole vielä kaivettu esiin',
    // 25.46527778 E / 41.71472222 N — en-Wikipedia "Perperikon"
    laudat: {
      maailmankartta: { x: 6682.2, y: 1735 },
      europe: { x: 700.1, y: 796.5 },
    },
    teksti: 'Perperikon on muinainen traakialainen kaupunki Itä-Rodopeilla 15 kilometriä '
      + 'Kardzhalista koilliseen 470 metriä korkealla kalliokukkulalla, jonka arvellaan '
      + 'olleen pyhä paikka. Se on Balkanin suurin megaliittinen kokonaisuus, ja keskiajalla '
      + 'se toimi linnoituksena. Alueella on ollut toimintaa jo vuodesta 5000 eaa., ja '
      + 'kalliosta hakattu, lähes kaksimetrinen pyöreä alttari on peräisin varhaiselta '
      + 'rautakaudelta. Arkeologi Nikolay Ovcharov aloitti kaivaukset vuonna 2000 ja paljasti '
      + 'valtavan monikerroksisen palatsin ja kukkulan ympäri rakennetun linnoituksen, jonka '
      + 'muurit ovat jopa 2,8 metriä paksut. Vuonna 2005 huipulta löytyi saarnatuoli, jonka '
      + 'arvellaan olevan ensimmäinen Bulgariasta löydetty ja joka on peräisin 300-luvun '
      + 'lopulta tai 400-luvun alusta.',
    lahde: 'en-Wikipedia "Perperikon", johdanto-osa ja osiot "History" ja "Church" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-bachkovo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-bachkovo-8d608b15.jpg',
      lyhyt: 'Bachkovon luostarin kirkot kupoleineen ja kivipäällysteinen sisäpiha.',
      selite: 'Kuvassa on kaksi kupolikirkkoa, joissa on punertavaa tiilikoristelua ja tiilikatto. Etualalla on kivetty luostarin piha.',
      lahde: 'Valokuva: Ymblanter, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ymblanter',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bachkovo_Monastery_Churches_North_Yard.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-bachkovo-399f69fa.jpg',
        lyhyt: 'Bachkovon luostarin sisäpihan arkadikäytävä ja kirkon kivimuuri.',
        selite: 'Vasemmalla on kaarikäytävä, jonka yllä kulkee puinen parveke, ja oikealla kirkon kiviseinä ikkunoineen. Piha on kivetty ja taustalla nousee vuorta.',
        lahde: 'Valokuva: Michael Desnoyelles, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Michael Desnoyelles',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bachkovo_Monastery_-_Inside_court_and_church.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-bachkovo-c6d70fc4.jpg',
        lyhyt: 'Maalattu kaari ja pyhien kuvia Bachkovon luostarin kirkon eteisessä.',
        selite: 'Kaaren ympärillä on kukkakuvioista koristemaalausta ja soikeissa kehyksissä pyhien hahmojen kuvia. Kuvateksti kertoo paikaksi Bachkovon luostarin Marian kuolonuinumisen kirkon.',
        lahde: 'Valokuva: Kritzolina, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Kritzolina',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Church_of_the_Dormition,_Bachkovo_Monastery_02.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Bachkovon luostari',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna Bachkovon luostari perustettiin?',
      'Mikä on ainoa luostarin alkuperäinen rakennus?',
    ],
    korostukset: ['georgialainen|georgialainen'],
    nappi: 'Georgialaisen valtiomiehen perustama luostari Chepelare-joen rannalla',
    // 24.84944444 E / 41.94222222 N — en-Wikipedia "Bachkovo Monastery"
    laudat: {
      maailmankartta: { x: 6661.6, y: 1725.9 },
      europe: { x: 688.3, y: 790.5 },
    },
    teksti: 'Bachkovon luostari on iso ortodoksinen luostari Etelä-Bulgariassa Chepelare-joen '
      + 'oikealla rannalla, 189 kilometriä Sofiasta ja 10 kilometriä Asenovgradista etelään. '
      + 'Sen perusti vuonna 1083 georgialainen valtiomies ja Bysantin palveluksessa ollut '
      + 'sotapäällikkö Gregory Pakourianos, ja siitä tuli yksi ulkomaisista georgialaisista '
      + 'luostarikeskuksista; luostari on tunnettu georgialaisen, bysanttilaisen ja '
      + 'bulgarialaisen kulttuurin yhdistelmästä. Toisen Bulgarian valtakunnan aikana sitä '
      + 'tuki tsaari Ivan Aleksandar. Turkkilaisten ryöstämä ja tuhoama luostari '
      + 'kunnostettiin 1400-luvun lopulla, ja Neitsyt Marian kirkko valmistui vuonna 1604. '
      + 'Ainoa alkuperäinen rakennus on luuhuone, joka on noin 300 metrin päässä nykyisestä '
      + 'luostarista.',
    lahde: 'en-Wikipedia "Bachkovo Monastery", johdanto-osa ja osiot "History" ja "Complex" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kuka perusti Bachkovon luostarin vuonna 1083?',
      vaihtoehdot: [
        'Bulgarialainen tsaari',
        'Georgialainen valtiomies',
        'Serbialainen ruhtinas',
        'Venetsialainen doge',
      ],
      oikea: 1,
      fakta: 'Luostarin ainoa alkuperäinen rakennus on luuhuone noin 300 metrin päässä nykyisestä '
        + 'luostarista.',
    },
  },
  {
    id: 'hahmotelma-lovech',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-lovech-8913bdc8.jpg',
      lyhyt: 'Lovetšin katettu silta Osămjoen yllä iltavalossa.',
      selite: 'Puurakenteinen, vihertävällä metallikatolla katettu silta kulkee kivipilareiden varassa joen yli. Taustalla nousee metsäinen kallioinen rinne, ja silta heijastuu veteen.',
      lahde: 'Valokuva: Klearchos Kapoutsis, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Klearchos Kapoutsis',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lovech_Bridge_Klearchos.jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-lovech-80203ab4.jpg',
        lyhyt: 'Hisarin linnoituksen kiviset muurinpohjat Lovetšin kukkulalla.',
        selite: 'Kuvassa on kuivamuurattuja kiviseiniä ja laatoitettuja lattioita linnoituksen alueella. Kuvan otsikko liittää paikan Varoshan ja Hissaryan linnoituksen alueeseen.',
        lahde: 'Valokuva: Камен Ханджиев, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Камен Ханджиев',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lovech_Province_-_Lovech_Municipality_-_Town_of_Lovech_-_Ethnographic_complex_Varosha_-_Hissarya_Fortress_(7).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-lovech-187b92b1.jpg',
        lyhyt: 'Talvinen katunäkymä Varoshan vanhastakaupungista kirkkoineen.',
        selite: 'Lumisen kivikadun päässä on kaari, portaat ja kirkon tornit. Kukkulalla siintää patsas, jonka kuvateksti kertoo olevan Vasil Levskin muistomerkki.',
        lahde: 'Valokuva: Svilen Enev, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Svilen Enev',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Varosha_Lovech_Church.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Lovech',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka rakensi Lovechin katetun sillan?',
      'Minä vuonna toisen Bulgarian valtakunnan alku julistettiin Hisaryassa?',
    ],
    korostukset: ['katetun sillan|katetun sillan'],
    nappi: 'Levskin vallankumouskomitean keskus; Kolyu Ficheto rakentaa parhaillaan katettua siltaa (1872–1874)',
    // 24.71722222 E / 43.13472222 N — en-Wikipedia "Lovech"
    laudat: {
      maailmankartta: { x: 6657.2, y: 1677.9 },
      europe: { x: 685.8, y: 759.2 },
    },
    teksti: 'Lovech on kaupunki Pohjois-Keski-Bulgariassa noin 150 kilometriä Sofiasta koilliseen '
      + 'Osam-joen molemmin puolin. Kaupunki on yksi Bulgarian vanhimmista: sen ensimmäiset '
      + 'asukkaat olivat traakialainen meldi-heimo, jonka pääkaupunki Melta oli nykyisen '
      + 'Varosha-kaupunginosan paikalla. Vuonna 1187 entisessä roomalaisessa '
      + 'Hisarya-linnoituksessa allekirjoitettiin rauhansopimus Bulgarian ja Bysantin '
      + 'välillä, mikä merkitsi toisen Bulgarian valtakunnan alkua. Osmanien vallan aikana '
      + 'Lovech oli Vasil Levskin sisäisen vallankumousjärjestön toiminnan keskus, ja '
      + 'vanhassakaupungissa on Bulgarian suurin Levskin museo. Vuosina 1872–1874 '
      + 'mestarirakentaja Nikola Fichev eli Kolyu Ficheto rakensi kuuluisan katetun sillan '
      + 'Osam-joen yli, ainoan laatuaan Balkanilla; se paloi vuonna 1925 ja rakennettiin '
      + 'uudelleen 1931.',
    lahde: 'en-Wikipedia "Lovech", johdanto-osa ja osiot "Ancient history", "Middle Ages" ja '
      + '"Ottoman rule" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kuka rakensi Lovechin kuuluisan katetun sillan Osam-joen yli vuosina 1872–1874?',
      vaihtoehdot: [
        'Vasil Levski',
        'Dobri Zhelyazkov',
        'Hadzhi Nencho',
        'Kolyu Ficheto',
      ],
      oikea: 3,
      fakta: 'Silta on ainoa laatuaan Balkanilla.',
    },
  },
  {
    id: 'hahmotelma-pleven',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-pleven-ea5fccd1.jpg',
      lyhyt: 'Plevenin vapauden panoraama-muistomerkin sylinterimäinen betonirakennus.',
      selite: 'Rakennuksen keskellä on kaksi korkeaa punaruskeaa pilaria ja pyöreä runko, jossa on vaakasuuntaisia vyöhykkeitä. Rakennus seisoo puistomaisella kukkulalla.',
      lahde: 'Kuva: Vassia Atanassova - Spiritia, Wikimedia Commons (public domain).',
      tekija: 'Vassia Atanassova - Spiritia',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pleven-Panorama-outside.JPG',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-pleven-c3f21c42.jpg',
        lyhyt: 'Plevenin punainen kaupungintalo torneineen aukion laidalla.',
        selite: 'Kaupungintalon punainen julkisivu ja kellotorni kohoavat aukion yläpuolelle, ja edessä kävelee muutama ihminen. Aukion reunalla on lipputankoja.',
        lahde: 'Valokuva: Todor Bozhinov, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Todor Bozhinov',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pleven_Town_Hall_Todor_Bozhinov.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-pleven-af93cf9f.jpg',
        lyhyt: 'Kivetty polku johtaa puiston läpi panoraamarakennukselle.',
        selite: 'Suora kivetty käytävä kulkee puiden reunustamana kohti panoraamarakennusta, ja polun varrella on penkkejä.',
        lahde: 'Valokuva: Спасимир, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Спасимир',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pleven-Panorama_2010.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Pleven',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna Osman Pasha antautui Plevnassa?',
      'Missä puistossa Plevenin panoraama on?',
    ],
    korostukset: ['piiritys|piirityksestä'],
    nappi: 'Levskin ensimmäisen vallankumouskomitean kaupunki; piiritys alkaa vasta muutaman vuoden kuluttua',
    // 24.62027778 E / 43.40777778 N — en-Wikipedia "Pleven"
    laudat: {
      maailmankartta: { x: 6654, y: 1666.9 },
      europe: { x: 683.9, y: 752 },
    },
    teksti: 'Pleven on Bulgarian seitsemänneksi väkirikkain kaupunki Pohjois-Bulgariassa Tonavan '
      + 'tasangolla, ja sen asukasluku oli 89 823 vuonna 2021. Osmanien vallan aikana Pleven '
      + 'säilytti bulgarialaisen luonteensa: ensimmäinen maallinen koulu avattiin vuonna '
      + '1825, ensimmäinen tyttökoulu Bulgariassa 1840 ja poikakoulu vuotta myöhemmin. Vasil '
      + 'Levski perusti Plevenissä vuonna 1869 ensimmäisen vallankumouskomiteansa osana '
      + 'kansallista verkostoaan. Kaupunki tunnetaan kansainvälisesti Plevnan piirityksestä '
      + 'Venäjän ja Turkin sodassa 1877–1878, joka oli yksi sodan ratkaisevista taisteluista; '
      + 'Osman Pasha antautui 28. marraskuuta 1877. Skobelevin puistossa on piirityksen '
      + 'muistoksi rakennettu Plevenin panoraama sekä ossuaari ja mausoleumi kaatuneille '
      + 'venäläisille ja romanialaisille sotilaille.',
    lahde: 'en-Wikipedia "Pleven", johdanto-osa ja osiot "Geography", "Ottoman rule" ja "Siege '
      + 'of Plevna" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-nikopol',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-nikopol-83f47ecc.jpg',
      lyhyt: 'Nikopolin kaupunki ja leveä Tonava linnoitusmäeltä nähtynä.',
      selite: 'Näkymä linnoituksen puolelta Nikopolin kattojen yli Tonavalle ja joen toiselle rannalle. Kuva on otettu syyskuussa 2007.',
      lahde: 'Kuva: tekijä tuntematon (julkaisija PD-self), Wikimedia Commons (public domain).',
      tekija: 'tekijä tuntematon (julkaisija PD-self)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nikopolview.JPG',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-nikopol-64d894a3.jpg',
        lyhyt: 'Nikopol Felix Kanitzin maalauksessa.',
        selite: 'Felix Kanitzin maalaama näkymä Nikopolista: talojen kattoja, rinne ja korkealla mäellä torni, taustalla Tonava.',
        lahde: 'Maalaus: Felix Philipp Kanitz, Wikimedia Commons (public domain).',
        tekija: 'Felix Philipp Kanitz',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nikopol_by_Felix_Kanitz.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Nikopol',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna Nikopolin ristiretken taistelu käytiin?',
      'Kuka oli Bulgarian viimeinen tsaari, joka puolusti Nikopolia?',
    ],
    korostukset: ['ristiretki|ristiretken'],
    nappi: 'Tonavan linnoituskaupunki, jonka venäläiset valtaavat vasta muutaman vuoden kuluttua',
    // 24.9 E / 43.7 N — en-Wikipedia "Nikopol, Bulgaria"
    laudat: {
      maailmankartta: { x: 6663.3, y: 1655 },
      europe: { x: 689.3, y: 744.3 },
    },
    teksti: 'Nikopol on kaupunki Pohjois-Bulgariassa Tonavan oikealla rannalla neljä kilometriä '
      + 'alavirtaan Osamin yhtymäkohdasta jyrkkien liitukallioiden juurella. Roomalaiset '
      + 'rakensivat siellä 1. vuosisadalla linnakkeen osaksi Tonavan puolustusjärjestelmää, '
      + 'ja kaupunki sai nimen Nicopolis eli voiton kaupunki vuonna 1059. Toisen Bulgarian '
      + 'valtakunnan viimeinen tsaari Ivan Shishman puolusti Nikopolin linnoitusta, kunnes '
      + 'ottomaanit valtasivat sen vuonna 1395, ja vuonna 1396 siellä käytiin keskiajan '
      + 'viimeisen suuren ristiretken taistelu, jossa Unkarin kuningas Sigismundin johtama '
      + 'kristillinen Euroopan armeija kärsi tappion Bayezid I:n joukoille. Osmanien aikana '
      + 'Nikopol kehittyi tärkeäksi sotilaalliseksi ja hallinnolliseksi keskukseksi, mutta '
      + 'Pleven ohitti sen alueen keskuksena 1600–1700-luvuilla; venäläiset valtasivat '
      + 'kaupungin vuonna 1877.',
    lahde: 'en-Wikipedia "Nikopol, Bulgaria", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-vidin',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-vidin-dfa5bc0c.jpg',
      lyhyt: 'Baba Vidan linnoituksen tornit ja muurit Vidinissä.',
      selite: 'Baba Vidan keskiaikainen linnoitus Vidinissä Luoteis-Bulgariassa: kaksi kivitornia ja ympäröivä muuri.',
      lahde: 'Valokuva: Erik Cleves Kristensen, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Erik Cleves Kristensen',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Baba_Vida_Castle_(27379217451).jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-vidin-defe3760.jpg',
        lyhyt: 'Baba Vidan sisäpihan muureja, portaita ja tornin kulmaa.',
        selite: 'Baba Vida -linnoituksen sisäpuolelta: kivi- ja tiilimuureja, portaat ja kellotornimainen torni.',
        lahde: 'Valokuva: Elena Chochkova, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Elena Chochkova',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Baba_Vida_E10.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Baba Vida',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minkä kuninkaantyttären legendan mukaan Baba Vida on nimetty?',
      'Kuinka pitkän piirityksen linnoitus kesti Basileios II:n aikana?',
    ],
    korostukset: ['linnoitus|linnoitus'],
    nappi: 'Tonavan keskiaikainen linnoitus, jota Osmanit ovat käyttäneet asevarastona ja vankilana',
    // 22.88666667 E / 43.99305556 N — en-Wikipedia "Baba Vida"
    laudat: {
      maailmankartta: { x: 6596.2, y: 1643.1 },
      europe: { x: 650.6, y: 736.6 },
    },
    teksti: 'Baba Vida on keskiaikainen linnoitus Vidinissä Luoteis-Bulgariassa Tonavan rannalla '
      + 'ja kaupungin tärkein maamerkki. Siinä on kaksi sisäkkäistä suojamuuria ja noin '
      + 'yhdeksän tornia, joista kolme on säilynyt täyteen keskiaikaiseen korkeuteensa, ja se '
      + 'on maan ainoa kokonaan säilynyt keskiaikainen linnoitus. Rakentaminen alkoi '
      + '900-luvulla muinaisen roomalaisen Bononian linnakkeen paikalla, ja legendan mukaan '
      + 'sen rakennutti kuninkaan vanhin tytär Vida, joka jäi naimattomaksi; nimi tarkoittaa '
      + 'mummo Vidaa. Linnoitus kesti Bysantin keisari Basileios II:n johtaman kahdeksan '
      + 'kuukauden piirityksen, ja tsaari Ivan Stratsimirin aikana 1356–1396 se oli hänen '
      + 'pääkaupunkinsa. Osmanien aikana sitä käytettiin asevarastona ja vankilana, eikä sitä '
      + 'ole käytetty puolustukseen 1700-luvun lopun jälkeen; nykyään siellä on museo.',
    lahde: 'en-Wikipedia "Baba Vida", koko artikkeli (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä kuninkaantyttären legendan mukaan rakennutti Baba Vidan linnoituksen?',
      vaihtoehdot: [
        'Vidan',
        'Kulan',
        'Gamzan',
        'Radan',
      ],
      oikea: 0,
      fakta: 'Linnoitus kesti Basileios II:n johtaman kahdeksan kuukauden piirityksen.',
    },
  },
  {
    id: 'hahmotelma-stara-zagora',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-stara-zagora-d61e0352.jpg',
      lyhyt: 'Augusta Trajanan roomalaisen kaupungin katu ja rakennusten perustuksia Stara Zagorassa.',
      selite: 'Stara Zagoran keskustassa on säilynyt roomalaisajan Augusta Trajanan kadun pätkä ja rakennusten kivisiä perustuksia nykykaupungin keskellä.',
      lahde: 'Valokuva: Rjdeadly, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Rjdeadly',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Main_street_Augusta_Traiana.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-stara-zagora-3f3d7168.jpg',
        lyhyt: 'Antiikin forumin pylväitä ja kaari valaistuna hämärässä.',
        selite: 'Stara Zagoran antiikin forumin (Augusta Trayana) pylväät ja kaariaukko on valaistu värivaloin illan hämärtyessä.',
        lahde: 'Valokuva: LZ1ALT, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'LZ1ALT',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Antique_Forum_Augusta_Trayana_in_Stara_Zagora_Bulgaria.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-stara-zagora-99ff32d8.jpg',
        lyhyt: 'Ilmakuva Stara Zagoran keskustasta ja ympäröivästä tasangosta.',
        selite: 'Näkymä ylhäältä Stara Zagoran keskustaan: puiden ympäröimiä kerrostaloja ja kaupungin takana avautuva tasanko sekä kukkulat.',
        lahde: 'Valokuva: Balkanregion, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Balkanregion',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stara_zagora_panorama_bg.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Stara Zagora',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna Stara Zagorasta löydettiin neoliittiset asuinrakennukset?',
      'Millä nimellä roomalaiset kutsuivat kaupunkia?',
    ],
    korostukset: ['neoliittinen|neoliittisia'],
    nappi: 'Eski Zagra: kaupunki, jonka nimeksi vahvistettiin Stara Zagora vasta vuonna 1871',
    // 25.63444444 E / 42.42555556 N — en-Wikipedia "Stara Zagora"
    laudat: {
      maailmankartta: { x: 6687.8, y: 1706.5 },
      europe: { x: 703.4, y: 777.8 },
    },
    teksti: 'Stara Zagora on Bulgarian viidenneksi suurin kaupunki Ylä-Traakian tasangolla '
      + 'lähellä Kazanlakia, Plovdivia ja Slivenia; sen asukasluku on 121 582. Vuonna 1968 '
      + 'kaupungista löydettiin 6. vuosituhannen puolivälistä eaa. peräisin olevia '
      + 'neoliittisia asuinrakennuksia, jotka ovat Euroopan parhaiten säilynyt ja rikkain '
      + 'laatuaan ja jotka on muutettu museoksi. Alueelta on löydetty myös yli 7 000 vuotta '
      + 'vanha Euroopan ensimmäinen kuparitehdas ja suuri malmin louhintakeskus. Roomalaisten '
      + 'aikana kaupunki nimettiin Ulpia Augusta Traianaksi, ja se oli merkittävämpi kuin '
      + 'Philippopolis. Nykyinen nimi on peräisin turkkilaisesta nimestä Eski Zagra, vanha '
      + 'Zagra, joka vahvistettiin vuonna 1871.',
    lahde: 'en-Wikipedia "Stara Zagora", johdanto-osa ja osio "Name" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Millä turkkilaisella nimellä Stara Zagoraa kutsuttiin ennen nykyisen nimen '
        + 'vahvistamista vuonna 1871?',
      vaihtoehdot: [
        'Beroe',
        'Eski Zagra',
        'Borui',
        'Irenopolis',
      ],
      oikea: 1,
      fakta: 'Vuonna 1968 löydetyt neoliittiset asuinrakennukset ovat Euroopan parhaiten '
        + 'säilyneitä.',
    },
  },
  {
    id: 'hahmotelma-kyustendil',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-kyustendil-a2153af7.jpg',
      lyhyt: 'Kyustendilin kaupunki laaksossa ja Konyavan vuori taustalla.',
      selite: 'Näkymä kaukaa Kyustendilin kaupunkiin, joka levittäytyy laaksoon vuorten ja metsäisten rinteiden välissä.',
      lahde: 'Valokuva: Vassia Atanassova - Spiritia, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Vassia Atanassova - Spiritia',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kyustendil-view-and-Konyavska-mountain.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-kyustendil-a366b57a.jpg',
        lyhyt: 'Kyustendilin punainen kaupungintalo aukion laidalla.',
        selite: 'Kyustendilin kaupungintalo on punaiseksi rapattu, vihreäkattoinen rakennus, jonka sivulla kulkee muutama jalankulkija.',
        lahde: 'Valokuva: MrPanyGoff, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'MrPanyGoff',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kyustendil_Town_Hall.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-kyustendil-cc9a6a9b.jpg',
        lyhyt: 'Roomalaisen kylpylän tiili- ja kivimuureja Kyustendilin keskustassa.',
        selite: 'Kyustendilin roomalaisen kylpyläkompleksin (thermae) säilyneitä kivi- ja tiilimuureja, joissa on kaarevia aukkoja, kaupunkikuvan keskellä.',
        lahde: 'Valokuva: Спасимир, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Спасимир',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Roman_thermae_complex_(Kyustendil)_08.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Kyustendil',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Millä nimellä kaupunkia kutsuttiin antiikissa?',
      'Kuinka monta kivennäislähdettä kaupungissa on?',
    ],
    korostukset: ['kivennäislähde|kivennäislähdettä'],
    nappi: 'Köstendil: Osmanien lämpölähteiden ja hedelmätarhojen kaupunki Osogovon juurella',
    // 22.68333333 E / 42.28333333 N — en-Wikipedia "Kyustendil"
    laudat: {
      maailmankartta: { x: 6589.4, y: 1712.2 },
      europe: { x: 646.7, y: 781.5 },
    },
    teksti: 'Kyustendil on kaupunki Bulgarian äärilännessä Kyustendilin laakson eteläosassa '
      + 'lähellä Serbian ja Pohjois-Makedonian rajoja, 90 kilometriä Sofiasta lounaaseen; '
      + 'asukkaita on 37 799. Traakialainen asutus perustettiin paikalle 400- tai 500-luvulla '
      + 'eaa., ja se oli tunnettu Asklepioksen pyhäköstä; Pautalia-nimisenä se oli Rooman '
      + 'aikana Dacia Mediterranean kolmanneksi suurin kaupunki. Roomalainen linnoitus oli '
      + 'yli 29 hehtaarin kokoinen, ja alueelta on löydetty kylpylöitä, basilikoja ja '
      + 'lattiamosaiikkeja. Nykyään Kyustendil on kansallinen kylpyläkaupunki 600 metrin '
      + 'korkeudessa: siellä on yli 40 kivennäislähdettä, ja kaupunki on Osogovon vuoren '
      + 'juurella tunnettu balneologian ja hedelmänviljelyn keskus. Ottomaanit liittivät '
      + 'kaupungin valtakuntaansa vuonna 1395.',
    lahde: 'en-Wikipedia "Kyustendil", johdanto-osa ja osiot "History" ja "Geography" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-ruse',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-ruse-b723241f.jpg',
      lyhyt: 'Rusen Tonavan satama, nosturit ja proomut joen rannalla.',
      selite: 'Rusen satama Tonavan varrella: sinisiä satamanostureita, proomuja ja laitureita, taustalla savupiippuja. Kuva on otettu 27.5.2016.',
      lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Diego Delso',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Puerto_de_Ruse,_Bulgaria,_2016-05-27,_DD_06.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-ruse-2292912c.jpg',
        lyhyt: 'Ystävyyden silta Tonavan yllä, silta Rusen ja Giurgiun välillä.',
        selite: 'Ystävyyden sillan (nykyisin myös Tonavan silta) tieosuus lyhtypylväineen, vasemmalla näkyy Tonavaa ja satamanosturi.',
        lahde: 'Valokuva: Tiia Monto, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Tiia Monto',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Friendship_Bridge_2.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-ruse-6d1d26e5.jpg',
        lyhyt: 'Ruse ja sen satama Tonavan rannalla Felix Kanitzin maalauksessa.',
        selite: 'Felix Kanitzin maalaama historiallinen näkymä Rusen satamasta: rantakatu, talot ja minareettitorneja mäen rinteellä sekä höyrylaivoja ja proomuja Tonavalla.',
        lahde: 'Maalaus: Felix Philipp Kanitz, Wikimedia Commons (public domain).',
        tekija: 'Felix Philipp Kanitz',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ruse_port_by_Felix_Kanitz.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Ruse',
    tyyppi: 'merenkulku',
    lahi: true,
    kysymykset: [
      'Minä vuonna Rusen ja Varnan yhdistävä rautatie otettiin käyttöön?',
      'Mikä on Rusen lempinimi?',
    ],
    korostukset: ['jokisatama|jokisatama'],
    nappi: 'Tuna-vilajetin hallintokeskus; Tonavan kaupunki, jossa maan ensimmäinen rautatie avataan vuonna 1867',
    // 25.95388889 E / 43.82305556 N — en-Wikipedia "Ruse, Bulgaria"
    laudat: {
      maailmankartta: { x: 6698.5, y: 1650 },
      europe: { x: 709.5, y: 741.1 },
    },
    teksti: 'Ruse on Bulgarian kuudenneksi suurin kaupunki Tonavan oikealla rannalla Romanian '
      + 'Giurgiun vastapäätä. Sijaintinsa ja Tonavan ylittävän rautatie- ja maantiesillan '
      + 'ansiosta se on Bulgarian tärkein jokisatama, jonka kautta kulkee suuri osa maan '
      + 'kansainvälisestä kaupasta. Osmanien aikana Rusçuk kasvoi yhdeksi valtakunnan '
      + 'tärkeimmistä Tonavan kaupungeista ja Tuna-vilajetin hallintokeskukseksi, joka '
      + 'ulottui Varnasta ja Tulceasta Sofiaan ja Nišiin. Ruse tunnetaan monista Bulgarian '
      + 'ensimmäisistä: vuonna 1864 perustettiin maan ensimmäinen painotalo ja vuonna 1867 '
      + 'otettiin käyttöön Rusen ja Varnan yhdistävä ensimmäinen rautatie. Kaupungin 1800- ja '
      + '1900-lukujen uusbarokki- ja uusrokokoo-arkkitehtuuri on saanut sille lempinimen '
      + 'Pikku-Wien.',
    lahde: 'en-Wikipedia "Ruse, Bulgaria", johdanto-osa ja osio "Ottoman rule" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Rusen ja Varnan yhdistävä ensimmäinen rautatie otettiin käyttöön?',
      vaihtoehdot: [
        '1867',
        '1877',
        '1887',
        '1857',
      ],
      oikea: 0,
      fakta: 'Ruseen perustettiin Bulgarian ensimmäinen painotalo vuonna 1864.',
    },
  },
  {
    id: 'hahmotelma-svishtov',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-svishtov-98c841d6.jpg',
      lyhyt: 'Svishtov ja Tonava vuoden 1824 litografiassa.',
      selite: 'Vanha litografia esittää Svishtovin kaupunkia rinteellä Tonavan rannalla, purjeveneitä joella ja linnoitusta kukkulan huipulla. Kuvan mukaan alkuperäisen piirroksen on tehnyt Erminy ja litografian Adolph Kunike.',
      lahde: 'Kaiverrus: Erminy (piirros), Adolph Kunike (litografia), Wikimedia Commons (public domain).',
      tekija: 'Erminy (piirros), Adolph Kunike (litografia)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Svishtov_panoramic_1824.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-svishtov-9a2d1bdf.jpg',
        lyhyt: 'Svishtovin etnografisen museon vanha kivitalo kivetyllä kadulla.',
        selite: 'Kivestä ja valkoisesta erkkeri-ikkunasta tunnistettava vanha rakennus, jossa Svishtovin etnografinen museo toimii. Talo seisoo mukulakivikadun varrella.',
        lahde: 'Valokuva: Powerfox, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Powerfox',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ethnographic_museum_in_Svishtov,Bulgaria.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Svishtov',
    tyyppi: 'merenkulku',
    lahi: true,
    kysymykset: [
      'Mitä Svishtovin vanha nimi Sveshtniy tarkoittaa?',
      'Minä vuonna Sistovan rauha solmittiin?',
    ],
    korostukset: ['satama|satamista'],
    nappi: 'Tonavan satamakaupunki, jossa vauraat asukkaat perustavat kouluja',
    // 25.35 E / 43.61666667 N — en-Wikipedia "Svishtov"
    laudat: {
      maailmankartta: { x: 6678.3, y: 1658.4 },
      europe: { x: 697.9, y: 746.5 },
    },
    teksti: 'Svishtov on kaupunki Pohjois-Bulgariassa Tonavan oikealla rannalla Romanian '
      + 'Zimnicean vastapäätä; Veliko Tarnovon läänissä se on läänin toiseksi suurin '
      + 'kaupunki. Nimi tulee vanhasta bulgarian sanasta svesht eli kynttilä, koska '
      + 'kaupungissa oli majakka; Sistova-nimi mainittiin ensi kerran vuoden 1791 '
      + 'rauhansopimuksessa, joka päätti Itävallan ja Turkin viimeisen sodan. Kaupunki '
      + 'tunnistetaan roomalaiseksi siirtokunnaksi Novaeksi, jonka Vespasianus lähetti '
      + 'legioona I Italican tukikohdaksi vuonna 70. Kaupunki poltettiin poroksi vuosina 1810 '
      + 'ja 1829, mutta se rakennettiin nopeasti uudelleen, ja siitä tuli yksi Tonavan '
      + 'tärkeimmistä satamista sekä koulutuksen kotipaikka, jossa perustettiin ensimmäinen '
      + 'kauppa-ammattikoulu. Svishtov oli Venäjän ja Turkin sodan 1877–1878 ensimmäinen '
      + 'vapautettu kaupunki.',
    lahde: 'en-Wikipedia "Svishtov", johdanto-osa ja osiot "Name" ja "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-melnik',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-melnik-74e64159.jpg',
      lyhyt: 'Melnikin hiekkakivipyramidit kohoavat kaupungin yläpuolella.',
      selite: 'Vaaleiden hiekkakivikallioiden jyrkät, uurteiset seinämät nousevat vehreiden rinteiden yllä. Alhaalla vasemmalla näkyy Melnikin vanhoja taloja.',
      lahde: 'Valokuva: Vislupus, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Vislupus',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Melnik_005.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-melnik-251b7a18.jpg',
        lyhyt: 'Melnikin vanha valkoinen talo ja hiekkakivikalliot taustalla.',
        selite: 'Perinteinen kaksikerroksinen talo savupiippuineen ja viiniköynnösten peittämä kiviaita, taustalla hiekkakivipyramidien muodostama rinne.',
        lahde: 'Valokuva: StefkaVasileva, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'StefkaVasileva',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_town_of_Melnik.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-melnik-733aef8a.jpg',
        lyhyt: 'Melnikin punakattoisia taloja laaksossa metsäisten rinteiden keskellä.',
        selite: 'Näkymä alas Melnikin vanhaan kaupunkiin: punaiset laattakatot ryhmittyvät pienen laakson pohjalle, ja taustalla häämöttävät vaaleat hiekkakivijyrkänteet.',
        lahde: 'Valokuva: Vislupus, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Vislupus',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Melnik_002.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Melnik',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Mikä on Bulgarian pienin kaupunki?',
      'Minkä sanan mukaan Melnik on nimetty?',
    ],
    korostukset: ['hiekkapyramidit|hiekkapyramidit'],
    nappi: 'Osmanien Menlik: tupakka- ja viinikauppiaiden kaupunki, jonka viini menee Englantiin ja Itävaltaan',
    // 23.4 E / 41.51666667 N — en-Wikipedia "Melnik, Bulgaria"
    laudat: {
      maailmankartta: { x: 6613.3, y: 1742.9 },
      europe: { x: 660.5, y: 801.7 },
    },
    teksti: 'Melnik on kaupunki Blagoevgradin läänissä Lounais-Bulgariassa Pirin-vuorten '
      + 'lounaisosassa noin 440 metrin korkeudessa. Se on arkkitehtuurisuojelualue, jossa 96 '
      + 'rakennusta on kulttuurimuistomerkkejä, ja kaupungin yllä kohoavat Melnikin '
      + 'hiekkapyramidit. Asukkaita on 385, joten se on Bulgarian pienin kaupunki, joka on '
      + 'säilyttänyt kaupunkiasemansa historiallisista syistä. Nimi tulee slaaveilta, jotka '
      + 'nimesivät asutuksen ympäröivien hiekkamuodostelmien mukaan sanasta mel eli valkoinen '
      + 'savi. Bulgarian kansallisen herätyksen aikana 1600–1700-luvuilla Melnik kukoisti '
      + 'tupakan ja viinin tuotannolla, ja viiniä vietiin ulkomaille lähinnä Englantiin ja '
      + 'Itävaltaan; 1700-luvun lopulla kaupungissa oli 1 300 taloa ja seitsemänkymmentä '
      + 'kirkkoa, mutta suuri tulipalo tuhosi sen.',
    lahde: 'en-Wikipedia "Melnik, Bulgaria", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Mikä on Bulgarian pienin kaupunki?',
      vaihtoehdot: [
        'Koprivshtitsa',
        'Bansko',
        'Sozopol',
        'Melnik',
      ],
      oikea: 3,
      fakta: 'Kaupungin viiniä vietiin ulkomaille lähinnä Englantiin ja Itävaltaan.',
    },
  },
  {
    id: 'hahmotelma-karlovo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-karlovo-d19e44b9.jpg',
      lyhyt: 'Karlovon vanhan kaupungin mukulakivikatu ja sininen kellotorni.',
      selite: 'Kapea mukulakivikatu kulkee valkeiksi rapattujen vanhojen talojen välissä, ja taustalla kohoaa sinisen kirkon kellotorni.',
      lahde: 'Valokuva: TodorBelomorski, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'TodorBelomorski',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Karlovo_Old_Town,_Старият_град_Карлово_2012.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-karlovo-5e708c30.jpg',
        lyhyt: 'Karlovon Pyhän Nikolaoksen kirkko ja kellotorni vuoren juurella.',
        selite: 'Vaaleanpunainen, kaarikäytävällä varustettu kirkko ja erillinen kellotorni seisovat kiveyksellä, taustalla vuorten rinteitä.',
        lahde: 'Valokuva: MrPanyGoff, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'MrPanyGoff',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:St_Nicholas_Church_-_Karlovo.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Karlovo',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Minkä tuotteen valmistuksesta Karlovo on kuuluisa?',
      'Minä vuonna Karlovon ensimmäinen chitalishte avattiin?',
    ],
    korostukset: ['ruusuöljy|ruusuöljystään'],
    nappi: 'Vasil Levskin syntymäkaupunki ja ruusuöljyn kaupunki; Levski teloitettiin Sofiassa helmikuussa 1873',
    // 24.80722222 E / 42.64361111 N — en-Wikipedia "Karlovo"
    laudat: {
      maailmankartta: { x: 6660.2, y: 1697.7 },
      europe: { x: 687.5, y: 772.1 },
    },
    teksti: 'Karlovo on historiallisesti tärkeä kaupunki Keski-Bulgariassa Stryama-joen '
      + 'hedelmällisessä laaksossa Balkanvuorten eteläjuurella; asukkaita on noin 19 373 '
      + '(2021). Se on kuuluisa ruusuöljystään, jota käytetään hajuvesien valmistuksessa. '
      + 'Karlovo on myös Vasil Levskin, kansallisen vapautuksen valmistelun tunnetuimman '
      + 'edelläkävijän, syntymäkaupunki, ja siellä on hänelle omistettu museo ja suuri '
      + 'muistomerkki. Nykyinen kaupunki syntyi vuonna 1483 Sushitsan kylän paikalle '
      + 'sulttaani Bayezid II:n aikana ja sai nimen Karlıova; vanhin säilynyt rakennus on '
      + 'vuodelta 1485 oleva Kurshum-moskeija eli lyijymoskeija. 1800-luvulla kaupungista '
      + 'tuli bulgarialaisen kulttuurin ja vallankumoustoiminnan keskus, ja ensimmäinen '
      + 'chitalishte eli lukusali avattiin vuonna 1869.',
    lahde: 'en-Wikipedia "Karlovo", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-sliven',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-sliven-5fa8d03b.jpg',
      lyhyt: 'Sliven ja Sinite Kamani -kalliot Kanitzin 1800-luvun akvarellissa.',
      selite: 'Felix Kanitzin maalaus esittää Slivenin kaupunkia laakson pohjalla ja sen takana kohoavia vuoria, joihin Sinite Kamani -kalliot kuuluvat.',
      lahde: 'Maalaus: Felix Philipp Kanitz, Wikimedia Commons (public domain).',
      tekija: 'Felix Philipp Kanitz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sliven_and_Sinite_kamani_by_Felix_Kanitz.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-sliven-a540a408.jpg',
        lyhyt: 'Sliven Karandilan kallioilta katsottuna.',
        selite: 'Kuvassa näkyy Slivenin kaupunki ja Ylä-Traakian tasangon itäosa Balkanvuoriston eteläpuolelta, kallioinen reunus etualalla.',
        lahde: 'Valokuva: Evgeni Dinev, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Evgeni Dinev',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sliven_From_Karandila.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Sliven',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Kuka perusti vuonna 1834 Bulgarian maiden ensimmäisen tehtaan?',
      'Millä lempinimellä Slivenia kutsutaan?',
    ],
    korostukset: ['tehdas|tehtaan'],
    nappi: 'Sadan vojvodan kaupunki, jossa Bulgarian ensimmäiset tehtaat ovat jo toiminnassa',
    // 26.33333333 E / 42.68333333 N — en-Wikipedia "Sliven"
    laudat: {
      maailmankartta: { x: 6711.1, y: 1696.1 },
      europe: { x: 716.8, y: 771 },
    },
    teksti: 'Sliven on Bulgarian kahdeksanneksi suurin kaupunki Pohjois-Traakiassa Balkanvuorten '
      + 'juurella Slivenin laaksossa. Se on kuuluisa haidukeistaan, jotka taistelivat '
      + 'osmaneja vastaan 1800-luvulla, ja sitä kutsutaan sadan vojvodan kaupungiksi; '
      + 'kaupungin läheisyydessä on Sinite kamani -kalliomassiivi eli Siniset kalliot ja '
      + 'siihen liittyvä luonnonpuisto sekä Slivenin mineraalikylpylät. Talous on ollut '
      + 'teollisuuden varassa 1800-luvun alusta: vuonna 1834 Dobri Zhelyazkov perusti '
      + 'ensimmäisen tehtaan Bulgarian maissa, ja vuonna 1843 kaupunkiin perustettiin '
      + 'Osmanien valtakunnan ensimmäinen tekstiiliteollisuusyritys. Vuonna 1872 Slivenissä '
      + 'perustettiin lisäksi tupakka- ja väkijuomatehtaat, ja kaupungin hiippakunta kuului '
      + 'Bulgarian eksarkaattiin, joka perustettiin 28. helmikuuta 1870.',
    lahde: 'en-Wikipedia "Sliven", johdanto-osa ja osiot "Economy" ja "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Dobri Zhelyazkov perusti Slivenin ensimmäisen tehtaan Bulgarian maissa?',
      vaihtoehdot: [
        '1794',
        '1814',
        '1834',
        '1854',
      ],
      oikea: 2,
      fakta: 'Vuonna 1843 Slivenissä perustettiin Osmanien valtakunnan ensimmäinen '
        + 'tekstiiliteollisuusyritys.',
    },
  },
  {
    id: 'hahmotelma-balchik',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-balchik-725098bd.jpg',
      lyhyt: 'Balchikin satama ja valkoiset rantakalliot ilmasta.',
      selite: 'Ilmakuva Mustaltamereltä: satamalaituri, punakattoinen kaupunki rinteellä ja valkoiset kalkkikivikalliot rannikolla.',
      lahde: 'Valokuva: Boby Dimitrov from Sofia, Bulgaria, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Boby Dimitrov from Sofia, Bulgaria',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Balchik_Bulgaria_aerial_photo_from_the_Black_Sea.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-balchik-2bfc72b5.jpg',
        lyhyt: 'Balchikin palatsin valkoinen päärakennus minareettitorneineen meren rannalla.',
        selite: 'Balchikin palatsin rakennus, jossa on tiilikatto, puukuisti ja kapea torni, ja vasemmalla siintää Musta meri.',
        lahde: 'Kuva: Izvora, Wikimedia Commons (public domain).',
        tekija: 'Izvora',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Balchik_Palace_2.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bgr-nosto-balchik-7d2fadbf.jpg',
        lyhyt: 'Balchikin botaanisen puutarhan kukkapenkkejä ja kivetty käytävä.',
        selite: 'Kiveyksellä kulkeva polku halkaisee värikkäät kukkapenkit ja tummat pensaat ja puut, taustalla häämöttää meri.',
        lahde: 'Valokuva: Спасимир (Spasimir Pilev), Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Спасимир (Spasimir Pilev)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Balchik_Botanical_Garden_2017_139.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Balchik',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Millä lempinimellä Balchikia kutsutaan?',
      'Kenen kuningattaren suosima kesäasuinpaikka Balchikin palatsi oli?',
    ],
    korostukset: ['Dionysopolis|Dionysopolikseksi'],
    nappi: 'Valkoinen kaupunki Mustanmeren rannalla, Osmanien Balçık',
    // 28.16166667 E / 43.42694444 N — en-Wikipedia "Balchik"
    laudat: {
      maailmankartta: { x: 6772.1, y: 1666.1 },
      europe: { x: 751.9, y: 751.5 },
    },
    teksti: 'Balchik on kaupunki ja merenrantakohde Bulgarian Mustanmeren rannikolla '
      + 'Etelä-Dobrudzhassa, 42 kilometriä Varnasta koilliseen. Kaupunki levittäytyy '
      + 'kukkulaisille terasseille Dobrudzhan ylätasangolta mereen, ja sitä kutsutaan '
      + 'valkoiseksi kaupungiksi sen valkoisten kallioiden vuoksi. Traakialainen asutus '
      + 'siirtomaavallattiin kreikkalaisten toimesta nimellä Krounoi, ja se nimettiin '
      + 'uudelleen Dionysopolikseksi, kun mereltä löydettiin Dionysoksen patsas. Keskiajalla '
      + 'siellä oli Karvunan alueen pääkaupunki, ja Dobrotitsa siirsi despotaatin '
      + 'pääkaupungin Kaliakraan; Osmanien aikana kaupunki sai nykyisen nimensä. Vuosina '
      + '1913–1940 se oli Romanian hallussa, jolloin Balchikin palatsi oli kuningatar Marien '
      + 'suosima kesäasuinpaikka, ja palatsi ja sen kasvitieteellinen puutarha ovat nykyään '
      + 'kaupungin suosituimmat nähtävyydet.',
    lahde: 'en-Wikipedia "Balchik", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
];
