/*
 * MAASTOKOHTEET — CZE. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs CZE --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/CZE.json. Työkalu laskee laudan
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
 * Tšekin maastokohteet. Faktat en-Wikipediasta 29.8.2026. Sisämaavaltio: ei meriä.
 */
export const MAASTOKOHTEET_CZE = [
  {
    id: 'snezka',
    nimi: 'Sněžka',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuorella on kaksi nimeä?',
      'Mitä huipulla on nykyään?',
    ],
    korostukset: ['Sudeetit|Sudeettien'],
    nappi: 'Tšekin korkein piste',
    // 15.7403 E / 50.7361 N — en-Wikipedia "Sněžka"
    laudat: {
      maailmankartta: { x: 6358, y: 1358 },
      europe: { x: 513.4, y: 559.2 },
    },
    teksti: 'Sněžka eli puolaksi Śnieżka on Tšekin ja Puolan rajalla ja Jättiläisvuorten Sleesian '
      + 'harjanteen hallitsevin kohta. Sen 1 603 metrin huippu on samalla Tšekin korkein piste, '
      + 'Ala-Sleesian voivodikunnan korkein kohta ja koko Sudeettien katto. Sama huippu on siis '
      + 'kahden maan korkein vuori omalla puolellaan rajaa.',
    lahde: 'en-Wikipedia "Sněžka", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'labe',
    nimi: 'Labe',
    tyyppi: 'joki',
    kysymykset: [
      'Missä Elben lähde tarkalleen on?',
      'Miksi joella on kaksi nimeä?',
    ],
    nappi: 'Joki, joka on Saksassa Elbe',
    // 14.13 E / 50.53 N — Litoměřice Böömin puolella; artikkelin koordinaatti 8,722 / 53,922 on suistossa Cuxhavenissa
    laudat: {
      maailmankartta: { x: 6304.3, y: 1367 },
      europe: { x: 482.5, y: 564.7 },
    },
    teksti: 'Labe eli saksaksi Elbe on yksi Keski-Euroopan suurista joista. Se saa alkunsa '
      + 'Jättiläisvuorilta Pohjois-Tšekistä, virtaa suuren osan Böömiä ja jatkaa Saksaan, missä '
      + 'se laskee Pohjanmereen Cuxhavenissa 110 kilometriä Hampurista luoteeseen. '
      + 'Kokonaispituutta sillä on 1 094 kilometriä.',
    lahde: 'en-Wikipedia "Elbe", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'vltava',
    nimi: 'Vltava',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Vltavaa sanotaan kansallisjoeksi?',
      'Mikä oli Pyhän Johanneksen koski?',
    ],
    korostukset: ['Kaarlensilta|Kaarlensiltaa'],
    nappi: 'Tšekin kansallisjoki',
    // 14.32 E / 48.81 N — Český Krumlov joen yläjuoksulla; artikkelin koordinaatti 14,475 / 50,341 on yhtymäkohdassa Elbeen
    laudat: {
      maailmankartta: { x: 6310.7, y: 1441.6 },
      europe: { x: 486.1, y: 609.9 },
    },
    teksti: 'Vltavan nimi tarkoittaa villiä vettä. Sekä tšekin Vltava että saksan Moldau juontuvat '
      + 'vanhasta germaanisesta sanaparista wilt ahwa, ja 1100-luvun Böömin kronikassa joki '
      + 'esiintyy muodossa Wlitaua. Villiys on sittemmin kesytetty: 1930-luvulta alkaen Prahan '
      + 'eteläpuolelle on rakennettu yhdeksän vesivoimapatoa, ja niiden altaiden alle jäi muun '
      + 'muassa Pyhän Johanneksen koski. Kansallisjoeksi Vltavaa kutsutaan syystä: Bedřich '
      + 'Smetana hahmotteli samannimistä sinfonista runoaan vuosina 1872—1874, ja se on Má '
      + 'vlast -sarjan ainoa osa, joka ehti lähes valmiiksi ennen kuin säveltäjä kesällä 1874 '
      + 'menetti kuulonsa. Elokuussa 2002 tulva vei ihmishenkiä ja heikensi Kaarlensiltaa niin '
      + 'pahoin, että korjaukset kestivät vuosia.',
    lahde: 'en-Wikipedia "Vltava", osiot "Etymology", "Dams", "Floods" ja "References in culture '
      + 'and science", sekä en-Wikipedia "Má vlast" (tarkistettu 1.9.2026).',
  },
];

