/*
 * MAASTOKOHTEET — BLR. Maan nostot napautettaviksi.
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
export const MAASTOKOHTEET_BLR = [
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT ERÄ 2, 30.9.2026 — 3 KOHDETTA.
   * ============================================================== */
  {
    id: 'mirin-linna',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/blr-nosto-mirin-linna-36e0a73c.jpg',
      lyhyt: 'Mirin linna punatiilitorneineen kohoaa järven rannalla pilvisen taivaan alla.',
      selite: 'Kuvassa näkyy Mirin linnan punatiiliset kulmatornit teräväkärkisine punakattoineen ja vesi, joka heijastaa linnaa.',
      lahde: 'Valokuva: Mike1979 Russia, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Mike1979 Russia',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mir_Castle_2023-07-02_5838.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    nimi: 'Mirin linna',
    nimio: 'Mir',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka monta tornia Mirin linnan pihaa ympäröi?',
      'Mihin linnaa käytettiin toisen maailmansodan aikana ja sen jälkeen?',
    ],
    korostukset: ['viisi tornia|viisi tornia'],
    nappi: 'Gotiikkaa ja Radziwiłłien renessanssia',
    // 26.473 E / 53.4512 N — en-Wikipedia "Mir Castle Complex"
    laudat: {
      maailmankartta: { x: 6715.8, y: 1236.8 },
    },
    teksti: 'Mirin linnaa Grodnon alueella Valko-Venäjällä alettiin rakentaa 1500-luvun taitteen '
      + 'jälkeen herttua Juryj Ilinitšin toimesta. Goottilaisen linnan sisäpihaa ympäröi '
      + 'viisi tornia, ja pihan muoto on neliö, jonka sivu on 75 metriä. Vuonna 1568 linna '
      + 'siirtyi Radziwiłł-suvulle, joka rakennutti siihen renessanssityylisen asuinsiiven. '
      + 'Toisessa maailmansodassa saksalaiset perustivat linnaan getton paikallisille '
      + 'juutalaisille, ja vuosina 1944–1956 siellä oli asuntoja, mikä vaurioitti sisätiloja. '
      + 'Linna liitettiin Unescon maailmanperintöluetteloon joulukuussa 2000, ja se toimii '
      + 'nykyään museona.',
    lahde: 'en-Wikipedia "Mir Castle Complex" (tarkistettu 30.9.2026).',
  },
  {
    id: 'njasvizin-linna',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/blr-nosto-njasvizin-linna-48bfb4b5.jpg',
      lyhyt: 'Njasvižin linnan sisäpiha keltaisine siipirakennuksineen ja kellotorneineen.',
      selite: 'Kuvassa näkyy Njasvižin linnan mukulakivipäällysteinen sisäpiha, jonka perällä on keltavalkoinen päärakennus ja tummakattoinen torni.',
      lahde: 'Valokuva: Alexxx1979, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Alexxx1979',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Belarus_Nesvizh_Castle_7255_2050.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Njasvižin linna',
    nimio: 'Njasviž',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka aloitti Njasvižin linnan rakentamisen vuonna 1582?',
      'Mitä linnalle tapahtui Pohjan suuressa sodassa?',
    ],
    korostukset: ['Radziwiłł|Radziwiłł'],
    nappi: 'Radziwiłłien linna ja puisto',
    // 26.6917 E / 53.2228 N — en-Wikipedia "Nesvizh Castle"
    laudat: {
      maailmankartta: { x: 6723.1, y: 1247.2 },
    },
    teksti: 'Njasvižin linna Minskin alueella Valko-Venäjällä oli Radziwiłł-suvun asuinlinna. '
      + 'Suku sai alueen haltuunsa vuonna 1533, ja Mikołaj Krzysztof Sierotka Radziwiłł '
      + 'aloitti nykyisen renessanssi-barokkilinnan rakentamisen vuonna 1582; työ valmistui '
      + '1604. Neliönmuotoisen kolmikerroksisen rakennuksen kulmissa on neljä '
      + 'kahdeksankulmaista tornia. Ruotsin armeija ryösti linnan vuonna 1706 Pohjan suuressa '
      + 'sodassa. Laaja entisöinti tehtiin 2004–2012. UNESCO otti kohteen '
      + 'maailmanperintöluetteloon vuonna 2005; linnaa ympäröi englantilaistyylinen puisto.',
    lahde: 'en-Wikipedia "Nesvizh Castle" (tarkistettu 30.9.2026).',
  },
  {
    id: 'braslavin-jarvet',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/blr-nosto-braslavin-jarvet-e729baf9.jpg',
      lyhyt: 'Ruokoinen Drivjaty-järven ranta pilvisen taivaan alla Braslavin järvillä.',
      selite: 'Kuvassa näkyy Drivjaty-järven laaja tyyni vesi, jonka rannalla on ruokoa ja matalaa vesikasvillisuutta.',
      lahde: 'Valokuva: Tess Mattew, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Tess Mattew',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2023.07.10_Dryviaty_Lake,_Braslaw_Lakes_National_Park.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Braslavin järvet',
    nimio: 'Braslav',
    tyyppi: 'jarvi',
    kysymykset: [
      'Kuinka monta järveä Braslavin puistoon kuuluu?',
      'Mikä puiston järvistä on Valko-Venäjän viidenneksi suurin?',
    ],
    korostukset: ['Drivjaty|Drivjaty'],
    nappi: 'Kolmekymmentä järveä metsien keskellä',
    // 27.0539 E / 55.5961 N — en-Wikipedia "Braslaw Lakes"
    laudat: {
      maailmankartta: { x: 6735.1, y: 1138.1 },
    },
    teksti: 'Braslavin järvet on Vitebskin alueen luoteisosassa, lähellä Liettuan rajaa '
      + 'sijaitseva kansallispuisto, joka perustettiin syyskuussa 1995. Puiston pinta-ala on '
      + 'noin 700 neliökilometriä, ja siihen kuuluu 30 toisiinsa yhteydessä olevaa järveä. '
      + 'Suurimmat niistä ovat Drivjaty, Snudy ja Strusta; Drivjaty on Valko-Venäjän '
      + 'viidenneksi suurin järvi. Puistossa on havu- ja lehtimetsiä sekä suoalueita.',
    lahde: 'en-Wikipedia "Braslaw Lakes" (tarkistettu 30.9.2026).',
  },
];
