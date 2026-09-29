/*
 * Dioraamamoottorin CODEX-TUONTITYÖKALU (Linnanrakentaja, erä 2). Tuo Codexin
 * toimittamat maalatut pinnat, kokin atlas ja liekit toimituskansiosta
 * (~/Documents/Codex/<pvm>/dioraama-osa1/, kansiot final/ + previews/ +
 * manifest.json) kansioon assets/dioraama/. Tilaus: posti/fable-codex-
 * dioraama-osa1-20260929.md (haettavissa `git show origin/claude/postilaatikko:
 * posti/fable-codex-dioraama-osa1-20260929.md`). Speksi: docs/raportit/
 * dioraama-rajapinnat-era2-20260929.md kohta 1 ("Lähteet ja paketti"), joka
 * kertoo mihin tämän kirjoittamat tiedostot päätyvät: media.mjs:n
 * kopioiPinnanKuva/teeHenkilonAtlas/teeLiekinAtlas lukevat niitä sellaisenaan
 * (pinnat jo JPG:nä, hahmot/liekit PNG:nä) rakennuskoneen (rakenna.mjs) kautta.
 *
 * CLI: node tools/dioraama/tuo-codex.mjs <toimituskansio> [--kuiva]
 *   Aja repon juuresta (kohdepolut ovat assets/dioraama/-suhteisia, sama
 *   käytäntö kuin media.mjs:n OLETUS_ASSETS_JUURI:ssä). --kuiva: tekee kaikki
 *   tarkistukset mutta ei kirjoita mitään levylle.
 *
 * PUTKI per manifestin tiedostorivi: tiedosto levyltä (toimituskansion juuresta
 * tai final/-alikansiosta) → sha256 + tavukoko manifestia vasten → tiedosto-
 * nimen tunnistus (laji+id+koko, ks. tunnistaNimi) → PNG auki OMALLA lukijalla
 * (node:zlib inflateSync + suotimien purku — sama tekniikka kuin
 * tools/tarkista-karttapisteet.mjs ja tools/savukkeet/savuke-ihmisen-
 * rintama.mjs) → mitat ja värityyppi tilausta vasten → laatuvaroitukset
 * (alfahistogrammi, jalkapohjat, saumattomuus) → kirjoitus kohteeseen.
 *
 * VIRHE (estää KIRJOITUKSEN tälle yhdelle tiedostolle, muut tiedostot
 * käsitellään silti) vs. VAROITUS (ei estä kirjoitusta — tunnettuja Codex-
 * kvirkkejä, kuten alfa 245–254, ihminen voi hyväksyä harkinnalla): sha256,
 * tavukoko, tiedostonimen tunnistus, mitat ja värityyppi ovat VIRHE.
 * Alfahistogrammi, jalkapohjat, saumattomuus ja manifestin mode/icc_srgb
 * ovat VAROITUS.
 *
 * MANIFESTIN MUOTO ON LUETTU JOUSTAVASTI, koska tämän toimituksen (osa1)
 * manifest.json ei ollut olemassa kun tämä kirjoitettiin (~/Documents/Codex/
 * on tyhjä tällä koneella — toimitus on vielä tulossa). Malli on otettu
 * ainoasta löytyneestä oikeasta Codex-manifestista, posti/liitteet/codex-
 * historian13-26kuvaa-manifest-20260928.json ({files:[{filename,sha256,width,
 * height,bytes,mime,icc}]}), ja tilauksen omasta kenttäluettelosta (sha256,
 * koko, mode, icc_srgb). Tiedostolista luetaan avaimesta files TAI tiedostot,
 * tai koko manifesti tulkitaan tiedostonimi→tiedot-kartaksi. Rivin kentät
 * luetaan avaimista sha256|sha, koko|bytes|size|tavua, mode|varitila|
 * colorMode, icc_srgb|iccSrgb|icc (merkkijono, joka sisältää "srgb", tulkitaan
 * todeksi — kuten mallin icc:"sRGB built-in"). "koko" voi olla tavukoko
 * (numero → verrataan tiedostokokoon, VIRHE jos ei täsmää) tai [leveys,korkeus]
 * (verrataan PNG:n mittoihin, VAROITUS jos ei täsmää). PIKSELIMITAT LUETAAN
 * AINA itse PNG:stä, EI manifestista — se on ainoa tilauksen mukainen totuus.
 *
 * EI UUSIA NPM-RIIPPUVUUKSIA. PNG luetaan Noden zlibillä. Kirjoitus JPEG:ksi
 * (pinnat) macOS:n sipsillä (spawnSync, ks. onOlemassa) — puuttuessaan pinnan
 * kirjoitus epäonnistuu VIRHEELLÄ, muut lajit eivät tarvitse sipsiä lainkaan.
 */

import {
  readFileSync, existsSync, mkdirSync, copyFileSync,
} from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { createHash } from 'node:crypto';
import { inflateSync } from 'node:zlib';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

/** Sama käytäntö kuin media.mjs:n OLETUS_ASSETS_JUURI: repon juureen suhteessa oleva polku. */
export const OLETUS_ASSETS_JUURI = 'assets/dioraama';

const JPEG_LAATU = 90; // sips -s formatOptions <0-100> (tilaus: "sips JPEG laatu 90, sRGB säilyy")

/* ==================== Tilauksen mitat (posti/fable-codex-dioraama-osa1-20260929.md) ==================== */

/** Pinnat: kaikki 1024² paitsi leikkaus ja tiili (2048×512, toistuvat vaakaan). */
export const PINTA_KOOT = {
  kivi: [1024, 1024],
  leikkaus: [2048, 512],
  rappaus: [1024, 1024],
  lankku: [1024, 1024],
  puu: [1024, 1024],
  katto: [1024, 1024],
  tiili: [2048, 512],
  kallio: [1024, 1024],
  vesi: [1024, 1024],
};

/** Liekkien atlaskoot (koko kuva, ei yksittäinen ruutu). */
export const LIEKKI_KOOT = {
  tulisija: [1024, 512],
  kynttila: [256, 256],
  soihtu: [1024, 256],
};

/** Henkilökortin koko lajille "kortti" (tällä hetkellä vain koehahmo kokki). */
export const KORTTI_KOOT = {
  kokki: [512, 512],
};

/** hahmo/kortti-tiedoston id → pelin henkilöpankin id (js/dioraama/pankit/henkilot.js). */
export const HAHMO_HENKILOT = { kokki: 'kokki-1500' };

/** Kokin atlas: 2048×2048, ruudut 256×384, 8 saraketta (tilaus kohta 2). */
export const HAHMO_KOKO = [2048, 2048];
export const HAHMO_RUUTU = [256, 384]; // [leveys, korkeus] px
export const HAHMO_SARAKKEET = 8;
/** Silmukat riveittäin, ks. dioraama-rajapinnat-era2 kohta 2 (HENKILOT): ruutu i → k = rivi·sarakkeet+i. */
export const HAHMO_SILMUKAT = {
  idle: { rivi: 0, ruudut: 8 },
  tyo: { rivi: 1, ruudut: 12 },
  puhe: { rivi: 3, ruudut: 6 },
};
/** Jalkapohjat 15 px ruudun alareunan yläpuolella (pivot: [0.5, 15/384] speksissä). */
export const JALKA_MARGINAALI_PX = 15;

/* ==================== Laaturajat (karkeita, dokumentoituja heuristiikkoja) ==================== */

/** Yli tämän osuuden pikseleistä alfa 1–254 → reuna ei ole terävä (peli leikkaa 50 %:ssa). */
export const PEHMEA_REUNA_RAJA = 0.02;
/** Yli tämän osuuden pikseleistä alfa 245–254 → tunnettu Codex-ongelma (ks. muisti "UI-kuvien alfa 255"). */
export const EPAILYTTAVA_RAJA = 0.01;
/** Sauma hyväksytään enintään tämän kertaisena sisäosan tyypilliseen vierekkäiseroon nähden. */
export const SAUMA_KERROIN = 2.5;
/** Ohita mitättömän pienet erot (lähes yksivärinen pinta) ennen SAUMA_KERROIN-vertailua. */
export const SAUMA_VAHIMMAISERO = 6;

/* ==================== Tiedostonimen tunnistus ==================== */

// dioraama-<laji>-<id>-<koko>.png, koko = "1024" (neliö) tai "2048x512" (tilauksen oma kirjoitusasu).
const NIMI_RE = /^dioraama-([a-z]+)-([a-z0-9]+)-(\d+)(?:x(\d+))?\.png$/i;

/**
 * Tunnistaa tiedostonimen joustavasti (isot/pienet kirjaimet, × → x) ja tarkistaa
 * heti, että laji+id on tilauksen mukainen tunnettu yhdistelmä. Palauttaa
 * `{ laji, id, henkilo?, koko: [leveys,korkeus] (nimestä), kohdeTiedosto
 * (assetsJuuri-suhteinen), vaadiAlfa, odotettuKoko: [leveys,korkeus] (tilauksesta) }`
 * tai null, jos nimi ei täsmää tai laji/id ei ole tilauksessa mainittu.
 */
export function tunnistaNimi(tiedostonimiRaaka) {
  const tiedostonimi = String(tiedostonimiRaaka).trim().replace(/×/g, 'x');
  const m = NIMI_RE.exec(tiedostonimi);
  if (!m) return null;
  const laji = m[1].toLowerCase();
  const id = m[2].toLowerCase();
  const leveys = Number(m[3]);
  const korkeus = m[4] ? Number(m[4]) : leveys; // pelkkä luku = neliö
  const koko = [leveys, korkeus];

  if (laji === 'pinta') {
    if (!(id in PINTA_KOOT)) return null;
    return {
      laji, id, koko, kohdeTiedosto: `pinnat/${id}.jpg`, vaadiAlfa: false, odotettuKoko: PINTA_KOOT[id],
    };
  }
  if (laji === 'liekki') {
    if (!(id in LIEKKI_KOOT)) return null;
    return {
      laji, id, koko, kohdeTiedosto: `liekit/${id}.png`, vaadiAlfa: true, odotettuKoko: LIEKKI_KOOT[id],
    };
  }
  if (laji === 'hahmo') {
    const henkilo = HAHMO_HENKILOT[id];
    if (!henkilo) return null;
    return {
      laji, id, henkilo, koko, kohdeTiedosto: `hahmot/${henkilo}.png`, vaadiAlfa: true, odotettuKoko: HAHMO_KOKO,
    };
  }
  if (laji === 'kortti') {
    const henkilo = HAHMO_HENKILOT[id];
    if (!henkilo || !(id in KORTTI_KOOT)) return null;
    return {
      laji, id, henkilo, koko, kohdeTiedosto: `kortit/${henkilo}.png`, vaadiAlfa: false, odotettuKoko: KORTTI_KOOT[id],
    };
  }
  return null;
}

/* ==================== PNG-luku (itse kirjoitettu, sama tekniikka kuin ==================== */
/* tools/tarkista-karttapisteet.mjs ja tools/savukkeet/savuke-ihmisen-rintama.mjs) */

const PNG_ALLEKIRJOITUS = 0x89504e47;

function varityyppiModeksi(varityyppi) {
  return { 0: 'L', 2: 'RGB', 3: 'P', 4: 'LA', 6: 'RGBA' }[varityyppi] ?? `TUNTEMATON(${varityyppi})`;
}

/**
 * Purkaa 8-bittisen, ei-lomitetun RGB- tai RGBA-PNG:n. Palauttaa
 * `{ leveys, korkeus, varityyppi (PNG-arvo 2 tai 6), kanavat (3 tai 4),
 * rgba (Uint8ClampedArray, AINA 4 kanavaa — RGB saa alfan 255) }`.
 * Heittää selkeän suomenkielisen virheen tukemattomasta muodosta (bittisyvyys
 * ≠ 8, värityyppi ei RGB/RGBA, lomitus, tuntematon rivisuodin).
 */
export function luePng(buf) {
  if (buf.length < 8 || buf.readUInt32BE(0) !== PNG_ALLEKIRJOITUS) {
    throw new Error('ei PNG-tiedosto (allekirjoitus puuttuu tai väärä)');
  }
  let i = 8;
  let leveys = 0;
  let korkeus = 0;
  let bittisyvyys = 0;
  let varityyppi = 0;
  const idatPalat = [];
  while (i + 8 <= buf.length) {
    const pituus = buf.readUInt32BE(i);
    const tyyppi = buf.toString('latin1', i + 4, i + 8);
    const data = buf.subarray(i + 8, i + 8 + pituus);
    if (tyyppi === 'IHDR') {
      leveys = data.readUInt32BE(0);
      korkeus = data.readUInt32BE(4);
      bittisyvyys = data[8];
      varityyppi = data[9];
      if (data[10] !== 0 || data[11] !== 0) throw new Error('tukematon PNG (pakkaus- tai suodinmenetelmä)');
      if (data[12] !== 0) throw new Error('lomitettua (Adam7) PNG:tä ei tueta');
    } else if (tyyppi === 'IDAT') {
      idatPalat.push(data);
    } else if (tyyppi === 'IEND') {
      break;
    }
    i += 12 + pituus;
  }
  if (leveys === 0 || korkeus === 0) throw new Error('IHDR-lohko puuttuu tai on virheellinen');
  if (bittisyvyys !== 8) throw new Error(`tuettu vain 8-bittinen PNG (oli ${bittisyvyys})`);
  if (varityyppi !== 2 && varityyppi !== 6) {
    throw new Error(`tuettu vain värityyppi 2 (RGB) tai 6 (RGBA) (oli ${varityyppi}/${varityyppiModeksi(varityyppi)})`);
  }

  const kanavat = varityyppi === 6 ? 4 : 3;
  const raaka = inflateSync(Buffer.concat(idatPalat));
  const rivinPituus = leveys * kanavat;
  if (raaka.length !== (rivinPituus + 1) * korkeus) {
    throw new Error('puretun IDAT-datan koko ei täsmää leveys×korkeus×kanavat:iin');
  }
  const puskuri = new Uint8ClampedArray(korkeus * rivinPituus);
  let edellinen = new Uint8ClampedArray(rivinPituus);
  let p = 0;
  for (let y = 0; y < korkeus; y += 1) {
    const suodin = raaka[p];
    p += 1;
    const rivi = raaka.subarray(p, p + rivinPituus);
    p += rivinPituus;
    const ulosRivi = new Uint8ClampedArray(rivinPituus);
    for (let x = 0; x < rivinPituus; x += 1) {
      const a = x >= kanavat ? ulosRivi[x - kanavat] : 0;
      const b = edellinen[x];
      const c = x >= kanavat ? edellinen[x - kanavat] : 0;
      let arvo = rivi[x];
      if (suodin === 1) arvo += a;
      else if (suodin === 2) arvo += b;
      else if (suodin === 3) arvo += (a + b) >> 1;
      else if (suodin === 4) {
        const pp = a + b - c;
        const pa = Math.abs(pp - a);
        const pb = Math.abs(pp - b);
        const pc = Math.abs(pp - c);
        arvo += (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
      } else if (suodin !== 0) {
        throw new Error(`tuntematon PNG-rivisuodin ${suodin} rivillä ${y}`);
      }
      ulosRivi[x] = arvo & 0xff;
    }
    puskuri.set(ulosRivi, y * rivinPituus);
    edellinen = ulosRivi;
  }

  // Normalisoi aina RGBA:ksi jatkokäsittelyä varten (histogrammi/jalkapohjat/sauma
  // käsittelevät yhtä muotoa) — varityyppi säilyy erikseen "vaadiAlfa"-tarkistukseen.
  let rgba;
  if (kanavat === 4) {
    rgba = puskuri;
  } else {
    rgba = new Uint8ClampedArray(leveys * korkeus * 4);
    for (let px = 0, s = 0; px < leveys * korkeus; px += 1, s += 3) {
      rgba[px * 4] = puskuri[s];
      rgba[px * 4 + 1] = puskuri[s + 1];
      rgba[px * 4 + 2] = puskuri[s + 2];
      rgba[px * 4 + 3] = 255;
    }
  }
  return {
    leveys, korkeus, varityyppi, kanavat, rgba,
  };
}

/* ==================== Atlas/liekki: alfahistogrammi ja jalkapohjat ==================== */

/**
 * Alfakanavan jakauma neljään koriin: lapinakyva (0), pehmea (1–244, reunan
 * antialiasointi), epailyttava (245–254, tunnettu Codex-bugi — pitäisi olla
 * 255), peittava (255). `pikseleita` on nimittäjä osuuksille.
 */
export function alfaHistogrammi(rgba) {
  const pikseleita = rgba.length / 4;
  let lapinakyva = 0;
  let pehmea = 0;
  let epailyttava = 0;
  let peittava = 0;
  for (let i = 3; i < rgba.length; i += 4) {
    const a = rgba[i];
    if (a === 0) lapinakyva += 1;
    else if (a === 255) peittava += 1;
    else if (a >= 245) epailyttava += 1;
    else pehmea += 1;
  }
  return {
    pikseleita, lapinakyva, pehmea, epailyttava, peittava,
  };
}

/** Histogrammista ihmisluettavat varoitukset (PEHMEA_REUNA_RAJA, EPAILYTTAVA_RAJA). */
export function histogrammiVaroitukset(hist) {
  const v = [];
  const pehmeaOsuus = (hist.pehmea + hist.epailyttava) / hist.pikseleita;
  if (pehmeaOsuus > PEHMEA_REUNA_RAJA) {
    v.push(
      `pehmeä reuna: alfaa 1–254 ${(pehmeaOsuus * 100).toFixed(1)} %:ssa pikseleistä `
      + '(tilaus vaatii terävän reunan, peli leikkaa alfan 50 %:n kohdalta)',
    );
  }
  const epailyttavaOsuus = hist.epailyttava / hist.pikseleita;
  if (epailyttavaOsuus > EPAILYTTAVA_RAJA) {
    v.push(
      `alfa 245–254 ${(epailyttavaOsuus * 100).toFixed(1)} %:ssa pikseleistä: `
      + 'tunnettu Codex-ongelma, todennäköisesti pitäisi olla 255 (ks. muisti "UI-kuvien alfa 255")',
    );
  }
  return v;
}

/**
 * Tarkistaa, että jokaisen KÄYTETYN silmukkaruudun jalkapohjien rivi (15 px
 * ruudun alareunan yläpuolella, HAHMO_SILMUKAT + HAHMO_SARAKKEET mukaan
 * riveittäin juoksevana) sisältää ainakin yhden ei-läpinäkyvän pikselin.
 * Palauttaa taulukon (0 tai 1 alkiota) yhteenvetovaroituksia, ei per-ruutu.
 */
export function tarkistaJalkapohjat(rgba, leveysPx) {
  const [ruutuL, ruutuK] = HAHMO_RUUTU;
  const tyhjat = [];
  let tarkastettu = 0;
  for (const [silmukka, { rivi, ruudut }] of Object.entries(HAHMO_SILMUKAT)) {
    for (let i = 0; i < ruudut; i += 1) {
      const k = rivi * HAHMO_SARAKKEET + i;
      const absRivi = Math.floor(k / HAHMO_SARAKKEET);
      const sarake = k % HAHMO_SARAKKEET;
      const x0 = sarake * ruutuL;
      const y = absRivi * ruutuK + (ruutuK - JALKA_MARGINAALI_PX);
      tarkastettu += 1;
      let loytyi = false;
      for (let x = x0; x < x0 + ruutuL; x += 1) {
        if (rgba[(y * leveysPx + x) * 4 + 3] > 0) { loytyi = true; break; }
      }
      if (!loytyi) tyhjat.push(`${silmukka} ruutu ${i} (rivi ${absRivi}, sarake ${sarake})`);
    }
  }
  if (tyhjat.length === 0) return [];
  const naytteet = tyhjat.slice(0, 5).join(', ') + (tyhjat.length > 5 ? ', …' : '');
  return [`jalkapohjien rivi (${JALKA_MARGINAALI_PX} px alareunasta) tyhjä ${tyhjat.length}/${tarkastettu} ruudussa: ${naytteet}`];
}

/* ==================== Pinta: saumattomuuden karkea mittari ==================== */

function rgbEtaisyys(rgba, i, j) {
  const ii = i * 4;
  const jj = j * 4;
  return Math.abs(rgba[ii] - rgba[jj]) + Math.abs(rgba[ii + 1] - rgba[jj + 1]) + Math.abs(rgba[ii + 2] - rgba[jj + 2]);
}

/**
 * Karkea saumattomuusmittari: vasemman/oikean reunasarakkeen (kietoutumissauma
 * vaakatoistolle) ja ylä-/alarivin (pystytoistolle) keskimääräinen RGB-ero
 * verrattuna sisäosan tyypilliseen vierekkäiseen eroon (otannalla, nopeuden
 * vuoksi isoilla kuvilla). Palauttaa raa'at luvut — saumaVaroitukset tulkitsee.
 */
export function saumattomuusMittari(rgba, leveys, korkeus) {
  let saumaVaaka = 0; // sarake 0 vs. sarake (leveys-1), rivi kerrallaan
  for (let y = 0; y < korkeus; y += 1) saumaVaaka += rgbEtaisyys(rgba, y * leveys, y * leveys + (leveys - 1));
  saumaVaaka /= korkeus;

  let saumaPysty = 0; // rivi 0 vs. rivi (korkeus-1), sarake kerrallaan
  for (let x = 0; x < leveys; x += 1) saumaPysty += rgbEtaisyys(rgba, x, (korkeus - 1) * leveys + x);
  saumaPysty /= leveys;

  // Sisäosan tyypillinen vierekkäisero: otanta reunoja koskettamattomista pikseleistä.
  const askel = Math.max(1, Math.floor(Math.min(leveys, korkeus) / 64));
  let sisaVaakaSumma = 0;
  let sisaVaakaN = 0;
  for (let x = 1; x < leveys - 2; x += askel) {
    for (let y = 0; y < korkeus; y += askel) {
      sisaVaakaSumma += rgbEtaisyys(rgba, y * leveys + x, y * leveys + x + 1);
      sisaVaakaN += 1;
    }
  }
  let sisaPystySumma = 0;
  let sisaPystyN = 0;
  for (let y = 1; y < korkeus - 2; y += askel) {
    for (let x = 0; x < leveys; x += askel) {
      sisaPystySumma += rgbEtaisyys(rgba, y * leveys + x, (y + 1) * leveys + x);
      sisaPystyN += 1;
    }
  }
  return {
    saumaVaaka,
    saumaPysty,
    sisaVaaka: sisaVaakaSumma / (sisaVaakaN || 1),
    sisaPysty: sisaPystySumma / (sisaPystyN || 1),
  };
}

/** Mittarista ihmisluettavat varoitukset (SAUMA_KERROIN, SAUMA_VAHIMMAISERO). */
export function saumaVaroitukset(m) {
  const v = [];
  if (m.saumaVaaka > SAUMA_VAHIMMAISERO && m.saumaVaaka > m.sisaVaaka * SAUMA_KERROIN) {
    v.push(
      `sauma vasen/oikea reuna (vaakatoisto): ero ${m.saumaVaaka.toFixed(1)}, `
      + `sisäosan tyypillinen ${m.sisaVaaka.toFixed(1)} — ei vaikuta saumattomalta`,
    );
  }
  if (m.saumaPysty > SAUMA_VAHIMMAISERO && m.saumaPysty > m.sisaPysty * SAUMA_KERROIN) {
    v.push(
      `sauma ylä/ala reuna (pystytoisto): ero ${m.saumaPysty.toFixed(1)}, `
      + `sisäosan tyypillinen ${m.sisaPysty.toFixed(1)} — ei vaikuta saumattomalta`,
    );
  }
  return v;
}

/* ==================== Manifest.json: joustava luku (ks. tiedoston yläkommentti) ==================== */

/**
 * Normalisoi yhden manifestirivin tunnettuihin avainniin. `nimi` on tiedoston
 * nimi (mistä avaimesta tahansa löytyi), `koko` säilyy SELLAISENAAN (numero
 * tai [leveys,korkeus] — kasitteleTiedosto päättää tulkinnan), `iccSrgb` on
 * boolean tai null (tuntematon).
 */
export function normalisoiRivi(rivi) {
  const nimi = rivi?.filename ?? rivi?.tiedosto ?? rivi?.nimi ?? rivi?.path ?? rivi?.polku ?? rivi?.file ?? null;
  const sha256 = rivi?.sha256 ?? rivi?.sha ?? null;
  const koko = rivi?.koko ?? rivi?.bytes ?? rivi?.size ?? rivi?.tavua ?? null;
  const mode = rivi?.mode ?? rivi?.varitila ?? rivi?.colorMode ?? null;
  let iccSrgb = rivi?.icc_srgb ?? rivi?.iccSrgb ?? null;
  if (iccSrgb == null && typeof rivi?.icc === 'string') iccSrgb = /srgb/i.test(rivi.icc);
  return {
    nimi, sha256, koko, mode, iccSrgb,
  };
}

/**
 * Poimii tiedostolistan manifestin juuresta: `files`/`tiedostot`-taulukko,
 * manifesti itse taulukkona, tai tiedostonimi→tiedot-kartta (avaimet, jotka
 * näyttävät .png/.jpg-tiedostonimiltä). Heittää, jos mikään ei täsmää —
 * silloin manifestin muoto on niin erilainen, ettei sitä kannata arvata.
 */
export function poimiTiedostot(manifesti) {
  const lista = Array.isArray(manifesti) ? manifesti
    : Array.isArray(manifesti?.files) ? manifesti.files
      : Array.isArray(manifesti?.tiedostot) ? manifesti.tiedostot
        : null;
  if (lista) return lista.map(normalisoiRivi);
  // Codexin dioraama-toimitus (osa 1, 29.9.2026): surfaces[] / flames[] / characters[],
  // rivillä `file` (polku final/...), `bytes`, `sha256`, `size` [w, h].
  const lajit = ['surfaces', 'flames', 'characters', 'cards'].filter((k) => Array.isArray(manifesti?.[k]));
  if (lajit.length > 0) {
    return lajit.flatMap((k) => manifesti[k]).map((r) => normalisoiRivi({
      ...r, filename: String(r.file ?? r.filename ?? '').split('/').pop(), size: r.bytes ?? r.size,
    }));
  }
  if (manifesti && typeof manifesti === 'object') {
    const avaimet = Object.keys(manifesti).filter((k) => /\.(png|jpe?g)$/i.test(k));
    if (avaimet.length > 0) {
      return avaimet.map((nimi) => normalisoiRivi({ filename: nimi, ...manifesti[nimi] }));
    }
  }
  throw new Error(
    'manifest.json: tiedostolistaa ei löytynyt (odotettiin files[], tiedostot[] tai tiedostonimi→tiedot-karttaa)',
  );
}

/** Lukee ja jäsentää `<toimituskansio>/manifest.json`, palauttaa poimiTiedostot()-listan. */
export function lueManifesti(toimituskansio) {
  const polku = resolve(toimituskansio, 'manifest.json');
  let raaka;
  try {
    raaka = readFileSync(polku, 'utf8');
  } catch (e) {
    throw new Error(`manifest.json ei löydy tai ei voida lukea (${polku}): ${e.message}`);
  }
  let manifesti;
  try {
    manifesti = JSON.parse(raaka);
  } catch (e) {
    throw new Error(`manifest.json ei ole kelvollista JSONia (${polku}): ${e.message}`);
  }
  return poimiTiedostot(manifesti);
}

/** Tiedosto löytyy joko toimituskansion juuresta tai sen final/-alikansiosta (molempia esiintyy toimituksissa). */
function etsiLahdePolku(toimituskansio, manifestinNimi) {
  const ehdokkaat = [
    resolve(toimituskansio, manifestinNimi),
    resolve(toimituskansio, 'final', basename(manifestinNimi)),
  ];
  return ehdokkaat.find((p) => existsSync(p)) ?? null;
}

/** Onko komento PATH:ssa (esim. "sips") — samat semantiikat kuin tools/tee-pienet-kuvat.mjs:n onOlemassa. */
function onOlemassa(komento) {
  return spawnSync('which', [komento], { encoding: 'utf8' }).status === 0;
}

/* ==================== Kirjoitus (ei --kuiva) ==================== */

/** Pinta: alkuperäinen PNG sipsillä JPEG:ksi (laatu JPEG_LAATU), sRGB-profiili säilyy. */
function kirjoitaPintaJpg(lahdePolku, assetsJuuri, id) {
  if (!onOlemassa('sips')) {
    throw new Error('sips-komentoa ei löytynyt (macOS vaaditaan pintojen PNG→JPG-muunnokseen)');
  }
  const kohde = resolve(assetsJuuri, 'pinnat', `${id}.jpg`);
  mkdirSync(dirname(kohde), { recursive: true });
  const tulos = spawnSync(
    'sips',
    ['-s', 'format', 'jpeg', '-s', 'formatOptions', String(JPEG_LAATU), lahdePolku, '--out', kohde],
    { encoding: 'utf8' },
  );
  if (tulos.status !== 0) {
    throw new Error(`sips epäonnistui (${tulos.status}): ${(tulos.stderr || tulos.stdout || '?').trim()}`);
  }
  return kohde;
}

/** Hahmo/liekki/kortti: suora tavukopio (ei uudelleenpakkausta — lähde on jo oikea PNG). */
function kirjoitaKopio(lahdePolku, assetsJuuri, suhteellinenKohde) {
  const kohde = resolve(assetsJuuri, suhteellinenKohde);
  mkdirSync(dirname(kohde), { recursive: true });
  copyFileSync(lahdePolku, kohde);
  return kohde;
}

/* ==================== Yhden tiedoston putki ==================== */

/**
 * Käsittelee yhden manifestirivin: eheys (sha256+koko) → nimen tunnistus →
 * PNG auki → mitat/värityyppi tilausta vasten → laatuvaroitukset → kirjoitus
 * (ellei virheitä tai --kuiva). Palauttaa raportin: `{ tiedosto, kohde, mitat,
 * tila, virheet, varoitukset }`. EI KOSKAAN heitä — kaikki virheet kerätään
 * riviin, jotta yhden tiedoston ongelma ei keskeytä muiden käsittelyä.
 */
export function kasitteleTiedosto(toimituskansio, manifestiRivi, assetsJuuri, kuiva) {
  const virheet = [];
  const varoitukset = [];
  const nimi = manifestiRivi?.nimi ?? '(nimetön manifestirivi)';
  const rivi = {
    tiedosto: nimi, kohde: null, mitat: null, tila: 'ohitettu (virhe)', virheet, varoitukset,
  };
  if (!manifestiRivi?.nimi) {
    virheet.push('manifestirivillä ei ole tiedostonimeä (filename/tiedosto/nimi/path/polku/file puuttuu)');
    return rivi;
  }

  const lahdePolku = etsiLahdePolku(toimituskansio, nimi);
  if (!lahdePolku) {
    virheet.push('tiedostoa ei löydy (kokeiltu toimituskansion juuresta ja final/-alikansiosta)');
    return rivi;
  }

  let tavut;
  try {
    tavut = readFileSync(lahdePolku);
  } catch (e) {
    virheet.push(`tiedostoa ei voi lukea: ${e.message}`);
    return rivi;
  }

  if (manifestiRivi.sha256) {
    const oikeaSha = createHash('sha256').update(tavut).digest('hex');
    if (oikeaSha.toLowerCase() !== String(manifestiRivi.sha256).toLowerCase()) {
      virheet.push(`sha256 ei täsmää (manifesti ${manifestiRivi.sha256}, tiedosto ${oikeaSha})`);
    }
  } else {
    varoitukset.push('manifestissa ei sha256-kenttää tälle tiedostolle — eheyttä ei voitu tarkistaa');
  }
  if (typeof manifestiRivi.koko === 'number' && manifestiRivi.koko !== tavut.length) {
    virheet.push(`koko ei täsmää (manifesti ${manifestiRivi.koko} t, tiedosto ${tavut.length} t)`);
  }

  const tunniste = tunnistaNimi(basename(nimi));
  if (!tunniste) {
    virheet.push('tiedostonimeä ei tunnistettu (laji/id ei ole tilauksen mukainen — ks. tunnistaNimi)');
    try {
      const kuva = luePng(tavut);
      rivi.mitat = `${kuva.leveys}×${kuva.korkeus}`;
    } catch { /* pelkkä lisätieto raporttiin — ei estä virheen palautusta */ }
    return rivi;
  }

  let kuva;
  try {
    kuva = luePng(tavut);
  } catch (e) {
    virheet.push(`PNG ei aukea: ${e.message}`);
    return rivi;
  }
  rivi.mitat = `${kuva.leveys}×${kuva.korkeus}`;
  rivi.kohde = tunniste.kohdeTiedosto;

  const [odotettuL, odotettuK] = tunniste.odotettuKoko;
  if (kuva.leveys !== odotettuL || kuva.korkeus !== odotettuK) {
    virheet.push(`mitat eivät täsmää tilaukseen (odotettiin ${odotettuL}×${odotettuK}, oli ${kuva.leveys}×${kuva.korkeus})`);
  }
  if (tunniste.vaadiAlfa && kuva.varityyppi !== 6) {
    virheet.push(`värityyppi ${varityyppiModeksi(kuva.varityyppi)}: tilaus vaatii RGBA-alfakanavan (atlas/liekki)`);
  }

  // Manifestin metatiedot: pelkkiä varoituksia, koska itse pikselidata (kuva) on tarkistettu edellä.
  if (manifestiRivi.mode) {
    const oikeaMode = varityyppiModeksi(kuva.varityyppi);
    if (String(manifestiRivi.mode).toUpperCase() !== oikeaMode) {
      varoitukset.push(`manifestin mode (${manifestiRivi.mode}) ei täsmää tiedoston väritilaan (${oikeaMode})`);
    }
  }
  if (Array.isArray(manifestiRivi.koko) && manifestiRivi.koko.length === 2) {
    const [mLeveys, mKorkeus] = manifestiRivi.koko;
    if (mLeveys !== kuva.leveys || mKorkeus !== kuva.korkeus) {
      varoitukset.push(`manifestin koko [${mLeveys}, ${mKorkeus}] ei täsmää tiedoston mittoihin (${kuva.leveys}×${kuva.korkeus})`);
    }
  }
  if (manifestiRivi.iccSrgb === false) {
    varoitukset.push('manifesti: icc_srgb ei tosi — tarkista väriavaruus (tilaus vaatii sRGB:n)');
  } else if (manifestiRivi.iccSrgb == null) {
    varoitukset.push('manifestissa ei icc_srgb-tietoa tälle tiedostolle — sRGB oletettu tarkistamatta');
  }

  // Pikselitason laatuvaroitukset (eivät estä kirjoitusta, ks. tiedoston yläkommentti).
  if (tunniste.laji === 'hahmo' || tunniste.laji === 'liekki') {
    varoitukset.push(...histogrammiVaroitukset(alfaHistogrammi(kuva.rgba)));
  }
  if (tunniste.laji === 'hahmo') {
    varoitukset.push(...tarkistaJalkapohjat(kuva.rgba, kuva.leveys));
  }
  if (tunniste.laji === 'pinta') {
    varoitukset.push(...saumaVaroitukset(saumattomuusMittari(kuva.rgba, kuva.leveys, kuva.korkeus)));
  }

  if (virheet.length > 0) return rivi; // tila pysyy 'ohitettu (virhe)'
  if (kuiva) {
    rivi.tila = 'kuiva (ei kirjoitettu)';
    return rivi;
  }
  try {
    if (tunniste.laji === 'pinta') kirjoitaPintaJpg(lahdePolku, assetsJuuri, tunniste.id);
    else kirjoitaKopio(lahdePolku, assetsJuuri, tunniste.kohdeTiedosto);
    rivi.tila = 'kirjoitettu';
  } catch (e) {
    virheet.push(`kirjoitus epäonnistui: ${e.message}`);
    rivi.tila = 'ohitettu (virhe)';
  }
  return rivi;
}

/* ==================== Koko toimitus ==================== */

/**
 * Lukee `<toimituskansio>/manifest.json` ja käsittelee kaikki sen rivit
 * (kasitteleTiedosto). `assetsJuuri` (oletus OLETUS_ASSETS_JUURI = sama
 * käytäntö kuin media.mjs:ssä) voidaan antaa testeissä väliaikaiskansioksi,
 * jotta oikeaan assets/-kansioon ei kirjoiteta. Ei tulosta mitään —
 * tulostaRaportti hoitaa sen CLI-puolella.
 */
export function kasitteleToimitus(toimituskansio, { kuiva = false, assetsJuuri = OLETUS_ASSETS_JUURI } = {}) {
  const tiedostot = lueManifesti(toimituskansio);
  const rivit = tiedostot.map((manifestiRivi) => kasitteleTiedosto(toimituskansio, manifestiRivi, assetsJuuri, kuiva));
  return {
    rivit,
    kuiva,
    assetsJuuri,
    kirjoitettu: rivit.filter((r) => r.tila === 'kirjoitettu').length,
    kuivia: rivit.filter((r) => r.tila.startsWith('kuiva')).length,
    ohitettu: rivit.filter((r) => r.tila.startsWith('ohitettu')).length,
    varoituksellisia: rivit.filter((r) => r.varoitukset.length > 0).length,
  };
}

/* ==================== Raportti ja CLI ==================== */

function tulostaRaportti(tulos) {
  console.log(`${'TIEDOSTO'.padEnd(40)}  ${'KOHDE'.padEnd(26)}  ${'MITAT'.padEnd(11)}  TILA / HUOMIOT`);
  for (const r of tulos.rivit) {
    const huomiot = [
      ...r.virheet.map((v) => `VIRHE: ${v}`),
      ...r.varoitukset.map((v) => `varoitus: ${v}`),
    ].join('; ') || 'ok';
    console.log(
      `${String(r.tiedosto).padEnd(40)}  ${String(r.kohde ?? '-').padEnd(26)}  `
      + `${String(r.mitat ?? '-').padEnd(11)}  ${r.tila}: ${huomiot}`,
    );
  }
  console.log('');
  console.log(
    `${tulos.rivit.length} tiedostoa: ${tulos.kirjoitettu} kirjoitettu, ${tulos.kuivia} kuivana (ei kirjoitettu), `
    + `${tulos.ohitettu} ohitettu virheen vuoksi, ${tulos.varoituksellisia} varoituksin.`
    + `${tulos.kuiva ? ' [KUIVA-AJO — mikään ei mennyt levylle]' : ''}`,
  );
  if (!tulos.kuiva) console.log(`kohdekansio: ${resolve(tulos.assetsJuuri)}`);
}

function main() {
  const argv = process.argv.slice(2);
  const kuiva = argv.includes('--kuiva');
  const vapaat = argv.filter((a) => !a.startsWith('--'));
  const toimituskansio = vapaat[0];
  if (!toimituskansio) {
    console.error('Käyttö: node tools/dioraama/tuo-codex.mjs <toimituskansio> [--kuiva]');
    process.exitCode = 1;
    return;
  }
  const tulos = kasitteleToimitus(resolve(toimituskansio), { kuiva });
  tulostaRaportti(tulos);
  if (tulos.ohitettu > 0) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    main();
  } catch (err) {
    console.error(err?.stack ?? String(err));
    process.exitCode = 1;
  }
}
