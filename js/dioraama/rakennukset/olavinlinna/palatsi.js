// OLAVINLINNA / palatsi (itäsiipi): huone 6 = Linnantupa (2. krs) ja voudin sali (3. krs, nyk. Kuninkaansali).
// Linnanrakentaja 7.10.2026 (Päätoimittaja 18.5x/19.3x; pohjatyö _lahteet/olavinlinna-pohjat/HUONE6-PALATSI.md).
// Lähteet: L2 (opas 1923: Kirkkotornista etelään pääasuinkerros, ylimpänä tynnyriholvattu sali, alla Linnantupa, ovi
// Tott-kammiosta etelään), L15 (Aspelin 1875: ovi Kirkkotornin pohjakerroksesta Linnan tupaan), L11 (Härö 1997: salin
// länsiseinän ikkunasyvennys ja vaakunalaatta), L5 (pohja 1903: alakerran halli 5,5–7,2 × 18 m). Kuoresta (K): siiven
// akseli 153°, ulkoleveys ≈ 12,1 m, katto 12–14,8 (pulpetti, korkein itäreunalla).
// ARVIOT (A): sisämitat 7,0 × 17 m molemmissa kerroksissa, Linnantuvan lattia 3,4 (= Tott-kammio, V-tukinen), palkisto
// 7,0, salin lattia 7,5, holvi 10,1 → 12,6; ikkunoiden ja takkojen paikat; porras salin ja tuvan välillä länsiseinän
// sisällä pohjoispäässä (kävelymalli: _valmiit/olavinlinna-kavely-v1 kavely.py palatsi()).
//
// KOORDINAATIT: paikallinen x poikki siiven (+x = itä-koillinen, ison pihan puoli), z pitkin siipeä (−z = Kirkkotorni,
// +z = etelä-kaakko), y = maailman korkeus. sijoitus suunta 333 kääntää paikallisen −z:n kompassiin 333 (kohti tornia).
// Paikallinen origo = siiven keskilinja (maailma −10,56; 5,38). Tornin keskipiste paikallisesti (4,73; −19,62).
const r3 = (v) => Math.round(v * 1000) / 1000;

const LEV = 7.0, Z0 = -12.3, Z1 = 4.7, ZK = (Z0 + Z1) / 2; // sisämitat
const XW = -LEV / 2, XE = LEV / 2;
const T = 1.6; // seinien paksuus mallissa (todellinen 2,5 m; ikkunasyvennykset 1,6 m)
const TUPA = { y: 3.4, palkki: 7.0, yla: 7.5 };
const SALI = { y: 7.5, lahto: 10.1, laki: 12.6 };
const ULKO = 'kivi';
const KIVI3 = { yla: 'kivi', ala: 'kivi', sivu: 'kivi' };
const PUU3 = { yla: 'puu', ala: 'puu', sivu: 'puu' };
const AUKKO = { yla: 'aukko', ala: 'aukko', sivu: 'aukko' };

// Seinät: länsi (suunta 270, u kasvaa pohjoiseen eli u = −(z − ZK)), itä (90, u = z − ZK), pohjoinen (0, u = x),
// etelä (180, u = −x). Taka (w−) = huoneen puoli.
const uL = (z) => r3(-(z - ZK)), uI = (z) => r3(z - ZK);
function seinat(y0, korkeus, aukot) {
  const P = 17 + 2 * T;
  return [
    { resepti: 'seina', paikka: [XW - T / 2, y0, ZK], suunta: 270, pituus: P, korkeus, paksuus: T, aukot: aukot.lansi, pinnat: { etu: ULKO } },
    { resepti: 'seina', paikka: [XE + T / 2, y0, ZK], suunta: 90, pituus: P, korkeus, paksuus: T, aukot: aukot.ita, pinnat: { etu: ULKO } },
    { resepti: 'seina', paikka: [0, y0, Z0 - T / 2], suunta: 0, pituus: LEV, korkeus, paksuus: T, aukot: aukot.pohjoinen ?? [], pinnat: { etu: ULKO } },
    { resepti: 'seina', paikka: [0, y0, Z1 + T / 2], suunta: 180, pituus: LEV, korkeus, paksuus: T, aukot: aukot.etela ?? [], pinnat: { etu: ULKO } },
  ];
}
// Ikkunan ulkopää: tumma levy seinän ulkopinnan tasalla (yö; ei läpinäkyvyyttä kuoreen).
const ikkunaLevy = (x, y, z, suunta, leveys, korkeus) => ({
  resepti: 'laatta', paikka: [x, r3(y + korkeus), z], suunta, leveys: leveys + 0.04, syvyys: 0.04, paksuus: korkeus + 0.02, pinnat: AUKKO,
});
// Oviaukon tausta: tumma levy 0,6 m seinän sisässä (porras ja Tott-kammion käytävä ovat kävelymallissa).
const oviTausta = (x, y, z, suunta, leveys, korkeus) => ({
  resepti: 'laatta', paikka: [x, r3(y + korkeus), z], suunta, leveys: leveys + 0.04, syvyys: 0.04, paksuus: korkeus, pinnat: AUKKO,
});

/* ==================== Linnantupa (2. krs) ==================== */
const YT = TUPA.y;
const TUPA_IKKUNAT = { lansi: [-3.0, 2.0], ita: [-5.5, 1.5] };
const TUPA_OVI = { pohjoinen: { x: 0, leveys: 1.05, korkeus: 2.0 }, porras: { z: -10.8, leveys: 1.0, korkeus: 2.1 } };
const TUPA_TAKKA = { z: -2.0, leveys: 2.2, syvyys: 0.9 };
const TUPA_SEINAT = seinat(YT, TUPA.yla - YT + 0.1, {
  lansi: [...TUPA_IKKUNAT.lansi.map((z) => ({ u: uL(z), y: 1.0, leveys: 0.9, korkeus: 1.3 })),
    { u: uL(TUPA_OVI.porras.z), y: 0, leveys: TUPA_OVI.porras.leveys, korkeus: TUPA_OVI.porras.korkeus }],
  ita: TUPA_IKKUNAT.ita.map((z) => ({ u: uI(z), y: 1.0, leveys: 0.9, korkeus: 1.3 })),
  pohjoinen: [{ u: TUPA_OVI.pohjoinen.x, y: 0, leveys: TUPA_OVI.pohjoinen.leveys, korkeus: TUPA_OVI.pohjoinen.korkeus }],
});
// Palkisto poikki siiven 1,0 m välein (alapinta 7,0) ja lankkukatto (= salin lattia) niiden päällä.
const TUPA_PALKIT = Array.from({ length: 17 }, (_, i) => ({
  resepti: 'laatta', paikka: [0, 7.3, r3(Z0 + 0.5 + i)], suunta: 0, leveys: LEV + 0.2, syvyys: 0.24, paksuus: 0.3, pinnat: PUU3,
}));
const TUPA_KATTO = { resepti: 'laatta', paikka: [0, TUPA.yla, ZK], suunta: 0, leveys: LEV + 0.2, syvyys: 17.2, paksuus: 0.2, pinnat: { yla: 'lankku', ala: 'lankku', sivu: 'puu' } };
const TUPA_LATTIA = { resepti: 'laatta', paikka: [0, YT, ZK], suunta: 0, leveys: LEV + 0.1, syvyys: 17.1, paksuus: 0.2, pinnat: { yla: 'lankku', ala: 'puu', sivu: 'puu' } };

// Kalusteet (A): pitkä pöytä penkkeineen keskellä (vartijat ja palvelusväki syövät), noppapöytä eteläpäässä
// (Linnantuvan noppapeli, kuunnelma), takka itäseinällä, oluttynnyrit kaakkoiskulmassa, astiahylly länsiseinällä.
const PITKA = { x: 0.4, z: -4.0, lev: 5.0, syv: 0.9 };
const NOPPA = { x: -0.6, z: 2.4, lev: 1.6, syv: 0.9 };
const TUPA_KALUSTEET = [
  { resepti: 'poyta', paikka: [PITKA.x, YT, PITKA.z], suunta: 90, leveys: PITKA.syv, syvyys: PITKA.lev, korkeus: 0.78 },
  ...[-1, 1].map((s) => ({ resepti: 'penkki', paikka: [r3(PITKA.x + s * 0.75), YT, PITKA.z], suunta: 90, leveys: 4.6 })),
  { resepti: 'poyta', paikka: [NOPPA.x, YT, NOPPA.z], suunta: 0, leveys: NOPPA.lev, syvyys: NOPPA.syv, korkeus: 0.76 },
  ...[-1, 1].map((s) => ({ resepti: 'penkki', paikka: [NOPPA.x, YT, r3(NOPPA.z + s * 0.75)], suunta: 0, leveys: 1.5 })),
  { resepti: 'pelilauta', paikka: [NOPPA.x, r3(YT + 0.76), NOPPA.z], suunta: 10, koko: 0.45, nopat: 3, siemen: 7 },
  { resepti: 'kynttilanjalka', paikka: [r3(NOPPA.x + 0.55), r3(YT + 0.76), r3(NOPPA.z - 0.2)], suunta: 0 },
  ...[-1.6, 0.4, 2.0].map((dz) => ({ resepti: 'kynttilanjalka', paikka: [PITKA.x, r3(YT + 0.78), r3(PITKA.z + dz)], suunta: 0 })),
  ...[-0.9, 1.1].map((dz) => ({ resepti: 'vati', paikka: [r3(PITKA.x - 0.15), r3(YT + 0.78), r3(PITKA.z + dz)], suunta: 0, sade: 0.15 })),
  { resepti: 'ruukku', paikka: [r3(PITKA.x + 0.2), r3(YT + 0.78), r3(PITKA.z - 0.4)], suunta: 0, sade: 0.1, korkeus: 0.2 },
  // Takka itäseinällä (etupuoli länteen).
  { resepti: 'tulisija', paikka: [r3(XE - TUPA_TAKKA.syvyys / 2), YT, TUPA_TAKKA.z], suunta: 270, leveys: TUPA_TAKKA.leveys, syvyys: TUPA_TAKKA.syvyys, korkeus: 0.3, huuva: { korkeus: 1.4, yla: 3.6 } },
  { resepti: 'puukasa', paikka: [r3(XE - 0.45), r3(YT + 0.34), TUPA_TAKKA.z], suunta: 0, pituus: 0.5, halkoja: 6, siemen: 611, pinnat: { puu: 'hiillos' } },
  { resepti: 'puukasa', paikka: [r3(XE - 0.3), YT, r3(TUPA_TAKKA.z + 1.6)], suunta: 0, pituus: 0.45, halkoja: 9, siemen: 612 },
  ...[[2.9, 4.1], [2.9, 3.3], [2.2, 4.1]].map(([x, z]) => ({ resepti: 'tynnyri', paikka: [x, YT, z], suunta: 0, sade: 0.33, korkeus: 0.85 })),
  { resepti: 'hylly', paikka: [r3(XW + 0.2), YT, -0.5], suunta: 90, leveys: 1.6, korkeus: 1.8, syvyys: 0.35, hyllyt: 3 },
  { resepti: 'arkku', paikka: [-2.6, YT, r3(Z1 - 0.35)], suunta: 0, leveys: 1.0 },
  { resepti: 'seinasoihtu', paikka: [r3(XW + 0.02), r3(YT + 1.9), -7.0], suunta: 90 },
  { resepti: 'seinasoihtu', paikka: [r3(XE - 0.02), r3(YT + 1.9), -8.5], suunta: 270 },
];
const TUPA_AUKOT = [
  ...TUPA_IKKUNAT.lansi.map((z) => ikkunaLevy(r3(XW - T + 0.02), YT + 1.0, z, 270, 0.9, 1.3)),
  ...TUPA_IKKUNAT.ita.map((z) => ikkunaLevy(r3(XE + T - 0.02), YT + 1.0, z, 90, 0.9, 1.3)),
  oviTausta(r3(XW - 0.6), YT, TUPA_OVI.porras.z, 270, TUPA_OVI.porras.leveys, TUPA_OVI.porras.korkeus),
  oviTausta(0, YT, r3(Z0 - 0.9), 0, TUPA_OVI.pohjoinen.leveys, TUPA_OVI.pohjoinen.korkeus),
];

const SIJOITUS = { ankkuri: [0, 0, 0], paikka: [-10.56, 0, 5.38], suunta: 333 };

export const TILA_LINNANTUPA = {
  id: 'linnantupa',
  nimi: 'Linnantupa',
  kohdistettava: false,
  sijoitus: SIJOITUS,
  rajat: { min: [XW, YT, Z0], max: [XE, TUPA.palkki, Z1] },
  leikkaus: { laajennus: 1.0, kameraan: false, min: [-6.6, r3(YT - 0.3), -13.8], max: [6.6, 15.5, 6.4] },
  naapurit: [],
  kamera: { kohde: [0, r3(YT + 0.8), -3.5], atsimuutti: 150, korkeus: 30, etaisyys: 11, fov: 50, aukko: 0.8 },
  kameraPysty: { kohde: [0, YT, -3.5], atsimuutti: 150, korkeus: 45, etaisyys: 12, fov: 60, aukko: 0.8 },
  valot: [
    { paikka: [r3(XE - 0.6), r3(YT + 0.5), TUPA_TAKKA.z], sade: 8, voima: 2.2, vari: '#ff9a4a', lepatus: 0.35 },
    { paikka: [PITKA.x, r3(YT + 1.3), PITKA.z], sade: 5, voima: 1.2, vari: '#ffb070', lepatus: 0.2 },
    { paikka: [NOPPA.x, r3(YT + 1.3), NOPPA.z], sade: 3.5, voima: 0.9, vari: '#ffb070', lepatus: 0.2 },
    { paikka: [r3(XW + 0.4), r3(YT + 2.1), -7.0], sade: 4, voima: 1.0, vari: '#ff9a4a', lepatus: 0.3 },
    { paikka: [r3(XE - 0.4), r3(YT + 2.1), -8.5], sade: 4, voima: 1.0, vari: '#ff9a4a', lepatus: 0.3 },
  ],
  palikat: [TUPA_LATTIA, TUPA_KATTO, ...TUPA_PALKIT, ...TUPA_SEINAT, ...TUPA_AUKOT, ...TUPA_KALUSTEET],
};

/* ==================== Voudin sali (3. krs) ==================== */
const YS = SALI.y;
const SALI_IKKUNA = { z: -1.0, leveys: 1.4, korkeus: 1.9, y: 0.7 }; // länsiseinän syvennys (L11), vaakunalaatta pielessä
const SALI_IKKUNAT_ITA = [-8.5, 1.0];
const SALI_OVI = { z: -5.1, leveys: 1.0, korkeus: 2.1 }; // muurinsisäinen porras Linnantuvasta (A)
const SALI_TAKKA = { z: -4.0, leveys: 2.4, syvyys: 1.0 };
const SALI_SEINAT = seinat(YS, SALI.lahto - YS, {
  lansi: [{ u: uL(SALI_IKKUNA.z), y: SALI_IKKUNA.y, leveys: SALI_IKKUNA.leveys, korkeus: SALI_IKKUNA.korkeus },
    { u: uL(SALI_OVI.z), y: 0, leveys: SALI_OVI.leveys, korkeus: SALI_OVI.korkeus }],
  ita: SALI_IKKUNAT_ITA.map((z) => ({ u: uI(z), y: 0.9, leveys: 0.9, korkeus: 1.5 })),
});
const SALI_LATTIA = { resepti: 'laatta', paikka: [0, r3(YS + 0.01), ZK], suunta: 0, leveys: LEV + 0.1, syvyys: 17.1, paksuus: 0.1, pinnat: { yla: 'lankku', ala: 'lankku', sivu: 'puu' } };
// Tynnyriholvi pitkittäin (akseli w = −z kun suunta 0), päätyseinien puoliellipsit mukaan.
const SALI_HOLVI = { resepti: 'tynnyriholvi', paikka: [0, SALI.lahto, ZK], suunta: 0, pituus: 17, leveys: LEV, nousu: SALI.laki - SALI.lahto, paksuus: 0.35, segmentit: 20, paadyt: true };
const POYTA = { x: 0, z: 2.6 }; // voudin pöytä eteläpäässä (A); Kellotornin avain pöydällä (kävelymerkki)
const SALI_KALUSTEET = [
  { resepti: 'poyta', paikka: [POYTA.x, YS, POYTA.z], suunta: 0, leveys: 2.6, syvyys: 1.0, korkeus: 0.8 },
  { resepti: 'penkki', paikka: [POYTA.x, YS, r3(POYTA.z + 0.8)], suunta: 0, leveys: 2.2 },
  { resepti: 'penkki', paikka: [-2.4, YS, -1.0], suunta: 90, leveys: 3.0 },
  { resepti: 'arkku', paikka: [2.6, YS, r3(Z1 - 0.35)], suunta: 0, leveys: 1.1 },
  { resepti: 'arkku', paikka: [-2.6, YS, r3(Z1 - 0.35)], suunta: 0, leveys: 0.9 },
  ...[-0.9, 0.9].map((dx) => ({ resepti: 'kynttilanjalka', paikka: [r3(POYTA.x + dx), r3(YS + 0.8), r3(POYTA.z - 0.1)], suunta: 0, korkeus: 0.25 })),
  { resepti: 'kirja', paikka: [r3(POYTA.x - 0.3), r3(YS + 0.8), r3(POYTA.z + 0.15)], suunta: 10 },
  { resepti: 'vati', paikka: [r3(POYTA.x + 0.25), r3(YS + 0.8), r3(POYTA.z + 0.2)], suunta: 0, sade: 0.17 },
  { resepti: 'tulisija', paikka: [r3(XE - SALI_TAKKA.syvyys / 2), YS, SALI_TAKKA.z], suunta: 270, leveys: SALI_TAKKA.leveys, syvyys: SALI_TAKKA.syvyys, korkeus: 0.3, huuva: { korkeus: 1.6, yla: 2.6 } },
  { resepti: 'puukasa', paikka: [r3(XE - 0.5), r3(YS + 0.34), SALI_TAKKA.z], suunta: 0, pituus: 0.55, halkoja: 7, siemen: 711, pinnat: { puu: 'hiillos' } },
  // Vaakunalaatta ikkunasyvennyksen eteläpielessä (L11, laatta 13; A: maalattu kilpi kivessä).
  { resepti: 'kilpi', paikka: [r3(XW - 0.8), r3(YS + 2.0), r3(SALI_IKKUNA.z + SALI_IKKUNA.leveys / 2 + 0.01)], suunta: 0, sade: 0.24 },
  { resepti: 'seinasoihtu', paikka: [r3(XW + 0.02), r3(YS + 2.1), -9.0], suunta: 90 },
  { resepti: 'seinasoihtu', paikka: [r3(XE - 0.02), r3(YS + 2.1), 3.0], suunta: 270 },
];
const SALI_AUKOT = [
  ikkunaLevy(r3(XW - T + 0.02), YS + SALI_IKKUNA.y, SALI_IKKUNA.z, 270, SALI_IKKUNA.leveys, SALI_IKKUNA.korkeus),
  ...SALI_IKKUNAT_ITA.map((z) => ikkunaLevy(r3(XE + T - 0.02), YS + 0.9, z, 90, 0.9, 1.5)),
  oviTausta(r3(XW - 0.6), YS, SALI_OVI.z, 270, SALI_OVI.leveys, SALI_OVI.korkeus),
];

export const TILA_VOUDIN_SALI = {
  id: 'voudin-sali',
  nimi: 'Voudin sali',
  kohdistettava: false,
  sijoitus: SIJOITUS,
  rajat: { min: [XW, YS, Z0], max: [XE, SALI.laki, Z1] },
  leikkaus: { laajennus: 1.0, kameraan: false, min: [-6.6, r3(YS - 0.2), -13.8], max: [6.6, 15.5, 6.4] },
  naapurit: [],
  kamera: { kohde: [0, r3(YS + 1.0), -2.0], atsimuutti: 150, korkeus: 30, etaisyys: 11, fov: 50, aukko: 0.8 },
  kameraPysty: { kohde: [0, YS, -2.0], atsimuutti: 150, korkeus: 45, etaisyys: 12, fov: 60, aukko: 0.8 },
  valot: [
    { paikka: [r3(XE - 0.6), r3(YS + 0.5), SALI_TAKKA.z], sade: 9, voima: 2.4, vari: '#ff9a4a', lepatus: 0.35 },
    { paikka: [POYTA.x, r3(YS + 1.4), POYTA.z], sade: 4.5, voima: 1.3, vari: '#ffb070', lepatus: 0.2 },
    { paikka: [r3(XW + 0.4), r3(YS + 2.3), -9.0], sade: 4, voima: 1.0, vari: '#ff9a4a', lepatus: 0.3 },
    { paikka: [r3(XE - 0.4), r3(YS + 2.3), 3.0], sade: 4, voima: 1.0, vari: '#ff9a4a', lepatus: 0.3 },
  ],
  palikat: [SALI_LATTIA, ...SALI_SEINAT, SALI_HOLVI, ...SALI_AUKOT, ...SALI_KALUSTEET],
};
