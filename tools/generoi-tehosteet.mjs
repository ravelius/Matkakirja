/*
 * ÄÄNITEHOSTEET — lyhyet efektit ElevenLabsin sound-generation-APIlla.
 *
 * Omistajan tilaus 3.9.2026, sanatarkasti: *"Generoi joku toinen
 * ääniefekti vuodenvaihtumisen kohdalle. … se efektiääni
 * vuodenvaihtuessa voisi olla joku uuu-huudahdus, aivan kuin yleisö
 * kohahtaisi, kun uusi hieno keksintö saapuu maailmaan. Niitä vain
 * pitäisi sitten generoida useampia variantteja, jotta sama ääniefekti
 * ei toistuisi peräjälkeen. Ne voisivat kuitenkin olla aika lähellä
 * toisiaan. ääniefektin ei tarvitse nousta merkittävästi
 * taustamusiikin päälle."*
 *
 *   node tools/generoi-tehosteet.mjs --laji kohahdus
 *   node tools/generoi-tehosteet.mjs --laji kohahdus --maara 2 --ei-vientia
 *   node tools/generoi-tehosteet.mjs --laji kohahdus --kuiva
 *
 *   --laji kohahdus     pakollinen (toistaiseksi ainoa laji)
 *   --maara N           montako varianttia (oletus lajin oma, 1…8).
 *                       JOKAINEN VARIANTTI ON OMA MAKSULLINEN KUTSUNSA.
 *   --kuiva             ei APIa eikä vientiä: tulostaa suunnitelman ja
 *                       ajaa koko ffmpeg-ketjun syntetisoidulla äänellä
 *   --ei-vientia        VAIN kuivaan ajoon. Maksullinen generointi
 *                       kieltäytyy tästä lipusta: raakatuotos on aina
 *                       vietävä ämpäriin (Raamattu: ALKUPERÄISET
 *                       ÄÄNITIEDOSTOT SÄILYTETÄÄN AINA).
 *
 * ------------------------------------------------------------------
 * MIKSI OMA TYÖKALU EIKÄ LAJI generoi-siirtymamusiikki.mjs:ÄÄN
 * ------------------------------------------------------------------
 *
 * Kyseessä on ERI RAJAPINTA ja eri ketju. Musiikkityökalu kutsuu
 * ElevenLabs Musicia (`/v1/music`, `prompt` + `music_length_ms` +
 * `force_instrumental`) ja ompelee tuotoksesta saumattoman LOOPIN;
 * tehoste tulee sound-generation-rajapinnasta (`/v1/sound-generation`,
 * `text` + `duration_seconds` + `prompt_influence`) ja on kertasoitto,
 * jolla ei ole saumaa lainkaan. Ainoa yhteinen osa ovat ffmpegin
 * lokien tulkitsijat ja ämpärin juuri — ne TUODAAN musiikkityökalusta
 * (se ei aja pääohjelmaansa moduulina), jottei sama regexp elä
 * kahdessa paikassa.
 *
 * Tehosteella on lisäksi oma vaatimuksensa, jota musiikilla ei ole:
 * VARIANTIT. Peli arpoo neljästä eikä soita samaa kahdesti peräkkäin
 * (js/tehosteet.js), joten yksi ajo tekee monta tiedostoa samasta
 * promptista — malli antaa joka kutsulla hieman eri oton.
 *
 * ------------------------------------------------------------------
 * TASO: −30 LUFS
 * ------------------------------------------------------------------
 *
 * Musiikki on −33 LUFS (tools/generoi-siirtymamusiikki.mjs). Tehoste
 * saa olla 3 dB sitä kovempi, jotta se kuuluu musiikin seasta — mutta
 * ei enempää: omistaja *"ei tarvitse nousta merkittävästi
 * taustamusiikin päälle"*. Loppusijoitus tehdään pelissä
 * (js/tehosteet.js KOHAHDUS_VOIMA = 0,35 × linssiraidan voima), joten
 * tiedoston taso on vain lähtökohta, ei lopullinen kuuluvuus.
 *
 * Normalisointi on kaksivaiheinen kuten musiikilla: ensin MITATAAN
 * (loudnorm print_format=json), sitten korjataan yhdellä lineaarisella
 * `volume=…dB`-vahvistuksella. Dynaaminen loudnorm muuttaisi äänen
 * sisäisiä suhteita — kohahduksen nousu ja lasku ovat juuri se, mikä
 * tekee siitä kohahduksen.
 *
 * ------------------------------------------------------------------
 * VIENTI JA REPO
 * ------------------------------------------------------------------
 *
 * Valmiit tiedostot EIVÄT mene repoon: ne kirjoitetaan media/-puolelle
 * (.gitignoressa, tarkistetaan ennen ensimmäistäkään maksullista
 * kutsua) ja viedään ämpärin `aanet/tehosteet/`-kansioon samalla
 * `aws s3 cp` -komennolla ja samoilla neljällä salaisuudella kuin
 * musiikkityökalu. Peli hakee tasan sen polun
 * (js/tehosteet.js TEHOSTE_JUURI).
 *
 * API-avain luetaan VAIN ympäristöstä (ELEVEN_API_KEY) eikä sitä
 * tulosteta koskaan. HUOM konttiympäristössä: Noden fetch ei käytä
 * ympäristön proxyä ilman NODE_USE_ENV_PROXY=1.
 */

import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  hiljaisuusVirheet, julkinenJuuri, tulkitseEbur128, tulkitseLoudnorm,
} from './generoi-siirtymamusiikki.mjs';

const TAMA = fileURLToPath(import.meta.url);
const JUURI = resolve(dirname(TAMA), '..');

/*
 * Sama vartija kuin musiikkityökalussa: ilman lippua Noden fetch ei lue
 * HTTPS_PROXYa, ja API-kutsu kaatuu kontissa vaikka verkko on auki.
 * Ohitetaan moduulituonnissa — vain suoraan ajettu prosessi
 * käynnistetään uudelleen.
 */
if (process.argv[1] === TAMA && !process.env.NODE_USE_ENV_PROXY
  && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [TAMA, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

// ── rajapinta ──────────────────────────────────────────────────────

const OSOITE = 'https://api.elevenlabs.io/v1/sound-generation';
const MUOTO = 'mp3_44100_128';
/*
 * prompt_influence 0…1: kuinka tarkasti malli seuraa tekstiä. Korkea
 * arvo tekee tuotoksista toistensa kopioita, matala arvo ajautuu
 * aiheesta. 0,4 on omistajan toiveen mukainen keskitie — variantit
 * ovat *"aika lähellä toisiaan"* mutta eivät samoja.
 */
const PROMPTIN_PAINO = 0.4;

// ── kansiot ────────────────────────────────────────────────────────

/** Ämpärin kansio ja pelin hakupolku (js/tehosteet.js TEHOSTE_JUURI). */
const AMPARIN_KANSIO = 'aanet/tehosteet';
const KOHDE_KANSIO = 'media/tehosteet';
/** Mallin raaka tuotos talteen: uuden leikkauksen voi tehdä ilmaiseksi. */
const RAAKA_KANSIO = 'media/tehosteet-raaka';
/** Eräkohtaiset kuitit: mikä raaka vastaa mitäkin valmista tehostetta. */
const KUITTI_KANSIO = 'media/tehosteet-kuitit';
export const KUITIN_VERSIO = 1;

/*
 * ------------------------------------------------------------------
 * RAAKATUOTOS ÄMPÄRIIN AINA (omistajan sitova sääntö 14.9.2026)
 * ------------------------------------------------------------------
 * Raamattu: "ALKUPERÄISET ÄÄNITIEDOSTOT SÄILYTETÄÄN AINA". Mallin oma
 * tuotos on ainoa asia, josta on maksettu; leikkaus, häivytys ja
 * normalisointi ovat ilmaisia ja toistettavia. Ennen tätä sääntöä
 * raaka jäi vain ajajan levylle (media/tehosteet-raaka on
 * .gitignoressa) ja katosi Actions-ajon mukana, joten uusi leikkaus
 * vaati uuden maksullisen kutsun. Nyt raaka menee ämpäriin
 * erätunnuksella versionoituun avaimeen ENNEN viimeistelyä, ja jos
 * vienti ei ole käytössä tai se epäonnistuu, ajo kaatuu.
 */
const RAAKA_ALIKANSIO = 'raaka';
const KUITTI_ALIKANSIO = 'kuitit';

/*
 * ------------------------------------------------------------------
 * KOODAUS 320 kbps (omistaja 14.9.2026)
 * ------------------------------------------------------------------
 * Tehoste käy läpi KAKSI mp3-sukupolvea: ElevenLabs antaa 128 kbps:n
 * tiedoston, ja viimeistely koodaa sen uudelleen. Livian putkessa
 * jälkimmäinen sukupolvi oli myös 128 kbps, ja mitattuna se lisäsi
 * signaaliin −25 dB virhettä — omistajan kuulema "pieni digitaalinen
 * häiriö" (docs/raportit/viesti-fable-aaniputki-20260914.md).
 *
 * Tehosteilla uudelleenkoodausta EI voi poistaa, koska normalisointi
 * on tarpeen: lyhyet tehosteet tulevat mallilta eri tasoissa ja niiden
 * on asetuttava 3 dB musiikin yläpuolelle. Ratkaisu on siksi tehdä se
 * yksi sukupolvi LÄPINÄKYVÄSTI: samassa mittauksessa 320 kbps jätti
 * virheen −59 dB:hen eli 34 dB vaimeammaksi kuin 128 kbps.
 *
 * Tiedostot ovat 1,5 sekunnin mittaisia, joten koko kasvaa noin
 * 24 kt:sta 60 kt:iin variantilta — neljä varianttia yhteensä alle
 * 0,25 Mt.
 */
const KOODAUS_KBPS = 320;

// ── vaatimukset ────────────────────────────────────────────────────

/** Tehosteen taso: 3 dB musiikin (−33 LUFS) yläpuolella, ei enempää. */
const TAVOITE_LUFS = -30;
/** Mp3-koodaus ja purku siirtävät mitattua tasoa vajaan puoli LU. */
const LUFS_TOLERANSSI = 1;
/** Häivytykset päihin: naksahdukseton alku ja loppu ilman kuuluvaa fadea. */
const HAIVYTYS_S = 0.03;
/** Hiljaisuusvahti: näin hiljainen ja näin pitkä jakso on hiljaisuutta. */
const HILJAISUUS_DB = -50;
const HILJAISUUS_KESTO = 0.15;
/** Näin lähellä päätä oleva hiljaisuus on tiedoston päässä. */
const REUNA = 0.2;

// ── lajit ──────────────────────────────────────────────────────────

/*
 * Prompti on englanniksi, koska malli on koulutettu englanniksi.
 * Kaikki neljä varianttia tulevat SAMASTA promptista: ero syntyy
 * mallin omasta satunnaisuudesta, ei eri sanoista — omistaja halusi
 * ne *"aika lähellä toisiaan"*.
 *
 * `tiedosto` on kytkentä: peli hakee tasan nämä nimet ämpärin
 * aanet/tehosteet-kansiosta (js/tehosteet.js kohahdusUrl).
 */
export const TEHOSTEET = {
  kohahdus: {
    tiedosto: (i) => `kohahdus-${i + 1}.mp3`,
    kuvaus: 'Yleisön hillitty "uuu" — uusi keksintö saapuu maailmaan',
    maara: 4,
    kesto: 1.5,
    kestoMin: 1.0,
    kestoMax: 2.4,
    prompt: 'A small nineteenth century lecture hall audience reacting to a '
      + 'demonstration: a soft, restrained collective "ooh" of delight and '
      + 'surprise, twenty or thirty people, rising gently and settling again '
      + 'within about one and a half seconds. Warm and hushed, heard from a '
      + 'few rows back. No applause, no clapping, no cheering, no laughter, '
      + 'no words and no speech. Dry indoor room, no music, no reverb tail, '
      + 'low level throughout.',
  },
};

/** Lajin varianttimäärä oletuksineen. */
export const varianttiMaara = (laji, pyydetty) => (
  Number.isFinite(pyydetty) ? pyydetty : TEHOSTEET[laji].maara);

// ── argumentit ─────────────────────────────────────────────────────

/** Komentoriviliput. Palauttaa `{ virhe }`, jos syöte ei kelpaa. */
export function tulkitseArgumentit(argumentit) {
  const liput = {
    laji: null, maara: null, kuiva: false, vienti: true,
  };
  for (let i = 0; i < argumentit.length; i += 1) {
    const arg = argumentit[i];
    if (arg === '--laji') {
      liput.laji = argumentit[i + 1] ?? null;
      i += 1;
      if (!liput.laji) return { ...liput, virhe: '--laji ilman arvoa' };
    } else if (arg === '--maara') {
      const arvo = Number(argumentit[i + 1]);
      i += 1;
      if (!Number.isInteger(arvo) || arvo < 1 || arvo > 8) {
        return { ...liput, virhe: '--maara on kokonaisluku 1…8' };
      }
      liput.maara = arvo;
    } else if (arg === '--kuiva') {
      liput.kuiva = true;
    } else if (arg === '--ei-vientia') {
      liput.vienti = false;
    } else {
      return { ...liput, virhe: `tuntematon argumentti: ${arg}` };
    }
  }
  if (!liput.laji) return { ...liput, virhe: '--laji puuttuu' };
  if (!TEHOSTEET[liput.laji]) return { ...liput, virhe: `tuntematon laji: ${liput.laji}` };
  return liput;
}

// ── ffmpeg-ketju (puhtaat funktiot) ────────────────────────────────

/**
 * Hiljaisuuden leikkaus molemmista päistä. `silenceremove` osaa vain
 * alun, joten loppu hoidetaan kääntämällä ääni ympäri ja takaisin —
 * sama vakiotemppu kuin ffmpegin omassa ohjeessa.
 */
export function leikkaaHiljaisuusSuodatin({ kynnysDb = HILJAISUUS_DB } = {}) {
  const poista = 'silenceremove=start_periods=1:start_duration=0'
    + `:start_threshold=${kynnysDb}dB:detection=peak`;
  return `${poista},areverse,${poista},areverse`;
}

/**
 * Häivytykset päihin ja tason korjaus yhtenä lineaarisena
 * vahvistuksena. `kesto` on leikatun äänen pituus sekunteina.
 */
export function viimeistelySuodatin({ kesto, korjausDb, haivytys = HAIVYTYS_S }) {
  if (!(kesto > 0)) throw new Error('keston pitää olla positiivinen');
  // Hyvin lyhyt ääni ei kestä kahta täyttä häivytystä: puolitetaan.
  const h = Math.min(haivytys, kesto / 4);
  const ulosAlkaa = Math.max(0, kesto - h);
  return [
    `afade=t=in:st=0:d=${h.toFixed(3)}`,
    `afade=t=out:st=${ulosAlkaa.toFixed(3)}:d=${h.toFixed(3)}`,
    `volume=${korjausDb.toFixed(2)}dB`,
  ].join(',');
}

// ── apurit ─────────────────────────────────────────────────────────

function aja(komento, argumentit, { salliVirhe = false } = {}) {
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

function onOlemassa(komento) {
  return spawnSync('which', [komento], { encoding: 'utf8' }).status === 0;
}

/** Äänitiedoston kesto sekunteina. */
function kestoSekunteina(polku) {
  const { loki } = aja('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', polku,
  ]);
  const arvo = Number(loki.trim());
  if (!Number.isFinite(arvo) || arvo <= 0) throw new Error(`kestoa ei saatu: ${polku}`);
  return arvo;
}

/** Kaatuu, jos polku ei ole .gitignoressa — mediaa ei viedä repoon. */
function vaadiGitignore(polku) {
  const ajo = spawnSync('git', ['-C', JUURI, 'check-ignore', '-q', polku], {
    encoding: 'utf8',
  });
  if (ajo.status !== 0) {
    throw new Error(`${polku} EI ole .gitignoressa — valmis tehoste menisi repoon. `
      + 'Media kuuluu ämpäriin (Raamattu: "kaikki aina ämpäriin").');
  }
}

// ── ketjun vaiheet ─────────────────────────────────────────────────

/**
 * Kuivan ajon lähde: syntetisoitu "kohahdus" ilman APIa. Kohoava ja
 * laskeva kohina hiljaisuuden ympäröimänä — sillä ffmpeg-ketju
 * (leikkaus, häivytykset, taso) tulee kokeilluksi oikean muotoisella
 * äänellä.
 */
function syntetisoiLahde(kohde, sekunnit) {
  const nousu = (sekunnit * 0.4).toFixed(3);
  const lasku = (sekunnit * 0.6).toFixed(3);
  aja('ffmpeg', [
    '-y', '-v', 'error',
    '-f', 'lavfi',
    '-i', `anoisesrc=color=brown:duration=${sekunnit}:sample_rate=44100,`
      + 'bandpass=f=520:width_type=q:w=1.2,'
      + `afade=t=in:st=0:d=${nousu}:curve=qsin,`
      + `afade=t=out:st=${nousu}:d=${lasku}:curve=qsin`,
    // Hiljaisuutta molempiin päihin, jotta leikkausvaihe saa työtä.
    '-af', 'adelay=250|250,apad=pad_dur=0.25',
    // 128 kbps TAHALLAAN: tämä jäljittelee ElevenLabsin omaa tuotosta
    // (MUOTO), josta ketju lähtee. Viimeistelyn koodaus on 320 kbps.
    '-c:a', 'libmp3lame', '-b:a', '128k', kohde,
  ]);
}

/** Yksi maksullinen kutsu: mallilta yksi tehostevariantti levylle. */
async function haeApista(tehoste, avain, kohde) {
  const vastaus = await fetch(OSOITE, {
    method: 'POST',
    headers: { 'xi-api-key': avain, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: tehoste.prompt,
      duration_seconds: tehoste.kesto,
      prompt_influence: PROMPTIN_PAINO,
      output_format: MUOTO,
    }),
    signal: AbortSignal.timeout(180000),
  });
  if (!vastaus.ok) {
    // Virherunko näkyviin (avain ei ole siinä): 401/403 kertoo, ettei
    // tehosterajapinta ole auki tällä avaimella.
    throw new Error(`HTTP ${vastaus.status}: ${(await vastaus.text()).slice(0, 400)}`);
  }
  const data = Buffer.from(await vastaus.arrayBuffer());
  writeFileSync(kohde, data);
  return data.length;
}

/** Leikkaa hiljaisuus, häivytä päät, normalisoi taso ja kirjoita mp3. */
function viimeistele(lahde, kohde, tyokansio) {
  const wav = join(tyokansio, 'leikattu.wav');
  aja('ffmpeg', [
    '-y', '-v', 'error', '-i', lahde,
    '-af', `aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=mono,${
      leikkaaHiljaisuusSuodatin()}`,
    '-c:a', 'pcm_s16le', wav,
  ]);
  const leikattu = kestoSekunteina(wav);

  // Vaihe 1: mittaus. Vaihe 2: yksi lineaarinen vahvistus (ks. otsikko).
  const mittausLoki = aja('ffmpeg', [
    '-hide_banner', '-v', 'info', '-i', wav,
    '-af', `loudnorm=I=${TAVOITE_LUFS}:TP=-2:LRA=11:print_format=json`,
    '-f', 'null', '-',
  ]).loki;
  const mitattu = tulkitseLoudnorm(mittausLoki);
  if (!mitattu) {
    throw new Error(`loudnormin mittaus ei tuottanut lukua:\n${mittausLoki.slice(-800)}`);
  }
  const korjaus = TAVOITE_LUFS - mitattu.taso;
  aja('ffmpeg', [
    '-y', '-v', 'error', '-i', wav,
    '-af', viimeistelySuodatin({ kesto: leikattu, korjausDb: korjaus }),
    '-ac', '1', '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', `${KOODAUS_KBPS}k`, kohde,
  ]);
  return { leikattu, mitattu, korjaus };
}

/** Valmiin tehosteen tarkistukset: kesto, taso ja hiljaisuus päissä. */
function tarkista(kohde, tehoste) {
  const pituus = kestoSekunteina(kohde);
  const taso = tulkitseEbur128(aja('ffmpeg', [
    '-hide_banner', '-v', 'info', '-i', kohde, '-af', 'ebur128=peak=true',
    '-f', 'null', '-',
  ]).loki);
  const hiljaisuus = hiljaisuusVirheet(aja('ffmpeg', [
    '-hide_banner', '-v', 'info', '-i', kohde,
    '-af', `silencedetect=n=${HILJAISUUS_DB}dB:d=${HILJAISUUS_KESTO}`,
    '-f', 'null', '-',
  ]).loki, pituus, { reuna: REUNA });

  const virheet = [];
  const varoitukset = [];
  if (pituus < tehoste.kestoMin || pituus > tehoste.kestoMax) {
    virheet.push(`kesto ${pituus.toFixed(2)} s ei ole välillä `
      + `${tehoste.kestoMin}–${tehoste.kestoMax} s`);
  }
  if (taso === null) {
    virheet.push('tasoa ei saatu mitattua (ebur128)');
  } else if (Math.abs(taso - TAVOITE_LUFS) > LUFS_TOLERANSSI) {
    virheet.push(`taso ${taso.toFixed(1)} LUFS, tavoite ${TAVOITE_LUFS} `
      + `(±${LUFS_TOLERANSSI})`);
  }
  for (const jakso of hiljaisuus.paissa) {
    varoitukset.push(`hiljaisuutta päässä ${jakso.alku.toFixed(2)}–${jakso.loppu.toFixed(2)} s`);
  }
  for (const jakso of hiljaisuus.keskella) {
    varoitukset.push(`hiljainen jakso ${jakso.alku.toFixed(2)}–${jakso.loppu.toFixed(2)} s`);
  }
  return {
    pituus, taso, virheet, varoitukset,
  };
}

/**
 * Vie tiedosto ämpäriin (sama komento kuin muissakin ääniajoissa).
 * `kansio` on oletuksena tehosteiden live-kansio; raakatuotokset ja
 * kuitit menevät omiin eräkohtaisiin alikansioihinsa.
 */
function vieAmpariin(kohde, nimi, kansio = AMPARIN_KANSIO, tyyppi = 'audio/mpeg') {
  const tili = process.env.R2_ACCOUNT_ID;
  const ampari = process.env.R2_BUCKET;
  const avain = process.env.AWS_ACCESS_KEY_ID ?? process.env.R2_ACCESS_KEY_ID;
  const salaisuus = process.env.AWS_SECRET_ACCESS_KEY ?? process.env.R2_SECRET_ACCESS_KEY;
  const puuttuu = [
    !tili && 'R2_ACCOUNT_ID', !ampari && 'R2_BUCKET',
    !avain && 'R2_ACCESS_KEY_ID', !salaisuus && 'R2_SECRET_ACCESS_KEY',
  ].filter(Boolean);
  if (puuttuu.length) throw new Error(`vienti ei onnistu, puuttuu: ${puuttuu.join(', ')}`);
  if (!onOlemassa('aws')) throw new Error('aws-cli puuttuu — vienti tarvitsee sen.');

  aja('aws', [
    's3', 'cp', kohde, `s3://${ampari}/${kansio}/${nimi}`,
    '--endpoint-url', `https://${tili}.r2.cloudflarestorage.com`,
    '--no-progress',
    '--content-type', tyyppi,
    '--cache-control', 'public, max-age=2592000',
  ]);
}

/** HEAD julkiseen osoitteeseen: näkyykö tehoste oikeasti ämpäristä. */
function tarkistaJulkinen(nimi, kansio = AMPARIN_KANSIO) {
  const url = `${julkinenJuuri()}${kansio}/${nimi}`;
  if (!onOlemassa('curl')) return { url, koodi: null, pituus: null };
  const { loki } = aja('curl', ['-sS', '-I', '--max-time', '30', url], { salliVirhe: true });
  const koodi = loki.match(/HTTP\/[\d.]+ (\d{3})/)?.[1] ?? null;
  const pituus = loki.match(/content-length:\s*(\d+)/i)?.[1] ?? null;
  return { url, koodi, pituus };
}

// ── raakavienti, erätunnus ja kuitti ───────────────────────────────

const sha256 = (data) => createHash('sha256').update(data).digest('hex');

/**
 * Erätunnus: sama resepti antaa saman tunnuksen, eri resepti eri.
 * Tunnus on raaka-avaimen ja kuitin nimi, joten se on myös se asia,
 * joka estää kahta ajoa kirjoittamasta toistensa alkuperäisten päälle.
 *
 * @param {string} laji TEHOSTEET-avain
 * @param {number} maara varianttien määrä
 * @param {string} sourceCommit repon HEAD ajohetkellä
 */
export function tuotantoEraId(laji, maara, sourceCommit) {
  const tehoste = TEHOSTEET[laji];
  if (!tehoste) throw new Error(`tuntematon laji: ${laji}`);
  if (!sourceCommit) throw new Error('erätunnus vaatii sourceCommit-tunnuksen');
  return `tehoste-${sha256(JSON.stringify({
    sourceCommit, laji, maara, prompt: tehoste.prompt,
    outputFormat: MUOTO, promptInfluence: PROMPTIN_PAINO,
    postprocess: { targetLufs: TAVOITE_LUFS, fadeSeconds: HAIVYTYS_S, bitrateKbps: KOODAUS_KBPS },
  })).slice(0, 20)}`;
}

/**
 * Raakatuotosten ämpärikansio: eräkohtainen, jotta kaksi ajoa ei voi
 * kirjoittaa toistensa alkuperäisiä yli. Raakaa ei koskaan poisteta
 * eikä ylikirjoiteta (Raamattu 14.9.2026).
 */
export function raakaAmpariKansio(batchId) {
  // Kelvoton tunnus hylätään, ei siivota: siivottu tunnus voisi
  // törmätä toisen erän kanssa ja tuhota sen alkuperäisen.
  if (!/^[a-zA-Z0-9_-]+$/.test(String(batchId ?? ''))) {
    throw new Error(`raakavienti vaatii kelvollisen erätunnuksen, sai: ${batchId}`);
  }
  return `${AMPARIN_KANSIO}/${RAAKA_ALIKANSIO}/${batchId}`;
}

/**
 * Saako maksullinen generointi alkaa? Palauttaa syyn merkkijonona, jos
 * ei saa, muuten null. Erotettu funktioksi, jotta testi voi kaataa
 * itsensä ilman API-avainta, ilman ffmpegiä ja ilman ämpäriä.
 */
export function raakavientiEste(liput) {
  if (liput?.kuiva) return null;
  if (!liput?.vienti) {
    return 'maksullinen generointi ei ole sallittu ilman raakavientiä: '
      + '--ei-vientia jättäisi mallin alkuperäisen tuotoksen vain ajajan levylle. '
      + 'Omistajan sääntö 14.9.2026 (Raamattu: ALKUPERÄISET ÄÄNITIEDOSTOT '
      + 'SÄILYTETÄÄN AINA) vaatii raakatiedoston ämpäriin ennen käsittelyä. '
      + 'Käytä --kuiva, jos haluat vain katsoa mitä ajettaisiin.';
  }
  return null;
}

/**
 * Tuotantokuitti: mikä raaka vastaa mitäkin valmista tehostetta.
 * Salaisuuksia ei oteta argumentiksi eikä siis voida kirjata.
 */
export function kokoaKuitti(laji, maara, {
  sourceCommit, batchId, tulokset = new Map(), status = 'planned',
}) {
  const tehoste = TEHOSTEET[laji];
  return {
    schemaVersion: KUITIN_VERSIO,
    batchId,
    sourceCommit,
    generationStatus: status,
    kind: laji,
    prompt: tehoste.prompt,
    promptSha256: sha256(tehoste.prompt),
    synthesis: { outputFormat: MUOTO, promptInfluence: PROMPTIN_PAINO },
    postprocess: {
      silenceTrim: true, targetLufs: TAVOITE_LUFS, lufsTolerance: LUFS_TOLERANSSI,
      fadeSeconds: HAIVYTYS_S, bitrateKbps: KOODAUS_KBPS,
    },
    variants: Array.from({ length: maara }, (_, i) => {
      const nimi = tehoste.tiedosto(i);
      const tulos = tulokset.get(nimi) ?? {};
      return {
        fileName: nimi,
        rawObjectKey: `${raakaAmpariKansio(batchId)}/raaka-${nimi}`,
        finalObjectKey: `${AMPARIN_KANSIO}/${nimi}`,
        status: tulos.status ?? 'planned',
        reason: tulos.reason ?? null,
        rawArtifact: tulos.rawArtifact ?? null,
        finalArtifact: tulos.finalArtifact ?? null,
      };
    }),
  };
}

/** Tiedoston tunnistetiedot kuittiin. */
function artefakti(polku, extra = {}) {
  return {
    sha256: sha256(readFileSync(polku)), bytes: statSync(polku).size, ...extra,
  };
}

// ── pääohjelma ─────────────────────────────────────────────────────

async function main() {
  const liput = tulkitseArgumentit(process.argv.slice(2));
  if (liput.virhe) {
    console.error(`${liput.virhe}.`);
    console.error('Käyttö: node tools/generoi-tehosteet.mjs --laji '
      + `${Object.keys(TEHOSTEET).join('|')} [--maara N] [--kuiva] [--ei-vientia]`);
    process.exit(1);
  }
  const tehoste = TEHOSTEET[liput.laji];
  const maara = varianttiMaara(liput.laji, liput.maara);

  /*
   * RAAKAVIENTI ON PAKOLLINEN. Tarkistus ennen kaikkea muuta — ennen
   * ffmpegin etsintää ja ennen yhtäkään maksullista kutsua.
   */
  const este = raakavientiEste(liput);
  if (este) {
    console.error(este);
    process.exit(1);
  }

  const sourceCommit = aja('git', ['-C', JUURI, 'rev-parse', 'HEAD'], { salliVirhe: true })
    .loki.trim() || '0'.repeat(40);
  const batchId = tuotantoEraId(liput.laji, maara, sourceCommit);
  const raakaKansioAmpari = raakaAmpariKansio(batchId);

  // Suunnitelma tulostetaan ENNEN ffmpeg-tarkistusta, jotta kuivan ajon
  // voi lukea myös ympäristössä, jossa ffmpegiä ei ole.
  console.log(`\nERÄ ${batchId} (commit ${sourceCommit.slice(0, 12)})`);
  console.log(`  ulostulomuoto mallilta: ${MUOTO}`);
  console.log(`  viimeistelyn koodaus: ${KOODAUS_KBPS} kbps `
    + '(320 kbps omistajan päätös 14.9.2026: uudelleenkoodaus on tehosteilla '
    + 'pakko tehdä normalisoinnin takia, joten se tehdään läpinäkyvästi).');
  console.log(`  taso ${TAVOITE_LUFS} LUFS (±${LUFS_TOLERANSSI}) — normalisointi säilyy.`);
  console.log(`  raakatuotokset menevät avaimeen ${raakaKansioAmpari}/ :`);
  for (let i = 0; i < maara; i += 1) {
    console.log(`    ${raakaKansioAmpari}/raaka-${tehoste.tiedosto(i)}`);
  }
  console.log(`  kuitti: ${AMPARIN_KANSIO}/${KUITTI_ALIKANSIO}/${batchId}.completed.json`);
  console.log('  raakavienti on pakollinen: --ei-vientia kaataa maksullisen ajon.');

  for (const komento of ['ffmpeg', 'ffprobe']) {
    if (!onOlemassa(komento)) {
      console.error(`${komento} puuttuu polusta — viimeistely tarvitsee sen.`);
      console.error('Asennus: apt-get install -y ffmpeg (ajossa tämä tehdään automaattisesti).');
      process.exit(1);
    }
  }

  const avain = process.env.ELEVEN_API_KEY ?? process.env.ELEVENLABS_API_KEY;
  if (!liput.kuiva && !avain) {
    console.error('ELEVEN_API_KEY puuttuu ympäristöstä — tehosteita ei voi generoida.');
    console.error('Kuivan ajon saa ilman avainta: --laji kohahdus --kuiva');
    process.exit(1);
  }

  const tyokansio = mkdtempSync(join(tmpdir(), 'tehosteet-'));
  let kohdekansio = tyokansio;
  let raakakansio = tyokansio;
  let kuittikansio = tyokansio;
  if (liput.kuiva) {
    console.log('KUIVA AJO (--kuiva) — APIa ei kutsuta, ämpäriin ei viedä.');
    console.log('ffmpeg-ketju ajetaan syntetisoidulla äänellä.');
  } else {
    // Ennen ensimmäistäkään maksullista kutsua: kohde ei saa olla repossa.
    kohdekansio = resolve(JUURI, KOHDE_KANSIO);
    raakakansio = resolve(JUURI, RAAKA_KANSIO);
    kuittikansio = resolve(JUURI, KUITTI_KANSIO);
    vaadiGitignore(kohdekansio);
    vaadiGitignore(raakakansio);
    vaadiGitignore(kuittikansio);
    mkdirSync(kohdekansio, { recursive: true });
    mkdirSync(raakakansio, { recursive: true });
    mkdirSync(kuittikansio, { recursive: true });
  }

  console.log(`\n── ${liput.laji}: ${maara} varianttia (${tehoste.kuvaus})`);
  console.log(`   kesto ${tehoste.kesto} s (hyväksytään ${tehoste.kestoMin}–`
    + `${tehoste.kestoMax} s), taso ${TAVOITE_LUFS} LUFS, muoto ${MUOTO}, `
    + `prompt_influence ${PROMPTIN_PAINO}`);
  console.log(`   prompti: ${tehoste.prompt}`);

  const valmiit = [];
  const raakatiedot = new Map();
  const tulokset = new Map();
  let virheita = 0;
  try {
    for (let i = 0; i < maara; i += 1) {
      const nimi = tehoste.tiedosto(i);
      const kohde = join(kohdekansio, nimi);
      const lahde = join(raakakansio, `raaka-${nimi}`);
      console.log(`\n   ${AMPARIN_KANSIO}/${nimi}`);

      if (liput.kuiva) {
        syntetisoiLahde(lahde, tehoste.kesto);
      } else {
        // eslint-disable-next-line no-await-in-loop
        const tavut = await haeApista(tehoste, avain, lahde);
        console.log(`   API: ${(tavut / 1024).toFixed(0)} kt → ${lahde}`);

        /*
         * RAAKA ÄMPÄRIIN ENNEN VIIMEISTELYÄ. Tämä on ainoa hetki, jolloin
         * mallin alkuperäinen tuotos on olemassa: viimeistely kirjoittaa
         * eri tiedostoon, ja ajon kansiot katoavat Actions-ajon mukana.
         * Vienti ennen viimeistelyä tarkoittaa myös, että HYLÄTYNKIN
         * variantin raaka säilyy — juuri siitä uusi leikkaus tehdään
         * ilmaiseksi ilman uutta maksullista kutsua.
         */
        vieAmpariin(lahde, `raaka-${nimi}`, raakaKansioAmpari);
        const luku = tarkistaJulkinen(`raaka-${nimi}`, raakaKansioAmpari);
        if (luku.koodi !== null && luku.koodi !== '200') {
          throw new Error(`raakatiedoston vienti epäonnistui (${luku.url} → HTTP `
            + `${luku.koodi}); ajoa ei jatketa, koska alkuperäinen katoaisi`);
        }
        raakatiedot.set(nimi, artefakti(lahde, {
          fileName: `raaka-${nimi}`,
          objectKey: `${raakaKansioAmpari}/raaka-${nimi}`,
          url: luku.url,
          actualDurationSeconds: Number(kestoSekunteina(lahde).toFixed(3)),
        }));
        console.log(`   raaka talteen: ${luku.url}`);
      }

      const { leikattu, mitattu, korjaus } = viimeistele(lahde, kohde, tyokansio);
      console.log(`   leikkaus: ${kestoSekunteina(lahde).toFixed(2)} s → `
        + `${leikattu.toFixed(2)} s, taso ${mitattu.taso.toFixed(1)} LUFS, `
        + `korjaus ${korjaus.toFixed(2)} dB`);

      const tulos = tarkista(kohde, tehoste);
      console.log(`   valmis: ${tulos.pituus.toFixed(2)} s, `
        + `${tulos.taso === null ? '?' : tulos.taso.toFixed(1)} LUFS → ${kohde}`);
      for (const varoitus of tulos.varoitukset) console.log(`   huom: ${varoitus}`);
      if (tulos.virheet.length) {
        for (const virhe of tulos.virheet) console.error(`   VIRHE: ${virhe}`);
        virheita += 1;
        // Kelvotonta varianttia ei viedä, mutta tiedosto jää levylle
        // kuunneltavaksi — kutsu on jo maksettu. Raaka on jo ämpärissä.
        tulokset.set(nimi, {
          status: 'validation-failed', reason: tulos.virheet.join('; '),
          rawArtifact: raakatiedot.get(nimi) ?? null,
          finalArtifact: artefakti(kohde, {
            fileName: nimi, actualDurationSeconds: Number(tulos.pituus.toFixed(3)),
          }),
        });
        continue;
      }
      tulokset.set(nimi, {
        status: 'generated', reason: null,
        rawArtifact: raakatiedot.get(nimi) ?? null,
        finalArtifact: artefakti(kohde, {
          fileName: nimi, actualDurationSeconds: Number(tulos.pituus.toFixed(3)),
        }),
      });
      valmiit.push(nimi);
    }

    if (!liput.kuiva && liput.vienti) {
      for (const nimi of valmiit) vieAmpariin(join(kohdekansio, nimi), nimi);
      /*
       * Kuitti VIIMEISENÄ ja aina: se on ainoa paikka, josta selviää,
       * mikä raaka vastaa mitäkin valmista tehostetta. Myös hylätyt
       * variantit ovat kuitissa, koska niiden raaka on ämpärissä.
       */
      const kuitti = kokoaKuitti(liput.laji, maara, {
        sourceCommit, batchId, tulokset,
        status: virheita ? 'completed-with-errors' : 'completed',
      });
      const kuittiPolku = join(kuittikansio, `${batchId}.completed.json`);
      writeFileSync(kuittiPolku, `${JSON.stringify(kuitti, null, 2)}\n`);
      vieAmpariin(kuittiPolku, `${batchId}.completed.json`,
        `${AMPARIN_KANSIO}/${KUITTI_ALIKANSIO}`, 'application/json');
      console.log(`\nKuitti: ${AMPARIN_KANSIO}/${KUITTI_ALIKANSIO}/${batchId}.completed.json`);
    }
  } finally {
    rmSync(tyokansio, { recursive: true, force: true });
  }

  console.log('');
  if (liput.kuiva) {
    console.log(`Kuiva ajo valmis: ffmpeg-ketju läpi ${valmiit.length}/${maara} variantilla.`);
    console.log('Mitään ei kutsuttu APIsta eikä viety ämpäriin.');
  } else if (!liput.vienti) {
    console.log('Vienti ohitettiin (--ei-vientia). Tiedostot:');
    for (const nimi of valmiit) console.log(`  ${join(kohdekansio, nimi)}`);
  } else {
    console.log('Julkiset osoitteet:');
    for (const nimi of valmiit) {
      const { url, koodi, pituus } = tarkistaJulkinen(nimi);
      const kunnossa = koodi === '200';
      if (!kunnossa) virheita += 1;
      console.log(`  ${url} → HTTP ${koodi ?? '?'}`
        + `${pituus ? `, ${(Number(pituus) / 1024).toFixed(0)} kt` : ''}`
        + `${kunnossa ? '' : '  ← EI VASTAA'}`);
    }
    console.log('');
    console.log('KUUNTELE variantit ennen kuin ne jäävät peliin: kohahduksen '
      + 'on oltava hillitty eivätkä variantit saa erottua toisistaan liikaa.');
  }
  process.exit(virheita ? 1 : 0);
}

if (process.argv[1] === TAMA) await main();
