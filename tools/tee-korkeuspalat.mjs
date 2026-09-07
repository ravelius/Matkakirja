/*
 * TEE KORKEUSPALAT: ETOPO1:n natiivi 1 kaariminuutti 10°×10°-paloina.
 *
 *   node tools/tee-korkeuspalat.mjs [--lahde ncei|erddap] [--ulos <kansio>]
 *        [--valimuisti <kansio>] [--palat N40E000,N30E020] [--koeajo]
 *        [--nouda] [--osa k/n] [--kokoa n]
 *
 * RINNAKKAISUUS (omistaja 7.9.2026: kaikki ytimet käyttöön). Pala ei
 * riipu naapuristaan, ja työstä lähes kaikki on gzip −9 eli puhdasta
 * yhden ytimen laskentaa, joten palat jaetaan kaistoihin:
 *
 *   --nouda      hakee ja purkaa VAIN lähdeaineiston välimuistiin.
 *                Ajetaan kerran ennen kaistoja, jottei jokainen kaista
 *                lataisi samaa 322 Mt:n zipiä.
 *   --osa k/n    pilkkoo vain oman kaistansa palat ja kirjoittaa niistä
 *                oman luettelonsa (luettelo-osa-k-n.json), EI luettelo.json:ia.
 *   --kokoa n    ei pilko mitään: lukee n kaistan luettelot, tarkistaa
 *                että jokainen pala on levyllä ja kirjoittaa niistä
 *                yhden luettelo.json:in samassa järjestyksessä kuin
 *                peräkkäinen ajo (palat lounaasta koilliseen).
 *
 * === MIKSI TÄMÄ ON OLEMASSA =========================================
 *
 * Omistajan kokeilu 1.9.2026, sanatarkka: *"korkeusdatan 1′-ajoa
 * simuloidaan liverenderöinnillä pelissä: ensin haetaan normaali pohja
 * laatoista ja sitten peli rakentaa reaaliajassa tarkemman
 * korkeusvarjostuksen."* Peli tarvitsee siis ETOPO1:n natiivin
 * ruudukon SELAIMEEN — ja se on 233 miljoonaa lukua eli 466 Mt
 * raakana. Kokonaisena sitä ei voi ladata, joten se pilkotaan
 * paloihin, joista peli noutaa vain näkyvän alueen.
 *
 * PALA ON 10° × 10° eli 600 × 600 solua. Luku on kompromissi, joka on
 * mitattu tässä kontissa (luvut alla): pienempi pala tarkoittaisi
 * enemmän pyyntöjä yhtä näkymää kohti, isompi taas sitä, että
 * Kreikkaa katsova pelaaja lataa puolet Balkanista turhaan. Yksi
 * z7-näkymä (noin 1,5° × 3°) osuu 1–4 palaan.
 *
 * === MUOTO ON SAMA KUIN 3′-AINEISTOLLA ==============================
 *
 * Yksi gzip, jonka sisällä on otsikko ja rivikohtaisesti
 * erotuskoodattu Int16-runko — täsmälleen sama resepti kuin
 * tools/tee-korkeusaineisto.mjs:llä, ja samasta syystä: naapurisolut
 * ovat lähes samat, joten erotus on pieni luku ja pakkautuu selvästi
 * paremmin kuin absoluuttiarvo. Molemmat askeleet ovat häviöttömiä
 * (tests/korkeuspalat.test.mjs purkaa palan takaisin ja vertaa).
 *
 *   tunnus    4 tavua   'MK1P'
 *   lon0      8         float64 LE — palan LOUNAISNURKKA
 *   lat0      8         float64 LE — palan lounaisnurkka
 *   ruutu     8         float64 LE — 1/60 astetta
 *   leveys    4         uint32 LE — 600
 *   korkeus   4         uint32 LE — 600
 *   runko     2 × n     Int16 LE, rivikohtainen erotus
 *
 * SUUNNAT OVAT SAMAT KUIN 3′-AINEISTOLLA, koska ne ovat ruudukon
 * tärkein sopimus: y = 0 on palan ETELÄREUNA ja y kasvaa pohjoiseen,
 * x = 0 on palan LÄNSIREUNA ja x kasvaa itään. Solu (x, y) on
 * ETOPO1:n hilapiste lon = lon0 + x/60, lat = lat0 + y/60.
 *
 * PALAT EIVÄT MENE PÄÄLLEKKÄIN: solu lon0 + 10° kuuluu jo seuraavaan
 * palaan. Reunan yli menevä bilineaarinen näyte tarvitsee siis
 * naapuripalan, ja juuri siksi lukijan on koottava näytteenottajansa
 * KAIKISTA tarvitsemistaan paloista eikä palasta kerrallaan.
 *
 * === AINEISTOA EI COMMITOIDA ========================================
 *
 * Koko maailma on 648 palaa ja satoja megatavuja. Sama sääntö kuin
 * dist/-kansiolla: historia paisuisi eikä sitä saisi enää pieneksi.
 * Palat viedään R2-ämpäriin polkuun `julisteet/korkeus/1min/`
 * työnkululla .github/workflows/vie-korkeuspalat.yml, ja laattapoltto
 * lukee ne sieltä. (Selainkerros, joka haki ne pelin puolelle, oli
 * omistajan kokeilu 1.9.2026 ja purettiin 2.9.2026: *"Ota live pois ja
 * polta 1 kaarisekuntti."*)
 *
 * === KAKSI LÄHDETTÄ =================================================
 *
 *   ncei    NOAA NCEI:n valmis binääri (etopo1_ice_g_i2.zip, 322 Mt).
 *           Yksi lataus, sen jälkeen kaikki palat luetaan levyltä.
 *           TÄMÄ ON OLETUS.
 *   erddap  NOAA:n ERDDAP, yksi griddap-kysely palaa kohti. Hitaampi
 *           ja pyyntöjä on satoja, mutta ei vaadi 322 Mt:n latausta
 *           eikä levytilaa — käyttökelpoinen, kun haetaan vain
 *           muutama pala.
 *
 * Kumpikaan ei ole varajärjestelmä toiselle: lähde valitaan
 * lipulla, ja jos valittu lähde ei vastaa, ajo kaatuu äänekkäästi.
 * Hiljainen vaihto toiseen lähteeseen tekisi kahdesta eri ajosta
 * saman näköisiä, vaikka niiden aineisto voi olla eri.
 *
 * Lähde: NOAA NGDC ETOPO1 Global Relief Model, Ice Surface, 1
 * kaariminuutti (Amante & Eakins 2009, doi:10.7289/V5C8276M).
 * Public domain (Yhdysvaltain liittovaltion viraston tuottama).
 *
 * Verkko: Noden fetch ei lue HTTPS_PROXYa ilman NODE_USE_ENV_PROXY=1
 * (ks. tools/hae-radiot.mjs). Työkalu käynnistää itsensä uudelleen.
 */
import { spawnSync } from 'node:child_process';
import {
  closeSync, createReadStream, createWriteStream, existsSync, mkdirSync,
  openSync, readFileSync, readSync, statSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import { createInflateRaw, gzipSync } from 'node:zlib';

import { lueNetCDF } from './hae-korkeusruudukko.mjs';

const TAMA = fileURLToPath(import.meta.url);
const AJETAAN_SUORAAN = Boolean(process.argv[1]) && resolve(process.argv[1]) === TAMA;

if (AJETAAN_SUORAAN && !process.env.NODE_USE_ENV_PROXY
  && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [TAMA, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

/* ------------------------------------------------------------ vakiot */

/** Palan tunnus tiedoston alussa. 3′-aineiston MKR3:n sisarus. */
export const PALAN_TUNNUS = 'MK1P';
/** Otsikon pituus tavuina: tunnus, lon0, lat0, ruutu, leveys, korkeus. */
export const PALAN_OTSIKKO = 4 + 8 + 8 + 8 + 4 + 4;
/** Palan sivun pituus asteina. */
export const PALAN_ASTEITA = 10;
/** Ruudun koko asteina: yksi kaariminuutti. */
export const PALAN_RUUTU = 1 / 60;
/** Soluja palan sivulla (10° × 60 solua asteessa). */
export const PALAN_SOLUJA = PALAN_ASTEITA * 60;

/** ETOPO1:n hilan mitat (grid registered, 1′). */
const ETOPO_SARAKKEITA = 21601; // lon -180 … +180
const ETOPO_RIVEJA = 10801; //     lat  +90 … -90, rivi 0 on pohjoisin

const NCEI_ZIP = 'https://www.ngdc.noaa.gov/mgg/global/relief/ETOPO1/data/'
  + 'ice_surface/grid_registered/binary/etopo1_ice_g_i2.zip';
const ERDDAP = 'https://coastwatch.pfeg.noaa.gov/erddap/griddap/etopo360';

export const LAHTEET = {
  aineisto: 'NOAA NGDC ETOPO1 Global Relief Model, Ice Surface, 1 kaariminuutti',
  viite: 'Amante & Eakins 2009, NOAA NCEI, doi:10.7289/V5C8276M',
  lisenssi: 'Public domain (Yhdysvaltain liittovaltion viraston tuottama). '
    + '"The data may be used and redistributed for free but is not intended '
    + 'for legal use, since it may contain inaccuracies."',
};

/* --------------------------------------------------------- nimeäminen */

/**
 * Palan nimi sen LOUNAISNURKASTA: N40E020, S30W070.
 *
 * Leveysaste kahdella ja pituusaste kolmella numerolla, koska silloin
 * nimet ovat samanmittaisia ja lajittuvat aakkosjärjestyksessä myös
 * numerojärjestykseen. Sama tapa kuin SRTM- ja ASTER-laatoilla, eli
 * kuka tahansa aineistoa käsitellyt tunnistaa sen ilman selitystä.
 */
export function palanNimi(lon0, lat0) {
  const ns = lat0 < 0 ? 'S' : 'N';
  const ew = lon0 < 0 ? 'W' : 'E';
  return `${ns}${String(Math.abs(lat0)).padStart(2, '0')}`
    + `${ew}${String(Math.abs(lon0)).padStart(3, '0')}`;
}

/** Nimestä takaisin nurkkaan; null jos nimi ei ole palan nimi. */
export function nimenNurkka(nimi) {
  const m = /^([NS])(\d{2})([EW])(\d{3})$/.exec(nimi);
  if (!m) return null;
  const lat0 = (m[1] === 'S' ? -1 : 1) * Number(m[2]);
  const lon0 = (m[3] === 'W' ? -1 : 1) * Number(m[4]);
  if (lat0 % PALAN_ASTEITA || lon0 % PALAN_ASTEITA) return null;
  if (lat0 < -90 || lat0 > 90 - PALAN_ASTEITA) return null;
  if (lon0 < -180 || lon0 > 180 - PALAN_ASTEITA) return null;
  return { lon0, lat0 };
}

/** Koko maailman palat lounaasta koilliseen. */
export function kaikkiPalat() {
  const ulos = [];
  for (let lat0 = -90; lat0 < 90; lat0 += PALAN_ASTEITA) {
    for (let lon0 = -180; lon0 < 180; lon0 += PALAN_ASTEITA) {
      ulos.push({ lon0, lat0, nimi: palanNimi(lon0, lat0) });
    }
  }
  return ulos;
}

/* ------------------------------------------------------ pakkaa / pura */

/**
 * Yksi pala tiedostoksi: otsikko + rivikohtainen erotus + gzip −9.
 *
 * @param {Int16Array} solut PALAN_SOLUJA² lukua, y = 0 etelässä.
 */
export function pakkaaPala({ lon0, lat0, leveys, korkeus, solut }) {
  if (solut.length !== leveys * korkeus) {
    throw new Error(`palassa ${solut.length} solua, odotettiin ${leveys * korkeus}`);
  }
  const otsikko = Buffer.alloc(PALAN_OTSIKKO);
  otsikko.write(PALAN_TUNNUS, 0, 'latin1');
  otsikko.writeDoubleLE(lon0, 4);
  otsikko.writeDoubleLE(lat0, 12);
  otsikko.writeDoubleLE(PALAN_RUUTU, 20);
  otsikko.writeUInt32LE(leveys, 28);
  otsikko.writeUInt32LE(korkeus, 32);

  const delta = new Int16Array(solut.length);
  for (let y = 0; y < korkeus; y += 1) {
    let edellinen = 0;
    for (let x = 0; x < leveys; x += 1) {
      const i = y * leveys + x;
      /*
       * Erotus lasketaan Int16-aritmetiikalla ja se saa kiertää yli:
       * purku tekee saman kierron toiseen suuntaan, joten kierto on
       * häviötön. Ilman tätä 8000 metrin huipun vieressä oleva −9000
       * metrin hauta ei mahtuisi erotukseen.
       */
      delta[i] = solut[i] - edellinen;
      edellinen = solut[i];
    }
  }
  return gzipSync(Buffer.concat([
    otsikko, Buffer.from(delta.buffer, delta.byteOffset, delta.byteLength),
  ]), { level: 9 });
}

/**
 * Purkaa gzipatun palan takaisin. Peilikuva pakkaajalle — testi ajaa
 * kummankin suuntaan.
 *
 * @param {Buffer} runko jo GUNZIPATTU sisältö
 */
export function puraPala(runko) {
  if (runko.length < PALAN_OTSIKKO) throw new Error('pala on liian lyhyt');
  if (runko.toString('latin1', 0, 4) !== PALAN_TUNNUS) {
    throw new Error('palan tunnus ei ole ' + PALAN_TUNNUS);
  }
  const lon0 = runko.readDoubleLE(4);
  const lat0 = runko.readDoubleLE(12);
  const ruutu = runko.readDoubleLE(20);
  const leveys = runko.readUInt32LE(28);
  const korkeus = runko.readUInt32LE(32);
  const n = leveys * korkeus;
  if (runko.length !== PALAN_OTSIKKO + n * 2) throw new Error('pala on vajaa');
  const solut = new Int16Array(n);
  let luettu = PALAN_OTSIKKO;
  for (let y = 0; y < korkeus; y += 1) {
    let edellinen = 0;
    for (let x = 0; x < leveys; x += 1) {
      edellinen = (edellinen + runko.readInt16LE(luettu)) << 16 >> 16;
      luettu += 2;
      solut[y * leveys + x] = edellinen;
    }
  }
  return {
    lon0, lat0, ruutu, leveys, korkeus, solut,
  };
}

/* --------------------------------------------------------------- ncei */

/**
 * NCEI:n zip levylle ja siitä purettu binääri.
 *
 * Zip puretaan Nodella eikä `unzip`-komennolla: peli ei ota
 * riippuvuuksia, eikä sen työkalupakki ota niitäkään ilman syytä.
 * Arkistossa on yksi deflate-jäsen, joten local file header riittää
 * — keskushakemistoa ei tarvitse lukea.
 */
async function nceiBinaari(valimuisti, kerro) {
  mkdirSync(valimuisti, { recursive: true });
  const zip = join(valimuisti, 'etopo1_ice_g_i2.zip');
  const bin = join(valimuisti, 'etopo1_ice_g_i2.bin');
  const odotettu = ETOPO_SARAKKEITA * ETOPO_RIVEJA * 2;
  if (existsSync(bin) && statSync(bin).size === odotettu) {
    kerro(`binääri välimuistista: ${bin}\n`);
    return bin;
  }
  if (!existsSync(zip) || statSync(zip).size < 1e8) {
    kerro(`lataan ${NCEI_ZIP}\n`);
    const v = await fetch(NCEI_ZIP, { signal: AbortSignal.timeout(1800000) });
    if (!v.ok) throw new Error(`NCEI vastasi HTTP ${v.status}`);
    await pipeline(v.body, createWriteStream(zip));
    kerro(`ladattu ${(statSync(zip).size / 1e6).toFixed(0)} Mt\n`);
  }
  // Local file header: PK\3\4, menetelmä 8:ssa, nimen ja lisän pituudet 26/28.
  const fd = openSync(zip, 'r');
  const paa = Buffer.alloc(30);
  readSync(fd, paa, 0, 30, 0);
  closeSync(fd);
  if (paa.readUInt32LE(0) !== 0x04034b50) throw new Error('ei ole zip-arkisto');
  const menetelmä = paa.readUInt16LE(8);
  if (menetelmä !== 8) throw new Error(`zip-jäsenen pakkaus ${menetelmä}, odotettiin deflate`);
  const alku = 30 + paa.readUInt16LE(26) + paa.readUInt16LE(28);
  kerro('puran zipiä…\n');
  await pipeline(
    createReadStream(zip, { start: alku }), createInflateRaw(), createWriteStream(bin),
  );
  const koko = statSync(bin).size;
  if (koko !== odotettu) {
    throw new Error(`purettu binääri on ${koko} tavua, odotettiin ${odotettu}`);
  }
  kerro(`purettu ${bin} (${(koko / 1e6).toFixed(0)} Mt)\n`);
  return bin;
}

/**
 * Yksi pala NCEI:n binääristä.
 *
 * Binäärin rivi 0 on POHJOISIN (lat +90) ja sarake 0 on lon −180, eli
 * pystysuunta on päinvastainen kuin palalla. Käännös tehdään tässä
 * eikä myöhemmin: väärin päin luettu ruudukko kääntää vuoret
 * laaksoiksi, eikä sitä huomaa kuin vertaamalla.
 */
function palaBinaarista(fd, { lon0, lat0 }) {
  const n = PALAN_SOLUJA;
  const solut = new Int16Array(n * n);
  const rivi = Buffer.alloc(n * 2);
  const sarake0 = Math.round((lon0 + 180) * 60);
  for (let y = 0; y < n; y += 1) {
    const lat = lat0 + y / 60;
    const tiedostoRivi = Math.round((90 - lat) * 60);
    const siirto = (tiedostoRivi * ETOPO_SARAKKEITA + sarake0) * 2;
    const luettu = readSync(fd, rivi, 0, rivi.length, siirto);
    if (luettu !== rivi.length) throw new Error('binääri loppui kesken');
    for (let x = 0; x < n; x += 1) solut[y * n + x] = rivi.readInt16LE(x * 2);
  }
  return solut;
}

/* ------------------------------------------------------------- erddap */

async function haeErddap(url, kerro) {
  for (let yritys = 1; yritys <= 4; yritys += 1) {
    try {
      const v = await fetch(url, { signal: AbortSignal.timeout(300000) });
      if (!v.ok) throw new Error(`HTTP ${v.status} ${(await v.text()).slice(0, 160)}`);
      return Buffer.from(await v.arrayBuffer());
    } catch (e) {
      if (yritys === 4) throw e;
      kerro(`  uusiksi (${yritys}): ${e.message}\n`);
      await new Promise((r) => { setTimeout(r, 3000 * yritys); });
    }
  }
  return null;
}

/**
 * Yksi pala ERDDAPista.
 *
 * ERDDAPin etopo360 on pituusasteilla 0…360, joten palan lounaisnurkka
 * käännetään sinne. 10°-palat eivät voi ylittää nollameridiaania
 * kesken, koska sekin on palan reuna — kierrosta ei siis tarvitse
 * käsitellä erikoistapauksena.
 */
async function palaErddapista({ lon0, lat0 }, kerro) {
  const n = PALAN_SOLUJA;
  const lat0i = Math.round((lat0 + 90) * 60);
  const lon0i = Math.round(((lon0 + 360) % 360) * 60);
  const kysely = `altitude[${lat0i}:1:${lat0i + n - 1}][${lon0i}:1:${lon0i + n - 1}]`;
  const nc = lueNetCDF(await haeErddap(`${ERDDAP}.nc?${encodeURIComponent(kysely)}`, kerro));
  const { muoto, data } = nc.altitude;
  if (muoto[0] !== n || muoto[1] !== n) {
    throw new Error(`ERDDAP palautti ${muoto[0]}×${muoto[1]}, odotettiin ${n}×${n}`);
  }
  /*
   * ERDDAPin lat kasvaa POHJOISEEN, eli sen rivijärjestys on jo palan
   * järjestys. Sarakkeet kasvavat itään kuten palallakin.
   */
  const solut = new Int16Array(n * n);
  for (let i = 0; i < solut.length; i += 1) solut[i] = Math.round(data[i]);
  return solut;
}

/* ---------------------------------------------------------------- ajo */

function valitsin(nimi, oletus) {
  const i = process.argv.indexOf(`--${nimi}`);
  if (i < 0) return oletus;
  const arvo = process.argv[i + 1];
  return arvo === undefined || arvo.startsWith('--') ? true : arvo;
}

/**
 * Koeajon palat: kolme maastoltaan erilaista ruutua, joista näkee
 * yhdellä silmäyksellä onko aineisto oikein päin.
 *
 *   N40E000  Alpit ja Pyreneet — jyrkkää vuoristoa
 *   N30E020  Kreikka ja itäinen Välimeri — saaristoa ja rannikkoa
 *   S30W070  Andit ja Argentiinan tasanko — jyrkin rinne mitä
 *            maailmassa on: 6560 metriä ja 29 metriä samassa palassa
 */
export const KOEAJON_PALAT = ['N40E000', 'N30E020', 'S30W070'];

/** Kaistan oman luettelon nimi: kokoava ajo lukee nämä järjestyksessä. */
const osanLuettelo = (k, n) => `luettelo-osa-${k}-${n}.json`;

/**
 * Aineiston oma sisällysluettelo.
 *
 * LUETTELO ON OSA AINEISTOA EIKÄ RAPORTTI. Peli lukee siitä ruudun
 * koon, palan mitat ja sen, MITKÄ palat ämpärissä ovat — ilman sitä
 * jokainen puuttuva pala olisi 404, joka näyttää verkkovirheeltä.
 * Lähde ja lisenssi kulkevat mukana samasta syystä kuin
 * 3′-aineistossa: aineiston pitää kantaa alkuperänsä itse.
 */
function kirjoitaLuettelo(polku, lahde, palat) {
  writeFileSync(polku, `${JSON.stringify({
    tunnus: PALAN_TUNNUS,
    ruutu: PALAN_RUUTU,
    asteita: PALAN_ASTEITA,
    leveys: PALAN_SOLUJA,
    korkeus: PALAN_SOLUJA,
    lahde: lahde === 'ncei' ? NCEI_ZIP : ERDDAP,
    ...LAHTEET,
    tehty: new Date().toISOString().slice(0, 10),
    palat,
  }, null, 1)}\n`);
}

async function main() {
  const lahde = String(valitsin('lahde', 'ncei'));
  if (lahde !== 'ncei' && lahde !== 'erddap') {
    throw new Error(`tuntematon lähde "${lahde}" — ncei tai erddap`);
  }
  const ulos = resolve(String(valitsin('ulos', 'korkeus/1min')));
  const valimuisti = resolve(String(valitsin('valimuisti',
    process.env.KORKEUSPALAT_VALIMUISTI || join(tmpdir(), 'matkakirja-korkeuspalat'))));
  const kerro = (t) => process.stderr.write(t);

  let halutut = null;
  const lista = valitsin('palat', null);
  if (typeof lista === 'string') halutut = lista.split(',').map((s) => s.trim()).filter(Boolean);
  else if (valitsin('koeajo', false)) halutut = KOEAJON_PALAT;

  let palat = kaikkiPalat();
  if (halutut) {
    const setti = new Set(halutut);
    for (const nimi of setti) {
      if (!nimenNurkka(nimi)) throw new Error(`"${nimi}" ei ole palan nimi (esim. N40E020)`);
    }
    palat = palat.filter((p) => setti.has(p.nimi));
    if (palat.length !== setti.size) throw new Error('osa pyydetyistä paloista ei ole maailmassa');
  }

  /* --kokoa n: kaistojen luettelot yhdeksi, ei yhtään palaa. */
  const kokoa = valitsin('kokoa', null);
  if (kokoa) {
    const n = Number(kokoa);
    if (!Number.isInteger(n) || n < 1) throw new Error('--kokoa <kaistojen määrä>');
    mkdirSync(ulos, { recursive: true });
    const yhdessa = [];
    for (let k = 0; k < n; k += 1) {
      const polku = join(ulos, osanLuettelo(k, n));
      if (!existsSync(polku)) throw new Error(`kaistan ${k} luettelo puuttuu: ${polku}`);
      yhdessa.push(...JSON.parse(readFileSync(polku, 'utf8')).palat);
    }
    /*
     * Kaistat ovat yhtenäisiä siivuja samasta järjestyksestä, joten
     * peräkkäin luettuina ne ovat täsmälleen sama järjestys kuin
     * peräkkäisajossa. Tarkistetaan silti, ettei pala ole kahdesti
     * eikä tiedosto puutu levyltä — vaiettu vajaa luettelo väittäisi
     * pelille, ettei palaa ole olemassa.
     */
    const nimet = new Set();
    for (const p of yhdessa) {
      if (nimet.has(p.nimi)) throw new Error(`pala ${p.nimi} on kahdessa kaistassa`);
      nimet.add(p.nimi);
      if (!existsSync(join(ulos, `${p.nimi}.bin.gz`))) {
        throw new Error(`luettelossa on pala ${p.nimi}, jota ei ole levyllä`);
      }
    }
    if (nimet.size !== palat.length) {
      throw new Error(`kaistoilla on ${nimet.size} palaa, odotettiin ${palat.length}`);
    }
    kirjoitaLuettelo(join(ulos, 'luettelo.json'), lahde, yhdessa);
    kerro(`luettelo.json koottu ${n} kaistasta: ${yhdessa.length} palaa\n`);
    return;
  }

  /* --nouda: vain lähdeaineisto välimuistiin, ennen kaistoja. */
  if (valitsin('nouda', false)) {
    if (lahde !== 'ncei') throw new Error('--nouda koskee vain ncei-lähdettä');
    const bin = await nceiBinaari(valimuisti, kerro);
    kerro(`aineisto valmiina: ${bin}\n`);
    return;
  }

  /*
   * --osa k/n: yhtenäinen siivu palalistasta. Siivu eikä joka n:s pala,
   * jotta kaistan luettelot voi liittää peräkkäin samaan järjestykseen
   * kuin peräkkäisajossa.
   */
  let osa = null;
  const osaLippu = valitsin('osa', null);
  if (typeof osaLippu === 'string') {
    const m = /^(\d+)\/(\d+)$/.exec(osaLippu);
    if (!m) throw new Error('--osa on muotoa k/n, esim. 0/8');
    const k = Number(m[1]);
    const n = Number(m[2]);
    if (n < 1 || k >= n) throw new Error(`--osa ${osaLippu}: k < n ja n >= 1`);
    osa = { k, n };
    const alku = Math.floor((k * palat.length) / n);
    const loppu = Math.floor(((k + 1) * palat.length) / n);
    palat = palat.slice(alku, loppu);
    kerro(`kaista ${k + 1}/${n}: palat ${alku}…${loppu - 1}\n`);
  }

  kerro(`aineisto: ${LAHTEET.aineisto}\nlisenssi: ${LAHTEET.lisenssi}\n\n`);
  kerro(`lähde ${lahde}, paloja ${palat.length}, ulos ${ulos}\n`);
  mkdirSync(ulos, { recursive: true });

  let fd = null;
  if (lahde === 'ncei') fd = openSync(await nceiBinaari(valimuisti, kerro), 'r');

  const t0 = Date.now();
  const luettelo = [];
  let tavuja = 0;
  for (const pala of palat) {
    const solut = fd
      ? palaBinaarista(fd, pala)
      : await palaErddapista(pala, kerro);
    let matalin = Infinity;
    let korkein = -Infinity;
    for (let i = 0; i < solut.length; i += 1) {
      if (solut[i] < matalin) matalin = solut[i];
      if (solut[i] > korkein) korkein = solut[i];
    }
    const pakattu = pakkaaPala({
      lon0: pala.lon0,
      lat0: pala.lat0,
      leveys: PALAN_SOLUJA,
      korkeus: PALAN_SOLUJA,
      solut,
    });
    writeFileSync(join(ulos, `${pala.nimi}.bin.gz`), pakattu);
    tavuja += pakattu.length;
    luettelo.push({
      nimi: pala.nimi,
      lon0: pala.lon0,
      lat0: pala.lat0,
      tavuja: pakattu.length,
      matalin,
      korkein,
    });
    kerro(`  ${pala.nimi}  ${(pakattu.length / 1024).toFixed(0)} kt  `
      + `${matalin}…${korkein} m\n`);
  }
  if (fd !== null) closeSync(fd);

  /*
   * Kaista kirjoittaa OMAN luettelonsa: yhteinen luettelo.json syntyy
   * vasta --kokoa-ajossa, koska kaistan luettelo väittäisi ämpärissä,
   * ettei muita paloja ole olemassa.
   */
  kirjoitaLuettelo(join(ulos, osa ? osanLuettelo(osa.k, osa.n) : 'luettelo.json'),
    lahde, luettelo);

  const sekuntia = (Date.now() - t0) / 1000;
  kerro(`\npaloja   ${luettelo.length}\n`);
  kerro(`yhteensä ${(tavuja / 1e6).toFixed(1)} Mt pakattuna `
    + `(raaka Int16 ${(luettelo.length * PALAN_SOLUJA ** 2 * 2 / 1e6).toFixed(1)} Mt, `
    + `suhde ${(tavuja / (luettelo.length * PALAN_SOLUJA ** 2 * 2) * 100).toFixed(0)} %)\n`);
  kerro(`aikaa    ${sekuntia.toFixed(1)} s\n`);
  kerro(`${ulos} — EI kuulu repoon, vie ämpäriin\n`);
}

if (AJETAAN_SUORAAN) {
  main().catch((e) => {
    process.stderr.write(`VIRHE: ${e.stack || e.message}\n`);
    process.exit(1);
  });
}
