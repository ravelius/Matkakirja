// OLAVINLINNA / kappeli: Kirkkotornin 3. kerros (torni [0, 0, −20], sisäsäde 3,9), lattia y 9,4 (malli 9,6): alttarit, 12 vihkimisristiä.
// Erä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md). Taulun faktat: Sisältökirjuri 29.9.
// (docs/raportit/sisaltokirjuri-olavinlinna-era3-20260929.md); tila 'luonnos' kunnes äänet ja tarkistus valmiit.
//
// Asettelu: torni [0, 0, −20], auki-sektori 95…230 (kompassi, kamera etelä-kaakosta). Pääalttari itäseinällä (80°),
// sivualttarit 40° ja 320° (fi.wikipedia: kolme alttaria), hagioskooppirako pohjassa (3°), 12 vihkimisristiä
// seinäkaarella sektorin ulkopuolella. EI krusifiksia (Hannes Autere 1939).
// Mitat lähteistä (7.10.2026, _lahteet/olavinlinna-pohjat/SEIKKAILU-TARKISTUS.md kohta 4 ja sivulöydöt; V = kaksi
// lähdettä, A = päätelty): Kirkkotornin 3. kerros (V), ikkunaton lukuun ottamatta koillismuurin ahdasta luukkuikkunaa (Aspelin 1875), RISTIHOLVI (Maconi 1910), sisähalkaisija
// noin 7,8 m (A, Maconin leikkaus), lattia +92,6 (malli 9,6, muunnos malli = NN − 83,0), holvin laki +98,2 (malli 15,2).
// Kappelin yläosaa kiertää 8-aukkoinen ampumakäytävä +96,4…+96,9 (malli 13,4…13,9) MUURIN SISÄLLÄ: ei aukkoja huoneeseen.
// Oma lattia on `kiekko` (y 9,0…9,4) ja holvi `kupoli` + ristiholvi (laki 5,6 m lattiasta).

const TAULU = {
  otsikko: 'Kirkkotornin kappeli',
  // Sisältökirjurin tarkistus 29.9. (docs/raportit/sisaltokirjuri-olavinlinna-era4-tarkistus-20260929.md, K1–K3).
  tila: 'tarkistettu',
  kohdat: [
    // Sisältökirjuri 30.9. (5684d5d81): vuosiluku 1499 ja "ainutlaatuinen" ilman lähdettä → korjattu.
    { aani: 'kappeli-kohta-0', teksti: 'Kappeli on Kirkkotornin kolmannessa kerroksessa, ja sen seinää kiertää kaksitoista vihkimäristiä.', lahde: 'Finna M012:RHO217939:34; Wikipedia: Olavinlinna; Apu: Suomen keskiaikaiset kivilinnat 6/6' },
    { aani: 'kappeli-kohta-1', teksti: 'Seinän pieni aukko on hagioskooppi: rikolliset ja sairaat seurasivat messua sen kautta.', lahde: 'Finna M012:RHO217939:34; Wikipedia: Olavinlinna; Apu: Suomen keskiaikaiset kivilinnat 6/6' },
    { aani: 'kappeli-kohta-2', teksti: 'Kattomaalausten jäänteistä erottaa vielä lehti- ja kukkakuvioita sekä vaakunoita.', lahde: 'Kansallismuseo: Pyhä Olavi' },
  ],
};

// ---------------------------------------------------------------------------
// Geometria-apurit. Kompassikulma a (0 = pohjoinen −z, 90 = itä +x); tornin keskipiste [0, −20].
const RAD = Math.PI / 180;
const CX = 0, CZ = -20;
const LATTIA = 9.4; // lattian yläpinta (sijoitus +0,2 → malli 9,6)
const SEINA = 3.88; // sisäseinän pinta (sisäsäde 3,9, hitsaus ei näy)
const HOLVI = { lahto: 12.3, laki: 15.0 }; // ristiholvin lähtö seinällä (L3: lattia + 2,8…3,3) ja laki (lattia + 5,6)
const r3 = (v) => Math.round(v * 1000) / 1000;
// Piste kompassikulmassa a, säteellä r, korkeudella y.
const pol = (a, r, y) => [r3(CX + r * Math.sin(a * RAD)), y, r3(CZ - r * Math.cos(a * RAD))];
// Paikallinen (u, y, w) → maailma palikan paikasta ja suunnasta (kuten reseptit.mjs:n sijoita).
function paik(paikka, suunta, u, y, w) {
  const s = suunta * RAD;
  return [r3(paikka[0] + u * Math.cos(s) + w * Math.sin(s)), r3(paikka[1] + y), r3(paikka[2] + u * Math.sin(s) - w * Math.cos(s))];
}
// Lattialla/kohdassa seisova kalustepalikka kompassikulmassa a: etupuoli (w+) osoittaa keskelle.
const seinalla = (resepti, a, r, extra = {}) => ({ resepti, paikka: pol(a, r, LATTIA), suunta: a + 180, ...extra });

// --- Alttarit (kolme, fi.wikipedia): pääalttari itäseinällä, kaksi sivualttaria. Kynttilänjalat + kirja + vati päällä.
const ALTTARIT = [
  { a: 80, r: 3.5, leveys: 1.4, korkeus: 1.0, jalka: 0.36 },
  { a: 38, r: 3.5, leveys: 1.0, korkeus: 0.95, jalka: 0.28 },
  { a: 322, r: 3.5, leveys: 1.0, korkeus: 0.95, jalka: 0.28 },
];
const KYNTTILAN_KARKI = 0.98; // kynttilänjalan kynttilän yläpää (kerroin korkeus × 0,98)
const LIEKIT = [];
const liekki = (paikka, koko = 1.4, vaihe = 0) => LIEKIT.push({ liekki: 'kynttila', paikka, koko, vaihe });

const ALTTARIPALIKAT = [];
ALTTARIT.forEach((al, i) => {
  const P = pol(al.a, al.r, LATTIA), s = al.a + 180;
  const yPaalla = al.korkeus - 0.031;
  ALTTARIPALIKAT.push({ resepti: 'alttari', paikka: P, suunta: s, leveys: al.leveys, syvyys: 0.6, korkeus: al.korkeus });
  const uJ = al.leveys / 2 - 0.2;
  [-1, 1].forEach((m, j) => {
    const pj = paik(P, s, m * uJ, yPaalla, 0.02);
    ALTTARIPALIKAT.push({ resepti: 'kynttilanjalka', paikka: pj, suunta: 0, korkeus: al.jalka });
    liekki(paik(pj, 0, 0, al.jalka * KYNTTILAN_KARKI, 0), 1.4, (i * 2 + j) * 0.23);
  });
  ALTTARIPALIKAT.push({ resepti: 'kirja', paikka: paik(P, s, 0, yPaalla, 0.02), suunta: s + 90 * (i === 0 ? 0 : 1) + 5 * i });
  ALTTARIPALIKAT.push({ resepti: 'vati', paikka: paik(P, s, i === 0 ? 0.3 : 0.22, yPaalla, 0.08), suunta: 0, sade: 0.1 });
  if (i === 0) ALTTARIPALIKAT.push({ resepti: 'pullo', paikka: paik(P, s, -0.28, yPaalla, 0.06), suunta: 0, sade: 0.04, korkeus: 0.15 });
});
// Pääalttarin molemmin puolin lattiakynttilänjalat (kantavat tunnelmaa) + polvituoli portaan edessä.
const PA = pol(80, 3.5, LATTIA);
const LATTIAJALAT = [-1, 1].map((m, j) => {
  const pj = paik(PA, 260, m * 1.15, 0, 0.35);
  liekki(paik(pj, 0, 0, 0.9 * KYNTTILAN_KARKI, 0), 1.8, 0.11 + j * 0.31);
  return { resepti: 'kynttilanjalka', paikka: pj, suunta: 0, korkeus: 0.9 };
});
const POLVITUOLI = { resepti: 'penkki', paikka: paik(PA, 260, 0, 0, 0.98), suunta: 260, leveys: 0.7, syvyys: 0.3, korkeus: 0.22 };

// --- Kynttiläkruunu holvin keskeltä: kiinnitys ristiholvin laessa (y 15,0), ketju 1,8, 6 kynttilää.
const KRUUNU = { y: HOLVI.laki, sade: 0.42, ketju: 1.8, n: 6 };
for (let i = 0; i < KRUUNU.n; i++) {
  const ka = (360 * i) / KRUUNU.n + 18; // kuten resepti: u = sade sin ka, w = sade cos ka (suunta 0: z = pz − w)
  liekki([r3(CX + KRUUNU.sade * Math.sin(ka * RAD)), r3(KRUUNU.y - KRUUNU.ketju + 0.02 + 0.15), r3(CZ - KRUUNU.sade * Math.cos(ka * RAD))], 1.5, i * 0.17);
}

// --- Pulpetti kirjoineen (kirja kansissa on osa reseptiä) + kynttilä takalistalla.
const PULPETTI = [0.9, LATTIA, -21.9]; // 7.10.: sisäsäde 3,9 → lähemmäs keskustaa (sivualttari 38°)
const pulpKynt = paik(PULPETTI, 180, -0.2, 1.1, -0.2);
liekki(paik(pulpKynt, 0, 0, 0.25 * KYNTTILAN_KARKI, 0), 1.4, 0.6);

// --- 12 vihkimisristiä seinäkaarella sektorin (95…230) ulkopuolella.
const RISTIT = [];
// 7.10. E3: kaari-ovi (300°), kätkö (38,75°) ja oikea ikkuna (58,7°) vaativat välit: 12 ristiä näkyvälle kaarelle
// (230…95) esteiden väleihin (kaari-ovi 291…309, hagioskooppi 3, kätkö 35…42, ikkuna 57…61).
for (const a of [236, 252, 268, 284, 318, 333, 348, 13, 28, 49.5, 71, 87]) {
  RISTIT.push({ resepti: 'vihkimisristi', paikka: pol(a, SEINA, 10.75), suunta: a + 180, sade: 0.26 }); // 7.10.: 0,34 → 0,26 (pienempi seinä)
}

// Hagioskooppirako (pohjaseinä 3°, kammion aukko) ja koillismuurin ainoa ahdas ikkuna (Aspelin 1875, Sisältökirjurin
// lähdetarkistus #4129; Maconi 1910 ei näytä sitä): kivireunus laatoista. Ikkuna 58,7° ristien 49,4° ja 68° välissä, korkealla
// (lattia + 1,5…2,3), suljettu rautaluukulla; valo tulee edelleen kynttilöistä.
const KIVI = { yla: 'kivi', sivu: 'kivi', ala: 'kivi' }; // 7.10.: kivireunus (laatan oletus yla = lankku näytti puulta)
// Sivualttarin (38°) kätkösyvennys E3:lle: kompassi a0…a1 (ristien 30,8° ja 49,4° välissä), lattia + 1,1…1,5 (alttaripöydän
// yläpuolella), syvyys 0,4. Irrotettavat kivet, kalkki, pateeni ja liuskekivi ovat kavely-merkkien esineitä (eivät leivottuja).
// 7.10. E3-käsikirjoitus (#4155): ontelo 0,5 × 0,4 × 0,4 m, umpimuuraus neljästä kivestä (2 × 2).
const SYV = { a: 38.75, a0: 35.06, a1: 42.44, y0: LATTIA + 1.1, y1: LATTIA + 1.5, leveys: 0.5, syvyys: 0.4 };
// Kaari-ovi (Maconi 1910: "oikealla kaari-ovi noin 1,05 m, josta askelmat seinänsisäiseen tilaan"; E3: portaat ampumakäytävään,
// TULKINTA) luoteessa 300°, 1,05 × 2,4 m. Kävelyosa kappeli-kavely jatkaa portaat seinän sisään.
const KAARIOVI = { a: 300, puoli: 7.75, y0: 9.0, y1: LATTIA + 2.4 };
const IKKUNA = { a: 58.7, puoli: 1.92, y0: LATTIA + 1.5, y1: LATTIA + 2.3 };
const SEINAN_AUKOT = [
  [KAARIOVI.a - KAARIOVI.puoli, KAARIOVI.a + KAARIOVI.puoli, KAARIOVI.y0, KAARIOVI.y1],
  [SYV.a0, SYV.a1, SYV.y0, SYV.y1],
  [IKKUNA.a - IKKUNA.puoli, IKKUNA.a + IKKUNA.puoli, IKKUNA.y0, IKKUNA.y1],
];
// Torniseinä vaakakaistoina: kaistan rajat = aukkojen y-rajat; kaistalla vapaat kulmavälit näkyvällä kaarella 230…455 → kukin
// torni-palikka, jonka auki = välin komplementti (torni pitää välin [loppu, alku + 360]).
function seinaAukoin() {
  const Y0 = 9.0, Y1 = 15.6;
  const rajat = [...new Set([Y0, Y1, ...SEINAN_AUKOT.flatMap(([, , y0, y1]) => [y0, y1])])].filter((y) => y >= Y0 && y <= Y1).sort((p, q) => p - q);
  const osat = [];
  for (let i = 0; i < rajat.length - 1; i++) {
    const ya = rajat[i], yb = rajat[i + 1], ym = (ya + yb) / 2;
    const esteet = SEINAN_AUKOT.filter(([, , y0, y1]) => ym > y0 && ym < y1)
      .map(([a0, a1]) => [a0 < 230 ? a0 + 360 : a0, a1 < 230 ? a1 + 360 : a1]).sort((p, q) => p[0] - q[0]);
    let alku = 230;
    for (const [a0, a1] of [...esteet, [455, 455]]) {
      if (a0 - alku > 0.01) osat.push({ resepti: 'torni', paikka: [CX, ya, CZ], suunta: 0, sade: 6.6, paksuus: 2.7, korkeus: r3(yb - ya), segmentit: 32, auki: { alku: r3(a0 - 360), loppu: r3(alku) } });
      alku = Math.max(alku, a1);
    }
  }
  // Ikkunatunnelin ja kaari-oven aukon katot (seinän paksuuden läpi / oven syvennys)
  osat.push({ resepti: 'laatta', paikka: pol(IKKUNA.a, SEINA + 1.36, IKKUNA.y1 + 0.04), suunta: IKKUNA.a + 180, leveys: 0.36, syvyys: 2.8, paksuus: 0.06, pinnat: KIVI });
  osat.push({ resepti: 'laatta', paikka: pol(KAARIOVI.a, SEINA + 0.4, KAARIOVI.y1 + 0.04), suunta: KAARIOVI.a + 180, leveys: 1.15, syvyys: 0.9, paksuus: 0.06, pinnat: KIVI });
  // Kaari-oven aukon pohja ulkopinnan sisällä (r 6,45): dioraamassa ei näy taivasta; kävelyosan portaat pysyvät r < 6,3.
  osat.push({ resepti: 'laatta', paikka: pol(KAARIOVI.a, 6.47, KAARIOVI.y1), suunta: KAARIOVI.a + 180, leveys: 2.0, syvyys: 0.05, paksuus: r3(KAARIOVI.y1 - KAARIOVI.y0), pinnat: KIVI });
  return osat;
}
const REIAT = [];
for (const h of [
  { a: 3, y: 10.05, leveys: 0.24, korkeus: 0.5 }, // hagioskooppi
  { a: 58.7, y: LATTIA + 1.5, leveys: 0.26, korkeus: 0.8, aukko: true }, // koillisikkuna (Aspelin 1875): todellinen aukko
]) {
  if (!h.aukko) REIAT.push({ resepti: 'rako', paikka: pol(h.a, SEINA, h.y), suunta: h.a + 180, leveys: h.leveys, korkeus: h.korkeus });
  REIAT.push({ resepti: 'laatta', paikka: pol(h.a, SEINA - 0.13, h.y), suunta: h.a + 180, leveys: h.leveys + 0.3, syvyys: 0.3, paksuus: 0.07, pinnat: KIVI });
  REIAT.push({ resepti: 'laatta', paikka: pol(h.a, SEINA - 0.13, h.y + h.korkeus + 0.07), suunta: h.a + 180, leveys: h.leveys + 0.3, syvyys: 0.3, paksuus: 0.07, pinnat: KIVI });
  // Rautaluukku on kävelyosan avattava esine (esine-luukku.glb, merkki luukku:koillinen), ei leivottu.
}

// --- Hahmot: kappalainen pääalttarin ääressä (messu), vouti seurakuntalaisena penkin luona.
const KAPPELI_HAHMOT = [
  {
    // 5.10. (Päätoimittaja, Siirtosepän video): [3.35, LATTIA + 0.22, -20.8] oli polvituolin (penkki 0,22) päällä, joten
    // kappalainen seisoi puhuessaan jakkaralla. Nyt lattialla polvituolin vieressä kameran puolella (polvituolin kehyksessä
    // u −0,75, w 0,98), jossa sekä seisova puhe että polvirukous (tyo) mahtuvat. Lähin lattiakynttilä 0,75 m.
    // 7.10.: sisäsäde 5 → 3,9, paikka lasketaan polvituolin kehyksestä (u −0,75, w 0,98).
    id: 'kappalainen', henkilo: 'kappalainen-1500', paikka: paik(PA, 260, -0.75, 0, 0.98), suunta: 90, peilattu: false,
    silmukka: 'tyo', heraa: 1, reitti: null,
    // 9.10. (PT/Siirtoseppä, juna 174, vaihtoehto B): oma rukouskirja käsissä työsilmukassa (polvituoli ja sommittelu ennallaan).
    // Kirja blender/hahmot/rukouskirja.glb (linna-hahmot/esineet-v1/lahde/rukouskirja.py): origo keskellä, X korkeus 0,21, Y paksuus
    // 0,04 (+Y etukansi), Z selkämyksestä etureunaan 0,15. Oikea kämmen kannattelee alta (kehys 'kammen': kämmen −Y, sormet +Z,
    // origo käden luussa): kirjan takakansi kämmentä vasten, korkeus sormien suuntaan. Vasen käsi etukannella etureunan puolella,
    // kämmen kantta vasten, sormet selkämystä kohti (paikka ja kierto kirjan kehyksessä).
    kadet: [
      { tyyppi: 'kanna', kasi: 'r', esine: 'rukouskirja', glb: 'blender/hahmot/rukouskirja.glb', kehys: 'kammen',
        siirto: [0, -0.035, 0.08], kierto: [0.707107, 0, 0.707107, 0], milloin: 'tyo', paino: 1 },
      { tyyppi: 'tartu', kasi: 'l', esine: 'rukouskirja', paikka: [0, 0.035, 0.03], kierto: [0, 1, 0, 0], milloin: 'tyo', paino: 1 },
    ],
    repliikit: [
      { id: 'kappalainen-1', aani: 'kappeli-kappalainen-1', teksti: 'Dominus vobiscum. Herra olkoon teidän kanssanne – ja ääni alas, jos sallitte.' },
      { id: 'kappalainen-2', aani: 'kappeli-kappalainen-2', teksti: 'Vahakynttilä on kallis, siksi ne palavat vain messun ajan, eivät päivän mittaa.' },
    ],
    reaktio: { id: 'pulu-kappalainen-r1', aani: 'kappeli-pulu-kappalainen-r1', teksti: 'Latinaa! En ymmärrä sanaakaan, mutta kaiku tekee siitä aivan taivaallista.' },
  },
  {
    id: 'vouti', henkilo: 'vouti-1500', paikka: [-0.1, LATTIA, -18.3], suunta: 90, peilattu: false,
    silmukka: 'idle', heraa: 2, reitti: null,
    repliikit: [
      { id: 'vouti-1', aani: 'kappeli-vouti-1', teksti: 'Kaksitoista ristiä seinällä, yksi jokaista apostolia kohti. Lasken ne aina.' },
      { id: 'vouti-2', aani: 'kappeli-vouti-2', teksti: 'Tuosta pienestä aukosta sairaat ja kirkottamattomat kuulevat messun ulkopuolelta.' },
    ],
    reaktio: { id: 'pulu-vouti-r1', aani: 'kappeli-pulu-vouti-r1', teksti: 'Pieni aukko, suuri kuulumisen tarve. Nykyään sama tehdään suoratoistona.' },
  },
];

// Holvimaalausten jäänteet ja pääalttarin oikean puolen maalattu kilpi (Kansallismuseo: lehti- ja kukkakuvioita sekä vaakunoita;
// Härö 1997: holvissa pääalttarin oikealla maalattu, todennäköisesti Tottin vaakuna). Projektorit leivo_tila.py:lle: kuva
// (_valmiit-polku), keski (paikallinen), kompassi, tapa 'pysty' (vaakasuora heijastus kompassin suuntaan) tai 'alhaalta'
// (pystysuora heijastus holviin), leveys/korkeus (m), syvyys (m heijastussuunnassa), voima (peitto). Kuvat:
// _valmiit/olavinlinna-maalaukset-v1 (oma proseduraalinen työ).
const MK = (k) => `olavinlinna-maalaukset-v1/kuvat/${k}.png`;
const PP = (a, r, y) => [r3(CX + r * Math.sin(a * RAD)), y, r3(CZ - r * Math.cos(a * RAD))];
const MAALAUKSET = [
  { kuva: MK('kilpi-tott'), keski: PP(86, 3.5, 13.0), kompassi: 86, tapa: 'pysty', leveys: 0.45, korkeus: 0.56, syvyys: 0.7, voima: 0.85 },
  { kuva: MK('holvi-lehti-1'), keski: PP(320, 1.8, 14.0), kompassi: 50, tapa: 'alhaalta', leveys: 2.4, korkeus: 1.2, syvyys: 1.6, voima: 0.8 },
  { kuva: MK('holvi-lehti-2'), keski: PP(20, 1.9, 14.0), kompassi: 110, tapa: 'alhaalta', leveys: 2.2, korkeus: 1.1, syvyys: 1.6, voima: 0.75 },
  { kuva: MK('holvi-lehti-3'), keski: PP(268, 2.2, 13.9), kompassi: 358, tapa: 'alhaalta', leveys: 2.0, korkeus: 1.0, syvyys: 1.6, voima: 0.7 },
  { kuva: MK('holvi-lehti-2'), keski: PP(0, 3.6, 13.2), kompassi: 0, tapa: 'pysty', leveys: 1.6, korkeus: 0.8, syvyys: 0.7, voima: 0.7 },
];

export const TILA = {
  id: 'kappeli',
  lappujarjestys: 2,
  nimi: 'Kappeli',
  // Infotaulu (omistajan hyväksymä rakenne 30.9.): nimi + rivi siitä, mikä huone oli (Päätoimittaja, faktat
  // Sisältökirjuri 30.9. 5684d5d81); muoto kuten taulu.kohdat.
  infotaulu: { nimi: 'Kappeli', rivit: [{ teksti: 'Kirkkotornin kappeli: kaksitoista vihkimäristiä ja harvinainen hagioskooppi.', lahde: 'Finna M012:RHO217939:34; Wikipedia: Olavinlinna; Apu: Suomen keskiaikaiset kivilinnat 6/6' }] },
  // Kuunnelma (Päätoimittaja 30.9., v2 faktantarkistettu, docs/raportit/olavinlinna-kuunnelmat-20260930.md d22082f88):
  // kohtaus = rivijono; puhuja = tämän tilan hahmon id tai 'pulu' (huom = esim. oven takaa, ei näkyvissä).
  // id = tuleva ääni-id; aani null, kunnes omistaja valitsee äänet (ei generointia ennen lupaa).
  kuunnelma: [
    { id: 'kappeli-k1', puhuja: 'kappalainen', nimi: 'Pappi', aani: 'kappeli-k1',
      teksti: 'Dominus vobiscum… Herra vouti, iltarukous alkaa, ja te seisotte käytävällä kuin kadonnutta lammasta etsien.' },
    { id: 'kappeli-k2', puhuja: 'vouti', nimi: 'Vouti', aani: 'kappeli-k2',
      teksti: 'Anteeksi, isä. En etsi mitään. Laskin vain vihkimäristit – kaksitoista, niin kuin aina.' },
    { id: 'kappeli-k3', puhuja: 'kappalainen', nimi: 'Pappi', aani: 'kappeli-k3',
      teksti: 'Laskekaa mieluummin syntinne. Ja siirtykää: tuon pienen aukon takana sairaat odottavat näkevänsä alttarin.' },
    { id: 'kappeli-k4', puhuja: 'vouti', nimi: 'Vouti', huom: 'hiljaa', aani: 'kappeli-k4',
      teksti: 'Fatabuurin avain… missä minä sitä pitelinkään?' },
    { id: 'kappeli-k5', puhuja: 'pulu', nimi: 'Pulu', aani: 'kappeli-k5',
      teksti: 'Reikä seinässä messun seuraamiseen – Suomessa harvinaista herkkua. Ja voudilta näyttää puuttuvan muutakin kuin hartautta.' },
  ],
  kohdistettava: true,
  maalaukset: MAALAUKSET,
  // Uusi tapa (dioraama-rajapinnat-blender-20260929.md kohta 2): Kirkkotorni kuoressa mallin (−15,4, 14,6) (kartiokaton
  // huippu säteellä, 29.9. klo 21) eli glTF z −14,6; seinä ja lattia säteellä 6,6 kuoren sisäpuolella.
  // 7.10. korkeus lähteistä: lattia +92,6 NN = malli 9,6 (ennen 6,4), joten sijoitus y −3,0 → +0,2.
  sijoitus: { ankkuri: [0, 0, -20], paikka: [-15.4, 0.2, -14.6], suunta: 0 },
  rajat: { min: [-4, 9, -24], max: [4, 15.1, -16] },
  // Leikkaus kuoren tornin säteelle (≈ 7,5) ja kartiokaton huipun (32,3 → lähteessä 35,3) yli (Siirtoseppä 1.0.55).
  leikkaus: { laajennus: 1.0, kameraan: true, min: [-8, 9, -28], max: [8, 35.8, -12] },
  naapurit: ['massa', 'muurinharja', 'keskushalli'],
  kamera: {
    kohde: [0, 10.8, -20], atsimuutti: 165, korkeus: 17, etaisyys: 17.5, fov: 38, aukko: 0.8,
  },
  kameraPysty: {
    kohde: [0, 9.8, -20], atsimuutti: 165, korkeus: 18, etaisyys: 28, fov: 38, aukko: 0.8,
  },
  kierto: { atsimuutti: [-40, 40], korkeus: [8, 45], etaisyys: [0.7, 1.4] },
  // Pulu pulpetin yläreunalle (30.9.): penkin selkänojalla se peitti vihjeen 2 kaiverruksen pystykuvassa (x 0,33 vs 0,30).
  pulu: { aani: 'kappeli-pulu', laskeutuminen: [PULPETTI[0], LATTIA + 1.12, PULPETTI[2] + 0.05], taulupuoli: 'oikea',
    // Pulun kertomus (napautus reunakuvasta), tekstit v2 Päätoimittajalta (Sisältökirjuri 30.9.); ääni 1.10.2026 (omistajan lupa 30.9. klo 23.4x).
    teksti: 'Kappeli on Kirkkotornin kolmannessa kerroksessa, ja sen seinää kiertää kaksitoista vihkimäristiä. Katossa on säilynyt katkelmia maalauksista, muun muassa lehti- ja kukkakuvioita ja vaakunoita. Seinän pieni aukko on hagioskooppi, josta rikolliset ja sairaat seurasivat messua – Suomessa harvinainen ratkaisu.' },
  taulu: TAULU,
  // Elävä linna (29.9.): Kirkkotornin kylki kappelin kerroksessa kameran puolella (kynttilänvalo ikkunoissa).
  elava: { kohde: [1.9, 12.0, -12.8], sade: 6 },
  // Tumma yleisvalo; kynttiläkruunu ja alttarikynttilät kantavat tunnelman (jalkojen .valo tulee reseptistä).
  valot: [
    { paikka: [0, 12.1, -20], sade: 8, voima: 1.8, vari: '#ffb070', lepatus: 0.3 }, // kruunun ja penkkien alue
    // 5.10.: y 10,9 → 12,1. Matalalla valo oli kappalaisen rinnan korkeudella 0,25 m:n päässä, ja iho hehkui keltaisena.
    { paikka: [2.5, 12.1, -20.6], sade: 4.5, voima: 1.5, vari: '#ff9a4a', lepatus: 0.25 }, // pääalttari ja kappalainen
    { paikka: [0, 11.0, -22.4], sade: 4.5, voima: 0.9, vari: '#ffb070', lepatus: 0.2 }, // pohjaseinän ristit ja hagioskooppi
  ],
  palikat: [
    // Pyöreä lattia (sade 6,6, kuoren tornin sisällä): auki-sektorin kohdalla lattia jää "näyttämöksi".
    { resepti: 'kiekko', paikka: [CX, LATTIA, CZ], suunta: 0, sade: 6.6, paksuus: 0.4, segmentit: 32, pinnat: { yla: 'kivi' } },
    // Tornin seinä kerroksen korkeudelta (uusi tapa 29.9.: kuoressa ei ole sisäpintaa, massan torni ei ole mukana).
    // Seinä 2,7 m (sisäsäde 3,9) ja holvin yläpuolelle asti (y 9,0…15,6), ettei kennojen seinäkaarien yllä näy rakoa.
    // 7.10. E3: seinä (sisäsäde 3,9, y 9,0…15,6) aukkolistasta SEINAN_AUKOT: dioraaman leikkaus 95…230, kätkö, ikkuna ja kaari-ovi.
    ...seinaAukoin(),
    // syvennyksen takaseinä ja katto (lattia = alaosan yläreuna)
    { resepti: 'laatta', paikka: pol(SYV.a, SEINA + SYV.syvyys + 0.03, SYV.y1), suunta: SYV.a + 180, leveys: SYV.leveys + 0.1, syvyys: 0.05, paksuus: SYV.y1 - SYV.y0, pinnat: KIVI },
    { resepti: 'laatta', paikka: pol(SYV.a, SEINA + SYV.syvyys / 2, SYV.y1 + 0.04), suunta: SYV.a + 180, leveys: SYV.leveys + 0.1, syvyys: SYV.syvyys + 0.1, paksuus: 0.06, pinnat: KIVI },
    { resepti: 'laatta', paikka: pol(SYV.a, SEINA + SYV.syvyys / 2, SYV.y0 + 0.01), suunta: SYV.a + 180, leveys: SYV.leveys + 0.1, syvyys: SYV.syvyys + 0.1, paksuus: 0.06, pinnat: KIVI },
    // Tottin ja Sturen kilpilaatat ovat kohokuvaesineitä (esine-kilpilaatta-tott/-sture.glb, kävelymerkit), eivät leivottuja:
    // kohokuva näkyy vain matalassa sivuvalossa (E3 vaihe 3), mikä vaatii reaaliaikaisen valon.
    // Ristiholvi (Maconi 1910): taitteet seinällä y 12,3, kennojen seinäkaaret y 13,8, laki y 15,0. Taitekulmat
    // 5° + 45°·j osuvat sektorin ruudukkoon (230° + 11,25°·i). Maalaukset (lehti- ja kukka-aiheet): holvi-pinta rappaus.
    { resepti: 'kupoli', paikka: [CX, HOLVI.lahto, CZ], suunta: 0, sade: SEINA - 0.06, korkeus: HOLVI.laki - HOLVI.lahto, paksuus: 0.3,
      segmentit: 32, renkaat: 12, ristiholvi: { kulma: 5, nousu: 0.55, reuna: 0.25 }, auki: { alku: 95, loppu: 230 }, pinnat: { holvi: 'rappaus' } },
    ...ALTTARIPALIKAT,
    ...LATTIAJALAT,
    POLVITUOLI,
    ...RISTIT,
    ...REIAT,
    // Kynttiläkruunu holvin keskeltä.
    { resepti: 'kynttilakruunu', paikka: [CX, KRUUNU.y, CZ], suunta: 0, sade: KRUUNU.sade, ketju: KRUUNU.ketju, kynttilia: KRUUNU.n },
    // Kirkonpenkit alttaria (itä) kohti: etupuoli w+ = itä (suunta 90).
    { resepti: 'kirkonpenkki', paikka: [-0.1, LATTIA, -20], suunta: 90 },
    { resepti: 'kirkonpenkki', paikka: [-1.3, LATTIA, -20], suunta: 90 },
    // Voudin sinetti, vaihe 2: tuore naarmu ja avaimen kuva toisen penkin selkänojan yläpuussa (etupinta x −1,485,
    // yläpuu y 10,12…10,35), eteläpäässä kameran puolella.
    { resepti: 'kaiverrus', paikka: [-1.485, 10.24, -19.4], suunta: 90, leveys: 0.12 },
    { resepti: 'kirkonpenkki', paikka: [-2.5, LATTIA, -20], suunta: 90, leveys: 1.6 },
    // Pulpetti kirjoineen (etupuoli etelään) + kynttilä takalistalla.
    { resepti: 'pulpetti', paikka: PULPETTI, suunta: 180 },
    { resepti: 'kynttilanjalka', paikka: pulpKynt, suunta: 0, korkeus: 0.25 },
    // Sanctus-kello alttarien välissä, vaatearkku pohjoisseinällä (kalkit, messupuvut).
    seinalla('kello', 59, 3.45),
    seinalla('arkku', 342, 3.45),
    { resepti: 'kirja', paikka: paik(pol(342, 3.45, LATTIA), 162, 0.15, 0.55, 0), suunta: 165 },
    { resepti: 'ruukku', paikka: paik(pol(342, 3.45, LATTIA), 162, -0.22, 0.55, 0), suunta: 0, sade: 0.07, korkeus: 0.14 },
  ],
  // Voudin sinetin etsintä, vaihe 2: napautus penkin kaiverrukseen (kynttilän valossa naarmu ja fatabuurin avaimen kuva).
  etsinta: [
    { etsinta: 'voudin-sinetti', vaihe: 2, tyyppi: 'vihje', kohde: [-1.48, 10.24, -19.4], sade: 0.6,
      teksti: 'Penkin selkänojassa on tuore naarmu: raskas avainnippu on raapaissut puuta. Painaumasta erottuu ison avaimen parta – fatabuurin avaimen.',
      pulu: 'Ensin rukous, sitten aittaan. Vouti oli järjestelmällinen mies – paitsi sormuksensa kanssa.',
      rivi: 'Penkissä on tuore jälki – fatabuurin avaimen parta.' },
  ],
  hahmot: KAPPELI_HAHMOT,
  // Äänet (Linnanrakentaja 30.9., CC0/PD, suunnitelma docs/raportit/linna-aanet-suunnitelma-20260930.md kohta 2).
  aanet: [{ aani: 'kappeli-ambienssi', voimakkuus: 0.6 }, { aani: 'kynttila-ratina', voimakkuus: 0.3 }],
  tehosteet: [
    { aanet: ['laulu-kaukaa'], valit_s: [20, 40], voimakkuus: 0.35 },
    { aanet: ['kello-kappeli'], valit_s: [60, 120], voimakkuus: 0.4 },
    { aanet: ['askel-kivi'], valit_s: [25, 50], voimakkuus: 0.3 },
  ],
  liekit: LIEKIT,
  kasikirjoitus: [
    { tee: 'pulu-lenna' },
    { tee: 'taulu' },
    { tee: 'kohta', n: 0 },
    { tee: 'repliikki', hahmo: 'kappalainen' },
    { tee: 'reaktio', hahmo: 'kappalainen' },
    { tee: 'kohta', n: 1 },
    { tee: 'repliikki', hahmo: 'vouti' },
    { tee: 'kohta', n: 2 },
  ],
};
