import { KULTTUURI_KATEGORIAT } from '/home/user/Matkakirja/js/packs/kulttuuri-kategoriat.js';
const p = KULTTUURI_KATEGORIAT.pariisi;
const osasto = (id) => p.find((o) => o.id === id);
const nosto = (oid, otsikko) => osasto(oid).nostot.find((n) => n.otsikko === otsikko);

/** Rivittää tekstin JS-lähteeksi: 'rivi '\n + 'rivi ' ... , sisennys annettu. */
function ladoTeksti(s, sisennys, leveys = 66) {
  const sanat = s.split(' ');
  const rivit = []; let r = '';
  for (const sana of sanat) {
    if (r && (r + ' ' + sana).length > leveys) { rivit.push(r + ' '); r = sana; }
    else r = r ? r + ' ' + sana : sana;
  }
  if (r) rivit.push(r);
  return rivit.map((x, i) => {
    const q = "'" + x.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
    return (i === 0 ? sisennys : sisennys + '  + ') + q;
  }).join('\n');
}
const kohde = process.argv[2];
if (kohde === 'kansi') {
  for (const n of osasto('kaupunki').nostot) {
    console.log(`\n/* ===== ${n.otsikko} ===== */`);
    console.log(ladoTeksti(n.teksti, '        '));
    console.log('--- selite ---');
    console.log(ladoTeksti(n.selite, '          '));
  }
}
if (kohde === 'musiikki' || kohde === 'historia') {
  for (const n of osasto(kohde).nostot) {
    console.log(`\n/* ===== ${n.otsikko} ===== */`);
    console.log(ladoTeksti(n.teksti, '        '));
  }
  console.log('\n/* johdanto */');
  console.log(ladoTeksti(osasto(kohde).johdanto, '      '));
}
