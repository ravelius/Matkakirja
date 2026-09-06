/*
 * MAASTOKOHTEET — CYP. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs CYP --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/CYP.json. Työkalu laskee laudan
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
 * Kyproksen maastokohteet. Faktat en-Wikipediasta 30.8.2026. Välimerta EI oteta tähän: se on jo ESP:n ja TUR:n listoilla, ja saaren oma tarina kerrotaan vuoren ja saaren pisimmän joen kautta.
 *
 * ── MAAILMAN ERÄ M6, LÄHI-ITÄ (6.9.2026) ───────────────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Kyproksella oli kaksi karttamerkkiä eikä yhtään kohdetta. Tämä erä
 * tuo seitsemän KOHDETTA ja yhden MAASTOKOHTEEN (Levantinmeri) samalla
 * mallilla kuin erät M1–M4. Koordinaatit on laskettu koneella
 * (`import { laudat } from tools/johda-maastokohteet.mjs`, lon/lat
 * en-Wikipedian coordinates-propista), tekstit kirjoitettu käsin
 * raakatekstistä. Kuvaton erä, vain maailmankartan rivi.
 *
 * MAA ON PIENI, JA SE MÄÄRÄSI MÄÄRÄN. Kyproksen fokuslehden rajaus on
 * 100,9 × 66,5 lautayksikköä (js/packs/fokus-grc.js FOKUS_POHJAT.CYP),
 * ja Nikosia istuu keskellä. Kahdeksan kohteen kiintiö ei mahdu:
 * `node tools/tarkista-nimiolimitys.mjs` on mitta, ja seitsemän
 * kohdetta on se määrä, jolla jokainen nimiö pysyy näkyvissä eikä
 * yksikään mene toisen päälle. Etäisyys mitattiin jokaiseen
 * js/packs/maailmankartta.js CITIES-kaupunkiin; lähin uusi merkki on
 * Asinoun kirkko 13,0 lautayksikön päässä Nikosiasta eli selvästi yli
 * KAUPUNGIN_KOHDALLA_SADE-rajan (7) ja kaupunkikaton säteen (8).
 *
 * NELJÄ EHDOKASTA KARSIUTUI PAIKAN TAKIA. Salamis ja Famagusta ovat
 * käytännössä Pediaíos-merkin päällä (0,6–1,5 yksikköä), Kolossin linna
 * on kahden yksikön päässä Kourionista ja Larnakan suolajärvi jäisi
 * Cesnola-skandaalin nimiön alle. Kolmanneksi maastokohteeksi valittiin
 * siksi Levantinmeri, joka mahtuu saaren eteläpuolelle lehden
 * rajaukseen. Nimi ei ole laudan omassa nimitaulussa
 * (js/packs/maailmankartta-nimet.js), joten sääntö N3 pitää.
 *
 * VARTIO 7a. tools/savukkeet/savuke-maastokohteet.mjs vaatii, että
 * jokainen kohde osuu maan fokuslehden rajaukseen (`osuuLehteen`);
 * Kyproksella rajaus on olemassa, joten vartio pätee ja jokainen piste
 * on tarkistettu sitä vasten. Vartiota ei ole muutettu.
 */
export const MAASTOKOHTEET_CYP = [
  {
    id: 'olympos',
    nimi: 'Ólympos',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuoren toinen nimi on Chionistra?',
      'Mikä Troodosin vuoristo on?',
    ],
    korostukset: ['Troodos|Troodosin'],
    nappi: 'Kyproksen katto, toiselta nimeltään Luminen',
    // 32.8633 E / 34.9364 N — en-Wikipedia "Mount Olympus (Cyprus)"
    laudat: {
      maailmankartta: { x: 6928.8, y: 1997.8 },
      europe: { x: 842.2, y: 974.8 },
    },
    teksti: 'Ólympos on Kyproksen korkein kohta, 1 952 metriä, Troodosin vuoriston keskellä. '
      + 'Kreikkalainen kansannimi Chionistra tarkoittaa lumista — ja nimi pitää paikkansa, '
      + 'sillä Välimeren saareksi huippu saa talvisin kunnon lumipeitteen. Vuori on syntynyt '
      + 'merenpohjan syvyyksistä: sen kivi on Troodosin ofioliitin serpentiiniytynyttä '
      + 'vaippakiveä, jota tutkitaan ympäri maailmaa.',
    lahde: 'en-Wikipedia "Mount Olympus (Cyprus)", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'pediaios',
    nimi: 'Pediaíos',
    tyyppi: 'joki',
    kysymykset: [
      'Minkä kaupungin läpi joki virtaa?',
      'Missä muinainen Salamis sijaitsi?',
    ],
    korostukset: ['Nikosia|Nikosian'],
    nappi: 'Saaren pisin joki, pääkaupungin halki',
    // 33.9167 E / 35.1667 N — en-Wikipedia "Pedieos" — joen alajuoksu Mesaorian tasangolla
    laudat: {
      maailmankartta: { x: 6963.9, y: 1989.1 },
      europe: { x: 862.4, y: 968.7 },
    },
    teksti: 'Pediaíos on Kyproksen pisin joki, 98 kilometriä. Se saa alkunsa Troodosin vuoriston '
      + 'Machairasin metsästä, virtaa koilliseen Mesaorian tasangon poikki ja kulkee '
      + 'pääkaupunki Nikosian läpi — kaupungissa sen rantoja pitkin pääsee kävelemään lähes '
      + 'kahdenkymmenen kilometrin matkan. Mereen joki laskee Famagustanlahdella, muinaisen '
      + 'Salamiin kaupungin raunioiden vieressä.',
    lahde: 'en-Wikipedia "Pedieos", johdanto-osa (tarkistettu 30.8.2026).',
  },

  /* ================================================================
   * ERÄ M6, LÄHI-ITÄ (6.9.2026) — seitsemän kohdetta ja Levantinmeri.
   * ============================================================== */
  {
    id: 'levantinmeri',
    nimi: 'Levantinmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä on lessepsiläinen vaellus?',
      'Miten Suezin kanava muutti Välimeren eliöstöä?',
    ],
    korostukset: ['Suezin kanava|Suezin kanava'],
    nappi: 'Meri, johon muutti uusia lajeja',
    // 33.3 E / 34.4 N — ulappa Kyproksen eteläpuolella; artikkelin oma
    // alue kattaa saaren joka puolelta. Lähin kaupunki Nikosia 28,6.
    laudat: {
      maailmankartta: { x: 6943.3, y: 2018 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Levantinmeri on Välimeren itäisin osa, noin 320 000 neliökilometriä, ja Kypros on '
      + 'sen suurin saari. Syvin kohta, 4 384 metriä, on Plinius-hautavajoamassa noin '
      + 'kahdeksankymmentä kilometriä Kreetan eteläpuolella. Isoisäsi matkaa edeltävinä vuosina '
      + 'meri sai uuden oven: Suezin kanava valmistui 1869 ja yhdisti sen Punaiseenmereen. '
      + 'Vuosikymmeniä esteenä olivat Katkerat järvet, joiden suolapitoisuus oli liian korkea, '
      + 'mutta kun se tasaantui kanavan veden kanssa, este katosi ja Punaisenmeren kasvit ja '
      + 'eläimet alkoivat asuttaa itäistä Välimerta. Ilmiötä kutsutaan lessepsiläiseksi '
      + 'vaellukseksi kanavan pääinsinöörin Ferdinand de Lessepsin mukaan.',
    lahde: 'en-Wikipedia "Levantine Sea", johdanto-osa sekä osiot "Geography" ja "Ecology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'paphoksenmosaiikit',
    nimi: 'Paphoksen mosaiikit',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä Nea Paphos oli?',
      'Miksi huvilat nimettiin lattioidensa mukaan?',
    ],
    korostukset: ['Dionysoksen talo|Dionysoksen talo'],
    nappi: 'Välimeren parhaat lattiamosaiikit',
    // 32.4083 E / 34.7667 N — en-Wikipedia "Paphos"
    // Lähin pelikaupunki: Nikosia 34,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6913.6, y: 2004.2 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Nea Paphos oli Kyproksen hallinnollinen pääkaupunki Ptolemaiosten ja Rooman aikaan, '
      + 'ja sen varakkaiden huviloiden lattioista on kaivettu esiin Välimeren parhaiten '
      + 'säilyneitä mosaiikkeja. Dionysoksen talo on 200-luvulta jaa., pinta-alaltaan noin '
      + '2 000 neliömetriä, ja mosaiikit peittävät siitä neljänneksen: metsästyskohtauksia, '
      + 'Apollon ja Dafnen takaa-ajo, Ganymedes ja kotka sekä neljä vuodenaikaa. Theseuksen '
      + 'huvila sai nimensä lattiakuvasta, jossa Theseus taistelee Minotaurosta vastaan, ja '
      + 'Aionin talo löytyi vasta 1983. Kaivaukset aloitti puolalainen Kazimierz Michałowski '
      + 'kesäkuussa 1965, ja ne jatkuvat yhä; Unesco liitti Paphoksen luetteloonsa 1980.',
    lahde: 'en-Wikipedia "Paphos Archaeological Park", johdanto-osa sekä osiot "Excavations", '
      + '"Buildings" ja "House of Dionysos" (tarkistettu 6.9.2026).',
  },
  {
    id: 'palaipafos',
    nimi: 'Palaipafos',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi jumalattaresta ei ollut kuvaa?',
      'Missä Afroditen tärkein pyhäkkö oli?',
    ],
    korostukset: ['Afrodite|Afroditen'],
    nappi: 'Temppeli ilman jumalankuvaa',
    // 32.5744 E / 34.7075 N — Kouklia, en-Wikipedia "Paphos" osio "Old Paphos"
    // Lähin pelikaupunki: Nikosia 31,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6919.1, y: 2006.4 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Vanha Paphos, nykyinen Kouklia, on kukkulalla noin kaksitoista kilometriä uudesta '
      + 'kaupungista kaakkoon. Paikka on ollut asuttu neoliittiselta ajalta, ja siitä tuli '
      + 'antiikin maailman tärkein Afroditen palvontapaikka — jumalattaren myyttinen syntypaikka '
      + 'oli Kypros. Strabonin mukaan Nea Paphoksesta vanhaan kaupunkiin johtava tie täyttyi '
      + 'vuosittain pyhiinvaeltajista. Tacitus kertoo nuoren Tituksen käyneen katsomassa '
      + 'pyhäkköä ja panneen merkille oudon asian: jumalattaresta ei ollut kuvaa lainkaan, vain '
      + 'pyramidin muotoinen kivi.',
    lahde: 'en-Wikipedia "Paphos", osiot "Old Paphos" ja "New Paphos" (tarkistettu 6.9.2026).',
  },
  {
    id: 'kourion',
    nimi: 'Kourion',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä kaupungille tapahtui 300-luvulla?',
      'Miksi asutus siirtyi Episkopiin?',
    ],
    korostukset: ['akropoli|akropolin'],
    nappi: 'Viisi maanjäristystä viidessä vuodessa',
    // 32.8877 E / 34.6642 N — en-Wikipedia "Kourion"
    // Lähin pelikaupunki: Nikosia 24,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6929.6, y: 2008.1 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Kourion oli merkittävä kreikkalainen kaupunkivaltio Kyproksen lounaisrannikolla. '
      + 'Argoksesta tulleet uudisasukkaat asettuivat paikalle 1100-luvulla eaa., kun '
      + 'mykeneläiset palatsit olivat romahtaneet. Akropoli seisoo lähes sadan metrin korkuisella '
      + 'kalkkikivikielekkeellä Episkopinlahden yllä. Vuosien 365 ja 370 välillä viisi voimakasta '
      + 'maanjäristystä tuhosi kaupungin lähes kokonaan, ja se rakennettiin uudelleen vasta '
      + '400-luvun lopulla. Arabiretkikunnat hävittivät akropolin 648–649, ja asutus siirtyi '
      + 'kaksi kilometriä koilliseen Episkopiin, joka sai nimensä piispanistuimesta.',
    lahde: 'en-Wikipedia "Kourion", johdanto-osa ja historiaosion loppu (tarkistettu 6.9.2026).',
  },
  {
    id: 'khirokitia',
    nimi: 'Khirokitia',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi kylän ikä muuttui kolmella vuosituhannella?',
      'Mikä on tholos?',
    ],
    korostukset: ['tholos|tholos-rakennuksia'],
    nappi: 'Kivimuurin sisällä 7000 eaa.',
    // 33.34372 E / 34.79673 N — en-Wikipedia "Khirokitia"
    // Lähin pelikaupunki: Nikosia 13,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6944.8, y: 2003.1 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Khirokitia on neoliittinen asuinpaikka Maronijoen laaksossa kuuden kilometrin päässä '
      + 'etelärannikolta, ja se on ollut Unescon luettelossa vuodesta 1998. Porphyrios Dikaios '
      + 'löysi paikan 1934 ja arveli sen syntyneen noin 4000 eaa.; radiohiiliajoitus siirsi '
      + 'perustamisen 7000 vuoteen eaa. Kylää ympäröi kahden ja puolen metrin paksuinen '
      + 'kivimuuri, ja sen sisällä on tiiviissä ryhmissä pyöreitä tholos-rakennuksia, '
      + 'halkaisijaltaan kahdesta yhdeksään metriä. Vainajat haudattiin koukkuasennossa aivan '
      + 'lattian alle. Kylä hylättiin tuntemattomasta syystä noin 6000 eaa.',
    lahde: 'en-Wikipedia "Khirokitia", johdanto-osa sekä osiot "Discovery" ja "Archaeology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'asinounkirkko',
    nimi: 'Asinoun kirkko',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Montako Troodosin kirkkoa on maailmanperintöluettelossa?',
      'Miksi kirkoilla on jyrkät puukatot?',
    ],
    korostukset: ['Troodos|Troodosin'],
    nappi: 'Kymmenen maalattua kirkkoa vuorilla',
    // 32.9833 E / 35.0667 N — Nikitarin kylä, en-Wikipedia "Nikitari"
    // Lähin pelikaupunki: Nikosia 13,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6932.8, y: 1992.9 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Troodosin maalatut kirkot ovat kymmenen bysanttilaista kirkkoa ja luostaria, joiden '
      + 'seinät ovat täynnä bysanttilaista ja sen jälkeistä seinämaalausta. Unesco liitti niistä '
      + 'yhdeksän luetteloonsa 1985 ja kymmenennen, Palaichori Oreinisin kirkon, vasta 2001. '
      + 'Nikitarin kylässä seisova Panagia Phorviotissa eli Asinoun kirkko on 1100-luvulta. '
      + 'Joukossa on myös Kyproksen vanhin säilynyt luostarikirkko, 1000-luvun Agios Nikolaos '
      + 'tis Stegis Kakopetriassa, ja Moutoullasin 1200-luvun kappeli, jonka jyrkkä puukatto on '
      + 'lajinsa varhaisin esimerkki.',
    lahde: 'en-Wikipedia "Painted Churches in the Troodos Region", johdanto-osa ja kirkkoluettelo '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'kykkoksenluostari',
    nimi: 'Kykkoksen luostari',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi alkuperäisestä luostarista ei ole jäljellä mitään?',
      'Kuka perusti luostarin?',
    ],
    korostukset: ['Aleksios I Komnenos|Aleksios I Komnenos'],
    nappi: 'Vuoriluostari, joka on palanut monesti',
    // 32.741 E / 34.984 N — en-Wikipedia "Kykkos Monastery"
    // Lähin pelikaupunki: Nikosia 21,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6924.7, y: 1996 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Kykkoksen luostari on Kyproksen varakkaimpia, ja se seisoo 1 318 metrin korkeudessa '
      + 'Troodosin luoteisrinteellä, kaksikymmentä kilometriä Pedoulasista länteen. Bysantin '
      + 'keisari Aleksios I Komnenos perusti sen 1000-luvun lopulla. Alkuperäisestä '
      + 'rakennuksesta ei ole jäljellä mitään: luostari on palanut maan tasalle monta kertaa. '
      + 'Saaren ensimmäinen presidentti, arkkipiispa Makarios III, aloitti kirkollisen uransa '
      + 'täällä munkkina vuonna 1926.',
    lahde: 'en-Wikipedia "Kykkos Monastery", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'kapgreco',
    nimi: 'Kap Greco',
    // Niemi ei ole vuori eikä meri: tyyppi 'muu' + symboli 'luonto'
    // (sama sopimus kuin ARE:n Rub al-Khalilla).
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä oli niemen antiikinaikainen nimi?',
      'Miten merenalaiset luolat syntyvät kalkkikiveen?',
    ],
    korostukset: ['Pedalion|Pedalion'],
    nappi: 'Saaren itäisin niemi ja sen luolat',
    // 34.0611 E / 34.9633 N — en-Wikipedia "Cape Greco"
    // Lähin pelikaupunki: Nikosia 24,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6968.7, y: 1996.8 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Kap Greco on niemeke Kyproksen kaakkoisosassa, Famagustanlahden eteläpäässä Ayia '
      + 'Napan ja Protarasin välissä. Se on Kyproksen tasavallan hallitsemien alueiden itäisin '
      + 'kohta ja käytännössä myös Euroopan unionin itäisin kärki, kun syrjäisimpiä alueita ei '
      + 'lasketa. Antiikissa niemi tunnettiin nimellä Pedalion, ja Strabonin mukaan sen yllä '
      + 'kohoava puolisuunnikkaan muotoinen kukkula oli pyhitetty Afroditelle. Kalkkikivi'
      + 'jyrkänteisiin on kulunut merenalaisia luolia, joita kutsutaan keijuluoliksi.',
    lahde: 'en-Wikipedia "Cape Greco", johdanto-osa (tarkistettu 6.9.2026).',
  },
];

