/*
 * MAASTOKOHTEET — TUR. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs TUR --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/TUR.json. Työkalu laskee laudan
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
 * Turkin maastokohteet — TÄYDENNYS. Maalla on jo fokuskohteet-tur.js (Ararat, Mustameri, Kızılırmak); tässä ovat puuttuvat. Faktat en-Wikipediasta 29.8.2026.
 */
export const MAASTOKOHTEET_TUR = [
  {
    id: 'marmaranmeri',
    nimi: 'Marmaranmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Bosporinsalmi on niin tärkeä?',
      'Mikä Dardanellit on?',
    ],
    korostukset: ['Bosporinsalmi|Bosporin', 'Dardanellit|Dardanellien'],
    nappi: 'Maailman pienin meri',
    // 28 E / 40.6667 N — en-Wikipedia "Sea of Marmara"
    laudat: {
      maailmankartta: { x: 6766.7, y: 1776.6 },
      europe: { x: 748.8, y: 824.1 },
    },
    teksti: 'Marmaranmeri on pieni sisämeri kokonaan Turkin rajojen sisällä. Se yhdistää '
      + 'Mustanmeren ja Egeanmeren Bosporin ja Dardanellien salmien kautta ja erottaa samalla '
      + 'Turkin Euroopan- ja Aasian-puoleiset osat toisistaan. Pinta-alaa sillä on 11 350 '
      + 'neliökilometriä ja mittoja noin 280 kertaa 80 kilometriä, joten sitä pidetään maailman '
      + 'pienimpänä merenä; syvimmillään se on 1 370 metriä.',
    lahde: 'en-Wikipedia "Sea of Marmara", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'valimeri',
    nimi: 'Välimeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka kapea Gibraltarinsalmi todella on?',
      'Miksi Anatolian etelärannikkoa kutsutaan Turkoosiksi rannikoksi?',
    ],
    korostukset: ['Gibraltarinsalmi|Gibraltarinsalmen'],
    nappi: 'Meri kolmen maanosan välissä',
    // 31 E / 35.6 N — ulappa Anatolian etelärannikon edustalla; artikkelin oma keskipiste on 18 / 35
    laudat: {
      maailmankartta: { x: 6866.7, y: 1972.7 },
      europe: { x: 806.4, y: 957.3 },
    },
    teksti: 'Välimeri on maanosien välinen meri Euroopan, Aasian ja Afrikan keskellä, ja maa '
      + 'ympäröi sen lähes kokonaan. Idässä sitä rajaavat Levantti ja pohjoisessa Anatolia, eli '
      + 'Turkin rannikko on sen pohjoisreuna. Lännessä se yhtyy Atlanttiin Gibraltarinsalmen '
      + 'kautta, koillisessa Bosporinsalmi vie Mustallemerelle ja kaakossa Suezin kanava '
      + 'Punaisellemerelle.',
    lahde: 'en-Wikipedia "Mediterranean Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'frat',
    nimi: 'Fırat',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Mesopotamia oli?',
      'Missä Eufrat ja Tigris yhtyvät?',
    ],
    korostukset: ['Mesopotamia|Mesopotamian'],
    nappi: 'Mesopotamian toinen joki',
    // 38.75 E / 38.8 N — Kebanin pato Elazığin luona joen Turkin-puoleisella yläjuoksulla; artikkelin koordinaatti 47,442 / 31,005 on Shatt al-Arabissa Irakissa
    laudat: {
      maailmankartta: { x: 7125, y: 1849.8 },
      europe: { x: 955.2, y: 873.2 },
    },
    teksti: 'Fırat eli Eufrat on Länsi-Aasian pisin ja historiallisesti merkittävimpiä jokia. '
      + 'Yhdessä Tigriksen kanssa se on toinen Mesopotamian kahdesta määrittävästä joesta. Se '
      + 'saa alkunsa Turkista ja virtaa Syyrian ja Irakin halki, kunnes yhtyy Tigrikseen Shatt '
      + 'al-Arabissa ja laskee siitä Persianlahteen.',
    lahde: 'en-Wikipedia "Euphrates", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

