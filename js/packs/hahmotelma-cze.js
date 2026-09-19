/*
 * TŠEKIN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan, Portugalin, Kreikan, Itävallan, Alankomaiden, Belgian ja Puolan
 * jälkeen Tšekki.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48) =====
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä Espanjan, Italian, Saksan, Portugalin,
 * Kreikan, Itävallan, Alankomaiden, Belgian ja Puolan pakat: jokaisella nostolla on valmis sisältö —
 * `teksti` 3–5 virkettä Wikipedian johdannosta omin sanoin suomeksi (ei
 * käännöskopiota, ei keksittyjä faktoja, `lahde`-riville artikkeli ja
 * tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi pulun
 * kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva` +
 * `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi
 * ja lähdesivu kirjattuna, jokaisen kuvan tiedot luettu Commonsin
 * extmetadata-rajapinnasta). 1873-näkökulma: Böömi ja Määri ovat Itävalta-Unkarin osia (keisari Frans
 * Joosef), ja `nappi`-alaotsikot kertovat kohteen 1873. Vuoden 1873
 * jälkeiset kohteet (Lipnon pato 1960, Laurin & Klement 1895, Chebin
 * museo 1873) ovat mukana: teksti on nykytietoa ja `nappi` katsoo
 * vuodesta 1873 eteenpäin. Königgrätzin taistelu (1866) on seitsemän
 * vuotta vanha. Toisen maailmansodan leirit (Terezín) eivät kuulu pakkaan.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `cze-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/cze/.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-maiden hahmotelmilla: nämä ovat kaikki
 * kaupungin (Praha, Tšekin ainoa pelikaupunki) ulkopuolella,
 * lähimmät nostot yli 6 lautayksikön päässä nykyisistä merkeistä ja
 * keskenään yli 7 lautayksikön päässä, ja js/fokuskohteet.js liittää
 * rivit KOHDE_MAAT.CZE:hen. Tšekissä on jo 24 nostoa; Karlštejn, Český
 * Krumlov, Kutná Hora, Plzeň, Sněžka, Moravský kras ja Lednice–Valtice
 * ovat niiden joukossa eikä niitä toisteta. `lahi: true` on sama lähizoomiportti kuin
 * Ranskan hahmotelmalla (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen. Laudan luvut on laskettu pelin omalla
 * kaavalla (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Tšekin fokuslehden
 * rajaukseen (`osuuLehteen`) ja on pelin karkean CZE-renkaan sisällä;
 * Adršpach (0,5), Podyjí (0,8), Lipno (1,9) ja Cheb (1,9) ovat aivan
 * reunalla, ja niiden koordinaatit ovat Wikipedian todelliset.
 */

/** Tšekin hahmotelmanostot: sisällölliset kohteet kaupungin ulkopuolella. */
export const HAHMOTELMA_CZE = [
  {
    id: 'hahmotelma-bohemian-paradise',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-bohemian-paradise-5fcebcc0.jpg',
      lyhyt: 'Hiekkakivipylväät kohoavat metsän yllä Prachovin kallioilla Böömin paratiisissa.',
      selite: 'Kuvassa näkyvät Prachovské skályn luonnonsuojelualueen kalliomuodostelmat ja niiden välissä kulkeva polku. Prachovin kalliot ovat osa Böömin paratiisin aluetta.',
      lahde: 'Valokuva: Gerd Eichmann, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Gerd Eichmann',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Prachovské_skály-46-2012-gje.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-bohemian-paradise-12b3a3e2.jpg',
        lyhyt: 'Trosky-linnan rauniot kahdella kalliokärjellä ilmakuvassa.',
        selite: 'Ilmakuvassa erottuvat linnan kaksi tornia, Panna ja Baba, kukin omalla kalliokärjellään, sekä niiden välissä oleva muuriosa ympäröivän metsän ja peltojen keskellä.',
        lahde: 'Valokuva: Zdeněk Fiedler, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Zdeněk Fiedler',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hrad_Trosky,_letecký_snímek.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Böömin paratiisi',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mikä on Böömin paratiisin korkein kohta?',
      'Mistä kivestä monet alueen kaupungit on rakennettu?',
    ],
    korostukset: ['hiekkakivi|hiekkakivi'],
    nappi: 'Itävallan Böömin hiekkakivimaisema, josta tulee suojelualue vasta 1955',
    // 15.17055556 E / 50.51972222 N — en-Wikipedia "Bohemian Paradise"
    laudat: {
      maailmankartta: { x: 6339, y: 1367.5 },
      europe: { x: 502.5, y: 564.9 },
    },
    teksti: 'Böömin paratiisi eli tšekiksi Český ráj on luonto- ja kulttuurialue Tšekissä; sen '
      + 'suojeltu maisema-alue kattaa 181 neliökilometriä, ja alueen geopark on Tšekin ainoa '
      + 'Unescon geopark. Se sijaitsee noin 60 kilometriä Prahasta koilliseen Jičínin ja '
      + 'Turnovin kaupunkien välissä, pääjokena Jizera, ja sen korkein kohta on 744 metrin '
      + 'korkuinen Kozákov. Suojelualue perustettiin vuonna 1955 maan ensimmäisenä '
      + 'luonnonsuojelualueena. Alueen tunnetuimpiin piirteisiin kuuluu hiekkakivi, josta '
      + 'monet ympäröivät kaupungit on rakennettu, ja tuuli, vesi ja pakkanen ovat muovanneet '
      + 'kallioista erikoisia muotoja. Erityisen huomionarvoinen on Prachovin '
      + 'kalliomuodostelmien alue, joka on ollut suojeltu luonnonsuojelualue vuodesta 1933.',
    lahde: 'en-Wikipedia "Bohemian Paradise", johdanto-osa ja osiot "Geography", "History" ja '
      + '"Natural environment" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-adrspach',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-adrspach-8f3c1c15.jpg',
      lyhyt: 'Korkeita hiekkakivipylväitä puiston nurmikon reunalla Adršpachissa.',
      selite: 'Adršpach-Teplicen kalliokaupungin sileäpintaiset hiekkakivipylväät kohoavat puiden ja nurmen yllä.',
      lahde: 'Valokuva: Lestat (Jan Mehlich), Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Lestat (Jan Mehlich)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Adršpašskoteplické_skály_02.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-adrspach-99b58431.jpg',
        lyhyt: 'Kapeita hiekkakivipylväitä kirkasta taivasta vasten.',
        selite: 'Lähikuva Adršpach-Teplicen kalliomuodostelmista: kapeita pylväitä, joiden lomassa kasvaa yksinäinen mänty.',
        lahde: 'Valokuva: John Samuel, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'John Samuel',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rocks_in_Adršpach-Teplice.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-adrspach-304f7657.jpg',
        lyhyt: 'Adršpachin kalliokaupunki ilmasta nähtynä metsän keskellä.',
        selite: 'Ilmakuvassa harmaat hiekkakivipylväät nousevat tiheästä havumetsästä Itä-Böömissä.',
        lahde: 'Kuva: Karelj, Wikimedia Commons (public domain).',
        tekija: 'Karelj',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Adršpach_from_air_1.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Adršpach-Teplicen kalliot',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Kuka runoilija vieraili kalliokaupungissa vuonna 1790?',
      'Mikä lintu pesii Adršpachin kallioilla?',
    ],
    korostukset: ['kalliokaupunki|kalliokaupunkiin'],
    nappi: 'Kalliokaupunki, jonne polut avattiin 1800-luvun alussa ja jossa Goethe kävi 1790',
    // 16.115 E / 50.61138889 N — en-Wikipedia "Adršpach-Teplice Rocks"
    laudat: {
      maailmankartta: { x: 6370.5, y: 1363.5 },
      europe: { x: 520.6, y: 562.5 },
    },
    teksti: 'Adršpach-Teplicen kalliot ovat joukko hiekkakivimuodostelmia Hradec Královén '
      + 'alueella Tšekissä, ja ne on nimetty kahden lähikunnan, Adršpachin ja Teplice nad '
      + 'Metujin, mukaan. Kalliot on suojeltu kansallisena luonnonsuojelualueena vuodesta '
      + '1933, ja vuodesta 1991 alue kuuluu Broumovskon suojeltuun maisema-alueeseen. Monilla '
      + 'muodostelmilla on mielikuvituksellisia nimiä, kuten Espanjalainen muuri, Isoisän '
      + 'tuoli ja Rübezahlin urut. Ensimmäiset luonnonystävät Sleesiasta saapuivat '
      + 'kalliokaupunkiin noin vuonna 1700, Goethe vieraili siellä vuonna 1790, ja 1800-luvun '
      + 'alussa alueelle tehtiin ensimmäiset polut. Alue on myös yksi Euroopan suurimpia '
      + 'muuttohaukan pysyviä pesimäpaikkoja.',
    lahde: 'en-Wikipedia "Adršpach-Teplice Rocks", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-praded',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-praded-91541f85.jpg',
      lyhyt: 'Lumen peittämä Praděd sumumeren yläpuolella.',
      selite: 'Jeseníkyn korkein vuori ja sen huipulla oleva torni erottuvat lumisena laakson pilvimeren yläpuolella.',
      lahde: 'Valokuva: Lenka Kinclová, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Lenka Kinclová',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zasněžený_Praděd.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-praded-33e0c22f.jpg',
        lyhyt: 'Pradědin huipun torni alhaalta katsottuna.',
        selite: 'Näkymä Pradědin huipulla olevan television lähetystornin juurelta ylös kohti tornin huippua sinistä taivasta vasten.',
        lahde: 'Valokuva: Michal Klajban, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Michal Klajban',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Praděd_v_Jeseníkách_03.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Praděd',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mikä oli Pradědin huipun ensimmäinen rakennus?',
      'Mitä keskiajalla uskottiin Petrovy kameny -kivien asukkaista?',
    ],
    korostukset: ['noita|noitien'],
    nappi: 'Altvater eli Praděd, jonka huipulle sudeettisaksalaiset rakentavat näkötornin 1903',
    // 17.23333333 E / 50.08333333 N — en-Wikipedia "Praděd"
    laudat: {
      maailmankartta: { x: 6407.8, y: 1386.6 },
      europe: { x: 542.1, y: 576.4 },
    },
    teksti: 'Praděd on Hrubý Jeseníkin vuoriston huippu Tšekissä; 1 491 metrin korkeudessaan se '
      + 'on vuoriston korkein ja Tšekin viidenneksi korkein vuori sekä Määrin, Tšekin '
      + 'Sleesian ja Ylä-Sleesian historiallisten alueiden korkein huippu. Nimi tarkoittaa '
      + 'kirjaimellisesti isoisoisää. Ensimmäinen vuorella ollut rakennus oli 32 metriä '
      + 'korkea kivinen näkötorni, jonka sudeettisaksalaiset matkailijat rakensivat vuosina '
      + '1903–1912. Huipun lähellä oleva Petrovy kameny on gneissikivimuodostelma, jonka '
      + 'keskiajalla pelättiin olevan noitien asuinpaikka. Nykyään huipulla on 162 metriä '
      + 'korkea televisiolähetin, ja vuori on suosittu hiihtoalue.',
    lahde: 'en-Wikipedia "Praděd", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mitä nimi Praděd tarkoittaa?',
      vaihtoehdot: [
        'Suurta vuorta',
        'Isoisoisää',
        'Pyhää kukkulaa',
        'Kylmää huippua',
      ],
      oikea: 1,
      fakta: 'Vuoren lähetintorni on 162 metriä korkea, ja sen ylätasannetta käytetään '
        + 'näkötornina.',
    },
  },
  {
    id: 'hahmotelma-hranice',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-hranice-57a0c320.jpg',
      lyhyt: 'Hranicen syvänteen pohjalla näkyy vihreä vesi jyrkkien kallioseinien välissä.',
      selite: 'Näkymä ylhäältä Hranická propastin kalliokuiluun, jonka pohjalla on vesi ja rinteillä kasvillisuutta. Syvänne sijaitsee Hůrka u Hranicin luonnonsuojelualueella.',
      lahde: 'Valokuva: Jiří Komárek, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Jiří Komárek',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hranická_propast,_národní_přírodní_rezervace_Hůrka_u_Hranic,_okres_Přerov_(05).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-hranice-1d28ba85.jpg',
        lyhyt: 'Kuiluseinät ja rinteen kasvillisuus Hranicen syvänteessä.',
        selite: 'Jyrkät kalliohalkeaman seinät laskeutuvat pohjaa kohti, ja reunoilla kasvaa vehreää kasvillisuutta.',
        lahde: 'Valokuva: Jiří Komárek, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jiří Komárek',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hranická_propast,_národní_přírodní_rezervace_Hůrka_u_Hranic,_okres_Přerov_(04).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Hranicen syvänne',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Miksi Hranicen syvänteen koko syvyyttä ei tiedetä?',
      'Mikä eläin yöpyy syvänteen kuivissa luolissa?',
    ],
    korostukset: ['Hranice-järvi|Hranice-järven'],
    nappi: 'Määrin karstin syvänne, jonka todellista syvyyttä ei tiedetä vieläkään',
    // 17.750778 E / 49.532 N — en-Wikipedia "Hranice Abyss"
    laudat: {
      maailmankartta: { x: 6425, y: 1410.5 },
      europe: { x: 552, y: 590.9 },
    },
    teksti: 'Hranicen syvänne eli tšekiksi Hranická propast on maailman syvin tulvinut luola: se '
      + 'on karstinen romahduskuoppa Hranicen kaupungin lähellä. Suurin varmistettu syvyys on '
      + '519,5 metriä, josta 450 metriä on veden alla, mutta koko syvyys on tuntematon, koska '
      + 'syvänteen alaosa on tulvinut Hranice-järven veden alle. Vuonna 2020 tieteellinen '
      + 'retkikunta havaitsi, että alimmat osat ovat sedimentin täyttämiä, ja arveltiin, että '
      + 'kuoppa on syntynyt ylös noussen kuumasta happamasta vedestä. Järven pinnan '
      + 'alapuolella 48 metrin syvyydessä on mahdollista nousta kuiviin luoliin, joissa '
      + 'lepakot yöpyvät.',
    lahde: 'en-Wikipedia "Hranice Abyss", johdanto-osa ja osio "Description" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Mikä tekee Hranicen syvänteestä erityisen?',
      vaihtoehdot: [
        'Se on maailman korkein tippukiviluola',
        'Se on Euroopan vanhin luola',
        'Se on maailman syvin tulivuorenkraatteri',
        'Se on maailman syvin tulvinut luola',
      ],
      oikea: 3,
      fakta: 'Lähellä sijaitsevat Zbrašovin aragoniittiluolat ovat avoinna yleisölle.',
    },
  },
  {
    id: 'hahmotelma-machovo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-machovo-0e2321d8.jpg',
      lyhyt: 'Máchovo jezero, kallio lahdella ja taustalla Bezdězin kukkulat.',
      selite: 'Järven rannalla kohoaa metsäinen niemi ja veden päällä pieni kallio, ja taustalla kukkulan päällä erottuu linna. Kuvauksen mukaan kohteena ovat Máchovo jezero ja Bezdězin kukkulat.',
      lahde: 'Valokuva: LaSo, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'LaSo',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Máchovo_jezero_a_kopce_1.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-machovo-1026caad.jpg',
        lyhyt: 'Máchovo jezero kukkulan rinteeltä nähtynä.',
        selite: 'Laaja näkymä järvelle, jonka takana kohoavat metsäiset kukkulat ja taivaalla on kumpupilviä.',
        lahde: 'Valokuva: Michael Kümmling, Wikimedia Commons (CC BY 2.5).',
        tekija: 'Michael Kümmling',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Máchovo_jezero_2.JPG',
        lisenssi: 'CC BY 2.5',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.5',
      },
    ],
    nimi: 'Máchovo jezero',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Kuka kuningas määräsi lammen perustettavaksi vuonna 1366?',
      'Minkä runoilijan mukaan järvi on nimetty?',
    ],
    korostukset: ['Mácha|Máchan'],
    nappi: 'Kaarle IV:n 1366 perustama Suuri lammikko; nimeä Mácha ei ole vielä annettu',
    // 14.64972222 E / 50.58305556 N — en-Wikipedia "Lake Mácha"
    laudat: {
      maailmankartta: { x: 6321.7, y: 1364.7 },
      europe: { x: 492.5, y: 563.3 },
    },
    teksti: 'Máchovo jezero on Doksyn kaupungissa Libereczin alueella oleva lampi, jonka '
      + 'pinta-ala on 2,84 neliökilometriä; se on alueen suurin lampi, ja siksi sitä '
      + 'kutsutaan järveksi keinotekoisesta alkuperästään huolimatta. Kuningas Kaarle IV '
      + 'määräsi vuonna 1366 suuren lammen perustettavaksi, ja se oli alun perin 300 '
      + 'hehtaarin kokoinen. Lammen vanhempi nimi oli Velký rybník eli Suuri lammikko, ja '
      + 'nykyisen nimensä se on saanut romanttisen runoilijan Karel Hynek Máchan mukaan, jota '
      + 'ympäröivä maisema viehätti ja joka sijoitti tunnetuimman runonsa Májin lähtökohdan '
      + 'sinne. 1800-luvulla lammen rannalla oli kylpyläkohde, ja vuoteen 1920 asti alue '
      + 'kuului Waldsteinin suvulle.',
    lahde: 'en-Wikipedia "Lake Mácha", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-lipno',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-lipno-91b0884e.jpg',
      lyhyt: 'Näkymä Lipnon tekojärvelle Lipnon latvustopolun näkötornista.',
      selite: 'Kuvattu Lipnon Baumkronenpfad-latvustopolun näkötornista: metsän takana levittäytyy pitkä tekojärvi kumpuilevan maiseman keskellä.',
      lahde: 'Valokuva: Funke, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Funke',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lipno_-_stezka_korunami_stromů_-_reservoir.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-lipno-0b153d35.jpg',
        lyhyt: 'Matkustajalaiva Adalbert Stifter Lipnon tekojärvellä.',
        selite: 'Retkeilyalus kulkee tekojärvellä metsäisen rannan edessä, etualalla hiekkaranta. Kuva on otettu Lipno nad Vltavoun lähellä.',
        lahde: 'Valokuva: Martin2035, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Martin2035',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lipno_Reservoir_turistic_boat_Adalbert_Stifter.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Lipnon tekojärvi',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Mikä joki on padottu Lipnon tekojärveksi?',
      'Miksi Lipnon voimala päätettiin rakentaa?',
    ],
    korostukset: ['tulva|tulvia'],
    nappi: 'Vltava, joka tulvii toistuvasti Český Krumlovin kohdalla; pato rakennetaan vasta 1950-luvulla',
    // 14.06666667 E / 48.7 N — en-Wikipedia "Lipno Reservoir"
    laudat: {
      maailmankartta: { x: 6302.2, y: 1446.3 },
      europe: { x: 481.3, y: 612.8 },
    },
    teksti: 'Lipnon tekojärvi on Vltava-joen varrelle rakennettu pato ja vesivoimala Tšekissä, ja '
      + 'se on Tšekin suurin vesialue. Etelä-Böömin Vltava aiheutti toistuvia tulvia ja '
      + 'vahinkoja muun muassa Český Krumlovissa, ja voimala päätettiin rakentaa sekä joen '
      + 'voiman hyödyntämiseksi että katastrofien estämiseksi. Valmistelutyöt alkoivat Lipno '
      + 'nad Vltavoun kunnassa vuonna 1951, padon rakennus alkoi vuonna 1952 ja pato '
      + 'valmistui vuonna 1960. Pato on Vltavan portaikon korkeimmalla portaalla noin 726 '
      + 'metrin korkeudella, ja alue rajoittuu Šumavan kansallispuistoon. Voimalassa on kaksi '
      + 'turbiinia, joiden nimellisteho on 64 megawattia kumpikin.',
    lahde: 'en-Wikipedia "Lipno Reservoir", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-podyji',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-podyji-12f55abc.jpg',
      lyhyt: 'Hardeggin kaupunki ja linna Dyje-joen laaksossa näköalapaikalta katsottuna.',
      selite: 'Kuva on otettu Hardeggská vyhlídka -näköalapaikalta, ja siinä näkyy itävaltalainen Hardeggin pikkukaupunki linnoineen Dyje- eli Thaya-joen rinnelaakson pohjalla.',
      lahde: 'Valokuva: Olgierd Rudak, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Olgierd Rudak',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hardegg_Hardeggská_vyhlídka_(2022-11-05).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-podyji-d47b2a85.jpg',
        lyhyt: 'Näkymä kohti Šobesin viinirinnettä Dyje-joen mutkan yli.',
        selite: 'Kuva on otettu Devět mlýnů -kalliolta, ja siinä näkyy Dyje-joen metsäinen mutka, niitty ja Šobesin viinirinne vastarinteellä Podyjín kansallispuistossa.',
        lahde: 'Valokuva: ladabohac92, Wikimedia Commons (CC BY 2.0).',
        tekija: 'ladabohac92',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pohled_na_Šobes_ze_skalní_vyhlídky_2014_01.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Podyjín kansallispuisto',
    tyyppi: 'joki',
    lahi: true,
    kysymykset: [
      'Minkä maan kansallispuiston kanssa Podyjí muodostaa kansainvälisen puiston?',
      'Mikä joki virtaa puiston läpi syvässä laaksossa?',
    ],
    korostukset: ['Dyje|Dyje-joen'],
    nappi: 'Dyje-joen syvä metsälaakso Määrin ja Itävallan rajalla; kansallispuistoa ei vielä ole',
    // 15.9 E / 48.85 N — en-Wikipedia "Podyjí National Park"
    laudat: {
      maailmankartta: { x: 6363.3, y: 1439.9 },
      europe: { x: 516.5, y: 608.8 },
    },
    teksti: 'Podyjín kansallispuisto sijaitsee Etelä-Määrin alueella Itävallan rajalla, ja '
      + 'yhdessä Itävallan Thayatalin kansallispuiston kanssa se muodostaa niin sanotun '
      + 'kansainvälisen puiston. Se on yksi Tšekin neljästä kansallispuistosta ja suojelee '
      + 'lähes luonnontilaisia metsiä Dyje-joen syvän laakson varrella; puisto julistettiin '
      + 'virallisesti kansallispuistoksi 1. heinäkuuta 1991, ja sen pinta-ala on 63 '
      + 'neliökilometriä. Dyje virtaa puiston läpi 40 kilometrin matkan tiheästi metsäisessä '
      + 'laaksossa, jonka syvyys on enimmillään 220 metriä. Puiston poluilta pääsee Nový '
      + 'Hrádekin ja Hardeggin linnanraunioille sekä Vranov nad Dyjín linnalle. Puistossa on '
      + 'tavattu 152 lintulajia ja 18 kämmeköiden lajia.',
    lahde: 'en-Wikipedia "Podyjí National Park", johdanto-osa ja osiot "Legal status", '
      + '"Geography" ja "Wildlife" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-lysa-hora',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-lysa-hora-2cb02a3d.jpg',
      lyhyt: 'Lysá horan huipun lähetintorni ja rakennus kesäisen metsärinteen yläpuolella.',
      selite: 'Kuvassa kohoaa Moravian-Sleesian Beskidien korkeimman vuoren huipulla oleva punavalkoinen lähetintorni rakennuksineen, ja alarinteillä on kuusimetsää.',
      lahde: 'Valokuva: Michal Klajban, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Michal Klajban',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Beskydy,_Lysá_hora,_léto_2011.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-lysa-hora-ad2e4601.jpg',
        lyhyt: 'Talvinen näkymä Lysá horan huipun lähistöltä Beskidien vuorijonoille.',
        selite: 'Kuvassa lumen peittämät kuuset ja pitkä vuoristonäkymä Beskideille Lysá horan huipun tuntumasta talvella.',
        lahde: 'Valokuva: Radimvadim, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Radimvadim',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lysá_hora_v_zimě.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Lysá hora',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mitä nimi Lysá hora tarkoittaa?',
      'Miksi vuoren nimi viittaa kaljuuteen?',
    ],
    korostukset: ['sateisimmista|sateisimmista'],
    nappi: 'Beskidien korkein huippu, jonka kalju nimi on kirjattu jo vuonna 1261',
    // 18.4475 E / 49.54583333 N — en-Wikipedia "Lysá hora"
    laudat: {
      maailmankartta: { x: 6448.3, y: 1409.9 },
      europe: { x: 565.4, y: 590.5 },
    },
    teksti: 'Lysá hora on Määrin ja Sleesian Beskidien korkein vuori Tšekissä sekä Tšekin '
      + 'Cieszynin Sleesian historiallisen alueen korkein huippu. Se on yksi maan '
      + 'sateisimmista paikoista, sillä vuotuinen sademäärä ylittää 1 500 millimetriä. Nimi '
      + 'tarkoittaa kaljua vuorta, koska huipulla ei ollut puita, ja paikka mainitaan '
      + 'ensimmäisen kerran kirjallisessa asiakirjassa vuonna 1261. Nykyään vuori on pieni '
      + 'hiihtokeskus ja suosittu vaelluskohde: vuonna 2018 huipulle nousi noin 750 000 '
      + 'turistia.',
    lahde: 'en-Wikipedia "Lysá hora", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-slavkov',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-slavkov-b796a491.jpg',
      lyhyt: 'Mohyla míru -rauhanmuistomerkki Austerlitzin taistelupaikan kukkulalla.',
      selite: 'Kuvassa on Mohyla míru, kivinen muistomerkki Pracen kukkulalla Austerlitzin taistelun paikalla. Sen huipulla on ristillä koristeltu rakenne, ja sisäänkäynnin vieressä seisovat patsaat. Kuva on otettu lännestä.',
      lahde: 'Valokuva: Kirk, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Kirk',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mohyla_miru_1.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-slavkov-1da1640e.jpg',
        lyhyt: 'Slavkovin barokkilinna peilautuu puutarhan altaaseen.',
        selite: 'Kuvassa on Slavkov u Brnon (Austerlitzin) barokkilinnan puutarhajulkisivu punaisine kattoineen, ja rakennus peilautuu edessä olevaan vesialtaaseen.',
        lahde: 'Valokuva: Kirk, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Kirk',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Slavkov_u_Brna_-_Castle.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Austerlitzin taistelu',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Ketkä joukot Napoleon löi Austerlitzin taistelussa?',
      'Minkä kukkulan Napoleon luovutti houkutellakseen liittolaiset?',
    ],
    korostukset: ['Pratzen|Pratzenin'],
    nappi: 'Kenttä Määrissä, jossa Napoleon löi kaksi keisaria 1805 – Itävalta-Unkarin alueella',
    // 16.7625 E / 49.12805556 N — en-Wikipedia "Battle of Austerlitz"
    laudat: {
      maailmankartta: { x: 6392.1, y: 1427.9 },
      europe: { x: 533, y: 601.5 },
    },
    teksti: 'Austerlitzin taistelu käytiin maanantaina 2. joulukuuta 1805 Austerlitzin, nykyisen '
      + 'Slavkovin, lähellä, ja se oli kolmannen koalitiosodan ratkaiseva taistelu. Keisari '
      + 'Napoleon I:n Grande Armée löi yhdistetyn venäläis-itävaltalaisen armeijan, jota '
      + 'johtivat tsaari Aleksanteri I ja kenraali Kutuzov sekä keisari Frans II; taistelua '
      + 'kutsuttiin aikalaisten keskuudessa kolmen keisarin taisteluksi kentällä olleiden '
      + 'kolmen hallitsijan mukaan. Napoleon houkutteli liittolaiset uskomaan hänen '
      + 'armeijansa heikoksi ja jopa luovutti hallitsevan Pratzenin kukkulan, ja '
      + 'sotahistorioitsijat pitävät taistelua yhtenä hänen taktisista mestariteoksistaan. '
      + 'Liittoutuneiden tappiot olivat noin 36 000 miestä 89 000:sta ja ranskalaisten noin 9 '
      + '000 miestä 66 000:sta, ja Pressburgin rauha allekirjoitettiin saman kuun lopulla.',
    lahde: 'en-Wikipedia "Battle of Austerlitz", johdanto-osa ja osiot "Prelude", "Battle" ja '
      + '"Aftermath" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Miksi Austerlitzin taistelua kutsuttiin kolmen keisarin taisteluksi?',
      vaihtoehdot: [
        'Kentällä oli kolme hallitsijaa',
        'Taistelu kesti kolme päivää',
        'Kolme valtakuntaa voitti samanaikaisesti',
        'Taistelu käytiin kolmen valtakunnan rajalla',
      ],
      oikea: 0,
      fakta: 'Napoleonin päämaja oli Žuráň-kukkulalla, jossa on nykyään graniittinen muistomerkki '
        + 'taistelun asemista.',
    },
  },
  {
    id: 'hahmotelma-pernstejn',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-pernstejn-4c1b2bb9.jpg',
      lyhyt: 'Pernštejnin linna kohoaa metsäisen kukkulan päällä syksyllä.',
      selite: 'Kuvassa näkyy Pernštejnin gootilainen linna oransseine kattoineen ja torneineen keskellä syksyn värjäämiä metsiä.',
      lahde: 'Valokuva: Jaroslav A. Polák, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Jaroslav A. Polák',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pernstejn_castle_(autumn_2017).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-pernstejn-679c6b1b.jpg',
        lyhyt: 'Pernštejnin linnan ulkopihan rakennukset ja korkea päätorni kesäisenä päivänä.',
        selite: 'Kuvassa näkyvät Pernštejnin linnan kivinen ylätorni ja sen edessä pihan puu- ja kivirakennuksia.',
        lahde: 'Valokuva: Pudelek, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Pudelek',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hrad_Pernštejn_(Pernstein)_-_by_Pudelek.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Pernštejnin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Pernštejniä kutsutaan marmorilinnaksi?',
      'Mitä saksankielinen nimi Bärenstein tarkoittaa?',
    ],
    korostukset: ['Pernštejn|Pernštejnin'],
    nappi: 'Marmorilinna kalliolla; Pernštejnin suvun 1500-luvun loisto elää yhä seinissä',
    // 16.31833333 E / 49.45083333 N — en-Wikipedia "Pernštejn Castle"
    laudat: {
      maailmankartta: { x: 6377.3, y: 1414 },
      europe: { x: 524.5, y: 593 },
    },
    teksti: 'Pernštejnin linna on linna Etelä-Määrin alueella kalliolla Nedvědicen kylän sekä '
      + 'Svratka- ja Nedvědička-jokien yläpuolella noin 40 kilometriä Brnosta luoteeseen. '
      + 'Sitä kutsutaan marmorilinnaksi, koska ovien ja ikkunoiden kehyksissä on käytetty '
      + 'marmoria muistuttavaa kiveä. Linnan perustivat luultavasti vuosien 1270 ja 1285 '
      + 'välillä Medlovin herrat, ja heidän sukuhaaransa otti nimekseen Pernštejn, joka '
      + 'johtuu saksankielisestä nimestä Bärenstein eli Karhunkallio. Linna on säilyttänyt '
      + 'ehjän goottilaisen ja renessanssin ilmeensä, jonka Pernštejnin suku, tuolloin Böömin '
      + 'kuningaskunnan rikkain ja mahtavin herrasuku, viimeisteli 1500-luvun '
      + 'alkupuoliskolla; se on yksi Tšekin parhaiten säilyneistä linnoista.',
    lahde: 'en-Wikipedia "Pernštejn Castle", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kromeriz',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-kromeriz-0688aa46.jpg',
      lyhyt: 'Kroměřížin Kukkatarhan barokkinen kuviopuutarha ja vihreäkupolinen rotunda.',
      selite: 'Kuvassa on Kroměřížin Kukkatarha: leikattujen pensasaitojen ja kukkaistutusten muodostamia kuvioita sekä taustalla vihertävä kupolikattoinen rotundapaviljonki.',
      lahde: 'Valokuva: P.matel, Wikimedia Commons (public domain).',
      tekija: 'P.matel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Flower_Garden_Kromeriz.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-kromeriz-f3ccf752.jpg',
        lyhyt: 'Kroměřížin arkkipiispanlinnan keltavalkoinen julkisivu ja torni sisäänkäynnin luota.',
        selite: 'Kuvassa on Kroměřížin arkkipiispanlinnan pitkä keltavalkoinen julkisivu, portaali ja vihreäkattoinen kellotorni Sněmovní náměstin puolelta katsottuna.',
        lahde: 'Valokuva: Txllxt TxllxT, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Txllxt TxllxT',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kroměříž_-_Sněmovní_náměstí_-_View_ENE_on_Arcibiskupský_zámek_,_Archbishop\'s_Chateau.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kroměřížin arkkipiispanlinna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kenen omistuksessa Kroměříž oli keskiajalta lähtien?',
      'Mikä Kroměřížin kohde on Unescon maailmanperintöä?',
    ],
    korostukset: ['arkkipiispa|arkkipiispat'],
    nappi: 'Olomoucin arkkipiispan kaupunki, jossa vuonna 1848 kokoontui keisarillinen perustuslakia säätävä kongressi',
    // 17.39305556 E / 49.29888889 N — en-Wikipedia "Kroměříž"
    laudat: {
      maailmankartta: { x: 6413.1, y: 1420.6 },
      europe: { x: 545.1, y: 597 },
    },
    teksti: 'Kroměříž on noin 28 000 asukkaan kaupunki Zlínin alueella Määrissä Morava-joen '
      + 'molemmin puolin. Se perustettiin viimeistään 1100-luvun alkupuoliskolla ja sai '
      + 'kaupunkioikeudet 1290; sen omistivat Olomoucin piispat ja arkkipiispat, jotka '
      + 'edistivät merkittävästi sen kehitystä. Kaupunki tunnetaan barokkilinnastaan ja sen '
      + 'arvokkaista puutarhoista, jotka ovat Unescon maailmanperintökohde, ja linnan '
      + 'galleriassa on noin 500 maalauksen kokoelma, joka on Euroopan merkittävimpiä ja '
      + 'johon kuuluu Tizianin myöhäinen työ. Vuonna 1848 kaupungissa kokoontui keisarillinen '
      + 'perustuslakia säätävä kongressi.',
    lahde: 'en-Wikipedia "Kroměříž", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-krivoklat',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-krivoklat-cabab09f.jpg',
      lyhyt: 'Křivoklátin linna kohoaa metsäisen rinteen yllä valkoisen pyöreän tornin kanssa.',
      selite: 'Křivoklátin linna Rakovníkin piirikunnassa nähtynä ulkopuolelta: punakattoiset rakennukset, linnamuuri ja pyöreä torni metsän keskellä.',
      lahde: 'Valokuva: Harold, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Harold',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Křivoklát,_výhled_na_hrad_(2018-05-08;_01).jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-krivoklat-eccee120.jpg',
        lyhyt: 'Näkymä katoilta Křivoklátin linnan sisäpihalle ja päärakennukseen.',
        selite: 'Křivoklátin linna nähtynä korkealta: etualalla punatiilikattoja, taustalla pihan yli linnan päärakennus ja metsäinen laakso.',
        lahde: 'Valokuva: Petr1888, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Petr1888',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hrad_Křivoklát_25.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Křivoklátin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka suku omisti Křivoklátin linnan 1800-luvulla?',
      'Mihin linna muutettiin, kun se alkoi rappeutua?',
    ],
    korostukset: ['Fürstenberg|Fürstenbergin'],
    nappi: 'Fürstenbergin suvun linna, jonka vuoden 1826 palon jälkeen rakennettiin uudelleen',
    // 13.8725 E / 50.03777778 N — en-Wikipedia "Křivoklát Castle"
    laudat: {
      maailmankartta: { x: 6295.8, y: 1388.5 },
      europe: { x: 477.6, y: 577.6 },
    },
    teksti: 'Křivoklátin linna on Keski-Böömin alueella Křivoklátissa sijaitseva linna, joka on '
      + 'suojeltu kansallisena kulttuurimonumenttina. Se perustettiin 1100-luvulla ja kuului '
      + 'Böömin kuninkaille; Otakar II:n aikana rakennettiin suuri, monumentaalinen '
      + 'kuninkaanlinna, jonka Wenceslaus IV rakensi uudelleen ja Vladislaus II laajensi. '
      + 'Linna vaurioitui useita kertoja tulipaloissa, ja se muutettiin ankaraksi vankilaksi, '
      + 'jolloin rakennus rappeutui. 1800-luvulla omistajaksi tuli Fürstenbergin suku, joka '
      + 'rakennutti linnan uudelleen vuoden 1826 palon jälkeen ja omisti sen vuoteen 1929. '
      + 'Nykyään linnassa on museo, jossa säilytetään metsästysaseiden, goottilaisten '
      + 'maalausten ja kirjojen kokoelmia.',
    lahde: 'en-Wikipedia "Křivoklát Castle", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-cheb',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-cheb-85d9aa35.jpg',
      lyhyt: 'Špalíček, keskiaikaisten talojen ryhmä Chebin torin laidalla.',
      selite: 'Špalíček on yksitoista keskiaikaista kauppiastaloa käsittävä rakennusryhmä Chebin torilla; kuvassa näkyvät talojen ristikkorakenteet ja punaiset katot.',
      lahde: 'Kuva: Karelj, Wikimedia Commons (public domain).',
      tekija: 'Karelj',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cheb_Špalíček_2.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-cheb-14e282b7.jpg',
        lyhyt: 'Chebin linnan sisäänkäynti ja musta torni.',
        selite: 'Chebin linnan sisäänkäynti, tiilinen linnanmuuri ja tumma basalttinen Musta torni, jota lähestytään sillan kautta.',
        lahde: 'Kuva: Karelj, Wikimedia Commons (public domain).',
        tekija: 'Karelj',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cheb_hrad_2.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Cheb',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka sotapäällikkö murhattiin Chebissä 24. helmikuuta 1634?',
      'Millä nimellä Chebiä kutsuttiin saksaksi?',
    ],
    korostukset: ['Wallenstein|Wallenstein'],
    nappi: 'Egerin kaupunki, jonka Wallensteinin murhapaikasta tulee 1873 kaupunginmuseo',
    // 12.37055556 E / 50.07944444 N — en-Wikipedia "Cheb"
    laudat: {
      maailmankartta: { x: 6245.7, y: 1386.7 },
      europe: { x: 448.7, y: 576.5 },
    },
    teksti: 'Cheb, saksaksi Eger, on noin 33 000 asukkaan kaupunki Ohře-joen varrella Karlovy '
      + 'Varyn alueella Saksan rajalla. Ennen saksalaisten karkotusta vuonna 1945 se oli '
      + 'saksankielisen Egerlandin keskus, ja sen historiallinen keskusta on hyvin säilynyt; '
      + 'tärkein muistomerkki on Chebin linna. Kaupunki kärsi pahoin hussiittisodissa ja '
      + 'kolmikymmenvuotisessa sodassa, ja vuonna 1634 sotapäällikkö Albrecht von Wallenstein '
      + 'murhattiin siellä. Murha tapahtui torin varrella olevassa kaupunkitalossa, joka '
      + 'tunnetaan myös Pachelbelin talona; vuodesta 1873 talossa on toiminut kaupunginmuseo.',
    lahde: 'en-Wikipedia "Cheb", johdanto-osa ja osiot "History" ja "Sights" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-kuks',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-kuks-cdc82af4.jpg',
      lyhyt: 'Kuksin barokkisairaala kohoaa rinteen päällä polun päässä.',
      selite: 'Näkymä Kuksin sairaalalle: keskellä pääjulkisivu kellotorneineen ja portaikko, jota reunustavat patsaat, edessä nurmea ja kävelypolku.',
      lahde: 'Valokuva: RomanM82, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'RomanM82',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kuks_-_pohled_ke_špitálu,_2023-08,_obr02.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-kuks-d81da62d.jpg',
        lyhyt: 'Barokkipatsas Kuksin sairaalan pihalla rakennuksen edessä.',
        selite: 'Kuksin sairaalan sisäpihaa: etualalla kiviveistos, jossa hahmo ja lapsia, taustalla sairaalarakennuksen ja kirkon seinät.',
        lahde: 'Valokuva: Art Jarka, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Art Jarka',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hospital_Kuks_(015).jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Kuks',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka kuvanveistäjä koristi Kuksin sairaalan ja kirkon?',
      'Mitkä ovat Braunin kuuluisimmat veistokset Kuksissa?',
    ],
    korostukset: ['Braun|Braunin'],
    nappi: 'Kreivi Sporckin barokkikylpylä Labe-joen varrella; Braunin veistokset rapautuvat sateessa',
    // 15.88944444 E / 50.40166667 N — en-Wikipedia "Kuks"
    laudat: {
      maailmankartta: { x: 6363, y: 1372.7 },
      europe: { x: 516.3, y: 568 },
    },
    teksti: 'Kuks on noin 200 asukkaan kylä Elbe-joen eli Labe-joen varrella Hradec Královén '
      + 'alueella Tšekissä, ja sen pääasiallinen nähtävyys on barokkinen kylpylärakennus, '
      + 'jossa on Matthias Braunin kuuluisia veistoksia. Ennen asutusta alueella pestiin '
      + 'kultaa, ja kreivi Franz Anton von Sporck osti tilan vuonna 1684. Hän yhdisti kolme '
      + 'mineraalilähdettä yhteen paikkaan ja rakennutti vuosina 1692–1696 yksinkertaisen '
      + 'kylpylän, jota hän laajensi, kun lähteen parantava vaikutus oli todistettu. Vuosina '
      + '1707–1715 rakennettiin sairaala ja Pyhän Kolminaisuuden kirkko kryptineen, ja '
      + 'rakennukset koristettiin Braunin barokkiveistoksilla, joista kuuluisimmat ovat '
      + 'Hyveet ja Paheet. Sairaalan, kirkon ja apteekin rakennukset ovat säilyneet barokin '
      + 'mestariteoksina, mutta ulkoveistokset rapautuvat nopeasti sateen ja maakosteuden '
      + 'vaikutuksesta.',
    lahde: 'en-Wikipedia "Kuks", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-koniggratz',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-koniggratz-66ca31ef.jpg',
      lyhyt: 'Itävaltalaisen 1. armeijakunnan muistomerkki kotkineen Chlumin mäellä.',
      selite: 'Chlumin kukkulalla Königgrätzin taistelun näyttämöllä seisova graniittinen muistomerkki, jonka huipulla on tumma kotka; taustalla avoin maalaismaisema.',
      lahde: 'Valokuva: Miloslav Rejha, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Miloslav Rejha',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Chlum,_Všestary_2022-04_04.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-koniggratz-26600545.jpg',
        lyhyt: 'Chlumin vuoden 1866 sodan museon rakennus.',
        selite: 'Chlumissa sijaitsevan Itävalta-Preussin sodan 1866 museon moderni julkisivu, jossa lukee museon nimi ja vuosiluku 1866.',
        lahde: 'Valokuva: Palickap, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Palickap',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Chlum_(Všestary),_muzeum_(1).JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Königgrätzin taistelu',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka voitti Königgrätzin taistelun vuonna 1866?',
      'Millä toisella nimellä taistelua kutsutaan?',
    ],
    korostukset: ['neulakivääri|neulakivääri'],
    nappi: 'Seitsemän vuotta sitten Preussi löi tässä Itävallan; Böömin kenttä on nyt Itävalta-Unkarin',
    // 15.75 E / 50.27 N — en-Wikipedia "Battle of Königgrätz"
    laudat: {
      maailmankartta: { x: 6358.3, y: 1378.4 },
      europe: { x: 513.6, y: 571.5 },
    },
    teksti: 'Königgrätzin taistelu eli Sadován taistelu oli Itävallan ja Preussin sodan '
      + 'ratkaiseva taistelu, jossa Preussin kuningaskunta löi Itävallan keisarikunnan. Se '
      + 'käytiin 3. heinäkuuta 1866 böömiläisen Hradec Královén (saksaksi Königgrätz) ja '
      + 'Sadován kylän lähellä, ja se oli sodan suurin taistelu sekä Leipzigin taistelun 1813 '
      + 'jälkeen maailman suurin. Preussilla oli noin 285 000 sotilasta ja Itävallalla 240 '
      + '000. Preussin voittoon vaikuttivat parempi koulutus, Moltken taktiikka, Dreysen '
      + 'neulakivääri ja rautateiden hyödyntäminen joukkojen siirroissa. Itävallan armeija '
      + 'joutui vetäytymään kello 15 mennessä.',
    lahde: 'en-Wikipedia "Battle of Königgrätz", johdanto-osa (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mikä sotilaallinen innovaatio auttoi Preussia voittamaan Königgrätzin taistelun?',
      vaihtoehdot: [
        'Ilmapallotiedustelu',
        'Höyrylaivat',
        'Neulakivääri ja rautatiekuljetukset',
        'Kenttäsairaalat',
      ],
      oikea: 2,
      fakta: 'Itävallan ylipäällikkö Ludwig von Benedek oli ottanut tehtävän vastahakoisesti, '
        + 'koska hän ei tuntenut joukkoja eikä maastoa.',
    },
  },
  {
    id: 'hahmotelma-zvikov',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-zvikov-7cfdfea7.jpg',
      lyhyt: 'Zvíkovin linna kohoaa metsäisellä kalliolla veden äärellä.',
      selite: 'Zvíkovin linnan muurit ja pyöreä torni nousevat kalliolle vesistön rannalla; kuva on otettu vastarannalta.',
      lahde: 'Valokuva: Chmee2, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Chmee2',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zvíkov_Castle_from_Kopaniny_(1)_(cropped).JPG',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-zvikov-ba4f3bf9.jpg',
        lyhyt: 'Zvíkovin linnan goottilainen kaarikäytävillä varustettu sisäpiha.',
        selite: 'Zvíkovin linnan sisäpihaa ympäröivät kaksikerroksiset goottilaiset kaarikäytävät, joiden yläkerran kaaria koristavat kiviset ikkunapielet.',
        lahde: 'Valokuva: Jiří Sedláček, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jiří Sedláček',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Court_at_Zvíkov_castle_in_Zvíkovské_Podhradí,_Písek_District.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Zvíkovin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minkä jokien yhtymäkohdan yllä Zvíkovin linna seisoo?',
      'Kuinka kauan hussiitit piirittivät linnaa vuonna 1429?',
    ],
    korostukset: ['Zvíkov|Zvíkov'],
    nappi: 'Tšekin linnojen kuningas, joka kesti hussiittien neljän kuukauden piirityksen',
    // 14.1885 E / 49.437 N — en-Wikipedia "Zvíkov Castle"
    laudat: {
      maailmankartta: { x: 6306.3, y: 1414.6 },
      europe: { x: 483.6, y: 593.4 },
    },
    teksti: 'Zvíkov, jota kutsutaan usein Tšekin linnojen kuninkaaksi, on linna Zvíkovské '
      + 'Podhradín kunnassa noin 15 kilometriä Písekistä pohjoiseen Etelä-Böömissä. Se seisoo '
      + 'vaikeasti tavoitettavalla, jyrkällä niemekkeellä Vltavan ja Otavan yhtymäkohdan '
      + 'yllä, ja se on yksi Tšekin maiden tärkeimmistä varhaisgoottilaisista linnoista. '
      + 'Nykyinen linna rakennettiin 1200-luvun alkupuoliskolla luultavasti kuningas Ottokar '
      + 'I:n määräyksestä, ja se mainitaan ensimmäisen kerran vuonna 1234. Sen linnoitukset '
      + 'olivat niin vahvat, että hussiitit piirittivät sitä neljä kuukautta vuonna 1429 '
      + 'saamatta sitä valtaan, ja vuonna 1618 sen 140 miehen varuskunta torjui 4 000 '
      + 'Habsburgien sotilasta.',
    lahde: 'en-Wikipedia "Zvíkov Castle", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-karlovy-vary',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-karlovy-vary-f6403dfb.jpg',
      lyhyt: 'Karlovy Varyn Mlýnská kolonáda vanhassa valokuvassa noin vuodelta 1919.',
      selite: 'Vanha mustavalkoinen valokuva näyttää Mlýnská kolonádan pitkän pylväikön rinnettä vasten. Kuva on julkaistu Czechoslovak Review -lehdessä vuonna 1919.',
      lahde: 'Valokuva: tekijä tuntematon, Wikimedia Commons (public domain).',
      tekija: 'tuntematon',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mill_Colonnade_in_Karlovy_Vary,_c1919.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-karlovy-vary-cd4024e8.jpg',
        lyhyt: 'Mlýnská kolonádan uusklassinen päätykolmio ja kattoa koristavat patsaat.',
        selite: 'Lähikuva kolonádan päätykolmiosta, korinttilaispäistä pylväistä ja katolla seisovista patsaista.',
        lahde: 'Valokuva: Txllxt TxllxT, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Txllxt TxllxT',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Karlovy_Vary_Mlynská_Kolonada_Neoclassicism_II.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Karlovy Vary',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuka keisari perusti Karlovy Varyn?',
      'Mitä kaupungin nimi Karlovy Vary tarkoittaa?',
    ],
    korostukset: ['kylpyläkaupunki|kylpyläkaupunki'],
    nappi: 'Kaarle IV:n kylpyläkaupunki, jota saksankieliset kutsuvat Karlsbadiksi',
    // 12.8725 E / 50.23055556 N — en-Wikipedia "Karlovy Vary"
    laudat: {
      maailmankartta: { x: 6262.4, y: 1380.1 },
      europe: { x: 458.4, y: 572.5 },
    },
    teksti: 'Karlovy Vary, saksaksi Karlsbad, on noin 49 000 asukkaan kylpyläkaupunki Ohře- ja '
      + 'Teplá-jokien yhtymäkohdassa Länsi-Böömissä. Sen perusti Kaarle IV 1300-luvulla, ja '
      + 'nimi tarkoittaa Kaarlen kylpyjä. Legendan mukaan keisarin metsästysseurue löysi '
      + 'kuuman lähteen sattumalta, ja lähteen vedellä hän paransi loukkaantuneen jalkansa. '
      + 'Kaupunki kasvoi kylpyläksi 1800-luvulla ja oli suosittu kohde Euroopan '
      + 'aristokratialle; tsaari Pietari Suuri vieraili siellä vuonna 1711. Nykyään siellä on '
      + 'yli 80 lähdettä, joista vain 16 on juotavia, ja vuonna 2021 kaupunki liitettiin '
      + 'Unescon maailmanperintökohteeseen Euroopan suuret kylpyläkaupungit.',
    lahde: 'en-Wikipedia "Karlovy Vary", johdanto-osa ja osiot "History" ja "Spa" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Miten legendan mukaan Karlovy Varyn kuuma lähde löydettiin?',
      vaihtoehdot: [
        'Kalastaja huomasi höyryävän joen',
        'Munkit kaivoivat kaivoa',
        'Karhu johdatti metsästäjät lähteelle',
        'Kaarle IV:n seurue löysi sen sattumalta metsästysretkellä',
      ],
      oikea: 3,
      fakta: 'Kaupunkia kutsuttiin puhekielessä myös nimellä Warmbad, joka tarkoittaa saksaksi '
        + 'lämmintä kylpyä.',
    },
  },
  {
    id: 'hahmotelma-marianske-lazne',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-marianske-lazne-b149bb42.jpg',
      lyhyt: 'Mariánské Lázněn laulava suihkulähde kesäpäivänä puiston keskellä.',
      selite: 'Suihkulähteen vesisuihku ja altaan metallipallot puistossa, jonka takana näkyy metsäinen rinne ja kolonadin kupolirakennus.',
      lahde: 'Valokuva: Harke, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Harke',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Singende_Fontäne_Marianske_Lazne.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-marianske-lazne-1722b7e0.jpg',
        lyhyt: 'Mariánské Lázněn valurautainen kolonnadi sisäänkäynnin puolelta.',
        selite: 'Kolonnadin koristeellinen pääsisäänkäynti, jonka suuressa kaarikuviossa on lasitettu ristikkoikkuna, ja jatkuva lasitettu pylväikkö oikealla.',
        lahde: 'Valokuva: Harke, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Harke',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gusseiserne_Kolonnade_Eingang_Marianske_Lazne.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Mariánské Lázně',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuka lääkäri osoitti Mariánské Lázněn lähteiden parantavat ominaisuudet?',
      'Minkä runon Goethe nimesi kaupungin mukaan?',
    ],
    korostukset: ['Marienbad|Marienbadin'],
    nappi: 'Kylpyläkaupunki, joka on saanut kaupunkioikeudet vasta 1868',
    // 12.70111111 E / 49.96472222 N — en-Wikipedia "Mariánské Lázně"
    laudat: {
      maailmankartta: { x: 6256.7, y: 1391.7 },
      europe: { x: 455.1, y: 579.5 },
    },
    teksti: 'Mariánské Lázně, saksaksi Marienbad, on noin 14 000 asukkaan kylpyläkaupunki Karlovy '
      + 'Varyn alueella Länsi-Böömissä, ja sen nimi tarkoittaa Marian kylpyä. Suurin osa '
      + 'kaupungin rakennuksista on peräisin sen kulta-ajalta 1800-luvun jälkipuoliskolta, '
      + 'jolloin monet julkkikset ja Euroopan huippuhallitsijat tulivat nauttimaan '
      + 'hiilidioksidipitoisista parantavista lähteistä. Lähteet mainitaan asiakirjoissa jo '
      + 'vuonna 1341, mutta lääkinnälliseen käyttöön ne otettiin vasta, kun Teplán luostarin '
      + 'lääkäri Josef Nehr osoitti niiden parantavat ominaisuudet vuosina 1779–1820. '
      + 'Nykyisen nimensä paikka sai vuonna 1808, kylpyläksi se tuli 1818 ja kaupungiksi '
      + '1868. Johann Wolfgang von Goethe nimesi runonsa Marienbadin elegia (1823) kaupungin '
      + 'mukaan.',
    lahde: 'en-Wikipedia "Mariánské Lázně", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-telc',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-telc-fa2a247f.jpg',
      lyhyt: 'Telčin tori renessanssi- ja barokkitaloineen sekä keskellä suihkulähde.',
      selite: 'Kuvassa näkyy Telčin torin väriläiskäinen talorivi, jossa on koristeltuja päätyjä ja sgraffito-kuviointia, sekä torin suihkulähde ja taustalla kaupungin torneja.',
      lahde: 'Valokuva: Scotch Mist, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Scotch Mist',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Telc_03.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-telc-35952a0e.jpg',
        lyhyt: 'Telčin linna ja sen tornit puiston puolelta nähtynä.',
        selite: 'Linnan vaaleat seinät, punaiset katot ja pyöreä kulmatorni näkyvät puiston ja lammen takaa; taustalla kohoaa linnan torni.',
        lahde: 'Valokuva: Funke, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Funke',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Telč_Castle_03.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Telč',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuka rakennutti Telčin linnan renessanssityyliin 1500-luvun puolivälissä?',
      'Minkä tyylisiä Telčin torin talot ovat?',
    ],
    korostukset: ['renessanssi|renessanssityyliin'],
    nappi: 'Renessanssin torikaupunki Määrin ja Böömin rajalla, kalalampien ympäröimänä',
    // 15.45277778 E / 49.18416667 N — en-Wikipedia "Telč"
    laudat: {
      maailmankartta: { x: 6348.4, y: 1425.5 },
      europe: { x: 507.9, y: 600.1 },
    },
    teksti: 'Telč on noin 5 100 asukkaan kaupunki Vysočinan alueella kukkulaisessa maisemassa '
      + 'Křižanovin ylängöllä, kalalampien ympäröimänä. Sen historiallinen keskusta on '
      + 'suojeltu kaupunkimonumenttialueena ja Unescon maailmanperintökohde. Paikallisen '
      + 'legendan mukaan kaupunki perustettiin vuonna 1099, mutta ensimmäinen kirjallinen '
      + 'maininta on vuodelta 1335. 1500-luvun puolivälissä Zachariáš z Hradce rakennutti '
      + 'keskiaikaisen linnan uudelleen renessanssityyliin ja muutti goottilaiset talot '
      + 'renessanssitaloiksi, joissa on arkadit ja koristellut julkisivut. Toria reunustavat '
      + 'yhtenäisesti kunnostetut renessanssi- ja barokkitalot korkeine päätyineen.',
    lahde: 'en-Wikipedia "Telč", johdanto-osa ja osiot "History" ja "Sights" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Kuka muutti Telčin keskiaikaisen linnan renessanssityyliin 1500-luvun puolivälissä?',
      vaihtoehdot: [
        'Kaarle IV',
        'Zachariáš z Hradce',
        'Ottokar I',
        'Albrecht von Wallenstein',
      ],
      oikea: 1,
      fakta: 'Telčin keskellä olevat Štěpnický-, Ulický- ja Staroměstský-lammet muodostavat '
        + 'kaupungin lampijärjestelmän.',
    },
  },
  {
    id: 'hahmotelma-trebic',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-trebic-57e71439.jpg',
      lyhyt: 'Třebíčin Pyhän Procopiuksen basilikan itäpää ja luostarirakennus puutarhan takaa.',
      selite: 'Romaaninen graniittirakennus, jossa on kahdeksankulmainen torni ja pyöreitä ikkunoita. Basilika kuuluu UNESCOn maailmanperintöluetteloon.',
      lahde: 'Valokuva: John Williams, Wikimedia Commons (CC BY 2.0).',
      tekija: 'John Williams',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Church_of_St_Procopius,_Třebíč.jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-trebic-efb93412.jpg',
        lyhyt: 'Katu Třebíčin juutalaiskorttelissa, jossa on tiiviisti värikkäitä vanhoja taloja.',
        selite: 'Kuvassa näkyy kivetty katu ja sen varrella tyypillisiä Zámostín juutalaiskorttelin taloja, joiden takana kohoaa rinne.',
        lahde: 'Valokuva: Frettie, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Frettie',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Street_Leopolda_Pokorného_in_Zámostí,_Třebíč,_Třebíč_District.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-trebic-23590416.jpg',
        lyhyt: 'Pyhän Procopiuksen basilikan sisätila: romaanis-goottilaisia graniittikaaria ja kuoro kaukana.',
        selite: 'Näkymä basilikan länsisisäänkäynniltä kohti kuoroa. Paksut graniittipylväät ja teräväkaariset holvit reunustavat keskikäytävää.',
        lahde: 'Valokuva: Zde, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Zde',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Basilica_of_St._Procopius_in_Třebíč,_interior,_view_from_the_west_entrance,_165259.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Třebíč',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mikä luostari perustettiin Třebíčiin vuonna 1101?',
      'Mikä on Pyhän Procopiuksen basilikan ruusuikkunan erikoisuus?',
    ],
    korostukset: ['basilika|basilika'],
    nappi: 'Määrin kolmanneksi tärkein kaupunki keskiajalla; juutalaiskortteli ja basilika seisovat vierekkäin',
    // 15.88166667 E / 49.215 N — en-Wikipedia "Třebíč"
    laudat: {
      maailmankartta: { x: 6362.7, y: 1424.2 },
      europe: { x: 516.1, y: 599.2 },
    },
    teksti: 'Třebíč on noin 34 000 asukkaan kaupunki Jihlava-joen varrella Vysočinan alueella. '
      + 'Kaupungin historian alku liittyy benediktiiniluostarin perustamiseen vuonna 1101 '
      + 'siihen, missä nykyään on linna, ja laajentumisensa aikana Třebíč oli Määrin '
      + 'kolmanneksi tärkein kaupunki. Juutalaiskortteli ja Pyhän Procopiuksen basilika ovat '
      + 'yhdessä Unescon maailmanperintökohde vuodesta 2003, koska ne todistavat kulttuurien '
      + 'vuorovaikutuksesta usean vuosisadan ajalta. Basilika sai alkunsa 1100-luvun alussa '
      + 'benediktiiniluostarina, ja sen goottilaisiin piirteisiin kuuluu harvinainen '
      + 'kymmenosainen kasvia muistuttava ruusuikkuna.',
    lahde: 'en-Wikipedia "Třebíč", johdanto-osa ja osio "Sights" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-zdar',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-zdar-e426b5b4.jpg',
      lyhyt: 'Zelená Horan pyhiinvaelluskirkko ja sitä ympäröivä tähtimäinen muuri ilmasta.',
      selite: 'Ilmakuvassa näkyy keskellä oleva kirkko ja sen ympärillä punakattoinen, tähtimäisesti mutkitteleva kuorikäytävä (vuoden 2018 ilmakuva).',
      lahde: 'Valokuva: Wolkenkratzer, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Wolkenkratzer',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:KLG_4953_CZ_-_Žďár_nad_Sázavou,_Wallfahrtskirche_Zelená_Hora.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-zdar-8484df6f.jpg',
        lyhyt: 'Pyhän Johannes Nepomukilaisen pyhiinvaelluskirkko Zelená Horalla nousevana valkoisena rakennuksena.',
        selite: 'Vaalea, keskitetty goottilaisbarokkinen kirkko tummanvihreän sipulikupolin ja kultaisten tähtien kanssa. Vuonna 2023 otettu kuva.',
        lahde: 'Valokuva: Jan Beránek, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Jan Beránek',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pilgrimage_Church_of_Saint_John_of_Nepomuk_in_2023_01.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Vihreän vuoren pyhiinvaelluskirkko',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuka arkkitehti suunnitteli Vihreän vuoren pyhiinvaelluskirkon?',
      'Mikä luku hallitsee kirkon suunnitelmaa?',
    ],
    korostukset: ['Santini|Santini'],
    nappi: 'Santinin vuonna 1727 valmistunut pyhiinvaelluskirkko, jonka katto muutettiin palon jälkeen',
    // 15.94205556 E / 49.58019444 N — en-Wikipedia "Pilgrimage Church of Saint John of Nepomuk"
    laudat: {
      maailmankartta: { x: 6364.7, y: 1408.4 },
      europe: { x: 517.3, y: 589.6 },
    },
    teksti: 'Zelená horan eli Vihreän vuoren Pyhän Johannes Nepomukilaisen pyhiinvaelluskirkko on '
      + 'uskonnollinen rakennus Žďár nad Sázavoun laidalla Määrin ja Böömin historiallisen '
      + 'rajan tuntumassa. Se on böömiläisen arkkitehdin Johann Santini Aichelin viimeinen '
      + 'työ, jossa hän yhdisti Borrominin barokkia ja goottilaisia viittauksia. Rakennustyöt '
      + 'alkoivat vuonna 1719, kun katolinen kirkko julisti Johannes Nepomukilaisen kielen '
      + 'turmeltumattomaksi; kirkko vihittiin heti hänen autuaaksi julistamisensa jälkeen '
      + '1720, ja työt jatkuivat vuoteen 1727. Puoli vuosisataa myöhemmin vakavan palon '
      + 'jälkeen katon muotoa muutettiin. Kirkon suhteissa hallitsee luku viisi, ja se '
      + 'julistettiin Unescon maailmanperintökohteeksi vuonna 1994.',
    lahde: 'en-Wikipedia "Pilgrimage Church of Saint John of Nepomuk", johdanto-osa ja osio '
      + '"History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-zatec',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-zatec-c09b0c6f.jpg',
      lyhyt: 'Humalatarha Žatecin torin laidalla, humalaköynnökset korkeiden seipäiden varassa.',
      selite: 'Kuvassa on Žatecin aukion humalapuutarha vuodelta 2020, pieni humalapelto keskellä kaupunkia. Se muistuttaa kaupungin humalaperinteestä.',
      lahde: 'Valokuva: SchiDD, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'SchiDD',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Saaz-Hopfengarten-2020.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-zatec-f2955eca.jpg',
        lyhyt: 'Humalatorni kohoaa Žatecin vanhankaupungin yllä kirkkaan sinistä taivasta vasten.',
        selite: 'Kuvassa on Žatecin humalatorni, joka kuuluu kaupungin toiseen humalamuseoon.',
        lahde: 'Valokuva: Dieringer63, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Dieringer63',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hopfenturm_und_Biertempel_in_Žatec.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-zatec-d7c0dab7.jpg',
        lyhyt: 'Ilmakuva Žatecin vanhastakaupungista punaisine kattoineen ja kirkontorneineen.',
        selite: 'Näkymä humalatornista Žatecin vanhaankaupunkiin, jossa näkyvät kirkkojen tornit ja punaiset tiilikatot.',
        lahde: 'Valokuva: SchiDD, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'SchiDD',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Saaz-Altstadt.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Žatec',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Minkä kasvin viljelyperinteestä Žatec on kuuluisa?',
      'Mikä on kaupungin saksankielinen nimi?',
    ],
    korostukset: ['humala|humalan'],
    nappi: 'Saazin humalakaupunki, jonka panimo on toiminut jo vuodesta 1801',
    // 13.54444444 E / 50.33 N — en-Wikipedia "Žatec"
    laudat: {
      maailmankartta: { x: 6284.8, y: 1375.8 },
      europe: { x: 471.3, y: 569.9 },
    },
    teksti: 'Žatec, saksaksi Saaz, on noin 19 000 asukkaan kaupunki Ohře-joen varrella Ústí nad '
      + 'Labemin alueella Mostin altaassa. Se sai kaupunkioikeudet 1200-luvulla ja on '
      + 'kuuluisa yli 700 vuotta vanhasta Saaz-jalohumalan viljelyperinteestä, jota useat '
      + 'panimot käyttävät. Oluenpanon perinne alkoi siellä vuonna 1261, humalan viljely '
      + 'mainitaan ensimmäisen kerran 1348, ja Žatecin panimo aloitti tuotantonsa vuosina '
      + '1800–1801. Žatec ja Saazin humalamaisema kirjattiin Unescon '
      + 'maailmanperintöluetteloon vuonna 2023, ja kaupungissa on humalamuseo ja panimomuseo.',
    lahde: 'en-Wikipedia "Žatec", johdanto-osa ja osiot "Economy" ja "Culture" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Minkä kasvin yli 700 vuotta vanhasta viljelyperinteestä Žatec on kuuluisa?',
      vaihtoehdot: [
        'Viinirypäleistä',
        'Ohrasta',
        'Humalasta',
        'Tupakasta',
      ],
      oikea: 2,
      fakta: 'Žatecissa järjestetään joka syyskuu torilla humalasadon juhla Dočesná.',
    },
  },
  {
    id: 'hahmotelma-lostice',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-lostice-a82bf864.jpg',
      lyhyt: 'Viisi pientä pyöreää olomoucké tvarůžky -juustoa valkoisella lautasella.',
      selite: 'Lähikuva olomoucké tvarůžky -juustoista, joita kutsutaan myös syrečkyiksi. Juustot ovat pieniä, keltaisia ja kiekonmuotoisia.',
      lahde: 'Valokuva: Chmee2, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Chmee2',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Olomoucké_tvarůžky_(3).jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-lostice-e91d243c.jpg',
        lyhyt: 'Keltainen talo ja Tvarůžková cukrárna -kahvila-kondiittori Lošticessa.',
        selite: 'Lošticen Komenského-kadun talo, jonka kyltissä lukee Tvarůžková cukrárna eli juustokahvila. Ikkunalaatikoissa kukkii punaisia kukkia.',
        lahde: 'Valokuva: Blanka Post, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Blanka Post',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tvarůžková_cukrárna.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-lostice-7437f851.jpg',
        lyhyt: 'Näkymä pellon yli Lošticen kaupunkiin ja kaukaisiin vuoriin.',
        selite: 'Panoraama Lošticen kaupungista ja sitä ympäröivistä pelloista. Taustalla häämöttävät vuoret.',
        lahde: 'Valokuva: Topika26, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Topika26',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Loštice2.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Loštice',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Minkä juuston valmistuksesta Loštice on tunnettu?',
      'Minkä joen varrella Loštice sijaitsee?',
    ],
    korostukset: ['tvarůžky|tvarůžky'],
    nappi: 'Třebůvkan rannan pikkukaupunki, jonka juutalaisyhteisö on ollut kaupungista riippumaton vuoteen 1850',
    // 16.92777778 E / 49.7425 N — en-Wikipedia "Loštice"
    laudat: {
      maailmankartta: { x: 6397.6, y: 1401.4 },
      europe: { x: 536.2, y: 585.4 },
    },
    teksti: 'Loštice on noin 3 100 asukkaan kaupunki Třebůvka-joen varrella Olomoucin alueella '
      + 'Määrissä. Se on tunnettu aromikkaan Olomoucké tvarůžky -juuston valmistuksesta. '
      + 'Kaupungin ensimmäinen kirjallinen maininta on piispa Bruno von Schauenburgin '
      + 'asiakirjassa vuodelta 1267, ja se ylennettiin kaupungiksi luultavasti vuonna 1353. '
      + 'Juutalaisten läsnäolo on dokumentoitu vuodesta 1544 alkaen: juutalainen hautausmaa '
      + 'perustettiin vuonna 1554 ja synagoga rakennettiin vuonna 1571, ja vuosina 1581–1850 '
      + 'juutalaisyhteisö oli kaupunginhallinnosta riippumaton.',
    lahde: 'en-Wikipedia "Loštice", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-stramberk',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-stramberk-d6584726.jpg',
      lyhyt: 'Štramberkin vanhakaupunki, kirkon torni ja Trúba-torni metsäisen kukkulan päällä.',
      selite: 'Näkymä Štramberkin kattojen ja kirkontornin yli metsäiselle kukkulalle, jonka päällä kohoaa Trúba-torni. Kuva on otettu Kopec-kadulta.',
      lahde: 'Valokuva: Palickap, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Palickap',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Štramberk,_náměstí_a_Trúba_z_ulice_Kopec.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-stramberk-eb51216d.jpg',
        lyhyt: 'Štramberské uši -leivonnaisia eli Štramberkin korvia lautasella.',
        selite: 'Kuvassa on Štramberkin korvia eli Štramberské uši -leivonnaisia lautasella. Ne ovat Štramberkin tunnettu erikoisuus.',
        lahde: 'Valokuva: Manka (cs.wikipedia), Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Manka (alkuperäinen lataaja cs.wikipediassa)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Štramberské_uši.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-stramberk-82247007.jpg',
        lyhyt: 'Štramberkin Trúba-torni kohoaa puiden takaa sinistä taivasta vasten.',
        selite: 'Lähikuva Štramberkin Trúba-tornista, jonka yläosassa on puinen ulkoneva kehä ja kartiomainen katto.',
        lahde: 'Valokuva: Helcapas, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Helcapas',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Štramberk_-_Trúba.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Štramberk',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Minkä makeisen valmistuksesta Štramberk on tunnettu?',
      'Mikä on Štramberkin tunnetuin torni?',
    ],
    korostukset: ['Štramberkin korvat|Štramberkin korvat'],
    nappi: 'Määrin veljeskunnan vanha kaupunki, jossa kalkkikiven louhinta on juuri alkanut',
    // 18.1175 E / 49.59166667 N — en-Wikipedia "Štramberk"
    laudat: {
      maailmankartta: { x: 6437.3, y: 1407.9 },
      europe: { x: 559.1, y: 589.3 },
    },
    teksti: 'Štramberk on noin 3 500 asukkaan kaupunki Määrin ja Sleesian esivuoristossa 25 '
      + 'kilometriä Ostravasta lounaaseen. Se on tunnettu Štramberkin korvat '
      + '-perinneleivonnaisesta, jota on valmistettu noin 800 vuotta; valmistus on EU:n '
      + 'suojattu maantieteellinen merkintä ja ensimmäinen tšekkiläinen tuote, jolla se on. '
      + 'Kaupungin tärkeimpiä nähtävyyksiä ovat Trúba-torni ja Pyhän Johannes Nepomukilaisen '
      + 'kirkko. Kaupunki perustettiin vuonna 1359 Määrin markkreivi Johann Henryn toimesta, '
      + 'ja 1400-luvulta se oli Määrin veljeskunnan keskus. 1800-luvun jälkipuoliskolla '
      + 'siellä alkoi kalkkikiven louhinta, ja rautatie avattiin vuonna 1881.',
    lahde: 'en-Wikipedia "Štramberk", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-mlada-boleslav',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-mlada-boleslav-594507c3.jpg',
      lyhyt: 'Vuoden 1906 Laurin & Klement Voiturette type A -auto Škoda-museossa.',
      selite: 'Kuvassa on Laurin & Klementin vuoden 1906 Voiturette type A Mladá Boleslavin Škoda-museossa. Ruskeanpunaisessa autossa on puupinnat ja messinkilyhdyt.',
      lahde: 'Valokuva: Michał Derela, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Michał Derela',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:1906_Laurin_&_Klement_Voiturette_type_A_P240729.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-mlada-boleslav-92bd5be6.jpg',
        lyhyt: 'Ilmakuva Mladá Boleslavin linnasta ja vanhankaupungin katoista.',
        selite: 'Ilmakuva Mladá Boleslavin linnasta, joka kohoaa kalliojyrkänteen reunalla. Vanhakaupunki jatkuu linnan takana.',
        lahde: 'Valokuva: Zdeněk Fiedler, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Zdeněk Fiedler',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hrad_(Mladá_Boleslav).JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Mladá Boleslav',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Kuka kaupungin perusti ja mistä sen nimi tulee?',
      'Mikä yhtiö osti Laurin & Klementin vuonna 1925?',
    ],
    korostukset: ['Laurin & Klement|Laurin & Klement'],
    nappi: 'Nuoren Boleslavin kaupunki, jossa tehtaat kasvavat; auto tulee vasta 1895',
    // 14.90444444 E / 50.4125 N — en-Wikipedia "Mladá Boleslav"
    laudat: {
      maailmankartta: { x: 6330.1, y: 1372.2 },
      europe: { x: 497.4, y: 567.8 },
    },
    teksti: 'Mladá Boleslav on noin 48 000 asukkaan kaupunki Keski-Böömin alueella Jizera-joen '
      + 'vasemmalla rannalla. Se on Tšekin autoteollisuuden keskus Škoda Auton ansiosta ja '
      + 'siksi koko Tšekin teollisuuden keskus. Kaupunki on nimetty perustajansa, herttua '
      + 'Boleslav II:n mukaan, jota kutsuttiin Nuoreksi, ja nimi erottaa sen Stará '
      + 'Boleslavista. 1800-luvulla kaupunki vaurastui, ja siellä perustettiin uusia kouluja, '
      + 'teattereita, museoita ja tehtaita; vuonna 1895 perustettiin Laurin & Klement -yhtiö, '
      + 'Škoda Auton edeltäjä, ja autoteollisuudesta tuli kaupungin talouden päävoima. Škoda '
      + 'Works osti yhtiön vuonna 1925.',
    lahde: 'en-Wikipedia "Mladá Boleslav", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Minkä vuonna 1895 Mladá Boleslavissa perustetun yhtiön seuraaja Škoda Auto on?',
      vaihtoehdot: [
        'Laurin & Klement',
        'Tatra',
        'Praga',
        'Walter',
      ],
      oikea: 0,
      fakta: 'Mladá Boleslav on myös teknisen koulutuksen keskus, ja siellä toimii Škoda Auto '
        + '-yliopisto.',
    },
  },
  {
    id: 'hahmotelma-pribram',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-pribram-704dade5.jpg',
      lyhyt: 'Vojtěch-kaivoksen punatiilinen kaivorakennus Březové Horyn kaupunginosassa.',
      selite: 'Näkymä Vojtěšský důl -kaivosrakennukseen Příbramin Březové Horyssa. Rakennuksen seinissä on kiveä ja punaista tiiltä, ja siinä lukee Vojtěšský důl.',
      lahde: 'Valokuva: Ivo Bešťák, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Ivo Bešťák',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Důl_Vojtěch_(celkový_pohled).JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-pribram-9fa9cfcf.jpg',
        lyhyt: 'Ilmakuva Svatá Horan pyhiinvaelluspaikasta syksyisen metsän keskellä.',
        selite: 'Ilmakuva Příbramin Svatá Horan pyhiinvaelluspaikasta. Vihreäkattoiset tornit ja kapellirakennukset ympäröivät keskellä olevaa kirkkoa.',
        lahde: 'Valokuva: Jirka Jiroušek, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jirka Jiroušek',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Svatá_Hora_u_Příbrami_-_letecký_pohled.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-pribram-a8ad8e60.jpg',
        lyhyt: 'Höyrykäyttöinen nostokone suurine vauhtipyörineen Vojtěch-kaivoksella.',
        selite: 'Breitfeld & Daněkin valmistama höyrykäyttöinen nostokone Vojtěšský důl -kaivoksella Březové Horyssa Příbramissa.',
        lahde: 'Valokuva: PatrikPaprika, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'PatrikPaprika',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vojtěšský_důl,_parní_těžní_stroj_(1).jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Příbram',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Minkä metallin louhinta teki Příbramista Habsburgien monarkian tuottoisimman kaivoskaupungin?',
      'Mikä pyhiinvaelluskohde kohoaa Příbramin yllä?',
    ],
    korostukset: ['Svatá Hora|Svatá Hora'],
    nappi: 'Habsburgien monarkian tuottoisin hopeakaivoskaupunki; Svatá Hora kohoaa sen yllä',
    // 14.00916667 E / 49.68833333 N — en-Wikipedia "Příbram"
    laudat: {
      maailmankartta: { x: 6300.3, y: 1403.7 },
      europe: { x: 480.2, y: 586.8 },
    },
    teksti: 'Příbram on noin 33 000 asukkaan kaupunki Litavka-joen varrella Brdyn ylängöllä '
      + 'Keski-Böömissä, ja se on tunnettu kaivoshistoriastaan. Kaupungin ensimmäinen '
      + 'maininta on vuodelta 1216, ja 1400-luvulla alueelle tuli saksalaisia louhimaan '
      + 'hopeaa. Hopeankaivuu alkoi kehittyä 1500-luvun alussa, ja 1700-luvulla Příbramista '
      + 'tuli koko Habsburgien monarkian tuottoisimman hopeankaivuun paikka; kaupunki oli '
      + 'keskuskaivosviraston kotipaikka. Vuoden 1989 sametillisen vallankumouksen jälkeen '
      + 'vanhat hopea- ja lyijykaivokset sekä modernit uraanikaivokset suljettiin. Kaupungin '
      + 'yllä kohoava Svatá Hora on Böömin vanhin ja tärkein Marian pyhiinvaelluskohde.',
    lahde: 'en-Wikipedia "Příbram", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä metallin louhinta teki Příbramista Habsburgien monarkian tuottoisimman '
        + 'kaivoskaupungin 1700-luvulla?',
      vaihtoehdot: [
        'Kulta',
        'Hopea',
        'Kupari',
        'Rauta',
      ],
      oikea: 1,
      fakta: 'Příbramin kaivosmuseo esittelee kaupungin kaivoshistoriaa.',
    },
  },
  {
    id: 'hahmotelma-kamenicky-senov',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-kamenicky-senov-871606f7.jpg',
      lyhyt: 'Hiotusta lasia ja kristalleja oleva tuoli lasivitriinissä Kamenický Šenovin lasimuseossa.',
      selite: 'Kuvassa on lasimuseon näyttelyesine, tuoli, jonka jalat ja selkänoja on tehty hiotusta lasista. Istuin on peitetty pienillä kimaltavilla kristalleilla.',
      lahde: 'Valokuva: palickap, Wikimedia Commons (CC BY 3.0).',
      tekija: 'palickap',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sklářské_muzeum_Kamenický_Šenov_1.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cze-nosto-kamenicky-senov-3eed5780.jpg',
        lyhyt: 'Kamenický Šenovin lasimuseon vanha puuverhoiltu rakennus.',
        selite: 'Lasimuseon eli Sklářské muzeumin rakennus Kamenický Šenovissa. Talon yläosa on tummaa puuta ja katto on punainen.',
        lahde: 'Valokuva: VitVit, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'VitVit',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kamenický_Šenov_sklářské_muzeum_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kamenický Šenov',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Milloin Kamenický Šenovin lasinvalmistajat mainitaan ensimmäisen kerran?',
      'Mikä kaupungin koulu on maailman vanhin omalla alallaan?',
    ],
    korostukset: ['lasinvalmistus|lasinvalmistukseen'],
    nappi: 'Lasinjalostuksen kaupunki, jonka lasikoulu perustettiin 1856',
    // 14.47111111 E / 50.7775 N — en-Wikipedia "Kamenický Šenov"
    laudat: {
      maailmankartta: { x: 6315.7, y: 1356.2 },
      europe: { x: 489, y: 558.2 },
    },
    teksti: 'Kamenický Šenov on noin 3 800 asukkaan kaupunki Česká Lípan alueella Keski-Böömin '
      + 'ylängöllä. Kaupungin historia ja kehitys on sidoksissa lasinvalmistukseen '
      + '1600-luvulta nykypäivään. Ensimmäinen kylä, Sonov, mainitaan vuonna 1352, ja sen '
      + 'perustivat sorbit; kylä kuului Česká Kamenicen tilaan. 1600- ja 1700-luvuilla lasin '
      + 'jalostus ja lasikauppa kasvoivat valtavasti, ja asukkaat alkoivat rikastua. '
      + 'Kaupungin lasialan keskiasteen koulu perustettiin vuonna 1856, ja se on maailman '
      + 'vanhin oman alansa ammattikoulu; lasimuseo toimii noin vuonna 1770 rakennetussa '
      + 'talossa.',
    lahde: 'en-Wikipedia "Kamenický Šenov", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Mikä Kamenický Šenovin koulu on maailman vanhin omalla alallaan?',
      vaihtoehdot: [
        'Kaivoskoulu',
        'Kelloseppäkoulu',
        'Lasialan ammattikoulu',
        'Kutomakoulu',
      ],
      oikea: 2,
      fakta: 'Kaupungin tunnetuin maamerkki on Panská skála -basalttikallio.',
    },
  },
];
