import { FOKUSVIRTA_PARIISI } from '/home/user/Matkakirja/js/packs/fokusvirta-pariisi.js';
const UUDET = {
  'pariisin-72-nimea': '72 nimeä',
  'guimardin-metro': 'Metron sisäänkäynti',
  'notre-damen-kukko': 'Notre-Damen kukko',
  'pariisi-soi': 'Pariisi soi',
  'pariisin-vuosisadat': 'Pariisin vuosisadat',
};
function lado(s, sis, pre, leveys = 64) {
  const sanat = s.split(' '); const rivit = []; let r = '';
  for (const sana of sanat) {
    if (r && (r + ' ' + sana).length > leveys) { rivit.push(r + ' '); r = sana; } else r = r ? r + ' ' + sana : sana;
  }
  if (r) rivit.push(r);
  return rivit.map((x, i) => {
    const q = "'" + x.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
    return i === 0 ? `${sis}${pre}${q}` : `${sis}  + ${q}`;
  }).join('\n');
}
for (const n of FOKUSVIRTA_PARIISI.takynostot) {
  const nimi = UUDET[n.id]; if (!nimi) continue;
  const kappaleet = n.lunastus;
  console.log(`    '${nimi}': {`);
  console.log(`      nosto: 'nosto-${n.id}',`);
  const osat = kappaleet.map((k, i) => lado(k, '      ', i === 0 ? 'teksti: ' : '', 64)
    .replace(/^ {6}teksti: /, '      teksti: '));
  // rakenna teksti: kappale1 + '\n\n' + kappale2 ...
  let ulos = '';
  kappaleet.forEach((k, i) => {
    if (i === 0) ulos += lado(k, '      ', 'teksti: ');
    else ulos += `\n        + '\\n\\n'\n` + lado(k, '        ', '+ ').replace(/^ {8}\+ /, '        + ');
  });
  console.log(ulos + ',');
  const kuva = n.kuva;
  const avain = kuva.ampari ? 'osoite' : 'tiedosto';
  const lain = (v) => (v.includes("'") ? JSON.stringify(v) : `'${v}'`);
  const arvo = kuva.ampari ? `https://media.matkakirja.app/${kuva.ampari}` : kuva.tiedosto;
  console.log('      kuvat: [');
  console.log('        {');
  console.log(`          ${avain}: ${lain(arvo)},`);
  if (kuva.lyhyt) console.log(`          lyhyt: ${lain(kuva.lyhyt)},`);
  console.log(lado(kuva.selite, '          ', 'selite: ', 62) + ',');
  console.log(`          lahde: ${lain(kuva.lahde)},`);
  console.log('        },');
  console.log('      ],');
  console.log("      lahde: 'Wikipedia',");
  console.log('    },');
}
