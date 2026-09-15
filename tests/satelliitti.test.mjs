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
  LINSSI, SATELLIITTI_OSA, aikateksti, kuvatiedot, oletusIndeksi,
  paikkateksti, paivateksti, parasHavainto, rakennaPalkki,
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

test('piste on vihreä hehku, rengas ja ydin — eikä jatkuvaa pulssia', () => {
  for (const luokka of ['satelliitti-hehku', 'satelliitti-rengas', 'satelliitti-ydin', 'satelliitti-nimi']) {
    assert.ok(tyyli.includes(`.${luokka}`), `${luokka} puuttuu tyylistä`);
  }
  // Vihreä sävy on sama kaikissa kolmessa kerroksessa.
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

test('yläpalkki vaihtuu kokonaan ja palautuu täsmälleen', () => {
  const doc = teeDoc();
  const mapPane = doc.createElement('div');
  let suljettu = 0;
  const palkki = rakennaPalkki({
    ui: { mapPane, valitseLinssi: () => { suljettu += 1; } },
    kohteet: SATELLIITTI_KOHTEET,
    onSulje: () => { suljettu += 1; },
    doc,
  });
  // Matkakirjan oma palkki piiloon samalla luokalla kuin aikajanalinsseillä.
  assert.ok(doc.body.classList.contains('aikajana-palkki-auki'));
  assert.ok(doc.body.classList.contains('aikajana-paalla'));
  // Palkki saa mitatun korkeuden, jottei kartta hyppää.
  assert.equal(doc.body.style.arvot['--aikajana-palkki-korkeus'], '54px');
  // EI lisäpalkkia tavallisen päälle: karttaruudussa on täsmälleen yksi.
  assert.equal(mapPane.lapset.length, 1);
  assert.equal(mapPane.lapset[0].className, 'satelliittipalkki');

  // Sisältö: linssin nimi, kohteen nimi, ohje ja sulkunappi (X).
  const osat = palkki.el.lapset.map((x) => x.className);
  assert.deepEqual(osat, [
    'satelliittipalkki-nimi', 'satelliittipalkki-kohde',
    'satelliittipalkki-ohje', 'satelliittipalkki-sulje',
  ]);
  // "Sulje linssi" -nappi on pelkkä X (omistaja 15.9.2026); aria-label
  // ja title kantavat edelleen täyden lauseen.
  assert.equal(palkki.el.lapset[3].textContent, '×');
  assert.equal(palkki.el.lapset[3].attribuutit['aria-label'], 'Sulje linssi');
  palkki.el.lapset[3].laukaise('click');
  assert.equal(suljettu, 1, 'Sulje-X kutsuu sulkemista');

  palkki.pura();
  assert.ok(!doc.body.classList.contains('aikajana-palkki-auki'));
  assert.ok(!doc.body.classList.contains('aikajana-paalla'));
  assert.equal(doc.body.style.arvot['--aikajana-palkki-korkeus'], undefined);
  assert.equal(mapPane.lapset.length, 0, 'palkki poistuu karttaruudusta');
});

test('yläpalkissa EI ole vetolaatikkoa — omistaja poisti sen 12.9.2026', () => {
  const doc = teeDoc();
  const mapPane = doc.createElement('div');
  const palkki = rakennaPalkki({
    ui: { mapPane },
    kohteet: SATELLIITTI_KOHTEET,
    onSulje: () => {},
    doc,
  });
  // Ei <select>-elementtiä, ei valintalistaa, ei "Valitse kohde".
  assert.ok(!palkki.el.lapset.some((x) => x.tag === 'select'), 'vetolaatikko on yhä palkissa');
  assert.ok(!lahde.includes('createElement(\'select\')'), 'lähde rakentaa yhä select-elementin');
  assert.ok(!lahde.includes('Valitse kohde'), 'palkissa lukee yhä "Valitse kohde"');
  assert.ok(!tyyli.includes('.satelliittipalkki-valinta'), 'vetolaatikon tyyli on yhä jäljellä');
  // Tilalle EI ole lisätty hakua eikä luetteloa: kohteet etsitään palloa
  // pyörittämällä (omistajan valinta).
  assert.ok(!/type = 'search'|createElement\('input'\)/.test(lahde));
  palkki.pura();
});

test('kohteen nimi asuu vain yläpalkissa eikä muuta palkin korkeutta', () => {
  const doc = teeDoc();
  const mapPane = doc.createElement('div');
  const palkki = rakennaPalkki({
    ui: { mapPane }, kohteet: SATELLIITTI_KOHTEET, onSulje: () => {}, doc,
  });
  // Kenttä on palkissa jo tyhjänä: tila on varattu, joten nimen
  // ilmestyminen ei kasvata palkkia eikä hyppäytä karttaa.
  assert.equal(palkki.kohdenimi.className, 'satelliittipalkki-kohde');
  assert.equal(palkki.kohdenimi.textContent, '');
  palkki.nimeaKohde('Victorian putoukset');
  assert.equal(palkki.kohdenimi.textContent, 'Victorian putoukset');
  palkki.nimeaKohde(null);
  assert.equal(palkki.kohdenimi.textContent, '');
  // Korkeus tulee muuttujasta, ei sisällöstä, ja pitkä nimi katkeaa.
  assert.match(tyyli, /\.satelliittipalkki \{[\s\S]*height: var\(--aikajana-palkki-korkeus/);
  assert.match(tyyli, /\.satelliittipalkki-kohde \{[\s\S]*text-overflow: ellipsis/);
  // Havaintoikkuna kirjoittaa nimen JA PÄIVÄN palkkiin (nayta) ja
  // pyyhkii sen sulkiessaan (sulje).
  assert.match(lahde, /palkki\?\.nimeaKohde\?\.\(`\$\{kohde\.nimi\} · \$\{aikateksti\(h\.aika\)\}`\)/);
  assert.match(lahde, /palkki\?\.nimeaKohde\?\.\(null\)/);
  palkki.pura();
});

test('kuvan aikana NASA-rivi väistyy pillerin tieltä ja palaa sulkiessa', () => {
  /*
   * Omistaja 15.9.2026: pilleri (kohteen nimi + päivä) korvaa NASA-
   * rivin NIMENOMAAN kuvan ollessa auki; kartalla ilman kuvaa NASA-
   * rivi näkyy taas.
   */
  const doc = teeDoc();
  const mapPane = doc.createElement('div');
  const palkki = rakennaPalkki({
    ui: { mapPane }, kohteet: SATELLIITTI_KOHTEET, onSulje: () => {}, doc,
  });
  assert.equal(Boolean(palkki.el.lapset[2].hidden), false);
  palkki.nimeaKohde('Etna · 30.10.2002');
  assert.equal(palkki.el.lapset[2].hidden, true);
  palkki.nimeaKohde(null);
  assert.equal(palkki.el.lapset[2].hidden, false);
  palkki.pura();
});

test('mobiilissa palkki pysyy yhtenä tiiviinä rivinä', () => {
  assert.match(tyyli, /@media \(max-width: 620px\)[\s\S]*satelliittipalkki-ohje \{ display: none; \}/);
});

test('ohjeteksti kertoo lähteen totuudenmukaisesti, ei enää käyttöohjetta', () => {
  /*
   * Omistaja 15.9.2026, työpöytäkuva linssistä: *"ota pois tuon
   * 'Napauta hohtavaa vihreää pistettä' -teksti... voisi lukea jotain
   * NASAsta"*. Sanamuoto ei väitä ISS:ää, koska SATELLIITTI_LAHDE
   * kattaa NASAn koko kuvakirjaston (images.nasa.gov), ei vain asemaa.
   */
  assert.ok(!lahde.includes('Napauta hohtavaa vihreää pistettä'),
    'vanha käyttöohje on yhä lähteessä');
  assert.match(lahde, /ohje\.textContent = '[^']*NASA[^']*'/);
  const [, ohjeteksti] = lahde.match(/ohje\.textContent = '([^']*)'/) ?? [];
  assert.ok(ohjeteksti && ohjeteksti.length <= 50, `ohjeteksti liian pitkä: "${ohjeteksti}"`);
  assert.ok(!/\bISS\b/.test(ohjeteksti), 'ohje väittää ISS:ää, mitä aineisto ei kata kaikilta kuvilta');
});

test('"Sulje linssi" -nappi on pelkkä X — aria-label kantaa merkityksen', () => {
  // Omistaja 15.9.2026: "muuta suljelinssi-napin pelkaksi X:ksi".
  assert.match(lahde, /sulje\.textContent = '×'/);
  assert.match(lahde, /sulje\.setAttribute\('aria-label', 'Sulje linssi'\)/);
  // Sama pyöreä ikoninappi-muoto kuin muilla linsseillä (pallo, linssikartta).
  assert.match(tyyli, /\.satelliittipalkki-sulje \{[\s\S]*border-radius: 999px/);
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

test('✕ ja i ovat kuvan oikeassa yläkulmassa, pikkukuvat vasemmassa alakulmassa', () => {
  /*
   * OMISTAJA 15.9.2026 klo 11.45 UTC, työpöytäkuva Etnasta: *"siirrat
   * alakulman X niin kuvan oikean ylareunaan pienena pyoreana X...
   * I-nappi saisi tulla kuvan sulkemisen napin alapuolelle... nuo
   * pienoiskuvat saisivat tulla vasempaan alanurkkaan"*. Vanha
   * kaksirivinen alapalkki (.satelliitti-ala, .satelliitti-napit) ON
   * POISTETTU.
   */
  assert.ok(!tyyli.includes('.satelliitti-ala'), 'vanha alapalkki on yhä tyylissä');
  assert.ok(!tyyli.includes('.satelliitti-napit'), 'vanha nappirivi on yhä tyylissä');
  assert.ok(!lahde.includes("html('div', 'satelliitti-ala')"), 'ala rakennetaan yhä lähteessä');
  assert.match(lahde, /kulma\.append\(sulku, infoNappi\)/);
  /*
   * TÄSMENNYS 15.9.2026 (jälkikaappaus): napit ovat KUVAN sisällä, eivät
   * lavan (koko ruudun) kulmassa — kiinteä 10px korvattu kuvan omaan
   * marginaaliin sidotulla calc()-lausekkeella (js/linssit/satelliitti.js
   * asemoiKulmat).
   */
  assert.match(tyyli, /\.satelliitti-kulma \{[\s\S]*position: absolute;[\s\S]*right: calc\(var\(--satelliitti-kuva-marginaali-x, 0px\) \+ 12px\);[\s\S]*top: calc\(var\(--satelliitti-kuva-marginaali-y, 0px\) \+ 12px\)/);
  assert.match(tyyli, /\.satelliitti-nauha \{[\s\S]*position: absolute;[\s\S]*left: calc\(var\(--satelliitti-kuva-marginaali-x, 0px\) \+ 12px\);[\s\S]*bottom:/);
  assert.match(lahde, /const asemoiKulmat = \(\) => \{/);
  assert.match(lahde, /setProperty\('--satelliitti-kuva-marginaali-x'/);
  assert.match(lahde, /setProperty\('--satelliitti-kuva-marginaali-y'/);
});

test('sulkuristi on pieni pyöreä nappi kuvan oikeassa yläkulmassa', () => {
  // Omistaja 15.9.2026: "pienena pyoreana X" (siirretty pois alakulmasta).
  assert.match(lahde, /nappi\('satelliitti-sulku', '×', 'Sulje havainto'\)/);
  assert.match(tyyli, /\.satelliitti-sulku,\n\.satelliitti-info \{[\s\S]*border-radius: 999px/);
  // Sulkeminen ei kosketa linssiin: vain ikkuna poistuu.
  assert.match(lahde, /sulku\.addEventListener\('click', \(e\) => \{ e\.stopPropagation\(\); sulje\(\); \}\)/);
});

test('kaikki tekstitieto on info-napin popupissa, ei kuvan päällä', () => {
  assert.match(lahde, /nappi\('satelliitti-info', 'i', 'Havainnon tiedot'\)/);
  assert.match(lahde, /html\('div', 'satelliitti-popup'\)/);
  for (const rivi of ['Aineisto', 'Kuvausaika', 'Paikka', 'Kuvaustapa', 'Kuvatunnus', 'Lisenssi']) {
    assert.ok(lahde.includes(`teeRivi('${rivi}'`), `${rivi} puuttuu info-popupista`);
  }
  // Kuvateksti on popupin ENSIMMÄINEN rivi: se on ainoa teksti, jonka
  // pelaaja lukee, eikä se saa jäädä lähdetietojen alle.
  assert.match(lahde, /popup\.append\(otsikko, kiinni\);[\s\S]{0,500}?popup\.appendChild\(html\('div', 'satelliitti-popup-selite'[\s\S]{0,80}?\);\n {4}for \(const rivi of \[/);
  assert.match(lahde, /satelliitti-popup-selite', h\.teksti \?\? kohde\.selite/);
  // Lähdelinkki vie NASAn omaan kuvasivuun.
  assert.match(lahde, /ulkolinkki\('NASAn kuvasivu', h\.sivu\)/);
  // Popup on pieni ikkuna, ei koko ruudun paneeli.
  assert.match(tyyli, /\.satelliitti-popup \{[\s\S]*width: min\(380px/);
  assert.match(tyyli, /\.satelliitti-popup \{[\s\S]*max-height: min\(52vh/);
  // Sen saa suljettua helposti: oma risti ja Escape.
  assert.match(lahde, /satelliitti-popup-sulku/);
  assert.match(lahde, /if \(e\.key === 'Escape'\) \{ if \(popup\) \{ suljePopup\(\); return; \} sulje\(\); return; \}/);
  // Kuvan päälle EI ladota kuvatekstiä eikä otsikkoa (nimi on palkissa).
  assert.ok(!/lava\.append\([^)]*teksti/.test(lahde));
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

test('nimi ja päivä ovat vain yläpalkin pillerissä, ei enää kuvan päällä', () => {
  /*
   * OMISTAJA 15.9.2026 klo 11.45 UTC, työpöytäkuva Etnasta: *"Poista
   * vasemman ylareunan kuvan paalla oleva teksti ja siirra se ylarivin
   * palkkiin"*. Vanha otsake (kohteen nimi + päivä KUVAN päällä) ON
   * POISTETTU; molemmat asuvat nyt yläpalkin pillerissä (rakennaPalkki
   * nimeaKohde). NASA ja lisenssi pysyvät info-napin popupissa.
   */
  assert.ok(!/'Valokuva avaruudesta · NASA'/.test(lahde),
    'vanha arkistoleima on yhä kuvan päällä');
  assert.ok(!lahde.includes('satelliitti-otsake'), 'vanha otsake on yhä lähteessä');
  assert.ok(!tyyli.includes('.satelliitti-otsake'), 'vanhan otsakkeen tyyli on yhä jäljellä');
  // Nimi ja päivä kirjoitetaan yläpalkin pilleriin joka otosvaihdossa.
  assert.match(lahde, /palkki\?\.nimeaKohde\?\.\(`\$\{kohde\.nimi\} · \$\{aikateksti\(h\.aika\)\}`\)/);
  // NASA ja lisenssi ovat yhä popupissa.
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

test('purku ottaa pois merkit, palkin ja kortin', () => {
  assert.equal(SATELLIITTI_OSA, 'satelliitti');
  assert.match(lahde, /lauta\?\.linssit\?\.merkit\?\.\(SATELLIITTI_OSA, merkit\)/);
  assert.match(lahde, /lauta\?\.linssit\?\.pura\?\.\(SATELLIITTI_OSA\)/);
  assert.match(lahde, /palkki\.pura\(\)/);
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

test('kortin yläreuna luetaan palkin mitatusta alareunasta', () => {
  /*
   * CSS:n `top: var(--aikajana-palkki-korkeus)` on oikea KORKEUS mutta
   * väärä PAIKKA: kortti on fixed (ikkuna) ja palkki absolute
   * (karttaruutu), joka alkaa pelin kehyksen verran alempaa. Mitattu
   * 844 × 390: kuva meni 11 px palkin alle.
   */
  assert.match(tyyli, /\.satelliitti-katselu \{[\s\S]*top: var\(--aikajana-palkki-korkeus, 0px\)/);
  assert.match(lahde, /const asemoiYlareuna = \(\) => \{/);
  assert.match(lahde, /palkki\?\.el\?\.getBoundingClientRect\?\.\(\)/);
  assert.match(lahde, /katselu\.style\.top = `\$\{Math\.round\(r\.bottom\)\}px`/);
  /*
   * Mittaus uusitaan, kun laite käännetään tai palkki muuttuu — samalla
   * kutsulla, joka mittaa myös kuvan oman marginaalin (asemoiKulmat,
   * täsmennys 15.9.2026).
   */
  assert.match(lahde, /const paivitaAsemointi = \(\) => \{ asemoiYlareuna\(\); asemoiKulmat\(\); \};/);
  assert.match(lahde, /new ResizeObserver\(paivitaAsemointi\)/);
  assert.match(lahde, /addEventListener\('orientationchange', paivitaAsemointi\)/);
  // Ja puretaan sulkiessa: kuuntelijoita ei jää roikkumaan.
  assert.match(lahde, /removeEventListener\('orientationchange', paivitaAsemointi\)/);
});

test('vaakanäkymän oma pystysarake on poistettu — kulmanapit toimivat molemmissa asennoissa', () => {
  /*
   * OMISTAJA 15.9.2026: kulmanapit (✕, i) ja pienoiskuvat ovat kuvan
   * PÄÄLLÄ eivätkä vie omaa saraketta, joten erillistä
   * @media (orientation: landscape) -sarakelohkoa ei enää tarvita.
   * Sama asettelu (kulma.append(sulku, infoNappi), .satelliitti-nauha
   * vasemmassa alakulmassa) pätee pysty- ja vaakaruudulla.
   */
  assert.ok(!tyyli.includes('--satelliitti-sarake'), 'vanha pystysarakemuuttuja on yhä tyylissä');
  assert.ok(!/\.satelliitti-ala\b/.test(tyyli), 'vanha alapalkki on yhä tyylissä');
  assert.match(tyyli, /\.satelliitti-kulma \{[\s\S]*position: absolute;[\s\S]*right: calc\(var\(--satelliitti-kuva-marginaali-x/);
  assert.match(tyyli, /\.satelliitti-nauha \{[\s\S]*position: absolute;[\s\S]*left: calc\(var\(--satelliitti-kuva-marginaali-x/);
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
