/*
 * MAASTOKOHTEET — IRN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs IRN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/IRN.json. Työkalu laskee laudan
 * projektiot (maailmankartta = Millerin lieriö, europe = tasaväli),
 * jättää pois laudan, jonka kaavan ulkopuolelle kohde jää, ja
 * tarkistaa että jokainen kohde osuu maan fokuslehden rajaukseen —
 * ikkunan ulkopuolinen merkki olisi olemassa mutta pelaajan
 * ulottumattomissa. Faktat on tarkistettu en-Wikipediasta lähde
 * kerrallaan, ja jokaisen kohteen `lahde`-rivi kertoo mistä artikkelin
 * osasta se on.
 *
 * Maa on YLEISELLÄ reitillä: lehdellä ei ole poltettuja
 * maastonimiä lainkaan, joten merkin nimiö on maastonimen ainoa
 * esiintymä kartalla. Kaksoisnimen vaaraa ei siis ole.
 *
 * Lista yhdistyy maan muihin kohteisiin js/packs/maastokohteet.js
 * -hakemiston kautta (js/fokuskohteet.js KOHDE_MAAT), joten maan
 * mahdollista olemassa olevaa fokuskohteet-pakkia EI ole tarvinnut
 * koskea eikä yhtään sen kohdetta ole toistettu täällä.
 *
 * Iranin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Persianlahti on annettu ARE:lle, joten Iranin meri on Kaspianmeri.
 *
 * MAAILMAN ERÄ M9 (6.9.2026) lisäsi listaan seitsemän KOHDETTA —
 * Pasargadai, Bamin linnoitus, Yazd, Shushtar, Soltaniyeh,
 * Takht-e Soleyman ja Gonbad-e Qabus. Lähin uusi merkki on Pasargadai
 * 13,9 lautayksikön päässä Persepolis-laatasta
 * (KAUPUNGIN_KOHDALLA_SADE 7), joten kaikki ovat pääkartan merkkejä.
 * Persepolis itse on pelikaupunki eikä siksi voi olla nosto, ja saman
 * säännön takia jäi pois myös Naqsh-e Rostam. Erä on kuvaton, ja
 * jokaisen kohteen lähin pelikaupunki on kirjattu sen
 * koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_IRN = [
  {
    id: 'damavand',
    nimi: 'Damavand',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Damavand on persialaisten tarujen vuori?',
      'Voiko uinuva tulivuori herätä?',
    ],
    korostukset: ['Alborz|Alborzin'],
    nappi: 'Aasian korkein tulivuori',
    // 52.109 E / 35.951 N — en-Wikipedia "Mount Damavand"
    laudat: {
      maailmankartta: { x: 7570.3, y: 1959.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Damavand on uinuva kerrostulivuori Alborzin vuoristossa, vain 66 kilometriä '
      + 'Teheranista koilliseen ja lähellä Kaspianmeren etelärantaa. Sen 5 610 metriä tekevät '
      + 'siitä Iranin ja koko Länsi-Aasian korkeimman huipun — ja samalla Aasian korkeimman '
      + 'tulivuoren. Persialaisessa mytologiassa vuorella on aivan oma sijansa: taruissa sen '
      + 'uumeniin on kahlittu hirviöitä maailmanloppua odottamaan.',
    lahde: 'en-Wikipedia "Mount Damavand", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'kaspianmeri',
    nimi: 'Kaspianmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Onko Kaspianmeri järvi vai meri?',
      'Keitä olivat kaspit?',
    ],
    korostukset: ['kaspit|kaspeilta'],
    nappi: 'Maailman suurin järvi — vai meri?',
    // 51.5 E / 37.6 N — ulappa Iranin pohjoisrannikon edustalla; artikkelin oma keskipiste 50,5 / 42 on keskiallasta pohjoisempana
    laudat: {
      maailmankartta: { x: 7550, y: 1896.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Kaspianmeri on maailman suurin sisävesi: pinta-alaa 371 000 neliökilometriä eli '
      + 'suunnilleen Japanin verran. Nimestään huolimatta se on umpinainen allas, josta ei ole '
      + 'yhteyttä valtameriin, ja siksi sitä kutsutaan myös maailman suurimmaksi järveksi — '
      + 'vaikka vesi on suolaista, noin kolmanneksen valtameren suolaisuudesta. Rantavaltioita '
      + 'on viisi, ja nimi tulee muinaiselta iranilaiskansalta, kaspeilta.',
    lahde: 'en-Wikipedia "Caspian Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'karun',
    nimi: 'Karun',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi vain yhtä Iranin jokea voi purjehtia?',
      'Minne Karunin vesi lopulta päätyy?',
    ],
    korostukset: ['Zagros|Zagrosin'],
    nappi: 'Iranin ainoa laivakelpoinen joki',
    // 48.67 E / 31.33 N — Ahvazin kohdalla; artikkelin koordinaatti 48,17 / 30,43 on joen suulla Shatt al-Arabissa
    laudat: {
      maailmankartta: { x: 7455.7, y: 2132.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Karun on Iranin vesirikkain joki ja maan ainoa, jota laivat voivat kulkea. Se saa '
      + 'alkunsa Zagrosin vuoriston Zard Kuhilta ja virtaa 950 kilometriä Khuzestanin maakunnan '
      + 'pääkaupungin Ahvazin kautta, kunnes laskee Shatt al-Arabiin ja sitä pitkin '
      + 'Persianlahteen. Antiikin kreikkalaiset tunsivat sen nimellä Eulaios.',
    lahde: 'en-Wikipedia "Karun", johdanto-osa (tarkistettu 30.8.2026).',
  },
  /* ================================================================
   * MAAILMAN ERÄ M9, LÄHI-ITÄ 2 6.9.2026 — SEITSEMÄN KOHDETTA.
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Iranilla oli kolme maastokohdetta ja yksi kohde (Apadana,
   * js/packs/fokuskohteet-irn.js), jota ei toisteta täällä. Kaikki
   * seitsemän ovat pääkartan merkkejä: etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin uusi merkki
   * on Pasargadai 13,9 lautayksikön päässä Persepolis-laatasta (raja
   * KAUPUNGIN_KOHDALLA_SADE on 7, js/fokuskohteet.js). Kuvaton erä;
   * faktat en-Wikipedian raakatekstistä 6.9.2026. Herkkien aiheiden
   * linjaus (docs/aasia-tyoaineisto/spec-asia.md) on sitova: yksikään
   * kortti ei koske nykypolitiikkaan.
   * ============================================================== */
  {
    id: 'pasargadai',
    nimi: 'Pasargadai',
    tyyppi: 'historia',
    kysymykset: [
      'Kenen hauta Pasargadaissa on?',
      'Mikä on chahar bagh?',
    ],
    korostukset: ['chahar bagh|chahar baghista'],
    nappi: 'Kyyroksen ensimmäinen pääkaupunki',
    // 53.1678 E / 30.1944 N — en-Wikipedia "Pasargadae"
    // Lähin pelikaupunki: Persepolis 13,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7605.6, y: 2173.8 },
    },
    teksti: 'Pasargadai oli Kyyros Suuren aikana Akhaimenidien valtakunnan pääkaupunki, ja se '
      + 'perustettiin 500-luvulla eaa. lähelle paikkaa, jossa Kyyros oli voittanut meedialaisten '
      + 'kuninkaan Astyageen vuonna 550 eaa. Kaupunki kantaa hänen oman sukunsa nimeä, ja se '
      + 'pysyi pääkaupunkina, kunnes Dareios siirsi hovin Persepolikseen. Puolentoista '
      + 'neliökilometrin alueella ovat Kyyroksen mausoleumina pidetty rakennus, Toll-e Takhtin '
      + 'linnoitus kukkulalla sekä kahden kuninkaallisen palatsin ja puutarhan jäänteet. '
      + 'Pasargadain puutarhat ovat vanhin tunnettu esimerkki persialaisesta chahar baghista eli '
      + 'nelijakoisesta puutarhasta, ja alueen portti R on vanhin tunnettu vapaasti seisova '
      + 'propylon.',
    lahde: 'en-Wikipedia "Pasargadae", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'bam',
    nimi: 'Bamin linnoitus',
    tyyppi: 'historia',
    kysymykset: [
      'Mistä aineesta Bamin linnoitus on tehty?',
      'Mitä linnoitukselle tapahtui 2003?',
    ],
    korostukset: ['savitiili|savitiilestä'],
    nappi: 'Maailman suurin savirakennus',
    // 58.3681 E / 29.1144 N — en-Wikipedia "Arg-e Bam"
    // Lähin pelikaupunki: Persepolis 185,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7778.9, y: 2213.1 },
    },
    teksti: 'Arg-e Bam Kermanin maakunnassa Kaakkois-Iranissa on maailman suurin savitiilestä '
      + 'tehty rakennus. Koko rakennelma oli suuri linnoitus, jonka sisällä oli sitadelli, ja '
      + 'koska sitadelli hallitsee raunioita, koko linnoitusta kutsutaan nykyään Bamin '
      + 'sitadelliksi. Sen juuret ulottuvat ainakin Akhaimenidien aikaan, ja se nousi tärkeäksi '
      + '600–1000-luvuilla Silkkitien risteyksessä sekä silkki- ja puuvillavaatteiden '
      + 'valmistajana. Joulukuun 26. päivänä 2003 maanjäristys tuhosi sitadellin lähes '
      + 'kokonaan yhdessä suuren osan Bamin kaupunkia kanssa, ja muutamaa päivää myöhemmin '
      + 'presidentti ilmoitti, että se rakennetaan uudelleen. Unescon luettelossa paikka on '
      + 'nimellä "Bam ja sen kulttuurimaisema".',
    lahde: 'en-Wikipedia "Arg-e Bam", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'yazd',
    nimi: 'Yazd',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mikä on badgir eli tuulenpyydystäjä?',
      'Kuka kuvasi Yazdin silkinkudonnan 1272?',
    ],
    korostukset: ['tuulenpyydystäjä|tuulenpyydystäjien'],
    nappi: 'Tuulenpyydystäjien kaupunki',
    // 54.3672 E / 31.8972 N — en-Wikipedia "Yazd"
    // Lähin pelikaupunki: Persepolis 87,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7645.6, y: 2111.3 },
    },
    teksti: 'Yazd on aavikkokaupunki Keski-Iranissa, ja sukupolvien sopeutuminen kuivuuteen '
      + 'näkyy sen rakennuksissa. Lempinimi on tuulenpyydystäjien kaupunki: katoilta nousevat '
      + 'badgir-tornit johtavat viileän ilman huoneisiin, ja maan alla kulkevat qanat-kanavat '
      + 'tuovat veden. Kaupunki on rakennettu lähes kokonaan savesta, ja siellä on myös '
      + 'yakhchal-jäävarastoja sekä ab anbar -vesisäiliöitä. Yazd oli syrjäisen sijaintinsa '
      + 'ansiosta suojassa suurilta sodilta ja otti pakolaisia vastaan mongolivalloituksen '
      + 'aikaan; Marco Polo kävi siellä 1272 ja kehui kaupungin silkinkudontaa. Yazd on myös '
      + 'zarathustralaisuuden keskus — kaupungin tulitemppelissä palaa tuli, jota on pidetty '
      + 'yllä vuodesta 470, ja laitamilla on vaikenemisen torni. Unescon '
      + 'maailmanperintöluetteloon vanhakaupunki pääsi 2017.',
    lahde: 'en-Wikipedia "Yazd", johdanto-osa sekä osiot "History", "Religion" ja '
      + '"Architecture" (tarkistettu 6.9.2026).',
  },
  {
    id: 'shushtar',
    nimi: 'Shushtar',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kuka rakensi Band-e Kaisarin padon?',
      'Mihin vesimyllyt tarvitsivat putouksen?',
    ],
    korostukset: ['Band-e Kaisar|Band-e Kaisar'],
    nappi: 'Sassanidien vesikoneisto',
    // 48.8467 E / 32.0453 N — en-Wikipedia "Shushtar Historical Hydraulic System"
    // Lähin pelikaupunki: Isfahan 96,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7461.6, y: 2105.8 },
    },
    teksti: 'Shushtarin historiallinen vesirakennelma on sassanidien ajan kastelujärjestelmä, '
      + 'jossa kolmetoista patoa, siltaa, kanavaa ja rakennetta toimivat yhdessä yhtenä '
      + 'koneistona. Gargarin siltapato rakennettiin vesimyllyjen ja putousten päälle, '
      + 'Bolaytin kanava johtaa veden padon takaa myllyjen itäpuolelle, ja Dahaneye Shahrin '
      + 'tunneli vie veden padolta myllyihin. Rakennelman avainosa on Band-e Kaisar eli '
      + 'Keisarin pato, noin 500 metriä pitkä roomalainen ylivuotopato Karunin yli: sen '
      + 'rakensi roomalainen työvoima 200-luvulla jaa. sassanidien käskystä, ja se oli '
      + 'itäisin roomalainen silta tai pato sekä Iranin ensimmäinen rakenne, joka yhdisti '
      + 'sillan ja padon. Unescon maailmanperintöluetteloon kokonaisuus otettiin 2009 Iranin '
      + 'kymmenentenä kulttuurikohteena.',
    lahde: 'en-Wikipedia "Shushtar Historical Hydraulic System", johdanto-osa (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'soltaniyeh',
    nimi: 'Soltaniyeh',
    tyyppi: 'historia',
    kysymykset: [
      'Kenen pääkaupunki Soltaniyeh oli?',
      'Mitä kaupungille tapahtui Öljeitün kuoltua?',
    ],
    korostukset: ['ilkhanidit|ilkhanidien'],
    nappi: 'Kupoli aron laidalla',
    // 48.7972 E / 36.4358 N — en-Wikipedia "Soltaniyeh"
    // Lähin pelikaupunki: Teheran 91,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7459.9, y: 1940.9 },
    },
    teksti: 'Soltaniyeh on kaupunki Zanjanin maakunnassa noin 240 kilometriä Teheranista '
      + 'luoteeseen. Se rakennettiin 1300-luvulla Iranin mongolihallitsijoiden, ilkhanidien, '
      + 'pääkaupungiksi, ja nimi tulee hallitsijan arvonimestä sulttaani — se tarkoittaa '
      + 'suunnilleen kuninkaallista. Kastilialainen lähettiläs Ruy González de Clavijo kävi '
      + 'kaupungissa ja kertoi sen olleen silkkiviennin keskus. Historioitsija William '
      + 'Dalrymple huomauttaa, että hallitsija Öljeitü aikoi tehdä siitä maailman suurimman ja '
      + 'komeimman kaupungin, mutta hanke kuoli hänen mukanaan ja jäljellä on autio, '
      + 'rapistuva raunioalue. Unescon maailmanperintöluetteloon Soltaniyeh pääsi 2005.',
    lahde: 'en-Wikipedia "Soltaniyeh", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'takhtesoleyman',
    nimi: 'Takht-e Soleyman',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä oli Adur Gushnasp?',
      'Mistä paikka sai raamatullisen nimensä?',
    ],
    korostukset: ['tulitemppeli|tulitemppelin'],
    nappi: 'Salomon valtaistuin',
    // 47.2358 E / 36.6039 N — en-Wikipedia "Takht-e Soleymān"
    // Lähin pelikaupunki: Tabriz 64,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7407.9, y: 1934.5 },
    },
    teksti: 'Takht-e Soleyman eli Salomon valtaistuin on sassanidien ajan kaivauspaikka '
      + 'Länsi-Azerbaidžanissa lähellä Takabin kaupunkia. Linnoitus seisoo kukkulalla, jonka on '
      + 'kasvattanut kalkkipitoinen lähdelampi, ja sen sisällä ovat zarathustralaisen '
      + 'tulitemppelin Adur Gushnaspin jäänteet, jotka ilkhanidit rakensivat osin uudelleen '
      + 'moskeijaksi. Temppelissä paloi yksi kolmesta suuresta kuninkaallisesta tulesta, joiden '
      + 'edessä sassanidihallitsijat nöyrtyivät noustessaan valtaistuimelle, ja Adur Gushnasp '
      + 'oli omistettu soturisäädylle. Raamatullisen nimensä paikka sai vasta 600-luvun '
      + 'valloitusten jälkeen: kansantarun mukaan Salomo vangitsi hirviöitä läheiseen sadan '
      + 'metrin syvyiseen kraatteriin, jota kutsutaan Salomon vankilaksi. Unescon '
      + 'maailmanperintökohde paikasta tuli heinäkuussa 2003.',
    lahde: 'en-Wikipedia "Takht-e Soleymān", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'gonbadeqabus',
    nimi: 'Gonbad-e Qabus',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka rakennutti tornin ja milloin?',
      'Kuinka kaukaa torni näkyy?',
    ],
    korostukset: ['tiili|tiilen'],
    nappi: 'Kuusikymmentä metriä tiiltä',
    // 55.1686 E / 37.2578 N — en-Wikipedia "Gonbad-e Qabus (tower)"
    // Lähin pelikaupunki: Teheran 139,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7672.3, y: 1909.4 },
    },
    teksti: 'Gonbad-e Qabus on hautatorni Pohjois-Iranissa ja Unescon maailmanperintökohde '
      + 'vuodesta 2012. Se merkitsee ziyaridihallitsija Qabusin hautaa ja rakennettiin hänen '
      + 'elinaikanaan vuonna 1006 tai 1007 — riimitellyllä proosalla kirjoitetut '
      + 'piirtokirjoitusnauhat kertovat, että hän itse käski rakentaa sen. Lieriömäinen torni '
      + 'kohoaa noin 61 metriin, josta yksitoista metriä on maan alla, ja se näkyy noin '
      + 'kolmenkymmenen kilometrin päähän. Taidehistorioitsija Oleg Grabar piti sitä iranilaisen '
      + 'arkkitehtuurin mestariteoksena: siinä on lähes täydellinen tasapaino tarkoituksen, '
      + 'muodon ja yhden ainoan aineen — tiilen — välillä. Kaupunki tornin ympärillä on saanut '
      + 'nimensä siltä.',
    lahde: 'en-Wikipedia "Gonbad-e Qabus (tower)", johdanto-osa ja osio "Construction, plan '
      + 'and design" (tarkistettu 6.9.2026).',
  },
];

