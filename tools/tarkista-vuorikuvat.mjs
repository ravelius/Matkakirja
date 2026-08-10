/*
 * Tarkistaa, että jokainen vuorikohteiden kuva on yhä Commonsissa ja
 * että lisenssirivin tekijä vastaa Commonsin omaa tietoa.
 *
 *   node tools/tarkista-vuorikuvat.mjs
 *   node tools/tarkista-vuorikuvat.mjs --kohde kaukasus
 *
 * Kaksi eri vikaa, kumpaakaan ei näe pelistä:
 *
 * 1. TIEDOSTO ON KADONNUT. Commonsista poistetaan ja nimetään uudelleen
 *    kuvia jatkuvasti. Pelissä kadonnut kuva vain putoaa karusellista
 *    (ui.js: pudotaRikkiKuva), joten laskuri näyttää pienempää lukua
 *    eikä mikään kerro syytä — juuri niin kävi Tienšanille.
 * 2. TEKIJÄ ON VÄÄRIN. Väärä tekijämerkintä on lisenssirikkomus siinä
 *    missä puuttuvakin, eikä sitä huomaa lukemalla (sama oppi kuin
 *    tools/tarkista-tekijat.mjs).
 *
 * Pyynnöt tahdistetaan: Commons vastaa 429:llä, jos samasta osoitteesta
 * tulee kymmeniä hakuja sekunnissa, ja silloin TERVE kuva näyttää
 * kadonneelta. Tahdistamaton tarkistus valehteli 42 kuvasta kerralla.
 */
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const UA = 'Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)';
const arvo = (nimi, oletus) => {
  const i = process.argv.indexOf(nimi);
  return i >= 0 ? process.argv[i + 1] : oletus;
};
const vainKohde = arvo('--kohde', null);

const nuku = (ms) => new Promise((r) => { setTimeout(r, ms); });

/** Yksi kysely, 429 odotetaan pois eikä tulkita virheeksi. */
async function hae(osoite, tapa = 'GET') {
  for (let i = 0; i < 6; i += 1) {
    const vastaus = await fetch(osoite, { method: tapa, headers: { 'user-agent': UA } });
    if (vastaus.status !== 429) return vastaus;
    await nuku(5000 * (i + 1));
  }
  return null;
}

const siisti = (s) => (s ?? '')
  .replace(/<[^>]*>/g, ' ').replace(/&amp;/gi, '&').replace(/&[a-z]+;/gi, ' ')
  .replace(/\s+/g, ' ').trim();

const { VUORIKUVAT } = await import('../js/packs/vuori-valokuvat.js');
const kohteet = Object.entries(VUORIKUVAT).filter(([a]) => !vainKohde || a === vainKohde);

const puuttuvat = [];
const tekijaerot = [];
let tarkistettu = 0;

for (const [avain, kuvat] of kohteet) {
  for (const kuva of kuvat) {
    const osoite = 'https://commons.wikimedia.org/wiki/Special:FilePath/'
      + `${encodeURIComponent(kuva.tiedosto)}?width=1600`;
    const vastaus = await hae(osoite, 'HEAD');
    if (!vastaus?.ok) {
      puuttuvat.push(`${avain} | ${kuva.tiedosto} → ${vastaus?.status ?? 'ei vastausta'}`);
    }
    await nuku(700);

    // Tekijä Commonsin omasta kentästä, ei muistista.
    const tiedot = await hae('https://commons.wikimedia.org/w/api.php?action=query'
      + '&prop=imageinfo&iiprop=extmetadata&format=json'
      + `&titles=${encodeURIComponent(`File:${kuva.tiedosto}`)}`);
    const data = tiedot?.ok ? await tiedot.json() : null;
    const meta = Object.values(data?.query?.pages ?? {})[0]?.imageinfo?.[0]?.extmetadata;
    const commons = siisti(meta?.Artist?.value);
    const nimiosa = kuva.lahde.split(', Wikimedia Commons')[0];
    /*
     * Vertailu on tarkoituksella löyhä, kuten tarkista-tekijat.mjs:ssä:
     * kyrilliset nimet on translitteroitu ja laitosnimiä lyhennetty.
     * Tarkoitus on löytää KEKSITYT nimet, ei nipottaa muodosta.
     */
    if (commons && nimiosa) {
      const a = nimiosa.toLowerCase();
      const b = commons.toLowerCase();
      const osuu = b.includes(a) || a.includes(b)
        || a.split(/\s+/).some((sana) => sana.length > 3 && b.includes(sana));
      if (!osuu) tekijaerot.push(`${avain} | ${kuva.tiedosto}\n    paketti: ${nimiosa}\n    commons: ${commons}`);
    }
    tarkistettu += 1;
    await nuku(700);
  }
  console.log(`${avain.padEnd(28)} ${kuvat.length} kuvaa tarkistettu`);
}

console.log(`\n${tarkistettu} kuvaa, ${puuttuvat.length} puuttuu, `
  + `${tekijaerot.length} tekijäeroa`);
if (puuttuvat.length) console.log(`\nPUUTTUVAT:\n${puuttuvat.join('\n')}`);
if (tekijaerot.length) {
  console.log('\nTEKIJÄEROT (osa on tahallisia: translitterointi, suomennos):');
  console.log(tekijaerot.join('\n'));
}
process.exitCode = puuttuvat.length ? 1 : 0;
