/*
 * Rakennustyön tilannetaulu työhuoneen etusivulle (omistajan toive
 * 8.8.2026: "yhteenveto, joka päivittyy, siitä missä tämänhetkinen
 * rakennustyö on menossa").
 *
 * TÄTÄ TIEDOSTOA PÄIVITTÄÄ FABLE aina, kun sessioilta saapuu
 * raportti tai työjono muuttuu — muut sessiot eivät kirjoita tähän.
 * Työhuone näyttää taulun etusivun kärjessä. Tilat: 'tyossa',
 * 'valmis', 'odottaa' (selväkielinen selite riville).
 */

export const TILANNE = {
  paivitetty: '9.8.2026',
  tavoite: 'EUROOPPA VALMIIKSI KAIKILTA OSIN (omistajan tilaus 9.8.): '
    + 'lehdet kuntoon ensin. Euroopan valmistuttua siirrytään suoraan '
    + 'Lähi-idän kaupunki- ja maalehtiin. Matkakirjan tarinapuoli on '
    + 'parkissa — siihen palataan myöhemmin.',
  rivit: [
    {
      tekija: 'Fable',
      rooli: 'tarina + koordinaatio',
      tila: 'tyossa',
      tehtava: 'Koordinointi ja raporttien kokoaminen. Euroopan '
        + 'tarinatekstit valmiit: 41 dekkarimerkintää äänineen, '
        + 'aarrevihjeet ilmansuunnittain, Lontoon kohtaamisluennat.',
      seuraavaksi: 'Uusin (9.8.): koko tekstipaketti viidelle '
        + 'kaupungille (Praha, Istanbul, Wien, Venetsia, Budapest) '
        + 'henkilöineen on Kehitys-välilehden ylimpänä osiona — '
        + 'jokaisessa saapuminen, kohtaaminen, visa, aarre ja '
        + 'henkilön vihje aarteen jälkeen. Odottaa omistajan lukua '
        + 'ennen äänien generointia. Kehitys-valikko järjestetty: '
        + 'uusin kokeilu ylimpänä, vanhat kootussa valikossa.',
    },
    {
      tekija: 'Opus 1',
      rooli: 'lehdet + rakenne',
      tila: 'tyossa',
      tehtava: 'Valmista (v435): Turkin, Irlannin, Portugalin ja '
        + 'Unkarin maalehdet (16 aihesivua, 64 juttua, 16 '
        + 'minitehtävää) sekä vaiheen B ensimmäinen siirto: Helsingin '
        + 'arki Suomen maalehteen, Helsingille jäi historia — lehti '
        + 'on nyt kolme sisältöruutua neljän sijaan.',
      seuraavaksi: 'Tehtävänanto 9.8. (Helsinki/Suomi-malli '
        + 'hyväksytty): vaiheen B siirrot loppuun maa kerrallaan → '
        + 'menovinkkiruudun irrotus kaupunkilehdestä (oma erä) → '
        + 'Suomen maalehden täydennys → vanhojen maalehtien '
        + 'minitehtävät (33 aihesivua) → Tromssa + 5 aluelehteä → '
        + 'valokuvakysymysten rajatapaukset (~50, Vasa-duplikaatti '
        + 'mukaan). Raportti erien välissä.',
    },
    {
      tekija: 'Opus 2',
      rooli: 'kartat + introt',
      tila: 'tyossa',
      tehtava: 'KARTTATYÖ VALMIS: kohdekartat 31/31 kaupungille ja '
        + 'Euroopan maakartat 29/29 — tarkistettu ohjelmallisesti '
        + 'molempiin suuntiin (9.8.). Ei yhtään lehteä ilman karttaa '
        + 'eikä karttaa ilman lehteä.',
      seuraavaksi: 'Tehtävänanto 9.8.: 1) jokirelaatioiden '
        + 'täyttökorjaus (Kiovan Dnepr, Pietarin Neva, Budapestin '
        + 'Tonava paremmiksi yhdellä työkalukorjauksella), 2) '
        + 'tv-jäämien siivous docs/tyolista-opukselle.md:stä, 3) '
        + 'Lähi-idän selvitysmuistio (maakarttatarpeet ja '
        + 'lehtikaupunkikandidaatit, ei vielä piirtoa).',
    },
    {
      tekija: 'Sonnet 1',
      rooli: 'QA + työhuone',
      tila: 'tyossa',
      tehtava: 'Loppu-QA-brief saatu 9.8.: kierros 1 nykyiselle '
        + 'mainille (linkit, lisenssit, duplikaatit, karttapisteet, '
        + 'äänet, muutosloki), kierros 2 myöhemmin uusille erille. '
        + 'Read-only — löydöt korjauslistaksi Fablelle.',
      seuraavaksi: 'Briefin erityiskohteet: Mercator-'
        + 'vääristymä karttapisteissä, curl+karttapiste-tarkistus, '
        + 'haikara/Vasa-kuvakaksoiskappaleet, roskapolkutesti, Flickr '
        + 'Commonsin "No restrictions" -lisenssimerkintä (tarkistin '
        + 'ei tunne, vaikka käytännössä PD) ja maakartat.js:n '
        + 'nimiVasen-kenttä (kommentti lupaa, toteutus puuttuu).',
    },
    {
      tekija: 'Sonnet 2',
      rooli: 'nähtävyysjutut',
      tila: 'tyossa',
      tehtava: 'Livenä 14 kaupunkia (uusimpina v436: Ateena, '
        + 'Amsterdam, Dublin). Jonossa Opus 2:n viisi karttaerää = '
        + '17 uutta kaupunkia, ~102 kohdetta (v427 Istanbul/'
        + 'Marseille/Edinburgh → v433 Kiova/Pietari/Moskova/Odessa).',
      seuraavaksi: 'Tehtävänanto 9.8.: kaikki viisi erää '
        + 'järjestyksessä, erä kerrallaan — Istanbul/Marseille/'
        + 'Edinburgh ensin, raportti erien välissä. Wiki-ansat '
        + 'muistissa: fi-wikin "Neitsyttorni" on Bakun torni '
        + '(Istanbulin kohde on Kız Kulesi) ja "Belém" Brasilian '
        + 'kaupunki (Lissabonissa kaupunginosa).',
    },
  ],
  odottaaPaatosta: [
    'Isoisän ääni ja visa/aarre-kaari: pilotti pelissä (v408, '
      + 'Edinburgh ja Pietari) — omistaja: "kaipaavat vielä '
      + 'työstöä, palataan myöhemmin". Euroopan laajennus odottaa.',
    'Kertoja- ja hahmoäänten valinta (kuuntele Kehitys-välilehden '
      + 'näytteet)',
    'Sateenvarjomiehen henkilöllisyys (ehdotus Kehitys-välilehden '
      + 'Iso kaari -osiossa)',
  ],
};

/**
 * Testattavaa juuri nyt: uusimmat ominaisuudet ja mistä ne löytää.
 * Fable päivittää tätä julkaisujen tahdissa — Testaa-välilehti
 * näyttää listan pelilinkkien vieressä. Uusin ensin.
 */
export const TESTATTAVAA = [
  {
    otsikko: 'Koko paketti: 5 kaupunkia ja henkilöt (työhuone)',
    ohje: 'Työhuone → Kehitys → ylin osio: Praha, Istanbul, Wien, '
      + 'Venetsia ja Budapest koko kaarena — saapuminen (isoisän '
      + 'ääni), kohtaaminen nimetyn henkilön kanssa, visa, aarre ja '
      + 'henkilön vihje vasta aarteen jälkeen (cliffhanger). Lue ja '
      + 'kerro, mitkä osat luetaan ääneen. Vanhat kokeilut ovat nyt '
      + 'kootussa Vanhat kokeilut -valikossa saman välilehden alla.',
  },
  {
    otsikko: 'Visat palkitsevat taas puntina (v400)',
    ohje: 'Omistajan päätös: raha on yksinkertaisin. Kulttuurivisa '
      + 'antaa +25 ja lehden minitehtävä +10 puntaa kuten ennenkin '
      + '— v399:n tietopistekokeilu peruttiin saman tien.',
  },
  {
    otsikko: 'Kaupunkilehtiä nyt kahdeksalla (v394–v398)',
    ohje: 'Berliini, Venetsia, Tukholma ja Pariisi saivat täyden '
      + 'lehtimallin (kansi + aihesivut): mm. Tukholman Kadut ja '
      + 'sulut sekä Eläimet kaupungissa, Pariisin kukko ja '
      + 'kellotorni. Aihesivut väistävät maalehtien aiheita — '
      + 'sama juttu ei toistu kahdessa lehdessä.',
  },
  {
    otsikko: 'Uudet väliversiot tyhjältä pöydältä (työhuone)',
    ohje: 'Työhuone → Kehitys → Uudet väliversiot: kuusi kaupunkia '
      + '(Edinburgh, Pariisi, Wien, Ateena, Pietari, Rooma) '
      + 'kirjoitettu kokonaan uusin kuvin suoraan välimittaan, '
      + 'vanha peliteksti rinnalla. Lue ja kerro, tuntuuko outous '
      + 'poistuneen — luennat tulevat heti kun ääniavain on '
      + 'käytössä.',
  },
  {
    otsikko: 'Nähtävyyskortti pohjaan asti puhelimella (v397)',
    ohje: 'Avaa kaupunkikartalta mikä tahansa nähtävyysjuttu '
      + 'iPhonella: kortti ulottuu nyt ruudun alareunaan asti '
      + '(pieni rako vain ylhäällä), eikä alle jää tyhjää. '
      + 'Pitkä juttu rullaa kortin sisällä.',
  },
  {
    otsikko: 'Maan i laudalla ja alareunan sisällys (v390)',
    ohje: 'Kartalla nykyisen maan nimen perässä on nyt aina i, '
      + 'joka avaa maalehden — ei enää erillistä tilaa. Maalehti '
      + 'aukeaa suoraan sisältöön, ja hampurilainen nostaa '
      + 'sisällyksen alalaidasta pop-upina niin että sivu jää '
      + 'näkyviin. Mittakokeilut (lyhyt vs väli) ovat työhuoneen '
      + 'Kehitys-välilehdellä.',
  },
  {
    otsikko: 'Maalehteen kolme reittiä (v382)',
    ohje: 'Kartan oikeassa ylälaidassa on nyt Maiden lehdet -nappi '
      + '(avoin kirja + i): rajat näkyviin, maan nimen i avaa '
      + 'lehden — ilman varustetta. Kaupunkilehdessä on nyt myös '
      + 'hampurilaisvalikko, jossa maan osio on omana rivinään.',
  },
  {
    otsikko: 'Prahan kaupunkilehti — uusien kaupunkien malli (v378)',
    ohje: 'Matkusta Prahaan: kansi, Musiikki, Arki ja tavat, '
      + 'menovinkit ja luvut — tämä viisisivuinen malli monistuu '
      + 'lopuille 35 kaupungille. Katso kelpaako jälki.',
  },
  {
    otsikko: 'Nähtävyysjutut kaikissa karttakaupungeissa (v376–v381)',
    ohje: 'Avaa Kairon, Venetsian, Madridin, Tukholman tai Lontoon '
      + 'kaupunkikartta ja napauta numeroita: jokaisella kuudella '
      + 'kohteella on nyt Berliinin mallin mukainen juttu — myös '
      + 'Lontoon vanhat pitkät jutut on tiivistetty samaan '
      + 'muotoon (lainaukset säilyivät).',
  },
  {
    otsikko: 'Saksan menovinkit — ARVIOI MALLI (v373)',
    ohje: 'Avaa Saksan menovinkit: 21 kohdetta kuudessa ryhmässä, '
      + 'mm. uusi Valokuvausnäyttelyt-ryhmä (Sander, Blossfeldt, '
      + 'Folkwang). HUOM: malli rakennettiin ennen kuin 6–10 '
      + 'kohteen ohjeesi ehti perille — päätä nähtyäsi, '
      + 'karsitaanko 6–10 parhaaseen vai kelpaako tämä laajuus '
      + 'ryhmiteltynä.',
  },
  {
    otsikko: 'Berliinin menovinkit listamallina — KATSO UUDESTAAN (v368)',
    ohje: 'Avaa Berliinin kaupunkilehden viimeinen sivu: menovinkit '
      + 'ovat nyt listaa ryhmäotsikoin, pikkukuvin ja linkein — '
      + 'sama malli nyt kaikissa maissa. HUOM: varmista ensin että '
      + 'pelin alakulmassa lukee v368 — jos ei, sulje ja avaa peli '
      + 'pari kertaa, niin uusi versio latautuu.',
  },
  {
    otsikko: 'Berliinin nähtävyysjutut korjattu — KATSO UUDESTAAN (v367)',
    ohje: 'Avaa Berliinin kaupunkikartta ja napauta numeroita: '
      + 'pop-up istuu nyt näytölle (tausta näkyy reunoilla, '
      + 'yläreuna ei leikkaudu — testattu myös iPadin mitoissa), '
      + 'kuvat ovat pieniä lohkoja tekstin välissä ja jutut '
      + 'puolta lyhyemmät. Lainaukset säilyivät. Jos jokin vielä '
      + 'häiritsee, kerro Fablelle — hionta tehdään suoraan.',
  },
  {
    otsikko: 'Maalehti uusiksi: sisällysluettelo ja Unohdettu aarre (v366)',
    ohje: 'Avaa Saksan lehti: etusivu on nyt sisällysluettelo '
      + '(pikkukuva + otsikko + ingressi kahdessa palstassa), '
      + 'kartta omalla sivullaan, hampurilaisnappi avaa saman '
      + 'luettelon mistä tahansa. Nappien alla lukee minne ne '
      + 'vievät. Ruokasivu on nyt Ruokaa ja tapakulttuuria '
      + '(Kirchnerin ja Ritterin maalaukset), ja lehden nimi on '
      + 'kaikkialla Unohdettu aarre.',
  },
  {
    otsikko: 'Menovinkkien listamalli ja iloisempi visa (v363)',
    ohje: 'Katso Suomen menovinkit: uusi listamalli ryhmäotsikoin '
      + '(pikkukuva + nimi linkkinä + lause pari). Alapalkissa '
      + 'Poistu on nyt aina vasemmalla ja Seuraava oikealla, ja '
      + 'tietovisa on oma lämpimänvaalea korttinsa. Osa maista '
      + 'näyttää vielä vanhaa nostomallia — muunnos on jonossa. '
      + 'Menovinkit löytyvät nyt 12 uudelta maalta.',
  },
  {
    otsikko: 'Kaupunkikarttojen uusi ilme (v362)',
    ohje: 'Avaa mikä tahansa kuudesta kaupunkikartasta: kartta on '
      + 'nyt vaaleampi tausta ja numerot pääosassa, ympyröiden '
      + 'tausta hiekanvaalea, OSM-rivi pikkuruinen. Pöytäkoneella '
      + 'vie hiiri numeron päälle — kohteen nimi tulee '
      + 'selosteeseen. Kosketuslaitteella napautus toimii kuten '
      + 'ennen.',
  },
  {
    otsikko: 'Berliinin nähtävyysjutut — PILOTTI (v358)',
    ohje: 'Avaa Berliinin kaupunkikartta ja napauta numeroympyröitä: '
      + 'kuusi kohdetta sai omat jutut kuvineen ja lainauksineen '
      + '(mm. Reaganin muurinpuhe). Tämä on Sonnetin pilotti — '
      + 'katso jälki ja päätä, jatketaanko muihin kaupunkeihin.',
  },
  {
    otsikko: 'Työhuone uusiksi (v356)',
    ohje: 'Työhuoneessa on nyt viisi välilehteä: Tilanne (tämä '
      + 'taulu + muutosloki), Testaa (tämä lista + pelilinkit '
      + 'suoraan lautoihin), Kehitys, Kaupungit ja Studio.',
  },
  {
    otsikko: 'Espanjan ja Ruotsin kartat (v354–v355)',
    ohje: 'Matkusta Madridiin ja Tukholmaan: korkokartat, '
      + 'kohdekartat ja maaintrot samaan tapaan kuin Italiassa.',
  },
  {
    otsikko: 'Menovinkit kaikilla lehtimailla (v353)',
    ohje: 'Avaa minkä tahansa lehtimaan kaupunkilehti: viimeinen '
      + 'aihesivu on nyt Menovinkit myös Berliinissä, Pariisissa, '
      + 'Roomassa ja Kairossa — ei vain Lontoossa.',
  },
  {
    otsikko: 'Kehitys-välilehti työhuoneessa (v352)',
    ohje: 'Työhuone → Kehitys: kuuntele kertoja- ja hahmoääninäytteet '
      + '(valinta odottaa sinua), lue ison kaaren essee ja '
      + 'mannerkokeilut. Sateenvarjomies-ehdotus on Iso kaari '
      + '-osiossa.',
  },
  {
    otsikko: 'Italian kartat ja intro (v351)',
    ohje: 'Matkusta Italiaan: korkokartta, Venetsian kohdekartta ja '
      + 'uusi maaintro. Vertaa jälkeä Egyptin karttoihin.',
  },
  {
    otsikko: 'Lehtijako ja kohtaaminen lopussa (v350)',
    ohje: 'Avaa Lontoo: kaupunkilehti on nyt 5 sivua ja maalehti '
      + 'erikseen (Iso-Britannia-osio). "Tapaa jokietsijä" näkyy '
      + 'vasta viimeisellä sivulla. Katso myös nähtävyysjutut: '
      + 'kaupunkikartan numeroympyrät avaavat artikkelin.',
  },
  {
    otsikko: 'Maiden tiedot -varuste (v350)',
    ohje: 'Ansaitse varuste kokemuspisteillä — sen jälkeen minkä '
      + 'tahansa maan lehti aukeaa kartalta maan nimen i-napista, '
      + 'matkustamatta.',
  },
  {
    otsikko: 'Menovinkit (v350)',
    ohje: 'Lontoon kaupunkilehden viimeinen aihesivu: seitsemän '
      + 'kohdetta linkkeineen.',
  },
  {
    otsikko: 'Aarrevihjeet matkalla (v346)',
    ohje: 'Pysähdy nopalla kaupunkien väliin: isoisän taitettu sivu '
      + 'nousee tietoruutuun kuiskattuna — ilmansuunta, ei kaupunki. '
      + 'Kaupungissa vihje ei enää koskaan peitä merkintää.',
  },
  {
    otsikko: 'Koko Eurooppa dekkarina (v345)',
    ohje: 'Saavu mihin tahansa Euroopan kaupunkiin: lyhyt '
      + 'dekkarimerkintä ja luenta (23–30 s). Kuuntele ainakin '
      + 'Edinburgh (askeleet sumussa), Pariisi (messinkiavain) ja '
      + 'Pietari (sillat).',
  },
];
