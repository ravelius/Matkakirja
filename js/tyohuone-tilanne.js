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
  paivitetty: '10.8.2026 (aamupäivä klo 11.30) — TIIMI LUOVUTUSKUNNOSSA',
  tavoite: 'TILINVAIHTO VALMISTELTU (omistajan ohje 10.8.): kaikki '
    + 'sessiot ajoivat urakkansa pysähdyskohtaan ja kirjasivat '
    + 'jatkokohdan omaan tilannedokumenttiinsa (docs/*-tilanne.md). '
    + 'Euroopan sisältö on valmis (nähtävyysjutut 34 kaupungissa, '
    + 'erät 1–13); auki enää kokoava QA + läpipelaus. ME eteni '
    + 'erään C asti (ARE, Jordania, Oman, Qatar, Egypti, Kuwait).',
  rivit: [
    {
      tekija: 'Fable',
      rooli: 'tarina + koordinaatio',
      tila: 'valmis',
      tehtava: 'Aamupäivän korjaukset: valokuvapulma-pilotti (v503), '
        + 'popupille rako ja täysikoon kuviin lehden selaus (v505), '
        + 'ja iso pelisääntökorjaus (v506): kohtaaminen on nyt '
        + 'ensimmäinen tehtävä JOKA kaupungissa — myös ilman laattaa '
        + '— nappi nimeää henkilön (Tapaa Nikos) ja lehteä pääsee '
        + 'aina lukemaan. Testattu 41/41 kaupunkia.',
      seuraavaksi: 'Kun erä 13 on mainissa: kokoava QA + läpipelaus '
        + '+ ilmoitus omistajalle Euroopan valmiudesta. Työhuoneen '
        + 'Pelit-välilehdellä odottaa pelikatalogi valintoja varten.',
    },
    {
      tekija: 'Opus 1',
      rooli: 'lehdet + rakenne',
      tila: 'tyossa',
      tehtava: 'Lähi-itä etenee erä kerrallaan: ARE 3 sivua + '
        + 'Jordania (v499), Oman + Qatar (v501). Esitarkistin nappasi '
        + 'kolme vastausvuotoa ennen julkaisua.',
      seuraavaksi: 'ME-erä C työn alla: Egypti + Kuwait. Sitten '
        + 'Saudi-Arabia (ilman pyhiä kaupunkeja) + Bahrain.',
    },
    {
      tekija: 'Opus 2',
      rooli: 'kartat + introt',
      tila: 'tyossa',
      tehtava: 'Karttapuoli valmis: kuusi uutta kohdekarttaa '
        + '(v482–v485) ja päälle Tallinnan ja Riian muurit + '
        + 'kujabugin korjaus (v493) — bugi löytyi omasta '
        + 'koeajodiffistä ja korjattiin ymmärtäen, ei arvaten.',
      seuraavaksi: 'Valmiudessa. Lähi-idän maakartat kun Eurooppa '
        + 'on kuitattu valmiiksi (ME-maakyltit on jo tarkistettu).',
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
      tehtava: 'Erät 9–12 mainissa (v488, v495, v502, v504): '
        + 'nähtävyysjuttuja on nyt 31 kaupungissa, mukana Kiova, '
        + 'Pietari, Moskova, Odessa, Tromssa, Dubrovnik ja Riika.',
      seuraavaksi: 'Erä 13 työn alla: Vilna, Oslo, Kööpenhamina — '
        + 'Euroopan viimeinen erä.',
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
    otsikko: 'Kohtaaminen joka kaupungissa + Tapaa X -nappi (v506)',
    ohje: 'Avaa mikä tahansa Euroopan kaupunki ja paina Tutki: '
      + 'kortin napissa lukee nyt henkilön nimi (esim. Tapaa Nikos '
      + 'Ateenassa), henkilö esittäytyy ja kertoja lukee kohtaamisen '
      + '— myös kaupungeissa joissa ei ole laattaa. Pulma tulee '
      + 'vasta toisella pysähdyksellä. Tutki-nappi ei enää katoa '
      + 'väärien vastausten jälkeen: lehti on aina luettavissa.',
  },
  {
    otsikko: 'Valokuvapulma (v503) ja popup-hienosäädöt (v505)',
    ohje: 'Ateenan pylväspulman vaihtoehdot ovat nyt oikeita '
      + 'valokuvia (neljäntenä karyatidi-harhautus). Nähtävyys-'
      + 'popupin alle jää pieni rako, ja täysikoon kuvaa voi selata '
      + 'nuolilla ja pyyhkäisyllä kuten lehden kuvakotelossa.',
  },
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
