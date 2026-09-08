/*
 * TIEDELIITE — puhtaat apurit (js/tiedeliite.js) ja linssin datan
 * sopivuus sivuksi. DOM-osuutta ei testata tässä; se katsotaan
 * savukkeella ja kaappauksilla.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  KARUSELLIN_KYNNYS, karusellinKohta, karusellinPyyhkaisy, lyhytKuvateksti,
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
  assert.match(JS, /\} else \{[\s\S]{0,240}piirraIlmiokuva\(/,
    'yksi kuva latoutuu Tiedeliitteen omana lehden kuvana');
  // Kuvateksti on kuvan oma ja vaihtuu sen mukana.
  assert.match(JS, /selite\.textContent = lyhytKuvateksti\(kuva\)/);
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
  /*
   * OIKEA LOHKO ETSITÄÄN SISÄLLÖSTÄ, EI JÄRJESTYKSESTÄ. Aiemmin tästä
   * otettiin tiedoston VIIMEINEN prefers-reduced-motion-lohko, ja
   * mittaus rikkoutui heti kun css/aikajana.css sai uuden osion perään
   * (aikaselain 7.9.2026) — vika oli mittauksessa, ei karusellissa.
   */
  const hiljainen = CSS.match(/@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\n\}/g)
    .find((lohko) => lohko.includes('.tiedeliite-karuselli-raita'));
  assert.ok(hiljainen, 'karusellin reduced-motion-lohkoa ei löydy tyyleistä');
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

test('kohdekortin raahausele puretaan aina ennen uutta kosketusta ja kuunnellaan ikkunasta (omistaja 4.9.2026)', () => {
  const L = readFileSync(new URL('../js/fokuskohteet.js', import.meta.url), 'utf8');
  assert.match(L, /function raahausTaiSulku\(ui, popup, alku\) \{[\s\S]{0,1200}popup\.puraEle\?\.\(\);/);
  assert.match(L, /globalThis\.addEventListener\?\.\('pointermove', siirry\);\s*globalThis\.addEventListener\?\.\('pointerup', loppu\);\s*globalThis\.addEventListener\?\.\('pointercancel', peru\);/);
  assert.match(L, /tapahtuma\.stopPropagation\(\);\s*\/\/[^\n]*\n\s*\/\/[^\n]*\n\s*popup\.puraEle\?\.\(\);\s*if \(tapahtuma\.target\?\.closest\?\.\('button, a'\)\) return;/);
  assert.match(L, /if \(tapahtuma\.pointerType === 'mouse' && !tapahtuma\.buttons\) \{ puru\(\); return; \}/);
  assert.doesNotMatch(L, /popup\.addEventListener\('pointermove', siirry\)/);
});

/* ===========================================================================
   YLÄREUNA, KUVATEKSTIT, PALSTA JA ALANAPIT (omistaja 8.9.2026)
   ---------------------------------------------------------------------------
   Omistajan iPad-kaappaus 1897 Augsburg, sanatarkasti: *"Korjaa tuo yläreuna.
   Siinä on useampikin asetteluvirhe ja kuvateksti voisi olla lyhyempi, ja
   sitten voisi näkyä pidempi versio, kun sen kuvan avaa näkyviin. Myös jos
   sivua vierittää, niin silloin kuuluu turha klikkaus ääni ja ehkä teksti
   voisi olla yhdessä palstassa ja kuva hieman isompa. Myös alareunan linkit
   seuraaviin juttuihin vois jolla päälle hyppäävällä värillä. Ja myös tuo
   havainnekuva saisi mennä reunasta reunaan. Nyt siihen jää oudot palkit
   sivuille."*

   Nämä vartiot pitävät korjaukset paikallaan. Kolme niistä on
   JÄRJESTYSKILPAILUJA kahden tyylitiedoston välillä (css/fokusnosto.css
   vs. css/aikajana.css): yhtä tarkat valitsimet ratkesivat sen mukaan,
   kumpi tiedosto sattui latautumaan viimeisenä, ja juuri siksi omistajan
   iPadilla näkyi kaksi palstaa ja kuvan sivupalkit. Testit vaativat
   kolmatta luokkaa (.tiedeliite-kortti), joka ratkaisee kilpailun.
   =========================================================================== */

test('kortissa lyhyt kuvateksti ilman lähderiviä, suurennoksessa pitkä', () => {
  assert.equal(lyhytKuvateksti({ lyhyt: 'L', selite: 'P' }), 'L');
  assert.equal(lyhytKuvateksti({ selite: 'P' }), 'P', 'ilman lyhyttä entinen selite');
  assert.equal(lyhytKuvateksti(null), '');
  // Kortin kuvatekstit tulevat lyhyestä versiosta...
  assert.match(JS, /html\('span', 'fokusnosto-kuvaselite', lyhytKuvateksti\(kuva\)\)/);
  // ...eikä yksikään kortin kuvateksti saa enää lähderiviä: "Matkakirjan
  // havainnekuva" mainitaan vasta avatussa kuvassa (omistaja 8.9.2026).
  assert.doesNotMatch(JS, /fokusnosto-kuvalahde/,
    'kortin kuvatekstiin ei kirjoiteta lähderiviä');
  // Pitkä selite ja lähde kulkevat kuvatiedossa suurennokseen asti.
  assert.match(JS, /avaaKohdeSuurennos\(ui, kuva, \(\) => nappi, ZOOM_AVAIN\)/);
});

test('jokaisella keksinnön muotokuvalla on lyhyt kuvateksti', () => {
  const kuvat = [];
  for (const t of KEKSINNOT) {
    for (const kentta of ['kuva', 'kuvaToinen']) {
      if (t[kentta]) kuvat.push([`${t.vuosi} ${t.henkilo} ${kentta}`, t[kentta]]);
    }
  }
  // 25 pysäkkiä + merkkipaalu 1873 + kolme kaksoispysäkin toista kasvoa.
  assert.equal(kuvat.length, 29);
  for (const [nimi, kuva] of kuvat) {
    assert.ok(kuva.lyhyt, `${nimi}: lyhyt kuvateksti puuttuu`);
    assert.ok(kuva.lyhyt.length <= 90, `${nimi}: lyhyt teksti on ${kuva.lyhyt.length} merkkiä (max 90)`);
    assert.match(kuva.lyhyt, /\.$/, `${nimi}: lyhyt teksti on yksi virke`);
    assert.ok(!/\.\s+[A-ZÅÄÖ]/.test(kuva.lyhyt), `${nimi}: lyhyt teksti on yksi virke, ei kaksi`);
    assert.ok(kuva.selite && kuva.selite.length > kuva.lyhyt.length,
      `${nimi}: pitkä selite puuttuu tai ei ole lyhyttä pidempi`);
  }
});

test('nimiörivi on yksi rivi kortin sisällä, ei kolme aseteltua palaa', () => {
  // Hampurilainen, nimiö + paikkarivi ja kaiutin/sulku samassa rivissä.
  assert.match(JS, /ylarivi\.append\(hampurilainen, nimiot, ylanapit\)/);
  assert.match(JS, /nimiot\.append\(html\('p', 'looppi-nimio', 'Tiedeliite'\), paikkarivi\)/);
  assert.match(JS, /lisaaLukijanappi\(uusi, \{ otsikko: 'Kuuntele tiedeliite', rivi: ylanapit \}\)/,
    'kaiutin menee nimiöriville eikä sivun sisään');
  // Sivu ei enää lado omaa nimiötään: masto ei saa vieriä jutun mukana.
  const sivu = JS.match(/function piirraTiedeliitteenSivu[\s\S]*?\n\}/)[0];
  assert.doesNotMatch(sivu, /html\('p', 'looppi-nimio'/);
  assert.doesNotMatch(sivu, /html\('p', 'looppi-paivays'/);
  const rivi = CSS.match(/\.tiedeliite-ylarivi \{[^}]*\}/)[0];
  assert.match(rivi, /display: grid/);
  assert.match(rivi, /grid-template-columns: 1fr auto 1fr/, 'nimiö on kortin keskellä');
  assert.match(rivi, /border-bottom: 3px double/, 'kaksoisviiva on rivin ALLA');
  // Kaiutin ja sulku ovat rivin lapsia, eivät kortin kulmaan asemoituja.
  assert.match(CSS, /\.tiedeliite-kortti \.tiedeliite-ylanapit > button\.lukija-nappi \{[^}]*position: static/);
  assert.match(CSS, /\.tiedeliite-kortti \.fokusnosto-kortti-sulje \{[^}]*position: static/);
  assert.match(CSS, /\.tiedeliite-hampurilainen \{[^}]*justify-self: start/);
});

test('leipäteksti on yhdessä palstassa ja muotokuva entistä isompi', () => {
  // Kolme luokkaa: lööpin kaksipalstainen sääntö on yhtä tarkka kahdella.
  assert.match(
    CSS,
    /\.tiedeliite-kortti \.tiedeliite-palsta \.tiedeliite-leipa \{[^}]*column-count: 1/,
    'yksi palsta on varmistettava kortin luokalla',
  );
  const palsta = CSS.match(/\.tiedeliite-palsta \{[^}]*\}/)[0];
  assert.match(palsta, /grid-template-columns: minmax\(0, 1fr\) 15rem/,
    'muotokuva on 15 rem (ennen 9,5)');
  assert.match(CSS, /\.tiedeliite-keksija \.tiedeliite-palsta \{ grid-template-columns: minmax\(0, 1fr\) 15rem; \}/);
});

test('havainnekuva täyttää palstan reunasta reunaan', () => {
  const kehys = CSS.match(/\.tiedeliite-kortti \.tiedeliite-ilmiokuva \{[^}]*\}/)[0];
  assert.match(kehys, /width: auto/, 'kehys ei kutistu kuvan levyiseksi');
  assert.match(kehys, /max-width: none/);
  const kuva = CSS.match(/\.tiedeliite-kortti \.tiedeliite-ilmiokuva img \{[^}]*\}/)[0];
  assert.match(kuva, /width: 100%/);
  assert.match(kuva, /object-fit: cover/, 'contain jätti sivuille vaaleat palkit');
  assert.match(kuva, /aspect-ratio: 16 \/ 10/);
  assert.match(kuva, /max-height: none/);
  // Sama kilpailu karusellin ruuduilla.
  assert.match(CSS, /\.tiedeliite-kortti \.tiedeliite-karuselli-ruutu img \{[^}]*max-height: none/);
});

test('alanapeilla on päälle hyppäävä väri myös kosketuksessa', () => {
  const korostus = CSS.match(
    /\.tiedeliite-navinappi:hover:not\(:disabled\),\n\.tiedeliite-navinappi:focus-visible,\n\.tiedeliite-navinappi:active:not\(:disabled\) \{[^}]*\}/,
  )?.[0];
  assert.ok(korostus, 'hover/focus/active-korostus puuttuu alanapeilta');
  assert.match(korostus, /background: #7a5514/, 'kullanruskea tausta, ei vaalea vaalealla');
  assert.match(korostus, /color: #fbf3d9/);
});

test('vieritys ei soita napsautusääntä (omistaja 8.9.2026)', () => {
  const main = lue('js/main.js');
  // Sormella ääni tulee vasta napautuksen varmistuttua; hiirellä heti.
  assert.match(main, /if \(event\.pointerType === 'mouse'\) \{ soitaNapinAani\(button\); return; \}/);
  assert.match(main, /addEventListener\('pointerup'[\s\S]{0,700}NAPAUTUKSEN_LIIKE/);
  assert.match(main, /kosketus\.nappi\.contains\?\.\(event\.target\)/);
  assert.match(main, /addEventListener\('pointercancel', \(\) => \{ napinKosketus = null; \}, true\)/);
  // Vanha ehdoton pointerdown-ääni ei saa palata.
  assert.doesNotMatch(
    main,
    /pointerdown', \(event\) => \{\n  const button = event\.target\.closest\?\.\('button'\);\n  if \(button/,
    'ääni ei saa lähteä pelkästä painalluksesta',
  );
});
