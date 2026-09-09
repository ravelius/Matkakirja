#!/usr/bin/env node
/*
 * ============ LYHYIDEN KUVATEKSTIEN TYÖKALU (Sonnet-parvelle) ============
 *
 * Omistajan linjaus 9.9.2026 klo 11.40 (js/tyohuone-raamattu.js, merkintä
 * "LYHYT KUVATEKSTI SIVULLA, PITKA VASTA AVATUSSA KUVASSA", sanatarkasti):
 *
 *   "Ja saman säännön voisi itse asiassa ajaa kaikkiin kuvateksteihin koko
 *   pelissä. Jos kuvateksti on valmiiksi jo lyhyt, niin pidempää versiota ei
 *   tarvitse tehdä, mutta on todella paljon kuvatekstejä, joissa on aivan
 *   liian pitkä sepustus, niin ne voisi sitten lyhentää ja laittaa tämän
 *   jollekin Sonnet-agenttiparvelle tehtäväksi."
 *
 * Piirtopuoli on jo valmis: js/kuvatekstit.js kertoo, että sivulla näkyy
 * `lyhyt` ja avatussa kuvassa `selite`/`kuvateksti` + lähderivi. Tämä
 * työkalu on se toinen puoli — sillä lyhennetään ISOT datatiedostot, joita
 * ei voi lukea kokonaan yhteen agentti-istuntoon:
 *
 *   js/packs/kulttuuri-kategoriat.js   5,5 MB
 *   js/packs/maa-kategoriat.js         3,1 MB
 *   js/packs/nahtavyysjutut.js         3,3 MB
 *
 * ── PARVEN TYÖNKULKU (tarkat komennot) ────────────────────────────────
 *
 * 1) Koordinaattori laskee työn määrän ja jakaa sen agenteille:
 *
 *      node tools/kuvatekstit-lyhyet.mjs --lista js/packs/nahtavyysjutut.js \
 *        --ulos /tmp/kaikki.json
 *
 *    Tuloste kertoo kokonaismäärän. Jaa se paloihin --alku/--maara:llä.
 *
 * 2) Yksi agentti ottaa oman palansa (esim. rivit 200–249):
 *
 *      node tools/kuvatekstit-lyhyet.mjs --lista js/packs/nahtavyysjutut.js \
 *        --alku 200 --maara 50 --ulos /tmp/era-200.json
 *
 *    Tiedostossa on [{ id, tiedosto, rivi, tiiviste, pituus, kentta, teksti }].
 *    Agentti lukee VAIN tämän JSONin — ei koko datatiedostoa.
 *
 * 3) Agentti kirjoittaa jokaiselle alkiolle lyhyen version ja tallentaa
 *    [{ id, lyhyt }] (tiiviste saa olla mukana; sillä alkio löytyy vaikka
 *    rivinumerot olisivat siirtyneet):
 *
 *      node tools/kuvatekstit-lyhyet.mjs --vie /tmp/era-200-valmis.json
 *
 *    Vienti kieltäytyy, jos lyhyt on yli 100 merkkiä, ei pääty pisteeseen
 *    (. ! ?) tai sisältää rivinvaihdon. Se on idempotentti: olio, jolla on
 *    jo `lyhyt`, ohitetaan. Lopuksi ajetaan `node --check` jokaiselle
 *    muutetulle tiedostolle.
 *
 * 4) Lopputarkistus (myös koordinaattorille, poistumiskoodi 1 = puutteita):
 *
 *      node tools/kuvatekstit-lyhyet.mjs --tarkista js/packs/nahtavyysjutut.js
 *
 * ── LYHYEN KUVATEKSTIN SÄÄNNÖT (agentille) ────────────────────────────
 *
 *   • Yksi virke, ENINTÄÄN 100 merkkiä, päättyy pisteeseen.
 *   • Kertoo mitä/missä/milloin: kohde, paikka, vuosi tai aikakausi.
 *     Esim. "Augsburgin konetehdas 1897: ensimmäinen toimiva dieselmoottori
 *     käy." tai "James Watt, Carl Frederik von Bredan maalaus 1792."
 *   • Tiivistys, EI uutta faktaa: lyhyt ei saa sanoa mitään, mitä pitkä ei
 *     sano. Erisnimet ja vuosiluvut pitkästä sellaisenaan.
 *   • Ei lähdemainintaa (Commons, valokuvaaja, lisenssi) — se kuuluu
 *     pitkään ja lähderiviin.
 *   • Hyvää, luontevaa suomea; ei mainoskieltä, ei huutomerkkejä, ei
 *     "kuvassa näkyy" -alkuja.
 *
 * ── MIKSI OMA JÄSENNIN EIKÄ SÄÄNNÖLLINEN LAUSEKE ──────────────────────
 *
 * Kuvatekstit on ladottu pitkinä ketjuina usealle riville:
 *
 *     selite: 'Ensimmäinen osa '
 *       + 'ja toinen osa, jossa on heittomerkki\'kin.',
 *
 * Yksi regex ei näe ketjun loppua eikä osaa sanoa, onko heittomerkki
 * literaalin sisällä vai sen lopussa. Ja "onko samassa oliossa jo `lyhyt`"
 * on kysymys aaltosulkeiden rakenteesta, ei rivistä. Siksi tiedosto
 * käydään läpi kerran merkki merkiltä: pinossa ovat auki olevat `{ [ (`,
 * ja jokaisesta oliosta tiedetään sen omat avaimet ja niiden arvojen
 * tarkat alku- ja loppukohdat. Sama jäsennys palvelee sekä listausta että
 * vientiä, joten ne eivät voi olla eri mieltä siitä, mikä kenttä on missä.
 *
 * Jäsennin EI suorita koodia: literaalit luetaan vain jos arvo on pelkkiä
 * heittomerkkijonoja `+`-merkeillä yhdistettynä. Template-literaalit,
 * muuttujat ja funktiokutsut ohitetaan — niitä ei voi lyhentää
 * tekstinä eikä niiden pituutta voi tietää lukematta koodia.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

/** Kuvatekstikentät: kumpikin on pitkä versio (ks. js/kuvatekstit.js). */
const PITKAT_KENTAT = ['selite', 'kuvateksti'];
/** Lyhyen kuvatekstin kenttä ja sen enimmäispituus merkkeinä. */
const LYHYT_KENTTA = 'lyhyt';
const LYHYT_KATTO = 100;
/** Tätä pidempi pitkä teksti kaipaa lyhyen version. */
const PITKA_RAJA = 100;

/* ==================== JÄSENNIN ==================== */

/**
 * Onko merkki tunnisteen (avaimen) kelvollinen merkki.
 *
 * @param {string} c yksi merkki
 * @returns {boolean}
 */
function tunnistemerkki(c) {
  return /[A-Za-z0-9_$]/.test(c);
}

/**
 * Käy JS-lähteen läpi merkki merkiltä ja kerää jokaisen olioliteraalin
 * omat avaimet arvoalueineen.
 *
 * Kommentit, merkkijonot, template-literaalit ja säännölliset lausekkeet
 * ohitetaan sisällöltään; vain rakenne (sulkeet) ja oliotason `avain:`
 * kirjataan.
 *
 * @param {string} lahde tiedoston koko sisältö
 * @returns {Array<{avaimet: Array<{nimi: string, avainAlku: number,
 *   arvoAlku: number, arvoLoppu: number}>}>} kaikki oliot löytymisjärjestyksessä
 */
export function jasennaOliot(lahde) {
  const oliot = [];
  const pino = [];
  let i = 0;
  const n = lahde.length;

  /** Päättää nykyisen avaimen arvon tähän kohtaan. */
  const paataArvo = (loppu) => {
    const paalla = pino[pino.length - 1];
    if (paalla?.tyyppi !== 'obj' || !paalla.kesken) return;
    paalla.kesken.arvoLoppu = loppu;
    paalla.kesken = null;
  };

  while (i < n) {
    const c = lahde[i];

    // --- kommentit ---
    if (c === '/' && lahde[i + 1] === '/') {
      const rivinLoppu = lahde.indexOf('\n', i);
      i = rivinLoppu === -1 ? n : rivinLoppu;
      continue;
    }
    if (c === '/' && lahde[i + 1] === '*') {
      const loppu = lahde.indexOf('*/', i + 2);
      i = loppu === -1 ? n : loppu + 2;
      continue;
    }

    // --- merkkijonot ja template-literaalit ---
    if (c === '\'' || c === '"' || c === '`') {
      i += 1;
      while (i < n) {
        if (lahde[i] === '\\') { i += 2; continue; }
        if (lahde[i] === c) { i += 1; break; }
        i += 1;
      }
      continue;
    }

    // --- sulkeet ---
    if (c === '{' || c === '[' || c === '(') {
      const tyyppi = c === '{' ? 'obj' : (c === '[' ? 'arr' : 'par');
      const kehys = { tyyppi, avaimet: [], kesken: null };
      if (tyyppi === 'obj') oliot.push(kehys);
      pino.push(kehys);
      i += 1;
      continue;
    }
    if (c === '}' || c === ']' || c === ')') {
      paataArvo(i);
      pino.pop();
      i += 1;
      continue;
    }

    // --- pilkku päättää arvon oliotasolla ---
    if (c === ',') {
      paataArvo(i);
      i += 1;
      continue;
    }

    // --- avain: vain suoraan olion sisällä ---
    const paalla = pino[pino.length - 1];
    if (paalla?.tyyppi === 'obj' && tunnistemerkki(c) && !/[A-Za-z0-9_$.]/.test(lahde[i - 1] ?? ' ')) {
      let j = i;
      while (j < n && tunnistemerkki(lahde[j])) j += 1;
      const nimi = lahde.slice(i, j);
      let k = j;
      while (k < n && /\s/.test(lahde[k])) k += 1;
      // Kaksoispiste, muttei nuolifunktion tai ternaarin osa.
      if (lahde[k] === ':' && lahde[k + 1] !== ':') {
        let arvoAlku = k + 1;
        while (arvoAlku < n && /\s/.test(lahde[arvoAlku])) arvoAlku += 1;
        const merkinta = { nimi, avainAlku: i, arvoAlku, arvoLoppu: -1 };
        paalla.avaimet.push(merkinta);
        paalla.kesken = merkinta;
        i = arvoAlku;
        continue;
      }
      i = j;
      continue;
    }

    i += 1;
  }
  return oliot;
}

/**
 * Lukee heittomerkkijonoista koostuvan arvon tekstiksi.
 *
 * @param {string} pala arvon lähdeteksti (`'a' + 'b'`, myös monirivisenä)
 * @returns {?string} teksti, tai null jos arvo ei ole pelkkiä
 *   merkkijonoliteraaleja plussilla yhdistettynä
 */
export function lueLiteraali(pala) {
  const osat = [];
  let i = 0;
  const n = pala.length;
  let odotaMerkkijono = true;
  while (i < n) {
    const c = pala[i];
    if (/\s/.test(c)) { i += 1; continue; }
    if (c === '+' && !odotaMerkkijono) { odotaMerkkijono = true; i += 1; continue; }
    if ((c === '\'' || c === '"') && odotaMerkkijono) {
      let teksti = '';
      i += 1;
      while (i < n) {
        if (pala[i] === '\\') {
          const seuraava = pala[i + 1];
          teksti += seuraava === 'n' ? '\n' : (seuraava === 't' ? '\t' : seuraava);
          i += 2;
          continue;
        }
        if (pala[i] === c) { i += 1; break; }
        teksti += pala[i];
        i += 1;
      }
      osat.push(teksti);
      odotaMerkkijono = false;
      continue;
    }
    return null;
  }
  return osat.length && !odotaMerkkijono ? osat.join('') : null;
}

/** Rivinumero (1-alkuinen) merkkipaikalle. */
function rivinumero(lahde, paikka) {
  let rivi = 1;
  for (let i = 0; i < paikka; i += 1) if (lahde[i] === '\n') rivi += 1;
  return rivi;
}

/** Tekstin tiiviste: tunniste, joka kestää rivinumeroiden siirtymisen. */
function tiiviste(teksti) {
  return createHash('sha1').update(teksti).digest('hex').slice(0, 12);
}

/**
 * Etsii tiedostosta kaikki liian pitkät kuvatekstit, joilta puuttuu lyhyt.
 *
 * @param {string} tiedosto polku
 * @returns {Array<{id: string, tiedosto: string, rivi: number,
 *   tiiviste: string, kentta: string, pituus: number, teksti: string,
 *   avainAlku: number}>} löydöt tiedostojärjestyksessä
 */
export function etsiPuuttuvat(tiedosto) {
  const lahde = readFileSync(tiedosto, 'utf8');
  const loydot = [];
  for (const olio of jasennaOliot(lahde)) {
    const nimet = new Set(olio.avaimet.map((a) => a.nimi));
    if (nimet.has(LYHYT_KENTTA)) continue;
    for (const avain of olio.avaimet) {
      if (!PITKAT_KENTAT.includes(avain.nimi)) continue;
      if (avain.arvoLoppu < 0) continue;
      const teksti = lueLiteraali(lahde.slice(avain.arvoAlku, avain.arvoLoppu));
      if (teksti === null || teksti.length <= PITKA_RAJA) continue;
      const rivi = rivinumero(lahde, avain.avainAlku);
      loydot.push({
        id: `${tiedosto}:${rivi}`,
        tiedosto,
        rivi,
        tiiviste: tiiviste(teksti),
        kentta: avain.nimi,
        pituus: teksti.length,
        teksti,
        avainAlku: avain.avainAlku,
      });
    }
  }
  return loydot;
}

/* ==================== --lista ==================== */

function komentoLista(tiedosto, alku, maara, ulos) {
  const kaikki = etsiPuuttuvat(tiedosto);
  const pala = kaikki.slice(alku, maara === null ? undefined : alku + maara);
  const vienti = pala.map(({ avainAlku, ...loput }) => loput);
  if (ulos) writeFileSync(ulos, `${JSON.stringify(vienti, null, 2)}\n`, 'utf8');
  else process.stdout.write(`${JSON.stringify(vienti, null, 2)}\n`);
  const loppu = alku + pala.length;
  console.log(`${tiedosto}: ${kaikki.length} kuvatekstiä yli ${PITKA_RAJA} merkkiä ilman lyhyttä.`);
  console.log(`Alue ${alku}–${loppu - 1} (${pala.length} kpl)${ulos ? ` → ${ulos}` : ''}.`);
  return 0;
}

/* ==================== --vie ==================== */

/**
 * Tarkistaa yhden lyhyen kuvatekstin ennen vientiä.
 *
 * @param {string} lyhyt ehdotettu teksti
 * @returns {?string} virheen syy, tai null jos teksti kelpaa
 */
export function tarkistaLyhyt(lyhyt) {
  if (typeof lyhyt !== 'string' || !lyhyt.trim()) return 'tyhjä';
  if (lyhyt !== lyhyt.trim()) return 'alussa tai lopussa välilyönti';
  if (lyhyt.length > LYHYT_KATTO) return `${lyhyt.length} merkkiä (katto ${LYHYT_KATTO})`;
  if (/[\n\r]/.test(lyhyt)) return 'rivinvaihto';
  if (!/[.!?]$/.test(lyhyt)) return 'ei pääty pisteeseen';
  return null;
}

/** JS-heittomerkkijono: kenoviivat ja heittomerkit suojataan. */
export function heittomerkkijono(teksti) {
  return `'${teksti.replace(/\\/g, '\\\\').replace(/'/g, '\\\'')}'`;
}

function komentoVie(json) {
  const rivit = JSON.parse(readFileSync(json, 'utf8'));
  if (!Array.isArray(rivit)) throw new Error(`${json}: odotin taulukkoa [{ id, lyhyt }]`);

  // Virheet kerätään ENSIN: yksikään tiedosto ei muutu, jos yksikin
  // lyhyt rikkoo sääntöä. Puolinainen erä olisi pahempi kuin ei mitään.
  const virheet = [];
  for (const rivi of rivit) {
    const syy = tarkistaLyhyt(rivi?.lyhyt);
    if (syy) virheet.push(`${rivi?.id ?? '(ilman id:tä)'}: ${syy}`);
  }
  if (virheet.length) {
    console.error(`Vienti keskeytyi, ${virheet.length} kelvotonta lyhyttä:`);
    for (const v of virheet) console.error(`  ${v}`);
    return 1;
  }

  // Ryhmittely tiedostoittain: jokainen tiedosto luetaan ja kirjoitetaan
  // kerran, ja lisäykset tehdään LOPUSTA ALKUUN, jotta aiemmat
  // merkkipaikat pysyvät voimassa.
  const tiedostoittain = new Map();
  for (const rivi of rivit) {
    const tiedosto = rivi.tiedosto ?? String(rivi.id).split(':').slice(0, -1).join(':');
    if (!tiedostoittain.has(tiedosto)) tiedostoittain.set(tiedosto, []);
    tiedostoittain.get(tiedosto).push(rivi);
  }

  let lisatty = 0;
  let ohitettu = 0;
  const puuttuvat = [];
  for (const [tiedosto, erat] of tiedostoittain) {
    const puuttuvatNyt = etsiPuuttuvat(tiedosto);
    // Sama teksti voi esiintyä monta kertaa; tiiviste on varareitti vain
    // silloin, kun se osuu tasan yhteen kohtaan.
    const rivinMukaan = new Map(puuttuvatNyt.map((p) => [p.id, p]));
    const tiivisteet = new Map();
    for (const p of puuttuvatNyt) {
      tiivisteet.set(p.tiiviste, tiivisteet.has(p.tiiviste) ? null : p);
    }
    const lisaykset = [];
    for (const era of erat) {
      const kohde = rivinMukaan.get(era.id) ?? tiivisteet.get(era.tiiviste) ?? null;
      if (!kohde) {
        // Idempotenssi: jo lyhennetty kenttä ei ole enää listalla.
        ohitettu += 1;
        puuttuvat.push(era.id);
        continue;
      }
      lisaykset.push({ paikka: kohde.avainAlku, lyhyt: era.lyhyt });
    }
    if (!lisaykset.length) continue;
    let lahde = readFileSync(tiedosto, 'utf8');
    lisaykset.sort((a, b) => b.paikka - a.paikka);
    for (const { paikka, lyhyt } of lisaykset) {
      const rivinAlku = lahde.lastIndexOf('\n', paikka - 1) + 1;
      const edella = lahde.slice(rivinAlku, paikka);
      if (/^\s*$/.test(edella)) {
        // Kenttä aloittaa rivin: lyhyt omalle rivilleen samalla sisennyksellä.
        lahde = `${lahde.slice(0, rivinAlku)}${edella}${LYHYT_KENTTA}: ${heittomerkkijono(lyhyt)},\n${lahde.slice(rivinAlku)}`;
      } else {
        // Yksirivinen olio (`kuva: { tiedosto: …, selite: …, lahde: … }`):
        // lyhyt samalle riville kentän eteen — rivin alkua ei saa toistaa.
        lahde = `${lahde.slice(0, paikka)}${LYHYT_KENTTA}: ${heittomerkkijono(lyhyt)}, ${lahde.slice(paikka)}`;
      }
      lisatty += 1;
    }
    writeFileSync(tiedosto, lahde, 'utf8');
    execFileSync(process.execPath, ['--check', tiedosto], { stdio: 'pipe' });
    console.log(`${tiedosto}: node --check ok.`);
  }
  console.log(`Lisätty ${lisatty} lyhyttä kuvatekstiä.`);
  if (ohitettu) {
    console.log(`Ohitettu ${ohitettu} (oli jo lyhyt tai kenttä on siirtynyt): ${puuttuvat.join(', ')}`);
  }
  return 0;
}

/* ==================== --tarkista ==================== */

/** Kävelee arvon läpi rekursiivisesti ja kutsuu takaisinkutsua jokaisella oliolla. */
function kavele(arvo, kaydyt, kasittele) {
  if (!arvo || typeof arvo !== 'object') return;
  if (kaydyt.has(arvo)) return;
  kaydyt.add(arvo);
  if (Array.isArray(arvo)) {
    for (const alkio of arvo) kavele(alkio, kaydyt, kasittele);
    return;
  }
  kasittele(arvo);
  for (const alkio of Object.values(arvo)) kavele(alkio, kaydyt, kasittele);
}

async function komentoTarkista(tiedostot) {
  const puutteet = [];
  for (const tiedosto of tiedostot) {
    const moduuli = await import(pathToFileURL(tiedosto).href);
    const kaydyt = new WeakSet();
    let oliot = 0;
    let lyhyita = 0;
    kavele({ ...moduuli }, kaydyt, (olio) => {
      const lyhyt = olio[LYHYT_KENTTA];
      if (typeof lyhyt === 'string') {
        lyhyita += 1;
        const syy = tarkistaLyhyt(lyhyt);
        if (syy) puutteet.push(`${tiedosto}: lyhyt kelpaamaton (${syy}): ${lyhyt.slice(0, 60)}…`);
      }
      for (const kentta of PITKAT_KENTAT) {
        const pitka = olio[kentta];
        if (typeof pitka !== 'string' || pitka.length <= PITKA_RAJA) continue;
        oliot += 1;
        if (typeof lyhyt !== 'string' || !lyhyt) {
          puutteet.push(`${tiedosto}: ${kentta} ${pitka.length} merkkiä ilman lyhyttä: ${pitka.slice(0, 70)}…`);
        }
      }
    });
    console.log(`${tiedosto}: ${oliot} pitkää kuvatekstiä, ${lyhyita} lyhyttä.`);
  }
  if (puutteet.length) {
    console.error(`\n${puutteet.length} puutetta:`);
    for (const p of puutteet.slice(0, 200)) console.error(`  ${p}`);
    if (puutteet.length > 200) console.error(`  … ja ${puutteet.length - 200} muuta`);
    return 1;
  }
  console.log('Ei puutteita.');
  return 0;
}

/* ==================== KOMENTORIVI ==================== */

const OHJE = `
Käyttö:
  node tools/kuvatekstit-lyhyet.mjs --lista <tiedosto> [--alku N] [--maara M] [--ulos <json>]
  node tools/kuvatekstit-lyhyet.mjs --vie <json>
  node tools/kuvatekstit-lyhyet.mjs --tarkista <tiedosto...>

Ks. tiedoston alun ohje: säännöt, työnkulku ja esimerkit.
`.trim();

function lueValitsimet(argv) {
  const asetukset = { lista: null, alku: 0, maara: null, ulos: null, vie: null, tarkista: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--lista') { asetukset.lista = argv[++i]; continue; }
    if (a === '--alku') { asetukset.alku = Number(argv[++i]) || 0; continue; }
    if (a === '--maara') { asetukset.maara = Number(argv[++i]); continue; }
    if (a === '--ulos') { asetukset.ulos = argv[++i]; continue; }
    if (a === '--vie') { asetukset.vie = argv[++i]; continue; }
    if (a === '--tarkista') {
      while (i + 1 < argv.length && !argv[i + 1].startsWith('--')) asetukset.tarkista.push(argv[++i]);
      continue;
    }
    throw new Error(`tuntematon valitsin: ${a}`);
  }
  return asetukset;
}

async function main() {
  const argv = process.argv.slice(2);
  if (!argv.length) { console.log(OHJE); return 0; }
  const v = lueValitsimet(argv);
  if (v.lista) return komentoLista(v.lista, v.alku, v.maara, v.ulos);
  if (v.vie) return komentoVie(v.vie);
  if (v.tarkista.length) return komentoTarkista(v.tarkista);
  console.log(OHJE);
  return 0;
}

// Kirjastona (testit) tuonti ei saa ajaa komentoriviä.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().then((koodi) => { process.exitCode = koodi; }).catch((syy) => {
    console.error(syy.message);
    process.exitCode = 1;
  });
}
