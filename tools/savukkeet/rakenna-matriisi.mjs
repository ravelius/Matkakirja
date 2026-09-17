// RAKENNA MATRIISI — lukee tools/savukkeet/sarjat.json ja tulostaa
// GitHub Actionsin `strategy.matrix.include`-taulukon JSON:na stdouttiin.
//
//   node tools/savukkeet/rakenna-matriisi.mjs <sarja>
//
// <sarja> on joko:
//   - "julkaisu" — sarjat.json:n "julkaisu"-lista (julkaisuraporttien
//     savukkeet, ks. sarjat.json:n _kommentti)
//   - "kaikki"   — kaikki tools/savukkeet/savuke-*.mjs aakkosjärjestyksessä
//   - pilkuilla eroteltu tiedostonimilista (esim.
//     "savuke-nimikyltti.mjs,savuke-pallo-nostolaput"), .mjs-pääte
//     lisätään tarvittaessa
//
// Jokainen matriisin alkio: { tiedosto, nimiTunniste, env,
// kuvakansio, tunnetutPunaiset, tunnetutPunaisetMaara, salliEpaonnistua }.
// salliEpaonnistua on tosi, jos tiedostolle on annettu tunnetutPunaiset
// tai tunnetutPunaisetMaara (silloin job saa continue-on-error: true
// työnkulussa — ks. .github/workflows/savukkeet.yml).
//
// YKSI PAIKKA: sekä "julkaisu" että "kaikki" ja mukautettu lista
// lukevat SAMAN sarjat.json:n "asetukset"-osion, joten NAKYMAT/KOOT/
// VAIN_AVAUS ja tunnetut punaiset eivät ole kahdessa paikassa.

import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const TASSA = dirname(fileURLToPath(import.meta.url));
const sarjat = JSON.parse(readFileSync(join(TASSA, 'sarjat.json'), 'utf8'));

// Ajo-osa on erotettu funktioksi `rakennaMatriisi(sarja)`, jotta
// tools/savukkeet/aja-sarja.mjs (Macin self-hosted-runnerin yksi job)
// voi lukea saman matriisin ilman rinnakkaista logiikkaa — sarjat.json
// pysyy ainoana totuutena.

function kaikkiSavukeTiedostot() {
  return readdirSync(TASSA)
    .filter((t) => /^savuke-.*\.mjs$/.test(t))
    .sort();
}

export function rakennaMatriisi(sarja) {
  let tiedostot;
  if (sarja === 'julkaisu') {
    tiedostot = sarjat.julkaisu;
  } else if (sarja === 'kaikki') {
    tiedostot = kaikkiSavukeTiedostot();
  } else {
    const olemassaolevat = new Set(kaikkiSavukeTiedostot());
    tiedostot = sarja.split(',').map((s) => s.trim()).filter(Boolean).map((nimi) => (
      nimi.endsWith('.mjs') ? nimi : `${nimi}.mjs`
    ));
    const puuttuvat = tiedostot.filter((t) => !olemassaolevat.has(t));
    if (puuttuvat.length) {
      throw new Error(`rakenna-matriisi: tiedostoa ei löydy tools/savukkeet/:sta: ${puuttuvat.join(', ')}`);
    }
  }

  if (!tiedostot || !tiedostot.length) {
    throw new Error(`rakenna-matriisi: sarja "${sarja}" ei tuottanut yhtään savuketta`);
  }

  return tiedostot.map((tiedosto) => {
    const asetus = sarjat.asetukset?.[tiedosto] ?? {};
    // tunnetutPunaisetMac (Fable 17.9.2026, Raamattu AGENTIT TARKENNUS 7):
    // Macin runnerilla rinnakkaiskuormassa häilyvät väitteet, jotka
    // ubuntu-matriisi vartioi yhä. Yhdistetään listaan vain kun matriisi
    // rakennetaan macOS:llä (aja-sarja.mjs Mac-runnerilla); Linux-lista-
    // job ei näe niitä.
    const tunnetutPunaiset = [
      ...(asetus.tunnetutPunaiset ?? []),
      ...(process.platform === 'darwin' ? (asetus.tunnetutPunaisetMac ?? []) : []),
    ];
    const tunnetutPunaisetMaara = asetus.tunnetutPunaisetMaara ?? null;
    return {
      tiedosto,
      nimiTunniste: tiedosto.replace(/\.mjs$/, ''),
      env: asetus.env ?? {},
      kuvakansio: Boolean(asetus.kuvakansio),
      tunnetutPunaiset,
      tunnetutPunaisetMaara,
      salliEpaonnistua: tunnetutPunaiset.length > 0 || tunnetutPunaisetMaara !== null,
    };
  });
}

// CLI: vain kun tiedosto ajetaan suoraan (ei kun aja-sarja.mjs tuo sen).
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const sarja = process.argv[2];
  if (!sarja) {
    console.error('Käyttö: node tools/savukkeet/rakenna-matriisi.mjs <julkaisu|kaikki|tiedosto1,tiedosto2,...>');
    process.exit(1);
  }
  let matriisi;
  try {
    matriisi = rakennaMatriisi(sarja);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
  process.stdout.write(JSON.stringify(matriisi));
}
