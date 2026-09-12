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
 * ── K2-ERÄ 4 6.9.2026: KOHTEITA MAASTON RINNALLE ───────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Ranskalla oli jo KAKSI kuratoitua kohdetta
 * (js/packs/fokuskohteet-fra.js: Tuileries'n palatsi ja Bastilji),
 * joten tavoitteesta puuttui kuusi
 * (docs/moduulit/karttanostot-kattavuus.md). Tässä ne ovat; yhdenkään
 * tyyppi ei ole maastoa, vaan historiaa, kulttuuria tai tekniikkaa.
 *
 * fokuskohteet-fra.js:ÄÄN EI OLE KOSKETTU eikä sen kumpaakaan kohdetta
 * ole toistettu täällä — molemmat ovat Pariisissa, ja tämän erän
 * kohteet ovat kaukana pelikaupungeista. Sama koskee
 * js/fokuskohteet.js:n KOHDE_MAAT-taulua, joka on rinnakkaisen erän
 * hallussa; maastokohteiden hakemisto (js/packs/maastokohteet.js)
 * liittää tämän listan peliin sellaisenaan.
 *
 * KAIKKI KUUSI OVAT KAUKANA PELIKAUPUNGISTA. Ranskassa on kaksi
 * pelikaupunkia (Pariisi ja Marseille), ja etäisyys mitattiin
 * jokaiseen js/packs/maailmankartta.js CITIES-listan kaupunkiin;
 * jokaisen kohteen lähin on kirjattu sen oman koordinaattirivin
 * viereen. Lähin koko erässä on Pont du Gard 25,7 lautayksikön päässä
 * Marseillesta — raja KAUPUNGIN_KOHDALLA_SADE on 7
 * (js/fokuskohteet.js). Versailles jätettiin pois juuri tästä syystä:
 * se on vain 7,3 yksikön päässä Pariisista eli käytännössä kiinni
 * rajassa, joten sen paikka olisi kohdekartalla eikä pääkartalla.
 *
 * KUVATON ERÄ. Kortti kantaa tekstin ja lähteen, ei kuvaa — sama linja
 * kuin erässä 1. Faktat on tarkistettu en-Wikipediasta kohde
 * kerrallaan 6.9.2026.
 *
 * Ranskan maastokohteet. Faktat en-Wikipediasta 29.8.2026; koordinaatit artikkelien omia paitsi merillä ja joilla, joilla piste on valittu käsin lehden ikkunan sisältä (ks. lahdeKoordinaatti).
 */
export const MAASTOKOHTEET_FRA = [
  {
    id: 'montblanc',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fra-maasto-montblanc-69d1dc31dec3.jpg',
      lyhyt: 'Mont Blancin jäätiköitynyt länsiseinä kohoaa tummaa kalliorinnettä vasten.',
      selite: 'Mont Blancin jäätiköitynyt länsiseinä kohoaa tummaa kalliorinnettä vasten.',
      lahde: 'Matkakirjan havainnekuva — lähdeperusteinen johdannainen',
      tekija: 'OpenAI; referenssikuva Denoel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mont_Blanc_-_West_Face.jpg',
      lisenssi: 'CC BY-SA 2.0 France',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0/fr/deed.en',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fra-maasto-montblanc-f39f71151b35.jpg',
      lyhyt: 'Mont Blancin länsiseinä ja Dôme du Goûter Tré la Têteltä nähtynä.',
      selite: 'Mont Blancin jäätiköitynyt länsiseinä ja Dôme du Goûter näkyvät Aiguille Nord de Tré la Têteltä.',
      lahde: 'Valokuva: Denoel, Wikimedia Commons (CC BY-SA 2.0 France).',
      tekija: 'Denoel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mont_Blanc_-_West_Face.jpg',
      lisenssi: 'CC BY-SA 2.0 France',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0/fr/deed.en',
    }],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fra-maasto-vignemale-18e16a3e8da6.jpg',
      lyhyt: 'Vignemalen monihuippuinen massiivi Ossouen vihreän laakson perällä.',
      selite: 'Vignemalen monihuippuinen massiivi näkyy Ossouen vihreän laakson perällä.',
      lahde: 'Matkakirjan havainnekuva — lähdeperusteinen johdannainen',
      tekija: 'OpenAI; referenssikuva Tripallokavipasek',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vignemale_Massif_view_from_Barrage_d\'Ossoue.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fra-maasto-vignemale-8bcfbcf0ef86.jpg',
      lyhyt: 'Vignemalen massiivi ja jäätikkö Ossouen laakson vihreiden rinteiden takana.',
      selite: 'Vignemalen massiivi ja sen jäätikkö näkyvät Ossouen laakson vihreiden rinteiden takana.',
      lahde: 'Valokuva: Tripallokavipasek, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Tripallokavipasek',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vignemale_Massif_view_from_Barrage_d\'Ossoue.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    }],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fra-maasto-loire-7d2bf0f03134.jpg',
      lyhyt: 'Loiren leveä uoma ja matalat puustoiset rannat.',
      selite: 'Loiren leveä uoma ja matalat puustoiset rannat.',
      lahde: 'Matkakirjan havainnekuva — lähdeperusteinen johdannainen',
      tekija: 'OpenAI; referenssikuva Benjamin Smith (Commons user Benjism89)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Orl%C3%A9ans_-_River_Loire_-_4.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fra-maasto-loire-c38f7bfdd6e9.jpg',
      lyhyt: 'Puisia jokiveneitä Loiren rannassa Orléansissa.',
      selite: 'Puisia jokiveneitä Loiren rannassa Orléansissa.',
      lahde: 'Valokuva: Benjamin Smith (Commons user Benjism89), Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Benjamin Smith (Commons user Benjism89)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Orl%C3%A9ans_-_River_Loire_-_4.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    }],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fra-maasto-rhone-5c452abae760.jpg',
      lyhyt: 'Rhône virtaa Saint-Vallierin rantatalojen ja metsäisen rinteen ohitse.',
      selite: 'Rhône virtaa Saint-Vallierin rantatalojen ja metsäisen rinteen ohitse.',
      lahde: 'Matkakirjan havainnekuva — lähdeperusteinen johdannainen',
      tekija: 'OpenAI; referenssikuva Krzysztof Golik',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Coast_of_Rh%C3%B4ne_in_Saint-Vallier_03.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fra-maasto-rhone-181bfd18e8e2.jpg',
      lyhyt: 'Rhône Saint-Vallierissa kaupungin ja metsäisten laaksonrinteiden välissä.',
      selite: 'Rhône Saint-Vallierissa Drômen departementissa; kaupunki yhdellä rannalla sekä metsäisiä, pyöreitä laaksonrinteitä.',
      lahde: 'Valokuva: Krzysztof Golik, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Krzysztof Golik',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Coast_of_Rh%C3%B4ne_in_Saint-Vallier_03.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    }],
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
  /* ================================================================
   * K2-ERÄ 4 6.9.2026 — KUUSI KOHDETTA. Perustelut tiedoston alussa.
   * Uusilla kohteilla on vain maailmankartan rivi: Euroopan
   * erillislaudasta on luovuttu (Raamattu 30.8.2026), eikä uutta
   * `europe`-koordinaattia siksi lasketa. Yllä olevien maastokohteiden
   * vanhoihin riveihin ei ole koskettu.
   * ============================================================== */
  {
    id: 'mont-saint-michel',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fra-kohde-mont-saint-michel-a312017d024b.jpg',
      lyhyt: 'Mont-Saint-Michel kohoaa laskuveden paljastaman vuorovesitasangon keskellä.',
      selite: 'Mont-Saint-Michel kohoaa laskuveden paljastaman vuorovesitasangon keskellä.',
      lahde: 'Matkakirjan havainnekuva — lähdeperusteinen johdannainen',
      tekija: 'OpenAI; referenssikuva Lynx1211',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mont_St_Michel_during_low_tide.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fra-kohde-mont-saint-michel-66406eae047e.jpg',
      lyhyt: 'Mont-Saint-Michel kohoaa laskuveden paljastaman vuorovesitasangon keskellä.',
      selite: 'Mont-Saint-Michel kohoaa laskuveden paljastaman vuorovesitasangon keskellä.',
      lahde: 'Valokuva: Lynx1211, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Lynx1211',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mont_St_Michel_during_low_tide.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    }],
    nimi: 'Mont-Saint-Michel',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi saarta ei koskaan vallattu?',
      'Mihin luostaria käytettiin Ancien régimen aikana?',
    ],
    korostukset: ['vuorovesi|nouseva vuorovesi'],
    nappi: 'Saari, jonka vuorovesi puolusti',
    // -1.511 E / 48.636 N — en-Wikipedia "Mont-Saint-Michel";
    // lähin pelikaupunki Pariisi 128,4 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5783, y: 1449.1 },
    },
    teksti: 'Mont-Saint-Michel on vuorovesisaari ja kunta Normandiassa. Saari on noin '
      + 'kilometrin päässä Ranskan luoteisrannikosta Couesnon-joen suulla lähellä '
      + 'Avranchesia, ja sen pinta-ala on seitsemän hehtaaria. Vuonna 2023 saarella '
      + 'asui 23 ihmistä.\n\n'
      + 'Sijainti teki saaresta sekä helposti tavoitettavan että vaikeasti '
      + 'valloitettavan. Luostariin pyrkivät pyhiinvaeltajat pääsivät perille '
      + 'laskuveden aikaan, mutta nouseva vuorovesi jätti jalan liikkuvan hyökkääjän '
      + 'loukkuun, ajoi hänet takaisin tai hukutti hänet. Saari säilyi valtaamattomana '
      + 'koko satavuotisen sodan ajan: pieni varuskunta torjui englantilaisten '
      + 'täysimittaisen hyökkäyksen 1433.\n\n'
      + 'Ludvig XI ymmärsi luonnonpuolustuksen hyödyn ja teki saaresta vankilan, ja '
      + 'luostaria käytettiin vankilana säännöllisesti koko Ancien régimen ajan. '
      + 'Mont-Saint-Michel ja sitä ympäröivä lahti otettiin maailmanperintöluetteloon '
      + '1979. Kävijöitä on yli kolme miljoonaa vuodessa, mikä tekee siitä Pariisin '
      + 'ulkopuolisen Ranskan käydyimmän nähtävyyden; yli kuusikymmentä kunnan '
      + 'rakennusta on suojeltu historiallisina monumentteina.',
    lahde: 'en-Wikipedia "Mont-Saint-Michel", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'carcassonnen-linnoituskaupunki',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fra-kohde-carcassonnen-linnoituskaupunki-25ec0b1e82ce.jpg',
      lyhyt: 'Carcassonnen kaksoismuurit ja pyöreät tornit ympäröivät kukkulan lakea.',
      selite: 'Carcassonnen linnoituskaupungin kaksoismuurit ja pyöreät tornit ympäröivät kukkulan lakea.',
      lahde: 'Matkakirjan havainnekuva — lähdeperusteinen johdannainen',
      tekija: 'OpenAI; referenssikuva Lesueur André',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Panorama_Cit%C3%A9_de_Carcassonne.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fra-kohde-carcassonnen-linnoituskaupunki-29c43cfd2d39.jpg',
      lyhyt: 'Carcassonnen kaksoismuurit ja pyöreät tornit ympäröivät kukkulan lakea.',
      selite: 'Carcassonnen linnoituskaupungin kaksoismuurit ja pyöreät tornit ympäröivät kukkulan lakea.',
      lahde: 'Valokuva: Lesueur André, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Lesueur André',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Panorama_Cit%C3%A9_de_Carcassonne.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    }],
    nimi: 'Carcassonnen linnoituskaupunki',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka ennallisti kaupungin 1800-luvulla?',
      'Kuinka pitkä kaksoismuuri on?',
    ],
    korostukset: ['Eugène Viollet-le-Duc|Eugène Viollet-le-Duc'],
    nappi: 'Kolme kilometriä kaksoismuuria',
    // 2.364 E / 43.2066 N — en-Wikipedia "Cité de Carcassonne";
    // lähin pelikaupunki Barcelona 68,8 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5912.1, y: 1675 },
    },
    teksti: 'Carcassonnen linnoituskaupunki on keskiaikainen linnoitettu kaupunki '
      + 'Auden departementissa Etelä-Ranskassa. Se kohoaa kukkulalla Aude-joen '
      + 'oikealla rannalla nykyisen Carcassonnen kaakkoisosassa. Maineensa se saa '
      + 'kolme kilometriä pitkästä kaksoismuurista, jota rytmittää 52 tornia.\n\n'
      + 'Paikalla on noin 2 500 vuoden historia. Ensin siinä oli gallialainen '
      + 'asuinpaikka; 200-luvulla jaa. roomalaiset päättivät tehdä siitä linnoitetun '
      + 'kaupungin, ja puolustuslaitteet olivat valmiit vuoteen 333 mennessä, jolloin '
      + 'paikkaa kuvattiin sanalla castellum. Alkuperäistä muuria tuki 34–40 tornia, '
      + 'joiden väli oli 18–30 metriä; kukin torni oli puoliympyrän muotoinen ja noin '
      + 'neljätoista metriä korkea. Visigootit rakensivat muurit uudelleen 400- ja '
      + '500-luvuilla, mutta alkuperäinen rakenne säilyi.\n\n'
      + '1800-luvun lopulla arkkitehti ja teoreetikko Eugène Viollet-le-Duc ennallisti '
      + 'linnoituksen. Vuonna 1997 se otettiin maailmanperintöluetteloon '
      + 'poikkeuksellisena todisteena keskiaikaisen linnoituskaupungin arkkitehtuurista '
      + 'ja kaavoituksesta.',
    lahde: 'en-Wikipedia "Cité de Carcassonne", johdanto-osa sekä osiot "Early '
      + 'history" ja "Middle Ages" (tarkistettu 6.9.2026).',
  },
  {
    id: 'lascaux',
    nimi: 'Lascaux',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka löysi luolan ja miten?',
      'Miksi luola suljettiin yleisöltä?',
    ],
    korostukset: ['magdalénien|magdalénien-kautta'],
    nappi: 'Koira, joka löysi kuusisataa maalausta',
    // 1.17 E / 45.0536 N — en-Wikipedia "Lascaux";
    // lähin pelikaupunki Barcelona 141,8 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5872.3, y: 1599.6 },
    },
    teksti: 'Lascaux on luolasto lähellä Montignacin kylää Dordognen departementissa '
      + 'Lounais-Ranskassa. Sen seiniä ja kattoja peittää yli kuusisataa maalausta, '
      + 'enimmäkseen suuria eläimiä — juuri niitä lajeja, joita seudun fossiiliaineisto '
      + 'ylemmältä paleoliittiselta kaudelta tuntee. Maalaukset ovat monen sukupolven '
      + 'yhteinen työ, ja niiden iäksi arvioidaan tavallisesti 17 000–22 000 vuotta eli '
      + 'varhaista magdalénien-kautta.\n\n'
      + 'Luolan suuaukko löytyi 12. syyskuuta 1940, kun 18-vuotiaan Marcel Ravidat\'n '
      + 'koira tutki kaatuneen puun jättämää kuoppaa. Ravidat palasi paikalle kolmen '
      + 'ystävänsä kanssa, ja he laskeutuivat viidentoista metrin syvyiseen kuiluun '
      + 'uskoen sen olevan tarunomainen salakäytävä läheiseen kartanoon. Käytäville '
      + 'annettiin omat nimensä: Härkien sali, Käytävä, Kuilu, Laiva, Apsis ja '
      + 'Kissaeläinten kammio.\n\n'
      + 'Lascaux otettiin maailmanperintöluetteloon 1979 osana Vézèren laakson '
      + 'esihistoriallisia kohteita. Alkuperäiset luolat on suljettu yleisöltä '
      + 'vuodesta 1963, koska niiden kunto heikkeni nopeasti; nykyään nähtävillä on '
      + 'jäljennöksiä.',
    lahde: 'en-Wikipedia "Lascaux", johdanto-osa ja osio "History since rediscovery" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'chartresin-katedraali',
    nimi: 'Chartresin katedraali',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi katedraalin ikkunat ovat niin suuria?',
      'Mikä Sancta Camisa on?',
    ],
    korostukset: ['tukikaari|tukikaaret'],
    nappi: 'Lasit, jotka selvisivät kahdeksansataa vuotta',
    // 1.4878 E / 48.4478 N — en-Wikipedia "Chartres Cathedral";
    // lähin pelikaupunki Pariisi 32,9 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5882.9, y: 1457.1 },
    },
    teksti: 'Chartresin katedraali on katolinen katedraali Chartresissa, noin '
      + 'kahdeksankymmentä kilometriä Pariisista lounaaseen. Se on omistettu Neitsyt '
      + 'Marialle ja rakennettiin pääosin vuosina 1194–1220. Paikalla on ollut ainakin '
      + 'viisi katedraalia siitä lähtien, kun Chartresin hiippakunta perustettiin '
      + '300-luvulla. Rakennusta pidetään korkeagotiikan tunnetuimpana ja '
      + 'vaikutusvaltaisimpana esimerkkinä, ja Unesco kutsui sitä 1979 ranskalaisen '
      + 'gotiikan huippukohdaksi.\n\n'
      + 'Ulkoa katedraalia hallitsevat raskaat tukikaaret, jotka siirtävät holvien '
      + 'painon seinien ulkopuolelle. Juuri siksi ikkunat voitiin tehdä paljon '
      + 'suuremmiksi kuin ennen — ja suurin osa alkuperäisistä lasimaalauksista on '
      + 'säilynyt ehjänä. Arkkitehtuuriin on tehty vain vähäisiä muutoksia 1200-luvun '
      + 'alun jälkeen.\n\n'
      + 'Länsipäädyn kaksi tornia ovat keskenään erilaiset: toinen on noin 1160 '
      + 'valmistunut 105-metrinen sileä pyramidi, toinen 113-metrinen liekkigotiikan '
      + 'huippu vuosilta 1507–1513 vanhemman tornin päällä. Kolmea suurta julkisivua '
      + 'koristavat sadat veistetyt hahmot. Katedraali on ollut matkakohde ainakin '
      + '1100-luvulta lähtien; pyhiinvaeltajat tulevat kunnioittamaan Sancta Camisa '
      + '-reliikkiä, jonka kerrotaan olevan Neitsyt Marian yllään pitämä paita '
      + 'Kristuksen syntymän hetkellä.',
    lahde: 'en-Wikipedia "Chartres Cathedral", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'pont-du-gard',
    nimi: 'Pont du Gard',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kuinka loivasti akvedukti laskee?',
      'Miksi silta säilyi Rooman jälkeen?',
    ],
    korostukset: ['Nemausus|Nemausukseen'],
    nappi: 'Sentti kahdessasadassa metrissä',
    // 4.5356 E / 43.9472 N — en-Wikipedia "Pont du Gard";
    // lähin pelikaupunki Marseille 25,7 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5984.5, y: 1644.9 },
    },
    teksti: 'Pont du Gard on roomalainen akveduktisilta, joka rakennettiin '
      + 'ensimmäisellä vuosisadalla jaa. viemään vettä yli viidenkymmenen kilometrin '
      + 'matkan Nemausukseen eli nykyiseen Nîmesiin. Se ylittää Gardon-joen '
      + 'Vers-Pont-du-Gardin kylän lähellä Etelä-Ranskassa ja on yksi parhaiten '
      + 'säilyneistä roomalaisista akveduktisilloista. Unesco otti sen luetteloonsa '
      + '1985.\n\n'
      + 'Sillassa on kolme kaarikerrosta simpukkakalkkikivestä, ja se on 48,8 metriä '
      + 'korkea. Akvedukti kuljetti arviolta 40 000 kuutiometriä vettä vuorokaudessa. '
      + 'Rakennustyön tarkkuus näkyy kaltevuudessa: vesi laskee keskimäärin '
      + 'senttimetrin 182,4 metriä kohti. Vesi kulki mahdollisesti vielä 500-luvulla, '
      + 'mutta kun huolto loppui 300-luvun jälkeen, kivettymät ja roskat tukkivat '
      + 'uoman.\n\n'
      + 'Rooman valtakunnan hajottua silta säilyi lähes ehjänä, koska sille löytyi uusi '
      + 'tehtävä: siitä tuli tullisilta. Paikalliset herrat ja piispat vastasivat '
      + 'kunnossapidosta ja saivat vastineeksi oikeuden periä maksua ylittäjiltä. '
      + 'Kivilohkareita silti vietiin, ja 1600-luvulla silta vaurioitui pahoin. '
      + 'Korjauksia tehtiin 1700-luvulta 2000-luvulle, ja vuonna 2000 avattiin uusi '
      + 'vierailukeskus ja liikenne siirrettiin pois sillalta.',
    lahde: 'en-Wikipedia "Pont du Gard", johdanto-osa ja osio "Description" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'carnacin-kivirivit',
    nimi: 'Carnacin kivirivit',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka monta pystykiveä alueella on?',
      'Mitä tarut kertovat kivistä?',
    ],
    korostukset: ['menhiri|menhirejä'],
    nappi: 'Kolmetuhatta kiveä riveissä',
    // -3.0639 E / 47.5972 N — en-Wikipedia "Carnac stones";
    // lähin pelikaupunki Pariisi 187,6 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5731.2, y: 1493.3 },
    },
    teksti: 'Carnacin kivirivit ovat poikkeuksellisen tiheä megaliittikeskittymä '
      + 'Bretagnen etelärannikon tuntumassa Luoteis-Ranskassa. Kokonaisuuteen kuuluu '
      + 'kivirivistöjä, dolmeneja eli kivihautoja, hautakumpuja ja yksittäisiä '
      + 'menhirejä. Paikallisesta graniitista veistettyjä pystykiviä on yli '
      + 'kolmetuhatta, ja ne pystytti Bretagnen esikelttiläinen väestö; suurempaa '
      + 'keskittymää ei tunneta maailmasta.\n\n'
      + 'Suurin osa kivistä on Carnacin kunnan alueella, osa idempänä La '
      + 'Trinité-sur-Merissä. Ne pystytettiin neoliittisella kaudella, todennäköisesti '
      + 'noin 3300 eaa., mutta jotkin saattavat olla peräisin jo ajalta 4500 eaa.\n\n'
      + 'Kivet ovat synnyttäneet omat tarunsa. Kristillisen legendan mukaan ne olivat '
      + 'pakanasotilaita, jotka ajoivat takaa paavi Corneliusta, kunnes tämä muutti '
      + 'heidät kiveksi. Bretagnessa on myös oma versionsa Arthur-taruista, ja '
      + 'paikallinen perimätieto selittää kivirivien suoruuden sillä, että kyseessä on '
      + 'velho Merlinin kivettämä roomalainen legioona. Viime vuosisatoina kohteita on '
      + 'kohdeltu huonosti: dolmeneja on käytetty lammassuojina, kanaloina ja jopa '
      + 'uuneina, ja kiviä on viety teiden ja rakennusten aineeksi.',
    lahde: 'en-Wikipedia "Carnac stones", johdanto-osa (tarkistettu 6.9.2026).',
  },
  /* ================================================================
   * K2-ERÄ 3, 11.9.2026 — VIISI KOHDETTA LISÄÄ. Omistaja 11.9.2026:
   * *"Agentit voisivat tarkastaa myös muut Euroopan maat että
   * kaikissa tarpeeksi nostoja."* Tavoite on vähintään 20 pääkartan
   * nostoa per Euroopan maa; Ranska oli 15:ssä, koska suuri osa maan
   * nostoista asuu Pariisin kohdekartalla.
   *
   * Kaikki viisi ovat kaukana laudan kaupungeista (lähinkin Avignonin
   * paavinpalatsi 18 lautayksikköä Marseillesta, KAUPUNKIKATON_SADE
   * on 8), joten ne ovat pääkartan merkkejä. Kuvaton erä; faktat
   * en-Wikipediasta kohde kerrallaan 11.9.2026.
   * ============================================================== */
  {
    id: 'avignonin-paavinpalatsi',
    nimi: 'Avignonin paavinpalatsi',
    nimio: 'Avignon',
    tyyppi: 'historia',
    kysymykset: [
      'Montako konklaavia palatsissa pidettiin?',
      'Miksi paavit halusivat takaisin Roomaan?',
    ],
    korostukset: ['konklaavi|konklaavia'],
    nappi: 'Keskiajan suurin goottilainen rakennus',
    // 4.8078 E / 43.9509 N — en-Wikipedia "Palais des Papes"
    laudat: {
      maailmankartta: { x: 5993.6, y: 1644.8 },
    },
    teksti: 'Palais des Papes Avignonissa on yksi Euroopan suurimmista ja '
      + 'tärkeimmistä keskiaikaisista goottilaisista rakennuksista. Se oli '
      + 'yhtä aikaa linnoitus ja palatsi ja 1300-luvulla läntisen kristikunnan '
      + 'istuin. Palatsissa pidettiin kuusi konklaavia, joissa valittiin '
      + 'Benedictus XII 1334, Klemens VI 1342, Innocentius VI 1352, Urbanus V '
      + '1362, Gregorius XI 1370 ja Benedictus XIII 1394.\n\n'
      + 'Rakennuksia on oikeastaan kaksi yhteen liitettynä: Benedictus XII:n '
      + 'vanha palatsi Domsin kalliolla ja Klemens VI:n uusi palatsi. Yhdessä '
      + 'ne muodostavat keskiajan suurimman goottilaisen rakennuksen. '
      + 'Suunnittelusta vastasivat Pierre Peysson ja Jean de Louvres, '
      + 'koristelusta sienalaisen koulukunnan Simone Martini ja Matteo '
      + 'Giovanetti.\n\n'
      + 'Palatsin kirjasto oli yli kahdellatuhannella niteellään aikansa suurin '
      + 'Euroopassa, ja se veti puoleensa oppineita — heidän joukossaan '
      + 'humanismin perustaja Petrarca. Suureen kappeliin tulivat säveltäjät ja '
      + 'laulajat: siellä Klemens VI käytti Guillaume de Machaut\'n '
      + 'Notre-Damen messua, siellä Philippe de Vitry esitteli Ars Novansa ja '
      + 'siellä Johannes Ciconia opiskeli.\n\n'
      + 'Koko muutti kirkon hallintoa. Kuurian väkimäärä oli 1200-luvun lopulla '
      + 'kaksisataa, 1300-luvun alussa yli kolmesataa ja vuonna 1316 jo '
      + 'viisisataa; lisäksi palatsissa työskenteli yli tuhat maallikkoa. '
      + 'Palatsi jäi tarpeettomaksi, kun Urbanus V ja Gregorius XI veivät '
      + 'paavinistuimen takaisin Roomaan Ranskan hovin ja kardinaalikollegion '
      + 'vastustuksesta huolimatta: kumpikin oli vakuuttunut siitä, että '
      + 'istuimen paikka voi olla vain Pietarin haudalla. Unescon '
      + 'maailmanperintökohde palatsi on ollut vuodesta 1995.',
    lahde: 'en-Wikipedia "Palais des Papes", johdanto-osa ja osio "Description" '
      + '(tarkistettu 11.9.2026).',
  },
  {
    id: 'chambord',
    nimi: 'Chambordin linna',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mihin Frans I rakennutti Chambordin?',
      'Miksi linnan muurit ja vallihauta ovat koristeita?',
    ],
    korostukset: ['metsästysmaja|metsästysmajaksi'],
    nappi: 'Metsästysmaja, jossa on 440 huonetta',
    // 1.5170 E / 47.6161 N — en-Wikipedia "Château de Chambord"
    laudat: {
      maailmankartta: { x: 5883.9, y: 1492.5 },
    },
    teksti: 'Chambord on Loiren laakson suurin linna, ja sen sekoitus '
      + 'keskiaikaisia ranskalaisia muotoja ja klassisia renessanssirakenteita '
      + 'tekee siitä yhden maailman tunnistettavimmista. Frans I tilasi sen, ja '
      + 'rakennustyö kesti vuodesta 1519 vuoteen 1547.\n\n'
      + 'Linna rakennettiin metsästysmajaksi: kuninkaan varsinaiset asunnot '
      + 'olivat Blois\'n ja Amboisen linnoissa. Alkuperäinen suunnitelma '
      + 'katsotaan toscanalaisen Domenico da Cortonan työksi, ja Leonardo da '
      + 'Vinci on saattanut vaikuttaa siihen. Kahdenkymmenenkahdeksan '
      + 'rakennusvuoden aikana suunnitelmaa muutettiin paljon, ja työmaata '
      + 'valvoi paikan päällä Pierre Neveu. Kun talo oli lähes valmis, Frans '
      + 'esitteli vaurautensa ja valtansa merkkiä vanhalle vastustajalleen, '
      + 'keisari Kaarle V:lle.\n\n'
      + 'Rakennus on keskustornin ja neljän kulmatornin kokonaisuus, ja siinä '
      + 'on 440 huonetta, 282 takkaa ja 84 porrasta. Koska linnaa ei koskaan '
      + 'ollut tarkoitettu puolustukseen, muurit, tornit ja vallihaudan osa '
      + 'ovat pelkkää koristetta ja olivat jo aikanaan vanhanaikaisia. Osa '
      + 'italialaisesta renessanssista lainatuista piirteistä — avoimet '
      + 'ikkunat, loggiat ja laaja kattotaso — sopi huonosti Pohjois-Ranskan '
      + 'kylmään ja kosteaan ilmastoon.\n\n'
      + 'Vuonna 1792 vallankumouksen jälkimainingeissa osa kalustosta myytiin ja '
      + 'puutavaraa vietiin, ja talo jäi aikaa myöten autioksi; 1800-luvulla '
      + 'sitä yritettiin korjata. Toisen maailmansodan aikana Chambordiin '
      + 'siirrettiin taideteoksia Louvren ja Compiègnen kokoelmista. Kesäkuun '
      + '2016 tulva vahingoitti puistoa mutta ei itse linnaa.',
    lahde: 'en-Wikipedia "Château de Chambord", johdanto-osa ja osio '
      + '"Architecture" (tarkistettu 11.9.2026).',
  },
  {
    id: 'douaumont',
    nimi: 'Douaumontin luukammio',
    nimio: 'Verdun',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka pienellä alueella Verdunin taistelu käytiin?',
      'Kuka vihki hautausmaan 1923?',
    ],
    korostukset: ['Maginot|Maginot-linjan'],
    nappi: 'Verdunin taistelukentän muistomerkki',
    // 5.4214 E / 49.2108 N — en-Wikipedia "Douaumont ossuary"
    laudat: {
      maailmankartta: { x: 6014.0, y: 1424.4 },
    },
    teksti: 'Verdunin taistelu kesti 21. helmikuuta ja 19. joulukuuta 1916 '
      + 'välisen ajan, kolmesataa päivää. Noin 300 000 miestä kuoli, ja '
      + 'tappioita — kaatuneita, haavoittuneita ja kadonneita — oli yhteensä '
      + 'noin 700 000. Taistelukenttä oli alle kaksikymmentä neliökilometriä. '
      + 'Saksaksi sitä alettiin kutsua nimellä Die Hölle von Verdun ja '
      + 'ranskaksi L\'Enfer de Verdun, Verdunin helvetti.\n\n'
      + 'Luukammio rakennettiin Verdunin piispan Charles Ginistyn aloitteesta. '
      + 'Sen pienistä ulkoikkunoista näkyvät vähintään 130 000 tunnistamattoman '
      + 'ranskalaisen ja saksalaisen sotilaan luut. Sisällä kattoa ja seiniä '
      + 'peittävät laatat, joissa on taistelussa kaatuneiden ranskalaisten '
      + 'nimiä; laatan kustansi kunkin sotilaan perhe.\n\n'
      + 'Rakennuksen edessä rinteessä on Ranskan suurin ensimmäisen '
      + 'maailmansodan sotilashautausmaa, jossa on 16 142 hautaa. Se vihittiin '
      + '1923, ja vihkijänä oli Verdunin veteraani André Maginot, joka '
      + 'myöhemmin hyväksyi Maginot-linjan rakennustyöt. Itse luukammio '
      + 'vihittiin virallisesti 7. elokuuta 1932 presidentti Albert Lebrunin '
      + 'läsnä ollessa.\n\n'
      + 'Arkkitehdit olivat Léon Azéma, Max Edrei ja Jacques Hardy, ja '
      + 'lasimaalaukset suunnitteli George Desvallières. Torni on 46 metriä '
      + 'korkea, ja siinä on yli kahden tonnin pronssinen kuolinkello, Bourdon '
      + 'de la Victoire, joka soi virallisissa seremonioissa. Tornin huipulla '
      + 'pyörii punavalkoinen kuolleiden lyhty, joka valaisee öisin '
      + 'taistelukenttiä.',
    lahde: 'en-Wikipedia "Douaumont ossuary", johdanto-osa sekä osiot "History", '
      + '"Ossuary information" ja "Architecture" (tarkistettu 11.9.2026).',
  },
  {
    id: 'bayeux-seinavaate',
    nimi: 'Bayeux\'n seinävaate',
    nimio: 'Bayeux',
    tyyppi: 'sana',
    kysymykset: [
      'Miksi teos ei ole oikeasti kuvakudos?',
      'Kuka sen luultavasti tilasi ja miksi?',
    ],
    korostukset: ['kirjonta|kirjonta'],
    nappi: 'Seitsemänkymmentä metriä vuotta 1066',
    // -0.7 E / 49.2767 N — Bayeux, Normandia; en-Wikipedia "Bayeux Tapestry"
    laudat: {
      maailmankartta: { x: 5810.0, y: 1421.5 },
    },
    teksti: 'Bayeux\'n seinävaate on lähes seitsemänkymmentä metriä pitkä ja '
      + 'viisikymmentä senttiä korkea kangas, joka kertoo Normandian herttuan '
      + 'Vilhelmin Englannin-valloituksesta ja Hastingsin taistelusta vuonna '
      + '1066. Nimestään huolimatta se ei ole kudottu kuvakudos vaan kirjonta: '
      + 'kuvat on ommeltu villalangalla karkealle pellavalle neljällä '
      + 'pistolajilla ja kymmenellä luonnonvärillä.\n\n'
      + 'Kangas jakautuu 58 kohtaukseen, joilla kaikilla on keskiaikainen '
      + 'latinankielinen teksti. Siinä on 623 ihmishahmoa, 994 eläintä, 438 '
      + 'kasvia, 37 rakennusta ja linnoitusta sekä 41 laivaa ja venettä. '
      + 'Kertomus alkaa Edvard Tunnustajan hallituskauden viimeisistä vuosista '
      + '1064 ja päättyy Hastingsin taisteluun, jossa Vilhelm voitti Harold '
      + 'Godwininpojan ja otti Englannin kruunun. Lähes puolet kohtauksista '
      + 'käsittelee valloitusta edeltäneitä tapahtumia.\n\n'
      + 'Tilaajaksi arvellaan yleensä Vilhelmin velipuolta, Bayeux\'n piispaa '
      + 'Odoa, ja työ lienee tehty pian valloituksen jälkeen. Näkökulma on '
      + 'Vilhelmille suopea, ja osa historioitsijoista lukee teoksen '
      + 'propagandaksi, jonka tarkoitus oli oikeuttaa hänen valtansa ja voittaa '
      + 'anglosaksinen ylimystö puolelleen. Silti se on korvaamaton lähde '
      + '1000-luvun elämästä: vaatteista, linnoista, laivoista ja arjen '
      + 'tavoista. Se on myös harvoja säilyneitä maallisen romaanisen taiteen '
      + 'teoksia.\n\n'
      + 'Kangasta säilytettiin Bayeux\'n katedraalin aarrekammiossa 1700-luvun '
      + 'loppupuolelle, ja se säilyi täpärästi Ranskan vallankumouksen. '
      + 'Oppineet löysivät sen uudelleen 1729, ja vuodesta 2007 se on ollut '
      + 'Unescon Maailman muisti -rekisterissä.',
    lahde: 'en-Wikipedia "Bayeux Tapestry", johdanto-osa (tarkistettu 11.9.2026).',
  },
  {
    id: 'millaun-silta',
    nimi: 'Millaun silta',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi sillan rakentamiseen ryhdyttiin?',
      'Kuinka korkea rakenne on?',
    ],
    korostukset: ['vinoköysisilta|vinoköysisilta'],
    nappi: 'Yli kaksi vuosikymmentä maailman korkein silta',
    // 3.0225 E / 44.0797 N — en-Wikipedia "Millau Viaduct"
    laudat: {
      maailmankartta: { x: 5934.1, y: 1639.5 },
    },
    teksti: 'Millaun silta on monijänteinen vinoköysisilta Tarn-joen rotkolaakson '
      + 'yli Millaun länsipuolella Aveyronin departementissa Etelä-Ranskassa. '
      + 'Suunnitteluryhmää johtivat insinööri Michel Virlogeux ja englantilainen '
      + 'arkkitehti Norman Foster. Rakenteellinen korkeus on 343 metriä, ja yli '
      + 'kahden vuosikymmenen ajan — vuoden 2025 loppuun asti — se oli maailman '
      + 'korkein silta.\n\n'
      + 'Silta kuuluu moottoritieakseliin A75–A71, joka vie Pariisista '
      + 'Béziers\'iin ja Montpellier\'hen. Rakennuskustannukset olivat noin 394 '
      + 'miljoonaa euroa. Työ kesti kolme vuotta; silta vihittiin 14. joulukuuta '
      + '2004 ja avattiin liikenteelle kaksi päivää myöhemmin.\n\n'
      + '1980-luvulla Millaun seudun tiet tukkeutuivat, kesäisin pahiten, koska '
      + 'Pariisista Espanjaan matkaava lomaliikenne kulki siitä. Millaun '
      + 'ohittamista oli pohdittu pitkään sekä matka-aikojen että kaupungin '
      + 'oman saavutettavuuden takia. Ensimmäisiä siltasuunnitelmia käsiteltiin '
      + '1987, ja lokakuussa 1991 päätettiin rakentaa Tarnin yli noin 2 500 '
      + 'metriä pitkä korkea ylitys.\n\n'
      + 'Vuosina 1993–1996 hallitus kuuli arkkitehteja ja rakennesuunnittelijoita, '
      + 'ja tammikuussa 1995 julistettiin suunnittelukilpailu. Heinäkuussa 1996 '
      + 'tuomaristo valitsi monijänteisen vinoköysiratkaisun, jota esitti '
      + 'Virlogeux\'n, Fosterin ja Arcadisin yhteenliittymä. Eiffage perusti '
      + 'maaliskuussa 2001 tytäryhtiön CEVM ja voitti urakkakilpailun saman '
      + 'vuoden elokuussa. Silta sai 2006 kansainvälisen siltajärjestön IABSE:n '
      + 'Outstanding Structure Award -palkinnon.',
    lahde: 'en-Wikipedia "Millau Viaduct", johdanto-osa ja osio "History" '
      + '(tarkistettu 11.9.2026).',
  },
];

