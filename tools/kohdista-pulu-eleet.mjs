#!/usr/bin/env node
/*
 * Livian neljän kaupungin city-3-pilotin forced alignment.
 *
 * Työkalu EI generoi ääntä. --kuiva ei käytä verkkoa, avainta eikä kirjoita.
 * Varsinainen ajo lukee valmiin mp3:n mediaämpäristä, lähettää sen ElevenLabsin
 * forced-alignment-päätteeseen ja kirjoittaa sidotun .eleet.json-repokopion.
 * Vienti R2:een tapahtuu vain eksplisiittisellä --vie-lipulla.
 */

import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { AANI_JUURI } from '../js/media.js';
import { laskeSha256, tekstinSha256 } from '../js/luentareaktiot.js';
import {
  LIVIAN_PILOTIN_REVISION, LIVIAN_PILOTTIKAUPUNGIT, livianPilottityo,
} from '../js/livia-pilotti-cuet.js';
import { tarkistaLivianPilottiData } from '../js/livia-puheeleet-lataus.js';
import {
  PAKOTETUN_OSOITE, jaksonJasennys, normalisoiAlignment, sovitaMerkit,
} from './generoi-linssiluennat.mjs';

const TAMA = fileURLToPath(import.meta.url);
const JUURI = resolve(dirname(TAMA), '..');
const MAX_CUE_MS = 6200;

if (process.argv[1] === TAMA && !process.env.NODE_USE_ENV_PROXY
  && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [TAMA, ...process.argv.slice(2)], {
    stdio: 'inherit', env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

export function normalisoiSana(sana) {
  return String(sana ?? '').toLocaleLowerCase('fi-FI').replace(/[^\p{L}\p{N}'’-]/gu, '');
}

export function sanoiksi(teksti) {
  return String(teksti ?? '').split(/\s+/).map(normalisoiSana).filter(Boolean);
}

export function ankkurinOsumat(teksti, ankkuri) {
  const sanat = Array.isArray(teksti) ? teksti.map((s) => normalisoiSana(s.sana ?? s)) : sanoiksi(teksti);
  const haku = sanoiksi(ankkuri);
  const paikat = [];
  for (let i = 0; haku.length && i + haku.length <= sanat.length; i += 1) {
    if (haku.every((sana, j) => sanat[i + j] === sana)) paikat.push(i);
  }
  return paikat;
}

/** Sama näkyvä kommentti, jonka peli antaa city-3-soittimelle. */
export function livianKohdistustyo(kaupunki) {
  const sopimus = livianPilottityo(kaupunki);
  if (!sopimus) return null;
  const raaka = FOKUSVIRRAT[kaupunki]?.pollo?.kommentti;
  const kuplat = Array.isArray(raaka) ? raaka : [raaka];
  const teksti = String(kuplat[0] ?? '').trim();
  const aaniOsoite = `${AANI_JUURI}aanet/pulu/${sopimus.aaniNimi}`;
  return { ...sopimus, teksti, aaniOsoite };
}

/** Offline-portti: teksti-SHA ja jokainen ankkuri täsmälleen kerran. */
export async function tarkistaKohdistustyo(tyo) {
  if (!tyo?.teksti) return { ok: false, syy: 'näkyvä kommentti puuttuu' };
  const sha = await tekstinSha256(tyo.teksti);
  if (sha !== tyo.tekstiSha256) return { ok: false, syy: 'pakin tekstin SHA-256 ei vastaa cue-lähdettä' };
  for (const cue of tyo.cuet) {
    const osumat = ankkurinOsumat(tyo.teksti, cue.ankkuri);
    if (osumat.length !== cue.esiintyma) {
      return { ok: false, syy: `${cue.id}: ankkuri osuu ${osumat.length} kertaa (odotus ${cue.esiintyma})` };
    }
  }
  return { ok: true };
}

/** Muunna ElevenLabsin merkkiajat kortin pysyviksi cue-aikaväleiksi. */
export function ratkaiseCueAjat(tyo, vastaus) {
  const kohdistus = normalisoiAlignment(vastaus);
  const merkit = kohdistus?.characters ?? [];
  const alut = kohdistus?.character_start_times_seconds ?? [];
  const loput = kohdistus?.character_end_times_seconds ?? [];
  if (!merkit.length || merkit.length !== alut.length || merkit.length !== loput.length) {
    throw new Error('alignment puuttuu tai sen merkkilistat ovat eri mittaisia');
  }
  const paikat = sovitaMerkit(tyo.teksti, merkit);
  const ms = (s) => Math.round(Number(s) * 1000);
  const jasennys = jaksonJasennys(tyo.teksti, { alku: 0, loppu: tyo.teksti.length });
  const sanat = jasennys.sanat.map(({ sana, merkki }) => {
    const eka = paikat[merkki];
    const vika = paikat[merkki + sana.length - 1];
    if (eka == null || vika == null) throw new Error(`sanalle "${sana}" ei löytynyt merkkiaikaa`);
    return { sana, alku: ms(alut[eka]), loppu: ms(loput[vika]) };
  });
  const kesto = Math.max(...loput.map(ms).filter(Number.isFinite));
  const alkurivit = tyo.cuet.map((cue) => {
    const osumat = ankkurinOsumat(sanat, cue.ankkuri);
    if (osumat.length !== cue.esiintyma) throw new Error(`${cue.id}: ankkuri ei ole yksikäsitteinen aikaleimoissa`);
    const alkuIndeksi = osumat[cue.esiintyma - 1];
    const pituus = sanoiksi(cue.ankkuri).length;
    return { ...cue, alku: sanat[alkuIndeksi].alku, ankkuriLoppu: sanat[alkuIndeksi + pituus - 1].loppu };
  });
  return alkurivit.map((cue, i) => {
    const seuraava = alkurivit[i + 1]?.alku ?? kesto;
    const loppu = Math.min(cue.alku + MAX_CUE_MS, seuraava, kesto);
    if (loppu < cue.ankkuriLoppu || loppu <= cue.alku) throw new Error(`${cue.id}: cueväli ei kata ankkuria`);
    const { ankkuriLoppu, ...rivi } = cue;
    return { ...rivi, loppu };
  });
}

async function haeAanite(tyo) {
  const vastaus = await fetch(tyo.aaniOsoite, { signal: AbortSignal.timeout(120000) }).catch(() => null);
  if (!vastaus?.ok) throw new Error(`äänitettä ei saatu: ${tyo.aaniOsoite} (HTTP ${vastaus?.status ?? '—'})`);
  return new Uint8Array(await vastaus.arrayBuffer());
}

async function haeKohdistus(aanidata, teksti, avain) {
  const lomake = new FormData();
  lomake.append('file', new Blob([aanidata], { type: 'audio/mpeg' }), 'livia.mp3');
  lomake.append('text', teksti);
  const vastaus = await fetch(PAKOTETUN_OSOITE, {
    method: 'POST', headers: { 'xi-api-key': avain }, body: lomake,
    signal: AbortSignal.timeout(300000),
  });
  if (!vastaus.ok) throw new Error(`forced alignment HTTP ${vastaus.status}: ${(await vastaus.text()).slice(0, 300)}`);
  return vastaus.json();
}

export async function kokoaEledata(tyo, aanidata, vastaus) {
  const aani = { nimi: tyo.aaniNimi, tavut: aanidata.byteLength, sha256: await laskeSha256(aanidata) };
  const data = {
    versio: 1,
    revision: LIVIAN_PILOTIN_REVISION,
    kaupunki: tyo.kaupunki,
    avain: tyo.avain,
    teksti: tyo.teksti,
    tekstiSha256: await tekstinSha256(tyo.teksti),
    aani,
    eleet: ratkaiseCueAjat(tyo, vastaus),
    luotu: new Date().toISOString(),
  };
  const tarkistus = await tarkistaLivianPilottiData(data, {
    kaupunki: tyo.kaupunki, teksti: tyo.teksti, aani,
  });
  if (!tarkistus.ok) throw new Error(`tuotettu eledata ei kelpaa runtimelle: ${tarkistus.syy}`);
  return data;
}

function vieR2(polku, kohde) {
  const tili = process.env.R2_ACCOUNT_ID;
  const ampari = process.env.R2_BUCKET;
  const avain = process.env.AWS_ACCESS_KEY_ID ?? process.env.R2_ACCESS_KEY_ID;
  const salaisuus = process.env.AWS_SECRET_ACCESS_KEY ?? process.env.R2_SECRET_ACCESS_KEY;
  const puuttuu = [!tili && 'R2_ACCOUNT_ID', !ampari && 'R2_BUCKET', !avain && 'R2_ACCESS_KEY_ID',
    !salaisuus && 'R2_SECRET_ACCESS_KEY'].filter(Boolean);
  if (puuttuu.length) throw new Error(`vienti ei onnistu, puuttuu: ${puuttuu.join(', ')}`);
  const ajo = spawnSync('aws', ['s3', 'cp', polku, `s3://${ampari}/${kohde}`,
    '--endpoint-url', `https://${tili}.r2.cloudflarestorage.com`, '--no-progress',
    '--content-type', 'application/json', '--cache-control', 'public, max-age=2592000'],
  { encoding: 'utf8', stdio: 'inherit' });
  if (ajo.status !== 0) throw new Error(`R2-vienti epäonnistui: ${kohde}`);
}

export function lueLiput(argv) {
  const liput = { kuiva: false, vie: false, kaupungit: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const pala = argv[i];
    if (pala === '--kuiva') liput.kuiva = true;
    else if (pala === '--vie') liput.vie = true;
    else if (pala === '--kaupungit') liput.kaupungit.push(...String(argv[++i] ?? '').split(/[\s,]+/).filter(Boolean));
    else if (pala.startsWith('--')) throw new Error(`tuntematon lippu: ${pala}`);
    else liput.kaupungit.push(...pala.split(',').filter(Boolean));
  }
  return liput;
}

async function main() {
  let liput;
  try { liput = lueLiput(process.argv.slice(2)); } catch (virhe) { console.error(virhe.message); process.exit(1); }
  const kaupungit = liput.kaupungit.length ? [...new Set(liput.kaupungit)] : LIVIAN_PILOTTIKAUPUNGIT;
  let virheita = 0;
  const tyot = [];
  for (const kaupunki of kaupungit) {
    const tyo = livianKohdistustyo(kaupunki);
    if (!tyo) { console.error(`${kaupunki}: ei kuulu neljän kaupungin pilottiin`); virheita += 1; continue; }
    const tarkistus = await tarkistaKohdistustyo(tyo);
    if (!tarkistus.ok) { console.error(`${kaupunki}: ${tarkistus.syy}`); virheita += 1; continue; }
    tyot.push(tyo);
  }
  if (liput.kuiva) {
    console.log('KUIVA AJO — ei verkkoa, avainta, tiedostokirjoitusta eikä äänigenerointia.');
    for (const tyo of tyot) {
      console.log(`${tyo.kaupunki}: ${tyo.cuet.length}/${tyo.cuet.length} ankkuria yksikäsitteisiä, teksti SHA-256 ${tyo.tekstiSha256}`);
      console.log(`  audio ${tyo.aaniOsoite}`);
      console.log(`  repo  ${tyo.kohde}`);
      console.log(`  R2    ${tyo.r2Kohde}`);
    }
    console.log(virheita ? `Kuiva ajo: ${virheita} virhettä.` : `Kuiva ajo: ${tyot.length}/4 kaupunkia kunnossa.`);
    process.exit(virheita ? 1 : 0);
  }
  if (virheita) process.exit(1);
  const avain = process.env.ELEVEN_API_KEY ?? process.env.ELEVENLABS_API_KEY;
  if (!avain) {
    console.error('ELEVEN_API_KEY puuttuu. Tämä työkalu vain kohdistaa jo generoidut mp3:t; käytä --kuiva ilman avainta.');
    process.exit(1);
  }
  for (const tyo of tyot) {
    try {
      const aanidata = await haeAanite(tyo);
      const data = await kokoaEledata(tyo, aanidata, await haeKohdistus(aanidata, tyo.teksti, avain));
      const polku = join(JUURI, tyo.kohde);
      mkdirSync(dirname(polku), { recursive: true });
      writeFileSync(polku, `${JSON.stringify(data, null, 2)}\n`);
      console.log(`${tyo.kaupunki}: ${data.eleet.length} cuea → ${tyo.kohde}`);
      console.log(`  mp3 ${data.aani.tavut} tavua, SHA-256 ${data.aani.sha256}`);
      if (liput.vie) { vieR2(polku, tyo.r2Kohde); console.log(`  viety ${tyo.r2Kohde}`); }
    } catch (virhe) { console.error(`${tyo.kaupunki}: ${virhe.message}`); virheita += 1; }
  }
  console.log(virheita ? `Valmis, ${virheita} virhettä.` : `Valmis, ${tyot.length} tiedostoa${liput.vie ? ' ja R2-vienti' : ''}.`);
  process.exit(virheita ? 1 : 0);
}

if (process.argv[1] === TAMA) await main();
