/*
 * ITALIAN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan pilotin
 * jälkeen Italia.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48) =====
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) ja sen jälkeen Espanjan pilotti: jokaisella
 * nostolla on valmis sisältö — `teksti` 3–5 virkettä Wikipedian
 * johdannosta omin sanoin suomeksi (ei käännöskopiota, ei keksittyjä
 * faktoja, `lahde`-riville artikkeli ja tarkistuspäivä), 1873-
 * näkökulman `nappi`-alaotsikko, kaksi pulun kysymystä, `korostukset`
 * ja vähintään kaksi Commons-kuvaa (`kuva` + `kuvat`; vain public
 * domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi ja lähdesivu
 * kirjattuna, jokaisen kuvan tiedot luettu Commonsin extmetadata-
 * rajapinnasta). Vuoden 1873 jälkeiset kohteet (Larderellon voimala
 * 1904–1911, Olivetti 1908, Monte Cassinon tuho 1944) ovat mukana:
 * teksti on nykytietoa ja `nappi` katsoo vuodesta 1873 eteenpäin
 * ("tänne nousee myöhemmin…").
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `ita-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/ita/.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin Ranskan ja Espanjan hahmotelmalla: nämä ovat kaikki
 * aidosti kaupungin ulkopuolella (Italian pelikaupungit ovat Rooma,
 * Firenze, Venetsia ja Sisilia; lähin nosto on yli 9 lautayksikön
 * päässä, raja KAUPUNGIN_KOHDALLA_SADE on 7), ja js/fokuskohteet.js
 * liittää rivit KOHDE_MAAT.ITA:han. `lahi: true` on sama lähizoomiportti
 * kuin Ranskan hahmotelmalla (js/pallolauta/nostot.js
 * PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen. Kohteilla, joiden oman artikkelin
 * koordinaatti puuttui, piste on saman paikan artikkelista: Agrigento
 * (Temple of Concordia), Chianti (Castellina in Chianti), Assisi (Basilica
 * of Saint Francis), Canossa (Canossa Castle), Solferino (Battle of
 * Solferino). Laudan luvut on laskettu pelin omalla kaavalla
 * (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Italian fokuslehden rajaukseen
 * (`osuuLehteen`). Stromboli ja Elba ovat saaria, jotka pelin karkea
 * maailmankartan ITA-rengas jättää pois: pisteet ovat oikeasti maalla,
 * mutta rengas ei tunne niitä (ankkurilukituksen asia, kuten
 * Espanjan Finisterre).
 */

/** Italian hahmotelmanostot: sisällölliset kohteet kaupunkien ulkopuolella. */
export const HAHMOTELMA_ITA = [
  {
    id: 'hahmotelma-monviso',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-monviso-ba0384c6.jpg',
      lyhyt: 'Monviso kohoaa pyramidin muotoisena huippuna kukkaniityn yllä.',
      selite: 'Kuvan paikkana on Pian del Re Crissolossa Po-laaksossa, Cuneon maakunnassa. Etualalla on keltaisia alppikukkia ja taustalla Monvison kalliohuippu.',
      lahde: 'Valokuva: Marco, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Marco',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Monte_Viso_viewed_from_North.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-monviso-05a89146.jpg',
        lyhyt: 'Lago Fiorenza -järven kirkas vesi ja Monvison huiput taustalla.',
        selite: 'Kuvassa on Crissolon Lago Fiorenza aamulla, ja järven takana näkyy Monviso.',
        lahde: 'Valokuva: Toma15996, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Toma15996',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lago_Fiorenza_Crissolo_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-monviso-b0175a90.jpg',
        lyhyt: 'Vanha puupiirros: kiipeilijät köysien varassa Po-joen lähteellä.',
        selite: 'Puupiirros nimeltä Nousu Monvisolle Po-joen lähteille. Piirroksessa miehet laskeutuvat kallioiden välissä virtaavan lähdepurkon ääreen.',
        lahde: 'Kaiverrus: Achille Monneret, Wikimedia Commons (public domain).',
        tekija: 'Achille Monneret',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Salita_sul_Monviso_alle_sorgenti_del_Po.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Monviso',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi Monviso näkyy niin kauas?',
      'Mistä Po-joki alkaa?',
    ],
    korostukset: ['jadeiitti|jadeiittilouhos'],
    nappi: 'Pyramidihuippu Alppien länsireunalla, jonka juurelta Po lähtee',
    // 7.09166667 E / 44.6675 N — en-Wikipedia "Monte Viso"
    laudat: {
      maailmankartta: { x: 6069.7, y: 1615.5 },
      europe: { x: 347.4, y: 718.8 },
    },
    teksti: 'Monte Viso eli Monviso on Cottian-Alppien korkein vuori Piemontessa lähellä Ranskan '
      + 'rajaa. Se tunnetaan pyramidimaisesta muodostaan, ja koska se kohoaa '
      + 'naapurihuippujaan noin 500 metriä korkeammalle, sen voi nähdä kaukaa, hyvänä päivänä '
      + 'jopa Milanon tuomiokirkon huipuilta. Italiassa sitä kutsutaan nimellä il Re di '
      + 'Pietra, kivikuningas. Vuoren pohjoisrinteellä, Pian del Re -tasangolla 2 020 metrin '
      + 'korkeudessa, ovat Italian pisimmän joen, Po:n, latvat. Vuoren rinteillä on ollut '
      + 'myös neoliittinen jadeiittilouhos 2 000–2 400 metrin korkeudessa.',
    lahde: 'en-Wikipedia "Monte Viso", johdanto-osa sekä osiot "Geography" ja "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-gran-sasso',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-gran-sasso-0cf89076.jpg',
      lyhyt: 'Corno Grande kohoaa jylhänä kalliohuippuna Campo Imperatoren laakson yllä.',
      selite: 'Kuvassa on Gran Sasson korkein huippu, Corno Grande, nähtynä Campo Imperatoren ylängöltä.',
      lahde: 'Valokuva: Fiat 500e, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Fiat 500e',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Corno_grande_da_campo_imperatore.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-gran-sasso-401db98c.jpg',
        lyhyt: 'Laaja Campo Imperatoren ylätasanko ja Corno Grande taustalla.',
        selite: 'Kuvassa on Gran Sasson Campo Imperatoren korkea vuoristotasanko loppukeväällä Abruzzossa, ja taustalla kohoaa Corno Grande.',
        lahde: 'Valokuva: Bouke ten Cate, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Bouke ten Cate',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Campo_Imperatore_with_il_Corno_Grande_in_the_background_-_Gran_Sasso_2.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Gran Sasso',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Onko Calderonen jäätikkö säilymässä?',
      'Mitä eläimiä Gran Sasson puistossa elää?',
    ],
    korostukset: ['jäätikkö|jäätikkö'],
    nappi: 'Apenniinien kivinen jättiläinen Abruzzon yllä',
    // 13.56527778 E / 42.46944444 N — en-Wikipedia "Gran Sasso d\"Italia"
    laudat: {
      maailmankartta: { x: 6285.5, y: 1704.7 },
      europe: { x: 471.7, y: 776.7 },
    },
    teksti: 'Gran Sasso d\'Italia, Italian suuri kallio, on Apenniinien vuoristomassiivi. Sen '
      + 'korkein huippu Corno Grande on 2 912 metriä eli Apenniinien korkein ja Italian '
      + 'toiseksi korkein vuori Alppien ulkopuolella, ja vuori kuuluu Gran Sasson ja Monti '
      + 'della Lagan kansallispuistoon. Corno Granden ja Corno Piccolon harmaa väri tulee '
      + 'kalkkikivestä ja dolomiitista, ja huiput ovat lumen peitossa suuren osan vuodesta. '
      + 'Corno Granden huipun alla on Calderonen jäätikkö, joka on kutistunut selvästi. '
      + 'Alarinteillä laiduntaa lampaita ja karjaa, ja puistossa elää harvinaisia lajeja, '
      + 'kuten Apenniinien susi ja marsikaninkarhu.',
    lahde: 'en-Wikipedia "Gran Sasso d\'Italia", johdanto-osa ja osio "Geography" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-gran-paradiso',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-gran-paradiso-79ee8b40.jpg',
      lyhyt: 'Kaksi alppikaurista kamppailee kukkaniityllä.',
      selite: 'Kuvassa on alppikauriita (Capra ibex) Gran Paradison kansallispuistossa Piemontessa. Toinen uros nousee takajaloilleen.',
      lahde: 'Valokuva: Luca Casale, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Luca Casale',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stambecchi_nel_Parco_Nazionale_del_Gran_Paradiso.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-gran-paradiso-f64ea732.jpg',
        lyhyt: 'Gran Paradison lumiset huiput kohoavat metsäisen laakson yllä.',
        selite: 'Kuvassa on Gran Paradison vuoristoryhmä, jonka rinteillä näkyy lunta ja jäätikköä. Etualalla on havumetsää.',
        lahde: 'Valokuva: Bramfab, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Bramfab',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gran_Paradiso_(1).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Gran Paradiso',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mistä Gran Paradison nimi tulee?',
      'Miksi kuningas perusti suojelualueen?',
    ],
    korostukset: ['Granta Parey|Granta Parey'],
    nappi: 'Kuninkaan metsästysmaa, jonka huippu kohoaa yli 4 000 metriin',
    // 7.26972222 E / 45.51444444 N — en-Wikipedia "Gran Paradiso"
    laudat: {
      maailmankartta: { x: 6075.7, y: 1580.5 },
      europe: { x: 350.8, y: 696.6 },
    },
    teksti: 'Gran Paradiso on Graian-Alppien vuori Aostalaakson ja Piemontin alueiden välissä. '
      + 'Sen huippu on 4 061 metrin korkeudessa, ja se on ainoa yli 4 000 metrin vuori, joka '
      + 'on kokonaan Italian alueella; Mont Blancin massiivi taas jakautuu Ranskan ja Italian '
      + 'kesken. Nimi tulee ranskan kautta virheellisesti käännetystä Aostalaakson murteen '
      + 'sanasta Granta Parey, joka tarkoittaa suurta seinämää. Kuningas Viktor Emanuel II '
      + 'perusti alueelle kuninkaallisen suojelualueen vuonna 1856, ja siinä on nykyisin Gran '
      + 'Paradison kansallispuisto. Huippu on suosittu aloitteleville vuorikiipeilijöille.',
    lahde: 'en-Wikipedia "Gran Paradiso", johdanto-osa sekä osiot "Etymology", "Geography" ja '
      + '"Routes" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-garda',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-garda-e3e515c3.jpg',
      lyhyt: 'Malcesinen linna kohoaa rannalla Gardajärven sinisen veden äärellä.',
      selite: 'Näkymä Malcesinen Scaligerin linnaan ja Gardajärveen Venetossa. Vastarannalla kohoavat jyrkät vuorenrinteet.',
      lahde: 'Valokuva: Zairon, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Zairon',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Malcesine_Blick_auf_den_Lago_di_Garda_&_das_Castello_Scaligero_02.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-garda-c7f8d65c.jpg',
        lyhyt: 'Sirmionen Scaligerin linnan tornit ja hammaslinnakkeet.',
        selite: 'Kuvassa on Sirmionen Scaligerin linnan ulkoseinä torneineen ja tiilisine hammaslinnakkeineen Gardajärven rannalla Lombardiassa.',
        lahde: 'Valokuva: Zairon, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Zairon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sirmione_Castello_Scaligero_Esterno_03.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Gardajärvi',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Miksi roomalaiset palvoivat järven jumalaa?',
      'Mistä Gardajärven nimi tulee?',
    ],
    korostukset: ['Benacus|Benacus'],
    nappi: 'Alppien reunaan uurtunut järvi, jota roomalaiset kutsuivat Benacukseksi',
    // 10.66666667 E / 45.63333333 N — en-Wikipedia "Lake Garda"
    laudat: {
      maailmankartta: { x: 6188.9, y: 1575.6 },
      europe: { x: 416, y: 693.4 },
    },
    teksti: 'Gardajärvi on Italian suurin järvi ja suosittu lomakohde Pohjois-Italiassa, Brescian '
      + 'ja Milanon itäpuolella sekä Veronan ja Venetsian länsipuolella. Järvi leikkaa '
      + 'Alppien reunaan, ja jäätiköt muovasivat seudun viime jääkauden lopulla. Sen ranta '
      + 'jakautuu Brescian, Veronan ja Trenton maakuntien kesken. Roomalaisaikana järvi '
      + 'tunnettiin nimellä Benacus, ja jotkut palvoivat järven henkilöitynyttä jumalaa. '
      + 'Nykyinen nimi on germaanista alkuperää ja tulee sanasta warda, vartiopaikka.',
    lahde: 'en-Wikipedia "Lake Garda", johdanto-osa ja osio "Etymology" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mistä Gardajärven nykyinen nimi on peräisin?',
      vaihtoehdot: [
        'Roomalaisten palvomasta järvijumalasta Benacuksesta',
        'Kreikkalaisesta sanasta, joka tarkoittaa vettä',
        'Kelttiläisestä sanasta, joka tarkoittaa sinistä',
        'Germaanisesta sanasta, joka tarkoittaa vartiopaikkaa',
      ],
      oikea: 3,
      fakta: 'Gardajärven rantaa jakavat keskenään Brescian, Veronan ja Trenton maakunnat.',
    },
  },
  {
    id: 'hahmotelma-stromboli',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-stromboli-0765b869.jpg',
      lyhyt: 'Ilmakuva Strombolin kartiomaisesta tulivuorisaaresta.',
      selite: 'Ilmakuva Strombolista koillisesta. Oikealla näkyy saaren luoteisosan Sciara del Fuoco -rinne ja taustalla Panarean saari.',
      lahde: 'Valokuva: Carsten Steger, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Carsten Steger',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_image_of_Stromboli_(view_from_the_northeast).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-stromboli-50628fdd.jpg',
        lyhyt: 'Stromboli purkautuu iltahämärässä ja sinkoaa hehkuvaa laavaa.',
        selite: 'Kuvassa on Strombolin tulivuoren varhaisillan purkaus Liparinsaarilla. Kraatterista lentää ilmaan hehkuvia laavanpalasia.',
        lahde: 'Valokuva: Mark Ireland, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Mark Ireland',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Eruption_of_Stromboli_volcano_-_2012-06-01_A.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Stromboli',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi Stromboli purkautuu jatkuvasti?',
      'Mitä Sciara del Fuoco on?',
    ],
    korostukset: ['Sciara del Fuoco|Sciara del Fuoco'],
    nappi: 'Merestä nouseva tulivuori, jota kutsutaan Välimeren majakaksi',
    // 15.21111111 E / 38.79388889 N — en-Wikipedia "Stromboli"
    laudat: {
      maailmankartta: { x: 6340.4, y: 1850.1 },
      europe: { x: 503.3, y: 873.3 },
    },
    teksti: 'Stromboli on Tyrrhenanmeren saari Sisilian pohjoisrannikon edustalla ja yksi '
      + 'seitsemästä Liparinsaaresta. Sen tulivuori on yksi Italian neljästä toimivasta '
      + 'tulivuoresta, ja se purkautuu lähes jatkuvasti lievin purkauksin, minkä vuoksi '
      + 'saarta kutsutaan Välimeren majakaksi. Tulivuori kohoaa 926 metriä merenpinnan '
      + 'yläpuolelle ja yli 2 700 metriä merenpohjan yläpuolelle. Kartion luoteisrinteellä on '
      + 'hevosenkengän muotoinen Sciara del Fuoco eli tulen virta. Viimeisin vakava purkaus '
      + 'oli 11. syyskuuta 1930, ja siinä kuoli kuusi ihmistä.',
    lahde: 'en-Wikipedia "Stromboli", johdanto-osa sekä osiot "Height and shape" ja "Volcano" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Miksi Strombolin saarta kutsutaan Välimeren majakaksi?',
      vaihtoehdot: [
        'Sen huipulla palaa vanha majakka merenkulkijoille',
        'Tulivuori purkautuu lähes jatkuvasti lievin purkauksin',
        'Saari nousee yksinään keskelle avointa Välimerta',
        'Sen rinteiltä hohtaa yöllä kirkkaana lasimaista kiveä',
      ],
      oikea: 1,
      fakta: 'Tulivuoren luoteisrinteellä on hevosenkengän muotoinen Sciara del Fuoco, jonka nimi '
        + 'tarkoittaa tulen virtaa.',
    },
  },
  {
    id: 'hahmotelma-elba',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-elba-c0295bb8.jpg',
      lyhyt: 'Ilmakuva Portoferraion kaupungista, linnakkeista ja satamasta.',
      selite: 'Ilmakuva Elban Portoferraiosta luoteesta. Kuvassa näkyvät vanhakaupunki, linnoitukset ja satama.',
      lahde: 'Valokuva: Carsten Steger, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Carsten Steger',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_image_of_Portoferraio_(view_from_the_northwest).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-elba-33226412.jpg',
        lyhyt: 'Villa dei Mulini kohoaa kallion reunalla meren yllä.',
        selite: 'Kuvassa on Napoleonin Villa Mulini Portoferraiossa Elban saarella. Talo sijaitsee jyrkänteen päällä meren yläpuolella.',
        lahde: 'Valokuva: Wolfgang Sauber, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Wolfgang Sauber',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Villa_Mulini_-_Lage_über_dem_Meer.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Elban saari',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Miksi Napoleon karkotettiin Elballe?',
      'Mitä rautakaivoksilla tehtiin?',
    ],
    korostukset: ['Napoleon|Napoleon'],
    nappi: 'Rautasaari, jonne Napoleon karkotettiin ensimmäisen kerran',
    // 10.275 E / 42.78 N — en-Wikipedia "Elba"
    laudat: {
      maailmankartta: { x: 6175.8, y: 1692.2 },
      europe: { x: 408.5, y: 768.5 },
    },
    teksti: 'Elba on Toscanan rannikon edustalla oleva Välimeren saari, noin kymmenen kilometrin '
      + 'päässä Piombinon kaupungista. Se on Toscanan saariston suurin saari ja Italian '
      + 'kolmanneksi suurin Sisilian ja Sardinian jälkeen. Saarella on seitsemän kuntaa, ja '
      + 'pääkaupunki on Portoferraio. Elba on kuuluisa siitä, että Napoleon karkotettiin '
      + 'sinne ensimmäisen kerran vuosiksi 1814–1815. Antiikin aikaan saari tunnettiin '
      + 'nimellä Ilva, ja se oli jo silloin tunnettu rautavaroistaan ja arvostetuista '
      + 'kaivoksistaan.',
    lahde: 'en-Wikipedia "Elba", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mistä Elban saari oli tunnettu jo antiikin aikana?',
      vaihtoehdot: [
        'Suolanvalmistuksesta ja suolan viennistä',
        'Purppuranvärin valmistuksesta ja kaupasta',
        'Rautavaroistaan ja arvostetuista kaivoksistaan',
        'Marmorilouhoksistaan ja kuvanveistäjistään',
      ],
      oikea: 2,
      fakta: 'Napoleon karkotettiin Elballe ensimmäisen kerran vuosiksi 1814–1815.',
    },
  },
  {
    id: 'hahmotelma-villa-adriana',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-villa-adriana-47e0f7e7.jpg',
      lyhyt: 'Canopus-allas Hadrianuksen huvilassa Tivolin lähellä.',
      selite: 'Pitkä vesiallas, Canopus, kuvaa Niilin haaraa; sen reunalla on kopioita kuuluisista veistoksista. Huvila rakennettiin noin vuonna 120 jKr. keisari Hadrianukselle.',
      lahde: 'Valokuva: Paul VanDerWerf from Brunswick, Maine, USA, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Paul VanDerWerf from Brunswick, Maine, USA',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hadrian\'s_Villa_-_Flickr_-_Me_in_ME.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-villa-adriana-a490de39.jpg',
        lyhyt: 'Teatro marittimon pylväikkö ja vesiallas Villa Adrianassa.',
        selite: 'Rauniot kuuluvat Tivolin Villa Adrianaan; kuvassa näkyy meriteatteriksi kutsutun rakennelman kaareva pylväikkö, tiiliseiniä ja vesialtaan vihreä pinta.',
        lahde: 'Valokuva: FrDr, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'FrDr',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Villa_Hadriana_(Villa_Adriana_Tivoli)_1000_03.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Villa Adriana',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Hadrianus rakennutti huvilan?',
      'Mitä nymfaeumi tarkoittaa?',
    ],
    korostukset: ['nymfaeumi|nymfaeumien'],
    nappi: 'Keisarin huvilakaupunki, josta suuri osa on vielä kaivamatta',
    // 12.772515 E / 41.946004 N — en-Wikipedia "Hadrian\"s Villa"
    laudat: {
      maailmankartta: { x: 6259.1, y: 1725.7 },
      europe: { x: 456.4, y: 790.4 },
    },
    teksti: 'Hadrianuksen huvila oli monumentaalinen huvila- ja palatsikompleksi, jonka keisari '
      + 'Hadrianus (hallitsi 117–138) rakennutti noin vuonna 120 Tivolin lähelle, noin 20 '
      + 'kilometrin päähän Roomasta. Kompleksissa on yli 30 monumentaalista rakennusta, jotka '
      + 'on sijoitettu keinotekoisille tasanteille puutarhojen, vesialtaiden ja '
      + 'suihkulähteiden eli nymfaeumien ympärille. Alue kattaa vähintään neliökilometrin, '
      + 'enemmän kuin Pompeijin kaupunki. Monet rakennuksista ovat roomalaisen arkkitehtuurin '
      + 'mestariteoksia, ja niiden näyttävät kaarevat muodot olivat mahdollisia betonin '
      + 'ansiosta. Suuri osa alueesta on vielä kaivamatta, ja se kuuluu UNESCOn '
      + 'maailmanperintökohteisiin.',
    lahde: 'en-Wikipedia "Hadrian\'s Villa", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-paestum',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-paestum-31267fb0.jpg',
      lyhyt: 'Poseidonin temppelin itäjulkisivu Paestumissa.',
      selite: 'Doorilaisen temppelin pylväät, friisi ja päätykolmio ovat säilyneet poikkeuksellisen hyvin. Rakennusta kutsutaan myös Neptunuksen temppeliksi tai toiseksi Heran temppeliksi.',
      lahde: 'Valokuva: PaestumPaestum, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'PaestumPaestum',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Temple_of_Poseidon_(Paestum)_-_Facade_E.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-paestum-1fcd5847.jpg',
        lyhyt: 'Heran temppeli ja Poseidonin temppeli vierekkäin Paestumissa.',
        selite: 'Vasemmalla on Heran temppeli (Hera I), oikealla etäämpänä Poseidonin temppelin julkisivu. Kuva näyttää, miten lähekkäin doorilaiset temppelit seisovat.',
        lahde: 'Valokuva: Heinz-Josef Lücking, Wikimedia Commons (CC BY-SA 3.0 de).',
        tekija: 'Heinz-Josef Lücking',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Paestum_-_Temple_of_Poseidon_-_Temple_of_Hera.JPG',
        lisenssi: 'CC BY-SA 3.0 de',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-paestum-99afaa80.jpg',
        lyhyt: 'Poseidonin temppelin sisätila pylväsrivien välissä.',
        selite: 'Näkymä temppelin sisältä kohti vastakkaista päätyä; molemmin puolin kohoavat doorilaisten pylväiden rivit.',
        lahde: 'Valokuva: PaestumPaestum, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'PaestumPaestum',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Temple_of_Poseidon_(Paestum)_-_Interior.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Paestum',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä doorilainen temppeli tarkoittaa?',
      'Miksi kaupunki unohtui?',
    ],
    korostukset: ['doorilaista|doorilaista'],
    nappi: 'Hylätty kreikkalaiskaupunki, jonka temppelit seisovat yhä',
    // 15.00527778 E / 40.42222222 N — en-Wikipedia "Paestum"
    laudat: {
      maailmankartta: { x: 6333.5, y: 1786.3 },
      europe: { x: 499.3, y: 830.5 },
    },
    teksti: 'Paestum oli suuri antiikin kreikkalainen kaupunki Tyrrhenanmeren rannikolla Magna '
      + 'Graecian alueella. Sen rauniot ovat kuuluisia kolmesta kreikkalaisesta doorilaista '
      + 'temppelistä, jotka ovat noin vuosilta 550–450 eaa. ja säilyneet erinomaisessa '
      + 'kunnossa. Kaupungin perustivat noin vuonna 600 eaa. Sybariksen uudisasukkaat nimellä '
      + 'Poseidonia. Lukaanit valtasivat kaupungin vuonna 400 eaa. ja roomalaiset vuonna 273 '
      + 'eaa., jolloin se sai nykyisen nimensä. Kauppareittien muutokset, tulvat ja '
      + 'soistuminen ajoivat kaupungin rappioon, ja varhaiskeskiajalla se hylättiin ja '
      + 'unohtui lähes kokonaan 1700-luvulle asti.',
    lahde: 'en-Wikipedia "Paestum", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-agrigento',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-agrigento-88e3396b.jpg',
      lyhyt: 'Concordian temppeli valaistuna iltahämärässä Agrigentossa.',
      selite: 'Temppelin doorilaiset pylväät ja päätykolmio erottuvat hämärtyvää taivasta vasten Valle dei Templin alueella Sisiliassa.',
      lahde: 'Valokuva: Michal Osmenda, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Michal Osmenda',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Valle_dei_Templi,_Agrigento,_Sicily,_Italy.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-agrigento-2b82fee0.jpg',
        lyhyt: 'Concordian temppelin julkisivu Agrigentossa.',
        selite: 'Hyvin säilynyt doorilainen temppeli Sisiliassa Agrigenton temppelilaaksossa; kuvassa näkyvät päätykolmio, pylväät ja vierailijoita.',
        lahde: 'Valokuva: Berthold Werner, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Berthold Werner',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Agrigent_BW_2025-04-28_16-12-13.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-agrigento-9970e57d.jpg',
        lyhyt: 'Concordian temppelin pylväitä ja kaarevia aukkoja alhaalta kuvattuna.',
        selite: 'Lähikuva temppelin doorilaisista pylväistä ja niiden takana näkyvästä seinästä, jossa on kaarevat aukot.',
        lahde: 'Valokuva: Benjamin Smith, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Benjamin Smith',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Agrigento_-_Valle_dei_Templi_-_Temple_of_Concordia_-_5.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Agrigenton temppelilaakso',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi temppeli sai nimen Concordia?',
      'Miksi Concordian temppeli säilyi ehjänä?',
    ],
    korostukset: ['Concordia|Concordian'],
    nappi: 'Kreikkalainen temppeli, joka pelastui kirkkona',
    // 13.59206 E / 37.28968 N — en-Wikipedia "Temple of Concordia, Agrigento"
    laudat: {
      maailmankartta: { x: 6286.4, y: 1908.2 },
      europe: { x: 472.2, y: 912.9 },
    },
    teksti: 'Concordian temppeli on antiikin kreikkalainen temppeli Agrigenton Valle dei Templi '
      + '-laaksossa Sisilian etelärannikolla. Se on Sisilian suurin ja parhaiten säilynyt '
      + 'doorilainen temppeli ja yksi parhaiten säilyneistä kreikkalaisista temppeleistä '
      + 'ylipäätään. Se rakennettiin noin vuosina 440–430 eaa., ja sen ympäri kulkee kuuden '
      + 'kertaa kolmentoista pylvään rivi. Nimi tulee roomalaisen harmonian jumalattaren '
      + 'Concordian mukaan läheltä löydetystä latinankielisestä kirjoituksesta, joka ei '
      + 'kuitenkaan liity temppeliin. Temppeli muutettiin 500-luvulla kristilliseksi '
      + 'basilikaksi, minkä vuoksi se selvisi pakanallisten palvontapaikkojen tuhosta.',
    lahde: 'en-Wikipedia "Temple of Concordia, Agrigento", johdanto-osa ja osio "Description" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-castel-del-monte',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-castel-del-monte-e9aad913.jpg',
      lyhyt: 'Castel del Monte auringonlaskun aikaan.',
      selite: 'Kahdeksankulmainen linna kohoaa Apulian kukkulalla; kulmissa on kahdeksankulmaiset tornit.',
      lahde: 'Valokuva: C.lapia, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'C.lapia',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castel_del_Monte_sunset.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-castel-del-monte-ab48ff65.jpg',
        lyhyt: 'Castel del Monten sisäänkäynti ja kaksi kahdeksankulmaista tornia.',
        selite: 'Vaalea kalkkikivilinna Apuliassa; portaalin yläpuolella on kaksiaukkoinen goottilainen ikkuna.',
        lahde: 'Valokuva: Bernard Gagnon, Wikimedia Commons (CC0).',
        tekija: 'Bernard Gagnon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castel_del_Monte,_Italy_02.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-castel-del-monte-b2d6fa2f.jpg',
        lyhyt: 'Linnan kahdeksankulmainen sisäpiha alhaalta ylös kuvattuna.',
        selite: 'Näkymä sisäpihalta ylöspäin: pihan seinät ja taivas muodostavat säännöllisen kahdeksankulmion.',
        lahde: 'Valokuva: Berthold Werner, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Berthold Werner',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castel_del_Monte_BW_2016-10-14_13-04-18_stitch.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Castel del Monte',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi linna on kahdeksankulmainen?',
      'Kenen käytössä linna oli?',
    ],
    korostukset: ['kahdeksankulmaisesta|kahdeksankulmaisesta'],
    nappi: 'Kahdeksankulmainen linna kukkulalla, jonka tarkoitusta ei tunneta',
    // 16.2709346 E / 41.0847535 N — en-Wikipedia "Castel del Monte, Apulia"
    laudat: {
      maailmankartta: { x: 6375.7, y: 1760.1 },
      europe: { x: 523.6, y: 813.1 },
    },
    teksti: 'Castel del Monte on 1200-luvun linnoitus ja linna Andrian kaupungin alueella Apulian '
      + 'kukkulalla, 540 metrin korkeudessa. Kuningas Fredrik II rakennutti sen 1240-luvulla, '
      + 'ja se on kuuluisa rohkeasta kahdeksankulmaisesta pohjakaavastaan ja antiikkia '
      + 'jäljittelevistä yksityiskohdistaan. Linnassa ei ole vallihautaa eikä nostosiltaa, ja '
      + 'jotkut ovat pitäneet sitä alun perinkin muuna kuin puolustuslinnana. Se jäi '
      + 'keskeneräiseksi, eikä ole todisteita siitä, että Fredrik olisi käyttänyt sitä '
      + 'metsästysmajana, kuten usein oletetaan. UNESCO merkitsi linnan '
      + 'maailmanperintökohteeksi vuonna 1996.',
    lahde: 'en-Wikipedia "Castel del Monte, Apulia", johdanto-osa ja osio "Location" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mikä seikka viittaa siihen, ettei Castel del Monte ehkä ollut tavallinen '
        + 'puolustuslinna?',
      vaihtoehdot: [
        'Siinä ei ole vallihautaa eikä nostosiltaa',
        'Sen muurit rakennettiin tavallista ohuemmiksi',
        'Se rakennettiin keskelle tasaista peltoa',
        'Sen ainoa torni lisättiin vasta myöhemmin',
      ],
      oikea: 0,
      fakta: 'UNESCO merkitsi Castel del Monten maailmanperintökohteeksi vuonna 1996.',
    },
  },
  {
    id: 'hahmotelma-tarquinia',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-tarquinia-22c12c89.jpg',
      lyhyt: 'Leopardien haudan seinämaalaukset Tarquiniassa.',
      selite: 'Etruskien Monterozzin nekropolin hautakammion seinillä on ateriaa viettäviä ihmisiä ja soittajia, päädyssä kaksi leopardia; katto on koristeltu ruutukuviolla.',
      lahde: 'Valokuva: Gleb Simonov, Wikimedia Commons (CC0).',
      tekija: 'Gleb Simonov',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Monterozzi_necropolis_—_Tomb_of_the_Leopards.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-tarquinia-265bede5.jpg',
        lyhyt: 'Monterozzin nekropolin sisäänkäynti ja hautojen suojarakennuksia.',
        selite: 'Nekropolis nähtynä lipputoimiston luota; edessä on Jongleerien haudan suojarakennus ja opastaulu, taustalla muita hautoja avoimella kedolla.',
        lahde: 'Valokuva: AlexanderVanLoon, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'AlexanderVanLoon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Monterozzi_Necropolis_entrance_AvL.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Tarquinia',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Keitä etruskit olivat?',
      'Mitä hautakammioiden seinillä on?',
    ],
    korostukset: ['etruskien|etruskien'],
    nappi: 'Corneton kukkulat, joiden alla etruskien haudat odottavat',
    // 11.75611111 E / 42.24916667 N — en-Wikipedia "Tarquinia"
    laudat: {
      maailmankartta: { x: 6225.2, y: 1713.6 },
      europe: { x: 436.9, y: 782.4 },
    },
    teksti: 'Tarquinia, entiseltä nimeltään Corneto, on kaupunki Latiumin alueella '
      + 'Keski-Italiassa. Se on kuuluisa laajoista etruskien hautausmaistaan, joissa on '
      + 'antiikin maailman tärkeimpiä maalattuja hautoja. Hautausmaat ovat rautakaudelta, '
      + '800-luvulta eaa., roomalaisaikaan, ja ne sijaitsevat viereisillä niemekkeillä. '
      + 'Nykyinen kaupunki sai nimensä vuonna 1922 antiikin Tarquinii-kaupungin mukaan. '
      + 'Tarquinii oli yksi muinaisista tärkeimmistä etruskikaupungeista, vaikka sen '
      + 'jäänteitä on maan päällä vähän ja kaivaukset paljastavat yhä uutta. Etruskien '
      + 'hautausmaat kuuluvat UNESCOn maailmanperintöön.',
    lahde: 'en-Wikipedia "Tarquinia", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-monte-cassino',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-monte-cassino-148872ed.jpg',
      lyhyt: 'Monte Cassinon luostari vuoren laella.',
      selite: 'Laaja luostarirakennus kupolikirkkoineen kohoaa metsäisen vuorenharjan päällä, ympärillä vuoria ja laakso.',
      lahde: 'Valokuva: DonGatley, Wikimedia Commons (CC0).',
      tekija: 'DonGatley',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Monte_Cassino_Abbey_2019_03.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-monte-cassino-e60a579e.jpg',
        lyhyt: 'Luostarin sisäpihan portaikko ja kaariarkadi.',
        selite: 'Leveä kivinen portaikko johtaa kaariholvien alla oleviin patsaslokeroihin ja balustradiin.',
        lahde: 'Valokuva: Mattis, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Mattis',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cassino,_Abbazia_di_Montecassino_-_Exterior_005.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-monte-cassino-59a92dc0.jpg',
        lyhyt: 'Luostarin kiviseinä ja PAX-portti.',
        selite: 'Massiivisen kivirakennuksen kiviportin yläpuolelle on kirjoitettu PAX (rauha); edessä on kivetty aukio, jonka kuviona on tuulikaruusu.',
        lahde: 'Valokuva: Marica Massaro, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Marica Massaro',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Abbazia_Montecassino.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Monte Cassino',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka Benedictus oli?',
      'Mitä luostarille tapahtui vuonna 1944?',
    ],
    korostukset: ['Benedictus|Benedictus'],
    nappi: 'Benedictuksen vuoriluostari, josta valtio on tehnyt kansallismonumentin',
    // 13.81388889 E / 41.49 N — en-Wikipedia "Monte Cassino"
    laudat: {
      maailmankartta: { x: 6293.8, y: 1743.9 },
      europe: { x: 476.4, y: 802.4 },
    },
    teksti: 'Monte Cassinon luostari on benediktiiniluostari kalliokukkulalla noin 130 kilometriä '
      + 'Roomasta kaakkoon. Se on benediktiiniläisluostarikunnan ensimmäinen talo: Nursian '
      + 'Benedictus perusti sen noin vuonna 529, ja juuri tämän yhteisön käyttöön Pyhän '
      + 'Benedictuksen sääntö kirjoitettiin. Langobardit ryöstivät ensimmäisen luostarin noin '
      + 'vuonna 570, saraseenit ryöstivät sen vuonna 883 ja ranskalaiset joukot vielä vuonna '
      + '1799. Italian valtio lakkautti luostarin vuonna 1866, ja rakennuksesta tuli '
      + 'kansallismonumentti, jonka aarteiden vartijoina munkit toimivat. Toisessa '
      + 'maailmansodassa vuonna 1944 liittoutuneiden pommitukset tuhosivat rakennuksen, ja se '
      + 'rakennettiin sodan jälkeen uudelleen.',
    lahde: 'en-Wikipedia "Monte Cassino", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Ketkä ryöstivät Monte Cassinon ensimmäisen luostarin noin vuonna 570?',
      vaihtoehdot: [
        'Attilan hunnit',
        'Vandaalit',
        'Langobardit',
        'Itägootit',
      ],
      oikea: 2,
      fakta: 'Monte Cassinon luostari tuhoutui vuonna 1944 liittoutuneiden pommituksissa ja '
        + 'rakennettiin sodan jälkeen uudelleen.',
    },
  },
  {
    id: 'hahmotelma-chianti',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-chianti-1e831c8a.jpg',
      lyhyt: 'Näkymä Castellina in Chiantin ympäristön viinitarhoihin ja kumpuilevaan Chiantin maisemaan.',
      selite: 'Kuvassa näkyy Chiantin viinialueen kumpuilevaa maastoa Castellina in Chiantin seudulla: viiniköynnösrivejä rinteillä, sypressejä ja kivinen maalaistalo. Kuvan otsikko paikantaa sen Castellina in Chiantiin.',
      lahde: 'Valokuva: Rowan Heuvel, Wikimedia Commons (CC0).',
      tekija: 'Rowan Heuvel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castellina_In_Chianti_(Unsplash).jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-chianti-edfddf7f.jpg',
        lyhyt: 'Syksyisen Chianti Classicon viinitarhat lähellä Radda in Chiantia.',
        selite: 'Syksyn värittämät viiniköynnösrivit etualalla ja kumpuilevat Chianti Classicon rinteet taustalla. Kuvaus paikantaa viinitarhat Radda in Chiantin lähelle.',
        lahde: 'Valokuva: Repuli, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Repuli',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Autunno_in_Chianti_Toscana.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Chianti',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Miksi Chianti-pullo oli olkikorissa?',
      'Mikä on gallo nero?',
    ],
    korostukset: ['Sangiovese|Sangiovese'],
    nappi: 'Toscanan viinikukkulat, joiden nimeä on käytetty viinistä jo vuodesta 1716',
    // 11.28861111 E / 43.46916667 N — en-Wikipedia "Castellina in Chianti"
    laudat: {
      maailmankartta: { x: 6209.6, y: 1664.4 },
      europe: { x: 427.9, y: 750.4 },
    },
    teksti: 'Chianti on Toscanan keskiosan viinialue ja samanniminen punaviini, joka tehdään '
      + 'pääosin Sangiovese-rypäleestä. Viiniä on perinteisesti pakattu pulleaan, olkikoriin '
      + 'käärittyyn pulloon, jota kutsutaan nimellä fiasco. Ensimmäinen viinialueen '
      + 'määritelmä nimellä Chianti tehtiin vuonna 1716, ja se koski Gaiolen, Castellinan ja '
      + 'Raddan kylien seutua. Vain Chianti Classico -alueen viini saa kantaa kaulassaan '
      + 'mustan kukon eli gallo neron tunnuksen. Castellina in Chianti on noin 2 800 asukkaan '
      + 'kunta Firenzen eteläpuolella, ja sen keskiaikaisessa linnoituksessa on 1300-luvun '
      + 'torni.',
    lahde: 'en-Wikipedia "Chianti" (viini), johdanto-osa; en-Wikipedia "Castellina in Chianti", '
      + 'johdanto-osa ja osio "Main sights"; koordinaatti "Castellina in Chianti" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-val-d-orcia',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-val-d-orcia-f0f64013.jpg',
      lyhyt: 'Sypressirivi kulkee kumpuilevan Val d\'Orcian pellon halki.',
      selite: 'Pitkä sypressirivi nousee peltoaukean poikki Val d\'Orcian maisemassa Toscanassa. Kuvan kuvaus viittaa Val d\'Orcian sypressien viehätykseen.',
      lahde: 'Valokuva: Iaia quark, Wikimedia Commons (CC0).',
      tekija: 'Iaia quark',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Continua_-_cypresses_(no_watermark).jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-val-d-orcia-a7a08ab0.jpg',
        lyhyt: 'Vitaletan pieni kappeli kahden sypressin välissä Val d\'Orcian kukkuloilla.',
        selite: 'Madonna di Vitaletan kappeli on tunnettu maamerkki Pienzan lähellä Val d\'Orcian maisemassa. Taustalla kaartuu sypressien reunustama tie.',
        lahde: 'Valokuva: kuhnmi, Wikimedia Commons (CC BY 2.0).',
        tekija: 'kuhnmi',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Capella_della_Madonna_di_Vitaleta_(52843848295).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Val d\'Orcia',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mikä Pienza on?',
      'Kuka Ghino di Tacco oli?',
    ],
    korostukset: ['Pienza|Pienza'],
    nappi: 'Renessanssin maalareiden maisema Toscanan kukkuloilla',
    // 11.55 E / 43.06666667 N — en-Wikipedia "Val d\"Orcia"
    laudat: {
      maailmankartta: { x: 6218.3, y: 1680.7 },
      europe: { x: 433, y: 760.9 },
    },
    teksti: 'Val d\'Orcia on Toscanan alue, joka ulottuu Sienan eteläpuolisilta kukkuloilta Monte '
      + 'Amiatalle Sienan ja Grosseton maakuntien välissä. Sen loivia, viljeltyjä kukkuloita '
      + 'rikkovat vain uomat sekä kaupungit ja kylät. Pienzan paavi Pius II rakennutti '
      + 'uudelleen "ihannekaupungiksi" 1400-luvulla, Radicofanissa asui rosvosankariksi '
      + 'kutsuttu Ghino di Tacco, ja Montalcinon Brunello-viini on Italian arvostetuimpia '
      + 'viinejä. Alueen maisemaa on kuvattu taiteessa renessanssin maalauksista '
      + 'nykyvalokuvaan. UNESCO merkitsi Val d\'Orcian maailmanperintökohteeksi vuonna 2004.',
    lahde: 'en-Wikipedia "Val d\'Orcia", johdanto-osa ja osio "World Heritage" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-alba',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-alba-f8b50e07.jpg',
      lyhyt: 'Langhen viinitarhat Barolon alueella La Morran näköalapaikalta katsottuna.',
      selite: 'Näkymä Langhen viinitarharinteille Barolon alueella La Morrasta, Libanonin setrin luota. Etualalla köynnösrivejä ja kylä kumpuilevien rinteiden keskellä.',
      lahde: 'Valokuva: Davide Tomatis, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Davide Tomatis',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Langhe_La_Morra_1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-alba-bab01ae9.jpg',
        lyhyt: 'Albalaisia valkoisia tryffeleitä puisessa laatikossa.',
        selite: 'Kuvassa on joukko valkoisia tryffeleitä (Alban tryffeleitä) harmaan kankaan päällä puisessa laatikossa. Kuvan otsikon mukaan tryffelit ovat Albasta.',
        lahde: 'Valokuva: Kent Wang, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Kent Wang',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:White_truffles_from_Alba.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Alba',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Miksi Alban valkoinen tryffeli on niin arvokas?',
      'Mitä Barolo on?',
    ],
    korostukset: ['tryffeli|tryffelistään'],
    nappi: 'Piemontin viini- ja tryffelikaupunki Langhen kukkuloilla',
    // 8.03333333 E / 44.7 N — en-Wikipedia "Alba, Piedmont"
    laudat: {
      maailmankartta: { x: 6101.1, y: 1614.1 },
      europe: { x: 365.4, y: 718 },
    },
    teksti: 'Alba on Piemontin kaupunki Cuneon maakunnassa, ja se kuuluu Piemontin viinimaiseman '
      + '(Langhe-Roero ja Monferrato) UNESCO-kohteen tärkeimpiin kaupunkeihin. Kaupunki on '
      + 'kuuluisa valkoisesta tryffelistään ja viinintuotannostaan, ja sen alueen '
      + 'DOCG-viinejä ovat Barbaresco, Barolo ja Moscato. Roomalaisaikana paikka oli Alba '
      + 'Pompeia, ja täällä syntyi Publius Helvius Pertinax, josta tuli vuonna 193 hetkeksi '
      + 'Rooman keisari. Alba oli 1000-luvulta vapaa kaupunkivaltio ja Lombardian liiton '
      + 'jäsen, ja Cheraskon sopimus vuonna 1631 antoi sen lopullisesti Savoijille. Nykyisin '
      + 'kaupungissa on konditoriakonserni Ferreron kotipaikka.',
    lahde: 'en-Wikipedia "Alba, Piedmont", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Minkä ruoka-aineen tuotannosta Alba on erityisen kuuluisa?',
      vaihtoehdot: [
        'Parmankinkusta ja parmesaanista',
        'Valkoisesta tryffelistä',
        'Balsamietikasta ja oliiviöljystä',
        'Mozzarellasta ja burratasta',
      ],
      oikea: 1,
      fakta: 'Alban roomalainen nimi oli Alba Pompeia, ja siellä syntyi Pertinax, josta tuli '
        + 'vuonna 193 hetkeksi Rooman keisari.',
    },
  },
  {
    id: 'hahmotelma-valdobbiadene',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-valdobbiadene-b065e0f0.jpg',
      lyhyt: 'Prosecco-viinitarhojen rinteitä ja kylän kirkontorni Valdobbiadenen kukkuloilla.',
      selite: 'Kuvassa Conegliano Valdobbiadene -proseccon viinitarhoja San Pietro di Barbozzan kohdalla Valdobbiadenessa, Venetossa. Kuvausteksti nimeää alueen Prosecco Superiore DOCG -tuotantoalueeksi.',
      lahde: 'Valokuva: Patafisik, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Patafisik',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tra_le_vigne_di_Valdobbiadene_-_wikiraduno_Alle_colline_del_prosecco_abc5.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-valdobbiadene-68fb4dcc.jpg',
        lyhyt: 'Cartizzen viinitarharinteet Valdobbiadenen lähellä UNESCO-maisemassa.',
        selite: 'Näkymä Cartizzen viinitarharinteille Valdobbiadenessa. Alue kuuluu UNESCO-kohteeseen Conegliano ja Valdobbiadenen proseccokukkulat.',
        lahde: 'Valokuva: Civvì, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Civvì',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pentagono_del_Cartizze_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Valdobbiadene',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Mikä on Prosecco?',
      'Mitä Glera tarkoittaa?',
    ],
    korostukset: ['Prosecco|Proseccon'],
    nappi: 'Venetsian kukkuloiden viinikylä, jonka rinteillä kasvaa Glera',
    // 11.91666667 E / 45.9 N — en-Wikipedia "Valdobbiadene"
    laudat: {
      maailmankartta: { x: 6230.6, y: 1564.5 },
      europe: { x: 440, y: 686.4 },
    },
    teksti: 'Valdobbiadene on kaupunki Trevison maakunnassa Venetossa. Alppien ja Dolomiittien '
      + 'juurella sijaitsevan seudun ilmasto sopii Glera-rypäleen viljelyyn, ja '
      + 'Conegliano–Valdobbiadene on parhaan Proseccon, kuivan kuohuvan valkoviinin, '
      + 'kotiseutu. Kaupunki kuului Trevison alaisuuteen vuoteen 1178 asti, sitten '
      + 'Ezzelinojen hallussa vuoteen 1260, ja 1300-luvun puolivälin tienoilla se siirtyi '
      + 'Venetsian vallan alle. Pyhä Venantius Fortunatus syntyi kaupungissa 500-luvulla. '
      + 'Vuonna 2019 Coneglianon ja Valdobbiadenen Proseccokukkulat kirjattiin UNESCOn '
      + 'maailmanperintöluetteloon.',
    lahde: 'en-Wikipedia "Valdobbiadene", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-assisi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-assisi-fb1b54ab.jpg',
      lyhyt: 'Pyhän Franciscuksen ylempi basilika Assisissa edestä kuvattuna.',
      selite: 'Ylemmän basilikan julkisivu, ruusuikkuna ja kellotorni Assisissa. Edessä on nurmikkoaukio ja taustalla avautuu Umbrian laakso.',
      lahde: 'Valokuva: Blackcat, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Blackcat',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2010-08-11_Assisi_San_Francesco_basilica_superiore_(corrected).jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-assisi-19f71147.jpg',
        lyhyt: 'Giotton freskossa paavi Innocentius III näkee unta ja Franciscus tukee kirkkoa.',
        selite: 'Freskon aihe on Innocentius III:n uni Franciscuksen elämää kuvaavasta Legend of St Francis -sarjasta. Fresko on Giotton työtä ja kuuluu Assisin basilikan freskosarjaan.',
        lahde: 'Maalaus: Giotto, Wikimedia Commons (public domain).',
        tekija: 'Giotto',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Giotto_-_Legend_of_St_Francis_-_-06-_-_Dream_of_Innocent_III.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-assisi-cef8735f.jpg',
        lyhyt: 'Vanha puupiirros Assisin kaupungista ja basilikasta rinteellä.',
        selite: 'Puupiirros esittää Assisin kaupunkia; vasemmalla näkyvät basilikan holvikäytävät ja kellotorni. Kuva on julkaistu teoksessa Le cento città d\'Italia (Sonzogno, 1887-1902).',
        lahde: 'Kaiverrus: tekijä tuntematon, Wikimedia Commons (public domain).',
        tekija: 'tekijä tuntematon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Assisi,_panorama_della_citt%C3%A0_(xilografia).jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Assisin basilika',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuka Pyhä Franciscus oli?',
      'Ketkä maalasivat basilikan freskot?',
    ],
    korostukset: ['Giotto|Giotto'],
    nappi: 'Pyhän Franciscuksen hautakirkko kukkulan rinteessä',
    // 12.60555556 E / 43.07472222 N — en-Wikipedia "Basilica of Saint Francis of Assisi"
    laudat: {
      maailmankartta: { x: 6253.5, y: 1680.3 },
      europe: { x: 453.2, y: 760.7 },
    },
    teksti: 'Pyhän Franciscuksen basilika on minoriittien veljeskunnan äitikirkko Assisissa '
      + 'Umbriassa, kaupungissa, jossa Franciscus syntyi ja kuoli. Se on yksi Italian '
      + 'tärkeimmistä pyhiinvaelluskohteista ja UNESCOn maailmanperintökohde vuodesta 2000. '
      + 'Rakentaminen alkoi vuonna 1228, ja kukkulan rinteeseen rakennetussa basilikassa on '
      + 'ylä- ja alakirkko sekä krypta, jossa pyhimyksen jäännökset ovat. Kirkkojen freskot '
      + 'ovat myöhäiskeskiajan maalareiden työtä, ja tekijöiden joukossa ovat muun muassa '
      + 'Cimabue, Giotto, Simone Martini ja Pietro Lorenzetti. Paavi Gregorius IX julisti '
      + 'Franciscuksen pyhimykseksi 16. heinäkuuta 1228.',
    lahde: 'en-Wikipedia "Basilica of Saint Francis of Assisi", johdanto-osa ja osio "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-urbino',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-urbino-9013cd59.jpg',
      lyhyt: 'Urbinon Palazzo Ducale ja tuomiokirkon kupoli kaupungin kattojen yllä.',
      selite: 'Näkymä Rocca Albornozin linnoitukselta Urbinon Palazzo Ducalelle, jonka torniparin vieressä kohoavat tuomiokirkon kupoli ja kellotorni.',
      lahde: 'Valokuva: Stefano Sansavini, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Stefano Sansavini',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2012_Urbino_-_panorama_dalla_fortezza_Albornoz_211.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-urbino-1e4ffba7.jpg',
        lyhyt: 'Palazzo Ducalen tiilijulkisivu ja kaksi tornia illan kultaisessa valossa.',
        selite: 'Urbinon Palazzo Ducalen julkisivu, jossa kaksi kartiokattoista tornia kehystää loggiaparvekkeita, auringon laskiessa.',
        lahde: 'Valokuva: NikonZ7II, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'NikonZ7II',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Palazzo_Ducale_(Urbino).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Urbino',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuka Federico da Montefeltro oli?',
      'Miksi Urbino on maailmanperintökohde?',
    ],
    korostukset: ['Palazzo Ducale|Palazzo Ducale'],
    nappi: 'Herttuan kukkulakaupunki, jonka palatsi on renessanssin ihanne',
    // 12.63638889 E / 43.72638889 N — en-Wikipedia "Urbino"
    laudat: {
      maailmankartta: { x: 6254.5, y: 1653.9 },
      europe: { x: 453.8, y: 743.6 },
    },
    teksti: 'Urbino on kaupunki Marchen alueella Pesaron lounaispuolella, ja se on '
      + 'maailmanperintökohde, joka tunnetaan itsenäisestä renessanssin kulttuuristaan, '
      + 'erityisesti herttua Federico da Montefeltron (herttuana 1444–1482) holhouksesta. '
      + 'Korkealle rinteelle rakennettu kaupunki on säilyttänyt paljon keskiaikaista '
      + 'ilmettään. Sen tunnetuin rakennus on Luciano Lauranan uudelleen rakentama Palazzo '
      + 'Ducale. Urbinon yliopisto perustettiin vuonna 1506, ja kaupunki on arkkipiispan '
      + 'kotipaikka. Roomalaisaikana pieni Urbinum Mataurense oli 500-luvulla goottisotien '
      + 'tärkeä linnake.',
    lahde: 'en-Wikipedia "Urbino", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-cremona',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-cremona-135f1c25.jpg',
      lyhyt: 'Cremonan Torrazzo-kellotorni ja tuomiokirkon julkisivu kaaren kehystämänä.',
      selite: 'Kuvassa Duomo di Cremona ja sen vieressä kohoava Torrazzo-kellotorni, jonka seinässä on tähtitieteellinen kello. Näkymä on otettu portiikin kaaren alta.',
      lahde: 'Valokuva: Monica Rondoni, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Monica Rondoni',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cremona_-_Duomo_di_Cremona_e_il_Torrazzo_in_cornice.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-cremona-48124307.jpg',
        lyhyt: 'Stradivarin vuonna 1721 rakentama Lady Blunt -viulu edestä.',
        selite: 'Kuvassa on vuodelta 1721 peräisin oleva Lady Blunt Stradivari -viulu, jonka on rakentanut cremonalainen Antonio Stradivari. Kuva näyttää soittimen kannen, f-aukot ja kaiverretun kielenpitimen.',
        lahde: 'Valokuva: Tarisio Auctions (lataaja Violachick68), Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Tarisio Auctions (lataaja Violachick68)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lady_Blunt_top.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Cremona',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuka Antonio Stradivari oli?',
      'Miksi viulut tehtiin juuri Cremonassa?',
    ],
    korostukset: ['Stradivari|Stradivari'],
    nappi: 'Viulunrakentajien kaupunki Po-joen varrella',
    // 10.02472222 E / 45.13333333 N — en-Wikipedia "Cremona"
    laudat: {
      maailmankartta: { x: 6167.5, y: 1596.3 },
      europe: { x: 403.7, y: 706.6 },
    },
    teksti: 'Cremona on Lombardian kaupunki Po-joen vasemmalla rannalla keskellä Po-tasankoa. Se '
      + 'on erityisen tunnettu musiikkiperinteestään ja varhaisimmista ja arvostetuimmista '
      + 'viulunrakentajista, joihin kuuluvat muun muassa Giuseppe Guarneri, Antonio '
      + 'Stradivari, Francesco ja Vincenzo Rugeri sekä useat Amatin suvun jäsenet. Cremona '
      + 'alkoi 1500-luvulta lähtien tunnetuksi soitinvalmistuksen keskuksena, ja Amatin ja '
      + 'Rugerin viuluja seurasivat Guarnerin ja Stradivarin verstaat. Roomalaiset perustivat '
      + 'kaupungin vuonna 218 eaa. ensimmäiseksi tukikohdakseen Po-joen pohjoispuolelle.',
    lahde: 'en-Wikipedia "Cremona", johdanto-osa ja osiot "History" ja "Music" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Mihin tarkoitukseen roomalaiset perustivat Cremonan?',
      vaihtoehdot: [
        'Kauppasatamaksi Adrianmeren rannalle',
        'Marmorilouhosten työläisten asuinkyläksi',
        'Keisarin kesäasuinpaikaksi Po-tasangolle',
        'Ensimmäiseksi tukikohdakseen Po-joen pohjoispuolelle',
      ],
      oikea: 3,
      fakta: 'Cremona alkoi 1500-luvulta lähtien tunnetuksi soitinvalmistuksen keskuksena, ja '
        + 'Amatin sekä Rugerin viuluja seurasivat Guarnerin ja Stradivarin verstaat.',
    },
  },
  {
    id: 'hahmotelma-portofino',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-portofino-bc38ab85.jpg',
      lyhyt: 'Portofinon satamalahti ja värikkäät rantatalot pohjoiseen katsottuna.',
      selite: 'Kuvassa näkyy Portofinon rantaan rakennettu värikäs taloriviä, satamalahti veneineen ja metsäinen rinne taustalla. Kuvaus mukaan näkymä on Portofinosta pohjoiseen.',
      lahde: 'Valokuva: Luka Peternel, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Luka Peternel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Portofino-2017-Luka-Peternel.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-portofino-affb97e6.jpg',
        lyhyt: 'Portofinon kylän keskustan pastellinväriset talot ja kellotorni satamalaiturilta.',
        selite: 'Kuvassa on Portofinon kylän keskustan rakennuksia rantatorin ympärillä, taustalla kellotorni ja oliivi- ja pinjapuiden peittämä rinne. Etualalla on veneitä satamassa.',
        lahde: 'Valokuva: Benjamin Smith, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Benjamin Smith',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:View_of_Portofino_-_04.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Portofino',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mistä Portofinon nimi tulee?',
      'Miksi talot ovat värikkäitä?',
    ],
    korostukset: ['Portus Delphini|Portus Delphini'],
    nappi: 'Kalastajakylä, jonne ylhäisö vasta alkaa löytää tiensä',
    // 9.20777778 E / 44.30388889 N — en-Wikipedia "Portofino"
    laudat: {
      maailmankartta: { x: 6140.3, y: 1630.4 },
      europe: { x: 388, y: 728.4 },
    },
    teksti: 'Portofino on kunta Italian Rivieralla Genovan suurkaupunkialueella. Kylä sijaitsee '
      + 'pienen satamansa ympärillä, ja sen tunnusmerkki ovat rantaa reunustavat värikkäiksi '
      + 'maalatut talot. Plinius Vanhempi mainitsi paikan nimellä Portus Delphini eli '
      + 'Delfiinin satama. Vuoden 986 asiakirjassa kylä liitettiin San Fruttuoso di '
      + 'Capodimonten luostarille, ja vuoden 1229 jälkeen se kuului Genovan tasavallalle. '
      + 'Luonnonsatama tuki kalastusvenekuntaa, mutta se oli liian ahdas Genovan kasvavalle '
      + 'kauppalaivastolle. Vuodesta 1815 kylä kuului Sardinian kuningaskuntaan ja vuodesta '
      + '1861 yhtenäiseen Italiaan.',
    lahde: 'en-Wikipedia "Portofino", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-carrara',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-carrara-55725472.jpg',
      lyhyt: 'Carraran marmorilouhosten rinteet ja serpentiinitie ylhäältä nähtynä.',
      selite: 'Kuvassa on osa Carraran marmorilouhoksista: vaaleita louhintaportaita ja louhoskuoppia vuoren rinteessä sekä mutkitteleva tie alempana. Louhinta on tehty portaittain suoraan vuoren kylkeen.',
      lahde: 'Valokuva: Wittylama, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Wittylama',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Carrara_marble_quarry.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-carrara-57edad0b.jpg',
        lyhyt: 'Fantiscrittin louhoksen jyrkkä valkoinen marmoriseinämä sinistä taivasta vasten.',
        selite: 'Kuvassa on Fantiscrittin louhoksen porrastettu, suoraksi sahattu marmoriseinämä. Seinän tasaiset portaat ja pystysuorat saumat näyttävät, miten marmoria irrotetaan lohkoina.',
        lahde: 'Valokuva: Gabriele85, Wikimedia Commons (CC0).',
        tekija: 'Gabriele85',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cave_di_Fantiscritti_3.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
    ],
    nimi: 'Carraran marmorilouhokset',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Mitä Carraran marmorista on tehty?',
      'Miksi kaupungin tunnuksessa on pyörä?',
    ],
    korostukset: ['marmori|marmorista'],
    nappi: 'Valkoisen marmorin vuoret, joista kiveä on kuljetettu kaksituhatta vuotta',
    // 10.1 E / 44.07916667 N — en-Wikipedia "Carrara"
    laudat: {
      maailmankartta: { x: 6170, y: 1639.5 },
      europe: { x: 405.1, y: 734.3 },
    },
    teksti: 'Carrara on kaupunki Toscanassa, noin sata kilometriä Firenzestä länsi-luoteeseen, ja '
      + 'se on tunnettu valkoisesta tai sinertävänharmaasta marmorista, jota sen ympäristössä '
      + 'louhitaan. Kaupungin motto Fortitudo mea in rota, voimani on pyörässä, viittaa '
      + 'marmorin kuljetukseen roomalaisajoista lähtien. Nykyinen kaupunki sai alkunsa '
      + 'työläisten asuinkylänä roomalaisten louhoksille, jotka perustettiin Ligurian '
      + 'valloituksen jälkeen 100-luvun alussa eaa. Carraran marmoria on käytetty Rooman '
      + 'Pantheonissa ja Trajanuksen pylväässä, ja monet renessanssin veistokset veistettiin '
      + 'siitä. 1800-luvun lopulla Carrarasta tuli Italian anarkismin kehto erityisesti '
      + 'louhijoiden keskuudessa.',
    lahde: 'en-Wikipedia "Carrara", johdanto-osa ja osiot "History" ja "Carrara marble" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mihin Carraran motto Fortitudo mea in rota eli voimani on pyörässä viittaa?',
      vaihtoehdot: [
        'Kaupungin muinaisiin ratsuväkijoukkoihin',
        'Vesipyöriin, jotka pyörittivät viljamyllyjä',
        'Marmorin kuljetukseen roomalaisajoista lähtien',
        'Kaupungin puolustukseen keskiajan piirityksissä',
      ],
      oikea: 2,
      fakta: '1800-luvun lopulla Carrarasta tuli Italian anarkismin kehto erityisesti louhijoiden '
        + 'keskuudessa.',
    },
  },
  {
    id: 'hahmotelma-larderello',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-larderello-12aace90.jpg',
      lyhyt: 'Larderellon lähellä sijaitsevan geotermisen voimalan jäähdytystornit Toscanan kukkuloilla.',
      selite: 'Kuvassa on geotermisen voimalaitoksen suuret betoniset jäähdytystornit Colline Metallifere -kukkuloilla Larderellon lähellä. Taustalla näkyy toinen voimalaitos putkistoineen ja höyryävine jäähdytysyksiköineen.',
      lahde: 'Valokuva: Paul Gipe, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Paul Gipe',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Colline_Metaliffera_Italy_0032.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-larderello-df8f556d.jpg',
        lyhyt: 'Vuoden 1868 kaiverrus Larderellon höyryävistä boraattilammikoista.',
        selite: 'Kaiverrus esittää Larderellon maisemaa vuonna 1868: kuumia lähteitä, höyrypilviä ja rakennuksia laaksossa. Etualalla ratsastaja ja kävelijä kulkevat höyryävän maiseman halki.',
        lahde: 'Kaiverrus: Guglielmo Jervis, Wikimedia Commons (public domain).',
        tekija: 'Guglielmo Jervis',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Larderello_1868.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Larderello',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miten maan höyrystä saadaan sähköä?',
      'Mihin boorihappoa käytettiin?',
    ],
    korostukset: ['boorihappo|boorihappoa'],
    nappi: 'Höyryävä boorihappokylä, josta syttyy myöhemmin ensimmäinen geoterminen sähkö',
    // 10.88888889 E / 43.23972222 N — en-Wikipedia "Larderello"
    laudat: {
      maailmankartta: { x: 6196.3, y: 1673.7 },
      europe: { x: 420.3, y: 756.4 },
    },
    teksti: 'Larderello on Pomaranceen kuuluva kylä Toscanassa, joka tunnetaan geotermisestä '
      + 'tuottavuudestaan. Alueella purkautuu maasta kuumaa höyryä lähteistä, ja se tuottaa '
      + 'nykyisin kymmenen prosenttia maailman geotermisestä sähköstä. Roomalaiset käyttivät '
      + 'alueen rikkilähteitä kylpemiseen. Vuonna 1827 ranskalainen François Jacques de '
      + 'Larderel keksi tavan erottaa boorihappoa mudasta lämmittämällä sitä höyryllä, ja '
      + 'työläisten asuttamiseksi perustettiin hänen mukaansa nimetty Larderello. Vuonna 1904 '
      + 'alueella sytytettiin höyryn tuottamalla sähköllä lamppuja ensimmäistä kertaa '
      + 'käytännössä, ja vuonna 1911 rakennettiin maailman ensimmäinen geoterminen voimala.',
    lahde: 'en-Wikipedia "Larderello", johdanto-osa ja osiot "Geography" ja "History" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mihin Larderellon maasta purkautuvaa kuumaa höyryä käytettiin 1800-luvulla?',
      vaihtoehdot: [
        'Boorihapon erottamiseen mudasta',
        'Suolan haihduttamiseen merivedestä',
        'Kankaiden värjäämiseen ja huuhteluun',
        'Raudan sulattamiseen kaivoksissa',
      ],
      oikea: 0,
      fakta: 'Vuonna 1911 Larderelloon rakennettiin maailman ensimmäinen geoterminen voimala.',
    },
  },
  {
    id: 'hahmotelma-brennero',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-brennero-de292701.jpg',
      lyhyt: 'Brennerin solan kapea laakso pohjoisesta katsottuna, pohjassa rautatie ja moottoritie.',
      selite: 'Kuvassa näkyy Brennerin sola pohjoispuolelta Padauner Kogelilta katsottuna. Metsäisten rinteiden välissä kulkevat vierekkäin rautatie ja moottoritie sekä solan aseman alue.',
      lahde: 'Kuva: Haneburger, Wikimedia Commons (public domain).',
      tekija: 'Haneburger',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Brennerpass_from_north.JPG',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-brennero-f6d2859e.jpg',
        lyhyt: 'Brennerin rautatieasema ratapihoineen ja moottoritie solan laella.',
        selite: 'Kuvassa näkyy Brennerin solan asema-alue ratapihoineen, taloineen ja moottoritie. Ympärillä ovat havumetsäiset rinteet ja niityt.',
        lahde: 'Valokuva: Hermann Hammer, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Hermann Hammer',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Brennerpass_mit_Bahnhof_und_Autobahn.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Brenner',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi Brennerin sola on tärkeä?',
      'Miksi rautatiessä ei ole suurta tunnelia?',
    ],
    korostukset: ['Brennerin rautatie|Brennerin rautatie'],
    nappi: 'Alppien matalin sola, jonka rautatie on juuri valmistunut',
    // 11.5075 E / 47.00333333 N — en-Wikipedia "Brenner Pass"
    laudat: {
      maailmankartta: { x: 6216.9, y: 1518.4 },
      europe: { x: 432.1, y: 657.4 },
    },
    teksti: 'Brennerin sola on Alppien ylikulkusola, joka muodostaa Italian ja Itävallan rajan, '
      + 'ja se on alueen Itäalppien solista matalin. Solan keskiosassa kulkee nykyisin '
      + 'nelikaistainen moottoritie ja rautatiekäytävä, joka yhdistää Bolzanon ja '
      + 'Innsbruckin. Roomalaiset tasoittivat solan reitin, ja Itävallan keisarikunnan aikana '
      + 'rakennettiin Brennerin rautatie, joka valmistui vaiheittain vuosina 1853–1867. Se '
      + 'oli ensimmäinen Alppien ylittävä rautatie, jossa ei ollut suurta tunnelia ja joka '
      + 'kulki korkealla, 1 371 metrin korkeudessa. Rautatie antoi itävaltalaisten siirtää '
      + 'joukkojaan tehokkaammin.',
    lahde: 'en-Wikipedia "Brenner Pass", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-stelvio',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-stelvio-a37d4c6e.jpg',
      lyhyt: 'Stelvion solan itärinteen serpentiinitie mutkitteli lumisen vuoristolaakson yllä.',
      selite: 'Kuvassa on Stelvion solan itäinen nousu eli Bolzanon puoleinen rinne, jossa tie kiemurtelee jyrkässä rinteessä useissa tiukoissa mutkissa. Tien varrella on vielä lunta, ja etualalla pyöräilijä laskee mutkaa.',
      lahde: 'Valokuva: kallerna, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'kallerna',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stelvio_Pass_Bolzano_side_1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-stelvio-f26fc162.jpg',
        lyhyt: 'Vanha mustavalkokuva Casino dei Rotteri -tiehoitajan talosta Stelvion solalla vuonna 1895.',
        selite: 'Kuvassa on Stelvion solan Casino dei Rotteri -rakennus vuonna 1895, ympärillään lumikenttiä ja kivikkoa. Talon takana tie jatkuu jäätikön reunaa pitkin.',
        lahde: 'Valokuva: tekijä tuntematon, Wikimedia Commons (public domain).',
        tekija: 'tuntematon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Passo_dello_Stelvio_-_Casino_dei_Rotteri_-_1895.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Stelvion sola',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Kuinka jyrkkä Stelvion tie on?',
      'Mitä Kolmen kielen huippu tarkoittaa?',
    ],
    korostukset: ['Carlo Donegani|Carlo Donegani'],
    nappi: 'Itävallan keisarikunnan rakentama tie Alppien yli',
    // 10.45277778 E / 46.52861111 N — en-Wikipedia "Stelvio Pass"
    laudat: {
      maailmankartta: { x: 6181.8, y: 1538.3 },
      europe: { x: 411.9, y: 669.9 },
    },
    teksti: 'Stelvion sola on Pohjois-Italian vuoristosola Sveitsin rajalla, 2 757 metrin '
      + 'korkeudessa. Se on Itäalppien korkein päällystetty sola ja Alppien toiseksi korkein, '
      + 'seitsemän metriä Ranskan Col de l\'Iseranin alapuolella. Sola sijaitsee Ortlerin '
      + 'Alpeilla Etelä-Tirolin Stilfsin ja Sondrion maakunnan Bormion välissä. Alkuperäisen '
      + 'tien rakennutti Itävallan keisarikunta vuosina 1820–1825 yhdistämään Lombardian '
      + 'Itävaltaan, ja nousua tiellä on 1 871 metriä; insinöörinä ja projektipäällikkönä '
      + 'toimi Carlo Donegani. Solan yläpuolella oleva Kolmen kielen huippu on nimetty siitä, '
      + 'että italian, saksan ja retoromaanin puhealueet kohtaavat siinä.',
    lahde: 'en-Wikipedia "Stelvio Pass", johdanto-osa ja osiot "Location" ja "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-ivrea',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-ivrea-2a3cf8b3.jpg',
      lyhyt: 'Ivrean punatiilinen ensimmäinen Olivettin kirjoituskonetehdas vuodelta 1908.',
      selite: 'Kuvassa on Ivrean ensimmäinen Olivettin kirjoituskonetehdas, joka on rakennettu vuonna 1908. Tiilirakennuksen kaarevat ikkunat ja tiiliseinät ovat tyypillistä varhaista teollisuusarkkitehtuuria.',
      lahde: 'Kuva: Laurom, Wikimedia Commons (public domain).',
      tekija: 'Laurom',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ivrea_Primo_Stabilimento_Olivetti.JPG',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-ivrea-fd6e3073.jpg',
        lyhyt: 'Appelsiinitaistelu Ivrean karnevaalilla: kypäräpäiset heittäjät vaunun päällä.',
        selite: 'Ivrean karnevaalin appelsiinitaistelu esittää kansan kapinaa. Vaunuilla seisovat, suojakypärillä varustetut heittäjät ja katujen joukot heittelevät appelsiineja toisiaan kohti.',
        lahde: 'Valokuva: Vfbia, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Vfbia',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:La_battaglia_delle_arance_al_Carnevale_di_Ivrea_02.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ivrea',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Mitä Olivetti valmisti?',
      'Mikä on Appelsiinitaistelu?',
    ],
    korostukset: ['Appelsiinitaistelu|Appelsiinitaistelusta'],
    nappi: 'Tänne nousee myöhemmin kirjoituskonetehdas, joka muuttaa kaupungin',
    // 7.88333333 E / 45.46666667 N — en-Wikipedia "Ivrea"
    laudat: {
      maailmankartta: { x: 6096.1, y: 1582.5 },
      europe: { x: 362.6, y: 697.8 },
    },
    teksti: 'Ivrea on Torinon suurkaupunkialueeseen kuuluva kaupunki Piemontessa '
      + 'Luoteis-Italiassa, Dora Baltea -joen molemmin puolin. Roomalaiset perustivat sen '
      + 'nimellä Eporedia, ja keskiajalla siitä tuli Ivrean marssin keskus ja 1000-luvulla '
      + 'hetkeksi Italian kuningaskunnan pääkaupunki. Myöhemmin kaupunki siirtyi Savoijin '
      + 'suvun omistukseen. 1900-luvulla Ivrea tuli kansainvälisesti tunnetuksi Olivettin '
      + 'pääkonttorina; yritys valmisti kirjoituskoneita, mekaanisia laskukoneita ja '
      + 'myöhemmin tietokoneita. Olivetti-alue "Industrial City of the 20th Century" '
      + 'merkittiin UNESCOn maailmanperintöluetteloon vuonna 2018. Kaupunki tunnetaan myös '
      + 'karnevaalistaan ja sen Appelsiinitaistelusta.',
    lahde: 'en-Wikipedia "Ivrea", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-canossa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-canossa-f908ccb6.jpg',
      lyhyt: 'Canossan linnan rauniot: rapistuneita kivimuureja ja ikkuma-aukkoja pilvisen taivaan alla.',
      selite: 'Kuvassa ovat Canossan linnan (Castello di Canossa) rauniot Emilia-Romagnassa: karkeasta kivestä laskettuja muureja, joissa on kapeita ikkuna-aukkoja.',
      lahde: 'Valokuva: SIG SG 510, Wikimedia Commons (CC0).',
      tekija: 'SIG SG 510',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castello_di_Canossa_88.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-canossa-0f1506b6.jpg',
        lyhyt: 'Canossan linnan rauniot kohoavat harmaiden savikkorinteiden yläpuolella olevalla kukkulalla.',
        selite: 'Kuvassa Canossan linnavuori nousee kukkulan laella eroosion uurtaman, harmaan savikkomaiseman (calanchi) yläpuolella. Linnan rauniot erottuvat metsäisen kukkulan huipulla.',
        lahde: 'Valokuva: Paolo da Reggio, Wikimedia Commons (CC BY 2.5).',
        tekija: 'Paolo da Reggio',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Canossa_castle.jpg',
        lisenssi: 'CC BY 2.5',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.5',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-canossa-0bfb5305.jpg',
        lyhyt: 'Keskiaikainen kirjaminiatyyri: Henrik IV polvistuu apotti Hugon ja Matildan edessä.',
        selite: 'Kuvassa Henrik IV polvistuu Clunyn apotti Hugon ja Toscanan Matildan edessä. Latinankielinen kuvateksti kertoo kuninkaan pyytävän apottia ja Matildaa esirukoilijoiksi; kohtaus liittyy Canossan tapahtumiin vuonna 1077.',
        lahde: 'Kirjaminiatyyri: Donizo, Wikimedia Commons (public domain).',
        tekija: 'Donizo',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mathilde_und_Hugo_von_Cluny_als_Fürsprecher_Heinrichs_IV..jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Canossan linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä Canossan matka tarkoittaa?',
      'Kuka Matilda Toscanalainen oli?',
    ],
    korostukset: ['investituuririidan|investituuririidan'],
    nappi: 'Kallion linna, jonne keisari kävelee anomaan paavin anteeksiantoa',
    // 10.456 E / 44.576 N — en-Wikipedia "Canossa Castle"
    laudat: {
      maailmankartta: { x: 6181.9, y: 1619.2 },
      europe: { x: 412, y: 721.3 },
    },
    teksti: 'Canossan linna on Reggio Emilian maakunnassa Pohjois-Italiassa, ja se tunnetaan '
      + 'paikkana, jossa keisari Henrik IV ja paavi Gregorius VII sopivat välirikon vuonna '
      + '1077 investituuririidan aikana. Linnan rakennutti noin vuonna 940 Adalbert Atto, '
      + 'Beggian ja Manturan kreivi, kalliokukkulan huipulle. Sitä suojasi kolminkertainen '
      + 'muurirengas, ja keskiajalla se oli yksi Italian mahtavimmista linnoista. Paavin '
      + 'ystävä, linnan silloinen omistaja Matilda Toscanalainen, määräsi maansa kuolemansa '
      + '(1115) jälkeen kirkolle. Reggion joukot tuhosivat linnan vuonna 1255, ja Este-suku '
      + 'omisti sen vuoteen 1796 asti.',
    lahde: 'en-Wikipedia "Canossa Castle", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-cannae',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-cannae-0b98c9ea.jpg',
      lyhyt: 'Canne della Battaglian arkeologisen alueen kiviseinät ja pylväänjäänteet viinitarhojen keskellä.',
      selite: 'Kuvassa on Canne della Battaglian arkeologinen alue Apulian tasangolla: kalkkikivimuurien rajaama tila, jossa on muutama jäljelle jäänyt marmoripylväs. Taustalla näkyy viljelymaata ja viinitarhoja.',
      lahde: 'Valokuva: Roberto Ragno, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Roberto Ragno',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Canne_della_Battaglia.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-cannae-db673e9c.jpg',
        lyhyt: 'Kivipylväs kukkulan laella muistuttaa Cannaen taistelusta, alla laaja tasanko.',
        selite: 'Kuvassa on Cannaen taistelun muistoksi pystytetty kivipylväs. Sen takana avautuu Apulian viljelty tasanko, jolla taistelun kerrotaan käydyn.',
        lahde: 'Valokuva: Jörg Schulz, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Jörg Schulz',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Monumento_Battaglia_di_Canne.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-cannae-1028149a.jpg',
        lyhyt: 'Vanha kaiverrus Cannaen taistelukentän tasangosta ja mutkittelevasta joesta.',
        selite: 'Vanha kirjankuvitus "Punti storici d\'Italia" esittää Cannaen taistelukentän maisemaa: kivenlohkareita etualalla ja laaja joen halkoma tasanko taustalla.',
        lahde: 'Kaiverrus: Gustav Adolf Closs, Wikimedia Commons (public domain).',
        tekija: 'Gustav Adolf Closs',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Punti_storici_d’Italia_campo_della_battaglia_di_Canne.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Cannae',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miten Hannibal voitti suuremman armeijan?',
      'Mitä taistelun jälkeen tapahtui?',
    ],
    korostukset: ['Hannibal|Hannibalin'],
    nappi: 'Apulian kukkula, jonka lähellä Hannibal saartoi roomalaiset',
    // 16.15166667 E / 41.29638889 N — en-Wikipedia "Cannae"
    laudat: {
      maailmankartta: { x: 6371.7, y: 1751.6 },
      europe: { x: 521.3, y: 807.5 },
    },
    teksti: 'Cannae eli nykyisin Canne della Battaglia on muinainen kylä Apulian alueella '
      + 'Kaakkois-Italiassa, Barletan kunnan osa Ofanto-joen oikealla rannalla noin yhdeksän '
      + 'kilometriä Barletasta lounaaseen. Se on tunnettu ennen kaikkea Cannaen taistelusta '
      + '2. elokuuta 216 eaa., joka oli toisen puunilaissodan ratkaiseva yhteenotto. '
      + 'Hannibalin johtamat karthagolaiset ja heidän liittolaisensa saartoivat ja lähes '
      + 'tuhosivat suuremman rooma- ja italialaisarmeijan, jota johtivat konsulit Lucius '
      + 'Aemilius Paullus ja Gaius Terentius Varro. Taistelua pidetään yhtenä sotataidon '
      + 'suurimmista taktisista saavutuksista ja yhtenä Rooman pahimmista tappioista. '
      + 'Historioitsijat kiistelevät yhä siitä, käytiinkö taistelu joen oikealla vai '
      + 'vasemmalla rannalla.',
    lahde: 'en-Wikipedia "Cannae" ja "Battle of Cannae", johdanto-osat (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-solferino',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-solferino-313517e9.jpg',
      lyhyt: 'Solferinon linnatorni La Rocca kohoaa sypressien ja metsän yläpuolelle.',
      selite: 'Kuvassa on Solferinon kukkulan huipulla oleva kivitorni La Rocca, jota kutsutaan nimellä La Spia d\'Italia (Italian vakooja). Torni erottuu sypressien takaa, ja sen huipulla liehuu Italian lippu.',
      lahde: 'Valokuva: Massimo Telò, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Massimo Telò',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Solferino-La_rocca_2.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-solferino-a5736b39.jpg',
        lyhyt: 'Punaisen Ristin muistomerkki Solferinossa: kivinen seinämä, jossa on punainen risti.',
        selite: 'Kuvassa on Solferinossa sijaitseva kansainvälisen Punaisen Ristin muistomerkki. Vaalean kiviseinämän aukossa näkyy punainen risti, ja oikealla on muistolaattoja täynnä oleva seinä.',
        lahde: 'Valokuva: memedesimo, Wikimedia Commons (CC BY 2.0).',
        tekija: 'memedesimo',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Monumento_alla_Croce_Rossa,_Solferino.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-solferino-34a74f09.jpg',
        lyhyt: 'Carlo Bossolin maalaus Solferinon taistelusta 1859: taistelevia joukkoja kirkon ja tornin edessä.',
        selite: 'Carlo Bossolin maalaus kuvaa Solferinon taistelua kesäkuussa 1859. Taustalla näkyvät kylän kirkko, kellotorni ja kukkulan torni savun keskellä, etualalla ranskalaisia joukkoja.',
        lahde: 'Maalaus: Carlo Bossoli, Wikimedia Commons (public domain).',
        tekija: 'Carlo Bossoli',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bossoli,_Carlo_-_Battle_of_Solferino.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Solferino',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka Henry Dunant oli?',
      'Mitä Punainen Risti tekee?',
    ],
    korostukset: ['Henry Dunant|Henry Dunant'],
    nappi: 'Kukkulakylä, jonka taistelusta 1859 syntyi Punaisen Ristin aate',
    // 10.56638889 E / 45.36722222 N — en-Wikipedia "Battle of Solferino"
    laudat: {
      maailmankartta: { x: 6185.5, y: 1586.6 },
      europe: { x: 414.1, y: 700.4 },
    },
    teksti: 'Solferinon taistelu käytiin 24. kesäkuuta 1859 Italian toisen itsenäisyyssodan '
      + 'ratkaisevana taisteluna, ja siinä Napoleon III:n johtama Ranskan armeija ja Viktor '
      + 'Emanuel II:n Piemonte-Sardinian armeija voittivat Itävallan keisari Frans Joosefin '
      + 'armeijan. Se oli viimeinen suuri taistelu maailmanhistoriassa, jossa kaikki armeijat '
      + 'olivat hallitsijoidensa henkilökohtaisessa johdossa. Sotilaita oli yhteensä noin 300 '
      + '000. Sveitsiläinen Henry Dunant kiersi taistelukentän jälkeenpäin ja järkyttyi '
      + 'haavoittuneiden kärsimyksestä. Hän kirjoitti kirjan Muisto Solferinosta, ja se johti '
      + 'Geneven sopimuksiin ja Punaisen Ristin perustamiseen.',
    lahde: 'en-Wikipedia "Battle of Solferino", johdanto-osa (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mikä Solferinon taistelun jälkeen kirjoitettu teos johti Punaisen Ristin '
        + 'perustamiseen?',
      vaihtoehdot: [
        'Itävallan ja Ranskan yhteinen rauhansopimus',
        'Napoleon III:n julistus haavoittuneiden suojelusta',
        'Sveitsin hallituksen laatima sotilassairaalan ohjesääntö',
        'Henry Dunantin kirja Muisto Solferinosta',
      ],
      oikea: 3,
      fakta: 'Solferinon taistelu oli viimeinen suuri taistelu, jossa kaikki armeijat olivat '
        + 'hallitsijoidensa henkilökohtaisessa johdossa.',
    },
  },
  {
    id: 'hahmotelma-teano',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-teano-22ceef45.jpg',
      lyhyt: 'Carlo Ademollon maalaus Teanon kättelystä: Garibaldi ja Vittorio Emanuele hevosten selässä.',
      selite: 'Maalaus esittää Garibaldin ja Vittorio Emanuele II:n tapaamista Teanon lähellä vuonna 1860. Miehet kättelevät hevosten selässä, taustalla on vuoristomaisema ja oikealla lammaslauma ja paimentyttö.',
      lahde: 'Maalaus: Carlo Ademollo (1825-1911), Wikimedia Commons (public domain).',
      tekija: 'Carlo Ademollo (1825-1911)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ademollo-Teano.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-teano-a7980811.jpg',
        lyhyt: 'Teanon roomalaisen teatterin kiviset katsomoportaat ja kaupungin talot taustalla.',
        selite: 'Kuvassa ovat Teanumin (nykyisen Teanon) roomalaisen teatterin kaarevat katsomoportaat. Teatteri kertoo, että kaupunki oli tärkeä jo antiikin aikana, kauan ennen Garibaldin tapaamista.',
        lahde: 'Valokuva: Mauro Riccio, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Mauro Riccio',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Teatro_Romano_di_Teano.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Teano',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Garibaldi luovutti vallan kuninkaalle?',
      'Mitä Kahden Sisilian kuningaskunta oli?',
    ],
    korostukset: ['Garibaldi|Garibaldi'],
    nappi: 'Kaupunki, jonka lähellä Garibaldi luovutti etelän kuninkaalle',
    // 14.06666667 E / 41.25 N — en-Wikipedia "Teano"
    laudat: {
      maailmankartta: { x: 6302.2, y: 1753.5 },
      europe: { x: 481.3, y: 808.7 },
    },
    teksti: 'Teano on Campanian Casertan maakunnassa sijaitseva kaupunki noin 30 kilometriä '
      + 'Casertasta luoteeseen Napolin ja Rooman välisen pääradan varrella. Se sijaitsee '
      + 'sammuneen Rocca Monfina -tulivuoren kaakkoisrinteellä. Kaupunki on kuuluisa Teanon '
      + 'kädenpuristuksesta 26. lokakuuta 1860: Giuseppe Garibaldi, joka oli vallannut Kahden '
      + 'Sisilian kuningaskunnan Napolin Bourboneilta, puristi Sardinian kuninkaan Viktor '
      + 'Emanuel II:n kättä ja tervehti häntä Italian kuninkaana. Näin Garibaldi uhrasi '
      + 'tasavaltalaiset toiveensa Italian yhtenäisyyden vuoksi. Tapahtuma on suosittu aihe '
      + 'italialaisissa isänmaallisissa patsaissa ja maalauksissa.',
    lahde: 'en-Wikipedia "Teano", johdanto-osa ja osio "Handshake of Teano" (tarkistettu '
      + '19.9.2026).',
  },
];
