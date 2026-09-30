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
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT KIERROS 3 ERÄ A, 30.9.2026 — 1 KOHDETTA.
   * ============================================================== */
  {
    id: 'biogradska-gora',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mne-nosto-biogradska-gora-01a9d626.jpg',
      lyhyt: 'Biogradskojärvi metsäisten vuorten ympäröimänä.',
      selite: 'Tyyni järvi peilaa pilviä, ja rinteet nousevat metsän peittäminä molemmin puolin.',
      lahde: 'Valokuva: Javier Sánchez Portero, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Javier Sánchez Portero',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Biogradsko_jezero_in_July.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    nimi: 'Biogradska Gora',
    nimio: 'Biogradska',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka vanhoja aarniometsän puut ovat?',
      'Mikä on puiston suurin jääkausijärvi?',
    ],
    korostukset: ['aarniometsää|aarniometsää'],
    nappi: 'Aarniometsä ja jääkausijärvi',
    // 19.6019 E / 42.8981 N — en-Wikipedia "Biogradska Gora National Park", johdanto
    laudat: {
      maailmankartta: { x: 6486.7, y: 1687.5 },
    },
    teksti: 'Biogradska Gora on kansallispuisto Montenegron keskiosassa Bjelasican vuoristossa, '
      + 'Taran ja Limin jokien välissä. Se julistettiin kansallispuistoksi 1952, ja Unescon '
      + 'Ihminen ja biosfääri -ohjelman suoja lisättiin 1977. Puiston pinta-ala on 54 '
      + 'neliökilometriä, ja siitä 16 neliökilometriä on aarniometsää, jossa kasvaa yli '
      + 'viisisataa vuotta vanhoja puita. Metsän keskellä on Biogradskojärvi, puiston suurin '
      + 'jääkausijärvi; viisi muuta jääkausijärveä sijaitsee 1 820 metrin korkeudessa.',
    lahde: 'en-Wikipedia "Biogradska Gora National Park", johdanto (tarkistettu 30.9.2026).',
  },
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT KIERROS 3 ERÄ B, 30.9.2026 — 3 KOHDETTA.
   * ============================================================== */
  {
    id: 'stari-bar',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mne-nosto-stari-bar-fe0ea1c7.jpg',
      lyhyt: 'Kellotorni ja kivimuurien rauniot, taustalla laakso.',
      selite: 'Kivinen kellotorni kohoaa kasvillisuuden peittämien muurinjäänteiden yläpuolelta. Taustalla näkyvät laakso, kaupungin rakennuksia ja vuoria.',
      lahde: 'Valokuva: Fabio Gargano, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Fabio Gargano',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stari_Bar_Veduta.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    nimi: 'Stari Bar',
    nimio: 'Stari Bar',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka korkealla Stari Bar sijaitsee?',
      'Mikä rakennelma kunnostettiin, minkä jälkeen ihmiset ovat alkaneet palata?',
    ],
    korostukset: ['akveduktin|akveduktin'],
    nappi: 'Rauniokaupunki vuoren rinteellä',
    // 19.1264 E / 42.0872 N — en-Wikipedia "Stari Bar", osiot "Geography" ja "History"
    laudat: {
      maailmankartta: { x: 6470.9, y: 1720.1 },
    },
    teksti: 'Stari Bar on raunioitunut keskiaikainen kaupunki Montenegrossa, noin kolmen '
      + 'kilometrin päässä Adrianmeren rannikolla sijaitsevasta uudesta Barista. Se seisoo '
      + 'vuoren rinteellä 184 metrin korkeudessa. Varhaisella keskiajalla paikka kuului '
      + 'Bysantille, ja Stefan Vojislav liitti sen valtaansa noin vuonna 1040. Kaupunki '
      + 'tuhoutui pitkälti vuosien 1877–1878 piirityksessä, ja vuoden 1979 maanjäristys '
      + 'vaurioitti raunioita uudelleen. Osmanniajan akveduktin kunnostuksen jälkeen ihmiset '
      + 'ovat alkaneet palata alueelle.',
    lahde: 'en-Wikipedia "Stari Bar", osiot "Geography" ja "History" (tarkistettu 30.9.2026).',
  },
  {
    id: 'plavjarvi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mne-nosto-plavjarvi-33637e92.jpg',
      lyhyt: 'Plavjärven tyyni pinta heijastaa rantakylän ja vuoret.',
      selite: 'Tyyni järvi peilaa sinistä taivasta, rantakylän taloja ja metsäisiä vuorenrinteitä.',
      lahde: 'Valokuva: Андрей Романенко, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Андрей Романенко',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Plav_Lake_in_Montenegro_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Plavjärvi',
    nimio: 'Plavjärvi',
    tyyppi: 'jarvi',
    kysymykset: [
      'Minkä vuoriston juurella Plavjärvi on?',
      'Mihin jokeen Plavjärven vesi virtaa?',
    ],
    korostukset: ['Lim-jokeen|Lim-jokeen'],
    nappi: 'Järvi Kirottujen vuorten juurella',
    // 19.925 E / 42.5958 N — en-Wikipedia "Plav Lake", johdanto ja yleiskuvaus
    laudat: {
      maailmankartta: { x: 6497.5, y: 1699.7 },
    },
    teksti: 'Plavjärvi sijaitsee Montenegron koillisosassa Plavin kunnassa Prokletijen eli '
      + 'Kirottujen vuorten ja Visitor-vuoriston välissä. Sen pinta-ala on noin 1,99 km², '
      + 'pituus noin 2,2 km ja pinta 906 metrin korkeudessa. Järvi on matala, '
      + 'keskisyvyydeltään vain noin yhdeksän metriä, ja sen pohjassa on kalkkikiviluolia '
      + 'sekä lukuisia lähteitä, joista vesi pulppuaa maasta. Vesi virtaa pois Lim-jokeen.',
    lahde: 'en-Wikipedia "Plav Lake", johdanto ja yleiskuvaus (tarkistettu 30.9.2026).',
  },
  {
    id: 'lovcen-njegosin-mausoleumi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mne-nosto-lovcen-njegosin-mausoleumi-a40c0b5e.jpg',
      lyhyt: 'Mausoleumin sisäpiha ja kaksi kantajapatsasta.',
      selite: 'Harmaakivinen sisäpiha, jonka perällä kaksi kansallispukuista kantajapatsasta vartioi oviaukkoa.',
      lahde: 'Valokuva: Ingo Mehling, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ingo Mehling',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Njego%C5%A1_mausoleum.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Lovćen ja Njegošin mausoleumi',
    nimio: 'Lovćen',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka suunnitteli nykyisen mausoleumin?',
      'Minkä huipun päällä mausoleumi seisoo?',
    ],
    korostukset: ['Jezerski Vrh|Jezerski Vrh'],
    nappi: 'Hautapaikka vuoren huipulla',
    // 18.8184 E / 42.3991 N — en-Wikipedia "Mausoleum of Njegoš" ja "Lovćen"
    laudat: {
      maailmankartta: { x: 6460.6, y: 1707.6 },
    },
    teksti: 'Njegošin mausoleumi seisoo Lovćenin vuoren Jezerski Vrh -huipulla, 1 657 metrin '
      + 'korkeudessa. Cetinjestä sinne johtaa noin 21 kilometrin asfalttitie. Petar II '
      + 'Petrović-Njegoš suunnitteli huipulle kappelin vuonna 1845 ja valitsi paikan itse '
      + 'hautapaikakseen; hänen jäännöksensä siirrettiin vuorelle 1855. Kappeli vaurioitui '
      + 'ensimmäisessä maailmansodassa, rakennettiin uudelleen 1925 ja purettiin 1960-luvun '
      + 'lopulla. Ivan Meštrovićin suunnittelema nykyinen mausoleumi vihittiin käyttöön 1974, '
      + 'ja sen sisäänkäyntiä kantavat patsaat esittävät montenegrolaisia.',
    lahde: 'en-Wikipedia "Mausoleum of Njegoš" ja "Lovćen" (tarkistettu 30.9.2026).',
  },
];
