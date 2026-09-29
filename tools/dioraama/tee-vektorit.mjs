// TESTIVEKTORIT DIORAAMAMOOTTORIN PUHTAALLE LOGIIKALLE.
//
// Ajaa js/dioraama/{kamera,heratys,ohjaaja}.js:n oikeina moduuleina ja
// kirjaa syötteet + tulokset tiedostoon tests/fixtures/dioraama/vektorit.json.
// C#-portti (Assets/Matkakirja/Linssit/Ydin/Dioraama/{Kameraliike,Heratys,
// Ohjaaja}.cs) toistaa SAMAT kaavat testissä Linssit-testit/Testit/
// DioraamaTestit.cs samasta tiedostosta kopioituna
// (Linssit-testit/kultaiset/dioraama-vektorit.json) ja vaatii saman
// tuloksen 1e-9 toleranssilla (speksi: docs/raportit/
// dioraama-rajapinnat-20260929.md kohta 4, tolerassi mainittu 1e-6 —
// tuotamme tarkemman 1e-9-pyöristyksen, joka alittaa senkin reilusti).
//
// Deterministinen: ei satunnaisuutta, ei kelloa, ei tiedostojärjestelmän
// ulkopuolisia riippuvuuksia. Sama ajo tuottaa aina saman tiedoston.
//
// Käyttö: node tools/dioraama/tee-vektorit.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { asentoSijainti, siirtymanKesto, siirtymaAsento, rajaaKierto, leijunta } from '../../js/dioraama/kamera.js';
import { tilanTaso, tilanTasoJaEdellinen, hahmonTila, aanenVoimakkuus } from '../../js/dioraama/heratys.js';
import { askeleenKesto, kasikirjoitusHetkella, puluLento } from '../../js/dioraama/ohjaaja.js';

const ULOS = new URL('../../tests/fixtures/dioraama/vektorit.json', import.meta.url);

// --- pyöristys 1e-9 tarkkuuteen (rekursiivisesti, koko rakenteen läpi) ---
function pyorista(arvo) {
  if (typeof arvo === 'number') {
    if (!Number.isFinite(arvo)) return arvo;
    const p = Number(arvo.toFixed(9));
    return p === 0 ? 0 : p; // normalisoi -0 → 0
  }
  if (Array.isArray(arvo)) return arvo.map(pyorista);
  if (arvo && typeof arvo === 'object') {
    return Object.fromEntries(Object.entries(arvo).map(([k, v]) => [k, pyorista(v)]));
  }
  return arvo;
}

/* ================================================================
 * PIENI ITSE TEHTY RAKENNUS (heratys- ja ohjaaja-osioiden yhteinen
 * pohja). Kolme tilaa: massa (ei kohdistettava), keittiö ja sali
 * (naapureina toisilleen). Kolme hahmoa, joista yksi (apulainen)
 * reittihahmo. rak.henkilot ja rak.aanet vastaavat KOOSTETTUA
 * rakennus.json-muotoa (ks. tulkinnat-kentän viimeinen rivi).
 * ================================================================ */

const HENKILOT = {
  'kokki-testi': {
    silmukat: {
      idle: { rivi: 0, ruudut: 4, fps: 6 },
      tyo: { rivi: 1, ruudut: 8, fps: 10 },
    },
  },
  'apulainen-testi': {
    silmukat: {
      idle: { rivi: 0, ruudut: 4, fps: 7 }, // pariton fps: fps/2 ei mene tasan (ei pyöristetä, ks. tulkinnat)
      kavely: { rivi: 3, ruudut: 6, fps: 8 },
    },
  },
  'vieras-testi': {
    silmukat: {
      idle: { rivi: 0, ruudut: 4, fps: 6 },
      puhe: { rivi: 2, ruudut: 4, fps: 8 },
    },
  },
};

const AANET = {
  testiaani: { tiedosto: 'testi.mp3', silmukka: false, voimakkuus: 1, kesto_s: 2.4, lisenssi: 'testi' },
};

const kokki = {
  id: 'kokki', henkilo: 'kokki-testi', paikka: [0.5, 0, 0.3], suunta: 90, peilattu: false,
  silmukka: 'tyo', heraa: 1, reitti: null,
  repliikit: [
    { id: 'kokki-r1', teksti: 'x'.repeat(44), aani: null }, // merkit=44 -> 0.06*44=2.64
    { id: 'kokki-r2', teksti: 'Tätä toista riviä ei käytetä (tulkinta: aina repliikit[0]).', aani: null },
  ],
  reaktio: { id: 'kokki-react', teksti: 'Kokin reaktio, ei käytetä äänellisenä.', aani: null },
};

const apulainen = {
  id: 'apulainen', henkilo: 'apulainen-testi', paikka: [1.2, 0, -0.4], suunta: 180, peilattu: false,
  silmukka: 'kavely', heraa: 2,
  reitti: { pisteet: [[1.2, 0, -0.4], [2.0, 0, -0.4], [2.0, 0, 0.6]], nopeus: 0.8, tauko: 1.0 },
  repliikit: [{ id: 'apulainen-r1', teksti: 'Apulaisen repliikki, ei tarvita tässä käsikirjoituksessa.', aani: null }],
  reaktio: { id: 'apulainen-react', teksti: 'y'.repeat(40), aani: 'testiaani' }, // ääni ohittaa tekstipohjaisen keston (kesto_s=2.4)
};

const vieras = {
  id: 'vieras', henkilo: 'vieras-testi', paikka: [-1, 0, 0.2], suunta: 0, peilattu: false,
  silmukka: 'puhe', heraa: 1, reitti: null,
  repliikit: [{ id: 'vieras-r1', teksti: 'Vieraan oma repliikki.', aani: null }],
  reaktio: { id: 'vieras-react', teksti: 'Vieraan reaktio.', aani: null },
};

// Käsikirjoitus (8 askelta) keittiölle: kattaa kaikki askeltyypit,
// mukaan lukien äänipohjainen kesto (askel 5) ja kaksi napautuksen
// katkaisemaa askelta (2 ja 5, ks. NAPAUTUKSET alempana).
const KASIKIRJOITUS = [
  { tee: 'pulu-lenna' },                  // 0: 1.8
  { tee: 'taulu' },                       // 1: 0.25
  { tee: 'kohta', n: 0 },                 // 2: max(3, 0.06*20)=3.0   -> napautus 4.1 katkaisee
  { tee: 'repliikki', hahmo: 'kokki' },   // 3: max(2, 0.06*44)=2.64
  { tee: 'odota', s: 1.5 },               // 4: 1.5
  { tee: 'reaktio', hahmo: 'apulainen' }, // 5: ääni -> 2.4           -> napautus 9.7 katkaisee
  { tee: 'kohta', n: 1 },                 // 6: max(3, 0.06*60)=3.6
  { tee: 'taulu' },                       // 7: 0.25
];

const YLEISKAMERA = { kohde: [2, 1, 0], atsimuutti: 180, korkeus: 35, etaisyys: 8, fov: 50, aukko: 0.1 };
const TAULU_TAYTE = (otsikko) => ({
  otsikko, tila: 'luonnos',
  kohdat: [
    { teksti: 'x'.repeat(20), lahde: 'testi' }, // merkit=20 -> kohta n=0
    { teksti: 'y'.repeat(60), lahde: 'testi' }, // merkit=60 -> kohta n=1
    { teksti: 'Kolmas kohta täytteeksi (TAULU vaatii kolme kohdat-alkiota).', lahde: 'testi' },
  ],
});

const massa = {
  id: 'massa', nimi: 'Massa', kohdistettava: false,
  rajat: { min: [0, 0, -1], max: [4, 3, 1] }, naapurit: [],
  kamera: YLEISKAMERA, pulu: { laskeutuminen: [2, 0, 0], taulupuoli: 'vasen' }, taulu: TAULU_TAYTE('Testilinna'),
  valot: [], palikat: [], hahmot: [], aanet: [], kasikirjoitus: [],
};
const keittio = {
  id: 'keittio', nimi: 'Keittiö', kohdistettava: true,
  rajat: { min: [0, 0, -1], max: [2, 2.5, 1] }, naapurit: ['sali'],
  kamera: { kohde: [1, 1, 0], atsimuutti: 200, korkeus: 25, etaisyys: 4, fov: 45, aukko: 0.3 },
  pulu: { laskeutuminen: [1, 0, 0.5], taulupuoli: 'vasen' }, taulu: TAULU_TAYTE('Keittiö'),
  valot: [], palikat: [], hahmot: [kokki, apulainen], aanet: [], kasikirjoitus: KASIKIRJOITUS,
};
const sali = {
  id: 'sali', nimi: 'Sali', kohdistettava: true,
  rajat: { min: [2, 0, -1], max: [4, 3, 1] }, naapurit: ['keittio'],
  kamera: { kohde: [3, 1, 0], atsimuutti: 160, korkeus: 20, etaisyys: 5, fov: 42, aukko: 0.25 },
  pulu: { laskeutuminen: [3, 0, 0.5], taulupuoli: 'oikea' }, taulu: TAULU_TAYTE('Sali'),
  valot: [], palikat: [], hahmot: [vieras], aanet: [], kasikirjoitus: [],
};

const RAK = { id: 'testilinna', nimi: 'Testilinna', tilat: [massa, keittio, sali], henkilot: HENKILOT, aanet: AANET };

/* ================================================================
 * 1. KAMERA: 5 asentoparia x t = 0, 0.1, ..., 1.0
 * ================================================================ */

const T_GRID = Array.from({ length: 11 }, (_, i) => i / 10);

const KAMERA_PARIT = [
  {
    // Puhdas atsimuutin kierto 350 -> 10 (kohde/etäisyys ennallaan): eristää kiertoero-logiikan.
    nimi: 'kierto-350-10',
    p0: { kohde: [0, 0, 0], atsimuutti: 350, korkeus: 20, etaisyys: 5, fov: 45, aukko: 0.2 },
    p1: { kohde: [0, 0, 0], atsimuutti: 10, korkeus: 20, etaisyys: 5, fov: 45, aukko: 0.2 },
  },
  {
    // Iso siirtymä: Δ riittävän suuri lyödäkseen kestokaton (3,8 s).
    nimi: 'iso-siirtyma',
    p0: { kohde: [0, 0, 0], atsimuutti: 0, korkeus: 10, etaisyys: 5, fov: 45, aukko: 0.1 },
    p1: { kohde: [30, 10, 20], atsimuutti: 300, korkeus: 40, etaisyys: 12, fov: 55, aukko: 0.5 },
  },
  {
    // Pieni siirtymä: Δ riittävän pieni osuakseen kestolattiaan (2,0 s) ilman että p0===p1.
    nimi: 'pieni-siirtyma',
    p0: { kohde: [5, 1, 2], atsimuutti: 40, korkeus: 15, etaisyys: 6, fov: 40, aukko: 0.15 },
    p1: { kohde: [5.1, 1.0, 2.05], atsimuutti: 42, korkeus: 15.5, etaisyys: 6.05, fov: 40, aukko: 0.15 },
  },
  {
    // Sama asento (p0 === p1 sisällöltään): Δ=0 tasan, ei liikettä, ei nostoa millään t:llä.
    nimi: 'sama-asento',
    p0: { kohde: [2, 0.5, -3], atsimuutti: 75, korkeus: 18, etaisyys: 7, fov: 38, aukko: 0.22 },
    p1: { kohde: [2, 0.5, -3], atsimuutti: 75, korkeus: 18, etaisyys: 7, fov: 38, aukko: 0.22 },
  },
  {
    // Tyypillinen siirtymä: kohde+atsimuutti+korkeus+fov+aukko kaikki muuttuvat, kesto ei osu kattoon eikä lattiaan.
    nimi: 'tyypillinen',
    p0: { kohde: [-3, 0.2, 4], atsimuutti: 200, korkeus: 22, etaisyys: 8, fov: 50, aukko: 0.35 },
    p1: { kohde: [1, 1.5, -2], atsimuutti: 260, korkeus: 12, etaisyys: 5.5, fov: 30, aukko: 0.05 },
  },
  {
    // ERÄ 2B: kaarilento, matka01 KYLLÄSTYY 1:een (|Δkohde| = 80 m > 60 m -jakaja) — huippu (t=0,5) saa
    // täyden KAAREN_NOUSU_MAX_ASTETTA (12°) nousun ja täyden 0,35-kertoimen etäisyyden pullistuman.
    nimi: 'kaari-kylla-60m',
    p0: { kohde: [0, 0, 0], atsimuutti: 0, korkeus: 20, etaisyys: 6, fov: 45, aukko: 0.2 },
    p1: { kohde: [80, 0, 0], atsimuutti: 90, korkeus: 20, etaisyys: 6, fov: 45, aukko: 0.2 },
  },
  {
    // ERÄ 2B: lyhyt kaarilento saman tilan sisällä (esim. kohdistuksen tarkennus) — matka01 pieni (10/60),
    // nousu/pullistuma vaimeaa, ei nykäystä. "keittiö → yleis" -tyyppinen siirtymä raportin lukuja varten.
    nimi: 'kaari-lyhyt-tila-sisalla',
    p0: { kohde: [1, 1, 0], atsimuutti: 200, korkeus: 25, etaisyys: 4, fov: 45, aukko: 0.3 }, // keittiön kamera
    p1: { kohde: [2, 1, 0], atsimuutti: 180, korkeus: 35, etaisyys: 8, fov: 50, aukko: 0.1 }, // yleiskamera (YLEISKAMERA)
  },
];

const kameraVektorit = KAMERA_PARIT.map(({ nimi, p0, p1 }) => ({
  nimi,
  p0,
  p1,
  kesto: siirtymanKesto(p0, p1),
  naytteet: T_GRID.map((t) => {
    const asento = siirtymaAsento(p0, p1, t);
    return { t, asento, sijainti: asentoSijainti(asento) };
  }),
}));

/* ================================================================
 * 2. HERÄTYS: 1 aikataulu x 12 hetkeä, kaikki tilat ja hahmot.
 * ================================================================ */

const AIKATAULU = [
  { hetki: 0, kohde: null, kesto: 0 },
  { hetki: 2, kohde: 'keittio', kesto: 3 },
  { hetki: 9, kohde: 'sali', kesto: 2.5 },
  { hetki: 15, kohde: null, kesto: 3 },
];

// Kattaa: alkutila (0,1), NOUSUn odotusikkuna (2,3), tarkka NOUSU-hetki
// keittiölle 2+0.6*3=3.8, vakaa taso (4,6), tarkka LASKU-hetki
// sali-tapahtumalle (9, keittiö laskee heti), tarkka NOUSU-hetki salille
// 9+0.6*2.5=10.5, vakaa taso (12), tarkka LASKU-hetki yleisnäkymään (15,
// sali laskee heti, keittiö EI muutu koska tavoite on jo sama), ja
// pitkän ajan vakaa lopputila (20).
const HETKET_HERATYS = [0, 1, 2, 3, 3.8, 4, 6, 9, 10.5, 12, 15, 20];

const heratysVektorit = {
  rakennus: { tilat: [massa, keittio, sali], henkilot: HENKILOT, aanet: AANET },
  aikataulu: AIKATAULU,
  hetket: HETKET_HERATYS.map((t) => ({
    t,
    tilat: RAK.tilat.map((tila) => {
      const { taso, alkoi } = tilanTaso(RAK, AIKATAULU, tila.id, t);
      const { edellinenTaso } = tilanTasoJaEdellinen(RAK, AIKATAULU, tila.id, t);
      return { tilaId: tila.id, taso, alkoi, edellinenTaso, aanenVoimakkuus: aanenVoimakkuus(taso, alkoi, edellinenTaso, t) };
    }),
    hahmot: RAK.tilat.flatMap((tila) => tila.hahmot.map((hahmo, hahmoIndeksi) => ({
      tilaId: tila.id,
      hahmoIndeksi,
      hahmoId: hahmo.id,
      ...hahmonTila(RAK, AIKATAULU, tila.id, hahmoIndeksi, t),
    }))),
  })),
};

/* ================================================================
 * 3. OHJAAJA: 1 käsikirjoitus (8 askelta) + 2 napautusta x 10 hetkeä.
 * ================================================================ */

const NAPAUTUKSET = [4.1, 9.7];
const kestot = KASIKIRJOITUS.map((askel) => askeleenKesto(askel, keittio, RAK));

// Luonnolliset (napauttamattomat) kumulatiiviset rajat likimain:
// [1.8, 2.05, ~5.05, ~7.69, ~9.19, ~11.59, ~15.19, ~15.44].
// Napautus 4.1 osuu askeleen 2 ikkunaan [2.05, ~5.05) -> katkaisee sen.
// Napautus 9.7 osuu askeleen 5 ikkunaan [~6.74, ~9.14+...] (katkaistun
// askeleen 2 jälkeen kertyvät ajat siirtyvät aiemmaksi) -> katkaisee sen.
// Hetket valittu keskelle kutakin vaihetta (ei liukulukurajoille, paitsi
// napautushetket itse, jotka ovat tarkkoja koska sama literaali 4.1/9.7
// virtaa sekä kyselyyn että katkaisulaskentaan).
const HETKET_OHJAAJA = [0, 0.9, 1.95, 4.1, 4.9, 7.5, 9.7, 11.5, 13.4, 15];

const ohjaajaVektorit = {
  askeleet: KASIKIRJOITUS,
  kestot,
  napautukset: NAPAUTUKSET,
  hetket: HETKET_OHJAAJA.map((t) => ({ t, ...kasikirjoitusHetkella(KASIKIRJOITUS, kestot, NAPAUTUKSET, t) })),
};

/* ================================================================
 * 4. PULU: 3 lentoa x 5 näytettä (t01 = 0, 0.25, 0.5, 0.75, 1).
 * ================================================================ */

const T01_GRID = [0, 0.25, 0.5, 0.75, 1];

const PULU_LENNOT = [
  { nimi: 'paikallaan', alku: [0, 0, 0], loppu: [0, 0, 0] },          // nollamatka: huippu = alku + (0,1,0)
  { nimi: 'pitka', alku: [-5, 0, -3], loppu: [6, 0, 4] },              // iso vaakamatka, sama korkeus
  { nimi: 'korkeusero', alku: [1, 0.2, 2], loppu: [1.5, 2.6, -1] },    // alku/loppu eri korkeudella
];

const puluVektorit = PULU_LENNOT.map(({ nimi, alku, loppu }) => ({
  nimi,
  alku,
  loppu,
  naytteet: T01_GRID.map((t01) => ({ t01, piste: puluLento(alku, loppu, t01) })),
}));

/* ================================================================
 * 5. RAJAUS (era 2b, kohta 1/5): rajaaKierto(perus, asento, yleisnakyma).
 * ================================================================ */

const RAJAUS_TAPAUKSET = [
  {
    // Ei kierto-kenttää perusasennolla, yleisnakyma=false -> OLETUS_KIERTO_TILA. Pelaaja pysyy rajojen
    // sisällä (atsimuutti-ero 20°<55°, korkeus 30∈[6,65], etaisyys 4,5∈[perus·0,55, perus·1,6]=[2,2;6,4]):
    // tulos = asento sellaisenaan.
    nimi: 'tila-oletus-sisalla',
    perus: { kohde: [1, 1, 0], atsimuutti: 200, korkeus: 25, etaisyys: 4, fov: 45, aukko: 0.3 },
    asento: { kohde: [1, 1, 0], atsimuutti: 220, korkeus: 30, etaisyys: 4.5, fov: 45, aukko: 0.3 },
    yleisnakyma: false,
  },
  {
    // Sama oletus, mutta pelaaja ylittää kaikki kolme rajaa reilusti -> kaikki kolme leikkautuvat rajaan.
    nimi: 'tila-oletus-ylitys',
    perus: { kohde: [1, 1, 0], atsimuutti: 200, korkeus: 25, etaisyys: 4, fov: 45, aukko: 0.3 },
    asento: { kohde: [1, 1, 0], atsimuutti: 350, korkeus: 90, etaisyys: 20, fov: 45, aukko: 0.3 },
    yleisnakyma: false,
  },
  {
    // Ei kierto-kenttää, yleisnakyma=true -> OLETUS_KIERTO_YLEIS: atsimuutti VAPAA (molemmat null, ei rajaa
    // vaikka ero on 160°), korkeus/etaisyys rajautuvat silti yleisnäkymän omiin rajoihin.
    nimi: 'yleis-oletus-atsimuutti-vapaa',
    perus: { kohde: [2, 1, 0], atsimuutti: 180, korkeus: 35, etaisyys: 8, fov: 50, aukko: 0.1 },
    asento: { kohde: [2, 1, 0], atsimuutti: 340, korkeus: 90, etaisyys: 20, fov: 50, aukko: 0.1 },
    yleisnakyma: true,
  },
  {
    // Perusasennolla OMA kierto-kenttä (kapeampi kuin oletus): tämä voittaa aina, yleisnakyma-lipusta riippumatta.
    nimi: 'oma-kierto-voittaa-oletuksen',
    perus: {
      kohde: [1, 1, 0], atsimuutti: 200, korkeus: 25, etaisyys: 4, fov: 45, aukko: 0.3,
      kierto: { atsimuuttiMin: -10, atsimuuttiMax: 10, korkeusMin: 20, korkeusMax: 30, etaisyysMin: 0.9, etaisyysMax: 1.1 },
    },
    asento: { kohde: [1, 1, 0], atsimuutti: 230, korkeus: 5, etaisyys: 10, fov: 45, aukko: 0.3 },
    yleisnakyma: true, // lippu on tosi, mutta perus.kierto ohittaa OLETUS_KIERTO_YLEISin kokonaan
  },
  {
    // Atsimuutti kiertyy 0/360-rajan yli JA ylittää rajan: perus 350°, pelaaja 350+80=430(≡70°) -> lyhin
    // ero (kiertoero) on +80°, joka leikkautuu tila-oletuksen +55°:aan -> tulos 350+55=405 (EI normalisoida
    // 0..360-välille, samaa periaatetta kuin siirtymaAsennon atsimuutti muuallakin tässä tiedostossa).
    nimi: 'atsimuutti-yli-360-rajan-ja-ylitys',
    perus: { kohde: [0, 0, 0], atsimuutti: 350, korkeus: 20, etaisyys: 5, fov: 45, aukko: 0.2 },
    asento: { kohde: [0, 0, 0], atsimuutti: 430, korkeus: 20, etaisyys: 5, fov: 45, aukko: 0.2 },
    yleisnakyma: false,
  },
];

const rajausVektorit = RAJAUS_TAPAUKSET.map(({ nimi, perus, asento, yleisnakyma }) => ({
  nimi,
  perus,
  asento,
  yleisnakyma,
  tulos: rajaaKierto(perus, asento, yleisnakyma),
}));

/* ================================================================
 * 6. LEIJUNTA (era 2b, kohta 5): leijunta(asento, t) — atsimuutti ±3°/24 s, korkeus ±1,5°/31 s.
 * ================================================================ */

const LEIJUNTA_T_GRID = [0, 6, 12, 18, 24, 31, 48, 62, 100];
const LEIJUNTA_ASENTO = { kohde: [1, 1, 0], atsimuutti: 200, korkeus: 25, etaisyys: 4, fov: 45, aukko: 0.3 };

const leijuntaVektorit = {
  asento: LEIJUNTA_ASENTO,
  naytteet: LEIJUNTA_T_GRID.map((t) => ({ t, tulos: leijunta(LEIJUNTA_ASENTO, t) })),
};

/* ================================================================
 * KOKOELMA JA KIRJOITUS.
 * ================================================================ */

const TULKINNAT = [
  { aihe: 'kiertoero(180°)', tulkinta: 'Normalisoidaan puoliavoimelle välille (-180, 180]: tasan 180 asteen ero palautuu arvona -180, ei +180.' },
  { aihe: "askeleenKesto: hahmolla useampi repliikki", tulkinta: "ASKEL {tee:'repliikki', hahmo} ei yksilöi rivi-indeksiä; käytetään aina hahmo.repliikit[0] (ensimmäinen rivi). 'reaktio' on yksiselitteinen." },
  { aihe: 'merkit-laskenta', tulkinta: 'merkit = teksti.length (UTF-16-yksiköt), sama kuin C#:n string.Length; ei erillistä graafeemi- tai koodipistelaskentaa.' },
  { aihe: 'fps/2 pyöristys (hahmonTila, taso 1)', tulkinta: 'Ei pyöristetä erikseen: fps/2 pidetään liukulukuna, vain lopullinen ruutuindeksi pyöristetään floor:lla.' },
  { aihe: 'hahmonTila: taso 2 ennen hahmon yksilöllistä heräämistä (t<herääminen)', tulkinta: 'Kohdellaan kuten tasoa 1 (idle, fps/2) siihen asti kun t >= herääminen; speksi ei erikseen määrittele tätä välitilaa.' },
  { aihe: 'naky ei-reittihahmoille', tulkinta: 'Aina true kaikilla tasoilla (0/1/2); speksi rajaa "näkyy vain tasolla 2" -säännön nimenomaan reittihahmoon (reitti != null).' },
  { aihe: 'yleisnäkymän fps-katto (6) soveltamisjärjestys', tulkinta: 'Sovelletaan VIIMEISENÄ, tason oman fps:n tai idle/2-fps:n jälkeen: fps = min(fps, 6).' },
  { aihe: 'edellinenTaso ensimmäisessä tapahtumassa (hetki 0)', tulkinta: 'Ei edeltäjää -> edellinenTaso = taso: ei liukua, äänenvoimakkuus on heti tavoitteessaan hetkestä 0 alkaen.' },
  { aihe: 'aanenVoimakkuus: mistä edellinenTaso saadaan', tulkinta: 'Speksi ei nimeä tähän julkista hakua (Heratys.AanenVoimakkuus ottaa sen valmiina parametrina). Lisätty heratys.js:ään export tilanTasoJaEdellinen(rak,aikataulu,tilaId,t) -> {taso,alkoi,edellinenTaso}, joka johtaa senkin samasta aikajanasta kuin tilanTaso. C#-puolen on lisättävä vastaava julkinen haku (esim. Heratys.TilanTasoJaEdellinen), koska muuten kolmannelle parametrille ei ole tilatonta lähdettä.' },
  { aihe: 'aikajanan ylilyönti (NOUSUn 0,6*kesto-viive ulottuisi seuraavan tapahtuman ohi)', tulkinta: 'Ei esiinny toimitetussa esimerkkiaikataulussa. Toteutus käsittelee tapahtumat aikataulun järjestyksessä ja pitää voimassa TAULUKON VIIMEISIMMÄN pisteen jonka aika <= t (ks. heratys.js:n aikajana()-kommentti).' },
  { aihe: 'viimeisinKohde (yleisnäkymän tunnistus fps-katolle)', tulkinta: 'Koko aikataulun (ei tilakohtainen) viimeinen tapahtuma jonka hetki <= t ratkaisee "yleisnäkymässä"-ehdon yhtenäisesti kaikille tiloille ja hahmoille samalla t:llä.' },
  { aihe: 'kasikirjoitusHetkella: askeleet-parametri', tulkinta: 'Speksin kohta 4 (JS) listaa parametrin askeleet, mutta kohdan 5 C#-allekirjoitus (Ohjaaja.KasikirjoitusHetkella) ei sisällä sitä (vain kestot, napautukset, t). JS säilyttää askeleet-parametrin nimen rajapintakuvauksen mukaisesti mutta EI käytä sen sisältöä (vain kestot.length ratkaisee askelmäärän) — C# voi jättää sen kokonaan pois samalla tuloksella.' },
  { aihe: 'kasikirjoitusHetkella: useampi napautus saman askeleen luonnollisessa ikkunassa', tulkinta: 'Napautukset kulutetaan aikajärjestyksessä yksi kerrallaan; vain ajallisesti ensimmäinen vaikuttaa kyseiseen askeleeseen, koska askel on jo päättynyt kun seuraava napautus käsitellään.' },
  { aihe: 'puluLento nollamatkalla (alku === loppu)', tulkinta: 'Huippu = alku + (0,1,0): nostotermi 0,3*|loppu-alku|+1 = 0,3*0+1 = 1 ei häviä. Testattu lennolla "paikallaan".' },
  { aihe: 'rak.henkilot / rak.aanet koostettu, ei raaka pankit-lähdedata', tulkinta: 'Heratys- ja Ohjaaja-funktiot olettavat, että niille annettu rak (Rakennus) on jo koostettu: rak.henkilot on id -> {silmukat} ja rak.aanet on id -> {kesto_s,...}, kuten rakennettu rakennus.json (speksin kohta 3) ja C#:n Rakennus.Henkilot-malli (kohta 5) — ei pelkkää js/dioraama/pankit/-lähdedataa sellaisenaan. Tämän tiedoston oma pieni "rakennus" koostaa nämä itse.' },
  { aihe: 'ERÄ 2B: siirtymaAsennon "nousu" (korkeus += nousu·sin(πs))', tulkinta: 'Speksi (dioraama-rajapinnat-era2b-20260929.md kohta 5) ei anna nousulle lukuarvoa. Tulkinta: nousu skaalataan matka01:llä kuten etäisyyden 0,35-kerroinkin (nousu = KAAREN_NOUSU_MAX_ASTETTA·matka01, vakio 12°), jotta lyhyt/paikallinen siirtymä ei nykäise kameraa ylös mutta tilasta toiseen -lento kaartaa selvästi. Kirjattu raporttiin, odottaa omistajan/Fablen vahvistusta.' },
  { aihe: 'ERÄ 2B: rajaaKierto(perus, asento, yleisnakyma) — allekirjoitus', tulkinta: 'Speksin kohta 5 kirjoittaa kutsun kaksiargumenttisena "RajaaKierto(perus, asento)" (rajat luetaan perus.kierrosta). Kolmas parametri yleisnakyma (oletus false) tarvitaan, koska perus.kierto voi olla null (lähteessä ei kierto-kenttää) — silloin funktio ei muuten tietäisi, kumpaa oletusta (OLETUS_KIERTO_TILA/OLETUS_KIERTO_YLEIS) käyttää. Sama ratkaisu C#:ssa (Kameraliike.RajaaKierto).' },
  { aihe: 'rajaaKierto: atsimuuttia ei normalisoida 0..360-välille', tulkinta: 'perus.atsimuutti + rajattu kiertoero voi olla alle 0 tai yli 360 (esim. 350+55=405) — sama käytäntö kuin siirtymaAsennon atsimuutissa muualla tässä tiedostossa (kulma kulkee trigonometrian läpi, joka on jaksollinen; wrappaus ei muuttaisi lopputulosta mutta veisi tarkkuutta pois testivektorista).' },
];

const MUOTO = {
  yleista: 'Kaikki liukuluvut pyöristetty 1e-9 tarkkuuteen (toleranssi speksissä 1e-6, tämä on tiukempi). '
    + 'Kulmat asteina, aika sekunteina, vektorit [x,y,z]-taulukkoina (kohta 0: +X itä, +Y ylös, +Z etelä).',
  kamera: 'kamera[i] = { nimi, p0: ASENTO, p1: ASENTO, kesto: siirtymanKesto(p0,p1) [s, vakio parille], '
    + 'naytteet: [{ t, asento: siirtymaAsento(p0,p1,t), sijainti: asentoSijainti(asento) }] }. naytteet[j].t = j/10, j=0..10.',
  heratys: 'heratys.rakennus = { tilat:[TILA,...], henkilot, aanet } (koostettu muoto). heratys.aikataulu = kamera-aikataulu '
    + '[{hetki,kohde,kesto}]. heratys.hetket[k] = { t, tilat: [{ tilaId, taso, alkoi, edellinenTaso, aanenVoimakkuus }] '
    + '(yksi rivi jokaiselle rak.tilat-alkiolle, myös massa), hahmot: [{ tilaId, hahmoIndeksi, hahmoId, naky, silmukka, ruutu }] '
    + '(yksi rivi jokaiselle hahmolle jokaisessa tilassa, indeksi hahmon paikka SEN OMAN tilansa hahmot-listassa) }.',
  ohjaaja: 'ohjaaja.askeleet = ASKEL[8] (= keittio.kasikirjoitus rakennuksessa). ohjaaja.kestot[i] = askeleenKesto(askeleet[i], keittioTila, rak). '
    + 'ohjaaja.napautukset = [4.1, 9.7] (absoluuttisia hetkiä). ohjaaja.hetket[k] = { t, indeksi, alku, paikallinen, valmis } '
    + '= kasikirjoitusHetkella(askeleet, kestot, napautukset, t).',
  pulu: 'pulu[i] = { nimi, alku:[x,y,z], loppu:[x,y,z], naytteet: [{ t01, piste: puluLento(alku,loppu,t01) }] }. '
    + 't01 ∈ {0, 0.25, 0.5, 0.75, 1}.',
  rajaus: 'rajaus[i] = { nimi, perus: ASENTO (voi sisältää kierto-kentän), asento: ASENTO (pelaajan raaka, '
    + 'rajaamaton), yleisnakyma: bool, tulos: rajaaKierto(perus,asento,yleisnakyma) }. Era 2b, kohta 1/5.',
  leijunta: 'leijunta = { asento: ASENTO, naytteet: [{ t, tulos: leijunta(asento,t) }] }. Era 2b, kohta 5.',
};

const ULOSTULO = {
  $kuvaus: 'Dioraamamoottorin puhtaan logiikan testivektorit (tools/dioraama/tee-vektorit.mjs, älä muokkaa käsin — '
    + 'aja skripti uudelleen). JS-testi tests/dioraama-logiikka.test.mjs ja C#-testi Linssit-testit/Testit/DioraamaTestit.cs '
    + '(tämän tiedoston kopio Linssit-testit/kultaiset/dioraama-vektorit.json) ajavat samat vektorit js/dioraama/{kamera,heratys,'
    + 'ohjaaja}.js:n ja Kameraliike/Heratys/Ohjaaja-luokkien kaavojen pariteetin varmistamiseksi (docs/raportit/'
    + 'dioraama-rajapinnat-20260929.md kohta 4; kamera/rajaus/leijunta era 2b:n kaarilento+kierto kohdat '
    + 'dioraama-rajapinnat-era2b-20260929.md kohdat 1 ja 5).',
  tarkkuus: 1e-9,
  muoto: MUOTO,
  tulkinnat: TULKINNAT,
  kamera: kameraVektorit,
  heratys: heratysVektorit,
  ohjaaja: ohjaajaVektorit,
  pulu: puluVektorit,
  rajaus: rajausVektorit,
  leijunta: leijuntaVektorit,
};

mkdirSync(dirname(fileURLToPath(ULOS)), { recursive: true });
writeFileSync(ULOS, JSON.stringify(pyorista(ULOSTULO), null, 1) + '\n');
console.log(
  `vektorit.json: kamera ${kameraVektorit.length} paria x ${T_GRID.length} t, `
  + `heratys ${HETKET_HERATYS.length} hetkeä (${RAK.tilat.length} tilaa), `
  + `ohjaaja ${KASIKIRJOITUS.length} askelta x ${HETKET_OHJAAJA.length} hetkeä, `
  + `pulu ${puluVektorit.length} lentoa x ${T01_GRID.length} näytettä, `
  + `rajaus ${rajausVektorit.length} tapausta, leijunta ${leijuntaVektorit.naytteet.length} näytettä.`,
);
