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
export const HAHMOTELMA_MLT = [
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
];
