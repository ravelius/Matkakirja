/*
 * MAASTOKOHTEET — MAR. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs MAR --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/MAR.json. Työkalu laskee laudan
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
 * Marokon maastokohteet. Faktat en-Wikipediasta 30.8.2026. Toubkalille ei ole vakiintunutta suomennosta (fi-Wikipediassa ei artikkelia); joen asu fi-Wikipedian mukaan Drâa.
 *
 * MAAILMAN ERÄ M11 (6.9.2026) lisäsi listaan kahdeksan KOHDETTA —
 * Volubilis, Aït Benhaddou, Essaouira, Chefchaouen, Hassan-torni,
 * Erg Chebbi, El Jadida ja Lixus. Lähin uusi merkki on Volubilis 19,2
 * lautayksikön päässä Fèsistä (KAUPUNGIN_KOHDALLA_SADE 7), joten
 * kaikki kahdeksan ovat pääkartan merkkejä. Meknès jäi pois
 * nimiösyystä: se on vain 6,6 lautayksikön päässä Volubiliksesta, ja
 * kaupunki mainitaan Volubiliksen kortissa. Erä on kuvaton, ja
 * jokaisen kohteen lähin pelikaupunki on kirjattu sen
 * koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_MAR = [
  {
    id: 'toubkal',
    nimi: 'Toubkal',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on ultrahuippu?',
      'Kuka nousi Toubkalille ensimmäisenä?',
    ],
    korostukset: ['Atlasvuoret|Atlasvuorten'],
    nappi: 'Pohjois-Afrikan korkein',
    // -7.9151 E / 31.0596 N — en-Wikipedia "Toubkal"
    laudat: {
      maailmankartta: { x: 5569.5, y: 2142.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Pohjois-Afrikan korkein vuori kirjattiin valloitetuksi vasta 12. kesäkuuta 1923, kun '
      + 'markiisi de Segonzac ja hänen kaksi seuralaistaan nousivat huipulle — vaikka artikkeli '
      + 'myöntää suoraan, että joku on hyvin todennäköisesti käynyt siellä jo aiemmin. Korkeus '
      + 'mitattiin vuotta myöhemmin: 4 165 metriä, nykytiedon mukaan 4 167. Toubkal on Marokon, '
      + 'Atlasvuorten ja koko arabimaailman korkein huippu, ja se on niin sanottu ultrahuippu: '
      + 'yli kahdentuhannen kilometrin säteellä ei ole yhtään korkeampaa. Kiipeäminen alkaa '
      + 'Imlilin kylästä ja kestää kaksi päivää yöpymisineen. Huippua koristaa iso pyramidin '
      + 'muotoinen kolmiomittausmerkki, ja Marrakechista, 63 kilometrin päästä, vuori näkyy '
      + 'kaupungin kaduille asti.',
    lahde: 'en-Wikipedia "Toubkal", johdanto-osa sekä osiot "Geography" ja "Access" (tarkistettu '
      + '1.9.2026).',
  },
  {
    id: 'atlantti',
    nimi: 'Atlantti',
    tyyppi: 'meri',
    kysymykset: [
      'Ketkä ylittivät Atlantin ensimmäisinä?',
      'Miksi vuotta 1492 pidetään käännekohtana?',
    ],
    nappi: 'Löytöretkien valtameri',
    // -8.5 E / 33.2 N — ulappa Casablancan edustalla; en-Wikipedia "Atlantic Ocean" antaa koko valtameren keskipisteeksi -25 / 0
    laudat: {
      maailmankartta: { x: 5550, y: 2062.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Atlantti on maailman toiseksi suurin valtameri, ja Marokon länsirannikko avautuu '
      + 'suoraan sen ulapalle. Ensimmäisinä valtameren tiedetään ylittäneen viikinkien, mutta '
      + 'seurauksiltaan suurin oli Kristoffer Kolumbuksen retki vuonna 1492: se avasi '
      + 'eurooppalaisten löytöretkien ja siirtomaavalloitusten aikakauden. Löytöretkien aikaan '
      + 'Atlantin ajateltiin erottavan Amerikan \'uuden maailman\' vanhasta.',
    lahde: 'en-Wikipedia "Atlantic Ocean", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'draa',
    nimi: 'Drâa',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joen loppuosa on enimmäkseen kuiva?',
      'Mitä Fezouatan kivettymät ovat?',
    ],
    korostukset: ['Korkea Atlas|Korkealta Atlakselta'],
    nappi: 'Joki, joka katoaa hiekkaan',
    // -5.8 E / 30.3 N — keskijuoksu Zagoran seudulla; en-Wikipedia "Draa River" antaa koordinaatiksi alajuoksun -11,12 / 28,68
    laudat: {
      maailmankartta: { x: 5640, y: 2169.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Drâa on Marokon pisin joki: 1 100 kilometriä. Se syntyy Dadèsin ja Iminin jokien '
      + 'yhtyessä, virtaa Korkealta Atlakselta ensin kaakkoon ja kääntyy sitten länteen kohti '
      + 'Atlanttia — mutta Tagouniten jälkeinen osuus on suurimman osan vuotta kuivillaan. Joen '
      + 'laaksosta on löydetty Fezouatan kivettymät, poikkeuksellisen hyvin säilynyt ikkuna '
      + 'ordovikikauden alun muinaiseen meriluontoon.',
    lahde: 'en-Wikipedia "Draa River", johdanto-osa (tarkistettu 30.8.2026).',
  },

  /* ==============================================================
   * MAAILMAN ERÄ M11, AFRIKKA 6.9.2026 — KAHDEKSAN KOHDETTA.
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko
   * maailmaan."* Marokolla oli kolme maastokohdetta ja nolla kohdetta
   * (docs/moduulit/karttanostot-kattavuus.md, Afrikka). Kaikki
   * kahdeksan ovat pääkartan merkkejä: etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin uusi
   * merkki on Volubilis 19,2 lautayksikön päässä Fèsistä (raja
   * KAUPUNGIN_KOHDALLA_SADE on 7, js/fokuskohteet.js). Kuvaton erä;
   * faktat en-Wikipedian raakatekstistä 6.9.2026, ja jokainen
   * `lahde`-rivi kertoo artikkelin osan.
   * ============================================================== */
  {
    id: 'volubilis',
    nimi: 'Volubilis',
    tyyppi: 'historia',
    kysymykset: [
      'Millä Volubilis vaurastui?',
      'Miksi rauniot menettivät kivensä?',
    ],
    korostukset: ['mosaiikki|mosaiikkilattioina'],
    nappi: 'Rooman läntisin kaupunki',
    // −5.5536 E / 34.0711 N — en-Wikipedia "Volubilis"
    // Lähin pelikaupunki: Fès 19,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5648.2, y: 2030.4 },
    },
    teksti: 'Volubilis on osittain kaivettu berberiläis-roomalainen kaupunki Meknèsin lähellä. Se '
      + 'kasvoi 200-luvulta eaa. alkaen berberi- ja karthagolaisasutuksesta Mauretanian '
      + 'kuningaskunnan pääkaupungiksi, ja Juba II — Rooman kasvattama, Kleopatran tyttären '
      + 'puoliso — rakensi sitä toiseksi pääkaupungikseen 25 eaa. alkaen. Rooman vallan alla se '
      + 'laajeni 42 hehtaariin ja sai 2,6 kilometrin muurit, basilikan, temppelin ja '
      + 'riemukaaren. Vauraus tuli oliiveista, ja se näkyy talojen suurina mosaiikkilattioina. '
      + 'Paikalliset heimot valtasivat kaupungin noin 285, eikä Rooma ottanut sitä koskaan '
      + 'takaisin; asutus jatkui silti seitsemänsataa vuotta. Rauniot säilyivät ehjinä vuoden '
      + '1755 maanjäristykseen asti, ja sen jälkeen niistä louhittiin kiveä Meknèsin '
      + 'rakennuksiin. Unescon maailmanperintökohde.',
    lahde: 'en-Wikipedia "Volubilis", johdanto-osa sekä osiot "Name" ja "Foundation and Roman '
      + 'occupation" (tarkistettu 6.9.2026).',
  },
  {
    id: 'aitbenhaddou',
    nimi: 'Aït Benhaddou',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mikä on ksar?',
      'Miksi savirakennus vaatii jatkuvaa hoitoa?',
    ],
    korostukset: ['savi|savesta'],
    nappi: 'Savikylä karavaanitien varrella',
    // −7.1289 E / 31.0472 N — en-Wikipedia "Aït Benhaddou"
    // Lähin pelikaupunki: Marrakech 61,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5595.7, y: 2142.6 },
    },
    teksti: 'Aït Benhaddou on ksar eli linnoitettu kylä vanhan Saharan ja Marrakechin välisen '
      + 'karavaanitien varrella. Paikkaa on linnoitettu 1000-luvulta almoravidien ajoista '
      + 'lähtien, vaikka nykyisistä rakennuksista tuskin mikään on 1600-lukua vanhempi. Sen '
      + 'merkitys perustui sijaintiin: Tizi n\'Tichkan sola oli yksi harvoista teistä Atlaksen '
      + 'yli Marrakechista Drâan laaksoon. Muurin, kulmatornien ja portin sisällä on '
      + 'asuintaloja, moskeija, karavaaniseraji, useita kasbahia ja hautamuistomerkki; kukkulan '
      + 'laella on suuren linnoitetun viljavaraston eli agadirin jäänteet. Kaikki on tehty '
      + 'savesta: sullotusta maasta, adobesta ja savitiilestä, joihin on sekoitettu olkea. '
      + 'Aineen huono puoli on läpäisevyys — hylätty savikylä alkaa murentua muutamassa '
      + 'vuosikymmenessä. Unescon maailmanperintökohde 1987.',
    lahde: 'en-Wikipedia "Aït Benhaddou", johdanto-osa sekä osiot "History" ja "Description" '
      + '("Layout of the site", "Building materials") (tarkistettu 6.9.2026).',
  },
  {
    id: 'essaouira',
    nimi: 'Essaouira',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kuka suunnitteli Essaouiran ja milloin?',
      'Mitä Juba II teki Mogadorin saarella?',
    ],
    korostukset: ['purppura|purppuratehtaan'],
    nappi: 'Sulttaanin piirustuspöydältä',
    // −9.7697 E / 31.5131 N — en-Wikipedia "Essaouira"
    // Lähin pelikaupunki: Marrakech 149,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5507.7, y: 2125.4 },
    },
    teksti: 'Essaouira on harvinaisuus: kokonaan piirustuspöydällä suunniteltu marokkolainen '
      + 'kaupunki. Sulttaani Mohammed ben Abdallah antoi tehtävän 1760 usealle arkkitehdille, '
      + 'muun muassa ranskalaiselle Théodore Cornut\'lle ja Ahmed al-Inglizille, ja työvoimana '
      + 'käytettiin Larachen epäonnistuneessa ranskalaisretkessä 1765 vangittuja miehiä. '
      + 'Tarkoitus oli tehdä kaupunki ulkomaisten kauppiaiden tarpeisiin, ja siitä tuli maan '
      + 'tärkein kauppasatama ja 1700-luvun lopun ja 1800-luvun alkupuolen diplomaattinen '
      + 'keskus. Nimi on arabian sanan "muuri" deminutiivi. Lahti on ollut suojaisa satama '
      + 'esihistoriasta asti: karthagolainen Hanno kävi täällä 400-luvulla eaa., ja Mauretanian '
      + 'kuningas Juba II perusti saarelle purppuratehtaan, jossa simpukoista keitettiin '
      + 'väri Rooman senaattorien togien raitoihin. Medina on ollut maailmanperintökohde 2001 '
      + 'lähtien.',
    lahde: 'en-Wikipedia "Essaouira", johdanto-osa sekä osiot "Name and etymology" ja "History" '
      + '("Antiquity", "Early modern period") (tarkistettu 6.9.2026).',
  },
  {
    id: 'chefchaouen',
    nimi: 'Chefchaouen',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mitä nimi Chefchaouen tarkoittaa?',
      'Ketkä rakensivat kaupungin andalusialaiset korttelit?',
    ],
    korostukset: ['sininen|sinisiksi'],
    nappi: 'Sininen kaupunki vuorten juurella',
    // −5.2697 E / 35.1714 N — en-Wikipedia "Chefchaouen"
    // Lähin pelikaupunki: Tanger 28,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5657.7, y: 1988.9 },
    },
    teksti: 'Chefchaouen tunnetaan sinisiksi maalatuista taloistaan, ja nimi tulee arabian ja '
      + 'berberin yhdistelmästä: "katso sarvia" viittaa kahteen vuorenhuippuun kaupungin '
      + 'yläpuolella. Ali ibn Rashid al-Alami perusti paikalle 1471 pienen kasbahin '
      + 'puolustukseksi portugalilaisia vastaan, jotka hyökkäilivät tuolloin Pohjois-Marokon '
      + 'kaupunkeihin. Granadan kukistuminen 1492 ja moriskojen karkotus Espanjasta 1609 toivat '
      + 'kaupunkiin andalusialaisia pakolaisia, jotka rakensivat rinteille omat korttelinsa '
      + 'granadalaiseen tyyliin; muutamassa vuosikymmenessä linnoituksesta kasvoi kaupunki, '
      + 'jossa on kymmenkunta porttia ja useita moskeijoita. Ali ibn Rashidin tytär, joka '
      + 'tunnetaan arvonimellä Sayyida al-Hurra, hallitsi kaupunkia sen kasvun vuosina. Espanja '
      + 'miehitti Chefchaouenin 1920, ja 1924–1926 se kuului Abd el-Krimin Rifin tasavaltaan.',
    lahde: 'en-Wikipedia "Chefchaouen", johdanto-osa sekä osiot "Etymology" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'hassantorni',
    nimi: 'Hassan-torni',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi moskeija jäi kesken?',
      'Mistä tornin nousutapa on lainattu?',
    ],
    korostukset: ['minareetti|minareetti'],
    nappi: 'Kesken jäänyt jättimoskeija',
    // −6.8228 E / 34.0242 N — en-Wikipedia "Hassan Tower"
    // Lähin pelikaupunki: Fès 61,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5605.9, y: 2032.1 },
    },
    teksti: 'Rabatin Hassan-torni on keskeneräisen moskeijan minareetti. Almohadikalifi Abu Yusuf '
      + 'Yaqub al-Mansur aloitti sen rakentamisen 1191 osana uutta linnoitettua pääkaupunkia, '
      + 'jota kutsuttiin nimellä Ribat al-Fath. Minareetista piti tulla maailman korkein ja '
      + 'moskeijasta läntisen islamilaisen maailman suurin. Kun al-Mansur kuoli 1199, työ '
      + 'pysähtyi: torni jäi 44 metriin, moskeijasta ehdittiin tehdä vain muurien alkuja ja 348 '
      + 'pylvästä. Torni on mallia Marrakechin Koutoubia-moskeijan minareetista, kuten Sevillan '
      + 'Giraldakin, mutta sen sisällä ei ole portaita vaan ramppisarja — idea on lainattu '
      + 'Aleksandrian majakasta. Al-Mansurin seuraajilla ei ollut varoja eikä tahtoa jatkaa, '
      + 'ja irtoava rakennusaine kannettiin muualle; Lissabonin maanjäristys 1755 vaurioitti '
      + 'loput. Kohde tuli maailmanperintöluetteloon 2012 osana historiallista Rabatia.',
    lahde: 'en-Wikipedia "Hassan Tower", johdanto-osa sekä osiot "Name", "History" ja "Design" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'ergchebbi',
    nimi: 'Erg Chebbi',
    tyyppi: 'muu',
    kysymykset: [
      'Mitä sana erg tarkoittaa?',
      'Mikä oli Sijilmassa?',
    ],
    korostukset: ['dyyni|dyynikenttä'],
    nappi: 'Sadanviidenkymmenen metrin dyynit',
    // −3.9833 E / 31.1667 N — en-Wikipedia "Erg Chebbi"
    // Lähin pelikaupunki: Marrakech 61,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5700.6, y: 2138.2 },
    },
    teksti: 'Erg on hiekkameri: tuulen kasaama dyynikenttä. Erg Chebbi on Saharan läntisellä '
      + 'reunalla, ja sen dyynit nousevat paikoin 150 metriä ympäröivän kivierämaan eli hamadan '
      + 'yläpuolelle. Kenttä on pohjoisesta etelään noin 28 kilometriä ja idästä länteen 5–7 '
      + 'kilometriä, ja se seuraa Algerian rajaa. Lähin suuri kaupunki on Erfoud noin 60 '
      + 'kilometrin päässä, ja neljänkymmenen kilometrin päässä on Rissani, jossa sijaitsi '
      + 'Sijilmassan kaupunki — se vaurastui 700-luvulta 1300-luvulle hallitsemalla Saharan '
      + 'karavaaniteitä. Sade on harvinaista, mutta 2006 dyynien viereinen tulva tuhosi '
      + 'rakennuksia ja vaati kolme ihmishenkeä. Kesän kuumimpaan aikaan osa marokkolaisista '
      + 'tulee dyyneille haudattavaksi kaulaa myöten kuumaan hiekkaan muutamaksi minuutiksi '
      + 'kerrallaan: sitä pidetään reumalääkkeenä.',
    lahde: 'en-Wikipedia "Erg Chebbi", johdanto-osa sekä osiot "Description" ja "Tourism" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'eljadida',
    nimi: 'El Jadida',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä oli Mazagão?',
      'Mitä nimi al-Jadida tarkoittaa?',
    ],
    korostukset: ['vesisäiliö|vesisäiliö'],
    nappi: 'Portugalin viimeinen linnoituskaupunki',
    // −8.5 E / 33.2333 N — en-Wikipedia "El Jadida"
    // Lähin pelikaupunki: Fès 121,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5550, y: 2061.7 },
    },
    teksti: 'Portugalilaiset rakensivat Marokon rannikolle 1500-luvun alussa kuusi linnoitusta ja '
      + 'valtasivat kuusi kaupunkia. Useimmat jäivät lyhytikäisiksi, mutta Mazagão — nykyinen El '
      + 'Jadida — kesti. Sen linnoituksen rakensivat 1514 veljekset Diogo ja Francisco de '
      + 'Arruda, ja kun portugalilaiset menettivät Agadirin 1541, kuningas João III siirsi '
      + 'voimansa juuri tänne ja laajensi linnoituksen nykyiseen muotoonsa. Portugalilaiset '
      + 'luopuivat siitä vasta 1769. Kaupunki sai nykyisen nimensä 1820: al-Jadida tarkoittaa '
      + '"uutta". Unesco otti Mazagãon maailmanperintöluetteloon 2004 esimerkkinä eurooppalaisten '
      + 'ja marokkolaisten vaikutteiden vaihdosta ja renessanssin ihanteiden varhaisesta '
      + 'toteutuksesta; tärkeimmät portugalilaisajan rakennukset ovat manuelilaistyylinen '
      + 'vesisäiliö ja Taivaaseenastumisen kirkko.',
    lahde: 'en-Wikipedia "El Jadida", johdanto-osa sekä osiot "Names" ja "History" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'lixus',
    nimi: 'Lixus',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä myytti liitetään Lixukseen?',
      'Miten pitkään paikassa asuttiin?',
    ],
    korostukset: ['foinikialainen|foinikialaisten'],
    nappi: 'Hesperidien puutarha Loukkosin varrella',
    // −6.0986 E / 35.2008 N — en-Wikipedia "Lixus (ancient city)"
    // Lähin pelikaupunki: Tanger 26,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5630, y: 1987.8 },
    },
    teksti: 'Lixus on foinikialaisten 700–600-luvulla eaa. kehittämä kaupunki pronssikautisen '
      + 'asutuksen päälle — vanhempi kuin Karthago. Sen erikoisuus on yhtäjaksoisuus: raunioissa '
      + 'on kerroksia foinikialaiselta, puunilaiselta, mauretanialaiselta, roomalaiselta ja '
      + 'islamilaiselta ajalta, viimeiset 1100–1400-luvulta. Kaupunki nousi 80 metrin kukkulalle '
      + 'Loukkos-joen oikealla rannalla, ja se hallitsi sekä merta että laaksoa; virallinen '
      + 'kieli oli puuni, ja kolikoissa nimi on kolmikirjaiminen LKS. Antiikin kirjoittajille '
      + 'näin kaukainen paikka oli myyttien maata: Plinius vanhempi kertoo, että täällä olivat '
      + 'Antaioksen palatsi ja Hesperidien puutarha kultaisine omenoineen, jota lohikäärme '
      + 'vartioi — Plinius itse arveli lohikäärmeen olevan vertauskuva mutkittelevalle joelle. '
      + 'Marokko esitti Lixusta maailmanperintöluetteloon 1995, ja se on yhä ehdokaslistalla.',
    lahde: 'en-Wikipedia "Lixus (ancient city)", johdanto-osa sekä osiot "Tentative World '
      + 'Heritage Status", "Geography", "Name", "Legends" ja "History" (tarkistettu 6.9.2026).',
  },
];

