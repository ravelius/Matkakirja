#!/usr/bin/env node
/*
 * ÄMPÄRIN AUKOT VIIKKORAPORTIKSI (Siirtoseppä 23.9.2026).
 *
 *   node tools/vienti/aukkoraportti.mjs [--vienti dist/vienti] [--ulos aukot.md]
 *
 * Lukee tarkista-media.mjs --kaikki -ajon tuloksen (media-tarkistus.json)
 * ja kirjoittaa markdown-raportin GitHub-issueen
 * (.github/workflows/amparin-aukot.yml, viikoittain, ei PR-portissa).
 * Siirtoputkiraportin osan 5.7 riski 5: ämpärin aukko näkyy pelissä
 * vasta varareitin kautta tai ei ollenkaan, joten se pitää huomata ennen
 * pelaajaa.
 *
 * Ryhmät:
 *   puuttuu   ei vastaa ämpäristä eikä miltään varareitiltä (väärä nimi?)
 *   varalla   ämpäristä puuttuu, mutta alkuperäinen lähde vastaa:
 *             peilaus (tools/peilaa-media.mjs) ei ole hakenut sitä
 *   varapolku `oma`-kentän repopolku, jonka rivillä on oikea ämpäriosoite
 *             (siirtoputkiraportin havainto 1): ei ämpärin aukko
 *
 * GITHUB_OUTPUT: aukkoja=<puuttuu + varalla>.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Ryhmittelee tarkistuksen puuttuvat. `media` = media.json:n viitteet. */
export function ryhmittele(tarkistus, media) {
  const esiintymat = new Map(media.map((v) => [v.arvo, v.esiintymat]));
  const ryhmat = { puuttuu: [], varalla: [], varapolku: [] };
  for (const p of tarkistus.puuttuvat) {
    const e = esiintymat.get(p.arvo) ?? [];
    const vainOma = e.length > 0 && e.every((x) => /\/oma$/.test(x.polku));
    const ryhma = vainOma ? 'varapolku' : p.tila === 'vara' ? 'varalla' : 'puuttuu';
    ryhmat[ryhma].push({ ...p, moduuli: e[0]?.moduuli ?? '?' });
  }
  return ryhmat;
}

/** Markdown issueen. */
export function markdown(tarkistus, ryhmat, { commit = '', ajettu = '' } = {}) {
  const rivi = (x) => `- \`${x.laji}\` ${x.arvo} (${x.moduuli})`;
  const osio = (otsikko, lista, selite) => (lista.length
    ? [`### ${otsikko}: ${lista.length}`, '', selite, '', ...lista.slice(0, 200).map(rivi),
      ...(lista.length > 200 ? [`- … ja ${lista.length - 200} muuta`] : []), '']
    : []);
  const tarkistettu = Object.values(tarkistus.lajit).reduce((a, l) => a + l.tarkistettu, 0);
  return [
    `Viikoittainen ämpärin tarkistus (\`tools/vienti/tarkista-media.mjs --kaikki\`)${commit ? `, commit ${commit.slice(0, 9)}` : ''}${ajettu ? `, ${ajettu}` : ''}.`,
    `Tarkistettu ${tarkistettu} pelin omaa mediaosoitetta. Aukkoja **${ryhmat.puuttuu.length + ryhmat.varalla.length}**.`,
    '',
    ...osio('Puuttuu kokonaan', ryhmat.puuttuu, 'Ei vastaa ämpäristä eikä varareitiltä: todennäköisesti väärä tiedostonimi datassa.'),
    ...osio('Vain varareitillä', ryhmat.varalla, 'Alkuperäinen lähde vastaa, mutta ämpäristä puuttuu: aja peilaus (`.github/workflows/peilaa.yml`) tai tarkista `tools/peilaa-media.mjs`:n lähteet.'),
    ...osio('Repon varapolut (ei aukko)', ryhmat.varapolku, '`oma`-kentän repopolku; saman rivin `ampari`-osoite on oikea (siirtoputkiraportin havainto 1). Tiedoksi.'),
    'Issue päivittyy joka viikko ja sulkeutuu itsestään, kun aukkoja ei ole.',
  ].join('\n');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const arg = (n, o) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : o; };
  const vienti = resolve(arg('--vienti', 'dist/vienti'));
  const tarkistus = JSON.parse(readFileSync(join(vienti, 'media-tarkistus.json'), 'utf8'));
  const media = JSON.parse(readFileSync(join(vienti, 'media.json'), 'utf8')).viitteet;
  const ryhmat = ryhmittele(tarkistus, media);
  const teksti = markdown(tarkistus, ryhmat, { commit: process.env.GITHUB_SHA ?? '', ajettu: new Date().toISOString().slice(0, 10) });
  writeFileSync(resolve(arg('--ulos', 'aukot.md')), `${teksti}\n`);
  const aukkoja = ryhmat.puuttuu.length + ryhmat.varalla.length;
  console.log(`Aukkoja ${aukkoja} (puuttuu ${ryhmat.puuttuu.length}, varalla ${ryhmat.varalla.length}), varapolkuja ${ryhmat.varapolku.length}.`);
  if (process.env.GITHUB_OUTPUT) writeFileSync(process.env.GITHUB_OUTPUT, `aukkoja=${aukkoja}\n`, { flag: 'a' });
}
