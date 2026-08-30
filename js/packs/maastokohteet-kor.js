/*
 * MAASTOKOHTEET — KOR. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs KOR --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/KOR.json. Työkalu laskee laudan
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
 * Etelä-Korean maastokohteet (pelin Korea-koodi on KOR, asia-countries.js: 'Etelä-Korea'; PRK on oma lehtensä). Faktat en-Wikipediasta 30.8.2026. Japaninmeri on annettu JPN:lle, joten Korean meri on Keltainenmeri.
 */
export const MAASTOKOHTEET_KOR = [
  {
    id: 'hallasan',
    nimi: 'Hallasan',
    tyyppi: 'vuori',
    kysymykset: [
      'Miten kilpitulivuori eroaa kartiosta?',
      'Mitkä ovat Korean kolme päävuorta?',
    ],
    korostukset: ['Jeju|Jejun'],
    nappi: 'Tulivuori, joka on kokonainen saari',
    // 126.5292 E / 33.3617 N — en-Wikipedia "Hallasan" — Jejun saarella lehden ikkunan etelälaidalla
    laudat: {
      maailmankartta: { x: 10051, y: 2056.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Hallasan on kilpitulivuori, joka muodostaa suurimman osan Jejun saaresta Korean '
      + 'niemimaan eteläpuolella — ja sen laki, 1 947 metriä, on koko Etelä-Korean korkein '
      + 'kohta. Maan korkein vuori ei siis ole mantereella vaan saarella, joka on itsessään '
      + 'tulivuoren rakentama. Korealaiset lukevat sen maan kolmen päävuoren joukkoon Jirisanin '
      + 'ja Seoraksanin rinnalle, ja koko vuori ympäristöineen on kansallispuistoa.',
    lahde: 'en-Wikipedia "Hallasan", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'keltainenmeri',
    nimi: 'Keltainenmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mistä meri on saanut värinsä ja nimensä?',
      'Mitä nimi on koreaksi?',
    ],
    korostukset: ['Hwanghae|Hwanghae'],
    nappi: 'Matala meri Kiinan ja Korean välissä',
    // 125 E / 36 N — ulappa niemimaan länsirannikon edustalla; artikkelin oma keskipiste 123 / 38 jää lehden ikkunan länsipuolelle
    laudat: {
      maailmankartta: { x: 10000, y: 1957.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Keltainenmeri on läntisen Tyynenmeren reunameri Manner-Kiinan ja Korean niemimaan '
      + 'välissä, pohjimmiltaan Itä-Kiinan meren matala luoteisosa. Korealaiset kutsuvat sitä '
      + 'nimellä Hwanghae, joka tarkoittaa täsmälleen samaa — keltaista merta. Väri ei ole '
      + 'tarua: Kiinan suuret joet kuljettavat mereen niin paljon hienoa maa-ainesta, että vesi '
      + 'todella sävyttyy.',
    lahde: 'en-Wikipedia "Yellow Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'nakdong',
    nimi: 'Nakdong',
    tyyppi: 'joki',
    kysymykset: [
      'Minkä muinaisen liiton rajana joki toimi?',
      'Mitkä suurkaupungit ovat joen varrella?',
    ],
    korostukset: ['Gaya|Gayan'],
    nappi: 'Etelä-Korean pisin joki',
    // 128.9225 E / 35.0517 N — en-Wikipedia "Nakdong River" — joen suu Busanin kohdalla
    laudat: {
      maailmankartta: { x: 10130.8, y: 1993.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Nakdong eli Nakdonggang on Etelä-Korean pisin joki. Se virtaa etelään maan itäosan '
      + 'halki Daegun suurkaupungin ohi ja laskee mereen satamakaupunki Busanin kohdalla. '
      + 'Nimensä joki on saanut historiasta: kolmen kuningaskunnan aikana se oli Gayan '
      + 'liittokunnan itäraja.',
    lahde: 'en-Wikipedia "Nakdong River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

