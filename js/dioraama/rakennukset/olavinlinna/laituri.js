// OLAVINLINNA / laituri: kavassisatama saaren etelärannalla (sijainti tulkinta): lankkulaituri paaluilla, kansi y −6,2, vene kiinni itäkyljessä.
// Erä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md). Taulun faktat: Sisältökirjuri 29.9.
// (docs/raportit/sisaltokirjuri-olavinlinna-era3-20260929.md); tila 'luonnos' kunnes äänet ja tarkistus valmiit.
// Koordinaatit: laituri x −21,5…−17,5, z 33…45 (kansi y −6,2, vesi −7); pohjoispää liittyy massan portaiden
// (`porras` [−19,5, −6,2, 33]) alapäähän. Itäkyljessä soutuvene, länsikyljessä iso kavassi (vihje).

const TAULU = {
  otsikko: 'Laituri ja kavassit',
  tila: 'luonnos',
  kohdat: [
    { teksti: 'Riihisaarta sanottiin 1550-luvulla Kavassisaareksi; linnan kavassisatama oli sen tuntumassa.', lahde: 'Suomen meriarkeologinen seura: Sisävesihylyt' },
    { teksti: 'Linnalla oli 1550-luvulla peräti yhdeksän suurta kuljetusvenettä, kavassia.', lahde: 'Suomen meriarkeologinen seura: Sisävesihylyt' },
    { teksti: 'Rakennusaikana proomuja suojasi 12–15 haarniskaan ja miekkoihin varustautunutta miestä.', lahde: 'Savon historia: Olavinlinnan suojassa' },
  ],
};

const KANSI_Y = -6.2;
const PUU = { yla: 'puu', sivu: 'puu', ala: 'puu' };

// Paalut 2 m välein molemmin puolin (kansi-reunan ulkopuolella), pohja y −7,5 (veden alla), yläpää 0,3 m kannen yllä.
// Soihtupaalut (itä z 36, länsi z 42) ovat korkeampia: soihtu kiinnitetään paalun laiturin puoleiseen kylkeen.
const SOIHTU_PAALUT = [[-17.4, 36], [-21.6, 42]];
const PAALUT = [];
for (const x of [-21.6, -17.4]) {
  for (let z = 34; z <= 44; z += 2) {
    const soihtu = SOIHTU_PAALUT.some(([sx, sz]) => sx === x && sz === z);
    PAALUT.push({ resepti: 'paalu', paikka: [x, -7.5, z], suunta: 0, sade: soihtu ? 0.16 : 0.15, korkeus: soihtu ? 3.3 : 1.6 });
  }
}

// Poikkipalkit kannen alla (näkyvät kyljestä) ja pituussuuntaiset reunapalkit.
const PALKIT = [];
for (const z of [33.6, 36, 38, 40, 42, 44.4]) {
  PALKIT.push({ resepti: 'laatta', paikka: [-19.5, KANSI_Y - 0.12, z], suunta: 0, leveys: 4.5, syvyys: 0.22, paksuus: 0.2, pinnat: PUU });
}
for (const x of [-21.55, -17.45]) {
  PALKIT.push({ resepti: 'laatta', paikka: [x, KANSI_Y - 0.12, 39.1], suunta: 0, leveys: 0.16, syvyys: 11.8, paksuus: 0.2, pinnat: PUU });
}

const LASTI = [
  // Länsireuna: tynnyrit (yksi kalatynnyri kantena), tervaruukku, arkku, säkit, köysikieppi, verkko telineellä.
  { resepti: 'tynnyri', paikka: [-21.0, KANSI_Y, 35.2], suunta: 0, sade: 0.3, korkeus: 0.85, segmentit: 14 },
  { resepti: 'tynnyri', paikka: [-20.55, KANSI_Y, 36.0], suunta: 0, sade: 0.3, korkeus: 0.85, segmentit: 14 },
  { resepti: 'tynnyri', paikka: [-21.05, KANSI_Y, 36.3], suunta: 0, sade: 0.28, korkeus: 0.8, segmentit: 14 },
  { resepti: 'kala', paikka: [-21.0, KANSI_Y + 0.85, 35.15], suunta: 40, pituus: 0.32 },
  { resepti: 'kala', paikka: [-20.9, KANSI_Y + 0.85, 35.35], suunta: 120, pituus: 0.28 },
  { resepti: 'ruukku', paikka: [-20.45, KANSI_Y, 36.85], suunta: 0, sade: 0.12, korkeus: 0.24 },
  { resepti: 'arkku', paikka: [-21.0, KANSI_Y, 38.1], suunta: 90, leveys: 0.9, syvyys: 0.5, korkeus: 0.55 },
  { resepti: 'sakki', paikka: [-21.0, KANSI_Y, 39.2], suunta: 0, sade: 0.3, korkeus: 0.6, siemen: 21 },
  { resepti: 'sakki', paikka: [-20.55, KANSI_Y, 39.65], suunta: 0, sade: 0.3, korkeus: 0.6, siemen: 22 },
  { resepti: 'sakki', paikka: [-20.95, KANSI_Y + 0.55, 39.4], suunta: 0, sade: 0.28, korkeus: 0.55, siemen: 23 },
  { resepti: 'koysikieppi', paikka: [-20.9, KANSI_Y, 41.0], suunta: 30, sade: 0.24, koysi: 0.022 },
  { resepti: 'verkko', paikka: [-21.05, KANSI_Y, 43.7], suunta: 90, leveys: 1.6, korkeus: 1.5, siemen: 7 },
  { resepti: 'vesisanko', paikka: [-20.45, KANSI_Y, 42.1], suunta: 20, sade: 0.15, korkeus: 0.22 },
  // Portaiden alapää: keihästeline (kavassien vartijat) ja kynnyksen tynnyri.
  { resepti: 'keihasteline', paikka: [-21.1, KANSI_Y, 34.3], suunta: 90, leveys: 0.7, keihaita: 3, pituus: 2.0 },
  // Itäreuna (veneen puoli): purettavia säkkejä ja tynnyri, airot lepäämässä.
  { resepti: 'sakki', paikka: [-18.2, KANSI_Y, 38.7], suunta: 0, sade: 0.3, korkeus: 0.6, siemen: 24 },
  { resepti: 'sakki', paikka: [-17.95, KANSI_Y, 39.4], suunta: 0, sade: 0.3, korkeus: 0.6, siemen: 25 },
  { resepti: 'sakki', paikka: [-18.15, KANSI_Y + 0.58, 39.0], suunta: 0, sade: 0.27, korkeus: 0.52, siemen: 26 },
  { resepti: 'tynnyri', paikka: [-18.05, KANSI_Y, 36.5], suunta: 0, sade: 0.3, korkeus: 0.85, segmentit: 14 },
  { resepti: 'airot', paikka: [-18.15, KANSI_Y, 42.4], suunta: 0, pituus: 1.9 },
  { resepti: 'poyta', paikka: [-18.15, KANSI_Y, 44.2], suunta: 90, leveys: 1.0, syvyys: 0.6, korkeus: 0.6 },
];

// Veneet: soutuvene kiinni itäkyljessä (keula etelään), iso kavassi länsikyljessä (mastoineen ja lasteineen).
const VENEET = [
  { resepti: 'vene', paikka: [-16.5, -7.2, 40], suunta: 180, pituus: 5, leveys: 1.5, korkeus: 0.6 },
  { resepti: 'vene', paikka: [-23.3, -7.3, 41], suunta: 0, pituus: 9, leveys: 2.4, korkeus: 0.9 },
  // Kavassin lasti (tuhtojen välissä z ≈ 39,8…42,2) ja masto.
  { resepti: 'tynnyri', paikka: [-23.6, -7.2, 40.5], suunta: 0, sade: 0.3, korkeus: 0.9, segmentit: 14 },
  { resepti: 'tynnyri', paikka: [-23.0, -7.2, 40.9], suunta: 0, sade: 0.3, korkeus: 0.9, segmentit: 14 },
  { resepti: 'sakki', paikka: [-23.5, -7.15, 41.6], suunta: 0, sade: 0.3, korkeus: 0.6, siemen: 31 },
  { resepti: 'sakki', paikka: [-23.0, -7.1, 41.7], suunta: 0, sade: 0.28, korkeus: 0.55, siemen: 32 },
  { resepti: 'paalu', paikka: [-23.3, -7.1, 43.0], suunta: 0, sade: 0.07, korkeus: 3.0 },
  { resepti: 'lippu', paikka: [-23.3, -4.1, 43.0], suunta: 45, korkeus: 0.8, leveys: 0.9, lippu: 0.55 },
  // Soutuveneen lasti: köysikieppi keulassa ja ruukku perässä.
  { resepti: 'koysikieppi', paikka: [-16.5, -7.1, 38.4], suunta: 0, sade: 0.2, koysi: 0.02 },
  { resepti: 'ruukku', paikka: [-16.5, -7.1, 41.8], suunta: 0, sade: 0.11, korkeus: 0.2 },
];

// Soihdut paaluissa (seinasoihtu kiinnittyy paalun kylkeen; .valo tulee reseptistä) + pöydän pikkuruoka.
const SOIHDUT = [
  { resepti: 'seinasoihtu', paikka: [-17.56, -4.5, 36], suunta: 270 },
  { resepti: 'seinasoihtu', paikka: [-21.44, -4.5, 42], suunta: 90 },
  { resepti: 'kala', paikka: [-18.15, KANSI_Y + 0.6, 44.0], suunta: 70, pituus: 0.3 },
  { resepti: 'leipa', paikka: [-18.1, KANSI_Y + 0.6, 44.45], suunta: 0, sade: 0.1, korkeus: 0.08 },
];

const HAHMOT = [
  {
    id: 'soutaja', henkilo: 'soutaja-1500', paikka: [-16.5, -7.1, 40.0], suunta: 200, peilattu: false,
    silmukka: 'tyo', heraa: 1, reitti: null,
    repliikit: [
      { id: 'soutaja-1', teksti: 'Kivi ja kalkki tulevat vesitse, eivät jalan. Ilman venettä muuri ei nousisi.' },
      { id: 'soutaja-2', teksti: 'Virta vie, jos airosta päästää. Terva pitää veden ulkona, muu on sitkeyttä.' },
    ],
    reaktio: { id: 'pulu-soutaja-r1', teksti: 'Pelkillä airoilla! Nykyään tämän taittaisi moottorivene, mutta ei se olisi yhtä komeaa.' },
  },
  {
    id: 'renki', henkilo: 'renki-1500', paikka: [-18.6, KANSI_Y, 39.8], suunta: 270, peilattu: false,
    silmukka: 'kanto', heraa: 2, lyhty: true, // elävä linna: lyhty käteen (natiivi 1.0.57 lukee hahmolta)
    reitti: { pisteet: [[-18.7, KANSI_Y, 39.9], [-19.5, KANSI_Y, 37.8], [-19.5, KANSI_Y, 34.2], [-19.5, KANSI_Y, 37.8], [-18.7, KANSI_Y, 39.9]], nopeus: 0.9, tauko: 1.2 },
    repliikit: [
      { id: 'renki-1', teksti: 'Kolmekymmentäneljä porrasta ylös. Lasken askeleita, ettei tarvitse laskea säkkejä.' },
      { id: 'renki-2', teksti: 'Proomua vahtivat haarniskamiehet, minua vain selkäkipu. Kivi painaa, kalkki pölyää.' },
    ],
    reaktio: { id: 'pulu-renki-r1', teksti: 'Kolmekymmentäneljä porrasta! Nykyään tähän tulisi hissi. Minä vain lennän ohi.' },
  },
];

export const TILA = {
  id: 'laituri',
  nimi: 'Laituri',
  kohdistettava: true,
  // Ulkotila (erä 3): kohdistettuna aurinko ja taivas pysyvät täysinä (ei valaistus.sisalla-himmennystä).
  ulkona: true,
  // Uusi tapa (Päätoimittaja 29.9.): kuoren länsirannan ponttonilaituriin. Pohjoispää (−19,5; 33) pontonin lounaisreunaan
  // (−73, −18,5), laituri kohtisuoraan avoveteen (suunta 40), kansi pontonin tasolle (−5,9).
  sijoitus: { ankkuri: [-19.5, 0, 33], paikka: [-73.0, 0.3, 18.5], suunta: 40 },
  rajat: { min: [-27, -7.5, 33], max: [-11, -3, 47] },
  naapurit: ['massa', 'fatabuuri'],
  kamera: { kohde: [-19.8, -6.2, 39.3], atsimuutti: 200, korkeus: 24, etaisyys: 14.5, fov: 38, aukko: 0.8 },
  kierto: { atsimuutti: [-40, 40], korkeus: [10, 50], etaisyys: [0.6, 1.5] },
  kameraPysty: { kohde: [-19.5, -9.2, 39.5], atsimuutti: 200, korkeus: 26, etaisyys: 32, fov: 38, aukko: 0.8 },
  pulu: { laskeutuminen: [-21.0, -5.35, 35.2], taulupuoli: 'oikea' },
  taulu: TAULU,
  // Elävä linna (29.9.): kohde paalun lyhdyssä; kannella kävelee lyhdyllinen renki (hahmot[]).
  elava: { kohde: [-17.82, -4.03, 36], sade: 6 },
  // Ulkona aurinko valaisee; lämmin aksentti tulee soihdusta (itä, lähellä portaita) + heikompi länsisoihtu.
  valot: [
    { paikka: [-17.95, -4.1, 36.2], sade: 9, voima: 1.5, vari: '#ff9a4a', lepatus: 0.3 },
    { paikka: [-21.05, -4.1, 42.2], sade: 7, voima: 1.0, vari: '#ff9a4a', lepatus: 0.25 },
  ],
  palikat: [
    { resepti: 'laiturikansi', paikka: [-19.5, KANSI_Y, 39], suunta: 0, leveys: 4, pituus: 12, paksuus: 0.14, siemen: 1550 },
    ...PALKIT,
    ...PAALUT,
    ...VENEET,
    ...LASTI,
    ...SOIHDUT,
  ],
  hahmot: HAHMOT,
  aanet: [],
  tehosteet: [],
  // Soihtuliekit paalujen soihtujen päässä (liekin alapiste seinasoihtu-reseptin mukaan ≈ [0, 0,47, 0,26] paikallisesti).
  liekit: [
    { liekki: 'soihtu', paikka: [-17.82, -4.03, 36], koko: 1, vaihe: 0 },
    { liekki: 'soihtu', paikka: [-21.18, -4.03, 42], koko: 1, vaihe: 0.5 },
  ],
  kasikirjoitus: [
    { tee: 'pulu-lenna' },
    { tee: 'taulu' },
    { tee: 'kohta', n: 0 },
    { tee: 'repliikki', hahmo: 'soutaja' },
    { tee: 'reaktio', hahmo: 'soutaja' },
    { tee: 'kohta', n: 1 },
    { tee: 'repliikki', hahmo: 'renki' },
    { tee: 'reaktio', hahmo: 'renki' },
    { tee: 'kohta', n: 2 },
  ],
};
