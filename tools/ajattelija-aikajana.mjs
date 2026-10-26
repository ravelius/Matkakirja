/*
 * AJATTELIJAN AIKAJANA BLENDERIN LUVUISTA (Sokrates v13, omistaja 3.10.2026; Linnanrakentajan sokrates_bysti.py --luvut;
 * Marcus samalla mallilla, --vienti MARCUS_AIKAJANA).
 *
 * Kohtaus on v13:sta lähtien yksi aikajana: kertoja (yksi yhtenäinen otto) kulkee 10 kappaletta, ja lainaukset, kaiut,
 * valot ja taustavirta ajoitetaan sen sanoihin. Web toistaa Blenderin viedyt avaimet sellaisinaan (kamera, aurinko,
 * pyyhkäisyvalo, videotykit, kaiut, taustavirran kerroin); moottori js/linssit/ajattelija.js `aikajana`-tilassa.
 * Korjatut luvut vaihtuvat ajamalla tämä uudelleen — käsin ei muokata generoitua tiedostoa.
 *
 *   node tools/ajattelija-aikajana.mjs <luvut.json> <ulos.js> [--kaiut <ämpärikansio>] [--savu <ämpäripolku atlas.png> [--savu-ydin 0..1]]
 *     [--vienti <NIMI>]   (oletus SOKRATES_AIKAJANA; Marcus: MARCUS_AIKAJANA)
 *     [--paalauseet tykki=avain,…]   (tykin nimen loppu → ajattelijan paalauseet-avain, esim. 1016=itselleen-10-16)
 *
 * Ruudut ovat Blenderin 30 r/s -ruutuja (ruutu 1 = musiikin 0,0 s heti prologin jälkeen), koordinaatit Blenderin
 * (z ylös, kasvot −y); moottori muuntaa ne three.js:n koordinaatteihin (b2t).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { aikajanaLuvuista } from './ajattelija-aikajana-luvut.mjs';

const A = process.argv.slice(2);
const [LAHDE, ULOS] = A;
if (!LAHDE || !ULOS) throw new Error('käyttö: node tools/ajattelija-aikajana.mjs <luvut.json> <ulos.js> [--kaiut <kansio>]');
const VIENTI = A.includes('--vienti') ? A[A.indexOf('--vienti') + 1] : 'SOKRATES_AIKAJANA';
const PAALAUSEET = Object.fromEntries((A.includes('--paalauseet') ? A[A.indexOf('--paalauseet') + 1].split(',') : [])
  .map((pari) => pari.split('=')));
const KAIUT = A.includes('--kaiut') ? A[A.indexOf('--kaiut') + 1] : 'ajattelijat/sokrates/v3';
const SAVU = A.includes('--savu') ? A[A.indexOf('--savu') + 1] : null;
const YDIN = A.includes('--savu-ydin') ? Number(A[A.indexOf('--savu-ydin') + 1]) : 0.28;
const aikajana = aikajanaLuvuista(JSON.parse(readFileSync(LAHDE, 'utf8')), {
  kaiut: KAIUT, savu: SAVU, savuYdin: YDIN, paalauseet: PAALAUSEET, lahde: LAHDE,
  lahdeNimi: A.includes('--lahde-nimi') ? A[A.indexOf('--lahde-nimi') + 1] : null,
});
const { kamera, aurinko, tykit, kaiut } = aikajana;

const teksti = `/*
 * GENEROITU — älä muokkaa käsin: node tools/ajattelija-aikajana.mjs <luvut-v13.json> ${ULOS}${VIENTI === 'SOKRATES_AIKAJANA' ? '' : ` --vienti ${VIENTI}`}
 * v13-aikajana Linnanrakentajan Blender-luvuista (js/linssit/ajattelija.js aikajana-tila).
 */
export const ${VIENTI} = Object.freeze(${JSON.stringify(aikajana, null, 1)
  .replace(/\n\s+(-?[\d.]+,?)(?=\n)/g, ' $1')
  .replace(/\[\s+/g, '[').replace(/\s+\]/g, ']')});
`;
writeFileSync(ULOS, teksti);
console.log(`aikajana: ${kamera.length} kamera-avainta, ${aurinko.avaimet.length} aurinkoa, ${tykit.length} tykkiä, ${kaiut.length} kaikua → ${ULOS}`);
