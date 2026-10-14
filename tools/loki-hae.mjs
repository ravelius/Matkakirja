/*
 * PÄÄTÖSLOKIN HAKU (omistajan päätös 15.10.2026 klo 00.09).
 *
 *   node tools/loki-hae.mjs <hakusana> [--alkaen pp.kk] [--kaikki]
 *   node tools/loki-hae.mjs --kirjaus tiedosto:rivi [--osa N]
 *
 * Hakee kansion docs/raamattu-loki/ kaikista .md-tiedostoista
 * kirjainkoosta ja ä/ö/å-merkeistä riippumatta ("paatos" löytää
 * "päätös"). Kirjaus = yksi "## "-otsikko ja sen teksti. Tulostaa
 * enintään 8 osumaa (kirjausta) uusimmasta alkaen, kustakin noin 300
 * merkkiä osuman ympäriltä ja tiedosto:rivi. --kirjaus tulostaa yhden
 * koko kirjauksen enintään 4 000 merkkiä kerrallaan (--osa N jatkaa).
 * Kirjauksen päivä päätellään otsikon viimeisestä päivämäärästä
 * (pp.kk.vvvv tai pp.kk.), muuten edellisen kirjauksen päivästä ja
 * viime kädessä tiedostonimestä.
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const OSUMIA = 8;
export const KONTEKSTI = 300;
export const OSAN_KOKO = 4000;

/** Pienet kirjaimet, ä/ö/å -> a/o/a (pituus säilyy, jotta indeksit täsmäävät). */
export function normalisoi(s) {
  let ulos = '';
  for (const c of String(s).toLowerCase()) {
    const d = c.normalize('NFD')[0];
    ulos += c.length === d.length ? d : c;
  }
  return ulos;
}

/** Tiedostonimen päiväraja: paatokset-2026-08-24--09-03.md -> loppupäivä; paatokset-2026-09.md -> 1. */
function tiedostonPaiva(nimi) {
  let m = nimi.match(/(\d{4})-(\d{2})-(\d{2})--(\d{2})-(\d{2})/);
  if (m) return Date.UTC(+m[1], +m[4] - 1, +m[5]);
  m = nimi.match(/(\d{4})-(\d{2})/);
  if (m) return Date.UTC(+m[1], +m[2] - 1, 1);
  return 0;
}

/** Otsikon viimeinen päivämäärä (ja kellonaika) -> aikaleima tai null. */
function otsikonAika(otsikko, oletusVuosi) {
  const kaikki = [...otsikko.matchAll(/(\d{1,2})\.(\d{1,2})\.(?:(20\d{2}))?(?:\s*klo\s*(\d{1,2})[.:](\d{2}))?/g)];
  for (let i = kaikki.length - 1; i >= 0; i--) {
    const [, p, k, v, h, min] = kaikki[i];
    if (+p < 1 || +p > 31 || +k < 1 || +k > 12) continue;
    return Date.UTC(+(v || oletusVuosi), +k - 1, +p, +(h || 0), +(min || 0));
  }
  return null;
}

/** Jäsentää tiedoston kirjauksiksi {tiedosto, alku, loppu (rivit 1-pohjaisia), otsikko, aika, teksti, rivialut}. */
export function jasenna(tiedosto, sisalto) {
  const rivit = sisalto.split('\n');
  const vuosi = (tiedosto.match(/(20\d{2})/) || [, 2026])[1];
  const kirjaukset = [];
  let nyt = null;
  let edellinenAika = tiedostonPaiva(tiedosto);
  const sulje = (loppu) => {
    if (!nyt) return;
    nyt.loppu = loppu;
    const osat = rivit.slice(nyt.alku - 1, loppu);
    let teksti = '';
    nyt.rivialut = [];
    osat.forEach((r) => { nyt.rivialut.push(teksti.length); teksti += `${r}\n`; });
    nyt.teksti = teksti;
    kirjaukset.push(nyt);
    nyt = null;
  };
  for (let i = 0; i < rivit.length; i++) {
    if (!rivit[i].startsWith('## ')) continue;
    sulje(i);
    const aika = otsikonAika(rivit[i], vuosi);
    if (aika !== null) edellinenAika = aika;
    nyt = { tiedosto, alku: i + 1, otsikko: rivit[i].slice(3), aika: aika ?? edellinenAika };
  }
  sulje(rivit.length);
  return kirjaukset;
}

export function lataa(kansio) {
  const kaikki = [];
  for (const nimi of readdirSync(kansio).filter((n) => n.endsWith('.md')).sort()) {
    kaikki.push(...jasenna(nimi, readFileSync(join(kansio, nimi), 'utf8')));
  }
  return kaikki;
}

/** Rivi, jolla tekstin indeksi on (1-pohjainen tiedostossa). */
function riviIndeksille(k, indeksi) {
  let lo = 0; let hi = k.rivialut.length - 1;
  while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (k.rivialut[mid] <= indeksi) lo = mid; else hi = mid - 1; }
  return k.alku + lo;
}

function alkaenAika(arvo) {
  const m = String(arvo).match(/^(\d{1,2})\.(\d{1,2})\.?(20\d{2})?$/);
  if (!m) throw new Error('--alkaen: anna muodossa pp.kk (esim. 10.10)');
  return Date.UTC(+(m[3] || 2026), +m[2] - 1, +m[1]);
}

/** Haku: palauttaa {osumat (kaikki, uusin ensin), } */
export function hae(kirjaukset, sana, { alkaen } = {}) {
  const tarve = normalisoi(sana).trim();
  if (!tarve) throw new Error('Anna hakusana.');
  const raja = alkaen ? alkaenAika(alkaen) : -Infinity;
  const osumat = [];
  for (const k of kirjaukset) {
    if (k.aika < raja) continue;
    // Rivinvaihdot välilyönneiksi, jotta rivitetty ilmaus löytyy.
    const heina = normalisoi(k.teksti.replace(/\n/g, ' '));
    const i = heina.indexOf(tarve);
    if (i < 0) continue;
    osumat.push({ k, i });
  }
  osumat.sort((a, b) => b.k.aika - a.k.aika
    || (a.k.tiedosto < b.k.tiedosto ? 1 : a.k.tiedosto > b.k.tiedosto ? -1 : b.k.alku - a.k.alku));
  return osumat;
}

export function katkelma(osuma, sana) {
  const t = osuma.k.teksti.replace(/\n/g, ' ');
  const pituus = sana.length;
  const alku = Math.max(0, osuma.i - Math.floor((KONTEKSTI - pituus) / 2));
  const loppu = Math.min(t.length, alku + KONTEKSTI);
  return `${alku > 0 ? '…' : ''}${t.slice(alku, loppu).trim()}${loppu < t.length ? '…' : ''}`;
}

export function muotoileOsumat(osumat, sana, { kaikki = false } = {}) {
  const naytetaan = kaikki ? osumat : osumat.slice(0, OSUMIA);
  const ulos = naytetaan.map((o) => `${o.k.tiedosto}:${riviIndeksille(o.k, o.i)}  ## ${o.k.otsikko}\n  ${katkelma(o, sana)}`);
  ulos.push(osumat.length > naytetaan.length
    ? `${osumat.length} osumaa, näytetty ${naytetaan.length} – tarkenna hakua tai --kaikki`
    : `${osumat.length} osumaa, näytetty ${naytetaan.length}`);
  return ulos.join('\n');
}

/** Yksi kirjaus ositettuna; palauttaa {teksti, osa, osia}. */
export function kirjausOsa(kirjaukset, viite, osa = 1) {
  const m = String(viite).match(/^(.+):(\d+)$/);
  if (!m) throw new Error('--kirjaus: anna muodossa tiedosto:rivi');
  const nimi = m[1].split('/').pop();
  const rivi = +m[2];
  const k = kirjaukset.find((x) => x.tiedosto === nimi && rivi >= x.alku && rivi <= x.loppu);
  if (!k) throw new Error(`Kirjausta ei löydy: ${viite}`);
  const osat = [];
  let jaljella = k.teksti.trimEnd();
  while (jaljella.length > OSAN_KOKO) {
    let raja = jaljella.lastIndexOf('\n', OSAN_KOKO);
    if (raja < OSAN_KOKO / 2) raja = jaljella.lastIndexOf(' ', OSAN_KOKO);
    if (raja < OSAN_KOKO / 2) raja = OSAN_KOKO;
    osat.push(jaljella.slice(0, raja));
    jaljella = jaljella.slice(raja).replace(/^[ \n]/, '');
  }
  osat.push(jaljella);
  if (osa < 1 || osa > osat.length) throw new Error(`--osa: kirjauksessa on ${osat.length} osaa`);
  const loppu = osa < osat.length
    ? `\n[osa ${osa}/${osat.length} – jatka: --kirjaus ${nimi}:${k.alku} --osa ${osa + 1}]`
    : (osat.length > 1 ? `\n[osa ${osa}/${osat.length}, loppu]` : '');
  return { teksti: `${osat[osa - 1]}${loppu}`, osa, osia: osat.length };
}

export function aja(argv, kansio) {
  const sanat = [];
  const o = { kaikki: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--kaikki') o.kaikki = true;
    else if (a === '--alkaen') o.alkaen = argv[++i];
    else if (a === '--kirjaus') o.kirjaus = argv[++i];
    else if (a === '--osa') o.osa = +argv[++i];
    else sanat.push(a);
  }
  if (!existsSync(kansio)) throw new Error(`Lokikansiota ei ole: ${kansio}`);
  const kirjaukset = lataa(kansio);
  if (o.kirjaus) return kirjausOsa(kirjaukset, o.kirjaus, o.osa || 1).teksti;
  const sana = sanat.join(' ');
  if (!sana.trim()) throw new Error('Käyttö: node tools/loki-hae.mjs <hakusana> [--alkaen pp.kk] [--kaikki] | --kirjaus tiedosto:rivi [--osa N]');
  return muotoileOsumat(hae(kirjaukset, sana, o), sana, o);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const juuri = dirname(dirname(fileURLToPath(import.meta.url)));
  try {
    console.log(aja(process.argv.slice(2), join(juuri, 'docs/raamattu-loki')));
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
