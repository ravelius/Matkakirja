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
  paivitetty: '9.8.2026 (ilta)',
  tavoite: 'EUROOPPA VALMIIKSI KAIKILTA OSIN (omistajan tilaus 9.8.): '
    + 'lehdet kuntoon ensin. Euroopan valmistuttua siirrytään suoraan '
    + 'Lähi-idän kaupunki- ja maalehtiin. Matkakirjan tarinapuoli on '
    + 'parkissa — siihen palataan myöhemmin. Omistaja delegoi 9.8. '
    + 'päätökset ja tehtävänjaon Fablelle.',
  rivit: [
    {
      tekija: 'Fable',
      rooli: 'tarina + koordinaatio',
      tila: 'tyossa',
      tehtava: 'Koordinointi, raporttien kokoaminen ja '
        + 'versiotörmäysten ratkonta. Työhuone siivottu 9.8.: vanhat '
        + 'kokeilut pois, jäljellä vain uusin tekstipaketti.',
      seuraavaksi: 'Nähtävyyskuvien laatupassi erissä (Helsinki tehty '
        + 'pilottina v437; jonossa Berliini, Lontoo, Kairo ym.) ja '
        + 'Ateenan pylväspulma oikeilla Commons-kuvilla.',
    },
    {
      tekija: 'Opus 1',
      rooli: 'lehdet + rakenne',
      tila: 'tyossa',
      tehtava: 'Vaihe B erä 2 tehty: seitsemän aihesivua siirretty '
        + 'kaupungeilta maalehtiin (Tallinna→Viro, Istanbul→Turkki, '
        + 'Dublin→Irlanti, Lissabon→Portugali, Budapest→Unkari, '
        + 'Sarajevo→Bosnia, Sofia→Bulgaria). Viro, Bosnia ja Bulgaria '
        + 'saivat ensimmäisen aihesivunsa.',
      seuraavaksi: 'PR #630 odottaa uudelleennumerointia '
        + '(versiotörmäys v437) ja mergeä. Sitten erä 3: Bukarest, '
        + 'Krakova, Varsova, Kiova, Odessa, Pietari, Moskova. Lisäksi '
        + 'jonossa: Lontoon haamusisällön siivous maakartat.js:stä, '
        + 'menovinkkiruudun irrotus, minitehtävät, Tromssa + '
        + 'aluelehdet, valokuvarajatapaukset.',
    },
    {
      tekija: 'Opus 2',
      rooli: 'kartat + introt',
      tila: 'tyossa',
      tehtava: 'Kaikki kartat tehty: kohdekartat 31/31, Euroopan '
        + 'maakartat 29/29. Uusimmat: jokirelaatioiden korjaus — '
        + 'Neva, Dnepr ja Tonava piirtyvät vetenä (v438) — ja '
        + 'Suomenlinna-kainalo oikeaan alanurkkaan (v439). Lähi-idän '
        + 'selvitysmuistio valmis (maakartat tarvitsevat ensin '
        + 'lautageometrian middleeast-countries.js).',
      seuraavaksi: 'nimiVasen-kommenttikorjaus seuraavan erän '
        + 'kyljessä. Euroopan jonon tyhjennyttyä lupa aloittaa '
        + 'middleeast-countries.js ja Dubain kaupunkikarttapilotti.',
    },
    {
      tekija: 'Sonnet 1',
      rooli: 'QA + työhuone',
      tila: 'tyossa',
      tehtava: 'QA-kierros 1 valmis (read-only): 2521 kuvaa, 111 '
        + 'lippua ja 346 ääntä kunnossa, karttamatematiikka '
        + 'todennettu, testit puhtaat. Löydökset jaettu: Lontoon '
        + 'haamusisältö (Opus 1), nimiVasen-kommentti (Opus 2), '
        + 'lisenssitarkistimen sokea piste kirjattu.',
      seuraavaksi: 'Kierros 2: yhdeksän epäillyn menovinkkilinkin '
        + 'selainpistokoe, korjattavien kuvaduplikaattien lista '
        + '(vain 3× ja saman tiedoston sisäiset) ja siirtoerien '
        + 'kenttien regressiotarkistus.',
    },
    {
      tekija: 'Sonnet 2',
      rooli: 'nähtävyysjutut',
      tila: 'tyossa',
      tehtava: 'Livenä 14 kaupunkia (uusimpina v436: Ateena, '
        + 'Amsterdam, Dublin) ja Helsingin kuvien parannus (v437). '
        + 'Jonossa Opus 2:n viisi karttaerää = 17 uutta kaupunkia, '
        + '~102 kohdetta.',
      seuraavaksi: 'Erät järjestyksessä, Istanbul/Marseille/'
        + 'Edinburgh ensin, raportti erien välissä. Wiki-ansat '
        + 'muistissa: fi-wikin "Neitsyttorni" on Bakun torni ja '
        + '"Belém" Brasilian kaupunki.',
    },
  ],
  odottaaPaatosta: [
    'Viiden kaupungin tekstipaketti (Kehitys-välilehti): mitkä osat '
      + 'luetaan ääneen? Ääniä ei generoida ennen päätöstäsi.',
    'Isoisän ääni pelissä: pilotti (v408, Edinburgh ja Pietari) — '
      + '"kaipaavat vielä työstöä, palataan myöhemmin".',
  ],
};

/**
 * Testattavaa juuri nyt: uusimmat ominaisuudet ja mistä ne löytää.
 * Fable päivittää tätä julkaisujen tahdissa — Testaa-välilehti
 * näyttää listan pelilinkkien vieressä. Uusin ensin. Vanhat rivit
 * siivotaan pois kun ne on katsottu tai ne vanhenevat.
 */
export const TESTATTAVAA = [
  {
    otsikko: 'Koko paketti: 5 kaupunkia ja henkilöt (työhuone)',
    ohje: 'Työhuone → Kehitys: Praha, Istanbul, Wien, Venetsia ja '
      + 'Budapest koko kaarena — saapuminen (isoisän ääni), '
      + 'kohtaaminen nimetyn henkilön kanssa, visa, aarre ja '
      + 'henkilön vihje vasta aarteen jälkeen (cliffhanger). Lue ja '
      + 'kerro, mitkä osat luetaan ääneen. Vanhat kokeilut on '
      + 'siivottu pois — ne ovat git-historiassa.',
  },
  {
    otsikko: 'Suomenlinna ja isot joet kartoilla (v438–v439)',
    ohje: 'Avaa Helsingin kohdekartta: Suomenlinna-kainalo istuu '
      + 'nyt oikeassa alanurkassa. Katso myös Kiova, Pietari ja '
      + 'Budapest: Dnepr, Neva ja Tonava piirtyvät vetenä eivätkä '
      + 'pelkkänä viivana.',
  },
  {
    otsikko: 'Helsingin nähtävyyskuvat paremmiksi (v437)',
    ohje: 'Avaa Helsingin kaupunkikartta ja napauta numeroita: 6/7 '
      + 'kuvaa vaihdettu laatupassissa (valo, kohde pääosassa, ei '
      + 'roinaa). Sama passi tulossa muihin kaupunkeihin — kerro '
      + 'jos jälki kelpaa.',
  },
  {
    otsikko: 'Kaupunkilehdet kolmeen ruutuun (v435→)',
    ohje: 'Avaa Helsinki: kansi, historia ja menovinkit — arki '
      + 'siirtyi Suomen maalehteen. Sama siirto on tehty seitsemälle '
      + 'kaupungille (tulossa mainiin PR #630:ssä) ja loput '
      + 'seuraavat erissä.',
  },
  {
    otsikko: 'Nähtävyysjutut 14 kaupungissa (v436)',
    ohje: 'Uusimpina Ateena, Amsterdam ja Dublin: avaa '
      + 'kaupunkikartta ja napauta numeroympyröitä. 18 uutta '
      + 'juttua, mm. Anne Frankin talo ja Guinness-panimo.',
  },
  {
    otsikko: 'Neljä uutta maalehteä (v435)',
    ohje: 'Turkki, Irlanti, Portugali ja Unkari saivat maalehden: '
      + '16 aihesivua, 64 juttua ja 16 minitehtävää. Avaa maan i '
      + 'kartalta.',
  },
];
