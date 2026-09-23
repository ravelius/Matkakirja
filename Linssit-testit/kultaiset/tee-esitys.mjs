// Ihmisen matkan esityksen kaavojen kultaiset arvot (js/linssit/ihmisen-matka-esitys.js,
// -tutkimus.js, js/aikajana-vanat.js). Käyttö: node tee-esitys.mjs [pelin checkout]
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const juuri = process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-linssiseppa';
const E = await import(join(juuri, 'js/linssit/ihmisen-matka-esitys.js'));
const T = await import(join(juuri, 'js/linssit/ihmisen-matka-tutkimus.js'));
const V = await import(join(juuri, 'js/aikajana-vanat.js'));
const K = await import(join(juuri, 'js/linssit/ihmisen-matka-kertomus.js'));

const avaus = [
  { lauseet: [0, 3200, 6000], sana: 5400, kesto: 9000 },
  { lauseet: [], sana: null, kesto: 4000 },
  { lauseet: [0], sana: 12000, kesto: 20000 },
  { lauseet: [0, 900], sana: 1500, kesto: 2500 },
].map((s) => ({ ...s, tulos: E.avauksenVaiheet(s) }));
const kaaret = [0, 0.1, 0.3, 0.5, 0.79, 0.8, 0.81, 0.95, 1].map((t) => [t, E.marokonPehmennys(t), E.marokonKaari(t), E.kelauksenPehmennys(t)]);
const kertomus = K.IHMISEN_MATKA_KERTOMUS;
const tahdit = kertomus.map((_, i) => E.jaksonTahti(kertomus, i));
const vuosia = kertomus.map((j) => (Number.isFinite(Number(j.vuosia)) ? Number(j.vuosia) : null));
const vaiheet = kertomus.map((j) => j.vaihe ?? null);
// Synteettiset vanat: selkäranka Afrikasta Aasiaan, haara Eurooppaan, antimeridiaanin ylittävä.
const vanat = [
  { pisteet: [[9, 38, 70000], [15, 45, 65000], [25, 60, 55000], [20, 80, 50000], [10, 100, 45000]] },
  { pisteet: [[30, 35, 50000], [40, 25, 45000], [48, 10, 40000]] },
  { pisteet: [[20, 170, 3000], [15, -175, 2000], [-10, -150, 1000]] },
];
const karjet = [];
for (const v of vanat) for (const nyt of [80000, 70000, 60000, 52000, 47000, 3000, 2500, 1200, 500]) {
  for (const ennakko of [0, 0.1]) karjet.push({ nyt, ennakko, k: V.karkiHetkella(v.pisteet, nyt, { ennakko }) });
}
const rajaukset = [
  { kohde: { lat: 9, lon: 38 }, alku: 70000, loppu: 50000 },
  { kohde: { lat: 30, lon: 35 }, alku: 50000, loppu: 42000 },
  { kohde: { lat: 18, lon: 175 }, alku: 3000, loppu: 1000 },
  { kohde: { lat: 18, lon: 175 }, alku: 3000, loppu: 3000 },
  { kohde: { lat: 9, lon: 38 }, alku: 70000, loppu: 50000, pitoMin: 60000 },
].map((s) => {
  const r = E.jaksonRajaus({ ...s, vanat });
  return { ...s, rajaus: r.rajaus, karjet: r.karjet, leveys: T.rajauksenLeveys(r.rajaus, 0.46), leveys2: T.rajauksenLeveys(r.rajaus, 2.1) };
});
const ulos = { avaus, kaaret, tahdit, vuosia, vaiheet, vanat: vanat.map((v) => v.pisteet), karjet, rajaukset };
writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'esitys.json'), JSON.stringify(ulos));
console.log('esitys.json:', avaus.length, 'avausta,', tahdit.length, 'jaksoa,', karjet.length, 'kärkeä');
