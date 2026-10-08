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
