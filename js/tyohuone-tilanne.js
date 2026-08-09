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
  paivitetty: '10.8.2026 (yövahti klo 0.50)',
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
      tehtava: 'Omistajan illan testipelilöydökset korjattu (v475): '
        + 'nähtävyysjuttujen lisäkuvat karuselliin, lehden loppuun '
        + 'vieritysvara (sivunumero ei enää peitä Etsi kätköä) ja '
        + 'Lue lisää -artikkelien tyhjät loppuotsikot pois.',
      seuraavaksi: 'Yövahti: raporttien kuittaus, erien jako, konttien '
        + 'kierrätys erätauoilla, jumitarkistus tunneittain.',
    },
    {
      tekija: 'Opus 1',
      rooli: 'lehdet + rakenne',
      tila: 'tyossa',
      tehtava: 'Kreeta, Sisilia ja Alpit saivat lehtensä (v473) — '
        + 'aluelehtien erä valmis. Aiemmin Islanti + Lappi (v468) ja '
        + 'päällekkäisjuttujen siivous (v467, v469).',
      seuraavaksi: 'Viisi kaupunkilehteä järjestyksessä Riika, Vilna, '
        + 'Oslo, Kööpenhamina, Dubrovnik (1–2 lehteä per PR) → '
        + 'valokuvarajatapaukset + kuvaduplikaattilista → Lähi-idän '
        + 'maiden aihesivut (ARE ensin).',
    },
    {
      tekija: 'Opus 2',
      rooli: 'kartat + introt',
      tila: 'tyossa',
      tehtava: 'Maakylttien törmäykset korjattu mittaamalla (v474): '
        + 'kyltti nousee kaupunkinimien päälle. Aiemmin Dubain '
        + 'kohdekartta (v467) ja cityCountry-kytkentä (v470).',
      seuraavaksi: 'Mittakaavajana kaupunkikarttoihin (Google Maps '
        + '-tyyliin), Tromssan kohdekartta ja vesitarkistuksen '
        + 'korjaukset (Tukholma, Madridin Cibele, Lontoon silmä).',
    },
    {
      tekija: 'Sonnet 1',
      rooli: 'QA + työhuone',
      tila: 'tyossa',
      tehtava: 'Dubai-erän QA käynnissä (lehti + kartta + menovinkit '
        + '+ lehdettömien ME-maiden i-napit). Aiemmin kaksi puhdasta '
        + 'kierrosta: kaaren faktat ja peli-integraatio.',
      seuraavaksi: 'Raportti Dubai-QA:sta; sitten valmiudessa kunnes '
        + 'Opus 1:n viiden lehden erä on mainissa (QA-kierros sille).',
    },
    {
      tekija: 'Sonnet 2',
      rooli: 'nähtävyysjutut',
      tila: 'tyossa',
      tehtava: 'Erä 8 valmis: Lissabon, Barcelona, Granada (PR #693; '
        + 'versionumero päivitetään työkalulla ennen mergeä). Livenä '
        + 'sen jälkeen 17 kaupunkia.',
      seuraavaksi: 'Erä 9: Rooma, Krakova, Varsova, Tallinna. Uusi '
        + 'kuvakaruselli (v475) sallii 2–4 kuvaa per juttu siististi.',
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
    otsikko: 'Kreetan, Sisilian ja Alppien lehdet (v473)',
    ohje: 'Avaa Euroopan laudalta aluekohteet: Kreetalla Samarian '
      + 'rotko ja tuulimyllyt, Sisiliassa temppelilaakso, Alpeilla '
      + 'murmeli ja partakorppikotka.',
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
