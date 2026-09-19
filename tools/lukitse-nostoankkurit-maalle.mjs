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
 * Aja: node tools/lukitse-nostoankkurit-maalle.mjs [--maa ESP] [--kuiva]
 *
 * ── MAAKOHTAINEN (19.9.2026, PAATOKSET 48:n velka, Fablen erä I) ──
 * `--maa ISO` (oletus FRA) lukee ja kirjoittaa js/packs/nostoankkurit-
 * <iso>.js. Maalla, jolla taulua ei vielä ole, ajo alkaa tyhjästä ja
 * jokainen elävä nosto saa ankkurikseen oman datapisteensä (maalle
 * lukittuna). HUOM: se ohittaa pelin levityksen, joten uuden maan taulu
 * kannattaa ensin viedä pelistä (tools/vie-nostoankkurit.mjs --iso) ja
 * vasta sitten lukita tällä. Raportti
 * docs/raportit/viesti-fable-ankkurilukitus-20260919.md.
 *
 * ── SAARET EIVÄT PUTOA (PAATOKSET 44/48: Stromboli, Elba, Finisterre) ──
 * ne50.geojson (1:50M) ei sisällä pienimpiä saaria: mitattu 19.9.2026
 * Stromboli 67 km, Helgoland 56 km, Antikythera 44 km, Berlengas 22 km
 * ja Capri 17 km "merellä". Niiden koordinaatti on oikeasti maalla, ja
 * lähimpään maskin maapisteeseen siirto veisi saaren mantereelle.
 * Saaripoikkeus: jos nosto on saari (tyyppi 'saari' tai SAARET-lista)
 * ja maski siirtäisi sen yli SAAREN_RAJA_KM:n, oma piste pidetään.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { onKaupunkipiste } from '../js/nostoladonta.js';
import { onKaupunginSisainen } from '../js/pallolauta/kaupunkiliuska.js';
import { existsSync } from 'node:fs';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { laudaltaAsteiksi } from '../js/fokusmitat.js';
import { paakartanNostot } from './tarkista-nostopaikat.mjs';
import { onMaalla, lahinMaapiste } from './maamaski.mjs';

const JUURI = new URL('..', import.meta.url).pathname;
const KUIVA = process.argv.includes('--kuiva');
const MAA = (() => {
  const i = process.argv.indexOf('--maa');
  return (i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : 'FRA').toUpperCase();
})();
const TAULUN_POLKU = join(JUURI, 'js', 'packs', `nostoankkurit-${MAA.toLowerCase()}.js`);
const TAULUN_NIMI = `NOSTOANKKURIT_${MAA}`;
const vanhaTaulu = existsSync(TAULUN_POLKU)
  ? ((await import(TAULUN_POLKU))[TAULUN_NIMI] ?? {}) : {};

/** Saaret, joiden tyyppi ei ole 'saari' (tulivuorisaari on 'vuori'). */
export const SAARET = new Set(['hahmotelma-stromboli']);
/** Pidempi maskisiirto saarelta tarkoittaa, että saari puuttuu 1:50M-maskista. */
export const SAAREN_RAJA_KM = 10;
const onSaari = (r) => r?.tyyppi === 'saari' || SAARET.has(r?.id);
const saaret = [];

const { kaikki: kaikkiRivit } = paakartanNostot();
const fraRivit = kaikkiRivit.filter((r) => r.iso === MAA);
const keskukset = fraRivit
  .filter((r) => onKaupunkipiste(r.id) && Number.isFinite(r.lat))
  .map((r) => ({ lat: r.lat, lng: r.lon }));
for (const k of (MAAILMANKARTTA.cities ?? [])) {
  if ((MAAILMANKARTTA.map?.cityCountry ?? {})[k.id] !== MAA) continue;
  const a = laudaltaAsteiksi(MAAILMANKARTTA.id, k.x, k.y);
  if (a && Number.isFinite(a.lat)) keskukset.push({ lat: a.lat, lng: a.lon ?? a.lng });
}
const sisainen = (r) => keskukset.some((k) => onKaupunginSisainen({ lat: r.lat, lng: r.lon }, k));
const elavat = fraRivit.filter((r) => !onKaupunkipiste(r.id) && !sisainen(r)
  && Number.isFinite(r.lat) && Number.isFinite(r.lon));

const taulu = new Map(Object.entries(vanhaTaulu));
const rivitIdlla = new Map(elavat.map((r) => [`nosto:${r.id}`, r]));
const lisatyt = [];
const siirretyt = [];

for (const r of elavat) {
  const avain = `nosto:${r.id}`;
  if (taulu.has(avain)) continue;
  let piste = { lat: Number(r.lat.toFixed(6)), lng: Number(r.lon.toFixed(6)) };
  if (!onMaalla(piste.lat, piste.lng)) {
    const maalle = lahinMaapiste(piste.lat, piste.lng);
    if (onSaari(r) && (!maalle || maalle.siirtoKm > SAAREN_RAJA_KM)) {
      saaret.push(`${avain} (${maalle?.siirtoKm ?? '?'} km maskin maasta — saari puuttuu 1:50M-maskista)`);
      lisatyt.push(`${avain} (omasta paikasta, SAARI pidetään)`);
    } else if (maalle) {
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
  if (onSaari(rivitIdlla.get(avain)) && (!maalle || maalle.siirtoKm > SAAREN_RAJA_KM)) {
    saaret.push(`${avain} (${maalle?.siirtoKm ?? '?'} km maskin maasta — saari puuttuu 1:50M-maskista)`);
    continue;
  }
  if (!maalle) { console.log(`VAROITUS  ${avain} on merellä eikä maapistettä löytynyt`); continue; }
  siirretyt.push(`${avain}: ${a.lat}, ${a.lng} -> ${maalle.lat}, ${maalle.lng} (${maalle.siirtoKm} km)`);
  taulu.set(avain, { lat: maalle.lat, lng: maalle.lng });
}

console.log(`${MAA}: taulussa ${taulu.size} ankkuria (${lisatyt.length} uutta, ${siirretyt.length} siirrettyä, ${saaret.length} saarta pidetty)`);
for (const rivi of lisatyt) console.log(`  UUSI     ${rivi}`);
for (const rivi of siirretyt) console.log(`  MAALLE   ${rivi}`);
for (const rivi of saaret) console.log(`  SAARI    ${rivi}`);
if (KUIVA) process.exit(0);

const polku = TAULUN_POLKU;
if (!existsSync(polku)) {
  console.log(`${polku} puuttuu: uuden maan taulun runko tehdään käsin (vie ensin pelistä, ks. otsikko).`);
  process.exit(2);
}
const vanha = readFileSync(polku, 'utf8');
const rivit = [...taulu.entries()]
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([avain, a]) => `  '${avain}': { lat: ${a.lat.toFixed(6)}, lng: ${a.lng.toFixed(6)} },`)
  .join('\n');
const uusi = vanha.replace(/export const NOSTOANKKURIT_\w+ = \{[\s\S]*?\n\};/, (o) => `${o.split('{')[0]}{\n${rivit}\n};`);
writeFileSync(polku, uusi);
console.log(`kirjoitettu ${polku}`);
