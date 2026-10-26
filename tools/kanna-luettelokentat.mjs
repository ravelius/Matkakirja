/*
 * ÄMPÄRIN LUETTELON KENTÄT AJOLLE, JOKA EI POLTTANUT NIITÄ (Karttaseppä 28.9.2026).
 *
 *   node tools/kanna-luettelokentat.mjs --luettelo <pyramidi.json> --ampari <ampari-luettelo.json>
 *        [--nostot-amparista] [--nimiot-amparista]
 *
 * MITATTU 28.9.2026 (yöpoltto ajo-20260927y). Pohja poltettiin lipuilla
 * `--ilman-nostoja --ilman-nimioita`, joten nostoshardeja ei ollut, eikä
 * tools/kokoa-nostotasot.mjs (joka kantaa `varitasot` ja `erat`) käynnistynyt
 * lainkaan. Luettelosta puuttuivat väritasot (27 maata), erat, nostotasot ja
 * nimiotaso, ja `nostotaso.versio` oli `--nostoversio`-lipun
 * 2026-09-26-nostot, jota ei ollut poltettu (tuotannossa 2026-09-25c-nostot).
 * Luettelon vientivartio pysäytti ajon oikein ("varitasot puuttuvat"), mutta
 * luettelo jouduttiin yhdistämään käsin.
 *
 * SÄÄNTÖ: kerros, jota tämä ajo ei polttanut, tulee ämpärin luettelosta.
 *   - varitasot ja erat, jos luettelossa niitä ei ole (sama kuin kokoa-nostotasot)
 *   - --nostot-amparista: nostotaso ja nostotasot (ajossa ei nostoshardeja)
 *   - --nimiot-amparista: nimiotaso (ajossa ei nimiöshardia)
 * Pohja-, viiva- ja rantataso sekä tasot ovat tämän ajon omia, eikä niihin kosketa.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** Palauttaa uuden luettelon ja listan kannetuista kentistä. */
export function kannaAmparista(luettelo, ampari, { nostot = false, nimiot = false } = {}) {
  const uusi = { ...luettelo };
  const kannetut = [];
  const varitasoja = Object.keys(ampari.varitasot ?? {}).length;
  if (varitasoja && !Object.keys(uusi.varitasot ?? {}).length) {
    uusi.varitasot = ampari.varitasot;
    kannetut.push(`varitasot ${varitasoja} maata`);
  }
  if ((ampari.erat ?? []).length && !(uusi.erat ?? []).length) {
    uusi.erat = ampari.erat;
    kannetut.push(`erat ${ampari.erat.length}`);
  }
  if (nostot) {
    uusi.nostotaso = ampari.nostotaso ?? null;
    uusi.nostotasot = ampari.nostotasot ?? null;
    kannetut.push(`nostotaso ${ampari.nostotaso?.versio ?? null}`
      + `, nostotasot ${Object.keys(ampari.nostotasot ?? {}).length} maata`);
  }
  if (nimiot) {
    uusi.nimiotaso = ampari.nimiotaso ?? null;
    kannetut.push(`nimiotaso ${ampari.nimiotaso?.versio ?? null}`);
  }
  return { luettelo: uusi, kannetut };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const argv = process.argv.slice(2);
  const lippu = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
  const polku = lippu('--luettelo');
  const amparipolku = lippu('--ampari');
  if (!polku || !amparipolku) {
    console.error('kanna-luettelokentat: --luettelo <pyramidi.json> ja --ampari <pyramidi.json> ovat pakollisia');
    process.exit(2);
  }
  const { luettelo, kannetut } = kannaAmparista(
    JSON.parse(readFileSync(polku, 'utf8')),
    JSON.parse(readFileSync(amparipolku, 'utf8')),
    { nostot: argv.includes('--nostot-amparista'), nimiot: argv.includes('--nimiot-amparista') },
  );
  writeFileSync(polku, `${JSON.stringify(luettelo)}\n`);
  console.log(`· ämpäristä kannettu: ${kannetut.length ? kannetut.join(', ') : 'ei mitään'}`);
}
