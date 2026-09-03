/*
 * TIEDELIITE — puhtaat apurit (js/tiedeliite.js) ja linssin datan
 * sopivuus sivuksi. DOM-osuutta ei testata tässä; se katsotaan
 * savukkeella ja kaappauksilla.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  KARUSELLIN_KYNNYS, karusellinKohta, karusellinPyyhkaisy,
  onTiedeliitteenSivu, tiedeliitteenKuvat, tiedeliitteenNaapurit,
} from '../js/tiedeliite.js';
import { KEKSINNOT } from '../js/linssit/keksinnot.js';

const lue = (polku) => readFileSync(new URL(`../${polku}`, import.meta.url), 'utf8');
const JS = lue('js/tiedeliite.js');
const CSS = lue('css/aikajana.css');

const sivu = (vuosi, lisa = {}) => ({ vuosi, henkilo: `H${vuosi}`, otsikko: `O${vuosi}`, juttu: 'x', ...lisa });

test('sivullinen pysäkki: keksijä jolla on juttu; merkkipaalu ei', () => {
  assert.equal(onTiedeliitteenSivu(sivu(1800)), true);
  assert.equal(onTiedeliitteenSivu({ vuosi: 1873, paalu: true, juttu: 'x' }), false);
  assert.equal(onTiedeliitteenSivu({ vuosi: 1800 }), false);
  assert.equal(onTiedeliitteenSivu(null), false);
});

test('kuvat kolmessa ryhmässä, kuvattomat kentät karsiutuvat', () => {
  const t = {
    kuva: { osoite: 'https://x/a.jpg' },
    kuvaToinen: null,
    kuvaAito: { tiedosto: 'A.jpg' },
    ilmio: { osoite: 'https://x/i.jpg' },
    ilmioLisa: { selite: 'ei lähdettä' },
  };
  const { kasvot, ilmiot } = tiedeliitteenKuvat(t);
  assert.deepEqual(kasvot, [t.kuva, t.kuvaAito]);
  assert.deepEqual(ilmiot, [t.ilmio]);
  assert.deepEqual(tiedeliitteenKuvat({}), { kasvot: [], ilmiot: [] });
});

test('naapurit hyppäävät merkkipaalun yli ja päättyvät -1:een', () => {
  const tapahtumat = [sivu(1), sivu(2), { vuosi: 3, paalu: true }, sivu(4)];
  assert.deepEqual(tiedeliitteenNaapurit(tapahtumat, 0), { edellinen: -1, seuraava: 1 });
  assert.deepEqual(tiedeliitteenNaapurit(tapahtumat, 1), { edellinen: 0, seuraava: 3 });
  assert.deepEqual(tiedeliitteenNaapurit(tapahtumat, 3), { edellinen: 1, seuraava: -1 });
});

test('keksinnöt: jokaisella pysäkillä paitsi paalulla on Tiedeliite-sivu kasvoineen', () => {
  const sivut = KEKSINNOT.filter(onTiedeliitteenSivu);
  assert.equal(sivut.length, KEKSINNOT.length - 1);
  for (const t of sivut) {
    const { kasvot, ilmiot } = tiedeliitteenKuvat(t);
    assert.ok(kasvot.length >= 1, `${t.vuosi} ${t.henkilo}: generoitu muotokuva puuttuu`);
    assert.ok(kasvot[0].osoite?.includes('/muotokuva/'), `${t.vuosi}: ensimmäinen kasvo on generoitu`);
    assert.ok(ilmiot.length >= 1, `${t.vuosi}: ilmiökuva puuttuu`);
  }
  // Ketju kulkee alusta loppuun seuraava-linkkejä pitkin.
  let i = KEKSINNOT.findIndex(onTiedeliitteenSivu);
  let askeleita = 1;
  while (tiedeliitteenNaapurit(KEKSINNOT, i).seuraava >= 0) {
    i = tiedeliitteenNaapurit(KEKSINNOT, i).seuraava;
    askeleita += 1;
  }
  assert.equal(askeleita, sivut.length);
});

/*
 * HAVAINNEKUVIEN KARUSELLI (omistaja 3.9.2026: *"jos oli useampi
 * havainnekuva, niin ne voisi laittaa nostoihin karuselliksi"*).
 *
 * Karusellin DOM elää selaimessa, joten tässä vartioidaan sitä, mikä
 * menisi rikki HILJAA: askellogiikka (raita on yhtenäinen nauha, joten
 * päädyssä on pysähdyttävä), pyyhkäisyn kynnys, karusellin syntyminen
 * vain useammasta kuvasta sekä kehyksen mitat ja liu'un kesto CSS:ssä.
 */

test('karusellin askel pysähtyy päihin eikä kierrä', () => {
  assert.equal(karusellinKohta(0, 1, 2), 1);
  assert.equal(karusellinKohta(1, 1, 2), 1, 'viimeisestä ei hypätä alkuun');
  assert.equal(karusellinKohta(0, -1, 2), 0, 'ensimmäisestä ei hypätä loppuun');
  assert.equal(karusellinKohta(2, 1, 3), 2);
  assert.equal(karusellinKohta(5, -1, 3), 2, 'liian iso lähtökohta rajautuu');
  assert.equal(karusellinKohta(0, 1, 1), 0, 'yksi kuva pysyy paikallaan');
  assert.equal(karusellinKohta(0, 1, 0), 0);
});

test('pyyhkäisy vaatii kynnyksen ja tulkitsee suunnan oikein', () => {
  assert.equal(KARUSELLIN_KYNNYS, 30);
  assert.equal(karusellinPyyhkaisy(-40), 1, 'veto vasemmalle vie seuraavaan');
  assert.equal(karusellinPyyhkaisy(40), -1, 'veto oikealle vie edelliseen');
  assert.equal(karusellinPyyhkaisy(-29), 0, 'kynnyksen alle jäävä veto ei siirrä');
  assert.equal(karusellinPyyhkaisy(29), 0);
  assert.equal(karusellinPyyhkaisy(-20, 10), 1, 'kynnys on säädettävissä');
  assert.equal(karusellinPyyhkaisy(NaN), 0);
});

test('sivu piirtää karusellin vain useammasta havainnekuvasta', () => {
  assert.match(JS, /if \(ilmiot\.length > 1\) \{\s*\n\s*piirraIlmiokaruselli\(/,
    'useampi kuva menee karuselliin');
  assert.match(JS, /\} else \{[\s\S]{0,240}piirraNostonKuva\(/,
    'yksi kuva latoutuu entiseen tapaan lehden kuvana');
  // Kuvateksti ja lähderivi ovat kuvan omat ja vaihtuvat sen mukana.
  assert.match(JS, /taytaLahderivi\(lahde, kuva\.lahde \?\? '', kuva\)/);
  // Nuolinäppäimet: karuselli saa ne, kun kohdistus on siinä.
  assert.match(JS, /activeElement\?\.closest\?\.\('\.tiedeliite-karuselli'\)/);
});

test('lehtisivun kuvanapeilla ei ole hiiren tooltipia', () => {
  assert.doesNotMatch(JS, /\.title = 'Katso kuva suurempana'/,
    'title jäisi leijumaan kuvan päälle (omistajan kaappaus 3.9.2026)');
  assert.match(JS, /querySelectorAll\('\.fokusnosto-kuvanappi\[title\]'\)/,
    'yhteiseltä piirraNostonKuvalta peritty title siivotaan sivulta');
});

test('karusellin ja havainnekuvan kehys, liuku ja reduced motion CSS:ssä', () => {
  for (const valitsin of [
    '.tiedeliite-karuselli-ikkuna', '.tiedeliite-karuselli-raita',
    '.tiedeliite-karuselli-ruutu', '.tiedeliite-karuselli-nuoli',
    '.tiedeliite-karuselli-piste', '.tiedeliite-ilmiokuva img',
  ]) {
    assert.ok(CSS.includes(valitsin), `${valitsin} puuttuu tyyleistä`);
  }
  // Sama 16/10-kehys yhdellä kuvalla ja karusellissa, jotta kuvateksti
  // ei voi olla kuvaa leveämpi (omistaja: "kuvateksti ei saa olla
  // leveämpi kuin kuva").
  // Kehysreunus tulee yhteisestä säännöstä, mitat karusellin omasta.
  const ikkuna = CSS.match(/\.tiedeliite-karuselli-ikkuna \{[^}]*aspect-ratio[^}]*\}/)[0];
  assert.match(ikkuna, /aspect-ratio: 16 \/ 10/);
  assert.match(ikkuna, /overflow: hidden/);
  assert.match(ikkuna, /touch-action: pan-y/, 'pystyvieritys jää kortille');
  const yksi = CSS.match(/\.tiedeliite-ilmiokuva img \{[^}]*\}/)[0];
  assert.match(yksi, /aspect-ratio: 16 \/ 10/);
  assert.match(yksi, /width: 100%/);
  assert.match(yksi, /max-height: none/);
  // Sama reunus ja pohja kuin henkilökuvalla (.tiedeliite-kasvo img).
  const kehykset = CSS.match(/\.tiedeliite-ilmiokuva img,\n\.tiedeliite-karuselli-ikkuna \{[^}]*\}/)[0];
  assert.match(kehykset, /border: 1px solid rgba\(70, 51, 31, 0\.35\)/);
  assert.match(kehykset, /background: #e6dcc3/);
  const kasvot = CSS.match(/\.tiedeliite-kasvo img \{[^}]*\}/)[0];
  assert.match(kasvot, /border: 1px solid rgba\(70, 51, 31, 0\.35\)/);
  // Liuku 400–600 ms, nopeutus ja hidastus.
  const raita = CSS.match(/\.tiedeliite-karuselli-raita \{[^}]*\}/)[0];
  const kesto = Number(raita.match(/transform (\d+)ms/)[1]);
  assert.ok(kesto >= 400 && kesto <= 600, `liu'un kesto ${kesto} ms ei ole 400–600 ms`);
  assert.match(raita, /cubic-bezier/);
  // Reduced motion: ei liukua eikä kuvatekstin häivytystä.
  const hiljainen = CSS.match(/@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\n\}/g).at(-1);
  assert.match(hiljainen, /\.tiedeliite-karuselli-raita/);
  assert.match(hiljainen, /\.tiedeliite-karuselli-teksti\.vaihtui \{ animation: none; \}/);
  // Kapea ruutu: nuolet mahtuvat kuvan laidoille.
  const kapea = CSS.match(/@media \(max-width: 560px\) \{[\s\S]*?\n\}/)[0];
  assert.match(kapea, /\.tiedeliite-karuselli-nuoli/);
});

test('keksinnöt: karusellilla on oikeaa sisältöä (kahden kuvan pysäkki)', () => {
  const monikuvaiset = KEKSINNOT.filter(onTiedeliitteenSivu)
    .filter((t) => tiedeliitteenKuvat(t).ilmiot.length > 1);
  assert.ok(monikuvaiset.length >= 1, 'yhdelläkään pysäkillä ei ole kahta havainnekuvaa');
  for (const t of monikuvaiset) {
    for (const kuva of tiedeliitteenKuvat(t).ilmiot) {
      assert.ok(kuva.selite, `${t.vuosi} ${t.henkilo}: karusellin kuvalta puuttuu selite`);
      assert.ok(kuva.lahde, `${t.vuosi} ${t.henkilo}: karusellin kuvalta puuttuu lähde`);
    }
  }
});

test('nostokuvan kehys kutistuu kuvan levyiseksi eikä kuvateksti määrää leveyttä (omistaja 3.9.2026)', () => {
  const css = readFileSync(new URL('../css/fokusnosto.css', import.meta.url), 'utf8');
  assert.match(css, /\.fokusnosto-kuva \{[\s\S]{0,900}width: fit-content;\s*max-width: 100%;\s*margin: 0 auto 0\.55rem;/);
  assert.match(css, /\.fokusnosto-kuvateksti \{[\s\S]{0,400}width: 0;\s*min-width: 100%;/);
  assert.match(css, /\.fokusnosto-valokuva \{[\s\S]{0,200}margin: 0\.8rem auto 0 0;/);
});
