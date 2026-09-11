/*
 * MAASTOKOHTEET — EST. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs EST --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/EST.json. Työkalu laskee laudan
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
 * ── K2-ERÄ 2.9.2026: KAHDEKSAN KOHDETTA MAASTON RINNALLE ───────────
 *
 * Omistaja 2.9.2026: *"pitäisi jatkaa kaikki Euroopan maat loppuun
 * näiden karttanostojen osalta."* Viro oli yksi laudan tyhjimmistä
 * maista: kymmenen karttamerkkiä ja nolla kuratoitua kohdetta
 * (docs/moduulit/karttanostot-kattavuus.md). Tavoite on kahdeksan
 * KOHDETTA maastokohteiden lisäksi, ja tässä ne ovat.
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-est.js:ssä.
 * Kohdepakki tarvitsisi rivin js/fokuskohteet.js:n KOHDE_MAAT-tauluun
 * ja lehden poltettujen nimien lohkon (js/packs/fokus-grc.js
 * FOKUS_LISANIMET, tests/fokusnimet.test.mjs). Kumpaakaan ei voitu
 * tehdä tässä erässä: KOHDE_MAAT on rinnakkaisen erän hallussa, ja
 * lisänimien lohko ladotaan ämpärin `<ISO>.json`-tiedostosta, jota
 * repossa ei ole. Tämän tiedoston lista sen sijaan liittyy peliin
 * hakemiston kautta (js/packs/maastokohteet.js), joten kohteet ovat
 * kartalla heti — ja kun KOHDE_MAAT vapautuu, lohko siirtyy omaan
 * pakkiinsa sellaisenaan.
 *
 * KAIKKI KAHDEKSAN OVAT KAUKANA PELIKAUPUNGISTA. Lähinkin (Kihnu)
 * on 27,1 lautayksikön päässä lähimmästä pelikaupungista, eli
 * reilusti yli kaupungin kohdalla -säteen (KAUPUNGIN_KOHDALLA_SADE 7,
 * js/fokuskohteet.js). Yksikään ei siis kuulu kohdekartalle, vaan
 * kaikki ovat pääkartan merkkejä — omistajan sääntö kohdekaupunkien
 * nostoista ei koske näitä.
 *
 * KUVATON ERÄ. Sama linja kuin maastokohteilla muutenkin: kortti
 * kantaa tekstin ja lähteen, ei kuvaa. Tarkistamaton Commons-tiedosto
 * olisi huonompi kuin kuvaton kortti (Perustuslaki, faktakuri).
 * Faktat on tarkistettu en-Wikipediasta kohde kerrallaan 2.9.2026.
 *
 * Viron maastokohteet. Faktat en-Wikipediasta 29.8.2026. Pieni maa: kolme kohdetta.
 */
export const MAASTOKOHTEET_EST = [
  {
    id: 'suurmunamagi',
    nimi: 'Suur Munamägi',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä nimi Suur Munamägi tarkoittaa?',
      'Millainen on Haanjan ylänkö?',
    ],
    korostukset: ['Haanjan ylänkö|Haanjan ylänkö'],
    nappi: 'Baltian korkein kohta',
    // 27.0592 E / 57.7144 N — en-Wikipedia "Suur Munamägi"
    laudat: {
      maailmankartta: { x: 6735.3, y: 1037.6 },
      europe: { x: 730.7, y: 375.7 },
    },
    teksti: 'Suur Munamägi on Viron ja koko Baltian korkein kohta, 318 metriä merenpinnasta. Se on '
      + 'Haanjan kylän lähellä Võrumaalla Viron kaakkoiskolkassa, aivan Latvian ja Venäjän '
      + 'rajojen tuntumassa. Nimi tarkoittaa suomeksi suurta munamäkeä, ja ympäröivä Haanjan '
      + 'ylänkö on loivasti kumpuilevaa.',
    lahde: 'en-Wikipedia "Suur Munamägi", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'itameri',
    nimi: 'Itämeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Itämeren vesi on murtovettä?',
      'Miksi Viron saaret ovat niin matalia?',
    ],
    korostukset: ['murtovesi|murtovesiallas'],
    nappi: 'Maailman suurin murtovesiallas',
    // 22.4 E / 58.4 N — ulappa Saarenmaan länsipuolella; artikkelin oma keskipiste on 20 / 58
    laudat: {
      maailmankartta: { x: 6580, y: 1004.4 },
      europe: { x: 641.3, y: 357.7 },
    },
    teksti: 'Itämeren pohjassa lepää laivoja, jotka eivät ole lahonneet. Vesi on kylmää ja '
      + 'niin vähäsuolaista, ettei laivamato viihdy siinä, ja siksi vanhat puuhylyt säilyvät '
      + 'täällä toisin kuin valtamerissä. Kuuluisin niistä on ruotsalainen sotalaiva Vasa: se '
      + 'kaatui neitsytmatkallaan 10. elokuuta 1628 reilun kilometrin purjehdittuaan, ja se '
      + 'nostettiin pohjasta 333 vuotta myöhemmin lähes ehjin rungoin. Meri on Atlantin haara, '
      + 'jonka ympäröivät Tanska, Viro, Suomi, Saksa, Latvia, Liettua, Puola, Venäjä ja '
      + 'Ruotsi, ja se on maailman suurin murtovesiallas. Viron rannikko on kahden lahden '
      + 'välissä: pohjoisessa Suomenlahti, etelässä Riianlahti. Maan länsipuolinen matala '
      + 'saaristo kuuluu siihen noin 45 prosenttiin merestä, joka on tavallisenakin talvena '
      + 'jään peitossa.',
    lahde: 'en-Wikipedia "Baltic Sea", johdanto-osa sekä osiot "Storms and storm floods", '
      + '"Temperature and ice"; laivan osalta "Vasa (ship)", johdanto-osa (tarkistettu '
      + '1.9.2026).',
  },
  {
    id: 'suomenlahti',
    nimi: 'Suomenlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Tallinnasta tuli hansakaupunki?',
      'Kuinka syvä Suomenlahti on?',
    ],
    korostukset: ['Neva|Neva'],
    nappi: 'Itämeren itäisin haara',
    // 25.4 E / 59.6 N — en-Wikipedia "Gulf of Finland" (26 / 59,83), siirretty Viron rannikon puolelle
    laudat: {
      maailmankartta: { x: 6680, y: 945.6 },
      europe: { x: 698.9, y: 326.1 },
    },
    teksti: 'Suomenlahti on Itämeren itäisin haara. Se ulottuu Suomen ja Viron välissä itään '
      + 'Pietariin asti, jonne Neva laskee. Lahden rannoilla ovat myös Helsinki ja Tallinna, ja '
      + 'koska lahti on matala, Itämeren ympäristöongelmat näkyvät siinä kaikkein selvimmin.',
    lahde: 'en-Wikipedia "Gulf of Finland", johdanto-osa (tarkistettu 29.8.2026).',
  },
  /* ================================================================
   * K2-ERÄ 2.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   *
   * Uusilla kohteilla on vain maailmankartan rivi: Euroopan
   * erillislaudasta on luovuttu (Raamattu 30.8.2026). Yllä olevien
   * maastokohteiden vanhoihin riveihin ei ole koskettu.
   *
   * TALLINNA ON JÄTETTY RAUHAAN: kaupungin nostot asuvat
   * kohdekartalla, eikä kohdekaupungin kohdalla oleva merkki kuulu
   * pääkartalle. Lähin uusi kohde on Kihnu 27,1 lautayksikön päässä.
   * ============================================================== */
  {
    id: 'tartu-ulikool',
    nimi: 'Tartun yliopisto',
    nimio: 'Tartu',
    tyyppi: 'sana',
    kysymykset: [
      'Kuka perusti yliopiston ja milloin?',
      'Miksi yliopisto siirrettiin Tallinnaan?',
    ],
    korostukset: ['Academia Gustaviana|Academia Gustaviana'],
    nappi: 'Ruotsin kolmanneksi vanhin yliopisto',
    // 26.7208 E / 58.3814 N — Tartun vanha yliopistorakennus;
    // en-Wikipedia "University of Tartu" (artikkelilla ei ole koordinaattia).
    laudat: {
      maailmankartta: { x: 6724, y: 1005.4 },
    },
    teksti: 'Tartun yliopisto on Viron kansallinen yliopisto sekä maan vanhin ja '
      + 'suurin. Ruotsin kuningas Kustaa II Aadolf allekirjoitti perustamiskirjan '
      + '30. kesäkuuta 1632 kesken Saksan-sotaretkeään, muutama kuukausi ennen '
      + 'kuolemaansa Lützenin taistelussa. Ensimmäinen kansleri oli vapaaherra '
      + 'Johan Skytte, Liivinmaan, Inkerin ja Karjalan kenraalikuvernööri.\n\n'
      + 'Yliopisto sai kaksi nimeä: Academia Dorpatensis sijaintinsa ja Academia '
      + 'Gustaviana perustajakuninkaansa mukaan. Se oli tuolloin Ruotsin '
      + 'valtakunnan kolmanneksi vanhin yliopisto Greifswaldin ja Uppsalan jälkeen '
      + 'ja Turun akatemiaa vanhempi. Edeltäjä oli jesuiittojen latinakoulu '
      + 'Gymnasium Dorpatense, jonka Puola-Liettuan kuningas Stefan Batory perusti '
      + '1583 ja joka toimi vuoteen 1601.\n\n'
      + 'Ensimmäiset ylioppilaat kirjoittautuivat 20.–21. huhtikuuta 1632, ja '
      + 'avajaiset pidettiin saman vuoden lokakuun 15. päivänä. Akatemiassa oli '
      + 'filosofian, oikeustieteen, teologian ja lääketieteen tiedekunnat, ja sillä '
      + 'oli samat oikeudet kuin Uppsalan yliopistolla. Kun Venäjän ja Ruotsin sota '
      + '1656–1658 puhkesi, yliopisto siirrettiin Tartosta Tallinnaan. Vanhat '
      + 'rakennukset kuuluvat Euroopan kulttuuriperintötunnuksen listalle '
      + 'valistusajan yliopisto-aatteen ruumiillistumana.',
    lahde: 'en-Wikipedia "University of Tartu", johdanto-osa ja osio '
      + '"History/Academia Gustaviana" (tarkistettu 2.9.2026).',
  },
  {
    id: 'narvan-linnus',
    nimi: 'Narvan linnus',
    nimio: 'Narva',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi Hermannin torni rakennettiin valmiiksi?',
      'Kuka myi Narvan Liivinmaan ritarikunnalle?',
    ],
    korostukset: ['Ivangorod|Ivangorodin'],
    nappi: 'Kaksi linnaa vastakkain joen yli',
    // 28.1936 E / 59.3778 N — en-Wikipedia "Hermann Castle"
    laudat: {
      maailmankartta: { x: 6773.1, y: 956.6 },
    },
    teksti: 'Narvan linnus eli Hermannin linna on keskiaikainen linna Koillis-Virossa. '
      + 'Se perustettiin noin vuonna 1256, kun alue kuului Tanskan valtakuntaan. '
      + 'Tanskalaiset olivat valloittaneet Pohjois-Viron 1200-luvulla ja pystyttivät '
      + 'aluksi puisen rajalinnoituksen kohtaan, jossa vanha tie ylitti Narvajoen. '
      + 'Sen suojassa asutus kasvoi Narvan kaupungiksi, joka sai Lyypekin '
      + 'kaupunkioikeudet 1300-luvun alkupuolella.\n\n'
      + 'Kun kahnaukset Novgorodin ja Pihkovan kanssa jatkuivat, tanskalaiset '
      + 'aloittivat 1300-luvun alussa kivilinnoituksen: pienen linnakkeen, jonka '
      + 'sivut olivat neljäkymmentä metriä ja jonka luoteiskulmassa seisoi nykyisen '
      + 'Hermannin tornin edeltäjä. Vuonna 1346 kuningas Valdemar IV myi '
      + 'Pohjois-Viron ja sen mukana Narvan Liivinmaan ritarikunnalle, joka rakensi '
      + 'linnasta konventtitalon omiin tarpeisiinsa.\n\n'
      + 'Hermannin tornin viimeisteli ritarikunta, ja syy oli vastarannalla: '
      + 'Moskovan Venäjä perusti 1492 Ivangorodin linnoituksen suoraan joen toiselle '
      + 'puolelle. Ritarikunta ympäröi myös kaupungin muurilla, jossa oli neljä '
      + 'porttia; muuria ei ole säilynyt, sillä se määrättiin purettavaksi 1777.',
    lahde: 'en-Wikipedia "Hermann Castle", johdanto-osa ja osio "Medieval '
      + 'fortifications" (tarkistettu 2.9.2026).',
  },
  {
    id: 'kuressaaren-linna',
    nimi: 'Kuressaaren linna',
    nimio: 'Kuressaare',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi linna rakennettiin juuri Saarenmaalle?',
      'Mihin linnaa käytettiin 1800-luvulla?',
    ],
    korostukset: ['vaivaistalo|vaivaistalona'],
    nappi: 'Piispanlinna, joka jäi rintaman taakse',
    // 22.4833 E / 58.2528 N — en-Wikipedia "Kuressaare Castle"
    laudat: {
      maailmankartta: { x: 6582.8, y: 1011.6 },
    },
    teksti: 'Kuressaaren piispanlinna seisoo Saarenmaalla Länsi-Virossa. Vanhin '
      + 'kirjallinen maininta on 1380-luvulta, kun Saksalainen ritarikunta aloitti '
      + 'sen rakentamisen Saare-Läänen piispoille. Saarenmaan asukkaat vastustivat '
      + 'käännytystä sitkeästi, ja linna kuului ristiretkeläisten laajempaan '
      + 'yritykseen saada saari haltuunsa. Alusta asti se oli piispan tukikohta ja '
      + 'yksi hiippakunnan tärkeimmistä linnoista aina Liivinmaan sotaan asti.\n\n'
      + 'Vuonna 1559 Tanska-Norja otti Saarenmaan ja linnan haltuunsa ja uudisti '
      + 'linnoitukset. Brömsebron rauhan jälkeen saari siirtyi Ruotsille, joka '
      + 'jatkoi uudistustyötä vuoteen 1706. Suuren Pohjan sodan jälkeen Saarenmaa ja '
      + 'linna tulivat osaksi Venäjän keisarikuntaa.\n\n'
      + 'Kun valtakunnan raja siirtyi vähitellen länteen, Kuressaare menetti '
      + 'sotilaallisen merkityksensä. Vuonna 1836, kun Ahvenanmaalle oli rakennettu '
      + 'Bomarsundin linnoitus, venäläinen varuskunta vetäytyi Kuressaaresta, ja '
      + '1800-luvulla linnaa käytettiin vaivaistalona. Arkkitehdit Karl Rudolf '
      + 'Hermann Seuberlich ja Wilhelm Neumann kunnostivat sen 1904–1912. Linnaa '
      + 'pidetään Viron parhaiten säilyneenä keskiaikaisena linnoituksena, ja '
      + 'nykyään siinä toimii Saarenmaan museo.',
    lahde: 'en-Wikipedia "Kuressaare Castle", johdanto-osa sekä osiot "History" ja '
      + '"Architecture" (tarkistettu 2.9.2026).',
  },
  {
    id: 'kopu-tuletorn',
    nimi: 'Kõpun majakka',
    nimio: 'Kõpu',
    tyyppi: 'merenkulku',
    kysymykset: [
      'Miksi torni oli aluksi umpinainen kiviröykkiö?',
      'Kuinka kaukaa majakan valo näkyy?',
    ],
    korostukset: ['Hiiun matalikko|Hiiun matalikon'],
    nappi: 'Majakka, joka on palanut vuodesta 1531',
    // 22.1997 E / 58.9169 N — en-Wikipedia "Kõpu Lighthouse"
    laudat: {
      maailmankartta: { x: 6573.3, y: 979.2 },
    },
    teksti: 'Kõpun majakka Hiidenmaalla on yksi maailman vanhimmista majakoista: se '
      + 'on ollut yhtäjaksoisessa käytössä valmistumisestaan vuodesta 1531 asti. Se '
      + 'on poikkeuksellinen myös siksi, että se on kulkenut kaikki vaiheet '
      + 'keskiaikaisesta maamerkistä nykyaikaiseen sähkömajakkaan.\n\n'
      + 'Majakka merkitsee Hiiun matalikon ja varoittaa laivoja rantautumasta. '
      + 'Torni seisoo Hiidenmaan korkeimman kukkulan Tornimägin laella; rakennus '
      + 'itse on 37,7 metriä korkea, mutta valo on 103,6 metriä merenpinnan '
      + 'yläpuolella, mikä tekee siitä Itämeren korkeimmalla olevan rannikkovalon. '
      + 'Valo näkyy navigointiin asti 26 meripeninkulman päähän.\n\n'
      + 'Torni on neliömäinen prisma, jonka neljällä ilmansuunnalla on massiiviset '
      + 'tukipilarit. Kahdenkymmenenneljän metrin korkeuteen asti se on pelkkää '
      + 'kiveä: ulkopinta on sidottu kalkkilaastilla, mutta runko on ladottu ilman '
      + 'laastia. Kiveä on noin 5 000 kuutiometriä ja painoa 12 000 tonnia. Alun '
      + 'perin torni oli umpinainen eikä siinä poltettu valoa lainkaan — se oli '
      + 'pelkkä maamerkki, jonka hansakauppiaat halusivat niemelle jo 1490-luvulla. '
      + 'Kun valo tuli, huipulle noustiin ulkopuolisia puuportaita; vasta 1800-luvun '
      + 'korjauksessa torniin louhittiin portaikko ja kaksi huonetta.',
    lahde: 'en-Wikipedia "Kõpu Lighthouse", johdanto-osa sekä osiot "Location and '
      + 'design" ja "Construction and history" (tarkistettu 2.9.2026).',
  },
  {
    id: 'kihnu',
    nimi: 'Kihnu',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi saaren perinteet ovat naisten hallussa?',
      'Mikä on kört?',
    ],
    korostukset: ['kört|kört'],
    nappi: 'Saari, jonka kulttuuria vaalivat naiset',
    // 23.99 E / 58.13 N — en-Wikipedia "Kihnu"
    laudat: {
      maailmankartta: { x: 6633, y: 1017.6 },
    },
    teksti: 'Kihnu on virolainen saari Itämerellä, pinta-alaltaan 16,4 neliökilometriä. '
      + 'Se on Riianlahden suurin ja koko maan seitsemänneksi suurin saari, seitsemän '
      + 'kilometriä pitkä ja 3,3 kilometriä leveä; korkein kohta on 8,9 metriä '
      + 'merenpinnan yläpuolella. Saarella on neljä kylää.\n\n'
      + 'Koska saaren miehet ovat olleet usein merellä, naiset ovat pyörittäneet '
      + 'arkea ja heistä on tullut saaren kulttuuriperinnön vaalijoita: käsitöiden, '
      + 'tanssien, leikkien ja musiikin. Musiikki kulkee käsitöiden, kirkkojuhlien '
      + 'ja muiden juhlien mukana, ja vanhat runolaulut ovat yhä tärkeitä. '
      + 'Häätavat ovat kaikkein monimutkaisin ja kirkkain kihnulaisen kulttuurin '
      + 'ilmaus.\n\n'
      + 'Saari tunnetaan käsitöistään ja omaleimaisesta kansanpuvustaan, jota '
      + 'käytetään yhä arjessa: raidallinen hame kört, kuvioitu miesten neuletakki '
      + 'troi ja neulotut lapaset. Viron viittomakielessä saari viitotaan '
      + 'jäljittelemällä körtin pystyraitoja. Unesco julisti Kihnun kulttuuritilan '
      + 'ja perinteet ihmiskunnan suullisen ja aineettoman perinnön mestariteokseksi '
      + '7. marraskuuta 2003.',
    lahde: 'en-Wikipedia "Kihnu", johdanto-osa ja osio "Culture" '
      + '(tarkistettu 2.9.2026).',
  },
  {
    id: 'parnu',
    nimi: 'Pärnu',
    tyyppi: 'kauppa',
    kysymykset: [
      'Miksi Pärnun satama oli Liivinmaalle tärkeä?',
      'Mikä toimi kaupungissa vuosina 1699–1710?',
    ],
    korostukset: ['jäätön satama|jäätön satama'],
    nappi: 'Liivinmaan jäätön ovi Itämerelle',
    // 24.5 E / 58.3833 N — en-Wikipedia "Pärnu"
    laudat: {
      maailmankartta: { x: 6650, y: 1005.3 },
    },
    teksti: 'Pärnu on kaupunki Lounais-Virossa Pärnunlahden rannalla, 128 kilometriä '
      + 'Tallinnasta etelään. Lahti on Riianlahden poukama, ja kaupungin kohdalla '
      + 'Pärnujoki laskee mereen.\n\n'
      + 'Kaupunkeja oli oikeastaan kaksi. Vanhan Pärnun perusti Saare-Läänen piispa '
      + 'noin 1251, mutta se kärsi kilpailijansa puristuksessa ja tuhoutui lopulta '
      + 'noin 1600. Toisen kaupungin, Embeken, perusti Saksalainen ritarikunta, joka '
      + 'aloitti linnan rakentamisen lähistölle 1265. Juuri tästä jälkimmäisestä — '
      + 'saksalaisittain Pernausta — tuli Hansaliiton jäsen ja Liivinmaan tärkeä '
      + 'jäätön satama.\n\n'
      + 'Vallanpitäjä vaihtui monta kertaa. Puola-Liettua hallitsi kaupunkia '
      + '1560–1617, sitten Ruotsi, jonka Liivinmaahan se kuului. Vuonna 1699 '
      + 'Academia Gustavo-Carolina, Tartun yliopiston edeltäjä, siirrettiin Tartosta '
      + 'Pärnuun, ja se toimi täällä vuoteen 1710. Suuren Pohjan sodan jälkeen '
      + 'Ruotsi menetti Pärnun ja koko Liivinmaan Venäjälle, ja kaupunki kuului '
      + 'Liivinmaan kuvernementtiin vuoteen 1917.',
    lahde: 'en-Wikipedia "Pärnu", johdanto-osa ja osio "History" '
      + '(tarkistettu 2.9.2026).',
  },
  {
    id: 'matsalu',
    nimi: 'Matsalu',
    tyyppi: 'elain',
    kysymykset: [
      'Kuinka monta vesilintua ohittaa lahden keväisin?',
      'Miksi juuri tämä lahti on linnuille tärkeä?',
    ],
    korostukset: ['Itä-Atlantin muuttoreitti|Itä-Atlantin muuttoreitillä'],
    nappi: 'Kaksi miljoonaa lintua yhtenä keväänä',
    // 23.5969 E / 58.76 N — en-Wikipedia "Matsalu National Park"
    laudat: {
      maailmankartta: { x: 6619.9, y: 986.9 },
    },
    teksti: 'Matsalun kansallispuisto on 486 neliökilometrin suojelualue Länsi- ja '
      + 'Pärnunmaalla. Siihen kuuluvat Matsalunlahti, Kasarijoen suisto, Matsalun '
      + 'kylä ja ympäröivät alueet: tulvaniityt, rantaniityt, ruovikot, metsät ja '
      + 'yli viisikymmentä saarta lahden suulla.\n\n'
      + 'Matsalunlahti on yksi Euroopan tärkeimmistä kosteikkolintualueista, koska '
      + 'se sijaitsee Itä-Atlantin muuttoreitillä. Joka kevät lahden ohi kulkee yli '
      + 'kaksi miljoonaa vesilintua, joista noin 1,6 miljoonaa on alleja. Alue on '
      + 'koti monelle uhanalaiselle lajille: merikotka on korkeimmassa '
      + 'suojeluluokassa, ja lisäksi suojeltuja ovat 22 kasvilajia, juovakonna ja '
      + 'kymmenen nisäkäslajia.\n\n'
      + 'Lahti on matala, vähäsuolainen ja ravinteikas: kahdeksantoista kilometriä '
      + 'pitkä ja kuusi leveä, mutta keskisyvyydeltään vain puolitoista metriä. '
      + 'Rantaviivaa on noin 165 kilometriä. Kasarijoen suiston tulvaniitty, '
      + 'neljäkymmentä neliökilometriä, on yksi Euroopan laajimmista avoimista '
      + 'kosteista niityistä.',
    lahde: 'en-Wikipedia "Matsalu National Park", johdanto-osa ja osio '
      + '"Description" (tarkistettu 2.9.2026).',
  },
  {
    id: 'struven-kaari',
    nimi: 'Struven kaari',
    nimio: 'Struve',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mitä Struven kaarella mitattiin?',
      'Miten mittauspisteet on merkitty maastoon?',
    ],
    korostukset: ['meridiaanikaari|meridiaanikaaren'],
    nappi: 'Kolmiomittausketju Jäämereltä Mustallemerelle',
    // 26.3378 E / 59.0578 N — Woibiferin (Võivere) mittauspiste
    // Väike-Maarjan pitäjässä; en-Wikipedia "Struve Geodetic Arc".
    laudat: {
      maailmankartta: { x: 6711.3, y: 972.3 },
    },
    teksti: 'Struven kaari on kolmiomittausten ketju, joka ulottuu Norjan '
      + 'Hammerfestista Mustallemerelle: kymmenen maan halki ja yli 2 820 '
      + 'kilometriä. Se tuotti ensimmäisen tarkan meridiaanikaaren mittauksen.\n\n'
      + 'Ketjun rakensi ja mittasi saksalaissyntyinen venäläinen tiedemies '
      + 'Friedrich Georg Wilhelm von Struve vuosina 1816–1855 selvittääkseen maapallon '
      + 'tarkan koon ja muodon. Silloin ketju kulki vain kolmen maan halki: Norjan, '
      + 'Ruotsin ja Venäjän keisarikunnan. Kaaren ensimmäinen piste on Tartossa '
      + 'observatoriolla, jossa Struve teki suuren osan tutkimuksistaan. Ketjussa on '
      + '258 päämittauskolmiota ja 265 mittauspistettä.\n\n'
      + 'Maastossa pisteet on merkitty vaatimattomasti: kallioon porattuina reikinä, '
      + 'rautaristeinä ja kivikasoina. Vuonna 2005 ketju otettiin '
      + 'maailmanperintöluetteloon geodesian merkityksensä ja kansainvälisen '
      + 'tieteellisen yhteistyön todistuskappaleena; luetteloon kuuluu 34 '
      + 'muistolaattaa tai obeliskia alkuperäisistä 265 pisteestä. Virossa niitä on '
      + 'kolme: Woibifer eli Võivere ja Katko eli Simuna Väike-Maarjan pitäjässä '
      + 'sekä Dorpat eli Tarton vanha observatorio.',
    lahde: 'en-Wikipedia "Struve Geodetic Arc", johdanto-osa ja osio "Chain/Estonia" '
      + '(tarkistettu 2.9.2026).',
  },
  /* ================================================================
   * NOSTOERÄ 11.9.2026 — SEITSEMÄN KOHDETTA LISÄÄ.
   *
   * Omistaja 11.9.2026: *"Suomesta puuttuu lisäksi myös nostoja …
   * Agentit voisivat tarkastaa myös muut Euroopan maat että kaikissa
   * tarpeeksi nostoja."* Päätoimittajan tavoite on 20 pääkartan nostoa
   * per Euroopan maa; Viro oli kolmessatoista ja koko Euroopan
   * heikoimpia.
   *
   * VIROSSA ON YKSI PELIKAUPUNKI (Tallinna). Lähin uusi merkki on
   * Haapsalu 67 lautayksikön päässä siitä, joten yksikään näistä ei jää
   * kaupunkikaton alle (js/fokuskohteet.js) — kaikki seitsemän ovat
   * pääkartan merkkejä. Tallinnan omia nähtävyyksiä ei siksi otettu
   * mukaan lainkaan: ne kuuluvat kaupunkilehden kohdekartalle.
   *
   * PEIPSIJÄRVI ON TYYPPIÄ 'meri' EIKÄ 'jarvi' — perustelu on kirjattu
   * js/packs/maastokohteet-gha.js:n Voltajärvi-kortissa.
   *
   * KUVATON ERÄ. Faktat en-Wikipediasta kohde kerrallaan 11.9.2026.
   * ============================================================== */
  {
    id: 'peipsi',
    nimi: 'Peipsijärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Mitä järven jäällä tapahtui vuonna 1242?',
      'Mihin Peipsin vedet lopulta laskevat?',
    ],
    korostukset: ['jäätaistelu|jäätaistelu'],
    nappi: 'Euroopan suurin rajajärvi',
    // 27.5 E / 58.7 N — järvialtaan pohjoisosa Viron puolella;
    // en-Wikipedia "Lake Peipus" ei anna yhtä keskipistettä
    laudat: {
      maailmankartta: { x: 6750.0, y: 989.8 },
    },
    teksti: 'Peipsijärvi on Euroopan suurin rajajärvi: se makaa Viron ja Venäjän välisellä '
      + 'valtakunnanrajalla ja on koko maanosan viidenneksi suurin heti Laatokan, Äänisen, '
      + 'Vänernin ja Saimaan jälkeen. Pinta-alaa on 3 555 neliökilometriä, mutta keskisyvyys '
      + 'vain 7,1 metriä ja syvin kohta 15 — se on siis valtava mutta matala. Järvi on '
      + 'oikeastaan kolme: pohjoinen Peipsi (2 611 km²), eteläinen Pihkvan järvi (708 km²) ja '
      + 'niitä yhdistävä Lämmijärvi (236 km²). Siihen laskee noin kolmekymmentä jokea, joista '
      + 'suurimmat ovat Velikaja ja Emajoki, ja vedet lähtevät Narvajokea myöten Suomenlahteen. '
      + '5. huhtikuuta 1242 järven jäällä käytiin jäätaistelu Novgorodin tasavallan ja '
      + 'Saksalaisen ritarikunnan välillä. Venäjänkielinen nimi Tšudskoje ozero tarkoittaa '
      + '"tšuudien järveä" — tšuudi oli vanha nimitys näillä mailla asuneille '
      + 'itämerensuomalaisille.',
    lahde: 'en-Wikipedia "Lake Peipus", johdanto-osa ja osio "Name" (tarkistettu 11.9.2026).',
  },
  {
    id: 'emajogi',
    nimi: 'Emajoki',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Tartto syntyi juuri tähän kohtaan?',
      'Mikä lodi oli?',
    ],
    korostukset: ['lodi|lodi'],
    nappi: 'Viron ainoa purjehduskelpoinen joki',
    // 27.15 E / 58.45 N — alajuoksu Kavastun ja Praagan välillä;
    // en-Wikipedia "Emajõgi", osio "Course"
    laudat: {
      maailmankartta: { x: 6738.3, y: 1002.0 },
    },
    teksti: 'Emajoki — nimi tarkoittaa äitijokea — virtaa Võrtsjärvestä Tarton halki '
      + 'Peipsijärveen. Pituutta on sata kilometriä, ja Tarton läpi sitä kulkee kymmenen. Se on '
      + 'Virossa toiseksi suurin virtaamaltaan ja ainoa koko matkaltaan purjehduskelpoinen '
      + 'joki. Yläjuoksulla joki mutkittelee laajojen soiden ja tulvamaiden halki niin, ettei '
      + 'sillä ole selvää tulvatasannetta lainkaan, ja alajuoksulla se kulkee Emajõe Suursoon '
      + 'läpi ennen kuin laskee Peipsiin Praagassa. Juuri jokilaakson soisuus teki siitä myös '
      + 'esteen: Pohjois- ja Etelä-Viron välillä oli vain harvoja kelvollisia ylityspaikkoja, ja '
      + 'paras niistä oli Tarton kohdalla — siksi kaupunki syntyi juuri siihen, maa- ja '
      + 'vesireittien risteykseen. Isoisäsi aikaan jokea käytettiin ahkerasti tavaraliikenteeseen: '
      + 'Tarttoon tuotiin polttopuuta, hirsiä, heinää ja kalaa, ja työn teki lodi, pieni '
      + 'jokiproomu tai purjealus, joka kesti myös Peipsin.',
    lahde: 'en-Wikipedia "Emajõgi", johdanto-osa sekä osiot "Course" ja "History" '
      + '(tarkistettu 11.9.2026).',
  },
  {
    id: 'kaali',
    nimi: 'Kaalin kraatterit',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka todisti kraatterin syntytavan?',
      'Kuinka kova isku oli?',
    ],
    korostukset: ['Ivan Reinvald|Ivan Reinvald'],
    nappi: 'Meteoriitti osui asuttuun seutuun',
    // 22.6697 E / 58.3722 N — en-Wikipedia "Kaali crater"
    laudat: {
      maailmankartta: { x: 6589.0, y: 1005.8 },
    },
    teksti: 'Kaalin kylässä Saarenmaalla on yhdeksän kraatteria, ja ne ovat meteoriitin '
      + 'tekemiä. Tuoreimpien arvioiden mukaan isku tapahtui pian vuosien 1530–1450 eaa. '
      + 'jälkeen — ajoitukset vaihtelevat tutkijasta toiseen tuhansia vuosia — ja se on yksi '
      + 'harvoista tunnetuista törmäyksistä, jotka ovat osuneet asuttuun seutuun. Ennen '
      + '1930-lukua syntytavasta oli monta selitystä, tulivuorenpurkauksesta karstiin, kunnes '
      + 'Ivan Reinvald osoitti meteoriittialkuperän tutkimuksillaan 1928, 1933 ja 1937. '
      + 'Kappale hajosi viiden ja kymmenen kilometrin korkeuden välillä. Suurin pala teki '
      + 'kraatterin, jonka halkaisija on 110 metriä ja syvyys 22; sen pohjalla on nyt Kaalin '
      + 'järvi. Kahdeksan pienempää kraatteria, halkaisijaltaan 12–40 metriä, ovat kilometrin '
      + 'säteellä. Iskun energia oli noin 80 terajoulea eli suunnilleen Hiroshiman pommin '
      + 'verran, ja metsä paloi kuuden kilometrin säteellä.',
    lahde: 'en-Wikipedia "Kaali crater", johdanto-osa sekä osiot "Formation" ja "Effects" '
      + '(tarkistettu 11.9.2026).',
  },
  {
    id: 'haapsalu',
    nimi: 'Haapsalu',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka perusti mutakylpylän?',
      'Mistä Haapsalun nimi tulee?',
    ],
    korostukset: ['mutahoitola|mutahoitolan'],
    nappi: 'Piispanlinna ja mutakylpylä',
    // 23.5417 E / 58.9439 N — en-Wikipedia "Haapsalu"
    laudat: {
      maailmankartta: { x: 6618.1, y: 977.9 },
    },
    teksti: 'Haapsalu on kylpyläkaupunki Viron länsirannikolla. Nimi tulee sanoista haab eli '
      + 'haapa ja salu, joka vanhassa merkityksessään tarkoitti metsäistä saarta. Ruotsiksi ja '
      + 'saksaksi kaupunki oli pitkään Hapsal, ja se oli 1200-luvulta 1900-luvun alkupuolelle '
      + 'asti rannikkoruotsalaisten keskuspaikka. Ensimmäinen maininta on vuodelta 1279, jolloin '
      + 'kaupunki sai oikeutensa ja siitä tuli Saare-Lääne piispakunnan pääpaikka seuraavaksi '
      + 'kolmeksi vuosisadaksi; piispanlinna on yhä pystyssä, ja sen kirkko on Viron suurin '
      + 'yksilaivainen. Foggin aikaan kaupunki eli kuitenkin aivan muusta. Sotilaslääkäri Carl '
      + 'Abraham Hunnius perusti vuonna 1825 ensimmäisen mutahoitolan, ja tieto parantavasta '
      + 'merimudasta levisi nopeasti Pietarin varakkaaseen väkeen ja muualle keisarikuntaan — '
      + 'hoidoissa kävi myös keisarillinen Romanovien perhe.',
    lahde: 'en-Wikipedia "Haapsalu", johdanto-osa sekä osiot "History" ja "Healing by sea mud" '
      + '(tarkistettu 11.9.2026).',
  },
  {
    id: 'rakvere',
    nimi: 'Rakvere',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä Tarvanpea tarkoittaa?',
      'Kuka rakensi Vallimäen kivilinnan?',
    ],
    korostukset: ['Tarvanpea|Tarvanpea'],
    nappi: 'Uroshärän pää Vallimäellä',
    // 26.3556 E / 59.3472 N — en-Wikipedia "Rakvere"
    laudat: {
      maailmankartta: { x: 6711.9, y: 958.1 },
    },
    teksti: 'Rakvere on Länsi-Virumaan pääkaupunki noin sadan kilometrin päässä Tallinnasta. '
      + 'Vanhin nimi on Tarvanpea, "uroshärän pää", ja se mainitaan ensimmäisen kerran vuonna '
      + '1226 Henrikin Liivinmaan kronikassa. Tanskalaiset kirjasivat paikan 1252 muotoon '
      + 'Wesenbergh, ja sillä nimellä kaupunki tunnettiin 1900-luvun alkuun asti; Novgorodin '
      + 'ensimmäinen kronikka puhuu vuonna 1268 Rakovorista. Samana vuonna, 18. helmikuuta, '
      + 'kaupungin lähellä käytiin Wesenbergin taistelu, jossa vastakkain olivat tanskalaiset ja '
      + 'saksalaiset ritarit paikallisine joukkoineen sekä Novgorodin ja Pihkvan voimat. '
      + 'Kuningas Erik VI Menved antoi Rakverelle Lyypekin oikeudet 12. kesäkuuta 1302. Kun '
      + 'kuningas myi Tanskan Viron Liivinmaan ritarikunnalle 1346, Vallimäen vanhan '
      + 'linnavuoren päälle nousi suuri kivilinna torneineen ja pihoineen.',
    lahde: 'en-Wikipedia "Rakvere", johdanto-osa sekä osiot "Name" ja "History" (tarkistettu '
      + '11.9.2026).',
  },
  {
    id: 'ontika',
    nimi: 'Ontikan klintti',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka pitkälle Baltian klintti ulottuu?',
      'Mikä on Viron korkein vesiputous?',
    ],
    korostukset: ['klintti|klintti'],
    nappi: 'Kalkkikiviseinä Suomenlahden rannalla',
    // 27.2417 E / 59.4425 N — Ontika, Kohtlan kunta, Ida-Virumaa;
    // en-Wikipedia "Baltic Klint", osio "Geography"
    laudat: {
      maailmankartta: { x: 6741.4, y: 953.4 },
    },
    teksti: 'Viron pohjoisrannikkoa reunustaa kalkkikivinen jyrkänne, jota kutsutaan Baltian '
      + 'klintiksi. Se on eroosion paljastama porras, joka ulottuu noin 1 200 kilometrin '
      + 'matkan Ruotsin Öölannista mannerjalustan ja Viron Osmussaaren ja Suur-Pakrin kautta '
      + 'Paldiskiin, sieltä Suomenlahden etelärantaa ja Nevaa myöten Laatokan eteläpuolelle, '
      + 'missä se katoaa nuorempien kerrostumien alle. Korkeimmillaan klintti on juuri '
      + 'Ontikassa Kohtlan kunnassa Ida-Virumaalla: 55,6 metriä merenpinnasta. Jyrkänteen '
      + 'halkovat lukuisat joet, ja moni niistä putoaa reunan yli — korkein putous on '
      + 'Valasten 25 metriä. Muoto ei ole valmis: klintti perääntyy yhä, ja Gotlannissa '
      + 'peräytymisvauhdiksi on 1900-luvulla mitattu 0,15–0,78 senttiä vuodessa. Viron rahassa '
      + 'klintti on ollut kahdesti, vuoden 1928 50 kroonin ja vuoden 1992 100 kroonin setelin '
      + 'kääntöpuolella.',
    lahde: 'en-Wikipedia "Baltic Klint", johdanto-osa ja osio "Geography" (tarkistettu '
      + '11.9.2026).',
  },
  {
    id: 'lahemaa',
    nimi: 'Lahemaa',
    tyyppi: 'elain',
    kysymykset: [
      'Mistä Lahemaa on saanut nimensä?',
      'Mitä eläimiä metsissä elää?',
    ],
    korostukset: ['keidassuo|keidassoita'],
    nappi: 'Lahtien maa ja sen kartanot',
    // 25.8 E / 59.55 N — puistoalueen keskiosa; en-Wikipedia
    // "Lahemaa National Park" ei anna yhtä keskipistettä
    laudat: {
      maailmankartta: { x: 6693.3, y: 948.0 },
    },
    teksti: 'Lahemaa tarkoittaa lahtien maata, ja nimi on ansaittu: rannikolta työntyy mereen '
      + 'neljä niemeä — Juminda, Pärispea, Käsmu ja Vergi — ja niiden väliin jää neljä lahtea. '
      + 'Alue on 747 neliökilometriä, josta lähes 275 on merta, ja se on Viron suurin puisto ja '
      + 'yksi Euroopan suurimmista kansallispuistoista. Metsää on yli seitsemänkymmentä '
      + 'prosenttia, ja sen seassa on keidassoita, joista Laukasoon suojelualue on noin '
      + 'seitsemäntuhatta vuotta vanha. Puistossa elää villisikoja, saksanhirviä, susia, '
      + 'karhuja ja ilveksiä, ja kivinen rantaviiva on kurkien vuosittainen levähdyspaikka '
      + 'matkalla kohti Bosporia ja Egyptiä. Alueella on neljä kartanoa: Palmse, Vihula, Kolga '
      + 'ja barokkinen Sagadi. Puisto perustettiin vasta 1971, ja se oli koko silloisen '
      + 'Neuvostoliiton ensimmäinen kansallispuisto.',
    lahde: 'en-Wikipedia "Lahemaa National Park", johdanto-osa ja osio "History" (tarkistettu '
      + '11.9.2026).',
  },
];
