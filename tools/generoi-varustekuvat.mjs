/*
 * Varustekuvien (linssien) AI-generointi — omistajan tilaus 10.8.2026:
 * *"Tee myös varusteet kuviksi samoin kuin aarteet."*
 *
 * Sama putki kuin tools/generoi-aarrekuvat.mjs ja
 * tools/generoi-kohtaamiskuvat.mjs, mutta kaksi eroa:
 *
 *  1. TAUSTA ON PERGAMENTTI, EI MUSTA. Varustekuva tulee varusteen
 *     paljastuskorttiin ja laukkuun eli vaalealle paperille, kuten
 *     kohtaamisten muotokuvat — aarteiden musta tausta olisi siinä
 *     möhkäle. Tyylikääre on siksi kohtaamiskuvien kääre, johon on
 *     otettu mukaan aarrekuvien esinevartiot.
 *  2. KUVA EI ESITÄ ESINETTÄ VAAN TOIMINNAN. Varusteen tunnistaa
 *     siitä, mitä se NÄYTTÄÄ kartalla (sama sääntö kuin linssien
 *     kuvakkeissa, ks. topografia.js ikoni-kommentti). Siksi
 *     jokaisessa promptissa on kartta, jonka linssin lasi muuttaa:
 *     lasin sisällä maailma on toinen kuin sen ulkopuolella. Pelkkä
 *     suurennuslasi näyttäisi kaikilla linsseillä samalta.
 *
 * Käyttö:
 *   NODE_USE_ENV_PROXY=1 GOOGLE_API_KEY=... node tools/generoi-varustekuvat.mjs [tunnus …]
 * Ilman argumentteja generoi kaikki. Tunnukset ovat linssien tunnuksia
 * (js/linssit/rekisteri.js): topografia, vesistot, radio, vertailu,
 * maatiedot. Malli vaihdettavissa VARUSTE_MALLI-ympäristömuuttujalla.
 *
 * Ulos: assets/varusteet/varuste-<tunnus>.jpg suoraan 512×512:na.
 * Malli antaa 1024×1024 PNG:n, ja pienennys tehdään tässä samassa
 * ajossa Chromiumin kanvaasilla (playwright on jo repon riippuvuus) —
 * erillistä pienennysvaihetta ei siis tarvita, toisin kuin aarre- ja
 * kohtaamiskuvissa. Alkuperäistä 1024-PNG:tä ei kirjoiteta minnekään.
 *
 * API-avainta EI koskaan repoon eikä lokiin.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MALLI = process.env.VARUSTE_MALLI ?? 'gemini-3-pro-image';
const LEVEYS = 512;
const LAATU = 0.88;

// Ympäristössä avain on toisinaan kirjoitusvirheellisellä nimellä
// GOOGLW_API_KEY — luetaan molemmat, ettei generointi kaadu nimen
// kirjoitusasuun (sama kuin tools/generoi-aarrekuvat.mjs).
const avain = process.env.GOOGLE_API_KEY ?? process.env.GOOGLW_API_KEY;
if (!avain) {
  console.error('GOOGLE_API_KEY (tai GOOGLW_API_KEY) puuttuu ympäristöstä — kuvia ei voi generoida.');
  process.exit(1);
}

/*
 * Yhtenäinen tyyli joka promptin ympärille. Runko on
 * generoi-kohtaamiskuvat.mjs:n kääre (pergamentti reunasta reunaan),
 * ja siihen on lisätty kaksi asiaa, jotka aiemmat ajot ovat
 * opettaneet:
 *
 *  - "no candle visible, no flame": kääreen "like candlelight" on
 *    VALAISTUSOHJE, mutta esineaiheessa malli maalasi sen
 *    rekvisiitaksi (Opus 3:n kätkökuva, 10.8.). Varusteet ovat
 *    esineitä, joten vartio kuuluu tänne kääreeseen.
 *  - "no writing, no letters, no numbers": jokaisessa promptissa on
 *    kartta, ja kartta houkuttelee mallia kirjoittamaan siihen
 *    paikannimiä. Siansaksaa vanhalla kartalla ei kortissa lue kukaan
 *    hyvällä.
 */
const TYYLI = (aihe) => `Vintage adventure book illustration of ${aihe}, `
  + 'painted in warm gouache with fine ink outlines, seen from above, '
  + 'centered on aged light parchment paper background, soft warm '
  + 'cream tones (like old paper, #f7f5f0), edges fading gently into '
  + 'plain parchment, lit warmly from the upper left like candlelight. '
  + 'No text, no writing, no letters, no numbers, no labels, no frame, '
  + 'no border, no black background, no people. No candle visible, no '
  + 'lamp visible, no flame. Muted antique palette with one strong '
  + 'accent color. Square 1:1. '
  + 'The warm parchment fills the ENTIRE square canvas edge to edge: '
  + 'all four corners and all four edges are plain empty parchment of '
  + 'the same cream tone. Do NOT paint a sheet of paper lying on a '
  + 'surface — no torn or curled paper edges, no paper outline, no '
  + 'drop shadow, no white surround, and no rectangular painted panel. '
  + 'The painting itself dissolves softly into the bare parchment on '
  + 'every side, with no hard edge anywhere. '
  /*
   * Uusinnan lisä (omistaja 18.8.2026: "ei ihan niin ilmiselvästi näy
   * ... mitä ne tekevät"): kuva näkyy laukussa alle sadan pikselin
   * ympyränä, joten sen on luettava KUVAKKEENA — yksi iso aihe,
   * paksut muodot, vahva kontrasti, ei pikkuruista sälää.
   */
  + 'This image is used as a SMALL GAME ICON, so it must read clearly '
  + 'even at thumbnail size: one single bold motif filling the frame, '
  + 'large simple shapes, strong color contrast between the motif and '
  + 'the parchment, and no fine detail that would vanish when small.';

/*
 * Yhteinen alku niille varusteille, jotka ovat oikeasti linssejä.
 * Sama lasi joka kuvassa pitää varusteet samana sarjana, ja kuvien
 * ero syntyy siitä mitä lasin läpi näkyy — juuri kuten pelissä.
 *
 * Loppulause on ensimmäisen oton opetus (topografia, otto 1): malli
 * maalasi kartan ARKIKSI, jolla oli oma suora reunansa. Kortissa se
 * lukisi laatikkona, vaikka kääre kieltää laatikot — kääreen kielto
 * koskee maalausta kokonaisuutena, ja kartta on maalauksen sisällä
 * oma esineensä. Siksi kartankin reunattomuus on sanottava ääneen.
 */
const KARTTA = 'a plain unlabeled old map of coastlines drawn in pale '
  + 'sepia ink directly onto the parchment itself, its coastlines simply '
  + 'thinning out and fading away toward the edges — the map is not a '
  + 'sheet of paper and has no edge, outline, straight boundary or '
  + 'corner of its own anywhere';
/*
 * Uusinnassa lasi kasvoi: ensimmäisen sarjan lasit jäivät pieniksi ja
 * lasin sisältö — se ainoa asia, joka erottaa varusteet toisistaan —
 * hukkui laukun pikkukuvassa. Nyt lasi täyttää valtaosan ruudusta ja
 * varsi jää lyhyeksi kulmaan.
 */
const LASI = 'a LARGE round brass-rimmed magnifying glass whose round '
  + 'glass fills most of the picture, with only a short turned wooden '
  + `handle reaching toward one corner, lying on ${KARTTA}`;

const KUVAT = [
  /*
   * Topografialinssi ('Maailma maastona: väri kertoo korkeuden, varjo
   * kertoo muodon'). Linssin oma kuvakekommentti sanoo saman säännön:
   * kuvan on kerrottava mitä linssi NÄYTTÄÄ, ja tämä näyttää vuoria.
   */
  ['topografia', `${LASI}; through the round glass the flat map turns `
    + 'into a vivid full-color relief map of mountain ranges and '
    + 'valleys, green lowlands rising through brown ridges to white '
    + 'snowy peaks, with soft shadows falling from the north-west that '
    + 'show the shape of the land; outside the glass the same map stays '
    + 'flat and pale sepia with no mountains'],

  /*
   * Vesistölinssi ('Joet ja järvet maaston päällä'). Kartan
   * ulkopuolella ei ole jokia lainkaan — juuri se on linssin idea
   * (omistaja 4.8.2026: joet pois pohjakartalta, oma linssi tilalle).
   */
  ['vesistot', `${LASI}; through the round glass a branching network of `
    + 'bright blue rivers and lakes appears, winding across green and '
    + 'brown terrain toward the sea; outside the glass the same map is '
    + 'flat pale sepia with no rivers and no lakes at all'],

  /*
   * Vertailulinssi ('Valitse kartalta enintään kolme maata Suomen
   * rinnalle'). Lasin alla kaupungit katoavat ja rajat tummenevat
   * (js/ui.js tahdistaVertailu), ja vertailu on käyriä.
   */
  ['vertailu', `${LASI}; through the round glass three neighbouring `
    + 'countries stand out as bold dark-outlined shapes, each filled '
    + 'with a different strong muted color — dusty green, deep red and '
    + 'ochre — with every town and dot gone; in the lower left corner '
    + 'of the picture, well clear of the handle and touching nothing, '
    + 'three thin curves rise side by side across the bare parchment '
    + 'like a small hand-drawn chart, one curve in each of the same '
    + 'three colors, with no axes, no grid, no scale markings and '
    + 'nothing written on them; outside the glass the map stays flat '
    + 'pale sepia with faint borders'],

  /*
   * Maiden tiedot ('Napauta kartalta mitä tahansa maata ja lue sen oma
   * lehti'). Varusteen idea on, että maa muuttuu luettavaksi, joten
   * lasin vieressä on kirja — mutta kuvitettu, ei kirjoitettu, koska
   * kääre kieltää tekstin (ja mallin teksti on siansaksaa).
   */
  ['maatiedot', `${LASI}; through the round glass one single country `
    + 'is filled with rich warm gold and ochre inside a firm dark ink '
    + 'outline, glowing as if lit from within, while its neighbours '
    + 'inside the same glass stay pale grey-sepia — one country lifted '
    + 'out of many; beside the glass on the parchment lies a small open '
    + 'book showing two tiny engraved pictures instead of any writing, '
    + 'its pages otherwise blank'],

  /*
   * Maailmanradio ('Kaupungit ovat play-nappeja: kuulet mitä siellä
   * lähetetään juuri nyt'). AINOA varuste, joka ei ole lasi: se ei
   * piirrä kerrosta vaan tuo äänen, ja sen oma kuvake on putkiradio.
   * Toiminta kerrotaan aalloilla, jotka tulevat kartan kaupungeista
   * laitteeseen.
   */
  ['radio', 'a small antique wooden valve radio set with a brass '
    + `tuning dial and a warmly glowing amber tuning scale, standing on ${KARTTA} `
    + 'whose sepia coastlines stay clearly visible around it; three '
    + 'small city dots on the map glow the same warm amber as the dial, '
    + 'and thin concentric arcs of radio waves spread outward from each '
    + 'glowing dot across the map toward the radio, showing sound '
    + 'travelling in from three distant cities; the glowing amber of '
    + 'the dial and the dots is the one strong accent color in an '
    + 'otherwise brown and cream picture; nothing is written on the '
    + 'dial'],
];

const pyydetyt = process.argv.slice(2);
const jono = KUVAT.filter(([k]) => !pyydetyt.length || pyydetyt.includes(k));
if (!jono.length) {
  console.error('Ei kohteita. Tunnetut:', KUVAT.map(([k]) => k).join(', '));
  process.exit(1);
}

mkdirSync(resolve(JUURI, 'assets/varusteet'), { recursive: true });

/*
 * Pienennys 1024 → 512 ja JPEG-pakkaus Chromiumin kanvaasilla.
 * Selain avataan kerran koko jonolle, koska käynnistys maksaa
 * enemmän kuin itse pienennys. Sivu on tyhjä about:blank — mitään ei
 * haeta verkosta, PNG menee sisään data-URL:na.
 */
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
  const polku = resolve(JUURI, `assets/varusteet/varuste-${tunnus}.jpg`);
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
console.log(`Valmis: ${onnistui}/${jono.length}.`);
