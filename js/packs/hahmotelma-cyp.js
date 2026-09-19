/*
 * KYPROKSEN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan, Portugalin, Kreikan, Itävallan, Alankomaiden, Belgian, Puolan,
 * Tšekin, Unkarin, Tanskan, Irlannin, Kroatian, Bulgarian, Slovakian ja
 * Luxemburgin jälkeen Kypros.
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
 * extmetadata-rajapinnasta). 1873-näkökulma: Kypros on osmanien vallan
 * alla (britit ottavat saaren hallintaansa vasta 1878: nappi-alaotsikot
 * "vasta muutaman vuoden kuluttua" sopivat myöhempiin kohteisiin), ja
 * Kyproksen pohjoisosan kohteet (Kyrenia, Kantara, Karpaasi, Kormakitis,
 * Lapithos, Soli, Morphou) käsitellään historiallisina paikkoina ilman
 * nykypolitiikkaa: teksteissä ei ole vuosien 1963–1974 tapahtumia eikä
 * kuvissa lippuja tai poliittisia symboleja. Vuoden 1873 jälkeiset asiat
 * (Soli kaivaukset 1927, Stavrovounin reliikit, Chrysorrogiatissan viini
 * 1980-luvulta) ovat mukana: teksti on nykytietoa ja `nappi` katsoo
 * vuodesta 1873.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `cyp-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/cyp/. Kuvissa ei ole
 * tunnistettavia yksityishenkilöitä.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-maiden hahmotelmilla: Kyproksella on jo
 * 13 nostoa (Olympos, Pediaios, Paphoksen mosaiikit, Palaipafos, Kourion,
 * Khirokitia, Asinou, Kykkos, Kapgreco, Apostolos Andreas ja kaksi
 * skandaalia) ja pelikaupunki Nikosia, ja js/fokuskohteet.js liittää rivit
 * KOHDE_MAAT.CYP:iin maastokohteiden jatkoksi. Nostot ovat vähintään 4,5
 * lautayksikön päässä nykyisistä nostoista, vähintään 7,1 päässä
 * Nikosian merkistä ja keskenään vähintään 3,7 päässä. `lahi: true` on
 * sama lähizoomiportti kuin Ranskan hahmotelmalla (js/pallolauta/nostot.js
 * PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen. Laudan luvut on laskettu pelin omalla
 * kaavalla (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Kyproksen fokuslehden rajaukseen
 * (`osuuLehteen`).
 */

/** Kyproksen hahmotelmanostot: sisällölliset kohteet kaupungin ja nykyisten nostojen ulkopuolella. */
export const HAHMOTELMA_CYP = [
  {
    id: 'hahmotelma-kormakitis',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-kormakitis-cba9072d.jpg',
      lyhyt: 'Kormakitisin kylä punaisine kattoineen ja kaksitornisine kirkkoineen kukkulan juurella.',
      selite: 'Vaaleat talot ja punaiset tiilikatot täyttävät rinteen, ja kylän keskellä kohoaa hiekkakivinen kaksitornainen kirkko.',
      lahde: 'Valokuva: muffinn, Wikimedia Commons (CC BY 2.0).',
      tekija: 'muffinn',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kormakitis_general.jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-kormakitis-7d818ae7.jpg',
        lyhyt: 'Kormakitisin Pyhän Yrjön kirkon hiekkakiviset kellotornit ja pääportti.',
        selite: 'Kirkon julkisivu on rakennettu hakatuista kalkkikivilohkoista, ja sitä reunustaa kaksi kellotornia. Pääoven yläpuolella on kolmiomainen päätykoriste ja julkisivun huipulla risti.',
        lahde: 'Valokuva: HFrankDM, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'HFrankDM',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kormakitis_Aziz_Georgios_Kilisesi.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kormakitis',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuinka monta perinteistä maroniittikylää Kyproksella on?',
      'Kuinka monta asukasta Kormakitisissa oli vuonna 1841?',
    ],
    korostukset: ['maroniitti|maroniittikylä'],
    nappi: 'Maroniittikylä, jossa puhutaan arabiaa kreikan rinnalla; asukasluku on vähentynyt osmanien aikana',
    // 33.01083333 E / 35.34277778 N — en-Wikipedia "Kormakitis"
    laudat: {
      maailmankartta: { x: 6933.7, y: 1982.5 },
      europe: { x: 845, y: 964.1 },
    },
    teksti: 'Kormakitis on pieni kylä Kyproksen pohjoisrannikolla ja yksi Kyproksen neljästä '
      + 'perinteisestä maroniittikylästä; kolme muuta ovat Asomatos, Agia Marina ja '
      + 'Karpaseia. Kormakitisin maroniitit puhuvat perinteisesti kreikan lisäksi omaa '
      + 'arabian muotoaan, kyproksenmaroniittiarabiaa, ja kuuluvat katoliseen '
      + 'maroniittikirkkoon; Kormakitisin niemi on nimetty kylän mukaan. Kansanetymologian '
      + 'mukaan nimi tulee Libanonin Kourista tulleilta maroniiteilta, jotka haikailivat '
      + 'kotiinsa toistelemalla lausetta "Nahni jina wa Kour ma jit". Kyproksen '
      + 'maroniittiyhteisö muotoutui neljässä muuttoaallossa, jotka alkoivat 700-luvulla, ja '
      + 'Denoresin suvun läänitys Kormakitis oli vuosina 1191–1489 yksi saaren rikkaimmista. '
      + 'Vuonna 1570 kylässä oli 850 asukasta, mutta osmanien aikana asukasluku väheni, ja '
      + 'vuonna 1841 siellä oli enää 200 asukasta.',
    lahde: 'en-Wikipedia "Kormakitis", johdanto-osa ja osiot "Etymology" ja "History" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä kielen omaa muotoa Kormakitisin maroniitit perinteisesti puhuvat?',
      vaihtoehdot: [
        'Armeniaa',
        'Italiaa',
        'Latinaa',
        'Arabiaa',
      ],
      oikea: 3,
      fakta: 'Kylän nimi on annettu myös Kormakitisin niemelle.',
    },
  },
  {
    id: 'hahmotelma-karpas',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-karpas-569f3244.jpg',
      lyhyt: 'Kultaisen rannan pitkä hiekkaranta ja turkoosi meri Karpaasin niemimaalla.',
      selite: 'Leveä hiekkaranta jatkuu kaukaisuuteen pensaikkoisten kumpareiden ja pilvisen taivaan alla. Karpaasin niemimaan rannikko on harvaan asuttua ja luonnonkaunista.',
      lahde: 'Valokuva: Michal Klajban, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Michal Klajban',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Golden_Beach,_Karpaz,_Northern_Cyprus.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-karpas-6699810c.jpg',
        lyhyt: 'Kalkkikivinen holvattu kirkkorakennus laskevan auringon valossa Karpaasin niemimaalla.',
        selite: 'Yksinäinen kivirakennus seisoo niityllä, ja sen suuri kaari ja holvikatto hehkuvat illan valossa. Vanhoja kirkkoja ja kappeleita on ripoteltu pitkin niemimaan maaseutua.',
        lahde: 'Valokuva: Michal Klajban, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Michal Klajban',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Church_ruins_in_Karpaz,_Northern_Cyprus_02.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Karpaasin niemimaa',
    nimio: 'Karpaasi',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mikä on Karpaasin niemimaan kärki?',
      'Minkä eläimen pidetään olevan Karpaasin symboli?',
    ],
    korostukset: ['aasi|aasi'],
    nappi: 'Kyproksen sormimainen niemimaa, jonka aasit ovat saaren tunnus',
    // 34.277344 E / 35.527756 N — en-Wikipedia "Karpas Peninsula"
    laudat: {
      maailmankartta: { x: 6975.9, y: 1975.4 },
      europe: { x: 869.3, y: 959.2 },
    },
    teksti: 'Karpaasin niemimaa on pitkä, sormimainen niemimaa, joka on yksi Kyproksen '
      + 'silmiinpistävimmistä maantieteellisistä piirteistä; sen kärki on Apostolos '
      + 'Andreaksen niemi ja pääasiallinen asutuskeskus Rizokarpaso. Niemimaa kattaa 898 '
      + 'neliökilometriä, ja se on selvästi harvemmin asuttu kuin muu saari. Sen '
      + 'historiallisia kohteita ovat Kantaran linna ja Apostolos Andreaksen luostari sekä '
      + 'Agia Triaksen basilikan ja muinaisten Karpasian ja Aphendrikan kaupunkien rauniot. '
      + 'Niemimaalla on yli 46 hiekkarantaa, jotka ovat itäisen Välimeren tärkeimpiä '
      + 'merikilpikonnien pesimäalueita, ja siellä elää Karpaasin aasi, jota pidetään '
      + 'Kyproksen symbolina. Alueen elinkeinot ovat maatalous, kalastus ja metsästys, ja se '
      + 'on tunnettu vesimelonistaan.',
    lahde: 'en-Wikipedia "Karpas Peninsula", johdanto-osa ja osiot "Geography" ja "Activities" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-akamas',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-akamas-8f1a6a13.jpg',
      lyhyt: 'Akamasin niemimaan metsäiset rinteet ja rannikko korkealta nähtynä.',
      selite: 'Kalliolta avautuu näkymä Akamasin niemimaan kumpuileville, pensaiden ja mäntyjen peittämille rinteille. Oikealla siintää Välimeri ja rannikon lahdelmat.',
      lahde: 'Valokuva: Michal Klajban, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Michal Klajban',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:View_from_Moutti_Tis_Sotiras,_Akamas_Paninsula,_Cyprus.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-akamas-08aaba47.jpg',
        lyhyt: 'Avakas-rotkon pohjalla virtaa matala puro jyrkkien kallioseinien välissä.',
        selite: 'Rotkon pohjalla kulkee kapea vesiuoma, jonka rannoilla kasvaa pensaita. Kalkkikiven seinämät nousevat korkealle molemmin puolin.',
        lahde: 'Valokuva: Krzysztof Ziarnek, Kenraiz, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Krzysztof Ziarnek, Kenraiz',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Avakas_Gorge_kz12.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-akamas-0e2da2a6.jpg',
        lyhyt: 'Akamasin rannikon turkoosi meri ja sateenkaari männyjen lomasta nähtynä.',
        selite: 'Mäntyjen lomasta avautuu näkymä kallioiselle rannikolle, jossa turkoosi vesi vaihtuu syvän siniseksi. Horisontissa häämöttää pieni saari ja pilvien alla kaareutuu himmeä sateenkaari.',
        lahde: 'Valokuva: Michal Klajban, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Michal Klajban',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rocky_coast_of_Akamas_Peninsula_with_a_rainbow,_Cyprus.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Akamas',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Minkä sankarin mukaan Akamas on nimetty?',
      'Kuinka monta Kyproksen 128 endeemisestä kasvilajista Akamasilla kasvaa?',
    ],
    korostukset: ['endeemi|endeemisyysalueesta'],
    nappi: 'Metsäinen niemi Kyproksen luoteiskulmassa, jonka halki ei kulje teitä',
    // 32.32 E / 35.04 N — en-Wikipedia "Akamas"
    laudat: {
      maailmankartta: { x: 6910.7, y: 1993.9 },
      europe: { x: 831.7, y: 972 },
    },
    teksti: 'Akamas on niemi ja kärki Kyproksen luoteiskulmassa; sen pinta-ala on 230 '
      + 'neliökilometriä. Ptolemaios kuvasi sitä tiheästi metsäiseksi niemeksi, jonka '
      + 'keskellä kohoaa vuoristo, ja niemi on nimetty Theseuksen pojan Akamaksen mukaan, '
      + 'joka oli Solin kaupunkivaltion perustaja. Niemen sydänalueen halki ei kulje teitä, '
      + 'ja alue on niin vaikeapääsyinen, että se on säilyttänyt runsaan lajiston: Euroopan '
      + 'ympäristökeskuksen mukaan se on yksi vain 22 Euroopan endeemisyysalueesta, ja 39 '
      + 'Kyproksen 128 endeemisestä kasvilajista kasvaa Akamaksella. Nähtävyyksiin kuuluvat '
      + 'merikilpikonnien suojelualue ja Aphroditen kylpypaikka, jossa jumalatar kerrotaan '
      + 'kylpeneen.',
    lahde: 'en-Wikipedia "Akamas", johdanto-osa ja osiot "Protected status" ja "Biology and '
      + 'ecology" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä sankarin poika Akamas oli, jonka mukaan niemi on nimetty?',
      vaihtoehdot: [
        'Odysseuksen',
        'Herakleen',
        'Theseuksen',
        'Akhilleuksen',
      ],
      oikea: 2,
      fakta: 'Akamas oli Solin kaupunkivaltion perustaja.',
    },
  },
  {
    id: 'hahmotelma-chrysorrogiatissa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-chrysorrogiatissa-92269440.jpg',
      lyhyt: 'Chrysorrogiatissan luostarin sisäpiha, jossa on kaarikäytävä ja kellotorni.',
      selite: 'Kaaren läpi avautuu kivinen sisäpiha, jonka oikealla puolella on kaksikerroksinen pylväikkö puuparvekkeineen. Vasemmalla nousee vaalea kellotorni, ja pihaa reunustavat ruukkukasvit.',
      lahde: 'Valokuva: Gerda Arendt, Wikimedia Commons (CC0).',
      tekija: 'Gerda Arendt',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Chrysoroyiatissa_Monastery,_Cyprus.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-chrysorrogiatissa-2f464708.jpg',
        lyhyt: 'Luostarin sisäpiha, jossa on kaarikäytävä, kellotorni ja kukkaistutuksia.',
        selite: 'Kaksikerroksisen pylväikön kaaret ja puinen parveke reunustavat aurinkoista pihaa. Kellotorni kohoaa taustalla ja pihalla on punaisia kukkia.',
        lahde: 'Valokuva: Rüdiger Stehn from Kiel, Deutschland, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Rüdiger Stehn from Kiel, Deutschland',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:178Zypern_Panagia_Chrysorrogiatissa_(14088096512).jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Chrysorrogiatissa',
    nimio: 'Chrysorr.',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuka munkki perusti luostarin 1100-luvulla?',
      'Minä päivänä luostarin juhlaa vietetään joka vuosi?',
    ],
    korostukset: ['viini|viiniä'],
    nappi: 'Pafoksen vuorten luostari; nykyinen rakennus on vuodelta 1770',
    // 32.6186 E / 34.9101 N — en-Wikipedia "Chrysoroyiatissa Monastery"
    laudat: {
      maailmankartta: { x: 6920.6, y: 1998.8 },
      europe: { x: 837.5, y: 975.5 },
    },
    teksti: 'Chrysorrogiatissa on Kultaisen granaattiomenan Neitsyt Marialle omistettu luostari '
      + 'noin 40 kilometriä Pafoksesta koilliseen, noin 820 metrin korkeudessa. Sen perusti '
      + 'munkki Ignatios 1100-luvulla, ja se on 1,5 kilometrin päässä Panayian kylästä, jossa '
      + 'syntyi myöhempi arkkipiispa Makarios. Nykyinen rakennus on vuodelta 1770, ja juhlaa '
      + 'vietetään joka vuosi 15. elokuuta Neitsyt Marian kunniaksi. 1980-luvun puolivälissä '
      + 'luostarin vanha viinitehdas avattiin uudelleen, ja se tuottaa viiniä luostarin '
      + 'omilta viinitarhoilta.',
    lahde: 'en-Wikipedia "Chrysoroyiatissa Monastery", koko artikkeli (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Chrysorrogiatissan nykyinen rakennus on peräisin?',
      vaihtoehdot: [
        '1670',
        '1770',
        '1870',
        '1570',
      ],
      oikea: 1,
      fakta: 'Luostarin vanha viinitehdas avattiin uudelleen 1980-luvun puolivälissä.',
    },
  },
  {
    id: 'hahmotelma-soli',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-soli-ed99b12c.jpg',
      lyhyt: 'Solin muinaisen teatterin puoliympyrän muotoiset kiviset istuinrivit.',
      selite: 'Kalkkikivisten istuinrivien kaari ympäröi pyöreää orkesteria. Teatteri kuuluu Solin muinaisen kaupungin raunioihin Morphoun lahden rannalla.',
      lahde: 'Valokuva: ToprakM, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'ToprakM',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Soli_tiyatrosu.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-soli-6b4956e0.jpg',
        lyhyt: 'Ilmakuva Vounin palatsin raunioista jyrkän rinteen laella meren yläpuolella.',
        selite: 'Palatsin kiviset perustukset ja huoneiden pohjat näkyvät vihreällä kukkulan laella, ja alapuolella avautuu sininen merenlahti. Kapea tie kiertää kukkulan rinnettä.',
        lahde: 'Valokuva: Monoskolaggi, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Monoskolaggi',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vouni-Palace-1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-soli-120e95a1.jpg',
        lyhyt: 'Suojakatoksen alla olevat Solin kaupungin rauniot kiviseinineen ja lattioineen.',
        selite: 'Teräsrakenteinen katos suojaa kaivettuja muureja, portaita ja kivilattiaa, joiden yllä kulkee kävijöiden kävelysilta.',
        lahde: 'Valokuva: ToprakM, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'ToprakM',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Soli_harabeleri.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Soli',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä Soli toimitti Ateenaan?',
      'Kuka johti ruotsalaista Kyproksen retkikuntaa?',
    ],
    korostukset: ['kaupunkivaltio|kaupunkivaltio'],
    nappi: 'Muinaisen kaupunkivaltion rauniot Morphoun lahdella; kaivaukset alkavat vasta 1927',
    // 32.811 E / 35.14 N — en-Wikipedia "Soli, Cyprus"
    laudat: {
      maailmankartta: { x: 6927, y: 1990.1 },
      europe: { x: 841.2, y: 969.4 },
    },
    teksti: 'Soli eli Soloi oli muinainen kaupunkivaltio Kyproksen luoteisosassa Morphoun lahden '
      + 'rannalla. Se toimitti Ateenaan puutavaraa ja kuparia vastineeksi ylellisistä '
      + 'metalliesineistä. Vanhan perimätiedon mukaan Solin asemakaavan ja nimen olisi '
      + 'antanut ateenalainen valtiomies Solon (630–560 eaa.), mutta arkeologinen todistus '
      + 'kyseenalaistaa tämän: assyrialaisen Esarhaddonin prisman 600-luvun eaa. kirjoitukset '
      + 'mainitsevat Solin yhtenä Kyproksen kymmenestä kaupunkivaltiosta. Ruotsalainen '
      + 'Kyproksen retkikunta Einar Gjerstadin johdolla kaivoi Solia lokakuussa 1927; '
      + 'kaupunki sijaitsi Mesaorian tasangolla lähellä merta, viljelysmaita ja Kyproksen '
      + 'rikkainta kuparialuetta. Cholades-kukkulan temppelikompleksissa temppelit A ja B oli '
      + 'omistettu yhdessä Afroditelle ja Kybelelle, ja temppeli F oli omistettu Mithralle.',
    lahde: 'en-Wikipedia "Soli, Cyprus", johdanto-osa ja osiot "Archaeological excavations" ja '
      + '"Temples at Cholades" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kenen kerrotaan perimätiedon mukaan antaneen Solille nimen ja asemakaavan?',
      vaihtoehdot: [
        'Homeros',
        'Sokrates',
        'Solon',
        'Salomon',
      ],
      oikea: 2,
      fakta: 'Assyrialaisen prisman kirjoitus kuitenkin mainitsee Solin jo ennen Solonin aikaa.',
    },
  },
  {
    id: 'hahmotelma-stavrovouni',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-stavrovouni-0088a22f.jpg',
      lyhyt: 'Stavrovounin luostarin kivirakennukset kohoavat kallioisen huipun päällä.',
      selite: 'Luostari sijaitsee jyrkän kalliovuoren huipulla Kyproksella. Kivimuurien yllä näkyy kupolikatto ja risti, rinteellä kalliota ja pensaikkoa.',
      lahde: 'Valokuva: Zairon, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Zairon',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stavrovouni_Kloster_Stavrovouni_4.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-stavrovouni-46619d81.jpg',
        lyhyt: 'Kartiomainen Stavrovounin vuori ja sen huipulla oleva luostari.',
        selite: 'Luostari näkyy pienenä rakennusryhmänä vuoren huipulla kirkkaan sinistä taivasta vasten. Rinne on punertavaa maata, pensaita ja mäntyjä.',
        lahde: 'Valokuva: Zairon, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Zairon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stavrovouni_Kloster_Stavrovouni_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Stavrovounin luostari',
    nimio: 'Stavrovouni',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka perimätiedon mukaan perusti Stavrovounin luostarin?',
      'Minkä pyhäinjäännöksen luostari säilyttää?',
    ],
    korostukset: ['Stavrovouni|Stavrovounin'],
    nappi: 'Ristin vuoren luostari, jossa säilytetään palaa Kristuksen ristiä',
    // 33.435499 E / 34.885875 N — en-Wikipedia "Stavrovouni Monastery"
    laudat: {
      maailmankartta: { x: 6947.8, y: 1999.7 },
      europe: { x: 853.2, y: 976.1 },
    },
    teksti: 'Stavrovounin luostari on kreikkalaisortodoksinen luostari Stavrovouni-nimisen '
      + 'kukkulan huipulla Larnakan piirikunnassa; nimi tarkoittaa Ristin vuorta. '
      + 'Perimätiedon mukaan sen perustivat pyhä Helena ja keisari Konstantinus Suuri noin '
      + 'vuosina 327–329: Helenan kerrotaan jättäneen Kyprokselle pala ristiä, jolla Jeesus '
      + 'ristiinnaulittiin. Luostari on yksi maailman vanhimmista, ja Stavrovouni on saaren '
      + 'varhaisimmin dokumentoitu luostari; vanhin kirjallinen maininta on venäläisen apotti '
      + 'Danielin muistiinpanoista vuodelta 1106. Merkittävin pyhäinjäännös on pala ristiä, '
      + 'jota säilytetään suuressa hopeisessa ristinmuotoisessa reliikkiarkussa; muita '
      + 'pyhäinjäännöksiä ovat hyvän ryövärin risti ja yksi pyhistä nauloista. Vuori '
      + 'tunnettiin aiemmin nimellä Olympos, joka on nykyään Troodoksen korkeimman huipun '
      + 'nimi.',
    lahde: 'en-Wikipedia "Stavrovouni Monastery", johdanto-osa ja osiot "Location", '
      + '"Establishment" ja "Relics" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mitä nimi Stavrovouni tarkoittaa?',
      vaihtoehdot: [
        'Pyhä kukkula',
        'Valkoinen vuori',
        'Helenan vuori',
        'Ristin vuori',
      ],
      oikea: 3,
      fakta: 'Vuori tunnettiin aiemmin nimellä Olympos.',
    },
  },
  {
    id: 'hahmotelma-kantara',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-kantara-e03ba449.jpg',
      lyhyt: 'Kantaran linna kohoaa metsäisen vuoren huipulla ilmakuvassa.',
      selite: 'Ilmakuvassa Kantaran linnan muurit ja tornit istuvat kalliojyrkänteisen harjanteen päällä. Alla mutkittelee tie ja laaksossa leijuu sumua.',
      lahde: 'Valokuva: Berkeakyuz, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Berkeakyuz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kantara_Castle_Aerial_Photo.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-kantara-4bfef8ba.jpg',
        lyhyt: 'Kantaran linnan muurit kohoavat kallioiden yllä pilvisellä taivaalla.',
        selite: 'Linna on rakennettu kalliojyrkänteen reunalle Pentadaktylos-vuoriston itäisimmälle harjalle. Alhaalta katsottuna muurit ja pyöreä torni näyttävät kasvavan suoraan kalliosta.',
        lahde: 'Valokuva: George Groutas, Wikimedia Commons (CC BY 2.0).',
        tekija: 'George Groutas',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castle_of_Kantara.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Kantaran linna',
    nimio: 'Kantara',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna Kantaran linna autioitui?',
      'Minkä sanan mukaan linnan nimi on annettu?',
    ],
    korostukset: ['linna|Kantaran linna'],
    nappi: 'Kyrenian vuorten linna, jonka viimeinen varusväki on lähtenyt jo vuonna 1525',
    // 33.9233 E / 35.4064 N — en-Wikipedia "Kantara Castle"
    laudat: {
      maailmankartta: { x: 6964.1, y: 1980 },
      europe: { x: 862.5, y: 962.4 },
    },
    teksti: 'Kantaran linna on linna Kyproksen pohjoisosassa Kyrenian vuorilla; sen '
      + 'rakennusajankohta ei ole tiedossa, mutta todennäköisimmin se on peräisin Bysantin '
      + 'ajalta. Se yhdistää bysanttilaisia ja frankkilaisia rakennuspiirteitä, ja se '
      + 'autioitui vuonna 1525 ja purettiin vuonna 1560. Kantara sijaitsee Buffaventon linnan '
      + 'itäpuolella ja Saint Hilarionin linna kauempana lännessä; linnat muodostivat '
      + 'suojaavan akselin vuoristoon ja välittivät toisilleen merkkejä. Linnan nimi tulee '
      + 'kyproksenarabian sanasta kandak, joka tarkoittaa kivisiltaa. Sitä käytettiin '
      + 'merirosvoretkien vartiotornina, hallintokeskuksena ja vankilana, mutta linna ei '
      + 'juuri joutunut taisteluihin; vuonna 1373 genovalaisten hyökätessä prinssi Johannes '
      + 'pakeni Kantaraan ja järjesti sieltä vastahyökkäyksen, joka ajoi genovalaiset pois.',
    lahde: 'en-Wikipedia "Kantara Castle", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Mitä sana kandak tarkoittaa, josta Kantaran nimi johtuu?',
      vaihtoehdot: [
        'Vartiotorni',
        'Kivisilta',
        'Kalliolinna',
        'Tulimerkki',
      ],
      oikea: 1,
      fakta: 'Linna autioitui vuonna 1525 ja purettiin vuonna 1560.',
    },
  },
  {
    id: 'hahmotelma-lapithos',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-lapithos-11a823cc.jpg',
      lyhyt: 'Lapithoksen kirkon koristeellinen kellotorni ja sen takana Kyrenian vuoriston jyrkät rinteet.',
      selite: 'Kalkkikivinen kellotorni kohoaa vaaleaa kirkkoa vasten, ja taustalla nousevat kalliset, metsäiset vuoret. Lapithos on rakentunut kapealle rannikkokaistalle vuorten ja meren väliin.',
      lahde: 'Valokuva: Adam Jones from Kelowna, BC, Canada, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Adam Jones from Kelowna, BC, Canada',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Church_Steeple_with_Mountain_Backdrop_-_Lapta_(Lapithos)_-_Turkish_Republic_of_Northern_Cyprus_(28348399080).jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-lapithos-116e5e11.jpg',
        lyhyt: 'Lapithoksen Timios Prodromos -kirkko: kivinen kirkkorakennus, punainen tiilikatto ja kellotorni.',
        selite: 'Vanha kalkkikivikirkko on rakennettu hakatuista kivilohkoista, ja sen sivussa kohoaa koristeltu kellotorni. Sinisiä ovia kehystävät kaarevat kivikehykset.',
        lahde: 'Valokuva: muffinn, Wikimedia Commons (CC BY 2.0).',
        tekija: 'muffinn',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lapta_Timios_Prodromos_Church_1.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-lapithos-1c1e3b68.jpg',
        lyhyt: 'Näkymä Lapithoksen kylään: talojen keskeltä kohoavat kirkon kellotorni ja minareetti.',
        selite: 'Lapithoksen tiiviit talot ja punaiset tiilikatot nousevat rinteeseen, ja kellotorni ja minareetti kohoavat rinnakkain kylän yllä. Taustalla näkyy kaukainen tasanko.',
        lahde: 'Valokuva: muffinn, Wikimedia Commons (CC BY 2.0).',
        tekija: 'muffinn',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lapta_general_view.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Lapithos',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä nimi Lambousa tarkoittaa?',
      'Minä vuonna osa Lapithoksesta erotettiin Karavaksi?',
    ],
    korostukset: ['Lambousa|Lambousa'],
    nappi: 'Pentadaktylos-vuoren juurella oleva kylä; muinainen Lambousa on ollut rauniona vuosisatoja',
    // 33.17416667 E / 35.33666667 N — en-Wikipedia "Lapithos"
    laudat: {
      maailmankartta: { x: 6939.1, y: 1982.7 },
      europe: { x: 848.1, y: 964.2 },
    },
    teksti: 'Lapithos eli Lapethos on kaupunki Kyproksen pohjoisrannikolla, noin kolme kilometriä '
      + 'muinaisesta Lapethoksen kaupunkivaltiosta Lambousasta pohjoiseen. Straboni kertoo '
      + 'laakonialaisten ja Praxandroksen perustaneen sen, mutta löydöt ajoittavat asutuksen '
      + 'jo vuoteen 3000 eaa.; se oli yksi Kyproksen yhdeksästä kaupunkivaltiosta, ja sen '
      + 'kuningas Peisistratos auttoi laivastoineen Aleksanteri Suurta Tyroksen valtauksessa. '
      + 'Rooman aikana kaupungissa oli yli 10 000 asukasta, ja se oli kuparin jalostuksen ja '
      + 'etenkin saviastioiden keskus; se sai nimen Lambousa eli loistava, ehkä rikkautensa, '
      + 'kauneutensa tai majakkansa vuoksi. Kun Bysantti otti saaren takaisin arabeilta '
      + 'vuonna 965, asukkaat siirsivät kaupungin kauemmas merestä Pentadaktylos-vuoren '
      + 'juurelle, ja Lusignanien aikana Lapithos oli väkirikkaampi kuin Limassol, Famagusta '
      + 'tai Pafos. Osmanien aikana, vuonna 1780, osa Lapithoksesta erotettiin uudeksi '
      + 'kyläksi, Karavaksi.',
    lahde: 'en-Wikipedia "Lapithos", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mitä nimi Lambousa tarkoittaa, jota Lapithos kantoi Rooman aikana?',
      vaihtoehdot: [
        'Kaunis',
        'Vahva',
        'Loistava',
        'Kultainen',
      ],
      oikea: 2,
      fakta: 'Nimen arvellaan viittaavan rikkauteen, kauneuteen tai majakkaan.',
    },
  },
  {
    id: 'hahmotelma-morphou',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-morphou-cbd96ae7.jpg',
      lyhyt: 'Pyhän Mamaksen kirkko Morphoussa, jossa on kaarikäytävä, kupoli ja kellotorni.',
      selite: 'Vaaleanruskeasta kivestä rakennetun kirkon ympärillä kiertää suippokaarinen pylväikkö. Kupoli ja kellotorni kohoavat kirkon yllä, edessä on laaja kivetty aukio.',
      lahde: 'Valokuva: Xxlstier, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Xxlstier',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Agios_Mamas_(Morphou)_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-morphou-36b9e2d5.jpg',
        lyhyt: 'Vihreää peltomaisemaa ja kumpuja Morphoun tasangolla.',
        selite: 'Etualalla on ruohikkoa, pensaita ja kalkkikiveä. Taustalla avautuu viljelty tasanko, jonka takana siintävät vuoret pilvisen taivaan alla.',
        lahde: 'Valokuva: ToprakM, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'ToprakM',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Morphou_Plain.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-morphou-3416bda2.jpg',
        lyhyt: 'Kivireliefi, jossa pyhä Mamas ratsastaa leijonalla.',
        selite: 'Kirkon seinässä oleva reliefi esittää sädekehäistä pyhimystä leijonan selässä. Ylhäällä on kreikankielinen teksti, ja reliefiä reunustavat koristeelliset pylväät ja lehtikoristeet.',
        lahde: 'Valokuva: Xxlstier, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Xxlstier',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Agios_Mamas_(Morphou)_05.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Morphou',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Kuka perusti kaupungin tarinan mukaan?',
      'Minkä tuotteen viennistä Morphou oli tunnettu osmanien aikana?',
    ],
    korostukset: ['sitrus|sitrushedelmistä'],
    nappi: 'Sitrushedelmien ja pellavan kaupunki Morphoun tasangolla',
    // 32.99388889 E / 35.19805556 N — en-Wikipedia "Morphou"
    laudat: {
      maailmankartta: { x: 6933.1, y: 1987.9 },
      europe: { x: 844.7, y: 967.9 },
    },
    teksti: 'Morphou on kaupunki Kyproksen luoteisosassa, kuuluisa appelsiineistaan, omenoistaan, '
      + 'vihanneksistaan, greipeistään ja meloneistaan; suuri osa sitrushedelmistä viedään '
      + 'ulkomaille ja loput jalostetaan mehuksi ja säilykkeiksi. Kaupungin kerrotaan '
      + 'perustaneen spartalaisten, jotka toivat mukanaan Afrodite-palvonnan; keskiajalla '
      + 'sitä kutsuttiin Morphoksi ja Theomorphoksi. 1300- ja 1400-luvuilla Morphoun alueella '
      + 'oli kuninkaallisia kyliä, joissa kuninkaat kannustivat kannattavaan sokeriviljelyyn, '
      + 'ja alue tuotti yli puolet Kyproksen sitrushedelmistä. Osmanien aikana '
      + '1500–1600-luvuilla Morphou oli tunnettu pellavan viennistä. Kaupungissa järjestetään '
      + 'vuosittain kaksiviikkoinen appelsiinifestivaali.',
    lahde: 'en-Wikipedia "Morphou", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mistä hedelmästä Morphou on kuuluisa?',
      vaihtoehdot: [
        'Appelsiineista',
        'Aprikooseista',
        'Viikunoista',
        'Granaattiomenista',
      ],
      oikea: 0,
      fakta: 'Kaupungissa järjestetään vuosittain kaksiviikkoinen appelsiinifestivaali.',
    },
  },
  {
    id: 'hahmotelma-polis',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-polis-e8d820a8.jpg',
      lyhyt: 'Auringonlasku Chrysochoun lahden yllä Polisin rannalta nähtynä.',
      selite: 'Aallot huuhtovat hiekkarantaa, ja taivas hehkuu oranssina lahden takana kohoavien vuorten yllä. Polis Chrysochous sijaitsee Kyproksen luoteisrannikolla Chrysochoun lahden rannalla.',
      lahde: 'Valokuva: Georgy Papantoniou, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Georgy Papantoniou',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Beautiful_sunset_in_Polis_-_panoramio.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-polis-39a69217.jpg',
        lyhyt: 'Kivetty katu ja kahvilan pöytiä Polisin vanhassa keskustassa.',
        selite: 'Kapea kivetty katu kulkee vanhojen kivitalojen ja viiniköynnöksen varjostamien kahvilapöytien ohi. Katua reunustavat matalat rakennukset ja punaiset tiilikatot.',
        lahde: 'Valokuva: Paul Lakin, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Paul Lakin',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Polis_Cyprus_0446_-_panoramio.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Polis',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mitä kreikan sana polis tarkoittaa?',
      'Minkä lahden keskellä Polis sijaitsee?',
    ],
    korostukset: ['Chrysochoun lahti|Chrysochoun lahden'],
    nappi: 'Chrysochoun lahden kylä, jossa kreikkalaiset ja turkkilaiset asuvat rinnakkain',
    // 32.43333333 E / 35.03333333 N — en-Wikipedia "Polis, Cyprus"
    laudat: {
      maailmankartta: { x: 6914.4, y: 1994.2 },
      europe: { x: 833.9, y: 972.2 },
    },
    teksti: 'Polis, jonka koko nimi on Polis Chrysochous, on kaupunki Kyproksen luoteiskulmassa '
      + 'Chrysochoun lahden keskellä Akamaksen luonnonpuiston reunalla; sen kalastussatama on '
      + 'Latchi. Kreikan sana polis tarkoittaa kaupunkia tai kaupunkivaltiota, ja koko nimi '
      + 'tulee siitä, että paikka on alueen hallintokeskus; Chrysochou taas tulee kreikan '
      + 'sanasta khryso eli kulta, mutta mielipiteet ovat jakautuneet siitä, tarkoittaako se '
      + 'ensimmäisen asukkaan kultaseppää vai vaurautta läheisten kuparikaivosten ansiosta. '
      + 'Osmanien ajasta lähtien Polis oli sekakaupunki, jossa oli sekä kreikkalaisia että '
      + 'turkkilaisia yhteisöjä: vuoden 1831 väestölaskennassa, jossa laskettiin vain miehet, '
      + 'asukkaita oli 150 ja enemmistö oli turkkilaisia, ja vuoden 1891 laskennassa '
      + 'asukkaita oli 476 (258 kreikkalaista ja 218 turkkilaista). Lähellä ovat Aphroditen '
      + 'kylpypaikka ja keskiaikaisen georgialaisen ortodoksisen Gialian luostarin äskettäin '
      + 'löydetyt rauniot.',
    lahde: 'en-Wikipedia "Polis, Cyprus", johdanto-osa ja osiot "History", "Facilities" ja '
      + '"Name" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mitä kreikan sana polis tarkoittaa?',
      vaihtoehdot: [
        'Satamakylä',
        'Vuoristokylä',
        'Linnoitus',
        'Kaupunki',
      ],
      oikea: 3,
      fakta: 'Chrysochou tulee kreikan sanasta khryso eli kulta.',
    },
  },
  {
    id: 'hahmotelma-kyrenia',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-kyrenia-392577eb.jpg',
      lyhyt: 'Kyrenian linna ja vanha satama kirkkaana kesäpäivänä.',
      selite: 'Kyrenian vanha satama, jonka rantaan nousevat linnan paksut kiviset muurit ja pyöreät tornit. Etualalla veneitä kirkkaanvihreässä vedessä, taustalla Kyrenian vuoristo.',
      lahde: 'Valokuva: Zairon, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Zairon',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kyrenia_-_Girne_Festung_Kyrenia_03.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-kyrenia-68fd174a.jpg',
        lyhyt: 'Näkymä linnan muurilta vanhan sataman ylle.',
        selite: 'Linnan muurilta avautuu näkymä pieneen puoliympyrän muotoiseen satamaan, jota reunustavat kahvilat, valkoiset talot ja laitureiden veneet. Taustalla kohoavat vuoret ja avoin meri.',
        lahde: 'Valokuva: DaenielN, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'DaenielN',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kyrenia_Old_Harbour_view_from_Kyrenia_Castle.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kyrenia',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna venetsialaiset laajensivat Kyrenian linnaa nykyiseen asuunsa?',
      'Kenelle kaupunki antautui 1570-luvun alussa?',
    ],
    korostukset: ['linna|linnan'],
    nappi: 'Osmanien vallan alla oleva pieni satamakaupunki, jonka linna on venetsialaisten ajalta',
    // 33.31916667 E / 35.34027778 N — en-Wikipedia "Kyrenia"
    laudat: {
      maailmankartta: { x: 6944, y: 1982.5 },
      europe: { x: 850.9, y: 964.2 },
    },
    teksti: 'Kyrenia on Kyproksen pohjoisrannikon kaupunki, joka on tunnettu historiallisesta '
      + 'satamastaan ja linnastaan. Kreikkalaisen myytin mukaan akhaialaiset Kepheus ja '
      + 'Praxandros perustivat sen Troijan sodan jälkeen ja nimesivät sen kotikaupunkinsa '
      + 'Kyreneian mukaan; roomalaiset laskivat linnan perustukset 1. vuosisadalla, ja '
      + 'kaupungin merkitys kasvoi 800-luvun jälkeen linnan tarjoaman turvan ansiosta. '
      + 'Lusignanien vallan aikana kaupunki ei koskaan antautunut, ja venetsialaiset '
      + 'laajensivat linnaa vuonna 1540 nykyiseen asuunsa paksuine muureineen ja '
      + 'tykkiaukkoineen; kaupunki antautui osmaneille 1570-luvun alussa. Linnan muurien '
      + 'sisällä on 1100-luvun kappeli, jossa on uudelleenkäytettyjä myöhäisroomalaisia '
      + 'pylväänpäitä, sekä haaksirikkomuseo. Vuonna 1831 kaupungin väestö oli jakautunut '
      + 'lähes tasan muslimien ja kristittyjen kesken.',
    lahde: 'en-Wikipedia "Kyrenia" ja "Kyrenia Castle", johdanto-osat ja osiot "History" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kuka laajensi Kyrenian linnan nykyiseen asuunsa vuonna 1540?',
      vaihtoehdot: [
        'Ranskalaiset',
        'Venetsialaiset',
        'Genovalaiset',
        'Lusignanit',
      ],
      oikea: 1,
      fakta: 'Venetsialaiset lisäsivät linnaan paksut muurit ja tykkiaukot.',
    },
  },
];
