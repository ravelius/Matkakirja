/*
 * MAASTOKOHTEET — SDN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs SDN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/SDN.json. Työkalu laskee laudan
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
 * Sudanin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Niilin merkki on Khartumin kohdalla, jossa Valkoinen ja Sininen Niili yhtyvät — koko joen kuuluisin kohtauspaikka on Sudanissa.
 */
export const MAASTOKOHTEET_SDN = [
  {
    id: 'jebelmarra',
    nimi: 'Jebel Marra',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Jebel Marralla on lähteitä keskellä Sahelia?',
      'Mikä on kalderaromahdus?',
    ],
    korostukset: ['Deriba|Deriban'],
    nappi: 'Tulivuori Darfurin sydämessä',
    // 24.27 E / 12.95 N — en-Wikipedia "Marrah Mountains" ja "Deriba (caldera)"
    laudat: {
      maailmankartta: { x: 6642.3, y: 2777.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Keskellä Sahelin kuivaa savannia on saari, jossa sataa. Jebel Marran ylimmillä '
      + 'rinteillä vallitsee lauhkea ilmasto, runsaat sateet ja pysyviä lähteitä, vaikka '
      + 'alapuolella leviää pensasaro. Vuoristo on tulivuorten muodostama massiivi, joka kohoaa '
      + '3 042 metriin ja jopa 2 600 metriä ympäröivän tasangon yläpuolelle — Nigerin '
      + 'Aïr-vuoria lukuun ottamatta ainoa suuri vuoristo koko muutoin tasaisessa Sahelissa. '
      + 'Sudanin korkein kohta on Deriban kaldera, joka syntyi noin 1500 eaa. viimeisessä '
      + 'purkauksessa: hohkakivi- ja pyroklastivirrat kulkivat yli kolmenkymmenen kilometrin '
      + 'päähän, ja sitten katto romahti. Vuoret hidastivat aikanaan arabialaistumisen '
      + 'leviämistä idästä länteen ja tarjosivat turvapaikan sulttaaneille.',
    lahde: 'en-Wikipedia "Marrah Mountains", johdanto-osa sekä osiot "Geography" ja "History" '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'punainenmeri',
    nimi: 'Punainenmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Punaisenmeren pohjalla kulkee repeämä?',
      'Mitä reittiä merestä pääsee valtamerelle?',
    ],
    nappi: 'Repeämä kahden mantereen välissä',
    // 37.9 E / 19.8 N — ulappa Port Sudanin edustalla; artikkelin oma keskipiste on 38 / 22
    laudat: {
      maailmankartta: { x: 7096.7, y: 2542.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Punainenmeri on Afrikan ja Arabian niemimaan välinen meri, Intian valtameren lahti, '
      + 'joka on noin 2 250 kilometriä pitkä mutta leveimmilläänkin vain 355 kilometriä. '
      + 'Valtamereen se yhtyy etelässä Bab el Mandebin salmen kautta, pohjoisessa odottavat '
      + 'Suezinlahti ja kanava. Meren pohjalla kulkee Punaisenmeren repeämä, osa Suurta '
      + 'hautavajoamaa.',
    lahde: 'en-Wikipedia "Red Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'niili',
    nimi: 'Niili',
    tyyppi: 'joki',
    kysymykset: [
      'Kumpi tuo enemmän vettä, Valkoinen vai Sininen Niili?',
      'Kuinka pitkä Niili oikein on?',
    ],
    nappi: 'Maailman pisin joki',
    // 32.55 E / 15.62 N — Khartum, jossa Valkoinen ja Sininen Niili yhtyvät; artikkelin koordinaatti 31,14 / 30,17 on Egyptissä
    laudat: {
      maailmankartta: { x: 6918.3, y: 2686.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Niili on maailman pisin joki: 7 088 kilometriä kohti pohjoista ja Välimerta. Merkki on '
      + 'Khartumin kohdalla, jossa sen kaksi päähaaraa yhtyvät: pitempi Valkoinen Niili tulee '
      + 'Victorianjärven suunnalta ja Sininen Niili Etiopian Tanajärveltä. Sininen Niili tuo '
      + 'vedestä yli kaksi kolmasosaa, vaikka Valkoista Niiliä pidetään joen latvavetenä.',
    lahde: 'en-Wikipedia "Nile", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

