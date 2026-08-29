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
 * Sama eläin näkyy kahdella laudalla: pelin maailmankartalla ja
 * katselutilan Euroopan laudalla (?lauta=europe). Laudoilla on eri
 * projektio ja eri koordinaatisto, joten paikka annetaan asteina ja
 * käännetään laudan omalla kaavalla (js/fokusmitat.js
 * projisoiLaudalle). Piste, joka jää laudan ulkopuolelle — Vanjärvi on
 * Euroopan laudan itäreunan takana — jää yksinkertaisesti piirtämättä
 * sillä laudalla.
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
    kuva: 'assets/elaimet/elain-fin.jpg',
    lon: 28.4,
    lat: 61.4,
  },
  SWE: {
    elain: 'hirvenvasa',
    otsikko: 'Metsän kuninkaan perillinen',
    teksti: 'Hirvenvasa syntyy alkukesästä ja seuraa emoaan ensimmäisen vuotensa. Ruotsissa hirviä elää niin tiheässä, että niiden kevätvaellusta seurataan televisiosta suorana lähetyksenä viikkojen ajan — hitain ja rauhallisin suosikkiohjelma koko maassa.',
    kuva: 'assets/elaimet/elain-swe.jpg',
    lon: 15,
    lat: 60.5,
  },
  NOR: {
    elain: 'myskihärkä',
    otsikko: 'Jääkauden muisto Dovrefjellillä',
    teksti: 'Myskihärkä laidunsi aikoinaan mammuttien rinnalla. Norjan tuntureille se palautettiin Grönlannista, ja nyt Dovrefjellin ylängöllä vaeltaa villakuontaloinen lauma kuin suoraan jääkaudelta. Pakkasessa sen alusvilla lämmittää moninkertaisesti lampaanvillaan verrattuna.',
    kuva: 'assets/elaimet/elain-nor.jpg',
    lon: 9.4,
    lat: 62.3,
  },
  ISL: {
    elain: 'lunni',
    otsikko: 'Poikasten pelastajat',
    teksti: 'Islannissa pesii valtaosa koko Atlantin lunneista. Vestmannasaarilla on tapana, että kun poikaset eksyvät syksyllä kaupungin valoihin, lapset keräävät ne pahvilaatikoihin ja kantavat rantaan — aamulla poikaset heitetään kaaressa merituuleen, ja matka alkaa.',
    kuva: 'assets/elaimet/elain-isl.jpg',
    lon: -19.4,
    lat: 64.6,
  },
  DNK: {
    elain: 'joutsenpoikue',
    otsikko: 'Ruma ankanpoikanen',
    teksti: 'Kyhmyjoutsen on Tanskan kansallislintu, eikä sattumalta: H. C. Andersenin satu rumasta ankanpoikasesta päättyy juuri joutsenen untuvaharmaisiin poikasiin. Poikue seuraa emojaan kaislikossa koko kesän, ja harmaista tulee lopulta lumivalkoisia.',
    kuva: 'assets/elaimet/elain-dnk.jpg',
    lon: 9.5,
    lat: 56.2,
  },
  GBR: {
    elain: 'kettu',
    otsikko: 'Lontoon yökulkija',
    teksti: 'Kaupunkikettu on Lontoossa yhtä lontoolainen kuin kaksikerroksinen bussi. Tuhannet ketut partioivat öisin puistoissa ja takapihoilla, ja moni niistä tuntee oman korttelinsa roskapäivät paremmin kuin asukkaat itse.',
    kuva: 'assets/elaimet/elain-gbr.jpg',
    lon: -1.5,
    lat: 52.6,
  },
  IRL: {
    elain: 'rusakko',
    otsikko: 'Niittyjen nyrkkeilijä',
    teksti: 'Keväisin Irlannin niityillä näkee jänisten "nyrkkeilyottelun": takajaloilleen nousseet jänikset huitovat toisiaan etukäpälillä. Kyse ei ole urosten kaksintaistelusta, kuten pitkään luultiin — useimmiten naaras torjuu liian innokasta kosijaa.',
    kuva: 'assets/elaimet/elain-irl.jpg',
    lon: -7.6,
    lat: 53.3,
  },
  NLD: {
    elain: 'hyljekuutti',
    otsikko: 'Vattimeren löytölapsi',
    teksti: 'Vattimeren hiekkasärkillä lepäilee tuhansia hylkeitä, ja myrskyn jälkeen rannalta löytyy joskus emostaan eksynyt kuutti. Hollannissa niitä varten on oma pelastuskeskus, joka hoitaa löytölapset kuntoon ja saattelee takaisin mereen.',
    kuva: 'assets/elaimet/elain-nld.jpg',
    lon: 5.8,
    lat: 53.1,
  },
  DEU: {
    elain: 'siili',
    otsikko: 'Puutarhan yövahti',
    teksti: 'Siili on saksalaisen puutarhan kunniavieras: se ahmii etanoita iltahämärissä ja käpertyy talveksi lehtikasaan. Siksi moni jättää syksyllä nurkkaan siivoamattoman lehtikasan — se ei ole laiskuutta vaan majoitustoimintaa.',
    kuva: 'assets/elaimet/elain-deu.jpg',
    lon: 9.5,
    lat: 51,
  },
  FRA: {
    elain: 'camarguenvarsa',
    otsikko: 'Valkoinen hevonen syntyy tummana',
    teksti: 'Camarguen suistomaalla laiduntaa puolivillejä valkoisia hevosia, jotka kahlaavat suolamarskeilla kuin olisivat aina kuuluneet mereen. Salaisuus paljastuu varsasta: se syntyy lähes mustana ja vaalenee valkoiseksi vasta vuosien mittaan.',
    kuva: 'assets/elaimet/elain-fra.jpg',
    lon: 3.9,
    lat: 43.6,
  },
  ESP: {
    elain: 'iberianilves',
    otsikko: 'Takaisin partaalta',
    teksti: 'Iberianilves oli vuosituhannen alussa maailman uhanalaisin kissaeläin — jäljellä oli alle sata yksilöä. Suojelutyö käänsi suunnan, ja nyt töyhtökorvia liikkuu Espanjan mäkimailla taas tuhatmäärin. Se on lajinsuojelun kuuluisimpia onnistumisia.',
    kuva: 'assets/elaimet/elain-esp.jpg',
    lon: -4.5,
    lat: 38.3,
  },
  PRT: {
    elain: 'vesikoiranpentu',
    otsikko: 'Kalastajan airut',
    teksti: 'Portugalinvesikoira palveli vuosisatoja kalastusveneissä: se ajoi kaloja verkkoihin, sukelsi irronneiden pyydysten perään ja ui viestejä veneestä toiseen. Räpyläkäpälät ja kihara turkki tekevät siitä uimarin, joka ei merta säiky.',
    kuva: 'assets/elaimet/elain-prt.jpg',
    lon: -8,
    lat: 37.3,
  },
  ITA: {
    elain: 'sudenpennut',
    otsikko: 'Rooman perustajan heimo',
    teksti: 'Tarun mukaan naarassusi imetti Rooman perustajat Romuluksen ja Remuksen, ja susi on yhä Italian tunnuseläin. Apenniinien susi ehti lähes kadota, mutta rauhoitus pelasti sen — nyt vuoristossa kasvaa taas tuhansittain susia, pennut luolissaan kesän korvalla.',
    kuva: 'assets/elaimet/elain-ita.jpg',
    lon: 13.8,
    lat: 42.1,
  },
  CHE: {
    elain: 'bernhardilainen',
    otsikko: 'Barryn perilliset',
    teksti: 'Suuren Pyhän Bernhardin solan munkit pitivät koiria, jotka etsivät lumeen eksyneitä kulkijoita. Kuuluisin niistä, Barry, pelasti kymmeniä ihmishenkiä 1800-luvun alussa. Kaulatynnyri on tarua, mutta pelastukset eivät — bernhardilainen on Sveitsin kansalliskoira.',
    kuva: 'assets/elaimet/elain-che.jpg',
    lon: 7.4,
    lat: 46.2,
  },
  AUT: {
    elain: 'murmeli',
    otsikko: 'Alppien vihellys',
    teksti: 'Kun alppimurmeli viheltää, koko rinne painuu koloihinsa — se on vuoriston ilmahälytys. Talven murmeli nukkuu perhekunnittain kolossaan yli puoli vuotta, sydän lyöden vain muutaman kerran minuutissa.',
    kuva: 'assets/elaimet/elain-aut.jpg',
    lon: 12.8,
    lat: 47.2,
  },
  CZE: {
    elain: 'siiseli',
    otsikko: 'Nurmikentän tähystäjä',
    teksti: 'Euroopansiiseli tarvitsee lyhyttä ruohoa nähdäkseen ympärilleen, ja siksi sen viimeisiä turvapaikkoja ovat lentokentät ja golfkentät — harvoja paikkoja, joissa nurmi pidetään aina matalana. Tähystävä siiseli seisoo tikkusuorana kuin pieni vahtisotilas.',
    kuva: 'assets/elaimet/elain-cze.jpg',
    lon: 15.5,
    lat: 49.6,
  },
  POL: {
    elain: 'visentinvasa',
    otsikko: 'Metsän palannut jättiläinen',
    teksti: 'Euroopan visentti ehti kadota luonnosta kokonaan — viimeinen villi kaadettiin 1900-luvun alkupuolella. Laji pelastettiin eläintarhojen muutamasta yksilöstä, ja Białowieżan aarniometsässä syntyy taas vasoja villiin laumaan. Visentti on Euroopan suurin maaeläin.',
    kuva: 'assets/elaimet/elain-pol.jpg',
    lon: 23.8,
    lat: 52.7,
  },
  EST: {
    elain: 'ilves',
    otsikko: 'Viron kansalliseläin',
    teksti: 'Virossa ilveksiä elää metsien kokoon nähden tiheämmässä kuin juuri missään muualla Euroopassa, ja ilves on maan kansalliseläin. Silti sen näkee harva: töyhtökorva kulkee öisin ja katoaa metsään kuin savu.',
    kuva: 'assets/elaimet/elain-est.jpg',
    lon: 25.8,
    lat: 58.6,
  },
  LVA: {
    elain: 'majava',
    otsikko: 'Patomestari',
    teksti: 'Latvian joet ovat Euroopan majavatiheintä seutua. Majava kaataa puun siisteinä lastuina ja rakentaa padon, joka voi kasvaa kymmenien metrien mittaiseksi — ja sen lammikko antaa kodin sammakoille, linnuille ja kaloille. Yksi rakentaja, kokonainen kaupunginosa.',
    kuva: 'assets/elaimet/elain-lva.jpg',
    lon: 25.5,
    lat: 56.8,
  },
  LTU: {
    elain: 'haikaranpesä',
    otsikko: 'Onnen pylväs',
    teksti: 'Valkohaikara on Liettuan kansallislintu, ja haikaroita pesii Liettuassa tiheämmässä kuin missään muualla Euroopassa. Pesä pihapylvään päässä tuo talolle onnea, ja keväinen paluupäivä on vanhastaan juhla, jolloin haikaran nähdään tuovan kesän.',
    kuva: 'assets/elaimet/elain-ltu.jpg',
    lon: 23.8,
    lat: 55.3,
  },
  UKR: {
    elain: 'hamsteri',
    otsikko: 'Aron viljavarasto',
    teksti: 'Euroopanhamsteri, mustavatsainen aron asukas, kantaa poskipusseissaan viljaa talvivarastoonsa — parhaimmillaan koloon kertyy monta kiloa. Villinä se on käynyt harvinaiseksi koko Euroopassa, ja Ukrainan arot ovat sen viimeisiä vahvoja kotiseutuja.',
    kuva: 'assets/elaimet/elain-ukr.jpg',
    lon: 34.5,
    lat: 48.5,
  },
  BGR: {
    elain: 'pelastuskarhu',
    otsikko: 'Tanssin loppu',
    teksti: 'Bulgarian Belitsassa on karhutarha, jonne viimeiset tanssikarhut tuotiin vapauteen — vuosisatainen tapa päättyi, kun karhut ostettiin omistajiltaan ja tanssitus kiellettiin. Tarhassa entiset tanssijat oppivat uudelleen karhun elämän: talviunen, uimisen ja hunajan kaivamisen.',
    kuva: 'assets/elaimet/elain-bgr.jpg',
    lon: 23.6,
    lat: 41.6,
  },
  ROU: {
    elain: 'karhunpennut',
    otsikko: 'Karpaattien valtakunta',
    teksti: 'Romanian Karpaateilla elää Euroopan suurin ruskeakarhukanta — tuhansia karhuja pyökkimetsissä ja kuusivyöhykkeellä. Pennut syntyvät sydäntalvella pesään, nyrkin kokoisina ja sokeina, ja keväällä emo tuo ne ulos maailmaan, joka kuuluu yhä karhuille.',
    kuva: 'assets/elaimet/elain-rou.jpg',
    lon: 25,
    lat: 45.6,
  },
  HUN: {
    elain: 'mangalitsa',
    otsikko: 'Sika lampaan vaatteissa',
    teksti: 'Mangalitsa on unkarilainen sika, joka kasvattaa kiharan villaturkin kuin lammas. Rotu ehti 1990-luvulla lähes kadota, kunnes herkkusuiden into pelasti sen — nyt villasikoja tepastelee taas tuhansissa pihatoissa pustan laidalla.',
    kuva: 'assets/elaimet/elain-hun.jpg',
    lon: 21.1,
    lat: 47.55,
  },
  HRV: {
    elain: 'dalmatianpentu',
    otsikko: 'Täplät tulevat perässä',
    teksti: 'Dalmatiankoira on saanut nimensä Dalmatian rannikolta, ja sen kuuluisin salaisuus paljastuu pennuista: ne syntyvät kokonaan valkoisina. Täplät ilmestyvät vasta viikkojen mittaan, eikä kahta samanlaista täpläkuviota ole olemassa.',
    kuva: 'assets/elaimet/elain-hrv.jpg',
    lon: 15.9,
    lat: 44.3,
  },
  BIH: {
    elain: 'villihevosvarsa',
    otsikko: 'Vuoriston vapaat',
    teksti: 'Livnon ylängöllä Bosniassa laiduntaa satoja villihevosia — työhevosten jälkeläisiä, jotka päästettiin vapaiksi koneiden tultua tiloille. Vuosikymmenten mittaan niistä kasvoi aidosti villi kanta, ja varsat syntyvät nyt vapauteen, jota niiden esivanhemmat eivät tunteneet.',
    kuva: 'assets/elaimet/elain-bih.jpg',
    lon: 17.05,
    lat: 43.83,
  },
  GRC: {
    elain: 'kilpikonnanpoikaset',
    otsikko: 'Yön juoksijat',
    teksti: 'Zakynthosin hiekkarannoilla kuoriutuu loppukesän öinä merikilpikonnan poikasia. Ne kaivautuvat esiin pimeällä ja juoksevat kohti merta veden välkettä seuraten — siksi rantojen valot sammutetaan pesimäkaudella. Vain harva sadasta selviää aikuiseksi, ja selviytyjät palaavat munimaan samalle rannalle.',
    kuva: 'assets/elaimet/elain-grc.jpg',
    lon: 21.9,
    lat: 37.4,
  },
  TUR: {
    elain: 'vankissa',
    otsikko: 'Järven uimari',
    teksti: 'Vanin kissa on Vanjärven seudun oma rotu: lumivalkoinen turkki ja usein kaksi eriväristä silmää, toinen meripihkaa ja toinen jäätä. Toisin kuin kissat yleensä, se menee veteen omasta tahdostaan — paikalliset kutsuvat sitä järven uimariksi.',
    kuva: 'assets/elaimet/elain-tur.jpg',
    lon: 43,
    lat: 38.5,
  },
  RUS: {
    elain: 'eremitaasinkissa',
    otsikko: 'Museon henkivartija',
    teksti: 'Eremitaasin kellareissa on asunut kissoja keisarinna Elisabetin ajoista asti — ne pestattiin suojelemaan palatsin aarteita rotilta, ja virka jatkuu yhä. Museon kymmenillä kissoilla on omat hoitajat, oma sairastupa ja arvonimi: taideaarteiden viralliset vartijat.',
    kuva: 'assets/elaimet/elain-rus.jpg',
    lon: 32,
    lat: 58.8,
  },
};

/** Maatunnukset siinä järjestyksessä kuin ne on kirjoitettu. */
export const ELAINTAKY_MAAT = Object.keys(ELAINTAKYT);
