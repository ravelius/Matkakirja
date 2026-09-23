// Aikajanan liekkivalojen kultaiset arvot (js/aikajana-valo.js).
// Käyttö: node Linssit-testit/kultaiset/tee-valot.mjs [pelin checkout]
//
// Puhtaat funktiot kutsutaan suoraan. Liukuvärin pysäkit ja piirron vedot
// luetaan webin omasta koodista tynkäcanvasin kautta (luoLiekkivalot +
// piirraValo): tynkä kirjaa addColorStop-, drawImage- ja lineTo-kutsut.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const juuri = process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-linssiseppa';
const V = await import(join(juuri, 'js/aikajana-valo.js'));

/* ---------------------------------------------------------- tynkäcanvas */
let kirjaus = null;
function tynka() {
  const ctx = {
    globalAlpha: 1,
    globalCompositeOperation: 'source-over',
    fillStyle: null,
    scale() {}, fillRect() {}, clearRect() {}, save() {}, restore() {}, beginPath() {}, closePath() {}, clip() {},
    createRadialGradient() {
      const pysakit = [];
      if (kirjaus) kirjaus.gradientit.push(pysakit);
      return { addColorStop: (o, c) => pysakit.push([o, c]) };
    },
    moveTo(x, y) { kirjaus?.polku.push([x, y]); },
    lineTo(x, y) { kirjaus?.polku.push([x, y]); },
    drawImage(_k, x, y, w, h) { kirjaus?.vedot.push({ x, y, w, h, alfa: ctx.globalAlpha, tapa: ctx.globalCompositeOperation }); },
  };
  return { width: 0, height: 0, style: {}, getContext: () => ctx };
}
const uusiKirjaus = () => ({ gradientit: [], polku: [], vedot: [] });

/* ------------------------------------------------------ puhtaat funktiot */
const profiili = [-0.5, 0, 0.01, 0.05, 0.1, 0.2, 0.33, 0.5, 0.75, 0.99, 1, 1.5, NaN]
  .map((r) => ({ r: Number.isFinite(r) ? r : null, I: V.valonProfiili(r) }));
const siemenet = [0, 1, 2, 3, 5, 24, 25, 99, -3, 3.7, 1234567, 5e6].map((n) => [n, V.valonSiemen(n)]);
const arpojat = [0, 1, 42, 2654435761, 4294967290].map((s) => {
  const a = V.valonArpoja(s);
  return { s, luvut: Array.from({ length: 12 }, () => a()) };
});
const kohina = [];
for (const s of [0, 1, 2654435761, 4294967290]) {
  for (const x of [-3.7, -1, 0, 0.25, 0.5, 0.999, 1, 2.3, 17.5, 64.01, 1234.567]) kohina.push({ x, s, k: V.valonKohina(x, s) });
}
const variaatiot = Array.from({ length: 41 }, (_, n) => V.valonVariaatio(n));
const syttyma = [];
for (const rm of [false, true]) {
  for (const ms of [-10, 0, 1, 50, 150, 299, 300, 301, 600, 900, 1199, 1200, 5000]) {
    syttyma.push({ ms, rm, ...V.syttymisenVaihe(ms, rm) });
  }
}
const syke = [];
const liekki = [];
for (const n of [0, 1, 7, 13, 24]) {
  const v = V.valonVariaatio(n);
  for (const ms of [0, 16.7, 333, 1000, 2500, 12345.6, 600000]) {
    syke.push({ n, ms, ...V.sykkeenTila(ms, v) });
    for (const kulma of [0, 0.3, 1, Math.PI / 2, 2.5, Math.PI, 4, 5.5, 6.2]) {
      liekki.push({ n, ms, kulma, s: V.liekinSade(kulma, ms, v), rm: V.liekinSade(kulma, ms, v, true) });
    }
  }
}
const savyt = [0, 0.25, 0.5, 0.731, 1, -0.2, 1.4].map((lampo) => ({ lampo, ...V.valonSavyt(lampo) }));

/* --------------------------------------------- liukuvärin pysäkit (web) */
const pysakit = [];
for (const n of [0, 4, 11]) {
  kirjaus = uusiKirjaus();
  const l = V.luoLiekkivalot({ luoCanvas: tynka, dpr: 1, kello: () => 1 });
  l.lamppu(n);
  const g = kirjaus.gradientit[0];
  pysakit.push({
    n,
    pysakit: g.map(([o, c]) => {
      const m = /rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/.exec(c);
      return [o, +m[1], +m[2], +m[3], +m[4]];
    }),
  });
  l.pura();
  kirjaus = null;
}

/* ---------------------------------------------------- tilat ja piirto */
const LAMPUT = [0, 3, 7, 12];
const TAPAHTUMAT = [
  { t: 1000, n: 0, palaa: true, nykyinen: true },
  { t: 4000, n: 0, palaa: true, nykyinen: false },
  { t: 4000, n: 3, palaa: true, nykyinen: true },
  { t: 4500, n: 7, palaa: true, nykyinen: false },
  { t: 6000, n: 3, palaa: true, nykyinen: false },
  { t: 6000, n: 12, palaa: true, nykyinen: true },
  { t: 6200, n: 0, palaa: false, nykyinen: false },
  { t: 9000, n: 12, palaa: true, nykyinen: true },
  { t: 9500, n: 0, palaa: true, nykyinen: false },
];
const PIIRROT = [900, 1000, 1001, 1100, 1299, 1300, 1301, 1700, 2199, 2200, 2500, 4000, 4100, 4800, 5600, 5700,
  6100, 6300, 7000, 9000, 9600, 10000, 20000, 123456.7];

function aja(reducedMotion) {
  let nyt = 0;
  const l = V.luoLiekkivalot({ luoCanvas: tynka, dpr: 1, kello: () => nyt, reducedMotion });
  for (const n of LAMPUT) l.lamppu(n);
  const ulos = [];
  const tapahtumat = [...TAPAHTUMAT];
  for (const t of PIIRROT) {
    while (tapahtumat.length && tapahtumat[0].t <= t) {
      const e = tapahtumat.shift();
      nyt = e.t;
      l.tila(e.n, e.palaa, e.nykyinen);
    }
    for (const n of LAMPUT) {
      const valo = l.valot.get(n);
      kirjaus = uusiKirjaus();
      V.piirraValo(tynka().getContext(), valo, t, { reducedMotion });
      const k = kirjaus;
      kirjaus = null;
      ulos.push({
        t, n,
        palaa: valo.palaa, nykyinen: valo.nykyinen, alkoi: valo.alkoi, sammui: valo.sammui,
        vedot: k.vedot.map((d) => ({ r: d.w / 2, keski: d.x + d.w / 2, alfa: d.alfa, tapa: d.tapa })),
        polku: k.polku.filter((_, i) => i % 4 === 0),
      });
    }
  }
  l.pura();
  return ulos;
}

const kultainen = {
  vakiot: { sade: V.VALON_SADE_PX, ruutu: V.VALON_RUUTU_PX, karkia: V.VALON_KARKIA, hiipuma: V.VALON_HIIPUMA_MS },
  profiili, siemenet, arpojat, kohina, variaatiot, syttyma, syke, liekki, savyt, pysakit,
  piirto: aja(false),
  piirtoRm: aja(true),
};
writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'valot.json'), JSON.stringify(kultainen));
console.log('valot.json', kultainen.piirto.filter((p) => p.vedot.length).length, 'piirtoa');
