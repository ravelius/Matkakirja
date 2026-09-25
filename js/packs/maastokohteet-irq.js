/*
 * MAASTOKOHTEET — IRQ. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs IRQ --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/IRQ.json. Työkalu laskee laudan
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
 * Irakin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Eufratin tarina on jo TUR:n listalla (Fırat), joten Irakin joet ovat Tigris ja Shatt al-Arab.
 *
 * MAAILMAN ERÄ M9 (6.9.2026) lisäsi listaan viisi KOHDETTA — Ur, Uruk,
 * Samarran suuri moskeija, Erbilin sitadelli ja Hatra. Lähin uusi
 * merkki on Erbilin sitadelli 30,2 lautayksikön päässä Mosulista
 * (KAUPUNGIN_KOHDALLA_SADE 7), joten kaikki ovat pääkartan merkkejä.
 * Babylon, Ishtarin portti ja Niniven lounaispalatsi ovat jo maan
 * fokuskohteita (js/packs/fokuskohteet-irq.js) eikä niitä toisteta.
 * Nimrud jätettiin pois: sen artikkelin nykytilaosuus on tuhoa ja
 * jälleenrakennusta, ja saman aiheen kantaa erän skandaali. Erä on
 * kuvaton, ja jokaisen kohteen lähin pelikaupunki on kirjattu sen
 * koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_IRQ = [
  {
    id: 'cheekhadar',
    nimi: 'Cheekha Dar',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi korkeudesta ei olla varmoja?',
      'Missä Irakin vuoristot ovat?',
    ],
    korostukset: ['Kurdistan|Kurdistanin'],
    nappi: 'Musta teltta, Irakin katto',
    // 44.9186 E / 36.7767 N — en-Wikipedia "Cheekha Dar"
    laudat: {
      maailmankartta: { x: 7330.6, y: 1927.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Cheekha Dar, kurdiksi "musta teltta", on nykytiedon mukaan Irakin korkein vuori: noin '
      + '3 611 metriä Kurdistanin alueella maan pohjoisosassa, aivan Iranin rajalla. Kahden '
      + 'jokilaakson maana tunnettu Irak nousee siis koilliskulmastaan oikeaksi vuoristoksi — '
      + 'ja huipun tarkasta korkeudesta kiistellään yhä, sillä lukema on peräisin mittausten '
      + 'eikä virallisen kartoituksen varasta.',
    lahde: 'en-Wikipedia "Cheekha Dar", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'tigris',
    nimi: 'Tigris',
    tyyppi: 'joki',
    kysymykset: [
      'Mitä Mesopotamia tarkoittaa?',
      'Mitkä suurkaupungit nousivat Tigriin varrelle?',
    ],
    korostukset: ['Mesopotamia|Mesopotamian', 'Assyria|Assyrian'],
    nappi: 'Mesopotamian itäisempi joki',
    // 44.36 E / 33.31 N — Bagdadin kohdalla; artikkelin koordinaatti 47,44 / 31,01 on yhtymäkohdassa al-Qurnahissa
    laudat: {
      maailmankartta: { x: 7312, y: 2058.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Tigris on Mesopotamian eli "jokien välisen maan" kahdesta joesta itäisempi — läntinen '
      + 'on Eufrat. Se virtaa Armenian ylängöltä etelään aavikoiden halki ja yhtyy lopulta '
      + 'Eufratiin ennen Persianlahtea. Sen rannoilla ovat Mosul, Tikrit, Samarra ja Bagdad, ja '
      + 'muinaisuudessa sen vesi elätti Assyrian suurvallan.',
    lahde: 'en-Wikipedia "Tigris", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'shattalarab',
    nimi: 'Shatt al-Arab',
    tyyppi: 'joki',
    kysymykset: [
      'Missä Eufrat ja Tigris yhtyvät?',
      'Miksi jokea pitää ruopata jatkuvasti?',
    ],
    korostukset: ['Basra|Basran'],
    nappi: 'Kahden virran yhteinen loppu',
    // 47.78 E / 30.5 N — Basran kohdalla; artikkelin koordinaatti 48,15 / 30,41 on joen suulla
    laudat: {
      maailmankartta: { x: 7426, y: 2162.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Shatt al-Arab, "arabien joki", syntyy kun Eufrat ja Tigris yhtyvät al-Qurnahin '
      + 'kaupungin kohdalla Etelä-Irakissa. Yhteistä virtaa riittää enää noin 200 kilometriä '
      + 'Basran ohi Persianlahteen, ja alajuoksullaan joki on Irakin ja Iranin rajana. Iranin '
      + 'puolelta siihen laskeva Karun tuo mukanaan niin paljon lietettä, että väylä pysyy '
      + 'laivakuntoisena vain jatkuvalla ruoppauksella.',
    lahde: 'en-Wikipedia "Shatt al-Arab", johdanto-osa (tarkistettu 30.8.2026).',
  },
  /* ================================================================
   * MAAILMAN ERÄ M9, LÄHI-ITÄ 2 6.9.2026 — VIISI KOHDETTA. Omistaja
   * 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."* Irakilla
   * oli kolme maastokohdetta ja kolme kohdetta
   * (js/packs/fokuskohteet-irq.js), joita ei toisteta täällä. Kaikki
   * viisi ovat pääkartan merkkejä: etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin uusi merkki
   * on Erbilin sitadelli 30,2 lautayksikön päässä Mosulista (raja
   * KAUPUNGIN_KOHDALLA_SADE on 7, js/fokuskohteet.js). Kuvaton erä;
   * faktat en-Wikipedian raakatekstistä 6.9.2026. Herkkien aiheiden
   * linjaus on sitova (docs/aasia-tyoaineisto/spec-asia.md): kortit
   * ovat muinaishistoriaa, ja vaurioista kerrotaan vain toteavasti
   * lähteen sanamuodossa, ilman nykypolitiikkaa.
   * ============================================================== */
  {
    id: 'ur',
    nimi: 'Ur',
    tyyppi: 'historia',
    kysymykset: [
      'Kenelle Urin ziggurat oli omistettu?',
      'Mitä kuninkaallisista haudoista löytyi?',
    ],
    korostukset: ['ziggurat|ziggurat'],
    nappi: 'Kuunjumalan asunto',
    // 46.1031 E / 30.9625 N — en-Wikipedia "Ur"
    // Lähin pelikaupunki: Kuwait 89,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7370.1, y: 2145.7 },
    },
    teksti: 'Ur oli sumerilainen suurkaupunki Mesopotamian tasangolla, ja sen suojelusjumala '
      + 'oli kuunjumala Nanna, akkadiksi Sin. Kaupungin nimi tuleekin sanoista, jotka '
      + 'tarkoittavat Nannan asuinsijaa. Paikkaa hallitsee osittain entisöity Urin ziggurat, '
      + 'jonka sisällä oli Nannan pyhäkkö: temppeli rakennettiin 2000-luvulla eaa. Ur-Nammun '
      + 'aikana ja Babylonin viimeinen kuningas Nabonidus rakensi sen uudelleen 500-luvulla eaa. '
      + 'Kaupungin kuninkaallisista haudoista, jotka ajoittuvat noin vuosiin 2500–2300 eaa., '
      + 'löytyi ylellisyystavaroita jalometalleista ja puolijalokivistä — aineet oli tuotu '
      + 'kaukaa Iranista, Afganistanista, Intiasta, Vähästä-Aasiasta, Levantista ja '
      + 'Persianlahdelta, mikä kertoo kaupungin varhaisesta rikkaudesta. Vuoden 1928 kaivauksissa '
      + 'löytyivät myös Urin lyyrat, harppua muistuttavat härkämuotoiset soittimet '
      + 'yhdellätoista kielellä.',
    lahde: 'en-Wikipedia "Ur", johdanto-osa ja osio "Society and culture" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'uruk',
    nimi: 'Uruk',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka suuri Uruk oli huipussaan?',
      'Kuka hallitsi Urukia kuningasluettelon mukaan?',
    ],
    korostukset: ['kaupungistuminen|kaupungistumisessa'],
    nappi: 'Maailman ensimmäinen suurkaupunki',
    // 45.6361 E / 31.3222 N — en-Wikipedia "Uruk"
    // Lähin pelikaupunki: Bagdad 85,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7354.5, y: 2132.5 },
    },
    teksti: 'Uruk, nykyisin Warka, oli muinaiskaupunki Eufratin vanhan uoman varrella '
      + 'Etelä-Irakissa, 93 kilometriä Urista luoteeseen. Se antoi nimensä koko Urukin kaudelle '
      + 'ja oli johtavassa asemassa Sumerin varhaisessa kaupungistumisessa noin vuonna 3500 '
      + 'eaa. Huipullaan noin vuonna 3100 eaa. kaupungissa saattoi asua 50 000 ihmistä '
      + 'ja sen ympäristössä 80 000–90 000 — se oli tuolloin maailman suurin kaupunkialue. '
      + 'Sumerilaisen kuningasluettelon mukaan Gilgameš hallitsi Urukia 2600-luvulla eaa. '
      + 'Kaupunki menetti asemansa Akkadin valtakunnan noustessa mutta kukoisti yhä uudelleen '
      + 'aina partialaisaikaan asti, kunnes se hylättiin 600-luvulla jaa. William Kennett '
      + 'Loftus kävi paikalla 1849 ja johti ensimmäisiä kaivauksia 1850–1854.',
    lahde: 'en-Wikipedia "Uruk", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'samarranmoskeija',
    nimi: 'Samarran moskeija',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi minareettia kutsutaan nimellä Malwiya?',
      'Kuka rakennutti moskeijan?',
    ],
    korostukset: ['minareetti|minareetti'],
    nappi: 'Kierteinen torni',
    // 43.8747 E / 34.2 N — en-Wikipedia "Great Mosque of Samarra"
    // Lähin pelikaupunki: Bagdad 36,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7295.8, y: 2025.5 },
    },
    teksti: 'Samarran suuri moskeija eli al-Malwiyan moskeija on nykyään osittain raunioina '
      + 'Samarrassa Pohjois-Irakissa. Abbasidikalifi al-Mutawakkil tilasi sen vuonna 848 ja se '
      + 'valmistui 851; valmistuessaan se oli maailman suurin moskeija, pinta-alaltaan lähes '
      + '166 000 neliömetriä ja yli 60 000 rukoilijalle. Sen tunnusmerkki on 52 metriä korkea ja '
      + '33 metriä leveä minareetti, Malwiya-torni, jonka ympäri kiertää ulkopuolinen '
      + 'nousuramppi — nimi tarkoittaa kierteistä. Rakennustyössä käytettiin poltetusta tiilestä '
      + 'muurattuja kahdeksankulmaisia pilareita ja nurkissa neljää tuotua marmoripylvästä, ja '
      + 'kalifi palkkasi taiteilijoita ja rakennusmestareita eri puolilta valtakuntaa. Moskeija '
      + 'kuuluu Unescon maailmanperintökohteeseen Samarran arkeologinen kaupunki, joka '
      + 'luetteloitiin 2007.',
    lahde: 'en-Wikipedia "Great Mosque of Samarra", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'erbilinsitadelli',
    nimi: 'Erbilin sitadelli',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kuinka korkealle kumpu nousee tasangosta?',
      'Milloin sitadelli pääsi maailmanperintöluetteloon?',
    ],
    korostukset: ['tell|tell'],
    nappi: 'Kumpu, jolla on aina asuttu',
    // 44.0092 E / 36.1911 N — en-Wikipedia "Citadel of Erbil"
    // Lähin pelikaupunki: Mosul 30,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7300.3, y: 1950.2 },
    },
    teksti: 'Erbilin sitadelli on tell eli asuttu kumpu ja Erbilin kaupungin historiallinen '
      + 'ydin Pohjois-Irakissa. Vanhimmat merkit asutuksesta ovat 4000-luvulta eaa., ehkä '
      + 'vanhemmiltakin ajoilta, ja koska kumpua on asuttu yhtäjaksoisesti, sitä on kutsuttu '
      + 'maailman vanhimmaksi yhtäjaksoisesti asutuksi kaupungiksi. Historian lähteissä paikka '
      + 'esiintyy ensi kerran Eblan savitauluissa noin vuonna 2000 eaa., ja se nousi tärkeäksi '
      + 'uusassyrialaisella kaudella; sassanidien ja abbasidien aikana Erbil oli merkittävä '
      + 'kristinuskon keskus. Kumpu kohoaa 25–32 metriä ympäröivästä tasangosta, ja sen päällä '
      + 'oleva rakennusalue on soikea, noin 430 kertaa 340 metriä. Ainoa säilynyt uskonnollinen '
      + 'rakennus on Mulla Afandin moskeija. Unescon maailmanperintöluetteloon sitadelli '
      + 'lisättiin 21. kesäkuuta 2014.',
    lahde: 'en-Wikipedia "Citadel of Erbil", johdanto-osa ja osio "Prehistory" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'hatra',
    nimi: 'Hatra',
    tyyppi: 'historia',
    kysymykset: [
      'Ketkä epäonnistuivat Hatran piirityksessä?',
      'Millainen kaupungin pohjakaava oli?',
    ],
    korostukset: ['partialaisaika|partialaisajan'],
    nappi: 'Karavaanikaupunki kahden vallan välissä',
    // 42.7181 E / 35.5883 N — en-Wikipedia "Hatra"
    // Lähin pelikaupunki: Mosul 31,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7257.3, y: 1973.2 },
    },
    teksti: 'Hatra oli muinainen kaupunki Ylä-Mesopotamiassa, 110 kilometriä Mosulista '
      + 'lounaaseen, ja sitä pidetään rikkaimpana tunnettuna partialaisajan kaivauspaikkana. Se '
      + 'oli vahvasti linnoitettu karavaanikaupunki ja pienen Hatran kuningaskunnan pääkaupunki '
      + 'Rooman ja Partian välissä. Kaupunki torjui 100-luvulla jaa. sekä Trajanuksen '
      + 'piirityksen 116–117 että Septimius Severuksen 198–199, voitti sassanidit Shahrazoorin '
      + 'taistelussa 238 mutta kukistui 241 Shapur I:n armeijalle. Pohjakaava oli pyöreä: '
      + 'kaupunkia ympäröivät sisä- ja ulkomuuri, halkaisijaltaan lähes kaksi kilometriä, ja '
      + 'muureissa oli yli 160 tornia. Unescon maailmanperintökohde Hatra on ollut vuodesta '
      + '1985; vuonna 2015 osa sen veistoksista ja kuvista tuhottiin, mutta muurit ja tornit '
      + 'ovat yhä pystyssä.',
    lahde: 'en-Wikipedia "Hatra", johdanto-osa sekä osiot "History", "Modern Hatra" ja '
      + '"Partial destruction and looting by ISIL" (tarkistettu 6.9.2026).',
  },
];

