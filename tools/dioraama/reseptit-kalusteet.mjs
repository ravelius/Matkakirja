// DIORAAMAN KALUSTERESEPTIT (Linnanrakentaja 29.9.2026): pöytä, penkki, tynnyri, pata, säkki, tulisija ja hylly
// harmaina palikoina (erä 1). Speksi docs/raportit/dioraama-rajapinnat-20260929.md kohta 2; apufunktiot ja
// kehys (u, y, w oikeakätinen, kärjet vastapäivään ulkoa) reseptit-apu.mjs. Origo = kalusteen pohjan keskipiste
// lattiatasolla, etusuunta +w.
import { laatikko, rengas, kolmio, kolmionNormaali, mulberry32 } from './reseptit-apu.mjs';

const RAD = Math.PI / 180;
const KAIKKI = (rooli) => ({ yla: rooli, ala: rooli, etu: rooli, taka: rooli, vasen: rooli, oikea: rooli });
const SIVUT = (rooli) => ({ etu: rooli, taka: rooli, vasen: rooli, oikea: rooli });

/** Kolmio, jonka normaali käännetään osoittamaan poispäin sisäpisteestä (varma suunta vinoille pinnoille). */
function ulospain(a, b, c, rooli, sisapiste) {
  const t = kolmio(a, b, c, rooli);
  const n = kolmionNormaali(t);
  const m = [(a[0] + b[0] + c[0]) / 3 - sisapiste[0], (a[1] + b[1] + c[1]) / 3 - sisapiste[1], (a[2] + b[2] + c[2]) / 3 - sisapiste[2]];
  return n[0] * m[0] + n[1] * m[1] + n[2] * m[2] >= 0 ? t : kolmio(a, c, b, rooli);
}

/** Nelikulmio kahtena ulospäin suunnattuna kolmiona. */
function nelioUlos(a, b, c, d, rooli, sisapiste) {
  return [ulospain(a, b, c, rooli, sisapiste), ulospain(a, c, d, rooli, sisapiste)];
}

function ala(t) {
  const [a, b, c] = t.p;
  const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  return Math.hypot(e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]) / 2;
}

/**
 * Pyörähdyskappale profiilista [[r, y], …] alhaalta ylös (sorvi). Pehmeät normaalit profiilin kaltevuudesta;
 * sisa = true kääntää pinnan sisäänpäin. kohina(i, s) → säteen kerroin (valinnainen). Nollasäteen renkaat
 * tuottavat kolmiot (surkastuneet ohitetaan).
 */
function sorvi(profiili, segmentit, rooli, { sisa = false, kohina = null } = {}) {
  const n = profiili.length, tulos = [];
  const normaali = (i, k) => {
    const a = profiili[Math.max(0, i - 1)], b = profiili[Math.min(n - 1, i + 1)];
    const dr = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dr, dy) || 1;
    const nr = dy / l, ny = -dr / l, s = sisa ? -1 : 1;
    return [s * nr * Math.sin(k * RAD), s * ny, s * nr * Math.cos(k * RAD)];
  };
  const piste = (i, j) => {
    const k = 360 * j / segmentit, r = profiili[i][0] * (kohina ? kohina(i, j % segmentit) : 1);
    return [r * Math.sin(k * RAD), profiili[i][1], r * Math.cos(k * RAD)];
  };
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < segmentit; j++) {
      const ka = 360 * j / segmentit, kb = 360 * (j + 1) / segmentit;
      const a0 = piste(i, j), b0 = piste(i, j + 1), b1 = piste(i + 1, j + 1), a1 = piste(i + 1, j);
      const na0 = normaali(i, ka), nb0 = normaali(i, kb), nb1 = normaali(i + 1, kb), na1 = normaali(i + 1, ka);
      // (a0, b0, b1) osoittaa ulos, kun profiili nousee (vaippa-apufunktion tarkistus); sisapinta käännetään.
      const osat = [kolmio(a0, b0, b1, rooli, na0, nb0, nb1), kolmio(a0, b1, a1, rooli, na0, nb1, na1)];
      for (const t of osat) {
        if (ala(t) < 1e-9) continue;
        tulos.push(sisa ? { p: [t.p[0], t.p[2], t.p[1]], n: [t.n[0], t.n[2], t.n[1]], rooli } : t);
      }
    }
  }
  return tulos;
}

export function poyta({ leveys, syvyys, korkeus = 0.8 }) {
  const k = [], kansi = 0.06, jalka = 0.08, sisaan = 0.05;
  k.push(...laatikko({ u0: -leveys / 2, u1: leveys / 2, y0: korkeus - kansi, y1: korkeus, w0: -syvyys / 2, w1: syvyys / 2 }, KAIKKI('puu')));
  for (const su of [-1, 1]) for (const sw of [-1, 1]) {
    const uc = su * (leveys / 2 - sisaan - jalka / 2), wc = sw * (syvyys / 2 - sisaan - jalka / 2);
    k.push(...laatikko({ u0: uc - jalka / 2, u1: uc + jalka / 2, y0: 0, y1: korkeus - kansi, w0: wc - jalka / 2, w1: wc + jalka / 2 }, SIVUT('puu')));
  }
  return k;
}

export function penkki({ leveys, syvyys = 0.3, korkeus = 0.45 }) {
  const k = [], istuin = 0.05, lankku = 0.05;
  k.push(...laatikko({ u0: -leveys / 2, u1: leveys / 2, y0: korkeus - istuin, y1: korkeus, w0: -syvyys / 2, w1: syvyys / 2 }, KAIKKI('puu')));
  for (const su of [-1, 1]) {
    const uc = su * (leveys / 2 - 0.1);
    k.push(...laatikko({ u0: uc - lankku / 2, u1: uc + lankku / 2, y0: 0, y1: korkeus - istuin, w0: -syvyys * 0.45, w1: syvyys * 0.45 }, SIVUT('puu')));
  }
  return k;
}

export function tynnyri({ sade = 0.35, korkeus = 0.9, segmentit = 16 }) {
  const r = (t) => sade * (1 + 0.12 * Math.sin(Math.PI * t));
  const profiili = [0, 0.2, 0.4, 0.6, 0.8, 1].map((t) => [r(t), t * korkeus]);
  const k = sorvi(profiili, segmentit, 'puu');
  for (const t0 of [0.2, 0.74]) {
    const vanne = [[r(t0) + 0.012, t0 * korkeus], [r(t0 + 0.06) + 0.012, (t0 + 0.06) * korkeus]];
    k.push(...sorvi(vanne, segmentit, 'vanne'));
  }
  k.push(...rengas({ rUlko: r(1), y: korkeus, segmentit, ylos: true, rooli: 'kansi' }));
  return k;
}

export function pata({ sade = 0.3, korkeus = 0.35 }) {
  const pohja = 0.06, askeleet = 5, ulko = [], sisa = [];
  for (let i = 0; i <= askeleet; i++) {
    const th = (90 * i / askeleet) * RAD;
    ulko.push([sade * Math.sin(th), pohja + (korkeus - pohja) * (1 - Math.cos(th))]);
    sisa.push([sade * 0.92 * Math.sin(th), pohja + 0.02 + (korkeus - pohja - 0.02) * (1 - Math.cos(th))]);
  }
  const k = [...sorvi(ulko, 16, 'metalli'), ...sorvi(sisa, 16, 'metalli', { sisa: true })];
  k.push(...rengas({ rSisa: sade * 0.92, rUlko: sade, y: korkeus, segmentit: 16, ylos: true, rooli: 'metalli' }));
  for (let i = 0; i < 3; i++) {
    const kk = (120 * i + 30) * RAD, uc = sade * 0.55 * Math.sin(kk), wc = sade * 0.55 * Math.cos(kk);
    k.push(...laatikko({ u0: uc - 0.02, u1: uc + 0.02, y0: 0, y1: pohja + 0.02, w0: wc - 0.02, w1: wc + 0.02 }, SIVUT('metalli')));
  }
  return k;
}

export function sakki({ sade = 0.3, korkeus = 0.6, siemen = 1 }) {
  const s = sade, h = korkeus;
  const profiili = [[0.85 * s, 0], [1.0 * s, 0.2 * h], [1.03 * s, 0.45 * h], [0.9 * s, 0.65 * h], [0.55 * s, 0.8 * h],
    [0.2 * s, 0.88 * h], [0.28 * s, 0.95 * h], [0, h]];
  const satunnainen = mulberry32(siemen);
  const kertoimet = profiili.map(() => Array.from({ length: 12 }, () => 1 + (satunnainen() - 0.5) * 0.1));
  return sorvi(profiili, 12, 'kangas', { kohina: (i, j) => kertoimet[i][j] });
}

export function tulisija({ leveys = 3, syvyys = 1.2, korkeus = 0.9, huuva = {} }) {
  const hk = huuva.korkeus ?? 1.6, yla = huuva.yla ?? 4;
  const k = [];
  // Kivijalka ja hiillos (hieman kapeampi, 4 cm).
  k.push(...laatikko({ u0: -leveys / 2, u1: leveys / 2, y0: 0, y1: korkeus, w0: -syvyys / 2, w1: syvyys / 2 }, KAIKKI('kivi')));
  k.push(...laatikko({ u0: -leveys / 2 + 0.15, u1: leveys / 2 - 0.15, y0: korkeus, y1: korkeus + 0.04, w0: -syvyys / 2 + 0.15, w1: syvyys / 2 - 0.15 },
    { yla: 'hiillos', etu: 'hiillos', vasen: 'hiillos', oikea: 'hiillos' }));
  // Huuva: pystyreunus (0,25 m) ja siitä kapeneva savuhuuva piipuksi (0,6 × 0,6 m) takaseinää vasten.
  const y0 = korkeus + hk, y1 = y0 + 0.25, y2 = Math.max(y1 + 0.2, yla);
  const w0 = -syvyys / 2, w1 = syvyys / 2, pu = 0.3, pw0 = w0, pw1 = w0 + 0.6;
  const sisapiste = [0, (y0 + y2) / 2, w0 + 0.2];
  // Reunus: etu ja sivut.
  k.push(...laatikko({ u0: -leveys / 2, u1: leveys / 2, y0, y1, w0, w1 }, { etu: 'huuva', vasen: 'huuva', oikea: 'huuva', ala: 'huuva' }));
  // Kapeneva osa: etupinta (puolisuunnikas), vasen ja oikea sivu.
  k.push(...nelioUlos([-leveys / 2, y1, w1], [leveys / 2, y1, w1], [pu, y2, pw1], [-pu, y2, pw1], 'huuva', sisapiste));
  k.push(...nelioUlos([-leveys / 2, y1, w0], [-leveys / 2, y1, w1], [-pu, y2, pw1], [-pu, y2, pw0], 'huuva', sisapiste));
  k.push(...nelioUlos([leveys / 2, y1, w1], [leveys / 2, y1, w0], [pu, y2, pw0], [pu, y2, pw1], 'huuva', sisapiste));
  return k;
}

export function hylly({ leveys, korkeus, syvyys = 0.4, hyllyt = 3 }) {
  const k = [], lauta = 0.03;
  for (const su of [-1, 1]) {
    const uc = su * (leveys / 2 - lauta / 2);
    k.push(...laatikko({ u0: uc - lauta / 2, u1: uc + lauta / 2, y0: 0, y1: korkeus, w0: -syvyys / 2, w1: syvyys / 2 }, KAIKKI('puu')));
  }
  const n = Math.max(1, hyllyt);
  for (let i = 0; i < n; i++) {
    const y = n === 1 ? korkeus * 0.5 : 0.12 + i * (korkeus - 0.15) / (n - 1);
    k.push(...laatikko({ u0: -leveys / 2 + lauta, u1: leveys / 2 - lauta, y0: y - lauta, y1: y, w0: -syvyys / 2, w1: syvyys / 2 }, KAIKKI('puu')));
  }
  k.push(...laatikko({ u0: -leveys / 2 + lauta, u1: leveys / 2 - lauta, y0: korkeus - 0.08, y1: korkeus, w0: -syvyys / 2, w1: -syvyys / 2 + lauta }, KAIKKI('puu')));
  return k;
}

export const RESEPTIT = { poyta, penkki, tynnyri, pata, sakki, tulisija, hylly };
export const OLETUSPINNAT = {
  poyta: { puu: 'puu' }, penkki: { puu: 'puu' }, tynnyri: { puu: 'puu', vanne: 'metalli', kansi: 'puu' },
  pata: { metalli: 'metalli' }, sakki: { kangas: 'kangas' }, tulisija: { kivi: 'kivi', hiillos: 'hiillos', huuva: 'rappaus' },
  hylly: { puu: 'puu' },
};
