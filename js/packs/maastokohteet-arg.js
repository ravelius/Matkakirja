/*
 * MAASTOKOHTEET — ARG. Argentiinan maasto ja kohteet napautettaviksi.
 *
 * ── MAAILMAN ERÄ M1 (6.9.2026): ETELÄ-AMERIKKA ────────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Erä M1 on Etelä-Amerikan viisikko (ARG, BOL, BRA, CHL, COL), ja
 * jokaisella niistä oli ennen tätä erää NOLLA karttamerkkiä
 * (docs/moduulit/karttanostot-kattavuus.md). Kiintiö maata kohti on
 * kahdeksan KOHDETTA, kolme MAASTOKOHDETTA, yksi eläintäky ja kaksi
 * skandaalia; kaksi jälkimmäistä asuvat omissa pakeissaan
 * (js/packs/elaintakyt.js, js/packs/skandaalit.js).
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Paikat on johdettu tools/johda-maastokohteet.mjs:n `laudat`-funktiolla
 * en-Wikipedian coordinates-propin asteista. Vain maailmankartan rivi:
 * Euroopan erillislaudasta on luovuttu (Raamattu 30.8.2026), eikä
 * Argentiina mahtuisi sen kaavaan muutenkaan.
 *
 * MIKSI EI tools/maastoaineisto/ARG.json. Aineistotiedostoa ei tälle
 * maalle ole, joten maastokohteet on valittu käsin maan tunnetuimmista
 * ja tarkistettu erikseen kahta sääntöä vastaan: nimi ei saa olla jo
 * kartalla (maailmankartan kaupungit, js/packs/maailmankartta-nimet.js)
 * eikä kohde saa olla pelikaupungin kohdalla. Siksi tästä listasta
 * puuttuvat esimerkiksi Iguazú ja Paraná — edellinen on pelikaupunki,
 * jälkimmäinen on jo maailmankartan jokinimi.
 *
 * MITEN VARTIO 7 KÄSITTELEE MAAN ILMAN FOKUSLEHTEÄ. Savukkeen
 * (tools/savukkeet/savuke-maastokohteet.mjs) vartio 7a vaatii, että
 * jokainen kohde osuu maan fokuslehden rajaukseen, ja vartio lukee
 * rajauksen js/packs/fokus-grc.js:n FOKUS_POHJAT-taulusta. ARG on
 * siinä taulussa (rajaus x 3215,8…4209,7, y 3742,5…5549,5), joten
 * rajaus PÄTEE myös tähän erään: jokainen alla oleva piste on
 * tarkistettu sen sisään. Jos maata ei olisi taulussa, sama vartio
 * kaatuisi rivillä "ei ole FOKUS_POHJAT-taulussa" — rajauksen
 * puuttuminen ei siis ole vapautus vaan virhe.
 *
 * EI YKSIKÄÄN OLE PELIKAUPUNGIN KOHDALLA. Etäisyys on mitattu jokaiseen
 * js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin on kirjattu
 * kunkin kohteen koordinaattirivin viereen. Maan lähin on Río de la
 * Plata 33,6 lautayksikön päässä Buenos Airesista; raja
 * KAUPUNGIN_KOHDALLA_SADE on 7 (js/fokuskohteet.js). Kaikki
 * yksitoista ovat siis pääkartan merkkejä.
 *
 * KUVATON ERÄ. Kortti kantaa tekstin ja lähteen, ei kuvaa — sama linja
 * kuin K2-erillä 1–4. Faktat on tarkistettu en-Wikipediasta kohde
 * kerrallaan 6.9.2026, ja `lahde`-rivi kertoo artikkelin ja sen osan.
 */
export const MAASTOKOHTEET_ARG = [
  /* ================================================================
   * MAASTOKOHTEET — vuori, joki, meri.
   * ============================================================== */
  {
    id: 'aconcagua',
    nimi: 'Aconcagua',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Aconcaguaa sanotaan tekniseltä kannalta helpoksi?',
      'Mikä Nazcan laatta on?',
    ],
    korostukset: ['Nazcan laatta|Nazcan laatta'],
    nappi: 'Amerikkojen korkein huippu',
    // -70.0117 E / -32.6533 N — en-Wikipedia "Aconcagua"
    // lähin pelikaupunki: Valparaíso 41,6 lautayksikköä
    laudat: {
      maailmankartta: { x: 3499.6, y: 4339.7 },
    },
    teksti: 'Aconcagua kohoaa Mendozan maakunnassa Andien pääkordillieerissa '
      + '6 967 metriin: se on Amerikkojen korkein vuori ja samalla korkein huippu '
      + 'Aasian ulkopuolella. Vuori syntyi, kun Nazcan laatta työntyi Etelä-Amerikan '
      + 'laatan alle; se oli aikanaan tulivuori, mutta mioseenikauden liikunnot '
      + 'sammuttivat purkaukset. Ensimmäisen kirjatun nousun teki sveitsiläisopas '
      + 'Matthias Zurbriggen 14. tammikuuta 1897. Pohjoisen normaalireittiä pitkin '
      + 'Aconcaguaa pidetään maailman korkeimpana ei-teknisenä vuorena: köysiä tai '
      + 'erikoisvarusteita ei tarvita, mutta korkeus itsessään on vaarallinen.',
    lahde: 'en-Wikipedia "Aconcagua", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'riodelaplata',
    nimi: 'Río de la Plata',
    tyyppi: 'joki',
    kysymykset: [
      'Mistä nimi Hopeajoki tulee?',
      'Onko Río de la Plata joki vai merenlahti?',
    ],
    korostukset: ['estuaari|estuaari'],
    nappi: 'Hopeajoki, joka nimesi maan',
    // -57.5 E / -35.0 N — en-Wikipedia "Río de la Plata" (estuaarin keskiosa)
    // lähin pelikaupunki: Buenos Aires 33,6 lautayksikköä
    laudat: {
      maailmankartta: { x: 3916.7, y: 4427.6 },
    },
    teksti: 'Río de la Plata on estuaari, jonka Uruguayjoki ja Paraná muodostavat '
      + 'yhtyessään Punta Gordan kohdalla. Se on noin 290 kilometriä pitkä ja levenee '
      + 'kahdesta kilometristä suulla 220 kilometriin — jos sitä pidetään jokena, se on '
      + 'maailman levein. Maantieteilijästä riippuen se luetaan joeksi, estuaariksi, '
      + 'lahdeksi tai reunamereksi. Nimi Hopeajoki otettiin käyttöön myytin vuoksi: '
      + 'jokialtaan seudulla uskottiin olevan valtavasti hopeaa, ja samasta syystä '
      + 'Argentiina kantaa nimeä, joka tarkoittaa suunnilleen hopeista maata.',
    lahde: 'en-Wikipedia "Río de la Plata", johdanto-osa ja osio "Name" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'argentiinanmeri',
    nimi: 'Argentiinanmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuka keksi nimen Argentiinanmeri?',
      'Mikä mannerjalusta on?',
    ],
    korostukset: ['mannerjalusta|mannerjalusta'],
    nappi: 'Portaikko meren pohjassa',
    // -60.0 E / -43.0 N — en-Wikipedia "Argentine Sea" (meren keskiosa)
    // lähin pelikaupunki: Buenos Aires 319,7 lautayksikköä
    laudat: {
      maailmankartta: { x: 3833.3, y: 4739.6 },
    },
    teksti: 'Argentiinanmeri on Atlantin reunameri, joka ulottuu Río de la Platan '
      + 'suulta pohjoisessa Isla de los Estadosiin etelässä ja rannikolta 200 metrin '
      + 'syvyyskäyrälle. Rantaviivaa on 4 725 kilometriä ja pinta-alaa noin miljoona '
      + 'neliökilometriä, mikä tekee siitä yhden maailman suurimmista meristä; '
      + 'keskisyvyys on 1 205 metriä. Sen alla on Patagonian mannerjalusta, jonka '
      + 'tasanteet laskevat itään suurina portaina — meri muistuttaa muodoltaan '
      + 'Andien ulkopuolista Patagoniaa. Nimen näyttää keksineen romanialaissyntyinen '
      + 'tutkimusmatkailija Julius Popper, joka kartoitti Tulimaata 1880-luvulla ja '
      + 'julkaisi nimen kartoissaan 1891.',
    lahde: 'en-Wikipedia "Argentine Sea", johdanto-osa sekä osiot "History" ja '
      + '"Geography" (tarkistettu 6.9.2026).',
  },
  /* ================================================================
   * ERÄ M1 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   * ============================================================== */
  {
    id: 'cuevadelasmanos',
    nimi: 'Cueva de las Manos',
    tyyppi: 'historia',
    kysymykset: [
      'Miten kädet maalattiin kallioon?',
      'Miten maalausten ikä on saatu selville?',
    ],
    korostukset: ['luuputki|luuputkista'],
    nappi: 'Yhdeksän tuhatta vuotta vanhat kädet',
    // -70.6583 E / -47.1553 N — en-Wikipedia "Cueva de las Manos"
    // lähin pelikaupunki: Punta Arenas 233,5 lautayksikköä
    laudat: {
      maailmankartta: { x: 3478.1, y: 4911 },
    },
    teksti: 'Cueva de las Manos on luola ja kalliotaidealue Santa Cruzin maakunnassa '
      + 'Pinturas-joen kanjonissa, keskellä syrjäistä Patagoniaa. Nimi tulee sadoista '
      + 'käsistä, jotka on maalattu seinille sabluunatekniikalla: väri puhallettiin '
      + 'käden ympärille, joten jäljelle jäi kämmenen negatiivi. Taide syntyi useassa '
      + 'aallossa noin vuosien 7300 eaa. ja 700 jaa. välillä. Ikä on saatu selville '
      + 'maalauksen radiohiiliajoituksesta, kerrostumista ja niistä luuputkista, joilla '
      + 'väri oli puhallettu seinään. Osa tutkijoista pitää paikkaa parhaana aineellisena '
      + 'todisteena Etelä-Amerikan varhaisista metsästäjä-keräilijöistä.',
    lahde: 'en-Wikipedia "Cueva de las Manos", johdanto-osa ja osio "Location" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'quebradadehumahuaca',
    nimi: 'Quebrada de Humahuaca',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä pucará on?',
      'Kuka kulki tätä laaksoa ennen espanjalaisia?',
    ],
    korostukset: ['pucará|pucaroiksi'],
    nappi: 'Laakso, joka on ollut tie aina',
    // -65.35 E / -23.2 N — en-Wikipedia "Quebrada de Humahuaca"
    // lähin pelikaupunki: Salta 56,1 lautayksikköä
    laudat: {
      maailmankartta: { x: 3655, y: 3998.7 },
    },
    teksti: 'Quebrada de Humahuaca on kapea vuoristolaakso Jujuyn maakunnassa '
      + 'Luoteis-Argentiinassa, noin 155 kilometriä pitkä ja pohjois–eteläsuuntainen. '
      + 'Sana quebrada tarkoittaa kirjaimellisesti murtunutta ja käytännössä syvää '
      + 'laaksoa tai rotkoa; nimi tulee Humahuacan pikkukaupungista. Laaksossa on asuttu '
      + 'ainakin kymmenentuhatta vuotta, ja rinteillä on yli 1 500 vuotta vanhoja '
      + 'kivimuurattuja viljelyterasseja, jotka ovat yhä käytössä. Terassit yhdistävät '
      + 'toisiinsa linnoitettuja kyliä, joita kutsutaan pucaroiksi. Sama laakso oli '
      + '1400-luvulla inkojen karavaanitie ja myöhemmin yhdysside Río de la Platan ja '
      + 'Perun varakuninkaanmaiden välillä.',
    lahde: 'en-Wikipedia "Quebrada de Humahuaca", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'cordobanjesuiitat',
    nimi: 'Córdoban jesuiittakortteli',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä estancia tarkoitti jesuiitoille?',
      'Miksi jesuiitat joutuivat lähtemään 1767?',
    ],
    korostukset: ['estancia|estanciaa'],
    nappi: 'Yliopisto ja kuusi maatilaa',
    // -64.1833 E / -31.4167 N — en-Wikipedia "Jesuit Block and Estancias of Córdoba"
    // lähin pelikaupunki: Buenos Aires 229,6 lautayksikköä
    laudat: {
      maailmankartta: { x: 3693.9, y: 4294 },
    },
    teksti: 'Córdoban jesuiittakortteli on rakennusryhmä, johon kuuluvat osa '
      + 'Córdoban yliopistosta, Monserratin lukio, kirkko ja asuinrakennuksia. '
      + 'Ensimmäiset jesuiitat tulivat kaupunkiin 1599, ja yliopisto perustettiin '
      + '1613 — se on Etelä-Amerikan vanhimpia. Hanketta elätti kuusi estanciaa eli '
      + 'maatilaa maakunnan eri puolilla: Caroya, Jesús María, Santa Catalina, Alta '
      + 'Gracia, Candelaria ja San Ignacio, joista viimeisin ei ole säilynyt. '
      + 'Jokaisella oli oma kirkkonsa, ja moni niistä kasvatti ympärilleen kaupungin. '
      + 'Kun kuningas Kaarle III karkotti jesuiitat siirtomaista 1767, tilat siirtyivät '
      + 'fransiskaaneille; kortteli ja estanciat ovat olleet maailmanperintökohde '
      + 'vuodesta 2000.',
    lahde: 'en-Wikipedia "Jesuit Block and Estancias of Córdoba", osiot "The sites" '
      + 'ja "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'polvorilla',
    nimi: 'La Polvorillan viadukti',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi rata ylipäätään rakennettiin?',
      'Kuka radan suunnitteli?',
    ],
    korostukset: ['Huaytiquina|Huaytiquina'],
    nappi: 'Rata pilviin, 4 220 metriin',
    // -66.5069 E / -24.2069 N — en-Wikipedia "Salta–Antofagasta railway"
    // lähin pelikaupunki: Salta 42,0 lautayksikköä
    laudat: {
      maailmankartta: { x: 3616.4, y: 4034.2 },
    },
    teksti: 'Salta–Antofagasta-rata yhdistää Argentiinan Saltan ja Chilen '
      + 'Antofagastan Andien yli: metrin raideleveyttä 941 kilometriä, josta 571 '
      + 'Argentiinan puolella. Rakennustyöt alkoivat 1921, tarkoituksena avata reitti '
      + 'Chileen ja palvella seudun booraksikaivoksia, ja radan suunnitteli '
      + 'yhdysvaltalainen insinööri Richard Maury. Radan korkein kohta on La '
      + 'Polvorillan viadukti 4 220 metrissä, ja se valmistui 7. marraskuuta 1932; '
      + 'koko rata avattiin 1948. Lempinimi Huaytiquina tulee vanhalta andilaiselta '
      + 'solalta, jonne rata oli alun perin tarkoitus viedä. Argentiinan puolella '
      + '217 kilometriä radasta kulkee nykyään turistijuna Tren a las Nubes.',
    lahde: 'en-Wikipedia "Salta–Antofagasta railway", johdanto-osa sekä osiot '
      + '"Overview" ja "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'peninsulavaldes',
    nimi: 'Península Valdés',
    tyyppi: 'elain',
    kysymykset: [
      'Miksi valaat tulevat juuri näihin lahtiin?',
      'Miten miekkavalaat pyytävät merileijonia täällä?',
    ],
    korostukset: ['eteläinen mustavalas|eteläisen mustavalaan'],
    nappi: 'Niemi, jonne valaat tulevat synnyttämään',
    // -63.9 E / -42.5 N — en-Wikipedia "Valdés Peninsula"
    // lähin pelikaupunki: Puerto Montt 293,3 lautayksikköä
    laudat: {
      maailmankartta: { x: 3703.3, y: 4719.5 },
    },
    teksti: 'Península Valdés työntyy Atlanttiin Chubutin maakunnassa, ja se on ollut '
      + 'maailmanperintökohde vuodesta 1999. Niemi itsessään on karua maata suolajärvineen '
      + '— suurin niistä on noin neljäkymmentä metriä merenpinnan alapuolella. Rannikolla '
      + 'elää merileijonia, merinorsuja ja karvahylkeitä, ja viereiset vedet ovat maailman '
      + 'tärkein eteläisen mustavalaan lisääntymisalue: valaat saapuvat Golfo Nuevoon ja '
      + 'Golfo San Joséen touko–joulukuussa, koska lahtien vesi on tyynempää ja lämpimämpää '
      + 'kuin avomeri. Miekkavalaat metsästävät niemen edustalla ja ajavat itsensä '
      + 'rantaan saadakseen kiinni merileijonan tai merinorsun. Sisämaassa kulkee '
      + 'nandulaumoja ja guanakoita, ja lintulajeja on kirjattu ainakin 181.',
    lahde: 'en-Wikipedia "Valdés Peninsula", johdanto-osa sekä osiot "Environment" '
      + 'ja "Wildlife" (tarkistettu 6.9.2026).',
  },
  {
    id: 'ushuaia',
    nimi: 'Ushuaia',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mitä nimi Ushuaia tarkoittaa?',
      'Mikä on Etelämantereen porttikaupunki?',
    ],
    korostukset: ['jaganin kieli|jaganin kielestä'],
    nappi: 'Maailman eteläisin kaupunki',
    // -68.3 E / -54.8 N — en-Wikipedia "Ushuaia"
    // lähin pelikaupunki: Kap Horn 62,1 lautayksikköä
    laudat: {
      maailmankartta: { x: 3556.7, y: 5247.9 },
    },
    teksti: 'Ushuaia on Tulimaan maakunnan pääkaupunki ja 54. eteläisen leveyspiirin '
      + 'alapuolella; se pitää itseään maailman eteläisimpänä kaupunkina, ja asukkaita '
      + 'on lähes 90 000. Kaupunki on leveässä lahdessa Isla Grande de Tierra del Fuegon '
      + 'etelärannikolla, pohjoisessa Martialin vuoret ja etelässä Beaglen kanava. '
      + 'Augusto Lasserre perusti sen 12. lokakuuta 1884. Nimi tulee jaganin kielestä '
      + 'sanoista ush ja waia eli lahti — suunnilleen syvä lahti. Etelämantereen '
      + 'niemimaalle on täältä noin 1 100 kilometriä, ja Ushuaia on yksi viidestä '
      + 'kansainvälisesti tunnustetusta Etelämantereen porttikaupungista.',
    lahde: 'en-Wikipedia "Ushuaia", johdanto-osa ja osio "Toponyms" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'ischigualasto',
    nimi: 'Ischigualasto',
    tyyppi: 'muu',
    kysymykset: [
      'Mitä nimi Ischigualasto tarkoittaa?',
      'Miksi paleontologit tulivat tänne?',
    ],
    korostukset: ['Valle de la Luna|Valle de la Luna'],
    nappi: 'Kuun laakso ja varhaiset dinosaurukset',
    // -67.84 E / -30.16 N — en-Wikipedia "Ischigualasto Provincial Park"
    // lähin pelikaupunki: Valparaíso 153,3 lautayksikköä
    laudat: {
      maailmankartta: { x: 3572, y: 4247.9 },
    },
    teksti: 'Ischigualaston maakuntapuisto San Juanin maakunnassa tunnetaan myös nimellä '
      + 'Valle de la Luna, Kuun laakso, koska maisema muistuttaa kuun pintaa. Puisto '
      + 'perustettiin 3. marraskuuta 1971, ja sen pinta-ala on 60 370 hehtaaria; se '
      + 'kuuluu samaan geologiseen muodostumaan kuin naapurin Talampayan kansallispuisto, '
      + 'ja molemmat liitettiin maailmanperintöluetteloon vuonna 2000. Nimi tulee '
      + 'sammuneesta cacán-kielestä ja tarkoittaa paikkaa, johon kuu laskeutuu; toisen '
      + 'selityksen mukaan se merkitsee kuollutta maata. Ensimmäinen paleontologinen '
      + 'kuvaus on vuodelta 1930, ja 1941 alueelta löytyi seitsemänkymmentä lajia '
      + 'fossiilikasveja. Harvardin Alfred Sherwood Romer löysi 1958 useita rikkaita '
      + 'fossiilikerrostumia, ja siitä alkoi puiston kuuluisuus.',
    lahde: 'en-Wikipedia "Ischigualasto Provincial Park", johdanto-osa ja osio '
      + '"History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'peritomoreno',
    nimi: 'Perito Moreno -jäätikkö',
    tyyppi: 'muu',
    kysymykset: [
      'Kenen mukaan jäätikkö on nimetty?',
      'Miksi juuri tämä jäätikkö oli pitkään tasapainossa?',
    ],
    korostukset: ['Los Glaciares|Los Glaciaresin'],
    nappi: 'Jäätikkö, joka ei sulanut',
    // -73.05 E / -50.4833 N — en-Wikipedia "Perito Moreno Glacier"
    // lähin pelikaupunki: Punta Arenas 104,9 lautayksikköä
    laudat: {
      maailmankartta: { x: 3398.3, y: 5053.9 },
    },
    teksti: 'Perito Moreno on jäätikkö Los Glaciaresin kansallispuistossa Santa Cruzin '
      + 'maakunnassa. Se on 250 neliökilometriä laaja ja kolmekymmentä kilometriä pitkä, '
      + 'yksi neljästäkymmenestäkahdeksasta jäätiköstä, joita Eteläinen Patagonian '
      + 'jääkenttä ruokkii — maailman kolmanneksi suurin makean veden varasto. Jäätikön '
      + 'rintama on viisi kilometriä leveä ja keskimäärin 74 metriä Argentino-järven '
      + 'pinnan yläpuolella, ja jään paksuus on 170 metriä. Se oli pitkään harvinaisuus: '
      + '1900-luvun lopulla ja 2000-luvun alussa se kerrytti massaa suunnilleen yhtä '
      + 'nopeasti kuin menetti sitä, ja syytä siihen jäätikkötutkijat yhä kiistelevät. '
      + 'Vuodesta 2020 alkaen pohjoisrintama on vetäytynyt. Nimi tulee tutkija Francisco '
      + 'Morenolta, joka kartoitti seutua 1800-luvulla.',
    lahde: 'en-Wikipedia "Perito Moreno Glacier", johdanto-osa sekä osiot "Status" ja '
      + '"History" (tarkistettu 6.9.2026).',
  },
];
