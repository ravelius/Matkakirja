#!/usr/bin/env node
/*
 * Nähtävyyskuvien tyylimittari — apuvaihe 1/2.
 *
 * Tuo js/packs/miniatyyrit.js:n MINIATYYRIT-taulun Node.js:llä (oikea JS-
 * tulkki, ei regex-arvailua) ja kirjoittaa litteän JSON-listan
 * {kaupunki, kohde, arvo, onPolku, tiedostonimi, tunnus}, jota
 * tools/nahtavyyskuvien-tyylimittari.py käyttää --map-parametrina
 * yhdistääkseen tiedostonimet kaupunkiin/kohteeseen.
 *
 * onPolku=true  → arvo on repon polku (assets/kartat/miniatyyrit/x.webp),
 *                 tiedostonimi on polun viimeinen osa.
 * onPolku=false → arvo on PELKKÄ TUNNUS (esim. "berliini-kulta-liisa-vari2"),
 *                 eli kuva on VAIN R2-ämpärissä (kohtaamiset/miniatyyrit/
 *                 <tunnus>.png) EIKÄ reposssa ole paikallista kopiota.
 *                 Käytä --lataa-referenssit-skriptiä lataamaan nämä, jos
 *                 haluat vertailla niitä paikallisiin (ks. tiedoston loppu).
 *
 * Käyttö:
 *   node tools/nahtavyyskuvien-kartta-json.mjs > /tmp/miniatyyrit-map.json
 *
 * Referenssikuvien (esim. kaikki -vari2, väriKORJATUT) lataus R2:sta
 * paikalliseen tarkastelukansioon (ei committoida — vain skriptin ajon
 * ajaksi, laskee ~600-900 KB/kuva):
 *
 *   node tools/nahtavyyskuvien-kartta-json.mjs --vain-vari2-tunnukset \
 *     > /tmp/vari2-tunnukset.txt
 *   mkdir -p /tmp/vari2ref
 *   cat /tmp/vari2-tunnukset.txt | xargs -P 12 -I{} curl -sS \
 *     -o /tmp/vari2ref/{}.png \
 *     "https://media.matkakirja.app/kohtaamiset/miniatyyrit/{}.png"
 */
import { MINIATYYRIT } from '../js/packs/miniatyyrit.js';

const vainVari2 = process.argv.includes('--vain-vari2-tunnukset');

const rows = [];
for (const [kaupunki, kohteet] of Object.entries(MINIATYYRIT)) {
  for (const [kohde, arvo] of Object.entries(kohteet)) {
    if (typeof arvo !== 'string') continue;
    const onPolku = arvo.includes('/');
    rows.push({
      kaupunki,
      kohde,
      arvo,
      onPolku,
      tiedostonimi: onPolku ? arvo.split('/').pop() : null,
      tunnus: onPolku ? null : arvo,
    });
  }
}

if (vainVari2) {
  const tunnukset = [...new Set(
    rows.filter((r) => !r.onPolku && r.tunnus.endsWith('-vari2')).map((r) => r.tunnus),
  )].sort();
  console.log(tunnukset.join('\n'));
} else {
  console.log(JSON.stringify(rows, null, 1));
}
