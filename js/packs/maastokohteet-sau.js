/*
 * MAASTOKOHTEET — SAU. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs SAU --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/SAU.json. Työkalu laskee laudan
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
 * Saudi-Arabian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Rub al-Khali on maan tunnusmaasto ja mukana aavikkona: tyyppi vaihdetaan pakissa käsin arvoon 'muu' + symboli 'luonto' Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js).
 */
export const MAASTOKOHTEET_SAU = [
  {
    id: 'jabalsawda',
    nimi: 'Jabal Sawda',
    tyyppi: 'vuori',
    kysymykset: [
      'Voiko olla epäselvää, mikä on maan korkein vuori?',
      'Miten vuori mitataan?',
    ],
    nappi: 'Kiistelty korkein kohta',
    // 42.3683 E / 18.2667 N — en-Wikipedia "Jabal Sawda"
    laudat: {
      maailmankartta: { x: 7245.6, y: 2595.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Jabal Sawda Asirin ylängöllä on Saudi-Arabian virallisesti tunnustettu korkein kohta, '
      + '3 015 metriä. Tosin vuoden 2018 mittaus antoi vain 2 999 metriä — hieman vähemmän kuin '
      + 'naapurihuippu Jabal Ferwan 3 002 — joten aavikkovaltion katosta kiistellään yhä. '
      + 'Huipulle pääsee köysiradalla läheisestä as-Sūdan kylästä.',
    lahde: 'en-Wikipedia "Jabal Sawda", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'rubalkhali',
    nimi: 'Rub al-Khali',
    // Aavikko ei ole vuori eikä meri: tyyppi 'muu' + symboli 'luonto'
    // Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js) — kortin
    // ylärivi näyttää silloin luokan Luonto eikä väärää otsaketta.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi aavikon nimi on Tyhjä neljännes?',
      'Voiko aavikon poikki matkustaa?',
    ],
    korostukset: ['Tyhjä neljännes|Tyhjän neljänneksen'],
    nappi: 'Tyhjä neljännes',
    // 50 E / 20 N — en-Wikipedia "Rub' al Khali"
    laudat: {
      maailmankartta: { x: 7500, y: 2536 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Rub al-Khali, arabiaksi Tyhjä neljännes, peittää suurimman osan Arabian niemimaan '
      + 'eteläisestä kolmanneksesta. Hiekkaa on noin 650 000 neliökilometrin alalla — '
      + 'Saudi-Arabian lisäksi Omanin, Arabiemiirikuntien ja Jemenin puolella. Se on osa '
      + 'laajempaa Arabian aavikkoa ja yksi maailman suurimmista yhtenäisistä '
      + 'hiekka-aavikoista.',
    lahde: 'en-Wikipedia "Rub\' al Khali", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'punainenmeri',
    nimi: 'Punainenmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Punainenmeri levenee vuosi vuodelta?',
      'Miten Suezin kanava muutti merenkulun?',
    ],
    korostukset: ['Bab-el-Mandeb|Bab-el-Mandebin'],
    nappi: 'Meri kahden mantereen raossa',
    // 38.3 E / 21.2 N — ulappa Jiddan edustalla; artikkelin oma keskipiste on 38 / 22
    laudat: {
      maailmankartta: { x: 7110, y: 2494.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Punainenmeri on pitkä ja kapea meri Arabian niemimaan ja Afrikan välissä: 2 250 '
      + 'kilometriä pitkä mutta leveimmilläänkin vain 355 kilometriä. Etelässä se yhtyy '
      + 'valtamereen Bab-el-Mandebin salmen kautta, pohjoisessa Suezin kanava vie Välimerelle. '
      + 'Meren alla kulkee Punaisenmeren hautavajoama, osa Suurta hautavajoamaa — kaksi '
      + 'mannerlaattaa erkanee siinä toisistaan.',
    lahde: 'en-Wikipedia "Red Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

