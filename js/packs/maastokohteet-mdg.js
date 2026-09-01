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
    teksti: 'Madagaskarin korkeimmalle huipulle on lähimmästä kaupungista yli kahden päivän matka — '
      + 'eikä se ole retkeilijän valinta vaan kartan tosiasia. Maromokotro, 2 876 metriä, '
      + 'kohoaa saaren pohjoisosassa Tsaratananan massiivissa luonnonsuojelualueen sisällä, ja '
      + 'sitä lähimmät isommat asutukset, Bealanana ja Ambanja, ovat kumpikin useamman '
      + 'päivämarssin päässä. Huippu on sammunut tulivuori. Saaren korkein kohta ei siis ole '
      + 'nähtävyys, jonka luo ajetaan, vaan paikka, jonne pitää lähteä.',
    lahde: 'en-Wikipedia "Maromokotro" (tarkistettu 1.9.2026).',
  },
  {
    id: 'mosambikinkanaali',
    nimi: 'Mosambikin kanaali',
    tyyppi: 'meri',
    kysymykset: [
      'Minne Mosambikvirta kuljettaa lämmintä vettä?',
      'Kenelle kanaalin pikkusaaret kuuluvat?',
    ],
    korostukset: ['Mosambikvirta|Mosambikvirta'],
    nappi: 'Salmi, joka erottaa saaren Afrikasta',
    // 43.5 E / -18 N — ulappa Madagaskarin länsirannikon edustalla; en-Wikipedia "Mozambique Channel" antaa keskipisteeksi 41 / -18
    laudat: {
      maailmankartta: { x: 7283.3, y: 3817.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mosambikin kanaalissa on neljä saarta, joiden omistajasta kiistellään yhä. Glorieuses, '
      + 'Juan de Nova, Europa ja Bassas da India ovat Ranskan hallussa, ja Madagaskar vaatii '
      + 'niitä kaikkia itselleen. Vesi niiden ympärillä on 1 700 kilometriä pitkä ja '
      + 'kapeimmillaankin 419 kilometriä leveä Intian valtameren haara Madagaskarin ja '
      + 'Mosambikin välissä; syvimmillään siinä on 3 292 metriä, noin 230 kilometriä Mosambikin '
      + 'rannikolta. Kanaalin läpi kulkee etelään lämmin Mosambikvirta, joka jatkuu eteläisen '
      + 'Afrikan itärannikolla Agulhasvirtana. Marraskuussa 1939 samoilla vesillä saksalainen '
      + 'taskutaistelulaiva Admiral Graf Spee pysäytti brittitankkeri Africa Shellin ja otti '
      + 'sen kapteenin vangiksi.',
    lahde: 'en-Wikipedia "Mozambique Channel", johdanto-osa sekä osiot "Islands in the channel" ja '
      + '"History" (tarkistettu 1.9.2026).',
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

