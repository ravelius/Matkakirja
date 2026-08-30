/*
 * MAASTOKOHTEET — PAK. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs PAK --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/PAK.json. Työkalu laskee laudan
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
 * Pakistanin maastokohteet. Faktat en-Wikipediasta 30.8.2026. K2 on maan tunnusvuori ja maailman toiseksi korkein; Indus on koko maan elämänlanka ja Arabianmeri sen päätepiste.
 */
export const MAASTOKOHTEET_PAK = [
  {
    id: 'k2',
    nimi: 'K2',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi K2:lla ei ole oikeaa nimeä?',
      'Miksi K2 on vaarallisempi kuin Everest?',
    ],
    korostukset: ['Karakorum|Karakorumin'],
    nappi: 'Julma vuori',
    // 76.5133 E / 35.8825 N — en-Wikipedia "K2"
    laudat: {
      maailmankartta: { x: 8383.8, y: 1962 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'K2 on 8 611-metrisenä maailman toiseksi korkein vuori — vain Everest on korkeampi. Se '
      + 'sijaitsee Karakorumin vuoristossa Pakistanin ja Kiinan hallitsemien alueiden rajalla. '
      + 'Vuorikiipeilijät kutsuvat sitä Julmaksi vuoreksi: ennen vuotta 2021 arviolta yksi '
      + 'kiipeilijä kuoli jokaista neljää huipulle päässyttä kohti, ja vaikka Everestin huippu '
      + 'on ylempänä, K2 on nousuna vaikeampi ja vaarallisempi.',
    lahde: 'en-Wikipedia "K2", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'arabianmeri',
    nimi: 'Arabianmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka syvä Arabianmeri on?',
      'Minne Arabianmereltä pääsee purjehtimaan?',
    ],
    korostukset: ['Bab-el-Mandeb|Bab-el-Mandebin'],
    nappi: 'Valtameren porttikäytävä',
    // 66 E / 23.8 N — ulappa Karachin edustalla; artikkelin oma keskipiste on 65 / 14
    laudat: {
      maailmankartta: { x: 8033.3, y: 2403.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Arabianmeri on Intian valtameren pohjoisosa Arabian niemimaan, Pakistanin ja Intian '
      + 'välissä: pinta-alaa 3 862 000 neliökilometriä ja syvyyttä enimmillään 5 395 metriä. '
      + 'Lännessä Adeninlahti johtaa siltä Bab-el-Mandebin salmen kautta Punaisellemerelle ja '
      + 'luoteessa Omaninlahti Persianlahdelle. Sen salmet ovat yhdistäneet idän ja lännen '
      + 'valtakuntia jo antiikin ajoista.',
    lahde: 'en-Wikipedia "Arabian Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'indus',
    nimi: 'Indus',
    tyyppi: 'joki',
    kysymykset: [
      'Missä Indus saa alkunsa?',
      'Miksi kokonainen sivilisaatio syntyi juuri tämän joen varteen?',
    ],
    korostukset: ['Himalaja|Himalajan'],
    nappi: 'Pakistanin elämänlanka',
    // 68.85 E / 27.7 N — Sukkurin kohta joen keskijuoksulla; artikkelin koordinaatti 67,435 / 23,995 on suistossa Karachin luona
    laudat: {
      maailmankartta: { x: 8128.3, y: 2264.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Indus on 3 180 kilometriä pitkä ylirajainen virta, joka alkaa Tiibetistä nimellä '
      + 'Sengge Zangbo, kiertää Himalajan Nanga Parbatin massiivin ja kääntyy sitten etelään '
      + 'halki koko Pakistanin. Se laskee Arabianmereen satamakaupunki Karachin lähellä. '
      + 'Tasangolla siihen yhtyy Panjnad, johon Punjabin viisi jokea — Chenab, Jhelum, Ravi, '
      + 'Beas ja Sutlej — ovat jo yhtyneet.',
    lahde: 'en-Wikipedia "Indus River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

