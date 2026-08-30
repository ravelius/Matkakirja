/*
 * MAASTOKOHTEET — ZWE. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs ZWE --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/ZWE.json. Työkalu laskee laudan
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
 * Zimbabwen maastokohteet. Faktat en-Wikipediasta 30.8.2026. Sisämaavaltion vedet ovat kaksi suurta rajajokea; Sambesin merkki on Victorian putousten kohdalla, joka on joen kuuluisin paikka ja Zimbabwen rajalla. Maalla on jo fokuskohde (Suuri Zimbabwe), jota ei toisteta täällä.
 */
export const MAASTOKOHTEET_ZWE = [
  {
    id: 'mountnyangani',
    nimi: 'Mount Nyangani',
    tyyppi: 'vuori',
    kysymykset: [
      'Millainen on Nyanganin lakitasanko?',
      'Miksi itärinteet ovat metsäisemmät kuin läntiset?',
    ],
    nappi: 'Zimbabwen korkein vuori',
    // 32.8417 E / -18.3 N — en-Wikipedia "Mount Nyangani"
    laudat: {
      maailmankartta: { x: 6928.1, y: 3828.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mount Nyangani on Zimbabwen korkein vuori: 2 592 metriä Nyangan kansallispuistossa '
      + 'maan itäosassa. Varsinainen huippu on vain nelisenkymmentä metriä ympäristöään '
      + 'korkeampi kalliopaljastuma laajan, kumpuilevan ylätasangon laella. Kosteammilla '
      + 'itärinteillä kasvaa ikivihreää metsää, lännempänä avautuu heinämaata.',
    lahde: 'en-Wikipedia "Mount Nyangani", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'sambesi',
    nimi: 'Sambesi',
    tyyppi: 'joki',
    kysymykset: [
      'Kuinka leveät Victorian putoukset ovat?',
      'Mitä tarkoittaa Mosi-oa-Tunya?',
    ],
    korostukset: ['Victorian putoukset|Victorian putouksiin'],
    nappi: 'Joki joka syöksyy Victorian putouksiin',
    // 25.8567 E / -17.9244 N — Victorian putoukset Zimbabwen ja Sambian rajalla (en-Wikipedia "Victoria Falls"); joen artikkelin koordinaatti 36,470 / -18,571 on suistossa Mosambikissa
    laudat: {
      maailmankartta: { x: 6695.2, y: 3815.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Sambesi on Afrikan neljänneksi pisin joki ja suurin Intian valtamereen laskevista: 2 '
      + '574 kilometriä Sambiasta Mosambikin rannikolle. Zimbabwen ja Sambian rajalla se '
      + 'syöksyy Victorian putouksiin, yhteen maailman suurimmista vesiputouksista, jonka '
      + 'leveys on 1 708 metriä. Putousten paikallinen lozinkielinen nimi Mosi-oa-Tunya '
      + 'tarkoittaa jylisevää savua.',
    lahde: 'en-Wikipedia "Zambezi" ja "Victoria Falls", johdanto-osat (tarkistettu 30.8.2026).',
  },
  {
    id: 'limpopo',
    nimi: 'Limpopo',
    tyyppi: 'joki',
    kysymykset: [
      'Kuka eurooppalainen näki joen ensimmäisenä?',
      'Kuinka pitkän matkan Limpopo on rajajokena?',
    ],
    nappi: 'Rajajoki Intian valtamereen',
    // 30 E / -22.21 N — Beitbridgen tienoo Etelä-Afrikan vastaisella rajalla; artikkelin koordinaatti 33,511 / -25,206 on suulla Mosambikissa
    laudat: {
      maailmankartta: { x: 6833.3, y: 3964 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Limpopo saa alkunsa Etelä-Afrikasta ja virtaa noin 1 750 kilometriä suuressa kaaressa '
      + 'Mosambikin läpi Intian valtamereen; noin 640 kilometrin matkalla se erottaa '
      + 'Etelä-Afrikan Botswanasta ja Zimbabwesta. Se on Sambesin jälkeen toiseksi suurin '
      + 'Intian valtamereen laskeva Afrikan joki. Ensimmäinen joen nähnyt eurooppalainen oli '
      + 'Vasco da Gama, joka ankkuroi sen suulle vuonna 1498.',
    lahde: 'en-Wikipedia "Limpopo River", johdanto ja osa Course (tarkistettu 30.8.2026).',
  },
];

