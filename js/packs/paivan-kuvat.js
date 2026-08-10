/*
 * Päivän kuva maailmalta — oma kuratoitu lista.
 *
 * Aluksi (v331) palsta näytti Wikimedia Commonsin päivän kuvan, mutta
 * sen valitsee Commonsin yhteisö eikä se ole aina valokuva eikä
 * pelin yleisölle sopiva: omistajan iPadille osui kansainvälisen olutpäivän
 * elokuvajuliste (7.8.2026: "Pitäisikö tämän liittyä valokuvaukseen
 * vai miksi täällä on tällainen?"). Siksi kuvat valitaan nyt käsin:
 * kuuluisia, tarkistettuja valokuvia maailmalta, ja palsta vaihtuu
 * silti joka päivä — päivämäärä valitsee rivin listasta.
 *
 * Jokainen tiedosto on tarkistettu Commonsista (nimi, lisenssi,
 * tekijä) 7.8.2026. Uusi kuva: lisää rivi ja tarkista samat kolme.
 * Kuvateksti kirjoitetaan suomeksi tähän — konekäännöstä ei tarvita.
 */
export const PAIVAN_KUVAT = [
  {
    tiedosto: 'View from the Window at Le Gras, Joseph Nicéphore Niépce.jpg',
    kuvaus: 'Maailman vanhin säilynyt valokuva: näkymä Joseph Nicéphore '
      + 'Niépcen työhuoneen ikkunasta Ranskassa noin vuonna 1826. '
      + 'Valotus kesti useita tunteja.',
    tekija: 'Joseph Nicéphore Niépce',
    lisenssi: 'Public domain',
  },
  {
    tiedosto: 'First flight2.jpg',
    kuvaus: 'Wrightin veljesten ensimmäinen moottorilento 17. joulukuuta '
      + '1903 kesti kaksitoista sekuntia. Kuvan otti rannikkovartija '
      + 'John T. Daniels — se oli hänen ensimmäinen valokuvansa.',
    tekija: 'John T. Daniels',
    lisenssi: 'Public domain',
  },
  {
    tiedosto: 'Nellie Bly 2.jpg',
    kuvaus: 'Toimittaja Nellie Bly kiersi maailman 72 päivässä vuosina '
      + '1889–1890 — nopeammin kuin Jules Vernen romaanin herra Fogg, '
      + 'jonka ennätystä hän lähti lyömään.',
    tekija: 'H. J. Myers',
    lisenssi: 'Public domain',
  },
  {
    tiedosto: 'NASA-Apollo8-Dec24-Earthrise.jpg',
    kuvaus: 'Maannousu: Apollo 8:n astronautti Bill Anders kuvasi Maan '
      + 'nousemassa Kuun taakse jouluaattona 1968.',
    tekija: 'NASA / Bill Anders',
    lisenssi: 'Public domain',
  },
  {
    tiedosto: 'The Earth seen from Apollo 17.jpg',
    kuvaus: 'Sininen marmorikuula: koko Maa yhdessä kuvassa Apollo 17:n '
      + 'matkalta kohti Kuuta vuonna 1972.',
    tekija: 'NASA / Apollo 17',
    lisenssi: 'Public domain',
  },
  {
    tiedosto: 'Adams The Tetons and the Snake River.jpg',
    kuvaus: 'Ansel Adamsin maisemakuva Teton-vuorista ja Snakejoesta '
      + 'Yhdysvalloissa vuodelta 1942. Kopio kuvasta matkaa parhaillaan '
      + 'tähtienvälisessä avaruudessa Voyager-luotaimen mukana.',
    tekija: 'Ansel Adams',
    lisenssi: 'Public domain',
  },
  {
    tiedosto: 'All Gizah Pyramids.jpg',
    kuvaus: 'Gizan pyramidit Egyptissä ovat antiikin seitsemästä '
      + 'ihmeestä ainoa, joka on yhä pystyssä.',
    tekija: 'Ricardo Liberato',
    lisenssi: 'CC BY-SA 2.0',
  },
  {
    tiedosto: 'Machu Picchu, Peru.jpg',
    kuvaus: 'Inkojen kaupunki Machu Picchu Perun Andeilla lähes '
      + 'kahden ja puolen kilometrin korkeudessa.',
    tekija: 'Pedro Szekely',
    lisenssi: 'CC BY-SA 2.0',
  },
  {
    tiedosto: 'Taj Mahal, Agra, India edit3.jpg',
    kuvaus: 'Taj Mahal Intiassa rakennettiin valkoisesta marmorista '
      + '1600-luvulla. Rakentajia oli parikymmentä tuhatta.',
    tekija: 'Yann',
    lisenssi: 'CC BY-SA 3.0',
  },
  {
    tiedosto: 'Mount Everest as seen from Drukair2 PLW edit.jpg',
    kuvaus: 'Mount Everest, maailman korkein vuori — 8 849 metriä — '
      + 'kuvattuna lentokoneen ikkunasta.',
    tekija: 'shrimpo1967',
    lisenssi: 'CC BY-SA 2.0',
  },
  {
    tiedosto: 'Great Wall of China July 2006.JPG',
    kuvaus: 'Kiinan muuri kiemurtelee vuorten harjoja pitkin tuhansien '
      + 'kilometrien matkan.',
    tekija: 'Velatrix',
    lisenssi: 'CC0',
  },
  {
    tiedosto: 'Colosseum in Rome, Italy - April 2007.jpg',
    kuvaus: 'Rooman Colosseum on seissyt keskellä kaupunkia lähes '
      + 'kaksituhatta vuotta.',
    tekija: 'Diliff',
    lisenssi: 'CC BY-SA 2.5',
  },
  {
    tiedosto: 'Tour Eiffel Wikimedia Commons.jpg',
    kuvaus: 'Eiffel-torni rakennettiin Pariisin maailmannäyttelyyn 1889 '
      + '— ja sen piti olla väliaikainen.',
    tekija: 'Benh Lieu Song',
    lisenssi: 'Public domain',
  },
  {
    tiedosto: 'GoldenGateBridge-001.jpg',
    kuvaus: 'Golden Gaten silta San Franciscossa oli valmistuessaan '
      + 'vuonna 1937 maailman pisin riippusilta.',
    tekija: 'Rich Niewiroski Jr.',
    lisenssi: 'CC BY 2.5',
  },
  {
    tiedosto: 'Sydney Opera House - Dec 2008.jpg',
    kuvaus: 'Sydneyn oopperatalon purjekatot valmistuivat vuonna 1973. '
      + 'Rakentaminen kesti neljätoista vuotta.',
    tekija: 'Diliff',
    lisenssi: 'CC BY-SA 3.0',
  },
  {
    tiedosto: 'Hopetoun falls.jpg',
    kuvaus: 'Hopetounin vesiputous Australian sademetsässä putoaa '
      + 'kolmekymmentä metriä saniaisten keskelle.',
    tekija: 'Diliff',
    lisenssi: 'CC BY-SA 3.0',
  },
  {
    tiedosto: 'Polarlicht 2.jpg',
    kuvaus: 'Revontulet Alaskan yllä vuonna 2005. Sama valoilmiö näkyy '
      + 'hyvällä onnella myös Suomen taivaalla.',
    tekija: 'Joshua Strang, Yhdysvaltain ilmavoimat',
    lisenssi: 'Public domain',
  },
];

/**
 * Päivän rivi: päivämäärä valitsee kuvan, joten kuva on sama koko
 * päivän ja vaihtuu keskiyöllä — kuten oikean lehden kuvapalsta.
 */
export function paivanKuva(pvm = new Date()) {
  const paivaluku = Math.floor(pvm.getTime() / 86400000);
  return PAIVAN_KUVAT[((paivaluku % PAIVAN_KUVAT.length) + PAIVAN_KUVAT.length) % PAIVAN_KUVAT.length];
}
