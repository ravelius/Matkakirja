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
  paivitetty: '9.8.2026 (yö)',
  tavoite: 'EUROOPPA VALMIIKSI KAIKILTA OSIN (omistajan tilaus 9.8.): '
    + 'lehdet kuntoon ensin. Euroopan valmistuttua siirrytään suoraan '
    + 'Lähi-idän kaupunki- ja maalehtiin. Matkakirjan tarinapuoli on '
    + 'parkissa — siihen palataan myöhemmin. Omistaja delegoi 9.8. '
    + 'päätökset ja tehtävänjaon Fablelle.',
  rivit: [
    {
      tekija: 'Fable',
      rooli: 'tarina + koordinaatio',
      tila: 'valmis',
      tehtava: 'TARINAKAARI ON PELISSÄ (v460): saapumiskortti lukee '
        + 'kaaren merkinnän, ensimmäinen aarrevisa on kohtaaminen '
        + 'pariutettuine kysymyksineen ja paljastus päättyy vihjeeseen '
        + '— 41 kohdetta, 123 luentaa. Aarrekuvat nousevat mustasta '
        + '(v459); vaalea vertailuversio näytetty, musta valittiin.',
      seuraavaksi: 'Sonnet 1:n faktatarkistuksen korjaukset kaaren '
        + 'kysymyksiin, kun raportti tulee. Pääaarteiden kuvat jos '
        + 'omistaja tilaa.',
    },
    {
      tekija: 'Opus 1',
      rooli: 'lehdet + rakenne',
      tila: 'tyossa',
      tehtava: 'Sveitsi+Norja (v456) ja Tanska+Islanti (v461) saivat '
        + 'aihesivut; siirtoerien galleria-vika löytyi ja korjattiin, '
        + 'kaikki 28 sivua auditoitu puhtaiksi.',
      seuraavaksi: 'Latvia, Liettua ja Kroatia (kohdan f viimeinen '
        + 'erä) → Dubain lehti → Tromssa + aluelehdet + '
        + 'valokuvarajatapaukset + kuvaduplikaattilista '
        + '(docs/kuvaduplikaatit.md, 17 vaihtoa).',
    },
    {
      tekija: 'Opus 2',
      rooli: 'kartat + introt',
      tila: 'odottaa',
      tehtava: 'Lähi-idän maakartat valmiit (v457), Irakin linkki '
        + 'Eufratiin (v458) ja mallitiedoston kommentti oikeaksi '
        + '(v462). Tarkisti myös Fablen siivousoletuksen ja esti '
        + 'kymmenen maastokohteen tekstien katoamisen.',
      seuraavaksi: 'Odottaa Opus 1:n Dubai-lehteä (kohdekartta) ja '
        + 'Lähi-idän maalehtiä (laudan kytkentä). Fable herättää '
        + 'triggerillä.',
    },
    {
      tekija: 'Sonnet 1',
      rooli: 'QA + työhuone',
      tila: 'tyossa',
      tehtava: 'Tuplakuvien luokittelu valmis (17 vaihdettavaa, lista '
        + 'docs/kuvaduplikaatit.md). Nyt työn alla: tarinakaaren 30 '
        + 'uuden kohteen visakysymysten ja faktojen riippumaton '
        + 'faktatarkistus + anakronismit vuoteen 1873.',
      seuraavaksi: 'Faktatarkistusraportti Fablelle — Fable korjaa '
        + 'löydökset suoraan peliin.',
    },
    {
      tekija: 'Sonnet 2',
      rooli: 'nähtävyysjutut',
      tila: 'tyossa',
      tehtava: 'Livenä 14 kaupunkia; jonossa Opus 2:n karttaerät = 17 '
        + 'uutta kaupunkia, ~102 kohdetta.',
      seuraavaksi: 'Erät järjestyksessä, Istanbul/Marseille/Edinburgh '
        + 'ensin. Wiki-ansat muistissa: fi-wikin "Neitsyttorni" on '
        + 'Bakun torni ja "Belém" Brasilian kaupunki.',
    },
  ],
  odottaaPaatosta: [
    'Isoisän ääni pelissä: pilotti (v408, Edinburgh ja Pietari) — '
      + '"kaipaavat vielä työstöä, palataan myöhemmin".',
    'Pääaarteiden (tähtilaattojen) AI-kuvat: promptit valmiina, '
      + 'generoidaan jos haluat myös ne kuvitettuina.',
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
    otsikko: 'Tarinakaari pelissä (v460)',
    ohje: 'Pelaa Eurooppaa: saapumiskortti lukee isoisän merkinnän, '
      + 'kaupungin ensimmäinen aarrevisa on kohtaaminen jonka henkilö '
      + 'esittää isoisän kysymyksen, ja aarteen paljastus päättyy auki '
      + 'jäävään vihjeeseen — kaikki luettuna ääneen. 41 kohdetta.',
  },
  {
    otsikko: 'Aarre nousee mustasta (v459)',
    ohje: 'Vastaa aarrevisaan oikein millä tahansa mantereella: '
      + 'AI-piirretty aarre nousee pimeästä ilman kehyksiä, huudahdus '
      + 'yllä ja nimi arvoineen alla. Vaalea vertailuversio näytettiin '
      + '— musta valittiin.',
  },
  {
    otsikko: 'Uudet aihesivut: CHE, NOR, DNK, ISL (v456, v461)',
    ohje: 'Avaa Sveitsin, Norjan, Tanskan tai Islannin maalehti: '
      + 'kolme aihesivua ja yhdeksän juttua kullakin, minitehtävät '
      + 'mukana. Latvia, Liettua ja Kroatia tulossa.',
  },
];

