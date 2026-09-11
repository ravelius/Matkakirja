/*
 * MATKAKIRJALUENTOJEN AIKALEIMAT — pakotettu kohdistus valmiiseen mp3:een.
 *
 * TÄMÄ TYÖKALU EI GENEROI ÄÄNTÄ. Kaupunkien matkakirjaluennat on jo
 * äänitetty (tools/generoi-luennat.mjs, ajo 17 / 9.9.2026), eikä niitä
 * saa äänittää uusiksi pelkän ajoituksen takia: uusi ajo maksaisi,
 * muuttaisi kertojan ilmaisun ja pakottaisi nostamaan jokaisen
 * äänitteen kyselyversion (js/media.js UUSITUT_AANET). Tässä haetaan
 * VALMIILLE äänitteelle sanakohtaiset ajat ElevenLabsin pakotetulla
 * kohdistuksella (POST /v1/forced-alignment) — sama pääte ja sama
 * laskenta kuin linssiluennoissa (tools/generoi-linssiluennat.mjs).
 *
 * MIHIN AIKALEIMOJA TARVITAAN: pulu reagoi isoisän luennan SISÄLLÄ
 * (Raamattu: PULU REAGOI TEKSTIN SISALLA, docs/pulu-reaktiot.md
 * "Luentareaktiot"). Pakkiin kirjoitetaan `matkakirja.reaktiot[]`,
 * jonka `ankkuri` on katkelma luentatekstistä sanasta sanaan; peli
 * (js/luentareaktiot.js) etsii ankkurin sanajonon tästä tiedostosta ja
 * ampuu reaktion ankkurin viimeisen sanan lopussa. Merkkimääräarvioita
 * ei käytetä: ilman aikaleimatiedostoa reaktioita ei ammuta lainkaan.
 *
 * TIEDOSTO JA SEN OSOITE:
 *   ämpärissä  audio/puhe-fokus-matkakirja-<id>.aikaleimat.json
 *   repossa    assets/aikaleimat/puhe-fokus-matkakirja-<id>.aikaleimat.json
 *
 * Peli laskee osoitteen äänitteen osoitteesta vaihtamalla päätteen
 * (.mp3 → .aikaleimat.json) ja pitää kyselyversion mukana, joten
 * uusittu äänite ja sen aikaleimat pysyvät parina.
 *
 * REPOKOPIO EI OLE assets/audio-KANSIOSSA TAHALLAAN: .github/workflows/
 * vie-aanet.yml synkronoi koko assets/audio-kansion ämpäriin
 * `--content-type audio/mpeg`, ja JSON menisi siitä läpi äänitteenä.
 * Vienti tehdään siksi tässä työkalussa (oikea sisältötyyppi) tai
 * .github/workflows/generoi-luennat.yml:n `toiminto: kohdista` -ajossa.
 *
 * Käyttö:
 *   ELEVEN_API_KEY=... node tools/kohdista-luennat.mjs --kaupungit marseille
 *   ELEVEN_API_KEY=... node tools/kohdista-luennat.mjs --kaikki --vie
 *   node tools/kohdista-luennat.mjs --kaupungit marseille --kuiva
 *
 * Kuiva ajo ei tarvitse avainta eikä verkkoa: se kertoo mistä teksti
 * tulee, mitä osoitteita käytettäisiin ja löytyvätkö pakin reaktioiden
 * ankkurit tekstistä sanasta sanaan. Avainta ei tulosteta koskaan.
 *
 * HUOM konttiympäristössä: Noden fetch ei lue ympäristön proxyä ilman
 * lippua — aja NODE_USE_ENV_PROXY=1 (tai anna työkalun käynnistää
 * itsensä uudelleen, kuten alla).
 */

import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { aaniUrl } from '../js/media.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import {
  PAKOTETUN_OSOITE, jaksonJasennys, karsiTagit, normalisoiAlignment, sovitaMerkit,
} from './generoi-linssiluennat.mjs';

const TAMA = fileURLToPath(import.meta.url);
const JUURI = resolve(dirname(TAMA), '..');

/* Sama vartija kuin linssityökalussa: ilman lippua fetch ei näe proxyä. */
if (process.argv[1] === TAMA && !process.env.NODE_USE_ENV_PROXY
  && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [TAMA, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

/** Aikaleimatiedoston muoto; peli tarkistaa tämän (js/luentareaktiot.js). */
export const AIKALEIMOJEN_VERSIO = 1;

/** Repon kansio, johon aikaleimat kirjoitetaan (ei assets/audio, ks. yllä). */
export const AIKALEIMAKANSIO = 'assets/aikaleimat';

/** Ämpärin kansio: sama kuin äänitteillä, jotta osoite on äänen pari. */
export const AMPARIN_KANSIO = 'audio';

/** Sallitut tarkoitukset (docs/pulu-reaktiot.md "Luentareaktiot"). */
export const REAKTION_TARKOITUKSET = Object.freeze([
  'myotailee', 'epailee', 'torjuu', 'huvittuu', 'hammastyy', 'vakavoituu',
]);

/**
 * Kaupungin matkakirjaluennan kohdistustyö, tai null jos kaupungilla ei
 * ole fokusvirran matkakirjaluentaa.
 *
 * Teksti on sama kuin generoinnissa (`matkakirja.luenta`) TAGIT
 * KARSITTUINA — pakotettu kohdistus saa juuri sen, mitä kertoja puhui,
 * eikä eleven_v3:n ilmaisutageja ([curious]) lueta sanoiksi.
 */
export function kohdistusTyo(id) {
  const merkinta = FOKUSVIRRAT[id]?.matkakirja;
  if (!merkinta?.luenta && !merkinta?.teksti) return null;
  const teksti = karsiTagit(merkinta.luenta ?? merkinta.teksti);
  if (!teksti) return null;
  const nimi = `puhe-fokus-matkakirja-${id}.mp3`;
  return {
    id,
    teksti,
    /* Sama kenttä kuin pelissä; kuiva ajo paljastaa eron heti. */
    kentta: merkinta.aanite ?? null,
    aaniPolku: `assets/audio/${nimi}`,
    aaniOsoite: aaniUrl(`assets/audio/${nimi}`),
    kohde: `${AIKALEIMAKANSIO}/puhe-fokus-matkakirja-${id}.aikaleimat.json`,
    ampariNimi: `puhe-fokus-matkakirja-${id}.aikaleimat.json`,
    reaktiot: Array.isArray(merkinta.reaktiot) ? merkinta.reaktiot : [],
  };
}

/** Kaikki fokusvirtakaupungit, joilla on matkakirjaluenta. */
export function kaikkiKaupungit() {
  return Object.keys(FOKUSVIRRAT).filter((id) => kohdistusTyo(id));
}

/**
 * ANKKURIN TARKISTUS ILMAN VERKKOA. Sama normalisointi kuin pelissä
 * (js/luentareaktiot.js): kirjainkoko ja välimerkit eivät saa ratkaista.
 * Puhdas funktio, jotta testi ja työkalu ovat samaa mieltä.
 */
export function normalisoiSana(sana) {
  return String(sana ?? '')
    .toLocaleLowerCase('fi-FI')
    .replace(/[^\p{L}\p{N}'’-]/gu, '');
}

/** Tekstin sanat normalisoituina (ankkurin etsintää varten). */
export function sanoiksi(teksti) {
  return String(teksti ?? '').split(/\s+/).map(normalisoiSana).filter(Boolean);
}

/**
 * Löytyykö ankkurin sanajono tekstistä sanasta sanaan? Palauttaa
 * ensimmäisen osuman alkuindeksin sanalistassa tai -1.
 */
export function etsiAnkkuri(sanat, ankkuri) {
  const haku = sanoiksi(ankkuri);
  if (!haku.length) return -1;
  for (let i = 0; i + haku.length <= sanat.length; i += 1) {
    let osuu = true;
    for (let j = 0; j < haku.length; j += 1) {
      if (sanat[i + j] !== haku[j]) { osuu = false; break; }
    }
    if (osuu) return i;
  }
  return -1;
}

/**
 * AIKALEIMAT KOHDISTUKSEN VASTAUKSESTA. Puhdas funktio: syötteenä
 * puhdistettu teksti ja kummankin päätteen vastausrunko, ulos
 * tiedoston sisältö.
 *
 * Sanat ja lauseet lasketaan OMASTA tekstistä (jaksonJasennys) eikä
 * vastauksen `words`-listasta: näin tiedoston sanat vastaavat tarkasti
 * pakin tekstiä, jota vasten ankkurit kirjoitetaan.
 */
export function aikaleimoiksi(teksti, vastaus) {
  const kohdistus = normalisoiAlignment(vastaus);
  const merkit = kohdistus?.characters ?? [];
  const alut = kohdistus?.character_start_times_seconds ?? [];
  const loput = kohdistus?.character_end_times_seconds ?? [];
  if (!merkit.length || merkit.length !== alut.length || merkit.length !== loput.length) {
    throw new Error('alignment puuttuu tai on eri mittainen kuin merkkilista');
  }
  const paikat = sovitaMerkit(teksti, merkit);
  const ms = (sekunnit) => Math.round(Number(sekunnit) * 1000);
  const alkuMs = (i) => (paikat[i] == null ? null : ms(alut[paikat[i]]));
  const loppuMs = (i) => (paikat[i] == null ? null : ms(loput[paikat[i]]));

  const jasennys = jaksonJasennys(teksti, { alku: 0, loppu: teksti.length });
  const sanat = [];
  for (const { sana, merkki } of jasennys.sanat) {
    const alku = alkuMs(merkki);
    const loppu = loppuMs(merkki + sana.length - 1);
    if (alku == null || loppu == null) continue;
    sanat.push({ sana, alku, loppu });
  }
  if (!sanat.length) throw new Error('yhdellekään sanalle ei löytynyt aikaleimaa');
  const lauseet = jasennys.lauseet.map(alkuMs).filter((v) => v != null);
  /*
   * KESTO ON VIIMEISEN ÄÄNTEEN LOPPU, ei tiedoston pituus: ffprobea ei
   * tarvita eikä äänitteen hännän hiljaisuus kuulu ajoitukseen.
   */
  const kesto = Math.max(...loput.map(ms).filter(Number.isFinite));
  return {
    versio: AIKALEIMOJEN_VERSIO, teksti, kesto, sanat, lauseet,
  };
}

/** Pakotettu kohdistus: valmis mp3 ja sama teksti sisään, ajat ulos. */
async function haeKohdistus(aanidata, teksti, avain) {
  const lomake = new FormData();
  lomake.append('file', new Blob([aanidata], { type: 'audio/mpeg' }), 'luenta.mp3');
  lomake.append('text', teksti);
  const vastaus = await fetch(PAKOTETUN_OSOITE, {
    method: 'POST',
    headers: { 'xi-api-key': avain },
    body: lomake,
    signal: AbortSignal.timeout(300000),
  });
  if (!vastaus.ok) {
    // Virherunko näkyviin (avain ei ole siinä).
    throw new Error(`HTTP ${vastaus.status}: ${(await vastaus.text()).slice(0, 400)}`);
  }
  return vastaus.json();
}

/**
 * Äänite ämpäristä; repon kopio on varareitti. Sama kahden portaan malli
 * kuin pelissä (js/media.js).
 */
async function haeAanite(tyo) {
  const vastaus = await fetch(tyo.aaniOsoite, { signal: AbortSignal.timeout(120000) })
    .catch(() => null);
  if (vastaus?.ok) return Buffer.from(await vastaus.arrayBuffer());
  const paikallinen = join(JUURI, tyo.aaniPolku);
  try {
    return readFileSync(paikallinen);
  } catch {
    throw new Error(`äänitettä ei saatu: ${tyo.aaniOsoite} (HTTP ${vastaus?.status ?? '—'}) `
      + `eikä ${tyo.aaniPolku} ole repossa`);
  }
}

/** Vie tiedosto ämpäriin (sama komento kuin muissa työkaluissa). */
function vieAmpariin(polku, nimi) {
  const tili = process.env.R2_ACCOUNT_ID;
  const ampari = process.env.R2_BUCKET;
  const avain = process.env.AWS_ACCESS_KEY_ID ?? process.env.R2_ACCESS_KEY_ID;
  const salaisuus = process.env.AWS_SECRET_ACCESS_KEY ?? process.env.R2_SECRET_ACCESS_KEY;
  const puuttuu = [
    !tili && 'R2_ACCOUNT_ID', !ampari && 'R2_BUCKET',
    !avain && 'R2_ACCESS_KEY_ID', !salaisuus && 'R2_SECRET_ACCESS_KEY',
  ].filter(Boolean);
  if (puuttuu.length) throw new Error(`vienti ei onnistu, puuttuu: ${puuttuu.join(', ')}`);
  const ajo = spawnSync('aws', [
    's3', 'cp', polku, `s3://${ampari}/${AMPARIN_KANSIO}/${nimi}`,
    '--endpoint-url', `https://${tili}.r2.cloudflarestorage.com`,
    '--no-progress',
    '--content-type', 'application/json',
    '--cache-control', 'public, max-age=2592000',
  ], { encoding: 'utf8', stdio: 'inherit' });
  if (ajo.status !== 0) throw new Error(`aws s3 cp epäonnistui (${nimi})`);
}

/* ── komentorivi ──────────────────────────────────────────────────── */

/** Lippujen luku; kaupunkilista sietää pilkun ja välilyönnin. */
export function lueLiput(argv) {
  const liput = { kaupungit: [], kaikki: false, kuiva: false, vienti: false };
  for (let i = 0; i < argv.length; i += 1) {
    const pala = argv[i];
    if (pala === '--kaikki') liput.kaikki = true;
    else if (pala === '--kuiva') liput.kuiva = true;
    else if (pala === '--vie') liput.vienti = true;
    else if (pala === '--kaupungit') {
      i += 1;
      liput.kaupungit.push(...String(argv[i] ?? '').split(/[,\s]+/).filter(Boolean));
    } else if (pala.startsWith('--')) {
      throw new Error(`tuntematon lippu: ${pala}`);
    } else {
      liput.kaupungit.push(...pala.split(',').filter(Boolean));
    }
  }
  return liput;
}

async function main() {
  let liput;
  try {
    liput = lueLiput(process.argv.slice(2));
  } catch (virhe) {
    console.error(virhe.message);
    process.exit(1);
  }
  const pyydetyt = liput.kaikki ? kaikkiKaupungit() : liput.kaupungit;
  if (!pyydetyt.length) {
    console.error('Anna kaupungit: node tools/kohdista-luennat.mjs --kaupungit marseille');
    console.error('Kaikki 45: --kaikki. Kuiva ajo ilman avainta ja verkkoa: --kuiva.');
    process.exit(1);
  }

  const tyot = [];
  let puuttuvia = 0;
  for (const id of pyydetyt) {
    const tyo = kohdistusTyo(id);
    if (!tyo) {
      console.error(`${id}: fokusvirran matkakirjaluentaa ei löydy — ohitetaan.`);
      puuttuvia += 1;
      continue;
    }
    tyot.push(tyo);
  }

  if (liput.kuiva) {
    console.log('KUIVA AJO (--kuiva) — APIa ei kutsuta, tiedostoja ei kirjoiteta.');
    for (const tyo of tyot) {
      const sanat = sanoiksi(tyo.teksti);
      console.log(`${tyo.id}: ${tyo.teksti.length} merkkiä, ${sanat.length} sanaa`);
      console.log(`  ääni  ${tyo.aaniOsoite}`);
      console.log(`  ulos  ${tyo.kohde}  →  ${AMPARIN_KANSIO}/${tyo.ampariNimi}`);
      if (tyo.kentta && tyo.kentta !== tyo.aaniPolku) {
        console.error(`  RISTIRIITA: pakan aanite on ${tyo.kentta}, työkalu kohdistaisi ${tyo.aaniPolku}.`);
        puuttuvia += 1;
      }
      for (const reaktio of tyo.reaktiot) {
        const paikka = etsiAnkkuri(sanat, reaktio.ankkuri);
        const tarkoitusOk = REAKTION_TARKOITUKSET.includes(reaktio.tarkoitus);
        if (paikka < 0 || !tarkoitusOk) {
          console.error(`  ${reaktio.id}: ${paikka < 0 ? `ankkuria "${reaktio.ankkuri}" ei löydy tekstistä` : `tuntematon tarkoitus ${reaktio.tarkoitus}`}`);
          puuttuvia += 1;
        } else {
          console.log(`  ${reaktio.id}: ankkuri sanoissa ${paikka + 1}–${paikka + sanoiksi(reaktio.ankkuri).length} (${reaktio.tarkoitus})`);
        }
      }
      if (!tyo.reaktiot.length) console.log('  (ei reaktioita pakissa — aikaleimat silti hyödyllisiä)');
    }
    console.log(puuttuvia
      ? `Kuiva ajo valmis — ${puuttuvia} huomautusta.`
      : `Kuiva ajo valmis — ${tyot.length} kaupunkia kunnossa.`);
    process.exit(puuttuvia ? 1 : 0);
  }

  if (puuttuvia) {
    console.error(`Tunnistamattomia kaupunkiavaimia: ${puuttuvia} — ei kohdisteta mitään.`);
    process.exit(1);
  }

  const avain = process.env.ELEVEN_API_KEY ?? process.env.ELEVENLABS_API_KEY;
  if (!avain) {
    console.error('ELEVEN_API_KEY puuttuu ympäristöstä — kohdistusta ei voi tehdä.');
    console.error('Kuivan ajon saa ilman avainta: node tools/kohdista-luennat.mjs --kaupungit … --kuiva');
    process.exit(1);
  }

  mkdirSync(join(JUURI, AIKALEIMAKANSIO), { recursive: true });
  let virheita = 0;
  for (const tyo of tyot) {
    try {
      const aani = await haeAanite(tyo);
      const vastaus = await haeKohdistus(aani, tyo.teksti, avain);
      const data = aikaleimoiksi(tyo.teksti, vastaus);
      const polku = join(JUURI, tyo.kohde);
      writeFileSync(polku, `${JSON.stringify(data, null, 2)}\n`);
      console.log(`${tyo.id}: ${data.sanat.length} sanaa, ${data.lauseet.length} lausetta, `
        + `kesto ${(data.kesto / 1000).toFixed(1)} s → ${tyo.kohde}`);
      // Ankkurit tarkistetaan myös oikeassa ajossa: löytymätön ankkuri
      // olisi muuten hiljainen reaktio pelissä.
      const sanat = data.sanat.map((s) => normalisoiSana(s.sana));
      for (const reaktio of tyo.reaktiot) {
        if (etsiAnkkuri(sanat, reaktio.ankkuri) < 0) {
          console.error(`  ${reaktio.id}: ankkuria "${reaktio.ankkuri}" ei löydy aikaleimoista.`);
          virheita += 1;
        }
      }
      if (liput.vienti) {
        vieAmpariin(polku, tyo.ampariNimi);
        console.log(`  viety: ${AMPARIN_KANSIO}/${tyo.ampariNimi}`);
      }
    } catch (virhe) {
      console.error(`${tyo.id}: ${virhe.message}`);
      virheita += 1;
    }
  }
  console.log(virheita
    ? `Valmis, mutta ${virheita} virhettä.`
    : `Valmis, ${tyot.length} aikaleimatiedostoa${liput.vienti ? ' ja vienti' : ''}.`);
  process.exit(virheita ? 1 : 0);
}

if (process.argv[1] === TAMA) await main();
