// HISTORIAN KERTOJAN ÄÄNITUNNISTEET (Siirtoseppä 9.10.2026): sama sha kuin Pelikoodarin tee-esittelyaanet-v2.mjs ja workerin
// oppaanAaniTunniste — sha256("william|eleven_v4_turbo|" + vuosiluvutSanoiksi(puhe_teksti || teksti)).slice(0, 32). Ääni
// on generoinnin jälkeen R2:ssa opas/<sha>.mp3 ja workerin kautta {Palvelin}/opas/aani/<sha>.mp3 (SeikkailuHistoria).
//   node tyokalut/historia_kertoja_sha.mjs <puhesanat.js> <syote-historia-animaatio.json>   → {"olavinlinna-historia-1": "<sha>", …}
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const [puhesanat, syote] = process.argv.slice(2);
const { vuosiluvutSanoiksi } = await import(pathToFileURL(puhesanat).href);
const e = JSON.parse(readFileSync(syote, 'utf8'));
const ulos = {};
for (const k of e.kohteet) {
  const puhe = vuosiluvutSanoiksi(k.puhe_teksti || k.teksti);
  ulos[k.id] = createHash('sha256').update(`william|eleven_v4_turbo|${puhe}`).digest('hex').slice(0, 32);
}
console.log(JSON.stringify(ulos));
