/*
 * MAASTOKOHTEET — ESP. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs ESP --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/ESP.json. Työkalu laskee laudan
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
 * ── K2-ERÄ 4 6.9.2026: KOHTEITA MAASTON RINNALLE ───────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Espanjassa oli kuusitoista karttamerkkiä ja NOLLA kuratoitua
 * kohdetta (docs/moduulit/karttanostot-kattavuus.md), joten koko vaje
 * oli kohteissa. Tässä ovat ne kahdeksan; yhdenkään tyyppi ei ole
 * maastoa, vaan historiaa, kulttuuria, tekniikkaa tai kaupunkia.
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-esp.js:ssä.
 * Sama syy kuin erässä 1: kohdepakki vaatisi rivin
 * js/fokuskohteet.js:n KOHDE_MAAT-tauluun ja lehden poltettujen nimien
 * lohkon (js/packs/fokus-grc.js FOKUS_LISANIMET), eikä kumpaankaan
 * kosketa tässä erässä. Maastokohteiden hakemisto
 * (js/packs/maastokohteet.js) liittää listan peliin sellaisenaan.
 *
 * ALHAMBRA JÄTETTIIN POIS, ja syy on sääntö eikä unohdus: se on
 * Granadan kohdalla, ja Granada on pelikaupunki. Kohdekaupungin
 * kohdalla oleva nosto kuuluu kohdekartalle eikä pääkartalle
 * (Raamattu; KAUPUNGIN_KOHDALLA_SADE 7, js/fokuskohteet.js). Samasta
 * syystä listalla ei ole Sagrada Famíliaa (Barcelona) eikä Madridin
 * omia kohteita.
 *
 * KAIKKI KAHDEKSAN OVAT KAUKANA PELIKAUPUNGISTA. Espanjassa ja sen
 * naapurissa on viisi pelikaupunkia (Madrid, Barcelona, Granada,
 * Sevilla ja Lissabon), ja etäisyys mitattiin jokaiseen
 * js/packs/maailmankartta.js CITIES-listan kaupunkiin; jokaisen
 * kohteen lähin on kirjattu sen oman koordinaattirivin viereen. Lähin
 * koko erässä on Toledo 23,9 lautayksikön päässä Madridista, eli yli
 * kolminkertaisesti rajan yli. Kaikki kahdeksan ovat siis pääkartan
 * merkkejä.
 *
 * KUVATON ERÄ. Kortti kantaa tekstin ja lähteen, ei kuvaa — sama linja
 * kuin erässä 1. Faktat on tarkistettu en-Wikipediasta kohde
 * kerrallaan 6.9.2026.
 *
 * Espanjan maastokohteet. Faktat en-Wikipediasta 29.8.2026. HUOM: Teide (3 715 m) on Espanjan korkein, mutta se on Kanariansaarilla eikä siten mahdu maan fokuslehden ikkunaan (YLEINEN.saarenEtaisyys 2,5 astetta) — merkki jäisi kuvan ulkopuolelle. Siksi listalla on Mulhacén, jonka artikkeli itse nimeää mannermaisen Espanjan korkeimmaksi.
 */
export const MAASTOKOHTEET_ESP = [
  {
    id: 'mulhacen',
    nimi: 'Mulhacén',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuka oli Muley Hacén?',
      'Miksi Sierra Nevadassa on lunta niin etelässä?',
    ],
    korostukset: ['Sierra Nevada|Sierra Nevadan'],
    nappi: 'Iberian niemimaan korkein',
    // -3.3114 E / 37.0533 N — en-Wikipedia "Mulhacén"
    laudat: {
      maailmankartta: { x: 5723, y: 1917.3 },
      europe: { x: 147.6, y: 919.1 },
    },
    teksti: 'Mulhacén kohoaa 3 479 metriin ja on mannermaisen Espanjan sekä koko Iberian niemimaan '
      + 'korkein vuori. Se kuuluu Sierra Nevadan vuoristoon Penibeettisessä järjestelmässä. '
      + 'Nimi tulee Granadan toiseksi viimeiseltä muslimihallitsijalta Abu\'l-Hasan Alilta, jota '
      + 'espanjaksi kutsuttiin Muley Hacéniksi ja joka tarun mukaan haudattiin vuoren huipulle.',
    lahde: 'en-Wikipedia "Mulhacén", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'aneto',
    nimi: 'Aneto',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Anetoa pidettiin kirottuna?',
      'Onko Anetolla vielä jäätikköä?',
    ],
    korostukset: ['Maladeta|Maladetaa'],
    nappi: 'Pyreneiden korkein huippu',
    // 0.6578 E / 42.6322 N — en-Wikipedia "Aneto"
    laudat: {
      maailmankartta: { x: 5855.3, y: 1698.2 },
      europe: { x: 223.8, y: 772.4 },
    },
    teksti: 'Pyreneiden korkeimmalla huipulla ei pitkään aikaan ollut nimeä. Eteläisten laaksojen '
      + 'paimenet puhuivat Malhetasta tai vain Puntasta, ja ensimmäinen matkailija, joka näki '
      + 'vuoren Benasquen solasta vuonna 1787, kuvasi sitä jääneuloiksi. Vielä sen jälkeenkin '
      + 'Pyreneiden korkeimpana pidettiin naapuria Maladetaa — vasta kun Friedrich von Parrot '
      + 'nousi Maladetan huipulle 1817, huomattiin että Aneto on korkeampi. Sitten alkoivat '
      + 'onnettomuudet: kun seudun tunnetuin opas putosi jäätikön railoon ja kuoli, paikalliset '
      + 'alkoivat pitää vuorta kirottuna eivätkä menneet jäälle. Nykyinen nimi vakiintui vasta '
      + '1890-luvulla. Aneton pohjoisrinteellä on yhä Pyreneiden suurin jäätikkö, mutta se on '
      + 'kutistunut yli kahdestasadasta hehtaarista 48 hehtaariin ja saattaa kadota '
      + '2050-luvulle tultaessa.',
    lahde: 'en-Wikipedia "Aneto", johdanto-osa sekä osiot "Toponym", "History" ja "Glaciers" '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'valimeri',
    nimi: 'Välimeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka kapea Gibraltarinsalmi todella on?',
      'Mitä Espanjan Välimeren rannikolla kalastetaan?',
    ],
    korostukset: ['Gibraltarinsalmi|Gibraltarinsalmen'],
    nappi: 'Meri kolmen maanosan välissä',
    // 0.6 E / 38.6 N — ulappa Espanjan itärannikon edustalla; artikkelin oma keskipiste on 18 / 35
    laudat: {
      maailmankartta: { x: 5853.3, y: 1857.6 },
      europe: { x: 222.7, y: 878.4 },
    },
    teksti: 'Välimeri on maanosien välinen meri Euroopan, Aasian ja Afrikan keskellä, ja maa '
      + 'ympäröi sen lähes kokonaan. Lännessä se yhtyy Atlanttiin Gibraltarinsalmen kautta, '
      + 'joka erottaa Iberian niemimaan Marokosta vain neljäntoista kilometrin levyisenä. '
      + 'Espanja on ainoa maa, jolla on rantaa sekä tällä merellä että Atlantilla.',
    lahde: 'en-Wikipedia "Mediterranean Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'tajo',
    nimi: 'Tajo',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Sierra de Albarracín on?',
      'Millä nimellä joki tunnetaan Portugalissa?',
    ],
    korostukset: ['Sierra de Albarracín|Sierra de Albarracínin'],
    nappi: 'Iberian pisin joki',
    // -4.02 E / 39.86 N — Toledo, joen mutka kaupungin ympäri — piste valittu keskijuoksulta; artikkelilla ei ole koordinaattia
    laudat: {
      maailmankartta: { x: 5699.3, y: 1808.4 },
      europe: { x: 134, y: 845.3 },
    },
    teksti: 'Iberian pisimmän joen alku mahtuu yhteen lähteeseen. Fuente García pulppuaa 1 593 '
      + 'metrin korkeudessa Sierra de Albarracínin ylängöllä, kahden lähes 1 850-metrisen '
      + 'huipun välissä, ja siitä alkaa Tajon 1 007 kilometrin matka Atlantille. Espanjan '
      + 'puolella jokea on 816 kilometriä: se kulkee Aragonian, Kastilia-La Manchan, Madridin '
      + 'ja Extremaduran halki, ohittaa Aranjuezin, Toledon ja Talavera de la Reinan ja '
      + 'muodostaa lopulta 47 kilometrin mittaisen rajan Portugalia vasten. Siitä eteenpäin '
      + 'joen nimi on Tejo. Vesistöalue on koko niemimaan asutuin — yli kymmenen miljoonaa '
      + 'ihmistä Madridin seutu ja Lissabon mukaan luettuina — ja sen patoaltaisiin mahtuu noin '
      + '14 500 kuutiohehtometriä vettä.',
    lahde: 'en-Wikipedia "Tagus", osiot "Source", "Course" ja "Basin" (tarkistettu 1.9.2026).',
  },
  {
    id: 'ebro',
    nimi: 'Ebro',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Ebron suisto on niin laaja?',
      'Mitä Ebron laaksossa kasvatetaan?',
    ],
    nappi: 'Espanjan oma pisin joki',
    // -0.88 E / 41.65 N — Zaragoza joen keskijuoksulla; artikkelin koordinaatti 0,863 / 40,72 on suistossa
    laudat: {
      maailmankartta: { x: 5804, y: 1737.6 },
      europe: { x: 194.3, y: 798.2 },
    },
    teksti: 'Ebro nousee Kantabriasta ja virtaa 930 kilometriä lähes koko matkan itäkaakkoon, '
      + 'kunnes laskee Välimereen ja muodostaa suiston Etelä-Kataloniaan. Iberian niemimaalla '
      + 'se on pituudeltaan toinen Tajon jälkeen sekä virtaamaltaan ja valuma-alueeltaan toinen '
      + 'Douron jälkeen. Se on kuitenkin pisin kokonaan Espanjan sisällä virtaava joki: kaksi '
      + 'muuta jatkavat Portugaliin.',
    lahde: 'en-Wikipedia "Ebro", johdanto-osa (tarkistettu 29.8.2026).',
  },
  /* ================================================================
   * K2-ERÄ 4 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston
   * alussa. Uusilla kohteilla on vain maailmankartan rivi: Euroopan
   * erillislaudasta on luovuttu (Raamattu 30.8.2026), eikä uutta
   * `europe`-koordinaattia siksi lasketa. Yllä olevien maastokohteiden
   * vanhoihin riveihin ei ole koskettu.
   * ============================================================== */
  {
    id: 'santiago-de-compostela',
    nimi: 'Santiago de Compostela',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mistä nimi Compostela tulee?',
      'Kuka löysi haudan tarun mukaan?',
    ],
    korostukset: ['Jaakobin tie|Jaakobin tien'],
    nappi: 'Pyhiinvaellusten päätepiste',
    // -8.5444 E / 42.8778 N — en-Wikipedia "Santiago de Compostela";
    // lähin pelikaupunki Lissabon 165,3 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5548.5, y: 1688.3 },
    },
    teksti: 'Santiago de Compostela on Galician pääkaupunki Iberian niemimaan '
      + 'luoteiskulmassa. Kaupunki sai alkunsa apostoli Jaakobin pyhäköstä, jonka '
      + 'paikalla on nykyään Santiago de Compostelan katedraali. Se on Jaakobin tien '
      + 'päätepiste — yksi katolisen maailman tärkeimmistä pyhiinvaellusreiteistä '
      + '800-luvulta lähtien. Vanhakaupunki on ollut maailmanperintökohde vuodesta '
      + '1985.\n\n'
      + 'Nimen alkuperästä on kaksi selitystä. Tutkijat johtavat Compostelan latinan '
      + 'sanoista compositum tella, hyvin järjestetty hautausmaa, mikä viittaisi '
      + 'kirkkoa vanhempaan hautausmaahan. Kansanetymologia taas johtaa nimen sanoista '
      + 'campus stellae, tähden kenttä. Santiago puolestaan on galician kielen muoto '
      + 'latinan nimestä Sanctus Iacobus.\n\n'
      + 'Keskiaikaisen tarun mukaan apostoli Jaakobin jäännökset tuotiin Galiciaan '
      + 'haudattaviksi, mutta hauta unohtui. Kahdeksansataa vuotta myöhemmin kirkas '
      + 'tähti johdatti paimen Pelagiuksen paikalle, kun tämä vartioi yöllä laumaansa. '
      + 'Hän kertoi löydöstä Irian piispalle Theodemirille, joka julisti jäännökset '
      + 'apostolin omiksi ja ilmoitti asiasta kuningas Alfonso II:lle Oviedoon. '
      + 'Katedraali rakennettiin sille kohdalle, mistä jäännökset kerrottiin '
      + 'löytyneen.',
    lahde: 'en-Wikipedia "Santiago de Compostela", johdanto-osa sekä osiot "Toponym" '
      + 'ja "City" (tarkistettu 6.9.2026).',
  },
  {
    id: 'segovian-akvedukti',
    nimi: 'Segovian akvedukti',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miten akveduktin ikä selvitettiin?',
      'Kuinka kauan akvedukti oli käytössä?',
    ],
    korostukset: ['Vitruvius|Vitruvius'],
    nappi: '167 kaarta, käytössä vuoteen 1973',
    // -4.1178 E / 40.9479 N — en-Wikipedia "Aqueduct of Segovia";
    // lähin pelikaupunki Madrid 25,4 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5696.1, y: 1765.5 },
    },
    teksti: 'Segovian akvedukti on roomalainen vesijohto, joka rakennettiin noin '
      + 'ensimmäisellä vuosisadalla jaa. tuomaan vettä seitsemäntoista kilometrin '
      + 'päässä olevilta vuorilähteiltä Segovian suihkulähteisiin, yleisiin kylpylöihin '
      + 'ja koteihin. Se oli käytössä aina vuoteen 1973. Korkealla kulkevassa osassa on '
      + '167 kaarta, ja rakennelma on kaupungin tunnus: se on Segovian vaakunassa. '
      + 'Vanhakaupunki ja akvedukti otettiin maailmanperintöluetteloon 1985.\n\n'
      + 'Rakennusaika oli pitkään arvoitus, koska luettavaa piirtokirjoitusta ei ole. '
      + '1900-luvun lopulla Géza Alföldy tulkitsi omistuskirjoituksen tutkimalla '
      + 'kiinnikkeitä, joilla kadonneet pronssikirjaimet oli aikanaan kiinnitetty. '
      + 'Hänen mukaansa keisari Domitianus määräsi työn ja se valmistui todennäköisesti '
      + 'vuonna 98. Vuonna 2016 julkaistu arkeologinen aineisto siirtää ajoitusta '
      + 'hieman myöhemmäksi, vuoden 112 jälkeen Traianuksen tai varhaisen Hadrianuksen '
      + 'aikaan.\n\n'
      + 'Vesi otettiin Río Fríosta La Acebedan seudulta ja kulki viisitoista '
      + 'kilometriä ennen kaupunkiin saapumistaan. Rakenne noudattaa niitä '
      + 'periaatteita, jotka Vitruvius esitti teoksessaan De architectura.',
    lahde: 'en-Wikipedia "Aqueduct of Segovia", johdanto-osa sekä osiot "History" ja '
      + '"Description" (tarkistettu 6.9.2026).',
  },
  {
    id: 'altamiran-luola',
    nimi: 'Altamiran luola',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi maalauksia ei ensin uskottu esihistoriallisiksi?',
      'Miksi luolaan ei enää pääse?',
    ],
    korostukset: ['Marcelino Sanz de Sautuola|Marcelino Sanz de Sautuola'],
    nappi: 'Maalaukset, joita ei uskottu',
    // -4.1203 E / 43.3825 N — en-Wikipedia "Cave of Altamira";
    // lähin pelikaupunki Madrid 119,9 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5696, y: 1667.9 },
    },
    teksti: 'Altamiran luola on luolasto lähellä Santillana del Marin vanhaa kaupunkia '
      + 'Kantabriassa Pohjois-Espanjassa. Se tunnetaan esihistoriallisesta '
      + 'luolataiteesta: hiilipiirroksista ja monivärimaalauksista, joissa on '
      + 'aikakauden paikallisia eläimiä ja ihmisen käsiä. Vanhimmat maalaukset tehtiin '
      + 'ylemmällä paleoliittisella kaudella noin 36 000 vuotta sitten.\n\n'
      + 'Luolan löysi 1868 Modesto Cubillas, ja sitä tutki Marcelino Sanz de Sautuola, '
      + 'joka julkaisi tutkimuksensa 1880 Juan de Vilanova y Pieran tuella. Julkaisu '
      + 'johti katkeraan riitaan: osa asiantuntijoista kiisti maalausten '
      + 'esihistoriallisen alkuperän sillä perusteella, ettei esihistoriallinen ihminen '
      + 'kyennyt abstraktiin ajatteluun. Kiista jatkui vuoteen 1902, jolloin vastaavia '
      + 'löytöjä Ranskan ja Espanjan rajaseudulta oli kertynyt niin paljon, ettei '
      + 'todistusaineistoa voinut enää sivuuttaa.\n\n'
      + 'Altamira otettiin maailmanperintöluetteloon 1985. Luolaan itseensä ei enää '
      + 'pääse säilymissyistä, mutta paikalla ja muualla on siitä jäljennöksiä. '
      + 'Luolasto on noin 270 metriä pitkä mutkittelevien käytävien ja kammioiden '
      + 'sarja, ja pääkäytävä on kahdesta kuuteen metriin korkea.',
    lahde: 'en-Wikipedia "Cave of Altamira", johdanto-osa ja osio "Description" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'toledo',
    nimi: 'Toledo',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Minkä valtakunnan pääkaupunki Toledo oli?',
      'Mistä käsityöstä Toledo on tunnettu?',
    ],
    korostukset: ['visigootit|visigoottien'],
    nappi: 'Kolmen kulttuurin kaupunki joen mutkassa',
    // -4.0244 E / 39.8567 N — en-Wikipedia "Toledo, Spain";
    // lähin pelikaupunki Madrid 23,9 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5699.2, y: 1808.5 },
    },
    teksti: 'Toledo on kaupunki Keski-Espanjassa Tajon oikealla rannalla, joen mutkan '
      + 'syleilyssä. Se on Toledon maakunnan pääkaupunki ja Kastilia-La Manchan '
      + 'hallituksen ja parlamentin virallinen sijaintipaikka; asukkaita on noin '
      + '86 500. Vuosisatojen aikana kaupunki on tunnettu monella nimellä: latinaksi '
      + 'Toletum, arabiaksi Tulaytula ja juutalaisespanjaksi Toldoth.\n\n'
      + 'Karpetaanien asuinpaikalle noussut Toledo kasvoi merkittäväksi '
      + 'roomalaiskaupungiksi ja myöhemmin visigoottien valtakunnan pääkaupungiksi ja '
      + 'mahtavan arkkihiippakunnan istuimeksi. Islamilaisen kauden aikana se '
      + 'niskoitteli usein umaijadien keskusvaltaa vastaan, mutta samalla siitä tuli '
      + 'kulttuurikeskus, jossa islamilainen maailma ja latinalainen kristikunta '
      + 'vaihtoivat oppia keskenään.\n\n'
      + 'Kristityt valtasivat kaupungin 1085, ja se säilytti asemansa Kastilian '
      + 'kruunun sisällä ja pysyi kahden seuraavan vuosisadan ajan avoimena muslimien '
      + 'ja juutalaisten vaikutteille. Kun poliittinen valta siirtyi Madridiin, '
      + 'silkkiteollisuus piti taloutta pystyssä, kunnes 1630-luvulla alkoi todellinen '
      + 'taantuma. Toledossa on goottilainen katedraali ja pitkä perinne teräaseiden '
      + 'valmistuksessa. Unesco listasi kaupungin maailmanperintökohteeksi 1986.',
    lahde: 'en-Wikipedia "Toledo, Spain", johdanto-osa ja osio "Toponym" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'cordoban-moskeijakatedraali',
    nimi: 'Córdoban moskeijakatedraali',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka määräsi suuren moskeijan rakennettavaksi?',
      'Mitä 1500-luvulla rakennettiin rakennuksen keskelle?',
    ],
    korostukset: ['mihrab|mihrabin'],
    nappi: 'Moskeija, jonka keskelle rakennettiin katedraali',
    // -4.7797 E / 37.8792 N — en-Wikipedia "Mosque–Cathedral of Córdoba";
    // lähin pelikaupunki Sevilla 44,5 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5674, y: 1885.5 },
    },
    teksti: 'Córdoban moskeijakatedraali on Córdoban hiippakunnan katedraali '
      + 'Andalusiassa. Sen virallinen nimi on Neitsyt Marian taivaaseenottamisen '
      + 'katedraali, mutta se tunnetaan yleisesti Mezquitana eli moskeijana ja '
      + 'historiallisesti Córdoban suurena moskeijana.\n\n'
      + 'Suuri moskeija rakennettiin vuonna 785 Córdoban emiirikunnan perustajan Abd '
      + 'ar-Rahman I:n käskystä. Perimätiedon mukaan paikalla oli sitä ennen '
      + 'visigoottien kirkko, mutta asiasta kiistellään yhä. Seuraajat laajensivat '
      + 'rakennusta useaan otteeseen 900-luvun loppuun asti: Abd ar-Rahman III '
      + 'rakennutti minareetin, joka valmistui 958, ja hänen poikansa al-Hakam II '
      + 'koristeellisen mihrabin ja sitä ympäröivän maqsuran, joka valmistui 971.\n\n'
      + 'Kun Kastilian joukot valtasivat Córdoban 1236, moskeija muutettiin '
      + 'katedraaliksi. Rakennukseen tehtiin vain pieniä muutoksia siihen asti, kun '
      + '1500-luvulla sen keskelle rakennettiin renessanssityylinen kirkkolaiva ja '
      + 'poikkilaiva. Samoihin aikoihin kellotorniksi muutettu entinen minareetti '
      + 'muotoiltiin uudelleen. Kohde on ollut maailmanperintöluettelossa vuodesta '
      + '1984.',
    lahde: 'en-Wikipedia "Mosque–Cathedral of Córdoba", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'las-medulas',
    nimi: 'Las Médulas',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mitä ruina montium tarkoittaa?',
      'Kuka kuvasi menetelmän ensimmäisenä?',
    ],
    korostukset: ['Plinius vanhempi|Plinius vanhempi'],
    nappi: 'Vuori, joka huuhdottiin pois',
    // -6.76 E / 42.4589 N — en-Wikipedia "Las Médulas";
    // lähin pelikaupunki Madrid 130,5 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5608, y: 1705.2 },
    },
    teksti: 'Las Médulas on roomalainen kultakaivosalue lähellä Ponferradaa El '
      + 'Bierzon seudulla Leónin maakunnassa. Se oli koko Rooman valtakunnan tärkein '
      + 'kultakaivos ja sen suurin avolouhos. Alue kuuluu Unescon '
      + 'maailmanperintöluetteloon, ja vuonna 2014 tehdyt laserkeilaukset ovat '
      + 'vahvistaneet, kuinka laajalle roomalaiset työt ulottuivat.\n\n'
      + 'Maiseman muodon selittää menetelmä nimeltä ruina montium eli vuorten '
      + 'hajottaminen. Plinius vanhempi kuvasi sen vuonna 77 jaa. Kyse oli vesivoimalla '
      + 'louhimisesta: vuori kaivettiin ontoksi ja huuhdottiin sitten suurella '
      + 'vesimäärällä. Vesi tuotiin toisesta vesistöstä pitkin ainakin seitsemää '
      + 'akveduktia, jotka keräsivät virtoja La Cabreran seudulta eri korkeuksilta. '
      + 'Samoilla akvedukteilla pestiin myös maaperän kultahiekka.\n\n'
      + 'Augustus valloitti alueen vuonna 25 eaa. Ennen roomalaisia paikalliset '
      + 'asukkaat keräsivät kultaa jokisorasta, ja laajamittainen tuotanto alkoi vasta '
      + 'ensimmäisen vuosisadan jälkipuoliskolla. Plinius itse toimi seudulla '
      + 'prokuraattorina vuonna 74.',
    lahde: 'en-Wikipedia "Las Médulas", johdanto-osa ja osio "Mining technique" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'meridan-roomalainen-teatteri',
    nimi: 'Méridan roomalainen teatteri',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka rakennutti teatterin?',
      'Miksi paikkaa kutsuttiin seitsemäksi tuoliksi?',
    ],
    korostukset: ['Emerita Augusta|Emerita Augustan'],
    nappi: 'Teatteri, joka hautautui maan alle',
    // -6.3385 E / 38.9154 N — en-Wikipedia "Roman Theatre (Mérida)";
    // lähin pelikaupunki Sevilla 60,2 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5622.1, y: 1845.3 },
    },
    teksti: 'Méridan roomalainen teatteri rakennettiin Emerita Augustan siirtokuntaan, '
      + 'joka oli Rooman Lusitanian maakunnan pääkaupunki ja on nykyään Mérida. Konsuli '
      + 'Vipsanius Agrippa vauhditti hanketta, ja teatteri valmistui vuosina 16–15 eaa. '
      + 'Se rakennettiin viihdekokonaisuudeksi yhdessä kaupungin amfiteatterin kanssa, '
      + 'ja sen mitat noudattavat Vitruviuksen ohjeita.\n\n'
      + 'Teatteria uudistettiin ainakin kahdesti. Ensimmäisen ja toisen vuosisadan '
      + 'vaihteessa, mahdollisesti Traianuksen aikana, pystytettiin nykyinen näyttämön '
      + 'taustaseinä eli scaenae frons. Konstantinus Suuren aikana vuosina 330–340 '
      + 'lisättiin uusia koristeaiheita ja rakennusta kiertävä kulkuväylä.\n\n'
      + 'Myöhäisantiikissa teatteri hylättiin ja hautautui vähitellen maan alle niin, '
      + 'että vain katsomon ylimmät penkkirivit jäivät näkyviin. Paikallinen '
      + 'perimätieto kutsui paikkaa seitsemäksi tuoliksi ja kertoi, että niillä maurien '
      + 'kuninkaat istuivat päättämässä kaupungin kohtalosta. Vuodesta 1933 teatterissa '
      + 'on järjestetty klassisen teatterin kansainvälistä festivaalia, ja 1993 '
      + 'Méridan arkeologinen kokonaisuus otettiin maailmanperintöluetteloon.',
    lahde: 'en-Wikipedia "Roman Theatre (Mérida)", johdanto-osa sekä osiot "Enclave" '
      + 'ja "Structure" (tarkistettu 6.9.2026).',
  },
  {
    id: 'salamancan-yliopisto',
    nimi: 'Salamancan yliopisto',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka perusti yliopiston?',
      'Mitä sanonta Quod natura non dat tarkoittaa?',
    ],
    korostukset: ['studium generale|studium generale'],
    nappi: 'Espanjankielisen maailman vanhin yliopisto',
    // -5.6667 E / 40.9614 N — en-Wikipedia "University of Salamanca";
    // lähin pelikaupunki Madrid 68,9 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5644.4, y: 1764.9 },
    },
    teksti: 'Salamancan yliopisto on julkinen tutkimusyliopisto Salamancassa '
      + 'Länsi-Espanjassa. Sen perusti kuningas Alfonso IX vuonna 1218, ja se on '
      + 'espanjankielisen maailman vanhin ja koko maailman neljänneksi vanhin '
      + 'yhtäjaksoisesti toiminut yliopisto. Opiskelijoita on yli 30 000 '
      + 'viidestäkymmenestä maasta.\n\n'
      + 'Ennen yliopistoa Salamancassa toimi tuomiokirkkokoulu, joka tiedetään olleen '
      + 'olemassa jo 1130. Vuonna 1218 siitä muodostettiin studium generale nimellä '
      + 'scholas Salamanticae. Alfonso X:n 8. toukokuuta 1254 antama kuninkaallinen '
      + 'kirja määräsi yliopiston järjestyksestä ja rahoituksesta ja käytti '
      + 'ensimmäisen kerran sen nykyistä nimeä. Paavi Aleksanteri IV vahvisti kirjan '
      + 'bullallaan 1255 ja antoi yliopiston tutkinnoille yleisen tunnustuksen.\n\n'
      + 'Yliopiston maine näkyy vanhoissa sanonnoissa. Quod natura non dat, Salmantica '
      + 'non praestat — mitä luonto ei anna, sitä Salamanca ei lainaa. Toinen kuuluu '
      + 'Multos et doctissimos Salmantica habet: Salamancassa on monia ja hyvin '
      + 'oppineita.',
    lahde: 'en-Wikipedia "University of Salamanca", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
];

