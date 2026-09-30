// OLAVINLINNA / tunnelma: iltahämärän rekvisiitta kuoren päälle (omistajan pyyntö 29.9. Päätoimittajan kautta):
// seinäsoihdut pihoille ja portille, lyhdyt pihoille ja laiturille, liput torneihin, veneet laituriin, piippujen savu
// ja lokit. Ei kohdistettava eikä kiertueella. Paikat MITATTU kuoresta (tools/dioraama/blender/kuori_seinapiste.py,
// kuori_korkeudet.py): alla Blender-koordinaatit (x itä, y pohjoinen, z ylös) → glTF (x, z, −y).
// Siirtosepän sopimus 29.9.: liekki:NN (koko = korkeus m), savu:NN {leveys, korkeus, voima, vari}, lokit:NN
// {maara, sade, korkeus}; liput samassa meshissä pinnalla "lippu".

const g = (bx, by, bz) => [bx, bz, -by];
const RAD = Math.PI / 180;
const r3 = (v) => Math.round(v * 1000) / 1000;

// Seinäsoihdut: [osuma x, y, z (Blender), säteen suunta] → soihtu katsoo säteen lähtöpisteeseen (suunta + 180).
const SOIHDUT = [
  [-23.0, -4.54, -0.6, 0], [-16.15, -15.85, -0.6, 135], [-23.0, -14.17, -0.6, 180], [-29.34, -9.0, -0.6, 270],
  [-17.45, -3.45, -0.6, 45], // Pieni linnanpiha
  [-40.0, -3.7, 5.2, 0], [-35.41, -8.0, 5.2, 90], [-46.35, -1.65, 5.2, 315], // Kellotornin piha
  [-56.59, -14.59, -3.6, 45], [-55.35, -28.65, -3.6, 135], // laiturin portti
  [12.0, 9.05, 0.5, 0], [19.37, -11.37, 0.5, 135], [6.39, -9.61, 0.5, 225], [3.64, -4.0, 0.5, 270],
  [16.39, 11.61, 0.5, 315], [37.1, -9.1, 0.5, 135], [28.0, -13.1, 0.5, 180], // iso linnanpiha
  [-45.0, -46.37, -2, 0], [-30.0, -40.27, -2, 0], [0.0, -31.3, -2, 0], [15.0, -39.56, -2, 0], [30.0, -47.02, -2, 0],
  [76.58, 0.0, -2, 270], [91.28, 15.0, -2, 270], // ulkomuurit kameraan päin (etelä, itä), 5 m vedestä
];
// Lyhdyt tolpissa: [x, y, maa z].
const LYHDYT = [[-23, -9, -3.01], [12, -4, -1.71], [28, 0, -2.1], [-40, -8, 2.82], [-70, -19.5, -5.87], [-63, -21, -5.91]];
// Liput tornien huippuihin: [x, y, huippu z].
const LIPUT = [[-44.4, 4.6, 34.55], [-15.4, 14.6, 32.3], [47, 39, 25.3]];
// Veneet ponttonilaiturin kupeessa (vesi −7): [x, y, suunta].
const VENEET = [[-74, -9.5, 130], [-60, -29, 130], [-67.5, -14, 132]];
// Piippujen savu katoilta: [x, y, katon z].
const SAVUT = [[-3.6, 9.1, 10.88], [1.2, 17.8, 12.28], [8.1, 12.1, 9.97], [-2.1, -4.4, 6.84]];

const palikat = [];
const liekit = [];
const valot = [];
SOIHDUT.forEach(([x, y, z, s], i) => {
  const f = (s + 180) % 360;
  const dx = Math.sin(s * RAD) * 0.05, dy = Math.cos(s * RAD) * 0.05; // kiinnike 5 cm seinästä
  const kiinni = g(r3(x - dx), r3(y - dy), z);
  palikat.push({ resepti: 'seinasoihtu', paikka: kiinni, suunta: f });
  const ulos = [Math.sin(f * RAD) * 0.26, -Math.cos(f * RAD) * 0.26];
  const liekki = [r3(kiinni[0] + ulos[0]), r3(kiinni[1] + 0.47), r3(kiinni[2] + ulos[1])];
  liekit.push({ liekki: 'soihtu', paikka: liekki, koko: 1, vaihe: (i * 0.37) % 1 });
  valot.push({ paikka: liekki, sade: 9, voima: 1.6, vari: '#ff9848', lepatus: 0.3 });
});
LYHDYT.forEach(([x, y, z], i) => {
  palikat.push({ resepti: 'lyhty', paikka: g(x, y, z), suunta: (i * 67) % 360, korkeus: 2.2 });
  const s = ((i * 67) % 360) * RAD;
  const p = g(r3(x + Math.sin(s) * 0.45), r3(y + Math.cos(s) * 0.45), r3(z + 1.89));
  liekit.push({ liekki: 'kynttila', paikka: p, koko: 1.8, vaihe: (i * 0.53) % 1 });
  valot.push({ paikka: p, sade: 7, voima: 0.9, vari: '#ffb060', lepatus: 0.15 });
});
LIPUT.forEach(([x, y, z]) => palikat.push({ resepti: 'lippu', paikka: g(x, y, z - 0.2), suunta: 90, korkeus: 3, leveys: 1.2, lippu: 0.8 }));
VENEET.forEach(([x, y, s]) => palikat.push({ resepti: 'vene', paikka: g(x, y, -7.25), suunta: s, pituus: 5, leveys: 1.5, korkeus: 0.6 }));
const savut = SAVUT.map(([x, y, z]) => ({ paikka: g(x, y, z + 0.8), leveys: 0.5, korkeus: 6, voima: 0.5, vari: '#8a8580' }));
// Lokit: parvi järven yllä linnan eteläpuolella ja pihan yllä.
const lokit = [
  { paikka: g(0, -55, 8), maara: 6, sade: 18, korkeus: 6 },
  { paikka: g(15, 0, 20), maara: 3, sade: 10, korkeus: 4 },
];

export const TILA = {
  id: 'tunnelma',
  nimi: 'Iltatunnelma',
  kohdistettava: false,
  rajat: { min: [-80, -8, -45], max: [60, 40, 60] },
  naapurit: ['massa'],
  valot,
  palikat,
  liekit,
  savut,
  lokit,
};
