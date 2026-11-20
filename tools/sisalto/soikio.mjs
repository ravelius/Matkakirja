/*
 * NOSTOKUVAN SOIKEA REUNA (K-3; KK:N PÄÄTÖS 20.11.2026 klo 09.18, aiempi: P-261120-5; suunnitelma
 * scratchpad/keskustelukanava/suunnitelmat/20261120-nostojen-kuvat.md 3.1). AINOA paikka webin puolella, jossa n ja h ovat;
 * peli käyttää samoja lukuja (natiivi Linssit/Ydin/Soikio.cs, NUI K-1).
 *
 *   d = (|u|^n + |v|^n)^(1/n), u ja v −1…1 kuvan omissa mitoissa (keskeltä reunaan)
 *   alfa = 1 − smoothstep(1 − h, 1, d)
 * n = 3: kevyt soikio (ellipsin ja pyöristetyn suorakaiteen välissä); h = 0,25: uloin neljännes puoliakselista häipyy,
 * eli 12,5 % kuvan leveydestä ja korkeudesta kummallakin reunalla. Keskimmäinen 60 % × 60 % näkyy täytenä
 * (nurkassa 0,998, 8-bit 255), keskilinjoilla 75 %:iin asti; nurkat ja reunan keskikohta 0.
 */
export const SOIKIO_N = 3;
export const SOIKIO_H = 0.25;

const smoothstep = (a, b, x) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Soikion alfa pisteessä (u, v), u ja v −1…1. */
export function soikioAlfa(u, v, n = SOIKIO_N, h = SOIKIO_H) {
  const d = (Math.abs(u) ** n + Math.abs(v) ** n) ** (1 / n);
  return 1 - smoothstep(1 - h, 1, d);
}

/** Pikselin (x, y) alfa kuvassa leveys × korkeus (pikselin keskipiste). */
export function soikioPikseli(x, y, leveys, korkeus) {
  return soikioAlfa(((x + 0.5) / leveys) * 2 - 1, ((y + 0.5) / korkeus) * 2 - 1);
}
