/*
 * MAASTOKOHTEET — TUR. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs TUR --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/TUR.json. Työkalu laskee laudan
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
 * Turkin maastokohteet — TÄYDENNYS. Maalla on jo fokuskohteet-tur.js (Ararat, Mustameri, Kızılırmak); tässä ovat puuttuvat. Faktat en-Wikipediasta 29.8.2026.
 */
export const MAASTOKOHTEET_TUR = [
  {
    id: 'marmaranmeri',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/tur-nosto-marmaranmeri-879780cf.jpg',
      lyhyt: 'Marmaranmeren tyyni pinta, rahtilaivoja ja rantakaupunki horisontissa.',
      selite: 'Kauppa-alukset ovat ankkuroituina Marmaranmerellä, kaukana rannikolla levittäytyy kaupunki. Etualan oikeassa reunassa on Prinssinsaarten metsäinen niemi.',
      lahde: 'Valokuva: Alexey Komarov, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Alexey Komarov',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sea_of_Marmara_-_panoramio_(2).jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/tur-nosto-marmaranmeri-87daad91.jpg',
        lyhyt: 'Marmaranmeren Prinssinsaaret ilmasta katsottuna.',
        selite: 'Ilmakuvassa sinisen meren keskellä lepää neljä saarta, joilla on asutusta rannoilla. Saaret sijaitsevat Marmaranmerellä Istanbulin edustalla.',
        lahde: 'Valokuva: Visem, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Visem',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Islands_of_the_Sea_of_Marmara_from_the_air_(Jul_2018)_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Marmaranmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Bosporinsalmi on niin tärkeä?',
      'Mikä Dardanellit on?',
    ],
    korostukset: ['Bosporinsalmi|Bosporin', 'Dardanellit|Dardanellien'],
    nappi: 'Maailman pienin meri',
    // 28 E / 40.6667 N — en-Wikipedia "Sea of Marmara"
    laudat: {
      maailmankartta: { x: 6766.7, y: 1776.6 },
      europe: { x: 748.8, y: 824.1 },
    },
    teksti: 'Marmaranmeri on pieni sisämeri kokonaan Turkin rajojen sisällä. Se yhdistää '
      + 'Mustanmeren ja Egeanmeren Bosporin ja Dardanellien salmien kautta ja erottaa samalla '
      + 'Turkin Euroopan- ja Aasian-puoleiset osat toisistaan. Pinta-alaa sillä on 11 350 '
      + 'neliökilometriä ja mittoja noin 280 kertaa 80 kilometriä, joten sitä pidetään maailman '
      + 'pienimpänä merenä; syvimmillään se on 1 370 metriä.',
    lahde: 'en-Wikipedia "Sea of Marmara", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'valimeri',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/tur-nosto-valimeri-4d287b56.jpg',
      lyhyt: 'Turkoosinvihreä Välimeri ja kalkkikivinen rannikko Turkin etelärannalla.',
      selite: 'Vaaleat kalliot ja oliivipuut reunustavat kirkasta merta, taustalla kohoavat vuoret. Maisema on Antalyan maakunnan Demren rannikolta.',
      lahde: 'Valokuva: Alexkom000, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Alexkom000',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2023-11-05_Coasts_of_Antalya_Province,_Demre_district_3.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/tur-nosto-valimeri-f4abc594.jpg',
        lyhyt: 'Rotkoinen Välimeren rannikko Kaşin seudulla Turkin etelärannalla.',
        selite: 'Kallioinen ranta ja pieni lahti Välimeren rannalla, rinteillä metsää ja rakennuksia. Rantakalliolla on aurinkotuoleja.',
        lahde: 'Valokuva: Haluk Comertel, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Haluk Comertel',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Akdeniz-_the_mediterranean-kaş_-_panoramio_-_HALUK_COMERTEL_(3).jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Välimeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka kapea Gibraltarinsalmi todella on?',
      'Miksi Anatolian etelärannikkoa kutsutaan Turkoosiksi rannikoksi?',
    ],
    korostukset: ['Gibraltarinsalmi|Gibraltarinsalmen'],
    nappi: 'Meri kolmen maanosan välissä',
    // 31 E / 35.6 N — ulappa Anatolian etelärannikon edustalla; artikkelin oma keskipiste on 18 / 35
    laudat: {
      maailmankartta: { x: 6866.7, y: 1972.7 },
      europe: { x: 806.4, y: 957.3 },
    },
    teksti: 'Välimeri on maanosien välinen meri Euroopan, Aasian ja Afrikan keskellä, ja maa '
      + 'ympäröi sen lähes kokonaan. Idässä sitä rajaavat Levantti ja pohjoisessa Anatolia, eli '
      + 'Turkin rannikko on sen pohjoisreuna. Lännessä se yhtyy Atlanttiin Gibraltarinsalmen '
      + 'kautta, koillisessa Bosporinsalmi vie Mustallemerelle ja kaakossa Suezin kanava '
      + 'Punaisellemerelle.',
    lahde: 'en-Wikipedia "Mediterranean Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'frat',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/tur-nosto-frat-dd950623.jpg',
      lyhyt: 'Fırat kiertää Rumkalen linnoituskukkulaa jyrkkien kalliorinteiden välissä.',
      selite: 'Turkoosinsininen Fırat eli Eufrat-joki ympäröi kalliosta nousevaa Rumkalen linnoitusta. Joen molemmilla puolilla kohoavat jyrkät kalkkikivirinteet.',
      lahde: 'Valokuva: Carole Raddato, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Carole Raddato',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_Euphrates_River_in_Turkey,_Rumkale_(52031477798).jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/tur-nosto-frat-a896d3e5.jpg',
        lyhyt: 'Halfeti Fırat-joen rannalla Kaakkois-Turkissa.',
        selite: 'Halfetin kaupunki sijaitsee rinteellä Fırat-joen sinivihreän vesialueen rannalla. Vastarannalla kohoavat karut kalliorinteet ja alhaalla ovat veneiden laiturit.',
        lahde: 'Valokuva: Bernard Gagnon, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Bernard Gagnon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Halfeti_on_the_Euphrates.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Fırat',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Mesopotamia oli?',
      'Missä Eufrat ja Tigris yhtyvät?',
    ],
    korostukset: ['Mesopotamia|Mesopotamian'],
    nappi: 'Mesopotamian toinen joki',
    // 38.75 E / 38.8 N — Kebanin pato Elazığin luona joen Turkin-puoleisella yläjuoksulla; artikkelin koordinaatti 47,442 / 31,005 on Shatt al-Arabissa Irakissa
    laudat: {
      maailmankartta: { x: 7125, y: 1849.8 },
      europe: { x: 955.2, y: 873.2 },
    },
    teksti: 'Fırat eli Eufrat on Länsi-Aasian pisin ja historiallisesti merkittävimpiä jokia. '
      + 'Yhdessä Tigriksen kanssa se on toinen Mesopotamian kahdesta määrittävästä joesta. Se '
      + 'saa alkunsa Turkista ja virtaa Syyrian ja Irakin halki, kunnes yhtyy Tigrikseen Shatt '
      + 'al-Arabissa ja laskee siitä Persianlahteen.',
    lahde: 'en-Wikipedia "Euphrates", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

