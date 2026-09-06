/*
 * MAASTOKOHTEET — BOL. Bolivian maasto ja kohteet napautettaviksi.
 *
 * ── MAAILMAN ERÄ M1 (6.9.2026): ETELÄ-AMERIKKA ────────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Erän perustelut, kiintiö ja työtapa on kirjattu kokonaisuudessaan
 * sisartiedostoon js/packs/maastokohteet-arg.js; tässä on vain se, mikä
 * on Bolivialle ominaista.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN
 * (tools/johda-maastokohteet.mjs `laudat`, asteet en-Wikipedian
 * coordinates-propista). Vain maailmankartan rivi — Euroopan
 * erillislaudasta on luovuttu (Raamattu 30.8.2026).
 *
 * VARTIO 7a JA MAA ILMAN OMAA AINEISTOA. tools/maastoaineisto/BOL.json
 * -tiedostoa ei ole, joten maastokohteet on valittu käsin. Fokuslehden
 * rajaus sen sijaan ON olemassa (js/packs/fokus-grc.js FOKUS_POHJAT.BOL,
 * x 3437,9…3991,0 ja y 3455,3…4072,1), ja savukkeen
 * (tools/savukkeet/savuke-maastokohteet.mjs) vartio 7a pätee tähän
 * erään sellaisenaan: jokainen alla oleva piste on tarkistettu
 * rajauksen sisään. Vartiota ei siis ole ohitettu vaan noudatettu.
 *
 * MIKÄ JÄTETTIIN POIS. Titicaca on pelikaupunki (js/packs/maailmankartta.js
 * CITIES) ja samalla maailmankartan järvinimi, joten sitä ei voi ottaa
 * kohteeksi (sääntö N3, sama nimi kartalla vain kerran). Mamoré on jo
 * maailmankartan jokinimi. Salar de Uyuni on mukana KOHTEENA eikä
 * maastokohteena: suola-aavikko ei ole mikään laskurin viidestä
 * maastotyypistä (vuori, joki, meri, järvi, saari), ja sama ratkaisu on
 * tehty aiemmin Gobille ja Rub al-Khalille.
 *
 * EI YKSIKÄÄN OLE PELIKAUPUNGIN KOHDALLA. Lähin on Samaipata 25,3
 * lautayksikön päässä Santa Cruzista; raja KAUPUNGIN_KOHDALLA_SADE on 7
 * (js/fokuskohteet.js). Kaikki yksitoista ovat pääkartan merkkejä.
 *
 * KUVATON ERÄ. Faktat en-Wikipediasta kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_BOL = [
  /* ================================================================
   * MAASTOKOHTEET — kaksi vuorta ja joki.
   * ============================================================== */
  {
    id: 'sajama',
    nimi: 'Nevado Sajama',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä nimi Sajama tarkoittaa?',
      'Mikä puu kasvaa täällä viiden kilometrin korkeudessa?',
    ],
    korostukset: ['Polylepis tarapacana|Polylepis tarapacana'],
    nappi: 'Bolivian korkein huippu',
    // -68.8833 E / -18.1 N — en-Wikipedia "Nevado Sajama"
    // lähin pelikaupunki: Titicaca 80,4 lautayksikköä
    laudat: {
      maailmankartta: { x: 3537.2, y: 3821.4 },
    },
    teksti: 'Nevado Sajama on sammunut tulivuori ja Bolivian korkein huippu; se '
      + 'sijaitsee Oruron departementissa Sajaman kansallispuistossa. Vuori on '
      + 'kerrostulivuori, joka on kasvanut useiden laavakupolien päälle, eikä ole '
      + 'varmaa, milloin se viimeksi purkautui — mahdollisesti pleistoseenissa tai '
      + 'holoseenissa. Huippua peittää jääkalotti, ja rinteillä kasvaa Polylepis '
      + 'tarapacana -puita aina viiden kilometrin korkeuteen asti. Nimi tulee aymaran '
      + 'sanoista chak-jjaña ja tarkoittaa suunnilleen länteen päin. Chilen raja on '
      + 'vain 18,6 kilometrin päässä, ja vuoren länsijuurella on Sajaman kylä.',
    lahde: 'en-Wikipedia "Nevado Sajama", johdanto-osa sekä osiot "Toponymy" ja '
      + '"Geography and geomorphology" (tarkistettu 6.9.2026).',
  },
  {
    id: 'illimani',
    nimi: 'Illimani',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä apu on?',
      'Missä Cordillera Real kulkee?',
    ],
    korostukset: ['apu|apuna'],
    nappi: 'La Pazin oma vuori',
    // -67.7822 E / -16.6394 N — en-Wikipedia "Illimani"
    // lähin pelikaupunki: Titicaca 59,6 lautayksikköä
    laudat: {
      maailmankartta: { x: 3573.9, y: 3771.2 },
    },
    teksti: 'Illimani on poimuvuori Bolivian Cordillera Realissa, noin 82 kilometriä '
      + 'La Pazista kaakkoon. Huippu on 6 438 metrissä, mikä tekee siitä vuorijonon '
      + 'korkeimman ja Bolivian toiseksi korkeimman vuoren heti Sajaman jälkeen. Massiivi '
      + 'on neljä päähuippua pohjois–eteläakselilla, ja se on metamorfista kiveä ja '
      + 'syväkivigraniittia; lumiraja kulkee noin 4 570 metrissä. Vuori seisoo '
      + 'Altiplanon ylätasangon ja Yungasin syvien laaksojen välissä, ja sen '
      + 'symmetriset lumihuiput näkyvät La Pazin laaksoon — siksi siitä on tullut '
      + 'kaupungin maamerkki. Andien perinteessä Illimania kunnioitetaan apuna eli '
      + 'suojelevana vuorenhenkenä.',
    lahde: 'en-Wikipedia "Illimani", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'desaguadero',
    nimi: 'Desaguadero',
    tyyppi: 'joki',
    kysymykset: [
      'Mihin Titicacan vedet päätyvät?',
      'Ketkä ovat uru muratut?',
    ],
    korostukset: ['uru muratu|uru muratujen'],
    nappi: 'Titicacan ainoa laskujoki',
    // -67.1 E / -18.5 N — en-Wikipedia "Desaguadero River (Bolivia and Peru)"
    // lähin pelikaupunki: Titicaca 119,2 lautayksikköä
    laudat: {
      maailmankartta: { x: 3596.7, y: 3835.1 },
    },
    teksti: 'Desaguadero on Bolivian ja Perun jakama joki, joka laskee Titicacajärveä '
      + 'sen eteläpäästä. Aymaran- ja ketšuankielisiä nimiä sillä on useita, muun muassa '
      + 'Risawariru ja Uchusumain. Joki virtaa etelään ja vie noin viisi prosenttia '
      + 'järven tulvavesistä Uru Uru- ja Poopó-järviin; sen lähde pohjoisessa on aivan '
      + 'Perun rajan tuntumassa. Kulkukelpoinen se on vain pienillä veneillä, ja sen '
      + 'varrella elää alkuperäiskansojen yhteisöjä, kuten uru muratujen kylät.',
    lahde: 'en-Wikipedia "Desaguadero River (Bolivia and Peru)", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  /* ================================================================
   * ERÄ M1 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   * ============================================================== */
  {
    id: 'tiwanaku',
    nimi: 'Tiwanaku',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä nimi taypiqala tarkoittaa?',
      'Miksi kaupungin ikää on ollut vaikea määrittää?',
    ],
    korostukset: ['taypiqala|taypiqala'],
    nappi: 'Kivi maailman keskellä',
    // -68.6733 E / -16.555 N — en-Wikipedia "Tiwanaku"
    // lähin pelikaupunki: Titicaca 34,2 lautayksikköä
    laudat: {
      maailmankartta: { x: 3544.2, y: 3768.3 },
    },
    teksti: 'Tiwanaku on esikolumbiaaninen kaupunkiraunio Länsi-Boliviassa lähellä '
      + 'Titicacajärveä, noin seitsemänkymmenen kilometrin päässä La Pazista, ja yksi '
      + 'Etelä-Amerikan laajimmista muinaisjäännöksistä. Jäänteitä on nykyään noin '
      + 'neljän neliökilometrin alalla: koristeltua keramiikkaa, monumentteja ja '
      + 'megaliittisia kivilohkareita, muun muassa terassipenger Akapana ja '
      + 'Pumapunkun porrastasanne. Varovaisen arvion mukaan paikassa asui vuonna 800 '
      + 'noin 10 000–20 000 ihmistä. Espanjalainen valloittaja Pedro Cieza de León '
      + 'kirjasi paikan ensimmäisenä 1549. Jesuiittakronikoitsija Bernabé Cobon mukaan '
      + 'kaupungin nimi oli aikanaan taypiqala, aymaraksi kivi keskellä — uskomus '
      + 'kertoi, että se sijaitsi maailman keskipisteessä.',
    lahde: 'en-Wikipedia "Tiwanaku", johdanto-osa sekä osiot "Site history" ja '
      + '"Monumental architecture" (tarkistettu 6.9.2026).',
  },
  {
    id: 'cerrorico',
    nimi: 'Cerro Rico',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka suuri osa maailman hopeasta tuli täältä?',
      'Miksi vuoren huippu vajoaa?',
    ],
    korostukset: ['silikoosi|silikoosin'],
    nappi: 'Vuori, joka maksoi imperiumin',
    // -65.7522 E / -19.6208 N — en-Wikipedia "Cerro Rico"
    // lähin pelikaupunki: Santa Cruz 106,7 lautayksikköä
    laudat: {
      maailmankartta: { x: 3641.6, y: 3873.9 },
    },
    teksti: 'Cerro Rico eli Rikas vuori kohoaa Potosín kaupungin vieressä, ja siitä '
      + 'louhittu hopea rahoitti Espanjan imperiumia. Arviolta 85 prosenttia Keski-Andien '
      + 'hopeasta tuli siirtomaa-aikana juuri täältä, ja 1500-luvulta 1700-luvulle vuori '
      + 'tuotti 80 prosenttia koko maailman hopeasta; louhinta alkoi 1545. Potosísta '
      + 'kasvoi yksi Uuden maailman suurimmista kaupungeista. Vuorta kaivetaan yhä: '
      + 'osuuskunnat työllistävät noin 15 000 kaivosmiestä, ja koska suojaimia ei juuri '
      + 'ole, moni sairastuu pölystä silikoosin ja elää keskimäärin nelikymppiseksi. '
      + 'Vuosisatojen louhinta on ontonut vuoren sisuksen niin, että huipulle avautui '
      + '2011 kuoppa, joka jouduttiin täyttämään erittäin kevyellä sementillä — ja huippu '
      + 'vajoaa yhä muutaman senttimetrin vuodessa.',
    lahde: 'en-Wikipedia "Cerro Rico", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'sucrenkaupunki',
    nimi: 'Sucre',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi Boliviassa on kaksi pääkaupunkia?',
      'Kenen mukaan Sucre on nimetty?',
    ],
    korostukset: ['Charcas|Charcasin'],
    nappi: 'Pääkaupunki, joka menetti hallituksen',
    // -65.2619 E / -19.0431 N — en-Wikipedia "Sucre"
    // lähin pelikaupunki: Santa Cruz 82,0 lautayksikköä
    laudat: {
      maailmankartta: { x: 3657.9, y: 3853.9 },
    },
    teksti: 'Sucre on Bolivian perustuslaillinen pääkaupunki ja maan korkeimman '
      + 'oikeuden kotipaikka; se on 2 790 metrissä, mikä tekee siitä maailman toiseksi '
      + 'korkeimman pääkaupungin heti Quiton jälkeen. Kaupungilla on ollut monta nimeä: '
      + 'La Plata, Charcas ja Chuquisaca. Se oli 1800-luvulle asti Charcasin alueen '
      + 'oikeudellinen, uskonnollinen ja sivistyksellinen keskus, ja se julistettiin '
      + 'itsenäisen Ylä-Perun väliaikaiseksi pääkaupungiksi heinäkuussa 1826. Nykyisen '
      + 'nimensä se sai 1839 vapaustaistelija Antonio José de Sucren mukaan. Kun Potosín '
      + 'hopea menetti merkityksensä, hallitus siirtyi 1898 La Paziin — mutta '
      + 'oikeuslaitos jäi. Vanhakaupunki on yksi läntisen pallonpuoliskon parhaiten '
      + 'säilyneistä siirtomaakeskustoista ja maailmanperintökohde vuodesta 1991.',
    lahde: 'en-Wikipedia "Sucre", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'chiquitos',
    nimi: 'Chiquitosin lähetysasemat',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mikä reduktio oli?',
      'Miksi juuri nämä lähetysasemat säilyivät?',
    ],
    korostukset: ['reduktio|reduktioita'],
    nappi: 'Barokkimusiikkia sademetsän reunalla',
    // -62.0 E / -16.4 N — en-Wikipedia "Jesuit Missions of Chiquitos"
    // lähin pelikaupunki: Santa Cruz 61,6 lautayksikköä
    laudat: {
      maailmankartta: { x: 3766.7, y: 3763 },
    },
    teksti: 'Chiquitosin jesuiittalähetysasemat ovat Santa Cruzin departementissa '
      + 'Itä-Boliviassa, ja kuusi entistä asemaa liitettiin maailmanperintöluetteloon '
      + '1990. Espanjan kruunun lähettämät jesuiitat perustivat 76 vuoden aikana '
      + 'yksitoista asutusta silloiselle Chiquitosin rajaseudulle ja rakensivat '
      + 'kirkkoja tyylillä, joka sekoitti eurooppalaista ja alkuperäiskansojen '
      + 'rakennustaitoa. Asukkaille opetettiin eurooppalaista musiikkia osana '
      + 'käännytystyötä. Asemat olivat omavaraisia reduktioita ja käytännössä '
      + 'riippumattomia kruunusta. Kun jesuiitat karkotettiin 1767, useimmat '
      + 'Etelä-Amerikan reduktiot autioituivat — Chiquitosin asemat ovat poikkeus, sillä '
      + 'sekä asutus että sen kulttuuri jäivät henkiin. Kirkkojen suuri korjaustyö alkoi '
      + '1972 sveitsiläisen jesuiitta-arkkitehdin Hans Rothin johdolla.',
    lahde: 'en-Wikipedia "Jesuit Missions of Chiquitos", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'yungastie',
    nimi: 'Yungas-tie',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi tiellä ajettiin vasemmalla?',
      'Kuka tien rakensi?',
    ],
    korostukset: ['vasemmanpuoleinen|vasemmanpuoleista'],
    nappi: 'Maailman vaarallisin tie',
    // -67.72 E / -16.2 N — en-Wikipedia "Yungas Road" (Coroicon puoleinen osuus)
    // lähin pelikaupunki: Titicaca 56,0 lautayksikköä
    laudat: {
      maailmankartta: { x: 3576, y: 3756.2 },
    },
    teksti: 'Yungas-tie eli Camino de la Muerte, kuoleman tie, on 64 kilometriä pitkä '
      + 'reitti La Pazista Yungasin alueelle. Bolivian hallitus rakennutti sen '
      + '1930-luvulla yhdistämään pääkaupungin pohjoisen sademetsiin, ja suuren osan '
      + 'työstä tekivät Chaco-sodassa vangitut paraguaylaiset. Paikoin tie on alle kolme '
      + 'metriä leveä, ja sade, sumu, maanvyöryt ja pystysuorat pudotukset tekivät siitä '
      + 'yleisesti maailman vaarallisimpana pidetyn tien: Amerikan kehityspankki antoi '
      + 'sille tuon nimityksen 1995, ja onnettomuuksissa kuoli keskimäärin 96 ihmistä '
      + 'vuodessa. Toisin kuin muualla Boliviassa, tiellä ajettiin vasemmanpuoleista '
      + 'liikennettä, jotta kuljettaja näkisi paremmin, kuinka lähellä reunaa pyörä '
      + 'kulkee. Uusi kaksikaistainen tie valmistui 2006, ja vanha reitti on nyt '
      + 'lähinnä pyöräilijöiden — noin 25 000 matkailijaa vuodessa.',
    lahde: 'en-Wikipedia "Yungas Road", johdanto-osa sekä osiot "History" ja '
      + '"Traffic violence" (tarkistettu 6.9.2026).',
  },
  {
    id: 'salardeuyuni',
    nimi: 'Salar de Uyuni',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi satelliitit tarvitsevat tätä paikkaa?',
      'Mistä suola-aavikko syntyi?',
    ],
    korostukset: ['korkeusmittari|korkeusmittarien'],
    nappi: 'Maailman suurin peili',
    // -67.4833 E / -20.1338 N — en-Wikipedia "Salar de Uyuni"
    // lähin pelikaupunki: Antofagasta 147,4 lautayksikköä
    laudat: {
      maailmankartta: { x: 3583.9, y: 3891.6 },
    },
    teksti: 'Salar de Uyuni on maailman suurin suola-aavikko, noin 10 582 '
      + 'neliökilometriä, Potosín departementissa 3 656 metrin korkeudessa. Se syntyi, '
      + 'kun seitsemän myöhäispleistoseenin järveä kuivui vähitellen ja jätti jälkeensä '
      + 'paksut suolakerrostumat. Kuori on kahdeksan metriä paksu ja poikkeuksellisen '
      + 'tasainen: koko aavikon korkeusvaihtelu on alle metrin. Kuoren alla on suolaliuos, '
      + 'jossa on runsaasti litiumia. Sateen jälkeen pinnalle jää ohut tyyni vesikerros, '
      + 'ja aavikko muuttuu 129 kilometriä leveäksi peiliksi. Laajuus, pilvetön taivas ja '
      + 'tasaisuus tekevät siitä ihanteellisen paikan maata havainnoivien satelliittien '
      + 'korkeusmittarien kalibrointiin, ja se on myös flamingojen pesimäalue.',
    lahde: 'en-Wikipedia "Salar de Uyuni", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'oruronkarnevaali',
    nimi: 'Oruron karnevaali',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi juhla piilotettiin katoliseen muotoon?',
      'Mikä diablada on?',
    ],
    korostukset: ['diablada|Diablada'],
    nappi: 'Piruja pyhiinvaelluksella',
    // -67.1167 E / -17.9833 N — en-Wikipedia "Carnaval de Oruro"
    // lähin pelikaupunki: Titicaca 105,5 lautayksikköä
    laudat: {
      maailmankartta: { x: 3596.1, y: 3817.3 },
    },
    teksti: 'Oruron karnevaali on uskonnollinen ja kulttuurinen juhla, joka alkoi '
      + 'alkuperäiskansojen menona ja muuttui myöhemmin Socavónin Neitsyen ympärille '
      + 'rakentuvaksi kristilliseksi rituaaliksi. Espanjalaiset kielsivät urujen '
      + 'itu-menot 1600-luvulla, mutta juhlaa jatkettiin katolisena kynttilänpäivän '
      + 'riittinä: kristilliset kuvat peittivät andilaiset jumalat, ja pyhimykset '
      + 'astuivat pienempien jumaluuksien tilalle. Legendan mukaan Neitsyt Marian kuva '
      + 'ilmestyi 1756 ihmeenomaisesti Oruron rikkaimman hopeakaivoksen kuiluun. Yli 48 '
      + 'tanssiryhmää esittää kahdeksaatoista eri kansantanssia ja kulkee karnevaalin '
      + 'jokaisena lauantaina pyhiinvaelluksena Socavónin kirkolle; johtavaksi tanssiksi '
      + 'on noussut Diablada eli pirujen tanssi. Unesco on nimennyt karnevaalin '
      + 'suullisen ja aineettoman perinnön mestariteokseksi.',
    lahde: 'en-Wikipedia "Carnaval de Oruro", johdanto-osa ja osio "Background" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'samaipata',
    nimi: 'El Fuerte de Samaipata',
    tyyppi: 'historia',
    kysymykset: [
      'Onko Samaipata linnoitus vai temppeli?',
      'Ketkä kaikki ovat rakentaneet paikkaa?',
    ],
    korostukset: ['chané|chanét'],
    nappi: 'Kolmen kansan veistämä kallio',
    // -63.8194 E / -18.1783 N — en-Wikipedia "El Fuerte de Samaipata"
    // lähin pelikaupunki: Santa Cruz 25,3 lautayksikköä
    laudat: {
      maailmankartta: { x: 3706, y: 3824 },
    },
    teksti: 'El Fuerte de Samaipata on esikolumbiaaninen muinaisjäännös ja '
      + 'maailmanperintökohde Andien itäisillä alarinteillä Santa Cruzin departementissa. '
      + 'Nimestään huolimatta se ei ollut vain linnoitus vaan myös uskonnollinen, '
      + 'seremoniallinen ja asuttu paikka. Kohde on ainutlaatuinen siksi, että siinä on '
      + 'kolmen eri kulttuurin rakennuksia: paikan aloittivat arawak-sukuiset chanét noin '
      + 'vuonna 300 muotoilemalla suurta kalliota, inkat rakensivat 1400- ja 1500-luvun '
      + 'vaihteessa aukion ja asuinrakennuksia laajentaessaan valtakuntaansa itään, ja '
      + 'espanjalaiset lisäsivät arabialais-andalusialaista rakennustyyliä. Kaikki kolme '
      + 'kärsivät ava guaraní -sotureiden hyökkäyksistä. Espanjalaiset hylkäsivät paikan '
      + 'pian ja perustivat 1618 Samaipatan kylän viereiseen laaksoon.',
    lahde: 'en-Wikipedia "El Fuerte de Samaipata", johdanto-osa ja osio "Incas" '
      + '(tarkistettu 6.9.2026).',
  },
];
