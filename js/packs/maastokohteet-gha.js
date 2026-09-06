/*
 * MAASTOKOHTEET — GHA. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs GHA --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/GHA.json. Työkalu laskee laudan
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
 * Ghanan maastokohteet. Faktat en-Wikipediasta 30.8.2026. Vuoreksi on valittu Afadja, Ghanan tunnetuin vuori: artikkeli kertoo, että huippu ilmoitetaan usein 885-metriseksi mutta on todellisuudessa 587 m, ja että maan korkein huippu on viereinen Leklata — Leklatalla ei ole omaa artikkelia, joten kohteeksi sopii vain Afadja. Korkeuskentässä on artikkelin tietolaatikon 885 m, ja tarina kerrotaan tekstissä.
 *
 * MAAILMAN ERÄ M12 (6.9.2026) lisäsi listaan kahdeksan KOHDETTA —
 * Elminan linna, Kakumin puisto, Larabangan moskeija, Molen puisto,
 * Nzulezo, Osun linna, Pagan krokotiilit ja Prinzensteinin linnake.
 * Lähin uusi merkki on Kakum 9,4 lautayksikön päässä Kumasi-laatasta
 * (KAUPUNGIN_KOHDALLA_SADE 7), joten kaikki ovat pääkartan merkkejä.
 * Erä on kuvaton, ja jokaisen kohteen lähin pelikaupunki on kirjattu
 * sen koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_GHA = [
  {
    id: 'afadja',
    nimi: 'Afadja',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka korkea Afadja oikeasti on?',
      'Mikä on Ghanan korkein huippu?',
    ],
    korostukset: ['Togo|Togon'],
    nappi: 'Vuori, jota maine kasvattaa',
    // 0.6033 E / 7.0269 N — en-Wikipedia "Mount Afadja"
    laudat: {
      maailmankartta: { x: 5853.4, y: 2976.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Afadja, ewen kielellä Afadjato, on Ghanan kuuluisimpia vuoria. Se kohoaa Voltan '
      + 'alueella Togon rajan tuntumassa, noin 178 kilometrin päässä sekä Accrasta että '
      + 'Lomésta. Huipun korkeudeksi ilmoitetaan usein 885 metriä, mutta todellisuudessa se '
      + 'yltää vain 587 metriin — ja Ghanan korkein huippu on sitä paitsi viereinen Leklata '
      + 'muutaman kilometrin päässä idässä.',
    lahde: 'en-Wikipedia "Mount Afadja", johdanto-osa ja tietolaatikko (tarkistettu 30.8.2026).',
  },
  {
    id: 'guineanlahti',
    nimi: 'Guineanlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä ihmeen Null Island?',
      'Mitkä suuret joet laskevat Guineanlahteen?',
    ],
    korostukset: ['päiväntasaaja|päiväntasaaja'],
    nappi: 'Lahti, jossa nolla kohtaa nollan',
    // -0.5 E / 5.2 N — ulappa Accran edustalla; en-Wikipedia "Gulf of Guinea" antaa keskipisteeksi 0 / 0
    laudat: {
      maailmankartta: { x: 5816.7, y: 3038 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Guineanlahti on trooppisen Atlantin koillisin osa, ja Ghanan koko rannikko on sen '
      + 'rantaa. Lahdella sijaitsee maapallon koordinaattien nollapiste: kohta, jossa '
      + 'päiväntasaaja ja Greenwichin nollameridiaani leikkaavat, on saanut kartantekijöiltä '
      + 'leikillisen nimen Null Island. Lahteen laskevat monet suuret joet, muun muassa Niger '
      + 'ja Ghanan oma Volta.',
    lahde: 'en-Wikipedia "Gulf of Guinea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'voltajarvi',
    nimi: 'Voltajärvi',
    /*
     * TYYPPI ON 'meri' EIKÄ 'jarvi', JA SE JÄÄ NIIN (tutkittu 1.9.2026).
     *
     * Voltajärvi on tekojärvi, joten tyyppi näyttää väärältä. Se ei
     * kuitenkaan ole tässä kortissa oleva vika vaan koko perheen
     * sopimus: yhdeksästä järvikortista kahdeksan on tyyppiä 'meri'
     * (Tanganjika, Tana, Aral, Victoria, Tšad…), koska
     * KOHDE_TYYPPISYMBOLIT (js/fokuskohteet.js) tuntee vain neljä
     * luonnon tyyppiä — vuori, meri, saari, joki — ja ne kaikki
     * kartoittuvat samaan `luonto`-kärkisymboliin. Tyyppiä 'jarvi' ei
     * ole olemassa.
     *
     * Vaihto mitattiin eikä arvattu: 'jarvi' pudottaa symbolin nulliksi
     * ja nimiön tyhjäksi, ja koska `laji` on osa nostoladonnan
     * tiivistettä (js/nostoladonta.js), poltettu tiiviste muuttuisi
     * e09fa844 → cb218a97. Merkki katoaisi julisteesta. Jos järvi
     * joskus halutaan omaksi lajikseen, se on symbolitaulun ja
     * laattapyramidin uusintapolton kokoinen erä, ei yhden rivin
     * korjaus — ja se koskee kaikkia yhdeksää järveä kerralla.
     */
    tyyppi: 'meri',
    kysymykset: [
      'Mikä pato synnytti Voltajärven?',
      'Mitä järven pohjan metsälle tapahtui?',
    ],
    korostukset: ['Akosombon pato|Akosombon padon'],
    nappi: 'Maailman suurin tekojärvi',
    // 0 E / 6.5 N — en-Wikipedia "Lake Volta" (0 / 6,5)
    laudat: {
      maailmankartta: { x: 5833.3, y: 2994.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Voltajärven pohjassa seisoo yhä metsä. Kun Akosombon padon takainen allas täyttyi, '
      + 'veden alle jäi trooppista kovapuuta — ja alle jäi myös yli 60 000 ihmisen koti: niin '
      + 'monta arvioitiin jouduttavan siirtämään ennen kuin työ alkoi. Ajatus oli peräisin jo '
      + 'vuodelta 1915, jolloin geologi Albert Ernest Kitson ehdotti joen voiman valjastamista '
      + 'bauksiitin sulattamiseen, ja se toteutui vasta itsenäistymisen jälkeen. Nyt '
      + 'pinta-alaltaan maailman suurin tekojärvi, 8 502 neliökilometriä, tuottaa padollaan 912 '
      + 'megawattia sähköä myös naapurimaihin — ja hukkuneita puita nostetaan pohjasta ylös '
      + 'sahatavaraksi, mikä samalla tekee järvestä turvallisemman kulkea.',
    lahde: 'en-Wikipedia "Lake Volta", johdanto-osa sekä osiot "History" ja "Economy" (tarkistettu '
      + '1.9.2026).',
  },
  /*
   * ── MAAILMAN ERÄ M12 (LÄNSI-AFRIKKA) 6.9.2026 ────────────────────
   *
   * Kahdeksan KOHDETTA Ghanaan. Yksikään ei ole pelikaupungin kohdalla:
   * lähin uusi merkki on Kakum 9,4 lautayksikön päässä Kumasi-laatasta
   * (KAUPUNGIN_KOHDALLA_SADE 7), ja jokaisen kohteen lähin pelikaupunki
   * on kirjattu sen koordinaattirivin viereen. Erä on kuvaton, ja
   * jokainen väite on en-Wikipedian raakatekstin katteessa.
   *
   * AKOSOMBON PATO JÄI POIS KAHDESTA SYYSTÄ: sen merkki osuisi 7,0
   * lautayksikön päähän saman listan Voltajärvestä, ja padon tarina on
   * jo kerrottu Voltajärven kortissa. Kumasin Manhyian palatsi jäi pois,
   * koska se on saman kaupungin nähtävyys kuin pelikaupunki Kumasi.
   * Cape Coastin linna jäisi 3,7 yksikön päähän Elminasta, joten
   * rannikon linnoista kartalle tuli vanhin.
   */
  {
    id: 'elminan-linna',
    nimi: 'Elminan linna',
    nimio: 'Elmina',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka rakensi Elminan linnan ja milloin?',
      'Ketkä ottivat linnan portugalilaisilta?',
    ],
    korostukset: ['Guineanlahti|Guineanlahden'],
    nappi: 'Afrikan vanhin eurooppalainen rakennus',
    // 1.3481 W / 5.0826 N — en-Wikipedia "Elmina Castle"
    // Lähin pelikaupunki: Kumasi 17,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5788.4, y: 3041.9 },
    },
    teksti: 'Portugalilaiset pystyttivät 1482 Elminaan linnan, jonka nimi oli Castelo de São '
      + 'Jorge da Mina eli Pyhän Yrjön kaivoslinna. Se oli ensimmäinen kauppapaikka '
      + 'Guineanlahden rannalla ja on yhä Saharan eteläpuolisen Afrikan vanhin pystyssä oleva '
      + 'eurooppalainen rakennus. Aluksi kauppa kävi kullasta, jonka mukaan portugalilaiset '
      + 'nimesivät paikan A Minaksi, kaivokseksi; myöhemmin linnasta tuli yksi Atlantin '
      + 'orjakaupan tärkeimmistä pysäkeistä. Hollannin Länsi-Intian kauppakomppania valtasi '
      + 'linnan 1637 — epäonnistuneen yrityksen jälkeen 1596 — ja orjakauppa jatkui hollantilaisten '
      + 'aikana vuoteen 1814. Britannia sai linnan 1872, ja Ghana on hallinnut sitä itsenäistymisestä '
      + '1957 lähtien; Unesco liitti sen maailmanperintöluetteloon Ghanan muiden linnojen kanssa.',
    lahde: 'en-Wikipedia "Elmina Castle", johdanto-osa sekä osiot "History" ja "Portuguese '
      + 'arrival" (tarkistettu 6.9.2026).',
  },
  {
    id: 'kakumin-puisto',
    nimi: 'Kakumin puisto',
    nimio: 'Kakum',
    tyyppi: 'muu',
    kysymykset: [
      'Kuka teki aloitteen Kakumin suojelemisesta?',
      'Kuinka pitkä puiston latvuspolku on?',
    ],
    nappi: 'Riippusilta sademetsän latvoissa',
    // 1.3833 W / 5.3536 N — en-Wikipedia "Kakum National Park"
    // Lähin pelikaupunki: Kumasi 9,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5787.2, y: 3032.9 },
    },
    teksti: 'Kakum on 375 neliökilometrin sademetsä Ghanan keskisellä rannikkoseudulla. Alue '
      + 'suojeltiin 1931 metsänvarantona ja sai kansallispuiston aseman vasta 1992, kun '
      + 'linnusto oli kartoitettu. Puistossa on erikoisuus, jollainen on vain kolmessa '
      + 'paikassa Afrikassa: 350 metriä pitkä latvuspolku, joka yhdistää seitsemän puun '
      + 'latvan toisiinsa. Aloite suojelusta tuli paikallisilta ihmisiltä eikä valtion '
      + 'luonnonsuojeluvirastolta, mikä on Ghanassa poikkeuksellista. Lajistoon kuuluvat '
      + 'muun muassa dianamarakatti, keltaselkädyykkeri ja metsänorsu, ja lintuja on '
      + 'laskettu 266 lajia.',
    lahde: 'en-Wikipedia "Kakum National Park", johdanto-osa ja osio "History" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'larabangan-moskeija',
    nimi: 'Larabangan moskeija',
    nimio: 'Larabanga',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mistä aineesta Larabangan moskeija on tehty?',
      'Mitä baobabin kerrotaan merkitsevän moskeijan vieressä?',
    ],
    korostukset: ['savitiili|savitiilestä'],
    nappi: 'Ghanan vanhin moskeija',
    // 1.8599 W / 9.2203 N — en-Wikipedia "Larabanga Mosque"
    // Lähin pelikaupunki: Kumasi 123,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5771.3, y: 2903.3 },
    },
    teksti: 'Larabangan moskeija on Ghanan vanhin ja yksi Länsi-Afrikan vanhimmista. Se on '
      + 'rakennettu sudanilaiseen tyyliin länsiafrikkalaisesta savitiilestä: kaksi '
      + 'pyramidimaista tornia, joista toinen on Mekkaan päin kääntyvä mihrab ja toinen '
      + 'minareetti, ja niitä tukee kaksitoista pullomaista tukipilaria. Perustamisvuodeksi '
      + 'ilmoitetaan 1421, ja rakennusta on korjattu monta kertaa, viimeksi 2023; World '
      + 'Monuments Fund on rahoittanut korjauksia ja luettelee moskeijan sadan uhanalaisimman '
      + 'kohteen joukossa. Tarinan mukaan kauppias Ayuba näki unessa käskyn rakentaa moskeija '
      + 'ja löysi herätessään perustukset valmiina, ja viereisen baobabin sanotaan merkitsevän '
      + 'hänen hautaansa.',
    lahde: 'en-Wikipedia "Larabanga Mosque", johdanto-osa sekä osiot "Location" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'molen-puisto',
    nimi: 'Molen puisto',
    nimio: 'Mole',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka suuri Molen kansallispuisto on?',
      'Mitä Molen norsut tekevät puille?',
    ],
    nappi: 'Ghanan suurin eläinsuojelualue',
    // 1.8333 W / 9.7 N — en-Wikipedia "Mole National Park"
    // Lähin pelikaupunki: Kumasi 138,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5772.2, y: 2887.2 },
    },
    teksti: 'Mole on Ghanan suurin eläinsuojelualue: noin 4 577 neliökilometriä guinealaista '
      + 'savannia maan pohjoisosassa, eteläreunallaan jyrkänne. Alue rauhoitettiin 1958 ja '
      + 'siitä tuli kansallispuisto 1971, kun seudun asukkaat siirrettiin muualle. Levi- ja '
      + 'Mole-joet virtaavat puiston läpi vain osan vuodesta ja jättävät pitkäksi kuivaksi '
      + 'kaudeksi jälkeensä pelkkiä juomapaikkoja. Puiston noin 800 norsua tutkittiin, ja '
      + 'kävi ilmi, että ne vahingoittavat mieluummin arvokkaita puulajeja kuten burkeaa ja '
      + 'sheavoipuuta kuin vähempiarvoisia. Sisäänkäynti on Larabangan kylän kautta, ja '
      + 'puistossa on Länsi-Afrikan ensimmäinen safarimaja.',
    lahde: 'en-Wikipedia "Mole National Park", johdanto-osa ja osio "History" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'nzulezo',
    nimi: 'Nzulezo',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä nimi Nzulezo tarkoittaa nzeman kielellä?',
      'Miksi kylä rakennettiin veden päälle?',
    ],
    korostukset: ['paalu|paaluille'],
    nappi: 'Kylä paaluilla järven päällä',
    // 2.5978 W / 5.0206 N — en-Wikipedia "Nzulezo"
    // Lähin pelikaupunki: Kumasi 49,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5746.7, y: 3044 },
    },
    teksti: 'Nzulezo on runsaan viidensadan asukkaan kylä Ghanan länsiosassa, ja se on '
      + 'kokonaan rakennettu paaluille ja lavoille Tadanejärven päälle. Nimi tarkoittaa '
      + 'nzeman kielellä veden pintaa. Vedelle rakennettiin turvallisuuden vuoksi sota-aikoina; '
      + 'paikallisen tarinan mukaan kylän perustivat Oualatasta, muinaisen Ghanan valtakunnan '
      + 'kaupungista, tulleet ihmiset, jotka seurasivat etanaa. Elanto tulee maanviljelystä ja '
      + 'toissijaisesti kalastuksesta, ja järveen liittyy oma uskonnollinen perinteensä: torstai '
      + 'on järven pyhä päivä, jolloin sillä ei saa tehdä työtä. Kylä esitettiin '
      + 'maailmanperintöluettelon ehdokkaaksi vuonna 2000, ja sinne pääsee vain kanootilla.',
    lahde: 'en-Wikipedia "Nzulezo", johdanto-osa sekä osiot "Etymology", "Construction" ja '
      + '"World Heritage Status" (tarkistettu 6.9.2026).',
  },
  {
    id: 'osun-linna',
    nimi: 'Osun linna',
    nimio: 'Osu',
    tyyppi: 'historia',
    kysymykset: [
      'Minkä maan pääpaikka Osun linna oli?',
      'Milloin linnasta tuli Kultarannikon hallituksen istuin?',
    ],
    korostukset: ['Tanska-Norja|Tanska-Norja'],
    nappi: 'Christiansborg Accran rannalla',
    // 0.1825 W / 5.5469 N — en-Wikipedia "Osu Castle"
    // Lähin pelikaupunki: Kumasi 35,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5827.3, y: 3026.4 },
    },
    teksti: 'Osun linna eli Christiansborg seisoo Accran Osun kaupunginosassa Guineanlahden '
      + 'rannalla. Tanska-Norja rakensi paikalle linnoituksen 1660-luvulla, ja se vaihtoi '
      + 'omistajaa portugalilaisten, akwamujen, brittien ja lopulta itsenäisen Ghanan välillä. '
      + 'Tanskalaisten aikana se oli Tanskan Kultarannikon pääpaikka ja lähetti orjia meren '
      + 'yli. Vuonna 1902 linnasta tuli Kultarannikon hallituksen istuin, ja nykyisessä '
      + 'Ghanassa hallitus on siirtynyt Jubilee Houseen. Linna liitettiin maailmanperintöluetteloon '
      + '1979 yhdessä Ghanan muiden linnojen ja linnakkeiden kanssa.',
    lahde: 'en-Wikipedia "Osu Castle", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'pagan-krokotiilit',
    nimi: 'Pagan krokotiilit',
    nimio: 'Paga',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä Pagassa tehdään krokotiileille?',
      'Mitä kaupungin nimi tarkoittaa?',
    ],
    nappi: 'Pyhät krokotiilit rajakaupungissa',
    // 1.1133 W / 10.9922 N — en-Wikipedia "Paga, Ghana"
    // Lähin pelikaupunki: Kumasi 181,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5796.2, y: 2843.6 },
    },
    teksti: 'Paga on Ghanan pohjoisimman alueen kaupunki aivan Burkina Fason rajalla, '
      + '166 kilometriä Ouagadougousta etelään. Se tunnetaan pyhistä krokotiililammikoistaan: '
      + 'vierailijat hämmästyvät saadessaan koskettaa elävää krokotiilia. Kaupungin väestö '
      + 'on enimmäkseen kassenoja, joiden kylät ja sukusiteet jatkuvat siirtomaarajan yli '
      + 'Burkina Fason puolelle — heille yhteinen esivanhemmuus merkitsee enemmän kuin '
      + 'kansallisuus. Perimätiedon mukaan Pagan perusti noin 1400 nuori mies nimeltä Naveh, '
      + 'jonka krokotiili pelasti metsästysretkellä; paikan nähdessään hän huudahti '
      + '"Ayipaga", silmäni on kiinnittynyt tähän maahan, ja siitä nimi lyheni.',
    lahde: 'en-Wikipedia "Paga, Ghana", johdanto-osa sekä osiot "Overview" ja "Foundation" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'prinzensteinin-linnake',
    nimi: 'Prinzensteinin linnake',
    nimio: 'Prinzenstein',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka rakensi Prinzensteinin ja minä vuonna?',
      'Mikä on tuhonnut linnaketta 1980-luvulta lähtien?',
    ],
    nappi: 'Tanskalaislinnake, jota meri syö',
    // 0.9936 E / 5.9217 N — en-Wikipedia "Fort Prinzenstein"
    // Lähin pelikaupunki: Kumasi 75,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5866.5, y: 3013.9 },
    },
    teksti: 'Prinzensteinin linnake on Ketassa Voltajoen itäpuolella — harvoja sellaisia, '
      + 'sillä useimmat orjakaupan linnakkeet ovat joesta länteen. Tanskalaiset kauppiaat '
      + 'rakensivat sen 1784 Sagbadren sodan jälkeen, ja rauhansopimus velvoitti anlo-ewet '
      + 'käymään kauppaa vain heidän kanssaan. Vuoteen 1803 asti linnaketta käytettiin '
      + 'vankityrmänä orjille, jotka odottivat kuljetusta Karibialle; muuta kauppatavaraa '
      + 'olivat kulta ja norsunluu, joita vaihdettiin musketteihin, brandyyn, rautatankoihin '
      + 'ja kangaskaupan kauriinkuoriin. Tanskan Kultarannikko myytiin Britannialle 1850. '
      + 'Meri mursi linnakkeen osittain 1980, ja säilyneitä osia on yritetty suojella '
      + 'yhteistyössä Tanskan suurlähetystön kanssa.',
    lahde: 'en-Wikipedia "Fort Prinzenstein", johdanto-osa ja osio "History" (tarkistettu '
      + '6.9.2026).',
  },
];
