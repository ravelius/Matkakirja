#!/usr/bin/env node
/*
 * NATIIVIN "MITÄ UUTTA" -RIVIT (skeema 1.22, Natiivi-UI:n MitaUutta.cs).
 * Julkaisija lisää rivin jokaisesta TestFlight-buildista (build = CFBundleVersion), joka on
 * ladattu App Store Connectiin. Omistaja 30.9.2026: versio kiinteä 1.1 ja build juokseva
 * ordinaali (73, 74, …); vanhemmat rivit 1.0.<ordinaali> (aikaleima) jäävät ennalleen:
 *
 *   node tools/vienti/muutosloki-natiivi.mjs --versio "1.1 (73)" \
 *     --teksti "Radiolinssi natiivissa. Korjattu asemien suodatus." [--paiva 2026-09-24]
 *
 * Käsivienti (proto3d-testflight.yml) hylätään, jos rivi puuttuu: mergeä rivi ensin ja anna
 * sama -f ordinaali=<numero> (oletus = laskuri + 1).
 *
 * Tiedosto tools/vienti/muutosloki-natiivi.json, rivit uusin ensin.
 * Natiivi näyttää rivin muodossa "v<versio>  teksti (paiva)".
 * Sisältöpäivitysten rivit tulevat osoittimeen automaattisesti
 * (julkaise-sisalto.mjs muutosRivi), niitä ei kirjoiteta tänne.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const TIEDOSTO = new URL('./muutosloki-natiivi.json', import.meta.url);
const VERSIO = /^\d+\.\d+(?:\.\d+)? \(\d+\)$/;
const PAIVA = /^\d{4}-\d{2}-\d{2}$/;

/** Palauttaa virhelistan; tyhjä lista = rivit kelpaavat. */
export function tarkistaMuutosloki(rivit) {
  const virheet = [];
  const nahty = new Set();
  rivit.forEach((r, i) => {
    const kohta = `rivi ${i + 1} (${r?.versio ?? '?'})`;
    if (!VERSIO.test(String(r?.versio ?? ''))) virheet.push(`${kohta}: versio muotoa "1.1 (73)" tai "1.0.0 (3)"`);
    if (nahty.has(r?.versio)) virheet.push(`${kohta}: sama versio kahdesti`);
    nahty.add(r?.versio);
    if (!PAIVA.test(String(r?.paiva ?? '')) || Number.isNaN(Date.parse(r.paiva))) virheet.push(`${kohta}: paiva muotoa YYYY-MM-DD`);
    const t = String(r?.teksti ?? '').trim();
    const lauseita = t.split(/[.!?](?:\s|$)/).filter((s) => s.trim()).length;
    if (!t) virheet.push(`${kohta}: teksti puuttuu`);
    else if (lauseita > 3 || t.length > 280) virheet.push(`${kohta}: teksti enintään 3 lausetta ja 280 merkkiä`);
    const extra = Object.keys(r ?? {}).filter((k) => !['versio', 'paiva', 'teksti'].includes(k));
    if (extra.length) virheet.push(`${kohta}: tuntemattomat kentät ${extra.join(', ')}`);
  });
  return virheet;
}

export function lueMuutosloki(tiedosto = TIEDOSTO) {
  const loki = JSON.parse(readFileSync(tiedosto, 'utf8'));
  const virheet = tarkistaMuutosloki(loki.rivit ?? []);
  if (virheet.length) throw new Error(`muutosloki-natiivi.json:\n  ${virheet.join('\n  ')}`);
  return loki;
}

/**
 * Uusin ensin: päivä laskevasti, saman päivän sisällä versio laskevasti ja sitten build-numero.
 * Omistaja 30.9.2026: versio on kiinteä 1.1 ja build juokseva ordinaali (73, 74, …), joten
 * "1.1 (73)" on uudempi kuin saman päivän "1.0.72 (202609301134)" vaikka build on pienempi.
 */
export function jarjesta(rivit) {
  const build = (v) => Number(/\((\d+)\)/.exec(v)?.[1] ?? 0);
  const osat = (v) => String(v).split(' ')[0].split('.').map(Number);
  const versio = (a, b) => {
    const x = osat(a), y = osat(b);
    for (let i = 0; i < Math.max(x.length, y.length); i++) if ((x[i] ?? 0) !== (y[i] ?? 0)) return (x[i] ?? 0) - (y[i] ?? 0);
    return 0;
  };
  return [...rivit].sort((a, b) => b.paiva.localeCompare(a.paiva) || versio(b.versio, a.versio) || build(b.versio) - build(a.versio));
}

function main(argv) {
  const arvo = (nimi) => { const i = argv.indexOf(nimi); return i >= 0 ? argv[i + 1] : undefined; };
  const versio = arvo('--versio');
  const teksti = arvo('--teksti');
  if (!versio || !teksti) {
    console.error('Käyttö: node tools/vienti/muutosloki-natiivi.mjs --versio "1.1 (73)" --teksti "…" [--paiva YYYY-MM-DD]');
    process.exit(2);
  }
  const paiva = arvo('--paiva') ?? new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Helsinki' });
  const loki = JSON.parse(readFileSync(TIEDOSTO, 'utf8'));
  const rivit = jarjesta([...(loki.rivit ?? []), { versio, paiva, teksti: teksti.trim() }]);
  const virheet = tarkistaMuutosloki(rivit);
  if (virheet.length) { console.error(virheet.join('\n')); process.exit(1); }
  writeFileSync(TIEDOSTO, `${JSON.stringify({ ...loki, rivit }, null, 1)}\n`);
  console.log(`muutosloki-natiivi: lisätty v${versio} (${paiva}); rivejä ${rivit.length}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main(process.argv.slice(2));
