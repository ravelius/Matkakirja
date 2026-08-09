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
  paivitetty: '8.8.2026',
  tavoite: 'LOPPUKIRI (omistajan tilaus 8.8. ilta): kaikki Euroopan '
    + 'kaupunki- ja maalehdet valmiiksi. Agenttiparvet sallittu '
    + 'vauhtiin, kunhan mitään turhaa ei tehdä.',
  rivit: [
    {
      tekija: 'Fable',
      rooli: 'tarina + koordinaatio',
      tila: 'tyossa',
      tehtava: 'Koordinointi ja raporttien kokoaminen. Euroopan '
        + 'tarinatekstit valmiit: 41 dekkarimerkintää äänineen, '
        + 'aarrevihjeet ilmansuunnittain, Lontoon kohtaamisluennat.',
      seuraavaksi: 'v397: nähtävyyskortti ulottuu puhelimella '
        + 'alareunaan asti. Kuusi uutta väliversiota tyhjältä '
        + 'pöydältä on Kehitys-välilehdellä vanhan tekstin '
        + 'rinnalla — luennat generoidaan heti kun ääniavain on '
        + 'taas kontissa (ELEVEN_API_KEY puuttuu ympäristöstä). '
        + 'Visapalkinnot: kulttuurivisa antaa jo +25 p ja '
        + 'maalehden minitehtävät +10 p; Opus 1 lisää minitehtävät '
        + 'myös kaupunkilehtien aihesivuihin.',
    },
    {
      tekija: 'Opus 1',
      rooli: 'lehdet + rakenne',
      tila: 'tyossa',
      tehtava: 'Kaupunkilehdet: 18 täydessä mallissa minitehtävineen '
        + '— v404 lisäsi tehtävät kahdeksaan vanhaan, v407 toi '
        + 'kymmenen uutta (Ateena, Amsterdam, Istanbul, Dublin, '
        + 'Edinburgh, Marseille, Lissabon, Barcelona, Granada, '
        + 'Budapest). Laatulöydöt: Barcelonan tekijänoikeuskorjaus, '
        + 'visa/minitehtävä-päällekkäisyystarkistus, uusi '
        + 'tests/lehdet.test.mjs.',
      seuraavaksi: 'ISO LÄPIKÄYNTI (omistajan linjaus 9.8.): '
        + 'maalehden pitää aina olla pidempi kuin kaupunkilehden — '
        + 'vaihe A kartoittaa kaikki 30 maata ja ehdottaa siirrot '
        + '(pahin: Helsinki vs Suomi), vaihe B toteuttaa Fablen '
        + 'kuittauksen jälkeen. Lisäksi kaikkien valokuvakysymysten '
        + 'kuvat tarkistetaan kuva kuvalta (Kumasi-tapaus). '
        + 'Jonossa: Tromssa + 5 aluetta samalla lehtimallilla.',
    },
    {
      tekija: 'Opus 2',
      rooli: 'kartat + introt',
      tila: 'tyossa',
      tehtava: 'Kaupunkikartat lehtikaupungeille: erä 1/4 julkaistu '
        + '(v418: Praha, Wien, Budapest + listojen välistä '
        + 'pelastettu Pariisi). Oma tarkistustyökalu: pisteet '
        + 'rajojen sisällä, numerot eivät päällekkäin, silmäkuva. '
        + 'Tietoiset rajaukset: Wienin Schönbrunn ja Budapestin '
        + 'Sankarien aukio jäävät karttarajauksen ulkopuolelle; '
        + 'Praha on vaalein kartta (puolet ruudusta puistoa — '
        + 'kaupungin totuus, ei virhe).',
      seuraavaksi: 'Erä 2 käynnissä, HELSINKI nostettu kärkeen '
        + '(omistaja odottaa). Jäljellä 21 kaupunkia. Sonnet 2 '
        + 'kirjoittaa nähtävyysjutut perään, Helsinki edellä.',
    },
    {
      tekija: 'Sonnet 1',
      rooli: 'QA + työhuone',
      tila: 'tyossa',
      tehtava: 'Iso loppu-QA koko Euroopalle ennen omistajan '
        + 'testiä. Valmiina: v356 työhuoneen kokonaisuudistus (5 '
        + 'välilehteä, Testaa-välilehti pelilinkkeineen), v352 '
        + 'Kehitys-välilehti.',
      seuraavaksi: 'QA-raportti Fablelle; löydöt korjauslistaksi. '
        + 'Briefiin kertyneet erityiskohteet: Mercator-vääristymä '
        + 'karttapisteissä, Opus 2:n curl+karttapiste-tarkistus, '
        + 'haikara/Vasa-kuvakaksoiskappaleet, roskapolkutesti ja '
        + 'Flickr Commonsin "No restrictions" -lisenssimerkintä '
        + '(Tukholman Elias Martin -galleria; tarkistin ei tunne '
        + 'merkintää, vaikka se on käytännössä PD) ja maakartat.js:n '
        + 'nimiVasen-kenttä, jonka kommentti lupaa mutta jota ei ole '
        + 'toteutettu eikä käytetä — kommentti tai toteutus '
        + 'korjattava.',
    },
    {
      tekija: 'Sonnet 2',
      rooli: 'nähtävyysjutut',
      tila: 'valmis',
      tehtava: 'NÄHTÄVYYSJUTUT VALMIIT KAIKISSA KARTTAKAUPUNGEISSA: '
        + 'v376 Kairo+Venetsia, v377 Madrid+Tukholma, v381 Lontoon '
        + 'vanhat muunnettu lukittuun malliin. 30 kohdetta '
        + 'tarkistettu kolmessa näyttökoossa.',
      seuraavaksi: 'Kaista tyhjä — jatkuu, kun Opus 2 tekee uusia '
        + 'kaupunkikarttoja (nähtävyysvaihe).',
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
    otsikko: 'Espanjan tv-nappi (v360) — iPad-testi OK 8.8.',
    ohje: 'Espanjan maalehdessä tv-napissa kaksi valintaa: Sää '
      + 'tänään (38 s) ja Uutiset neljässä minuutissa. Omistaja '
      + 'varmisti toimivuuden iPadilla 8.8.',
  },
  {
    otsikko: 'Berliinin nähtävyysjutut — PILOTTI (v358)',
    ohje: 'Avaa Berliinin kaupunkikartta ja napauta numeroympyröitä: '
      + 'kuusi kohdetta sai omat jutut kuvineen ja lainauksineen '
      + '(mm. Reaganin muurinpuhe). Tämä on Sonnetin pilotti — '
      + 'katso jälki ja päätä, jatketaanko muihin kaupunkeihin.',
  },
  {
    otsikko: 'Radio ja tv molemmissa lehdissä (v357)',
    ohje: 'Avaa mikä tahansa kaupunki- ja maalehti: radio- ja '
      + 'videonapit näkyvät nyt kummassakin, ja viimeiset '
      + 'live-lähetykset on korvattu tallenteilla tai poistettu.',
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
