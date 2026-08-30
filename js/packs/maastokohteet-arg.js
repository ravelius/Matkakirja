/*
 * MAASTOKOHTEET — ARG. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs ARG --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/ARG.json. Työkalu laskee laudan
 * projektiot (maailmankartta = Millerin lieriö, europe = tasaväli),
 * jättää pois laudan, jonka kaavan ulkopuolelle kohde jää, ja
 * tarkistaa että jokainen kohde osuu maan fokuslehden rajaukseen —
 * ikkunan ulkopuolinen merkki olisi olemassa mutta pelaajan
 * ulottumattomissa. Faktat on tarkistettu en-Wikipediasta lähde
 * kerrallaan, ja jokaisen kohteen `lahde`-rivi kertoo mistä artikkelin
 * osasta se on.
 *
 * Maa on YLEISELLÄ reitillä: lehdellä ei ole poltettuja
 * maastonimiä lainkaan, joten merkin nimiö on maastonimen ainoa
 * esiintymä kartalla. Kaksoisnimen vaaraa ei siis ole.
 *
 * Lista yhdistyy maan muihin kohteisiin js/packs/maastokohteet.js
 * -hakemiston kautta (js/fokuskohteet.js KOHDE_MAAT), joten maan
 * mahdollista olemassa olevaa fokuskohteet-pakkia EI ole tarvinnut
 * koskea eikä yhtään sen kohdetta ole toistettu täällä.
 *
 * Argentiinan maastokohteet. Faktat en-Wikipediasta 30.8.2026. Nimien suomalainen asu fi-Wikipediasta: Aconcagua, Río de la Plata, Iguassun putoukset. Huom: fi-Wikipedia antaa Aconcagualle 6 961 m, en-Wikipedian tietolaatikko mitatun 6 967 m — teksti seuraa en-Wikipediaa kuten erän sääntö vaatii.
 */
export const MAASTOKOHTEET_ARG = [
  {
    id: 'aconcagua',
    nimi: 'Aconcagua',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Aconcagualle ei tarvita köysiä?',
      'Minne vuoren tulivuoritoiminta katosi?',
    ],
    korostukset: ['Andit|Andien'],
    nappi: 'Amerikkojen korkein huippu',
    // -70.0117 E / -32.6531 N — en-Wikipedia "Aconcagua", tietolaatikko (32°39′11″S 70°00′42″W)
    laudat: {
      maailmankartta: { x: 3499.6, y: 4339.7 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Aconcagua kohoaa Andien pääketjussa Mendozan maakunnassa, noin viidentoista kilometrin '
      + 'päässä Chilen rajasta. Huippu on 6 967 metrissä: se on Amerikkojen korkein vuori ja '
      + 'korkein koko Aasian ulkopuolella, ja se kuuluu seitsemään huippuun eli maanosien '
      + 'korkeimpiin. Vuori syntyi, kun Nazcan laatta työntyi Etelä-Amerikan laatan alle; ennen '
      + 'mioseenikauden mullistuksia se oli toimiva kerrostulivuori. Pohjoisen normaalireittiä '
      + 'pidetään maailman korkeimpana nousuna, joka ei vaadi köysiä. Huipulla ilmanpaine on '
      + 'silti vain noin 40 prosenttia merenpinnan arvosta, ja vain kolmasosa yrittäjistä '
      + 'pääsee perille.',
    lahde: 'en-Wikipedia "Aconcagua", johdanto-osa ja tietolaatikko (tarkistettu 30.8.2026).',
  },
  {
    id: 'riodelaplata',
    nimi: 'Río de la Plata',
    tyyppi: 'meri',
    kysymykset: [
      'Onko Río de la Plata joki vai merenlahti?',
      'Miksi hopeajoen rannoilla asuu niin paljon väkeä?',
    ],
    nappi: 'Maailman levein joki',
    // -57.2 E / -35 N — estuaarin Argentiinan-puoleinen selkä Buenos Airesin edustalla; en-Wikipedia "Río de la Plata" antaa keskipisteeksi -55,78 / -35,67
    laudat: {
      maailmankartta: { x: 3926.7, y: 4427.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Río de la Plata syntyy siellä, missä Uruguayjoki ja Paranájoki yhtyvät Punta Gordan '
      + 'kohdalla, ja laskee Atlantin valtamereen suppilomaisena aukkona Etelä-Amerikan '
      + 'kaakkoisrannikolla. Maantieteilijät kiistelevät yhä, onko se joki, estuaari, lahti vai '
      + 'reunameri. Jokena pidettynä se on maailman levein: pituutta on vain noin 290 '
      + 'kilometriä, mutta leveys kasvaa parista kilometristä 220 kilometriin suulla. Estuaari '
      + 'muodostaa osan Argentiinan ja Uruguayn rajasta, ja sen rannat ovat molempien maiden '
      + 'tiheimmin asuttua seutua. Vettä ylittää vuosittain 2,5 miljoonaa matkustajaa.',
    lahde: 'en-Wikipedia "Río de la Plata", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'iguassunputoukset',
    nimi: 'Iguassun putoukset',
    // Putous on joen kohta, ei oma maastoluokkansa: tyyppi 'joki' pitää
    // kortin ylärivin oikeana ilman uutta luokkaa. Sama ratkaisu kuin
    // Venezuelan Angelinputouksella (js/packs/maastokohteet-ven.js).
    tyyppi: 'joki',
    kysymykset: [
      'Kumman maan puolella putouksista on enemmän?',
      'Mitä guaranin sana ûasú tarkoittaa?',
    ],
    korostukset: ['guarani|guaranin'],
    nappi: 'Maailman suurin putousjärjestelmä',
    // -54.4447 E / -25.6867 N — en-Wikipedia "Iguazu Falls" (25°41′12″S 54°26′41″W)
    laudat: {
      maailmankartta: { x: 4018.5, y: 4086.7 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Iguassun putoukset ovat Iguaçujoen putouksia Argentiinan Misionesin maakunnan ja '
      + 'Brasilian Paranán osavaltion rajalla, ja yhdessä ne muodostavat maailman suurimman '
      + 'putousjärjestelmän. Putoukset jakavat joen ylä- ja alajuoksuun. Iguaçujoki saa alkunsa '
      + 'aivan Curitiban kaupungin sydämestä ja virtaa suurimman osan matkastaan Brasiliassa, '
      + 'mutta itse putouksista suurin osa on Argentiinan puolella. Nimi tulee guaranin '
      + 'sanoista y eli vesi ja ûasú eli iso. Ensimmäinen putoukset muistiin kirjannut '
      + 'eurooppalainen oli espanjalainen valloittaja Álvar Núñez Cabeza de Vaca vuonna 1541.',
    lahde: 'en-Wikipedia "Iguazu Falls", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

