/*
 * BELGIAN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan, Portugalin, Kreikan, Itävallan ja Alankomaiden jälkeen Belgia.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48) =====
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä Espanjan, Italian, Saksan, Portugalin,
 * Kreikan, Itävallan ja Alankomaiden pakat: jokaisella nostolla on valmis sisältö —
 * `teksti` 3–5 virkettä Wikipedian johdannosta omin sanoin suomeksi (ei
 * käännöskopiota, ei keksittyjä faktoja, `lahde`-riville artikkeli ja
 * tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi pulun
 * kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva` +
 * `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi
 * ja lähdesivu kirjattuna, jokaisen kuvan tiedot luettu Commonsin
 * extmetadata-rajapinnasta). Vuoden 1873 jälkeiset kohteet (Ében-Émaelin
 * linnake 1935, Bastognen muistomerkki 1950, Menin Gate 1927, Bois du
 * Cazierin onnettomuus 1956) ovat mukana: teksti on nykytietoa ja `nappi`
 * katsoo vuodesta 1873 eteenpäin. Tervurenin Kongon-näyttelystä (1897) ja
 * sen "ihmistarhasta" kerrotaan artikkelin mukaan asiallisesti.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `bel-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/bel/.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-maiden hahmotelmilla: nämä ovat kaikki
 * kaupunkien ulkopuolella (Belgiassa ei ole pelikaupunkia eikä muita
 * karttanostoja), lähimmät nostot yli 7 lautayksikön päässä toisistaan
 * (nimiölimityksen välttämiseksi), ja js/fokuskohteet.js liittää rivit
 * KOHDE_MAAT.BEL:iin. `lahi: true` on sama lähizoomiportti kuin
 * Ranskan hahmotelmalla (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen. Laudan luvut on laskettu pelin omalla
 * kaavalla (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Belgian fokuslehden
 * rajaukseen (`osuuLehteen`) ja on pelin karkean maailmankartan
 * BEL-renkaan sisällä; Zwin, Orval ja Ében-Émael ovat aivan reunalla
 * (rannikko ja raja, ≤ 0,5 lautayksikköä), ja niiden koordinaatit ovat
 * Wikipedian todelliset.
 */

/** Belgian hahmotelmanostot: sisällölliset kohteet. */
export const HAHMOTELMA_BEL = [
  {
    id: 'hahmotelma-high-fens',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-high-fens-73c41493.jpg',
      lyhyt: 'Lankkupolku kulkee kellertävän suoheinän halki Hautes Fagnesin ylängöllä.',
      selite: 'Hohes Venn eli Hautes Fagnes on Belgian ja Saksan rajalla sijaitseva yli 600 neliökilometrin laajuinen ylätasanko. Puinen pitkospolku suojaa märkää turvemaata kulumiselta.',
      lahde: 'Valokuva: Horst J. Meuter, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Horst J. Meuter',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hohes_Venn_in_Belgien_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-high-fens-d458cfe7.jpg',
        lyhyt: 'Pieni puro mutkittelee suon kellertävän heinikon läpi.',
        selite: 'Kuva on Hill-joen lähdealueelta Itä-Belgian Hohes Vennistä. Kuivalta näyttävä heinikko on todellisuudessa läpimärkää, vettä pidättävää suomaata.',
        lahde: 'Valokuva: Rhetos, Wikimedia Commons (CC0).',
        tekija: 'Rhetos',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Moorlandschaft_(Hohes_Venn).jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
    ],
    nimi: 'Hautes Fagnes',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mikä Hautes Fagnesin kohta on koko Belgian korkein?',
      'Mistä vedestä alueen rahkasuot saavat kosteutensa?',
    ],
    korostukset: ['Signal de Botrange|Signal de Botrange'],
    nappi: 'Ardennien pohjoispään turvesoita, joiden turve on kasvanut yli kymmenentuhatta vuotta',
    // 6.07777778 E / 50.54444444 N — en-Wikipedia "High Fens"
    laudat: {
      maailmankartta: { x: 6035.9, y: 1366.4 },
      europe: { x: 327.9, y: 564.3 },
    },
    teksti: 'Hautes Fagnes eli saksaksi Hohes Venn on ylänköaluetta Liègen maakunnassa '
      + 'Itä-Belgiassa ja Saksan puolella Ardennien ja Eifelin välissä. Se on Belgian suurin '
      + 'luonnonsuojelualue: se julistettiin suojelluksi vuonna 1957, ja sen pinta-ala on '
      + 'noin 45 neliökilometriä. Alue on täynnä yli 10 000 vuotta vanhoja rahkasoita, jotka '
      + 'saavat kosteutensa vain sadevedestä. Alueen korkein kohta, 694 metriä korkea Signal '
      + 'de Botrange, on samalla koko Belgian korkein kohta, ja sinne rakennettu torni nostaa '
      + 'katselupisteen 700 metriin. Kevään pesimäaikana osa suojelualueesta on suljettu '
      + 'uhanalaisen teeren vuoksi, ja kesällä metsäalueilla on tulipalovaara.',
    lahde: 'en-Wikipedia "High Fens", johdanto-osa ja osiot "Geography" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Miksi osa Hautes Fagnesin suojelualueesta on suljettu kävijöiltä keväisin?',
      vaihtoehdot: [
        'Tulvavaaran vuoksi sulamisvesien aikaan',
        'Rahkan keräämisen vuoksi',
        'Uhanalaisen teeren pesimisen vuoksi',
        'Metsäpalovaaran vuoksi',
      ],
      oikea: 2,
      fakta: 'Euroopan neuvosto myönsi Hautes Fagnesille suojelun ansiodiplomin vuonna 1966.',
    },
  },
  {
    id: 'hahmotelma-semois',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-semois-aeb87133.jpg',
      lyhyt: 'Semois-joen jyrkkä mutka kiertää metsäistä kukkulaa Ardenneilla.',
      selite: 'Näkymä Tombeau du Géant -näköalapaikalta Semoisin laakson kansallispuistossa Etelä-Ardenneilla. Joki kiertää mutkassa metsäisen kukkulan ympäri, ja laaksoon on laskeutunut aamusumua.',
      lahde: 'Valokuva: FrDr, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'FrDr',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tombeau_du_G%C3%A9ant_(Parc_naturel_de_l\'Ardenne_m%C3%A9ridionale,_Parc_national_de_la_Vall%C3%A9e_de_la_Semois)_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-semois-e2e82bbf.jpg',
        lyhyt: 'Metsäiset rinteet heijastuvat tyynestä Semois-joesta.',
        selite: 'Semois-joki Ucimontin ja Poupehanin kohdalla Belgiassa. Havumetsän peittämät rinteet nousevat suoraan joen rantaan.',
        lahde: 'Valokuva: Trougnouf (Benoit Brummer), Wikimedia Commons (CC BY 4.0).',
        tekija: 'Trougnouf (Benoit Brummer)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Semois_river_(DSC_8407).jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Semois',
    tyyppi: 'joki',
    lahi: true,
    kysymykset: [
      'Mihin jokeen Semois laskee?',
      'Minkä kasvin lajike on saanut nimensä Semois-joesta?',
    ],
    korostukset: ['tupakka|tupakkalaji'],
    nappi: 'Ardennien joki, jonka rannoilla kasvatetaan omaa tupakkalajiaan',
    // 4.73833333 E / 49.88055556 N — en-Wikipedia "Semois"
    laudat: {
      maailmankartta: { x: 5991.3, y: 1395.4 },
      europe: { x: 302.2, y: 581.7 },
    },
    teksti: 'Semois on 210 kilometriä pitkä joki, joka virtaa Ardennien ylängöiltä Belgiassa ja '
      + 'Ranskassa kohti Maasia; se on Maasin oikea sivujoki. Joen lähde on Arlonissa Belgian '
      + 'Luxemburgin maakunnassa lähellä Luxemburgin rajaa, ja se virtaa länteen. '
      + 'Bohan-sur-Semois\'n kylän jälkeen joki menee Ranskaan, missä se muodostaa noin kaksi '
      + 'kilometriä Belgian ja Ranskan rajaa, ja laskee Maasiin Monthermén kohdalla. Suuri '
      + 'osa joen varresta kuuluu Semoisin laakson kansallispuistoon. Alueella kasvatettu '
      + 'tupakkalaji on saanut nimensä joesta.',
    lahde: 'en-Wikipedia "Semois", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-han-sur-lesse',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-han-sur-lesse-cb83d674.jpg',
      lyhyt: 'Lesse-joki virtaa Han-sur-Lessen luolan suuaukolta, ja vierailijat seisovat rannalla.',
      selite: 'Lesse-joki tulee ulos Han-sur-Lessen luolaston uloskäynnin kohdalta Belgiassa. Jyrkkä kalliorinne ja tumma luolansuu nousevat suoraan veden äärestä.',
      lahde: 'Valokuva: Jean-Pol GRANDMONT, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Jean-Pol GRANDMONT',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:00_Han-sur-Lesse_-_Grottes.JPG',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-han-sur-lesse-abb338d5.jpg',
        lyhyt: 'Valaistu, kerroksittain kasvanut kalkkikivimuodostelma Han-sur-Lessen luolassa.',
        selite: 'Tippukivimuodostelma Han-sur-Lessen luolissa. Kalkkikivi on kasvanut vuosituhansien kuluessa kerros kerrokselta pisaroivan veden mukana.',
        lahde: 'Valokuva: Musicaline, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Musicaline',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Grottes_de_Han_DSCF6961.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Han-sur-Lessen luolat',
    tyyppi: 'joki',
    lahi: true,
    kysymykset: [
      'Mikä joki on uurtanut Han-sur-Lessen luolakompleksin kukkulan alle?',
      'Millä kulkuneuvolla turistit pääsevät luolille?',
    ],
    korostukset: ['Lesse|Lesse'],
    nappi: 'Lesse-joen uurtama luola kukkulan alla; vuonna 1906 sinne kulkee raitiotie',
    // 5.18777778 E / 50.12611111 N — en-Wikipedia "Han-sur-Lesse"
    laudat: {
      maailmankartta: { x: 6006.3, y: 1384.7 },
      europe: { x: 310.8, y: 575.3 },
    },
    teksti: 'Han-sur-Lesse on noin tuhannen asukkaan kylä Namurin maakunnassa Wallonian '
      + 'Belgiassa, ja se kuuluu Rochefortin kuntaan. Kylä on kuuluisa Grottes de '
      + 'Han-sur-Lesse -luolakompleksista, jonka Lesse-joki on uurtanut kukkulan alle. '
      + 'Turistit pääsevät luolille raitiotiellä, joka on säilynyt jäänteenä maan '
      + 'seutuvaunuverkosta; metrin raideleveyden linja avattiin vuonna 1906. Kylä taantui '
      + 'ruttojen, epidemioiden ja Ranskan ja Espanjan sotien vuoksi, ja vuonna 1766 siellä '
      + 'oli vain 62 asukasta. Sen Pyhän Hubertuksen kirkko rakennettiin uudelleen vuonna '
      + '1905 uusgoottilaiseen tyyliin.',
    lahde: 'en-Wikipedia "Han-sur-Lesse", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-zwin',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-zwin-cd4ca322.jpg',
      lyhyt: 'Panoraama Zwinin laakeasta murtosuon ja niittyjen maisemasta pengerten välissä.',
      selite: 'Panoraamakuva Zwinin luonnonsuojelualueesta sen kaakkoiskulmasta ennen alueen laajentamista, vuonna 2012. Matala, suolainen rantaniitty ulottuu tasaisena horisonttiin asti.',
      lahde: 'Valokuva: DimiTalen, Wikimedia Commons (CC0).',
      tekija: 'DimiTalen',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Panorama_(stitched)_of_Zwin_from_the_southeast_corner,_before_the_expansion,_Retranchement,_2012.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-zwin-61052e92.jpg',
        lyhyt: 'Hiekkadyynit ja tuulen rippelöimä hiekka Zwinin alueella Knokkessa.',
        selite: 'Näkymä Zwinin dyyniseen rantamaisemaan Knokke-Heistissä. Etualalla tuuli on kuvioinut hiekkaa ja taustalla dyynejä peittää rantaheinä.',
        lahde: 'Valokuva: FrDr, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'FrDr',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zwin_63.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Zwin',
    tyyppi: 'meri',
    lahi: true,
    kysymykset: [
      'Mikä sai Bruggen nousemaan Euroopan merkittäviin satamakaupunkeihin?',
      'Miksi Zwin-väylä muuttui käyttökelvottomaksi?',
    ],
    korostukset: ['Brugge|Bruggen'],
    nappi: 'Bruggen entinen väylä merelle, joka on liettynyt umpeen jo vuoteen 1500 mennessä',
    // 3.36527778 E / 51.35833333 N — en-Wikipedia "Zwin"
    laudat: {
      maailmankartta: { x: 5945.5, y: 1330.6 },
      europe: { x: 275.8, y: 542.9 },
    },
    teksti: 'Zwin on Pohjanmeren rannikon luonnonsuojelualue Belgian ja Alankomaiden rajalla, '
      + 'entisen vuorovesisalmen suuosa. Salmi syntyi vuonna 1134, kun myrsky puhkaisi '
      + 'Flanderin rannikon ja loi noin 15 kilometriä sisämaahan ulottuvan väylän; sen '
      + 'ansiosta Brugge sai yhteyden mereen ja nousi Euroopan merkittävimpiin keskiajan '
      + 'satamakaupunkeihin. Väylä alkoi kuitenkin liettyä 1200-luvun lopulta, ja noin '
      + 'vuodesta 1500 se oli käyttökelvoton ja katkaisi Bruggen sataman merestä. Nykyinen '
      + 'suojelualue perustettiin vuonna 1952; se tunnetaan suolaa sietävästä '
      + 'kasvillisuudestaan ja lintuharrastajien suosikkina, ja se on yksi harvoista '
      + 'paikoista Belgiassa, jossa pesii kattohaikaroita.',
    lahde: 'en-Wikipedia "Zwin", koko artikkeli (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mikä loi Zwin-salmen vuonna 1134?',
      vaihtoehdot: [
        'Myrsky, joka puhkaisi Flanderin rannikon',
        'Ihmisten kaivama kanava Bruggesta mereen',
        'Tulivuoren purkaus Pohjanmeren pohjassa',
        'Maanjäristys, joka laski rannikkoa',
      ],
      oikea: 0,
      fakta: 'Zwin julistettiin kansainvälisesti tärkeäksi kosteikoksi maaliskuussa 1986.',
    },
  },
  {
    id: 'hahmotelma-hoge-kempen',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-hoge-kempen-a9a8152e.jpg',
      lyhyt: 'Kanervaista rinnettä, korkeaa heinikkoa ja mäntymetsää Hoge Kempenin kansallispuistossa.',
      selite: 'Kansallispuiston maisemaa Flanderin Limburgissa: avoin nummirinne ja mäntymetsä vuorottelevat. Etualalla kuivunut heinikko.',
      lahde: 'Valokuva: Trougnouf (Benoit Brummer), Wikimedia Commons (CC BY 4.0).',
      tekija: 'Trougnouf (Benoit Brummer)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hoge_Kempen_National_Park_(DSCF4418).jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-hoge-kempen-b548c68a.jpg',
        lyhyt: 'Polku kulkee nummimaiseman halki Mechelse Heiden alueella.',
        selite: 'Kevätvalossa kuvattu polku Mechelse Heiden nummella Hoge Kempenin kansallispuistossa. Laaksoa reunustavat nuoret koivut ja mäntymetsää.',
        lahde: 'Valokuva: FrDr, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'FrDr',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mechelse_Heide_(Nationaal_Park_Hoge_Kempen)_15.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Hoge Kempen',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Minkä kahden vesistön vedenjakajalla Hoge Kempenin ylänkö sijaitsee?',
      'Minkä pyöräilyverkoston idea syntyi Hoge Kempenin alueella?',
    ],
    korostukset: ['kansallispuisto|kansallispuisto'],
    nappi: 'Maasin ja Demerin vedenjakajan hiekkaylänkö, jonne kansallispuisto perustetaan vasta 2006',
    // 5.66666667 E / 51 N — en-Wikipedia "Hoge Kempen National Park"
    laudat: {
      maailmankartta: { x: 6022.2, y: 1346.4 },
      europe: { x: 320, y: 552.3 },
    },
    teksti: 'Hoge Kempen on Flanderin ensimmäinen kansallispuisto, ja se avattiin 29. maaliskuuta '
      + '2006. Se sijaitsee Limburgin itäosassa Genkin ja Maasin laakson välissä, kattaa 67 '
      + 'neliökilometriä ja on enimmäkseen nummea ja mäntymetsää. Alue on ylänköä, joka '
      + 'toimii Maasin ja Demer-joen vedenjakajana; sitä peittävät Maasin jääkaudella '
      + 'Ardenneilta tuoma kivimurske ja merituulten kuljettama hiekka. Puistossa syntyi '
      + '1990-luvulla nykyisin laajalle levinnyt solmupisteisiin numeroitu '
      + 'pyöräilyreittiverkosto, jonka suunnitteli Hugo Bollen. Puisto on ehdolla Unescon '
      + 'maailmanperintökohteeksi.',
    lahde: 'en-Wikipedia "Hoge Kempen National Park", johdanto-osa ja osiot "History" ja '
      + '"Geography" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kalmthout',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-kalmthout-2cea2e17.jpg',
      lyhyt: 'Hiekkatie kiemurtelee avoimen nummen halki, ja etualalla kasvaa yksinäinen mänty.',
      selite: 'Talvinen näkymä Kalmthoutse Heiden nummelta Antwerpenin maakunnassa. Avoin kanervikko ja kuivunut heinikko levittäytyvät pitkälle horisonttiin.',
      lahde: 'Valokuva: Campinia88, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Campinia88',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kalmthoutse_Heide_(33).JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-kalmthout-c132dd6b.jpg',
        lyhyt: 'Nummen vesilampi peilaa kullanruskeaa ruokoa ja heinää.',
        selite: 'Nummen kosteikko eli ven Kalmthoutse Heiden alueella talvella. Matalan lammen ympärillä kasvaa korkeaa kuivunutta heinää.',
        lahde: 'Valokuva: Campinia88, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Campinia88',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kalmthoutse_Heide_(69).JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kalmthoutse Heide',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Millainen metsä alueella oli alun perin?',
      'Mikä maankäyttö muutti maiseman nummeksi?',
    ],
    korostukset: ['nummi|nummea'],
    nappi: 'Nummi, joka on syntynyt laidunnuksesta ja turpeenotosta lehtimetsän tilalle',
    // 4.44111111 E / 51.39527778 N — en-Wikipedia "De Zoom–Kalmthoutse Heide Cross-Border Park"
    laudat: {
      maailmankartta: { x: 5981.4, y: 1329 },
      europe: { x: 296.5, y: 541.9 },
    },
    teksti: 'De Zoom–Kalmthoutse Heide on Belgian ja Alankomaiden rajalla sijaitseva rajat '
      + 'ylittävä puisto, joka kattaa noin 37,5 neliökilometriä. Se syntyi kahden aiemman '
      + 'puiston, Belgian Kalmthoutse Heiden ja Alankomaiden De Zoomin, yhdistämisestä, ja '
      + 'suuri osa siitä on nummea. Alue oli alun perin Keski-Euroopalle tyypillistä '
      + 'lehtimetsää, mutta vuosisatainen karjan ja lampaiden laiduntaminen, keskiajan '
      + 'turvekasten poisto ja soiden ojittaminen turpeen saamiseksi tekivät siitä nummen. '
      + 'Belgian puoli julistettiin maisemansuojelualueeksi jo vuonna 1941, ja koko '
      + 'rajapuisto perustettiin vuonna 2001.',
    lahde: 'en-Wikipedia "De Zoom–Kalmthoutse Heide Cross-Border Park", koko artikkeli '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-lions-mound',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-lions-mound-321be4bb.jpg',
      lyhyt: 'Waterloon leijonakumpu kohoaa vihreänä kartiona pellon takaa, huipulla leijonapatsas.',
      selite: 'Kuvassa näkyy Braine-l\'Alleudin puolella sijaitseva keinotekoinen kumpu ja sen huipulla oleva leijonapatsas, joka muistuttaa Waterloon taistelusta.',
      lahde: 'Valokuva: Jean-Pol GRANDMONT, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Jean-Pol GRANDMONT',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Braine-l\'Alleud_051012_(5).JPG',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-lions-mound-e5421ebd.jpg',
        lyhyt: 'Leijonapatsas seisoo jalustalla kummun huipulla.',
        selite: 'Lähikuva kummun huipun leijonapatsaasta. Kivijalustassa lukee roomalaisin numeroin taistelun päivämäärä, 18. kesäkuuta 1815.',
        lahde: 'Valokuva: Johan\'s-brother-in-law, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Johan\'s-brother-in-law',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Belgium-Waterloo-Butte-du-Lion-statue.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Waterloon leijonakumpu',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka määräsi Leijonakumpu rakennettavaksi?',
      'Miksi kumpu rakennettiin juuri tähän paikkaan?',
    ],
    korostukset: ['Waterloo|Waterloon'],
    nappi: 'Keinotekoinen kumpu, jonka Alankomaiden kuningas rakennutti Waterloon taistelupaikalle 1826',
    // 4.40472222 E / 50.67833333 N — en-Wikipedia "Lion\"s Mound"
    laudat: {
      maailmankartta: { x: 5980.2, y: 1360.5 },
      europe: { x: 295.8, y: 560.8 },
    },
    teksti: 'Leijonakumpu on suuri keinotekoinen kukkula Braine-l\'Alleudin kunnassa Belgiassa. '
      + 'Alankomaiden kuningas Vilhelm I määräsi sen rakennettavaksi vuonna 1820, ja se '
      + 'valmistui vuonna 1826. Kumpu muistuttaa Waterloon taistelukentän kohdasta, jossa '
      + 'kuninkaan vanhemman pojan, Vilhelm Oranialaisen, arvellaan haavoittuneen 18. '
      + 'kesäkuuta 1815, sekä kaksi päivää aiemmin käydystä Quatre Brasin taistelusta. '
      + 'Insinööri Vifquain halusi sen olevan liittoutuneiden voiton symboli eikä yhden '
      + 'ihmisen ylistys. Kumpuun johtaa 226 askelmaa, ja huipulla leijonapatsaan ympärillä '
      + 'on näköalapaikka taistelutantereelle.',
    lahde: 'en-Wikipedia "Lion\'s Mound", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä tapahtuman muistoksi Leijonakumpu rakennettiin juuri tähän kohtaan?',
      vaihtoehdot: [
        'Ranskan keisarin kruunajaisten',
        'Wienin kongressin päätöksen',
        'Belgian itsenäisyysjulistuksen',
        'Vilhelm Oranialaisen haavoittumisen Waterloon taistelussa',
      ],
      oikea: 3,
      fakta: 'Vuonna 1832 ranskalaissotilaat melkein kaatoivat leijonapatsaan ja katkaisivat sen '
        + 'hännän.',
    },
  },
  {
    id: 'hahmotelma-menin-gate',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-menin-gate-eef1fe8e.jpg',
      lyhyt: 'Valaistu Menenin portti yöllä, harjalla leijonapatsas.',
      selite: 'Ypresin Menenin portti edestä katsottuna. Vaalea kivirakennus, punatiiliset sivut ja holvikaari on valaistu, ja katolla lepää leijona.',
      lahde: 'Valokuva: Marc Ryckaert, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Marc Ryckaert',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ieper_Menenpoort_R02.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-menin-gate-2abc667e.jpg',
        lyhyt: 'Menenin portti päivänvalossa viistosta kulmasta.',
        selite: 'Suuri muistoportti kalkkikiveä ja punatiiltä. Yläosan kirjoitus on omistettu Brittiläisen imperiumin armeijoille, jotka seisoivat Ypresin luona 1914–1918, ja heille joilla ei ole tunnettua hautaa.',
        lahde: 'Valokuva: Marc Ryckaert, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Marc Ryckaert',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ieper_Menenpoort_R03.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Menin Gate',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Keitä Menin Gate muistaa?',
      'Miksi portti sai nimekseen Menin Gate?',
    ],
    korostukset: ['Menin Gate|Menin Gate'],
    nappi: 'Ypresin vanha itäportti Vaubanin valleissa; muistomerkki tulee vasta 1927',
    // 2.89166667 E / 50.85222222 N — en-Wikipedia "Menin Gate"
    laudat: {
      maailmankartta: { x: 5929.7, y: 1352.9 },
      europe: { x: 266.7, y: 556.2 },
    },
    teksti: 'Menin Gate on Ypresin itäisessä uloskäynnissä oleva sotamuistomerkki, joka on '
      + 'omistettu ensimmäisessä maailmansodassa Ypresin kaarrossa kaatuneille brittiläisille '
      + 'ja Kansainyhteisön sotilaille, joiden hautoja ei tunneta. Sir Reginald Blomfieldin '
      + 'suunnittelema muistomerkki paljastettiin 24. heinäkuuta 1927. Portti on saanut '
      + 'nimensä siitä, että sen läpi lähtevä tie johti Meneniin. Muistomerkin kunniasalin '
      + 'kivitauluissa on 54 395 kaatuneen nimeä, jotka eivät ole koskaan tulleet '
      + 'tunnistetuiksi. Joka ilta kello 20 torvensoittajat sulkevat portin läpi kulkevan '
      + 'tien ja soittavat Last Post -merkin.',
    lahde: 'en-Wikipedia "Menin Gate", johdanto-osa ja osiot "Background" ja "Last Post '
      + 'ceremony" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-bastogne',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-bastogne-cb7c31a3.jpg',
      lyhyt: 'Mardassonin muistomerkki Bastognessa aukion ja pilvisen taivaan alla.',
      selite: 'Tähtimuotoisen muistomerkin ulkoseinä ja pylväikkö. Kaarien yläreunoihin on kaiverrettu Yhdysvaltain osavaltioiden nimiä, ja katolla on keltainen lautasmainen rakenne.',
      lahde: 'Valokuva: Marc Ryckaert, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Marc Ryckaert',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bastogne_Mardasson_Memorial_R01.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-bastogne-0aa6b717.jpg',
        lyhyt: 'Muistomerkin kaareva pylväikkö ja sisäpiha.',
        selite: 'Kuvassa näkyy muistomerkin sisäpuolelta kaareva palkki, tiilipäällysteiset pilarit ja pihan pensasaidat. Palkkiin on kaiverrettu osavaltioiden nimiä.',
        lahde: 'Valokuva: Zairon, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Zairon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bastogne_M%C3%A9morial_du_Mardasson_07.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Bastognen tähtimuistomerkki',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minkä muotoinen Bastognen muistomerkki on?',
      'Ketä Bastognen lähellä oleva muistomerkki kunnioittaa?',
    ],
    korostukset: ['tähti|tähden'],
    nappi: 'Ardennien rauhallinen seutu, jonne rakennetaan 1946–1950 tähden muotoinen muistomerkki',
    // 5.73888889 E / 50.00972222 N — en-Wikipedia "Battle of the Bulge Monument"
    laudat: {
      maailmankartta: { x: 6024.6, y: 1389.8 },
      europe: { x: 321.4, y: 578.3 },
    },
    teksti: 'Bastognen lähellä Belgian Luxemburgin maakunnassa oleva muistomerkki, aiemmin '
      + 'Mardasson-muistomerkiksi kutsuttu, kunnioittaa Ardennien taistelussa haavoittuneita '
      + 'ja kaatuneita amerikkalaissotilaita. Se on suunniteltu viisisakaraisen '
      + 'amerikkalaisen tähden muotoon, ja belgialainen arkkitehti Georges Dedoyard antoi '
      + 'sille 12 metrin korkeuden ja 31 metrin sivut. Sisäseinille on kaiverrettu kymmenen '
      + 'kivitekstiä taistelusta, ja reunuksessa on Yhdysvaltain 48 osavaltion nimet. '
      + 'Ensimmäinen askel otettiin 4. heinäkuuta 1946, kun presidentti Trumanille '
      + 'lahjoitettiin maata paikalta, ja muistomerkki vihittiin 16. heinäkuuta 1950. Sen '
      + 'alla oleva krypta on tarkoitettu protestanttisiin, katolisiin ja juutalaisiin '
      + 'jumalanpalveluksiin.',
    lahde: 'en-Wikipedia "Battle of the Bulge Monument", johdanto-osa ja osio "Design" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-bouillon',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-bouillon-6016df48.jpg',
      lyhyt: 'Bouillonin linna metsäisellä kalliolla Semois-joen mutkassa.',
      selite: 'Ylhäältä otettu kuva linnan kivimuureista, torneista ja liuskekattoisesta päärakennuksesta. Oikealla näkyy kaupunki ja joki.',
      lahde: 'Valokuva: Eebie, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Eebie',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bouillon_Ch%C3%A2teau-fort.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-bouillon-95fa878d.jpg',
        lyhyt: 'Linnan muurit ja tornit nousevat kaupungin talojen yläpuolelle.',
        selite: 'Kuva on otettu joen toiselta rannalta. Linnan pyöreät tornit ja kivisilta kohoavat jyrkän rinteen päällä joenrantakadun talojen takana.',
        lahde: 'Valokuva: Zairon, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Zairon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bouillon_Ch%C3%A2teau_de_Bouillon_08.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Bouillonin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Bouillonin Gotfrid myi linnan?',
      'Kuka varusti linnan raskaalle tykistölle?',
    ],
    korostukset: ['Gotfrid|Gotfridille'],
    nappi: 'Kalliolinna Semoisin mutkassa, jonka omistaja myi sen ristiretkeä varten',
    // 5.06569444 E / 49.79291667 N — en-Wikipedia "Bouillon Castle"
    laudat: {
      maailmankartta: { x: 6002.2, y: 1399.2 },
      europe: { x: 308.5, y: 584 },
    },
    teksti: 'Bouillonin linna on keskiaikainen linna Wallonian Belgian Luxemburgin maakunnassa '
      + 'Bouillonin kaupungissa. Se mainitaan ensimmäisen kerran vuonna 988, mutta samalla '
      + 'paikalla oli linna paljon aiemminkin. Linna kohoaa kallioisella kielekkeellä '
      + 'Semois-joen jyrkässä mutkassa. Vuonna 1082 linna periytyi Bouillonin Gotfridille, '
      + 'joka myi sen Liègen piispa Otbertille rahoittaakseen ensimmäisen ristiretken. '
      + 'Ranskan Ludvig XIV:n sotilasarkkitehti Vauban varusti sen raskaalle tykistölle '
      + '1600-luvun lopulla.',
    lahde: 'en-Wikipedia "Bouillon Castle", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-tournai',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-tournai-bf2f7e63.jpg',
      lyhyt: 'Tournain tuomiokirkon viisi romaanista tornia ja goottilainen kuori ylhäältä nähtynä.',
      selite: 'Kuvassa näkyvät tuomiokirkon viisi 1100-luvun romaanista tornia ja niiden vieressä goottilainen kuori 1200-luvulta. Taustalla on kaupungin punakattoisia taloja.',
      lahde: 'Valokuva: Jean-Pol GRANDMONT, Wikimedia Commons (CC BY 2.5).',
      tekija: 'Jean-Pol GRANDMONT',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tournai_JPG002.jpg',
      lisenssi: 'CC BY 2.5',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.5',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-tournai-09881d91.jpg',
        lyhyt: 'Tuomiokirkon pitkä laivan sisätila, päädyssä ruusuikkuna ja urut.',
        selite: 'Näkymä keskilaivaan: korkeat pyöreäkaariset arkadit, holvikatto ja päädyn värikäs ruusuikkuna urkujen yläpuolella.',
        lahde: 'Valokuva: Ymblanter, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Ymblanter',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tournai_Cath%C3%A9drale_Notre-Dame_interior_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Tournain tuomiokirkko',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuinka monta kellotornia Tournain tuomiokirkon poikkilaivassa on?',
      'Minkä kolmen rakennuskauden tyylejä kirkossa yhdistyy?',
    ],
    korostukset: ['kellotornin|kellotornin'],
    nappi: 'Viiden kellotornin kirkko, jossa romaaninen ja goottilainen tyyli kohtaavat',
    // 3.38885833 E / 50.60655 N — en-Wikipedia "Tournai Cathedral"
    laudat: {
      maailmankartta: { x: 5946.3, y: 1363.7 },
      europe: { x: 276.3, y: 562.6 },
    },
    teksti: 'Tournain Neitsyt Marian tuomiokirkko on roomalaiskatolinen tuomiokirkko Tournain '
      + 'kaupungissa. Se on ollut Wallonian merkittävä perintökohde vuodesta 1936 ja Unescon '
      + 'maailmanperintökohde vuodesta 2000. Kirkon rakentaminen alkoi 1100-luvulla, ja se '
      + 'yhdistää kolmen rakennuskauden tyylit: raskaan ja ankaran romaanisen laivan, '
      + 'siirtymävaiheen poikkilaivat ja täysin kehittyneen goottilaisen kuorin. Erottuvin '
      + 'osa on poikkilaivan viiden kellotornin ryhmä; sitä reunustavat tornit nousevat 83 '
      + 'metriin. Goottilainen kuori rakennettiin vuosina 1242–1255 Amiensin katedraalin '
      + 'esikuvan mukaan, ja renessanssin lehterin on tehnyt flaamilainen kuvanveistäjä '
      + 'Cornelis Floris vuonna 1573.',
    lahde: 'en-Wikipedia "Tournai Cathedral", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-eben-emael',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-eben-emael-d063314d.jpg',
      lyhyt: 'Ében-Émaelin linnakkeen betoninen sisäänkäyntirakennus, jonka seinässä on ampumaaukkoja ja päällä pieni panssarikupu.',
      selite: 'Kuvassa on linnakkeen Blok I -rakennus, jonka tunnelimainen portti johtaa sisään. Seinässä näkyy ampumaaukkoja ja iskujälkiä.',
      lahde: 'Valokuva: Paul Hermans, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Paul Hermans',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fort_Eben-Emael_Blok_I_7-06-2024_15-07-54.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-eben-emael-02bd3bfe.jpg',
        lyhyt: 'Ében-Émaelin linnakkeen betonikasematti, jonka seinässä on kolme porrastettua ampumaaukkoa.',
        selite: 'Kuvassa on linnakkeen kasematti puiden ja nurmikon keskellä. Portaittain kapenevat aukot on tehty tykkien ja konekiväärien ampumaraoiksi.',
        lahde: 'Valokuva: Vincent de Groot, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Vincent de Groot',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Eben-Emael-Fort-Casemate.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ében-Émaelin linnake',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Millä tavoin saksalaiset ottivat Ében-Émaelin linnakkeen toukokuussa 1940?',
      'Minkä kanavan varrella linnake sijaitsee?',
    ],
    korostukset: ['purjelento|purjelentokoneilla'],
    nappi: 'Vasta 1935 valmistuva linnake, jota pidetään läpipääsemättömänä; 1873 seutu on vielä rauhallinen',
    // 5.67899 E / 50.79755 N — en-Wikipedia "Fort Ében-Émael"
    laudat: {
      maailmankartta: { x: 6022.6, y: 1355.3 },
      europe: { x: 320.2, y: 557.6 },
    },
    teksti: 'Ében-Émaelin linnake on toimeton belgialainen linnoitus Liègen ja Maastrichtin '
      + 'välissä Belgian ja Alankomaiden rajalla lähellä Albert-kanavaa. Se rakennettiin '
      + 'vuosina 1931–1935, ja sitä pidettiin läpipääsemättömänä ja aikansa maailman '
      + 'suurimpana. Saksalaiset purjelentokoneilla laskeutuneet joukot, yhteensä 85 miestä, '
      + 'ottivat sen haltuunsa 10.–11. toukokuuta 1940. Se oli ensimmäinen strateginen '
      + 'ilmalaskuoperaatio, joka on koskaan yritetty sotahistoriassa, ja se avasi '
      + 'saksalaisille tien Belgiaan ilman linnakkeen tulitusta. Nykyään linnake on '
      + 'säilytetty museona, ja sinne voi tutustua.',
    lahde: 'en-Wikipedia "Fort Ében-Émael", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kortrijk',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-kortrijk-88e1fd6d.jpg',
      lyhyt: 'Kultaisten kannusten taistelun Groeninge-muistomerkki Kortrijkissa: kullattu naishahmo kohottaa keihästä.',
      selite: 'Muistomerkin jalustassa lukee "Kortrijk, Slag der Gulden Sporen". Kullattu hahmo seisoo leijonan vieressä puiston keskellä.',
      lahde: 'Valokuva: Flamenc, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Flamenc',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kortrijk-Groeningemonument.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-kortrijk-794d84d5.jpg',
        lyhyt: 'Kullattu Groeninge-muistomerkin hahmo näkyy modernin, kaarevan metalliveistoksen aukosta.',
        selite: 'Kuva muistaa Kultaisten kannusten taistelua (1302). Muistomerkin kullattu naishahmo kohottaa keihästä, ja edustalla on nykytaiteen kaari.',
        lahde: 'Valokuva: Vanzieleghem, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Vanzieleghem',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:11_juli_Monument.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kultaisten kannusten taistelu',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mikä taistelulle antoi nimen?',
      'Millä tavoin flaamilainen jalkaväki voitti ranskalaisen ratsuväen?',
    ],
    korostukset: ['kannus|kannusparista'],
    nappi: 'Kaupunkimiliisin keihäät kaatoivat ratsuväen; 1800-luvulla siitä kasvaa flaamilaisten symboli',
    // 3.27583333 E / 50.82888889 N — en-Wikipedia "Battle of the Golden Spurs"
    laudat: {
      maailmankartta: { x: 5942.5, y: 1353.9 },
      europe: { x: 274.1, y: 556.8 },
    },
    teksti: 'Kultaisten kannusten taistelu eli Kortrijkin taistelu käytiin 11. heinäkuuta 1302 '
      + 'Ranskan kuninkaan armeijan ja kapinallisen Flanderin kreivikunnan joukkojen välillä '
      + 'Kortrijkin lähellä, ja flaamilaiset voittivat yllättäen. Taustalla oli '
      + 'flaamilaiskaupunkien kansannousu ranskalaista valtaa vastaan toukokuussa 1302. '
      + 'Ranskalaisen ratsuväen rynnäköt eivät murtaneet flaamilaisten kaupunkimiliisin '
      + 'jalkaväen keihäsmuodostelmaa, ja ranskalaiset aateliset kärsivät raskaita tappioita. '
      + 'Taistelun nimi tulee noin 500 kannusparista, jotka saatiin saaliiksi ranskalaisilta '
      + 'ratsumiehiltä. Ranska voitti sodan, mutta taistelusta tuli tärkeä kulttuurinen '
      + 'tukipiste flaamilaisliikkeelle 1800- ja 1900-luvuilla, ja sen päivämäärä valittiin '
      + 'Flanderin yhteisön viralliseksi juhlapäiväksi vuonna 1973.',
    lahde: 'en-Wikipedia "Battle of the Golden Spurs", johdanto-osa (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mistä Kultaisten kannusten taistelu on saanut nimensä?',
      vaihtoehdot: [
        'Flanderin kreivin kultaisesta ritarimerkistä',
        'Noin 500 saaliiksi saadusta kannusparista',
        'Ranskan kuninkaan kultaisesta sotalipusta',
        'Taistelupaikalla kasvaneesta kultaisesta viljasta',
      ],
      oikea: 1,
      fakta: 'Vuonna 1984 taistelusta tehtiin elokuva De leeuw van Vlaanderen eli Flanderin '
        + 'leijona.',
    },
  },
  {
    id: 'hahmotelma-orval',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-orval-48bcef92.jpg',
      lyhyt: 'Orvalin luostarin kirkon rauniot: korkeat pylväät ja kaaret sekä kuorin päätyseinä ikkunoineen.',
      selite: 'Kuva on luostarin keskiaikaisen kirkon raunioista. Suorakaiteen muotoinen kuori oli kuvauksen mukaan tarkoituksella matala ja vaatimaton.',
      lahde: 'Valokuva: Dennis G. Jarvis, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Dennis G. Jarvis',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Belgium-5545_-_Choir_%2813270739723%29.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-orval-40943dcb.jpg',
        lyhyt: 'Nykyinen Orvalin luostari hiekkakivirakennuksineen, kellotorneineen ja Neitsyt Marian veistoksineen.',
        selite: 'Kuvassa on Orvalin luostarin uudempi rakennuskompleksi metsäisen rinteen edessä. Etualan seinässä on Madonna ja lapsi -veistos ja oikealla kellotorni.',
        lahde: 'Valokuva: LionelCallewaert, Wikimedia Commons (CC BY 4.0).',
        tekija: 'LionelCallewaert',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Abbaye_d\'Orval_9-9-2018.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-orval-3d196c04.jpg',
        lyhyt: 'Orvalin luostarin rauniohuoneen ristiholvit ja suippokaariset ikkunat sekä lattialla kivikappaleita.',
        selite: 'Kuva on raunioiden holvatun salin sisältä, ja aukoista näkyy ulos pihalle. Lattialla ja seinillä on esillä kivi- ja veistoskappaleita.',
        lahde: 'Valokuva: Souvaroff, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Souvaroff',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Orval_Ruins.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Orvalin luostari',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Mikä tuhosi Orvalin luostarin vuonna 1793?',
      'Mitä luostari valmistaa myyntiin?',
    ],
    korostukset: ['Orval|Orval'],
    nappi: 'Ranskan vallankumouksen polttamat rauniot; luostari nousee uudelleen vasta 1926',
    // 5.34888889 E / 49.63972222 N — en-Wikipedia "Orval Abbey"
    laudat: {
      maailmankartta: { x: 6011.6, y: 1405.8 },
      europe: { x: 313.9, y: 588.1 },
    },
    teksti: 'Orvalin luostari on sistersiläisluostari Gaumen alueella Belgian Luxemburgin '
      + 'maakunnassa Florenvillen kunnassa; se perustettiin vuonna 1132, kun Champagnen '
      + 'Trois-Fontainesin luostarin sistersiläismunkit saapuivat paikalle. Ranskalaiset '
      + 'joukot polttivat luostarin kokonaan maan tasalle vuonna 1793 vallankumouksen aikana '
      + 'kostoksi siitä, että se oli majoittanut itävaltalaisia joukkoja. Maa ja rauniot '
      + 'ostettiin vuonna 1887, ja ne lahjoitettiin sistersiläisille vuonna 1926, jolloin '
      + 'luostarielämä pääsi jatkumaan ja rakennukset nousivat uudelleen. Keskiaikainen '
      + 'perinne oluen panemisesta elvytettiin vuonna 1931 rahoittamaan jälleenrakennusta. '
      + 'Nykyään luostari on tunnettu trappistiolut Orvalista ja erityisestä juustosta.',
    lahde: 'en-Wikipedia "Orval Abbey", johdanto-osa ja osiot "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Miksi Orvalin luostarissa elvytettiin oluenpano vuonna 1931?',
      vaihtoehdot: [
        'Vieraiden majoituksen mainostamiseksi',
        'Vanhan kilpailijan ostamiseksi',
        'Piispan määräyksestä',
        'Luostarin jälleenrakennuksen rahoittamiseksi',
      ],
      oikea: 3,
      fakta: 'Vuonna 1637 ranskalaiset palkkasotilaat ryöstivät ja polttivat luostarin '
        + 'kolmikymmenvuotisessa sodassa.',
    },
  },
  {
    id: 'hahmotelma-chimay',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-chimay-3f842554.jpg',
      lyhyt: 'Chimayn ruhtinaiden linna, jonka sipulikupolinen torni kohoaa puiden yläpuolelle sinistä taivasta vasten.',
      selite: 'Kuvauksen mukaan linnan rakennusvaiheet ovat peräisin 1200- ja 1800-luvuilta. Harmaa liuskekatto ja tiilipiiput hallitsevat siluettia.',
      lahde: 'Valokuva: Jean-Pol GRANDMONT, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Jean-Pol GRANDMONT',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:00_Chimay_-_Ch%C3%A2teau_1.JPG',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-chimay-14a9df77.jpg',
        lyhyt: 'Scourmontin luostarin puutarha, punatiilinen siipirakennus ja kirkko Forgesissa Chimayn lähellä.',
        selite: 'Kuva näyttää Scourmontin luostarin vasemman siiven ja luostarikirkon kesäisessä puutarhassa. Luostari sijaitsee lähellä Chimayn kaupunkia.',
        lahde: 'Valokuva: Jean-Pol GRANDMONT, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Jean-Pol GRANDMONT',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Forges_-_Abbaye_ND_de_Scourmont_%281%29.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Chimay',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Minkä joen lähde on Chimayssa?',
      'Mitä tuotteita Scourmontin luostarin munkit valmistavat?',
    ],
    korostukset: ['Scourmont|Scourmontin'],
    nappi: 'Kaupunki, jonka lähellä luostarin munkit panevat olutta ja tekevät juustoa',
    // 4.31666667 E / 50.05 N — en-Wikipedia "Chimay"
    laudat: {
      maailmankartta: { x: 5977.2, y: 1388 },
      europe: { x: 294.1, y: 577.3 },
    },
    teksti: 'Chimay on kaupunki ja kunta Hainautin maakunnassa Walloniassa, ja siellä asui vuonna '
      + '2006 noin 9 800 ihmistä. Kaupunki on Oise-joen lähde, ja nykyinen kunta '
      + 'muodostettiin vuonna 1977 neljästätoista kunnasta. Kaupungissa sijaitsevan '
      + 'Scourmontin trappistiluostarin munkit pitävät Chimayn panimoa, ja Chimayn '
      + 'trappistioluet ja juustot ovat kansainvälisesti tunnettuja. Nähtävyyksiin kuuluvat '
      + 'Chimayn ruhtinaiden linna, Virellesin järvi ja Oisen lähde. Kaupungissa on '
      + 'perinteisesti ajettu vuotuisia kilpa-ajoja katuradalla, ja sitä on ajettu Grand Prix '
      + '-luokissa 1920-luvulta 1960-luvulle.',
    lahde: 'en-Wikipedia "Chimay", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-dinant',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-dinant-0d55c947.jpg',
      lyhyt: 'Dinantin Maas-ranta, Notre-Damen kollegiaattikirkko ja kallion päällä oleva linnake kirkkaassa auringonpaisteessa.',
      selite: 'Kuva näyttää Maas-joen rantakadun taloineen, kirkon sipulikupolisen tornin ja jyrkän kalliorinteen päällä kohoavan linnakkeen.',
      lahde: 'Valokuva: DimiTalen, Wikimedia Commons (CC0).',
      tekija: 'DimiTalen',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:View_of_Dinant,_with_the_Coll%C3%A9giale_and_Citadelle,_from_Avenue_Colonel_Cadoux,_2025.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-dinant-1c07e2c0.jpg',
        lyhyt: 'Adolphe Saxin pronssipatsas istuu penkillä Dinantin kadulla saksofoni kädessään.',
        selite: 'Patsas esittää saksofonin keksijää, joka on kotoisin Dinantista. Hän nojaa rennosti penkkiin ja pitelee soitinta polvellaan.',
        lahde: 'Valokuva: Jorge Franganillo, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Jorge Franganillo',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dinant-_Adolphe_Sax_Statue_-_52287301461.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Dinant',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Minkä soittimen keksijä Adolphe Sax oli?',
      'Miksi Dinant on pitkä ja kapea kaupunki?',
    ],
    korostukset: ['Adolphe Sax|Adolphe Sax'],
    nappi: 'Kalliolinnakkeen alla Maasin rannalla; kaupungin poika Adolphe Sax on jo keksinyt saksofonin',
    // 4.91666667 E / 50.26666667 N — en-Wikipedia "Dinant"
    laudat: {
      maailmankartta: { x: 5997.2, y: 1378.6 },
      europe: { x: 305.6, y: 571.6 },
    },
    teksti: 'Dinant on Maas-joen varrella Ardenneilla Namurin maakunnassa sijaitseva kaupunki. Se '
      + 'on kasvanut jyrkän kalliojyrkänteen ja joen väliin, joten sen asutus on venynyt '
      + 'pitkäksi ja kapeaksi pohjois-eteläsuuntaiseksi kaistaksi. Kaupungin tunnusmerkki on '
      + 'Notre Damen kollegiaattikirkko, joka rakennettiin uudelleen goottilaiseen tyyliin '
      + 'sen jälkeen, kun kalliosta pudonneet lohkareet tuhosivat vanhan romaanisen kirkon '
      + 'vuonna 1227; kirkon yläpuolella kalliolla kohoaa 1000-luvulta peräisin oleva '
      + 'linnoitettu kaupunginlinnake. Perinteisiä elinkeinoja ovat messinkiesineiden '
      + 'valmistus sekä kalkkikiven louhinta, ja kaupungin kuuluisiin asukkaisiin kuuluu '
      + 'saksofonin keksinyt Adolphe Sax, jonka talossa on pieni museo. Dinantin couque on '
      + 'Euroopan kovin keksi.',
    lahde: 'en-Wikipedia "Dinant", johdanto-osa ja osiot "Geography", "History" ja "Sights" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-spa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-spa-4776ed42.jpg',
      lyhyt: 'Spa:n Pouhon Pierre-le-Grand -lähderakennus kupoleineen talviaamun auringossa.',
      selite: 'Kuvassa on Spa:n keskustan Pouhon Pierre-le-Grand -lähdepaviljonki, jonka kupolin kello ja julkisivun kirjoitus erottuvat. Tausta on metsäinen rinne.',
      lahde: 'Valokuva: Romaine, Wikimedia Commons (CC0).',
      tekija: 'Romaine',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Spa-Pouhon_Pierre-le-Grand_(1).jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-spa-8568fc1d.jpg',
        lyhyt: 'Pouhonin sisätila, jossa koristeelliset rautakaaret kannattavat lasikattoa.',
        selite: 'Kuva esittää Pouhon Pierre-le-Grand -lähderakennuksen talvipuutarhaa (Jardin d\'hiver): taottuja rautakaaria, lasikatto ja värillinen puolikaarikaari-ikkuna.',
        lahde: 'Valokuva: Norbert Schnitzler, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Norbert Schnitzler',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Spa_Pouhon-Pierre-Le-Grand_Jardin_d_hiver.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Spa',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mikä oli Spa-kaupungin roomalainen nimi?',
      'Mikä yleisnimi on saanut alkunsa Spa-kaupungin nimestä?',
    ],
    korostukset: ['kylpylä|kylpylälle'],
    nappi: 'Ardennien kylpyläkaupunki, jonka kylpylä valmistui 1868',
    // 5.86416667 E / 50.4925 N — en-Wikipedia "Spa, Belgium"
    laudat: {
      maailmankartta: { x: 6028.8, y: 1368.7 },
      europe: { x: 323.8, y: 565.6 },
    },
    teksti: 'Spa on kaupunki Wallonian Liègen maakunnassa Ardenneilla, ja sen nimestä on tullut '
      + 'yleisnimi kylpylälle eli paikalle, jonka kivennäisvesillä uskotaan olevan parantavia '
      + 'vaikutuksia. Kaupunki on tunnettu kivennäislähteistään ja maailmalle viedystä '
      + 'Spa-mineraalivedestä; sen ympäristössä on yli 300 kylmää kivennäislähdettä. Paikka '
      + 'tunnettiin jo roomalaisaikana nimellä Aquae Spadanae, ja Plinius vanhempi kertoi '
      + 'seudun kuplivasta lähteestä. Kaupungissa on ollut kasinoja 1700-luvulta lähtien, ja '
      + '1800-luvulla siitä kasvoi muodikas lomakohde, jossa Leopold II:n aikana rakennettiin '
      + 'muun muassa Thermal Baths -kylpylä vuonna 1868. Vuonna 2021 Spa liitettiin osaksi '
      + 'Unescon maailmanperintökohdetta Euroopan suuret kylpyläkaupungit.',
    lahde: 'en-Wikipedia "Spa, Belgium", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mistä sana spa eli kylpylä on saanut alkunsa?',
      vaihtoehdot: [
        'Belgialaisen Spa-kaupungin nimestä',
        'Roomalaisen parantajajumalan nimestä',
        'Ranskalaisen lääkärin nimestä',
        'Saksalaisen kylpyammeen nimestä',
      ],
      oikea: 0,
      fakta: 'Spassa pidettiin maailman ensimmäinen kauneuskilpailu 19. syyskuuta 1888.',
    },
  },
  {
    id: 'hahmotelma-brugge-belfry',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-brugge-belfry-e608eb4f.jpg',
      lyhyt: 'Bruggen Belfry-kellotorni kohoaa Markt-torin yllä, edessä hevosvaunuja.',
      selite: 'Kuvassa Bruggen keskiaikainen kellotorni ja sen alla oleva hallirakennus Markt-torin laidalla. Etualalla on turistivaunuja hevosineen.',
      lahde: 'Valokuva: Wolfgang Staudt, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Wolfgang Staudt',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bruges_Market_Square_and_Belfry.jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-brugge-belfry-00121b5b.jpg',
        lyhyt: 'Ilmakuva Bruggen Belfrystä ja Markt-torista.',
        selite: 'Ilmakuvassa Belfry-torni ja sen hallirakennus kohoavat punakattoisen vanhankaupungin yllä; vasemmalla näkyy Markt-tori joulumarkkinoineen.',
        lahde: 'Valokuva: Giles Laurent, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Giles Laurent',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:1012_Grand-Place_of_Bruges_and_Belfry_of_Bruges_Photo_by_Giles_Laurent.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Bruggen Belfry',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mitä Bruggen kellotornissa säilytettiin?',
      'Miksi torni on nykyään 83 metriä eikä 102 metriä korkea?',
    ],
    korostukset: ['kellotorni|kellotorni'],
    nappi: 'Markt-torin kellotorni, joka on palanut monta kertaa ja jonka huippu on 83 metrissä',
    // 3.22472222 E / 51.20833333 N — en-Wikipedia "Belfry of Bruges"
    laudat: {
      maailmankartta: { x: 5940.8, y: 1337.2 },
      europe: { x: 273.1, y: 546.8 },
    },
    teksti: 'Bruggen Belfry eli Belfort on keskiaikainen kellotorni Bruggen keskustassa ja yksi '
      + 'kaupungin tunnetuimmista symboleista. Torni lisättiin Markt-torille noin vuonna '
      + '1240, kun Brugge oli tärkeä flaamilaisen verkateollisuuden keskus, ja siinä '
      + 'säilytettiin aarteita ja kaupungin arkistoa; se toimi myös tähystyspaikkana '
      + 'tulipalojen ja muiden vaarojen havaitsemiseksi. Vuoden 1280 tulipalossa kaupungin '
      + 'arkisto tuhoutui, ja tornin yläosa rakennettiin suurelta osin uudelleen. '
      + 'Kahdeksankulmainen yläosa lisättiin vuosina 1483–1487, mutta salama poltti sen '
      + 'huipun vuonna 1493 ja tulipalo vuonna 1741, joten torni jäi 83 metriä korkeaksi '
      + 'ennen 102 metrin korkeutensa sijaan. Nykyään sen huipulle johtaa 366 askelmaa, ja se '
      + 'kallistuu 87 senttimetriä itään.',
    lahde: 'en-Wikipedia "Belfry of Bruges", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-tervuren',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-tervuren-34ae7699.jpg',
      lyhyt: 'AfricaMuseumin päärakennus ja sen edessä oleva puutarhalampi Tervurenissa.',
      selite: 'Kuvassa on Tervurenin Royal Museum for Central Africa -museon kupolirakennus ja sen edessä muotoiltu puisto lampineen.',
      lahde: 'Valokuva: Nenea hartia, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Nenea hartia',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Royal_Museum_for_Central_Africa_in_Tervuren.01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-tervuren-0d6b66a7.jpg',
        lyhyt: 'Museon edessä oleva lampi suihkulähteineen ja puisto Tervurenissa.',
        selite: 'Kuvassa Tervurenin museopuiston lampi (kuvatiedoston kuvaus: "vijver voor het museum"), jonka takana näkyy museorakennuksen kupoli ja metsäinen puisto.',
        lahde: 'Valokuva: Smiley.toerist, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Smiley.toerist',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Park_museum_Tervuren_2019_2.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Tervurenin Afrikka-museo',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mitä varten Tervurenin museorakennus alun perin rakennettiin?',
      'Mitä tapahtui näyttelyn puistossa asuneelle 60 kongolaiselle?',
    ],
    korostukset: ['Leopold II|Leopold II:n'],
    nappi: 'Kuninkaan kartanon puisto, johon vuonna 1897 rakennetaan Kongon-näyttely',
    // 4.5185 E / 50.8309 N — en-Wikipedia "Royal Museum for Central Africa"
    laudat: {
      maailmankartta: { x: 5984, y: 1353.8 },
      europe: { x: 298, y: 556.7 },
    },
    teksti: 'Royal Museum for Central Africa eli AfricaMuseum on Tervurenissa Flaamilaisessa '
      + 'Brabantissa aivan Brysselin ulkopuolella sijaitseva etnografinen ja '
      + 'luonnonhistoriallinen museo. Se rakennettiin alun perin esittelemään kuningas '
      + 'Leopold II:n Kongon vapaavaltiota vuoden 1897 maailmannäyttelyssä. Näyttelyn '
      + 'puistoon rakennettiin väliaikainen ihmistarha, afrikkalaisen kylän jäljitelmä, jossa '
      + 'asui näyttelyn ajan 60 kongolaista; seitsemän heistä kuoli pakkomajoituksensa aikana '
      + 'Belgiassa. Vuonna 1898 perustettu pysyvä Kongon museo toimi siirtomaapropagandan '
      + 'levittäjänä ja Belgian siirtomaatoiminnan tukena. Vuodesta 1960 museon painopiste on '
      + 'siirtynyt etnografiaan ja antropologiaan, ja vuosina 2013–2018 tehty uudistus '
      + 'korjasi myös näyttelyn vähäistä kriittisyyttä siirtomaahistoriaa kohtaan.',
    lahde: 'en-Wikipedia "Royal Museum for Central Africa", johdanto-osa ja osiot "History" ja '
      + '"Renovation (2013–2018)" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mitä varten Tervurenin Kongon museo perustettiin vuonna 1898?',
      vaihtoehdot: [
        'Belgialaisten taiteilijoiden näyttelysaliksi',
        'Kuninkaan yksityiseksi metsästysmuseoksi',
        'Siirtomaapropagandan ja -toiminnan tueksi',
        'Afrikkalaisten opiskelijoiden kouluksi',
      ],
      oikea: 2,
      fakta: 'Museo oli suljettuna marraskuusta 2013 joulukuuhun 2018 laajan remontin ajan.',
    },
  },
  {
    id: 'hahmotelma-durbuy',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-durbuy-08f7823e.jpg',
      lyhyt: 'Ourthe-joki virtaa Durbuyn kaupungin ja linnan ohi, joella melojia.',
      selite: 'Kuvassa Ourthe-joki, kivisilta sekä Durbuyn linna ja kirkko rinteellä. Joella meloo kanootteja.',
      lahde: 'Valokuva: JackyM59, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'JackyM59',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Durbuy_-_L\'Ourthe_et_le_château.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-durbuy-d0a64d98.jpg',
        lyhyt: 'Kivisiä taloja ja kivetty katu Durbuyn vanhassakaupungissa.',
        selite: 'Kuva esittää Durbuyn Rue Jean de Bohême -katua: harmaakivisiä taloja ja kadunkivetystä rinteen juurella.',
        lahde: 'Valokuva: JackyM59, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'JackyM59',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Durbuy_-_Rue_Jean_de_Bohême.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Durbuy',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Minkä tittelin Durbuy mainostaa itselleen?',
      'Mikä on Belgian virallisesti pienin kaupunki?',
    ],
    korostukset: ['pienimpänä|pienimpänä'],
    nappi: 'Ourthen mutkan pikkukaupunki, joka on ollut kaupunki jo vuodesta 1331',
    // 5.45633333 E / 50.35216667 N — en-Wikipedia "Durbuy"
    laudat: {
      maailmankartta: { x: 6015.2, y: 1374.8 },
      europe: { x: 316, y: 569.3 },
    },
    teksti: 'Durbuy on kaupunki Wallonian Belgian Luxemburgin maakunnassa Ourthe-joen varrella, '
      + 'ja kunnassa asui vuonna 2018 noin 11 400 ihmistä. Keskiajalla se oli tärkeä kaupan '
      + 'ja teollisuuden keskus, ja Luxemburgin kreivi ja Böömin kuningas Juhana korotti sen '
      + 'kaupungiksi vuonna 1331. Nykyinen linna on rakennettu vuonna 1880, ja siellä asuu '
      + 'Urselin suku. Durbuy mainostaa itseään kaupallisista syistä maailman pienimpänä '
      + 'kaupunkina, vaikka Belgian virallisesti pienin kaupunki on vuodesta 2006 lähtien '
      + 'Mesen. Nykyään kaupungin pääelinkeinoja ovat matkailu ja virkistys.',
    lahde: 'en-Wikipedia "Durbuy", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-oudenaarde',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-oudenaarde-bb91fa6e.jpg',
      lyhyt: 'Oudenaarden myöhäisgoottilainen kaupungintalo kellotorneineen.',
      selite: 'Kuvassa Oudenaarden kaupungintalon runsaskoristeinen julkisivu, keskitorni ja etualalla suihkukaivo torilla.',
      lahde: 'Valokuva: Herman.vandenbroeck, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Herman.vandenbroeck',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Oudenaarde_(East_Flanders,_Belgium)_late_Gothic_town_hall_and_belfry_tower.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-oudenaarde-72b75156.jpg',
        lyhyt: 'Poelmanin maalaus Oudenaarden kaupungintalosta vuodelta 1824.',
        selite: 'Pierre François Poelmanin öljymaalaus (1824) esittää Oudenaarden kaupungintaloa torilla, jolla on ihmisiä ja hevosia.',
        lahde: 'Maalaus: Pierre François Poelman, Wikimedia Commons (public domain).',
        tekija: 'Pierre François Poelman',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_Town_Hall_of_Oudenaarde_by_Pierre_François_Poelman_Rijksdienst_voor_het_Cultureel_Erfgoed_B2245.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-oudenaarde-827d7556.jpg',
        lyhyt: 'Oudenaardelainen verdure-kuvakudos 1500-luvun jälkipuoliskolta, eläimiä lehvästössä.',
        selite: 'Oudenaardessa 1550-1600 tienoilla kudottu kuvakudos, jossa on eläimiä ja lintuja runsaan lehvästön keskellä (Kunstgewerbemuseum Berlin).',
        lahde: 'Valokuva: Sailko, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Sailko',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Oudenaarde,_arazzo_con_verziere,_1550-1600_ca._02.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Oudenaarde',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Minkä tuotteen valmistuskeskuksena Oudenaarde oli tunnettu?',
      'Milloin Oudenaarden kaupungintalo rakennettiin?',
    ],
    korostukset: ['kuvakudos|kuvakudosten'],
    nappi: 'Kuvakudosten kaupunki, jonka loisto haihtui 1500-luvun lopun piirityksen jälkeen',
    // 3.6 E / 50.85 N — en-Wikipedia "Oudenaarde"
    laudat: {
      maailmankartta: { x: 5953.3, y: 1353 },
      europe: { x: 280.3, y: 556.2 },
    },
    teksti: 'Oudenaarde on kaupunki Itä-Flanderin maakunnassa Belgiassa Scheldt-joen varrella. '
      + '1400-luvulta 1700-luvulle ja erityisesti 1500-luvulla se oli tunnettu kuvakudosten '
      + 'tuotantokeskuksena. Keskiajalla kaupunki tuki uskollisesti Flanderin kreivejä, ja se '
      + 'rakennutti itselleen vuosina 1526–1537 goottilaistyylisen kaupungintalon. Vuonna '
      + '1582 kaupunki antautui Alexander Farnesen pitkän piirityksen jälkeen, minkä '
      + 'seurauksena useimmat kauppiaat, työläiset ja jopa aateliset pakenivat, eikä entinen '
      + 'loisto koskaan palannut. Kaupungintalo ja sen kellotorni ovat Unescon '
      + 'maailmanperintökohde vuodesta 1999, ja talossa on Oudenaarden kuvakudosten kokoelma.',
    lahde: 'en-Wikipedia "Oudenaarde", johdanto-osa ja osiot "History" ja "Sights" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-canal-du-centre',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-canal-du-centre-8e3f5b0f.jpg',
      lyhyt: 'Vanha hydraulinen laivanostin nro 1 Houdeng-Goegniesissa kanavan päästä nähtynä.',
      selite: 'Historiallisen Canal du Centren ensimmäinen laivanostin kanavalta katsottuna: teräsristikkorunko ja punatiilinen konehuone rannassa.',
      lahde: 'Valokuva: Willem123, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Willem123',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Canal_du_Centre_-_Lift_1_Houdeng-Goegnies_5671.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-canal-du-centre-9afa0895.jpg',
        lyhyt: 'Näkymä Houdeng-Goegniesin nostimen ristikkorakenteiden lomasta kanavaa pitkin.',
        selite: 'Nostimen nro 1 teräsristikoiden läpi näkyy kanava-allas ja kanavan jatkuminen. Kuva näyttää nostimen rautarakenteen läheltä.',
        lahde: 'Valokuva: Trougnouf (Benoit Brummer), Wikimedia Commons (CC BY 4.0).',
        tekija: 'Trougnouf (Benoit Brummer)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Canal_du_Centre_-_Ascenseur_no_1,_Houdeng-Goegnies_(DSCF7861).jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-canal-du-centre-34b2441d.jpg',
        lyhyt: 'Strépy-Thieun moderni funikulaarilaivanostin kohoaa niityn yllä.',
        selite: 'Strépy-Thieun uusi laivanostin (Thieu-Le Roeulx -puoli) on suurikokoinen betoni- ja lasirakennelma, joka nostaa aluksia kanavan tasosta toiseen. Näkymä eroaa vanhojen 1800-luvun ristikkonostimien ilmeestä.',
        lahde: 'Valokuva: Jleclerc, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jleclerc',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ascenseur_funiculaire_%C3%A0_bateaux_de_Thieu-Le_Roeulx.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Canal du Centren laivanostimet',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi Thieun ja Houdeng-Gœgnies\'n välillä ei voitu käyttää sulkuja?',
      'Kuka suunnitteli laivanostimet?',
    ],
    korostukset: ['laivanostin|laivanostinta'],
    nappi: 'Maasin ja Scheldtin välille tarvittaisiin 32 sulkua; laivanostimien ratkaisu keksitään vasta 1879',
    // 4.11 E / 50.47805556 N — en-Wikipedia "Canal du Centre (Belgium)"
    laudat: {
      maailmankartta: { x: 5970.3, y: 1369.3 },
      europe: { x: 290.1, y: 566 },
    },
    teksti: 'Canal du Centre on 20,9 kilometriä pitkä kanava Walloniassa, joka yhdistää Maasin ja '
      + 'Scheldtin vesistöt. Thieun ja Houdeng-Gœgnies\'n välillä kanava nousee 66 metriä 6 '
      + '790 metrin matkalla, mikä oli liian jyrkkä nousu sulkuportaille; siksi osuudella on '
      + 'neljä hydraulista laivanostinta vuosilta 1888–1917, jotka ovat nykyään Unescon '
      + 'maailmanperintökohde. Ne suunnitteli brittiläisen Clark, Stansfield & Clarkin '
      + 'insinööri Edwin Clark, joka ehdotti ratkaisua Belgian yleisten töiden ministeriölle '
      + 'vuonna 1879. Ensimmäisen laivanostimen avasi kuningas Leopold II 4. kesäkuuta 1888; '
      + 'kolme muuta valmistuivat vasta vuonna 1917, koska kanavan taloudellista tarvetta '
      + 'kyseenalaistettiin ja ensimmäinen maailmansota alkoi.',
    lahde: 'en-Wikipedia "Canal du Centre (Belgium)", johdanto-osa ja osiot "Route" ja "History" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Miksi Thieun ja Houdeng-Gœgnies\'n välillä käytettiin laivanostimia sulkujen sijaan?',
      vaihtoehdot: [
        'Kanava oli liian kapea sulkuportaille',
        'Nousu oli liian jyrkkä sulkuportaille',
        'Sulkujen rakentaminen oli kielletty kuninkaan päätöksellä',
        'Vesi oli siellä liian suolaista sulkuja varten',
      ],
      oikea: 1,
      fakta: 'Vuonna 2002 avattu laajennettu kanava korvasi vanhat nostimet kauppa-alusten '
        + 'reittinä uudella Strépy-Thieun laivanostimella.',
    },
  },
  {
    id: 'hahmotelma-grand-hornu',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-grand-hornu-38fab86e.jpg',
      lyhyt: 'Grand-Hornun punatiilinen sisäpiha ja Henri De Gorgen patsas.',
      selite: 'Kaarikäytävien ympäröimä nurmikkopiha entisessä hiilikaivos- ja konepajakompleksissa. Keskellä näkyy kompleksin perustajan patsas.',
      lahde: 'Valokuva: Schwickerath, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Schwickerath',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:B%C3%A2timents_du_Grands_Hornu.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-grand-hornu-f30cb97e.jpg',
        lyhyt: 'Uusklassinen porttikäytävä Grand-Hornun sisäpihalle.',
        selite: 'Kolmikaarinen uusklassinen portti johtaa Grand-Hornun toiselle sisäpihalle. Kompleksin rakennutti Henri De Gorge vuosina 1810-1830.',
        lahde: 'Valokuva: Jean-Pol GRANDMONT, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Jean-Pol GRANDMONT',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:0_Hornu_050322_(7).JPG',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-grand-hornu-fb287e7d.jpg',
        lyhyt: 'Grand-Hornun kaareutuva kaarikäytävä ja punatiiliset seinät.',
        selite: 'Punatiilinen kaarikäytävä kaartuu nurmikkopihan reunaa pitkin. Kuva näyttää, kuinka harkittua teollisuusarkkitehtuuria kompleksissa on.',
        lahde: 'Valokuva: Davidh820, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Davidh820',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_curves_of_Grand-Hornu.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Grand-Hornu',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Kuka rakensi Grand-Hornun hiilikaivoskompleksin ja työläiskylän?',
      'Mitä Grand-Hornun rakennuksissa on nykyään?',
    ],
    korostukset: ['työläiskylä|työläiskylä'],
    nappi: 'Suunnitelmallinen hiilikaivoskylä, jonka Henri De Gorge rakensi vuosina 1810–1830',
    // 3.83944444 E / 50.43527778 N — en-Wikipedia "Grand-Hornu"
    laudat: {
      maailmankartta: { x: 5961.3, y: 1371.2 },
      europe: { x: 284.9, y: 567.2 },
    },
    teksti: 'Grand-Hornu on vanha hiilikaivoskompleksi ja työläiskylä Hornussa Boussun kunnassa '
      + 'Monsin lähellä Belgiassa. Henri De Gorge rakensi sen vuosina 1810–1830, ja sitä '
      + 'pidetään ainutlaatuisena esimerkkinä toiminnallisesta kaupunkisuunnittelusta. '
      + 'Nykyään sen omistaa Hainautin maakunta, joka järjestää rakennuksissa vaihtuvia '
      + 'näyttelyitä. Grand-Hornu on yksi neljästä Wallonian teollisuuskohteesta, jotka '
      + 'Unesco merkitsi maailmanperintöluetteloon vuonna 2012.',
    lahde: 'en-Wikipedia "Grand-Hornu", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-bois-du-cazier',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-bois-du-cazier-07c4d53d.jpg',
      lyhyt: 'Bois du Cazierin entisen hiilikaivoksen tiilirakennukset ja kaksi nostotornia.',
      selite: 'Punatiiliset kaivosrakennukset, nostotornit ja pieni kaivosveturi kiskoilla entisellä kaivosalueella. Alue on nykyään museo.',
      lahde: 'Valokuva: Bourgeois.A, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Bourgeois.A',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Charbonnage_du_Bois_du_Cazier_01.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-bois-du-cazier-8a96d64b.jpg',
        lyhyt: 'Bois du Cazierin kaksi teräksistä nostotornia vierekkäin.',
        selite: 'Kaivosalueen kaksi nostotornia (chevalement) ja niiden edessä suuri pyörä. Taustalla näkyy entisiä kaivosrakennuksia.',
        lahde: 'Valokuva: Jmh2o, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jmh2o',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Marcinelle_-_Bois_du_Cazier_-_2018-04-22_-_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Bois du Cazier',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mitä Bois du Cazierin kaivoksessa tapahtui 8. elokuuta 1956?',
      'Mitä onnettomuuden jälkeen muuttui Euroopassa?',
    ],
    korostukset: ['Marcinelle|Marcinellessa'],
    nappi: 'Marcinellen hiilikaivos, jonka toimintalupa on myönnetty 1822',
    // 4.44333333 E / 50.38111111 N — en-Wikipedia "Bois du Cazier"
    laudat: {
      maailmankartta: { x: 5981.4, y: 1373.6 },
      europe: { x: 296.5, y: 568.6 },
    },
    teksti: 'Bois du Cazier oli hiilikaivos Marcinellessa lähellä Charleroita, ja se on nykyään '
      + 'säilytetty teollisuusperintökohteena. Kaivoksen toimintalupa myönnettiin '
      + 'kuninkaallisella asetuksella vuonna 1822, ja vuonna 1955 siellä työskenteli 779 '
      + 'ihmistä, joista monet olivat siirtolaistyöläisiä Italiasta. Tunnetuin tapahtuma on '
      + '8. elokuuta 1956 sattunut kaivosonnettomuus: hissikoneisto käynnistettiin ennen kuin '
      + 'kaivosvaunu oli kokonaan lastattu, sähkökaapelit repesivät ja kuiluun syttyi '
      + 'tulipalo, jonka savu ja hiilimonoksidi tappoi maan alle jääneet. Onnettomuudessa '
      + 'kuoli 262 työntekijää 12 eri kansallisuudesta, ja vain 13 selvisi, joten se on '
      + 'Belgian pahin kaivosonnettomuus. Sen jälkeen italialaisten siirtolaisuus Belgiaan '
      + 'loppui ja kaivosturvallisuussäännöt uusittiin kaikkialla Euroopassa.',
    lahde: 'en-Wikipedia "Bois du Cazier", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-seraing',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-seraing-f213a73a.jpg',
      lyhyt: 'Seraingin terästehtaan masuuni ja siirtohihnat Meuse-joen rannalla.',
      selite: 'Vuonna 2012 otettu kuva Cockerill-Sambren terästehtaasta Seraingissa: masuunin torni, kuumailmakuumentimet ja kuljettimet. Sama paikka on ollut John Cockerillin teollisuuden ydin 1800-luvulta.',
      lahde: 'Valokuva: Avandalen, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Avandalen',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cockerill-Sambre_2012-1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-seraing-2a28943e.jpg',
        lyhyt: 'Vanha värillinen näkymä Cockerillin tehdasalueesta Seraingissa Meuse-joen varrella.',
        selite: '1800-luvun litografia (Adrien Canelle) esittää masuunit, konepajat ja hiilikaivokset yhdistäneen Cockerill-yhtiön aluetta savuavine piippuineen joen rannalla. Kuvasta on rajattu pois paperin reunat ja alateksti.',
        lahde: 'Kaiverrus/litografia: Adrien Canelle, Wikimedia Commons (public domain).',
        tekija: 'Adrien Canelle',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C3%89tablissement_de_la_Soci%C3%A9t%C3%A9_Cockerill._Hauts-Fourneaux,_Ateliers_de_Construction,_Charbonnages_&&&_%C3%A0_Seraing_pr%C3%A8s_Li%C3%A8ge_(Belgique)_(Vue_g%C3%A9n%C3%A9rale).png',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-seraing-2faa0b82.jpg',
        lyhyt: 'Työntekijät uusimassa masuunin sisäpuolista vuorausta Seraingissa.',
        selite: 'Masuunin HF6 padan hiililohkoja ja työntekijöitä padan viimeisen vuorauksen uusimisen aikana vuoden 2007 lopussa. Kuva näyttää poikkeuksellisesti masuunin sisäpuolen.',
        lahde: 'Valokuva: Borvan53, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Borvan53',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:HF6_Seraing_-_R%C3%A9fection_du_creuset_2007_panoramic.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Seraingin terästehdas',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Kuka perusti Seraingiin yhtiön vuonna 1817?',
      'Mitä polttoainetta koksi korvasi Cockerillin masuuneissa?',
    ],
    korostukset: ['Cockerill|Cockerill'],
    nappi: 'Cockerillin rautatehdas, joka on toiminut jo yli viisikymmentä vuotta',
    // 5.5 E / 50.58333333 N — en-Wikipedia "Seraing"
    laudat: {
      maailmankartta: { x: 6016.7, y: 1364.7 },
      europe: { x: 316.8, y: 563.3 },
    },
    teksti: 'Seraing on kaupunki Liègen maakunnassa Walloniassa, ja se kuuluu Liègen noin 600 000 '
      + 'asukkaan kaupunkialueeseen. Ensimmäinen maininta on vuodelta 956, kun Saran-nimisen '
      + 'omistajan karolingiaikainen maatila lahjoitettiin Sint-Truidenin luostarille. '
      + 'Ensimmäiset rautatehtaat perustettiin Seraingiin vuonna 1809. John Cockerill ja '
      + 'hänen veljensä James mullistivat teräsalan käyttämällä masuuneja ja koksia '
      + 'perinteisen puuhiilen sijaan, ja näiden keksintöjen pohjalta perustettiin John '
      + 'Cockerill & Cie Seraingiin vuonna 1817. Kaupungin nähtävyyksiin kuuluu Val Saint '
      + 'Lambertin kristallitehtaan alue, jossa on vanha Val-Saint-Lambertin luostari.',
    lahde: 'en-Wikipedia "Seraing", johdanto-osa ja osiot "History" ja "Sights" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-turnhout',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-turnhout-61b17a3e.jpg',
      lyhyt: 'Turnhoutin pelikorttimuseon punatiilirakennus ja pelikorttihahmoa esittävä iso banderolli.',
      selite: 'Nationaal Museum van de Speelkaart toimii Druivenstraatilla Turnhoutissa punatiilisessa rakennuksessa. Julkisivun banderollissa on iso pelikorttikuningas.',
      lahde: 'Valokuva: Dablond, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Dablond',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Het_Nationaal_Museum_van_de_Speelkaart.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bel-nosto-turnhout-90c5b7d8.jpg',
        lyhyt: 'Turnhoutin linna, Brabantin herttuoiden vanha vesilinna.',
        selite: 'Tiilinen Turnhoutin linna torneineen ja liuskekattoineen kohoaa vallihaudan yllä. Linnassa toimii nykyisin oikeustalo.',
        lahde: 'Valokuva: Nenea hartia, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Nenea hartia',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castle_of_the_Dukes_of_Brabant.01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Turnhout',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Minkä tuotteen teollisuudesta Turnhout on tunnettu?',
      'Mikä teollisuus korvasi vuodevaatteiden kudonnan 1800-luvun alussa?',
    ],
    korostukset: ['pelikortti|pelikorttiteollisuudestaan'],
    nappi: 'Kaupunki, jonne kanava valmistui 1846 ja rautatie 1855; paperiteollisuus nostaa sen',
    // 4.95 E / 51.31666667 N — en-Wikipedia "Turnhout"
    laudat: {
      maailmankartta: { x: 5998.3, y: 1332.4 },
      europe: { x: 306.2, y: 544 },
    },
    teksti: 'Turnhout on Antwerpenin maakunnan kaupunki Flanderissa, jossa asui vuonna 2021 noin '
      + '46 000 ihmistä. Se tunnetaan pelikorttiteollisuudestaan, ja siellä sijaitsee '
      + 'maailman suurimman pelikorttien valmistajan Cartamundin pääkonttori. Kaupunki syntyi '
      + 'kahden tärkeän kauppareitin risteykseen Brabantin herttuoiden metsästyslinnan '
      + 'suojaan, ja se sai vapaakaupungin oikeudet noin vuonna 1212. Myöhäiskeskiajalla se '
      + 'oli tunnettu vuodevaatteiden kutomisesta ja pellavakaupasta, mutta 1800-luvun alussa '
      + 'nämä korvautuivat paperiin perustuvilla teollisuudenaloilla, joiden perustajina '
      + 'pidetään Pieter Corbeelsia ja Philippus Jacobus Brepolsia. Kanava kaivettiin vuonna '
      + '1846 ja rautatie rakennettiin vuonna 1855.',
    lahde: 'en-Wikipedia "Turnhout", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä tuotteen teollisuudesta Turnhout on erityisen tunnettu?',
      vaihtoehdot: [
        'Kristallilasin valmistuksesta',
        'Posliinin valmistuksesta',
        'Pelikorttien valmistuksesta',
        'Kuvakudosten kudonnasta',
      ],
      oikea: 2,
      fakta: 'Turnhoutin mukaan on nimetty kaksi taistelua, vuosilta 1597 ja 1789.',
    },
  },
];
