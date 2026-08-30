/*
 * MAASTOKOHTEET — LBR. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs LBR --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/LBR.json. Työkalu laskee laudan
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
 * Liberian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Mount Wuteven korkeutta ei kerrota artikkelin johdannossa; tietolaatikko antaa 1 447 m (lähteenä CIA World Factbook), ja sitä käytetään.
 */
export const MAASTOKOHTEET_LBR = [
  {
    id: 'mountwuteve',
    nimi: 'Mount Wuteve',
    tyyppi: 'vuori',
    kysymykset: [
      'Millä toisella nimellä vuori tunnetaan?',
      'Mikä on Guinean ylänkö?',
    ],
    korostukset: ['Guinean ylänkö|Guinean ylänköä'],
    nappi: 'Liberian korkein kohta',
    // -9.925 E / 8.1458 N — en-Wikipedia "Mount Wuteve"
    laudat: {
      maailmankartta: { x: 5502.5, y: 2939.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mount Wuteve, joka tunnetaan myös nimellä Mount Wologizi, on Liberian korkein kohta: '
      + 'tietolaatikon mukaan 1 447 metriä. Vuori kuuluu Guinean ylänköön, samaan Länsi-Afrikan '
      + 'selkärankaan, jolta myös alueen suuret joet saavat alkunsa.',
    lahde: 'en-Wikipedia "Mount Wuteve", johdanto-osa ja tietolaatikko (tarkistettu 30.8.2026).',
  },
  {
    id: 'atlantti',
    nimi: 'Atlantti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä oli kolumbiaaninen vaihto?',
      'Miksi Atlantin ylitys muutti maailman?',
    ],
    nappi: 'Valtameri, joka yhdisti ja erotti',
    // -11.2 E / 5.9 N — ulappa Monrovian edustalla; en-Wikipedia "Atlantic Ocean" antaa koko valtameren keskipisteeksi -25 / 0
    laudat: {
      maailmankartta: { x: 5460, y: 3014.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Atlantti on maailman toiseksi suurin valtameri, ja Liberian koko rannikko avautuu sen '
      + 'trooppiselle ulapalle. Valtameri on muovannut ihmiskunnan historiaa rajummin kuin '
      + 'mikään muu meri: 1500-luvulta 1800-luvulle se oli sekä Atlantin orjakaupan että niin '
      + 'sanotun kolumbiaanisen vaihdon näyttämö, jossa ihmiset, kasvit, eläimet ja taudit '
      + 'siirtyivät mantereelta toiselle.',
    lahde: 'en-Wikipedia "Atlantic Ocean", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'cavalla',
    nimi: 'Cavalla',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä kala antoi joelle nimen?',
      'Minkä kahden maan rajaa joki piirtää?',
    ],
    nappi: 'Joki, joka nimettiin kalasta',
    // -7.9 E / 4.9 N — alajuoksu Liberian ja Norsunluurannikon rajalla; en-Wikipedia "Cavalla River" antaa suulle -7,53 / 4,37
    laudat: {
      maailmankartta: { x: 5570, y: 3048 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Cavalla on Liberian pisin joki: 515 kilometriä. Se saa alkunsa Guineasta Nimba-vuoren '
      + 'pohjoispuolelta, muodostaa kaksi kolmasosaa Liberian ja Norsunluurannikon välisestä '
      + 'rajasta ja laskee Guineanlahteen. Nimensä joki sai suullaan parveilevasta '
      + 'cavalla-makrillista.',
    lahde: 'en-Wikipedia "Cavalla River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

