/*
 * PULUN ÄÄNI — Livian repliikit puheeksi ElevenLabsilla.
 *
 * Omistajan tilaus 6.9.2026 aamupäivä, sanatarkasti: *"Pululle täytyy
 * etsiä eleveniltä oma ääni joka vähän käheä ja nopea puhumaan.
 * Generoidaan kaikki valmiiksi kirjoitetut repliikit puheeksi."* …
 * *"Voidaan käyttää myös pulun ääneen efektejä (kaiku alussa kun tulee
 * ja aloittaa jo huutelemaan viestiä ennenkuin on edes ehtinyt
 * kokonaan perille). Kaiku voidaan sitten feidata pois kun pulu
 * 'perillä' ja nostaa äänitasoa hieman."* … *"Tehdään pulusta hyvin
 * vokaalinen ja elävä vastakohta kertojan monotoonisuuteen. Paljon
 * elävöitystageja elevenin generointiin."*
 *
 *   node tools/generoi-pulu.mjs --aanet             ääniehdokkaat
 *   node tools/generoi-pulu.mjs --kuiva             tekstit ja kohteet
 *   node tools/generoi-pulu.mjs --aani <voice_id>   generoi kaikki
 *   node tools/generoi-pulu.mjs --aani <id> --repliikit avaus-1,paljastus-1
 *
 *   --aanet          hakee ElevenLabsin äänet (omat + jaetut) ja
 *                    tulostaa ne, jotka sopivat kuvaukseen "vähän
 *                    käheä, nopea puhumaan, eläväinen". EI generoi
 *                    mitään: äänen valinta on kuuntelupäätös, jota
 *                    kone ei tee (sama linja kuin aanihaku.yml).
 *   --kuiva          tulostaa repliikit, tagitetun puhemuodon,
 *                    kohdetiedostot ja arvioidut kestot. Ei APIa,
 *                    ei avainta, ei vientiä.
 *   --aani <id>      käytettävä ääni (tai ympäristö PULU_AANI).
 *   --repliikit a,b  vain nämä avaimet (avaus-1, paljastus-2,
 *                    mannerivihje-1). Tyhjä = kaikki.
 *   --pakota         generoi vaikka tiedosto on jo ämpärissä.
 *   --ei-vientia     generoi ja viimeistele, mutta jätä levylle.
 *   --tempo <luku>   puheen nopeutus ffmpegillä (oletus TEMPO).
 *   --haku <nimi>    --aanet: listaa vain äänet, joiden nimessä on <nimi>.
 *
 * ------------------------------------------------------------------
 * MIKSI TEMPO TEHDÄÄN FFMPEGILLÄ
 * ------------------------------------------------------------------
 *
 * eleven_v3 on tageja ymmärtävä malli, mutta sillä ei ole nopeus-
 * säädintä (v2:n `speed` ei kuulu sen asetuksiin). Omistaja tilasi
 * NOPEAN puhujan, joten nopeutus tehdään viimeistelyketjussa
 * `atempo`-suodattimella: se on deterministinen, kuuluu samalta
 * jokaisessa ajossa eikä riipu siitä, mitä malli sattuu tekemään.
 * Elävyys tulee TAGEISTA ja stabiilisuuden Creative-asetuksesta.
 *
 * ------------------------------------------------------------------
 * TAGIT EIVÄT SAA MUUTTAA KAANONIA
 * ------------------------------------------------------------------
 *
 * Repliikit ovat kaanonia (js/livia.js; vain päätoimittaja kirjoittaa
 * ne). Tagit lisätään siksi OHJELMALLISESTI: jokainen tagi kiinnitetään
 * ankkuriin eli repliikissä oikeasti olevaan sanaan, ja ankkurin
 * puuttuminen KAATAA ajon ennen ensimmäistäkään maksullista kutsua.
 * Lopuksi tarkistetaan, että tagien poisto palauttaa alkuperäisen
 * tekstin merkilleen. Näin kaanonin muutos huomataan heti eikä
 * äänitteestä tule hiljaista väärennöstä.
 *
 * ------------------------------------------------------------------
 * KAIKU SAAPUMISREPLIIKEISSÄ
 * ------------------------------------------------------------------
 *
 * Kahdesta saapumisrepliikistä (js/liviapuhe.js
 * LIVIAN_SAAPUMISREPLIIKIT: avauksen ja paljastuksen ensimmäinen)
 * tehdään ffmpegillä toinen versio, jossa alku kuulostaa kaukaiselta:
 * kaikuinen ja hiljaisempi raita häipyy KAIKUN_KESTO sekunnissa pois
 * ja kuiva raita nousee normaaliin tasoon. Pulu siis huutaa viestiään
 * jo lentäessä ja on "perillä" reilun sekunnin kuluttua.
 *
 * Efekti leivotaan tiedostoon eikä tehdä pelissä Web Audiolla: pelin
 * kuplaäänet soitetaan tavallisella <audio>-elementillä, ja
 * konvolveri vaatisi koko soittotien vaihtamisen AudioContextiin
 * kahden repliikin takia. Perustelu on kirjattu myös js/liviapuhe.js:n
 * otsikkoon.
 *
 * ------------------------------------------------------------------
 * VIENTI, MANIFESTI JA REPO
 * ------------------------------------------------------------------
 *
 * Valmiit mp3:t EIVÄT mene repoon. Ne kirjoitetaan media/-puolelle
 * (.gitignoressa, tarkistetaan ennen ensimmäistäkään maksullista
 * kutsua) ja viedään ämpäriin samalla aws s3 cp -komennolla kuin
 * linssiluennat. Kansio tulee pelin omasta lähteestä (js/liviapuhe.js
 * LIVIAN_AANIJUURI → aanet/pulu/), joten peli hakee tasan saman polun
 * ja äänet kuuluvat heti ajon jälkeen ilman julkaisua.
 *
 * MANIFESTI aanet/pulu/manifesti.json kertoo, mitä ämpärissä on:
 * repliikin avain, teksti, tiedosto, kaikuversio, merkkimäärä ja
 * kesto. Peli ei tarvitse sitä (nimi johdetaan koodista), mutta se on
 * ainoa paikka, josta ajon tulos näkyy ilman ämpärin listausta.
 *
 * API-avain luetaan VAIN ympäristöstä (ELEVEN_API_KEY) eikä sitä
 * tulosteta koskaan. HUOM konttiympäristössä: Noden fetch ei käytä
 * ympäristön proxyä ilman NODE_USE_ENV_PROXY=1 — työkalu käynnistää
 * itsensä uudelleen lipun kanssa, kuten generoi-linssiluennat.mjs.
 */

import { spawnSync } from 'node:child_process';
import {
  mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { LIVIAN_AVAUS, MANNERIVIHJE, livianPaljastus } from '../js/livia.js';
import {
  LIVIAN_AANIJUURI, LIVIAN_AANITETTY_PALJASTUS, livianAanitykset,
} from '../js/liviapuhe.js';
import { leikkaaHiljaisuusSuodatin } from './generoi-tehosteet.mjs';
import { julkinenJuuri, tulkitseEbur128, tulkitseLoudnorm } from './generoi-siirtymamusiikki.mjs';

const TAMA = fileURLToPath(import.meta.url);
const JUURI = resolve(dirname(TAMA), '..');

/* Sama vartija kuin muissa API-työkaluissa: ilman lippua Noden fetch
 * ei lue HTTPS_PROXYa, ja kutsu kaatuu kontissa vaikka verkko on auki. */
if (process.argv[1] === TAMA && !process.env.NODE_USE_ENV_PROXY
  && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [TAMA, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

// ── rajapinta ──────────────────────────────────────────────────────

const API = 'https://api.elevenlabs.io';
const PUHE_OSOITE = `${API}/v1/text-to-speech`;
/*
 * MALLI ON V2 JA TAGIT POIS (omistaja 6.9.2026 iltapäivä, ElevenLabsin
 * sivulla kokeiltuaan: *"v2 versio on parempi tälle äänelle, eli ei
 * tule ollenkaan ohjausmerkkejä. käytä muutenkin noita säätöjä jotka
 * näkyvät kuvassa"*). Ääni on "Dr. Von - Quirky, Mad Scientist"
 * (PULU_AANI_OLETUS). eleven_multilingual_v2 ei ymmärrä v3:n
 * hakasulkutageja — ne luettaisiin ääneen — joten repliikki lähtee
 * puhtaana tekstinä. TAGIT-taulu jää talteen v3-kokeilua varten
 * (MALLI takaisin eleven_v3:een palauttaa ne käyttöön).
 *
 * Säätimet omistajan kuvakaappauksesta: Speed hieman keskeltä oikealle
 * (1,05), Stability keskellä (0,5), Similarity 0,75, Style Exaggeration
 * nolla, Speaker boost päällä. Nopeus tulee nyt mallista, joten
 * ffmpeg-tempo on 1,0 (ks. MIKSI TEMPO TEHDÄÄN FFMPEGILLÄ — pätee vain
 * v3:lle, jolla ei ole speed-säädintä).
 */
const MALLI = 'eleven_multilingual_v2';
export const PULU_AANI_OLETUS = process.env.PULU_AANI ?? '';
const TAGIT_KAYTOSSA = MALLI === 'eleven_v3';
const STABILITY = 0.5;
const SIMILARITY = 0.75;
/** Tyylin voimakkuus: v2:lla nolla (omistajan säätö), v3:lla 0,6. */
const STYLE = TAGIT_KAYTOSSA ? 0.6 : 0;
/** Mallin oma nopeus (vain v2-perhe; v3 jättää kentän huomiotta). */
const SPEED = 1.05;
/** Nopeutus viimeistelyssä: v3:lla 1,08, v2:lla nopeus tulee mallista. */
const TEMPO = TAGIT_KAYTOSSA ? 1.08 : 1.0;
/** Lopputauko, jonka ffmpeg leikkaa naksahduksen kanssa pois. */
const LOPPUTAUKO = ' <break time="1.0s" />';

// ── kansiot ja vaatimukset ─────────────────────────────────────────

const KOHDE_KANSIO = 'media/pulu';
/** Mallin raaka tuotos talteen: uuden leikkauksen voi tehdä ilmaiseksi. */
const RAAKA_KANSIO = 'media/pulu-raaka';
/** Manifestin tiedostonimi ämpärissä. */
export const MANIFESTI = 'manifesti.json';

/** Puheen taso: sama perhe kuin kertojan luennoilla (−17 LUFS). */
const TAVOITE_LUFS = -17;
const LUFS_TOLERANSSI = 1.5;
const HAIVYTYS_S = 0.03;
const HANNAN_PADDING_S = 0.15;
const KESTO_MIN_S = 1.0;
/** Pisin repliikki on kuplan lukuajan mittainen; yli menee jauhamiseksi. */
const KESTO_MAX_S = 20.0;

/** Kaiun häipymä sekunteina (omistaja: "kaiku feidataan pois perillä"). */
const KAIUN_KESTO = 1.5;
/** Kaukaisen alun vaimennus: kuinka hiljaa pulu aloittaa. */
const KAIUN_VAIMENNUS = 0.45;

/** Puhenopeus arviossa: merkkiä sekunnissa nopealla puheella. */
export const MERKKIA_SEKUNNISSA = 14;

/**
 * KUPLAN LUKUAIKA PELIN OMASTA LÄHTEESTÄ.
 *
 * Kuplien rytmi ohjaa ääntä (js/liviapuhe.js: "luenta seuraa kuplia"),
 * joten liian pitkä repliikki katkeaa kesken kun seuraava kupla tulee.
 * Vakiot luetaan js/livia.js:stä samalla tavalla kuin ämpärin juuri
 * luetaan js/media.js:stä — kopio täällä eriytyisi hiljaa.
 */
export function kuplanVakiot(lahde = readFileSync(resolve(JUURI, 'js/livia.js'), 'utf8')) {
  const luku = (nimi) => {
    const osuma = lahde.match(new RegExp(`const ${nimi} = (\\d+);`));
    if (!osuma) throw new Error(`js/livia.js: ${nimi} ei löytynyt — päivitä tämä työkalu.`);
    return Number(osuma[1]);
  };
  return {
    perMerkki: luku('LUKUAIKA_PER_MERKKI'),
    vahintaan: luku('LUKUAIKA_VAHINTAAN'),
    enintaan: luku('LUKUAIKA_ENINTAAN'),
  };
}

/** Kuinka kauan kupla on ruudulla ennen seuraavaa, sekunteina. */
export function kuplanLukuaika(teksti, vakiot = kuplanVakiot()) {
  const ms = Math.min(vakiot.enintaan,
    Math.max(vakiot.vahintaan, String(teksti ?? '').length * vakiot.perMerkki));
  return ms / 1000;
}

// ── tagit ──────────────────────────────────────────────────────────

/**
 * ELÄVÖITYSTAGIT REPLIIKEITTÄIN.
 *
 * `alku` on repliikin eteen tuleva tagi ja `kohdat` ankkuroituja
 * tageja: [ankkuri, tagi] tarkoittaa "tagi juuri ennen tätä sanaa".
 * Ankkurin on esiinnyttävä repliikissä TÄSMÄLLEEN KERRAN — muuten ajo
 * kaatuu (ks. TAGIT EIVÄT SAA MUUTTAA KAANONIA).
 */
export const TAGIT = {
  'avaus-1': { alku: '[excited]', kohdat: [['Sinähän', '[amused]']] },
  'avaus-2': {
    alku: '[proud]',
    kohdat: [['Pöllö luki', '[quickly]']],
  },
  'avaus-3': {
    alku: '[warmly]',
    kohdat: [['vaikka se maanosa', '[excited]']],
  },
  'avaus-4': {
    alku: '[sheepish]',
    kohdat: [['Ateenasta', '[brightly]']],
  },
  'avaus-5': { alku: '[reassuring]', kohdat: [['Minä olen vain', '[modestly]']] },
  'paljastus-1': {
    alku: '[squawks]',
    kohdat: [
      ['Sähke pöllöltä', '[breathless]'],
      ['Ja sitten', '[quickly]'],
      ['Minä tuuraan', '[sighs]'],
    ],
  },
  'paljastus-2': {
    alku: '[reassuring]',
    kohdat: [['Melkein joka ikisen', '[mutters]'], ['Tämän loppu', '[quickly]']],
  },
  'mannerivihje-1': {
    alku: '[casually]',
    kohdat: [['kerää rahaa', '[helpfully]']],
  },
};

/** Tagi pois tekstistä: `[excited] Hei` → `Hei`. */
export function ilmanTageja(teksti) {
  return String(teksti ?? '').replace(/\[[^\]]+\]\s*/g, '').trim();
}

/**
 * Repliikin puhemuoto: kaanoninen teksti tageineen.
 *
 * Kaatuu, jos ankkuria ei löydy tai se esiintyy monta kertaa, ja
 * varmistaa lopuksi että tagien poisto palauttaa alkuperäisen tekstin.
 *
 * @param {string} teksti kaanoninen repliikki
 * @param {{alku?:string, kohdat?:Array<[string,string]>}} tagit
 * @returns {string} mallille lähtevä teksti
 */
export function puhemuoto(teksti, tagit = {}) {
  const alkuperainen = String(teksti ?? '').trim();
  let ulos = alkuperainen;
  for (const [ankkuri, tagi] of tagit.kohdat ?? []) {
    const osumat = ulos.split(ankkuri).length - 1;
    if (osumat !== 1) {
      throw new Error(`tagin ankkuri "${ankkuri}" esiintyy ${osumat} kertaa repliikissä `
        + `"${alkuperainen.slice(0, 60)}…" — kaanon on muuttunut, päivitä TAGIT.`);
    }
    ulos = ulos.replace(ankkuri, `${tagi} ${ankkuri}`);
  }
  if (tagit.alku) ulos = `${tagit.alku} ${ulos}`;
  if (ilmanTageja(ulos) !== alkuperainen) {
    throw new Error(`tagitus muutti repliikin tekstiä: "${alkuperainen.slice(0, 60)}…"`);
  }
  return ulos;
}

// ── repliikit ──────────────────────────────────────────────────────

/**
 * KAIKKI ÄÄNITETTÄVÄT REPLIIKIT. Tekstit tulevat js/livia.js:stä
 * (kaanoni) ja nimet js/liviapuhe.js:stä (sama funktio kuin pelissä).
 * Paljastus ladotaan äänitetylle variantille (Ateena/Kreikka).
 */
export function repliikit() {
  return livianAanitykset({
    avaus: LIVIAN_AVAUS,
    paljastus: livianPaljastus(LIVIAN_AANITETTY_PALJASTUS),
    mannerivihje: [MANNERIVIHJE],
  }).map((rivi) => ({
    ...rivi,
    puhe: TAGIT_KAYTOSSA ? puhemuoto(rivi.teksti, TAGIT[rivi.avain]) : rivi.teksti,
    arvioSekunteina: Number((rivi.merkit / MERKKIA_SEKUNNISSA).toFixed(1)),
    kuplaSekunteina: kuplanLukuaika(rivi.teksti),
  }));
}

/** Ämpärin kansio pelin omasta lähteestä: aanet/pulu. */
export function ampariKansio() {
  const julkinen = julkinenJuuri();
  const polku = LIVIAN_AANIJUURI.startsWith(julkinen)
    ? LIVIAN_AANIJUURI.slice(julkinen.length) : LIVIAN_AANIJUURI;
  return polku.replace(/^\/+|\/+$/g, '');
}

/**
 * MANIFESTIN MUOTO. Yksi rivi per repliikki; `kesto` on valmiin
 * äänitteen pituus sekunteina ja null, jos sitä ei tässä ajossa
 * generoitu (ohitettu tai rajattu pois).
 *
 * @param {Array<object>} rivit repliikit()-listan alkiot
 * @param {Map<string, object>} kestot avain → { kesto, kaikuKesto }
 */
export function kokoaManifesti(rivit, kestot = new Map()) {
  return {
    versio: 1,
    kansio: ampariKansio(),
    paivitetty: new Date().toISOString().slice(0, 10),
    repliikit: rivit.map((rivi) => ({
      avain: rivi.avain,
      lahde: rivi.lahde,
      indeksi: rivi.indeksi,
      teksti: rivi.teksti,
      merkit: rivi.merkit,
      kuplaSekunteina: rivi.kuplaSekunteina ?? null,
      tiedosto: rivi.nimi,
      kaiku: rivi.kaikuNimi,
      saapuu: rivi.saapuu,
      kesto: kestot.get(rivi.avain)?.kesto ?? null,
      kaikuKesto: kestot.get(rivi.avain)?.kaikuKesto ?? null,
    })),
  };
}

// ── argumentit ─────────────────────────────────────────────────────

/** Komentoriviliput. Palauttaa `{ virhe }`, jos syöte ei kelpaa. */
export function tulkitseArgumentit(argumentit) {
  const liput = {
    toiminto: 'generoi',
    aani: PULU_AANI_OLETUS,
    haku: '',
    valitut: [],
    pakota: false,
    vienti: true,
    tempo: TEMPO,
  };
  for (let i = 0; i < argumentit.length; i += 1) {
    const arg = argumentit[i];
    if (arg === '--aanet') {
      liput.toiminto = 'aanet';
    } else if (arg === '--kuiva') {
      liput.toiminto = 'kuiva';
    } else if (arg === '--aani') {
      const arvo = argumentit[i + 1];
      if (!arvo || String(arvo).startsWith('--')) return { ...liput, virhe: '--aani ilman tunnusta' };
      liput.aani = arvo;
      i += 1;
    } else if (arg === '--haku') {
      const arvo = argumentit[i + 1];
      if (!arvo || String(arvo).startsWith('--')) return { ...liput, virhe: '--haku ilman hakusanaa' };
      liput.haku = arvo;
      i += 1;
    } else if (arg === '--tempo') {
      const arvo = Number(argumentit[i + 1]);
      if (!Number.isFinite(arvo) || arvo < 0.5 || arvo > 2) {
        return { ...liput, virhe: '--tempo vaatii luvun väliltä 0,5–2' };
      }
      liput.tempo = arvo;
      i += 1;
    } else if (arg === '--repliikit') {
      // Pilkku tai välilyönti, kumpi tahansa (sama sietokyky kuin
      // generoi-linssiluennat.mjs:n --pysakit).
      const palat = [];
      while (i + 1 < argumentit.length && !String(argumentit[i + 1]).startsWith('--')) {
        i += 1;
        palat.push(argumentit[i]);
      }
      if (!palat.length) return { ...liput, virhe: '--repliikit ilman avaimia' };
      liput.valitut.push(...palat.join(',').split(/[,\s]+/).map((p) => p.trim()).filter(Boolean));
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

/** Valitut repliikit ja tuntemattomat avaimet erikseen. */
export function valitseRepliikit(kaikki, valinta = []) {
  if (!valinta.length) return { tyot: kaikki, tuntemattomat: [] };
  const avaimet = new Set(kaikki.map((rivi) => rivi.avain));
  return {
    tyot: kaikki.filter((rivi) => valinta.includes(rivi.avain)),
    tuntemattomat: valinta.filter((avain) => !avaimet.has(avain)),
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
  const ajo = spawnSync('git', ['-C', JUURI, 'check-ignore', '-q', polku], { encoding: 'utf8' });
  if (ajo.status !== 0) {
    throw new Error(`${polku} EI ole .gitignoressa — valmis äänite menisi repoon. `
      + 'Media kuuluu ämpäriin (Raamattu: "kaikki aina ämpäriin").');
  }
}

function julkinenOsoite(nimi, kansio) {
  return `${julkinenJuuri()}${kansio}/${nimi}`;
}

/** HEAD julkiseen osoitteeseen: onko äänite jo ämpärissä. */
function ampariHead(nimi, kansio) {
  const url = julkinenOsoite(nimi, kansio);
  if (!onOlemassa('curl')) return { url, koodi: null };
  const { loki } = aja('curl', ['-sS', '-I', '--max-time', '30', url], { salliVirhe: true });
  return { url, koodi: loki.match(/HTTP\/[\d.]+ (\d{3})/)?.[1] ?? null };
}

// ── ääniehdokkaat ──────────────────────────────────────────────────

/** Ne piirteet, joita omistaja tilasi: käheä, nopea, eläväinen. */
export const TOIVOTUT = [
  'raspy', 'hoarse', 'gravelly', 'husky', 'rough',
  'energetic', 'fast', 'quick', 'lively', 'quirky', 'excited', 'animated',
];

/** Äänen kuvaus yhtenä pikkukirjaimisena merkkijonona hakua varten. */
export function aanenKuvaus(aani) {
  const labels = Object.values(aani?.labels ?? {}).join(' ');
  return [aani?.name, aani?.description, labels, (aani?.descriptives ?? []).join(' ')]
    .filter(Boolean).join(' ').toLowerCase();
}

/** Osuvatko toivotut piirteet ääneen? Palauttaa osuneet piirteet. */
export function osuvatPiirteet(aani, toivotut = TOIVOTUT) {
  const kuvaus = aanenKuvaus(aani);
  return toivotut.filter((piirre) => kuvaus.includes(piirre));
}

/** Yksi rivi ehdokkaasta lokiin: nimi, tunnus, piirteet, esikuuntelu. */
function tulostaAani(aani, osumat) {
  const labels = Object.entries(aani?.labels ?? {})
    .map(([k, v]) => `${k}=${v}`).join(' ') || '(ei labeleita)';
  const kielet = (aani?.verified_languages ?? [])
    .map((k) => k.language ?? k.locale).filter(Boolean).join(',');
  console.log(`  ${aani.name}  ·  ${aani.voice_id}`);
  console.log(`    osumat: ${osumat.join(', ') || '—'}${kielet ? `  ·  kielet: ${kielet}` : ''}`);
  console.log(`    labels: ${labels}`);
  if (aani.preview_url) console.log(`    esikuuntelu: ${aani.preview_url}`);
}

async function haeJson(url, avain) {
  const vastaus = await fetch(url, {
    headers: { 'xi-api-key': avain },
    signal: AbortSignal.timeout(60000),
  });
  if (!vastaus.ok) {
    throw new Error(`HTTP ${vastaus.status}: ${(await vastaus.text()).slice(0, 300)}`);
  }
  return vastaus.json();
}

/**
 * ÄÄNIEHDOKKAAT LOKIIN. Omat äänet (/v1/voices) aina, jaetut äänet
 * (/v1/shared-voices) niillä hauilla, jotka rajapinta hyväksyy —
 * jaettu haku on valinnainen, eikä sen kaatuminen saa kaataa ajoa.
 * Ajo ei valitse ääntä: valinta on kuuntelupäätös.
 */
async function haeAanet(avain, haku = '') {
  /*
   * HAKU NIMELLÄ (6.9.2026): omistaja löysi äänen ElevenLabsin sivulta
   * nimellä, ja voice_id tarvitaan ajoon. `--haku "Dr. Von"` listaa
   * omista ja jaetuista äänistä ne, joiden nimessä haku esiintyy —
   * piirresuodatinta ei silloin käytetä.
   */
  const nimiOsuu = (aani) => !haku
    || String(aani?.name ?? '').toLowerCase().includes(haku.toLowerCase());
  console.log(haku ? `HAKU NIMELLÄ "${haku}"\n` : 'OMAT ÄÄNET (/v1/voices)\n');
  const omat = await haeJson(`${API}/v1/voices`, avain);
  let omia = 0;
  for (const aani of omat.voices ?? []) {
    if (!nimiOsuu(aani)) continue;
    const osumat = osuvatPiirteet(aani);
    if (!haku && !osumat.length) continue;
    tulostaAani(aani, osumat);
    omia += 1;
  }
  console.log(omia ? '' : '  (ei osumia — koko lista alla)\n');
  if (!omia && !haku) {
    for (const aani of omat.voices ?? []) tulostaAani(aani, []);
  }

  console.log('\nJAETUT ÄÄNET (/v1/shared-voices)\n');
  const haut = haku ? [`page_size=100&search=${encodeURIComponent(haku)}`] : [
    'page_size=100&search=raspy',
    'page_size=100&search=gravelly',
    'page_size=100&search=energetic',
    'page_size=100&language=fi',
  ];
  const nahdyt = new Set();
  for (const haku of haut) {
    let data = null;
    try {
      // eslint-disable-next-line no-await-in-loop
      data = await haeJson(`${API}/v1/shared-voices?${haku}`, avain);
    } catch (virhe) {
      console.log(`  (${haku}: ${virhe.message.slice(0, 120)})`);
      continue;
    }
    const aanet = data.voices ?? [];
    console.log(`  — haku ${haku}: ${aanet.length} ääntä`);
    for (const aani of aanet) {
      const tunnus = aani.voice_id;
      if (!tunnus || nahdyt.has(tunnus)) continue;
      if (!nimiOsuu(aani)) continue;
      const osumat = osuvatPiirteet(aani);
      if (!haku && !osumat.length) continue;
      nahdyt.add(tunnus);
      tulostaAani(aani, osumat);
    }
  }
  console.log(`\nEhdokkaita jaetuista äänistä: ${nahdyt.size}.`);
  console.log('Kuuntele esikuuntelut ja anna valittu voice_id ajolle syötteessä "aani".');
}

// ── ketjun vaiheet ─────────────────────────────────────────────────

/** Yksi maksullinen kutsu: yksi repliikki levylle. */
async function haeApista(puhe, aani, avain, kohde) {
  const osoite = `${PUHE_OSOITE}/${aani}?output_format=mp3_44100_128`;
  const vastaus = await fetch(osoite, {
    method: 'POST',
    headers: { 'xi-api-key': avain, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: puhe + LOPPUTAUKO,
      model_id: MALLI,
      voice_settings: {
        stability: STABILITY,
        similarity_boost: SIMILARITY,
        style: STYLE,
        use_speaker_boost: true,
        ...(TAGIT_KAYTOSSA ? {} : { speed: SPEED }),
      },
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
 * Viimeistelysuodatin: häivytykset päihin, nopeutus, tason korjaus ja
 * hiljainen häntä. `kesto` on leikatun äänen pituus sekunteina.
 */
export function viimeistelySuodatin({
  kesto, korjausDb, tempo = TEMPO, haivytys = HAIVYTYS_S, padding = HANNAN_PADDING_S,
}) {
  if (!(kesto > 0)) throw new Error('keston pitää olla positiivinen');
  const h = Math.min(haivytys, kesto / 4);
  const ulosAlkaa = Math.max(0, kesto - h);
  return [
    `afade=t=in:st=0:d=${h.toFixed(3)}`,
    `afade=t=out:st=${ulosAlkaa.toFixed(3)}:d=${h.toFixed(3)}`,
    `atempo=${tempo.toFixed(3)}`,
    `volume=${korjausDb.toFixed(2)}dB`,
    `apad=pad_dur=${padding.toFixed(3)}`,
  ].join(',');
}

/**
 * KAIKUN SUODATINKETJU. Märkä raita (kaiku + vaimennus) häipyy
 * `kesto` sekunnissa pois samalla kun kuiva raita nousee täyteen
 * tasoon — pulu lähestyy ja on perillä.
 */
export function kaikuSuodatin({ kesto = KAIUN_KESTO, vaimennus = KAIUN_VAIMENNUS } = {}) {
  const k = kesto.toFixed(2);
  const v = vaimennus.toFixed(2);
  /*
   * Lauseke on YKSINKERTAISISSA LAINAUSMERKEISSÄ eikä pilkkuja
   * kenoteta: ffmpegin suodatinkielessä lainausmerkkien sisällä
   * kenoviiva olisi kirjaimellinen merkki, ja lausekkeen jäsennys
   * kaatuisi (ffmpegin oma esimerkki volume-suodattimen ohjeessa on
   * samassa muodossa). Argumentit menevät ffmpegille suoraan
   * argv-taulukossa, joten shelliä ei ole välissä.
   */
  return [
    '[0:a]asplit=2[kauas][lahella]',
    `[kauas]aecho=0.8:0.85:340|620:0.45,volume='${v}*max(0,1-t/${k})':eval=frame[marka]`,
    `[lahella]volume='min(1,t/${k})':eval=frame[kuiva]`,
    '[marka][kuiva]amix=inputs=2:normalize=0[ulos]',
  ].join(';');
}

/** Leikkaa hiljaisuus, nopeuta, normalisoi taso ja koodaa mp3. */
function viimeistele(lahde, kohde, tyokansio, tempo) {
  const wav = join(tyokansio, 'leikattu.wav');
  aja('ffmpeg', [
    '-y', '-v', 'error', '-i', lahde,
    '-af', `aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=mono,${
      leikkaaHiljaisuusSuodatin()}`,
    '-c:a', 'pcm_s16le', wav,
  ]);
  const leikattu = kestoSekunteina(wav);

  // Vaihe 1: mittaus. Vaihe 2: yksi lineaarinen vahvistus.
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
    '-af', viimeistelySuodatin({ kesto: leikattu, korjausDb: korjaus, tempo }),
    '-ac', '1', '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', '128k', kohde,
  ]);
  return { leikattu, mitattu, korjaus };
}

/** Saapumisversio: kaukainen kaikuinen alku, joka häipyy pois. */
function teeKaiku(lahde, kohde) {
  aja('ffmpeg', [
    '-y', '-v', 'error', '-i', lahde,
    '-filter_complex', kaikuSuodatin(), '-map', '[ulos]',
    '-ac', '1', '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', '128k', kohde,
  ]);
  return kestoSekunteina(kohde);
}

/** Valmiin äänitteen tarkistukset: kesto ja taso. */
function tarkista(kohde) {
  const pituus = kestoSekunteina(kohde);
  const taso = tulkitseEbur128(aja('ffmpeg', [
    '-hide_banner', '-v', 'info', '-i', kohde, '-af', 'ebur128=peak=true',
    '-f', 'null', '-',
  ]).loki);
  const virheet = [];
  if (pituus < KESTO_MIN_S || pituus > KESTO_MAX_S) {
    virheet.push(`kesto ${pituus.toFixed(2)} s ei ole välillä ${KESTO_MIN_S}–${KESTO_MAX_S} s`);
  }
  if (taso === null) {
    virheet.push('tasoa ei saatu mitattua (ebur128)');
  } else if (Math.abs(taso - TAVOITE_LUFS) > LUFS_TOLERANSSI) {
    virheet.push(`taso ${taso.toFixed(1)} LUFS, tavoite ${TAVOITE_LUFS} (±${LUFS_TOLERANSSI})`);
  }
  return { pituus, taso, virheet };
}

/** Vie valmis tiedosto ämpäriin (sama komento kuin vie-aanet.yml). */
function vieAmpariin(kohde, nimi, kansio, tyyppi = 'audio/mpeg') {
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

// ── pääohjelma ─────────────────────────────────────────────────────

async function main() {
  const liput = tulkitseArgumentit(process.argv.slice(2));
  if (liput.virhe) {
    console.error(`${liput.virhe}.`);
    console.error('Käyttö: node tools/generoi-pulu.mjs [--aanet] [--kuiva] '
      + '[--aani <voice_id>] [--repliikit avaus-1,paljastus-1] [--pakota] '
      + '[--ei-vientia] [--tempo 1.08]');
    process.exit(1);
  }

  const avain = process.env.ELEVEN_API_KEY ?? process.env.ELEVENLABS_API_KEY;

  if (liput.toiminto === 'aanet') {
    if (!avain) {
      console.error('ELEVEN_API_KEY puuttuu ympäristöstä — ääniä ei voi hakea.');
      process.exit(1);
    }
    console.log('ÄÄNIEHDOKKAAT PULULLE — haetaan piirteillä: '
      + `${TOIVOTUT.join(', ')}.\n`);
    await haeAanet(avain, liput.haku);
    process.exit(0);
  }

  const kaikki = repliikit();
  const { tyot, tuntemattomat } = valitseRepliikit(kaikki, liput.valitut);
  if (tuntemattomat.length) {
    console.error(`Näitä repliikkejä ei ole: ${tuntemattomat.join(', ')}. `
      + `Avaimet: ${kaikki.map((r) => r.avain).join(', ')}.`);
    process.exit(1);
  }
  if (!tyot.length) {
    console.error('Yhtään repliikkiä ei valittu.');
    process.exit(1);
  }
  const kansio = ampariKansio();

  if (liput.toiminto === 'kuiva') {
    console.log('KUIVA AJO (--kuiva) — APIa ei kutsuta, ämpäriin ei viedä. '
      + `${tyot.length} repliikkiä, malli ${MALLI}, tempo ${liput.tempo}.`);
    for (const tyo of tyot) {
      console.log(`\n${kansio}/${tyo.nimi}${tyo.kaikuNimi ? ` (+ ${tyo.kaikuNimi})` : ''}`);
      console.log(`  teksti (${tyo.merkit} merkkiä, puhe ~${tyo.arvioSekunteina} s, `
        + `kupla ${tyo.kuplaSekunteina} s): "${tyo.teksti}"`);
      console.log(`  mallille: "${tyo.puhe}"`);
      if (tyo.arvioSekunteina > tyo.kuplaSekunteina) {
        console.log('  PITKÄ: ääni jatkuisi vielä kun seuraava kupla tulee — lyhennä '
          + `repliikkiä noin ${Math.ceil(tyo.merkit - tyo.kuplaSekunteina * MERKKIA_SEKUNNISSA)} `
          + 'merkkiä (tai nopeuta tempoa).');
      }
    }
    console.log(`\nKuiva ajo valmis: ${tyot.length} repliikkiä, `
      + `${new Set(tyot.map((t) => t.nimi)).size} eri tiedostonimeä. `
      + 'Yli 6 sekunnin repliikit kannattaa lyhentää (kupla vaihtuu ennen kuin ääni loppuu).');
    process.exit(0);
  }

  for (const komento of ['ffmpeg', 'ffprobe']) {
    if (!onOlemassa(komento)) {
      console.error(`${komento} puuttuu polusta — viimeistely tarvitsee sen.`);
      process.exit(1);
    }
  }
  if (!avain) {
    console.error('ELEVEN_API_KEY puuttuu ympäristöstä — puhetta ei voi generoida.');
    console.error('Kuivan ajon saa ilman avainta: node tools/generoi-pulu.mjs --kuiva');
    process.exit(1);
  }
  if (!liput.aani) {
    console.error('Ääntä ei ole valittu. Aja ensin --aanet, kuuntele esikuuntelut ja '
      + 'anna valittu tunnus lipulla --aani <voice_id> (tai ympäristössä PULU_AANI).');
    process.exit(1);
  }

  const kohdekansio = resolve(JUURI, KOHDE_KANSIO);
  const raakakansio = resolve(JUURI, RAAKA_KANSIO);
  vaadiGitignore(kohdekansio);
  vaadiGitignore(raakakansio);
  mkdirSync(kohdekansio, { recursive: true });
  mkdirSync(raakakansio, { recursive: true });

  const tyokansio = mkdtempSync(join(tmpdir(), 'pulu-'));
  const kestot = new Map();
  const valmiit = [];
  let ohitettuja = 0;
  let virheita = 0;
  try {
    for (const tyo of tyot) {
      const soitettava = tyo.kaikuNimi ?? tyo.nimi;
      console.log(`\n── ${kansio}/${tyo.nimi}${tyo.kaikuNimi ? ` (+ ${tyo.kaikuNimi})` : ''}`);
      console.log(`   "${tyo.teksti}"`);
      console.log(`   mallille: "${tyo.puhe}"`);

      if (!liput.pakota) {
        const { url, koodi } = ampariHead(soitettava, kansio);
        if (koodi === '200') {
          console.log(`   on jo ämpärissä (${url}) — ohitetaan. --pakota kirjoittaa yli.`);
          ohitettuja += 1;
          continue;
        }
      }

      const kohde = join(kohdekansio, tyo.nimi);
      const lahde = join(raakakansio, `raaka-${tyo.nimi}`);
      // eslint-disable-next-line no-await-in-loop
      const tavut = await haeApista(tyo.puhe, liput.aani, avain, lahde);
      console.log(`   API: ${(tavut / 1024).toFixed(0)} kt → ${lahde}`);

      const { leikattu, mitattu, korjaus } = viimeistele(lahde, kohde, tyokansio, liput.tempo);
      console.log(`   leikkaus: ${leikattu.toFixed(2)} s, taso ${mitattu.taso.toFixed(1)} LUFS, `
        + `korjaus ${korjaus.toFixed(2)} dB, tempo ${liput.tempo}`);

      const tulos = tarkista(kohde);
      console.log(`   valmis: ${tulos.pituus.toFixed(2)} s, `
        + `${tulos.taso === null ? '?' : tulos.taso.toFixed(1)} LUFS`);
      if (tulos.virheet.length) {
        for (const virhe of tulos.virheet) console.error(`   VIRHE: ${virhe}`);
        virheita += 1;
        // Kelvotonta äänitettä ei viedä; tiedosto jää levylle
        // kuunneltavaksi, koska kutsu on jo maksettu.
        continue;
      }
      if (tulos.pituus > tyo.kuplaSekunteina) {
        console.log(`   HUOM: ääni ${tulos.pituus.toFixed(2)} s > kuplan aika `
          + `${tyo.kuplaSekunteina} s — loppu jää seuraavan kuplan alle (lyhennä repliikkiä).`);
      }
      const rivi = { kesto: Number(tulos.pituus.toFixed(2)), kaikuKesto: null };
      valmiit.push(tyo.nimi);
      if (tyo.kaikuNimi) {
        /*
         * Saapumisrepliikin kaikuversio. Tasoa ei mitata: alun väistely
         * laskee integroitua tasoa tarkoituksella (ks. KAIKU
         * SAAPUMISREPLIIKEISSÄ). Kesto tarkistetaan kuivan version
         * kestoa vasten — kaiun häntä saa venyttää sitä sekunnilla.
         */
        const kaikuKohde = join(kohdekansio, tyo.kaikuNimi);
        const kaikuKesto = teeKaiku(kohde, kaikuKohde);
        console.log(`   kaiku: ${kaikuKesto.toFixed(2)} s → ${tyo.kaikuNimi} `
          + `(häipymä ${KAIUN_KESTO} s)`);
        rivi.kaikuKesto = Number(kaikuKesto.toFixed(2));
        valmiit.push(tyo.kaikuNimi);
      }
      kestot.set(tyo.avain, rivi);
    }

    // Manifesti kuvaa AINA koko repliikistön, ei vain tämän ajon osaa:
    // se on ämpärin sisällysluettelo eikä ajon kuitti.
    const manifesti = kokoaManifesti(kaikki, kestot);
    const manifestiPolku = join(kohdekansio, MANIFESTI);
    writeFileSync(manifestiPolku, `${JSON.stringify(manifesti, null, 2)}\n`);
    console.log(`\nManifesti: ${manifestiPolku}`);

    if (liput.vienti) {
      for (const nimi of valmiit) vieAmpariin(join(kohdekansio, nimi), nimi, kansio);
      vieAmpariin(manifestiPolku, MANIFESTI, kansio, 'application/json');
    }
  } finally {
    rmSync(tyokansio, { recursive: true, force: true });
  }

  console.log('');
  if (!liput.vienti) {
    console.log('Vienti ohitettiin (--ei-vientia). Tiedostot:');
    for (const nimi of valmiit) console.log(`  ${join(kohdekansio, nimi)}`);
  } else {
    console.log(`Viety ämpäriin: ${valmiit.length} tiedostoa + manifesti`
      + `${ohitettuja ? `, ohitettu jo olemassa olevia: ${ohitettuja}` : ''}.`);
    for (const nimi of valmiit) {
      const { url, koodi } = ampariHead(nimi, kansio);
      const kunnossa = koodi === '200';
      if (!kunnossa) virheita += 1;
      console.log(`  ${url} → HTTP ${koodi ?? '?'}${kunnossa ? '' : '  ← EI VASTAA'}`);
    }
    console.log('');
    console.log('KUUNTELE äänet ennen kuin ne jäävät peliin: pulun pitää kuulostaa '
      + 'käheältä ja nopealta, ja saapumisrepliikin kaiun pitää häipyä pois '
      + 'ennen kuin lause loppuu.');
  }
  process.exit(virheita ? 1 : 0);
}

if (process.argv[1] === TAMA) await main();
