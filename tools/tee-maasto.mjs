/*
 * Projisoi maaston maailmankartan koordinaatteihin.
 *
 *   node tools/tee-maasto.mjs [--kuiva]
 *
 * Lukee kaksi lon/lat-aineistoa
 *   js/packs/maasto-korkeus.js   korkeusvyöhykkeet (renkaat)
 *   js/packs/maasto-vedet.js     joet ja järvet
 * ja kirjoittaa niistä yhden laudan koordinaatteihin projisoidun
 * tiedoston js/packs/maailmankartta-maasto.js.
 *
 * --- miksi oma vaihe ---
 *
 * Aineisto on maantiedettä ja pysyy samana, vaikka lauta piirrettäisiin
 * uudelleen toisella projektiolla. Siksi asteet ja pikselit pidetään
 * erillään: hakutyökalut tuottavat asteita, tämä tekee pikseleitä.
 * Jos laudan nollakohta tai leveys joskus muuttuu, vain tämä ajetaan
 * uudelleen — aineistoa ei tarvitse hakea verkosta enää koskaan.
 *
 * --- sauma ---
 *
 * Kartta kiertää ympäri, joten sauman ylittävä joki tai vuoristo
 * pidetään yhtenäisenä muunnaViivalla. Ilman sitä Venäjän pohjoisrannan
 * joet ja Tšukotkan ylängöt piirtyisivät vaakaviivana halki kartan.
 *
 * Renkaille tehdään lisäksi kierron kopio: monikulmio, joka jää sauman
 * yli roikkumaan, on täytettävä myös laudan toisella laidalla.
 */
import { writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { sovitaMaailma } from './vanha-maailma.mjs';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const kuiva = process.argv.includes('--kuiva');
const luku = (n) => Number(n.toFixed(1));

const { MAAILMANKARTTA } = await import(`file://${join(JUURI, 'js/packs/maailmankartta.js')}`);
const LEVEYS = MAAILMANKARTTA.map.width;

const lue = async (tiedosto, vienti) => {
  const polku = join(JUURI, 'js/packs', tiedosto);
  if (!existsSync(polku)) {
    console.log(`  ${tiedosto} puuttuu — ohitetaan`);
    return null;
  }
  const moduuli = await import(`file://${polku}`);
  return moduuli[vienti] ?? null;
};

const korkeus = await lue('maasto-korkeus.js', 'KORKEUSVYOHYKKEET');
const joet = await lue('maasto-vedet.js', 'JOET');
const jarvet = await lue('maasto-vedet.js', 'JARVET');

if (!korkeus && !joet && !jarvet) {
  console.log('Ei yhtään maastoaineistoa. Aja ensin hakutyökalut.');
  process.exit(1);
}

// Sama sovitus kuin laudalla itsellään.
const { muunnaViiva } = sovitaMaailma({
  leveys: LEVEYS, lon0: -175, etela: -58, pohjoinen: 76,
});

/** Viiva laudan koordinaatteihin, sauma auki pidettynä. */
const viiva = (pisteet) => muunnaViiva(pisteet).map(([x, y]) => [luku(x), luku(y)]);

/*
 * Rengas laudalle. Jos rengas jää kokonaan tai osittain laudan
 * ulkopuolelle, siitä tehdään kopio toiselle laidalle: täyttö ei näy
 * kierron kopiossa, koska <use> toistaa vain sen mitä on piirretty.
 */
const rengas = (pisteet) => {
  const perus = viiva(pisteet);
  const xs = perus.map(([x]) => x);
  const ulos = [perus];
  if (Math.min(...xs) < 0) ulos.push(perus.map(([x, y]) => [luku(x + LEVEYS), y]));
  else if (Math.max(...xs) > LEVEYS) ulos.push(perus.map(([x, y]) => [luku(x - LEVEYS), y]));
  return ulos;
};

/*
 * Laudan ulkopuolelle jäävä muoto pois.
 *
 * Aineisto kattaa koko pallon, mutta lauta on rajattu leveysasteille
 * -58…76: Miller venyttää navat äärettömiin eikä siellä ole kaupunkeja.
 * Etelämanner projisoituu siis laudan alareunan ALAPUOLELLE ja piirtyi
 * silti — ruskeana möykkynä kartan alle. Grönlanti taas ylittää
 * yläreunan osittain ja kuuluu ehdottomasti mukaan.
 *
 * Siksi ratkaisee enemmistö: muoto säilyy, jos suurin osa siitä on
 * laudalla. Reunan yli valuva osa on kunnossa — kartta jatkuu reunojen
 * yli muutenkin.
 */
const KORKEUS = MAAILMANKARTTA.map.height;
const enimmakseenLaudalla = (pisteet) => {
  const sisalla = pisteet.filter(([, y]) => y >= 0 && y <= KORKEUS).length;
  return sisalla > pisteet.length * 0.5;
};

let pudotettu = 0;
const suodata = (renkaat) => (renkaat ?? []).filter((r) => {
  const kelpaa = enimmakseenLaudalla(viiva(r));
  if (!kelpaa) pudotettu += 1;
  return kelpaa;
});

const vyohyke = (renkaat) => suodata(renkaat).flatMap(rengas);

const maasto = {
  keski: vyohyke(korkeus?.keski),
  ylos: vyohyke(korkeus?.ylos),
  huippu: vyohyke(korkeus?.huippu),
  jarvet: (jarvet ?? []).filter((j) => enimmakseenLaudalla(viiva(j.rengas ?? j)))
    .flatMap((j) => rengas(j.rengas ?? j).map((r) => ({ nimi: j.nimi ?? null, rengas: r }))),
  joet: (joet ?? []).filter((j) => enimmakseenLaudalla(viiva(j.pisteet ?? j)))
    .map((j) => ({ nimi: j.nimi ?? null, pisteet: viiva(j.pisteet ?? j) })),
};

const pisteita = (lista) => lista.reduce((s, r) => s + (r.pisteet ?? r.rengas ?? r).length, 0);
console.log(`keski   ${maasto.keski.length} rengasta, ${pisteita(maasto.keski)} pistettä`);
console.log(`ylos    ${maasto.ylos.length} rengasta, ${pisteita(maasto.ylos)} pistettä`);
console.log(`huippu  ${maasto.huippu.length} rengasta, ${pisteita(maasto.huippu)} pistettä`);
console.log(`järvet  ${maasto.jarvet.length}, ${pisteita(maasto.jarvet)} pistettä`);
console.log(`joet    ${maasto.joet.length}, ${pisteita(maasto.joet)} pistettä`);
console.log(`laudan ulkopuolelta pudotettu ${pudotettu} muotoa`);

if (kuiva) process.exit(0);

const lista = (renkaat) => renkaat
  .map((r) => `  [${r.map(([x, y]) => `[${x},${y}]`).join(',')}],`).join('\n');

const teksti = `// Maailmankartan maasto laudan koordinaatteina.
//
// TÄMÄ TIEDOSTO ON KONEEN KIRJOITTAMA. Älä muokkaa käsin —
// aja \`node tools/tee-maasto.mjs\` uudelleen.
//
// Lähde on asteina tiedostoissa js/packs/maasto-korkeus.js ja
// js/packs/maasto-vedet.js; tämä on niistä projisoitu versio.
// Sauman ylittävät muodot on pidetty yhtenäisinä ja renkaista on
// kierron kopio laudan toisella laidalla.

const KESKI = [
${lista(maasto.keski)}
];

const YLOS = [
${lista(maasto.ylos)}
];

const HUIPPU = [
${lista(maasto.huippu)}
];

const LAUDAN_JARVET = [
${maasto.jarvet.map((j) => `  ${JSON.stringify(j)},`).join('\n')}
];

const LAUDAN_JOET = [
${maasto.joet.map((j) => `  ${JSON.stringify(j)},`).join('\n')}
];

export const MAAILMANKARTAN_MAASTO = {
  keski: KESKI, ylos: YLOS, huippu: HUIPPU, jarvet: LAUDAN_JARVET, joet: LAUDAN_JOET,
};
`;

const ulos = join(JUURI, 'js/packs/maailmankartta-maasto.js');
writeFileSync(ulos, teksti);
console.log(`kirjoitettu ${ulos} (${Math.round(teksti.length / 1024)} kt)`);
