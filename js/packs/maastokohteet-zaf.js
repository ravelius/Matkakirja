/*
 * MAASTOKOHTEET — ZAF. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs ZAF --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/ZAF.json. Työkalu laskee laudan
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
 * Etelä-Afrikan maastokohteet. Faktat en-Wikipediasta 30.8.2026. Kaksi vuorta: Mafadi on maan korkein kohta, mutta Pöytävuori on sen tunnetuin — molemmat mahtuvat neljän kohteen kiintiöön.
 */
export const MAASTOKOHTEET_ZAF = [
  {
    id: 'mafadi',
    nimi: 'Mafadi',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Mafadi ei ole itsenäinen vuorenhuippu?',
      'Missä on koko eteläisen Afrikan korkein piste?',
    ],
    nappi: 'Etelä-Afrikan korkein kohta',
    // 29.3571 E / -29.2023 N — en-Wikipedia "Mafadi"
    laudat: {
      maailmankartta: { x: 6811.9, y: 4213.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mafadi on Etelä-Afrikan korkein kohta: 3 446 metriä Lesothon vastaisella rajalla. '
      + 'Tarkkaan ottaen se ei ole itsenäinen huippu vaan Lesothon puolella kohoavan Makhekan '
      + 'sivuhuippu, ja koko eteläisen Afrikan korkein piste, 3 482-metrinen Thabana Ntlenyana, '
      + 'jää sekin Lesothon puolelle.',
    lahde: 'en-Wikipedia "Mafadi", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'poytavuori',
    nimi: 'Pöytävuori',
    tyyppi: 'vuori',
    kysymykset: [
      'Miten tasaiselle laelle pääsee?',
      'Mikä on fynbos?',
    ],
    korostukset: ['fynbos|fynbosia'],
    nappi: 'Kapkaupungin tasalakinen maamerkki',
    // 18.4099 E / -33.9622 N — en-Wikipedia "Table Mountain"; korkeus on Maclearin kivimerkin kohdalta
    laudat: {
      maailmankartta: { x: 6447, y: 4388.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Pöytävuori on Kapkaupungin ylle kohoava tasalakinen maamerkki, jonka korkein kohta, '
      + 'Maclearin kivimerkki vuodelta 1865, on 1 086 metrissä. Laelle pääsee köysiradalla tai '
      + 'jalan, ja vuorella kasvaa 2 285 kasvilajia, joista noin neljä viidesosaa on seudulle '
      + 'omaleimaista fynbosia. Pöytävuoren kansallispuisto on Etelä-Afrikan vierailluin.',
    lahde: 'en-Wikipedia "Table Mountain", johdanto-osa ja osa Maclear\'s Beacon (tarkistettu '
      + '30.8.2026).',
  },
  {
    id: 'intianvaltameri',
    nimi: 'Intian valtameri',
    tyyppi: 'meri',
    kysymykset: [
      'Mitkä Afrikan suurjoet laskevat tähän valtamereen?',
      'Kuinka suuri valtameri on?',
    ],
    nappi: 'Valtameri maan itärannalla',
    // 31.6 E / -30.6 N — ulappa Durbanin edustalla; artikkelin oma keskipiste on 80 / -20
    laudat: {
      maailmankartta: { x: 6886.7, y: 4264 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Intian valtameri on maailman kolmanneksi suurin valtameri: yli 70 miljoonaa '
      + 'neliökilometriä eli noin viidennes maapallon vesipinnasta. Etelä-Afrikan itäranta '
      + 'avautuu sille, ja suurimmat siihen laskevat Afrikan joet ovat Sambesi ja Limpopo.',
    lahde: 'en-Wikipedia "Indian Ocean" ja "Limpopo River", johdanto-osat (tarkistettu 30.8.2026).',
  },
  {
    id: 'oranjejoki',
    nimi: 'Oranjejoki',
    tyyppi: 'joki',
    kysymykset: [
      'Missä Oranje saa alkunsa?',
      'Miksi joki ei kulje suurten kaupunkien kautta?',
    ],
    nappi: 'Etelä-Afrikan pisin joki',
    // 21.25 E / -28.45 N — Upington joen keskijuoksulla; artikkelin koordinaatti 16,452 / -28,633 on suulla
    laudat: {
      maailmankartta: { x: 6541.7, y: 4185.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Oranjejoki on Etelä-Afrikan pisin joki: 2 432 kilometriä Lesothon Drakensbergin '
      + 'vuorilta länteen Atlanttiin. Matkallaan se muodostaa osia Lesothon ja Namibian '
      + 'vastaisista rajoista sekä useista maakuntarajoista, mutta Upingtonia lukuun ottamatta '
      + 'se ei kulje yhdenkään suuren kaupungin kautta.',
    lahde: 'en-Wikipedia "Orange River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

