/*
 * ASTRONAUTIN KAMERAN MAAILMANKIERROS — puhdas moduuli.
 *
 * OMISTAJA 27.9.2026 klo 23.5x (Fablen kautta, loki "ASTRONAUTIN KAMERA —
 * ISS-KYYTI"), sanatarkasti: *"alhaalla keskellä napit edellinen/seuraava,
 * mistä voisi selata viereisiä kohteita kartalla"*.
 *
 * Havaintokohteet ovat yksi suljettu kierros maantieteellisen läheisyyden
 * mukaan: ‹ › ja gallerian jatko vievät aina viereiseen kohteeseen kartalla
 * ja samaa tietä takaisin. SAMA ALGORITMI KUIN NATIIVISSA (proto
 * Linssit/Ydin/Astronautti/AstronauttiKierros.cs, Linssiseppä 28.9.2026):
 *
 *   1. mukana vain kohteet, joilla on paikka ja vähintään yksi kuva,
 *   2. lähin naapuri isoympyräetäisyydellä läntisimmästä alkaen
 *      (tasapelissä aineiston aiempi),
 *   3. 2-opt suljetulla kierroksella (ristikkäiset hypyt suoriksi),
 *   4. alku läntisimpään ja suunta myötäpäivään: alun naapureista
 *      pohjoisempi ensin.
 *
 * Tulos kirjoitetaan aineistoon kentäksi SATELLIITTI_KIERROS
 * (tools/laske-astronautin-kierros.mjs), jotta web ja natiivi lukevat
 * saman järjestyksen eikä kumpikaan laske sitä käynnistyessään. Testi
 * (tests/astronautin-kierros.test.mjs) pitää kentän ja laskennan samana.
 */

/** 2-opt-kierrosten katto (189 kohdetta paranee alle kymmenessä). */
export const OPT_KIERROKSIA = 60;

const R = Math.PI / 180;

/** Isoympyräetäisyys radiaaneina (haversine). */
export function etaisyys(lat1, lon1, lat2, lon2) {
  const dLat = (lat2 - lat1) * R;
  const dLon = (lon2 - lon1) * R;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(lat1 * R) * Math.cos(lat2 * R) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return 2 * Math.asin(Math.min(1, Math.sqrt(a)));
}

/**
 * Maailmankierros kohteiden tunnuksina.
 * @param {Array<{tunnus: string, lat: number, lon: number, havainnot?: unknown[]}>} kohteet aineisto.
 * @returns {string[]} tunnukset kierroksen järjestyksessä.
 */
export function laskeKierros(kohteet = []) {
  const k = kohteet.filter((x) => x && Number.isFinite(x.lat) && Number.isFinite(x.lon)
    && (x.havainnot ?? []).length > 0);
  const n = k.length;
  if (n <= 2) return k.map((x) => x.tunnus);
  const d = Array.from({ length: n }, () => new Float64Array(n));
  for (let i = 0; i < n; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      d[i][j] = etaisyys(k[i].lat, k[i].lon, k[j].lat, k[j].lon);
      d[j][i] = d[i][j];
    }
  }

  let alku = 0;
  for (let i = 1; i < n; i += 1) if (k[i].lon < k[alku].lon) alku = i;
  const reitti = [alku];
  const kayty = new Uint8Array(n);
  kayty[alku] = 1;
  for (let p = 1; p < n; p += 1) {
    const ed = reitti[p - 1];
    let paras = -1;
    let parasD = Infinity;
    for (let i = 0; i < n; i += 1) {
      if (kayty[i]) continue;
      if (d[ed][i] < parasD) { parasD = d[ed][i]; paras = i; }
    }
    reitti.push(paras);
    kayty[paras] = 1;
  }

  for (let kierros = 0; kierros < OPT_KIERROKSIA; kierros += 1) {
    let parani = false;
    for (let i = 0; i < n - 1; i += 1) {
      for (let j = i + 2; j < n; j += 1) {
        if (i === 0 && j === n - 1) continue;
        const a = reitti[i]; const b = reitti[i + 1]; const c = reitti[j]; const e = reitti[(j + 1) % n];
        if (d[a][c] + d[b][e] < d[a][b] + d[c][e] - 1e-12) {
          const osa = reitti.slice(i + 1, j + 1).reverse();
          reitti.splice(i + 1, osa.length, ...osa);
          parani = true;
        }
      }
    }
    if (!parani) break;
  }

  const s = reitti.indexOf(alku);
  const tulos = reitti.map((_, p) => reitti[(s + p) % n]);
  if (k[tulos[1]].lat < k[tulos[n - 1]].lat) {
    const loput = tulos.slice(1).reverse();
    tulos.splice(1, loput.length, ...loput);
  }
  return tulos.map((i) => k[i].tunnus);
}

/**
 * Naapuri kierroksella: tunnuksen jälkeen (suunta +1) tai ennen (−1),
 * ympäri kiertäen; null, jos tunnus ei ole kierroksella.
 */
export function naapuri(kierros, tunnus, suunta) {
  if (!kierros?.length || !suunta) return null;
  const p = kierros.indexOf(tunnus);
  if (p < 0) return null;
  const n = kierros.length;
  return kierros[(((p + Math.sign(suunta)) % n) + n) % n];
}
