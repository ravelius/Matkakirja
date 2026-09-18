/*
 * TÄYDENNÄ LUKITTU ANKKURITAULU JA NOSTA ANKKURIT MERESTÄ MAALLE
 * (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 34 kohta 17 a).
 * ══════════════════════════════════════════════════════════════════
 *
 * OMISTAJA 18.9.2026 klo 15.20: *"Useampia nostoja liikkuu kun karttaa
 * panoroi ja ainakin yksi niistä on meren päällä."*
 *
 * KAKSI JUURISYYTÄ, KAKSI KORJAUSTA — MOLEMMAT DATAAN:
 *
 *   1) ANKKURI PUUTTUI. `tools/vie-nostoankkurit.mjs` lukee ankkurit
 *      PELISTÄ, ja peli näyttää vain ne rivit, jotka KAMERA näyttää
 *      (`ruudulla` on null pallon takana ja ruudun ulkopuolella) ja
 *      jotka zoomiportti päästää läpi (`lahi`-nostot vasta
 *      lähizoomissa). Aihemerkin jäsen ei myöskään ole omana rivinään
 *      osumalistalla. Siksi taulusta puuttui nostoja, ja ilman
 *      lukittua ankkuria merkki latoo itsensä uudelleen aina, kun
 *      kiinteä este (pelinappula, kaupunkimerkki) liikkuu ruudulla —
 *      `esteenAlla` js/pallolauta/nostot.js:ssä. Juuri se on
 *      panoroinnissa liikkuva nosto.
 *
 *      KORJAUS: puuttuvan noston ankkuri on sen OMA datapaikka.
 *      Levitystä ei tarvita — PAATOKSET 32 kohta 2 antaa siirtää
 *      merkkejä, muttei vaadi sitä, ja nämä nostot ovat hajallaan
 *      ympäri Ranskaa eivätkä rykelmässä.
 *
 *   2) ANKKURI OLI MERESSÄ. Levitys ei tunne rantaa, joten se työnsi
 *      *Camarguen hevoset*, *Pétanque* ja *Välimeri* veden päälle.
 *      KORJAUS: `tools/maamaski.mjs` (ne50.geojson, sama aineisto kuin
 *      pelin rantaviiva) siirtää ankkurin lähimpään maapisteeseen.
 *
 * TÄMÄ TYÖKALU EI POLTA MITÄÄN. Se kirjoittaa vain taulun; nostotason
 * poltto on oma ajonsa (Fable), ja työkalu tulostaa lopuksi, mitkä
 * POLTETTAVAT ankkurit muuttuivat.
 *
 * Aja: node tools/lukitse-nostoankkurit-maalle.mjs [--kuiva]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { onKaupunkipiste } from '../js/nostoladonta.js';
import { onKaupunginSisainen } from '../js/pallolauta/kaupunkiliuska.js';
import { NOSTOANKKURIT_FRA } from '../js/packs/nostoankkurit-fra.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { laudaltaAsteiksi } from '../js/fokusmitat.js';
import { paakartanNostot } from './tarkista-nostopaikat.mjs';
import { onMaalla, lahinMaapiste } from './maamaski.mjs';

const JUURI = new URL('..', import.meta.url).pathname;
const KUIVA = process.argv.includes('--kuiva');

const { kaikki: kaikkiRivit } = paakartanNostot();
const fraRivit = kaikkiRivit.filter((r) => r.iso === 'FRA');
const keskukset = fraRivit
  .filter((r) => onKaupunkipiste(r.id) && Number.isFinite(r.lat))
  .map((r) => ({ lat: r.lat, lng: r.lon }));
for (const k of (MAAILMANKARTTA.cities ?? [])) {
  if ((MAAILMANKARTTA.map?.cityCountry ?? {})[k.id] !== 'FRA') continue;
  const a = laudaltaAsteiksi(MAAILMANKARTTA.id, k.x, k.y);
  if (a && Number.isFinite(a.lat)) keskukset.push({ lat: a.lat, lng: a.lon ?? a.lng });
}
const sisainen = (r) => keskukset.some((k) => onKaupunginSisainen({ lat: r.lat, lng: r.lon }, k));
const elavat = fraRivit.filter((r) => !onKaupunkipiste(r.id) && !sisainen(r)
  && Number.isFinite(r.lat) && Number.isFinite(r.lon));

const taulu = new Map(Object.entries(NOSTOANKKURIT_FRA));
const lisatyt = [];
const siirretyt = [];

for (const r of elavat) {
  const avain = `nosto:${r.id}`;
  if (taulu.has(avain)) continue;
  let piste = { lat: Number(r.lat.toFixed(6)), lng: Number(r.lon.toFixed(6)) };
  if (!onMaalla(piste.lat, piste.lng)) {
    const maalle = lahinMaapiste(piste.lat, piste.lng);
    if (maalle) {
      lisatyt.push(`${avain} (omasta paikasta, siirto merestä ${maalle.siirtoKm} km)`);
      piste = { lat: maalle.lat, lng: maalle.lng };
    } else lisatyt.push(`${avain} (omasta paikasta, MERI — maapistettä ei löytynyt)`);
  } else lisatyt.push(`${avain} (omasta paikasta)`);
  taulu.set(avain, piste);
}

for (const [avain, a] of taulu) {
  if (onMaalla(a.lat, a.lng)) continue;
  if (lisatyt.some((r) => r.startsWith(`${avain} `))) continue;
  const maalle = lahinMaapiste(a.lat, a.lng);
  if (!maalle) { console.log(`VAROITUS  ${avain} on merellä eikä maapistettä löytynyt`); continue; }
  siirretyt.push(`${avain}: ${a.lat}, ${a.lng} -> ${maalle.lat}, ${maalle.lng} (${maalle.siirtoKm} km)`);
  taulu.set(avain, { lat: maalle.lat, lng: maalle.lng });
}

console.log(`taulussa ${taulu.size} ankkuria (${lisatyt.length} uutta, ${siirretyt.length} siirrettyä)`);
for (const rivi of lisatyt) console.log(`  UUSI     ${rivi}`);
for (const rivi of siirretyt) console.log(`  MAALLE   ${rivi}`);
if (KUIVA) process.exit(0);

const polku = join(JUURI, 'js', 'packs', 'nostoankkurit-fra.js');
const vanha = readFileSync(polku, 'utf8');
const rivit = [...taulu.entries()]
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([avain, a]) => `  '${avain}': { lat: ${a.lat.toFixed(6)}, lng: ${a.lng.toFixed(6)} },`)
  .join('\n');
const uusi = vanha.replace(/export const NOSTOANKKURIT_\w+ = \{[\s\S]*?\n\};/, (o) => `${o.split('{')[0]}{\n${rivit}\n};`);
writeFileSync(polku, uusi);
console.log(`kirjoitettu ${polku}`);
