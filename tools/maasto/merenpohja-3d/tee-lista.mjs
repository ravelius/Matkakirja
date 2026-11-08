// Koealueen laattalista (KS 8.11.2026): z0–6 koko maailma, z7–9 koelaatikot. node tee-lista.mjs <wt> > lista.txt
const { tasonLaatat } = await import(`${process.argv[2]}/tools/maasto/tee-maasto.mjs`);
const LAATIKOT = {
  'puerto-rico-atlantti': [-72, 8, -25, 32], mariaanit: [138, 8, 152, 24], 'biskaja-irlanti': [-20, 42, 0, 58],
  kuollutmeri: [34.5, 30.5, 36.5, 32.5], alankomaat: [3, 51, 7.5, 54], kaspia: [46, 36, 55, 48], himalaja: [76, 26, 92, 36],
};
const rivit = new Set();
for (let z = 0; z <= 9; z += 1) {
  const alueet = z <= 6 ? [[-180, -90, 180, 90]] : Object.values(LAATIKOT);
  for (const a of alueet) {
    const t = tasonLaatat(z, a);
    for (let x = t.x0; x <= t.x1; x += 1) for (let y = t.y0; y <= t.y1; y += 1) rivit.add(`${z} ${x} ${y}`);
  }
}
process.stdout.write([...rivit].join('\n') + '\n');
console.error(JSON.stringify(LAATIKOT), rivit.size);
