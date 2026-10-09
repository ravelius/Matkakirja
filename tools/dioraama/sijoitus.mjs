// DIORAAMAN TILAKOHTAINEN SIJOITUS (Linnanrakentaja 29.9.2026). Speksi docs/raportit/dioraama-rajapinnat-blender-20260929.md
// kohta 2. Tilalla voi olla `sijoitus: { ankkuri: [x,y,z], paikka: [x,y,z], suunta: astetta }`. Silloin KAIKKI tilan
// pistedata (palikat, rajat, kamerat, pulu, hahmot ja reitit, valot, liekit, leikkaus, elava.kohde ja elava.reitti, esineet, etsinta-kohteet, taulu.kohdat[].kohde.paikka, hahmot[].kadet[] (tartu: paikka ja kierto), kuunnelma[].vuorot[].osoita.paikka) muunnetaan
//   p' = R(suunta) · (p − ankkuri) + paikka
// ennen rakennusta. Tila-data pysyy tiivistetyissä lähdekoordinaateissaan; rakenna.mjs kutsuu sijoitaTila()a ensimmäisenä.
//
// KIERTOKONVENTIO (sama kuin reseptit.mjs:n sijoita(): r = (cos s, 0, sin s), f = (sin s, 0, −cos s)):
// suunta = kompassiasteet myötäpäivään ylhäältä katsoen, 0 = pohjoinen (−z). glTF: +x itä, +y ylös, +z etelä.
//   R(θ): x' = x·cosθ − z·sinθ, z' = x·sinθ + z·cosθ   (y ei muutu)
// eli suunta 90 kääntää +x (itä) → +z (etelä) ja −z (pohjoinen) → +x (itä). Suuntakulmat (palikan/hahmon suunta,
// kameran atsimuutti) kasvavat samalla θ:lla: R(θ)·R(s) = R(s + θ).
const RAD = Math.PI / 180;

function trig(aste) {
  const a = ((aste % 360) + 360) % 360;
  if (a === 0) return [1, 0];
  if (a === 90) return [0, 1];
  if (a === 180) return [-1, 0];
  if (a === 270) return [0, -1];
  return [Math.cos(a * RAD), Math.sin(a * RAD)];
}
const pyorista = (x) => Math.round(x * 1e6) / 1e6 + 0; // + 0 poistaa −0:n
const kulma = (a) => pyorista((((a % 360) + 360) % 360));

function muunnin({ ankkuri = [0, 0, 0], paikka = [0, 0, 0], suunta = 0 }) {
  const [c, s] = trig(suunta);
  const piste = (p) => {
    const x = p[0] - ankkuri[0], y = p[1] - ankkuri[1], z = p[2] - ankkuri[2];
    return [
      pyorista(x * c - z * s + paikka[0]),
      pyorista(y + paikka[1]),
      pyorista(x * s + z * c + paikka[2]),
    ];
  };
  const laatikko = (min, max) => {
    const kaikki = [];
    for (const x of [min[0], max[0]]) for (const y of [min[1], max[1]]) for (const z of [min[2], max[2]]) kaikki.push(piste([x, y, z]));
    return {
      min: [0, 1, 2].map((i) => Math.min(...kaikki.map((k) => k[i]))),
      max: [0, 1, 2].map((i) => Math.max(...kaikki.map((k) => k[i]))),
    };
  };
  // Kierto (kvaternio [x, y, z, w], glTF): sama Y-kierto kuin pisteille eli R_y(−suunta) vasemmalta (Final IK -kädet, 5.10.).
  const [kc, ks] = [Math.cos((-suunta * RAD) / 2), Math.sin((-suunta * RAD) / 2)];
  const kierto = ([x, y, z, w]) => [kc * x + ks * z, kc * y + ks * w, kc * z - ks * x, kc * w - ks * y].map(pyorista);
  return { piste, laatikko, suunta, kierto };
}

const onPiste = (p) => Array.isArray(p) && p.length === 3 && p.every((x) => typeof x === 'number');

/**
 * Puhdas funktio: palauttaa uuden tilan, jonka data on sijoitettu; alkuperäistä ei muuteta. Ilman `sijoitus`-kenttää
 * palauttaa tilan sellaisenaan (sama olio). Palautettu tila ei sisällä sijoitus-kenttää.
 */
export function sijoitaTila(tila) {
  if (!tila || !tila.sijoitus) return tila;
  const { sijoitus, ...ilmanSijoitusta } = tila;
  const t = structuredClone(ilmanSijoitusta);
  const m = muunnin(sijoitus);
  const suuntaan = (a) => kulma((a || 0) + m.suunta);
  const pisteeksi = (o, kentta) => { if (onPiste(o?.[kentta])) o[kentta] = m.piste(o[kentta]); };

  for (const p of [...(t.palikat ?? []), ...(t.esineet ?? [])]) {
    p.paikka = m.piste(p.paikka || [0, 0, 0]);
    p.suunta = suuntaan(p.suunta);
  }
  if (t.rajat) t.rajat = m.laatikko(t.rajat.min, t.rajat.max);
  if (t.leikkaus && onPiste(t.leikkaus.min) && onPiste(t.leikkaus.max)) {
    Object.assign(t.leikkaus, m.laatikko(t.leikkaus.min, t.leikkaus.max));
  }
  for (const k of [t.kamera, t.kameraPysty]) {
    if (!k) continue;
    pisteeksi(k, 'kohde');
    if (typeof k.atsimuutti === 'number') k.atsimuutti = suuntaan(k.atsimuutti);
  }
  pisteeksi(t.pulu, 'laskeutuminen');
  for (const h of t.hahmot ?? []) {
    pisteeksi(h, 'paikka');
    if (typeof h.suunta === 'number') h.suunta = suuntaan(h.suunta);
    if (Array.isArray(h.reitti?.pisteet)) h.reitti.pisteet = h.reitti.pisteet.map((p) => (onPiste(p) ? m.piste(p) : p));
  }
  for (const v of t.valot ?? []) { pisteeksi(v, 'paikka'); pisteeksi(v, 'kohti'); }
  for (const l of t.liekit ?? []) pisteeksi(l, 'paikka');
  // Maalausprojektorit (kappeli 7.10.): keskipiste ja kompassisuunta samaan sijoitukseen (leivo_tila.py).
  for (const md of t.maalaukset ?? []) { pisteeksi(md, 'keski'); if (typeof md.kompassi === 'number') md.kompassi = suuntaan(md.kompassi); }
  // Elävä linna (29.9.): yleisnäkymän napautuskohde ja reittihahmon polku samaan sijoitukseen.
  pisteeksi(t.elava, 'kohde');
  for (const v of t.etsinta ?? []) pisteeksi(v, 'kohde');  // voudin sinetti: vihjeen/löydön kohta
  for (const k of t.taulu?.kohdat ?? []) pisteeksi(k.kohde, 'paikka');
  // Final IK (5.10.): hahmon kädet kahvoihin (tartu: maailman paikka ja kierto; kanna on käden paikallinen, ei muunneta)
  // ja vuoron osoituskohde.
  for (const h of t.hahmot ?? []) {
    // 9.10. (juna 174): tartu-rivi, jonka esine on saman hahmon kanna-rivin esine (kannettu kirja), on esineen kehyksessä → ei muunneta.
    const kannetut = new Set((h.kadet ?? []).filter((k) => k.tyyppi === 'kanna' && k.esine).map((k) => k.esine));
    for (const k of h.kadet ?? []) {
      if (k.tyyppi !== 'tartu' || kannetut.has(k.esine)) continue;
      pisteeksi(k, 'paikka');
      if (Array.isArray(k.kierto) && k.kierto.length === 4) k.kierto = m.kierto(k.kierto);
    }
  }
  for (const r of t.kuunnelma ?? []) for (const v of r.vuorot ?? []) pisteeksi(v.osoita, 'paikka');  // kohtaukset v2 (5.10.): fakta napautuskohteeseen
  if (Array.isArray(t.elava?.reitti?.pisteet)) t.elava.reitti.pisteet = t.elava.reitti.pisteet.map((p) => (onPiste(p) ? m.piste(p) : p));
  return t;
}
