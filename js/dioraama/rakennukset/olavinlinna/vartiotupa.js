// EI KÄYTÖSSÄ 29.9.2026 (Päätoimittaja): vartiotupa yhdistetty keskushallin väentupaan; tiedosto säilyy tekstien lähteenä.
// OLAVINLINNA / vartiotupa: portinvartijoiden tupa lounaiskulmassa portin vieressä (tulkinta); eteläseinä poistettu kuten keittiössä.
// Erä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md). Taulun faktat: Sisältökirjuri 29.9.
// (docs/raportit/sisaltokirjuri-olavinlinna-era3-20260929.md); tila 'luonnos' kunnes äänet ja tarkistus valmiit.
//
// Sisämitat x −31,4…−22,6, z 5,6…12,5 (seinät rajojen sisällä), lattia y 0, korkeus 3,6. Massan eteläseinä (z 12,5…15,5)
// on tuvan kohdalta aukileikattu, joten tupa on auki etelään (kamera). Tulisija takaseinän itäpäässä, ovi itäseinässä
// porttikäytävään (portti x −19,5), kapea ampumarako länsiseinässä (aurinkokeila), nopanheitto pöydän ääressä.

const TAULU = {
  otsikko: 'Vartiotupa (tulkinta)',
  tila: 'luonnos',
  kohdat: [
    { teksti: 'Linnasta vartioitiin kriisin aikana saarilla: Vahtisaari ja Vartijasaari valvoivat reittejä.', lahde: 'Savon historia: Olavinlinnan suojassa' },
    { teksti: 'Hämeen linnan palvelusväkeen kuului portinvartija, joka vahti ulkoporttia ja päästi väkeä sisään.', lahde: 'Ailio: Hämeen linnan asukkaista ja oloista (analogia)' },
    { teksti: 'Keskushallin alakerran väentupa oli sotaväen ruoka- ja oleskelutila – lähin dokumentoitu vartiotupa.', lahde: 'Kansallismuseo: Keskushalli' },
  ],
};

const VARTIOTUPA_HAHMOT = [
  {
    id: 'portinvartija', henkilo: 'portinvartija-1500', paikka: [-23.6, 0, 11.7], suunta: 110, peilattu: false,
    silmukka: 'idle', heraa: 1, reitti: null,
    repliikit: [
      { id: 'portinvartija-1', teksti: 'Portti aukeaa aamulla ja sulkeutuu illalla, eikä väliin päästetä ketään ilman asiaa.' },
      { id: 'portinvartija-2', teksti: 'Viisi vuotta sitten venäläiset tulivat tänne asti. Portti pysyi kiinni ja linna piti.' },
    ],
    reaktio: { id: 'pulu-portinvartija-r1', teksti: 'Portti, joka aukeaa vain asialliselle vieraalle? Meillä sitä sanotaan ovipuhelimeksi.' },
  },
  {
    id: 'vartija', henkilo: 'vartija-1500', paikka: [-29.3, 0, 8.7], suunta: 90, peilattu: false,
    silmukka: 'tyo', heraa: 2, reitti: null,
    repliikit: [
      { id: 'vartija-1', teksti: 'Heitä vielä kerran. Vuoronvaihtoon on aikaa, kunnes kello lyö.' },
      { id: 'vartija-2', teksti: 'Yövuoro muurilla on kylmintä: parta kuurassa ja sormet kohmeessa jo puoliyöllä.' },
    ],
    reaktio: { id: 'pulu-vartija-r1', teksti: 'Nopat pöydällä, kuura partaan! Minä vaihdan vuoroa vain leipäpalan vuoksi.' },
  },
];

export const TILA = {
  id: 'vartiotupa',
  nimi: 'Vartiotupa',
  kohdistettava: true,
  rajat: { min: [-32, 0, 5], max: [-22, 3.6, 12.5] },
  naapurit: ['massa', 'laituri', 'fatabuuri'],
  kamera: { kohde: [-27, 1.0, 8.9], atsimuutti: 172, korkeus: 22, etaisyys: 12.5, fov: 38, aukko: 0.8 },
  // Pystynäytössä taulu peittää alimman 45 %, joten tupa nostetaan näkyvän yläosan keskelle (kuten keittiö).
  kameraPysty: { kohde: [-27, -0.8, 8.6], atsimuutti: 174, korkeus: 24, etaisyys: 26, fov: 38, aukko: 0.8 },
  pulu: { laskeutuminen: [-26.6, 0.8, 8.95], taulupuoli: 'oikea' },
  taulu: TAULU,
  valot: [
    // Päälähde: tulisija (lämmin, lepattaa). Seinäsoihdun ja pöydän kynttilän valo tulee reseptien omista .valo-kentistä.
    { paikka: [-25.6, 0.9, 7.0], sade: 9, voima: 1.8, vari: '#ff9a4a', lepatus: 0.3 },
    // Ampumaraon aurinkokeila länsiseinästä (x −31,7, z 7,0, y 1,2–2,3) lattialle ja pöydän länsipäähän.
    // Ei leivota lämpöön (rakenna.mjs ohittaa tyypin 'keila'); voima iteroitu ~3,8 m etäisyydelle.
    { tyyppi: 'keila', paikka: [-32.4, 1.9, 7.0], kohti: [-29.4, 0, 7.9], kulma: 26, sade: 6, voima: 90, vari: '#ffd8a0' },
  ],
  palikat: [
    // Lattia: kivilattia koko tuvan alalle (seinät seisovat sen päällä, lattia jatkuu auki etelään z 12,5:een).
    { resepti: 'kivilattia', paikka: [-27, 0, 8.75], suunta: 0, leveys: 10, syvyys: 7.5, paksuus: 0.3, siemen: 1495 },
    // Katto porrastettu taaemmas (kuten keittiö): laatta vain takaosan (z 5…8,2) päällä, alapinta y 3,3, jotta
    // yläviistosta näkee sisään. Orret katon etu- ja keskireunassa.
    { resepti: 'laatta', paikka: [-27, 3.6, 6.6], suunta: 0, leveys: 10, syvyys: 3.2, paksuus: 0.3 },
    { resepti: 'laatta', paikka: [-27, 3.3, 8.3], suunta: 0, leveys: 9.4, syvyys: 0.28, paksuus: 0.26, pinnat: { yla: 'puu', ala: 'puu', sivu: 'puu' } },
    { resepti: 'laatta', paikka: [-27, 3.3, 6.5], suunta: 0, leveys: 9.4, syvyys: 0.24, paksuus: 0.22, pinnat: { yla: 'puu', ala: 'puu', sivu: 'puu' } },

    // Takaseinä (pohjoinen, sisäpinta = taka 'rappaus'), z 5,0…5,6.
    { resepti: 'seina', paikka: [-27, 0, 5.3], suunta: 0, pituus: 10, korkeus: 3.6, paksuus: 0.6 },
    // Länsiseinä: ampumarako (kapea, syvä) z 7,0; eteläpää leikkaus-roolilla (u+ = etelä).
    {
      resepti: 'seina', paikka: [-31.7, 0, 8.75], suunta: 90, pituus: 7.5, korkeus: 3.6, paksuus: 0.6,
      aukot: [{ u: -1.75, y: 1.2, leveys: 0.32, korkeus: 1.1 }],
      leikkaus: { vasen: false, oikea: true, yla: false },
    },
    // Itäseinä (suunta 270: u = −z, etupinta 'kivi' sisään päin): ovi porttikäytävään z 10,5; eteläpää leikkaus (u− = etelä).
    {
      resepti: 'seina', paikka: [-22.3, 0, 8.75], suunta: 270, pituus: 7.5, korkeus: 3.6, paksuus: 0.6,
      aukot: [{ u: -1.75, y: 0, leveys: 1.1, korkeus: 2.3 }],
      leikkaus: { vasen: true, oikea: false, yla: false },
    },

    // Tulisija takaseinän itäpäässä (huuva kattoon y 3,2), puukasa ja hiillospihdit vieressä, seinäsoihtu itäseinällä.
    { resepti: 'tulisija', paikka: [-25, 0, 6.05], suunta: 180, leveys: 1.6, syvyys: 0.9, korkeus: 0.7, huuva: { korkeus: 1.4, yla: 3.2 } },
    { resepti: 'puukasa', paikka: [-26.55, 0, 6.15], suunta: 15, pituus: 0.4, halkoja: 6, siemen: 411 },
    { resepti: 'hiillospihdit', paikka: [-23.75, 0, 6.6], suunta: 70, pituus: 0.4 },
    { resepti: 'seinasoihtu', paikka: [-22.6, 1.9, 7.4], suunta: 270 },
    { resepti: 'seinasoihtu', paikka: [-31.4, 2.0, 9.0], suunta: 90 },
    { resepti: 'tynnyri', paikka: [-23.2, 0, 6.0], suunta: 0, sade: 0.3, korkeus: 0.85, segmentit: 16 },
    { resepti: 'kauha', paikka: [-23.2, 0.85, 6.0], suunta: 30 },
    { resepti: 'pullo', paikka: [-23.7, 0, 7.3], suunta: 0, sade: 0.05, korkeus: 0.2 },

    // Takaseinä länsipuolella: arkku (+ ruukku), täysi hylly, jalkajousi ja kilpi seinällä.
    { resepti: 'arkku', paikka: [-30.8, 0, 6.1], suunta: 180 },
    { resepti: 'ruukku', paikka: [-31.0, 0.55, 6.1], suunta: 0, sade: 0.1, korkeus: 0.18 },
    { resepti: 'hylly', paikka: [-29.2, 0, 5.9], suunta: 180, leveys: 1.5, korkeus: 1.8, syvyys: 0.5, hyllyt: 3 },
    { resepti: 'ruukku', paikka: [-29.7, 0.12, 5.9], suunta: 0, sade: 0.11, korkeus: 0.18 },
    { resepti: 'pullo', paikka: [-29.2, 0.12, 5.95], suunta: 0, sade: 0.05, korkeus: 0.18 },
    { resepti: 'suolalaatikko', paikka: [-28.7, 0.12, 5.9], suunta: 0 },
    { resepti: 'vati', paikka: [-29.7, 0.945, 5.9], suunta: 0, sade: 0.14 },
    { resepti: 'leipa', paikka: [-29.1, 0.945, 5.9], suunta: 20, sade: 0.1, korkeus: 0.08 },
    { resepti: 'ruukku', paikka: [-28.75, 0.945, 5.95], suunta: 0, sade: 0.1, korkeus: 0.2 },
    { resepti: 'oljylamppu', paikka: [-29.7, 1.77, 5.9], suunta: 0, sade: 0.06, korkeus: 0.09 },
    { resepti: 'pullo', paikka: [-29.3, 1.77, 5.9], suunta: 0, sade: 0.05, korkeus: 0.17 },
    { resepti: 'ruukku', paikka: [-28.8, 1.77, 5.95], suunta: 0, sade: 0.09, korkeus: 0.16 },
    { resepti: 'jalkajousi', paikka: [-27.55, 1.55, 5.6], suunta: 180, kpl: 2 },
    { resepti: 'kilpi', paikka: [-26.55, 1.75, 5.6], suunta: 180, sade: 0.28 },

    // Pöytä keskellä: nopanheitto (pelilauta + nopat), kynttilänjalka, ruukku, pikarit. Penkit pohjoisen ja etelän puolella.
    { resepti: 'poyta', paikka: [-27.6, 0, 8.7], suunta: 0, leveys: 2.3, syvyys: 0.9, korkeus: 0.8 },
    { resepti: 'penkki', paikka: [-27.6, 0, 7.9], suunta: 0, leveys: 1.9, syvyys: 0.3, korkeus: 0.45 },
    { resepti: 'penkki', paikka: [-27.6, 0, 9.5], suunta: 0, leveys: 1.9, syvyys: 0.3, korkeus: 0.45 },
    { resepti: 'pelilauta', paikka: [-28.0, 0.8, 8.75], suunta: 0, koko: 0.5, nopat: 3, siemen: 1495 },
    { resepti: 'kynttilanjalka', paikka: [-27.0, 0.8, 8.35], suunta: 0, korkeus: 0.17 },
    { resepti: 'ruukku', paikka: [-28.9, 0.8, 8.35], suunta: 0, sade: 0.1, korkeus: 0.2 },
    { resepti: 'pullo', paikka: [-27.15, 0.8, 9.0], suunta: 0, sade: 0.05, korkeus: 0.18 },
    { resepti: 'leipa', paikka: [-27.55, 0.8, 9.2], suunta: -20, sade: 0.09, korkeus: 0.07 },
    { resepti: 'veitsi', paikka: [-27.4, 0.8, 8.95], suunta: 70 },
    { resepti: 'vati', paikka: [-28.6, 0.8, 9.15], suunta: 0, sade: 0.13 },

    // Länsiseinä: keihäsrivi, kilpi ja nuolitynnyri (ampumarako z 7,0), olkipatja nurkassa.
    { resepti: 'keihasteline', paikka: [-31.0, 0, 11.4], suunta: 90, leveys: 0.9, keihaita: 4, pituus: 2.0 },
    { resepti: 'kilpi', paikka: [-31.4, 1.9, 10.2], suunta: 90, sade: 0.28 },
    { resepti: 'nuolitynnyri', paikka: [-31.0, 0, 9.8], suunta: 0 },
    { resepti: 'laatta', paikka: [-30.35, 0.05, 7.9], suunta: 12, leveys: 1.5, syvyys: 1.0, paksuus: 0.06, pinnat: { yla: 'olki', ala: 'olki', sivu: 'olki' } },
    { resepti: 'laatta', paikka: [-30.1, 0.09, 8.05], suunta: -25, leveys: 1.0, syvyys: 0.7, paksuus: 0.05, pinnat: { yla: 'olki', ala: 'olki', sivu: 'olki' } },
    { resepti: 'laatta', paikka: [-24.2, 0.05, 8.7], suunta: 30, leveys: 0.9, syvyys: 0.6, paksuus: 0.05, pinnat: { yla: 'olki', ala: 'olki', sivu: 'olki' } },

    // Itäseinä ja ovi: hakapyssy tukijalalla, ruutitynnyri, köysikieppi, luuta, säkki.
    { resepti: 'hakapyssy', paikka: [-23.2, 0, 8.9], suunta: 300 },
    { resepti: 'ruutitynnyri', paikka: [-23.15, 0, 9.5], suunta: 0, sade: 0.16, korkeus: 0.3 },
    { resepti: 'luuta', paikka: [-22.8, 0, 9.1], suunta: -80, korkeus: 0.8 },
    { resepti: 'sakki', paikka: [-23.1, 0, 12.1], suunta: 0, sade: 0.3, korkeus: 0.6, siemen: 41 },
    { resepti: 'koysikieppi', paikka: [-24.5, 0, 12.0], suunta: 0, sade: 0.22, koysi: 0.02 },
    { resepti: 'saavi', paikka: [-25.3, 0, 11.9], suunta: 0, sade: 0.3, korkeus: 0.35 },

    // Katosta roikkuu leipärengas ja yrttejä (kiinnityspisteet y ≤ 3,25 katon alapinnan y 3,3 alla).
    { resepti: 'orsileivat', paikka: [-26.3, 3.25, 8.2], suunta: 0, pituus: 1.4, leipia: 5, siemen: 302 },
    { resepti: 'yrttinippu', paikka: [-29.6, 3.25, 6.5], suunta: -5, korkeus: 0.28 },
    { resepti: 'yrttinippu', paikka: [-24.6, 3.25, 7.2], suunta: 10, korkeus: 0.3 },
    { resepti: 'yrttinippu', paikka: [-28.4, 3.25, 8.3], suunta: 0, korkeus: 0.26 },
  ],
  hahmot: VARTIOTUPA_HAHMOT,
  // Äänet (Linnanrakentaja 30.9., CC0/PD, suunnitelma docs/raportit/linna-aanet-suunnitelma-20260930.md kohta 2).
  aanet: [{ aani: 'vartiotupa-ambienssi', voimakkuus: 0.7 }],
  tehosteet: [
    { aanet: ['noppa-1', 'noppa-2'], valit_s: [8, 16], voimakkuus: 0.5 },
    { aanet: ['keihas-kolahdus'], valit_s: [20, 40], voimakkuus: 0.4 },
  ],
  liekit: [
    // Tulisijan hiillos (palikka [-25, 0, 6.05], korkeus 0,7) ja seinäsoihdun liekki (ks. seinäsoihtu alla).
    { liekki: 'tulisija', paikka: [-25, 0.7, 6.05], koko: 1, vaihe: 0 },
    { liekki: 'soihtu', paikka: [-22.875, 2.42, 7.4], koko: 1, vaihe: 0.4 },
    { liekki: 'soihtu', paikka: [-31.125, 2.52, 9.0], koko: 1, vaihe: 0.1 },
    { liekki: 'kynttila', paikka: [-27, 0.97, 8.35], koko: 1, vaihe: 0.7 },
  ],
  kasikirjoitus: [
    { tee: 'pulu-lenna' },
    { tee: 'taulu' },
    { tee: 'kohta', n: 0 },
    { tee: 'repliikki', hahmo: 'portinvartija' },
    { tee: 'reaktio', hahmo: 'portinvartija' },
    { tee: 'kohta', n: 1 },
    { tee: 'repliikki', hahmo: 'vartija' },
    { tee: 'kohta', n: 2 },
  ],
};
