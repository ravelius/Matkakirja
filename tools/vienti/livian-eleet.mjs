#!/usr/bin/env node
/*
 * LIVIAN PUHE-ELEIDEN AJAT (Siirtoseppä 23.9.2026, skeema 1.11).
 *
 *   node tools/vienti/livian-eleet.mjs --paivita
 *
 * Hakee jokaisen luentakommentin (js/livia-pilotti-cuet.js) ratkaistut
 * cue-ajat ämpäristä (.eleet.json äänen vieressä) ja soivan mp3:n, ja
 * tarkistaa ne pelin omalla validaattorilla
 * (js/livia-puheeleet-lataus.js tarkistaLivianPilottiData): revision,
 * näkyvä teksti ja sen SHA-256, mp3:n nimi, tavut ja SHA-256 sekä cue-lista.
 * Tulos kirjoitetaan tiedostoon livian-eleet.json. Vienti lukee vain tämän
 * commitoidun tiedoston eikä käytä verkkoa.
 *
 * Tila kaupungeittain: ok (eleet = [{ id, alku, loppu }] ms), puuttuu
 * (ämpärissä ei .eleet.json-tiedostoa) tai hylatty (syy = validaattorin
 * vastaus). Vienti merkitsee rivin vanhentuneeksi, jos kortin tekstiSha256
 * on muuttunut haun jälkeen.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const TAMA = dirname(fileURLToPath(import.meta.url));
export const ELETIEDOSTO = join(TAMA, 'livian-eleet.json');

export function lueLivianEleet() {
  return existsSync(ELETIEDOSTO) ? JSON.parse(readFileSync(ELETIEDOSTO, 'utf8')) : { kaupungit: {} };
}

/** Kortin tila viennissä: haun tulos, tai vanhentunut, jos teksti on vaihtunut. */
export function eleidenTila(tallennettu, kortti) {
  if (!tallennettu) return { tila: 'ei-haettu' };
  if (tallennettu.tekstiSha256 !== kortti.tekstiSha256 || tallennettu.revision !== kortti.revision) {
    return { tila: 'vanhentunut' };
  }
  return tallennettu;
}

async function paivita() {
  const { LIVIAN_LUENTA_CUET } = await import('../../js/livia-pilotti-cuet.js');
  const { livianAaniOsoite } = await import('../../js/liviapuhe.js');
  const { livianEleidenOsoite, tarkistaLivianPilottiData } = await import('../../js/livia-puheeleet-lataus.js');
  const { laskeSha256 } = await import('../../js/luentareaktiot.js');
  const { kaupunginRepliikit } = await import('../generoi-pulu.mjs');
  const tulos = {};
  const laskuri = { ok: 0, puuttuu: 0, hylatty: 0 };
  for (const kortti of Object.values(LIVIAN_LUENTA_CUET).sort((a, b) => (a.kaupunki < b.kaupunki ? -1 : 1))) {
    const { kaupunki, kentta, kupla } = kortti;
    const indeksi = Number(kortti.avain.split('-').at(-1)) - 1;
    const aani = livianAaniOsoite(kaupunki, indeksi);
    const perus = { revision: kortti.revision, tekstiSha256: kortti.tekstiSha256 };
    const eleVastaus = await fetch(livianEleidenOsoite(aani));
    if (!eleVastaus.ok) {
      tulos[kaupunki] = { ...perus, tila: 'puuttuu', http: eleVastaus.status };
      laskuri.puuttuu += 1;
      continue;
    }
    const data = await eleVastaus.json();
    const aaniVastaus = await fetch(aani);
    const tavut = new Uint8Array(await aaniVastaus.arrayBuffer());
    const sha256 = await laskeSha256(tavut);
    // Näkyvä teksti samasta pakkauksesta kuin pelissä (kupla = rivi).
    const teksti = kaupunginRepliikit(kaupunki)[indeksi] ?? '';
    const tarkistus = await tarkistaLivianPilottiData(data, {
      kaupunki, kentta, kupla, teksti, aani: { tavut: tavut.byteLength, sha256 },
    });
    if (!tarkistus.ok) {
      tulos[kaupunki] = { ...perus, tila: 'hylatty', syy: tarkistus.syy };
      laskuri.hylatty += 1;
      continue;
    }
    tulos[kaupunki] = {
      ...perus, tila: 'ok', aani: { tavut: tavut.byteLength, sha256 },
      eleet: tarkistus.eleet.map((e) => ({ id: e.id, alku: e.alku, loppu: e.loppu })),
    };
    laskuri.ok += 1;
  }
  const data = {
    lahde: 'media.matkakirja.app .eleet.json + mp3, tarkistettu js/livia-puheeleet-lataus.js tarkistaLivianPilottiData',
    yksikko: 'ms äänen alusta', haettu: new Date().toISOString().slice(0, 10), kaupungit: tulos,
  };
  writeFileSync(ELETIEDOSTO, `${JSON.stringify(data, null, 1)}\n`);
  return laskuri;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (!process.argv.includes('--paivita')) {
    console.error('käyttö: node tools/vienti/livian-eleet.mjs --paivita');
    process.exit(1);
  }
  console.log(JSON.stringify(await paivita()));
  process.exit(0);
}
