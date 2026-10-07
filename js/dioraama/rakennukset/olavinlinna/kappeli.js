// OLAVINLINNA / kappeli: Kirkkotornin 3. kerros (torni [0, 0, −20], sisäsäde 3,9), lattia y 9,4 (malli 9,6): alttarit, 12 vihkimisristiä.
// Erä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md). Taulun faktat: Sisältökirjuri 29.9.
// (docs/raportit/sisaltokirjuri-olavinlinna-era3-20260929.md); tila 'luonnos' kunnes äänet ja tarkistus valmiit.
//
// Asettelu: torni [0, 0, −20], auki-sektori 95…230 (kompassi, kamera etelä-kaakosta). Pääalttari itäseinällä (80°),
// sivualttarit 40° ja 320° (fi.wikipedia: kolme alttaria), hagioskooppirako pohjassa (3°), 12 vihkimisristiä
// seinäkaarella sektorin ulkopuolella. EI krusifiksia (Hannes Autere 1939).
// Mitat lähteistä (7.10.2026, _lahteet/olavinlinna-pohjat/SEIKKAILU-TARKISTUS.md kohta 4 ja sivulöydöt; V = kaksi
// lähdettä, A = päätelty): Kirkkotornin 3. kerros (V), IKKUNATON (Maconi 1910), RISTIHOLVI (Maconi 1910), sisähalkaisija
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

// --- 12 vihkimisristiä seinäkaarella, tasavälein sektorin (95…230) ulkopuolella: väli 18,6° alkaen 242°.
const RISTIT = [];
for (let k = 0; k < 12; k++) {
  const a = (242 + 18.6 * k) % 360;
  RISTIT.push({ resepti: 'vihkimisristi', paikka: pol(a, SEINA, 10.75), suunta: a + 180, sade: 0.26 }); // 7.10.: 0,34 → 0,26 (pienempi seinä)
}

// Hagioskooppirako (pohjaseinä 3°, kammion aukko): kivireunus laatoista. Ikkunarakoa ei ole (kappeli ikkunaton, Maconi 1910).
const REIAT = [];
for (const h of [
  { a: 3, y: 10.05, leveys: 0.24, korkeus: 0.5 }, // hagioskooppi
]) {
  REIAT.push({ resepti: 'rako', paikka: pol(h.a, SEINA, h.y), suunta: h.a + 180, leveys: h.leveys, korkeus: h.korkeus });
  REIAT.push({ resepti: 'laatta', paikka: pol(h.a, SEINA - 0.13, h.y), suunta: h.a + 180, leveys: h.leveys + 0.3, syvyys: 0.3, paksuus: 0.07 });
  REIAT.push({ resepti: 'laatta', paikka: pol(h.a, SEINA - 0.13, h.y + h.korkeus + 0.07), suunta: h.a + 180, leveys: h.leveys + 0.3, syvyys: 0.3, paksuus: 0.07 });
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
    { resepti: 'torni', paikka: [CX, 9.0, CZ], suunta: 0, sade: 6.6, paksuus: 2.7, korkeus: 6.6, segmentit: 32, auki: { alku: 95, loppu: 230 } },
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
