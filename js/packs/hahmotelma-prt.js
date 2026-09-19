/*
 * PORTUGALIN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan,
 * Italian ja Saksan jälkeen Portugali.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48) =====
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä Espanjan, Italian ja Saksan pakat: jokaisella
 * nostolla on valmis sisältö — `teksti` 3–5 virkettä Wikipedian
 * johdannosta omin sanoin suomeksi (ei käännöskopiota, ei keksittyjä
 * faktoja, `lahde`-riville artikkeli ja tarkistuspäivä), 1873-
 * näkökulman `nappi`-alaotsikko, kaksi pulun kysymystä, `korostukset`
 * ja vähintään kaksi Commons-kuvaa (`kuva` + `kuvat`; vain public
 * domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi ja lähdesivu
 * kirjattuna, jokaisen kuvan tiedot luettu Commonsin extmetadata-
 * rajapinnasta). Vuoden 1873 jälkeiset kohteet (Ponta da Piedaden majakka
 * 1913, Peniche Fortress vankilana 1934–1974, Peneda-Gerês 1971,
 * Panasqueiran kaivos 1901, Côa-laakson löytö 1990-luvulla) ovat mukana:
 * teksti on nykytietoa ja `nappi` katsoo vuodesta 1873 eteenpäin
 * ("tänne nousee myöhemmin…").
 *
 * Azorien Pico ja Madeiran Pico Ruivo jätettiin pois: ne eivät osu
 * Portugalin fokuslehden rajaukseen (`osuuLehteen('PRT')` = false), eli
 * pelaaja ei tavoittaisi niitä (sama sääntö kuin Espanjan Teide).
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `prt-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/prt/.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin Ranskan, Espanjan, Italian ja Saksan hahmotelmalla:
 * nämä ovat kaikki aidosti kaupungin ulkopuolella (Portugalin ainoa
 * pelikaupunki on Lissabon; lähin nosto on yli 14 lautayksikön päässä,
 * raja KAUPUNGIN_KOHDALLA_SADE on 7), ja js/fokuskohteet.js liittää
 * rivit KOHDE_MAAT.PRT:hen. `lahi: true` on sama lähizoomiportti kuin
 * Ranskan hahmotelmalla (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen. Kohteilla, joiden oman artikkelin
 * koordinaatti puuttui, piste on saman paikan artikkelista: Côa-laakso
 * (Vila Nova de Foz Côa) ja Torres Vedrasin linjat (Torres Vedras).
 * Laudan luvut on laskettu pelin omalla kaavalla
 * (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Portugalin fokuslehden
 * rajaukseen (`osuuLehteen`). Rannikkokohteet (Ria Formosa, Arrábida,
 * Ponta da Piedade, Berlengas, Peniche) jäävät pelin karkean
 * maailmankartan PRT-renkaan ulkopuolelle 0,2–6,4 lautayksikköä: pisteet
 * ovat oikeasti maalla tai saarella, mutta rengas ei tunne niitä
 * (ankkurilukituksen asia, kuten Espanjan Finisterre).
 */

/** Portugalin hahmotelmanostot: sisällölliset kohteet kaupungin ulkopuolella. */
export const HAHMOTELMA_PRT = [
  {
    id: 'hahmotelma-peneda-geres',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-peneda-geres-4e1f3ad8.jpg',
      lyhyt: 'Garrano-villihevosia laukkaamassa graniittilohkareiden keskellä Peneda-Gerêsin vuoristossa.',
      selite: 'Tummia garrano-hevosia liikkuu kanervaisella rinteellä graniittilohkareiden lomassa, taustalla vuorijono. Garranot ovat puiston tunnettuja puolivilliä hevosia.',
      lahde: 'Valokuva: João Malho, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'João Malho',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Garranos_Parque_Nacional_da_Peneda-Ger%C3%AAs_PTCON0001.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-peneda-geres-a04c0ddf.jpg',
        lyhyt: 'Arado-vesiputous syöksyy alas graniittikallioiden välistä Gerêsin alueella.',
        selite: 'Cascata do Arado on porrasmainen vesiputous, jossa vaahtoava vesi valuu tummien kallioiden ja tiheän kasvillisuuden välistä.',
        lahde: 'Valokuva: The Cosmonaut, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'The Cosmonaut',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cascata_do_Arado_2023-03-13-2.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-peneda-geres-86e0267d.jpg',
        lyhyt: 'Caniçadan tekojärvi levittäytyy vuorten ympäröimänä Pedra Belan näköalapaikalta katsottuna.',
        selite: 'Näkymä Caniçadan tekojärvelle Pedra Belalta Gerêsissä: sininen vesi mutkittelee metsäisten ja kallioisten rinteiden välissä.',
        lahde: 'Valokuva: Razevedo172010, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Razevedo172010',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Albufeira_da_Cani%C3%A7ada,_Ger%C3%AAs.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Peneda-Gerês',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi puisto on Portugalin ainoa kansallispuisto?',
      'Mitä eläimiä puistossa elää?',
    ],
    korostukset: ['granitti|graniittimassiivista'],
    nappi: 'Graniittivuoret, joille perustetaan myöhemmin maan ainoa kansallispuisto',
    // -8.16277778 E / 41.72472222 N — en-Wikipedia "Peneda-Gerês National Park"
    laudat: {
      maailmankartta: { x: 5561.2, y: 1734.6 },
      europe: { x: 54.5, y: 796.2 },
    },
    teksti: 'Peneda-Gerês eli lyhyesti Gerês on kansallispuisto Portugalin Norte-alueella. Se '
      + 'perustettiin toukokuussa 1971, ja se on Portugalin vanhin suojelualue ja ainoa '
      + 'kansallispuisto. Puisto kattaa 695,9 neliökilometriä Viana do Castelon, Bragan ja '
      + 'Vila Realin piirikunnissa ja rajoittuu pohjoisessa espanjalaiseen Baixa Limia – '
      + 'Serra do Xurés -luonnonpuistoon; yhdessä ne muodostavat Gerês-Xurésin '
      + 'biosfäärialueen. Nimi tulee kahdesta pääasiallisesta graniittimassiivista, Serra da '
      + 'Penedasta ja Serra do Gerêsistä. Jyrkkiä laaksoja peittävät tammi- ja mäntymetsät '
      + 'ovat yksi Portugalin viimeisistä atlanttisen Euroopan kasvillisuuden tukikohdista.',
    lahde: 'en-Wikipedia "Peneda-Gerês National Park", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-ria-formosa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-ria-formosa-a05fe9c5.jpg',
      lyhyt: 'Ilha da Culatran hiekkasaari ilmasta katsottuna, taustalla laguunin saaristoa.',
      selite: 'Ilmakuva Culatran saaresta, joka on osa Ria Formosan hiekkasaarten ketjua. Kuva on otettu barra-salmen puolelta Armonan saarta kohti, ja saaren takana avautuu laguuni.',
      lahde: 'Valokuva: João Domingos, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'João Domingos',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ilha_da_Culatra_em_vista_a%C3%A9rea_da_barra_com_a_Armona.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-ria-formosa-53b8ac0f.jpg',
        lyhyt: 'Ilmakuva Ria Formosan laguunista: vuorovesikanavat haarautuvat suoalueen halki.',
        selite: 'Ilmakuva Ria Formosan laguunista Faron seudulla. Mutkittelevat vuorovesikanavat halkovat mutaisia ja suoisia rantatasankoja, taustalla avomeri.',
        lahde: 'Valokuva: Arne Müseler, Wikimedia Commons (CC BY-SA 3.0 de).',
        tekija: 'Arne Müseler',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ria_Formosa_lagoon.jpg',
        lisenssi: 'CC BY-SA 3.0 de',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/de/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-ria-formosa-7ff6b075.jpg',
        lyhyt: 'Matalan veden aikaan paljastuneita laguunin liejutasankoja Olhãon lähellä.',
        selite: 'Ria Formosa Olhãon lähellä: laguunin matalikot ja ruohoiset liejukot paljastuvat laskuveden aikaan, ja kaukana häämöttää hiekkasaari.',
        lahde: 'Valokuva: Marc Ryckaert, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Marc Ryckaert',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ria_Formosa_R07.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Ria Formosa',
    tyyppi: 'meri',
    lahi: true,
    kysymykset: [
      'Mikä on laguuni?',
      'Miksi linnut pysähtyvät täällä?',
    ],
    korostukset: ['laguuni|laguuni'],
    nappi: 'Algarven hiekkasaaret ja laguuni, jossa simpukoita ja kaloja kerätään',
    // -7.86088889 E / 36.99763889 N — en-Wikipedia "Ria Formosa"
    laudat: {
      maailmankartta: { x: 5571.3, y: 1919.4 },
      europe: { x: 60.3, y: 920.6 },
    },
    teksti: 'Ria Formosa on Algarven alueella Etelä-Portugalissa sijaitseva laguuni, jota rajaa '
      + 'hiekkasaarten järjestelmä ja joka yhdistyy mereen kuuden salmen kautta. Viisi '
      + 'salmista on luonnollisia ja liikkuvia, ja kuudes on tekoväylä, joka avattiin '
      + 'helpottamaan pääsyä Faron satamaan. Nykyisin pääsalmi on Faro–Olhão-salmi, jonka '
      + 'rakentaminen alkoi vuonna 1927 ja valmistui 1952. Osa järjestelmästä on 170 '
      + 'neliökilometrin suojelualuetta, ja alue tukee myös merenelävien kasvatusta ja Faron '
      + 'satamaa. Ria Formosa on Ramsar-alue, ja se toimii keväisin ja syksyisin '
      + 'muuttolintujen pysähdyspaikkana.',
    lahde: 'en-Wikipedia "Ria Formosa", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-arrabida',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-arrabida-6675f086.jpg',
      lyhyt: 'Arrábidan valkoinen luostari-Convento piiloutuu vehreän vuorenrinteen metsään.',
      selite: 'Arrábidan luostari (Convento da Arrábida) Setúbalin lähellä: valkoisia, punakattoisia rakennuksia terasseilla tiheän välimerellisen metsän ympäröimänä.',
      lahde: 'Valokuva: Igiul, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Igiul',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Convento_Arr%C3%A1bida.JPG',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-arrabida-be994ec7.jpg',
        lyhyt: 'Portinho da Arrábidan turkoosi lahti, vanha laituri ja rinteen taakse jäävä vuorenselänne.',
        selite: 'Portinho da Arrábida on Arrábidan luonnonpuiston rannikon pieni satamalahti. Kuvassa kirkas vesi, veneitä ankkurissa ja etualalla betoninen laituririukku.',
        lahde: 'Valokuva: Juntas, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Juntas',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Portinho_da_Arr%C3%A1bida_by_Juntas_11.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-arrabida-04ca9dc0.jpg',
        lyhyt: 'Kalliopaasi nousee hiekkarannalta Ribeiro do Cavalon rannalla.',
        selite: 'Merenkäynnin muovaama kalliomuodostelma (sea stack) Ribeiro do Cavalon rannalla: kerroksellinen kivi kohoaa hiekasta, ja aallot huuhtovat sen juurta.',
        lahde: 'Valokuva: The Cosmonaut, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'The Cosmonaut',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Praia_do_Ribeiro_do_Cavalo6.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Arrábidan vuoret',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi Arrábida on erilainen kuin muu Portugalin rannikko?',
      'Mikä Arrábidan luostari on?',
    ],
    korostukset: ['luostari|luostari'],
    nappi: 'Kalkkikivivuoret, joiden rinteillä luostari katsoo merelle',
    // -8.98916667 E / 38.48138889 N — en-Wikipedia "Arrábida Natural Park"
    laudat: {
      maailmankartta: { x: 5533.7, y: 1862.2 },
      europe: { x: 38.6, y: 881.5 },
    },
    teksti: 'Arrábidan luonnonpuisto on Portugalissa Setúbalin niemimaan eteläisimmällä reunalla, '
      + 'ja se perustettiin vuonna 1976. Puisto kattaa 176 neliökilometriä, joista 123 on '
      + 'maata ja 53 merta. Sen erikoisuus on karbonaattikivestä koostuva Serra da Arrábida '
      + '(501 metriä), joka kohtaa meren samaan tapaan kuin eräissä Välimeren paikoissa ja '
      + 'eroaa Portugalin tavallisesta rannikosta, jossa on pitkiä hiekkarantoja ja '
      + 'kallioita. Kolme puiston rantaa, Galapinhos, Portinho da Arrábida ja Figueirinha, '
      + 'ovat lissabonilaisten ja setúbalilaisten suosiossa. Rantojen yllä kohoaa '
      + '1500-luvulla perustettu entinen luostari, Convent of Our Lady of Arrábida.',
    lahde: 'en-Wikipedia "Arrábida Natural Park", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-ponta-da-piedade',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-ponta-da-piedade-e42c1ef8.jpg',
      lyhyt: 'Ponta da Piedaden kalliotorneja ja luonnonkaaria turkoosin meren keskellä.',
      selite: 'Ponta da Piedade on jyrkkä niemeke Lagosin liepeillä Algarvessa. Kuvassa hiekkakiven muovaamia kalliotorneja ja luonnonkaaria, joiden välissä veneet liikkuvat kirkkaassa vedessä.',
      lahde: 'Valokuva: Dronepicr, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Dronepicr',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ponta_da_Piedade_Algarve_Portugal.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-ponta-da-piedade-30399bba.jpg',
        lyhyt: 'Ilmakuva Ponta da Piedaden niemekkeestä, majakasta ja rannikon kallioista.',
        selite: 'Ilmakuva Ponta da Piedadesta Lagosissa: majakka ja rakennukset niemen kärjessä, rosoiset kalliot laskevat jyrkästi mereen ja vene jättää jälkeensä vaahtoavan vanan.',
        lahde: 'Valokuva: Arne Müseler, Wikimedia Commons (CC BY-SA 3.0 de).',
        tekija: 'Arne Müseler',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ponta_da_Piedade_aerial_view.jpg',
        lisenssi: 'CC BY-SA 3.0 de',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/de/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-ponta-da-piedade-d986fc10.jpg',
        lyhyt: 'Merestä katsottuna kalliokaari ja luolat Ponta da Piedaden rannikolla.',
        selite: 'Luola- ja kaarimuodostelmia Ponta da Piedaden lähellä Algarvessa: aallot ovat kuluttaneet pehmeään kalliohiekkakiveen kaaria ja koloja, jotka avautuvat suoraan merelle.',
        lahde: 'Valokuva: Felix König, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Felix König',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ponta_da_Piedade_cave.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Ponta da Piedade',
    tyyppi: 'meri',
    lahi: true,
    kysymykset: [
      'Mitä Ponta da Piedade tarkoittaa?',
      'Miten luolissa vieraillaan?',
    ],
    korostukset: ['majakka|majakka'],
    nappi: 'Kultaiset kalliot Lagosin edustalla, joille rakennetaan myöhemmin majakka',
    // -8.67 E / 37.081 N — en-Wikipedia "Ponta da Piedade"
    laudat: {
      maailmankartta: { x: 5544.3, y: 1916.2 },
      europe: { x: 44.7, y: 918.4 },
    },
    teksti: 'Ponta da Piedade, portugalin kielellä armon niemi, on niemeke ja joukko kallioita '
      + 'Lagosin kaupungin rannikolla Algarven alueella. Keltakultaiset kalliomuodostelmat '
      + 'ovat jopa 20 metriä korkeita, ja ne ovat yksi Portugalin tunnetuimmista '
      + 'matkailukohteista. Useissa niemen luolissa voi vierailla veneellä. Paikalla on myös '
      + 'majakka, joka on vuodelta 1913.',
    lahde: 'en-Wikipedia "Ponta da Piedade", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-berlengas',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-berlengas-89257797.jpg',
      lyhyt: 'Forte de São João Baptista seisoo kalliokareella Berlenga-saarella keskellä turkoosia merta.',
      selite: 'São João Baptistan linnake Berlenga Grande -saarella on rakennettu meren ympäröimälle kallioniemelle, jonne johtaa kapea kivinen kulkuväylä. Etualalla lokkeja ja alhaalla lahdessa veneitä.',
      lahde: 'Valokuva: Vitor Oliveira from Torres Vedras, PORTUGAL, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Vitor Oliveira from Torres Vedras, PORTUGAL',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Forte_de_S%C3%A3o_Jo%C3%A3o_Baptista_-_Ilha_da_Berlenga_-_Portugal_(3838523606).jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-berlengas-fef95e23.jpg',
        lyhyt: 'Kapea merisola kohoaa Berlenga Granden jyrkkien punertavien kallioseinien välissä.',
        selite: 'Berlenga Granden rosoista rannikkoa merelta katsottuna: kaksi jäkäläistä kallioseinämää puristaa väliinsä kapean meriväylän ja taustalla kohoaa ruohoinen rinne.',
        lahde: 'Valokuva: Alexkom000, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Alexkom000',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2026-06-21_Berlenga_Grande_01.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0/',
      },
    ],
    nimi: 'Berlengasin saaret',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Ketkä munkit asuivat Berlengalla?',
      'Miksi saaria kutsuttiin Burlingeiksi?',
    ],
    korostukset: ['Berlenga Grande|Berlenga Grande'],
    nappi: 'Atlantin saaret, joilta munkit auttoivat haaksirikkoisia',
    // -9.53 E / 39.45 N — en-Wikipedia "Berlengas"
    laudat: {
      maailmankartta: { x: 5515.7, y: 1824.5 },
      europe: { x: 28.2, y: 856.1 },
    },
    teksti: 'Berlengas on Portugalin pieni Atlantin saaristo, joka sijaitsee 10–17 kilometrin '
      + 'päässä Penichen rannikolta Oeste-alueella. Britannian merimiehet kutsuivat saaria '
      + 'perinteisesti nimellä "the Burlings". Ainoa asuttu saari on suurin, Berlenga Grande, '
      + 'vaikka pysyvää asutusta saaristossa ei nykyisin ole. Muut saaret ovat kahden '
      + 'pikkusaariryhmän, Estelasin ja Farilhões-Forcadosin, saaria. Vuonna 1513 kuningatar '
      + 'Eleonora Viseulaisen tuella Pyhän Hieronymuksen munkit perustivat saarelle yhteisön '
      + 'auttamaan merenkulkua ja usein haaksirikkoon joutuneita, mutta munkit joutuivat '
      + 'lähtemään 1500-luvulla tautien, tarvikepulan ja huonon yhteyden vuoksi.',
    lahde: 'en-Wikipedia "Berlengas", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-sabugal',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-sabugal-5de0a782.jpg',
      lyhyt: 'Sabugalin linnan muurit, sisäpiha ja korkea graniittitorni kirkkaan sinistä taivasta vasten.',
      selite: 'Sabugalin linnan (Castle of Sabugal) sisäpiha: liuske- ja graniittikivestä muurattuja muureja, portaita, hammasmuureja ja kulmatorni sekä oikealla kohoava suuri torni.',
      lahde: 'Valokuva: Alvesgaspar, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Alvesgaspar',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sabugal_July_2016-1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-sabugal-d141cc03.jpg',
        lyhyt: 'Sabugalin linnan tornin yläosa ja ulkonevat kivikonsolit alhaalta katsottuna.',
        selite: 'Lähikuva Sabugalin linnan tornin yläosasta: hakatusta graniitista tehdyt kulmat ja ulkonevat kivikonsolit ohjaavat katseen ylös taivasta kohti.',
        lahde: 'Valokuva: Pedro Dias, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Pedro Dias',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Torre_que_aponta_para_o_c%C3%A9u.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0/',
      },
    ],
    nimi: 'Sabugalin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä Sabugalin taistelussa tapahtui?',
      'Miksi linnassa on viisikulmainen muuri?',
    ],
    korostukset: ['Wellington|Wellingtonin'],
    nappi: 'Goottilainen linna Côa-joen yllä, jonka luona britit voittivat 1811',
    // -7.08333333 E / 40.35 N — en-Wikipedia "Sabugal"
    laudat: {
      maailmankartta: { x: 5597.2, y: 1789.1 },
      europe: { x: 75.2, y: 832.4 },
    },
    teksti: 'Sabugal on Guardan piirikunnan kaupunki ja kunta Espanjan rajalla Côa-joen varrella; '
      + 'itse kaupungissa on noin 3 000 asukasta. Noin 750 metrin korkeudessa se on yksi '
      + 'Portugalin korkeimmalla sijaitsevista kaupungeista. Sabugal on kuuluisa '
      + 'gotiikkatyylisestä linnastaan, jossa on viisikulmainen ulkomuuri ja sisämuuri, jossa '
      + 'on viisi nelikulmaista tornia Côa-joen yllä. Vuonna 1811 kaupungin luona käytiin '
      + 'Sabugalin taistelu niemimaasodassa: Arthur Wellesleyn, myöhemmän Wellingtonin '
      + 'herttuan, johtamat britit ja portugalilaiset voittivat marsalkka Massénan '
      + 'ranskalaiset. Kaupungilla on myös juutalaista perintöä vähintään 1500-luvulta '
      + 'lähtien.',
    lahde: 'en-Wikipedia "Sabugal", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-vila-nova-de-cerveira',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-vila-nova-de-cerveira-8ece885a.jpg',
      lyhyt: 'Ilmakuva Vila Nova de Cerveiran kivisistä kaupunginmuureista ja punakattoisista taloista.',
      selite: 'Ylhäältä otetussa kuvassa näkyvät kaupungin vanhat kivimuurit ja kulmatorni sekä ympäröivien talojen tiilikatot.',
      lahde: 'Valokuva: Joseolgon, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Joseolgon',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_photograph_of_Vila_Nova_de_Cerveira_(3).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-vila-nova-de-cerveira-8424e62c.jpg',
        lyhyt: 'Minho-joki ja Vila Nova de Cerveiran venesatama.',
        selite: 'Kuvassa leveä Minho-joki, kaupungin venelaituri ja kaukana silta, joka yhdistää Portugalin ja Galician.',
        lahde: 'Valokuva: Iago Pillado, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Iago Pillado',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Minho_River_and_port_of_Vila_Nova_de_Cerveira,_Portugal.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Vila Nova de Cerveira',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mistä kaupungin nimi tulee?',
      'Mikä nykytaiteen biennaali on?',
    ],
    korostukset: ['biennaali|biennaali'],
    nappi: 'Minhon rajakaupunki, jonka kuningas Dinis perusti 1321',
    // -8.68333333 E / 41.96666667 N — en-Wikipedia "Vila Nova de Cerveira"
    laudat: {
      maailmankartta: { x: 5543.9, y: 1724.9 },
      europe: { x: 44.5, y: 789.9 },
    },
    teksti: 'Vila Nova de Cerveira on kunta Viana do Castelon piirikunnassa Pohjois-Portugalissa '
      + 'Minho-joen vasemmalla rannalla, joka muodostaa Espanjan rajan. Kuningas Dinis '
      + 'perusti kaupungin 1. lokakuuta 1321 ja määräsi rakennettavaksi linnan, joka yhä '
      + 'hallitsee kaupungin keskustaa. Linna on 1300-luvulta ja seisoo pienellä kukkulalla '
      + 'Minhon vieressä, ja siitä näkee kaupunkiin ja Galician yli menevät kulkureitit. '
      + 'Nimestä kertoo legenda, jonka mukaan hirvi valittiin jumalten tahdosta kuninkaaksi '
      + 'ja seutu sai nimen Terras de Cervaria, hirvien maa. Nykyisin kaupunki on tunnettu '
      + 'kansainvälisestä taidebiennaalista, joka on järjestetty siellä vuodesta 1978.',
    lahde: 'en-Wikipedia "Vila Nova de Cerveira", johdanto-osa ja osio "General information" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-monsanto',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-monsanto-94811db2.jpg',
      lyhyt: 'Valtava pyöreä graniittilohkare kohoaa kivitalojen yllä Monsanton kylässä.',
      selite: 'Kuvassa graniittitalo ja sen päällä lepäävä iso lohkare Monsanton kylässä; ympärillä kivitaloja punatiilikattoineen.',
      lahde: 'Valokuva: Alvesgaspar, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Alvesgaspar',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Monsanto_April_2015-13.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-monsanto-6942303c.jpg',
        lyhyt: 'Monsanton linnan kivimuurit ja torni lohkareiden keskellä.',
        selite: 'Linnan kivimuuri ja nelikulmainen torni nousevat kylän yläpuolella luonnon graniittilohkareiden lomassa.',
        lahde: 'Valokuva: Nmmacedo, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Nmmacedo',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castelo_de_Monsanto.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Monsanto',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Monsantoa kutsutaan portugalilaisimmaksi kyläksi?',
      'Mitä linnalle tapahtui?',
    ],
    korostukset: ['temppeliritarikunta|temppeliritarikunnalle'],
    nappi: 'Vuoren kylä, jota kutsutaan myöhemmin maan portugalilaisimmaksi',
    // -7.114 E / 40.039 N — en-Wikipedia "Monsanto (Idanha-a-Nova)"
    laudat: {
      maailmankartta: { x: 5596.2, y: 1801.4 },
      europe: { x: 74.6, y: 840.6 },
    },
    teksti: 'Monsanto on kylä Idanha-a-Novan kunnassa Castelo Brancon piirikunnassa. Vuonna 2011 '
      + 'kylässä asui 828 ihmistä, ja siitä tuli myöhemmin tunnettu "Portugalin '
      + 'portugalilaisimpana kylänä", kun hallituksen vuonna 1938 järjestämä kilpailu '
      + 'palkitsi kaksitoista historiallista kylää tällä arvonimellä omassa maakunnassaan. '
      + 'Kylä oli kunnan pääkaupunki vuodesta 1174 1800-luvun alkuun, ja se kohoaa jyrkästi '
      + '758 metrin korkeuteen merenpinnasta. Kuningas Afonso I valtasi Monsanton maureilta '
      + '1100-luvulla ja antoi sen temppeliritarikunnalle ja myöhemmin Santiagon '
      + 'ritarikunnalle. Keskiaikainen linna tuhoutui 1800-luvulla räjähdyksen seurauksena.',
    lahde: 'en-Wikipedia "Monsanto (Idanha-a-Nova)", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-marvao',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-marvao-03c188b7.jpg',
      lyhyt: 'Marvãon linna kohoaa kalliolla puutarhan yläpuolella.',
      selite: 'Kuvassa Marvãon kivilinna torneineen kallioisella harjanteella, edustalla siististi leikattu puutarha.',
      lahde: 'Valokuva: Elemaki, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Elemaki',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:CastillodeMarvao.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-marvao-e91ac0e8.jpg',
        lyhyt: 'Marvãon linnan ulkomuuri ja vahtitorneja jyrkänteen reunalla, alla avara tasanko.',
        selite: 'Linnan ulkomuurin kulmassa on pieniä vahtitorneja (bartizan), ja muurin takana avautuu laaja maisema alaspäin.',
        lahde: 'Valokuva: Jules Verne Times Two, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jules Verne Times Two',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Marvão_Castle_outer_wall,_Marvão,_Portugal_julesvernex2.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-marvao-f43c14ff.jpg',
        lyhyt: 'Valkoiseksi kalkittu katu Marvãon vuoristokylässä.',
        selite: 'Kivetty kuja kulkee valkoisten talojen ja punatiilikattojen välissä Marvãon kukkulakylässä.',
        lahde: 'Valokuva: Jocelyn Erskine-Kellie from London, UK, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Jocelyn Erskine-Kellie from London, UK',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Clean_and_White_(36925941561).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Marvão',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka Ibn Marwan oli?',
      'Miksi Marvãosta näkee niin kauas?',
    ],
    korostukset: ['Ibn Marwan|Ibn Marwan'],
    nappi: 'Kvartsiittikallion linnoituskylä Espanjan rajalla',
    // -7.37666667 E / 39.39416667 N — en-Wikipedia "Marvão"
    laudat: {
      maailmankartta: { x: 5587.4, y: 1826.6 },
      europe: { x: 69.6, y: 857.5 },
    },
    teksti: 'Marvão, viralliselta nimeltään Erittäin jalo ja alati uskollinen kaupunki Marvão, on '
      + 'kunta Portalegren piirikunnassa Portugalissa. Se sijaitsee Serra de São Mamedessa '
      + 'kvartsiittikallion päällä, ja sen nimi juontuu 700-luvun muwalladikapinallisesta Ibn '
      + 'Marwanista. Hän rakennutti Marvãon linnan, luultavasti aiemman roomalaisen '
      + 'vartiotornin paikalle, valtansa tukikohdaksi perustaessaan itsenäistä emiraattia '
      + 'Córdoban emiraatin aikana. Linnaa ja muurien ympäröimää kylää vahvistettiin '
      + 'vuosisatojen kuluessa, erityisesti 1200-luvulla Sancho II:n ja myöhemmin Dinisin '
      + 'aikana. Nobel-kirjailija José Saramago kirjoitti kylästä, että Marvãosta näkee koko '
      + 'maan.',
    lahde: 'en-Wikipedia "Marvão", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-mertola',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-mertola-49b6901f.jpg',
      lyhyt: 'Mértolan valkoinen kaupunki, kaupunginmuuri ja linna Guadianan vastarannalta nähtynä.',
      selite: 'Kuva on otettu Guadiana-joen toiselta rannalta: etualalla joki, sen takana kaupunginmuuri, valkoiset talot, kirkko ja linnan torni kukkulalla.',
      lahde: 'Valokuva: Alexey Komarov, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Alexey Komarov',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mértola,_Portugal_2019-11-10-2.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-mertola-999cb8ad.jpg',
        lyhyt: 'Mértolan linnan torni ja valkoinen pääkirkko kaupungin yllä.',
        selite: 'Kukkulan huipulla kohoavat linnan muurit ja nelikulmainen torni, vieressä valkoinen Nossa Senhora da Anunciação -kirkko, joka on entinen moskeija.',
        lahde: 'Valokuva: Cardilio, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Cardilio',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:IMGP4346_-_Mértola_e_o_seu_castelo.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Mértola',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Mértola oli tärkeä satama?',
      'Miksi moskeija on säilynyt?',
    ],
    korostukset: ['moskeija|moskeija'],
    nappi: 'Guadianan jokisatama, jonka moskeijasta on tullut kirkko',
    // -7.66111111 E / 37.64027778 N — en-Wikipedia "Mértola"
    laudat: {
      maailmankartta: { x: 5578, y: 1894.7 },
      europe: { x: 64.1, y: 903.7 },
    },
    teksti: 'Mértola on kaupunki ja kunta Kaakkois-Alentejossa lähellä Espanjan rajaa, noin 2 500 '
      + 'asukkaan kaupunki kukkulalla Guadiana-joen yllä. Sen strateginen sijainti teki siitä '
      + 'tärkeän jokisataman antiikissa ja Umayyad-valloituksen aikoihin, ja kaupungin '
      + 'pääkirkko, Nossa Senhora da Anunciação, on ainoa keskiaikainen moskeija, joka on '
      + 'säilynyt Portugalissa. Rautakaudelta lähtien paikalla oli asutusta, ja roomalaiset '
      + 'nimesivät sen Myrtilis Iuliaksi. Joen pohjoisin purjehduskelpoinen kohta antoi '
      + 'paikalle kauppa-aseman: läheisiltä mailta saadut hopea, kulta ja tina kulkivat '
      + 'Guadianaa pitkin sen satamasta.',
    lahde: 'en-Wikipedia "Mértola", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-foz-coa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-foz-coa-958ab81e.jpg',
      lyhyt: 'Kallioon kaiverrettu esihistoriallinen härkä Côa-laakson Penascosan kalliopiirroksissa.',
      selite: 'Lähikuva Penascosan kalliopinnasta, johon on uurrettu ohuita viivoja härän hahmoksi. Côa-laakson piirrokset kuuluvat Unescon maailmanperintöön.',
      lahde: 'Valokuva: Reino Baptista, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Reino Baptista',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Prehistoric_Rock-Art_Site_of_the_Côa_Valley_-_Penascosa_-_Bull_@_2011-08-06.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-foz-coa-9667d143.jpg',
        lyhyt: 'Côa-laakso ja joki jyrkkien, terassoitujen rinteiden välissä.',
        selite: 'Ilmakuvamainen näkymä Côa-laaksoon: joki mutkittelee kuivien rinteiden välissä, ja rinteillä näkyy viljelyterasseja ja tie.',
        lahde: 'Valokuva: Joana Mafalda Gomes, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Joana Mafalda Gomes',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vale_do_Côa_Joana_Mafalda_Gomes.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-foz-coa-ef3cd11d.jpg',
        lyhyt: 'Museu do Côan näyttelytila, jossa suuri näyttö esittelee kalliopiirroksia.',
        selite: 'Museon pimeässä näyttelysalissa seinänäytöille on koottu maailmankartta ja kalliopiirrosten hahmoja, kuten eläinkuvia.',
        lahde: 'Valokuva: Joseolgon, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Joseolgon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Museu_do_Côa_(9).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Côa-laakson kalliopiirrokset',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi padon rakentaminen keskeytettiin?',
      'Mitä kalliopiirrokset esittävät?',
    ],
    korostukset: ['kalliopiirrokset|kalliopiirroksia'],
    nappi: 'Joen laakso, jonka kalliopiirroksia ei vielä tunneta',
    // -7.14 E / 41.08 N — en-Wikipedia "Vila Nova de Foz Côa"
    laudat: {
      maailmankartta: { x: 5595.3, y: 1760.2 },
      europe: { x: 74.1, y: 813.2 },
    },
    teksti: 'Côa-laakson esihistoriallinen kalliotaidealue on ulkoilmassa sijaitseva '
      + 'paleoliittinen arkeologinen kohde Koillis-Portugalissa lähellä Espanjan rajaa. '
      + '1990-luvun alussa Vila Nova de Foz Côassa löydettiin padon rakennustöiden aikana '
      + 'kalliopiirroksia, joita on tuhansia: hevosia, nautoja ja muita eläimiä sekä ihmis- '
      + 'ja abstrakteja hahmoja, ajoitettuina vuosille 22 000–10 000 eaa. Yleisön tuki '
      + 'kalliopiirrosten suojelulle kasvoi Portugalissa ja kansainvälisesti, ja vuoden 1995 '
      + 'vaalien jälkeen uusi hallitus perui padon rakennushankkeen. Vuodesta 1995 arkeologit '
      + 'ovat tutkineet ja luetteloineet aluetta, ja sen ympärille on perustettu arkeologinen '
      + 'puisto ja Côa-museo.',
    lahde: 'en-Wikipedia "Prehistoric Rock Art Sites in the Côa Valley and Siega Verde", '
      + 'johdanto-osa ja osio "Côa Valley"; koordinaatti en-Wikipedia "Vila Nova de Foz Côa" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-castelo-rodrigo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-castelo-rodrigo-6f131301.jpg',
      lyhyt: 'Castelo Rodrigon punakattoinen muurien ympäröimä kylä kukkulan päällä avaran maiseman keskellä.',
      selite: 'Ylhäältä otetussa kuvassa kylä ja linnan rauniot kohoavat kukkulan laella, ja taustalla avautuu laaja tasanko Espanjan rajan suuntaan.',
      lahde: 'Valokuva: Armando Ferreira, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Armando Ferreira',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:71117_-_Castelo_e_muralhas_de_Castelo_Rodrigo.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-castelo-rodrigo-78245873.jpg',
        lyhyt: 'Castelo Rodrigon linnan kivimuuri kohoaa graniittikallioiden yllä.',
        selite: 'Linnan raunioitunut kivimuuri ikkuna-aukkoineen nojaa kallioon, ja oikealla näkyy avara maalaismaisema.',
        lahde: 'Valokuva: Hugo Ferreira, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Hugo Ferreira',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castelo_Rodrigo13.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Castelo Rodrigo',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka Rodrigo oli?',
      'Mikä Alcañicesin sopimus oli?',
    ],
    korostukset: ['Alcañicesin sopimuksella|Alcañicesin sopimuksella'],
    nappi: 'Rajalinna, joka liitettiin Portugaliin 1297',
    // -6.964265 E / 40.877374 N — en-Wikipedia "Castle of Castelo Rodrigo"
    laudat: {
      maailmankartta: { x: 5601.2, y: 1768.3 },
      europe: { x: 77.5, y: 818.5 },
    },
    teksti: 'Castelo Rodrigon linna on keskiaikainen linna Castelo Rodrigon seurakunnassa '
      + 'Figueira de Castelo Rodrigon kunnassa Guardan piirikunnassa. Legendojen mukaan linna '
      + 'perustettiin 500-luvulla. Kun León kuningas Alfonso IX valloitti kylän '
      + '1000–1100-lukujen vaihteessa, hän määräsi rakennettavaksi linnan ja vahvistamaan '
      + 'puolustuslinjaa. Sekä kylä että linna ovat saaneet nimensä kreivi Rodrigo Gonzalez '
      + 'de Girónin mukaan, joka vastasi linnan puolustuksesta. Castelo Rodrigo liitettiin '
      + 'Portugalin kuningaskuntaan 1297 Alcañicesin sopimuksella. Kuningas Dinis rakennutti '
      + '1300-luvulla linnan ja muurin uudelleen, ja mukaan tulivat 13 tornia, päätorni, '
      + 'esimuuri ja vallihaudat.',
    lahde: 'en-Wikipedia "Castle of Castelo Rodrigo", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-castelo-de-vide',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-castelo-de-vide-5efa4a43.jpg',
      lyhyt: 'Castelo de Viden valkoiset talot kukkulalla, etualalla kivinen muuri ja taustalla Alentejon maisema.',
      selite: 'Näkymä Castelo de Viden vanhan kaupungin katoille ja Santo Amaron kirkolle. Kuvassa etualalla on kivinen muuri ja taustalla Alentejon kukkulamaisemaa.',
      lahde: 'Valokuva: GFreihalter, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'GFreihalter',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castelo_de_Vide_924.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-castelo-de-vide-a7a7bcfa.jpg',
        lyhyt: 'Kukkien reunustama mukulakivikuja Castelo de Viden juutalaiskorttelissa.',
        selite: 'Kapea mukulakivikatu Castelo de Viden juutalaiskorttelissa (judiaria), jossa on valkoisia taloja ja kaarimainen kiviovi. Kuva on otettu Wiki Loves Monuments -kilpailuun.',
        lahde: 'Valokuva: Concierge.2C, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Concierge.2C',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Judiaria_de_Castelo_de_Vide_(3).jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Castelo de Vide',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mikä on marraani?',
      'Miksi kylä oli tärkeä rajalinnoitus?',
    ],
    korostukset: ['synagoga|synagoga'],
    nappi: 'Muurien ympäröimä rajakylä ja sen 1300-luvun synagoga',
    // -7.51666667 E / 39.33333333 N — en-Wikipedia "Castelo de Vide"
    laudat: {
      maailmankartta: { x: 5582.8, y: 1829 },
      europe: { x: 66.9, y: 859.1 },
    },
    teksti: 'Castelo de Vide on Portugalin kunta, jossa asui vuonna 2011 3 407 ihmistä. Siitä on '
      + 'merkkejä asutuksesta jo neoliittiselta ajalta, ja seudulla on useita megaliittisia '
      + 'kohteita. Linnoituksen rakentaminen vakiinnutti uuden väestön alueelle ja toimi '
      + 'samalla strategisena rajalinnoituksena. Castelo de Videstä tuli oma kuntansa vuonna '
      + '1276, ennen sitä se kuului Marvãolle. Kuningas Dinis ja hänen veljensä jatkoivat '
      + 'linnoituksen muurien rakentamista 1300-luvulla. Asiakirjat todistavat kaupungin '
      + 'juutalaisyhteisön ja -korttelin olemassaolosta 1300- ja 1400-luvuilla, ja 1300-luvun '
      + 'synagoga seisoo yhä. Vaikka juutalaiset karkotettiin Portugalista 1496, marraanit '
      + 'käyttivät sitä pyhäkkönä ja koulunaan 1500-luvulle asti.',
    lahde: 'en-Wikipedia "Castelo de Vide", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-belmonte',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-belmonte-af755043.jpg',
      lyhyt: 'Belmonten linnan graniittinen päätorni ja valkoinen palatsirakennus kivisellä kukkulalla.',
      selite: 'Belmonten linna Portugalissa, kuvattuna päätornin (torre de menagem) suunnasta. Linna oli Cabralin suvun läänityksen keskus, ja sen viereen on rakennettu valkoinen, ikkunaparvekkein koristeltu palatsirakennus.',
      lahde: 'Valokuva: Carlos Vieira Romão, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Carlos Vieira Romão',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castelo_de_Belmonte-.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-belmonte-2a86008a.jpg',
        lyhyt: 'Pedro Álvares Cabralin pronssinen patsas ristin kanssa Belmontessa.',
        selite: 'Navigaattori Pedro Álvares Cabralin patsas Belmontessa, hänen kotikaupungissaan. Patsaan jalustassa lukee hänen nimensä, ja puistoa ympäröivät liput ja kukkaistutukset.',
        lahde: 'Valokuva: Nmmacedo, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Nmmacedo',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Estátua_de_Pedro_Álvares_Cabral.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Belmonte',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka Pedro Álvares Cabral oli?',
      'Mitä kryptojuutalaisuus tarkoittaa?',
    ],
    korostukset: ['Pedro Álvares Cabral|Pedro Álvares Cabral'],
    nappi: 'Cabralin suvun linna, jossa Brasilian löytäjä vietti lapsuutensa',
    // -7.35 E / 40.35 N — en-Wikipedia "Belmonte, Portugal"
    laudat: {
      maailmankartta: { x: 5588.3, y: 1789.1 },
      europe: { x: 70.1, y: 832.4 },
    },
    teksti: 'Belmonte on kaupunki ja kunta Castelo Brancon piirikunnassa Portugalissa. Se on '
      + 'tunnettu pysyvästä juutalaisyhteisöstään, joka on olemassa ainakin 1200-luvulta '
      + 'alkaen ja säilytti uskonsa kryptojuutalaisuudessa, salaa ylläpitäen juutalaisia '
      + 'perinteitä inkvisition ja pakkokäännytysten paineen alla. Avoin uskonnonharjoitus '
      + 'palautettiin synagogan perustamisella vuonna 1996. Cabralin suvulla oli keskeinen '
      + 'asema Belmonten historiassa 1200-luvulta alkaen. Vuonna 1466 kuningas Afonso V antoi '
      + 'Fernão Cabralille perinnöllisen alcaide-mor-arvonimen, ja Fernão muutti linnan '
      + 'linnoitetuksi kartanoksi, jossa hänen poikansa Pedro Álvares Cabral vietti '
      + 'varhaisvuotensa.',
    lahde: 'en-Wikipedia "Belmonte, Portugal", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-monsaraz',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-monsaraz-bf494255.jpg',
      lyhyt: 'Monsarazin linnan kiviset tornit ja muurikäytävä, taustalla Alqueva-järven maisema.',
      selite: 'Monsarazin linnan muureja ja torneja kukkulan laella. Taustalla avautuu näkymä Alqueva-tekojärven suuntaan.',
      lahde: 'Valokuva: Herbert wie, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Herbert wie',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castelo_de_Monsaraz_Panorama_Mosaraz_Portugal.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-monsaraz-a21c7c39.jpg',
        lyhyt: 'Kapea mukulakivikatu valkoisten talojen välissä Monsarazin kukkulakylässä.',
        selite: 'Tyypillinen katu Monsarazissa, Alentejon kukkulakylässä. Valkoiset talot ja kivetty katu ovat kylän tunnusomainen ilme.',
        lahde: 'Valokuva: José Luis Filpo Cabana, Wikimedia Commons (CC BY 3.0).',
        tekija: 'José Luis Filpo Cabana',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Calle_de_Monsaraz.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Monsaraz',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Keitä temppeliritarit olivat?',
      'Mikä Alqueva on?',
    ],
    korostukset: ['megaliittisia|megaliittisia'],
    nappi: 'Kukkulakylä Guadianan rannalla, jonka temppeliritarit valtasivat',
    // -7.381 E / 38.444 N — en-Wikipedia "Monsaraz"
    laudat: {
      maailmankartta: { x: 5587.3, y: 1863.6 },
      europe: { x: 69.5, y: 882.5 },
    },
    teksti: 'Monsaraz on Reguengos de Monsarazin kunnan seurakunta Guadiana-joen oikealla '
      + 'rannalla Alentejossa lähellä Espanjan rajaa, ja siellä asui vuonna 2011 782 ihmistä. '
      + 'Se on yksi Etelä-Portugalin vanhimmista asutuksista, ja sen alueella on satoja '
      + 'megaliittisia monumentteja. Kukkulalla, jolla kylä nykyisin on, oli '
      + 'esihistoriallinen linnoitettu asutus. Roomalaisten jälkeen alueen valtasivat '
      + 'visigootit, arabit, mozarabit ja juutalaiset, ja Reconquistan jälkeen kristityt '
      + 'Afonso Henriquesin seuraajat. Vuonna 1167 Geraldo Sem Pavor otti linnan ja '
      + 'kaupungin, mutta muslimit valtasivat sen uudelleen, ja vuonna 1232 kuningas Sancho '
      + 'II otti sen lopullisesti takaisin temppeliritarien tuella.',
    lahde: 'en-Wikipedia "Monsaraz", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-ponte-de-lima',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-ponte-de-lima-b420f0f0.jpg',
      lyhyt: 'Ponte de Liman monikaarinen kiviholvisilta heijastuu Lima-joen tyyneen veteen.',
      selite: 'Lima-joen ylittävä silta antaa nimen Ponte de Liman kaupungille, jota kutsutaan Portugalin vanhimmaksi kyläksi. Taustalla näkyy kirkon torni ja Minhon vihreitä kukkuloita.',
      lahde: 'Valokuva: Alejandro Piñero Amerio, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Alejandro Piñero Amerio',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ponte_de_Lima_Bridge.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-ponte-de-lima-3d929783.jpg',
        lyhyt: 'Historiallinen kaarisilta Lima-joen yli ja vihreä kukkulamaisema Ponte de Liman takana.',
        selite: 'Ponte de Liman historiallinen silta ja Lima-joki kuvattuna kauempaa. Taustalla kohoavat metsäiset vuoret ja pieniä asutuskeskittymiä.',
        lahde: 'Valokuva: Lluvizna, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Lluvizna',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:PonteDeLima_04.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ponte de Lima',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Mikä on Vinho Verde?',
      'Mikä Camino de Santiago on?',
    ],
    korostukset: ['Vinho Verde|Vinho Verde'],
    nappi: 'Portugalin vanhin vila, jossa keskiaikainen silta ylittää Liman',
    // -8.56666667 E / 41.76666667 N — en-Wikipedia "Ponte de Lima"
    laudat: {
      maailmankartta: { x: 5547.8, y: 1732.9 },
      europe: { x: 46.7, y: 795.1 },
    },
    teksti: 'Ponte de Lima on Portugalin vanhin vila eli kaupunkioikeuksilla varustettu kunnan '
      + 'keskus, ja se sijaitsee Viana do Castelon piirikunnassa Lima-joen eteläisellä '
      + 'rannalla. Se on saanut nimensä keskiaikaisesta sillasta, joka ylittää joen. '
      + 'Kaupungissa itsessään asuu noin 2 800 ihmistä. Roomalaisaikana paikka nousi '
      + 'merkittäväksi sijaintinsa vuoksi Antoninuksen matkakirjan Via XIX:n varrella, joka '
      + 'yhdisti Bragan Santiago de Compostelaan ja joka osittain vastaa Camino de Santiagon '
      + 'pyhiinvaellusreittiä. Ympäröivällä maaseudulla on Portugalin suurin '
      + 'barokkikartanoiden keskittymä, ja Ponte de Lima tunnetaan koko maassa punaisesta '
      + 'Vinho Verde -viinistään ja sarrabulho-riisistään.',
    lahde: 'en-Wikipedia "Ponte de Lima", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-vila-vicosa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-vila-vicosa-0daae84b.jpg',
      lyhyt: 'Vila Viçosan Paço Ducalin päätyjulkisivu, jonka seinät on verhoiltu alueen marmorilla.',
      selite: 'Vila Viçosan herttuapalatsin (Paço Ducal) pääjulkisivu. Kuvauksen mukaan ulkoseinät on päällystetty seudulta louhitulla marmorilla.',
      lahde: 'Valokuva: Alvesgaspar, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Alvesgaspar',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vila_Viçosa_September_2013-10a.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-vila-vicosa-27f9329b.jpg',
        lyhyt: 'Vila Viçosan linnan kaarevalla portilla varustettu kivimuuri ja tornit.',
        selite: 'Yksityiskohta Vila Viçosan linnasta: kaariportti kahden linnan muurin ja tornin välissä sekä mukulakivetty tie portin edessä.',
        lahde: 'Valokuva: Alvesgaspar, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Alvesgaspar',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vila_Viçosa_September_2013-35.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-vila-vicosa-24b85fa5.jpg',
        lyhyt: 'Vila Viçosan herttuapalatsin pitkä marmoripintainen julkisivu ja laaja kivetty aukio.',
        selite: 'Vila Viçosan herttuapalatsi (Paço Ducal) kokonaisuutena, edessään laaja kivetty palatsin aukio.',
        lahde: 'Valokuva: Alvesgaspar, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Alvesgaspar',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vila_Viçosa_April_2011-5.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Vila Viçosa',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Keitä Braganzan herttuat olivat?',
      'Mikä Vila Viçosan marmori on?',
    ],
    korostukset: ['Braganzan|Braganzan'],
    nappi: 'Braganzan herttuoiden entinen palatsikylä',
    // -7.41805556 E / 38.77638889 N — en-Wikipedia "Vila Viçosa"
    laudat: {
      maailmankartta: { x: 5586.1, y: 1850.7 },
      europe: { x: 68.8, y: 873.8 },
    },
    teksti: 'Vila Viçosa on kaupunki ja kunta Évoran piirikunnassa Alentejossa, ja vuonna 2011 '
      + 'siellä asui 8 319 ihmistä. Mauriherruus päättyi vuonna 1217, kun Avizin ritarikunta '
      + 'valtasi alueen kristityille, ja kuningas Afonso III antoi kylälle oikeudet vuonna '
      + '1270. 1300-luvun alussa kuningas Dinis rakennutti kylään linnan suojaamaan '
      + 'kastilialaisten hyökkäyksiltä. Vuonna 1461 kylästä tuli Braganzan suvun, yhden '
      + 'Portugalin tärkeimmistä aatelissuvuista, omaisuutta, ja siitä kehittyi herttuoiden '
      + 'päätukikohta. Vuonna 1502 aloitettiin Vila Viçosan herttuan palatsin rakentaminen '
      + 'neljännen herttuan Jaimen tilauksesta, ja palatsia uudistettiin 1500- ja '
      + '1600-luvuilla.',
    lahde: 'en-Wikipedia "Vila Viçosa", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-tavira',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-tavira-9bd08013.jpg',
      lyhyt: 'Taviran vanha kaarisilta Gilão-joen yli, kaupungin talot sillan takana.',
      selite: 'Gilão-joen ylittävä vanha silta (Ponte Romana) Tavirassa, Algarvessa. Sillan kaaret ja valkoiset pilarit heijastuvat joen tyyneen pintaan.',
      lahde: 'Valokuva: Alexkom000, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Alexkom000',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2025-08-30_Ponte_antiga_sobre_o_Rio_Gilão,_Tavira.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-tavira-55e24ddc.jpg',
        lyhyt: 'Taviran roomalaiseksi kutsuttu silta kokonaisuudessaan Gilão-joen yli.',
        selite: 'Taviran vanha silta (Ponte Romana) Gilão-joella kuvattuna joen rannalta. Kuvassa näkyy koko silta kaarineen ja sen takana kaupungin valkoisia taloja.',
        lahde: 'Valokuva: Marc Ryckaert, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Marc Ryckaert',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tavira_Ponte_Romana_R01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-tavira-962aa72e.jpg',
        lyhyt: 'Taviran vanhan kaupunginosan valkoisia taloja ja kivetty aukio, taustalla linnan muuria.',
        selite: 'Taviran historiallista keskustaa Algarvessa: valkoisia, punakattoisia taloja ja kivetty aukio. Taustalla näkyy linnan hammastettua muuria.',
        lahde: 'Valokuva: Peter K Burian, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Peter K Burian',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Historic_centre_of_Tavira.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Tavira',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Keitä foinikialaiset olivat?',
      'Mikä on Välimeren ruokavalio?',
    ],
    korostukset: ['foinikialaisten|foinikialaisten'],
    nappi: 'Algarven kalastajakaupunki Gilão-joen suulla',
    // -7.65 E / 37.11666667 N — en-Wikipedia "Tavira"
    laudat: {
      maailmankartta: { x: 5578.3, y: 1914.9 },
      europe: { x: 64.3, y: 917.4 },
    },
    teksti: 'Tavira on portugalilainen kaupunki ja kunta Algarven itäosassa etelärannikolla, 28 '
      + 'kilometriä Farosta itään ja 75 kilometriä Huelvasta länteen Guadiana-joen toisella '
      + 'puolella Espanjassa. Gilão-joki laskee kaupungissa Atlanttiin. Kaupungin alkuperä '
      + 'ulottuu myöhäiselle pronssikaudelle, ja 700-luvulla eaa. siitä tuli yksi '
      + 'ensimmäisistä foinikialaisten asutuksista Iberian länsiosassa. Maurien aikakausi '
      + '700–1200-luvuilla vaikutti alueen maanviljelyyn, kulttuuriin ja rakennustaiteeseen, '
      + 'ja maurit rakensivat Tavirassa linnan, kaksi moskeijaa ja palatseja. Nykyisessä '
      + 'kaupungissa on paljon 1700-luvun rakennuksia ja 37 kirkkoa, ja silta yhdistää '
      + 'kaupungin kaksi osaa Gilão-joen yli.',
    lahde: 'en-Wikipedia "Tavira", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-amarante',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-amarante-5e26677b.jpg',
      lyhyt: 'Kivinen silta kaartuu Tâmega-joen yli Amarantessa, ja sen kaaret heijastuvat tyyneen veteen.',
      selite: 'Commonsin kuvauksen mukaan kuvassa on silta Amarantessa Portugalissa. Kuvassa näkyy kaksi leveää kaarta, sillan päädyssä kaksi korkeaa obeliskia ja vasemmalla vaaleanpunainen talo.',
      lahde: 'Valokuva: Joseolgon, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Joseolgon',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ponte_de_Amarante_2021_(1).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-amarante-e03d8fb9.jpg',
        lyhyt: 'São Gonçalon silta ja luostarikirkko kohoavat Tâmega-joen rannalla.',
        selite: 'Kuvan kuvauksen mukaan kohde on São Gonçalon silta ja luostari Amarantessa. Kuvassa näkyvät sillan kaari, oranssinpunainen kupoli ja kellotorni joen yllä.',
        lahde: 'Valokuva: Tiagox2, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Tiagox2',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bridge_and_Convent_of_São_Gonçalo.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Amarante',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuka São Gonçalo oli?',
      'Mikä on UNESCOn musiikkikaupunki?',
    ],
    korostukset: ['São Gonçalo|São Gonçalo'],
    nappi: 'Tâmegan kaupunki, joka torjui ranskalaiset ja palvoo pyhää Gonçaloa',
    // -8.08083333 E / 41.27027778 N — en-Wikipedia "Amarante, Portugal"
    laudat: {
      maailmankartta: { x: 5564, y: 1752.7 },
      europe: { x: 56, y: 808.2 },
    },
    teksti: 'Amarante on kaupunki ja kunta Tâmega e Sousan alueella Pohjois-Portugalissa. Vuonna '
      + '2021 kunnassa asui 52 116 ihmistä, mutta itse kaupungissa, joka käsittää São '
      + 'Gonçalon, Madalenan, Cepelosin ja Gatãon seurakunnat, oli 11 564 asukasta. Kaupunki '
      + 'on ollut UNESCOn luovien kaupunkien verkoston jäsen musiikkikaupunki-luokassa '
      + 'vuodesta 2017. Sen kerrotaan auttaneen paikallisia joukkoja torjumaan ranskalaisten '
      + 'hyökkäyksen 1800-luvun alussa, ja se liittyy pappiin ja pyhimykseen Gundisalvus de '
      + 'Amaranteen, paikallisesti São Gonçalo de Amaranteen. Linnoitettu kukkula-asutus '
      + 'Castro de Ladário oli asuttu 1. vuosisadalta eaa. 400-luvulle jaa.',
    lahde: 'en-Wikipedia "Amarante, Portugal", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-chaves',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-chaves-c50649ca.jpg',
      lyhyt: 'Chavesin roomalaisen sillan kaaret heijastuvat Tâmega-joen tyyneen pintaan, taustalla valkoisia taloja.',
      selite: 'Kuvassa on Chavesin roomalainen silta (Ponte Romana) Tâmega-joen yllä. Commonsin kuvauksen mukaan kohde on luokiteltu kansalliseksi monumentiksi (Monumento Nacional).',
      lahde: 'Valokuva: João Carvalho, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'João Carvalho',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ponte_romana_Chaves_01.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-chaves-50b618c5.jpg',
        lyhyt: 'Trajanuksen silta ulottuu pitkänä kaarijonona Tâmega-joen yli.',
        selite: 'Kuvauksen mukaan kuvassa on Ponte de Trajano (roomalainen silta) Chavesissa Norten alueella. Silta näkyy joen toiselta rannalta, ja vastarannalla on kaupungin taloja.',
        lahde: 'Valokuva: GFreihalter, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'GFreihalter',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Chaves_Ponte_de_Trajano_303.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Chaves',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mistä Chavesin nimi tulee?',
      'Miksi roomalaiset perustivat sen tähän?',
    ],
    korostukset: ['Aquæ Flaviae|Aquæ Flaviae'],
    nappi: 'Roomalainen Aquae Flaviae, rajaseudun keskus',
    // -7.47138889 E / 41.74055556 N — en-Wikipedia "Chaves, Portugal"
    laudat: {
      maailmankartta: { x: 5584.3, y: 1733.9 },
      europe: { x: 67.7, y: 795.8 },
    },
    teksti: 'Chaves on kaupunki ja kunta Pohjois-Portugalissa, 10 kilometriä Espanjan rajalta '
      + 'etelään. Koko kunnassa asui vuonna 2011 41 243 ihmistä, ja kunta on Vila Realin '
      + 'piirikunnan toiseksi väkirikkain. Kaupunki on kehittynyt alueelliseksi keskukseksi '
      + 'roomalaisen civitas Aquæ Flaviaen pohjalta. Löydökset osoittavat, että ihmisiä on '
      + 'asunut seudulla jo paleoliittisella ajalla, ja pysyvä asutus alkoi, kun roomalaiset '
      + 'legioonat valtasivat Tâmega-joen hedelmällisen laakson. Paikka sijaitsi kolmen '
      + 'tärkeän roomalaisen tien, Bracara Augustan, Asturican ja Lamecumin, risteyksessä.',
    lahde: 'en-Wikipedia "Chaves, Portugal", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-sao-domingos',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-sao-domingos-9853bba4.jpg',
      lyhyt: 'Entisen kaivoksen louhoksen täyttää tumma hapan vesi, jota ympäröivät ruosteenpunaiset ja keltaiset kalliot.',
      selite: 'Kuvan nimen mukaan kyse on São Domingosin kaivoksen happamasta lammesta (lagoa ácida). Louhoksen seinämien värit vaihtelevat punaisesta keltaiseen ja valkoiseen.',
      lahde: 'Valokuva: Alexey Komarov, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Alexey Komarov',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lagoa_ácida,_Mina_de_São_Domingos_2019-11-09-1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-sao-domingos-e6716e8b.jpg',
        lyhyt: 'São Domingosin kaivoksen raunioituneet betoni- ja tiilirakennukset kohoavat sinistä taivasta vasten.',
        selite: 'Kuvan nimen ja kuvauksen mukaan rauniorakennuksia São Domingosin kaivosalueella Portugalissa (kuvattu 2011). Rakennusten pinnat ovat ruosteenruskeita ja osin sortuneita.',
        lahde: 'Valokuva: Rosino, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Rosino',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Edifícios_em_ruínas_na_Mina_de_São_Domingos.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'São Domingosin kaivos',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi britit tulivat Portugaliin louhimaan kuparia?',
      'Mikä Iberian pyriittivyöhyke on?',
    ],
    korostukset: ['Mason and Barry|Mason and Barry'],
    nappi: 'Brittiläinen kuparikaivos Guadianan varrella; tulva tuhoaa sataman 1876',
    // -7.49388889 E / 37.66888889 N — en-Wikipedia "São Domingos Mine"
    laudat: {
      maailmankartta: { x: 5583.5, y: 1893.6 },
      europe: { x: 67.3, y: 902.9 },
    },
    teksti: 'São Domingosin kaivos on autioitunut avolouhos Corte do Pinton kylässä Mértolan '
      + 'kunnassa Alentejossa. Se kuuluu Iberian pyriittivyöhykkeen malmiesiintymiin, ja se '
      + 'oli ensimmäinen paikka Portugalissa, jossa oli sähkövalo. Roomalaiset louhivat '
      + 'aluetta kultaa ja hopeaa varten noin 400 vuotta. Vuonna 1854 italialainen kaivosmies '
      + 'Nicolau Biava haki kaivokselle oikeudet, ja louhinta alkoi uudelleen vuonna 1855 '
      + 'kuparin kysynnän kasvaessa. Vuonna 1859 kaivosoikeus vuokrattiin 50 vuodeksi '
      + 'englantilaiselle yhtiölle Mason and Barry, ja samana vuonna vihittiin käyttöön '
      + 'Guadianan Pomarãon satama. Vuonna 1862 avattiin 18 kilometrin rautatie kaivokselta '
      + 'satamaan, ja tulva tuhosi Pomarãon joulukuussa 1876.',
    lahde: 'en-Wikipedia "São Domingos Mine", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-castro-marim',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-castro-marim-f9398891.jpg',
      lyhyt: 'Ylhäältä otetussa kuvassa Castro Marimin valkoiset talot, suola-altaat ja laaja kosteikko.',
      selite: 'Kuvan nimi on Salinas de Castro Marim (Wiki Loves Monuments Portugal). Etualalla kaupungin punakattoisia taloja, keskellä suola-altaita ja kosteikkoa, ja kaukana vesiväylän takana näkyy toinen kaupunki.',
      lahde: 'Valokuva: Concierge.2C, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Concierge.2C',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Salinas_de_Castro_Marim.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-castro-marim-b0f2636d.jpg',
        lyhyt: 'Kolme flamingoa etsii ruokaa matalassa vedessä, edessä kaksi mustavalkoista kahlaajaa.',
        selite: 'Kuvan nimen mukaan flamingot ovat Castro Marimin ja Vila Real de Santo Antóniön suoluonnonpuistossa; Commonsin kuvaus on Greater Flamingo. Taustalla uiskentelee sorsia ja muita vesilintuja.',
        lahde: 'Valokuva: Luis Nunes Alberto, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Luis Nunes Alberto',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Flamingos_at_Castro_Marim_and_Vila_Real_de_Santo_António_Marsh_Natural_Reserve.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-castro-marim-63583d59.jpg',
        lyhyt: 'Valkoinen kupolikirkko ja Castro Marimin linnan paksu muuri kohoavat kaupungin kattojen yläpuolella.',
        selite: 'Kuvauksen mukaan kuvassa on Castro Marimin kirkko ja linna. Kirkon takana kohoaa linnan hammastettu muuri ja torni.',
        lahde: 'Valokuva: Dmitry Tonkonog, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Dmitry Tonkonog',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castro_Marim_Church_and_Castle.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Castro Marimin suoalue',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Mikä Ramsar-alue on?',
      'Mitä lintuja alueella näkee?',
    ],
    korostukset: ['Ramsar|Ramsar'],
    nappi: 'Guadianan suiston suo, jossa flamingot pysähtyvät',
    // -7.43333333 E / 37.2 N — en-Wikipedia "Castro Marim and Vila Real de Santo António Marsh Natural Reserve"
    laudat: {
      maailmankartta: { x: 5585.6, y: 1911.7 },
      europe: { x: 68.5, y: 915.2 },
    },
    teksti: 'Castro Marimin ja Vila Real de Santo Antónion suoluonnonpuisto on Portugalin '
      + 'luonnonsuojelualue, joka on Ramsar-kosteikko. Alue houkuttelee vierailijoita '
      + 'monipuolisen eläimistönsä vuoksi: siellä on noin 153 lintulajia, muun muassa '
      + 'haikaroita, avosetteja, rantasipejä ja flamingoparvia, sekä yli 400 kasvilajia ja '
      + 'erilaisia matelijoita, sammakkoeläimiä ja nisäkkäitä. Kevättalvella 2021 alueella '
      + 'kuoriutui 550 flamingoa, mikä oli Portugalissa ensimmäinen kerta.',
    lahde: 'en-Wikipedia "Castro Marim and Vila Real de Santo António Marsh Natural Reserve", '
      + 'koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-trancoso',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-trancoso-5c65bf18.jpg',
      lyhyt: 'Trancoson linnan hammastetut kivitornit ja paksut muurit kohoavat sinistä taivasta vasten.',
      selite: 'Kuvauksen mukaan kuvassa on Castelo de Trancoso Portugalissa. Kuva on otettu linnan ulkomuurin juurelta, ja muurin kaariportti näkyy vasemmalla.',
      lahde: 'Valokuva: Gerd Eichmann, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Gerd Eichmann',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Trancoso-Castelo-04-2011-gje.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-trancoso-00f6a1b1.jpg',
        lyhyt: 'Linnan muurin harjalta avautuu näkymä Trancoson vanhankaupungin punaisten kattojen yli.',
        selite: 'Kuvan nimen mukaan näkymä Trancoson linnasta kaupunkiin (Stadt). Etualalla ovat linnan hammaslinnakkeet, kaupungin yllä kohoaa kellotorni ja taustalla vuoria.',
        lahde: 'Valokuva: Gerd Eichmann, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Gerd Eichmann',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Trancoso-Castelo-34-Stadt-2011-gje.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-trancoso-29706571.jpg',
        lyhyt: 'Vihertävä pronssipatsas esittää Gonçalo Bandarraa, joka nojaa jalkansa kivilohkareeseen.',
        selite: 'Patsas on Trancosossa. Jalustan tekstin mukaan se esittää Gonçalo Annes Bandarraa, 1500-luvun runoilijaa, profeettaa ja suutaria Trancososta; jalustalla on suutarin vasara ja lesti.',
        lahde: 'Valokuva: Gerd Eichmann, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Gerd Eichmann',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Trancoso-22-Goncalo_Bandarra-2011-gje.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Trancoso',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka Bandarra oli?',
      'Keitä marraanit olivat?',
    ],
    korostukset: ['Bandarra|Bandarra'],
    nappi: 'Beiran linnakaupunki, jonka suutari ennusti tulevia',
    // -7.35 E / 40.78333333 N — en-Wikipedia "Trancoso, Portugal"
    laudat: {
      maailmankartta: { x: 5588.3, y: 1772 },
      europe: { x: 70.1, y: 821 },
    },
    teksti: 'Trancoso on kaupunki ja kunta Guardan piirikunnassa Portugalin keskiosassa, Beira '
      + 'Interior Norte -alueella. Kunnassa asui vuonna 2011 9 878 ihmistä, ja itse '
      + 'kaupungissa noin 3 000. Pääasiallinen nähtävyys on Trancoson linna. Kaupunki on '
      + 'tunnettu paikkana, jossa 1500-luvun runoilija ja suutari António Gonçalves de '
      + 'Bandarra asui ja kirjoitti profeetallisia tekstejään; hänen patsaansa on pystytetty '
      + 'kaupungintalon eteen. Trancosossa syntyi myös Isaac Cardoso, oppinut juutalainen '
      + 'kirjailija, filosofi ja lääkäri. Hänen vanhempansa kuuluivat Trancoson laajaan '
      + 'marraaniyhteisöön, joka jätti jälkeensä 300 heprealaista kirjoitusta, ja 700 '
      + 'Trancoson juutalaista vainottiin inkvisition aikana.',
    lahde: 'en-Wikipedia "Trancoso, Portugal", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-panasqueira',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-panasqueira-d487f40a.jpg',
      lyhyt: 'Panasqueiran kaivoksen rikastamon ruosteiset teräsrakennukset, hihnakuljettimet ja tornit ylhäältä nähtynä.',
      selite: 'Commonsin kuvauksen mukaan kuvassa on nykyinen rikastamo (lavaria) Barroca Grandessa, Panasqueiran kaivosalueella. Kuvassa hihnakuljettimet yhdistävät aaltopeltisiä rakennuksia.',
      lahde: 'Valokuva: Nuno Madeira Alves, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Nuno Madeira Alves',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lavaria.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-panasqueira-b6188035.jpg',
        lyhyt: 'Siniset koneet: nostokoneiston suuri kelapyörä ja sähkömoottori kalliotilassa.',
        selite: 'Commonsin kuvauksen mukaan kuvassa on Panasqueiran kaivoksen nostokone (winch) Cláudio dos Reisin kuilulla. Kalliotilan seinät hehkuvat oranssina valaistuksessa.',
        lahde: 'Valokuva: Nuno Madeira Alves, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Nuno Madeira Alves',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Máquina_extração_Poço_C._Reis.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-panasqueira-8b9f44ab.jpg',
        lyhyt: 'Pyhän Barbaran patsas lasiovisessa seinäkomerossa, ympärillä tekokukkia.',
        selite: 'Commonsin kuvauksen mukaan kuva on Panasqueiran kaivokselta (Panasqueira Mine - S. Barbara). Patsaan jalustassa lukee S. Barbara.',
        lahde: 'Valokuva: Nuno Madeira Alves, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Nuno Madeira Alves',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:S._Barbara.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Panasqueiran kaivos',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mitä wolframi on?',
      'Miten kaivos löydettiin?',
    ],
    korostukset: ['wolframi|wolframi'],
    nappi: 'Kanervakukkulat, joilta hiilenpolttaja löytää myöhemmin mustan kiven',
    // -7.75 E / 40.15 N — en-Wikipedia "Panasqueira"
    laudat: {
      maailmankartta: { x: 5575, y: 1797 },
      europe: { x: 62.4, y: 837.7 },
    },
    teksti: 'Panasqueiran kaivokset ovat Portugalin kaivostoimintojen ryhmä Cabeço do Pião '
      + '-kukkulan ja Panasqueiran kylän välillä; ne ovat toimineet jatkuvasti tinan ja '
      + 'wolframin löytämisestä lähtien. Kaivos on toiminut lähes keskeytyksettä vuodesta '
      + '1901, ja sillä on ollut vahva vaikutus Beira Interiorin ja Cova da Beiran '
      + 'identiteettiin. Se on tunnettu ympäri maailmaa wolframiteollisuudessa laadustaan, '
      + 'tuotantomääristään ja pitkäikäisyydestään. 1800-luvun lopussa seutua peitti paksu '
      + 'kanervapensaikko, ja hiilenpolttaja "Pescão de Casegas" löysi kiiltävän mustan '
      + 'kiven, jonka hän vei Manuel dos Santosille. Santos osti maan ja aloitti wolframin '
      + 'louhinnan, ja professori Silva Pinto osti myöhemmin malmin ja maan.',
    lahde: 'en-Wikipedia "Panasqueira", johdanto-osa ja osio "Discovery" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-estremoz',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-estremoz-db49582f.jpg',
      lyhyt: 'Marmorilouhoksen jyrkät seinämät Estremozissa.',
      selite: 'Louhoksen kerrostuneet, ruskeajuovaiset marmoriseinämät laskeutuvat syvälle, ja pohjalle on kertynyt vihreää vettä. Kuvan kuvaus: marmorikaivos Estremozissa, Portugalissa.',
      lahde: 'Valokuva: lt:User:Mea, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'lt:User:Mea',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Estremoz_marmuro_kasykla.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-estremoz-ff21d9e9.jpg',
        lyhyt: 'Estremozin linnan donjon-torni ja muuri sinistä taivasta vasten.',
        selite: 'Kuvassa Estremozin linnan ja sen vartiotorni-tyyppinen päätorni (keep) sekä pyöreä muuritorni.',
        lahde: 'Valokuva: Javier Habladorcito, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Javier Habladorcito',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:EstremozCastle-Tower1.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-estremoz-2242d6e8.jpg',
        lyhyt: 'Vaaleasta suonikkaasta marmorista tehdyt tornimaiset harjakoristeet Estremozissa.',
        selite: 'Korkealta otetussa kuvassa näkyvät vaalean, ruskeasuonisen marmorin harjakkaat kivipilarit ja kivilaatoitettu kävelytaso sekä kaukainen maisema.',
        lahde: 'Valokuva: Heribert Bechen, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Heribert Bechen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:DSC04306_-_Estremoz_%2840201339991%29.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Estremozin marmori',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Mitä värejä Estremozin marmorissa on?',
      'Missä marmoria on käytetty?',
    ],
    korostukset: ['marmori|marmoria'],
    nappi: 'Marmorikaupunki, jonka kivi on kulkenut Afrikkaan ja Intiaan',
    // -7.58333333 E / 38.85 N — en-Wikipedia "Estremoz"
    laudat: {
      maailmankartta: { x: 5580.6, y: 1847.9 },
      europe: { x: 65.6, y: 871.8 },
    },
    teksti: 'Estremoz on kunta Alentejossa Portugalissa, ja kaupungissa itsessään asui vuonna '
      + '2001 7 682 ihmistä. Yhdessä kahden muun marmorikaupungin, Borban ja Vila Viçosan, '
      + 'kanssa Estremoz tunnetaan kansainvälisesti hienosta marmoristaan, jota on '
      + 'valkoisena, kermanvärisenä, vaaleanpunaisena, harmaana tai mustana ja kaikissa '
      + 'näiden väriyhdistelmissä. Marmoria on käytetty jo antiikista lähtien veistoksiin ja '
      + 'rakennuksiin; ensimmäiset vientierät menivät todennäköisesti Emerita Augustan Circus '
      + 'Maximuksen rakentamiseen. Portugalilaiset merenkulkijat veivät marmoria Afrikkaan, '
      + 'Intiaan ja Brasiliaan, ja Estremozin seudulla marmoria on niin paljon, että sitä '
      + 'käytetään kaikkialla, jopa kynnyksinä ja katukivinä.',
    lahde: 'en-Wikipedia "Estremoz", johdanto-osa ja osiot "History" ja "Marble" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-torres-vedras',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-torres-vedras-b5373068.jpg',
      lyhyt: 'Vanha kartta Torres Vedrasin linjoista ja niiden yhteydestä Lissaboniin.',
      selite: 'Sorianon kirjaan kuuluva kartta esittää vuosien 1810 ja 1811 Torres Vedrasin puolustuslinjat sekä Lissabonin, Peniche-niemen ja Tejo-joen.',
      lahde: 'Kartta: Simão Luz Soriano, Wikimedia Commons (public domain).',
      tekija: 'Simão Luz Soriano',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mapa_linhas_de_torres_vedras.png',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-torres-vedras-c9f4423a.jpg',
        lyhyt: 'Kiviseinäisiä muureja ja maavalleja Forte de São Vicenten linnakkeella.',
        selite: 'Forte de São Vicente on 1800-luvun linnake kukkulalla Torres Vedrasin luoteispuolella; kuvassa sen kivimuuria ja penkereitä.',
        lahde: 'Valokuva: GualdimG, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'GualdimG',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Forte_de_S%C3%A3o_Vicente,_Torres_Vedras_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-torres-vedras-41ce964a.jpg',
        lyhyt: 'Tykkimiesten patsasryhmä tykkeineen linnakkeen patterilla.',
        selite: 'Patsasryhmä esittää tykkimiehistöä Forte de São Vicenten patterilla (Redoubt 27), taustalla mänty ja kivimuuri.',
        lahde: 'Valokuva: Alta Falisa, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Alta Falisa',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Torres_Vedras_%E2%80%93_Forte_de_S%C3%A3o_Vicente_%E2%80%93_Bateria.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Torres Vedrasin linjat',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi linjat rakennettiin salassa?',
      'Kuka Wellington oli?',
    ],
    korostukset: ['Wellington|Wellingtonin'],
    nappi: 'Wellingtonin salassa rakentamat linnakelinjat, jotka pysäyttivät Massénan 1810',
    // -9.26666667 E / 39.08333333 N — en-Wikipedia "Torres Vedras"
    laudat: {
      maailmankartta: { x: 5524.4, y: 1838.8 },
      europe: { x: 33.3, y: 865.7 },
    },
    teksti: 'Torres Vedrasin linjat olivat Lissabonin puolustamiseksi niemimaasodan aikana '
      + 'salassa rakennettu linnakkeiden ja muiden sotilaallisten puolustusrakenteiden ketju. '
      + 'Ne on nimetty lähellä olevan Torres Vedrasin kaupungin mukaan, ja niiden '
      + 'rakentamisen määräsi Arthur Wellesley, Wellingtonin varakreivi. Rakentamisesta '
      + 'vastasivat eversti Richard Fletcher ja hänen portugalilaiset työmiehensä '
      + 'marraskuusta 1809 syyskuuhun 1810, ja linjoja käytettiin pysäyttämään marsalkka '
      + 'Massénan vuoden 1810 hyökkäys. Portugalin hallitus julisti linjat kansalliseksi '
      + 'perinnöksi maaliskuussa 2019.',
    lahde: 'en-Wikipedia "Lines of Torres Vedras", johdanto-osa (tarkistettu 19.9.2026); '
      + 'koordinaatti en-Wikipedia "Torres Vedras".',
  },
  {
    id: 'hahmotelma-vimeiro',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-vimeiro-f0dff4e9.jpg',
      lyhyt: 'Vimeiron taistelun satavuotismuistomerkki, obeliski leijonan kuvalla.',
      selite: 'Kuningas Manuel II vihki muistomerkin 21.8.1908 taistelun satavuotispäivänä; pylvään tekstit ovat "Batalha do Vimeiro" ja "21 Agosto 1808".',
      lahde: 'Valokuva: Alta Falisa, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Alta Falisa',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vimeiro_%E2%80%93_Padr%C3%A3o_Comemorativo_da_Batalha_do_Vimeiro_%E2%80%93_1808_-_1908.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-vimeiro-42959228.jpg',
        lyhyt: 'Akvarelli: 20. kevyt rakuunarykmentti hyökkää Vimeiron taistelussa.',
        selite: 'Richard Simkinin maalaus ratsuväen rynnäköstä Vimeiron taistelussa 21.8.1808; kuvasta on rajattu alareuna pois.',
        lahde: 'Maalaus: Richard Simkin, Wikimedia Commons (public domain).',
        tekija: 'Richard Simkin',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_20th_Light_Dragoons_at_the_Battle_of_Vimeiro,_21st_August_1808.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Vimeiron taistelu',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Vimeiron taistelu oli tärkeä?',
      'Kuka Junot oli?',
    ],
    korostukset: ['Junot|Junotin'],
    nappi: 'Kylä, jonka lähellä britit voittivat ranskalaiset elokuussa 1808',
    // -9.31583333 E / 39.17611111 N — en-Wikipedia "Battle of Vimeiro"
    laudat: {
      maailmankartta: { x: 5522.8, y: 1835.2 },
      europe: { x: 32.3, y: 863.3 },
    },
    teksti: 'Vimeiron taistelussa 21. elokuuta 1808 kenraali Arthur Wellesley, myöhempi '
      + 'Wellingtonin herttua, johtamat britit voittivat kenraalimajuri Jean-Andoche Junotin '
      + 'johtamat ranskalaiset lähellä Vimeiron kylää Lissabonin lähellä niemimaasodan '
      + 'aikana. Taistelu päätti Ranskan ensimmäisen hyökkäyksen Portugaliin. Neljä päivää '
      + 'Roliçan taistelun jälkeen ranskalaiset hyökkäsivät Wellesleyn armeijaa vastaan, ja '
      + 'taistelu alkoi liikkeen taisteluna, jossa ranskalaiset yrittivät kiertää brittien '
      + 'vasenta laitaa. Wellesley onnistui kuitenkin siirtämään joukkonsa kohtaamaan '
      + 'hyökkäyksen, Junot vetäytyi Torres Vedrasia kohti menetettyään 2 000 miestä ja 13 '
      + 'tykkiä, kun anglo-portugalilaisten tappiot olivat 700.',
    lahde: 'en-Wikipedia "Battle of Vimeiro", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-almeida',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-almeida-3da94025.jpg',
      lyhyt: 'Almeidan tähtimuotoisen linnoituksen pohjapiirros.',
      selite: 'Piirroksesta näkyvät tähtimäiset bastionit, ravelinit sekä sisällä kaupunki ja keskiaikaisen linnan jäänteet (englanninkielisin nimin).',
      lahde: 'Piirros: Dennisbluie, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Dennisbluie',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fortress_of_Almeida.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-almeida-6ac7acab.jpg',
        lyhyt: 'Kivinen portti ja muurit Almeidan linnoituksessa.',
        selite: 'Vanhalle kiviselle muurille avautuu holvattu portti, jonka päällä on pieni vartiotorni; edessä kivetty tie.',
        lahde: 'Valokuva: Hovallef, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Hovallef',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fuerte_de_Almeida_entrada.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-almeida-cf3eb971.jpg',
        lyhyt: 'Almeidan linnoituksen kiviset bastionit ja muurit.',
        selite: 'Kuvassa näkyvät Almeidan linnoituksen kivimuurit ja kärkimäiset bastionit sekä taustalla kylän katot.',
        lahde: 'Valokuva: Hovallef, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Hovallef',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Murallas_de_la_fortaleza_de_Almeida.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Almeidan linnoitus',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä Almeidan piirityksessä tapahtui?',
      'Miksi linnoitus rakennettiin rajalle?',
    ],
    korostukset: ['ruutivarasto|ruutivaraston'],
    nappi: 'Tähtimuotoinen rajalinnoitus, jonka ruutivarasto räjähti 1810',
    // -6.9 E / 40.71666667 N — en-Wikipedia "Almeida, Portugal"
    laudat: {
      maailmankartta: { x: 5603.3, y: 1774.6 },
      europe: { x: 78.7, y: 822.8 },
    },
    teksti: 'Almeida on linnoitettu kylä ja kunta Beira Interior Norten alueella Guardan '
      + 'piirikunnassa. Kaupungissa itsessään asuu noin 1 300 ihmistä. Kylä sijaitsee 7,2 '
      + 'kilometriä Espanjan rajalta länteen, ja kaupungin linnoitus valmistui vuonna 1641 '
      + 'kylän pohjoispuolella; siihen johtaa kaksi tunneliporttia ja kuiva vallihauta. '
      + 'Linnoitus vartioi tärkeää Espanjasta tulevaa rajatietä, ja se on kestänyt useita '
      + 'piirityksiä. Niemimaasodan vuoden 1810 piiritys päättyi dramaattisesti, kun '
      + 'sattumalta osunut kranaatti sytytti pääruutivaraston, joka räjähti ja tuhosi '
      + 'suurimman osan kaupungista. Nimi tulee arabian sanasta al-Maʾida, pöytä.',
    lahde: 'en-Wikipedia "Almeida, Portugal", johdanto-osa sekä osiot "Location" ja "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-peniche',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-peniche-fc806112.jpg',
      lyhyt: 'Penichen linnoituksen muuri kohoaa rantakallioilta.',
      selite: 'Paksu kivimuuri pieneen vartiotorniin päättyvänä nousee rantakallioilta, ja muurin alta kulkee holvikaari merivedelle.',
      lahde: 'Valokuva: Alexkom000, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Alexkom000',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2026-07-31_Peniche_Fortress_01.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-peniche-ff8eaf24.jpg',
        lyhyt: 'Ilmakuva Penichen linnoituksesta ja niemestä.',
        selite: 'Ylhäältä otetusta kuvasta näkyy linnoituksen tähtimäinen, kulmikas muurirakenne meren ja Penichen talojen välissä.',
        lahde: 'Valokuva: Vitor Oliveira, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Vitor Oliveira',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Forte_de_Peniche_-_Portugal_%F0%9F%87%B5%F0%9F%87%B9_%2854999027001%29.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/prt-nosto-peniche-5d8566c2.jpg',
        lyhyt: 'Linnoitus rantakallioiden päällä merelta nähtynä.',
        selite: 'Merelta katsottuna linnoituksen muurit ja valkoiset rakennukset kohoavat jyrkän kalliorannan päälle.',
        lahde: 'Valokuva: Alexkom000, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Alexkom000',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2026-06-21_Peniche_Fortress_2.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Penichen linnoitus',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Peniche oli ennen saari?',
      'Mihin linnoitusta käytettiin?',
    ],
    korostukset: ['poliittisena vankilana|poliittisena vankilana'],
    nappi: 'Rannikkolinnoitus, jonka muureista tulee myöhemmin poliittinen vankila',
    // -9.37972222 E / 39.35416667 N — en-Wikipedia "Peniche Fortress"
    laudat: {
      maailmankartta: { x: 5520.7, y: 1828.2 },
      europe: { x: 31.1, y: 858.6 },
    },
    teksti: 'Penichen linnoitus sijaitsee Penichen kunnassa Oeste-alueella Portugalissa. Se on '
      + 'rakennettu entisen Atouguia da Baleian linnan paikalle, josta on jäljellä vain '
      + 'jäänteitä; ensimmäiset rakennustyöt tehtiin vuosina 1557 ja 1558, ja sitä on '
      + 'muutettu useasti. Sen puolustusmuurit ympäröivät kahden hehtaarin alueen, joka on '
      + 'jaettu ylä- ja alaosaan. Linnoituksella on ollut monta tehtävää, muun muassa '
      + 'poliittisena vankilana autoritaarisen Estado Novo -hallinnon aikana, ja nykyisin se '
      + 'sisältää Estado Novon vastarintaa käsittelevän museon. Keskiaikaan asti Peniche oli '
      + 'saari, mutta salmen liettyminen merivirtojen ja tuulen vuoksi muutti sen '
      + 'niemimaaksi.',
    lahde: 'en-Wikipedia "Peniche Fortress", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
];
