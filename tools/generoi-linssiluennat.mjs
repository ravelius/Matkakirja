/*
 * LINSSILUENNAT — kertoja lukee jokaisen keksinnön ääneen.
 *
 * Omistajan tilaus 4.9.2026, sanatarkasti: *"Generoi selostajan
 * äänellä jokaiseen kohtaan vuosiluku, keksijän nimi ja keksintö, eli
 * se tulisi aina Keksinnön vaihtoessa lukijan äänellä."*
 *
 *   node tools/generoi-linssiluennat.mjs --kuiva
 *   node tools/generoi-linssiluennat.mjs --pysakit 1769,1783
 *   node tools/generoi-linssiluennat.mjs --pysakit esittely,valinaytos
 *   node tools/generoi-linssiluennat.mjs            (koko kaari)
 *   node tools/generoi-linssiluennat.mjs --linssi ihmisen-matka --kuiva
 *
 *   --kuiva          tulostaa tekstit ja kohteet, ei kutsu APIa
 *   --linssi <tunnus>  mikä aikajanakaari luetaan (oletus `keksinnot`;
 *                    ks. LINSSIT alempana). Kaari kertoo itse sekä
 *                    luettavan tekstin että ämpärin kansion.
 *   --pysakit 1769,1783   vain nämä vuodet (tyhjä = kaikki). HUOM:
 *                    kaaressa on KOLME vuoden 1895 pysäkkiä (Marconi,
 *                    Röntgen, Lumière), ja vuosi valitsee ne kaikki.
 *                    "Vuotta sitten" -kaarella pysäkki valitaan
 *                    TUNNUKSELLA (`--pysakit jebel-irhoud`), koska
 *                    vuosilukuja ei ole. Sama lippu ottaa KAAREN OMAT
 *                    PUHEET avaimina: `esittely` (avausjakson selite),
 *                    `valinaytos` (merkkipaalun kertojateksti) ja
 *                    `loppu` (loppusanat, jos kaari pyytää ne).
 *   --pakota         generoi vaikka tiedosto on jo ämpärissä
 *   --ei-vientia     generoi ja viimeistele, mutta jätä levylle
 *
 * ------------------------------------------------------------------
 * RESEPTI ON SAMA KUIN MUILLA KERTOJAN LUENNOILLA
 * ------------------------------------------------------------------
 *
 * Ääni "Viisas Kertoja", malli eleven_v3, /v1/text-to-dialogue,
 * mp3_44100_128 — tasan kuten tools/generoi-luennat.mjs. Sama ääni
 * kuin isoisän matkakirjamerkinnöissä, koska kertoja on sama.
 *
 * TEKSTI TULEE DATASTA, EI TÄSTÄ TIEDOSTOSTA. Luettava muoto on
 * "<vuosi>. <henkilö>. <keksintö>." ja se ladotaan js/linssipuhe.js:n
 * funktiolla — samalla, jota peli käyttää. Pisteiden kohdalle tulee
 * break-tagi, jottei vuosiluku, nimi ja keksintö sula yhdeksi pötköksi
 * (eleven_v3 tukee <break time="0.4s" />).
 *
 * KAKSI KAARTA, SAMA KONE (Fablen ohje 6.9.2026). "Vuotta sitten"
 * -kaarella (Ihmisen matka) ei ole vuosilukua eikä keksijää, joten
 * sama funktio ladotaan aika- ja paikkatiedosta: "Noin 300 000 vuotta
 * sitten. Kasvot, jotka tunnistaisi — Jebel Irhoud, Marokko." Yksi
 * lyhyt lause pysäkkiä kohti — luenta soi kortin vaihtuessa, ja
 * pidempi teksti jäisi seuraavan pysäkin alle. Kaaren omat puheet
 * (esittely, loppusanat) luetaan sen sijaan LYHENTÄMÄTTÄ.
 *
 * ------------------------------------------------------------------
 * TIEDOSTONIMI ON KYTKENTÄ
 * ------------------------------------------------------------------
 *
 * Runko on MUOTOKUVAN runko (js/linssipuhe.js luennanRunko): pysäkin
 * `kuva.osoite`-tiedostonimi ilman päätettä. Vuosi yksin ei kelpaisi —
 * vuodella 1895 on kolme pysäkkiä. Merkkipaalun (1873) runko ladotaan
 * aina vuodesta ja otsikosta (1873-matkakirjan-vuosi), vaikka paalu
 * saisi oman muotokuvan. Peli lukee saman funktion, joten nimi ei voi
 * eriytyä kutsujan muistiin.
 *
 * KAAREN OMAT PUHEET (js/linssipuhe.js kaarenPuheet) noudattavat samaa
 * sääntöä omilla rungoillaan: avausjakson esittely on `esittely` ja
 * merkkipaalun välinäytös `valinaytos-<vuosi>`. Ne ovat pitkää proosaa
 * eivätkä kolmen sanan riviä, joten break-tageja ei ladota — lauseet
 * kantavat oman rytminsä.
 *
 * ------------------------------------------------------------------
 * TASO: −17 LUFS (kertojan taso, ei tehosteen)
 * ------------------------------------------------------------------
 *
 * Tehosteet ovat −30 LUFS (tools/generoi-tehosteet.mjs), mutta se on
 * TAUSTALLA soivan efektin taso. Kertojan luennat ovat aivan toisella
 * tasolla: ämpärissä olevat äänitteet mitattiin 4.9.2026
 * (intro-puhe.mp3 −17,1 · puhe-lento-alku.mp3 −17,4 ·
 * puhe-fokus-matkakirja-lontoo.mp3 −17,1 LUFS), ja linssiluenta
 * sovitetaan samaan perheeseen. Muuten sama kertoja kuulostaisi
 * linssissä kuiskaukselta, koska peli soittaa senkin puheVoima()-
 * tasolla (js/linssipuhe.js).
 *
 * Normalisointi on kaksivaiheinen kuten tehosteilla: ensin MITATAAN
 * (loudnorm print_format=json), sitten korjataan yhdellä lineaarisella
 * volume=…dB -vahvistuksella. Dynaaminen loudnorm tasoittaisi puheen
 * omat painotukset.
 *
 * HÄNTÄ: hiljaisuus leikataan molemmista päistä (sama suodatin kuin
 * tehosteilla) ja loppuun palautetaan 150 ms hiljaisuutta, jottei
 * viimeinen sana katkea soittimen pysäytykseen.
 *
 * ------------------------------------------------------------------
 * VIENTI JA REPO
 * ------------------------------------------------------------------
 *
 * Valmiit mp3:t EIVÄT mene repoon. Ne kirjoitetaan media/-puolelle
 * (.gitignoressa, tarkistetaan ennen ensimmäistäkään maksullista
 * kutsua) ja viedään ämpäriin samalla aws s3 cp -komennolla ja
 * samoilla neljällä salaisuudella kuin tools/generoi-tehosteet.mjs ja
 * vie-aanet.yml. TÄMÄ TYÖKALU VIE ITSE — ajo ei committoi mitään.
 *
 * KANSIO TULEE KAARESTA eikä tästä tiedostosta: keksinnöillä
 * aikajana/keksinnot/puhe/ (js/linssipuhe.js LINSSILUENTA_JUURI),
 * Ihmisen matkalla aikajana/ihmisen-matka/puhe/ (linssin
 * `aikajana.luentajuuri`). Peli hakee tasan saman polun, joten
 * luennat ovat pelissä heti ajon jälkeen ilman julkaisua.
 *
 * JO OLEMASSA OLEVAA EI GENEROIDA UUDELLEEN: ennen kutsua tehdään HEAD
 * julkiseen osoitteeseen, ja 200 ohittaa pysäkin. --pakota kirjoittaa
 * yli. Näin uuden pysäkin lisääminen kaareen maksaa yhden kutsun eikä
 * kahtakymmentäkuutta.
 *
 * API-avain luetaan VAIN ympäristöstä (ELEVEN_API_KEY) eikä sitä
 * tulosteta koskaan. HUOM konttiympäristössä: Noden fetch ei käytä
 * ympäristön proxyä ilman NODE_USE_ENV_PROXY=1 — työkalu käynnistää
 * itsensä uudelleen lipun kanssa, kuten generoi-tehosteet.mjs.
 */

import { spawnSync } from 'node:child_process';
import {
  mkdirSync, mkdtempSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  KAAREN_AVAIMET, kaarenPuheet, luennanPuhe, luennanRunko, luennanTeksti, luennanTiedosto, puheeksi,
} from '../js/linssipuhe.js';
import { leikkaaHiljaisuusSuodatin } from './generoi-tehosteet.mjs';
import { julkinenJuuri, tulkitseEbur128, tulkitseLoudnorm } from './generoi-siirtymamusiikki.mjs';

const TAMA = fileURLToPath(import.meta.url);
const JUURI = resolve(dirname(TAMA), '..');

/*
 * Sama vartija kuin tehostetyökalussa: ilman lippua Noden fetch ei lue
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

const OSOITE = 'https://api.elevenlabs.io/v1/text-to-dialogue?output_format=mp3_44100_128';
const AANI = 'Sz0tRTEpybtDJ9ru2kgD'; // Viisas Kertoja
const MALLI = 'eleven_v3';
/*
 * Stability kävi arvossa 0,4, mutta palautettiin 0,5:een omistajan
 * palautteesta 7.8.2026: *"äänen vaihteluarvoa kannattaa ottaa
 * takaisinpäin, hyppii vähän liikaa"*. Sama arvo kuin
 * tools/generoi-luennat.mjs:ssä — kertoja on sama.
 */
const STABILITY = 0.5;
/*
 * Lopputauko (omistajan havainto 8.8.2026: tiedosto leikkautuu heti
 * viimeisen sanan perään ja loppuun jää naksahdus). Break-tagi pyytää
 * mallilta hiljaisuutta, jonka ffmpeg leikkaa naksun kanssa pois.
 */
const LOPPUTAUKO = ' <break time="1.0s" />';

// ── kaaret ─────────────────────────────────────────────────────────

/**
 * MITKÄ KAARET OVAT AJETTAVISSA. Moduuli ladataan vasta valinnan
 * jälkeen (dynaaminen import), jotta väärä tunnus kaatuu selvään
 * virheeseen eikä puuttuvaan vientiin — ja jotta toisen kaaren
 * keskeneräinen aineisto ei estä tämän ajamista.
 */
export const LINSSIT = {
  keksinnot: '../js/linssit/keksinnot.js',
  'ihmisen-matka': '../js/linssit/ihmisen-matka.js',
};

/** Oletuskaari: keksinnöt, eli työkalun entinen ainoa käytös. */
export const OLETUSLINSSI = 'keksinnot';

/** Ämpärin kansio = pelin hakupolku (js/linssipuhe.js LINSSILUENTA_JUURI). */
const KEKSINTOJEN_KANSIO = 'aikajana/keksinnot/puhe';

/**
 * Kaaren luentakansio ämpärissä. Kaari kertoo sen itse
 * (`aikajana.luentajuuri` on koko osoite ämpärin juuresta lähtien),
 * ja tässä siitä leikataan julkinen juuri pois — sama merkkijono, jota
 * peli hakee. Ilman kenttää keksintöjen kansio, kuten ennen.
 */
export function ampariKansio(kaari) {
  const juuri = kaari?.luentajuuri;
  if (typeof juuri !== 'string' || !juuri) return KEKSINTOJEN_KANSIO;
  const julkinen = julkinenJuuri();
  const polku = juuri.startsWith(julkinen) ? juuri.slice(julkinen.length) : juuri;
  return polku.replace(/^\/+|\/+$/g, '');
}

// ── kansiot ────────────────────────────────────────────────────────

const KOHDE_KANSIO = 'media/linssiluennat';
/** Mallin raaka tuotos talteen: uuden leikkauksen voi tehdä ilmaiseksi. */
const RAAKA_KANSIO = 'media/linssiluennat-raaka';

// ── vaatimukset ────────────────────────────────────────────────────

/** Kertojan taso: sama perhe kuin ämpärin muut luennat (ks. otsikko). */
const TAVOITE_LUFS = -17;
/** Mp3-koodaus ja purku siirtävät mitattua tasoa vajaan puoli LU. */
const LUFS_TOLERANSSI = 1.5;
/** Häivytykset päihin: naksahdukseton alku ja loppu ilman kuuluvaa fadea. */
const HAIVYTYS_S = 0.03;
/** Hiljaisuutta loppuun, jottei viimeinen sana katkea pysäytykseen. */
const HANNAN_PADDING_S = 0.15;
/** Kolme sanaa kestää sekunteja, ei minuutteja — selvä hälytysraja. */
const KESTO_MIN_S = 1.0;
const KESTO_MAX_S = 14.0;
/**
 * KAAREN OMAT PUHEET ovat kokonaisia kappaleita eivätkä kolmen sanan
 * rivejä: esittely on noin puoli minuuttia ja välinäytös vajaan.
 * Yläraja on silti olemassa — se erottaa pitkän tekstin siitä, että
 * malli on jäänyt jauhamaan.
 */
const KAAREN_KESTO_MAX_S = 50.0;

// ── argumentit ─────────────────────────────────────────────────────

/** Komentoriviliput. Palauttaa `{ virhe }`, jos syöte ei kelpaa. */
export function tulkitseArgumentit(argumentit) {
  const liput = {
    linssi: OLETUSLINSSI, pysakit: [], kuiva: false, pakota: false, vienti: true,
  };
  for (let i = 0; i < argumentit.length; i += 1) {
    const arg = argumentit[i];
    if (arg === '--linssi') {
      const nimi = argumentit[i + 1];
      if (!nimi || String(nimi).startsWith('--')) return { ...liput, virhe: '--linssi ilman tunnusta' };
      if (!LINSSIT[nimi]) {
        return {
          ...liput,
          virhe: `tuntematon linssi: ${nimi} (${Object.keys(LINSSIT).join(', ')})`,
        };
      }
      liput.linssi = nimi;
      i += 1;
    } else if (arg === '--pysakit') {
      /*
       * PILKKU TAI VÄLILYÖNTI, KUMPI TAHANSA. Sama sietokyky kuin
       * generoi-luennat.mjs:n kaupunkilistalla (ajo 33277398508,
       * 29.8.2026: pilkullinen lista meni läpi yhtenä avaimena ja ajo
       * kaatui vasta lopussa). Välilyönnillinen lista on shellissä jo
       * hajonnut moneksi argumentiksi, joten lipun perästä kerätään
       * KAIKKI vuosilta näyttävät palat — ei vain seuraavaa.
       */
      const palat = [];
      while (i + 1 < argumentit.length && !String(argumentit[i + 1]).startsWith('--')) {
        i += 1;
        palat.push(argumentit[i]);
      }
      if (!palat.length) return { ...liput, virhe: '--pysakit ilman vuosia' };
      const valinnat = palat.join(',').split(/[,\s]+/).map((pala) => pala.trim()).filter(Boolean);
      for (const valinta of valinnat) {
        if (/^\d{3,4}$/.test(valinta)) {
          liput.pysakit.push(Number(valinta));
          continue;
        }
        /*
         * KAAREN OMAT PUHEET OVAT SAMASSA LIPUSSA: `esittely` on
         * avausjakson selite, `valinaytos` merkkipaalujen pidemmät
         * kertojatekstit ja `loppu` loppusanat (js/linssipuhe.js
         * kaarenPuheet). Vuosi ei kelpaisi valitsimeksi millekään —
         * esittely ei ole yhdessä vuodessa, ja välinäytös jakaa
         * vuotensa pysäkin kanssa.
         *
         * MUU MERKKIJONO ON PYSÄKIN TUNNUS ("vuotta sitten" -kaari,
         * jolla ei ole vuosilukuja). Kirjoitusvirhe ei mene ohi: se
         * kaatuu heti valitsePysakit-tarkistukseen "näitä ei ole
         * kaaressa" eikä maksa yhtäkään kutsua.
         */
        liput.pysakit.push(valinta);
      }
    } else if (arg === '--kuiva') {
      liput.kuiva = true;
    } else if (arg === '--pakota') {
      liput.pakota = true;
    } else if (arg === '--ei-vientia') {
      liput.vienti = false;
    } else {
      return { ...liput, virhe: `tuntematon argumentti: ${arg}` };
    }
  }
  return liput;
}

/**
 * Ajettavat työt valinnan mukaan. Tyhjä valinta = KOKO KAARI: kaikki
 * pysäkit sekä kaaren omat puheet (esittely ja välinäytökset).
 *
 * Valinta on sekalista: vuosiluvut poimivat pysäkit, avaimet
 * (`esittely`, `valinaytos`) kaaren omat puheet. Palauttaa
 * `{ tyot, tuntemattomat }`, jotta väärä valinta huomataan ennen
 * ensimmäistäkään maksullista kutsua eikä vasta hiljaisuutena.
 *
 * @param {object} kaari linssin `aikajana`-lohko
 * @param {Array<number|string>} valinta
 */
export function valitsePysakit(kaari, valinta = []) {
  const vuodet = valinta.filter((v) => typeof v === 'number');
  const avaimet = valinta.filter((v) => typeof v === 'string');
  const kaikki = !valinta.length;
  const tyot = [];
  for (const t of kaari?.tapahtumat ?? []) {
    // Pysäkin valitsin on vuosiluku tai tunnus (ks. tulkitseArgumentit).
    const valittu = kaikki || vuodet.includes(t.vuosi)
      || (t.tunnus && avaimet.includes(t.tunnus));
    if (!valittu) continue;
    const nimi = luennanTiedosto(t);
    if (!nimi) continue;
    tyot.push({
      vuosi: t.vuosi ?? null,
      avain: t.tunnus ?? String(t.vuosi),
      runko: luennanRunko(t),
      nimi,
      teksti: luennanTeksti(t),
      puhe: luennanPuhe(t),
    });
  }
  /*
   * KAAREN OMAT PUHEET ovat pitkää proosaa eivätkä kolmen sanan
   * riviä: niihin ei ladota break-tageja, vaan lauseet kantavat oman
   * rytminsä. Malli saa siis tekstin sellaisenaan.
   */
  for (const puhe of kaarenPuheet(kaari)) {
    if (!kaikki && !avaimet.includes(puhe.avain)) continue;
    tyot.push({
      vuosi: null,
      avain: puhe.avain,
      runko: puhe.runko,
      nimi: puhe.nimi,
      teksti: puhe.teksti,
      // Vuosiluvut sanoina mallille (js/linssipuhe.js puheeksi).
      puhe: puheeksi(puhe.teksti),
    });
  }
  const loydetyt = new Set(tyot.map((tyo) => tyo.vuosi));
  const avainLoydot = new Set(tyot.map((tyo) => tyo.avain));
  return {
    tyot,
    tuntemattomat: [
      ...vuodet.filter((v) => !loydetyt.has(v)),
      ...avaimet.filter((a) => !avainLoydot.has(a)),
    ],
  };
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
    throw new Error(`${polku} EI ole .gitignoressa — valmis luenta menisi repoon. `
      + 'Media kuuluu ämpäriin (Raamattu: "kaikki aina ämpäriin").');
  }
}

/** Luennan julkinen osoite ämpärissä. */
function julkinenOsoite(nimi, kansio) {
  return `${julkinenJuuri()}${kansio}/${nimi}`;
}

/** HEAD julkiseen osoitteeseen: onko luenta jo ämpärissä. */
function ampariHead(nimi, kansio) {
  const url = julkinenOsoite(nimi, kansio);
  if (!onOlemassa('curl')) return { url, koodi: null };
  const { loki } = aja('curl', ['-sS', '-I', '--max-time', '30', url], { salliVirhe: true });
  return { url, koodi: loki.match(/HTTP\/[\d.]+ (\d{3})/)?.[1] ?? null };
}

// ── ketjun vaiheet ─────────────────────────────────────────────────

/** Yksi maksullinen kutsu: yksi luenta levylle. */
async function haeApista(puhe, avain, kohde) {
  const vastaus = await fetch(OSOITE, {
    method: 'POST',
    headers: { 'xi-api-key': avain, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      inputs: [{ text: puhe + LOPPUTAUKO, voice_id: AANI }],
      model_id: MALLI,
      settings: { stability: STABILITY },
    }),
    signal: AbortSignal.timeout(180000),
  });
  if (!vastaus.ok) {
    // Virherunko näkyviin (avain ei ole siinä): muodon muutokset selviävät siitä.
    throw new Error(`HTTP ${vastaus.status}: ${(await vastaus.text()).slice(0, 400)}`);
  }
  const data = Buffer.from(await vastaus.arrayBuffer());
  writeFileSync(kohde, data);
  return data.length;
}

/**
 * Häivytykset päihin, tason korjaus yhtenä lineaarisena vahvistuksena
 * ja hiljainen häntä. `kesto` on leikatun äänen pituus sekunteina.
 */
export function viimeistelySuodatin({
  kesto, korjausDb, haivytys = HAIVYTYS_S, padding = HANNAN_PADDING_S,
}) {
  if (!(kesto > 0)) throw new Error('keston pitää olla positiivinen');
  const h = Math.min(haivytys, kesto / 4);
  const ulosAlkaa = Math.max(0, kesto - h);
  return [
    `afade=t=in:st=0:d=${h.toFixed(3)}`,
    `afade=t=out:st=${ulosAlkaa.toFixed(3)}:d=${h.toFixed(3)}`,
    `volume=${korjausDb.toFixed(2)}dB`,
    `apad=pad_dur=${padding.toFixed(3)}`,
  ].join(',');
}

/** Leikkaa hiljaisuus, normalisoi taso, palauta 150 ms häntä ja koodaa mp3. */
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
    '-ac', '1', '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', '128k', kohde,
  ]);
  return { leikattu, mitattu, korjaus };
}

/** Valmiin luennan tarkistukset: kesto ja taso. */
function tarkista(kohde, kestoMax = KESTO_MAX_S) {
  const pituus = kestoSekunteina(kohde);
  const taso = tulkitseEbur128(aja('ffmpeg', [
    '-hide_banner', '-v', 'info', '-i', kohde, '-af', 'ebur128=peak=true',
    '-f', 'null', '-',
  ]).loki);
  const virheet = [];
  if (pituus < KESTO_MIN_S || pituus > kestoMax) {
    virheet.push(`kesto ${pituus.toFixed(2)} s ei ole välillä ${KESTO_MIN_S}–${kestoMax} s`);
  }
  if (taso === null) {
    virheet.push('tasoa ei saatu mitattua (ebur128)');
  } else if (Math.abs(taso - TAVOITE_LUFS) > LUFS_TOLERANSSI) {
    virheet.push(`taso ${taso.toFixed(1)} LUFS, tavoite ${TAVOITE_LUFS} (±${LUFS_TOLERANSSI})`);
  }
  return { pituus, taso, virheet };
}

/** Vie valmis luenta ämpäriin (sama komento kuin vie-aanet.yml). */
function vieAmpariin(kohde, nimi, kansio) {
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
    '--content-type', 'audio/mpeg',
    '--cache-control', 'public, max-age=2592000',
  ]);
}

// ── pääohjelma ─────────────────────────────────────────────────────

async function main() {
  const liput = tulkitseArgumentit(process.argv.slice(2));
  if (liput.virhe) {
    console.error(`${liput.virhe}.`);
    console.error('Käyttö: node tools/generoi-linssiluennat.mjs '
      + `[--linssi ${Object.keys(LINSSIT).join('|')}] `
      + '[--pysakit 1769,1783] [--kuiva] [--pakota] [--ei-vientia]');
    process.exit(1);
  }

  // Kaari ladataan vasta nyt: väärä tunnus on jo kaatunut ylempänä.
  const moduuli = await import(LINSSIT[liput.linssi]);
  const kaari = moduuli.LINSSI?.aikajana;
  if (!kaari) {
    console.error(`Linssillä ${liput.linssi} ei ole aikajanakaarta.`);
    process.exit(1);
  }
  const kansio = ampariKansio(kaari);

  const { tyot, tuntemattomat } = valitsePysakit(kaari, liput.pysakit);
  if (tuntemattomat.length) {
    console.error(`Näitä ei ole kaaressa: ${tuntemattomat.join(', ')} `
      + `— tarkista ${LINSSIT[liput.linssi].replace('../', '')}. Ei generoida mitään.`);
    process.exit(1);
  }
  if (!tyot.length) {
    console.error('Yhtään luentaa ei valittu.');
    process.exit(1);
  }

  /*
   * KUIVA AJO: tulostaa mitä generoitaisiin eikä kutsu APIa, ei tee
   * verkkopyyntöjä eikä tarvitse ffmpegiä. Tarkoitettu sen
   * todistamiseen, että jokainen pysäkki osuu omaan tiedostoonsa ja
   * että luettava teksti on se, mitä datassa lukee — väärä nimi
   * huomattaisiin muuten vasta pelissä hiljaisuutena.
   */
  if (liput.kuiva) {
    console.log(`KUIVA AJO (--kuiva) — APIa ei kutsuta, ämpäriin ei viedä. `
      + `Linssi ${liput.linssi}, ${tyot.length} luentaa, ääni Viisas Kertoja, malli ${MALLI}.`);
    for (const tyo of tyot) {
      console.log(`${kansio}/${tyo.nimi}  ·  "${tyo.teksti}"`);
      // Mallille lähtevä muoto, jos se eroaa (vuodet sanoina, tauot).
      if (tyo.puhe && tyo.puhe !== tyo.teksti) console.log(`    mallille: "${tyo.puhe}"`);
    }
    console.log(`Kuiva ajo valmis: ${tyot.length} kohdetta, `
      + `${new Set(tyot.map((t) => t.nimi)).size} eri tiedostonimeä.`);
    process.exit(0);
  }

  for (const komento of ['ffmpeg', 'ffprobe']) {
    if (!onOlemassa(komento)) {
      console.error(`${komento} puuttuu polusta — viimeistely tarvitsee sen.`);
      console.error('Asennus: apt-get install -y ffmpeg (ajossa tämä tehdään automaattisesti).');
      process.exit(1);
    }
  }

  const avain = process.env.ELEVEN_API_KEY ?? process.env.ELEVENLABS_API_KEY;
  if (!avain) {
    console.error('ELEVEN_API_KEY puuttuu ympäristöstä — luentoja ei voi generoida.');
    console.error('Kuivan ajon saa ilman avainta: node tools/generoi-linssiluennat.mjs --kuiva');
    process.exit(1);
  }

  // Ennen ensimmäistäkään maksullista kutsua: kohde ei saa olla repossa.
  const kohdekansio = resolve(JUURI, KOHDE_KANSIO);
  const raakakansio = resolve(JUURI, RAAKA_KANSIO);
  vaadiGitignore(kohdekansio);
  vaadiGitignore(raakakansio);
  mkdirSync(kohdekansio, { recursive: true });
  mkdirSync(raakakansio, { recursive: true });

  const tyokansio = mkdtempSync(join(tmpdir(), 'linssiluennat-'));
  const valmiit = [];
  let ohitettuja = 0;
  let virheita = 0;
  try {
    for (const tyo of tyot) {
      console.log(`\n── ${kansio}/${tyo.nimi}`);
      console.log(`   "${tyo.teksti}"`);

      if (!liput.pakota) {
        const { url, koodi } = ampariHead(tyo.nimi, kansio);
        if (koodi === '200') {
          console.log(`   on jo ämpärissä (${url}) — ohitetaan. --pakota kirjoittaa yli.`);
          ohitettuja += 1;
          continue;
        }
      }

      const kohde = join(kohdekansio, tyo.nimi);
      const lahde = join(raakakansio, `raaka-${tyo.nimi}`);
      // eslint-disable-next-line no-await-in-loop
      const tavut = await haeApista(tyo.puhe, avain, lahde);
      console.log(`   API: ${(tavut / 1024).toFixed(0)} kt → ${lahde}`);

      const { leikattu, mitattu, korjaus } = viimeistele(lahde, kohde, tyokansio);
      console.log(`   leikkaus: ${kestoSekunteina(lahde).toFixed(2)} s → ${leikattu.toFixed(2)} s, `
        + `taso ${mitattu.taso.toFixed(1)} LUFS, korjaus ${korjaus.toFixed(2)} dB`);

      // Kaaren oma puhe (esittely, välinäytös) saa oman kestokattonsa.
      const tulos = tarkista(kohde, tyo.vuosi === null ? KAAREN_KESTO_MAX_S : KESTO_MAX_S);
      console.log(`   valmis: ${tulos.pituus.toFixed(2)} s, `
        + `${tulos.taso === null ? '?' : tulos.taso.toFixed(1)} LUFS → ${kohde}`);
      if (tulos.virheet.length) {
        for (const virhe of tulos.virheet) console.error(`   VIRHE: ${virhe}`);
        virheita += 1;
        // Kelvotonta luentaa ei viedä, mutta tiedosto jää levylle
        // kuunneltavaksi — kutsu on jo maksettu.
        continue;
      }
      valmiit.push(tyo.nimi);
    }

    if (liput.vienti) {
      for (const nimi of valmiit) vieAmpariin(join(kohdekansio, nimi), nimi, kansio);
    }
  } finally {
    rmSync(tyokansio, { recursive: true, force: true });
  }

  console.log('');
  if (!liput.vienti) {
    console.log('Vienti ohitettiin (--ei-vientia). Tiedostot:');
    for (const nimi of valmiit) console.log(`  ${join(kohdekansio, nimi)}`);
  } else {
    console.log(`Viety ämpäriin: ${valmiit.length}`
      + `${ohitettuja ? `, ohitettu jo olemassa olevia: ${ohitettuja}` : ''}.`);
    for (const nimi of valmiit) {
      const { url, koodi } = ampariHead(nimi, kansio);
      const kunnossa = koodi === '200';
      if (!kunnossa) virheita += 1;
      console.log(`  ${url} → HTTP ${koodi ?? '?'}${kunnossa ? '' : '  ← EI VASTAA'}`);
    }
    console.log('');
    console.log('KUUNTELE luennat ennen kuin ne jäävät peliin: vuosiluvun, nimen ja '
      + 'keksinnön väliin pitää jäädä pieni tauko eikä nimi saa vääntyä.');
  }
  process.exit(virheita ? 1 : 0);
}

if (process.argv[1] === TAMA) await main();
