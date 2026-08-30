/*
 * MAASTOKOHTEET — IRQ. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs IRQ --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/IRQ.json. Työkalu laskee laudan
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
 * Irakin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Eufratin tarina on jo TUR:n listalla (Fırat), joten Irakin joet ovat Tigris ja Shatt al-Arab.
 */
export const MAASTOKOHTEET_IRQ = [
  {
    id: 'cheekhadar',
    nimi: 'Cheekha Dar',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi korkeudesta ei olla varmoja?',
      'Missä Irakin vuoristot ovat?',
    ],
    korostukset: ['Kurdistan|Kurdistanin'],
    nappi: 'Musta teltta, Irakin katto',
    // 44.9186 E / 36.7767 N — en-Wikipedia "Cheekha Dar"
    laudat: {
      maailmankartta: { x: 7330.6, y: 1927.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Cheekha Dar, kurdiksi "musta teltta", on nykytiedon mukaan Irakin korkein vuori: noin '
      + '3 611 metriä Kurdistanin alueella maan pohjoisosassa, aivan Iranin rajalla. Kahden '
      + 'jokilaakson maana tunnettu Irak nousee siis koilliskulmastaan oikeaksi vuoristoksi — '
      + 'ja huipun tarkasta korkeudesta kiistellään yhä, sillä lukema on peräisin mittausten '
      + 'eikä virallisen kartoituksen varasta.',
    lahde: 'en-Wikipedia "Cheekha Dar", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'tigris',
    nimi: 'Tigris',
    tyyppi: 'joki',
    kysymykset: [
      'Mitä Mesopotamia tarkoittaa?',
      'Mitkä suurkaupungit nousivat Tigriin varrelle?',
    ],
    korostukset: ['Mesopotamia|Mesopotamian', 'Assyria|Assyrian'],
    nappi: 'Mesopotamian itäisempi joki',
    // 44.36 E / 33.31 N — Bagdadin kohdalla; artikkelin koordinaatti 47,44 / 31,01 on yhtymäkohdassa al-Qurnahissa
    laudat: {
      maailmankartta: { x: 7312, y: 2058.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Tigris on Mesopotamian eli "jokien välisen maan" kahdesta joesta itäisempi — läntinen '
      + 'on Eufrat. Se virtaa Armenian ylängöltä etelään aavikoiden halki ja yhtyy lopulta '
      + 'Eufratiin ennen Persianlahtea. Sen rannoilla ovat Mosul, Tikrit, Samarra ja Bagdad, ja '
      + 'muinaisuudessa sen vesi elätti Assyrian suurvallan.',
    lahde: 'en-Wikipedia "Tigris", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'shattalarab',
    nimi: 'Shatt al-Arab',
    tyyppi: 'joki',
    kysymykset: [
      'Missä Eufrat ja Tigris yhtyvät?',
      'Miksi jokea pitää ruopata jatkuvasti?',
    ],
    korostukset: ['Basra|Basran'],
    nappi: 'Kahden virran yhteinen loppu',
    // 47.78 E / 30.5 N — Basran kohdalla; artikkelin koordinaatti 48,15 / 30,41 on joen suulla
    laudat: {
      maailmankartta: { x: 7426, y: 2162.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Shatt al-Arab, "arabien joki", syntyy kun Eufrat ja Tigris yhtyvät al-Qurnahin '
      + 'kaupungin kohdalla Etelä-Irakissa. Yhteistä virtaa riittää enää noin 200 kilometriä '
      + 'Basran ohi Persianlahteen, ja alajuoksullaan joki on Irakin ja Iranin rajana. Iranin '
      + 'puolelta siihen laskeva Karun tuo mukanaan niin paljon lietettä, että väylä pysyy '
      + 'laivakuntoisena vain jatkuvalla ruoppauksella.',
    lahde: 'en-Wikipedia "Shatt al-Arab", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

