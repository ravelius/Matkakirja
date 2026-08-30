/*
 * MAASTOKOHTEET — GTM. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs GTM --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/GTM.json. Työkalu laskee laudan
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
 * Guatemalan maastokohteet. Faktat en-Wikipediasta 30.8.2026; Atitlánjärvi on fi-Wikipedian artikkelinimi, Tajumulco säilyy espanjankielisenä.
 */
export const MAASTOKOHTEET_GTM = [
  {
    id: 'tajumulco',
    nimi: 'Tajumulco',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vanhoja tulivuorenpurkauksia on vaikea todentaa jälkikäteen?',
      'Millaista ylängöllä on neljän kilometrin korkeudessa?',
    ],
    korostukset: ['kerrostulivuori|Kerrostulivuori'],
    nappi: 'Keski-Amerikan korkein huippu',
    // -91.9033 E / 15.0436 N — en-Wikipedia "Volcán Tajumulco", infolaatikko 15°02′37″N 91°54′12″W
    laudat: {
      maailmankartta: { x: 2769.9, y: 2706.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Tajumulco on Keski-Amerikan korkein vuori, 4 203 metriä. Kerrostulivuori kohoaa '
      + 'Guatemalan läntisessä San Marcosin departementissa lähellä Meksikon rajaa, eikä '
      + 'yksikään toinen huippu koko Keski-Amerikassa yllä yhtä korkealle. Purkauksista '
      + 'kerrotaan 1700-luvun ja 1800-luvun alun lähteissä, mutta niitä pidetään '
      + 'epätodennäköisinä: varmaa purkausajankohtaa ei tunneta. Pohjois-Amerikan huipuista '
      + 'Tajumulco on suhteelliselta korkeudeltaan viidenneksi merkittävin, eristyneisyydeltään '
      + 'viidestoista ja korkeudeltaan kuudeskymmenesyhdeksäs — maanosan korkeimmat vuoret ovat '
      + 'kaukana pohjoisessa.',
    lahde: 'en-Wikipedia "Volcán Tajumulco", johdanto-osa ja infolaatikko (tarkistettu 30.8.2026).',
  },
  {
    id: 'atitlanjarvi',
    nimi: 'Atitlánjärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä on kaldera?',
      'Mitä supertulivuoren purkaus tekee koko maapallon ilmastolle?',
    ],
    korostukset: ['kaldera|kaldera'],
    nappi: 'Keski-Amerikan syvin järvi',
    // -91.2 E / 14.7 N — en-Wikipedia "Lake Atitlán", infolaatikko 14°42′N 91°12′W
    laudat: {
      maailmankartta: { x: 2793.3, y: 2718 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Atitlánjärvi on Keski-Amerikan syvin järvi: syvyyttä 340 metriä, pinta-alaa 130 '
      + 'neliökilometriä ja korkeutta merenpinnasta 1 562 metriä. Allas on kaldera, joka syntyi '
      + 'noin 79 500 vuotta sitten Los Chocoyosin supertulivuorenpurkauksessa. Järven '
      + 'eteläreunaa hallitsee kolme tulivuorta: Atitlán, San Pedro ja Tolimán. Kirjailija '
      + 'Aldous Huxley vertasi järveä Italian Comojärveen ja päätti, että Atitlán on Como, jota '
      + 'on koristeltu vielä muutamalla valtavalla tulivuorella.',
    lahde: 'en-Wikipedia "Lake Atitlán", johdanto-osa ja infolaatikko (tarkistettu 30.8.2026).',
  },
];

