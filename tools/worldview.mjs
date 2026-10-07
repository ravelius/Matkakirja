// WORLDVIEW: VALTIOT SUOMEN KANNAN MUKAAN (Päätoimittaja 7.10.2026, LS2:n löytö:
// natiivin kartta näytti Krimin Venäjänä).
//
// Natural Earthin oletusaineisto on de facto -näkymä. Natural Earth julkaisee
// myös maakohtaiset näkökulmat (point of view, POV), mutta Suomen versiota ei
// ole. Ruotsin näkökulma (_swe) vastaa Suomen kantaa kaikissa Euroopan kohteissa:
//   - Krim ja Sevastopol kuuluvat Ukrainaan (kannaksen viiva "Claim boundary")
//   - Pohjois-Kypros ja YK:n puskurivyöhyke kuuluvat Kyprokseen (CYP)
//   - Kosovo on oma valtionsa (KOS)
//   - Abhasia ja Etelä-Ossetia kuuluvat Georgiaan, Transnistria Moldovaan
//   - Akrotiri ja Dhekelia ovat Ison-Britannian tukikohta-alueita (WSB, ESB)
//
// Admin-0-monikulmiot: generaattorit lukevat suoraan _swe-tiedoston.
// Rajaviivat (boundary_lines_land): niistä ei ole POV-tiedostoa, vaan ominaisuus
// FCLASS_SE ohittaa FEATURECLA:n. `rajaviivaKelpaa` hylkää viivan, jos
//   1) Ruotsin näkökulman luokka on "Unrecognized" tai "Claim boundary"
//      (Krimin kannas, Marokon valli Länsi-Saharassa, Baikonurin vuokraraja), tai
//   2) viivan molemmat puolet kuuluvat _swe:ssä samaan valtioon (Kyproksen
//      Vihreä linja ja puskurivyöhykkeen reunat: CYN, CNM → CYP).

export const POV = 'swe';
/** Rajaviivojen näkökulmasarake (Ruotsi = SE). */
export const FCLASS = 'FCLASS_SE';
export const ADMIN0_URL = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/'
  + `geojson/ne_10m_admin_0_countries_${POV}.geojson`;
export const ADMIN0_TIEDOSTO = `ne_10m_admin_0_countries_${POV}.geojson`;

const HYLATYT_LUOKAT = new Set(['Unrecognized', 'Claim boundary']);

function sisalla(rengas, [x, y]) {
  let c = false;
  for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i++) {
    const [xi, yi] = rengas[i]; const [xj, yj] = rengas[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}
const monikulmiot = (g) => (g.type === 'Polygon' ? [g.coordinates] : g.coordinates);

/**
 * Oletusaineiston ADM0_A3 → näkökulman ADM0_A3. Jokaisen oletusmaan sisäpiste
 * (renkaan ensimmäinen kärki siirrettynä keskipistettä kohti) haetaan
 * näkökulman monikulmioista. Esim. CYN → CYP, CNM → CYP; KOS → KOS.
 */
export function nakokulmanMaat(oletus, pov) {
  const kartta = new Map();
  const povMaat = pov.features.map((f) => ({ a3: f.properties.ADM0_A3, p: monikulmiot(f.geometry) }));
  for (const f of oletus.features) {
    const a3 = f.properties.ADM0_A3;
    const p = monikulmiot(f.geometry).sort((a, b) => b[0].length - a[0].length)[0];
    const r = p[0];
    // Sisäpiste: vaakaviiva renkaan keskikorkeudella, leveimmän sisävälin keskikohta (kovera maa, esim. Vietnam).
    const ys = r.map((q) => q[1]); const yk = (Math.min(...ys) + Math.max(...ys)) / 2 + 1e-7;
    const xs = [];
    for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
      const [xi, yi] = r[i]; const [xj, yj] = r[j];
      if ((yi > yk) !== (yj > yk)) xs.push(xi + ((yk - yi) * (xj - xi)) / (yj - yi));
    }
    xs.sort((a, b) => a - b);
    let piste = [r[0][0], r[0][1]]; let leveys = -1;
    for (let i = 0; i + 1 < xs.length; i += 2) if (xs[i + 1] - xs[i] > leveys) { leveys = xs[i + 1] - xs[i]; piste = [(xs[i] + xs[i + 1]) / 2, yk]; }
    const osuma = povMaat.find((m) => m.p.some((q) => sisalla(q[0], piste) && !q.slice(1).some((h) => sisalla(h, piste))));
    kartta.set(a3, osuma ? osuma.a3 : a3);
  }
  return kartta;
}

/** Hyväksytäänkö boundary_lines_land-ominaisuus näkökulman mukaan. */
export function rajaviivaKelpaa(f, maat) {
  const p = f.properties ?? {};
  const luokka = p[FCLASS] || p.FEATURECLA;
  if (HYLATYT_LUOKAT.has(luokka)) return false;
  const l = p.ADM0_A3_L; const r = p.ADM0_A3_R;
  if (l && r && l !== r && maat) { // vain näkökulman yhdistämät (alun perin eri maat)
    const ml = maat.get(l) ?? l; const mr = maat.get(r) ?? r;
    if (ml === mr) return false;
  }
  return true;
}

/**
 * Näkökulman rajat, joita oletusrajaviivastossa ei ole: de facto -aineistossa
 * Marokko hallitsee Länsi-Saharan pohjoisosaa, joten MAR–SAH-rajaa (27,67° N)
 * ei ole viivana. Viiva otetaan _swe-monikulmioiden yhteisestä reunasta.
 */
export const LISATTAVAT_RAJAT = [['MAR', 'SAH']];

/** Kahden maan yhteinen reuna (avoimet viivat lon/lat) näkökulman monikulmioista. */
export function yhteinenReuna(pov, a3a, a3b) {
  const hae = (a3) => pov.features.find((f) => f.properties.ADM0_A3 === a3);
  const fa = hae(a3a); const fb = hae(a3b);
  if (!fa || !fb) throw new Error(`${a3a} tai ${a3b} puuttuu näkökulmasta`);
  const k = (q) => `${q[0].toFixed(7)},${q[1].toFixed(7)}`;
  const B = new Set(monikulmiot(fb.geometry).flatMap((p) => p.flatMap((r) => r.map(k))));
  const viivat = [];
  for (const p of monikulmiot(fa.geometry)) for (const r of p) {
    let nyt = null;
    for (let i = 0; i < r.length; i += 1) {
      if (B.has(k(r[i]))) { if (!nyt) { nyt = []; viivat.push(nyt); } nyt.push(r[i]); } else nyt = null;
    }
  }
  return viivat.filter((v) => v.length > 1);
}
