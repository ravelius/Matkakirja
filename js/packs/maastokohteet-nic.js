/*
 * MAASTOKOHTEET — NIC. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs NIC --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/NIC.json. Työkalu laskee laudan
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
 * Nicaraguan maastokohteet. Faktat en-Wikipediasta 30.8.2026; Nicaraguajärvi on fi-Wikipedian artikkelinimi, Momotombo säilyy espanjankielisenä.
 */
export const MAASTOKOHTEET_NIC = [
  {
    id: 'momotombo',
    nimi: 'Momotombo',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä geoterminen voimala oikeastaan tekee?',
      'Miksi kaupunki rakennettiin uudelleen tulivuoren lähelle?',
    ],
    korostukset: ['geoterminen|geoterminen'],
    nappi: 'Nicaraguan tunnusmaisema',
    // -86.54 E / 12.4219 N — en-Wikipedia "Momotombo", infolaatikko 12°25′19″N 86°32′24″W
    laudat: {
      maailmankartta: { x: 2948.7, y: 2795.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Momotombo on kerrostulivuori Managuajärven rannalla lähellä Leónin kaupunkia, 1 297 '
      + 'metriä korkea. Sen poikkeuksellisen säännöllinen kartio on Nicaraguan tunnetuin '
      + 'maisema-aihe, ja runoilija Rubén Darío omisti sille runon. Vuoden 1610 purkaus pakotti '
      + 'Leónin asukkaat siirtämään kaupunkinsa noin 48 kilometriä länteen; vanhan kaupungin '
      + 'rauniot ovat yhä nähtävissä León Viejossa. Vuosisatojen hiljaiselon jälkeen tulivuori '
      + 'heräsi uudelleen 30. marraskuuta 2015 ja 28. helmikuuta 2016. Etelärinteellä on laaja '
      + 'geoterminen kenttä ja voimalaitos, ja järvessä kohoaa nuorempi kartio Momotombito.',
    lahde: 'en-Wikipedia "Momotombo", johdanto-osa ja osiot Eruptions ja Geothermal (tarkistettu '
      + '30.8.2026).',
  },
  {
    id: 'nicaraguajarvi',
    nimi: 'Nicaraguajärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Miten hai voi elää makeassa vedessä?',
      'Miksi Nicaraguaan suunniteltiin omaa kanavaa?',
    ],
    korostukset: ['häränhai|häränhaita'],
    nappi: 'Keski-Amerikan suurin järvi',
    // -85.35 E / 11.6167 N — en-Wikipedia "Lake Nicaragua", infolaatikko 11°37′N 85°21′W
    laudat: {
      maailmankartta: { x: 2988.3, y: 2822.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Nicaraguajärvi on Keski-Amerikan suurin makean veden järvi: pinta-alaa 8 264 '
      + 'neliökilometriä, mikä riittää maailman järvien joukossa yhdeksänneksitoista sijaksi. '
      + 'Vesi on matalaa, syvimmilläänkin vain 26 metriä, ja järven pinta on 32,7 metriä '
      + 'merenpinnan yläpuolella. Järvessä elää sahakaloja, tarponeja ja häränhaita, jotka '
      + 'nousevat San Juan -jokea pitkin Karibianmereltä — matka voi taittua viikossa. Sama '
      + 'joki teki Granadasta aikanaan Atlantin sataman, vaikka kaupunki on maantieteellisesti '
      + 'lähempänä Tyyntämerta. Järven keskellä on tulivuorisaari Ometepe, jonka huipuilta '
      + 'näkee Tyynellemerelle.',
    lahde: 'en-Wikipedia "Lake Nicaragua", johdanto-osa ja infolaatikko (tarkistettu 30.8.2026).',
  },
];

