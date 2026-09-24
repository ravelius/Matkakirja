/*
 * ALUENIMET (skeema 1.37; Karttasepän tilaus, Fablen päätös löydökseen
 * 38 b 24.9.2026): natiivi piirtää aluenimet elävinä (Natiiviseppä,
 * build 11).
 *
 * Lähde on Karttasepän tuottama assets/data/aluenimet-natiivi.json
 * (tools/vie-aluenimet.mjs): webin nimiötason nimet (meret, maakunnat,
 * nykyalueet) törmäyksenväistön JÄLKEISINE ankkureineen tasoittain, sekä
 * pohjalaattojen valtameret. Rivit viedään sellaisinaan; valtameret
 * samaan kokoelmaan luokalla 'valtameri' (tyyli 'valtameri'). Tyylit ja
 * fonttihuomio juureen. Merinimet (1.36) ovat tämän osajoukko ilman
 * väistöä — natiivi valitsee.
 */
import { readFileSync } from 'node:fs';

const TIEDOSTO = 'assets/data/aluenimet-natiivi.json';

export function aluenimiKokoelma(taulukko) {
  const a = JSON.parse(readFileSync(new URL(`../../${TIEDOSTO}`, import.meta.url), 'utf8'));
  const valtameret = (a.valtameret ?? []).map((v) => ({ ...v, luokka: 'valtameri', tyyli: 'valtameri' }));
  const rivit = [...a.nimet, ...valtameret];
  const idt = new Set();
  for (const r of rivit) {
    if (!r.id || idt.has(r.id)) throw new Error(`aluenimet: tunnus ${r.id} puuttuu tai toistuu`);
    if (!a.tyylit?.[r.tyyli]) throw new Error(`aluenimet: ${r.id}: tyyli ${r.tyyli} puuttuu tyyleistä`);
    idt.add(r.id);
  }
  if (a.lukumaarat && (a.lukumaarat.nimet !== a.nimet.length || a.lukumaarat.valtameret !== valtameret.length)) {
    throw new Error('aluenimet: lukumäärät eivät täsmää tiedoston lukumaarat-kenttään');
  }
  const kokoelma = taulukko(`${TIEDOSTO} (tools/vie-aluenimet.mjs, versio ${a.versio})`,
    `${a.kuvaus} Valtameret samassa kokoelmassa: luokka 'valtameri', lon/lat, tasot 0–3, koko_arkki, korkeus_m `
      + '(pohjalaattojen kaluste). Rivin tyyli viittaa juuren tyylit-avaimeen; fontti-juuressa fonttihuomio.',
    {}, rivit);
  kokoelma.tyylit = a.tyylit;
  kokoelma.fontti = a.fontti;
  kokoelma.aineistoversio = a.versio;
  return kokoelma;
}
