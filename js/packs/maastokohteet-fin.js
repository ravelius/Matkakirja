/*
 * MAASTOKOHTEET — FIN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs FIN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/FIN.json. Työkalu laskee laudan
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
 * ── K2-ERÄ 3 6.9.2026: KAHDEKSAN KOHDETTA MAASTON RINNALLE ────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Suomessa oli neljä maastokohdetta ja nolla kuratoitua kohdetta
 * (docs/moduulit/karttanostot-kattavuus.md). Tavoite on kahdeksan
 * KOHDETTA maastokohteiden lisäksi, ja tässä ne ovat. Malli on sama
 * kuin K2-erässä 1 (js/packs/maastokohteet-isl.js, -che.js).
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-fin.js:ssä.
 * Kohdepakki tarvitsisi rivin js/fokuskohteet.js:n KOHDE_MAAT-tauluun
 * ja lehden poltettujen nimien lohkon (js/packs/fokus-grc.js
 * FOKUS_LISANIMET, tests/fokusnimet.test.mjs). Kumpaakaan ei tehdä
 * tässä erässä: KOHDE_MAAT on rinnakkaisen erän hallussa, ja
 * lisänimien lohko ladotaan ämpärin `<ISO>.json`-tiedostosta, jota
 * repossa ei ole. Tämän tiedoston lista liittyy peliin hakemiston
 * kautta (js/packs/maastokohteet.js), joten kohteet ovat kartalla heti.
 *
 * SUOMESSA ON KOLME PELIKAUPUNKIA (Helsinki, Tampere, Rovaniemi), ja
 * etäisyys mitattiin niihin kaikkiin. Lähin uusi merkki on Petäjäveden
 * vanha kirkko 61,1 lautayksikön päässä Tampereesta — reilusti yli
 * kaupungin kohdalla -säteen (KAUPUNGIN_KOHDALLA_SADE 7,
 * js/fokuskohteet.js). Kaikki kahdeksan ovat siis pääkartan merkkejä.
 *
 * SUOMENLINNA JÄTETTIIN POIS, vaikka se olisi ilmeisin: nimi on jo
 * kartalla Helsingin kohdekartan pisteenä (js/packs/maakartat.js
 * KAUPUNKIKARTAT.helsinki, juttu js/packs/nahtavyysjutut.js), ja
 * sääntö N3 sallii saman nimen kartalla vain kerran.
 *
 * KUVATON ERÄ. Sama linja kuin maastokohteilla muutenkin: kortti
 * kantaa tekstin ja lähteen, ei kuvaa. Tarkistamaton Commons-tiedosto
 * olisi huonompi kuin kuvaton kortti (Perustuslaki, faktakuri).
 * Faktat on tarkistettu en-Wikipediasta kohde kerrallaan 6.9.2026.
 *
 * Suomen maastokohteet. Faktat en-Wikipediasta 29.8.2026.
 */
export const MAASTOKOHTEET_FIN = [
  {
    id: 'halti',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fin-maasto-halti-43501e8131d9.jpg',
      lyhyt: 'Haltin kivinen tunturiylänkö ja rajapyykki 303B.',
      selite: 'Haltin rajapyykki 303B sijaitsee tunturin rinteellä 1 324 metrissä ja merkitsee Suomen korkeinta kohtaa.',
      lahde: 'Matkakirjan havainnekuva',
      tekija: 'OpenAI, Matkakirjan toimituksen ohjaama havainnekuva',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ridnitšohkka_from_Halti.JPG',
      lisenssi: 'Matkakirjan oma havainnekuva',
    },
    nimi: 'Halti',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Suomen korkein kohta ei ole huippu?',
      'Mikä on korkein kokonaan Suomessa oleva tunturi?',
    ],
    korostukset: ['Hálditšohkka'],
    nappi: 'Suomen korkein kohta — mutta ei huippu',
    // 21.2789 E / 69.3228 N — en-Wikipedia "Halti"
    laudat: {
      maailmankartta: { x: 6542.6, y: 422.5 },
      europe: { x: 619.8, y: 70.4 },
    },
    teksti: 'Halti on tunturi Norjan ja Suomen rajalla. Sen varsinainen huippu Ráisduottarháldi on '
      + 'Norjan puolella, noin kilometrin päässä rajasta, ja Suomen puolen korkein kohta on 1 '
      + '324 metrissä oleva Hálditšohkka — maan korkein piste, mutta rinteellä eikä huipulla. '
      + 'Rajan mutka juontuu Ruotsin ja Tanskan rajasopimuksesta vuodelta 1734, jolloin '
      + 'rajapyykit lyötiin sinne minne oli kätevintä ja raja sovittiin kulkevaksi suoraan '
      + 'niiden välillä.',
    lahde: 'en-Wikipedia "Halti", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'pohjanlahti',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fin-maasto-pohjanlahti-ba8ea23e3730.jpg',
      lyhyt: 'Merenkurkun matalaa saaristoa ja maankohoamisrantaa.',
      selite: 'Merenkurkun matalassa saaristossa maankohoaminen paljastaa jatkuvasti uutta rantaa Pohjanlahden vedestä.',
      lahde: 'Matkakirjan havainnekuva',
      tekija: 'OpenAI, Matkakirjan toimituksen ohjaama havainnekuva',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Svedjehamn_from_Saltkaret.jpg',
      lisenssi: 'Matkakirjan oma havainnekuva',
    },
    nimi: 'Pohjanlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä Merenkurkku on?',
      'Miksi Pohjanlahden rannat nousevat yhä?',
    ],
    korostukset: ['Merenkurkku|Merenkurkkuun'],
    nappi: 'Itämeren pohjoisin haara',
    // 21.6 E / 62.8 N — ulappa Merenkurkun pohjoispuolella; artikkelin oma keskipiste on 20 / 63
    laudat: {
      maailmankartta: { x: 6553.3, y: 783.1 },
      europe: { x: 625.9, y: 242 },
    },
    teksti: 'Pohjanlahti on katoamassa. Maa nousee yhä siitä, minkä jääkauden mannerjää painoi '
      + 'sen alle — lähes kilometrin verran — ja kohoaa 80 senttiä vuosisadassa, Merenkurkussa '
      + 'melkein sentin vuodessa. Noin kahdentuhannen vuoden kuluttua kynnys nousee pinnan '
      + 'yläpuolelle ja Perämeri irtoaa omaksi makean veden järvekseen. Sitä kohti se on jo '
      + 'pitkällä: pohjoisimmillaan vesi on niin vähäsuolaista, että hauki, siika ja ahven '
      + 'viihtyvät siinä. Lahti on Itämeren pohjoisin haara Suomen länsirannikon ja '
      + 'Pohjois-Ruotsin itärannikon välissä, ja se jakautuu Perämereen, Merenkurkkuun ja '
      + 'Selkämereen. Lahden eteläpäässä on Ahvenanmaa, Ahvenanmeren ja Saaristomeren välissä; '
      + 'Suomen puolen suurimmat satamat tonneissa mitattuna ovat Rauma, Kokkola ja Tornio.',
    lahde: 'en-Wikipedia "Gulf of Bothnia", johdanto-osa sekä osiot "Geography" ja "Economy" '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'suomenlahti',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fin-maasto-suomenlahti-36c903d047a6.jpg',
      lyhyt: 'Suomenlahden kallioista rantaa ja matalaa saaristoa Sipoon edustalla.',
      selite: 'Suomenlahden kallioista rantaa ja matalaa saaristoa Sipoon edustalla.',
      lahde: 'Matkakirjan havainnekuva — lähdeperusteinen johdannainen',
      tekija: 'OpenAI; referenssikuva LPfi',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skata-ledholmen.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fin-maasto-suomenlahti-ed485e1c26dd.jpg',
      lyhyt: 'Suomenlahden kallioista rantaa ja matalaa saaristoa Sipoon edustalla.',
      selite: 'Suomenlahden kallioista rantaa ja matalaa saaristoa Sipoon edustalla.',
      lahde: 'Valokuva: LPfi, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'LPfi',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skata-ledholmen.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    }],
    nimi: 'Suomenlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä joki laskee Suomenlahden pohjukkaan?',
      'Miksi lahden ympäristöongelmat ovat pahimpia juuri täällä?',
    ],
    korostukset: ['Neva|Neva'],
    nappi: 'Itämeren itäisin haara',
    // 25.2 E / 59.9 N — en-Wikipedia "Gulf of Finland" (26 / 59,83), siirretty hieman länteen lahden keskiulapalle
    laudat: {
      maailmankartta: { x: 6673.3, y: 930.7 },
      europe: { x: 695, y: 318.2 },
    },
    teksti: 'Suomenlahti on Itämeren itäisin haara. Se ulottuu Suomen ja Viron välissä itään '
      + 'Pietariin asti, jonne Neva laskee. Lahden rannoilla ovat myös Helsinki ja Tallinna, ja '
      + 'koska lahti on matala, Itämeren ympäristöongelmat näkyvät siinä kaikkein selvimmin.',
    lahde: 'en-Wikipedia "Gulf of Finland", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'kemijoki',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fin-maasto-kemijoki-cdeceff60941.jpg',
      lyhyt: 'Tukinuittoa Kemijoella 1800-luvun lopulla.',
      selite: 'Kemijoen tukinuitto alkoi 1860-luvulla ja jatkui aina kesään 1991 saakka.',
      lahde: 'Matkakirjan havainnekuva',
      tekija: 'OpenAI, Matkakirjan toimituksen ohjaama havainnekuva',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/Category:Timber_floating_in_Finland',
      lisenssi: 'Matkakirjan oma havainnekuva',
    },
    nimi: 'Kemijoki',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Ounasjoki rauhoitettiin?',
      'Milloin Kemijoen uitto loppui?',
    ],
    korostukset: ['Ounasjoki|Ounasjoki'],
    nappi: 'Suomen pisin joki',
    // 25.6 E / 66.4 N — keskijuoksu Rovaniemen yläpuolella; artikkelin koordinaatti 24,45 / 65,77 on suistossa Kemissä
    laudat: {
      maailmankartta: { x: 6686.7, y: 589.5 },
      europe: { x: 702.7, y: 147.3 },
    },
    teksti: 'Isoisäsi aikaan Kemijoella oli juuri alkanut uitto: tukit lähtivät ensimmäisen kerran '
      + 'alas 1860-luvulla, ja viimeiset uitettiin kesällä 1991 — satakolmekymmentä vuotta '
      + 'samaa työtä, kunnes auto ja juna veivät sen. Uiton rinnalle tuli toinen käyttö. '
      + 'Ensimmäinen voimalaitos rakennettiin Isohaaraan 1946, ja vähitellen Suomen pisimpään '
      + 'jokeen ja sen valuma-alueelle nousi 21 laitosta, jotka tuottavat yli kolmanneksen maan '
      + 'vesivoimasta. Yksi iso haara jätettiin rauhaan: Ounasjoki, joka yhtyy Kemijokeen '
      + 'Rovaniemellä, rauhoitettiin lailla 1983, eikä siihen rakennettu yhtään voimalaa. '
      + 'Kemijoki itse on 550 kilometriä pitkä ja laskee Pohjanlahteen Kemissä.',
    lahde: 'fi-Wikipedia "Kemijoki", johdanto-osa sekä osiot "Kemijoen vesistön voimalaitokset" ja '
      + '"Kemijoen uitto" (tarkistettu 1.9.2026).',
  },
  /* ================================================================
   * K2-ERÄ 3 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   *
   * Uusilla kohteilla on vain maailmankartan rivi: Euroopan
   * erillislaudasta on luovuttu (Raamattu 30.8.2026), eikä uutta
   * `europe`-koordinaattia siksi lasketa. Yllä olevien maastokohteiden
   * vanhoihin riveihin ei ole koskettu.
   * ============================================================== */
  {
    id: 'olavinlinna',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fin-kohde-olavinlinna-e88c76b06013.jpg',
      lyhyt: 'Olavinlinna Kyrönsalmen saarella nykyisessä asussaan.',
      selite: 'Nykyinen Olavinlinna seisoo Kyrönsalmen saarella, ja sen kolme pyöreää tornia erottuvat epäsäännöllisestä linnakokonaisuudesta.',
      lahde: 'Valokuva: Teemu Mökkönen / Museovirasto, CC BY 4.0.',
      tekija: 'Teemu Mökkönen',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Savonlinna_Olavinlinna_Olavinlinna_ja_Kyr%C3%B6nsalmi_kuvattuna_kohti_l%C3%A4ntt%C3%A4_Taustalla_Savonlinna_kaupungin_keskustaa_2025_(AKDG7576-3).jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0/',
    },
    nimi: 'Olavinlinna',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä Pähkinäsaaren rauha oli?',
      'Miksi linna rakennettiin keskelle salmea?',
    ],
    korostukset: ['Kyrönsalmi|Kyrönsalmessa'],
    nappi: 'Pohjoisin keskiaikainen kivilinna',
    // 28.9011 E / 61.8639 N — en-Wikipedia "Olavinlinna"
    laudat: {
      maailmankartta: { x: 6796.7, y: 831.5 },
    },
    teksti: 'Olavinlinna on 1400-luvun kolmitorninen linna Savonlinnassa, saarella '
      + 'Kyrönsalmessa Haukiveden ja Pihlajaveden välissä. Se on pohjoisin yhä pystyssä oleva '
      + 'keskiaikainen kivilinnoitus ja koko Ruotsin valtakunnan parhaiten säilynyt '
      + 'keskiaikainen linna. Erik Axelsson Tott perusti sen vuonna 1475 nimellä Sankt '
      + 'Olofsborg hyötyäkseen siitä sekasorrosta, joka seurasi Iivana III:n Novgorodin '
      + 'valloituksesta, ja paikka valittiin Savosta niin että se veisi rajaa Pähkinäsaaren '
      + 'rauhan venäläiselle puolelle. Se oli ensimmäinen ruotsalainen linna, jonka paksut '
      + 'pyöreät tornit oli suunniteltu kestämään tykkitulta, eikä järvien verkko sen '
      + 'ympärillä ollut sattumaa: vesistöt hidastaisivat hyökkääjää. Linnaa ei koskaan '
      + 'vallattu väkisin, ja vuodesta 1912 sen piha on ollut Savonlinnan oopperajuhlien '
      + 'näyttämö.',
    lahde: 'en-Wikipedia "Olavinlinna", johdanto-osa sekä osiot "History" ja "Warfare" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'turunlinna',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fin-kohde-turunlinna-1f7e32294ce6.jpg',
      lyhyt: 'Turun linnan päälinnan kivijulkisivu ja torni.',
      selite: 'Turun linnan päälinnan kivijulkisivu ja torni nykyisessä asussaan.',
      lahde: 'Valokuva: Christian David, CC BY-SA 4.0.',
      tekija: 'Christian David',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Turku_Castle,_Turku,_Finland.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    nimi: 'Turun linna',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä Österland oli?',
      'Kuka oli Juhana-herttua?',
    ],
    korostukset: ['Österland|Österlandin'],
    nappi: 'Suomen suurin keskiaikainen rakennus',
    // 22.2286 E / 60.4353 N — en-Wikipedia "Turku Castle"
    laudat: {
      maailmankartta: { x: 6574.3, y: 904 },
    },
    teksti: 'Turun linna seisoo Aurajoen rannalla, ja se on tuomiokirkon ohella Suomen '
      + 'vanhimpia yhä käytössä olevia rakennuksia sekä maan suurin säilynyt keskiaikainen '
      + 'rakennus. Rakentaminen alkoi noin vuonna 1280, kun alueelle sijoittuneet ruotsalaiset '
      + 'pystyttivät sinne sotilaslinnoituksen ja etuvartion. Linna oli Österlandin — sen '
      + 'alueen, jota nykyään kutsutaan Suomeksi — puolustusrakennus ja hallintokeskus, ja se '
      + 'joutui mukaan Ruotsin ja Kalmarin unionin valtataisteluihin ja kesti piirityksiä. '
      + 'Huippunsa se koki 1500-luvun puolivälissä Juhana-herttuan ja Katarina Jagellonican '
      + 'aikana, jolloin päälinnaa laajennettiin tuntuvasti; hallintokeskuksen aseman se '
      + 'menetti 1600-luvulla Pietari Brahen kenraalikuvernöörikauden jälkeen. Nykyään se on '
      + 'Suomen suosituin museo, ja kävijöitä on hyvin yli satatuhatta vuodessa.',
    lahde: 'en-Wikipedia "Turku Castle", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'vanharauma',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fin-kohde-vanharauma-86034079b44e.jpg',
      lyhyt: 'Vanhan Rauman puutaloja keskiaikaisella katuverkolla.',
      selite: 'Vanhan Rauman puutalot seuraavat keskiaikaista katuverkkoa, vaikka nykyinen rakennuskanta on pääosin 1700-luvulta ja myöhemmältä ajalta.',
      lahde: 'Matkakirjan havainnekuva',
      tekija: 'OpenAI, Matkakirjan toimituksen ohjaama havainnekuva',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Wanhaa_Raumaa_Old_Rauma.JPG',
      lisenssi: 'Matkakirjan oma havainnekuva',
    },
    nimi: 'Vanha Rauma',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi vanhimmat talot ovat vasta 1700-luvulta?',
      'Mikä Pyhän Ristin kirkko on?',
    ],
    korostukset: ['kaavarunko|kaavarunko'],
    nappi: 'Puukaupunki keskiaikaisella katuverkolla',
    // 21.5 E / 61.1333 N — en-Wikipedia "Rauma, Finland" (artikkelilla "Old Rauma" ei ole
    // koordinaattia; piste on kaupungin keskusta, jota Vanha Rauma on)
    laudat: {
      maailmankartta: { x: 6550, y: 868.7 },
    },
    teksti: 'Vanha Rauma on Rauman puinen keskusta, ja se otettiin maailmanperintöluetteloon '
      + 'vuonna 1991 puuarkkitehtuurinsa ja säilyneen keskiaikaisen kaupunkirakenteensa '
      + 'takia. Alue on noin 0,3 neliökilometriä, siinä on noin kuusisataa rakennusta ja '
      + 'siellä asuu noin 800 ihmistä. Vanhimmat talot ovat 1700-luvulta, sillä vuosien 1640 '
      + 'ja 1682 tulipalot tuhosivat suuren osan kaupungista — kaavarunko sen sijaan on yhä '
      + 'suurelta osin keskiaikainen. Asuintalot ovat pääkatujen varsilla ja aitat ja vajat '
      + 'kapeilla kujilla, ja lähes kaikki rakennukset ovat yksikerroksisia. Keskiajalta '
      + 'säilyi fransiskaanien luostarikirkko, vuonna 1512 vihitty Pyhän Ristin kirkko, jonka '
      + 'seinillä on keskiaikaisia maalauksia.',
    lahde: 'en-Wikipedia "Old Rauma", koko artikkeli; koordinaatti en-Wikipedia "Rauma, '
      + 'Finland" (tarkistettu 6.9.2026).',
  },
  {
    id: 'verla',
    nimi: 'Verla',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mitä puuhiomo tekee?',
      'Milloin tehdas lopetti?',
    ],
    korostukset: ['puuhiomo|puuhiomo'],
    nappi: 'Tehdas, joka jäi seisomaan paikoilleen',
    // 26.6408 E / 61.0619 N — en-Wikipedia "Verla"
    laudat: {
      maailmankartta: { x: 6721.4, y: 872.4 },
    },
    teksti: 'Verla on hyvin säilynyt 1800-luvun tehdaskylä Jaalassa Kouvolassa Kymijoen '
      + 'pohjoishaaran varrella. Puuhiomo, viereiset voimalaitokset ja asuintalot otettiin '
      + 'maailmanperintöluetteloon vuonna 1996 todisteena 1800-luvun puunjalostuksesta ja '
      + 'sen työläisten elämästä. Ensimmäisen hiomon perusti Hugo Neuman vuonna 1872, se paloi '
      + '1876, ja vuonna 1882 Gottlieb Kreidl ja Louis Haenel perustivat isomman hiomo- ja '
      + 'pahvitehtaan, joka kävi 18. heinäkuuta 1964 asti — siihen päivään, jona viimeinen '
      + 'vanhoista työntekijöistä jäi eläkkeelle. Koneet jätettiin paikoilleen, ja tehtaasta '
      + 'tuli pahvinvalmistuksen museo vuonna 1972; opastettu kierros seuraa työvaiheita '
      + 'puun sahauksesta massaan, kuivaukseen, lajitteluun ja pakkaukseen. Joen itärannalta '
      + 'on löytynyt myös noin kuusituhatta vuotta vanhoja kalliomaalauksia, joissa on '
      + 'hirviä, ihmisiä ja kuvioita.',
    lahde: 'en-Wikipedia "Verla", johdanto-osa sekä osiot "Description", "History" ja '
      + '"Museum" (tarkistettu 6.9.2026).',
  },
  {
    id: 'petajavedenvanhakirkko',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fin-kohde-petajavedenvanhakirkko-eb06c20d1502.jpg',
      lyhyt: 'Petäjäveden vanhan kirkon paanukatto ja hirsiseinät.',
      selite: 'Nykyisessä Petäjäveden vanhassa kirkossa näkyvät jyrkkä paanukatto, tummuneet hirsiseinät ja pitkät moniruutuiset ikkunat.',
      lahde: 'Valokuva: Tiia Monto, CC BY-SA 3.0.',
      tekija: 'Tiia Monto',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pet%C3%A4j%C3%A4vesi_Old_Church_11.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    nimi: 'Petäjäveden vanha kirkko',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka rakensi Petäjäveden vanhan kirkon?',
      'Miksi kirkko jäi tyhjilleen?',
    ],
    korostukset: ['ristikirkko|ristikirkon'],
    nappi: 'Salvottu kirkko, joka ehti unohtua',
    // 25.1833 E / 62.25 N — en-Wikipedia "Petäjävesi Old Church"
    laudat: {
      maailmankartta: { x: 6672.8, y: 811.6 },
    },
    teksti: 'Petäjäveden vanha kirkko on hirsikirkko, joka rakennettiin vuosina 1763–1765, '
      + 'kun Häme kuului vielä Ruotsiin; kellotapuli tuli vuonna 1821. Se otettiin '
      + 'maailmanperintöluetteloon vuonna 1994 pohjoismaisen puukirkkoarkkitehtuurin '
      + 'todistuskappaleena. Kirkon suunnitteli ja rakensi vesankalainen kirkonrakentaja '
      + 'Jaakko Klemetinpoika Leppänen, ja tapulin lisäsi hänen pojanpoikansa Erkki Leppänen. '
      + 'Ristikirkon tasavartinen pohjakaava oli 1700-luvun maaseutukirkkojen tavallinen '
      + 'muoto, mutta korkea katto muistuttaa vanhempaa goottilaista tapaa ja kahdeksankulmainen '
      + 'kattoholvi juontuu renessanssin oculuksesta; saarnastuoli, penkit, parvet ja kruunut '
      + 'ovat paikallisten käsityöläisten männystä veistämiä. Kirkko jäi pois käytöstä 1879 '
      + 'uuden kirkon valmistuttua ja seisoi pitkään hylättynä, kunnes puolalais-itävaltalainen '
      + 'taidehistorioitsija Josef Strzygowski huomasi sen arvon 1920-luvulla.',
    lahde: 'en-Wikipedia "Petäjävesi Old Church", johdanto-osa sekä osiot "History and '
      + 'Construction", "Architecture" ja "From forgotten to world heritage" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'sammallahdenmaki',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fin-kohde-sammallahdenmaki-c35cb84efe24.jpg',
      lyhyt: 'Sammallahdenmäen pronssikautisia graniittiröykkiöitä.',
      selite: 'Sammallahdenmäen 33 graniittiröykkiötä kertovat länsisuomalaisesta pronssikauden hautausperinteestä.',
      lahde: 'Matkakirjan havainnekuva',
      tekija: 'OpenAI, Matkakirjan toimituksen ohjaama havainnekuva',
      lahdeUrl: 'https://www.museovirasto.fi/en/about-us/international-activities/world-heritage-in-finland',
      lisenssi: 'Matkakirjan oma havainnekuva',
    },
    nimi: 'Sammallahdenmäki',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä hiidenkiuas on?',
      'Miksi meri ei enää näy mäeltä?',
    ],
    korostukset: ['maankohoaminen|maankohoaminen'],
    nappi: 'Pronssikauden hautaröykkiöt harjulla',
    // 21.7775 E / 61.1206 N — en-Wikipedia "Sammallahdenmäki"
    laudat: {
      maailmankartta: { x: 6559.3, y: 869.4 },
    },
    teksti: 'Sammallahdenmäki on pronssikautinen hautapaikka Raumalla Satakunnassa: harjanteen '
      + 'laella on 33 graniittista hautaröykkiötä, jotka on ladottu 1500–500 eaa. Se on yksi '
      + 'Fennoskandian suurimmista ja täydellisimmistä pronssikautisista kohteista, ja se '
      + 'merkittiin maailmanperintöluetteloon vuonna 1999. Röykkiöistä 28 on varhaiselta '
      + 'pronssikaudelta ja loput varhaiselta rautakaudelta, ja joukossa on kaksi '
      + 'poikkeuksellista: Huilun pitkä raunio muinaisine kivimuureineen ja Kirkonlaattia, '
      + 'tasakattoinen 16 × 19 metrin suorakaide, jonka kaltaista ei tunneta muualta '
      + 'Skandinaviasta. Röykkiöt ladottiin alun perin niin, että niiltä avautui näkymä '
      + 'merelle Pohjanlahdelle, mutta maankohoaminen on vienyt meren näkyvistä. Ne saattavat '
      + 'liittyä auringonpalvontaan, joka levisi Skandinaviaan pronssikaudella, ja ne '
      + 'kertovat sukuyhteisön maanomistuksesta — asiasta, joka tuli maanviljelyn mukana.',
    lahde: 'en-Wikipedia "Sammallahdenmäki", johdanto-osa sekä osiot "Description" ja '
      + '"Discovery and Excavation" (tarkistettu 6.9.2026).',
  },
  {
    id: 'kerimaenkirkko',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fin-kohde-kerimaenkirkko-9da7b658baa0.jpg',
      lyhyt: 'Kerimäen suuri puukirkko ja erillinen kellotapuli nykyisessä kirkkopuistossa.',
      selite: 'Kerimäen suuresta puukirkosta ja sen erillisestä kellotapulista nykyisessä kirkkopuistossa.',
      lahde: 'Matkakirjan havainnekuva — lähdeperusteinen johdannainen',
      tekija: 'OpenAI; referenssikuva Teuvo Salmenjoki',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kerim%C3%A4en_kirkko_ja_keppotapuli.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fin-kohde-kerimaenkirkko-31cc93674675.jpg',
      lyhyt: 'Kerimäen puukirkon keltainen julkisivu kellotornista nähtynä.',
      selite: 'Kerimäen puukirkon keltainen julkisivu kellotornista nähtynä.',
      lahde: 'Valokuva: MKFI, Wikimedia Commons (Public domain (PD-self)).',
      tekija: 'MKFI',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kerim%C3%A4en_kirkko_kellotornista_2.JPG',
      lisenssi: 'Public domain (PD-self)',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/File:Kerim%C3%A4en_kirkko_kellotornista_2.JPG',
    }],
    nimi: 'Kerimäen kirkko',
    tyyppi: 'sana',
    kysymykset: [
      'Kuinka moni kirkkoon mahtuu?',
      'Pitääkö tarina mittavirheestä paikkansa?',
    ],
    korostukset: ['tuuma|tuumiksi'],
    nappi: 'Maailman suurin puukirkko',
    // 29.285 E / 61.9128 N — en-Wikipedia "Kerimäki Church"
    laudat: {
      maailmankartta: { x: 6809.5, y: 829 },
    },
    teksti: 'Kerimäen kirkko Savonlinnan Kerimäellä on maailman suurin puukirkko. Sen '
      + 'suunnitteli Anders Fredrik Granstedt, ja se rakennettiin vuosina 1844–1847: pituutta '
      + '45 metriä, leveyttä 42, korkeutta 37 ja istumapaikkoja yli 3 000 — väkeä kirkkoon '
      + 'mahtuu kerralla 5 000. Sitkeän huhun mukaan koko johtuu laskuvirheestä: arkkitehdin '
      + 'senttimetrit olisi luettu tuumiksi, jotka ovat 2,54 kertaa suurempia. Myöhemmät '
      + 'tutkimukset ovat kuitenkin osoittaneet, että kirkko oli tarkoituskin rakentaa juuri '
      + 'näin isoksi, jotta puolet seudun väestä mahtuisi sinne yhtä aikaa. Talvella '
      + 'jumalanpalvelukset pidetään pienemmässä talvikirkossa, sillä pääkirkossa ei ole '
      + 'lämmitystä.',
    lahde: 'en-Wikipedia "Kerimäki Church", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'bomarsund',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fin-kohde-bomarsund-04e06ac99dc8.jpg',
      lyhyt: 'Bomarsundin punagraniittista rauniomuuria Ahvenanmaan Sundissa.',
      selite: 'Bomarsundin matala punagraniittinen rauniomuuri seisoo syksyisellä linnoitusalueella Ahvenanmaalla.',
      lahde: 'Matkakirjan havainnekuva — lähdeperusteinen johdannainen',
      tekija: 'OpenAI; paikkareferenssi PatríciaR',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:BomarsundFortress01.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fin-kohde-bomarsund-300bf713e1f9.jpg',
      lyhyt: 'Bomarsundin punagraniittista rauniomuuria Ahvenanmaan Sundissa.',
      selite: 'Bomarsundin linnoituksen punagraniittinen rauniomuuri on säilynyt Ahvenanmaan Sundissa.',
      lahde: 'Valokuva: PatríciaR, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'PatríciaR',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:BomarsundFortress01.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    }],
    nimi: 'Bomarsund',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä Ahvenanmaan sota oli?',
      'Kuka sai ensimmäisen Victoria Crossin?',
    ],
    korostukset: ['Victoria Cross|Victoria Crossin'],
    nappi: 'Krimin sota tuli Ahvenanmaalle',
    // 20.2384 E / 60.2122 N — en-Wikipedia "Battle of Bomarsund"
    laudat: {
      maailmankartta: { x: 6507.9, y: 915.1 },
    },
    teksti: 'Bomarsund on Ahvenanmaan Sundissa sijaitseva linnoitus, jonka rakentamisen Venäjä '
      + 'aloitti vuonna 1832. Elokuussa 1854 siellä käytiin Krimin sotaan kuuluneen '
      + 'Ahvenanmaan sodan ainoa suuri taistelu: englantilais-ranskalainen retkikunta piiritti, '
      + 'valtasi ja lopuksi hävitti linnoituksen. Linnoitus oli kesken — suunnitelluista '
      + 'kahdestatoista aputornista oli valmiina kaksi — ja sen suunnittelijat olivat '
      + 'olettaneet, etteivät suuret sota-alukset pääsisi lähistön kapeista salmista; '
      + 'höyrylaivojen aikaan oletus ei enää pitänyt. Ensimmäinen yhteenotto 21. kesäkuuta '
      + '1854 jäi ratkaisemattomaksi tykistökaksintaisteluksi, ja juuri siinä Charles Davis '
      + 'Lucas heitti kannelle pudonneen kranaatin mereen ja sai ensimmäisenä ihmisenä '
      + 'Victoria Crossin. Heinäkuun lopulla linnoituksen ympärillä oli 25 brittialusta, ja '
      + '8. elokuuta maihin nousi etelään 7 000 ranskalaista sotilasta sekä pohjoiseen loput '
      + '2 000 ranskalaista ja 900 brittiläistä merisotilasta.',
    lahde: 'en-Wikipedia "Battle of Bomarsund", johdanto-osa sekä osiot "Background", "First '
      + 'battle" ja "Second battle" (tarkistettu 6.9.2026).',
  },
  /* ================================================================
   * NOSTOERÄ 11.9.2026 — KUUSI KOHDETTA LISÄÄ.
   *
   * Omistaja 11.9.2026 (sanatarkasti): *"Suomesta puuttuu lisäksi myös
   * nostoja, niitä on siis liian vähän. Agentit voisivat tarkastaa myös
   * muut Euroopan maat että kaikissa tarpeeksi nostoja."*
   * Päätoimittajan tavoite: jokaisessa Euroopan maassa vähintään 20
   * pääkartan nostoa. Suomi oli neljäntoista merkin varassa.
   *
   * PAIKAT MITATTIIN KOLMEEN PELIKAUPUNKIIN (Helsinki, Tampere,
   * Rovaniemi). Lähin uusi merkki on Hämeen linna 29 lautayksikön
   * päässä Helsingistä — reilusti yli kaupunkikaton säteen
   * (KAUPUNGIN_KOHDALLA_SADE 7, KAUPUNKIKATON_SADE 8,
   * js/fokuskohteet.js), joten kaikki kuusi ovat pääkartan merkkejä.
   *
   * JÄRVI ON TYYPPIÄ 'meri' EIKÄ 'jarvi'. Syy on koko kohdeperheen
   * sopimus, ja se on perusteltu auki js/packs/maastokohteet-gha.js:n
   * Voltajärvi-kortissa: tyyppiä 'jarvi' ei ole symbolitaulussa, ja
   * sen käyttö pudottaisi merkin symbolin nulliksi.
   *
   * KUVATON ERÄ kuten muutkin maastokohteet: kortti kantaa tekstin ja
   * lähteen. Kuvat tilataan erikseen kuvaputkelta. Faktat on
   * tarkistettu en-Wikipediasta kohde kerrallaan 11.9.2026.
   * ============================================================== */
  {
    id: 'saimaa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fin-kohde-saimaa-a116aac4f831.jpg',
      lyhyt: 'Saimaan Pihlajaveden matalia metsäisiä saaria ja niiden välisiä salmia.',
      selite: 'Saimaan Pihlajaveden matalista metsäisistä saarista ja niiden välisistä salmista.',
      lahde: 'Matkakirjan havainnekuva — lähdeperusteinen johdannainen',
      tekija: 'OpenAI; referenssikuva Freiermensch',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Saimaa.jpg',
      lisenssi: 'CC BY-SA 2.5',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.5/',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fin-kohde-saimaa-1ab486b20a35.jpg',
      lyhyt: 'Pihlajaveden selkiä ja metsäisiä saaria Kotasaaresta pohjoiseen katsottuna.',
      selite: 'Pihlajaveden selkiä ja metsäisiä saaria Kotasaaresta pohjoiseen katsottuna.',
      lahde: 'Valokuva: Freiermensch, Wikimedia Commons (CC BY-SA 2.5).',
      tekija: 'Freiermensch',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Saimaa.jpg',
      lisenssi: 'CC BY-SA 2.5',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.5/',
    }],
    nimi: 'Saimaa',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi saimaannorppa elää vain täällä?',
      'Mihin Saimaan vedet laskevat?',
    ],
    korostukset: ['saimaannorppa|saimaannorppa'],
    nappi: 'Suomen suurin järvi',
    // 28.15 E / 61.35 N — Haukiveden ja Pihlajaveden seutu; en-Wikipedia
    // "Saimaa" ei anna järvelle yhtä keskipistettä, joten piste on
    // valittu järvialtaan keskeltä Savonlinnan luoteispuolelta.
    laudat: {
      maailmankartta: { x: 6771.7, y: 857.7 },
    },
    teksti: 'Saimaa on noin 4 279 neliökilometrin järvi Kaakkois-Suomessa: maan suurin ja '
      + 'Euroopan neljänneksi suurin luonnollinen makean veden järvi. Se syntyi jääkauden '
      + 'sulamisvesistä, ja noin kuusituhatta vuotta sitten muinainen Saimaa — silloin lähes '
      + '9 000 neliökilometriä — purkautui äkillisesti uudesta lasku-uomasta ja jätti '
      + 'jälkeensä tuhansia neliökilometrejä uutta soistuvaa maata. Nykyään vedet lähtevät '
      + 'Vuoksea myöten Laatokkaan. Järvi on saarten ja kapeiden salmien sokkelo, jonka jokainen '
      + 'osa on oma vetensä: Orivesi, Puruvesi, Haukivesi, Yövesi, Pihlajavesi, Pyhäselkä. '
      + 'Ulkoministeriön englanninkielisen esittelyn mukaan alueella on 14 000 saarta ja '
      + 'enemmän rantaviivaa pinta-alaa kohti kuin missään muualla maailmassa, yhteensä lähes '
      + '15 000 kilometriä. Rannoilla ovat Lappeenranta, Imatra, Savonlinna, Mikkeli, Varkaus ja '
      + 'Joensuu. Järvessä elää kaksi lajia, joita ei ole missään muualla: uhanalainen '
      + 'saimaannorppa ja saimaanlohi.',
    lahde: 'en-Wikipedia "Saimaa", johdanto-osa sekä osiot "History", "Topography" ja '
      + '"Natural resources" (tarkistettu 11.9.2026).',
  },
  {
    id: 'koli',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fin-kohde-koli-3b9c0577c279.jpg',
      lyhyt: 'Ukko-Kolilta avautuva Pielisen järvi- ja saarimaisema.',
      selite: 'Ukko-Kolilta itään avautuvasta Pielisen järvi- ja saarimaisemasta.',
      lahde: 'Matkakirjan havainnekuva — lähdeperusteinen johdannainen',
      tekija: 'OpenAI; referenssikuva Arto J',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lieksa_-_Ukko-Koli_-_View_of_Pielinen_lake_-_panoramio.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fin-kohde-koli-1a08b6e8ddc4.jpg',
      lyhyt: 'Näkymä Ukko-Kolilta itään Pieliselle ja sen pitkille metsäisille saarille.',
      selite: 'Näkymä Ukko-Kolilta itään Pieliselle ja sen pitkille metsäisille saarille.',
      lahde: 'Valokuva: Arto J, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Arto J',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lieksa_-_Ukko-Koli_-_View_of_Pielinen_lake_-_panoramio.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    }],
    nimi: 'Koli',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuka maalasi Kolin kuuluisaksi?',
      'Mitä Ukko-Kolilta näkyy?',
    ],
    korostukset: ['kaskiviljely|kaskiviljelyyn'],
    nappi: 'Kansallismaisema Pielisen rannalla',
    // 29.79 E / 63.1 N — en-Wikipedia "Koli National Park"
    laudat: {
      maailmankartta: { x: 6826.3, y: 767.4 },
    },
    teksti: 'Koli on metsäisten vaarojen jono Pielisen länsirannalla Pohjois-Karjalassa. '
      + 'Huipun nimi on Ukko-Koli, ja siltä avautuu itään laaja näkymä järvelle. Paikka oli '
      + 'aikanaan pakanallinen uhripaikka ja myöhemmin kaskiviljelyyn raivattua maata; '
      + 'kansallispuiston kolmestakymmenestä neliökilometristä osa pidetään yhä avoimena '
      + 'niittämällä ja laiduntamalla suomalaisilla lehmä- ja lammasroduilla, koska '
      + 'perinnemaiseman kasvillisuus katoaisi muuten. Maalarit löysivät Kolin 1800-luvulla, ja '
      + 'sitä on sen jälkeen kutsuttu yhdeksi Suomen komeimmista luonnonnäkymistä: Jean '
      + 'Sibelius, Juhani Aho ja Eero Järnefelt hakivat siitä aiheensa, ja Järnefeltin vuonna '
      + '1911 A. W. Finchin ja Ilmari Aallon kanssa maalaama suuri maisema roikkuu Helsingin '
      + 'rautatieaseman ravintolassa. Vaarojen kyljissä on myös luolia, joista tunnetuin on '
      + '34 metriä pitkä Pirunkirkko.',
    lahde: 'en-Wikipedia "Koli National Park", johdanto-osa ja osio "Attractions" '
      + '(tarkistettu 11.9.2026).',
  },
  {
    id: 'saimaankanava',
    nimi: 'Saimaan kanava',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kuinka korkealle kanava nostaa laivan?',
      'Mihin kaupunkiin kanava aikanaan päättyi?',
    ],
    korostukset: ['sulku|sulkua'],
    nappi: 'Kahdeksan sulkua Saimaalta merelle',
    // 28.2733 E / 61.0786 N — kanavan pohjoispää Lauritsalassa
    // Lappeenrannassa; en-Wikipedia "Saimaa Canal", osio "Topography"
    laudat: {
      maailmankartta: { x: 6775.8, y: 871.5 },
    },
    teksti: 'Kun isoisäsi matkusti, kanava oli uusi: se rakennettiin vuosina 1845–1856 ja '
      + 'avattiin 7. syyskuuta 1856. Väylä yhdistää Saimaan Suomenlahteen Viipurin kohdalla, ja '
      + 'sen pohjoispää on Lauritsalassa Lappeenrannassa. Pituutta on 42,9 kilometriä. Matkalla '
      + 'on kahdeksan sulkua, jotka nostavat laivan merenpinnasta Saimaan tasolle 75,7 metriä; '
      + 'korkein yksittäinen nosto on Mälkiän 12,4 metriä. Kanava oli avain koko sisämaahan: '
      + 'sen kautta pääsee Suomen järvialueen 120 toisiinsa liittyvään järveen, ja Saimaan '
      + 'syväväyliä on 814 kilometriä aina Kuopioon asti. Talvisin kanava on kiinni. Se '
      + 'peruskorjattiin ja levennettiin vuosina 1963–1968, ja nykyinen "saimax"-mitta sallii '
      + 'enintään 82,5 metriä pitkän ja 12,6 metriä leveän aluksen.',
    lahde: 'en-Wikipedia "Saimaa Canal", johdanto-osa sekä osiot "Topography", "Dimensions", '
      + '"Locks" ja "History" (tarkistettu 11.9.2026).',
  },
  {
    id: 'hameenlinna',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fin-kohde-hameenlinna-902715e493f7.jpg',
      lyhyt: 'Hämeen linnan punatiilinen keskiosa ja harmaakiviset muurit Linnansalmen rannalla.',
      selite: 'Hämeen linnan punatiilinen päärakennus ja harmaakiviset puolustusmuurit näkyvät Linnansalmen yli.',
      lahde: 'Matkakirjan havainnekuva — lähdeperusteinen johdannainen',
      tekija: 'OpenAI; paikkareferenssi Kanta-Hämeen kuvapankki',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hame_Castle_2019-08.jpg',
      lisenssi: 'CC0 1.0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/fin-kohde-hameenlinna-0fd4b80439c0.jpg',
      lyhyt: 'Hämeen linnan punatiilinen keskiosa ja harmaakiviset muurit Linnansalmen rannalla.',
      selite: 'Hämeen linnan punatiilinen keskiosa ja harmaakiviset muurit kohoavat Linnansalmen rannalla.',
      lahde: 'Valokuva: Kanta-Hämeen kuvapankki; crop/rotation/color/sharpening Máel Milscothach, Wikimedia Commons (CC0 1.0).',
      tekija: 'Kanta-Hämeen kuvapankki; crop/rotation/color/sharpening Máel Milscothach',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hame_Castle_2019-08.jpg',
      lisenssi: 'CC0 1.0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    }],
    nimi: 'Hämeen linna',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi linnan ikä on kiistanalainen?',
      'Mitä linnassa tehtiin 1800-luvulla?',
    ],
    korostukset: ['vankila|vankila'],
    nappi: 'Linna, josta tehtiin vankila',
    // 24.4573 E / 61.0 N — en-Wikipedia "Häme Castle"
    laudat: {
      maailmankartta: { x: 6648.6, y: 875.5 },
    },
    teksti: 'Hämeen linna seisoo Hämeenlinnassa Vanajaveden rannalla — alun perin saarella, '
      + 'nykyään rannalla. Siinä on keskustorni ja sitä kiertävä muuri vallihautoineen; '
      + 'tornissa oli alkujaan viisi tornia, joista kaksi erottuu yhä, ja muurissa on '
      + 'porttirakennus, kahdeksankulmainen tiilitorni ja pyöreä tykkitorni. Alaosat ovat '
      + 'harmaakiveä, yläosat punatiiltä. Ikä on kiistanalainen: perinne liittää linnan Birger '
      + 'jaarlin toiseen ristiretkeen ja siis 1200-luvun puoliväliin, mutta kaivauksista ei ole '
      + 'löytynyt mitään, joka varmasti olisi 1320-lukua vanhempaa, eikä vuoden 1308 '
      + 'kuninkaallinen asiakirja tunne Hämeestä kuin yhden linnan. Foggin matkan aikaan linna '
      + 'ei ollut linna lainkaan: Suomen sodan jälkeen siitä tehtiin vankila, ja vankilana se '
      + 'oli vuoteen 1953. Museo siitä tuli vasta 1979.',
    lahde: 'en-Wikipedia "Häme Castle", johdanto-osa ja osio "History" (tarkistettu 11.9.2026).',
  },
  {
    id: 'ruotsinsalmi',
    nimi: 'Ruotsinsalmi',
    tyyppi: 'merenkulku',
    kysymykset: [
      'Kuinka suuri taistelu Ruotsinsalmi oli?',
      'Minkä sodan taistelu lopetti?',
    ],
    korostukset: ['Kotka|Kotkan'],
    nappi: 'Itämeren suurin meritaistelu',
    // 26.95 E / 60.4667 N — salmi nykyisen Kotkan edustalla;
    // en-Wikipedia "Battle of Svensksund"
    laudat: {
      maailmankartta: { x: 6731.7, y: 902.4 },
    },
    teksti: 'Suomenlahdella nykyisen Kotkan edustalla käytiin 9. ja 10. heinäkuuta 1790 '
      + 'toinen Ruotsinsalmen taistelu. Ruotsin merivoimat löivät Venäjän laivaston niin '
      + 'perusteellisesti, että se lopetti vuosien 1788–1790 Venäjän ja Ruotsin välisen sodan. '
      + 'Taistelu on Ruotsin suurin merivoitto ja suurin meritaistelu, joka Itämerellä on '
      + 'koskaan käyty; alusten lukumäärällä mitattuna se kuuluu koko maailmanhistorian '
      + 'suurimpien meritaistelujen joukkoon. Isoisäsi aikaan taistelusta oli kulunut '
      + 'runsaat kahdeksankymmentä vuotta, ja Kotkan edustan salmi oli yhä merenkulkijoiden '
      + 'muistissa.',
    lahde: 'en-Wikipedia "Battle of Svensksund", johdanto-osa (tarkistettu 11.9.2026).',
  },
  {
    id: 'kultala',
    nimi: 'Kultala',
    tyyppi: 'kauppa',
    kysymykset: [
      'Mistä Lapin kulta löytyi ensimmäisenä?',
      'Kuka sai luvan huuhtoa kultaa?',
    ],
    korostukset: ['kruununasema|kruununasema'],
    nappi: 'Lapin kultaryntäys 1870',
    // 26.6 E / 68.4 N — Ivalojoen ja Sotajoen yhtymäkohdan seutu
    // Inarissa; en-Wikipedia "Lapland Gold Rush", osio "The rush"
    laudat: {
      maailmankartta: { x: 6720.0, y: 476.2 },
    },
    teksti: 'Tämä on uutinen, joka on juuri nyt tuore. Norjalainen geologi Tellef Dahll löysi '
      + '1860-luvulla kultaa Tenojoesta ja huomasi lupaavimpien paikkojen olevan Suomen '
      + 'puolella. Suomi näki nälkää, ja vuorihallitus lähetti 1868 insinööri Conrad Lihrin '
      + 'johtaman retkikunnan pohjoiseen; syyskuussa se löysi kultaa Ivalojoesta Inarista. '
      + 'Aleksanteri II vahvisti huhtikuussa 1870 lain, joka luopui hallitsijan yksinoikeudesta '
      + 'jalometalleihin ja avasi huuhdonnan jokaiselle "kunnolliselle" suuriruhtinaskunnan ja '
      + 'Venäjän keisarikunnan miehelle. Saman kevään ja kesän aikana noin viisisataa '
      + 'kullankaivajaa hiihti, käveli ja souti satoja kilometrejä Ivalojoen ja Sotajoen '
      + 'yhtymäkohtaan. Sinne perustettiin Kultalan kruununasema, jossa viranomaiset '
      + 'myönsivät valtaukset ja ostivat kullan; asemalla oli myös järjestyksenvalvojat ja '
      + 'kartoittajat. Ryntäys kesti vain muutaman vuoden.',
    lahde: 'en-Wikipedia "Lapland Gold Rush", johdanto-osa sekä osiot "Background" ja '
      + '"The rush" (tarkistettu 11.9.2026).',
  },
];

