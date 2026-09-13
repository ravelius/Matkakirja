import { FOKUS_LAUTAPROJEKTIOT } from '/home/user/Matkakirja/js/packs/fokus-grc.js';
const RAD = Math.PI / 180;
function kaavat(lauta) {
  const p = FOKUS_LAUTAPROJEKTIOT[lauta];
  if (p.tyyppi === 'miller') {
    const skaala = p.leveys / (2 * Math.PI);
    const millerY = (lat) => -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RAD));
    const yPohjoinen = millerY(p.pohjoinen);
    const kierros = 2 * Math.PI;
    return {
      x: (lon) => ((((lon - p.lon0) * RAD % kierros) + kierros) % kierros) * skaala,
      y: (lat) => (millerY(lat) - yPohjoinen) * skaala,
    };
  }
  return { x: (lon) => p.lonA * lon + p.lonB, y: (lat) => p.latA * lat + p.latB };
}
const mk = kaavat('maailmankartta'); const eu = kaavat('europe');
const pisteet = process.argv.slice(2).map((s) => s.split(','));
for (const [nimi, lat, lon] of pisteet) {
  const la = Number(lat); const lo = Number(lon);
  console.log(`${nimi}: maailmankartta { x: ${mk.x(lo).toFixed(1)}, y: ${mk.y(la).toFixed(1)} }, europe { x: ${eu.x(lo).toFixed(1)}, y: ${eu.y(la).toFixed(1)} }`);
}
