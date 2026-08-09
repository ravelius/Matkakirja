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
  paivitetty: '9.8.2026 (myöhäisilta)',
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
      tehtava: 'Tarinakaaren kaikki 41 kohdetta kirjoitettu — luennat '
        + 'generoituvat parhaillaan. Aarrekuvat generoidaan uusiksi '
        + 'omistajan palautteen mukaan: aarre nousee mustasta, kortti '
        + 'ilman vanhaa laattakuvaa ja kehyksiä.',
      seuraavaksi: 'Aarrekuvien v2 julkaisu näytteineen ja tarinakaaren '
        + 'luentapaketin vienti työhuoneeseen.',
    },
    {
      tekija: 'Opus 1',
      rooli: 'lehdet + rakenne',
      tila: 'tyossa',
      tehtava: 'Sveitsi ja Norja saivat aihesivut (v456). Samalla '
        + 'löytyi ja korjattiin oma työkaluvika: kolme galleriaa oli '
        + 'rikkoutunut siirroissa — palautettu, ja kaikki 28 sivua '
        + 'auditoitu kenttä kentältä puhtaiksi.',
      seuraavaksi: 'Tanska, Islanti, Latvia, Liettua, Kroatia kahdessa '
        + 'erässä → Dubain lehti → Tromssa + aluelehdet + '
        + 'valokuvarajatapaukset + kuvaduplikaattilista '
        + '(docs/kuvaduplikaatit.md, 17 vaihtoa).',
    },
    {
      tekija: 'Opus 2',
      rooli: 'kartat + introt',
      tila: 'valmis',
      tehtava: 'LÄHI-IDÄN MAAKARTAT VALMIIT (v457): kaikilla laudan '
        + 'mailla on kartta. Eurooppa oli valmis jo aiemmin (31/31 + '
        + '29/29).',
      seuraavaksi: 'Pieni erä: Irakin wiki-linkki Eufratiin + '
        + 'käyttämättömän mallitiedoston siivous. Sitten odottaa Opus '
        + '1:n Dubai-lehteä (kaupunkikartta) ja Lähi-idän maalehtiä '
        + '(kytkentä).',
    },
    {
      tekija: 'Sonnet 1',
      rooli: 'QA + työhuone',
      tila: 'valmis',
      tehtava: 'Tuplakuvien luokittelu valmis: 17 aitoa vaihdettavaa '
        + '(lista docs/kuvaduplikaatit.md, tekijäksi Opus 1), Las '
        + 'Meninas ja Gizan pyramidit jäävät perustellusti.',
      seuraavaksi: 'Seuraa Sonnet 2:n nähtävyysjuttuja oma-'
        + 'aloitteisesti; uusi QA-kierros kun isot erät ovat mainissa.',
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
