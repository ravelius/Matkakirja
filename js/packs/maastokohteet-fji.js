/*
 * MAASTOKOHTEET — FJI. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs FJI --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/FJI.json. Työkalu laskee laudan
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
 * Fidžin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Tomanivi on myös fi-Wikipedian nimi; Koromerelle ei ole fi-Wikipedian artikkelia, joten suomalainen asu on johdettu englannin nimestä Koro Sea. Fidži on päivämäärärajan päällä: Koromeren merkki on artikkelin keskipisteen (180 / −18) sijaan hieman lännempänä, jottei se jää lehden rajauksen itälaidan taakse.
 */
export const MAASTOKOHTEET_FJI = [
  {
    id: 'tomanivi',
    nimi: 'Tomanivi',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi sammunut tulivuori on saarelle tärkeä vesivarasto?',
      'Mikä on kotoperäinen lintulaji?',
    ],
    korostukset: ['Viti Levu|Viti Levun'],
    nappi: 'Fidžin korkein huippu',
    // 178.0167 E / -17.6331 N — en-Wikipedia "Tomanivi" (17°37′59″S 178°01′00″E)
    laudat: {
      maailmankartta: { x: 11767.2, y: 3805.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Tomanivi on Fidžin korkein vuori, 1 324 metriä, ja se kohoaa pääsaaren Viti Levun '
      + 'keskiylängöllä. Kyseessä on sammunut tulivuori, jonka kivi on noin 150 miljoonaa '
      + 'vuotta vanhaa; ennen huippu tunnettiin nimellä Mount Victoria. Saaren suuret joet '
      + 'Rewa, Navua, Sigatoka ja Ba saavat kaikki alkunsa näiltä keskisiltä vuorilta. '
      + 'Rinteiden vuorisademetsä on 17 500 hehtaarin laajuinen tärkeä lintualue, jossa elää '
      + 'äärimmäisen uhanalainen punakurkkuluri sekä muita vain Fidžillä tavattavia lintuja. '
      + 'Huipulle vie polku Navain kylästä.',
    lahde: 'en-Wikipedia "Tomanivi", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'koromeri',
    nimi: 'Koromeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi koralliriutat tekevät purjehduksesta vaikeaa?',
      'Miten päivämääräraja mutkittelee Fidžin kohdalla?',
    ],
    korostukset: ['koralliriutta|koralliriuttaa'],
    nappi: 'Meri saariston keskellä',
    // 179.5 E / -18 N — meren keskiosa Koron saaren eteläpuolella; en-Wikipedia "Koro Sea" antaa keskipisteeksi 180 / −18
    laudat: {
      maailmankartta: { x: 11816.7, y: 3817.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Koromeri on Fidžin saarten keskelle jäävä meri lounaisella Tyynellämerellä, noin 2 100 '
      + 'kilometriä Aucklandista pohjoiseen. Sitä ympäröivät saariston yli kolmesataa saarta: '
      + 'Viti Levu, pohjoisessa Vanua Levu ja Taveuni, lännessä Kadavu ja idässä Lau-saaret. '
      + 'Pinta-alaa on noin 58 000 neliökilometriä ja syvyyttä enimmillään 2 930 metriä. '
      + 'Saarten välissä on noin 411 neliökilometriä koralliriuttaa, kareja ja hiekkasärkkiä, '
      + 'joten laivat pääsevät läpi vain muutamasta kapeasta salmesta. Nimi tulee '
      + 'tuliperäisestä Koron saaresta meren luoteisosassa.',
    lahde: 'en-Wikipedia "Koro Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

