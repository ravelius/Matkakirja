/*
 * MAASTOKOHTEET — PRT. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs PRT --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/PRT.json. Työkalu laskee laudan
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
 * Portugalissa oli neljä maastokohdetta ja nolla kuratoitua kohdetta
 * (docs/moduulit/karttanostot-kattavuus.md). Tavoite on kahdeksan
 * KOHDETTA maastokohteiden lisäksi, ja tässä ne ovat. Malli on sama
 * kuin K2-erässä 1 (js/packs/maastokohteet-isl.js, -che.js).
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-prt.js:ssä.
 * Kohdepakki tarvitsisi rivin js/fokuskohteet.js:n KOHDE_MAAT-tauluun
 * ja lehden poltettujen nimien lohkon (js/packs/fokus-grc.js
 * FOKUS_LISANIMET, tests/fokusnimet.test.mjs). Kumpaakaan ei tehdä
 * tässä erässä: KOHDE_MAAT on rinnakkaisen erän hallussa, ja
 * lisänimien lohko ladotaan ämpärin `<ISO>.json`-tiedostosta, jota
 * repossa ei ole. Tämän tiedoston lista liittyy peliin hakemiston
 * kautta (js/packs/maastokohteet.js), joten kohteet ovat kartalla heti.
 *
 * ETÄISYYS PELIKAUPUNKIIN. Lissabon on maan ainoa pelikaupunki, ja
 * lähin uusi merkki on Sintra 9,2 lautayksikön päässä siitä — yli
 * kaupungin kohdalla -säteen (KAUPUNGIN_KOHDALLA_SADE 7,
 * js/fokuskohteet.js) ja yli kaupunkikaton säteen (KAUPUNKIKATON_SADE
 * 8), joten se säilyy pääkartalla. Muut ovat 24–110 yksikön päässä.
 *
 * MITÄ JÄTETTIIN POIS JA MIKSI (sääntö N3): Porto ja Coimbra ovat jo
 * Lissabonin fokusvirran nostoja omalla karttapaikallaan
 * (js/packs/fokusvirta-lissabon.js), ja Belémin torni jäisi Lissabonin
 * kohdalle. Alcobaçan luostari pudotettiin, koska se olisi osunut 6,7
 * lautayksikön päähän Batalhan luostarista.
 *
 * KUVATON ERÄ. Sama linja kuin maastokohteilla muutenkin: kortti
 * kantaa tekstin ja lähteen, ei kuvaa. Tarkistamaton Commons-tiedosto
 * olisi huonompi kuin kuvaton kortti (Perustuslaki, faktakuri).
 * Faktat on tarkistettu en-Wikipediasta kohde kerrallaan 6.9.2026.
 *
 * Portugalin maastokohteet. Faktat en-Wikipediasta 29.8.2026. HUOM: Pico (2 351 m) on Portugalin korkein, mutta se on Azoreilla (lon -28) eikä mahdu maan fokuslehden ikkunaan. Listalla on siksi Torre, jonka artikkeli itse nimeää mannermaisen Portugalin korkeimmaksi pisteeksi.
 */
export const MAASTOKOHTEET_PRT = [
  {
    id: 'torre',
    nimi: 'Torre',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Torre ei ole tavallinen huippu?',
      'Sataako Serra da Estrelalla lunta?',
    ],
    korostukset: ['Serra da Estrela|Serra da Estrela'],
    nappi: 'Huippu, jolle pääsee autolla',
    // -7.613 E / 40.3219 N — en-Wikipedia "Serra da Estrela"
    laudat: {
      maailmankartta: { x: 5579.6, y: 1790.2 },
      europe: { x: 65, y: 833.1 },
    },
    teksti: 'Serra da Estrela on mannermaisen Portugalin korkein vuoristo ja Sistema Centralin '
      + 'läntisin osa. Sen korkein kohta, 1 993 metriä, ei ole erillinen huippu vaan '
      + 'ylätasangon korkein piste, ja sitä kutsutaan nimellä Torre. Se on epätavallinen huippu '
      + 'siinäkin, että sinne pääsee päällystettyä tietä pitkin.',
    lahde: 'en-Wikipedia "Serra da Estrela", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'atlantti',
    nimi: 'Atlantti',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi juuri portugalilaiset lähtivät Atlantille ensimmäisinä?',
      'Kuinka syvä Atlantti on?',
    ],
    nappi: 'Valtameri, jonka takaa löytyi uusi maailma',
    // -9.95 E / 39.6 N — ulappa Portugalin rannikon edustalla, lehden ikkunan länsireunassa; artikkelin oma keskipiste on -25 / 0
    laudat: {
      maailmankartta: { x: 5501.7, y: 1818.6 },
      europe: { x: 20.2, y: 852.1 },
    },
    teksti: 'Atlantti on maailman valtamerista toiseksi suurin: pinta-alaa noin 85 133 000 '
      + 'neliökilometriä eli noin 17 prosenttia maapallon pinnasta ja lähes neljännes sen '
      + 'vesialasta. Löytöretkien aikaan se tunnettiin merenä, joka erotti Amerikan uuden '
      + 'maailman Afro-Euraasian vanhasta. Portugalin koko rannikko on tätä merta.',
    lahde: 'en-Wikipedia "Atlantic Ocean", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'tejo',
    nimi: 'Tejo',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä on käänteinen suisto?',
      'Miksi Lissabonin edustalla tapahtuu maanjäristyksiä?',
    ],
    korostukset: ['Lissabon|Lissabonin'],
    nappi: 'Iberian pisin joki',
    // -8.68 E / 39.24 N — Santarém joen alajuoksulla Portugalin puolella; artikkelilla ei ole koordinaattia
    laudat: {
      maailmankartta: { x: 5544, y: 1832.7 },
      europe: { x: 44.5, y: 861.6 },
    },
    teksti: 'Tejolla on maailman harvinaisimpia suistoja: se on nurinpäin. Tavallinen suisto '
      + 'levenee merta kohti, mutta Tejon suisto on leveä sisämaan päästä ja kapenee ulos — '
      + 'laguuni on noin viisitoista kilometriä leveä ja kaksikymmentäviisi pitkä, mutta aukko '
      + 'mereen vain kaksi kilometriä. Vuorovesi paljastaa siitä valtavat matalikot. Lissabonin '
      + 'edusta on myös maanjäristysherkkää seutua, ja alajuoksua ovat ravistelleet muun muassa '
      + 'vuosien 1309, 1531, 1755 ja 1909 järistykset. Keskiajan lopulta alkaen joen suu '
      + 'välitti kauppaa Pohjois-Euroopan ja Välimeren välillä, ja renessanssista lähtien se '
      + 'oli Portugalin siirtomaavallan keskus kolmella mantereella.',
    lahde: 'en-Wikipedia "Tagus", osiot "Estuary", "Geology" ja "Historical importance" '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'douro',
    nimi: 'Douro',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Douron laakso on kuuluisa viinistään?',
      'Mistä joki saa alkunsa?',
    ],
    nappi: 'Iberian vesirikkain joki',
    // -7.79 E / 41.16 N — Peso da Régua viinilaaksossa; artikkelin koordinaatti -8,669 / 41,143 on suistossa Portossa
    laudat: {
      maailmankartta: { x: 5573.7, y: 1757.1 },
      europe: { x: 61.6, y: 811.1 },
    },
    teksti: 'Douro on virtaamaltaan Iberian niemimaan suurin joki. Se nousee Pico de Urbiónilta '
      + 'Espanjan Sorian maakunnassa, virtaa länteen Kastilia ja Leónin pohjoisosan halki ja '
      + 'jatkaa Pohjois-Portugaliin, missä se laskee Atlanttiin Portossa, maan toiseksi '
      + 'suurimmassa kaupungissa. Sen suurin sivujoki on oikealta tuleva Esla.',
    lahde: 'en-Wikipedia "Douro", johdanto-osa (tarkistettu 29.8.2026).',
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
    id: 'sintra',
    nimi: 'Sintra',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mikä Penan kansallispalatsi on?',
      'Mikä Sintran kaulus on?',
    ],
    korostukset: ['Penan kansallispalatsi|Penan kansallispalatsi'],
    nappi: 'Romantiikan palatsit vuoren rinteillä',
    // -9.3883 E / 38.7992 N — en-Wikipedia "Sintra"
    laudat: {
      maailmankartta: { x: 5520.4, y: 1849.8 },
    },
    teksti: 'Sintra on kaupunki ja kunta Lissabonin seudulla Portugalin rivieralla, ja se on '
      + 'yksi maan tärkeimmistä matkakohteista. Kunnan halki kulkee Sintran vuoristo, ja '
      + 'historiallinen keskusta tunnetaan 1800-luvun romanttisesta arkkitehtuurista, '
      + 'kartanoista, huviloista, puutarhoista sekä kuninkaallisista palatseista ja '
      + 'linnoista — juuri niiden takia kaupunki on maailmanperintökohde. Tunnetuimmat ovat '
      + 'keskiaikainen maurien linna, romantiikan ajan Penan kansallispalatsi ja portugalilaisen '
      + 'renessanssin Sintran kansallispalatsi. Ihmisiä on asunut alueella varhaisesta '
      + 'paleoliittisesta kaudesta lähtien: Penha Verdestä on löydetty vanhimmat jäljet, ja '
      + 'maurien linnan kupeesta São Pedro de Canaferrimista neoliittista koristeltua '
      + 'keramiikkaa ja piikivikaluja viidenneltä vuosituhannelta eaa. Seudun kuuluisin '
      + 'muinaislöytö on Sintran kaulus, keskipronssikautinen kultainen kaularengas, joka '
      + 'löytyi kaupungin läheltä 1800-luvun lopulla ja on ollut vuodesta 1900 British '
      + 'Museumin kokoelmissa.',
    lahde: 'en-Wikipedia "Sintra", johdanto-osa ja osio "Prehistory to Moorish era" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'batalha',
    nimi: 'Batalhan luostari',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä Aljubarrotan taistelu oli?',
      'Kuinka kauan luostaria rakennettiin?',
    ],
    korostukset: ['manueliinityyli|manueliinityylin'],
    nappi: 'Kiitos voitosta, joka pelasti kuningaskunnan',
    // -8.8261 E / 39.6592 N — en-Wikipedia "Batalha Monastery"
    laudat: {
      maailmankartta: { x: 5539.1, y: 1816.3 },
    },
    teksti: 'Batalhan luostari on dominikaaniluostari Keski-Portugalissa, ja sen virallinen nimi '
      + 'on Voiton Pyhän Marian luostari. Kuningas Juhana I rakennutti sen lupauksensa mukaan '
      + 'kiitokseksi Neitsyt Marialle siitä, että portugalilaiset voittivat kastilialaiset '
      + 'Aljubarrotan taistelussa vuonna 1385 ja vuosien 1383–1385 kriisi päättyi. Luostarista '
      + 'tuli 1400-luvun Avisin hallitsijasuvun hautakirkko, ja se on Portugalin parhaita '
      + 'esimerkkejä myöhäisestä liekkigotiikasta manueliinityylin kanssa sekoittuneena. '
      + 'Rakentaminen kesti yli sata vuotta, vuodesta 1386 noin vuoteen 1517, ja se ulottui '
      + 'seitsemän kuninkaan hallituskaudelle ja viidentoista rakennusmestarin käsiin — '
      + 'ensimmäinen heistä, Afonso Domingues, laati pohjapiirroksen, ja hänen jälkeensä '
      + 'Huguet toi maahan liekkigotiikan. Työ pysähtyi, kun Juhana III päätti panna kaiken '
      + 'voimansa Lissabonin Jerónimosin luostariin; maailmanperintökohde Batalha on ollut '
      + 'vuodesta 1983.',
    lahde: 'en-Wikipedia "Batalha Monastery", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'tomar',
    nimi: 'Tomarin luostari',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä temppeliherroille tapahtui Portugalissa?',
      'Minkä rakennuksen mukaan pyörökirkko tehtiin?',
    ],
    korostukset: ['Kristuksen ritarikunta|Kristuksen ritarikunnan'],
    nappi: 'Temppeliherrojen linna, josta tuli löytöretkien kassa',
    // -8.4175 E / 39.6047 N — en-Wikipedia "Convent of Christ (Tomar)"
    laudat: {
      maailmankartta: { x: 5552.8, y: 1818.4 },
    },
    teksti: 'Tomarin Kristuksen luostari on entinen katolinen luostari Keski-Portugalissa. '
      + 'Temppeliherrat perustivat linnan vuonna 1118, ja rakentaminen jatkui 1100-luvun '
      + 'loppuun; suurmestari Gualdim Pais sai oratorion valmiiksi noin vuonna 1160. Noin '
      + 'vuonna 1190 linna kesti kalifi Abu Yusuf al-Mansurin armeijat, jotka valtasivat '
      + 'etelämpänä muita tukikohtia, ja 1200-luvun toisella neljänneksellä Tomarista tuli '
      + 'ritarikunnan pääpaikka ja osa nuoren kristityn kuningaskunnan rajapuolustusta. Kun '
      + 'temppeliherrain ritarikunta lakkautettiin 14. maaliskuuta 1319, paavi Johannes XXII '
      + 'perusti Portugalin kuningas Dionysioksen pyynnöstä Kristuksen ritarikunnan: veljet, '
      + 'omaisuus ja osin jäsenistökin siirtyivät sille, ja juuri se ritarikunta tuki '
      + 'myöhemmin Portugalin 1400-luvun löytöretkiä. Linnan kuuluisa pyörökirkko '
      + 'rakennettiin 1100-luvun jälkipuoliskolla Jerusalemin Kalliomoskeijan malliin, jota '
      + 'ristiretkeläiset pitivät Salomon temppelin jäänteenä.',
    lahde: 'en-Wikipedia "Convent of Christ (Tomar)", johdanto-osa sekä osiot "Templars" ja '
      + '"Order of Christ" (tarkistettu 6.9.2026).',
  },
  {
    id: 'guimaraes',
    nimi: 'Guimarães',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka oli Vímara Peres?',
      'Mikä São Mameden taistelu oli?',
    ],
    korostukset: ['kehtokaupunki|kehtokaupungiksi'],
    nappi: 'Kaupunki, jossa Portugali syntyi',
    // -8.2908 E / 41.445 N — en-Wikipedia "Guimarães"
    laudat: {
      maailmankartta: { x: 5557, y: 1745.7 },
    },
    teksti: 'Guimarães on kaupunki Pohjois-Portugalissa, ja sen historiallinen keskusta on '
      + 'ollut maailmanperintökohde vuodesta 2001 poikkeuksellisen hyvin säilyneenä '
      + 'esimerkkinä siitä, miten keskiaikainen asutus kasvoi uudenaikaiseksi kaupungiksi. '
      + 'Paikka asutettiin 800-luvulla nimellä Vimaranes, ja nimi juontuu todennäköisesti '
      + 'soturi Vímara Peresistä, joka valitsi alueen valloittamansa Portugalin kreivikunnan '
      + 'hallintopaikaksi. Kaupunkia sanotaan Portugalin syntymäpaikaksi ja kehtokaupungiksi, '
      + 'koska maan ensimmäinen kuningas Afonso Henriques syntyi siellä ja koska São Mameden '
      + 'taistelu — Portugalin kuningaskunnan synnyn ratkaiseva tapahtuma — käytiin kaupungin '
      + 'liepeillä. Guimarães oli Slovenian Mariborin kanssa Euroopan kulttuuripääkaupunki '
      + 'vuonna 2012. Condé Nast Traveler -lehti julisti sen vuonna 2022 Euroopan kauneimmaksi '
      + 'pikkukaupungiksi.',
    lahde: 'en-Wikipedia "Guimarães", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'almendres',
    nimi: 'Almendresin kivikehä',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka vanha kivikehä on?',
      'Mihin kehää on arveltu käytetyn?',
    ],
    korostukset: ['menhiri|menhirien'],
    nappi: 'Iberian suurin pystykivien joukko',
    // -8.0612 E / 38.5575 N — en-Wikipedia "Almendres Cromlech"
    laudat: {
      maailmankartta: { x: 5564.6, y: 1859.2 },
    },
    teksti: 'Almendresin kivikehä on megaliittikokonaisuus Évoran kunnassa Alentejossa, noin '
      + 'neljän ja puolen kilometrin päässä Nossa Senhora de Guadalupen kylästä. Se on '
      + 'Iberian niemimaan suurin järjestetty menhirien ryhmä ja yksi Euroopan suurimmista, '
      + 'ja siihen kuuluu useita megaliittisia rakenteita: kivikehiä ja pystykiviä. Rakenteet '
      + 'ovat kuudennelta vuosituhannelta eaa., ja kaivaukset ovat erottaneet kolme vaihetta '
      + '— Almendres I noin 6000 eaa., Almendres II noin 5000 eaa. ja Almendres III noin '
      + '4000 eaa. Kohde löydettiin uudelleen vasta vuonna 1966, kun Henrique Leonor Pina '
      + 'teki alueella geologista kartoitustyötä. Ympyrämäisesti järjestetty kehä on noin '
      + '95 graniittimonoliitin metsä, ja sillä arvellaan olleen joko uskonnollinen tehtävä '
      + 'tai osa varhaista tähtitieteellistä havainnointia.',
    lahde: 'en-Wikipedia "Almendres Cromlech", johdanto-osa sekä osiot "History" ja '
      + '"Architecture" (tarkistettu 6.9.2026).',
  },
  {
    id: 'saovicente',
    nimi: 'São Vicenten niemi',
    tyyppi: 'merenkulku',
    kysymykset: [
      'Miksi antiikin kirjoittajat pitivät niemeä pyhänä?',
      'Mistä niemi sai nimensä?',
    ],
    korostukset: ['Promontorium Sacrum|Promontorium Sacrum'],
    nappi: 'Mannereuroopan lounaisin kärki',
    // -8.9944 E / 37.025 N — en-Wikipedia "Cape St. Vincent"
    laudat: {
      maailmankartta: { x: 5533.5, y: 1918.4 },
    },
    teksti: 'São Vicenten niemi Algarvessa on Portugalin ja koko Manner-Euroopan lounaisin '
      + 'kohta. Se oli pyhää maata jo kivikaudella, mistä kertovat lähistön pystykivet: '
      + 'kreikkalaiset kutsuivat sitä Ophiussaksi eli käärmeiden maaksi ja pystyttivät sinne '
      + 'Herakleen temppelin, roomalaisille se oli Promontorium Sacrum eli pyhä niemi. Strabon '
      + 'kertoo Maantieteessään, että paikkaa pidettiin taianomaisena ja että rahvas uskoi '
      + 'auringon vajoavan siinä sihisten mereen maailman reunalla — mitä hän itse piti '
      + 'tavallisena kansanpuheena. Nykyinen nimi tulee tarinasta, jonka mukaan 300-luvulla '
      + 'marttyyrina kuolleen iberialaisen diakonin Vincentin ruumis tuotiin maihin täällä ja '
      + 'haudan päälle pystytettiin pyhäkkö, jota arabimaantieteilijä al-Idrisin mukaan '
      + 'vartioivat aina korpit. Kuningas Afonso Henriques käski kaivaa ruumiin ylös vuonna '
      + '1173 ja vietti sen laivalla Lissaboniin korppien saattamana; siirto näkyy yhä '
      + 'Lissabonin vaakunassa.',
    lahde: 'en-Wikipedia "Cape St. Vincent", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'elvas',
    nimi: 'Elvas',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mikä trace italienne on?',
      'Mikä Amoreiran akvedukti on?',
    ],
    korostukset: ['bastioni|bastionia'],
    nappi: 'Rajakaupunki bastionien sisällä',
    // -7.15 E / 38.8667 N — en-Wikipedia "Elvas"
    laudat: {
      maailmankartta: { x: 5595, y: 1847.2 },
    },
    teksti: 'Elvas on kaupunki Itä-Portugalissa Alentejossa, noin kahdeksan kilometrin päässä '
      + 'espanjalaisesta Badajozin linnoituksesta. Se on hienoimpia esimerkkejä '
      + 'tähtilinnoituksen eli trace italiennen perusteellisesta käytöstä sotilasarkkitehtuurissa, '
      + 'ja maailmanperintökohde se on ollut 30. kesäkuuta 2012 alkaen nimellä Elvasin '
      + 'varuskuntarajakaupunki ja sen linnoitukset. Kaupunkia puolusti seitsemän bastionia '
      + 'sekä Santa Lucían ja Nossa Senhora da Graçan linnakkeet, ja vuodesta 1642 se oli '
      + 'Tejon eteläpuolen tärkein rajalinnoitus, joka kesti espanjalaisten piiritykset 1659, '
      + '1711 ja 1801. Kuusi kilometriä pitkä Amoreiran akvedukti tuo kaupunkiin puhdasta '
      + 'vettä: sitä alettiin rakentaa 1400-luvun alussa ja se valmistui vuonna 1622, ja '
      + 'osalla matkaa siinä on neljä kaarikerrosta päällekkäin ja korkeutta neljäkymmentä '
      + 'metriä. Afonso I valtasi kaupungin maureilta vuonna 1166, mutta se menetettiin '
      + 'vielä kerran ennen lopullista valtausta 1226.',
    lahde: 'en-Wikipedia "Elvas", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'obidos',
    nimi: 'Óbidos',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi Óbidosia sanotaan kuningattarien kaupungiksi?',
      'Mistä nimi Óbidos tulee?',
    ],
    korostukset: ['oppidum|oppidum'],
    nappi: 'Muurikaupunki, joka annettiin kuningattarelle',
    // -9.1578 E / 39.3581 N — en-Wikipedia "Óbidos, Portugal"
    laudat: {
      maailmankartta: { x: 5528.1, y: 1828.1 },
    },
    teksti: 'Óbidos on pieni muurien ympäröimä kaupunki Portugalin Oesten alueella; itse '
      + 'kaupungissa asuu noin 3 100 ihmistä. Nimi on latinan sanan oppidum eli linnoitettu '
      + 'kaupunki muunnos vanhemmasta kelttiläisestä nimestä Eburobricio, ja asutus kasvoi '
      + 'roomalaisesta kylästä jyrkänteen juurelle. Óbidosin linnan keskiaikaisen tornin '
      + 'juurelta on löytynyt roomalaista rakennustyötä, joka liittyy Eburobrittiumin '
      + 'kaupunkiin; sen forumia, kylpylöitä ja muita rakenteita on kaivettu esiin lähistöltä, '
      + 'ja itse roomalaiskaupunki hylättiin 400-luvulla turvallisemman kukkulan takia. '
      + 'Kaupunki vallattiin maureilta Portugalin ensimmäisen kuninkaan Afonso Henriquesin '
      + 'aikana vuonna 1148, ja se sai ensimmäisen privilegiokirjansa 1195 kuningas Sancho '
      + 'I:n aikana. Vuonna 1210 kuningas Afonso II antoi kaupungin kuningatar Urracalle, ja '
      + 'siitä lähtien Portugalin kuningattaret ovat suojelleet sitä — siitä epävirallinen '
      + 'nimi Vila das Rainhas, kuningattarien kaupunki.',
    lahde: 'en-Wikipedia "Óbidos, Portugal", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
];

