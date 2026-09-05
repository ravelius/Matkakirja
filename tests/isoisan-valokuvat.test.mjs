import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ISOISAN_VALOKUVAT, rajausTyyli, valokuvanKuvateksti } from '../js/isoisan-valokuvat.js';

test('jokaisella isoisän valokuvalla on osoite, selite ja kuvateksti "Isoisä, paikka, 1873"', () => {
  for (const [avain, kuva] of Object.entries(ISOISAN_VALOKUVAT)) {
    assert.match(kuva.osoite, /\/kohtaamiset\/isoisa\/isoisa-[a-z0-9-]+\.jpg$/, avain);
    assert.ok(kuva.selite.length > 20, `${avain}: selite`);
    assert.match(valokuvanKuvateksti(kuva), /^Isoisä, [A-ZÅÄÖ][a-zåäö]+, 1873$/, `${avain}: kuvateksti`);
    /*
     * Rajaus on VALINNAINEN (omistaja 5.9.2026 illalla): kuvaputken
     * uusissa kuvissa vinjetti ja paperin reunat ovat jo kuvassa, eikä
     * pahvireunusta ole leikattavaksi.
     */
    const r = kuva.rajaus;
    if (r) {
      assert.ok(r.x0 < r.x1 && r.y0 < r.y1, `${avain}: rajaus`);
      assert.match(rajausTyyli(kuva), /^--rx0:.*--rskaala:\d+\.\d{4}$/, `${avain}: rajaustyyli`);
    } else {
      assert.equal(rajausTyyli(kuva), '', `${avain}: ei rajausta → ei tyyliä`);
    }
  }
  assert.equal(valokuvanKuvateksti(null), '');
});

/*
 * ISOISÄ JÄÄ ARVOITUKSEKSI (Raamattu, omistaja 5.9.2026 ilta) ja
 * avauslennon kuva on yksi vaihdettava paikka (omistaja 5.9.2026 klo
 * 23.15: *"kohta pitäisi tulla isoisän uusia kuvia, niin käytä niitä
 * ennemmin"*).
 */
test('avauslennon kuva on taulun avain `lento`, eikä sen kuvateksti kuvaile isoisää', () => {
  const lento = ISOISAN_VALOKUVAT.lento;
  assert.ok(lento, 'ISOISAN_VALOKUVAT.lento puuttuu');
  // Omistaja 5.9.2026 illalla, sanasta sanaan.
  assert.equal(valokuvanKuvateksti(lento), 'Isoisä, Bombay, 1873');
  // Kuvaputken 5.9.2026 toimittama kuva, koko kuva ilman rajausta.
  assert.match(lento.osoite, /isoisa-bombay-aged-r20260905-v1\.jpg$/);
  assert.equal(lento.rajaus, undefined, 'uusi kuva ei tarvitse rajausta');
  assert.equal(rajausTyyli(lento), '');
  // Ei ulkonäköä kuvatekstissä eikä selitteessä (Raamattu: ISOISA JAA
  // ARVOITUKSEKSI).
  const sanat = /(hymy|parta|viikset|silmä|kasvo|näköinen|herrasmies|nuori mies|vuotias)/i;
  assert.doesNotMatch(valokuvanKuvateksti(lento), sanat);
  assert.doesNotMatch(lento.selite, sanat);
  // js/ui.js:n lentokohtaus lukee VAIN tätä avainta, jotta seuraava
  // kuvaputken kuva vaihdetaan yhdellä rivillä.
  const ui = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
  const kohtaus = ui.slice(ui.indexOf('async aloituslentoSisalla'));
  assert.match(kohtaus, /ISOISAN_VALOKUVAT\.lento\.osoite/);
  assert.doesNotMatch(kohtaus.slice(0, kohtaus.indexOf('naytaSaapumiskortti')), /ISOISAN_VALOKUVAT\.bombay/);
});

test('lennolla kortin alle piirretään kuvateksti ja etusivulla kuvaa ei enää ole (omistaja 3.9.2026)', () => {
  const ui = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
  assert.match(ui, /html\('span', 'lento-valokuvateksti', lappu\)/);
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.doesNotMatch(html, /id="intro-valokuva"/);
  const css = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.lento-valokuva \.lento-valokuvateksti \{/);
  assert.doesNotMatch(css, /^\.intro-valokuva \{/m);
});

/*
 * KORTTI HÄIPYY JOKA REUNASTAAN JA ON ISOMPI (omistaja 5.9.2026 klo
 * 00.35, sanatarkasti: *"isoisän kuva pitää häivyttää joka reunastaan
 * läpinäkyväksi ja tehdä vähän isommaksi"*).
 *
 * Kumpikin on pelkkää tyyliä, eikä kumpikaan näkyisi virheenä jos se
 * katoaisi — kortti vain saisi takaisin terävän suorakaiteen reunansa.
 */
test('lennon valokuvakortti: häivytys kaikilta reunoilta ja noin neljänneksen isompi koko', () => {
  const css = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
  const kortti = css.match(/\.lento-valokuva \{[^}]*\}/)[0];
  const kuva = css.match(/\.lento-valokuva img \{[^}]*\}/)[0];

  // KOKO on yksi nimetty muuttuja, ja se kasvoi noin 25 % (280 → 350 px
  // työpöydällä, 200 → 250 px puhelimessa).
  assert.match(kortti, /--lento-valokuvan-leveys: min\(37\.5vw, 350px\);/);
  assert.match(kortti, /width: var\(--lento-valokuvan-leveys\);/);
  const puhelin = css.match(/@media \(max-width: 599px\) \{\s*\/\*[\s\S]*?\*\/\s*\.lento-valokuva \{[^}]*\}/)[0];
  assert.match(puhelin, /--lento-valokuvan-leveys: min\(55vw, 250px\);/);
  for (const [uusi, vanha] of [[350, 280], [250, 200]]) {
    assert.ok(Math.abs(uusi / vanha - 1.25) < 0.01, `${vanha} → ${uusi} ei ole noin +25 %`);
  }

  // HÄIVYTYS on maski (ei suodatin, iOS-sääntö) ja se osuu KAIKKIIN
  // neljään reunaan: vaaka- ja pystyliuku leikkauksena.
  assert.doesNotMatch(kuva, /filter:/, 'kortti käyttää suodatinta');
  for (const etuliite of ['-webkit-mask-image', 'mask-image']) {
    const maski = kuva.match(new RegExp(`\\n {2}${etuliite}:[^;]*;`))[0];
    assert.match(maski, /linear-gradient\(to right, transparent 0, #000 var\(--lento-valokuvan-haivytys-x\)/);
    assert.match(maski, /linear-gradient\(to bottom, transparent 0, #000 var\(--lento-valokuvan-haivytys-y\)/);
    assert.match(maski, /calc\(100% - var\(--lento-valokuvan-haivytys-x\)\), transparent 100%\)/);
    assert.match(maski, /calc\(100% - var\(--lento-valokuvan-haivytys-y\)\), transparent 100%\)/);
  }
  // Leikkaus molemmilla kirjoitusasuilla — unioni jättäisi kovat reunat.
  assert.match(kuva, /-webkit-mask-composite: source-in;/);
  assert.match(kuva, /mask-composite: intersect;/);
  // Varjo piirtyisi elementin laatikon mukaan eli juuri sinä terävänä
  // suorakaiteena, jonka häivytys poistaa.
  assert.doesNotMatch(kuva, /box-shadow/, 'kortin varjo palauttaisi terävän reunan');
  // Häivytysvyöt ovat oikeasti olemassa ja tuntuvia.
  for (const nimi of ['x', 'y']) {
    const osuus = Number(kortti.match(new RegExp(`--lento-valokuvan-haivytys-${nimi}: (\\d+)%`))[1]);
    assert.ok(osuus >= 10 && osuus <= 25, `häivytys ${nimi} ${osuus} % ei ole 10–25 %`);
  }
  // Kuvateksti jää häivytyksen ULKOPUOLELLE: se on kortin oma span
  // kuvan alla, ei kuvan sisällä (js/ui.js aloituslentoSisalla).
  const lappu = css.match(/\.lento-valokuva \.lento-valokuvateksti \{[^}]*\}/)[0];
  assert.doesNotMatch(lappu, /mask-image/, 'kuvateksti häipyisi kuvan mukana');
  const ui = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
  assert.match(ui, /valokuvaNappi\.appendChild\(html\('span', 'lento-valokuvateksti', lappu\)\)/);
});
