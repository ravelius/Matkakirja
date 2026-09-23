/*
 * RTIN-VERKOTUS (right-triangulated irregular network) korkeusruudukolle.
 *
 * Ruudukko on (2^k + 1) × (2^k + 1) korkeutta. Neliö jaetaan kahdeksi
 * suorakulmaiseksi kolmioksi, ja kolmio puolitetaan hypotenuusansa
 * keskipisteestä niin kauan kuin keskipisteen korkeus poikkeaa
 * hypotenuusan päiden keskiarvosta enemmän kuin kynnys. Virhe
 * kirjataan keskipisteeseen alipuun maksimina, ja koska naapuri-
 * kolmiot jakavat saman keskipisteen, molemmat puolittuvat samassa
 * kohdassa: verkossa ei ole T-liitoksia eikä rakoja (sama periaate kuin
 * Evans, Kirkpatrick & Townsend 2001; Mapboxin Martini).
 */

/**
 * Virheet keskipisteittäin: Float32Array(n·n).
 *
 * LASKETAAN TASOITTAIN ALHAALTA YLÖS, EI SYVYYSHAULLA (korjaus 23.9.2026,
 * testi "ei rakoja"). Keskipiste on kahden naapurikolmion yhteinen, ja
 * esivanhemman virhe on lastensa keskipisteiden maksimi. Syvyyshaussa
 * naapuri päivitti jaetun keskipisteen vasta, kun ensimmäisen kolmion
 * esivanhemmat oli jo laskettu, jolloin toinen puoli jäi jakamatta ja
 * verkkoon tuli T-liitos. Kun koko syvin taso on valmis ennen seuraavaa,
 * jokainen keskipiste on lopullinen ennen kuin sitä luetaan.
 */
export function rtinVirheet(korkeudet, n) {
  const virheet = new Float32Array(n * n);
  const h = (x, y) => korkeudet[y * n + x];
  const m = n - 1;
  // Kolmiot syvyyksittäin: [ax, ay, bx, by, cx, cy].
  const tasot = [[[0, 0, m, m, m, 0], [m, m, 0, 0, 0, m]]];
  for (;;) {
    const lapset = [];
    for (const [ax, ay, bx, by, cx, cy] of tasot.at(-1)) {
      if (Math.abs(ax - cx) + Math.abs(ay - cy) <= 1) continue;
      const mx = (ax + bx) >> 1; const my = (ay + by) >> 1;
      lapset.push([cx, cy, ax, ay, mx, my], [bx, by, cx, cy, mx, my]);
    }
    if (!lapset.length) break;
    tasot.push(lapset);
  }
  for (let d = tasot.length - 1; d >= 0; d -= 1) {
    for (const [ax, ay, bx, by, cx, cy] of tasot[d]) {
      const mx = (ax + bx) >> 1; const my = (ay + by) >> 1;
      let e = Math.abs(h(mx, my) - (h(ax, ay) + h(bx, by)) / 2);
      if (Math.abs(ax - cx) + Math.abs(ay - cy) > 1) {
        // Lasten (c, a, m) ja (b, c, m) keskipisteet.
        e = Math.max(e, virheet[((cy + ay) >> 1) * n + ((cx + ax) >> 1)], virheet[((by + cy) >> 1) * n + ((bx + cx) >> 1)]);
      }
      const i = my * n + mx;
      if (e > virheet[i]) virheet[i] = e;
    }
  }
  return virheet;
}

/**
 * Kolmiot kynnyksellä `kynnys` (m). Palauttaa { pisteet: [x, y]…, kolmiot: [i, j, k]… }
 * ruudukkoindekseinä (x oikealle, y alas), pisteet ensiesiintymisjärjestyksessä.
 */
export function rtinVerkko(korkeudet, n, kynnys, virheet = rtinVirheet(korkeudet, n)) {
  const indeksi = new Int32Array(n * n).fill(-1);
  const pisteet = [];
  const kolmiot = [];
  const piste = (x, y) => {
    const k = y * n + x;
    if (indeksi[k] < 0) { indeksi[k] = pisteet.length; pisteet.push([x, y]); }
    return indeksi[k];
  };
  const kay = (ax, ay, bx, by, cx, cy) => {
    const mx = (ax + bx) >> 1;
    const my = (ay + by) >> 1;
    if (Math.abs(ax - cx) + Math.abs(ay - cy) > 1 && virheet[my * n + mx] > kynnys) {
      kay(cx, cy, ax, ay, mx, my);
      kay(bx, by, cx, cy, mx, my);
      return;
    }
    kolmiot.push([piste(ax, ay), piste(bx, by), piste(cx, cy)]);
  };
  const m = n - 1;
  kay(0, 0, m, m, m, 0);
  kay(m, m, 0, 0, 0, m);
  return { pisteet, kolmiot };
}
