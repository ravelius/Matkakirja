/*
 * IHMISEN MATKA — VIRTOJEN AINEISTO (docs/moduulit/ihmisen-matka-virrat.md
 * luvut 2, 3 ja 11; omistajan päätökset 6.9.2026).
 *
 * Viisi virtaa + kaksi kerrosta:
 *
 *   0 paavirta   Afrikka → Arabia → Intia → Sunda → Sahul; Itä-Aasia   meripihka
 *   1 eurooppa   Balkan → koko Eurooppa → Fennoskandia → Islanti        sininen
 *   2 siperia    Altai → Siperia → arktinen rannikko → Tšuktšit          sinivihreä
 *   3 amerikat   Beringia (lukee Siperian kentän) → koko Amerikat        Siperian sävystä turkoosin kautta vihreään
 *   4 tyynimeri  Taiwan → Lapita → Polynesia; Borneo → Madagaskar        ruusu, merivirtana
 *   retki        Skhul/Qafzeh ja Al Wusta: sammuva läikkä, katoaa 70 ka mennessä
 *   vanha        neandertalilaiset ja denisovalaiset: haalea harmaa alue 300–40 ka
 *
 * KAIKKI AJAT OVAT VUOSIA SITTEN. Luvut ovat MALLIN säätöarvoja, eivät
 * tutkimuksen väitteitä: lähteet ja haarukat ovat pysäkkidatassa
 * (js/linssit/ihmisen-matka-data.js), ja tämä taulu asettaa nopeudet,
 * portit ja ylitykset niin, että malli osuu niihin (luku 2 "Malli").
 * Yksinkertaistukset, jotka tekstin pitää täsmentää: luku 4.
 *
 * Laatikko on { lat: [etelä, pohjoinen], lon: [länsi, itä] }; pituusväli
 * saa kiertää antimeridiaanin. Portin `avautuu` on vuosia sitten, ja
 * laskenta rosoittaa laatikon reunan (päätös 13). Portin `luisu`
 * { leveys, vuodet } on rajan ULKOPUOLINEN kaista, jolla lähestyminen
 * hidastuu neliöllisesti rajaa kohti (hionta 6.9.2026: rappusreunat
 * pois); ilman kenttää laskenta antaa oletuksen (portinLuisu).
 *
 * VÄRIT: `vanha` on vanhan alueen sävy (n. 75 % peitto, hieman
 * tummempi) ja `rintama` rintaman kirkkaampi reuna (päätös 2).
 */

/** Siperian sävy — myös Amerikkojen liu'un lähtökohta (päätös 11). */
const SIPERIA_VARI = { vanha: '#3AAFA5', rintama: '#9BE8E0' };

export const IHMISEN_MATKA_VIRRAT = [
  {
    tunnus: 'paavirta',
    nimi: 'Päävirta',
    vari: { vanha: '#D9731E', rintama: '#FFB347' },
    // Afrikan sisäinen leviäminen hidasta, rannikkosprintti 90 ka:sta,
    // manner-Aasiassa 50 ka:sta maltillisempi (luku 2.1).
    nopeus: [[300000, 0.05], [90000, 2.0], [50000, 0.9]],
    sisamaa: 0.45,
    // Muiden virtojen alueet: Eurooppa, Siperia ja Amerikat.
    pois: [
      { lat: [35, 90], lon: [-30, 26] },
      { lat: [42, 90], lon: [26, 60] },
      { lat: [50, 90], lon: [60, 180] },
      { lat: [50, 90], lon: [-180, -168] },
      { lat: [-90, 90], lon: [-168, -30] },
      { lat: [59, 90], lon: [-30, -10] },
    ],
    lahteet: [
      { nimi: 'Jebel Irhoud', lat: 31.855, lon: -8.8725, aika: 300000 },
      { nimi: 'Omo Kibish', lat: 4.8004, lon: 35.9671, aika: 233000 },
      { nimi: 'Pinnacle Point', lat: -34.2078, lon: 22.0894, aika: 164000 },
    ],
    portit: [
      // Onnistunut lähtö Afrikasta n. 70 ka: Levantti ja Arabia.
      { nimi: 'Levantti ja Arabia', alue: [{ lat: [16, 36], lon: [32, 50] }], avautuu: 72000 },
      // Rannikkoreitti itään.
      { nimi: 'Aasia', alue: [{ lat: [-90, 90], lon: [48, 180] }], avautuu: 76000 },
      { nimi: 'Anatolia ja Kaukasus', alue: [{ lat: [36, 45], lon: [25, 48] }], avautuu: 48000 },
      { nimi: 'Pohjoinen Itä-Aasia', alue: [{ lat: [28, 50], lon: [95, 150] }], avautuu: 45000 },
      // Tiibetin ylänkö myöhään. Reuna rosoinen, ja LUISU (laskennan
      // portinLuisu) hidastaa lähestymisen 3° kaistalla ylängön
      // juurelle: etelässä väri odottaa Intiasta 70 ka, idässä 45 ka,
      // joten kaistan viive on pitkä (30 000 v), jotta luisu näkyy
      // kummallakin laidalla eikä rappusreuna jää.
      { nimi: 'Tiibet', alue: [{ lat: [28, 38], lon: [78, 100] }], avautuu: 40000, reuna: 3, luisu: { leveys: 3, vuodet: 30000 } },
    ],
    ylitykset: [
      { nimi: 'Bab-el-Mandeb', a: { lat: 11.8, lon: 42.9 }, b: { lat: 13.0, lon: 43.7 }, ikkuna: [78000, 55000], kesto: 500 },
      { nimi: 'Borneo (Sunda)', a: { lat: 2.5, lon: 102.5 }, b: { lat: 1.0, lon: 110.0 }, ikkuna: [80000, 12000], kesto: 300 },
      { nimi: 'Sulawesi', a: { lat: 1.0, lon: 117.5 }, b: { lat: 0.5, lon: 120.0 }, ikkuna: [60000, 40000], kesto: 500 },
      { nimi: 'Torres', a: { lat: -11.0, lon: 142.5 }, b: { lat: -8.5, lon: 142.5 }, ikkuna: [60000, 8000], kesto: 300 },
      { nimi: 'Tasmania', a: { lat: -38.5, lon: 146.5 }, b: { lat: -41.0, lon: 146.5 }, ikkuna: [40000, 12000], kesto: 500 },
      { nimi: 'Japani', a: { lat: 35.0, lon: 129.0 }, b: { lat: 33.5, lon: 130.5 }, ikkuna: [40000, 15000], kesto: 500 },
      { nimi: 'Taiwan', a: { lat: 25.0, lon: 119.5 }, b: { lat: 24.5, lon: 121.0 }, ikkuna: [30000, 12000], kesto: 300 },
    ],
    nauhat: [
      // Wallacea → Sahul saarihypyin (Madjedbebe 65–50 ka).
      {
        nimi: 'Wallacea–Sahul',
        sade: 110,
        pisteet: [[-8.4, 115.2, 67000], [-8.5, 116.5, 66800], [-8.6, 121.0, 66300], [-9.2, 125.0, 65800], [-15.5, 124.5, 65200]],
      },
    ],
  },
  {
    tunnus: 'eurooppa',
    nimi: 'Eurooppa',
    vari: { vanha: '#2E63C9', rintama: '#7FAAFF' },
    nopeus: 1.2,
    sisamaa: 0.5,
    alue: [
      { lat: [35, 90], lon: [-30, 26] },
      { lat: [42, 90], lon: [26, 60] },
    ],
    lahteet: [{ nimi: 'Bacho Kiro', lat: 42.9467, lon: 25.4303, aika: 45000 }],
    portit: [
      // Jääkauden jää: Fennoskandia ja Pohjois-Venäjä, Britannian
      // pohjoisosa, Irlanti; Tanska ja Etelä-Ruotsi vähän aiemmin.
      // Eurooppa on jään juurella jo 40 ka, joten luisun viive on pitkä.
      { nimi: 'Fennoskandia', alue: [{ lat: [58, 90], lon: [4, 32] }], avautuu: 11000, luisu: { leveys: 2.5, vuodet: 30000 } },
      { nimi: 'Pohjois-Venäjä', alue: [{ lat: [57, 90], lon: [32, 60] }], avautuu: 11000, luisu: { leveys: 2.5, vuodet: 30000 } },
      { nimi: 'Tanska ja Etelä-Ruotsi', alue: [{ lat: [54, 58], lon: [8, 32] }], avautuu: 14000 },
      { nimi: 'Pohjois-Britannia', alue: [{ lat: [53.5, 62], lon: [-11, 2] }], avautuu: 12000 },
      { nimi: 'Irlanti', alue: [{ lat: [51, 56], lon: [-11, -5] }], avautuu: 10000 },
    ],
    ylitykset: [
      { nimi: 'Islanti', a: { lat: 62.0, lon: 5.5 }, b: { lat: 64.8, lon: -18.5 }, ikkuna: [1150, 1000], kesto: 50 },
    ],
  },
  {
    tunnus: 'siperia',
    nimi: 'Siperia',
    vari: SIPERIA_VARI,
    nopeus: 0.9,
    sisamaa: 0.6,
    alue: [
      { lat: [50, 90], lon: [60, 180] },
      { lat: [50, 90], lon: [-180, -168] },
    ],
    // Haarautuu päävirrasta Altailla (Denisova n. 50 ka; päätös 11: n. 45 ka).
    lahteet: [{ nimi: 'Altai', lat: 51.3975, lon: 84.6761, aika: 48000 }],
    portit: [
      // Yksi laatikko antimeridiaanin yli (ei kahta vierekkäistä): portin
      // luisu lasketaan laatikon syvyydestä, ja kahden laatikon sauma
      // 180°:ssa olisi näennäinen reuna.
      { nimi: 'Arktinen Siperia', alue: [{ lat: [62, 90], lon: [60, -168] }], avautuu: 35000, luisu: { leveys: 3, vuodet: 30000 } },
    ],
  },
  {
    tunnus: 'amerikat',
    nimi: 'Amerikat',
    vari: {
      vanha: '#2E9E4F',
      rintama: '#8CE38F',
      // Sävy liukuu KELLON mukaan 17 → 11 ka koko alueella: Siperian
      // sinivihreä → turkoosi → vihreä (eriytyvä populaatio, päätökset 1 ja 11).
      liuku: [
        { aika: 17000, ...SIPERIA_VARI },
        { aika: 14000, vanha: '#159FB8', rintama: '#63D9F0' },
        { aika: 11000, vanha: '#2E9E4F', rintama: '#8CE38F' },
      ],
    },
    // Rannikkoreitti Alaskasta Chileen parissatuhannessa vuodessa; sisämaa hitaammin.
    nopeus: 9,
    sisamaa: 0.3,
    alue: [
      { lat: [-90, 90], lon: [-168, -30] },
      { lat: [59, 90], lon: [-30, -10] },
    ],
    /*
     * BERINGIAN PORTTI LUKEE SIPERIAN KENTÄN (päätös 11): lähtö on
     * Tšuktšien saapumisaika Siperian kentässä, aikaisintaan ikkunan
     * avautuessa, ja Sewardin niemimaa värjäytyy `kesto` vuotta
     * myöhemmin. Lukupiste on 176°W, koska lauta katkeaa 175°W:ssä ja
     * niemimaan kärki 170°W puuttuu maskista (tools/tee-maamaski.mjs).
     */
    lahteetToisesta: [
      {
        nimi: 'Beringia', virta: 'siperia', lue: { lat: 66.0, lon: -176.0 },
        lat: 65.0, lon: -164.5, ikkuna: [17000, 11000], kesto: 300,
      },
    ],
    portit: [
      // Jään reunat rosoisina (reuna 3°) ja LUISULLA: Amerikkojen virta
      // saapuu jään juurelle 16–15 ka, joten 2° kaistan viive on lyhyt
      // (5 000 v) — rintama hidastuu jäätä vasten pehmeästi eikä pysähdy
      // porrasreunaan (hionta 6.9.2026, omistajan huomio 15 ka).
      // Laurentiden länsireuna on -116 (Albertan juuri), ei -120: kaista
      // ja rosoreuna ulottuivat muuten Tyynenmeren rannikolle ja
      // viivyttivät rannikkoreitin 15,7 → 14,8 ka (mitattu Vancouver).
      // Kordillera jatkuu samaan rajaan, jottei väliin jää aukkoa
      // (jäätön käytävä avautui vasta n. 14 ka, rannikko ennen sitä).
      { nimi: 'Kordilleran rannikko', alue: [{ lat: [48, 62], lon: [-145, -116] }], avautuu: 16000, reuna: 3, luisu: { leveys: 2, vuodet: 5000 } },
      { nimi: 'Laurentide', alue: [{ lat: [47, 90], lon: [-116, -55] }], avautuu: 13000, reuna: 2, luisu: { leveys: 2, vuodet: 5000 } },
      { nimi: 'Keskilänsi', alue: [{ lat: [40, 47], lon: [-105, -75] }], avautuu: 14000, reuna: 3, luisu: { leveys: 2, vuodet: 5000 } },
      { nimi: 'Arktinen Kanada ja Grönlanti', alue: [{ lat: [62, 90], lon: [-140, -10] }], avautuu: 4500 },
    ],
    ylitykset: [
      { nimi: 'Kuuba', a: { lat: 21.5, lon: -87.0 }, b: { lat: 22.0, lon: -84.0 }, ikkuna: [6500, 3000], kesto: 300 },
      { nimi: 'Hispaniola', a: { lat: 20.0, lon: -76.0 }, b: { lat: 19.5, lon: -72.0 }, ikkuna: [6000, 3000], kesto: 300 },
      { nimi: 'Grönlanti', a: { lat: 71.0, lon: -73.0 }, b: { lat: 69.5, lon: -53.0 }, ikkuna: [4500, 2000], kesto: 200 },
    ],
  },
  {
    tunnus: 'tyynimeri',
    nimi: 'Tyynimeri',
    vari: { vanha: '#D63A94', rintama: '#FF9AD0' },
    nopeus: 3,
    sisamaa: 0.5,
    alue: [
      { lat: [-50, 25], lon: [118, 180] },
      { lat: [-50, 25], lon: [-180, -100] },
      { lat: [-27, -11], lon: [42, 52] },
    ],
    pois: [{ lat: [-45, -10], lon: [112, 155] }],
    nauhat: [
      {
        nimi: 'Austronesia ja Lapita',
        sade: 100,
        pisteet: [
          [23.5, 121.0, 5500], [18.5, 121.5, 4800], [15.0, 121.0, 4500], [8.0, 125.0, 4300], [1.5, 125.0, 4000],
          [0.9, 127.9, 3900], [-2.1, 147.0, 3600], [-3.3, 152.0, 3450], [-5.5, 150.5, 3400], [-6.2, 155.3, 3300],
          [-9.6, 160.2, 3200], [-10.7, 165.85, 3100], [-15.4, 166.9, 3050], [-17.7, 168.35, 3000], [-17.8, 178.0, 2950],
          [-21.15, -175.2, 2850], [-13.85, -171.75, 2800],
        ],
      },
      { nimi: 'Guam', sade: 80, pisteet: [[16.0, 122.0, 4500], [13.45, 144.75, 3500]] },
      { nimi: 'Uusi-Kaledonia', sade: 80, pisteet: [[-17.7, 168.35, 3000], [-21.5, 165.5, 2900]] },
      // Pitkä tauko Samoalla; Itä-Polynesia vasta n. 1 100 vuotta sitten.
      {
        nimi: 'Itä-Polynesia',
        sade: 100,
        pisteet: [[-13.85, -171.75, 1150], [-21.25, -159.8, 1100], [-17.65, -149.45, 1050], [-8.9, -140.1, 1000], [19.6, -155.5, 900]],
      },
      { nimi: 'Rapa Nui', sade: 90, pisteet: [[-17.65, -149.45, 1050], [-23.1, -134.95, 950], [-27.1, -109.35, 800]] },
      { nimi: 'Aotearoa', sade: 110, pisteet: [[-21.25, -159.8, 1000], [-41.5, 174.06, 750]] },
      { nimi: 'Madagaskar', sade: 100, meriSade: 60, pisteet: [[-3.0, 110.0, 1600], [-10.0, 80.0, 1550], [-16.0, 49.5, 1500]] },
    ],
  },
];

/**
 * VARHAISET RETKET (päätös 12): Skhul/Qafzeh ja Al Wusta omana haaleana
 * läikkänä Levantissa ja Arabiassa, joka katoaa 70 ka mennessä. Sama
 * laskenta kuin virroilla; `sammuu` kertoo häipymisen alun ja lopun.
 */
export const IHMISEN_MATKA_RETKI = {
  tunnus: 'retki',
  nimi: 'Varhaiset retket',
  vari: { vanha: '#E8A06A', rintama: '#FFCFA6' },
  peitto: 0.6,
  nopeus: 0.15,
  sisamaa: 0.7,
  alue: [{ lat: [12, 37], lon: [32, 55] }],
  lahteet: [
    { nimi: 'Siinai', lat: 30.0, lon: 33.5, aika: 125000 },
    { nimi: 'Al Wusta', lat: 28.3, lon: 41.0, aika: 95000 },
  ],
  sammuu: [78000, 70000],
};

/**
 * VANHA VÄESTÖ (päätös 7): neandertalilaiset Euroopassa ja
 * denisovalaiset Keski-Aasiassa haaleana harmaana alueena 300–40 ka,
 * joka väistyy värin tieltä (ruudulla värillinen virta voittaa) ja
 * häipyy kokonaan `haipyy`-välillä.
 */
export const IHMISEN_MATKA_VANHA = {
  tunnus: 'vanha',
  nimi: 'Neandertalilaiset ja denisovalaiset',
  vari: { rgb: [128, 122, 118], peitto: 0.34 },
  alue: [
    { lat: [35, 62], lon: [-10, 60] },
    { lat: [30, 56], lon: [60, 110] },
  ],
  reuna: 3,
  // Reuna häipyy 2° kaistalla (laskennan laatikkoPehmea), ei porrastu.
  pehmeys: 2,
  nakyy: [300000, 40000],
  haipyy: [46000, 40000],
};

/** Vanhan alueen peitto (0–1) ja rintaman peitto: päätös 2. */
export const VIRRAN_PEITTO = { vanha: 0.75, rintama: 0.95, meri: 0.42 };
