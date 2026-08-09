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
  paivitetty: '9.8.2026 (myöhäisyö)',
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
      tehtava: 'Tarinakaari pelissä (v460) ja kahdesti riippumattomasti '
        + 'tarkastettu: faktatarkistus (ainoa löydös, Sarajevon '
        + 'anakronismi, korjattu v463) ja integraatio-QA oikealla '
        + 'selaimella — puhdas tulos. Aarrekuvat mustasta (v459).',
      seuraavaksi: 'Koordinointi: Dubai-erän QA kun Opus 2:n kytkentä '
        + 'on mainissa. Pääaarteiden kuvat jos omistaja tilaa.',
    },
    {
      tekija: 'Opus 1',
      rooli: 'lehdet + rakenne',
      tila: 'tyossa',
      tehtava: 'KOHTA F VALMIS: yhtään maalehteä ilman aihesivua ei '
        + 'enää ole (120 aihesivua, 442 juttua; v456–v464). Lisäksi '
        + 'Dubain lehti (v465) ja Tromssan lehti (v466). Mittasi '
        + 'jonon itse: lehdettömiä kaupunkeja onkin kymmenen, ei '
        + 'kuusi.',
      seuraavaksi: 'Kolmen maalehtijutun päällekkäisyys korjataan '
        + 'ensin (Kööpenhaminan voileipä, Oslon juusto, Vilnan '
        + 'Užupis) → loput 9 lehdetöntä kaupunkia erissä → '
        + 'valokuvarajatapaukset + kuvaduplikaattilista → Lähi-idän '
        + 'maiden aihesivut (ARE ensin).',
    },
    {
      tekija: 'Opus 2',
      rooli: 'kartat + introt',
      tila: 'tyossa',
      tehtava: 'Lähi-idän maakartat valmiit (v457) ja kaksi '
        + 'huolellista pikkuerää (v458, v462) — esti myös kymmenen '
        + 'maastokohteen tekstien katoamisen ja löysi koostajan '
        + 'lähde-eron (korjattu #674).',
      seuraavaksi: 'Työn alla: Dubain kohdekartta + middleeast-laudan '
        + 'cityCountry-kytkentä (Opus 1:n löytö: ilman sitä Dubain '
        + 'lehteen ei tule menovinkkejä eikä maa numeroina -sivua).',
    },
    {
      tekija: 'Sonnet 1',
      rooli: 'QA + työhuone',
      tila: 'valmis',
      tehtava: 'Kaksi puhdasta kierrosta putkeen: tarinakaaren '
        + 'faktatarkistus (löysi Sarajevon anakronismin, korjattu '
        + 'v463) ja kaaren peli-integraation QA oikealla selaimella '
        + '(5 kaupungin ketju, rajaus, tallennus/lataus — ei '
        + 'löydöksiä).',
      seuraavaksi: 'Valmiudessa: Dubai-erän QA (lehti + kartta + '
        + 'menovinkit + lehdettömien ME-maiden i-napit) kun Opus 2:n '
        + 'kytkentä on mainissa.',
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
    otsikko: 'Dubain ja Tromssan lehdet (v465, v466)',
    ohje: 'Avaa Lähi-idän laudalta Dubai: helmenkalastuskansi, jonka '
      + 'kaiverrus on vuodelta 1881 — samaa vuosikymmentä kuin '
      + 'isoisän päiväkirja. Tromssassa kansi ja Valo-aihesivu '
      + '(keskiyön aurinko, kaamos). Dubain menovinkit syttyvät kun '
      + 'laudan kytkentä valmistuu.',
  },
  {
    otsikko: 'Tarinakaari pelissä (v460, QA-tarkastettu)',
    ohje: 'Pelaa Eurooppaa: saapumiskortti lukee isoisän merkinnän, '
      + 'kaupungin ensimmäinen aarrevisa on kohtaaminen jonka henkilö '
      + 'esittää isoisän kysymyksen, ja aarteen paljastus päättyy auki '
      + 'jäävään vihjeeseen — kaikki luettuna ääneen. 41 kohdetta; '
      + 'faktatarkistettu ja integraatio-QA puhdas.',
  },
  {
    otsikko: 'Aarre nousee mustasta (v459)',
    ohje: 'Vastaa aarrevisaan oikein millä tahansa mantereella: '
      + 'AI-piirretty aarre nousee pimeästä ilman kehyksiä, huudahdus '
      + 'yllä ja nimi arvoineen alla.',
  },
  {
    otsikko: 'Kohta f valmis: joka maalehdellä aihesivut (v464)',
    ohje: 'Avaa mikä tahansa Euroopan maalehti: jokaisella on nyt '
      + 'aihesivut juttuineen ja minitehtävineen — viimeisinä Latvia, '
      + 'Liettua ja Kroatia (mm. Zadarin meriurut ja laskuvarjopiirros '
      + 'vuodelta 1595).',
  },
];


