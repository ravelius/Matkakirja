/*
 * LONTOON FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-madrid.js:lle ja -wien.js:lle:
 * samat kentät, sama järjestys, sama moottori (js/fokusvirta.js).
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 28.8.2026): matkakirjan teksti ja
 * aarremerkinnän teksti ovat SANATARKASTI hänen kirjoittamansa — niitä
 * ei ole lyhennetty eikä sanajärjestystä muutettu. Luenta on sama
 * teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: kuningas Juhanan jalokivet, Wash-lahti 1216
 * (aarremerkintä).
 *
 * FAKTAPOHJA. Aalto 2:n maille EI ole takynostot-työaineistoa, joten
 * täyt, oppitunti, lehtitehtävät ja täkynosto on rakennettu kahdesta
 * lähteestä ja vain niistä:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Britannian maalehden nostot
 *      (js/packs/maa-kategoriat.js, GBR/luonto ja GBR/historia),
 *      Lontoon kaupunkilehden omat nostot (js/packs/
 *      kulttuuri-kategoriat.js, lontoo) ja nähtävyysjutut. Nämä on jo
 *      kertaalleen tarkistettu ja hyväksytty peliin.
 *   2. TARKISTETUT LISÄTIEDOT. Jokainen väite, jota pelidatassa ei
 *      ole, on haettu Wikipedian rajapinnasta 29.8.2026 ja katsottu
 *      KAHDESTA riippumattomasta lähteestä. Ne on nimetty kunkin
 *      kohdan omassa kommentissa. Mitään ei ole päätelty eikä
 *      pyöristetty.
 *
 * PÄÄLLEKKÄISYYS MAALEHDEN KANSSA ON TIETOINEN JA RAJATTU. Kaksi
 * ensimmäistä täkyä nostavat saman aiheen kuin Britannian maalehden
 * Luonto-sivu (vuorovesi ja Richmond Parkin hirvet), koska juuri ne
 * kaksi kytkeytyvät isoisän merkintään ja kohtaamiseen. Kaupunkilehden
 * omiin sivuihin — niihin, jotka pelaaja lukee samassa kulussa — EI
 * ole päällekkäisyyttä lainkaan.
 *
 * ── LIITURISTI ON TIETOINEN KIERRÄTYS ──────────────────────────────
 *
 * Merkinnän liituristi on isoisän vanha merkki, joka esiintyy myös
 * Berliinin kaaressa (motiivibudjetti Lontoo + Berliini). Se EI ole
 * uusi motiivi eikä sitä laajenneta täällä: Livia mainitsee sen
 * kerran, eikä yksikään täky rakennu sen varaan.
 *
 * ── KOLME OMISTAJAN KORJAUSTA (28.8.2026) ──────────────────────────
 *
 *   1. Matkakirjaan ei tule kuvaa (kuvat kuuluvat kaupunkilehteen).
 *   2. Livian kuva on kaupunkilehden avauskarusellin generoitu hero
 *      (js/packs/kulttuuri-kategoriat.js, lontoo/avauskuvat).
 *   3. Valinta-askelta ei ole: `valinta`-kenttää ei kirjoiteta.
 *
 * ── ÄÄNITE ──────────────────────────────────────────────────────────
 *
 * Luenta generoitiin 29.8.2026 (generoi-luennat-tyonkulku, ajo 3) ja
 * `matkakirja.aanite` osoittaa siihen. Teksti ja luenta ovat sanasta
 * sanaan samat — jos tekstia muutetaan, luenta generoidaan uusiksi.
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta
 * 29.8.2026 (olemassaolo, koko, lisenssi, tekijä, kuvaus,
 * Restrictions-kenttä). Kaikki ovat PD tai CC, ja tekijä on
 * `lahde`-rivillä. Ihmisiä sisältävät kuvat on katsottu silmin.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Jalustakysymys on Lontoon lehden sivun 2
 * ("Nykytaide") oman noston "Tyhjä jalusta ja 2 400 ihmistä" tekstiä
 * ja suojatiekysymys sivun 1 ("Lontoo") oman noston "Suojatie, jota
 * jonotetaan" tekstiä (js/packs/kulttuuri-kategoriat.js). Uusia
 * faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI SUMUKYSYMYSTÄ: kaupungin laattakysymys koskee sumua (ks.
 * KOHTAAMINEN alempana). Jos lehden aarteen avaava tehtävä kysyisi
 * samasta sumusta, kysymys olisi ratkaistu ennen kuin Ned on tavattu.
 */
const JALUSTA_VISA = {
  kysymys: 'Trafalgar Squaren luoteiskulman jalusta jäi 1841 tyhjäksi, '
    + 'eikä sille ole koskaan noussut pysyvää patsasta. Mikä siellä oli '
    + 'sadan päivän ajan kesällä 2009?',
  vaihtoehdot: [
    'Tavallisia ihmisiä, tunti kerrallaan',
    'Jäästä veistetty leijona',
    'Kaupungin suurin kukkaruukku',
  ],
  oikea: 0,
  fakta: 'Jalusta jäi tyhjäksi, koska rahat loppuivat kesken. Yli 150 '
    + 'vuoden väittelyn jälkeen päätettiin, ettei sille tule pysyvää '
    + 'patsasta lainkaan, vaan vaihtuvia nykytaideteoksia. Vuonna 2009 '
    + '2 400 ihmistä sai kukin tunnin jalustan päällä, yötä päivää.',
};

const SUOJATIE_VISA = {
  kysymys: 'Elokuun 8. päivänä 1969 neljä miestä käveli erään lontoolaisen '
    + 'suojatien yli kahdeksan kertaa peräkkäin. Miksi?',
  vaihtoehdot: [
    'Valokuvaaja tarvitsi kuvan levynkanteen',
    'He mittasivat kadun leveyttä',
    'Poliisi käännytti heidät joka kerta takaisin',
  ],
  oikea: 0,
  fakta: 'Kuvasta tuli The Beatlesin Abbey Road -levyn kansi, ja '
    + 'suojatiestä maailman kuuluisin: sillä on nykyään virallinen '
    + 'suojelumerkintä, ja taustan studiossa äänitetään yhä musiikkia.',
};

export const FOKUSVIRTA_LONTOO = {
  kaupunki: 'lontoo',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /*
     * Paikkarivi on kirjoittajan oma. Kuukausi seuraa oppitunnin
     * faktoja: Lontoon pahin sumu isoisän matkavuonna oli 7.–13.
     * joulukuuta 1873 (de-Wikipedia "Smog-Katastrophe in London 1952",
     * joka lainaa aikalaislehteä; ks. oppitunti). Sääkommentti on
     * isoisän havainto eikä mitattu väite.
     *
     * ILMAPUNTARIA EI MAINITA, vaikka se sopisi ilmiöön. Kaanoni
     * (docs/isoisan-raamattu.md, motiivilangat) varaa mittausmotiivin
     * Alpeille ja sallii sille vain 1–2 paluuta, ja paluu on käytetty
     * Wienissä (js/packs/fokusvirta-wien.js paikkarivi).
     */
    paikkarivi: 'Lontoo, joulukuussa 1873. Sumu niin sakea, ettei kadun '
      + 'toista puolta erota.',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Lontoossa sumu syö äänet ja kaupunki puhuu silti. Kirjasin '
      + 'ensimmäiselle sivulle säännön, jonka annan sinullekin: älä usko '
      + 'ketään, joka väittää, ettei aarteita ole. Piirsin kulmaan pienen '
      + 'ristin liidulla — merkiksi itselleni, että tarkoitan sitä.',
    luenta: '[curious] Lontoossa sumu syö äänet ja kaupunki puhuu silti. '
      + '[softly] Kirjasin ensimmäiselle sivulle säännön, jonka annan '
      + 'sinullekin: älä usko ketään, joka väittää, ettei aarteita ole. '
      + '[whispers] Piirsin kulmaan pienen ristin liidulla — merkiksi '
      + 'itselleni, että tarkoitan sitä.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-lontoo.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * LIVIAN MAADOITUS — VÄLITTÄJÄOTE (Raamattu, "LIVIA AIKASIIRTYMÄN
     * VÄLITTÄJÄNÄ — PARIPERIAATE"). Merkintä ei ole synkkä vaan luja:
     * isoisä antaa säännön ja vannoo sen liidulla. Livia ei siis
     * pehmennä vaan asettuu säännön puolelle — ja ottaa aikaeron
     * hoitaakseen faktalla.
     *
     * FAKTAKURI: kolme väitettä, kaikki tarkistettavia. (1) Lontoon
     * sumu oli kivihiilen savua (js/packs/maa-kategoriat.js, GBR/
     * luonto, "Sumu, joka ei ollutkaan sumua"). (2) Pahin savusumu
     * alkoi 5.12.1952 ja neljä vuotta myöhemmin säädettiin laki, jonka
     * nojalla kaupunginosia voitiin määrätä savuttomiksi (sama nosto).
     * (3) Joulukuusta 1873 on yli sataviisikymmentä vuotta.
     *
     * ISOISÄ OSOITTAUTUU OIKEAKSI, ja se on tässä tarkoitus:
     * tests/fokusvirta.test.mjs vaatii, että ainakin yhdessä
     * kaupungissa Livia myöntää isoisän olleen oikeassa — Lontoo on
     * paras paikka siihen, koska merkintä on nimenomaan uskomisesta.
     *
     * PUHEKIELIPASSI: lyhentymät vain reunoilla ("Kääk", "Mut"),
     * keskellä sanat auki; pronominit kokonaisina; ei huutomerkkejä.
     */
    maadoitus: 'Kääk. Sumu, joka syö äänet — meidän suku ei sellaisesta '
      + 'pidä, kirjettä ei kanneta korva edellä. Ja isoisäsi oli '
      + 'oikeassa siinä, mitä hän nenällään haistoi: se ei ollut säätä '
      + 'vaan kivihiilen savua. Siitä joulukuusta on yli '
      + 'sataviisikymmentä vuotta. Pahin savusumu tuli vasta 1952, ja '
      + 'neljä vuotta myöhemmin säädettiin laki, jolla kaupunginosia '
      + 'voitiin määrätä savuttomiksi. Siitä liiturististä ei ole '
      + 'jäljellä mitään. Mut sen säännön minä kyllä pidän.',
    /*
     * Huomio viittaa herokuvan kohteeseen (Westminsterin palatsi).
     * Faktat ovat lehden oman avauskuvan selitteestä (js/packs/
     * kulttuuri-kategoriat.js, lontoo/avauskuvat): palatsi
     * rakennettiin uudelleen vuoden 1834 palon jälkeen ja Big Ben on
     * lyönyt tunteja vuodesta 1859. Kellon paino ja tornin korkeus
     * ovat pelin omasta Lontoo-aineistosta (js/packs/nahtavyysjutut.js,
     * "Big Ben").
     */
    teksti: 'Tuo talo tuolla oli pystyssä jo isoisäsi kävellessä: '
      + 'Westminsterin palatsi rakennettiin uudelleen vuoden 1834 palon '
      + 'jälkeen, ja sen kellotornin Big Ben on lyönyt tunteja vuodesta '
      + '1859. Sumussa tornia ei näkynyt lainkaan — kuului vain '
      + 'kolmentoista ja puolen tonnin kello. Katso ensin tonne ylös.',
    kuva: {
      ampari: 'herokoe/hero-lontoo-westminster-thames.jpg',
      selite: 'Westminsterin palatsi rakennettiin uudelleen vuoden 1834 '
        + 'palon jälkeen, ja sen kellotornin Big Ben on lyönyt tunteja '
        + 'vuodesta 1859.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: kohtaamisen hahmo on jokilöytäjä Ned, ja
       * tämä on hänen työnsä. Täky on myös aarremerkinnän vastapari —
       * merkintä kertoo vuorovedestä, joka hautaa, tämä täky
       * vuorovedestä, joka paljastaa.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, GBR/luonto, nosto "Joki,
       * joka laskee joka päivä" (jo hyväksyttyä pelidataa) —
       * vuorovesiraja Teddingtonissa, noin seitsemän metrin vaihtelu,
       * mudlarkit, satamaviranomaisen luvat, lupamyynnin keskeytys
       * 2022 ja avaus 2024 enintään 4 000 luvalla, yli kolmesataa
       * vuotta vanhojen löytöjen ilmoitusvelvollisuus. Tähän ei ole
       * lisätty yhtään uutta faktaväitettä: aihe on maalehdessä, ja
       * täky kertoo sen isoisän merkinnän kulmasta.
       */
      id: 'vuorovesi',
      nappi: 'Ranta, joka paljastuu kahdesti päivässä',
      otsikko: 'Thamesin laskuvesiranta',
      teksti: 'Se sumu, joka söi äänet, nousi joesta — ja se joki ei ole '
        + 'Lontoossa tavallinen joki. Thames on vuorovesijoki '
        + 'Teddingtonin sulkuun asti: vesi nousee ja laskee kahdesti '
        + 'vuorokaudessa, keskustassa parhaimmillaan noin seitsemän '
        + 'metriä. Laskuveden aikaan kivinen ranta paljastuu keskellä '
        + 'miljoonakaupunkia, ja sinne lasketaan portaita pitkin '
        + 'etsimään savipiippuja ja astiansirpaleita. Etsijöitä sanotaan '
        + 'mudlarkeiksi, ja ammatti on isoisääsi vanhempi. Ranta ei '
        + 'silti ole vapaata riistaa: lupa on ostettava '
        + 'satamaviranomaiselta, ja kun lupia oli kertynyt yli 5 000, '
        + 'myynti keskeytettiin vuonna 2022. Se avattiin uudelleen 2024, '
        + 'mutta lupia jaetaan enintään 4 000. Yli kolmesataa vuotta '
        + 'vanhat löydöt on ilmoitettava Lontoon museolle — joki antaa, '
        + 'mutta se mitä se antaa, ei aina jää löytäjälle.',
      /*
       * Commons 29.8.2026: 5184×3456, CC BY 2.0, Tim Sheerman-Chase,
       * kuvattu 23.9.2023, kuvaus "Mudlarks by Millennium Bridge".
       * Restrictions tyhjä. SILMÄTARKISTUS tehty: rannalla kumartuu
       * etsijöitä kaukaisina hahmoina, ei tunnistettavia kasvoja.
       * Kuva on pelin omasta aineistosta (sama tiedosto GBR/luonto).
       */
      kuva: {
        tiedosto: 'Mudlarks by Millennium Bridge.jpg',
        selite: 'Mudlarkeja Thamesin rannalla Millennium Bridgen '
          + 'kohdalla. Ranta paljastuu kahdesti vuorokaudessa.',
        lahde: 'Tim Sheerman-Chase, Wikimedia Commons (CC BY 2.0)',
      },
      visa: {
        kysymys: 'Kuinka paljon veden pinta vaihtelee Thamesissa Lontoon '
          + 'keskustan kohdalla?',
        vaihtoehdot: [
          'Parhaimmillaan noin seitsemän metriä',
          'Noin puoli metriä',
          'Vesi ei vaihtele lainkaan kaupungin kohdalla',
        ],
        oikea: 0,
        fakta: 'Vuorovesi ulottuu Teddingtonin sulkuun asti. Rannalla '
          + 'saa etsiä vain satamaviranomaisen luvalla, ja yli '
          + 'kolmesataa vuotta vanhat löydöt on ilmoitettava Lontoon '
          + 'museolle.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja).
       *
       * FAKTAT: js/packs/maa-kategoriat.js, GBR/luonto, nosto
       * "Kuusisataa hirveä aidan sisällä" (jo hyväksyttyä pelidataa).
       * Aineiston luvut sellaisinaan: kolmentoista kilometrin tiiliaita,
       * noin 630 saksanhirveä ja kuusipeuraa, Kaarle I 1637, kiima
       * syys-lokakuussa, laumanhoito marras- ja helmikuussa, kuusipeurat
       * Uuteen-Seelantiin 1867 ja 1876.
       *
       * MIKSI TÄMÄ TÄKY TÄHÄN KAUPUNKIIN: vuosiluvut 1867 ja 1876
       * sulkevat isoisän matkavuoden väliinsä — puistosta lähti
       * laivalla eläimiä maailman toiselle puolelle juuri niinä
       * vuosina, joina hän kulki Lontoon läpi.
       */
      id: 'hirvet',
      nappi: 'Kuusisataa hirveä tiiliaidan sisällä',
      otsikko: 'Richmond Parkin lauma',
      teksti: 'Sumun ja kivihiilen kaupungissa on kulman takana toinen '
        + 'maailma. Richmond Park on Lontoon kuninkaallisista puistoista '
        + 'suurin, ja sen kolmentoista kilometrin tiiliaidan sisällä '
        + 'kulkee vapaana noin 630 saksanhirveä ja kuusipeuraa. Kuningas '
        + 'Kaarle I aitasi alueen hirvenmetsästystä varten vuonna 1637, '
        + 'ja aita seisoo yhä. Syys-lokakuussa urokset karjuvat '
        + 'kiima-aikaan niin, että ääni kuuluu puiston laidalle asti. '
        + 'Marraskuussa ja helmikuussa laumasta kaadetaan noin '
        + 'kaksisataa eläintä, jotta laidun riittää lopuille. Ja jotain, '
        + 'mikä sattuu isoisäsi matkan molemmin puolin: vuosina 1867 ja '
        + '1876 puistosta lähetettiin kuusipeuroja laivalla '
        + 'Uuteen-Seelantiin, ja ne olivat koko maan ensimmäiset '
        + 'kuusipeurat.',
      /*
       * Commons 29.8.2026: 1600×1430, CC BY-SA 2.0, Russel Wills,
       * kuvattu 5.10.2013, kuvaus "Red deer stag roaring in Richmond
       * Park". Restrictions tyhjä. SILMÄTARKISTUS tehty: kuvassa on
       * karjuva hirviuros nurmella, ei ihmisiä. Kuva on pelin omasta
       * aineistosta (sama tiedosto GBR/luonto).
       */
      kuva: {
        tiedosto: 'Red deer stag roaring in Richmond Park - geograph.org.uk - 3711560.jpg',
        selite: 'Saksanhirven uros karjuu Richmond Parkissa kiima-aikaan '
          + 'syksyllä. Aidatun puiston laumassa on noin 630 eläintä.',
        lahde: 'Russel Wills, Wikimedia Commons (CC BY-SA 2.0)',
      },
      visa: {
        kysymys: 'Miksi kuningas Kaarle I aitasi Richmond Parkin vuonna '
          + '1637?',
        vaihtoehdot: [
          'Hirvenmetsästystä varten',
          'Suojatakseen kaupunkia kulkutaudeilta',
          'Kasvattaakseen siellä kuninkaan lampaita',
        ],
        oikea: 0,
        fakta: 'Puistosta lähetettiin kuusipeuroja laivalla '
          + 'Uuteen-Seelantiin vuosina 1867 ja 1876. Ne olivat maan '
          + 'ensimmäiset kuusipeurat.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisän sääntö on "älä usko ketään, joka
       * väittää, ettei aarteita ole". Tämä on Lontoon oma todiste —
       * kellarista kaivettu laatikko, jota kukaan ei osannut odottaa.
       * Sattumalta myös kellotarina: aarteen omituisin esine on kello,
       * ja Nedin löytö kaaressa on taskukello.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Cheapside Hoard" (johdanto, osiot "Location",
       *     "Hoard" ja "London Museum"): löytö 1912, kirvesmiehet
       *     kellarissa osoitteessa 30–32 Cheapside Friday Streetin
       *     kulmassa, puinen laatikko, yli 400 esinettä, kivet ympäri
       *     maailmaa, omenankokoinen kolumbialainen smaragdi jonka
       *     sisään oli sovitettu noin vuoden 1600 sveitsiläinen
       *     kellokoneisto (signeeraus G. Ferlite), Staffordin
       *     viscountin sinettikivi ajoittaa kätkennän marraskuun 1640
       *     ja syyskuun 1666 väliin, ostajana panttilainaaja George
       *     Fabian Lawrence eli "Stoney Jack", pääosa Lontoon museoon.
       *   - Victoria and Albert Museumin oma esinetieto (M.1140-1926),
       *     luettuna Commonsin imageinfosta alla olevan kuvan
       *     kuvauksesta: sama löytövuosi 1912 ja sama osoite 30–32
       *     Cheapside.
       * Kris Lanen arvelu lastin alkuperästä on lähteessä merkitty
       * arveluksi, joten sitä EI kerrota.
       */
      id: 'cheapside',
      nappi: 'Laatikko, joka odotti kellarissa kolmesataa vuotta',
      otsikko: 'Cheapsiden kätkö',
      teksti: 'Isoisäsi sääntö sai Lontoossa todisteen — vain '
        + 'nelisenkymmentä vuotta hänen käyntinsä jälkeen. Vuonna 1912 '
        + 'työmiehet hakkasivat hakulla kellarin lattiaa osoitteessa '
        + '30–32 Cheapside, Friday Streetin kulmassa, ja lattian alta '
        + 'tuli puinen laatikko. Sen sisällä oli yli neljäsataa '
        + 'korukappaletta: sormuksia, rintaneuloja, ketjuja, hajuvesipulloja '
        + 'ja kameoita. Kivet olivat ympäri maailmaa — smaragdi '
        + 'Kolumbiasta, topaasi Brasiliasta, timantti Intiasta, rubiini '
        + 'Burmasta, lapislatsuli Afganistanista, turkoosi Persiasta, '
        + 'helmet Bahrainista. Oudoin esine on omenan kokoinen '
        + 'kolumbialainen smaragdi, joka oli koverrettu ontoksi ja jonka '
        + 'sisään oli sovitettu noin vuoden 1600 sveitsiläinen '
        + 'kellokoneisto. Yksi pieni sinettikivi kertoo, milloin '
        + 'laatikko pantiin maahan: siinä on Staffordin viscountin '
        + 'vaakuna, jonka hän sai marraskuussa 1640, ja kellarin päällä '
        + 'ollut talo paloi Lontoon suurpalossa syyskuussa 1666. Jossain '
        + 'noiden kahden päivän välissä joku kaivoi laatikon lattiaansa '
        + 'eikä koskaan palannut hakemaan sitä.',
      /*
       * Commons 29.8.2026: 4252×2329, CC0, Vassil, kuvattu 11.4.2019,
       * kuvaus "Necklace with interlinking lovers knots, gold with
       * white enamel, England, 1590-1620. It's an item of the Cheapside
       * Hoard, found in 1912 during the demolition of an old building on
       * 30-32 Cheapside in London. Victoria and Albert Museum, no. M.
       * 1140-1926." Restrictions tyhjä. SILMÄTARKISTUS tehty: kuvassa on
       * vain koru mustalla pohjalla.
       */
      kuva: {
        tiedosto: 'Victoria and Albert Museum Jewellery 11042019 Necklace Enamelled gold Lovers knots Cheapside Hoard 3037.jpg',
        selite: 'Cheapsiden kätköstä löytynyt kaulaketju, kultaa ja '
          + 'valkoista emalia, tehty Englannissa 1590–1620.',
        lahde: 'Vassil, Wikimedia Commons (CC0)',
      },
      visa: {
        kysymys: 'Mikä oli Cheapsiden kätkön omituisin esine?',
        vaihtoehdot: [
          'Onttoon smaragdiin sovitettu kellokoneisto',
          'Kivestä veistetty pienoislaiva',
          'Kultainen kruunu ilman kiviä',
        ],
        oikea: 0,
        fakta: 'Sinettikivessä oleva vaakuna ajoittaa kätkennän '
          + 'marraskuun 1640 ja syyskuun 1666 välille. Pääosa löydöstä '
          + 'on nykyään Lontoon museossa.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa kohtaamisen laattakysymyksen (js/tyohuone-kehitys-data.js
   * KAARI_PAKETIT, lontoo): mistä isoisän sumu oikeasti syntyi.
   * Visasääntö täyttyy — vastaus on tekstissä, mutta kysymyksen
   * sanamuoto ei toistu siinä sellaisenaan.
   *
   * FAKTAT (tarkistettu 29.8.2026 kahdesta riippumattomasta lähteestä):
   *   - en-Wikipedia "19th-century London", sumua käsittelevä osio
   *     (lähteenä Peter Ackroyd, London: The Biography, 2000, s.
   *     427–428): rikkidioksidi ja noki sekoittuivat Thamesin laakson
   *     kosteuteen; kerros ulottui noin 75 metrin korkeuteen; väri
   *     yleensä kellanvihreä mutta myös ruskea, musta, oranssi tai
   *     harmaa; katulyhdyt jouduttiin sytyttämään keskellä päivää;
   *     vuonna 1873 yhdeksäntoista ihmistä hukkui pudottuaan sumussa
   *     jokeen, kanavaan tai satama-altaaseen; sumu oli pahimmillaan
   *     marraskuussa; Charles Dickens nuoremman Dictionary of London
   *     (1879) nimitti ilmiötä nimellä London particular.
   *   - de-Wikipedia "Smog-Katastrophe in London 1952", osio ennen
   *     vuotta 1952 (lähteinä aikalaislehdet ANNO-arkistosta): sumu
   *     kesti 7.–13. joulukuuta 1873; wieniläinen Die Presse kertoi
   *     12.12.1873, että yhdeksäntenä päivänä Lontoon yllä makasi lähes
   *     koko päivän pikimusta sumu, päivä muuttui yöksi, koko liikenne
   *     pysähtyi, junat myöhästyivät ja Thamesin höyrylaivat joutuivat
   *     keskeyttämään kulkunsa; 16.12.1873 sama lehti kirjoitti, että
   *     Lontoo on sellaisen sumun peitossa, jollaista tämä sukupolvi ei
   *     ole nähnyt.
   *
   * IKÄSOPIVUUS (13+): kuolemat kerrotaan lukuina eikä kuvauksina, ja
   * vain siksi, että ne ovat syy, jonka takia sumusta lopulta
   * päästiin.
   */
  oppitunti: {
    otsikko: 'London particular — sumu, joka ei ollut säätä',
    teksti: 'Lontoon sumu ei tullut mereltä vaan savupiipuista. '
      + 'Rikkidioksidi ja noki sekoittuivat Thamesin laakson kosteuteen '
      + 'ja tekivät rasvaisen, kirpeän kerroksen, joka ylsi noin '
      + 'seitsemänkymmenenviiden metrin korkeuteen kadun yläpuolelle. '
      + 'Tavallisin väri oli kellanvihreä — siitä nimi hernekeittosumu — '
      + 'mutta se saattoi olla myös ruskea, musta, oranssi tai harmaa. '
      + 'Pahimmillaan katulyhdyt jouduttiin sytyttämään keskellä päivää. '
      + 'Isoisäsi matkavuoden sumu oli poikkeuksellinen: se makasi '
      + 'kaupungin päällä 7.–13. joulukuuta 1873. Wieniläinen Die Presse '
      + 'kertoi 12. joulukuuta, että yhdeksäntenä päivänä Lontoon yllä '
      + 'oli lähes koko päivän pikimusta sumu, päivä muuttui yöksi, koko '
      + 'jättikaupungin liikenne pysähtyi, junat myöhästyivät ja '
      + 'Thamesin höyrylaivat joutuivat keskeyttämään kulkunsa. Neljä '
      + 'päivää myöhemmin sama lehti kirjoitti, että Lontoo on sellaisen '
      + 'sumun peitossa, jollaista tämä sukupolvi ei ole nähnyt. Sumu '
      + 'oli myös vaarallinen: samana vuonna yhdeksäntoista ihmistä '
      + 'hukkui pudottuaan sumussa jokeen, kanavaan tai satama-altaaseen. '
      + 'Charles Dickensin poika kirjoitti kuusi vuotta myöhemmin '
      + 'Lontoon-sanakirjassaan, että sellaisena päivänä onnellisin on '
      + 'se, joka voi jäädä kotiin.',
    /*
     * Commons 29.8.2026: 2323×1586, public domain, George Du Maurier
     * (1834–1896), julkaistu Punch-lehdessä 1889, kuvaus "Window
     * Studies, a Harmony in London Smut. A coal cart and chimney sweep
     * viewed through a London fog." Restrictions tyhjä. SILMÄTARKISTUS
     * tehty: kaiverruksessa on hiilikärry ja nuohooja sumussa.
     *
     * MIKSI JUURI TÄMÄ KUVA: se näyttää saman asian kuin oppitunnin
     * ydin — hiilen ja sumun samassa ruudussa. Vuosi 1889 on kuusitoista
     * vuotta isoisän käynnin jälkeen, ja selite sanoo sen.
     */
    kuva: {
      tiedosto: 'Du Maurier London fog.jpg',
      selite: 'Hiilikärry ja nuohooja lontoolaisessa sumussa vuoden 1889 '
        + 'Punch-lehden kaiverruksessa, kuusitoista vuotta isoisän '
        + 'käynnin jälkeen.',
      lahde: 'George Du Maurier 1889, Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   * Hahmo, kohtaamiskuva ja kysymys ovat tarinakaaren paketissa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, id 'lontoo'):
   * jokilöytäjä Ned etsii laskuveden liejusta sitä, minkä joki
   * pudottaa. Kysymys on v1308:ssa vaihdettu sumuun (ks. paketin oma
   * kommentti), jotta aarretehtävän AIHE kytkeytyy merkintään ja
   * oppituntiin — tämä kortti ei kertaa Nedin repliikkiä eikä paljasta
   * vastausta.
   *
   * LONTOON VANHA KOHTAAMINEN JÄÄ ENNALLEEN. js/packs/kohtaamiset.js
   * antaa Lontoolle jokietsijä Nedin, ja se rivi on pelin vanhan polun
   * kohtaaminen (js/visa.js). Hahmo on sama mies kuin kaaressa, joten
   * tässä ei ole kahta lupausta samasta ovesta — vain sama Ned kahdella
   * pinnalla. Kaaren kirjoitusasu "Jokilöytäjä" voittaa täällä, koska
   * kaari on fokusmoodin lähde.
   */
  kohtaaminen: {
    hahmo: 'Jokilöytäjä Ned',
    nappi: 'Tapaa jokilöytäjä',
    teksti: 'Ned lukee jokea kuin aikataulua: hän tietää tuntia tarkasti, '
      + 'milloin ranta paljastuu ja mistä kohtaa kannattaa aloittaa. '
      + 'Suvussa on etsitty samalta rannalta sata vuotta, ja hän tunnistaa '
      + 'savipiipun katkelmasta vuosisadan. Kiirettä hän ei pidä, koska '
      + 'joki ei pidä. Ennen kuin hän ojentaa löytönsä, hän haluaa '
      + 'tietää, onko vieras ymmärtänyt, mistä isoisän sumu oikeasti '
      + 'oli tehty.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA: MILLENNIUM BRIDGEN LASKUVESIRANTA. Kaaren teksti
   * vie isoisän laskuveden paljastamalle rannalle, ja pelin oma
   * Lontoo-aineisto osoittaa saman paikan: maalehden vuorovesinoston
   * kuva on nimeltään "Mudlarks by Millennium Bridge".
   *
   * 51,510173 N / −0,098438 E — en-Wikipedia "Millennium Bridge,
   * London", prop=coordinates (haettu 29.8.2026). Muunnos on sama kaava
   * ja samat vakiot kuin fokuskohteilla: maailmankartalla Millerin
   * lieriö LEVEYS 12000 / LON0 −175 / POHJOINEN 76
   * (tools/fokuskartta/piirto.js laudanProjektio), Euroopan laudalla
   * x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((−0,098438 − (−175)) mod 360) × (12000/360)
   *                     = 174,901562 × 33,3333… = 5830,1
   *                   y = (millerY(76) − millerY(51,510173)) × 12000/2π
   *                     = 1323,9
   *   europe          x = (−0,098438 + 11) × 19,2 = 209,3
   *                   y = (72 − 51,510173) × 26,3 = 538,9
   *
   * TARKISTUS LAATTAA VASTEN: Lontoon laatta on Euroopan laudalla
   * 209 / 539 ja maailmankartalla 5829,5 / 1324,1, eli piste osuu
   * käytännössä laatan päälle. Niin pitääkin — silta on kaupungin
   * keskellä, ja laudan yksikkö on maailmankartalla noin kolme
   * kilometriä.
   */
  kohtaamispiste: {
    nimi: 'Millennium Bridgen laskuvesiranta',
    laudat: {
      maailmankartta: { x: 5830.1, y: 1323.9 },
      europe: { x: 209.3, y: 538.9 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Lontoon sivupino (js/lehti.js
   * rakennaSivut) on Wienin mittainen, koska kaupungilla on kaksi
   * kulttuurikategoriaa ja maalla Menovinkit-sivu: 0 = etusivu,
   * 1 = kaupunkisivu "Lontoo", 2 = Nykytaide, 3 = Menovinkit.
   *
   * Sivun 2 oma tehtävä (Ai Weiwein auringonkukansiemenet) väistyy
   * nimetyn tieltä, joten sivulla on Raamatun vaatima yksi minitehtävä
   * eikä kahta. Sivun 1 kysymys on Lontoon kulttuurivisa (js/packs/
   * europe-kulttuuri.js), jonka js/fokustehtavat.js pukee samaksi
   * AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: JALUSTA_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: SUOJATIE_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Iso-Britannia) ----------
   *
   * UUSI POOLI, EI SIIRTO. Britannia ei ole js/fokusnosto.js:n
   * NOSTO_MAAT-taulussa, joten maalla ei ole ollut yhtään täkynostoa.
   * js/fokusnosto.js nostoMaanPooli lukee kaupungin oman
   * `takynostot`-kentän ENNEN maapoolia, joten uusi maa ei vaadi riviä
   * moottoriin — pooli syntyy tästä kentästä.
   *
   * MAAN KUPLATÄKY ON POOLIN KÄRKI: Livia huomauttaa tuikkivista
   * pisteistä kerran, ja huomio osuu poolin ensimmäiseen
   * katsomattomaan. Yksi nosto riittää tähän erään; järjestys on
   * silti merkitsevä, jos pooli myöhemmin kasvaa.
   *
   * MIKSI SUTTON HOO: isoisän merkintä antaa säännön aarteista, ja
   * aarremerkintä kertoo aarteesta, jota ei löydetty. Tämä on saman
   * saaren vastakohta — aarre, joka löydettiin, ja jonka löytäjä oli
   * itseoppinut mies 30 shillingin viikkopalkalla. Kohde on myös
   * samassa maankolkassa kuin isoisän oma etsintä.
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki, ks. yllä).
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Sutton Hoo", johdanto ja osiot "Mound 1",
       *     "Burial ship" sekä kaivaushistoria (lähteinä Carver 1998 ja
       *     Bruce-Mitford 1975): kaksi anglosaksista kalmistoa
       *     Woodbridgen lähellä Suffolkissa; Edith Pretty päätti 1937
       *     kaivauttaa kummut ja sai Ipswichin museon kautta
       *     itseoppineen Basil Brownin, jolle hän tarjosi asunnon ja 30
       *     shillingin viikkopalkan; laivahauta löytyi kummusta 1;
       *     puusta ei ollut jäljellä käytännössä mitään, mutta hiekkaan
       *     jäänyt värjäymä säilytti muodon ja lähes kaikki rautaniitit
       *     olivat paikoillaan; laiva oli 27 metriä pitkä, 4,4 metriä
       *     leveä, yhdeksän lankkua kummallakin puolella, 26 kaarta ja
       *     airopaikat noin neljällekymmenelle soutajalle;
       *     hautakammiosta löytyi kultaa ja jalokiviä, seremoniakypärä,
       *     kilpi, miekka, lyyra ja itäroomalaista hopeaa; Pretty
       *     palkkasi kaksi poliisia vartioimaan paikkaa vuorokauden
       *     ympäri; syksyn aarreoikeudenkäynti kyläntalolla katsoi, että
       *     koska aarretta ei ollut haudattu takaisin haettavaksi, se
       *     kuului maanomistajalle — ja Pretty lahjoitti sen kansalle.
       *   - en-Wikipedia "Sutton Hoo" -artikkelin oma tietolaatikko ja
       *     Rædwald-tulkinta, sekä National Trustin omistajuustieto
       *     samassa laatikossa (kohde on National Trustin hoidossa).
       *
       * MITÄ EI KERROTA: hautaan haudatun henkilöllisyys on lähteessä
       * tutkijoiden tulkinta ("scholars believe"), joten Rædwald
       * mainitaan arveluna eikä faktana.
       */
      id: 'sutton-hoo',
      nimio: 'Sutton Hoo',
      otsikko: 'Itseoppinut kaivaja 30 shillingin viikkopalkalla löysi '
        + 'laivan, josta ei ollut jäljellä yhtään lautaa',
      lunastus: [
        'Suffolkin Woodbridgen lähellä on kumpuja, joita kukaan ei ollut '
          + 'avannut. Maanomistaja Edith Pretty päätti 1937 kaivauttaa ne '
          + 'ja sai Ipswichin museon kautta avukseen Basil Brownin, '
          + 'itseoppineen arkeologin. Pretty tarjosi hänelle asunnon ja '
          + 'kolmenkymmenen shillingin viikkopalkan ja ehdotti, että hän '
          + 'aloittaisi suurimmasta kummusta. Brown aloitti kolmesta '
          + 'pienemmästä, jotka oli jo tyhjennetty, ja palasi vasta '
          + 'seuraavana kesänä siihen suureen.',
        'Kummun alta paljastui laiva, josta ei ollut jäljellä yhtään '
          + 'lautaa. Puu oli lahonnut kokonaan, mutta se oli värjännyt '
          + 'hiekan, ja lähes kaikki rautaniitit olivat omilla '
          + 'paikoillaan — muoto oli mitattavissa vaikka aine oli poissa. '
          + 'Alus oli 27 metriä pitkä ja 4,4 metriä leveä, yhdeksän '
          + 'lankkua kummallakin kyljellä, kaksikymmentäkuusi kaarta ja '
          + 'airopaikat noin neljällekymmenelle soutajalle. Keskellä '
          + 'ollut hautakammio oli täynnä: kultaa ja jalokiviä, '
          + 'seremoniakypärä, kilpi, miekka, lyyra ja itäroomalaista '
          + 'hopeaa. Kun uutinen vuoti, Pretty palkkasi kaksi poliisia '
          + 'vartioimaan kumpua vuorokauden ympäri. Saman syksyn '
          + 'aarreoikeudenkäynti kylätalolla päätti, että koska aarretta '
          + 'ei ollut haudattu takaisin haettavaksi, se kuului '
          + 'maanomistajalle. Pretty lahjoitti sen samana päivänä '
          + 'kansalle.',
      ],
      lahde: 'en-Wikipedia "Sutton Hoo", johdanto sekä osiot kaivauksesta '
        + 'ja kummusta 1 (lähteinä Carver 1998 ja Bruce-Mitford 1975); '
        + 'tarkistettu 29.8.2026.',
      /* Commons 29.8.2026: 1949×2791, public domain, käyttäjä Geni,
       * kuvaus "Photo of the Sutton Hoo helmet from the front in 2015".
       * Restrictions tyhjä. SILMÄTARKISTUS tehty: kuvassa on pelkkä
       * kypärä mustalla pohjalla. */
      valokuva: {
        tiedosto: 'Sutton Hoo helmet 2016.png',
        selite: 'Sutton Hoon seremoniakypärä, yksi laivahaudan '
          + 'löydöistä. Se on nykyään Britannian museossa.',
        lahde: 'Geni, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Miten laiva voi säilyä, jos puu on lahonnut kokonaan?',
        'Ketä Sutton Hoon laivahautaan haudattiin?',
        'Kuka Britanniassa omistaa maasta löytyvän aarteen?',
      ],
      // 52,0897 N / 1,3389 E — en-Wikipedia "Sutton Hoo",
      // prop=coordinates (haettu 29.8.2026).
      paikka: {
        nimi: 'Sutton Hoo',
        laudat: {
          maailmankartta: { x: 5878.0, y: 1298.1 },
          europe: { x: 236.9, y: 523.6 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: kuningas Juhanan
   * jalokivet, jotka upposivat Wash-lahdella 1216. Merkintä aukeaa,
   * kun aarre löytyy (js/fokusvirta.js fokusvirtaAarremerkinta).
   */
  aarremerkinta: {
    teksti: 'Washin lahdella vanha kalastaja näytti, missä kuningas '
      + 'Juhanan kuormasto upposi liejuun — vuorovesi oli syönyt sen '
      + 'kuudessasadassa vuodessa syvemmälle kuin yksikään lapio yltää. '
      + 'Kirjoitin luetteloon: tämä aarre ei ole kadonnut, se on vain '
      + 'kärsivällisempi kuin me.',
  },
};
