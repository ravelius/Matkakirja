/*
 * LINSSIKUVIEN PIENET VERSIOT — 640 px WebP esilatausta varten.
 *
 * Omistajan havainto 3.9.2026: *"kaikki kuvat pitää ladata ennakkoon
 * taustalle ainakin tuossa pienemmässä koossa mikä näkyy linssin
 * animaation aikana. pitäisikö näille linssikuville generoida oma
 * pienempi versio, joka latautuisi nopeammin?"* — kyllä pitäisi.
 *
 * Aikajanalinssin ilmiökuvat ovat ämpärissä alkuperäisinä
 * (aikajana/keksinnot/<nimi>.jpg, 1536×1024, 400–760 kt kappale).
 * Linssin ilmiöpaneelissa kuva näkyy noin 450 px leveänä, joten
 * animaation ajaksi riittää murto-osa tavuista: 640 px leveä WebP on
 * ruudulla yhä terävä (2× tiheillä näytöillä paneelin leveys) mutta
 * painaa alle 90 kt. Iso alkuperäinen ladataan vasta, kun pelaaja
 * avaa jutun "Lue juttu" -napista.
 *
 *   node tools/tee-pienet-kuvat.mjs --kuiva
 *   node tools/tee-pienet-kuvat.mjs --vain 1769-watt
 *   node tools/tee-pienet-kuvat.mjs --ei-vientia
 *
 *   --kuiva          ei noutoa, ei ffmpegiä, ei vientiä: tulostaa
 *                    suunnitelman ja tarkistaa jokaisen alkuperäisen
 *                    osoitteen HEADilla. Tämä on ainoa tila, joka
 *                    toimii kehityskontissa — siellä ei ole ffmpegiä.
 *   --ei-vientia     tee pienet versiot levylle, mutta älä vie ämpäriin
 *   --vain <nimi>    yksi kuva (esim. 1769-watt tai 1769-watt.jpg)
 *
 * ------------------------------------------------------------------
 * LISTAA EI KOVAKOODATA
 * ------------------------------------------------------------------
 *
 * Kuvien osoitteet luetaan suoraan linssin datasta
 * (js/linssit/keksinnot.js, kentät `ilmio`, `ilmioLisa`, `kuva` ja
 * `kuvaToinen` — kaksi jälkimmäistä ovat keksijöiden generoidut
 * muotokuvat alikansiossa `muotokuva/`, 3.9.2026). Jokaisen pieni
 * versio menee saman alikansion `pieni/`-hakemistoon, joten
 * ilmiökuvat päätyvät kansioon `aikajana/keksinnot/pieni/` ja
 * muotokuvat kansioon `aikajana/keksinnot/muotokuva/pieni/`.
 * Kuvaputki lisää kuvia sitä mukaa kuin omistaja
 * hyväksyy ne, ja kovakoodattu lista jäisi jälkeen juuri silloin, kun
 * uusi kuva on tullut — tämä työkalu tekee aina pienet versiot niistä
 * kuvista, joita peli oikeasti pyytää. Kaikki `ilmio`-kentät eivät ole
 * generoituja: Commons-kuva kulkee `tiedosto`-kenttänä eikä sillä ole
 * `osoite`-kenttää, joten se rajautuu pois itsestään.
 *
 * ------------------------------------------------------------------
 * VIENTI JA REPO
 * ------------------------------------------------------------------
 *
 * Pieni versio EI mene repoon. Se kirjoitetaan media/-puolelle (joka on
 * .gitignoressa — tarkistetaan koneellisesti ennen kirjoitusta) ja
 * viedään sieltä ämpärin kansioon `aikajana/keksinnot/pieni/` samalla
 * `aws s3 cp` -komennolla, samoilla neljällä salaisuudella ja samalla
 * Cache-Controlilla kuin vie-kohtaamiskuvat.yml ja
 * tools/generoi-siirtymamusiikki.mjs. Raamatun linjaus on "kaikki aina
 * ämpäriin".
 *
 * Peilaus (peilaa.yml) synkkaa vain media/kuvat, media/liput ja
 * media/aanet, joten oma kansio ei sotke sitä.
 *
 * HUOM konttiympäristössä: Noden fetch ei lue ympäristön proxya ilman
 * NODE_USE_ENV_PROXY=1 (sama pätkä kuin generoi-siirtymamusiikki.mjs:ssä).
 */

import { spawnSync } from 'node:child_process';
import {
  mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const TAMA = fileURLToPath(import.meta.url);
const JUURI = resolve(dirname(TAMA), '..');

/*
 * Ilman lippua Noden fetch ei käytä HTTPS_PROXYa, ja nouto kaatuu
 * kontissa "Host not in allowlist" -virheeseen vaikka verkko on auki.
 * Ohitetaan moduulituonnissa (testit) — vain suoraan ajettu prosessi
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

// ── mitat ja rajat ─────────────────────────────────────────────────

/**
 * Pienen version leveys. Ilmiöpaneelin kuva on noin 450 px leveä
 * (js/aikajana.js kuvaTaiLaatta), joten 640 px kattaa myös 1,4×
 * tiheyden ilman että kuva pehmenee. Korkeus tulee suhteessa
 * (`scale=640:-2`), joten 1536×1024 → 640×426.
 */
export const LEVEYS = 640;
/** WebP-laatu. 78 on hyvin lähellä alkuperäistä eikä tuo lohkoja. */
export const LAATU = 78;
/**
 * Kokokatto. Esilatauksen koko idea on, että kaikki kuvat mahtuvat
 * taustalatauksena verkon läpi linssin animaation aikana: 26 kuvaa
 * á 90 kt on 2,3 Mt, kun alkuperäisinä sama olisi yli 14 Mt.
 */
export const MAKS_TAVUT = 90 * 1024;

/**
 * Ämpärin kansio pienille versioille ja sen peilipolku levyllä.
 *
 * Alkuperäisiä on kahdessa kansiossa: ilmiökuvat keksintökansion
 * juuressa ja keksijöiden muotokuvat sen alikansiossa `muotokuva/`
 * (3.9.2026). Pieni versio menee saman alikansion sisään
 * (`aikajana/keksinnot/muotokuva/pieni/`), jotta osoitteen saa yhä
 * suoraan alkuperäisestä eikä kahden nimen välillä tarvita listaa.
 */
/*
 * KARUSELLIKOKO JA VALMIIKSI SUMENNETTU (omistaja 3.9.2026: *"pyörisikö
 * alareunan kuvakaruselli paremmin, jos kuvat pienentäisi valmiiksi
 * tätä näkymää varten?"* ja *"kannattaisiko blurratut kuvat renderöidä
 * pieneen kokoon myös nopeutusta varten?"*). Muotokuvista (alikansio
 * muotokuva) tehdään pienen 640 px:n lisäksi kaksi versiota:
 *   karuselli/<runko>.webp  400 px leveä, terävä (kortti 2× tiheydellä)
 *   sumea/<runko>.webp      400 px leveä, gblur — tulevien korttien kuva
 * Kortit eivät silloin käytä CSS-suodatinta lainkaan (js/aikajana.js
 * asettele vaihtaa terävän ja sumean tiedoston).
 */
export const KARUSELLIN_LEVEYS = 400;
export const SUMENNUS_SIGMA = 2.6;
export const AMPARIN_KANSIO = 'aikajana/keksinnot/pieni';
/** Alkuperäisten kansio ämpärissä — pieni versio ei saa mennä sen päälle. */
const LAHTEEN_KANSIO = 'aikajana/keksinnot';
/** Pienen version ämpäriavain ja levypolku alikansion mukaan. */
const ampariAvain = (alikansio, runko) => `${LAHTEEN_KANSIO}/${alikansio ? `${alikansio}/` : ''}pieni/${runko}.webp`;
const kohdeKansio = (alikansio) => `media/${LAHTEEN_KANSIO}/${alikansio ? `${alikansio}/` : ''}pieni`;

// ── argumentit ─────────────────────────────────────────────────────

export function tulkitseArgumentit(argumentit) {
  const liput = { kuiva: false, vienti: true, vain: null };
  for (let i = 0; i < argumentit.length; i += 1) {
    const arg = argumentit[i];
    if (arg === '--kuiva') {
      liput.kuiva = true;
    } else if (arg === '--ei-vientia') {
      liput.vienti = false;
    } else if (arg === '--vain') {
      liput.vain = argumentit[i + 1] ?? null;
      i += 1;
      if (!liput.vain) return { ...liput, virhe: '--vain ilman arvoa' };
    } else {
      return { ...liput, virhe: `tuntematon argumentti: ${arg}` };
    }
  }
  return liput;
}

// ── kuvalista datasta ──────────────────────────────────────────────

/**
 * Osoitteesta tiedoston runko ja alikansio keksintökansion sisällä
 * (`''` = juuri, `'muotokuva'` = keksijöiden muotokuvat).
 *
 * Osoitteen on oltava ämpärin keksintökansiossa: jos kuvaputki joskus
 * osoittaisi muualle, pienen version polku menisi väärään paikkaan
 * hiljaa — parempi kaatua.
 */
export function runkoOsoitteesta(osoite) {
  let polku;
  try {
    polku = new URL(osoite).pathname;
  } catch {
    throw new Error(`osoite ei ole URL: ${osoite}`);
  }
  const jako = polku.split(`/${LAHTEEN_KANSIO}/`);
  if (jako.length !== 2) {
    throw new Error(`osoite ei ole kansiossa ${LAHTEEN_KANSIO}/: ${osoite}`);
  }
  const osat = decodeURIComponent(jako[1]).split('/');
  const nimi = osat.pop() ?? '';
  const alikansio = osat.join('/');
  if (alikansio === 'pieni' || osat.includes('pieni')) {
    throw new Error(`osoite osoittaa jo pieneen versioon: ${osoite}`);
  }
  const runko = nimi.replace(/\.[a-z0-9]+$/i, '');
  if (!runko || runko === nimi) throw new Error(`osoitteesta ei saa nimeä: ${osoite}`);
  return { runko, alikansio };
}

/**
 * Kaikki pienennettävät kuvat linssin datasta, järjestyksessä ja
 * kertaalleen. Neljä kenttää: `ilmio` on pysäkin oma ilmiökuva,
 * `ilmioLisa` sen toinen kuvakulma, ja `kuva`/`kuvaToinen` ovat
 * keksijöiden generoidut muotokuvat (kaksoispysäkillä kaksi).
 * Muotokuvat asuvat omassa alikansiossaan, ja pieni versio menee
 * saman alikansion `pieni/`-hakemistoon.
 */
export async function keraaKuvat() {
  const moduuli = await import(new URL('../js/linssit/keksinnot.js', import.meta.url).href);
  const tapahtumat = moduuli.KEKSINNOT ?? [];
  const kuvat = new Map();
  for (const tapahtuma of tapahtumat) {
    for (const kentta of ['ilmio', 'ilmioLisa', 'kuva', 'kuvaToinen']) {
      const osoite = tapahtuma[kentta]?.osoite;
      // Ulkoinen kuva (isoisän valokuva merkkipaalulla) asuu toisessa kansiossa eikä pienene tässä.
      if (!osoite || tapahtuma[kentta]?.ulkoinen) continue;
      const { runko, alikansio } = runkoOsoitteesta(osoite);
      const avain = ampariAvain(alikansio, runko);
      const vanha = kuvat.get(avain);
      if (vanha && vanha.lahde !== osoite) {
        throw new Error(`kaksi eri osoitetta samalla nimellä ${runko}: `
          + `${vanha.lahde} ja ${osoite}`);
      }
      if (vanha) { vanha.kentat.push(`${tapahtuma.vuosi} ${kentta}`); continue; }
      kuvat.set(avain, {
        runko,
        alikansio,
        lahde: osoite,
        tiedosto: `${runko}.webp`,
        kansio: kohdeKansio(alikansio),
        avain,
        kentat: [`${tapahtuma.vuosi} ${kentta}`],
      });
    }
  }
  return [...kuvat.values()];
}

/** --vain sietää sekä rungon että tiedostonimen päätteineen. */
/**
 * Muotokuvan lisäversiot karusellia varten (ks. KARUSELLIN_LEVEYS).
 * Muille kuville (ilmiökuvat) ei tehdä lisäversioita: ne näkyvät vain
 * paneelissa, johon pieni 640 px riittää.
 */
export function variantit(kuva) {
  if (kuva.alikansio !== 'muotokuva') return [];
  const kansio = `${LAHTEEN_KANSIO}/${kuva.alikansio}`;
  return [
    {
      nimi: 'karuselli', leveys: KARUSELLIN_LEVEYS, sumennus: 0,
      avain: `${kansio}/karuselli/${kuva.runko}.webp`,
      kansio: `media/${kansio}/karuselli`, tiedosto: `${kuva.runko}.webp`,
    },
    {
      nimi: 'sumea', leveys: KARUSELLIN_LEVEYS, sumennus: SUMENNUS_SIGMA,
      avain: `${kansio}/sumea/${kuva.runko}.webp`,
      kansio: `media/${kansio}/sumea`, tiedosto: `${kuva.runko}.webp`,
    },
  ];
}

export function suodata(kuvat, vain) {
  if (!vain) return kuvat;
  const haettu = vain.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  return kuvat.filter((kuva) => kuva.runko === haettu);
}

// ── apurit ─────────────────────────────────────────────────────────

function aja(komento, argumentit, { salliVirhe = false } = {}) {
  const ajo = spawnSync(komento, argumentit, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
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

/** Ämpärin julkinen juuri suoraan pelin omasta lähteestä. */
export function julkinenJuuri() {
  const media = readFileSync(resolve(JUURI, 'js/media.js'), 'utf8');
  const osuma = media.match(/const R2_JUURI = '([^']+)'/);
  if (!osuma) throw new Error('js/media.js: R2_JUURI ei löytynyt — päivitä tämä työkalu.');
  return osuma[1];
}

/** Kaatuu, jos polku ei ole .gitignoressa — mediaa ei viedä repoon. */
function vaadiGitignore(polku) {
  const ajo = spawnSync('git', ['-C', JUURI, 'check-ignore', '-q', polku], { encoding: 'utf8' });
  if (ajo.status !== 0) {
    throw new Error(`${polku} EI ole .gitignoressa — pieni versio menisi repoon. `
      + 'Media kuuluu ämpäriin (Raamattu: "kaikki aina ämpäriin").');
  }
}

/** Kuvan mitat ffprobella. */
function mitat(polku) {
  const { loki } = aja('ffprobe', [
    '-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height', '-of', 'csv=p=0:s=x', polku,
  ]);
  const [leveys, korkeus] = loki.trim().split('x').map(Number);
  if (!Number.isFinite(leveys) || !Number.isFinite(korkeus)) {
    throw new Error(`mittoja ei saatu: ${polku}`);
  }
  return { leveys, korkeus };
}

// ── ketjun vaiheet ─────────────────────────────────────────────────

/** HEAD alkuperäiseen: onko osoite olemassa ja mitä se painaa. */
async function paa(osoite) {
  try {
    const vastaus = await fetch(osoite, {
      method: 'HEAD', signal: AbortSignal.timeout(30000),
    });
    return {
      koodi: vastaus.status,
      tyyppi: vastaus.headers.get('content-type') ?? '',
      tavut: Number(vastaus.headers.get('content-length') ?? 0),
    };
  } catch (vika) {
    return { koodi: 0, tyyppi: '', tavut: 0, vika: vika.message };
  }
}

/** Alkuperäinen kuva levylle. */
async function nouda(osoite, kohde) {
  const vastaus = await fetch(osoite, { signal: AbortSignal.timeout(120000) });
  if (!vastaus.ok) throw new Error(`nouto HTTP ${vastaus.status}: ${osoite}`);
  const data = Buffer.from(await vastaus.arrayBuffer());
  writeFileSync(kohde, data);
  return data.length;
}

/**
 * Pienennys. `scale=640:-2` pitää kuvasuhteen ja pakottaa parillisen
 * korkeuden; libwebp koodaa lopun. `-frames:v 1` estää ffmpegiä
 * tekemästä animoitua WebPiä yhdestä ruudusta.
 */
function pienenna(lahde, kohde, { leveys = LEVEYS, sumennus = 0 } = {}) {
  const suodatin = `scale=${leveys}:-2:flags=lanczos${sumennus > 0 ? `,gblur=sigma=${sumennus}` : ''}`;
  aja('ffmpeg', [
    '-y', '-v', 'error', '-i', lahde,
    '-vf', suodatin,
    '-frames:v', '1',
    '-c:v', 'libwebp', '-preset', 'photo',
    '-quality', String(LAATU), '-compression_level', '6',
    kohde,
  ]);
}

/** Valmiin pienen version tarkistukset: leveys ja koko. */
function tarkista(kohde, odotettuLeveys = LEVEYS) {
  const { leveys, korkeus } = mitat(kohde);
  const tavut = statSync(kohde).size;
  const virheet = [];
  if (leveys !== odotettuLeveys) virheet.push(`leveys ${leveys} px, odotettiin ${odotettuLeveys}`);
  if (tavut > MAKS_TAVUT) {
    virheet.push(`koko ${(tavut / 1024).toFixed(0)} kt ylittää katon `
      + `${(MAKS_TAVUT / 1024).toFixed(0)} kt`);
  }
  return {
    leveys, korkeus, tavut, virheet,
  };
}

/** Vie pieni versio ämpäriin (sama komento kuin muissa vienneissä). */
function vieAmpariin(kohde, avain) {
  const tili = process.env.R2_ACCOUNT_ID;
  const ampari = process.env.R2_BUCKET;
  const paasy = process.env.AWS_ACCESS_KEY_ID ?? process.env.R2_ACCESS_KEY_ID;
  const salaisuus = process.env.AWS_SECRET_ACCESS_KEY ?? process.env.R2_SECRET_ACCESS_KEY;
  const puuttuu = [
    !tili && 'R2_ACCOUNT_ID', !ampari && 'R2_BUCKET',
    !paasy && 'R2_ACCESS_KEY_ID', !salaisuus && 'R2_SECRET_ACCESS_KEY',
  ].filter(Boolean);
  if (puuttuu.length) throw new Error(`vienti ei onnistu, puuttuu: ${puuttuu.join(', ')}`);
  if (!onOlemassa('aws')) throw new Error('aws-cli puuttuu — vienti tarvitsee sen.');

  aja('aws', [
    's3', 'cp', kohde, `s3://${ampari}/${avain}`,
    '--endpoint-url', `https://${tili}.r2.cloudflarestorage.com`,
    '--no-progress',
    '--content-type', 'image/webp',
    '--cache-control', 'public, max-age=2592000',
  ]);
}

/** HEAD julkiseen osoitteeseen: näkyykö pieni versio oikeasti ämpäristä. */
async function tarkistaJulkinen(avain) {
  const url = `${julkinenJuuri()}${avain}`;
  const { koodi, tyyppi, tavut } = await paa(url);
  return {
    url, koodi, tyyppi, tavut,
  };
}

// ── pääohjelma ─────────────────────────────────────────────────────

async function main() {
  const liput = tulkitseArgumentit(process.argv.slice(2));
  if (liput.virhe) {
    console.error(`${liput.virhe}.`);
    console.error('Käyttö: node tools/tee-pienet-kuvat.mjs [--kuiva] [--ei-vientia] '
      + '[--vain <nimi>]');
    process.exit(1);
  }

  const kaikki = await keraaKuvat();
  const kuvat = suodata(kaikki, liput.vain);
  if (!kuvat.length) {
    console.error(liput.vain
      ? `--vain ${liput.vain}: ei löydy linssin datasta (${kaikki.length} kuvaa tunnetaan).`
      : 'js/linssit/keksinnot.js: yhdelläkään pysäkillä ei ole ilmio.osoite-kenttää.');
    process.exit(1);
  }

  console.log(`Pienet versiot: ${kuvat.length}/${kaikki.length} kuvaa `
    + '(js/linssit/keksinnot.js, kentät ilmio, ilmioLisa, kuva ja kuvaToinen)');
  console.log(`Mitat: leveys ${LEVEYS} px, korkeus suhteessa, WebP laatu ${LAATU}, `
    + `katto ${(MAKS_TAVUT / 1024).toFixed(0)} kt`);
  console.log(`Kohde: ämpärin ${AMPARIN_KANSIO}/<nimi>.webp ja `
    + `${LAHTEEN_KANSIO}/muotokuva/pieni/<nimi>.webp`);
  console.log('');

  let virheita = 0;

  if (liput.kuiva) {
    console.log('KUIVA AJO (--kuiva) — ei noutoa, ei ffmpegiä, ei vientiä.');
    console.log('Tarkistetaan vain, että jokainen alkuperäinen vastaa HEADiin.');
    console.log('');
    for (const kuva of kuvat) {
      // eslint-disable-next-line no-await-in-loop
      const { koodi, tyyppi, tavut } = await paa(kuva.lahde);
      const kunnossa = koodi === 200 && tyyppi.startsWith('image/');
      if (!kunnossa) virheita += 1;
      console.log(`  ${kuva.lahde}`);
      console.log(`    → ${kuva.avain}  [${kuva.kentat.join(', ')}]`);
      console.log(`    HEAD ${koodi || '—'}${tyyppi ? `, ${tyyppi}` : ''}`
        + `${tavut ? `, ${(tavut / 1024).toFixed(0)} kt` : ''}`
        + `${kunnossa ? '' : '  ← EI VASTAA'}`);
    }
    console.log('');
    console.log(`Kuiva ajo valmis: ${kuvat.length - virheita}/${kuvat.length} osoitetta vastasi.`);
    console.log('Mitään ei noudettu eikä viety ämpäriin.');
    process.exit(virheita ? 1 : 0);
  }

  for (const komento of ['ffmpeg', 'ffprobe']) {
    if (!onOlemassa(komento)) {
      console.error(`${komento} puuttuu polusta — pienennys tarvitsee sen.`);
      console.error('Kehityskontissa ffmpegiä ei ole: aja --kuiva täällä ja '
        + 'oikea ajo Actionsissa (.github/workflows/tee-pienet-kuvat.yml).');
      process.exit(1);
    }
  }

  // Ennen ensimmäistäkään kirjoitusta: kohde ei saa olla repossa.
  for (const kansio of new Set(kuvat.map((kuva) => kuva.kansio))) {
    const polku = resolve(JUURI, kansio);
    vaadiGitignore(polku);
    mkdirSync(polku, { recursive: true });
  }

  const tyokansio = mkdtempSync(join(tmpdir(), 'pienet-kuvat-'));
  const valmiit = [];
  try {
    for (const kuva of kuvat) {
      const lahde = join(tyokansio, `alkuperainen-${kuva.runko}`);
      const kohde = join(resolve(JUURI, kuva.kansio), kuva.tiedosto);
      console.log(`── ${kuva.runko}  [${kuva.kentat.join(', ')}]`);
      // eslint-disable-next-line no-await-in-loop
      const tavut = await nouda(kuva.lahde, lahde);
      const alku = mitat(lahde);
      console.log(`   alkuperäinen: ${alku.leveys}×${alku.korkeus}, `
        + `${(tavut / 1024).toFixed(0)} kt`);

      pienenna(lahde, kohde);
      const tulos = tarkista(kohde);
      console.log(`   pieni: ${tulos.leveys}×${tulos.korkeus}, `
        + `${(tulos.tavut / 1024).toFixed(0)} kt `
        + `(${(100 - (tulos.tavut / tavut) * 100).toFixed(0)} % pienempi) → ${kohde}`);
      if (tulos.virheet.length) {
        for (const virhe of tulos.virheet) console.error(`   VIRHE: ${virhe}`);
        virheita += 1;
        continue;
      }
      // Karusellin versiot muotokuvista: terävä ja valmiiksi sumennettu.
      let variantitKunnossa = true;
      for (const v of variantit(kuva)) {
        mkdirSync(resolve(JUURI, v.kansio), { recursive: true });
        vaadiGitignore(v.kansio);
        const vKohde = join(resolve(JUURI, v.kansio), v.tiedosto);
        pienenna(lahde, vKohde, { leveys: v.leveys, sumennus: v.sumennus });
        const vTulos = tarkista(vKohde, v.leveys);
        console.log(`   ${v.nimi}: ${vTulos.leveys}×${vTulos.korkeus}, `
          + `${(vTulos.tavut / 1024).toFixed(0)} kt → ${vKohde}`);
        if (vTulos.virheet.length) {
          for (const virhe of vTulos.virheet) console.error(`   VIRHE (${v.nimi}): ${virhe}`);
          variantitKunnossa = false;
        }
      }
      if (!variantitKunnossa) { virheita += 1; continue; }
      valmiit.push(kuva);
    }

    if (liput.vienti) {
      for (const kuva of valmiit) {
        vieAmpariin(join(resolve(JUURI, kuva.kansio), kuva.tiedosto), kuva.avain);
        for (const v of variantit(kuva)) {
          vieAmpariin(join(resolve(JUURI, v.kansio), v.tiedosto), v.avain);
        }
      }
    }
  } finally {
    rmSync(tyokansio, { recursive: true, force: true });
  }

  console.log('');
  if (!liput.vienti) {
    console.log('Vienti ohitettiin (--ei-vientia). Tiedostot:');
    for (const kuva of valmiit) console.log(`  ${join(resolve(JUURI, kuva.kansio), kuva.tiedosto)}`);
  } else {
    console.log('Julkiset osoitteet:');
    for (const kuva of valmiit.flatMap((k) => [k, ...variantit(k)])) {
      // eslint-disable-next-line no-await-in-loop
      const { url, koodi, tavut } = await tarkistaJulkinen(kuva.avain);
      const kunnossa = koodi === 200;
      if (!kunnossa) virheita += 1;
      console.log(`  ${url} → HTTP ${koodi || '—'}`
        + `${tavut ? `, ${(tavut / 1024).toFixed(0)} kt` : ''}`
        + `${kunnossa ? '' : '  ← EI VASTAA'}`);
    }
  }
  process.exit(virheita ? 1 : 0);
}

if (process.argv[1] === TAMA) await main();
