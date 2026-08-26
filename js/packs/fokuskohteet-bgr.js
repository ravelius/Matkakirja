/*
 * FOKUSKOHTEET — BULGARIA. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-grc.js:lle, ja sen rakenne on
 * kopioitu tähän sellaisenaan: SAMA LISTA palvelee kahta pintaa,
 * kohdenostoa fokusvirrassa (js/fokusvirta.js poimii kohteita
 * tunnuksilla, pöllö puhuu `teksti`-kentän kuplasta, painikkeen lupaus
 * on `nappi`) ja kartan klikattavaa pop-upia (js/fokuskohteet.js lukee
 * `nimi`, `tyyppi`, `kuva`, `teksti` ja `lahde`). Kentät ja niiden
 * perustelut on selitetty Kreikan tiedoston alussa; tässä on vain se,
 * mikä Bulgariassa on toisin.
 *
 * KAKSI KENTTÄÄ PÖLLÖÄ VARTEN (omistajan tilaus 25.8.2026) on nekin
 * kuvattu Kreikan tiedoston alussa: `kysymykset` on kaksi valmista,
 * pelaajan äänellä kirjoitettua kysymystä kartan tietoruudun loppuun,
 * ja `korostukset` on lista sanoista, jotka alleviivataan
 * leipätekstistä ja joista pöllö kertoo lisää ('perusmuoto|näkyvä
 * muoto', jos taivutus eroaa). Bulgariassa pätee sama sääntö kuin
 * muualla: kysymys ei toista sitä, minkä teksti jo kertoo.
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * docs/mantereet-tyoaineisto/fokuskohteet-bulgaria.md, kohteet 1–11
 * samassa järjestyksessä kuin aineistossa. Aineiston pop-up-tekstit on
 * siirretty tänne sellaisinaan: yhtään faktaa ei ole lisätty eikä
 * muutettu. Kaksi tietoista muotoseikkaa: ajatusviivat on kirjoitettu
 * talon tapaan pitkinä (—) ja aineiston yhdyssanalipsahdus
 * "kultaaarre" on korjattu muotoon "kulta-aarre" — kumpikaan ei kosketa
 * väitteitä.
 *
 * KAHDESTOISTA KOHDE ON BOYANAN KIRKKO, eikä se tule tuosta
 * aineistosta vaan Sofian täkyraportista
 * (docs/mantereet-tyoaineisto/takyt-sofia.md, täky 7, merkitty siellä
 * VARMAKSI). Se on tässä siksi, että Fablen kaanonpaketti
 * (fokusvirta-sofia-kaanon.md, kohta 3) määrää Boyanan Sofian
 * KOHDENOSTOKSI, ja kohdenosto poimitaan aina maan omasta
 * kohdelistasta — kohde ilman riviä täällä ei voisi nousta virtaan.
 * Aineiston oma hylkylista (kohta 6) ei koske Boyanaa: sitä ei
 * harkittu eikä hylätty, se vain ei ollut kartoituksen piirissä.
 *
 * ── AJOITUS, JOKA KOSKEE KOKO MAATA ────────────────────────────────
 *
 * Aineiston oma varoitus (dokumentin alku): vuonna 1873 Bulgaria oli
 * yhä osmanivaltaa, ja itsenäistyminen tuli vasta 1877–78 sodan ja
 * Berliinin sopimuksen jälkeen. Se koskee jokaista kaupunkikohdetta —
 * Plovdiv oli Filibe, Veliko Tarnovo maaseutukaupunki, Varna
 * osmanivaltakunnan satama. Osmanikausi on käsitelty samalla
 * periaatteella kuin Kreikassa: ei peittelyä eikä julmuuksien
 * luettelointia (Perustuslain ikäsopivuuskohta).
 *
 * ── KOORDINAATIT ───────────────────────────────────────────────────
 *
 * Sama kaksi kaavaa ja samat vakiot kuin Kreikassa, koska Sofia on
 * pelattavissa kummallakin laudalla:
 *
 *   maailmankartta — Millerin lieriö, LEVEYS 12000 / LON0 -175 /
 *     POHJOINEN 76 (tools/fokuskartta/piirto.js laudanProjektio).
 *     Tarkistus: Sofia 23,33 E / 42,7 N → 6611,0 / 1695,5, ja laudalla
 *     laatta on kohdassa 6610,8 / 1696,1 — 0,6 yksikön osumatarkkuus,
 *     sama luokka kuin Kreikan tarkistuksessa.
 *   europe — tasaväli, x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3
 *     (js/packs/europe.js). Tarkistus: Sofia → 659,1 / 770,6, laudalla
 *     659 / 771.
 *
 * KARKEAT YLEISPISTEET (aineiston hylkylistan kohdat 1 ja 3) on
 * merkitty kohteittain: Rila-vuoriston, Balkanvuorten ja Mustanmeren
 * koordinaatit ovat koko alueen likimääräisiä keskipisteitä, Tonavan
 * koordinaatti osoittaa joen suulle Romanian ja Ukrainan rajalle eikä
 * Bulgarian osuudelle, ja Vitošan koordinaatti on korkeimman huipun
 * Cherni Vrahin piste, koska vuorella itsellään ei ole Wikipediassa
 * koordinaattia lainkaan. Kartalla nämä ovat oikeita paikkoja alueen
 * nimeämiselle; täsmäpaikkoja niistä ei saa tehdä.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Yksi kuva kohdetta kohti. Aineisto tarkisti KATEGORIAT (ei
 * tiedostonimiä), joten jokainen tässä valittu tiedosto on haettu
 * kategorian jäsenlistalta ja sen olemassaolo, koko, lisenssi, tekijä
 * ja kuvaus kysytty erikseen Commonsin imageinfo-rajapinnalla
 * 25.8.2026 — ei arvattuja nimiä. Kaikki ovat PD tai CC, ja tekijä on
 * `lahde`-rivillä, koska CC BY vaatii maininnan.
 *
 * Aineiston kaksi kategoriavaroitusta on noudatettu: Balkanvuorten kuva
 * on Category:Stara planinasta (Category:Balkan Mountains on olemassa
 * mutta tyhjä) ja Ruusulaakson Category:Rose Valley, Bulgariasta
 * pilkkuineen. Mustanmeren kuva on poikkeus: se on otettu
 * Category:Varnasta eikä Category:Black Seasta, koska kohteen teksti
 * puhuu nimenomaan Bulgarian rannikosta ja tämä kuva on siltä
 * rannikolta.
 */

/**
 * Bulgarian fokuskohteet: aineiston 11 kohdetta samassa järjestyksessä
 * kuin docs/mantereet-tyoaineisto/fokuskohteet-bulgaria.md, niiden
 * perässä Boyanan kirkko (ks. tiedoston alku) sekä symbolitaksonomian
 * ensimmäinen sisältöerä (viisi kohdetta, ks. erän oma kommentti
 * listan sisällä).
 */
export const FOKUSKOHTEET_BGR = [
  {
    id: 'plovdiv',
    nimi: 'Plovdiv',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Milloin Filibestä tuli taas Plovdiv?',
      'Mitä bulgarialaisen kirkon elpyminen tarkoitti?',
    ],
    korostukset: ['vilajetti|vilajettiin'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Kaupunki seitsemällä kukkulalla',
    // 24,75 E / 42,15 N — en-Wikipedia "Plovdiv".
    laudat: {
      maailmankartta: { x: 6658.3, y: 1717.6 },
      europe: { x: 686.4, y: 785.1 },
    },
    teksti: 'Vuonna 1873 kaupunkia kutsuttiin Filibeksi, ja se kuului '
      + 'osmanien Edirnen vilajettiin — Bulgaria vapautui vasta 1878. '
      + 'Silti Filibe oli tuolloin bulgarialaisen kansallisen '
      + 'herätysliikkeen keskus: bulgarialainen kirkko elpyi täällä 1870. '
      + 'Kaupunki on rakentunut seitsemälle kukkulalle, minkä vuoksi sitä '
      + 'kutsutaan "seitsemän kukkulan kaupungiksi", ja asutusta alueella '
      + 'on ollut yhtäjaksoisesti jo 6000-luvulta eaa.',
    lahde: 'en-Wikipedia "Plovdiv", johdanto-osa ja osio "History/Ottoman '
      + 'rule" alaotsikkoineen (tarkistettu 24.8.2026).',
    // Category:Plovdiv (aineisto: 111 tiedostoa). Vanhankaupungin katu on
    // juuri sitä kukkuloille rakentunutta Filibeä, josta teksti puhuu.
    kuva: {
      tiedosto: 'Plovdiv-old town.jpg',
      selite: 'Plovdivin vanhankaupungin katua. Kaupunki on rakentunut '
        + 'seitsemälle kukkulalle.',
      lahde: 'S kirkova, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'varna',
    nimi: 'Varna',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Keitä kultaa kantaneet ihmiset olivat?',
      'Mistä Varnan kulta oli peräisin?',
    ],
    korostukset: ['Odessos', 'nekropoli|nekropolista'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Maailman vanhin kulta',
    // 27,91667 E / 43,21667 N — en-Wikipedia "Varna, Bulgaria".
    laudat: {
      maailmankartta: { x: 6763.9, y: 1674.6 },
      europe: { x: 747.2, y: 757.0 },
    },
    teksti: 'Varna tunnettiin antiikissa nimellä Odessos ja on kehittynyt '
      + 'kolmen vuosituhannen aikana merkittäväksi satamakaupungiksi '
      + 'Mustallamerellä. Vuonna 1974 löydetystä Varnan nekropolista on '
      + 'kaivettu esiin yli 3000 kultaesinettä — maailman vanhin tunnettu '
      + 'kulta-aarre, ajoitettu vuosille 4600–4200 eaa. Nykyään Varnaa '
      + 'kutsutaan Bulgarian merelliseksi pääkaupungiksi, sillä siellä '
      + 'sijaitsee laivaston päämaja.',
    lahde: 'en-Wikipedia "Varna, Bulgaria", johdanto-osa (tarkistettu '
      + '24.8.2026).',
    /*
     * Category:Varna Necropolis — aineiston tarkistama Category:Varna on
     * kaupungin yleiskategoria, mutta tekstin ydin on nimenomaan
     * nekropolin kulta, ja sillä on oma kategoriansa. Kuvan oma kuvaus
     * antaa saman ajoituksen kuin teksti.
     */
    kuva: {
      tiedosto: 'Gold treasure, 4600-4200 BC, AM Varna, Varm24.jpg',
      selite: 'Varnan nekropolin kultaesineitä vuosilta 4600–4200 eaa. '
        + 'Varnan arkeologisessa museossa.',
      lahde: 'Zde, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'veliko-tarnovo',
    nimi: 'Veliko Tarnovo',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi kansalliskokous kokoontui juuri täällä?',
      'Millainen kaupunki Veliko Tarnovo on nykyään?',
    ],
    korostukset: ['Toinen Bulgarian valtakunta|Toisen Bulgarian valtakunnan'],
    /* Valintakuplan painike. Lupaus on 1873-kulma, ei maantiede. */
    nappi: 'Pääkaupunki, joka oli jo ollut',
    // 25,61667 E / 43,07778 N — en-Wikipedia "Veliko Tarnovo".
    laudat: {
      maailmankartta: { x: 6687.2, y: 1680.2 },
      europe: { x: 703.0, y: 760.7 },
    },
    teksti: 'Veliko Tarnovo oli Toisen Bulgarian valtakunnan pääkaupunki '
      + '1185–1393, kunnes osmanit valtasivat sen kolmen kuukauden '
      + 'piirityksen jälkeen. Isoisän vieraillessa 1873 kaupunki oli yhä '
      + 'osaa osmanivaltaa — kukaan ei vielä tiennyt, että vain kuusi '
      + 'vuotta myöhemmin, huhtikuussa 1879, tänne kokoontuisi Bulgarian '
      + 'ensimmäinen kansalliskokous hyväksymään maan ensimmäisen '
      + 'perustuslain.',
    lahde: 'en-Wikipedia "Veliko Tarnovo", osiot "Medieval Bulgarian rule", '
      + '"Ottoman rule" ja "Third Bulgarian State" (tarkistettu 24.8.2026); '
      + '1873-vertailu on aineiston koostajan laskelma, ei suora lainaus.',
    // Category:Veliko Tarnovo (aineisto: 539 tiedostoa). Tsarevetsin
    // linnoitus on juuri se keskiaikaisen pääkaupungin linnoitus, josta
    // tekstin alku kertoo.
    kuva: {
      tiedosto: 'Ramparts of Tsarevets Fortress with City Backdrop - Veliko Tarnovo - Bulgaria - 01 (43220029581).jpg',
      selite: 'Tsarevetsin linnoituksen muureja ja kaupunki niiden takana '
        + 'Veliko Tarnovossa.',
      lahde: 'Adam Jones, Wikimedia Commons (CC BY-SA 2.0)',
    },
  },
  {
    id: 'rila',
    nimi: 'Rila-vuoristo',
    tyyppi: 'vuori',
    kysymykset: [
      'Miten jääkausi muovasi Rilan järvet?',
      'Mitä eläimiä vuoristossa elää?',
    ],
    korostukset: ['vedenjakaja'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Balkanin korkein vuoristo',
    /*
     * 23,55 E / 42,1 N — en-Wikipedia "Rila". KARKEA KOKO VUORISTON
     * KESKIPISTE, ei täsmäpaikka (aineiston hylkylistan kohta 3).
     */
    laudat: {
      maailmankartta: { x: 6618.3, y: 1719.6 },
      europe: { x: 663.4, y: 786.4 },
    },
    teksti: 'Rila on Bulgarian, koko Balkanin niemimaan ja koko '
      + 'Kaakkois-Euroopan korkein vuoristo — sen huippu Musala kohoaa '
      + '2925 metriin. Vuoristo kätkee lähes 200 jääkauden muovaamaa '
      + 'järveä, joista tunnetuin ryhmä on seitsemän Rilan järveä. Täältä '
      + 'saavat alkunsa monet Balkanin pisimmistä joista, ja Bulgarian '
      + 'vedenjakaja Mustanmeren ja Egeanmeren valuma-alueiden välillä '
      + 'kulkee juuri Rilan harjannetta pitkin.',
    lahde: 'en-Wikipedia "Rila", johdanto-osa (tarkistettu 24.8.2026). '
      + 'Suomenkielinen nimi "Rila-vuoristo" on aineiston koostajan '
      + 'muodostama: fi-Wikipediassa ei ole omaa artikkelia.',
    // Category:Seven Rila Lakes — aineiston tarkistama Category:Rila on
    // koko vuoriston kategoria, mutta järviryhmä on se, jonka teksti
    // nimeää, ja sillä on oma kategoriansa.
    kuva: {
      tiedosto: 'Seven Rila Lakes.jpg',
      selite: 'Seitsemän Rilan järveä. Vuoristossa on lähes 200 jääkauden '
        + 'muovaamaa järveä.',
      lahde: 'Tsvetomira Zaharieva, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'musala',
    nimi: 'Musala',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi juuri huipulle rakennettiin tutkimusasema?',
      'Millainen sää Musalalla on kesällä?',
    ],
    korostukset: ['kosminen säteilyasema'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Balkanin korkein kohta',
    // 23,58667 E / 42,17972 N — en-Wikipedia "Musala".
    laudat: {
      maailmankartta: { x: 6619.6, y: 1716.4 },
      europe: { x: 664.1, y: 784.3 },
    },
    teksti: 'Musala on koko Balkanin niemimaan korkein kohta, 2925 metriä — '
      + 'nimi juontuu arabiasta osmanin turkin kautta ja tarkoittaa '
      + 'suunnilleen "rukouspaikkaa". Huipulta näkee kaikki Bulgarian '
      + 'suuret vuoristot Vitošasta Piriniin. Huipulla toimi vuodesta 1960 '
      + 'kosminen säteilyasema, kunnes tulipalo tuhosi sen 1983. Musalan '
      + 'keskilämpötila on Bulgarian ja koko Balkanin kylmin, keskimäärin '
      + '-2,2 °C.',
    lahde: 'en-Wikipedia "Musala", johdanto-osa (tarkistettu 24.8.2026).',
    // Category:Musala (aineisto: 57 tiedostoa).
    kuva: {
      tiedosto: 'Musala Northern Wall.jpg',
      selite: 'Musalan pohjoisseinämä Rilan vuoristossa. Huippu on 2925 '
        + 'metriä korkea.',
      lahde: 'Bulgarian Herald, Wikimedia Commons (CC BY 3.0)',
    },
  },
  {
    id: 'rilan-luostari',
    nimi: 'Rilan luostari',
    tyyppi: 'muu',
    kysymykset: [
      'Miten luostari selvisi osmanivallan läpi?',
      'Mitä munkit tekevät luostarissa nykyään?',
    ],
    korostukset: ['Ivan Rilalainen|Ivan Rilalaisen'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Luostari setelin kääntöpuolella',
    // 23,34028 E / 42,13333 N — en-Wikipedia "Rila Monastery".
    laudat: {
      maailmankartta: { x: 6611.3, y: 1718.2 },
      europe: { x: 659.3, y: 785.5 },
    },
    teksti: 'Rilan luostari on Bulgarian suurin ja kuuluisin '
      + 'ortodoksiluostari, perustettu 900-luvulla erakko Pyhän Ivan '
      + 'Rilalaisen (876–946) mukaan. Se sijaitsee syvässä Rilan-joen '
      + 'laaksossa 1147 metrin korkeudessa, Rilan vuoriston sydämessä. '
      + 'Luostarissa asuu noin 60 munkkia, ja se on kuvattu Bulgarian '
      + 'yhden levin seteliin. Vuonna 2008 sitä kävi katsomassa 900 000 '
      + 'pyhiinvaeltajaa ja matkailijaa.',
    lahde: 'en-Wikipedia "Rila Monastery", johdanto-osa (tarkistettu '
      + '24.8.2026).',
    // Category:Rila Monastery (aineisto: 17 tiedostoa + 12 alikategoriaa).
    kuva: {
      tiedosto: 'Rilakloster stitched 14.jpg',
      selite: 'Rilan luostarin pihaa ja raidallisia kaariholveja Rilan '
        + 'vuoriston sydämessä.',
      lahde: 'Apostoloff, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'vitosa',
    nimi: 'Vitoša',
    tyyppi: 'vuori',
    kysymykset: [
      'Voiko Vitoša vielä purkautua?',
      'Miksi vuori on sofialaisille niin tärkeä?',
    ],
    korostukset: ['Cherni Vrah'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Vuori bussipysäkin takana',
    /*
     * 23,27833 E / 42,56361 N — en-Wikipedia "Cherni Vrah", eli VUOREN
     * KORKEIMMAN HUIPUN piste. Vitošan omalla artikkelilla ei ole
     * koordinaattia lainkaan (aineiston hylkylistan kohta 1), joten
     * huippu on käytetty korvikkeena.
     */
    laudat: {
      maailmankartta: { x: 6609.3, y: 1701.0 },
      europe: { x: 658.1, y: 774.2 },
    },
    teksti: 'Vitoša kohoaa aivan Sofian kupeessa ja on kaupungin tunnetuin '
      + 'maamerkki — lähin retkeily-, kiipeily- ja hiihtokohde, jonne '
      + 'pääsee bussilla ja hissillä keskustasta. Vuori syntyi '
      + 'tulivuoritoiminnasta ja on muotoutunut vuosimiljoonien '
      + 'poimutuksissa neljäksi toisiinsa liittyväksi osaksi. Sen huippu '
      + 'Cherni Vrah ("musta huippu") kohoaa 2290 metriin. Vitošan '
      + 'luonnonpuisto perustettiin 1934 — Balkanin ensimmäinen laatuaan.',
    lahde: 'en-Wikipedia "Vitosha", johdanto-osa ja osio "Conservation" '
      + '(tarkistettu 24.8.2026). Suomenkielinen kirjoitusasu "Vitoša" on '
      + 'aineiston koostajan muodostama: fi-Wikipediassa ei ole omaa '
      + 'artikkelia.',
    // Category:Vitosha (aineisto: 175 tiedostoa).
    kuva: {
      tiedosto: 'Mount Vitosha (1) (37642153771).jpg',
      selite: 'Vitošan rinteitä Sofian kupeessa. Vuoren luonnonpuisto '
        + 'perustettiin 1934.',
      lahde: 'Hans Birger Nilsen, Wikimedia Commons (CC BY-SA 2.0)',
    },
  },
  {
    id: 'balkanvuoret',
    nimi: 'Balkanvuoret',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä sana Balkan tarkoittaa?',
      'Kuinka vanhoja Maguran maalaukset ovat?',
    ],
    korostukset: ['Stara planina|Stara planinaksi', 'karstimaasto|karstimaastossa'],
    /* Valintakuplan painike. Lupaus on nimen alkuperä. */
    nappi: 'Vuori, joka nimesi puolen Euroopan',
    /*
     * 25 E / 43,25 N — en-Wikipedia "Balkan Mountains". KARKEA KOKO
     * VUORISTON KESKIPISTE (aineiston hylkylistan kohta 3).
     */
    laudat: {
      maailmankartta: { x: 6666.7, y: 1673.3 },
      europe: { x: 691.2, y: 756.1 },
    },
    teksti: 'Balkanin niemimaa on saanut nimensä juuri tästä vuoristosta, '
      + 'jota bulgariaksi ja serbiaksi kutsutaan Stara planinaksi, '
      + '"Vanhaksi vuoreksi". Se kulkee noin 560 kilometriä Serbian '
      + 'rajalta Mustallemerelle asti ja jakaa Bulgarian pohjois- ja '
      + 'eteläosiin. Korkein huippu on Botev-huippu (2376 m). Vuoriston '
      + 'karstimaastossa on lukuisia luolia, joista Maguran luola '
      + 'tunnetaan Euroopan merkittävimmistä kalliomaalauksista.',
    lahde: 'en-Wikipedia "Balkan Mountains", johdanto-osa ja osio '
      + '"Etymology" (tarkistettu 24.8.2026).',
    /*
     * Category:Stara planina (aineisto: 1038 tiedostoa) — EI
     * "Category:Balkan Mountains", joka on olemassa mutta tyhjä
     * (aineiston hylkylistan kohta 4). Kuvan oma kuvaus nimeää
     * Botev-huipun, jonka teksti mainitsee.
     */
    kuva: {
      tiedosto: 'Balkan Mountains from Trakia motorway 1.jpg',
      selite: 'Balkanvuorten harjannetta; oikealla Triglav ja vasemmalla '
        + 'Botev-huippu Keskisen Balkanin massiivissa.',
      lahde: 'Ivano Giambattista, Wikimedia Commons (CC0)',
    },
  },
  {
    id: 'tonava',
    nimi: 'Tonava',
    tyyppi: 'joki',
    kysymykset: [
      'Kuinka monen maan läpi Tonava virtaa?',
      'Kulkeeko joella vielä rahtiliikennettä?',
    ],
    korostukset: ['Danubius'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Joki, joka oli Rooman raja',
    /*
     * 29,76139 E / 45,2175 N — en-Wikipedia "Danube". HUOM: tämä on JOEN
     * SUU Romanian ja Ukrainan rajalla, EI Bulgarian osuus (aineiston
     * hylkylistan kohta 3, jossa asia on nimenomaisesti merkitty). Piste
     * kelpaa koko joen nimeämiseen kartalla; jos Bulgarian kohdalle
     * halutaan täsmäpiste, se on valittava erikseen esimerkiksi Rusen tai
     * Vidinin kohdalta.
     */
    laudat: {
      maailmankartta: { x: 6825.4, y: 1592.8 },
      europe: { x: 782.6, y: 704.4 },
    },
    teksti: 'Tonava on Euroopan toiseksi pisin joki Volgan jälkeen ja oli '
      + 'aikoinaan Rooman valtakunnan raja — latinalainen nimi Danubius '
      + 'juontuu kelttiläisestä jumalattaresta Danusta. Suomen "Tonava" on '
      + 'peräisin saksan Donau-nimestä. Bulgarian pohjoisrajalla joki '
      + 'erottaa maan Romaniasta lähes koko matkan, ja sen varrella '
      + 'sijaitsevat muun muassa Vidinin, Kozloduyn ja Rusen kaupungit.',
    lahde: 'en-Wikipedia "Danube", johdanto-osa sekä osiot "Etymology" ja '
      + '"Cities and towns" (tarkistettu 24.8.2026).',
    // Category:Danube (aineisto: 131 tiedostoa). Kuva on Vidinin kohdalta
    // eli juuri siltä Bulgarian osuudelta, jonka teksti nimeää.
    kuva: {
      tiedosto: 'Dunav VIdin.jpg',
      selite: 'Tonava Vidinin kohdalla Bulgarian pohjoisrajalla.',
      lahde: 'Aleksand.sl, Wikimedia Commons (CC BY 4.0)',
    },
  },
  {
    id: 'mustameri',
    nimi: 'Mustameri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä tekee Mustastamerestä poikkeuksellisen?',
      'Miksi purjehdus siellä oli niin vaarallista?',
    ],
    korostukset: ['Pontos Axeinos', 'Karadeniz|Karadenizeksi'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Meri, joka vaihtoi luonteensa',
    /*
     * 35 E / 44 N — en-Wikipedia "Black Sea". KOKO MEREN KARKEA
     * KESKIPISTE (aineiston hylkylistan kohta 3), ei Bulgarian rannikko.
     */
    laudat: {
      maailmankartta: { x: 7000.0, y: 1642.8 },
      europe: { x: 883.2, y: 736.4 },
    },
    teksti: 'Antiikin kreikkalaiset kutsuivat merta ensin nimellä Pontos '
      + 'Axeinos, "epävieraanvarainen meri", koska purjehdus oli '
      + 'vaarallista ja rannikon heimot vihamielisiä. Kreikkalaisten '
      + 'perustettua siirtokuntia rannoille nimi käännettiin: Euxeinos '
      + 'Pontos, "vieraanvarainen meri". Osmanit puolestaan kutsuivat '
      + 'merta Karadenizeksi, "mustaksi mereksi"; Bulgarian rannikolla '
      + 'avautuu muun muassa laaja Burgasin lahti.',
    lahde: 'en-Wikipedia "Black Sea", osiot "Historical names and '
      + 'etymology" ja "Geography" (tarkistettu 24.8.2026).',
    // Category:Varna — ks. tiedoston alku: kuva on Bulgarian rannikolta,
    // josta tekstin loppu puhuu, eikä koko meren yleiskategoriasta.
    kuva: {
      tiedosto: 'Black Sea near Varna.jpg',
      selite: 'Mustaameri Varnan edustalla Bulgarian rannikolla.',
      lahde: 'VisitVarna, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'ruusulaakso',
    nimi: 'Ruusulaakso',
    tyyppi: 'muu',
    kysymykset: [
      'Miten ruusuöljyä valmistetaan?',
      'Miksi juuri tämä laakso sopii ruusuille?',
    ],
    korostukset: ['ruusuöljy|ruusuöljyn'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Puolet maailman ruusuöljystä',
    // 25,4 E / 42,61667 N — en-Wikipedia "Rose Valley, Bulgaria".
    laudat: {
      maailmankartta: { x: 6680.0, y: 1698.8 },
      europe: { x: 698.9, y: 772.8 },
    },
    teksti: 'Ruusulaakso jakautuu kahteen osaan, Karlovon laaksoon lännessä '
      + 'ja Kazanlakin laaksoon idässä, Balkanvuorten eteläpuolella. '
      + 'Aluetta on viljelty ruusuöljyn vuoksi vuosisatoja, ja se tuottaa '
      + 'yhä lähes puolet koko maailman ruusuöljystä — keskuksena toimii '
      + 'Kazanlakin kaupunki. Kukat poimitaan käsin touko-kesäkuussa, '
      + 'perinteisesti naisten työnä, ja EU myönsi bulgarialaiselle '
      + 'ruusuöljylle suojatun maantieteellisen merkinnän 2014.',
    lahde: 'en-Wikipedia "Rose Valley, Bulgaria", johdanto-osa ja osio '
      + '"Description" (tarkistettu 24.8.2026). Suomenkielinen nimi on '
      + 'aineiston koostajan käännös: fi-Wikipediassa ei ole omaa '
      + 'artikkelia.',
    /*
     * Category:Rose Valley, Bulgaria — pilkku ja maatunnus mukana
     * (aineiston huomio kohdassa 11). Kuva on ISOISÄN OMALTA
     * VUOSIKYMMENELTÄ: Felix Kanitzin puupiirros ruusunpoiminnasta
     * 1870-luvulla, julkaistu hänen kirjassaan "Donau-Bulgarien und der
     * Balkan" (Leipzig 1879).
     */
    kuva: {
      tiedosto: 'Rose-picking in Bulgaria 1870ies.jpg',
      selite: 'Ruusunpoimintaa Kazanlakin lähellä 1870-luvulla. Kukat '
        + 'poimitaan käsin touko-kesäkuussa yhä samaan tapaan.',
      lahde: 'Felix Philipp Kanitz, "Donau-Bulgarien und der Balkan" '
        + '(Leipzig 1879), Wikimedia Commons (public domain)',
    },
  },
  {
    id: 'boyana',
    nimi: 'Boyanan kirkko',
    tyyppi: 'muu',
    kysymykset: [
      'Kuka maalasi Boyanan freskot?',
      'Miten 1200-luvun maalaukset ovat säilyneet?',
    ],
    korostukset: ['sebastokraattori'],
    /* Valintakuplan painike. Lupaus on freskojen vuosiluku. */
    nappi: 'Kasvot, jotka maalattiin 1259',
    /*
     * 23,26617 E / 42,64467 N — en-Wikipedia "Boyana Church"
     * (takyt-sofia.md, täky 7). Kohde on Sofian laidalla, siis lähellä
     * kaupungin laattaa mutta selvästi erillään siitä: laatta on
     * maailmankartalla 6610,8 / 1696,1 ja tämä 6608,9 / 1697,7.
     */
    laudat: {
      maailmankartta: { x: 6608.9, y: 1697.7 },
      europe: { x: 657.9, y: 772.0 },
    },
    teksti: 'Sofian laidalla, Vitošan juurella, seisoo pieni Boyanan '
      + 'kirkko — Unescon maailmanperintökohde vuodesta 1979. Kirkko '
      + 'rakennettiin kolmessa vaiheessa 300 vuoden aikana, ja sen '
      + 'kuuluisimmat freskot ovat vuodelta 1259: seinillä on 89 kohtausta '
      + 'ja 240 ihmishahmoa. Lahjoittajaparin, sebastokraattori Kaloyanin '
      + 'ja hänen vaimonsa Desislavan, muotokuvia pidetään kirkon '
      + 'elävimpinä ja vaikuttavimpina maalauksina.',
    lahde: 'en-Wikipedia "Boyana Church" (tarkistettu 24.8.2026 '
      + 'täkyraporttiin docs/mantereet-tyoaineisto/takyt-sofia.md, täky 7).',
    // Category:Boyana Church. Sama tiedosto, jota en-Wikipedian artikkeli
    // itse käyttää — eli kuva on varmasti oikeasta rakennuksesta.
    kuva: {
      tiedosto: 'Boyana Church 2 TB.JPG',
      selite: 'Boyanan kirkko Vitošan juurella. Rakennus nousi kolmessa '
        + 'vaiheessa 300 vuoden aikana.',
      lahde: 'Todor Bozhinov, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  /*
   * ── SYMBOLITAKSONOMIAN ENSIMMÄINEN SISÄLTÖERÄ (omistaja 26.8.2026,
   *    Raamatun osio "Fokusmoodi", kohta SYMBOLITAKSONOMIA) ───────────
   *
   * Tästä alaspäin jokaisella kohteella on uusi kenttä `symboli`
   * (taksonomian kategoria: ruoka, sana, historia, elain, kulttuuri).
   * Rinnakkainen työ piirtää symbolit; ilman piirtäjää kohde näkyy
   * entiseen tapaan pisteenä. Faktapohja on en-Wikipedia raakatekstinä
   * (index.php?action=raw) artikkeli kerrallaan 26.8.2026 — ei aiempaa
   * työaineistoa, joten lähderivit osoittavat suoraan artikkeleihin.
   * Koordinaattikaavat validoitiin ennen käyttöä kahdella tämän
   * tiedoston kohteella (Varna ja Boyanan kirkko: lasketut luvut
   * vastasivat kirjattuja 0,1 yksikön tarkkuudella). Kuvat on valittu
   * Commonsin rajapinnalla (imageinfo: lisenssi, tekijä, Restrictions
   * tyhjä) ja katsottu silmin ~480 px:n leveydellä.
   */
  {
    id: 'jogurtti',
    nimi: 'Bulgarialainen jogurtti',
    tyyppi: 'muu',
    symboli: 'ruoka',
    kysymykset: [
      'Mitä bakteeri tekee maidolle?',
      'Miten jogurttia syödään Bulgariassa?',
    ],
    korostukset: ['Lactobacillus bulgaricus'],
    /* Valintakuplan painike. Lupaus on bakteerin nimen tarina. */
    nappi: 'Bakteeri, joka sai maan nimen',
    /*
     * 22,66667 E / 42,83333 N — en-Wikipedia "Tran, Bulgaria" (42°50′N
     * 22°40′E). Piste on TRANIN PIKKUKAUPUNKI: Grigorovin kotikylällä
     * Studen Izvorilla ei ole en-Wikipediassa omaa artikkelia eikä
     * koordinaattia, ja kylä kuuluu Tranin kuntaan (en-Wikipedia
     * "Stamen Grigorov") — sama korvikeratkaisu kuin Vitošan
     * Cherni Vrah -pisteessä.
     */
    laudat: {
      maailmankartta: { x: 6588.9, y: 1690.1 },
      europe: { x: 646.4, y: 767.1 },
    },
    teksti: 'Jogurtin tekee jogurtiksi maitohappobakteeri, jonka '
      + 'bulgarialainen lääketieteen opiskelija Stamen Grigorov tunnisti '
      + 'Genevessä 1905 tutkiessaan kotimaansa jogurttia. Bakteeri '
      + 'nimettiin löytäjän kotimaan mukaan Lactobacillus bulgaricukseksi, '
      + 'ja se on yhä jogurtinvalmistuksen pääbakteeri kaikkialla '
      + 'maailmassa. Grigorov syntyi Studen Izvorin kylässä Tranin '
      + 'seudulla. Nobelisti Ilja Metšnikov arveli aikanaan Grigorovin '
      + 'työn pohjalta, että bulgarialaisten talonpoikien pitkä ikä '
      + 'johtui juuri jogurtista.',
    lahde: 'en-Wikipedia "Stamen Grigorov", "Lactobacillus delbrueckii '
      + 'subsp. bulgaricus" (johdanto) ja "Yogurt" (osio History) '
      + '(tarkistettu 26.8.2026).',
    /*
     * Commons-haku "Bulgarian yogurt". Commons 26.8.2026: 3264×2448,
     * CC BY-SA 3.0, Ned Jelyazkov, Restrictions tyhjä. Katsottu
     * silmin: kulhollinen kiselo mlyakoa, ei ihmisiä, ei vesileimaa.
     */
    kuva: {
      tiedosto: 'Bulgarian yogurt.JPG',
      selite: 'Bulgarialaista jogurttia eli kiselo mlyakoa. Sen '
        + 'pääbakteeri kantaa maan nimeä.',
      lahde: 'Ned Jelyazkov, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'veliki-preslav',
    nimi: 'Veliki Preslav',
    tyyppi: 'kaupunki',
    symboli: 'sana',
    kysymykset: [
      'Keitä koulun kuuluisat kirjoittajat olivat?',
      'Miksi kirjaimisto on nimetty Kyrilloksen mukaan?',
    ],
    korostukset: ['kyrillinen kirjaimisto'],
    /* Valintakuplan painike. Lupaus on aakkosten syntypaikka. */
    nappi: 'Paja, josta aakkoset tulivat',
    // 26,817 E / 43,16667 N — en-Wikipedia "Veliki Preslav" (43°10′0″N
    // 26°49′1.2″E).
    laudat: {
      maailmankartta: { x: 6727.2, y: 1676.6 },
      europe: { x: 726.1, y: 758.3 },
    },
    teksti: 'Veliki Preslav oli ensimmäisen Bulgarian valtakunnan '
      + 'pääkaupunki, ja hallitsija Simeon I siirsi tänne 893 valtakunnan '
      + 'kirjallisuuskoulun — keskiajan slaavien tärkeimmän oppineiston '
      + 'keskuksen, jossa käännettiin, sepitettiin runoja ja maalattiin '
      + 'keramiikkaa. Juuri Preslavin koulussa kehitettiin kyrillinen '
      + 'kirjaimisto, ja varhaisimmat ajoitettavat kyrilliset kirjoitukset '
      + 'on löydetty tältä seudulta. Bysantin keisarin joukot valtasivat '
      + 'ja polttivat kaupungin 972.',
    lahde: 'en-Wikipedia "Preslav Literary School", johdanto ja osio '
      + '"History"; pääkaupunkiasema ja koordinaatit en-Wikipedia '
      + '"Veliki Preslav" (tarkistettu 26.8.2026).',
    /*
     * Category:Golden Church in Preslav: Kultainen eli pyöreä kirkko,
     * Simeonin ajan kuuluisin rakennus. Artikkelin oma kuva samasta
     * kohteesta hylättiin, koska siinä kirkko ei erotu muurien takaa;
     * tässä osittain entisöidyt kaaret näkyvät selvästi. Commons
     * 26.8.2026: 3264×2448, CC BY-SA 4.0, Alexander.D.Hristov,
     * Restrictions tyhjä. Katsottu silmin: kirkon rauniot kaarineen,
     * ei ihmisiä, ei vesileimaa.
     */
    kuva: {
      tiedosto: 'Round Church, Preslav - Church outside view.jpg',
      selite: 'Kultaisen eli pyöreän kirkon rauniot Veliki Preslavissa, '
        + 'ensimmäisen Bulgarian valtakunnan pääkaupungissa.',
      lahde: 'Alexander.D.Hristov, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'madara',
    nimi: 'Madaran ratsastaja',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Keitä kaanit Tervel ja Krum olivat?',
      'Miten kalliokuvaa suojellaan rapautumiselta?',
    ],
    korostukset: ['kaani Tervel|kaani Tervelin'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Ratsastaja kalliossa',
    // 27,11956 E / 43,27669 N — en-Wikipedia "Madara Rider"
    // (43°16′36.1″N 27°07′10.4″E).
    laudat: {
      maailmankartta: { x: 6737.3, y: 1672.2 },
      europe: { x: 731.9, y: 755.4 },
    },
    teksti: 'Madaran kalliojyrkänteeseen on hakattu lähes luonnollisen '
      + 'kokoinen ratsastaja, joka työntää keihään hevosen jalkoihin '
      + 'kaatuneeseen leijonaan koira kintereillään. Reliefi veistettiin '
      + '23 metrin korkeuteen todennäköisesti 700-luvun alussa kaani '
      + 'Tervelin kaudella, ja sen ympärillä on kolme keskiajan kreikaksi '
      + 'kirjoitettua tekstiä Bulgarian varhaisista kaaneista. Kuvan '
      + 'merkitys on yhä arvoitus. Unescon maailmanperintölistalle '
      + 'reliefi pääsi 1979, ja se on kuvattu Bulgarian pikkukolikoihin.',
    lahde: 'en-Wikipedia "Madara Rider", johdanto sekä osiot '
      + '"Description", "Inscriptions" ja "Legacy" (tarkistettu '
      + '26.8.2026).',
    /*
     * SAMA TIEDOSTO KUIN BULGARIAN MAAKARTTANOSTOSSA
     * (js/packs/maakartat.js): Diego Delson otos reliefistä, joka on
     * jo pelissä ja silmätarkistettu 8.8.2026 — sisarotos DD 41
     * hylättiin, koska peilipolku katkaisee pitkän nimen ja kaksi eri
     * tiedostoa osuisi ämpärissä samaan polkuun (tests/media.test.mjs
     * valvoo tätä). Rivi on tarkoituksella yli mitan: nimeä ei saa
     * katkaista. Commons 26.8.2026: CC BY-SA 4.0, Diego Delso,
     * Restrictions tyhjä; katsottu silmin (kalliokuva, ei ihmisiä,
     * ei vesileimaa).
     */
    kuva: {
      tiedosto: 'Caballero de Madara, reserva histórico-arqueológica Nacional de Madara, Bulgaria, 2016-05-27, DD 39.jpg',
      selite: 'Madaran ratsastaja kalliojyrkänteessä. Reliefi on '
        + 'veistetty 23 metrin korkeuteen.',
      lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'srebarna',
    nimi: 'Srebarna',
    tyyppi: 'muu',
    symboli: 'elain',
    kysymykset: [
      'Kuinka suureksi kiharapelikaani kasvaa?',
      'Mitä muita lintuja järvellä pesii?',
    ],
    korostukset: ['Via Pontica|Via Pontican'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Järvi, jolla pelikaanit pesivät',
    // 27,07806 E / 44,11444 N — en-Wikipedia "Srebarna Nature Reserve"
    // (44°06′52″N 27°04′41″E).
    laudat: {
      maailmankartta: { x: 6735.9, y: 1638.1 },
      europe: { x: 731.1, y: 733.4 },
    },
    teksti: 'Parin kilometrin päässä Tonavan etelärannasta lepää matala '
      + 'Srebarnan järvi, jonka nimen uskotuimman selityksen mukaan antoi '
      + 'täydenkuun hopeinen kimallus veden pinnassa. Järvi on Via '
      + 'Pontican, Euroopan ja Afrikan välisen lintujen muuttotien, '
      + 'varrella, ja sen alueella pesii 179 lintulajia — tunnetuimpana '
      + 'kiharapelikaani. Alue rauhoitettiin 1948, ja Unescon '
      + 'maailmanluonnonperintöön se otettiin 1983.',
    lahde: 'en-Wikipedia "Srebarna Nature Reserve", johdanto sekä osiot '
      + '"History", "Legends" ja "Fauna" (tarkistettu 26.8.2026).',
    /*
     * ELÄINKOHTEEN KUVA NÄYTTÄÄ ITSE ELÄIMEN (omistaja 26.8.2026
     * ilta, Srebarna-kaappaus: "Pitäisi saada kuva itse eläimestä
     * aina jos on söpöysmerkki") — järvimaisema vaihtui lintuun.
     * Srebarnassa kuvatut pelikaanit ovat Commonsissa kaukaisia
     * läiskiä, joten kuva on Tonavan suistosta, samalta
     * muuttoreitiltä parinsadan kilometrin päästä; selite sanoo sen
     * rehellisesti. Commons 26.8.2026: 3982×2655, CC BY-SA 4.0,
     * Charles J. Sharp, Restrictions tyhjä. Katsottu silmin:
     * kiharapelikaani lennossa lähikuvassa, ei ihmisiä, ei
     * vesileimaa.
     */
    kuva: {
      tiedosto: 'Dalmatian pelican (Pelecanus crispus) in flight Danube delta.jpg',
      selite: 'Kiharapelikaani lennossa Tonavan suistossa, Srebarnan '
        + 'muuttoreitin varrella. Järven kaislikoissa pesii 179 '
        + 'lintulajia.',
      lahde: 'Charles J. Sharp, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'pernik',
    nimi: 'Pernik',
    tyyppi: 'kaupunki',
    symboli: 'kulttuuri',
    kysymykset: [
      'Miten kukeri-naamio tehdään?',
      'Pääseekö kulkueeseen mukaan itse?',
    ],
    korostukset: ['kukeri|kukereille'],
    /* Valintakuplan painike. Lupaus on rituaalin tarkoitus. */
    nappi: 'Naamiot, jotka ajavat henget pois',
    // 23,03333 E / 42,6 N — en-Wikipedia "Pernik" (42°36′N 23°02′E).
    laudat: {
      maailmankartta: { x: 6601.1, y: 1699.5 },
      europe: { x: 653.4, y: 773.2 },
    },
    teksti: 'Tammikuun lopulla Pernik kuuluu kukereille: naamioituneet '
      + 'hahmot tanssivat kaduilla puisissa eläinnaamioissa, vyöllään '
      + 'suuret kellot, joiden kalke karkottaa perinteen mukaan pahat '
      + 'henget ja tuo kylälle sadon, terveyden ja onnen. Survan '
      + 'naamiaisfestivaali on järjestetty vuodesta 1966, ja se on '
      + 'Balkanin ja koko itäisen Euroopan suurimpia: kolmen päivän '
      + 'ajaksi kaupunkiin kokoontuu tuhansia kukereita eri puolilta '
      + 'Bulgariaa ja maailmaa.',
    lahde: 'en-Wikipedia "Kukeri" (johdanto) ja "Pernik" (osiot '
      + '"History" ja "Surva") (tarkistettu 26.8.2026).',
    /*
     * Category:Kukeri. SURVA-FESTIVAALIN OMAT VALOKUVAT HYLÄTTIIN:
     * jokaisessa katsotussa (Surva 2019, Surva 2013, Klearchosin
     * Pernik-otos) yleisön tai esiintyjän kasvot erottuvat selvästi
     * (ei tunnistettavia ihmisiä -sääntö), ja Pernikin seudun vanhat
     * mustavalkokuvat ovat skannauksia, joiden CC-lisenssimerkintä ei
     * voi olla lataajan oma. Tässä kukerit ovat kokonaan naamioidensa
     * peitossa. Kuva on Razlogista eikä Pernikistä — selite sanoo sen
     * itse, samaan tapaan kuin Kırkpınarin maalauksessa. Commons
     * 26.8.2026: 2288×1712, public domain (kuvaajan oma vapautus,
     * bg-Wikipedia), Restrictions tyhjä. Katsottu silmin: naamioidut
     * hahmot, taustan harvat sivustakatsojat pieniä ja epätarkkoja,
     * ei vesileimaa.
     */
    kuva: {
      tiedosto: 'Kukeri razlog.JPG',
      selite: 'Kukereita uudenvuoden kulkueessa Razlogissa. Sama '
        + 'naamioperinne kokoaa tuhannet kulkijat Pernikin Survaan.',
      lahde: 'Ivaneskoto, bg-Wikipedia / Wikimedia Commons (public '
        + 'domain)',
    },
  },
  /*
   * ── ENTINEN TÄKYNOSTO NORMAALINA KOHTEENA (omistaja 26.8.2026 ilta:
   *    *"Täkyjä josta tulee puhekupla pitää olla vain yksi per maa.
   *    Kaikki muut normaaleita."*) ────────────────────────────────────
   *
   * Sofian täkypoolissa (js/packs/fokusvirta-sofia.js takynostot) oli
   * kolme nostoa; siellä on nyt tasan yksi. Toinen niistä
   * ("pollopatsas") jäi kokonaan pois, koska sama aihe on jo kaupungin
   * omana täkynä samassa tiedostossa — kahta kertomusta samasta
   * patsaasta ei tehdä. Tämä kolmas ei osoittanut mihinkään olemassa
   * olevaan, ja se on tässä sellaisenaan.
   *
   * TEKSTI, KUVA JA LÄHTEET OVAT NOSTON OMAT eikä niitä ole
   * kirjoitettu uudelleen: `lunastus` → `teksti`, `otsikko` → `nappi`,
   * kuva kaikkine kenttineen entisellään.
   *
   * PAIKKA ON AINEISTON OMA, EI ARVATTU. Nostolla ei ollut
   * koordinaatteja, koska se piirtyi ruudun alalaidan liuskana, mutta
   * kohde tarvitsee paikan. Täkyraportti antaa sen itse
   * (docs/mantereet-tyoaineisto/takyt-sofia.md, täky 13): *"Ei
   * yksittäistä paikkaa — tapahtui eri puolilla keskustaa. Yleinen
   * sijainti: Sofian vanha kaupunki. n. 42.6977°N, 23.3219°E
   * (kaupungin keskusta, karttaviite)"*. Luvut on muunnettu laudan
   * yksiköiksi tiedoston alussa kuvatuilla kaavoilla. Piste osuu Sofian
   * laatan viereen, joten merkki niputtuu kaupungin sarakkeeseen samalla
   * passilla kuin muutkin lähimerkit (js/fokusniput.js).
   */
  {
    id: 'moskeijat',
    nimi: 'Sofian moskeijat',
    tyyppi: 'muu',
    symboli: 'historia',
    /* Valintakuplan painike: noston oma klikkiotsikko sellaisenaan. */
    nappi: 'Ukkosmyrsky peitti yön, jona seitsemän moskeijaa räjähti',
    // 23,3219 E / 42,6977 N — takyt-sofia.md, täky 13 (kaupungin keskusta).
    laudat: {
      maailmankartta: { x: 6610.7, y: 1695.6 },
      europe: { x: 659.0, y: 770.7 },
    },
    /* Faktat: takyt-sofia.md, täky 13 (VARMA, suora lainaus lähteestä). */
    teksti: 'Joulukuussa 1878, viisi vuotta isoisän käynnin jälkeen, '
      + 'venäläiset sotilasinsinöörit räjäyttivät seitsemän Sofian '
      + 'moskeijaa samana yönä; ukkosmyrsky peitti räjähdysten äänen. '
      + 'Suurin osa kaupungin moskeijoista tuhoutui sodassa, ja suurin '
      + 'osa muslimiväestöstä lähti kaupungista sen jälkeen.',
    lahde: 'en-Wikipedia "Sofia" (tarkistettu 25.8.2026 täkyraporttiin '
      + 'docs/mantereet-tyoaineisto/takyt-sofia.md, täky 13).',
    /*
     * Commons 25.8.2026: 700×485, public domain, tekijä tuntematon,
     * kuvaus "Баня баши джамия от края на 19 век", Category:Sofia in
     * the 19th century. Kuva näyttää sen moskeijan, joka jäi jäljelle.
     */
    kuva: {
      tiedosto: 'Banya bashi dhzamiya 19 vek.jpg',
      selite: 'Banja Bashin moskeija 1800-luvun lopun valokuvassa. Se on '
        + 'Sofian ainoa yhä toimiva moskeija.',
      lahde: 'Tuntematon kuvaaja, Wikimedia Commons (public domain)',
    },
  },
];

const BGR_TUNNUKSITTAIN = new Map(FOKUSKOHTEET_BGR.map((k) => [k.id, k]));

/**
 * Poimii Bulgarian kohteet tunnuksilla siinä järjestyksessä kuin ne on
 * pyydetty. Tuntematon tunnus jätetään pois hiljaa — sama sääntö ja
 * sama syy kuin Kreikassa: kirjoitusvirhe listassa ei saa kaataa koko
 * kaupungin virtaa.
 *
 * NIMI ON PREFIKSOITU (bgrFokuskohteet), koska yhden tiedoston versio
 * ketjuttaa kaikki moduulit samaan näkyvyysalueeseen: paljas
 * `fokuskohteet` olisi niputuksessa uudelleenjulistus Kreikan
 * vastaavan kanssa (tools/tarkista-niputus.mjs).
 */
export function bgrFokuskohteet(tunnukset) {
  return (tunnukset ?? []).map((id) => BGR_TUNNUKSITTAIN.get(id)).filter(Boolean);
}
