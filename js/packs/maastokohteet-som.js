/*
 * MAASTOKOHTEET — SOM. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs SOM --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/SOM.json. Työkalu laskee laudan
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
 * Somalian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Neljä kohdetta, koska maalla on kaksi aivan erilaista merenrantaa: Adeninlahti pohjoisessa ja avoin Intian valtameri idässä.
 *
 * MAAILMAN ERÄ M15 (6.9.2026) lisäsi listaan kahdeksan KOHDETTA —
 * Laas Geel, Dhambalin, Amud, Zeila, Bosaso, Hobyo, Hamar Weyne ja
 * Barawa. Yksikään ei ole pelikaupungin kohdalla, ja Ras Hafun on
 * pelikaupunki eikä siis kohde. Erä on kuvaton, ja jokaisen
 * kohteen lähin pelikaupunki on kirjattu sen koordinaattirivin
 * viereen.
 */
export const MAASTOKOHTEET_SOM = [
  {
    id: 'shimbiris',
    nimi: 'Shimbiris',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuoren korkeudesta on kaksi lukua?',
      'Millaista metsää Cal Madowilla kasvaa?',
    ],
    korostukset: ['Cal Madow|Cal Madowin'],
    nappi: 'Somalian korkein huippu',
    // 47.2461 E / 10.7347 N — en-Wikipedia "Mount Shimbiris"
    laudat: {
      maailmankartta: { x: 7408.2, y: 2852.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Somalian korkein huippu on todennäköisesti korkeampi kuin kirjoissa lukee. Shimbirisin '
      + 'usein toistettu lukema on 2 416 metriä, mutta avaruussukkulan tutkakartoitus viittaa '
      + 'siihen, että oikea korkeus on 2 460 metriä. Vuori nousee jyrkästi Adeninlahdelle päin '
      + 'viettävien jyrkänteiden yläpuolelle Erigavon lähistöllä, ja Cal Madowin vuoristo sen '
      + 'ympärillä juoksee rannikon suuntaisesti terävine harjanteineen ja syvine laaksoineen. '
      + 'Korkeus tekee ilmastostakin toisen: sadetta tulee enemmän kuin alavassa Somaliassa, ja '
      + 'rinteillä kasvaa katajametsää sekä kotoperäisiä kasvilajeja, joita ei tavata muualta.',
    lahde: 'en-Wikipedia "Mount Shimbiris", johdanto-osa sekä osiot "Geography", "Climate" ja '
      + '"Flora and fauna" (tarkistettu 1.9.2026).',
  },
  {
    id: 'adeninlahti',
    nimi: 'Adeninlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Adeninlahti levenee vuosi vuodelta?',
      'Mikä oli antiikin Erythrean meri?',
    ],
    nappi: 'Portti Punaisellemerelle',
    // 47.6 E / 11.6 N — ulappa Somalian pohjoisrannikon edustalla; artikkelin oma keskipiste on 48 / 12
    laudat: {
      maailmankartta: { x: 7420, y: 2823.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Adeninlahti on Intian valtameren syvä lahti Jemenin ja Somalian rannikoiden välissä, '
      + 'ja luoteessa se yhtyy Punaiseenmereen Bab el Mandebin salmen kautta. Lahden keskellä '
      + 'kulkee Adenin selänne, jonka tuliperäinen liike leventää lahtea noin puolitoista '
      + 'senttimetriä vuodessa. Antiikin kreikkalaiset pitivät lahtea yhtenä Erythrean meren '
      + 'tärkeimmistä osista.',
    lahde: 'en-Wikipedia "Gulf of Aden", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'intianvaltameri',
    nimi: 'Intian valtameri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka suuren osan maapallon vesistä valtameri kattaa?',
      'Mitkä reunameret siihen kuuluvat?',
    ],
    nappi: 'Maailman kolmanneksi suurin valtameri',
    // 46.5 E / 1.2 N — ulappa Mogadishun kaakkoispuolella; artikkelin oma keskipiste on 80 / -20
    laudat: {
      maailmankartta: { x: 7383.3, y: 3171.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Intian valtameri kattaa yli 70 miljoonaa neliökilometriä eli noin viidenneksen '
      + 'maapallon vesipinnasta, ja sitä rajaavat pohjoisessa Aasia, lännessä Afrikka ja idässä '
      + 'Australia. Siihen kuuluu suuria reunameriä kuten Arabianmeri ja Bengalinlahti. '
      + 'Somalian koko itäranta avautuu tälle valtamerelle.',
    lahde: 'en-Wikipedia "Indian Ocean", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'jubba',
    nimi: 'Jubba',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä oli Ajuranin valtakunta?',
      'Mikä on hydraulinen imperiumi?',
    ],
    korostukset: ['Ajuran|Ajuranin'],
    nappi: 'Joki jolta Jubaland sai nimensä',
    // 42.6307 E / -0.2495 N — en-Wikipedia "Jubba River" — koordinaatti on suulla Goobweynin kohdalla
    laudat: {
      maailmankartta: { x: 7254.4, y: 3219.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Jubban varrella nousi keskiajalla Afrikan ainoa hydraulinen imperiumi. Ajuranin '
      + 'valtakunta otti 1200-luvulta alkaen haltuunsa sekä Jubban että Shebellen vedet, '
      + 'kasteli niillä viljelyksensä ja rakensi kalkkikivestä kaivoja ja vesisäiliöitä, joita '
      + 'käytetään yhä. Se kehitti myös oman maatalous- ja verotusjärjestelmänsä, joka säilyi '
      + 'Afrikan sarvessa vuosisatoja valtakunnan jälkeenkin. Joki itse alkaa Etiopian rajalta, '
      + 'missä Dawa ja Ganale Dorya yhtyvät, ja virtaa suoraan etelään Somalimereen Goobweynin '
      + 'kohdalla. Sen valuma-alue on 749 000 neliökilometriä, ja koko maakunta — Jubaland, '
      + 'entinen Trans-Juba — on nimetty joen mukaan.',
    lahde: 'en-Wikipedia "Jubba River", johdanto-osa ja osio "Ajuran Empire" (tarkistettu '
      + '1.9.2026).',
  },

  /* ==============================================================
   * MAAILMAN ERÄ M15, AFRIKKA 5 6.9.2026 — KAHDEKSAN KOHDETTA.
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko
   * maailmaan."* Somalialla oli neljä maastokohdetta ja nolla
   * kohdetta (docs/moduulit/karttanostot-kattavuus.md, Afrikka).
   * Kaikki kahdeksan ovat pääkartan merkkejä: etäisyys mitattiin
   * jokaiseen js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin
   * uusi merkki on Barawa 218,6 lautayksikön päässä Nairobista (raja
   * KAUPUNGIN_KOHDALLA_SADE on 7, js/fokuskohteet.js). Ras Hafun on
   * pelikaupunki, joten sitä ei ole otettu kohteeksi.
   *
   * NYKYTILA EI OLE AIHE. Fablen linjaus tälle erälle: Somalian
   * kohteet vain historiasta ja luonnosta, ja artikkelit joiden
   * nykytila on selkkaus jätetään pois (M3:n Myanmar-linja). Siksi
   * Taleh jäi kokonaan pois — sen artikkelissa on kaksi osiota
   * käynnissä olevasta kiistasta — ja Mogadishun kortti on
   * rajattu Hamar Weynen vanhan kaupunginosan moskeijaan eikä
   * kaupungin nykytilaan.
   *
   * NELJÄ EHDOKASTA KARSIUTUI MERKKIEN PÄÄLLEKKÄISYYDEN TAKIA:
   * Maydh on 10,2 lautayksikköä Shimbiriksestä, Aw-Barkhadle 5,4
   * yksikköä Laas Geelistä, Gondershe 5,6 yksikköä Mercasta ja
   * Merca puolestaan 22,0 yksikköä Hamar Weynestä.
   * Kuvaton erä; faktat en-Wikipedian raakatekstistä 6.9.2026, ja
   * jokainen `lahde`-rivi kertoo artikkelin osan.
   * ============================================================== */
  {
    id: 'laasgeel',
    nimi: 'Laas Geel',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi maalaukset ovat säilyneet niin hyvin?',
      'Mitä lehmien kaulukset kuvissa tarkoittavat?',
    ],
    korostukset: ['kalliomaalaus|kalliomaalaukset'],
    nappi: 'Viisituhatta vuotta vanhat lehmät',
    // 44.4436 E / 9.7809 N — en-Wikipedia "Laas Geel"
    // Lähin pelikaupunki: Aden 104,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7314.8, y: 2884.4 },
    },
    teksti: 'Laas Geel on kallioluolien ryhmä Hargeisan laitamilla, ja sen kalliomaalaukset ovat '
      + 'varhaisimpia tunnettuja kuvia kesytetystä afrikkalaisesta alkuhärästä koko Afrikan '
      + 'sarvessa. Maalaukset ovat arviolta 5 500–4 500 vuotta vanhoja. Ranskalainen '
      + 'tutkimusryhmä löysi kymmenen kallioholvin kokonaisuuden marras-joulukuussa 2002, kun '
      + 'se etsi alueelta suojapaikkoja, joiden kerrostumat kertoisivat tuotantotalouden '
      + 'synnystä; paikallisille maalaukset olivat olleet tuttuja vuosisatoja, mutta muu '
      + 'maailma sai niistä tiedon vasta silloin. Kuvissa on villieläimiä ja koristeltuja '
      + 'nautoja: lehmien ja sonnien kaulaan on maalattu eräänlainen rintakilpi, ja osalla on '
      + 'yllään koristeviitta. Maalausten rinnalla kulkevat paimenet, joita pidetään kuvien '
      + 'tekijöinä. Kohde on säilynyt poikkeuksellisen hyvin, koska graniittiulkonemat suojaavat '
      + 'maalauksia sateelta ja auringolta.',
    lahde: 'en-Wikipedia "Laas Geel", johdanto-osa sekä osiot "Discovery" ja "Description" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'dhambalin',
    nimi: 'Dhambalin',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi kalliossa on kirahveja?',
      'Kuka oli Sada Mire?',
    ],
    korostukset: ['lammas|lampaista'],
    nappi: 'Somalian vanhimmat lammaskuvat',
    // 45.9003 E / 10.3998 N — en-Wikipedia "Dhambalin"
    // Lähin pelikaupunki: Aden 86,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7363.3, y: 2863.6 },
    },
    teksti: 'Dhambalin on hiekkakiven suojakallio ja arkeologinen kohde noin kuudenkymmenen '
      + 'kilometrin päässä Berberan satamakaupungista itään; nimi tarkoittaa pystysuoraan '
      + 'halkaistua vuorta. Kylän Beenyo Dhaadheerin asukkaat kertoivat maalauksista '
      + 'somalialaiselle arkeologille Sada Mirelle syksyllä 2007. Kohde on noin viisituhatta '
      + 'vuotta vanha, ja monivärimaalaukset edustavat etiopialais-arabialaista tyyliä. Niissä '
      + 'on Somalian vanhimmat tunnetut kuvat lampaista — neljätoista lammasta, joista kolme on '
      + 'maalattu punaisiksi valkoisin vyötäröraidoin — sekä ainakin kahdeksan kirahvia, joita '
      + 'maassa ei enää elä, ja lisäksi antilooppeja, leijonia, käärmeitä, koiria ja kilpikonna. '
      + 'Ihmisiä on kahdeksasta kymmeneen, useimmiten metsästyskohtauksissa jousi ja nuolet '
      + 'käsissään. Hiekkakivi on hauras, ja tuulen kuluttamina paloja irtoaa jatkuvasti.',
    lahde: 'en-Wikipedia "Dhambalin", johdanto-osa sekä osiot "Geography" ja "Features" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'amud',
    nimi: 'Amud',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä oli Adalin sulttaanikunta?',
      'Miksi taloihin mentiin katolta?',
    ],
    korostukset: ['posliini|posliini'],
    nappi: 'Kaksisataa kivitaloa ilman katuja',
    // 43.2322 E / 9.9992 N — en-Wikipedia "Amud"
    // Lähin pelikaupunki: Aden 112,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7274.4, y: 2877.1 },
    },
    teksti: 'Amud on autioitunut vanha kaupunki Somalimaan Awdalissa noin kymmenen kilometriä '
      + 'Boraman kaakkoispuolella, ja se oli yksi Adalin sulttaanikunnan vanhoista '
      + 'pääkaupungeista. Arkeologi Jorge Rodriguez ajoittaa kaupungin muiden seudun '
      + 'raunioiden tavoin 1200-luvulle ja liittää sen Ifatin ja Adalin sulttaanikuntiin. '
      + 'Historioitsija G. W. B. Huntingford kuvasi paikan vuonna 1930: talot ovat hajallaan '
      + 'ilman näkyvää kaavaa, katuja ei ole eikä ympärysmuurista ole jälkeä. Kivitaloja on yli '
      + 'kaksisataa, jopa 2,6 metriä korkeita, ja huoneita on kahdesta neljään — joihinkin '
      + 'sisähuoneisiin ei näy sisäänkäyntiä lainkaan, mistä on päätelty, että niihin mentiin '
      + 'nyt kadonneita portaita pitkin tasakatolta. Sisäseinissä on lukuisia komeroita. '
      + 'Arkeologi Gervase Mathew piti Amudista löytynyttä posliinia hienolaatuisempana kuin '
      + 'yhdenkään muun tutkimansa itäafrikkalaisen kohteen posliinia.',
    lahde: 'en-Wikipedia "Amud", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'zeila',
    nimi: 'Zeila',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mikä oli Avalites?',
      'Miksi Zeilaa sanottiin monikulttuuriseksi suurkaupungiksi?',
    ],
    korostukset: ['suitsuke|suitsuketta'],
    nappi: 'Kahden mihrabin moskeija',
    // 43.4731 E / 11.3539 N — en-Wikipedia "Zeila"
    // Lähin pelikaupunki: Aden 71,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7282.4, y: 2831.4 },
    },
    teksti: 'Zeila on ikivanha satamakaupunki Somalimaan luoteisrannikolla, ja se on tunnistettu '
      + 'antiikin lähteiden kauppapaikaksi nimeltä Avalites. Ensimmäisellä vuosisadalla jaa. '
      + 'kirjoitettu Erythraian meren periplus kertoo, että seudun asukkaat kävivät laajaa '
      + 'kauppaa Egyptin ja esi-islamilaisen Arabian kanssa ja veivät satamistaan muun muassa '
      + 'suitsuketta; saman lähteen mukaan hallinto oli hajautunut itsenäisten kaupunkivaltioiden '
      + 'joukoksi. Islam saapui Arabian niemimaalta pian hidžran jälkeen, ja kaupungin '
      + 'kaksimihrabinen Masjid al-Qiblatayn on 600-luvulta ja Zeilan vanhin moskeija. '
      + '800-luvun lopulla al-Yaqubi kertoi Adalin kuningaskunnan pääkaupungin olevan Zeilassa. '
      + '1300-luvulla Ibn Battuta kuvasi kaupungin suureksi metropoliksi, jonka toreilla oli '
      + 'varakkaita kauppiaita, ja Zeilan kautta kulki suitsuketta, mirhaa, kultaa, hopeaa ja '
      + 'kameleita. Adalin pääkaupunki siirtyi 1400-luvulla sisämaahan Dakkariin ja seuraavalla '
      + 'vuosisadalla Harariin.',
    lahde: 'en-Wikipedia "Zeila", osiot "Foundation", "Avalites" ja "Ifat & Adal Sultanates" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'bosaso',
    nimi: 'Bosaso',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mistä kaupunki sai nimensä?',
      'Mikä oli Mosylon?',
    ],
    korostukset: ['kameli|kamelin'],
    nappi: 'Kaupunki, joka nimettiin kamelin mukaan',
    // 49.1819 E / 11.2886 N — en-Wikipedia "Bosaso"
    // Lähin pelikaupunki: Ras Hafun 50,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7472.7, y: 2833.6 },
    },
    teksti: 'Bosaso on satamakaupunki Somalian koillisrannikolla Adeninlahden äärellä. Aiemmin '
      + 'se tunnettiin nimellä Bandar Qasim eli Qasimin kaupunki, 1300-luvulla alueelle '
      + 'asettuneen kauppiaan mukaan; nykyinen nimi tulee kertoman mukaan Qasimin '
      + 'lempikamelin nimestä Boosaas. Erythraian meren periplus kertoo kreikkalaisten '
      + 'kauppiaiden purjehtineen seudulle, joka tunnettiin antiikissa nimellä Mosylon. '
      + 'Sijainti teki kaupungista vuosisatojen ajan merikaupan ja kulttuurivaihdon keskuksen: '
      + 'sataman kautta kulki suitsuketta, taateleita, karjaa ja tekstiilejä, ja se veti '
      + 'kauppiaita Arabian niemimaalta, Persiasta ja Itä-Afrikasta. Bosaso kuului samaan '
      + 'pohjoisten satamien verkostoon kuin Berbera ja Zeila. Kaupungin lähellä Baaladen '
      + 'laakson päässä on suuri maavalli, jonka paikallinen perimätieto sanoo olevan '
      + 'yhteisön kantaäidin hauta — se on lajissaan suurin koko Afrikan sarven alueella.',
    lahde: 'en-Wikipedia "Bosaso", osiot "Etymology" ja "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'hobyo',
    nimi: 'Hobyo',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä oli Hobyon sulttaanikunta?',
      'Miksi sulttaanit tekivät sopimuksia siirtomaavaltojen kanssa?',
    ],
    korostukset: ['sulttaanikunta|sulttaanikuntansa'],
    nappi: 'Sulttaanikunta, jolla oli oma lippu',
    // 48.5256 E / 5.3514 N — en-Wikipedia "Hobyo"
    // Lähin pelikaupunki: Ras Hafun 186,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7450.9, y: 3032.9 },
    },
    teksti: 'Hobyo on vanha satamakaupunki Somalian keskiosan Mudugissa. Ajuranin valtakunta '
      + 'perusti sen rannikon tukikohdaksi 1200-luvulla, ja 1600-luvun lopulla hiraabit '
      + 'nousivat ajuraneja vastaan ja perustivat itsenäisen Hiraabin imaamikunnan, joka '
      + 'hallitsi Shabeellen laaksosta Benadirin maakuntiin ja Mudugin kuiville maille. '
      + 'Imaamikunta alkoi heiketä 1800-luvun lopulla, ja vuonna 1884 majeerteeniläinen sulttaani '
      + 'Yusuf Ali Kenadid valtasi Hobyon ja perusti oman sulttaanikuntansa. Hobyon '
      + 'sulttaanikunnalla oli keskitetty hallinto ja kaikki oman valtion tunnusmerkit: '
      + 'toimiva byrokratia, perinnöllinen aateli, oma lippu ja ammattiarmeija, ja se piti '
      + 'kirjaa toimistaan. Vuoden 1888 lopulla Kenadid teki italialaisten kanssa sopimuksen, '
      + 'joka teki valtakunnasta Italian suojelusalueen — sulttaanit toivoivat voivansa käyttää '
      + 'eurooppalaisten keskinäistä kilpailua oman itsenäisyytensä turvaamiseen.',
    lahde: 'en-Wikipedia "Hobyo", johdanto-osa sekä osiot "Ajuuran Empire and Hiraab Imamate '
      + 'period" ja "Sultanate of Hobyo" (tarkistettu 6.9.2026).',
  },
  {
    id: 'hamarweyne',
    nimi: 'Hamar Weyne',
    tyyppi: 'historia',
    kysymykset: [
      'Mistä moskeijan marmori tuotiin?',
      'Mikä on mihrab?',
    ],
    korostukset: ['mihrab|mihrab'],
    nappi: 'Moskeija vuodelta 1269',
    // 45.3358 E / 2.0336 N — en-Wikipedia "Fakhr al-Din Mosque"
    // Lähin pelikaupunki: Nairobi 258,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7344.5, y: 3143.7 },
    },
    teksti: 'Hamar Weyne on Mogadishun vanha kaupunginosa, ja siinä on noin kaksikymmentäviisi '
      + 'pientä moskeijaa. Vanhin niistä on Fakhr al-Dinin moskeija, jonka rakennusaika '
      + 'tiedetään vuoden 1269 piirtokirjoituksesta: se kertoo rakennuttajaksi sulttaani Fakr '
      + 'ad-Dinin. Rakennus on tiivis ja suorakulmainen, ja sen mihrab — rukoussuunnan '
      + 'osoittava seinäsyvennys — on kupolin alla. Mihrab on tehty Pohjois-Intiasta tuodusta '
      + 'marmorista, ja siinäkin on päivätty piirtokirjoitus. Moskeijan tunnistaa vanhoista '
      + 'valokuvista ja piirroksista 1800-luvun lopulta lähtien sen kahdesta kartiomaisesta '
      + 'kupolista, joista toinen on pyöreä ja toinen kuusikulmainen.',
    lahde: 'en-Wikipedia "Fakhr al-Din Mosque", johdanto-osa ja osio "Overview" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'barawa',
    nimi: 'Barawa',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mikä oli Tunnin sulttaanikunta?',
      'Mitä alindi-kangas on?',
    ],
    korostukset: ['koralli|korallista'],
    nappi: 'Islamin saari Somalian rannikolla',
    // 44.0303 E / 1.1133 N — en-Wikipedia "Barawa"
    // Lähin pelikaupunki: Nairobi 218,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7301, y: 3174.4 },
    },
    teksti: 'Barawa on satamakaupunki Somalian lounaisrannikolla Intian valtameren äärellä. '
      + 'Perimätiedon mukaan sen perusti tunni-sukuun kuulunut pyhimys Aw-Ali, joka etsi '
      + 'perheelleen asuinpaikkaa ja päätyi rannalle meri-ilman raikkauden takia. Tunnit '
      + 'perustivat oman Tunnin sulttaanikuntansa, ja Barawasta tuli sen pääkaupunki. Kaupunki '
      + 'vaurastui ja siitä tuli yksi Afrikan sarven merkittävistä islamilaisen oppineisuuden '
      + 'keskuksista: barawanilaiset ulamat vetivät oppilaita koko alueelta, ja 1200-luvun '
      + 'oppinut Ibn Sa\'id kutsui kaupunkia "islamilaiseksi saareksi Somalian rannikolla". '
      + 'Al-Idrisi kuvasi, miten talot rakennettiin korallista, ja kertoi kaupungin olevan '
      + 'täynnä sekä kotimaista että ulkomaista tavaraa. Barawa tunnettiin käsityöläisistään ja '
      + 'heidän kutomastaan alindi- eli kioy-kankaasta sekä barawan-kufi-lakista.',
    lahde: 'en-Wikipedia "Barawa", johdanto-osa sekä osiot "Origin" ja "Medieval" ("Tunni '
      + 'Sultanate") (tarkistettu 6.9.2026).',
  },
];

