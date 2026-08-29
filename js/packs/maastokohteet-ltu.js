/*
 * MAASTOKOHTEET — LTU. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs LTU --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/LTU.json. Työkalu laskee laudan
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
 * Liettuan maastokohteet. Faktat en-Wikipediasta 29.8.2026. Pieni maa: kolme kohdetta.
 */
export const MAASTOKOHTEET_LTU = [
  {
    id: 'aukstojas',
    nimi: 'Aukštojas',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi maan korkein kohta vaihtui vasta 2004?',
      'Mikä Medininkain ylänkö on?',
    ],
    korostukset: ['Medininkai|Medininkain'],
    nappi: 'Mäki, joka vaihtui vasta 2004',
    // 25.6261 E / 54.5271 N — en-Wikipedia "Aukštojas Hill"
    laudat: {
      maailmankartta: { x: 6687.5, y: 1187.6 },
      europe: { x: 703.2, y: 459.5 },
    },
    teksti: 'Aukštojas on Liettuan korkein kohta. Se on Medininkain ylängöllä noin 24 kilometriä '
      + 'Vilnasta kaakkoon. Korkeus mitattiin vuonna 2004 Vilnan Gediminas-teknillisen '
      + 'yliopiston geodesian laitoksella GPS:n avulla, ja tulos oli 293,84 metriä — sitä ennen '
      + 'maan korkeimpana pidettiin viidensadan metrin päässä olevaa Juozapinėä, 292,7 metriä.',
    lahde: 'en-Wikipedia "Aukštojas Hill", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'itameri',
    nimi: 'Itämeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä Kuurinkynnäs on?',
      'Miksi Itämeren vesi on murtovettä?',
    ],
    korostukset: ['murtovesi|murtovesiallas'],
    nappi: 'Maailman suurin murtovesiallas',
    // 20.6 E / 55.7 N — ulappa Kuurinkynnään edustalla; artikkelin oma keskipiste on 20 / 58
    laudat: {
      maailmankartta: { x: 6520, y: 1133.2 },
      europe: { x: 606.7, y: 428.7 },
    },
    teksti: 'Itämeri on Atlantin haara, jonka ympäröivät Tanska, Viro, Suomi, Saksa, Latvia, '
      + 'Liettua, Puola, Venäjä ja Ruotsi. Maantieteellisesti se jää Skandinavian niemimaan '
      + 'sekä Pohjois- ja Keski-Euroopan tasangon väliin. Se on maailman suurin murtovesiallas.',
    lahde: 'en-Wikipedia "Baltic Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'nemunas',
    nimi: 'Nemunas',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joella on niin monta nimeä?',
      'Mikä Kuurinlahti on?',
    ],
    korostukset: ['Kuurinlahti|Kuurinlahteen'],
    nappi: 'Joki, jolla on viisi nimeä',
    // 23.9 E / 54.9 N — Kaunas joen keskijuoksulla; artikkelin koordinaatti 21,247 / 55,337 on suistossa
    laudat: {
      maailmankartta: { x: 6630, y: 1170.4 },
      europe: { x: 670.1, y: 449.7 },
    },
    teksti: 'Nemunas — valkovenäjäksi Nioman, puolaksi Niemen, saksaksi Memel — nousee '
      + 'Keski-Valko-Venäjältä ja virtaa Liettuan halki. Sen eteläinen haara muodostaa Venäjän '
      + 'Kaliningradin alueen pohjoisrajan, ja lopulta joki laskee Kuurinlahteen, joka on '
      + 'kapean salmen kautta yhteydessä Itämereen. Sen 937 kilometriä tekevät siitä yhden '
      + 'Itä-Euroopan suurista joista: se virtaa länteen Grodnoon, pohjoiseen Kaunasiin ja '
      + 'siitä taas länteen merelle.',
    lahde: 'en-Wikipedia "Neman", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

