/*
 * MAASTOKOHTEET — MDA. Maan nostot napautettaviksi.
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
export const MAASTOKOHTEET_MDA = [
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT ERÄ 1, 30.9.2026 — 1 KOHDETTA.
   * ============================================================== */
  {
    id: 'sorokan-linnoitus',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mda-nosto-sorokan-linnoitus-6e893692.jpg',
      lyhyt: 'Sorokan pyöreistä torneista ja rintavarustuksista koostuva kivilinnoitus.',
      selite: 'Kuvassa on Sorokan linnoitus ulkoa: pyöreät kivitornit teräväkärkisine kattoineen ja muurit nurmikon takana.',
      lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Diego Delso',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fuerte_de_Soroca,_Soroca,_Moldavia,_2023-11-01,_DD_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Sorokan linnoitus',
    nimio: 'Soroca',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka rakennutti linnoituksen ensimmäisen, puisen version?',
      'Kuinka monta bastionia kivilinnoituksessa on?',
    ],
    korostukset: ['viisi bastionia|viisi bastionia'],
    nappi: 'Pyöreä linna Dnestrin rannalla',
    // 28.3055 E / 48.1612 N — en-Wikipedia "Soroca Fort", osiot "History" ja "Architecture"
    laudat: {
      maailmankartta: { x: 6776.8, y: 1469.4 },
    },
    teksti: 'Sorokan linnoitus on Moldovan Dnestr-joen rannalla sijaitseva pyöreä linnake, jonka '
      + 'alkuperäisen puisen varustuksen Tapani Suuri rakennutti vuonna 1499 suojaamaan joen '
      + 'kahlaamoa. Kivilinnoituksen Petru Rareș rakennutti vuosina 1543–1546, ja siinä on '
      + 'viisi bastionia tasaisin välein. Halkaisijaltaan linnoitus on noin 30 metriä, muurit '
      + 'ovat kolme metriä paksut ja tornit nelikerroksisia, joista alimmat kerrokset oli '
      + 'tarkoitettu tykeille. Restaurointi on valmis, ja linnoitus on Moldovan kansallisesti '
      + 'merkittävä historiallinen ja arkkitehtoninen muistomerkki.',
    lahde: 'en-Wikipedia "Soroca Fort", osiot "History" ja "Architecture" (tarkistettu '
      + '30.9.2026).',
  },
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT ERÄ 2, 30.9.2026 — 1 KOHDETTA.
   * ============================================================== */
  {
    id: 'milestii-mici',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mda-nosto-milestii-mici-55e1363a.jpg',
      lyhyt: 'Viinipulloilla täytetty maanalainen käytävä Mileștii Micissä.',
      selite: 'Kuvassa näkyy pitkä maanalainen käytävä, jonka seinillä on holvattuja koloja täynnä makaavia viinipulloja.',
      lahde: 'Valokuva: Z thomas, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Z thomas',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mile%C8%99tii_Mici_20250406_1.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    nimi: 'Mileștii Mici',
    tyyppi: 'ruoka',
    kysymykset: [
      'Kuinka pitkä on viinikellarin tunnelien verkosto?',
      'Miten viinit kerrotaan säilyneen, kun ne käskettiin tuhota?',
    ],
    korostukset: ['250 kilometriä|250 kilometriä'],
    nappi: 'Kaksi miljoonaa pulloa maan alla',
    // 28.7959 E / 46.9008 N — en-Wikipedia "Mileștii Mici", osiot "History" ja "Wine cellars"
    laudat: {
      maailmankartta: { x: 6793.2, y: 1522.7 },
    },
    teksti: 'Mileștii Mici on viinikellari Ialovenin piirikunnassa Moldovassa, noin 18 kilometrin '
      + 'päässä pääkaupungista Chișinăusta. Maanalainen käytäväverkosto on Wikipedian mukaan '
      + '250 kilometriä pitkä, mutta siitä on käytössä vain 120 kilometriä. Guinnessin '
      + 'ennätyskirja kirjasi kellareihin kaksi miljoonaa pulloa maailman suurimmaksi '
      + 'viinikokoelmaksi. Neuvostoaikana työntekijöiden kerrotaan tehneen salaoven, jonka '
      + 'taakse viinit kätkettiin, kun ne määrättiin tuhottaviksi.',
    lahde: 'en-Wikipedia "Mileștii Mici", osiot "History" ja "Wine cellars" (tarkistettu '
      + '30.9.2026).',
  },
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT KIERROS 3 ERÄ A, 30.9.2026 — 4 KOHDETTA.
   * ============================================================== */
  {
    id: 'cricovan-viinikellarit',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mda-nosto-cricovan-viinikellarit-83af5c9a.jpg',
      lyhyt: 'Kuohuviinipulloja kaltevissa telineissä kalkkikivitunnelissa.',
      selite: 'Kalkkikivitunnelin molemmin puolin on rivejä kaltevissa telineissä lepääviä tummia pulloja.',
      lahde: 'Valokuva: Visem, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Visem',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cricova_winery_(Oct_2025)_3.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    nimi: 'Cricovan viinikellarit',
    nimio: 'Cricova',
    tyyppi: 'ruoka',
    kysymykset: [
      'Kuinka pitkä on Cricovan tunneliverkosto?',
      'Minkä lämpötilan kellarit pitävät ympäri vuoden?',
    ],
    korostukset: ['120 kilometriä|120 kilometriä'],
    nappi: 'Kilometrien mittainen kalkkikivikaupunki',
    // 28.85 E / 47.133 N — en-Wikipedia "Cricova (winery)", osiot "Winery" ja "Wine production"
    laudat: {
      maailmankartta: { x: 6795, y: 1512.9 },
    },
    teksti: 'Cricova on viinitehdas ja maanalainen kellarikaupunki Moldovassa, noin 15 kilometrin '
      + 'päässä Chișinăusta. Kalkkikiveä on louhittu alueen tunneleista jo 1400-luvulta, ja '
      + '1950-luvulla ne muutettiin viinikellareiksi. Nykyään käytäviä on noin 120 '
      + 'kilometriä, ja lämpötila pysyy ympäri vuoden noin 12 asteessa. Puolet tunneleista on '
      + 'varattu viinin säilytykseen, ja katujen nimet kertovat, minkä lajin pulloja kussakin '
      + 'varastoidaan. Kokoelmaan kuuluu viiniä vuodelta 1902, ja kuohuviiniä tehdään yhä '
      + 'samppanjamenetelmällä.',
    lahde: 'en-Wikipedia "Cricova (winery)", osiot "Winery" ja "Wine production" (tarkistettu '
      + '30.9.2026).',
  },
  {
    id: 'tipovan-luostari',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mda-nosto-tipovan-luostari-0ad234d9.jpg',
      lyhyt: 'Kallioseinämään louhittuja huoneita ja rakennettu julkisivu.',
      selite: 'Kalkkikivikallion seinämään on louhittu useita aukkoja, joiden edessä on valkoiseksi rapattu rakennuksen osa ja puuportaat.',
      lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Diego Delso',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Monasterio_de_%C8%9Aipova,_%C8%9Aipova,_Moldavia,_2023-11-01,_DD_25.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Țipovan luolaluostari',
    nimio: 'Țipova',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuinka monta luolaa Țipovan luostariin kuuluu?',
      'Minkä joen rannalla luostari sijaitsee?',
    ],
    korostukset: ['18 luolaa|18 luolaa'],
    nappi: 'Luostari kaiverrettu kallion sisään',
    // 28.9848 E / 47.6031 N — en-Wikipedia "Rezina District", osiot "History" ja "Geography"
    laudat: {
      maailmankartta: { x: 6799.5, y: 1493.1 },
    },
    teksti: 'Țipovan luostari sijaitsee Rezinan piirissä Dnestrin (moldovaksi Nistru) jyrkällä '
      + 'rantakalliolla. Lähteen mukaan luostari rakennettiin 900–1100-luvuilla suureen '
      + 'kalkkikivikallioon kaiverrettuna, ja siihen kuuluu 18 luolaa, joita yhdistävät '
      + 'sisäiset käytävät. Kiinnostava yksityiskohta on ympäristö: Țipovan suojelualue '
      + 'kattaa 430 hehtaaria jokiterasseja ja puron rotkolaaksoa, jossa on useita 10–16 '
      + 'metrin putouksia.',
    lahde: 'en-Wikipedia "Rezina District", osiot "History" ja "Geography" (tarkistettu '
      + '30.9.2026).',
  },
  {
    id: 'caprianan-luostari',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mda-nosto-caprianan-luostari-6d89e8a2.jpg',
      lyhyt: 'Luostarin rakennuksia, tiiliaita ja kupolikirkko nurmikon takana.',
      selite: 'Nurmikentän takana kohoaa valkoinen kupolikirkko, jonka vasemmalla puolella on keltainen kaksikerroksinen rakennus ja oikealla punatiilinen muuri.',
      lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Diego Delso',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Monasterio_de_C%C4%83priana,_C%C4%83priana,_Moldavia,_2023-11-02,_DD_36.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Căprianan luostari',
    nimio: 'Căpriana',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Minä vuonna Căprianan luostari sai ensimmäisen merkittävän maininnan?',
      'Milloin luostarin kivinen pääkirkko rakennettiin?',
    ],
    korostukset: ['1491–1496|1491–1496'],
    nappi: 'Metsän keskellä 1400-luvun kirkko',
    // 28.5106 E / 47.1166 N — en-Wikipedia "Căpriana monastery", osiot "Overview" ja "Churches"
    laudat: {
      maailmankartta: { x: 6783.7, y: 1513.6 },
    },
    teksti: 'Căprianan luostari sijaitsee Strășenin piirissä Moldovassa, metsäisellä alueella, '
      + 'jota kutsuttiin aiemmin nimellä Codrii Lăpușnei. Luostari sai ensimmäisen '
      + 'merkittävän maininnan vuonna 1429, kun Aleksanteri Hyvä myönsi sille kuninkaallisen '
      + 'aseman. Sen nykyinen kivinen Neitsyt Marian kuolonuneen kirkko rakennettiin vuosina '
      + '1491–1496 Stefan Suuren aikana moldavialaiseen tyyliin. Lisäksi alueella on '
      + '1800-luvun Pyhän Nikolauksen kirkko ja 1900-luvun talvikirkko. Neitsyt Marian '
      + 'kuolonuneen kirkossa on metropoliitta Gavril Bănulescu-Bodonin hauta.',
    lahde: 'en-Wikipedia "Căpriana monastery", osiot "Overview" ja "Churches" (tarkistettu '
      + '30.9.2026).',
  },
  {
    id: 'castel-mimi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mda-nosto-castel-mimi-d6859b87.jpg',
      lyhyt: 'Castel Mimin vaalea julkisivu ja sorapolku pensasaitojen välissä.',
      selite: 'Kaksikerroksinen vaalea kivirakennus, jossa on punatiilikoristeita ja keskellä suuri holvattu ovi.',
      lahde: 'Valokuva: Helgie12, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Helgie12',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castel_Mimi_fa%C8%9Bada.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Castel Mimi',
    nimio: 'Castel Mimi',
    tyyppi: 'ruoka',
    kysymykset: [
      'Kuka rakennutti Castel Mimin?',
      'Minä vuonna Castel Mimin kunnostus valmistui?',
    ],
    korostukset: ['Constantin Mimi|Constantin Mimi'],
    nappi: 'Ranskalaisin mallein rakennettu viinilinna',
    // 29.2919 E / 46.8917 N — en-Wikipedia "Mimi Castle", osiot "History" ja "Castel Mimi tourist complex"
    laudat: {
      maailmankartta: { x: 6809.7, y: 1523.1 },
    },
    teksti: 'Castel Mimi on viinitila ja historiallinen rakennus Bulboacan kylässä Anenii Noin '
      + 'piirissä Moldovassa. Bessarabialainen valtiomies ja viininviljelijä Constantin Mimi '
      + 'rakennutti sen 1800-luvun lopulla, ja työ valmistui vuosina 1900–1901 (jotkin '
      + 'lähteet mainitsevat jo 1893). Ranskalaisista esikuvista ammentavan uusklassisen '
      + 'kaksikerroksisen rungon sanotaan tehdyn raudoitetusta betonista, mikä oli aikanaan '
      + 'uutta. Kellarissa oli tynnyreissä noin 300 000 litraa viiniä. Kunnostus alkoi 2011 '
      + 'ja valmistui syyskuussa 2016; nyt paikka toimii matkailukohteena.',
    lahde: 'en-Wikipedia "Mimi Castle", osiot "History" ja "Castel Mimi tourist complex" '
      + '(tarkistettu 30.9.2026).',
  },
];
