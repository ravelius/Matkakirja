// Aihetoiston tutka: sama TARINA kahdessa paikassa, vaikka kuvatiedosto
// on eri.
//
//   node tools/tarkista-aihetoisto.mjs [raja]     # oletusraja 7
//
// MIKSI TÄMÄ ON OMA TYÖKALUNSA. Kuvaduplikaattitutka (tarkista-maa.mjs,
// kohta 4) lukee vain `tiedosto:`-kenttiä eikä siis näe toistoa, jossa
// sama juttu on kirjoitettu kahdesti eri kuvalla. Sellaisia löytyi
// 12.8.2026 auditissa kuusi, ja jokainen oli pelaajalle näkyvä:
//
//   · helmisukelluksen tekniikka kolmessa paikassa (QAT/meri,
//     BHR/helmet, Dubain kaupunkilehden kansi) — samat nenäpuristimet,
//     sama kesäkuu–syyskuu, sama minuutin sukellus,
//   · Umm Kulthumin radiokonsertit Kairon kannessa JA EGY/musiikissa
//     (eri kuva, samat yksityiskohdat),
//   · "Metsä, joka kasvaa suolavedessä" sanasta sanaan samalla
//     otsikolla ARE:lla ja PAK:lla,
//   · qanat IRN/puutarhat-sivulla ja Iranin KARTTASIVUN nostossa,
//   · Musandamin vuonot OMN/meri-sivulla ja Omanin karttasivulla,
//   · Al Zubarah QAT/aavikko-sivulla ja Qatarin karttasivulla.
//
// Kolme viimeistä ovat SAMAN LEHDEN sisällä: maalehden ensimmäinen sivu
// on maan karttasivu, joten karttasivun nosto ja aihesivun juttu ovat
// parin sivun päässä toisistaan. Karttasivu on siis maalehden
// kilpailija siinä missä kaupunkilehtikin.
//
// TAPA: verrataan jutuissa esiintyviä HARVINAISIA sanoja (vähintään 7
// merkkiä, esiintyvät enintään 20 jutussa). Jos kahdella jutulla on
// tarpeeksi monta yhteistä harvinaista sanaa, ne kertovat luultavasti
// samasta asiasta. Tulos on HUOMIOLISTA, ei virhelista — ihminen
// ratkaisee, onko toisto vika vai tarkoitus. Kaupunkilehden kansi ja
// saman kohteen nähtävyysjuttu nousevat listalle usein, koska ne ovat
// tarkoituksella pari (kansiteaser + pop-up).

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const { MAA_KATEGORIAT } = await import(join(JUURI, 'js/packs/maa-kategoriat.js'));
const { KULTTUURI_KATEGORIAT } = await import(join(JUURI, 'js/packs/kulttuuri-kategoriat.js'));
const { NAHTAVYYSJUTUT } = await import(join(JUURI, 'js/packs/nahtavyysjutut.js'));
const { MAAKARTAT } = await import(join(JUURI, 'js/packs/maakartat.js'));

const jutut = [];
const lisaa = (missa, otsikko, teksti) => {
  if (teksti && teksti.length > 200) jutut.push({ missa, otsikko, teksti });
};
for (const [maa, sivut] of Object.entries(MAA_KATEGORIAT)) {
  for (const s of sivut) for (const n of s.nostot || []) lisaa(`MAA ${maa}/${s.id}`, n.otsikko, n.teksti);
}
for (const [kaupunki, sivut] of Object.entries(KULTTUURI_KATEGORIAT)) {
  for (const s of sivut) for (const n of s.nostot || []) lisaa(`KAUPUNKI ${kaupunki}/${s.id}`, n.otsikko, n.teksti);
}
for (const [kaupunki, kohteet] of Object.entries(NAHTAVYYSJUTUT)) {
  for (const [nimi, j] of Object.entries(kohteet)) lisaa(`NÄHTÄVYYS ${kaupunki}`, nimi, j.teksti);
}
for (const [maa, kartta] of Object.entries(MAAKARTAT)) {
  if (kartta.nosto) lisaa(`KARTTA ${maa}`, kartta.nosto.otsikko || '(nosto)', kartta.nosto.teksti);
}

const sanat = (s) => new Set((s.toLowerCase().match(/[a-zà-ÿåäö]{7,}/g) || [])
  .map((w) => w.slice(0, 8)));
const yleisyys = new Map();
for (const j of jutut) {
  j.sanat = sanat(`${j.otsikko} ${j.teksti}`);
  for (const w of j.sanat) yleisyys.set(w, (yleisyys.get(w) || 0) + 1);
}
for (const j of jutut) j.harvat = new Set([...j.sanat].filter((w) => yleisyys.get(w) <= 20));

const raja = Number(process.argv[2] || 7);
console.log(`# juttuja: ${jutut.length}, harvinaista sanastoa: ${yleisyys.size},`
  + ` raja: ${raja} yhteistä sanaa`);

const parit = [];
for (let i = 0; i < jutut.length; i += 1) {
  for (let k = i + 1; k < jutut.length; k += 1) {
    const a = jutut[i]; const b = jutut[k];
    const yhteiset = [...a.harvat].filter((w) => b.harvat.has(w));
    if (yhteiset.length >= raja) parit.push({ a, b, yhteiset });
  }
}
parit.sort((x, y) => y.yhteiset.length - x.yhteiset.length);
for (const p of parit) {
  // Saman maan tai kaupungin sisäinen toisto on pahin: se osuu samaan
  // lehteen. Merkitään se erikseen, ettei se huku listaan.
  const kohde = (s) => s.missa.split(/[ /]/)[1];
  const samaLehti = kohde(p.a) === kohde(p.b) ? ' ⚑ SAMA LEHTI' : '';
  console.log(`\n[${p.yhteiset.length}]${samaLehti} ${p.a.missa}: "${p.a.otsikko}"`);
  console.log(`     ${p.b.missa}: "${p.b.otsikko}"`);
  console.log(`     yhteiset: ${p.yhteiset.slice(0, 14).join(', ')}`);
}
console.log(`\n# epäiltyjä pareja: ${parit.length}`);
