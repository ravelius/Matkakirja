/*
 * MAASTOKOHTEET — SLB. Salomonsaarten kohteet ja maasto.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Salomonsaarilla ei ollut yhtäkään karttamerkkiä ennen tätä erää
 * (docs/moduulit/karttanostot-kattavuus.md, Oseania). Erä M2 antaa
 * maalle KUUSI kohdetta ja kolme maastokohdetta; kaksi skandaalia asuu
 * js/packs/skandaalit.js:ssä.
 *
 * MIKSI KUUSI EIKÄ KAHDEKSAN. Sama syy kuin Fidžillä: lehden rajaus on
 * pieni (329 × 240 lautayksikköä, js/packs/fokus-grc.js FOKUS_POHJAT.SLB:
 * x 10973,44…11302,09, y 3400,21…3640,12), ja maan kohteet ovat
 * luonnostaan kahdessa rykelmässä — Uuden-Georgian saaret lännessä ja
 * Guadalcanal–Malaita idässä. Yhdeksän merkkiä on se määrä, joka mahtuu
 * ilman että naapurin nimiö jää toisen alle. Vaje on kirjattu erän
 * raporttiin.
 *
 * SANTA CRUZIN SAARET JÄIVÄT POIS RAJAUKSEN TAKIA. Ne kuuluvat maahan,
 * mutta ovat idässä noin 166–169° E eli laudan x-arvoilla 11367–11467,
 * kun rajaus loppuu 11302,09:ään. Sinne osuva merkki olisi olemassa
 * mutta pelaajan ulottumattomissa (vartio 7a, tools/savukkeet/
 * savuke-maastokohteet.mjs), joten esimerkiksi Vanikoro ja La Pérousen
 * haaksirikko jäivät valitsematta.
 *
 * YKSIKÄÄN EI OLE PELIKAUPUNGIN KOHDALLA. Maan ainoa pelikaupunki on
 * Honiara (js/packs/maailmankartta.js CITIES). Lähin uusi merkki on
 * Popomanaseu 11,5 lautayksikön päässä; raja KAUPUNGIN_KOHDALLA_SADE on
 * 7 (js/fokuskohteet.js). Sama syy karsi Henderson Fieldin ja Gold
 * Ridgen kaivoksen, jotka ovat molemmat alle seitsemän yksikön päässä.
 *
 * Tiedoston paikka, reitti, projektio ja kuvattomuus on perusteltu
 * sisarpakissa js/packs/maastokohteet-aus.js — sama erä, sama ratkaisu.
 * Faktat en-Wikipediasta kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_SLB = [
  /* ================================================================
   * K2-ERÄ M2, 6.9.2026 — KUUSI KOHDETTA.
   * ============================================================== */
  {
    id: 'tulagi',
    nimi: 'Tulagi',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi protektoraatin pääkaupunki oli juuri Tulagi?',
      'Kenen torpedovene tukeutui saareen 1943?',
    ],
    korostukset: ['protektoraatti|protektoraatin'],
    nappi: 'Pieni saari, joka oli koko maan pääkaupunki',
    // 160.1467 E / -9.1014 N — en-Wikipedia "Tulagi".
    // Lähin pelikaupunki Honiara, 13,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11171.6, y: 3515.7 },
    },
    teksti: 'Tulagi on pieni saari Ngella Sulen etelärannikon edustalla, ja se oli vuosina '
      + '1896–1942 Britannian Salomonsaarten protektoraatin pääkaupunki. Valinta perustui '
      + 'siihen, että pieni saari oli eristyneempi ja terveellisempi kuin taudeista kärsivät '
      + 'suuret saaret. Japanilaiset miehittivät Tulagin 3. toukokuuta 1942 aikoen rakentaa '
      + 'sinne vesitasotukikohdan, ja liittoutuneet valtasivat sen 7. elokuuta päivän '
      + 'kovan taistelun jälkeen osana operaatio Watchtoweria. Sen jälkeen saarella oli '
      + 'vuoden ajan torpedoveneiden laivue, muun muassa John F. Kennedyn PT-109. Sodan '
      + 'jälkeen pääkaupunki siirtyi Honiaraan Guadalcanalille, ja Tulagi on nykyään Keskisen '
      + 'maakunnan hallintokeskus.',
    lahde: 'en-Wikipedia "Tulagi", johdanto-osa sekä osiot "History", "World War II" ja '
      + '"Postwar" (tarkistettu 6.9.2026).',
  },
  {
    id: 'kennedysaari',
    nimi: 'Kennedysaari',
    tyyppi: 'historia',
    kysymykset: [
      'Miten miehistö päätyi saarelle?',
      'Ketkä löysivät haaksirikkoiset?',
    ],
    korostukset: ['Amagiri|Amagiri'],
    nappi: 'Luoto, jonne uitiin upotetusta veneestä',
    // 156.9056 E / -8.1128 N — en-Wikipedia "Kennedy Island".
    // Lähin pelikaupunki Honiara, 108,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11063.5, y: 3482.5 },
    },
    teksti: 'Kennedysaari on 1,17 hehtaarin asumaton luoto Salomonsaarilla; paikallinen nimi on '
      + 'Kasolo ja lempinimi Plum Pudding Island. Se sai nykyisen nimensä John F. Kennedyn '
      + 'mukaan: elokuussa 1943 japanilainen hävittäjä Amagiri ajoi hänen komentamansa '
      + 'torpedovene PT-109:n poikki ja upotti sen, ja miehistö ui juuri tälle saarelle. Kaksi '
      + 'amerikkalaista merimiestä kuoli törmäyksessä. Kennedy vei miehensä myöhemmin '
      + 'suuremmalle Olasanan saarelle, jossa heidät löysivät melanesialaiset tiedustelijat '
      + 'Biuku Gasa ja Eroni Kumana; heidät oli lähettänyt rannikkovartija Reg Evans. Kumana '
      + 'rakensi saarelle myöhemmin pienen muistomerkin.',
    lahde: 'en-Wikipedia "Kennedy Island", johdanto-osa ja osio "PT-109 incident" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'marovon-laguuni',
    nimi: 'Marovon laguuni',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mikä tekee laguunista maailman suurimman lajissaan?',
      'Mistä puusta laguunin veistokset tehdään?',
    ],
    korostukset: ['kaksoisvalliriutta|kaksoisvalliriutan'],
    nappi: 'Maailman suurin kaksoisriuttalaguuni',
    // 158.07 E / -8.48 N — en-Wikipedia "Marovo Lagoon" (koordinaatti
    // annettu artikkelin johdannossa tekstinä).
    // Lähin pelikaupunki Honiara, 68,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11102.3, y: 3494.8 },
    },
    teksti: 'Marovon laguuni on maailman suurin kaksoisvalliriutan sulkema laguuni. Se on '
      + 'Uuden-Georgian saarilla Vangunun ja Nggatokaen sammuneiden tulivuorisaarten välissä '
      + 'ja kattaa 700 neliökilometriä. Nimi tulee laguunin keskellä olevasta Marovon saaresta. '
      + 'Alue on maailmanperinnön arvoiseksi katsottua monimuotoisuutta: vuoden 2014 '
      + 'kartoituksessa laguunin reunariutalta mitattiin koko Läntisen maakunnan korkein ja '
      + 'Salomonsaarten toiseksi korkein elävän korallin peitto. Laguunissa on lukuisia '
      + 'saaria, joista osa on asuttuja; asukkaat puhuvat marovon kieltä ja elävät '
      + 'omavaraisviljelystä ja kalastuksesta. Marovon miehet tunnetaan taitavina '
      + 'puunveistäjinä, jotka työstävät eebenpuuta ja muita kovia puulajeja.',
    lahde: 'en-Wikipedia "Marovo Lagoon", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'arnavonsaaret',
    nimi: 'Arnavonsaaret',
    tyyppi: 'elain',
    kysymykset: [
      'Mikä kilpikonna saarilla pesii?',
      'Miksi suojelualue oli ensimmäinen laatuaan?',
    ],
    korostukset: ['karettikilpikonna|karettikilpikonnan'],
    nappi: 'Kylien itsensä perustama merensuojelualue',
    // 158.05 E / -7.4667 N — Manningin salmi Santa Isabelin ja Choiseulin
    // välissä; en-Wikipedia "Arnarvon Islands" nimeää paikan mutta ei anna
    // koordinaattia, joten piste on valittu salmen keskelle.
    // Lähin pelikaupunki Honiara, 89,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11101.7, y: 3460.8 },
    },
    teksti: 'Arnavonsaaret ovat saariryhmä Manningin salmessa Santa Isabelin ja Choiseulin '
      + 'välissä, ja niiden pääsaaret ovat Sikopo, Kerehikapa ja Maleivona. Saaria ympäröi '
      + '157 neliökilometrin Arnavonin merensuojelualue, joka perustettiin vuonna 1995 ja oli '
      + 'Salomonsaarten ensimmäinen kylien itsensä hoitama merensuojelualue. Se on äärimmäisen '
      + 'uhanalaisen karettikilpikonnan pesimäpaikka, ja alueelta on varmistettu myös '
      + 'intianpallopäädelfiinin havaintoja. Vuoden 2014 riuttakartoituksessa Kerehikapan '
      + 'ympäriltä mitattiin koko Salomonsaarten korkein elävän korallin peitto, keskimäärin '
      + '51 prosenttia ja parhaimmillaan 69 prosenttia.',
    lahde: 'en-Wikipedia "Arnarvon Islands", johdanto-osa sekä osio "Conservation area" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'langa-langan-laguuni',
    nimi: 'Langa Langa',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi saaret rakennettiin käsin?',
      'Mistä laguunin raha tehdään?',
    ],
    korostukset: ['simpukkaraha|simpukkarahan'],
    nappi: 'Saaret, jotka kannettiin hiekkasärkälle',
    // 160.745 E / -8.8775 N — en-Wikipedia "Langa Langa Lagoon".
    // Lähin pelikaupunki Honiara, 33,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11191.5, y: 3508.2 },
    },
    teksti: 'Langa Langan laguuni eli Akwalaafu on 21 kilometrin pituinen ja alle kilometrin '
      + 'levyinen luonnonlaguuni Malaitan länsirannikolla lähellä maakunnan pääkaupunkia '
      + 'Aukia. Laguunin väkeä sanotaan laguuni-ihmisiksi tai suolaveden ihmisiksi, ja he '
      + 'asuvat pienillä tekosaarilla, jotka on kasattu hiekkasärkkien päälle vuosien '
      + 'kuluessa — pakopaikoiksi Malaitan mantereen pääkallonmetsästäjiltä. Saaret '
      + 'tunnetaan simpukkarahan valmistuksesta, hairituaaleistaan, veneenrakennustaidostaan '
      + 'ja matkailustaan. Tunnetuin niistä on Laulasi, jossa matkailu alkoi jo 1970-luvun '
      + 'alussa ja jossa kyläläiset esittelevät simpukkarahan tekoa.',
    lahde: 'en-Wikipedia "Langa Langa Lagoon", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'tetepare',
    nimi: 'Tetepare',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi saari hylättiin 1800-luvun puolivälissä?',
      'Mitä uutta saaren joista on löydetty?',
    ],
    korostukset: ['kaskiviljely|kaskiviljelijöitä'],
    nappi: 'Suurin saari, jolla ei asu ketään',
    // 157.55 E / -8.7167 N — en-Wikipedia "Tetepare Island".
    // Lähin pelikaupunki Honiara, 81,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11085, y: 3502.8 },
    },
    teksti: 'Tetepare on saari Salomonsaarten Läntisessä maakunnassa, ja sillä on koskematonta '
      + 'alavaa sademetsää ja rikas rannikkomeri. Nimen merkitys on epävarma, mutta se '
      + 'tarkoittaa todennäköisesti villisikaa tai taistelevaa karjua — saari oli kuuluisa '
      + 'niistä. Asukkaat olivat ilmeisesti oma kansansa omine kielineen ja perinteineen, '
      + 'kaskiviljelijöitä kuten naapurit Rendovalla ja Uudessa-Georgiassa, ja hekin '
      + 'harjoittivat toisinaan pääkallonmetsästystä. Saari hylättiin 1800-luvun puolivälissä, '
      + 'ja väki hajaantui naapurisaarille. Saarelta on tavattu 230 lintulajia, 24 matelijaa, '
      + 'neljä sammakkoa ja 13 nisäkästä, ja tutkijat ovat löytäneet sen makean veden joista '
      + 'kolme uutta kalalajia sekä uuden kalasuvun.',
    lahde: 'en-Wikipedia "Tetepare Island", johdanto-osa ja osio "Ecology" '
      + '(tarkistettu 6.9.2026).',
  },
  /* ================================================================
   * MAASTOKOHTEET — kolme kappaletta, tyypit vuori, meri ja saari.
   * ============================================================== */
  {
    id: 'popomanaseu',
    nimi: 'Popomanaseu',
    tyyppi: 'vuori',
    kysymykset: [
      'Millä saarella maan korkein huippu on?',
      'Kuinka korkealle vuori kohoaa?',
    ],
    korostukset: ['Guadalcanal|Guadalcanalin'],
    nappi: 'Saariston korkein kohta',
    // 160.0619 E / -9.7036 N — en-Wikipedia "Mount Popomanaseu".
    // Lähin pelikaupunki Honiara, 11,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11168.7, y: 3535.9 },
    },
    teksti: 'Popomanaseu on tulivuoriperäinen vuori ja Salomonsaarten korkein kohta, 2 335 '
      + 'metriä. Se sijaitsee Guadalcanalilla Makarakomburu-vuoren itäpuolella, ja se on '
      + 'koko saaristo-Tyynenmeren korkein huippu, kun Uutta-Guineaa ja sen sivusaaria ei '
      + 'lasketa: itään päin katsottaessa korkeampaa vuorta ei tule vastaan ennen kuin '
      + 'Etelä-Amerikan Andeilla. Huippu on satulamainen ylätasanne, ja se näkyy vuorijonossa '
      + 'Honiaran kansainvälisen lentoaseman yläpuolella. Vuorella on suuri merkitys saaren '
      + 'alkuperäisväestölle, ja sen rinteet ovat tärkeä elinympäristö monille Guadalcanalin '
      + 'kotoperäisille ja suppealla alueella eläville lajeille.',
    lahde: 'en-Wikipedia "Mount Popomanaseu", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'uuden-georgian-salmi',
    nimi: 'Uuden-Georgian salmi',
    tyyppi: 'meri',
    kysymykset: [
      'Millä lempinimellä liittoutuneet kutsuivat salmea?',
      'Kuka antoi Uudelle-Georgialle nimen?',
    ],
    korostukset: ['The Slot|The Slot'],
    nappi: 'Rako, jota pitkin sota kulki yöllä',
    // 158.48 E / -8.26 N — en-Wikipedia "New Georgia Sound".
    // Lähin pelikaupunki Honiara, 60,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11116, y: 3487.4 },
    },
    teksti: 'Uuden-Georgian salmi kulkee kaakosta luoteeseen keskellä Salomonsaarten saaristoa. '
      + 'Pohjoisessa sitä rajaavat Choiseul, Santa Isabel ja Floridansaaret ja etelässä Vella '
      + 'Lavella, Kolombangara, Uusi-Georgia ja Russellinsaaret; päät määrittävät Bougainville '
      + 'luoteessa ja Guadalcanal kaakossa. Se on yksi kolmesta pääväylästä saariston läpi. '
      + 'Nimen Uusi-Georgia antoi John Shortland, joka purjehti salmen läpi elokuussa 1788 '
      + 'komentaen neljää ensimmäisen laivueen alusta paluumatkalla Port Jacksonista. Toisessa '
      + 'maailmansodassa liittoutuneet kutsuivat salmea nimellä The Slot sen muodon ja '
      + 'sotalaivaliikenteen määrän takia.',
    lahde: 'en-Wikipedia "New Georgia Sound", johdanto-osa sekä osiot "Geography", "History" '
      + 'ja "World War II" (tarkistettu 6.9.2026).',
  },
  {
    id: 'rennell',
    nimi: 'Rennell',
    tyyppi: 'saari',
    kysymykset: [
      'Mikä tekee Rennellistä poikkeuksellisen atollin?',
      'Miksi saari on polynesialainen ulkosaari?',
    ],
    korostukset: ['Teganojärvi|Teganojärvi'],
    nappi: 'Maailman toiseksi suurin kohonnut atolli',
    // 160.1667 E / -11.6667 N — en-Wikipedia "Rennell Island".
    // Lähin pelikaupunki Honiara, 76,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11172.2, y: 3602.1 },
    },
    teksti: 'Rennell eli paikalliselta nimeltään Mugaba on 660 neliökilometrin saari '
      + 'Salomonsaarten eteläosassa, 80 kilometriä pitkä ja 14 kilometriä leveä. Se on '
      + 'maailman toiseksi suurin kohonnut korallatolli, ja sen keskellä on Teganojärvi, '
      + 'saaristo-Tyynenmeren suurin järvi ja maailmanperintökohde. Saarella asuu noin 1 840 '
      + 'polynesialaista ihmistä, jotka puhuvat rennellin kieltä: Rennell ja Bellona ovat '
      + 'melanesialaisen saariston harvoja polynesialaisia ulkosaaria, ja niiden asukkaat '
      + 'tulivat ennen vuotta 1400 Uvealta eli nykyiseltä Wallisilta. Bauksiitin louhinta ja '
      + 'metsänhakkuu saaren länsipuolella oli vuosina 2011–2021 huonosti valvottua ja '
      + 'vahingoitti vakavasti saaren luontoa ja taloutta.',
    lahde: 'en-Wikipedia "Rennell Island", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
];
