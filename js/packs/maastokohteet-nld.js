/*
 * MAASTOKOHTEET — NLD. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs NLD --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/NLD.json. Työkalu laskee laudan
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
 * Alankomaiden maastokohteet. Faktat en-Wikipediasta 29.8.2026. Pieni maa: kolme kohdetta.
 */
export const MAASTOKOHTEET_NLD = [
  {
    id: 'vaalserberg',
    nimi: 'Vaalserberg',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä Saba on?',
      'Mitä NAP tarkoittaa?',
    ],
    korostukset: ['Limburg|Limburgin'],
    nappi: 'Maan korkein kohta — 322 metriä',
    // 6.0208 E / 50.7547 N — en-Wikipedia "Vaalserberg"
    laudat: {
      maailmankartta: { x: 6034, y: 1357.2 },
      europe: { x: 326.8, y: 558.8 },
    },
    teksti: 'Vaalserberg on 322,4 metriä NAP-tason yläpuolella ja Alankomaiden Euroopan-puoleisen '
      + 'osan korkein kohta. Se on Limburgin maakunnassa maan kaakkoisimmassa kolkassa lähellä '
      + 'Vaalsin kaupunkia, jonka mukaan se on nimetty. Se oli koko kuningaskunnan korkein '
      + 'kohta aina vuoteen 2010, jolloin Karibian Saba 887-metrisine tulivuorineen liitettiin '
      + 'maahan erityiskuntana.',
    lahde: 'en-Wikipedia "Vaalserberg", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'pohjanmeri',
    nimi: 'Pohjanmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miten hollantilaiset ovat vallanneet maata mereltä?',
      'Miksi Pohjanmeri on niin matala?',
    ],
    nappi: 'Meri, jolta maa on otettu',
    // 4.2 E / 53.4 N — ulappa Alankomaiden rannikon edustalla; artikkelin oma keskipiste on 3 / 56
    laudat: {
      maailmankartta: { x: 5973.3, y: 1239.1 },
      europe: { x: 291.8, y: 489.2 },
    },
    teksti: 'Pohjanmeri on Ison-Britannian, Tanskan, Norjan, Saksan, Alankomaiden, Belgian ja '
      + 'Ranskan välinen meri Euroopan mannerjalustalla. Etelässä se yhtyy Atlanttiin Englannin '
      + 'kanaalin kautta ja pohjoisessa Norjanmereen. Pituutta sillä on yli 970 kilometriä, '
      + 'leveyttä 580 ja pinta-alaa 570 000 neliökilometriä.',
    lahde: 'en-Wikipedia "North Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'maas',
    nimi: 'Maas',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Rein–Maas–Schelde-suisto on?',
      'Missä Maas saa alkunsa?',
    ],
    korostukset: ['suisto|suistosta'],
    nappi: 'Joki kolmen maan läpi',
    // 6.17 E / 51.37 N — Venlo joen Alankomaiden-puoleisella osuudella; artikkelilla ei ole koordinaattia
    laudat: {
      maailmankartta: { x: 6039, y: 1330.1 },
      europe: { x: 329.7, y: 542.6 },
    },
    teksti: 'Maas eli ranskaksi Meuse on 925 kilometrin pituinen joki, joka nousee Ranskasta ja '
      + 'virtaa Belgian ja Alankomaiden läpi. Se laskee Pohjanmereen '
      + 'Rein–Maas–Schelde-suistosta, samasta suistosta kuin Reinkin. Alankomaissa se on Reinin '
      + 'ohella maan kaksi suurta vesireittiä.',
    lahde: 'en-Wikipedia "Meuse", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

