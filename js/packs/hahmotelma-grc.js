/*
 * KREIKAN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan ja Portugalin jälkeen Kreikka.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48) =====
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä Espanjan, Italian, Saksan ja Portugalin
 * pakat: jokaisella nostolla on valmis sisältö — `teksti` 3–5 virkettä
 * Wikipedian johdannosta omin sanoin suomeksi (ei käännöskopiota, ei
 * keksittyjä faktoja, `lahde`-riville artikkeli ja tarkistuspäivä),
 * 1873-näkökulman `nappi`-alaotsikko, kaksi pulun kysymystä,
 * `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva` + `kuvat`; vain
 * public domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi ja
 * lähdesivu kirjattuna, jokaisen kuvan tiedot luettu Commonsin
 * extmetadata-rajapinnasta). Vuoden 1873 jälkeiset kohteet (Vergina 1977,
 * Kalavrytan hammasraide 1885–1895, Navagion haaksirikko 1980) ovat
 * mukana: teksti on nykytietoa ja `nappi` katsoo vuodesta 1873
 * eteenpäin ("tänne nousee myöhemmin…").
 *
 * Mykenelle ei ole omaa nostoa: nykyinen `nosto-sofia-korut` (js/fokusnosto.js
   NOSTO_MAAT.GRC) on samassa paikassa, ja Schliemannin vuosi 1876 on sen asia.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `grc-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/grc/.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin Ranskan, Espanjan, Italian, Saksan ja Portugalin
 * hahmotelmalla: nämä ovat kaikki aidosti kaupunkien ulkopuolella
 * (Kreikan pelikaupungit ovat Ateena ja Kreeta; lähin nosto on yli 44
 * lautayksikön päässä, raja KAUPUNGIN_KOHDALLA_SADE on 7), ja
 * js/fokuskohteet.js liittää rivit KOHDE_MAAT.GRC:hen. `lahi: true` on
 * sama lähizoomiportti kuin Ranskan hahmotelmalla (js/pallolauta/
 * nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen. Kerkinille piste on Lake Kerkini -artikkelin
 * (kylän oma artikkeli ei kuvaa järveä). Laudan luvut on laskettu pelin
 * omalla kaavalla (tools/johda-maastokohteet.mjs `laudat`, Millerin
 * lieriö ja europe-tasaväli). Jokainen rivi osuu Kreikan fokuslehden
 * rajaukseen (`osuuLehteen`), myös saaret (Zakynthos, Milos, Delos, Korfu,
 * Chios, Samothrake), jotka pelin karkea maailmankartan GRC-rengas
 * jättää pois: pisteet ovat oikeasti saarilla, mutta rengas ei tunne
 * niitä (ankkurilukituksen asia, kuten Espanjan Finisterre).
 */

/** Kreikan hahmotelmanostot: sisällölliset kohteet kaupunkien ulkopuolella. */
export const HAHMOTELMA_GRC = [
  {
    id: 'hahmotelma-vikos',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-vikos-08acc120.jpg',
      lyhyt: 'Vikosin rotkon jyrkät kalkkikiviseinämät ja vehreä rinne kesäpäivänä.',
      selite: 'Näkymä Vikosin rotkoon Epeiroksessa: vaaleat kalliot nousevat jyrkästi metsäisten rinteiden yläpuolelle.',
      lahde: 'Valokuva: Pudelek, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Pudelek',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vikos_Gorge_(Φαρράγγι_του_Βίκου)_by_Pudelek.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-vikos-9965bada.jpg',
        lyhyt: 'Syvä Vikosin rotko Beloin näköalapaikalta katsottuna.',
        selite: 'Kuva on otettu Beloin näköalapaikalta, ja rotko aukeaa alapuolella syvänä laaksona, jonka pohjalla kiemurtelee vaalea uoma.',
        lahde: 'Valokuva: Calistemon, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Calistemon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vikos_Gorge_seen_from_Beloi_Viewpoint,_September_2022_03.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Vikosin rotko',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi Vikosin rotko on ennätys?',
      'Mistä rotkon nimi tulee?',
    ],
    korostukset: ['Vikosin rotko|Vikosin rotko'],
    nappi: 'Pindoksen rotko, jonka syvyys suhteessa leveyteen on ennätys',
    // 20.72833333 E / 39.96944444 N — en-Wikipedia "Vikos Gorge"
    laudat: {
      maailmankartta: { x: 6524.3, y: 1804.1 },
      europe: { x: 609.2, y: 842.4 },
    },
    teksti: 'Vikosin rotko on rotko Pindoksen vuoristossa Luoteis-Kreikassa. Se sijaitsee '
      + 'Tymphe-vuoren eteläisillä rinteillä, ja sen pituus on noin 32 kilometriä, syvyys '
      + '120–1 350 metriä ja leveys 2 500 metristä vain muutamaan metriin kapeimmassa '
      + 'kohdassa. Guinnessin ennätyskirja ja muut lähteet luettelevat Vikosin maailman '
      + '"syvimmäksi suhteessa leveyteensä" olevaksi rotkoksi. Rotkon pääosa on '
      + 'Vikos–Aoos-kansallispuiston ydinalueella Zagorin seudulla. Nimen alkuperästä on '
      + 'useita selityksiä: sen on arveltu tulevan slaavilaisesta sanasta rotko, kreikan '
      + 'sanasta vikos eli korvallinen astia tai albaniasta ja sanasta silta.',
    lahde: 'en-Wikipedia "Vikos Gorge", johdanto-osa ja osio "Etymology" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-samaria',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-samaria-462ed911.jpg',
      lyhyt: 'Vaeltajat kulkevat Samarian rotkon kivikkoista pohjaa jyrkkien kallioseinämien välissä.',
      selite: 'Kuvassa kulkee vaellusreitti Samarian rotkon pohjalla Kreetalla; reitti kulkee kivien peittämää rotkon pohjaa korkeiden kallioiden välissä.',
      lahde: 'Valokuva: Lapplaender, Wikimedia Commons (CC BY-SA 3.0 de).',
      tekija: 'Lapplaender',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Samaria_Gorge_09.jpg',
      lisenssi: 'CC BY-SA 3.0 de',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-samaria-379ec55d.jpg',
        lyhyt: 'Kapea, jyrkkäseinäinen Samarian rotko avautuu kohti sinistä taivasta.',
        selite: 'Samarian rotkon korkeat kalliot kohoavat molemmin puolin kivikkoista uomaa, ja rotkon pohja on täynnä pyöreitä kiviä.',
        lahde: 'Valokuva: Anna Saini, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Anna Saini',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Samaria-Schlucht,_Kreta.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Samarian rotko',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mikä kri-kri on?',
      'Mitä Portes eli Portit tarkoittaa?',
    ],
    korostukset: ['kri-kri|kri-kri'],
    nappi: 'Kreetan Valkoisten vuorten rotko, jonka läpi kuljetaan jalan',
    // 23.96138889 E / 35.27111111 N — en-Wikipedia "Samaria Gorge"
    laudat: {
      maailmankartta: { x: 6632, y: 1985.2 },
      europe: { x: 671.3, y: 966 },
    },
    teksti: 'Samarian rotko on Kreetan saarella ja Kreikan kansallispuisto vuodesta 1962, saaren '
      + 'suuri matkailunähtävyys ja maailman biosfäärialue. Rotko sijaitsee Kreetan '
      + 'lounaisosassa Chanían alueella, ja sen on kaivanut pieni joki Valkoisten vuorten ja '
      + 'Volakiaksen vuoren väliin. Rotko on 16 kilometriä pitkä, ja se alkaa 1 250 metrin '
      + 'korkeudessa pohjoisesta sisäänkäynniltä ja päättyy Libyanmeren rannalle Agia '
      + 'Roumelin kylään. Tunnetuin osa on Portit, jossa rotkon seinämät kapenevat vain '
      + 'neljän metrin levyisiksi ja kohoavat lähes 300 metrin korkeuteen. Puisto '
      + 'perustettiin erityisesti harvinaisen kri-kri-vuohen turvapaikaksi.',
    lahde: 'en-Wikipedia "Samaria Gorge", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-pelion',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-pelion-0f47003e.jpg',
      lyhyt: 'Sammaleinen vanha kivisilta kaartuu metsäisen puron yli Pelionilla.',
      selite: 'Vanha kivinen kaarisilta on jäänyt tiheän lehtimetsän ja sammaloituneiden kivien keskelle puron uoman yläpuolelle.',
      lahde: 'Valokuva: Stathis floros, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Stathis floros',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Old_stone_bridge_in_Pelion.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-pelion-cd2c53fb.jpg',
        lyhyt: 'Väritetty vanha postikortti Makrinitsan kylästä Pelionin rinteellä.',
        selite: 'Stefanos Stournaraksen noin vuoden 1920 väritetty postikortti näyttää Makrinitsan talot ryhmittyneinä jyrkälle rinteelle. Kuvasta on rajattu pois postikortin painettu teksti.',
        lahde: 'Kuva: Stephanos Stournaras, Wikimedia Commons (public domain).',
        tekija: 'Stephanos Stournaras',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stefanos_Stournaras_Makrinitsa_no201_c1920.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-pelion-7307e56e.jpg',
        lyhyt: 'Rantakylä Katigiorgis Pelionin niemimaalla, veneitä tyynessä lahdessa.',
        selite: 'Katigiorgisin kylän talot ja rantaravintolat kohoavat männikön reunassa, ja etualalla on tyyni lahti, jossa on pieniä veneitä.',
        lahde: 'Valokuva: Annatsach, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Annatsach',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Seaside_village_-_Pelion,_Greece_(Katigiorgis).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Pelion',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Kuka Kheiron oli?',
      'Mitä Pelionilla viljellään?',
    ],
    korostukset: ['Kheironin|Kheironin'],
    nappi: 'Kentauri Kheironin vuori, jonka rinteillä kylät kastelevat tarhojaan',
    // 23.04638889 E / 39.43861111 N — en-Wikipedia "Pelion"
    laudat: {
      maailmankartta: { x: 6601.5, y: 1824.9 },
      europe: { x: 653.7, y: 856.4 },
    },
    teksti: 'Pelion on vuori Thessalian kaakkoisosassa Pohjois-Kreikassa, ja se muodostaa '
      + 'koukkumaisen niemimaan Pagasitin lahden ja Egeanmeren väliin. Sen korkein huippu '
      + 'Pourianos Stavros on 1 624 metriä. Vuori on paksun metsän peittämä, ja siellä kasvaa '
      + 'pyökkiä, tammea, vaahteraa ja kastanjaa sekä oliivi-, omena- ja päärynäpuita '
      + 'lähteiden ympärillä. Kylät ja tarhat on kastettu lähteiden vedellä, joka on johdettu '
      + 'kivestä hakattuja uomia pitkin. Kreikkalaisessa mytologiassa Pelion oli kentauri '
      + 'Kheironin, Jasonin, Akilleen ja Theseuksen opettajan, kotiseutu.',
    lahde: 'en-Wikipedia "Pelion", johdanto-osa ja osio "Geography and economy" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-prespa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-prespa-26306aae.jpg',
      lyhyt: 'Mikri Prespa -järven ruovikkoista rantaa ja pieni metsäinen saari kaukana lahdella.',
      selite: 'Kuvassa Mikri Prespa, Prespajärvien pienempi järvi Kreikan puolella: etualalla on laaja ruovikko, taustalla mäkinen saari ja vuoria.',
      lahde: 'Valokuva: Chalki25, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Chalki25',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mikri_Prespa_lake.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-prespa-c9f1d17b.jpg',
        lyhyt: 'Kivitaloja Agios Achilliosin saaren rannalla, järvi ja metsäinen rinne taustalla.',
        selite: 'Kuva on otettu Agios Achilliosin saarella Mikri Prespalla; vanhoja kivirakennuksia reunustaa tyyntä järveä.',
        lahde: 'Valokuva: DimitrisP67, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'DimitrisP67',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Small_lake_of_Prespa_St._Achillios_island.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-prespa-779e6b27.jpg',
        lyhyt: 'Valkoisia pelikaaneja ruovikkosaarekkeella Prespan kosteikolla.',
        selite: 'Kuvan nimi on Pelican nest, ja se kuuluu Prespan luontoa esittäviin Commons-kuviin; ruovikkosaarekkeen keskellä näkyy valkoisten lintujen joukko.',
        lahde: 'Valokuva: Chalki25, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Chalki25',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pelican_nest.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Prespajärvi',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Mitkä maat jakavat Prespajärven?',
      'Mikä Pieni Prespa on?',
    ],
    korostukset: ['Pieni Prespa|Pieni Prespajärvi'],
    nappi: 'Kolmen maan rajajärvi, jonka rannat ovat Balkanin korkeimmat',
    // 21.03333333 E / 40.9 N — en-Wikipedia "Lake Prespa"
    laudat: {
      maailmankartta: { x: 6534.4, y: 1767.4 },
      europe: { x: 615, y: 817.9 },
    },
    teksti: 'Prespajärvi sijaitsee Pohjois-Makedonian, Albanian ja Kreikan kolmen maan '
      + 'rajapisteessä. Se on kahden järven järjestelmä, jonka erottaa kannas: Suuri '
      + 'Prespajärvi on jaettu kolmen maan kesken, ja Pieni Prespajärvi on enimmäkseen '
      + 'Kreikassa. Ne ovat Balkanin korkeimmalla, 853 metrin korkeudessa sijaitsevat '
      + 'tektoniset järvet. Suuren Prespajärven pinta-ala on 259 neliökilometriä, josta '
      + 'Kreikan osuus on 36,4 neliökilometriä. Alueella on kolme kansallispuistoa, yksi '
      + 'jokaisessa maassa, ja vuonna 2014 Ohrid–Prespa-rajat ylittävä biosfäärialue '
      + 'liitettiin UNESCOn biosfäärialueiden verkostoon.',
    lahde: 'en-Wikipedia "Lake Prespa", johdanto-osa ja osio "Geography" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-kerkini',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-kerkini-047f1eb0.jpg',
      lyhyt: 'Pelikaaniparvi seisoo Kerkinijärven matalassa vedessä puiden edessä.',
      selite: 'Kuvassa on parvi pelikaaneja seisomassa matalassa vedessä Kerkinijärvellä; taustalla näkyy vedestä nousevia puita ja vihreitä rinteitä.',
      lahde: 'Valokuva: Vassilios Vescoukis, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Vassilios Vescoukis',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kerkini_lake_in_May_11.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-kerkini-c5ddcb4b.jpg',
        lyhyt: 'Kiharapelikaani nousee siivilleen Kerkinijärven pinnalta kala nokassaan.',
        selite: 'Kiharapelikaaneja Kerkinijärvellä: vesi roiskuu, kun linnut räpyttelevät siipiään, ja yhden nokassa on kala.',
        lahde: 'Valokuva: Wkkasimag, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Wkkasimag',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dalmatian_Pelican_at_Lake_Kerkini.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-kerkini-71d0244e.jpg',
        lyhyt: 'Auringonlasku Kerkinijärven satamassa: tyyni vesi, veneitä ja vuoria taustalla.',
        selite: 'Kerkinijärven satama-alue iltavalossa; heijastuksia tyynessä vedessä ja tumma vuorijono vasemmalla.',
        lahde: 'Valokuva: Eimaiokanenas, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Eimaiokanenas',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kerkini_Lake_Port.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kerkinijärvi',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Miksi linnut pysähtyvät Kerkinillä?',
      'Miksi järvi tehtiin tekojärveksi?',
    ],
    korostukset: ['Ramsar|Ramsar'],
    nappi: 'Strymón-joen suo, josta tehdään myöhemmin tekojärvi',
    // 23.08333333 E / 41.21666667 N — en-Wikipedia "Lake Kerkini"
    laudat: {
      maailmankartta: { x: 6602.8, y: 1754.8 },
      europe: { x: 654.4, y: 809.6 },
    },
    teksti: 'Kerkinijärvi on Keski-Makedoniassa Kreikassa sijaitseva tekojärvi, joka tehtiin '
      + 'vuonna 1932 ja uudistettiin 1980-luvulla aiemman laajan suoalueen paikalle. Ennen '
      + 'vuotta 1932 Strymón-joella oli epäsäännöllisiä suojärviä. Nykyisin järvi on yksi '
      + 'Kreikan parhaista lintujen tarkkailupaikoista, sillä se sijaitsee Egeanmerelle, '
      + 'Balkanille, Mustallemerelle ja Unkarin aroille suuntaavien muuttolintujen reitillä. '
      + 'Järven pääasiallinen vesilähde on Strymón-joki, ja sen koko vaihtelee 54 ja 72 '
      + 'neliökilometrin välillä. Alue kuuluu Ramsar-sopimuksen suojeluun, ja siellä on '
      + 'tuhansia harvinaisia ja suojeltuja vesilintuja.',
    lahde: 'en-Wikipedia "Lake Kerkini", johdanto-osa ja osiot "History" ja "Geography" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-navagio',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-navagio-b6a6abf6.jpg',
      lyhyt: 'Navagio-ranta Zakynthoksella: valkoiset kalkkikivikalliot ympäröivät turkoosia lahtea.',
      selite: 'Korkealta otetussa kuvassa jyrkät vaaleat kalliot sulkevat hiekkarannan ja kirkkaan turkoosin meren; rannalla erottuu haaksirikkoutuneen laivan hylky.',
      lahde: 'Valokuva: Wilnel José Verdú Guerrero, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Wilnel José Verdú Guerrero',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Navagio,_Zante_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-navagio-15a36868.jpg',
        lyhyt: 'Ruostunut Panagiotis-hylky makaa Navagion hiekkarannalla kalkkikalliota vasten.',
        selite: 'Kuvassa on Panagiotis-laivan ruosteinen hylky hiekkarannalla korkean, vaalean kalkkikivijyrkänteen juurella; rannalla näkyy myös muutama ihminen.',
        lahde: 'Valokuva: dronepicr, Wikimedia Commons (CC BY 2.0).',
        tekija: 'dronepicr',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Panagiotis_Shipwreck_at_Navagio_Beach_Zakynthos_Greece_(31530321957).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-navagio-6fee3417.jpg',
        lyhyt: 'Ilmakuva Navagion rannasta: hylky hiekalla, turkoosi meri ja valkoiset kalliot.',
        selite: 'Suoraan ylhäältä otetussa ilmakuvassa hylky lepää vaalealla hiekkarannalla, jota kalkkikiviset kalliot ympäröivät ja jonka edessä on turkoosi meri.',
        lahde: 'Valokuva: dronepicr, Wikimedia Commons (CC BY 2.0).',
        tekija: 'dronepicr',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Navagio_Beach_aerial_Zakynthos_Greece_(46470564281).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Navagio (Zakynthos)',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Mitä Navagiolla tapahtui vuonna 1980?',
      'Miksi lahtea kutsutaan salakuljettajien lahdeksi?',
    ],
    korostukset: ['Navagio|Navagion'],
    nappi: 'Joonianmeren kalkkikivikallioiden lahti, jonka rannalle karahtaa myöhemmin laiva',
    // 20.6245 E / 37.8596 N — en-Wikipedia "Navagio Beach"
    laudat: {
      maailmankartta: { x: 6520.8, y: 1886.3 },
      europe: { x: 607.2, y: 897.9 },
    },
    teksti: 'Navagio eli Haaksirikkoranta on avoin poukama Zakynthoksen saaren rannikolla '
      + 'Joonianmeren saarilla Kreikassa. Sitä kutsutaan joskus salakuljettajien poukamaksi, '
      + 'ja se on yksi maailman kuuluisimmista ja eniten kuvatuista rannoista. Poukaman '
      + 'alkuperäinen nimi oli Agios Georgios eli Pyhä Yrjö. Lokakuun 5. päivänä 1980 '
      + 'rahtialus Panagiotis ajoi myrskyssä ja huonossa näkyvyydessä karille Navagion '
      + 'rannalle. Huhujen mukaan alus salakuljetti tavaraa, ja myöhemmin julkaistut '
      + 'oikeusasiakirjat viittaavat siihen, että se kuljetti Turkista Italiaan '
      + 'salakuljetettuja savukkeita. Miehistö hylkäsi aluksen, ja se lepää yhä '
      + 'kalkkikivisoran seassa.',
    lahde: 'en-Wikipedia "Navagio Beach", johdanto-osa ja osio "History and namesake" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-milos',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-milos-91f1c746.jpg',
      lyhyt: 'Ilmakuva Sarakinikon valkoisesta kalliorannasta Milos-saarella.',
      selite: 'Milos-saaren Sarakinikon ranta ilmasta kuvattuna: vaalea, pehmeästi muotoutunut kallioranta ja sinertävä Egeanmeri sen takana.',
      lahde: 'Valokuva: dronepicr, Wikimedia Commons (CC BY 2.0).',
      tekija: 'dronepicr',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sarakiniko_Beach_on_Milos_Island,_Greece_with_a_view_of_the_Aegean_Sea.jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-milos-78b0bf0a.jpg',
        lyhyt: 'Klimakylä Milos-saarella merelle avautuvine taloineen.',
        selite: 'Klima Milos-saarella pienestä veneestä katsottuna. Kylän yläpuolella kukkulan laella on Profitis Ilias -kirkko.',
        lahde: 'Valokuva: Zde, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Zde',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Klima_on_Milos_from_a_small_boat,_15M5888.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-milos-a1d346f7.jpg',
        lyhyt: 'Venus de Milo -patsas Louvressa.',
        selite: 'Melos-saarelta vuonna 1820 löydetty jättimäinen marmorinen Venus-patsas, joka on nykyään Louvren museon kokoelmassa.',
        lahde: 'Valokuva: Caeciliusinhorto, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Caeciliusinhorto',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Venus_de_Milo_front_2023.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Milos',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Mikä Venus de Milo on?',
      'Miksi obsidiaani oli arvokasta?',
    ],
    korostukset: ['Venus de Milo|Venus de Milo'],
    nappi: 'Kykladien tulivuorisaari, jonka obsidiaania kauppaa jo kivikaudella',
    // 24.4325 E / 36.6875 N — en-Wikipedia "Milos"
    laudat: {
      maailmankartta: { x: 6647.7, y: 1931.3 },
      europe: { x: 680.3, y: 928.7 },
    },
    teksti: 'Milos on tulivuoriperäinen kreikkalainen saari Egeanmerellä, aivan Kreetanmeren '
      + 'pohjoispuolella, ja se on Kykladien lounaisin saari. Sen veistoksiin kuuluvat '
      + 'Louvressa oleva Venus de Milo, Ateenan kansallisessa arkeologisessa museossa oleva '
      + 'Melosin Poseidon ja Britannian museossa oleva Melosin Asklepios. Saaren ja sen '
      + 'asumattomien Antimilosin ja Akradiesin saarten yhteinen maa-ala on 160 '
      + 'neliökilometriä, ja vuoden 2021 väestönlaskennassa saarella oli 5 193 asukasta. '
      + 'Milosin obsidiaania, lasimaista tulivuorikiveä, käytiin kauppaa jo noin 15 000 '
      + 'vuotta sitten, ja se muotoiltiin erittäin teräviksi kivityökaluiksi ennen '
      + 'maanviljelyn alkua.',
    lahde: 'en-Wikipedia "Milos", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-vergina',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-vergina-ec8cfacc.jpg',
      lyhyt: 'Filippos II:n haudan julkisivu Verginassa.',
      selite: 'Filippos II:n haudan julkisivu Verginassa: uritetut puolipylväät, marmorinen ovi ja sinipunainen koristefriisi.',
      lahde: 'Valokuva: Explorer1940, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Explorer1940',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vergina_--_Tomb_of_Philip_II.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-vergina-6b1211da.jpg',
        lyhyt: 'Kultainen larnax Verginan kuninkaallisista haudoista.',
        selite: 'Verginan kuninkaallisten hautojen kultainen larnax eli tuhka-arkku. Kannessa on tähtikuvio, ja arkun yläpuolella leijuu kultainen seppele.',
        lahde: 'Valokuva: Digitalphilologist, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Digitalphilologist',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Golden_Larnax_from_Vergina,_Macedonia_-_2024.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Vergina',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka Filippos II oli?',
      'Mikä Aigai oli?',
    ],
    korostukset: ['Aigai|Aigain'],
    nappi: 'Makedonian kuninkaiden hautaseutu, jonka kumpu kätkee vielä salaisuutensa',
    // 22.31666667 E / 40.48333333 N — en-Wikipedia "Vergina"
    laudat: {
      maailmankartta: { x: 6577.2, y: 1783.9 },
      europe: { x: 639.7, y: 828.9 },
    },
    teksti: 'Vergina on pieni kaupunki Kreikan Makedoniassa Veroian kunnassa Imathiassa. Se on '
      + 'parhaiten tunnettu muinaisen Aigain paikkana, joka oli Makedonian ensimmäinen '
      + 'pääkaupunki. Vuonna 336 eaa. Filippos II murhattiin Aigain teatterissa ja hänen '
      + 'poikansa Aleksanteri Suuri julistettiin kuninkaaksi. Vuonna 1977 arkeologi Manolis '
      + 'Andronikos kaivoi Suuressa Kumpuseudussa esiin Verginan haudat, jotka on numeroitu '
      + 'I, II ja III. Verginan arkeologinen museo on rakennettu kaikkia löytöjä varten, ja '
      + 'se on yksi Kreikan tärkeimmistä museoista. UNESCO merkitsi Aigain '
      + 'maailmanperintökohteeksi poikkeuksellisena todistuksena siirtymästä '
      + 'kaupunkivaltioista hellenistiseen ja roomalaiseen valtiorakenteeseen.',
    lahde: 'en-Wikipedia "Vergina", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-pella',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-pella-0cbfa6ab.jpg',
      lyhyt: 'Dionysoksen talon pääpiha muinaisessa Pellassa.',
      selite: 'Dionysoksen talon pääpihan pylväitä ja perustuksia Pellassa. Talo on rakennettu noin vuosina 325–300 eaa.',
      lahde: 'Valokuva: Carole Raddato, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Carole Raddato',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_main_courtyard_of_the_House_of_Dionysos,_built_in_325-300_BC,_Ancient_Pella_(6914013260).jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-pella-ba9d860d.jpg',
        lyhyt: 'Kivikkomosaiikki leijonanmetsästyksestä Pellasta.',
        selite: 'Kivikkomosaiikissa kaksi metsästäjää käy leijonan kimppuun. Mosaiikki on peräisin suuresta talosta Pellassa, Makedonian pääkaupungissa. Kuvaa on rajattu.',
        lahde: 'Valokuva: Egisto Sani, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Egisto Sani',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pella_Mosaics_I_–_The_Lion_Hunt_(49988918902).jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Pella',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka syntyi Pellassa?',
      'Miksi Pellan merkitys väheni?',
    ],
    korostukset: ['Aleksanteri Suuri|Aleksanteri Suuri'],
    nappi: 'Makedonian kuninkaiden pääkaupungin rauniot suon reunalla',
    // 22.52105 E / 40.754669 N — en-Wikipedia "Pella"
    laudat: {
      maailmankartta: { x: 6584, y: 1773.1 },
      europe: { x: 643.6, y: 821.8 },
    },
    teksti: 'Pella oli muinaisen kreikkalaisen Makedonian kuningaskunnan pääkaupunki 300-luvulta '
      + 'eaa. roomalaisten valloitukseen vuonna 168 eaa. asti. Filippos II syntyi Pellassa '
      + 'vuonna 382 eaa. ja hänen poikansa Aleksanteri Suuri vuonna 356 eaa. Kaupunki '
      + 'sijaitsee kilometrin päässä nykyisestä Pellan kaupungista Keski-Makedoniassa. Pellan '
      + 'perusti todennäköisesti 300-luvun alussa eaa. Arkelaos I uudeksi pääkaupungiksi '
      + 'korvaamaan Aigain, joka pysyi kuninkaiden ja kuningasperheen hautapaikkana. Pellasta '
      + 'tuli nopeasti Makedonian suurin ja rikkain kaupunki, ja se kukoisti erityisesti '
      + 'Kassandroksen ja Antigonos II:n aikana. Roomalaiset ryöstivät sen kolmannessa '
      + 'Makedonian sodassa, ja sen merkityksen ohitti lähellä oleva Thessalonike.',
    lahde: 'en-Wikipedia "Pella", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-philippi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-philippi-79f68a22.jpg',
      lyhyt: 'Filippoin antiikin teatteri ylhäältä katsottuna.',
      selite: 'Filippoin antiikin teatteri: orkestran ympärillä penkkirivit ja taustalla vuoristo. Filippos II rakennutti teatterin 300-luvulla eaa., ja roomalaiset rakensivat sen myöhemmin uudelleen.',
      lahde: 'Valokuva: Carole Raddato, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Carole Raddato',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ancient_Theatre,_built_by_Philip_II_in_the_4th_century_BC_and_later_reconstructed_by_the_Romans,_Philippi_(7272297822).jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-philippi-2baa6970.jpg',
        lyhyt: 'Varhaiskristillisen basilika B:n rauniot Filippoissa.',
        selite: 'Basilika B:n tiili- ja kivimuureja sekä kaari Filippoin foorumin vieressä. Basilika rakennettiin 500-luvulla kaupungin palaistran paikalle.',
        lahde: 'Valokuva: Carole Raddato, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Carole Raddato',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_imposing_early_Christian_Basilica_(Basilica_B)_next_to_the_Forum,_PhilippiPhilippi_(7272631506).jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-philippi-67a91ddd.jpg',
        lyhyt: 'Filippoin foorumin pylväs ja rauniot vuorten edessä.',
        selite: 'Filippoin roomalainen foorumi, joka rakennettiin useassa vaiheessa Claudiuksen ajoista alkaen. Etualalla pylväs ja taustalla rauniomuureja sekä vuoria.',
        lahde: 'Valokuva: Carole Raddato, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Carole Raddato',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_Forum,_Philippi_(7272553128).jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Filippoi',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä Filippoin taistelussa 42 eaa. tapahtui?',
      'Miksi apostoli Paavali kävi Filippoissa?',
    ],
    korostukset: ['Paavali|Paavali'],
    nappi: 'Roomalaiskaupunki, jonka luona kaksi Rooman armeijaa kohtasi ja apostoli saarnasi',
    // 24.28638889 E / 41.01305556 N — en-Wikipedia "Philippi"
    laudat: {
      maailmankartta: { x: 6642.9, y: 1762.9 },
      europe: { x: 677.5, y: 815 },
    },
    teksti: 'Filippoi oli merkittävä kreikkalainen kaupunki Thasos-saaren luoteispuolella '
      + 'mantereella. Sen alkuperäinen nimi oli Krenides eli lähteet, ja Filippos II '
      + 'Makedonialainen antoi sille uuden nimen vuonna 356 eaa. Kaupunki hylättiin '
      + '1300-luvulla ottomaanien valloituksen jälkeen. Nykyinen Filippoin kylä on lähellä '
      + 'muinaisen kaupungin raunioita Kavalan kaupungin alueella Itä-Makedonian ja Traakian '
      + 'hallintoalueella. UNESCO merkitsi arkeologisen alueen maailmanperintökohteeksi '
      + 'vuonna 2016 poikkeuksellisen roomalaisen arkkitehtuurin, Roomaa pienoiskoossa '
      + 'muistuttavan kaupunkirakenteen ja varhaiskristillisen merkityksen vuoksi. '
      + 'Filippoissa käytiin myös vuonna 42 eaa. Filippoin taistelu, ja Uuden testamentin '
      + 'mukaan apostoli Paavali vieraili kaupungissa toisella lähetysmatkallaan.',
    lahde: 'en-Wikipedia "Philippi", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-bassae',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-bassae-ca72fdb6.jpg',
      lyhyt: 'Bassain Apollon temppelin pylväät suojatelttarakenteen alla.',
      selite: 'Epikourios-Apollonin temppelin doorilaisia pylväitä Bassaissa. Temppeli on suojarakenteen alla, ja pylväiden välissä näkyy rakennustelineitä.',
      lahde: 'Valokuva: Dionysisa303, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Dionysisa303',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Apollo_Temple.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-bassae-6be4e936.jpg',
        lyhyt: 'Bassain temppelin friisilaatta British Museumissa.',
        selite: 'Marmorinen friisilaatta Apollon temppelistä Bassaista: kreikkalaiset taistelevat amatsoneja vastaan, noin 420–400 eaa. Laatta on nykyään British Museumissa.',
        lahde: 'Valokuva: Carole Raddato, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Carole Raddato',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_Bassai_sculptures,_marble_block_from_the_frieze_of_the_Temple_of_Apollo_Epikourios_at_Bassae_(Greece),_Greeks_fight_Amazons,_about_420-400_BC,_British_Museum_(14258035892).jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Bassain temppeli',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Bassain temppeli on erikoinen?',
      'Mikä on korinttilainen pylväsjärjestys?',
    ],
    korostukset: ['Apollon Epikurioksen|Apollon Epikurioksen'],
    nappi: 'Vuorten syrjäinen temppeli, jonka arkkitehtuuri rikkoo tyylisääntöjä',
    // 21.90027778 E / 37.42972222 N — en-Wikipedia "Bassae"
    laudat: {
      maailmankartta: { x: 6563.3, y: 1902.8 },
      europe: { x: 631.7, y: 909.2 },
    },
    teksti: 'Bassai on arkeologinen kohde Oichalian kunnassa Messenian koillisosassa Kreikassa; '
      + 'antiikin aikana alue kuului Arkadiaan. Se sijaitsee 1 131 metrin korkeudessa '
      + 'Kotylion-vuoren rinteillä lähellä Skliroksen kylää. Paikka on kuuluisa hyvin '
      + 'säilyneestä 400-luvun eaa. puolivälin ja loppupuolen Apollon Epikurioksen '
      + 'temppelistä. Vaikka temppeli on maantieteellisesti syrjässä antiikin Kreikan '
      + 'suurista keskuksista, se on yksi tutkituimmista antiikin kreikkalaisista '
      + 'temppeleistä, koska siinä on paljon epätavallisia piirteitä ja koska se on säilynyt '
      + 'lähes ehjänä. Temppelin arkkitehtuuri poikkeaa merkittävästi doorilaisen ja '
      + 'joonialaisen tyylin normeista, ja siinä on ehkä ensimmäistä kertaa käytetty '
      + 'korinttilaista pylväsjärjestystä.',
    lahde: 'en-Wikipedia "Bassae", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-delos',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-delos-3d7277e2.jpg',
      lyhyt: 'Leijonien terassin marmoripatsaat Deloksella.',
      selite: 'Leijonien terassin marmoriset leijonapatsaat kivialustoillaan Deloksen saarella Kykladeilla. Taustalla näkyy pylväitä.',
      lahde: 'Valokuva: Ggia, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Ggia',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:20100706_Terrace_of_the_Lions_Delos_Cyclades_Greece.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-delos-6256db8d.jpg',
        lyhyt: 'Mosaiikkilattia Delfiinien talossa Deloksella.',
        selite: 'Mosaiikkilattia Delfiinien talossa Deloksella, noin 120–80 eaa. Pyöreää kuviota kehystää koristereuna.',
        lahde: 'Valokuva: Zde, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Zde',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mosaic_House_Dolphins_Delos_102258.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-delos-35c73fb6.jpg',
        lyhyt: 'Deloksen antiikin teatterin rauniot ja meri.',
        selite: 'Antiikin teatterin rauniot Deloksella. Taustalla näkyy meri ja saaria.',
        lahde: 'Valokuva: Bernard Gagnon, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Bernard Gagnon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ancient_Greek_theatre_in_Delos_01.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Delos',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Delos oli pyhä saari?',
      'Mitä saarella on kaivettu esiin?',
    ],
    korostukset: ['Apollon|Apollon'],
    nappi: 'Apollon ja Artemiin syntymäsaari, Kykladien pyhä keskus',
    // 25.27111111 E / 37.39333333 N — en-Wikipedia "Delos"
    laudat: {
      maailmankartta: { x: 6675.7, y: 1904.2 },
      europe: { x: 696.4, y: 910.2 },
    },
    teksti: 'Delos on pieni kreikkalainen saari Mykonoksen lähellä Kykladien saariston '
      + 'keskuksessa. Vaikka sen pinta-ala on vain 3,43 neliökilometriä, se on yksi Kreikan '
      + 'tärkeimmistä mytologisista, historiallisista ja arkeologisista kohteista, ja '
      + 'saarella meneillään olevat kaivaukset ovat Välimeren laajimpia. Delos oli pyhäkkönä '
      + 'tuhannen vuoden ajan ennen kuin olympialainen mytologia teki siitä Apollon ja '
      + 'Artemiin syntymäpaikan. Sen pyhästä satamasta näkyvät kolme kartiomaista kumpua, '
      + 'joita on pidetty jumalattaren pyhinä maisemina. Löydöt on esillä Delosin '
      + 'arkeologisessa museossa ja Ateenan kansallisessa arkeologisessa museossa, ja UNESCO '
      + 'merkitsi saaren maailmanperintöluetteloon vuonna 1990.',
    lahde: 'en-Wikipedia "Delos", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-monemvasia',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-monemvasia-9e8dfcb0.jpg',
      lyhyt: 'Ilmakuva Monemvasian alakaupungista jyrkän kallion juurella meren rannalla.',
      selite: 'Drooninkuva Monemvasian kivitaloista ja rantamuurista, joiden takana kohoaa jyrkkä kalliopaasi. Kalliosaaren huipulla erottuu Ylä-kaupungin linnoitusta.',
      lahde: 'Valokuva: C messier, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'C messier',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%CE%9C%CE%BF%CE%BD%CE%B5%CE%BC%CE%B2%CE%B1%CF%83%CE%B9%CE%AC_DJI_4359.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-monemvasia-d4389836.jpg',
        lyhyt: 'Kivinen kellotorni ja kupolikirkko kalliojyrkänteen alla Monemvasiassa.',
        selite: 'Kellotorni ja valkoinen kupolikirkko kylän keskellä, taustalla punertava kallioseinämä ja linnoituksen muureja.',
        lahde: 'Valokuva: DimitrisP67, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'DimitrisP67',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Monemvasia_(photo_1).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Monemvasia',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mistä Monemvasian nimi tulee?',
      'Mistä Malvasia-viini on saanut nimensä?',
    ],
    korostukset: ['Malvasia|Malvasia'],
    nappi: 'Kallion bysanttilainen linnoituskylä, jota kutsutaan idän Gibraltariksi',
    // 23.05555556 E / 36.68777778 N — en-Wikipedia "Monemvasia"
    laudat: {
      maailmankartta: { x: 6601.9, y: 1931.3 },
      europe: { x: 653.9, y: 928.7 },
    },
    teksti: 'Monemvasia on kaupunki ja kunta Lakoniassa Kreikassa, joka sijaitsee Peloponnesoksen '
      + 'itärannikon edustalla olevalla kytketyllä saarella Myrtoanmeren ympäröimänä. Sitä '
      + 'yhdistää mantereeseen 400 metrin pituinen hiekkakannas. Vuonna 1890 kannaksen pieni '
      + 'osa katkaistiin tekemään laivoille ja veneille keinotekoinen väylä. Kaupunki '
      + 'perustettiin 500-luvulla, ja se on yksi Euroopan vanhimmista yhtäjaksoisesti '
      + 'asutuista linnoitetuista kaupungeista. Keskiaikainen linnoitus oli aikoinaan '
      + 'voimakas, ja kaupunki oli yksi Itä-Välimeren tärkeimmistä kauppakeskuksista. '
      + 'Kaupungin muurit ja bysanttilaiset kirkot ovat yhä jäljellä. Nimi tulee sanoista '
      + 'moni, yksi, ja emvasis, sisäänpääsy, ja sen italialainen muoto Malvasia antoi nimen '
      + 'malvasiaviinille; Monemvasiaa on kutsuttu idän Gibraltariksi.',
    lahde: 'en-Wikipedia "Monemvasia", johdanto-osa ja osio "Etymology" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-sounion',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-sounion-5cb74eca.jpg',
      lyhyt: 'Poseidonin temppelin pylväät auringonlaskussa Sounionin niemellä.',
      selite: 'Doorilaisen temppelin marmoripylväät ja arkkitraavi piirtyvät hehkuvaa taivasta vasten, vasemmalla aurinko laskee Egeanmerelle.',
      lahde: 'Valokuva: Petroskaz, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Petroskaz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Temple_of_Poseidon_at_Cape_Sounion,_Greece.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-sounion-bee0b580.jpg',
        lyhyt: 'Poseidonin temppeli kukkulan laella kirkkaan sinistä taivasta vasten.',
        selite: 'Temppelin pylväikkö ja osa kattorakenteesta kohoavat kuivan kukkulan päällä Sounionin niemellä.',
        lahde: 'Valokuva: Jebulon, Wikimedia Commons (CC0).',
        tekija: 'Jebulon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Temple_Poseidon_at_Cape_Sounion,_Greece.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
    ],
    nimi: 'Sounionin temppeli',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka Perikles oli?',
      'Mitä Sounion-kouros on?',
    ],
    korostukset: ['Perikleen|Perikleen'],
    nappi: 'Poseidonin temppeli Attikan kärjessä, meren kolmelta puolelta ympäröimänä',
    // 24.026 E / 37.652 N — en-Wikipedia "Sounion"
    laudat: {
      maailmankartta: { x: 6634.2, y: 1894.3 },
      europe: { x: 672.5, y: 903.4 },
    },
    teksti: 'Sounionin niemi on Attikan niemimaan eteläisin kärki, 8 kilometriä Lavrion kaupungin '
      + 'eteläpuolella ja 69,5 kilometriä Ateenan kaakkoon Ateenan Rivieralla. Se on kuuluisa '
      + 'Poseidonin temppelistä, joka on yksi Ateenan kulta-ajan tärkeimmistä monumenteista. '
      + 'Temppelin rauniot seisovat niemellä kolmelta puolelta Egeanmeren ympäröimänä. '
      + 'Poseidonin temppeli rakennettiin vuosina 444–440 eaa. Perikleen johtaessa Ateenaa, '
      + 'samana aikana kun hän rakennutti uudelleen Parthenonin, ja se rakennettiin arkaaisen '
      + 'ajan temppelin raunioille. Temppeli on lähes 60 metrin korkeudessa meren '
      + 'yläpuolella. Vuonna 1906 temppelin itäpuolelta kuopasta löytyi Sounion-kouros, joka '
      + 'oli luultavasti yksi Poseidonille omistetuista lahjapatsaista.',
    lahde: 'en-Wikipedia "Sounion", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-samothrace',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-samothrace-8db2c8e6.jpg',
      lyhyt: 'Samothraken Nike -patsas laivan keulan muotoisella jalustalla Louvressa.',
      selite: 'Siivekäs marmorinen voitonjumalatar seisoo kivisen laivankeulan päällä; patsas löydettiin Samothrakelta ja se on nykyisin Louvressa Pariisissa.',
      lahde: 'Valokuva: Shonagon, Wikimedia Commons (CC0).',
      tekija: 'Shonagon',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Victoire_de_Samothrace_-_Musee_du_Louvre_-_20190812.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-samothrace-4a78c64a.jpg',
        lyhyt: 'Suurten jumalien pyhäkön rauniot ja doorilaisia pylväitä meren äärellä Samothrakella.',
        selite: 'Palaiopoliin pyhäkköalueen kivimuurien ja perustusten takana kohoaa pylväsrivi, taustalla häämöttää meri.',
        lahde: 'Valokuva: Ggia, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Ggia',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:20020800_Sanctuary_of_the_Great_Gods_Palaiopolis_Samothrace_island_Thrace_Greece.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Samothrake',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mikä Voiton Nike on?',
      'Mikä Suurten jumalien pyhäkkö oli?',
    ],
    korostukset: ['Nike|Nike'],
    nappi: 'Pohjois-Egeanmeren vuorisaari, jolta ranskalaiset löytävät Nike-patsaan 1863',
    // 25.5875 E / 40.45 N — en-Wikipedia "Samothrace"
    laudat: {
      maailmankartta: { x: 6686.2, y: 1785.2 },
      europe: { x: 702.5, y: 829.8 },
    },
    teksti: 'Samothrake on kreikkalainen saari Pohjois-Egeanmerellä ja kunta Evroksen alueella '
      + 'Traakiassa. Saari on 17 kilometriä pitkä ja 178 neliökilometrin kokoinen, ja vuonna '
      + '2021 siellä asui 2 596 ihmistä. Se on yksi Kreikan karuimmista saarista, ja sen '
      + 'korkein huippu on Saos-vuoren Fengari, 1 611 metriä. Saaren tunnetuin paikka on '
      + 'Suurten jumalien pyhäkkö, jossa pidettiin tärkeitä hellenistisiä ja esihellenistisiä '
      + 'uskonnollisia seremonioita. Pyhäkön tunnetuin esine on noin vuodelta 190 eaa. '
      + 'peräisin oleva 2,5 metrin marmoripatsas Nike, nykyisin Samothraken Nike eli Siivekäs '
      + 'voitto, joka löydettiin palasina saarelta vuonna 1863 ja on nyt Louvressa '
      + 'Pariisissa.',
    lahde: 'en-Wikipedia "Samothrace", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-meteora',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-meteora-37312a55.jpg',
      lyhyt: 'Meteoran jyrkät hiekkakivipylväät ja luostari yhden kallion kyljessä.',
      selite: 'Korkeat, pilarimaiset kalliot nousevat metsän yli Thessalian tasangon yllä; oikealla luostari on rakennettu kalliopylvään kylkeen.',
      lahde: 'Valokuva: KASPAR, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'KASPAR',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Meteora_morning.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-meteora-7eb763ca.jpg',
        lyhyt: 'Pieni kivinen ja tiilinen kappeli kalliojyrkänteen edessä Suuren Meteoron luostarin alueella.',
        selite: 'Kivestä ja tiilestä muurattu tienvarsikappeli terrakottakattoineen seisoo kiveystetyllä terassilla, taustalla luolien uurtama kalliopinta.',
        lahde: 'Valokuva: Bernard Gagnon, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Bernard Gagnon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Great_Meteoron_Monastery_04.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Meteora',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miten luostarit rakennettiin kalliopylväiden päälle?',
      'Miksi Meteoraa sanotaan Athoksen jälkeen tärkeimmäksi?',
    ],
    korostukset: ['Suuri Meteoron|Suuri Meteoron'],
    nappi: 'Kalliopylväiden huipuille rakennetut luostarit Thessalian tasangolla',
    // 21.63111111 E / 39.71416667 N — en-Wikipedia "Meteora"
    laudat: {
      maailmankartta: { x: 6554.4, y: 1814.1 },
      europe: { x: 626.5, y: 849.1 },
    },
    teksti: 'Meteora on kalliomuodostuma Trikalan alueella Thessaliassa Luoteis-Kreikassa, ja '
      + 'siinä on yksi ortodoksisen kirkon merkittävimmistä luostarikomplekseista; sitä '
      + 'pidetään paikallisesti tärkeydessä toisena vain Athos-vuoren jälkeen. Kalliopylväät '
      + 'ja kukkulamaiset lohkareet nousevat yli 20 metrin korkeuteen. Niiden huipulle '
      + 'perustettiin 24 luostaria pääasiassa 1300-luvun jälkipuoliskolla serbien, '
      + 'kreikkalaisten ja albaanien keisariksi itsensä julistaneen Simeon Uroksen hallinnon '
      + 'aikana. Joulukuussa 2025 neljä alkuperäistä luostaria oli edelleen käytössä ja '
      + 'avoinna vierailijoille: Suuri Meteoron (perustettu 1356), Varlaam, Pyhä Kolminaisuus '
      + 'ja Pyhä Stefanos, joka muuttui nunnaluostariksi vuonna 1961.',
    lahde: 'en-Wikipedia "Meteora", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-athos',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-athos-92c879cd.jpg',
      lyhyt: 'Simonopetran luostari kohoaa yksinäisellä kalliolla Athos-vuoren rinteellä.',
      selite: 'Simonos Petran luostari nähtynä Singitinlahdelta: monikerroksinen rakennus on kiinnitetty jyrkälle kalliolle metsäisen vuoristorinteen keskelle.',
      lahde: 'Valokuva: Laurens R. Krol, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Laurens R. Krol',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2017-05-27_Greece,_Chalkidiki,_Athos_DSC_2318_DxO_1.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-athos-5490fa12.jpg',
        lyhyt: 'Dionysiou\'n luostari kallionnokalla meren rannalla.',
        selite: 'Dionysiou\'n luostarin kivinen torni ja monikerroksiset rakennukset kohoavat kalliolla, alapuolella porrastettuja kiviterasseja ja edessä meri.',
        lahde: 'Valokuva: Explorer1940, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Explorer1940',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Athos_--_Dionysiou_Monastery_03.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-athos-01977291.jpg',
        lyhyt: 'Athos-vuoren terävä huippu kohoaa meren takaa Sithonian rannalta katsottuna.',
        selite: 'Kaukaa Sarti-rannalta Sithonialta otetussa kuvassa Athos-vuori piirtyy sinisenä vuorena horisonttiin meren yllä.',
        lahde: 'Valokuva: Kritzolina, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Kritzolina',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mount_Athos_seen_from_Sarti_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Athoksen luostarit',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi naiset eivät pääse Athokselle?',
      'Kuka Athoksen luostareita hallitsee?',
    ],
    korostukset: ['munkkiyhteisö|munkkiyhteisön'],
    nappi: 'Ortodoksisten munkkien niemimaa, jonne naiset eivät pääse',
    // 24.32727778 E / 40.15833333 N — en-Wikipedia "Mount Athos"
    laudat: {
      maailmankartta: { x: 6644.2, y: 1796.7 },
      europe: { x: 678.3, y: 837.4 },
    },
    teksti: 'Athos on vuori samannimisellä niemimaalla Koillis-Kreikassa suoraan Egeanmeren '
      + 'rannalla, ja se on tärkeä itäortodoksisen luostarielämän keskus. Vuori ja suurin osa '
      + 'niemimaasta on autonominen hallintoalue Kreikassa, jota hallitsee Athoksen '
      + 'munkkiyhteisö, joka kuuluu kirkollisesti suoraan Konstantinopolin ekumeenisen '
      + 'patriarkan alaisuuteen. Kreikan lain ja uskonnollisen perinteen mukaan naiset eivät '
      + 'saa mennä munkkiyhteisön hallitsemalle alueelle. Athoksella on asuttu antiikista '
      + 'lähtien, ja sen kristillinen luostaripaikka ulottuu ainakin 800-luvulle '
      + 'bysanttilaiselle ajalle. UNESCO merkitsi Athoksen munkkiyhteisön '
      + 'maailmanperintöluetteloon vuonna 1988 luostareiden hyvin säilyneen arkkitehtuurin ja '
      + 'niemimaan luonnon säilymisen vuoksi.',
    lahde: 'en-Wikipedia "Mount Athos", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-metsovo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-metsovo-69178ef1.jpg',
      lyhyt: 'Lumiset katot ja savuavat savupiiput Metsovossa, taustalla Pindos-vuoriston lumihuippu.',
      selite: 'Metsovon kylän talojen lumipeitteisiä kattoja ja katuvaloja talvella; taustalla kohoaa lumen peittämä vuorenrinne ja kuusimetsää.',
      lahde: 'Valokuva: Ginak97, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ginak97',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Metsovo_town.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-metsovo-d7736330.jpg',
        lyhyt: 'Kivisiä savupiippuja liuskekivikatolla Metsovossa.',
        selite: 'Kaksi kivestä muurattua savupiippua kohoaa liuskekivikatolta, taustalla Pindos-vuoriston metsäinen rinne ja syksyn keltaista lehvistöä.',
        lahde: 'Valokuva: DimitrisP67, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'DimitrisP67',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Metsovo_Greece.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-metsovo-38520371.jpg',
        lyhyt: 'Kivinen katu ja kaareva puuovi Metsovon vanhassa kylässä.',
        selite: 'Kiveyksellä päällystetty kapea katu kulkee kivitalojen välissä; vasemmalla on holvikaarinen puuovi ja liuskekivinen ovikatos.',
        lahde: 'Valokuva: C messier, Wikimedia Commons (CC0).',
        tekija: 'C messier',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Metsovo_8295693.JPG',
        lisenssi: 'CC0',
        lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
    ],
    nimi: 'Metsovo',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Keitä aromanialaiset ovat?',
      'Mitä Metsovon juustoja on?',
    ],
    korostukset: ['Metsovone|Metsovone'],
    nappi: 'Pindoksen vuoristokaupunki, jossa Aromanian-kansa elää yhä',
    // 21.18383889 E / 39.77027778 N — en-Wikipedia "Metsovo"
    laudat: {
      maailmankartta: { x: 6539.5, y: 1811.9 },
      europe: { x: 617.9, y: 847.6 },
    },
    teksti: 'Metsovo on kaupunki Epeiroksessa Pindoksen vuoristossa Pohjois-Kreikassa, Ioanninan '
      + 'ja Meteoran välissä. Se on Kreikan suurin aromanialaisten eli vlahien elämän keskus '
      + 'ja laaja alueellinen keskus, jonka ympärillä on useita pieniä kyliä Pindoksen '
      + 'seudulla. Kaupungin talous perustuu maanviljelyyn ja matkailuun, joka kukoistaa '
      + 'erityisesti talvella. Metsovo on kuuluisa paikallisista juustoistaan, joihin '
      + 'kuuluvat Metsovone ja Metsovela, sekä viininvalmistuksestaan, muun muassa Averoffin '
      + 'suvun Katógi-viinitarhasta. Kaupungissa on Georgios Averoffin, hyväntekijän '
      + '(1815–1899), mukaan nimetty Averoff-galleria.',
    lahde: 'en-Wikipedia "Metsovo", johdanto-osa ja osiot "Notable people" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-korfu',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-korfu-1146bd4b.jpg',
      lyhyt: 'Korfun vanha linnoitus kohoaa kalliolla vanhan kaupungin kattojen ja kellotornin yllä.',
      selite: 'Kuvassa näkyvät Korfun vanhan kaupungin kattojen yläpuolelle kohoava Vanha linnoitus ja kirkon kellotorni. Vanha linnoitus ja vanha kaupunki kuuluvat Unescon maailmanperintökohteisiin.',
      lahde: 'Valokuva: Martin Falbisoner, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Martin Falbisoner',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_Old_Fortress_and_the_Old_Town_of_Corfu_-_September_2017.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-korfu-a4a3dca9.jpg',
        lyhyt: 'Achilleionin palatsi valkoisine pylväineen cypressien ja palmujen keskellä.',
        selite: 'Achilleionin palatsi Korfulla; valkoinen uusklassinen rakennus pylväsparvekkeineen sijaitsee puutarhan cypressien ja palmujen ympäröimänä.',
        lahde: 'Valokuva: ChrLoukop, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'ChrLoukop',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Αχίλλειον_Achilleion_Corfu.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Korfu',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Korfu oli tärkeä linnoitus?',
      'Mikä on Kerkyra?',
    ],
    korostukset: ['Kerkyra|Kerkyra'],
    nappi: 'Venetsialaisten linnoittama Joonianmeren saari, joka torjui ottomaanit',
    // 19.87 E / 39.6 N — en-Wikipedia "Corfu"
    laudat: {
      maailmankartta: { x: 6495.7, y: 1818.6 },
      europe: { x: 592.7, y: 852.1 },
    },
    teksti: 'Korfu eli Kerkyra on yksi Joonianmeren saarista Länsi-Kreikassa, ja se on pohjoisin '
      + 'saari Kreikan länsirannikolla, lukuun ottamatta sen Diapontian-satelliittisaaria, '
      + 'jotka ovat koko Kreikan läntisin kohta. Saari on sidoksissa Kreikan historiaan '
      + 'kreikkalaisen mytologian alusta lähtien. Keskiajalta 1600-luvulle asti saari kuului '
      + 'vuodesta 1204 Venetsian tasavaltaan, ja se torjui menestyksekkäästi ottomaanit '
      + 'useissa piirityksissä; sitä pidettiin Euroopan valtioiden ja Ottomaanien valtakunnan '
      + 'välisenä linnakkeena ja se oli yksi Euroopan vahvimmin linnoitetuista paikoista. '
      + 'Vuonna 2007 saaren vanhakaupunki lisättiin UNESCOn maailmanperintöluetteloon, ja '
      + 'Korfu on suosittu matkailukohde.',
    lahde: 'en-Wikipedia "Corfu", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kastoria',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-kastoria-903af132.jpg',
      lyhyt: 'Kastorian kaupunki kohoaa rinteelle Orestiada-järven rannalla, etualalla sininen vene.',
      selite: 'Kuva näyttää Kastorian kaupungin ja Orestiada-järven. Talot nousevat rinteelle niemen kärjessä järven rannassa.',
      lahde: 'Valokuva: Pvasiliadis, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Pvasiliadis',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kastoria2_200704.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-kastoria-768fc2e9.jpg',
        lyhyt: 'Kivetty katu Kastorian vanhassa kaupungissa vanhojen kivi- ja puutalojen välissä.',
        selite: 'Kastorian vanhan kaupungin kuja, jonka varrella on perinteisiä kivijalkaisia ja ulokkeellisia puurakenteisia taloja sekä katulyhtyjä.',
        lahde: 'Valokuva: stefg74, Wikimedia Commons (CC BY 2.0).',
        tekija: 'stefg74',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Old_Street_Kastoria.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Kastoria',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Kastoriaa sanotaan majavan paikaksi?',
      'Miksi Kastoria tunnetaan turkiksista?',
    ],
    korostukset: ['turkis|turkisteollisuudestaan'],
    nappi: 'Järven ympäröimä bysanttilaisten kirkkojen ja turkiskauppiaiden kaupunki',
    // 21.26666667 E / 40.51666667 N — en-Wikipedia "Kastoria"
    laudat: {
      maailmankartta: { x: 6542.2, y: 1782.5 },
      europe: { x: 619.5, y: 828 },
    },
    teksti: 'Kastoria on kaupunki Pohjois-Kreikassa Länsi-Makedoniassa, Kastorian alueen '
      + 'pääkaupunki. Se sijaitsee niemellä Orestiada-järven läntisellä rannalla laaksossa, '
      + 'jota ympäröivät kalkkikivivuoret. Kaupunki on tunnettu monista bysanttilaisista '
      + 'kirkoistaan, bysanttilaisesta ja ottomaanien ajan asuinarkkitehtuuristaan, '
      + 'järvestään ja turkisteollisuudestaan. Nimi Kastoria tarkoittaa majavien paikkaa, ja '
      + 'se johtuu kreikan sanasta kastori, majava, joka oli eläin, jota asui järven '
      + 'rannoilla. Ensimmäisen kerran kaupunki mainitaan historioitsija Ioannes Skylitzeksen '
      + 'kirjoituksessa 900-luvun lopulta. Kreikan sisällissodan jälkeen suuri joukko '
      + 'Kastorian kreikkalaisia muutti ulkomaille, ja 1980-luvulla New Yorkin seudulla heitä '
      + 'oli 25 000, ja he työskentelivät turkkureina.',
    lahde: 'en-Wikipedia "Kastoria", johdanto-osa ja osio "Name" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-naoussa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-naoussa-67d6ac89.jpg',
      lyhyt: 'Naoussan punakattoinen kaupunki näkyy laajana panoraamana Pyhän Theologoksen tieltä.',
      selite: 'Näkymä Naoussan kaupunkiin Pyhän Theologoksen ja Selin suuntaan johtavalta tieltä; taustalla avautuu tasanko.',
      lahde: 'Valokuva: Frangiscoder, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Frangiscoder',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Naousa_view_from_St_Theologos_hill_1.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-naoussa-0157e331.jpg',
        lyhyt: 'Puinen kävelysilta Arapitsa-joen yllä Naoussassa, taustalla vuoret.',
        selite: 'Kuvattu Naoussan kaupungissa Arapitsa-joen varrella; kävelysillalta näkyy joen pieni pato ja lehtevää rinnettä vuorten edessä.',
        lahde: 'Valokuva: Frangiscoder, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Frangiscoder',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Naousa,_Imathia_(1).jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-naoussa-0f13f524.jpg',
        lyhyt: 'Viinitarha vuorten juurella Naoussan seudulla.',
        selite: 'Kuvan kuvauksen mukaan viinitarhassa kasvatetaan Xinomavro-rypälettä, Naoussan ylänköjen tärkeintä punaviinirypälettä. Kuvan resoluutio on pieni.',
        lahde: 'Valokuva: Vagrand, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Vagrand',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vineyard_in_Naoussa,_Central_Macedonia,_Greece.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Naoussa',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Miksi Naoussa on Sankarikaupunki?',
      'Mikä Mieza oli?',
    ],
    korostukset: ['viini|viininvalmistuksestaan'],
    nappi: 'Vermion-vuoren juurella oleva viinikaupunki, jonka nimi on Sankarikaupunki',
    // 22.06666667 E / 40.63333333 N — en-Wikipedia "Naousa, Imathia"
    laudat: {
      maailmankartta: { x: 6568.9, y: 1777.9 },
      europe: { x: 634.9, y: 824.9 },
    },
    teksti: 'Naousa on kaupunki Imathian alueella Keski-Makedoniassa Kreikassa Vermion-vuorten '
      + 'juurella. Vuoden 2021 väestönlaskennan mukaan kaupungissa asui 19 706 ihmistä ja '
      + 'saman niminen metropolialue 30 054. Vuonna 1955 kuninkaallinen asetus nimesi Naousan '
      + 'sankarikaupungiksi, ja sen jälkeen kunnan virallinen nimi on ollut Naousan '
      + 'sankarikaupunki, kunnioittamaan asukkaiden taistelua Kreikan vapaussodassa. Naousa '
      + 'on kuuluisa karnevaalistaan, hiihtokeskuksestaan ja viininvalmistuksestaan sekä '
      + 'antiikin Miezan alueella löydetyistä arkeologisista kohteista. Kaupunki sai sadassa '
      + 'vuodessa väkilukunsa lähes kaksinkertaiseksi, ja sen maine perustui sekä viineihin '
      + 'että koulutustoimintaan.',
    lahde: 'en-Wikipedia "Naousa, Imathia", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-lavrio',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-lavrio-c2317a73.jpg',
      lyhyt: 'Lavrion vanhoja teollisuusrakennuksia kukkulan rinteellä.',
      selite: 'Lavrion teknologinen puisto Kaakkois-Attikassa; kuvassa vanhoja kivi- ja puurakenteisia teollisuusrakennuksia punatiilikattoineen ja sähköasema-rakenteita.',
      lahde: 'Valokuva: Dr Peter Tzeferis, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Dr Peter Tzeferis',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lavrion_ruins.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-lavrio-9503b5ac.jpg',
        lyhyt: 'Thorikosin antiikin teatterin katsomo ja malmin rikastukseen käytetty pesuallas.',
        selite: 'Thorikosin antiikin teatterin rauniot Lavrion alueella; etualalla on lyijymalmin rikastukseen käytetty pesuallas.',
        lahde: 'Valokuva: Dr Peter Tzeferis, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Dr Peter Tzeferis',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ancient_Theatre_of_Thorikos_and_Level_washery.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Lavrion hopeakaivokset',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Miksi hopea oli Ateenalle tärkeää?',
      'Mitä Themistokles teki hopealla?',
    ],
    korostukset: ['hopea|hopeakaivoksistaan'],
    nappi: 'Attikan hopeakaivosten kaupunki, jonka hopea rahoitti Ateenan laivaston',
    // 24.05 E / 37.7 N — en-Wikipedia "Lavrio"
    laudat: {
      maailmankartta: { x: 6635, y: 1892.4 },
      europe: { x: 673, y: 902.1 },
    },
    teksti: 'Lavrio on kaupunki Attikan kaakkoisosassa Kreikassa, ja se kuuluu Ateenan '
      + 'suurkaupunkialueeseen. Laurium tunnettiin antiikissa hopeakaivoksistaan, jotka '
      + 'olivat yksi Ateenan valtion tärkeimmistä tulonlähteistä, ja hopeaa käytettiin '
      + 'pääasiassa rahoihin. Kaupunki on noin 60 kilometriä Ateenan keskustasta kaakkoon '
      + 'lahdella, josta näkee Makronisos-saaren. Varhaisimmat todisteet louhinnasta ovat '
      + 'pronssikauden alusta, noin vuodelta 3200 eaa., ja järjestelmällinen louhinta näyttää '
      + 'alkaneen 500-luvulla eaa. Peisistratoksen aikana. Marathonin taistelun jälkeen '
      + 'Themistokles sai ateenalaiset käyttämään noin vuonna 483 eaa. tehdyn suuren '
      + 'hopeasuonen löydön tuotot laivaston laajentamiseen 200 triremiin.',
    lahde: 'en-Wikipedia "Lavrio", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kalavryta',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-kalavryta-8350b209.jpg',
      lyhyt: 'Hammasraidejuna ylittää kivisen sillan vehreässä rotkossa.',
      selite: 'Diakofto–Kalavryta-hammasraiteen (Odontotos) juna kivisellä sillalla rotkon rinteiden ja lehtipuiden keskellä.',
      lahde: 'Valokuva: Leonidas Kourmadas, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Leonidas Kourmadas',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Odontotos.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-kalavryta-02942b5f.jpg',
        lyhyt: 'Mega Spileon luostarin rakennukset nojaavat pystysuoraan kallioseinään.',
        selite: 'Mega Spileon luostari Kalavrytan lähellä; luostarin rakennukset nousevat jyrkän kalliojyrkänteen vieressä.',
        lahde: 'Valokuva: Rigorius, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Rigorius',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mega-Spileo_20230923_121614.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kalavryta',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mikä hammasraide on?',
      'Mitä Agia Lavrassa tapahtui vuonna 1821?',
    ],
    korostukset: ['hammasraide|hammasraiteen'],
    nappi: 'Vuoristokaupunki, jossa kapinan lippu nostettiin 1821 ja jonne rakennetaan myöhemmin hammasraide',
    // 22.11666667 E / 38.03333333 N — en-Wikipedia "Kalavryta"
    laudat: {
      maailmankartta: { x: 6570.6, y: 1879.5 },
      europe: { x: 635.8, y: 893.3 },
    },
    teksti: 'Kalavryta on kaupunki ja kunta Achaian alueen vuoristoisessa itä-keskiosassa '
      + 'Kreikassa. Kaupunki on Vouraikos-joen oikealla rannalla, 24 kilometriä Aigiosta '
      + 'etelään, 40 kilometriä Patrasista kaakkoon ja 62 kilometriä Tripolista luoteeseen. '
      + 'Kalavryta on Diakopto–Kalavryta-hammasraiteen eteläinen päätepiste, jonka '
      + 'italialaiset insinöörit rakensivat vuosina 1885–1895. Keskiajan lopulla kaupunki oli '
      + 'Achaian frankkiruhtinaskunnan Kalavrytan paronikunnan keskus, ja se valloitettiin '
      + 'uudelleen bysanttilaisille 1270-luvulla. Kreikan vapaussodan alussa Kalavryta oli '
      + 'merkittävässä asemassa: Agia Lavran luostarissa Vanhan Patran piispa Germanos III '
      + 'nosti kapinan lipun 21. maaliskuuta 1821.',
    lahde: 'en-Wikipedia "Kalavryta", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-chios',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-chios-4e184190.jpg',
      lyhyt: 'Kapea katu Pyrgin kylässä, jossa talojen seinät on koristeltu geometrisilla kuvioilla.',
      selite: 'Pyrgi on Mastichochoria-kylistä tunnettu Chioksen kylä; kuvan taloissa on kylälle tyypillisiä harmaavalkoisia geometrisia julkisivukoristeita.',
      lahde: 'Valokuva: Eva-tzi, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Eva-tzi',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pyrgi_village_photo_1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-chios-a02c75e0.jpg',
        lyhyt: 'Kirkas mastiksihartsin pisara valuu mastiksipuun rungosta.',
        selite: 'Mastiksipuusta (Pistacia lentiscus) valuvat hartsipisarat, joita kutsutaan mastiksin kyyneleiksi.',
        lahde: 'Valokuva: Palden Dorenský, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Palden Dorenský',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Chioska_masticha.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-chios-25bfd772.jpg',
        lyhyt: 'Bysanttilainen mosaiikki Nea Monin luostarin kirkossa.',
        selite: 'Kultapohjainen kuvamosaiikki Nea Monin luostarissa Chioksella; kuvan kirjoituksena on Anastasis.',
        lahde: 'Valokuva: Tash1000, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Tash1000',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nea_Moni.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Chios ja mastiksi',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Mitä mastiksi on?',
      'Mikä Nea Moni on?',
    ],
    korostukset: ['mastiksi|mastiksia'],
    nappi: 'Ottomaanien mastiksisaari, jonka hartsi on tunnettu vientituote',
    // 26.065 E / 38.3775 N — en-Wikipedia "Chios"
    laudat: {
      maailmankartta: { x: 6702.2, y: 1866.2 },
      europe: { x: 711.6, y: 884.3 },
    },
    teksti: 'Chios eli Scio on Kreikan viidenneksi suurin saari, ja se sijaitsee pohjoisella '
      + 'Egeanmerellä. Saarta erottaa Anatolian mantereesta Chioksen salmi. Chios on tunnettu '
      + 'mastiksihartsin viennistä, ja sen lempinimi on mastiksisaari. Nähtävyyksiin kuuluvat '
      + 'keskiaikaiset kylät ja 1000-luvun Nea Monin luostari, joka on UNESCOn '
      + 'maailmanperintökohde. Saaren pääkaupunki on Chios eli Chora, ja mastiksia tuottava '
      + 'eteläinen alue on Mastichochória. Saari kuului Ottomaanien valtakuntaan vuoteen 1912 '
      + 'asti. Vapaussodan aikana vuonna 1822 saari koki Chioksen verilöylyn.',
    lahde: 'en-Wikipedia "Chios", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-zagori',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-zagori-bc32c434.jpg',
      lyhyt: 'Kalogeriko-kivisilta kohoaa syksyn värittämässä Zagorin rotkomaisemassa.',
      selite: 'Kalogeriko- eli Plakidan silta on kolmikaarinen kivisilta Zagorin alueella Epeiroksessa. Kuvassa se ylittää ruskaisen, ruskeana virtaavan joen.',
      lahde: 'Valokuva: Jolovema, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Jolovema',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Old_Bridge_Kalogeriko.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-zagori-a0bf62a2.jpg',
        lyhyt: 'Kiviportaat ja kivimuurit Zagorin kylässä, taustalla vuoren kalliojyrkänteet.',
        selite: 'Kuvassa on Megalo Papingon kylä Zagorissa: kivitaloja, kivetty polku ja portaat sekä kylän yläpuolella kohoava vuoristo.',
        lahde: 'Valokuva: GPierrakos, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'GPierrakos',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Μεγάλο_Πάπιγκο_φθινόπωρο.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Zagorin kivisillat',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi Zagorin kylät oli yhdistetty kivisilloilla?',
      'Mitä Zagorin ulkomaankauppa oli?',
    ],
    korostukset: ['kivisilta|kivisilloilla'],
    nappi: 'Epeiroksen vuoristokylät, joita yhdistävät kaarisillat',
    // 20.7 E / 39.86666667 N — en-Wikipedia "Zagori"
    laudat: {
      maailmankartta: { x: 6523.3, y: 1808.1 },
      europe: { x: 608.6, y: 845.1 },
    },
    teksti: 'Zagori on alue, kunta ja UNESCOn maailmanperintökohde Pindoksen vuoristossa '
      + 'Epeiroksessa Luoteis-Kreikassa. Sen pinta-ala on noin tuhat neliökilometriä ja '
      + 'siihen kuuluu 46 kylää, joita kutsutaan Zagorin kyliksi. Väkeä alueella on noin 3 '
      + '400, eli asukastiheys on 3,4 asukasta neliökilometrillä. Zagori on erittäin kaunista '
      + 'luontoa, jossa on näyttävä geologia ja kaksi kansallispuistoa: toinen käsittää '
      + 'Aoos-joen ja Vikosin rotkon, toinen Valia Kaldan. Zagorin 46 kylää oli yhdistetty '
      + 'toisiinsa vuoristoteillä ja perinteisillä kaarevilla kivisilloilla. 1600-luvulta '
      + 'alkaen alueen talous perustui pääasiassa ulkomaille muuttaneiden lähettämiin '
      + 'rahoihin ja testamentteihin.',
    lahde: 'en-Wikipedia "Zagori", johdanto-osa ja osio "Geography" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-arta',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-arta-2ab427bd.jpg',
      lyhyt: 'Artan kaarisilta ylittää joen pilvisen taivaan alla.',
      selite: 'Artan kivisilta on monikaarinen silta Arachthos-joen yllä Epeiroksessa. Kuvassa silta näkyy joen rantapromenadilta, taustalla vuoria.',
      lahde: 'Valokuva: Jennikann, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Jennikann',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Arta_Bridge.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-arta-665c6b6e.jpg',
        lyhyt: 'Valaistu Artan silta yöllä, kaaret heijastuvat joen pintaan.',
        selite: 'Yökuvassa Artan kivisillan kaaret on valaistu ja joen ranta loistaa vastarannalla. Sama silta näyttää yöllä aivan toisenlaiselta kuin päivällä.',
        lahde: 'Valokuva: vlachos yorgos, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'vlachos yorgos',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bridge_of_arta.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Artan silta',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mitä Artan sillan kansanlaulu kertoo?',
      'Miksi silta rakennettiin monta kertaa?',
    ],
    korostukset: ['kansanballadi|kansanballadi'],
    nappi: 'Kivisilta, jonka laesta tulee myöhemmin Ottomaanien ja Kreikan raja (1881)',
    // 20.97472222 E / 39.15166667 N — en-Wikipedia "Bridge of Arta"
    laudat: {
      maailmankartta: { x: 6532.5, y: 1836.1 },
      europe: { x: 613.9, y: 863.9 },
    },
    teksti: 'Artan silta on kivisilta, joka ylittää Arachthos-joen Artan kaupungin länsipuolella '
      + 'Luoteis-Kreikassa. Se on rakennettu uudelleen monta kertaa vuosisatojen kuluessa, '
      + 'alkaen roomalaisajan tai ehkä vanhemmista perustuksista, ja nykyinen silta on '
      + 'luultavasti 1600-luvun ottomaanien rakentama. Artan sillan kansanballadi kertoo '
      + 'ihmisuhrista sillan rakentamisen aikana, ja ballaadista on syntynyt useita '
      + 'kreikkalaisia sananparsia, jotka liittyvät loputtomiin viivytyksiin: päivällä '
      + 'rakennettiin, ja yöllä se romahti. Perinteen mukaan silta rakennettiin uudelleen, '
      + 'kun Arta tuli Epeiroksen despotaatin pääkaupungiksi. Kun Arta liitettiin Kreikkaan '
      + 'vuonna 1881, sillan korkein kohta oli vuoteen 1912 asti Ottomaanien valtakunnan ja '
      + 'Kreikan kuningaskunnan raja.',
    lahde: 'en-Wikipedia "Bridge of Arta", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-thermopylae',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-thermopylae-a4682ae1.jpg',
      lyhyt: 'Leonidaksen patsas kohoaa Thermopylain muistomerkin muurin päällä.',
      selite: 'Thermopylain muistomerkillä seisoo keihästä kohottava soturipatsas jalustallaan, ja sen takana on kaiverrettu marmorimuuri. Kuvan nimi ja kuvaus viittaavat Thermopylain Leonidas-muistomerkkiin.',
      lahde: 'Valokuva: Ribouldingue, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ribouldingue',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Leonidas-Denkmal_Thermopylen.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-thermopylae-7d2082fe.jpg',
        lyhyt: 'Thermopylain solaa reunustavat jyrkät, metsäiset vuorenrinteet.',
        selite: 'Kuvassa näkyy Thermopylain kapea maantieteellinen käytävä: jyrkkä vuorenseinämä nousee aivan tien vierestä. Tällaisessa ahtaassa paikassa Thermopylain solataistelu käytiin antiikin aikana.',
        lahde: 'Valokuva: Davide Mauro, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Davide Mauro',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Thermopylae_panorama_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Thermopylai',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä Thermopylain taistelussa tapahtui?',
      'Mitä Simonideen epitafi sanoo?',
    ],
    korostukset: ['Leonidas|Leonidas'],
    nappi: 'Kuumien lähteiden solakohta, jonka epitafi tunnetaan yhä',
    // 22.56277778 E / 38.80527778 N — en-Wikipedia "Thermopylae"
    laudat: {
      maailmankartta: { x: 6585.4, y: 1849.6 },
      europe: { x: 644.4, y: 873 },
    },
    teksti: 'Thermopylai on kapea solakohta ja nykyaikainen kaupunki Lamian alueella '
      + 'Phthiotiksessa Kreikassa. Nimi tarkoittaa kuumia portteja, ja se tulee paikan '
      + 'kuumista rikkilähteistä; kreikkalaisessa mytologiassa Kuumat portit olivat yksi '
      + 'Haadeksen sisäänkäynneistä. Paikka on kuuluisa vuoden 480 eaa. taistelusta, jossa '
      + 'kreikkalaisjoukot, joiden joukossa oli 300 spartalaista, kohtasivat hyökkäävät '
      + 'persialaiset. Taistelua muistetaan Keoksen Simonideen epitafilla, jossa sanotaan, '
      + 'että ohikulkijan tulee kertoa spartalaisille, että täällä he makaavat noudattaen '
      + 'lakeja. Thermopylai on ainoa riittävän suuri maayhteys Lokriin ja Thessalian '
      + 'välillä, ja nykyisen moottoritien itäpuolella on kuningas Leonidas I:n muistomerkki.',
    lahde: 'en-Wikipedia "Thermopylae", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-missolonghi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-missolonghi-1cfcd35c.jpg',
      lyhyt: 'Paalujen päällä seisovat kalastajamajat Mesolongin laguunissa.',
      selite: 'Mesolongin laguunin matalassa vedessä on laituri ja kolme paaluille rakennettua majaa, joita kutsutaan pelades-taloiksi. Taustalla näkyy vuoristoa pilvisen taivaan alla.',
      lahde: 'Valokuva: JuliaVafiades, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'JuliaVafiades',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Messolonghi_Lagoon_"Pelades"_houses.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-missolonghi-a58b15c6.jpg',
        lyhyt: 'Marmoripatsaita ja kiviportaita Mesolongin Sankarien puutarhassa.',
        selite: 'Mesolongin Sankarien puutarhassa on muistomerkkejä ja marmoripatsaita kiviportaiden ja kukkapenkkien keskellä.',
        lahde: 'Valokuva: Efthimios Tsilikidis, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Efthimios Tsilikidis',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gardenofheroes1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Mesolongi',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Mesolongi sai nimen Pyhä kaupunki?',
      'Miksi Byron tuli Kreikkaan?',
    ],
    korostukset: ['Byron|Byron'],
    nappi: 'Laguunikaupunki, jossa Byron kuoli ja jonka piiritys 1826 tunnetaan Euroopassa',
    // 21.42777778 E / 38.36916667 N — en-Wikipedia "Missolonghi"
    laudat: {
      maailmankartta: { x: 6547.6, y: 1866.5 },
      europe: { x: 622.6, y: 884.5 },
    },
    teksti: 'Mesolongi eli Missolonghi on kaupunki Länsi-Kreikassa ja Aitolia-Akarnanian alueen '
      + 'pääkaupunki. Vuoden 2021 väestönlaskennan mukaan kunnassa asuu 32 048 ihmistä, '
      + 'joista 13 965 kaupungissa. Kaupunki on Achelooksen ja Evinoksen jokien välissä ja '
      + 'sillä on satama Patrasin lahdella; sen kauppatavaroita ovat kala, viini ja tupakka. '
      + 'Läheinen Mesolongin–Aitolikon laguuniryhmä on osa aluetta. Mesolongi tunnetaan '
      + 'Kreikan vapaussodan aikaisesta dramaattisesta piirityksestä, jossa myös runoilija '
      + 'Lord Byron kuoli. Asukkaiden sankarillisen vastarinnan ja sen jälkeisen '
      + 'kaupunkilaisten teurastuksen vuoksi Mesolongi sai kunnianimen Hiera Polis eli Pyhä '
      + 'kaupunki, joka on ainutlaatuinen Kreikan kaupunkien joukossa.',
    lahde: 'en-Wikipedia "Missolonghi", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-navarino',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-navarino-e325bc89.jpg',
      lyhyt: 'Pylosin satama ja kaupunki Navarinon lahden rannalla, oikealla Sfakteria-saari.',
      selite: 'Kuvassa näkyy Pylosin kaupunki ja venesatama Navarinon lahden rannalla. Oikealla horisontissa on Sfakteria-saari, joka rajaa lahtea merelle päin.',
      lahde: 'Valokuva: Dnalor 01, Wikimedia Commons (CC BY-SA 3.0 at).',
      tekija: 'Dnalor 01',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pylos_mit_Sfaktiria.JPG',
      lisenssi: 'CC BY-SA 3.0 at',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/at/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/grc-nosto-navarino-6e337d04.jpg',
        lyhyt: 'Navarinon meritaistelu 1827: laivoja savun keskellä lahdella.',
        selite: 'Ambroise Louis Garneray\'n maalaus esittää vuoden 1827 Navarinon meritaistelua: purjelaivoja ja tykinsavua lahdella, taustalla vuori ja kaupunki.',
        lahde: 'Maalaus: Ambroise Louis Garneray, Wikimedia Commons (public domain).',
        tekija: 'Ambroise Louis Garneray',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Navarino-A_L_Garneray.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Navarino',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Navarinon taistelu oli tärkeä?',
      'Ketkä taistelivat Navarinolla?',
    ],
    korostukset: ['Navarinon taistelu|Navarinon taistelu'],
    nappi: 'Lahti, jonne liittoutuneet laivastot purjehtivat Kreikan vapautta varten',
    // 21.68777778 E / 36.93583333 N — en-Wikipedia "Battle of Navarino"
    laudat: {
      maailmankartta: { x: 6556.3, y: 1921.8 },
      europe: { x: 627.6, y: 922.2 },
    },
    teksti: 'Navarinon taistelu oli meritaistelu, joka käytiin 20. lokakuuta 1827 Kreikan '
      + 'vapaussodan aikana Navarinon lahdella, nykyisen Pyloksen kohdalla Peloponnesoksen '
      + 'länsirannikolla Joonianmerellä. Britannian, Ranskan ja Venäjän liittoutuneet joukot '
      + 'kukistivat ratkaisevasti ottomaanien ja egyptiläiset joukot, jotka yrittivät '
      + 'tukahduttaa kreikkalaiset, ja tekivät näin Kreikan itsenäisyydestä paljon '
      + 'todennäköisemmän. Ottomaanien laivasto, johon kuului keisarillisten sotalaivojen '
      + 'lisäksi laivueita Egyptin, Algerin ja Tunisin alueilta, tuhoutui. Se oli historian '
      + 'viimeinen suuri meritaistelu, joka käytiin kokonaan purjelaivoilla, vaikka useimmat '
      + 'laivat taistelivat ankkurissa. Liittoutuneiden voitto perustui ylivoimaiseen '
      + 'tulivoimaan ja tykkitaitoon.',
    lahde: 'en-Wikipedia "Battle of Navarino", johdanto-osa (tarkistettu 19.9.2026).',
  },
];
