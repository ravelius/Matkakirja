/*
 * MAASTOKOHTEET — QAT. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs QAT --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/QAT.json. Työkalu laskee laudan
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
 * Qatarin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Qatar on matala aavikkoniemimaa ilman vuoria ja jokia, joten molemmat kohteet ovat merta: niemimaata joka puolelta ympäröivä Persianlahti ja kuuluisa "sisämeri" Khawr al-Udayd.
 *
 * ── MAAILMAN ERÄ M6, LÄHI-ITÄ (6.9.2026) ───────────────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Qatarilla oli kaksi karttamerkkiä eikä yhtään kohdetta. Erä tuo viisi
 * KOHDETTA ja kolmannen MAASTOKOHTEEN (Bahraininlahti). Koordinaatit
 * koneella (`import { laudat } from tools/johda-maastokohteet.mjs`,
 * lon/lat en-Wikipedian coordinates-propista), tekstit käsin
 * raakatekstistä. Kuvaton erä, vain maailmankartan rivi.
 *
 * VIISI KOHDETTA EIKÄ KAHDEKSAA — SYY ON MITATTU. Qatarin fokuslehden
 * rajaus on 68,9 × 99,5 lautayksikköä (js/packs/fokus-grc.js
 * FOKUS_POHJAT.QAT), ja Doha istuu itärannalla keskellä sitä.
 * Kahdeksan yksikön kaupunkikaton (KAUPUNKIKATON_SADE,
 * js/fokuskohteet.js) ja rajauksen jälkeen käyttökelpoista tilaa jää
 * noin 25 × 25 yksikköä pohjoiseen ja kapea kaistale länteen. Kolme
 * ilmeistä ehdokasta karsiutui juuri tähän: Al Wakrah (5,0
 * lautayksikköä Dohasta), Al Wajbahin linnake (4,2) ja Barzanin tornit
 * (5,7) — ne ovat kaupungin kohdalla ja kuuluvat Dohan kohdekartalle,
 * eivät pääkartalle. Al Khor jäi pois, koska se on 0,8 yksikön päässä
 * Jassasiyasta. Nimiölimitys (`node tools/tarkista-nimiolimitys.mjs`)
 * pysyy nollassa viidellä kohteella.
 *
 * ELÄINTÄKY ON QATARISSA MAHDOTON, ja se on mitattu eikä arvattu.
 * tests/elaintakyt.test.mjs vaatii merkiltä vähintään 35 lautayksikön
 * etäisyyden jokaiseen kaupunkimerkkiin. Koko Qatarin maa-alue
 * haravoitiin kahden sadasosa-asteen ruudukolla (maan rengas +
 * js/mapart.js isOnLand): kaukaisin maapiste Dohasta on niemimaan
 * pohjoiskärki, ja sekin vain 31,8 yksikön päässä. Sama tilanne kuin
 * Hongkongissa erässä M3. Ehdokas odottaa valmiina: arabianoryksi,
 * jota Al Reemin biosfäärialue suojelee.
 *
 * VARTIO 7a. tools/savukkeet/savuke-maastokohteet.mjs vaatii, että
 * jokainen kohde osuu maan fokuslehden rajaukseen (`osuuLehteen`);
 * Qatarilla rajaus on olemassa, joten vartio pätee ja jokainen piste on
 * tarkistettu sitä vasten. Vartiota ei ole muutettu.
 */
export const MAASTOKOHTEET_QAT = [
  {
    id: 'persianlahti',
    nimi: 'Persianlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Miten helmiä kalastettiin ennen öljyä?',
      'Missä Hormuzinsalmi on?',
    ],
    korostukset: ['helmisimpukoita|helmisimpukoistaan'],
    nappi: 'Meri joka ympäröi maan',
    // 51.75 E / 25.6 N — ulappa Dohan koillispuolella; artikkelin oma keskipiste on 52 / 26
    laudat: {
      maailmankartta: { x: 7558.3, y: 2339.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Persianlahti on Länsi-Aasian sisämeri Arabian niemimaan ja Iranin välissä, ja Qatarin '
      + 'niemimaa työntyy siihen joka puolelta veden ympäröimänä. Lahti on Intian valtameren ja '
      + 'Arabianmeren jatke, joka yhtyy Omaninlahteen Hormuzinsalmen kautta. Se on tunnettu '
      + 'kalavesistään, riutoistaan ja runsaista helmisimpukoistaan — helmenpyynnin merestä '
      + 'ennen öljyä.',
    lahde: 'en-Wikipedia "Persian Gulf", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'khawraludayd',
    nimi: 'Khawr al-Udayd',
    tyyppi: 'meri',
    kysymykset: [
      'Miten meri pääsee keskelle hiekkadyynejä?',
      'Keitä Bani Yas olivat?',
    ],
    korostukset: ['Bani Yas|Bani Yasin'],
    nappi: 'Aavikon sisämeri',
    // 51.296 E / 24.63 N — en-Wikipedia "Khor Al Adaid"
    laudat: {
      maailmankartta: { x: 7543.2, y: 2373.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Isoisäsi matkaa edeltävänä vuonna, 1869, Khawr al-Udaydiin muutti kolmannen kerran '
      + 'joukko Bani Yasin heimolaisia, jotka irtautuivat Abu Dhabista. Heitä oli noin '
      + 'kaksisataa, ja kylässä oli kolmekymmentä helmenpyyntialusta ja kaksitorninen linnake. '
      + 'Kaksi edellistä yritystä oli päättynyt huonosti: 1836 brittilaivasto tuli hätistämään '
      + 'paikan merirosvot ja poltti yhden aluksista, ja 1837 Abu Dhabin šeikin joukot '
      + 'hävittivät kylän — viisikymmentä asukasta sai surmansa. Paikan nimi tulee sanasta '
      + 'adad, joukko: siellä asui laivankorjaajien yhteisö, ja siksi helmenpyyntialukset '
      + 'tulivat sinne huoltoon. Nykyään yhdeksän kilometrin pituinen, dyynien väliin '
      + 'kiemurteleva vuono on luonnonsuojelualue ja Qatarin sisämeri.',
    lahde: 'en-Wikipedia "Khor Al Adaid", johdanto-osa sekä osiot "Etymology", "Settlement and '
      + 'subsequent conflicts" ja "Geography" (tarkistettu 1.9.2026).',
  },

  /* ================================================================
   * ERÄ M6, LÄHI-ITÄ (6.9.2026) — viisi kohdetta ja Bahraininlahti.
   * ============================================================== */
  {
    id: 'bahraininlahti',
    nimi: 'Bahraininlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä erottaa Bahraininlahden Persianlahdesta?',
      'Mikä on King Fahdin pengertie?',
    ],
    korostukset: ['Bahrain|Bahrainin'],
    nappi: 'Lahti niemimaan länsipuolella',
    // 50.72 E / 25.95 N — ulappa Qatarin luoteispuolella; artikkelin oma
    // keskipiste on 50,534 / 25,697. Lähin kaupunki Doha 35,5.
    laudat: {
      maailmankartta: { x: 7524, y: 2326.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Bahraininlahti on Persianlahden poukama Saudi-Arabian itärannikolla, ja juuri Qatarin '
      + 'niemimaa erottaa sen muusta lahdesta. Se ympäröi Bahrainin saaria. Lahden länsiosan '
      + 'yli kulkee King Fahdin pengertie, joka yhdistää Saudi-Arabian ja Bahrainin. Qatarin '
      + 'puolelta katsottuna tämä on se matala meri, jonka helmimatalikoilla niemimaan vauraus '
      + 'lepäsi ennen öljyä.',
    lahde: 'en-Wikipedia "Gulf of Bahrain", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'zubarah',
    nimi: 'Zubarah',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi Zubarah on niin hyvin säilynyt?',
      'Mikä oli Qal’at Murair?',
    ],
    korostukset: ['Bani Utbah|Bani Utbahin'],
    nappi: 'Autio helmenpyyntikaupunki',
    // 51.02639 E / 25.97861 N — en-Wikipedia "Zubarah"
    // Lähin pelikaupunki: Doha 29,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7534.2, y: 2325.9 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Zubarah on autioitunut kaupunki Qatarin pohjoisrannikolla. Bani Utbahin heimoja '
      + 'asettui sinne 1760-luvulla, ja satama tunnettiin taloudellisesti merkittävänä jo '
      + 'vuoden 1766 käsikirjoituksessa. Kun Al Khalifan suvun vaikutusvalta kasvoi, se '
      + 'rakennutti kaupungin turvaksi linnakkeen: vuonna 1768 valmistunut Qal’at Murair sai '
      + 'muurit, vartiotornit ja kanavan merelle asti. Unesco liitti Zubarahin '
      + 'maailmanperintöluetteloon 22. kesäkuuta 2013 ja perusteli valintaa sillä, kuinka '
      + 'poikkeuksellisen hyvin kaupunki on säilynyt ja kuinka selvästi siitä näkee, että se eli '
      + 'helmenpyynnistä ja kaupasta. Kaivauksia on tehty vuodesta 2009 qatarilais-tanskalaisena '
      + 'yhteistyönä.',
    lahde: 'en-Wikipedia "Zubarah", osiot "Initial development" ja "World Heritage Site" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'jassasiya',
    nimi: 'Jassasiya',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä kalliopiirroksissa esitetään?',
      'Mikä on fossiilinen dyyni?',
    ],
    korostukset: ['kalliopiirroksia|kalliopiirroksia'],
    nappi: 'Yhdeksänsataa kuvaa kiveen',
    // 51.3833 E / 25.8167 N — en-Wikipedia "Jebel Jassassiyeh"
    // Lähin pelikaupunki: Doha 19,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7546.1, y: 2331.7 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Jebel Jassassiyeh on Qatarin koillisrannikolla oleva alue, jonka fossiloituneisiin '
      + 'hiekkadyyneihin on hakattu kalliopiirroksia. Kuvia on yli yhdeksänsataa, ja ne '
      + 'jakautuvat 580 numeroituun kohtaan — Qatarin laajin kalliotaidekohde. Aiheina ovat '
      + 'geometriset kuviot, eläimet ja ennen kaikkea veneet, joita on piirretty sekä sivulta '
      + 'että ylhäältä katsottuina. Piirrokset muistuttavat Luxorin Karnakin temppelistä '
      + 'löytyviä. Samalla alueella on raunioituneita asumuksia ja 1400-luvun keramiikkaa.',
    lahde: 'en-Wikipedia "Jebel Jassassiyeh", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'alreem',
    nimi: 'Al Reem',
    // Suojelualue ei ole vuori eikä meri: tyyppi 'muu' + symboli 'luonto'.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä on biosfäärialue?',
      'Miksi kasvillisuus on täällä tiheämpää kuin muualla?',
    ],
    korostukset: ['biosfäärialue|biosfäärialue'],
    nappi: 'Kymmenesosa maasta suojelussa',
    // 51.0 E / 25.75 N — en-Wikipedia "Al Reem Biosphere Reserve"
    // Lähin pelikaupunki: Doha 23,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7533.3, y: 2334 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Al Reemin biosfäärialue on 120 000 hehtaarin asuttu suojelualue Luoteis-Qatarissa, '
      + 'kuudenkymmenenviiden kilometrin päässä Dohasta luoteeseen. Puolikuivassa aavikko'
      + 'maisemassa elää gasellien ja arabianoryksien kaltaisia lajeja. Alue perustettiin 2005, '
      + 'ja Unesco tunnusti sen 2007; se on yksi Lähi-idän kahdestakymmenestäneljästä '
      + 'biosfäärialueesta. Suojelualue kattaa noin kymmenesosan koko Qatarin maapinta-alasta, ja '
      + 'sen tavallista tiheämpi kasvillisuus tekee siitä maalle poikkeuksellisen tärkeän.',
    lahde: 'en-Wikipedia "Al Reem Biosphere Reserve", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'dukhan',
    nimi: 'Dukhan',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mitä Dukhan tarkoittaa?',
      'Miksi öljytyöt keskeytyivät 1940-luvulla?',
    ],
    korostukset: ['Zekreetin satama|Zekreetin sataman'],
    nappi: 'Paikka, josta öljy löytyi',
    // 50.79222 E / 25.41944 N — en-Wikipedia "Dukhan" (tietolaatikko)
    // Lähin pelikaupunki: Doha 24,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7526.4, y: 2345.8 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Dukhan on Qatarin länsirannikolla oleva öljykaupunki noin kahdeksankymmenen '
      + 'kilometrin päässä Dohasta. Nimi tarkoittaa savua: se viittaa Jebel Dukhanin huipun '
      + 'ympärille kerääntyviin pilviin ja arkikielessä myös leirin soihtujen savuun. Etsintä '
      + 'alkoi 1935, ja 1937 täältä löytyi Qatarin ensimmäinen suuri öljyesiintymä. Ensimmäistä '
      + 'kaivoa alettiin porata 1939, ja se valmistui seuraavana vuonna — sitten toinen '
      + 'maailmansota pysäytti työt. Vesi, ruoka ja koneet tuotiin Bahrainista matalan Zekreetin '
      + 'sataman kautta, ja ensimmäinen tynnyri lähti vientiin 31. joulukuuta 1949. Löytö käänsi '
      + 'maan helmitaloudesta öljytalouteen.',
    lahde: 'en-Wikipedia "Dukhan", johdanto-osa sekä osiot "Etymology" ja "Early operations" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'althakhira',
    nimi: 'Al Thakhira',
    // Mangrovelahti ei ole vuori eikä meri: 'muu' + 'luonto'.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Mihin mangrovemetsää tarvitaan?',
      'Mitä Lorimerin luettelo oli?',
    ],
    korostukset: ['mangrove|mangrovemetsien'],
    nappi: 'Mangrovelahti helmenpyytäjien kylässä',
    // 51.5475 E / 25.73472 N — en-Wikipedia "Al Thakhira"
    // Lähin pelikaupunki: Doha 15,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7551.6, y: 2334.6 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Al Thakhira on kylä Qatarin itärannikolla, mangrovemetsien suojaamassa poukamassa, '
      + 'ja se toimi pienenä ankkuripaikkana. Kylän perustivat Al Muhannadi -heimoliiton jäsenet, '
      + 'jotka muuttivat sinne läheisestä Al Khorista. J. G. Lorimerin Persianlahden luettelo '
      + 'kuvasi paikan vuonna 1908: kolmesataa taloa kolmenkymmenen mailin päässä Dohasta '
      + 'pohjoiseen, ja kaikki asukkaat helmisukeltajia, jotka eivät harjoittaneet muuta kuin '
      + 'kalastusta eivätkä omistaneet karjaa. Kylällä oli viisitoista helmivenettä ja niissä '
      + 'satakahdeksankymmentä miestä, ja juomavesi haettiin kahden mailin päästä '
      + 'Lubwairdahista.',
    lahde: 'en-Wikipedia "Al Thakhira", historiaosio ja siinä lainattu J. G. Lorimerin '
      + '"Gazetteer of the Persian Gulf" (tarkistettu 6.9.2026).',
  },
];

