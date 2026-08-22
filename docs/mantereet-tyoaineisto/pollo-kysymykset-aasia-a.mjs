/*
 * PÖLLÖN VALMISKYSYMYKSET — AASIA, ERÄ A (20 kaupunkia).
 *
 * Työaineisto js/packs/pollo-kysymykset.js:n POLLO_VALMISKYSYMYKSET-
 * taulua varten: kunkin kaupungin lohko siirretään sellaisenaan
 * pääpakettiin. Muoto ja taso ovat pilottien (Firenze, Tampere,
 * Kairo, Tokio) mukaiset.
 *
 * SÄÄNNÖT, joita tässä erässä on noudatettu:
 *   - 'laatta' = yleisempiä, pelaaja seisoo kaupungissa kartalla
 *   - 'lehti'  = syventäviä, aiheet kaupungin oman lehden sisällöstä
 *   - täsmälleen 5 + 5, suomeksi, pelaajan äänellä, ≤ 70 merkkiä
 *   - aiheet pelin omasta aineistosta: js/packs/kulttuuri-kategoriat.js
 *     (kaupungin lohko) ja js/packs/nahtavyysjutut.js
 *   - EI päällekkäisyyttä kaupungin kulttuurivisan kanssa
 *     (js/packs/asia-questions.js, kysymys-kentät tarkistettu)
 *   - EI juonispoilereita: pöllö on tiedon hahmo, ei tarinan
 *
 * HERKÄT KOHTEET (docs/aasia-tyoaineisto/spec-asia.md, Raamattu):
 *   - Venäjän kaupungit (Jekaterinburg … Vladivostok): ei nykysotaa
 *     eikä nykypolitiikkaa; 1873-henkinen historia, kulttuuri,
 *     maantiede ja arktinen arki kantavat. Magadanin leirihistoria
 *     näkyy vain neutraalina muistomerkkikysymyksenä, kuten lehdessä.
 *   - Taipei ja Hongkong: ei asemakiista- eikä suvereniteetti-
 *     kysymyksiä, ei 2010–2020-lukujen protesteja; painotus 1800-luvun
 *     kauppa- ja satamahistoriaan, arkkitehtuuriin ja kulttuuriin.
 */

export const LOHKO = {
  jekaterinburg: {
    laatta: [
      'Miksi kaupunki rakennettiin padon ympärille?',
      'Miksi vanha rupla oli neliskulmainen kuparilaatta?',
      'Kuka oli Vasili Tatištšev?',
      'Mitä malakiitti on, ja mihin sitä käytettiin?',
      'Miksi Jekaterinburgia sanottiin ikkunaksi Aasiaan?',
    ],
    lehti: [
      'Kuinka vanha Šigirin suosta löytynyt puuveistos on?',
      'Mistä Bažovin Malakiittilipas kertoo?',
      'Mikä uusi alkuaine löytyi Uralin kultakaivoksen kivestä?',
      'Miksi Jekaterinburg oli Venäjän ainoa vuorikaupunki?',
      'Millainen talo on Kharitonovin kartano?',
    ],
  },

  astana: {
    laatta: [
      'Mikä Bajterek on, ja mitä sen kultainen muna tarkoittaa?',
      'Kuinka suuri Khan Shatyrin teltta on?',
      'Mitä nimi Aqmola tarkoittaa?',
      'Miksi kaupunki on vaihtanut nimeään kuusi kertaa?',
      'Kuinka kylmä Astanan talvi on?',
    ],
    lehti: [
      'Kuka suunnitteli uuden pääkaupungin kaavan?',
      'Mikä oli Bozok, joka oli täällä ennen kaupunkia?',
      'Mitä uudisviljelyskampanja teki Akmolinskille?',
      'Millainen rakennus Rauhan ja sovinnon pyramidi on?',
      'Mitä Akordan katolla oleva kuvio esittää?',
    ],
  },

  novosibirsk: {
    laatta: [
      'Mitä talonpoikien sanonta joki on putkessa tarkoitti?',
      'Kuinka suuri Novosibirskin oopperatalo on?',
      'Kuka on viulisti Vadim Repin?',
      'Miksi kaupungin nimi oli ennen Novonikolajevsk?',
      'Kuinka nopeasti kaupungista kasvoi miljoonakaupunki?',
    ],
    lehti: [
      'Miksi aseman nimi oli pitkään pelkkä Ob?',
      'Millainen oli Obin ensimmäinen rautatiesilta?',
      'Kuka arkkitehti piirsi kaupungin komeimmat talot?',
      'Miksi Aleksanteri Nevskin katedraali on punatiiltä?',
      'Mikä on Satohuoneiston talo?',
    ],
  },

  irkutsk: {
    laatta: [
      'Miksi Irkutskia sanottiin Siperian Pariisiksi?',
      'Mitä Kjahtan rajakaupan kautta tuotiin Kiinasta?',
      'Kuka oli ruhtinas Volkonski, ja miksi hän päätyi tänne?',
      'Mitä vuoden 1879 tulipaloissa tuhoutui?',
      'Miksi Irkutskin puutalot ovat niin koristeellisia?',
    ],
    lehti: [
      'Mistä laulu Loistava meri, pyhä Baikal kertoo?',
      'Millainen kala golomjanka on?',
      'Mitä Siperian barokki tarkoittaa?',
      'Miksi jäänmurtaja Angara tilattiin Englannista?',
      'Mitä 130. korttelissa on nähtävää?',
    ],
  },

  jakutsk: {
    laatta: [
      'Kuka perusti Jakutskin, ja milloin?',
      'Miksi linnoitus siirrettiin joen toiselle rannalle?',
      'Mikä soitin khomus on?',
      'Millainen joki Lena on?',
      'Kuka oli Kate Marsden?',
    ],
    lehti: [
      'Miksi kauppias Šergin kaivatti kuiluaan yhdeksän vuotta?',
      'Mitä Jakutskin mammuttimuseossa on?',
      'Miten Lenan pilarit ovat syntyneet?',
      'Miksi Jakutskissa on peräti neljä teatteria?',
      'Kuka oli kirjailija Platon Ojunski?',
    ],
  },

  magadan: {
    laatta: [
      'Miksi Nagajevanlahti valittiin sataman paikaksi?',
      'Miten kaupunki sai alkunsa vuonna 1929?',
      'Miksi Magadaniin ei tule rautatietä?',
      'Kuka oli laulaja Vadim Kozin?',
      'Ketä Surun maski -muistomerkki muistaa?',
    ],
    lehti: [
      'Miksi kaupungin yleinen sauna on suojeltu rakennus?',
      'Mitä lyhenne SVZ tarkoittaa?',
      'Kuinka paljon lintuja Jamskin saarilla pesii?',
      'Miksi kyttyrälohelle kasvaa selkään kyttyrä?',
      'Kuinka suuri lintu kuningasmerikotka on?',
    ],
  },

  kamtsatka: {
    laatta: [
      'Mistä Petropavlovsk sai nimensä?',
      'Kuka oli Stepan Krašeninnikov?',
      'Keitä itelmeenit ovat?',
      'Mitä jukola tarkoittaa?',
      'Kuinka pitkä Kamtšatkan niemimaa on?',
    ],
    lehti: [
      'Miksi korppi Kutkhia moitittiin liiasta ahkeruudesta?',
      'Kuinka korkea Kljutševskaja sopka on?',
      'Mitkä ovat Petropavlovskin kotitulivuoret?',
      'Miten Gejsirien laakso löydettiin?',
      'Miksi juuri täällä maankuori liikkuu niin paljon?',
    ],
  },

  sahalin: {
    laatta: [
      'Kuinka pitkä ja kapea saari Sahalin on?',
      'Miksi kartanpiirtäjät epäilivät Sahalinia niemeksi?',
      'Miten saarella kala säilöttiin ilman suolaa?',
      'Millainen talo oli ryv-kuoppatalo?',
      'Kuka oli Bronisław Piłsudski?',
    ],
    lehti: [
      'Miksi Anton Tšehov matkusti Sahalinille?',
      'Mitä Tšehov kirjasi kymmeneentuhanteen korttiinsa?',
      'Miksi saarelle perustettiin pakkotyösiirtola?',
      'Mitä vuoden 1875 sopimuksessa vaihdettiin?',
      'Millaista työtä saaren vangit tekivät?',
    ],
  },

  vladivostok: {
    laatta: [
      'Miksi lahti sai nimen Kultainen sarvi?',
      'Kuka oli Nikolai Muravjov-Amurski?',
      'Miksi Vladivostokissa on funikulaari?',
      'Millainen metsä Ussurin taiga on?',
      'Kuka oli täällä syntynyt näyttelijä Yul Brynner?',
    ],
    lehti: [
      'Kuinka suuri amurintiikeri on?',
      'Kuka oli opas Dersu Uzala?',
      'Miksi kaupungin ympärille rakennettiin merilinnoitus?',
      'Mikä oli kauppahuone Kunst & Albers?',
      'Miksi Pokrovskin puisto oli ennen hautausmaa?',
    ],
  },

  ulanbator: {
    laatta: [
      'Miksi kaupungin nimi on vaihtunut viisi kertaa?',
      'Miten luostarikaupunki vaelsi paikasta toiseen?',
      'Mikä Naadam-juhla on?',
      'Kuka oli Bogd Khan?',
      'Miksi Ulan Bator on maailman kylmin pääkaupunki?',
    ],
    lehti: [
      'Miksi jurtta-alueet kasvoivat 1990-luvun jälkeen?',
      'Millainen luostari Gandantegchinlen on?',
      'Mitä teekaravaanit kuljettivat Urgan kautta?',
      'Kuka oli Zanabazar?',
      'Mihin Choijin Laman temppeliä käytettiin?',
    ],
  },

  peking: {
    laatta: [
      'Kuinka monta huonetta keisarin palatsissa oikeasti on?',
      'Miksi Peking-ankka paistetaan riippu-uunissa?',
      'Mitä nimi Beijing tarkoittaa?',
      'Miksi kaupungilla on ollut viisi eri nimeä?',
      'Miten Peking-ooppera sai alkunsa?',
    ],
    lehti: [
      'Miksi Taivaan temppelissä toistuu luku yhdeksän?',
      'Mitä Vanhalle kesäpalatsille tapahtui vuonna 1860?',
      'Miksi Jingshanin kukkula on kasattu käsivoimin?',
      'Mihin rumpu- ja kellotornia käytettiin?',
      'Miksi Yonghe-temppelin katot ovat keltaiset?',
    ],
  },

  soul: {
    laatta: [
      'Kuinka pitkä Soulin vanha kaupunginmuuri oli?',
      'Mitä Namdaemunin portille tapahtui vuonna 2008?',
      'Millainen talo hanok on?',
      'Miten palatsin vartionvaihto esitetään?',
      'Mikä jjimjilbang on?',
    ],
    lehti: [
      'Kuka rakennutti Bukchonin hanok-korttelin?',
      'Miksi kuninkaat viihtyivät Changdeokgungissa paremmin?',
      'Mikä Jongmyon esi-isien pyhäkkö on?',
      'Miksi Bosingakin kelloa lyötiin 33 kertaa?',
      'Mikä on pojangmacha eli katettu vaunu?',
    ],
  },

  kioto: {
    laatta: [
      'Miksi Kioto säästyi toisen maailmansodan pommituksilta?',
      'Mitä eroa on geikolla ja maikolla?',
      'Mikä Ōnin-sota oli?',
      'Mitä kaupungille tapahtui, kun keisari muutti 1869?',
      'Miksi Kioton kadut kulkevat suorassa ruudukossa?',
    ],
    lehti: [
      'Miksi Kultainen paviljonki on kolmea eri rakennustapaa?',
      'Miksi Hopeista paviljonkia ei koskaan hopeoitu?',
      'Millainen on Kiyomizu-deran puinen lava?',
      'Kuinka monta Kannon-patsasta Sanjūsangen-dōssa on?',
      'Miksi Fushimi Inarilla on tuhansia punaisia portteja?',
    ],
  },

  xian: {
    laatta: [
      'Miksi kaupungin nimi oli ennen Chang’an?',
      'Miksi Kellotornia siirrettiin kilometrin verran?',
      'Miksi Rumpitorni ja Kellotorni ovat pari?',
      'Miksi kaupungin suuressa moskeijassa ei ole minareettia?',
      'Miksi Xi’an oli niin monen dynastian pääkaupunki?',
    ],
    lehti: [
      'Kuinka suuri Weiyangin palatsi oli?',
      'Millainen ruudukkokaupunki Tang-ajan Chang’an oli?',
      'Kuka oli munkki Xuanzang?',
      'Miksi Suuri villihanhipagoda rakennettiin?',
      'Mikä Steelametsän museo on?',
    ],
  },

  shanghai: {
    laatta: [
      'Millainen talo shikumen on?',
      'Millaista elämää lilong-kujakorttelissa vietetään?',
      'Millainen kieli shanghain murre on?',
      'Mitä Shanghaissa syödään aamiaiseksi?',
      'Milloin Shanghai avattiin ulkomaankaupalle?',
    ],
    lehti: [
      'Kuka rakennutti Yun puutarhan ja kenelle?',
      'Mistä Hienohko jadekivi on peräisin?',
      'Miksi Waibaidun sillan ylityksestä piti maksaa?',
      'Mitä puiston avioliittotorilla tehdään?',
      'Miksi Dajingin pavilonki on ainoa muurin jäänne?',
    ],
  },

  taipei: {
    laatta: [
      'Miten teekauppa kasvatti kylistä kaupungin?',
      'Keitä Ketagalan-kansa oli?',
      'Miksi kaupunginmuuri ei aluksi pysynyt pystyssä?',
      'Mitä Beitoun kuumissa lähteissä tehdään?',
      'Mitä Dihua-kadulla myytiin 1800-luvulla?',
    ],
    lehti: [
      'Miksi kaupunkia kutsuttiin aikanaan Taihokuksi?',
      'Millainen rakennus Punainen talo alun perin oli?',
      'Kuinka kauan palatsimuseon kokoelma oli matkalla?',
      'Miksi Lungshan-temppeli on rakennettu monta kertaa?',
      'Mikä Bopiliaon vanha kortteli on?',
    ],
  },

  hongkong: {
    laatta: [
      'Miksi Hongkongissa rakennetaan niin korkealle?',
      'Milloin kaksikerroksiset raitiovaunut tulivat kaduille?',
      'Millainen vene sampaani on?',
      'Miksi Victoria-satama on niin hyvä satama?',
      'Mitä Victoria Peakilla on nähtävää?',
    ],
    lehti: [
      'Miksi Hongkong syntyi kolmessa eri osassa?',
      'Kuka löysi ruttobakteerin Hongkongissa vuonna 1894?',
      'Kenelle Man Mo -temppeli on omistettu?',
      'Miksi Tsim Sha Tsuin kellotorni seisoo yksinään?',
      'Millainen talo on parvekkeellinen tong lau?',
    ],
  },

  kanton: {
    laatta: [
      'Mitä kolmetoista faktoriaa olivat?',
      'Miksi suuret purjelaivat ankkuroivat Whampoaan?',
      'Miltä 1800-luvun Kanton näytti kattojen yli?',
      'Mikä Cohong-kilta oli?',
      'Miksi kaupunkia sanotaan kukkien kaupungiksi?',
    ],
    lehti: [
      'Mitä Kantonista lastattiin laivoihin länteen vietäväksi?',
      'Kuka oli hong-kauppias Wu Bingjian?',
      'Miksi Shamianin särkästä tehtiin saari?',
      'Millainen rakennus Chenin suvun sali on?',
      'Miksi Zhenhai-torni rakennettiin juuri kukkulalle?',
    ],
  },

  manila: {
    laatta: [
      'Mikä Manilan galleonikauppa oli?',
      'Miksi Intramuros ympäröitiin kivimuurilla?',
      'Mikä Binondon kortteli on?',
      'Millainen paikka Maynila oli ennen espanjalaisia?',
      'Mikä Rizal-puisto on?',
    ],
    lehti: [
      'Miksi San Agustinin kirkko on yhä pystyssä?',
      'Mitä maanjäristysbarokki tarkoittaa?',
      'Miksi Manilan katedraali rakennettiin kahdeksan kertaa?',
      'Mistä Escolta-katu sai nimensä?',
      'Millainen linnoitus Fort Santiago on?',
    ],
  },

  hanoi: {
    laatta: [
      'Mitä nimi Thăng Long tarkoittaa?',
      'Miksi Vanhassakaupungissa puhutaan 36 kadusta?',
      'Mistä Hoàn Kiếm -järvi sai nimensä?',
      'Mitä sana hàng kadunnimissä tarkoittaa?',
      'Miksi kaupunki on vaihtanut nimeä niin monta kertaa?',
    ],
    lehti: [
      'Mitä kivikilpikonnien selässä oleviin steeloihin kaiverrettiin?',
      'Miksi Yhden pilarin pagodi rakennettiin lammelle?',
      'Kuka oli kenraali Gao Pian?',
      'Kuinka pitkä Long Biênin silta on?',
      'Mikä Ô Quan Chưởng -portti on?',
    ],
  },
};
