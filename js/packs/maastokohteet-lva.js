/*
 * MAASTOKOHTEET — LVA. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs LVA --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/LVA.json. Työkalu laskee laudan
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
 * Latvian maastokohteet. Faktat en-Wikipediasta 29.8.2026. Pieni maa: kolme kohdetta.
 */
export const MAASTOKOHTEET_LVA = [
  {
    id: 'gaizinkalns',
    nimi: 'Gaiziņkalns',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi tornia ei koskaan saatu valmiiksi?',
      'Millainen on Vidzemen ylänkö?',
    ],
    korostukset: ['Vidzeme|Vidzemen'],
    nappi: 'Mäki, jolle rakennettiin torni kilpailusta',
    // 25.9594 E / 56.8703 N — en-Wikipedia "Gaiziņkalns"
    laudat: {
      maailmankartta: { x: 6698.6, y: 1078 },
      europe: { x: 709.6, y: 397.9 },
    },
    teksti: 'Gaiziņkalns on 312 metriä merenpinnasta ja Latvian korkein kohta. Se on Vidzemen '
      + 'ylängöllä lyhyen matkan päässä Madonan kaupungista länteen. Naapurimaan Viron korkein '
      + 'kohta Suur Munamägi on kuusi metriä korkeampi, ja kilpailu siitä johti '
      + 'tornihankkeeseen: torni ylsi virolaisen ohi, mutta se jäi kesken, suljettiin '
      + 'turvallisuussyistä ja purettiin joulukuussa 2012.',
    lahde: 'en-Wikipedia "Gaiziņkalns", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'itameri',
    nimi: 'Itämeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Itämeren vesi on murtovettä?',
      'Miksi Riianlahti on erillinen?',
    ],
    korostukset: ['murtovesi|murtovesiallas'],
    nappi: 'Maailman suurin murtovesiallas',
    // 21 E / 57 N — ulappa Kuurinmaan rannikon edustalla; artikkelin oma keskipiste on 20 / 58
    laudat: {
      maailmankartta: { x: 6533.3, y: 1071.8 },
      europe: { x: 614.4, y: 394.5 },
    },
    teksti: 'Itämeri on Atlantin haara, jonka ympäröivät Tanska, Viro, Suomi, Saksa, Latvia, '
      + 'Liettua, Puola, Venäjä ja Ruotsi. Maantieteellisesti se jää Skandinavian niemimaan '
      + 'sekä Pohjois- ja Keski-Euroopan tasangon väliin. Se on maailman suurin murtovesiallas.',
    lahde: 'en-Wikipedia "Baltic Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'vainajoki',
    nimi: 'Väinäjoki',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joella on kolme eri nimeä?',
      'Missä Väinäjoen lähde on?',
    ],
    korostukset: ['Valdai|Valdain'],
    nappi: 'Joki kolmen maan halki',
    // 25.86 E / 56.5 N — Jēkabpils joen keskijuoksulla Latviassa; artikkelin koordinaatti 24,031 / 57,062 on suistossa Riianlahdella
    laudat: {
      maailmankartta: { x: 6695.3, y: 1095.6 },
      europe: { x: 707.7, y: 407.7 },
    },
    teksti: 'Väinäjoki, jota kutsutaan myös Länsi-Dvinaksi ja latviaksi Daugavaksi, nousee Valdain '
      + 'kukkuloilta Venäjältä ja virtaa Valko-Venäjän ja Latvian halki Itämeren Riianlahteen. '
      + 'Pituutta sillä on 1 020 kilometriä, josta 352 kilometriä Latviassa ja 325 Venäjällä. '
      + 'Sen lähde on aivan Volgan lähteen naapurissa, mutta se kääntyy länteen ja piirtää '
      + 'matkallaan Pohjois-Valko-Venäjän halki suuren etelään taipuvan kaaren.',
    lahde: 'en-Wikipedia "Daugava", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

