// OLAVINLINNA / keskushalli: pohjoissiiven väentupa Kello- ja Kirkkotornin välissä, y 0…5; eteläseinä poistettu, yläkerta (voudin asunto) massassa.
// Erä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md). Taulun faktat: Sisältökirjuri 29.9.
// (docs/raportit/sisaltokirjuri-olavinlinna-era3-20260929.md); tila 'luonnos' kunnes äänet ja tarkistus valmiit.
//
// Sisämitat x −22…−7,5, z −18,5…−9, lattia y 0. Takaseinänä pohjoismuuri (sisäpinta z −18,5, massassa), katto vain
// takaosan päällä (voudin asunnon lattia y 5, z −18,5…−14, massassa). Länsi- ja itäseinä tässä tiedostossa (paksuus
// 0,6, eteläpäät leikkaus-roolilla), itäseinässä ovi Kirkkotornin pohjakerroksesta (z ≈ −15,25). Eteläseinä POISTETTU
// (kamera katsoo etelästä). Avotakka pohjoisseinällä x −14,75; pitkät pöydät (länsi, itä) penkkeineen ja katettuina,
// keskellä tarjoilupöytä, olutynnyrit lounaisnurkassa, hylly ja arkku, kilvet ja keihäät seinillä.

const TAULU = {
  otsikko: 'Keskushalli ja väentupa',
  // Sisältökirjurin tarkistus 30.9. (docs/raportit/sisaltokirjuri-olavinlinna-era5-tarkistus-20260930.md). H1–H3
  tila: 'tarkistettu',
  kohdat: [
    { teksti: 'Keskushallin alakerrassa oli väentupa, sotaväen ruokasali; toisessa kerroksessa voudin asunto.', lahde: 'Kansallismuseo: Keskushalli' },
    { teksti: 'Linnaa lämmitettiin avotakoin, ja lämpö johdettiin hormien kautta.', lahde: 'Apu: Suomen keskiaikaiset kivilinnat 6/6' },
    { teksti: 'Linnassa asui 1500-luvun tilikirjojen mukaan 150–200 henkeä: sotilaita, virkamiehiä, käsityöläisiä.', lahde: 'Apu: Suomen keskiaikaiset kivilinnat 6/6; Yle Tiede' },
  ],
};

// Hahmot: apulainen tuo ruokaa itäovelta tarjoilupöydälle (kanto, reitti kulkee pöytien päiden ohi), vartija ja
// talonpoika seisovat pöytien ääressä. Suunta = kompassi, johon hahmo katsoo (180 = etelä = kameraa kohti).
const HAHMOT = [
  {
    id: 'apulainen', henkilo: 'apulainen-1500', paikka: [-8.4, 0, -15.25], suunta: 270, peilattu: false,
    silmukka: 'kanto', heraa: 1,
    reitti: {
      pisteet: [[-8.4, 0, -15.25], [-9.1, 0, -14.4], [-9.1, 0, -10.5], [-13.1, 0, -10.5], [-14.75, 0, -11.1],
        [-13.1, 0, -10.5], [-9.1, 0, -10.5], [-9.1, 0, -14.4], [-8.4, 0, -15.25]],
      nopeus: 0.9, tauko: 2,
    },
    repliikit: [
      { id: 'tarjoilija-1', teksti: 'Antakaa tietä, antakaa tietä! Tämä vati polttaa jo sormiani.' },
      { id: 'tarjoilija-2', teksti: 'Ylhäällä vouti syö omassa pöydässään. Täällä riittää puuroa, kalaa ja leipää.' },
    ],
    reaktio: { id: 'pulu-tarjoilija-r1', teksti: 'Kolme vatia yhdellä kädellä! Nykyajan ravintolassa hän saisi vakituisen paikan.' },
  },
  {
    // Erä 3 (elävä linna, käsikirjoitus kohta 2–3): vartijat noppapelissä pelilaudan ääressä (pöydän B eteläpään edessä kasvot pohjoiseen; penkit ovat pöydän kyljillä).
    id: 'vartija', henkilo: 'vartija-1500', paikka: [-11.05, 0, -11.0], suunta: 15, peilattu: false,
    silmukka: 'tyo', heraa: 1, reitti: null,
    repliikit: [
      { id: 'vartija-1', teksti: 'Vouti syö ylhäällä, me täällä alhaalla. Sopii minulle, tuli on lähempänä.' },
      { id: 'vartija-2', teksti: 'Vuoro vaihtuu aamuhämärässä. Juo nyt, kun kannu vielä on täysi.' },
    ],
    reaktio: { id: 'pulu-vartija-r1', teksti: 'Noin viisi litraa olutta päivässä kuului vartijan muonaan. Minulle riittäisi pisara – ja murunen leipää.' },
  },
  {
    id: 'vartija2', henkilo: 'vartija-1500', paikka: [-10.15, 0, -11.0], suunta: 345, peilattu: true,
    silmukka: 'tyo', heraa: 2, reitti: null,
    repliikit: [
      { id: 'vartija2-1', teksti: 'Kolme kuutosta! Onni suosii rohkeaa. Maksa, kun vielä kehtaat.' },
      { id: 'vartija2-2', teksti: 'Yksi heitto vielä ennen vuoroa. Voudin ei tarvitse tietää, mistä pelataan.' },
    ],
    reaktio: { id: 'pulu-vartija2-r1', teksti: 'Noppapeli linnassa, ja vouti ylhäällä. Minä en kerro, jos te ette kerro.' },
  },
  {
    id: 'talonpoika', henkilo: 'talonpoika-1500', paikka: [-17.65, 0, -12.6], suunta: 235, peilattu: false,
    silmukka: 'idle', heraa: 2, reitti: null,
    repliikit: [
      { id: 'talonpoika-1', teksti: 'Kävelin kolme päivää verokalojen kanssa. Antakaa penkinkulma ja kuppi olutta.' },
      { id: 'talonpoika-2', teksti: 'Hormia myöten lämpö menee voudin saliin. Meille jää tämä tuli.' },
    ],
    reaktio: { id: 'pulu-talonpoika-r1', teksti: 'Lämpöä hormissa ja kaupan päälle tarina. Ei huono vaihtokauppa.' },
  },
];

// ---------------------------------------------------------------------------
// Apufunktiot: katetut pöydät generoidaan (deterministinen siemen), jotta kattaus on tiheä mutta kirjoitus lyhyt.
// Pöytä kulkee z-suunnassa (suunta 90); pöytätaso y 0,8, syvyys 0,9 (x ± 0,45).
function lcg(siemen) {
  let s = siemen >>> 0;
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
}

function kattaus(cx, z0, z1, siemen) {
  const r = lcg(siemen), k = [];
  const keskiEsineet = ['leipa', 'kala', 'ruukku', 'pullo', 'leikkuulauta', 'suolalaatikko', 'leipa', 'kala'];
  let i = 0;
  for (let z = z0; z <= z1 + 1e-6; z += 0.72, i++) {
    // vadit molemmilla puolilla (osa syöjistä on jo lähtenyt: tyhjä paikka)
    for (const sivu of [-1, 1]) {
      if (r() < 0.82) k.push({ resepti: 'vati', paikka: [cx + sivu * 0.26, 0.8, z + (r() - 0.5) * 0.08], suunta: 0, sade: 0.12 });
      if (r() < 0.6) k.push({ resepti: 'veitsi', paikka: [cx + sivu * 0.38, 0.8, z + 0.13], suunta: 90 + (r() - 0.5) * 30, pituus: 0.2 });
    }
    const nimi = keskiEsineet[(i + Math.floor(r() * 3)) % keskiEsineet.length];
    const p = [cx + (r() - 0.5) * 0.12, 0.8, z + 0.36];
    if (nimi === 'leipa') k.push({ resepti: 'leipa', paikka: p, suunta: r() * 360, sade: 0.1, korkeus: 0.08 });
    else if (nimi === 'kala') k.push({ resepti: 'kala', paikka: p, suunta: 60 + r() * 60, pituus: 0.3 });
    else if (nimi === 'ruukku') k.push({ resepti: 'ruukku', paikka: p, suunta: 0, sade: 0.11, korkeus: 0.2 });
    else if (nimi === 'pullo') k.push({ resepti: 'pullo', paikka: p, suunta: 0, sade: 0.05, korkeus: 0.19 });
    else if (nimi === 'leikkuulauta') k.push({ resepti: 'leikkuulauta', paikka: p, suunta: 90 + (r() - 0.5) * 20 });
    else k.push({ resepti: 'suolalaatikko', paikka: p, suunta: 90 });
    if (i % 3 === 1) k.push({ resepti: 'kynttilanjalka', paikka: [cx, 0.8, z + 0.02], suunta: 0, korkeus: 0.17 });
  }
  return k;
}

// Kynttilänjalkojen liekit: kattauksen jalat i % 3 === 1 (sama järjestys kuin yllä ei ole tarpeen; lasketaan erikseen).
function kynttilaLiekit(cx, z0, z1) {
  const l = [];
  let i = 0;
  for (let z = z0; z <= z1 + 1e-6; z += 0.72, i++) {
    if (i % 3 === 1) l.push({ liekki: 'kynttila', paikka: [cx, 0.8 + 0.178, z + 0.02], koko: 1, vaihe: (l.length * 0.27) % 1 });
  }
  return l;
}

// Pöytien z-alueet (kattaus) ja x-keskilinjat.
const POYTA_A = { x: -19.0, z0: -16.5, z1: -12.18, siemen: 1501 };
const POYTA_B = { x: -10.6, z0: -16.5, z1: -12.9, siemen: 1502 }; // eteläpää vapaana pelilaudalle

const PALIKAT = [
  // Lattia (lankkulattia, koko sali) ja seinät: länsi- ja itäseinän eteläpää (avoin sivu) leikkaus-roolilla.
  { resepti: 'lankkulattia', paikka: [-14.75, 0, -13.75], suunta: 0, leveys: 14.5, syvyys: 9.5, paksuus: 0.3, siemen: 1500 },
  {
    resepti: 'seina', paikka: [-22, 0, -13.75], suunta: 90, pituus: 9.5, korkeus: 5, paksuus: 0.6,
    leikkaus: { vasen: false, oikea: true, yla: false },
  },
  {
    // Itäseinä: ovi Kirkkotornin pohjakerroksesta (u −1,5 ≈ z −15,25).
    resepti: 'seina', paikka: [-7.5, 0, -13.75], suunta: 90, pituus: 9.5, korkeus: 5, paksuus: 0.6,
    aukot: [{ u: -1.5, y: 0, leveys: 1.2, korkeus: 2.3 }],
    leikkaus: { vasen: false, oikea: true, yla: false },
  },
  // Pohjoisseinä ja katto (voudin asunnon lattia) — ennen massassa, uudessa tavassa tilan omia (29.9.).
  { resepti: 'seina', paikka: [-14.75, 0, -18.8], suunta: 0, pituus: 15.1, korkeus: 5, paksuus: 0.6 },
  { resepti: 'lankkulattia', paikka: [-14.75, 5.0, -13.75], suunta: 0, leveys: 15.1, syvyys: 10.1, paksuus: 0.4, siemen: 1503 },
  // Kattopalkit voudin asunnon lattian (y 4,6) alla; etummainen palkki katon etureunalla.
  { resepti: 'seina', paikka: [-14.75, 4.2, -16.9], suunta: 0, pituus: 14.2, korkeus: 0.4, paksuus: 0.4, pinnat: { etu: 'puu', taka: 'puu', paaty: 'puu', yla: 'puu' } },
  { resepti: 'seina', paikka: [-14.75, 4.2, -15.4], suunta: 0, pituus: 14.2, korkeus: 0.4, paksuus: 0.4, pinnat: { etu: 'puu', taka: 'puu', paaty: 'puu', yla: 'puu' } },
  { resepti: 'seina', paikka: [-14.75, 4.2, -14.35], suunta: 0, pituus: 14.2, korkeus: 0.4, paksuus: 0.4, pinnat: { etu: 'puu', taka: 'puu', paaty: 'puu', yla: 'puu' } },
  { resepti: 'kynttilakruunu', paikka: [-14.75, 4.2, -15.4], suunta: 0, sade: 0.35, ketju: 0.6, kynttilia: 5 },

  // Avotakka pohjoisseinällä (huuva ylös hormiin), hiilloksella kaksi pataa; ympärillä halot, pihdit, astiat.
  { resepti: 'tulisija', paikka: [-14.75, 0, -17.9], suunta: 180, leveys: 3.6, syvyys: 1.2, korkeus: 0.9, huuva: { korkeus: 1.6, yla: 4.5 }, pinnat: { huuva: 'kivi' } },
  { resepti: 'pata', paikka: [-16.0, 0.9, -17.9], suunta: 0, sade: 0.3, korkeus: 0.35 },
  { resepti: 'pata', paikka: [-13.5, 0.9, -17.8], suunta: 0, sade: 0.28, korkeus: 0.33 },
  { resepti: 'puukasa', paikka: [-17.2, 0, -18.05], suunta: 5, pituus: 0.45, halkoja: 9, siemen: 411 },
  { resepti: 'puukasa', paikka: [-12.35, 0, -17.95], suunta: -8, pituus: 0.4, halkoja: 7, siemen: 412 },
  { resepti: 'hiillospihdit', paikka: [-12.6, 0, -17.1], suunta: 100, pituus: 0.4 },
  { resepti: 'kattila', paikka: [-16.95, 0, -17.1], suunta: -30, sade: 0.2, korkeus: 0.22 },
  { resepti: 'ruukku', paikka: [-16.7, 0, -18.25], suunta: 0, sade: 0.1, korkeus: 0.18 },
  { resepti: 'vesisanko', paikka: [-11.7, 0, -17.4], suunta: 30, sade: 0.15, korkeus: 0.22 },
  { resepti: 'luuta', paikka: [-21.2, 0, -18.25], suunta: 90, korkeus: 0.85 },

  // Pitkät pöydät penkkeineen (z-suuntaan, suunta 90), katettuina.
  { resepti: 'poyta', paikka: [POYTA_A.x, 0, -14.2], suunta: 90, leveys: 5.6, syvyys: 0.9, korkeus: 0.8 },
  { resepti: 'penkki', paikka: [POYTA_A.x - 0.85, 0, -14.2], suunta: 90, leveys: 5.2, syvyys: 0.3, korkeus: 0.45 },
  { resepti: 'penkki', paikka: [POYTA_A.x + 0.85, 0, -14.2], suunta: 90, leveys: 5.2, syvyys: 0.3, korkeus: 0.45 },
  { resepti: 'poyta', paikka: [POYTA_B.x, 0, -14.2], suunta: 90, leveys: 5.6, syvyys: 0.9, korkeus: 0.8 },
  { resepti: 'penkki', paikka: [POYTA_B.x - 0.85, 0, -14.2], suunta: 90, leveys: 5.2, syvyys: 0.3, korkeus: 0.45 },
  { resepti: 'penkki', paikka: [POYTA_B.x + 0.85, 0, -14.2], suunta: 90, leveys: 5.2, syvyys: 0.3, korkeus: 0.45 },
  ...kattaus(POYTA_A.x, POYTA_A.z0, POYTA_A.z1, POYTA_A.siemen),
  ...kattaus(POYTA_B.x, POYTA_B.z0, POYTA_B.z1, POYTA_B.siemen),
  { resepti: 'pelilauta', paikka: [POYTA_B.x, 0.8, -11.9], suunta: 90, nopat: 3, siemen: 1495 },
  // Vartiotupa yhdistetty väentupaan (Päätoimittaja 29.9.: lähin dokumentoitu vartiotupa): keihäät, kilpi, jalkajouset.
  { resepti: 'keihasteline', paikka: [-21.55, 0, -10.6], suunta: 90, keihaita: 4 },
  { resepti: 'kilpi', paikka: [-12.5, 1.75, -18.45], suunta: 180, sade: 0.28 },
  { resepti: 'jalkajousi', paikka: [-16.5, 1.55, -18.45], suunta: 180, kpl: 2 },

  // Tarjoilupöytä salin keskellä (apulaisen reitin päätepiste).
  { resepti: 'poyta', paikka: [-14.75, 0, -12.2], suunta: 0, leveys: 2.4, syvyys: 0.9, korkeus: 0.8 },
  { resepti: 'leipa', paikka: [-15.75, 0.8, -12.35], suunta: 20, sade: 0.11, korkeus: 0.09 },
  { resepti: 'leipa', paikka: [-15.5, 0.8, -12.05], suunta: 100, sade: 0.1, korkeus: 0.08 },
  { resepti: 'vati', paikka: [-15.1, 0.8, -12.3], suunta: 0, sade: 0.17 },
  { resepti: 'kala', paikka: [-15.1, 0.83, -12.3], suunta: 70, pituus: 0.3 },
  { resepti: 'leikkuulauta', paikka: [-14.6, 0.8, -12.4], suunta: 10 },
  { resepti: 'veitsi', paikka: [-14.45, 0.82, -12.4], suunta: 80 },
  { resepti: 'kynttilanjalka', paikka: [-14.35, 0.8, -12.05], suunta: 0, korkeus: 0.17 },
  { resepti: 'ruukku', paikka: [-13.55, 0.8, -12.4], suunta: 0, sade: 0.12, korkeus: 0.21 },
  { resepti: 'pullo', paikka: [-13.72, 0.8, -12.55], suunta: 0, sade: 0.05, korkeus: 0.19 },
  { resepti: 'suolalaatikko', paikka: [-14.05, 0.8, -12.0], suunta: 15 },

  // Olutynnyrit ja astiat lounaisnurkassa (Turun linnassa aseväelle 3,3 l olutta päivässä).
  { resepti: 'tynnyri', paikka: [-21.15, 0, -10.05], suunta: 0, sade: 0.35, korkeus: 0.9, segmentit: 14 },
  { resepti: 'tynnyri', paikka: [-21.15, 0, -10.95], suunta: 0, sade: 0.35, korkeus: 0.9, segmentit: 14 },
  { resepti: 'tynnyri', paikka: [-20.35, 0, -10.4], suunta: 0, sade: 0.35, korkeus: 0.9, segmentit: 14 },
  { resepti: 'ruukku', paikka: [-21.15, 0.9, -10.05], suunta: 0, sade: 0.11, korkeus: 0.2 },
  { resepti: 'pullo', paikka: [-21.2, 0.9, -10.95], suunta: 0, sade: 0.05, korkeus: 0.19 },
  { resepti: 'ruukku', paikka: [-20.35, 0.9, -10.4], suunta: 0, sade: 0.1, korkeus: 0.18 },
  { resepti: 'saavi', paikka: [-19.55, 0, -9.85], suunta: 0, sade: 0.38, korkeus: 0.42 },
  { resepti: 'vesisanko', paikka: [-18.9, 0, -9.7], suunta: 40, sade: 0.15, korkeus: 0.22 },
  { resepti: 'ruukku', paikka: [-21.35, 0, -9.55], suunta: 0, sade: 0.12, korkeus: 0.2 },

  // Länsiseinän hylly (tasot y ≈ 0,12 / 1,05 / 1,97) täynnä astioita.
  { resepti: 'hylly', paikka: [-21.5, 0, -15.5], suunta: 90, leveys: 3, korkeus: 2.0, syvyys: 0.4, hyllyt: 3 },
  { resepti: 'ruukku', paikka: [-21.5, 0.12, -16.5], suunta: 0, sade: 0.11, korkeus: 0.18 },
  { resepti: 'ruukku', paikka: [-21.5, 0.12, -15.8], suunta: 0, sade: 0.1, korkeus: 0.2 },
  { resepti: 'pullo', paikka: [-21.5, 0.12, -15.2], suunta: 0, sade: 0.05, korkeus: 0.18 },
  { resepti: 'suolalaatikko', paikka: [-21.5, 0.12, -14.55], suunta: 90 },
  { resepti: 'vati', paikka: [-21.5, 1.045, -16.5], suunta: 0, sade: 0.14 },
  { resepti: 'ruukku', paikka: [-21.5, 1.045, -15.75], suunta: 0, sade: 0.11, korkeus: 0.19 },
  { resepti: 'pullo', paikka: [-21.5, 1.045, -15.1], suunta: 0, sade: 0.055, korkeus: 0.2 },
  { resepti: 'vati', paikka: [-21.5, 1.045, -14.5], suunta: 0, sade: 0.13 },
  { resepti: 'ruukku', paikka: [-21.5, 1.97, -16.4], suunta: 0, sade: 0.1, korkeus: 0.17 },
  { resepti: 'pullo', paikka: [-21.5, 1.97, -15.7], suunta: 0, sade: 0.05, korkeus: 0.16 },
  { resepti: 'oljylamppu', paikka: [-21.5, 1.97, -15.0], suunta: 0, sade: 0.06, korkeus: 0.09 },
  { resepti: 'leipa', paikka: [-21.5, 1.97, -14.4], suunta: 0, sade: 0.09, korkeus: 0.075 },

  // Pohjoisseinän vasen pää: viljasäkit, suolakalatynnyrit. Oikea pää: hylly ja tarvikkeita.
  { resepti: 'tynnyri', paikka: [-21.0, 0, -17.55], suunta: 0, sade: 0.35, korkeus: 0.9, segmentit: 14 },
  { resepti: 'sakki', paikka: [-20.05, 0, -18.0], suunta: 0, sade: 0.3, korkeus: 0.6, siemen: 41 },
  { resepti: 'sakki', paikka: [-19.5, 0, -17.35], suunta: 0, sade: 0.28, korkeus: 0.55, siemen: 42 },
  { resepti: 'sakki', paikka: [-18.6, 0, -18.05], suunta: 0, sade: 0.3, korkeus: 0.6, siemen: 43 },
  { resepti: 'hylly', paikka: [-9.3, 0, -18.3], suunta: 180, leveys: 2.2, korkeus: 2.0, syvyys: 0.4, hyllyt: 3 },
  { resepti: 'ruukku', paikka: [-9.9, 0.12, -18.3], suunta: 0, sade: 0.11, korkeus: 0.18 },
  { resepti: 'ruukku', paikka: [-9.3, 0.12, -18.3], suunta: 0, sade: 0.1, korkeus: 0.2 },
  { resepti: 'pullo', paikka: [-8.7, 0.12, -18.3], suunta: 0, sade: 0.05, korkeus: 0.18 },
  { resepti: 'vati', paikka: [-9.9, 1.045, -18.3], suunta: 0, sade: 0.14 },
  { resepti: 'leipa', paikka: [-9.35, 1.045, -18.3], suunta: 0, sade: 0.1, korkeus: 0.08 },
  { resepti: 'suolalaatikko', paikka: [-8.7, 1.045, -18.3], suunta: 0 },
  { resepti: 'pullo', paikka: [-9.85, 1.97, -18.3], suunta: 0, sade: 0.05, korkeus: 0.17 },
  { resepti: 'ruukku', paikka: [-9.2, 1.97, -18.3], suunta: 0, sade: 0.1, korkeus: 0.17 },
  { resepti: 'oljylamppu', paikka: [-8.7, 1.97, -18.3], suunta: 0, sade: 0.06, korkeus: 0.09 },
  { resepti: 'sakki', paikka: [-11.0, 0, -18.05], suunta: 0, sade: 0.3, korkeus: 0.6, siemen: 44 },
  { resepti: 'nauriskori', paikka: [-11.7, 0, -18.1], suunta: 0, sade: 0.2, korkeus: 0.2, nauriita: 5, siemen: 511 },

  // Itäseinän varusteet: keihäät, ruuti- ja nuolitynnyri, arkku, hylly ja kilvet (ovi z −15,85…−14,65 vapaana).
  { resepti: 'keihasteline', paikka: [-8.3, 0, -17.5], suunta: 270 },
  { resepti: 'nuolitynnyri', paikka: [-8.45, 0, -16.4], suunta: 0 },
  { resepti: 'ruutitynnyri', paikka: [-8.7, 0, -16.9], suunta: 0 },
  { resepti: 'arkku', paikka: [-8.15, 0, -10.55], suunta: 270 },
  { resepti: 'hylly', paikka: [-8.0, 0, -12.7], suunta: 270, leveys: 2, korkeus: 2.0, syvyys: 0.4, hyllyt: 3 },
  { resepti: 'ruukku', paikka: [-8.0, 0.12, -13.3], suunta: 0, sade: 0.11, korkeus: 0.18 },
  { resepti: 'pullo', paikka: [-8.0, 0.12, -12.7], suunta: 0, sade: 0.05, korkeus: 0.18 },
  { resepti: 'vati', paikka: [-8.0, 1.045, -13.2], suunta: 0, sade: 0.14 },
  { resepti: 'leipa', paikka: [-8.0, 1.045, -12.4], suunta: 0, sade: 0.1, korkeus: 0.08 },
  { resepti: 'ruukku', paikka: [-8.0, 1.97, -13.1], suunta: 0, sade: 0.1, korkeus: 0.17 },
  { resepti: 'pullo', paikka: [-8.0, 1.97, -12.3], suunta: 0, sade: 0.05, korkeus: 0.16 },
  { resepti: 'kilpi', paikka: [-7.8, 3.1, -13.4], suunta: 270 },
  { resepti: 'kilpi', paikka: [-7.8, 3.1, -12.4], suunta: 270 },
  { resepti: 'kilpi', paikka: [-7.8, 3.1, -11.4], suunta: 270 },
  { resepti: 'kilpi', paikka: [-7.8, 3.1, -16.5], suunta: 270 },

  // Kilvet pohjois- ja länsiseinällä; seinäsoihdut (tuovat oman valonsa).
  { resepti: 'kilpi', paikka: [-19.6, 3.3, -18.5], suunta: 180 },
  { resepti: 'kilpi', paikka: [-18.3, 3.3, -18.5], suunta: 180 },
  { resepti: 'kilpi', paikka: [-11.4, 3.3, -18.5], suunta: 180 },
  { resepti: 'kilpi', paikka: [-10.2, 3.3, -18.5], suunta: 180 },
  { resepti: 'kilpi', paikka: [-21.7, 3.0, -11.3], suunta: 90 },
  { resepti: 'kilpi', paikka: [-21.7, 3.0, -13.6], suunta: 90 },
  { resepti: 'seinasoihtu', paikka: [-20.8, 2.2, -18.5], suunta: 180 },
  { resepti: 'seinasoihtu', paikka: [-8.7, 2.2, -18.5], suunta: 180 },
  { resepti: 'seinasoihtu', paikka: [-21.7, 2.2, -12.45], suunta: 90 },
  { resepti: 'seinasoihtu', paikka: [-7.8, 2.7, -14.4], suunta: 270 },
];

// Kynttilänjalkojen ja kruunun liekit sekä soihtujen liekit (sijainnit kuten yllä).
const KRUUNU_LIEKIT = [0, 1, 2, 3, 4].map((i) => {
  const ka = ((360 * i) / 5 + 18) * (Math.PI / 180);
  return { liekki: 'kynttila', paikka: [-14.75 + 0.35 * Math.sin(ka), 3.8, -15.4 - 0.35 * Math.cos(ka)], koko: 1, vaihe: i * 0.21 };
});

export const TILA = {
  id: 'keskushalli',
  nimi: 'Keskushalli',
  // Infotaulu (omistajan hyväksymä rakenne 30.9.): nimi + rivi siitä, mikä huone oli (Päätoimittaja, faktat
  // Sisältökirjuri 30.9. 5684d5d81); muoto kuten taulu.kohdat.
  infotaulu: { nimi: 'Keskushalli ja väentupa', rivit: [{ teksti: 'Alakerrassa sotaväen ruokasali, yläkerrassa voudin asunto.', lahde: 'Apu: Suomen keskiaikaiset kivilinnat 6/6; Kansallismuseo: Keskushalli' }] },
  // Kuunnelma (Päätoimittaja 30.9., v2 faktantarkistettu, docs/raportit/olavinlinna-kuunnelmat-20260930.md d22082f88):
  // kohtaus = rivijono; puhuja = tämän tilan hahmon id tai 'pulu' (huom = esim. oven takaa, ei näkyvissä).
  // id = tuleva ääni-id; aani null, kunnes omistaja valitsee äänet (ei generointia ennen lupaa).
  kuunnelma: [
    { id: 'keskushalli-k1', puhuja: 'apulainen', nimi: 'Tarjoilija', aani: null,
      teksti: 'Tietä, tietä! Kalakeittoa väentupaan ja voudin pöytään ylös toiseen kerrokseen – kumpikaan ei odota.' },
    { id: 'keskushalli-k2', puhuja: 'vartija', nimi: 'Vartija', aani: null,
      teksti: 'Kolme kuutosta! Maksa, kun vielä kehtaat.' },
    { id: 'keskushalli-k3', puhuja: 'vartija2', nimi: 'Vartija 2', aani: null,
      teksti: 'Puhu hiljempaa. Vouti ravaa tänään portaissa kuin kana ilman päätä – jotain on hukassa.' },
    { id: 'keskushalli-k4', puhuja: 'talonpoika', nimi: 'Talonpoika', aani: null,
      teksti: 'Ja me lämmitellään täällä alhaalla. Hormeja myöten paras lämpö nousee voudin kamariin.' },
    { id: 'keskushalli-k5', puhuja: 'pulu', nimi: 'Pulu', aani: null,
      teksti: 'Sataviisikymmentä, jopa kaksisataa asukasta samassa linnassa. Ei ihme, ettei täällä kukaan kuule omia ajatuksiaan.' },
  ],
  kohdistettava: true,
  // Uusi tapa (dioraama-rajapinnat-blender-20260929.md kohta 2): pohjoismuurin muunnos Kellotornin (−30, −20) → kuoren
  // Kellotorni (−44,4; −4,6) ja lähteen +x → Kirkkotornia kohti (suunta 341), iso linnanpiha y 2,9 (säteet 29.9. klo 21).
  sijoitus: { ankkuri: [-30, 0, -20], paikka: [-44.4, 2.9, -4.6], suunta: 341 },
  rajat: { min: [-22, 0, -18.5], max: [-7.5, 5, -9] },
  // Leikkaus pohjoissiiven katon (≈ 13,8 → lähteessä 10,9) yli.
  leikkaus: { laajennus: 1.0, kameraan: true, min: [-22, 0, -18.5], max: [-7.5, 11.5, -9] },
  naapurit: ['massa', 'fatabuuri', 'muurinharja', 'kappeli', 'keittio'],
  kamera: { kohde: [-14.75, 1.6, -13.8], atsimuutti: 170, korkeus: 22, etaisyys: 17, fov: 38, aukko: 0.8 },
  kameraPysty: { kohde: [-13.02, -4, -14.04], // pysty 30.9.: noppapeli ja apulainen näkyviin (x 0,63–0,86)
     atsimuutti: 172, korkeus: 24, etaisyys: 43, fov: 38, aukko: 0.8 },
  pulu: { laskeutuminen: [-14.0, 0.8, -12.2], taulupuoli: 'oikea',
    // Pulun kertomus (napautus reunakuvasta), tekstit v1 Päätoimittajalta; ääni vasta omistajan luvalla.
    teksti: 'Alakerrassa oli väentupa, sotaväen ruokasali, ja toisessa kerroksessa asui vouti. Linnaa lämmitettiin avotakoilla, ja lämpö johdettiin hormien kautta. 1500-luvun tilikirjojen mukaan linnassa asui 150–200 henkeä – ei ihme, että täällä on hälinää.', aani: null },
  taulu: TAULU,
  // Elävä linna (29.9.): pohjoissiiven pihajulkisivu (ikkunoista valo ja sorina).
  elava: { kohde: [-14.75, 3.5, -9.2], sade: 6 },
  // Tumma yleisvalo; avotakka on lämmin päälähde ("keittiön lämmin ilma nousi hormia..."), keskellä salia pieni
  // kynttilöiden hehku. Soihtujen, kynttilänjalkojen ja kruunun valot tulevat rekvisiitasta automaattisesti.
  valot: [
    { paikka: [-14.75, 0.8, -17.3], sade: 11, voima: 1.8, vari: '#ff9a4a', lepatus: 0.35 },
    { paikka: [-14.75, 2.6, -12.5], sade: 8, voima: 0.8, vari: '#ffb070', lepatus: 0.15 },
  ],
  palikat: PALIKAT,
  hahmot: HAHMOT,
  // Äänet (Linnanrakentaja 30.9., CC0/PD, suunnitelma docs/raportit/linna-aanet-suunnitelma-20260930.md kohta 2).
  aanet: [{ aani: 'keskushalli-ambienssi', voimakkuus: 0.7 }, { aani: 'takka-ratina', voimakkuus: 0.6 }],
  tehosteet: [
    { aanet: ['pikari-1', 'pikari-2'], valit_s: [6, 14], voimakkuus: 0.5 },
    { aanet: ['noppa-1', 'noppa-2'], valit_s: [10, 20], voimakkuus: 0.5 },
    { aanet: ['penkki'], valit_s: [15, 30], voimakkuus: 0.4 },
    { aanet: ['askel-puu', 'askel-kivi'], valit_s: [8, 18] },
    { aanet: ['ovi-puu'], valit_s: [25, 50] },
  ],
  liekit: [
    // Avotakan hiillos (korkeus 0,9), kolme liekkiä vierekkäin.
    { liekki: 'tulisija', paikka: [-14.75, 0.9, -17.9], koko: 1.2, vaihe: 0 },
    { liekki: 'tulisija', paikka: [-15.25, 0.9, -17.75], koko: 0.85, vaihe: 0.35 },
    { liekki: 'tulisija', paikka: [-14.25, 0.9, -17.75], koko: 0.85, vaihe: 0.7 },
    // Seinäsoihdut (liekki ≈ 0,47 m pidikkeestä ja 0,26 m seinästä).
    { liekki: 'soihtu', paikka: [-20.8, 2.67, -18.24], koko: 1, vaihe: 0.1 },
    { liekki: 'soihtu', paikka: [-8.7, 2.67, -18.24], koko: 1, vaihe: 0.55 },
    { liekki: 'soihtu', paikka: [-21.44, 2.67, -12.45], koko: 1, vaihe: 0.8 },
    { liekki: 'soihtu', paikka: [-8.06, 3.17, -14.4], koko: 1, vaihe: 0.3 },
    ...KRUUNU_LIEKIT,
    ...kynttilaLiekit(POYTA_A.x, POYTA_A.z0, POYTA_A.z1),
    ...kynttilaLiekit(POYTA_B.x, POYTA_B.z0, POYTA_B.z1),
    { liekki: 'kynttila', paikka: [-14.35, 0.8 + 0.178, -12.05], koko: 1, vaihe: 0.4 },
  ],
  kasikirjoitus: [
    { tee: 'pulu-lenna' },
    { tee: 'taulu' },
    { tee: 'kohta', n: 0 },
    { tee: 'repliikki', hahmo: 'apulainen' },
    { tee: 'reaktio', hahmo: 'apulainen' },
    { tee: 'kohta', n: 1 },
    { tee: 'repliikki', hahmo: 'vartija' },
    { tee: 'kohta', n: 2 },
  ],
};
