/*
 * ELÄINTÄKYT — 53 maan eläin kartalla, kortti ja pieni punlöytö.
 *
 * Omistajan tilaus 29.8.2026: *"Eläintäky kartalle — eläin ilmestyy
 * maan kartalle täkynä: klikkaus avaa kuvan + lyhyen faktatekstin +
 * pienen puntapalkkion."*
 *
 * TÄMÄ EI OLE FOKUSVIRRAN TÄKY eikä täkynosto. Fokusvirran täyt
 * (js/fokusvirta.js, 50 puntaa) kuuluvat yhden kaupungin
 * annostelukulkuun ja täkynostot (js/fokusnosto.js) maan pooliin, jonka
 * pisteet nousevat aarteen jälkeen. Eläintäky on kevyempi ja koskee
 * MAATA eikä kaupunkia: 53 maasta useimmilla ei ole fokuskaupunkia
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
 * EUROOPAN ULKOPUOLINEN ERÄ 5.9.2026 (24 tietuetta NPL … ZAF): tulivat
 * kuvaputken 32 kuvan toimituksen mukana. Opus luonnosteli tekstit
 * lähteineen, ja Fable tarkisti ja kirjoitti lopulliset sanamuodot
 * samana iltana (kahdeksan varauksellisen väitteen pehmennys: CHN, USA,
 * MAR, PER, SAU, BRA, MEX) — tekstit ovat kaanonia kuten muutkin.
 * Kuvatekstit ja kuvien lähderivit ovat toimituksesta sanasta sanaan.
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
 * niitä ladata palvelutyöntekijän esilataukseen: kuvat paisuttaisivat
 * asennuksen, ja kortin kuva haetaan vasta kun kortti avataan.
 *
 * ── KAKSI KUVAA SAMASTA AIHEESTA (omistajan päätös 5.9.2026) ───────
 *
 * Raamatun osio "ELAINKUVIIN TARINAA, KAKSI KUVAA SAMASTA AIHEESTA",
 * omistajan päätös sanatarkasti: *"samasta eläinaiheesta voi olla
 * kaksi erilaista hyväksyttyä kuvaa, ja kortilla ne näytetään
 * KARUSELLINA (kuva vaihtuu pyyhkäisyllä kuten lehden alarivin
 * karuselli, pisteet kertovat määrän, kummallakin kuvalla oma
 * kuvateksti)"*.
 *
 * Tietue kantaa siksi joko YHDEN kuvan entisillä kentillä (`kuva`,
 * `kuvaLahde`) tai KUVALISTAN `kuvat`-kentässä. Molemmat luetaan
 * yhdestä funktiosta (elaintakynKuvat alempana), joten kortti,
 * savukkeet ja testit näkevät tietueen aina samassa muodossa eikä
 * yksikään vanha tietue muutu tavuakaan.
 *
 * KUVAPUTKEN TOIMITUSMUOTO ON KAKSI TUNNUSTA: <aihe>-a ja <aihe>-b
 * (tai muu yksilöllinen pääte). Tunnus ilman kauttaviivaa tarkoittaa
 * aina ämpäriä (js/media.js assetOsoite: `kohtaamiset/elaimet/<tunnus>
 * .jpg`), joten toinen kuva ei tarvitse repoon tiedostoa eikä riviä
 * mihinkään muualle kuin tähän tauluun. Kun kuvaputki on toimittanut
 * parin, tietue kirjoitetaan näin — ESIMERKKI, EI OIKEAA DATAA (kuvia
 * ei vielä ole):
 *
 *     FIN: {
 *       elain: 'saimaannorppa',
 *       otsikko: 'Järven oma hylje',
 *       teksti: '…',
 *       lahde: 'en-Wikipedia "Saimaa ringed seal". Tarkistettu 1.9.2026.',
 *       kuvat: [
 *         {
 *           tiedosto: 'elain-fin-a',
 *           kuvateksti: 'Norppa lepäilee kevätjäällä Saimaalla.',
 *           lahde: 'Matkakirjan havainnekuva',
 *         },
 *         {
 *           tiedosto: 'elain-fin-b',
 *           kuvateksti: 'Poikanen kolopesän suulla.',
 *           lahde: 'Matkakirjan havainnekuva',
 *         },
 *       ],
 *       lon: 28.4,
 *       lat: 61.4,
 *     },
 *
 * ENSIMMÄINEN ON ENSISIJAINEN: se on kortin avautuessa näkyvä kuva ja
 * se, jonka kuvateksti luetaan ensin. Kuvia on yksi tai kaksi
 * (tests/elaintakyt.test.mjs vartioi rajan) — kolmas ei ole kortin
 * mitta vaan galleria, ja se olisi eri päätös.
 *
 * KENTÄT: `tiedosto` on ämpäritunnus tai repon polku, `kuvateksti`
 * tämän kuvan oma selite (ilman sitä kortti latoo entisen
 * "Eläin, Maa" -selitteen), `lahde` KUVAN lähde — ei tietueen
 * `lahde`, joka on kortin TEKSTIN lähde — ja `url` valmis kuvaosoite
 * silloin, kun kuva ei tule pelin omasta kansiosta eikä ämpäristä.
 *
 * ── KUVAJONON TOIMITUS ON VALMIS OSOITE, EI ÄMPÄRITUNNUS ───────────
 *
 * Kuvaputken 5.9.2026 toimitus (posti/animals-approved-32-20260905)
 * asuu ämpärissä polussa `kohtaamiset/kuvajono/` eikä eläinkuvien
 * omassa kansiossa, joten pelkkä tunnus ei löytäisi sitä
 * (js/media.js assetOsoite kokoaa tunnuksesta osoitteen
 * `…/elaimet/<tunnus>.jpg`). Näiden kuvien osoite kirjoitetaan siksi
 * kokonaisena `url`-kenttään samasta juuresta kuin skandaalien
 * havainnekuvat (js/packs/skandaalit.js SKANDAALI_KUVAJUURI), eikä
 * repoon tule tavuakaan kuvadataa.
 *
 * KUVAN LÄHDEOSOITE ON `lahdeUrl`, koska `url` on tässä taulussa jo
 * varattu kuvan osoitteelle. Muissa tauluissa kuvaolion `osoite` on
 * kuva ja `url` sen lähde (js/packs/skandaalit.js, js/packs/
 * historian-hetket.js); nimet eivät saa vaihtaa merkitystä kesken
 * tiedoston, joten kuvaputken lähdeosoite saa oman kenttänsä. Kortti
 * ei vielä lado sitä linkiksi — kenttä on toimituksen tieto tallessa
 * siellä, missä kuvakin.
 */

/**
 * Kuvajonon ämpärijuuri: kuvaputken toimittamat eläinkuvat.
 *
 * Sama ämpäri kuin js/media.js:n peilillä ja js/kohtaamiskuvat-data.js:n
 * kohtaamiskuvilla — omistajan linjaus "kaikki aina ämpäriin eikä
 * repoon". Yhden tiedoston versio ketjuttaa moduulit samaan
 * näkyvyysalueeseen (tools/tarkista-niputus.mjs), joten nimi alkaa
 * ELAINTAKY-etuliitteellä.
 */
const ELAINTAKY_KUVAJUURI = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/kohtaamiset/kuvajono/';

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
    /*
     * TORNJAKINPENNUN v2 (kuvaputken toimitus 5.9.2026,
     * posti/animals-approved-32-20260905, tunnus
     * elain-bih-tornjakpentu-vlasic-v2). Uusinta korvaa 4.9. toimitetun
     * v1:n, joka vietiin aikanaan repoon (assets/elaimet/elain-bih.jpg)
     * — toimituksen `replacesImageIds` nimeää sen, joten tässä ei ole
     * kahta versiota samasta kuvasta vaan uusin.
     *
     * Kuvateksti ja lähderivi ovat toimituksesta SANASTA SANAAN
     * (omistajan sääntö). Kuvateksti oli 4.9. tallessa vain
     * kommenttina, koska täyllä ei silloin ollut selitekenttää; nyt
     * kortti latoo sen `kuvateksti`-kentästä (omistajan päätös
     * 5.9.2026, ks. lohko "KAKSI KUVAA SAMASTA AIHEESTA").
     */
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-bih-tornjakpentu-vlasic-v2.jpg`,
        kuvateksti: 'Nuori tornjak harjoittelee tehtävää, jossa sen suvun koirat '
          + 'ovat vartioineet Balkanin karjaa vuosisatoja. Tänään suurin saavutus '
          + 'on kuitenkin paimenen kadonnut sininen kinnas, jonka pentu palauttaa '
          + 'liian ylpeänä luovuttaakseen sen heti.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: '
          + 'FCI Standard No. 355 — Tornjak; Bosnia and Herzegovina Food Safety '
          + 'Agency — Vlašić pastures',
        lahdeUrl: 'https://www.fci.be/nomenclature/Standards/355g02-en.pdf',
      },
    ],
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
    /*
     * ANKARAVUOHEN KILI (kuvaputken toimitus 5.9.2026,
     * posti/animals-approved-32-20260905, tunnus
     * elain-tur-ankaravuohenkili-anatolia). Sama kuva kuin repossa
     * ollut assets/elaimet/elain-tur.jpg, mutta nyt toimitettuna ja
     * tarkistettuna ämpäristä omalla kuvatekstillään ja lähderivillään
     * — molemmat toimituksesta sanasta sanaan. Toimituksella ei ole
     * lähdeosoitetta (`url` on paketissa tyhjä), joten `lahdeUrl` jää
     * pois eikä sitä keksitä.
     */
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-tur-ankaravuohenkili-anatolia.jpg`,
        kuvateksti: 'Nuori valkea ankaravuohi seisoo Keski-Anatolian kuivalla '
          + 'ylängöllä.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: '
          + 'kuvatoimituksen aiemmin tarkistettu E1-kuva.',
      },
    ],
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

  /* ============ EUROOPAN ULKOPUOLINEN ERÄ (5.9.2026) ============
   *
   * Näiden 24 tietueen `otsikko` ja `teksti` ovat kaanonia: Opus
   * luonnosteli, Fable tarkisti ja viimeisteli 5.9.2026 illalla (ks.
   * tiedoston alku). Kuvatekstit ja kuvien lähderivit ovat kuvaputken
   * toimituksesta SANASTA SANAAN (posti/animals-approved-32-20260905)
   * eikä niitä muokata.
   *
   * Jokainen tekstin väite on tarkistettu `lahde`-rivin artikkelista ja
   * osiosta 5.9.2026; osio "johdanto" tarkoittaa artikkelin alkukappaleita
   * ennen ensimmäistä väliotsikkoa.
   *
   * KUUSI TIETUETTA KANTAA KARUSELLIN: NZL, JPN, CHN, CAN, MAR ja NAM
   * saivat toimituksesta photo/story-parin, ja `kuvat`-listassa photo on
   * ensimmäisenä eli kortin avautuessa näkyvä kuva (omistajan päätös
   * 5.9.2026, ks. lohko "KAKSI KUVAA SAMASTA AIHEESTA").
   *
   * PAIKKA EI AINA OLE KUVATEKSTIN PAIKKA. Merkin on oltava maalla, oman
   * maansa rajojen sisällä ja vähintään 35 laudan yksikön päässä
   * kaupunkimerkistä (tests/elaintakyt.test.mjs). Kangaroo Island,
   * Stewartin saari, Punta Tombon niemi ja Boulders Beach jäävät
   * maailmankartan karkeassa muodossa mereen, ja Yellowstone, Churchill
   * ja Xochimilco ovat käytännössä kaupunkimerkin alla — näissä piste on
   * siirretty saman eläimen lähimmälle kelpaavalle alueelle ja syy on
   * kirjattu tietueen omaan kommenttiin. Sama ratkaisu kuin BIH:llä ja
   * TUR:lla 2.9.2026.
   */
  NPL: {
    elain: 'punapanda',
    otsikko: 'Nimi ennen isoa kaimaa',
    teksti: 'Punapanda sai nimensä ennen kuuluisaa kaimaansa: sana panda tulee todennäköisesti nepalin sanasta ponya, joka tarkoittaa jalkapohjaa ja kynsiä. Yli neljänkymmenen vuoden ajan panda oli englannin kielessä vain tämä eläin — jättiläispanda kuvattiin ja nimettiin vasta vuonna 1869. Sukua ne eivät ole, mutta molemmilla on bambunkorren ympärille taipuva valepeukalo eli venynyt ranneluu. Punapanda elää yksin, kiipeilee puissa ja syö enimmäkseen bambun versoja ja lehtiä.',
    lahde: 'en-Wikipedia "Red panda", osiot "Etymology" ja "Characteristics" sekä johdanto. '
      + 'Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-npl-photo-r20260905-v1.jpg`,
        kuvateksti: 'Punapanda ottaa varovaisen askeleen sammalrungolla Langtangin '
          + 'viileässä metsässä.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: Ganga Raj '
          + 'Sunuwar — punapanda Langtangissa 8.11.2024 (oma valokuva); Red Panda Network — '
          + 'järjestön julkaisema aito punapandakuva; Red Panda Network — All About Red '
          + 'Pandas (tietolehden hakuvälimuistissa luettu teksti)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Curious_Red_Panda_in_Langtang_National_Park.jpg',
      },
    ],
    lon: 85.5,
    lat: 28.2,
  },
  JPN: {
    elain: 'lumiapina',
    otsikko: 'Kylpijät pohjoisen rajalla',
    teksti: 'Ihmistä lukuun ottamatta yksikään kädellinen ei elä yhtä pohjoisessa eikä yhtä kylmässä kuin japaninmakaki, joka kestää kahdenkymmenen asteen pakkasen ja on vielä taitava uimari. Jigokudanin lauma alkoi käydä kuumissa lähteissä vasta 1960-luvulla, kun apinoita houkuteltiin yhteen paikkaan pois viljelyksiltä. Talvikylvyllä on mitattu vaikutus: kylpevän eläimen stressitaso on matalampi, ja korkea-arvoiset naaraat pitävät niukan lämpimän veden itsellään.',
    lahde: 'en-Wikipedia "Japanese macaque", osiot "Physical characteristics", '
      + '"Intelligence and culture" ja "Ecology" sekä johdanto. Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-jpn-photo-r20260905-v1.jpg`,
        kuvateksti: 'Lumiapina katsoo kivireunalta rauhallisesti kohti kuvaajaa Jigokudanin '
          + 'lämpimässä vedessä.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: Jigokudani '
          + 'Yaen-koen — puiston kuvaus ja aito allaskuva; Japanin ympäristöministeriö — '
          + 'Jigokudani; Katsottu ministeriön talvikuva',
        lahdeUrl: 'https://en.jigokudani-yaenkoen.co.jp/',
      },
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-jpn-story-r20260905-v1.jpg`,
        kuvateksti: 'Lumiapina hoitaa nuoren turkkia Jigokudanin lämpimän altaan reunalla.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: Jigokudani — '
          + 'elinkaari, emot, nuorten hoiva ja aidot valokuvat; Jigokudani — havainnointi, '
          + 'oikea käden anatomia; Jigokudani — laji ja lyhyt häntä; Japanin '
          + 'ympäristöministeriö — talvinen lähdeallas',
        lahdeUrl: 'https://jigokudani-yaenkoen.co.jp/knowledge/lifetime/',
      },
    ],
    /*
     * Piste on Naganon vuorilla Jigokudanin seudulla; lähimpään
     * kaupunkimerkkiin (Tokio) jää 55 laudan yksikköä, kun testi vaatii 35.
     */
    lon: 138.5,
    lat: 36.7,
  },
  AUS: {
    elain: 'koala',
    otsikko: 'Kaksikymmentä tuntia unta',
    teksti: 'Eukalyptuksen lehdissä on niin vähän energiaa, että koala nukkuu kaksikymmentä tuntia vuorokaudessa ja viettää maassa alle prosentin ajastaan. Poikanen syntyy alle puolen gramman painoisena ja ryömii emonsa pussiin kehittymään. Puolivuotiaana se saa emoltaan pehmeää umpisuolimassaa, bakteeriannoksen, joka valmistaa sen siirtymään kuituiseen ja myrkylliseen lehtiruokaan. Etelässä eläin on isompi: Victorian koalat painavat kaksi kertaa niin paljon kuin Queenslandin sukulaisensa.',
    lahde: 'en-Wikipedia "Koala", osiot "Characteristics", "Foraging and activities" ja '
      + '"Reproduction and development" sekä johdanto. Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-aus-photo-r20260905-v4.jpg`,
        kuvateksti: 'Koalanpoikanen lepää leveässä eukalyptuksen haarassa Kangaroo '
          + 'Islandilla ja seuraa hiljaa kuvaajaa.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: SA Department '
          + 'for Environment and Water — eteläisen ja pohjoisen koalan vertailu; SA '
          + 'Department for Environment and Water — aidot Kangaroo Island/Cleland-koalat; '
          + 'Australian Wildlife Society — tarttuvat etutassut ja eteläisen kannan turkki',
        lahdeUrl: 'https://www.environment.sa.gov.au/topics/animals-and-plants/living-with-wildlife/koalas',
      },
    ],
    /*
     * Piste on Victorian Otway-vuoristossa eikä kuvatekstin Kangaroo
     * Islandilla: saari on maailmankartan mittakaavassa niin pieni, että
     * sen kohta osuu mereen (tests/elaintakyt.test.mjs). Otway on samaa
     * eteläisen koalan aluetta, ja Melbourneen jää 61 yksikköä.
     */
    lon: 143.6,
    lat: -38.4,
  },
  PNG: {
    elain: 'paratiisilintu',
    otsikko: 'Linnut ilman jalkoja',
    teksti: 'Ensimmäiset paratiisilinnut päätyivät Eurooppaan Magalhãesin maailmanympäripurjehduksen mukana, ja paikalliset kauppiaat olivat valmistaneet nahat koristeiksi siivet ja jalat poistettuina. Sitä ei Euroopassa tiedetty, ja niinpä pääteltiin, ettei lintu koskaan laskeudu vaan pysyy ikuisesti ilmassa höyhentensä varassa; ison paratiisilinnun tieteellinen nimi on yhä apoda, jalaton. Heimossa on 44 lajia ja 17 sukua, ja koreat höyhenet kuuluvat lähes aina koiraille.',
    lahde: 'en-Wikipedia "Bird-of-paradise", osio "Relationship with humans" sekä johdanto. '
      + 'Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-png-photo-r20260905-v1.jpg`,
        kuvateksti: 'Kuningasparatiisilintu pysähtyy oksalle; pitkät oranssinpunaiset '
          + 'kylkihöyhenet ja kaksi tummaa pyrstöruotoa laskeutuvat sen taakse.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: Cornell '
          + 'Birds-of-Paradise Project — aito lajikuva ja suvun tuntomerkit; Cornellin '
          + 'katsottu valokuva; Australian Museum — Raggiana Bird of Paradise',
        lahdeUrl: 'https://www.birdsofparadiseproject.org/genera/',
      },
    ],
    lon: 144.5,
    lat: -6,
  },
  CHL: {
    elain: 'guanako',
    otsikko: 'Veri ohuessa ilmassa',
    teksti: 'Guanako laiduntaa jopa neljän kilometrin korkeudessa, missä happea riittää niukalti. Sen veri on pakattu punasoluja täyteen: teelusikallisessa niitä on noin 68 miljoonaa, nelinkertaisesti ihmiseen verrattuna. Vasa eli chulengo kävelee heti syntymänsä jälkeen. Ketun uhatessa lauma ei pakene vaan asettuu renkaaksi poikasten ympärille ja ajaa sen tiehensä; pumaa vastaan sama temppu ei onnistuisi, ja avoimella arolla guanako pakenee 64 kilometrin tuntivauhtia.',
    lahde: 'en-Wikipedia "Guanaco", osiot "Blood", "Ecology" ja "Mating season". '
      + 'Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-chl-photo-r20260905-v2.jpg`,
        kuvateksti: 'Nuori guanako kääntää päätään kuvaajaa kohti kesken kevyen askeleen.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: CONAF: Torres '
          + 'del Painen kansallispuisto ja guanako; LBM1948: itse kuvattu guanako Torres '
          + 'del Painessa 30.12.2012; Javiercamposg7: guanakon pään lähikuva 17.9.2024',
        lahdeUrl: 'https://www.conaf.cl/parque_nacionales/parque-nacional-torres-del-paine/',
      },
    ],
    lon: -72.9,
    lat: -51,
  },
  NZL: {
    elain: 'kiivi',
    otsikko: 'Muna, joka täyttää emon',
    teksti: 'Kiivin muna painaa noin 430 grammaa ja vie jopa viidenneksen emon painosta; hautominen kestää 75–90 päivää, ja poikanen lähtee pesästä muutaman päivän ikäisenä ruokkimaan itsensä. Naaraalla on kaksi toimivaa munasarjaa mutta vain yksi munanjohdin, jonka kautta molempien munat kulkevat. Sieraimet ovat pitkän nokan kärjessä, ja yössä liikkuva tokoeka etsii matoja ja toukkia maasta enemmän hajun kuin näön tai kuulon avulla. Fiordlandin metsissä lintuja on noin 15 000.',
    lahde: 'en-Wikipedia "Southern brown kiwi", osiot "Taxonomy", "Description", "Diet" ja '
      + '"Reproduction". Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-nzl-photo-r20260905-v1.jpg`,
        kuvateksti: 'Rakiuran tokoeka pysähtyy tutkimaan kosteaa lehteä metsän pohjalla.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: DOC: Rakiuran '
          + 'tokoeka ja päivällä liikkuminen; Katsottu DOC:n Rakiuran tokoekan valokuva; '
          + 'New Zealand Birds Online: tokoekan laji, rakenne ja metsäelinympäristö; DOC: '
          + 'Kiwi Best Practice Manual, perustuntomerkit',
        lahdeUrl: 'https://www.doc.govt.nz/nature/native-animals/birds/birds-a-z/kiwi/tokoeka/',
      },
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-nzl-story-r20260905-v2.jpg`,
        kuvateksti: 'Rakiuran kiivi tutkii kariketta alkuyön metsässä, kun etäinen '
          + 'työntekijä kirjaa luontohavaintoja.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: DOC — '
          + 'tokoeka, Rakiuran lajikuva ja käyttäytyminen; DOC — Rakiuran '
          + 'rimu–kamahi-metsä, saniaiset ja punaisen valon ohje; DOC — How to count kiwi, '
          + 'aidot kenttätyön ja akustisen tallentimen kuvat Fiordlandista',
        lahdeUrl: 'https://www.doc.govt.nz/nature/native-animals/birds/birds-a-z/kiwi/tokoeka/',
      },
    ],
    /*
     * Piste on Fiordlandin itälaidalla eikä kuvatekstin Rakiuralla eli
     * Stewartin saarella: saari jää maailmankartan muodossa mereen.
     * Fiordlandissa elää saman lajin oma alalaji, ja Milford Soundin
     * merkkiin jää 37 yksikköä (vaaditaan 35).
     */
    lon: 167.8,
    lat: -46.15,
  },
  PER: {
    elain: 'vikunja',
    otsikko: 'Kangas, joka kuului kuninkaalle',
    teksti: 'Vikunjan villa on maailman hienoimpia kuituja, halkaisijaltaan kaksitoista mikrometriä, ja inkojen aikaan siihen sai pukeutua vain hallitsijasuku. Metsästys vei kannan kuuteentuhanteen 1960-luvulla; suojelun jälkeen eläimiä on jälleen noin 350 000, ja vikunja seisoo Perun vaakunassa. Se on yhä pääosin villi, vaikka alpakan uskotaan polveutuvan siitä. Villan saa yhä vain villistä eläimestä, joka ajetaan kokoon, keritään ja päästetään menemään — sama yksilö joka kolmas vuosi.',
    lahde: 'en-Wikipedia "Vicuña", osiot "Conservation" ja "Vicuña wool" sekä johdanto. '
      + 'Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-per-photo-r20260905-v2.jpg`,
        kuvateksti: 'Vikunja pysähtyy punan matalalle harjanteelle ja katsoo kohti '
          + 'kuvaajaa.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: SERNANP: '
          + 'vikunja ja puna Pampa Galerasissa; Katsottu SERNANPin vikunjavalokuva',
        lahdeUrl: 'https://biodiversidadanp.sernanp.gob.pe/en/sabias-que/sabias-que-la-reserva-nacional-pampa-galeras-barbara-dachille-se-creo-para-salvar-de-la-extincion-a-una-especie/',
      },
    ],
    lon: -74.5,
    lat: -14.6,
  },
  SAU: {
    elain: 'arabianoryksi',
    otsikko: 'Yksisarvinen ilman toista sarvea',
    teksti: 'Arabianoryksin suorat sarvet ovat onttoa luuta eivätkä kasva takaisin, joten toisen menettänyt eläin kulkee loppuikänsä yhdellä. Aristoteles ja Plinius vanhempi pitivät oryksia yksisarvisen esikuvana, ja tietystä kulmasta kaksi sarvea asettuukin yhdeksi. Kuivalla kaudella eläin makaa päivät varjossa liikkumatta ja laiduntaa vasta öisin; virtsan ja aineenvaihdunnan on mitattu putoavan puoleen. Villinä laji kuoli sukupuuttoon 1970-luvun alussa, palautettiin aavikolle 1980 ja nousi 2011 ensimmäisenä eläimenä luokasta "luonnosta hävinnyt" takaisin vaarantuneeksi.',
    lahde: 'en-Wikipedia "Arabian oryx", osiot "Unicorn myth" ja "Adaptations for desert '
      + 'environments" sekä johdanto. Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-sau-photo-r20260905-v1.jpg`,
        kuvateksti: 'Arabianoryksi pysähtyy dyynin reunaan ja kääntää päänsä kohti kuvaajaa '
          + 'Uruq Bani Ma’aridin aamussa.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: NCW — Uruq '
          + 'Bani Ma’aridin alue ja katsottu valokuva; Katsottu NCW:n dyynikuva; UNESCO — '
          + 'todellinen suojelualue ja palautetut arabianoryksit; Phoenix Zoo — Arabian '
          + 'oryx, lajikuvaus',
        lahdeUrl: 'https://www.ncw.gov.sa/en/protected-areas',
      },
    ],
    lon: 45.5,
    lat: 19.5,
  },
  USA: {
    elain: 'biisoninvasa',
    otsikko: 'Sadan eläimen varassa',
    teksti: '1870-luvun teurastus pudotti biisonin kuudestakymmenestä miljoonasta noin sataan eläimeen kuudessa karjassa; Yellowstonessa selvisi lisäksi 25 villiä, ja siellä laiduntaa yhä yksi harvoista laumoista, joihin ei ole sekoittunut nautakarjan perimää. Siitä pullonkaulasta kanta on kasvanut takaisin, ja vuonna 2016 biisonista tuli Yhdysvaltain kansallisnisäkäs. Punaruskea vasa on kaksi ensimmäistä kuukauttaan emoaan vaaleampi. Kesy eläin ei silti ole: vuosina 1980–1999 biisoni haavoitti Yellowstonessa 79 kävijää ja karhu 24.',
    lahde: 'en-Wikipedia "American bison", osiot "Description", "Dangers to humans", '
      + '"Genetics", "Population bottleneck and near extinction" ja "As a symbol". '
      + 'Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-usa-photo-r20260905-v1.jpg`,
        kuvateksti: 'Yellowstonen biisoninvasa kääntää katseensa kameraan kesken hieman '
          + 'kömpelön keväisen raviaskelen.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: NPS — '
          + 'Yellowstone bison ecology; NPS / A. Falgoust — Yellowstone calf photograph, 9 '
          + 'May 2021; Photograph provenance and direct source URL',
        lahdeUrl: 'https://www.nps.gov/yell/learn/nature/bison.htm/index.htm',
      },
    ],
    /*
     * Piste on Yellowstonen eteläpuolella Grand Tetonin laaksossa, ei
     * kuvatekstin Yellowstonessa: puisto on laudalla oma kaupunkimerkkinsä,
     * eikä täkyä saa latoa merkin päälle (tests/elaintakyt.test.mjs).
     * Sama biisoniekosysteemi, 41 yksikköä etelämpänä.
     */
    lon: -110.5,
    lat: 43.6,
  },
  CHN: {
    elain: 'jättiläispanda',
    otsikko: 'Kahdeksassadasosa emostaan',
    teksti: 'Vastasyntynyt jättiläispanda on vaaleanpunainen, sokea ja hampaaton ja painaa 90–130 grammaa eli noin kahdeksassadasosan emonsa painosta — istukkanisäkkäiden pienin poikanen suhteessa emoon. Puolet synnytyksistä on kaksosia, mutta emo hoitaa vain vahvemman: rasvaa varastoimattoman naaraan maidon arvellaan riittävän yhdelle. Vuodesta 1984 Kiina ei ole lahjoittanut pandoja vaan lainaa niitä, ja ulkomailla syntyneet poikaset palaavat aikanaan Kiinaan. Villejä pandoja laskettiin vuosien 2011–2014 kartoituksessa 1 864.',
    lahde: 'en-Wikipedia "Giant panda", osiot "Reproduction" ja "In captivity" sekä '
      + 'johdanto. Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-chn-photo-r20260905-v2.jpg`,
        kuvateksti: 'Pandanpoikanen maistelee bambua rauhallisessa Sichuanin metsässä.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: Smithsonian — '
          + 'dated nine-month cub feeding and anatomy photographs; The Nature Conservancy — '
          + 'Sichuan bamboo habitat and genuine wild mother/cub photo',
        lahdeUrl: 'https://nationalzoo.si.edu/news/giant-panda-cub-xiao-qi-ji-media-resources',
      },
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-chn-story-r20260905-v1.jpg`,
        kuvateksti: 'Poikanen kurottaa emon bambunlehteen kesken ruokailuhetken Sichuanin '
          + 'metsässä.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: Smithsonian '
          + 'keeper observation — cub initiates play during mother\'s bamboo meals; '
          + 'Smithsonian keeper observation — eight-month cub plays with mother and eats '
          + 'bamboo; Smithsonian dated cub anatomy and bamboo-grip photos; The Nature '
          + 'Conservancy — genuine wild mother/cub and bamboo-moss habitat',
        lahdeUrl: 'https://nationalzoo.si.edu/animals/news/pandastory-playful-panda-cub',
      },
    ],
    lon: 103,
    lat: 31,
  },
  CUB: {
    elain: 'mehiläiskolibri',
    otsikko: 'Kahta grammaa kevyempi',
    teksti: 'Mehiläiskolibri on maailman pienin lintu: koiras painaa alle kaksi grammaa ja on 5,5 senttiä pitkä, ja luonnossa se elää jopa seitsemän vuotta. Naaras munii kaksi kahvipavun kokoista munaa hämähäkinseitistä, kaarnasta ja jäkälästä punottuun pesään, jonka halkaisija on noin kaksi ja puoli senttiä. Siivet lyövät 80–200 kertaa sekunnissa, lintu voi kiertää päivässä 1 500 kukkaa ja syö puolet omasta painostaan. Sitä on kutsuttu myös maailman pienimmäksi dinosaurukseksi.',
    lahde: 'en-Wikipedia "Bee hummingbird", osiot "Description", "Diet" ja "Breeding". '
      + 'Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-cub-photo-r20260905-v1.jpg`,
        kuvateksti: 'Mehiläiskolibri leijuu pienen kukan vieressä Zapatan metsän reunassa.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: Cornell Lab '
          + 'eBird — Bee Hummingbird identification and genuine male photographs; BirdLife '
          + 'International — world\'s smallest bird endemic to Cuba; BirdsCaribbean — '
          + 'Zapata, Los Hondones and Bee Hummingbird habitat, PDF page 2',
        lahdeUrl: 'https://ebird.org/species/beehum1',
      },
    ],
    lon: -81.3,
    lat: 22.3,
  },
  IND: {
    elain: 'tiikerinpentu',
    otsikko: 'Tassunjäljistä riistakameraan',
    teksti: 'Bengalintiikerin pennut syntyvät silmät ja korvat kiinni, 780–1 600 gramman painoisina. Kahden kuukauden ikäisinä ne seuraavat emoa metsästysretkille ja viiden kuukauden iässä osallistuvat jo saaliin kaatamiseen. Intiassa tiikereitä laskettiin pitkään tassunjäljistä, mikä osoittautui epätarkaksi; nyt työn tekevät riistakamerat. Vuonna 2022 maassa arvioitiin olevan 3 167–3 682 tiikeriä, Ranthamboren yksilöt ovat kannan läntisimmät, ja laji on sekä Intian että Bangladeshin kansalliseläin.',
    lahde: 'en-Wikipedia "Bengal tiger", osiot "India" ja "Reproduction and lifecycle" sekä '
      + 'johdanto. Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-ind-photo-r20260905-v1.jpg`,
        kuvateksti: 'Nuori bengalintiikeri ylittää matalan hiekkakivitasanteen Ranthamboren '
          + 'kuivassa lehtimetsässä.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: National '
          + 'Tiger Conservation Authority — Ranthambhore dry deciduous Anogeissus forests '
          + 'and sandstone/ruin landscape context; Michael J. Vickers — original young '
          + 'Bengal tiger photo, Bandhavgarh May 2010; Michael J. Vickers — Ranthambhore '
          + 'mother with 15-month offspring at waterhole, May 2015; WWF India — Nishant '
          + 'Andrews field narrative of four-month Ranthambore cubs; text read, its photos '
          + 'not accessible',
        lahdeUrl: 'https://ntca.gov.in/assets/uploads/briefnote/ranthambore.pdf',
      },
    ],
    lon: 76.5,
    lat: 26,
  },
  MEX: {
    elain: 'aksolotl',
    otsikko: 'Kidukset koko elämän',
    teksti: 'Aksolotl tulee sukukypsäksi käymättä koskaan läpi muodonmuutosta: se jää veteen ja kantaa haaroittuvia ulkokiduksiaan aikuisenakin. Se ei myöskään arpeudu vaan kasvattaa uudelleen raajan, hännän ja osia silmästä, sydämestä ja aivoista — se voi jopa ottaa vastaan toisen yksilön silmän tai aivojen osan ja saada sen toimimaan. Nimi on nahuatlia ja viittaa Xolotliin, atsteekkien tulen, kuolleiden, koirien ja kaksosten jumalaan. Villinä lajia arvioidaan olevan jäljellä 50–1 000 yksilöä Xochimilcon kanavissa.',
    lahde: 'en-Wikipedia "Axolotl", osiot "Nomenclature" ja "Regeneration" sekä johdanto. '
      + 'Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-mex-photo-r20260905-v2.jpg`,
        kuvateksti: 'Tumma aksolotl etenee Xochimilcon suojaisalla lietepohjalla, kidusten '
          + 'hienot rihmat veden mukana.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: UNAM — '
          + 'axolotl ecology, wild color and genuine specimen/habitat photographs; UNAM — '
          + 'Xochimilco census and chinampa refuges; San Diego Zoo — species account; UNAM '
          + '2019 thesis — section 3.6, PDF page 17, four front and five hind digits, three '
          + 'external gill pairs',
        lahdeUrl: 'https://biotecmov.ibt.unam.mx/numeros/44/1.html',
      },
    ],
    /*
     * Piste on Mexico Cityn lounaispuolella ylängöllä, ei Xochimilcossa:
     * kanavat ovat käytännössä kaupungin merkin alla (10 yksikköä, kun
     * vaaditaan 35), ja kaksi merkkiä samassa pisteessä on yksi merkki.
     * Tämä on lähin sallittu kohta Xochimilcon puolella kaupunkia.
     */
    lon: -99.4,
    lat: 18.4,
  },
  BRA: {
    elain: 'kultatamariini',
    otsikko: 'Oranssi ilman karotenoidia',
    teksti: 'Kultatamariinin hehkuvassa turkissa ei ole karotenoideja, joista luonnon oranssi väri yleensä syntyy. Laji on silkkiapinoista suurin — noin 26 senttiä ja 620 grammaa — ja elää vain Rio de Janeiron osavaltion atlantinmetsissä. 1970-luvulla yksilöitä arvioitiin olevan 100–600; suojelualueiden, istutusten ja metsäkäytävien jälkeen laskenta 2022–2023 päätyi yli 4 800:aan. Poikaset syntyvät useimmiten kaksosina, ja koko ryhmä kantaa niitä vuorotellen.',
    lahde: 'en-Wikipedia "Golden lion tamarin", osiot "Physical characteristics", '
      + '"Reproduction" ja "Conservation" sekä johdanto. Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-bra-photo-r20260905-v1.jpg`,
        kuvateksti: 'Kultatamariini pysähtyy sammaleiselle oksalle Rio de Janeiron '
          + 'osavaltion Atlantin sademetsässä.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: Smithsonian — '
          + 'golden lion tamarin physical description, digit use and Atlantic Forest '
          + 'habitat; Save the Golden Lion Tamarin — conservation program and genuine '
          + 'animal photograph; Brazil\'s UNESCO tentative-list submission — Rio de Janeiro '
          + 'lowland Atlantic Forest protected areas',
        lahdeUrl: 'https://nationalzoo.si.edu/animals/golden-lion-tamarin',
      },
    ],
    lon: -41.9,
    lat: -22.1,
  },
  CAN: {
    elain: 'jääkarhunpentu',
    otsikko: 'Vankila karhuille',
    teksti: 'Jääkarhun turkki ei ole valkoinen: peitinkarvat ovat onttoja ja väriaineettomia, valo siroaa niistä takaisin, ja rasvaeritys estää karvoja jäätymästä. Iho nenää ja huulia myöten on sen sijaan musta. Pentu syntyy talvipesään noin 600 gramman painoisena, silmät kiinni ensimmäisen kuukautensa, ja kun emo kaivautuu keväällä ulos, se painaa jo 10–15 kiloa. Churchillissä kaupunkiin eksyneet karhut viedään karhuvankilaan odottamaan meren jäätymistä.',
    lahde: 'en-Wikipedia "Polar bear", osiot "Description", "Reproduction and development" '
      + 'ja "Conflicts". Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-can-photo-r20260905-v1.jpg`,
        kuvateksti: 'Churchillin jääkarhunpentu pysähtyy katsomaan tulijaa kesken askeleen '
          + 'tuulen kovettamalla lumella.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: Polar Bears '
          + 'International — Churchill cub adoption, field account and Dave Sandford photo',
        lahdeUrl: 'https://polarbearsinternational.org/news-media/articles/rare-polar-bear-cub-adoption-captured-on-video/',
      },
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-can-story-r20260905-v3.jpg`,
        kuvateksti: 'Churchillin jääkarhunpentu seuraa emon suuria jälkiä lumisella '
          + 'rannikolla.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: Polar Bears '
          + 'International — genuine Churchill mother/cub field photograph and cub age; '
          + 'Churchill Northern Studies Centre — coastal seasonal habitat and autumn '
          + 'gathering; US Fish & Wildlife Service — genuine mother/cub walking photographs '
          + 'and general behavior account; Beaufort Sea context; Polar Bears International '
          + '— cub development and reliance on mother',
        lahdeUrl: 'https://polarbearsinternational.org/news-media/articles/rare-polar-bear-cub-adoption-captured-on-video/',
      },
    ],
    /*
     * Piste on Hudsoninlahden länsirannikolla Churchillistä luoteeseen:
     * Churchill on laudalla oma kaupunkimerkkinsä ja itse ranta jää
     * maailmankartan muodossa mereen. Merkkiin jää 44 yksikköä.
     */
    lon: -95.2,
    lat: 58.8,
  },
  ARG: {
    elain: 'magellaninpingviini',
    otsikko: 'Ääni tuntee puolison',
    teksti: 'Magellaninpingviini kaivaa pesäkolonsa pensaan alle Patagonian rannikolle, ja Punta Tombo on lajin suurimpia yhdyskuntia. Pari pysyy samana vuodesta toiseen: koiras ottaa vanhan kolonsa haltuun ja odottaa, ja naaras tunnistaa kumppaninsa pelkästä äänestä. Kaksi munaa haudotaan vuorotellen 10–15 päivän vahdeissa, kun toinen käy merellä syömässä. Pesimäkauden jälkeen linnut vaeltavat pohjoiseen Perun ja Brasilian vesille; nimensä laji sai Magalhãesilta, joka näki sen vuonna 1520.',
    lahde: 'en-Wikipedia "Magellanic penguin", osio "Breeding" sekä johdanto. Tarkistettu '
      + '5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-arg-photo-r20260905-v1.jpg`,
        kuvateksti: 'Magellaninpingviini astelee Punta Tombon sorarannalla, Atlantti '
          + 'pehmeänä taustallaan.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: Argentina '
          + 'government — Punta Tombo and genuine adult penguin photographs; Aquarium of '
          + 'the Pacific — adult band pattern, dense plumage and flipper structure; indexed '
          + 'text read, direct page returned 403',
        lahdeUrl: 'https://www.argentina.gob.ar/viaja-por-argentina/que-hacer/caminar-entre-pinguinos-de-magallanes',
      },
    ],
    /*
     * Piste on Chubutin arolla Punta Tombosta sisämaahan: niemi jää
     * maailmankartan muodossa mereen, ja merkin on oltava maalla.
     */
    lon: -65.45,
    lat: -44,
  },
  KEN: {
    elain: 'kirahvinvasa',
    otsikko: 'Viisi sarvennusta ja valkoiset sukat',
    teksti: 'Rothschildinkirahvi on ainoa kirahvimuoto, joka syntyy viisi ossikonia eli nahkasarvea päässään: kahden tavallisen lisäksi yksi otsan keskellä ja yksi kummankin korvan takana. Alasäärissä ei ole lainkaan kuviota, joten eläin näyttää vetäneen jalkaansa valkoiset sukat. Kantoaika on 14–16 kuukautta ja vasoja syntyy yksi kerrallaan. Aikuisia arvioitiin villinä olevan 1 399 vuonna 2018, ja niitä näkee lähinnä Nakuru-järven ja Murchison Fallsin kansallispuistoissa.',
    lahde: 'en-Wikipedia "Rothschild\'s giraffe", osiot "Characteristics", "Ecology and '
      + 'behavior" ja "Threats and conservation efforts" sekä johdanto. Tarkistettu '
      + '5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-ken-photo-r20260905-v2.jpg`,
        kuvateksti: 'Rothschildinkirahvin vasa katsoo heinikon yli Nakurussa, pitkät '
          + 'vaaleat sääret tukevasti maassa.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: GCF — '
          + 'Northern Giraffe ja TonyWildin katsottu nubialaisen kirahvin vasakuva; GCF — '
          + 'Kenya Country Profile, Nakurun siirretty populaatio',
        lahdeUrl: 'https://giraffeconservation.org/giraffe-species/northern-giraffe/',
      },
    ],
    lon: 36.1,
    lat: -0.4,
  },
  NAM: {
    elain: 'erämaanorsu',
    otsikko: 'Yön mittainen matka vedelle',
    teksti: 'Namibian erämaanorsu ei ole oma lajinsa vaan afrikannorsu, joka on oppinut elämään ilman pysyviä jokia. Se kävelee yössä jopa 70 kilometriä vesipaikalle ja tulee toimeen kolme vuorokautta juomatta; jalkapohjat ovat leveämmät, jalat pidemmät ja ruumis pienempi kuin savannin sukulaisilla, ja kuivan kauden ruoka on mopanea, kamelipiikkiakaasiaa ja mirhapensasta. Kunenessa oli 1900-luvun alussa noin 3 000 norsua, 1980-luvulla enää murto-osa; suojelu on nostanut määrän noin kuuteensataan.',
    lahde: 'en-Wikipedia "Desert elephant", osio "Behaviour" sekä johdanto. Tarkistettu '
      + '5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-nam-photo-r20260905-v2.jpg`,
        kuvateksti: 'Aikuinen erämaanorsu tavoittaa lehtiä Damaralandin kuivassa '
          + 'jokiuomassa.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: Elephant '
          + 'Human Relations Aid — Namibian erämaanorsujen laji, jokiuomat ja katsottu '
          + 'norsuvalokuva',
        lahdeUrl: 'https://www.ehranamibia.org/about-desert-elephants',
      },
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-nam-story-r20260905-v2.jpg`,
        kuvateksti: 'Norsunvasa kurottaa emon tavoittamiin lehtiin Damaralandin kuivassa '
          + 'jokiuomassa.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: EHRA — '
          + 'Namibian erämaanorsut, kuivat jokiuomat ja puiden lehdet kuivakauden '
          + 'ravintona; ElephantVoices — poikasten ravinnon oppiminen, katsotut vasa- ja '
          + 'yhteisen ruokailun valokuvat; ElephantVoices Ethogram — Solicit-Food: poikanen '
          + 'tavoittelee emon ravintoa',
        lahdeUrl: 'https://www.ehranamibia.org/about-desert-elephants',
      },
    ],
    lon: 14.4,
    lat: -20.5,
  },
  MDG: {
    elain: 'sifaka',
    otsikko: 'Tanssi maassa, lento puissa',
    teksti: 'Verreaux\'n sifaka kiipeää puiden pystyrunkoja pitkin ja hyppää niiden välillä yhdeksän, kymmenenkin metriä. Maassa se ei juokse neljällä jalalla vaan loikkii kahdella jalalla, kuin tanssien. Poikanen roikkuu emon vatsassa 6–8 viikkoa ja siirtyy sitten selkään seuraaviksi 19 viikoksi; noin kolmasosa poikasista päätyy fossan saaliiksi. Ryhmässä on kahdesta kahteentoista eläintä, ja arvojärjestyksessä naaraat ovat aina koiraiden yläpuolella.',
    lahde: 'en-Wikipedia "Verreaux\'s sifaka", osiot "Behaviour" ja "Reproduction" sekä '
      + 'johdanto. Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-mdg-photo-r20260905-v2.jpg`,
        kuvateksti: 'Verreaux’n sifaka pysähtyy Berentyn kaatuneelle rungolle, pitkä vaalea '
          + 'häntä rennosti puuta vasten.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: Madagaskarin '
          + 'PA-CIWT — Verreaux’n sifakan tuntomerkit, mitat ja lehtiruokavalio; American '
          + 'Society of Mammalogists — B. D. Pattersonin katsottu Berentyn valokuva; Rhett '
          + 'A. Butler — katsottu ruokailuvalokuva Berentystä; WildMadagascar — Berentyn '
          + 'kuiva galleriametsä',
        lahdeUrl: 'https://e-voary.mg/paciwt/Ficheverreauxi.php?lang=en',
      },
    ],
    lon: 46.3,
    lat: -25,
  },
  UGA: {
    elain: 'gorillanpoikanen',
    otsikko: 'Sormenjälki nenässä',
    teksti: 'Jokaisella gorillalla on oma nenäkuvionsa, ja tutkijat tunnistavat yksilöt siitä kuin sormenjäljestä. Vuorigorillan turkki on usein muiden gorillojen turkkia paksumpi ja pidempi, sillä vuorilla on kylmä. Lajia elää kahdessa erillisessä kannassa, Virungan vuorilla ja Ugandan Bwindissä, ja vuonna 2019 niitä laskettiin kaikkiaan 1 063. Bwindissä aikuinen koiras syö päivässä lähes 19 kiloa lehtiä ja versoja; Dian Fossey aloitti kahdeksantoista vuoden tutkimuksensa 1967 ja teki ensimmäisen tarkan laskennan.',
    lahde: 'en-Wikipedia "Mountain gorilla", osiot "Characteristics", "Diet" ja "Research" '
      + 'sekä johdanto. Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-uga-photo-r20260905-v2.jpg`,
        kuvateksti: 'Vuorigorillan poikanen tutkii pientä lehtiversoa Bwindi-metsän '
          + 'matalalla rungolla.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: Uganda '
          + 'Wildlife Authority — vuorigorilla ja Bwindi; Gorilla Doctors — katsotut '
          + 'Bwindi-kuvat, Ruterana vastasyntyneineen ja varttunut Kibumba',
        lahdeUrl: 'https://ugandawildlife.org/animals/mountain-gorilla/',
      },
    ],
    lon: 29.7,
    lat: -1.05,
  },
  ETH: {
    elain: 'gelada',
    otsikko: 'Ruohonsyöjä jyrkänteellä',
    teksti: 'Gelada on ainoa kädellinen, joka elää pääasiassa ruohosta: korret ja siemenet ovat jopa 90 prosenttia sen ruoasta, ja se pureskelee yhtä tehokkaasti kuin seepra. Se on myös sukunsa Theropithecus ainoa elossa oleva laji. Yönsä se nukkuu Etiopian ylängön jyrkänteillä ja ruokailee päivät niityillä, kyykyssä jalkojaan liu\'uttaen. Etiopiansusi saa kulkea lauman keskeltä ilman että kukaan liikahtaa — kylän koiran nähdessään koko lauma pakenee kallioille.',
    lahde: 'en-Wikipedia "Gelada", osiot "Description", "Range and ecology" ja "Social '
      + 'structure" sekä johdanto. Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-eth-photo-r20260905-v1.jpg`,
        kuvateksti: 'Geladakoiras nyppii ruohoa Simienvuorten rinteellä ja nostaa välillä '
          + 'katseensa.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: African '
          + 'Wildlife Foundation — geladan tuntomerkit, laidunnus ja Simien sekä katsottu '
          + 'geladavalokuva',
        lahdeUrl: 'https://www.awf.org/wildlife-conservation/gelada',
      },
    ],
    lon: 38.2,
    lat: 13.2,
  },
  MAR: {
    elain: 'berberiapina',
    otsikko: 'Apina ihmisen sijasta',
    teksti: 'Galenos leikkeli 100-luvulla mitä ilmeisimmin juuri berberiapinoita ja oletti ihmisen olevan sisältä samanlainen; hänen virheensä jäivät lääketieteeseen yli tuhanneksi vuodeksi, kunnes Vesalius osoitti ne vääriksi 1500-luvulla. Lajissa on toinenkin poikkeus: laumat ovat äitilinjaisia, mutta poikasia hoitavat koiraat, myös vieraita, koska isyys jää epävarmaksi. Atlaksen setrimetsissä apinoita on enää 12 000–21 000, ja Gibraltarin kolmesataa ovat Euroopan ainoat villinä elävät apinat.',
    lahde: 'en-Wikipedia "Barbary macaque", osiot "Taxonomy and phylogeny", "Behaviour and '
      + 'ecology", "Parenting" ja "Threats" sekä johdanto. Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-mar-photo-r20260905-v1.jpg`,
        kuvateksti: 'Nuori berberiapina pysähtyy setrinjuurelle Keski-Atlaksen metsässä.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: AAP — Born to '
          + 'be Wild, katsotut nuorten ja ruokailevan berberiapinan kuvat; IFAW — Ifranen '
          + 'berberiapinat ja Atlas-setrimetsä',
        lahdeUrl: 'https://en.aap.eu/born-to-be-wild/',
      },
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-mar-story-r20260905-v1.jpg`,
        kuvateksti: 'Nuoret berberiapinat valtaavat hetkeksi polun kaatuneen rungon. Opas '
          + 'odottaa taaempana niiden väistymistä.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: Barbary '
          + 'Macaque Project, Lincoln — katsottu Christopher Youngin valokuva puussa '
          + 'leikkivistä nuorista; AAP — Born to be Wild, katsottu nuorten berberiapinoiden '
          + 'kuva ja Keski-Atlaksen suojelutyö; Barbary Macaque Project — turvallinen '
          + 'tarkkailuetäisyys ja ruokinnan välttäminen; Seltmann ym. 2013 — Ifranen setri- '
          + 'ja tammimetsä sekä luonnonvaraisten berberiapinoiden ryhmäliike',
        lahdeUrl: 'https://barbarymacaque.blogs.lincoln.ac.uk/',
      },
    ],
    /*
     * Piste on Keski-Atlaksen setrivyöhykkeellä Azroun eteläpuolella:
     * Ifranen ja Azroun kohdalta Fèsin merkkiin jäisi 25 yksikköä,
     * tästä 44 (vaaditaan 35).
     */
    lon: -5.6,
    lat: 33,
  },
  TZA: {
    elain: 'norsunvasa',
    otsikko: 'Kaksikymmentäkaksi kuukautta',
    teksti: 'Afrikannorsun kantoaika on noin 22 kuukautta, nisäkkäiden pisin. Tsavossa lokakuussa 1990 seuratussa synnytyksessä vastasyntynyt nousi jaloilleen puolessa tunnissa ja käveli kaksikymmentä minuuttia myöhemmin. Laumaa johtaa vanhin naaras, vasoista huolehditaan yhdessä — naaraat hoitavat myös toistensa poikasia — ja imetys jatkuu lähes viisi vuotta. Aikuinen syö päivässä noin 150 kiloa kasvillisuutta ja juo 230 litraa vettä; alle kaksivuotias vasa on yhä leijonan ja täplähyeenan saalis.',
    lahde: 'en-Wikipedia "African bush elephant", osiot "Social behaviour", "Reproduction" '
      + 'ja "Predators" sekä johdanto. Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-tza-photo-r20260905-v1.jpg`,
        kuvateksti: 'Norsunvasa pysähtyy kesken askelen Serengetin ruohikossa, kärsän kärki '
          + 'rennosti kiertyneenä.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: '
          + 'ElephantVoices — savanninorsun käyttäytyminen ja katsottu laumavalokuva '
          + 'vasoineen; TANAPA — Serengetin savannit ja akaasiametsiköt',
        lahdeUrl: 'https://www.elephantvoices.org/the-elephant-ethogram-user-guide',
      },
    ],
    lon: 34.8,
    lat: -2.3,
  },
  ZAF: {
    elain: 'afrikanpingviini',
    otsikko: 'Täplät kuin sormenjäljet',
    teksti: 'Afrikanpingviinin rinnassa on mustia täpliä, joiden kuvio on jokaisella yksilöllä oma kuin sormenjälki. Silmien yläpuoliset paljaat läiskät ovat hikirauhasia, jotka jäähdyttävät verta ja punoittavat sitä kirkkaammin mitä kuumempi ilma on. Ääni on aasimainen kiljunta, josta lintu sai nimen aasipingviini. Vuonna 1910 lajia oli puolitoista miljoonaa; vuonna 2023 pesiviä pareja oli enää alle 10 000, ja pingviini luokiteltiin äärimmäisen uhanalaiseksi.',
    lahde: 'en-Wikipedia "African penguin", osiot "Description" ja "Population" sekä '
      + 'johdanto. Tarkistettu 5.9.2026.',
    kuvat: [
      {
        url: `${ELAINTAKY_KUVAJUURI}elain-zaf-photo-r20260905-v1.jpg`,
        kuvateksti: 'Afrikanpingviini pysähtyy Boulders Beachin vaalealle hiekalle; sen '
          + 'rinnassa kulkee lajille ominainen yksi musta vyö.',
        lahde: 'Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: BirdLife '
          + 'South Africa — lajituntomerkit ja Neil Ebedesin katsottu pingviinivalokuva; '
          + 'SANParks — Bouldersin afrikanpingviiniyhdyskunta ja suojaisa lohkareinen ranta',
        lahdeUrl: 'https://www.birdlife.org.za/red-data-book/red-list/african-penguin/',
      },
    ],
    /*
     * Piste on Itä-Kapin rannikkoylängöllä Algoa Bayn takana eikä
     * kuvatekstin Boulders Beachillä: Kapkaupungin ranta on kartan
     * muodossa merta. Algoa Bay on lajin pesimäalueen itäpää.
     */
    lon: 25.45,
    lat: -33.8,
  },
  /*
   * ── MAAILMAN ERÄ M1 6.9.2026 (ETELÄ-AMERIKKA) ────────────────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erän M1 viidestä maasta ARG, BRA ja CHL olivat jo tässä taulussa
   * (5.9.2026 kuvaputken erä), joten uusia tulee kaksi: BOL ja COL.
   *
   * NÄMÄ KAKSI OVAT KUVATTOMIA, ja se on tietoinen tila eikä unohdus.
   * Erä M1 on kuvaton kauttaaltaan (ks. js/packs/maastokohteet-arg.js),
   * eikä integroija generoi kuvia itse: kuvaputki tekee ne Fablen
   * tilauksesta. Kortti kestää kuvattomuuden — js/elaintaky.js latoo
   * tekstin ja lähteen ilman kuvakehystä, ja js/packs/elaintakyt.js
   * elaintakynKuvat palauttaa tyhjän listan (tests/elaintakyt.test.mjs:
   * "kuvaton tietue ei keksi tiedostoa"). Kun kuvat valmistuvat, ne
   * lisätään `kuvat`-listana muiden tapaan.
   *
   * PAIKAT on tarkistettu samoilla ehdoilla kuin muutkin: piste on
   * maalla, oman maansa monikulmion sisällä, vähintään 35 yksikön
   * päässä lähimmästä kaupunkimerkistä ja 30 yksikön päässä toisesta
   * eläintäystä (tests/elaintakyt.test.mjs).
   */
  BOL: {
    elain: 'boliviandelfiini',
    otsikko: 'Delfiini maassa, jolla ei ole merta',
    teksti: 'Boliviandelfiini on makean veden delfiini, joka elää Ylä-Madeiran '
      + 'vesistön joissa Bolivian Amazoniassa — meri on tuhansien kilometrien '
      + 'päässä. Paikallisesti se tunnetaan nimellä bufeo, ja se on maailman suurin '
      + 'makean veden delfiini: pituutta jopa 2,8 metriä ja painoa 180 kiloa. '
      + 'Amazonin sukulaisistaan se erottuu suuremmalla hammasmäärällä, pienemmällä '
      + 'kallolla ja pidemmällä vartalolla, ja koskien ja putousten sarja pitää '
      + 'kannat erillään. Ranskalainen Alcide d\'Orbigny kuvasi lajin 1832 '
      + 'Bolivian-matkoillaan; sen jälkeen tutkijat ovat pitäneet sitä milloin '
      + 'omana lajinaan, milloin Amazonin jokidelfiinin alalajina. Syyskuussa 2012 '
      + 'presidentti Evo Morales sääti sille suojelulain ja julisti sen '
      + 'kansallisaarteeksi.',
    lahde: 'en-Wikipedia "Bolivian river dolphin", johdanto-osa sekä osiot '
      + '"Taxonomy" ja "Description". Tarkistettu 6.9.2026.',
    /*
     * Piste on Beninin savannin ja Mamorén jokitasangon puolivälissä:
     * lajin elinalue on Ylä-Madeiran vesistö, ja merkin on oltava maalla
     * eikä kartan uomassa, joka on maailmankartan mittakaavassa vettä.
     */
    lon: -64.9,
    lat: -14.0,
  },
  COL: {
    elain: 'kultamyrkkysammakko',
    otsikko: 'Yksi milligramma, kymmenen ihmistä',
    teksti: 'Kultamyrkkysammakko elää vain Kolumbian Tyynenmeren puoleisissa '
      + 'sademetsissä Caucan ja Valle del Caucan departementeissa, ja se on '
      + 'pienuudestaan huolimatta maailman myrkyllisin eläinlaji. Kuusisenttinen ja '
      + 'noin kolmenkymmenen gramman painoinen sammakko erittää ihorauhasistaan '
      + 'batrakotoksiinia: yhden villin yksilön keskimääräinen annos on noin '
      + 'milligramma, mikä riittää tappamaan arviolta 10–20 ihmistä. Myrkky ei ole '
      + 'sammakon omaa tekoa vaan tulee ravinnosta — vankeudessa hyönteisruoalla '
      + 'kasvatetut yksilöt menettävät myrkyllisyytensä kokonaan. Emberá- ja '
      + 'cofán-kansat ovat käyttäneet eritettä puhallusputken nuolissa, ja kärki '
      + 'pysyy tappavana kaksi vuotta tai kauemmin. Laji on uhanalainen, koska sen '
      + 'elinalue on alle 5 000 neliökilometriä ja metsä katoaa.',
    lahde: 'en-Wikipedia "Golden poison frog", johdanto-osa sekä osiot '
      + '"Distribution and habitat", "Toxicity" ja "Use by humans". '
      + 'Tarkistettu 6.9.2026.',
    // Piste on Chocón sademetsässä lajin elinalueella, irti rannikosta:
    // rannikkokaistale on maailmankartan muodossa jo merta.
    lon: -76.8,
    lat: 3.8,
  },
};

/** Maatunnukset siinä järjestyksessä kuin ne on kirjoitettu. */
export const ELAINTAKY_MAAT = Object.keys(ELAINTAKYT);

/**
 * TIETUEEN KUVAT YHDESSÄ MUODOSSA — yksi funktio, kaksi kirjoitustapaa.
 *
 * Kortti (js/elaintaky.js), savukkeet ja testit lukevat kuvat vain
 * tästä, jotta uusi `kuvat`-lista ja vanhat `kuva`/`kuvaLahde`-kentät
 * eivät voi ajautua eri tulkintoihin. Palautuu aina taulukko, jonka
 * ENSIMMÄINEN alkio on ensisijainen kuva.
 *
 * KUVAN LÄHDE ON ERI KENTTÄ KUIN TEKSTIN. Vanhassa tietueessa
 * `lahde` on kortin TEKSTIN lähde (en-Wikipedian artikkeli) ja
 * `kuvaLahde` kuvan oma — ne eivät saa sekoittua, koska pelin oma
 * havainnekuva näyttäisi silloin Wikipedian kuvalta (korjaus
 * 2.9.2026, js/elaintaky.js). Uudessa `kuvat`-listassa alkion oma
 * `lahde` on jo kuvan lähde, koska tekstillä on oma kenttänsä
 * tietueen juuressa.
 *
 * TYHJÄ TULOS ON KELVOLLINEN VASTAUS: kuvaton tietue on kortissa
 * sallittu tila (teksti kantaa kortin yksinkin), joten funktio ei
 * keksi puuttuvaa tiedostoa.
 *
 * @param {object} taky yksi ELAINTAKYT-tietue
 * @returns {{tiedosto: string, kuvateksti: string, lahde: string,
 *   url: string}[]} kuvat ensisijainen ensin
 */
export function elaintakynKuvat(taky) {
  if (!taky) return [];
  const rivit = Array.isArray(taky.kuvat) && taky.kuvat.length
    ? taky.kuvat
    // Vanha tietue on yhden kuvan lista: kentät ovat juuressa.
    : [{ tiedosto: taky.kuva, kuvateksti: taky.kuvateksti, lahde: taky.kuvaLahde }];
  return rivit
    .filter(Boolean)
    .map((kuva) => ({
      tiedosto: kuva.tiedosto ?? '',
      // `selite` kelpaa myös: se on valokuvatietueiden kenttä
      // (js/packs/europe-valokuvat.js), eikä kahta nimeä samalle
      // asialle kannata kaataa kuvaputken päälle.
      kuvateksti: kuva.kuvateksti ?? kuva.selite ?? '',
      lahde: kuva.lahde ?? '',
      url: kuva.url ?? '',
    }))
    .filter((kuva) => kuva.tiedosto || kuva.url);
}
