// OLAVINLINNA / keittiö G 102 (Linnanrakentaja 7.10.2026; Päätoimittajan päätös: keittiö lähteiden mukaiseen paikkaan,
// pikkupihan eteläsiipeen G 102, joka purettiin 1720-luvulla ja rakennetaan dioraamaan uudelleen). Vanha keittiö
// (keittio.js, itäsiiven alakerta) JÄÄ ENNALLEEN; tämä tila on kohdistettava: false, kunnes natiivi on todennut sen.
//
// GEOMETRIA = vapaan kävelyn malli (_valmiit/olavinlinna-kavely-v1/lahde/reitti.json + kavely.py, funktio keittio)
// TÄSMÄLLEEN, koska kävelyn törmäys ja leikkaukset on tehty sen mukaan. Maailmakoordinaatit suoraan (ei sijoitusta),
// glTF-kanoninen: x itä, y ylös, z etelä. Lattia y −2,65, huonekorkeus 4,2. Pihan seinä (pohjoinen) keskilinja z 10,6,
// paksuus 0,9, x −24,8…−14,6; itä- ja länsiseinä 0,9; eteläraja = kehämuurin keskilinja (−24,8, 14,1) → (−19,0, 16,7)
// → (−14,6, 15,4), paksuus 1,2, y lattia −0,5 … lattia + 5,7. Ovi pihalle x −21,5 (1,1 × 2,0), ikkunat x −18,8 ja −15,8
// (0,6 m leveät, 1,6–2,4 m lattiasta). Kattopalkit 0,22 × 0,24 pohjois–eteläsuuntaisina 0,9 m välein (x = −24,35 + 0,9 k),
// lautakatto alapinta lattia + 4,22. Sisäpinnat: x −24,35…−15,05, z 11,05…kehämuurin sisäpinta (13,6 länsipäässä,
// 16,0 keskellä, 14,9 itäpäässä).
//
// ASETTELU (Päätoimittaja: tulisija länsipäässä, pöytä keskellä, tynnyrit itäpäässä, hyllyt pihan seinällä) ja
// kävelymallin merkit (v1/merkit.json): piilo:uunin-vieressa (−23,8; 13,9) jää tulisijan ja länsiseinän väliin vapaaksi;
// piilo:poydan-alla (−20,0; 12,6) = pöydän alla jalkojen välissä (pöytä 0,9 m, jalat x ±1,11); piilo:tynnyrien-takana
// (−15,6; 14,2) = kolmen tynnyrin takana kaakkoiskulmassa, sisäänpääsy lännestä kehämuuria pitkin; esine:kauha (−22,8;
// 1,0; 13,4) putoaa tulisijan reunalle, esine:savipurkki/lautanen/omena pöydälle (niiden kohdat jätetty tyhjiksi);
// partio:keittio-1/-2 (z 11,6) kulkee pihan seinän vierustaa hyllyjen (syvyys 0,32) ja pöydän välistä.
// Lähteet ja arviot: _valmiit/olavinlinna-keittio-g102-v1/LAHTEET.md (kalusteiden paikat arvio A).
import { TILA as KEITTIO } from './keittio.js';
import { KOHTAUKSET_V3 } from './kohtaukset-v3.js';

const RAD = Math.PI / 180;
const r3 = (v) => Math.round(v * 1000) / 1000;
const Y = -2.65; // lattia (reitti.json tasot.keittio_lattia)
const H = 4.2; // huonekorkeus
const X0 = -24.8, X1 = -14.6, ZP = 10.6; // seinälinjat
const ETELA = [[-24.8, 14.1], [-19.0, 16.7], [-14.6, 15.4]]; // kehämuurin keskilinja
const y = (dy) => r3(Y + dy);
const etelaZ = (x) => {
  const [[ax, az], [bx, bz], [cx, cz]] = ETELA;
  const xx = Math.min(X1, Math.max(X0, x));
  return xx <= bx ? az + (bz - az) * (xx - ax) / (bx - ax) : bz + (cz - bz) * (xx - bx) / (cx - bx);
};
const etelaMax = (xa, xb) => Math.max(etelaZ(xa), etelaZ(xb), xa < -19 && xb > -19 ? 16.7 : -Infinity);

// Kehämuurin länsiosan (A) kehys: r pitkin muuria itään, f sisään huoneeseen (pohjoiseen). Tulisijan suunta = muurin suunta.
const SA = Math.atan2(ETELA[1][1] - ETELA[0][1], ETELA[1][0] - ETELA[0][0]) / RAD; // 24,15°
const SB = Math.atan2(ETELA[2][1] - ETELA[1][1], ETELA[2][0] - ETELA[1][0]) / RAD; // −16,46°
const RA = [Math.cos(SA * RAD), Math.sin(SA * RAD)], FA = [Math.sin(SA * RAD), -Math.cos(SA * RAD)];
const muuriA = (t, w) => [ETELA[0][0] + 0.6 * FA[0] + t * RA[0] + w * FA[0], ETELA[0][1] + 0.6 * FA[1] + t * RA[1] + w * FA[1]];

// Tulisija (leivinliesi) kehämuuria vasten länsipäässä: 2,4 × 1,1 × 0,9, keskikohta 2,55 m muurin sisäpinnan alusta.
const TL = { leveys: 2.4, syvyys: 1.1, korkeus: 0.9 };
const TK = muuriA(2.55, TL.syvyys / 2); // keskipiste [x, z]
const tl = (u, w, dy = 0) => [r3(TK[0] + u * RA[0] + w * FA[0]), y(dy), r3(TK[1] + u * RA[1] + w * FA[1])];
const HUUVA = { korkeus: 1.6, yla: 4.6 };

// Pöytä keskellä (x −21,15…−18,75, z 12,2…13,0, kansi 0,9) ja sen eteläpuolella penkki.
const PX = -19.95, PZ = 12.6, PK = 0.9;
// Hyllyt pihan seinällä (takalauta seinää vasten, suunta 180): B oven ja länsi-ikkunan välissä, A ikkunoiden välissä.
// Esinetarkistus (docs/raportit/faktapohja-olavinlinna-1500.md osa 4, 7.10.): vain puu-, savi- ja rautaesineitä; ei pulloja,
// kuparikattilaa, öljylamppua, tinaa eikä reikäleipäorsia (reikäleipä keskiajalla ei lähdettä). Vadit puuvateina.
const PUUVATI = { metalli: 'puu' };
// Valurautapadat (koordinaattorin palaute 7.10.: ei kiiltäviä kuparikulhoja): pinta 'kengat' = tumma, karkea, ei metallia
// leivonnassa ('metalli' ja 'rauta' leivotaan ruosteisena metallitekstuurina, joka hehkui kuparina). Pata = kattila-resepti
// (runko + sanka) kolmella rautajalalla.
const RAUTA = { runko: 'kengat', sanka: 'kengat', tanko: 'kengat', pata: 'kengat', yla: 'kengat', ala: 'kengat', sivu: 'kengat' };
const rautapata = ([x, yy, z], sade, korkeus, suunta = 0) => [
  { resepti: 'kattila', paikka: [x, r3(yy + 0.09), z], suunta, sade, korkeus, pinnat: RAUTA },
  ...[30, 150, 270].map((a) => ({
    resepti: 'laatta', paikka: [r3(x + 0.6 * sade * Math.sin((a + suunta) * RAD)), r3(yy + 0.09 + 0.07 * korkeus), r3(z - 0.6 * sade * Math.cos((a + suunta) * RAD))],
    suunta: 0, leveys: 0.04, syvyys: 0.04, paksuus: r3(0.09 + 0.07 * korkeus), pinnat: RAUTA,
  })),
];
const HZ = 11.22, HYLLYTASOT = [0.12, 0.703, 1.287, 1.87]; // hylly-reseptin tasot (korkeus 1,9, 4 hyllyä)
// Työpöytä länsiseinällä (taikinapöytä, suunta 90): x −24,25…−23,55, z 11,3…12,9, kansi 0,85.
const TX = -23.9, TZ = 12.1, TKK = 0.85;

// Lattia: lankut pohjois–eteläsuuntaan (L1: G 102:n kaivauksissa lattiatasoiksi tulkittuja hirsiä ja lankkuja; kävelymallin
// lattia 'puu'). Jokainen lankku (0,25 m) yhtenä laattana pihan seinän keskilinjasta kehämuurin sisään, ilman viisteitä ja
// rakoja (lankkulattia-reseptin 1 cm:n viisteet piirsivät liian vahvat saumaraidat); saumat näkyvät vain ±3 mm:n tasoeroina.
const LATTIA = Array.from({ length: 41 }, (_, i) => {
  const xa = X0 + (X1 - X0) * i / 41, xb = X0 + (X1 - X0) * (i + 1) / 41, z1 = etelaMax(xa, xb) + 0.05;
  return { resepti: 'laatta', paikka: [r3((xa + xb) / 2), y((((i * 7) % 5) - 2) * 0.0015), r3((ZP + z1) / 2)], suunta: 0,
    leveys: r3(xb - xa), syvyys: r3(z1 - ZP), paksuus: 0.1, pinnat: { yla: 'lankku', sivu: 'lankku', ala: 'puu' } };
});
// Lautakatto: yläpinta lattia + 4,25, alapinta + 4,22 (kavely.py); seinien päälle ulkopintoihin asti.
const KATTOPINNAT = { yla: 'lankku', ala: 'lankku', sivu: 'puu' };
const KATTO = [
  { resepti: 'laatta', paikka: [-19.7, y(H + 0.05), 11.795], suunta: 0, leveys: 11.1, syvyys: 3.29, paksuus: 0.03, pinnat: KATTOPINNAT },
  ...Array.from({ length: 12 }, (_, i) => {
    const xa = -25.25 + 11.1 * i / 12, xb = -25.25 + 11.1 * (i + 1) / 12, z1 = etelaMax(xa, xb);
    return { resepti: 'laatta', paikka: [r3((xa + xb) / 2), y(H + 0.05), r3((13.44 + z1) / 2)], suunta: 0, leveys: r3(xb - xa), syvyys: r3(z1 - 13.44), paksuus: 0.03, pinnat: KATTOPINNAT };
  }),
];
// Kattopalkit (kavely.py: x = x0 + 0,45 + 0,9 k, 0,22 × 0,24, z 10,4…15,7): päättyvät kehämuurin sisään (keskilinja +
// 0,3; kavely.py:n 15,7 jättäisi kaksi palkkia 0,1–0,4 m irti muurista keskellä huonetta), ja savuhuuvan kohdalla
// (2 palkkia) huuvan etupintaan (vaihdepalkki, ei läpi piipun). Palkit eivät ole kävelyn törmäyksessä.
const huuvanEtu = (x) => {
  const t = (H - 0.22 - TL.korkeus - HUUVA.korkeus - 0.25) / (HUUVA.yla - TL.korkeus - HUUVA.korkeus - 0.25);
  const w = TL.syvyys / 2 + (0.6 - TL.syvyys) * t, puoli = TL.leveys / 2 + (0.3 - TL.leveys / 2) * t;
  const u = (x - TK[0] - w * FA[0]) / RA[0];
  return Math.abs(u) <= puoli + 0.15 ? TK[1] + u * RA[1] + w * FA[1] : Infinity;
};
const PALKIT = Array.from({ length: 11 }, (_, k) => {
  const x = X0 + 0.45 + 0.9 * k, z1 = Math.min(etelaZ(x) + 0.3, huuvanEtu(x));
  return { resepti: 'laatta', paikka: [r3(x), y(H + 0.02), r3((10.4 + z1) / 2)], suunta: 0, leveys: 0.22, syvyys: r3(z1 - 10.4), paksuus: 0.24, pinnat: { yla: 'puu', ala: 'puu', sivu: 'puu' } };
});
const SEINAT = [
  // Pihan seinä: ovi (u −1,8) ja kaksi ikkunaa (u 0,9 ja 3,9). Kivi molemmin puolin (7.10. Päätoimittaja V1-stilleistä: sisäpuolen
  // rappaus näkyi 2k-atlaksessa sileän tasaisena ruskeana pääseinän kiven vieressä).
  {
    resepti: 'seina', paikka: [-19.7, Y, ZP], suunta: 0, pituus: 10.2, korkeus: H, paksuus: 0.9,
    aukot: [{ u: -1.8, y: 0, leveys: 1.1, korkeus: 2.0 }, { u: 0.9, y: 1.6, leveys: 0.6, korkeus: 0.8 }, { u: 3.9, y: 1.6, leveys: 0.6, korkeus: 0.8 }],
    pinnat: { taka: 'kivi' },
  },
  { resepti: 'seina', paikka: [X0, Y, 12.35], suunta: 270, pituus: 3.5, korkeus: H, paksuus: 0.9, pinnat: { taka: 'kivi' } }, // länsi (porttikäytävän puoli)
  { resepti: 'seina', paikka: [X1, Y, 13.0], suunta: 90, pituus: 4.8, korkeus: H, paksuus: 0.9, pinnat: { taka: 'kivi' } }, // itä
  // Kehämuuri (3,3 m:n muurin sisäosa, kavely.py 1,2 m): raakaa kiveä molemmin puolin.
  ...[[ETELA[0], ETELA[1], SA], [ETELA[1], ETELA[2], SB]].map(([a, b, s]) => ({
    resepti: 'seina', paikka: [r3((a[0] + b[0]) / 2), y(-0.5), r3((a[1] + b[1]) / 2)], suunta: r3(s),
    pituus: r3(Math.hypot(b[0] - a[0], b[1] - a[1])), korkeus: 6.2, paksuus: 1.2, pinnat: { taka: 'kivi' },
  })),
];

// Hahmot: samat henkilöt kuin vanhassa keittiössä (repliikit, reaktiot ja äänet sieltä), uudet paikat ja reitti.
const VANHA = Object.fromEntries(KEITTIO.hahmot.map((h) => [h.id, h]));
const KOKKI = tl(-0.4, 1.0); // tulisijan edessä padan ääressä, katse liesiin (suunta = muurin suunta + 180)
const HAHMOT = [
  { ...VANHA.kokki, paikka: KOKKI, suunta: r3(SA + 180), reitti: null, repliikit: [] },
  // Apulainen lakaisee huoneen avarimmassa kohdassa kehämuurin vieressä (harja 0,7 m edessä ±0,3 m: saaviin ≥ 0,4 m).
  { ...VANHA.apulainen, paikka: [-18.3, Y, 15.2], suunta: 300, reitti: null, repliikit: [] },
  // Vesipoika tuo vettä pihan ovelta saaville: pihan seinän vierustaa itään, pöydän itäpään ohi ja penkin taakse.
  // Reitti ≥ 0,35 m hyllyistä, pöydästä ja penkistä, ≥ 1 m kokista, apulaisesta ja tulesta (tests/dioraama-reitit).
  {
    ...VANHA.vesipoika, paikka: [-21.4, Y, 11.8], suunta: 90, repliikit: [],
    reitti: { pisteet: [[-21.4, Y, 11.8], [-18.25, Y, 11.8], [-18.25, Y, 13.85], [-19.4, Y, 14.15], [-18.25, Y, 13.85], [-18.25, Y, 11.8], [-21.4, Y, 11.8]], nopeus: 1.0, tauko: 1.5 },
  },
];

// Taulu ja kuunnelma kohtaukset v3 -muodossa (kohtaukset-v3.js ei tunne tätä id:tä): samat tekstit ja äänet kuin
// vanhalla keittiöllä, napautuskohteet (liesi, padat) uuteen tulisijaan.
const V3 = KOHTAUKSET_V3.keittio;
const KOHTEET = { 0: { paikka: tl(0, 0, TL.korkeus), sade: 1.9 }, 1: { paikka: tl(0, 0.05, TL.korkeus + 0.18), sade: 1.2 } };
const TAULU = {
  ...KEITTIO.taulu,
  kohdat: [
    ...KEITTIO.taulu.kohdat.map((k, i) => (KOHTEET[i] ? { ...k, kohde: KOHTEET[i] } : k)),
    ...KEITTIO.kuunnelma.filter((r) => r.puhuja === 'pulu').map((r) => ({ aani: r.aani, teksti: r.teksti, puhuja: 'pulu' })),
  ],
};

export const TILA = {
  id: 'keittio-g102',
  nimi: KEITTIO.nimi,
  infotaulu: KEITTIO.infotaulu,
  kuunnelma: [
    { id: 'keittio-g102-kertoja', puhuja: 'kertoja', nimi: 'Kertoja', aani: 'keittio-kertoja', teksti: V3.kertoja },
    { id: 'keittio-g102-keskustelu', puhuja: 'keskustelu', nimi: '', aani: 'keittio-keskustelu', teksti: V3.vuorot.map((v) => v.teksti).join(' '), vuorot: V3.vuorot },
  ],
  // Ei linssin huonevalinnassa ennen natiivin todennusta (vaihto: kohdistettava true + lappujarjestys 1 + elava.vihje
  // tänne, ja vanha 'keittio' pois kiertueelta/tiloista; ks. luovutusraportti).
  kohdistettava: false,
  rajat: { min: [-24.35, Y, 11.05], max: [-15.05, y(H), 16.1] },
  // Leikkausikkuna kuoreen koko siiven ja kehämuurin yli (G 102 puuttuu kuoresta: piha ja muuri leikataan pois).
  leikkaus: { laajennus: 1.0, kameraan: false, min: [-25.4, -2.85, 10.0], max: [-14.0, 3.1, 17.0] },
  naapurit: [],
  // Kamera huoneen sisältä koillisnurkasta katon rajasta (pihan ja itäseinän kulmassa, rajojen ulkopuolella seinien
  // sisällä; leivottu varjostin piirtää vain etupinnat, joten seinät eivät peitä): pöydän yli kohti tulisijaa, 27° alas.
  kamera: { kohde: [-20.6, -2.1, 13.5], atsimuutti: 66.4, korkeus: 27, etaisyys: 7.16, fov: 50, aukko: 0.8 },
  // Pysty: sama silmä, katse jyrkemmin alas (45°), jolloin huone jää kuvan yläosaan taulun yläpuolelle.
  kameraPysty: { kohde: [-18.23, -2.65, 12.47], atsimuutti: 66.4, korkeus: 45, etaisyys: 5.37, fov: 70, aukko: 0.8 },
  pulu: { ...KEITTIO.pulu, laskeutuminen: [-20.6, y(0.45), 13.36] },
  taulu: TAULU,
  // Pihan puolen julkisivu ikkunoiden kohdalla (ei vihjettä: se on vanhalla keittiöllä, kunnes tämä vaihtuu tilalle).
  elava: { kohde: [-17.3, y(2.0), 10.15], sade: 6 },
  valot: [
    // Tulisija kantaa tunnelman kuten vanhassa keittiössä (lepatus 0,35); hiilloksen keskellä, Blender nostaa 0,9 m.
    { paikka: tl(0, 0, 0.5), sade: 8, voima: 2.4, vari: '#ff9a4a', lepatus: 0.35 },
    // Hiillosvalo halkojen keskellä (lepatus < 0,3, joten Blender ei nosta sitä): tuli on huoneen kirkkain kohta.
    { paikka: tl(0, 0.3, TL.korkeus + 0.38), sade: 1.5, voima: 0.5, vari: '#ff6a1a', lepatus: 0.25 },
  ],
  palikat: [
    ...LATTIA, ...KATTO, ...PALKIT, ...SEINAT,

    // --- Tulisija ja savuhuuva kehämuuria vasten, tuli ja padat, ympärillä halot ja välineet.
    { resepti: 'tulisija', paikka: tl(0, 0), suunta: r3(SA), ...TL, huuva: HUUVA },
    // Tuli: hiilloskeko ja hehkuvat halot (pinta hiillos = emissio leivonnassa) lieden keskellä.
    { resepti: 'puukasa', paikka: tl(0.0, 0.32, TL.korkeus + 0.09), suunta: r3(SA + 90), pituus: 0.5, halkoja: 6, siemen: 411, pinnat: { puu: 'hiillos' } },
    { resepti: 'leipa', paikka: tl(0.0, 0.05, TL.korkeus + 0.02), suunta: 0, sade: 0.42, korkeus: 0.11, pinnat: { leipa: 'hiillos' } },
    { resepti: 'leipa', paikka: tl(-0.3, 0.2, TL.korkeus + 0.02), suunta: 40, sade: 0.25, korkeus: 0.08, pinnat: { leipa: 'hiillos' } },
    // Valurautapata kolmijalalla hiilloksella ja toinen haahlassa (rautatanko huuvan reunuksen sisällä) tulen yllä.
    ...rautapata(tl(-0.62, 0.05, TL.korkeus + 0.04), 0.22, 0.28, r3(SA)),
    { resepti: 'laatta', paikka: tl(0, 0, TL.korkeus + HUUVA.korkeus + 0.19), suunta: r3(SA), leveys: 2.38, syvyys: 0.04, paksuus: 0.04, pinnat: RAUTA },
    { resepti: 'riippupata', paikka: tl(0.5, 0, TL.korkeus + HUUVA.korkeus + 0.15), suunta: 0, ripustinKorkeus: 1.06, sade: 0.2, patakorkeus: 0.26, pinnat: RAUTA },
    // Huuvan tuki: kivikonsolit huuvan sivuilla muurista eteen, porrastettu kivi niiden alla ja tammipalkki edessä;
    // piippu jatkuu katon läpi.
    ...[-1, 1].flatMap((k) => [
      { resepti: 'laatta', paikka: tl(k * 1.08, 0, TL.korkeus + HUUVA.korkeus), suunta: r3(SA), leveys: 0.24, syvyys: 1.1, paksuus: 0.22, pinnat: { yla: 'kivi', ala: 'kivi', sivu: 'kivi' } },
      { resepti: 'laatta', paikka: tl(k * 1.08, -0.35, TL.korkeus + HUUVA.korkeus - 0.22), suunta: r3(SA), leveys: 0.24, syvyys: 0.4, paksuus: 0.35, pinnat: { yla: 'kivi', ala: 'kivi', sivu: 'kivi' } },
    ]),
    { resepti: 'laatta', paikka: tl(0, 0.44, TL.korkeus + HUUVA.korkeus), suunta: r3(SA), leveys: 2.4, syvyys: 0.22, paksuus: 0.22, pinnat: { yla: 'puu', ala: 'puu', sivu: 'puu' } },
    { resepti: 'laatta', paikka: tl(0, -0.22, H + 1.2), suunta: r3(SA), leveys: 0.75, syvyys: 0.7, paksuus: 1.2, pinnat: { yla: 'kivi', ala: 'kivi', sivu: 'kivi' } },
    // Halot (pinoutuvat u 0…0,5 origosta) tulisijan itäpuolella muuria vasten, pieni kolmijalkapata niiden edessä
    // (faktapohja-olavinlinna-1500.md osa 4: kattila EPÄVARMA → pata).
    { resepti: 'puukasa', paikka: tl(1.35, -0.25), suunta: r3(SA), pituus: 0.42, halkoja: 9, siemen: 403 },
    { resepti: 'hiillospihdit', paikka: tl(1.0, 0.75, 0.01), suunta: r3(SA + 70), pituus: 0.4 },
    ...rautapata(tl(1.5, 0.35), 0.17, 0.22, -30),

    // --- Saavi ja sangot kehämuurin vieressä (vesipoika kantaa vettä tähän).
    { resepti: 'saavi', paikka: [-19.75, Y, 15.0], suunta: 0, sade: 0.42, korkeus: 0.48 },
    { resepti: 'vesisanko', paikka: [-19.3, Y, 15.55], suunta: 40, sade: 0.15, korkeus: 0.22 },
    { resepti: 'vesisanko', paikka: [-18.7, Y, 15.75], suunta: -20, sade: 0.14, korkeus: 0.2 },

    // --- Pöytä keskellä, penkki eteläpuolella (pohjoispuoli vapaa: partio ja vesipoika kulkevat siitä).
    { resepti: 'poyta', paikka: [PX, Y, PZ], suunta: 0, leveys: 2.4, syvyys: 0.8, korkeus: PK },
    { resepti: 'penkki', paikka: [PX, Y, 13.36], suunta: 0, leveys: 2.0, syvyys: 0.32, korkeus: 0.45 },
    // Pöydällä (kävelymallin heitettävien kohdat x −21,0 / −20,4 / −19,2 jätetty vapaiksi).
    { resepti: 'leipa', paikka: [-20.72, y(PK), 12.38], suunta: 10, sade: 0.1, korkeus: 0.08 },
    { resepti: 'leipa', paikka: [-20.5, y(PK), 12.42], suunta: 200, sade: 0.09, korkeus: 0.075 },
    { resepti: 'leikkuulauta', paikka: [-19.85, y(PK), 12.45], suunta: 15 },
    { resepti: 'kala', paikka: [-19.88, y(PK + 0.02), 12.44], suunta: 200, pituus: 0.28 },
    { resepti: 'veitsi', paikka: [-19.62, y(PK + 0.02), 12.52], suunta: 100 },
    { resepti: 'vati', paikka: [-19.6, y(PK), 12.82], suunta: 0, sade: 0.15, pinnat: PUUVATI },
    { resepti: 'kala', paikka: [-19.62, y(PK + 0.02), 12.82], suunta: 160, pituus: 0.26 },
    { resepti: 'ruukku', paikka: [-21.0, y(PK), 12.95], suunta: 0, sade: 0.11, korkeus: 0.2 },
    { resepti: 'suolalaatikko', paikka: [-20.05, y(PK), 12.9], suunta: 5 },
    { resepti: 'ruukku', paikka: [-19.0, y(PK), 12.85], suunta: 0, sade: 0.07, korkeus: 0.14 },
    { resepti: 'kynttilanjalka', paikka: [-20.0, y(PK), 12.35], suunta: 0, korkeus: 0.17 }, // talikynttilä rautajalassa

    // --- Taikinapöytä länsiseinällä: kohoavat ruisleivät, huhmar, ruukut.
    { resepti: 'poyta', paikka: [TX, Y, TZ], suunta: 90, leveys: 1.6, syvyys: 0.7, korkeus: TKK },
    { resepti: 'leipa', paikka: [-23.95, y(TKK), 11.6], suunta: 0, sade: 0.11, korkeus: 0.07 },
    { resepti: 'leipa', paikka: [-23.85, y(TKK), 11.9], suunta: 40, sade: 0.11, korkeus: 0.07 },
    { resepti: 'leipa', paikka: [-24.0, y(TKK), 12.2], suunta: 80, sade: 0.1, korkeus: 0.07 },
    { resepti: 'huhmar', paikka: [-23.78, y(TKK), 12.55], suunta: 0, sade: 0.1, korkeus: 0.12 },
    { resepti: 'ruukku', paikka: [-24.05, y(TKK), 12.7], suunta: 0, sade: 0.12, korkeus: 0.22 },
    { resepti: 'vesisanko', paikka: [-23.85, Y, 12.55], suunta: 10, sade: 0.14, korkeus: 0.2 }, // pöydän alla

    // --- Pihan seinä.
    // Yksi hyllykkö ikkunoiden välissä (Päätoimittaja); oven ja länsi-ikkunan välissä matala vesipenkki sankoineen.
    { resepti: 'penkki', paikka: [-20.02, Y, 11.25], suunta: 0, leveys: 1.4, syvyys: 0.32, korkeus: 0.45 },
    { resepti: 'vesisanko', paikka: [-20.45, y(0.45), 11.25], suunta: 20, sade: 0.14, korkeus: 0.2 },
    { resepti: 'vesisanko', paikka: [-20.0, y(0.45), 11.25], suunta: -40, sade: 0.14, korkeus: 0.2 },
    { resepti: 'ruukku', paikka: [-19.55, y(0.45), 11.25], suunta: 0, sade: 0.11, korkeus: 0.2 },
    { resepti: 'ruukku', paikka: [-19.6, Y, 11.3], suunta: 0, sade: 0.12, korkeus: 0.24 },
    { resepti: 'hylly', paikka: [-17.3, Y, HZ], suunta: 180, leveys: 1.9, korkeus: 1.9, syvyys: 0.32, hyllyt: 4 },
    // A (x −18,25…−16,35)
    { resepti: 'ruukku', paikka: [-17.95, y(HYLLYTASOT[0]), HZ], suunta: 0, sade: 0.12, korkeus: 0.24 },
    { resepti: 'ruukku', paikka: [-17.4, y(HYLLYTASOT[0]), HZ], suunta: 0, sade: 0.12, korkeus: 0.22 },
    { resepti: 'ruukku', paikka: [-16.75, y(HYLLYTASOT[0]), HZ], suunta: 0, sade: 0.11, korkeus: 0.2 },
    { resepti: 'vati', paikka: [-17.95, y(HYLLYTASOT[1]), HZ], suunta: 0, sade: 0.14, pinnat: PUUVATI },
    { resepti: 'ruukku', paikka: [-17.45, y(HYLLYTASOT[1]), HZ], suunta: 0, sade: 0.11, korkeus: 0.19 },
    { resepti: 'ruukku', paikka: [-17.0, y(HYLLYTASOT[1]), HZ], suunta: 0, sade: 0.08, korkeus: 0.15 },
        { resepti: 'ruukku', paikka: [-18.0, y(HYLLYTASOT[2]), HZ], suunta: 0, sade: 0.1, korkeus: 0.17 },
    { resepti: 'kynttilanjalka', paikka: [-17.4, y(HYLLYTASOT[2]), HZ], suunta: 0, korkeus: 0.17 }, // talikynttilä
    { resepti: 'suolalaatikko', paikka: [-16.85, y(HYLLYTASOT[2]), HZ], suunta: 0 },
    { resepti: 'ruukku', paikka: [-17.9, y(HYLLYTASOT[3]), HZ], suunta: 0, sade: 0.07, korkeus: 0.13 },
    { resepti: 'ruukku', paikka: [-17.35, y(HYLLYTASOT[3]), HZ], suunta: 0, sade: 0.1, korkeus: 0.17 },
    { resepti: 'vati', paikka: [-16.8, y(HYLLYTASOT[3]), HZ], suunta: 0, sade: 0.13, pinnat: PUUVATI },

    // --- Itäpää: kolme tynnyriä piilon edessä (pääsy lännestä muurin vierustaa), säkit, kirnu ja nauriskorit.
    { resepti: 'tynnyri', paikka: [-15.55, Y, 13.2], suunta: 0, sade: 0.33, korkeus: 0.9, segmentit: 16 },
    { resepti: 'tynnyri', paikka: [-16.35, Y, 13.3], suunta: 0, sade: 0.33, korkeus: 0.9, segmentit: 16 },
    { resepti: 'tynnyri', paikka: [-16.65, Y, 14.1], suunta: 0, sade: 0.33, korkeus: 0.9, segmentit: 16 },
    { resepti: 'ruukku', paikka: [-16.35, y(0.9), 13.3], suunta: 0, sade: 0.1, korkeus: 0.18 },
    { resepti: 'sakki', paikka: [-15.45, Y, 12.3], suunta: 0, sade: 0.3, korkeus: 0.6, siemen: 21 },
    { resepti: 'sakki', paikka: [-16.2, Y, 12.5], suunta: 30, sade: 0.28, korkeus: 0.55, siemen: 22 },
    { resepti: 'sakki', paikka: [-15.55, Y, 11.65], suunta: 0, sade: 0.26, korkeus: 0.5, siemen: 23 },
    { resepti: 'kirnu', paikka: [-16.2, Y, 11.5], suunta: 0, sade: 0.13, korkeus: 0.55 },
    { resepti: 'nauriskori', paikka: [-17.5, Y, 12.55], suunta: 0, sade: 0.2, korkeus: 0.2, nauriita: 5, siemen: 503 },
    { resepti: 'nauriskori', paikka: [-17.3, Y, 15.15], suunta: 30, sade: 0.18, korkeus: 0.18, nauriita: 4, siemen: 504 },

    // --- Yrttinipput palkeista (kiinnitys palkin alapintaan lattia + 3,98).
    { resepti: 'yrttinippu', paikka: [-23.45, y(H - 0.22), 12.2], suunta: -5, korkeus: 0.28 },
    { resepti: 'yrttinippu', paikka: [-23.45, y(H - 0.22), 11.6], suunta: 10, korkeus: 0.24 },
    { resepti: 'yrttinippu', paikka: [-18.95, y(H - 0.22), 12.3], suunta: 0, korkeus: 0.32 },
    { resepti: 'yrttinippu', paikka: [-18.05, y(H - 0.22), 13.6], suunta: 15, korkeus: 0.28 },
    { resepti: 'yrttinippu', paikka: [-17.15, y(H - 0.22), 12.1], suunta: -10, korkeus: 0.3 },
    { resepti: 'yrttinippu', paikka: [-16.25, y(H - 0.22), 14.4], suunta: 5, korkeus: 0.3 },
  ],
  etsinta: KEITTIO.etsinta.map((e) => ({ ...e, kohde: [KOKKI[0], y(1.8), KOKKI[2]] })),
  hahmot: HAHMOT,
  aanet: KEITTIO.aanet,
  tehosteet: KEITTIO.tehosteet,
  liekit: [
    { liekki: 'tulisija', paikka: tl(0, 0.05, TL.korkeus + 0.05), koko: 1, vaihe: 0 },
    { liekki: 'tulisija', paikka: tl(-0.25, 0.15, TL.korkeus + 0.05), koko: 0.6, vaihe: 0.4 },
    { liekki: 'tulisija', paikka: tl(0.25, -0.05, TL.korkeus + 0.05), koko: 0.6, vaihe: 0.7 },
    // Talikynttilät (kärki = jalka + korkeus × 0,98): pöydällä ja hyllyllä, keittiössä niukasti (faktapohja osa 4.4).
    { liekki: 'kynttila', paikka: [-20.0, y(PK + 0.167), 12.35], koko: 1, vaihe: 0.3 },
    { liekki: 'kynttila', paikka: [-17.4, y(HYLLYTASOT[2] + 0.167), HZ], koko: 1, vaihe: 0.5 },
  ],
  kasikirjoitus: [{ tee: 'pulu-lenna' }, { tee: 'taulu' }],
};
