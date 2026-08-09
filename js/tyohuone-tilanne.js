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
      tehtava: 'Aarrekuvat AI-generoitu yhtenäiseen satukirjatyyliin, '
        + 'kaikki 21 manneraarretta pelissä (v455). Tarinakaaren erä 1 '
        + 'työhuoneessa: 11 kaupunkia teksteineen ja luentoineen.',
      seuraavaksi: 'Tarinakaaren erät 2–6: loput 30 Euroopan kohdetta '
        + 'samalla mallilla (tekstit + luennat + työhuone).',
    },
    {
      tekija: 'Opus 1',
      rooli: 'lehdet + rakenne',
      tila: 'tyossa',
      tehtava: 'Vaihe B valmis: kaikki 27 kaupunkisiirtoa tehty ja QA '
        + 'todensi ne riippumattomasti. Minitehtäväjono tyhjä (v454) — '
        + 'joka maalehden aihesivulla on nyt minitehtävä, yhteensä 134.',
      seuraavaksi: 'Seitsemän aihesivuttoman maan sivut (Sveitsi, '
        + 'Norja, Tanska, Islanti, Latvia, Liettua, Kroatia) → Dubain '
        + 'lehti → Tromssa + aluelehdet + valokuvarajatapaukset + '
        + 'hitaan cimec-linkin vaihto.',
    },
    {
      tekija: 'Opus 2',
      rooli: 'kartat + introt',
      tila: 'tyossa',
      tehtava: 'Eurooppa valmis (kohdekartat 31/31, maakartat 29/29). '
        + 'Lähi-idän lauta pelattavana ja maakartat 10/12: uusimpina '
        + 'Saudi-Arabia, Jemen, Kypros ja Syyria (v453).',
      seuraavaksi: 'Viimeinen erä: Irakin ja Iranin maakartat. Sitten '
        + 'Lähi-itä odottaa maalehtiä (Opus 1) ennen kytkentää.',
    },
    {
      tekija: 'Sonnet 1',
      rooli: 'QA + työhuone',
      tila: 'tyossa',
      tehtava: 'Kierros 2 valmis puhtain tuloksin: siirtoerien kentät, '
        + 'karttamatematiikka ja linkit todennettu, PR #644 tarkistettu. '
        + 'Verkkolöydökset merkitään jatkossa epävarmoiksi (hiekkalaatikon '
        + 'verkko vääristää).',
      seuraavaksi: '26 mahdollisen tuplakuvan luokittelu: aito tupla '
        + 'vai sama kohde eri kuvakulmasta.',
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
    otsikko: 'Aarrekuvat satukirjatyyliin (v455)',
    ohje: 'Pelaa millä tahansa mantereella ja vastaa visaan oikein: '
      + 'paljastuskortissa on nyt AI-piirretty aarre yhtenäisessä '
      + 'tyylissä — guassi, pergamentti ja kynttilänvalo. 21 kuvaa, '
      + 'kolme per manner.',
  },
  {
    otsikko: 'Tarinakaaren erä 1 työhuoneessa (11 kaupunkia)',
    ohje: 'Työhuone → Kehitys: hyväksymälläsi mallilla nyt myös '
      + 'Lontoo, Pariisi, Berliini, Rooma, Madrid ja Ateena — '
      + 'jokaisella saapuminen, kohtaaminen kysymyksineen ja aarre, '
      + 'kaikki kuunneltavissa. Loput Euroopan kohteet tulevat erissä.',
  },
  {
    otsikko: 'Huudahdus paljastushetkellä (v452)',
    ohje: 'Vastaa visaan oikein: nuori herra huudahtaa juuri kun '
      + 'aarre kääntyy esiin, ja huudahdus kasvaa aarteen arvon '
      + 'mukana. Sama satunnaisvaihtelu joka laudalla.',
  },
  {
    otsikko: 'Minitehtävä joka aihesivulla (v454)',
    ohje: 'Avaa minkä tahansa maalehden aihesivu: lopussa on nyt '
      + 'aina pieni tehtävä. Uusia tuli 31, yhteensä 134.',
  },
];
