#!/usr/bin/env node
/*
 * NOSTOKUVIEN LUVUT (skeema 1.75; Pelikoodari 17.11.2026, omistaja 23.24): kuinka monella nostolla on vientipaketissa
 * vähintään yksi nostokuva, kokoelmittain ja kaupungeittain, sekä kuvattomien luettelo (SK:n kuvatyön lista).
 *
 *   node tools/vienti/nostokuvat-luvut.mjs [--vienti dist/vienti] [--ulos <kansio>]
 *
 * Lukee viedyn paketin (aja ensin node tools/vienti/vie-sisalto.mjs). Ilman --ulos tulostaa yhteenvedon; --ulos kirjoittaa
 * kansioon LUVUT.md (taulukot) ja KUVATTOMAT.md (jokainen kuvaton nosto: id, kokoelma, kaupunki/maa, nimi).
 * Sama nosto voi olla usessa kokoelmassa (esim. skandaali on myös karttavalo): kokoelmataulukko laskee kokoelman omat
 * alkiot, "eri nostot" -rivi ja kaupunkitaulukko laskevat jokaisen noston kerran (avain = noston tunnus).
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { JUURI } from './vie-sisalto.mjs';
import { NOSTOKUVA_KOKOELMAT, NOSTOKUVA_SISAKKAISET } from './nostokuvat.mjs';

const arg = (nimi) => { const i = process.argv.indexOf(nimi); return i > 0 ? process.argv[i + 1] : null; };
const vienti = resolve(arg('--vienti') ?? join(JUURI, 'dist/vienti'));
const ulos = arg('--ulos');
const kokoelma = (nimi) => JSON.parse(readFileSync(join(vienti, 'kokoelmat', `${nimi}.json`), 'utf8')).alkiot;

/** Jokainen nosto: { avain (noston tunnus), id, kokoelma, paikka (kaupunki tai maa:ISO3), nimi, kuvia }. */
export function nostorivit(lue = kokoelma) {
  const rivit = [];
  const valot = lue('karttavalot');
  const valoTunnukselle = new Map();
  for (const v of valot) if (!valoTunnukselle.has(v.tunnus)) valoTunnukselle.set(v.tunnus, v);
  const kaupunkiValolle = (v) => v?.kaupunkiAvain ?? v?.kaupunki ?? v?.kohdekartta ?? null;
  const paikka = (kaupunki, maa) => kaupunki ?? (maa ? `maa:${maa}` : '(ei paikkaa)');
  const lisaa = (avain, id, kok, kaupunki, maa, nimi, a) => rivit.push({
    avain, id, kokoelma: kok, paikka: paikka(kaupunki, maa), nimi: nimi ?? id, kuvia: a.nostokuvat?.length ?? 0,
  });
  // Napakohteella ei ole maata: alue (Arktis) paikaksi.
  for (const v of valot) lisaa(v.tunnus, v.id, 'karttavalot', kaupunkiValolle(v) ?? (v.maa ? null : v.paikka), v.maa, v.nimi, v);
  const valosta = (tunnus) => valoTunnukselle.get(tunnus);
  for (const a of lue('takynostot')) {
    const v = valosta(`nosto-${a.id}`);
    lisaa(`nosto-${a.id}`, a.id, 'takynostot', kaupunkiValolle(v) ?? a.kaupungit?.[0] ?? null, a.maa, a.otsikko, a);
  }
  for (const a of lue('skandaalit')) lisaa(`skandaali-${a.id}`, a.id, 'skandaalit', kaupunkiValolle(valosta(`skandaali-${a.id}`)), a.maa, a.otsikko, a);
  for (const a of lue('historianHetket')) lisaa(`hetki-${a.id}`, a.id, 'historianHetket', kaupunkiValolle(valosta(`hetki-${a.id}`)), a.maa ?? a.iso, a.otsikko, a);
  for (const a of lue('monumentit')) lisaa(a.id, a.id, 'monumentit', kaupunkiValolle(valosta(a.id)), a.maa, a.nimi, a);
  for (const a of lue('elaintayt')) lisaa(`elaintaky-${a.id}`, a.id, 'elaintayt', null, a.maa ?? a.id, a.otsikko ?? a.elain, a);
  // Pääkaupunkipisteen kohdekartan juttu: kaupunki = null, piste id:n alussa (id = <piste>:<nimi>).
  for (const a of lue('nahtavyydet')) lisaa(`nahtavyys:${a.id}`, a.id, 'nahtavyydet', a.kaupunki ?? String(a.id).split(':')[0], null, a.nimi, a);
  for (const a of lue('fokusvirrat')) {
    const k = a.kaupunki;
    for (const t of a.takyt ?? []) lisaa(`syvennys-${k}-${t.id}`, `${k}:${t.id}`, 'fokusvirrat.takyt', k, null, t.otsikko ?? t.nappi, t);
    for (const n of a.takynostot ?? []) lisaa(`nosto-${n.id}`, `${k}:${n.id}`, 'fokusvirrat.takynostot', k, null, n.otsikko ?? n.nimio, n);
    for (const o of a.kohteet ?? []) lisaa(o.id, `${k}:${o.id}`, 'fokusvirrat.kohteet', k, null, o.nimi, o);
  }
  return rivit;
}

/** Eri nostot avaimittain: ensimmäinen rivi antaa kokoelman ja paikan, kuvia = suurin. */
export function eriNostot(rivit) {
  const m = new Map();
  for (const r of rivit) {
    const vanha = m.get(r.avain);
    if (!vanha) m.set(r.avain, { ...r });
    else {
      vanha.kuvia = Math.max(vanha.kuvia, r.kuvia);
      if (vanha.paikka.startsWith('maa:') && !r.paikka.startsWith('maa:') && r.paikka !== '(ei paikkaa)') vanha.paikka = r.paikka;
    }
  }
  return [...m.values()];
}

function laske(rivit, avain) {
  const m = new Map();
  for (const r of rivit) {
    const k = avain(r);
    const x = m.get(k) ?? { yht: 0, kuvallisia: 0, kuvattomia: 0 };
    x.yht++; if (r.kuvia > 0) x.kuvallisia++; else x.kuvattomia++;
    m.set(k, x);
  }
  return m;
}
const pros = (a, b) => (b ? `${Math.round((100 * a) / b)} %` : '–');
const taulukko = (otsikko, m, jarjestys) => [
  `| ${otsikko} | nostoja | ≥ 1 kuva | 0 kuvaa | kuvallisia |`, '|---|---:|---:|---:|---:|',
  ...[...m.entries()].sort(jarjestys).map(([k, x]) => `| ${k} | ${x.yht} | ${x.kuvallisia} | ${x.kuvattomia} | ${pros(x.kuvallisia, x.yht)} |`),
].join('\n');

if (process.argv[1] && resolve(process.argv[1]) === resolve(new URL(import.meta.url).pathname)) {
  const rivit = nostorivit();
  const eri = eriNostot(rivit);
  const kok = laske(rivit, (r) => r.kokoelma);
  const kaupungit = laske(eri, (r) => r.paikka);
  const yht = laske(eri, () => 'kaikki');
  const y = yht.get('kaikki');
  const kokJarjestys = [...NOSTOKUVA_KOKOELMAT, ...Object.entries(NOSTOKUVA_SISAKKAISET).flatMap(([k, l]) => l.map((x) => `${k}.${x}`))];
  const yhteenveto = `Eri nostot ${y.yht}: vähintään yksi kuva ${y.kuvallisia} (${pros(y.kuvallisia, y.yht)}), ilman kuvaa ${y.kuvattomia}.`;
  if (!ulos) {
    console.log(yhteenveto);
    console.log(taulukko('kokoelma', kok, ([a], [b]) => kokJarjestys.indexOf(a) - kokJarjestys.indexOf(b)));
  } else {
    mkdirSync(ulos, { recursive: true });
    const pvm = '17.11.2026';
    writeFileSync(join(ulos, 'LUVUT.md'), [
      `# Nostokuvat: luvut (skeema 1.75, ${pvm})`, '',
      'Lähde: vientipaketin `nostokuvat` (tools/vienti/nostokuvat.mjs), laskettu `node tools/vienti/nostokuvat-luvut.mjs`.',
      'Kuva = datassa jo oleva kuva (noston omat, kohde, nähtävyysjuttu). Kokoelmataulukko laskee kokoelman omat alkiot;',
      'sama nosto voi olla usessa kokoelmassa (skandaali on myös karttavalo). Kaupunkitaulukko ja yhteensä-rivi laskevat jokaisen',
      'noston kerran (avain = noston tunnus). Paikka = noston kaupunki (kaupunkijäsenyys tai kohdekartta), muuten maa:ISO3.', '',
      `**${yhteenveto}**`, '',
      '## Kokoelmittain', '', taulukko('kokoelma', kok, ([a], [b]) => kokJarjestys.indexOf(a) - kokJarjestys.indexOf(b)), '',
      '## Kaupungeittain (kaupungit ensin nostomäärän mukaan, sitten maat)', '',
      taulukko('kaupunki / maa', kaupungit, ([a, x], [b, z]) => (a.startsWith('maa:') - b.startsWith('maa:')) || (z.yht - x.yht) || a.localeCompare(b)),
      '',
    ].join('\n'));
    const kuvattomat = rivit.filter((r) => r.kuvia === 0)
      .sort((a, b) => a.paikka.localeCompare(b.paikka) || a.kokoelma.localeCompare(b.kokoelma) || a.id.localeCompare(b.id));
    writeFileSync(join(ulos, 'KUVATTOMAT.md'), [
      `# Kuvattomat nostot (skeema 1.75, ${pvm})`, '',
      `Nostot, joiden \`nostokuvat\` on tyhjä: ${kuvattomat.length} kokoelmariviä (eri nostoja ${eri.filter((r) => r.kuvia === 0).length}).`,
      'Sama nosto voi näkyä kahdesti (esim. skandaalit ja karttavalot). Järjestys: paikka, kokoelma, id.', '',
      '| id | kokoelma | kaupunki / maa | nimi |', '|---|---|---|---|',
      ...kuvattomat.map((r) => `| ${r.id} | ${r.kokoelma} | ${r.paikka} | ${String(r.nimi).replaceAll('|', '/')} |`), '',
    ].join('\n'));
    console.log(`${yhteenveto}\n→ ${join(ulos, 'LUVUT.md')}\n→ ${join(ulos, 'KUVATTOMAT.md')}`);
  }
}
