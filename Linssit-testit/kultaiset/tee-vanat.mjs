// Vanojen piirron kultaiset arvot verkkopelin koodista (js/aikajana-vanat.js).
//
// Kaksi osaa:
//   1. PUHTAAT FUNKTIOT sellaisinaan (matkaHetkella, karjenPaino, leveyskerroin,
//      kaistanLeveysKm, vahimmaisleveysKm, rantamaskinRuutu, etaisyysMaahan,
//      merisyys, karkiMerella, lineaariseksi, kotipesanRengas) otospisteissä.
//   2. OIKEA luoVanat valepallolla: three-luokat ovat tässä tiedostossa
//      olevia pieniä vaelluokkia (luoVanat lukee ne elävästä pallosta
//      prototyyppiketjuna, ks. line2Luokat ja kolmiulotteinen), joten
//      instanssipuskuri ja uniformit tulevat verkkopelin omasta koodista.
//      Paivita/korosta-sarjan jälkeen talteen uKuljettu, uVanaPeitto,
//      uVanha, uKirkas, uNyt, uRintama, uPito sekä kotipesien näkyvyys.
//
// Vanat luetaan virrat-kultaiset.json:sta (tee-kultaiset.mjs; C#-testit
// varmistavat, että Vanat.JohdaVanat antaa samat). Rantamaski kopioidaan
// sisältöpaketin kokoelmasta linssiaineisto.json (alkio "rantamaski")
// tiedostoon rantamaski.json, ja sen juoksujen on oltava samat kuin
// verkkopelin js/linssit/ihmisen-matka-rantamaski.js:n.
//
// Käyttö: node Linssit-testit/kultaiset/tee-vanat.mjs [pelin checkout] [sisältöpaketti]
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const TAMA = dirname(fileURLToPath(import.meta.url));
const JUURI = process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-linssiseppa';
const PAKETTI = process.argv[3] ?? '/Users/Shared/Claude/sisalto-koe/v2';
const tuo = (nimi) => import(pathToFileURL(join(JUURI, nimi)).href);

const V = await tuo('js/aikajana-vanat.js');
const L = await tuo('js/aikajana-virrat-laskenta.js');
const K = await tuo('js/pallolauta/kamera.js');
const { RANTAMASKI } = await tuo('js/linssit/ihmisen-matka-rantamaski.js');

/* ------------------------------------------------------- rantamaski */

const kokoelma = JSON.parse(readFileSync(join(PAKETTI, 'kokoelmat/linssiaineisto.json'), 'utf8'));
const rantaAlkio = kokoelma.alkiot.find((a) => a.id === 'rantamaski');
if (!rantaAlkio) throw new Error('linssiaineisto.json: alkio rantamaski puuttuu');
if (rantaAlkio.data.juoksut !== RANTAMASKI.juoksut) throw new Error('sisältöpaketin rantamaski ≠ verkkopelin RANTAMASKI');
writeFileSync(join(TAMA, 'rantamaski.json'), JSON.stringify(rantaAlkio) + '\n');

const virrat = JSON.parse(readFileSync(join(TAMA, 'virrat-kultaiset.json'), 'utf8')).vanat;
const aineisto = JSON.parse(readFileSync(join(TAMA, 'virrat-aineisto.json'), 'utf8'));
const kaista = aineisto.vanat.kaista;
const maa = L.puraMaamaski(RANTAMASKI.juoksut, RANTAMASKI.leveys * RANTAMASKI.korkeus);
const mm = aineisto.maamaski;
const kulku = { maa: L.puraMaamaski(mm.juoksut, mm.leveys * mm.korkeus), leveys: mm.leveys, korkeus: mm.korkeus };

/* Deterministinen LCG (otokset tallennetaan, C# ei toista sitä). */
let lcg = 20260923;
const satu = () => { lcg = (Math.imul(lcg, 1664525) + 1013904223) >>> 0; return lcg / 4294967296; };
const valille = (a, b) => a + (b - a) * satu();

/* ------------------------------------------------- 1. puhtaat funktiot */

const vakiot = {
  KAISTAN_PEITTO: V.KAISTAN_PEITTO, KAISTAN_LEVEYS_KM: V.KAISTAN_LEVEYS_KM, KAISTAN_MERI_KERROIN: V.KAISTAN_MERI_KERROIN,
  KAISTAN_MIN_PX: V.KAISTAN_MIN_PX, KAISTAN_MERI_MIN_PX: V.KAISTAN_MERI_MIN_PX, KAISTAN_PEHMENNYS_KM: V.KAISTAN_PEHMENNYS_KM,
  KAISTAN_PEHMENNYS_PX: V.KAISTAN_PEHMENNYS_PX, KAISTAN_KERROIN_RAJAT: V.KAISTAN_KERROIN_RAJAT,
  KAISTAN_ALUEEN_PEHMEYS: V.KAISTAN_ALUEEN_PEHMEYS, KAISTAN_MERI_RAJAT_KM: V.KAISTAN_MERI_RAJAT_KM,
  RANTAMASKIN_KYNNYS: V.RANTAMASKIN_KYNNYS, VANAN_ENNAKKO: V.VANAN_ENNAKKO, VANAN_ENNAKKO_MAX_AST: V.VANAN_ENNAKKO_MAX_AST,
  VANAN_ASKEL_MS: V.VANAN_ASKEL_MS, KAISTAN_PITO_VARA: V.KAISTAN_PITO_VARA, KOTIPESAN_KARKIA: V.KOTIPESAN_KARKIA,
  KOTIPESAN_LEVEYS_PX: V.KOTIPESAN_LEVEYS_PX, KOTIPESAN_PEITTO: V.KOTIPESAN_PEITTO, KOROSTUKSEN_HEHKU: V.KOROSTUKSEN_HEHKU,
  KOROSTUKSEN_VAIMEA: V.KOROSTUKSEN_VAIMEA, MAAPALLON_SADE_KM: V.MAAPALLON_SADE_KM, KAISTAN_VANOJA_MAX: V.KAISTAN_VANOJA_MAX,
  KAISTAN_VIRTOJA_MAX: V.KAISTAN_VIRTOJA_MAX, VANAN_KORKEUS: V.VANAN_KORKEUS,
};

// matkaHetkella: selkärangan oikea matka (kumulatiivinen km-jänne) ja ajat.
const selka = virrat.vanat[0].pisteet;
const selkaMatka = [0];
for (let k = 1; k < selka.length; k += 1) {
  selkaMatka.push(selkaMatka[k - 1] + L.vananPituusKm([{ lat: selka[k - 1][0], lon: selka[k - 1][1] }, { lat: selka[k][0], lon: selka[k][1] }]));
}
const selkaAika = selka.map((p) => p[2]);
const matkaNyt = [];
for (const nyt of [400000, selkaAika[0], selkaAika[0] - 1, 250000, 120000, 75000, 60000, 45000, 20000, 15000, 14500,
  selkaAika[selka.length - 1], 0, ...Array.from({ length: 40 }, () => valille(0, 320000))]) {
  matkaNyt.push([nyt, V.matkaHetkella(selkaMatka, selkaAika, nyt)]);
}
const matkaErikois = [
  [[0, 5], [100, 100], 100, V.matkaHetkella([0, 5], [100, 100], 100)],
  [[0], [100], 50, V.matkaHetkella([0], [100], 50)],
  [[0, 3, 7], [100, 50, 50], 50, V.matkaHetkella([0, 3, 7], [100, 50, 50], 50)],
  [[0, 3, 7], [100, 50, 10], 30, V.matkaHetkella([0, 3, 7], [100, 50, 10], 30)],
];

const paino = [];
for (let i = 0; i < 60; i += 1) {
  const nyt = valille(0, 300000);
  const rintama = L.rintamanLeveys(nyt);
  const aika = nyt + valille(-2, 1.3) * rintama;
  paino.push([aika, nyt, rintama, V.karjenPaino(aika, nyt, rintama), V.karjenPaino(aika, nyt, rintama, { pito: true })]);
}
// Pitovaran raja tarkalleen ja reunat.
for (const [aika, nyt, r] of [[1000, 1000, 600], [1000, 1012, 600], [1000, 1012.0001, 600], [0, 10, 600], [100, 10, 0], [5, 5, 1]]) {
  paino.push([aika, nyt, r, V.karjenPaino(aika, nyt, r), V.karjenPaino(aika, nyt, r, { pito: true })]);
}

const pisteet = [];
for (let i = 0; i < 400; i += 1) pisteet.push([valille(-80, 85), valille(-180, 180)]);
// Kaistan alueiden reunat, antimeridiaani (Beringia) ja salmet.
pisteet.push([65.7, -168.8], [66, 179.5], [60, -175], [-8.5, 116], [26.5, 56.3], [12.6, 43.3], [36, -5.6], [0, 0], [89.99, 10], [-89.99, -170]);
for (const v of virrat.vanat) for (let k = 0; k < v.pisteet.length; k += 7) pisteet.push([v.pisteet[k][0], v.pisteet[k][1]]);
const kaistat = pisteet.map(([lat, lon]) => [lat, lon,
  V.leveyskerroin(lat, lon, kaista.alueet),
  V.kaistanLeveysKm(lat, lon, kaista),
  V.rantamaskinRuutu(lat, lon, RANTAMASKI),
  (() => { const d = V.etaisyysMaahan(lat, lon, maa, RANTAMASKI); return Number.isFinite(d) ? d : -1; })(),
  V.merisyys(lat, lon, maa, RANTAMASKI, V.KAISTAN_MERI_RAJAT_KM, null),
  V.merisyys(lat, lon, maa, RANTAMASKI, V.KAISTAN_MERI_RAJAT_KM, kulku),
  V.karkiMerella(lat, lon, maa, RANTAMASKI, kulku) ? 1 : 0,
  (() => { const d = V.etaisyysMaahan(lat, lon, maa, RANTAMASKI, 300); return Number.isFinite(d) ? d : -1; })(),
]);
const kerroinOmat = [
  [10, 40, [{ lat: [0, 20], lon: [30, 50], kerroin: 2, pehmeys: 1 }], V.leveyskerroin(10, 40, [{ lat: [0, 20], lon: [30, 50], kerroin: 2, pehmeys: 1 }])],
  [0.5, 40, [{ lat: [0, 20], lon: [30, 50], kerroin: 0.1 }], V.leveyskerroin(0.5, 40, [{ lat: [0, 20], lon: [30, 50], kerroin: 0.1 }])],
  [10, 40, [{ lat: [0, 20], lon: [30, 50], kerroin: 9 }], V.leveyskerroin(10, 40, [{ lat: [0, 20], lon: [30, 50], kerroin: 9 }])],
];
const vahimmais = [[0.5, 7], [12.3, 7], [3, 3], [0, 7], [-1, 7]].map(([k, px]) => [k, px, V.vahimmaisleveysKm(k, px)]);
const lineaari = []; for (let c = -5; c <= 260; c += 5) lineaari.push([c, V.lineaariseksi(c)]);
lineaari.push([10.3, V.lineaariseksi(10.3)], [217.9, V.lineaariseksi(217.9)]);
const renkaat = [[31.855, -8.8725, 350, 24], [4.8004, 35.9671, 350, 24], [-34.2078, 22.0894, 300, 24], [85, 178, 900, 12], [0, -179.9, 500, 8]]
  .map(([lat, lon, s, n]) => ({ lat, lon, sade: s, karkia: n, pisteet: V.kotipesanRengas(lat, lon, s, n) }));

/* ------------------------------------------------- 2. luoVanat valepallolla */

class Vector2 { constructor(x = 0, y = 0) { this.x = x; this.y = y; } set(x, y) { this.x = x; this.y = y; return this; } }
class Vector3 { constructor() { this.x = 0; this.y = 0; this.z = 0; } }
class Matrix4 { }
class ShaderMaterial { constructor(o = {}) { Object.assign(this, o); ShaderMaterial.kaikki.push(this); } dispose() {} }
ShaderMaterial.kaikki = [];
class LineMaterial extends ShaderMaterial {
  constructor(o = {}) {
    super({});
    this.resolution = new Vector2();
    this.color = { tyyli: null, setStyle(s) { this.tyyli = s; } };
    Object.assign(this, o);
  }
}
class InstancedInterleavedBuffer { constructor(array, stride) { this.array = array; this.stride = stride; } }
class InterleavedBufferAttribute { constructor(data, size, offset) { this.data = data; this.itemSize = size; this.offset = offset; } }
class InstancedBufferGeometry {
  constructor() { this.attributes = {}; }
  setAttribute(n, a) { this.attributes[n] = a; return this; }
  getAttribute(n) { return this.attributes[n]; }
  setIndex(i) { this.index = i; }
  dispose() {}
}
class LineSegmentsGeometry extends InstancedBufferGeometry {
  setPositions(a) { this.paikat = a; this.setAttribute('instanceStart', new InterleavedBufferAttribute(new InstancedInterleavedBuffer(a, 6), 3, 0)); }
}
class LineGeometry extends LineSegmentsGeometry { }
class LineSegments2 { constructor(g, m) { this.geometry = g; this.material = m; this.type = 'Line2'; this.visible = true; } computeLineDistances() {} }
class Line2 extends LineSegments2 { }
class BufferGeometry { }
class SphereGeometry extends BufferGeometry { constructor() { super(); this.attributes = { position: new BufferAttribute([], 3) }; } }
class BufferAttribute { constructor(a, n) { this.array = a; this.itemSize = n; } }
class Texture { dispose() {} }
class Mesh {
  constructor(g, m) { this.geometry = g; this.material = m; this.matrixWorld = new Matrix4(); this.position = new Vector3(); this.visible = true; }
}
const ryhma = { lapset: [], add(o) { this.lapset.push(o); o.parent = this; }, remove() {} };
const moottori = {
  thresholds: [], updatePov() {}, parent: ryhma,
  children: [new Mesh(new SphereGeometry(), { type: 'MeshLambertMaterial', map: new Texture() })],
};
const malliviiva = new Line2(new LineGeometry(), new LineMaterial());
const scene = { traverse(f) { f(malliviiva); f(moottori); } };
const KORKEUS = 1.5;
const pallo = { getGlobeRadius: () => 100, scene: () => scene, pointOfView: () => ({ altitude: KORKEUS }) };
const kotelo = { clientWidth: 1000, clientHeight: 800 };

const kahva = V.luoVanat({
  pallo, kotelo, vanat: virrat.vanat, kotipesat: virrat.kotipesat, virrat: aineisto.virrat, kaista, maamaski: mm,
});
if (!(await kahva.valmis)) throw new Error('luoVanat ei valmistunut: ' + kahva.tila().syy);
const materiaali = ShaderMaterial.kaikki.find((m) => m.uniforms?.uKuljettu);
const u = materiaali.uniforms;
const verkko = ryhma.lapset.find((o) => o instanceof Mesh);
const puskuri = verkko.geometry.attributes.iP0.data.array;
const LEVEYS = verkko.geometry.attributes.iP0.data.stride;
const janoja = verkko.geometry.instanceCount;
const renkaatOliot = ryhma.lapset.filter((o) => o instanceof Line2);

// Otos janoista: joka neljäs sekä jokaisen vanan ensimmäinen ja viimeinen.
const otos = new Set();
for (let j = 0; j < janoja; j += 4) otos.add(j);
{
  let j = 0;
  for (const v of virrat.vanat.slice(0, V.KAISTAN_VANOJA_MAX)) {
    if (v.pisteet.length < 2) continue;
    otos.add(j); j += v.pisteet.length - 1; otos.add(j - 1);
  }
}
const janat = [...otos].sort((a, b) => a - b).map((j) => [j, Array.from(puskuri.subarray(j * LEVEYS, (j + 1) * LEVEYS))]);

const kmPx = (K.asteetLeveydesta(K.leveysKorkeudesta(KORKEUS, { kuvasuhde: 1 })) * L.KM_ASTEELLA) / kotelo.clientWidth;
const mitat = {
  kmPx, sade: u.uSade.value, minPuoli: u.uMinPuoli.value, minPuoliMeri: u.uMinPuoliMeri.value,
  pehmennys: u.uPehmennys.value, meriKerroin: u.uMeriKerroin.value, peitto: u.uPeitto.value,
};

// Paivita/korosta-sarja: kasvu, kelaus taaksepäin ilman pitoa ja pidolla, korostus.
const sarja = [];
const kirjaa = (komento, arvo, tulos) => {
  sarja.push({
    komento, arvo, tulos,
    nyt: u.uNyt.value, rintama: u.uRintama.value, pito: u.uPito.value,
    kuljettu: Array.from(u.uKuljettu.value), peitto: Array.from(u.uVanaPeitto.value),
    vanha: Array.from(u.uVanha.value), kirkas: Array.from(u.uKirkas.value),
    nakyva: verkko.visible,
    pesat: renkaatOliot.map((o) => [o.visible, o.material.opacity]),
    karki: kahva.karki(arvo?.nyt ?? 0),
    karkiIlman: kahva.karki(arvo?.nyt ?? 0, { ennakko: 0 }),
  });
};
const kutsut = [
  ['paivita', { nyt: 320000 }], ['paivita', { nyt: 300000 }], ['paivita', { nyt: 250000 }], ['paivita', { nyt: 250000 }],
  ['paivita', { nyt: 110000 }], ['paivita', { nyt: 75000 }], ['paivita', { nyt: 110000 }],
  ['paivita', { nyt: 75000, pito: true }], ['paivita', { nyt: 110000, pito: true }], ['paivita', { nyt: 50000, pito: true }],
  ['korosta', { virta: 'eurooppa' }], ['paivita', { nyt: 40000, pito: true }], ['korosta', { virta: 'paavirta' }],
  ['paivita', { nyt: 17000 }], ['paivita', { nyt: 15500 }], ['korosta', { virta: 'tyynimeri', vaimea: 0.2, hehku: 0.9 }],
  ['paivita', { nyt: 14000 }], ['paivita', { nyt: 12000 }], ['korosta', { virta: null }],
  ['paivita', { nyt: 2000 }], ['paivita', { nyt: 0 }], ['paivita', { nyt: -1 }], ['paivita', { nyt: 180000, pito: true }],
  ['paivita', { nyt: 250000, pito: false }],
];
for (const [komento, arvo] of kutsut) {
  const tulos = komento === 'paivita'
    ? kahva.paivita(arvo.nyt, { pito: Boolean(arvo.pito) })
    : kahva.korosta(arvo.virta, { ...(arvo.vaimea != null ? { vaimea: arvo.vaimea } : {}), ...(arvo.hehku != null ? { hehku: arvo.hehku } : {}) });
  kirjaa(komento, arvo, tulos);
}

const ulos = {
  vakiot, matkaNyt, matkaErikois, selkaMatka, paino, kaistat, kerroinOmat, vahimmais, lineaari, renkaat,
  piirto: {
    leveys: LEVEYS, janoja, janat, mitat, tila: kahva.tila(),
    pesat: renkaatOliot.map((o) => ({ paikat: Array.from(o.geometry.paikat), tyyli: o.material.color.tyyli, leveys: o.material.linewidth })),
    sarja,
  },
};
writeFileSync(join(TAMA, 'vanat.json'), JSON.stringify(ulos));
console.log(`vanat.json: ${janoja} janaa (otos ${janat.length}), ${kaistat.length} kaistapistettä, ${sarja.length} kutsua; rantamaski.json`);
