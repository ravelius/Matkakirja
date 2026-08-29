/*
 * MAASTOKOHTEET — UKR. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs UKR --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/UKR.json. Työkalu laskee laudan
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
 * Ukrainan maastokohteet. Faktat en-Wikipediasta 29.8.2026.
 */
export const MAASTOKOHTEET_UKR = [
  {
    id: 'hoverla',
    nimi: 'Hoverla',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä polonyna on?',
      'Mikä joki saa alkunsa Hoverlalta?',
    ],
    korostukset: ['polonyna|polonyna'],
    nappi: 'Ukrainan korkein vuori',
    // 24.5003 E / 48.16 N — en-Wikipedia "Hoverla"
    laudat: {
      maailmankartta: { x: 6650, y: 1469.4 },
      europe: { x: 681.6, y: 627 },
    },
    teksti: 'Hoverla on 2 061 metriä korkea ja Ukrainan korkein vuori sekä osa Ukrainan '
      + 'Karpaatteja. Se sijaitsee Itä-Beskideilla Tšornohoran alueella. Rinteitä peittävät '
      + 'pyökki- ja kuusimetsät, joiden yläpuolelle jää subalpiinisten niittyjen vyöhyke, jota '
      + 'ukrainaksi kutsutaan nimellä polonyna. Prut-joen päälähde on vuoren itärinteellä.',
    lahde: 'en-Wikipedia "Hoverla", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'mustameri',
    nimi: 'Mustameri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Mustameren syvyys on hapeton?',
      'Mistä meri sai nimensä?',
    ],
    korostukset: ['valuma-alue|valuma-alue'],
    nappi: 'Meri, jonka valuma-alue on 24 maassa',
    // 32 E / 44.4 N — ulappa Krimin eteläpuolella; artikkelin oma keskipiste on 35 / 44
    laudat: {
      maailmankartta: { x: 6900, y: 1626.4 },
      europe: { x: 825.6, y: 725.9 },
    },
    teksti: 'Mustameri on Euroopan ja Aasian välinen reunameri Balkanin itäpuolella, Kaukasuksen '
      + 'länsipuolella ja Anatolian pohjoispuolella. Sen rannoilla on kuusi maata — Bulgaria, '
      + 'Georgia, Romania, Venäjä, Turkki ja Ukraina — mutta valuma-alue ulottuu 24 Euroopan '
      + 'maahan, koska meren suurimmat tulojoet ovat Tonava, Dnepr ja Dnestr.',
    lahde: 'en-Wikipedia "Black Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'asovanmeri',
    nimi: 'Asovanmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä Kertšinsalmi on?',
      'Miksi Asovanmeri on niin matala?',
    ],
    korostukset: ['Kertšinsalmi|Kertšinsalmen'],
    nappi: 'Meri kapean salmen takana',
    // 36.5 E / 46.3 N — en-Wikipedia "Sea of Azov" (37 / 46), siirretty hieman länteen Ukrainan rannikon puolelle
    laudat: {
      maailmankartta: { x: 7050, y: 1547.9 },
      europe: { x: 912, y: 675.9 },
    },
    teksti: 'Asovanmeri on Itä-Euroopan sisämannerjalustameri, joka yhtyy Mustaanmereen kapean '
      + 'Kertšinsalmen kautta ja jota pidetään toisinaan Mustanmeren pohjoisena jatkeena. Sitä '
      + 'rajaavat idässä Venäjä sekä luoteessa ja lounaassa Ukraina. Se on tärkeä kulkureitti '
      + 'Keski-Aasiaan Kaspianmereltä Volga–Don-kanavan kautta.',
    lahde: 'en-Wikipedia "Sea of Azov", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'dnepr',
    nimi: 'Dnepr',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Kiova rakennettiin Dneprin varrelle?',
      'Mitkä olivat Dneprin kosket?',
    ],
    korostukset: ['Valdai|Valdain'],
    nappi: 'Euroopan neljänneksi pisin joki',
    // 35.14 E / 47.84 N — Zaporižžjan kohta joen suuressa mutkassa; artikkelin koordinaatti 32,333 / 46,5 on suistossa
    laudat: {
      maailmankartta: { x: 7004.7, y: 1483 },
      europe: { x: 885.9, y: 635.4 },
    },
    teksti: 'Dnepr on yksi Euroopan suurista rajat ylittävistä joista. Se nousee Valdain '
      + 'kukkuloilta Smolenskin luota Venäjältä ja virtaa Valko-Venäjän ja Ukrainan halki '
      + 'Mustaanmereen. Pituutta sillä on noin 2 200 kilometriä ja valuma-alueella 504 000 '
      + 'neliökilometriä, joten se on sekä Ukrainan että Valko-Venäjän pisin joki ja Euroopan '
      + 'neljänneksi pisin Volgan, Tonavan ja Uralin jälkeen.',
    lahde: 'en-Wikipedia "Dnieper", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'dnestr',
    nimi: 'Dnestr',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joki kulkee kahdesti Ukrainan läpi?',
      'Missä Dnestrin lähde on?',
    ],
    nappi: 'Joki, joka palaa takaisin',
    // 30.23 E / 46.35 N — en-Wikipedia "Dniester" — joen suu Ukrainan puolella
    laudat: {
      maailmankartta: { x: 6841, y: 1545.8 },
      europe: { x: 791.6, y: 674.6 },
    },
    teksti: 'Dnestr on Itä-Euroopan rajat ylittävä joki. Se virtaa ensin Ukrainan halki, sitten '
      + 'Moldovan läpi ja laskee lopulta Mustaanmereen jälleen Ukrainan puolella. Sama joki käy '
      + 'siis kahdessa maassa ja palaa takaisin siihen, mistä lähti.',
    lahde: 'en-Wikipedia "Dniester", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

