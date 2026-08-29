/*
 * Pelin oma MUSIIKKIPALETTI ElevenLabsin musiikkirajapinnalla
 * (omistajan tilaus 29.8.2026: "generoi ääniä ja musiikkeja ja laita
 * suoraan peliin").
 *
 * NELJÄ RAITAA, KAKSI PARIA. Paletti ei ole neljä irrallista kappaletta
 * vaan kaksi paria, ja juuri se tekee siitä paletin:
 *
 *   musa-pohja.mp3     hyvin harva pohjavire, joka soi ambienssin ALLA
 *                      koko matkan ajan (looppi).
 *   musa-visa-2.mp3    kysymyksen tikittävä uteliaisuus (looppi).
 *   musa-aarre.mp3     tavallisen aarteen lämmin aihe (ei looppi).
 *   musa-paaaarre.mp3  SAMA AIHE juhlavampana pääaarteelle (ei looppi).
 *
 * Kahdella viimeisellä on sama sävelaihe kahdessa asussa: kun pelaaja
 * lopulta löytää Aarnin luettelon pääaarteen, hän on kuullut aiheen jo
 * kymmeniä kertoja pienempänä. Siksi promptit alla EIVÄT ole toisistaan
 * riippumattomia — pääaarteen prompti kuvaa nimenomaan saman teeman
 * laajennusta. Jos toinen generoidaan uusiksi, KUMPIKIN kannattaa
 * generoida uusiksi, muuten sukulaisuus katoaa.
 *
 * MIKSI musa-visa-2 EIKÄ musa-visa: vanhaa visamusiikkia ei
 * ylikirjoiteta. Pelin viittaus vaihdetaan (js/aani-ehdokkaat.js,
 * 'musiikki:tietovisa' → oletus), ja vanha valinta jää ehdokaslistaan.
 * Paluu on siis yhden rivin vaihto eikä tiedoston palautus — sama
 * periaate kuin js/sound.js:n SALLITUT_TEHOSTEET-historiassa.
 *
 * RAJAPINTA (haettu dokumentaatiosta 29.8.2026):
 *   POST https://api.elevenlabs.io/v1/music
 *   otsakkeet: xi-api-key, Content-Type: application/json
 *   runko: { prompt, music_length_ms (3000…600000), model_id,
 *            output_format, force_instrumental }
 *   vastaus: mp3-tavut sellaisenaan (ei JSONia) — sama muoto kuin
 *   /v1/text-to-dialogue palauttaa luennoille.
 * Yksityiskohtaisempi /v1/music/detailed palauttaa JSONin
 * sävellyssuunnitelmineen; sitä ei tarvita, koska raidat ovat lyhyitä
 * ja yhdellä promptilla kuvattavia.
 *
 * Käyttö:  ELEVEN_API_KEY=... node tools/generoi-musiikki.mjs pohja visa
 *          ELEVEN_API_KEY=... node tools/generoi-musiikki.mjs kaikki
 * Kuiva testiajo ilman avainta ja ilman API-kutsuja (mitä ajo tekisi):
 *          ELEVEN_KUIVA=1 node tools/generoi-musiikki.mjs kaikki
 * Avain on repon Actions-secretissä (Raamattu → "Äänet ja luennat");
 * sitä ei tallenneta minnekään, ei edes lokiin.
 *
 * HUOM konttiympäristössä: Noden fetch ei käytä ympäristön proxyä
 * ilman lippua — aja NODE_USE_ENV_PROXY=1, tai "Host not in
 * allowlist" -virhe tulee omasta putkesta vaikka verkko on auki.
 */

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const OSOITE = 'https://api.elevenlabs.io/v1/music';
const MALLI = 'music_v2';
/*
 * Sama muoto kuin luennoilla ja tehosteilla (mp3_44100_128). Musiikin
 * oletus olisi mp3_48000_192, mutta paletti soi pelissä ambienssin alla
 * ja väistöjen läpi — 128 kbps riittää siihen kuuluvasti, ja tiedostot
 * pysyvät kevyinä, koska ne haetaan ämpäristä joka avauksella.
 */
const MUOTO = 'mp3_44100_128';

/*
 * TYYLI ON YHTEINEN KAIKILLE NELJÄLLE. Se on erillinen vakio eikä
 * kopioitu jokaiseen promptiin, koska juuri tämä lause tekee raidoista
 * saman pelin musiikkia: sama kokoonpano, sama aikakausi, sama sävy.
 * Jos yksi raita generoidaan uusiksi kuukauden päästä, se saa saman
 * tyylin automaattisesti eikä muistin varassa.
 *
 * Promptit ovat englanniksi, koska malli on koulutettu englanniksi —
 * sama linjaus kuin tehosteiden ja aarrekuvien promptikielessä.
 */
const TYYLI = 'Style: 1873 travel-diary adventure. Warm chamber orchestra: '
  + 'piano, soft strings, light woodwind, a faint hint of music box. '
  + 'No modern synths, no drum kit, no electronic percussion, no vocals. '
  + 'Elegant, curious, never childish, never comedic.';

/*
 * RAIDAT. Tiedostonimi on kytkentä samalla tavalla kuin luennoissa:
 * peli hakee juuri tämän nimen (js/ambience-stream.js POHJA_MUSIIKKI,
 * js/aani-ehdokkaat.js 'musiikki:tietovisa', js/ui.js AARRE_MUSIIKKI),
 * joten nimeäminen on tässä yhdessä paikassa eikä kutsujan muistin
 * varassa.
 *
 * `looppi: true` ei mene APIin — se on muistutus kuuntelijalle siitä,
 * mitä raidalta pitää tarkistaa ennen julkaisua (sauma).
 */
export const RAIDAT = {
  pohja: {
    tiedosto: 'musa-pohja.mp3',
    kesto: 80000,
    looppi: true,
    kuvaus: 'Pohjavire, soi ambienssin alla',
    prompt: 'A very simple, sparse, slow ambient underscore that sits far '
      + 'beneath other sounds. Long sustained low strings and a single soft '
      + 'piano note every few bars. Almost no melody, no build, no climax, '
      + 'no percussion. It should be barely noticeable and never pull '
      + 'attention. Seamless loop: begin and end on the same quiet sustained '
      + 'chord so the track can repeat forever without a seam. '
      + `${TYYLI}`,
  },
  visa: {
    tiedosto: 'musa-visa-2.mp3',
    kesto: 45000,
    looppi: true,
    kuvaus: 'Tietovisan kysymysmusiikki (korvaa nykyisen viittauksen)',
    prompt: 'A light, ticking underscore for a moment of curiosity: someone '
      + 'is thinking hard over an open notebook. Gentle staccato piano and '
      + 'pizzicato strings keep a soft clock-like pulse, a faint music box '
      + 'figure answers it. Tension of wondering, never threat or danger; '
      + 'no stingers, no rising alarm. Quiet and steady throughout. '
      + 'Seamless loop: begin and end on the same pulse so the track can '
      + 'repeat without a seam. '
      + `${TYYLI}`,
  },
  aarre: {
    tiedosto: 'musa-aarre.mp3',
    kesto: 10000,
    looppi: false,
    kuvaus: 'Tavallisen aarteen paljastus (lyhyt lämmin aihe)',
    prompt: 'A short warm reveal: a small, beautiful object comes into the '
      + 'light. A simple rising four-note theme on piano, answered by soft '
      + 'strings and one clear music box chime, resolving warmly. Intimate '
      + 'and modest in scale, a quiet delight rather than a fanfare. Starts '
      + 'immediately with no silent lead-in and settles into a clean ending. '
      + `${TYYLI}`,
  },
  paaaarre: {
    tiedosto: 'musa-paaaarre.mp3',
    kesto: 13000,
    looppi: false,
    kuvaus: 'Pääaarteen fanfaari (sama aihe juhlavampana)',
    prompt: 'The same simple rising four-note theme as a small warm reveal '
      + 'cue, now returning in full: the theme is stated grandly by the whole '
      + 'chamber orchestra, strings singing it out with horn support, piano '
      + 'underneath, and the music box chime crowning the final chord. A '
      + 'proper but tasteful fanfare for the greatest find of the journey — '
      + 'triumphant and moved, never bombastic. Same key and same melody as '
      + 'the smaller cue so the two are clearly related. Starts immediately '
      + 'with no silent lead-in and ends on a full sustained chord. '
      + `${TYYLI}`,
  },
};

/** Raitalista argumenteista; 'kaikki' avaa koko paletin. */
export function valitseRaidat(argumentit) {
  if (!argumentit.length) return null;
  if (argumentit.length === 1 && argumentit[0] === 'kaikki') return Object.keys(RAIDAT);
  return argumentit;
}

const pyydetyt = valitseRaidat(process.argv.slice(2));
if (!pyydetyt) {
  console.error('Anna raidat: node tools/generoi-musiikki.mjs pohja visa aarre paaaarre');
  console.error(`Koko paletti: node tools/generoi-musiikki.mjs kaikki (${Object.keys(RAIDAT).join(', ')})`);
  process.exit(1);
}

/*
 * KUIVA AJO (ELEVEN_KUIVA=1): tulostaa mitä generoitaisiin eikä kutsu
 * APIa. Sama tarkoitus kuin luennoissa: raidan avain, kohdetiedosto,
 * kesto ja prompti näkee vain ajamalla, ja väärä avain huomattaisiin
 * muuten vasta siitä, ettei tiedostoa synny. Avainta ei tarvita.
 */
const kuiva = process.env.ELEVEN_KUIVA === '1';

const avain = process.env.ELEVEN_API_KEY ?? process.env.ELEVENLABS_API_KEY;
if (!avain && !kuiva) {
  console.error('ELEVEN_API_KEY puuttuu ympäristöstä — musiikkia ei voi generoida.');
  console.error('Kuivan testiajon saa ilman avainta: ELEVEN_KUIVA=1 node tools/generoi-musiikki.mjs kaikki');
  process.exit(1);
}

if (kuiva) console.log('KUIVA AJO (ELEVEN_KUIVA=1) — APIa ei kutsuta, tiedostoja ei kirjoiteta.');

let virheita = 0;
for (const nimi of pyydetyt) {
  const raita = RAIDAT[nimi];
  if (!raita) {
    console.error(`${nimi}: tuntematon raita — tunnetut: ${Object.keys(RAIDAT).join(', ')}.`);
    virheita += 1;
    continue;
  }
  const polku = `assets/audio/${raita.tiedosto}`;
  if (kuiva) {
    console.log(`${nimi}: ${polku} — ${(raita.kesto / 1000).toFixed(0)} s`
      + `${raita.looppi ? ', saumaton looppi' : ''} (${raita.kuvaus})`);
    console.log(`  malli ${MALLI}, muoto ${MUOTO}, force_instrumental`);
    console.log(`  prompti: ${raita.prompt}`);
    continue;
  }
  console.log(`${nimi}: generoidaan ${polku} (${(raita.kesto / 1000).toFixed(0)} s)…`);
  const vastaus = await fetch(OSOITE, {
    method: 'POST',
    headers: { 'xi-api-key': avain, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: raita.prompt,
      music_length_ms: raita.kesto,
      model_id: MALLI,
      output_format: MUOTO,
      // Paletti on soitinmusiikkia: laulu veisi huomion pelin omalta
      // kertojalta ja kaupunkien äänimaisemalta.
      force_instrumental: true,
    }),
    signal: AbortSignal.timeout(300000),
  });
  if (!vastaus.ok) {
    /*
     * Virherunko näkyviin (ilman avainta) — juuri tästä selviää myös se
     * ainoa tapaus, jota ei voi tietää etukäteen: onko musiikkirajapinta
     * lainkaan auki tällä avaimella. 401/403 kertoo ettei ole, ja
     * silloin paletin generointi jää odottamaan käyttöoikeutta —
     * pelikytkennät ovat jo paikallaan ja hiljenevät siististi.
     */
    console.error(`${nimi}: HTTP ${vastaus.status}: ${(await vastaus.text()).slice(0, 400)}`);
    process.exit(1);
  }
  const kohde = resolve(JUURI, polku);
  const data = Buffer.from(await vastaus.arrayBuffer());
  writeFileSync(kohde, data);
  console.log(`${nimi}: ${(data.length / 1024).toFixed(0)} kt → ${kohde}`);
}

if (kuiva) {
  console.log(virheita
    ? `Kuiva ajo valmis — ${virheita} tuntematonta raitaa.`
    : 'Kuiva ajo valmis — kaikille pyydetyille raidoille löytyi prompti ja kohdetiedosto.');
  process.exit(virheita ? 1 : 0);
}
if (virheita) process.exit(1);
console.log('Valmis. Muista: tiedostot repoon ja KUUNTELE ne ennen julkaisua —');
console.log('looppiraidoilta sauma, aarreraidoilta se että aihe on kuultavasti sama.');
