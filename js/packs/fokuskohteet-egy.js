/*
 * FOKUSKOHTEET — EGYPTI. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-grc.js:lle. Kentät ja niiden
 * perustelut on selitetty Kreikan tiedoston alussa (kaksi pintaa yksi
 * lista, `kysymykset` ja `korostukset` pöllöä varten, `nappi`
 * valintakuplan lupauksena); tässä on vain se, mikä Egyptissä on
 * toisin.
 *
 * ── MIKSI TÄMÄ TIEDOSTO ON OLEMASSA (omistajan tilaus 26.8.2026) ───
 *
 * *"Peliin voisi generoida kaikki antiikin kadonneet ihmeet sekä jos
 * on muita vastaavia kadonneita, niin generoidaan ne kaikki."* Kaksi
 * seitsemästä ihmeestä ja antiikin kuuluisin kirjasto ovat samassa
 * kaupungissa, Aleksandriassa, eikä Egyptillä ollut vielä yhtään
 * kohdetta. Maan fokuslehti on jo olemassa (js/packs/fokus-grc.js
 * FOKUS_POHJAT.EGY, tiedosto EGY.webp), joten merkeillä on lehti,
 * jonka päälle asettua — se oli tämän tiedoston ainoa tekninen ehto.
 *
 * ── KOORDINAATIT: VAIN MAAILMANKARTTA ──────────────────────────────
 *
 * Egyptin lehti on maailmankartan lauta (FOKUS_POHJAT.EGY: lauta
 * 'maailmankartta'), eikä Euroopan laudalla ole Egyptiä. Rivillä on
 * siis vain `maailmankartta`, ja se on tietoinen valinta samasta
 * syystä kuin Turkin kahdella itäisimmällä kohteella: lauta, jota
 * rivillä ei ole, ei saa kohdetta kartalle lainkaan — ja se on
 * parempi kuin väärään paikkaan piirretty merkki.
 *
 * Kaava on maailmankartan oma Millerin lieriö (LEVEYS 12000 /
 * LON0 −175 / POHJOINEN 76, tools/tee-fokuskartta.mjs
 * laudanProjektio), sama kuin Kreikan tiedostossa. Kaava validoitiin
 * ennen käyttöä kolmella jo kirjatulla kohteella (Ateena, Efesos ja
 * Olympia: lasketut luvut vastasivat kirjattuja 0,1 yksikön
 * tarkkuudella), ja molemmat tämän tiedoston pisteet osuvat EGY-lehden
 * rajaukseen (x 6583–7137, y 2056–2527).
 *
 * ── MAAILMAN ERÄ (27.8.2026) LISÄSI KAKSI KOHDETTA, JOTKA OVAT
 *    OLEMASSA ─────────────────────────────────────────────────────
 *
 * Aleksandrian kaksi kadonnutta saivat perässään Kheopsin pyramidin ja
 * Karnakin suuren pylvässalin. Ne ovat molemmat pystyssä, joten niiden
 * esitystapa on toinen: `kadonnut: false`, kartalla kohteen oma merkki
 * ja kortin pääkuvana Commons-valokuva nykytilasta — ihmekuva aukeaa
 * vasta sen alta "Koe ihme" -napista. Kummallakin on siis `kuva`-kenttä,
 * toisin kuin listan kahdella ensimmäisellä.
 *
 * KUMPIKAAN EI OLE PELILAATTA. Kairo ja Luxor ovat laattoja; pyramidi
 * ja pylvässali ovat nimettyjä paikkoja niiden sisällä, sama sääntö ja
 * sama ratkaisu kuin Forum Romanumilla Roomassa (js/packs/
 * fokuskohteet-ita.js). Karnakin merkki osuu Luxorin laatan viereen
 * alle yhden yksikön päähän, joten niputuspassi (js/fokusniput.js)
 * kasaa sen kaupungin sarakkeeseen katkoviivoineen.
 *
 * ── KAHDEN ENSIMMÄISEN KUVAT OVAT PELIN OMIA HAVAINNEKUVIA ─────────
 *
 * Kummastakaan Aleksandrian kohteesta ei ole valokuvaa, koska kohdetta ei ole:
 * majakka romahti maanjäristyksissä ja kirjaston paikkaakaan ei
 * tunneta. Kummallakin on siksi VAIN `ihme`-kenttä eikä lainkaan
 * `kuva`-kenttää (omistajan tilaus 27.8.2026 ilta: erän ensimmäiset,
 * piirrosmaiset rekonstruktiot poistettiin, koska fotorealistinen
 * ihmekuva korvaa ne). Kuvakenttä on `osoite` eikä `tiedosto` — polku
 * repoon (assets/kartat/ihmeet/), ei Commonsiin — ja kuvat syntyvät
 * .github/workflows/generoi-ihmeet.yml -ajossa. Rehellisyyden säännöt
 * ovat Kreikan tiedoston lohkossa "MATKAKIRJAN IHME": selite kertoo
 * KOHTEESTA, lähderivi merkitsee kuvan havainnekuvaksi ja peli piirtää
 * kuvan kulmaan nauhan "Matkakirjan ihme".
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * en-Wikipedia raakatekstinä (index.php?action=raw) artikkeli
 * kerrallaan 26.8.2026 ja maailman erän kohteille 27.8.2026 ("Great
 * Pyramid of Giza", "Karnak", "Great Hypostyle Hall") — ei
 * työaineistoa, joten lähderivit osoittavat suoraan artikkeleihin.
 *
 * PYLVÄIDEN KORKEUS ON KIRJOITETTU AUKI VÄLINÄ. Artikkeli "Karnak"
 * antaa salin keskirivien pylväille 21 metriä ja artikkeli "Great
 * Hypostyle Hall" 24 metriä. Kumpikaan ei ole väärä lähde, joten
 * teksti kertoo lukujen eron sen sijaan että valitsisi toisen
 * — sama käytäntö kuin Britannian tiedostossa vanhan St Paulin
 * torninhuipun kanssa.
 */
export const FOKUSKOHTEET_EGY = [
  {
    /*
     * FAROKSEN MAJAKKA. 29,886 E / 31,2148 N — en-Wikipedia
     * "Lighthouse of Alexandria" (tietolaatikon coordinates). Piste on
     * Faroksen saaren kärki, jossa nyt seisoo Qaitbayn linnoitus.
     */
    id: 'faroksen-majakka',
    nimi: 'Faroksen majakka',
    tyyppi: 'muu',
    symboli: 'merenkulku',
    kysymykset: [
      'Miten majakan valo saatiin näkymään näin kauas?',
      'Mitä majakasta on nykyään jäljellä?',
    ],
    korostukset: ['Ptolemaios|Ptolemaios toisen',
      'Qaitbayn linnoitus|Qaitbayn linnoitukseen'],
    nappi: 'Valo, joka näkyi neljänkymmenen kilometrin päähän',
    laudat: {
      maailmankartta: { x: 6829.5, y: 2136.4 },
    },
    teksti: 'Aleksandrian sataman suulla, Faroksen saarella, seisoi '
      + 'antiikin kuuluisin majakka. Ptolemaios toisen aikana (280–247 '
      + 'eaa.) rakennettu torni oli ainakin sata metriä korkea — alaosa '
      + 'nelikulmainen, keskiosa kahdeksankulmainen ja huippu lieriö — '
      + 'ja sen valo kannettiin merelle noin 47 kilometrin päähän. Se '
      + 'oli vuosisatoja maailman korkeimpia rakennuksia ja yksi '
      + 'seitsemästä ihmeestä. Kolme maanjäristystä vuosien 956 ja 1303 '
      + 'välillä rikkoivat sen, ja viimeiset kivet käytettiin 1480 '
      + 'saman paikan Qaitbayn linnoitukseen. Loput löytyivät vasta '
      + '1994, kun ranskalaissukeltajat kartoittivat sataman pohjaa.',
    lahde: 'en-Wikipedia "Lighthouse of Alexandria", johdanto ja '
      + 'tietolaatikko (tarkistettu 26.8.2026).',
    /*
     * MATKAKIRJAN IHME — säännöt js/packs/fokuskohteet-grc.js:n
     * samannimisessä lohkossa. Majakkaa ei ole, joten `kadonnut: true`:
     * kartalla tähti ja kortissa tämä kuva ensimmäisenä — ja ainoana,
     * sillä kadonneesta majakasta ei ole valokuvaa.
     */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-faros.webp',
      kadonnut: true,
      selite: 'Faroksen majakka seisoi sataman suulla runsaat tuhat '
        + 'vuotta ja opasti viljalaivat Aleksandrian satamaan: sen tuli '
        + 'näkyi merelle noin 47 kilometrin päähän. Keskiaikaisten '
        + 'arabimatkaajien kuvausten mukaan polttoaine vedettiin ylös '
        + 'tornin sisällä kiertävää ramppia, joka oli kyllin leveä '
        + 'kahdelle kuormajuhdalle rinnakkain. '
        + 'Saaren kärjessä on nyt Qaitbayn linnoitus, joka muurattiin '
        + 'vuonna 1480 majakan omista kivistä — loput lohkareet makaavat '
        + 'sataman pohjassa.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
  {
    /*
     * ALEKSANDRIAN KIRJASTO. Kirjaston tarkkaa paikkaa ei tunneta, ja
     * artikkelin tietolaatikon `coordinates` on tyhjä. Merkki on siksi
     * kaupungin kohdalla (29,9187 E / 31,2001 N — en-Wikipedia
     * "Alexandria"): oikeampi kuin arvattu täsmäpiste kaupungin
     * jossakin korttelissa. Sama sääntö kuin Kreikan merten
     * keskipisteillä.
     */
    id: 'aleksandrian-kirjasto',
    nimi: 'Aleksandrian kirjasto',
    // Kartalle lyhyt asu (js/fokuskohteet.js kohteenKarttanimi):
    // koko nimi ei mahdu nimiöön, ja lyhennys jättäisi siitä määritteen.
    nimio: 'Suuri kirjasto',
    tyyppi: 'muu',
    symboli: 'sana',
    kysymykset: [
      'Mistä kirjasto sai käsikirjoituksensa?',
      'Mitä kirjastolle lopulta tapahtui?',
    ],
    korostukset: ['Mouseion', 'papyruskäärö|papyruskääröjä'],
    nappi: 'Kirjasto, jonka koko on yhä arvailua',
    laudat: {
      maailmankartta: { x: 6830.6, y: 2136.9 },
    },
    teksti: 'Aleksandrian kirjasto oli antiikin suurimpia, ja se kuului '
      + 'laajempaan tutkimuslaitokseen nimeltä Mouseion — "muusien '
      + 'talo". Ajatus kaikki maailman kirjat kokoavasta kirjastosta '
      + 'esitettiin Ptolemaios ensimmäiselle, mutta rakennettu se '
      + 'todennäköisesti vasta hänen poikansa aikana. Papyruskääröjä '
      + 'kertyi nopeasti, sillä kuninkaat ostivat ja takavarikoivat '
      + 'tekstejä määrätietoisesti; arviot kokoelman koosta vaihtelevat '
      + '40 000:sta 700 000:een, eikä kukaan tiedä tarkkaa lukua. Talossa '
      + 'työskenteli aikanaan yli sata oppinutta, heidän joukossaan '
      + 'Kallimakhos, joka laati maailman ensimmäisenä pidetyn '
      + 'kirjastoluettelon.',
    lahde: 'en-Wikipedia "Library of Alexandria", johdanto ja '
      + 'tietolaatikko (tarkistettu 26.8.2026); koordinaatit '
      + 'en-Wikipedia "Alexandria" — kirjaston omaa paikkaa ei tunneta.',
    /* MATKAKIRJAN IHME (kadonnut) — säännöt fokuskohteet-grc.js:ssä.
       Kohteen ainoa kuva: kirjastosta ei ole jäljellä mitään. */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-aleksandrian-kirjasto.webp',
      kadonnut: true,
      selite: 'Aleksandrian kirjasto kokosi papyruskääröjä koko '
        + 'tunnetusta maailmasta, ja sen saleissa työskenteli aikanaan '
        + 'yli sata oppinutta valtion palkkaamana. Keruu oli '
        + 'järjestelmällistä: Galenoksen mukaan satamaan saapuneiden '
        + 'laivojen kirjat takavarikoitiin ja kopioitiin, ja alkuperäinen '
        + 'jäi kirjastoon — omistaja sai lähteä kopion kanssa. '
        + 'Rakennuksesta ei ole löytynyt jälkeäkään '
        + 'eikä sen paikkaa tunneta; kaupungin rannalla toimii nyt '
        + 'vuonna 2002 avattu Bibliotheca Alexandrina.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
  {
    /*
     * ── MATKAKIRJAN IHMEIDEN MAAILMAN ERÄ (27.8.2026) ──────────────
     *
     * KHEOPSIN PYRAMIDI. 31,13417 E / 29,97917 N — en-Wikipedia "Great
     * Pyramid of Giza" (29°58′45″N 31°08′03″E). Piste on Gizan
     * tasangolla; Kairon laatta on 3,4 lautayksikköä koillisessa, eli
     * merkit erottuvat toisistaan eivätkä mene päällekkäin.
     *
     * ESITYSTAPA ON "YHÄ OLEMASSA" (`kadonnut: false`). Pyramidi
     * seisoo — se on antiikin seitsemästä ihmeestä ainoa, joka on
     * säilynyt olennaisesti ehjänä. Kartalla säilyy siis kohteen oma
     * merkki, pääkuvana on nykytilan valokuva ja ihmekuva aukeaa sen
     * alta "Koe ihme" -napista.
     *
     * MITÄ IHME TÄSSÄ ON: kuori. Pyramidin sileä valkoinen Turan
     * kalkkikivipinta on louhittu lähes kokonaan pois, ja nyt näkyvä
     * porrastettu muoto on rakenteen sisus. Ihmekuva näyttää saman
     * pyramidin kuoressaan — ei siis kadonnutta rakennusta vaan
     * kadonneen pinnan.
     */
    id: 'gizan-suuri-pyramidi',
    nimi: 'Kheopsin pyramidi',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Mihin pyramidin valkoinen kuori joutui?',
      'Miten näin suuri rakennus saatiin pystyyn ilman koneita?',
    ],
    korostukset: ['Kheops|Kheopsin', 'kalkkikivikuori'],
    nappi: 'Ainoa antiikin ihme, joka on yhä pystyssä',
    laudat: {
      maailmankartta: { x: 6871.1, y: 2181.7 },
    },
    teksti: 'Gizan suurin pyramidi rakennettiin noin 2600 eaa. faarao '
      + 'Kheopsin haudaksi, ja työhön meni arviolta 26 vuotta. Siihen '
      + 'louhittiin noin 2,3 miljoonaa lohkaretta, yhteispainoltaan '
      + 'kuusi miljoonaa tonnia. Pohjan sivu on noin 230 metriä, ja '
      + 'valmiina rakennus kohosi 146,6 metriin — se oli maailman '
      + 'korkein ihmisen tekemä rakennelma yli 3 700 vuoden ajan. '
      + 'Ulkopinnan sileä valkoinen kalkkikivikuori tuotiin veneillä '
      + 'Turasta Niilin toiselta puolelta; se on sittemmin louhittu '
      + 'lähes kokonaan pois, ja siksi pyramidi on nykyään 138,5 metriä '
      + 'korkea porrastettu kivimäki. Antiikin seitsemästä ihmeestä se '
      + 'on vanhin ja ainoa, joka on säilynyt olennaisesti ehjänä.',
    lahde: 'en-Wikipedia "Great Pyramid of Giza", johdanto ja '
      + 'tietolaatikko (tarkistettu 27.8.2026).',
    /*
     * NYKYTILAN VALOKUVA. Tarkistettu Commonsin imageinfo-rajapinnalla
     * 27.8.2026 (2000×1125, CC BY-SA 4.0, Douwe C. van der Zee) ja
     * katsottu silmin: koko pyramidi kuvassa, etualalla vain pari
     * kaukaista hahmoa — ei tunnistettavia ihmisiä. Suunta on sama
     * kuin ihmekuvassa, joten pari toimii.
     */
    kuva: {
      tiedosto: 'Great Pyramid of Giza - Pyramid of Khufu.jpg',
      selite: 'Kheopsin pyramidi Gizan tasangolla. Porrastettu pinta on '
        + 'rakenteen sisus: sileä kalkkikivikuori on louhittu pois.',
      lahde: 'Douwe C. van der Zee, Wikimedia Commons (CC BY-SA 4.0)',
    },
    /*
     * MATKAKIRJAN IHME (yhä olemassa) — säännöt js/packs/
     * fokuskohteet-grc.js:n samannimisessä lohkossa. `kadonnut: false`,
     * joten "Koe ihme" -nappi tulee yllä olevan valokuvan alle.
     */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-gizan-pyramidi.webp',
      kadonnut: false,
      selite: 'Kheopsin pyramidin ulkopinta oli valmiina sileä ja '
        + 'valkoinen: Turasta tuotua hiottua kalkkikiveä, joka nousi '
        + '146,6 metriin ja hohti aavikolla kuin peili. Se oli hauta: '
        + 'faaraon ruumis tuotiin jokea pitkin laaksotemppeliin ja '
        + 'kannettiin katettua, lähes kilometrin mittaista pengertietä '
        + 'ylös, ja pyramidin kupeeseen rakennetussa temppelissä papit '
        + 'toivat kuolleelle kuninkaalle ruoka- ja juomauhreja vielä '
        + 'satoja vuosia hautajaisten jälkeen. Kuori louhittiin '
        + 'myöhempien vuosisatojen aikana rakennusaineeksi, ja jäljelle '
        + 'jäi 138,5 metriä korkea porrastettu sisus, joka seisoo '
        + 'Gizan tasangolla nyky-Kairon laidalla.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
  {
    /*
     * KARNAKIN SUURI PYLVÄSSALI. 32,65861 E / 25,71861 N —
     * en-Wikipedia "Precinct of Amun-Re" (25°43′07″N 32°39′31″E);
     * artikkelilla "Karnak" itsellään ei ole koordinaattia
     * tietolaatikossaan. Piste on Amonin temppelialue, jonka sisällä
     * sali on. Luxorin laatta (6921,3 / 2335,8) on alle yhden yksikön
     * päässä, joten merkki menee niputuspassin sarakkeeseen kaupungin
     * viereen — sama tilanne kuin Tuileries'lla Pariisissa.
     *
     * ESITYSTAPA ON "YHÄ OLEMASSA" (`kadonnut: false`). Sali on
     * pystyssä ja siellä käy päivittäin tuhansia ihmisiä; kadonnut on
     * KATTO ja maalipinta. Ihmekuva näyttää salin katettuna ja
     * väreissään, valokuva sen taivaalle avoimena — sama paikka
     * kahdessa ajassa.
     */
    id: 'karnakin-pylvassali',
    nimi: 'Karnakin pylvässali',
    // Kartalle lyhyt asu (js/fokuskohteet.js kohteenKarttanimi):
    // koko nimi ei mahdu nimiöön, ja lyhennys jättäisi siitä määritteen.
    nimio: 'Pylvässali',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Miten sali valaistiin, kun katto oli paikallaan?',
      'Mitä salin seinien kuvat kertovat?',
    ],
    korostukset: ['papyruspylväs|papyruskukkia', 'Seti ensimmäinen|Seti ensimmäinen'],
    nappi: 'Kivimetsä, jossa on 134 pylvästä',
    laudat: {
      maailmankartta: { x: 6922.0, y: 2335.2 },
    },
    teksti: 'Karnakin temppelialue Luxorin pohjoispuolella oli '
      + 'muinaisen Egyptin tärkein pyhäkkö, ja sen keskellä on suuri '
      + 'pylvässali: 5 000 neliömetrin halli, jossa on 134 pylvästä '
      + 'kuudessatoista rivissä. Keskikäytävän kaksitoista pylvästä '
      + 'ovat muita korkeampia ja paksumpia — lähteet antavat niille '
      + '21–24 metriä — ja niiden avoimet papyruskukkia jäljittelevät '
      + 'kapiteelit kannattivat korotettua kattoa. Korkeamman ja '
      + 'matalamman katon väliin jäi kiviristikkoikkunoiden rivi, josta '
      + 'valo pääsi saliin. Salin rakennutti Seti ensimmäinen, joka '
      + 'myös kaiverrutti pohjoisen puoliskon seinät; eteläisen '
      + 'puoliskon kuvat teetti hänen poikansa Ramses toinen. '
      + 'Pylväiden päällä lepäävien arkkitraavien arvioidaan painavan '
      + 'seitsemänkymmentä tonnia kappaleelta.',
    lahde: 'en-Wikipedia "Karnak", osio "Great Hypostyle Hall", ja '
      + 'en-Wikipedia "Great Hypostyle Hall", osiot "Architecture and '
      + 'construction" ja "Inscriptions and reliefs" (tarkistettu '
      + '27.8.2026).',
    /*
     * NYKYTILAN VALOKUVA. Tarkistettu Commonsin imageinfo-rajapinnalla
     * 27.8.2026 (2826×2322, CC0, Tsyganov Sergey) ja katsottu silmin:
     * keskikäytävän pylväät taivasta vasten, katto poissa, ei
     * tunnistettavia ihmisiä etualalla. Sama käytävä kuin ihmekuvassa.
     */
    kuva: {
      tiedosto: 'Karnak Temple Great Hypostyle Hall 2014.jpg',
      selite: 'Karnakin pylvässalin keskikäytävän pylväät. Katto on '
        + 'sortunut, joten pylväät kannattelevat nykyään vain taivasta.',
      lahde: 'Tsyganov Sergey, Wikimedia Commons (CC0)',
    },
    /* MATKAKIRJAN IHME (yhä olemassa) — säännöt fokuskohteet-grc.js:ssä.
       `kadonnut: false`, joten "Koe ihme" -nappi tulee valokuvan alle. */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-karnak.webp',
      kadonnut: false,
      selite: 'Karnakin suuressa pylvässalissa on 134 pylvästä '
        + 'kuudessatoista rivissä, ja aikanaan niiden päällä oli katto: '
        + 'sali oli hämärä sisätila, jonka kaikki pinnat oli kaiverrettu '
        + 'ja maalattu kirkkain värein, ja ainoa valo tuli '
        + 'kiviristikkoikkunoista korkean keskikäytävän kyljessä. '
        + 'Sisimpiin saleihin pääsivät vain papit; kansa näki jumalansa '
        + 'kerran vuodessa Opet-juhlassa, kun Amonin pyhä vene '
        + 'kannettiin Karnakista Luxorin temppeliin väkijoukkojen '
        + 'reunustamaa tietä. Katto '
        + 'on sortunut ja värit haalistuneet auringossa, mutta pylväät '
        + 'seisovat yhä paikoillaan Luxorin pohjoispuolella.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
];
