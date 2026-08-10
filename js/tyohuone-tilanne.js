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
  paivitetty: '11.8.2026 (yö klo 03 Suomen aikaa) — YÖAJO KÄYNNISSÄ',
  tavoite: 'Yöajo: Euroopan matkakirjatekstit hiotaan uuteen rimaan '
    + 'erissä (kommellukset, tosihuomiot, mittaajan persoona), '
    + 'vuorigalleriat valmistuivat (52/52), ME-kaupunkilehdet '
    + 'etenevät. Luentojen generoinnit odottavat omistajan lupaa '
    + 'aamulla; ME-generointi odottaa Euroopan valmistumista.',
  rivit: [
    {
      tekija: 'Fable',
      rooli: 'tarina + koordinaatio',
      tila: 'tyossa',
      tehtava: 'Yön julkaisusykli: v551+v555 vuorigalleriat (52 '
        + 'kohdetta, 324 kuvaa), v552+v556 saapumiset uusiksi (19 '
        + 'kohdetta tähän mennessä), v553 maastoartikkelit i-ikkunaan, '
        + 'v554 ME:n Isfahan-korjaukset. Tromssan otsikkovuoto '
        + 'korjattu (otsikko paljasti visan vastauksen).',
      seuraavaksi: 'Vahtikierrokset yön yli ~75 min välein. Aamuksi '
        + 'omistajalle: aloituskaupunkipäätös (BA→Lima), lupa Euroopan '
        + 'luentojen generointiin (26 mykistettyä luentaa jonossa).',
    },
    {
      tekija: 'Fable max',
      rooli: 'syväajattelu (apusessio)',
      tila: 'tyossa',
      tehtava: 'Riman erät 1–3 valmiit ja mainissa: 19 saapumista '
        + 'uusiksi + 7 Reginald-mietintöä. Löysi ja korjasi Tromssan '
        + 'otsikkovuodon, tarkisti loput 40 otsikkoa (puhtaat).',
      seuraavaksi: 'Erä 4 käynnissä: isompi käsittely Sarajevo, '
        + 'Kiova, Bukarest, Praha; kevyt silaus Amsterdam, Krakova, '
        + 'Kööpenhamina, Berliini, Helsinki. Erä 5 päättää Euroopan.',
    },
    {
      tekija: 'Opus 1',
      rooli: 'lehdet + rakenne',
      tila: 'tyossa',
      tehtava: 'ME-kaupunkilehdet: Isfahan-korjauserä mainissa '
        + '(v554), Iranin lehteen historia- ja rakennukset-aiheet '
        + 'työn alla, ME-laudan erikoiskohteille maatunnukset.',
      seuraavaksi: 'ME-lehtien loput erät; lehtien esilataus jonossa.',
    },
    {
      tekija: 'Opus 5',
      rooli: 'vuorigalleriat + kuvatyöt',
      tila: 'tyossa',
      tehtava: 'Vuorigalleriaurakka VALMIS: 52/52 kohdetta, 324 '
        + 'käsin kuratoitua Commons-kuvaa (v551 + v555). '
        + 'Silmätarkistus hylkäsi mm. väärät vuoret, vesileimat ja '
        + 'GFDL-lisenssit; tekijätarkistin vertaa Commonsin kenttään.',
      seuraavaksi: 'Peiliajo: 324 uutta kuvaa + 15 nimenvaihtoa '
        + 'peiliin. Sen jälkeen perhekuvien kuratointierä '
        + 'numeroina-sivulle.',
    },
    {
      tekija: 'Sonnet 1',
      rooli: 'QA',
      tila: 'odottaa',
      tehtava: 'ME-kokonaisristiriitatarkistus valmis: 13/28 '
        + 'Isfahan-sääntö-spoileria löydetty ja kaikki käsitelty '
        + 'v554:ssä.',
      seuraavaksi: 'Euroopan Isfahan-sääntötarkistus käynnistyy '
        + 'automaattisesti 00:30Z (03:30 Suomen aikaa).',
    },
  ],
  odottaaPaatosta: [
    'Aloituskaupunkiarvio: 17/19 pidetään, LA→Chicago selvä, '
      + 'BA→Lima harkinnainen — päätös omistajalla.',
    'Euroopan uusien luentojen generointi: 26 mykistettyä luentaa '
      + 'odottaa lupaa (tekstit pelissä, vanhat äänet eivät soi '
      + 'väärän tekstin päällä).',
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
    otsikko: 'Matkakirjan saapumiset uudella rimalla (v552 + v556)',
    ohje: 'Saavu Istanbuliin, Lontooseen, Pietariin tai Madridiin: '
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
