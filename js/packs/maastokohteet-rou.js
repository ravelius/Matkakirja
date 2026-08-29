/*
 * MAASTOKOHTEET — ROU. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs ROU --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/ROU.json. Työkalu laskee laudan
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
 * Romanian maastokohteet — TÄYDENNYS. Maalla on jo fokuskohteet-rou.js, jossa on Moldoveanu; tässä ovat puuttuvat. Faktat en-Wikipediasta 29.8.2026.
 */
export const MAASTOKOHTEET_ROU = [
  {
    id: 'negoiu',
    nimi: 'Negoiu',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitkä ovat Făgărașin vuoret?',
      'Kuinka lähellä toisiaan Negoiu ja Moldoveanu ovat?',
    ],
    korostukset: ['Făgăraș|Făgărașin'],
    nappi: 'Romanian toiseksi korkein',
    // 24.5557 E / 45.587 N — en-Wikipedia "Negoiu"
    laudat: {
      maailmankartta: { x: 6651.9, y: 1577.5 },
      europe: { x: 682.7, y: 694.7 },
    },
    teksti: 'Negoiu on 2 535 metriä korkea huippu Făgărașin vuorilla Eteläisissä Karpaateissa '
      + 'Sibiun piirikunnassa. Se on Romanian toiseksi korkein huippu heti 2 544-metrisen '
      + 'Moldoveanun jälkeen — yhdeksän metrin ero erottaa maan kaksi korkeinta.',
    lahde: 'en-Wikipedia "Negoiu", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'mustameri',
    nimi: 'Mustameri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Mustanmeren syvyys on hapeton?',
      'Mistä meri sai nimensä?',
    ],
    korostukset: ['valuma-alue|valuma-alue'],
    nappi: 'Meri, jonka valuma-alue on 24 maassa',
    // 29.8 E / 44.2 N — ulappa Constanțan edustalla; artikkelin oma keskipiste on 35 / 44
    laudat: {
      maailmankartta: { x: 6826.7, y: 1634.6 },
      europe: { x: 783.4, y: 731.1 },
    },
    teksti: 'Mustameri on Euroopan ja Aasian välinen reunameri Balkanin itäpuolella, Kaukasuksen '
      + 'länsipuolella ja Anatolian pohjoispuolella. Sen rannoilla on kuusi maata — Bulgaria, '
      + 'Georgia, Romania, Venäjä, Turkki ja Ukraina — mutta valuma-alue ulottuu 24 Euroopan '
      + 'maahan, koska meren suurimmat tulojoet ovat Tonava, Dnepr ja Dnestr.',
    lahde: 'en-Wikipedia "Black Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'tonava',
    nimi: 'Tonava',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Tonavan suisto on?',
      'Kuinka monen pääkaupungin läpi Tonava virtaa?',
    ],
    korostukset: ['Rooman valtakunta|Rooman valtakunnan'],
    nappi: 'Euroopan toiseksi pisin joki',
    // 25.97 E / 43.9 N — Giurgiun kohta Romanian ja Bulgarian rajalla; artikkelin koordinaatti 29,761 / 45,218 on suistossa, liian lähellä Mustanmeren merkkiä
    laudat: {
      maailmankartta: { x: 6699, y: 1646.9 },
      europe: { x: 709.8, y: 739 },
    },
    teksti: 'Tonava on Volgan jälkeen Euroopan toiseksi pisin joki: 2 850 kilometriä Saksan '
      + 'Schwarzwaldista Romanian suiston kautta Mustallemerelle. Se yhdistää nykyisin kymmenen '
      + 'Euroopan maata ja oli aikoinaan Rooman valtakunnan rajajoki. Romaniassa se muodostaa '
      + 'pitkän pätkän Bulgarian vastaista rajaa ja päättyy suistoon, joka on koko matkan '
      + 'viimeinen ja laajin osa.',
    lahde: 'en-Wikipedia "Danube", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

