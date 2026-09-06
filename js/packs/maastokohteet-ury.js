/*
 * MAASTOKOHTEET — URY. Uruguayn maasto ja kahdeksan kohdetta.
 *
 * ── MAAILMAN ERÄ M18 (6.9.2026) ───────────────────────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Uruguaylla ei ollut ennen tätä erää yhtäkään karttamerkkiä, ei
 * eläintäkyä eikä skandaalia (docs/moduulit/karttanostot-kattavuus.md,
 * Etelä-Amerikka). Kiintiö on kahdeksan KOHDETTA, kolme MAASTOKOHDETTA,
 * yksi eläintäky ja kaksi skandaalia; kaksi jälkimmäistä asuvat omissa
 * pakeissaan (js/packs/elaintakyt.js, js/packs/skandaalit.js).
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Paikat on johdettu tools/johda-maastokohteet.mjs:n `laudat`-funktiolla
 * en-Wikipedian coordinates-propin asteista. Vain maailmankartan rivi
 * (Euroopan erillislaudasta on luovuttu, Raamattu 30.8.2026).
 *
 * MIKSI EI JOKEA. Uruguayn kolme luonnollista jokivaihtoehtoa ovat
 * kaikki poissa säännöllä N3: Uruguayjoki ja Rio Negro ovat jo laudan
 * omia jokinimiä (js/packs/maailmankartta-nimet.js) ja Río de la Plata
 * on Argentiinan listassa (js/packs/maastokohteet-arg.js). Maaston
 * kiintiö täyttyy siis huipulla, laguunilla ja valtamerellä.
 *
 * KAKSI PISTETTÄ ON ASETETTU KÄSIN, JA MOLEMMAT ON PERUSTELTU RIVILLÄ.
 * Atlantilla ei ole maakohtaista koordinaattia (artikkelin oma
 * keskipiste on −25 / 0), joten piste on ulapalla Rochan edustalla —
 * sama ratkaisu kuin Namibialla ja Portugalilla. Merínin laguunin
 * artikkelikoordinaatti (−52,83 / −32,75) osuu laguunin Brasilian
 * puoleiseen osaan, joten merkki on siirretty Uruguayn puoleiselle
 * rannalle; laguuni on artikkelin mukaan molempien maiden.
 *
 * VARTIO 7a. tools/savukkeet/savuke-maastokohteet.mjs vaatii, että
 * jokainen kohde osuu maan fokuslehden rajaukseen (`osuuLehteen`).
 * Uruguaylla rajaus on olemassa (js/packs/fokus-grc.js FOKUS_POHJAT.URY,
 * x 3853,4…4094,9, y 4213,7…4459,8), joten vartio PÄTEE ja jokainen
 * alla oleva piste on tarkistettu sen sisään. Vartiota ei ole muutettu.
 *
 * EI YKSIKÄÄN OLE PELIKAUPUNGIN KOHDALLA. Etäisyys on mitattu jokaiseen
 * js/packs/maailmankartta.js CITIES-kaupunkiin. Maan lähin merkki on
 * Colonia del Sacramento 27,2 lautayksikön päässä Buenos Airesista ja
 * toiseksi lähin Punta del Este 42,5 yksikön päässä Montevideosta; raja
 * KAUPUNGIN_KOHDALLA_SADE on 7 (js/fokuskohteet.js). Kaikki yksitoista
 * ovat siis pääkartan merkkejä.
 *
 * KUVATON ERÄ. Faktat on tarkistettu en-Wikipediasta kohde kerrallaan
 * 6.9.2026, ja `lahde`-rivi kertoo artikkelin ja sen osan.
 */
export const MAASTOKOHTEET_URY = [
  /* ================================================================
   * MAASTOKOHTEET — huippu, laguuni ja valtameri.
   * ============================================================== */
  {
    id: 'cerrocatedral',
    nimi: 'Cerro Catedral',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka korkea Uruguayn korkein kohta on?',
      'Miksi maan korkein kohta vaihtui 1973?',
    ],
    korostukset: ['Cuchilla Grande|Cuchilla Grandeen'],
    nappi: 'Maan korkein kohta, 513,66 metriä',
    // -54.6744 E / -34.3822 N — en-Wikipedia "Cerro Catedral (Uruguay)"
    // lähin pelikaupunki: Montevideo 52,7 lautayksikköä
    laudat: {
      maailmankartta: { x: 4010.9, y: 4404.3 },
    },
    teksti: 'Cerro Catedral on Uruguayn korkein kohta, 513,66 metriä. Se kohoaa Maldonadon '
      + 'maakunnan pohjoisosassa Aiguán kunnassa Sierra Carapén kukkulajonossa, joka '
      + 'kuuluu laajempaan Cuchilla Grandeen. Nimi tulee huipun kallioiden erikoisista '
      + 'muodoista, ja kukkulasta käytetään myös nimeä Cerro Cordillera. Vuoteen 1973 '
      + 'maan korkeimpana pidettiin 501-metristä Cerro de las Ánimasta, kunnes '
      + 'sotilasmaanmittauslaitoksen tutkijat mittasivat Cerro Catedralin uudelleen. '
      + 'Ylimpänä kasvillisuutta ei juuri ole; 400 metrin yläpuolella vallitsevat '
      + 'sitkeät heinät ja kuivuutta sietävät kasvit.',
    lahde: 'en-Wikipedia "Cerro Catedral (Uruguay)", johdanto-osa sekä osiot "History", '
      + '"Location and geology" ja "Vegetation" (tarkistettu 6.9.2026).',
  },
  {
    id: 'merininlaguuni',
    nimi: 'Merínin laguuni',
    tyyppi: 'jarvi',
    kysymykset: [
      'Miksi laguuni ei ole suorassa yhteydessä Atlanttiin?',
      'Mitkä joet laskevat laguuniin Uruguayn puolelta?',
    ],
    korostukset: ['laguuni|laguuni'],
    nappi: 'Kahden maan yhteinen laguuni',
    // -53.55 E / -33.2 N — Uruguayn puoleinen ranta; artikkelin oma
    // koordinaatti (-52,83 / -32,75) osuu laguunin Brasilian puolelle
    // — en-Wikipedia "Lagoon Mirim"
    // lähin pelikaupunki: Montevideo 105,6 lautayksikköä
    laudat: {
      maailmankartta: { x: 4048.3, y: 4360.1 },
    },
    teksti: 'Merínin laguuni on suuri murtovetinen rannikkolaguuni, joka ulottuu Brasilian '
      + 'Rio Grande do Sulista Itä-Uruguayhyn. Atlantista sen erottaa hiekkainen ja '
      + 'osin karu kannas, eikä sillä ole suoraa yhteyttä valtamereen: vesi kulkee '
      + 'São Gonçalon kanavan kautta pohjoiseen Patosin laguuniin ja sieltä Rio Granden '
      + 'vuorovesiväylää mereen. Laguuni on noin 174 kilometriä pitkä, 10–35 kilometriä '
      + 'leveä ja pinta-alaltaan 3 750 neliökilometriä. Uruguayn puolelta siihen laskevat '
      + 'Yaguarón, Cebollatí ja Tacuarí; Yaguarón on osa Brasilian ja Uruguayn rajaa. '
      + 'Molemmat laguunit ovat jäänne muinaisesta rannikon painanteesta, jonka tuuli ja '
      + 'merivirrat sulkivat hiekkarannoilla.',
    lahde: 'en-Wikipedia "Lagoon Mirim", johdanto-osa ja osio "Location" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'atlanttiury',
    nimi: 'Atlantti',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka suuren osan maapallosta Atlantti peittää?',
      'Mitä Atlantti merkitsi löytöretkien aikaan?',
    ],
    nappi: 'Valtameri Uruguayn itärannalla',
    // -52.9 E / -34.9 N — ulappa Rochan edustalla lehden ikkunan
    // itäreunassa; artikkelin oma keskipiste on -25 / 0
    // lähin pelikaupunki: Montevideo 110,2 lautayksikköä
    laudat: {
      maailmankartta: { x: 4070, y: 4423.8 },
    },
    teksti: 'Atlantti on maailman valtamerista toiseksi suurin: pinta-alaa noin 85 133 000 '
      + 'neliökilometriä eli noin 17 prosenttia maapallon pinnasta ja lähes neljännes sen '
      + 'vesialasta. Löytöretkien aikaan se tunnettiin merenä, joka erotti Amerikan uuden '
      + 'maailman Afro-Euraasian vanhasta. Uruguayn itärannikko on tätä merta: Punta del '
      + 'Este on niemi ja rannikkokaupunki Atlantin rannalla Maldonadon maakunnassa.',
    lahde: 'en-Wikipedia "Atlantic Ocean", johdanto-osa, sekä hännän osalta "Punta del '
      + 'Este", johdanto-osa (tarkistettu 6.9.2026).',
  },

  /* ================================================================
   * KOHTEET — historia, tekniikka, kulttuuri, kaupunki ja muu.
   * ============================================================== */
  {
    id: 'coloniadelsacramento',
    nimi: 'Colonia del Sacramento',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka perusti Colonian ja milloin?',
      'Mistä siirtokunnan talous eli?',
    ],
    korostukset: ['salakuljetus|salakuljetukseen'],
    nappi: 'Portugalin etuvartio Río de la Platalla',
    // -57.8442 E / -34.4714 N — en-Wikipedia "Colonia del Sacramento"
    // lähin pelikaupunki: Buenos Aires 27,2 lautayksikköä
    laudat: {
      maailmankartta: { x: 3905.2, y: 4407.7 },
    },
    teksti: 'Colonia del Sacramento on kaupunki Lounais-Uruguayssa Río de la Platan '
      + 'rannalla vastapäätä Buenos Airesia, ja se on yksi maan vanhimmista kaupungeista '
      + 'sekä Colonian maakunnan pääkaupunki. Sen vanha kaupunginosa on Unescon '
      + 'maailmanperintökohde. Portugalin kuningas Pedro II halusi vetää Brasilian '
      + 'eteläisen rajan, ja Manuel Lobo saapui viiden laivan ja noin 400 sotilaan, '
      + 'käsityöläisen, kirvesmiehen ja kivenhakkaajan kanssa San Gabrielin saarelle '
      + '20. tammikuuta 1680; työ aloitettiin 28. tammikuuta. Espanjalaiset valtasivat '
      + 'kaupungin saman vuoden elokuussa, mutta vuoden 1681 sopimus palautti sen '
      + 'Portugalille. Siirtokunnan talous perustui salakuljetukseen ja Banda Orientalin '
      + 'villikarjan pyyntiin, ja vuodat vietiin Rio de Janeiroon.',
    lahde: 'en-Wikipedia "Colonia del Sacramento", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'puntadeleste',
    nimi: 'Punta del Este',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mitä Punta del Estessä sovittiin 1986?',
      'Miksi kaupungin väkiluku vaihtelee niin paljon?',
    ],
    korostukset: ['niemi|niemi'],
    nappi: 'Niemi, jolla neuvoteltiin maailmankauppa',
    // -54.95 E / -34.9667 N — en-Wikipedia "Punta del Este"
    // lähin pelikaupunki: Montevideo 42,5 lautayksikköä
    laudat: {
      maailmankartta: { x: 4001.7, y: 4426.3 },
    },
    teksti: 'Punta del Este on rannikkokaupunki ja niemi Atlantin rannalla Maldonadon '
      + 'maakunnassa Kaakkois-Uruguayssa. Pienestä kylästä kasvoi lomakaupunki, jota on '
      + 'kutsuttu muun muassa Etelä-Amerikan Monacoksi ja Atlantin helmeksi. Kaupunki '
      + 'isännöi Whitbread-maailmanympäripurjehdusta 1985–1994 ja vuoden 1967 Amerikkojen '
      + 'huippukokousta, ja siellä käynnistettiin 1986 kansainvälisten kauppaneuvottelujen '
      + 'Uruguayn kierros, joka johti Maailman kauppajärjestön perustamiseen 1994. '
      + 'Lähistöllä on suojelualueita, muun muassa Isla de Lobos ja Gorritin saari. '
      + 'Talvella asukkaita on noin 18 200, mutta kesäkaudella määrä moninkertaistuu.',
    lahde: 'en-Wikipedia "Punta del Este", johdanto-osa ja osio "Location" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'cabopolonio',
    nimi: 'Cabo Polonio',
    tyyppi: 'muu',
    kysymykset: [
      'Miten Cabo Polonioon pääsee?',
      'Mistä paikan nimi tulee?',
    ],
    korostukset: ['merileijona|merileijonakanta'],
    nappi: 'Kylä ilman tietä ja sähköverkkoa',
    // -53.7892 E / -34.3975 N — en-Wikipedia "Cabo Polonio"
    // lähin pelikaupunki: Montevideo 81,5 lautayksikköä
    laudat: {
      maailmankartta: { x: 4040.4, y: 4404.9 },
    },
    teksti: 'Cabo Polonio on pieni kylä Uruguayn itärannikolla Rochan maakunnassa, ja se '
      + 'kuuluu maan suojelualueverkostoon. Vuoden 2023 laskennassa asukkaita oli 128, '
      + 'mutta kesällä paikalle tulee tuhansia kävijöitä. Niemen edustan luodoilla elää '
      + 'Uruguayn suurin merileijonakanta, jota alueen alkuperäisasukkaat metsästivät jo '
      + 'ennen espanjalaisia; pyynti jatkui siirtomaa-ajan jälkeenkin, ja 1800-luvulla '
      + 'niemelle rakennettiin ensimmäiset työläisten talot. Kylään ei johda tietä: se on '
      + 'noin seitsemän kilometrin päässä valtatiestä, ja sinne kuljetaan kävellen '
      + 'dyynien yli tai maastoautolla. Sähköverkkoa ei ole muualla kuin majakassa, ja '
      + 'vesi otetaan kaivoista tai kerätään sateesta. Nimi tulee vuonna 1753 haaksirikkoon '
      + 'joutuneen laivan kapteenista.',
    lahde: 'en-Wikipedia "Cabo Polonio", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'saltogrande',
    nimi: 'Salto Granden pato',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kuinka monta turbiinia padossa on?',
      'Kenen kanssa Uruguay omistaa padon?',
    ],
    korostukset: ['Kaplan-turbiini|Kaplan-turbiinia'],
    nappi: 'Kahden maan yhteinen vesivoimalaitos',
    // -57.9383 E / -31.2747 N — en-Wikipedia "Salto Grande Dam"
    // lähin pelikaupunki: Buenos Aires 136,3 lautayksikköä
    laudat: {
      maailmankartta: { x: 3902.1, y: 4288.8 },
    },
    teksti: 'Salto Granden pato on suuri vesivoimalaitos Uruguayjoessa Argentiinan '
      + 'Concordian ja Uruguayn Salton välissä, ja maat omistavat sen yhdessä. '
      + 'Rakentaminen alkoi 1974 ja valmistui 1979. Sähkön tuottaa neljätoista '
      + 'Kaplan-turbiinia, joiden yhteisteho on 1 890 megawattia. Pato päästää läpi noin '
      + '64 000 kuutiometriä vettä sekunnissa, kun Uruguayjoen keskivirtaama on 4 622 '
      + 'kuutiometriä sekunnissa. Tekoallas on pinta-alaltaan 783 neliökilometriä ja '
      + 'enimmillään 140 kilometriä pitkä ja 9 kilometriä leveä.',
    lahde: 'en-Wikipedia "Salto Grande Dam", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'santateresanlinnoitus',
    nimi: 'Santa Teresan linnoitus',
    tyyppi: 'historia',
    kysymykset: [
      'Ketkä alkoivat rakentaa linnoitusta ja milloin?',
      'Miksi linnoitus rakennettiin juuri tähän kohtaan?',
    ],
    korostukset: ['bastioni|bastioniin'],
    nappi: 'Viisikulmainen linnake dyynien takana',
    // -53.5486 E / -33.9722 N — en-Wikipedia "Fortaleza de Santa Teresa"
    // lähin pelikaupunki: Montevideo 93,1 lautayksikköä
    laudat: {
      maailmankartta: { x: 4048.4, y: 4388.9 },
    },
    teksti: 'Santa Teresan linnoitus on sotilaslinnake Itä-Uruguayn Rochan maakunnassa, '
      + '36 kilometriä Chuysta etelään ja 305 kilometriä Montevideosta koilliseen. Se on '
      + 'noin 800 metrin päässä rannasta ja kuuluu Santa Teresan kansallispuistoon. '
      + 'Portugalilaiset aloittivat rakentamisen lokakuussa 1762 hylättyään yrityksen '
      + 'rakentaa linnake Maldonadoon. Seutu on rannikolla laajaa dyynikenttää ja lännessä '
      + 'ja pohjoisessa kosteikkoa, ja linnoitus rakennettiin kallionkielekkeelle 58 '
      + 'metrin korkeuteen Camino de la Angosturan varteen — se oli ainoa kulkureitti '
      + 'soiden läpi merelle. Linnake on epäsäännöllinen viisikulmio, jonka jokainen '
      + 'kulma päättyy ulkonevaan bastioniin; muurien piiri on 652 metriä ja pinta-ala '
      + 'hehtaari.',
    lahde: 'en-Wikipedia "Fortaleza de Santa Teresa", johdanto-osa sekä osiot '
      + '"Topography" ja "Description" (tarkistettu 6.9.2026).',
  },
  {
    id: 'quebradadeloscuervos',
    nimi: 'Quebrada de los Cuervos',
    tyyppi: 'muu',
    kysymykset: [
      'Mitä rotkon nimi tarkoittaa?',
      'Mikä lintualue rotko on?',
    ],
    korostukset: ['rotko|rotko'],
    nappi: 'Rotko, jonka jyrkänteillä pesivät korppikotkat',
    // -54.4569 E / -32.9275 N — en-Wikipedia "Quebrada de los Cuervos"
    // lähin pelikaupunki: Montevideo 89,5 lautayksikköä
    laudat: {
      maailmankartta: { x: 4018.1, y: 4349.9 },
    },
    teksti: 'Quebrada de los Cuervos on merkittävä maastonmuoto Treinta y Tresin '
      + 'maakunnassa Uruguayssa; nimi tarkoittaa espanjaksi varisten rotkoa. Sen halki '
      + 'virtaa Yerbal Chicon puro, ja rotko on suojeltu luonnonalue. Se on myös '
      + 'BirdLife Internationalin tunnistama tärkeä lintualue, jolla elää useita '
      + 'uhanalaisia lajeja. Nimi ei kuitenkaan viittaa variksiin vaan jyrkänteillä '
      + 'pesiviin uuden maailman korppikotkiin: keltapääkorppikotkaan, kalkkunakorppikotkaan '
      + 'ja mustakorppikotkaan.',
    lahde: 'en-Wikipedia "Quebrada de los Cuervos", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'tacuarembo',
    nimi: 'Tacuarembó',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä Patria Gaucha -juhla on?',
      'Mitä kaupungin nimi tarkoittaa guaranin kielellä?',
    ],
    korostukset: ['gaucho|gauchojen'],
    nappi: 'Gauchojen juhlan kaupunki',
    // -55.9833 E / -31.7333 N — en-Wikipedia "Tacuarembó"
    // lähin pelikaupunki: Montevideo 112,5 lautayksikköä
    laudat: {
      maailmankartta: { x: 3967.2, y: 4305.7 },
    },
    teksti: 'Tacuarembó on Tacuarembón maakunnan pääkaupunki Pohjois-Uruguayssa. Presidentti '
      + 'Fructuoso Rivera määräsi 1831 perustamaan seudulle kaupungin, ja hänen veljensä '
      + 'eversti Bernabé Rivera vei vankkurikaravaanin Montevideosta Tacuaremboty-joen '
      + 'rannalle; kaupunki perustettiin 21. tammikuuta 1832 nimellä San Fructuoso. Nimi '
      + 'Tacuarembó otettiin käyttöön 1895, ja guaranin kielellä joen nimi tarkoittaa '
      + 'ruokojokea. Vuodesta 1986 kaupungin liepeillä on vietetty Fiesta de la Patria '
      + 'Gaucha -juhlaa, joka esittelee Uruguayn gauchojen kulttuuria ja vetää tuhansia '
      + 'kävijöitä myös naapurimaista. Vuonna 2023 asukkaita oli 60 586.',
    lahde: 'en-Wikipedia "Tacuarembó", johdanto-osa sekä osiot "History", "Population" '
      + 'ja "Geography" (tarkistettu 6.9.2026).',
  },
  {
    id: 'rivera',
    nimi: 'Rivera',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi Riveran ja Santana do Livramenton raja on erikoinen?',
      'Mikä on Plaza Internacional?',
    ],
    korostukset: ['kaksoiskaupunki|kaksoiskaupunkien'],
    nappi: 'Raja, joka kulkee keskellä katua',
    // -55.5506 E / -30.9025 N — en-Wikipedia "Rivera"
    // lähin pelikaupunki: Porto Alegre 137,7 lautayksikköä
    laudat: {
      maailmankartta: { x: 3981.6, y: 4275.1 },
    },
    teksti: 'Rivera on Riveran maakunnan pääkaupunki Uruguayn pohjoisrajalla. Brasilian '
      + 'raja yhdistää sen brasilialaiseen Santana do Livramentoon, joka on vain korttelin '
      + 'päässä valtatie 5:n pohjoispäästä; yhdessä ne muodostavat noin 200 000 asukkaan '
      + 'kaupunkialueen. Kylä perustettiin 1860, ja nykyinen nimi tuli käyttöön 1867. '
      + 'Kaksoiskaupunkien välillä ei ole aitaa eikä tarkastuspistettä, ja asukkaat ovat '
      + 'saaneet liikkua vapaasti molemmin puolin vuodesta 1851; matkustajan on kuitenkin '
      + 'hoidettava rajamuodollisuudet, jos hän jatkaa syvemmälle naapurimaahan. Vuonna '
      + '1943 rajalle rakennettiin Plaza Internacional Rivera-Livramento, jota on sanottu '
      + 'maailman ainoaksi kansainväliseksi aukioksi.',
    lahde: 'en-Wikipedia "Rivera", johdanto-osa sekä osiot "History" ja "Border control" '
      + '(tarkistettu 6.9.2026).',
  },
];
