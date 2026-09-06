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
const ELAINTAKY_KUVAJUURI = 'https://media.matkakirja.app/kohtaamiset/kuvajono/';

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
  /*
   * ── MAAILMAN ERÄ M4 6.9.2026: GRÖNLANTI, GUATEMALA JA NICARAGUA ──
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Kolmella Pohjois-Amerikan maalla ei ollut eläintäkyä lainkaan
   * (docs/moduulit/karttanostot-kattavuus.md). Tekstit ovat Opuksen
   * luonnoksia lähteineen — Fable tarkistaa ja kirjoittaa lopulliset
   * sanamuodot, kuten Euroopan ulkopuolisessa erässä 5.9.2026.
   *
   * KUVA ON VIELÄ TILAAMATTA. `kuva`-kentässä on kuvaputken oma tunnus
   * ilman kansiota, joten se osoittaa ämpäriin (js/media.js
   * assetOsoite): kun kuvaputki tekee kuvan, se ilmestyy kortille
   * ilman koodimuutosta, ja siihen asti kortti on kuvaton (404 ei
   * kaada mitään, js/elaintaky.js hakee kuvan vasta avatessa).
   */
  GRL: {
    elain: 'gronlanninkoira',
    otsikko: 'Tuhat vuotta valjaissa',
    teksti: 'Grönlanninkoira eli Kalaallit Qimmiat on suuri husky-tyyppinen rekikoira, jonka thulelaiset toivat Siperiasta Pohjois-Amerikkaan noin tuhat vuotta sitten. Rodun puhtautta varjellaan tarkasti: napapiirin pohjoispuolisessa Länsi-Grönlannissa ja koko Itä-Grönlannissa on kiellettyä tuoda maahan mitään muualta tullutta koiraa, ja vuodesta 2017 jokainen koira on mikrosirutettu ja kirjattu rekisteriin. Kanta pienenee silti: vuonna 2016 koiria oli noin 15 000 ja 2021 enää 12 000. Roald Amundsen käytti grönlanninkoiria retkellään etelänavalle.',
    lahde: 'en-Wikipedia "Greenland Dog", johdanto-osa ja osio "History". Tarkistettu 6.9.2026.',
    kuva: 'elain-grl',
    /*
     * Piste on Itä-Grönlannin sisämaassa: rannikko on maailmankartan
     * karkeassa muodossa paikoin merta, ja lähin kaupunkimerkki (Nuuk)
     * jää satojen yksiköiden päähän.
     */
    lon: -32,
    lat: 68.5,
  },
  GTM: {
    elain: 'ketsaali',
    otsikko: 'Lintu, joka on myös raha',
    teksti: 'Ketsaali on Guatemalan kansalliseläin: se on maan lipussa ja vaakunassa, ja maan rahayksikkö on nimetty sen mukaan. Koiraan viheriöivät pyrstösulat ovat pidemmät kuin lintu itse, ja naaras on vaatimattomampi. Laji pesii lahoihin puihin tai tikkojen tekemiin koloihin, ja emot hautovat vuorotellen: koiras päivällä, naaras yöllä. Ketsaali elää sumumetsissä ja vaeltaa vuodenaikojen mukaan rinteiltä latvustoon. Se on luokiteltu silmälläpidettäväksi, ja suurin uhka on elinympäristön häviäminen — Sierra de las Minasin vuoristossa ovat Mesoamerikan laajimmat sumumetsät, ja suuri osa siitä on ollut biosfäärialuetta vuodesta 1990.',
    lahde: 'en-Wikipedia "Resplendent quetzal", johdanto-osa, ja "Sierra de las Minas", '
      + 'johdanto-osa ja osio "Biosphere reserve". Tarkistettu 6.9.2026.',
    kuva: 'elain-gtm',
    // Piste on Sierra de las Minasin sumumetsävyöhykkeellä, 40,9
    // lautayksikköä Guatemala Citystä (vähimmäisetäisyys 35).
    lon: -89.3,
    lat: 15.15,
  },
  NIC: {
    elain: 'guardabarranco',
    otsikko: 'Rotkojen vartija ja sen kellonpyrstö',
    teksti: 'Turkoosikulmamotmot tunnetaan Nicaraguassa nimellä guardabarranco, rotkojen vartija; El Salvadorissa se on torogoz ja Jukatanin mayakielissä pájaro reloj, kellolintu. Nimi tulee pyrstöstä: kaksi pitkää sulkaa päättyy mailanmuotoisiin lippuihin, ja lintu heiluttaa niitä puolelta toiselle kuin kellon heiluria. Heilutus ei ole koristelua vaan viesti pedolle: näen sinut, älä vaivaudu. Toisin kuin useimmilla linnuilla, koreat pyrstösulat ovat molemmilla sukupuolilla. Motmot kaivaa pesäkolonsa tunnelina hiekkatörmään tai kalkkikiven halkeamaan, ja mayat pitivät sitä manalan vartijana, koska se pesi cenotejen reunoilla.',
    lahde: 'en-Wikipedia "Turquoise-browed motmot", johdanto-osa sekä osiot "Behavior" ja '
      + '"Cultural relevance". Tarkistettu 6.9.2026.',
    kuva: 'elain-nic',
    // Piste on Río San Juanin metsäseudulla järven itäpuolella, 61,3
    // lautayksikköä Managuasta (vähimmäisetäisyys 35).
    lon: -84.6,
    lat: 11.7,
  },
  /*
   * ── ERÄ M3, AASIA 6.9.2026 ─────────────────────────────────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erä M3 (HKG, IDN, IND, LKA, MMR) toi kolme uutta eläintäkyä.
   * Intialla oli täky jo ennestään (tiikerinpentu), eikä siihen ole
   * koskettu.
   *
   * HONGKONG JÄI ILMAN TÄKYÄ, JA SYY ON MITATTU. Merkin on oltava
   * vähintään 35 lautayksikön päässä jokaisesta kaupunkimerkistä
   * (tests/elaintakyt.test.mjs VAHIN_ETAISYYS_KAUPUNKIIN), mutta koko
   * Hongkongin alue on 11–20 yksikön päässä omasta laatastaan. Yksikään
   * piste maan rajojen sisällä ei siis kelpaa, joten täky jää siihen
   * asti, kunnes Hongkongille tehdään oma kohdekartta. Ehdokas oli
   * valmiina: Romerin puupuu (Liuixalus romeri), Hongkongin pienin
   * sammakkoeläin, jonka Chek Lap Kokin populaatio siirrettiin talteen
   * 1992 ennen lentoaseman rakentamista.
   *
   * KUVA TULEE KUVAPUTKELTA. Erä on kuvaton, joten `kuva`-kenttään on
   * kirjoitettu pelkkä ämpäritunnus (js/media.js assetOsoite:
   * `kohtaamiset/elaimet/<tunnus>.jpg`). Kun kuvaputki toimittaa
   * kuvan, tiedostoa ei tarvitse lisätä repoon eikä tähän tauluun
   * kirjoittaa riviäkään lisää.
   */
  IDN: {
    elain: 'babirusa',
    otsikko: 'Torahampaat oman kuononsa läpi',
    teksti: 'Babirusat eli hirvisiat ovat sikojen heimoon kuuluva suku, jota tavataan vain Sulawesin, Togianin, Sulan ja Burun saarilla Indonesiassa. Uroksen ylemmät kulmahampaat kasvavat pystysuoraan leukaluun haarakkeesta, puhkaisevat kuonon ihon ja kaartuvat taaksepäin kohti otsaa — alahampaatkin kasvavat ylöspäin. Naaraalla kulmahampaat ovat kituliaat tai puuttuvat kokonaan. Vielä 2002 asti kaikkia pidettiin yhtenä lajina, mutta suku jaettiin silloin useaksi: burunbabirusa elää Burulla ja Sulalla, tunnetuin laji on pohjoissulawesinbabirusa. Kaikki lajit ovat kansainvälisen luonnonsuojeluliiton mukaan uhanalaisia.',
    lahde: 'en-Wikipedia "Babirusa", johdanto ja osio "Description". Tarkistettu 6.9.2026.',
    kuva: 'elain-idn',
    lon: 120.2,
    lat: -1.5,
  },
  LKA: {
    elain: 'sri lankan leopardi',
    otsikko: 'Saaren ainoa huippupeto',
    teksti: 'Sri Lankan leopardi on saarella elävä leopardin alalaji, jonka kuvaili 1956 srilankalainen eläintieteilijä Paulus Edward Pieris Deraniyagala. Turkki on kellanruskea tai ruosteenkeltainen, ja täplät ovat tiheässä ruusukkeina. Koska leopardi on saaren huippupeto eikä sillä ole kilpailijaa, alalaji on kehittynyt kookkaaksi: yksitoista mitattua urosta painoi keskimäärin 56 kiloa ja suurin 77. Lajia tavataan kaikissa saaren elinympäristöissä aavikkovyöhykkeeltä sademetsään, ja keskiylängöllä se on kirjattu myös teeviljelmiltä, männiköistä ja kotipuutarhoista. Vuodesta 2020 se on ollut vaarantunut: aikuisia yksilöitä arvioidaan olevan alle 800.',
    lahde: 'en-Wikipedia "Sri Lankan leopard", johdanto sekä osiot "Characteristics" '
      + 'ja "Distribution and habitat". Tarkistettu 6.9.2026.',
    kuva: 'elain-lka',
    lon: 81.4,
    lat: 6.4,
  },
  MMR: {
    elain: 'surkkunenäapina',
    otsikko: 'Apina, joka aivastaa sateessa',
    teksti: 'Myanmarinsurkkunenäapina löydettiin vuonna 2010 Kachinin osavaltion koillisosasta Gaoligongin vuorilta, ja se kuvailtiin uudeksi lajiksi 2011 turkkinsa, partansa ja häntänsä perusteella. Lisujen kielellä sen nimi on mey nwoah ja law waw -kansan kielellä myuk na tok te; molemmat tarkoittavat apinaa, jonka kasvot ovat ylöspäin. Nykerönenän ympärillä on niin vähän lihaa, että sateen kerrotaan saavan eläimen aivastelemaan — seudun ihmisten mukaan se istuu sateella pää painuksissa kasvot polvien välissä. Löytöretkikuntaa johtivat sveitsiläinen kädellistutkija Thomas Geissmann ja Ngwe Lwin, ja laji on äärimmäisen uhanalainen.',
    lahde: 'en-Wikipedia "Myanmar snub-nosed monkey", johdanto ja osio '
      + '"Discovery and taxonomy". Tarkistettu 6.9.2026.',
    kuva: 'elain-mmr',
    lon: 97.8,
    lat: 26.3,
  },
  /*
   * ── ERÄ M5, AFRIKKA 6.9.2026 ───────────────────────────────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erä M5 (SDS, AGO, CMR, COD, DZA) toi viisi uutta eläintäkyä; yhdellä
   * viidestä maasta ei ollut täkyä ennestään, joten yhtäkään vanhaa
   * tietuetta ei ole koskettu.
   *
   * PAIKKA ON MITATTU IRTI KAUPUNGEISTA. Jokainen piste on maan rajojen
   * sisällä ja vähintään 35 lautayksikön päässä jokaisesta
   * kaupunkimerkistä (tests/elaintakyt.test.mjs
   * VAHIN_ETAISYYS_KAUPUNKIIN) sekä 30 yksikön päässä muista täyistä.
   * Kamerunin piste haettiin koneellisella haravoinnilla: koko rannikon
   * kaita, jossa goliattisammakko elää, on 26–36 yksikön päässä
   * Kamerun-laatasta, joten täky on vyöhykkeen pohjoispäässä.
   *
   * KUVA TULEE KUVAPUTKELTA. Erä on kuvaton, joten `kuva`-kentässä on
   * pelkkä ämpäritunnus (js/media.js assetOsoite:
   * `kohtaamiset/elaimet/<tunnus>.jpg`). Kun kuvaputki toimittaa kuvan,
   * se ilmestyy kortille ilman koodimuutosta.
   */
  DZA: {
    elain: 'fennekki',
    otsikko: 'Korvat, jotka kuulevat hiekan alle',
    teksti: 'Fennekki on Pohjois-Afrikan aavikoiden pikkukettu ja maailman pienin koiraeläin: naaras painaa 1–1,9 kiloa ja on rungoltaan 34,5–39,5 senttiä pitkä. Sen tuntomerkki ovat suhteettoman suuret korvat, jotka ovat koiraeläinten suurimmat suhteessa ruumiiseen — ne haihduttavat lämpöä ja kuulevat saaliin liikkeet hiekan alta. Turkki on hiekan värinen, se heijastaa päivällä auringon ja pitää yöllä lämpimänä, ja käpälien anturat ovat tiheän karvan peitossa, jotta kuumalla hiekalla voi kävellä. Munuaiset ovat suuret ja tiiviit ja säästävät vettä kuivina aikoina. Fennekit kaivavat perheittäin hiekkaan koloja, jotka voivat olla 120 neliömetrin laajuisia ja joiden käytävät yhtyvät naapuriperheiden koloihin. Ravinto on hyönteisiä, pikkunisäkkäitä ja lintuja; poikasia saalistaa aavikkohuuhkaja, ja aikuisiakin sakaalit ja tarhahyeenat.',
    lahde: 'en-Wikipedia "Fennec fox", johdanto sekä osiot "Characteristics" ja '
      + '"Distribution and habitat". Tarkistettu 6.9.2026.',
    kuva: 'elain-dza',
    // Piste on Saharan hiekkatasangolla Keski-Algeriassa, 219,3
    // lautayksikköä Sahara-laatasta (vähimmäisetäisyys 35).
    lon: 2.0,
    lat: 27.5,
  },
  AGO: {
    elain: 'jättiläisseeprantilooppi',
    otsikko: 'Antilooppi, joka löydettiin kahdesti',
    teksti: 'Jättiläisseeprantilooppi on vain Angolan keskiylängöllä elävä seeprantiloopin alalaji, jonka kuvaili 1916 brittiläinen eläintieteilijä Oldfield Thomas. Nimen lisäosa variani muistaa Frank Variania, Benguelan rataa rakentanutta insinööriä, joka toi eläimen tieteen tietoon. Nimi jättiläinen viittaa sonnin sarviin, jotka ovat kaikista seeprantiloopeista pisimmät: usein yli 129 senttiä ja pisimmillään mitattuna 165. Aikuinen sonni on kiiltävän musta ja painaa noin 240 kiloa, lehmät jäävät ruskeiksi kuten vasat. Laji katosi sisällissodan vuosiksi ja löydettiin uudelleen, mutta kaikki kuvatut yksilöt olivat naaraita; 2009 sonni paikannettiin ulostenäytteiden DNA:n avulla Luandon luonnonpuistosta ja siirrettiin helikopterilla Cangandalan aitaukseen. Kanta on äärimmäisen uhanalainen: vuonna 2026 yksilöitä arvioidaan olevan noin 310 kahdeksassa laumassa.',
    lahde: 'en-Wikipedia "Giant sable antelope", johdanto sekä osiot "Taxonomy", "Discovery", '
      + '"Description" ja "Distribution and habitat". Tarkistettu 6.9.2026.',
    kuva: 'elain-ago',
    // Piste on Luandon luonnonpuiston seudulla Kwanzan ja Luandon
    // välissä, 60,4 lautayksikköä Angola-laatasta (vähimmäisetäisyys 35).
    lon: 17.5,
    lat: -11.0,
  },
  CMR: {
    elain: 'goliattisammakko',
    otsikko: 'Sammakko, joka rakentaa poikasilleen altaan',
    teksti: 'Goliattisammakko on maailman suurin sammakko: ruumis voi olla 32 senttiä ja paino 3,3 kiloa, ja jalat ojennettuina pisimmät yksilöt ylittävät 80 senttiä. Levinneisyys on hyvin kapea — vain Kamerunin ja Päiväntasaajan Guinean rannikon suuntainen tiheä sademetsäkaita, jossa se elää koskien ja putousten äärellä Sanagan, Kienken, Ntemin ja Mbían vesistöissä. Sillä ei ole ääntä vahvistavaa kurkkupussia, joten se ei kutsu puolisoa kurnuttamalla. Sen sijaan se rakentaa: koiras raivaa jokialtaan puhtaaksi, patoaa vanhan lammikon tai kaivaa uuden, metrin levyisen ja kymmenen sentin syvyisen kuopan sorapenkkaan ja siirtää siinä sivussa isojakin kiviä. Naaras vartioi pesää öisin, ja toukkavaihe kestää 85–95 päivää. Juuri pesänrakennus saattaa selittää lajin koon: raskaita kiviä siirtää parhaiten iso sammakko.',
    lahde: 'en-Wikipedia "Goliath frog", johdanto sekä osiot "Description", "Habitat and '
      + 'distribution" ja "Reproduction". Tarkistettu 6.9.2026.',
    kuva: 'elain-cmr',
    // Piste on rannikon suuntaisessa metsävyöhykkeessä Sanagan ja
    // Ntemin altaiden välissä, 36,5 lautayksikköä Kamerun-laatasta
    // (vähimmäisetäisyys 35).
    lon: 9.9,
    lat: 3.4,
  },
  COD: {
    elain: 'bonobo',
    otsikko: 'Joki, joka teki kahdesta lajista kaksi',
    teksti: 'Bonobo on ihmisapinoista pienin ja yhdessä simpanssin kanssa ihmisen lähin nykyinen sukulainen. Sitä tavataan vain Kongon demokraattisen tasavallan alueella, noin 500 000 neliökilometrin laikulla Kongo-joen eteläpuolella. Juuri joki teki lajin: kun Kongo muotoutui 1,5–2 miljoonaa vuotta sitten, huono uimari jäi sen eteläpuolelle ja erkani simpanssin esivanhemmista, jotka jäivät pohjoispuolelle. Bonobo on hoikempi kuin simpanssi — kapeat hartiat, ohut kaula, pitkät sääret, mustat kasvot, vaaleanpunaiset huulet ja päälaella jakaukselle asettuva pitkä karva. Ravinto on enimmäkseen hedelmiä. Laumat ovat epätavallisia ihmisapinoiden joukossa siinä, että naaraat pitävät niissä valtaa: yhteen liittoutuneet naaraat voivat olla koiraiden vertaisia tai näitä vahvempia. Villissä luonnossa lajia on tutkittu vähän, koska bonobo on arka ja seutu levoton.',
    lahde: 'en-Wikipedia "Bonobo", johdanto sekä osiot "Description" ja "Behavior and '
      + 'ecology". Tarkistettu 6.9.2026.',
    kuva: 'elain-cod',
    // Piste on Kongo-joen eteläpuolisessa sademetsässä Salongan
    // pohjoispuolella, 288,2 lautayksikköä Kongo-laatasta
    // (vähimmäisetäisyys 35).
    lon: 20.5,
    lat: -0.5,
  },
  SDS: {
    elain: 'kenkänokka',
    otsikko: 'Kenkä, jolla on siivet',
    teksti: 'Kenkänokka on kookas pitkäjalkainen kahlaaja, joka on saanut nimensä valtavasta kengänmuotoisesta nokastaan. Se muistuttaa haikaraa ja luokiteltiin pitkään sellaiseksi, mutta geenit siirsivät sen pelikaanien ja haikaroiden sukulaiseksi; lähin sukulainen on vasarapää. Lintu on 110–140 senttiä korkea, siipiväli on 230–260 senttiä ja paino 4–7 kiloa. Nokka on vaaleanpunainen, harmaakirjava ja koukkupäinen, ja sen selkäharja on kolmanneksi pisin nykylinnuista pelikaanien ja suurten haikaroiden jälkeen. Jalat ovat pitkät ja jalkaterät poikkeuksellisen suuret — keskivarvas on 17–18 senttiä — mikä auttaa lintua seisomaan kelluvan kasvillisuuden päällä saalista väijyessään. Aikuisen höyhenpuku on siniharmaa, poikasen ruskeampi. Laji elää Itä-Afrikan suurilla soilla Etelä-Sudanista Sambiaan, ja englantilainen John Gould kuvasi sen 1850 Valkoiselta Niililtä tuodusta nahasta.',
    lahde: 'en-Wikipedia "Shoebill", johdanto sekä osiot "Taxonomy" ja "Description". '
      + 'Tarkistettu 6.9.2026.',
    kuva: 'elain-sds',
    // Piste on Suddin kosteikossa Valkoisen Niilin varrella, 113,7
    // lautayksikköä Bahr el Ghazal -laatasta (vähimmäisetäisyys 35).
    lon: 30.4,
    lat: 7.5,
  },
  /*
   * ── ERÄ M8, AASIA 2 6.9.2026 ───────────────────────────────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erä M8 (NPL, THA, VNM, SGP, TLS) toi kolme uutta eläintäkyä.
   * Nepalilla oli täky jo ennestään, eikä siihen ole koskettu.
   *
   * SINGAPORE JÄI ILMAN TÄKYÄ, JA SYY ON MITATTU. Merkin on oltava
   * vähintään 35 lautayksikön päässä jokaisesta kaupunkimerkistä
   * (tests/elaintakyt.test.mjs VAHIN_ETAISYYS_KAUPUNKIIN), mutta
   * jokainen piste Singaporen alueella on 12,6–21,6 yksikön päässä
   * omasta laatastaan. Sama este kuin Hongkongilla erässä M3. Ehdokas
   * odottaa valmiina: sarvinokkalintu (Anthracoceros albirostris),
   * joka katosi Singaporesta 1800-luvulla ja palasi Pulau Ubinille
   * 1990-luvulla.
   *
   * KUVA TULEE KUVAPUTKELTA. Erä on kuvaton, joten `kuva`-kenttään on
   * kirjoitettu pelkkä ämpäritunnus (js/media.js assetOsoite:
   * `kohtaamiset/elaimet/<tunnus>.jpg`).
   */
  THA: {
    elain: 'kimalaislepakko',
    otsikko: 'Maailman pienin nisäkäs asuu kalkkikiviluolassa',
    teksti: 'Kittin sikanokkalepakko eli kimalaislepakko on ainoa elossa oleva laji heimossaan, ja se elää Länsi-Thaimaan ja Kaakkois-Myanmarin kalkkikiviluolissa jokien varsilla. Ruumis on 29–33 millimetriä pitkä ja paino noin kaksi grammaa: se on maailman pienin lepakko ja ruumiinpituudeltaan pienimpiä nisäkkäitä — kilpailija on etruskipäästäinen, joka voi olla kevyempi mutta on selvästi pidempi. Kuono on turvonnut ja sian kärsää muistuttava, siivet ovat suuret ja pitkäkärkiset, joten eläin osaa leijua paikallaan. Yhdessä luolassa on keskimäärin sata yksilöä, ja parvi lentää saalistamaan vain lyhyen ajan illalla ja aamunkoitteessa. Thaimaassa laji tunnetaan vain Kanchanaburin Sai Yokin piiristä.',
    lahde: 'en-Wikipedia "Kitti\'s hog-nosed bat", johdanto sekä osiot "Description", '
      + '"Taxonomy" ja "Range and habitat". Tarkistettu 6.9.2026.',
    kuva: 'elain-tha',
    // Piste on Sai Yokin kalkkikivialueella Khwae Noin latvoilla, 60,2
    // lautayksikköä Bangkokista (vähimmäisetäisyys 35).
    lon: 98.8,
    lat: 14.4,
  },
  VNM: {
    elain: 'saola',
    otsikko: 'Aasian yksisarvinen, jota kukaan ei ole nähnyt vuoden 2013 jälkeen',
    teksti: 'Saola on Annamin vuoriston sademetsissä Vietnamissa ja Laosissa elävä nautaeläin, joka kuvailtiin tieteelle vasta 1993, kun Vietnamin metsätalousministeriön ja WWF:n yhteinen retkikunta löysi jäänteitä Vũ Quangin kansallispuistosta. Nimi tulee Vietnamin tai-kielestä ja tarkoittaa rukin pylvään sarvea: molemmilla sukupuolilla on pari lähes yhdensuuntaisia, pitkiä sarvia. Turkki on suklaanruskea, kasvoissa, kurkussa ja kaulan sivuilla on valkoisia laikkuja ja selässä musta juova. Laosin hmongit kutsuvat sitä nimellä saht-supahp, kohtelias eläin, koska se liikkuu metsässä äänettömästi. Viimeisin havainto on liiketunnistimella varustetun kameran kuva Keski-Vietnamin metsästä vuodelta 2013, ja laji on äärimmäisen uhanalainen.',
    lahde: 'en-Wikipedia "Saola", johdanto sekä osiot "Etymology" ja '
      + '"Description". Tarkistettu 6.9.2026.',
    kuva: 'elain-vnm',
    // Piste on Vũ Quangin seudulla Annamin vuoristossa, 92,8
    // lautayksikköä Hanoista (vähimmäisetäisyys 35).
    lon: 105.4,
    lat: 18.35,
  },
  TLS: {
    elain: 'timorinpeippo',
    otsikko: 'Riisivaras, jolla on hopeansininen nokka',
    teksti: 'Timorinpeippo on noin neljäntoista senttimetrin pituinen pulska varpuslintu: tummanruskea, iso hopeansininen nokka, valkoinen poski, vaaleanpunaiset jalat ja kermanvalkoinen vatsa. Koiras ja naaras näyttävät samalta. Laji muistuttaa lähisukulaistaan riisipeippoa mutta on pienempi ja väritykseltään toisenlainen. Sitä tavataan vain Itä-Timorissa, Länsi-Timorissa sekä Semaun ja Roten saarilla, ja se viihtyy alavilla ruohostoilla ja laidunmailla, korkeintaan noin 700 metrin korkeudessa. Ravinto on riisiä ja siemeniä, ja Itä-Timorissa lintua pidetään merkittävänä riisintuholaisena — riisinviljelyn laajeneminen on todennäköisesti hyödyttänyt sitä. Elinympäristöjen katoaminen ja laiton pyynti häkkilinnuksi ovat tehneet lajista silmälläpidettävän.',
    lahde: 'en-Wikipedia "Timor sparrow", johdanto sekä osiot "Description", '
      + '"Distribution and habitat" ja "Relationships with humans". '
      + 'Tarkistettu 6.9.2026.',
    kuva: 'elain-tls',
    // Piste on Itä-Timorin itäosan alavilla mailla, 47,4 lautayksikköä
    // Dilistä (vähimmäisetäisyys 35). Matebianin nimiö oli lännempänä
    // päällekkäin (tools/tarkista-nimiolimitys.mjs).
    lon: 127.0,
    lat: -8.55,
  },

  /* ==================== MAAILMAN ERÄ M6, LÄHI-ITÄ (6.9.2026) =========
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Neljä uutta täkyä: CYP, OMN, ARE ja KWT. Qatar jäi ilman, ja syy on
   * mitattu eikä arvattu: merkin on oltava vähintään 35 lautayksikön
   * päässä jokaisesta kaupunkimerkistä (tests/elaintakyt.test.mjs), ja
   * koko Qatarin maa-alueen kaukaisin piste Dohasta on 31,8 yksikköä.
   * Sama tilanne kuin Hongkongissa erässä M3. Kaikki neljä ovat
   * KUVATTOMIA: `kuva`-kentässä on kuvaputken ämpäritunnus ilman
   * kansiota, ja kun kuva syntyy, se ilmestyy kortille ilman
   * koodimuutosta.
   *
   * Saudi-Arabialla on jo arabianoryksi, joten sitä ei toisteta (N3).
   * ================================================================ */
  CYP: {
    elain: 'kyproksenpöllönen',
    /*
     * Karttanimi (js/elaintaky.js elaintakyNimio): "kyproksenpöllönen"
     * on 17 merkkiä ja sen nimiölaatikko meni Asinoun kirkon nimiön
     * päälle (tools/tarkista-nimiolimitys.mjs). Lyhennys on lajin oma
     * sukunimi — Otus-suvun linnut ovat suomeksi pöllösiä — eikä siis
     * keksitty nimi; sama sopimus kuin Kreikan merikilpikonnalla.
     */
    nimio: 'pöllönen',
    otsikko: 'Kaksi nuottia pimeässä',
    teksti: 'Kyproksenpöllönen (Otus cyprius) on pieni pöllö, jota ei tavata missään muualla kuin Kyproksella. Pitkään sitä pidettiin samana lajina kuin kyläpöllöstä, mutta kolme eroa erottaa ne: kyproksenpöllösen laulu on kaksinuottinen eikä yksinuottinen, siltä puuttuu ruskeanpunainen värimuoto kokonaan, ja sen höyhenpuku on tummempi. Laji pesii koloissa — luonnon omissa, rakennusten raoissa ja pöntöissä — ja se on tarpeen, sillä saarella ei ole yhtään tikkalajia ja kalabrianmänty tekee koloja vasta vanhana. Pöllöstä on tavattu merenpinnan tasolta 1 900 metriin asti, ja koska saaren korkein kohta on 1 952 metriä, se elää käytännössä koko saarella. Akamasin niemimaalla, jossa tämä merkki on, se on osa niemen omaa eläimistöä hedelmälepakoiden, siilien ja kettujen rinnalla.',
    lahde: 'en-Wikipedia "Cyprus scops owl", johdanto sekä osiot "Taxonomy and systematics", '
      + '"Distribution and habitat" ja "Breeding", ja en-Wikipedia "Akamas", osio "Biology '
      + 'and ecology". Tarkistettu 6.9.2026.',
    kuva: 'elain-cyp',
    lon: 32.29,
    lat: 35.06,
  },
  OMN: {
    elain: 'arabianleopardi',
    otsikko: 'Kaksikymmentä jäljellä',
    teksti: 'Arabianleopardi (Panthera pardus nimr) on leopardin alalajeista pienin, ja se kuvailtiin tieteelle 1830. Vielä 1970-luvun lopulla se eli laajalti Arabian niemimaan karuilla kukkuloilla ja vuorilla, mutta kanta on nyt pahasti pirstoutunut ja pienenee yhä. Vuonna 2008 arvioitiin, että jäljellä on 45–200 yksilöä kolmena erillisenä osakantana Länsi-Saudi-Arabiassa, Omanissa ja Jemenissä; vuoden 2023 arvio on 100–120 yksilöä Omanissa ja Jemenissä, joista 70–84 aikuista, ja Saudi-Arabiasta laji on mahdollisesti hävinnyt kokonaan. Yksi viimeisistä turvapaikoista on Dhofarin Jabal Samhanin luonnonsuojelualue, 4 500 neliökilometriä vuoristoa ilman vakinaista asutusta. Alueella arvioidaan elävän noin kaksikymmentä arabianleopardia.',
    lahde: 'en-Wikipedia "Arabian leopard", johdanto, ja en-Wikipedia "Jabal Samhan Nature '
      + 'Reserve", johdanto. Tarkistettu 6.9.2026.',
    kuva: 'elain-omn',
    lon: 55.0,
    lat: 17.3,
  },
  ARE: {
    elain: 'arabiantahri',
    otsikko: 'Vuohi, joka juo joka kolmas päivä',
    teksti: 'Arabiantahri (Arabitragus jayakari) on tahreista pienin: tanakka vuorivuohi, jonka sarvet kaartuvat taaksepäin sekä uroksilla että naarailla. Turkki on pitkä ja punaruskea, ja selkää pitkin kulkee tumma juova; vanhimmilla uroksilla kuono ja silmäjuovat tummuvat mustiksi ja harja kasvaa pitkäksi. Kaviot ovat kuin kumia, jotta ne pitävät jyrkillä kalliorinteillä. Laji elää Hajarin vuorten rinteillä Omanissa ja Arabiemiirikunnissa aina 1 800 metriin asti sekä Jebel Hafeetin seudulla. Toisin kuin muut tahrit se ei muodosta laumoja vaan kulkee yksin tai pienenä perheenä. Kesällä sen on juotava kahden tai kolmen päivän välein, ja siksi se laskeutuu wadeihin — juuri silloin se on salametsästäjän ulottuvilla. Oldfield Thomas kuvasi lajin 1894, ja vuonna 2018 villikannaksi arvioitiin noin 2 450 yksilöä.',
    lahde: 'en-Wikipedia "Arabian tahr", johdanto sekä osiot "Description", "Habitat and '
      + 'range", "Behaviour and ecology" ja "Threats". Tarkistettu 6.9.2026.',
    kuva: 'elain-are',
    lon: 56.25,
    lat: 25.4,
  },
  KWT: {
    elain: 'hietakissa',
    otsikko: 'Korvat matalalla, kuulo maassa',
    teksti: 'Hietakissa (Felis margarita) on pieni villikissa, joka elää hiekka- ja kiviaavikoilla kaukana vesipaikoista. Turkki on hiekanvärinen tai vaaleanharmaa, joten eläin katoaa maastoon. Ruumis on 39–52 senttiä ja häntä 23–31 senttiä. Korvat ovat vain 5–7 senttiä ja ne istuvat matalalla pään sivuilla — siitä on hyötyä, kun saalis liikkuu hiekan alla. Käpälänpohjia peittää pitkä karva, joka eristää anturat aavikon kuumuudelta ja kylmyydeltä. Päivät kissa lepää maanalaisessa pesässä ja metsästää öisin, jolloin se kulkee keskimäärin 5,4 kilometriä pieniä jyrsijöitä ja lintuja etsien; se tappaa ja syö myös myrkkykäärmeitä. Keväällä naaras synnyttää kaksi tai kolme poikasta. Laji kuvailtiin tieteelle 1858 Algerian Saharasta, ja se kuuluu Kuwaitin noin kahdenkymmenenkahdeksan nisäkäslajin joukkoon.',
    lahde: 'en-Wikipedia "Sand cat", johdanto, ja en-Wikipedia "Wildlife of Kuwait", osio '
      + '"Fauna". Tarkistettu 6.9.2026.',
    kuva: 'elain-kwt',
    lon: 46.7,
    lat: 29.2,
  },
  /* ==================================================================
   * MAAILMAN ERÄ M9, LÄHI-ITÄ 2 (6.9.2026). Omistaja 6.9.2026: *"Jatka
   * kartta nostojen tekoa koko maailmaan."* Neljä uutta eläintäkyä
   * (IRN, JOR, IRQ, EGY); Saudi-Arabialla oli jo arabianoryksi.
   * Kuvattomia: `kuva`-kentässä on kuvaputken ämpäritunnus ilman
   * kansiota, ja kun kuva valmistuu, se ilmestyy kortille ilman
   * koodimuutosta. Jokainen piste on maan rajojen sisällä, maalla ja
   * vähintään 35 lautayksikön päässä jokaisesta kaupunkimerkistä
   * (tests/elaintakyt.test.mjs); etäisyys on kirjattu pisteen viereen.
   * Egyptin fennekki olisi toistanut Algerian eläintäyn ja Jordanian
   * nubiantorvikauris olisi Egyptissä toistunut, joten Egyptiin
   * valittiin egyptinmangusti.
   * ================================================================ */
  IRN: {
    elain: 'persianonageri',
    otsikko: 'Aavikon villiaasi, jota persiaksi sanotaan seepraksi',
    teksti: 'Persianonageri on Iranissa elävä aasianvillaasin alalaji, ja se on luokiteltu äärimmäisen uhanalaiseksi: villinä niitä on enintään noin kuusisataa. Eläin on 2–2,5 metriä pitkä ja 200–260 kiloa painava, ja sen turkki on hiekanpunainen, selässä ruskea juova ja sen molemmin puolin ohuet valkoiset raidat, jotka sulautuvat takaruumiin valkoiseen läiskään. Persiaksi laji tunnetaan nimellä gur, joka tarkoittaa seepraa, ja sana onageri tulee kreikan villiaasia tarkoittavasta sanasta onagros. Aasianvillaasi oli aikoinaan yleinen Lähi-idästä Kiinaan, mutta 1800-luvulta lähtien kanta on romahtanut muutamaan tuhanteen. Persianonageri viihtyy vuoristoaroilla, puoliaavikoilla ja aavikkotasangoilla, ja sen suurin kanta elää Khar Turanin kansallispuistossa. Suurimmat uhat ovat salametsästys lihan ja nahan takia, kilpailu karjan kanssa sekä kuivuus.',
    lahde: 'en-Wikipedia "Persian onager", johdanto sekä osiot "Description", "Taxonomy and '
      + 'history", "Habitat and distribution" ja "Threats". Tarkistettu 6.9.2026.',
    kuva: 'elain-irn',
    // Piste on Khar Turanin aroylängöllä, 140,8 lautayksikköä
    // Teheranista (vähimmäisetäisyys 35).
    lon: 55.6,
    lat: 35.3,
  },
  JOR: {
    elain: 'nubiantorvikauris',
    otsikko: 'Aavikon vuohi, joka opittiin tuntemaan Ylä-Egyptistä',
    teksti: 'Nubiantorvikauris on aavikoilla elävä vuohilaji, jota tavataan Pohjois- ja Koillis-Afrikan sekä Lähi-idän vuoristoseuduilla. Sitä pidettiin pitkään alppikauriin alalajina, mutta nykyään se luetaan omaksi lajikseen; Frédéric Cuvier kuvasi sen tieteelle 1825 nimellä "Ylä-Egyptin villivuohi". Se on torvikauriista pienin, säkäkorkeus 65–75 senttimetriä, ja koiraat ovat selvästi naaraita suurempia: koiras painaa 52–75 ja naaras 25–33 kiloa. Villikanta on arviolta 4 500 aikuista yksilöä, ja laji on luokiteltu vaarantuneeksi. Jordaniassa se oli lähellä hävitä kokonaan, mutta maa on palauttanut kannan tarhakasvatuksella ja istutuksilla: yksilöitä on 480–600, ja vahvimmat kannat elävät Danan, Wadi Mujibin ja Wadi Rumin suojelualueilla. Suurin uhka on metsästys. Kauris on ollut Lähi-idän taiteen aihe tuhansia vuosia — kalliopiirroksissa sitä ajavat koirat ja jousimiehet.',
    lahde: 'en-Wikipedia "Nubian ibex", johdanto sekä osiot "Classification", "Description", '
      + '"Distribution", "Conservation and population status by country" ja "Cultural significance". Tarkistettu 6.9.2026.',
    kuva: 'elain-jor',
    // Piste on Mujibin ylängöllä Kuolleenmeren itäpuolella, 40,5
    // lautayksikköä Petrasta (vähimmäisetäisyys 35).
    lon: 35.75,
    lat: 30.85,
  },
  IRQ: {
    elain: 'basranruokokerttunen',
    otsikko: 'Kerttunen, joka menetti kotisuonsa',
    teksti: 'Basranruokokerttunen on kerttusiin kuuluva pikkulintu, joka pesii lähes yksinomaan Tigriin ja Eufratin jokijärjestelmässä: Lounais-Iranissa, Itä- ja Etelä-Irakissa sekä Kuwaitissa, ja viime aikoina se on levittäytynyt myös Israelin kosteikoille. Se pesii laajoissa papyrus- ja ruovikoissa ja viihtyy matalan makean tai murtoveden äärellä tiheässä ruovikossa. Lajin erottaa helposti sekoittuvasta rastaskerttusesta pienemmästä koosta, valkoisemmasta alapuolesta ja kapeammasta, pidemmästä ja terävämmästä nokasta; ääni on karhea chaar, syvempi kuin rytikerttusen. Lintu on muuttaja ja talvehtii Itä-Afrikassa, Euroopassa se on hyvin harvinainen harhailija. Kun Mesopotamian suot kuivattiin 1980- ja 1990-luvuilla ja lajin oma elinympäristö tuhoutui lähes kokonaan, siitä tuli erittäin uhanalainen.',
    lahde: 'en-Wikipedia "Basra reed warbler", johdanto ja seuraavat kappaleet. Tarkistettu '
      + '6.9.2026.',
    kuva: 'elain-irq',
    // Piste on Mesopotamian soilla Eufratin ja Tigriin välissä, 71,6
    // lautayksikköä Kuwaitista (vähimmäisetäisyys 35).
    lon: 47.0,
    lat: 31.0,
  },
  EGY: {
    elain: 'egyptinmangusti',
    otsikko: 'Käärmeensyöjä, jolle omistettiin patsaita',
    teksti: 'Egyptinmangusti on mangustilaji, jota elää Afrikan ruohostoilla ja pensaikoissa sekä Välimeren ympärillä Pohjois-Afrikassa, Lähi-idässä ja Iberian niemimaalla. Karkea turkki on harmaasta punaruskeaan ja pilkullinen ruskeasta ja keltaisesta, kuono on terävä ja korvat pienet; solakka ruumis on 48–60 senttimetriä ja mustakärkinen häntä 33–54, paino 1,7–4 kiloa. Hampaita on 35–40, ja lihaa leikkaavat petohampaat ovat pitkälle kehittyneet. Laji ei elä aavikolla vaan soilla ja kosteikoilla purojen, jokien ja järvien lähellä sekä rannikoilla. Se hyökkää myrkkykäärmeiden kimppuun ja kestää muun muassa aavikkokobran ja sarvikyyn myrkkyä. Muinaisessa Egyptissä eläin tunnettiin hyvin: Saqqarasta Anubiksen katakombeista on kaivettu neljä muumioitua egyptinmangustia, Beni Hasanin hautamaalauksessa mangusti kulkee talutushihnassa, ja jumalatar Mafdet, joka suojeli ihmisiä käärmeen ja skorpionin myrkyltä, yhdistettiin siihen.',
    lahde: 'en-Wikipedia "Egyptian mongoose", johdanto sekä osiot "Characteristics", '
      + '"Distribution and habitat", "Behaviour and ecology" ja "In culture". Tarkistettu 6.9.2026.',
    kuva: 'elain-egy',
    // Piste on Niilin suistossa, 44,1 lautayksikköä Kairosta
    // (vähimmäisetäisyys 35).
    lon: 31.3,
    lat: 31.2,
  },
  /*
   * ── ERÄ M10, AASIA 3 6.9.2026 ──────────────────────────────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erä M10 (JPN, KOR, TWN, KAZ, MNG) toi neljä uutta eläintäkyä.
   * Japanilla oli täky jo ennestään, eikä siihen ole koskettu.
   *
   * PAIKAT ON MITATTU. Jokainen piste on oman maansa rajojen sisällä,
   * maalla ja vähintään 35 lautayksikön päässä jokaisesta
   * kaupunkimerkistä (tests/elaintakyt.test.mjs
   * VAHIN_ETAISYYS_KAUPUNKIIN) sekä 30 yksikön päässä muista
   * eläintäyistä. Tiukin tapaus on Taiwan: saaren Taipei-laatta on
   * laudalla keskellä saarta, joten karhun piste oli haettava saaren
   * eteläosasta (etäisyys 49,7).
   *
   * KUVA TULEE KUVAPUTKELTA. Erä on kuvaton, joten `kuva`-kentässä on
   * pelkkä ämpäritunnus (js/media.js assetOsoite:
   * `kohtaamiset/elaimet/<tunnus>.jpg`).
   */
  KOR: {
    elain: 'korean vesihirvi',
    otsikko: 'Hirvi ilman sarvia mutta torahampain',
    teksti: 'Vesihirvi on pieni hirvieläin, jota tavataan vain Koreassa ja Kiinassa, ja korean vesihirvi on sen kahdesta alalajista toinen. Se on ainoa nykyinen hirvieläin, jolla on näkyvät torahampaat: kummallakaan sukupuolella ei ole sarvia, mutta uroksen alaspäin osoittavat kulmahampaat ovat sen ase reviiritappeluissa. Ruumis on 100–140 senttimetriä pitkä ja säkäkorkeus 61–81 senttimetriä, takajalat ovat etujalkoja pidemmät ja eläin juoksee jäniksen tavoin loikkien. Kesäturkki on keltaisenpunaruskea ja talviturkki harmaanruskea, alapuoli valkoinen. Suomalaisen korvaan nimi kuulostaa oudolta, mutta se on osuva: laji viihtyy jokivarsilla korkeiden ruokojen ja kaislojen suojassa, ui hyvin ja pääsee uimalla kaukaisillekin jokisaarille — vaikka sitä nähdään myös vuorilla, soilla, niityillä ja pelloilla. Koreassa lajia kutsutaan nimellä gorani, ja siellä se voi hyvin: kun korean tiikeri ja pantteri hävisivät, luontaiset saalistajat loppuivat, ja Etelä-Koreassa vesihirviä arvioidaan olevan 700 000.',
    lahde: 'en-Wikipedia "Water deer", johdanto sekä osiot "Taxonomy", '
      + '"Physical attributes", "Behaviour", "Habitat and distribution" ja '
      + '"South Korea". Tarkistettu 6.9.2026.',
    kuva: 'elain-kor',
    // Piste on Etelä-Korean sisämaassa Taebaekin vuoriston länsipuolella,
    // 49,1 lautayksikköä Soulista (vähimmäisetäisyys 35).
    lon: 128.4,
    lat: 37.2,
  },
  TWN: {
    elain: 'formosanmustakarhu',
    otsikko: 'Kuukarhu, jonka rinnassa on V',
    teksti: 'Formosanmustakarhu on aasianmustakarhun alalaji, joka elää vain Taiwanissa. Se on saaren suurin maaeläin ja sen ainoa alkuperäinen karhu, ja britti Robert Swinhoe kuvaili sen tieteelle 1864. Karhu on tanakka, pää pyöreä, kaula lyhyt ja kuono pitkä — kuono muistuttaa koiran kuonoa, ja siitä tulee lisänimi koirakarhu. Rinnassa on selvä keltainen tai valkoinen merkki, joka on V-kirjaimen tai kuunsirpin muotoinen, ja siitä puolestaan lisänimi kuukarhu. Paino on 50–200 kilogrammaa. Ravinto on enimmäkseen lehtiä, silmuja, hedelmiä ja juuria, mutta myös hyönteisiä, pikkueläimiä ja raatoja: keväällä mehevää kasvillisuutta, kesällä pehmeitä hedelmiä ja syksyllä rasvaisia pähkinöitä ja tammenterhoja. Ennen karhuja oli kaikkialla Taiwanissa, mutta nyt ne ovat vetäytyneet vuoristoon tuhannen ja kolmen ja puolen kilometrin korkeuden välille. Metsästys ja elinympäristöjen häviäminen ovat vieneet kannan pieneksi: yksilöitä arvioidaan olevan 200–600, ja laji rauhoitettiin uhanalaisena 1989.',
    lahde: 'en-Wikipedia "Formosan black bear", johdanto sekä osiot '
      + '"Physical characteristics", "Diet", "Distribution" ja '
      + '"Habitat and behavior". Tarkistettu 6.9.2026.',
    kuva: 'elain-twn',
    // Piste on Keski-Taiwanin vuoriston eteläosassa, 49,7 lautayksikköä
    // Taipeista (vähimmäisetäisyys 35). Saaren pohjois- ja keskiosaan ei
    // mahtunut: Taipei-laatta on laudalla keskellä saarta.
    lon: 120.8,
    lat: 22.6,
  },
  KAZ: {
    elain: 'saiga',
    otsikko: 'Aron antilooppi, jolla on kärsä',
    teksti: 'Saiga on antilooppi, joka tunnetaan alaspäin suuntautuvasta parista pullistuneita sieraimia — kuononsa takia se näyttää siltä kuin sillä olisi lyhyt kärsä. Ruumis on 100–140 senttimetriä pitkä, säkäkorkeus 61–81 senttimetriä ja paino 26–69 kilogrammaa. Vain uroksilla on sarvet: paksut, hieman läpikuultavat ja vahanväriset, ja niissä on 12–20 selvää rengasta. Turkki vaihtaa väriä vuodenajan mukaan keltaisenpunaisesta talven harmaanruskeaan, ja talvella kaulaan kasvaa 12–15 senttimetrin harja. Saigat liikkuvat suurina laumoina puoliaavikoilla ja aroilla, syövät kymmeniä kasvilajeja — myös sellaisia, jotka ovat muille eläimille myrkyllisiä — ja vaeltavat pitkiä matkoja luonnonmullistuksia pakoon. Muinoin laji eli Karpaateilta Mongoliaan asti; nykyään valtaosa, noin 99 prosenttia maailman saigoista, elää Kazakstanissa. Kanta romahti 2000-luvun alussa jopa 95 prosenttia viidessätoista vuodessa, ja laji luokiteltiin äärimmäisen uhanalaiseksi; sen jälkeen se on toipunut, ja vuonna 2022 Kazakstanissa arvioitiin olevan 1,38 miljoonaa saigaa.',
    lahde: 'en-Wikipedia "Saiga antelope", johdanto sekä osiot "Characteristics", '
      + '"Ecology and behaviour", "Kazakh saiga" ja "Threats". '
      + 'Tarkistettu 6.9.2026.',
    kuva: 'elain-kaz',
    // Piste on Betpak-Dalan arolla Keski-Kazakstanissa, 183,4
    // lautayksikköä Astanasta (vähimmäisetäisyys 35).
    lon: 70.5,
    lat: 47.0,
  },
  MNG: {
    elain: 'przewalskinhevonen',
    otsikko: 'Tahi, joka palasi eläintarhoista arolle',
    teksti: 'Przewalskinhevonen eli tahi on harvinainen ja uhanalainen villihevonen, joka on kotoisin Keski-Aasian aroilta ja nimetty venäläisen maantieteilijän ja tutkimusmatkailijan Nikolai Prževalskin mukaan. Se on kotihevosta pienempi ja tanakampi: säkäkorkeus 122–142 senttimetriä, pituus noin 2,1 metriä ja paino noin 300 kilogrammaa. Väri on hiirakko, harja seisoo pystyssä eikä kaadu sivulle, ja jaloissa on usein heikot raidat. Tahi ei ole kesyhevosen villiintynyt jälkeläinen: sillä on 33 kromosomiparia, kotihevosella 32, ja sukulinjat erkanivat toisistaan 160 000–38 000 vuotta sitten, kauan ennen hevosen kesyttämistä. Luonnosta laji hävisi kokonaan, ja 1990-luvulta lähtien se on palautettu Mongolian aroille eläintarhojen kannoista: Lontoon eläintieteellisen seuran ja mongolialaisten tutkijoiden yhteishankkeessa päästettiin 1992 luontoon 16 hevosta, ja palautusalueita ovat muun muassa Hustain nuruun kansallispuisto sekä Gobin laidalla oleva Suuren Gobin B-suojelualue.',
    lahde: 'en-Wikipedia "Przewalski\'s horse", johdanto sekä osiot '
      + '"Characteristics", "Genomics" ja "Reintroduction". '
      + 'Tarkistettu 6.9.2026.',
    kuva: 'elain-mng',
    // Piste on Suuren Gobin B-suojelualueella Lounais-Mongoliassa, 448,1
    // lautayksikköä Ulan Batorista (vähimmäisetäisyys 35).
    lon: 93.6,
    lat: 45.35,
  },
  /*
   * ══ ERÄ M14, AASIA 4 6.9.2026 ══════════════════════════════════
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erä M14 (AFG, PAK, UZB, PHL, CHN) tuo neljä eläintäkyä; Kiinalla
   * oli oma jo ennestään. Kaikki neljä ovat KUVATTOMIA kuten erien
   * M4 ja M10 täyt: `kuva`-kentässä on kuvaputken ämpäritunnus ilman
   * kansiota (elain-afg, elain-pak, elain-uzb, elain-phl), ja kun
   * kuvaputki toimittaa kuvan, se ilmestyy kortille ilman
   * koodimuutosta.
   *
   * PAIKAT ON MITATTU KONEELLA. Jokainen piste on maan rajojen
   * sisällä, maalla ja vähintään 35 lautayksikön päässä jokaisesta
   * kaupunkimerkistä sekä 30 yksikön päässä muista eläintäyistä
   * (tests/elaintakyt.test.mjs). Etäisyys lähimpään pelikaupunkiin on
   * kirjattu jokaisen tietueen koordinaattikommenttiin.
   *
   * Faktat on luettu en-Wikipedian raakatekstistä 6.9.2026 laji
   * kerrallaan, ja lähderivi nimeää artikkelin ja osat.
   */
  AFG: {
    elain: 'lumileopardi',
    otsikko: 'Vuorten haamu, joka ei osaa karjua',
    teksti: 'Lumileopardi on Panthera-suvun kissaeläin, jonka turkki on valkoisesta harmaaseen ja jossa on mustia täpliä päässä ja kaulassa sekä suurempia ruusukkeita selässä, kyljissä ja tuuheassa hännässä. Karvat ovat 5–12 senttimetriä pitkiä, säkäkorkeus noin 56 senttimetriä, ruumiin pituus 75–150 senttimetriä ja häntä 80–105 senttimetriä; urokset painavat keskimäärin 45–55 ja naaraat 35–40 kilogrammaa. Laji on sopeutunut kylmään vuoristoon: pienet pyöreät korvat vähentävät lämmönhukkaa, leveät tassut jakavat painon lumella ja niiden alapinnan karva parantaa otetta jyrkillä rinteillä. Paksu, rasvaa varastoiva häntä auttaa tasapainossa ja toimii nukkuessa peittona kasvojen suojana. Toisin kuin muut Panthera-lajit lumileopardi ei osaa karjua: sen äänihuulet ovat vain yhdeksän millimetriä pitkät. Afganistanissa laji elää Hindukušin itäosissa, ja syrjäisessä Wakhanin käytävässä se on tallentunut riistakameroihin 16 eri paikassa.',
    lahde: 'en-Wikipedia "Snow leopard", johdanto sekä osiot "Characteristics" ja '
      + '"Distribution and habitat". Tarkistettu 6.9.2026.',
    kuva: 'elain-afg',
    // Piste on Wakhanin käytävässä Koillis-Afganistanissa, 136,8
    // lautayksikköä Kašgarista ja 158,4 Kabulista (vähimmäisetäisyys 35).
    lon: 73.0,
    lat: 37.0,
  },
  PAK: {
    elain: 'markhor',
    otsikko: 'Vuohi, jonka sarvet kiertyvät korkkiruuviksi',
    teksti: 'Markhor on suuri villivuohi Keski- ja Etelä-Aasian rajaseudun vuoristoista, muun muassa Karakoramista ja Himalajalta, ja se on Pakistanin kansalliseläin. Nimi tulee persian sanasta markhar, kiharainen, ja se viittaa eläimen sarviin; kirjaimellisemmin sanat mar ja khor tarkoittavat käärmeensyöjää, sillä vanhan uskomuksen mukaan markhor tappoi ja söi käärmeitä. Aikuinen markhor on 65–115 senttimetriä korkea, 132–186 senttimetriä pitkä ja painaa 32–110 kiloa; koko Capra-suvussa sillä on suurin säkäkorkeus. Turkki on vaaleanruskeasta mustaan, kesällä sileä ja lyhyt, talvella pitkä ja tuuhea, ja alaraajojen karva on mustavalkoinen. Molemmilla sukupuolilla on tiukkaan kiertyneet korkkiruuvimaiset sarvet, jotka lähtevät päästä yhdessä ja levenevät kärkiä kohti: uroksilla ne kasvavat jopa 160 senttimetriä, naarailla 25. Laji elää 600–3 600 metrin korkeudessa tammi-, mänty- ja katajapensaikoissa, ja suurin kanta on Chitralin kansallispuistossa.',
    lahde: 'en-Wikipedia "Markhor", johdanto sekä osiot "Description" ja "Distribution '
      + 'and habitat". Tarkistettu 6.9.2026.',
    kuva: 'elain-pak',
    // Piste on Chitralin vuoristossa Pohjois-Pakistanissa, 107,3
    // lautayksikköä Kabulista (vähimmäisetäisyys 35).
    lon: 72.0,
    lat: 35.9,
  },
  UZB: {
    elain: 'bukharanhirvi',
    otsikko: 'Hirvi, joka elää autiomaan jokivarressa',
    teksti: 'Bukharanhirvi eli baktrianhirvi on keskiaasialaisen saksanhirven alalaji, joka elää alavilla jokivarsilla keskellä autiomaata. Se muistuttaa ekologialtaan sukulaistaan jarkandinhirveä, ja lajit erottaa toisistaan Tianšanin vuoristo. Väri on tuhkanharmaa kellertävällä kiillolla, takapuolessa on harmaanvalkoinen laikku ja huulten ja leuan reunat ovat vaaleat; sarvet ovat vaaleat, ja täysikasvuisella on kummassakin sarvessa viisi haaraa ja tyypillinen mutka kolmannen haaran jälkeen. Turkki on tummempi ja harmaanruskeampi kuin jarkandinhirvellä, ja jalat, pää ja kaula ovat tummat etenkin uroksilla. Vasat syntyvät täplikkäinä kuten euroopanhirvellä. Laji elää pajun ja poppelin reunustamissa tugai-metsissä eikä vaella, vaikka se voi levittäytyä viereiselle aavikolle yöllä tai viileinä aikoina. Vuonna 1999 hirviä oli jäljellä enintään 400; suojelun ansiosta kanta on kasvanut, ja Uzbekistanin Badai Tugain suojelualueella laskettiin 2009 yhteensä 374 yksilöä.',
    lahde: 'en-Wikipedia "Bactrian deer", johdanto sekä osiot "Description", "Range" ja '
      + '"Population". Tarkistettu 6.9.2026.',
    kuva: 'elain-uzb',
    // Piste on Amudarjan tugai-vyöhykkeellä Lounais-Uzbekistanissa,
    // 144,6 lautayksikköä Samarkandista (vähimmäisetäisyys 35).
    lon: 62.6,
    lat: 40.2,
  },
  PHL: {
    elain: 'tarsieri',
    otsikko: 'Nyrkin kokoinen kädellinen, jolla on jättimäiset silmät',
    teksti: 'Filippiinientarsieri on Filippiineillä kotoperäinen kädellinen, joka kuuluu noin 45 miljoonaa vuotta vanhaan tarsierien heimoon; heimon nimi tulee pitkästä nilkkaluusta eli tarsuksesta. Se on 85–160 millimetriä korkea ja siten yksi maailman pienimmistä kädellisistä: aikuinen on suunnilleen ihmisen nyrkin kokoinen, ja urokset painavat 80–160 grammaa. Silmät ovat kiinni kallossa eivätkä liiku kuopissaan, mutta kaulan erikoisrakenne sallii pään kääntämisen 180 astetta. Silmät ovat suhteettoman suuret — kaikista nisäkkäistä suurin silmän ja ruumiinpainon suhde — ja ne antavat yöeläimelle erinomaisen hämäränäön. Suuret kalvomaiset korvat liikkuvat lähes koko ajan. Pitkä nilkkaluu heittää eläimen vähintään kolmen metrin päähän puusta toiseen, ja sormien ja varpaiden pyöreät tyynyt tarttuvat lähes mihin tahansa pintaan. Ravinto on pääasiassa hyönteisiä, hämähäkkejä ja pieniä selkärankaisia. Lajia tavataan saariston kaakkoisosassa, muun muassa Boholilla, Samarilla ja Leytellä sekä Sarangania myöten.',
    lahde: 'en-Wikipedia "Philippine tarsier", johdanto sekä osiot "Anatomy and '
      + 'morphology", "Ecology" ja "Geographic range and habitat". Tarkistettu 6.9.2026.',
    kuva: 'elain-phl',
    // Piste on Etelä-Mindanaolla Saranganin seudulla, 344,7
    // lautayksikköä Manilasta (vähimmäisetäisyys 35).
    lon: 124.8,
    lat: 6.0,
  },
  /*
   * ══ ERÄ M13, ETELÄINEN AFRIKKA 6.9.2026 ═══════════════════════════
   *
   * Mosambik ja Zimbabwe olivat erän ainoat maat, joilta eläintäky
   * puuttui (MDG, NAM ja ZAF olivat jo kunnossa). Kumpikin on kuvaton:
   * `kuva` on kuvaputken ämpäritunnus ilman kansiota, ja kortti kantaa
   * tekstin yksinään siihen asti kunnes kuva tulee.
   */
  MOZ: {
    elain: 'dugongi',
    otsikko: 'Meriruohon laiduntaja Bazaruton matalikoilla',
    teksti: 'Dugongi (Dugong dugon) on merinisäkäs ja yksi neljästä elossa olevasta sireenieläinlajista; kolme muuta ovat manaatteja. Se on sukunsa Dugongidae viimeinen edustaja — lähin nykysukulainen, merilehmä, metsästettiin sukupuuttoon 1700-luvulla. Dugongi elää täysin meriruohosta ja pysyy siksi matalilla rannikkovesillä: laajoissa suojaisissa lahdissa, mangrovekanavissa, suurten rannikkosaarten vesillä ja riuttojen välissä. Manaateista sen erottaa delfiinimäinen pyrstö, ja alaspäin kääntynyt kuono on sopeuma pohjan meriruohon syömiseen. Aikuinen on harvoin yli kolme metriä pitkä; sen mittainen yksilö painaa noin 420 kiloa. Dugongia on metsästetty tuhansia vuosia lihan ja rasvan takia, ja koska se elää 70-vuotiaaksi ja lisääntyy hitaasti, se toipuu tappioista huonosti — IUCN luokittelee sen vaarantuneeksi. Mosambikissa suurin jäljellä oleva kanta, noin 120 yksilöä, elää Bazaruton saariston kansallispuistossa, jonka vedet suojeltiin 1971.',
    lahde: 'en-Wikipedia "Dugong", johdanto sekä osiot "Description" ja '
      + '"Conservation", ja "Bazaruto Archipelago", osio "Wildlife". '
      + 'Tarkistettu 6.9.2026.',
    kuva: 'elain-moz',
    // Piste on Inhassorossa Bazaruton saariston vastarannalla — saaristo
    // kuuluu Vilanculosin ja Inhassoron piireihin — 72,1 lautayksikköä
    // Mosambik-laatasta (vähimmäisetäisyys 35). Merkki on mantereella,
    // koska testi vaatii eläintäyn maalle ja maan rajojen sisään
    // (tests/elaintakyt.test.mjs); saariston oma vesialue jää laudan
    // maskissa mereksi.
    lon: 35.2,
    lat: -21.53333333,
  },
  ZWE: {
    elain: 'musta sarvikuono',
    otsikko: 'Koukkuhuuli, joka syö oksat eikä ruohoa',
    teksti: 'Musta sarvikuono (Diceros bicornis) eli koukkuhuulisarvikuono elää itäisessä ja eteläisessä Afrikassa, muun muassa Zimbabwessa, ja se on sukunsa Diceros ainoa elossa oleva laji. Nimestä huolimatta väri vaihtelee ruskeasta harmaaseen. Aikuinen on säästä 1,32–1,8 metriä korkea ja 2,8–3,75 metriä pitkä ja painaa tavallisesti 800–1 400 kiloa; kallossa on kaksi keratiinista sarvea, joista etummainen on tyypillisesti puoli metriä pitkä. Ero Afrikan toiseen sarvikuonoon on huulessa: valkoisella sarvikuonolla on leveä nelikulmainen huuli ruohon syömiseen, mustalla terävä ja tarttuva ylähuuli, jolla se riipii lehdet ja oksat — se on siis selailija, ei laiduntaja, ja kantaa päätään korkeammalla. Ravinnoksi kelpaa jopa 220 kasvilajia, mieluiten akasioita ja tyräkkikasveja. Zimbabwessa laji elää muun muassa Gonarezhoun kansallispuistossa, ja Matobon kukkuloille se palautettiin 1990-luvulla Sambesin laaksosta.',
    lahde: 'en-Wikipedia "Black rhinoceros", johdanto sekä osiot '
      + '"Description" ja "Diet", "Gonarezhou National Park", osio '
      + '"Fauna", sekä "Matobo National Park", osio "Fauna". '
      + 'Tarkistettu 6.9.2026.',
    kuva: 'elain-zwe',
    // Piste on Gonarezhoun kansallispuistossa Kaakkois-Zimbabwessa,
    // 122,1 lautayksikköä Mosambik-laatasta (vähimmäisetäisyys 35).
    lon: 31.66666667,
    lat: -21.66666667,
  },
  /*
   * ── ERÄ M12, LÄNSI-AFRIKKA 6.9.2026 ────────────────────────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erä M12 (GHA, SEN, MLI, LBR, SLE) toi viisi uutta eläintäkyä;
   * yhdelläkään viidestä maasta ei ollut täkyä ennestään, joten
   * yhtäkään vanhaa tietuetta ei ole koskettu.
   *
   * PAIKKA ON MITATTU IRTI KAUPUNGEISTA JA MUISTA MERKEISTÄ. Jokainen
   * piste on maan rajojen sisällä, maalla ja vähintään 35 lautayksikön
   * päässä jokaisesta kaupunkimerkistä (tests/elaintakyt.test.mjs
   * VAHIN_ETAISYYS_KAUPUNKIIN) sekä 30 yksikön päässä muista täyistä.
   * Ghana ja Mali olivat erän tiukat tapaukset: Ghanassa Molen
   * puiston kohta olisi ollut saman erän Mole-kohteen päällä, joten
   * täky vietiin lounaisiin metsiin, ja Malissa Gourman norsujen
   * läntinen pää osuisi Hombori Tondon päälle, joten piste on alueen
   * itäpäässä.
   *
   * KUVA TULEE KUVAPUTKELTA. Erä on kuvaton, joten `kuva`-kentässä on
   * pelkkä ämpäritunnus (js/media.js assetOsoite:
   * `kohtaamiset/elaimet/<tunnus>.jpg`). Kun kuvaputki toimittaa kuvan,
   * se ilmestyy kortille ilman koodimuutosta.
   */
  GHA: {
    elain: 'valkokaulakalliovaris',
    otsikko: 'Lintu, jonka luultiin kadonneen Ghanasta',
    teksti: 'Valkokaulakalliovaris on keskikokoinen varpuslintu, jota tavataan vain Länsi-Afrikan kallioisissa metsissä Guineasta Ghanaan. Sen pää on lähes höyhenetön: paljas iho on kirkkaan keltainen, ja silmien takana on kaksi suurta pyöreää mustaa laikkua. Yläpuoli on harmaanmusta, alapuoli valkoinen, ja poikkeuksellisen pitkä tummanruskea pyrstö toimii tasapainottajana. Lintu ei juuri lennä pitkiä matkoja vaan liikkuu metsässä hyppien ja loikkien tai lyhyin lennoin matalassa kasvillisuudessa. Se syö hyönteisiä ja seuraa toisinaan ajajamuurahaisten parvia napaten niiden säikyttämiä otuksia; poikasille vanhemmat kantavat pieniä sammakoita. Pesä on syvä savikuppi, joka muurataan kallionpintaan tavallisesti luolassa, ja munia on kaksi kahdesti vuodessa. Ghanassa lajin luultiin kuolleen sukupuuttoon vuoteen 2003 asti, jolloin se löydettiin uudelleen maan eteläkeskiosasta.',
    lahde: 'en-Wikipedia "White-necked rockfowl", johdanto sekä osiot "Distribution and '
      + 'habitat", "Breeding" ja "Status and conservation". Tarkistettu 6.9.2026.',
    kuva: 'elain-gha',
    // Piste on Lounais-Ghanan metsävyöhykkeessä, 39,4 lautayksikköä
    // Kumasi-laatasta (vähimmäisetäisyys 35).
    lon: -2.2,
    lat: 6.3,
  },
  SEN: {
    elain: 'afrikanmanaatti',
    otsikko: 'Vanhan maailman ainoa manaatti',
    teksti: 'Afrikanmanaatti on ainoa manaattilaji vanhassa maailmassa ja dugongin ohella toinen kahdesta siellä elävästä sireenieläimestä. Sitä tavataan Senegalista Angolaan, ja sen elinympäristöjen kirjo on sireenieläimistä laajin: Atlantin ulkosaaria, Sahelin jokia ja päiväntasaajan sademetsävirtoja. Ruumis on keskeltä leveimmillään, häntä lapiomainen, ja väri harmaa — mutta levä ja muut pikkueliöt kasvavat sen päällä, joten eläin näyttää usein ruskealta tai vihertävältä. Pituutta voi olla 4,5 metriä ja painoa noin 360 kiloa, ja tavallinen matkavauhti on 5–8 kilometriä tunnissa, säikähtäneenä yli kolmekymmentä. Hampaita ovat vain vahvat poskihampaat, ja jos sellainen irtoaa, tilalle kasvaa uusi. Padot ovat lajin suurin uhka: Diaman pato on eristänyt Senegaljoen manaatit pysyvästi merestä ja Ghanan Akosombon pato omansa vastaavasti.',
    lahde: 'en-Wikipedia "African manatee", johdanto sekä osiot "Range and habitat" ja '
      + '"Description". Tarkistettu 6.9.2026.',
    kuva: 'elain-sen',
    // Piste on Ylä-Casamancen jokiseudulla Kaakkois-Senegalissa, 116,8
    // lautayksikköä Dakar-laatasta (vähimmäisetäisyys 35).
    lon: -13.5,
    lat: 13.0,
  },
  MLI: {
    elain: 'gourmannorsu',
    otsikko: 'Vuoden mittainen kierros vesikuoppien väliä',
    teksti: 'Malin norsut eivät ole oma lajinsa vaan afrikannorsuja, jotka ovat oppineet elämään aavikon laidalla. Ne ovat jäänteitä laumoista, jotka vielä 1970 kiersivät laajalti Sahelissa ja jotka salametsästys sitten hävitti; nykyään ne ovat kutistuneet Gourman seudulle, syrjäiselle alueelle Nigerin mutkan eteläpuolella Timbuktun tienoilla. Kanta on noin 400 yksilöä, ja se tekee vuosittain lähes viidensadan kilometrin vaellusmatkan, jopa 56 kilometriä vuorokaudessa. Reitti kiertää vastapäivään tilapäisten ja pysyvien vesikuoppien kautta: norsut pysyvät alueensa pohjoisosassa, kunnes sateet tulevat kesäkuussa, siirtyvät sitten etelään käyden lyhyesti Burkina Fason puolella ja palaavat taas pohjoiseen. Päivät ne viettävät piilossa akaasioiden keskellä ja tulevat juomaan ja syömään öisin. Kuivuudet ovat koetelleet kantaa: 1983 hallitus kuljetti norsuille vettä autoilla, ja 2009 aikuiset joutuivat kaivamaan vettä syvältä, mutta poikaset eivät ylettäneet siihen kärsällään.',
    lahde: 'en-Wikipedia "Desert elephant", osio "Mali" sekä johdanto. Tarkistettu 6.9.2026.',
    kuva: 'elain-mli',
    // Piste on Gourman itäosassa Nigerin mutkan eteläpuolella, 117,1
    // lautayksikköä Gao-laatasta (vähimmäisetäisyys 35).
    lon: -0.5,
    lat: 15.2,
  },
  LBR: {
    elain: 'kääpiövirtahepo',
    otsikko: 'Metsän virtahepo, joka nukkuu päivät',
    teksti: 'Kääpiövirtahepo on Länsi-Afrikan metsien ja soiden asukki, ja valtaosa maailman kannasta elää Liberiassa; pieniä esiintymiä on Sierra Leonessa, Guineassa ja Norsunluurannikolla. Se on puolet tavallisen virtahevon korkeudesta ja alle neljänneksen sen painosta: säkäkorkeus 75–100 senttiä, pituus 150–175 senttiä ja paino 180–275 kiloa. Selkä viettää eteenpäin, jalat ja kaula ovat suhteessa pidemmät ja pää pienempi kuin isolla serkulla — kaikki sopeutumia tiheän metsäkasvillisuuden läpi kulkemiseen. Varpaat ovat harallaan ja räpylät vähäisemmät, jotta metsänpohjalla on hyvä kävellä, mutta korvissa ja sieraimissa on yhä voimakkaat lihasläpät sukeltamista varten. Iho erittää samaa hipposudorihappoa kuin isollakin virtahevolla: punertava neste ei ole hikeä eikä verta vaan toimii ilmeisesti antiseptisenä aurinkovoiteena. Laji on öinen ja arka, ja siksi sitä on tutkittu villinä hyvin vähän; luonnossa niitä arvioitiin 2015 olevan alle 2 500.',
    lahde: 'en-Wikipedia "Pygmy hippopotamus", johdanto sekä osiot "Description" ja '
      + '"Conservation". Tarkistettu 6.9.2026.',
    kuva: 'elain-lbr',
    // Piste on Cestos-joen seudun sademetsässä Keski-Liberiassa, 89,1
    // lautayksikköä Kap Palmas -laatasta (vähimmäisetäisyys 35).
    lon: -9.5,
    lat: 5.6,
  },
  SLE: {
    elain: 'länsiafrikansimpanssi',
    otsikko: 'Simpanssi, joka veistää keihään',
    teksti: 'Länsiafrikansimpanssi on äärimmäisen uhanalainen simpanssin alalaji, jota elää Norsunluurannikolla, Guineassa, Liberiassa, Malissa, Senegalissa, Ghanassa, Sierra Leonessa ja Guinea-Bissaussa; Beninistä, Burkina Fasosta ja Togosta se on hävinnyt. Suurimmat kannat ovat nykyään Guineassa, Sierra Leonessa ja Liberiassa, vaikka laji ulottui aikoinaan Etelä-Senegalista aina Niger-joelle asti. Se on simpanssin alalajeista geneettisesti eriytynein, ja käytös poikkeaa muista niin paljon, että sitä on ehdotettu omaksi lajikseen. Vain nämä simpanssit veistävät puisia keihäitä muiden kädellisten metsästämiseen, käyttävät luolia asuntoinaan, jakavat kasviravintoa keskenään ja liikkuvat myös öisin; kuumalla ne menevät veteen viilentymään ja leikkimään. Naaraat ovat seurallisia ja tukevat toisiaan riidoissa koiraiden kanssa, joten arvojärjestys on tasaisempi kuin Itä-Afrikan simpansseilla — naaraat myös metsästävät ja kulkevat mukana reviiripartioilla.',
    lahde: 'en-Wikipedia "Western chimpanzee", johdanto sekä osiot "Distribution and habitat" '
      + 'ja "Unique behaviors". Tarkistettu 6.9.2026.',
    kuva: 'elain-sle',
    // Piste on Pohjois-Sierra Leonen metsäisillä kukkuloilla Konon ja
    // Tonkolilin välissä, 45,8 lautayksikköä Sierra Leone -laatasta
    // (vähimmäisetäisyys 35).
    lon: -11.5,
    lat: 8.6,
  },
  /*
   * ── ERÄ M15, AFRIKKA 5 6.9.2026 ────────────────────────────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erä M15 (SDN, TCD, LBY, NGA, SOM) toi viisi uutta eläintäkyä.
   * Yhdelläkään viidestä maasta ei ollut täkyä ennestään.
   *
   * LAJIT EIVÄT TOISTA MITÄÄN AIEMPAA. Fennekki on jo Algerian täky
   * ja nubiantorvikauris Jordanian, joten Libyan lajiksi valittiin
   * saharangaselli; kirahvi on jo Kenian ja norsu Tansanian ja
   * Namibian, joten Tšadin lajiksi tuli sapelisarvioryksi, jonka
   * tarina on samalla erän paras: laji julistettiin luonnosta
   * hävinneeksi vuonna 2000 ja palautettiin Tšadiin 2016 alkaen.
   * Gorilla on jo Ugandan täky, joten Nigerian lajiksi valittiin
   * drilli.
   *
   * PAIKAT ON MITATTU. Jokainen piste on oman maansa rajojen sisällä,
   * maalla ja vähintään 35 lautayksikön päässä jokaisesta
   * kaupunkimerkistä (tests/elaintakyt.test.mjs
   * VAHIN_ETAISYYS_KAUPUNKIIN) sekä 30 yksikön päässä muista
   * eläintäyistä. Lähin on Libyan saharangaselli 62,5 lautayksikön
   * päässä Murzukista.
   *
   * KUVA TULEE KUVAPUTKELTA. Erä on kuvaton, joten `kuva`-kentässä on
   * ämpäritunnus ilman kansiota (elain-sdn, elain-tcd, elain-lby,
   * elain-nga, elain-som). Kun kuvaputki toimittaa kuvan, se ilmestyy
   * kortille ilman koodimuutosta.
   * ───────────────────────────────────────────────────────────────
   */
  SDN: {
    elain: 'arruikatsa',
    otsikko: 'Vuohilammas, joka juo vain kasveista',
    teksti: 'Arruikatsa eli Ammotragus lervia on Pohjois-Afrikan kallioisten vuorten ainoa laji suvussaan. Se on säkäkorkeudeltaan noin metrin, hiekanruskea ja iän myötä tummuva, ja koirailla riippuu kurkusta ja rinnasta pitkä takkuinen karva. Sarvet ovat poikkileikkaukseltaan kolmiomaiset ja kaartuvat ulos, taakse ja sisään; ne voivat ylittää kahdeksankymmentä senttimetriä. Laji elää kuivilla vuorialueilla Saharan karun keskustan ympärillä, ja Sudanissa se tavataan Niilin länsipuolella sekä joen itäpuolella Punaisenmeren kukkuloilla. Arruikatsa saa kaiken tarvitsemansa nesteen ravinnostaan, mutta juo ja kylpee mielellään, jos vettä on. Se on hämärän eläin, joka on liikkeellä varhain aamulla ja myöhään iltapäivällä ja lepää päivän kuumuudessa; vaaran uhatessa se pakenee ylämäkeen ja hyppää paikaltaan yli kahden metrin korkeuteen.',
    lahde: 'en-Wikipedia "Barbary sheep", johdanto sekä osiot "Description", '
      + '"Range" ("Natural range") ja "Habitats". Tarkistettu 6.9.2026.',
    kuva: 'elain-sdn',
    // Piste on Punaisenmeren kukkuloilla Koillis-Sudanissa, 86,9
    // lautayksikköä Suakinista (vähimmäisetäisyys 35).
    lon: 35.0,
    lat: 20.3,
  },
  TCD: {
    elain: 'sapelisarvioryksi',
    otsikko: 'Antilooppi, joka palasi luonnosta hävinneiden listalta',
    teksti: 'Sapelisarvioryksi eli Oryx dammah oli aikoinaan levinnyt laajalti Pohjois-Afrikkaan sekä osiin Länsi- ja Keski-Afrikkaa. Se kestää aavikon oloja poikkeuksellisen hyvin: se tulee toimeen kuukausia juomatta ja saa suurimman osan päivittäisestä nesteestään kasveista. Kanta alkoi hiipua jo neoliittisen kauden ilmastonmuutoksessa, kun "vihreä Sahara" kuivui, ja myöhemmin lajia metsästettiin ankarasti sarvien takia; 1900-luvulla hevoset ja tuliaseet tekivät metsästyksestä tuhoisaa. Vuonna 2000 IUCN julisti sapelisarvioryksin luonnosta hävinneeksi. Tšad johtaa lajin palautushanketta Ouadi Rimé-Ouadi Achimin riistasuojelualueella, joka on 78 000 neliökilometrillään yksi maailman suurimmista suojelualueista: ensimmäinen 21 eläimen ryhmä päästettiin totutusaitaukseen alkuvuodesta 2016 ja vapaaksi sadekaudella, ja jo alkuvuonna 2017 syntyi vasa — ensimmäinen luonnossa yli kahteenkymmeneen vuoteen. Vuonna 2021 syntyi 60 vasaa, ja luonnossa eläviä oli noin 400. Vuonna 2023 laji siirrettiin punaisella listalla luokkaan erittäin uhanalainen.',
    lahde: 'en-Wikipedia "Scimitar oryx", johdanto sekä osio "Status and '
      + 'conservation". Tarkistettu 6.9.2026.',
    kuva: 'elain-tcd',
    // Piste on Ouadi Rimé-Ouadi Achimin suojelualueella Keski-Tšadissa,
    // 119,8 lautayksikköä Darfurista (vähimmäisetäisyys 35).
    lon: 19.6666,
    lat: 15.5166,
  },
  LBY: {
    elain: 'saharangaselli',
    otsikko: 'Vaalein gaselli, joka juo kastetta',
    teksti: 'Saharangaselli eli Gazella leptoceros on vaaleaturkkinen gaselli, jolla on pitkät ja hoikat sarvet ja joka on sopeutunut aavikkoon perusteellisesti. Se on gaselleista vaalein: yläpuoli on kellanvaalea tai kermanvärinen ja jalat ja alapuoli valkoiset. Koiraan sarvet ovat hoikat ja hieman S-kirjaimen muotoiset, naaraan vielä ohuemmat ja lähes suorat. Lajia tavataan Algeriassa, Tunisiassa, Libyassa ja Egyptissä hajanaisina taskuina keskisen Saharan alueella; havaintoja on tehty myös Nigeristä ja Tšadista, mutta niitä pidetään epävarmoina. Aavikon helle rajaa ruokailun aamuun ja iltaan, ja gaselli saa lähes kaiken vetensä kasteesta ja kasvien kosteudesta — avovettä se tarvitsee tuskin lainkaan. Se vaeltaa kasvillisuuden perässä ilman kiinteää muuttoreittiä, ja tyypillistä elinympäristöä ovat hiekkadyynit ja niiden väliset painanteet sekä kalliomaat. Lajia pidetään uhanalaisena, sillä luonnossa on alle 2 500 yksilöä.',
    lahde: 'en-Wikipedia "Rhim gazelle", johdanto sekä osiot "Name", '
      + '"Description" ja "Distribution and habitat". Tarkistettu 6.9.2026.',
    kuva: 'elain-lby',
    // Piste on Fezzanin ja Sirtin väliaavikolla Keski-Libyassa, 62,5
    // lautayksikköä Murzukista (vähimmäisetäisyys 35).
    lon: 15.0,
    lat: 26.0,
  },
  NGA: {
    elain: 'drilli',
    otsikko: 'Serkku, jota on jäljellä neljätuhatta',
    teksti: 'Drilli eli Mandrillus leucophaeus on kapeanenäapina, joka on sukua paviaaneille ja vielä läheisempää sukua mandrillille — lajit elävät eri puolilla Sanaga-jokea Kamerunissa eivätkä kohtaa. Villinä drilli elää keskimäärin kaksikymmentä vuotta. Sitä tavataan vain kolmessa maassa, Nigeriassa, Kamerunissa ja Päiväntasaajan Guineassa, ja levinneisyysalue on pienempi kuin Yhdysvaltain Länsi-Virginian osavaltio: läntisin raja on Nigerian Cross-joki ja eteläisin Kamerunin Sanaga. Kanta on pirstoutunut erillisiksi taskuiksi, ja luonnossa eläviä arvioidaan olevan noin neljätuhatta. Elinympäristöt vaihtelevat: osa elää metsissä, osa savannilla, vuorenhuipuilla ja sisämaan jyrkänteillä, ja Bioko-saaren drillit alankorannikon metsissä — niitä on nähty jopa rannoilla. Laji on luokiteltu erittäin uhanalaiseksi.',
    lahde: 'en-Wikipedia "Drill (animal)", johdanto sekä osiot "Distribution" '
      + 'ja "Taxonomy". Tarkistettu 6.9.2026.',
    kuva: 'elain-nga',
    // Piste on Cross-joen metsissä Kaakkois-Nigeriassa, 72,6
    // lautayksikköä Lagosista (vähimmäisetäisyys 35).
    lon: 9.0,
    lat: 6.3,
  },
  SOM: {
    elain: 'beira',
    otsikko: 'Korvat kuin lautaset, vettä ei tarvita',
    teksti: 'Beira eli Dorcatragus megalotis on pieni antilooppi, joka elää Afrikan sarven kuivilla alueilla ja on sukunsa ainoa nykyinen laji. Sen turkki on selästä punaharmaa, ja tumma juova erottaa sen valkoisesta alapuolesta kyynärpäästä takajalkaan. Korvat ovat suhteettoman suuret, ja niiden sisäpuoli on valkoisen karvan peitossa; sarvet ovat vain koirailla, ja ne kasvavat suorina piikkeinä pystyyn korvien vierestä. Laji on kotoperäinen Koillis-Afrikassa: sitä tavataan Djiboutin eteläkolkasta etelään Somalimaan ja Pohjois-Somalian halki ja Etiopian äärimmäiseen koilliseen, ja levinneisyyden pääosa on Somalimaasta itään Puntmaahan ja Nugaalin laaksoon. Beira viihtyy kivikkoisilla rinteillä kuivan heinän ja akasiapensaikon keskellä. Se ei tarvitse juomavettä lainkaan, vaan saa kaiken tarvitsemansa kasveista. Beira on äärimmäisen varovainen: pieninkin häiriö saa sen liikkeelle, ja se kiitää vuorenrinteen soraa pitkin ja loikkii kiveltä kivelle jyrkemmillä paikoilla.',
    lahde: 'en-Wikipedia "Beira (antelope)", johdanto sekä osiot "Description", '
      + '"Distribution", "Habitat" ja "Habits". Tarkistettu 6.9.2026.',
    kuva: 'elain-som',
    // Piste on Nugaalin laakson kivikkorinteillä Puntmaassa, 96,2
    // lautayksikköä Ras Hafunista (vähimmäisetäisyys 35). Laudan
    // SOM-muoto ei kata Somalimaan luoteisosaa, joten piste on haettu
    // levinneisyyden itäpäästä, jonka artikkeli nimeää erikseen.
    lon: 48.5,
    lat: 8.5,
  },
  /*
   * ── ERÄ M16 6.9.2026: TUNISIA, SYYRIA JA JEMEN ─────────────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erä M16 (TUN, SYR, YEM, SHN) toi kolme uutta eläintäkyä.
   *
   * SAINT HELENA JÄI ILMAN TÄKYÄ. Saaren tikkuri (Saint Helena plover,
   * wirebird) olisi luonteva valinta, mutta tämän tiedoston paikka
   * tarkistetaan testissä laudan MAA-ALUETTA vasten (js/mapart.js
   * isOnLand, map.outlines) eikä maan countryShapes-rengasta vasten.
   * Maailmankartan outlines-taulussa ei ole Saint Helenan saarta
   * lainkaan, joten yksikään saaren piste ei läpäise testiä. Vartiota
   * ei kierretty eikä poikkeuslistaa lisätty; vaje on kirjattu
   * docs/moduulit/karttanostot-kattavuus.md:n erälohkoon.
   *
   * PAIKAT ON MITATTU. Jokainen piste on oman maansa rajojen sisällä,
   * maalla ja vähintään 35 lautayksikön päässä jokaisesta
   * kaupunkimerkistä (tests/elaintakyt.test.mjs
   * VAHIN_ETAISYYS_KAUPUNKIIN) sekä 30 yksikön päässä muista
   * eläintäyistä.
   *
   * KUVA TULEE KUVAPUTKELTA. Erä on kuvaton, joten `kuva`-kentässä on
   * pelkkä ämpäritunnus (js/media.js assetOsoite:
   * `kohtaamiset/elaimet/<tunnus>.jpg`).
   */
  TUN: {
    elain: 'dorkasgaselli',
    otsikko: 'Antilooppi, joka ei juo',
    teksti: 'Dorkasgaselli on pieni gaselli, joka elää Afrikan ja Arabian nurmi- ja aroalueilla, wadeissa, vuoriautiomaissa ja puoliaavikoilla. Säkäkorkeus on 55–65 senttimetriä, pituus 90–110 senttimetriä ja paino 15–20 kiloa, ja tuntomerkkinä ovat pitkät korvat ja voimakkaasti kaartuvat sarvet, jotka taipuvat ensin ulos ja sitten sisään ja eteenpäin. Saharan alalajilla turkki on hyvin vaalea, kellanruskea, ja valkoista alapuolta reunustaa ruskea juova; Saharan pohjoispuolella eläimet ovat okranvärisempiä ja niillä on tummat kyljet ja kasvojuovat. Laji on sopeutunut autiomaahan niin hyvin, että se saa suurimman osan vedestään mehevistä kasveista — juoda se silti tarvitsee, ja veden äärellä se juo mielellään. Ravintona ovat lehdet, kukat ja akasioiden palot sekä autiomaapensaiden lehdet, oksat ja hedelmät; sateen jälkeen gasellien on nähty kaivavan mukuloita maasta, ja ne nousevat toisinaan takajaloilleen syödäkseen puiden lehviä. Juoksuvauhti yltää 80 kilometriin tunnissa, ja vaaran uhatessa gaselli nykii häntäänsä ja loikkii pää pystyssä, ehkä kertoakseen saalistajalle nähneensä tämän. Maailmassa arvioidaan olevan 35 000–40 000 yksilöä.',
    lahde: 'en-Wikipedia "Dorcas gazelle", johdanto sekä osiot "Description", '
      + '"Behaviour" ja "Threats". Tarkistettu 6.9.2026.',
    kuva: 'elain-tun',
    // Piste on Keski-Tunisian aroylängöllä Bou Hedman seudulla, 103,8
    // lautayksikköä Karthagosta (vähimmäisetäisyys 35).
    lon: 9.6,
    lat: 34.47,
  },
  SYR: {
    elain: 'kaljuiibis',
    otsikko: 'Lintu, joka löytyi uudelleen paimenten tiedosta',
    teksti: 'Kaljuiibis on muuttava vanhan maailman iibis, joka viihtyy avoimilla mailla, kallioisilla vuorilla ja puoliaavikoilla usein juoksevan veden lähellä. Se on 70–80 senttimetriä pitkä ja kiiltävän musta, ja toisin kuin useimmat iibikset se ei kahlaa; kasvot ja pää ovat höyhenettömät ja punaiset, ja nokka on pitkä, kaareva ja punainen. Se pesii yhdyskunnissa rannikon tai vuorten kalliohyllyillä, munii tavallisesti kaksi tai kolme munaa risupesään ja syö liskoja, hyönteisiä ja muita pieniä eläimiä; ulostetutkimus on osoittanut, että liskot ja pimikkäät ovat pääravintoa. Laji oli aikoinaan levinnyt Lähi-itään, Pohjois-Afrikkaan sekä Etelä- ja Keski-Eurooppaan, ja sen fossiiliaineisto ulottuu vähintään 1,8 miljoonan vuoden päähän; Euroopasta se katosi yli kolmesataa vuotta sitten. Syyriassa lintu oli julistettu hävinneeksi yli seitsemänkymmentä vuotta aiemmin, mutta kevään 2002 maastotutkimuksissa, jotka tehtiin beduiinipaimentolaisten ja paikallisten metsästäjien tiedon varassa, löytyi viisitoista vanhaa pesäpaikkaa ja Palmyran läheltä yhä elävä seitsemän linnun pesimäyhdyskunta. Vuonna 2006 satelliittilähettimet paljastivat, että Syyrian linnut talvehtivat Etiopian ylängöillä. Vuonna 2019 luonnonvaraisia lintuja arvioitiin olevan noin 700, lähes kaikki Etelä-Marokossa.',
    lahde: 'en-Wikipedia "Northern bald ibis", johdanto sekä osiot '
      + '"Distribution and habitat", "Feeding" ja "Conservation". '
      + 'Tarkistettu 6.9.2026.',
    kuva: 'elain-syr',
    // Piste on Palmyran autiomaa-arolla Keski-Syyriassa, 64,6
    // lautayksikköä Alepposta (vähimmäisetäisyys 35).
    lon: 38.4,
    lat: 34.9,
  },
  YEM: {
    elain: 'jemeninkameleontti',
    otsikko: 'Kypäräpää, joka juo omasta otsastaan',
    teksti: 'Jemeninkameleontti on Arabian niemimaan lounaisosan laji, jota tavataan Jemenissä ja Saudi-Arabiassa. Nimi tulee pään päällä olevasta korkeasta harjasta eli kypärästä, joka kasvaa eläimen mukana ja on suurimmilla aikuisilla noin viisi senttimetriä korkea; kypärä ei ole pelkkä koriste, vaan se ohjaa kastetta ja sadevettä eläimen suuhun. Uros on kuonosta hännänpäähän 43–61 senttimetriä pitkä, naaras enintään noin 35 senttimetriä mutta tanakampi. Poikaset kuoriutuvat vaaleanvihreinä ja ilman kypärää, ja säikähtäessään ne saattavat pudottautua maahan ja muuttua stressistä kirkkaanpunaisiksi. Aikuiset naaraat ovat vihreitä valkoisin, oranssein, keltaisin tai ruskein täplin, urokset kirkkaampia ja selväpiirteisin keltaisin tai sinisin vöin. Värinvaihto kertoo aggressiosta, sosiaalisesta asemasta, lisääntymisestä ja stressistä. Laji on puissa elävä ja viihtyy ylätasangoilla, vuorilla ja laaksoissa; se syö pääasiassa hyönteisiä mutta on niitä harvoja kameleontteja, jotka syövät myös kasviksia ja hedelmiä — ilmeisesti saadakseen vettä kuivana aikana. Naaras elää noin viisi, uros noin kahdeksan vuotta.',
    lahde: 'en-Wikipedia "Veiled chameleon", johdanto sekä osiot "Etymology", '
      + '"Description", "Habitat and distribution" ja "Diet". '
      + 'Tarkistettu 6.9.2026.',
    kuva: 'elain-yem',
    // Piste on Jemenin ylängöllä Maribin lounaispuolella, 50,4
    // lautayksikköä Sanasta (vähimmäisetäisyys 35).
    lon: 45.6,
    lat: 14.8,
  },
  /* ============ MAAILMAN ERÄ M17, AMERIKAT 6.9.2026 ============
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erä M17 täydensi Amerikat (USA, MEX, ECU, PER, PAN). Näistä
   * viidestä maasta USA:lla, Meksikolla ja Perulla oli eläintäky jo
   * ennestään, joten uusia on kaksi: Ecuador ja Panama. Molemmat
   * tulevat tauluun KUVATTOMINA — `kuva`-kentässä on kuvaputken
   * ämpäritunnus ilman kansiota, ja kortti latoo siihen asti tekstin
   * ja lähteen ilman kuvakehystä (js/elaintaky.js).
   * ============================================================== */
  ECU: {
    elain: 'andienkarhu',
    otsikko: 'Etelä-Amerikan ainoa karhu',
    teksti: 'Andienkarhu eli silmälasikarhu on Andien oma laji ja Etelä-Amerikan ainoa karhu — samalla viimeinen elossa oleva lyhytkuonoinen karhu. Nimi tulee vaaleista kuvioista rinnassa, kaulassa ja kasvoissa, jotka joillakin yksilöillä näyttävät silmälaseilta. Se on karhuista jättiläispandan ohella kasvissyövin: lihaa on tavallisesti vain 5–7 prosenttia ruokavaliosta, ja loput ovat kaktusta, bromelioita, palmunpähkinöitä, bambun sydämiä, orkideansipuleita ja sammalta. Puremalihakset ja poskihampaat ovat sen mukaiset — ne on tehty jauhamaan ja murskaamaan sitkeää kasvia, jota harva muu eläin sen elinalueella kykenee avaamaan. Urokset painavat 100–200 kiloa ja naaraat 35–82, joten laji kilpailee jääkarhun kanssa nykykarhujen selvimmästä koon erosta sukupuolten välillä. Karhu on myös yksi neljästä puissa kiipeilevästä karhulajista, ja IUCN luokittelee sen vaarantuneeksi elinympäristön katoamisen takia.',
    lahde: 'en-Wikipedia "Spectacled bear", johdanto sekä osiot '
      + '"Etymology", "Size", "Behaviour" ja "Diet". '
      + 'Tarkistettu 6.9.2026.',
    kuva: 'elain-ecu',
    // Piste on Sangayn kansallispuiston seudulla Keski-Ecuadorin
    // Andeilla, 60,9 lautayksikköä Quitosta (vähimmäisetäisyys 35).
    // Galápagos-merkin viereen ei voi sijoittaa mitään: saariryhmä on
    // oma pelikaupunkinsa ja jää lisäksi maan lehden rajauksen ulkopuolelle.
    lon: -78.3,
    lat: -2,
  },
  PAN: {
    elain: 'panamankultasammakko',
    otsikko: 'Sammakko, joka viittoo',
    teksti: 'Panamankultasammakko on Panamalle kotoperäinen konna, joka elää Länsi-Keski-Panaman pilvimetsien vuoripurojen varsilla Tabasarán vuoriston itärinteillä. Nimestään huolimatta se on todellinen konna. Se puhuu poikkeuksellisella tavalla: äänten lisäksi se viittoo etukäpälällään kilpailijoille ja mahdollisille kumppaneille, ja tämän semaforin uskotaan kehittyneen siksi, että kohisevien purojen äänessä huuto ei kanna. Kutsu on erikoinen myös siksi, ettei lajilla ole tärykalvoa lainkaan, mutta se silti vastaa lajitovereidensa ääntelyyn. Iho on myrkyllinen: siinä on muun muassa zetekitoksiini AB, joka salpaa hermosolujen natriumkanavia paljon tehokkaammin kuin sukulaisyhdisteensä saksitoksiini. Sammakko on Panaman kansallissymboli, se esiintyy arpalipuissa ja tarinoissa, ja kansallista kultasammakon päivää vietetään 14. elokuuta. Luonnosta laji on todennäköisesti hävinnyt vuodesta 2007 lähtien chytridi-sienitaudin takia, ja sitä kasvatetaan yli viidessäkymmenessä laitoksessa.',
    lahde: 'en-Wikipedia "Panamanian golden frog", johdanto sekä osiot '
      + '"Description", "Toxicity", "Distribution", "Behavior", '
      + '"Conservation" ja "In culture". Tarkistettu 6.9.2026.',
    kuva: 'elain-pan',
    // Piste on Tabasarán vuoriston pilvimetsässä Coclén ja Veraguasin
    // rajamailla, 44,8 lautayksikköä Panamásta (vähimmäisetäisyys 35).
    // El Valle de Antón, lajin tunnetuin paikka, jäi 24,7 yksikköön eli
    // kaupunkimerkin liepeille, joten piste on lajin levinneisyyden
    // länsipäässä.
    lon: -80.9,
    lat: 8.6,
  },

  /* ================================================================
   * ERÄ M18 (6.9.2026): PRY, URY, VEN. Kolme eteläamerikkalaista maata,
   * joilla ei ollut eläintäkyä lainkaan. Kuvattomia: `kuva`-kentässä on
   * kuvaputken ämpäritunnus ilman kansiota, ja kortti latoo tekstin
   * ilman kuvakehystä kunnes kuva valmistuu. Paikat on mitattu
   * koneellisesti — jokainen piste on maalla, maan monikulmion sisällä
   * ja yli 35 lautayksikön päässä jokaisesta kaupunkimerkistä
   * (tests/elaintakyt.test.mjs). Vanuatu jäi ilman eläintäkyä, koska
   * yhtään ehdot täyttävää pistettä ei ole olemassa; perustelu on
   * js/packs/maastokohteet-vut.js:n otsikkokommentissa.
   * ============================================================== */
  PRY: {
    elain: 'chacopekari',
    otsikko: 'Sika, joka löydettiin ensin fossiilina',
    teksti: 'Chacopekari eli taguá on Paraguayn, Bolivian ja Argentiinan Gran Chacon pekari ja sukunsa Catagonus ainoa elävä laji. Se kuvattiin tieteelle 1930 pelkkien fossiilien perusteella ja sitä pidettiin sukupuuttoon kuolleena, kunnes elävä eläin löytyi 1971 Argentiinan Saltasta — paikallisille laji oli koko ajan tuttu. Chacopekari on kolmesta yleisesti hyväksytystä pekarilajista suurin, ja se eroaa sukulaisistaan pidemmillä korvilla, kuonolla ja hännällä sekä kolmannella takavarpaalla; suun ympärillä on valkoisia karvoja ja hartioilla valkoista turkkia. Kuiva ja pölyinen Chaco on muovannut sen: sivuontelot ovat poikkeuksellisen kehittyneet ja jalat pienet, jotta piikkipensaikossa on helpompi liikkua. Ravinto on kaktuksia, joita eläin pyörittää maassa sitkeällä kuonollaan piikit pois tai nyppii piikit hampaillaan ja sylkee ne ulos; munuaiset hajottavat kaktusten hapot ja kaksiosainen maha sulattaa karkean kasviaineksen. Lauma on enintään parikymmenpäinen, ja uhattuna se asettuu riviin puolustusmuuriksi. Kanta on noin 3 000 yksilöä ja laji on uhanalainen.',
    lahde: 'en-Wikipedia "Chacoan peccary", johdanto sekä osiot "History", '
      + '"Habitat", "Physical characteristics", "Behavior", "Food habits" ja '
      + '"Conservation status". Tarkistettu 6.9.2026.',
    kuva: 'elain-pry',
    // Piste on Gran Chacon pensasaavikolla Luoteis-Paraguayssa, 129,6
    // lautayksikköä lähimmästä kaupunkimerkistä (vähimmäisetäisyys 35).
    lon: -61.6,
    lat: -21.2,
  },
  URY: {
    elain: 'kapybara',
    otsikko: 'Maailman suurin jyrsijä käy vedessä viilentymässä',
    teksti: 'Kapybara on maailman suurin elävä jyrsijä, ja sitä tavataan kaikissa Etelä-Amerikan maissa Chileä lukuun ottamatta. Se on puoliksi vedessä elävä kasvinsyöjä, joka asuu savanneilla ja tiheissä metsissä makean veden äärellä ja syö pääasiassa heinää ja vesikasveja. Aikuinen on 106–134 senttimetriä pitkä, säkäkorkeus on 50–62 senttimetriä ja paino tavallisesti 35–66 kilogrammaa; suurin punnittu villi uros oli uruguaylainen, 73,5 kilogrammaa. Nimi tulee tupin sanasta ka’apiûara, joka tarkoittaa suunnilleen ohutlehtien syöjää. Kapybara on erinomainen uimari ja pystyy pidättämään hengitystään veden alla jopa viisi minuuttia: aamun se lepää kuivalla maalla, kuuman iltapäivän vedessä viilentymässä ja laiduntaa myöhään illalla ja yöllä. Laumassa on yleensä 10–20 yksilöä, kuivana kautena vesipaikoille voi kerääntyä 50–100. Etuhampaat kasvavat jatkuvasti, koska heinä kuluttaa niitä, ja eläin syö omat ulosteensa saadakseen suolistobakteerit selluloosan pilkkomiseen.',
    lahde: 'en-Wikipedia "Capybara", johdanto sekä osiot "Etymology", '
      + '"Description", "Activities", "Diet and predation" ja '
      + '"Social organization". Tarkistettu 6.9.2026.',
    kuva: 'elain-ury',
    // Piste on Keski-Uruguayn jokilaaksoissa, 87,2 lautayksikköä
    // Montevideosta (vähimmäisetäisyys 35).
    lon: -55.5,
    lat: -32.5,
  },
  VEN: {
    elain: 'jättimuurahaiskarhu',
    otsikko: 'Kieli, joka käy ulkona kolmesti sekunnissa',
    teksti: 'Jättimuurahaiskarhu on Keski- ja Etelä-Amerikan hyönteissyöjänisäkäs ja neljästä elävästä muurahaiskarhulajista suurin. Toisin kuin sukulaisensa ja laiskiaiset se elää lähes kokonaan maassa. Kokonaispituus on 182–217 senttimetriä, urokset painavat 33–50 ja naaraat 27–47 kilogrammaa. Pää on 30 senttimetriä pitkä ja lieriömäinen kuono vie siitä suurimman osan; näkö on heikko, mutta hajuaisti on noin neljäkymmentä kertaa ihmisen hajuaistia tarkempi. Hampaita ei ole lainkaan, ja noin 60 senttimetrin kieli on kiinnitetty omalla lihaksellaan suoraan rintalastaan; ojennettuna se ulottuu 45 senttimetriä ja liikkuu edestakaisin noin 160 kertaa minuutissa eli lähes kolmesti sekunnissa. Eläin etsii saaliinsa hajun perusteella, repii pesän auki etukynsillään ja kerää muurahaiset ja termiitit tahmealle kielelleen: se käy päivässä jopa kahdessasadassa pesässä, kussakin enintään minuutin, ja syö noin 35 000 hyönteistä. Emo kantaa poikastaan selässään vieroitukseen asti. Kansainvälinen luonnonsuojeluliitto luokittelee lajin vaarantuneeksi.',
    lahde: 'en-Wikipedia "Giant anteater", johdanto sekä osiot "Description" '
      + 'ja "Diet". Tarkistettu 6.9.2026.',
    kuva: 'elain-ven',
    // Piste on Apuren llanoilla Länsi-Venezuelassa, 105,2 lautayksikköä
    // Caracasista (vähimmäisetäisyys 35).
    lon: -68.5,
    lat: 7.5,
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
