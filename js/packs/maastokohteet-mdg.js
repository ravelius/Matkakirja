/*
 * MAASTOKOHTEET — MDG. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs MDG --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/MDG.json. Työkalu laskee laudan
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
 * Madagaskarin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Mangokylle ei ole vakiintunutta suomennosta (fi-Wikipediassa ei artikkelia); Maromokotro ja Mosambikin kanaali ovat fi-Wikipedian asuja.
 */
export const MAASTOKOHTEET_MDG = [
  {
    id: 'maromokotro',
    nimi: 'Maromokotro',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi huipulle on yli kahden päivän matka?',
      'Mikä on Tsaratananan massiivi?',
    ],
    korostukset: ['Tsaratanana|Tsaratananan'],
    nappi: 'Saaren korkein huippu',
    // 48.9658 E / -14.0233 N — en-Wikipedia "Maromokotro"
    laudat: {
      maailmankartta: { x: 7465.5, y: 3682 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Maromokotro on Madagaskarin korkein huippu: 2 876 metriä. Tuliperäinen vuori kohoaa '
      + 'Tsaratananan massiivissa saaren pohjoisosassa, luonnonsuojelualueella. Se on niin '
      + 'syrjässä, että lähimmistäkin kaupungeista, Bealananasta ja Ambanjasta, matka vuorelle '
      + 'kestää yhä yli kaksi päivää.',
    lahde: 'en-Wikipedia "Maromokotro", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'mosambikinkanaali',
    nimi: 'Mosambikin kanaali',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka kapea kanaali on kapeimmillaan?',
      'Minne Mosambikvirta kuljettaa lämmintä vettä?',
    ],
    nappi: 'Salmi, joka erottaa saaren Afrikasta',
    // 43.5 E / -18 N — ulappa Madagaskarin länsirannikon edustalla; en-Wikipedia "Mozambique Channel" antaa keskipisteeksi 41 / -18
    laudat: {
      maailmankartta: { x: 7283.3, y: 3817.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mosambikin kanaali on Intian valtameren haara, joka erottaa Madagaskarin Afrikan '
      + 'mantereesta. Salmi on noin 1 700 kilometriä pitkä ja kapeimmillaankin 419 kilometriä '
      + 'leveä, ja syvimmillään vettä on lähes 3 300 metriä. Sen läpi virtaa etelään lämmin '
      + 'Mosambikvirta, joka ruokkii eteläisen Afrikan rannikkoa kiertävää Agulhasvirtaa.',
    lahde: 'en-Wikipedia "Mozambique Channel", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'mangoky',
    nimi: 'Mangoky',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joessa on niin paljon hiekkasärkkiä?',
      'Mitä kaskeaminen tekee joelle?',
    ],
    nappi: 'Hiekkasärkkien joki',
    // 44.5 E / -21.7 N — keskijuoksu ylänköjen ja rannikon välissä; en-Wikipedia "Mangoky River" antaa suistolle 43,53 / -21,32
    laudat: {
      maailmankartta: { x: 7316.7, y: 3946.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mangoky on 564 kilometrin pituinen joki, joka syntyy Mananantananan ja Matsiatran '
      + 'yhtyessä ja virtaa Madagaskarin keskiylängöiltä länteen Mosambikin kanaaliin. Saaren '
      + 'metsiä on hakattu ja kaskettu rajusti viime vuosikymmeninä, ja eroosion irrottama maa '
      + 'näkyy joessa: uomaa täplittävät lukemattomat hiekkasärkät, ja suiston pohjoisosaa '
      + 'reunustavat mangrovemetsät.',
    lahde: 'en-Wikipedia "Mangoky River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

