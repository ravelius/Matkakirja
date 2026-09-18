/*
 * MITKÄ MAAT SAAVAT OMAN NOSTOLAATASTON — yksi lista, yksi lähde.
 *
 * Raamattu KARTTAUUDISTUKSEN PAATOKSET 34 kohta 17 d (omistaja
 * 18.9.2026): *"muiden maiden nostot piiloon"*. Nostotaso ei ole enää
 * yksi maailmanlaajuinen laatasto vaan maakohtainen, kuten väritaso
 * (tools/generoi-laattapyramidi.mjs `--nostotaso --nostomaa <ISO>`),
 * ja polttoketju tarvitsee siksi listan ajettavista maista.
 *
 * LISTA LASKETAAN SAMASTA FUNKTIOSTA, JOSTA MERKIT TULEVAT
 * (tools/fokuskartta/nostot.mjs keraaNostot), eikä kirjoiteta
 * käsin mihinkään. Kaksi listaa ehtisi eriytyä, ja ero näkyisi
 * pahimmalla mahdollisella tavalla: maa, jonka nostot jäävät
 * polttamatta, on kartalla mykkä — laatastoa ei ole, joten peli
 * piirtää sen merkit elävinä, mutta jos maa katoaisi listalta vasta
 * polton jälkeen, ämpäriin jäisi laatasto jota kukaan ei pyydä.
 *
 * KÄYTTÖ
 *   node tools/nostomaat.mjs            # ISO-koodit, yksi per rivi
 *   node tools/nostomaat.mjs --rivi     # yhdelle riville välilyönnein
 *   node tools/nostomaat.mjs --tilasto  # ISO + merkkimäärä
 */

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { keraaNostot } from './fokuskartta/nostot.mjs';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');

const moduuli = await import(join(JUURI, 'js', 'packs', 'maailmankartta.js'));
const pack = moduuli.MAAILMANKARTTA;
if (!pack?.map?.width) throw new Error('Laudan mittoja ei löytynyt.');

/*
 * MAITTAIN, KUTEN AJOKIN. Shardit ajetaan aina `--nostomaa <ISO>`
 * -lipulla, ja silloin merkkiportti ajetaan kohdemaan asetuksella
 * (tools/fokuskartta/nostot.mjs "MERKKIPORTTI AJETAAN KOHDEMAAN
 * ASETUKSELLA"). Ilman lippua tämä lista laskisi poltettavat vanhalla
 * katolla 21, ja listalta voisi pudota maa, jolla on poltettavaa vasta
 * kohdemaan asetuksella — juuri se eriytyminen, jota tämä tiedosto
 * estää.
 */
const { merkit } = keraaNostot(pack, { maittain: true });
/* Vain poltettavat: estetyn maan merkit piirtyvät elävinä, eikä
 * sellaiselle maalle ole mitään poltettavaa (ks. TÄKYN EHTO). */
const maat = new Map();
for (const m of merkit) {
  if (!m.poltettava || !m.iso) continue;
  maat.set(m.iso, (maat.get(m.iso) ?? 0) + 1);
}
const lista = [...maat.keys()].sort();

if (process.argv.includes('--tilasto')) {
  for (const iso of lista) console.log(`${iso} ${maat.get(iso)}`);
} else if (process.argv.includes('--rivi')) {
  console.log(lista.join(' '));
} else {
  for (const iso of lista) console.log(iso);
}
