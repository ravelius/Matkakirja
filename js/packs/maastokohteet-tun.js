/*
 * MAASTOKOHTEET — TUN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs TUN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/TUN.json. Työkalu laskee laudan
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
 * Tunisian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Maalla on jo fokuskohde (Karthagon sotasatama), jota ei toisteta täällä; vuorennimi on fi-Wikipedian asussa Jabal ash Shanabi.
 */
export const MAASTOKOHTEET_TUN = [
  {
    id: 'jabalashshanabi',
    nimi: 'Jabal ash Shanabi',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi huipulla on metallinen puolikuu?',
      'Mikä on biosfäärialue?',
    ],
    korostukset: ['Kasserine|Kasserinen'],
    nappi: 'Tunisian korkein huippu',
    // 8.6831 E / 35.2067 N — en-Wikipedia "Jebel ech Chambi"
    laudat: {
      maailmankartta: { x: 6122.8, y: 1987.6 },
      europe: { x: 377.9, y: 967.7 },
    },
    teksti: 'Tunisian korkeimman vuoren huipulla on metallinen puolikuu, ja sen pystyttivät maan '
      + 'partiolaiset heti itsenäistymisen jälkeen vuonna 1956 merkiksi omasta nousustaan. '
      + 'Jabal ash Shanabi kohoaa 1 544 metriin Kasserinen yläpuolella, muutaman kilometrin '
      + 'päässä Algerian rajasta, ja sen laella kasvaa mäntymetsä. Kivi on caliche-kalkkikiveä, '
      + 'luonnon omaa sementtiä, jonka eroosio on uurtanut syviin uomiin; kolme '
      + 'sedimentaatiokierrosta erottuu punaisina savivyöhykkeinä. Unesco nimesi vuoren '
      + 'biosfäärialueeksi 1977. Joulukuusta 2012 alkaen sen luolissa on käyty myös aseellisia '
      + 'operaatioita.',
    lahde: 'en-Wikipedia "Jebel ech Chambi", johdanto-osa sekä osiot "Description" ja "Biosphere '
      + 'Reserve" (tarkistettu 1.9.2026).',
  },
  {
    id: 'valimeri',
    nimi: 'Välimeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Välimerta ympäröi maa lähes joka suunnalta?',
      'Mitä reittiä Välimereltä pääsee valtamerelle?',
    ],
    nappi: 'Meri jota maa ympäröi',
    // 11.6 E / 37.3 N — ulappa Kap Bonin niemen koillispuolella; artikkelin oma keskipiste on 18 / 35
    laudat: {
      maailmankartta: { x: 6220, y: 1907.8 },
      europe: { x: 433.9, y: 912.6 },
    },
    teksti: 'Välimeri on Euroopan, Aasian ja Afrikan välinen meri, jota maa ympäröi lähes kokonaan; '
      + 'Atlanttiin se yhtyy lännessä Gibraltarinsalmen kautta. Tunisian rannikko on meren '
      + 'etelälaidalla, ja Medjerda tuo maan jokivedet siihen Tunisinlahdessa.',
    lahde: 'en-Wikipedia "Mediterranean Sea" ja "Medjerda River", johdanto-osat (tarkistettu '
      + '30.8.2026).',
  },
  {
    id: 'medjerda',
    nimi: 'Medjerda',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä oli antiikin Utica?',
      'Miksi joki vaihtoi uomaa vuonna 1973?',
    ],
    korostukset: ['Utica|Utican'],
    nappi: 'Tunisian pisin joki',
    // 9.4 E / 36.6 N — joen keskijuoksu Testourin tienoilla; artikkelin koordinaatti 10,213 / 37,112 on suulla Tunisinlahdessa
    laudat: {
      maailmankartta: { x: 6146.7, y: 1934.6 },
      europe: { x: 391.7, y: 931 },
    },
    teksti: 'Medjerda hautasi kokonaisen merenlahden. Antiikin Utica oli satamakaupunki Utican '
      + 'lahden rannalla, mutta joen tuoma liete täytti lahtea vuosisata vuosisadalta: eteläosa '
      + 'umpeutui jo myöhäisantiikissa, ja pohjoisosasta meri vetäytyi keskiajalla ja uudella '
      + 'ajalla. Jäljelle jäi vain Ghar el Melhin laguuni — koko entisestä lahdesta. Joki itse '
      + 'on Tunisian pisin, noin 450 kilometriä, ja se alkaa Koillis-Algerian Tell-Atlaksesta '
      + 'ja laskee Tunisinlahteen. Vettä on padottu useaan kohtaan, ja se kastelee maan '
      + 'vehnäpeltoja. Vuoden 1973 suurtulvan jälkeen Medjerda siirsi uomaansa jälleen kerran '
      + 'ja kulkee nyt ihmisen kaivamaa kanavaa pitkin.',
    lahde: 'en-Wikipedia "Medjerda River", johdanto-osa ja osio "Course" (tarkistettu 1.9.2026).',
  },
];

