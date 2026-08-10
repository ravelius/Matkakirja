/*
 * Kohtaamishenkilöiden muotokuvien AI-generointi (Fablen tilaus
 * 10.8.2026, pilotti kahdella hahmolla).
 *
 * Sama putki kuin tools/generoi-aarrekuvat.mjs, MUTTA TAUSTA ON ERI:
 * muotokuva tulee kohtaamiskortin tekstin viereen, ja kortti on
 * vaaleaa paperia. Aarrekuvien musta tausta olisi siinä möhkäle —
 * siksi henkilö maalataan vaalealle pergamentille, jonka reunat
 * häipyvät paperiin. Tyylikääre on siksi oma eikä jaettu.
 *
 * Käyttö:  NODE_USE_ENV_PROXY=1 GOOGLE_API_KEY=... node tools/generoi-kohtaamiskuvat.mjs [avain …]
 * Ilman argumentteja generoi kaikki. Avaimet: kohtaaminen-ateena …
 * Malli vaihdettavissa KOHTAAMIS_MALLI-ympäristömuuttujalla.
 * Ulos: assets/kohtaamiset/<avain>.png (1024×1024 — pienennys
 * ~512 px:iin tehdään erillisenä vaiheena ennen peliin kytkemistä).
 *
 * API-avainta EI koskaan repoon eikä lokiin.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MALLI = process.env.KOHTAAMIS_MALLI ?? 'gemini-3-pro-image';

// Ympäristössä avain on toisinaan kirjoitusvirheellisellä nimellä
// GOOGLW_API_KEY — luetaan molemmat, ettei generointi kaadu nimen
// kirjoitusasuun (sama kuin tools/generoi-aarrekuvat.mjs).
const avain = process.env.GOOGLE_API_KEY ?? process.env.GOOGLW_API_KEY;
if (!avain) {
  console.error('GOOGLE_API_KEY (tai GOOGLW_API_KEY) puuttuu ympäristöstä — kuvia ei voi generoida.');
  process.exit(1);
}

/*
 * Yhtenäinen tyyli joka promptin ympärille (Fablen tilaus 10.8.2026).
 * Rintakuva vaalealla pergamentilla, reunat häipyvät paperiin — kortti
 * on vaaleaa paperia, joten mustaa taustaa ei saa syntyä.
 *
 * Loppukappale on lisätty ensimmäisen ottokierroksen jälkeen (Opus 3,
 * 10.8.): pelkkä "edges fading gently into plain parchment" tuotti
 * kumpaankin kuvaan RAJAN eikä häivytystä — Ateenaan repaleisen
 * paperiarkin valkoisella pohjalla, Sofiaan suorakulmaisen
 * maalauslaatikon. Kortilla kumpikin lukisi kehyksenä. Vartio on sama
 * temppu kuin aarrekuvien mustassa taustassa: kerrotaan erikseen, että
 * tausta täyttää KOKO kanvaasin eikä ole esine kuvan sisällä.
 */
const TYYLI = (henkilo) => `Vintage adventure book character portrait of ${henkilo}, `
  + 'painted in warm gouache with fine ink outlines, bust portrait '
  + 'centered on aged light parchment paper background, soft warm '
  + 'cream tones (like old paper, #f7f5f0), edges fading gently into '
  + 'plain parchment, lit warmly from the upper left like candlelight. '
  + 'No text, no frame, no border, no black background. Muted antique '
  + 'palette with one strong accent color. Square 1:1. '
  + 'The warm parchment fills the ENTIRE square canvas edge to edge: '
  + 'all four corners and all four edges are plain empty parchment of '
  + 'the same cream tone. Do NOT paint a sheet of paper lying on a '
  + 'surface — no torn or curled paper edges, no paper outline, no '
  + 'drop shadow, no white surround, and no rectangular painted panel. '
  + 'The painting itself dissolves softly into the bare parchment on '
  + 'every side, with no hard edge anywhere.';

const KUVAT = [
  ['kohtaaminen-ateena', 'a Greek stonemason in his dusty work apron, pausing with a chisel in hand, weathered friendly face with dark hair and moustache, a small carved stone owl beside him'],
  ['kohtaaminen-sofia', 'a middle-aged Bulgarian woman tending a hot mineral spring, holding a long-handled copper ladle, wisps of steam around her, warm knowing smile, headscarf'],
  /*
   * Yhteinen "Kätkö löytyi!" -kuva laatattoman kohtaamisen
   * tuloskorttiin (Fablen tilaus 10.8.2026). Ei henkilöä — mutta sama
   * tyylikääre, jotta se istuu samaan korttiin kuin muotokuvat.
   */
  // "no candle visible": kääreen "like candlelight" on VALAISTUSOHJE,
  // mutta esineaiheessa malli maalasi sen rekvisiitaksi — palava
  // kynttilä vei katseen kolikoilta (Opus 3, 10.8.). Muotokuvissa
  // samaa ei tapahtunut, joten vartio on tässä eikä kääreessä.
  ['kohtaaminen-katko', 'a small hidden cache of old coins revealed inside a shallow hollow of warm sunlit weathered stone, a few silver and bronze coins spilling from a worn oilcloth pouch, the coins catching warm golden light and gleaming clearly, seen up close as a tight close-up of the hollow itself, no candle visible and no lamp visible, no flame, no deep dark cave interior'],
];

const pyydetyt = process.argv.slice(2);
const jono = KUVAT.filter(([k]) => !pyydetyt.length || pyydetyt.includes(k));
if (!jono.length) {
  console.error('Ei kohteita. Tunnetut:', KUVAT.map(([k]) => k).join(', '));
  process.exit(1);
}

mkdirSync(resolve(JUURI, 'assets/kohtaamiset'), { recursive: true });

async function generoi(tunnus, henkilo) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MALLI}:generateContent?key=${avain}`;
  const vastaus = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: TYYLI(henkilo) }] }],
      generationConfig: {
        responseModalities: ['IMAGE'],
        imageConfig: { aspectRatio: '1:1' },
      },
    }),
    signal: AbortSignal.timeout(120000),
  });
  if (!vastaus.ok) {
    const virhe = (await vastaus.text()).slice(0, 300).replace(new RegExp(avain, 'g'), '***');
    console.error(`${tunnus}: HTTP ${vastaus.status}: ${virhe}`);
    return false;
  }
  const data = await vastaus.json();
  const osat = data.candidates?.[0]?.content?.parts ?? [];
  const b64 = osat.find((p) => p.inlineData)?.inlineData?.data;
  if (!b64) {
    console.error(`${tunnus}: vastauksessa ei kuvaa (${JSON.stringify(data).slice(0, 160).replace(new RegExp(avain, 'g'), '***')})`);
    return false;
  }
  const polku = resolve(JUURI, `assets/kohtaamiset/${tunnus}.png`);
  writeFileSync(polku, Buffer.from(b64, 'base64'));
  console.log(`${tunnus}: ${(Buffer.from(b64, 'base64').length / 1024).toFixed(0)} kt → ${polku}`);
  return true;
}

let onnistui = 0;
for (const [tunnus, henkilo] of jono) {
  if (await generoi(tunnus, henkilo)) onnistui++;
  await new Promise((r) => setTimeout(r, 2000));
}
console.log(`Valmis: ${onnistui}/${jono.length}.`);
