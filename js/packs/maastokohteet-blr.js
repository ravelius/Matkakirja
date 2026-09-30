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
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT KIERROS 3 ERÄ B, 30.9.2026 — 3 KOHDETTA.
   * ============================================================== */
  {
    id: 'brestin-linnoitus',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/blr-nosto-brestin-linnoitus-485bebbc.jpg',
      lyhyt: 'Kholmin portti, punatiilinen porttirakennus kulmatorneineen.',
      selite: 'Kuvassa on Brestin linnoituksen Kholmin portti, punatiilinen holvattu porttirakennus, jossa on kaksi kulmatornia ja hammastettu yläreuna.',
      lahde: 'Valokuva: Zala, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Zala',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Brze%C5%9B%C4%87_Twierdza_Brama_Che%C5%82mska_02.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Brestin linnoitus',
    nimio: 'Brestin linna',
    tyyppi: 'historia',
    kysymykset: [
      'Minä vuonna linnoituksen rakentaminen alkoi?',
      'Mitkä kolme linnoitettua saarta citadellia ympäröi?',
    ],
    korostukset: ['Opperman|Opperman'],
    nappi: '1800-luvun tiilinen tähtilinnoitus',
    // 23.6581 E / 52.0819 N — en-Wikipedia "Brest Fortress", osiot "Construction" ja "Design"
    laudat: {
      maailmankartta: { x: 6621.9, y: 1298.5 },
    },
    teksti: 'Brestin linnoitus on Bug-joen ja Muhavets-joen haarojen ympäröimä linnoituskompleksi '
      + 'Brestin kaupungissa Valko-Venäjällä. Rakennustyöt alkoivat vuonna 1833 Brestin '
      + 'vanhan ruhtinaslinnan tilalle, ja suunnittelijana oli sotainsinööri Karl Opperman. '
      + 'Keskussaarella sijaitsevaa citadellia ympäröi kolme linnoitettua saarta: Kobrin, '
      + 'Terespol ja Volyn. Punatiilinen kasarmirakennus käsitti 500 huonetta, ja sen '
      + 'kerrotaan majoittaneen 12 000 sotilasta. Alkuperäisestä neljästä portista näkyvissä '
      + 'ovat nykyään enää Kholmin ja Terespolin portit.',
    lahde: 'en-Wikipedia "Brest Fortress", osiot "Construction" ja "Design" (tarkistettu '
      + '30.9.2026).',
  },
  {
    id: 'polotskin-sofian-katedraali',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/blr-nosto-polotskin-sofian-katedraali-6af582d4.jpg',
      lyhyt: 'Valkoinen barokkikatedraali kahdella tornilla sinistä taivasta vasten.',
      selite: 'Kuvassa on Pyhän Sofian katedraalin valkoinen julkisivu, jossa on kaksi vihreäkattoista tornia.',
      lahde: 'Valokuva: Alex Zelenko, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Alex Zelenko',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Belarus-Polatsk-Cathedral_of_Sophia-3.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Polotskin Pyhän Sofian katedraali',
    nimio: 'Polotsk Sofia',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka rakennutti alkuperäisen katedraalin?',
      'Millä tavalla rakennusta käytetään nykyään?',
    ],
    korostukset: ['Vilnan barokin|Vilnan barokin'],
    nappi: 'Barokkitornit vanhan pyhäkön paikalla',
    // 28.7586 E / 55.4864 N — en-Wikipedia "Saint Sophia Cathedral, Polotsk", osiot "History" ja "Reconstruction"
    laudat: {
      maailmankartta: { x: 6792, y: 1143.2 },
    },
    teksti: 'Pyhän Sofian katedraali kohoaa Polotskissa Valko-Venäjällä Polota- ja '
      + 'Länsi-Väinäjoen yhtymäkohdassa. Sen edeltäjän rakennutti ruhtinas Vseslav vuosina '
      + '1044–1066, ja siinä oli aluksi seitsemän kupolia, joiden määrä väheni viiteen vuoden '
      + '1447 tulipalon jälkeen. Vuosina 1738–1750 rakennus rakennettiin uudelleen Vilnan '
      + 'barokin tyyliin, ja työn urakoi varsovalainen muurari Błażej Kosiński. Kupoleita ei '
      + 'rakennettu uudelleen, mutta rakennukseen tuli tornit. Nykyään katedraali toimii '
      + 'Polotskin museoalueella konserttisalina, ja siellä on urut.',
    lahde: 'en-Wikipedia "Saint Sophia Cathedral, Polotsk", osiot "History" ja "Reconstruction" '
      + '(tarkistettu 30.9.2026).',
  },
  {
    id: 'gomelin-palatsi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/blr-nosto-gomelin-palatsi-1d14486e.jpg',
      lyhyt: 'Palatsin torniosa parvekkeineen ja valkoinen pylväikkö puiden välissä.',
      selite: 'Kuvassa on Gomelin palatsin keltainen torniosa, jossa on valkoinen parveke ja vihreä kupoli. Etualalla on valkoinen pylväikkö.',
      lahde: 'Valokuva: Hanna782, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Hanna782',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%D0%97%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5_%D0%B4%D0%B2%D0%BE%D1%80%D1%86%D0%B0_%D0%B2_%D0%BF%D0%B0%D1%80%D0%BA%D0%B5_%D0%A0%D1%83%D0%BC%D1%8F%D0%BD%D1%86%D0%B5%D0%B2%D1%8B%D1%85-%D0%9F%D0%B0%D1%81%D0%BA%D0%B5%D0%B2%D0%B8%D1%87%D0%B5%D0%B9_7.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Gomelin Rumjantsev-Paskevitš-palatsi',
    nimio: 'Gomel-palatsi',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka suunnitteli palatsin alkuperäisen uusklassisen version?',
      'Mitä Paskevitš lisäsi palatsiin?',
    ],
    korostukset: ['Paskevitšille|Paskevitšille'],
    nappi: 'Kenttämarsalkkojen kotina Sozhin rannalla',
    // 31.0164 E / 52.4222 N — en-Wikipedia "Gomel Palace", osiot "History" ja "Park"
    laudat: {
      maailmankartta: { x: 6867.2, y: 1283.2 },
    },
    teksti: 'Rumjantsev-Paskevitš-palatsi sijaitsee Gomelissa Valko-Venäjällä Sozh-joen rannalla. '
      + 'Kenttämarsalkka Pjotr Rumjantsev rakennutti sen vuosina 1777–1796, ja uusklassisen '
      + 'alkuperäissuunnitelman laati Ivan Starov. Vuonna 1834 kruunu osti kiinteistön, ja se '
      + 'siirtyi kenttämarsalkka Ivan Paskevitšille, joka lisäsi palatsiin nelikerroksisen '
      + 'tornin ja kolmikerroksisen siiven. Palatsia ympäröivä puisto ulottuu noin 800 metrin '
      + 'matkalle joen varrella, ja sen alueella on Pietarin ja Paavalin kirkko, joka '
      + 'vihittiin käyttöön vuonna 1824. Nykyään rakennuksessa toimii museo.',
    lahde: 'en-Wikipedia "Gomel Palace", osiot "History" ja "Park" (tarkistettu 30.9.2026).',
  },
];
