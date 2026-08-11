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
  paivitetty: '11.8.2026 (myöhäisilta) — Raamattu 2.0 -päivä',
  tavoite: 'Raamattu 2.0 rakennetaan yhdessä työhuoneessa (15 '
    + 'osiota; isot linjaukset 11.8.: paikallisaarteet, '
    + 'varustekauppa, pelin loppu, tekstien vetovoimakeinot). '
    + 'Vanhat saapumismerkinnät luentoineen palautettu peliin '
    + '(v577) kunnes tekstit kirjoitetaan uusiksi. Opukset '
    + 'jatkavat Lähi-idän ja Aasian maalehtiä taustalla.',
  rivit: [
    {
      tekija: 'Fable',
      rooli: 'tarina + koordinaatio',
      tila: 'tyossa',
      tehtava: 'Tilinvaihto tehty: uusi koordinaattori luki kaanonin '
        + 'ja luovutuksen. Raamattu luettavaksi työhuoneeseen (#820). '
        + 'Opus 5:n mekaniikkaerä katselmoitu, tekstit kirjoitettu '
        + '(lentotarjous, mannernapit, Säännöt) ja julkaistu v576.',
      seuraavaksi: 'Ottaa omistajan Eurooppa-tekstikommentit vastaan; '
        + 'pääaarteen paljastusteksti kun hoitaja/kerääjä on '
        + 'päätetty.',
    },
    {
      tekija: 'Fable max 2',
      rooli: 'syväajattelu (apusessio)',
      tila: 'valmis',
      tehtava: 'Ateena, pituusbudjetti, hiontaerät 1–3, Sonnet-'
        + 'korjaukset, mysteerikannanotto ja kulkija-passi — '
        + 'kaikki mainissa.',
      seuraavaksi: 'Ei vastaanota viestejä tilinvaihdon jälkeen; '
        + 'uusi tili perustaa oman Max-session tarvittaessa.',
    },
    {
      tekija: 'Opus (ME)',
      rooli: 'lehdet + rakenne',
      tila: 'tyossa',
      tehtava: 'ME-SEITSIKON TASAVAHVISTUS käynnissä (omistajan '
        + 'lupa 11.8. ilta): JOR OMN QAT KWT BHR SAU ARE vanhasta '
        + 'ohuesta mallista uuteen 4–5 aihetta × 4 nostoa '
        + '-malliin. Haara claude/me-lehdet-tasavahvistus.',
      seuraavaksi: 'Fable katselmoi ja julkaisee kun raportti '
        + 'saapuu.',
    },
    {
      tekija: 'Opus (Aasia)',
      rooli: 'lehdet + kuvatyöt',
      tila: 'tyossa',
      tehtava: 'AASIAN MAALEHDET aloitettu (omistajan lupa 11.8. '
        + 'ilta): JPN CHN IND THA KOR uuteen malliin — Aasialla '
        + 'ei ollut vielä yhtään maalehteä. Haara '
        + 'claude/aasia-lehdet.',
      seuraavaksi: 'Fable katselmoi ja julkaisee kun raportti '
        + 'saapuu.',
    },
    {
      tekija: 'Sonnet 1',
      rooli: 'QA',
      tila: 'valmis',
      tehtava: 'Kolme tarkistuskierrosta euro-hiontaan (7+15+1 '
        + 'löydöstä, kaikki korjattu) — Eurooppa sinetöity.',
      seuraavaksi: 'Valmiudessa; seuraava erä uudelta Fablelta '
        + '(esim. mekaniikkaerän savutestit).',
    },
  ],
  odottaaPaatosta: [
    'Uudelleenkirjoituksen pohjamalli: Fablen ehdotus — vanha '
      + 'kahden äänen rakenne (Reginaldin havainto + isoisän ääni '
      + 'johtolausevariaatioilla), kaariteksteistä vain parhaat '
      + 'kohtaukset ja faktat ilman mystiikkaa. Omistaja miettii.',
    'Kulkijan henkilöllisyys: hoitaja + kerääjä (suositus; kerääjä '
      + 'on Grimshawin jälkeläinen, revityn sivun palat) vai yksi '
      + 'hahmo — pääaarteen paljastusteksti kirjoitetaan tästä. '
      + 'HUOM: punnittava uudelleen 11.8. linjauksia vasten '
      + '(kukaan ei odota poikaa, mystiikka pois).',
    'Superlinssin ja tulevien kauppalinssien toiminnot — '
      + 'luonnostellaan yhdessä (omistajalla paljon ideoita).',
    'Aloituskaupunkiarvio: BA→Lima harkinnainen (LA→Chicago tehty).',
    '36 käyttämätöntä vihjeluentaa (puhe-*-vihje-*.mp3) repossa — '
      + 'poistetaanko mediat vai säilytetäänkö varalle?',
    'Aarrepotti: 7 × 2000 p = 14 000 p vaelluksessa — säädetäänkö '
      + 'STAR_PRIZE, jos palkkiot alkavat latistaa löytöjä?',
    'Afrikan jakotauluehdotus omistajalla luettavana.',
    'Ämpärin jäänteet kuvat/.jpg ja kuvat/..jpg — poisto vaatii '
      + 'ämpärioikeudet.',
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
    otsikko: 'Kertojan ääni palasi saapumisiin (v577)',
    ohje: 'Saavu mihin tahansa Euroopan kaupunkiin: saapumiskortti '
      + 'näyttää taas lyhyen kahden äänen merkinnän (Reginaldin '
      + 'havainto + isoisän nosto) ja kertoja lukee sen ääneen — '
      + 'kaaritekstien mykkä kausi on ohi. Tilapäinen ratkaisu '
      + 'kunnes tekstit kirjoitetaan uusiksi Raamattu 2.0:n mukaan. '
      + 'Vertailu: työhuoneen Näytteet-välilehden lopussa kaikki '
      + '41 merkintää.',
  },
  {
    otsikko: 'Seitsemän aarretta ja mannerlento (v576)',
    ohje: 'Aloita uusi peli: jokaisella mantereella on nyt oma Aarnin '
      + 'luettelon aarre (Meripihkahuone, kivilintu, jadesinetti…) — '
      + 'matkalaukun luettelo kertoo mitkä on löydetty. Kun mantereen '
      + 'aarre löytyy, Laiva & lento -valikkoon ilmestyy "Lennä '
      + 'Eurooppaan: Lontoo" -tyyliset napit mantereille, joiden aarre '
      + 'on vielä kateissa. Isoisän vihjekortti (revitty sivu) on '
      + 'poistunut pelistä. Vanhat tallennukset toimivat yhä.',
  },
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
