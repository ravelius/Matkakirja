/*
 * ELÄINTÄKYT — 29 maan eläin kartalla, kortti ja pieni punlöytö.
 *
 * Omistajan tilaus 29.8.2026: *"Eläintäky kartalle — eläin ilmestyy
 * maan kartalle täkynä: klikkaus avaa kuvan + lyhyen faktatekstin +
 * pienen puntapalkkion."*
 *
 * TÄMÄ EI OLE FOKUSVIRRAN TÄKY eikä täkynosto. Fokusvirran täyt
 * (js/fokusvirta.js, 50 puntaa) kuuluvat yhden kaupungin
 * annostelukulkuun ja täkynostot (js/fokusnosto.js) maan pooliin, jonka
 * pisteet nousevat aarteen jälkeen. Eläintäky on kevyempi ja koskee
 * MAATA eikä kaupunkia: 29 maasta useimmilla ei ole fokuskaupunkia
 * lainkaan, joten kummankaan koneiston ehdot eivät koskisi niitä.
 * Palkkio on siksi myös pienempi, 20 puntaa (js/elaintaky.js
 * ELAINTAKY_PALKKIO) — kevyempi sisältö, kevyempi löytö.
 *
 * ── SIJAINTI ON ASTEINA, EI LAUDAN YKSIKKÖINÄ ──────────────────────
 *
 * Paikka annetaan asteina ja käännetään laudan omalla kaavalla
 * (js/fokusmitat.js projisoiLaudalle). Asteet valittiin aikanaan siksi,
 * että sama eläin näkyi myös Euroopan erillislaudalla eri projektiossa;
 * lauta poistui (Raamattu 30.8.2026), mutta asteet ovat yhä oikea
 * muoto — ne ovat paikan totuus, laudan yksiköt vain sen projektio.
 *
 * PAIKKA ON MAAN SISÄLLÄ JA IRTI KAUPUNGEISTA. Jokainen piste on
 * tarkistettu koneellisesti (tests/elaintakyt.test.mjs): se osuu maalle
 * eikä mereen, se on oman maansa rajojen sisällä, ja lähimpään
 * kaupunkimerkkiin on matkaa — kaksi merkkiä samassa pisteessä on yksi
 * merkki (sama sääntö kuin vihreällä pisteellä, js/fokuspiste.js).
 * Islanti on poikkeus rajatestissä ja syy on laudan vanhassa datassa:
 * maailmankartan ISL-muoto on siirretty Euroopan laudan tyylitellylle
 * paikalle (lon −7,7), vaikka piirretty saari ja Islanti-kaupunki ovat
 * oikeassa paikassaan. Piste noudattaa piirrettyä saarta.
 *
 * ── TEKSTIT OVAT KAANONIA ──────────────────────────────────────────
 *
 * Otsikot ja tekstit ovat Fablen kirjoittamia sanatarkkoja
 * kaanontekstejä (29.8.2026). Integroija ei muokkaa sanamuotoja: jos
 * fakta on väärin, se korjataan kaanoniin eikä tähän tauluun.
 *
 * BIH JA TUR PALASIVAT 2.9.2026 UUSINA ELÄIMINÄ. Ne poistettiin
 * 1.9.2026 kaksoiskappaleina — Livnon villihevoset olivat jo Sarajevon
 * syvennys (js/packs/syvennyspaikat.js) ja Vanin kissa oma
 * fokuskohteensa (js/packs/fokuskohteet-tur.js) — ja omistaja tilasi
 * tilalle eläimet, jotka eivät toistu missään muualla: Bosnia ja
 * Hertsegovinan tornjak ja Turkin angoravuohi. Molemmat paikat
 * siirtyivät samalla: BIH Livnosta keskisen Bosnian vuorilaitumille ja
 * TUR Vanjärveltä Anatolian aroylängölle.
 *
 * FAKTAKORJAUSERÄ 1.9.2026 (nostojen sisältöremontti, erä 3). Erän 2
 * lähteistys nosti esiin 13 väitettä, joille lähde ei antanut katetta.
 * Ne on kirjoitettu uusiksi lähteen sanamuotoon TAI niille on haettu
 * oikea lähde, ja `lahde`-rivi kertoo nyt myös artikkelin osan.
 * Painavin virhe: EST väitti ilvestä Viron kansalliseläimeksi — se on
 * susi (et-Wikipedia "Rahvusloom"), ja kortti kantaa nyt sen sijaan
 * ilveskantafaktan (Euroopan tihein, en-Wikipedia "Eurasian lynx").
 * Muut korjatut: SWE LVA CZE HUN GBR ESP ROU NOR DEU GRC RUS BGR.
 * Kartan nimiöihin (`elain`/`nimio`) ja paikkoihin ei koskettu, joten
 * merkkien tiivisteet eivät muuttuneet.
 *
 * KUVAT OVAT OMISTAJAN OMIA generoituja kuvia, joten niillä ei ole
 * Commons-lähderiviä (vrt. js/packs/africa-valokuvat.js). Ne viedään
 * repoon työkalulla tools/elaintakykuvat.mjs (960 px, laatu 0,82) eikä
 * niitä ladata palvelutyöntekijän esilataukseen: 29 kuvaa paisuttaisi
 * asennuksen, ja kortin kuva haetaan vasta kun kortti avataan.
 */

/** Maatunnus → eläintäky. Avaimet ovat laudan countryShapes-tunnuksia. */
export const ELAINTAKYT = {
  FIN: {
    elain: 'saimaannorppa',
    otsikko: 'Järven oma hylje',
    teksti: 'Saimaannorppa jäi jääkauden jälkeen omaan järveensä, kun maa kohosi ja reitti mereen sulkeutui. Se on yksi maailman harvoista makean veden hylkeistä, eikä sitä tapaa mistään muualta kuin Saimaalta. Kanta on muutaman sadan yksilön varassa, joten jokainen kevätjäällä lepäilevä norppa on pieni ihme.',
    lahde: 'en-Wikipedia "Saimaa ringed seal". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-fin.jpg',
    lon: 28.4,
    lat: 61.4,
  },
  SWE: {
    elain: 'hirvenvasa',
    otsikko: 'Metsän kuninkaan perillinen',
    teksti: 'Hirvenvasa syntyy alkukesästä ja seuraa emoaan ensimmäisen vuotensa. Ruotsissa hirviä on noin 263 000 — metsäalaan suhteutettuna maailman tihein kanta, vaikka luku on pudonnut puoleen 1900-luvun lopun huipusta. Kevätvaellusta katsotaan suorana televisiosta viikkokausia: vuonna 2024 kolmekymmentäkaksi kameraa laski 87 joen ylittänyttä hirveä.',
    lahde: 'sv-Wikipedia "Älg", osio "Utbredning och population", ja '
      + 'en-Wikipedia "Slow television", osio "Den stora älgvandringen". '
      + 'Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-swe.jpg',
    lon: 15,
    lat: 60.5,
  },
  NOR: {
    elain: 'myskihärkä',
    otsikko: 'Jääkauden muisto Dovrefjellillä',
    teksti: 'Myskihärkä laidunsi aikoinaan mammuttien rinnalla, ja Dovrefjellin lauma on tuotu takaisin: kymmenen eläintä Grönlannista vuonna 1932. Sota söi ne, ja työ aloitettiin uudestaan 1947. Alusvilla eli qiviut on vahvempaa ja lämpimämpää kuin lampaanvilla ja pehmeämpää kuin kashmir — sitä ei keritä vaan kammataan kevätluonnin aikana.',
    lahde: 'en-Wikipedia "Muskox", osio "Norway", ja en-Wikipedia "Qiviut", '
      + 'osio "Properties". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-nor.jpg',
    lon: 9.4,
    lat: 62.3,
  },
  ISL: {
    elain: 'lunni',
    otsikko: 'Poikasten pelastajat',
    teksti: 'Islannissa pesii valtaosa koko Atlantin lunneista. Vestmannasaarilla on tapana, että kun poikaset eksyvät syksyllä kaupungin valoihin, lapset keräävät ne pahvilaatikoihin ja kantavat rantaan — aamulla poikaset heitetään kaaressa merituuleen, ja matka alkaa.',
    lahde: 'en-Wikipedia "Atlantic puffin". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-isl.jpg',
    lon: -19.4,
    lat: 64.6,
  },
  DNK: {
    elain: 'joutsenpoikue',
    otsikko: 'Ruma ankanpoikanen',
    teksti: 'Kyhmyjoutsen on Tanskan kansallislintu, eikä sattumalta: H. C. Andersenin satu rumasta ankanpoikasesta päättyy juuri joutsenen untuvaharmaisiin poikasiin. Poikue seuraa emojaan kaislikossa koko kesän, ja harmaista tulee lopulta lumivalkoisia.',
    lahde: 'en-Wikipedia "Mute swan" ja en-Wikipedia "The Ugly Duckling". '
      + 'Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-dnk.jpg',
    lon: 9.5,
    lat: 56.2,
  },
  GBR: {
    elain: 'kettu',
    otsikko: 'Lontoon yökulkija',
    teksti: 'Kettu muutti Britannian kaupunkeihin 1930-luvulla ja Lontooseen 1940-luvulla, eikä ole lähtenyt. Kaupunkikettuja arvioitiin olevan koko maassa 33 000 vuonna 1995 ja 150 000 vuonna 2017. Reilu kolmannes niiden ravinnosta on ihmisen jättämää — maaseudun ketulla osuus on kuusi prosenttia — ja siksi kaupunkilainen kasvaa isommaksi kuin sukulaisensa pelloilla.',
    lahde: 'en-Wikipedia "Red fox", osio "Urban red foxes". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-gbr.jpg',
    lon: -1.5,
    lat: 52.6,
  },
  IRL: {
    elain: 'rusakko',
    otsikko: 'Niittyjen nyrkkeilijä',
    teksti: 'Keväisin Irlannin niityillä näkee jänisten "nyrkkeilyottelun": takajaloilleen nousseet jänikset huitovat toisiaan etukäpälillä. Kyse ei ole urosten kaksintaistelusta, kuten pitkään luultiin — useimmiten naaras torjuu liian innokasta kosijaa.',
    lahde: 'en-Wikipedia "European hare". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-irl.jpg',
    lon: -7.6,
    lat: 53.3,
  },
  NLD: {
    elain: 'hyljekuutti',
    otsikko: 'Vattimeren löytölapsi',
    teksti: 'Vattimeren hiekkasärkillä lepäilee tuhansia hylkeitä, ja myrskyn jälkeen rannalta löytyy joskus emostaan eksynyt kuutti. Hollannissa niitä varten on oma pelastuskeskus, joka hoitaa löytölapset kuntoon ja saattelee takaisin mereen.',
    lahde: 'en-Wikipedia "Harbor seal" ja nl-Wikipedia "Zeehondencentrum '
      + 'Pieterburen". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-nld.jpg',
    lon: 5.8,
    lat: 53.1,
  },
  DEU: {
    elain: 'siili',
    otsikko: 'Puutarhan yövahti',
    teksti: 'Siilin maine etanansyöjänä on liioiteltu: pääruokaa ovat kastemadot, kovakuoriaiset ja toukat, ja etanoita on ravinnosta vain muutama prosentti. Talvella siili nukkuu viisi kuukautta risu- tai lehtikasassa, sydän lyöden viisi kertaa minuutissa. Siksi siivoamaton lehtikasa on oikeasti majoitusta — ja siksi etanamyrkky tappaa siilejä saaliin mukana.',
    lahde: 'de-Wikipedia "Braunbrustigel", osiot "Nahrung" ja "Winterschlaf", '
      + 'ja en-Wikipedia "European hedgehog". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-deu.jpg',
    lon: 9.5,
    lat: 51,
  },
  FRA: {
    elain: 'camarguenvarsa',
    otsikko: 'Valkoinen hevonen syntyy tummana',
    teksti: 'Camarguen suistomaalla laiduntaa puolivillejä valkoisia hevosia, jotka kahlaavat suolamarskeilla kuin olisivat aina kuuluneet mereen. Salaisuus paljastuu varsasta: se syntyy lähes mustana ja vaalenee valkoiseksi vasta vuosien mittaan.',
    lahde: 'en-Wikipedia "Camargue horse". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-fra.jpg',
    lon: 3.9,
    lat: 43.6,
  },
  ESP: {
    elain: 'iberianilves',
    otsikko: 'Takaisin partaalta',
    teksti: 'Iberianilves oli vuosituhannen vaihteessa sukupuuton partaalla: vuonna 2002 laskettiin 94 yksilöä kahdessa erillisessä Andalusian kannassa. Syy ei ollut vain metsästys, vaan kanien joukkokuolemat — kani on kolme neljäsosaa ilveksen ravinnosta. Tarhakasvatus, kanikantojen elvytys ja istutukset käänsivät suunnan, ja 2024 töyhtökorvia laskettiin 2 401.',
    lahde: 'en-Wikipedia "Iberian lynx", osiot "Distribution and habitat" ja '
      + '"Conservation". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-esp.jpg',
    lon: -4.5,
    lat: 38.3,
  },
  PRT: {
    elain: 'vesikoiranpentu',
    otsikko: 'Kalastajan airut',
    teksti: 'Portugalinvesikoira palveli vuosisatoja kalastusveneissä: se ajoi kaloja verkkoihin, sukelsi irronneiden pyydysten perään ja ui viestejä veneestä toiseen. Räpyläkäpälät ja kihara turkki tekevät siitä uimarin, joka ei merta säiky.',
    lahde: 'en-Wikipedia "Portuguese Water Dog". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-prt.jpg',
    lon: -8,
    lat: 37.3,
  },
  ITA: {
    elain: 'sudenpennut',
    otsikko: 'Rooman perustajan heimo',
    teksti: 'Tarun mukaan naarassusi imetti Rooman perustajat Romuluksen ja Remuksen, ja susi on yhä Italian tunnuseläin. Apenniinien susi ehti lähes kadota, mutta rauhoitus pelasti sen — nyt vuoristossa kasvaa taas tuhansittain susia, pennut luolissaan kesän korvalla.',
    lahde: 'en-Wikipedia "Italian wolf". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-ita.jpg',
    lon: 13.8,
    lat: 42.1,
  },
  CHE: {
    elain: 'bernhardilainen',
    otsikko: 'Barryn perilliset',
    teksti: 'Suuren Pyhän Bernhardin solan munkit pitivät koiria, jotka etsivät lumeen eksyneitä kulkijoita. Kuuluisin niistä, Barry, pelasti kymmeniä ihmishenkiä 1800-luvun alussa. Kaulatynnyri on tarua, mutta pelastukset eivät — bernhardilainen on Sveitsin kansalliskoira.',
    lahde: 'en-Wikipedia "St. Bernard (dog)" ja en-Wikipedia "Barry (dog)". '
      + 'Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-che.jpg',
    lon: 7.4,
    lat: 46.2,
  },
  AUT: {
    elain: 'murmeli',
    otsikko: 'Alppien vihellys',
    teksti: 'Kun alppimurmeli viheltää, koko rinne painuu koloihinsa — se on vuoriston ilmahälytys. Talven murmeli nukkuu perhekunnittain kolossaan yli puoli vuotta, sydän lyöden vain muutaman kerran minuutissa.',
    lahde: 'en-Wikipedia "Alpine marmot". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-aut.jpg',
    lon: 12.8,
    lat: 47.2,
  },
  CZE: {
    elain: 'siiseli',
    otsikko: 'Nurmikentän tähystäjä',
    teksti: 'Euroopansiiseli tarvitsee lyhyttä ruohoa nähdäkseen ympärilleen, ja siksi sen viimeisiä turvapaikkoja ovat laitumet, urheilukentät, puistot ja ratapenkereet — paikat, joissa nurmi pysyy matalana. Siirtokunta pitää vahteja, jotka viheltävät pedon nähdessään, ja koko rinne katoaa koloihinsa yhdessä hetkessä.',
    lahde: 'en-Wikipedia "European ground squirrel", osiot "Description" ja '
      + '"Habitat". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-cze.jpg',
    lon: 15.5,
    lat: 49.6,
  },
  POL: {
    elain: 'visentinvasa',
    otsikko: 'Metsän palannut jättiläinen',
    teksti: 'Euroopan visentti ehti kadota luonnosta kokonaan — viimeinen villi kaadettiin 1900-luvun alkupuolella. Laji pelastettiin eläintarhojen muutamasta yksilöstä, ja Białowieżan aarniometsässä syntyy taas vasoja villiin laumaan. Visentti on Euroopan suurin maaeläin.',
    lahde: 'en-Wikipedia "European bison". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-pol.jpg',
    lon: 23.8,
    lat: 52.7,
  },
  EST: {
    elain: 'ilves',
    otsikko: 'Euroopan tihein ilveskanta',
    teksti: 'Virossa ilveksiä elää tiheämmässä kuin missään muualla Euroopassa — vuosituhannen vaihteen arvio oli noin 900 yksilöä. Tiheys ei silti tarkoita rauhaa: ilveksen metsästys on Virossa laillista, ja pelkästään vuonna 2010 kaadettiin 180 ilvestä. Näkee sen silti harva, sillä töyhtökorva kulkee öisin ja katoaa metsään kuin savu.',
    lahde: 'en-Wikipedia "Eurasian lynx", osio "Distribution and habitat" '
      + '(Viron tiheys ja saalismäärä). Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-est.jpg',
    lon: 25.8,
    lat: 58.6,
  },
  LVA: {
    elain: 'majava',
    otsikko: 'Patomestari',
    teksti: 'Isoisäsi aikaan Latvian majavat oli juuri metsästetty sukupuuttoon — turkin, rasvan ja hajurauhasten takia. Palautus alkoi 1927, kun Norjasta tuotiin kaksi majavaparia Irbe-joen sivuhaaraan; myöhemmin tuli lisää Voronežista, Valko-Venäjältä ja Liettuasta. Nyt maassa on yli 80 000 majavaa, ja jokainen pato on tuotujen jälkeläisten työtä.',
    lahde: 'lv-Wikipedia "Eirāzijas bebrs", osio "Latvijā", ja en-Wikipedia '
      + '"Eurasian beaver". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-lva.jpg',
    lon: 25.5,
    lat: 56.8,
  },
  LTU: {
    elain: 'haikaranpesä',
    otsikko: 'Onnen pylväs',
    teksti: 'Valkohaikara on Liettuan kansallislintu, ja haikaroita pesii Liettuassa tiheämmässä kuin missään muualla Euroopassa. Pesä pihapylvään päässä tuo talolle onnea, ja keväinen paluupäivä on vanhastaan juhla, jolloin haikaran nähdään tuovan kesän.',
    lahde: 'en-Wikipedia "White stork". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-ltu.jpg',
    lon: 23.8,
    lat: 55.3,
  },
  UKR: {
    elain: 'hamsteri',
    otsikko: 'Aron viljavarasto',
    teksti: 'Euroopanhamsteri, mustavatsainen aron asukas, kantaa poskipusseissaan viljaa talvivarastoonsa — parhaimmillaan koloon kertyy monta kiloa. Villinä se on käynyt harvinaiseksi koko Euroopassa, ja Ukrainan arot ovat sen viimeisiä vahvoja kotiseutuja.',
    lahde: 'en-Wikipedia "European hamster". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-ukr.jpg',
    lon: 34.5,
    lat: 48.5,
  },
  BGR: {
    elain: 'pelastuskarhu',
    otsikko: 'Tanssin loppu',
    teksti: 'Tanssikarhujen pito kiellettiin Bulgariassa 1998, mutta laki puri hitaasti: maan kolme viimeistä tanssikarhua saatiin pois vasta 2007 ja Serbian viimeiset 2009. Ne vietiin Belitsan tarhaan Rilan rinteille, jossa entiset tanssijat opettelevat uudelleen talviunen ja uimisen. Vuonna 2022 tarhan nimestä poistettiin sana tanssikarhu — pelastettavia ei enää ollut.',
    lahde: 'en-Wikipedia "Dancing bear" ja en-Wikipedia "Bear Sanctuary '
      + 'Belitsa". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-bgr.jpg',
    lon: 23.6,
    lat: 41.6,
  },
  ROU: {
    elain: 'karhunpennut',
    otsikko: 'Karpaattien valtakunta',
    teksti: 'Romanian Karpaateilla elää yli 6 000 ruskeakarhua — yksi Euroopan suurimmista kannoista. Pennut syntyvät sydäntalvella pesään, nyrkin kokoisina ja sokeina, ja keväällä emo tuo ne ulos. Runsaus on myös riita: karhut tulevat yhä useammin kylien liepeille, ja kun hallitus esitti 2018 noin 2 000 karhun kaatoa, suojelujärjestöt nousivat vastaan.',
    lahde: 'en-Wikipedia "Wildlife of Romania", osio "Mammals", ja en-Wikipedia '
      + '"Brown bear". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-rou.jpg',
    /*
     * BĂILE TUȘNAD, ITÄ-KARPAATIT (3.9.2026). Piste oli Zărneștin
     * karhutarhalla (25, 45.6), jossa on jo syvennystarina
     * Karhusanktuaari, ja samalla rivillä Negoiu, Transfăgărășan,
     * Moldoveanu, Bran ja Peleș — seitsemän merkkiä 36 lautayksikössä,
     * eikä yksikään ladonta saa niiden nimiä erilleen
     * (tools/tarkista-nimiolimitys.mjs). Kylpyläkaupunki Harghitan
     * vuorten juurella on Romanian tunnetuin karhukaupunki: karhut
     * kävelevät kaduilla (en-Wikipedia "Băile Tușnad").
     */
    lon: 25.86,
    lat: 46.14,
  },
  HUN: {
    elain: 'mangalitsa',
    otsikko: 'Sika lampaan vaatteissa',
    teksti: 'Mangalitsa on unkarilainen sika, joka kasvattaa kiharan villaturkin kuin lammas. Rasvasika oli seudun yleisin rotu vielä 1940-luvulla, mutta kylmäketju ja kaukaa tuotu halpa liha veivät siltä markkinat: vuonna 1991 Unkarissa oli enää alle 200 mangalitsaa. Rodun pelasti espanjalainen kinkkuyhtiö, ja nyt emakoita on runsaat 7 000.',
    lahde: 'en-Wikipedia "Mangalica", osio "History". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-hun.jpg',
    lon: 21.1,
    lat: 47.55,
  },
  HRV: {
    elain: 'dalmatianpentu',
    otsikko: 'Täplät tulevat perässä',
    teksti: 'Dalmatiankoira on saanut nimensä Dalmatian rannikolta, ja sen kuuluisin salaisuus paljastuu pennuista: ne syntyvät kokonaan valkoisina. Täplät ilmestyvät vasta viikkojen mittaan, eikä kahta samanlaista täpläkuviota ole olemassa.',
    lahde: 'en-Wikipedia "Dalmatian (dog)". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-hrv.jpg',
    lon: 15.9,
    lat: 44.3,
  },
  BIH: {
    elain: 'tornjak',
    otsikko: 'Vuoren vartija',
    teksti: 'Tornjak eli bosnia-hertsegovinalainen paimenkoira on saanut nimensä sanasta tor, lammastarha, ja Dinaaristen vuorten paimenet ovat pitäneet sitä laumojensa luona vuosisatoja — vanhin kirjallinen maininta on 1000-luvulta. Se ei aja lampaita vaan vartioi niitä: paimenten sanonnan mukaan yksi tornjak vastaa kahta sutta ja kaksi ajaa karhunkin tiehensä. Tyyni ja näennäisen välinpitämätön koira muuttuu tarvittaessa valppaaksi vartijaksi, ja paksun turkkinsa turvin se makaa ulkona lumisenakin yönä. Paimentolaisuuden loputtua rotu harvinaistui niin pahoin, että 1970-luvun alussa kynologit etsivät vuorilta vanhoja kuvauksia vastaavat koirat ja rakensivat rodun uudelleen niiden varaan; puhdas jalostus alkoi 1978. Pennun yhdeksän ensimmäistä kuukautta ratkaisevat, sillä silloin opittu kantaa läpi koiran elämän.',
    lahde: 'en-Wikipedia "Tornjak", osiot "History", "Name", "Characteristics", '
      + '"Activities" ja "Care". Tarkistettu 2.9.2026.',
    kuva: 'assets/elaimet/elain-bih.jpg',
    /*
     * KUVAPUTKEN KUVATEKSTI (toimitus 4.9.2026 12:05 UTC) sanasta
     * sanaan. Eläintäyn kortti latoo kuvan selitteen itse ("Tornjak,
     * Bosnia ja Hertsegovina", js/elaintaky.js elaintakyPiirraKuva),
     * eikä täyllä ole selitekenttää — teksti säilytetään siksi tässä
     * sellaisenaan, jotta se on tallessa, jos kenttä joskus tulee:
     *
     *   "Nuori tornjak harjoittelee tehtävää, jossa sen suvun koirat
     *   ovat vartioineet Balkanin karjaa vuosisatoja. Tänään suurin
     *   saavutus on kuitenkin paimenen kadonnut sininen kinnas, jonka
     *   pentu palauttaa liian ylpeänä luovuttaakseen sen heti."
     *
     * Lähde on kuvan oma eikä kortin tekstin (`lahde` yllä on
     * en-Wikipedia): kuvan lähderivi ladotaan kentästä `kuvaLahde`.
     * Lajifaktojen lähde kokonaisuudessaan:
     * https://www.fci.be/nomenclature/Standards/355g02-en.pdf
     */
    kuvaLahde: 'Kuvaputken generoitu valokuva. Lajifaktat: FCI Standard No. 355 '
      + '— Tornjak.',
    /*
     * Piste on keskisen Bosnian vuorilaitumilla Vlašićin länsipuolella
     * eikä Vlašićin huipulla: huipun kohdalta (lon 17,65) Sarajevoon
     * jäisi 34,6 laudan yksikköä, kun kaupunkimerkiltä vaaditaan 35
     * (tests/elaintakyt.test.mjs). Sama vuoristo, sama laidun, pari
     * kymmentä kilometriä lännemmäs.
     */
    lon: 17.4,
    lat: 44.32,
  },
  GRC: {
    elain: 'kilpikonnanpoikaset',
    /*
     * Karttanimi (js/elaintaky.js elaintakyNimio): "kilpikonnanpoikaset"
     * on 19 merkkiä eikä mahdu nimiöön (js/fokusnosto-symbolit.js
     * NOSTOSYM_NIMIO_MERKKEJA = 18), ja atlaslyhennys jättäisi kartalle
     * "Kilpikonnanpoikas." — sama sopimus kuin kohteiden
     * `nimio`-kentällä (js/fokuskohteet.js kohteenKarttanimi). Nimi on
     * tekstin oma: poikaset ovat merikilpikonnan poikasia.
     */
    nimio: 'merikilpikonna',
    otsikko: 'Yön juoksijat',
    teksti: 'Zakynthosin Laganasinlahti on Välimeren tärkein merikilpikonnan pesimäranta ja Kreikan ensimmäinen merellinen kansallispuisto. Poikaset kuoriutuvat noin 80 vuorokauden kuluttua ja kaivautuvat esiin pimeällä: ne suunnistavat kohti kirkkainta taivaanrantaa, kuun ja tähtien kimmellystä vedessä. Rantojen valot vievät ne väärään suuntaan — siksi valot sammutetaan pesimäkaudella. Naaraat palaavat munimaan sille rannalle, jolla itse kuoriutuivat.',
    lahde: 'en-Wikipedia "Loggerhead sea turtle", osiot "Reproduction" ja '
      + '"Artificial lighting", ja en-Wikipedia "Zakynthos". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-grc.jpg',
    lon: 21.9,
    lat: 37.4,
  },
  TUR: {
    elain: 'angoravuohi',
    otsikko: 'Silkkiä ylängöltä',
    teksti: 'Angoravuohi on saanut nimensä Ankarasta, joka tunnettiin ennen Angorana, ja sen kiiltävää kiharaa kuitua kutsutaan mohairiksi. Ranskalainen Pierre Belon näki vuonna 1555 Anatoliassa vuohia, joiden villa oli hänestä "niin hienoa, että sen sanoisi silkkiä hienommaksi". Mohairia tuotettiin pelkästään Turkissa 1800-luvun puoliväliin asti; rotu vietiin Etelä-Afrikkaan 1838 ja Yhdysvaltoihin 1849, ja nyt kumpikin tuottaa mohairia enemmän kuin kotimaa — amerikkalainen kuitu tulee lähes kokonaan Texasista. Turkissa vuohet keritään kerran vuodessa eikä kahdesti niin kuin muualla, ja siksi maailman pisin mohair kasvaa yhä täällä. Kilin ensimmäinen villa on hienointa, sillä kuitu paksunee vuosi vuodelta.',
    lahde: 'en-Wikipedia "Angora goat", osio "History", en-Wikipedia "Mohair", '
      + 'osiot "Production" ja "History", ja en-Wikipedia "Ankara". '
      + 'Tarkistettu 2.9.2026.',
    kuva: 'assets/elaimet/elain-tur.jpg',
    /*
     * Piste on Ankaran kaakkoispuolella Anatolian aroylängöllä, ei
     * kaupungin kyljessä: lon 33,3 / lat 39,6 jäisi 19,8 yksikön
     * päähän Ankaran merkistä (vaaditaan 35), tämä on 47,7 päässä.
     */
    lon: 33.9,
    lat: 39.1,
  },
  RUS: {
    elain: 'eremitaasinkissa',
    otsikko: 'Museon henkivartija',
    teksti: 'Talvipalatsin kellareissa on pidetty kissoja siitä asti, kun keisarinna Elisabet määräsi ne hiiriä vastaan vuonna 1745 — Kazan lähetti viisi parasta pyytäjäänsä. Isoisäsi aikaan ne elivät hemmoteltuina omine palvelijoineen. Nyt Eremitaasin kissoilla on kolme hoitajaa, omat keittiöt, pieni sairastupa ja museon oma lehdistösihteeri.',
    lahde: 'en-Wikipedia "Hermitage cats", osio "History". Tarkistettu 1.9.2026.',
    kuva: 'assets/elaimet/elain-rus.jpg',
    lon: 32,
    lat: 58.8,
  },
};

/** Maatunnukset siinä järjestyksessä kuin ne on kirjoitettu. */
export const ELAINTAKY_MAAT = Object.keys(ELAINTAKYT);
