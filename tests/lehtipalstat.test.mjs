/*
 * LEHTIPALSTAT PITKÄLLE NOSTOTEKSTILLE (omistaja 22.9.2026 klo 23.48, iPad
 * pystyssä, sanatarkasti: *"Kaksi erilaista. Tuo kaksi palstaa näyttää
 * paremmalta kaiken kaikkiaan myös muuten. Voisi tehdä kaikkiin pidempiin
 * ainakin."*).
 *
 * Pituuden ratkaisee JS (js/ui-apurit.js onPitkaNostoteksti /
 * lehtipalstaKotelo), leveyden CSS container query tekstin omasta
 * leveydestä (css/styles.css .lehtipalsta-kotelo). Nodessa ei ole
 * asettelua, joten leveyssääntö tarkistetaan kynnyksen ja MITATTUJEN
 * tekstileveyksien avulla: tools/mittaa-lehtipalstat.mjs mittasi WebKitissä
 * 22.9.2026 tekstikotelon leveydeksi
 *   iPad pysty 1024 px, kuvakortti pinona   712 px  → kaksi palstaa
 *   ≥ 1100 px kuva/teksti-taiton tekstipalsta 498 px → yksi palsta
 *   puhelin 390 px                            330 px  → yksi palsta
 * ja sama mittari vartioi lopputuloksen oikeassa selaimessa (25/25).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const lue = (polku) => readFileSync(new URL(`../${polku}`, import.meta.url), 'utf8');

/** Pienin DOM, jonka html() ja lehtipalstaKotelo tarvitsevat. */
function asennaDom() {
  const luo = (tag) => {
    const e = {
      tagName: tag.toUpperCase(), luokat: [], lapset: [], parentNode: null,
      get className() { return this.luokat.join(' '); },
      set className(v) { this.luokat = String(v).split(/\s+/).filter(Boolean); },
      classList: null,
      appendChild(l) { l.parentNode = this; this.lapset.push(l); return l; },
      set textContent(v) { this.teksti = v; },
    };
    e.classList = {
      add: (...n) => { for (const x of n) if (!e.luokat.includes(x)) e.luokat.push(x); },
      contains: (n) => e.luokat.includes(n),
    };
    return e;
  };
  globalThis.document = { createElement: luo };
}

const LYHYT = 'Lyhyt teksti. Toinen virke. Kolmas virke, joka ei vielä tee tekstistä pitkää.';
const PITKA_MERKIT = 'Pitkä yhtenäinen kappale. '.repeat(30);
const PITKA_KAPPALEET = 'Ensimmäinen kappale.\n\nToinen kappale.';

test('pitkä = vähintään 600 merkkiä tai kaksi kirjoittajan kappaletta', async () => {
  const { onPitkaNostoteksti, LEHTIPALSTA_MERKKEJA } = await import('../js/ui-apurit.js');
  assert.equal(LEHTIPALSTA_MERKKEJA, 600);
  assert.equal(onPitkaNostoteksti(LYHYT), false,
    'kolmen virkkeen lyhyt teksti ei saa palstoja (automaattinen puolitus ei laske)');
  assert.equal(onPitkaNostoteksti(PITKA_MERKIT), true, '≥ 600 merkkiä on pitkä');
  assert.equal(onPitkaNostoteksti(PITKA_KAPPALEET), true, 'kaksi kirjoittajan kappaletta on pitkä');
  assert.equal(onPitkaNostoteksti(''), false);
  assert.equal(onPitkaNostoteksti(undefined), false);
});

test('lehtipalstaKotelo käärii vain pitkän tekstin', async () => {
  asennaDom();
  const { lehtipalstaKotelo, html } = await import('../js/ui-apurit.js');
  const lyhyt = html('div', 'fokusnosto-teksti');
  assert.equal(lehtipalstaKotelo(lyhyt, LYHYT), lyhyt, 'lyhyt teksti palautetaan sellaisenaan');
  assert.equal(lyhyt.classList.contains('lehtipalsta'), false);

  const pitka = html('div', 'fokusnosto-teksti');
  const kotelo = lehtipalstaKotelo(pitka, PITKA_KAPPALEET);
  assert.notEqual(kotelo, pitka);
  assert.ok(kotelo.classList.contains('lehtipalsta-kotelo'), 'kotelo on container queryn mitta');
  assert.equal(pitka.parentNode, kotelo);
  assert.ok(pitka.classList.contains('lehtipalsta'));
  assert.ok(pitka.classList.contains('fokusnosto-teksti'), 'alkuperäinen luokka säilyy');
});

test('kaikki karttakortit latovat leipätekstin lehtipalstaKotelon kautta', () => {
  for (const polku of ['js/fokuskohteet.js', 'js/elaintaky.js', 'js/historian-hetket.js',
    'js/syvennys.js', 'js/fokusnosto.js']) {
    const src = lue(polku);
    assert.match(src, /lehtipalstaKotelo\(teksti, [a-z]+\.teksti\)/,
      `${polku}: leipäteksti ei kulje lehtipalstaKotelon kautta`);
  }
  // Lööpillä on omat palstansa (.looppi-leipa): ei kahta palstamekanismia päällekkäin.
  assert.match(lue('js/fokusnosto.js'), /looppi \? teksti : lehtipalstaKotelo\(teksti, nosto\.teksti\)/);
  assert.ok(!lue('js/skandaalit.js').includes('lehtipalstaKotelo'),
    'skandaali on lööppi ja pitää omat .looppi-leipa-palstansa');
});

test('leveys: 1024 px pitkä → 2 palstaa, 1400 px tekstipalsta → 1, 390 px → 1', () => {
  const css = lue('css/styles.css');
  assert.match(css, /\.lehtipalsta-kotelo \{ container-type: inline-size; \}/);
  const kynnys = Number(/@container \(min-width: (\d+)px\) \{\s*\.lehtipalsta \{\s*column-count: 2;/.exec(css)?.[1]);
  assert.ok(Number.isFinite(kynnys), 'container query -kynnys puuttuu tai palstamäärä ei ole 2');
  // Mitatut tekstikotelon leveydet (ks. tiedoston alku):
  const palstoja = (leveys) => (leveys >= kynnys ? 2 : 1);
  assert.equal(palstoja(712), 2, `iPad pysty 1024: tekstikotelo 712 px ≥ ${kynnys}`);
  assert.equal(palstoja(498), 1, `≥ 1100 px tekstipalsta 498 px < ${kynnys}: kaksi palstaa olisi alle 35 merkkiä rivillä`);
  assert.equal(palstoja(330), 1, 'puhelin 390: tekstikotelo 330 px');
  // Anfangi vain palstoissa, ei puhelimen pinossa.
  const kysely = css.slice(css.indexOf(`@container (min-width: ${kynnys}px)`));
  assert.match(kysely.slice(0, kysely.indexOf('\n}\n')), /\.lehtipalsta p:first-of-type::first-letter/);
});
