#!/usr/bin/env node
/*
 * SKEEMASOPIMUS (Fable 24.9.2026): paketin skeemanumeron pitää vastata sen
 * kenttiä. Tausta: ämpärin v11 (koepaketti 942cc9446, 23.9. klo 18.13)
 * ilmoitti skeemaksi 1.10, mutta 1.10:tä laajennettiin sen jälkeen samalla
 * numerolla (luennat.reaktiot klo 18.22, kaupungit.korkeus klo 19.22).
 * Natiivi luki "1.10" ja odotti kenttiä, joita paketissa ei ollut.
 *
 * Kaksi tarkistusta (julkaise-sisalto.mjs tarkistaPaketti, siis CI ja testit):
 *  1. VAATIMUKSET: jokaisen versioon asti kuuluvan version tunnuskentät
 *     löytyvät paketista (ja 1.14:n poistot puuttuvat).
 *  2. KENTTÄKUVA: kokoelmien päätason kentät, manifestin ja offline.jsonin
 *     avaimet tiivisteenä (skeemakentat.json). Jos kentät muuttuvat, versio
 *     on nostettava; saman version tiivistettä ei voi vaihtaa.
 *
 *   node tools/vienti/skeemasopimus.mjs --paivita [--vienti dist/vienti]
 *
 * kirjoittaa nykyisen version tiivisteen. Se kieltäytyy, jos versiolla on jo
 * eri tiiviste: nosta SKEEMAVERSIO_TARKKA (vie-sisalto.mjs), lisää sille
 * rivi VAATIMUKSIIN ja historiakommenttiin, aja vienti ja --paivita.
 */
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const KENTTAKUVA = new URL('./skeemakentat.json', import.meta.url);
const VAKIOAVAIMET = new Set(['$skeema', 'nimi', 'lahde', 'kuvaus', 'viittaukset', 'alkiot']);

/*
 * Tunnuskentät versioittain. Muodot:
 *   'kokoelma:<nimi>'          kokoelma on manifestissa
 *   '<kokoelma>.<kenttä>'       jollakin alkiolla on päätason kenttä
 *   '<kokoelma>#<id>'           alkio tällä id:llä on olemassa
 *   '<kokoelma>/<avain>'        kokoelman juuressa on avain (esim. maakuntarajat/kaaret)
 *   'manifest.<avain>' | 'offline.<avain>' | 'offline.maat.*.<avain>' | 'media.<avain>'
 *   '!…'                       ei saa olla (poistot)
 */
export const VAATIMUKSET = {
  '1.9': ['kokoelma:kuvakysymykset', 'kokoelma:lippumaat', 'kokoelma:pulmaaineisto', 'kokoelma:luennat',
    'kokoelma:livianpuhe', 'kokoelma:maat', 'manifest.offline'],
  '1.10': ['kokoelma:karttamerkit', 'kokoelma:karttavalot', 'kokoelma:maastonimet', 'kokoelma:maarajat',
    'kaupungit.korkeus', 'luennat.reaktiot', 'luennat.tekstiSha256', 'saannot#KATKOKUVA'],
  '1.11': ['livianpuhe.cuet', 'livianpuhe.eleetTila', 'kokoelma:livianrepliikit'],
  '1.12': ['saannot#LIVIAN_ASTRONAUTTI_KYPARA'],
  '1.13': ['media.leveys'],
  '1.14': ['!kokoelma:kaksintaistelut', '!saannot#DUEL_PRIZE', '!saannot#BOT_SKILL'],
  '1.15': ['kaupunkilehdet.aiheet', 'maalehdet.aiheet', 'kokoelma:kulttuurivisat', 'kokoelma:saatiedot',
    'kokoelma:maakuntarajat', 'manifest.lisenssit'],
  '1.16': ['kokoelma:radiot', 'radiot.luokka'],
  '1.17': ['kokoelma:kohdekartat', 'kokoelma:lehtitehtavat'],
  '1.18': ['nahtavyydet.nimi', 'nahtavyydet.kappaleet', 'miniatyyrit.kuva'],
  '1.19': ['kysymykset.kysymys', 'kysymykset.vaihtoehdot', 'pulmat.generaattori'],
  '1.20': ['elaintayt.elain', 'julisteet.kuva'],
  '1.21': ['fokusvirrat.virta', 'laatat.tyypit', 'laatat.maarat'],
  '1.22': ['kokoelma:muutosloki-natiivi'],
  '1.23': ['offline.ryhmat', 'offline.maat.*.manner'],
  '1.24': ['kokoelma:saapumistekstit', 'kokoelma:takynostot', 'kokoelma:liviansaapumiset'],
  '1.25': ['maakuntarajat/kaaret'],
};

export function vertaa(a, b) {
  const [aM, am] = String(a).split('.').map(Number);
  const [bM, bm] = String(b).split('.').map(Number);
  return aM !== bM ? aM - bM : am - bm;
}

function lukija(tiedostot) {
  const valimuisti = new Map();
  const lue = (p) => {
    if (!valimuisti.has(p)) valimuisti.set(p, tiedostot.has(p) ? JSON.parse(tiedostot.get(p)) : null);
    return valimuisti.get(p);
  };
  const manifest = lue('manifest.json');
  const kokoelma = (nimi) => {
    const k = manifest.kokoelmat.find((x) => x.nimi === nimi);
    return k ? lue(k.tiedosto) : null;
  };
  return { lue, manifest, kokoelma };
}

function tayttyy(ehto, { lue, manifest, kokoelma }) {
  if (ehto.startsWith('kokoelma:')) return Boolean(kokoelma(ehto.slice(9)));
  if (ehto.startsWith('manifest.')) return manifest[ehto.slice(9)] !== undefined;
  if (ehto.startsWith('offline.')) {
    const o = manifest.offline ? lue(manifest.offline.tiedosto) : null;
    if (!o) return false;
    const m = /^offline\.maat\.\*\.(.+)$/.exec(ehto);
    if (m) { const maat = Object.values(o.maat ?? {}); return maat.length > 0 && maat.every((x) => x[m[1]] !== undefined); }
    return o[ehto.slice(8)] !== undefined;
  }
  if (ehto.startsWith('media.')) {
    const md = lue(manifest.media.tiedosto);
    return (md?.viitteet ?? []).some((v) => v[ehto.slice(6)] !== undefined);
  }
  const juuri = /^([^#./]+)\/(.+)$/.exec(ehto);
  if (juuri) return kokoelma(juuri[1])?.[juuri[2]] !== undefined;
  const id = /^([^#.]+)#(.+)$/.exec(ehto);
  if (id) return (kokoelma(id[1])?.alkiot ?? []).some((a) => a.id === id[2]);
  const [k, kentta] = ehto.split('.');
  return (kokoelma(k)?.alkiot ?? []).some((a) => a[kentta] !== undefined);
}

/** Paketin kenttäkuva: { kokoelmat: { nimi: [kentät] }, manifest: [...], offline: [...] }. */
export function kenttakuva(tiedostot) {
  const { lue, manifest, kokoelma } = lukija(tiedostot);
  const kokoelmat = {};
  for (const { nimi } of [...manifest.kokoelmat].sort((a, b) => a.nimi.localeCompare(b.nimi))) {
    const kentat = new Set();
    const k = kokoelma(nimi);
    for (const a of k?.alkiot ?? []) for (const x of Object.keys(a)) kentat.add(x);
    // Kokoelman juuren lisäavaimet (vakioavainten lisäksi) merkitään '/avain'.
    for (const x of Object.keys(k ?? {})) if (!VAKIOAVAIMET.has(x)) kentat.add(`/${x}`);
    kokoelmat[nimi] = [...kentat].sort();
  }
  const o = manifest.offline ? lue(manifest.offline.tiedosto) : null;
  return { kokoelmat, manifest: Object.keys(manifest).sort(), offline: o ? Object.keys(o).sort() : [] };
}

export function kuvanTiiviste(kuva) {
  return createHash('sha256').update(JSON.stringify(kuva)).digest('hex').slice(0, 16);
}

function lueKuvat(tiedosto = KENTTAKUVA) {
  return existsSync(tiedosto) ? JSON.parse(readFileSync(tiedosto, 'utf8')) : { tiivisteet: {} };
}

/** Palauttaa virhelistan; tyhjä = paketti vastaa skeemaversiotaan. */
export function tarkistaSopimus(tiedostot, skeemaversio, { kuvat = lueKuvat() } = {}) {
  const virheet = [];
  const l = lukija(tiedostot);
  if (!VAATIMUKSET[skeemaversio]) virheet.push(`skeemasopimus: versiolla ${skeemaversio} ei ole riviä VAATIMUKSISSA (tools/vienti/skeemasopimus.mjs)`);
  for (const [v, ehdot] of Object.entries(VAATIMUKSET)) {
    if (vertaa(v, skeemaversio) > 0) continue;
    for (const e of ehdot) {
      const kielto = e.startsWith('!');
      if (tayttyy(kielto ? e.slice(1) : e, l) === kielto) {
        virheet.push(`skeemasopimus: ${skeemaversio} vaatii ${v}:n ${kielto ? 'poiston' : 'kentän'} ${e}`);
      }
    }
  }
  const t = kuvanTiiviste(kenttakuva(tiedostot));
  const odotettu = kuvat.tiivisteet?.[skeemaversio];
  if (!odotettu) virheet.push(`skeemasopimus: versiolle ${skeemaversio} ei ole kenttäkuvaa; aja node tools/vienti/skeemasopimus.mjs --paivita`);
  else if (odotettu !== t) {
    virheet.push(`skeemasopimus: kentät muuttuivat, mutta skeemaversio on yhä ${skeemaversio} (${odotettu} → ${t}). `
      + 'Nosta SKEEMAVERSIO_TARKKA ja aja --paivita (ks. tools/vienti/skeemasopimus.mjs).');
  }
  return virheet;
}

function lueKansio(kansio) {
  const ulos = new Map();
  const kay = (d) => {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) kay(p);
      else if (f.endsWith('.json')) ulos.set(relative(kansio, p).split('\\').join('/'), readFileSync(p, 'utf8'));
    }
  };
  kay(kansio);
  return ulos;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { SKEEMAVERSIO_TARKKA, JUURI } = await import('./vie-sisalto.mjs');
  const i = process.argv.indexOf('--vienti');
  const tiedostot = lueKansio(resolve(i > 0 ? process.argv[i + 1] : join(JUURI, 'dist/vienti')));
  const kuva = kenttakuva(tiedostot);
  const t = kuvanTiiviste(kuva);
  const kuvat = lueKuvat();
  if (process.argv.includes('--paivita')) {
    const vanha = kuvat.tiivisteet?.[SKEEMAVERSIO_TARKKA];
    if (vanha && vanha !== t) {
      console.error(`Versiolla ${SKEEMAVERSIO_TARKKA} on jo eri kenttäkuva (${vanha}); nosta skeemaversio.`);
      process.exit(1);
    }
    const tiivisteet = { ...kuvat.tiivisteet, [SKEEMAVERSIO_TARKKA]: t };
    writeFileSync(KENTTAKUVA, `${JSON.stringify({
      kuvaus: 'Skeemasopimuksen kenttäkuvat: tiiviste per skeemaversio (tools/vienti/skeemasopimus.mjs). '
        + 'Saman version tiivistettä ei muuteta; uudet kentät = uusi versio.',
      tiivisteet: Object.fromEntries(Object.entries(tiivisteet).sort(([a], [b]) => vertaa(a, b))),
      uusin: { skeemaversio: SKEEMAVERSIO_TARKKA, ...kuva },
    }, null, 1)}\n`);
    console.log(`skeemasopimus: ${SKEEMAVERSIO_TARKKA} = ${t}`);
  } else {
    const v = tarkistaSopimus(tiedostot, SKEEMAVERSIO_TARKKA, { kuvat });
    console.log(v.length ? v.join('\n') : `skeemasopimus: ${SKEEMAVERSIO_TARKKA} ok (${t})`);
    process.exit(v.length ? 1 : 0);
  }
}
