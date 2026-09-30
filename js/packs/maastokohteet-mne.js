/*
 * MAASTOKOHTEET — MNE. Maan nostot napautettaviksi.
 *
 * Päätoimittaja 30.9.2026: nostojen kattavuus Euroopassa
 * (docs/raportit/sisaltokirjuri-nostojen-kattavuus-eurooppa-20260930.md).
 * Maalla oli vain fokuslehden kaksi nostoa; tämä erä lisää kohteet,
 * joiden koordinaatit on luettu en-Wikipedian coordinates-tiedosta ja
 * laskettu koneella (tools/johda-maastokohteet.mjs laudat) ja joiden
 * tekstit on kirjoitettu käsin en-Wikipedian artikkeleista omin sanoin.
 * Lähderivi kertoo artikkelin ja osiot. Kuvaton erä: kortti kantaa
 * tekstin ja lähteen, kuva lisätään erikseen (Commons, lisenssi
 * tarkistettuna). Vain maailmankartan rivi (Euroopan erillislauta on
 * poistettu).
 */
export const MAASTOKOHTEET_MNE = [
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT ERÄ 1, 30.9.2026 — 3 KOHDETTA.
   * ============================================================== */
  {
    id: 'kotorinlahti',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mne-nosto-kotorinlahti-db0a77b6.jpg',
      lyhyt: 'Tyyni Kotorinlahti ja jyrkät vuoret, keskellä pieni kirkkosaari.',
      selite: 'Kuvassa näkyy Kotorinlahden tyyni vesi ja sen ympärillä kohoavat vuoret. Keskellä lahtea on pieni kirkkosaari.',
      lahde: 'Valokuva: Alexkom000, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Alexkom000',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2024-01-31_Bay_of_Kotor_seen_from_Lepetani.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    nimi: 'Kotorinlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka kapea Kotorinlahti on kapeimmillaan?',
      'Minkä vuoristojen väliin lahti jää?',
    ],
    korostukset: ['Verigen salmessa|Verigen salmessa'],
    nappi: 'Vuorten väliin puristuva merilahti',
    // 18.6667 E / 42.45 N — en-Wikipedia "Bay of Kotor" ja "Natural and Culturo-Historical Region of Kotor"
    laudat: {
      maailmankartta: { x: 6455.6, y: 1705.5 },
    },
    teksti: 'Kotorinlahti on Montenegron rannikon syvälle vuoristoon työntyvä merenlahti, joka on '
      + 'noin 28 kilometriä pitkä ja jonka ranta-alue kiertää kaikkiaan yli 107 kilometriä. '
      + 'Kapeimmillaan Verigen salmessa lahti kutistuu vain 0,3 kilometrin levyiseksi, ja '
      + 'suurin syvyys on 60 metriä. Lahtea reunustavat Orjenin ja Lovćenin vuoristot, ja sen '
      + 'rannoilla ovat Kotor, Perast, Risan, Tivat ja Herceg Novi. Lahden alue on Unescon '
      + 'maailmanperintökohde vuodesta 1979, ja siihen kuuluvat myös Perastin edustan '
      + 'saarekkeet Sveti Đorđe ja Neitsyt Marian kalliosaari. Kotorin vanhankaupungin '
      + 'linnoitusjärjestelmä nousee yli 260 metrin korkeuteen, ja suurin osa rakenteista on '
      + 'Venetsian ajalta.',
    lahde: 'en-Wikipedia "Bay of Kotor" ja "Natural and Culturo-Historical Region of Kotor" '
      + '(tarkistettu 30.9.2026).',
  },
  {
    id: 'ostrogin-luostari',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mne-nosto-ostrogin-luostari-2445012d.jpg',
      lyhyt: 'Valkoinen luostari kallioseinämän onkalossa kellotorneineen.',
      selite: 'Kuvassa on Ostrogin luostarin valkoinen rakennus, jonka kellotorni ja ikkunarivit nojaavat pystysuoraan kallioseinään.',
      lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Diego Delso',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Monasterio_de_Ostrog,_Montenegro,_2014-04-14,_DD_14.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    nimi: 'Ostrogin luostari',
    nimio: 'Ostrog',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka perusti luostarin kallioon?',
      'Mikä säilyi vuoden 1923 palosta?',
    ],
    korostukset: ['Ostroška Greda|Ostroška Greda'],
    nappi: 'Kallioseinämään rakennettu luostari',
    // 19.0292 E / 42.675 N — en-Wikipedia "Ostrog Monastery", osiot "History", "Description" ja "Pilgrimage"
    laudat: {
      maailmankartta: { x: 6467.6, y: 1696.5 },
    },
    teksti: 'Ostrogin luostari on serbiortodoksinen luostari lähellä Danilovgradia Montenegrossa. '
      + 'Se on rakennettu lähes pystysuoraan kallioseinämään Ostroška Greda -kallioon. '
      + 'Luostarin perusti 1600-luvun alussa Hertsegovinan metropoliitta Vasilije Jovanović, '
      + 'Ostrogin pyhä Basileios, joka kuoli siellä vuonna 1671; hänen pyhäinjäännöksensä '
      + 'lepäävät luolakirkossa. Vuosina 1923–1926 luostari rakennettiin uudelleen suuren '
      + 'tulipalon jälkeen, mutta kaksi alkuperäistä luolakirkkoa säilyi. Pyhiinvaeltajat '
      + 'kulkevat perinteisesti alaluostarilta yläluostarille noin kolme kilometriä, monet '
      + 'paljain jaloin.',
    lahde: 'en-Wikipedia "Ostrog Monastery", osiot "History", "Description" ja "Pilgrimage" '
      + '(tarkistettu 30.9.2026).',
  },
  {
    id: 'taran-kanjoni',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mne-nosto-taran-kanjoni-286a34c1.jpg',
      lyhyt: 'Syvä metsäinen Taran kanjoni ja kaukana siintävät vuoret.',
      selite: 'Kuvassa on ylhäältä kuvattu Taran kanjoni, jonka jyrkät metsäiset rinteet painuvat kapeaksi uomaksi.',
      lahde: 'Valokuva: Milan Radovic, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Milan Radovic',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kanjon_reke_Tare.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Taran kanjoni',
    nimio: 'Tara',
    tyyppi: 'joki',
    kysymykset: [
      'Kuinka syvä Taran kanjoni on syvimmillään?',
      'Mitä Đurđevića Taran sillalle tapahtui toisessa maailmansodassa?',
    ],
    korostukset: ['Đurđevića Taran silta|Đurđevića Taran silta'],
    nappi: 'Kanjoni ja kaaresilta joen yllä',
    // 19.0085 E / 43.2508 N — en-Wikipedia "Tara River Canyon", "Tara (Drina)" ja "Đurđevića Tara Bridge"
    laudat: {
      maailmankartta: { x: 6466.9, y: 1673.2 },
    },
    teksti: 'Tara on 146 kilometriä pitkä joki, joka virtaa Montenegrossa ja liittyy Drinaan. Sen '
      + 'kanjoni on syvimmillään noin 1 300 metriä, ja se kuuluu Durmitorin kansallispuiston '
      + 'Unescon maailmanperintökohteeseen. Lähellä on Žabljakin vuoristokaupunki, joka '
      + 'toimii koskenlaskun tukikohtana. Đurđevića Taran silta on rakennettu vuosina '
      + '1937–1940, ja se on 365 metriä pitkä ja noin 170 metriä joen yläpuolella. '
      + 'Partisaanit räjäyttivät sen yhden kaaren toisessa maailmansodassa, ja silta '
      + 'korjattiin 1946.',
    lahde: 'en-Wikipedia "Tara River Canyon", "Tara (Drina)" ja "Đurđevića Tara Bridge" '
      + '(tarkistettu 30.9.2026).',
  },
];
