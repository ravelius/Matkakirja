// Commons-apuri: haku, lisenssi/tekijä, esikatselukuvan lataus.
//
//   node commons.mjs haku "saffron iran" 20
//   node commons.mjs tiedot "File:Foo.jpg" "File:Bar.jpg"
//   node commons.mjs lataa "Foo.jpg" 900        -> kuvat/foo.jpg
//
// Tulostaa aina sen, mitä tarkistettiin (kpl-määrät), ei vain tulosta.

import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const AGENTTI = 'Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)';
const KUVAT = join(process.env.KUVAKANSIO ?? import.meta.dirname, 'kuvat');
const curl = (args) => execFileSync('curl',
  ['-sS', '--max-time', '60', '--retry', '2', '--retry-delay', '3', '-A', AGENTTI, ...args],
  { maxBuffer: 1e8 });
const json = (url) => JSON.parse(curl(['-sS', url]).toString());
const API = 'https://commons.wikimedia.org/w/api.php';

const SALLITUT = /^(cc0|cc-by-sa-[0-9.]+|cc-by-[0-9.]+|pd|public domain)/i;

function haku(kysely, raja = 20) {
  const url = `${API}?action=query&format=json&generator=search`
    + `&gsrsearch=${encodeURIComponent(kysely)}&gsrnamespace=6&gsrlimit=${raja}`
    + '&prop=imageinfo&iiprop=extmetadata|url|size&iiurlwidth=600';
  const d = json(url);
  const sivut = Object.values(d.query?.pages || {});
  console.log(`# haku "${kysely}": ${sivut.length} osumaa`);
  for (const s of sivut) {
    const ii = s.imageinfo?.[0]; if (!ii) continue;
    const em = ii.extmetadata || {};
    const lis = (em.LicenseShortName?.value || '?').replace(/<[^>]+>/g, '');
    const tek = (em.Artist?.value || '?').replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ').slice(0, 60);
    console.log(`${SALLITUT.test(lis.replace(/\s/g, '-')) ? 'OK ' : '?? '}${lis} | ${s.title} | ${ii.width}x${ii.height} | ${tek}`);
  }
}

function tiedot(...titles) {
  const url = `${API}?action=query&format=json&titles=${encodeURIComponent(titles.join('|'))}`
    + '&prop=imageinfo&iiprop=extmetadata|url|size&iiurlwidth=600';
  const d = json(url);
  const sivut = Object.values(d.query?.pages || {});
  console.log(`# tiedot: pyydetty ${titles.length}, saatu ${sivut.length}`);
  for (const s of sivut) {
    const ii = s.imageinfo?.[0];
    if (!ii) { console.log(`PUUTTUU ${s.title}`); continue; }
    const em = ii.extmetadata || {};
    const pura = (k) => (em[k]?.value || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log('---');
    console.log('title:', s.title);
    console.log('koko :', ii.width + 'x' + ii.height);
    console.log('lisen:', pura('LicenseShortName'), '|', pura('UsageTerms'));
    console.log('tekij:', pura('Artist').slice(0, 120));
    console.log('kuvaus:', pura('ImageDescription').slice(0, 300));
    console.log('paikka:', pura('Categories').slice(0, 200));
  }
}

function lataa(nimi, leveys = 900) {
  mkdirSync(KUVAT, { recursive: true });
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(nimi)}?width=${leveys}`;
  const buf = curl(['-L', url]);
  const tied = nimi.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
  const pol = join(KUVAT, tied.endsWith('-jpg') || tied.endsWith('-png') ? tied.replace(/-(jpg|png)$/, '.$1') : tied + '.jpg');
  writeFileSync(pol, buf);
  console.log(`ladattu ${buf.length} tavua -> ${pol}`);
}

function luokka(nimi, raja = 40) {
  const url = `${API}?action=query&format=json&generator=categorymembers`
    + `&gcmtitle=${encodeURIComponent('Category:' + nimi)}&gcmtype=file&gcmlimit=${raja}`
    + '&prop=imageinfo&iiprop=extmetadata|size';
  const d = json(url);
  if (d.error) { console.log('VIRHE:', d.error.info); return; }
  const sivut = Object.values(d.query?.pages || {});
  console.log(`# luokka "${nimi}": ${sivut.length} tiedostoa`);
  for (const s of sivut) {
    const ii = s.imageinfo?.[0]; if (!ii) continue;
    const em = ii.extmetadata || {};
    const lis = (em.LicenseShortName?.value || '?').replace(/<[^>]+>/g, '');
    const tek = (em.Artist?.value || '?').replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ').slice(0, 40);
    console.log(`${SALLITUT.test(lis.replace(/\s/g, '-')) ? 'OK ' : '?? '}${lis} | ${s.title} | ${ii.width}x${ii.height} | ${tek}`);
  }
}

function alaluokat(nimi, raja = 50) {
  const url = `${API}?action=query&format=json&list=categorymembers`
    + `&cmtitle=${encodeURIComponent('Category:' + nimi)}&cmtype=subcat&cmlimit=${raja}`;
  const d = json(url);
  const l = d.query?.categorymembers || [];
  console.log(`# alaluokat "${nimi}": ${l.length}`);
  for (const c of l) console.log(c.title);
}

const [komento, ...loput] = process.argv.slice(2);
if (komento === 'luokka') luokka(loput[0], loput[1]);
else if (komento === 'alaluokat') alaluokat(loput[0], loput[1]);
else if (komento === 'haku') haku(loput[0], loput[1]);
else if (komento === 'tiedot') tiedot(...loput);
else if (komento === 'lataa') lataa(loput[0], loput[1]);
else console.log('komennot: haku | tiedot | lataa');
