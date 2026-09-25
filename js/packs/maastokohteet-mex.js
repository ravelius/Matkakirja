/*
 * MAASTOKOHTEET — MEX. Meksikon maasto ja seitsemän kohdetta kartalle.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Meksikolla oli laskurin mukaan yksi kohde (Templo Mayor,
 * js/packs/fokuskohteet-mex.js) eikä yhtään maastokohdetta, eli vaje
 * oli −7 kohdetta ja −3 maastoa. Tämä tiedosto on maailman erän M17
 * Meksikon osuus: SEITSEMÄN KOHDETTA ja KOLME MAASTOKOHDETTA, sama
 * malli kuin erässä M4 (js/packs/maastokohteet-can.js).
 *
 * TEMPLO MAYORIA EI TOISTETA. Maan kuratoitu pakki fokuskohteet-mex.js
 * on luettu ennen kirjoittamista, ja sen ainoa kohde on jätetty tästä
 * listasta kokonaan pois (savuke-maastokohteet vartio 6 ja
 * tools/johda-maastokohteet.mjs olemassaOlevat vartioivat tätä).
 * Templo Mayor on laudalla kohdassa 2528,9 / 2555,6, joten alla oleva
 * Teotihuacán (2538,5 / 2546,6) on 13,2 lautayksikön päässä siitä —
 * kaksi eri merkkiä, ei kaksi merkkiä samassa pisteessä.
 *
 * EI AINEISTOTIEDOSTOA, JOTEN MAASTO ON VALITTU KÄSIN. Työkalun
 * lähtöaineistoa tools/maastoaineisto/MEX.json ei ole, joten kolme
 * maastokohdetta on valittu itse ja koordinaatit on laskettu koneella
 * työkalun omalla kaavalla (`import { laudat } from
 * tools/johda-maastokohteet.mjs`, lon/lat en-Wikipedian
 * coordinates-propista).
 *
 * SÄÄNTÖ N3 (sama nimi kartalla vain kerran). Sierra Madre Occidental
 * on jo laudan omalla nimitaululla (js/packs/maailmankartta-nimet.js),
 * ja sen selitys mainitsee Copper Canyonin rotkot. Siksi rotkoa ei ole
 * täällä maastokohteena vaan RATANA, jolla on oma nimensä
 * (Chihuahuan rata) — nimiö ei osu poltetun nimen päälle. Samasta
 * syystä maastokolmikossa ei ole Rio Grandea eikä Kalifornianlahtea.
 *
 * VARTIO 7a. tools/savukkeet/savuke-maastokohteet.mjs vaatii, että
 * jokainen kohde osuu maan fokuslehden rajaukseen (`osuuLehteen`).
 * Meksikolla rajaus ON olemassa (js/packs/fokus-grc.js FOKUS_POHJAT.MEX,
 * lauta maailmankartta, x 1697,7–3133,3 / y 1958,2–2834,1), joten
 * vartio pätee tähänkin tiedostoon eikä sitä ole kierretty: jokainen
 * alla oleva piste on tarkistettu rajausta vasten yksitellen.
 *
 * EI YKSIKÄÄN OLE PELIKAUPUNGIN KOHDALLA. Etäisyys on mitattu jokaiseen
 * js/packs/maailmankartta.js CITIES-kaupunkiin. Lähin uusi merkki on
 * Teotihuacán 9,1 lautayksikön päässä Mexico Citystä, eli yli
 * KAUPUNGIN_KOHDALLA_SADE-rajan (7, js/fokuskohteet.js). Jokaisen
 * kohteen lähin kaupunki on kirjattu sen koordinaattirivin viereen.
 *
 * VAIN MAAILMANKARTAN RIVI. Erillislaudasta on luovuttu (Raamattu
 * 30.8.2026), joten `laudat`-kentässä on vain maailmankartta.
 *
 * KUVATON ERÄ. Kortti kantaa tekstin ja lähteen; tarkistamaton
 * Commons-tiedosto olisi huonompi kuin kuvaton kortti (Perustuslaki,
 * faktakuri). Faktat on tarkistettu en-Wikipediasta kohde kerrallaan
 * 6.9.2026, ja jokaisen kohteen `lahde`-rivi kertoo artikkelin osan.
 */
export const MAASTOKOHTEET_MEX = [
  /* ================================================================
   * MAASTO — kolme kohdetta: tulivuori, saari ja joki.
   * ============================================================== */
  {
    id: 'popocatepetl',
    nimi: 'Popocatépetl',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä nimi Popocatépetl tarkoittaa?',
      'Mihin vuoren jäätiköt katosivat?',
    ],
    korostukset: ['Iztaccíhuatl|Iztaccíhuatliin'],
    nappi: 'Savuava vuori Mexico Cityn takana',
    // -98.62778 E / 19.02222 N — en-Wikipedia "Popocatépetl"
    // Lähin pelikaupunki: Mexico City 25,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2545.7, y: 2569.8 },
    },
    teksti: 'Popocatépetl on toiminnassa oleva kerrostulivuori Meksikon keskiosassa ja '
      + '5 393 metrillään maan toiseksi korkein huippu Pico de Orizaban jälkeen. Nimi tulee '
      + 'nahuatlin sanoista popōca, "se savuaa", ja tepētl, "vuori"; meksikolaiset kutsuvat '
      + 'sitä tuttavallisesti El Popoksi. Korkea satula, Paso de Cortés, yhdistää sen '
      + 'pohjoispuoliseen kaksoisvuoreen Iztaccíhuatliin. Vuori näkyy Mexico Cityyn '
      + '70 kilometrin päähän, kun ilma on kirkas. Jäätiköt olivat vielä 1990-luvulla '
      + 'paikoillaan, mutta lämpeneminen ja purkausten kuumuus söivät ne: vuoden 2001 alkuun '
      + 'mennessä jäätiköitä ei enää ollut, vaikka jäätä on yhä. Joulukuussa 2000 '
      + 'viranomaiset evakuoivat kymmeniätuhansia ihmisiä, ja vuori teki suurimman näytöksensä '
      + '1 200 vuoteen.',
    lahde: 'en-Wikipedia "Popocatépetl", johdanto-osa sekä osiot "Name" ja "Recent '
      + 'activity" (tarkistettu 6.9.2026).',
  },
  {
    id: 'cozumel',
    nimi: 'Cozumel',
    tyyppi: 'saari',
    kysymykset: [
      'Kenen pyhäkkö saarella oli?',
      'Mitä saaren maya-nimi tarkoittaa?',
    ],
    korostukset: ['Ixchel|Ixcheliä', 'sacbé|sacbéiksi'],
    nappi: 'Pääskysten saari ja jumalattaren satama',
    // -86.92 E / 20.42 N — en-Wikipedia "Cozumel"
    // Lähin pelikaupunki: Mérida 80,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2936, y: 2521.4 },
    },
    teksti: 'Cozumel on saari Karibianmerellä Jukatanin niemimaan itäpuolella, Playa del '
      + 'Carmenin kohdalla, ja se on oma kuntansa Quintana Roon osavaltiossa. Nimi tulee '
      + 'mayan sanasta Cuzamil, "pääskysten saari". Saarelta tunnetaan yli kolmekymmentä '
      + 'arkeologista paikkaa, ja asutusta on ollut noin vuodesta 300 eaa. espanjalaisten '
      + 'tuloon asti. Noin vuodesta 1250 saari kukoisti satamana ja pyhiinvaelluskohteena: '
      + 'kauppiaat ja pyhiinvaeltajat tulivat palvomaan Ixcheliä, kuun, synnytyksen ja '
      + 'kutomisen maya-jumalatarta. Tärkein kaupunki oli San Gervasio, jonka '
      + 'rakennusryhmiä yhdistivät korotetut tiet eli sacbéiksi kutsutut valkoiset polut. '
      + 'Meksikon valtio nimesi Cozumelin taikakyläksi eli Pueblo Mágicoksi 2023.',
    lahde: 'en-Wikipedia "Cozumel", johdanto-osa sekä osiot "Etymology" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'usumacinta',
    nimi: 'Usumacinta',
    tyyppi: 'joki',
    kysymykset: [
      'Minkä eläimen mukaan joki on nimetty?',
      'Miksi joki oli mayoille tärkeä?',
    ],
    korostukset: ['Pantanos de Centla|Pantanos de Centla'],
    nappi: 'Rajajoki, jonka nimi on apinasta',
    // -92.46778 E / 18.6495 N — en-Wikipedia "Usumacinta River"
    // Lähin pelikaupunki: Mérida 115,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2751.1, y: 2582.7 },
    },
    teksti: 'Usumacinta on nimetty mölyapinan mukaan, ja se syntyy Guatemalassa Pasiónin ja '
      + 'Salinasin yhtyessä. Joki muodostaa osan Guatemalan ja Chiapasin rajasta ja kaartaa '
      + 'sitten luoteeseen Tabascon halki Meksikonlahteen; kokonaispituus latvajokineen on '
      + 'noin tuhat kilometriä. Se on ainoa näkyvä luonnollinen raja Jukatanin niemimaan ja '
      + 'muun Meksikon välillä. Matkalla se on kaivertanut jyrkkiä kanjoneita, ja alajuoksulla '
      + 'Grijalvan kanssa se muodostaa Pantanos de Centlan — Pohjois- ja Väli-Amerikan '
      + 'laajimman suojellun kosteikon, 302 702 hehtaaria. Joki ja sen sivuhaarat olivat '
      + 'mayojen tärkeitä kauppareittejä, ja niiden varrella olivat muun muassa Yaxchilán ja '
      + 'Piedras Negras.',
    lahde: 'en-Wikipedia "Usumacinta River", johdanto-osa ja osio "History" (tarkistettu '
      + '6.9.2026).',
  },
  /* ================================================================
   * ERÄ M17, 6.9.2026 — SEITSEMÄN KOHDETTA. Perustelut tiedoston
   * alussa.
   * ============================================================== */
  {
    id: 'teotihuacan',
    nimi: 'Teotihuacán',
    tyyppi: 'historia',
    kysymykset: [
      'Ketkä antoivat kaupungille sen nykyisen nimen?',
      'Miksi kaupungin oma nimi ei ole tiedossa?',
    ],
    korostukset: ['obsidiaani|obsidiaanityökaluja', 'Kuolleiden katu|Kuolleiden katu'],
    nappi: 'Kaupunki, jonka nimen antoivat vasta myöhemmät',
    // -98.84389 E / 19.6925 N — en-Wikipedia "Teotihuacan"
    // Lähin pelikaupunki: Mexico City 9,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2538.5, y: 2546.6 },
    },
    teksti: 'Teotihuacán on muinainen kaupunki Meksikon laakson sivulaaksossa, 40 kilometriä '
      + 'Mexico Citystä koilliseen. Se ei ollut atsteekkien kaupunki vaan edelsi heidän '
      + 'valtakuntaansa vuosisadoilla: huipussaan ensimmäisellä vuosituhannella siellä asui '
      + 'arviolta satatuhatta ihmistä, ja kaupunki oli Amerikkojen suurin ja mahdollisesti '
      + 'aikansa kuudenneksi suurin koko maailmassa. Kaupungin oma nimi ei ole tiedossa; '
      + 'nahuatlinkielisen nimen antoivat atsteekit vasta satoja vuosia sen tuhon jälkeen, ja '
      + 'se on käännetty muotoon "jumalten syntymäpaikka". Kaupungin läpi kulkee neljä '
      + 'kilometriä pitkä ja 40 metriä leveä Kuolleiden katu, jonka päissä ovat Auringon ja '
      + 'Kuun pyramidit. Sieltä vietiin hienoja obsidiaanityökaluja kaikkialle Mesoamerikkaan. '
      + 'Kaupungin päärakennukset ryöstettiin ja poltettiin järjestelmällisesti noin 550.',
    lahde: 'en-Wikipedia "Teotihuacan", johdanto-osa sekä osiot "Name" ja "Layout" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'palenque',
    nimi: 'Palenque',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä portaiden päästä löytyi vuonna 1952?',
      'Kuinka suuri osa kaupungista on yhä viidakon alla?',
    ],
    korostukset: ['Pakal|Pakalin', 'psykodukti|psykodukti'],
    nappi: 'Hauta portaiden alla, löydetty 1952',
    // -92.04639 E / 17.48417 N — en-Wikipedia "Palenque"
    // Lähin pelikaupunki: Guatemala 102,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2765.1, y: 2622.8 },
    },
    teksti: 'Palenque oli maya-kaupunkivaltio Chiapasissa lähellä Usumacintajokea, ja se '
      + 'hiipui 800-luvulla. Kaupunki on keskikokoinen — pienempi kuin Tikal tai Chichén '
      + 'Itzá — mutta sen arkkitehtuuri, veistokset ja reliefit ovat mayojen hienointa. '
      + 'Kuuluisin hallitsija oli Kʼinich Janaabʼ Pakal, joka nousi valtaan '
      + 'kaksitoistavuotiaana ja hallitsi vuodet 615–683. Vuonna 1952 Alberto Ruz Lhuillier '
      + 'nosti Kirjoitusten temppelin lattiasta kivilaatan ja löysi käytävän, joka johti '
      + 'pitkiä portaita alas Pakalin hautaan; se oli siihen asti rikkain ja parhaiten '
      + 'säilynyt tieteellisesti kaivettu hautaus koko muinaisessa Amerikassa. Haudasta '
      + 'nousee ylös asti psykodukti, putki, jota pitkin sielun ajateltiin poistuvan. '
      + 'Kaupungista on tutkittu alle kymmenen prosenttia: yli tuhat rakennusta on yhä '
      + 'viidakon peitossa.',
    lahde: 'en-Wikipedia "Palenque", johdanto-osa sekä osiot "History" ja "Temple of the '
      + 'Inscriptions" (tarkistettu 6.9.2026).',
  },
  {
    id: 'chichen-itza',
    nimi: 'Chichén Itzá',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä kaupungin nimi tarkoittaa?',
      'Mitä pyhästä cenotesta nostettiin 1904–1910?',
    ],
    korostukset: ['cenote|cenotesta', 'Kukulcán|Kukulcánin'],
    nappi: 'Kaivon suulla, jossa ei ole jokia',
    // -88.56861 E / 20.68306 N — en-Wikipedia "Chichen Itza"
    // Lähin pelikaupunki: Mérida 33,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2881, y: 2512.3 },
    },
    teksti: 'Chichén Itzá oli suuri maya-kaupunki Jukatanilla, ja se hallitsi seutua '
      + 'myöhäisklassiselta kaudelta varhaiselle jälkiklassiselle. Nimi tarkoittaa "itzájen '
      + 'kaivon suulla": Pohjois-Jukatan on karstia, jossa joet virtaavat maan alla, ja vesi '
      + 'saatiin neljästä luonnon kuilusta eli cenotesta. Niistä kuuluisin on Pyhä cenote, '
      + 'johon uhrattiin esineitä ja ihmisiä sadejumala Chaacille. Kaupungin yli kohoaa '
      + 'Kukulcánin temppeli eli El Castillo, noin 30 metriä korkea porraspyramidi, jossa on '
      + 'yhdeksän neliömäistä terassia. Yhdysvaltain konsuli Edward Herbert Thompson ruoppasi '
      + 'Pyhää cenotea 1904–1910 ja nosti sieltä kultaa, jadea ja luita; suurimman osan '
      + 'löydöistä hän lähetti Harvardin Peabody-museoon, ja Meksiko syytti häntä varkaudesta '
      + '1926.',
    lahde: 'en-Wikipedia "Chichen Itza", johdanto-osa sekä osiot "Name and orthography", '
      + '"Geology", "Modern history" ja "Temple of Kukulcán (El Castillo)" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'monte-alban',
    nimi: 'Monte Albán',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi kaupunki rakennettiin harjanteen päälle?',
      'Kuinka kauan se oli sapoteekkien keskus?',
    ],
    korostukset: ['sapoteekki|sapoteekkien', 'terassi|terassia'],
    nappi: 'Tasoitettu vuorenharja Oaxacan yllä',
    // -96.76778 E / 17.04389 N — en-Wikipedia "Monte Albán"
    // Lähin pelikaupunki: Mexico City 117,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2607.7, y: 2637.9 },
    },
    teksti: 'Monte Albán on laaja esikolumbiaaninen kaupunki Oaxacan laaksossa, noin yhdeksän '
      + 'kilometriä nykyisestä Oaxacan kaupungista länteen. Sen keskus seisoo keinotekoisesti '
      + 'tasoitetulla harjanteella 1 940 metrissä, 400 metriä laaksonpohjan yläpuolella — '
      + 'paikassa, jota oli helppo puolustaa. Harjanteen rinteillä on useita satoja '
      + 'keinotekoista terassia. Kaupunki perustettiin noin 500 eaa., ja se oli lähes tuhat '
      + 'vuotta sapoteekkien tärkein poliittinen ja taloudellinen keskus; ajanlaskun alun '
      + 'tienoilla se hallitsi suurta osaa Oaxacan ylängöistä ja piti yhteyttä muun muassa '
      + 'pohjoisen Teotihuacániin. Myöhäisklassisen kauden lopulla kaupunki menetti asemansa '
      + 'ja hylättiin. Nimen alkuperä on epäselvä.',
    lahde: 'en-Wikipedia "Monte Albán", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'el-tajin',
    nimi: 'El Tajín',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka löysi kaupungin uudelleen ja milloin?',
      'Montako pallokenttää paikalta on löydetty?',
    ],
    korostukset: ['kolo|kolot', 'pallokenttä|pallokenttää'],
    nappi: 'Pyramidi, jossa on 365 koloa',
    // -97.37824 E / 20.44806 N — en-Wikipedia "El Tajín"
    // Lähin pelikaupunki: Mexico City 64,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2587.4, y: 2520.4 },
    },
    teksti: 'El Tajín on esikolumbiaaninen kaupunki Veracruzissa, klassisen Mesoamerikan '
      + 'suurimpia ja tärkeimpiä. Se kukoisti vuosina 600–1200, ja sinä aikana sinne nousi '
      + 'temppeleitä, palatseja, pallokenttiä ja pyramideja. Yksikään eurooppalainen ei '
      + 'tiettävästi tiennyt paikasta ennen kuin viranomainen osui Kolojen pyramidille '
      + 'sattumalta vuonna 1785. Nimi tulee totonaakkien sadejumalasta. Rakennustapa on '
      + 'omalaatuinen: koristeelliset kolot ja sementti ovat muotoja, joita ei tunneta muualta '
      + 'Mesoamerikasta. Paikalta on löydetty kaikkiaan kaksikymmentä pallokenttää, joista '
      + 'kolme viimeisintä maaliskuussa 2013. Unesco otti kohteen maailmanperintöluetteloon '
      + '1992.',
    lahde: 'en-Wikipedia "El Tajín", johdanto-osa ja osio "Location" (tarkistettu 6.9.2026).',
  },
  {
    id: 'guanajuato',
    nimi: 'Guanajuato',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mistä kaupungin rikkaus tuli?',
      'Mikä oli Alhóndiga de Granaditas?',
    ],
    korostukset: ['Valenciana|Valencianan', 'Alhóndiga de Granaditas|Alhóndiga de Granaditasilla'],
    nappi: 'Kapea laakso, jonka kadut kulkevat maan alla',
    // -101.25667 E / 21.01778 N — en-Wikipedia "Guanajuato (city)"
    // Lähin pelikaupunki: Mexico City 87,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2458.1, y: 2500.6 },
    },
    teksti: 'Guanajuato on Keski-Meksikon vuoristossa kapeassa laaksossa, ja siksi sen kadut '
      + 'mutkittelevat: osa on autoille liian kapeita kujia, osa pitkiä portaita rinteeseen, '
      + 'ja osa kulkee joko osittain tai kokonaan maan alla. Kaupungin rikkaus tuli ympäröivien '
      + 'vuorten malmeista, ja siirtomaa-aikana sen kaivokset olivat Amerikkojen tärkeimpiä '
      + 'Zacatecasin, Potosín ja Ouro Preton rinnalla. Yksi niistä, Valencianan kaivos, tuotti '
      + 'huippuvuosinaan kaksi kolmasosaa koko maailman hopeasta. Historiallinen keskusta '
      + 'kaivoksineen otettiin maailmanperintöluetteloon 1988. Meksikon itsenäisyyssodan '
      + 'ensimmäinen taistelu käytiin täällä, kapinallisten ja kuninkaan joukkojen välillä '
      + 'Alhóndiga de Granaditasilla eli kaupungin viljamakasiinilla.',
    lahde: 'en-Wikipedia "Guanajuato (city)", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'chihuahuan-rata',
    nimi: 'Chihuahuan rata',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Montako tunnelia radalla on?',
      'Miksi rata valmistui vasta 1961?',
    ],
    korostukset: ['ChePe|ChePe', 'Divisadero|Divisaderon'],
    nappi: '86 tunnelia Sierra Madren läpi',
    // -107.76583 E / 27.51611 N — en-Wikipedia "Copper Canyon" (radan varsi)
    // Lähin pelikaupunki: Monterrey 257,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2241.1, y: 2270.9 },
    },
    teksti: 'Ferrocarril Chihuahua al Pacífico eli ChePe kulkee Chihuahuasta Los Mochisiin ja '
      + 'ylittää matkalla Sierra Madre Occidentalin. Rataa on noin 673 kilometriä, ja siihen '
      + 'kuuluu 37 siltaa ja 86 tunnelia; korkeimmillaan se nousee noin 2 400 metriin '
      + 'Divisaderon kohdalla, jossa on suosittu näköalapaikka rotkojen ylle. Ajatus radasta '
      + 'tunnustettiin virallisesti jo 1880, kun presidentti Manuel González myönsi luvan '
      + 'yhdysvaltalaiselle Albert Kinsey Owenille, joka haaveili sosialistisesta siirtokunnasta '
      + 'Meksikossa. Rakentaminen alkoi Arthur Stilwellin voimin noin 1900. Vuoristo teki työstä '
      + 'niin kallista, että rata valmistui vasta 1961. Rata on sekä paikallisten kulkuyhteys '
      + 'että yksi Pohjois-Amerikan näyttävimmistä junamatkoista.',
    lahde: 'en-Wikipedia "Ferrocarril Chihuahua al Pacífico", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
];
