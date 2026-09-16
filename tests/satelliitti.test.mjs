import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/*
 * SATELLIITTILINSSI (omistajan tilaus 12.9.2026): hohtavat vihreät
 * havaintopisteet pallolla, koko yläpalkki linssin omaksi ja pisteen
 * napautuksesta valokuva HETI KOKO RUUTUUN.
 *
 * AINEISTO VAIHTUI v1802:ssa ICEYEn tutkakuvista NASAn astronauttien
 * Maa-kuviin (omistaja 12.9.2026). Linssin logiikka ei muuttunut, ja
 * jokainen alla oleva vaatimus on sama kuin ennen — vain aineiston
 * kentät ja lähdetiedot ovat uudet.
 *
 * Tämä tiedosto vartioi vaatimukset yksi kerrallaan:
 *   1. pallo säilyy (linssi ei piirrä kerrosta eikä avaa linssikarttaa),
 *   2. hohtavat vihreät pisteet ilman jatkuvaa pulssia,
 *   3. koko yläpalkki vaihtuu ja palautuu — EIKÄ siinä ole vetolaatikkoa,
 *   4. kuva koko ruutuun heti, pikkukuvat kuvan päälle, info-popup,
 *      sulkuristi alaoikealle ja sormizoom,
 *   5. yksi piste per kohde + galleria (A/B/C-erottelu),
 *   6. ei live-väitettä; lisenssi, aika, alue ja lähde kulkevat mukana,
 *   7. linssin merkit eivät kuluta pelivuoroa EIKÄ linssin aikana voi
 *      napauttaa mitään muuta kuin havaintopistettä.
 */

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

const {
  LINSSI, LINSSIN_AANI_AVAIN, LINSSIN_IKONI, SATELLIITTI_OSA, aikateksti,
  asetaLinssiAani, kuvatiedot, linssiAaniPaalla, oletusIndeksi,
  paikkateksti, paivateksti, parasHavainto, rakennaValikko,
} = await import('../js/linssit/satelliitti.js');
const { SATELLIITTI_KOHTEET, SATELLIITTI_LAHDE } = await import('../js/linssit/satelliitti-data.js');
const tyokalu = await import('../tools/hae-satelliittihavainnot.mjs');

const lahde = lue('../js/linssit/satelliitti.js');
const tyyli = lue('../css/satelliitti.css');

/* ══════════════════════════ 1. pallo säilyy ══════════════════════ */

test('linssi on kerrokseton ja asuu pallolla — tasokarttaa ei avata', () => {
  assert.equal(LINSSI.kerros, false);
  assert.equal(typeof LINSSI.pallolle, 'function');
  // js/ui.js valitseLinssi avaa linssikartan vain linsseille, joilla EI
  // ole pallolle-funktiota (pallolinssiKelpaa) — tämä siis pysyy pallolla.
  assert.ok(!('piirra' in LINSSI), 'kerrokseton linssi ei piirrä tasokartalle');
});

test('linssi on rekisterissä ja sw.js:n SHELLissä', () => {
  const rekisteri = lue('../js/linssit/rekisteri.js');
  assert.match(rekisteri, /tunnus: 'satelliitti'/);
  const sw = lue('../sw.js');
  for (const polku of [
    './js/linssit/satelliitti.js', './js/linssit/satelliitti-data.js', './css/satelliitti.css',
  ]) {
    assert.ok(sw.includes(`'${polku}'`), `${polku} puuttuu sw.js:n SHELListä`);
  }
});

test('linssisopimuksen pakolliset kentät ovat paikallaan', () => {
  for (const kentta of ['tunnus', 'nimi', 'lyhyt', 'ikoni']) {
    assert.equal(typeof LINSSI[kentta], 'string');
    assert.ok(LINSSI[kentta].length > 0, `${kentta} on tyhjä`);
  }
  assert.ok(Array.isArray(LINSSI.laudat) && LINSSI.laudat.length);
  assert.equal(typeof LINSSI.lahde, 'object');
  assert.match(LINSSI.lahde.lisenssi, /Public domain \(NASA\)/);
});

/* ═══════════════════ 2. hohtavat vihreät pisteet ════════════════ */

test('piste on PELKKÄ vihreä piste — ei rengasta, ei hohtoa, ei pulssia', () => {
  /*
   * OMISTAJA 16.9.2026, sanatarkasti: *"Muutamilla nuo hehkuvat
   * pisteet pelkeiksi vihreäksi pisteeksi ilman ympyrää ja pisteen
   * ympärillä."* Sädekehä ja rengas ovat poissa sekä tyylistä että
   * merkin elementistä; jäljellä on läpinäkyvä osuma-ala ja piste.
   */
  for (const luokka of ['satelliitti-osuma', 'satelliitti-ydin', 'satelliitti-nimi']) {
    assert.ok(tyyli.includes(`.${luokka}`), `${luokka} puuttuu tyylistä`);
  }
  for (const poistunut of ['satelliitti-hehku', 'satelliitti-rengas']) {
    assert.ok(!tyyli.includes(`.${poistunut}`), `${poistunut} on yhä tyylissä`);
    assert.ok(!lahde.includes(poistunut), `${poistunut} on yhä merkin elementissä`);
  }
  // Pisteen omat säännöt: ei reunaviivaa eikä varjoa missään niistä.
  // (border-radius on muoto eikä reuna, joten se on sallittu.)
  const lohkot = [...tyyli.matchAll(/\.satelliitti-ydin[^{]*\{([^}]*)\}/g)].map((m) => m[1]);
  assert.ok(lohkot.length >= 1, 'pisteen sääntöä ei löytynyt');
  for (const lohko of lohkot) {
    assert.ok(!/border(?!-radius)|box-shadow/.test(lohko),
      `pisteessä on yhä reuna tai varjo: ${lohko}`);
  }
  assert.ok(lohkot.some((l) => /background: var\(--satelliitti-vihrea\)/.test(l)),
    'piste ei ota väriään --satelliitti-vihreasta');
  // Piste on pieni (≤ 9 px) ja osuma-ala sormen kokoinen (≥ 32 px).
  const koko = /--satelliitti-pisteen-koko:\s*(\d+)px/.exec(tyyli);
  const osuma = /--satelliitti-osuman-koko:\s*(\d+)px/.exec(tyyli);
  assert.ok(koko && Number(koko[1]) <= 9, `pisteen koko ${koko?.[1]}`);
  assert.ok(osuma && Number(osuma[1]) >= 32, `osuma-alan koko ${osuma?.[1]}`);
  // Vihreä sävy on sama kuin ennen.
  assert.match(tyyli, /--satelliitti-vihrea:\s*#5dffa8/);
  // Jatkuva pulssi kieltää pallolta 60 fps:n (js/linssit/kerros.js haivyta):
  // yksikään animaatio ei saa toistua loputtomiin.
  assert.ok(!/animation:[^;]*infinite/.test(tyyli), 'hehku ei saa sykkiä jatkuvasti');
  // Liikkeenvähennys: vakaa hehku ilman ilmestymisanimaatiotakin.
  assert.match(tyyli, /prefers-reduced-motion[\s\S]*satelliitti-piste \{ animation: none/);
});

test('merkki ei ota napautuksia elementtinä — osuma tulee pallon pinnasta', () => {
  assert.match(tyyli, /\.satelliitti-piste \{[\s\S]*pointer-events: none/);
  // Datumissa on napautus(d), jonka js/pallolauta/lauta.js lahinLinssimerkki
  // lukee — ja se hyväksyy vain kameran puolella olevat merkit.
  assert.match(lahde, /napautus: \(\) => avaaKohde\(kohde\)/);
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /merkit\.napautettavat\(\)\.filter\(\(d\) => edessa\(d\.lat, d\.lng\)\)/);
});

/* ════════════════ 3. koko yläpalkki vaihtuu ja palautuu ═════════ */

function teeDoc() {
  const teeSolmu = (tag) => {
    const luokat = new Set();
    const el = {
      tag,
      lapset: [],
      kuuntelijat: {},
      attribuutit: {},
      textContent: '',
      type: '',
      value: '',
      title: '',
      style: { arvot: {}, setProperty(k, v) { this.arvot[k] = v; }, removeProperty(k) { delete this.arvot[k]; } },
      get className() { return [...luokat].join(' '); },
      set className(v) { luokat.clear(); for (const l of String(v).split(/\s+/)) if (l) luokat.add(l); },
      classList: {
        add: (...l) => l.forEach((x) => luokat.add(x)),
        remove: (...l) => l.forEach((x) => luokat.delete(x)),
        contains: (x) => luokat.has(x),
      },
      setAttribute(k, v) { el.attribuutit[k] = String(v); },
      addEventListener(t, f) { (el.kuuntelijat[t] ??= []).push(f); },
      laukaise(t) { for (const f of el.kuuntelijat[t] ?? []) f({}); },
      append(...l) { for (const x of l) el.appendChild(x); },
      appendChild(x) { el.lapset.push(x); x.vanhempi = el; return x; },
      remove() { const i = el.vanhempi?.lapset.indexOf(el) ?? -1; if (i >= 0) el.vanhempi.lapset.splice(i, 1); },
      getBoundingClientRect: () => ({ height: 54 }),
    };
    return el;
  };
  const body = teeSolmu('body');
  const topbar = teeSolmu('div');
  return {
    body,
    topbar,
    createElement: (tag) => teeSolmu(tag),
    querySelector: (v) => (v === '.topbar' ? topbar : null),
  };
}

test('yläpalkki poistuu kokonaan — ruudulla on vain kelluva hampurilainen', () => {
  /*
   * OMISTAJA 16.9.2026 (Raamattu, LISÄYS 3): *"Astronauttilinssistä
   * voisi ottaa koko yläpalkin pois, niin että oikeassa yläkulmassa on
   * pelkkä hampurilainen ja kaikki muut yläpalkin jutut pois, koska ne
   * eivät tuo mitään lisää, vievät vain tilaa."*
   */
  const doc = teeDoc();
  const mapPane = doc.createElement('div');
  let suljettu = 0;
  const valikko = rakennaValikko({
    ui: { mapPane, valitseLinssi: () => { suljettu += 1; } },
    onSulje: () => { suljettu += 1; },
    doc,
  });
  // Matkakirjan oma palkki piiloon samalla luokalla kuin aikajanalinsseillä.
  assert.ok(doc.body.classList.contains('aikajana-palkki-auki'));
  assert.ok(doc.body.classList.contains('aikajana-paalla'));
  // MITÄÄN EI TULE TILALLE: ei palkkia karttaruutuun, ei korkeusmuuttujaa.
  assert.equal(mapPane.lapset.length, 0, 'karttaruutuun ilmestyi yhä palkki');
  assert.equal(doc.body.style.arvot['--aikajana-palkki-korkeus'], undefined);
  assert.ok(!lahde.includes('satelliittipalkki'), 'yläpalkki on yhä lähteessä');
  assert.ok(!tyyli.includes('.satelliittipalkki'), 'yläpalkin tyyli on yhä jäljellä');
  // Kelluva kehys menee bodyyn (fixed; karttaruudun transform ei saa siirtää sitä).
  assert.equal(doc.body.lapset.at(-1).className, 'satelliitti-valikkokehys');
  assert.equal(valikko.el.className, 'satelliitti-valikkokehys');

  // Hampurilainen: kolme viivaa, valikko piilossa kunnes sitä painetaan.
  assert.equal(valikko.hampurilainen.lapset.length, 3);
  assert.equal(valikko.valikko.hidden, true);
  valikko.hampurilainen.laukaise('click');
  assert.equal(valikko.valikko.hidden, false, 'hampurilainen avaa valikon');
  // Valikossa on täsmälleen kaksi kohtaa: äänet ja poistuminen.
  assert.deepEqual(valikko.valikko.lapset.map((x) => x.className), [
    'satelliitti-kohta satelliitti-aani',
    'satelliitti-kohta satelliitti-poistu',
  ]);
  assert.match(valikko.valikko.lapset[0].textContent, /^Äänet (päällä|pois)$/);
  assert.equal(valikko.valikko.lapset[1].textContent, 'Poistu linssistä');
  valikko.valikko.lapset[1].laukaise('click');
  assert.equal(suljettu, 1, '"Poistu linssistä" kutsuu sulkemista');

  valikko.pura();
  assert.ok(!doc.body.classList.contains('aikajana-palkki-auki'));
  assert.ok(!doc.body.classList.contains('aikajana-paalla'));
  assert.ok(!doc.body.lapset.some((x) => x.className === 'satelliitti-valikkokehys'),
    'kelluva valikko jäi ruudulle');
});

test('yläpalkin osat (nimi, ikoni, NASA-rivi, pilleri, i-nappi) ovat kaikki poissa', () => {
  /*
   * LISÄYS 3 poisti myös ne osat, jotka 16.9. aamupäivällä vielä
   * uusittiin: linssin ikoni ja kaksirivinen nimi palkissa sekä
   * NASA-rivi. Lähde (aineisto ja lisenssi) ei kuitenkaan kadonnut —
   * se luetaan valokuvan selitteen lisätiedoista.
   */
  for (const jaanne of [
    'satelliittipalkki', 'satelliittipalkki-nimi', 'satelliittipalkki-ohje',
    'satelliittipalkki-kohde', 'satelliittipalkki-info', 'satelliittipalkki-sulje',
    'satelliittipalkki-ikoni',
  ]) {
    assert.ok(!lahde.includes(jaanne), `${jaanne} on yhä lähteessä`);
    assert.ok(!tyyli.includes(jaanne), `${jaanne} on yhä tyylissä`);
  }
  assert.ok(!lahde.includes("'ASTRONAUTIN'"), 'palkin nimirivi on yhä lähteessä');
  assert.ok(!lahde.includes('Astronauttien ottamia valokuvia'), 'NASA-rivi on yhä lähteessä');
  // Matkakirjan oma palkki pysyy piilossa, jotta kuva ja pallo saavat tilan.
  assert.match(tyyli, /body\.aikajana-palkki-auki \.topbar \{[\s\S]*visibility: hidden;[\s\S]*height: 0/);
  // Aineisto ja lisenssi ovat yhä luettavissa — selitteen lisätiedoissa.
  assert.match(lahde, /teeRivi\('Aineisto'/);
  assert.match(lahde, /teeRivi\('Lisenssi'/);
  // Kohteen nimi ja seutu ladotaan kuvan päällä olevaan selitteeseen.
  assert.match(lahde, /html\('div', 'satelliitti-selite-otsikko', kohde\.nimi\)/);
  assert.match(lahde, /seliteOtsikko\.appendChild\(html\('span', 'satelliitti-seutu', ` — \$\{kohde\.seutu\}`\)\)/);
});

test('kelluva hampurilainen on ruudun oikeassa yläkulmassa turva-alue huomioiden', () => {
  assert.match(tyyli, /\.satelliitti-valikkokehys \{[\s\S]*position: fixed;[\s\S]*top: var\(--satelliitti-yla\);[\s\S]*right: var\(--satelliitti-oikea\)/);
  assert.match(tyyli, /--satelliitti-yla: calc\(10px \+ env\(safe-area-inset-top, 0px\)\)/);
  assert.match(tyyli, /--satelliitti-oikea: calc\(12px \+ env\(safe-area-inset-right, 0px\)\)/);
  // Valikko aukeaa napin alle ilman mittausta.
  assert.match(tyyli, /\.satelliitti-valikko \{[\s\S]*top: calc\(100% \+ 6px\);[\s\S]*right: 0/);
  assert.match(tyyli, /\.satelliitti-valikko\[hidden\] \{ display: none; \}/);
  // Kuva ja pallo saavat palkin tilan: kortti alkaa ruudun yläreunasta.
  assert.match(tyyli, /\.satelliitti-katselu \{[\s\S]*position: fixed;[\s\S]*top: 0;/);
  assert.ok(!lahde.includes('asemoiYlareuna'), 'palkin alareunan mittaus on yhä lähteessä');
});

test('valikon ääniasetus tallentuu samaan paikkaan kuin pelin muut ääniasetukset', () => {
  /*
   * OMISTAJA 16.9.2026: *"laita siihen äänet päälle ja pois nappi"*.
   * Linssillä ei ole vielä omaa ääntä (avaruusambienssi on tilattu
   * Codexilta), joten kytkin kirjoittaa valinnan localStorageen samalla
   * kaavalla kuin musiikkivalitsin ('matkakirja-musiikki') — oletus on
   * päällä ja luku on try/catchin takana.
   */
  assert.equal(LINSSIN_AANI_AVAIN, 'matkakirja-linssiaani');
  const muisti = new Map();
  const vanha = globalThis.localStorage;
  globalThis.localStorage = {
    getItem: (k) => (muisti.has(k) ? muisti.get(k) : null),
    setItem: (k, v) => muisti.set(k, v),
  };
  try {
    assert.equal(linssiAaniPaalla(), true, 'oletus on päällä');
    asetaLinssiAani(false);
    assert.equal(muisti.get(LINSSIN_AANI_AVAIN), 'off');
    assert.equal(linssiAaniPaalla(), false);
    asetaLinssiAani(true);
    assert.equal(linssiAaniPaalla(), true);
  } finally {
    if (vanha === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = vanha;
  }
});

test('kulmanapit ovat pyöreitä ja kasvavat kapealla ruudulla', () => {
  /*
   * ✕ ja hampurilainen ovat samalla rivillä, ja ✕:n vaakasiirtymä
   * lasketaan napin leveydestä — siksi koko on YKSI muuttuja, joka
   * muuttuu kerralla molemmille (muuten napit erkanisivat rivistä).
   *
   * Pelin oma nappisääntö antaa kaikille napeille 44 px:n min-height,
   * joka venytti nämä soikeiksi (mitattu 390 × 844: ✕ 30 × 46 px).
   * Jokainen kulmanappi nollaa min-mitat ja lukitsee aspect-ration,
   * ja kosketusalue säilyy kasvattamalla nappia kapealla ruudulla.
   */
  for (const luokka of ['satelliitti-hampurilainen', 'satelliitti-sulku', 'satelliitti-vakanen']) {
    const lohko = tyyli.slice(tyyli.indexOf(`.${luokka} {`));
    assert.match(lohko.slice(0, 400), /min-height: 0;\n  aspect-ratio: 1;/, `${luokka} ei ole ympyrä`);
  }
  assert.match(tyyli, /@media \(max-width: 620px\) \{\s*:root \{ --satelliitti-nappi: 2\.4rem; \}/);
  assert.match(tyyli, /\.satelliitti-hampurilainen \{[\s\S]*width: var\(--satelliitti-nappi\)/);
  assert.match(tyyli, /\.satelliitti-sulku \{[\s\S]*width: var\(--satelliitti-nappi, 2\.1rem\)/);
  // Selite ei mene nappien alle kapealla ruudulla.
  assert.match(tyyli, /@media \(max-width: 620px\) \{[\s\S]*\.satelliitti-selite \{[\s\S]*width: calc\(100% - 24px - 2 \* var\(--satelliitti-nappi\) - 26px\)/);
});

test('✕ ja hampurilainen eivät voi leikata toisiaan', () => {
  /*
   * MITATTU PÄÄTÖS 16.9.2026 (LISÄYS 3): ✕ on hampurilaisen VASEMMALLA
   * puolella, ei sen alla. Valikko aukeaa hampurilaisen alle, joten
   * alapuolinen ✕ jäisi auki olevan valikon peittoon juuri silloin kun
   * valikkoa käytetään; samalla rivillä vasemmalla ne eivät leikkaa
   * toisiaan missään tilassa.
   */
  assert.match(tyyli, /\.satelliitti-kulma \{[\s\S]*right: calc\(var\(--satelliitti-oikea\) \+ var\(--satelliitti-nappi\) \+ 10px\);[\s\S]*top: var\(--satelliitti-yla\)/);
  // Molemmat lukevat samaa yläreunaa ja samaa napin kokoa.
  assert.match(tyyli, /\.satelliitti-valikkokehys \{[\s\S]*top: var\(--satelliitti-yla\)/);
  assert.match(tyyli, /\.satelliitti-hampurilainen \{[\s\S]*height: var\(--satelliitti-nappi\)/);
});

/* ═══════ 4. kuva koko ruutuun heti, kaikki muu sen päälle ═══════ */

test('kuva avautuu heti koko ruutuun — ei kaksivaiheista nostokuvaa', () => {
  // Omistaja 12.9.2026: "Kuva pitää avautua heti koko ruudun peittäväksi."
  assert.ok(!lahde.includes('nostokuvaAloita'), 'kaksivaiheinen nostokuva-avaus on yhä käytössä');
  assert.ok(!/from '\.\.\/nostokuva\.js'/.test(lahde), 'linssi tuo yhä nostokuva-apurin');
  assert.match(lahde, /html\('div', 'satelliitti-katselu'\)/);
  assert.match(tyyli, /\.satelliitti-katselu \{[\s\S]*position: fixed;[\s\S]*inset: 0/);
  // Oma kuvasuhde säilyy, loppu ruudusta tummaa.
  assert.match(tyyli, /\.satelliitti-kuva \{[\s\S]*max-width: 100%;[\s\S]*max-height: 100%/);
  assert.match(tyyli, /\.satelliitti-katselu \{[\s\S]*background: #040907/);
});

test('✕ ja pienoiskuvat on kiinnitetty RUUTUUN, ei kuvaelementtiin', () => {
  /*
   * OMISTAJA 16.9.2026 (iPad-kuva Istanbulista): *"jos kuva ei ulotu
   * alareunaan asti, niin ne miniatyyrikuvat saisivat silti olla aina
   * siellä vasemmassa alareunassa kelluvina"* ja ✕ *"oikeaan
   * yläreunaan heti palkin alapuolelle"*. Tämä KUMOAA 15.9.2026 tehdyn
   * kuvan reunaan mittaamisen: marginaalimuuttujat ja asemoiKulmat
   * ovat poissa, ja kulmat ovat kiinteitä ruudun sisennyksiä.
   */
  assert.ok(!tyyli.includes('.satelliitti-ala'), 'vanha alapalkki on yhä tyylissä');
  assert.ok(!tyyli.includes('.satelliitti-napit'), 'vanha nappirivi on yhä tyylissä');
  assert.ok(!tyyli.includes('--satelliitti-kuva-marginaali'),
    'kuvan marginaalimuuttuja on yhä tyylissä');
  assert.ok(!lahde.includes('asemoiKulmat'), 'kuvan marginaalimittaus on yhä lähteessä');
  assert.match(lahde, /kulma\.append\(sulku\)/);
  assert.match(tyyli, /\.satelliitti-kulma \{[\s\S]*position: absolute;[\s\S]*right: calc\(var\(--satelliitti-oikea\)/);
  assert.match(tyyli, /\.satelliitti-nauha \{[\s\S]*position: absolute;[\s\S]*left: 12px;[\s\S]*bottom: calc\(12px/);
  // Oikea alakulma jää vapaaksi minipululle (Codexin työ).
  assert.match(tyyli, /\.satelliitti-nauha \{[\s\S]*max-width: 50%/);
});

test('kuvan sulkeva ✕ on harmaa, ei vihreä', () => {
  /*
   * OMISTAJA 16.9.2026: *"ota siitä väri pois ja muuta ... ympyrän
   * muotoiseksi ja sen keskelle laita X, mutta nämä saisivat olla
   * harmaalla"*. Jokainen napin väri on puhtaan harmaa (r = g = b);
   * linssin vihreää tehosteväriä ei saa jäädä yhteenkään.
   */
  const lohko = tyyli.slice(tyyli.indexOf('.satelliitti-sulku {'),
    tyyli.indexOf('.satelliitti-sulku:hover'));
  assert.match(lohko, /border-radius: 999px/);
  assert.ok(!/93, 255, 168/.test(lohko), 'sulkunapissa on yhä linssin vihreä');
  for (const osuma of lohko.matchAll(/rgba?\((\d+), (\d+), (\d+)/g)) {
    const [, r, g, b] = osuma;
    assert.ok(r === g && g === b, `ei-harmaa väri sulkunapissa: ${osuma[0]}`);
  }
});

test('selite lukee kuvan päällä ruudun vasemmassa yläkulmassa, i-nappi on poistettu', () => {
  /*
   * OMISTAJA 16.9.2026: *"Otetaan I-nappi pois ja näytä suoraan
   * kohteen nimi ja selite vasemmassa yläreunassa kuvan päällä. Tai
   * mikäli kuva ei kata koko aluetta, niin pidä silti selite ihan
   * vasemmassa yläreunassa."*
   */
  assert.ok(!lahde.includes('infoNappi'), 'i-nappi on yhä lähteessä');
  assert.ok(!lahde.includes('satelliitti-popup'), 'vanha info-popup on yhä lähteessä');
  assert.ok(!tyyli.includes('.satelliitti-popup'), 'info-popupin tyyli on yhä jäljellä');
  assert.match(lahde, /html\('div', 'satelliitti-selite'\)/);
  assert.match(lahde, /katselu\.append\(lava, selite, kulma, nauha\)/);
  // Kiinnitys on RUUTUUN (kortti alkaa ruudun yläreunasta, LISÄYS 3),
  // ei kuvaelementtiin — 12 px vasemmalta, 10 px + turva-alue ylhäältä.
  assert.match(tyyli, /\.satelliitti-selite \{[\s\S]*position: absolute;[\s\S]*left: calc\(12px \+ env\(safe-area-inset-left, 0px\)\);[\s\S]*top: var\(--satelliitti-yla\)/);
  // Leveys: työpöydällä enintään 46 % ruudusta, puhelimella koko leveys.
  assert.match(tyyli, /\.satelliitti-selite \{[\s\S]*max-width: min\(46%, 560px\)/);
  assert.match(tyyli, /@media \(max-width: 620px\) \{[\s\S]*\.satelliitti-selite \{[\s\S]*width: calc\(100% - 24px - 2 \* var\(--satelliitti-nappi\) - 26px\)/);
  // Kuultava tumma pohja: kontrasti ei riipu valokuvasta.
  assert.match(tyyli, /\.satelliitti-selite \{[\s\S]*background: rgba\(6, 13, 10, 0\.72\)/);
});

test('selitetekstin napautus kelaa tekstin ylös, väkänen avaa lisätiedot', () => {
  /*
   * OMISTAJA 16.9.2026: *"siinä selitteen oikeassa alareunassa saisi
   * olla pieni väkänen alaspäin, mitä painamalla nämä lisätiedot vielä
   * tulisi näkyviin. Ja jos selitetekstiä itsessään painaa, niin
   * silloin se seliteteksti kelautuu ylös ja näkyville jää vain
   * otsikkorivi."*
   */
  assert.match(lahde, /selite\.classList\.toggle\('satelliitti-selite-kiinni'\)/);
  assert.match(lahde, /selite\.addEventListener\('click', \(e\) => \{ e\.stopPropagation\(\); kelaaSelite\(\); \}\)/);
  assert.match(tyyli, /\.satelliitti-selite-runko \{[\s\S]*overflow: hidden;[\s\S]*transition: max-height 250ms/);
  assert.match(tyyli, /\.satelliitti-selite\.satelliitti-selite-kiinni \.satelliitti-selite-runko \{[\s\S]*max-height: 0/);
  // Otsikkorivi EI ole rungossa, joten se jää aina näkyviin.
  assert.match(lahde, /selite\.append\(seliteOtsikko, seliteRunko\)/);
  assert.match(lahde, /seliteRunko\.append\(seliteTeksti, vakasenRivi, lisatiedot\)/);
  // Väkänen ei kelaa tekstiä: napautus pysähtyy siihen.
  assert.match(lahde, /vakanen\.addEventListener\('click', \(e\) => \{[\s\S]{0,400}?e\.stopPropagation\(\);/);
  assert.match(lahde, /lisatiedot\.hidden = !auki;/);
  assert.match(lahde, /vakanen\.classList\.toggle\('satelliitti-vakanen-auki', auki\)/);
  assert.match(tyyli, /\.satelliitti-vakanen-auki \{ transform: rotate\(180deg\); \}/);
  // Liikkeenvähennys pysäyttää molemmat siirtymät.
  assert.match(tyyli, /prefers-reduced-motion[\s\S]*\.satelliitti-selite-runko \{ transition: none; \}/);
});

test('sulkuristi on pieni pyöreä nappi kuvan oikeassa yläkulmassa', () => {
  // Omistaja 15.9.2026: "pienena pyoreana X" (siirretty pois alakulmasta).
  assert.match(lahde, /nappi\('satelliitti-sulku', '×', 'Sulje havainto'\)/);
  assert.match(tyyli, /\.satelliitti-sulku \{[\s\S]*border-radius: 999px/);
  // Sulkeminen ei kosketa linssiin: vain ikkuna poistuu.
  assert.match(lahde, /sulku\.addEventListener\('click', \(e\) => \{ e\.stopPropagation\(\); sulje\(\); \}\)/);
});

test('lisätiedot ovat väkäsen takana selitteen alla, oletuksena piilossa', () => {
  /*
   * OMISTAJA 16.9.2026: *"jätä lisätiedot, elikkä aineisto,
   * kuvausaika, paikka ja niin edelleen pois"* — mutta väkäsen takaa ne
   * löytyvät yhä. Lähdeketju ei siis katkennut, vain paikka vaihtui
   * entisestä i-napin popupista selitteen sisään.
   */
  assert.match(lahde, /html\('div', 'satelliitti-lisatiedot'\)/);
  assert.match(lahde, /lisatiedot\.hidden = true;/);
  for (const rivi of ['Aineisto', 'Kuvausaika', 'Paikka', 'Kuvaustapa', 'Kuvatunnus', 'Lisenssi']) {
    assert.ok(lahde.includes(`teeRivi('${rivi}'`), `${rivi} puuttuu lisätiedoista`);
  }
  assert.match(lahde, /ulkolinkki\('NASAn kuvasivu', h\.sivu\)/);
  assert.match(lahde, /ulkolinkki\('NASA Image and Video Library', SATELLIITTI_LAHDE\.osoite\)/);
  assert.match(tyyli, /\.satelliitti-lisatiedot\[hidden\] \{ display: none; \}/);
  // Escape sulkee koko havaintoikkunan (popupia ei enää ole).
  assert.match(lahde, /if \(e\.key === 'Escape'\) \{ sulje\(\); return; \}/);
  // Otoksen vaihtuessa lisätiedot ladotaan uudestaan vain jos ne ovat auki.
  assert.match(lahde, /if \(!lisatiedot\.hidden\) latoLisatiedot\(\);/);
});

test('sormizoom: nipistys, panorointi, rulla ja kaksoisnapautus — ele ei vuoda pallolle', () => {
  // Omistaja 12.9.2026: "Kuvaa pitää pystyä zoomaamaan sormi eleellä".
  for (const tapahtuma of ['pointerdown', 'pointermove', 'pointerup', 'wheel', 'dblclick']) {
    assert.ok(lahde.includes(`lava.addEventListener('${tapahtuma}'`), `${tapahtuma} puuttuu`);
  }
  // ELE EI VUODA PALLOLLE: jokainen käsittelijä pysäyttää kuplinnan ja
  // lava on touch-action: none (selain ei vieritä eikä pallo saa elettä).
  assert.match(tyyli, /\.satelliitti-lava \{[\s\S]*touch-action: none/);
  assert.equal((lahde.match(/e\.stopPropagation\(\);/g) ?? []).length >= 5, true);
  // Katto on kuvan oma tarkkuus, ei kiinteä kerroin.
  assert.match(lahde, /kuva\.naturalWidth \/ kuva\.offsetWidth/);
  // Zoom nollautuu otoksen vaihtuessa ja ikkunan avautuessa.
  assert.match(lahde, /if \(vaihtui\) nollaaZoom\(\)/);
  assert.match(lahde, /const nollaaZoom = \(\) => \{ skaala = 1; tx = 0; ty = 0; piirra\(\); \}/);
});

test('pikkukuvanauha on lavan sisar — raja eleiden ja selauksen välillä', () => {
  /*
   * Vaakaveto nauhassa selaa otoksia, sama veto kuvan päällä panoroi.
   * Raja on elementtiraja: eleet ovat LAVAN kuuntelijoita eikä nauha ole
   * lavan sisällä, joten sama piste ei voi kuulua molemmille.
   */
  assert.match(lahde, /lava\.appendChild\(kuva\)/);
  assert.ok(!/lava\.append[^;]*nauha/.test(lahde), 'nauha ei saa olla lavan sisällä');
  assert.match(tyyli, /\.satelliitti-nauha \{[\s\S]*touch-action: pan-x/);
});

/* ═══════════ 5. yksi piste per paikka, galleria sisällä ══════════ */

test('aineistossa on vähintään 55 kohdetta ja tunnukset ovat uniikkeja', () => {
  // Omistajan tilaus 12.9.2026: ensin 20–30 visuaalisesti vaikuttavaa kohdetta,
  // sitten sanatarkasti "Astronoottikuvat ovat hienoja, niitä voisi olla vaikka
  // enemmänkin" — määrä vähintään kaksinkertaistettiin laadusta tinkimättä.
  assert.ok(SATELLIITTI_KOHTEET.length >= 55,
    `kohteita ${SATELLIITTI_KOHTEET.length}`);
  const tunnukset = SATELLIITTI_KOHTEET.map((k) => k.tunnus);
  assert.equal(new Set(tunnukset).size, tunnukset.length, 'tunnukset ovat uniikkeja');
  for (const t of ['etna', 'richat', 'new-york', 'goidhoo']) {
    assert.ok(tunnukset.includes(t), `${t} puuttuu aineistosta`);
  }
  // Kattavuus: kohteita molemmilta pallonpuoliskoilta ja joka suunnasta.
  assert.ok(SATELLIITTI_KOHTEET.some((k) => k.lat < -10), 'eteläistä palloa ei ole edustettuna');
  assert.ok(SATELLIITTI_KOHTEET.some((k) => k.lat > 45), 'pohjoista palloa ei ole edustettuna');
  assert.ok(SATELLIITTI_KOHTEET.some((k) => k.lon < -60), 'Amerikkaa ei ole edustettuna');
  assert.ok(SATELLIITTI_KOHTEET.some((k) => k.lon > 100), 'Itä-Aasiaa ei ole edustettuna');
});

test('todennetut galleriaesimerkit: Etna 2, Dubai 2, taifuuni 1', () => {
  const etna = SATELLIITTI_KOHTEET.find((k) => k.tunnus === 'etna');
  assert.equal(etna.havainnot.length, 2);
  assert.deepEqual(etna.havainnot.map((h) => h.aika.slice(0, 4)), ['2002', '2006']);

  const dubai = SATELLIITTI_KOHTEET.find((k) => k.tunnus === 'dubai');
  assert.equal(dubai.havainnot.length, 2, 'Dubaissa on päivä- ja yökuva');

  const taifuuni = SATELLIITTI_KOHTEET.find((k) => k.tunnus === 'taifuuni');
  assert.equal(taifuuni.havainnot.length, 1, 'yhden kuvan kohde on sallittu');
});

test('saman pisteen kuvat ovat eri kuvauskerroilta, eri paikat eri pisteissä', () => {
  /*
   * (A) Sama paikka eri aikoina → saman pisteen galleria.
   * (C) Eri paikka → oma piste. Pikkukuvien päiväysten pitää erottaa
   *     saman pisteen kuvat toisistaan, joten samalta päivältä ei oteta
   *     kahta kuvaa samaan pisteeseen.
   */
  for (const kohde of SATELLIITTI_KOHTEET) {
    const paivat = kohde.havainnot.map((h) => paivateksti(h.aika));
    assert.equal(new Set(paivat).size, paivat.length,
      `${kohde.tunnus}: kaksi kuvaa samalta päivältä ei erotu pikkukuvanauhassa`);
    const idt = kohde.havainnot.map((h) => h.id);
    assert.equal(new Set(idt).size, idt.length, `${kohde.tunnus}: sama kuva kahdesti`);
  }
  // Sama kuva ei saa esiintyä kahdessa eri pisteessä.
  const kaikki = SATELLIITTI_KOHTEET.flatMap((k) => k.havainnot.map((h) => h.id));
  assert.equal(new Set(kaikki).size, kaikki.length, 'sama kuva on kahdessa pisteessä');
});

test('kohteiden pisteet eivät osu päällekkäin pallolla', () => {
  for (let i = 0; i < SATELLIITTI_KOHTEET.length; i++) {
    for (let j = i + 1; j < SATELLIITTI_KOHTEET.length; j++) {
      const a = SATELLIITTI_KOHTEET[i];
      const b = SATELLIITTI_KOHTEET[j];
      const ero = Math.hypot(a.lat - b.lat, a.lon - b.lon);
      assert.ok(ero > 0.2, `${a.tunnus} ja ${b.tunnus} ovat samassa pisteessä`);
    }
  }
});

test('oletuskuva on käsin valittu paras yleiskuva, ei automaattisesti uusin', () => {
  /*
   * Valokuvan laatua ei voi lukea metatiedosta — pilvet, vino rajaus ja
   * ikkunankehys näkyvät vain katsomalla — joten paras kuva on valittu
   * käsin kenttään `oletus`. Sen on osoitettava johonkin kohteen kuvista,
   * ja `oletusIndeksi` on velvollinen tottelemaan sitä.
   */
  for (const kohde of SATELLIITTI_KOHTEET) {
    const idt = kohde.havainnot.map((h) => h.id);
    assert.ok(idt.includes(kohde.oletus), `${kohde.tunnus}: oletus ei ole kohteen kuva`);
    assert.equal(kohde.havainnot[oletusIndeksi(kohde)].id, kohde.oletus, kohde.tunnus);
  }
  // Oletus EI ole automaattisesti uusin: ainakin yhdessä kohteessa se on vanhempi.
  assert.ok(SATELLIITTI_KOHTEET.some((k) => k.havainnot.at(-1).id !== k.oletus),
    'jokainen oletus sattuu olemaan uusin — sääntö ei silloin mittaa mitään');
  // Nimeämättömälle kohteelle jää varasääntö: uusin kuva.
  assert.equal(parasHavainto([
    { id: 'vanha', aika: '2002-10-30' }, { id: 'uusi', aika: '2026-04-10' },
  ]).id, 'uusi');
  assert.equal(oletusIndeksi({
    havainnot: [{ id: 'a', aika: '2001-01-01' }, { id: 'b', aika: '2020-01-01' }],
  }), 1);
});

test('aikatekstit ja paikkatekstit ovat suomalaisessa muodossa', () => {
  // KELLONAIKAA EI KEKSITÄ: NASA merkitsee astronauttikuvalle useimmiten
  // pelkän päivän, ja silloin kellonaikaa ei näytetä.
  assert.equal(aikateksti('2002-10-30'), '30.10.2002');
  assert.equal(paivateksti('2002-10-30'), '30.10.02');
  // Jos aineistossa on oikea kellonaika, vyöhyke sanotaan ääneen.
  assert.equal(aikateksti('2026-04-29T20:56:13.691Z'), '29.4.2026 klo 20.56 UTC');
  assert.equal(paivateksti('2026-04-29T20:56:13.691Z'), '29.4.26 20.56');
  assert.equal(paikkateksti(37.751, 14.994), '37,75° N · 14,99° E');
  assert.equal(paikkateksti(-50.3, -72.8), '50,30° S · 72,80° W');
});

test('galleria: hyvin pienet pikkukuvat, EI laskuria, nuolia eikä Vertaa-nappia', () => {
  /*
   * Omistaja 15.9.2026, työpöytäkuva Etnasta + kysymyskortti: "Vertaa
   * pois kokonaan" ja "otetaan kaikki oikean alareunan napit pois".
   * Otoksia vaihdetaan pikkukuvista tai nuolinäppäimillä (nappain),
   * ei omilla nuoli-/laskurinapeilla.
   */
  assert.ok(!lahde.includes('satelliitti-laskuri'), 'laskuri on yhä lähteessä');
  assert.ok(!lahde.includes('satelliitti-nuoli'), 'nuolinapit ovat yhä lähteessä');
  assert.ok(!lahde.includes('satelliitti-vertaa'), 'Vertaa-nappi on yhä lähteessä');
  assert.ok(!lahde.includes('kaksi havaintoa rinnakkain'), 'vertailunäkymä on yhä lähteessä');
  assert.ok(!tyyli.includes('.satelliitti-vertailu'), 'vertailun tyyli on yhä jäljellä');
  assert.match(lahde, /satelliitti-nauha/);
  // Pikkukuvanauha lataa pienen tiedoston, ei koko ruudun kuvaa uudestaan.
  assert.match(lahde, /pikku\.src = toinen\.pikku \?\? toinen\.kuva/);
  // Nuolinäppäimet toimivat yhä ilman nappeja.
  assert.match(lahde, /if \(e\.key === 'ArrowRight'\) nayta\(indeksi \+ 1\);/);
  assert.match(lahde, /if \(e\.key === 'ArrowLeft'\) nayta\(indeksi - 1\);/);
  // Pikkukuvat ovat hyvin pieniä (aiempi 72×48 → 38×26).
  assert.match(tyyli, /\.satelliitti-pikku \{[\s\S]*width: 38px;[\s\S]*height: 26px/);
});

/* ═════════════ 6. ei live-väitettä, lähteet mukana ══════════════ */

test('kohteen nimi ja selite lukevat kuvan päällä, vanha arkistoleima on poissa', () => {
  /*
   * OMISTAJA 16.9.2026: nimi, seutu ja otoksen oma kuvateksti ovat
   * kuvan päällä ruudun vasemmassa yläkulmassa; NASA ja lisenssi ovat
   * väkäsen takana lisätiedoissa. Vanha arkistoleima ja 15.9. tehty
   * yläpalkin pilleri ovat molemmat poissa.
   */
  assert.ok(!/'Valokuva avaruudesta · NASA'/.test(lahde),
    'vanha arkistoleima on yhä kuvan päällä');
  assert.ok(!lahde.includes('satelliitti-otsake'), 'vanha otsake on yhä lähteessä');
  assert.ok(!tyyli.includes('.satelliitti-otsake'), 'vanhan otsakkeen tyyli on yhä jäljellä');
  // Seliteteksti on OTOKSEN oma kuvateksti ja vaihtuu pikkukuvasta.
  assert.match(lahde, /seliteTeksti\.textContent = h\.teksti \?\? kohde\.selite;/);
  // NASA ja lisenssi ovat yhä mukana (lisätiedoissa).
  assert.match(lahde, /teeRivi\('Aineisto'/);
  assert.match(lahde, /teeRivi\('Lisenssi'/);
  // ICEYE-attribuutio poistui kokonaan: aineistoa ei enää käytetä.
  assert.ok(!/ICEYE · tutkakuva/.test(lahde), 'vanha tutkaleima on yhä kuvan päällä');
  assert.ok(!/iceye/i.test(JSON.stringify(SATELLIITTI_KOHTEET)), 'aineistossa on yhä ICEYE-jäämiä');
  // Kuvaustilausta ei ole: linssi ei pyydä mitään eikä tee verkkokutsuja.
  assert.ok(!/\bfetch\(|XMLHttpRequest/.test(lahde), 'linssi ei saa pyytää uutta kuvaa');
  assert.match(lahde, /kuva\.src = h\.kuva/);
});

test('lähde on NASA ja public domain, ja se kulkee kuvan mukana', () => {
  assert.equal(SATELLIITTI_LAHDE.tekija, 'NASA');
  assert.equal(SATELLIITTI_LAHDE.lisenssi, 'Public domain');
  assert.match(SATELLIITTI_LAHDE.osoite, /^https:\/\/images\.nasa\.gov\//);
  const kohde = SATELLIITTI_KOHTEET[0];
  const tiedot = kuvatiedot(kohde, kohde.havainnot[0]);
  assert.match(tiedot.lahde, /NASA, Public domain/);
  assert.match(tiedot.selite, /Astronauttien Maa-kuvat/);
  // Kuvateksti kulkee kuvan selitteessä, ei pelkkä nimi.
  assert.ok(tiedot.selite.includes(kohde.havainnot[0].teksti), 'kuvateksti puuttuu selitteestä');
});

test('jokaisella kuvalla on aika, kuvateksti, osoitteet ja lähdesivu', () => {
  for (const kohde of SATELLIITTI_KOHTEET) {
    assert.ok(kohde.havainnot.length >= 1, kohde.tunnus);
    assert.ok(kohde.nimi && kohde.seutu && kohde.selite, kohde.tunnus);
    assert.ok(Number.isFinite(kohde.lat) && Number.isFinite(kohde.lon), kohde.tunnus);
    for (const h of kohde.havainnot) {
      // Sukkulakuvien tunnuksissa on väliviivat (sts059-213-019), asemakuvissa ei.
      assert.match(h.id, /^[a-z0-9]+(-[a-z0-9]+)*$/i, `${kohde.tunnus}: outo kuvatunnus`);
      assert.match(h.aika, /^\d{4}-\d{2}-\d{2}/);
      assert.match(h.kuva, /^https:\/\/images-assets\.nasa\.gov\/image\/.*~large\.jpg$/);
      assert.match(h.pikku, /^https:\/\/images-assets\.nasa\.gov\/image\/.*~(small|thumb)\.jpg$/);
      assert.match(h.sivu, /^https:\/\/images\.nasa\.gov\/details\//);
      assert.ok(h.kuvaustapa, `${h.id}: kuvaustapa puuttuu`);
      // KUVATEKSTI ON TÄRKEIN: se on ainoa teksti, jonka pelaaja näkee.
      assert.ok(typeof h.teksti === 'string' && h.teksti.length >= 80,
        `${h.id}: kuvateksti puuttuu tai on liian lyhyt`);
      assert.ok(/[a-zäö]/.test(h.teksti) && h.teksti.trim().endsWith('.'),
        `${h.id}: kuvateksti ei ole kokonainen virke`);
    }
  }
});

test('kohteet ja kuvatekstit ovat työkalun käsin katsotussa luettelossa', () => {
  const tyokalunLahde = lue('../tools/hae-satelliittihavainnot.mjs');
  assert.ok(tyokalu.KOHTEET.length >= 20);
  for (const k of tyokalu.KOHTEET) {
    assert.ok(k.tunnus && k.nimi && k.seutu && k.selite && k.oletus);
    assert.ok(Number.isFinite(k.lat) && Number.isFinite(k.lon));
    assert.ok(k.kuvat.length >= 1);
    for (const kuva of k.kuvat) assert.ok(kuva.id && kuva.teksti, `${k.tunnus}: kuvateksti puuttuu`);
    assert.ok(k.kuvat.some((kuva) => kuva.id === k.oletus), `${k.tunnus}: oletus ei ole luettelossa`);
  }
  // Aineistotiedosto vastaa luetteloa: samat kohteet samassa järjestyksessä.
  assert.deepEqual(SATELLIITTI_KOHTEET.map((k) => k.tunnus), tyokalu.KOHTEET.map((k) => k.tunnus));
  // Kuvausaika luetaan NASAn tiedosta, mutta kellonaikaa ei keksitä.
  assert.equal(tyokalu.siistiAika('2002-10-30T00:00:00Z'), '2002-10-30');
  assert.equal(tyokalu.siistiAika('2013-10-23T18:42:00Z'), '2013-10-23T18:42:00Z');
  assert.equal(tyokalu.kuvaustapa('iss074e0459342'), 'Kansainväliseltä avaruusasemalta');
  assert.equal(tyokalu.retkikunta('iss005e19024'), 'Retkikunta 5');
  // Työkalu tarkistaa jokaisen osoitteen eikä arvaa niitä.
  assert.match(tyokalunLahde, /kuvaVastaa\(kuva\)/);
});

test('kuvat eivät tule repoon — vain osoitteet', () => {
  const data = lue('../js/linssit/satelliitti-data.js');
  assert.ok(!/data:image\//.test(data), 'kuvadataa ei upoteta aineistoon');
  assert.ok(!/assets\//.test(data), 'kuvia ei viedä repon assets-kansioon');
});

/* ═══════ 7. linssin merkit eivät kuluta pelivuoroa ══════════════ */

test('linssin ajan matkustus ja lehdet ovat kiinni samasta portista', () => {
  const ui = lue('../js/ui.js');
  assert.match(ui, /linssikarttaEstaa\(\) \{\s*\n\s*return Boolean\(this\.linssikartta\) \|\| linssiEstaa\(\);/);
  // doMove (nopanheiton kohteen napautus pallolla) kysyy saman portin.
  assert.match(ui, /doMove\(key\) \{[\s\S]{0,400}if \(this\.linssikarttaEstaa\(\)\) return;/);
  // avaaTutkinta (kaupunkilehti) kysyi jo ennestään.
  assert.match(ui, /avaaTutkinta\(city[\s\S]{0,300}if \(this\.linssikarttaEstaa\(\)\) return;/);
});

test('LINSSIN AIKANA VAIN HAVAINTOPISTE ON NAPAUTETTAVA — yksi portti laudassa', () => {
  /*
   * OMISTAJA 12.9.2026, sanatarkasti: *"Ja kartalta ei saa voida
   * klikata mitään muita kohteita kuin niitä vihreitä kohteita."*
   *
   * PIILOTTAMINEN EI RIITÄ (v1794:n virhe, mitattu 12.9.2026):
   * näkymätön osumalaatikko otti napautuksen yhä vastaan — poltetun
   * eläintäyn kortti aukesi tyhjältä kartalta linssin päällä, sama vika
   * kuin v1789:ssä. Tämä testi kaatuu, jos portti katoaa tai jokin muu
   * napautuspolku avataan uudestaan linssin ajaksi.
   */
  const lauta = lue('../js/pallolauta/lauta.js');

  // 1. Pinnan napautus: linssin aikana vain linssimerkki, sitten return.
  const portti = lauta.match(
    /if \(linssiPaalla\(\)\) \{\s*const merkki = lahinLinssimerkki\(lat, lng\);[\s\S]{0,200}?\n {4}\}/,
  );
  assert.ok(portti, 'napautaPintaan ei sulje muita polkuja linssin ajaksi');
  assert.match(portti[0], /if \(merkki\) \{ heraa\(\); merkki\.napautus\(merkki\); \}/);
  assert.match(portti[0], /return;/);

  // 2. Portti on ENNEN kohteita, kaupunkeja, nostoja ja nimimustetta:
  //    yksikään niistä ei ehdi ratkaista napautusta linssin aikana.
  const runko = lauta.slice(lauta.indexOf('const napautaPintaan ='));
  const pPortti = runko.indexOf('if (linssiPaalla())');
  for (const polku of ['lahinKohde(lat, lng)', 'lahinMerkki(lat, lng)']) {
    const kohta = runko.indexOf(polku);
    assert.ok(kohta > pPortti && pPortti >= 0, `${polku} ratkaistaan ennen linssiporttia`);
  }

  // 3. Pallon pisteiden oma napautus (onPointClick: kaupunkipiste ja
  //    sen kamerasukellus) kulkee saman portin läpi.
  assert.match(lauta, /if \(linssiPaalla\(\)\) \{ napautaPintaan\(d\.lat, d\.lon\); return; \}/);
  const piste = lauta.slice(lauta.indexOf('.onPointClick('));
  assert.ok(piste.indexOf('if (linssiPaalla())') < piste.indexOf('reititaPallopisteenNapautus({'),
    'kaupunkipisteen napautus ohittaa linssiportin');
  const reititys = lauta.slice(
    lauta.indexOf('export function reititaPallopisteenNapautus('),
    lauta.indexOf('/*', lauta.indexOf('export function reititaPallopisteenNapautus(')),
  );
  assert.match(reititys, /if \(vaihe === 'pickstart'\) \{[\s\S]*napautaPintaan/);
  assert.match(reititys, /return napautaKaupunki\(piste\);/);
});

test('linssi ei koske pelitilaan eikä tallennukseen', () => {
  for (const kielletty of [
    'doMove', 'doRoll', 'doPickStart', 'avaaTutkinta', 'saveGame', 'tallennaPeli', 'game.',
  ]) {
    assert.ok(!lahde.includes(kielletty), `linssi kutsuu pelitoimintoa: ${kielletty}`);
  }
  // Ainoa kutsu pelin suuntaan on linssin sulkeminen.
  assert.match(lahde, /ui\?\.valitseLinssi\?\.\(null\)/);
});

test('purku ottaa pois merkit, kelluvan valikon ja kortin', () => {
  assert.equal(SATELLIITTI_OSA, 'satelliitti');
  assert.match(lahde, /lauta\?\.linssit\?\.merkit\?\.\(SATELLIITTI_OSA, merkit\)/);
  assert.match(lahde, /lauta\?\.linssit\?\.pura\?\.\(SATELLIITTI_OSA\)/);
  assert.match(lahde, /valikko\.pura\(\)/);
  assert.match(lahde, /suljeKortti\(\)/);
});

test('pelin omat nimikyltit piilotetaan linssin omassa tyylitiedostossa', () => {
  /*
   * Omistaja 12.9.2026: "Poista satelliitti linssin näkymästä pelin
   * omien kohdekaupunkien nimikyltit."
   *
   * Sääntö ON css/aikajana.css:ssä, mutta se ladataan vasta
   * aikajanalinssin mukana — sama ansa, johon yläpalkki jo kerran
   * kompastui. Jaettu body-luokka ei siis yksin riitä, ja siksi
   * sääntö on kopioitava linssin omaan tyylitiedostoon.
   */
  const css = lue('../css/satelliitti.css');
  for (const luokka of [
    'pallolauta-nimi', 'pallolauta-nosto', 'pallolauta-piste',
    'pallolauta-kohde', 'pallolauta-vesinimi', 'pallolauta-nappula',
  ]) {
    assert.ok(
      css.includes(`body.aikajana-paalla .${luokka}`),
      `css/satelliitti.css ei piilota luokkaa ${luokka} — se jää näkyviin linssiin`,
    );
  }
});


/* ═══ 8. NIMET JA PULU PIILOON VARMASTI (omistaja 12.9.2026) ═══════ */

/*
 * Omistaja: *"Kaikissa pisteissä ei tarvitse nimeä näkyä kuin vasta
 * lähemmäs zoomattuna"* ja *"Pulun voisi piilottaa"* — MOLEMMAT oli jo
 * korjattu kertaalleen, ja molemmat näkyivät silti pelaajalle. Nämä
 * vartiot koskevat sitä, MIKSI korjaus ei kantanut: piilotus oli kahden
 * ehdon ja yhden verkkolatauksen takana.
 */

test('kriittiset piilotukset ovat inline-tyylissä eivätkä verkon varassa', async () => {
  const { KRIITTINEN_TYYLI, KRIITTISEN_TUNNUS, lataaSatelliittiTyyli } = await import('../js/linssit/satelliitti.js');
  // Nimet ja pulu: molemmat piilotetaan ilman ulkoista tiedostoa.
  assert.match(KRIITTINEN_TYYLI, /\.satelliitti-nimi \{ opacity: 0; \}/);
  assert.match(KRIITTINEN_TYYLI, /body\.satelliitti-nimet \.satelliitti-nimi \{ opacity: 1; \}/);
  for (const valitsin of ['.pollo-nappi', '.pollo-paneeli', '.pollo-kuplapino', '.livia-kasvot-pinta']) {
    assert.ok(KRIITTINEN_TYYLI.includes(`body.aikajana-pulu-piilossa ${valitsin}`),
      `${valitsin} puuttuu kriittisestä tyylistä`);
  }
  // Sama sääntö on myös varsinaisessa tyylitiedostossa: kopio ja
  // alkuperä vartioidaan yhdessä.
  assert.match(tyyli, /\n\.satelliitti-nimi \{\n  opacity: 0;/);
  assert.match(tyyli, /body\.satelliitti-nimet \.satelliitti-nimi \{ opacity: 1; \}/);

  /*
   * VANHA VIKA: `lataaSatelliittiTyyli` palasi HILJAA tekemättä mitään,
   * jos sivulla ei ollut linkkiä, jonka href sisältää "styles.css".
   * Silloin koko tyyli jäi lataamatta — eikä nimillä ja pululla ollut
   * yhtään piilottavaa sääntöä. Nyt kriittiset säännöt menevät sivulle
   * joka tapauksessa.
   */
  const paat = [];
  const doc = {
    head: { appendChild: (el) => paat.push(el) },
    getElementById: (id) => paat.find((el) => el.id === id) ?? null,
    querySelector: () => null, // ei yhtään tyylilinkkiä
    createElement: (tagi) => ({ tagi, id: '', textContent: '', rel: '', href: '' }),
  };
  const tulos = lataaSatelliittiTyyli(doc);
  assert.equal(tulos.kriittinen, true, 'kriittinen tyyli jäi lisäämättä');
  assert.ok(paat.some((el) => el.id === KRIITTISEN_TUNNUS && /satelliitti-nimi/.test(el.textContent)));
  // Toinen kutsu ei kahdenna mitään.
  const ennen = paat.length;
  lataaSatelliittiTyyli(doc);
  assert.equal(paat.length, ennen);
});

test('nimien piilotus ei ole avaruusluokan takana', () => {
  /*
   * `satelliitti-avaruus` kirjoitetaan VAIN jos avaruusnäkymä syntyi
   * (js/linssit/satelliitti-avaruus.js palaa nullina, jos pallo ei ole
   * valmis). Jos piilotus riippuisi siitä, epäonnistuminen näyttäisi
   * kaikki 64 nimeä päällekkäin — juuri se, mitä pelaaja näki.
   */
  assert.ok(!/body\.satelliitti-avaruus \.satelliitti-nimi \{[^}]*opacity: 0/.test(tyyli),
    'piilotus on yhä avaruusluokan takana');
  assert.ok(!/body\.satelliitti-avaruus\.satelliitti-nimet/.test(tyyli),
    'sytytys vaatii yhä avaruusluokan');
});

test('pulun kuplapino piilotetaan napin ja paneelin kanssa', () => {
  for (const valitsin of ['.pollo-kuplapino', '.pollo-kuplapino-kehys']) {
    assert.ok(tyyli.includes(`body.aikajana-pulu-piilossa ${valitsin}`),
      `${valitsin} jää näkyviin linssiin`);
  }
});

/* ═══ 9. MUUT ÄÄNET VAIKENEVAT (omistaja 12.9.2026) ════════════════ */

test('linssi käyttää pelin omia äänifunktioita eikä koske voimakkuuksiin', async () => {
  const { vaiennaAanet } = await import('../js/linssit/satelliitti.js');
  assert.equal(typeof vaiennaAanet, 'function');
  // Samat neljä kutsua kuin aikajanalinsseillä (js/aikajana.js).
  for (const kutsu of ['hiljennaAmbienssi(LINSSIN_HILJENNYS)', 'stopPlaceStream()',
    'stopDiaryVoice(ui)', 'pysaytaLukija()', 'palautaAmbienssi(LINSSIN_HILJENNYS)']) {
    assert.ok(lahde.includes(kutsu), `${kutsu} puuttuu`);
  }
  // Hiljennyssyy on SAMA kuin aikajanalinsseillä, jotta kaksi linssiä
  // peräkkäin ei jätä taustaa alas.
  const siirtyma = lue('../js/siirtymamusiikki.js');
  assert.match(siirtyma, /LINSSIN_HILJENNYS = 'linssi'/);
  // Voimakkuuslogiikkaan ei kosketa (korjattiin v1815:ssä).
  assert.ok(!/\.volume\s*=|gain\.|setValueAtTime/.test(lahde),
    'linssi kirjoittaa äänenvoimakkuutta suoraan');
  // Purku palauttaa maiseman PELIN tilasta eikä linssin muistista.
  assert.match(lahde, /ui\?\.syncAmbience\?\.\(\)/);
});

test('vaiennaAanet purkautuu kerran eikä kahdesti', async () => {
  const { vaiennaAanet } = await import('../js/linssit/satelliitti.js');
  const kahva = vaiennaAanet(null);
  assert.equal(kahva.hiljaa(), true);
  kahva.pura();
  assert.equal(kahva.hiljaa(), false);
  kahva.pura();
  assert.equal(kahva.hiljaa(), false);
});

/* ═══ 10. VAAKANÄKYMÄ (omistaja 12.9.2026: "Korjaa vaaka näkymä") ══ */

test('kortti alkaa ruudun yläreunasta — palkin mittausta ei enää ole', () => {
  /*
   * ENNEN (12.9.–16.9. aamupäivä): kortin yläraja MITATTIIN linssin
   * yläpalkin alareunasta, koska kortti oli fixed (ikkuna) ja palkki
   * absolute (karttaruutu) — pelkkä korkeusmuuttuja osui 11 px väärään
   * paikkaan vaakaruudulla. LISÄYS 3 poisti palkin, joten mitattavaa ei
   * enää ole ja kuva saa koko ruudun.
   */
  assert.match(tyyli, /\.satelliitti-katselu \{[\s\S]*position: fixed;[\s\S]*inset: 0;[\s\S]*top: 0;/);
  assert.ok(!lahde.includes('asemoiYlareuna'), 'palkin mittaus on yhä lähteessä');
  assert.ok(!lahde.includes('paivitaAsemointi'), 'mittauksen päivitys on yhä lähteessä');
  assert.ok(!lahde.includes('new ResizeObserver'), 'palkin kokovahti on yhä lähteessä');
  assert.ok(!/addEventListener\('orientationchange'/.test(lahde),
    'kääntökuuntelija jäi ilman mittausta, jota se päivittäisi');
  // Turva-alue hoidetaan CSS:ssä, ei JS:n mittauksella.
  assert.match(tyyli, /--satelliitti-yla: calc\(10px \+ env\(safe-area-inset-top, 0px\)\)/);
});

test('vaakanäkymän oma pystysarake on poistettu — kulmanapit toimivat molemmissa asennoissa', () => {
  /*
   * OMISTAJA 15.9.2026: sulkunappi ja pienoiskuvat ovat kuvan PÄÄLLÄ
   * eivätkä vie omaa saraketta, joten erillistä
   * @media (orientation: landscape) -sarakelohkoa ei enää tarvita.
   * Sama asettelu (✕ ruudun oikeassa yläkulmassa, .satelliitti-nauha
   * vasemmassa alakulmassa) pätee pysty- ja vaakaruudulla.
   */
  assert.ok(!tyyli.includes('--satelliitti-sarake'), 'vanha pystysarakemuuttuja on yhä tyylissä');
  assert.ok(!/\.satelliitti-ala\b/.test(tyyli), 'vanha alapalkki on yhä tyylissä');
  assert.match(tyyli, /\.satelliitti-kulma \{[\s\S]*position: absolute;[\s\S]*right: calc\(var\(--satelliitti-oikea\)/);
  assert.match(tyyli, /\.satelliitti-nauha \{[\s\S]*position: absolute;[\s\S]*left: 12px/);
});

/* ═══ 11. OMA KUVAKE MATKALAUKKUUN (omistaja 15.9.2026) ═══════════ */

test('linssin ikoni on kamera + Maan kaari, ei enää entinen piirros', () => {
  // Sama tapa kuin sisarlinsseillä: pelkkiä <path>/<circle>/<rect>-
  // elementtejä, ei class- eikä fill-attribuutteja (js/linssit/pallo.js,
  // js/linssit/vesistot.js).
  assert.ok(!LINSSI.ikoni.includes('class='), 'ikoni ei saa kantaa omaa tyyliä');
  assert.match(LINSSI.ikoni, /<rect [^>]*rx="2.2"/);
  assert.match(LINSSI.ikoni, /<circle [^>]*r="2.7"/);
  assert.match(LINSSI.ikoni, /<path d="M2 21c3.6-3.4 16.4-3.4 20 0"\/>/);
});

test('matkalaukun linssivalikko saa oman varasolun, ei jaettua taikalasia', () => {
  /*
   * Omistaja 15.9.2026: *"tee astronauttilinssille oma kuvake
   * matkalaukkuun ... SVG inline samassa viivapaksuudessa ja
   * värissä ... Ei ulkoisia tiedostoja, ei emojia"*. Varuste-
   * satelliitti.jpg ei ole olemassa, joten linssiLiuska (js/ui.js)
   * antaa sille oman vektorityypin 'linssi-satelliitti' eikä yleistä
   * 'linssi'-taikalasia, jota muut ilman kuvaa jäävät linssit
   * käyttäisivät.
   */
  const ui = lue('../js/ui.js');
  assert.match(ui, /onSatelliitti \? 'linssi-satelliitti' : 'linssi'/);
  // Ei kuva-osoitetta satelliitille — ei turhaa 404-latausta.
  assert.match(ui, /const tiedot = onSatelliitti\s*\n\s*\? \{ name: nimi \}/);

  const mapart = lue('../js/mapart.js');
  assert.match(mapart, /case 'linssi-satelliitti':/);
  // Sama muste ja viivapaksuus kuin muilla varasoluilla: icon-linssi-*
  // (taikalasi) ja uusi icon-satelliitti-kamera samalla #3b2a13-musteella.
  assert.match(mapart, /class: 'icon-linssi-lasi'/);
  assert.match(mapart, /class: 'icon-satelliitti-kamera'/);
  const tyyli2 = lue('../css/styles.css');
  assert.match(tyyli2, /\.icon-satelliitti-kamera \{ fill: #3b2a13; stroke: #3b2a13;/);
});
