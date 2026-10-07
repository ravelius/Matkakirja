// "Oppiminen on hauskaa" -linkki poistettu aloitusportilta (omistaja 7.10.2026 klo 09.4x); sen lähde-, palaute- ja
// oikeustiedot ovat apurahakortin lopussa. KORTTI-pohjalla lähderivit apurina (peruttava ?kortti=vanha).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const UI = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
const CSS = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
const runko = (nimi) => { const alku = UI.indexOf(`\n  ${nimi}(`); return UI.slice(alku, UI.indexOf('\n  }\n', alku)); };

test('aloitusportilla ei "Oppiminen on hauskaa" -linkkiä eikä periaateikkunaa', () => {
  assert.doesNotMatch(UI, /start-linkki|naytaPeriaatteet/);
  assert.doesNotMatch(CSS, /\.start-linkki/);
  assert.match(UI, /alaosa\.appendChild\(html\('p', 'start-huomautus', esittely\.webHuomautus\)\)/);
});

test('apurahakortin lopussa lipputekijät, (palaute kytkimen takana) ja oikeudet ennen Takaisin-nappia; pohjalla apurina', () => {
  const r = runko('naytaApuraha');
  const lippu = r.indexOf('PERIAATTEET.lippurivi'), palaute = r.indexOf('this.periaatePalaute()'),
    oikeus = r.indexOf('PERIAATTEET.oikeudet'), sulje = r.indexOf("'Takaisin'");
  assert.ok(lippu > 0 && lippu < palaute && palaute < oikeus && oikeus < sulje, 'järjestys: liput, palaute, oikeudet, Takaisin');
  // Omistaja 7.10.2026 klo 14.5x: Palaute ja mukaan -osio pois apurahakierroksen ajaksi, palautus yhdellä rivillä.
  assert.match(r, /if \(APURAHA_PALAUTE\) kortti\.appendChild\(this\.periaatePalaute\(\)\)/);
  assert.match(UI, /\nconst APURAHA_PALAUTE = false;\n/);
  assert.match(r, /LIPPU_TEKIJAT\.map\(\(l\) => `\$\{l\.tekija\} \(\$\{l\.lisenssi\}\)`\)/);
  assert.doesNotMatch(r, /PERIAATTEET\.linkki|PERIAATTEET\.osat/, 'GitHub-linkkiä ja periaatetekstejä ei siirretä');
  const pue = r.indexOf('puePohjaKortiksi(kortti, { otsikko, sulje })');
  assert.ok(r.indexOf("oikeudet.className = 'tk-apuri'") > 0 && r.indexOf("lippurivi.className = 'tk-apuri'") > 0 && pue > 0);
  assert.ok(pue < r.indexOf('lappu.showModal()'));
});
