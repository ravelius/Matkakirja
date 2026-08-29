/*
 * MAASTOKOHTEET — IRL. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs IRL --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/IRL.json. Työkalu laskee laudan
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
 * Irlannin maastokohteet. Faktat en-Wikipediasta 29.8.2026. Pieni maa: kolme kohdetta.
 */
export const MAASTOKOHTEET_IRL = [
  {
    id: 'carrauntoohil',
    nimi: 'Carrauntoohil',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä nimi Corrán Tuathail tarkoittaa?',
      'Mikä on Devil\'s Ladder?',
    ],
    korostukset: ['MacGillycuddy\'s Reeks|MacGillycuddy\'s Reeks'],
    nappi: 'Irlannin korkein vuori',
    // -9.7427 E / 51.9994 N — en-Wikipedia "Carrauntoohil"
    laudat: {
      maailmankartta: { x: 5508.6, y: 1302.1 },
      europe: { x: 24.1, y: 526 },
    },
    teksti: 'Carrauntoohil on Irlannin korkein vuori, 1 038,6 metriä. Se on Iveraghin niemimaalla '
      + 'Kerryn kreivikunnassa lähellä maan korkeimman vuorijonon MacGillycuddy\'s Reeksin '
      + 'keskustaa. Vuori on pääosin hiekkakiveä, jonka jäätiköityminen on veistänyt jyrkiksi '
      + 'rotkoiksi ja teräviksi harjanteiksi itä- ja koillisseinämiin. Irlanninkielinen nimi '
      + 'Corrán Tuathail tarkoittaa Tuathalin sirppiä.',
    lahde: 'en-Wikipedia "Carrauntoohil", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'irlanninmeri',
    nimi: 'Irlanninmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä Yrjönkanaali on?',
      'Miksi Mansaari on oma alueensa?',
    ],
    nappi: 'Kahden saaren välinen meri',
    // -5.6 E / 53.4 N — ulappa Irlannin itärannikon edustalla; artikkelin oma keskipiste on -5 / 53,5
    laudat: {
      maailmankartta: { x: 5646.7, y: 1239.1 },
      europe: { x: 103.7, y: 489.2 },
    },
    teksti: 'Irlanninmeri on 46 007 neliökilometrin vesialue, joka erottaa Irlannin saaren '
      + 'Isosta-Britanniasta. Etelässä se yhtyy Kelttienmereen Yrjönkanaalin kautta ja '
      + 'pohjoisessa Skotlannin länsipuolisiin sisämeriin Pohjoiskanaalin kautta. Sen suurin '
      + 'saari on Anglesey Pohjois-Walesissa ja toiseksi suurin Mansaari.',
    lahde: 'en-Wikipedia "Irish Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'shannon',
    nimi: 'Shannon',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Shannon jakaa Irlannin kahtia?',
      'Kuinka suuri Shannonin valuma-alue on?',
    ],
    nappi: 'Brittein saarten pisin joki',
    // -8.66 E / 52.657 N — en-Wikipedia "River Shannon" (Limerickin seutu joen alajuoksulla)
    laudat: {
      maailmankartta: { x: 5544.7, y: 1272.7 },
      europe: { x: 44.9, y: 508.7 },
    },
    teksti: 'Shannon on Irlannin saaren tärkein joki ja 360 kilometrin pituisena Brittein saarten '
      + 'pisin. Sen valuma-alue on 16 900 neliökilometriä eli noin viidennes koko Irlannin '
      + 'pinta-alasta. Joki erottaa saaren länsiosan muusta maasta lähes koko pituudeltaan.',
    lahde: 'en-Wikipedia "River Shannon", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

