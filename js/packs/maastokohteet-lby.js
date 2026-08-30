/*
 * MAASTOKOHTEET — LBY. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs LBY --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/LBY.json. Työkalu laskee laudan
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
 * Libyan maastokohteet. Faktat en-Wikipediasta 30.8.2026. Libyassa ei ole pysyviä jokia, joten joen paikalla on toinen meri: Iso-Syrtti (fi-Wikipedian nimi; en "Gulf of Sidra").
 */
export const MAASTOKOHTEET_LBY = [
  {
    id: 'bikkubitti',
    nimi: 'Bikku Bitti',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi ensimmäinen huiputus onnistui vasta 2005?',
      'Missä Tibestin vuoristo on?',
    ],
    korostukset: ['Tibesti|Tibestin'],
    nappi: 'Huippu, jolle noustiin vasta 2005',
    // 19.2067 E / 22.0036 N — en-Wikipedia "Bikku Bitti"
    laudat: {
      maailmankartta: { x: 6473.6, y: 2466.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Bikku Bitti eli Bette on Libyan korkein vuori: noin 2 267 metriä. Se sijaitsee '
      + 'Tibestin vuoriston Dohonen haarakkeessa syvällä eteläisessä autiomaassa, lähellä '
      + 'Tšadin rajaa. Vuori on niin syrjäinen, että ensimmäinen tunnettu nousu huipulle '
      + 'tehtiin vasta joulukuussa 2005, kun brittiläinen Ginge Fullen onnistui kahden '
      + 'epäonnistuneen yrityksen jälkeen.',
    lahde: 'en-Wikipedia "Bikku Bitti", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'valimeri',
    nimi: 'Välimeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Välimerta sanotaan lännen sivilisaation kehdoksi?',
      'Montako reunamerta Välimereen kuuluu?',
    ],
    nappi: 'Antiikin valtatie',
    // 13.5 E / 33.3 N — ulappa Tripolin edustalla; en-Wikipedia "Mediterranean Sea" antaa keskipisteeksi 18 / 35
    laudat: {
      maailmankartta: { x: 6283.3, y: 2059.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Välimeri on Euroopan, Aasian ja Afrikan välissä lepäävä meri, jonka rantaa koko Libyan '
      + 'pitkä rannikko on. Meri on lähes kokonaan maan ympäröimä ja peittää noin 2,5 miljoonaa '
      + 'neliökilometriä. Antiikissa se oli kauppiaiden, matkalaisten ja siirtolaisten '
      + 'valtatie, jonka ääreltä nousivat Egyptin, Kreikan ja hedelmällisen puolikuun varhaiset '
      + 'korkeakulttuurit — siksi sitä on kutsuttu lännen sivilisaation hautomoksi.',
    lahde: 'en-Wikipedia "Mediterranean Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'isosyrtti',
    nimi: 'Iso-Syrtti',
    tyyppi: 'meri',
    kysymykset: [
      'Missä Pieni-Syrtti sijaitsee?',
      'Mistä lahden nykyiset nimet tulevat?',
    ],
    nappi: 'Antiikin Syrtis Major',
    // 18 E / 31.5 N — en-Wikipedia "Gulf of Sidra" (18 / 31,5)
    laudat: {
      maailmankartta: { x: 6433.3, y: 2125.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Iso-Syrtti on Välimeren suuri lahti Libyan pohjoisrannikolla. Antiikin aikaan se '
      + 'tunnettiin nimellä Syrtis Major erotuksena Tunisian rannikon Pienestä-Syrtistä eli '
      + 'Syrtis Minorista. Nykyiset nimet Gulf of Sidra ja Gulf of Sirte tulevat Sidran '
      + 'öljysatamasta ja Sirten kaupungista.',
    lahde: 'en-Wikipedia "Gulf of Sidra", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

