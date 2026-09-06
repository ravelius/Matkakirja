/*
 * MAASTOKOHTEET — KWT. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs KWT --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/KWT.json. Työkalu laskee laudan
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
 * Kuwaitin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Kuwait on lähes tasainen aavikkomaa, joten vuorten sijaan listalla on maan tunnetuin kohouma Mutlan harjanne — artikkeli itse kertoo, ettei se silti ole maan korkein piste.
 *
 * ── MAAILMAN ERÄ M6, LÄHI-ITÄ (6.9.2026) ───────────────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Kuwaitilla oli kolme maastokohdetta eikä yhtään kohdetta. Erä tuo
 * kuusi KOHDETTA ja neljännen maastomerkin (Bubiyanin saari).
 * Koordinaatit koneella (`import { laudat } from
 * tools/johda-maastokohteet.mjs`, lon/lat en-Wikipedian
 * coordinates-propista), tekstit käsin raakatekstistä. Kuvaton erä,
 * vain maailmankartan rivi.
 *
 * KUUSI EIKÄ KAHDEKSAA — MAA ON PIENI JA PÄÄKAUPUNKI KESKELLÄ.
 * Kuwaitin fokuslehden rajaus on 103,3 × 100,5 lautayksikköä
 * (js/packs/fokus-grc.js FOKUS_POHJAT.KWT), ja Kuwait City istuu
 * lahden pohjukassa. Lähin uusi merkki on Failaka 8,8 lautayksikön
 * päässä kaupungista — yli KAUPUNGIN_KOHDALLA_SADE-rajan (7) ja
 * kaupunkikaton säteen (8), mutta niukasti. Kolme ilmeistä ehdokasta
 * karsiutui olemassa olevien merkkien alle: Al Jahran punainen linnake
 * ja Kazma ovat 2,1 lautayksikön päässä Mutlan harjanteesta ja Umm an
 * Namilin saari 2,9 yksikön päässä Kuwaitinlahdesta. Lisäksi Miskan ja
 * Auhah ovat kumpikin alle viiden yksikön päässä Failakasta.
 * Nimiölimitys (`node tools/tarkista-nimiolimitys.mjs`) pysyy nollassa.
 *
 * VARTIO 7a. tools/savukkeet/savuke-maastokohteet.mjs vaatii, että
 * jokainen kohde osuu maan fokuslehden rajaukseen (`osuuLehteen`);
 * Kuwaitilla rajaus on olemassa, joten vartio pätee ja jokainen piste
 * on tarkistettu sitä vasten. Vartiota ei ole muutettu.
 */
export const MAASTOKOHTEET_KWT = [
  {
    id: 'mutla',
    nimi: 'Mutlan harjanne',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Kuwaitin korkein kohta ei ole Mutla?',
      'Mitä topografinen dominanssi tarkoittaa?',
    ],
    korostukset: ['Jahra|Jahran'],
    nappi: 'Aavikkomaan ainoa mäki',
    // 47.6333 E / 29.3833 N — en-Wikipedia "Mutla Ridge"
    laudat: {
      maailmankartta: { x: 7421.1, y: 2203.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Kuwaitin näkyvin kukkula ei ole maan korkein kohta — ja se on paikan koko juju. Mutlan '
      + 'harjanne kohoaa Jahran kuvernoraatissa 142 metriin ja erottuu tasangolta kauas, mutta '
      + 'maan korkein piste on nimetön kohta aivan lännessä, eikä se erotu ympäristöstään '
      + 'lainkaan. Korkeus ja näkyvyys ovat siis kaksi eri asiaa. Harjanteen kallioinen selkä '
      + 'on ollut myös sotilaallisesti tärkeä: helmikuussa 1991 sen suunnassa, Basraan '
      + 'johtavalla tiellä, amerikkalaiskoneet iskivät Kuwaitista perääntyvään '
      + 'irakilaiskolonnaan — tie sai nimen Kuoleman valtatie. Myöhemmin liittouman joukot '
      + 'pystyttivät harjanteelle viestimastoja.',
    lahde: 'en-Wikipedia "Mutla Ridge", johdanto-osa ja osio "History" (tarkistettu 1.9.2026).',
  },
  {
    id: 'persianlahti',
    nimi: 'Persianlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Miten helmiä kalastettiin ennen öljyä?',
      'Missä Hormuzinsalmi on?',
    ],
    korostukset: ['helmisimpukoita|helmisimpukoistaan'],
    nappi: 'Helmien ja öljyn lahti',
    // 48.8 E / 29.2 N — ulappa Kuwaitin kaakkoisrannikon edustalla; artikkelin oma keskipiste on 52 / 26
    laudat: {
      maailmankartta: { x: 7460, y: 2210 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Persianlahti on Länsi-Aasian sisämeri Arabian niemimaan ja Iranin välissä, Intian '
      + 'valtameren ja Arabianmeren jatke. Itäpäässä se yhtyy Omaninlahteen Hormuzinsalmen '
      + 'kautta. Lahti on tunnettu kalavesistään, riutoistaan ja runsaista helmisimpukoistaan, '
      + 'joskin teollistuminen ja öljyvuodot ovat vahingoittaneet sen luontoa.',
    lahde: 'en-Wikipedia "Persian Gulf", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'kuwaitinlahti',
    nimi: 'Kuwaitinlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä oli Dilmun?',
      'Mikä on Ubaid-kausi?',
    ],
    korostukset: ['Dilmun|Dilmunin'],
    nappi: 'Lahti pääkaupungin sylissä',
    // 47.9333 E / 29.4333 N — en-Wikipedia "Kuwait Bay"
    laudat: {
      maailmankartta: { x: 7431.1, y: 2201.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Yksi maailman vanhimmista tunnetuista ruokoveneistä löytyi tämän lahden rannalta. '
      + 'Kuwaitinlahti on Persianlahden pohjukka, ja jo Ubaid-kaudella, noin 6500 eaa., sen '
      + 'rannat olivat Mesopotamian ja Itä-Arabian kansojen kohtauspaikka; kaivauspaikka H3 '
      + 'Subiyassa antoi sen veneen. Neljännestä vuosituhannesta eaa. alkaen lahti kuului '
      + 'Dilmunin valtakunnalle, joka hallitsi Akkazia, Umm an Namilia ja Failakaa ja '
      + 'huippuaikanaan 2000 eaa. koko kauppatietä Mesopotamiasta Indus-laakson kulttuuriin. '
      + 'Dilmunin taantuessa alueella kukoisti merirosvous, ja 600 eaa. jälkeen babylonialaiset '
      + 'liittivät sen valtakuntaansa. Kuwait City on lahden kärjessä.',
    lahde: 'en-Wikipedia "Kuwait Bay", johdanto-osa ja osio "History" (tarkistettu 1.9.2026).',
  },

  /* ================================================================
   * ERÄ M6, LÄHI-ITÄ (6.9.2026) — kuusi kohdetta ja Bubiyanin saari.
   * ============================================================== */
  {
    id: 'bubiyan',
    nimi: 'Bubiyan',
    tyyppi: 'saari',
    kysymykset: [
      'Mikä on Shatt al-Arabin suisto?',
      'Miksi rapukurmitsa pesii juuri täällä?',
    ],
    korostukset: ['Mubarak Al-Kabeer|Mubarak Al-Kabeerin'],
    nappi: 'Maan suurin saari, lintujen suisto',
    // 48.18333 E / 29.78333 N — en-Wikipedia "Bubiyan Island"
    // Lähin pelikaupunki: Kuwait 17,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7439.4, y: 2188.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Bubiyan on Kuwaitin saariketjun suurin saari, pinta-alaltaan 863 neliökilometriä, ja '
      + 'se on osa Shatt al-Arabin suistoa Persianlahden luoteisnurkassa. Saari on suurin '
      + 'kahdeksan saaren ryhmässä, joka sijaitsee juuri Shatt al-Arabin suun lounaispuolella. '
      + 'Saaren Mubarak Al-Kabeerin suojelualue on laguuneja ja suolamaita, ja se on Ramsar-'
      + 'kohde: sen kautta muuttavat vesilinnut Euraasiasta Afrikkaan ja Turkista Intiaan. Osa '
      + 'linnuista jää ympäri vuoden — täällä pesii maailman suurin rapukurmitsayhdyskunta.',
    lahde: 'en-Wikipedia "Bubiyan Island", johdanto-osa, ja en-Wikipedia "Wildlife of Kuwait", '
      + 'osio "Fauna" (tarkistettu 6.9.2026).',
  },
  {
    id: 'failaka',
    nimi: 'Failaka',
    tyyppi: 'historia',
    kysymykset: [
      'Mistä saaren nimi tulee?',
      'Mikä Dilmun oli?',
    ],
    korostukset: ['Dilmun|Dilmunin'],
    nappi: 'Vartioasema kahden joen suulla',
    // 48.33333 E / 29.43889 N — en-Wikipedia "Failaka Island"
    // Lähin pelikaupunki: Kuwait 8,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7444.4, y: 2201.3 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Failaka on saari kahdenkymmenen kilometrin päässä Kuwait Cityn edustalla, ja sen nimi '
      + 'tulee muinaiskreikan sanasta fylakion, vartioasema. Se on viidenkymmenen kilometrin '
      + 'päässä kaakkoon siitä kohdasta, jossa Eufrat ja Tigris laskevat Persianlahteen, joten '
      + 'saari on ollut strateginen palkinto sumerilaisen Urin ajoista asti. Dilmunin aikaan sen '
      + 'nimi oli Agarum, jumala Enzakin maa. Tanskalainen retkikunta Geoffrey Bibbyn johdolla '
      + 'kaivoi saarta 1958–1963 ja löysi noin viisikymmentä lieriösinettiä ja neljäsataa '
      + 'leimasinta; yhdessä nuolenpääkirjoituksessa luki "Marduk, erinomainen ruhtinas, '
      + 'armollinen jumala, ylistetty taivaassa ja maan päällä, armahda". Myöhemmin löytyi '
      + 'peruskivi, jonka teksti kertoo palatsin kuuluvan Babylonian kuninkaalle '
      + 'Nebukadnessarille.',
    lahde: 'en-Wikipedia "Failaka Island", johdanto-osa sekä osiot "Antiquity" ja "Hellenistic '
      + 'period" (tarkistettu 6.9.2026).',
  },
  {
    id: 'bahra1',
    nimi: 'Bahra 1',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä on Ubaid-kulttuuri?',
      'Miten savi kertoo kaukokaupasta?',
    ],
    korostukset: ['Ubaid|Ubaid-kulttuuriin'],
    nappi: 'Persianlahden vanhin kylä',
    // 48.05111 E / 29.65972 N — en-Wikipedia "Bahra 1"
    // Lähin pelikaupunki: Kuwait 12,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7435, y: 2193.3 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Bahra 1 on Subiyan alueella Kuwaitinlahden rannalla oleva kaivauspaikka, joka kuuluu '
      + 'Ubaid-kulttuuriin ja ajoittuu noin vuosiin 5500–4900 eaa. Se on Persianlahden alueen '
      + 'varhaisimpia Ubaid-asuinpaikkoja ja vanhin pysyvä kylä suoraan Mesopotamiasta etelään. '
      + 'Kaivauksia on tehnyt vuodesta 2009 kuwaitilais-puolalainen retkikunta. Löydetystä '
      + 'keramiikasta noin puolet on Mesopotamiasta tuotua Ubaid-tavaraa hienoine koristeltuine '
      + 'astioineen, toinen puoli arabialaista karkeaa punasavea — ja yksi kuparinpala kertoo '
      + 'yhteyksistä Omanin niemimaalle. Vuonna 2018 tutkittiin rakennusryhmää, joka vaikuttaa '
      + 'kulttirakennukselta; jos tulkinta pitää, se on koko Persianlahden vanhin.',
    lahde: 'en-Wikipedia "Bahra 1", johdanto-osa sekä osiot "History of research" ja '
      + '"Archaeological discoveries" (tarkistettu 6.9.2026).',
  },
  {
    id: 'burganinkentta',
    nimi: 'Burganin kenttä',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mikä on maaöljyn tihkupaikka?',
      'Miksi hiekkakivi on hyvä öljysäiliö?',
    ],
    korostukset: ['tihkupaikka|tihkupaikka'],
    nappi: 'Öljyä ruokovenettä tervaamassa',
    // 47.96667 E / 29.11083 N — en-Wikipedia "Burgan field"
    // Lähin pelikaupunki: Kuwait 8,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7432.2, y: 2213.3 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Burganin öljykentän päällä on luonnollinen maaöljyn tihkupaikka, jonka ihminen on '
      + 'tuntenut kivikaudesta asti: Subiyan seudulta löytyneen ruokoveneen tervamainen tiiviste, '
      + 'ajoitukseltaan noin 5000 eaa., on jäljitetty juuri tähän tihkuun. Maanalaiset säiliöt '
      + 'löydettiin helmikuussa 1938, ja yhdysvaltalais-brittiläinen Kuwait Oil Company aloitti '
      + 'kaupallisen tuotannon 1946. Laajempi Burgan on maailman suurin hiekkakiveen syntynyt '
      + 'öljykenttä, pinta-alaltaan noin tuhat neliökilometriä. Huippunsa se saavutti 1972, '
      + 'jolloin siitä pumpattiin 2,4 miljoonaa tynnyriä päivässä. Vuonna 2010 yhtiön '
      + 'toimitusjohtaja kertoi Burganin tuottavan puolet koko maan öljystä.',
    lahde: 'en-Wikipedia "Burgan field", osiot "Discovery and geology" sekä "Oil reserves, '
      + 'production capacity and estimated lifetime" (tarkistettu 6.9.2026).',
  },
  {
    id: 'kubbar',
    nimi: 'Kubbar',
    // Pieni hiekkasaari suojelukohteena: 'muu' + 'luonto'.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä on tärkeä lintualue?',
      'Miksi korallit viihtyvät matalassa lahdessa?',
    ],
    korostukset: ['korallirii|koralliriutat'],
    nappi: 'Pyöreä hiekkasaari tiirojen pesänä',
    // 48.4925 E / 29.0718 N — en-Wikipedia "Kubbar Island"
    // Lähin pelikaupunki: Kuwait 15,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7449.8, y: 2214.7 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Kubbar on pieni pensaikkoinen hiekkasaari noin kolmenkymmenen kilometrin päässä '
      + 'Kuwaitin etelärannikolta ja kahdenkymmenenyhdeksän kilometrin päässä Failakasta. Se on '
      + 'lähes pyöreä: halkaisija on 370–380 metriä ja pinta-ala noin yksitoista hehtaaria. '
      + 'Rannat ovat matalat ja kasvillisuus harvaa, mutta saarta kiertävät koralliriutat, ja '
      + 'siksi se on sukeltajien suosiossa. BirdLife International on nimennyt Kubbarin tärkeäksi '
      + 'lintualueeksi, koska siellä pesii valkoposkitiirojen yhdyskunta.',
    lahde: 'en-Wikipedia "Kubbar Island", johdanto-osa sekä osiot "Environment" ja "Important '
      + 'Bird Areas" (tarkistettu 6.9.2026).',
  },
  {
    id: 'ummalmaradim',
    nimi: 'Umm al Maradim',
    // Pieni hiekkasaari: 'muu' + 'luonto'.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi helmenpyytäjät palasivat saarelle joka ilta?',
      'Miksi juuri tämä saari on maan sateisin?',
    ],
    korostukset: ['helmisimpukat|helmisimpukoita'],
    nappi: 'Helmenpyytäjien yöpaikka etelässä',
    // 48.65167 E / 28.68056 N — en-Wikipedia "Umm al Maradim Island"
    // Lähin pelikaupunki: Kuwait 29,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7455.1, y: 2228.8 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Umm al Maradim, Möhkäleiden äiti, on Kuwaitin merirajan eteläisin saari lähellä '
      + 'Saudi-Arabian rajaa. Se on soikea, puolentoista kilometrin pituinen ja 540 metrin '
      + 'levyinen, pinta-alaltaan noin kuusikymmentäviisi hehtaaria. Toisin kuin useimmilla '
      + 'Kuwaitin saarilla, sen ympärillä on syvää vettä, joten alukset pääsivät suoraan rantaan. '
      + 'Merenpohjassa lisääntyy helmisimpukoita: ennen alukset lähtivät aamulla helmenpyyntiin '
      + 'ja palasivat illaksi saarelle, joka täyttyi miehistöistä, sukeltajista ja helmikauppiaista. '
      + 'Nykyään saarella on vain majakka ja poliisiasema, ja se on täynnä lokkeja ja flamingoja. '
      + 'Sadekaudella se vihertää — Umm al Maradim on Kuwaitin sateisin paikka.',
    lahde: 'en-Wikipedia "Umm al Maradim Island", johdanto-osa (tarkistettu 6.9.2026).',
  },
];

