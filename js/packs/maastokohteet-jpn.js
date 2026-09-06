/*
 * MAASTOKOHTEET — JPN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs JPN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/JPN.json. Työkalu laskee laudan
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
 * Japanin maastokohteet. Faktat en-Wikipediasta 30.8.2026.
 */
export const MAASTOKOHTEET_JPN = [
  {
    id: 'fuji',
    nimi: 'Fuji',
    tyyppi: 'vuori',
    kysymykset: [
      'Milloin Fuji viimeksi purkautui?',
      'Miksi juuri Fuji päätyi tuhansiin tauluihin?',
    ],
    korostukset: ['Honshu|Honshun'],
    nappi: 'Japanin pyhä kartio',
    // 138.7275 E / 35.3608 N — en-Wikipedia "Mount Fuji"
    laudat: {
      maailmankartta: { x: 10457.6, y: 1981.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Fuji on Japanin korkein vuori, 3 776 metriä, ja yhä aktiivinen kerrostulivuori Honshun '
      + 'saarella — viimeksi se purkautui vuosina 1707–1708. Sen poikkeuksellisen symmetrinen '
      + 'kartio on lumen peitossa noin viisi kuukautta vuodesta ja näkyy kirkkaalla säällä '
      + 'Tokioon asti, sadan kilometrin päähän. Vuori on Japanin kulttuurin tunnuskuvia, jota '
      + 'taiteilijat ovat kuvanneet loputtomiin.',
    lahde: 'en-Wikipedia "Mount Fuji", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'japaninmeri',
    nimi: 'Japaninmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi tällä merellä ei ole vuorovettä?',
      'Mitkä maat merta reunustavat?',
    ],
    korostukset: ['Sahalin|Sahalinin'],
    nappi: 'Meri lähes ilman vuorovettä',
    // 135 E / 40 N — en-Wikipedia "Sea of Japan" — artikkelin oma keskipiste
    laudat: {
      maailmankartta: { x: 10333.3, y: 1802.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Japaninmeri on reunameri Japanin saariston, Korean niemimaan, Sahalinin ja Venäjän '
      + 'Kaukoidän välissä. Japanin saaret sulkevat sen Tyynestämerestä niin tiiviisti, että '
      + 'vuorovesi jää lähes olemattomaksi, aivan kuten Välimerellä. Samasta syystä sen vesi on '
      + 'avomerta vähäsuolaisempaa ja lajisto omanlaisensa — suuria saaria, lahtia tai niemiä '
      + 'merellä ei ole lainkaan.',
    lahde: 'en-Wikipedia "Sea of Japan", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'shinanojoki',
    nimi: 'Shinanojoki',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Ōkōzun ohitusuoma on?',
      'Miksi joella on kaksi nimeä?',
    ],
    korostukset: ['Japanin Alpit|Japanin Alpeilta'],
    nappi: 'Japanin pisin joki, kaksi nimeä',
    // 138.81 E / 37.39 N — en-Wikipedia "Shinano River" — alajuoksu Niigatan maakunnassa
    laudat: {
      maailmankartta: { x: 10460.3, y: 1904.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Niigatan tasangon kylät anoivat ohitusuomaa kahden vuosisadan ajan. Shinanojoki tulvi '
      + 'yli riisipeltojen keskimäärin joka kolmas tai neljäs vuosi, ja pyynnöt alkoivat jo '
      + '1700-luvun alkupuolella — mutta valtio myönsi rahat vasta vuoden 1896 suurtulvan '
      + 'jälkeen. Kymmenen kilometrin mittaista Ōkōzun uomaa kaivettiin 1909—1922, ja voitto '
      + 'jäi lyhyeksi: sulkuportti romahti 1927 uoman pohjan syöpymisen takia eikä ollut täysin '
      + 'kunnossa ennen vuotta 1931. Joki itse on Japanin pisin ja levein, ja se saa alkunsa '
      + 'Japanin Alpeilta. Yläjuoksullaan sitä kutsutaan Chikumaksi — sama virta vaihtaa nimeä '
      + 'matkalla vuorilta Japaninmerelle.',
    lahde: 'en-Wikipedia "Shinano River", johdanto-osa sekä osiot "Ōkōzu Diversion Channel" ja '
      + '"Course" (tarkistettu 1.9.2026).',
  },
  /* ───── KOHTEET (8) — ERÄ M10, AASIA 3, 6.9.2026 ───────────────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Japanilla oli ennen tätä erää kolme maastokohdetta ja eläintäky
   * mutta ei yhtäkään kohdetta. Tavoite maata kohti on kahdeksan
   * KOHDETTA ja kolme MAASTOKOHDETTA; maastopuoli oli siis jo täynnä.
   *
   * VAIN MAAILMANKARTAN RIVI (Euroopan erillislaudasta luovuttu,
   * Raamattu 30.8.2026). Koordinaatit on laskettu koneella
   * tools/johda-maastokohteet.mjs:n vientifunktiolla `laudat(lon, lat)`
   * en-Wikipedian coordinates-propin lon/lat-parista, ja jokainen piste
   * osuu maan fokuslehden rajaukseen (x 9793,9…10831,5 ja
   * y 1418,1…2522,9).
   *
   * EI PELIKAUPUNGIN KOHDALLA. Etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin: lähin uusi merkki on
   * Himejin linna 32,2 lautayksikön päässä Kioto-laatasta ja kaukaisin
   * Dejima 146,6 yksikön päässä siitä. Raja KAUPUNGIN_KOHDALLA_SADE on 7.
   *
   * YKSI EHDOKAS KAATUI NIMIÖLIMITYKSEEN: Itsukushiman pyhäkkö on 6,6
   * lautayksikön päässä Hiroshiman rauhanmuistomerkistä, eli kahden
   * nimiön laatikot menisivät päällekkäin. Rauhanmuistomerkki jäi,
   * Itsukushima jätettiin pois.
   *
   * SOTAHISTORIA ASIALLISESTI (docs/aasia-tyoaineisto/spec-asia.md,
   * SITOVA): Hiroshiman kortti kertoo rakennuksen historian ja
   * muistomerkin nykyisen tehtävän lähteen katteessa, ilman uhrilukujen
   * korostusta ja ilman nykypolitiikkaa.
   *
   * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
   * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
   */
  {
    id: 'himejin-linna',
    nimi: 'Himejin linna',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi linnaa kutsutaan valkohaikaraksi?',
      'Kuka pelasti linnan purkamiselta?',
    ],
    korostukset: ['valkohaikara|valkohaikaran'],
    nappi: 'Valkoinen haikara kukkulalla',
    // 134.69389 E / 34.83944 N — en-Wikipedia "Himeji Castle"
    laudat: {
      maailmankartta: { x: 10323.1, y: 2001.5 },
    },
    teksti: 'Himejin linna on kukkulalinnoitus Hyōgon prefektuurissa ja japanilaisen '
      + 'linna-arkkitehtuurin parhaiten säilynyt esimerkki: 83 rakennusta, joissa on '
      + 'ampuma-aukkoja, kivenpudotusluukkuja ja soturien piilokammioita. Häikäisevän '
      + 'valkoisen ulkoasunsa takia sitä kutsutaan valkohaikaran linnaksi. Ensimmäinen '
      + 'linnoitus nousi Himeyaman kukkulalle 1333, ja nykyisen laajuutensa se sai, kun '
      + 'Ikeda Terumasa rakensi sen uudelleen 1601–1609 — työhön arvioidaan kuluneen 2,5 '
      + 'miljoonaa työpäivää. Meiji-kaudella linna hylättiin 1871 ja koko laitos oli '
      + 'määrä purkaa, mutta everstiluutnantti Nakamura Shigeton ponnistelut pelastivat '
      + 'sen; myöhemmin se selvisi ehjänä sekä vuoden 1945 pommituksista että vuoden 1995 '
      + 'Hanshinin maanjäristyksestä. Unescon maailmanperintökohde se on ollut vuodesta 1993.',
    lahde: 'en-Wikipedia "Himeji Castle", johdanto-osa sekä osiot "History", '
      + '"Historical recognition" ja "Design details" (tarkistettu 6.9.2026).',
  },
  {
    id: 'nikko-toshogu',
    nimi: 'Nikkō Tōshō-gū',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kenelle pyhäkkö on omistettu?',
      'Mitä tarkoittaa portin lempinimi?',
    ],
    korostukset: ['Yōmeimon|Yōmeimon'],
    nappi: 'Portti, jota katsoo auringonlaskuun',
    // 139.598958 E / 36.758064 N — en-Wikipedia "Nikkō Tōshō-gū"
    laudat: {
      maailmankartta: { x: 10486.6, y: 1928.6 },
    },
    teksti: 'Nikkō Tōshō-gū on shintopyhäkkö Tochigin prefektuurissa, ja se on omistettu '
      + 'Tokugawa Ieyasulle, Tokugawa-shogunaatin perustajalle, jonka jäännökset on '
      + 'haudattu sinne. Pyhäkkö rakennettiin 1617 Ieyasun pojan Hidetadan aikana ja '
      + 'laajennettiin kolmannen shogunin Iemitsun kaudella; rakentajana oli Tokugawan '
      + 'vasalli Tōdō Takatora. Kuuluisin rakennus on runsain värein koristeltu '
      + 'Yōmeimon-portti, jonka lisänimi tarkoittaa, että sitä voisi katsella '
      + 'auringonlaskuun asti kyllästymättä. Edo-kaudella shogunaatti kulki Edosta '
      + 'pyhäkölle juhlasaatoissa Nikkō Kaidō -tietä pitkin, ja vuotuiset kevät- ja '
      + 'syysjuhlat esittävät nuo tuhannen soturin kulkueet yhä uudelleen. Yhdessä '
      + 'Futarasanin pyhäkön ja Rinnō-jin kanssa se muodostaa Nikkōn '
      + 'maailmanperintökohteen.',
    lahde: 'en-Wikipedia "Nikkō Tōshō-gū", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'shirakawa-go',
    nimi: 'Shirakawa-gō',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mikä on gasshō-zukuri?',
      'Miksi katot ovat niin jyrkkiä?',
    ],
    korostukset: ['gasshō-zukuri|gasshō-zukuri'],
    nappi: 'Rukoilevat kädet lumen alla',
    // 136.89856 E / 36.27094 N — en-Wikipedia "Shirakawa, Gifu (village)"
    laudat: {
      maailmankartta: { x: 10396.6, y: 1947.2 },
    },
    teksti: 'Shirakawa on vuoristokylä Gifun prefektuurin pohjoiskolkassa, ja se '
      + 'tunnetaan Shirakawa-gōsta: pienestä perinnekylästä, jonka talot on rakennettu '
      + 'gasshō-zukuri-tyyliin. Yhdessä Toyaman puolella olevan Gokayaman kanssa se on '
      + 'Unescon maailmanperintökohde. Kunnan pinta-alasta 95,7 prosenttia on vuoristoista '
      + 'metsää, ja vuorten välissä virtaa Shō-joki, jonka laaksossa asuu suurin osa '
      + 'väestä. Shirakawa on yksi Japanin lumisimmista paikoista: lunta sataa vuodessa '
      + 'keskimäärin yli kymmenen metriä ja kinokset kohoavat hyvin yli kahden metrin. '
      + 'Juuri siitä tulee talojen muoto — paksut olkikatot ovat niin jyrkät kuin '
      + 'rukoukseen liitetyt kädet, jotta lumi liukuisi alas.',
    lahde: 'en-Wikipedia "Shirakawa, Gifu (village)", johdanto-osa sekä osiot '
      + '"Geography" ja "Climate" (tarkistettu 6.9.2026).',
  },
  {
    id: 'hiroshiman-rauhanmuistomerkki',
    nimi: 'Rauhanmuistomerkki',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka rakennuksen suunnitteli?',
      'Miksi raunio on jätetty ennalleen?',
    ],
    korostukset: ['Jan Letzel|Jan Letzel'],
    nappi: 'Kupoli, joka jäi pystyyn',
    // 132.45361 E / 34.39556 N — en-Wikipedia "Hiroshima Peace Memorial"
    laudat: {
      maailmankartta: { x: 10248.5, y: 2018.2 },
    },
    teksti: 'Hiroshiman rauhanmuistomerkki tunnetaan yleisesti Genbaku-kupolina. '
      + 'Rakennus valmistui huhtikuussa 1915 Hiroshiman prefektuurin näyttelytaloksi, ja '
      + 'sen suunnitteli tšekkiläinen arkkitehti Jan Letzel; nimi vaihtui 1933 '
      + 'Hiroshiman prefektuurin teollisuuden edistämistaloksi, ja talossa pidettiin '
      + 'taide- ja opetusnäyttelyitä Aioi-sillan viereisessä liikekorttelissa. Se on '
      + 'rakennus, joka jäi pystyyn 6. elokuuta 1945 pudotetun atomipommin ympärillä. '
      + 'Raunio pidetään pysyvästi siinä kunnossa, johon se jäi, muistomerkkinä '
      + 'ydinaseiden tuhovoimasta, ja se kuuluu Hiroshiman rauhanpuistoon. Unescon '
      + 'maailmanperintökohde siitä tuli 1996.',
    lahde: 'en-Wikipedia "Hiroshima Peace Memorial", johdanto-osa sekä osiot '
      + '"Original building" ja "Atomic bombing" (tarkistettu 6.9.2026).',
  },
  {
    id: 'horyuji',
    nimi: 'Hōryū-ji',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi tammikuun 26. päivä on paloturvallisuuden päivä?',
      'Miten pagodan ikä on saatu selville?',
    ],
    korostukset: ['prinssi Shōtoku|prinssi Shōtoku'],
    nappi: 'Maailman vanhin puurakennus',
    // 135.7342 E / 34.6144 N — en-Wikipedia "Hōryū-ji"
    laudat: {
      maailmankartta: { x: 10357.8, y: 2009.9 },
    },
    teksti: 'Hōryū-ji on buddhalainen temppeli Ikarugassa Naran prefektuurissa ja yksi '
      + 'Japanin vanhimmista buddhalaisista paikoista: sen perusti prinssi Shōtoku '
      + 'vuonna 607, pian sen jälkeen kun buddhalaisuus oli tullut maahan. Nihon shokin '
      + 'mukaan salama poltti kaikki rakennukset vuonna 670, ja jälleenrakennus alkoi '
      + 'heti; nykyistä päähallia Kondōa pidetään laajasti maailman vanhimpana '
      + 'puurakennuksena. Vuonna 2001 tehty vuosilustotutkimus osoitti, että '
      + 'viisikerroksisen pagodan keskuspilarin puu oli kaadettu jo vuonna 594. '
      + 'Tammikuun 26. päivänä 1949 temppelissä syttyi purku- ja korjaustöiden aikana '
      + 'tulipalo, joka vaurioitti Kondōa pahoin ja tuhosi Asuka-kauden seinämaalauksen '
      + '— siitä lähtien päivää on vietetty kulttuuriomaisuuden paloturvallisuuden '
      + 'päivänä. Hōryū-ji oli 1993 Japanin ensimmäisiä maailmanperintökohteita.',
    lahde: 'en-Wikipedia "Hōryū-ji", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'iwamin-hopeakaivos',
    nimi: 'Iwamin hopeakaivos',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mistä kaivoksen hopeanerotusmenetelmä tuli?',
      'Kuinka suuri osuus maailman hopeasta tuli Japanista?',
    ],
    korostukset: ['haifukiho|haifukiho-menetelmän'],
    nappi: 'Hopeasuoni, jota vartioivat aidat',
    // 132.4375 E / 35.10722 N — en-Wikipedia "Iwami Ginzan Silver Mine"
    laudat: {
      maailmankartta: { x: 10247.9, y: 1991.4 },
    },
    teksti: 'Iwami Ginzan oli maanalainen hopeakaivos Ōdan kaupungissa Shimanen '
      + 'prefektuurissa ja Japanin historian suurin hopeakaivos. Kauppias Kamiya Jutei '
      + 'löysi ja avasi sen 1526 ja toi sinne myöhemmin korealaisen hopeanerotustavan, '
      + 'josta tuli haifukiho-menetelmän nimellä tunnettu japanilainen käytäntö. '
      + 'Huipussaan 1600-luvun alussa kaivos tuotti noin 38 tonnia hopeaa vuodessa, ja '
      + 'koko Japani noin 200 tonnia — kolmanneksen koko maailman tuotannosta. '
      + 'Sotapäälliköt kiistelivät kaivoksesta kiivaasti, kunnes Tokugawa-shogunaatti sai '
      + 'sen haltuunsa 1600 Sekigaharan taistelun jälkeen ja ympäröi sen aidoilla ja '
      + 'mäntyesteillä. Hopeantuotanto hiipui 1800-luvulla eikä pärjännyt muun maailman '
      + 'kaivoksille; kaivos suljettiin 1923, ja maisema on ollut maailmanperintökohde '
      + 'vuodesta 2007.',
    lahde: 'en-Wikipedia "Iwami Ginzan Silver Mine", johdanto-osa sekä osiot '
      + '"History" ja "Economic influences" (tarkistettu 6.9.2026).',
  },
  {
    id: 'kumano-kodo',
    nimi: 'Kumano Kodō',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Minne kaikki reitit johtavat?',
      'Miksi pääpyhäkkö siirrettiin paikaltaan?',
    ],
    korostukset: ['Kumano Sanzan|Kumano Sanzaniin'],
    nappi: 'Tuhat vuotta vanhat pyhiinvaellustiet',
    // 135.77389 E / 33.84 N — en-Wikipedia "Kumano Hongū Taisha"
    // (Kumano Kodō -artikkelissa ei ole koordinaatteja; merkki on
    // päävaellusreittien päätepisteessä.)
    laudat: {
      maailmankartta: { x: 10359.1, y: 2039 },
    },
    teksti: 'Kumano Kodō on joukko muinaisia pyhiinvaellusreittejä, jotka risteilevät '
      + 'Kii-niemimaalla, Japanin suurimmalla niemimaalla. Vuoristopolkuja on kuljettu yli '
      + 'tuhat vuotta, ja ne johtavat kaikki Kumano Sanzaniin eli Kumanon kolmeen '
      + 'suurpyhäkköön, jotka ovat vanhan kumanolaisen uskonnon pyhimmät paikat. Reiteillä '
      + 'kulkivat kaikki talonpojista keisareihin, oppainaan shugendō-munkkeja. Reittien '
      + 'päässä oleva Kumano Hongū Taisha seisoi alun perin Ōyunoharan hiekkasärkällä '
      + 'kahden joen yhtymäkohdassa, mutta vuoden 1889 tulva tuhosi siitä osan ja '
      + 'jäljelle jääneet rakennukset siirrettiin 1891 nykyiselle paikalleen; viidestä '
      + 'päärakennuksesta pystytettiin uudelleen vain kolme. Vuonna 2004 reitit ja '
      + 'pyhäköt kirjattiin maailmanperintöluetteloon.',
    lahde: 'en-Wikipedia "Kumano Kodō", johdanto-osa ja osio "History", sekä '
      + '"Kumano Hongū Taisha", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'dejima',
    nimi: 'Dejima',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi saari rakennettiin?',
      'Ketkä saarella asuivat?',
    ],
    korostukset: ['Engelbert Kaempfer|Engelbert Kaempfer'],
    nappi: 'Viuhkansaari suljetun maan portilla',
    // 129.87302 E / 32.74352 N — en-Wikipedia "Dejima"
    laudat: {
      maailmankartta: { x: 10162.4, y: 2079.9 },
    },
    teksti: 'Dejima eli "ulostulosaari" oli keinosaari Nagasakin edustalla. Se toimi '
      + 'kauppapaikkana ensin portugalilaisille 1570–1639 ja sitten hollantilaisille '
      + '1641–1858, ja 220 vuoden ajan se oli ainoa japanilainen alue, jonne '
      + 'länsimaalaiset pääsivät — koko ulkomaankaupan ja kulttuurivaihdon kanava '
      + 'eristäytymisen kaudella. Saari kaivettiin 1636 pienen niemen poikki ja '
      + 'yhdistettiin mantereeseen kapealla sillalla. Portugalilaiset karkotettiin 1639, '
      + 'ja hollantilaiset siirrettiin saarelle 1641 tiukkaan valvontaan: kauppa '
      + 'tarkastettiin, eikä japanilainen saanut tavata heitä ilman vartijaa. Saarella '
      + 'lääkärinä palvellut Engelbert Kaempfer kirjoitti, että heitä kohdeltiin kuin '
      + 'shogunin panttivankeja ja että vankilan nimi oli Dejima.',
    lahde: 'en-Wikipedia "Dejima", johdanto-osa (tarkistettu 6.9.2026).',
  },
];
