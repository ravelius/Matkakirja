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
 * Käyttö:  ELEVEN_API_KEY=... node tools/generoi-luennat.mjs lontoo madrid
 * Kuiva testiajo ilman avainta ja ilman API-kutsuja (mitä ajo tekisi):
 *          ELEVEN_KUIVA=1 node tools/generoi-luennat.mjs madrid venetsia
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

import { EUROPE_SAAPUMISET } from '../js/packs/europe-saapumiset.js';
import { AFRICA_SAAPUMISET } from '../js/packs/africa-saapumiset.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';

// Kaupunki etsitään laudoilta tässä järjestyksessä — tiedostonimeen
// tulee laudan tunnus (puhe-<lauta>-saapuminen-<id>.mp3).
const LAUDAT = [
  ['europe', EUROPE_SAAPUMISET],
  ['africa', AFRICA_SAAPUMISET],
];

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const AANI = 'Sz0tRTEpybtDJ9ru2kgD'; // Viisas Kertoja
const MALLI = 'eleven_v3';
const STABILITY = 0.5;
/*
 * Lopputauko (omistajan havainto 8.8.2026: tiedosto leikkautuu heti
 * viimeisen sanan perään ja loppuun jää naksahdus). Break-tagi
 * pyytää mallilta hiljaisuutta äänen loppuun, jolloin naksun voi
 * leikata pois rikkomatta puhetta. Tarkista ensimmäisestä ajosta
 * kuuntelemalla, että tauko todella syntyy — jos ei, kasvata aikaa.
 */
const LOPPUTAUKO = ' <break time="1.0s" />';

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
        luenta: merkinta.luenta,
        polku: `assets/audio/puhe-${lauta}-saapuminen-${id}.mp3`,
        kentta: null,
      };
    }
  }
  return null;
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
const kaupungit = process.argv
  .slice(2)
  .flatMap((pala) => pala.split(','))
  .map((pala) => pala.trim())
  .filter(Boolean);
if (!kaupungit.length) {
  console.error('Anna kaupungit: node tools/generoi-luennat.mjs lontoo madrid …');
  process.exit(1);
}

/*
 * KUIVA AJO (ELEVEN_KUIVA=1): tulostaa mitä generoitaisiin eikä kutsu
 * APIa. Tarkoitettu sen todistamiseen, että kaupunkiavain osuu oikeaan
 * lähteeseen ja oikeaan tiedostonimeen — sitä ei näe mistään muualta
 * kuin ajamalla, ja väärä nimi huomattaisiin vasta pelissä hiljaisena
 * kaiuttimena. Avainta ei tarvita eikä lueta.
 */
const kuiva = process.env.ELEVEN_KUIVA === '1';

const avain = process.env.ELEVEN_API_KEY ?? process.env.ELEVENLABS_API_KEY;
if (!avain && !kuiva) {
  console.error('ELEVEN_API_KEY puuttuu ympäristöstä — luentoja ei voi generoida.');
  console.error('Kuivan testiajon saa ilman avainta: ELEVEN_KUIVA=1 node tools/generoi-luennat.mjs …');
  process.exit(1);
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
  tyot.push({ id, ...tyo });
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
  process.exit(puuttuvia ? 1 : 0);
}

if (puuttuvia) {
  console.error(`Tunnistamattomia kaupunkiavaimia: ${puuttuvia} — ei generoida mitään.`);
  console.error('Anna avaimet erikseen (pilkku tai välilyöntikin kelpaa) ja tarkista');
  console.error('kirjoitusasu js/packs/fokusvirrat.js:stä tai saapumispakasta.');
  process.exit(1);
}

for (const tyo of tyot) {
  const { id } = tyo;
  console.log(`${id}: generoidaan lähteestä ${tyo.lahde} (${tyo.luenta.length} merkkiä)…`);
  const vastaus = await fetch(
    'https://api.elevenlabs.io/v1/text-to-dialogue?output_format=mp3_44100_128',
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
  if (!vastaus.ok) {
    // Virherunko näkyviin (ilman avainta) — muodon muutokset selviävät siitä.
    console.error(`${id}: HTTP ${vastaus.status}: ${(await vastaus.text()).slice(0, 400)}`);
    process.exit(1);
  }
  const polku = resolve(JUURI, tyo.polku);
  const data = Buffer.from(await vastaus.arrayBuffer());
  writeFileSync(polku, data);
  console.log(`${id}: ${(data.length / 1024).toFixed(0)} kt → ${polku}`);
}
console.log(`Valmis, ${tyot.length} tiedostoa. Muista: tiedostot repoon ja kuuntele ne ennen julkaisua.`);
