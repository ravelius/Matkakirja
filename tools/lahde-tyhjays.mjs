// Jaettu apuri lähdekoodia TEKSTINÄ lukeville tarkistimille
// (tools/tarkista-niputus.mjs, tools/tarkista-savukkeet.mjs).
// Siirretty sanatarkasti tarkista-niputus.mjs:stä 17.8.2026, kun
// savukevartija tarvitsi saman tyhjäyksen — kahta kopiota ei pidetä.

// Palauttaa saman mittaisen tekstin, jossa kommenttien, merkki-
// jonojen, mallineiden ja regex-literaalien sisältö on välejä.
// Rivinvaihdot säilyvät, jotta rivinumerot pitävät.
export function tyhjaaEiKoodi(src) {
  let ulos = '';
  const pino = ['koodi'];   // tilapino; 'koodi$'-kehys = mallineen ${}-lauseke
  const laskurit = [];      // aaltosulkusyvyys kutakin koodi$-kehystä kohden
  let vika = '';            // edellinen merkitsevä merkki regex-heuristiikkaan
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    const n = src[i + 1];
    const tila = pino[pino.length - 1];
    if (tila === 'rivi') {
      if (c === '\n') { pino.pop(); ulos += '\n'; } else ulos += ' ';
      continue;
    }
    if (tila === 'lohko') {
      if (c === '*' && n === '/') { pino.pop(); ulos += '  '; i++; }
      else ulos += c === '\n' ? '\n' : ' ';
      continue;
    }
    if (tila === 'hipsu' || tila === 'lainaus') {
      const raja = tila === 'hipsu' ? "'" : '"';
      if (c === '\\') { ulos += '  '; i++; }
      else if (c === raja) { pino.pop(); ulos += c; }
      else ulos += c === '\n' ? '\n' : ' ';
      continue;
    }
    if (tila === 'malline') {
      if (c === '\\') { ulos += '  '; i++; }
      else if (c === '`') { pino.pop(); ulos += c; }
      else if (c === '$' && n === '{') { pino.push('koodi$'); laskurit.push(0); ulos += '  '; i++; }
      else ulos += c === '\n' ? '\n' : ' ';
      continue;
    }
    if (tila === 'regex') {
      if (c === '\\') { ulos += '  '; i++; }
      else if (c === '[') { pino.push('regexluokka'); ulos += ' '; }
      else if (c === '/') { pino.pop(); ulos += c; vika = '/'; }
      else ulos += c === '\n' ? '\n' : ' ';
      continue;
    }
    if (tila === 'regexluokka') {
      if (c === '\\') { ulos += '  '; i++; }
      else if (c === ']') { pino.pop(); ulos += ' '; }
      else ulos += c === '\n' ? '\n' : ' ';
      continue;
    }
    // koodi tai koodi$
    if (c === '/' && n === '/') { pino.push('rivi'); ulos += '  '; i++; continue; }
    if (c === '/' && n === '*') { pino.push('lohko'); ulos += '  '; i++; continue; }
    if (c === "'") { pino.push('hipsu'); ulos += c; continue; }
    if (c === '"') { pino.push('lainaus'); ulos += c; continue; }
    if (c === '`') { pino.push('malline'); ulos += c; continue; }
    if (c === '/') {
      // Regex vai jakolasku: literaali voi alkaa vain arvottoman
      // kohdan perästä (avausmerkki, operaattori tai rivin alku).
      if (vika === '' || '=(,[!&|?:;{}\n+-*%<>'.includes(vika)) {
        pino.push('regex'); ulos += c; continue;
      }
      ulos += c; vika = c; continue;
    }
    if (tila === 'koodi$') {
      if (c === '{') laskurit[laskurit.length - 1]++;
      if (c === '}') {
        if (laskurit[laskurit.length - 1] === 0) {
          pino.pop(); laskurit.pop(); ulos += ' '; continue;
        }
        laskurit[laskurit.length - 1]--;
      }
    }
    ulos += c;
    if (!/\s/.test(c)) vika = c;
  }
  return ulos;
}
