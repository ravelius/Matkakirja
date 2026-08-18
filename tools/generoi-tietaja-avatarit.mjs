/*
 * Tietäjätasojen pöllöavatarien AI-generointi (omistajan tilaus
 * 18.8.2026: "Tietäjätasoille voisi generoida omat hyvin pienet
 * avatarit … värillisiä ja kaikki pöllöhenkisiä. Ehkä vain pöllön ikä
 * lisääntyisi ja hänelle tulisi lisää rekvisiittaa tasojen karttuessa
 * … Voisi generoida mahdollisimman hienoiksi").
 *
 * Sama putki kuin tools/generoi-varustekuvat.mjs: gemini-3-pro-image
 * antaa 1024×1024 PNG:n, joka pienennetään 512 px:n JPEG:ksi
 * Chromiumin kanvaasilla samassa ajossa. Tyyli on varustekuvien
 * perhettä (lämmin guassi + musteviivat pergamentilla), mutta aihe on
 * HAHMOMUOTOKUVA: sama pöllö vanhenee ja saa rekvisiittaa tasolta
 * toiselle. Untuvikosta Suurtietäjäksi.
 *
 * Käyttö:  NODE_USE_ENV_PROXY=1 node tools/generoi-tietaja-avatarit.mjs [avain …]
 *          Avain on muotoa taso-01 (ja viisas-pollo); ilman
 *          argumentteja generoidaan kaikki. KATSO JOKAINEN KUVA
 *          SILMIN ennen peliin kytkemistä.
 * Ulos:    assets/tietaja/<avain>.jpg suoraan 512×512:na.
 *
 * KUSTANNUSSÄÄNTÖ (sama kuin miniatyyreissä, omistajan päätös
 * 16.8.2026): yksi otto per avain; hylätyt generoidaan uudelleen
 * vasta katselmoinnin jälkeen täsmäavaimilla. Jokainen otto ~0,04 €.
 *
 * API-avainta EI koskaan repoon eikä lokiin.
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MALLI = process.env.VARUSTE_MALLI ?? 'gemini-3-pro-image';
const LEVEYS = 512;
const LAATU = 0.88;

const avain = process.env.GOOGLE_API_KEY ?? process.env.GOOGLW_API_KEY;
if (!avain) {
  console.error('GOOGLE_API_KEY (tai GOOGLW_API_KEY) puuttuu ympäristöstä — kuvia ei voi generoida.');
  process.exit(1);
}

/*
 * Tyylikääre: varustekuvien kääre sovitettuna hahmomuotokuvaan.
 * "Seen from above" on poistettu (pöllö katsotaan suoraan edestä) ja
 * tilalla on muotokuvaohje. Väripaletti saa olla varusteita
 * runsaampi — omistaja pyysi värillisiä — mutta pohja pysyy
 * antiikkisena, jotta avatarit istuvat pelin pergamenttiin.
 */
const TYYLI = (aihe) => `Vintage adventure book character portrait of ${aihe}, `
  + 'painted in warm colorful gouache with fine ink outlines, '
  + 'the owl centered and facing the viewer, full body visible, '
  + 'on aged light parchment paper background, soft warm cream tones '
  + '(like old paper, #f7f5f0), edges fading gently into plain '
  + 'parchment, lit warmly from the upper left like candlelight. '
  + 'Rich storybook colors on the owl and its props, antique but '
  + 'lively palette. No text, no writing, no letters, no numbers, '
  + 'no labels, no frame, no border, no black background, no humans. '
  + 'No candle visible, no lamp visible, no flame. Square 1:1. '
  + 'The warm parchment fills the ENTIRE square canvas edge to edge: '
  + 'all four corners and all four edges are plain empty parchment of '
  + 'the same cream tone. Do NOT paint a sheet of paper lying on a '
  + 'surface — no torn or curled paper edges, no paper outline, no '
  + 'drop shadow, no white surround, and no rectangular painted panel. '
  + 'The painting itself dissolves softly into the bare parchment. '
  + 'The background is plain cream parchment ONLY — no colored wash, '
  + 'no glow, no halo and no vignette of any color behind the owl.';

/*
 * Sama pöllöhahmo kymmenessä iässä. Jatkuvuuden runko toistetaan
 * jokaisessa promptissa (POLLO), ja tasokohtainen osa kertoo iän ja
 * rekvisiitan. Rekvisiitta on 1870-luvun matkailijan maailmasta —
 * sama aikakausi kuin isoisän matkapäiväkirjassa.
 */
const POLLO = 'a round-faced tawny owl with large warm amber eyes, '
  + 'cream and chestnut-brown feathers';

const KUVAT = [
  /*
   * VIISAS PÖLLÖ ITSE (omistajan tilaus 18.8.2026, kalevalainen kehys
   * hyväksytty). Pöllö löytyy ensimmäisen laatan alta omana
   * aarteenaan, ja paljastuskortti näyttää tämän kuvan (js/pollo.js
   * POLLO_AARRE.kuva).
   *
   * ERI LAJI KUIN PELAAJAN AVATAR: Viisas Pöllö on EMO — suuri
   * huuhkaja — kun taas tasoavatarit ovat lehtopöllöjä. Siksi tämä
   * ei käytä POLLO-runkoa lainkaan. Ei tasorekvisiittaa: ei hattua,
   * ei laseja, ei mitalia. Vanhuus ja viisaus ovat höyhenissä ja
   * katseessa, ja ainoa koriste on ohut karjalaisen kirjonnan
   * henkinen nauha vinjetin alareunassa — vihje, ei kehys.
   */
  ['viisas-pollo', 'a large dignified Eurasian eagle-owl (prominent '
    + 'ear tufts, deep orange eyes, dark grey-brown plumage) perched '
    + 'on a gently curved plain wooden branch, wearing a narrow '
    + 'traditional Karelian woven band draped across its chest like '
    + 'a ceremonial sash — red and white geometric folk embroidery '
    + 'pattern, modest width, resting naturally on the feathers; no '
    + 'hat, no spectacles, nothing else worn; a thin red Karelian '
    + 'embroidery band as a small ornament strip at the bottom of '
    + 'the vignette, no frame around the picture'],

  ['taso-01', `${POLLO} as a tiny newly-hatched owlet: a fluffy round `
    + 'ball of pale downy feathers, oversized curious amber eyes, '
    + 'stubby little wings, standing slightly wobbly on a small bare '
    + 'twig, utterly adorable and eager'],

  ['taso-02', `${POLLO} as a slim young fledgling starting its first `
    + 'journey: first true feathers still fluffy at the edges, a tiny '
    + 'knotted red travel bundle on a stick held over one shoulder '
    + 'with a wing, one foot lifted mid-step, eyes bright with '
    + 'curiosity'],

  ['taso-03', `${POLLO} as a young owl studying an unrolled small `
    + 'sepia map held open in both wings, head tilted in '
    + 'concentration, a thin blue ribbon around its neck, the map '
    + 'plain and unlabeled'],

  ['taso-04', `${POLLO} as a grown traveller owl: a small worn `
    + 'leather satchel slung across its chest and a round brass '
    + 'compass hanging from its neck on a cord, standing tall and '
    + 'confident, feathers sleek from the road'],

  ['taso-05', `${POLLO} as a seasoned explorer: a smart little tweed `
    + 'travel cap between its ear tufts, a brass telescope tucked '
    + 'under one wing, a knotted green scarf at the neck, gaze fixed '
    + 'keenly toward the horizon'],

  ['taso-06', `${POLLO} as a story-collecting owl: a white quill pen `
    + 'held in one wing and a small open leather journal in the '
    + 'other, a tiny ink bottle by its feet, a knowing gentle smile, '
    + 'a deep red scarf around the neck'],

  ['taso-07', `${POLLO} as a treasure-wise owl: holding a round `
    + 'brass-rimmed magnifying glass in one wing, a small open '
    + 'wooden chest by its feet with a soft golden glow rising from '
    + 'inside, one eyebrow feather raised appraisingly'],

  ['taso-08', `${POLLO} as a distinguished scholar of the world: `
    + 'small round gold-rimmed spectacles on its beak, one wing '
    + 'resting on a tabletop globe beside it, a neat waistcoat of '
    + 'deep green, feathers greying slightly at the ear tufts'],

  ['taso-09', `${POLLO} as an elder owl in a long old-fashioned `
    + 'brown travel coat, a gold pocket watch on a chain across its '
    + 'front, feathers silvering at the brow, standing with quiet '
    + 'dignity, eyes full of remembered journeys'],

  ['taso-10', `${POLLO} as a grand old sage: snow-white feathered `
    + 'brows and chest, round golden spectacles, a soft midnight-blue '
    + 'scholar\'s cap with a tiny gold tassel, a gnarled wooden staff '
    + 'in one wing and a small gleaming medal on a ribbon, radiating '
    + 'calm ancient wisdom'],

];

const uusiksi = process.argv.includes('--uusiksi');
const pyydetyt = process.argv.slice(2).filter((a) => a !== '--uusiksi');
const jono = KUVAT.filter(([k]) => !pyydetyt.length || pyydetyt.includes(k))
  .filter(([k]) => {
    const polku = resolve(JUURI, `assets/tietaja/${k}.jpg`);
    if (existsSync(polku) && !(uusiksi && pyydetyt.includes(k))) {
      console.log(`${k}: on jo — ohitetaan (uusinta vain avaimella + --uusiksi).`);
      return false;
    }
    return true;
  });
if (!jono.length) {
  console.error('Ei kohteita. Tunnetut:', KUVAT.map(([k]) => k).join(', '));
  process.exit(1);
}

mkdirSync(resolve(JUURI, 'assets/tietaja'), { recursive: true });

async function avaaPienentaja() {
  const { chromium } = await import('playwright');
  const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
  const sivu = await selain.newPage();
  return {
    async pienenna(png) {
      const jpg = await sivu.evaluate(async ({ data, leveys, laatu }) => {
        const kuva = new Image();
        kuva.src = `data:image/png;base64,${data}`;
        await kuva.decode();
        const kanvaasi = document.createElement('canvas');
        kanvaasi.width = leveys;
        kanvaasi.height = leveys;
        const piirto = kanvaasi.getContext('2d');
        piirto.imageSmoothingQuality = 'high';
        piirto.drawImage(kuva, 0, 0, leveys, leveys);
        return kanvaasi.toDataURL('image/jpeg', laatu).split(',')[1];
      }, { data: png.toString('base64'), leveys: LEVEYS, laatu: LAATU });
      return Buffer.from(jpg, 'base64');
    },
    sulje: () => selain.close(),
  };
}

async function generoi(tunnus, aihe, pienentaja) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MALLI}:generateContent?key=${avain}`;
  const vastaus = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: TYYLI(aihe) }] }],
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
  const jpg = await pienentaja.pienenna(Buffer.from(b64, 'base64'));
  const polku = resolve(JUURI, `assets/tietaja/${tunnus}.jpg`);
  writeFileSync(polku, jpg);
  console.log(`${tunnus}: ${(jpg.length / 1024).toFixed(0)} kt → ${polku}`);
  return true;
}

const pienentaja = await avaaPienentaja();
let onnistui = 0;
try {
  for (const [tunnus, aihe] of jono) {
    if (await generoi(tunnus, aihe, pienentaja)) onnistui++;
    await new Promise((r) => setTimeout(r, 2000));
  }
} finally {
  await pienentaja.sulje();
}
console.log(`Valmis: ${onnistui}/${jono.length} (≈ ${(jono.length * 0.04).toFixed(2)} €).`);
