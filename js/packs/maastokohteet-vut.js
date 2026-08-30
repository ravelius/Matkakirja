/*
 * MAASTOKOHTEET — VUT. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs VUT --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/VUT.json. Työkalu laskee laudan
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
 * Vanuatun maastokohteet. Faktat en-Wikipediasta 30.8.2026; Tyynimeri on fi-Wikipedian nimiasu. Tyynenmeren merkki on avomerellä Vanuatun itäpuolella — valtameren oma keskipiste on toisella puolella maapalloa, ja maan vesikohteen on osuttava lehden rajaukseen.
 */
export const MAASTOKOHTEET_VUT = [
  {
    id: 'mounttabwemasana',
    nimi: 'Mount Tabwemasana',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä vuoren suhteellinen korkeus tarkoittaa?',
      'Miksi huipulla käy niin harva ihminen?',
    ],
    korostukset: ['Espiritu Santo|Espiritu Santon'],
    nappi: 'Vanuatun korkein huippu',
    // 166.755 E / -15.3625 N — en-Wikipedia "Mount Tabwemasana" (15°21′45″S 166°45′18″E)
    laudat: {
      maailmankartta: { x: 11391.8, y: 3727.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mount Tabwemasana on Vanuatun korkein vuori, 1 879 metriä, ja se kohoaa Espiritu '
      + 'Santon saarella. Koska vuori nousee suoraan merestä, sen suhteellinen korkeus on yhtä '
      + 'suuri kuin korkeus merenpinnasta: se on niin sanottu ultraprominentti huippu ja yksi '
      + 'Tyynenmeren korkeimmista. Laella käy tavallisesti alle kuusi ihmistä vuodessa. Perille '
      + 'pääsee veneellä Kerepuan kylään, sieltä jokea ylös ja lopuksi jyrkkiä rinteitä '
      + 'opastettuna. Vuorella kasvaa puulaji, jota ei tavata missään muualla maailmassa, ja '
      + 'tarina kertoo kahdesta huipusta, jotka syleilevät toisiaan öisin.',
    lahde: 'en-Wikipedia "Mount Tabwemasana", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'yasur',
    nimi: 'Yasur',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on strombolinen purkaus?',
      'Miksi Yasuria voi yleensä lähestyä turvallisesti?',
    ],
    korostukset: ['kerrostulivuori|kerrostulivuori'],
    nappi: 'Vuosisatoja purkautunut tulivuori',
    // 169.4483 E / -19.5283 N — en-Wikipedia "Mount Yasur" (19°31′42″S 169°26′54″E)
    laudat: {
      maailmankartta: { x: 11481.6, y: 3870.7 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Yasur on 361 metriä korkea kerrostulivuori Tannan saarella. Se on purkautunut lähes '
      + 'yhtäjaksoisesti useiden satojen vuosien ajan, useita kertoja tunnissa, ja purkaukset '
      + 'ovat tyypiltään strombolisia tai vulkaanisia. Laella on lähes ympyränmuotoinen, 400 '
      + 'metriä leveä kraatteri kasvittomalla tuhkakartiolla. Vuorta voi yleensä lähestyä '
      + 'turvallisesti, ja siitä on tullut maan tunnetuin nähtävyys. James Cookin retkikunta '
      + 'löysi saaren 1774 ilmeisesti juuri tulivuoren hehkun houkuttelemana. John Frum '
      + '-liikkeelle Yasur on pyhä: sen uskotaan olevan Frumin asuinsija.',
    lahde: 'en-Wikipedia "Mount Yasur", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'tyynimeri',
    nimi: 'Tyynimeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä on Tyynenmeren tulirengas?',
      'Kuinka syvälle Mariaanien hauta ulottuu?',
    ],
    korostukset: ['tulirengas|tulirengas'],
    nappi: 'Maailman suurin valtameri',
    // 170.3 E / -18.6 N — avomeri Vanuatun itäpuolella; valtamerellä ei ole lehden ikkunaan osuvaa keskipistettä
    laudat: {
      maailmankartta: { x: 11510, y: 3838.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Vanuatun saaret ovat pisara Tyynessämeressä, maailman suurimmassa valtameressä. '
      + 'Pinta-alaa on 165 250 000 neliökilometriä eli noin 46 prosenttia maapallon '
      + 'vesipinnasta ja 32 prosenttia koko maapallon pinnasta — enemmän kuin kaikella maalla '
      + 'yhteensä. Keskisyvyys on 4 280 metriä, ja syvin kohta, Mariaanien haudan '
      + 'Challenger-syvänne, ulottuu 10 911 metriin. Nimen antoi Ferdinand Magellan vuonna '
      + '1520: Mar Pacífico, rauhallinen meri, koska hän kohtasi purjehdukselle suotuisat '
      + 'tuulet. Merellä on yli 25 000 saarta, ja sen reunoja kiertää tulirengas.',
    lahde: 'en-Wikipedia "Pacific Ocean", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

