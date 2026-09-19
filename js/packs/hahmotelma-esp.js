/*
 * ESPANJAN HAHMOTELMANOSTOT — EU-maiden karttanostot, pilotti Espanja.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48) =====
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla, pilottimaa
 * Espanja (omistaja 19.9.2026). Malli on Ranskan hahmotelma
 * (js/packs/hahmotelma-fra.js, PAATOKSET 33 ja 44): jokaisella nostolla
 * on valmis sisältö — `teksti` 3–5 virkettä Wikipedian johdannosta
 * omin sanoin suomeksi (ei käännöskopiota, ei keksittyjä faktoja,
 * `lahde`-riville artikkeli ja tarkistuspäivä), 1873-näkökulman
 * `nappi`-alaotsikko, kaksi pulun kysymystä, `korostukset` ja
 * vähintään kaksi Commons-kuvaa (`kuva` + `kuvat`; vain public domain /
 * CC0 / CC BY / CC BY-SA, tekijä, lisenssi ja lähdesivu kirjattuna,
 * jokaisen kuvan tiedot luettu Commonsin extmetadata-rajapinnasta).
 * Vuoden 1873 jälkeiset kohteet (Vizcayan silta 1893, La Tomatina 1945)
 * ovat mukana: teksti on nykytietoa ja `nappi` katsoo vuodesta 1873
 * eteenpäin ("tänne nousee myöhemmin…").
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat 1800 px leveitä JPEG-tiedostoja, nimeltään
 * `esp-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on kirjattu pakkaan
 * etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/esp/.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin Ranskan hahmotelmalla: nämä ovat kaikki aidosti
 * kaupungin ulkopuolella (lähin Espanjan pelikaupunki — Madrid,
 * Barcelona, Granada, Sevilla — on 15 lautayksikön päässä, raja
 * KAUPUNGIN_KOHDALLA_SADE on 7), ja js/fokuskohteet.js liittää rivit
 * KOHDE_MAAT.ESP:hen. `lahi: true` on sama lähizoomiportti kuin
 * Ranskan hahmotelmalla (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin
 * nimi on kirjattu rivin viereen. Las Navas de Tolosa: en-Wikipedian
 * taistelu-artikkelilla ei ole koordinaattia, joten piste on
 * es-Wikipedian "Batalla de las Navas de Tolosa" (Fablen päätös
 * 19.9.2026). Riotinto: kaivosaltaan artikkelilla ei ole pistettä;
 * piste on Corta Atalaya -avolouhoksen. Tordesillas: sopimuksen
 * artikkelilla ei ole pistettä; piste on kaupungin. Finisterre:
 * en-Wikipedian piste on niemen kärjessä olevan majakan kohdalla
 * (maalla, ei meressä; PAATOKSET 34 kohta 17). Laudan luvut on
 * laskettu pelin omalla kaavalla (tools/johda-maastokohteet.mjs
 * `laudat`, Millerin lieriö ja europe-tasaväli). Jokainen rivi osuu
 * Espanjan fokuslehden rajaukseen (`osuuLehteen`).
 *
 * === MITÄ JÄI POIS ===================================================
 *
 * Kohdelistalla (docs/raportit/viesti-fable-nostot-esp-lista-20260919.md)
 * oli 30 kohdetta; mitkä jäivät pois ja miksi, kerrotaan raportissa
 * docs/raportit/viesti-fable-nostot-esp-20260920.md.
 */

/** Espanjan hahmotelmanostot: sisällölliset kohteet kaupunkien ulkopuolella. */
export const HAHMOTELMA_ESP = [
  {
    id: 'hahmotelma-picos-de-europa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-picos-de-europa-4a99ed3e.jpg',
      lyhyt: 'Naranjo de Bulnesin eli Picu Urriellun kalkkikivinen kallioseinämä sinistä taivasta vasten.',
      selite: 'Urriellun jyrkkä vaalea kalkkikivitorni nähtynä sen juurelta Urriellun suojan tienoilta. Vuoren rinnalla näkyy rosoisia Picos de Europan huippuja.',
      lahde: 'Valokuva: AnaisGoepner, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'AnaisGoepner',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pico_Urriellu_o_Naranjo_de_Bulnes_desde_su_base-Refugio_Urriellu-PN_Picos_de_Europa-Asturias-Spain.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-picos-de-europa-f201d6d0.jpg',
        lyhyt: 'Cares-joen rotko ja rinteeseen louhittu Ruta del Cares -reitti Picos de Europassa.',
        selite: 'Kalkkikiviseinämien väliin painuva Cares-joen kurulaakso, jossa joki virtaa vaahtoisena alhaalla ja polku kulkee kivimuurin tukemana rinteessä. Reitti kulkee Asturian ja Leónin maakuntien välillä.',
        lahde: 'Valokuva: Javier Mendia García from leioa, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Javier Mendia García from leioa',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ruta_del_cares_(14072443456).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-picos-de-europa-83eb92f0.jpg',
        lyhyt: 'Sumu nousee vihreään laaksoon, ja taustalla kohoaa Naranjo de Bulnes vuoriston lumisten huippujen vieressä.',
        selite: 'Näkymä Asturian puolelta Picos de Europan vuorille: Naranjo de Bulnesin torni erottuu vasemmalla, ja laakson rinteellä on kivirakennus.',
        lahde: 'Valokuva: AnaisGoepner, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'AnaisGoepner',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Naranjo_de_Bulnes_al_fondo-Entrando_la_niebla-Picos_de_Europa-Asturias-Spain.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Picos de Europa',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi vuoria sanotaan Euroopan huipuiksi?',
      'Mitä eläimiä vuorilla elää?',
    ],
    korostukset: ['kalkkikivi|kalkkikiveä'],
    nappi: 'Kalkkikivihuiput, jotka Amerikasta palaavat laivat näkevät ensin',
    // -4.8 E / 43.2 N — en-Wikipedia "Picos de Europa"
    laudat: {
      maailmankartta: { x: 5673.3, y: 1675.3 },
      europe: { x: 119, y: 757.4 },
    },
    teksti: 'Picos de Europa eli Euroopan huiput on noin 20 kilometriä pitkä vuoristo Kantabrian '
      + 'vuorten osana Pohjois-Espanjassa. Se ulottuu Asturian, Kantabrian ja Kastilia ja '
      + 'Leónin alueille, ja sen korkein huippu on 2 650 metriä korkea Torre de Cerredo. '
      + 'Lähes kaikki kallio on kalkkikiveä, jota jäätiköt ovat muovanneet karstimaisemaksi, '
      + 'ja 1,5 kilometriä syvä Caresin rotko erottaa keski- ja länsimassiivin toisistaan. '
      + 'Nimen tunnetuin selitys on, että vuoret olivat Amerikasta purjehtivien laivojen '
      + 'ensimmäinen näky Euroopasta.',
    lahde: 'en-Wikipedia "Picos de Europa", johdanto-osa sekä osiot "Name" ja "Geography" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-cabo-de-finisterre',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-cabo-de-finisterre-42cb4eaa.jpg',
      lyhyt: 'Finisterren niemen majakka valkoisine julkisivuineen kirkasta taivasta vasten.',
      selite: 'Faro de Finisterre Fisterran niemellä Galiciassa: valkoinen kivireunainen rakennus, jonka katolla on lyhtytorni. Rakennuksen seinässä lukee majakan nimi.',
      lahde: 'Valokuva: Basotxerri, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Basotxerri',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cabo_de_Fisterra_-_Faro_-BT-_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-cabo-de-finisterre-6123698f.jpg',
        lyhyt: 'Finisterren majakan lyhtytorni läheltä katsottuna.',
        selite: 'Fisterran majakan lasinen lyhtyhuone ja sen sisällä oleva linssi, ympärillä mastot. Kuva on otettu auringonlaskun aikaan.',
        lahde: 'Valokuva: Luis Miguel Bugallo Sánchez, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Luis Miguel Bugallo Sánchez',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Faro_de_Fisterra_-Galiza.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Finisterren niemi',
    tyyppi: 'meri',
    lahi: true,
    kysymykset: [
      'Onko Finisterre todella Euroopan läntisin kohta?',
      'Mitä nimi Finisterre tarkoittaa?',
    ],
    korostukset: ['finis terrae|finis terrae'],
    nappi: 'Niemi, jota roomalaiset pitivät maailman päänä',
    // -9.27222222 E / 42.8825 N — en-Wikipedia "Cape Finisterre"
    laudat: {
      maailmankartta: { x: 5524.3, y: 1688.1 },
      europe: { x: 33.2, y: 765.8 },
    },
    teksti: 'Finisterren niemi on kallioinen niemimaa Galician länsirannikolla. Roomalaisten '
      + 'aikaan sitä pidettiin tunnetun maailman äärenä, ja nimi tulee latinan sanoista finis '
      + 'terrae, maan pää. Joskus sitä sanotaan Iberian niemimaan läntisimmäksi pisteeksi, '
      + 'mutta Portugalin Cabo da Roca on noin 16,5 kilometriä ja Espanjan Cabo Touriñán '
      + 'runsaat sata metriä länsipuolempana. Niemellä kohoaa 238 metrin korkuinen Monte '
      + 'Facho, jonka laella on majakka, ja lähellä on Fisterran kalastajakaupunki. Antiikin '
      + 'aikaan seudulla asui keltteihin kuuluva artabrien heimo.',
    lahde: 'en-Wikipedia "Cape Finisterre", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-bardenas-reales',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-bardenas-reales-4160fb26.jpg',
      lyhyt: 'Castildetierra-torni kohoaa eroosion uurtamasta savi- ja hiekkakivimaastosta Bardenas Realesissa.',
      selite: 'Castildetierra on Bardenas Realesin kivimuodostelma: kartiomainen, uurteinen kumpu, jonka huipulla on kovemmasta kivestä koostuva kerros. Kuva on otettu aamulla, ja taustalla häämöttää tasanko.',
      lahde: 'Valokuva: Ant°AM, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ant°AM',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castildetierra_-_Summer_morning.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-bardenas-reales-6008db2e.jpg',
        lyhyt: 'Puoliaavikkomaisella tasangolla on osittain sortunut kivirakennus ja taustalla tasakattoinen kumpu.',
        selite: 'Bardenas Realesin Navarran puoliaavikkoa: karua, harvaan kasvillisuuden peittämää tasankoa, eroosion muovaamia kumpuja ja rapistuneen kivirakennuksen rauniot.',
        lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Diego Delso',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bardenas_Reales,_Navarra,_España,_2015-01-06,_DD_01.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Bardenas Reales',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi maasto on niin autio?',
      'Mistä Valkoinen Bardena on saanut nimensä?',
    ],
    korostukset: ['badlands|badlands-maisema'],
    nappi: 'Navarran autio savimaa, jossa vesi ja tuuli veistävät kalliota',
    // -1.47 E / 42.19083333 N — en-Wikipedia "Bardenas Reales"
    laudat: {
      maailmankartta: { x: 5784.3, y: 1715.9 },
      europe: { x: 183, y: 784 },
    },
    teksti: 'Bardenas Reales on noin 42 000 hehtaarin puoliaavikko ja badlands-maisema '
      + 'Kaakkois-Navarrassa. Maaperä on savea, liitua ja hiekkakiveä, ja vesi ja tuuli ovat '
      + 'kuluttaneet siitä kanjoneita, ylätasanteita ja yksittäisiä kumpuja, joita kutsutaan '
      + 'cabezoiksi. Alueella ei ole taajamia, kasvillisuutta on niukasti ja monet purot ovat '
      + 'kuivillaan suurimman osan vuotta. Keskeinen Valkoinen Bardena on saanut nimensä '
      + 'pinnalla näkyvästä valkoisesta suolasta, jota kipsipitoinen maa tuottaa, ja '
      + 'kaakkoinen Musta Bardena on kasvillisuuden peittämä.',
    lahde: 'en-Wikipedia "Bardenas Reales", johdanto-osa sekä osio "Location" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-tablas-de-daimiel',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-tablas-de-daimiel-db0253f8.jpg',
      lyhyt: 'Puinen kävelysilta kulkee ruokojen halki Tablas de Daimielin kansallispuistossa.',
      selite: 'Kansallispuiston kosteikon poikki kulkeva puukäytävä, jonka molemmilla puolilla kasvaa korkeaa ruovikkoa. Taustalla siintää vuorijono.',
      lahde: 'Valokuva: Xemenendura, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Xemenendura',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tablas_de_Daimiel_2.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-tablas-de-daimiel-6cd571e4.jpg',
        lyhyt: 'Tablas de Daimielin kosteikon avovettä ja ruovikkosaarekkeita pilvisen taivaan alla.',
        selite: 'Näkymä Tablas de Daimielin kosteikolle: matala tasainen vesialue, jossa on ruovikon peittämiä saarekkeita, ja horisontissa pensaikkoa.',
        lahde: 'Valokuva: Jl FilpoC, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jl FilpoC',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Panorámica_de_las_Tablas_de_Daimiel.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Tablas de Daimiel',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Miksi kosteikko on vaarassa?',
      'Mikä Ramsar-sopimus on?',
    ],
    korostukset: ['Ramsar-sopimuksen|Ramsar-sopimuksen'],
    nappi: 'Kuivan La Manchan keskelle jäänyt kosteikko',
    // -3.66666667 E / 39.15 N — en-Wikipedia "Tablas de Daimiel National Park"
    laudat: {
      maailmankartta: { x: 5711.1, y: 1836.2 },
      europe: { x: 140.8, y: 864 },
    },
    teksti: 'Tablas de Daimiel on kosteikko La Manchan tasangolla Ciudad Realin maakunnassa, '
      + 'alueella joka on muuten enimmäkseen kuivaa. Noin 3 000 hehtaarin kansallispuisto on '
      + 'Espanjan viidestätoista kansallispuistosta pienin. Kosteikko kuuluu '
      + 'Ramsar-sopimuksen suojelukohteisiin, on Mancha Húmeda -biosfäärialueen ydin ja '
      + 'lintujen erityissuojelualue. Veden liikakäyttö on vahingoittanut kosteikkoa, ja '
      + 'suojelualuetta on laajentamassa ympäröiville kuivaviljelymaille, jotta sen tila '
      + 'paranisi.',
    lahde: 'en-Wikipedia "Tablas de Daimiel National Park", johdanto-osa (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-sierra-de-gredos',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-sierra-de-gredos-9c168447.jpg',
      lyhyt: 'Gredosin jäätikkökehto ja Laguna Grande -järvi rosoisten graniittihuippujen ympäröimänä.',
      selite: 'Circo de Gredos on jäätikön muovaama kehtolaakso Sierra de Gredosin pohjoisrinteellä Sistema Centralin vuoristossa. Kuvassa tumma vuoristojärvi lepää kivisen amfiteatterin pohjalla.',
      lahde: 'Valokuva: Frayle, Wikimedia Commons (CC0).',
      tekija: 'Frayle',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Circo_de_Gredos_(35529466142).jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-sierra-de-gredos-ddb35e00.jpg',
        lyhyt: 'Lumipeitteiset Gredosin huiput hehkuvat vaaleanpunaisina talviaamun auringossa.',
        selite: 'Talvinen auringonnousu Gredosin kehdon yllä: kuvatekstin mukaan keskellä kohoaa Almanzor (2592 m), sen vieressä Risco Moreno ja La Galana.',
        lahde: 'Valokuva: Torobravo2011, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Torobravo2011',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pico_Almanzor_wintery_sunrise.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Sierra de Gredos',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Keitä vettonit olivat?',
      'Mikä on Gredosin korkein huippu?',
    ],
    korostukset: ['vettonit|vettonit'],
    nappi: 'Vuoristo, jossa asui jo roomalaisia edeltäneitä heimoja',
    // -5.08333333 E / 40.3 N — en-Wikipedia "Sierra de Gredos"
    laudat: {
      maailmankartta: { x: 5663.9, y: 1791.1 },
      europe: { x: 113.6, y: 833.7 },
    },
    teksti: 'Sierra de Gredos on vuoristo Keski-Espanjassa, ja se ulottuu Ávilan, Salamancan, '
      + 'Cáceresin, Madridin ja Toledon maakuntiin. Se kuuluu laajempaan Sistema Central '
      + '-vuoristoon, ja sen korkein kohta on 2 592 metrin Pico Almanzor. Kastilia ja Leónin '
      + 'autonominen alue on julistanut osan vuoristosta luonnonpuistoksi. Vuoristosta laskee '
      + 'viisi jokilaaksoa, muun muassa Alto Tormes, Alto Alberche ja La Vera. Tunnetuista '
      + 'ensimmäisistä asukkaista vettonit olivat roomalaisia edeltänyt keltteihin kuuluva '
      + 'kansa.',
    lahde: 'en-Wikipedia "Sierra de Gredos", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-tabernas',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-tabernas-a2f30462.jpg',
      lyhyt: 'Tabernasin autiomaan eroosion uurtamia rotkoja ja kuivia harjuja Almeríassa.',
      selite: 'Karua, kasvillisuudesta lähes paljasta badlands-maisemaa Almerían maakunnassa Espanjan kaakkoisosassa. Kuivan uoman ympärillä kohoavat kellertävät ja harmaat rinteet, taustalla siintää vuoristo.',
      lahde: 'Valokuva: Amjad Sheikh, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Amjad Sheikh',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:TheTabernasDesert.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-tabernas-0a429437.jpg',
        lyhyt: 'Sortuneita kalliolohkareita ja vaaleita savirinteitä Tabernasin autiomaan kuivan uoman varrella.',
        selite: 'Lähikuva Tabernasin autiomaan rinteestä: tummia kivilohkareita on irronnut vaaleiden, eroosion kuluttamien rinteiden päältä. Kuvassa oleva pieni ihmishahmo antaa mittakaavan.',
        lahde: 'Valokuva: Pablo, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Pablo',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Desierto_de_Tabernas,_Almería_(8603339045).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Tabernasin autiomaa',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Onko Tabernas todella Euroopan ainoa aavikko?',
      'Mitä elokuvia täällä on kuvattu?',
    ],
    korostukset: ['aavikko|aavikkona'],
    nappi: 'Euroopan ainoa aavikko, jonka ympärillä vuoret nousevat',
    // -2.45 E / 37 N — en-Wikipedia "Tabernas Desert"
    laudat: {
      maailmankartta: { x: 5751.7, y: 1919.3 },
      europe: { x: 164.2, y: 920.5 },
    },
    teksti: 'Tabernasin autiomaa sijaitsee Almerían maakunnassa Kaakkois-Espanjassa, noin 30 '
      + 'kilometriä maakunnan pääkaupungista Almeríasta pohjoiseen. Sitä pidetään Euroopan '
      + 'ainoana aavikkona, koska suurimmalla osalla aluetta vallitsee aavikkoilmasto. '
      + 'Korkean ja vuorisen sijaintinsa vuoksi siellä sataa rannikkoa enemmän, yli 220 '
      + 'millimetriä vuodessa. Luonnonsuojelualue on 280 neliökilometrin laajuinen, ja sitä '
      + 'rajaavat pohjoisessa Sierra de los Filabres, kaakossa Sierra Alhamilla ja lännessä '
      + 'Sierra Nevada. Alueella on kuvattu 1950-luvun lopulta lähtien yli 300 elokuvaa, '
      + 'useimmat lännenelokuvia.',
    lahde: 'en-Wikipedia "Tabernas Desert", johdanto-osa ja osio "Cinema" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-sierra-de-cazorla',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-sierra-de-cazorla-d4157a61.jpg',
      lyhyt: 'Valdeazoresin laguuni ja havumetsäiset rinteet Cazorlan vuoristossa.',
      selite: 'Kirkasvetinen Valdeazoresin laguuni Sierras de Cazorla, Segura y las Villas -luonnonpuistossa. Ympärillä kohoavat mäntymetsäiset vuorenrinteet.',
      lahde: 'Valokuva: Edmundo Sáez, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Edmundo Sáez',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Laguna_de_Valdeazores.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-sierra-de-cazorla-3a39a5f2.jpg',
        lyhyt: 'Guadalquivirin lähde: vesi solisee sammaloituneiden kivien yli.',
        selite: 'Guadalquivir-joen alkulähde Sierras de Cazorla, Segura y las Villas -luonnonpuistossa. Vesi purkautuu sammalpeitteisten kallioiden lomasta kirkkaaseen lampeen.',
        lahde: 'Valokuva: Edmundo Sáez, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Edmundo Sáez',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nacimiento_del_Guadalquivir_3.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Sierra de Cazorla',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mistä Guadalquivirin nimi tulee?',
      'Mitä eläimiä puistossa elää?',
    ],
    korostukset: ['Guadalquivir-joen|Guadalquivir-joen'],
    nappi: 'Vuoret, joista Guadalquivir lähtee kohti merta',
    // -2.95833333 E / 37.93666667 N — en-Wikipedia "Sierra de Cazorla"
    laudat: {
      maailmankartta: { x: 5734.7, y: 1883.3 },
      europe: { x: 154.4, y: 895.9 },
    },
    teksti: 'Sierra de Cazorla on Prebaetic-järjestelmään kuuluva vuorijono Jaénin maakunnassa '
      + 'Etelä-Espanjassa, ja se on nimetty Cazorlan kaupungin mukaan. Korkein huippu on 1 '
      + '847 metrin Gilillo. Vuorten välisissä laaksoissa ovat muun muassa Guadalquivir-joen '
      + 'latvat: joki kulkee ensin noin 50 kilometriä koilliseen ja kääntyy sitten länteen '
      + 'kohti Atlanttia. Seutu kuuluu Cazorlan, Segura ja Las Villasin luonnonpuistoon, joka '
      + 'perustettiin 1986. Sen 2 099 neliökilometriä tekevät siitä Espanjan suurimman ja '
      + 'Euroopan toiseksi suurimman suojelualueen.',
    lahde: 'en-Wikipedia "Sierra de Cazorla" ja "Sierras de Cazorla, Segura y Las Villas Natural '
      + 'Park", johdanto-osat sekä osio "Geography" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-atapuerca',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-atapuerca-dc602489.jpg',
      lyhyt: 'Sorapolku Atapuercan rautatieleikkauksen kallioseinämien välissä.',
      selite: 'Näkymä Atapuercan Trinchera-leikkauksen sisäänkäynniltä: kalliojyrkänteiden välissä kulkeva polku, jonka päällä näkyy kaivausalueen suojakatos.',
      lahde: 'Valokuva: Malopez 21, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Malopez 21',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Atapuerca,_vista_de_la_trinchera.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-atapuerca-83935466.jpg',
        lyhyt: 'Gran Dolinan kaivauskohde telineineen kalliojyrkänteen edessä.',
        selite: 'Atapuercan Gran Dolinan kaivauskohde: kalliojyrkänteen edessä on työtelineitä ja suojakatos, ja kyltti kertoo kohteen nimen.',
        lahde: 'Valokuva: Malopez 21, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Malopez 21',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Atapuerca,_excavaci%C3%B3n_Gran_Dolina.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Atapuerca',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mikä Homo antecessor oli?',
      'Mitä luolista on löydetty?',
    ],
    korostukset: ['Homo antecessor|Homo antecessor'],
    nappi: 'Kukkulat, joiden luolat kätkevät ihmisen esihistoriaa',
    // -3.52222222 E / 42.36666667 N — en-Wikipedia "Atapuerca Mountains"
    laudat: {
      maailmankartta: { x: 5715.9, y: 1708.9 },
      europe: { x: 143.6, y: 779.4 },
    },
    teksti: 'Atapuercan vuoret ovat karstikukkuloiden ryhmä Atapuercan kylän lähellä Burgosin '
      + 'maakunnassa Pohjois-Espanjassa. Yhä jatkuvissa kaivauksissa on löytynyt fossiileja '
      + 'ja kivityökaluja, jotka kuuluvat Länsi-Euroopan vanhimmille tunnetuille '
      + 'ihmisasukkaille. Alueella ovat asuneet Homo erectus, Homo antecessor, Homo '
      + 'heidelbergensis ja neandertalinihminen. Varmimmin ajoitetut vanhimmat löydöt ovat '
      + '1,2 miljoonan ja 630 000 vuoden ikäisiä. Osa löydöistä on esillä lähellä Burgosin '
      + 'Ihmisen evoluution museossa.',
    lahde: 'en-Wikipedia "Atapuerca Mountains", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-covadonga',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-covadonga-5ef6fcf7.jpg',
      lyhyt: 'Covadongan Santa Cueva: pieni kappeli kalliolouhikon suojassa.',
      selite: 'Covadongan pyhäkön Santa Cueva -luola Asturiassa. Pieni kivikappeli on rakennettu jyrkän kallioseinämän onkaloon, ja sen edessä kulkee kaiteellinen kävelytaso.',
      lahde: 'Valokuva: Zarateman, Wikimedia Commons (CC0).',
      tekija: 'Zarateman',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Covadonga_-_Cueva_Santa_03.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-covadonga-0a34016d.jpg',
        lyhyt: 'Luis de Madrazon maalaus: Pelayo julistetaan kuninkaaksi Covadongassa.',
        selite: 'Luis de Madrazon vuonna 1855 valmistunut maalaus, joka esittää Pelayon julistamista Asturian kuninkaaksi Covadongassa. Kuvauksen mukaan tapahtuma liitetään Reconquistan alkuun.',
        lahde: 'Maalaus: Luis de Madrazo, Wikimedia Commons (public domain).',
        tekija: 'Luis de Madrazo',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:El_rey_Don_Pelayo_en_Covadonga_(Museo_del_Prado).jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Covadonga',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka Pelayo oli?',
      'Mikä Reconquista oli?',
    ],
    korostukset: ['Reconquista|Reconquistan'],
    nappi: 'Vuoristoluola, josta Reconquistan taru lähtee',
    // -5.05555556 E / 43.30888889 N — en-Wikipedia "Battle of Covadonga"
    laudat: {
      maailmankartta: { x: 5664.8, y: 1670.9 },
      europe: { x: 114.1, y: 754.6 },
    },
    teksti: 'Covadongan taistelu käytiin vuonna 722 Asturian Pelayon joukkojen ja '
      + 'Umayyad-kalifaatin komentajien Alqaman ja Munuzan armeijan välillä Picos de Europan '
      + 'vuoristossa. Kristityt voittivat. Tapahtumaa pidetään perinteisesti Asturian '
      + 'kuningaskunnan perustavana hetkenä ja siksi kristittyjen takaisinvalloituksen, '
      + 'Reconquistan, alkupisteenä sen jälkeen, kun umayyadit olivat vallanneet Iberian '
      + 'vuonna 711. Yhdeksännen vuosisadan lopun mozarabikirjoitusten mukaan visigootit '
      + 'valitsivat Pelayon johtajakseen vuonna 718, ja hän aloitti kapinan pääpaikkanaan '
      + 'Cangas de Onís.',
    lahde: 'en-Wikipedia "Battle of Covadonga", johdanto-osa ja osio "Prelude" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-roncesvalles',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-roncesvalles-24d91611.jpg',
      lyhyt: 'Roncesvallesin kollegiaattikirkon kellotorni ja ruusuikkuna metsäisen mäen edessä.',
      selite: 'Roncesvallesin Real Colegiata de Santa María, Jaakobin tien varrella. Kuvassa näkyvät kivinen kellotorni, suuri ruusuikkuna ja goottilainen portaali.',
      lahde: 'Valokuva: AlexKramer(ZGZ), Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'AlexKramer(ZGZ)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Real_Colegiata_de_Santa_Mar%C3%ADa_de_Roncesvalles.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-roncesvalles-c467e561.jpg',
        lyhyt: 'Roncesvallesin luostarialueen pihakuja ja kirkko vuorten katveessa.',
        selite: 'Näkymä Roncesvallesin kollegiaattikirkon ja sitä ympäröivien valkoisten rakennusten pihalle. Taustalla kohoaa metsäinen vuorenrinne.',
        lahde: 'Valokuva: Cherubino, Wikimedia Commons (CC BY-SA 3.0 es).',
        tekija: 'Cherubino',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2012_Roncesvalles_01_Iglesia.JPG',
        lisenssi: 'CC BY-SA 3.0 es',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/es/deed.en',
      },
    ],
    nimi: 'Roncesvalles',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka Roland oli?',
      'Miksi pyhiinvaellus alkaa täältä?',
    ],
    korostukset: ['Rolandin|Rolandin'],
    nappi: 'Solakylä, josta pyhiinvaeltajat lähtevät kohti Santiagoa',
    // -1.32 E / 43.00916667 N — en-Wikipedia "Roncesvalles"
    laudat: {
      maailmankartta: { x: 5789.3, y: 1683 },
      europe: { x: 185.9, y: 762.5 },
    },
    teksti: 'Roncesvalles on pieni kylä Navarrassa Pohjois-Espanjassa, Pyreneillä noin 900 metrin '
      + 'korkeudessa ja linnuntietä neljän kilometrin päässä Ranskan rajasta. Se tunnetaan '
      + 'historiassa ja legendassa Rolandin kuolemasta vuonna 778, kun baskiheimot tuhosivat '
      + 'Kaarle Suuren jälkijoukon. Santa María de Roncesvallesin kollegiaattikirkko, entinen '
      + 'pyhiinvaeltajien hospitaali, rakennettiin 1100-luvun lopulla ja 1200-luvun alussa, '
      + 'ja vanhin rakennus on romaaninen Sancti Spiritus -kappeli eli Kaarle Suuren siilo. '
      + 'Joka vuosi tuhannet pyhiinvaeltajat aloittavat täältä tiensä Santiago de '
      + 'Compostelaan.',
    lahde: 'en-Wikipedia "Roncesvalles", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-numancia',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-numancia-16ad4b74.jpg',
      lyhyt: 'Numancian kiviset perustukset ja olkikattoinen jälleenrakennettu talo Garrayn kukkulalla.',
      selite: 'Näkymä Numancian arkeologiselta kaivausalueelta Soriassa: kivimuurien jäänteitä ja olkikattoinen jälleenrakennettu talo.',
      lahde: 'Kuva: Txo, Wikimedia Commons (public domain).',
      tekija: 'Txo',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nunmancia_1.JPG',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-numancia-3054a634.jpg',
        lyhyt: 'Jälleenrakennetut olkikattoiset puiset vartiotornit Numancian kukkulalla.',
        selite: 'Numancian arkeologisella alueella jälleenrakennetut olkikattoiset puiset vartiotornit kivi- ja savimuurin päällä.',
        lahde: 'Valokuva: Multitud, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Multitud',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Numancia.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Numancia',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuinka monta asukasta Numanciassa oli?',
      'Kuka Scipio Aemilianus oli?',
    ],
    korostukset: ['Scipio Aemilianus|Scipio Aemilianus'],
    nappi: 'Kukkulakylä, joka valitsi tuhon antautumisen sijaan',
    // -2.44425833 E / 41.80958611 N — en-Wikipedia "Numantia"
    laudat: {
      maailmankartta: { x: 5751.9, y: 1731.2 },
      europe: { x: 164.3, y: 794 },
    },
    teksti: 'Numancia oli keltiberialainen asutus, jonka rauniot ovat Cerro de la Muela '
      + '-kukkulalla Garrayn kunnassa Sorian maakunnassa. Se tunnetaan keltiberisodista: '
      + 'ensimmäinen vakava yhteenotto Rooman kanssa oli vuonna 153 eaa., ja vuonna 133 eaa. '
      + 'Rooman senaatti antoi Scipio Aemilianus Africanukselle tehtäväksi tuhota kaupunki. '
      + 'Scipio rakensi sen ympärille yhdeksän kilometrin saartomuurin torneineen ja '
      + 'vallihautoineen. Kahdeksan kuukauden jälkeen suurin osa asukkaista päätti kuolla '
      + 'mieluummin kuin joutua orjiksi, ja muutama sata poltti kaupungin 13 kuukauden '
      + 'piirityksen jälkeen.',
    lahde: 'en-Wikipedia "Numantia", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-trujillo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-trujillo-5af8158d.jpg',
      lyhyt: 'Trujillon Plaza Mayor arkadeineen, San Martínin kirkko ja Pizarron ratsastajapatsas.',
      selite: 'Trujillon 1500-luvun Plaza Mayor Extremadurassa. Kuvassa näkyvät torin arkadit, San Martínin kirkko ja Francisco Pizarron ratsastajapatsas.',
      lahde: 'Valokuva: José Luis Filpo Cabana, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'José Luis Filpo Cabana',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Plaza_mayor_de_Trujillo_(s._XVI).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-trujillo-6dfa0c22.jpg',
        lyhyt: 'Francisco Pizarron pronssinen ratsastajapatsas Trujillon torilla.',
        selite: 'Francisco Pizarron ratsastajapatsas (1927) Trujillon Plaza Mayorilla. Patsaan on tehnyt Charles Cary Rumsey, ja taustalla näkyvät torin kivitalot.',
        lahde: 'Valokuva: José Luis Filpo Cabana, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'José Luis Filpo Cabana',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Francisco_Pizarro,_Charles_Cary_Rumsey_(Trujillo).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-trujillo-ee94b864.jpg',
        lyhyt: 'Trujillon linnan tornit ja krenelointi kivimuurien takaa.',
        selite: 'Trujillon linna Cáceresin maakunnassa: kivitornit ja hammastetut muurit kohoavat kukkulan laella.',
        lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Diego Delso',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castillo_de_Trujillo,_C%C3%A1ceres,_Espa%C3%B1a,_2023-07-22,_DD_10.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Trujillo',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka Francisco Pizarro oli?',
      'Mikä Plaza Mayor on?',
    ],
    korostukset: ['Francisco Pizarro|Francisco Pizarrosta'],
    nappi: 'Graniittikukkulan kaupunki, josta conquistadorin tie alkoi',
    // -5.87888889 E / 39.46527778 N — en-Wikipedia "Trujillo, Spain"
    laudat: {
      maailmankartta: { x: 5637.4, y: 1823.9 },
      europe: { x: 98.3, y: 855.7 },
    },
    teksti: 'Trujillo on kunta Cáceresin maakunnassa Extremaduran alueella. Se syntyi alun perin '
      + 'helposti linnoitettavalle graniittikukkulalle, ja sen vanhassa kaupungissa on paljon '
      + 'keskiaikaisia ja renessanssin rakennuksia. Roomalaisaikana paikka tunnettiin nimellä '
      + 'Turgalium. Kaupunki vallattiin lopullisesti takaisin muslimeilta 25. tammikuuta '
      + '1232, ja legendan mukaan kristityt saivat taistelussa rohkeutta nähtyään Neitsyt '
      + 'Marian linnan tornien välissä. Plaza Mayorilla on ratsastajapatsas conquistador '
      + 'Francisco Pizarrosta, joka oli Trujillon poika.',
    lahde: 'en-Wikipedia "Trujillo, Spain", johdanto-osa ja osiot "History" ja "Main sights" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-el-escorial',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-el-escorial-8122eccd.jpg',
      lyhyt: 'El Escorialin luostarilinna ylhäältä nähtynä, ympärillään tammimetsää.',
      selite: 'Ilmakuvamainen näkymä vuoristosta: suorakaiteen muotoinen graniittikompleksi, keskellä kirkon kupoli ja kaksi kellotornia sekä nurkkatornit. Alla näkyy San Lorenzon kaupungin kattoja.',
      lahde: 'Valokuva: Zvonimir Stamenov, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Zvonimir Stamenov',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Monasterio_de_El_Escorial_en_Madrid.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-el-escorial-e946400e.jpg',
        lyhyt: 'Luostarin pääportti ja julkisivu graniittiaukion takana.',
        selite: 'Länsijulkisivun pääportti on Juan de Herreran suunnittelema, ja se on omistettu suojelupyhimys Laurentiukselle, jonka patsas seisoo julkisivun yläosan syvennyksessä.',
        lahde: 'Valokuva: José Luis Filpo Cabana, Wikimedia Commons (CC BY 3.0).',
        tekija: 'José Luis Filpo Cabana',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Monasterio_de_El_Escorial._Portada_principal.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-el-escorial-12d10a9d.jpg',
        lyhyt: 'Luostarin pensasaitapuutarha (Jardín de los Frailes) ja graniittiseinä.',
        selite: 'Geometrisiksi kuvioiksi leikatut pensasaidat muodostavat munkkien puutarhan luostarin kyljessä; oikealla näkyy graniittirakennuksen kulma ja taustalla avautuu maisema.',
        lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Diego Delso',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Real_Monasterio_de_San_Lorenzo_de_El_Escorial,_Madrid,_España,_2025-12-30,_DD_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'El Escorial',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Filip II rakennutti El Escorialin?',
      'Mitä kaikkea El Escorialissa on?',
    ],
    korostukset: ['Filip II|Filip II:n'],
    nappi: 'Kuninkaan luostarilinna vuoriston juurella',
    // -4.15 E / 40.59 N — en-Wikipedia "El Escorial"
    laudat: {
      maailmankartta: { x: 5695, y: 1779.6 },
      europe: { x: 131.5, y: 826.1 },
    },
    teksti: 'San Lorenzo de El Escorialin kuninkaallinen paikka on Espanjan kuninkaan '
      + 'historiallinen residenssi noin 45 kilometriä Madridista luoteeseen. Filip II:n '
      + 'käskystä vuosina 1563–1584 rakennettu El Escorial on maailman suurin '
      + 'renessanssirakennus. Se on samalla luostari, basilika, palatsi, hautakammio, '
      + 'kirjasto, museo, yliopisto, koulu ja sairaala. Kompleksiin kuuluu myös noin viiden '
      + 'kilometrin päässä oleva La Granjilla de La Fresneda, kuninkaan metsästysmaja ja '
      + 'munkkien retriitti. Luostarin perustivat hieronymiittimunkit, ja nykyisin se on '
      + 'augustinolaisen ritarikunnan luostari.',
    lahde: 'en-Wikipedia "El Escorial", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-yuste',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-yuste-38ac40a0.jpg',
      lyhyt: 'Yusten luostarin kirkko ja palatsi kivimuurin ja metsäisen rinteen takaa.',
      selite: 'Kivinen luostarikirkko kohoaa vuoren juurella, ja sen vieressä näkyy palatsirakennus kaarevine arkadeineen ja puisine parvekkeineen. Luostari on ollut hieronymiittiveljien suojeluksessa vuodesta 1415.',
      lahde: 'Valokuva: José Luis Filpo Cabana, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'José Luis Filpo Cabana',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Real_Monasterio_de_Yuste.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-yuste-c0756845.jpg',
        lyhyt: 'Huone Kaarle V:n palatsissa Yustessa: graniittitakka ja tumma kirjoituspöytä.',
        selite: 'Punaisin tiililaatoin päällystetyssä huoneessa on suuri kivinen takka rautaisine jalustoineen sekä puinen pöytä, jolla on lukuteline. Kuvan on ottanut vierailija Yusten luostarin palatsin sisältä.',
        lahde: 'Valokuva: Benjamín Núñez González, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Benjamín Núñez González',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Palacio_de_Carlos_V._Yuste,_Toledo,_españa,_2017_05.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-yuste-b8579f06.jpg',
        lyhyt: 'Yusten luostarin renessanssikatettu pihakäytävä, keskellä suihkukaivo ja pensasaidat.',
        selite: 'Kaksikerroksisen renessanssiklaustrin pyöreäkaariset arkadit ympäröivät sisäpihaa, jossa on pensasaitoja, sypressejä ja kivinen kaivo. Taustalla erottuu kirkon kellotapuli.',
        lahde: 'Valokuva: Alonso de Mendoza, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Alonso de Mendoza',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Claustro_renacentista_del_monasterio_de_Yuste,_Cáceres.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Yusten luostari',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Kaarle V luopui vallasta?',
      'Mitä Yusten luostarille tapahtui vuonna 1809?',
    ],
    korostukset: ['Kaarle V|Kaarle V'],
    nappi: 'Poltettu luostari, jossa keisari Kaarle vietti viimeiset vuotensa',
    // -5.73888889 E / 40.11416667 N — en-Wikipedia "Monastery of Yuste"
    laudat: {
      maailmankartta: { x: 5642, y: 1798.4 },
      europe: { x: 101, y: 838.6 },
    },
    teksti: 'Yusten luostari on Cuacos de Yusten kylässä Cáceresin maakunnassa Extremadurassa, ja '
      + 'hieronymiittimunkit perustivat sen vuonna 1402. Vuonna 1556 keisari Kaarle V luopui '
      + 'Espanjan kruunusta poikansa Filip II:n hyväksi ja keisarikruunusta veljensä '
      + 'Ferdinand I:n hyväksi. Hän vetäytyi tähän syrjäiseen luostariin rukoilemaan, vaikka '
      + 'rakennusta piti laajentaa 50–60 hengen seurueelle. Kaarle kuoli siellä 21. syyskuuta '
      + '1558. Ranskalaisten joukot polttivat luostarin vuonna 1809, ja rauniona se oli '
      + 'vuoteen 1949, jolloin Espanjan valtio kunnosti sen.',
    lahde: 'en-Wikipedia "Monastery of Yuste", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-las-navas',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-las-navas-81efc4af.jpg',
      lyhyt: 'Las Navas de Tolosan taistelu 1212 Van Halenin maalauksessa vuodelta 1864.',
      selite: 'Maalaus esittää taistelun 16. heinäkuuta 1212 Santa Elenan lähellä Jaénin maakunnassa: kristityt ritarit ja Kastilian kuningas keskellä vastassaan almohadien joukot ja punainen telttaleiri oikealla. Taustalla kohoavat Sierra Morenan vuoret.',
      lahde: 'Maalaus: Francisco de Paula Van Halen, Wikimedia Commons (public domain).',
      tekija: 'Francisco de Paula Van Halen',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Batalla_de_las_Navas_de_Tolosa,_por_Francisco_van_Halen.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-las-navas-3f5dbea6.jpg',
        lyhyt: 'Kaiverros "Las Navasin taistelun aatto" vuodelta 1852.',
        selite: 'Kirjaillustraatio teoksesta Las glorias nacionales (1852) esittää sotapäällikön ja sotilaat leirissä ennen taistelua: lippuja kohotetaan, ja oikealla näkyy alttari ristin kanssa.',
        lahde: 'Kaiverrus: Fondo Antiguo de la Biblioteca de la Universidad de Sevilla, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Fondo Antiguo de la Biblioteca de la Universidad de Sevilla',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Las_Glorias_Nacionales,_1852_1003061_(4013954330).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Las Navas de Tolosa',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi taistelua sanottiin ristiretkeksi?',
      'Mitä taistelun jälkeen tapahtui?',
    ],
    korostukset: ['Reconquista|Reconquistassa'],
    nappi: 'Sierra Morenan solat, joissa kolme kuningasta voitti kalifin',
    // -3.54902778 E / 38.343 N — es-Wikipedia "Batalla de las Navas de Tolosa"
    laudat: {
      maailmankartta: { x: 5715, y: 1867.6 },
      europe: { x: 143.1, y: 885.2 },
    },
    teksti: 'Las Navas de Tolosan taistelu käytiin 16. heinäkuuta 1212, ja se oli tärkeä '
      + 'käännekohta Reconquistassa. Kristittyjä joukkoja johti Kastilian kuningas Alfonso '
      + 'VIII, ja mukana olivat Navarran Sancho VII ja Aragonian Pedro II. Vastassa oli '
      + 'almohadikalifi al-Nasirin armeija, joka hallitsi Iberian niemimaan eteläpuoliskoa ja '
      + 'Marokkoa. Taistelua kutsuttiin ristiretkeksi, ja siksi mukaan tuli ritareita eri '
      + 'puolilta Eurooppaa. Espanjalaisen Wikipedian mukaan taistelun sotilaalliset '
      + 'seuraukset jäivät rajallisiksi, ja Guadalquivirin laakson valtaus alkoi vasta noin '
      + 'kolmekymmentä vuotta myöhemmin.',
    lahde: 'en-Wikipedia "Battle of Las Navas de Tolosa", johdanto-osa; es-Wikipedia "Batalla de '
      + 'las Navas de Tolosa", johdanto-osa ja koordinaatit (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-campo-de-criptana',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-campo-de-criptana-7b3f58b5.jpg',
      lyhyt: 'Valkoiset tuulimyllyt Sierra de los Molinosin harjanteella pilvisen taivaan alla.',
      selite: 'Campo de Criptanan Sierra de los Molinosin tuulimyllyt ovat pyöreitä, kalkittuja torneja, joiden mustat, ristikkomaiset siivet ja tukipuu erottuvat taivasta vasten. Etualalla on pieni muistolaatta kiven päällä.',
      lahde: 'Valokuva: Edmundo Sáez, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Edmundo Sáez',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sierra_de_los_Molinos_03.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-campo-de-criptana-3b5e1e6f.jpg',
        lyhyt: 'Tuulimylly kohoaa Campo de Criptanan kattojen yläpuolelle, taustalla La Manchan tasanko.',
        selite: 'Kaupungin valkoisten talojen tiilikattojen takaa nousee kalkittu tuulimylly neljine siipineen, ja sen takana avautuu La Manchan viljelytasanko.',
        lahde: 'Valokuva: Marc Costa Carcereny, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Marc Costa Carcereny',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Campo_de_Criptana,_Molino.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Campo de Criptanan tuulimyllyt',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mitä Don Quijote tuulimyllyille teki?',
      'Miten myllyt toimivat?',
    ],
    korostukset: ['Don Quijoten|Don Quijoten'],
    nappi: 'Tuulimyllyt tasangolla, jossa Don Quijote näki jättiläisiä',
    // -3.11666667 E / 39.4 N — en-Wikipedia "Campo de Criptana"
    laudat: {
      maailmankartta: { x: 5729.4, y: 1826.4 },
      europe: { x: 151.4, y: 857.4 },
    },
    teksti: 'Campo de Criptana on kaupunki La Manchan alueella Ciudad Realin maakunnassa. Sen '
      + 'tunnusmaisema on tuulimyllyjen rivi Sierra de los Molinosin ja Cerro de la Pazin '
      + 'rinteillä, ja Don Quijoten kahdeksannen luvun alku kertoo kolmestakymmenestä tai '
      + 'neljästäkymmenestä tuulimyllystä tasangolla. Markiisi de la Ensenadan tilaamaan '
      + 'maarekisteriin oli merkitty 34 myllyä, ja alun perin niitä oli ollut selvästi '
      + 'enemmän. Nykyisin kymmenen myllyä näkyy kauas alkuperäisine rakenteineen ja '
      + 'koneistoineen, jotkin on muutettu museoiksi, ja kokonaisuus julistettiin '
      + 'historiallis-taiteellisesti merkittäväksi monumentiksi vuonna 1978.',
    lahde: 'en-Wikipedia "Campo de Criptana", johdanto-osa ja osio "Windmills" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-albufera',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-albufera-80f70bcf.jpg',
      lyhyt: 'Perinteinen barraca-talo ruokokattoineen Albuferan rannalla kahden palmun välissä.',
      selite: 'Valkoinen, jyrkkäkattoinen ja ruo\'olla katettu barraca seisoo laguunin rannalla ruovikon takana. Kuva on otettu Albuferan luonnonpuistossa Valencian lähellä.',
      lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Diego Delso',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Barraca,_parque_natural_de_la_Albufera,_Valencia,_España,_2022-12-18,_DD_19.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-albufera-d2334c3a.jpg',
        lyhyt: 'Auringonlasku Albuferan laguunin yllä puuveneen keulasta katsottuna.',
        selite: 'Kuva on otettu Albuferan luonnonpuistossa: veneen tumma puukeula ja kaareva kehikko rajaavat näkymän tyyneen laguunin ja matalan horisontin ylle laskevaan aurinkoon.',
        lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Diego Delso',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Albuferenc,_parque_natural_de_la_Albufera,_Valencia,_España,_2022-12-18,_DD_25-27_HDR.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Albufera',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Miksi riisiä viljellään laguunin rannalla?',
      'Mitä lintuja Albuferalla näkee?',
    ],
    korostukset: ['riisin|riisin'],
    nappi: 'Laguuni, jonka riisipellot ruokkivat Valenciaa',
    // -0.35222222 E / 39.33166667 N — en-Wikipedia "Albufera de Valencia"
    laudat: {
      maailmankartta: { x: 5821.6, y: 1829.1 },
      europe: { x: 204.4, y: 859.2 },
    },
    teksti: 'Albufera de València on makeanveden laguuni ja jokisuisto Valencian lahden '
      + 'rannikolla Itä-Espanjassa. Se on Albuferan luonnonpuiston pääosa, ja sen pinta-ala '
      + 'on 21 120 hehtaaria. Laguuni oli aikoinaan suolavetinen, mutta kastelusta ja '
      + 'kanavista tulleet vedet ja kasvavat hiekkasärkät tekivät siitä makeanvetisen jo '
      + '1600-luvulla. Kalastus tunnustettiin laillisesti vuonna 1250. Riisinviljely on vanha '
      + 'perinne mutta nuorempi kuin kalastus, sillä se alkoi 1700-luvulta lähtien, ja '
      + 'riisipelloilla elää lintuja ja lajeja, jotka ovat kadonneet itse laguunista.',
    lahde: 'en-Wikipedia "Albufera de València", johdanto-osa ja osiot "History" ja '
      + '"Agriculture" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-la-tomatina',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-la-tomatina-08008299.jpg',
      lyhyt: 'Tomaattisotaa Buñolin kadulla: ihmisjoukko suojautuu heitetyiltä tomaateilta.',
      selite: 'La Tomatinaa vuonna 2010: sinisillä pressuilla suojatun talon edessä tiivis joukko väistelee ja heittelee tomaatteja, ja katu on täynnä murskattuja tomaatteja.',
      lahde: 'Valokuva: flydime, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'flydime',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:La_Tomatina_(25.08.2010)_-_Spain,_Buñol_13.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-la-tomatina-86f493ba.jpg',
        lyhyt: 'Tomaattimehun peittämiä osallistujia uimalaseissa pitelemässä tomaattia.',
        selite: 'Osallistujat ovat märkiä tomaattimössöstä, ja jotkut käyttävät uimalaseja silmien suojana; etualalla pidetään kädessä murskattua tomaattia. Taustalla näkyy sininen suojapressu.',
        lahde: 'Valokuva: flydime, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'flydime',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:La_Tomatina_(25.08.2010)_-_Spain,_Buñol_08.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'La Tomatina, Buñol',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Miksi tomaatteja heitetään?',
      'Miksi Franco kielsi La Tomatinan?',
    ],
    korostukset: ['ruokataistelu|ruokataisteluksi'],
    nappi: 'Kylä, josta tulee myöhemmin maailman suurin ruokataistelu',
    // -0.79055556 E / 39.41944444 N — en-Wikipedia "La Tomatina"
    laudat: {
      maailmankartta: { x: 5807, y: 1825.7 },
      europe: { x: 196, y: 856.9 },
    },
    teksti: 'La Tomatina on Buñolin kylässä pidettävä espanjalainen festivaali, jossa '
      + 'osallistujat heittelevät toisiaan tomaateilla; sitä sanotaan maailman suurimmaksi '
      + 'ruokataisteluksi. Perinne sai alkunsa elokuun viimeisenä keskiviikkona 1945, kun '
      + 'nuoret seurasivat jättiläishahmojen kulkuetta ja yhden osallistujan iso pääpuku '
      + 'putosi. Raivostunut mies alkoi lyödä ympärilleen ja kaatoi vihanneskojun, ja väki '
      + 'heitteli toisiaan tomaateilla. Seuraavana vuonna nuoret toivat tomaatit mukanaan '
      + 'kotoa, ja vuosittainen perinne oli syntynyt. Franco kielsi tapahtuman 1950-luvun '
      + 'alussa, mutta vuonna 1957 pidetyn tomaattien hautajaiskulkueen jälkeen se sallittiin '
      + 'uudelleen.',
    lahde: 'en-Wikipedia "La Tomatina", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-rioja-haro',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-rioja-haro-1c1f60e1.jpg',
      lyhyt: 'Bodegas Bilbaínasin viinitilan rakennukset Harossa, Viña Pomal -kyltti näkyvillä.',
      selite: 'Haron viinikellarikorttelin Bodegas Bilbaínas -viinitalon julkisivu, jonka portin päällä on keraaminen laatta yhtiön nimellä. Oikealla näkyy Viña Pomal -kyltti.',
      lahde: 'Valokuva: Zarateman, Wikimedia Commons (CC0).',
      tekija: 'Zarateman',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Haro_-_Bodegas_Bilba%C3%ADnas_1.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-rioja-haro-e922c847.jpg',
        lyhyt: 'Riojan viinitynnyreitä, joiden päädyissä on Haron viinitalojen nimiä.',
        selite: 'Riojan viinitynnyreitä Haron kaupungintalon arkadissa. Jokaisen tynnyrin päätyyn on painettu jonkin Riojan viinitalon nimi.',
        lahde: 'Valokuva: LBM1948, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'LBM1948',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Haro_03.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Rioja ja Haro',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Mikä tekee Haron viinistä tunnettua?',
      'Mitä bodega tarkoittaa?',
    ],
    korostukset: ['bodegaa|bodegaa'],
    nappi: 'Viinikellareiden kaupunki, jossa uusia bodegoja perustetaan vuosi vuodelta',
    // -2.85 E / 42.58333333 N — en-Wikipedia "Haro, La Rioja"
    laudat: {
      maailmankartta: { x: 5738.3, y: 1700.2 },
      europe: { x: 156.5, y: 773.7 },
    },
    teksti: 'Haro on kaupunki La Riojan maakunnan luoteisosassa Pohjois-Espanjassa, ja se on '
      + '1800-luvun alusta lähtien ollut Rioja-viinialueen tärkein viinikaupunki. Sen '
      + 'vuosittaisilla viinifestivaaleilla juhlitaan punaviiniä. Barrio Estación '
      + '-kaupunginosassa on seitsemän parasta Rioja-bodegaa, muun muassa vuonna 1859 '
      + 'perustettu Bodegas Bilbaínas, vuonna 1877 perustettu R. López de Heredia ja vuoden '
      + '1879 CVNE, ja Martínez Lacuesta perustettiin vuonna 1873. Haro oli myös ensimmäinen '
      + 'espanjalainen kaupunki, jossa oli sähköinen katuvalaistus, ja sen vanhakaupunki '
      + 'julistettiin historiallis-taiteelliseksi kohteeksi 1975.',
    lahde: 'en-Wikipedia "Haro, La Rioja", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-jabugo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-jabugo-a96f26ad.jpg',
      lyhyt: 'Jabugon ibérico-kinkkuja ripustettuina riveittäin.',
      selite: 'Kuivattuja ibérico-sian kinkkuja ja lapoja roikkumassa sinivalkoisissa köysissä Jabugossa, Huelvan maakunnassa. Jamón de Huelva -alkuperänimityksen punaiset nauhat näkyvät jalkojen ympärillä.',
      lahde: 'Valokuva: Txo, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Txo',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Jabugo_jam%C3%B3n.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-jabugo-92f7a6c2.jpg',
        lyhyt: 'Ibérico-siat laiduntavat oliivi- ja tammipuiden seassa Aracenan tienoolla.',
        selite: 'Tie Aracenaan kulkee dehesan halki Huelvan maakunnassa. Kuvassa kaksi mustaa ibérico-sikaa kävelee oliivi- ja korkkitammipuiden joukossa.',
        lahde: 'Valokuva: DarkEngel1, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'DarkEngel1',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dehesa_aracena_cerdos.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Jabugo',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Miksi ibérico-kinkku on niin arvostettua?',
      'Mitä tarkoittaa jamón de bellota?',
    ],
    korostukset: ['dehesa|dehesa-metsissä'],
    nappi: 'Vuoristokylä, jonka tammimetsissä siat syövät terhoja',
    // -6.73333333 E / 37.91666667 N — en-Wikipedia "Jabugo"
    laudat: {
      maailmankartta: { x: 5608.9, y: 1884.1 },
      europe: { x: 81.9, y: 896.4 },
    },
    teksti: 'Jabugo on noin 2 200 asukkaan kaupunki Huelvan maakunnassa, ja seutu tunnetaan '
      + 'tunnusomaisesta kinkustaan, jamón ibéricosta. Sitä valmistetaan pääosin mustista '
      + 'ibérico-sioista, jotka laiduntavat dehesa-metsissä syöden ruohoa, yrttejä, '
      + 'tammenterhoja, kastanjoita ja juuria. Parhaan luokan, jamón ibérico de bellota, '
      + 'kinkku tulee vapaasti laiduntavilta sioilta, jotka syövät viimeisinä kuukausinaan '
      + 'pelkkiä tammenterhoja. Jabugo-nimisen alkuperäsuojatun kinkun tuotantoalue on Sierra '
      + 'de Aracenan ja Picos de Arochen luonnonpuistossa, ja Jabugon pääaukio on nimeltään '
      + 'Kinkkuaukio.',
    lahde: 'en-Wikipedia "Jabugo", johdanto-osa; en-Wikipedia "Jamón ibérico", osiot '
      + '"Production" ja "Commercial grading and labeling" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-ronda',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-ronda-1bd406a4.jpg',
      lyhyt: 'Puente Nuevo -silta kohoaa Tajo-rotkon yllä Rondassa.',
      selite: 'Puente Nuevo -kivisilta ylittää Tajo-rotkon Rondassa. Rotkon pohjalla näkyy vesiputous ja vihreä lampi, ja kallion reunalla vasemmalla on iso rakennus.',
      lahde: 'Valokuva: Christopher Down, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Christopher Down',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ronda_Puente_Nuevo_and_El_Tajo_gorge.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-ronda-c0fe9b19.jpg',
        lyhyt: 'Rondan härkätaisteluareenan kaarigalleriat ja hiekkakenttä.',
        selite: 'Rondan härkätaisteluareenan sisäpuoli: pylväiden kannattamat kaarigalleriat kaartuvat hiekkakentän ympäri. Etualalla näkyy areenan puinen aita.',
        lahde: 'Valokuva: Andreas Tille, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Andreas Tille',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:PlazaDeTorosDeRonda.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Ronda',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miten Puente Nuevo on rakennettu?',
      'Mitä corridas goyescas tarkoittaa?',
    ],
    korostukset: ['Tajo|Tajo-rotko'],
    nappi: 'Rotkon halkaisema vuorikaupunki',
    // -5.16472222 E / 36.73722222 N — en-Wikipedia "Ronda"
    laudat: {
      maailmankartta: { x: 5661.2, y: 1929.4 },
      europe: { x: 112, y: 927.4 },
    },
    teksti: 'Ronda on kunta Málagan maakunnassa Andalusiassa, mioseeniaikaisella tasangolla noin '
      + '600–800 metrin korkeudessa. Ympäristön hedelmällinen maa sopii vehnän, oliivien ja '
      + 'viinin viljelyyn. Syvä Tajo-rotko, jonka pohjalla virtaa Guadalevín-joki, halkaisee '
      + 'kaupungin kahtia. Ronda tunnistetaan antiikin Arundaksi, ja islamilaisen vallan '
      + 'aikana se oli oman hallintoalueensa pääkaupunki. Kastilian kruunu valtasi sen '
      + 'väkisin vuonna 1485. Nykyisin Rondaan tullaan katsomaan Tajo-rotkoa ja Puente Nuevo '
      + '-siltaa sekä corridas goyescas -härkätaisteluita.',
    lahde: 'en-Wikipedia "Ronda", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-riotinto',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-riotinto-4c8af57d.jpg',
      lyhyt: 'Riotinto-joen punertava vesi virtaa oranssien ja punaruskeiden kivien välissä.',
      selite: 'Tinto-joen matalaa vettä, joka värjää kivet punaisiksi ja oransseiksi. Kuvaajan mukaan joki tarjoaa erityisen kauniin maiseman, kun vedenpinta on matala.',
      lahde: 'Valokuva: FJavier GómezL, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'FJavier GómezL',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:R%C3%ADo_Tinto_entre_piedras_4153.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-riotinto-6188d46b.jpg',
        lyhyt: 'Vanha valokuva Río Tinto-Pueblon rautatieasemasta ja hiilivaunuista.',
        selite: 'Yleiskuva Río Tinto-Pueblon asemasta 1900-luvun alussa: raiteilla on kuormattuja vaunuja, ja rinteessä näkyy kaivosyhdyskunnan valkoisia taloja.',
        lahde: 'Kuva: tekijä tuntematon, Wikimedia Commons (public domain).',
        tekija: 'tuntematon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Estaci%C3%B3n_de_R%C3%ADo_Tinto-Pueblo.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-riotinto-9c80e2c5.jpg',
        lyhyt: 'Cerro Coloradon avolouhos porrastettuine seinämineen.',
        selite: 'Cerro Coloradon avolouhos Riotinton kaivosalueella vuonna 2021. Louhoksen seinämät nousevat portaina, ja pohjalla näkyy työkoneita.',
        lahde: 'Valokuva: Benjamín Núñez González, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Benjamín Núñez González',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Corta_Cerro_Colorado,_Riotinto,_Huelva,_Espa%C3%B1a,_2021_03.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Riotinton kaivokset',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi joki on punainen?',
      'Miksi britit ostivat kaivoksen?',
    ],
    korostukset: ['Rio Tinto Company|Rio Tinto Company'],
    nappi: 'Kuparikaivos, jonka omistaja vaihtuu juuri nyt brittiyhtiölle',
    // -6.60277778 E / 37.70333333 N — en-Wikipedia "Corta Atalaya"
    laudat: {
      maailmankartta: { x: 5613.2, y: 1892.3 },
      europe: { x: 84.4, y: 902 },
    },
    teksti: 'Riotinto-Nervan kaivosalue on Huelvan maakunnan koillisosassa Andalusiassa, ja se '
      + 'kuuluu Iberian pyriittivyöhykkeeseen. Aluetta on hyödynnetty jo esihistoriallisina '
      + 'aikoina, mutta järjestäytynyt louhinta alkoi roomalaisaikana. Vuonna 1873 '
      + 'Rothschildien pankkiirisuku osti esiintymät Espanjan ensimmäisen tasavallan '
      + 'hallitukselta, ja ne siirtyivät muutamaa kuukautta myöhemmin vastaperustetulle '
      + 'brittiläiselle Rio Tinto Company Limitedille. Samana vuonna alkoi Huelvaan johtavan '
      + 'Riotinton rautatien rakennus. Brittiyhtiön aikana alue koki huippukautensa '
      + '1800-luvun lopulta 1900-luvun puoliväliin, ja Riotinton kaivoksista tuli alansa '
      + 'maailmanlaajuinen esikuva.',
    lahde: 'en-Wikipedia "Riotinto-Nerva mining basin", johdanto-osa ja osiot "British phase" ja '
      + '"Railway network"; koordinaatti en-Wikipedia "Corta Atalaya" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-almaden',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-almaden-72965ff2.jpg',
      lyhyt: 'Puinen kottikärry täynnä malmikiviä Almadénin kaivoskäytävässä.',
      selite: 'Almadénin kaivosten käytävä, jossa on puinen, rautavanteilla vahvistettu kottikärry täynnä malmia ja käytävän päätteenä rautaportti. Almadénin kaivokset julistettiin maailmanperinnöksi vuonna 2012.',
      lahde: 'Valokuva: Raimundo Pastor, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Raimundo Pastor',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Minas_de_Almad%C3%A9n_(RPS_21-07-2012)_carretilla_en_una_galer%C3%ADa.png',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-almaden-2502627a.jpg',
        lyhyt: 'Real Hospital de Mineros de San Rafaelin julkisivu Almadénissa.',
        selite: 'Almadénin kaivostyöläisten sairaalan, Real Hospital de Mineros de San Rafaelin, päärakennus. Kuvauksen mukaan rakennus valmistui vuosina 1755–1773, ja nykyään siinä toimii kaivosalan historiallinen arkisto.',
        lahde: 'Valokuva: Raimundo Pastor, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Raimundo Pastor',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Almad%C3%A9n_(RPS_21-07-2012)_Real_Hospital_de_Mineros_de_San_Rafael,_fachada.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Almadénin elohopeakaivos',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Mihin elohopeaa käytettiin?',
      'Miksi kaivos suljettiin?',
    ],
    korostukset: ['elohopea|elohopeasta'],
    nappi: 'Maailman elohopeakaivos, jonka nesteestä hopeaa erotetaan Amerikassa',
    // -4.83694444 E / 38.77638889 N — en-Wikipedia "Almadén"
    laudat: {
      maailmankartta: { x: 5672.1, y: 1850.7 },
      europe: { x: 118.3, y: 873.8 },
    },
    teksti: 'Almadén on kaupunki Ciudad Realin maakunnassa Sierra Morenan vuorilla, 589 metrin '
      + 'korkeudessa. Sen nimi tulee arabian sanasta al-maʻdin, joka tarkoittaa kaivosta. '
      + 'Paikka oli ensin roomalainen ja sitten maurien kaivosasutus, ja kuningas Alfonso VII '
      + 'valtasi sen kristityille vuonna 1151 ja antoi sen Calatravan ritarikunnalle. '
      + 'Almadénin esiintymät ovat tuottaneet suurimman osan maailman nestemäisestä '
      + 'elohopeasta, noin 250 000 tonnia kahdessa tuhannessa vuodessa. Kaivos suljettiin '
      + 'vuonna 2002 EU:n elohopeakaivoskiellon vuoksi, ja vuonna 2012 Almadén ja Slovenian '
      + 'Idrija julistettiin yhdessä maailmanperintökohteeksi.',
    lahde: 'en-Wikipedia "Almadén", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-vizcayan-silta',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-vizcayan-silta-8741200e.jpg',
      lyhyt: 'Vizcayan sillan punainen teräsrunko ja torni sinistä taivasta vasten.',
      selite: 'Vizcayan silta on Portugaleten ja Getxon välinen siirtosilta, joka ylittää Nervión-joen suun. Kuvassa näkyvät ristikkotorni, kannatinkaapelit ja korkealla kulkeva teräspalkki, jota pitkin gondoli liikkuu.',
      lahde: 'Valokuva: José Ligero Loarte, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'José Ligero Loarte',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Puente_de_Vizcaya_--_2021_--_Portugalete,_Espa%C3%B1a.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-vizcayan-silta-e9ce7f3c.jpg',
        lyhyt: 'Vizcayan sillan gondoli kulkee riippuen kaapeleista joen yllä.',
        selite: 'Vizcayan sillan gondoli kuljettaa ihmisiä ja autoja joen yli kaapeleiden varassa aivan vedenpinnan yläpuolella. Taustalla näkyy vastarannan kaupunki kirkontorneineen.',
        lahde: 'Valokuva: Roberto Chamoso G, Wikimedia Commons (CC BY-SA 3.0 es).',
        tekija: 'Roberto Chamoso G',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Transbordador_del_Puente_de_Vizcaya._Las_Arenas,_Getxo._Vizcaya-Bizcaia..JPG',
        lisenssi: 'CC BY-SA 3.0 es',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/es/deed.en',
      },
    ],
    nimi: 'Vizcayan silta',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miten siirtosilta toimii?',
      'Miksi siltaa sanotaan Puente Colgantiksi?',
    ],
    korostukset: ['siirtosilta|siirtosilta'],
    nappi: 'Tänne nousee myöhemmin maailman vanhin siirtosilta',
    // -3.0169 E / 43.3231 N — en-Wikipedia "Vizcaya Bridge"
    laudat: {
      maailmankartta: { x: 5732.8, y: 1670.3 },
      europe: { x: 153.3, y: 754.2 },
    },
    teksti: 'Vizcayan silta yhdistää Portugaleten ja Las Arenasin, joka kuuluu Getxoon, Biskajan '
      + 'maakunnassa Nervión-joen suulla. Se on maailman vanhin siirtosilta, ja se '
      + 'rakennettiin vuonna 1893 Alberto Palacion suunnitelmasta; Palacio oli Gustave '
      + 'Eiffelin oppilas. Siltaratkaisu yhdisti rannat ilman, että Bilbaon sataman '
      + 'laivaliikenne häiriintyi, eikä sen tarvinnut olla pitkine ramppeineen valtava '
      + 'rakennelma. Silta on yhä käytössä: sen 164 metriä pitkä gondoli kuljettaa kuusi '
      + 'autoa ja kymmeniä matkustajia puolessatoista minuutissa. UNESCO julisti sen '
      + 'maailmanperintökohteeksi vuonna 2006.',
    lahde: 'en-Wikipedia "Vizcaya Bridge", johdanto-osa ja osiot "History" ja "Operation" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-alcantaran-silta',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-alcantaran-silta-331700bd.jpg',
      lyhyt: 'Alcántaran roomalainen kivisilta kaartuu Tejo-joen yli, taustalla kukkulakaupunki.',
      selite: 'Silta rakennettiin 100-luvun alussa jKr., ja sen keskellä kohoaa pieni riemukaari. Kuvassa silta ylittää Tejo-joen ja taustalla näkyy Alcántaran kaupunki.',
      lahde: 'Valokuva: Amfeli, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Amfeli',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Puente_de_Alc%C3%A1ntara.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-alcantaran-silta-598b64a4.jpg',
        lyhyt: 'Vanha valokuva Alcántaran sillasta joen rotkossa.',
        selite: 'J. Laurentin ottama vanha valokuva roomalaisesta sillasta. Näkyvillä ovat kivikaaret, keskellä oleva riemukaari ja jyrkät rinteet.',
        lahde: 'Valokuva: Jean Laurent, Wikimedia Commons (public domain).',
        tekija: 'Jean Laurent',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Alc%C3%A1ntara,_puente_romano,_J._Laurent_y_Cia._Madrid.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Alcántaran silta',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Kuka rakennutti sillan?',
      'Miksi siltaa on räjäytetty monta kertaa?',
    ],
    korostukset: ['Trajanuksen|Trajanuksen'],
    nappi: 'Roomalaissilta, jonka karlistit räjäyttivät ja joka korjattiin 1860',
    // -6.8924 E / 39.7224 N — en-Wikipedia "Alcántara Bridge"
    laudat: {
      maailmankartta: { x: 5603.6, y: 1813.8 },
      europe: { x: 78.9, y: 848.9 },
    },
    teksti: 'Alcántaran silta on roomalainen kivikaarisilta Extremaduran Alcántarassa, ja se '
      + 'rakennettiin Tejo-joen yli vuosina 104–106 keisari Trajanuksen määräyksestä. '
      + 'Alcántara tulee arabian sanasta al-Qanṭarah, kaari. Silta on kärsinyt sodista '
      + 'enemmän kuin säästä: maurit tuhosivat yhden pienimmistä kaarista vuonna 1214, '
      + 'espanjalaiset räjäyttivät yhden kaaren vuonna 1760 pysäyttääkseen portugalilaiset, '
      + 'Wellingtonin joukot vuonna 1809 ja karlistit vuonna 1836. Se rakennettiin uudelleen '
      + 'laastimuurauksella vuonna 1860. Alkuperäinen pituus oli 190 metriä, nykyisin 181,7 '
      + 'metriä.',
    lahde: 'en-Wikipedia "Alcántara Bridge", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-canal-de-castilla',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-canal-de-castilla-c0cd785f.jpg',
      lyhyt: 'Kastilian kanavan portaittainen sulkujono Frómistassa.',
      selite: 'Kuvassa Kastilian kanava kulkee Frómistan kohdalla kivimuurien reunustamana sulkuportaana. Vesi valuu porras portaalta alemmas.',
      lahde: 'Valokuva: Jl FilpoC, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Jl FilpoC',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Canal_de_Castilla_(Fr%C3%B3mista).jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-canal-de-castilla-9a07d5b1.jpg',
        lyhyt: 'Lähikuva Frómistan sulkujen kivimuurista ja putoavasta vedestä.',
        selite: 'Kuvassa on Kastilian kanavan Frómistan sulkujen 17-20 päädyn kivimuuri, josta vesi valuu alempaan altaaseen.',
        lahde: 'Valokuva: Adolfobrigido, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Adolfobrigido',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Canal_de_Castilla-Fr%C3%B3mista-Esclusas_17,18,19,28.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kastilian kanava',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi vehnä kuljetettiin kanavalla?',
      'Mihin kanavaa käytetään nyt?',
    ],
    korostukset: ['vehnän|vehnän'],
    nappi: 'Vehnäkanava, jonka rahtia rautatie alkaa syödä',
    // -4.64694 E / 41.7494 N — en-Wikipedia "Canal de Castilla"
    laudat: {
      maailmankartta: { x: 5678.4, y: 1733.6 },
      europe: { x: 122, y: 795.6 },
    },
    teksti: 'Kastilian kanava on 207 kilometriä pitkä kanava Pohjois-Espanjassa Burgosin, '
      + 'Palencian ja Valladolidin maakunnissa. Se rakennettiin 1700-luvun jälkipuoliskolta '
      + '1800-luvun alkupuoliskolle helpottamaan vehnän kuljetusta Kastiliasta Biskajanlahden '
      + 'satamiin vientiä varten. Kanavaa käytettiin eniten vuosina 1850–1870, mutta '
      + 'rautateiden kilpailu muutti sen käytön kasteluun ja myllyjen voimanlähteeksi '
      + '1800-luvun lopulla. Purjehdus loppui vuonna 1959. Nykyisin osa kanavasta on yhä '
      + 'käytössä, ja se kastelee 23 000 hehtaaria 48 kunnassa.',
    lahde: 'en-Wikipedia "Canal de Castilla", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-gernikako-arbola',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-gernikako-arbola-98e56f90.jpg',
      lyhyt: 'Gernikan vanhan tammen kuollut runko suojassa pylväiden kannattamassa pienessä temppelissä.',
      selite: 'Kuvassa on Gernikan puun jäänne Casa de Juntasin puutarhassa, pyöreän pylvästemppelin ja rautaaidan suojassa. Puu oli Biskajan foraalioikeuksien symboli.',
      lahde: 'Valokuva: Graeme Churchard, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Graeme Churchard',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Guernica_Oak.jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-gernikako-arbola-95ed4c25.jpg',
        lyhyt: 'Gernikan puu Casa de Juntasin pihalla, taustalla pylväshalli.',
        selite: 'Mustavalkoisessa kuvassa tammi kasvaa rautaisen aidan ympäröimänä Casa de Juntasin pihalla, ja sen takana näkyy klassinen pylväshalli. Kuvaajan mukaan puu on historiaan ja lauluihin ikuistettu Gernikan tammi.',
        lahde: 'Valokuva: Timtregenza, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Timtregenza',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:P5393_Guernica_Gernikako_Arbola_Tregenza.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-gernikako-arbola-ef595e2f.jpg',
        lyhyt: 'Casa de Juntasin sali, jonka kattona on värikäs lasimaalaus.',
        selite: 'Kuva on Gernikan Casa de Juntasin sisältä: salin katto on värillistä lasimaalausta, ja seinustalla on suuri maalaus.',
        lahde: 'Valokuva: Pere prlpz, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Pere prlpz',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Casa_de_Juntes_de_Gernika_-_sala_i_vitrall.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Guernican tammi',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi tammi on baskeille tärkeä?',
      'Mitä tapahtui vuonna 1937?',
    ],
    korostukset: ['karlistisota|karlistisodassa'],
    nappi: 'Baskien vapauksien tammi, jonka nimeen kolmas karlistisota vetoaa',
    // -2.67972222 E / 43.31472222 N — en-Wikipedia "Tree of Gernika"
    laudat: {
      maailmankartta: { x: 5744, y: 1670.6 },
      europe: { x: 159.7, y: 754.4 },
    },
    teksti: 'Gernikako Arbola eli Guernican puu on tammi, joka symboloi biskajalaisten ja '
      + 'laajemmin koko baskikansan perinteisiä vapauksia. Biskajan herrat, myös Kastilian '
      + 'kuninkaat ja karlistien kruununvaatijat, vannoivat sen alla kunnioittavansa '
      + 'biskajalaisten oikeuksia. Keskiajalla kylien edustajat kokoontuivat suurten puiden '
      + 'alla, ja vuonna 1512 perustetun Guernican yleiskokouksen aikana tammesta tuli '
      + 'symboli; kokouksia pidettiin sitä varten rakennetussa talossa, jonka nykyinen '
      + 'rakennus on vuodelta 1833. Regentti María Cristina oli viimeinen '
      + 'espanjalaishallitsija, joka vannoi valan tammen alla vuonna 1839. Puu nousi '
      + 'tunnetuksi ensimmäisessä ja kolmannessa karlistisodassa.',
    lahde: 'en-Wikipedia "Gernikako Arbola", johdanto-osa ja osio "Dynasty" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-tordesillas',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-tordesillas-a8c11b01.jpg',
      lyhyt: 'Casa del Tratado, vaalea kivi- ja tiilirakennus Tordesillasin kaupungissa.',
      selite: 'Tordesillasin sopimuksen talo (Casa del Tratado) Valladolidin maakunnassa. Julkisivussa on kivimuuri, tiilikerros, rautaparvekkeet ja vaakuna.',
      lahde: 'Kuva: Txo, Wikimedia Commons (public domain).',
      tekija: 'Txo',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tordesillas_Casa_del_Tratado.JPG',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-tordesillas-274e19ce.jpg',
        lyhyt: 'Jäljennös Tordesillasin sopimuksen asiakirjasta.',
        selite: 'Valokuvassa on jäljennös Tordesillasin sopimuksesta, käsin kirjoitettu pergamenttiarkki koristellulla alkukirjaimella. Teksti alkaa Portugalin kuninkaan Johanin nimellä.',
        lahde: 'Valokuva: Jl FilpoC, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jl FilpoC',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tratado_de_Tordesillas_(Archivo_General_de_Indias).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-tordesillas-cb1b5f0e.jpg',
        lyhyt: 'Kivisilta ylittää Duero-joen Tordesillasin kohdalla.',
        selite: 'Duero-joki virtaa Tordesillasin kohdalla, ja vasemmalla näkyy joen yli kaartuva kivisilta ja avaraa tasankomaisemaa.',
        lahde: 'Valokuva: José Luis Filpo Cabana, Wikimedia Commons (CC BY 4.0).',
        tekija: 'José Luis Filpo Cabana',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tordesillas_y_el_r%C3%ADo_Duero.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Tordesillas',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä Tordesillasin sopimus jakoi?',
      'Mitä alkuperäiskansat sopimuksesta ajattelivat?',
    ],
    korostukset: ['meridiaania|meridiaania'],
    nappi: 'Kaupunki, jossa maailma jaettiin kahtia sopimuspaperilla',
    // -5 E / 41.5 N — en-Wikipedia "Tordesillas"
    laudat: {
      maailmankartta: { x: 5666.7, y: 1743.5 },
      europe: { x: 115.2, y: 802.2 },
    },
    teksti: 'Tordesillasin sopimus allekirjoitettiin Espanjan Tordesillasissa 7. kesäkuuta 1494, '
      + 'ja se ratifioitiin Portugalin Setúbalissa. Sopimus jakoi Euroopan ulkopuoliset '
      + 'äskettäin löydetyt maat Portugalin kuningaskunnan ja Kastilian kruunun kesken '
      + 'meridiaania pitkin, joka kulki 370 leguaa eli noin 2 100 kilometriä Kap Verden '
      + 'saarten länsipuolella. Itäpuoli kuului Portugalille ja länsipuoli Kastilialle, ja '
      + 'sopimus muutti aiempaa paavin bullaa. Maapallon toinen puoli jaettiin vuosikymmeniä '
      + 'myöhemmin Zaragozan sopimuksella vuonna 1529. Amerikan alkuperäiskansat eivät '
      + 'tunnustaneet sopimuksia.',
    lahde: 'en-Wikipedia "Treaty of Tordesillas", johdanto-osa; koordinaatti en-Wikipedia '
      + '"Tordesillas" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-aranjuez',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-aranjuez-071885f8.jpg',
      lyhyt: 'Aranjuezin kuninkaallisen palatsin pääjulkisivu ja pihaportti patsaineen.',
      selite: 'Kuvassa näkyy Aranjuezin kuninkaallisen palatsin punatiili- ja kivijulkisivu, kaksi kupolitornia sekä rautaportti, jota reunustavat lapsipatsaat.',
      lahde: 'Valokuva: Javier Perez Montes, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Javier Perez Montes',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Palacio_Real_de_Aranjuez_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-aranjuez-6b2b1e4d.jpg',
        lyhyt: 'Aranjuezin palatsi ja joen kaareva pato sen edessä.',
        selite: 'Palatsin tiilinen sivujulkisivu kohoaa joen rannalla, ja etualalla joen vesi valuu kaarevan padon yli.',
        lahde: 'Valokuva: Barcex, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Barcex',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Palacio_Real_de_Aranjuez_-_130921_115527.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-aranjuez-963193aa.jpg',
        lyhyt: 'Herkuleen suihkulähde ja marmoripatsaat Jardín de la Islan puutarhassa.',
        selite: 'Kuvassa on Aranjuezin Jardín de la Islan Herkuleen suihkulähde, jonka edessä on kaksi marmoripatsasta. Kuvauksen mukaan Filip IV tilasi suihkulähteen Herkuleen urotöistä 1660-luvulla.',
        lahde: 'Valokuva: Jl FilpoC, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jl FilpoC',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fuente_de_H%C3%A9rcules,_Jard%C3%ADn_de_la_Isla_(Aranjuez).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Aranjuez',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä Aranjuezin kapinassa tapahtui?',
      'Mikä Godoy oli?',
    ],
    korostukset: ['Manuel Godoyn|Manuel Godoyn'],
    nappi: 'Kuninkaallisten puutarhojen kaupunki, jossa hovi kaatoi ministerinsä',
    // -3.60277778 E / 40.03333333 N — en-Wikipedia "Aranjuez"
    laudat: {
      maailmankartta: { x: 5713.2, y: 1801.6 },
      europe: { x: 142, y: 840.7 },
    },
    teksti: 'Aranjuez on kaupunki Madridin autonomisen alueen eteläkärjessä Tejo-joen vasemmalla '
      + 'rannalla. Se tuli Espanjan kruunun kuninkaalliseksi tilaksi vuonna 1560 Filip II:n '
      + 'aikana, ja vuoteen 1752 asti siellä saivat asua vain kuninkaalliset ja aatelisto. '
      + 'UNESCO julisti sen kulttuurimaiseman maailmanperintökohteeksi vuonna 2001. '
      + 'Aranjuezin kapina tapahtui 17. maaliskuuta 1808, kun kuninkaallinen perhe ja '
      + 'hallitus odottivat siellä ranskalaista hyökkäystä: sotilaat, talonpojat ja kansa '
      + 'hyökkäsivät Manuel Godoyn asunnolle ja vangitsivat hänet. Kapinalliset pakottivat '
      + 'Kaarle IV:n erottamaan Godoyn, ja kaksi päivää myöhemmin hänen itsensä täytyi luopua '
      + 'kruunusta.',
    lahde: 'en-Wikipedia "Aranjuez", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-poblet',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-poblet-0007f27c.jpg',
      lyhyt: 'Pobletin luostarin Puerta Real -portti, kaksi kahdeksankulmaista linnoitustornia ja kivinen risti aukiolla.',
      selite: 'Kuvassa on Pobletin luostarin kuninkaallinen portti, jota reunustavat kaksi hammastettua tornia. Aukion keskellä on kivinen risti ja taustalla linnamainen muuri.',
      lahde: 'Valokuva: Malopez 21, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Malopez 21',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Monasterio_de_Poblet,_Puerta_Real,_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/esp-nosto-poblet-c3bcf1b3.jpg',
        lyhyt: 'Pobletin luostarin sisäpihan kuorikäytävä ja suihkulähdepaviljonki kaarineen.',
        selite: 'Kuvassa on Pobletin sisäpiha kiviholveineen ja kaarikäytävineen, ja etualalla on syprestejä ja yrttipuutarhaa. Kuvauksen mukaan sisäpihan (klaustrin) tyyli on romaanista alkuperää ja valmistui goottilaiseksi 1200-luvulla.',
        lahde: 'Valokuva: José Luis Filpo Cabana, Wikimedia Commons (CC BY 3.0).',
        tekija: 'José Luis Filpo Cabana',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Monasterio_de_Poblet._Claustro.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Pobletin luostari',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Keitä Pobletiin on haudattu?',
      'Miksi luostari ryöstettiin?',
    ],
    korostukset: ['kistertsiläisluostari|kistertsiläisluostari'],
    nappi: 'Kuninkaiden hautaluostari, joka ryöstettiin ja poltettiin 1835',
    // 1.0825 E / 41.380833 N — en-Wikipedia "Poblet Abbey"
    laudat: {
      maailmankartta: { x: 5869.4, y: 1748.3 },
      europe: { x: 232, y: 805.3 },
    },
    teksti: 'Pobletin kuninkaallinen luostari on vuonna 1151 perustettu kistertsiläisluostari '
      + 'Prades-vuorten juurella Katalonian Conca de Barberàssa. Sen perustivat Ranskasta '
      + 'tulleet kistertsiläismunkit, ja pääarkkitehti oli Arnau Bargués. Poblet oli yksi '
      + 'Aragonian kruunun kuninkaiden hautapaikoista Jaakko I:stä alkaen, ja suurimmillaan '
      + 'luostarissa asui yli 300 munkkia. Vuonna 1835 Mendizábalin kirkonomaisuuden '
      + 'pakkolunastus päätti luostarielämän: 24. heinäkuuta luostari ryöstettiin ja osin '
      + 'poltettiin, ja kuninkaiden haudat häpäistiin. Luostari perustettiin uudelleen vuonna '
      + '1940 italialaisten munkkien voimin.',
    lahde: 'en-Wikipedia "Poblet Abbey", johdanto-osa ja osiot "Significance" ja "Ruin and '
      + 'rebuilding" (tarkistettu 19.9.2026).',
  },
];
