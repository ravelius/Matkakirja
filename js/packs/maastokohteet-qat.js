/*
 * MAASTOKOHTEET — QAT. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs QAT --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/QAT.json. Työkalu laskee laudan
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
 * Qatarin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Qatar on matala aavikkoniemimaa ilman vuoria ja jokia, joten molemmat kohteet ovat merta: niemimaata joka puolelta ympäröivä Persianlahti ja kuuluisa "sisämeri" Khawr al-Udayd.
 */
export const MAASTOKOHTEET_QAT = [
  {
    id: 'persianlahti',
    nimi: 'Persianlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Miten helmiä kalastettiin ennen öljyä?',
      'Missä Hormuzinsalmi on?',
    ],
    korostukset: ['helmisimpukoita|helmisimpukoistaan'],
    nappi: 'Meri joka ympäröi maan',
    // 51.75 E / 25.6 N — ulappa Dohan koillispuolella; artikkelin oma keskipiste on 52 / 26
    laudat: {
      maailmankartta: { x: 7558.3, y: 2339.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Persianlahti on Länsi-Aasian sisämeri Arabian niemimaan ja Iranin välissä, ja Qatarin '
      + 'niemimaa työntyy siihen joka puolelta veden ympäröimänä. Lahti on Intian valtameren ja '
      + 'Arabianmeren jatke, joka yhtyy Omaninlahteen Hormuzinsalmen kautta. Se on tunnettu '
      + 'kalavesistään, riutoistaan ja runsaista helmisimpukoistaan — helmenpyynnin merestä '
      + 'ennen öljyä.',
    lahde: 'en-Wikipedia "Persian Gulf", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'khawraludayd',
    nimi: 'Khawr al-Udayd',
    tyyppi: 'meri',
    kysymykset: [
      'Miten meri pääsee keskelle hiekkadyynejä?',
      'Mikä on luonnonsuojelualue?',
    ],
    nappi: 'Aavikon sisämeri',
    // 51.296 E / 24.63 N — en-Wikipedia "Khor Al Adaid"
    laudat: {
      maailmankartta: { x: 7543.2, y: 2373.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Khawr al-Udayd on Persianlahden poukama Qatarin kaakkoiskulmassa Saudi-Arabian '
      + 'rajalla, noin 78 kilometriä Dohasta etelään. Englanniksi sitä kutsutaan sisämereksi '
      + '(Inland Sea), sillä vesi työntyy siinä syvälle aavikon sisään. Alue rauhoitettiin '
      + 'luonnonsuojelualueeksi 2007, ja Qatar on esittänyt sitä Unescon '
      + 'maailmanperintöluetteloon.',
    lahde: 'en-Wikipedia "Khor Al Adaid", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

