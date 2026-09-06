/*
 * MAASTOKOHTEET — PAN. Panaman maasto ja kahdeksan kohdetta.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Panamalla ei ollut laskurin mukaan yhtäkään karttamerkkiä
 * (docs/moduulit/karttanostot-kattavuus.md, Etelä-Amerikka): nolla
 * kohdetta, nolla maastokohdetta, ei eläintäkyä eikä skandaalia. Tämä
 * tiedosto on maailman erän M17 Panaman osuus: KAHDEKSAN KOHDETTA ja
 * KOLME MAASTOKOHDETTA, sama malli kuin erässä M4
 * (js/packs/maastokohteet-can.js).
 *
 * KANNAS ON LAUDALLA PIENI, JA SE RATKAISI VALINNAT. Panamá on
 * laudalla kohdassa 3176,7 / 2904,0, ja koko kanava-alue mahtuu noin
 * kymmenen lautayksikön säteelle siitä. Uutta merkkiä ei saa panna
 * pelikaupungin kohdalle (KAUPUNGIN_KOHDALLA_SADE 7,
 * js/fokuskohteet.js), ja se pudotti listasta kolme ehdokasta:
 * Culebran leikkaus (4,2 yksikköä), Barro Colorado (5,2) ja Gatúnjärvi
 * (6,7). Panamá Viejo on käytännössä kaupungin oma laatta eikä sekään
 * ole listassa. Kanavavyöhykkeeltä otettiin siksi VAIN YKSI merkki,
 * Panaman rautatie Colónin päästä (8,5), jottei samaan kohtaan ladota
 * useaa nimiötä. Jokaisen kohteen lähin kaupunki on kirjattu sen
 * koordinaattirivin viereen.
 *
 * EI AINEISTOTIEDOSTOA, JOTEN MAASTO ON VALITTU KÄSIN. Työkalun
 * lähtöaineistoa tools/maastoaineisto/PAN.json ei ole, joten kolme
 * maastokohdetta on valittu itse ja koordinaatit on laskettu koneella
 * työkalun omalla kaavalla (`import { laudat } from
 * tools/johda-maastokohteet.mjs`, lon/lat en-Wikipedian
 * coordinates-propista). Chagresin piste on POIKKEUS: artikkelin oma
 * koordinaatti osoittaa joen suulle San Lorenzon linnoituksen kohdalle,
 * joka on käytännössä sama piste kuin Colónin rautatiemerkki, joten
 * merkki on siirretty joen YLÄJUOKSULLE Chagresin kansallispuistoon
 * (−79,35 / 9,35) — sama joki, eri kohta, ja kaksi merkkiä erottuu
 * toisistaan.
 *
 * SÄÄNTÖ N3 (sama nimi kartalla vain kerran). Laudan oma nimitaulu
 * (js/packs/maailmankartta-nimet.js) ei kanna yhtäkään näistä nimistä,
 * ja maan omalla listalla jokainen esiintyy kerran.
 *
 * VARTIO 7a. tools/savukkeet/savuke-maastokohteet.mjs vaatii, että
 * jokainen kohde osuu maan fokuslehden rajaukseen (`osuuLehteen`).
 * Panamalla rajaus ON olemassa (js/packs/fokus-grc.js FOKUS_POHJAT.PAN,
 * lauta maailmankartta, x 3029,6–3296,6 / y 2869,4–2991,0), joten
 * vartio pätee tähänkin tiedostoon eikä sitä ole kierretty: jokainen
 * alla oleva piste on tarkistettu rajausta vasten yksitellen.
 *
 * VAIN MAAILMANKARTAN RIVI. Erillislaudasta on luovuttu (Raamattu
 * 30.8.2026), joten `laudat`-kentässä on vain maailmankartta.
 *
 * KUVATON ERÄ. Kortti kantaa tekstin ja lähteen; tarkistamaton
 * Commons-tiedosto olisi huonompi kuin kuvaton kortti (Perustuslaki,
 * faktakuri). Faktat on tarkistettu en-Wikipediasta kohde kerrallaan
 * 6.9.2026, ja jokaisen kohteen `lahde`-rivi kertoo artikkelin osan.
 */
export const MAASTOKOHTEET_PAN = [
  /* ================================================================
   * MAASTO — kolme kohdetta: tulivuori, saari ja joki.
   * ============================================================== */
  {
    id: 'volcan-baru',
    nimi: 'Volcán Barú',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä huipulta voi harvinaisena päivänä nähdä?',
      'Mitä vuoren juurelta paljastui laharin alta?',
    ],
    korostukset: ['lahar|laharin', 'Boquete|Boquete'],
    nappi: 'Huippu, jolta näkyy kaksi valtamerta',
    // -82.54234 E / 8.80881 N — en-Wikipedia "Volcán Barú"
    // Lähin pelikaupunki: Panamá 95,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3081.9, y: 2917.1 },
    },
    teksti: 'Volcán Barú on toiminnassa oleva kerrostulivuori ja Panaman korkein vuori, '
      + '3 475 metriä. Se on noin 35 kilometriä Costa Rican rajalta ja Väli-Amerikan '
      + 'kahdestoista korkein huippu. Koska vuori on korkea ja kannas kapea, huipulta voi '
      + 'kirkkaana päivänä nähdä sekä Tyynenmeren että Karibianmeren — se on kuitenkin '
      + 'harvinaista. Juurella oleva Volcánin pikkukaupunki seisoo valtavan laharin päällä, '
      + 'joka näyttää murtaneen kalderan reunan; pieni joki on kuluttanut mutavirtaan uran ja '
      + 'paljastanut sen alta noin tuhatvuotiaan metsän. Vuorta ympäröi viileä ja hedelmällinen '
      + 'ylänkö, jota kastelevat Chiriquí Viejo ja Caldera; länsipuolella ovat Volcán ja Cerro '
      + 'Punta, itärinteellä Boquete. Huipulla sataa toisinaan rakeita, ja kuivalla kaudella '
      + 'siellä on usein kuuraa.',
    lahde: 'en-Wikipedia "Volcán Barú", johdanto-osa ja osio "Geography" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'coiba',
    nimi: 'Coiba',
    tyyppi: 'saari',
    kysymykset: [
      'Miksi saaren eläimet eroavat mantereen lajeista?',
      'Mikä saarella toimi vuosina 1919–2004?',
    ],
    korostukset: ['endeeminen|endeemisiä', 'rangaistussiirtola|rangaistussiirtola'],
    nappi: 'Väli-Amerikan suurin saari — ja sen pelätyin vankila',
    // -81.79 E / 7.48 N — en-Wikipedia "Coiba"
    // Lähin pelikaupunki: Panamá 90,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3107, y: 2961.7 },
    },
    teksti: 'Coiba on Väli-Amerikan suurin saari, pinta-alaltaan 494 neliökilometriä, ja se '
      + 'sijaitsee Veraguasin maakunnan edustalla Tyynellämerellä. Saari irtosi mantereesta '
      + '12 000–18 000 vuotta sitten merenpinnan noustessa, ja sen kasvit ja eläimet ovat '
      + 'siitä lähtien kehittyneet erillään: saarella on useita endeemisiä alalajeja, muun '
      + 'muassa oma mölyapinansa ja oma piikkipyrstönsä. Vuonna 1919 saarelle rakennettiin '
      + 'rangaistussiirtola, ja Omar Torrijosin ja Manuel Noriegan diktatuurien aikana '
      + 'vankila oli pelätty paikka, jonka maineeseen kuuluivat kidutus, teloitukset ja '
      + 'poliittiset murhat; uhrien määrää ei tiedetä, mutta arvioita on lähes kolmestasadasta. '
      + 'Juuri siksi paikallisia ei saarella käynyt eikä sitä rakennettu. Vankila suljettiin '
      + '2004, ja koskematon saari sopi luonnonsuojelualueeksi.',
    lahde: 'en-Wikipedia "Coiba", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'chagres',
    nimi: 'Chagres',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joki laskee kahteen valtamereen?',
      'Mihin joen vesi kanavalla tarvitaan?',
    ],
    korostukset: ['Alajuela|Alajuelajärveen', 'valuma-alue|valuma-alueen'],
    nappi: 'Joki, joka laskee kahteen mereen',
    // -79.35 E / 9.35 N (yläjuoksu Chagresin kansallispuistossa; artikkelin oma
    // koordinaatti osoittaa joen suulle, joka on Colónin merkin kohdalla)
    // — en-Wikipedia "Chagres River"
    // Lähin pelikaupunki: Panamá 12,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3188.3, y: 2898.9 },
    },
    teksti: 'Chagres on Panaman kanavan valuma-alueen suurin joki. Se on padottu kahdesti, ja '
      + 'syntyneet tekojärvet — Gatúnjärvi ja Alajuelajärvi — ovat osa kanavaa ja sen '
      + 'vesitaloutta. Luonnostaan joki virtaa luoteeseen Karibianmereen, mutta osa vedestä '
      + 'kulkee kanavan sulkujen kautta etelään Panamanlahteen: joki laskee siis kahteen eri '
      + 'valtamereen. Yläjuoksu ja sen sivujoet ovat Chagresin kansallispuistossa, joka '
      + 'perustettiin 1985 juuri turvaamaan kanavan vedensaantia; maasto on jyrkkää, sillä '
      + '90 prosentissa aluetta rinteet ovat yli 45 astetta, ja 98 prosenttia puistosta on '
      + 'vanhaa trooppista metsää. Yläjuoksu ja seitsemän sivujokea laskevat Alajuelajärveen, '
      + 'joka tuo 45 prosenttia kanavan vedestä ja voi varastoida kolmanneksen sen vuotuisesta '
      + 'tarpeesta.',
    lahde: 'en-Wikipedia "Chagres River", johdanto-osa ja osio "Upper Chagres River to Madden '
      + 'Dam" (tarkistettu 6.9.2026).',
  },
  /* ================================================================
   * ERÄ M17, 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston
   * alussa.
   * ============================================================== */
  {
    id: 'portobelo',
    nimi: 'Portobelo',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä satamasta lastattiin Espanjaan?',
      'Kuka valtasi sataman 1739?',
    ],
    korostukset: ['kaappari|kaapparit', 'hopea|hopea'],
    nappi: 'Kaunis satama, jonka kautta hopea kulki',
    // -79.655 E / 9.55444 N — en-Wikipedia "Portobelo"
    // Lähin pelikaupunki: Panamá 12,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3178.2, y: 2892.1 },
    },
    teksti: 'Portobelo on historiallinen satama Colónin maakunnassa Panaman kannaksen '
      + 'pohjoisrannalla, 32 kilometriä nykyisestä Colónin satamasta koilliseen. Se '
      + 'perustettiin 1597 syvän luonnonsataman takia, ja siitä tuli Veracruzin rinnalla '
      + 'satama, jonka kautta Espanjan valtakunta kuljetti Perun kaivosten aarteet kotiin: '
      + 'hopea tuli laivalla Panamán kaupunkiin Tyynenmeren puolelle ja sieltä maitse '
      + 'Portobeloon. Legendan mukaan nimen Puerto Bello antoi jo Kristoffer Kolumbus. '
      + 'Englantilaiset kaapparit ja merirosvot valtasivat kaupungin toistuvasti, ja '
      + 'huipennus oli kuninkaallisen laivaston onnistunut piiritys 1739 Jenkinsin korvan '
      + 'sodassa. Talous nousi vielä kerran 1800-luvun lopulla kanavaa rakennettaessa. '
      + 'Unesco otti Portobelon ja läheisen San Lorenzon linnoitukset '
      + 'maailmanperintöluetteloon 1980.',
    lahde: 'en-Wikipedia "Portobelo", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'panaman-rautatie',
    nimi: 'Panaman rautatie',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi rata rakennettiin juuri 1850-luvulla?',
      'Mitä rakentaminen maksoi?',
    ],
    korostukset: ['kultaryntäys|kultaryntäyksen', 'Balboa|Balboaan'],
    nappi: 'Meri mereen 76 kilometrissä, 1855',
    // -79.9 E / 9.3547 N (Colón, radan Atlantin pää) — en-Wikipedia "Panama Canal Railway"
    // Lähin pelikaupunki: Panamá 8,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3170, y: 2898.8 },
    },
    teksti: 'Panaman rautatie yhdistää Atlantin ja Tyynenmeren Panaman kannaksen poikki: '
      + 'nykyinen linja on 76,6 kilometriä pitkä ja kulkee Colónista Balboaan Panamán '
      + 'kaupungin viereen. Rakentaminen aloitettiin 1850, ja ensimmäinen maksava juna kulki '
      + 'koko matkan 28. tammikuuta 1855. Sitä pidettiin aikansa kansainvälisenä '
      + 'insinööritaidon saavutuksena — ja se maksoi kahdeksan miljoonaa dollaria sekä '
      + 'arviolta 5 000–10 000 työntekijän hengen. Rata rakennettiin yhdysvaltalaisin voimin, '
      + 'ja tärkein syy oli Kalifornian vuoden 1849 kultaryntäyksen kasvattama matkustaja- ja '
      + 'rahtiliikenne itärannikolta länteen. Rata oli sittemmin välttämätön kanavan '
      + 'rakentamiselle 1900-luvun alussa, ja sen linjaa muutettiin, kun Gatúnjärvi '
      + 'padottiin. Toisen maailmansodan jälkeen merkitys hiipui, ja rata avattiin uudelleen '
      + 'konttiliikenteelle 2001.',
    lahde: 'en-Wikipedia "Panama Canal Railway", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'el-cano',
    nimi: 'El Caño',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä El Cañon haudoista on löytynyt?',
      'Miten yhteiskunta muuttui vuosisatojen mittaan?',
    ],
    korostukset: ['cacique|cacique-päälliköiden', 'basaltti|basaltista'],
    nappi: 'Kivipylväitä ja kultaa Coclén tasangolla',
    // -80.53 E / 8.35 N (Natán piiri, Coclé) — en-Wikipedia "El Caño Archaeological Park"
    // Lähin pelikaupunki: Panamá 39,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3149, y: 2932.5 },
    },
    teksti: 'El Caño on esikolumbiaaninen arkeologinen alue ja hautauskeskus Coclén '
      + 'maakunnassa, noin 176 kilometriä Panamán kaupungista lounaaseen lähellä Río Grandea. '
      + 'Alue on 3,4–8 hehtaaria, ja siellä on basaltista ja tuffista veistettyjä pylväitä, '
      + 'maavalleja, kanavia ja hautoja hedelmällisellä tulvatasangolla vanhan tulivuoren '
      + 'kupeessa. Vanhin asutus ajoittuu vuosiin 100–400 eaa., ja paikalla asuttiin '
      + 'yhtäjaksoisesti espanjalaisten tuloon 1500-luvulla asti. Löydöt kertovat '
      + 'yhteiskunnan muuttumisesta: tasa-arvoisemmista rakenteista siirryttiin '
      + 'cacique-päälliköiden hallitsemiin keskuksiin, joissa työstettiin kultaa ja kuparia. '
      + 'Kaivaukset alkoivat 1920-luvulla, ja 2000-luvulla paljastui korkea-arvoisten '
      + 'hautausmaa; työ jatkuu yhä, ja osa esineistä on Panamán kaupungin '
      + 'antropologisessa museossa.',
    lahde: 'en-Wikipedia "El Caño Archaeological Park", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'guna-yala',
    nimi: 'Guna Yala',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi gunat muuttivat saarille?',
      'Milloin ja miksi nimi vaihtui?',
    ],
    korostukset: ['comarca|comarca', 'guna|gunat'],
    nappi: 'Saaret, joille muutettiin hyttysiä pakoon',
    // -78.34417 E / 9.29611 N — en-Wikipedia "Guna Yala"
    // Lähin pelikaupunki: Panamá 45,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3221.9, y: 2900.7 },
    },
    teksti: 'Guna Yala on alkuperäiskansan oma maakunta eli comarca Koillis-Panamassa, ja sen '
      + 'pääkaupunki on Gaigirgordub. Alueella asui 2023 kaikkiaan 32 016 ihmistä, joista yli '
      + '95 prosenttia on alkuperäiskansaa. Nimi tarkoittaa gunan kielellä gunien maata tai '
      + 'gunien vuorta; aiemmin alue tunnettiin nimellä San Blas ja sitten Kuna Yala, kunnes '
      + 'Panaman hallitus tunnusti lokakuussa 2011 asukkaiden kannan, että Guna vastaa nimeä '
      + 'tarkemmin. Alueella sijaitsi valloittajien tukikohta Acla, jossa Vasco Núñez de '
      + 'Balboa tuomittiin ja mestattiin. Gunat asuivat espanjalaisten tullessa nykyisen '
      + 'Kolumbian puolella Urabánlahden lähellä ja pakenivat Dariéniin; 1800-luvun '
      + 'puolivälistä alkaen he siirtyivät jokisuiden edustan saarille, mikä suojasi heitä '
      + 'taudeilta, käärmeiltä ja hyttysiltä.',
    lahde: 'en-Wikipedia "Guna Yala", johdanto-osa sekä osiot "Etymology" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'los-santos',
    nimi: 'Los Santos',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi seutua sanotaan kannaksen vanhimmaksi asuinalueeksi?',
      'Kuka hallitsi aluetta espanjalaisten tullessa?',
    ],
    korostukset: ['Gran Coclé|Gran Coclén', 'Azuero|Azueron'],
    nappi: 'Azueron niemi, jossa keramiikka alkoi',
    // -80.41667 E / 7.93333 N — en-Wikipedia "Los Santos Province"
    // Lähin pelikaupunki: Panamá 48,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3153.3, y: 2945.9 },
    },
    teksti: 'Los Santos on maakunta Azueron niemimaalla: se ulottuu pohjoisen La Villa '
      + '-joelta Tyynellemerelle etelässä ja idässä. Pinta-alaa on 3 809,4 neliökilometriä ja '
      + 'asukkaita 98 466 vuonna 2023; pääkaupunki on Las Tablas. Seudulla ovat Panaman '
      + 'kannaksen vanhimmat ihmisasutukset, ja se kuului Gran Coclén kulttuurialueeseen, '
      + 'jossa kehittyi yksi Amerikkojen ensimmäisistä keramiikkatyyleistä. Ensimmäiset '
      + 'eurooppalaiset tulivat 1515 Gonzalo de Badajozin johdolla. Silloin aluetta hallitsi '
      + 'cacique Antataura eli Cutara, jonka alaisuudessa oli kuusi muuta päällikkökuntaa. '
      + 'Maakunnan lippu on kolmiraitainen — punainen, sininen ja keltainen — ja perustuu '
      + 'Francisco Mirandan vuonna 1801 luomaan väriyhdistelmään; santeño-patriootit ottivat '
      + 'sen tunnuksekseen 1821 taistelussa Espanjaa vastaan.',
    lahde: 'en-Wikipedia "Los Santos Province", johdanto-osa ja osio "Symbols" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'bocas-del-toro',
    nimi: 'Bocas del Toro',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mitä maakunnan nimi tarkoittaa?',
      'Mitä kutsutaan Väli-Amerikan vihreäksi kullaksi?',
    ],
    korostukset: ['oro verde|oro verde', 'saaristo|saaristosta'],
    nappi: 'Härän suut ja vihreä kulta',
    // -82.24056 E / 9.34056 N — en-Wikipedia "Bocas del Toro Province"
    // Lähin pelikaupunki: Panamá 84,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3092, y: 2899.3 },
    },
    teksti: 'Bocas del Toro on Panaman luoteinen maakunta, ja nimi tarkoittaa härän suita. '
      + 'Pinta-alaa on 4 643,9 neliökilometriä, ja se koostuu mantereesta ja yhdeksästä '
      + 'pääsaaresta: Bocas del Toron saaristosta, Almirantenlahdesta, Chiriquín laguunista '
      + 'ja viereisestä mantereesta. Pääkaupunki on Bocas del Toron kaupunki Colónin saarella, '
      + 'ja asukkaita maakunnassa oli 2023 kaikkiaan 159 228. Kristoffer Kolumbus miehistöineen '
      + 'kävi seudulla ensi kerran 1502 etsiessään läpikulkuväylää. Maakunnassa on kaksi '
      + 'kansallispuistoa, Isla Bastimentosin merikansallispuisto ja La Amistadin '
      + 'kansainvälinen puisto, ja Smithsonianin trooppisen tutkimuksen instituutilla on '
      + 'Colónin saarella tutkimusasema. Banaaniviljelmiä on paljon; banaania kutsutaan '
      + 'Väli-Amerikassa usein nimellä oro verde, vihreä kulta.',
    lahde: 'en-Wikipedia "Bocas del Toro Province", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'darienin-aukko',
    nimi: 'Dariénin aukko',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi maanteitä ei ole rakennettu Dariéniin?',
      'Mistä nimi Darién tulee?',
    ],
    korostukset: ['Tapón del Darién|Tapón del Darién', 'Cerro Tacarcuna|Cerro Tacarcuna'],
    nappi: 'Ainoa katko Amerikkojen läpi kulkevassa tiessä',
    // -77.46 E / 7.9 N — en-Wikipedia "Darién Gap"
    // Lähin pelikaupunki: Panamá 86,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3251.3, y: 2947.6 },
    },
    teksti: 'Dariénin aukko eli Tapón del Darién on syrjäinen, tietön ja vaarallinen '
      + 'sademetsäalue Kolumbian ja Panaman rajalla. Se ulottuu Etelä-Panaman Dariénin '
      + 'maakunnasta Kolumbian Chocón pohjoisosaan ja toimii luonnollisena muurina Pohjois- '
      + 'ja Etelä-Amerikan välillä: siellä on laaja valuma-allas, tiheä sademetsä ja vuoria, '
      + 'ja seutu on maineeltaan yksi maailman epävieraanvaraisimmista. Silti se on ainoa '
      + 'maasilta mantereiden välillä ja on aina ollut sekä ihmisten että eläinten reitti. '
      + 'Kolumbian puoli on Atraton suistoa ja vähintään 80 kilometriä leveää suomaata; '
      + 'Panaman puoli on vuoristoista sademetsää, jonka korkein kohta on 1 845 metrin '
      + 'Cerro Tacarcuna. Nimi tulee Tanela-joesta, jonka espanjalaiset valloittajat '
      + 'muuttivat 1500-luvulla Dariéniksi. Alueella asuvat pääosin embera-wounaanit ja '
      + 'gunat.',
    lahde: 'en-Wikipedia "Darién Gap", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'helmisaaret',
    nimi: 'Helmisaaret',
    tyyppi: 'muu',
    kysymykset: [
      'Mistä Contadoran nimi tulee?',
      'Mikä on saariryhmän suurin saari?',
    ],
    korostukset: ['Contadora|Contadoran', 'Isla del Rey|Isla del Rey'],
    nappi: 'Kaksisataa saarta Panamanlahdella',
    // -79.05 E / 8.4 N — en-Wikipedia "Pearl Islands"
    // Lähin pelikaupunki: Panamá 34,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3198.3, y: 2930.8 },
    },
    teksti: 'Helmisaaret eli Archipiélago de las Perlas on yli kahdensadan saaren ja luodon '
      + 'ryhmä noin 48 kilometriä Panaman Tyynenmeren rannikolta Panamanlahdella; suuri osa '
      + 'niistä on pieniä ja asumattomia. Tunnetuin on Contadoran saari, jonka nimi kertoo '
      + 'sen tehtävästä: espanjan contador tarkoittaa laskijaa tai kirjanpitäjää, ja '
      + 'valloittajien kerrotaan pysähtyneen saarelle laskemaan saaliinsa ennen paluuta '
      + 'Espanjaan. Suurin saari on 234 neliökilometrin Isla del Rey, "kuninkaan saari", '
      + 'jonka nimi viitannee Kristukseen kuninkaana eikä maalliseen hallitsijaan; se on '
      + 'yksin suurempi kuin kaikki muut Helmisaaret yhteensä ja Panaman toiseksi suurin '
      + 'saari Coiban jälkeen. Saaret kohosivat merestä, kun mannerlaatat alkoivat liittyä '
      + 'yhteen, ja Contadoralta ja muilta saarilta on löydetty esikolumbiaanisia esineitä.',
    lahde: 'en-Wikipedia "Pearl Islands", johdanto-osa sekä osiot "Islands" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
];
