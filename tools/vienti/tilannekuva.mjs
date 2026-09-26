#!/usr/bin/env node
/*
 * SISÄLTÖPAKETIN TILANNEKUVA BUILDIIN (Siirtoseppä 26.9.2026, sovittu Natiivisepän kanssa; build 19, kohta 1:n osa 3).
 * Aloitusdata kylmässä käynnistyksessä ilman verkkoa: pieni osa julkaistusta paketista kopioidaan buildiin
 * (StreamingAssets/sisalto/tilannekuva/), ja natiivin PakettiPaivitys siirtää sen varastoon ensikäynnistyksessä.
 * Tilannekuva ei mene gitiin: Natiivisepän buildivaihe ajaa tämän käännöksen alussa.
 *
 *   node tools/vienti/tilannekuva.mjs --ulos <kansio> [--versio N] [--paa 1] [--juuri https://media.matkakirja.app/]
 *
 * Tulos (<kansio>/):
 *   osoitin.json        version osoitin (sama kuin ämpärin sisalto/<p>/v<N>/osoitin.json)
 *   hakemisto.json      version koko hakemisto (tarkistettu osoittimen tiivisteitä vasten)
 *   tiedostot/<sha256>  TILANNEKUVAN tiedostot sisällön mukaan avainnettuina (sama avain kuin natiivin varastossa)
 *   tilannekuva.json    { versio, polku, tiedostot: [polku…], tavuja }
 * Jokaisen tiedoston sha256 tarkistetaan; virhe → poistumiskoodi 1 eikä kansiota jätetä puolikkaaksi.
 */
import { createHash } from 'node:crypto';
import { mkdirSync, rmSync, renameSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Aloitusdata (Natiiviseppä 26.9.: kylmämittaus proto-3d/lokit/kohta1-kaynnistys-20260926.md). */
export const TILANNEKUVAN_TIEDOSTOT = [
  'kokoelmat/kaupungit.json',
  'kokoelmat/reitit.json',
  'kokoelmat/maarajat.json',
  'kokoelmat/aluenimet.json',
  'moduulit/js/ui-tekstit.json',
];

const sha = (b) => createHash('sha256').update(b).digest('hex');

/** Rivit "polku\tsha256\n" polun mukaan = osoitin.sha256 (julkaise-sisalto.mjs paketinTiiviste). */
export function hakemistonTiiviste(rivit) {
  return sha([...rivit].sort((a, b) => (a.polku < b.polku ? -1 : a.polku > b.polku ? 1 : 0))
    .map((r) => `${r.polku}\t${r.sha256}\n`).join(''));
}

async function oletusHae(url) {
  const v = await fetch(url);
  if (!v.ok) throw new Error(`${url}: ${v.status}`);
  return Buffer.from(await v.arrayBuffer());
}

/**
 * Kokoaa tilannekuvan. hae(url) → Buffer (testit antavat oman). Palauttaa { osoitin, tiedostot: Map(nimi → Buffer) },
 * jossa nimet ovat tulos-kansion suhteellisia polkuja.
 */
export async function kokoaTilannekuva({ juuri = 'https://media.matkakirja.app/', paa = 1, versio = null,
  tiedostot = TILANNEKUVAN_TIEDOSTOT, hae = oletusHae } = {}) {
  const osoitinUrl = versio ? `${juuri}sisalto/${paa}/v${versio}/osoitin.json` : `${juuri}sisalto/${paa}/uusin.json`;
  const osoitinTavut = await hae(osoitinUrl);
  const osoitin = JSON.parse(osoitinTavut.toString('utf8'));
  if (!osoitin.hakemisto?.sha256) throw new Error(`v${osoitin.versio}: osoittimessa ei hakemistoa (paketti ennen taustapäivityksen vaihetta 1)`);
  const hakemistoTavut = await hae(`${juuri}${osoitin.polku}${osoitin.hakemisto.polku}`);
  if (sha(hakemistoTavut) !== osoitin.hakemisto.sha256) throw new Error('hakemiston sha256 ei vastaa osoitinta');
  const rivit = JSON.parse(hakemistoTavut.toString('utf8')).tiedostot;
  if (hakemistonTiiviste(rivit) !== osoitin.sha256) throw new Error('hakemiston rivit eivät vastaa osoittimen sha256:ta');
  const ulos = new Map([['osoitin.json', osoitinTavut], ['hakemisto.json', hakemistoTavut]]);
  const mukana = [];
  for (const polku of tiedostot) {
    const r = rivit.find((x) => x.polku === polku);
    if (!r) throw new Error(`${polku} ei ole version v${osoitin.versio} hakemistossa`);
    const tavut = await hae(`${juuri}${osoitin.polku}${polku}`);
    if (sha(tavut) !== r.sha256) throw new Error(`${polku}: sha256 ei täsmää`);
    ulos.set(`tiedostot/${r.sha256}`, tavut);
    mukana.push(polku);
  }
  const tavuja = [...ulos.values()].reduce((a, b) => a + b.length, 0);
  ulos.set('tilannekuva.json', Buffer.from(`${JSON.stringify({ versio: osoitin.versio, polku: osoitin.polku, tiedostot: mukana, tavuja })}\n`));
  return { osoitin, tiedostot: ulos };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const arg = (n, oletus) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : oletus; };
  const kansio = arg('--ulos', null);
  if (!kansio) { console.error('käyttö: node tools/vienti/tilannekuva.mjs --ulos <kansio> [--versio N] [--paa 1]'); process.exit(2); }
  try {
    const { osoitin, tiedostot } = await kokoaTilannekuva({
      juuri: arg('--juuri', 'https://media.matkakirja.app/'), paa: Number(arg('--paa', 1)), versio: arg('--versio', null),
    });
    // Valmis kansio kokonaan tai ei ollenkaan: kirjoitus väliaikaiskansioon ja vaihto.
    const kohde = resolve(kansio); const tmp = `${kohde}.tmp-${process.pid}`;
    rmSync(tmp, { recursive: true, force: true });
    for (const [nimi, tavut] of tiedostot) { mkdirSync(join(tmp, nimi, '..'), { recursive: true }); writeFileSync(join(tmp, nimi), tavut); }
    rmSync(kohde, { recursive: true, force: true });
    renameSync(tmp, kohde);
    const koko = [...tiedostot.values()].reduce((a, b) => a + b.length, 0);
    console.log(`Tilannekuva v${osoitin.versio} (${osoitin.skeemaversio}): ${tiedostot.size - 3} tiedostoa, ${(koko / 1e6).toFixed(1)} Mt → ${kohde}`);
  } catch (e) {
    console.error(`TILANNEKUVA VIKA: ${e.message}`);
    process.exit(1);
  }
}
