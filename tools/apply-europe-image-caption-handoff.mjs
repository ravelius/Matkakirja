#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';

const ROOT = new URL('../', import.meta.url);
const input = process.argv[2];
if (!input) throw new Error('Anna kuvatekstien handoff.json polkuna.');
const handoff = JSON.parse(readFileSync(resolve(input), 'utf8'));

if (handoff.counts?.longReplacements !== 106 || handoff.counts?.shortReplacements !== 8) {
  throw new Error('Handoffin odotetut määrät 106/8 eivät täsmää.');
}

function imageFor(city, slot) {
  const pack = FOKUSVIRRAT[city];
  if (!pack) throw new Error(`${city}: pack puuttuu`);
  if (slot === 'I1') return pack.matkakirja.luentakuva;
  if (slot === 'I2') return pack.matkakirja.luentakuva2;
  const pulu = slot.match(/^P(\d+)$/);
  if (pulu) return pack.pollo.kuvat?.[Number(pulu[1]) - 1];
  throw new Error(`${city}: tuntematon slot ${slot}`);
}

function quoted(value) {
  return `'${value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`;
}

function replaceExpression(source, from, key, rendered) {
  const at = source.indexOf(`${key}:`, from);
  if (at < 0) throw new Error(`${key}: kenttä puuttuu`);
  const nextImage = source.indexOf('osoite:', from + 1);
  if (nextImage >= 0 && at > nextImage) throw new Error(`${key}: karkasi seuraavaan kuvaobjektiin`);
  let i = at + key.length + 1;
  while (/\s/.test(source[i])) i++;
  const start = i;
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (; i < source.length; i++) {
    const ch = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') { quote = ch; continue; }
    if ('([{'.includes(ch)) depth++;
    else if (')]}'.includes(ch)) depth--;
    else if (ch === ',' && depth === 0) break;
  }
  if (i >= source.length) throw new Error(`${key}: lausekkeen loppu puuttuu`);
  return source.slice(0, start) + rendered + source.slice(i);
}

// Varmista koko handoff ennen ensimmäistäkään kirjoitusta.
for (const item of handoff.items) {
  const image = imageFor(item.city, item.slot);
  if (!image) throw new Error(`${item.city}/${item.slot}: kuva puuttuu`);
  if (image.osoite !== item.url) throw new Error(`${item.city}/${item.slot}: URL ei täsmää`);
  if (image.lyhyt !== item.oldShort) throw new Error(`${item.city}/${item.slot}: oldShort ei täsmää`);
  if (image.selite !== item.oldLong) throw new Error(`${item.city}/${item.slot}: oldLong ei täsmää`);
  for (const [key, expected] of Object.entries(item.preserveFields ?? {})) {
    if (JSON.stringify(image[key]) !== JSON.stringify(expected)) {
      throw new Error(`${item.city}/${item.slot}: säilytettävä ${key} ei täsmää`);
    }
  }
}

const byCity = Map.groupBy(handoff.items, (item) => item.city);
let shortCount = 0;
let longCount = 0;
for (const [city, items] of byCity) {
  const packUrl = new URL(`js/packs/fokusvirta-${city}.js`, ROOT);
  let source = readFileSync(packUrl, 'utf8');
  for (const item of items) {
    const marker = item.url;
    const at = source.indexOf(marker);
    if (at < 0 || source.indexOf(marker, at + marker.length) >= 0) {
      throw new Error(`${city}/${item.slot}: URL ei ole yksikäsitteinen lähdekoodissa`);
    }
    if (item.replaceShort !== null) {
      source = replaceExpression(source, at, 'lyhyt', quoted(item.replaceShort));
      shortCount++;
    }
    source = replaceExpression(source, at, 'selite', quoted(item.replaceLong));
    longCount++;
  }
  writeFileSync(packUrl, source);
}

if (shortCount !== 8 || longCount !== 106) throw new Error(`Korvausmäärä ${shortCount}/${longCount}`);
console.log(`Kuvatekstit: ${byCity.size} kaupunkia, ${longCount} pitkää ja ${shortCount} lyhyttä korvattu.`);
