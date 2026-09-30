/*
 * MAASTOKOHTEET — SRB. Maan nostot napautettaviksi.
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
export const MAASTOKOHTEET_SRB = [
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT ERÄ 2, 30.9.2026 — 3 KOHDETTA.
   * ============================================================== */
  {
    id: 'belgradin-linnoitus',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/srb-nosto-belgradin-linnoitus-4eaa24bf.jpg',
      lyhyt: 'Kalemegdanin kivinen linnoitusmuuri torneineen kohoaa vihreän rinteen yllä.',
      selite: 'Kuvassa näkyy Belgradin linnoituksen kivinen muuri ja kaksi nelikulmaista tornia ruohoisen rinteen päällä.',
      lahde: 'Valokuva: Dekanski, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Dekanski',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2014-04-06_17-43-32_Kalemegdan.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Belgradin linnoitus (Kalemegdan)',
    nimio: 'Kalemegdan',
    tyyppi: 'historia',
    kysymykset: [
      'Missä joet kohtaavat linnoituksen juurella?',
      'Kuinka kauan ottomaanit hallitsivat linnoitusta?',
    ],
    korostukset: ['vuoteen 1867|vuoteen 1867'],
    nappi: 'Linnoitus jokien yhtymäkohdassa',
    // 20.4503 E / 44.8233 N — en-Wikipedia "Belgrade Fortress"
    laudat: {
      maailmankartta: { x: 6515, y: 1609.1 },
    },
    teksti: 'Belgradin linnoitus eli Kalemegdan kohoaa 125,5 metriä korkealla harjanteella, jonka '
      + 'juurella Sava yhtyy Tonaviin. Alue on noin 66 hehtaarin laajuinen, ja siihen kuuluu '
      + 'Suuri ja Pieni Kalemegdanin puisto. Ottomaanit valloittivat linnoituksen vuonna '
      + '1521, ja se pysyi heidän hallinnassaan vuoteen 1867. Vuonna 1979 se sai Serbiassa '
      + 'erityisen tärkeän kulttuurimonumentin aseman. Nykyään linnoituksen alue on '
      + 'kaupunkilaisten suosima puisto.',
    lahde: 'en-Wikipedia "Belgrade Fortress" (tarkistettu 30.9.2026).',
  },
  {
    id: 'studenican-luostari',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/srb-nosto-studenican-luostari-2dd470a7.jpg',
      lyhyt: 'Studenican valkomarmorinen Neitsyt Marian kirkko kupoleineen puiston keskellä.',
      selite: 'Kuvassa on Studenican luostarin Neitsyt Marian kirkko ulkoa: vaalea marmoripintainen rakennus, tiilenpunainen kupolitorni ja kaari-ikkunat.',
      lahde: 'Valokuva: BrankaVV, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'BrankaVV',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bogorodi%C4%8Dina_crkva_u_Studenici_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Studenican luostari',
    nimio: 'Studenica',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Millaista kiveä luostarin julkisivuissa on?',
      'Kuka perusti Studenican luostarin?',
    ],
    korostukset: ['1196|1196'],
    nappi: 'Marmorinen luostari Serbian vuorilla',
    // 20.5367 E / 43.4861 N — en-Wikipedia "Studenica Monastery", johdanto ja infolaatikko
    laudat: {
      maailmankartta: { x: 6517.9, y: 1663.7 },
    },
    teksti: 'Studenican luostari sijaitsee Keski-Serbiassa Kraljevon lähellä, ja Stefan Nemanja '
      + 'perusti sen 1100-luvun lopulla; ensimmäinen rakennusvaihe valmistui kevääksi 1196. '
      + 'Pääkirkko, Neitsyt Marian temppeli, on kupolillinen yksilaivainen basilika, jonka '
      + 'julkisivut ovat valkoista marmoria, ja tyylissä yhdistyvät romaaninen ja '
      + 'bysanttilainen rakennustaide. Seinillä on bysanttilaisia freskoja vuosilta '
      + '1208–1209, muun muassa tunnettu ristiinnaulitsemiskuva. Luostarin perustaja Nemanja '
      + 'on haudattu sinne. Studenica on ollut Unescon maailmanperintökohde vuodesta 1986.',
    lahde: 'en-Wikipedia "Studenica Monastery", johdanto ja infolaatikko (tarkistettu '
      + '30.9.2026).',
  },
  {
    id: 'djavolja-varos',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/srb-nosto-djavolja-varos-adc6f348.jpg',
      lyhyt: 'Ruskeat, teräväkärkiset maapylväät nousevat rinteestä Pirunkaupungissa.',
      selite: 'Kuvassa on Đavolja varoš: rinteestä nousevia ruskeita maapylväitä, joista osan päällä on kivilaki. Pylväiden ympärillä on vihreää pensaikkoa.',
      lahde: 'Valokuva: Mickey Mystique, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Mickey Mystique',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C4%90avolja_varo%C5%A1_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Đavolja varoš (Pirunkaupunki)',
    nimio: 'Pirunkaupunki',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä suojaa pylväitä kulumiselta?',
      'Mihin kansantarina selittää pylväiden synnyn?',
    ],
    korostukset: ['andesiittinen kansi|andesiittinen kansi'],
    nappi: 'Kivipylväät, jotka olivat häävieraita',
    // 21.4072 E / 42.9925 N — en-Wikipedia "Đavolja Varoš", johdanto, geologia, legenda ja suojelu
    laudat: {
      maailmankartta: { x: 6546.9, y: 1683.7 },
    },
    teksti: 'Đavolja varoš eli Pirunkaupunki sijaitsee Radan-vuorella Kuršumlijan kunnassa '
      + 'Toplican piirikunnassa, noin 700 metrin korkeudessa. Alueella on noin 202 '
      + 'maapylvästä, jotka ovat 2–15 metriä korkeita ja tyveltä 4–6 metriä leveitä. Ne ovat '
      + 'syntyneet tulivuoritoiminnan leimaamalla alueella eroosion kuluttaessa maaperää, ja '
      + 'useimpien pylväiden päällä on andesiittinen kansi, joka suojaa niitä kulumiselta. '
      + 'Nimeen liittyvän kansantarinan mukaan häävieraat muuttuivat kiveksi. Alueella on '
      + 'kaksi kivennäisrikasta lähdettä, ja valtio on suojellut kohdetta vuodesta 1959.',
    lahde: 'en-Wikipedia "Đavolja Varoš", johdanto, geologia, legenda ja suojelu (tarkistettu '
      + '30.9.2026).',
  },
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT KIERROS 3 ERÄ A, 30.9.2026 — 5 KOHDETTA.
   * ============================================================== */
  {
    id: 'golubacin-linnoitus',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/srb-nosto-golubacin-linnoitus-c8f662b5.jpg',
      lyhyt: 'Golubacin linnoituksen tornit ja muurit kalliolla Tonavan rannalla.',
      selite: 'Kivitornit ja muurit nousevat kalliorinteelle, ja etualalla on nurmikenttä ja pensaat.',
      lahde: 'Valokuva: Petar Milošević, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Petar Milošević',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Golubac_Fortress_(%D0%B3%D1%80%D0%B0%D0%B4_%D0%93%D0%BE%D0%BB%D1%83%D0%B1%D0%B0%D1%86).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Golubacin linnoitus',
    nimio: 'Golubac',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka monta tornia Golubacin linnoituksessa on?',
      'Milloin linnoitus avattiin kunnostuksen jälkeen yleisölle?',
    ],
    korostukset: ['kymmenen tornia|kymmenen tornia'],
    nappi: 'Tonavan rotkon tornilinnoitus',
    // 21.6785 E / 44.6612 N — en-Wikipedia "Golubac Fortress", osiot "Location", "History", "Architecture" ja "2014-2019 Reconstruction"
    laudat: {
      maailmankartta: { x: 6555.9, y: 1615.7 },
    },
    teksti: 'Golubacin linnoitus kohoaa Serbian puolella Tonavan rannalla noin neljä kilometriä '
      + 'alavirtaan Golubacin kaupungista, Rautaportin rotkon suulla. Kivilinnoitus '
      + 'rakennettiin 1300-luvulla, ja se jakautuu kolmeen vaiheittain rakennettuun osaan, '
      + 'joissa on kaikkiaan kymmenen tornia. Linnaa hallitsivat vuorotellen eri vallat: '
      + 'vuosina 1403–1427 se oli serbien despootti Stefan Lazarevićin hallussa. Vuosina '
      + '2014–2019 toteutettiin mittava kunnostus, ja linnoitus avattiin kokonaan yleisölle '
      + 'huhtikuussa 2019.',
    lahde: 'en-Wikipedia "Golubac Fortress", osiot "Location", "History", "Architecture" ja '
      + '"2014-2019 Reconstruction" (tarkistettu 30.9.2026).',
  },
  {
    id: 'gamzigrad',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/srb-nosto-gamzigrad-d55df952.jpg',
      lyhyt: 'Kivi- ja tiilimuurien jäänteitä Felix Romulianan alueella.',
      selite: 'Nurmikentän ympäröimiä kivilohkoperustuksia ja restauroituja kivi- ja tiilimuurien osia Felix Romulianan raunioilla.',
      lahde: 'Valokuva: Institute for the Study of the Ancient World, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Institute for the Study of the Ancient World',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_Palace_at_Felix_Romuliana_(XXXVI)_(5446807014).jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    nimi: 'Gamzigrad',
    nimio: 'Gamzigrad',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka rakennutti Felix Romulianan ja miksi se sai nimensä?',
      'Mitä Magura-kukkulalla on?',
    ],
    korostukset: ['Galerius|Galerius'],
    nappi: 'Keisarin unohdettu palatsi',
    // 22.185 E / 43.8992 N — en-Wikipedia "Gamzigrad" (Felix Romuliana), johdanto
    laudat: {
      maailmankartta: { x: 6572.8, y: 1646.9 },
    },
    teksti: 'Gamzigrad eli Felix Romuliana on myöhäisantiikin palatsikompleksi Zaječarin lähellä '
      + 'Serbiassa. Keisari Galerius aloitti sen rakennuttamisen vuonna 298 voitettuaan '
      + 'Sassanidien valtakunnan, ja paikka nimettiin hänen äitinsä Romulan mukaan. Muurien '
      + 'sisällä oli kaksi palatsia, kaksi temppeliä ja kylpylä, ja porteista on löytynyt '
      + 'Dionysosta ja Medusaa esittäviä mosaiikkeja. Läheisellä Magura-kukkulalla on kaksi '
      + 'mausoleumia, joihin Romula ja Galerius haudattiin. Alue hylättiin 600-luvun alussa '
      + 'slaavien saapuessa; kaivaukset alkoivat 1953, ja Unescon maailmanperintökohde se on '
      + 'vuodesta 2007.',
    lahde: 'en-Wikipedia "Gamzigrad" (Felix Romuliana), johdanto (tarkistettu 30.9.2026).',
  },
  {
    id: 'petrovaradinin-linnoitus',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/srb-nosto-petrovaradinin-linnoitus-1e507bec.jpg',
      lyhyt: 'Petrovaradinin linnoitus ja kellotorni kohoavat Tonavan rannalla.',
      selite: 'Illansuun valossa näkyy linnoituksen muuri ja keltaisia rakennuksia kukkulan päällä sekä valkoinen kellotorni vasemmalla.',
      lahde: 'Valokuva: BojanPavlukovic, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'BojanPavlukovic',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gornja_i_donja_Petrovaradinska_tvr%C4%91ava_sa_podgra%C4%91em_-_Petrovaradin_Fortress_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Petrovaradinin linnoitus',
    nimio: 'Petrovaradin',
    tyyppi: 'historia',
    kysymykset: [
      'Milloin linnoituksen peruskivi laskettiin?',
      'Miksi kellotornin viisarit ovat päinvastoin?',
    ],
    korostukset: ['viisarit|viisarit'],
    nappi: 'Tonavan linnoitus ja nurinkurinen kello',
    // 19.8625 E / 45.2525 N — en-Wikipedia "Petrovaradin Fortress", johdanto
    laudat: {
      maailmankartta: { x: 6495.4, y: 1591.4 },
    },
    teksti: 'Petrovaradinin linnoitus kohoaa Tonavan oikealla rannalla Novi Sadin Petrovaradinin '
      + 'kaupunginosassa. Sen peruskivi laskettiin 18. lokakuuta 1692, pääasialliset '
      + 'rakennustyöt tehtiin vuosina 1753–1776 ja linnoitus valmistui 1780. Alla on säilynyt '
      + 'yli 16 kilometriä maanalaisia käytäviä, ja nelikerroksinen vastamiinajärjestelmä '
      + 'valmistui 1776. Kellotornin viisarit ovat päinvastoin: pieni viisari näyttää '
      + 'minuutit ja suuri tunnit, jotta Tonavan kalastajat näkisivät ajan kauas. Nykyään '
      + 'linnoitus on suojeltu kulttuuriperintökohde, ja siellä järjestetään kesäisin '
      + 'Exit-musiikkifestivaali.',
    lahde: 'en-Wikipedia "Petrovaradin Fortress", johdanto (tarkistettu 30.9.2026).',
  },
  {
    id: 'sarganin-kahdeksikko',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/srb-nosto-sarganin-kahdeksikko-c54f1331.jpg',
      lyhyt: 'Mokra Goran asema ja museojunan vaunuja metsäisten vuorten edessä.',
      selite: 'Mokra Goran asemalla seisoo vanhoja vihreitä ja punaisia junavaunuja kapeilla raiteilla.',
      lahde: 'Valokuva: Whitepixels, Wikimedia Commons (CC0).',
      tekija: 'Whitepixels',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sargan_Eight_-_Mokra_Gora_station_1.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
    },
    nimi: 'Šarganin kahdeksikko',
    nimio: 'Šarganin 8',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Minkä muotoinen rata on ja miksi?',
      'Kuinka leveä raide on?',
    ],
    korostukset: ['kahdeksikon|kahdeksikon'],
    nappi: 'Junarata, joka kiertää kahdeksikon',
    // 19.5219 E / 43.8 N — en-Wikipedia "Šargan Eight", johdanto
    laudat: {
      maailmankartta: { x: 6484.1, y: 1650.9 },
    },
    teksti: 'Šarganin kahdeksikko on kapearaiteinen museorautatie, joka kulkee Mokra Goran '
      + 'kylästä Šargan Vitasin asemalle. Rakennustyöt alkoivat ensimmäisen maailmansodan '
      + 'aikana ja jatkuivat 1. maaliskuuta 1921; ensimmäinen juna saapui Vardišteen 25. '
      + 'tammikuuta 1925. Raideleveys on 760 millimetriä, pääreitin pituus 15,44 kilometriä, '
      + 'ja matkalla on 22 tunnelia ja viisi suurta siltaa. Rata kiertyy kahdeksikon muotoon '
      + 'ja voittaa 300 metrin korkeuseron, mikä näkyy parhaiten Krstin asemalta. Museorata '
      + 'avattiin uudelleen 1. syyskuuta 2003.',
    lahde: 'en-Wikipedia "Šargan Eight", johdanto (tarkistettu 30.9.2026).',
  },
  {
    id: 'manasijan-luostari',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/srb-nosto-manasijan-luostari-d0e9a1fd.jpg',
      lyhyt: 'Manasijan linnoitusmuurin tornit ja kirkon kupoli niiden takana.',
      selite: 'Kaksi hammastettua kivitornia ja niiden välinen muuri sateisessa säässä.',
      lahde: 'Valokuva: Laslovarga, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Laslovarga',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:03Monastery_Manasia_in_Serbia.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    nimi: 'Manasijan luostari',
    nimio: 'Manasija',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka rakennutti Manasijan luostarin?',
      'Kuinka paljon seinämaalauksista on säilynyt?',
    ],
    korostukset: ['despootin torni|despootin torni'],
    nappi: 'Despootin linnoitettu luostari',
    // 21.4694 E / 44.1006 N — en-Wikipedia "Manasija Monastery", johdanto
    laudat: {
      maailmankartta: { x: 6549, y: 1638.7 },
    },
    teksti: 'Manasijan luostari sijaitsee Despotovacin lähellä Serbiassa. Despootti Stefan '
      + 'Lazarević rakennutti sen vuosina 1406–1418, ja kirkko vihittiin käyttöön helluntaina '
      + '1418. Luostaria ympäröi vahva muuri, jossa on 11 tornia; suurin niistä on kirkon '
      + 'pohjoispuolella oleva despootin torni. Kirkon seinille maalattiin vuoden 1413 '
      + 'jälkeen noin 2 000 neliömetriä maalauksia, mutta vain neljännes on säilynyt: '
      + 'ottomaanien aikana poistettu lyijykatto päästi veden seinille. Kohde julistettiin '
      + 'poikkeuksellisen tärkeäksi kulttuurimonumentiksi 1979.',
    lahde: 'en-Wikipedia "Manasija Monastery", johdanto (tarkistettu 30.9.2026).',
  },
];
