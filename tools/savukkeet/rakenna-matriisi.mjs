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
// Jokainen matriisin alkio: { nimi, tiedosto, nimiTunniste, env,
// kuvakansio, tunnetutPunaiset, tunnetutPunaisetMaara, salliEpaonnistua }.
// salliEpaonnistua on tosi, jos tiedostolle on annettu tunnetutPunaiset
// tai tunnetutPunaisetMaara (silloin job saa continue-on-error: true
// työnkulussa — ks. .github/workflows/savukkeet.yml).
//
// YKSI PAIKKA: sekä "julkaisu" että "kaikki" ja mukautettu lista
// lukevat SAMAN sarjat.json:n "asetukset"-osion, joten NAKYMAT/KOOT/
// VAIN_AVAUS ja tunnetut punaiset eivät ole kahdessa paikassa.
//
// ── SAVUKKEEN JAKO KAHDEKSI RIVIKSI (`#osa`) ───────────────────────
//
// Omistaja 18.9.2026 (Raamattu: AGENTIT ... TARKENNUS 9): PR-portin
// seinäkello on niin pitkä kuin sarjan PISIN savuke, koska rinnakkaisia
// paikkoja on enemmän kuin pitkiä savukkeita. Kaksi pisintä (astro-pallo
// ja pariisi-lahizoom) ajavat molemmat kaksi näyttöä peräkkäin YHDEN
// prosessin sisällä, joten ne voi jakaa kahdeksi rinnakkaiseksi riviksi
// ilman että yhtään väitettä menetetään.
//
// Jako kirjoitetaan sarjat.json:n "julkaisu"-listaan ja "asetukset"-
// avaimeen muodossa `savuke-astro-pallo.mjs#puhelin`, jossa `#`:n
// jälkeinen osa on VAIN rivin nimilappu (ei mene savukkeelle):
//   - `tiedosto`     = `#`:n vasen puoli (ajettava savuke)
//   - `nimiTunniste` = `savuke-astro-pallo-puhelin` (kaappaus-, loki- ja
//                      artefaktipolut eivät törmää)
//   - `nimi`         = koko `savuke-astro-pallo.mjs#puhelin` (yhteenveto)
// Rajaus ITSE ajoon tulee rivin omasta `env`-lohkosta (NAKYMAT,
// SAVUKE_RUUTU), ja tunnetut punaiset kirjataan sille puolikkaalle,
// jolla väite oikeasti ajetaan — toisen puolikkaan lista ei saa sisältää
// väitteitä, joita se ei aja (vertaa-tulos.mjs ei vaadi osumaa, joten
// väärään puolikkaaseen jäänyt tunnettu punainen VAIN vaikenisi).
//
// "kaikki" ja mukautettu lista ajavat savukkeen aina kokonaisena (ei
// jakoa) — jako on julkaisusarjan seinäkellon optimointi.

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
  /*
   * SARJANIMET JA TIEDOSTOT SAMASSA LISTASSA (savukekarsinta 19.9.2026,
   * docs/raportit/viesti-fable-savukekarsinta-20260919.md):
   *   julkaisu  PR-portti
   *   harva     aina vihreät ja hitaat (schedule + PR:ssä polkuosumilla)
   *   taysi     julkaisu + harva
   *   kaikki    kaikki savuke-*.mjs
   * Pilkulla erotettu lista voi yhdistää nimiä ja tiedostoja, esim.
   * "julkaisu,savuke-luentakuvat.mjs" (tools/savukkeet/valitse-harvat.mjs).
   */
  const NIMETYT = {
    julkaisu: () => sarjat.julkaisu,
    harva: () => sarjat.harva ?? [],
    // Harvat ensin: hitaimmat rivit alkavat heti (valitse-harvat.mjs sarjaPr).
    taysi: () => [...(sarjat.harva ?? []), ...sarjat.julkaisu],
    kaikki: () => kaikkiSavukeTiedostot(),
  };
  const tiedostot = String(sarja ?? '').split(',').map((s) => s.trim()).filter(Boolean)
    .flatMap((nimi) => (NIMETYT[nimi] ? NIMETYT[nimi]() : [nimi.includes('.mjs') ? nimi : `${nimi}.mjs`]));

  if (!tiedostot || !tiedostot.length) {
    throw new Error(`rakenna-matriisi: sarja "${sarja}" ei tuottanut yhtään savuketta`);
  }

  // `#osa`-pääte on vain rivin nimilappu; ajettava tiedosto on sen vasen
  // puoli. Olemassaolo tarkistetaan AINA (myös julkaisusarjasta), jotta
  // kirjoitusvirhe sarjat.jsonissa kaataa matriisin heti eikä vasta
  // savukkeen "Cannot find module" -kaatumisena Actionsissa.
  const olemassaolevat = new Set(kaikkiSavukeTiedostot());
  const puuttuvat = tiedostot
    .map((nimi) => nimi.split('#')[0])
    .filter((t) => !olemassaolevat.has(t));
  if (puuttuvat.length) {
    throw new Error(`rakenna-matriisi: tiedostoa ei löydy tools/savukkeet/:sta: ${puuttuvat.join(', ')}`);
  }

  const kaksoiset = tiedostot.filter((n, i) => tiedostot.indexOf(n) !== i);
  if (kaksoiset.length) {
    throw new Error(`rakenna-matriisi: sama rivi on sarjassa kahdesti: ${[...new Set(kaksoiset)].join(', ')}`);
  }

  return tiedostot.map((nimi) => {
    const asetus = sarjat.asetukset?.[nimi] ?? {};
    const [tiedosto, osa] = nimi.split('#');
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
      nimi,
      tiedosto,
      nimiTunniste: `${tiedosto.replace(/\.mjs$/, '')}${osa ? `-${osa}` : ''}`,
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
    console.error('Käyttö: node tools/savukkeet/rakenna-matriisi.mjs <julkaisu|harva|taysi|kaikki|tiedosto1,tiedosto2,...>');
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
