/*
 * Hakee ääniehdokkaita Freesoundista.
 *
 *   FREESOUND_API=… node tools/hae-freesound.mjs --kori meri --maara 12
 *   FREESOUND_API=… node tools/hae-freesound.mjs --haku "bazaar market" --ulos ehdokkaat.json
 *
 * MIKSI TÄMÄ AJETAAN GITHUB ACTIONSISSA EIKÄ TÄÄLLÄ:
 *
 * Freesoundin avain on repon salaisuuksissa, eikä GitHub näytä
 * salaisuuden arvoa kenellekään sen tallentamisen jälkeen — ei
 * käyttöliittymässä eikä rajapinnassa. Arvo on luettavissa vain
 * työnkulun ajon sisällä, ympäristömuuttujana.
 *
 * Se on tarkoituksellista ja hyvä niin: omistajan sääntö on, ettei
 * avaimia liitetä keskusteluun, koska ne päätyisivät lokeihin.
 * Työkalu on siis kirjoitettu niin, että avain ei koskaan poistu
 * ajoympäristöstä — tulokseen kirjoitetaan vain julkisia osoitteita,
 * lisenssejä ja tekijöiden nimiä.
 *
 * Sama malli kuin tools/hae-kaupunkikuvat.mjs + kuvahaku.yml.
 *
 * LISENSSIRAJAUS. Mukaan otetaan vain CC0 ja CC BY. Freesoundissa on
 * paljon myös CC BY-NC -aineistoa, jota ei voi käyttää, ja
 * "Sampling+"-lisenssiä, jonka ehdot ovat monimutkaiset. Rajaus
 * tehdään palvelimen puolella filter-parametrilla eikä jälkikäteen:
 * jälkikäteen suodattava haku palauttaisi kymmenen osumaa, joista
 * kaksi kelpaa, ja näyttäisi siltä että aineistoa ei ole.
 *
 * ------------------------------------------------------------------
 * KAKSI AJOTAPAA
 * ------------------------------------------------------------------
 *
 * 1. EHDOKASHAKU (--kori / --haku). Vanha käyttö: tulostaa listan
 *    ehdokkaita kuunneltavaksi eikä tee muuta. Ääni valitaan
 *    kuuntelemalla, äänistudion kautta.
 *
 * 2. TEHOSTELISTAN AJO (--lista). Omistajan tilaus 6.9.2026:
 *    *"Pululle ja muuallekin tarvitaan ääniefektejä … Näitä ei
 *    generoida."* Tässä tavassa kuuntelupäätöstä ei ole: lista
 *    (tools/tehosteet/pulu-tehosteet.json) kertoo tunnukset,
 *    hakusanat, kestorajat ja lisenssit, ja ajo valitsee jokaiselle
 *    yhden osuman mitattavista luvuista (arvosana, lataukset, kesto —
 *    tools/tehostelista.mjs pisteytaOsuma), lataa esikatselu-mp3:n,
 *    normalisoi sen ffmpegillä ja vie ämpäriin manifestin kanssa.
 *
 *    Kuuntelu tehdään ajon JÄLKEEN. Lopputulos on kaksitoista tiedostoa
 *    ja manifesti, joka kertoo mistä kukin tuli — huono osuma
 *    vaihdetaan ajamalla yksi tunnus uudestaan (--tunnus).
 *
 * MIKSI SAMASSA TIEDOSTOSSA. Avain, sen etsintä, uudelleenyritykset ja
 * lisenssirajaus ovat samat molemmissa tavoissa. Toinen työkalu
 * tarkoittaisi toista kopiota niistä — ja kaksi paikkaa, joissa
 * lisenssirajaus voi rapistua eri tahtiin.
 */
import { spawnSync } from 'node:child_process';
import {
  mkdirSync, mkdtempSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { leikkaaHiljaisuusSuodatin, viimeistelySuodatin } from './generoi-tehosteet.mjs';
import { julkinenJuuri, tulkitseLoudnorm } from './generoi-siirtymamusiikki.mjs';
import {
  hakusuodatin, lisenssiNimi, lueTehostelista, manifestirivi, PULULISTA, valitseParas,
} from './tehostelista.mjs';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Noden fetch ei lue HTTPS_PROXYa; ks. tools/hae-radiot.mjs.
if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [fileURLToPath(import.meta.url), ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

/*
 * Avain luetaan useasta nimestä.
 *
 * Salaisuuden nimeä ei voi tarkistaa täältä käsin, ja väärä arvaus
 * näyttäisi täsmälleen samalta kuin puuttuva avain — työkalu kaatuisi
 * sanoen "avainta ei ole", vaikka se olisi repossa toisella nimellä.
 * Siksi kokeillaan kaikkia tavallisia kirjoitusasuja ja kerrotaan
 * lopuksi, mitä etsittiin.
 */
const AVAIN_NIMET = ['FREESOUND_API', 'FREESOUND_API_KEY', 'FREESOUND_AVAIN', 'FREESOUND_TOKEN', 'FREESOUND'];
const avainNimi = AVAIN_NIMET.find((n) => (process.env[n] ?? '').trim());
const AVAIN = avainNimi ? process.env[avainNimi].trim() : '';

if (!AVAIN) {
  console.error('Freesoundin avainta ei löytynyt ympäristöstä.');
  console.error(`Etsittiin nimillä: ${AVAIN_NIMET.join(', ')}`);
  console.error('');
  console.error('Aseta se repon salaisuuksiin (Settings > Secrets and variables >');
  console.error('Actions) ja välitä työnkulussa env-lohkossa. Älä koskaan aja');
  console.error('tätä niin, että avain näkyy komentorivillä — komentorivit');
  console.error('päätyvät lokeihin.');
  process.exit(1);
}

// --- valitsimet ----------------------------------------------------------------

const argv = process.argv.slice(2);
const valitsin = (nimi, oletus = null) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : oletus;
};

/*
 * Valmiit korit vastaavat pelin omia arvontakoreja (js/aani-ehdokkaat.js).
 * Hakusanat ovat englanniksi, koska Freesoundin aineisto on merkitty
 * englanniksi — suomenkielinen haku löytää muutaman kymmenen tiedostoa
 * koko palvelusta.
 */
const KORIT = {
  meri: 'ocean waves shore surf ambience',
  basaari: 'bazaar market street crowd ambience',
  aavikko: 'desert wind sand ambience',
  sademetsa: 'rainforest jungle birds ambience',
  savanni: 'savanna grassland wind insects',
  ylanko: 'mountain highland wind ambience',
  kaupunki: 'city street traffic distant ambience',
  satama: 'harbour port ships dock ambience',
  juna: 'steam train railway station',
  tori: 'market stall vendors chatter',
  sade: 'rain on roof ambience',
  yo: 'night crickets quiet ambience',
};

const lippu = (nimi) => argv.includes(`--${nimi}`);

const kori = valitsin('kori');
const haku = valitsin('haku') ?? (kori ? KORIT[kori] : null);
const maara = Number(valitsin('maara', '12'));
const ulos = valitsin('ulos');
const minKesto = Number(valitsin('min-kesto', '20'));
const maxKesto = Number(valitsin('max-kesto', '600'));

/*
 * Listan ajon vakiot ovat TÄSSÄ eivätkä tiedoston lopussa oman
 * osionsa kanssa, koska haara alla kutsuu ajoa heti: moduulitason
 * `const` ei ole vielä olemassa, jos se on kutsun alapuolella.
 * Funktiot saavat asua lopussa — ne nostetaan.
 */
/** Ämpärin kansio ja levykansio listan ajolle. */
const PULU_KOHDEKANSIO = 'media/tehosteet-pulu';
const PULU_RAAKAKANSIO = 'media/tehosteet-pulu-raaka';
/** Häivytykset päihin: naksahdukseton alku ja loppu. */
const PULU_HAIVYTYS_S = 0.02;

/*
 * TEHOSTELISTAN AJO. Oma haaransa, joka poistuu ennen ehdokashakua:
 * lista tuo omat hakusanansa ja omat kestorajansa, eikä yhtäkään
 * yllä olevaa oletusta (20–600 s taustaääni) käytetä sen kanssa.
 */
if (lippu('lista') || lippu('pulu')) {
  const listapolku = lippu('pulu') ? PULULISTA : (valitsin('lista') ?? PULULISTA);
  const koodi = await ajaLista({
    listapolku,
    tunnus: valitsin('tunnus'),
    vienti: !lippu('ei-vientia') && !lippu('kuiva'),
    kuiva: lippu('kuiva'),
    ulos,
  });
  process.exit(koodi);
}

if (!haku) {
  console.error('käyttö: node tools/hae-freesound.mjs --kori <nimi> | --haku "<sanat>"');
  console.error('        node tools/hae-freesound.mjs --pulu [--tunnus <tunnus>] [--kuiva]');
  console.error(`korit: ${Object.keys(KORIT).join(', ')}`);
  process.exit(1);
}

// --- haku ----------------------------------------------------------------------

// Lisenssien nimitaulukko asuu tools/tehostelista.mjs:ssä, jotta se on
// yksi eikä kaksi: molemmat ajotavat lukevat samasta paikasta.

const parametrit = new URLSearchParams({
  query: haku,
  page_size: String(Math.min(150, Math.max(maara * 3, 15))),
  token: AVAIN,
  fields: 'id,name,username,license,previews,duration,avg_rating,num_ratings,url',
  // Vain CC0 ja CC BY, ja kesto järkevissä rajoissa. Kolmen sekunnin
  // napsahdus ei kelpaa taustaääneksi, eikä puolen tunnin nauhoitus
  // ole ladattavissa puhelimella.
  filter: `license:("Creative Commons 0" OR "Attribution") duration:[${minKesto} TO ${maxKesto}]`,
  sort: 'rating_desc',
});

console.log(`Haku: ${haku}`);
console.log(`Avain löytyi ympäristömuuttujasta ${avainNimi} (arvoa ei tulosteta).`);
console.log(`Rajaus: CC0 tai CC BY, kesto ${minKesto}–${maxKesto} s.\n`);

let data = null;
for (let yritys = 0; yritys < 4 && !data; yritys++) {
  try {
    const vastaus = await fetch(`https://freesound.org/apiv2/search/text/?${parametrit}`, {
      signal: AbortSignal.timeout(20000),
    });
    if (vastaus.ok) {
      data = await vastaus.json();
      break;
    }
    if (vastaus.status === 401) {
      console.error('Freesound vastasi 401: avain ei kelpaa.');
      console.error(`Tarkista salaisuuden ${avainNimi} arvo osoitteessa`);
      console.error('https://freesound.org/apiv2/apply/');
      process.exit(1);
    }
    if (vastaus.status === 429) {
      console.error(`Kiintiö täynnä (429), odotetaan… (yritys ${yritys + 1}/4)`);
    } else if (vastaus.status < 500) {
      console.error(`Freesound vastasi ${vastaus.status}.`);
      process.exit(1);
    }
  } catch (virhe) {
    console.error(`Haku ei onnistunut: ${virhe.message} (yritys ${yritys + 1}/4)`);
  }
  if (!data) await new Promise((r) => { setTimeout(r, 3000 * (yritys + 1)); });
}

if (!data) {
  console.error('Hakua ei saatu läpi neljällä yrityksellä.');
  process.exit(1);
}

/*
 * Esikuuntelu-mp3 on se osoite, jota peli käyttää: alkuperäinen
 * tiedosto voi olla pakkaamaton wav, jota ei ladata puhelimeen.
 * Ilman previews-kenttää osuma on hyödytön, joten se karsitaan.
 */
const ehdokkaat = (data.results ?? [])
  .map((o) => ({
    url: o.previews?.['preview-hq-mp3'] ?? o.previews?.['preview-lq-mp3'] ?? null,
    nimi: `${o.name} — ${o.username}, ${lisenssiNimi(o.license)}`,
    kesto: Math.round(o.duration ?? 0),
    arvio: o.num_ratings >= 3 ? Number((o.avg_rating ?? 0).toFixed(1)) : null,
    sivu: o.url,
  }))
  .filter((o) => o.url)
  .slice(0, maara);

console.log(`${data.count ?? 0} osumaa, ${ehdokkaat.length} ehdokasta:\n`);
for (const e of ehdokkaat) {
  const arvio = e.arvio === null ? 'ei arvioita' : `${e.arvio}/5`;
  console.log(`  ${String(e.kesto).padStart(4)} s  ${arvio.padEnd(11)} ${e.nimi}`);
  console.log(`            ${e.url}`);
}

if (ulos) {
  writeFileSync(ulos, `${JSON.stringify({ haku, kori, ehdokkaat }, null, 2)}\n`);
  console.log(`\nKirjoitettu ${ulos}.`);
}

if (!ehdokkaat.length) {
  console.log('\nEi yhtään kelvollista ehdokasta. Kokeile toisia hakusanoja tai');
  console.log('väljennä kestorajoja --min-kesto ja --max-kesto.');
}

/* ================================================================== *
 * TEHOSTELISTAN AJO (--lista / --pulu)
 *
 * Ketju yhdelle tunnukselle:
 *   haku (n hakusanaa) → paras osuma pisteillä → esikatselu-mp3 levylle
 *   → hiljaisuus pois päistä → taso mitataan ja korjataan → häivytykset
 *   → ämpäriin aanet/tehosteet/pulu/<tunnus>.mp3 → rivi manifestiin.
 *
 * TASO −14 LUFS (listan `tavoiteLufs`). Se on selvästi kovempi kuin
 * generoitujen tehosteiden −30 LUFS, ja tarkoituksella: nämä ovat
 * lyhyitä iskuja eivätkä taustaa, ja lopullisen kuuluvuuden asettaa
 * peli (js/sound.js PULUN_TASO, −8 dB luentaan nähden). Tiedoston taso
 * on siis vertailukelpoinen lähtökohta, ei lopullinen voimakkuus.
 *
 * MITÄÄN EI JÄÄ REPOON. Tiedostot kirjoitetaan media/-puolelle
 * (.gitignoressa, tarkistetaan koneellisesti) ja viedään sieltä
 * ämpäriin — sama sopimus kuin tools/generoi-tehosteet.mjs:llä.
 * ================================================================== */

function ajaKomento(komento, argumentit, { salliVirhe = false } = {}) {
  const ajo = spawnSync(komento, argumentit, {
    encoding: 'utf8', maxBuffer: 64 * 1024 * 1024,
  });
  const loki = `${ajo.stdout ?? ''}${ajo.stderr ?? ''}`;
  if (!salliVirhe && (ajo.error || ajo.status !== 0)) {
    throw new Error(`${komento} epäonnistui (${ajo.error?.message ?? ajo.status}):\n`
      + loki.slice(-2000));
  }
  return { koodi: ajo.status ?? 1, loki };
}

function komentoOlemassa(komento) {
  return spawnSync('which', [komento], { encoding: 'utf8' }).status === 0;
}

function aanenKesto(polku) {
  const { loki } = ajaKomento('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', polku,
  ]);
  const arvo = Number(loki.trim());
  if (!Number.isFinite(arvo) || arvo <= 0) throw new Error(`kestoa ei saatu: ${polku}`);
  return arvo;
}

/** Kaatuu, jos polku ei ole .gitignoressa — media ei mene repoon. */
function vaadiGitignore(polku) {
  const ajo = spawnSync('git', ['-C', JUURI, 'check-ignore', '-q', polku], { encoding: 'utf8' });
  if (ajo.status !== 0) {
    throw new Error(`${polku} EI ole .gitignoressa — valmis tehoste menisi repoon. `
      + 'Media kuuluu ämpäriin (Raamattu: "kaikki aina ämpäriin").');
  }
}

/** Yksi hakukierros Freesoundiin, neljä yritystä kuten ehdokashaussa. */
async function haeKerran(sanat, tehoste) {
  const p = new URLSearchParams({
    query: sanat,
    page_size: '30',
    token: AVAIN,
    fields: 'id,name,username,license,previews,duration,avg_rating,num_ratings,num_downloads,url',
    filter: hakusuodatin(tehoste),
    sort: 'rating_desc',
  });
  for (let yritys = 0; yritys < 4; yritys += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const vastaus = await fetch(`https://freesound.org/apiv2/search/text/?${p}`, {
        signal: AbortSignal.timeout(20000),
      });
      if (vastaus.ok) return (await vastaus.json()).results ?? [];
      if (vastaus.status === 401) throw new Error('Freesound vastasi 401: avain ei kelpaa.');
      if (vastaus.status < 500 && vastaus.status !== 429) {
        console.error(`   Freesound vastasi ${vastaus.status} haulle "${sanat}".`);
        return [];
      }
    } catch (virhe) {
      if (/401/.test(virhe.message)) throw virhe;
      console.error(`   haku "${sanat}" ei onnistunut: ${virhe.message} (${yritys + 1}/4)`);
    }
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => { setTimeout(r, 3000 * (yritys + 1)); });
  }
  return [];
}

/** Kaikki tehosteen hakusanat läpi, osumat yhteen ja kaksoiskappaleet pois. */
async function haeOsumat(tehoste) {
  const nahdyt = new Map();
  for (const sanat of tehoste.hakusanat) {
    // eslint-disable-next-line no-await-in-loop
    for (const osuma of await haeKerran(sanat, tehoste)) {
      if (!nahdyt.has(osuma.id)) nahdyt.set(osuma.id, osuma);
    }
  }
  return [...nahdyt.values()];
}

/** Esikatselu-mp3 levylle. Alkuperäinen voi olla wav, jota ei ladata puhelimeen. */
async function lataaEsikatselu(osuma, kohde) {
  const url = osuma.previews?.['preview-hq-mp3'] ?? osuma.previews?.['preview-lq-mp3'];
  if (!url) throw new Error(`osumalla ${osuma.id} ei ole esikatselua`);
  const vastaus = await fetch(url, { signal: AbortSignal.timeout(60000) });
  if (!vastaus.ok) throw new Error(`esikatselun lataus ${vastaus.status}: ${url}`);
  const data = Buffer.from(await vastaus.arrayBuffer());
  writeFileSync(kohde, data);
  return data.length;
}

/**
 * Hiljaisuus pois päistä, taso mitataan ja korjataan yhdellä
 * lineaarisella vahvistuksella, häivytykset päihin. Sama kaksivaiheinen
 * malli kuin generoi-tehosteet.mjs:llä: dynaaminen loudnorm muuttaisi
 * äänen sisäisiä suhteita, ja tömähdyksessä juuri isku ja sen laskeuma
 * ovat se, mikä tekee siitä tömähdyksen.
 */
function normalisoi(lahde, kohde, tyokansio, tavoiteLufs) {
  const wav = join(tyokansio, 'leikattu.wav');
  ajaKomento('ffmpeg', [
    '-y', '-v', 'error', '-i', lahde,
    '-af', `aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=mono,${
      leikkaaHiljaisuusSuodatin()}`,
    '-c:a', 'pcm_s16le', wav,
  ]);
  const leikattu = aanenKesto(wav);

  const mittausLoki = ajaKomento('ffmpeg', [
    '-hide_banner', '-v', 'info', '-i', wav,
    '-af', `loudnorm=I=${tavoiteLufs}:TP=-1:LRA=11:print_format=json`,
    '-f', 'null', '-',
  ]).loki;
  const mitattu = tulkitseLoudnorm(mittausLoki);
  if (!mitattu) {
    throw new Error(`loudnormin mittaus ei tuottanut lukua:\n${mittausLoki.slice(-800)}`);
  }
  const korjaus = tavoiteLufs - mitattu.taso;

  ajaKomento('ffmpeg', [
    '-y', '-v', 'error', '-i', wav,
    '-af', viimeistelySuodatin({
      kesto: leikattu, korjausDb: korjaus, haivytys: PULU_HAIVYTYS_S,
    }),
    '-ac', '1', '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', '128k', kohde,
  ]);
  return {
    leikattu, mitattu, korjaus, valmis: aanenKesto(kohde),
  };
}

/** Vie tiedosto ämpäriin (sama aws s3 cp kuin vie-aanet.yml). */
function vieAmpariin(polku, avain, tyyppi) {
  const tili = process.env.R2_ACCOUNT_ID;
  const ampari = process.env.R2_BUCKET;
  const paasy = process.env.AWS_ACCESS_KEY_ID ?? process.env.R2_ACCESS_KEY_ID;
  const salaisuus = process.env.AWS_SECRET_ACCESS_KEY ?? process.env.R2_SECRET_ACCESS_KEY;
  const puuttuu = [
    !tili && 'R2_ACCOUNT_ID', !ampari && 'R2_BUCKET',
    !paasy && 'R2_ACCESS_KEY_ID', !salaisuus && 'R2_SECRET_ACCESS_KEY',
  ].filter(Boolean);
  if (puuttuu.length) throw new Error(`vienti ei onnistu, puuttuu: ${puuttuu.join(', ')}`);
  if (!komentoOlemassa('aws')) throw new Error('aws-cli puuttuu — vienti tarvitsee sen.');
  ajaKomento('aws', [
    's3', 'cp', polku, `s3://${ampari}/${avain}`,
    '--endpoint-url', `https://${tili}.r2.cloudflarestorage.com`,
    '--no-progress',
    '--content-type', tyyppi,
    // Manifesti saa lyhyen välimuistin: yhden tunnuksen korjaus näkyy
    // pelissä tunnissa eikä kuukaudessa. Äänitiedostot ovat pysyviä.
    '--cache-control', tyyppi === 'application/json'
      ? 'public, max-age=3600' : 'public, max-age=2592000',
  ]);
}

/** Jo julkaistu manifesti, jotta yhden tunnuksen korjaus ei pyyhi muita. */
async function haeVanhaManifesti(osoite) {
  try {
    const vastaus = await fetch(osoite, { signal: AbortSignal.timeout(20000) });
    if (!vastaus.ok) return null;
    const data = await vastaus.json();
    return Array.isArray(data?.tehosteet) ? data : null;
  } catch {
    return null;
  }
}

/** Koko listan ajo. Palauttaa prosessin paluukoodin. */
async function ajaLista({
  listapolku, tunnus, vienti, kuiva, ulos: ulosPolku,
}) {
  const lista = lueTehostelista(listapolku);
  const tehosteet = tunnus
    ? lista.tehosteet.filter((t) => t.tunnus === tunnus)
    : lista.tehosteet;
  if (!tehosteet.length) {
    console.error(`Tunnusta "${tunnus}" ei ole listassa ${listapolku}.`);
    console.error(`Listassa on: ${lista.tehosteet.map((t) => t.tunnus).join(', ')}`);
    return 1;
  }

  const manifestiAvain = `${lista.amparinKansio}/${lista.manifesti}`;
  const julkinenManifesti = `${julkinenJuuri()}${manifestiAvain}`;

  console.log(`Tehostelista: ${listapolku}`);
  console.log(`Avain löytyi ympäristömuuttujasta ${avainNimi} (arvoa ei tulosteta).`);
  console.log(`Ämpärin kansio: ${lista.amparinKansio}/  taso ${lista.tavoiteLufs} LUFS`);
  console.log(`Tehosteita ajossa: ${tehosteet.length}/${lista.tehosteet.length}`);
  if (kuiva) console.log('KUIVA AJO (--kuiva): vain haku ja valinta, ei latausta eikä vientiä.');
  else if (!vienti) console.log('EI VIENTIÄ (--ei-vientia): tiedostot jäävät levylle.');
  console.log('');

  if (!kuiva) {
    for (const komento of ['ffmpeg', 'ffprobe']) {
      if (!komentoOlemassa(komento)) {
        console.error(`${komento} puuttuu polusta — normalisointi tarvitsee sen.`);
        console.error('Asennus: apt-get install -y ffmpeg (ajossa tämä tehdään automaattisesti).');
        return 1;
      }
    }
  }

  const tyokansio = mkdtempSync(join(tmpdir(), 'pulutehosteet-'));
  const kohdekansio = resolve(JUURI, PULU_KOHDEKANSIO);
  const raakakansio = resolve(JUURI, PULU_RAAKAKANSIO);
  if (!kuiva) {
    vaadiGitignore(kohdekansio);
    vaadiGitignore(raakakansio);
    mkdirSync(kohdekansio, { recursive: true });
    mkdirSync(raakakansio, { recursive: true });
  }

  const rivit = [];
  let virheita = 0;
  try {
    for (const tehoste of tehosteet) {
      console.log(`── ${tehoste.tunnus}  (${tehoste.kuvaus})`);
      console.log(`   haku: ${tehoste.hakusanat.join(' | ')}`);
      console.log(`   rajaus: ${hakusuodatin(tehoste)}`);

      // eslint-disable-next-line no-await-in-loop
      const osumat = await haeOsumat(tehoste);
      const valinta = valitseParas(osumat, tehoste);
      if (!valinta) {
        console.error(`   VIRHE: ei yhtään kelvollista osumaa (${osumat.length} haettua).`);
        virheita += 1;
        continue;
      }
      const o = valinta.osuma;
      const lisenssi = lisenssiNimi(o.license);
      console.log(`   valinta: "${o.name}" — ${o.username}, ${lisenssi}`);
      console.log(`   ${o.duration.toFixed(2)} s, arvio ${(o.avg_rating ?? 0).toFixed(1)}/5 `
        + `(${o.num_ratings ?? 0} kpl), ${o.num_downloads ?? 0} latausta, `
        + `pisteet ${valinta.pisteet} (${JSON.stringify(valinta.osat)})`);
      console.log(`   ${o.url}`);

      if (kuiva) {
        rivit.push(manifestirivi(tehoste, valinta, { kesto: o.duration }));
        console.log('');
        continue;
      }

      const raaka = join(raakakansio, `raaka-${tehoste.tunnus}.mp3`);
      const kohde = join(kohdekansio, `${tehoste.tunnus}.mp3`);
      // eslint-disable-next-line no-await-in-loop
      const tavut = await lataaEsikatselu(o, raaka);
      const tulos = normalisoi(raaka, kohde, tyokansio, lista.tavoiteLufs);
      console.log(`   lataus ${(tavut / 1024).toFixed(0)} kt → leikkaus `
        + `${tulos.leikattu.toFixed(2)} s, taso ${tulos.mitattu.taso.toFixed(1)} LUFS, `
        + `korjaus ${tulos.korjaus.toFixed(2)} dB → ${tulos.valmis.toFixed(2)} s`);

      if (tulos.valmis < tehoste.kestoMin * 0.5) {
        console.error(`   VIRHE: leikattu ääni ${tulos.valmis.toFixed(2)} s on liian lyhyt `
          + `(kestoMin ${tehoste.kestoMin} s) — osuma oli luultavasti pelkkää hiljaisuutta.`);
        virheita += 1;
        continue;
      }

      if (vienti) {
        vieAmpariin(kohde, `${lista.amparinKansio}/${tehoste.tunnus}.mp3`, 'audio/mpeg');
        console.log(`   ämpäriin: ${lista.amparinKansio}/${tehoste.tunnus}.mp3`);
      }
      rivit.push(manifestirivi(tehoste, valinta, { kesto: tulos.valmis }));
      console.log('');
    }

    /*
     * MANIFESTI. Yhden tunnuksen korjausajo ei saa pyyhkiä muita
     * rivejä, joten jo julkaistu manifesti luetaan ja päälle
     * kirjoitetaan vain tässä ajossa syntyneet tunnukset.
     */
    const vanha = tunnus ? await haeVanhaManifesti(julkinenManifesti) : null;
    const kaikki = new Map((vanha?.tehosteet ?? []).map((r) => [r.tunnus, r]));
    for (const rivi of rivit) kaikki.set(rivi.tunnus, rivi);
    const jarjestys = lista.tehosteet.map((t) => t.tunnus);
    const manifesti = {
      kuvaus: lista.kuvaus,
      paivitetty: new Date().toISOString().slice(0, 10),
      juuri: `${lista.amparinKansio}/`,
      tavoiteLufs: lista.tavoiteLufs,
      tehosteet: [...kaikki.values()]
        .sort((a, b) => jarjestys.indexOf(a.tunnus) - jarjestys.indexOf(b.tunnus)),
    };
    const manifestiTeksti = `${JSON.stringify(manifesti, null, 2)}\n`;

    if (ulosPolku) {
      writeFileSync(ulosPolku, manifestiTeksti);
      console.log(`Manifesti kirjoitettu myös tiedostoon ${ulosPolku}.`);
    }
    if (!kuiva) {
      const manifestiPolku = join(kohdekansio, lista.manifesti);
      writeFileSync(manifestiPolku, manifestiTeksti);
      if (vienti) {
        vieAmpariin(manifestiPolku, manifestiAvain, 'application/json');
        console.log(`Manifesti ämpäriin: ${manifestiAvain}`);
      } else {
        console.log(`Manifesti levylle: ${manifestiPolku}`);
      }
    }

    console.log('');
    console.log('ATTRIBUUTIOT (CC BY vaatii nimeämisen; CC0 ei vaadi):');
    let byta = 0;
    for (const rivi of manifesti.tehosteet) {
      if (!rivi.attribuutio) continue;
      byta += 1;
      console.log(`  ${rivi.tunnus}: ${rivi.attribuutio}`);
    }
    if (!byta) console.log('  ei yhtään — kaikki valitut ovat CC0.');
  } finally {
    rmSync(tyokansio, { recursive: true, force: true });
  }

  console.log('');
  if (kuiva) {
    console.log(`Kuiva ajo valmis: ${rivit.length}/${tehosteet.length} tunnukselle löytyi osuma.`);
    console.log('Mitään ei ladattu eikä viety ämpäriin.');
  } else if (vienti) {
    console.log(`Valmista: ${rivit.length}/${tehosteet.length} tehostetta ämpärissä.`);
    console.log(`Manifesti: ${julkinenManifesti}`);
    console.log('');
    console.log('KUUNTELE tehosteet ennen kuin ne jäävät peliin — kone valitsi ne');
    console.log('arvosanan, latausten ja keston perusteella, ei korvalla. Huonon');
    console.log('osuman vaihtaa ajamalla saman ajon uudestaan --tunnus <tunnus>.');
  } else {
    console.log(`Valmista: ${rivit.length}/${tehosteet.length} tehostetta kansiossa `
      + `${PULU_KOHDEKANSIO}/.`);
  }
  return virheita ? 1 : 0;
}
