/*
 * MAASTOKOHTEET — NAM. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs NAM --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/NAM.json. Työkalu laskee laudan
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
 * Namibian maastokohteet. Faktat en-Wikipediasta 30.8.2026.
 */
export const MAASTOKOHTEET_NAM = [
  {
    id: 'brandberg',
    nimi: 'Brandberg',
    tyyppi: 'vuori',
    kysymykset: [
      'Mistä Brandberg sai palavan nimensä?',
      'Miten 2 573 metrin Königstein-huipulle noustaan?',
    ],
    korostukset: ['Königstein'],
    nappi: 'Namibian korkein vuori',
    // 14.5487 E / -21.1258 N — en-Wikipedia "Brandberg Mountain"
    laudat: {
      maailmankartta: { x: 6318.3, y: 3926.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Brandberg on Namibian korkein vuori: sen laella Namibin aavikon luoteisosassa kohoaa '
      + 'Königstein, 2 573 metriä merenpinnasta. Noin 650 neliökilometrin massiivi nousee '
      + 'suoraan tasaisilta soratasangoilta, joten se näkyy kirkkaalla säällä valtavan kauas, '
      + 'ja sen ydinalue julistettiin kansallismuistomerkiksi jo vuonna 1951. Nimi on '
      + 'afrikaansia, hollantia ja saksaa ja tarkoittaa palavaa vuorta.',
    lahde: 'en-Wikipedia "Brandberg Mountain", johdanto ja osat Location ja Origin of name '
      + '(tarkistettu 30.8.2026).',
  },
  {
    id: 'atlantti',
    nimi: 'Atlantti',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka suuren osan maapallosta Atlantti peittää?',
      'Miksi Namibian rannikolla aavikko ulottuu mereen asti?',
    ],
    nappi: 'Valtameri aavikon reunalla',
    // 13.4 E / -23 N — ulappa Walvis Bayn edustalla; artikkelin oma keskipiste on -25 / 0
    laudat: {
      maailmankartta: { x: 6280, y: 3991.7 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Atlantti on maailman toiseksi suurin valtameri: noin 85 miljoonaa neliökilometriä eli '
      + 'noin 17 prosenttia koko maapallon pinnasta. Namibian koko länsiraja on tämän '
      + 'valtameren rantaa, ja Namibin aavikko ulottuu paikoin suoraan rantaviivaan saakka. '
      + 'Löytöretkien aikakaudella Atlantti tunnettiin merenä, joka erotti vanhan ja uuden '
      + 'maailman toisistaan.',
    lahde: 'en-Wikipedia "Atlantic Ocean", johdanto-osa; aavikon ja rannikon suhde artikkelista '
      + '"Brandberg Mountain" (tarkistettu 30.8.2026).',
  },
  {
    id: 'oranjejoki',
    nimi: 'Oranjejoki',
    tyyppi: 'joki',
    kysymykset: [
      'Missä vuoristossa Oranje saa alkunsa?',
      'Miksi joki on kahden valtion välinen raja?',
    ],
    nappi: 'Eteläisen Afrikan suuri rajajoki',
    // 16.4522 E / -28.6328 N — en-Wikipedia "Orange River" — koordinaatti on joen suulla Oranjemundin kohdalla
    laudat: {
      maailmankartta: { x: 6381.7, y: 4192.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Oranjejoki on Etelä-Afrikan pisin joki: 2 432 kilometriä Lesothon Drakensbergin '
      + 'vuorilta länteen Atlanttiin. Sen alajuoksu muodostaa Namibian ja Etelä-Afrikan välisen '
      + 'rajan, ja merkki onkin joen suulla, jossa aavikkojen halki kulkenut virta viimein '
      + 'kohtaa valtameren.',
    lahde: 'en-Wikipedia "Orange River", johdanto-osa (tarkistettu 30.8.2026).',
  },
  /* ───── KOHTEET (8) — ERÄ M13, ETELÄINEN AFRIKKA, 6.9.2026 ─────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Namibialla oli ennen tätä erää kolme maastokohdetta ja eläintäky
   * (erämaanorsu) mutta ei yhtäkään kohdetta eikä skandaalia. Tavoite
   * maata kohti on kahdeksan KOHDETTA ja kolme MAASTOKOHDETTA.
   *
   * VAIN MAAILMANKARTAN RIVI (Raamattu 30.8.2026). Koordinaatit on
   * laskettu koneella tools/johda-maastokohteet.mjs:n vientifunktiolla
   * `laudat(lon, lat)` en-Wikipedian coordinates-propin lon/lat-parista,
   * ja jokainen piste osuu maan fokuslehden rajaukseen
   * (x 6142,7…6756,6 ja y 3708,0…4283,1).
   *
   * EI PELIKAUPUNGIN KOHDALLA. Etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin: lähin uusi merkki on
   * Sossusvlei 41,9 lautayksikön päässä Namib-laatasta ja kaukaisin
   * Etosha 162,6 yksikön päässä samasta laatasta. Raja
   * KAUPUNGIN_KOHDALLA_SADE on 7.
   *
   * KAKSI EHDOKASTA KAATUI NIMIÖLIMITYKSEEN. Twyfelfontein on vain
   * 3,2 lautayksikön päässä maan oman erämaanorsu-eläintäyn merkistä,
   * ja Lüderitz 3,3 yksikön päässä Kolmanskopista; kummastakin parista
   * mahtui kartalle vain toinen. Twyfelfonteinin tilalle tuli
   * Spitzkoppe ja Lüderitzin tilalle jäi Kolmanskop, jonka kortti
   * kertoo myös vuoden 1908 timanttilöydön.
   *
   * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
   * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
   */
  {
    id: 'spitzkoppe',
    nimi: 'Spitzkoppe',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka vanhaa graniitti on?',
      'Kuka on maalannut kallioiden kuvat?',
    ],
    korostukset: ['inselberg|inselbergejä'],
    nappi: 'Namibian Matterhorn',
    // 15.19511 E / -21.82563 N — en-Wikipedia "Spitzkoppe"
    laudat: {
      maailmankartta: { x: 6339.8, y: 3950.5 },
    },
    teksti: 'Spitzkoppe — saksaksi "terävä kumpu" — on joukko paljaita graniittihuippuja eli '
      + 'inselbergejä Namibin autiomaassa Usakosin ja Swakopmundin välissä. Graniitti on yli '
      + '120 miljoonaa vuotta vanhaa, ja korkein kallio kohoaa noin 1 728 metriin '
      + 'merenpinnasta ja noin 670 metriä ympäröivän autiomaan pinnan yläpuolelle, mistä sen '
      + 'lisänimi "Namibian Matterhorn". Lähellä on matalampi Pikku-Spitzkoppe, 1 557 metriä, '
      + 'ja muut kohoumat jatkuvat Pontokvuorten jonoksi. Kallioihin on maalattu runsaasti '
      + 'sanikansojen kalliotaidetta.',
    lahde: 'en-Wikipedia "Spitzkoppe", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'kolmanskop',
    nimi: 'Kolmanskop',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka löysi ensimmäisen timantin ja kuka hyötyi?',
      'Miksi kaupunki tyhjeni?',
    ],
    korostukset: ['Sperrgebiet|Sperrgebietiksi'],
    nappi: 'Aavekaupunki hiekan alla',
    // 15.23237 E / -26.70406 N — en-Wikipedia "Kolmanskop"
    laudat: {
      maailmankartta: { x: 6341.1, y: 4123 },
    },
    teksti: 'Kolmanskop on aavekaupunki Namibin autiomaassa Etelä-Namibiassa, kymmenen '
      + 'kilometriä sisämaahan Lüderitzin satamasta. Vuonna 1908 rautatietyöläinen Zacharias '
      + 'Lewala löysi täältä timantin ja näytti sitä esimiehelleen, saksalaiselle '
      + 'rautatietarkastaja August Stauchille; saksalaisia kaivosmiehiä muutti paikalle, ja '
      + 'Saksan keisarikunta julisti pian laajan alueen "Sperrgebietiksi" eli kielletyksi '
      + 'alueeksi ja alkoi hyödyntää timanttikenttää. Rikkaus näkyi rakennuksissa: kylään '
      + 'nousi saksalaiseen tyyliin sairaala, juhlasali, voimalaitos, koulu, keilarata, '
      + 'teatteri ja urheiluhalli, kasino, jäätehdas sekä eteläisen pallonpuoliskon '
      + 'ensimmäinen röntgenasema. Kaupunki alkoi hiipua ensimmäisessä maailmansodassa '
      + 'kenttien ehtyessä, ja lopullisen iskun antoi 1928 löydetty, kaikkia aiempia '
      + 'rikkaampi timanttiesiintymä Oranjejoen rantaterasseilla 270 kilometriä etelämpänä. '
      + 'Nykyään paikkaa hoitaa Namdeb, Namibian valtion ja De Beersin yhteisyritys.',
    lahde: 'en-Wikipedia "Kolmanskop", johdanto-osa ja osiot "Foundation and peak" ja '
      + '"Decline" (tarkistettu 6.9.2026).',
  },
  {
    id: 'fish-riverin-kanjoni',
    nimi: 'Fish Riverin kanjoni',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka syvä kanjoni on?',
      'Miksi joki katoaa suurimman osan vuodesta?',
    ],
    korostukset: ['gneissi|gneissi'],
    nappi: 'Afrikan suurin kanjoni',
    // 17.59759 E / -27.58929 N — en-Wikipedia "Fish River Canyon"
    laudat: {
      maailmankartta: { x: 6419.9, y: 4154.8 },
    },
    teksti: 'Fish Riverin kanjoni Etelä-Namibiassa on Afrikan suurin kanjoni: noin 160 '
      + 'kilometriä pitkä, paikoin 27 kilometriä leveä ja lähes 550 metriä syvä. Fish River '
      + 'on Namibian pisin sisämaan joki, ja se on leikannut uomansa kuivaan, kiviseen ja '
      + 'niukkakasvuiseen ylätasankoon. Joki virtaa vain ajoittain: se tulvii tavallisesti '
      + 'loppukesästä, ja muun vuoden se on ketju pitkiä kapeita lampia. Kanjonissa on kaksi '
      + 'osaa — ylempi, jossa kova gneissi hidasti kulutusta, ja alempi, joka syntyi vasta '
      + 'kun eroosio oli syönyt kovan kerroksen läpi. Alajuoksulla on ǀAi-ǀAisin kuumien '
      + 'lähteiden lomakeskus, ja näköalapaikat ovat Hobasin leirintäalueen lähellä.',
    lahde: 'en-Wikipedia "Fish River Canyon", johdanto-osa ja osio "Geology" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'etosha',
    nimi: 'Etosha',
    tyyppi: 'muu',
    kysymykset: [
      'Mitä nimi Etosha tarkoittaa?',
      'Milloin alue rauhoitettiin ja kenen määräyksestä?',
    ],
    korostukset: ['suolapannu|suolapannu'],
    nappi: 'Suuri valkoinen paikka',
    // 15.89778 E / -18.94528 N — en-Wikipedia "Etosha National Park"
    laudat: {
      maailmankartta: { x: 6363.3, y: 3850.5 },
    },
    teksti: 'Etosha on yksi Afrikan suurimmista kansallispuistoista Luoteis-Namibiassa. Saksan '
      + 'Lounais-Afrikan kuvernööri Friedrich von Lindequist julisti alueen riistansuojelu'
      + 'alueeksi maaliskuussa 1907 asetuksella 88; kansallispuiston aseman se sai 1967. '
      + 'Puisto on 22 270 neliökilometriä, ja se on nimetty Etoshan suolapannun mukaan, joka '
      + 'on lähes kokonaan sen sisällä ja kattaa 4 760 neliökilometrillään 23 prosenttia koko '
      + 'pinta-alasta. Nimi tulee oshindongan sanasta, joka tarkoittaa "suurta valkoista '
      + 'paikkaa"; hai//omit kutsuivat pannua nimellä Khubus, "täysin paljas, valkoinen ja '
      + 'pölyinen paikka". Eurooppalaisista sen merkitsivät muistiin ensimmäisinä Charles '
      + 'John Andersson ja Francis Galton 29. toukokuuta 1851, vaikka paikalliset olivat '
      + 'tunteneet sen kauan. Puistossa elää satoja nisäkäs-, lintu- ja matelijalajeja, '
      + 'muiden muassa uhanalainen musta sarvikuono.',
    lahde: 'en-Wikipedia "Etosha National Park", johdanto-osa ja osio "History" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'sossusvlei',
    nimi: 'Sossusvlei',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi dyynit ovat punaisia?',
      'Mistä autiomaan kasvit saavat vetensä?',
    ],
    korostukset: ['vlei|vlei'],
    nappi: 'Suo, josta ei ole ulospääsyä',
    // 15.28765 E / -24.73983 N — en-Wikipedia "Sossusvlei"
    laudat: {
      maailmankartta: { x: 6342.9, y: 4053.1 },
    },
    teksti: 'Sossusvlei on suola- ja savipannu korkeiden punaisten dyynien keskellä eteläisessä '
      + 'Namibissa, Namib-Naukluftin kansallispuistossa. Nimi on sekakieltä ja tarkoittaa '
      + 'suunnilleen "umpikujasuota": vlei on afrikaansia ja tarkoittaa suota, sossus on '
      + 'namaa ja tarkoittaa "ei paluuta" tai "umpikuja" — pannu on kausiluonteisen Tsauchab-'
      + 'joen valuma-alueen päätepiste, josta vesi ei pääse minnekään. Dyynit kuuluvat '
      + 'maailman korkeimpiin: moni niistä on yli 200 metriä ja korkein, lempinimeltään Big '
      + 'Daddy, noin 325 metriä. Oranssin sävy kertoo raudasta, joka on hapettunut vuosien '
      + 'saatossa; mitä vanhempi dyyni, sitä punaisempi. Kasvillisuutta juottavat maanalaiset '
      + 'ja kausiluonteiset joet sekä Atlantilta joka aamu autiomaahan ajautuva sumu.',
    lahde: 'en-Wikipedia "Sossusvlei", johdanto-osa ja osio "Environment" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'swakopmund',
    nimi: 'Swakopmund',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi satama rakennettiin juuri tähän?',
      'Mitä kaupungin vanhoissa taloissa nyt on?',
    ],
    korostukset: ['Woermannhaus|Woermannhaus'],
    nappi: 'Saksan siirtomaan pääsatama',
    // 14.53333 E / -22.68333 N — en-Wikipedia "Swakopmund"
    laudat: {
      maailmankartta: { x: 6317.8, y: 3980.6 },
    },
    teksti: 'Swakopmund — "Swakopin suu" — on kaupunki Namibian länsirannikolla, 352 '
      + 'kilometriä Windhoekista länteen, Erongon alueen pääkaupunki ja Namibian neljänneksi '
      + 'suurin asutuskeskus. Se perustettiin 1892 Saksan Lounais-Afrikan pääsatamaksi, ja '
      + '1800-luvun lopun saksalainen siirtomaa-arkkitehtuuri leimaa sitä yhä. Kaupunki on '
      + 'Namibin autiomaan reunalla ja nykyään suosittu rantalomakohde. Rakennuksiin kuuluu '
      + 'Heinrich Bausen 1909 suunnittelema vanha vankila Altes Gefängnis sekä 1906 '
      + 'rakennettu Woermannhaus näkyvine Damara-torneineen, joka toimii nyt yleisenä '
      + 'kirjastona.',
    lahde: 'en-Wikipedia "Swakopmund", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'hoban-meteoriitti',
    nimi: 'Hoban meteoriitti',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi meteoriitti ei jättänyt kraatteria?',
      'Kuka sen löysi ja miten?',
    ],
    korostukset: ['rautanikkeli|rautanikkeliä'],
    nappi: 'Maailman suurin meteoriitti pellossa',
    // 17.93361 E / -19.5925 N — en-Wikipedia "Hoba meteorite"
    laudat: {
      maailmankartta: { x: 6431.1, y: 3872.9 },
    },
    teksti: 'Hoban meteoriitti makaa Hoba Westin maatilalla lähellä Grootfonteinia '
      + 'Otjozondjupan alueella Namibiassa. Se on kaivettu esiin mutta jätetty paikoilleen, '
      + 'koska sitä ei ole koskaan saatu liikkeelle: päämassa painaa yli 60 tonnia. Se on '
      + 'suurin tunnettu ehjänä säilynyt meteoriitti ja samalla maan pinnan suurin luonnossa '
      + 'esiintyvä rautakappale, rautanikkeliä — noin kaksi kertaa niin painava kuin '
      + 'seuraavaksi suurimmat lohkareet. Nimi Hoba tulee khoekhoegowabin sanasta, joka '
      + 'tarkoittaa lahjaa. Meteoriitti putosi arviolta alle 80 000 vuotta sitten, ja '
      + 'ilmakehä jarrutti sen niin hitaaksi, että se jäi ehjäksi eikä kaivanut kraatteria. '
      + 'Löytö oli sattuma: maanomistaja Jacobus Hermanus Brits kynti peltoaan härällä 1920, '
      + 'kuuli kovan metallisen raapaisun ja aura pysähtyi. Kappale lahjoitettiin valtiolle '
      + '1987, ja paikalle rakennettiin opastuskeskus.',
    lahde: 'en-Wikipedia "Hoba meteorite", johdanto-osa sekä osiot "Impact" ja "Discovery" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'cape-cross',
    nimi: 'Cape Cross',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka pystytti kiviristin ja miksi?',
      'Missä alkuperäinen risti on nyt?',
    ],
    korostukset: ['padrão|padrão'],
    nappi: 'Risti, joka vietiin Berliiniin',
    // 13.95083 E / -21.77278 N — en-Wikipedia "Cape Cross"
    laudat: {
      maailmankartta: { x: 6298.4, y: 3948.7 },
    },
    teksti: 'Cape Cross on niemi Luurankorannikolla Länsi-Namibiassa. Portugalin kuningas '
      + 'Juhana II käski 1484 merenkulkija Diogo Cãon jatkaa etelään tuntemattomille '
      + 'rannikoille etsimään meritietä Intiaan ja pystyttämään näkyville niemille '
      + 'kivisiä padrão-ristejä Portugalin vaatimuksen merkiksi. Toisella matkallaan '
      + '1484–1486 Cão saapui tänne tammikuussa 1486 ensimmäisenä eurooppalaisena ja '
      + 'pystytti ristin, josta paikka on saanut nimensä. Alkuperäinen risti ei ole enää '
      + 'täällä: Saksan laivaston korvettikapteeni Gottlieb Becker, risteilijä Falken '
      + 'komentaja, vei sen 1893 Berliiniin, ja se on nykyään Deutsches Historisches '
      + 'Museumissa. Tilalle pystytettiin ensin puuristi, kaksi vuotta myöhemmin kivijäljennös '
      + 'ja 1900-luvun lopulla lahjoitusvaroin toinen, alkuperäistä tarkemmin muistuttava '
      + 'jäljennös — niemellä on siis kaksi kopiota. Nykyään Cape Cross tunnetaan myös '
      + 'suuresta merikarhuyhdyskunnastaan.',
    lahde: 'en-Wikipedia "Cape Cross", johdanto-osa sekä osiot "History" ja "Padrão" '
      + '(tarkistettu 6.9.2026).',
  },
];

