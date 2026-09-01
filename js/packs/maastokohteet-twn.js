/*
 * MAASTOKOHTEET — TWN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs TWN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/TWN.json. Työkalu laskee laudan
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
 * Taiwanin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Saari on kapea, joten kaksi kohdetta riittää: korkein huippu ja salmi, joka erottaa saaren mantereesta.
 */
export const MAASTOKOHTEET_TWN = [
  {
    id: 'yushan',
    nimi: 'Yu Shan',
    tyyppi: 'vuori',
    kysymykset: [
      'Miten meren pohja päätyy vuoren huipuksi?',
      'Miksi vuorella on ollut monta nimeä?',
    ],
    korostukset: ['Jadevuori'],
    nappi: 'Merestä noussut huippu',
    // 120.9572 E / 23.47 N — en-Wikipedia "Yushan (mountain)"
    laudat: {
      maailmankartta: { x: 9865.2, y: 2414.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Yu Shan, Jadevuori, on Taiwanin korkein vuori: 3 952 metriä, mikä tekee Taiwanista '
      + 'maailman neljänneksi korkeimman saaren. Seutu oli aikoinaan merta — huippu on noussut '
      + 'nykyiseen korkeuteensa, kun Euraasian laatta työntyy Filippiinienmeren laatan yli. '
      + 'Japanin vallan aikana vuori tunnettiin nimellä Niitaka ja sitä ennen Morrisonina; '
      + 'nykyään sitä suojelee Yushanin kansallispuisto.',
    lahde: 'en-Wikipedia "Yushan (mountain)", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'taiwaninsalmi',
    nimi: 'Taiwaninsalmi',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi salmea kutsuttiin Mustaksi ojaksi?',
      'Kuka oli Koxinga?',
    ],
    korostukset: ['Koxinga|Koxinga'],
    nappi: 'Salmi kahden rannan välissä',
    // 119.9283 E / 24.8111 N — en-Wikipedia "Taiwan Strait"
    laudat: {
      maailmankartta: { x: 9830.9, y: 2367.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Salmen vanhin nimi on Musta oja. Se on käännös hokkien- ja hakkankielisestä nimestä, '
      + 'ja se kertoo enemmän kuin nykyinen: 180 kilometriä leveä vesi erotti vuosituhansien '
      + 'ajan mantereen han-kulttuurin Taiwanin alkuperäiskansoista, vaikka hakka- ja '
      + 'hoklo-kauppiaat kulkivat sen yli. Kapeimmillaan salmi on 126 kilometriä. '
      + 'Portugalilaiset, espanjalaiset ja hollantilaiset perustivat sen rannoille tukikohtia '
      + 'Ming-kaudella sekä kauppaa että ryöstöretkiä varten, ja hollantilaiset karkotti sieltä '
      + 'Zheng Chenggong eli Koxinga, joka perusti 1661 Tungningin kuningaskunnan. Hänen '
      + 'pojanpoikansa antautui Qing-dynastialle, kun amiraali hävisi Penghun taistelun '
      + 'keskellä salmea vuonna 1683. Pohjoisessa salmi yhtyy Itä-Kiinan mereen, etelässä '
      + 'Etelä-Kiinan mereen.',
    lahde: 'en-Wikipedia "Taiwan Strait", johdanto-osa sekä osiot "Names" ja "History" '
      + '(tarkistettu 1.9.2026).',
  },
];

