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
  paivitetty: '11.8.2026 (yö klo 04.40 Suomen aikaa) — YÖAJO KÄYNNISSÄ',
  tavoite: 'Yöajo: Euroopan rimakierros VALMIS (34/41 uusittu tai '
    + 'silattu, 7 tietoisesti ennallaan). Nyt korjataan Sonnetin '
    + 'löytämät EU-visaspoilerit ja ME-kaupunkilehdet etenevät. '
    + 'Luentojen generoinnit odottavat omistajan lupaa aamulla.',
  rivit: [
    {
      tekija: 'Fable',
      rooli: 'tarina + koordinaatio',
      tila: 'tyossa',
      tehtava: 'Yön julkaisusykli: v551+v555 vuorigalleriat, '
        + 'v552+v556+v557 saapumiset uusiksi (28 kohdetta), v553 '
        + 'maastoartikkelit, v554 ME:n Isfahan-korjaukset. '
        + 'Kaanonkirjaus: ME-erikoiskohteet saavat maatunnuksen '
        + '(paitsi Jerusalem) — laudat olivat ristiriidassa.',
      seuraavaksi: 'Maxin EU-Isfahan-korjausten katselmointi ja '
        + 'julkaisu. Aamuksi omistajalle: aloituskaupunkipäätös '
        + '(BA→Lima), lupa Euroopan luentojen generointiin (35 '
        + 'mykistettyä luentaa jonossa), ME-maiden aihemitan nosto.',
    },
    {
      tekija: 'Fable max',
      rooli: 'syväajattelu (apusessio)',
      tila: 'tyossa',
      tehtava: 'Riman erät 1–4 valmiit ja mainissa (28 saapumista '
        + 'uusiksi + 7 Reginald-mietintöä + Tromssan otsikkovuodon '
        + 'korjaus). Euroopan kierros valmis.',
      seuraavaksi: 'EU-Isfahan-korjauserä: ~25 visakysymystä uusiksi '
        + 'Sonnetin raportin pohjalta (vastaus ei saa vuotaa '
        + 'tekstissä ennen kysymystä), Kreeta/Varsova harkintaan.',
    },
    {
      tekija: 'Opus 1',
      rooli: 'lehdet + rakenne',
      tila: 'tyossa',
      tehtava: 'ME-kaupunkilehdet: Iranin historia- ja rakennukset-'
        + 'aiheet valmiina (8 kuvaa, lisenssit tarkistettu), '
        + 'erikoiskohteiden maatunnukset korjattu.',
      seuraavaksi: 'Iranin loput aiheet (puutarhat, ruoka, käsityö) '
        + '→ julkaisu; sitten IRQ, SYR, YEM, CYP samalla reseptillä.',
    },
    {
      tekija: 'Opus 5',
      rooli: 'vuorigalleriat + kuvatyöt',
      tila: 'tyossa',
      tehtava: 'Vuorigalleriaurakka VALMIS: 52/52 kohdetta, 324 '
        + 'kuraattorikuvaa mainissa ja peilissä (kattavuus '
        + 'tarkistettu 324/324 + 56/56).',
      seuraavaksi: 'Kuvatyökalun (hae-vuorikuvat) viimeistely '
        + 'yleiskäyttöiseksi; sitten valmiustila.',
    },
    {
      tekija: 'Sonnet 1',
      rooli: 'QA',
      tila: 'valmis',
      tehtava: 'EU-Isfahan-tarkistus valmis: 22/41 spoileria '
        + 'löydetty (20 ilmaista korjata), bonuksena 3 kysymys–'
        + 'kohtaus-irrallisuutta. ME:n vastaava (13/28) käsitelty '
        + 'v554:ssä.',
      seuraavaksi: 'Valmiudessa; seuraava tarkistuserä annetaan kun '
        + 'Maxin korjaukset ovat mainissa.',
    },
  ],
  odottaaPaatosta: [
    'Aloituskaupunkiarvio: 17/19 pidetään, LA→Chicago selvä, '
      + 'BA→Lima harkinnainen — päätös omistajalla.',
    'Euroopan uusien luentojen generointi: 35 mykistettyä luentaa '
      + 'odottaa lupaa (tekstit pelissä, vanhat äänet eivät soi '
      + 'väärän tekstin päällä).',
    'ME-maiden aihemitta: nykyisillä mailla 2–4 aihetta, tilaus oli '
      + '5–6 — noston laajuus omistajan päätös.',
    'ME-erikoiskohteiden maatunnus annettu (paitsi Jerusalem) — '
      + 'kaanonmuutos kirjattu, kumottavissa jos omistaja toisin '
      + 'päättää.',
    'Afrikan jakotauluehdotus (P1–P5) omistajalla luettavana.',
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
    otsikko: 'Vuorten kuvagalleriat kaikkialla (v551 + v555)',
    ohje: 'Zoomaa kartalla mille tahansa vuoristolle (esim. Kaukasus, '
      + 'Himalaja, Atlas) ja avaa i-napista Lue lisää: jokaisella '
      + '52 vuorikohteella on nyt käsin kuratoitu kuvakaruselli, '
      + 'yhteensä 324 Commons-valokuvaa suomenkielisin selittein.',
  },
  {
    otsikko: 'Matkakirjan saapumiset uudella rimalla (v552–v557)',
    ohje: 'Euroopan rimakierros on valmis: 34/41 kohteen merkinnät '
      + 'uusittu tai silattu. Saavu Istanbuliin, Prahaan, Kiovaan '
      + 'tai Madridiin: '
      + 'isoisän merkinnät ovat nyt kommelluksia, tosihuomioita ja '
      + 'mittaajan persoonaa — mm. Bradshaw\'n käsittämätön '
      + 'aikataulukirja ja kolmentoista lyönnin varmistus kahtena '
      + 'yönä. Uusitut tekstit ovat toistaiseksi ilman luentaa '
      + '(generointi odottaa lupaa), vanha ääni ei soi niiden päällä.',
  },
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
