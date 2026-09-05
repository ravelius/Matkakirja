/*
 * KARTTAPALLON LAATAT — juliste Millerista Web Mercator -laatoiksi.
 *
 *   node tools/tee-pallolaatat.mjs [--kuiva] [--min 0] [--max 7] [--nostot]
 *        [--ulos pallolaatat-ulos] [--alue lon0,lat0,lon1,lat1]
 *
 * OMISTAJAN TILAUS 4.9.2026 ilta ("Jos se tukee niin tee se suoraan
 * peliin ilman demoa"): pallo (js/pallo.js, Globe.gl 2.46) käyttää
 * laattamoottoria, joka hakee pinnan slippy map -laattoina (Web
 * Mercator XYZ, 256 px) vain katsotulle alueelle tarkkuustasoittain.
 * Yhden tekstuurin katto (z4, 8192 px, 128 Mt GPU-muistia) poistuu:
 * tarkkuus on tason 7 kohdalla 32768 px koko maailman leveydeltä, ja
 * puhelin pitää muistissa vain näkyvät laatat.
 *
 * Pelin juliste on Miller-projektiossa omassa ruudukossaan
 * (laattapyramidi, ämpärin julisteet/pyramidi/pyramidi.json), joten
 * tämä työkalu laskee jokaiselle Mercator-laatan pikselille
 * vastaavan arkin pikselin (sama kaava kuin tee-pallotekstuuri.mjs:
 * arkinPikseli) ja lukee sen lähdelaatasta. Lähdelaatat (pohja +
 * viivataso) noudetaan tarpeen mukaan ja pidetään pienessä
 * välimuistissa; koko arkkia ei koota, koska z6 olisi 43200 × 26308
 * pikseliä.
 *
 * LÄHDETASO: Mercator-taso Z on päiväntasaajalla 256·2^Z px / 360°,
 * pyramidin taso z on 675·2^z px / 360°, joten lähteeksi riittää
 * z = Z − 1 (Z0 → z0). Tasolle 7 lähde on siis z6.
 *
 * JULISTEEN ULKOPUOLI (yli 84° N, alle 66° S) täytetään merisävyllä ja
 * napajää jääsävyllä (ks. MERI_SAVY, JAA_SAVY); puuttuva lähdelaatta
 * (umpimeri, 404) merisävyllä. Kaikki laatat kirjoitetaan (myös meri ja
 * paperi), jotta pelin ei tarvitse tietää, mitkä laatat ovat olemassa:
 * kirjaston laattamoottori ei osaa varalaattaa.
 *
 * Tulos: <ulos>/<Z>/<X>/<Y>.jpg sekä <ulos>/laatat.json (versio,
 * tasot, laatan koko). Workflow tee-pallolaatat vie kansion polkuun
 * julisteet/pallo/laatat/<pyramidin versio>/ ja js/pallo.js osoittaa
 * versioon PALLO_LAATTAVERSIO.
 *
 * NOSTOTASON TIIVISTE LUETTELOON (pallolauta vaihe 3, karttapallo.md
 * luku 4.2). `--nostot`-ajossa laatat.json saa kentän `nostotaso`:
 * { versio, saanto, tasot: [Mercator-tasot, joilla nostot ovat],
 *   nostot: { tunnus: tiiviste } } — kopio pyramidi.jsonin
 * nostotaso-kentästä (tools/generoi-laattapyramidi.mjs), tasot
 * käännettyinä pallon omiksi (Z = z + 1, ks. lahdetaso). Pallo lukee
 * TÄSTÄ, mitkä nostot ovat sen laatoissa (js/pallo.js
 * pallonNostoOnPoltettu) ja piirtää vain muut elävinä
 * (js/pallolauta/nostot.js) — pyramidin oma luettelo ei kelpaa, koska
 * pallon sarja poltetaan eri hetkellä ja voi olla eri versiota.
 * Pohjasarjassa (ilman --nostot) kenttää ei ole: silloin laatoissa ei
 * ole yhtään nostoa ja pallo piirtää kaikki elävinä.
 *
 * Kuvankäsittely on sharp-kirjastolla (workflow asentaa sen ajoon).
 */
import { spawnSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { arkinPikseli, millerY, JULKINEN_JUURI } from './tee-pallotekstuuri.mjs';

const TAMA = fileURLToPath(import.meta.url);
if (process.argv[1] === TAMA && !process.env.NODE_USE_ENV_PROXY
  && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [TAMA, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

const LUETTELO = `${JULKINEN_JUURI}julisteet/pyramidi/pyramidi.json`;
/** Laatan koko pikseleinä (slippy map -vakio). */
export const LAATTA = 256;
export const LAATU = 80;
/*
 * JULISTEEN ULKOPUOLI ILMAN "HARMAATA HATTUA" (omistaja 5.9.2026: "Lisää
 * 4 tasolle navat ... Tai joku muu toteutus että päästään siitä harmaasta
 * hatusta eroon"). Aiemmin julisteen ulkopuoli (yli 84° N, alle 66° S)
 * täytettiin paperinsävyllä, joka erottui pallolla vaaleana lakkina.
 * Nyt täyte jatkaa julisteen MERISÄVYÄ (mitattu julisteesta), ja vasta
 * napajää (yli 84° N, alle 70° S) vaalenee hieman jääksi — Pohjoinen
 * jäämeri on merta ja Etelämanner jäätä, joten pallo ei näytä saumaa.
 * Napalakki 85°:n yläpuolella (Mercatorin raja) piirtyy kirjastossa
 * ylimmän laattarivin reunasävyllä venytettynä, joten se saa jääsävyn
 * automaattisesti näistä laatoista — mitattu 5.9.2026 (globeMaterial-
 * väri ei vaikuta lakkiin).
 */
export const MERI_SAVY = [208, 201, 183];
export const JAA_SAVY = [220, 214, 198];
export const JAA_RAJA = { pohjoinen: 84, etela: -70 };
const MERI_VARA = MERI_SAVY;
const RAD = Math.PI / 180;
/** Lähdelaattoja välimuistissa kerrallaan (512 × 512 × 4 t ≈ 1 Mt kukin). */
const VALIMUISTI = 160;

/**
 * Ämpärin kansio, johon laatat viedään. Nostotasollinen sarja (nimet ja
 * karttanostot poltettuina, omistaja 5.9.2026: "lisää palloon myös se
 * toinen kerros missä nimet ja kohteet") saa oman kansion, koska laatat
 * ovat selaimessa vuoden välimuistissa: sama polku eri sisällöllä
 * näyttäisi vanhaa.
 */
export const laattojenKansio = (versio, nostot = false) => `julisteet/pallo/laatat/${versio}${nostot ? '-nostot' : ''}/`;

/** Mercator-tason Z lähdetaso pyramidissa. */
export const lahdetaso = (Z) => Math.max(0, Z - 1);

/** Web Mercator -laatan (Z, X, Y) reunat asteina: { lansi, ita, pohjoinen, etela }. */
export function laatanReunat(Z, X, Y) {
  const n = 2 ** Z;
  const lat = (y) => (Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / n))) / RAD);
  return {
    lansi: (X / n) * 360 - 180,
    ita: ((X + 1) / n) * 360 - 180,
    pohjoinen: lat(Y),
    etela: lat(Y + 1),
  };
}

/** Laatan pikselirivin (0..LAATTA-1) leveysaste: Mercatorin käänteiskaava. */
export function rivinLeveysaste(Z, Y, rivi) {
  const n = 2 ** Z;
  const y = Y + (rivi + 0.5) / LAATTA;
  return Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / n))) / RAD;
}

async function noudaJson(url) {
  const v = await fetch(url, { cache: 'no-store' });
  if (!v.ok) throw new Error(`${url}: HTTP ${v.status}`);
  return v.json();
}

/**
 * Ämpärin noutotahti: R2 vastasi 429:llä, kun kaksi rinnakkaista tason
 * 8 ajoa hakivat z7-laattoja täyttä vauhtia (4.9.2026 ilta). Pyynnöt
 * tahditetaan vähintään NOUTOVALI ms:n välein, ja 429/5xx odotetaan
 * kasvavalla viiveellä (Retry-After kunnioitetaan) enintään 60 s.
 */
const NOUTOVALI_MS = 40;
let edellinenNouto = 0;
async function tahdita() {
  const nyt = Date.now();
  const odota = edellinenNouto + NOUTOVALI_MS - nyt;
  if (odota > 0) await new Promise((r) => setTimeout(r, odota));
  edellinenNouto = Date.now();
}

async function noudaLaatta(url, yrityksia = 9) {
  for (let i = 0; i < yrityksia; i += 1) {
    await tahdita(); // eslint-disable-line no-await-in-loop
    let v;
    try {
      v = await fetch(url); // eslint-disable-line no-await-in-loop
    } catch (e) {
      if (i === yrityksia - 1) throw e;
      await new Promise((r) => setTimeout(r, Math.min(60000, 1500 * 2 ** i))); // eslint-disable-line no-await-in-loop
      continue;
    }
    if (v.status === 404) return null;
    if (v.ok) return Buffer.from(await v.arrayBuffer()); // eslint-disable-line no-await-in-loop
    if (v.status !== 429 && v.status < 500) throw new Error(`${url}: HTTP ${v.status}`);
    if (i === yrityksia - 1) throw new Error(`${url}: HTTP ${v.status} (${yrityksia} yritystä)`);
    const retryAfter = Number(v.headers.get('retry-after')) * 1000;
    const viive = Math.min(60000, Math.max(retryAfter || 0, 1500 * 2 ** i));
    console.log(`HTTP ${v.status}, odotetaan ${Math.round(viive / 1000)} s (${url.slice(-30)})`);
    await new Promise((r) => setTimeout(r, viive)); // eslint-disable-line no-await-in-loop
  }
  return null;
}

/**
 * Lähdelaattojen lukija: antaa arkin pikselin (z, px, py) RGB:nä.
 * Pohja ja viivataso yhdistetään laattaa noudettaessa; puuttuva
 * pohjalaatta on merta.
 */
function teeLukija(luettelo, sharp, { nostot = false } = {}) {
  const L = luettelo.laatta ?? 512;
  const viivaversio = luettelo.viivataso?.versio ?? null;
  // Nostotaso (nimet, karttanostot) on vain tasoilla nostotaso.tasot (z5–z7).
  const nostoversio = nostot ? (luettelo.nostotaso?.versio ?? null) : null;
  const nostotasot = new Set(luettelo.nostotaso?.tasot ?? []);
  const muisti = new Map();
  let meri = null;
  const tilasto = { noudettu: 0, puuttui: 0 };
  async function laatta(z, tx, ty) {
    const avain = `${z}/${tx}/${ty}`;
    if (muisti.has(avain)) {
      const arvo = muisti.get(avain);
      muisti.delete(avain); muisti.set(avain, arvo); // tuoreimmaksi
      return arvo;
    }
    const taso = luettelo.tasot.find((t) => t.z === z);
    let ulos = null;
    if (tx >= 0 && ty >= 0 && tx < taso.sarakkeita && ty < taso.riveja) {
      const pohja = await noudaLaatta(`${JULKINEN_JUURI}julisteet/pyramidi/${luettelo.versio}/z${z}/${tx}/${ty}.webp`);
      if (pohja) {
        tilasto.noudettu += 1;
        const { data, info } = await sharp(pohja).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        const kuva = { data, w: info.width, h: info.height };
        if (!meri && tx === 0 && ty === taso.riveja - 1) meri = [data[(8 * info.width + 8) * 4], data[(8 * info.width + 8) * 4 + 1], data[(8 * info.width + 8) * 4 + 2]];
        const kerrokset = [];
        if (viivaversio) kerrokset.push(`${viivaversio}/viivat/z${z}/${tx}/${ty}.webp`);
        if (nostoversio && nostotasot.has(z)) kerrokset.push(`${nostoversio}/nostot/z${z}/${tx}/${ty}.webp`);
        for (const polku of kerrokset) {
          const kerros = await noudaLaatta(`${JULKINEN_JUURI}julisteet/pyramidi/${polku}`); // eslint-disable-line no-await-in-loop
          if (!kerros) continue;
          const v = await sharp(kerros).ensureAlpha().raw().toBuffer({ resolveWithObject: true }); // eslint-disable-line no-await-in-loop
          const n = Math.min(v.info.width * v.info.height, info.width * info.height);
          for (let i = 0; i < n; i += 1) {
            const a = v.data[i * 4 + 3] / 255;
            if (a <= 0) continue;
            for (let c = 0; c < 3; c += 1) data[i * 4 + c] = Math.round(data[i * 4 + c] * (1 - a) + v.data[i * 4 + c] * a);
          }
        }
        ulos = kuva;
      } else {
        tilasto.puuttui += 1;
      }
    }
    muisti.set(avain, ulos);
    if (muisti.size > VALIMUISTI) muisti.delete(muisti.keys().next().value);
    return ulos;
  }
  /**
   * Noutaa etukäteen kaikki lähdelaatat, joita arkin alue [px0, px1] ×
   * [py0, py1] tasolla z tarvitsee (x kiertää sauman yli). Tämän jälkeen
   * pikseli() on synkroninen — 65 536 awaitia laattaa kohti olisi
   * tuntien työ.
   */
  async function varmista(z, px0, px1, py0, py1) {
    const taso = luettelo.tasot.find((t) => t.z === z);
    const ty0 = Math.max(0, Math.floor(py0 / L));
    const ty1 = Math.min(taso.riveja - 1, Math.floor(py1 / L));
    const W = taso.leveys;
    const sarakkeet = new Set();
    let a = Math.floor(px0); let b = Math.floor(px1);
    if (b - a >= W) { a = 0; b = W - 1; }
    for (let x = a; x <= b + L; x += L) sarakkeet.add(Math.floor((((x % W) + W) % W) / L));
    sarakkeet.add(Math.floor((((b % W) + W) % W) / L));
    for (const tx of sarakkeet) {
      for (let ty = ty0; ty <= ty1; ty += 1) await laatta(z, tx, ty); // eslint-disable-line no-await-in-loop
    }
  }
  /** Arkin pikseli (px, py) tasolla z synkronisesti; laatta on varmistettu. */
  function pikseli(z, px, py, ulos, o) {
    const taso = luettelo.tasot.find((t) => t.z === z);
    const W = taso.leveys;
    const x = ((Math.floor(px) % W) + W) % W;
    const y = Math.min(taso.korkeus - 1, Math.max(0, Math.floor(py)));
    const k = muisti.get(`${z}/${Math.floor(x / L)}/${Math.floor(y / L)}`);
    if (!k) { const m = meri ?? MERI_VARA; ulos[o] = m[0]; ulos[o + 1] = m[1]; ulos[o + 2] = m[2]; return; }
    const i = ((y % L) * k.w + (x % L)) * 4;
    ulos[o] = k.data[i]; ulos[o + 1] = k.data[i + 1]; ulos[o + 2] = k.data[i + 2];
  }
  return { varmista, pikseli, tilasto, meri: () => meri ?? MERI_SAVY };
}

/**
 * Julisteen leveysasteväli: rajauksen ylä- ja alareuna asteina.
 * Millerin käänteiskaava: lat = (atan(exp(−y/1,25)) − π/4) / 0,4, missä
 * y on millerY-arvo (ruutu-y alaspäin, ks. tee-pallotekstuuri.mjs).
 */
export function julisteenLeveysvali(luettelo) {
  const p = luettelo.projektio;
  const sk = p.leveys / (2 * Math.PI);
  const yP = millerY(p.pohjoinen);
  const kaannos = (laudanY) => ((Math.atan(Math.exp(-(laudanY / sk + yP) / 1.25)) - Math.PI / 4) / 0.4) / RAD;
  const { rajaus } = luettelo;
  /*
   * VAIN KARTTA, EI ARKIN KALUSTEITA (löydös 5.9.2026 etusivun pallosta:
   * julisteen kartussi "MATKAKIRJA" ja kehys näkyivät pallolla
   * Jäämerellä). Rajaus kattaa arkin marginaalit kartan ylä- ja
   * alapuolella (kehys, kartussi, painajanrivi), jotka kuuluvat
   * tasokartalle mutta eivät pallon pinnalle. Pohjoisessa kartta
   * päättyy projektion pohjoisreunaan (76°); etelässä arkin alakehys
   * (kehys.ala px) vähennetään rajauksen alareunasta. Sen ulkopuoli
   * täytetään merellä ja jäällä (laskeLaatta).
   */
  const pohjoinen = Math.min(kaannos(rajaus.y), p.pohjoinen);
  const alakehys = Number(luettelo.kehys?.ala) || 0;
  const etela = kaannos(rajaus.y + rajaus.h - alakehys);
  return { pohjoinen, etela };
}

/** Laskee yhden Mercator-laatan RGB-puskurin. */
export async function laskeLaatta(luettelo, lukija, Z, X, Y) {
  const z = lahdetaso(Z);
  const taso = luettelo.tasot.find((t) => t.z === z);
  const n = 2 ** Z;
  const ulos = Buffer.alloc(LAATTA * LAATTA * 3);
  // Lähdelaatat etukäteen: pikselin x riippuu vain pituusasteesta ja y
  // vain leveysasteesta, joten reunat riittävät.
  const reunat = laatanReunat(Z, X, Y);
  const vali = julisteenLeveysvali(luettelo);
  const latY = Math.min(vali.pohjoinen - 1e-6, Math.max(vali.etela + 1e-6, reunat.pohjoinen));
  const latE = Math.min(vali.pohjoinen - 1e-6, Math.max(vali.etela + 1e-6, reunat.etela));
  const a0 = arkinPikseli(luettelo, taso, reunat.lansi + 1e-9, latY);
  const a1 = arkinPikseli(luettelo, taso, reunat.ita - 1e-9, latE);
  if (a0 && a1) {
    let px1 = a1.px; if (px1 < a0.px) px1 += taso.leveys; // sauman yli
    await lukija.varmista(z, a0.px, px1, Math.min(a0.py, a1.py), Math.max(a0.py, a1.py));
  }
  for (let r = 0; r < LAATTA; r += 1) {
    const lat = rivinLeveysaste(Z, Y, r);
    const tayte = (lat > JAA_RAJA.pohjoinen || lat < JAA_RAJA.etela) ? JAA_SAVY : (lukija.meri?.() ?? MERI_SAVY);
    for (let s = 0; s < LAATTA; s += 1) {
      const lon = ((X + (s + 0.5) / LAATTA) / n) * 360 - 180;
      const o = (r * LAATTA + s) * 3;
      const a = arkinPikseli(luettelo, taso, lon, lat);
      if (!a) { ulos[o] = tayte[0]; ulos[o + 1] = tayte[1]; ulos[o + 2] = tayte[2]; continue; }
      // Lähin pikseli riittää: lähdetaso on aina tiheämpi kuin kohde.
      lukija.pikseli(z, a.px, a.py, ulos, o);
    }
  }
  return ulos;
}

/**
 * Nostotason kirjaus pallon luetteloon: pyramidin nostotaso pallon
 * tasoina. Vain ne Mercator-tasot, joiden lähdetaso (lahdetaso) on
 * nostotasolla JA jotka tämä ajo kirjoitti.
 */
export function pallonNostotaso(luettelo, min, max) {
  const nt = luettelo?.nostotaso;
  if (!nt) return null;
  const lahteet = new Set(nt.tasot ?? []);
  const tasot = [];
  for (let Z = min; Z <= max; Z += 1) if (lahteet.has(lahdetaso(Z))) tasot.push(Z);
  return {
    versio: nt.versio ?? null,
    saanto: nt.saanto ?? null,
    tasot,
    nostot: { ...(nt.nostot ?? {}) },
  };
}

/** Laatat, jotka osuvat annettuun alueeseen (tai kaikki). */
export function tasonLaatat(Z, alue = null) {
  const n = 2 ** Z;
  const ulos = [];
  for (let Y = 0; Y < n; Y += 1) {
    for (let X = 0; X < n; X += 1) {
      if (alue) {
        const r = laatanReunat(Z, X, Y);
        if (r.ita <= alue[0] || r.lansi >= alue[2] || r.pohjoinen <= alue[1] || r.etela >= alue[3]) continue;
      }
      ulos.push([X, Y]);
    }
  }
  return ulos;
}

async function paa() {
  const argv = process.argv.slice(2);
  const lippu = (nimi) => { const i = argv.indexOf(nimi); return i >= 0 ? argv[i + 1] : null; };
  const kuiva = argv.includes('--kuiva');
  const min = Number(lippu('--min') ?? 0);
  const max = Number(lippu('--max') ?? 7);
  const ulos = lippu('--ulos') ?? 'pallolaatat-ulos';
  const alue = lippu('--alue')?.split(',').map(Number) ?? null;
  const nostot = argv.includes('--nostot');

  const luettelo = await noudaJson(LUETTELO);
  const kansio = laattojenKansio(luettelo.versio, nostot);
  let yhteensa = 0;
  for (let Z = min; Z <= max; Z += 1) yhteensa += tasonLaatat(Z, alue).length;
  console.log(`pyramidi ${luettelo.versio}, viivat ${luettelo.viivataso?.versio ?? '-'}, `
    + `nostot ${nostot ? (luettelo.nostotaso?.versio ?? '-') : 'ei'}, `
    + `Mercator-tasot ${min}–${max} (lähteet z${lahdetaso(min)}–z${lahdetaso(max)}), `
    + `${yhteensa} laattaa → ${kansio}`);
  if (kuiva) { console.log('Kuiva ajo: ei nouda laattoja eikä kirjoita.'); return; }

  const sharp = (await import('sharp')).default;
  const lukija = teeLukija(luettelo, sharp, { nostot });
  mkdirSync(ulos, { recursive: true });
  let tehty = 0;
  const alku = Date.now();
  for (let Z = min; Z <= max; Z += 1) {
    for (const [X, Y] of tasonLaatat(Z, alue)) {
      const rgb = await laskeLaatta(luettelo, lukija, Z, X, Y);
      const jpg = await sharp(rgb, { raw: { width: LAATTA, height: LAATTA, channels: 3 } }).jpeg({ quality: LAATU }).toBuffer();
      mkdirSync(join(ulos, String(Z), String(X)), { recursive: true });
      writeFileSync(join(ulos, String(Z), String(X), `${Y}.jpg`), jpg);
      tehty += 1;
      if (tehty % 500 === 0 || tehty === yhteensa) {
        const s = Math.round((Date.now() - alku) / 1000);
        console.log(`${tehty}/${yhteensa} laattaa (${s} s, lähdelaattoja noudettu ${lukija.tilasto.noudettu}, puuttui ${lukija.tilasto.puuttui})`);
      }
    }
  }
  writeFileSync(join(ulos, 'laatat.json'), `${JSON.stringify({
    versio: luettelo.versio,
    viivat: luettelo.viivataso?.versio ?? null,
    nostot: nostot ? (luettelo.nostotaso?.versio ?? null) : null,
    tasot: { min, max },
    laatta: LAATTA,
    muoto: 'jpg',
    tehty: new Date().toISOString(),
    // Mitkä nostot ovat laatoissa (ks. tiedoston alku, NOSTOTASON TIIVISTE).
    ...(nostot && luettelo.nostotaso ? { nostotaso: pallonNostotaso(luettelo, min, max) } : {}),
  }, null, 1)}\n`);
  writeFileSync(join(ulos, 'kansio.txt'), `${kansio}\n`);
  console.log(`kirjoitettu ${tehty} laattaa kansioon ${ulos}; ämpärin kansio: ${kansio}`);
}

if (process.argv[1] === TAMA) {
  paa().catch((e) => { console.error(e.message ?? e); process.exit(1); });
}
