// OLAVINLINNA / aukkojen kivikehykset seinäresepteistä (Linnanrakentaja 9.10.2026, Thief-vertailun #4 geometrian yksityiskohta).
// Seinä (resepti 'seina') → jokaiselle aukolle resepti 'kivikehys' huoneen puolelle. Seinän paikallinen kehys: +w = kompassi
// suunta (sin s, −cos s), +u = kompassi s + 90 (cos s, sin s). puoli 'taka' (w−, oletus: palatsin ja keittiön huone) tai 'etu'.
// Ovi (y = 0, korkeus ≥ 1,7 m) saa matalan kaaren (nousu 0,3 m pielten yläpäästä), ikkunat ja muut suoran kamanan.
const RAD = Math.PI / 180;
const r3 = (v) => Math.round(v * 1000) / 1000;

export function kehyksetSeinasta(seina, { puoli = 'taka', siemen = 1, kaari = 0.3 } = {}) {
  const s = seina.suunta * RAD, [px, py, pz] = seina.paikka, wPinta = (puoli === 'taka' ? -1 : 1) * seina.paksuus / 2;
  return (seina.aukot ?? []).map((a, i) => {
    const ovi = a.y < 0.01 && a.korkeus >= 1.7;
    const x = px + a.u * Math.cos(s) + wPinta * Math.sin(s), z = pz + a.u * Math.sin(s) - wPinta * Math.cos(s);
    return {
      resepti: 'kivikehys', paikka: [r3(x), r3(py + a.y), r3(z)], suunta: r3(seina.suunta + (puoli === 'taka' ? 180 : 0)),
      leveys: a.leveys, korkeus: r3(ovi ? a.korkeus - kaari : a.korkeus), kaari: ovi ? kaari : 0,
      kivi: ovi ? 0.28 : 0.22, syvyys: ovi ? 0.06 : 0.04, siemen: siemen * 100 + i,
    };
  });
}

// Seinä → resepti 'sokkelikivet' seinän juureen huoneen puolelle (Thief-vertailun #4: kiviaineksen kohokuva seinien reunoissa)
// ja kynnyskivi jokaiseen oveen (aukko lattiatasossa). Puolella 'taka' kehys kääntyy 180°, joten aukkojen u peilataan.
// `lattia` = lattian korkeus, jos seinä alkaa lattian alta (keittiön kehämuuri y −0,5).
export function sokkeliSeinasta(seina, { puoli = 'taka', siemen = 1, korkeus = 0.4, ulkonema = 0.1, lattia } = {}) {
  const s = seina.suunta * RAD, [px, py, pz] = seina.paikka, m = puoli === 'taka' ? -1 : 1, wPinta = m * seina.paksuus / 2;
  const ovet = (seina.aukot ?? []).filter((a) => a.y < 0.01).map((a) => [r3(m * a.u - a.leveys / 2), r3(m * a.u + a.leveys / 2)]);
  return {
    resepti: 'sokkelikivet', paikka: [r3(px + wPinta * Math.sin(s)), lattia ?? py, r3(pz - wPinta * Math.cos(s))], suunta: r3(seina.suunta + (puoli === 'taka' ? 180 : 0)),
    pituus: seina.pituus, korkeus, ulkonema, siemen,
    valit: ovet.map(([a, b]) => [r3(a - 0.05), r3(b + 0.05)]),
    kynnykset: ovet.map(([a, b]) => ({ u0: a, u1: b, syvyys: seina.paksuus })),
  };
}
