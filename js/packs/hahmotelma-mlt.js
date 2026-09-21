/*
 * MALTAN HAHMOTELMANOSTOT — REKISTERÖITY v1968 (19.9.2026, Opus).
 *
 * === TILA ============================================================
 *
 * REKISTERÖITY 19.9.2026: Malta on kartalla (v1968-prep), paketti siirrettiin
 * js/packs/:iin ja kytkettiin alla olevan ohjeen mukaan (KOHDE_MAAT.MLT,
 * sw.js, build-standalone). Alla oleva teksti on odotusajan historiaa.
 *
 * Malta EI OLE vielä pelin kartalla (Fable 19.9.2026): MAAILMANKARTTA.
 * countryShapes ei sisällä MLT:tä, FOKUS_POHJAT ei sisällä MLT:tä ja
 * osuuLehteen('MLT') antaa null. Tämä tiedosto on siksi vain valmis
 * sisältöpaketti tools/odottavat-paketit/-kansiossa (EI js/packs/:ssä, koska
 * tests/sw.test.mjs vaatii jokaisen js/-moduulin SHELLiin ja
 * tools/build-standalone.mjs:n niputukseen); sitä EI ole rekisteröity (ei KOHDE_MAAT.MLT:iä
 * js/fokuskohteet.js:ssä, ei sw.js SHELL:iin eikä tools/build-standalone.mjs:iin).
 * Rekisteröinti tehdään vasta, kun Opus on lisännyt Maltan kartalle
 * (countryShape, MLT.webp-fokuslehti, FOKUS_POHJAT). Kun se on tehty:
 *   0. siirretty tools/odottavat-paketit/ -> js/packs/ (tehty 19.9.2026)
 *   1. js/fokuskohteet.js: HAHMOTELMA_MLT tuotu tästä tiedostosta (tehty)
 *      ja `KOHDE_MAAT.MLT = [...(KOHDE_MAAT.MLT ?? []), ...HAHMOTELMA_MLT];`
 *   2. sw.js SHELL ja tools/build-standalone.mjs: rivi `hahmotelma-mlt.js`.
 *   3. Aja `node tools/tarkista-nostopaikat.mjs` ja `node --test tests/*.test.mjs`;
 *      Maltan nostot ovat laudalla 0,5–2 yksikön päässä toisistaan, joten
 *      nimiölimitys ratkaistaan `nimio`-kentällä tarvittaessa.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48) =====
 *
 * Sisältö noudattaa samaa mallia kuin muut EU-maiden pakat: jokaisella
 * nostolla on `teksti` 3–5 virkettä Wikipedian johdannosta omin sanoin
 * suomeksi (ei käännöskopiota, ei keksittyjä faktoja, `lahde`-riville
 * artikkeli ja tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi
 * pulun kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva` +
 * `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi
 * ja lähdesivu kirjattuna, jokaisen kuvan tiedot luettu Commonsin
 * extmetadata-rajapinnasta). 1873-näkökulma: Malta on brittiläinen
 * kruununsiirtomaa (britit vuodesta 1800); Valletta on brittiläisen
 * Maltan pääkaupunki ja linnoitusten purkamista ehdotetaan 1870-luvulla;
 * Mostan rotunda on rakenteilla (vihitään 1871); Hypogeum löytyy vasta
 * 1902 ja Ta' Pinun ihmeet alkavat 1883.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `mlt-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/mlt/. Kuvissa ei ole
 * tunnistettavia yksityishenkilöitä.
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen (Mostan piste on Rotunda of Mostan artikkelista).
 * Laudan luvut on laskettu pelin omalla kaavalla
 * (tools/johda-maastokohteet.mjs `laudat`). Fokuslehteä ei vielä ole, joten
 * `osuuLehteen` ei voi tarkistaa rajausta.
 */

/** Maltan hahmotelmanostot: valmis sisältö, ei rekisteröity (Malta ei ole vielä kartalla). */
import { EUROOPAN_KADONNEET } from './monumentit-eurooppa.js';

export const HAHMOTELMA_MLT = [
  ...EUROOPAN_KADONNEET.MLT,
  {
    id: 'hahmotelma-valletta',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-valletta-dbbeefea.jpg',
      lyhyt: 'Vallettan Upper Barrakka -puutarhan kaarigalleria ja kaupunginmuurit kohoavat Grand Harbourin rantakallion päälle.',
      selite: 'Näkymä Senglean Spur-niemeltä Grand Harbourin yli Vallettaan. Kalkkikivimuurien päällä näkyy Upper Barrakka -puutarhan kaarigalleria.',
      lahde: 'Valokuva: Frank Vincentz, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Frank Vincentz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Malta_-_Valletta_(seen_from_The_Spur)_02_ies.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-valletta-c5b13128.jpg',
        lyhyt: 'Pyhän Johanneksen konkatedraalin hiekkakivinen julkisivu kahden kellotornin välissä.',
        selite: 'Vallettan Pyhän Johanneksen konkatedraalin julkisivu on ankaran yksinkertainen, ja tornien kelloissa on osoittimet. Ylellinen sisustus on piilossa tämän vaatimattoman ulkokuoren takana.',
        lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Diego Delso',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Concatedral_de_San_Juan,_La_Valeta,_isla_de_Malta,_Malta,_2021-08-25,_DD_196.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Valletta',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä päivänä Vallettan peruskivi laskettiin vuonna 1566?',
      'Minä vuonna Unesco hyväksyi Vallettan maailmanperintökohteeksi?',
    ],
    korostukset: ['linnoitus|linnoitusten'],
    nappi: 'Ritarikunnan kaupunki ja brittiläisen Maltan pääkaupunki; linnoitusten purkamista ehdotetaan 1870-luvulla',
    // 14.5125 E / 35.89833333 N — en-Wikipedia "Valletta"
    laudat: {
      maailmankartta: { x: 6317.1, y: 1961.4 },
      europe: { x: 489.8, y: 949.5 },
    },
    teksti: 'Valletta on Maltan pääkaupunki Grand Harbourin ja Marsamxett-sataman välissä; '
      + 'asukkaita on 5 157 (2021). Se on Euroopan eteläisin pääkaupunki ja pinta-alaltaan, '
      + '0,61 neliökilometriä, EU:n toiseksi pienin. Kaupungin 1500-luvun rakennukset '
      + 'rakennutti Johanniittaritarikunta, ja se on nimetty ranskalaisen Jean Parisot de '
      + 'Valetten mukaan, joka puolusti saarta osmaneja vastaan suuressa piirityksessä; '
      + 'peruskivi laskettiin 28. maaliskuuta 1566. Kaupunki on luonteeltaan barokki, ja sen '
      + '320 muistomerkkiä mahtuvat 0,55 neliökilometrin alueelle; Unesco hyväksyi sen '
      + 'maailmanperintökohteeksi vuonna 1980. Britit ottivat kaupungin haltuunsa syyskuussa '
      + '1800, ja linnoitusten purkamista ehdotettiin 1800-luvun alussa sekä uudelleen 1870- '
      + 'ja 1880-luvuilla, mutta linnoitukset ovat säilyneet.',
    lahde: 'en-Wikipedia "Valletta", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kenen mukaan Valletta on nimetty?',
      vaihtoehdot: [
        'Kuningas Filip II',
        'Suurmestari Valette',
        'Keisari Kaarle V',
        'Sulttaani Suleiman',
      ],
      oikea: 1,
      fakta: 'Valletta on EU:n toiseksi pienin pääkaupunki.',
    },
  },
  {
    id: 'hahmotelma-mdina',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-mdina-b18d8f39.jpg',
      lyhyt: 'Mdinan pääportti koristeellisine julkisivuineen ja kahden leijonapatsaan vartioimana.',
      selite: 'Barokkityylinen pääportti valmistui 1700-luvulla muurien keskeltä aukeavaksi sisäänkäynniksi. Portin kaaren yläpuolella on vaakunakoristeita, ja kaarta reunustavat kaksi leijonaa.',
      lahde: 'Valokuva: Joseolgon, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Joseolgon',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Main_Gate_Mdina.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-mdina-57482eca.jpg',
        lyhyt: 'Kapea, kivetty katu Mdinassa auringonlaskun valossa lyhtyjen valaistessa seiniä.',
        selite: 'Mdinan kapeat kujat kiertävät korkeiden kalkkikivitalojen välissä, ja seinille on kiinnitetty rautakoukuissa riippuvia lyhtyjä.',
        lahde: 'Valokuva: Godwin Borg, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Godwin Borg',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Typical_Mdina_narrow_street_at_sunset.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-mdina-8573a507.jpg',
        lyhyt: 'Mdinan katedraalin kupoli ja kattomaalaukset alhaalta päin katsottuna.',
        selite: 'Katedraalin kupolia ja holveja koristavat maalaukset ja kullatut listat, ja kupolin keskellä on valoaukko.',
        lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Diego Delso',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Catedral_de_San_Pablo,_Mdina,_isla_de_Malta,_Malta,_2021-08-25,_DD_141-143_HDR.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Mdina',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mikä on Mdinan lempinimi?',
      'Minä vuonna Johanniittaritarikunta teki Birgusta pääkaupungin?',
    ],
    korostukset: ['Hiljainen kaupunki|Hiljaiseksi kaupungiksi'],
    nappi: 'Hiljainen kaupunki: Maltan entinen pääkaupunki, jossa aateli asuu yhä',
    // 14.40305556 E / 35.88583333 N — en-Wikipedia "Mdina"
    laudat: {
      maailmankartta: { x: 6313.4, y: 1961.9 },
      europe: { x: 487.7, y: 949.8 },
    },
    teksti: 'Mdina on linnoitettu kaupunki Maltan länsiosassa, ja se oli saaren pääkaupunki '
      + 'antiikista keskiajalle; kaupunki ei ole koskaan levinnyt muurien ulkopuolelle, ja '
      + 'asukkaita on 242. Foinikialaiset perustivat paikalle 700-luvulla eaa. siirtokunnan '
      + 'nimeltä Ann, ja roomalaiset nimesivät sen Melitaksi; nimi Mdina tulee arabian '
      + 'sanasta madīnah eli kaupunki. Kaupunki oli Maltan pääkaupunki, kunnes '
      + 'Johanniittaritarikunta saapui vuonna 1530 ja teki pääkaupungiksi Birgun; sen jälkeen '
      + 'Mdina taantui, vaikka 1700-luvun alussa siihen rakennettiin useita '
      + 'barokkirakennuksia. Kaupunki on pysynyt Maltan aatelin ja kirkollisten viranomaisten '
      + 'keskuksena, mutta se ei ole koskaan saavuttanut takaisin vuotta 1530 edeltänyttä '
      + 'merkitystään, minkä vuoksi sitä kutsutaan Hiljaiseksi kaupungiksi.',
    lahde: 'en-Wikipedia "Mdina", johdanto-osa ja osiot "Etymology" ja "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-hagar-qim',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-hagar-qim-9749be8e.jpg',
      lyhyt: 'Ħaġar Qimin megaliittitemppelin kivilohkareet valkoisen suojatelttarakenteen alla.',
      selite: 'Ħaġar Qimin temppeli on peräisin noin vuosilta 3600–3200 eaa. Jättimäiset kalkkikivilohkareet on suojattu valkoisella telttakatoksella sään kulumiselta.',
      lahde: 'Valokuva: Simon Burchell, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Simon Burchell',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ħaġar_Qim_Neolithic_temple_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-hagar-qim-60bfec6c.jpg',
        lyhyt: 'Sininen luola eli Blue Grotto: luonnonkaari avautuu kalliojyrkänteessä Välimeren rannalla.',
        selite: 'Maltan etelärannikon jyrkänne on murtunut luonnon muovaamaksi kaareksi, jonka alla meri syvenee tummansiniseksi. Kaukana horisontissa näkyy Filfla-saari.',
        lahde: 'Valokuva: Berthold Werner, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Berthold Werner',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Malta_Blue_Grotto_BW_2011-10-09_11-08-16.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Ħaġar Qim',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä Ħaġar Qim tarkoittaa?',
      'Minä vuonna suojateltta valmistui temppelin päälle?',
    ],
    korostukset: ['megaliitti|megaliittinen'],
    nappi: 'Megaliittitemppelit Maltan eteläreunalla, yli 5 000 vuotta vanhat',
    // 14.44222222 E / 35.82777778 N — en-Wikipedia "Ħaġar Qim"
    laudat: {
      maailmankartta: { x: 6314.7, y: 1964.1 },
      europe: { x: 488.5, y: 951.3 },
    },
    teksti: 'Ħaġar Qim, kirjaimellisesti palvontakivet, on megaliittinen temppelikompleksi Maltan '
      + 'eteläreunalla, ajalta Ġgantija-kaudelta (3600–3200 eaa.). Maltan megaliittitemppelit '
      + 'ovat maailman vanhimpia uskonnollisia kohteita, ja Unesco hyväksyi Ħaġar Qimin ja '
      + 'neljä muuta rakennelmaa maailmanperintökohteiksi vuonna 1992. Rakentajat käyttivät '
      + 'pehmeää globigerinakalkkikiveä, minkä vuoksi temppeli on rapautunut ja hilseillyt '
      + 'vuosituhansien mittaan; suojateltta valmistui vuonna 2009. Julkisivun tunnusmerkkejä '
      + 'ovat kolmikivinen sisäänkäynti, ulkopenkki ja pystykivet, ja alueelta ei ole '
      + 'löytynyt hautauksia eikä ihmisluita, mutta lukuisia uhrieläinten luita. Noin 500 '
      + 'metrin päässä on Mnajdran temppelikompleksi, joka on rakennettu kovemmasta '
      + 'koralliittikalkkikivestä, ja rannikolla ovat Sinisen luolan meriluolat, joissa veden '
      + 'sininen väri heijastuu luolien seinistä.',
    lahde: 'en-Wikipedia "Ħaġar Qim", "Mnajdra" ja "Blue Grotto (Malta)", johdanto-osat ja osiot '
      + '"Overview" ja "Design" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Unesco hyväksyi Ħaġar Qimin maailmanperintökohteeksi?',
      vaihtoehdot: [
        '1972',
        '1982',
        '1992',
        '2002',
      ],
      oikea: 2,
      fakta: 'Unesco hyväksyi samalla neljä muuta Maltan megaliittikohdetta.',
    },
  },
  {
    id: 'hahmotelma-ggantija',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-ggantija-346a290d.jpg',
      lyhyt: 'Ġgantijan temppelin ulkoseinä muodostuu jättimäisistä kalkkikivilohkareista.',
      selite: 'Gozon Ġgantijan temppelien massiivinen ulkoseinä on rakennettu valtavista, karkeasti muotoilluista kivilohkareista. Rakennukset ovat yli 5000 vuotta vanhoja.',
      lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Diego Delso',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Templo_de_Ġgantija,_isla_de_Gozo,_Malta,_2021-08-23,_DD_18.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-ggantija-e719f2f3.jpg',
        lyhyt: 'Puinen kulkusilta johtaa Ġgantijan temppelin kahden korkean kivilohkareen välistä sisäänkäynnille.',
        selite: 'Temppelin sisäänkäynnin molemmin puolin kohoavat pystyyn nostetut kalkkikivilohkareet. Niiden takana näkyy temppelin sisäosan kivimuuri.',
        lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Diego Delso',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Templo_de_Ġgantija,_isla_de_Gozo,_Malta,_2021-08-23,_DD_25.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Ġgantija',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka jättiläisnainen kansantarinan mukaan rakensi temppelit?',
      'Minä vuonna Bayer raivautti temppelin raunioilta maata?',
    ],
    korostukset: ['jättiläis|jättiläisten'],
    nappi: 'Gozon jättiläisten temppelit; Bayer raivasi kaivauksen vuonna 1827 ja rauniot ovat rapautuneet',
    // 14.26916667 E / 36.04722222 N — en-Wikipedia "Ġgantija"
    laudat: {
      maailmankartta: { x: 6309, y: 1955.7 },
      europe: { x: 485.2, y: 945.6 },
    },
    teksti: 'Ġgantija, jättiläisten paikka, on neoliittinen megaliittinen temppelikompleksi '
      + 'Maltan Gozon saarella Xagħran ylätasangon reunalla, ajalta noin 3600–2500 eaa. Kaksi '
      + 'temppeliä on yli 5 500 vuotta vanhoja, ne ovat vanhimpia Maltan '
      + 'megaliittitemppeleistä ja vanhempia kuin Egyptin pyramidit, ja ne ovat maailman '
      + 'toiseksi vanhimpia yhä olemassa olevia ihmisen rakentamia uskonnollisia rakennelmia '
      + 'Göbekli Tepen jälkeen. Paikallisen gozolaisen kansantarinan mukaan jättiläisnainen '
      + 'Sansuna, joka söi vain härkäpapuja ja hunajaa, rakensi temppelit lapsi olallaan. '
      + 'Eteläinen temppeli on suurempi ja vanhempi, viiden apsiksen temppeli, jonka korkeus '
      + 'on kuusi metriä. Gozon apulaiskuvernööri, everstiluutnantti John Otto Bayer, '
      + 'raivautti paikan raunioista maata vuonna 1827, mutta multa ja löydöt menetettiin '
      + 'tutkimatta, ja rauniot rapautuivat; Unesco hyväksyi temppelit '
      + 'maailmanperintökohteeksi vuonna 1980.',
    lahde: 'en-Wikipedia "Ġgantija", johdanto-osa ja osiot "Description and design" ja '
      + '"Excavations and recognition" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mitä nimi Ġgantija tarkoittaa?',
      vaihtoehdot: [
        'Jättiläisten paikka',
        'Auringon temppeli',
        'Jumalten linnoitus',
        'Muinaisten kivien koti',
      ],
      oikea: 0,
      fakta: 'Temppelit ovat vanhempia kuin Egyptin pyramidit.',
    },
  },
  {
    id: 'hahmotelma-marsaxlokk',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-marsaxlokk-73516ea3.jpg',
      lyhyt: 'Marsaxlokkin satama täynnä värikkäitä luzzu-kalastajaveneitä, taustalla kaupunki ja kirkon kupoli.',
      selite: 'Marsaxlokk on Maltan lounaisrannikon kalastajakylä, jonka satamassa keinuvat perinteiset sinikeltaiset luzzu-veneet. Kirkon kupoli ja tornit kohoavat kaupungin yläpuolelle.',
      lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Diego Delso',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Puerto_de_Marsaxlokk,_isla_de_Malta,_Malta,_2021-08-21,_DD_14.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-marsaxlokk-5401f08b.jpg',
        lyhyt: 'Luzzu-veneet keinuvat tyynessä Marsaxlokkin satamassa auringonnousun väreissä.',
        selite: 'Aamun taivaan värit heijastuvat tyyneen satamaveteen, jossa perinteiset sinikeltaiset kalastajaveneet ovat ankkurissa.',
        lahde: 'Valokuva: MarcScic, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'MarcScic',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Marsaxlokk_Harbour_at_Sunrise.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Marsaxlokk',
    tyyppi: 'merenkulku',
    lahi: true,
    kysymykset: [
      'Minä päivänä viikosta Marsaxlokkin kalatori pidetään?',
      'Millä nimellä kylän asukkaita kutsutaan?',
    ],
    korostukset: ['luzzi|luzzi-veneitä'],
    nappi: 'Kalastajakylä, josta tulee oma seurakuntansa vasta 1800-luvun lopulla',
    // 14.54472222 E / 35.84166667 N — en-Wikipedia "Marsaxlokk"
    laudat: {
      maailmankartta: { x: 6318.2, y: 1963.5 },
      europe: { x: 490.5, y: 951 },
    },
    teksti: 'Marsaxlokk on pieni, perinteinen kalastajakylä Maltan eteläosassa; se on '
      + 'turistikohde, jonka sunnuntaisin pidettävä kalatori on kuuluisa. Foinikialaiset, '
      + 'kartagolaiset ja roomalaiset käyttivät paikkaa satamana, ja siellä on roomalaisajan '
      + 'sataman jäänteitä. Alun perin Żejtunin kaupunkiin kuulunut kylä tuli omaksi '
      + 'seurakunnakseen 1800-luvun lopulla. Nimi tulee arabian sanasta marsa eli satama ja '
      + 'maltan sanasta xlokk eli kaakko; asukkaita kutsutaan xlukkajreiksi, ja he ovat '
      + 'perinteisesti kalastajia. Suojaisessa sisäsatamassa on perinteisiä luzzi-veneitä.',
    lahde: 'en-Wikipedia "Marsaxlokk", johdanto-osa ja osio "Etymology" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mitä sana xlokk tarkoittaa maltaksi?',
      vaihtoehdot: [
        'Satama',
        'Pohjoinen',
        'Kalastaja',
        'Kaakko',
      ],
      oikea: 3,
      fakta: 'Marsa tarkoittaa arabiaksi satamaa.',
    },
  },
  {
    id: 'hahmotelma-comino',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-comino-b0bd129c.jpg',
      lyhyt: 'Comino ja Cominotto-saaren väliin jäävä Sininen laguuni turkoosina ja Gozon rantaviiva taustalla.',
      selite: 'Näkymä Comino-saarelta Sinisen laguunin kirkkaaseen veteen. Kallioiden välistä aukeaa Gozoa kohti, ja vesi vaihtelee turkoosista tummansiniseen.',
      lahde: 'Valokuva: Frank Vincentz, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Frank Vincentz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Malta_-_Ghajnsielem_-_Comino_+_Large_Blue_Lagoon_Rock_+_Cominotto_+_Blue_Lagoon_+_Gozo_(St._Mary\'s_Tower)_01_ies.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-comino-989346c4.jpg',
        lyhyt: 'Pyhän Marian torni Comino-saaren kukkulalla iltavalossa.',
        selite: 'Neliömäinen kalkkikivitorni seisoo Comino-saaren kukkulan laella, ympärillään kuivia pensaita ja kivikkoa.',
        lahde: 'Valokuva: Matthew Benn, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Matthew Benn',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:St._Mary\'s_Tower_Comino.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Comino',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Mistä Comino on saanut nimensä?',
      'Kuinka monta pysyvää asukasta Cominolla on?',
    ],
    korostukset: ['kumina|kuminansiemenestä'],
    nappi: 'Kuminasaari Maltan ja Gozon välissä, jossa asuu vain muutama ihminen',
    // 14.33666667 E / 36.01138889 N — en-Wikipedia "Comino"
    laudat: {
      maailmankartta: { x: 6311.2, y: 1957.1 },
      europe: { x: 486.5, y: 946.5 },
    },
    teksti: 'Comino, maltaksi Kemmuna, on pieni saari Maltan ja Gozon välissä, pinta-alaltaan 3,5 '
      + 'neliökilometriä; nimi tulee kuminansiemenestä, ja pysyviä asukkaita on vain kaksi. '
      + 'Saari on lintusuojelualue ja luonnonsuojelualue, ja sillä on karstimaisema, jossa '
      + 'kasvaa kovalehtistä pensastoa; Santa Marian lahden dyyneillä kasvaa alkuperäistä '
      + 'kasvillisuutta. Antiikin kreikassa saarta kutsuttiin Ephaestiaksi, ja '
      + 'roomalaisaikana sillä asuivat viljelijät; sen jyrkät kalkkikalliot ja luolat olivat '
      + 'keskiajalla merirosvojen suosimia, ja vuosina 1285–1290 saarella asui maanpaossa '
      + 'oleva juutalainen kabbalisti Abraham Abulafia. Johanniittaritarit käyttivät saarta '
      + 'metsästys- ja virkistysmaana, ja salametsästäjää uhkasi kolmen vuoden orjagalleeri.',
    lahde: 'en-Wikipedia "Comino", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-dingli',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-dingli-db403e43.jpg',
      lyhyt: 'Dinglin kalliot ja Välimeri laajana näkymänä.',
      selite: 'Jyrkkä kalliorinne laskeutuu viljelyterasseineen ja pieneen rakennusryhmään kohti Välimerta. Dinglin kalliot ovat Maltan korkein kohta.',
      lahde: 'Valokuva: Christian Formosa, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Christian Formosa',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:View_of_Dingli_Cliffs.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-dingli-b671e62a.jpg',
        lyhyt: 'Dinglin kallioiden reuna auringonlaskun valossa.',
        selite: 'Kalkkikiviselta tasangolta avautuu pystysuora kalliojyrkänne ja tyyni meri horisonttiin asti.',
        lahde: 'Valokuva: V. Epiney, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'V. Epiney',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dingli_Cliffs_(14732772575).jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Dinglin kalliot',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Minkä englantilaisen ritarin mukaan Dingli on nimetty?',
      'Minä vuonna Dinglin seurakunta perustettiin?',
    ],
    korostukset: ['kalliot|kalliot'],
    nappi: 'Maltan korkeimman kohdan kalliot; kylä on nimetty englantilaisen ritarin mukaan',
    // 14.38138889 E / 35.86027778 N — en-Wikipedia "Dingli"
    laudat: {
      maailmankartta: { x: 6312.7, y: 1962.8 },
      europe: { x: 487.3, y: 950.5 },
    },
    teksti: 'Dingli on kylä Maltan länsiosassa noin 13 kilometrin päässä Vallettasta, '
      + 'ylätasangolla noin 230 metriä merenpinnan yläpuolella, lähellä Maltan korkeinta '
      + 'kohtaa. Kalliot tarjoavat näkymän avomerelle pienelle, asumattomalle Filfla-saarelle '
      + 'sekä Buskettin puutarhoille ja Verdalan palatsille. Nimen arvellaan tulevan '
      + 'englantilaisesta Johanniittaritarikunnan ritarista Sir Thomas Dingleystä, jolla oli '
      + 'paljon maata ympäristössä. Dinglin alueelta on löydetty foinikialais-, kartagolais- '
      + 'ja roomalaisaikaisia kalliohautoja sekä roomalaisia kylpylöitä. 1500-luvun alkuun '
      + 'asti lähellä oli pieni Ħal Tartarnin kylä, jonka asukkaat siirtyivät lähemmäs '
      + 'peltoja, ja uusi kylä kasvoi nykyiseksi Dingliksi; seurakunta perustettiin vuonna '
      + '1678.',
    lahde: 'en-Wikipedia "Dingli", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-mosta',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-mosta-1c6ac1ea.jpg',
      lyhyt: 'Mostan rotundan pylväsjulkisivu, kellotornit ja kupolin reuna.',
      selite: 'Kalkkikivinen julkisivu koostuu kuudesta joonialaisesta pylväästä, kolmiopäädystä ja kahdesta kellotornista. Frontonin alla kulkevan latinankielisen kirjoituksen lopussa on vuosiluku 1857.',
      lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Diego Delso',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rotonda_de_Mosta,_isla_de_Malta,_Malta,_2021-08-25,_DD_84.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-mosta-dcc76a86.jpg',
        lyhyt: 'Mostan rotundan kupolin sisäpuoli kasettikattoineen.',
        selite: 'Kupolin sisäpinta on jaettu kullattuihin ja sinisiin kasetteihin, jotka pienenevät kohti keskellä olevaa lyhtyä. Kupolin alareunaa kiertää latinankielinen kirjoitus ja kaarevat ikkunat.',
        lahde: 'Valokuva: Simon Burchell, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Simon Burchell',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Church_of_Santa_Marija,_Mosta_(Rotunda_of_Mosta)_20.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Mostan rotunda',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minkä Rooman rakennuksen mukaan rotunda on suunniteltu?',
      'Minä vuonna kirkko vihittiin?',
    ],
    korostukset: ['kupoli|kupoli'],
    nappi: 'Rakenteilla oleva kupolikirkko: peruskivi 1833, vanha kirkko puretaan 1860 ja uusi vihitään 1871',
    // 14.42588889 E / 35.91008333 N — en-Wikipedia "Rotunda of Mosta"
    laudat: {
      maailmankartta: { x: 6314.2, y: 1960.9 },
      europe: { x: 488.2, y: 949.2 },
    },
    teksti: 'Mostan rotunda, Neitsyt Marian taivaaseenottamisen basilika, on roomalaiskatolinen '
      + 'seurakuntakirkko Mostassa; se rakennettiin vuosina 1833–1860-luvun alku Giorgio '
      + 'Grognet de Vassén uusklassisten piirustusten mukaan aiemman, noin vuonna 1614 '
      + 'rakennetun renessanssikirkon paikalle. Kirkon esikuva on Rooman Pantheon, ja sen '
      + 'kupoli on maailman kolmanneksi suurin tukematon kupoli; kirkko on Maltan suurin. '
      + 'Kaupungin väkiluku oli 1830-luvulla kasvanut liian suureksi vanhalle kirkolle, ja '
      + 'uusi kirkko rakennettiin vanhan ympärille, joka pysyi käytössä koko rakennusajan; '
      + 'mostalaiset osallistuivat rakennustyöhön sunnuntaisin ja pyhäpäivinä. Rotunda '
      + 'valmistui 28 vuodessa 1860-luvun alussa, vanha kirkko purettiin vuonna 1860, ja uusi '
      + 'vihittiin 15. lokakuuta 1871. Toisen maailmansodan aikana pommi lävisti kupolin '
      + 'mutta ei räjähtänyt.',
    lahde: 'en-Wikipedia "Rotunda of Mosta" ja "Mosta", johdanto-osat ja osio "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-hypogeum',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-hypogeum-fda91820.jpg',
      lyhyt: 'Hypogeumin keskitason kammio valaistuna.',
      selite: 'Maanalainen temppeli on kaiverrettu kokonaan kalkkikiveen: pilarien, kynnysten ja kaarevien kattopintojen muodot on hakattu suoraan kallioon. Tila on yli viisituhatta vuotta vanha esihistoriallinen rakennelma.',
      lahde: 'Valokuva: xiquinhosilva, Wikimedia Commons (CC BY 2.0).',
      tekija: 'xiquinhosilva',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hal_Saflieni_Hypogeum_–_Middle_Level_–_The_Central_Chamber.jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-hypogeum-a9816be8.jpg',
        lyhyt: 'Hypogeumin sisäänkäyntirakennus Paolan kadun varrella.',
        selite: 'Maanalaiseen temppeliin pääsee vaatimattoman rakennuksen kautta tavallisella asuinkadulla. Itse hypogeum on kokonaan maan alla.',
        lahde: 'Valokuva: Ethan Doyle White, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Ethan Doyle White',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Entrance_to_the_Ħal-Saflieni_Hypogeum.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ħal Saflieni',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna hypogeum löydettiin?',
      'Kuinka monta kävijää päivässä hypogeumiin nykyään päästetään?',
    ],
    korostukset: ['hypogeum|hypogeum'],
    nappi: 'Maanalainen neoliittinen temppeli, joka löytyy vahingossa vasta vuonna 1902',
    // 14.50680556 E / 35.86958333 N — en-Wikipedia "Ħal Saflieni Hypogeum"
    laudat: {
      maailmankartta: { x: 6316.9, y: 1962.5 },
      europe: { x: 489.7, y: 950.2 },
    },
    teksti: 'Ħal Saflienin hypogeum on neoliittinen maanalainen rakenne Paolassa Maltalla, '
      + 'Saflieni-kaudelta (3300–3000 eaa.). Sitä pidetään pyhäkkönä ja hautausmaana, ja '
      + 'arkeologit ovat dokumentoineet yli 7 000 ihmisen jäännökset; se on yksi parhaiten '
      + 'säilyneitä Maltan temppelirakentajakulttuurin kohteita. Rakenne löytyi vahingossa '
      + 'vuonna 1902, kun työmiehet louhivat sisternejä uudelle asuinalueelle ja puhkaisivat '
      + 'sen katon; kaivauksia johti aluksi Manuel Magri vuodesta 1903 ja sitten Themistocles '
      + 'Zammit, joka julkaisi raporttinsa vuodesta 1910. Hypogeum avattiin kävijöille jo '
      + 'vuonna 1908, ja nykyään Heritage Malta päästää sisään vain 80 kävijää päivässä ja '
      + 'säätelee tarkasti mikroilmastoa.',
    lahde: 'en-Wikipedia "Ħal Saflieni Hypogeum", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-ta-pinu',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-ta-pinu-e01cd7c5.jpg',
      lyhyt: 'Ta\' Pinun pyhäkkökirkko kellotorneineen ja kupoleineen Gozon maaseudun keskellä.',
      selite: 'Vaalea kalkkikivikirkko kohoaa Gozon Għarbin lähellä. Rakennuksessa on korkea kellotorni kellotauluineen, kupoli ja ruusuikkuna, ja taustalla siintää meri.',
      lahde: 'Valokuva: StefanM76, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'StefanM76',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ta\'_Pinu_Gozo.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-ta-pinu-e76f7bf5.jpg',
        lyhyt: 'Ta\' Pinun pyhäkkö kaukaa katsottuna peltojen ja kivimuurien ympäröimänä.',
        selite: 'Pyhäkkö erottuu Gozon vehreässä maisemassa kaukaa, kellotorni ja kupoli horisonttia vasten. Ympärillä on viljelypalstoja ja kiviaitoja.',
        lahde: 'Valokuva: Simon Burchell, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Simon Burchell',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Basilica_of_the_National_Shrine_of_the_Blessed_Virgin_of_Ta\'_Pinu,_Gozo_02.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ta’ Pinu',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mitä Ta’ Pinu tarkoittaa?',
      'Minä vuonna uuden kirkon rakentaminen aloitettiin?',
    ],
    korostukset: ['pyhäkkö|pyhäkkö'],
    nappi: 'Gozon vanha kappeli, jonka ihmeet alkavat vasta vuonna 1883',
    // 14.21483333 E / 36.06177778 N — en-Wikipedia "Ta\" Pinu"
    laudat: {
      maailmankartta: { x: 6307.2, y: 1955.2 },
      europe: { x: 484.1, y: 945.2 },
    },
    teksti: 'Ta’ Pinun kansallinen pyhäkkö on roomalaiskatolinen basilika noin 700 metrin päässä '
      + 'Għarbin kylästä Maltan sisarsaarella Gozolla. Pyhäkön alkuperä on tuntematon: vuonna '
      + '1575 apostolinen visitaattori Pietro Dusina piti kappelin kuntoa niin huonona, että '
      + 'määräsi sen suljettavaksi ja purettavaksi, mutta työmiehen käsi murtui ensimmäisessä '
      + 'iskussa, mitä pidettiin merkkinä, ja kappeli jäi saaren ainoaksi, joka säilyi. '
      + 'Vuonna 1598 Pinu Gauci tuli kappelin hoitajaksi, ja nimi muuttui Gentilen kappelista '
      + 'Ta’ Pinuksi eli Filipin; vuonna 1619 Amadeo Perugino maalasi pääalttarille Neitsyt '
      + 'Marian taivaaseenottamisen. Vuonna 1883 Karmni Grima kuuli kappelin ohi kulkiessaan '
      + 'äänen, joka pyysi häntä lausumaan kolme Ave Mariaa, ja seuraavina vuosina kappelin '
      + 'Neitsyt Marialle liitettiin ihmeitä; uuden kirkon rakentaminen aloitettiin 30. '
      + 'toukokuuta 1920.',
    lahde: 'en-Wikipedia "Ta\' Pinu", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-birgu',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-birgu-23d73dc2.jpg',
      lyhyt: 'Birgun vanhakaupunki, kirkon kupoli ja bastionit satamasta katsottuna.',
      selite: 'Kalkkikivitalot nousevat rinteeseen Grand Harbourin rannalla, ja niiden yläpuolella kohoavat kirkon kupoli ja kellotorni. Oikealla näkyy holvikaarien kannattelema satamamuuri ja vanhoja linnoituksia.',
      lahde: 'Valokuva: MrPanyGoff, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'MrPanyGoff',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Birgu-Vittoriosa_-_Malta.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/mlt-nosto-birgu-6631511f.jpg',
        lyhyt: 'Kapea kivetty katu Birgun vanhassakaupungissa.',
        selite: 'Kaupungin kapeat kadut on päällystetty kalkkikivilaatoilla, ja talojen seinistä työntyvät esiin maalatut puiset parvekkeet. Kadun varrella on ruukkukasveja.',
        lahde: 'Valokuva: Edelmauswaldgeist, Wikimedia Commons (CC0).',
        tekija: 'Edelmauswaldgeist',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gasse_Birgu_01.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
    ],
    nimi: 'Vittoriosa (Birgu)',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuosina Birgu oli Maltan käytännön pääkaupunki?',
      'Millä nimellä kaupunkia kutsutaan italiaksi?',
    ],
    korostukset: ['Vittoriosa|Vittoriosa'],
    nappi: 'Vittoriosa: ritarikunnan ensimmäinen kaupunki Grand Harbourin eteläpuolella',
    // 14.5225 E / 35.88805556 N — en-Wikipedia "Birgu"
    laudat: {
      maailmankartta: { x: 6317.4, y: 1961.8 },
      europe: { x: 490, y: 949.7 },
    },
    teksti: 'Birgu, italiaksi Vittoriosa eli Voitokas kaupunki, on vanha linnoitettu kaupunki '
      + 'Grand Harbourin eteläpuolella niemellä, jonka kärjessä on Fort Saint Angelo ja '
      + 'tyvellä Cospicua. Ennen Vallettan perustamista Grand Harbourin hallitsemiseksi oli '
      + 'valloitettava Birgu. Kaupunki oli Johanniittaritarikunnan tukikohta ja käytännössä '
      + 'Maltan pääkaupunki vuosina 1530–1571: kun ritarikunta oli menettänyt Rodoksen '
      + 'osmaneille ja saanut Maltan uudeksi kodikseen, se valitsi Birgun pääkaupungiksi, '
      + 'koska Mdina oli sisämaassa eikä sopinut sen merisotilaallisiin tarpeisiin. Birgu on '
      + 'tunnettu tärkeästä osastaan Maltan suuressa piirityksessä vuonna 1565. 1900-luvun '
      + 'alussa kaupungissa oli yli 6 000 asukasta, ja paikalliset puhuvat '
      + 'Cottonera-murretta.',
    lahde: 'en-Wikipedia "Birgu", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-fort-manoel',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-fort-manoel-8e1ce2b9.jpg',
      lyhyt: 'Fort Manoel kohoaa pienellä saarella Marsamxettin sataman keskellä, muurit ja kellotorni näkyvissä.',
      selite: 'Tähtimäinen linnoitus peittää koko pienen Manoel-saaren Marsamxettin satamassa. Vaaleat kalkkikivimuurit ja niiden takana kohoava kirkon kellotorni kuvastuvat kirkkaaseen veteen.',
      lahde: 'Valokuva: Frank Vincentz, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Frank Vincentz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Malta_-_Gzira_-_Manoel_Island_-_Fort_Manoel_(Ferry_Sliema-Valletta)_02_ies.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-fort-manoel-380c08cc.jpg',
        lyhyt: 'Fort Manoel Vallettasta katsottuna, kaupungin kattojen ja tornien takaa.',
        selite: 'Linnoitus erottuu Marsamxettin sataman toiselta puolelta, Vallettan bastionien ja modernien kerrostalojen takaa.',
        lahde: 'Valokuva: Stefan Bellini, Wikimedia Commons (CC0).',
        tekija: 'Stefan Bellini',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fort_Manoel_-_View_from_Valletta.JPG',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
    ],
    nimi: 'Fort Manoel',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kenen mukaan Fort Manoel on nimetty?',
      'Minä vuonna britit ottivat linnoituksen haltuunsa?',
    ],
    korostukset: ['Vilhena|Vilhenan'],
    nappi: 'Marsamxettin satamaa vartioiva linnoitus on ollut brittien varuskuntana vuodesta 1800',
    // 14.50527778 E / 35.90305556 N — en-Wikipedia "Fort Manoel"
    laudat: {
      maailmankartta: { x: 6316.8, y: 1961.2 },
      europe: { x: 489.7, y: 949.3 },
    },
    teksti: 'Fort Manoel on tähtimäinen linnoitus Manoel-saarella Gżiran edustalla Marsamxettin '
      + 'satamassa. Sen rakensi 1700-luvulla Johanniittaritarikunta suurmestari António Manoel '
      + 'de Vilhenan aikana, jonka mukaan sekä saari että linnoitus on nimetty. Linnoitus '
      + 'hallitsee Marsamxettin satamaa ja Slieman ankkuripaikkaa, ja se yhdistää '
      + 'barokkiarkkitehtuurin käytännöllisyyteen. Ranskalaismiehityksen jälkeen britit ottivat '
      + 'linnoituksen käyttöönsä vuonna 1800 ja pitivät sitä varuskuntanaan vuoteen 1964 asti.',
    lahde: 'en-Wikipedia "Fort Manoel", johdanto-osa ja osio "History" (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minkä ritarikunnan suurmestarin mukaan Fort Manoel on nimetty?',
      vaihtoehdot: [
        'António Manoel de Vilhena',
        'Jean Parisot de Valette',
        'Hugues Loubenx de Verdalle',
        'Juan de Homedes',
      ],
      oikea: 0,
      fakta: 'Britit käyttivät linnoitusta varuskuntana vuoteen 1964 asti.',
    },
  },
  {
    id: 'hahmotelma-popeye-village',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-popeye-village-5250b846.jpg',
      lyhyt: 'Popeye Villagen värikkäät puurakennukset kallion juurella turkoosin lahden rannalla.',
      selite: 'Kaltevat, väreiltään kirjavat puutalot kiipeävät kallioseinämää vasten pienen suojaisan lahden ympärillä. Rannassa keinuu perinteisiä kalastajaveneitä.',
      lahde: 'Valokuva: DXR, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'DXR',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:View_of_Popeye_Village,_Malta_20110424_1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-popeye-village-e39cd62a.jpg',
        lyhyt: 'Panoraamanäkymä Popeye Villagesta ja Ankkurilahdesta jyrkkien kalkkikivikallioiden välissä.',
        selite: 'Kylän puurakennukset ja niiden pitkät laiturit levittäytyvät kapean, jyrkkäreunaisen lahden ympärille.',
        lahde: 'Valokuva: Giorgio Galeotti, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Giorgio Galeotti',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Popeye_Village_-_Anchor_Bay,_Mellieha,_Malta_-_April_24,_2013_02.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0/',
      },
    ],
    nimi: 'Popeye Village',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mitä elokuvaa varten kylä alun perin rakennettiin?',
      'Ketkä olivat elokuvan pääosien näyttelijät?',
    ],
    korostukset: ['Popeye-elokuvan|Popeye-elokuvan'],
    nappi: 'Kylää ei ole olemassa vielä 1873: se rakennetaan vasta 1980 elokuvalavasteeksi',
    // 14.3413 E / 35.960848 N — en-Wikipedia "Popeye Village"
    laudat: {
      maailmankartta: { x: 6311.4, y: 1959 },
      europe: { x: 486.6, y: 947.8 },
    },
    teksti: 'Popeye Village, tunnetaan myös nimellä Sweethaven Village, on alun perin '
      + 'elokuvalavasteeksi rakennettu puukylä Ankkurilahdella lähellä Mellieħaa. Se '
      + 'pystytettiin vuonna 1980 ilmestyneen Popeye-elokuvan kuvauksia varten, jonka '
      + 'tuottivat Paramount Pictures ja Walt Disney Productions ja jossa pääosissa olivat '
      + 'Robin Williams ja Shelley Duvall. Kuvausten jälkeen rapistuneen näköisistä '
      + 'puurakennuksista tehtiin yleisölle avoin ulkoilmamuseo ja rantapuisto.',
    lahde: 'en-Wikipedia "Popeye Village", johdanto-osa (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-mellieha',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-mellieha-7156c462.jpg',
      lyhyt: 'Mellieħan Neitsyt Marian pyhäkkökirkko punaisine kupoleineen kaupungin kattojen yllä.',
      selite: 'Kellotorni ja kaksi punakattoista kupolia kohoavat kalkkikivikirkosta, ja taustalla leviää Mellieħan kaupunki mereen asti.',
      lahde: 'Valokuva: Frank Vincentz, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Frank Vincentz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Malta_-_Mellieha_-_Misrah_il-Parocca_-_Sanctuary_of_our_Lady_of_Mellieha_01_ies.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-mellieha-f33cb947.jpg',
        lyhyt: 'Mellieħan kaupunki kohoaa rinteessä, taustalla pyhäkkökirkon tornit ja meri.',
        selite: 'Vaaleat kalkkikivitalot kasautuvat rinteeseen, ja kaupungin laidalla kohoavat pyhäkkökirkon kaksoistornit merta vasten.',
        lahde: 'Valokuva: Giorgio Galeotti, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Giorgio Galeotti',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sanctuary_of_our_Lady_of_Mellieha_-_Mellieha,_Malta_-_April_23,_2013_04.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0/',
      },
    ],
    nimi: 'Mellieħa',
    tyyppi: 'kaupunki',
    lahi: true,
    kysymykset: [
      'Mistä Mellieħan nimi juontuu?',
      'Minä vuonna pyhäkkökirkon luola vihittiin kirkoksi perimätiedon mukaan?',
    ],
    korostukset: ['korsaarien|korsaarien'],
    nappi: 'Kylä on ollut autio vuosisatoja korsaarien vuoksi; Pyhän Agatan torni suojaa rannikkoa jo 1649',
    // 14.36638889 E / 35.95638889 N — en-Wikipedia "Mellieħa"
    laudat: {
      maailmankartta: { x: 6312.2, y: 1959.2 },
      europe: { x: 487, y: 947.9 },
    },
    teksti: 'Mellieħa on suuri kylä Maltan pohjoisosassa, ja sen nimi juontuu seemiläisestä '
      + 'sanajuuresta, joka tarkoittaa suolaa – todennäköisesti alueella sijainneiden '
      + 'foinikialais-roomalaisten suolapatojen mukaan. Perimätiedon mukaan apostoli Paavalin '
      + 'matkakumppani Luukas maalasi Neitsyt Marian kuvan erään Mellieħan luolan '
      + 'kallioseinään, ja luola vihittiin kirkoksi vuonna 409; siitä tuli myöhemmin Neitsyt '
      + 'Marian pyhäkkökirkko. Kylä oli yksi Maltan kymmenestä ensimmäisestä seurakunnasta, '
      + 'mutta se autioitui 1400–1500-lukujen taitteessa korsaarien hyökkäysten vuoksi eikä '
      + 'asutus palannut ennen 1500-luvun loppua. Pohjoisrannikkoa alettiin linnoittaa '
      + '1600-luvun alussa, ja ensimmäinen Mellieħan linnoitus, Pyhän Agatan torni, valmistui '
      + 'vuonna 1649.',
    lahde: 'en-Wikipedia "Mellieħa", johdanto-osa ja osiot "Etymology" ja "History" '
      + '(tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-marsaskala',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-marsaskala-a135c91c.jpg',
      lyhyt: 'Marsaskalan lahti ja rantakatu, taustalla kaupungin kattoja ja kirkontorneja.',
      selite: 'Kapea lahti pistää sisämaahan, ja sen molemmin puolin kulkee rantakatu. Kaupungin rakennukset nousevat loivasti ylöspäin lahden takana.',
      lahde: 'Valokuva: Frank Vincentz, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Frank Vincentz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Malta_-_Marsaskala_-_Triq_is-Salini+Marsaskala_Bay+Triq_Zonqor_02_ies.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-marsaskala-e8a8bdbe.jpg',
        lyhyt: 'Marsaskalan satama täynnä pieniä veneitä, taustalla rinteeseen nouseva kaupunki.',
        selite: 'Kymmenet pienet veneet keinuvat suojaisassa satamassa, ja niiden takana kohoaa tiiviisti rakennettu rantakaupunki.',
        lahde: 'Valokuva: Pacopac, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Pacopac',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Marsaskala_Bay_in_Malta.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Marsaskala',
    tyyppi: 'merenkulku',
    lahi: true,
    kysymykset: [
      'Mitä marsa tarkoittaa arabiaksi?',
      'Minä vuonna kaupungin seurakuntakirkko valmistui?',
    ],
    korostukset: ['Wied il-Għajn|Wied il-Għajniksi'],
    nappi: 'Vanha kalastajakylä, jonka nykyinen seurakuntakirkko rakennetaan vasta 1950-luvulla',
    // 14.5675 E / 35.8625 N — en-Wikipedia "Marsaskala"
    laudat: {
      maailmankartta: { x: 6318.9, y: 1962.7 },
      europe: { x: 490.9, y: 950.4 },
    },
    teksti: 'Marsaskala, maltaksi myös Wied il-Għajn, on rantakaupunki Maltan eteläosassa; se '
      + 'oli alun perin kalastajakylä, mutta on kasvanut suosituksi matkailukohteeksi ja '
      + 'pysyväksi asuinpaikaksi. Nimi on koostesana arabiasta: marsa tarkoittaa satamaa, ja '
      + 'jälkiosa skala juontuu todennäköisesti sisilialaisia kalastajia tarkoittavasta '
      + 'sanasta. Maltaksi kaupunkia kutsutaan myös Wied il-Għajniksi, koska lahden pohjukkaan '
      + 'laskeutui ennen kaksi laaksoa, joiden makean veden lähde virtasi sisimpään lahteen. '
      + 'Nykyinen seurakuntakirkko, joka on omistettu Pyhälle Annalle, valmistui vasta 1953, '
      + 'ja kaupungin juhlaa vietetään heinäkuun lopussa.',
    lahde: 'en-Wikipedia "Marsaskala", johdanto-osa ja osio "Name and etymology" (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-verdala-palace',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-verdala-palace-2f8b1cbd.jpg',
      lyhyt: 'Verdalan palatsi Maltan lippu liehuen tornissaan, Buskettin puiston puiden keskellä.',
      selite: 'Neliömäinen linnamainen palatsi neljine kulmatorneineen kohoaa mäntymetsän yläpuolelle. Katolla liehuu Maltan lippu.',
      lahde: 'Valokuva: Rhododendrites, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Rhododendrites',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Verdala_Palace_(50023).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-verdala-palace-9ee637d0.jpg',
        lyhyt: 'Verdalan palatsi kaukaa katsottuna Buskettin puutarhojen puiden yllä.',
        selite: 'Palatsin kulmatornit ja lipputanko erottuvat puuston latvojen yläpuolella harmaan pilvisellä taivaalla.',
        lahde: 'Valokuva: Frank Vincentz, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Frank Vincentz',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Malta_-_Siggiewi_-_Triq_il-Buskett_-_Buskett_Gardens_+_Verdala_Palace_03_ies.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Verdalan palatsi',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minkä suurmestarin mukaan palatsi on nimetty?',
      'Mitä rakennusta paikalla oli ennen palatsia?',
    ],
    korostukset: ['Verdallen|Verdallen'],
    nappi: 'Suurmestarien vanha metsästyspalatsi toimii brittiaikana kuvernöörin kesäasuntona',
    // 14.400614 E / 35.861531 N (koordinaatit Wikimedia Commonsin luokkasivulta) — en-Wikipedia "Verdala Palace"
    laudat: {
      maailmankartta: { x: 6313.4, y: 1962.8 },
      europe: { x: 487.7, y: 950.4 },
    },
    teksti: 'Verdalan palatsi kohoaa Buskettin puutarhojen keskellä Siġġiewin kunnan alueella, '
      + 'ja se toimii nykyään Maltan presidentin virallisena kesäasuntona. Paikalla oli '
      + '1550–1560-luvuilla Johanniittaritarikunnan suurmestari Jean Parisot de la Valetten '
      + 'rakennuttama metsästysmaja Boschetton riistamaalla, ja maja laajennettiin palatsiksi '
      + 'vuonna 1586 suurmestari Hugues Loubenx de Verdallen aikana, jonka mukaan palatsi on '
      + 'nimetty. Rakennusta koristeltiin lisää 1600- ja 1700-luvuilla suurmestarien Giovanni '
      + 'Paolo Lascarisin ja António Manoel de Vilhenan kausina. Brittiaikana palatsi toimi '
      + 'Maltan kuvernöörin residenssinä San Anton -palatsin ohella, ja siellä majoittui myös '
      + 'brittihallitsijoita ja muuta ylhäisöä.',
    lahde: 'en-Wikipedia "Verdala Palace", johdanto-osa ja osio "History" (tarkistettu '
      + '21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna metsästysmaja laajennettiin palatsiksi?',
      vaihtoehdot: [
        '1550',
        '1586',
        '1650',
        '1700',
      ],
      oikea: 1,
      fakta: 'Palatsi on nykyään Maltan presidentin virallinen kesäasunto.',
    },
  },
  {
    id: 'hahmotelma-ghar-dalam',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-ghar-dalam-8af2bbd1.jpg',
      lyhyt: 'Għar Dalamin luolakäytävä valaistuna, kävelysilta kulkee kaivauskuoppien vierellä.',
      selite: 'Pitkä, kaareva luolakäytävä on louhittu kalkkikiveen. Käytävän pohjalla näkyvät kaivausalueet ja niitä reunustava kävelysilta.',
      lahde: 'Valokuva: Jean-Christophe BENOIST, Wikimedia Commons (CC BY 2.5).',
      tekija: 'Jean-Christophe BENOIST',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:GharDalam-VueGrotte.jpg',
      lisenssi: 'CC BY 2.5',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.5/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-ghar-dalam-bc3ce9af.jpg',
        lyhyt: 'Għar Dalamin luolan suuaukko ja valaistu käytävä syvemmälle kallioon.',
        selite: 'Luolan kaareva suuaukko avautuu pimeään käytävään, jonka pohjalla erottuvat kaiteet ja valot.',
        lahde: 'Valokuva: Frank Vincentz, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Frank Vincentz',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Malta_-_Birzebbuga_-_Triq_Ghar_Dalam_-_Ghar_Dalam_-_cave_05_ies.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Għar Dalam',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna Arturo Issel teki ensimmäiset tieteelliset kaivaukset luolassa?',
      'Millaisten eläinten luita luolasta on löydetty?',
    ],
    korostukset: ['kääpiönorsuja|kääpiönorsuja'],
    nappi: 'Luola on jo tunnettu löytöpaikka 1873: Issel kaivoi sitä tieteellisesti kahdeksan vuotta aiemmin',
    // 14.52802778 E / 35.83641667 N — en-Wikipedia "Għar Dalam"
    laudat: {
      maailmankartta: { x: 6317.6, y: 1963.7 },
      europe: { x: 490.1, y: 951.1 },
    },
    teksti: 'Għar Dalam on 144 metriä pitkä luolaputki Birżebbuġan liepeillä, ja sen '
      + 'kerrostumista on löydetty pleistoseeni- ja holoseenikautisten eläinten luita: '
      + 'kääpiönorsuja, virtahepoja, jättiläisjoutsenia, peuroja ja karhuja. Luola on antanut '
      + 'nimensä Maltan esihistorian varhaiselle Għar Dalam -vaiheelle, ja sitä pidetään '
      + 'yhtenä saarten tärkeimmistä muinaismuistoista. Ensimmäiset tieteelliset kaivaukset '
      + 'teki italialainen paleontologi Arturo Issel vuonna 1865, ja lisäkaivauksia teki John '
      + 'H. Cooke vuonna 1892; osa löydöistä lähetettiin vertailukokoelmaksi Lontoon British '
      + 'Museumiin.',
    lahde: 'en-Wikipedia "Għar Dalam", johdanto-osa ja osio "Recent history" (tarkistettu '
      + '21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Għar Dalamissa tehtiin ensimmäiset tieteelliset kaivaukset?',
      vaihtoehdot: [
        '1855',
        '1865',
        '1892',
        '1902',
      ],
      oikea: 1,
      fakta: 'Luolasta on löydetty muun muassa kääpiönorsujen ja -virtahepojen luita.',
    },
  },
  {
    id: 'hahmotelma-kalkara',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-kalkara-90349adc.jpg',
      lyhyt: 'Kalkaran rivitalot värikkäine parvekkeineen Kalkaran puron rannalla.',
      selite: 'Kapea katu kulkee vaaleiden kalkkikivitalojen välissä, joiden parvekkeissa on maltalaisittain maalattuja puukaiteita.',
      lahde: 'Valokuva: Christian Camenzuli, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Christian Camenzuli',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kalkara_townhouses_overlooking_the_creek,_in_2026.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-kalkara-6de95b1f.jpg',
        lyhyt: 'Kalkaran puro täynnä purjeveneitä, taustalla vanhoja varastorakennuksia ja uudempia taloja.',
        selite: 'Suojaisassa lahdessa on kymmeniä purjeveneitä laitureissa. Rannalla vuorottelevat rapistuneet kivivarastot ja uudet asuinrakennukset.',
        lahde: 'Valokuva: Frank Vincentz, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Frank Vincentz',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Malta_-_Kalkara_-_Triq_Marina_+_Kalkara_Creek_(Triq_il-Mandragg)_01_ies.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Kalkara',
    tyyppi: 'merenkulku',
    lahi: true,
    kysymykset: [
      'Mistä latinan sanasta Kalkaran nimi juontuu?',
      'Mitkä kylät rajaavat Kalkaraa?',
    ],
    korostukset: ['calce|calce'],
    nappi: 'Vaatimaton kalastajakylä Grand Harbourin poukamassa, Birgun ja Żabbarin naapurina',
    // 14.52944444 E / 35.88916667 N — en-Wikipedia "Kalkara"
    laudat: {
      maailmankartta: { x: 6317.6, y: 1961.7 },
      europe: { x: 490.2, y: 949.7 },
    },
    teksti: 'Kalkara on kylä Maltan satama-alueella Kalkaran puron ympärillä, ja sen '
      + 'naapureina ovat Birgu, Żabbar ja Xgħajra. Nimi juontuu latinan kalkkia tarkoittavasta '
      + 'sanasta calce, ja alueella uskotaan olleen kalkinpolttouuni jo roomalaisajalta. Kylä '
      + 'syntyi pienenä kalastajayhteisönä suojaisan Kalkaran puron ympärille, ja jotkut '
      + 'historioitsijat arvelevat sen olleen yksi Maltan ensimmäisistä asutuista paikoista, '
      + 'koska Grand Harbourin poukamat tarjosivat suojan pitkän merimatkan jälkeen. '
      + 'Kristinusko saapui alueelle mahdollisesti jo varhain, sillä Santa Duminkan kedolta on '
      + 'löydetty varhaiskristillisiä hypogeumeja.',
    lahde: 'en-Wikipedia "Kalkara", johdanto-osa ja osio "History" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-blue-grotto',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-blue-grotto-2d55e69b.jpg',
      lyhyt: 'Sinisen luolan meriluolat avautuvat kalkkikivijyrkänteessä, kuvattuna venekierrokselta.',
      selite: 'Tumma meriluolan suuaukko aukeaa vaalean kalkkikivikallion juurella. Luolan katossa ja seinillä näkyy kerroksellista kiveä.',
      lahde: 'Valokuva: Frank Vincentz, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Frank Vincentz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Malta_-_Qrendi_(Blue_Grotto_tour_boat)_10_ies.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-blue-grotto-68d0d1bc.jpg',
        lyhyt: 'Venekierroksen näkymä Sinisen luolan rannikolle Wied iż-Żurrieqin ja luolaston välillä.',
        selite: 'Korkea kalkkikivijyrkänne nousee suoraan sinisestä merestä, pinnassa näkyy koloja ja pieniä luolia.',
        lahde: 'Valokuva: Frank Vincentz, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Frank Vincentz',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Malta_-_Qrendi_(Blue_Grotto_tour_boat)_36_ies.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Sininen luola',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Minkä kylän alueeseen luolat kuuluvat?',
      'Mikä asumaton saari näkyy luolien edustalla?',
    ],
    korostukset: ['Filfla|Filfla-saari'],
    nappi: 'Merenveden värit vaihtelevat luolissa jo ennen kuin niistä tulee venekierrosten kohde 1900-luvulla',
    // 14.45 E / 35.81666667 N — en-Wikipedia "Blue Grotto (Malta)"
    laudat: {
      maailmankartta: { x: 6315, y: 1964.5 },
      europe: { x: 488.6, y: 951.6 },
    },
    teksti: 'Sininen luola on joukko meriluolia Maltan kaakkoisrannikolla, lähellä Wied '
      + 'iż-Żurrieqin kalastajasatamaa. Luolat ja satama kuuluvat Qrendin kylän alueeseen, '
      + 'mikä vahvistettiin Qrendin ja Żurrieqin välisessä rajakiistassa vuonna 1910. Luolien '
      + 'seinät heijastavat merenveden erilaisia sinisen sävyjä, ja jotkin luolat heijastavat '
      + 'myös vedenalaisen kasviston ja eläimistön fosforoivia värejä. Aivan luolien edustalla, '
      + 'merenselällä, sijaitsee asumaton Filfla-saari, joka on nykyään lintujensuojelualue.',
    lahde: 'en-Wikipedia "Blue Grotto (Malta)", johdanto-osa (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minkä saaren viereen Sininen luola sijoittuu?',
      vaihtoehdot: [
        'Comino',
        'Filfla',
        'Cominotto',
        'Manoel',
      ],
      oikea: 1,
      fakta: 'Filfla on nykyään lintujensuojelualue.',
    },
  },
  {
    id: 'hahmotelma-victoria-cittadella',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-victoria-cittadella-7a7d152d.jpg',
      lyhyt: 'Cittadellan bastionimuuri Victorian yllä, taustalla kaupungin kattoja ja Pyhän Yrjön basilikan kupoli.',
      selite: 'Cittadellan paksu kalkkikivimuuri kaartuu terassin reunalla, jolla seisoo vanha tykki. Alempana leviää Victorian kattomeri ja basilikan punainen kupoli.',
      lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Diego Delso',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ciudadela,_Victoria,_isla_de_Gozo,_Malta,_2021-08-22,_DD_17.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-victoria-cittadella-6f4914c5.jpg',
        lyhyt: 'Pyhän Yrjön basilikan kullattu kattomaalaus Victoriassa.',
        selite: 'Kirkon holvikatto on täynnä kullattuja kehyksiä ja raamatullisia maalauksia, ja valo virtaa sisään lasimaalatuista ikkunoista.',
        lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Diego Delso',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bas%C3%ADlica_de_San_Jorge,_Victoria,_isla_de_Gozo,_Malta,_2021-08-22,_DD_14-16_HDR.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Victoria (Cittadella)',
    tyyppi: 'kaupunki',
    lahi: true,
    kysymykset: [
      'Minä vuonna osmanit valtasivat ja ryöstivät Cittadellan?',
      'Minä vuonna kaupunki sai nimen Victoria?',
    ],
    korostukset: ['Rabatina|Rabatina'],
    nappi: 'Gozon pääkaupunkia kutsutaan 1873 yhä Rabatiksi – nimi Victoria annetaan vasta 1887',
    // 14.23944444 E / 36.04638889 N — en-Wikipedia "Cittadella (Gozo)"
    laudat: {
      maailmankartta: { x: 6308, y: 1955.7 },
      europe: { x: 484.6, y: 945.6 },
    },
    teksti: 'Cittadella on Gozon pääkaupungin linnoitettu ydin, jota kutsutaan myös '
      + 'Castelloksi; itse kaupunki tunnettiin ennen nimeä Victoria yksinkertaisesti '
      + 'Rabatina. Aluetta on asutettu pronssikaudesta lähtien, ja Cittadellan paikalla '
      + 'sijaitsi todennäköisesti puunilais-roomalaisen Gaulos-kaupungin akropolis. '
      + 'Keskiajalla akropoliksesta tehtiin linna, joka toimi turvapaikkana saaren väestölle, '
      + 'ja sen ulkopuolelle kasvoi 1400-luvulla esikaupunki, josta muodostui nykyisen '
      + 'kaupungin vanha keskusta. Linnoitus oli 1500-luvulle tultaessa vanhentunut, ja '
      + 'osmanit valtasivat ja ryöstivät sen vuonna 1551; eteläismuurit rakennettiin '
      + 'uudelleen ruutilinnoitukseksi vuosina 1599–1622. Ison-Britannian hallitus antoi '
      + 'kaupungille nimen Victoria vasta vuonna 1887 kuningatar Victorian kultaisten '
      + 'kruunajaisten kunniaksi, ja moni gozolainen kutsuu sitä yhä vanhalla nimellä Rabat.',
    lahde: 'en-Wikipedia "Cittadella (Gozo)" ja "Victoria, Malta", johdanto-osat ja osio '
      + '"History" (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Gozon pääkaupunki sai nimen Victoria?',
      vaihtoehdot: [
        '1837',
        '1867',
        '1887',
        '1901',
      ],
      oikea: 2,
      fakta: 'Nimi annettiin kuningatar Victorian kultaisten kruunajaisten kunniaksi.',
    },
  },
  {
    id: 'hahmotelma-wied-il-ghasri',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-wied-il-ghasri-5b436f5b.jpg',
      lyhyt: 'Wied il-Għasrin kapea merikuru jyrkkien kalkkikivikallioiden välissä.',
      selite: 'Turkoosi merivesi täyttää kapean, jyrkkäreunaisen kurun, joka aukeaa kaukana merelle.',
      lahde: 'Valokuva: Marika Caruana, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Marika Caruana',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Wied_il-Ghasri,_Gozo.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-wied-il-ghasri-fea9b444.jpg',
        lyhyt: 'Näkymä Wied il-Għasrin laaksosta merelle päin, uimareita rannassa.',
        selite: 'Kapea laakso avautuu vähitellen kohti avomerta, ja rannassa uivat pienet ihmishahmot antavat mittakaavan jyrkille kallioseinille.',
        lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Diego Delso',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Wied_Il-%C4%9Easri,_isla_de_Gozo,_Malta,_2021-08-23,_DD_07.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Wied il-Għasri',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Minkä kylän suuntaan laakso jatkuu maalle päin?',
      'Mitä laakson reunalla uskotaan sijainneen?',
    ],
    korostukset: ['suolapatoja|suolapatoja'],
    nappi: 'Syrjäinen merikuru, jonka suolapatoja on käytetty sukupolvien ajan',
    // 14.2285 E / 36.0788 N — en-Wikipedia "Għasri Valley"
    laudat: {
      maailmankartta: { x: 6307.6, y: 1954.5 },
      europe: { x: 484.4, y: 944.7 },
    },
    teksti: 'Wied il-Għasri on kapea merikuru Gozon pohjoisrannikolla, ja laakso jatkuu '
      + 'maalle päin kohti Għasrin kylää. Kurun pohjalla on rauhallinen ranta noin 300 metrin '
      + 'päässä merestä, ja merelle pääsee vain kapean, jyrkkäseinäisen sisäänkäynnin kautta. '
      + 'Laakson reunalla, vedenalaisen luolan vieressä, uskotaan sijainneen Maltan '
      + 'perinteisiä suolapatoja. Nykyään syrjäinen ranta on suosittu sukeltajien ja '
      + 'uimareiden keskuudessa.',
    lahde: 'en-Wikipedia "Għasri Valley", johdanto-osa (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-fungus-rock',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-fungus-rock-02f7b3cb.jpg',
      lyhyt: 'Fungus Rock -kallio Dwejran lahdella, meren ympäröimänä.',
      selite: 'Jyrkkäseinäinen, kasvipeitteinen kalliosaareke kohoaa suoraan mereltä lahden suulla, taustalla toinen kalkkikivijyrkänne.',
      lahde: 'Valokuva: Michael Leithold, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Michael Leithold',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fungus_rock_dwejra-bucht_gozo.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-fungus-rock-4ad9616d.jpg',
        lyhyt: 'Dwejran lahden rantaviiva auringonlaskun valossa, Fungus Rock etäällä merellä.',
        selite: 'Illan kultainen valo värjää rantakalliot, ja lahden suulla kohoaa erillinen kalliosaareke.',
        lahde: 'Valokuva: JosephAmodio, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'JosephAmodio',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fungus_Rock,_Dwejra_Bay,_Gozo_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Fungus Rock',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Minä vuonna suurmestari Pinto julisti kallion kielletyksi?',
      'Mitä rangaistusta luvattomalle kiipeäjälle uhattiin?',
    ],
    korostukset: ['loisikasvin|loisikasvin'],
    nappi: 'Kallio on ollut kiellettyä aluetta jo 127 vuotta 1873: vartijat estävät nousun',
    // 14.19083333 E / 36.04583333 N — en-Wikipedia "Fungus Rock"
    laudat: {
      maailmankartta: { x: 6306.4, y: 1955.8 },
      europe: { x: 483.7, y: 945.6 },
    },
    teksti: 'Fungus Rock on 60 metriä korkea kalkkikivisaareke Dwejran lähes ympyränmuotoisen '
      + 'mustan laguunin suulla Gozolla, ja se tunnetaan maltaksi myös nimellä Kenraalin kivi. '
      + 'Johanniittaritarikunnan ritarit löysivät kalliolta loisikasvin, jota kutsuttiin '
      + 'virheellisesti "maltalaiseksi sieneksi" ja jonka uskottiin ajan lääketieteessä '
      + 'parantavan haavoja ja punatautia; ritarit pitivät kasvia niin arvokkaana, että '
      + 'antoivat sitä lahjaksi arvovaltaisille vieraille. Suurmestari Pinto julisti kallion '
      + 'kielletyksi alueeksi vuonna 1746, ja luvattomalle kalliolle kiipeäjälle luvattiin '
      + 'kolmen vuoden rangaistus soutuorjana. Kallion vieressä sijaitsi myös luonnonkaari, '
      + 'Sininen ikkuna, joka romahti mereen vasta vuonna 2017.',
    lahde: 'en-Wikipedia "Fungus Rock", johdanto-osa ja osio "History" (tarkistettu '
      + '21.9.2026); en-Wikipedia "Azure Window".',
    visa: {
      kysymys: 'Minä vuonna suurmestari Pinto julisti Fungus Rockin kielletyksi alueeksi?',
      vaihtoehdot: [
        '1690',
        '1746',
        '1800',
        '1830',
      ],
      oikea: 1,
      fakta: 'Kalliolla kasvavaa loiskasvia pidettiin niin arvokkaana, että sitä annettiin '
        + 'lahjaksi ylhäisölle.',
    },
  },
  {
    id: 'hahmotelma-marsalforn',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-marsalforn-6b7647df.jpg',
      lyhyt: 'Marsalfornin rantakatu ja hotellirakennuksia sataman reunalla.',
      selite: 'Rantapromenadin varrella nousee vaaleita kerrostaloja ja hotelleja, ja kirkon kellotorni pistää esiin kattojen keskeltä.',
      lahde: 'Valokuva: Kritzolina, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Kritzolina',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Marsalforn,_Gozo_Nov_2014_03.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-marsalforn-b29b5075.jpg',
        lyhyt: 'Marsalfornin lahti ja kaupunki vihreän kukkulan juurella.',
        selite: 'Kirkkaan sininen lahti kaartuu rantakaupungin editse, ja sen takana kohoaa vehreä kukkula.',
        lahde: 'Valokuva: HasanK, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'HasanK',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Marsalforn_in_Gozo_-1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Marsalforn',
    tyyppi: 'kaupunki',
    lahi: true,
    kysymykset: [
      'Mitä sana marsa tarkoittaa arabiaksi?',
      'Minkä kahden kylän välissä Marsalforn sijaitsee?',
    ],
    korostukset: ['Qbajjarin|Qbajjarin'],
    nappi: 'Pieni satamakylä pohjoisrannikolla, kauan ennen kuin siitä tulee matkailukeskus',
    // 14.25833333 E / 36.07194444 N (koordinaatit Wikimedia Commonsin luokkasivulta) — en-Wikipedia "Marsalforn"
    laudat: {
      maailmankartta: { x: 6308.6, y: 1954.8 },
      europe: { x: 485, y: 944.9 },
    },
    teksti: 'Marsalforn on kaupunki Gozon pohjoisrannikolla, Xagħran ja Żebbuġin '
      + 'kukkulakylien välissä, ja siihen kuuluu myös Qbajjarin lahti. Nimi on '
      + 'yhdistelmäsana: marsa on arabiaa ja tarkoittaa satamaa, mutta jälkiosan forn-sanan '
      + 'alkuperästä ei olla varmoja. Kaupunki on Gozon suosituimpia matkailukeskuksia, ja '
      + 'siellä on runsaasti hotelleja, ravintoloita ja baareja, vaikka hiekkarantaa on vain '
      + 'vähän. Kivikkoisella rannikolla on sen sijaan lukuisia uimapaikkoja kallioiden '
      + 'lomassa.',
    lahde: 'en-Wikipedia "Marsalforn", johdanto-osa ja osio "Name" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-ramla-bay',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-ramla-bay-7df24ce7.jpg',
      lyhyt: 'Ramla Bayn punertava hiekkaranta ja rantakalliot pitkällä valotusajalla kuvattuna.',
      selite: 'Punaisenkeltainen hiekka reunustaa lahtea, jonka vesi näyttää pitkän valotusajan vuoksi usvaiselta. Taustalla kohoaa vihreä niemi.',
      lahde: 'Valokuva: JosephAmodio, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'JosephAmodio',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ramla_Bay,_Gozo_1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-ramla-bay-66044b41.jpg',
        lyhyt: 'Ramla Bay talvisena päivänä, yksinäinen kulkija rannalla.',
        selite: 'Punainen hiekkaranta ulottuu pitkälle, ja matalikko heijastaa pilvistä taivasta. Rannan päässä kohoaa vihreä niemi.',
        lahde: 'Valokuva: Bellina 09, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Bellina 09',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ir-Ramla_l-Hamra_in_winter.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Ramla Bay',
    tyyppi: 'merenkulku',
    lahi: true,
    kysymykset: [
      'Mitä Ir-Ramla l-Ħamra tarkoittaa suomeksi?',
      'Minkä myyttisen hahmon nimeä lahden luola kantaa?',
    ],
    korostukset: ['Kalypsoon|Kalypsoon'],
    nappi: 'Punainen hiekkaranta ja Kalypson luolan taru ovat molemmat jo vanhaa perimätietoa 1873',
    // 14.283 E / 36.062 N — en-Wikipedia "Ramla Bay"
    laudat: {
      maailmankartta: { x: 6309.4, y: 1955.2 },
      europe: { x: 485.4, y: 945.2 },
    },
    teksti: 'Ramla Bay, maltaksi Ir-Ramla l-Ħamra eli "punainen hiekka", on lahti Gozon '
      + 'koillisrannikolla Marsalfornin ja San Blasin lahtien välissä, lähimpänä kylänä '
      + 'Xagħra. Lahden hiekka on nimensä mukaisesti punertavaa, mikä tekee siitä '
      + 'poikkeuksellisen Maltan saarilla, joilla suurin osa rannoista on vaaleaa kalkkikiveä '
      + 'tai kivikkoa. Lahtea reunustavat hiekkadyynit ja jyrkät kalliot, ja sen länsilaidalla '
      + 'sijaitsee luola, jonka perimätieto yhdistää Homeroksen Odysseiaan ja nymfi '
      + 'Kalypsoon.',
    lahde: 'en-Wikipedia "Ramla Bay" ja "Calypso\'s Cave", johdanto-osat (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-fort-chambray',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-fort-chambray-c959816e.jpg',
      lyhyt: 'Fort Chambrayn bastionimuuri ja tähtimäinen linnoitusmuoto ylhäältä.',
      selite: 'Paksut, viistot kalkkikivimuurit muodostavat teräväkulmaisia bastioneja kukkulan laella, ympärillä avautuu Gozon maaseutu.',
      lahde: 'Valokuva: JosephAmodio, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'JosephAmodio',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fort_Chambray,_Gozo_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-fort-chambray-9a17eae9.jpg',
        lyhyt: 'Fort Chambray Mġarrin lautalta katsottuna, kirkontorni sen vieressä.',
        selite: 'Linnoituksen pitkät, matalat rakennukset asettuvat kukkulan laelle meren yllä, ja lähellä kohoaa kaupungin kirkon torni ja kupoli.',
        lahde: 'Valokuva: Averater, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Averater',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fort_Chambray_from_the_ferry.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Fort Chambray',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä kaupunkia linnoituksen oli tarkoitus korvata Gozon pääkaupunkina?',
      'Miksi linnoitusta käytettiin ranskalaismiehityksen jälkeen?',
    ],
    korostukset: ['Ras it-Tafalin|Ras it-Tafalin'],
    nappi: 'Linnoitus, josta piti tulla Gozon uusi pääkaupunki – suunnitelma jäi toteutumatta',
    // 14.29333333 E / 36.02083333 N (koordinaatit Wikimedia Commonsin luokkasivulta) — en-Wikipedia "Fort Chambray"
    laudat: {
      maailmankartta: { x: 6309.8, y: 1956.7 },
      europe: { x: 485.6, y: 946.3 },
    },
    teksti: 'Fort Chambray on bastionilinnoitus Għajnsielemin kunnan alueella Gozolla, '
      + 'rakennettu 1700-luvun puolivälissä Johanniittaritarikunnan toimesta Ras it-Tafalin '
      + 'niemelle Mġarrin sataman ja Xatt l-Aħmarin välille. Linnoituksen oli tarkoitus toimia '
      + 'uuden kaupungin, joka olisi korvannut Cittadellan Gozon pääkaupunkina, '
      + 'ydinlinnakkeena, mutta suunnitelma ei koskaan toteutunut kokonaan. '
      + 'Ranskalaismiehityksen aikana vuonna 1798 linnoitus näki taisteluita, ja myöhemmin '
      + 'siitä tehtiin sotilassairaala ja mielisairaala. Nykyään linnoitusta kunnostetaan ja '
      + 'siihen rakennetaan majoitustiloja.',
    lahde: 'en-Wikipedia "Fort Chambray", johdanto-osa ja osio "Background and construction" '
      + '(tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Mitä Fort Chambraysta oli tarkoitus tulla?',
      vaihtoehdot: [
        'Uusi satama',
        'Gozon uuden pääkaupungin linnake',
        'Vankila',
        'Tykistökoulu',
      ],
      oikea: 1,
      fakta: 'Linnoitusta käytettiin myöhemmin sotilassairaalana ja mielisairaalana.',
    },
  },
  {
    id: 'hahmotelma-nadur',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-nadur-de6e82f4.jpg',
      lyhyt: 'Näkymä Nadurin ylätasangolta naapurikylä Għajnsielemiin ja merelle.',
      selite: 'Nadurin korkealta harjanteelta avautuu laaja näkymä alempana olevaan kylään ja sen takana siintävään mereen.',
      lahde: 'Valokuva: Kikku33, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Kikku33',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:G%C4%A7ajnsielem_from_Nadur,_Gozo.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/mlt-nosto-nadur-0b824c52.jpg',
        lyhyt: 'Nadurin ylänkö Gozon kanavan lautalta katsottuna.',
        selite: 'Merenrannalta kohoaa loivasti Nadurin harjanne, jonka laella erottuu rakennuksia sinistä taivasta vasten.',
        lahde: 'Valokuva: Enrique Íñiguez Rodríguez (Qoan), Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Enrique Íñiguez Rodríguez (Qoan)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:G%C4%A7awdex_mill-vapur._In-Nadur_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Nadur',
    tyyppi: 'kaupunki',
    lahi: true,
    kysymykset: [
      'Mistä arabian sanasta Nadurin nimi juontuu?',
      'Mistä elinkeinosta kaupunki on tunnettu?',
    ],
    korostukset: ['nadara|nadara'],
    nappi: 'Harjanteen tähystyskylä, jonka leipomot tunnetaan kaukana Gozon rajojen ulkopuolella',
    // 14.295 E / 36.03805556 N — en-Wikipedia "Nadur"
    laudat: {
      maailmankartta: { x: 6309.8, y: 1956.1 },
      europe: { x: 485.7, y: 945.8 },
    },
    teksti: 'Nadur on Gozon toiseksi suurin kaupunki, ja se levittäytyy korkealle harjanteelle '
      + 'Victorian itäpuolelle; sitä kutsutaan saaren "toiseksi kaupungiksi". Nimi juontuu '
      + 'arabian sanasta nadara, joka tarkoittaa tähystyspaikkaa, ja sama ajatus näkyy '
      + 'kaupungin tunnuslauseessa "Valpas" sekä vaakunassa, jossa aurinko nousee sinisestä '
      + 'merestä. Kaupunki tunnetaan leipomoistaan, ja sen lähellä ovat San Blasin ja Daħlet '
      + 'Qorrotin pienet kalliorannat, jotka ovat suosittuja uinti- ja retkeilypaikkoja. '
      + 'Varhaisimmista asukkaista ei ole säilynyt asiakirjoja, mutta harjanteella on ollut '
      + 'maatiloja jo kauan ennen kuin alueesta tuli oma seurakuntansa.',
    lahde: 'en-Wikipedia "Nadur", johdanto-osa ja osio "History" (tarkistettu 21.9.2026).',
  },
];
