// OLAVINLINNA / kappeli: Kirkkotornin 3. kerros (torni [0, 0, −20], sisäsäde 5), y 9…13,5: alttarit, 12 vihkimisristiä.
// Erä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md). Taulun faktat: Sisältökirjuri 29.9.
// (docs/raportit/sisaltokirjuri-olavinlinna-era3-20260929.md); tila 'luonnos' kunnes äänet ja tarkistus valmiit.
//
// Asettelu: torni [0, 0, −20], auki-sektori 100…230 (kompassi, kamera etelä-kaakosta). Pääalttari itäseinällä (80°),
// sivualttarit 40° ja 320° (fi.wikipedia: kolme alttaria), hagioskooppirako pohjassa (3°), ikkunarako itään (59°),
// 12 vihkimisristiä seinäkaarella sektorin ulkopuolella. EI krusifiksia (Hannes Autere 1939). Massan lattiat y 4,5 ja
// y 14,0 (alapinta 13,5 = kappelin katto) eivät ole tässä; oma lattia on `kiekko` (y 9,0…9,4) ja holvi `kupoli`.

const TAULU = {
  otsikko: 'Kirkkotornin kappeli',
  // Sisältökirjurin tarkistus 29.9. (docs/raportit/sisaltokirjuri-olavinlinna-era4-tarkistus-20260929.md, K1–K3).
  tila: 'tarkistettu',
  kohdat: [
    // Sisältökirjuri 30.9. (5684d5d81): vuosiluku 1499 ja "ainutlaatuinen" ilman lähdettä → korjattu.
    { teksti: 'Kappeli on Kirkkotornin kolmannessa kerroksessa, ja sen seinää kiertää kaksitoista vihkimäristiä.', lahde: 'Finna M012:RHO217939:34; Wikipedia: Olavinlinna; Apu: Suomen keskiaikaiset kivilinnat 6/6' },
    { teksti: 'Seinän pieni aukko on hagioskooppi: rikolliset ja sairaat seurasivat messua sen kautta.', lahde: 'Finna M012:RHO217939:34; Wikipedia: Olavinlinna; Apu: Suomen keskiaikaiset kivilinnat 6/6' },
    { teksti: 'Kattomaalausten jäänteistä erottaa vielä lehti- ja kukkakuvioita sekä vaakunoita.', lahde: 'Kansallismuseo: Pyhä Olavi' },
  ],
};

// ---------------------------------------------------------------------------
// Geometria-apurit. Kompassikulma a (0 = pohjoinen −z, 90 = itä +x); tornin keskipiste [0, −20].
const RAD = Math.PI / 180;
const CX = 0, CZ = -20;
const LATTIA = 9.4; // lattian yläpinta
const SEINA = 4.98; // sisäseinän pinta (sisäsäde 5, hitsaus ei näy)
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
  { a: 80, r: 4.5, leveys: 1.4, korkeus: 1.0, jalka: 0.36 },
  { a: 40, r: 4.5, leveys: 1.1, korkeus: 0.95, jalka: 0.28 },
  { a: 320, r: 4.5, leveys: 1.1, korkeus: 0.95, jalka: 0.28 },
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
const PA = pol(80, 4.5, LATTIA);
const LATTIAJALAT = [-1, 1].map((m, j) => {
  const pj = paik(PA, 260, m * 1.15, 0, 0.35);
  liekki(paik(pj, 0, 0, 0.9 * KYNTTILAN_KARKI, 0), 1.8, 0.11 + j * 0.31);
  return { resepti: 'kynttilanjalka', paikka: pj, suunta: 0, korkeus: 0.9 };
});
const POLVITUOLI = { resepti: 'penkki', paikka: paik(PA, 260, 0, 0, 0.98), suunta: 260, leveys: 0.7, syvyys: 0.3, korkeus: 0.22 };

// --- Kynttiläkruunu holvin keskeltä: kiinnitys holvin sisäpinnan huipussa (y 13,2), ketju 0,75, 6 kynttilää.
const KRUUNU = { y: 13.2, sade: 0.42, ketju: 0.75, n: 6 };
for (let i = 0; i < KRUUNU.n; i++) {
  const ka = (360 * i) / KRUUNU.n + 18; // kuten resepti: u = sade sin ka, w = sade cos ka (suunta 0: z = pz − w)
  liekki([r3(CX + KRUUNU.sade * Math.sin(ka * RAD)), r3(KRUUNU.y - KRUUNU.ketju + 0.02 + 0.15), r3(CZ - KRUUNU.sade * Math.cos(ka * RAD))], 1.5, i * 0.17);
}

// --- Pulpetti kirjoineen (kirja kansissa on osa reseptiä) + kynttilä takalistalla.
const PULPETTI = [1.3, LATTIA, -22.4];
const pulpKynt = paik(PULPETTI, 180, -0.2, 1.1, -0.2);
liekki(paik(pulpKynt, 0, 0, 0.25 * KYNTTILAN_KARKI, 0), 1.4, 0.6);

// --- 12 vihkimisristiä seinäkaarella, tasavälein sektorin (100…230) ulkopuolella: väli 18,6° alkaen 242°.
const RISTIT = [];
for (let k = 0; k < 12; k++) {
  const a = (242 + 18.6 * k) % 360;
  RISTIT.push({ resepti: 'vihkimisristi', paikka: pol(a, SEINA, 10.75), suunta: a + 180, sade: 0.34 });
}

// Hagioskooppirako (pohjaseinä 3°, kammion aukko) ja itäinen ikkunarako (59°): kivireunus laatoista.
const REIAT = [];
for (const h of [
  { a: 3, y: 10.05, leveys: 0.24, korkeus: 0.5 }, // hagioskooppi
  { a: 59, y: 10.3, leveys: 0.26, korkeus: 0.85 }, // ikkuna (aamuaurinko)
]) {
  REIAT.push({ resepti: 'rako', paikka: pol(h.a, SEINA, h.y), suunta: h.a + 180, leveys: h.leveys, korkeus: h.korkeus });
  REIAT.push({ resepti: 'laatta', paikka: pol(h.a, 4.85, h.y), suunta: h.a + 180, leveys: h.leveys + 0.3, syvyys: 0.3, paksuus: 0.07 });
  REIAT.push({ resepti: 'laatta', paikka: pol(h.a, 4.85, h.y + h.korkeus + 0.07), suunta: h.a + 180, leveys: h.leveys + 0.3, syvyys: 0.3, paksuus: 0.07 });
}

// --- Hahmot: kappalainen pääalttarin ääressä (messu), vouti seurakuntalaisena penkin luona.
const KAPPELI_HAHMOT = [
  {
    id: 'kappalainen', henkilo: 'kappalainen-1500', paikka: [3.35, LATTIA, -20.8], suunta: 90, peilattu: false,
    silmukka: 'tyo', heraa: 1, reitti: null,
    repliikit: [
      { id: 'kappalainen-1', teksti: 'Introibo ad altare Dei. Menen Jumalan alttarille, ja ääni alas, jos sallitte.' },
      { id: 'kappalainen-2', teksti: 'Vahakynttilä on kallis, siksi ne palavat vain messun ajan, eivät päivän mittaa.' },
    ],
    reaktio: { id: 'pulu-kappalainen-r1', teksti: 'Latinaa! En ymmärrä sanaakaan, mutta kaiku tekee siitä aivan taivaallista.' },
  },
  {
    id: 'vouti', henkilo: 'vouti-1500', paikka: [-0.3, LATTIA, -18.3], suunta: 90, peilattu: false,
    silmukka: 'idle', heraa: 2, reitti: null,
    repliikit: [
      { id: 'vouti-1', teksti: 'Kaksitoista ristiä seinällä, yksi jokaista apostolia kohti. Lasken ne aina.' },
      { id: 'vouti-2', teksti: 'Tuosta pienestä aukosta sairaat ja kirkottamattomat kuulevat messun ulkopuolelta.' },
    ],
    reaktio: { id: 'pulu-vouti-r1', teksti: 'Pieni aukko, suuri kuulumisen tarve. Nykyään sama tehdään suoratoistona.' },
  },
];

export const TILA = {
  id: 'kappeli',
  nimi: 'Kappeli',
  // Infotaulu (omistajan hyväksymä rakenne 30.9.): nimi + rivi siitä, mikä huone oli (Päätoimittaja, faktat
  // Sisältökirjuri 30.9. 5684d5d81); muoto kuten taulu.kohdat.
  infotaulu: { nimi: 'Kappeli', rivit: [{ teksti: 'Kirkkotornin kappeli: kaksitoista vihkimäristiä ja harvinainen hagioskooppi.', lahde: 'Finna M012:RHO217939:34; Wikipedia: Olavinlinna; Apu: Suomen keskiaikaiset kivilinnat 6/6' }] },
  kohdistettava: true,
  // Uusi tapa (dioraama-rajapinnat-blender-20260929.md kohta 2): Kirkkotorni kuoressa mallin (−15,4, 14,6) (kartiokaton
  // huippu säteellä, 29.9. klo 21) eli glTF z −14,6; seinä ja lattia säteellä 6,6 kuoren sisäpuolella; torni seisoo pihan tasolla −3,0, joten 3. krs lattia ≈ 6,4.
  sijoitus: { ankkuri: [0, 0, -20], paikka: [-15.4, -3.0, -14.6], suunta: 0 },
  rajat: { min: [-5, 9, -25], max: [5, 13.5, -15] },
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
  pulu: { laskeutuminen: [PULPETTI[0], LATTIA + 1.12, PULPETTI[2] + 0.05], taulupuoli: 'oikea',
    // Pulun kertomus (napautus reunakuvasta), tekstit v2 Päätoimittajalta (Sisältökirjuri 30.9.); ääni vasta omistajan luvalla.
    teksti: 'Kappeli on Kirkkotornin kolmannessa kerroksessa, ja sen seinää kiertää kaksitoista vihkimäristiä. Katossa on säilynyt katkelmia maalauksista, muun muassa lehti- ja kukkakuvioita ja vaakunoita. Seinän pieni aukko on hagioskooppi, josta rikolliset ja sairaat seurasivat messua – Suomessa harvinainen ratkaisu.', aani: null },
  taulu: TAULU,
  // Elävä linna (29.9.): Kirkkotornin kylki kappelin kerroksessa kameran puolella (kynttilänvalo ikkunoissa).
  elava: { kohde: [1.9, 11.5, -12.8], sade: 6 },
  // Tumma yleisvalo; kynttiläkruunu ja alttarikynttilät kantavat tunnelman (jalkojen .valo tulee reseptistä).
  valot: [
    { paikka: [0, 12.1, -20], sade: 8, voima: 1.8, vari: '#ffb070', lepatus: 0.3 }, // kruunun ja penkkien alue
    { paikka: [3.6, 10.9, -20.8], sade: 4.5, voima: 1.5, vari: '#ff9a4a', lepatus: 0.25 }, // pääalttari ja kappalainen
    { paikka: [0, 11.0, -22.9], sade: 4.5, voima: 0.9, vari: '#ffb070', lepatus: 0.2 }, // pohjaseinän ristit ja hagioskooppi
    // Itäisen ikkunaraon (59°) aamuaurinko: keila alkaa seinäpinnasta ja osuu lattialle penkkien ja pulpetin väliin.
    {
      tyyppi: 'keila', paikka: pol(59, 5.0, 10.9), kohti: [0.8, 9.4, -20.6], kulma: 26, sade: 9, voima: 220, vari: '#ffd0a0',
    },
  ],
  palikat: [
    // Pyöreä lattia (sade 7 = tornin ulkosäde): auki-sektorin kohdalla lattia jää "näyttämöksi".
    { resepti: 'kiekko', paikka: [CX, LATTIA, CZ], suunta: 0, sade: 6.6, paksuus: 0.4, segmentit: 32, pinnat: { yla: 'kivi' } },
    // Tornin seinä kerroksen korkeudelta (uusi tapa 29.9.: kuoressa ei ole sisäpintaa, massan torni ei ole mukana).
    { resepti: 'torni', paikka: [CX, 9.0, CZ], suunta: 0, sade: 6.6, paksuus: 1.6, korkeus: 4.5, segmentit: 32, auki: { alku: 100, loppu: 230 } },
    // Holvikatto: alkaa y 11,6, huippu y 13,45; sama auki-sektori kuin tornilla. Maalaukset (lehti- ja kukka-aiheet):
    // holvi-pinta rappaus, Codexin maalaus-pinta tulee erä 3b:ssä.
    { resepti: 'kupoli', paikka: [CX, 11.6, CZ], suunta: 0, sade: 5, korkeus: 1.85, segmentit: 32, auki: { alku: 100, loppu: 230 }, pinnat: { holvi: 'rappaus' } },
    ...ALTTARIPALIKAT,
    ...LATTIAJALAT,
    POLVITUOLI,
    ...RISTIT,
    ...REIAT,
    // Kynttiläkruunu holvin keskeltä.
    { resepti: 'kynttilakruunu', paikka: [CX, KRUUNU.y, CZ], suunta: 0, sade: KRUUNU.sade, ketju: KRUUNU.ketju, kynttilia: KRUUNU.n },
    // Kirkonpenkit alttaria (itä) kohti: etupuoli w+ = itä (suunta 90).
    { resepti: 'kirkonpenkki', paikka: [-0.3, LATTIA, -20], suunta: 90 },
    { resepti: 'kirkonpenkki', paikka: [-1.5, LATTIA, -20], suunta: 90 },
    // Voudin sinetti, vaihe 2: tuore naarmu ja avaimen kuva toisen penkin selkänojan yläpuussa (etupinta x −1,685,
    // yläpuu y 10,12…10,35), eteläpäässä kameran puolella.
    { resepti: 'kaiverrus', paikka: [-1.685, 10.24, -19.4], suunta: 90, leveys: 0.12 },
    { resepti: 'kirkonpenkki', paikka: [-2.7, LATTIA, -20], suunta: 90 },
    // Pulpetti kirjoineen (etupuoli etelään) + kynttilä takalistalla.
    { resepti: 'pulpetti', paikka: PULPETTI, suunta: 180 },
    { resepti: 'kynttilanjalka', paikka: pulpKynt, suunta: 0, korkeus: 0.25 },
    // Sanctus-kello ikkunaraon alla, vaatearkku pohjoisseinällä (kalkit, messupuvut).
    seinalla('kello', 60, 4.4),
    seinalla('arkku', 342, 4.5),
    { resepti: 'kirja', paikka: paik(pol(342, 4.5, LATTIA), 162, 0.15, 0.55, 0), suunta: 165 },
    { resepti: 'ruukku', paikka: paik(pol(342, 4.5, LATTIA), 162, -0.22, 0.55, 0), suunta: 0, sade: 0.07, korkeus: 0.14 },
  ],
  // Voudin sinetin etsintä, vaihe 2: napautus penkin kaiverrukseen (kynttilän valossa naarmu ja fatabuurin avaimen kuva).
  etsinta: [
    { etsinta: 'voudin-sinetti', vaihe: 2, tyyppi: 'vihje', kohde: [-1.68, 10.24, -19.4], sade: 0.6,
      teksti: 'Penkin selkänojassa on tuore naarmu: raskas avainnippu on raapaissut puuta. Painaumasta erottuu ison avaimen parta – fatabuurin avaimen.',
      pulu: 'Ensin rukous, sitten aittaan. Vouti oli järjestelmällinen mies – paitsi sormuksensa kanssa.',
      rivi: 'Penkissä on tuore jälki – fatabuurin avaimen parta.' },
  ],
  hahmot: KAPPELI_HAHMOT,
  aanet: [], // kappelin äänet (kaiku, kynttilän rätinä, kaukainen laulu) tulevat Pelikoodarin tilauksesta
  tehosteet: [
    { aanet: ['kellot-kaukaa'], valit_s: [40, 80] },
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
