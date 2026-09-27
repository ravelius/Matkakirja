#!/usr/bin/env node
/*
 * KUVIEN TEKIJÄMERKINTÖJEN KATTAVUUS (Pelikoodari 27.9.2026, Fablen erä
 * "TEKIJÄMERKINNÄT pelissä").
 *
 *   node tools/kuvatekijat.mjs [--json] [--luokka tekija-puuttuu]
 *
 * Käy läpi viennin jokaisen KUVAviitteen (tools/vienti/media.json, sama
 * lähde kuin NC/ND-portti tools/vienti/lisenssitarkistus.mjs) ja etsii
 * sille lähimmän lähdemerkinnän viitteen omasta oliosta ylöspäin
 * (lahde, tekija, lisenssi). Luokat:
 *
 *   taysi            tekijä, lisenssi ja lähde kirjattu
 *   havainnekuva     tekoälyllä tuotettu havainnekuva (js/havainnekuva.js)
 *   oma              pelin oma kuvitus/tuotanto ilman havainnekuva-merkintää
 *   pd-ei-tekijaa    PD/CC0, tekijää ei kirjattu (sallittu, näytetään "tekijä tuntematon")
 *   tekija-puuttuu   CC BY / CC BY-SA ilman tekijää — lisenssiehtojen vastainen
 *   lisenssi-puuttuu lisenssi vain Commonsin metatiedoissa, ei datassa
 *   tuntematon       ei lähdettä eikä tunnettua alkuperää
 */
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { aaniLisenssiTunnus, lisenssiKelpaa } from '../js/lisenssi.js';
import { HAVAINNEKUVA_LAHDE_RE, HAVAINNEKUVA_RE } from '../js/havainnekuva.js';
import { COMMONS_TEKIJAT } from '../js/packs/commons-tekijat.js';
import { MUU_LISENSSI, onTekija } from '../js/kuvatekija.js';

export const KUVALAJIT = new Set(['kuva-commons', 'lippu-commons', 'kuva-flickr', 'kuva-url', 'repo', 'tiedosto',
  'juliste', 'hetkikuva', 'kohtaamiskuva', 'asset-aarteet', 'asset-elaimet', 'asset-ihmeet', 'asset-miniatyyrit',
  'asset-nostot']);
const KUVA = /\.(jpe?g|png|webp|gif|avif|tiff?|svg)(\?|$)/i;

const OMA = /matkakirjan (havainnekuva|kuvitus|oma)|oma paino|oma tuotanto|pelin oma/i;
/*
 * HAKEMISTOT, EIVÄT KUVIA: Commons-nimi → repon kopio. Arvo on saman kuvan
 * paikallinen kopio, jonka merkintä on avaimen (Commons-kuvan) merkintä.
 */
/*
 * TEKOÄLYLLÄ TUOTETUT KUVALAJIT ilman omaa lähdekenttää: pienoispiirrokset
 * (tools/generoi-miniatyyrit.mjs), aarrekuvat (tools/generoi-aarrekuvat.mjs),
 * kohtaamisten kasvokuvat (tools/generoi-kohtaamiskuvat.mjs, js/ui.js
 * KOHTAAMISKUVAN_LAHDE) ja eläintäkyjen kuvat (js/elaintaky.js oletuslähde
 * "Matkakirjan havainnekuva"). Kaikki Gemini-kuvamallien tuotantoa.
 */
export const HAVAINNEKUVALAJIT = new Set(['asset-miniatyyrit', 'asset-aarteet', 'kohtaamiskuva', 'asset-elaimet']);
/** Samat kuvat repon polkuina: kohtaamisten kasvokuvat ja Viisaan Pöllön muotokuva (tools/generoi-tietaja-avatarit.mjs). */
const HAVAINNEKUVAPOLUT = /^assets\/(kohtaamiset|tietaja)\//;
const HAKEMISTOT = new Set(['js/packs/valokuvat-paikalliset.js', 'js/packs/liput-paikalliset.js', 'js/packs/commons-tekijat.js']);

const osat = (polku) => polku.split('/').slice(1).map((o) => o.replace(/~1/g, '/').replace(/~0/g, '~'));

/**
 * Lähin lähdemerkintä ketjussa ylöspäin: ensimmäinen lahde, ja puuttuva
 * tekijä ja lisenssi täydennetään esivanhemmista (linssin lähdeolion
 * osoite → linssin lisenssiolio).
 */
function merkinta(ketju, kentta) {
  let tulos = null;
  for (let i = ketju.length - 1; i >= 0; i -= 1) {
    let olio = ketju[i];
    if (Array.isArray(olio) && olio.length === 2 && ketju[i - 2]?.$map === ketju[i - 1]) olio = olio[1];
    if (!olio || typeof olio !== 'object' || Array.isArray(olio)) continue;
    let lahde = (i === ketju.length - 1 ? olio[`${kentta}Lahde`] : null) ?? olio.lahde ?? olio.credit ?? olio.aineisto ?? null;
    let tekija = olio.tekija ?? olio.tekijat ?? null;
    let lisenssi = olio.lisenssi ?? olio.license ?? null;
    // Linssien lähdeolio (js/packs/linssi-yokartta.js): { aineisto, tekijat } ja { nimi }.
    if (lahde && typeof lahde === 'object') {
      tekija = lahde.tekijat ?? lahde.tekija ?? tekija;
      lahde = [lahde.tekijat ?? lahde.tekija, lahde.aineisto].filter(Boolean).join(', ') || null;
    }
    if (lisenssi && typeof lisenssi === 'object') lisenssi = lisenssi.nimi ?? null;
    if (typeof lahde !== 'string') lahde = null;
    if (typeof tekija !== 'string') tekija = null;
    if (typeof lisenssi !== 'string') lisenssi = null;
    if (!tulos) {
      if (!lahde && !tekija && !lisenssi) continue;
      tulos = { lahde, tekija, lisenssi };
    } else {
      tulos.tekija ??= tekija;
      tulos.lisenssi ??= lisenssi;
    }
    if (tulos.lisenssi || (tulos.lahde && /\b(CC|PD|public domain)\b/i.test(tulos.lahde))) return tulos;
  }
  return tulos;
}

export function luokitteleKuva(laji, m, moduuliLahde, arvo = '') {
  const mm = m ?? moduuliLahde ?? null;
  const lahde = mm?.lahde ?? null;
  const teksti = [lahde, mm?.lisenssi].filter(Boolean).join(' ');
  if (lahde && (HAVAINNEKUVA_LAHDE_RE.test(lahde) || HAVAINNEKUVA_RE.test(lahde))) return 'havainnekuva';
  if (HAVAINNEKUVALAJIT.has(laji) || HAVAINNEKUVAPOLUT.test(arvo)) {
    if (!(teksti && (aaniLisenssiTunnus(teksti) != null || MUU_LISENSSI.test(teksti)))) return 'havainnekuva';
  }
  if (teksti && OMA.test(teksti)) return 'oma';
  const tunnus = teksti ? (aaniLisenssiTunnus(teksti) ?? (MUU_LISENSSI.test(teksti) ? 'muu' : null)) : null;
  // Commonsin oma merkintä (js/packs/commons-tekijat.js), kun datasta puuttuu lisenssi tai tekijä.
  const commons = (laji === 'kuva-commons' || laji === 'lippu-commons') ? COMMONS_TEKIJAT[arvo] : null;
  if (commons && (tunnus == null || !((typeof mm?.tekija === 'string' && mm.tekija.trim()) || onTekija(lahde)))) {
    return commons[0] ? 'taysi' : 'pd-ei-tekijaa';
  }
  if (tunnus == null) {
    if (laji === 'kuva-commons' || laji === 'lippu-commons') return 'lisenssi-puuttuu';
    if (['juliste', 'hetkikuva', 'kohtaamiskuva', 'asset-aarteet', 'asset-miniatyyrit', 'asset-ihmeet', 'asset-nostot', 'asset-elaimet'].includes(laji)) return 'oma';
    return lahde ? 'lisenssi-puuttuu' : 'tuntematon';
  }
  const tekija = (typeof mm?.tekija === 'string' && mm.tekija.trim()) || onTekija(lahde);
  if (tekija) return 'taysi';
  return /^(pd|cc0|pdm|public)/.test(tunnus) ? 'pd-ei-tekijaa' : 'tekija-puuttuu';
}

export function kuvienTekijat(tiedostot) {
  const manifest = JSON.parse(tiedostot.get('manifest.json'));
  const moduulit = new Map();
  const moduuli = (nimi) => {
    if (!moduulit.has(nimi)) {
      const mm = manifest.moduulit.find((x) => x.moduuli === nimi);
      moduulit.set(nimi, mm ? JSON.parse(tiedostot.get(mm.tiedosto)).exportit : {});
    }
    return moduulit.get(nimi);
  };
  // Moduulin *_LAHDE-vakio: teksti (JULISTE_LAHDE) tai olio (SATELLIITTI_LAHDE: tekija, lisenssi).
  const moduulinLahde = (nimi) => {
    const e = moduuli(nimi);
    const k = Object.keys(e).find((x) => /_LAHDE$/.test(x) && e[x] && (typeof e[x] === 'string' || typeof e[x] === 'object'));
    if (!k) return null;
    const v = e[k];
    if (typeof v === 'string') return { lahde: v, tekija: null, lisenssi: null };
    return { lahde: [v.tekija, v.aineisto, v.lisenssi && `(${v.lisenssi})`].filter(Boolean).join(', '), tekija: v.tekija ?? null, lisenssi: v.lisenssi ?? null };
  };
  const JARJ = ['tuntematon', 'tekija-puuttuu', 'lisenssi-puuttuu', 'pd-ei-tekijaa', 'oma', 'havainnekuva', 'taysi'];
  const kuvat = [];
  for (const v of JSON.parse(tiedostot.get('media.json')).viitteet) {
    if (!KUVALAJIT.has(v.laji) || (!KUVA.test(v.arvo) && !/^(kuva|lippu)-/.test(v.laji))) continue;
    const esiintymat = v.esiintymat.filter((e) => !HAKEMISTOT.has(e.moduuli));
    if (!esiintymat.length) continue;
    const tulokset = esiintymat.map((e) => {
      const reitti = osat(e.polku);
      const ketju = [moduuli(e.moduuli)[e.export]];
      for (const o of reitti.slice(0, -1)) ketju.push(ketju.at(-1)?.[o]);
      const m = merkinta(ketju, reitti.at(-1));
      return { m: m ?? moduulinLahde(e.moduuli), moduuli: e.moduuli, luokka: luokitteleKuva(v.laji, m, moduulinLahde(e.moduuli), v.arvo) };
    });
    // Paras esiintymä ratkaisee: kuva näytetään sen merkinnän kanssa, jossa se on kirjattu.
    const paras = tulokset.reduce((a, b) => (JARJ.indexOf(b.luokka) > JARJ.indexOf(a.luokka) ? b : a));
    kuvat.push({ arvo: v.arvo, laji: v.laji, luokka: paras.luokka, lahde: paras.m?.lahde ?? null, moduuli: paras.moduuli });
  }
  return kuvat;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { kokoaVienti } = await import('./vienti/vie-sisalto.mjs');
  const { tiedostot } = await kokoaVienti();
  const kuvat = kuvienTekijat(tiedostot);
  const i = process.argv.indexOf('--luokka');
  if (process.argv.includes('--json')) { console.log(JSON.stringify(kuvat, null, 1)); process.exit(0); }
  if (i > 0) { for (const k of kuvat.filter((x) => x.luokka === process.argv[i + 1])) console.log(`${k.laji}\t${k.moduuli}\t${k.arvo}\t${k.lahde ?? ''}`); process.exit(0); }
  const yht = {};
  const laj = {};
  for (const k of kuvat) {
    yht[k.luokka] = (yht[k.luokka] ?? 0) + 1;
    laj[k.laji] ??= {};
    laj[k.laji][k.luokka] = (laj[k.laji][k.luokka] ?? 0) + 1;
  }
  console.log(`Kuvia ${kuvat.length}:`, JSON.stringify(yht));
  for (const [l, v] of Object.entries(laj)) console.log(`  ${l.padEnd(18)} ${JSON.stringify(v)}`);
}
