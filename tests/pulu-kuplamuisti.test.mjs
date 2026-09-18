import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Pollo, pulunKuplanPiilotusviive } from '../js/pollo.js';
import {
  kuunteleLivianKasvopuheenElinkaarta, seuraaLivianKasvoAanitetta,
} from '../js/livia-puhetila.js';

const pollo = readFileSync(new URL('../js/pollo.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');

test('äänetön kupla saa lukuaikansa ja vasta sen jälkeen kolme sekuntia', () => {
  assert.equal(pulunKuplanPiilotusviive(''), 6200);
  assert.equal(pulunKuplanPiilotusviive('x'.repeat(100)), 10800);
  assert.equal(pulunKuplanPiilotusviive('x'.repeat(1000)), 15000);
});

test('todellinen karttaveto piilottaa mutta napautus ei', () => {
  assert.match(pollo, /kartalla = \(kohde\).*#board, \.kartta-kuori, \.pallolauta/);
  assert.match(pollo, /Math\.hypot\(e\.clientX - karttaveto\.x, e\.clientY - karttaveto\.y\) < KUPLAN_NAPAUTUSSADE_PX/);
  assert.match(pollo, /karttaveto\.piilotettu = true;\s*this\.piilotaPuhekuplat\(\)/);
});

/*
 * PALUUREITTI ON 18.9.2026 ALKAEN CHATIN YLÄRIVILLÄ (omistaja,
 * PAATOKSET 34 kohta 20): pluskuplaa ei enää piirretä, mutta sama
 * muisti — saman kohdekaupungin viimeisin piilotettu kupla — palautuu
 * nyt "Näytä puhekuplat" -napista. Nappi sulkee paneelin ensin, koska
 * kuplat elävät kartan päällä.
 */
test('palautus antaa vain saman kontekstin viimeisimmän kuplan', () => {
  assert.match(pollo, /muistettu\.konteksti !== this\.kuplaKonteksti\(\) \|\| this\.auki/);
  assert.match(pollo, /naytaKuplat\.addEventListener\('click',[\s\S]{0,120}naytaPuhekuplatUudelleen\(\)/);
  const runko = pollo.slice(
    pollo.indexOf('  naytaPuhekuplatUudelleen() {'),
    pollo.indexOf('  paivitaKuplanPalautus() {'),
  );
  assert.match(runko, /if \(this\.auki\) this\.sulje\(\);/,
    'nappi ei sulje paneelia — kuplat jäisivät chatin taakse');
  assert.match(runko, /this\.palautaViimeisinKupla\(\)/);
  assert.match(css, /button\.pollo-naytakuplat \{/);
  assert.match(css, /\.pollo-naytakuplat\[hidden\] \{ display: none; \}/);
});

test('chatin avaus säilyttää kuplamuistin ylärivin nappia varten', () => {
  const runko = pollo.slice(pollo.indexOf('  avaa() {'), pollo.indexOf('  sulje() {'));
  assert.match(runko, /this\.tyhjennaPino\(\);\s*this\.viimeisinPiilotettuKupla = muistettava;/,
    'chatin avaus unohtaa kuplat — ylärivin nappi olisi aina piilossa');
});

test('automaattinen puhe säilyy lokissa mutta jää pois chatin näkyvästä historiasta', () => {
  const kirjaa = pollo.slice(pollo.indexOf('  kirjaaKuplaViestiin('), pollo.indexOf('  lataaLokiVirtaan('));
  assert.match(kirjaa, /kirjaaLivianLokiin\('kupla', teksti\)/);
  assert.doesNotMatch(kirjaa, /lisaaViesti/);
  assert.match(pollo, /if \(merkinta\.r === 'kupla'\) continue;/);
});

test('puheen loppu käynnistää kolmen sekunnin kellon ja uusi puhe peruu vanhan', () => {
  assert.match(pollo, /if \(this\.puluPuhuu \|\| odottaa\) this\.peruKuplanPiilotus\(\);\s*else if \(puhui \|\| vaihe === 'loppu'\) this\.ajastaKuplanPiilotus\(3000\)/);
  assert.match(pollo, /if \(kupla\.dataset\?\.laji === 'puhe'\) \{\s*this\.unohdaPiilotettuKupla\(\);\s*this\.peruKuplanPiilotus\(\)/);
  assert.match(pollo, /kupla\.polloKuittaus = null/);
});

test('äänitteen puskurointi ei näytä puheen loppua', () => {
  const kuulijat = new Map();
  const audio = {
    muted: false, volume: 1, paused: false, ended: false,
    addEventListener(n, f) { kuulijat.set(n, f); },
    removeEventListener(n) { kuulijat.delete(n); },
  };
  const vaiheet = [];
  const irrota = kuunteleLivianKasvopuheenElinkaarta((x) => vaiheet.push(x.vaihe));
  const lopeta = seuraaLivianKasvoAanitetta(audio, 'Kupla');
  kuulijat.get('playing')();
  kuulijat.get('waiting')();
  kuulijat.get('playing')();
  kuulijat.get('ended')();
  assert.deepEqual(vaiheet, ['odottaa', 'puhuu', 'odottaa', 'puhuu', 'loppu']);
  lopeta();
  irrota();
});

test('mediaelinkaari päättyy mykistettynä ja myös ennen ensimmäistä playingiä', () => {
  const aja = (alku, tapahtumat) => {
    const kuulijat = new Map();
    const audio = {
      muted: false, volume: 1, paused: false, ended: false, ...alku,
      addEventListener(n, f) { kuulijat.set(n, f); },
      removeEventListener(n) { kuulijat.delete(n); },
    };
    const vaiheet = [];
    const irrota = kuunteleLivianKasvopuheenElinkaarta((x) => {
      if (x.tunnus === audio) vaiheet.push(x.vaihe);
    });
    seuraaLivianKasvoAanitetta(audio, 'Kupla');
    for (const nimi of tapahtumat) kuulijat.get(nimi)?.();
    irrota();
    return vaiheet;
  };
  assert.deepEqual(aja({ muted: true }, ['playing', 'ended']), ['odottaa', 'puhuu', 'loppu']);
  assert.deepEqual(aja({ volume: 0 }, ['playing', 'pause']), ['odottaa', 'puhuu', 'loppu']);
  assert.deepEqual(aja({}, ['waiting', 'pause']), ['odottaa', 'loppu']);
  assert.deepEqual(aja({}, ['ended']), ['odottaa', 'loppu']);
});

test('pause säilyttää kuuntelijat ja playing voi jatkaa samaa mediaa', () => {
  const kuulijat = new Map();
  const audio = {
    muted: false, volume: 1, paused: false, ended: false,
    addEventListener(n, f) { kuulijat.set(n, f); },
    removeEventListener(n) { kuulijat.delete(n); },
  };
  const vaiheet = [];
  const irrota = kuunteleLivianKasvopuheenElinkaarta((x) => {
    if (x.tunnus === audio) vaiheet.push(x.vaihe);
  });
  seuraaLivianKasvoAanitetta(audio, 'Kupla');
  kuulijat.get('playing')();
  kuulijat.get('pause')();
  assert.equal(typeof kuulijat.get('playing'), 'function');
  kuulijat.get('playing')();
  kuulijat.get('ended')();
  assert.deepEqual(vaiheet, ['odottaa', 'puhuu', 'loppu', 'puhuu', 'loppu']);
  assert.equal(kuulijat.size, 0);
  irrota();
});

test('odottava audio estää kupla-ajastimen alussa ja sen callbackissa', (t) => {
  const vanhaSet = globalThis.setTimeout;
  const vanhaClear = globalThis.clearTimeout;
  let callback = null;
  globalThis.setTimeout = (f) => { callback = f; return 17; };
  globalThis.clearTimeout = () => {};
  t.after(() => { globalThis.setTimeout = vanhaSet; globalThis.clearTimeout = vanhaClear; });
  const kupla = { dataset: { laji: 'puhe' }, isConnected: true };
  const tila = {
    kuplaPiilotusAjastin: null, auki: false, puluPuhuu: false, odottaa: true, piilotuksia: 0,
    pinonKuplat: () => [kupla],
    peruKuplanPiilotus: Pollo.prototype.peruKuplanPiilotus,
    kuplaPuheOdottaa() { return this.odottaa; },
    piilotaPuhekuplat() { this.piilotuksia += 1; },
  };
  Pollo.prototype.ajastaKuplanPiilotus.call(tila, 10);
  assert.equal(callback, null, 'odottaa jo ennen kuplaa');
  tila.odottaa = false;
  Pollo.prototype.ajastaKuplanPiilotus.call(tila, 10);
  assert.equal(typeof callback, 'function');
  tila.odottaa = true;
  callback();
  assert.equal(tila.piilotuksia, 0, 'odotus alkoi vasta ajastimen jälkeen');
});

test('karttapiilotuksen kaikki uudet DOM-kuuntelijat irrotetaan', () => {
  assert.match(pollo, /this\.irrotaKarttapiilotus = \(\) => \{/);
  for (const nimi of ['pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'wheel']) {
    assert.match(pollo, new RegExp(`removeEventListener\\('${nimi}'`));
  }
  assert.match(pollo, /this\.irrotaKarttapiilotus\?\.\(\)/);
});

test('pluskuplaa ei enää piirretä ruudulle', () => {
  // Omistaja 18.9.2026 (kohta 20 a): elementtiä ei luoda eikä liitetä.
  assert.equal(pollo.includes("'pollo-kuplapalautus'"), false);
  assert.equal(pollo.includes('kuplaPalautus.hidden'), false);
  // Asemointi koskee enää pinon kehystä.
  assert.equal(pollo.includes('nappi.left - 46'), false);
});

test('chatin hyväksytty vastaus sitoutuu odotustokeniin kerran ennen loppua', () => {
  assert.match(pollo, /ilmoitaLivianTilanne\('waitingAnswer', \{\s*tunnus: lopetaOdotus\.tunnus, lahde: 'chat', teksti: vastausteksti/);
  assert.match(pollo, /let lukija, vastausIlmoitettu = false/);
  assert.match(pollo, /if \(vastausIlmoitettu \|\| runko\?\.tehtava !== 'vastaus'/);
  assert.match(pollo, /ilmoitaVastaus\(teksti\);\s*lopetaOdotus\(\)/);
});

test('lennon ja trailerin alku poistavat kuplat heti ilman kuittausta tai plusmuistia', () => {
  assert.match(pollo, /laji === 'startFlight' && tiedot\.vaihe === 'alku'/);
  assert.match(pollo, /laji === 'trailer' && tiedot\.vaihe === 'kirjaimet'/);
  const heti = pollo.slice(pollo.indexOf('  tyhjennaPinoHeti()'), pollo.indexOf('\n  /* --- pinon laajuus', pollo.indexOf('  tyhjennaPinoHeti()')));
  assert.match(heti, /this\.unohdaPiilotettuKupla\(\)/);
  assert.match(heti, /kupla\.polloKuittaus = null;\s*kupla\.remove\(\)/);
  assert.doesNotMatch(heti, /poistaKuplat/);
});
