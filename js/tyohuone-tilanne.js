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
  paivitetty: '10.8.2026 (yövahti klo 4.30)',
  tavoite: 'EUROOPPA VALMIIKSI KAIKILTA OSIN (omistajan tilaus 9.8.): '
    + 'lehdet kuntoon ensin. Euroopan valmistuttua siirrytään suoraan '
    + 'Lähi-idän kaupunki- ja maalehtiin. Matkakirjan tarinapuoli on '
    + 'parkissa — siihen palataan myöhemmin. Tiimi työskentelee yön '
    + 'yli; Fablen yövahti kiertää tunneittain.',
  rivit: [
    {
      tekija: 'Fable',
      rooli: 'tarina + koordinaatio',
      tila: 'valmis',
      tehtava: 'Illan testipelilöydökset korjattu: kuvakaruselli + '
        + 'vieritysvara + wikihännät (v475), yksi tehtävä per '
        + 'pysähdys (v478) ja Engel-henkilöjuttu (v479). Omistajan '
        + 'valmiusportti kirjattu: ilmoitus vasta kun Eurooppa on '
        + 'kokonaan valmis (docs/fable-tilanne.md, 9 kohtaa).',
      seuraavaksi: 'Yövahti: raporttien kuittaus, erien jako, konttien '
        + 'kierrätys erätauoilla, jumitarkistus tunneittain. Lopuksi '
        + 'kokoava QA + oma läpipelaus + ilmoitus omistajalle.',
    },
    {
      tekija: 'Opus 1',
      rooli: 'lehdet + rakenne',
      tila: 'tyossa',
      tehtava: 'Menovinkkisivujen kuvat valmiit (v486–v492): 58 '
        + 'kuvaa 15 maalle, 245/246 riviä kuvitettu. Aiemmin lehdet '
        + 'täyteen (v481) ja orpoauditointi (v483).',
      seuraavaksi: 'Valokuvarajatapaukset + kuvaduplikaattilistan '
        + 'loput vaihdot — jonon viimeiset Eurooppa-kohdat. Sitten '
        + 'Lähi-idän maiden aihesivut (ARE ensin).',
    },
    {
      tekija: 'Opus 2',
      rooli: 'kartat + introt',
      tila: 'tyossa',
      tehtava: 'KARTTAPUOLI ON VALMIS: kaikki kuusi uutta '
        + 'kohdekarttaa mainissa (v482 Tromssa, v484 Dubrovnik/'
        + 'Riika/Vilna, v485 Oslo/Kööpenhamina) — jokaisessa '
        + 'mittakaavajana ja vesitarkistetut pisteet.',
      seuraavaksi: 'Tallinnan kartta uusiksi kaupunginmuurin kanssa '
        + '(oma löydös). Sitten valmiudessa — Lähi-idän maakartat '
        + 'kun Eurooppa on kuitattu valmiiksi.',
    },
    {
      tekija: 'Sonnet 1',
      rooli: 'QA + työhuone',
      tila: 'tyossa',
      tehtava: 'Neljäs puhdas QA-kierros putkeen: 8 uutta lehteä '
        + '(rakenne, minitehtävät 8/8 samalla sivulla, 72/72 kuvaa '
        + 'curlilla), v478-pelisääntö ja v479 Engel — ei löydöksiä.',
      seuraavaksi: 'Valmiudessa. Kokoava koko Euroopan QA ennen '
        + 'omistajan ilmoitusta, kun nähtävyysjuttuerät ovat '
        + 'mainissa.',
    },
    {
      tekija: 'Sonnet 2',
      rooli: 'nähtävyysjutut',
      tila: 'tyossa',
      tehtava: 'Erä 9 mainissa (v488): Rooma, Krakova, Varsova, '
        + 'Tallinna monikuvalinjalla — nähtävyysjuttuja on nyt 21 '
        + 'kaupungissa.',
      seuraavaksi: 'Erä 10: Sofia, Bukarest, Sarajevo. Jonossa erät '
        + '11–13 (Kiova/Pietari/Moskova/Odessa ja kuusi uutta '
        + 'karttakaupunkia).',
    },
  ],
  odottaaPaatosta: [
    'Isoisän ääni pelissä: pilotti (v408, Edinburgh ja Pietari) — '
      + '"kaipaavat vielä työstöä, palataan myöhemmin".',
    'Pääaarteiden (tähtilaattojen) AI-kuvat: promptit valmiina, '
      + 'generoidaan jos haluat myös ne kuvitettuina.',
    'Lähi-idän tarinakaaritekstit (28 kohdetta) työhuoneessa '
      + 'luettavina — luennat generoidaan kun sanot "generoi".',
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
    otsikko: 'Illan testipelikorjaukset (v475)',
    ohje: 'Avaa Ateenan kartalta Akropolis: kolme kuvaa on nyt yhtenä '
      + 'karusellina nuolineen ja 1/3-laskureineen. Istanbulin lehden '
      + 'lopussa Etsi kätkö -nappi ei enää jää sivunumeron alle. '
      + 'Espanjalaisten portaiden Lue lisää päättyy asiatekstiin — '
      + 'tyhjät Kuvia/Lähteet-otsikot ovat poissa.',
  },
  {
    otsikko: 'Eurooppa on lehtien osalta täysi (v481)',
    ohje: 'Viisi viimeistä kaupunkilehteä: Dubrovnikilla Tasavalta, '
      + 'Riialla Vanhakaupunki, Vilnalla Oppi, Oslolla Laivat ja '
      + 'Kööpenhaminalla Sadut. Aiemmin aluelehdet Kreeta, Sisilia '
      + 'ja Alpit (v473).',
  },
  {
    otsikko: 'Yksi tehtävä per pysähdys (v478) ja Engel (v479)',
    ohje: 'Pulma korvaa nyt kohtaamisvisan — pysähdyksessä on aina '
      + 'täsmälleen yksi tehtävä ja muodot vaihtelevat. Helsingin '
      + 'Tuomiokirkko-jutussa Engelin nimi on linkki hänen omaan '
      + 'juttuunsa.',
  },
  {
    otsikko: 'Maakyltit nousevat kaupunkien päälle (v474)',
    ohje: 'Zoomaa Euroopan karttaa: maan nimikyltti ei enää peitä '
      + 'kaupunkien nimiä (esim. Kreikka/Ateena) — sijainnit '
      + 'mitattiin törmäystarkistuksella.',
  },
  {
    otsikko: 'Tarinakaari pelissä (v460, QA-tarkastettu)',
    ohje: 'Pelaa Eurooppaa: saapumiskortti lukee isoisän merkinnän, '
      + 'kaupungin ensimmäinen aarrevisa on kohtaaminen jonka henkilö '
      + 'esittää isoisän kysymyksen, ja aarteen paljastus päättyy auki '
      + 'jäävään vihjeeseen — kaikki luettuna ääneen. 41 kohdetta; '
      + 'faktatarkistettu ja integraatio-QA puhdas.',
  },
];
