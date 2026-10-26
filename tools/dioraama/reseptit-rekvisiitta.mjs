// DIORAAMAN REKVISIITTARESEPTIT (Linnanrakentaja 29.9.2026, ali-agentti P3, erä 2b): keittiön pienesineet —
// astiat, ruoka, tekstiilit ja valaisimet. Speksi: docs/raportit/dioraama-rajapinnat-era2b-20260929.md
// kohta 3, era1-speksin kohta 2 (paikallinen kehys) ja 3b (RESEPTIT-rajapinta). Sisarmoduulit (EI kosketa):
// reseptit-rakenne.mjs, reseptit-maasto.mjs, reseptit-kalusteet.mjs.
//
// Paikallinen kehys (u, y, w) oikeakätisenä kuten muissa resepteissä: kärjet vastapäivään ulkoa katsottuna
// ((b − a) × (c − a) osoittaa ulos). Origo: LATTIALLA/PÖYDÄLLÄ LEPÄÄVÄT esineet — pohjan keskipiste y = 0,
// kuten reseptit-kalusteet.mjs:ssä. KATOSTA/ORRELTA ROIKKUVAT esineet (yrttinippu, riippupata) — origo on
// KIINNITYSPISTE y = 0, geometria jatkuu ALASPÄIN (negatiivinen y); orsileivat on vaakasuora tanko, origo
// tangon keskipiste. Poikkeamat dokumentoitu kunkin reseptin JSDocissa.
//
// Kynttilänjalka ja öljylamppu palauttavat kolmiotaulukon LISÄKSI omana ominaisuutena (ei Kolmio-alkio,
// ei siis näy for..of/spreadissa) `.valo = { paikka_paikallinen: [u,y,w], sade, voima, vari }` — paikallinen,
// ennen suunta/paikka-muunnosta. PÄIVITYS (koordinaattorin ohje 29.9., era2b kohta 3): reseptit.mjs:n
// sijoita() muuntaa paikka_paikallisen maailmaan ja rakenna.mjs kerää sen tilan valot-listan jatkoksi
// rakennus.json:iin (lahde: 'rekvisiitta', lepatus 0,2/0,1) — ks. molemmat tiedostot.
import {
  laatikko, kaaripiste, vaippa, rengas, kolmio, mulberry32,
} from './reseptit-apu.mjs';

const RAD = Math.PI / 180;
const KAIKKI = (rooli) => ({ yla: rooli, ala: rooli, etu: rooli, taka: rooli, vasen: rooli, oikea: rooli });

/* ==================== Yleiset jäykät muunnokset (paikalliset — eivät jaettuja kalusteet.mjs:n kanssa) ==================== */

/** Siirto: lisää [du, dy, dw] kaikkiin kärkiin (normaalit eivät muutu jäykässä siirrossa). */
function siirra(kolmiot, [du, dy, dw]) {
  const p = (v) => [v[0] + du, v[1] + dy, v[2] + dw];
  return kolmiot.map((t) => ({ ...t, p: t.p.map(p) }));
}

/** Kierto pystyakselin (y) ympäri kompassiasteina (sama suunta-käsite kuin reseptit.mjs:n sijoita():ssa). */
function kierraY(kolmiot, asteet) {
  const k = asteet * RAD; const c = Math.cos(k); const s = Math.sin(k);
  const rot = (v) => [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c];
  return kolmiot.map((t) => {
    const nt = { ...t, p: t.p.map(rot) };
    if (t.n) nt.n = t.n.map(rot);
    return nt;
  });
}

/** Kierto u-akselin ympäri (y-w-tasossa) asteina — esim. vaaka-arven kaartaminen pystyyn. */
function kierraU(kolmiot, asteet) {
  const k = asteet * RAD; const c = Math.cos(k); const s = Math.sin(k);
  const rot = (v) => [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
  return kolmiot.map((t) => {
    const nt = { ...t, p: t.p.map(rot) };
    if (t.n) nt.n = t.n.map(rot);
    return nt;
  });
}

/** Kierto w-akselin ympäri (u-y-tasossa) asteina — esim. kahvan/varren kallistus. */
function kierraW(kolmiot, asteet) {
  const k = asteet * RAD; const c = Math.cos(k); const s = Math.sin(k);
  const rot = (v) => [v[0] * c - v[1] * s, v[0] * s + v[1] * c, v[2]];
  return kolmiot.map((t) => {
    const nt = { ...t, p: t.p.map(rot) };
    if (t.n) nt.n = t.n.map(rot);
    return nt;
  });
}

/** "Makuulle" u-akselin suuntaiseksi: pystyakseli (y) osoittaa u:hun (3-kierto (u,y,w)→(y,w,u); parillinen
 *  permutaatio, kätisyys säilyy). Pystyssä sorvatusta kappaleesta tulee vaakasuora (kala, halko, tanko). */
function makuulleU(kolmiot) {
  const map = (v) => [v[1], v[2], v[0]];
  return kolmiot.map((t) => {
    const nt = { ...t, p: t.p.map(map) };
    if (t.n) nt.n = t.n.map(map);
    return nt;
  });
}

/** Epäyhtenäinen skaalaus (su, sy, sw > 0): paikat suoraan, normaalit käänteisluvuilla + normalisointi —
 *  pyöreästä rungosta soikea lautanen/laatikko (esim. leikkuulauta). */
function skaalaa(kolmiot, [su, sy, sw]) {
  const p = (v) => [v[0] * su, v[1] * sy, v[2] * sw];
  const n = (v) => {
    const r = [v[0] / su, v[1] / sy, v[2] / sw];
    const l = Math.hypot(r[0], r[1], r[2]) || 1;
    return [r[0] / l, r[1] / l, r[2] / l];
  };
  return kolmiot.map((t) => {
    const nt = { ...t, p: t.p.map(p) };
    if (t.n) nt.n = t.n.map(n);
    return nt;
  });
}

/* ==================== Sorvattu vaippa + apurakenteet ==================== */

/** 2× kolmion pinta-ala (ristitulon pituus) — degeneroituneen suodatukseen (sama kaava kuin testeissä). */
function ala(t) {
  const [a, b, c] = t.p;
  const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]]; const e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  return Math.hypot(e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]);
}

/**
 * Pyörähdyskappaleen vaippa profiilista [[r, y], …] — SAMA kaava kuin reseptit-kalusteet.mjs:n sorvi
 * (uudelleen tässä, koska ei ole eksportattu sisarmoduulista). VAATIMUS: y kasvaa monotonisesti profiilin
 * indeksin mukana (kuten tynnyri/pata-esimerkeissä) — muuten ulospäin osoittavat normaalit kääntyvät
 * väärin päin. Katosta roikkuvat kartiomaiset muodot: rakenna nousevana ja käännä lopuksi kierraU(…, 180)
 * (jäykkä 180° kierto, säilyttää kätisyyden — ks. yrttinippu). sisa = true: sisäpinta (käänteinen normaali
 * + kiertosuunta), esim. huhmaren/padan sisäkylki.
 */
function sorvi(profiili, segmentit, rooli, { sisa = false } = {}) {
  const n = profiili.length; const tulos = [];
  const normaali = (i, k) => {
    const a = profiili[Math.max(0, i - 1)]; const b = profiili[Math.min(n - 1, i + 1)];
    const dr = b[0] - a[0]; const dy = b[1] - a[1]; const l = Math.hypot(dr, dy) || 1;
    const nr = dy / l; const ny = -dr / l; const s = sisa ? -1 : 1;
    return [s * nr * Math.sin(k * RAD), s * ny, s * nr * Math.cos(k * RAD)];
  };
  const piste = (i, j) => {
    const k = (360 * j) / segmentit; const r = profiili[i][0];
    return [r * Math.sin(k * RAD), profiili[i][1], r * Math.cos(k * RAD)];
  };
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < segmentit; j++) {
      const ka = (360 * j) / segmentit; const kb = (360 * (j + 1)) / segmentit;
      const a0 = piste(i, j); const b0 = piste(i, j + 1); const b1 = piste(i + 1, j + 1); const a1 = piste(i + 1, j);
      const na0 = normaali(i, ka); const nb0 = normaali(i, kb); const nb1 = normaali(i + 1, kb); const na1 = normaali(i + 1, ka);
      const osat = [kolmio(a0, b0, b1, rooli, na0, nb0, nb1), kolmio(a0, b1, a1, rooli, na0, nb1, na1)];
      for (const t of osat) {
        if (ala(t) < 1e-9) continue;
        tulos.push(sisa ? { p: [t.p[0], t.p[2], t.p[1]], n: [t.n[0], t.n[2], t.n[1]], rooli } : t);
      }
    }
  }
  return tulos;
}

/**
 * Kaareva tanko (esim. sangon/padan kahva): `askelia` lyhyttä suoraa palaa ympyrän kaarella säde r,
 * korkeus y (vaakatasossa, u-w), kompassikulmasta k0 k1:een, keskipiste u=0,w=0. paksuus = poikkileikkauksen
 * neliön sivu (m). Suora palikka rakennetaan u-akselille ja kierretään tangentin suuntaan (kierraY(km)) —
 * tarkistettu käsin: kaaripiste(k)-derivaatta ∝ (cos k, −sin k), joka vastaa kierraY:n kuvausta u-akselille.
 */
function kaariTanko(r, y, k0, k1, paksuus, rooli, askelia = 8) {
  const kolmiot = [];
  const piste = (k) => kaaripiste([0, 0], r, k, y);
  for (let i = 0; i < askelia; i++) {
    const ka = k0 + ((k1 - k0) * i) / askelia; const kb = k0 + ((k1 - k0) * (i + 1)) / askelia; const km = (ka + kb) / 2;
    const a = piste(ka); const b = piste(kb);
    const pituus = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    const keskiP = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
    let pala = laatikko({
      u0: -pituus / 2, u1: pituus / 2, y0: -paksuus / 2, y1: paksuus / 2, w0: -paksuus / 2, w1: paksuus / 2,
    }, KAIKKI(rooli));
    pala = siirra(kierraY(pala, km), keskiP);
    kolmiot.push(...pala);
  }
  return kolmiot;
}

/**
 * Pystysuora pyöristetty runko (segmentit-kulmio, kansi+pohja): peruskappale soikeille/laatikkomaisille
 * esineille skaalaa():n kanssa (esim. leikkuulauta, suolalaatikko). `viiste` (m) pyöristää ylä/ala-reunan
 * pienellä profiililla (r ja y SAMASSA yksikössä — anna todelliset metrit, skaalaa vasta lopuksi).
 */
function pyorykka(r, y0, y1, segmentit, rooli, viiste = 0) {
  const v = Math.min(viiste, (y1 - y0) / 2, r * 0.6);
  const profiili = v > 1e-6
    ? [[r - v, y0], [r, y0 + v], [r, y1 - v], [r - v, y1]]
    : [[r, y0], [r, y1]];
  return [
    ...sorvi(profiili, segmentit, rooli),
    ...rengas({ rUlko: r - v, y: y1, segmentit, ylos: true, rooli }),
    ...rengas({ rUlko: r - v, y: y0, segmentit, ylos: false, rooli }),
  ];
}

/** Kiinnittää valotiedon (kynttilänjalka, öljylamppu) kolmiotaulukkoon omana ominaisuutena — ks. tiedoston
 *  alun kommentti. Ei Kolmio-alkio, ei näy for..of/spreadissa. */
function asetaValo(kolmiot, paikkaPaikallinen, sade, voima, vari) {
  kolmiot.valo = { paikka_paikallinen: paikkaPaikallinen, sade, voima, vari };
  return kolmiot;
}

/* ==================== Katosta/orrelta roikkuvat ==================== */

/**
 * Orsi + reikäleivät: vaakasuora tanko u-akselilla ja `leipia` rengasleipää ripustettuna epätasaisin
 * välein (siemen, deterministinen). Origo = tangon keskipiste (kiinnitys palkkiin/orteen).
 */
export function orsileivat({
  pituus = 1.2, leipia = 4, sadeLeipa = 0.09, siemen = 1,
} = {}) {
  const kolmiot = [...laatikko({
    u0: -pituus / 2, u1: pituus / 2, y0: -0.02, y1: 0.02, w0: -0.02, w1: 0.02,
  }, KAIKKI('tanko'))];
  const rng = mulberry32(siemen >>> 0);
  const rReika = sadeLeipa * 0.35; const paksuus = sadeLeipa * 0.35;
  // segmentit 8 (ei 10): rengas/vaippa × 4 × 8 segmenttiä = 64 kolmiota/leipä — pitää leipia ≤ 6:lla
  // koko reseptin ≤ 400 kolmion budjetissa (5 × 64 + tanko 12 = 332).
  for (let i = 0; i < leipia; i++) {
    let rengasLeipa = [
      ...vaippa({ r: sadeLeipa, y0: -paksuus / 2, y1: paksuus / 2, segmentit: 8, ulos: true, rooli: 'leipa' }),
      ...vaippa({ r: rReika, y0: -paksuus / 2, y1: paksuus / 2, segmentit: 8, ulos: false, rooli: 'leipa' }),
      ...rengas({ rSisa: rReika, rUlko: sadeLeipa, y: paksuus / 2, segmentit: 8, ylos: true, rooli: 'leipa' }),
      ...rengas({ rSisa: rReika, rUlko: sadeLeipa, y: -paksuus / 2, segmentit: 8, ylos: false, rooli: 'leipa' }),
    ];
    rengasLeipa = makuulleU(rengasLeipa); // reiän akseli pystystä (y) tankoon (u:hun)
    rengasLeipa = kierraY(rengasLeipa, (rng() - 0.5) * 40); // pieni satunnainen kierto (roikkuu vinosti)
    const u = (rng() - 0.5) * (pituus - sadeLeipa * 2.4);
    rengasLeipa = siirra(rengasLeipa, [u, -sadeLeipa * (0.9 + rng() * 0.15), (rng() - 0.5) * 0.02]);
    kolmiot.push(...rengasLeipa);
  }
  return kolmiot;
}

/** Yrttinippu: sidottu kimppu roikkumassa, kärki (sidos) ylhäällä ohuena, levenee alaspäin. Rakennettu
 *  NOUSEVANA (y 0 → korkeus, ks. sorvi():n vaatimus) ja käännetty lopuksi kierraU(180) roikkumaan alaspäin —
 *  origo pysyy sidontapisteessä (180° kierto ei siirrä y = 0:aa). */
export function yrttinippu({ korkeus = 0.3, sade = 0.06, koko = 1 } = {}) {
  const profiili = [
    [0.006, 0], [0.01, korkeus * 0.12], [sade * 0.55, korkeus * 0.45], [sade, korkeus * 0.85], [sade * 0.85, korkeus],
  ];
  let k = sorvi(profiili, 8, 'kimppu');
  k.push(...rengas({ rUlko: sade * 0.85, y: korkeus, segmentit: 8, ylos: true, rooli: 'kimppu' }));
  k.push(...vaippa({ r: 0.012, y0: korkeus * 0.06, y1: korkeus * 0.16, segmentit: 8, rooli: 'sidos' }));
  k = kierraU(k, 180);
  return skaalaa(k, [koko, koko, koko]);
}

/** Riippupata: suora tanko (ketjun yksinkertaistus — ehdotus raportissa) kiinnityspisteestä alas + pata
 *  tangon päässä. Origo = kiinnityspiste (y = 0, katossa/orrella). */
export function riippupata({ ripustinKorkeus = 0.5, sade = 0.16, patakorkeus = 0.22 } = {}) {
  const kolmiot = [...vaippa({ r: 0.012, y0: -ripustinKorkeus, y1: 0, segmentit: 8, rooli: 'tanko' })];
  kolmiot.push(...rengas({ rSisa: 0.02, rUlko: 0.045, y: 0, segmentit: 8, ylos: true, rooli: 'tanko' }));
  const profiili = [[0, 0], [sade * 0.85, patakorkeus * 0.2], [sade, patakorkeus * 0.6], [sade * 0.9, patakorkeus]];
  let pata = sorvi(profiili, 12, 'pata');
  pata.push(...rengas({ rUlko: sade * 0.9, y: patakorkeus, segmentit: 12, ylos: true, rooli: 'pata' }));
  pata = siirra(pata, [0, -ripustinKorkeus - patakorkeus, 0]);
  kolmiot.push(...pata);
  return kolmiot;
}

/* ==================== Astiat ja pienesineet (origo = pohjan keskipiste, y = 0) ==================== */

/** Kattila (kupari) + sanka: bail-kahva rakennettu vaaka-arvena (kaariTanko k 90…270, u±sade) ja
 *  kierraU(90):llä pystyyn (u,y,w)→(u,−w,y) — päät pysyvät reunalla, kaari nousee ylös. */
export function kattila({ sade = 0.2, korkeus = 0.22, koko = 1 } = {}) {
  const profiili = [[0, 0], [sade * 0.9, korkeus * 0.15], [sade, korkeus * 0.55], [sade * 0.82, korkeus]];
  const k = sorvi(profiili, 14, 'runko');
  k.push(...rengas({ rUlko: sade * 0.82, y: korkeus, segmentit: 14, ylos: true, rooli: 'runko' }));
  const sanka = siirra(kierraU(kaariTanko(sade * 0.82, 0, 90, 270, 0.012, 'sanka', 8), 90), [0, korkeus, 0]);
  k.push(...sanka);
  return skaalaa(k, [koko, koko, koko]);
}

/** Kauha (puu): pieni kulho + kahva, joka nostetaan vaakaan (makuulleU) ja kallistetaan hieman ylös
 *  (kierraW — u-y-tason kierto, kasvattaa y:tä u:n funktiona). */
export function kauha({ koko = 1 } = {}) {
  const profiili = [[0, 0], [0.028, 0.012], [0.045, 0.03], [0.048, 0.045], [0.03, 0.05]];
  const kulho = sorvi(profiili, 10, 'puu');
  kulho.push(...rengas({ rUlko: 0.03, y: 0.05, segmentit: 10, ylos: true, rooli: 'puu' }));
  let varsi = makuulleU(vaippa({ r: 0.01, y0: 0, y1: 0.22, segmentit: 8, rooli: 'puu' }));
  varsi = kierraW(varsi, 18);
  varsi = siirra(varsi, [0.045, 0.045, 0]);
  return skaalaa([...kulho, ...varsi], [koko, koko, koko]);
}

/** Leikkuulauta: pyöristetty (8-kulmio) laatta, venytetty soikeaksi/laatikkomaiseksi skaalaa():lla. */
export function leikkuulauta({ leveys = 0.32, syvyys = 0.22, paksuus = 0.02 } = {}) {
  const r = (leveys + syvyys) / 4;
  const runko = pyorykka(r, 0, paksuus, 8, 'puu', 0.006);
  return skaalaa(runko, [leveys / (2 * r), 1, syvyys / (2 * r)]);
}

/** Veitsi: kapeneva terä (2 laatikkoa) + kahva, makaa pöydällä terä +u-suuntaan. */
export function veitsi({ pituus = 0.24, koko = 1 } = {}) {
  const teraPit = pituus * 0.58; const kahvaPit = pituus - teraPit;
  const tera1 = laatikko({ u0: 0, u1: teraPit * 0.7, y0: -0.003, y1: 0.003, w0: -0.018, w1: 0.018 }, KAIKKI('tera'));
  const tera2 = siirra(
    laatikko({ u0: 0, u1: teraPit * 0.3, y0: -0.0015, y1: 0.0015, w0: -0.01, w1: 0.01 }, KAIKKI('tera')),
    [teraPit * 0.7, 0, 0],
  );
  const kahva = laatikko({ u0: -kahvaPit, u1: 0, y0: -0.009, y1: 0.009, w0: -0.012, w1: 0.012 }, KAIKKI('kahva'));
  return skaalaa([...tera1, ...tera2, ...kahva], [koko, koko, koko]);
}

/** Kala: kapeneva (nokka+pyrstö) sorvattu runko, nostettu vaakaan (makuulleU) ja keskitetty u-akselille. */
export function kala({ pituus = 0.32, koko = 1 } = {}) {
  const nOsat = 6; const sadeMax = pituus * 0.14;
  const profiili = [];
  for (let i = 0; i <= nOsat; i++) {
    const t = i / nOsat;
    profiili.push([sadeMax * (Math.sin(Math.PI * t) ** 0.6) * (1 - 0.15 * t), t * pituus]);
  }
  let k = makuulleU(sorvi(profiili, 10, 'kala'));
  k = siirra(k, [-pituus / 2, sadeMax * 0.5, 0]);
  return skaalaa(k, [koko, koko, koko]);
}

/** Leipä: pyöreä maalaisleipä, matala kupu. */
export function leipa({ sade = 0.11, korkeus = 0.09, koko = 1 } = {}) {
  const profiili = [[sade * 0.75, 0], [sade, korkeus * 0.35], [sade * 0.55, korkeus]];
  const k = sorvi(profiili, 12, 'leipa');
  k.push(...rengas({ rUlko: sade * 0.75, y: 0, segmentit: 12, ylos: false, rooli: 'leipa' }));
  return skaalaa(k, [koko, koko, koko]);
}

/** Nauriskori: kori (olki) + `nauriita` naurista satunnaisin paikoin ja koin (siemen, deterministinen). */
export function nauriskori({
  sade = 0.22, korkeus = 0.22, nauriita = 5, siemen = 1,
} = {}) {
  const profiili = [[sade * 0.7, 0], [sade * 0.95, korkeus * 0.85], [sade, korkeus]];
  const kori = sorvi(profiili, 12, 'kori');
  kori.push(...rengas({ rUlko: sade * 0.7, y: 0, segmentit: 12, ylos: false, rooli: 'kori' }));
  const rng = mulberry32(siemen >>> 0);
  const kolmiot = [...kori];
  for (let i = 0; i < nauriita; i++) {
    const rN = 0.04 + rng() * 0.015;
    const profN = [[0.006, 0], [rN, rN * 0.7], [rN * 0.9, rN * 1.6], [0.008, rN * 2.1]];
    let nauris = sorvi(profN, 8, 'nauris');
    const kulma = rng() * 360; const rPos = rng() * sade * 0.55;
    nauris = siirra(nauris, [rPos * Math.sin(kulma * RAD), korkeus * 0.9, rPos * Math.cos(kulma * RAD)]);
    kolmiot.push(...nauris);
  }
  return kolmiot;
}

/** Puukasa: `halkoja` pinottua halkoa (pystyssä sorvattu, makuulleU vaakaan), satunnaisin mitoin/paikoin. */
export function puukasa({ pituus = 0.4, halkoja = 7, siemen = 1 } = {}) {
  const rng = mulberry32(siemen >>> 0);
  const kolmiot = [];
  for (let i = 0; i < halkoja; i++) {
    const r = 0.045 + rng() * 0.018; const pit = pituus * (0.85 + rng() * 0.3);
    let halko = [
      ...vaippa({ r, y0: 0, y1: pit, segmentit: 8, rooli: 'puu' }),
      ...rengas({ rUlko: r, y: 0, segmentit: 8, ylos: false, rooli: 'puu' }),
      ...rengas({ rUlko: r, y: pit, segmentit: 8, ylos: true, rooli: 'puu' }),
    ];
    halko = makuulleU(halko);
    halko = kierraY(halko, (rng() - 0.5) * 20);
    const rivi = Math.floor(i / 3); const sarake = i % 3;
    halko = siirra(halko, [(sarake - 1) * 0.09 + (rng() - 0.5) * 0.03, r + rivi * 0.09, (rng() - 0.5) * 0.05]);
    kolmiot.push(...halko);
  }
  return kolmiot;
}

/** Vesisanko (puu + metallivanteet + kahva): kahva samalla bail-tekniikalla kuin kattilassa. */
export function vesisanko({ sade = 0.16, korkeus = 0.24 } = {}) {
  const r = (t) => sade * (0.82 + 0.18 * t);
  const profiili = [0, 0.5, 1].map((t) => [r(t), t * korkeus]);
  const k = sorvi(profiili, 12, 'puu');
  k.push(...rengas({ rUlko: r(0), y: 0, segmentit: 12, ylos: false, rooli: 'puu' }));
  for (const t0 of [0.1, 0.85]) {
    k.push(...vaippa({ r: r(t0) + 0.006, y0: t0 * korkeus, y1: (t0 + 0.05) * korkeus, segmentit: 12, rooli: 'vanne' }));
  }
  const sanka = siirra(kierraU(kaariTanko(r(1) * 0.85, 0, 90, 270, 0.008, 'kahva', 8), 90), [0, korkeus * 1.02, 0]);
  k.push(...sanka);
  return k;
}

/** Saavi: iso avoin puuamme (kuten tynnyri, mutta matalampi/leveämpi, ei kantta). */
export function saavi({ sade = 0.45, korkeus = 0.5 } = {}) {
  const rt = (t) => sade * (0.88 + 0.12 * Math.sin(Math.PI * t));
  const profiili = [0, 0.3, 0.7, 1].map((t) => [rt(t), t * korkeus]);
  const k = sorvi(profiili, 16, 'puu');
  k.push(...rengas({ rUlko: rt(0), y: 0, segmentit: 16, ylos: false, rooli: 'puu' }));
  for (const t0 of [0.06, 0.5, 0.88]) {
    k.push(...vaippa({ r: rt(t0) + 0.008, y0: t0 * korkeus, y1: (t0 + 0.05) * korkeus, segmentit: 16, rooli: 'vanne' }));
  }
  return k;
}

/** Kirnu: kapea korkea puuastia + kansi + survontavarsi kannen läpi. */
export function kirnu({ sade = 0.14, korkeus = 0.6 } = {}) {
  const runkoKorkeus = korkeus * 0.92;
  const rt = (t) => sade * (0.9 + 0.1 * Math.sin(Math.PI * t));
  const profiili = [0, 0.4, 0.85, 1].map((t) => [rt(t), t * runkoKorkeus]);
  const k = sorvi(profiili, 12, 'puu');
  k.push(...rengas({ rUlko: rt(0), y: 0, segmentit: 12, ylos: false, rooli: 'puu' }));
  k.push(...rengas({ rUlko: rt(1) * 0.94, y: runkoKorkeus, segmentit: 12, ylos: true, rooli: 'kansi' }));
  for (const t0 of [0.08, 0.8]) {
    k.push(...vaippa({
      r: rt(t0) + 0.006, y0: t0 * runkoKorkeus, y1: (t0 + 0.04) * runkoKorkeus, segmentit: 12, rooli: 'vanne',
    }));
  }
  k.push(...vaippa({ r: 0.012, y0: runkoKorkeus, y1: korkeus, segmentit: 8, rooli: 'varsi' }));
  return k;
}

/** Huhmar (mortteli) + survin: kupera ulkopinta + kovera sisäpinta (sisa = true), survin nojaa reunaan. */
export function huhmar({ sade = 0.11, korkeus = 0.13 } = {}) {
  const ulko = [[sade * 0.55, 0], [sade, korkeus * 0.5], [sade * 0.95, korkeus]];
  const sisa = [[0, korkeus * 0.15], [sade * 0.8, korkeus * 0.55], [sade * 0.88, korkeus]];
  const k = [...sorvi(ulko, 12, 'puu'), ...sorvi(sisa, 12, 'puu', { sisa: true })];
  k.push(...rengas({ rSisa: sade * 0.88, rUlko: sade * 0.95, y: korkeus, segmentit: 12, ylos: true, rooli: 'puu' }));
  let survin = makuulleU(vaippa({ r: 0.018, y0: 0, y1: 0.19, segmentit: 8, rooli: 'puu' }));
  survin = kierraW(survin, 35);
  survin = siirra(survin, [-0.02, korkeus * 0.6, 0.03]);
  k.push(...survin);
  return k;
}

/** Suolalaatikko: matala pyöristetty runko + hieman leveämpi kansi (molemmat pyorykka():lla). */
export function suolalaatikko({ leveys = 0.24, syvyys = 0.16, korkeus = 0.14 } = {}) {
  const r = (leveys + syvyys) / 4;
  const runko = pyorykka(r, 0, korkeus * 0.78, 8, 'puu', 0.01);
  const kansi = siirra(pyorykka(r * 1.04, 0, korkeus * 0.2, 8, 'puu', 0.012), [0, korkeus * 0.78, 0]);
  return skaalaa([...runko, ...kansi], [leveys / (2 * r), 1, syvyys / (2 * r)]);
}

/* ==================== Valaisimet (palauttavat myös .valo — ks. tiedoston alun kommentti) ==================== */

/** Kynttilänjalka (rauta) + kynttilä (vaha, pieni hehku pinnan omasta hehku-arvosta). */
export function kynttilanjalka({ korkeus = 0.18 } = {}) {
  const jalkaR = korkeus * 0.28;
  const profiili = [
    [jalkaR, 0], [jalkaR * 0.9, korkeus * 0.06], [0.012, korkeus * 0.55], [0.02, korkeus * 0.6], [0.009, korkeus * 0.62],
  ];
  const k = sorvi(profiili, 10, 'jalka');
  k.push(...rengas({ rUlko: jalkaR, y: 0, segmentit: 10, ylos: false, rooli: 'jalka' }));
  k.push(...vaippa({ r: 0.008, y0: korkeus * 0.62, y1: korkeus * 0.98, segmentit: 8, rooli: 'kynttila' }));
  k.push(...rengas({ rUlko: 0.008, y: korkeus * 0.98, segmentit: 8, ylos: true, rooli: 'kynttila' }));
  return asetaValo(k, [0, korkeus * 0.99, 0], 0.55, 0.4, '#ffb070');
}

/** Öljylamppu (kupari) + liekin kohta (vaha). */
export function oljylamppu({ sade = 0.07, korkeus = 0.1 } = {}) {
  const profiili = [[sade * 0.3, 0], [sade * 0.55, korkeus * 0.3], [sade, korkeus * 0.75], [sade * 0.9, korkeus * 0.9]];
  const k = sorvi(profiili, 10, 'runko');
  k.push(...rengas({ rUlko: sade * 0.3, y: 0, segmentit: 10, ylos: false, rooli: 'runko' }));
  k.push(...rengas({
    rSisa: sade * 0.5, rUlko: sade * 0.9, y: korkeus * 0.9, segmentit: 10, ylos: true, rooli: 'runko',
  }));
  k.push(...vaippa({ r: 0.01, y0: korkeus * 0.9, y1: korkeus, segmentit: 8, rooli: 'liekki' }));
  k.push(...rengas({ rUlko: 0.01, y: korkeus, segmentit: 8, ylos: true, rooli: 'liekki' }));
  return asetaValo(k, [sade * 0.3, korkeus * 1.02, 0], 0.4, 0.3, '#ffb070');
}

/** Vati (metalli): matala levy lautanen, hieman ylös taipuva reuna. */
export function vati({ sade = 0.16 } = {}) {
  const profiili = [[sade * 0.3, 0], [sade * 0.85, sade * 0.05], [sade, sade * 0.12]];
  const k = sorvi(profiili, 14, 'metalli');
  k.push(...rengas({ rUlko: sade * 0.3, y: 0, segmentit: 14, ylos: false, rooli: 'metalli' }));
  return k;
}

/** Ruukku (savi): pullea vartalo, kapea kaula, avoin suu. */
export function ruukku({ sade = 0.13, korkeus = 0.22 } = {}) {
  const profiili = [
    [sade * 0.35, 0], [sade * 0.7, korkeus * 0.15], [sade, korkeus * 0.55], [sade * 0.55, korkeus * 0.85], [sade * 0.62, korkeus],
  ];
  const k = sorvi(profiili, 12, 'savi');
  k.push(...rengas({ rUlko: sade * 0.35, y: 0, segmentit: 12, ylos: false, rooli: 'savi' }));
  k.push(...rengas({ rSisa: sade * 0.5, rUlko: sade * 0.62, y: korkeus, segmentit: 12, ylos: true, rooli: 'savi' }));
  return k;
}

/** Pullo (savi): kapea kaula, leveämpi vartalo. */
export function pullo({ sade = 0.055, korkeus = 0.2 } = {}) {
  const profiili = [
    [sade * 0.5, 0], [sade, korkeus * 0.2], [sade * 0.95, korkeus * 0.55],
    [sade * 0.25, korkeus * 0.75], [sade * 0.22, korkeus * 0.95], [sade * 0.3, korkeus],
  ];
  const k = sorvi(profiili, 10, 'savi');
  k.push(...rengas({ rUlko: sade * 0.5, y: 0, segmentit: 10, ylos: false, rooli: 'savi' }));
  return k;
}

/** Luuta: olkiharja (kapeneva sorvi) + puuvarsi. */
export function luuta({ korkeus = 0.85 } = {}) {
  const harjaKork = korkeus * 0.22;
  const profiili = [[0.05, 0], [0.045, harjaKork * 0.6], [0.014, harjaKork]];
  const k = sorvi(profiili, 10, 'harja');
  k.push(...rengas({ rUlko: 0.05, y: 0, segmentit: 10, ylos: false, rooli: 'harja' }));
  k.push(...vaippa({ r: 0.014, y0: harjaKork, y1: korkeus, segmentit: 8, rooli: 'varsi' }));
  k.push(...rengas({ rUlko: 0.014, y: korkeus, segmentit: 8, ylos: true, rooli: 'varsi' }));
  return k;
}

/** Hiillospihdit (rauta): pivotrengas + 2 haarautuvaa vartta, kärjessä pieni koukku (kaariTanko). */
export function hiillospihdit({ pituus = 0.42 } = {}) {
  const kolmiot = [...vaippa({ r: 0.01, y0: -0.01, y1: 0.01, segmentit: 8, rooli: 'rauta' })];
  for (const suunta of [-1, 1]) {
    const varsi = makuulleU(vaippa({ r: 0.006, y0: 0, y1: pituus * 0.85, segmentit: 8, rooli: 'rauta' }));
    const kynsi = siirra(
      kierraY(kaariTanko(0.035, 0, 0, 130, 0.006, 'rauta', 5), 90), [pituus * 0.85, 0, 0],
    );
    // Haarautuu auki VAAKATASOSSA (kierraY, pystyakselin ympäri) — EI kierraW/kierraU:lla, jotka
    // kallistaisivat vartta pystysuunnassa ja upottaisivat toisen haaran lattian alle.
    const koko = kierraY([...varsi, ...kynsi], suunta * 9);
    kolmiot.push(...koko);
  }
  return kolmiot;
}

/* ==================== Rekisteri ==================== */

export const RESEPTIT = {
  orsileivat, yrttinippu, riippupata, kattila, kauha, leikkuulauta, veitsi, kala, leipa, nauriskori,
  puukasa, vesisanko, saavi, kirnu, huhmar, suolalaatikko, kynttilanjalka, oljylamppu, vati, ruukku,
  pullo, luuta, hiillospihdit,
};

export const OLETUSPINNAT = {
  orsileivat: { tanko: 'puu', leipa: 'leipa' },
  yrttinippu: { kimppu: 'vihannes', sidos: 'nahka' },
  riippupata: { tanko: 'rauta', pata: 'metalli' },
  kattila: { runko: 'kupari', sanka: 'kupari' },
  kauha: { puu: 'puu' },
  leikkuulauta: { puu: 'puu' },
  veitsi: { tera: 'rauta', kahva: 'puu' },
  kala: { kala: 'kala' },
  leipa: { leipa: 'leipa' },
  nauriskori: { kori: 'olki', nauris: 'vihannes' },
  puukasa: { puu: 'puu' },
  vesisanko: { puu: 'puu', vanne: 'metalli', kahva: 'nahka' },
  saavi: { puu: 'puu', vanne: 'metalli' },
  kirnu: { puu: 'puu', kansi: 'puu', vanne: 'metalli', varsi: 'puu' },
  huhmar: { puu: 'puu' },
  suolalaatikko: { puu: 'puu' },
  kynttilanjalka: { jalka: 'rauta', kynttila: 'vaha' },
  oljylamppu: { runko: 'kupari', liekki: 'vaha' },
  vati: { metalli: 'metalli' },
  ruukku: { savi: 'savi' },
  pullo: { savi: 'savi' },
  luuta: { harja: 'olki', varsi: 'puu' },
  hiillospihdit: { rauta: 'rauta' },
};
