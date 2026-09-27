#!/usr/bin/env node
/*
 * Pelikatalogin koneluettava kopio: docs/pelikatalogi.md → pelikatalogi-data.js.
 *
 * Omistajan suunta 27.9.2026: pelit saavat oman julkisen sivun samalla mallilla
 * kuin linssit (linssikatalogi.html + linssikatalogi-data.js). Markdown on lähde,
 * jota Sisältökirjuri ja Fable päivittävät; tämä työkalu tuottaa siitä
 * pelikatalogi.html:n lukeman datan. Aja aina md:n muutoksen jälkeen:
 *
 *   node tools/tee-pelikatalogi-data.mjs          kirjoittaa pelikatalogi-data.js
 *   node tools/tee-pelikatalogi-data.mjs --tarkista  vain vertaa (poistuu 1, jos eroaa)
 *
 * tests/pelikatalogi.test.mjs varmistaa, että repossa oleva data vastaa md:tä.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const MD_POLKU = fileURLToPath(new URL('../docs/pelikatalogi.md', import.meta.url));
export const DATA_POLKU = fileURLToPath(new URL('../pelikatalogi-data.js', import.meta.url));

const PELIRIVI = /^\|\s*([A-Z]{3})-(\d+)\s*\|/;

// Markdown-taulukon rivi soluiksi (katalogissa ei ole kenoviivattuja pystyviivoja).
function solut(rivi) {
  return rivi.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((s) => s.trim());
}

// "Langbold (tanskalainen "pitkäpallo")" → nimi + alkuperäinen (suluissa oleva loppu).
function jaaNimi(peli) {
  const m = peli.match(/^(.+?)\s+\(([^()]*(?:\([^()]*\)[^()]*)*)\)$/);
  return m ? { nimi: m[1], alkuperainen: m[2] } : { nimi: peli, alkuperainen: null };
}

// "[Teksti](https://…)" → { lahdeNimi, lahdeUrl }; pelkkä teksti → url null.
function jaaLahde(lahde) {
  const m = lahde.match(/^\[(.+?)\]\((\S+)\)$/);
  return m ? { lahdeNimi: m[1], lahdeUrl: m[2] } : { lahdeNimi: lahde, lahdeUrl: null };
}

function oikeusluokka(oikeudet) {
  if (oikeudet.startsWith('OMA VERSIO')) return 'OMA VERSIO';
  if (oikeudet.startsWith('SUORA')) return 'SUORA';
  return null;
}

// Uusin md:ssä mainittu päivämäärä (d.m.vvvv) → "vvvv-kk-pp".
function uusinPaiva(md) {
  let paras = '';
  for (const [, d, k, v] of md.matchAll(/\b(\d{1,2})\.(\d{1,2})\.(20\d\d)\b/g)) {
    const iso = `${v}-${k.padStart(2, '0')}-${d.padStart(2, '0')}`;
    if (iso > paras) paras = iso;
  }
  return paras || null;
}

export function jasennaPelikatalogi(md) {
  const rivit = md.split('\n');
  const osat = [];
  const pelit = [];
  const ensimmaiset10 = [];
  const ideat = [];
  const oikeudetSelite = {};
  let tila = null; // 'selite' | 'osa' | 'ensimmaiset' | 'ideat'
  let osa = null;
  let huomiot = null;

  for (let i = 0; i < rivit.length; i++) {
    const rivi = rivit[i];
    const osaOtsikko = rivi.match(/^## (\d+)\. (.+)$/);
    if (osaOtsikko) {
      osa = { nro: Number(osaOtsikko[1]), nimi: osaOtsikko[2].trim(), maat: [], huomiot: null };
      osat.push(osa);
      tila = 'osa';
      continue;
    }
    if (/^### Oikeudet-selite/.test(rivi)) { tila = 'selite'; continue; }
    if (/^## Ehdotus: ensimmäiset 10/.test(rivi)) { tila = 'ensimmaiset'; osa = null; continue; }
    if (/^## Omistajan ideat/.test(rivi)) { tila = 'ideat'; osa = null; continue; }
    if (/^## /.test(rivi)) { tila = null; osa = null; continue; }

    if (tila === 'selite') {
      const m = rivi.match(/^- \*\*(.+?)\*\* — (.*)$/);
      if (m) {
        let teksti = m[2];
        while (i + 1 < rivit.length && /^ {2}\S/.test(rivit[i + 1])) teksti += ` ${rivit[++i].trim()}`;
        oikeudetSelite[m[1]] = teksti;
      }
      continue;
    }

    if (tila === 'osa') {
      const p = rivi.match(PELIRIVI);
      if (p) {
        const s = solut(rivi);
        if (s.length !== 11) throw new Error(`${s[0]}: odotettiin 11 saraketta, löytyi ${s.length}`);
        const [id, peli, maaNimi, saanto, oppimiskytkos, sopivuus13, bottiKaveri, pelikytkos, oikeudet, lahde, tilaSolu] = s;
        const maa = p[1];
        if (!osa.maat.some((x) => x.iso3 === maa)) osa.maat.push({ iso3: maa, nimi: maaNimi });
        pelit.push({
          id, maa, maaNimi, osa: osa.nro, ...jaaNimi(peli), saanto, oppimiskytkos, sopivuus13,
          bottiKaveri, pelikytkos, oikeudet, oikeusluokka: oikeusluokka(oikeudet), ...jaaLahde(lahde), tila: tilaSolu,
        });
        continue;
      }
      if (rivi.startsWith('**Huomiot:**')) {
        huomiot = [rivi.replace('**Huomiot:**', '').trim()];
        while (i + 1 < rivit.length && rivit[i + 1].trim() !== '') huomiot.push(rivit[++i].trim());
        osa.huomiot = huomiot.join(' ');
      }
      continue;
    }

    if (tila === 'ensimmaiset' && /^\|\s*\d+\s*\|/.test(rivi)) {
      const [jarjestys, peli, id, tyyppi, perustelu] = solut(rivi);
      ensimmaiset10.push({ jarjestys: Number(jarjestys), id, peli, tyyppi, perustelu });
      continue;
    }

    if (tila === 'ideat' && rivi.startsWith('|') && !/^\|\s*(idea\s*\||-)/.test(rivi)) {
      const [idea, kuvaus, ideaTila] = solut(rivi);
      if (!idea || idea.startsWith('*(')) continue; // "(omistaja lisää tähän)" -paikkarivi
      ideat.push({ idea, kuvaus, tila: ideaTila });
    }
  }

  return { paivitetty: uusinPaiva(md), osat, pelit, ensimmaiset10, ideat, oikeudetSelite };
}

const OTSAKE = `/*
 * PELIKATALOGI KONELUETTAVANA — lähde docs/pelikatalogi.md (päivitä molemmat yhdessä).
 * ÄLÄ MUOKKAA KÄSIN: aja md:n muutoksen jälkeen node tools/tee-pelikatalogi-data.mjs
 * (tests/pelikatalogi.test.mjs vertaa tätä md:hen). Sivu pelikatalogi.html lataa tämän
 * <script src="pelikatalogi-data.js"> -tagilla, ei build-vaihetta.
 *
 * paivitetty      md:n uusin päivämäärä (vvvv-kk-pp)
 * osat[]          kahdeksan maantieteellistä osaa md:n järjestyksessä:
 *   nro, nimi     md:n otsikosta "## N. Nimi"
 *   maat[]        { iso3, nimi } osan riveistä järjestyksessä
 *   huomiot       osan Huomiot-kappale (md-lihavoinnit **näin**)
 * pelit[]         yksi peli = yksi md-rivi, md:n järjestyksessä:
 *   id            <ISO3>-N, ei muutu (ISO3 = pelin map.cityCountry)
 *   maa, maaNimi  ISO3 ja suomenkielinen nimi; osa = osan nro
 *   nimi, alkuperainen  peli-sarake jaettuna: nimi + suluissa ollut alkuperäinen nimi
 *                 (null, jos sulkuja ei ole); md:n peli = alkuperainen ? "nimi (alkuperainen)" : nimi
 *   saanto, oppimiskytkos, sopivuus13, bottiKaveri, pelikytkos  sarakkeet sellaisinaan
 *   oikeudet      sarake sellaisenaan; oikeusluokka SUORA | OMA VERSIO (tekstin alusta)
 *   lahdeNimi, lahdeUrl  lähde-sarake; url null, kun lähde on pelkkä teksti
 *   tila          idea | tarkista
 * ensimmaiset10[] "Ehdotus: ensimmäiset 10 peliä": jarjestys, id, peli, tyyppi, perustelu
 * ideat[]         "Omistajan ideat": idea, kuvaus, tila (paikkarivi ohitetaan)
 * oikeudetSelite  { SUORA, "OMA VERSIO" } Oikeudet-selitteen teksti
 */
`;

export function muotoileData(data) {
  const lista = (taulu) => taulu.map((x) => `    ${JSON.stringify(x)},`).join('\n');
  return `${OTSAKE}window.PELIKATALOGI = {
  paivitetty: ${JSON.stringify(data.paivitetty)},
  osat: [
${lista(data.osat)}
  ],
  pelit: [
${lista(data.pelit)}
  ],
  ensimmaiset10: [
${lista(data.ensimmaiset10)}
  ],
  ideat: [
${lista(data.ideat)}
  ],
  oikeudetSelite: ${JSON.stringify(data.oikeudetSelite)},
};
`;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const data = jasennaPelikatalogi(readFileSync(MD_POLKU, 'utf8'));
  const teksti = muotoileData(data);
  if (process.argv.includes('--tarkista')) {
    const nykyinen = readFileSync(DATA_POLKU, 'utf8');
    if (nykyinen !== teksti) {
      console.error('pelikatalogi-data.js ei vastaa docs/pelikatalogi.md:tä — aja node tools/tee-pelikatalogi-data.mjs');
      process.exit(1);
    }
    console.log(`pelikatalogi-data.js ajan tasalla (${data.pelit.length} peliä).`);
  } else {
    writeFileSync(DATA_POLKU, teksti);
    console.log(`pelikatalogi-data.js kirjoitettu: ${data.pelit.length} peliä, ${data.osat.length} osaa, `
      + `${data.ensimmaiset10.length} ensimmäistä, ${data.ideat.length} ideaa.`);
  }
}
