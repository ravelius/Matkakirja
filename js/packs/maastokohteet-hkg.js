/*
 * MAASTOKOHTEET JA KOHTEET — HKG (Hongkong). Erä M3, Aasia, 6.9.2026.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Hongkongilla ei ollut yhtäkään karttamerkkiä ennen tätä erää
 * (docs/moduulit/karttanostot-kattavuus.md, Aasian taulukko). Tavoite
 * on kahdeksan KOHDETTA ja kolme MAASTOKOHDETTA maata kohti, mutta
 * Hongkong ei kanna kahdeksaa: tässä on NELJÄ kohdetta ja KAKSI
 * maastokohdetta. Kummallekin vajeelle on mitattu syy, ja molemmat on
 * kirjattu alle.
 *
 * MIKSI TÄSSÄ TIEDOSTOSSA EIKÄ fokuskohteet-hkg.js:ssä. Sama syy kuin
 * K2-erissä 1–4: kohdepakki vaatisi rivin js/fokuskohteet.js:n
 * KOHDE_MAAT-tauluun ja FOKUS_LISANIMET-lohkon (js/packs/fokus-grc.js),
 * jonka lähtöaineisto on ämpärissä eikä repossa. Maastokohteiden
 * hakemisto (js/packs/maastokohteet.js) liittää listan peliin
 * sellaisenaan, joten kohteet ovat kartalla heti.
 *
 * VAIN MAAILMANKARTAN RIVI. Euroopan erillislaudasta on luovuttu
 * (Raamattu 30.8.2026), ja Hongkong on joka tapauksessa sen kaavan
 * ulkopuolella. Koordinaatit on laskettu koneella
 * `tools/johda-maastokohteet.mjs`:n vientifunktiolla `laudat(lon, lat)`
 * en-Wikipedian coordinates-propin lon/lat-parista; kunkin kohteen
 * asteet ovat koordinaattirivin kommentissa.
 *
 * PELIKAUPUNGIN KOHDALLA -SÄÄNTÖ TÄYTTYY, VAIKKA MAA ON PIENI.
 * Laudan Hongkong-laatta (js/packs/maailmankartta.js CITIES) on
 * pohjoisempana kuin varsinainen alue: laatta on kohdassa
 * 9633,3 / 2438,3, kun taas Hongkongin niemet ja saaret projisoituvat
 * riville y ≈ 2449–2457. Lähin uusi merkki on Tai Fu Tai 10,9
 * lautayksikön päässä laatasta, kaukaisin Tai O 19,6 — kaikki siis yli
 * KAUPUNGIN_KOHDALLA_SADE-rajan (7, js/fokuskohteet.js) ja yli
 * kaupunkikaton säteen (8).
 *
 * JOKAINEN KOHDE ON KAUPUNKILEHDEN KOHDEKARTAN RUUDUN ULKOPUOLELLA.
 * Hongkongin kohdekartta (js/packs/maakartat.js hongkong) rajautuu
 * ruutuun lat 22,2665–22,3015 ja lon 114,1385–114,1805, eli
 * Victoria-satamaan ja sen molempiin rantoihin. Ruudun sisälle osuva
 * nosto kuuluu kohdekartan pisteelle eikä pääkartalle
 * (tools/tarkista-nostopaikat.mjs, tests/nostot-kartalla.test.mjs),
 * eikä tässä erässä lisätä kohdekartan pisteitä. Siksi kaikki alla
 * olevat merkit ovat ruudun ulkopuolella — Kowloonissa, Uusilla
 * alueilla tai Lantaulla — ja ruudun sisään osuvat aiheet odottavat
 * omaa erää: Peak Tram (1888), Hongkongin observatorio (1883), Tsim
 * Sha Tsuin kellotorni ja Victorian satama. Kaikki neljä oli
 * kirjoitettu valmiiksi ja pudotettiin vasta tässä vaiheessa.
 *
 * MIKSI VAIN NELJÄ KOHDETTA JA KAKSI MAASTOKOHDETTA. Koko Hongkong
 * mahtuu maailmankartalla noin 11 × 9 lautayksikön ruutuun, ja yhden
 * nostomerkin nimiölaatikko on leveämpi kuin koko alue
 * (js/fokusnosto-symbolit.js nostosymNimioLaatikko). Kahdeksan
 * kohdetta ja kolme maastokohdetta kirjoitettiin ensin, ja
 * tools/tarkista-nimiolimitys.mjs löysi niistä seitsemän
 * nimiö–nimiö-limitystä. Nimien lyhentäminen ei auttanut, koska
 * laatikolla on vähimmäisleveys, joten karsinta tehtiin merkkejä
 * pudottamalla ja mittaamalla joka askel työkalulla.
 *
 * KAHDEKSAN MERKKIÄ ON MAAN YLÄRAJA: kahdeksalla limityksiä on nolla
 * ja yhdeksännellä yksi, riippumatta siitä mikä yhdeksäs on. Kahdeksan
 * on jaettu näin: neljä kohdetta, kaksi maastokohdetta ja kaksi
 * skandaalia (js/packs/skandaalit.js HKG), jotka ovat oma kiintiönsä
 * eivätkä jousta. Viidenneksi kohteeksi oli valmiina Lei Cheng Ukin
 * Han-hauta (25–220 jaa.), joka jäi tästä erästä pois yhden limityksen
 * takia; se ja neljä kohdekartan ruutuun osuvaa aihetta ovat
 * Hongkongin kohdekartan työlistaa.
 *
 * HERKKIEN KOHTEIDEN LINJAUS (docs/aasia-tyoaineisto/spec-asia.md,
 * SITOVA): Hongkongista kirjoitetaan 1800-luvun satamahistoriaa,
 * kolonialismia neutraalina historiana, arkkitehtuuria ja ruokaa —
 * EI 2010–2020-lukujen protesteja eikä turvallisuuslakia. Yhdessäkään
 * alla olevassa kortissa ei ole nykypolitiikkaa.
 *
 * KUVATON ERÄ, kuten K2-erät 1–4: kortti kantaa tekstin ja lähteen.
 * Tarkistamaton Commons-tiedosto olisi huonompi kuin kuvaton kortti
 * (Perustuslaki, faktakuri). Faktat on luettu en-Wikipedian
 * raakatekstistä kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_HKG = [
  /* ─────────────────────────── KOHTEET (4) ─────────────────────── */
  {
    id: 'kowloonin-muurikaupunki',
    nimi: 'Kowloonin muurikaupunki',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi muurikaupunki jäi vuoden 1898 vuokrasopimuksen ulkopuolelle?',
      'Mitä paikalla on nyt?',
    ],
    korostukset: ['enklaavi|enklaavi'],
    nappi: 'Maailman tihein kortteli',
    // 114.19028 E / 22.33222 N — en-Wikipedia "Kowloon Walled City"
    laudat: {
      maailmankartta: { x: 9639.7, y: 2454.7 },
    },
    teksti: 'Kowloonin muurikaupunki alkoi Song-kauden vartioasemana ja '
      + 'muutettiin 1847 rannikkolinnakkeeksi. Kun Uudet alueet vuokrattiin '
      + 'Britannialle 1898, sopimus jätti muurikaupungin nimenomaisesti '
      + 'ulkopuolelle, ja siitä tuli enklaavi keskelle brittiläistä Hongkongia. '
      + 'Vuoteen 1987 mennessä 2,6 hehtaarin alueella asui arviolta 33 000 '
      + 'ihmistä — noin 1,2 miljoonaa neliökilometriä kohti. Talot purettiin '
      + '1993–1994, ja tilalle avattiin joulukuussa 1995 Kowloon Walled City '
      + 'Park.',
    lahde: 'en-Wikipedia "Kowloon Walled City", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'tai-o',
    nimi: 'Tai O',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä nimi Tai O tarkoittaa?',
      'Mistä kylä sai elantonsa suolan lisäksi?',
    ],
    korostukset: ['suolatasangot|suolatasangot'],
    nappi: 'Kalastajakylä paaluilla',
    // 113.86417 E / 22.25444 N — en-Wikipedia "Tai O"
    laudat: {
      maailmankartta: { x: 9628.8, y: 2457.4 },
    },
    teksti: 'Tai O on kalastajakylä Lantaun länsipäässä; nimi tarkoittaa suurta '
      + 'lahdelmaa ja viittaa siihen, mihin Tai O Creek ja Tai O River yhtyvät. '
      + 'Kylä on rakennettu jokihaarojen rannoille, ja siihen kuuluu myös '
      + 'samanniminen pikkusaari. Se on yksi viidestä Lantaun kylästä, joihin '
      + 'palattiin, kun rannikon tyhjennysmääräys purettiin 1669. Suolanviljely '
      + 'oli pitkään elinkeino: vuonna 1940 kirjattiin, että 70 eekkerin '
      + 'suolatasangot olivat tuottaneet 1938 noin 25 000 piculia eli 1 512 tonnia '
      + 'suolaa.',
    lahde: 'en-Wikipedia "Tai O", johdanto sekä osiot "Geography" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'tung-chungin-linnake',
    nimi: 'Tung Chungin linnake',
    tyyppi: 'historia',
    kysymykset: [
      'Ketä vastaan linnake alun perin rakennettiin?',
      'Kuka merirosvo käytti lahtea tukikohtanaan?',
    ],
    korostukset: ['suolansalakuljettajia|suolansalakuljettajia'],
    nappi: 'Kuusi tykkiä Lantaun rinteellä',
    // 113.9356 E / 22.2779 N — en-Wikipedia "Tung Chung Fort"
    laudat: {
      maailmankartta: { x: 9631.2, y: 2456.6 },
    },
    teksti: 'Linnake rakennettiin eteläisen Song-dynastian Shun Hei -kaudella '
      + '(1174–1189), kun laivasto lähetettiin kukistamaan Lantaun '
      + 'suolansalakuljettajia: kolmesataa sotilasta sijoitettiin Tung Chungiin '
      + 'ja he pystyttivät linnakkeen. Qing-kaudella lahtea käyttivät merirosvot, '
      + 'heidän joukossaan kuuluisa Cheung Po Tsai, ja hallitus sai linnakkeen '
      + 'takaisin vasta tämän antauduttua. Se kunnostettiin 1832 ja pidettiin '
      + 'miehitettynä rannikon puolustukseksi vuoden 1898 vuokrasopimukseen '
      + 'saakka. Paikalla on yhä kuusi suuaukosta ladattavaa tykkiä ja kolme '
      + 'kaariporttia; muinaismuistoksi se julistettiin 1979.',
    lahde: 'en-Wikipedia "Tung Chung Fort", osiot "History" ja "Features" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'tai-fu-tai',
    nimi: 'Tai Fu Tai',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka rakennutti talon?',
      'Millaista säätyä rakennus edustaa?',
    ],
    korostukset: ['oppineiston|oppineiston'],
    nappi: 'Qing-kauden herrastalo',
    // 114.0764 E / 22.4996 N — en-Wikipedia "Tai Fu Tai Mansion"
    laudat: {
      maailmankartta: { x: 9635.9, y: 2448.9 },
    },
    teksti: 'Tai Fu Tai on asuinrakennus Wing Ping Tsuenin kylässä San Tinissä '
      + 'Yuen Longin pohjoispuolella. Se rakennettiin todennäköisesti 1865 '
      + 'Qing-dynastian aikana Man Chung-luenille, jonka suku oli asettunut San '
      + 'Tiniin 1400-luvulla. Talon edessä on avoin piha ja takana puutarha, ja '
      + 'koko rakennusta kiertää vihertiilinen muuri. Se on hieno esimerkki '
      + 'oppineiston säätyläisasumuksesta, ja rakennus mitattiin 2007 '
      + 'kolmiulotteisella laserkeilauksella.',
    lahde: 'en-Wikipedia "Tai Fu Tai Mansion", osiot "History" ja "Description" '
      + '(tarkistettu 6.9.2026).',
  },
  /* ────────────────────── MAASTOKOHTEET (2) ────────────────────── */
  {
    id: 'tai-mo-shan',
    nimi: 'Tai Mo Shan',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Uusien alueiden luoteisosa on kuiva?',
      'Mikä Ng Tung Chain putous on?',
    ],
    korostukset: ['sadevarjo|sadevarjo'],
    nappi: 'Hongkongin korkein huippu',
    // 114.12314 E / 22.41181 N — en-Wikipedia "Tai Mo Shan"
    laudat: {
      maailmankartta: { x: 9637.4, y: 2451.9 },
    },
    teksti: 'Tai Mo Shan on Hongkongin korkein huippu, 957 metriä Hongkongin '
      + 'peruskorkeusjärjestelmästä, ja se sijaitsee suunnilleen Uusien alueiden '
      + 'maantieteellisessä keskipisteessä. Vuori katkaisee etelästä tulevan '
      + 'monsuunin, ja sen taakse jäävä sadevarjo tekee Uusien alueiden pohjois- '
      + 'ja luoteisosista kuivia. Geologisesti kyseessä on sammunut jurakauden '
      + 'tulivuori. Ng Tung Chain 35-metrinen Long Falls on Hongkongin korkein '
      + 'vesiputous.',
    lahde: 'en-Wikipedia "Tai Mo Shan", johdanto sekä osiot "Geography" ja '
      + '"Geology" (tarkistettu 6.9.2026).',
  },
  {
    id: 'lantau',
    nimi: 'Lantau',
    tyyppi: 'saari',
    kysymykset: [
      'Kuinka paljon Lantau on Hongkongin saarta suurempi?',
      'Miksi saarta kutsutaan Hongkongin keuhkoiksi?',
    ],
    korostukset: ['maaseutupuistoa|maaseutupuistoa'],
    nappi: 'Hongkongin suurin saari',
    // 113.95278 E / 22.27056 N — en-Wikipedia "Lantau Island"
    laudat: {
      maailmankartta: { x: 9631.8, y: 2456.9 },
    },
    teksti: 'Lantau on Hongkongin suurin saari: 147,16 neliökilometriä eli lähes '
      + 'kaksi kertaa Hongkongin saaren kokoinen. Maasto on enimmäkseen '
      + 'vuoristoista, ja Lantau Peak (934 m) on koko alueen toiseksi korkein '
      + 'huippu Tai Mo Shanin jälkeen. Saarta kutsutaan Hongkongin keuhkoiksi, '
      + 'koska sillä on runsaasti alkuperäistä metsää ja vähän tornitaloja; '
      + 'maaseutupuistoa on hieman yli puolet pinta-alasta. Fan Lau Kok saaren '
      + 'lounaiskärjessä on koko Hongkongin eteläisin niemi.',
    lahde: 'en-Wikipedia "Lantau Island", johdanto ja osio "Geography" '
      + '(tarkistettu 6.9.2026).',
  },
];
