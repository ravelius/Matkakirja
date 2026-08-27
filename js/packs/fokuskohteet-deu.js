/*
 * FOKUSKOHTEET — SAKSA. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Rakenne, kentät ja äänensävy ovat samat kuin Kreikan listassa
 * (js/packs/fokuskohteet-grc.js), jonka tiedoston alku selittää ne
 * kokonaan — sitä ei toisteta tässä. Tässä kerrotaan vain se, mikä on
 * SAKSASSA TOISIN.
 *
 * ── LEHTI EI NIMEÄ MITÄÄN, JOTEN LISTAN ON NIMETTÄVÄ KAIKKI ────────
 *
 * Saksan fokuslehti on ensimmäinen, joka syntyi heti omistajan
 * klikattavuuslinjan mukaisena (Raamattu, KARTTAMERKIT
 * MINIMALISTISIKSI: *"Nimipoltto poistetaan lehdistä joilla kohteet
 * hoitavat nimeämisen; pudonneet nimet palautetaan kohteina, ei
 * polttoa palauttamalla."*). Kuvaan ei ole poltettu yhtäkään nimeä —
 * ei vuorten, ei merten, ei jokien eikä kaupunkien
 * (tools/fokuskartta/maat.mjs FOKUSMAAT.DEU: `poltetutNimet` pois
 * kaikilta kolmelta lajilta, `kaupungit` ja `naapurit` tyhjinä).
 *
 * SIITÄ SEURAA KAKSI ASIAA, JOTKA ON PIDETTÄVÄ MIELESSÄ TÄTÄ LISTAA
 * MUOKATESSA:
 *
 *   1. JOKAINEN KARTALLA NÄKYVÄ NIMI ON TÄSSÄ LISTASSA. Lehdellä ei
 *      ole ainoatakaan nimeä, jota ei voisi napauttaa — mutta ei
 *      myöskään nimeä, jota tämä lista ei latoisi. Jos kohde
 *      poistetaan, kartalta katoaa nimi; jos lisätään, kartalle
 *      ilmestyy nimi. Lista EI siis ole lehden päälle ripoteltuja
 *      lisähuomioita vaan lehden nimistö.
 *   2. VIISI VUORTA ON SIDOTTU KUVAAN. Zugspitze, Watzmann, Feldberg,
 *      Großer Arber ja Brocken ovat kuvassa hachure-kolmiona ja
 *      korkeuslukemana (piirto.js kohta 8e), ja niiden koordinaatit
 *      ovat TÄSMÄLLEEN samat kuin maat.mjs:n `vuoret`-listassa.
 *      Merkki asettuu kolmion päälle ja nimiö sen viereen. Jos
 *      koordinaattia siirtää täällä, se on siirrettävä myös siellä —
 *      muuten nimi irtoaa kolmiostaan.
 *
 * Saksassa EI siis ole FOKUS_LISANIMET-riviä lainkaan
 * (js/packs/fokus-grc.js). Kreikka tarvitsee sen, koska sen lehteen
 * on poltettu neljä kaupunginnimeä, joille peli laskee erikseen
 * näkymättömän osuma-alueen ja joiden kohdalla se vaientaa oman
 * nimiönsä. Saksassa kumpaakaan ei tarvita.
 *
 * ── KOORDINAATIT ──────────────────────────────────────────────────
 *
 * Sama kaava ja sama tarkistus kuin Kreikassa: asteet on muunnettu
 * laudan yksiköiksi valmiiksi (maailmankartta = Millerin lieriö,
 * europe = tasaväli) ja asteet jätetty kommenttiin. Tarkistus:
 * Berliini 13,405 E / 52,52 N → 6280,2 / 1278,9, ja laudalla laatta on
 * kohdassa 6279,2 / 1278,3 — 1,1 yksikön osumatarkkuus
 * (julisteet/fokus/DEU.json `tasaus`).
 *
 * JOKIKOHTEIDEN PISTEET ON LASKETTU AINEISTOSTA eikä arvattu. Ne ovat
 * Natural Earthin uoman pitkän pätkän varrelta siitä kohdasta, jossa
 * joki on omimmillaan saksalainen: Elbe Wendlandin mutkassa, Tonava
 * Baijerin yläjuoksulla, Oder Saksan ja Puolan rajajaksolla. Rein on
 * poikkeus, ja se on tietoinen: aineiston pisin yhtenäinen Rein-pätkä
 * kääntyy nimensä kohdalla Duisburgin alajuoksulle, jossa se osuisi
 * päällekkäin Kölnin ja Ruhrin kohteiden kanssa, joten Reinin merkki
 * on siirretty Loreleyn kalliolle Keski-Reinin laaksoon — samaan
 * uomaan, tyhjempään kohtaan.
 *
 * ── FAKTAPOHJA ────────────────────────────────────────────────────
 *
 * Jokaisen kohteen teksti nojaa `lahde`-rivin nimeämään
 * en-Wikipedian artikkeliin, joka on luettu 27.8.2026. Teksti on
 * lyhennetty ja suomennettu; faktoja ei ole lisätty eikä muutettu.
 *
 * IKÄSOPIVUUSRAJAUS (Perustuslaki): Ruhrin alueen kohde kertoo
 * 1800-luvun hiilestä, teräksestä ja rautateistä. Krupp-yhtiön
 * 1900-luvun sotahistoria ja pakkotyö on jätetty kokonaan pois — se
 * ei kuulu isoisän 1873:n matkalle eikä tämän pelin kohderyhmälle.
 *
 * ── KUVAT ─────────────────────────────────────────────────────────
 *
 * Yksi kuva kohdetta kohti, haettu Commonsin rajapinnalla
 * (tools/hae-commons.mjs) 27.8.2026. Jokaisen tiedoston olemassaolo,
 * koko, lisenssi ja tekijä on tarkistettu haun samasta vastauksesta.
 * Lisenssit ovat CC0, CC BY tai CC BY-SA, ja tekijä on kuvan
 * `lahde`-rivillä, koska CC BY vaatii maininnan.
 */

/**
 * Saksan fokuskohteet, 21 kappaletta.
 *
 * JÄRJESTYS ON MERKITSEVÄ (js/fokuskohteet.js paivitaKohdeNimiot:
 * nimiöt käydään läpi datan järjestyksessä ja ensimmäisenä listattu
 * voittaa törmäyksen). Lehden isot maastokohteet on siksi listattu
 * ensin — vuoret, sitten vedet — ja kaupunkien ja nähtävyyksien
 * tiheämpi rypäs vasta niiden jälkeen.
 */
export const FOKUSKOHTEET_DEU = [
  /* ── VUORET ─────────────────────────────────────────────────────
   * Viisi huippua, jotka ovat kuvassa hachure-kolmiona ja
   * korkeuslukemana. Koordinaatit ovat samat kuin
   * tools/fokuskartta/maat.mjs FOKUSMAAT.DEU.vuoret.
   */
  {
    id: 'zugspitze',
    nimi: 'Zugspitze',
    tyyppi: 'vuori',
    kysymykset: [
      'Miten vuorelle noustiin ennen hammasratasrataa?',
      'Mitä Saksan jäätiköille on tapahtumassa?',
    ],
    korostukset: ['jäätikkö|jäätikköä'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Saksan korkein huippu',
    // 10,9853 E / 47,4211 N — maat.mjs FOKUSMAAT.DEU.vuoret.
    laudat: {
      maailmankartta: { x: 6199.5, y: 1500.8 },
      europe: { x: 422.1, y: 646.4 },
    },
    teksti: 'Zugspitze on 2 962 metriä korkea Wettersteinin vuoriston ja '
      + 'koko Saksan korkein huippu. Se kohoaa Garmisch-Partenkirchenin '
      + 'yläpuolelle, ja sen läntisen huipun poikki kulkee Itävallan raja — '
      + 'sama vuori on siis kahden maan katolla yhtä aikaa. Rinteillä ovat '
      + 'Saksan kaksi suurinta jäätikköä, Pohjoinen Schneeferner ja '
      + 'Höllentalferner. Ensimmäisen kerran huipulle noustiin 27. elokuuta '
      + '1820: Josef Naus, hänen mittausapulaisensa Maier ja opas Johann '
      + 'Georg Tauschl. Isoisän matkan aikaan 1873 tuo nousu oli siis vain '
      + 'runsaan viidenkymmenen vuoden takainen uutinen, ja huipulle '
      + 'päästäkseen oli yhä kiivettävä omin jaloin.',
    lahde: 'en-Wikipedia "Zugspitze", johdanto-osa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Gipfel Zugspitze Sommer.jpg',
      selite: 'Zugspitzen huippu kesällä. Läntisen huipun poikki kulkee Itävallan raja.',
      lahde: 'Treeem, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'watzmann',
    nimi: 'Watzmann',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä Watzmannin huiput on nimetty?',
      'Millainen paikka Berchtesgadenin kansallispuisto on?',
    ],
    korostukset: ['Berchtesgadenin Alpit|Berchtesgadenin Alpeissa'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Vuori, joka on kokonaan Saksassa',
    // 12,9231 E / 47,5553 N — maat.mjs FOKUSMAAT.DEU.vuoret.
    laudat: {
      maailmankartta: { x: 6264.1, y: 1495.1 },
      europe: { x: 459.3, y: 642.9 },
    },
    teksti: 'Watzmann kohoaa Berchtesgadenin Alpeissa kylän eteläpuolella. '
      + 'Se on Saksan kolmanneksi korkein vuori ja niistä korkein, joka on '
      + 'kokonaan Saksan puolella rajaa — Zugspitzen huippu jakautuu '
      + 'Itävallan kanssa. Massiivin länsipuolella kulkee pohjois-'
      + 'eteläsuuntainen harjanne, jolla on kolme päähuippua: Hocheck '
      + '(2 651 m), Mittelspitze (2 713 m) ja Südspitze (2 712 m). Niiden '
      + 'vieressä ovat matalampi Watzmannfrau eli "Watzmannin vaimo" '
      + '(2 307 m) ja viisi vielä matalampaa huippua, joita kutsutaan '
      + 'Watzmannin lapsiksi. Koko massiivi kuuluu nykyään Berchtesgadenin '
      + 'kansallispuistoon.',
    lahde: 'en-Wikipedia "Watzmann", johdanto-osa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Berchtesgaden - Watzmann-Massiv von Norden.jpg',
      selite: 'Watzmannin massiivi pohjoisesta nähtynä Berchtesgadenin yläpuolella.',
      lahde: 'Franzfoto, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'feldberg',
    nimi: 'Feldberg',
    tyyppi: 'vuori',
    kysymykset: [
      'Millainen vuoristo Schwarzwald on?',
      'Miksi kunta sai nimensä vuorelta eikä toisin päin?',
    ],
    korostukset: ['Schwarzwald|Schwarzwaldin'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Korkein huippu Alppien ulkopuolella',
    // 8,0047 E / 47,8739 N — maat.mjs FOKUSMAAT.DEU.vuoret.
    laudat: {
      maailmankartta: { x: 6100.2, y: 1481.6 },
      europe: { x: 364.9, y: 634.5 },
    },
    teksti: 'Feldberg on Schwarzwaldin korkein huippu: 1 494 metriä, ja '
      + 'samalla koko Baden-Württembergin korkein kohta. Se on myös Saksan '
      + 'korkein vuori Alppien ja Baijerin ulkopuolella — pohjoisempana '
      + 'maassa ei ole mitään tämän korkuista. Vuoren juurella oleva kunta '
      + 'sai nimensä vuorelta, ei päinvastoin. Isoisän matkan aikaan '
      + 'Schwarzwald tunnettiin Euroopassa kellosepistään ja '
      + 'metsätaloudestaan; Reinin laaksosta katsottuna sen tumma kuusikko '
      + 'näyttää yhä siltä, mistä nimi "musta metsä" tulee.',
    lahde: 'en-Wikipedia "Feldberg (Black Forest)", johdanto-osa '
      + '(tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Feldberg vom Schauinsland.jpg',
      selite: 'Feldberg Schauinslandilta katsottuna — Schwarzwaldin korkein huippu.',
      lahde: 'Jörg Braukmann, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'grosser-arber',
    nimi: 'Großer Arber',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuorta kutsutaan Baijerin metsän kuninkaaksi?',
      'Mikä on paragneissi?',
    ],
    korostukset: ['Baijerin metsä|Baijerin metsän'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Baijerin metsän kuningas',
    // 13,1361 E / 49,1131 N — maat.mjs FOKUSMAAT.DEU.vuoret.
    laudat: {
      maailmankartta: { x: 6271.2, y: 1428.6 },
      europe: { x: 463.4, y: 601.9 },
    },
    teksti: 'Großer Arber — tšekiksi Velký Javor eli "suuri vaahtera" — on '
      + 'Baijerin metsän ja Böömin metsän vuorijonon korkein huippu, '
      + '1 455,5 metriä. Se on samalla Ala-Baijerin korkein kohta, ja siksi '
      + 'sitä kutsutaan Regenin ja Chamin seuduilla "Baijerin metsän '
      + 'kuninkaaksi". Huippualue on paragneissiä eli muinaisista '
      + 'sedimenteistä puristunutta liuskekiveä. Vuori seisoo Saksan ja '
      + 'Böömin vanhalla rajalla: isoisän matkan aikaan sen toisella '
      + 'puolella alkoi Itävalta-Unkari.',
    lahde: 'en-Wikipedia "Großer Arber", johdanto-osa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Großer und Kleiner Arber.jpg',
      selite: 'Großer Arber ja sen matalampi naapuri Kleiner Arber Baijerin metsässä.',
      lahde: 'Rosa-Maria Rinkl, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'brocken',
    nimi: 'Brocken',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on Brockenin haamu?',
      'Miksi Goethe sijoitti noidat juuri tälle vuorelle?',
    ],
    korostukset: ['Brockenin haamu', 'Faust|Faustissa'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Noitien vuori Harzilla',
    // 10,6156 E / 51,7994 N — maat.mjs FOKUSMAAT.DEU.vuoret.
    laudat: {
      maailmankartta: { x: 6187.2, y: 1311.0 },
      europe: { x: 415.0, y: 531.3 },
    },
    teksti: 'Brocken on 1 141 metriä korkea vuori Harzilla, Weserin ja Elben '
      + 'välissä. Se on Harzin ja koko Pohjois-Saksan korkein kohta, ja sen '
      + 'pikkuilmasto muistuttaa lähes tuhat metriä korkeampia vuoria: '
      + 'lumi viipyy syyskuusta toukokuuhun, sumu peittää huipun jopa '
      + 'kolmesataa päivää vuodessa, ja vuoden keskilämpötila on vain 2,9 '
      + 'astetta. Vuori on aina kuulunut tarinoihin noidista ja paholaisista, '
      + 'ja Johann Wolfgang von Goethe otti ne mukaan Faustiinsa. Sumuisella '
      + 'huipulla näkee myös Brockenin haamun: kiipeäjän oma varjo lankeaa '
      + 'sumuun ja kasvaa jättiläiseksi.',
    lahde: 'en-Wikipedia "Brocken", johdanto-osa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Nationalpark Harz - Brocken-Gipfel.JPG',
      selite: 'Brockenin huippu Harzin kansallispuistossa. Sumu peittää vuoren jopa '
        + 'kolmesataa päivää vuodessa.',
      lahde: 'Ragnar1904, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },

  /* ── MERET JA JÄRVI ─────────────────────────────────────────────
   * Merten pisteet ovat maat.mjs FOKUSMAAT.DEU.meret -listan pisteitä
   * eli sitä kohtaa ulapasta, johon lehti nimen latoisi, jos
   * nimipoltto olisi päällä. KESKIPISTEITÄ, EI TÄSMÄPAIKKOJA.
   */
  {
    id: 'pohjanmeri',
    nimi: 'Pohjanmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä Hansaliitto oli?',
      'Miten vuorovesi muokkaa Saksan rannikkoa?',
    ],
    korostukset: ['mannerjalusta|mannerjalustalla'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Meri, jolla purjehdittiin maailmalle',
    // 6,4 E / 54,4 N — maat.mjs FOKUSMAAT.DEU.meret.
    laudat: {
      maailmankartta: { x: 6046.7, y: 1193.5 },
      europe: { x: 334.1, y: 462.9 },
    },
    teksti: 'Pohjanmeri on Ison-Britannian, Tanskan, Norjan, Saksan, '
      + 'Alankomaiden, Belgian ja Ranskan välissä: yli 970 kilometriä pitkä '
      + 'ja 580 leveä, kaikkiaan 570 000 neliökilometriä. Se on matala meri '
      + 'Euroopan mannerjalustalla ja yhdistyy Atlanttiin etelässä '
      + 'Englannin kanaalin ja pohjoisessa Norjanmeren kautta. Täällä '
      + 'kulkevat Pohjois-Euroopan tärkeimmät laivaväylät, ja täältä '
      + 'kalastetaan. Meri oli viikinkien nousun näyttämö, ja myöhemmin '
      + 'siitä kilpailivat Hansaliitto, Alankomaiden tasavalta ja Britannia '
      + '— se, joka hallitsi Pohjanmerta, pääsi maailman markkinoille.',
    lahde: 'en-Wikipedia "North Sea", johdanto-osa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: '13-09-29-nordfriesisches-wattenmeer-RalfR-03.jpg',
      selite: 'Pohjanmeren vuorovesitasankoa Pohjois-Friisinmaalla Saksan rannikolla.',
      lahde: 'Ralf Roletschek, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'itameri',
    nimi: 'Itämeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Itämeren vesi on murtovettä?',
      'Mitä Tanskan salmet ovat?',
    ],
    korostukset: ['murtovesi|murtovesiallas'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Maailman suurin murtovesiallas',
    // 12,6 E / 54,9 N — maat.mjs FOKUSMAAT.DEU.meret.
    laudat: {
      maailmankartta: { x: 6253.3, y: 1170.4 },
      europe: { x: 453.1, y: 449.7 },
    },
    teksti: 'Itämeri on Atlantin haara, jota ympäröivät Tanska, Viro, Suomi, '
      + 'Saksa, Latvia, Liettua, Puola, Venäjä ja Ruotsi. Se on maailman '
      + 'suurin murtovesiallas: vettä vaihtuu Atlantin kanssa vain vähän, '
      + 'koska ainoa tie ulos kulkee Tanskan salmien — Juutinrauman sekä '
      + 'Ison- ja Vähänbeltin — kautta Kattegatiin. Meri ulottuu '
      + 'leveyspiiriltä 53 pohjoista leveyspiirille 66 ja pituuspiiriltä 10 '
      + 'pituuspiirille 30, ja siihen kuuluvat Pohjanlahti, Suomenlahti, '
      + 'Riianlahti ja Gdańskinlahti. Saksan rannikolla sitä reunustavat '
      + 'Rügenin liitukalliot.',
    lahde: 'en-Wikipedia "Baltic Sea", johdanto-osa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Kreidefelsen an der Ostsee.jpg',
      selite: 'Rügenin liitukalliot Itämeren rannalla Saksan pohjoisrannikolla.',
      lahde: 'EmeraldAnette, Wikimedia Commons (CC0)',
    },
  },
  {
    id: 'bodensee',
    nimi: 'Bodenjärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi järven valtionrajoista ei ole sovittu?',
      'Miten Rein kulkee järven läpi?',
    ],
    korostukset: ['Seerhein'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Järvi, jota kolme maata ei ole jakanut',
    /*
     * 9,35 E / 47,6 N — järven likimääräinen keskipiste Obersee-altaan
     * puolivälissä. Kohde on tyypiltään `meri`, koska pelin
     * symbolitaksonomiassa vuoret, meret, saaret ja joet ovat yhtä
     * luontokategoriaa eikä järvelle ole omaa tyyppiä.
     */
    laudat: {
      maailmankartta: { x: 6145.0, y: 1493.2 },
      europe: { x: 390.7, y: 641.7 },
    },
    teksti: 'Bodenjärvi eli Bodensee on oikeastaan kolme vesistöä Reinin '
      + 'varrella Alppien pohjoisjuurella: iso Obersee, pieni Untersee ja '
      + 'niitä yhdistävä joenpätkä Seerhein. Järvi on siinä kohdassa, jossa '
      + 'Saksa, Sveitsi ja Itävalta kohtaavat. Alppien Rein laskee siihen '
      + 'etelästä ja Ylä-Rein lähtee siitä länteen. Erikoisinta on, ettei '
      + 'valtionrajojen kulusta järven päällä ole sovittu lainkaan: '
      + 'Itävallalla, Saksalla ja Sveitsillä on kullakin oma näkemyksensä '
      + 'siitä, mihin raja piirretään.',
    lahde: 'en-Wikipedia "Lake Constance", johdanto-osa (tarkistettu '
      + '27.8.2026).',
    kuva: {
      tiedosto: 'Bodensee seen from Konstanz 2024-02-23 01.jpg',
      selite: 'Bodenjärven Obersee-allas Konstanzin rannalta katsottuna.',
      lahde: 'Leonhard Lenz, Wikimedia Commons (CC0)',
    },
  },

  /* ── JOET ───────────────────────────────────────────────────────
   * Pisteet on laskettu Natural Earthin uomista (ks. tiedoston alku).
   */
  {
    id: 'rein',
    nimi: 'Rein',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Loreleyn tarina on?',
      'Miksi Reinin varrella on niin paljon linnoja?',
    ],
    korostukset: ['Bodenjärvi|Bodenjärvestä'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Euroopan vilkkain vesitie',
    /*
     * 7,7275 E / 50,1394 N — Loreleyn kallio Keski-Reinin laaksossa.
     * Ks. tiedoston alku: aineiston oma nimipiste osuisi Duisburgin
     * alajuoksulle Kölnin ja Ruhrin kohteiden päälle.
     */
    laudat: {
      maailmankartta: { x: 6090.9, y: 1384.1 },
      europe: { x: 359.6, y: 574.9 },
    },
    teksti: 'Rein alkaa Sveitsin Graubündenistä ja on noin 1 230 kilometriä '
      + 'pitkä — Tonavan jälkeen Keski- ja Länsi-Euroopan pisin joki. Se '
      + 'kulkee Bodenjärvestä länteen, muodostaa pitkän matkaa Sveitsin ja '
      + 'Saksan sekä Ranskan ja Saksan rajan, kääntyy sitten pohjoiseen '
      + 'Saksan Rheinlandin halki ja laskee Alankomaiden kautta '
      + 'Pohjanmereen. Sen valuma-alue on 185 000 neliökilometriä ja '
      + 'keskivirtaama noin 2 900 kuutiometriä sekunnissa. Joessa on myös '
      + 'Euroopan voimakkain vesiputous, Reinin putous.',
    lahde: 'en-Wikipedia "Rhine", johdanto-osa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Loreley am Rhein.JPG',
      selite: 'Loreleyn kallio Keski-Reinin laaksossa, siinä kohdassa jossa uoma '
        + 'kapenee ja kääntyy jyrkästi.',
      lahde: 'Guido Radig, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'elbe',
    nimi: 'Elbe',
    tyyppi: 'joki',
    kysymykset: [
      'Mistä Elbe saa vetensä?',
      'Miksi Hampuri rakennettiin niin kauas merestä?',
    ],
    korostukset: ['Vltava|Vltavan'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Joki, joka tulee Böömistä',
    // 11,75 E / 53,05 N — Elben uoma Wendlandin mutkassa Dömitzin luona.
    laudat: {
      maailmankartta: { x: 6225.0, y: 1255.0 },
      europe: { x: 436.8, y: 498.4 },
    },
    teksti: 'Elbe — tšekiksi Labe — on yksi Keski-Euroopan suurista joista. '
      + 'Se saa alkunsa Tšekin pohjoisosan Jättiläisvuorilta, kulkee Böömin '
      + 'halki ja jatkaa Saksaan, jossa se laskee Pohjanmereen Cuxhavenin '
      + 'kohdalla 110 kilometriä Hampurista luoteeseen. Pituutta on 1 094 '
      + 'kilometriä. Suurimmat sivujoet ovat Vltava, Ohře, Saale, Havel, '
      + 'Mulde ja Schwarze Elster, ja valuma-alue on 148 268 '
      + 'neliökilometriä — Euroopan kahdenneksitoista suurin. Sen varrella '
      + 'asuu 24,4 miljoonaa ihmistä, ja sen suurimmat kaupungit ovat '
      + 'Berliini, Hampuri, Praha, Dresden ja Leipzig.',
    lahde: 'en-Wikipedia "Elbe", johdanto-osa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Cuxhaven, Strand, Blick auf die Elbmündung -- 2024 -- 5997.jpg',
      selite: 'Elben suu Cuxhavenin rannalta katsottuna — tästä joki laskee '
        + 'Pohjanmereen.',
      lahde: 'Dietmar Rabich, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'tonava',
    nimi: 'Tonava',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Tonava oli Rooman valtakunnan raja?',
      'Mistä Tonavan nimi alkaa?',
    ],
    korostukset: ['Donaueschingen|Donaueschingenissä'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Euroopan toiseksi pisin joki',
    // 10,2344 E / 48,4698 N — Tonavan yläjuoksu Baijerissa, aineiston
    // Donau-uoman pisimmän pätkän kohta 55 % (piirto.js kohta 8d).
    laudat: {
      maailmankartta: { x: 6174.5, y: 1456.2 },
      europe: { x: 407.7, y: 618.8 },
    },
    teksti: 'Tonava on Volgan jälkeen Euroopan pisin joki. Se alkaa Saksan '
      + 'Schwarzwaldista ja virtaa 2 850 kilometriä kaakkoon Mustallemerelle '
      + 'Romanian suistoon asti, matkan varrella Itävallan, Slovakian, '
      + 'Unkarin, Kroatian, Serbian, Romanian, Bulgarian, Moldovan ja '
      + 'Ukrainan kautta. Sen rannalla on neljä pääkaupunkia: Wien, '
      + 'Bratislava, Budapest ja Belgrad. Aikoinaan se oli Rooman '
      + 'valtakunnan raja. Pisin latvahaara Breg alkaa Furtwangenista, '
      + 'mutta Tonavan nimen joki saa vasta Donaueschingenissä, linnanpuiston '
      + 'lähteiden yhtymäkohdasta.',
    lahde: 'en-Wikipedia "Danube", johdanto-osa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Der Donaudurchbruch zwischen Weltenburg und Kelheim (11126675003).jpg',
      selite: 'Tonavan läpimurtolaakso Weltenburgin ja Kelheimin välissä Baijerissa.',
      lahde: 'Heribert Pohl, Wikimedia Commons (CC BY-SA 2.0)',
    },
  },
  {
    id: 'oder',
    nimi: 'Oder',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Oder–Neisse-linja on?',
      'Mihin Oder lopulta laskee?',
    ],
    korostukset: ['Szczecinin laguuni|Szczecinin laguuniin'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Joki, joka on nykyään raja',
    // 14,55 E / 52,35 N — Oderin uoma Saksan ja Puolan rajajaksolla
    // Frankfurt an der Oderin kohdalla.
    laudat: {
      maailmankartta: { x: 6318.3, y: 1286.5 },
      europe: { x: 490.6, y: 516.8 },
    },
    teksti: 'Oder — tšekiksi ja puolaksi Odra — alkaa Tšekistä ja virtaa 742 '
      + 'kilometriä Länsi-Puolan halki. Matkasta 187 kilometriä on Puolan ja '
      + 'Saksan rajaa, osa niin sanottua Oder–Neisse-linjaa. Se on Puolan '
      + 'toiseksi pisin joki. Lopulta se laskee Szczecinin laguuniin ja '
      + 'jakautuu kolmeen haaraan — Dziwna, Świna ja Peene — jotka vievät '
      + 'veden Itämeren Pommerinlahteen. Isoisän matkan aikaan koko joki '
      + 'virtasi Preussin sisällä; nykyinen raja piirrettiin vasta toisen '
      + 'maailmansodan jälkeen.',
    lahde: 'en-Wikipedia "Oder", johdanto-osa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: '01 Luftbild Frankfurt oder Slubice 09072011.jpg',
      selite: 'Oder Frankfurt an der Oderin ja puolalaisen Słubicen välissä. Joki on '
        + 'tässä kohtaa valtakunnanraja.',
      lahde: 'Willi Wallroth, Wikimedia Commons (CC0)',
    },
  },
  {
    id: 'weser',
    nimi: 'Weser',
    tyyppi: 'joki',
    kysymykset: [
      'Missä Weser saa nimensä?',
      'Miksi Bremerhaven perustettiin?',
    ],
    korostukset: ['Werra|Werran'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Saksan oma pisin joki',
    // 9,402 E / 51,8162 N — Weserin uoman pisimmän pätkän kohta 55 %
    // (piirto.js kohta 8d), Ylä-Weser Holzmindenin seudulla.
    laudat: {
      maailmankartta: { x: 6146.7, y: 1310.3 },
      europe: { x: 391.7, y: 530.8 },
    },
    teksti: 'Weser on pisin kokonaan Saksassa virtaava joki. Se saa alkunsa '
      + 'Hannoversch Mündenissä, jossa Werra ja Fulda yhtyvät, ja virtaa '
      + 'Thüringenin metsästä Pohjanmerelle Bremerhavenin luona. Matkalla se '
      + 'kulkee hansakaupunki Bremenin läpi, ja suu on siitä vielä '
      + 'viisikymmentä kilometriä pohjoiseen. Weser itse on 452 kilometriä '
      + 'pitkä, mutta Werran kanssa laskettuna 744 — ja juuri siksi sitä '
      + 'sanotaan Saksan pisimmäksi omaksi joeksi. Joki liittyy myös '
      + 'Pohjois-Saksan tasangon poikki kulkevaan kanavaverkkoon.',
    lahde: 'en-Wikipedia "Weser", johdanto-osa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Weser bei Reinhardshagen.jpg',
      selite: 'Weser Reinhardshagenin kohdalla yläjuoksullaan Weserbergland-maastossa.',
      lahde: 'Weserfluss, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },

  /* ── KAUPUNGIT JA NÄHTÄVYYDET ───────────────────────────────────
   * Lehti ei paina yhdenkään kaupungin nimeä, joten nimi tulee näiden
   * kohteiden omista nimiöistä (js/fokuskohteet.js kohteenNimio).
   * Berliini on pelilaatta eikä siis oma kaupunkikohteensa; kaupunki
   * on kartalla Brandenburgin portin kautta.
   */
  {
    id: 'brandenburgin-portti',
    nimi: 'Brandenburgin portti',
    // Kartalla lyhyt asu - koko nimi katkeaisi nimiossa (fokusnimet-vartio).
    nimio: 'Brandenburg',
    tyyppi: 'historia',
    symboli: 'historia',
    kysymykset: [
      'Mikä kvadriga on?',
      'Millainen kaupunki Berliini oli 1873?',
    ],
    korostukset: ['kvadriga', 'Unter den Linden'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Portti, josta tie vei Brandenburgiin',
    // 13,3777 E / 52,5163 N — en-Wikipedia "Brandenburg Gate".
    laudat: {
      maailmankartta: { x: 6279.3, y: 1279.0 },
      europe: { x: 468.1, y: 512.4 },
    },
    teksti: 'Brandenburgin portti on 1700-luvun klassistinen monumentti '
      + 'Berliinin keskustassa. Se pystytettiin vanhan kaupunginportin '
      + 'paikalle — siitä alkoi tie Brandenburg an der Haveliin, '
      + 'Brandenburgin markkreivikunnan entiseen pääkaupunkiin. Nykyinen '
      + 'rakennus valmistui 1788–1791 Preussin kuninkaan Fredrik Vilhelm '
      + 'II:n käskystä, ja sen piirsi hovin arkkitehti Carl Gotthard '
      + 'Langhans. Katolla ajaa pronssinen kvadriga eli nelivaljakko, '
      + 'kuvanveistäjä Johann Gottfried Schadowin työ. Portista alkaa '
      + 'Unter den Linden, bulevardi, joka vie suoraan vanhalle '
      + 'kaupunginlinnalle.',
    lahde: 'en-Wikipedia "Brandenburg Gate", johdanto-osa (tarkistettu '
      + '27.8.2026).',
    kuva: {
      tiedosto: 'Berlin, Brandenburger Tor -- 2013 -- 4589.jpg',
      selite: 'Brandenburgin portti ja sen katolla ajava kvadriga Berliinin '
        + 'keskustassa.',
      lahde: 'Dietmar Rabich, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'sanssouci',
    nimi: 'Sanssouci',
    tyyppi: 'kulttuuri',
    symboli: 'kulttuuri',
    kysymykset: [
      'Millainen hallitsija Fredrik Suuri oli?',
      'Mitä rokokoo tarkoittaa rakennuksessa?',
    ],
    korostukset: ['rokokoo|rokokootyylinen'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Linna nimeltä "ilman huolia"',
    // 13,0387 E / 52,4004 N — en-Wikipedia "Sanssouci".
    laudat: {
      maailmankartta: { x: 6268.0, y: 1284.2 },
      europe: { x: 461.5, y: 515.5 },
    },
    teksti: 'Sanssouci on Preussin kuninkaan Fredrik Suuren kesälinna '
      + 'Potsdamissa Berliinin kupeessa. Sitä on tapana verrata '
      + 'Versaillesiin, mutta se on paljon pienempi ja rokokootyylisenä '
      + 'myös arkisempi: yksikerroksinen huvila, jossa on kymmenen '
      + 'päähuonetta, terassirinteen harjalla keskellä puistoa. Georg '
      + 'Wenzeslaus von Knobelsdorff suunnitteli ja rakensi sen '
      + '1745–1747, ja kuningas halusi siitä yksityisasunnon, johon paeta '
      + 'hovin juhlamenoja. Nimi on ranskaa: sans souci, "ilman huolia". '
      + 'Kuninkaan oma maku näkyy talossa niin vahvasti, että tyyliä '
      + 'sanotaan fredrikiläiseksi rokokooksi.',
    lahde: 'en-Wikipedia "Sanssouci", johdanto-osa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Schloss Sanssouci Potsdam - Weinbergterrasse 01.jpg',
      selite: 'Sanssoucin linna ja sen edessä laskeutuvat viinitarhaterassit '
        + 'Potsdamissa.',
      lahde: 'H. Zell, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'hampuri',
    nimi: 'Hampuri',
    tyyppi: 'kaupunki',
    symboli: 'merenkulku',
    kysymykset: [
      'Mikä Hansaliitto oli ja miksi se päättyi?',
      'Miksi Hampuri oli oma valtionsa?',
    ],
    korostukset: ['Hansaliitto|Hansaliiton', 'Elbe|Elben'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Vapaa hansakaupunki',
    // 9,9937 E / 53,5511 N — en-Wikipedia "Hamburg".
    laudat: {
      maailmankartta: { x: 6166.5, y: 1232.3 },
      europe: { x: 403.1, y: 485.2 },
    },
    teksti: 'Hampurin virallinen nimi on yhä Vapaa hansakaupunki Hampuri, ja '
      + 'nimi kertoo koko tarinan: se kuului keskiajan Hansaliittoon ja oli '
      + 'Pyhän saksalais-roomalaisen keisarikunnan vapaa kaupunki. Ennen '
      + 'Saksan yhdistymistä 1871 se oli täysin itsenäinen kaupunkivaltio, '
      + 'ja vasta 1919 asti sitä johti perinnöllinen suurporvarisääty. '
      + 'Kaupunki on Jyllannin niemen tyvellä siinä, missä 110 kilometriä '
      + 'pitkä Elben suisto alkaa. Hampurin satama on Saksan suurin ja '
      + 'Euroopan kolmanneksi suurin. Isoisän matkan aikaan kaupungissa oli '
      + 'yhä tuoreena vuoden 1842 suurpalon muisto.',
    lahde: 'en-Wikipedia "Hamburg", johdanto-osa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Hamburg, Speicherstadt, Wasserschloss -- 2016 -- 2956.jpg',
      selite: 'Speicherstadtin varastokortteleita Hampurin satamassa. Tiilivarastot '
        + 'nousivat kanavien varsille pian isoisän matkan jälkeen.',
      lahde: 'Dietmar Rabich, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'kolnin-tuomiokirkko',
    nimi: 'Kölnin tuomiokirkko',
    // Kartalla lyhyt asu - koko nimi katkeaisi nimiossa (fokusnimet-vartio).
    nimio: 'Tuomiokirkko',
    tyyppi: 'historia',
    symboli: 'historia',
    kysymykset: [
      'Miksi rakennustyö keskeytyi kolmeksisadaksi vuodeksi?',
      'Keitä olivat kolme kuningasta, joiden reliikkejä kirkko säilyttää?',
    ],
    korostukset: ['gotiikka|gotiikan', 'reliikki|reliikkiä'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Kirkko, jota rakennettiin 632 vuotta',
    // 6,9583 E / 50,9413 N — en-Wikipedia "Cologne Cathedral".
    laudat: {
      maailmankartta: { x: 6065.3, y: 1349.0 },
      europe: { x: 344.8, y: 553.8 },
    },
    teksti: 'Kölner Dom on Kölnin arkkipiispan istuin ja saksalaisen '
      + 'gotiikan tunnetuin rakennus. Sen kaksi tornia kohoavat 157 metriin: '
      + 'se on maailman korkein kaksitorninen kirkko ja Euroopan kolmanneksi '
      + 'korkein kirkko. Rakentaminen alkoi 1248 ja pysähtyi 1560-luvun '
      + 'tienoilla — keskeneräinen kirkko seisoi nostokurki tornissaan '
      + 'kolmisensataa vuotta. Työ käynnistyi uudestaan 1814 ja sai kunnon '
      + 'rahoituksen vasta 1840-luvulla; valmiiksi alkuperäisen keskiaikaisen '
      + 'suunnitelman mukaan se tuli 1880. Isoisä olisi siis 1873 nähnyt '
      + 'kirkon vielä telineissä. Keskiajan rakentajat suunnittelivat sen '
      + 'säilyttämään kolmen kuninkaan reliikkiä.',
    lahde: 'en-Wikipedia "Cologne Cathedral", johdanto-osa (tarkistettu '
      + '27.8.2026).',
    kuva: {
      tiedosto: 'Kölner Dom von Osten.jpg',
      selite: 'Kölnin tuomiokirkko idästä nähtynä. Kirkko valmistui 1880, seitsemän '
        + 'vuotta isoisän matkan jälkeen.',
      lahde: 'Thomas Wolf, www.foto-tw.de, Wikimedia Commons (CC BY-SA 3.0 de)',
    },
  },
  {
    id: 'munchen',
    nimi: 'München',
    tyyppi: 'kaupunki',
    symboli: 'kaupunki',
    kysymykset: [
      'Keitä Wittelsbachit olivat?',
      'Miksi München pysyi katolisena uskonpuhdistuksessa?',
    ],
    korostukset: ['Wittelsbach|Wittelsbachin suku', 'Isar|Isarin'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Baijerin kuningaskunnan pääkaupunki',
    // 11,5755 E / 48,1372 N — en-Wikipedia "Munich".
    laudat: {
      maailmankartta: { x: 6219.2, y: 1470.4 },
      europe: { x: 433.4, y: 627.6 },
    },
    teksti: 'München on Baijerin pääkaupunki ja Berliinin ja Hampurin '
      + 'jälkeen Saksan kolmanneksi suurin kaupunki. Se on Isar-joen '
      + 'varrella Alppien pohjoispuolella. Ensimmäinen maininta kaupungista '
      + 'on vuodelta 1158. Uskonpuhdistuksen aikana se pysyi katolisena '
      + 'tukikohtana, ja vuonna 1806 siitä tuli Baijerin kuningaskunnan '
      + 'pääkaupunki — juuri sitä se oli isoisän matkan aikaan 1873, sillä '
      + 'Baijeri säilyi kuningaskuntana Saksan keisarikunnan sisällä. '
      + 'Wittelsbachin suku hallitsi kaupunkia, ja sen kaudella Münchenistä '
      + 'kasvoi taiteen, arkkitehtuurin ja tieteen keskus.',
    lahde: 'en-Wikipedia "Munich", johdanto-osa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Marienplatz mit Rathaus München (Panorama) mit Frauenkirche (2019).jpg',
      selite: 'Marienplatz, uusi raatihuone ja Frauenkirchen tornit Münchenin '
        + 'keskustassa.',
      lahde: 'Guido Radig, Wikimedia Commons (CC BY 4.0)',
    },
  },
  {
    id: 'dresden',
    nimi: 'Dresden',
    tyyppi: 'kaupunki',
    symboli: 'kulttuuri',
    kysymykset: [
      'Miksi Dresdeniä sanotaan Elben Firenzeksi?',
      'Millaista maastoa Elben laakso Dresdenin kohdalla on?',
    ],
    korostukset: ['Elbe|Elben', 'Lusatia|Lusatiaan'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Saksin pääkaupunki Elben varrella',
    // 13,7373 E / 51,0504 N — en-Wikipedia "Dresden".
    laudat: {
      maailmankartta: { x: 6291.2, y: 1344.2 },
      europe: { x: 475.0, y: 551.0 },
    },
    teksti: 'Dresden on Saksin osavaltion pääkaupunki ja Leipzigin jälkeen '
      + 'sen toiseksi suurin kaupunki. Hampurin jälkeen se on Elben toiseksi '
      + 'suurin kaupunki, ja suurin osa asukkaista asuu jokilaaksossa. Elben '
      + 'itäpuolella kaupunkia jatkuu Länsi-Lusatian kukkulamaastoon eli '
      + 'Sudeettien läntisimpään osaan; länsipuolella ollaan jo '
      + 'Malmivuorten esimaastossa, ja siellä syntyvät Weißeritzin ja '
      + 'Lockwitzbachin purolaaksot. Kaupungin nimi ja useimmat sen '
      + 'kaupunginosien nimet ovat alkuaan slaavilaisia.',
    lahde: 'en-Wikipedia "Dresden", johdanto-osa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Dresden Elbe Frauenkirche.jpg',
      selite: 'Dresdenin vanha kaupunki Elben rannalla, keskellä Frauenkirchen kupoli.',
      lahde: 'Immanuel Giel, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'wartburg',
    nimi: 'Wartburg',
    tyyppi: 'historia',
    symboli: 'sana',
    kysymykset: [
      'Miksi Luther piileskeli linnassa?',
      'Mikä Wartburgin juhla 1817 oli?',
    ],
    korostukset: ['Uusi testamentti|Uuden testamentin'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Linna, jossa Raamattu käännettiin saksaksi',
    // 10,3067 E / 50,9663 N — en-Wikipedia "Wartburg".
    laudat: {
      maailmankartta: { x: 6176.9, y: 1347.9 },
      europe: { x: 409.1, y: 553.2 },
    },
    teksti: 'Wartburg on keskiaikainen linna 410 metrin korkeudella '
      + 'Thüringenissä, jyrkänteen päällä Eisenachin kaupungin yläpuolella. '
      + 'Se oli Unkarin pyhän Elisabetin koti, ja siellä Martti Luther '
      + 'käänsi Uuden testamentin saksaksi. Samassa linnassa pidettiin '
      + 'vuoden 1817 Wartburgin juhla, ja sinne sijoittuu myös legendaarinen '
      + 'laulajien kilpailu Sängerkrieg. Linnassa on yhä paljon '
      + 'alkuperäistä 1100–1400-lukujen rakennetta, vaikka sisätilat ovat '
      + 'suureksi osaksi 1800-luvulta — juuri sen restauroinnin aikaan '
      + 'isoisä olisi kulkenut ohi. Wartburg innoitti myös Ludwig II:ta, kun '
      + 'hän ryhtyi rakentamaan Neuschwansteinia.',
    lahde: 'en-Wikipedia "Wartburg", johdanto-osa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Eisenach Germany Wartburg-Castle-01.jpg',
      selite: 'Wartburgin linna jyrkänteellään Eisenachin yläpuolella Thüringenissä.',
      lahde: 'CEphoto, Uwe Aranas, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'ruhrin-alue',
    nimi: 'Ruhrin alue',
    tyyppi: 'tekniikka',
    symboli: 'tekniikka',
    kysymykset: [
      'Mistä Ruhrin alueen hiili tuli?',
      'Mikä Hellweg oli?',
    ],
    korostukset: ['Hellweg', 'monikeskuksinen|monikeskuksinen kaupunkialue'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Hiilen ja teräksen maa',
    /*
     * 7,0116 E / 51,4556 N — Essen, alueen keskuskaupunki
     * (en-Wikipedia "Essen"). Merkki on koko Ruhrgebietin merkki, ei
     * yhden kaupungin: alue on monikeskuksinen eikä sillä ole
     * keskipistettä, jonka aineisto antaisi.
     */
    laudat: {
      maailmankartta: { x: 6067.1, y: 1326.3 },
      europe: { x: 345.8, y: 540.3 },
    },
    teksti: 'Ruhrgebiet on monikeskuksinen kaupunkialue Nordrhein-'
      + 'Westfalenissa: yli viisi miljoonaa asukasta ja tiheydeltään Saksan '
      + 'suurin kaupunkialue. Sitä rajaavat etelässä Ruhr, lännessä Rein ja '
      + 'pohjoisessa Lippe. Kaupungit seuraavat toisiaan lännestä itään — '
      + 'Duisburg, Oberhausen, Bottrop, Mülheim, Essen, Gelsenkirchen, '
      + 'Bochum, Herne, Witten, Hagen, Dortmund ja Hamm — eikä niiden '
      + 'väliin jää juuri maaseutua. Keskiajalla samaa linjaa kulki '
      + 'kauppatie Hellweg Ala-Reiniltä Teutoburgin metsän kukkuloille. '
      + 'Isoisän matkan aikaan alue oli juuri muuttumassa: hiilikaivokset '
      + 'ja terässulatot vetivät sinne väkeä koko Preussista.',
    lahde: 'en-Wikipedia "Ruhr", johdanto-osa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: '20180114 Zeche Zollverein, Essen (01980).jpg',
      selite: 'Zollvereinin entisen hiilikaivoksen rakennuksia Essenissä Ruhrin '
        + 'alueella.',
      lahde: 'Günter Seggebäing, Coesfeld, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
];

/**
 * Kohteet tunnuslistan mukaan, listan omassa järjestyksessä.
 *
 * Sama apuri ja sama kaava kuin Kreikalla (js/packs/fokuskohteet-grc.js
 * fokuskohteet): kaupungin fokusvirta poimii kohteita `kohteet`-rivillä
 * eikä sen tarvitse tuntea listan sisäistä järjestystä. Nimi on
 * prefiksoitu maalla, koska yhden tiedoston versio ketjuttaa kaikki
 * moduulit samaan näkyvyysalueeseen (tools/tarkista-niputus.mjs).
 */
export function fokuskohteetDeu(tunnukset) {
  if (!Array.isArray(tunnukset)) return [];
  return tunnukset
    .map((t) => FOKUSKOHTEET_DEU.find((k) => k.id === t))
    .filter(Boolean);
}
