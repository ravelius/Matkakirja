/*
 * MAASTOKOHTEET — CYP. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs CYP --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/CYP.json. Työkalu laskee laudan
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
 * Kyproksen maastokohteet. Faktat en-Wikipediasta 30.8.2026. Välimerta EI oteta tähän: se on jo ESP:n ja TUR:n listoilla, ja saaren oma tarina kerrotaan vuoren ja saaren pisimmän joen kautta.
 */
export const MAASTOKOHTEET_CYP = [
  {
    id: 'olympos',
    nimi: 'Ólympos',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuoren toinen nimi on Chionistra?',
      'Mikä Troodosin vuoristo on?',
    ],
    korostukset: ['Troodos|Troodosin'],
    nappi: 'Kyproksen katto, toiselta nimeltään Luminen',
    // 32.8633 E / 34.9364 N — en-Wikipedia "Mount Olympus (Cyprus)"
    laudat: {
      maailmankartta: { x: 6928.8, y: 1997.8 },
      europe: { x: 842.2, y: 974.8 },
    },
    teksti: 'Ólympos on Kyproksen korkein kohta, 1 952 metriä, Troodosin vuoriston keskellä. '
      + 'Kreikkalainen kansannimi Chionistra tarkoittaa lumista — ja nimi pitää paikkansa, '
      + 'sillä Välimeren saareksi huippu saa talvisin kunnon lumipeitteen. Vuori on syntynyt '
      + 'merenpohjan syvyyksistä: sen kivi on Troodosin ofioliitin serpentiiniytynyttä '
      + 'vaippakiveä, jota tutkitaan ympäri maailmaa.',
    lahde: 'en-Wikipedia "Mount Olympus (Cyprus)", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'pediaios',
    nimi: 'Pediaíos',
    tyyppi: 'joki',
    kysymykset: [
      'Minkä kaupungin läpi joki virtaa?',
      'Missä muinainen Salamis sijaitsi?',
    ],
    korostukset: ['Nikosia|Nikosian'],
    nappi: 'Saaren pisin joki, pääkaupungin halki',
    // 33.9167 E / 35.1667 N — en-Wikipedia "Pedieos" — joen alajuoksu Mesaorian tasangolla
    laudat: {
      maailmankartta: { x: 6963.9, y: 1989.1 },
      europe: { x: 862.4, y: 968.7 },
    },
    teksti: 'Pediaíos on Kyproksen pisin joki, 98 kilometriä. Se saa alkunsa Troodosin vuoriston '
      + 'Machairasin metsästä, virtaa koilliseen Mesaorian tasangon poikki ja kulkee '
      + 'pääkaupunki Nikosian läpi — kaupungissa sen rantoja pitkin pääsee kävelemään lähes '
      + 'kahdenkymmenen kilometrin matkan. Mereen joki laskee Famagustanlahdella, muinaisen '
      + 'Salamiin kaupungin raunioiden vieressä.',
    lahde: 'en-Wikipedia "Pedieos", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

