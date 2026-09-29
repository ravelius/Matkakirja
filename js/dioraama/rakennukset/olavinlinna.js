// OLAVINLINNA — dioraaman lähdedata, erä 1 (karkea linnan massa + yksityiskohtainen
// keittiö). Speksi: docs/raportit/dioraama-rajapinnat-20260929.md (kohdat 0, 1, 2);
// erä 2:n äänet (repliikit, reaktiot, taulujen kohdat, tilojen ambienssit ja
// tehosteet): docs/raportit/dioraama-rajapinnat-era2-20260929.md kohta 2 "AANET".
// Konsepti: Codexin luonnos (sommittelu ja tyyli), todelliset mittasuhteet viitteenä
// proto-3d:n Olavinlinna.cs:n alkukommentista (linna 168 × 98 m, kolme pyöreää tornia
// pohjoislaidalla rivissä) — tämä dioraama tiivistää mittasuhteet konseptin mukaan.
//
// Koordinaatisto (KANONINEN, ks. speksin kohta 0): metrit, +X itä, +Y ylös, +Z etelä.
// Origo = keskipihan lattia y = 0. Kamera katsoo etelästä-kaakosta pohjoiseen.
//
// Aikakerros n1500 (1500-luvun alku, tulkinta) — sama vuosikymmenkerros kuin
// henkilöpankin '-1500'-hahmoilla.

// ---------------------------------------------------------------------------
// Linnan taulu (RAKENNUS-tason opetustaulu, 3 ydinasiaa). Sisältökirjuri tarkisti 29.9. (Kansallismuseo, Museovirasto, Finna):
// tekstit ovat luonnos, Fable/Sisältökirjuri tarkistaa ja korvaa oikealla lähteellä.
const TAULU_LINNA = {
  otsikko: 'Olavinlinna',
  tila: 'tarkistettu',
  kohdat: [
    { teksti: 'Olavinlinna rakennettiin 1475 kalliosaarelle vartioimaan valtakunnan itärajaa.', lahde: 'Kansallismuseo: Olavinlinnan historiaa', aani: 'linna-kohta-0' },
    { teksti: 'Keskiaikaista kivilinnaa on korjattu ja laajennettu vuosisatojen kuluessa moneen otteeseen.', lahde: 'Kansallismuseo: Olavinlinnan historiaa', aani: 'linna-kohta-1' },
    { teksti: 'Nykyään linnassa on museo, ja kesäisin sen pihat toimivat oopperajuhlien näyttämönä.', lahde: 'Kansallismuseo: Olavinlinnan historiaa', aani: 'linna-kohta-2' },
  ],
};

// Keittiön opetustaulu (TILA-tason, 3 kohtaa).
const TAULU_KEITTIO = {
  otsikko: 'Linnan keittiö',
  tila: 'tarkistettu',
  kohdat: [
    { teksti: 'Keittiön avotuli paloi lähes taukoamatta — sen sammuminen tiesi kylmää ruokaa koko linnalle.', lahde: 'Keittiön paikka linnassa on tulkinta; kuvaus keskiaikaisista linnankeittiöistä', aani: 'keittio-kohta-0' },
    { teksti: 'Ruokana oli kalaa, viljaa ja suolattua lihaa; talven varalle säilöttiin mitä vain saatiin.', lahde: 'Keittiön paikka linnassa on tulkinta; kuvaus keskiaikaisista linnankeittiöistä', aani: 'keittio-kohta-1' },
    { teksti: 'Keittiö ruokki koko linnaväen: vartijat, palvelusväen ja isännän pöytään kutsutut vieraat.', lahde: 'Keittiön paikka linnassa on tulkinta; kuvaus keskiaikaisista linnankeittiöistä', aani: 'keittio-kohta-2' },
  ],
};

// ---------------------------------------------------------------------------
// TILA 'massa': koko linnan karkea muoto yleisnäkymään (kohdistettava: false).
// Sisältää myös perustan (vesi, kalliosaari), koska se on osa "koko linnan"
// yleisilmettä. Kolme pyöreää tornia pohjoislaidalla, kehämuurit, pihan
// rakennukset harjakatoin ja portaat. Eteläsivu (kameraa kohti) on
// aukileikattu: eteläiset muurinpätkät ovat matalampia ja niiden yläreuna
// käyttää leikkaus-roolia.
const TILA_MASSA = {
  id: 'massa',
  nimi: 'Olavinlinna (yleisnäkymä)',
  kohdistettava: false,
  rajat: { min: [-58, -10, -48], max: [58, 42, 36] },
  naapurit: ['keittio'],
  hahmot: [],
  // Massan äänisilmukat: tuuli linnan muureilla + järven laineet rannassa (era2 kohta 2 "AANET").
  aanet: [{ aani: 'linna-tuuli' }, { aani: 'jarvi-laineet' }],
  // Satunnaiset kertaäänet (era2 kohta 2 "AANET"): lokit ja kaukaiset kellot, harvakseltaan.
  tehosteet: [
    { aanet: ['lokit'], valit_s: [15, 30] },
    { aanet: ['kellot-kaukaa'], valit_s: [40, 80] },
  ],
  kasikirjoitus: [],
  palikat: [
    // --- Perusta ---
    { resepti: 'vesi', paikka: [0, -7, 0], suunta: 0, leveys: 400, syvyys: 400 },
    {
      resepti: 'kallio', paikka: [0, -0.5, -6], suunta: 0,
      leveys: 110, syvyys: 80, korkeus: 9, siemen: 1873, kohina: 0.4,
    },

    // --- Kolme pyöreää tornia (pohjoislaidalla rivissä) ---
    // Länsitorni.
    {
      resepti: 'torni', paikka: [-34, 0, -6], suunta: 0,
      sade: 7.5, korkeus: 28, paksuus: 2, segmentit: 32, auki: null,
      vyo: { y: 25, korkeus: 1.5 },
    },
    { resepti: 'kartiokatto', paikka: [-34, 28, -6], suunta: 0, sade: 7.5, korkeus: 9, ylitys: 0.6, segmentit: 32 },
    // Pohjoistorni (keskellä, taaimpana).
    {
      resepti: 'torni', paikka: [0, 0, -20], suunta: 0,
      sade: 6.5, korkeus: 32, paksuus: 2, segmentit: 32, auki: null,
      vyo: { y: 28.5, korkeus: 1.5 },
    },
    { resepti: 'kartiokatto', paikka: [0, 32, -20], suunta: 0, sade: 6.5, korkeus: 8, ylitys: 0.6, segmentit: 32 },
    // Itätorni.
    {
      resepti: 'torni', paikka: [32, 0, -4], suunta: 0,
      sade: 7.5, korkeus: 28, paksuus: 2, segmentit: 32, auki: null,
      vyo: { y: 25, korkeus: 1.5 },
    },
    { resepti: 'kartiokatto', paikka: [32, 28, -4], suunta: 0, sade: 7.5, korkeus: 9, ylitys: 0.6, segmentit: 32 },

    // --- Kehämuurit (~10 m, 3 m paksut). Pohjois-, länsi- ja itämuuri täyttä
    // korkeutta; eteläsivu matalampi ja leikattu (kameraa kohti). ---
    { resepti: 'seina', paikka: [-17, 0, -20], suunta: 0, pituus: 34, korkeus: 10, paksuus: 3 },
    { resepti: 'seina', paikka: [16, 0, -20], suunta: 0, pituus: 32, korkeus: 10, paksuus: 3 },
    { resepti: 'seina', paikka: [-34, 0, -3], suunta: 90, pituus: 34, korkeus: 10, paksuus: 3 },
    { resepti: 'seina', paikka: [32, 0, -3], suunta: 90, pituus: 34, korkeus: 10, paksuus: 3 },
    // Eteläsivu, aukileikattu: matalampi (4 m) ja yläreuna leikkaus-roolilla.
    // Väli x 8…20 jätetty auki keittiön oman eteläseinän (poistettu) kohdalle.
    {
      resepti: 'seina', paikka: [-13, 0, 14], suunta: 0, pituus: 42, korkeus: 4, paksuus: 3,
      leikkaus: { vasen: false, oikea: false, yla: true },
    },
    {
      resepti: 'seina', paikka: [26, 0, 14], suunta: 0, pituus: 12, korkeus: 4, paksuus: 3,
      leikkaus: { vasen: false, oikea: false, yla: true },
    },

    // --- Pihan rakennukset harjakatoin ---
    // Itäsali (ruokasali, konseptin kohta 5): pohjois- ja eteläseinä + harjakatto
    // (harjakatto-resepti tuottaa myös päätykolmiot, ks. speksin resepti-taulukko).
    { resepti: 'seina', paikka: [20, 0, -14], suunta: 0, pituus: 20, korkeus: 5, paksuus: 0.5 },
    { resepti: 'seina', paikka: [20, 0, -2], suunta: 0, pituus: 20, korkeus: 5, paksuus: 0.5 },
    { resepti: 'harjakatto', paikka: [20, 5, -8], suunta: 0, leveys: 20, syvyys: 12, korkeus: 3, ylitys: 0.4 },
    // Länsivarasto (konseptin kohta 3).
    { resepti: 'seina', paikka: [-24, 0, -14], suunta: 0, pituus: 18, korkeus: 4.5, paksuus: 0.5 },
    { resepti: 'seina', paikka: [-24, 0, 0], suunta: 0, pituus: 18, korkeus: 4.5, paksuus: 0.5 },
    { resepti: 'harjakatto', paikka: [-24, 4.5, -7], suunta: 0, leveys: 18, syvyys: 14, korkeus: 2.5, ylitys: 0.4 },

    // --- Portaat ---
    // Keittiön itäovelta pihakannelle (pihan lattia y 0, keittiön lattia y −4).
    { resepti: 'porras', paikka: [21, -4, 9.5], suunta: 0, leveys: 1.5, askelmat: 22, nousu: 0.18, etenema: 0.28 },
    // Pihalta länsivaraston edustalle nouseva lyhyt porras (maiseman rikastus).
    { resepti: 'porras', paikka: [-15, 0, -1], suunta: 0, leveys: 1.8, askelmat: 16, nousu: 0.18, etenema: 0.28 },
  ],
};

// ---------------------------------------------------------------------------
// TILA 'keittio': kaakkoissiiven keittiö (kohdistettava: true). Sisämitat
// x 8…20, z 4…11, lattia y 0 (pihan taso; 29.9. nostettu +4 m, koska kallio peitti
// kallion sisään kaivetun keittiön), korkeus 4,0. Katto = yläpuolisen salin
// lattia (leikkausreuna näkyy automaattisesti laatta-reseptin sivu-roolista).
// Eteläseinä (z ≈ 11, kameraa kohti) POISTETTU; länsi- ja itäseinän eteläpää
// on merkitty leikkaus-roolilla (oikea = u:n + päädyn, kohti avointa sivua).
const KEITTIO_HAHMOT = [
  {
    id: 'kokki', henkilo: 'kokki-1500', paikka: [13.1, 0, 6.1], suunta: 0, peilattu: false,
    silmukka: 'tyo', heraa: 1, reitti: null,
    repliikit: [
      { id: 'kokki-1', teksti: 'Malta mielesi, ei tuo pata omin päin kiehu valmiiksi.', aani: 'kokki-1' },
      { id: 'kokki-2', teksti: 'Isännän pöytään ei kelpaa puuro liian suolaisena eikä liian laihana.', aani: 'kokki-2' },
    ],
    reaktio: { id: 'pulu-kokki-r1', teksti: 'Kuulitteko? Tässä linnassa padallakin on oma tahto.', aani: 'pulu-kokki-r1' },
  },
  {
    id: 'apulainen', henkilo: 'apulainen-1500', paikka: [10.5, 0, 8.3], suunta: 180, peilattu: false,
    silmukka: 'tyo', heraa: 1, reitti: null,
    repliikit: [
      { id: 'apulainen-1', teksti: 'Leipätaikina lepää vielä hetken, ennen kuin se uuniin kelpaa.', aani: 'apulainen-1' },
      { id: 'apulainen-2', teksti: 'Jauhosäkki painaa aina enemmän kuin luulisi — eikä se ole minun syytäni.', aani: 'apulainen-2' },
    ],
    reaktio: { id: 'pulu-apulainen-r1', teksti: 'Säkki painaa, leipä palkitsee. Minä lupaan hoitaa murut.', aani: 'pulu-apulainen-r1' },
  },
  {
    id: 'vesipoika', henkilo: 'vesipoika-1500', paikka: [19.5, 0, 9.5], suunta: 304, peilattu: false,
    silmukka: 'kavely', heraa: 2,
    reitti: { pisteet: [[19.5, 0, 9.5], [13.8, 0, 5.6], [19.5, 0, 9.5]], nopeus: 1.0, tauko: 1.5 },
    repliikit: [
      { id: 'vesipoika-1', teksti: 'Järvestä tänne ja takaisin, jalat tuntevat jo polun ulkoa.', aani: 'vesipoika-1' },
      { id: 'vesipoika-2', teksti: 'Yksi sanko kokille, toinen padalle — kolmannen taidan juoda itse.', aani: 'vesipoika-2' },
    ],
    reaktio: { id: 'pulu-vesipoika-r1', teksti: 'Kymmeniä sankoja päivässä! Vesijohtoa hän ei ehtinyt nähdä.', aani: 'pulu-vesipoika-r1' },
  },
];

const TILA_KEITTIO = {
  id: 'keittio',
  nimi: 'Keittiö',
  kohdistettava: true,
  rajat: { min: [8, 0, 4], max: [20, 4, 11] },
  naapurit: ['massa'],
  kamera: { kohde: [14, 1.5, 7.4], atsimuutti: 172, korkeus: 13, etaisyys: 16, fov: 38, aukko: 0.8 },
  // Pystynäyttö (iPhone ~0,46): vaakakenttä ~21° → kauempaa, jotta tulisija, kokki ja pöytä mahtuvat; sali näkyy yllä.
  kameraPysty: { kohde: [13.8, 1.4, 7.2], atsimuutti: 174, korkeus: 12, etaisyys: 25, fov: 44, aukko: 0.8 },
  pulu: { laskeutuminen: [11.9, 0.8, 9], taulupuoli: 'oikea' },
  taulu: TAULU_KEITTIO,
  valot: [
    { paikka: [14, 0.5, 4.9], sade: 7, voima: 1 },
    { paikka: [10.5, 0.8, 9], sade: 2.5, voima: 0.4 },
  ],
  palikat: [
    // Lattia ja katto (katto = salin lattia yläpuolella, leikkausreuna näkyy sivu-roolista).
    { resepti: 'laatta', paikka: [14, 0, 7.5], suunta: 0, leveys: 12, syvyys: 7, paksuus: 0.3 },
    { resepti: 'laatta', paikka: [14, 4, 7.5], suunta: 0, leveys: 12, syvyys: 7, paksuus: 0.4 },
    // Takaseinä (pohjoinen, z 4) ampumarakoineen.
    {
      resepti: 'seina', paikka: [14, 0, 4], suunta: 0, pituus: 12, korkeus: 4, paksuus: 0.6,
      aukot: [{ u: -3, y: 1.8, leveys: 0.25, korkeus: 1.2 }, { u: 3, y: 1.8, leveys: 0.25, korkeus: 1.2 }],
    },
    // Länsiseinä — eteläpää (avoin sivu) leikkaus-roolilla.
    {
      resepti: 'seina', paikka: [8, 0, 7.5], suunta: 90, pituus: 7, korkeus: 4, paksuus: 0.6,
      leikkaus: { vasen: false, oikea: true, yla: false },
    },
    // Itäseinä, ovi portaille (u 2 ≈ z 9,5) — eteläpää leikkaus-roolilla.
    {
      resepti: 'seina', paikka: [20, 0, 7.5], suunta: 90, pituus: 7, korkeus: 4, paksuus: 0.6,
      aukot: [{ u: 2, y: 0, leveys: 1.1, korkeus: 2.2 }],
      leikkaus: { vasen: false, oikea: true, yla: false },
    },
    // Eteläseinä POISTETTU (dioraaman leikkaus) — ei palikkaa.
    // Alapuolella muuri kallioon (keittiön terassi kannattelee kalliolle).
    { resepti: 'seina', paikka: [14, -2.5, 11], suunta: 0, pituus: 12, korkeus: 2.5, paksuus: 1.0 },

    // Tulisija + huuva takaseinän keskellä, 2 patas hiilloksella.
    { resepti: 'tulisija', paikka: [14, 0, 4.9], suunta: 180, leveys: 3, syvyys: 1.2, korkeus: 0.9, huuva: { korkeus: 1.6, yla: 4 } },
    { resepti: 'pata', paikka: [13.3, 0.9, 4.9], suunta: 0, sade: 0.3, korkeus: 0.35 },
    { resepti: 'pata', paikka: [14.8, 0.9, 4.6], suunta: 0, sade: 0.3, korkeus: 0.35 },

    // 2 työpöytää + penkit.
    { resepti: 'poyta', paikka: [10.5, 0, 9], suunta: 0, leveys: 2.2, syvyys: 0.8, korkeus: 0.8 },
    { resepti: 'penkki', paikka: [10.5, 0, 10.0], suunta: 0, leveys: 1.6, syvyys: 0.3, korkeus: 0.45 },
    { resepti: 'poyta', paikka: [17, 0, 8.5], suunta: 0, leveys: 2.4, syvyys: 0.9, korkeus: 0.8 },
    { resepti: 'penkki', paikka: [17, 0, 9.6], suunta: 0, leveys: 1.8, syvyys: 0.3, korkeus: 0.45 },

    // 3 tynnyriä, 3 säkkiä, hylly länsiseinällä.
    { resepti: 'tynnyri', paikka: [8.8, 0, 5.0], suunta: 0, sade: 0.35, korkeus: 0.9, segmentit: 16 },
    { resepti: 'tynnyri', paikka: [8.8, 0, 6.3], suunta: 0, sade: 0.35, korkeus: 0.9, segmentit: 16 },
    { resepti: 'tynnyri', paikka: [9.6, 0, 10.4], suunta: 0, sade: 0.35, korkeus: 0.9, segmentit: 16 },
    { resepti: 'sakki', paikka: [9.4, 0, 9.0], suunta: 0, sade: 0.3, korkeus: 0.6, siemen: 11 },
    { resepti: 'sakki', paikka: [19.2, 0, 8.6], suunta: 0, sade: 0.3, korkeus: 0.6, siemen: 12 },
    { resepti: 'sakki', paikka: [19.0, 0, 9.6], suunta: 0, sade: 0.3, korkeus: 0.6, siemen: 13 },
    { resepti: 'hylly', paikka: [8.5, 0, 9.5], suunta: 90, leveys: 3, korkeus: 2.0, syvyys: 0.4, hyllyt: 3 },
  ],
  hahmot: KEITTIO_HAHMOT,
  // Keittiön äänisilmukat: ambienssi + tulisija + pata + vaivaaminen, kaikki päällekkäin (era2 kohta 2 "AANET").
  aanet: [
    { aani: 'keittio-ambienssi' },
    { aani: 'tulisija-ratina' },
    { aani: 'pata-poreilu' },
    { aani: 'vaivaaminen' },
  ],
  // Satunnaiset kertaäänet (era2 kohta 2 "AANET"): pilkkominen tiheämmin, askeleet/ovi harvemmin.
  tehosteet: [
    { aanet: ['pilkkominen-1', 'pilkkominen-2', 'pilkkominen-3', 'pilkkominen-4'], valit_s: [4, 9] },
    { aanet: ['askel-puu', 'askel-kivi', 'vesisanko', 'ovi-puu'], valit_s: [12, 25] },
  ],
  // Tulisijan liekki hiilloksen päällä (erä 2, dioraama-rajapinnat-era2 kohta 2 "LIEKIT").
  // Hiilloskansi on tulisijan korkeudella, keskellä palikkaa (reseptit-kalusteet.mjs:n
  // tulisija-resepti: hiillos-laatikko u,w-keskitetty riippumatta suunnasta) — paikka =
  // palikan paikka [14, 0, 4.9] + korkeus 0.9 pystyyn = [14, 0.9, 4.9].
  liekit: [
    { liekki: 'tulisija', paikka: [14, 0.9, 4.9], koko: 1, vaihe: 0 },
  ],
  kasikirjoitus: [
    { tee: 'pulu-lenna' },
    { tee: 'taulu' },
    { tee: 'kohta', n: 0 },
    { tee: 'repliikki', hahmo: 'kokki' },
    { tee: 'reaktio', hahmo: 'kokki' },
    { tee: 'kohta', n: 1 },
    { tee: 'repliikki', hahmo: 'vesipoika' },
    { tee: 'kohta', n: 2 },
  ],
};

// ---------------------------------------------------------------------------
export const RAKENNUS = {
  id: 'olavinlinna',
  nimi: 'Olavinlinna',
  otsikko: 'Olavinlinna – elävä linna',
  versio: 1,
  lahteet: [{ nimi: 'Kansallismuseo: Olavinlinnan historiaa', osoite: 'https://www.kansallismuseo.fi/fi/olavinlinna/historiaa' }],
  geoAnkkuri: { lat: 61.8639, lon: 28.9011, suuntima: 0 },
  aikakerros: { id: 'n1500', nimi: '1500-luvun alku (tulkinta)' },
  yleiskamera: {
    vaaka: { kohde: [0, 2, 0], atsimuutti: 165, korkeus: 30, etaisyys: 150, fov: 32, aukko: 0.3 },
    pysty: { kohde: [0, 0, 2], atsimuutti: 160, korkeus: 38, etaisyys: 300, fov: 40, aukko: 0.3 },
  },
  // Linnan taulun laskeutumispiste pihan länsiosaan, ettei Pulu peitä Keittiö-lappua (DoF-savuke 29.9.).
  pulu: { laskeutuminen: [-10, 0.5, 0] },
  taulu: TAULU_LINNA,
  tilat: [TILA_MASSA, TILA_KEITTIO],
};
