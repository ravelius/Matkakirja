/*
 * MAASTOKOHTEET — PRY. Paraguayn maasto ja kahdeksan kohdetta.
 *
 * ── MAAILMAN ERÄ M18 (6.9.2026) ───────────────────────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Paraguaylla ei ollut ennen tätä erää yhtäkään karttamerkkiä, ei
 * eläintäkyä eikä skandaalia (docs/moduulit/karttanostot-kattavuus.md,
 * Etelä-Amerikka). Kiintiö on kahdeksan KOHDETTA, kolme MAASTOKOHDETTA,
 * yksi eläintäky ja kaksi skandaalia; kaksi jälkimmäistä asuvat omissa
 * pakeissaan (js/packs/elaintakyt.js, js/packs/skandaalit.js).
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Paikat on johdettu tools/johda-maastokohteet.mjs:n `laudat`-funktiolla
 * en-Wikipedian coordinates-propin asteista. Vain maailmankartan rivi:
 * Euroopan erillislaudasta on luovuttu (Raamattu 30.8.2026).
 *
 * MIKSI EI tools/maastoaineisto/PRY.json. Aineistotiedostoa ei ole,
 * joten maastokohteet on valittu käsin maan omista huipuista ja joista.
 * Paraguay on sisämaavaltio, joten merta ja saarta ei ole: kiintiö
 * täyttyy huipulla ja kahdella joella, ja se on tarkoituksellista.
 *
 * KAKSI JOKEA EIKÄ JÄRVEÄ, JA SYY ON KAUPUNKISÄDE. Ypacaraíjärvi olisi
 * ollut luonteva kolmas maastokohde, mutta sen piste (−57,35 / −25,3,
 * en-Wikipedia "Ypacaraí Lake") on vain 9,7 lautayksikön päässä
 * Asunción-laatasta; se on yli KAUPUNGIN_KOHDALLA_SADE-rajan (7,
 * js/fokuskohteet.js) mutta niin lähellä, että nimiö kilpailisi
 * pääkaupungin kanssa. Tilalle tuli Tebicuary, jonka suulla käytiin
 * yksi Kolmen liiton sodan ratkaisevista ylityksistä.
 *
 * NIMI EI OLE KARTALLA KAHDESTI (N3). Paraná, Rio Negro ja Uruguayjoki
 * ovat jo laudan omia jokinimiä (js/packs/maailmankartta-nimet.js),
 * joten niitä ei ole tässä listassa; Trinidad on Kuuban listassa
 * (js/packs/maastokohteet-cub.js), joten jesuiittalähetysten merkki on
 * nimeltään "Trinidad ja Jesús". Pilcomayo jäi pois eri syystä: sen
 * artikkelin koordinaatti on joen suu Asunciónin kohdalla (2,5
 * lautayksikköä laatasta).
 *
 * VARTIO 7a. tools/savukkeet/savuke-maastokohteet.mjs vaatii, että
 * jokainen kohde osuu maan fokuslehden rajaukseen (`osuuLehteen`).
 * Paraguaylla rajaus on olemassa (js/packs/fokus-grc.js FOKUS_POHJAT.PRY,
 * x 3694,6…4075,6, y 3810,8…4208,7), joten vartio PÄTEE ja jokainen
 * alla oleva piste on tarkistettu sen sisään. Vartiota ei ole muutettu.
 *
 * EI YKSIKÄÄN OLE PELIKAUPUNGIN KOHDALLA. Etäisyys on mitattu jokaiseen
 * js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin on kirjattu
 * kunkin kohteen koordinaattirivin viereen. Maan lähin on Yaguarón 15,2
 * lautayksikön päässä Asunciónista; raja on 7. Kaikki yksitoista ovat
 * siis pääkartan merkkejä.
 *
 * KUVATON ERÄ. Kortti kantaa tekstin ja lähteen, ei kuvaa — sama linja
 * kuin erillä M1–M11. Faktat on tarkistettu en-Wikipediasta kohde
 * kerrallaan 6.9.2026, ja `lahde`-rivi kertoo artikkelin ja sen osan.
 */
export const MAASTOKOHTEET_PRY = [
  /* ================================================================
   * MAASTOKOHTEET — huippu ja kaksi jokea.
   * ============================================================== */
  {
    id: 'cerrotreskandu',
    nimi: 'Cerro Tres Kandú',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka korkea Paraguayn korkein kohta on?',
      'Mitä huipulle rakennettiin?',
    ],
    korostukset: ['Ybytyruzú|Ybytyruzún'],
    nappi: 'Maan korkein kohta, 842 metriä',
    // -56.16 E / -25.9017 N — en-Wikipedia "Cerro Tres Kandú"
    // lähin pelikaupunki: Asunción 53,7 lautayksikköä
    laudat: {
      maailmankartta: { x: 3961.3, y: 4094.3 },
    },
    teksti: 'Cerro Tres Kandú on Paraguayn korkein kohta, 842 metriä. Se sijaitsee '
      + 'General Eugenio Garayn kunnassa Guairán maakunnassa Ybytyruzún nimisessä '
      + 'kukkulajonossa, ja siitä käytetään myös nimeä Cerro Peró. Huippu oli tärkeä '
      + 'Paraguayn asevoimille, koska sille voitiin sijoittaa armeijan radiolinkin '
      + 'toistin; myös maan sähköyhtiö ANDE nosti sinne oman toistimensa. Laitteet '
      + 'ovat nykyään hylättyjä.',
    lahde: 'en-Wikipedia "Cerro Tres Kandú", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'apajoki',
    nimi: 'Apa',
    tyyppi: 'joki',
    kysymykset: [
      'Minkä kahden maan rajaa Apa merkitsee?',
      'Mihin jokeen Apa laskee?',
    ],
    korostukset: ['sivujoki|sivujoki'],
    nappi: 'Rajajoki pohjoisessa',
    // -57.99 E / -22.0906 N — en-Wikipedia "Apa River"
    // lähin pelikaupunki: Asunción 113,8 lautayksikköä
    laudat: {
      maailmankartta: { x: 3900.3, y: 3959.8 },
    },
    teksti: 'Apa on Paraguayn ja Brasilian joki ja Paraguayjoen sivujoki; Paraguayjoki '
      + 'puolestaan laskee Paranájokeen. Apa saa alkunsa Amambain kukkuloilta Brasilian '
      + 'Mato Grosso do Sulin osavaltiossa. Se merkitsee osaa Paraguayn ja Brasilian '
      + 'rajasta alkaen kaksoiskaupungeista Bella Vista Nortesta ja Bela Vistasta. '
      + 'Tärkeimmät sivu-uomat tulevat oikealta: Arroyo Estrella sekä Pirapucu, Caracol '
      + 'ja Perdido, jotka virtaavat Serra da Bodoquenalta.',
    lahde: 'en-Wikipedia "Apa River", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'tebicuary',
    nimi: 'Tebicuary',
    tyyppi: 'joki',
    kysymykset: [
      'Mitä joen suulla tapahtui vuonna 1868?',
      'Mikä kansallispuisto on joen yläjuoksulla?',
    ],
    korostukset: ['Kolmen liiton sota|Kolmen liiton sodan'],
    nappi: 'Sodan ylityspaikka lounaassa',
    // -58.1928 E / -26.6044 N — en-Wikipedia "Tebicuary River"
    // lähin pelikaupunki: Asunción 49,9 lautayksikköä
    laudat: {
      maailmankartta: { x: 3893.6, y: 4119.4 },
    },
    teksti: 'Tebicuary on Paraguayjoen sivujoki maan lounaisosassa. Se laskee '
      + 'Paraguayjokeen noin 45 kilometriä Formosasta etelään ja noin 30 kilometriä '
      + 'Pilarista pohjoiseen. Joen suu oli heinäkuussa 1868 Kolmen liiton sodan '
      + 'Tebicuaryn ylityksen paikka. Yläjuoksun valuma-alueella on San Rafaelin '
      + 'kansallispuisto.',
    lahde: 'en-Wikipedia "Tebicuary River", johdanto-osa (tarkistettu 6.9.2026).',
  },

  /* ================================================================
   * KOHTEET — historia, tekniikka, kulttuuri, kaupunki ja muu.
   * ============================================================== */
  {
    id: 'trinidadjajesus',
    nimi: 'Trinidad ja Jesús',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä jesuiittojen reduktiot olivat?',
      'Miksi guaranin kirjoitusasu piti keksiä?',
    ],
    korostukset: ['reduktio|lähetysasemien', 'guarani|guaranin'],
    nappi: 'Maailmanperintöä Itapúassa',
    // -55.7 E / -27.1333 N — en-Wikipedia "Jesuit Missions of La Santísima
    // Trinidad de Paraná and Jesús de Tavarangue"
    // lähin pelikaupunki: Iguazú 66,5 lautayksikköä
    laudat: {
      maailmankartta: { x: 3976.7, y: 4138.4 },
    },
    teksti: 'La Santísima Trinidad de Paranán ja Jesús de Tavaranguen jesuiittalähetysasemat '
      + 'ovat Itapúan maakunnassa Paraguayssa. Ne perustettiin 1609, ja työ jatkui 150 '
      + 'vuotta; Unesco liitti molemmat maailmanperintöluetteloon 1993. Ensimmäiset '
      + 'jesuiitat saapuivat Tucumániin 1586 ja seuraavana vuonna Asunciónin piispan '
      + 'pyynnöstä Paraguayhyn, ja he alkoivat rakentaa omavaraisia kyliä Misionesin ja '
      + 'Itapúan alueille. Työhön kuului guaranin kielen tutkiminen ja kirjoitusasun '
      + 'laatiminen, sillä guaranit eivät kirjoittaneet kieltään; lähetysasemien '
      + 'ympärille syntyi 2 000–3 000 asukkaan yhteisöjä. Trinidadia pidetään '
      + 'lähetysasemista suurimpana, ja sen kirkossa on yhdestä kivestä veistetty '
      + 'alttari.',
    lahde: 'en-Wikipedia "Jesuit Missions of La Santísima Trinidad de Paraná and Jesús '
      + 'de Tavarangue", johdanto-osa sekä osiot "History" ja "Santísima Trinidad del '
      + 'Paraná Ruins" (tarkistettu 6.9.2026).',
  },
  {
    id: 'sancosmeydamian',
    nimi: 'San Cosme y Damián',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kuka piti lähetysasemalla observatoriota?',
      'Miksi juuri tämä raunio on erilainen kuin muut?',
    ],
    korostukset: ['observatorio|observatorio'],
    nappi: '1700-luvun tähtitorni Paranán rannalla',
    // -56.35 E / -27.32 N — en-Wikipedia "San Cosme y Damián"
    // lähin pelikaupunki: Asunción 83,9 lautayksikköä
    laudat: {
      maailmankartta: { x: 3955, y: 4145.1 },
    },
    teksti: 'San Cosme y Damián on Itapúan maakunnan piirikunta 80 kilometriä '
      + 'Encarnaciónista länteen, Paranájoen varrella. Jesuiitat perustivat samannimisen '
      + 'lähetysaseman 1632, ja asukkaat joutuivat siirtymään useaan kertaan ennen kuin '
      + 'asettuivat Paranán pohjoisrannalle 1718. Rauniot ovat Paraguayn ainoat, joissa '
      + 'on yhä toimiva kirkko: sitä käytetään edelleen jumalanpalveluksiin ja '
      + 'yhteisötilana, ja siinä on alkuperäisiä puuveistoksia, joista osassa on yhä '
      + 'alkuperäinen väritys. 1700-luvulla lähetysasemalla oli observatorio, sillä '
      + 'isä Buenaventura Suárez saapui sinne 1703 ja työskenteli kuolemaansa 1750 asti.',
    lahde: 'en-Wikipedia "San Cosme y Damián", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'cerrocora',
    nimi: 'Cerro Corá',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä Cerro Corássa tapahtui 1. maaliskuuta 1870?',
      'Kuinka vanhoja puiston kalliopiirrokset ovat?',
    ],
    korostukset: ['kalliopiirros|kalliopiirroksia'],
    nappi: 'Maan suurin suojelualue ja sodan päätepiste',
    // -56.1833 E / -22.65 N — en-Wikipedia "Cerro Corá National Park"
    // lähin pelikaupunki: Campo Grande 92,8 lautayksikköä
    laudat: {
      maailmankartta: { x: 3960.6, y: 3979.4 },
    },
    teksti: 'Cerro Corán kansallispuisto on Paraguayn suurin suojelualue, 5 538 hehtaaria, '
      + 'ja se sijaitsee Amambayn maakunnassa 45 kilometriä Pedro Juan Caballerosta ja '
      + 'Brasilian rajasta. Puisto perustettiin 11. helmikuuta 1976, ja se on yhtä lailla '
      + 'historiallinen paikka: Kolmen liiton sodan viimeinen taistelu käytiin täällä '
      + '1. maaliskuuta 1870 Aquidabán Niguín puron rannalla, ja siinä kuoli Paraguayn '
      + 'johtaja Francisco Solano López. Kallionsuojissa on kalliopiirroksia, joista osa '
      + 'ajoitettiin 2008 noin 5 000 vuoden ikäisiksi; ajoituksen teki Altamiran '
      + 'kansallismuseon ja tutkimuskeskuksen kalliotaideryhmä. Alue oli aikoinaan '
      + 'koskematonta sademetsää, joka hakattiin, ja suojelu tuli vasta sen jälkeen. '
      + 'Seudulla asuu nykyään paï tavyterá -kansa.',
    lahde: 'en-Wikipedia "Cerro Corá National Park", johdanto-osa sekä osiot "Background", '
      + '"History" ja "Culture" (tarkistettu 6.9.2026).',
  },
  {
    id: 'ybycui',
    nimi: 'Ybycuí',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mitä La Rosadassa valmistettiin?',
      'Mitä valimolle tapahtui sodassa?',
    ],
    korostukset: ['valimo|valimo'],
    nappi: 'La Rosadan rautavalimo',
    // -57.05 E / -26.0167 N — en-Wikipedia "Ybycuí"
    // lähin pelikaupunki: Asunción 32,1 lautayksikköä
    laudat: {
      maailmankartta: { x: 3931.7, y: 4098.4 },
    },
    teksti: 'Ybycuí on maaseutuyhteisö Paraguarín maakunnassa noin 120 kilometriä '
      + 'Asunciónista. Nimi tarkoittaa guaranin kielellä hiekkaista. Paikkakunnalla on '
      + 'rautavalimo ja asevarikko Minas Cué, jota kutsutaan nimellä La Rosada; se toimi '
      + 'Carlos Antonio Lópezin aikaan ja valmisti aseita, sotilastarvikkeita ja osia '
      + 'Paraguayn laivaston aluksiin. Kolmen liiton sodan aikana siellä tehtiin luoteja '
      + 'ja kiväärejä, kunnes liittoutuneiden joukot valtasivat ja tuhosivat sen. La '
      + 'Rosada on nykyään museo Ybycuín kansallispuiston sisällä, ja samassa puistossa '
      + 'on Salto Mina eli Salto Cristal -putous.',
    lahde: 'en-Wikipedia "Ybycuí", johdanto-osa sekä osiot "Toponimics" ja "Tourism" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'filadelfia',
    nimi: 'Filadelfia',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Ketkä perustivat Filadelfian?',
      'Miksi kaupunki kerää sadevettä maanalaisiin säiliöihin?',
    ],
    korostukset: ['mennoniitta|mennoniitat'],
    nappi: 'Mennoniittojen kaupunki Chacossa',
    // -60.03 E / -22.34 N — en-Wikipedia "Filadelfia"
    // lähin pelikaupunki: Asunción 131,4 lautayksikköä
    laudat: {
      maailmankartta: { x: 3832.3, y: 3968.5 },
    },
    teksti: 'Filadelfia on Boquerónin maakunnan pääkaupunki Gran Chacossa Länsi-Paraguayssa '
      + 'ja Fernheimin siirtokunnan keskus. Sen perustivat 1930 Neuvostoliitosta paenneet '
      + 'venäläiset mennoniitat, ja noin 20 000 asukkaallaan se on suurin taajama 400 '
      + 'kilometrin säteellä. Kaupungissa on museo, kirjasto, radioasema ja sairaala; '
      + 'museon esineistössä on siirtolaisten venäläisiä päällystakkeja. Siirtokunnan '
      + 'kylien ympärillä on alkuperäiskansojen alueita, joilla asuvat muun muassa '
      + 'chulupít, lenguat, toba-pilagát, ayoreot ja sanapanát. Juomavesi otetaan '
      + 'maanalaisista säiliöistä, joita sateet täyttävät epäsäännöllisesti, sillä '
      + 'pohjavesi on liian suolaista juotavaksi.',
    lahde: 'en-Wikipedia "Filadelfia", johdanto-osa sekä osiot "History" ja '
      + '"Infrastructure" (tarkistettu 6.9.2026).',
  },
  {
    id: 'yaguaron',
    nimi: 'Yaguarón',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuinka kauan Yaguarónin kirkon rakentaminen kesti?',
      'Kuka kaupungissa syntynyt mies hallitsi Paraguayta 1814–1840?',
    ],
    korostukset: ['fransiskaani|fransiskaanien'],
    nappi: 'Fransiskaanien kirkko kukkulan juurella',
    // -57.2833 E / -25.5667 N — en-Wikipedia "Yaguarón"
    // lähin pelikaupunki: Asunción 15,2 lautayksikköä
    laudat: {
      maailmankartta: { x: 3923.9, y: 4082.4 },
    },
    teksti: 'Yaguarón on kaupunki Paraguarín maakunnassa saman nimisen kukkulan juurella, '
      + '48 kilometriä Asunciónista. Se alkoi fransiskaanien lähetysasemana guaraneille. '
      + 'Kaupungissa on kuuluisa kirkko, jonka rakentaminen alkoi 1640 fray Alonso de '
      + 'Buenaventuran johdolla ja kesti 60 vuotta; sitä pidetään yhtenä Paraguayn '
      + 'kauneimmista fransiskaanirakennuksista. Yaguarónissa syntyi 1766 José Gaspar '
      + 'Rodríguez de Francia, joka hallitsi Paraguayta 1814–1840 ja jonka '
      + 'yksinvaltaisuus toi hänelle nimen El Supremo; hänen talonsa on nykyään museo '
      + 'parin sadan metrin päässä kirkosta. Alkuperäinen nimi Jaguarú tarkoittaa '
      + 'guaranien tarustossa jättimäistä koiraa tai jaguaaria.',
    lahde: 'en-Wikipedia "Yaguarón", johdanto-osa sekä osiot "Toponymy", "History" ja '
      + '"Tourism" (tarkistettu 6.9.2026).',
  },
  {
    id: 'concepcionpry',
    nimi: 'Concepción',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Milloin Concepción perustettiin?',
      'Mistä kaupungin vauraus tuli 1900-luvun alussa?',
    ],
    korostukset: ['jokisatama|jokisatamana'],
    nappi: 'Pohjoisen jokisatama',
    // -57.43 E / -23.4 N — en-Wikipedia "Concepción, Paraguay"
    // lähin pelikaupunki: Asunción 67,6 lautayksikköä
    laudat: {
      maailmankartta: { x: 3919, y: 4005.8 },
    },
    teksti: 'Concepción on kaupunki ja piirikunta Pohjois-Paraguayssa ja Concepciónin '
      + 'maakunnan pääkaupunki. Se sijaitsee Paraguayjoen varrella, ja sen perusti 1773 '
      + 'kuvernööri Agustín Fernando de Pinedo. Kaupunki vaurastui 1900-luvun alussa '
      + 'jokisatamana ja maan pohjoisosan keskuksena, kun Gran Chacon uudet luonnonvarat '
      + 'otettiin käyttöön. Sillä oli myös osansa Paraguayn sisällissodassa 1947. '
      + 'Kansallistie 5 yhdistää sen Pedro Juan Caballeroon ja Asunciónin suuntaan.',
    lahde: 'en-Wikipedia "Concepción, Paraguay", johdanto-osa ja osio "Transportation" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'guairanputoukset',
    nimi: 'Guairán putoukset',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi putoukset katosivat?',
      'Kuinka korkeat Guairán putoukset olivat?',
    ],
    korostukset: ['tekojärvi|tekoaltaan'],
    nappi: 'Vesiputous, joka hukutettiin 1982',
    // -54.2836 E / -24.0731 N — en-Wikipedia "Guaíra Falls"
    // lähin pelikaupunki: Iguazú 57,5 lautayksikköä
    laudat: {
      maailmankartta: { x: 4023.9, y: 4029.5 },
    },
    teksti: 'Guairán putoukset olivat Paranájoen valtavien vesiputousten sarja Paraguayn ja '
      + 'Brasilian rajalla. Ne lakkasivat olemasta 1982, kun Itaipún padon tekoaltaan vesi '
      + 'peitti ne. Virtaamaltaan ne olivat maailman suurimpia putouksia: julkaistut luvut '
      + 'vaihtelevat 13 000:sta 50 000 kuutiometriin sekunnissa. Putouksia oli 18 '
      + 'seitsemässä ryhmässä — siitä portugalinkielinen nimi Sete Quedas eli seitsemän '
      + 'putousta — ja joki kapeni niiden kohdalla 380 metristä 60 metriin. Kokonaiskorkeus '
      + 'oli noin 114 metriä ja suurin yksittäinen putous 40 metriä; kohinan kuuli 30 '
      + 'kilometrin päähän. Padon rakentaminen perustui Paraguayn ja Brasilian väliseen '
      + 'sopimukseen vuodelta 1973.',
    lahde: 'en-Wikipedia "Guaíra Falls", johdanto-osa ja osio "Submergence" '
      + '(tarkistettu 6.9.2026).',
  },
];
