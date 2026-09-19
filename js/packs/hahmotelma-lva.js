/*
 * LATVIAN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan, Portugalin, Kreikan, Itävallan, Alankomaiden, Tanskan, Ruotsin,
 * Suomen, Romanian, Slovenian ja Viron jälkeen Latvia.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48 ja 51) =
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä muut EU-maiden pakat, viimeisimpänä Viro
 * (js/packs/hahmotelma-est.js): jokaisella nostolla on valmis sisältö —
 * `teksti` 3–5 virkettä en-Wikipedian (tarvittaessa lv-Wikipedian
 * lisälähteenä, kun en-artikkeli on tynkä) artikkelista omin sanoin suomeksi
 * (ei käännöskopiota, ei keksittyjä faktoja, `lahde`-riville artikkeli ja
 * tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi pulun
 * kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva` +
 * `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi ja
 * lähdesivu kirjattuna, jokaisen kuvan tiedot luettu Commonsin
 * extmetadata-rajapinnasta; kuvatekstit ilman lähdeviittauksia lukijalle).
 * PAATOKSET 51: noin joka kolmannella nostolla on lisäksi `visa`-kenttä
 * (kysymys, neljä vaihtoehtoa, oikea indeksi, fakta) täsmälleen kuten
 * kaupunkien täkynostoilla (js/fokusnosto.js nostonVisa): vastaus löytyy
 * noston omasta tekstistä. Vuonna 1873 Latvian alue on jaettu Venäjän
 * keisarikunnan Kuurinmaan, Liivinmaan ja Vitebskin (Latgale)
 * kuvernementteihin; kartanoiden omistajat ovat pääosin baltiansaksalaisia
 * ja kansallinen herääminen on käynnissä (Latvian ensimmäinen
 * yleislaulujuhla Riikassa 1873). Myöhemmät kohteet ovat mukana: teksti on
 * nykytietoa ja `nappi` katsoo vuodesta 1873 eteenpäin tai sanoo
 * rehellisesti, että kohde tulee vasta myöhemmin.
 *
 * MIKSI NÄMÄ KOHTEET: Latvian pakissa (js/packs/maastokohteet-lva.js) on jo
 * Gaiziņkalns, Itämeri, Väinäjoki, Rundālen palatsi, Cēsisin linna, Turaidan
 * ruusu, Liepāja, Sabile, Jelgava, Daugavpilsin linnoitus, Engure, Ventas
 * rumba, Kolkan niemi, Aglonan basilika ja Glückin raamattumuseo sekä Riian
 * kaupunkinostot. Tämän pakin kohteet eivät toista niitä (ei samoja id:itä
 * eikä nimiä) eivätkä ole niiden vieressä (lähin nosto yli 8 lautayksikön
 * päässä olemassa olevista).
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on pienempi),
 * nimeltään `lva-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on kirjattu
 * pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`. Kuvia EI
 * ole viety ämpäriin eikä committoitu repoon (Fable vie); siihen asti
 * osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan sarjasta.
 * Tiedostot ovat kansiossa /Users/samireivinen/Matkakirja-nostot-kuvat/lva/.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-maiden hahmotelmilla: nämä ovat kaikki
 * kaupungin (Riika, maan ainoa pelikaupunki) ulkopuolella, lähin nosto yli 8
 * lautayksikön päässä kaupungista (raja KAUPUNGIN_KOHDALLA_SADE on 7), ja
 * js/fokuskohteet.js liittää rivit KOHDE_MAAT.LVA:iin. `lahi: true` on sama
 * lähizoomiportti kuin Ranskan hahmotelmalla (js/pallolauta/nostot.js
 * PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 20.9.2026) ja artikkelin nimi on
 * kirjattu rivin viereen. Laudan luvut on laskettu pelin omalla kaavalla
 * (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu maan fokuslehden rajaukseen
 * (`osuuLehteen`).
 */

/** Latvian hahmotelmanostot: sisällölliset kohteet kaupungin (Riika) ulkopuolella. */
export const HAHMOTELMA_LVA = [
  {
    id: 'hahmotelma-ventspils',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-ventspils-937a7fa2.jpg',
      lyhyt: 'Ventspilsin linna keltaisine seinineen ja punaisine kattoineen.',
      selite: 'Kaupungin nimi viittaa Liivinmaan ritarikunnan linnaan Venta-joen rannalla, '
        + 'jonka ympärille Ventspils kasvoi.',
      lahde: 'Valokuva: Ymblanter, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ymblanter',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ventspils_Castle_from_the_southwest.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-ventspils-5c5f120d.jpg',
        lyhyt: 'Ilmakuva Ventspilsin linnasta ja Venta-joen varren satamasta.',
        selite: 'Ventspils sijaitsee Venta-joen suulla, jossa joki laskee Itämereen, ja sen '
          + 'satama on jäätymätön. Joen vastarannalla näkyvät laiturien nosturit ja isot '
          + 'hallit.',
        lahde: 'Valokuva: Edgars Šulcs, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Edgars Šulcs',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ventspils_viduslaiku_pils_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-ventspils-b8646287.jpg',
        lyhyt: 'Pyhän Nikolauksen luterilainen kirkko Ventspilsissä, valmistunut vuonna 1835.',
        selite: 'Kirkon julkisivua hallitsevat korkeat pylväät, ja sen päällä kohoaa '
          + 'kupolikattoinen torni. Kirkko sijaitsee Ventspilsin vanhassakaupungissa '
          + 'raatihuoneentorin vieressä.',
        lahde: 'Valokuva: Normunds Kolby, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Normunds Kolby',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ventspils_luterāņu_baznīca_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ventspils',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minne Kuurinmaan herttuan laivasto Ventspilsistä aikoinaan lähti?',
      'Miksi laivanrakennus ja kauppa elpyivät Ventspilsissä vasta noin vuonna 1850?',
    ],
    korostukset: ['Hansaliitto|Hansaliiton', 'Liivinmaan ritarikunta|Liivinmaan ritarikunnan'],
    nappi: 'Kauppa ja laivanrakennus elpyivät vasta noin 1850; satama modernisoidaan vasta '
      + '1890-luvulla',
    // 21.5733 E / 57.3906 N — en-Wikipedia "Ventspils"
    laudat: {
      maailmankartta: { x: 6552.4, y: 1053.2 },
      europe: { x: 625.4, y: 384.2 },
    },
    teksti: 'Ventspils on Kuurinmaalla Latvian luoteisosassa sijaitseva kaupunki, joka ulottuu '
      + 'Venta-joen suulle Itämeren rannalle ja jonka satama on jäätymätön. Nimi '
      + 'tarkoittaa kirjaimellisesti "linnaa Venta-joella", ja se viittaa Liivinmaan '
      + 'ritarikunnan linnaan, jonka ympärille kaupunki kasvoi. Kaupunkioikeudet se sai '
      + 'vuonna 1314, ja siitä tuli tärkeä Hansaliiton kauppakaupunki. Kuurinmaan '
      + 'herttuakunnan aikana Ventspilsissä rakennettiin 44 sotalaivaa ja 79 kauppalaivaa. '
      + 'Puolan kolmannen jaon jälkeen vuonna 1795 kaupunki siirtyi Venäjän '
      + 'keisarikunnalle, mutta laivanrakennus ja kauppa nousivat uudelleen tärkeiksi '
      + 'vasta noin vuonna 1850.',
    lahde: 'en-Wikipedia "Ventspils", johdanto-osa ja osiot "History" ja "Economy" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mitä Ventspilsin nimi tarkoittaa kirjaimellisesti?',
      vaihtoehdot: [
        'Linna Venta-joella',
        'Meren ja joen portti',
        'Tuulten satama Itämerellä',
        'Ritarien lepopaikka',
      ],
      oikea: 0,
      fakta: 'Kuurinmaan herttuan laivasto lähti Ventspilsistä perustamaan siirtomaita '
        + 'Gambiaan ja Tobagolle. Nykyäänkin satamasta lastataan laivoihin paljon öljyä ja '
        + 'muita raaka-aineita.',
    },
  },
  {
    id: 'hahmotelma-jurmala',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-jurmala-f3aed3e3.jpg',
      lyhyt: 'Valkoinen hiekkaranta, vartiotorni ja sininen lippu Jūrmalan rannalla.',
      selite: 'Jūrmalan ranta on 33 kilometriä pitkä ja peittyy valkoiseen kvartsihiekkaan. '
        + 'Rantavesi on matalaa, joten uiminen on turvallista.',
      lahde: 'Valokuva: Trogain, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Trogain',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Jurmala_2017_05.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-jurmala-b0bdac0d.jpg',
        lyhyt: 'Vihreä puutalo puiden varjossa Jūrmalassa Jomas-kadun varrella.',
        selite: 'Puutalot ovat Jūrmalan tunnusomaisinta arkkitehtuuria: kaupungissa on yli '
          + '4000 puurakennusta, joista monet ovat 1800-luvulta ja 1900-luvun '
          + 'alkupuoliskolta.',
        lahde: 'Valokuva: Olgerts V, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Olgerts V',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Jūrmala_-_Jomas_iela_92_k2.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-jurmala-461d5199.jpg',
        lyhyt: 'Puinen polku kulkee männikön halki kohti Bulduren rantaa Jūrmalassa.',
        selite: 'Meri-ilma, mäntyjen tuoksu ja hiekkaranta houkuttelivat Jūrmalaan useita '
          + 'sanatorioita. Bulduri on yksi kaupungin ketjuun kuuluvista lomakohteista.',
        lahde: 'Valokuva: Smiley.toerist, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Smiley.toerist',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bulduru_beach_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Jūrmala',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi rautatie sai Jūrmalan kasvamaan kylpyläkaupungiksi?',
      'Mitä meripihka on, ja miksi sitä löytyy Itämeren rannoilta?',
    ],
    korostukset: ['meripihka|meripihkan', 'puutalot|puutalot'],
    nappi: 'Rautatie Riikasta aukeaa vasta 1877, mutta rannalla on käyty lepäämässä jo '
      + 'vuosikymmeniä',
    // 23.7703 E / 56.9681 N — en-Wikipedia "Jūrmala"
    laudat: {
      maailmankartta: { x: 6625.7, y: 1073.3 },
      europe: { x: 667.6, y: 395.3 },
    },
    teksti: 'Jūrmala on kylpyläkaupunki Riian Lahden ja Lielupe-joen välisellä kannaksella '
      + 'noin 25 kilometrin päässä Riiasta. Nimi tulee latvian sanoista jūra ("meri") ja '
      + 'mala ("reuna"), joten se tarkoittaa suunnilleen "merenrantaa". Kaupunki koostuu '
      + 'ketjusta pieniä lomakohteita, ja sen valkohiekkainen ranta on 33 kilometriä '
      + 'pitkä; keväisin ja syksyisin rannalta voi löytää meripihkan paloja. '
      + 'Lomanviettäjät alkoivat tulla rannalle 1700-luvun lopulla ja 1800-luvun alussa: '
      + 'ensin varakkaat maanomistajat ja sitten venäläiset upseerit, ja Riian ja Tukumsin '
      + 'välinen rautatie vuonna 1877 kasvatti kävijämääriä paljon. Kaupungin '
      + 'tunnusomaisia piirteitä ovat 1800- ja 1900-luvuilta peräisin olevat puutalot, '
      + 'joita on yli 4000.',
    lahde: 'en-Wikipedia "Jūrmala", johdanto-osa ja osiot "Names and administrative history", '
      + '"History", "Architecture" ja "Beach" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kemeri',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-kemeri-bee607b9.jpg',
      lyhyt: 'Suuren Ķemerin suon vaalea lampi ja nuori mänty.',
      selite: 'Suuri Ķemerin suo on kansainvälisesti tärkeä kosteikko. Kohosuon ravinteeton '
        + 'maaperä sallii vain niukan kasvilajiston, jossa on runsaasti sammalia ja '
        + 'kämmekkäitä.',
      lahde: 'Valokuva: Karlis Ustups, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Karlis Ustups',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:20130608-05(Lielais_Ķemeru_tīrelis).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-kemeri-593280f5.jpg',
        lyhyt: 'Lampi ja horisontissa näkyvä torni Suurella Ķemerin suolla.',
        selite: 'Suolla kulkee pitkospolkuja, joista pidempi (3,4 kilometriä) päättyy '
          + 'näköalatasanteelle. Valokuvaajat pitävät sitä suosittuna auringonnousun ja '
          + '-laskun aikaan.',
        lahde: 'Valokuva: Егор Журавлёв from Smarde, Latvia, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Егор Журавлёв from Smarde, Latvia',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kemeri-Big_bog-2017.05_(35761713873).jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-kemeri-7f8ac80e.jpg',
        lyhyt: 'Rikkilähteen puinen tasanne Ķemerin kansallispuiston metsässä.',
        selite: 'Ķemerin rikkilähteet syntyvät, kun maaperän kipsi ja bakteerit tuottavat '
          + 'rikkivetyä, joka liukenee veteen. Lähteiden ympärille kehittyi 1800-luvulla '
          + 'useita kylpylöitä.',
        lahde: 'Valokuva: Misiek2, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Misiek2',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ķemeri_National_Park_-_sulphur_spring,_2022.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ķemeri',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Ķemerin lähdevedessä on rikkiä, ja miksi sitä pidettiin parantavana?',
      'Mitä kasveja kohosuolla voi kasvaa, vaikka ravinteita on vähän?',
    ],
    korostukset: ['karpalot|karpaloita', 'rikkilähteet|rikkilähteitä'],
    nappi: 'Rikkilähteet houkuttivat 1800-luvulla kylpylöitä; kansallispuisto perustetaan '
      + 'vasta vuonna 1997',
    // 23.5125 E / 56.9517 N — en-Wikipedia "Ķemeri National Park"
    laudat: {
      maailmankartta: { x: 6617.1, y: 1074.1 },
      europe: { x: 662.6, y: 395.8 },
    },
    teksti: 'Ķemerin kansallispuisto sijaitsee Jūrmalan länsipuolella, ja se perustettiin '
      + 'vuonna 1997. Puisto on 381,65 neliökilometrillään Latvian kolmanneksi suurin: '
      + 'sitä peittävät enimmäkseen metsät ja suot, joista merkittävin on Suuri Ķemerin '
      + 'suo. Alueella on myös järviä, jotka ovat Litorinameren entisiä laguuneja. Puisto '
      + 'suojelee luonnon rikkilähteitä ja parantaviksi katsottuja mutia, joita on '
      + 'käytetty vuosisatojen ajan ja jotka synnyttivät 1800-luvulla useita lomakohteita, '
      + 'kylpylöitä ja parantoloita. Suolla kasvaa syötäviä marjoja, kuten karpaloita ja '
      + 'hillaa, ja siellä on pitkospolut, joista pidempi on 3,4 kilometriä.',
    lahde: 'en-Wikipedia "Ķemeri National Park", johdanto-osa ja osiot "Ecosystem", "Moss Bog '
      + 'Berries", "Sulfur Springs" ja "Tourism" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mikä sai aikaan Ķemerin kylpylät ja parantolat 1800-luvulla?',
      vaihtoehdot: [
        'Meripihkakaivokset ja hiekkarannat',
        'Rikkilähteet ja parantavat mudat',
        'Kuumat kalliolähteet ja suolajärvet',
        'Turvekaivokset ja rautamalmi',
      ],
      oikea: 1,
      fakta: 'Ķemerin kohosuo on metsäviklon ja kapustarinnan ainoa pesimäympäristö '
        + 'Latviassa. Rikkilähteiden vesiä ja mutia käytetään erityisesti '
        + 'ruoansulatuselinten ja ihon vaivojen hoitoon.',
    },
  },
  {
    id: 'hahmotelma-jaunpils',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-jaunpils-90729887.jpg',
      lyhyt: 'Jaunpilsin linnan pyöreä torni ja punaiset tiilikatot sinistä taivasta vasten.',
      selite: 'Linnan massiivinen pyöreä torni rakennettiin 1400-luvulla, ja sen halkaisija on '
        + '11,5 metriä.',
      lahde: 'Valokuva: Julian Nyča, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Julian Nyča',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Jaunpils_Castle.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-jaunpils-1d883a29.jpg',
        lyhyt: 'Kaiverros Jaunpilsin linnasta vuoden 1866 albumista.',
        selite: 'Kuvassa linna kohoaa veden takana kirkon tornin vierellä. Kaiverruksen '
          + 'alareunassa lukee saksaksi Schloss Neuenburg in Kurland: Neuenburg on '
          + 'Jaunpilsin saksankielinen nimi.',
        lahde: 'Valokuva: Wilhelm Siegfried Stavenhagen, Wikimedia Commons (Public domain).',
        tekija: 'Wilhelm Siegfried Stavenhagen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Jaunpils_1866.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-jaunpils-1d0a4873.jpg',
        lyhyt: 'Jaunpilsin linna heijastuu lammen pintaan pilvisenä päivänä.',
        selite: 'Linnaa ympäröivät ennen joka puolelta vesiesteet. Lammen pinnassa heijastuvat '
          + 'linnan kiviseinät ja punaiset katot.',
        lahde: 'Valokuva: Modris Putns, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Modris Putns',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Jaunpils_castle_(3).jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Jaunpilsin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mistä tiedetään, milloin keskiaikainen Jaunpilsin linna on oikeasti rakennettu?',
      'Miksi Jaunpilsin linnaa ympäröivät ennen joka puolelta vesiesteet?',
    ],
    korostukset: ['Neuenburg|Neuenburg', 'von der Recke|von der Recke'],
    nappi: 'Von der Recken aatelissuvun linnakartano, jonka suku omisti vielä 1900-luvun '
      + 'alkuun asti',
    // 23.0126 E / 56.7315 N — en-Wikipedia "Jaunpils"
    laudat: {
      maailmankartta: { x: 6600.4, y: 1084.6 },
      europe: { x: 653, y: 401.6 },
    },
    teksti: 'Jaunpilsin linna eli saksaksi Neuenburg on Liivinmaan ritarikunnan rakennuttama '
      + 'keskiaikainen linna Semgallian alueella Latviassa. Se mainitaan kirjallisissa '
      + 'lähteissä ensimmäisen kerran vuonna 1411, ja se on luultavasti rakennettu '
      + '1300-luvun jälkipuoliskolla tai aivan 1400-luvun alussa; usein mainittu vuosi '
      + '1301 ei perustu asiakirjoihin. Kenttäkivistä ja yläosistaan tiilestä muurattu '
      + 'linna muodostaa epäsäännöllisen nelikulmion (41 × 30 metriä), ja 1400-luvulla sen '
      + 'kulmaan lisättiin massiivinen pyöreä torni. Vuonna 1576 linna siirtyi Dobelen '
      + 'viimeiselle ritarikunnan komtuurille Matthias von der Reckelle, ja hänen sukunsa '
      + 'omisti sen 1900-luvun alkuun asti. Yhdessä linnan saleista on Madonna ja lapsi '
      + '-reliefi, jonka on usein luultu 1500-luvun työksi, mutta joka on todennäköisesti '
      + '1800-luvulta.',
    lahde: 'en-Wikipedia "Jaunpils" ja lv-Wikipedia "Jaunpils pils", johdanto-osat ja osiot '
      + '"Vēsture" ja "Apraksts" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-slitere',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-slitere-5ec7997c.jpg',
      lyhyt: 'Ilmakuva Slīteren lehtimetsistä ja niityistä Sinisten kukkuloiden alueella.',
      selite: 'Slīteren lehtimetsät kasvavat pääosin Zilie Kalni eli Sinisten kukkuloiden '
        + 'alueella, joka oli aikoinaan Baltian jääjärven muinainen ranta.',
      lahde: 'Valokuva: Mikus Porietis, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Mikus Porietis',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Šlīteres_Zilo_kalnu_krauja.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-slitere-2d16708b.jpg',
        lyhyt: 'Pēterezers-järven tyyni vesi ja rantametsä Slīteren kansallispuistossa.',
        selite: 'Puiston pinta-ala on pieni, mutta siellä kasvaa satoja kasvi- ja '
          + 'sammallajeja, joista 29 ei esiinny missään muualla Latviassa.',
        lahde: 'Valokuva: Dace Kundrāte, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Dace Kundrāte',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pēterezera_ainava.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-slitere-c616784b.jpg',
        lyhyt: 'Hiekkaranta ja tuulen taivuttamat männyt Slīteren rannikolla.',
        selite: 'Puistosta noin 30 prosenttia peittyy havumetsää, ja rannikon hiekkaa '
          + 'reunustavat männiköt. Voimakkaiden myrskyjen jälkeen rannalta löytyy joskus '
          + 'meripihkaa.',
        lahde: 'Valokuva: Schokifaktor, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Schokifaktor',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Slitere.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Slītere',
    tyyppi: 'meri',
    lahi: true,
    kysymykset: [
      'Miksi Slīteren yli lentää keväisin ja syksyisin kymmeniä tuhansia lintuja tunnissa?',
      'Mikä oli Baltian jääjärvi, ja mitä sen rannalle jäi?',
    ],
    korostukset: ['Zilie Kalni|Zilie Kalni', 'Baltian jääjärvi|Baltian jääjärven'],
    nappi: 'Kansallispuisto perustetaan vasta vuonna 2000, mutta Siniset kukkulat ovat '
      + 'tuhansia vuosia vanhaa rantaa',
    // 22.2944 E / 57.6242 N — en-Wikipedia "Slītere National Park"
    laudat: {
      maailmankartta: { x: 6576.5, y: 1042 },
      europe: { x: 639.3, y: 378.1 },
    },
    teksti: 'Slītere on Latvian pienin kansallispuisto, joka sijaitsee Kuurinmaan '
      + 'länsirannikolla Kolkan niemen tuntumassa, missä Irben salmi päättyy. Virallisesti '
      + 'puisto perustettiin vuonna 2000, mutta se pohjautuu Slīteren '
      + 'luonnonsuojelualueeseen, joka on yksi Baltian vanhimmista. Tunnetuimpia piirteitä '
      + 'ovat Zilie Kalni eli "Siniset kukkulat", jotka olivat tuhansia vuosia sitten '
      + 'Baltian jääjärven muinaista rantaa, sekä lehtimetsät, dyynit ja niiden väliset '
      + 'suot. Puisto sijaitsee Itämeren lintujen muuttoreitin varrella, ja sen yli on '
      + 'havaittu jopa 60 000 lintua tunnissa. Rannikolla on lisäksi harmaahylkeiden '
      + 'eteläisimmät poikashoitolat maailmassa, ja myrskyjen jälkeen rannalta voi löytää '
      + 'meripihkaa.',
    lahde: 'en-Wikipedia "Slītere National Park", johdanto-osa ja osiot "Geography", "Flora" '
      + 'ja "Fauna" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-dundaga',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-dundaga-9b641a2e.jpg',
      lyhyt: 'Dundagan linna ja sen edessä oleva lammikko.',
      selite: 'Pitkä, vaalea linnarakennus punaoranssin kattonsa alla kohoaa veden rannalla. '
        + 'Lammikko ympäröi linnaa kolmelta puolelta.',
      lahde: 'Valokuva: Daarznieks, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Daarznieks',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:4_Dundagas-pils-pari-dikim-24apr03.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-dundaga-588eb7cd.jpg',
        lyhyt: 'Dundagan linnan sisäpihan julkisivu erkkereineen.',
        selite: 'Sisäpihaa ympäröivien rakennusten vaaleissa seinissä on erkkeri ja katot ovat '
          + 'punaista tiiltä. Linnaa on muutettu monta kertaa, eikä siinä ole yhtä selvää '
          + 'arkkitehtuurityyliä.',
        lahde: 'Valokuva: Modris Putns, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Modris Putns',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dundaga_castle_(1).jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-dundaga-f97ba91a.jpg',
        lyhyt: 'Dundagan linnan paksu muuri ja tiilikattoinen torni.',
        selite: 'Rappaus on linnan seinässä paikoin lohjennut ja paljastanut alla olevan '
          + 'tiilen. Linna on rakennettu 1200-luvun lopulla, ja se on säilynyt useiden '
          + 'muutosten läpi.',
        lahde: 'Valokuva: Raul Kern, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Raul Kern',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dundaga_castle,_2015_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Dundagan linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Dundagan linnan ympärillä on vettä kolmella sivulla?',
      'Miksi yhden aatelissuvun kartano kasvoi Kuurinmaan suurimmaksi yksityiseksi maatilaksi?',
    ],
    korostukset: ['Osten-Sacken|Osten-Sacken', 'Kuurinmaa|Kuurinmaan'],
    nappi: 'Osten-Sackenin sukukartanon keskus; linna oli kärsinyt pahasta tulipalosta vasta '
      + 'edellisenä vuonna',
    // 22.35 E / 57.5167 N — en-Wikipedia "Dundaga"
    laudat: {
      maailmankartta: { x: 6578.3, y: 1047.1 },
      europe: { x: 640.3, y: 380.9 },
    },
    teksti: 'Dundaga on kylä Kuurinmaalla Latvian länsiosassa, nykyisin Talsin kunnan '
      + 'alueella. Sen tunnetuin nähtävyys on Dundagan linna, jonka Riian arkkihiippakunta '
      + 'rakennutti 1200-luvun lopulla. Linna on nelikulmainen, noin 48 x 69 metrin '
      + 'kokoinen, ja sitä ympäröi kolmelta puolelta Dundagan lammikko; sisäpihalla on yhä '
      + 'vanha kaivo. Linnaa muutettiin monta kertaa, ja 1600-luvulla siitä tehtiin '
      + 'kartanon herrasrakennus. 1500-luvulta vuoteen 1918 linna oli Kuurinmaan suurimman '
      + 'yksityisen kartanoalueen keskus, ja se kuului baltiansaksalaiselle '
      + 'Osten-Sacken-aatelissuvulle. Kartanon alaisuudessa oli 1800-luvulla viisitoista '
      + 'sivukartanoa.',
    lahde: 'en-Wikipedia "Dundaga" ja lv-Wikipedia "Dundagas pils", johdanto-osat ja '
      + 'lv-artikkelin osiot "Vēsture" ja "Apraksts" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-talsi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-talsi-46951d63.jpg',
      lyhyt: 'Talsin keskustan järven suihkulähde ja vehreä linnavuori.',
      selite: 'Järvellä suihkuaa suihkulähde, ja sen takana kohoaa nurmen ja puiden peittämä '
        + 'kukkula. Talsi on rakentunut yhdeksän kukkulan ja kahden järven ympärille.',
      lahde: 'Valokuva: EdgarsLacis, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'EdgarsLacis',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skats_uz_Talsu_pilskalnu.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-talsi-28a3c8dd.jpg',
        lyhyt: 'Vanhan kaupungin talot heijastuvat Talsin järven veteen.',
        selite: 'Punakattoisia ja vaaleita taloja seisoo järven rannalla, ja niiden kuvajainen '
          + 'näkyy tyynessä vedessä. Järven ympäri kiertää kävelyreitti.',
        lahde: 'Valokuva: TalsiTIC, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'TalsiTIC',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Talsu_vecpils%C4%93tas_da%C4%BCa.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-talsi-f0e8ad37.jpg',
        lyhyt: 'Talsin luterilainen kirkko kukkulalla järven rannalla.',
        selite: 'Valkoinen kirkko, jonka tornissa on punainen huippu, seisoo rinteellä '
          + 'keskellä kaupunkia. Kirkko vihittiin käyttöön 1567, ja se on Talsin vanhin '
          + 'kivirakennus, vaikka sitä on rakennettu uudelleen useaan kertaan.',
        lahde: 'Valokuva: Biafra (lv-Wikipedia), Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Biafra (lv-Wikipedia)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Talsu_lut_bazn.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Talsi',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Talsia kutsutaan Kuurinmaan vihreäksi helmeksi?',
      'Mitä tekemistä Talsin pastorilla oli Ludwig van Beethovenin kanssa?',
    ],
    korostukset: ['Pilskalns|Pilskalns', 'Beethovenin|Beethovenin'],
    nappi: 'Kuurinmaan kaupunki, jossa avattiin juuri tänä vuonna yksityiskoulu, jonka '
      + 'opetuskieli oli saksa',
    // 22.5867 E / 57.2444 N — en-Wikipedia "Talsi"
    laudat: {
      maailmankartta: { x: 6586.2, y: 1060.2 },
      europe: { x: 644.9, y: 388.1 },
    },
    teksti: 'Talsi on Kuurinmaan kaupunki Latvian länsiosassa, ja sitä kutsutaan Kuurinmaan '
      + 'vihreäksi helmeksi. Se on rakentunut yhdeksän kukkulan ja kahden järven '
      + 'ympärille. Keskustan Pilskalns-kukkulalla on ollut kuurilaisten linnavuori '
      + 'vähintään 900-luvulta lähtien. Talsi mainitaan kirjallisissa lähteissä '
      + 'ensimmäisen kerran vuonna 1231, ja 1200-luvun lopulla paikalle rakennettiin '
      + 'linna. Nykyinen pääkirkko vihittiin käyttöön 1567, ja se on kaupungin vanhin '
      + 'kivirakennus. Kirkossa toimi pitkään pastori Karl Ferdinand Amenda, Ludwig van '
      + 'Beethovenin läheinen ystävä. Talsi liitettiin osaksi Venäjän keisarikuntaa vuonna '
      + '1795 Kuurinmaan mukana.',
    lahde: 'en-Wikipedia "Talsi", johdanto-osa ja osiot "History", "Geography" ja "Culture '
      + 'and religion" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-tukums',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-tukums-e0fd6e32.jpg',
      lyhyt: 'Tukums I:n punatiilinen rautatieasema.',
      selite: 'Kaksikerroksisen asemarakennuksen tiiliseinässä on kaarevia ikkunoita, ja '
        + 'raiteet kulkevat sen vieritse. Tukumissa on kaksi asemaa, Tukums I ja Tukums '
        + 'II.',
      lahde: 'Valokuva: Titāns, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Titāns',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tukums-1_stacija_2021.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-tukums-a673f42c.jpg',
        lyhyt: 'Iso punatiilirakennus ja kaksi savupiippua Tukumin historiallisessa '
          + 'keskustassa.',
        selite: 'Rakennuksen ikkuna-aukoissa on suuria kirjaimia, ja vasemmalla nousee kaksi '
          + 'tiilistä savupiippua. Kuva on Tukumin historiallisesta keskustasta.',
        lahde: 'Valokuva: Laima Gutmane, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Laima Gutmane',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tukuma_pils%C4%93tas_v%C4%93sturiskais_centrs_(1).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-tukums-ee0474bf.jpg',
        lyhyt: 'Brīvības-aukio ja luterilainen kirkko Tukumin keskustassa.',
        selite: 'Kivetyn aukion takana kohoaa valkoinen Pyhän Kolminaisuuden luterilainen '
          + 'kirkko terävine torneineen, ja sen vieressä alkaa Lielā iela. Lielā (\'suuri\') '
          + 'iela oli kaupungin epävirallinen pääkatu, jonka varrelle rakentui julkisia '
          + 'rakennuksia, yrityksiä ja pieniä liikkeitä.',
        lahde: 'Valokuva: Marrx, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Marrx',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tukums_16.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Tukums',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi herttua Jaakobin aikana Tukumissa rakennettiin pato, jauhomylly ja kuparinvalimo?',
      'Mitä rautatie muutti pienessä kuurinmaalaisessa kaupungissa?',
    ],
    korostukset: ['Livonian ritarikunta|Livonian ritarikunta', 'rautatie|rautatie'],
    nappi: 'Kuurinmaan aluekeskus, johon rautatie Riikasta avataan vasta vuonna 1877',
    // 23.15 E / 56.9667 N — en-Wikipedia "Tukums"
    laudat: {
      maailmankartta: { x: 6605, y: 1073.4 },
      europe: { x: 655.7, y: 395.4 },
    },
    teksti: 'Tukums on Kuurinmaan itäosan kaupunki Latviassa. Siellä asuu yli 16 000 ihmistä, '
      + 'ja se on tärkeä rautatiesolmukohta, jossa yhtyvät Riian, Jelgavan ja Ventspilsin '
      + 'radat. Livonian ritarikunta hallitsi paikkaa vuodesta 1253, ja 1200-luvun lopulla '
      + 'Slocene-joen rannalle rakennettiin muurattu linna. Sen ympärille asettui '
      + 'saksalaisia kauppiaita ja käsityöläisiä. Herttua Jaakobin aikana 1600-luvulla '
      + 'kaupungissa koettiin nopea talouskasvu, ja sinne rakennettiin pato, järvi, '
      + 'jauhomylly ja kuparinvalimo. Kuurinmaa liitettiin Venäjän keisarikuntaan 1795, ja '
      + 'Tukumista tuli alueellinen keskus. Katujen valaistus aloitettiin vuonna 1875, ja '
      + 'Riian ja Tukumin välinen rautatie avattiin 1877, minkä jälkeen kehitys nopeutui.',
    lahde: 'en-Wikipedia "Tukums", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-cesvaine',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-cesvaine-820be43f.jpg',
      lyhyt: 'Cesvainen palatsi kivisine seinineen ja punaisine kattoineen.',
      selite: 'Palatsi valmistui vuonna 1896. Rakennus on tehty pyöreistä kivistä, ja sen '
        + 'katoilla on korkeita savupiippuja, pieniä kattoikkunoita ja kartiomainen torni.',
      lahde: 'Valokuva: simka, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'simka',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cesvaine_palace.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-cesvaine-1a3ab3e1.jpg',
        lyhyt: 'Cesvainen palatsin julkisivu nurmikon takana.',
        selite: 'Vehreän nurmikentän takana on palatsin kivinen julkisivu ja oikeassa reunassa '
          + 'korkea kartiomainen torni. Palatsi on Latvian suojeltu kulttuuriperintökohde.',
        lahde: 'Valokuva: Lauratkacheva, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Lauratkacheva',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cesvaine_pils.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-cesvaine-a6c26369.jpg',
        lyhyt: 'Cesvainen palatsin katot ja haikaranpesä savupiipun päällä.',
        selite: 'Kuva on otettu palatsin kulmatornista. Näkyvissä on punaisia tiilikattoja, '
          + 'korkeita savupiippuja ja pieni harmaakattoinen torni; yhden savupiipun päälle '
          + 'on rakennettu haikaran pesä.',
        lahde: 'Valokuva: Vaido Otsar, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Vaido Otsar',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cesvaine_loss_2015.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Cesvainen kartano',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Cesvainen linna ja koko kylä hävitettiin Liivinsodan aikana?',
      'Mikä oli Jersikan ruhtinaskunta, ja keitä latgalilaiset olivat?',
    ],
    korostukset: ['Cesvainen palatsi|Cesvainen palatsi', 'latgalilaiset|latgalilaisia'],
    nappi: 'Paroni von Wulfin kartanokeskus kasvaa; nykyinen palatsi valmistuu vasta vuonna '
      + '1896',
    // 26.3167 E / 56.9667 N — en-Wikipedia "Cesvaine"
    laudat: {
      maailmankartta: { x: 6710.6, y: 1073.4 },
      europe: { x: 716.5, y: 395.4 },
    },
    teksti: 'Cesvaine on kaupunki Vidzemen alueella Latvian itäosassa. Ennen 1200-luvun '
      + 'ristiretkiä alue kuului Jersikan ruhtinaskuntaan, ja siellä asui muinaisia '
      + 'latgalilaisia. Paikka mainitaan kirjallisissa lähteissä ensimmäisen kerran vuonna '
      + '1209 Riian piispa Albertin ja Visvaldis Jersikalaisen välisessä sopimuksessa. '
      + 'Kivilinna rakennettiin 1400-luvun alussa, mutta Liivinsodan aikana vuonna 1577 '
      + 'Venäjän tsaari Iivana Julma määräsi linnan ja koko kylän hävitettäväksi, kun '
      + 'puolustajat eivät suostuneet antautumaan. Vuonna 1815 paroni von Wulf osti '
      + 'asutuksen ja sen lähimaat, ja Cesvainesta tuli kartanon keskus. Nopea kehitys '
      + 'alkoi 1800-luvun jälkipuoliskolla. Nykyinen Cesvainen palatsi valmistui vuonna '
      + '1896 keskiaikaisten linnojen raunioiden lähelle.',
    lahde: 'en-Wikipedia "Cesvaine", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Cesvaine mainitaan ensimmäisen kerran kirjallisissa lähteissä?',
      vaihtoehdot: [
        '1231',
        '1285',
        '1245',
        '1209',
      ],
      oikea: 3,
      fakta: 'Vuonna 1211 Riian piispa ja Miekkaveljien ritarikunta jakoivat Jersikan maat '
        + 'keskenään, ja Cesvaine siirtyi lopulta Riian piispalle vuonna 1213. '
        + 'Kaupunkioikeudet Cesvaine sai vasta vuonna 1991.',
    },
  },
  {
    id: 'hahmotelma-rezekne',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-rezekne-4c08b298.jpg',
      lyhyt: 'Rēzeknen Jeesuksen Pyhän Sydämen katedraalin kaksi terävää tornia.',
      selite: 'Punatiilinen katedraali kohoaa puiden takaa kahden korkean tornin kera ja '
        + 'hallitsee kaupungin siluettia. Sisällä on lasimaalauksia Liivinmaan '
        + 'ensimmäisistä piispoista.',
      lahde: 'Valokuva: M.Strīķis, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'M.Strīķis',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:R%C4%93zeknes_Vissv%C4%93t%C4%81k%C4%81s_J%C4%93zus_Sirds_Romas_kato%C4%BCu_katedr%C4%81le_(1).jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-rezekne-aa1bee94.jpg',
        lyhyt: 'Rēzeknen linnan rauniot: rosoinen kivimuuri kukkulan rinteellä.',
        selite: 'Muuri on muurattu pyöreistä luonnonkivistä ja välillä tiilestä. Livonian '
          + 'ritarikunta rakensi kivilinnan kukkulalle vuonna 1285, ja ajan mittaan se '
          + 'rapistui raunioiksi.',
        lahde: 'Valokuva: M.Strīķis, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'M.Strīķis',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:R%C4%93zeknes_(Rositen)_pils_drupas_(1).jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-rezekne-96c153d1.jpg',
        lyhyt: 'Rēzeknen vihreä puusynagoga kivijalkoineen.',
        selite: 'Synagoga on vihreäksi maalattu puurakennus, jonka valkoisissa kehyksissä on '
          + 'kaarevia ikkunoita. Se rakennettiin vuonna 1845, ja se on yksi kaupungin '
          + 'vanhimmista puurakennuksista.',
        lahde: 'Valokuva: Warschauer, Wikimedia Commons (CC0).',
        tekija: 'Warschauer',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Synagoge_in_R%C4%93zekne.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
    ],
    nimi: 'Rēzekne',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi rautatiet tekivät unisesta Rēzeknestä tärkeän kaupungin?',
      'Miksi Rēzeknessä on ollut niin monen eri uskontokunnan pyhiä rakennuksia?',
    ],
    korostukset: ['Latgale|Latgalen', 'katedraali|katedraali'],
    nappi: 'Vitebskin kuvernementin piirikaupunki; katedraalin rakennus alkaa vasta vuonna '
      + '1893',
    // 27.3427 E / 56.5127 N — en-Wikipedia "Rēzekne"
    laudat: {
      maailmankartta: { x: 6744.8, y: 1095 },
      europe: { x: 736.2, y: 407.3 },
    },
    teksti: 'Rēzekne on Latgalen alueen kaupunki Latvian itäosassa, ja sitä kutsutaan Latgalen '
      + 'sydämeksi. Se on rakennettu seitsemälle kukkulalle noin 240 kilometriä Riiasta '
      + 'itään. Paikalla oli latgalilainen linnavuori, ja vuonna 1285 Livonian ritarikunta '
      + 'rakensi sinne kivilinnan itärajan vartioksi. Kaupunki kuului 1559 alkaen '
      + 'Puola-Liettualle ja siirtyi Venäjän keisarikunnalle vuonna 1772; kaupunkioikeudet '
      + 'se sai 1773, ja vuodesta 1802 se oli Vitebskin kuvernementin piirikeskus. '
      + '1800-luvulla rautatiet muuttivat unisen maalaiskaupungin tärkeäksi liikenteen '
      + 'solmukohdaksi. Väestöstä noin 60 prosenttia oli tuolloin juutalaisia, ja '
      + 'kaupungissa oli monen uskontokunnan kirkkoja ja rukoushuoneita. Katolinen '
      + 'Jeesuksen Pyhän Sydämen katedraali rakennettiin vuosina 1893–1914.',
    lahde: 'en-Wikipedia "Rēzekne", johdanto-osa ja osiot "History", "Demographics" ja '
      + '"Religion" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kraslava',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-kraslava-501e47a2.jpg',
      lyhyt: 'Ilmakuva Krāslavasta ja Väinäjoen laajasta mutkasta.',
      selite: 'Väinäjoki kaartaa Krāslavan kohdalla, ja silta johtaa joen yli metsäisen '
        + 'vastarannan asutukselle. Kaupungin talot reunustavat joen rantaa.',
      lahde: 'Valokuva: BirdsEyeLV, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'BirdsEyeLV',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skats_uz_Kr%C4%81slavu_un_Daugavas_loku_no_aug%C5%A1as_-_panoramio.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-kraslava-d5086346.jpg',
        lyhyt: 'Krāslavan linnan rakennukset nurmikon ympäröiminä.',
        selite: 'Vaaleaksi rapatut linnan rakennukset seisovat laajan nurmikentän ympärillä. '
          + 'Linna liittyy Platerien sukuun, joka omisti kaupungin 1700-luvulta lähtien.',
        lahde: 'Valokuva: Normunds K, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Normunds K',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kr%C4%81slavas_pils_apb%C5%ABve.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-kraslava-91fc29d0.jpg',
        lyhyt: 'Näkymä Krāslavan linnan mäeltä Väinäjoelle päin.',
        selite: 'Linnan mäeltä avautuu näkymä puiden yli kaupungin puistoon ja kauempana '
          + 'kiiltävälle Väinäjoelle. Vasemmalla on kivestä ja tiilestä muurattu '
          + 'holvikäytävä punaisen katon alla.',
        lahde: 'Valokuva: Vadik_01, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Vadik_01',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kr%C4%81slava_view.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Krāslava',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Krāslavasta tuli jesuiittojen katolisen liikkeen pohjoisin keskus?',
      'Mitä tavaroita Krāslavan käsityöläiset tekivät ja minne niitä myytiin?',
    ],
    korostukset: ['jesuiitat|jesuiitat', 'Plater|Plater'],
    nappi: 'Platerien suvun omistama katolinen kaupunki, jonka pappisseminaari oli suljettu '
      + 'jo 1842',
    // 27.1667 E / 55.8833 N — en-Wikipedia "Krāslava"
    laudat: {
      maailmankartta: { x: 6738.9, y: 1124.6 },
      europe: { x: 732.8, y: 423.9 },
    },
    teksti: 'Krāslava on kaupunki Latvian kaakkoisosassa Väinäjoen (Daugavan) varrella, '
      + 'Daugavpilsin kaupungista ylävirtaan itään. Suurin osa kaupungista on joen '
      + 'oikealla rannalla, ja Latvian lain mukaan se kuuluu osittain Latgaleen ja '
      + 'osittain Selonian alueeseen. Paikalla oli jo varhaisella keskiajalla tärkeä '
      + 'linnavuori Varjagien ja Bysantin välisen vesireitin varrella. Jesuiitat '
      + 'rakensivat kaupunkiin kirkon vuonna 1676, ja siitä tuli katolisen liikkeen '
      + 'pohjoisin keskus protestanttisten ja ortodoksisten alueiden rajalla. Kreivi Jan '
      + 'Ludwik Plater osti kaupungin vuonna 1729, ja hänen sukunsa määritti sen taloutta '
      + 'ja kulttuuria lähes kaksi vuosisataa. Käsityöläiset tekivät mattoja, samettia, '
      + 'silkkiä ja aseita, joita myytiin kaupungin markkinoilla ja vietiin Kuurinmaalle, '
      + 'Puolaan ja Saksaan.',
    lahde: 'en-Wikipedia "Krāslava", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-lubans',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-lubans-94054297.jpg',
      lyhyt: 'Ruovikkoranta ja katettu levähdyspaikka Lubāns-järven äärellä.',
      selite: 'Ruovikon takana avautuu Latvian suurimman järven laaja, tasainen vesialue. '
        + 'Rannalla on penkein varustettu katospöytä.',
      lahde: 'Valokuva: Laima Gūtmane (simka), Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Laima Gūtmane (simka)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lub%C4%81na_ezers_B%C4%81ka.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-lubans-1d9381fd.jpg',
        lyhyt: 'Ruokosaarekkeita Lubāns-järven avovedellä.',
        selite: 'Matalassa järvessä ruovikko muodostaa vihreitä saarekkeita avoveden keskelle. '
          + 'Horisontissa vesi jatkuu kauas.',
        lahde: 'Valokuva: Kikos, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Kikos',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lub%C4%81ns_no_B%C4%81kas_tor%C5%86a.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-lubans-f884bf96.jpg',
        lyhyt: 'Loiva, ruovikkoinen ranta Lubāns-järven laidalla.',
        selite: 'Kuivunut ja tuore ruoko peittävät rantaa, jonka takana näkyy avovettä ja '
          + 'puurivi. Ranta on matala ja tasainen, kuten järven ympäristö yleensäkin.',
        lahde: 'Valokuva: Dāvis Kļaviņš, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Dāvis Kļaviņš',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lub%C4%81na_ezera_krasts,_07.07.2013.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Lubāns',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Miksi Lubānsin pinta-ala voi vaihdella kymmenistä neliökilometreistä lähes sataan?',
      'Miksi Latvian suurimman järven ympärillä on niin laajoja kosteikkoja?',
    ],
    korostukset: ['Aiviekste|Aiviekste', 'kosteikko|kosteikko'],
    nappi: 'Vielä säännöstelemätön tulvajärvi; padot ja kanavat rakennettiin vasta '
      + '1900-luvulla',
    // 26.8667 E / 56.7667 N — en-Wikipedia "Lake Lubāns"
    laudat: {
      maailmankartta: { x: 6728.9, y: 1082.9 },
      europe: { x: 727, y: 400.6 },
    },
    teksti: 'Lubāns on Latvian suurin järvi, ja se sijaitsee Itä-Latvian alangon keskellä. Se '
      + 'on matala järvi, jota ruokkivat muun muassa Rēzekne- ja Malta-joet; vesi virtaa '
      + 'pois Aiviekste-jokea pitkin Väinäjokeen. Järven pinta-ala riippuu '
      + 'vedenkorkeudesta: 90,75 metrin korkeudella se on 25 neliökilometriä ja 92,75 '
      + 'metrin korkeudella noin 100 neliökilometriä. Ennen säännöstelyä kevättulvat '
      + 'peittivät ympäristön niittyjä vuosittain, ja vuoden 1926 tulvien jälkeen alueelle '
      + 'rakennettiin patoja ja ojia; Aiviekste-jokea säännösteltiin 1929–1939. Nykyään '
      + 'alue on suojeltu kosteikko, joka on tärkeä lintujen pesimä- ja muuttoalue.',
    lahde: 'en-Wikipedia "Lake Lubāns" ja lv-Wikipedia "Lubāns", johdanto-osat (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Minkä joen kautta Lubānsin vesi virtaa pois kohti Väinäjokea?',
      vaihtoehdot: [
        'Gauja',
        'Lielupe',
        'Aiviekste',
        'Venta',
      ],
      oikea: 2,
      fakta: 'Järven pinta-ala oli vuonna 1850 noin 98 neliökilometriä ja 1970-luvun '
        + 'puolivälissä vain noin 25 neliökilometriä, jolloin Rāznan järvi oli hetken '
        + 'Latvian suurin.',
    },
  },
  {
    id: 'hahmotelma-ikskile',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-ikskile-4bcd4754.jpg',
      lyhyt: 'Ikšķilen kirkon rauniot suojakatoksen alla Pyhän Meinhardin saarella.',
      selite: 'Itä-Baltian vanhimman kivirakennuksen rauniot on suojattu kevyellä katoksella, '
        + 'ja niiden vieressä on risti. Taustalla näkyy Riian vesivoimalan allas.',
      lahde: 'Valokuva: Hellknowz, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Hellknowz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Church_of_Saint_Mary_ruins_on_Saint_Meinhard_Island.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-ikskile-83e4a314.jpg',
        lyhyt: 'Alhaisen veden paljastama kulkutie Ikšķilen kirkon raunioille.',
        selite: 'Kun altaan vedenpinta on alhaalla, saarelle voi kävellä paljastuneen pohjan '
          + 'halki. Pohjassa näkyy kantoja ja kiviä, ja saarella kohoavat rauniot ja '
          + 'risti.',
        lahde: 'Valokuva: simka, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'simka',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ik%C5%A1%C4%B7iles_Sv._Meinarda_bazn%C4%ABcas_drupas_(3).jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-ikskile-e4b27f4f.jpg',
        lyhyt: 'Kirkon rauniot pienellä saarella Riian vesivoimalan altaassa.',
        selite: 'Rauniot seisovat kivillä vahvistetulla saarella laajan altaan keskellä. '
          + 'Etualalla kaksi melojaa liikkuu lautoillaan vedellä.',
        lahde: 'Valokuva: Mārtiņš Bruņenieks, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Mārtiņš Bruņenieks',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sv%C4%93t%C4%81_Meinarda_bazn%C4%ABca,_SUP_izbrauciens_2018.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ikšķile',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Ikšķilen kirkon rauniot ovat nykyään keskellä vesiallasta?',
      'Miksi Liivinmaan piispankeskus siirrettiin Ikšķilestä Riikaan?',
    ],
    korostukset: ['Meinhard|Meinhard', 'tekosaari|tekosaarella'],
    nappi: 'Vanha kivikirkko oli vielä pystyssä; se tuhoutui vasta 1916, ja vesi nousi '
      + '1970-luvulla',
    // 24.4964 E / 56.8367 N — en-Wikipedia "Ikšķile"
    laudat: {
      maailmankartta: { x: 6649.9, y: 1079.6 },
      europe: { x: 681.5, y: 398.8 },
    },
    teksti: 'Ikšķile on kaupunki Väinäjoen oikealla rannalla, noin 28 kilometrin päässä '
      + 'Riiasta. Se oli Liivinmaan katolisen piispakunnan ensimmäinen pääpaikka, ja '
      + 'siellä on Itä-Baltian vanhin kivirakennus. Gotlantilaiset kivenhakkaajat '
      + 'rakensivat paikalle vuonna 1185 linnan ja kappelin tai kirkon, ja piispa '
      + 'Meinhardin johdolla Ikšķilestä tuli keskus, josta katolisuus alkoi levitä '
      + 'Latviassa. Piispa Albert siirsi piispankeskuksen Riikaan vuonna 1201, koska '
      + 'Ikšķile oli liian kaukana Väinäjoen suulta. Kun joelle rakennettiin 1970-luvulla '
      + 'Riian vesivoimala, linna ja kartano jäivät altaan alle, mutta ensimmäisen '
      + 'kivikirkon rauniot säilytettiin tekosaarella. Kerran vuodessa, kun veden pinta on '
      + 'alhaalla, raunioille voi kävellä.',
    lahde: 'en-Wikipedia "Ikšķile", johdanto-osa ja osiot "History" ja "Notable landmarks" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna gotlantilaiset kivenhakkaajat rakensivat Ikšķilen linnan ja kirkon?',
      vaihtoehdot: [
        '1185',
        '1085',
        '1201',
        '1316',
      ],
      oikea: 0,
      fakta: 'Ikšķilen nimen on tuoreen tutkimuksen mukaan arveltu tulevan liivin kielestä ja '
        + 'tarkoittavan Iken pojalle kuuluvaa kahlauspaikkaa tai saaria Väinäjoella.',
    },
  },
  {
    id: 'hahmotelma-koknese',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-koknese-5bcf1413.jpg',
      lyhyt: 'Koknesen linnan rauniot heijastuvat tyyneen veteen syksyisen metsän vieressä.',
      selite: 'Vaalean kiven jäänteet kohoavat rannalla, ja keltaiset lehdet heijastuvat '
        + 'veteen. Linnan rauniot jäivät osittain veden alle vesivoimalan rakentamisen '
        + 'jälkeen.',
      lahde: 'Valokuva: Karlis Ustups, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Karlis Ustups',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:20131013-22._Kokneses_pils,_rudens.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-koknese-703babb1.jpg',
        lyhyt: 'Vesiväripiirros Kokenhusenin (Koknesen) lähistöltä vuodelta 1833.',
        selite: 'August Matthias Hagenin maalauksessa joki virtaa kalliojyrkänteen ja '
          + 'lehtipuiden välissä; kaukana näkyy silta ja oikeassa reunassa piirtäjä '
          + 'työssään.',
        lahde: 'Valokuva: August Matthias Hagen, Wikimedia Commons (Public domain).',
        tekija: 'August Matthias Hagen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:View_near_Koknese_with_river_in_1833.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-koknese-fd6cd0e5.jpg',
        lyhyt: 'Koknesen linnan rauniot lumisen ja jäätyneen Väinäjoen takana.',
        selite: 'Talvella lumi peittää jäätyneen joen ja rannan puut, ja linnan rauniot '
          + 'erottuvat kaukana rannalla. Laaja valkoinen jäätikkö korostaa maiseman '
          + 'avaruutta.',
        lahde: 'Valokuva: Karlis Ustups, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Karlis Ustups',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:20160117-15._Kokneses_pils,_skats_no_Daugavas,_ziema.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Koknese',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Koknesen linnan rauniot ovat nykyään osittain veden alla?',
      'Mitä Hansaliitto oli, ja mitä hyötyä siitä oli Koknesen kaltaiselle kaupungille?',
    ],
    korostukset: ['Hansaliitto|Hansaliiton', 'Suuri Pohjan sota|Suuren Pohjan sodan'],
    nappi: 'Linna oli rauniona jo vuodesta 1701, ja rautatie tuli kaupunkiin viimeistään 1861',
    // 25.4196 E / 56.6384 N — en-Wikipedia "Koknese"
    laudat: {
      maailmankartta: { x: 6680.7, y: 1089 },
      europe: { x: 699.3, y: 404 },
    },
    teksti: 'Koknese on noin 3 000 asukkaan kaupunki Väinäjoen oikealla rannalla. Paikalla oli '
      + 'alun perin latgalilaisten ja selonialaisten asutus, ja 1200-luvun alussa Riian '
      + 'piispa Albert rakennutti sinne kivilinnan Väinäjoen ja Pērse-joen yhtymäkohtaan. '
      + 'Kaupunki sai kaupunkioikeudet vuonna 1277 ja kukoisti 1300-luvulla osana '
      + 'kauppiaiden Hansaliiton verkostoa. Linnasta kiisteltiin sodissa vuosisatoja, ja '
      + 'se tuhoutui vuonna 1701 Suuren Pohjan sodan aikana. Rautatie kulki Koknesen '
      + 'kautta viimeistään 1861, mikä teki paikasta suositun virkistysalueen. Kun lähelle '
      + 'valmistui vuonna 1966 Pļaviņasin vesivoimala, linnanrauniojen perustukset jäivät '
      + 'veden alle.',
    lahde: 'en-Wikipedia "Koknese", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-aizpute',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-aizpute-4e134d37.jpg',
      lyhyt: 'Aizputen vesimylly ja mylly-lammikko kaupungin keskustassa.',
      selite: 'Punakattoinen vesimylly seisoo padotun lammen rannalla, ja sen seinä heijastuu '
        + 'tummaan veteen. Mylly-lampi on kaupungin keskustassa.',
      lahde: 'Valokuva: Ymblanter, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ymblanter',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aizpute_water_mill.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-aizpute-415167aa.jpg',
        lyhyt: 'Aizputen Livonian ritarikunnan linnan kivimuurit ja porttikäytävä.',
        selite: 'Kivestä ja tiilestä muuratut linnan seinät ympäröivät sisäpihaa, ja keskellä '
          + 'on holvattu porttikäytävä. Ritarikunta rakennutti linnan vuonna 1248.',
        lahde: 'Valokuva: Kryganas, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Kryganas',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Livonijos_ordino_pilies_griuv%C4%97siai.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-aizpute-f2121620.jpg',
        lyhyt: 'Vanhoja puurakennuksia Aizputen historiallisessa keskustassa.',
        selite: 'Kadun varrella on vanhoja hirsi- ja lautarakennuksia punaisine '
          + 'savitiilikattoineen. Jotkin talot ovat ränsistyneitä, ja ikkunat on '
          + 'laudoitettu.',
        lahde: 'Valokuva: Karlis Ustups, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Karlis Ustups',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:20130822-05._Aizputes_pils%C4%93tas_v%C4%93sturiskais_centrs.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Aizpute',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Aizputen perustamisvuotena pidetään vuotta 1248?',
      'Mitä ovat Magdeburgin oikeudet, ja mitä ne merkitsivät kaupungille?',
    ],
    korostukset: ['Beida|Beida', 'Magdeburgin oikeudet|Magdeburgin oikeudet'],
    nappi: 'Kuurinmaan piirikaupunki, jonne rautatie tuli vasta vuonna 1899',
    // 21.6017 E / 56.7211 N — en-Wikipedia "Aizpute"
    laudat: {
      maailmankartta: { x: 6553.4, y: 1085.1 },
      europe: { x: 626, y: 401.8 },
    },
    teksti: 'Aizpute on kaupunki Kuurinmaalla Länsi-Latviassa, Tebra-joen laaksossa noin 50 '
      + 'kilometriä Liepājasta koilliseen. Paikalla oli jo 800-luvulla kuurilaisten '
      + 'Beida-linna, jonka ympäristö oli yksi Bandavan alueen tiheimmin asutuista. '
      + 'Livonian ritarikunta rakennutti vuonna 1248 uuden linnan joen toiselle rannalle, '
      + 'ja tätä vuotta pidetään kaupungin perustamisvuotena. Piispa myönsi kaupungille '
      + 'Magdeburgin oikeudet vuonna 1378. Kuurinmaa liitettiin Venäjään vuonna 1795, ja '
      + 'Aizpustesta tuli oman piirinsä hallintokeskus. Väkiluku kasvoi tuolloin nopeasti, '
      + 'ja 1800-luvulla kaupunkiin perustettiin muun muassa kynttiläpaja ja pahvitehdas; '
      + 'vuonna 1881 asukkaita oli 3 690.',
    lahde: 'en-Wikipedia "Aizpute", johdanto-osa ja osiot "History" ja "Demographics" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-valmiera',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-valmiera-88ac8f90.jpg',
      lyhyt: 'Valmieran keskiaikaisen linnan kivirauniot.',
      selite: 'Rauniomuurissa on vielä ikkuna-aukkoja. Linnan rakennuttivat 1200-luvulla '
        + 'Liivinmaan miekkaveljet, ja myöhemmin se siirtyi Liivinmaan ritarikunnalle.',
      lahde: 'Valokuva: Ken Eckert, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ken Eckert',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Livonian_Castle_Ruins,_Valmiera,_Latvia.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-valmiera-29c2a3d1.jpg',
        lyhyt: 'Pyhän Simonin luterilainen kirkko Valmieran keskustassa.',
        selite: 'Kirkon punatiilinen kellotorni kohoaa aukion ylle. Rakennus on luterilainen '
          + 'kirkko.',
        lahde: 'Valokuva: AgrisR, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'AgrisR',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Church_of_Saint_Simon_in_Valmiera_(1).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-valmiera-737fda94.jpg',
        lyhyt: 'Näkymä Gauja-joelle Valmieran vanhastakaupungista.',
        selite: 'Joki virtaa kaupungin halki, ja Valmiera sijaitsee sen molemmin puolin. '
          + 'Kaukana joen yllä näkyy silta.',
        lahde: 'Valokuva: Dor Shabashewitz, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Dor Shabashewitz',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gauja_view_from_Valmiera_Old_Town.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Valmiera',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mitä hyötyä Hansaliiton jäsenyys toi Valmieralle?',
      'Mistä Valmieran nimi on peräisin?',
    ],
    korostukset: ['Hansaliitto|Hansaliittoon', 'Liivinmaan miekkaveljet|Liivinmaan miekkaveljet'],
    nappi: 'Wolmar-nimellä tunnettu kaupunki: Gauja-silta valmistui 1865, rautatie tulee '
      + 'vasta 1899',
    // 25.4231 E / 57.5381 N — en-Wikipedia "Valmiera"
    laudat: {
      maailmankartta: { x: 6680.8, y: 1046.1 },
      europe: { x: 699.3, y: 380.3 },
    },
    teksti: 'Valmiera on Vidzemen historiallisen alueen toiseksi suurin kaupunki, joka '
      + 'sijaitsee Gauja-joen molemmilla rannoilla noin 107 kilometriä Riiasta koilliseen. '
      + 'Liivinmaan miekkaveljet rakensivat joen varteen linnan 1200-luvulla, ja kaupunki '
      + 'mainitaan ensimmäisen kerran vuoden 1323 kronikassa. Valmiera kuului 1300-luvulta '
      + '1500-luvulle Hansaliittoon, mikä toi kaupunkiin runsaasti kauppaa ja liikettä, ja '
      + 'sen aikana kaupungissa pidettiin useita maapäiviä. Kaupunki kasvoi nopeasti '
      + '1800-luvulla: ensimmäinen silta Gaujan yli valmistui vuonna 1865, ja Riian ja '
      + 'Pietarin välinen rautatie kulki kaupungin kautta vuodesta 1899 alkaen. Nykyään '
      + 'Valmiera on tärkeä teollisuuskaupunki, jonka tärkeimpiä aloja ovat elintarvike- '
      + 'ja lasikuituteollisuus.',
    lahde: 'en-Wikipedia "Valmiera", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-lielvarde',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-lielvarde-2891af82.jpg',
      lyhyt: 'Lielvārden linnan kivirauniot puiden katveessa.',
      selite: 'Riian hiippakunnan vuonna 1229 rakennuttaman kivilinnan rauniot ovat yhä '
        + 'nähtävillä. Osa muureista on suojattu puisella katoksella, ja vasemmalla '
        + 'häämöttää vesi.',
      lahde: 'Valokuva: Edgars Košovojs, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Edgars Košovojs',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lielv%C4%81rde_Castle_ruins_01.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-lielvarde-647b530b.jpg',
        lyhyt: 'Linnanrauniossa näkyy punatiilisiä kaariaukkoja.',
        selite: 'Kivilinnan muureissa on kaarevia ikkuna-aukkoja, joiden reunoja korostavat '
          + 'punatiilet. Rauniot ovat vapaasti tutustuttavissa.',
        lahde: 'Valokuva: Mārtiņš Bruņenieks, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Mārtiņš Bruņenieks',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lielv%C4%81rdes_pilsdrupas_2013.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-lielvarde-b8653db2.jpg',
        lyhyt: 'Lielvārden vyön punavalkoista kuviointia.',
        selite: 'Kudotussa vyössä toistuvat punaiset geometriset symbolit valkoisella '
          + 'pohjalla. Perinteisessä vyössä on kaikkiaan 22 muinaista symbolia, ja sen '
          + 'kuviointi on inspiroinut monia taiteilijoita.',
        lahde: 'Valokuva: Laima Gūtmane, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Laima Gūtmane',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lielv%C4%81rdes_jostas_fragments_-_panoramio.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Lielvārde',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mitä symboleja Lielvārden vyön kuvioissa on, ja miksi ne kiinnostavat taiteilijoita?',
      'Mitä Henrikin Liivinmaan kronikka kertoo Lielvārden linnavuoresta?',
    ],
    korostukset: ['Lielvārden josta|Lielvārden vyöstä', 'Lāčplēsis|Lāčplēsis-eepoksen'],
    nappi: 'Rautatie on avattu 1861; Pumpurin Lāčplēsis-eepos ilmestyy vasta vuonna 1888',
    // 24.805 E / 56.7225 N — en-Wikipedia "Lielvārde"
    laudat: {
      maailmankartta: { x: 6660.2, y: 1085 },
      europe: { x: 687.5, y: 401.8 },
    },
    teksti: 'Lielvārde on noin 5 900 asukkaan kaupunki Daugavan oikealla rannalla, noin 52 '
      + 'kilometriä Riiasta kaakkoon. Alue oli esihistoriallisena aikana liiviläisten ja '
      + 'balttien kohtaamisalue, ja Henrikin Liivinmaan kronikka mainitsee paikalla olleen '
      + 'balttilaisen linnavuoren vuonna 1201. Riian hiippakunta rakennutti seudulle '
      + 'kivilinnan vuonna 1229, ja sen rauniot ovat yhä nähtävillä. Lielvārde tunnetaan '
      + 'myös Lielvārden vyöstä, perinteisestä kudotusta vyöstä, jossa on 22 muinaista '
      + 'symbolia; sen kuviointia on käytetty esimerkiksi Latvian seteleissä. Seutu '
      + 'inspiroi myös runoilijoita Auseklis ja Andrejs Pumpurs, joista jälkimmäinen '
      + 'kirjoitti Lāčplēsis-eepoksen.',
    lahde: 'en-Wikipedia "Lielvārde", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kuinka monta muinaista symbolia perinteisessä Lielvārden vyössä on?',
      vaihtoehdot: [
        '12 symbolia',
        '22 symbolia',
        '17 symbolia',
        '30 symbolia',
      ],
      oikea: 1,
      fakta: 'Lielvārden linnavuori tunnetaan latviaksi nimellä Dievukalns eli jumalten '
        + 'kukkula. Kaupungin saksankielinen nimi on Lennewarden.',
    },
  },
  {
    id: 'hahmotelma-carnikava',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-carnikava-09434482.jpg',
      lyhyt: 'Puinen kalastusvene telineillä Carnikavassa.',
      selite: 'Tummarunkoinen kalastusvene ohjaamoineen on nostettu telineille nurmelle '
        + 'etnografisen museon yhteydessä. Kalastus oli Carnikavan vanha elinkeino, ja '
        + 'kylä kasvoi kalastajakyläksi.',
      lahde: 'Valokuva: Сергей Алексеев, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Сергей Алексеев',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%D0%A6%D0%B0%D1%80%D0%BD%D0%B8%D0%BA%D0%B0%D0%B2%D0%B0_(%D0%9B%D0%B0%D1%82%D0%B2%D0%B8%D1%8F)_%D0%AD%D1%82%D0%BD%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%D0%BC%D1%83%D0%B7%D0%B5%D0%B9_-_%D1%80%D1%8B%D0%B1%D0%B0%D1%87%D0%B8%D0%B9_%D0%B1%D0%B0%D1%80%D0%BA%D0%B0%D1%81_-_panoramio.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-carnikava-69688819.jpg',
        lyhyt: 'Gauja-joen suu pohjoisesta katsottuna.',
        selite: 'Joen hiekkainen ranta ja tyyni vesi sekä vastarannan ruovikko ja metsä. '
          + 'Carnikava sijaitsee Gauja-joen suulla.',
        lahde: 'Valokuva: Egilus, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Egilus',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mouth_of_Gauja_from_north.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-carnikava-b38645b4.jpg',
        lyhyt: 'Gauja-joen suistoa Riianlahden rannalla.',
        selite: 'Hiekkaranta, avoin meri ja vastarannalla metsäinen niemi. Gauja laskee '
          + 'Riianlahteen aivan Carnikavan lähellä.',
        lahde: 'Valokuva: Сергей Алексеев, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Сергей Алексеев',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%D0%A3%D1%81%D1%82%D1%8C%D0%B5_%D1%80%D0%B5%D0%BA%D0%B8_%D0%93%D0%B0%D1%83%D1%8F_(%D0%9B%D0%B0%D1%82%D0%B2%D0%B8%D1%8F)_-_panoramio.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Carnikava',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Miksi nahkiainen on niin tärkeä Carnikavalle, että se on alueen vaakunassakin?',
      'Mistä Carnikavan nimi voi olla peräisin?',
    ],
    korostukset: ['nahkiainen|nahkiainen', 'Riianlahti|Riianlahden'],
    nappi: 'Kalastajakylä kartanon ympärillä; kalanviljelylaitos ja säilyketehdas tulevat '
      + 'kerrotun mukaan 1880',
    // 24.2833 E / 57.1333 N — en-Wikipedia "Carnikava"
    laudat: {
      maailmankartta: { x: 6642.8, y: 1065.5 },
      europe: { x: 677.4, y: 391 },
    },
    teksti: 'Carnikava on taajama noin 25 kilometriä Riiasta pohjoiseen, Gauja-joen suulla '
      + 'Riianlahden rannalla. Paikka mainitaan Henrikin Liivinmaan kronikassa jo vuonna '
      + '1211 liiviläisten joukkojen kokoontumispaikkana. Carnikava kasvoi kartanon '
      + 'ympärille kalastajakyläksi, ja siellä kerrotaan perustetun vuonna 1880 Venäjän '
      + 'keisarikunnan ensimmäinen kalanviljelylaitos ja kalasäilyketehdas. Kylän '
      + 'pitkäaikainen erikoisuus on grillattu nahkiainen, joka on myös alueen vaakunassa, '
      + 'ja Carnikavan nahkiaisella on EU:n suojattu maantieteellinen merkintä. Nykyään '
      + 'paikka on suosittu kesälomakohde riikalaisten keskuudessa, ja siellä pidetään '
      + 'vuosittain kalastajien ja käsityöläisten markkinoita.',
    lahde: 'en-Wikipedia "Carnikava", johdanto-osa ja osiot "History" ja "Culture" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mikä eläin on Carnikavan vaakunassa ja kylän pitkäaikainen ruokaerikoisuus '
        + 'grillattuna?',
      vaihtoehdot: [
        'Lohi',
        'Ankerias',
        'Silakka',
        'Nahkiainen',
      ],
      oikea: 3,
      fakta: 'Nimi Carnikava tulee luultavasti liiviläisestä sanasta, joka tarkoittaa '
        + 'saarnilaaksoa. Saksaksi paikkaa on kutsuttu nimellä Koivemund eli Koiva-joen '
        + 'suu.',
    },
  },
  {
    id: 'hahmotelma-ainazi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-ainazi-30735a28.jpg',
      lyhyt: 'Ainažin merikoulun museo punaisessa puurakennuksessa.',
      selite: 'Museo esittelee merikoulun ja Vidzemen rannikon laivanrakennuksen historiaa. '
        + 'Etualalla näkyy vanha ankkuri.',
      lahde: 'Valokuva: Gunita Kolle, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Gunita Kolle',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aina%C5%BEu_j%C5%ABrskolas_muzejs.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-ainazi-69e7bcee.jpg',
        lyhyt: 'Vanhoja ankkureita ja vene museon ulkonäyttelyssä.',
        selite: 'Museon pihalla on esillä laivojen ankkureita ja ylösalaisin käännetty vene '
          + 'nurmella syysvärisessä puistossa.',
        lahde: 'Valokuva: J. Sedols, Wikimedia Commons (CC BY 3.0).',
        tekija: 'J. Sedols',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aina%C5%BEu_muzeja_br%C4%ABvdabas_ekspoz%C4%ABcija_1999-10-09_-_panoramio.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-ainazi-af5dd19b.jpg',
        lyhyt: 'Ainažin hiekkaranta Riianlahden rannalla.',
        selite: 'Ainaži sijaitsee Riianlahden rannalla lähellä Viron rajaa. Kuvassa on leveä '
          + 'hiekkaranta, matalaa vettä ja ruovikkoa.',
        lahde: 'Valokuva: Derbrauni, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Derbrauni',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aina%C5%BEi_Beach.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Ainaži',
    tyyppi: 'merenkulku',
    lahi: true,
    kysymykset: [
      'Miksi Ainaži oli hyvä paikka laivanrakennukselle?',
      'Mitä Ainažin nimi voi tarkoittaa?',
    ],
    korostukset: ['Krišjānis Valdemārs|Krišjānis Valdemārs', 'Ainažin merikoulu|Ainažin merikoulun'],
    nappi: 'Merikoulu toimii jo vuodesta 1864 ja laivanrakennus on vauhdissa; satama ja '
      + 'rautatie tulevat 1902',
    // 24.3586 E / 57.8636 N — en-Wikipedia "Ainaži"
    laudat: {
      maailmankartta: { x: 6645.3, y: 1030.4 },
      europe: { x: 678.9, y: 371.8 },
    },
    teksti: 'Ainaži on Riianlahden rannalla sijaitseva latvialainen satamakaupunki heti Viron '
      + 'rajan eteläpuolella, vanhan liiviläisen kalastajakylän paikalla. Kylä mainitaan '
      + 'ensimmäisen kerran vuonna 1564, ja 1870-luvulla alkoi voimakas kasvun aika '
      + 'laivanrakennuksen ja merenkulun myötä. Vidzemen ja Kuurinmaan mäntymetsät '
      + 'tarjosivat rakennuspuuta, ja vuonna 1864 Krišjānis Valdemārs rahoitti Ainažin '
      + 'merikoulun, Liivinmaan ensimmäisen, joka koulutti nuoria virolaisia ja '
      + 'latvialaisia talonpoikia laivanpäälliköiksi maksutta. Koulun ensimmäinen rehtori '
      + 'oli tutkimusmatkailija Christian Dahl. Nykyään merikoulun rakennuksessa toimii '
      + 'Ainažin merikoulun museo, joka esittelee koulun ja Vidzemen rannikon '
      + 'laivanrakennuksen historiaa.',
    lahde: 'en-Wikipedia "Ainaži", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-pape',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-pape-21cf1c92.jpg',
      lyhyt: 'Papen järven kosteikkoa: matalaa vettä ja ruovikkoa.',
      selite: 'Papen alueella vesi ja ruoikko vuorottelevat laajalla kosteikolla. Alue on '
        + 'tärkeä muuttolintujen levähdyspaikka.',
      lahde: 'Valokuva: Krauzand wiki, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Krauzand wiki',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Papes_ezers.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-pape-82718e5b.jpg',
        lyhyt: 'Hevoslauma laitumella Papen luonnonpuistossa.',
        selite: 'Papeen tuotiin vuonna 1999 hevosia ja Heck-nautoja laiduntamaan aluetta. '
          + 'Kuvassa hevoslauma seisoo paljaalla hiekkamaalla metsän reunassa.',
        lahde: 'Valokuva: Draceane, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Draceane',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pape,_2015_(11).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-pape-4c21d92c.jpg',
        lyhyt: 'Heck-sonni laitumella metsänreunassa.',
        selite: 'Heck-nautoja laiduntaa Papessa hevosten ja visenttien kanssa. Kuvassa musta '
          + 'sonni kävelee niityllä.',
        lahde: 'Valokuva: Draceane, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Draceane',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pape,_2015_(04).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Pape',
    tyyppi: 'elain',
    lahi: true,
    kysymykset: [
      'Miksi Papeen tuotiin Heck-nautoja, konikhevosia ja visenttejä?',
      'Miksi Papen alue on tärkeä muuttolinnuille?',
    ],
    korostukset: ['visentti|visenttejä', 'konikhevonen|konikhevosia'],
    nappi: 'Luonnonpuisto perustetaan vasta vuonna 2003, ja laiduneläimet tuodaan alueelle '
      + '1999 alkaen',
    // 21.05 E / 56.2 N — en-Wikipedia "Pape Nature Reserve"
    laudat: {
      maailmankartta: { x: 6535, y: 1109.7 },
      europe: { x: 615.4, y: 415.5 },
    },
    teksti: 'Pape on luonnonpuisto Latvian lounaisosassa, noin 15 kilometriä Liepājasta '
      + 'etelään. Yli 5 700 hehtaarin alue koostuu pääosin soista, soistuneista metsistä '
      + 'ja dyyneistä Papen järven ympärillä; matala, laguunityyppinen järvi on tärkeä '
      + 'suojelukohde. Alue perustettiin luonnonpuistoksi vuonna 2003 suojelemaan pesiviä '
      + 'ja muuttavia lintuja, ja joka syksy siellä levähtää noin 50 000 lintua. Papeen '
      + 'tuotiin vuonna 1999 Heck-nautoja ja konikhevosia sekä muutamaa vuotta myöhemmin '
      + 'visenttejä, ja niin alueen nisäkaslajisto on nykyään lähes täydellinen.',
    lahde: 'en-Wikipedia "Pape Nature Reserve" ja lv-Wikipedia "Pape (dabas parks)", '
      + 'johdanto-osat ja en-artikkelin osio "Fauna" (tarkistettu 19.9.2026).',
  },
];
