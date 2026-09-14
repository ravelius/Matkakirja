/*
 * Kaupunkien matkakirjaluentojen generointi ElevenLabsilla
 * (docs/isoisan-raamattu.md).
 *
 * KAKSI LÄHDETTÄ, YKSI KAUPUNKIAVAIN. Sama kaupunki voi kirjoittaa
 * isoisän merkinnän kahdessa paikassa, ja kortilla niistä näkyy vain
 * toinen:
 *
 *   FOKUSVIRTA  js/packs/fokusvirta-<id>.js → matkakirja.luenta
 *               → assets/audio/puhe-fokus-matkakirja-<id>.mp3
 *   SAAPUMISET  js/packs/<lauta>-saapumiset.js → <id>.luenta
 *               → assets/audio/puhe-<lauta>-saapuminen-<id>.mp3
 *
 * FOKUSVIRTA VOITTAA, kun kaupungilla on molemmat. Se ei ole
 * makuasia vaan sama sääntö kuin pelissä: js/ui.js renderFact antaa
 * fokusvirtakaupungin matkakirjakortin virralle koko käynnin ajaksi
 * (js/fokusvirta.js fokusvirtaMatkakirja), jolloin vanhan
 * saapumismerkinnän äänite ei enää soi kortilla lainkaan. Jos työkalu
 * generoisi sen, ajossa palaisi rahaa tiedostoon, jota kukaan ei kuule.
 *
 * TIEDOSTONIMI ON KYTKENTÄ. Fokusvirran matkakirjalohkon `aanite`-kenttä
 * osoittaa nimeen sellaisenaan (esim. fokusvirta-sofia.js), ja peli
 * lukee kentän suoraan datasta — jos nimi ja kenttä eriytyvät, kaiutin
 * näkyy kortilla mutta ei soi mitään. Nimeäminen on siksi tässä yhdessä
 * paikassa (kohdeTiedosto alla), ei kutsujan muistin varassa.
 *
 * Resepti on sama kuin aiemmissa luennoissa (docs/muistiinpanot-fablelle.md):
 * ääni "Viisas Kertoja", malli eleven_v3, /v1/text-to-dialogue,
 * mp3_44100_128. Stability kävi arvossa 0.4, mutta palautettiin
 * 0.5:een omistajan palautteesta 7.8.2026: "äänen vaihteluarvoa
 * kannattaa ottaa takaisinpäin, hyppii vähän liikaa".
 *
 * HÄNNÄN HILJAISUUSMITTAUSTA EI OLE TÄSSÄ TYÖKALUSSA. Lopputauko
 * (break-tagi) pyytää mallilta hiljaisuutta äänen loppuun, mutta
 * tools/generoi-avaus.mjs:n dekoodaava mittaus ja hiljaisuuspaddaus
 * jäävät sinne: ne vaativat mpg123-decoderin ja lamejs:n, joita
 * .github/workflows/generoi-luennat.yml asentaa vain avausajolle.
 * Kaupunkiluennat kuunnellaan ennen julkaisua (ks. sama työnkulku).
 *
 * Käyttö:  ELEVEN_API_KEY=... node tools/generoi-luennat.mjs --kaupungit lontoo,madrid
 * Kuiva testiajo ilman avainta ja ilman API-kutsuja (mitä ajo tekisi):
 *          node tools/generoi-luennat.mjs --dry-run --kaupungit madrid,venetsia
 * Rajattu retry vain epäonnistuneille kuitin riveille:
 *          ELEVEN_API_KEY=... node tools/generoi-luennat.mjs --retry-kuitti <kuitti.json>
 * Avain on repon Actions-secretissä (Raamattu → "Äänet ja luennat");
 * sitä ei tallenneta minnekään, ei edes lokiin.
 *
 * HUOM konttiympäristössä: Noden fetch ei käytä ympäristön proxyä
 * ilman lippua — aja NODE_USE_ENV_PROXY=1, tai "Host not in
 * allowlist" -virhe tulee omasta putkesta vaikka verkko on auki.
 */

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { AFRICA_SAAPUMISET } from '../js/packs/africa-saapumiset.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';

// Kaupunki etsitään laudoilta tässä järjestyksessä — tiedostonimeen
// tulee laudan tunnus (puhe-<lauta>-saapuminen-<id>.mp3).
//
// EUROOPPA EI OLE ENÄÄ LISTALLA (omistaja 8.9.2026): vanha
// saapumistaulu arkistoitiin pois pelistä (Raamattu: KOKO EUROOPPA
// KULKEE FOKUSVIRTAPAKKIEN KAUTTA), ja Euroopan kaupungit luetaan nyt
// fokusvirtapakeista — ne löytyvät tästä työkalusta ylempää
// (FOKUSVIRRAT, tiedosto puhe-fokus-matkakirja-<id>.mp3).
const LAUDAT = [
  ['africa', AFRICA_SAAPUMISET],
];

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const AANI = 'Sz0tRTEpybtDJ9ru2kgD'; // Viisas Kertoja
export const MALLI = 'eleven_v3';
export const STABILITY = 0.5;
export const OUTPUT_FORMAT = 'mp3_44100_128';
export const KUITIN_VERSIO = 1;
const ERAN_TURVARAJA = 10;
/*
 * Lopputauko (omistajan havainto 8.8.2026: tiedosto leikkautuu heti
 * viimeisen sanan perään ja loppuun jää naksahdus). Break-tagi
 * pyytää mallilta hiljaisuutta äänen loppuun, jolloin naksun voi
 * leikata pois rikkomatta puhetta. Tarkista ensimmäisestä ajosta
 * kuuntelemalla, että tauko todella syntyy — jos ei, kasvata aikaa.
 */
export const LOPPUTAUKO = ' <break time="1.0s" />';

/**
 * Kaupungin luenta ja sen kohdetiedosto — fokusvirta ensin.
 *
 * Palauttaa null, jos kaupungille ei löydy luentaa kummastakaan
 * lähteestä. Polku on repon juuresta, samassa muodossa kuin
 * fokusvirtojen `aanite`-kentässä.
 */
export function kohdeTiedosto(id) {
  const virta = FOKUSVIRRAT[id]?.matkakirja;
  if (virta?.luenta) {
    return {
      lahde: 'fokusvirta',
      nakyvaTeksti: virta.teksti,
      luenta: virta.luenta,
      polku: `assets/audio/puhe-fokus-matkakirja-${id}.mp3`,
      /*
       * Datan oma kenttä otetaan mukaan, jotta kuiva ajo paljastaa
       * eron heti: jos pakassa on `aanite`, sen on oltava täsmälleen
       * tämä polku — muuten peli hakee eri tiedostoa kuin työkalu
       * kirjoittaa.
       */
      kentta: virta.aanite ?? null,
    };
  }
  for (const [lauta, pakka] of LAUDAT) {
    const merkinta = pakka[id];
    if (merkinta?.luenta) {
      return {
        lahde: 'saapumiset',
        nakyvaTeksti: merkinta.teksti ?? merkinta.luenta,
        luenta: merkinta.luenta,
        polku: `assets/audio/puhe-${lauta}-saapuminen-${id}.mp3`,
        kentta: null,
      };
    }
  }
  return null;
}

export const sha256 = (data) => createHash('sha256').update(data).digest('hex');

export function tuotantoAvaimet(tyo, { batchId, sourceCommit }) {
  const nimi = tyo.polku.split('/').at(-1);
  const turvallinenEra = String(batchId).replace(/[^a-zA-Z0-9._-]/g, '-');
  const revisio = String(sourceCommit).slice(0, 12);
  return {
    /*
     * RAAKA ENSIN (omistajan sitova sääntö 14.9.2026, Raamattu:
     * "ALKUPERÄISET ÄÄNITIEDOSTOT SÄILYTETÄÄN AINA"). Horation putki ei
     * käsittele ääntä lainkaan (postprocess.kind === 'none'), joten
     * raaka ja final ovat sama tavujono ja sama sha256 — mutta raaka saa
     * silti oman, eräkohtaisen avaimensa, jota mikään myöhempi uusinta
     * tai käsittelypäätös ei voi ylikirjoittaa.
     */
    raw: `audio/raw/horatio/${turvallinenEra}/${nimi}`,
    staging: `audio/staging/horatio/${turvallinenEra}/${nimi}`,
    final: `audio/versions/horatio/${revisio}/${turvallinenEra}/${nimi}`,
    live: null,
  };
}

export function tuotantoEraId(tyot, sourceCommit) {
  const sisalto = tyot.map((tyo) => ({
    cityId: tyo.id,
    visibleTextSha256: sha256(tyo.nakyvaTeksti),
    ttsTextSha256: sha256(tyo.luenta + LOPPUTAUKO),
  }));
  return `horatio-${sha256(JSON.stringify({
    sourceCommit, voiceId: AANI, model: MALLI, stability: STABILITY,
    outputFormat: OUTPUT_FORMAT, postprocess: { kind: 'none' }, sisalto,
  })).slice(0, 20)}`;
}

export function parseArgumentit(argv = []) {
  const pilkoKaupungit = (arvo) => String(arvo ?? '').split(/[\s,]+/);
  const asetukset = {
    kaupungit: [], kuiva: false, planOnly: false, retryKuitti: null, kuitti: null,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arvo = argv[i];
    if (arvo === '--dry-run' || arvo === '--kuiva') asetukset.kuiva = true;
    else if (arvo === '--plan-only') asetukset.planOnly = true;
    else if (arvo === '--kaupungit') asetukset.kaupungit.push(...pilkoKaupungit(argv[++i]));
    else if (arvo === '--retry-kuitti') asetukset.retryKuitti = argv[++i] ?? null;
    else if (arvo === '--kuitti') asetukset.kuitti = argv[++i] ?? null;
    else if (arvo.startsWith('--')) throw new Error(`Tuntematon valitsin: ${arvo}`);
    else asetukset.kaupungit.push(...pilkoKaupungit(arvo));
  }
  asetukset.kaupungit = [...new Set(asetukset.kaupungit.map((x) => x.trim()).filter(Boolean))];
  return asetukset;
}

export function rajaaRetry(kaupungit, kuitti) {
  if (kuitti?.schemaVersion !== KUITIN_VERSIO || !Array.isArray(kuitti?.cities)) {
    throw new Error('Retry-kuitti ei ole tuettu tuotantokuitti.');
  }
  const epaonnistuneet = new Map(kuitti.cities
    .filter((rivi) => rivi.generation?.status === 'failed')
    .map((rivi) => [rivi.cityId, rivi]));
  const valitut = kaupungit.length ? kaupungit : [...epaonnistuneet.keys()];
  const vaarat = valitut.filter((id) => !epaonnistuneet.has(id));
  if (vaarat.length) throw new Error(`Retry sallii vain epäonnistuneet kaupungit: ${vaarat.join(', ')}`);
  return valitut.map((id) => ({ id, retryReason: epaonnistuneet.get(id).generation.retryReason }));
}

export function kestoSekunteina(polku) {
  const ajo = spawnSync('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', polku,
  ], { encoding: 'utf8' });
  const arvo = Number(ajo.stdout?.trim());
  if (ajo.error || ajo.status !== 0 || !Number.isFinite(arvo) || arvo <= 0) {
    throw new Error(`Äänitteen todellista kestoa ei saatu ffprobella: ${polku}`);
  }
  return Math.round(arvo * 1000) / 1000;
}

function gitCommit() {
  const ajo = spawnSync('git', ['-C', JUURI, 'rev-parse', 'HEAD'], { encoding: 'utf8' });
  if (ajo.status !== 0) throw new Error('Lähdecommitin lukeminen epäonnistui.');
  return ajo.stdout.trim();
}

export function kuittirivi(tyo, {
  status = 'planned', reason = null, raw = null, final = null, objectKeys = null,
} = {}) {
  const ttsTeksti = tyo.luenta + LOPPUTAUKO;
  const audio = (data, duration = null, objectKey = null) => data ? {
    sha256: sha256(data), bytes: data.byteLength, actualDurationSeconds: duration, objectKey,
  } : null;
  return {
    cityId: tyo.id,
    source: tyo.lahde,
    outputPath: tyo.polku,
    objectKeys,
    visibleText: { text: tyo.nakyvaTeksti, sha256: sha256(tyo.nakyvaTeksti) },
    ttsText: { text: ttsTeksti, sha256: sha256(ttsTeksti) },
    synthesis: {
      voiceId: AANI, model: MALLI, settings: { stability: STABILITY },
      outputFormat: OUTPUT_FORMAT, postprocess: { kind: 'none' },
    },
    generation: { status, retryReason: reason },
    rawAudio: audio(raw, final?.duration ?? null, objectKeys?.raw ?? null),
    finalAudio: audio(final?.data, final?.duration, objectKeys?.final ?? null),
  };
}

function lueKuitti(polku) {
  return JSON.parse(readFileSync(resolve(JUURI, polku), 'utf8'));
}

function kirjoitaKuitti(polku, kuitti) {
  const kohde = resolve(JUURI, polku);
  mkdirSync(dirname(kohde), { recursive: true });
  writeFileSync(kohde, `${JSON.stringify(kuitti, null, 2)}\n`);
}

/*
 * KAUPUNKILISTA SIEDÄTTÄÄ PILKUN. Ohje puhuu välilyönneistä, mutta
 * työnkulun syötekenttään kirjoitetaan käsin ja lista tulee usein
 * pilkullisena ("helsinki,kobenhavn,tallinna,tukholma"). Workflow
 * välittää syötteen sellaisenaan komentoriville, jolloin koko lista
 * osui tänne YHTENÄ avaimena, jolle ei tietenkään löytynyt luentaa:
 * ajo ohitti sen, generoi nolla tiedostoa ja kaatui vasta commit-
 * vaiheessa harhaanjohtavaan virheeseen "Yhtään tiedostoa ei syntynyt
 * eikä muuttunut" (ajo 33277398508, 29.8.2026). Erotin on siksi tässä
 * kumpi tahansa — pilkku tai välilyönti — eikä kutsujan muistin varassa.
 */
export async function main(argv = process.argv.slice(2), env = process.env) {
const args = parseArgumentit(argv);
const kuiva = args.kuiva || env.ELEVEN_KUIVA === '1';
let retryt = [];
if (args.retryKuitti) retryt = rajaaRetry(args.kaupungit, lueKuitti(args.retryKuitti));
const kaupungit = args.retryKuitti ? retryt.map((rivi) => rivi.id) : args.kaupungit;
if (!kaupungit.length) {
  console.error('Anna kaupungit: node tools/generoi-luennat.mjs lontoo madrid …');
  return 1;
}

/*
 * KUIVA AJO (ELEVEN_KUIVA=1): tulostaa mitä generoitaisiin eikä kutsu
 * APIa. Tarkoitettu sen todistamiseen, että kaupunkiavain osuu oikeaan
 * lähteeseen ja oikeaan tiedostonimeen — sitä ei näe mistään muualta
 * kuin ajamalla, ja väärä nimi huomattaisiin vasta pelissä hiljaisena
 * kaiuttimena. Avainta ei tarvita eikä lueta.
 */
const avain = env.ELEVEN_API_KEY ?? env.ELEVENLABS_API_KEY;
if (!avain && !kuiva && !args.planOnly) {
  console.error('ELEVEN_API_KEY puuttuu ympäristöstä — luentoja ei voi generoida.');
  console.error('Kuivan testiajon saa ilman avainta: ELEVEN_KUIVA=1 node tools/generoi-luennat.mjs …');
  return 1;
}

if (kuiva) console.log('KUIVA AJO (ELEVEN_KUIVA=1) — APIa ei kutsuta, tiedostoja ei kirjoiteta.');

/*
 * KOHTEET RATKAISTAAN ENSIN, VASTA SITTEN SOITETAAN APILLE. Tunnistamaton
 * avain (kirjoitusvirhe, kaupunki ilman luentaa, koko lista yhtenä
 * pötkönä) huomataan näin ennen kuin yksikään krediitti palaa, eikä ajo
 * voi enää päättyä hiljaa nollaan tiedostoon: puuttuva kohde on virhe
 * heti tässä työkalussa, siinä vaiheessa jossa syy myös näkyy.
 */
const tyot = [];
let puuttuvia = 0;
for (const id of kaupungit) {
  const tyo = kohdeTiedosto(id);
  if (!tyo) {
    console.error(`${id}: luenta-kenttä puuttuu (ks. docs/isoisan-raamattu.md) — ohitetaan.`);
    puuttuvia += 1;
    continue;
  }
  tyot.push({ id, ...tyo, retryReason: retryt.find((rivi) => rivi.id === id)?.retryReason ?? null });
}

if (!kuiva && !args.retryKuitti && tyot.length > ERAN_TURVARAJA) {
  console.error(`Turvaraja: maksullinen erä saa sisältää enintään ${ERAN_TURVARAJA} eksplisiittistä kaupunkia.`);
  return 1;
}

const kuittipolku = args.kuitti ?? 'assets/audio/luennat-tuotantokuitti.json';
if (!kuiva && !args.retryKuitti && existsSync(resolve(JUURI, kuittipolku))) {
  const aiempi = lueKuitti(kuittipolku);
  const onnistuneet = new Set((aiempi.cities ?? []).filter((r) => r.generation?.status === 'success').map((r) => r.cityId));
  const uusinnat = kaupungit.filter((id) => onnistuneet.has(id));
  if (uusinnat.length) {
    console.error(`Jo onnistuneita kaupunkeja ei generoida uudelleen: ${uusinnat.join(', ')}.`);
    console.error('Käytä uutta kuittipolkua uudelle hyväksytylle erälle tai --retry-kuittiä vain epäonnistuneisiin.');
    return 1;
  }
}

if (kuiva) {
  for (const tyo of tyot) {
    console.log(`${tyo.id}: lähde ${tyo.lahde} → ${tyo.polku} (${tyo.luenta.length} merkkiä)`);
    // Kytkennän tarkistus: pelin `aanite` ja työkalun kohde samaksi.
    if (tyo.lahde === 'fokusvirta') {
      if (!tyo.kentta) {
        console.log('  HUOM: fokusvirran matkakirjalta puuttuu aanite-kenttä '
          + '— kaiutin ei ilmesty kortille.');
      } else if (tyo.kentta !== tyo.polku) {
        console.error(`  RISTIRIITA: pakan aanite on ${tyo.kentta}, työkalu kirjoittaisi ${tyo.polku}.`);
        puuttuvia += 1;
      }
    }
  }
  console.log(puuttuvia
    ? `Kuiva ajo valmis — ${puuttuvia} kaupunkia jäi ilman kelvollista kohdetta.`
    : `Kuiva ajo valmis — kaikille ${tyot.length} kaupungille löytyi luenta ja kohdetiedosto.`);
  return puuttuvia ? 1 : 0;
}

if (puuttuvia) {
  console.error(`Tunnistamattomia kaupunkiavaimia: ${puuttuvia} — ei generoida mitään.`);
  console.error('Anna avaimet erikseen (pilkku tai välilyöntikin kelpaa) ja tarkista');
  console.error('kirjoitusasu js/packs/fokusvirrat.js:stä tai saapumispakasta.');
  return 1;
}

const batch = {
  id: '', sourceCommit: gitCommit(), retryOf: args.retryKuitti,
};
batch.id = tuotantoEraId(tyot, batch.sourceCommit);
const kuitti = {
  schemaVersion: KUITIN_VERSIO,
  batch,
  cities: tyot.map((tyo) => kuittirivi(tyo, {
    objectKeys: tuotantoAvaimet(tyo, { batchId: batch.id, sourceCommit: batch.sourceCommit }),
  })),
};
kirjoitaKuitti(kuittipolku, kuitti);
if (args.planOnly) {
  console.log(`Suunnitelmakuitti ${kuittipolku}: ${batch.id}, ${tyot.length} kaupunkia; APIa ei kutsuttu.`);
  return 0;
}
const paivitaKuittirivi = (id, rivi) => {
  const indeksi = kuitti.cities.findIndex((item) => item.cityId === id);
  kuitti.cities[indeksi] = rivi;
  kirjoitaKuitti(kuittipolku, kuitti);
};
for (const tyo of tyot) {
  const { id } = tyo;
  const objectKeys = tuotantoAvaimet(tyo, { batchId: batch.id, sourceCommit: batch.sourceCommit });
  console.log(`${id}: generoidaan lähteestä ${tyo.lahde} (${tyo.luenta.length} merkkiä)…`);
  let vastaus;
  try {
    vastaus = await fetch(
      `https://api.elevenlabs.io/v1/text-to-dialogue?output_format=${OUTPUT_FORMAT}`,
      {
        method: 'POST',
        headers: { 'xi-api-key': avain, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputs: [{ text: tyo.luenta + LOPPUTAUKO, voice_id: AANI }],
          model_id: MALLI,
          settings: { stability: STABILITY },
        }),
        signal: AbortSignal.timeout(180000),
      },
    );
  } catch (virhe) {
    console.error(`${id}: API-kutsu epäonnistui: ${String(virhe.message).slice(0, 400)}`);
    paivitaKuittirivi(id,
      kuittirivi(tyo, { status: 'failed', reason: String(virhe.message), objectKeys }));
    continue;
  }
  if (!vastaus.ok) {
    // Virherunko näkyviin (ilman avainta) — muodon muutokset selviävät siitä.
    console.error(`${id}: HTTP ${vastaus.status}: ${(await vastaus.text()).slice(0, 400)}`);
    paivitaKuittirivi(id,
      kuittirivi(tyo, { status: 'failed', reason: `HTTP ${vastaus.status}`, objectKeys }));
    continue;
  }
  const polku = resolve(JUURI, tyo.polku);
  const data = Buffer.from(await vastaus.arrayBuffer());
  // assets/audio ei ole enää repossa (omistajan linjaus 11.9.2026:
  // äänet vain ämpärissä), joten kansio voi puuttua tyhjästä
  // checkoutista — luodaan se ennen kirjoitusta.
  mkdirSync(dirname(polku), { recursive: true });
  writeFileSync(polku, data);
  try {
    const duration = kestoSekunteina(polku);
    paivitaKuittirivi(id, kuittirivi(tyo, {
      status: 'success', reason: tyo.retryReason, raw: data, final: { data, duration }, objectKeys,
    }));
  } catch (virhe) {
    paivitaKuittirivi(id, kuittirivi(tyo, {
      status: 'failed', reason: String(virhe.message), raw: data, objectKeys,
    }));
  }
  console.log(`${id}: ${(data.length / 1024).toFixed(0)} kt → ${polku}`);
}
// Tiedostot jäävät paikalliseen assets/audio-kansioon (ei repoon,
// linjaus 11.9.2026): Actions-ajo vie ne ämpäriin ja liittää ajon
// artefaktiksi, josta luennat kuunnellaan.
const onnistui = kuitti.cities.filter((rivi) => rivi.generation.status === 'success').length;
console.log(`Valmis, ${onnistui}/${tyot.length} tiedostoa paikallisessa assets/audio-kansiossa.`);
console.log('Kuuntele ne ennen julkaisua — ämpäriin vienti hoituu Actions-ajossa.');
return onnistui === tyot.length ? 0 : 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = await main();
}
