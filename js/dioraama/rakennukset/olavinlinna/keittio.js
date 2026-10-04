// OLAVINLINNA / keittiö (erät 1–2b). Kaakkoissiiven keittiö, sisämitat x 8…20, z 4…11, lattia y 0, korkeus 4.
// Siirretty omaan tiedostoonsa erässä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md kohta 1).
// Sisältö ennallaan; koordinaatisto ja speksit kuten olavinlinna.js:n alkukommentissa.

// Keittiön opetustaulu (TILA-tason, 3 kohtaa).
const TAULU_KEITTIO = {
  otsikko: 'Linnan keittiö',
  tila: 'tarkistettu',
  kohdat: [
    // Sisältökirjuri 30.9. (5684d5d81): korjattu lähteelliseksi, vanha ääni ei vastaa tekstiä → aani pois.
    { aani: 'keittio-kohta-0', teksti: 'Keittiö oli pienellä linnanpihalla; valtavassa liedessä paloi avotuli aamusta iltaan.', lahde: 'Yle: Olavinlinnan keittiö (yle.fi/a/3-6618420)' },
    { aani: 'keittio-kohta-1', teksti: 'Ruoka valmistettiin isoissa padoissa, ja linnassa syötiin paljon kalaa ja kasviksia.', lahde: 'Yle: Olavinlinnan keittiö (yle.fi/a/3-6618420); Apu: Suomen keskiaikaiset kivilinnat 6/6' },
    // Sisältökirjuri 29.9. (era4): entinen "ruokki koko linnaväen" oli tulkinta; ääni tehdään uudelleen hyväksynnän jälkeen.
    { aani: 'keittio-kohta-2', teksti: 'Vouti ja seurue söivät yläsalissa, sotilaat ja käsityöläiset Linnantuvassa.', lahde: 'Yle: Olavinlinnan keittiö (yle.fi/a/3-6618420)' },
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
    id: 'vesipoika', henkilo: 'vesipoika-1500', paikka: [18.6, 0, 7.8], suunta: 304, peilattu: false,
    silmukka: 'kavely', heraa: 2,
    // 2.10. (skinnatut hahmot): kiertää pöydän ja luudan; pysähtyy ≥ 1 m:n päähän kokista ja tulisijan
    // liekistä, ≥ 0,35 m pöydän, säkkien ja tulisijan reunoista (erä 1b, reittitesti);
    // pää siirretty pöydän ja säkkien välistä (0,7 m:n rako) pöydän kaakkoiskulmalle (ennen suoraan pöydän läpi; tests/dioraama-reitit.test.mjs)
    reitti: { pisteet: [[18.6, 0, 7.8], [17.6, 0, 6.0], [14.4, 0, 5.95], [17.6, 0, 6.0], [18.6, 0, 7.8]], nopeus: 1.0, tauko: 1.5 },
    repliikit: [
      { id: 'vesipoika-1', teksti: 'Järvestä tänne ja takaisin, jalat tuntevat jo polun ulkoa.', aani: 'vesipoika-1' },
      { id: 'vesipoika-2', teksti: 'Yksi sanko kokille, toinen padalle — kolmannen taidan juoda itse.', aani: 'vesipoika-2' },
    ],
    reaktio: { id: 'pulu-vesipoika-r1', teksti: 'Kymmeniä sankoja päivässä! Vesijohtoa hän ei ehtinyt nähdä.', aani: 'pulu-vesipoika-r1' },
  },
];

export const TILA = {
  id: 'keittio',
  nimi: 'Keittiö',
  // Infotaulu (omistajan hyväksymä rakenne 30.9.): nimi + rivi siitä, mikä huone oli (Päätoimittaja, faktat
  // Sisältökirjuri 30.9. 5684d5d81); muoto kuten taulu.kohdat.
  infotaulu: { nimi: 'Keittiö', rivit: [{ teksti: 'Linnan keittiö pienellä linnanpihalla: avotuli paloi aamusta iltaan.', lahde: 'Yle: Olavinlinnan keittiö (yle.fi/a/3-6618420); Apu: Suomen keskiaikaiset kivilinnat 6/6' }] },
  // Kuunnelma (Päätoimittaja 30.9., v2 faktantarkistettu, docs/raportit/olavinlinna-kuunnelmat-20260930.md d22082f88):
  // kohtaus = rivijono; puhuja = tämän tilan hahmon id tai 'pulu' (huom = esim. oven takaa, ei näkyvissä).
  // id = tuleva ääni-id; aani null, kunnes omistaja valitsee äänet (ei generointia ennen lupaa).
  kuunnelma: [
    { id: 'keittio-k1', puhuja: 'kokki', nimi: 'Kokki', aani: 'keittio-k1',
      teksti: 'Kalaa ja naurista, naurista ja kalaa! Jos vouti vielä kerran kysyy, mitä tänään syödään, sanon: samaa mitä järvi ja pelto antaa.' },
    { id: 'keittio-k2', puhuja: 'vesipoika', nimi: 'Vesipoika', aani: 'keittio-k2',
      teksti: 'Kaksi sankoa lisää. Tuli on palanu aamusta asti – kohta tää keittiö kiehuu itekin.' },
    { id: 'keittio-k3', puhuja: 'kokki', nimi: 'Kokki', aani: 'keittio-k3',
      teksti: 'Vie tää vati Linnantupaan sotilaille. Yläsaliin mä vien itse – siellä ei kelpaa sankonkantajan likaiset sormet.' },
    { id: 'keittio-k4', puhuja: 'vouti', nimi: 'Vouti', huom: 'oven takaa', aani: 'keittio-k4',
      teksti: 'Kokki, en ehdi aterioimaan. Iltarukous alkaa, ja minun on vielä pistäydyttävä kappelissa.' },
    { id: 'keittio-k5', puhuja: 'pulu', nimi: 'Pulu', aani: 'keittio-k5',
      teksti: 'Kalaa aamulla, kalaa illalla, ja voutikin karkaa kappeliin. Minä jään muruvahdiksi.' },
  ],
  kohdistettava: true,
  // Uusi tapa (dioraama-rajapinnat-blender-20260929.md kohta 2): todellinen paikka fotogrammetriakuoressa. Keittiö
  // itäsiiven alakerrassa Pienen linnanpihan laidalla (tulkinta, Sisältökirjuri 29.9.: ikkunat pihalle, hormit
  // Kuninkaansaliin), piha y −3,0 (kuoren säde), avoin sivu länteen pihalle (suunta 90: +z → −x).
  sijoitus: { ankkuri: [14, 0, 7.5], paikka: [-12, -3.0, 8], suunta: 90 },
  rajat: { min: [8, 0, 4], max: [20, 4, 11] },
  // Leikkaus itäsiiven katon (≈ 12,6) yli: ylhäältä katsottaessa katto ei jää huoneen eteen (Siirtoseppä 29.9.).
  leikkaus: { laajennus: 1.0, kameraan: true, min: [8, 0, 4], max: [20, 16.5, 11] },
  naapurit: ['massa', 'keskushalli'],
  kamera: { kohde: [14, 1.2, 7.2], atsimuutti: 172, korkeus: 22, etaisyys: 16, fov: 38, aukko: 0.8 },
  // Kamerat ~22–24° vaakatason yläpuolella (Codexin hahmot on piirretty ~25° kulmasta). Pystynäytössä taulu
  // peittää alimman 45 %, joten huone rajataan lähelle ja nostetaan näkyvän yläosan keskelle.
  kameraPysty: { kohde: [13.05, -0.8, 7.08], // pysty 30.9.: kokki ja vihje 1 keskelle (x 0,52)
     atsimuutti: 174, korkeus: 24, etaisyys: 24, fov: 38, aukko: 0.8 },
  pulu: { aani: 'keittio-pulu', laskeutuminen: [11.9, 0.8, 9], taulupuoli: 'oikea',
    // Pulun kertomus (napautus reunakuvasta), tekstit v2 Päätoimittajalta (Sisältökirjuri 30.9.); ääni 1.10.2026 (omistajan lupa 30.9. klo 23.4x).
    teksti: 'Keittiö oli pienellä linnanpihalla. Valtavassa liedessä paloi avotuli aamusta iltaan, ja ruoka valmistettiin isoissa padoissa. Linnassa syötiin paljon kalaa ja kasviksia; vouti seurueineen söi yläsalissa, sotilaat ja käsityöläiset Linnantuvassa. Minä olisin tyytynyt muruihin.' },
  taulu: TAULU_KEITTIO,
  // Elävä linna (29.9.): yleisnäkymän napautuskohde pihan puolen julkisivulla (ikkunasta kajastaa tuli); ensimmäisen
  // käynnin sykkivä vihje on tässä.
  elava: { kohde: [14, 2.2, 10.8], sade: 6, vihje: true },
  // Tulisijan valo on lämmin ja lepattaa (erä 2b, kohta 1: "Tulisijalla lepatus 0,35"); pöydän täytevalo
  // pysyy tasaisena ja värittömänä (ei liekkiä, ei lepatusta).
  valot: [
    // Omistajan valinta 29.9. "B + tummempi valo": tulisija kantaa tunnelman (lämmin, voimakas), ikkunan
    // aurinko tekee valoläikän, yleisvalo on tumma. Entinen täytevalo (10,5, 0,8, 9) poistettu.
    { paikka: [14, 0.5, 4.9], sade: 8, voima: 1.8, vari: '#ff9a4a', lepatus: 0.35 },
    // Ikkunan aurinko (era2b-rajapinta, dioraama-rajapinnat-era2b-20260929.md kohta 1/2): länsi-ikkuna
    // (aukko u −1,2 eli z ≈ 6,3, y 1,3–2,6, ks. länsiseinän aukot alla) päästää keilan sisään — matala
    // länsiaurinko ei osu tähän (linnan muut osat varjostavat), korkea lounaisaurinko tekee valoläikän.
    // EI leivota lämpöön (rakenna.mjs ohittaa tyyppi 'keila' G-kanavasta — auringonvalo ei ole lämpöä).
    // voima 120 (iteroitu esikatselussa 29.9., ei alkuperäinen 3): keila on ~4,7 m päässä kohteestaan,
    // ja esikatselun three.js-moottori (r170) käyttää fysikaalisesti oikeaa käänteisneliövaimennusta
    // ilman "legacy"-kerrointa — pistevalojen tapaan lähietäisyydelle (≤ 0,5 m) viritetty voima (esim.
    // tulisijan 1,8) katoaisi näkymättömiin jo muutaman metrin päässä. Tarkista sama arvo natiivissa
    // Laitetestaajan kierroksella (Unityn URP-valomalli EI ole sama kuin three.js:n — sama luku voi
    // näyttää eri kirkkaalta, ks. luovutusraportti).
    {
      tyyppi: 'keila', paikka: [7.5, 2.5, 6.3], kohti: [11.5, 0, 6.0], kulma: 32, sade: 7, voima: 120, vari: '#ffd8a0',
    },
  ],
  palikat: [
    // Lattia ja katto (katto = salin lattia yläpuolella, leikkausreuna näkyy sivu-roolista). Katto on
    // porrastettu taaemmas (z 4–7,2) kuten poikkileikkauskuvituksissa, jotta keittiö näkyy yläviistosta.
    // Kivilattia (erä 2b, kohta 3): proseduraaliset laatat oletuskoolla (0,4-0,7 m), siemen
    // kiinnitetty näkyviin (eri lattiapalikoiden pitää saada eri siemen, ettei arvonta toistu).
    { resepti: 'kivilattia', paikka: [14, 0, 7.5], suunta: 0, leveys: 12, syvyys: 7, paksuus: 0.3, siemen: 1873 },
    { resepti: 'laatta', paikka: [14, 4, 5.6], suunta: 0, leveys: 12, syvyys: 3.2, paksuus: 0.4 },
    // Takaseinä (pohjoinen, z 4) ampumarakoineen.
    {
      resepti: 'seina', paikka: [14, 0, 4], suunta: 0, pituus: 12, korkeus: 4, paksuus: 0.6,
      aukot: [{ u: -3, y: 1.8, leveys: 0.25, korkeus: 1.2 }, { u: 3, y: 1.8, leveys: 0.25, korkeus: 1.2 }],
    },
    // Länsiseinä — eteläpää (avoin sivu) leikkaus-roolilla.
    {
      resepti: 'seina', paikka: [8, 0, 7.5], suunta: 90, pituus: 7, korkeus: 4, paksuus: 0.6,
      // Syvä ikkuna (29.9.): matala länsiaurinko piirtää valoläikän lattialle ja pöydälle.
      aukot: [{ u: -1.2, y: 1.3, leveys: 0.9, korkeus: 1.3 }],
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

    // --- P3 (erä 2b, rekvisiitta): tulisijan ympärys, katosta roikkuvat, katetut pöydät, täysi hylly
    // ja lattian astiat (docs/raportit/dioraama-rajapinnat-era2b-20260929.md kohta 3). Pysyy tilan
    // rajoissa [8,0,4]…[20,4,11], ei peitä liekkiä [14,0.9,4.9] eikä KEITTIO_HAHMOT-reittejä. ---
    // Tulisijan ympärys (vältetään liekki, 2 olemassa olevaa pataa ja huuvan runko x 12,5–15,5).
    { resepti: 'puukasa', paikka: [12.25, 0, 5.4], suunta: 20, pituus: 0.4, halkoja: 6, siemen: 401 },
    { resepti: 'hiillospihdit', paikka: [12.3, 0, 4.6], suunta: 100, pituus: 0.4 },
    { resepti: 'kattila', paikka: [15.65, 0, 5.1], suunta: -30, sade: 0.2, korkeus: 0.22 },
    {
      resepti: 'riippupata', paikka: [15.9, 2.0, 4.75], suunta: 0, ripustinKorkeus: 0.6, sade: 0.16, patakorkeus: 0.22,
    },
    { resepti: 'ruukku', paikka: [12.35, 0, 4.5], suunta: 0, sade: 0.1, korkeus: 0.18 },
    { resepti: 'ruukku', paikka: [15.65, 0, 4.45], suunta: 10, sade: 0.1, korkeus: 0.18 },

    // Orsi + yrttiniput katosta (z 4–7,2 kattopalikan alla) — orsi länsipuolella pöydän yllä, yrttiniput
    // hajautettu huuvan kapenevan rungon (x ~13,2–14,8 korkealla) ohi. HUOM: laatta-reseptin y-alue on
    // −paksuus…0 paikan y:stä, joten kattopalikan [14,4,5.6] paksuus 0.4 ALAPINTA on y = 3,6 (ei 4) —
    // kiinnityspisteet pidetty ≤ 3,5, jotta roikkuvat esineet jäävät katon ALLE eivätkä upoa siihen.
    { resepti: 'orsileivat', paikka: [10.0, 3.5, 4.5], suunta: 0, pituus: 1.4, leipia: 5, siemen: 301 },
    { resepti: 'yrttinippu', paikka: [9.4, 3.5, 4.55], suunta: -5, korkeus: 0.26 },
    { resepti: 'yrttinippu', paikka: [12.2, 3.5, 4.6], suunta: 0, korkeus: 0.32 },
    { resepti: 'yrttinippu', paikka: [15.7, 3.5, 4.65], suunta: 15, korkeus: 0.28 },
    { resepti: 'yrttinippu', paikka: [16.6, 3.45, 5.6], suunta: -10, korkeus: 0.3 },
    { resepti: 'yrttinippu', paikka: [11.3, 3.45, 6.4], suunta: 5, korkeus: 0.3 },

    // Länsipöytä katettuna (leipää, kala, veitsi, leikkuulauta, vati, ruukku, pullo, kynttilä).
    { resepti: 'leipa', paikka: [9.8, 0.8, 8.75], suunta: 10, sade: 0.1, korkeus: 0.08 },
    { resepti: 'leikkuulauta', paikka: [10.6, 0.8, 8.7], suunta: 15 },
    { resepti: 'veitsi', paikka: [10.75, 0.8, 8.85], suunta: 100 },
    { resepti: 'kala', paikka: [10.2, 0.8, 9.15], suunta: 200, pituus: 0.3 },
    { resepti: 'vati', paikka: [11.1, 0.8, 9.05], suunta: 0, sade: 0.15 },
    { resepti: 'ruukku', paikka: [9.55, 0.8, 9.25], suunta: 0, sade: 0.12, korkeus: 0.2 },
    { resepti: 'pullo', paikka: [11.3, 0.8, 8.75], suunta: 0, sade: 0.05, korkeus: 0.18 },
    { resepti: 'kynttilanjalka', paikka: [10.35, 0.8, 9.3], suunta: 0, korkeus: 0.17 },

    // Itäpöytä katettuna.
    { resepti: 'leipa', paikka: [16.2, 0.8, 8.3], suunta: -15, sade: 0.1, korkeus: 0.08 },
    { resepti: 'leikkuulauta', paikka: [17.0, 0.8, 8.25], suunta: -10 },
    { resepti: 'veitsi', paikka: [17.15, 0.8, 8.4], suunta: -80 },
    { resepti: 'kala', paikka: [16.6, 0.8, 8.65], suunta: 160, pituus: 0.28 },
    { resepti: 'vati', paikka: [17.7, 0.8, 8.5], suunta: 0, sade: 0.15 },
    { resepti: 'suolalaatikko', paikka: [15.95, 0.8, 8.75], suunta: 5 },
    { resepti: 'pullo', paikka: [17.9, 0.8, 8.15], suunta: 0, sade: 0.05, korkeus: 0.18 },
    { resepti: 'ruukku', paikka: [15.95, 0.8, 8.35], suunta: 0, sade: 0.12, korkeus: 0.2 },
    { resepti: 'leipa', paikka: [17.4, 0.8, 8.75], suunta: 200, sade: 0.09, korkeus: 0.075 },
    { resepti: 'kynttilanjalka', paikka: [18.05, 0.8, 8.85], suunta: 0, korkeus: 0.17 },

    // Hylly täynnä (3 tasoa, ks. hylly yllä: y ≈ 0,12 / 1,05 / 1,97; syvyys x 8,3–8,9).
    { resepti: 'ruukku', paikka: [8.65, 0.12, 8.4], suunta: 0, sade: 0.11, korkeus: 0.18 },
    { resepti: 'ruukku', paikka: [8.65, 0.12, 9.3], suunta: 0, sade: 0.1, korkeus: 0.2 },
    { resepti: 'pullo', paikka: [8.65, 0.12, 10.1], suunta: 0, sade: 0.05, korkeus: 0.18 },
    { resepti: 'vati', paikka: [8.65, 1.045, 8.35], suunta: 0, sade: 0.14 },
    { resepti: 'ruukku', paikka: [8.65, 1.045, 9.15], suunta: 0, sade: 0.11, korkeus: 0.19 },
    { resepti: 'pullo', paikka: [8.65, 1.045, 9.9], suunta: 0, sade: 0.055, korkeus: 0.2 },
    { resepti: 'suolalaatikko', paikka: [8.65, 1.045, 10.6], suunta: 0 },
    { resepti: 'ruukku', paikka: [8.65, 1.97, 8.5], suunta: 0, sade: 0.1, korkeus: 0.17 },
    { resepti: 'pullo', paikka: [8.65, 1.97, 9.3], suunta: 0, sade: 0.05, korkeus: 0.16 },
    { resepti: 'oljylamppu', paikka: [8.65, 1.97, 10.1], suunta: 0, sade: 0.06, korkeus: 0.09 },

    // Lattian astiat (etäällä vesipoikan reitistä [19.5,9.5]→[13.8,5.6] ja pöydistä/tynnyreistä).
    { resepti: 'saavi', paikka: [11.6, 0, 10.45], suunta: 0, sade: 0.4, korkeus: 0.45 },
    { resepti: 'vesisanko', paikka: [12.3, 0, 6.2], suunta: 40, sade: 0.15, korkeus: 0.22 },
    { resepti: 'kirnu', paikka: [18.0, 0, 10.6], suunta: 0, sade: 0.13, korkeus: 0.55 },
    {
      resepti: 'nauriskori', paikka: [15.6, 0, 10.7], suunta: 0, sade: 0.2, korkeus: 0.2, nauriita: 5, siemen: 501,
    },
    {
      resepti: 'nauriskori', paikka: [10.9, 0, 10.75], suunta: 30, sade: 0.18, korkeus: 0.18, nauriita: 4, siemen: 502,
    },
    { resepti: 'vesisanko', paikka: [19.3, 0, 7.2], suunta: -60, sade: 0.15, korkeus: 0.22 },
    { resepti: 'puukasa', paikka: [18.6, 0, 6.6], suunta: -20, pituus: 0.35, halkoja: 5, siemen: 402 },
    { resepti: 'huhmar', paikka: [8.6, 0, 6.9], suunta: 0, sade: 0.1, korkeus: 0.12 },
    { resepti: 'luuta', paikka: [19.5, 0, 9.3], suunta: -100, korkeus: 0.8 },
    { resepti: 'vesisanko', paikka: [9.9, 0, 8.05], suunta: 40, sade: 0.14, korkeus: 0.2 },
  ],
  // Voudin sinetin etsintä, vaihe 1 (käsikirjoitus kohta 4): kokki mainitsee voudin käynnin. Repliikki kuuluu vain
  // etsintään (Päätoimittaja hyväksyi 29.9.); kohde kokin pään yllä.
  etsinta: [
    { etsinta: 'voudin-sinetti', vaihe: 1, tyyppi: 'repliikki', hahmo: 'kokki', kohde: [13.1, 1.8, 6.1], sade: 1.2,
      repliikki: { aani: 'keittio-etsinta-0', id: 'kokki-sinetti', teksti: 'Vouti kävi maistamassa keittoa ja kiirehti sitten kappeliin ennen iltarukousta.' },
      pulu: 'Keitto ja iltarukous – vouti hoiti sekä vatsan että sielun. Kappeliin siis!',
      rivi: 'Kokki: vouti kiirehti kappeliin ennen iltarukousta.' },
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
    // Elävä linna (C, 29.9.): pöytien kynttilät (kärki = jalka + korkeus × 0,98 kuten kappelissa) ja öljylampun nokka
    // (fatabuurin lampun mitoin × 0,9) — iltahämärässä tulisijan lisäksi ainoat valot.
    { liekki: 'kynttila', paikka: [10.35, 0.967, 9.3], koko: 1, vaihe: 0.3 },
    { liekki: 'kynttila', paikka: [18.05, 0.967, 8.85], koko: 1, vaihe: 0.7 },
    { liekki: 'kynttila', paikka: [8.668, 2.062, 10.1], koko: 0.8, vaihe: 0.5 },
  ],
  kasikirjoitus: [
    { tee: 'pulu-lenna' },
    { tee: 'taulu' },
    { tee: 'kohta', n: 0 },
    { tee: 'repliikki', hahmo: 'kokki' },
    { tee: 'reaktio', hahmo: 'kokki' },
    { tee: 'kohta', n: 1 },
    { tee: 'repliikki', hahmo: 'vesipoika' },
    // 4.10. (Päätoimittaja, Siirtosepän havainto): apulaisen repliikit (ääni C v2) olivat vain hahmossa, eivät käsikirjoituksessa → natiivissa apulainen ei puhunut.
    // Natiivi soittaa vain käsikirjoituksen askeleet (Siirtoseppä 4.10.), joten -2 tarvitsee oman askeleen (n: 1); Pulun reaktio vastaa jauhosäkkiin.
    { tee: 'repliikki', hahmo: 'apulainen' },
    { tee: 'repliikki', hahmo: 'apulainen', n: 1 },
    { tee: 'reaktio', hahmo: 'apulainen' },
    { tee: 'kohta', n: 2 },
  ],
};
