// OLAVINLINNA / muurinharja: pohjoismuurin puolustuskäytävä Kello- ja Kirkkotornin välissä, lankkukansi y 13, sakarat pohjoisreunalla.
// Erä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md). Taulun faktat: Sisältökirjuri 29.9.
// (docs/raportit/sisaltokirjuri-olavinlinna-era3-20260929.md); tila 'luonnos' kunnes äänet ja tarkistus valmiit.
//
// Geometria: massan pohjoismuuri (paikka [-14.75, 0, -20], z -21,5…-18,5, yläpinta y 13) kantaa tämän tilan
// lankkukantta y 13…13,1. Pohjoisreunalla (z ≈ -21,2) sakarat, joiden raoista hakapyssy ampuu; etelälaidalla vain
// matala kivikaide (0,22 m), jotta kamera etelästä näkee koko kävelytason. Etelän puolella muurin alla on
// Keskushallin yläkerta ja harjakatto (harja y ≈ 11,5); mikään geometria ei ulotu muurin ulkopuolelle.
// Tornien kylkien (Kellotorni x ≈ -22,5, Kirkkotorni x ≈ -7,0) sivut ovat umpinaiset z < -19,4:ssä, joten
// jalkajousiteline, kilvet ja seinäsoihtu kiinnitetään niihin.

const TAULU = {
  otsikko: 'Muurinharja',
  tila: 'luonnos',
  kohdat: [
    { teksti: 'Tornin neljännessä kerroksessa oli avoin puolustuskäytävä, ylhäällä muurin harjalla.', lahde: 'Savon historia: Olavinlinnan suojassa' },
    { teksti: 'Ennen tuliaseita linnaa puolustettiin nuolilta, kivenheitolta ja piiritysportailta – harja ratkaisi.', lahde: 'Tiedetuubi: Linnarakennustekninen balladi Olavinlinnasta' },
    { teksti: 'Vuonna 1495 vouti Kylliäinen torjui hyökkäyksen 150 miehen ja talonpojan voimin.', lahde: 'Wikipedia: Olavinlinna; Pietari Niilonpoika Kylliäinen' },
  ],
};

// Kansi y 13…13,1: lankkujen yläpinta. KY = kävelytaso.
const KY = 13.1;
// Heittokivikasa: pyramidi (5 + 3 + 1 kiveä) laatta-palikoista kivipinnalla; deterministinen vaihtelu.
function kivikasa(x, z, siemen, kerrat = [5, 3, 1]) {
  const ulos = [];
  let y = KY;
  let n = siemen;
  const arpa = () => { n = (n * 1103515245 + 12345) % 2147483648; return n / 2147483648; };
  kerrat.forEach((kpl, kerros) => {
    const r = 0.16 * (kpl - 1) / 2 + 0.02;
    const korkeus = 0.2 + 0.03 * arpa();
    for (let i = 0; i < kpl; i++) {
      const a = (i / kpl) * Math.PI * 2 + arpa() * 0.5;
      const rr = kpl === 1 ? 0 : r + arpa() * 0.03;
      const koko = 0.27 + 0.1 * arpa();
      ulos.push({
        resepti: 'laatta', paikka: [x + rr * Math.cos(a), y + korkeus, z + rr * Math.sin(a)], suunta: Math.round(arpa() * 90),
        leveys: koko, syvyys: 0.24 + 0.09 * arpa(), paksuus: korkeus, pinnat: { yla: 'kivi', ala: 'kivi', sivu: 'kivi' },
      });
    }
    y += korkeus * 0.85 + kerros * 0.005;
  });
  return ulos;
}

// Hahmot: vartija partioi muurilla (reitti z ≈ -19,8), talonpoika seisoo sakaran raossa katsomassa pohjoiseen.
const HAHMOT = [
  {
    id: 'vartija', henkilo: 'vartija-1500', paikka: [-20, KY, -19.8], suunta: 90, peilattu: false,
    silmukka: 'kavely', heraa: 2,
    reitti: { pisteet: [[-20, KY, -19.8], [-9, KY, -19.8], [-20, KY, -19.8]], nopeus: 0.9, tauko: 2 },
    repliikit: [
      { id: 'vartija-1', teksti: 'Vahtivuoro on pitkä, mutta rajalta ei saa silmää siirtää hetkeksikään.' },
      { id: 'vartija-2', teksti: 'Venäjän raja on vain päivämarssin päässä – siksi harjalla ei nukuta.' },
    ],
    reaktio: { id: 'pulu-vartija-r1', teksti: 'Yötäkö tässä tuulessa? Minä kaipaisin jo kolmen minuutin jälkeen katon alle.' },
  },
  {
    id: 'talonpoika', henkilo: 'talonpoika-1500', paikka: [-17.8, KY, -20.35], suunta: 180, peilattu: false,
    silmukka: 'idle', heraa: 1, reitti: null,
    repliikit: [
      { id: 'talonpoika-1', teksti: 'Kun hyökkäys tuli, koko kylä juoksi linnan suojaan – minä keihäs kädessä.' },
      { id: 'talonpoika-2', teksti: 'Tuuli viiltää täällä ylhäällä, mutta muurin takana on sentään turvassa.' },
    ],
    reaktio: { id: 'pulu-talonpoika-r1', teksti: 'Koko kylä yhteen linnaan yhdessä yössä. Nykyään siitä tulisi jono ja kolme lomaketta.' },
  },
];

export const TILA = {
  id: 'muurinharja',
  nimi: 'Muurinharja',
  kohdistettava: true,
  // Ulkotila (erä 3): kohdistettuna aurinko ja taivas pysyvät täysinä (ei valaistus.sisalla-himmennystä).
  ulkona: true,
  // Uusi tapa (dioraama-rajapinnat-blender-20260929.md kohta 2): pohjoismuurin muunnos Kellotornin (−30, −20) → kuoren
  // Kellotorni (−44,4; −4,6) ja lähteen +x → Kirkkotornia kohti (suunta 341), iso linnanpiha y 2,9 (säteet 29.9. klo 21).
  sijoitus: { ankkuri: [-30, 0, -20], paikka: [-44.4, 2.9, -4.6], suunta: 341 },
  rajat: { min: [-22, 13, -22], max: [-7.5, 16, -18] },
  naapurit: ['massa', 'kierreportaat', 'kappeli', 'keskushalli'],
  kamera: { kohde: [-12.5, 13.7, -20], atsimuutti: 165, korkeus: 27, etaisyys: 19.5, fov: 38, aukko: 0.8 },
  kameraPysty: { kohde: [-15, 8.8, -20], atsimuutti: 165, korkeus: 28, etaisyys: 40, fov: 38, aukko: 0.8 },
  kierto: { atsimuutti: [-35, 35], korkeus: [14, 45], etaisyys: [0.7, 1.4] },
  pulu: { laskeutuminen: [-13.6, 14.05, -20.5], taulupuoli: 'oikea' },
  taulu: TAULU,
  // Elävä linna (29.9.): vartija kulkee lyhdyn kanssa kannen päästä päähän (Kellotornin puolelta Kirkkotornille)
  // kivikasojen välistä; sijoitettuna y ≈ 16.
  elava: {
    kohde: [-14.75, 14.2, -19.75], sade: 6,
    reitti: { henkilo: 'vartija-1500', pisteet: [[-21.0, KY, -19.75], [-9.0, KY, -19.75]], nopeus: 0.8, edestakaisin: true, lyhty: true },
  },
  // Ulkona aurinko valaisee; tulikori tekee lämpimän päävalon, seinäsoihtu (.valo) pienemmän.
  valot: [
    { paikka: [-16.2, 14.1, -20.4], sade: 8, voima: 1.5, vari: '#ff9a4a', lepatus: 0.3 },
    { paikka: [-11.9, 14.4, -20.0], sade: 3, voima: 0.5, vari: '#ff8a3a', lepatus: 0.2 },
  ],
  palikat: [
    // Muurin runko kannen alla (uusi tapa 29.9.: leikkaus avaa kuoren, jossa ei ole muurin sisusta).
    { resepti: 'seina', paikka: [-14.75, -0.3, -20], suunta: 0, pituus: 14.5, korkeus: 13.2, paksuus: 3.6 },
    // Lankkukansi muurin päällä (lankut poikittain, kävelysuunta x): x −22,4…−7,1, z −21,5…−18,5.
    { resepti: 'laiturikansi', paikka: [-14.75, KY, -20], suunta: 90, leveys: 3, pituus: 15.3, paksuus: 0.12, siemen: 1495 },
    // Sakarat pohjoisreunalla (korkeus 1,15: hakapyssyn piippu mahtuu raosta) ja matala kivikaide etelälaidalla.
    { resepti: 'sakarat', paikka: [-14.75, 13, -21.2], suunta: 0, pituus: 14.5, korkeus: 1.15, leveys: 0.8, vali: 0.7, paksuus: 0.6 },
    { resepti: 'seina', paikka: [-14.75, KY, -18.62], suunta: 0, pituus: 14.5, korkeus: 0.22, paksuus: 0.24 },
    // Ampumarakoja muurin sisäreunaan ei tarvita; lippu salossa raossa keskellä.
    { resepti: 'lippu', paikka: [-14.75, KY, -20.95], suunta: 0, korkeus: 2.85, leveys: 1.3, lippu: 0.85 },

    // --- Länsipää (Kellotorni): heittokivet, seinäsoihtu ja kilvet tornin kyljessä, nuolitynnyrit ---
    ...kivikasa(-21.3, -20.3, 7),
    ...kivikasa(-21.75, -19.0, 19, [3, 1]),
    { resepti: 'sakki', paikka: [-20.6, KY, -18.95], suunta: 0, sade: 0.24, korkeus: 0.45, siemen: 3 },
    { resepti: 'sakki', paikka: [-20.15, KY, -18.85], suunta: 0, sade: 0.22, korkeus: 0.42, siemen: 4 },
    { resepti: 'seinasoihtu', paikka: [-22.45, 14.9, -20.25], suunta: 90 },
    { resepti: 'kilpi', paikka: [-22.42, 14.35, -21.0], suunta: 90, sade: 0.3 },
    { resepti: 'kilpi', paikka: [-22.42, 13.85, -20.7], suunta: 90, sade: 0.24 },
    { resepti: 'nuolitynnyri', paikka: [-19.95, KY, -20.6], suunta: 0, sade: 0.21, korkeus: 0.5, nuolia: 14, siemen: 5 },
    { resepti: 'nuolitynnyri', paikka: [-19.45, KY, -20.5], suunta: 0, sade: 0.19, korkeus: 0.45, nuolia: 11, siemen: 12 },
    { resepti: 'nuolitynnyri', paikka: [-19.7, KY, -20.2], suunta: 0, sade: 0.17, korkeus: 0.42, nuolia: 9, siemen: 8 },

    // --- Keskiosa: tulikori (päävalo), lippu yllä, arkku, hakapyssy raossa, ruutitynnyrit ---
    { resepti: 'laatta', paikka: [-16.2, KY + 0.25, -20.4], suunta: 20, leveys: 0.55, syvyys: 0.55, paksuus: 0.25, pinnat: { yla: 'kivi', ala: 'kivi', sivu: 'kivi' } },
    { resepti: 'pata', paikka: [-16.2, KY + 0.25, -20.4], suunta: 0, sade: 0.3, korkeus: 0.32 },
    { resepti: 'laatta', paikka: [-16.2, KY + 0.25 + 0.21, -20.4], suunta: 0, leveys: 0.4, syvyys: 0.4, paksuus: 0.05, pinnat: { yla: 'hiillos', ala: 'hiillos', sivu: 'hiillos' } },
    { resepti: 'puukasa', paikka: [-15.55, KY, -20.55], suunta: 15, pituus: 0.45, halkoja: 6, siemen: 611 },
    { resepti: 'arkku', paikka: [-13.55, KY, -20.5], suunta: 180 },
    { resepti: 'hakapyssy', paikka: [-11.706, KY, -20.15], suunta: 0 },
    { resepti: 'hiillospihdit', paikka: [-12.35, KY, -20.55], suunta: 70, pituus: 0.42 },
    { resepti: 'ruutitynnyri', paikka: [-12.95, KY, -20.5], suunta: 0, sade: 0.17, korkeus: 0.32 },
    { resepti: 'ruutitynnyri', paikka: [-12.62, KY, -20.65], suunta: 0, sade: 0.15, korkeus: 0.28 },
    { resepti: 'sakki', paikka: [-11.0, KY, -20.55], suunta: 0, sade: 0.22, korkeus: 0.4, siemen: 6 },
    { resepti: 'saavi', paikka: [-16.85, KY, -18.95], suunta: 0, sade: 0.3, korkeus: 0.36 },
    { resepti: 'vesisanko', paikka: [-16.35, KY, -18.85], suunta: 30, sade: 0.14, korkeus: 0.22 },

    // --- Itäpää (Kirkkotorni): keihästeline, jalkajousiteline tornin kyljessä, vartioväen noppapöytä, köysi ---
    { resepti: 'keihasteline', paikka: [-9.85, KY, -20.5], suunta: 180, leveys: 0.9, keihaita: 4, pituus: 2.0 },
    { resepti: 'jalkajousi', paikka: [-7.06, KY + 1.15, -20.3], suunta: 270, kpl: 2 },
    { resepti: 'kilpi', paikka: [-7.05, 14.7, -19.55], suunta: 270, sade: 0.27 },
    { resepti: 'tynnyri', paikka: [-8.2, KY, -20.45], suunta: 0, sade: 0.3, korkeus: 0.85, segmentit: 14 },
    { resepti: 'tynnyri', paikka: [-10.7, KY, -18.95], suunta: 0, sade: 0.27, korkeus: 0.75, segmentit: 14 },
    { resepti: 'pelilauta', paikka: [-10.7, KY + 0.75, -18.95], suunta: 15, koko: 0.4, nopat: 3, siemen: 5 },
    { resepti: 'koysikieppi', paikka: [-9.4, KY, -18.95], suunta: 0, sade: 0.24, koysi: 0.022 },
    ...kivikasa(-8.35, -19.3, 31, [4, 2, 1]),
    ...kivikasa(-13.4, -18.95, 43, [3, 1]),
  ],
  hahmot: HAHMOT,
  // Ulkotila: tuuli taustana, tulikorin rätinä, satunnaiset lokit ja askeleet kivellä.
  aanet: [
    { aani: 'linna-tuuli' },
    { aani: 'tulisija-ratina' },
  ],
  tehosteet: [
    { aanet: ['lokit'], valit_s: [18, 40] },
    { aanet: ['askel-puu', 'askel-kivi'], valit_s: [10, 22] },
  ],
  liekit: [
    // Tulikorin liekki hiilloksen päällä (KY + 0,25 + 0,21 = 13,56).
    { liekki: 'soihtu', paikka: [-16.2, KY + 0.46, -20.4], koko: 1.5, vaihe: 0 },
    // Seinäsoihdun liekki: origo [-22,45, 14,9, -20,25] + [w 0,262 (→ +x), y 0,471].
    { liekki: 'soihtu', paikka: [-22.19, 15.37, -20.25], koko: 1.0, vaihe: 0.4 },
  ],
  kasikirjoitus: [
    { tee: 'pulu-lenna' },
    { tee: 'taulu' },
    { tee: 'kohta', n: 0 },
    { tee: 'repliikki', hahmo: 'vartija' },
    { tee: 'reaktio', hahmo: 'vartija' },
    { tee: 'kohta', n: 1 },
    { tee: 'repliikki', hahmo: 'talonpoika' },
    { tee: 'kohta', n: 2 },
  ],
};
