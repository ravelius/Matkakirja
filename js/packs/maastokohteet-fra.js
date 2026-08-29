/*
 * MAASTOKOHTEET — FRA. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs FRA --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/FRA.json. Työkalu laskee laudan
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
 * Ranskan maastokohteet. Faktat en-Wikipediasta 29.8.2026; koordinaatit artikkelien omia paitsi merillä ja joilla, joilla piste on valittu käsin lehden ikkunan sisältä (ks. lahdeKoordinaatti).
 */
export const MAASTOKOHTEET_FRA = [
  {
    id: 'montblanc',
    nimi: 'Mont Blanc',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuka nousi Mont Blancille ensimmäisenä?',
      'Kummalle maalle huippu oikeastaan kuuluu?',
    ],
    korostukset: ['Alpit|Alpeilla'],
    nappi: 'Alppien korkein huippu',
    // 6.865 E / 45.8328 N — en-Wikipedia "Mont Blanc"
    laudat: {
      maailmankartta: { x: 6062.2, y: 1567.3 },
      europe: { x: 343, y: 688.2 },
    },
    teksti: 'Mont Blanc kohoaa Alpeilla 4 807 metriin ja on Kaukasuksen ulkopuolisen Euroopan '
      + 'korkein vuori. Huippu on täsmälleen Ranskan ja Italian rajalla, ja se on myös maailman '
      + 'yhdenneksitoista topografisesti hallitsevin vuori. Isoisän matkan aikaan huipulle '
      + 'nousu oli jo vakiintunut urheilulaji: alppikiipeily oli syntynyt Chamonix\'n laaksossa '
      + 'vuoren juurella.',
    lahde: 'en-Wikipedia "Mont Blanc", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'vignemale',
    nimi: 'Vignemale',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi huippu on jaettu kahden maan kesken?',
      'Millaista on Pyreneiden jäätikkö nykyään?',
    ],
    nappi: 'Pyreneiden korkein Ranskan puolella',
    // -0.1431 E / 42.7767 N — en-Wikipedia "Vignemale"
    laudat: {
      maailmankartta: { x: 5828.6, y: 1692.4 },
      europe: { x: 208.5, y: 768.6 },
    },
    teksti: 'Vignemale on 3 298 metriä korkea ja Ranskan puolen Pyreneiden korkein huippu. Se '
      + 'seisoo suoraan rajalla: läntinen puoli kuuluu Hautes-Pyrénées\'n departementtiin '
      + 'Ranskassa ja itäinen Huescan maakuntaan Aragoniassa Espanjassa, ja itse huippu on '
      + 'jaettu kahtia maiden kesken.',
    lahde: 'en-Wikipedia "Vignemale", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'valimeri',
    nimi: 'Välimeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka kapea Gibraltarinsalmi todella on?',
      'Miksi Välimeri on niin suolainen?',
    ],
    korostukset: ['Gibraltarinsalmi|Gibraltarinsalmen'],
    nappi: 'Meri kolmen maanosan välissä',
    // 5.5 E / 42.6 N — Lioninlahden ulappa Ranskan rannikon edustalla — nimikilven paikka lehdellä, ei täsmäpiste
    laudat: {
      maailmankartta: { x: 6016.7, y: 1699.5 },
      europe: { x: 316.8, y: 773.2 },
    },
    teksti: 'Välimeri on maanosien välinen meri Euroopan, Aasian ja Afrikan keskellä, ja maa '
      + 'ympäröi sen lähes kokonaan. Lännessä se yhtyy Atlanttiin Gibraltarinsalmen kautta, '
      + 'joka erottaa Iberian niemimaan Marokosta vain neljäntoista kilometrin levyisenä. '
      + 'Idässä Bosporinsalmi vie Mustallemerelle ja kaakossa Suezin kanava Punaisellemerelle — '
      + 'jälkimmäinen oli isoisän matkan aikaan aivan uusi, avattu 1869.',
    lahde: 'en-Wikipedia "Mediterranean Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'biskajanlahti',
    nimi: 'Biskajanlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Biskajanlahti on niin pahamaineinen merenkulkijoille?',
      'Mitä eläimiä lahdella tapaa?',
    ],
    nappi: 'Atlantin myrskyisä poukama',
    // -3.2 E / 45.3 N — lahden ulappa Ranskan ja Espanjan rannikoiden välissä; artikkelin oma keskipiste on -4,4 / 45,5
    laudat: {
      maailmankartta: { x: 5726.7, y: 1589.4 },
      europe: { x: 149.8, y: 702.2 },
    },
    teksti: 'Biskajanlahti on Koillis-Atlantin lahti Kelttienmeren eteläpuolella. Se ulottuu '
      + 'Espanjan pohjoisrannikkoa pitkin Ranskan rajalta Ortegalinniemelle ja Ranskan '
      + 'länsirannikkoa pitkin Penmarc\'hinniemeltä etelään Espanjan rajalle asti. Purjelaivojen '
      + 'aikaan lahti oli merimiesten pelätyimpiä paikkoja Euroopassa.',
    lahde: 'en-Wikipedia "Bay of Biscay", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'loire',
    nimi: 'Loire',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Loiren varrella on niin paljon linnoja?',
      'Miksi Loire on niin matala kesäisin?',
    ],
    nappi: 'Ranskan pisin joki',
    // 1.909 E / 47.902 N — Orléans, joen suuren mutkan pohjoisin kohta — piste valittu uoman keskijuoksulta, jotta nimiö saa tilaa
    laudat: {
      maailmankartta: { x: 5897, y: 1480.4 },
      europe: { x: 247.9, y: 633.8 },
    },
    teksti: 'Loire on Ranskan pisin joki: 1 006 kilometriä ja maailman jokien pituusjärjestyksessä '
      + 'sadaskahdeksaskymmenesensimmäinen. Sen valuma-alue on 117 054 neliökilometriä eli yli '
      + 'viidennes koko Ranskasta, mutta virtaama on silti vain puolet Rhônen vastaavasta. Joki '
      + 'kaartaa Keskiylängöltä pohjoiseen Orléansiin asti ja kääntyy siellä länteen kohti '
      + 'Atlanttia.',
    lahde: 'en-Wikipedia "Loire", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'rhone',
    nimi: 'Rhône',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Camargue on?',
      'Miten Rhône muuttuu Genevenjärvessä?',
    ],
    korostukset: ['Camargue|Camargue-alueen'],
    nappi: 'Joki, joka tulee jäätiköltä',
    // 4.83 E / 44.93 N — Rhônen laakso Valencen kohdalla; artikkelin koordinaatti 4,846 / 43,331 on suistossa Arles'n luona
    laudat: {
      maailmankartta: { x: 5994.3, y: 1604.7 },
      europe: { x: 303.9, y: 711.9 },
    },
    teksti: 'Rhône saa alkunsa Alpeilta, virtaa Genevenjärven läpi ja kääntyy Kaakkois-Ranskan '
      + 'halki etelään Välimerelle. Arles\'n kohdalla lähellä suistoa joki jakautuu kahdeksi '
      + 'haaraksi, Suureksi ja Pieneksi Rhôneksi, ja niiden väliin jäävä suistomaa on '
      + 'Camargue-alueen kosteikko. Se on Ranskan ja Sveitsin yhteinen joki: alkulähde on '
      + 'Sveitsin puolella.',
    lahde: 'en-Wikipedia "Rhône", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

